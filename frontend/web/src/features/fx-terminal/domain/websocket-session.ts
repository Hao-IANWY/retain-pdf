/** 把 /v1/fx/terminal 的 WebSocket 包成一个 TerminalSession。
 *
 * 协议两个方向都是 JSON，和后端 fx_terminal_routes.py 对齐：
 *
 *     出   {"type":"input","data":"ls\r"} / {"type":"resize","cols":N,"rows":N}
 *     入   {"type":"ready","pid":N} / {"type":"output","data":"..."} /
 *          {"type":"exit","reason":"..."}
 *
 * 三件必须处理的事，不做就会在真机上出问题：
 *
 * 1. **连接就绪前的输入要排队。** xterm 挂载即可接受键盘，而 WS 还在握手。
 *    直接 send 会抛 InvalidStateError，用户看到的是「前几个字母丢了」。
 * 2. **尺寸只发最后一次。** ResizeObserver 在拖动窗口时每帧都触发，
 *    每帧一个 resize 帧会把连接刷爆，而中间那些尺寸没有任何意义。
 * 3. **api_key 走查询参数。** 浏览器的 WebSocket 构造函数设不了请求头 ——
 *    这是 W3C 规范的限制，不是我们偷懒。
 */
import type {
  TerminalSession,
  TerminalSink,
  TerminalSize,
} from "./terminal-session.js";

export type WebSocketTerminalOptions = {
  /** 服务地址。浏览器只认 Rust API —— AI 服务只监听回环，前端不直连。 */
  baseUrl: string;
  /** WebSocket 路径。默认走 Rust API 的代理路由。 */
  path?: string;
  apiKey: string;
  /** 同一个 session 名会接回 fx 的同一份私有 workspace。 */
  session?: string;
  /** 注入点：测试里换成假的 WebSocket。 */
  createSocket?: (url: string) => WebSocket;
};

/** http(s) → ws(s)，并挂上鉴权与会话参数。 */
export const DEFAULT_TERMINAL_PATH = "/api/v1/ai/terminal";

export function terminalSocketUrl({
  baseUrl,
  apiKey,
  session = "default",
  path = DEFAULT_TERMINAL_PATH,
}: WebSocketTerminalOptions): string {
  const url = new URL(path, baseUrl);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("session", session);
  return url.toString();
}

export function websocketTerminalSession(
  options: WebSocketTerminalOptions,
): TerminalSession {
  const open = options.createSocket ?? ((url: string) => new WebSocket(url));
  let socket: WebSocket | null = null;
  let sink: TerminalSink | null = null;
  // 握手期间攒着，OPEN 之后一次性倒出去。
  let pendingInput = "";
  let pendingSize: TerminalSize | null = null;

  const flush = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    if (pendingSize) {
      socket.send(JSON.stringify({ type: "resize", ...pendingSize }));
      pendingSize = null;
    }
    if (pendingInput) {
      socket.send(JSON.stringify({ type: "input", data: pendingInput }));
      pendingInput = "";
    }
  };

  return {
    open(next) {
      sink = next;
      const ws = open(terminalSocketUrl(options));
      socket = ws;
      ws.onopen = () => flush();
      ws.onmessage = (event) => {
        let message: { type?: string; data?: string; reason?: string };
        try {
          message = JSON.parse(String(event.data));
        } catch {
          return; // 坏帧丢掉，不要把解析错误画到终端里
        }
        if (message.type === "output" && typeof message.data === "string") {
          sink?.write(message.data);
        } else if (message.type === "exit") {
          sink?.close(message.reason || "terminal session ended");
        }
      };
      ws.onerror = () => sink?.close("terminal connection failed");
      ws.onclose = () => {
        if (socket === ws) socket = null;
      };
      return () => {
        sink = null;
        socket = null;
        pendingInput = "";
        pendingSize = null;
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
      };
    },

    send(data) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "input", data }));
        return;
      }
      // 还在握手。攒着而不是丢掉 —— 丢掉的表现是「刚打开时敲的字没了」。
      pendingInput += data;
    },

    resize(size) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "resize", ...size }));
        return;
      }
      // 只留最后一次：拖动窗口时中间尺寸没有任何意义。
      pendingSize = size;
    },
  };
}
