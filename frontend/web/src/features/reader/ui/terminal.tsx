/** 阅读页里的 fx 终端面板 —— 宿主提供给 @retainpdf/reader 的槽位实现。
 *
 * 放在宿主而不是包里，是因为 xterm 和终端端点都是 RetainPDF 应用特有的东西；
 * 包只决定这块 UI 在 dock 里的位置和生命周期。
 *
 * 端点解析不到（apiBase 或 xApiKey 没配）时返回 null —— dock 里就不会出现
 * 终端那个 tab。点了没反应的 tab 比没有这个功能更糟。
 */
import { useEffect, useMemo, useState } from "react";
import type { ReaderTerminalSlotProps } from "@retainpdf/reader/adapters";

import { FxTerminal, websocketTerminalSession } from "@/features/fx-terminal/index.js";
import { apiBase, frontendApiKey } from "@/platform/config/runtime.js";

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
  // useMemo 而不是每次渲染新建：FxTerminal 的 effect 依赖 session，
  // 每次渲染换一个新对象会把 WebSocket 和 PTY 反复拆了重建。
  const session = useMemo(
    () => websocketTerminalSession({ baseUrl, apiKey, session: sessionKey }),
    [baseUrl, apiKey, sessionKey],
  );
  const themeId = useThemeId();
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
      <FxTerminal
        session={session}
        themeId={themeId}
        className="reader-terminal-surface"
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
