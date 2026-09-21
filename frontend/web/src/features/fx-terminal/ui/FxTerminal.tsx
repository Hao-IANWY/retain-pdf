import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";

import { cssVariableReader, readTerminalTheme } from "../domain/terminal-theme.js";
import type { TerminalSession } from "../domain/terminal-session.js";

export type FxTerminalProps = {
  session: TerminalSession;
  /** 皮肤 id。变了要重建配色——xterm 的 theme 不跟着 CSS 变量走。 */
  themeId?: string;
  className?: string;
  ariaLabel?: string;
};

/** xterm 宿主。
 *
 * 只做三件事：挂载、把键盘接到 session、跟着容器尺寸 resize。
 * 「另一端是什么」由 session 决定，本组件不知道也不该知道。
 *
 * 两个容易踩的点，都在下面注释里标了：
 * - xterm 的 theme 是构造时快照，不读 CSS 变量，所以换肤要显式重设；
 * - fit() 必须在元素有实际尺寸之后调，容器还是 0 高时调会算出 1 行。
 */
export function FxTerminal({
  session,
  themeId = "",
  className = "",
  ariaLabel = "fx 终端",
}: FxTerminalProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const terminal = new Terminal({
      convertEol: true,
      cursorBlink: true,
      fontFamily: cssVariableReader(host)("--font-mono").trim() || "monospace",
      scrollback: 5000,
    });
    const fit = new FitAddon();
    terminal.loadAddon(fit);
    terminal.open(host);
    termRef.current = terminal;
    fitRef.current = fit;

    const detach = session.open({
      write: (chunk) => terminal.write(chunk),
      close: (reason) => terminal.writeln(`\r\n[${reason}]`),
    });
    const keys = terminal.onData((data) => session.send(data));

    // 容器尺寸变化 → 先 fit 出新的 cols/rows，再告诉远端 PTY。
    // 顺序不能反：远端按旧尺寸回绘会错行。
    const observer = new ResizeObserver(() => {
      if (!host.clientHeight || !host.clientWidth) return;
      fit.fit();
      session.resize({ cols: terminal.cols, rows: terminal.rows });
    });
    observer.observe(host);

    return () => {
      observer.disconnect();
      keys.dispose();
      detach();
      terminal.dispose();
      termRef.current = null;
      fitRef.current = null;
    };
  }, [session]);

  // xterm 的 theme 是构造参数，不是响应式的；换肤后必须重新读令牌再写回去。
  useEffect(() => {
    const host = hostRef.current;
    const terminal = termRef.current;
    if (!host || !terminal) return;
    const theme = readTerminalTheme(cssVariableReader(host));
    if (theme) terminal.options.theme = theme;
  }, [themeId]);

  return <div ref={hostRef} className={className} aria-label={ariaLabel} role="group" />;
}
