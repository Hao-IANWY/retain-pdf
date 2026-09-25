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

import { FxTerminal, websocketTerminalSession } from "@/features/fx-terminal/index.js";
import { apiBase, frontendApiKey } from "@/platform/config/runtime.js";

import { sessionKeyForScope } from "../domain/terminal-scope.js";
import {
  activateTab,
  addTab,
  closeTab,
  loadTerminalTabs,
  nextTabSeed,
  saveTerminalTabs,
  setTabScope,
  type TerminalTab,
} from "../domain/terminal-tabs.js";

import {
  TerminalScopeBar,
  TerminalSuggestions,
  TerminalTabBar,
} from "./terminal-chrome.js";

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
  // 可以同时开几条。后端一直支持并行（busy_session_ids 会让第二条挑一个没被
  // 占用的 fx 会话），卡点一直在这里 —— 只有一个 <FxTerminal>。
  // 摆好的工作台要活过刷新：开了几条、每条盯着哪个作用域，都从上次读回来。
  // 存的不是 fx 会话 id —— 哪条对话被续上由后端挑，见 loadTerminalTabs。
  const [tabs, setTabs] = useState(() => loadTerminalTabs(sessionKey));
  useEffect(() => {
    saveTerminalTabs(sessionKey, tabs);
  }, [sessionKey, tabs]);
  // 计数器从恢复出来的最大序号往后走，不是从 1 —— 从 1 开会和 `t2` 撞 id，
  // React key 撞车的表现是两条终端共用一个 DOM 节点。
  const nextIdRef = useRef(nextTabSeed(tabs));
  const nextId = useCallback(() => `t${(nextIdRef.current += 1)}`, []);
  const activeTab = tabs.tabs.find((tab) => tab.id === tabs.activeId) ?? tabs.tabs[0];
  // 提示 chip 和作用域条作用在**当前这条**上。
  const terminalRefs = useRef(new Map<string, { focus(): void }>());
  const focusActive = useCallback(
    () => terminalRefs.current.get(tabs.activeId)?.focus(),
    [tabs.activeId],
  );
  const sendToActive = useRef<(data: string) => void>(() => {});

  const themeId = useThemeId();
  return (
    <div
      className="reader-terminal-panel"
      // 终端固定走 night 这个**已有**皮肤，不跟随文档主题。
      //
      // 不是偷懒：fx 的 TUI 用 256 色灰阶输出（38;5;245 这类），整套配色是
      // 按深色背景挑的。给它浅色底 = 浅灰字压浅灰底，几乎看不清 —— 实测就是
      // 这样。终端是一块独立表面，编辑器里的内置终端也都这么处理。
      data-theme="night"
      // 关掉时用 hidden 而不是卸载：卸载会关 WebSocket，进而杀掉 PTY 子进程，
      // 用户切个 tab 回来 fx 的会话就没了。
      hidden={!open}
      aria-label="fx 终端"
    >
      <TerminalTabBar
        tabs={tabs.tabs}
        activeId={tabs.activeId}
        onActivate={(id) => setTabs((state) => activateTab(state, id))}
        onAdd={() => setTabs((state) => addTab(state, nextId))}
        onClose={(id) => {
          terminalRefs.current.delete(id);
          setTabs((state) => closeTab(state, id));
        }}
      />
      <TerminalScopeBar
        scope={activeTab.scope}
        jobId={sessionKey}
        baseUrl={baseUrl}
        apiKey={apiKey}
        onChange={(scope) => setTabs((state) => setTabScope(state, state.activeId, scope))}
      />
      <TerminalSuggestions
        session={{ send: (data) => sendToActive.current(data) }}
        focusTerminal={focusActive}
      />
      {tabs.tabs.map((tab) => (
        <TerminalInstance
          key={tab.id}
          tab={tab}
          active={tab.id === tabs.activeId}
          baseUrl={baseUrl}
          apiKey={apiKey}
          themeId={themeId}
          onReady={(handle, send) => {
            terminalRefs.current.set(tab.id, handle);
            if (tab.id === tabs.activeId) sendToActive.current = send;
          }}
        />
      ))}
    </div>
  );
}

/** 一条终端。
 *
 * **非当前的也留在树上,只是挪到屏幕外** —— 卸载会关 WebSocket、杀掉 PTY,
 * 切回来 fx 那段对话就没了。而且不能用 `display:none`:xterm 自己量容器尺寸,
 * 量到 0 会把终端算成 1 行,切回来是一团乱码（这个坑踩过）。
 */
function TerminalInstance({
  tab,
  active,
  baseUrl,
  apiKey,
  themeId,
  onReady,
}: {
  tab: TerminalTab;
  active: boolean;
  baseUrl: string;
  apiKey: string;
  themeId: string;
  onReady: (handle: { focus(): void }, send: (data: string) => void) => void;
}) {
  const sessionKey = sessionKeyForScope(tab.scope);
  // useMemo 而不是每次渲染新建：FxTerminal 的 effect 依赖 session，
  // 每次渲染换一个新对象会把 WebSocket 和 PTY 反复拆了重建。
  const session = useMemo(
    () => websocketTerminalSession({ baseUrl, apiKey, session: sessionKey }),
    [baseUrl, apiKey, sessionKey],
  );
  const handleReady = useCallback(
    (handle: { focus(): void }) => onReady(handle, (data) => session.send(data)),
    [onReady, session],
  );
  return (
    <div
      className="reader-terminal-instance"
      data-hidden={!active ? "" : undefined}
      inert={!active ? true : undefined}
      aria-hidden={!active ? true : undefined}
    >
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
