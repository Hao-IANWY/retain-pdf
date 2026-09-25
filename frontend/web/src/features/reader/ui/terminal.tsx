/** 阅读页里的 fx 终端面板 —— 宿主提供给 @retainpdf/reader 的槽位实现。
 *
 * 放在宿主而不是包里，是因为 xterm 和终端端点都是 RetainPDF 应用特有的东西；
 * 包只决定这块 UI 在 dock 里的位置和生命周期。
 *
 * 端点解析不到（apiBase 或 xApiKey 没配）时返回 null —— dock 里就不会出现
 * 终端那个 tab。点了没反应的 tab 比没有这个功能更糟。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReaderTerminalSlotProps } from "@retainpdf/reader/adapters";

import {
  FxTerminal,
  TERMINAL_SUGGESTIONS,
  readSuggestionsDismissed,
  websocketTerminalSession,
  writeSuggestionsDismissed,
} from "@/features/fx-terminal/index.js";
import { apiBase, frontendApiKey } from "@/platform/config/runtime.js";

import {
  ensureCollectionWorkspace,
  loadCollectionOptions,
  scopeLabel,
  sessionKeyForScope,
  type CollectionOption,
  type TerminalScope,
} from "../domain/terminal-scope.js";

export function renderReaderTerminal(props: ReaderTerminalSlotProps) {
  // 浏览器只认 Rust API 这一个地址和一把凭据 —— AI 服务(41100)只监听回环，
  // 前端从不直连它，/ai/ask 也是经 Rust 转发的。终端走同样的路。
  const base = apiBase();
  const apiKey = frontendApiKey();
  if (!base || !apiKey) return null;
  return (
    <ReaderTerminalPanel
      key={props.sessionKey}
      {...props}
      baseUrl={base}
      apiKey={apiKey}
    />
  );
}

type PanelProps = ReaderTerminalSlotProps & {
  baseUrl: string;
  apiKey: string;
};

function ReaderTerminalPanel({ open, sessionKey, baseUrl, apiKey }: PanelProps) {
  // 作用域：默认这本书。切到文件夹之后 session 键变 → 整条 WebSocket 和 PTY
  // 重建,也就是换一个 fx 会话 —— 这正是想要的,两个作用域的对话不该串。
  const [scope, setScope] = useState<TerminalScope>({ kind: "job", jobId: sessionKey });
  const effectiveKey = sessionKeyForScope(scope);
  // useMemo 而不是每次渲染新建：FxTerminal 的 effect 依赖 session，
  // 每次渲染换一个新对象会把 WebSocket 和 PTY 反复拆了重建。
  const session = useMemo(
    () => websocketTerminalSession({ baseUrl, apiKey, session: effectiveKey }),
    [baseUrl, apiKey, effectiveKey],
  );
  const themeId = useThemeId();
  // 提示 chip 打完字要把键盘还给终端，否则焦点留在按钮上，用户得再点一下才能回车。
  const terminalRef = useRef<{ focus(): void } | null>(null);
  const handleReady = useCallback((handle: { focus(): void }) => {
    terminalRef.current = handle;
  }, []);
  const focusTerminal = useCallback(() => terminalRef.current?.focus(), []);
  // 定位、宽度、在哪一侧 —— 全由 @retainpdf/reader 的壳决定。宿主只给内容，
  // 它不知道 dock 在哪，也不该知道。
  return (
    <div
      className="reader-terminal-panel"
      // 终端固定走 night 这个**已有**皮肤，不跟随文档主题。
      //
      // 不是偷懒：fx 的 TUI 用 256 色灰阶输出（38;5;245 这类），整套配色是
      // 按深色背景挑的。给它浅色底 = 浅灰字压浅灰底，几乎看不清 —— 实测就是
      // 这样。终端是一块独立表面，编辑器里的内置终端也都这么处理。
      //
      // 用 data-theme 而不是写死颜色：night.css 里那套值是设计过的，
      // 而且 readTerminalTheme 会自动从这个作用域读到它们。
      data-theme="night"
      // 关掉时用 hidden 而不是卸载：卸载会关 WebSocket，进而杀掉 PTY 子进程，
      // 用户切个 tab 回来 fx 的会话就没了。
      hidden={!open}
      aria-label="fx 终端"
    >
      <TerminalScopeBar
        scope={scope}
        jobId={sessionKey}
        baseUrl={baseUrl}
        apiKey={apiKey}
        onChange={setScope}
      />
      <TerminalSuggestions session={session} focusTerminal={focusTerminal} />
      <FxTerminal
        session={session}
        themeId={themeId}
        className="reader-terminal-surface"
        onReady={handleReady}
      />
    </div>
  );
}

/** 当前皮肤 id。xterm 的配色是构造时快照，换肤靠这个值变化来触发重设。 */
function useThemeId(): string {
  const [themeId, setThemeId] = useState(readThemeId);
  useEffect(() => {
    if (typeof MutationObserver === "undefined") return;
    const observer = new MutationObserver(() => setThemeId(readThemeId()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return themeId;
}

function readThemeId(): string {
  if (typeof document === "undefined") return "";
  return document.documentElement.getAttribute("data-theme") || "";
}

/** 终端上方的「你可以让它做什么」。
 *
 * agent 能产出的四类东西在阅读页里都有呈现，但**这件事唯一的说明书是 AGENTS.md，
 * 而那份是写给模型看的** —— 用户打开终端只看到 fx 的裸 TUI，不知道 cwd 在哪、
 * 旁边有什么、能要什么。阅读路径和画布的空状态都指向终端，而终端此前指向虚无：
 * 这一行把断掉的环接上。
 *
 * 点了**不执行**，只把提示打进输入行（`send` 不带 `\r`）。这些是自然语言，改一改
 * 往往更贴合当下想问的；直接执行会让它退化成四个功能按钮，而这个产品的方向恰恰
 * 是用自然语言代替按钮。
 */
function TerminalSuggestions({
  session,
  focusTerminal,
}: {
  session: { send(data: string): void };
  focusTerminal: () => void;
}) {
  const [dismissed, setDismissed] = useState(readSuggestionsDismissed);
  const dismiss = useCallback(() => {
    writeSuggestionsDismissed();
    setDismissed(true);
  }, []);
  if (dismissed) return null;
  return (
    <div className="reader-terminal-suggestions" aria-label="可以让 fx 做的事">
      <span className="reader-terminal-suggestions-lead">试试</span>
      {TERMINAL_SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion.path}
          type="button"
          className="reader-terminal-suggestion"
          title={suggestion.prompt}
          onClick={() => {
            session.send(suggestion.prompt);
            focusTerminal();
            // 用过一次就不用再教了。
            dismiss();
          }}
        >
          {suggestion.label}
        </button>
      ))}
      <button
        type="button"
        className="reader-terminal-suggestions-close"
        aria-label="不再显示这些提示"
        title="不再显示"
        onClick={dismiss}
      >
        ×
      </button>
    </div>
  );
}

/** 作用域切换条：这本书 / 某个文件夹。
 *
 * 只在**真的有可选文件夹**时出现。没有文件夹的人（多数）看到的终端和以前
 * 一模一样 —— 给一个点了只会说"没有文件夹"的控件，比没有更糟。
 */
function TerminalScopeBar({
  scope,
  jobId,
  baseUrl,
  apiKey,
  onChange,
}: {
  scope: TerminalScope;
  jobId: string;
  baseUrl: string;
  apiKey: string;
  onChange: (scope: TerminalScope) => void;
}) {
  const [options, setOptions] = useState<CollectionOption[]>([]);
  const [failure, setFailure] = useState("");
  const [busy, setBusy] = useState(false);

  const fetchJson = useCallback(
    async (path: string) => {
      const response = await fetch(new URL(path, baseUrl), {
        headers: { "X-API-Key": apiKey },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    },
    [baseUrl, apiKey],
  );

  useEffect(() => {
    let cancelled = false;
    void loadCollectionOptions(fetchJson).then((list) => {
      if (!cancelled) setOptions(list);
    });
    return () => {
      cancelled = true;
    };
  }, [fetchJson]);

  const select = useCallback(
    async (option: CollectionOption | null) => {
      setFailure("");
      if (!option) {
        onChange({ kind: "job", jobId });
        return;
      }
      // 必须先物化再切 —— 不然终端会落进一个过期或不存在的工作区,而那个失败
      // 是静默的（Python 侧退回私有目录,表现是 books/ 空着）。
      setBusy(true);
      const reason = await ensureCollectionWorkspace(fetchJson, option.collectionId);
      setBusy(false);
      if (reason) {
        setFailure(reason);
        return;
      }
      onChange({ kind: "collection", ...option });
    },
    [fetchJson, jobId, onChange],
  );

  if (options.length === 0) return null;
  return (
    <div className="reader-terminal-scope" aria-label="终端作用域">
      <span className="reader-terminal-scope-lead">范围</span>
      <button
        type="button"
        className="reader-terminal-scope-option"
        aria-pressed={scope.kind === "job"}
        disabled={busy}
        onClick={() => void select(null)}
      >
        这本书
      </button>
      {options.map((option) => {
        const active =
          scope.kind === "collection" && scope.collectionId === option.collectionId;
        return (
          <button
            key={option.collectionId}
            type="button"
            className="reader-terminal-scope-option"
            aria-pressed={active}
            disabled={busy}
            title={`让 fx 一次看见这 ${option.documentCount} 本书`}
            onClick={() => void select(option)}
          >
            {scopeLabel({ kind: "collection", ...option })}
          </button>
        );
      })}
      {failure ? <span className="reader-terminal-scope-note">{failure}</span> : null}
    </div>
  );
}
