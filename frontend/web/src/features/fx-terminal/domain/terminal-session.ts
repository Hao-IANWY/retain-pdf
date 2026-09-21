/** 终端与「另一端」之间的最小契约。
 *
 * 刻意不提 WebSocket、不提 fx、不提 PTY —— 这一层只管「字节进、字节出、
 * 尺寸变了要通知」。后端最终是 PTY 直连还是走 ACP 事件流，换的是实现，
 * 不是这个接口。
 *
 * 之所以先定这个而不是直接写 WebSocket：终端组件一旦和某种传输长在一起，
 * 想换就得重写 UI。分开之后 UI 可以先用一个假的 session 跑起来。
 */
export type TerminalSize = { cols: number; rows: number };

export type TerminalSink = {
  /** 把远端来的字节写进终端。 */
  write(chunk: string): void;
  /** 远端结束了，附一句人能看懂的原因。 */
  close(reason: string): void;
};

export type TerminalSession = {
  /** 终端就绪。返回一个解绑函数，组件卸载时调用。 */
  open(sink: TerminalSink): () => void;
  /** 用户敲的键。 */
  send(data: string): void;
  /** 终端尺寸变了，远端 PTY 需要跟着 resize。 */
  resize(size: TerminalSize): void;
};

/** 一个不连任何后端的 session：回显输入，供 UI 单独跑起来用。
 *
 * 不是玩具——在后端那条路定下来之前，它是唯一能证明「终端渲染、输入、
 * 自适应尺寸」这几件事已经通了的方式。
 */
export function echoTerminalSession(banner = ""): TerminalSession {
  let sink: TerminalSink | null = null;
  return {
    open(next) {
      sink = next;
      if (banner) next.write(`${banner}\r\n`);
      return () => {
        sink = null;
      };
    },
    send(data) {
      // 回车要补 \n，否则 xterm 只回到行首不换行。
      sink?.write(data === "\r" ? "\r\n" : data);
    },
    resize() {},
  };
}
