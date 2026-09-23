import { useEffect, useRef, useState } from "react";

import { cssVariableReader, readTerminalTheme } from "../domain/terminal-theme.js";
import type { TerminalSession } from "../domain/terminal-session.js";

export type FxTerminalProps = {
  session: TerminalSession;
  /** 皮肤 id。变了要重建配色——xterm 的 theme 不跟着 CSS 变量走。 */
  themeId?: string;
  className?: string;
  ariaLabel?: string;
  /** 终端可用时回调一次，交出一个只能聚焦的把手。
   *
   * 给的是 `{ focus }` 而不是整个 xterm 实例：调用方（提示 chip）只需要"把键盘
   * 还给终端"，给全了就等于把 xterm 的 API 漏进宿主，以后换实现要连着改。 */
  onReady?: (handle: { focus(): void }) => void;
};

/** xterm 宿主。
 *
 * 只做三件事：挂载、把键盘接到 session、跟着容器尺寸 resize。
 * 「另一端是什么」由 session 决定，本组件不知道也不该知道。
 *
 * **xterm 是动态 import 的**，两个原因：
 * - 它有 ~500KB，不开终端的人不该为它付下载成本；
 * - 它的 package.json 没有 exports 字段，node 原生 ESM 解析会落到 CJS 入口，
 *   静态 import 会让任何引到本模块的测试直接炸（不经 esbuild 的那些）。
 *
 * 三个容易踩的点，都在下面标了：
 * - xterm 的 theme 是构造时快照，不读 CSS 变量，所以换肤要显式重设；
 * - fit() 必须在元素有实际尺寸之后调，容器还是 0 高时调会算出 1 行；
 * - 动态 import 落地前组件可能已经卸载，那时不能再 open()。
 */
export function FxTerminal({
  session,
  themeId = "",
  className = "",
  ariaLabel = "fx 终端",
  onReady,
}: FxTerminalProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<TerminalHandle | null>(null);
  // 用 ref 转发而不是进依赖数组：onReady 每次渲染可能是新函数，放进 [session]
  // 旁边会让 WebSocket 和 PTY 跟着反复拆建。
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const [failure, setFailure] = useState("");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      let mod: XtermModules;
      try {
        mod = await loadXterm();
      } catch {
        if (!disposed) setFailure("终端组件加载失败");
        return;
      }
      // import 落地时组件可能已经卸载：这时再 open 会把一个孤儿终端接到
      // 一个已经没人读的 session 上，而且 PTY 子进程不会被收掉。
      if (disposed) return;

      const terminal = new mod.Terminal({
        convertEol: true,
        cursorBlink: true,
        fontFamily: cssVariableReader(host)("--font-mono").trim() || "monospace",
        scrollback: 5000,
      });
      const fit = new mod.FitAddon();
      terminal.loadAddon(fit);
      terminal.open(host);
      applyTheme(terminal, host);
      termRef.current = terminal;
      // 把手交出去：提示 chip 打完字要把键盘还给终端，否则焦点留在按钮上，
      // 用户得再点一下才能回车。
      onReadyRef.current?.({ focus: () => termRef.current?.focus() });

      const detach = session.open({
        write: (chunk) => terminal.write(chunk),
        close: (reason) => terminal.writeln(`\r\n[${reason}]`),
      });
      const keys = terminal.onData((data: string) => session.send(data));

      // 容器尺寸变化 → 先 fit 出新的 cols/rows，再告诉远端 PTY。
      // 顺序不能反：远端按旧尺寸回绘会错行。
      const observer = new ResizeObserver(() => {
        if (!host.clientHeight || !host.clientWidth) return;
        fit.fit();
        session.resize({ cols: terminal.cols, rows: terminal.rows });
      });
      observer.observe(host);

      teardown = () => {
        observer.disconnect();
        keys.dispose();
        detach();
        terminal.dispose();
        termRef.current = null;
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [session]);

  // xterm 的 theme 是构造参数，不是响应式的；换肤后必须重新读令牌再写回去。
  useEffect(() => {
    const host = hostRef.current;
    const terminal = termRef.current;
    if (host && terminal) applyTheme(terminal, host);
  }, [themeId]);

  return (
    <div ref={hostRef} className={className} aria-label={ariaLabel} role="group">
      {failure ? <p className="reader-terminal-failure">{failure}</p> : null}
    </div>
  );
}

function applyTheme(terminal: TerminalHandle, host: HTMLElement) {
  const theme = readTerminalTheme(cssVariableReader(host));
  if (theme) terminal.options.theme = theme;
}

type TerminalHandle = {
  cols: number;
  rows: number;
  options: { theme?: unknown };
  loadAddon(addon: unknown): void;
  open(host: HTMLElement): void;
  focus(): void;
  write(chunk: string): void;
  writeln(chunk: string): void;
  onData(handler: (data: string) => void): { dispose(): void };
  dispose(): void;
};

type XtermModules = {
  Terminal: new (options: Record<string, unknown>) => TerminalHandle;
  FitAddon: new () => { fit(): void };
};

async function loadXterm(): Promise<XtermModules> {
  const [core, fit] = await Promise.all([
    import("@xterm/xterm"),
    import("@xterm/addon-fit"),
  ]);
  return {
    Terminal: core.Terminal as unknown as XtermModules["Terminal"],
    FitAddon: fit.FitAddon as unknown as XtermModules["FitAddon"],
  };
}
