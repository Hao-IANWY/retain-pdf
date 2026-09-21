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
  return (
    <section
      className="reader-terminal-panel"
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
    </section>
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
