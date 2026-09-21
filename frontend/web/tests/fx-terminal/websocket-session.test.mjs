import test from "node:test";
import assert from "node:assert/strict";

const { terminalSocketUrl, websocketTerminalSession } = await import(
  "../../src/features/fx-terminal/domain/websocket-session.js"
);

// 最小假 socket：只实现 readyState / send / close 和四个回调。
class FakeSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  constructor(url) {
    this.url = url;
    this.readyState = FakeSocket.CONNECTING;
    this.sent = [];
    this.closed = false;
  }
  send(payload) {
    this.sent.push(JSON.parse(payload));
  }
  close() {
    this.closed = true;
    this.readyState = FakeSocket.CLOSED;
    this.onclose?.();
  }
  // —— 测试驱动用 ——
  accept() {
    this.readyState = FakeSocket.OPEN;
    this.onopen?.();
  }
  deliver(message) {
    this.onmessage?.({ data: JSON.stringify(message) });
  }
  deliverRaw(data) {
    this.onmessage?.({ data });
  }
}

globalThis.WebSocket ??= FakeSocket;

function harness({ session = "default" } = {}) {
  let socket = null;
  const written = [];
  const closes = [];
  const terminal = websocketTerminalSession({
    baseUrl: "http://127.0.0.1:41100",
    apiKey: "k",
    session,
    createSocket: (url) => {
      socket = new FakeSocket(url);
      return socket;
    },
  });
  const detach = terminal.open({
    write: (chunk) => written.push(chunk),
    close: (reason) => closes.push(reason),
  });
  return { terminal, detach, written, closes, socket: () => socket };
}

test("url: http 转 ws，并带上 api_key 和 session", () => {
  const url = new URL(
    terminalSocketUrl({
      baseUrl: "http://127.0.0.1:41100",
      apiKey: "secret",
      session: "job-7",
    }),
  );
  assert.equal(url.protocol, "ws:");
  assert.equal(url.pathname, "/api/v1/ai/terminal");
  assert.equal(url.searchParams.get("api_key"), "secret");
  assert.equal(url.searchParams.get("session"), "job-7");
});

test("url: https 要转成 wss，不能降级成 ws", () => {
  const url = new URL(
    terminalSocketUrl({ baseUrl: "https://example.test", apiKey: "k" }),
  );
  assert.equal(url.protocol, "wss:");
});

test("握手期间敲的字要排队，OPEN 之后补发", () => {
  // xterm 挂载即可接受键盘，而 WS 还在握手。直接 send 会抛，
  // 用户看到的是「刚打开时敲的前几个字母没了」。
  const h = harness();
  h.terminal.send("ab");
  h.terminal.send("c");
  assert.deepEqual(h.socket().sent, [], "连接没就绪就发出去了");
  h.socket().accept();
  const inputs = h.socket().sent.filter((m) => m.type === "input");
  assert.deepEqual(inputs, [{ type: "input", data: "abc" }]);
});

test("握手期间的多次 resize 只补发最后一次", () => {
  // ResizeObserver 拖窗口时每帧都触发；中间尺寸没有任何意义。
  const h = harness();
  h.terminal.resize({ cols: 10, rows: 5 });
  h.terminal.resize({ cols: 20, rows: 6 });
  h.terminal.resize({ cols: 30, rows: 7 });
  h.socket().accept();
  const resizes = h.socket().sent.filter((m) => m.type === "resize");
  assert.deepEqual(resizes, [{ type: "resize", cols: 30, rows: 7 }]);
});

test("补发顺序：尺寸先于输入", () => {
  // 反过来的话，远端会按旧尺寸处理那批输入再重排，屏幕会跳一下。
  const h = harness();
  h.terminal.send("x");
  h.terminal.resize({ cols: 40, rows: 12 });
  h.socket().accept();
  assert.deepEqual(
    h.socket().sent.map((m) => m.type),
    ["resize", "input"],
  );
});

test("output 帧写进终端，exit 帧关掉并带上原因", () => {
  const h = harness();
  h.socket().accept();
  h.socket().deliver({ type: "output", data: "中文输出" });
  h.socket().deliver({ type: "exit", reason: "terminal session ended" });
  assert.deepEqual(h.written, ["中文输出"]);
  assert.deepEqual(h.closes, ["terminal session ended"]);
});

test("坏帧丢掉，不要把解析错误画到终端里", () => {
  const h = harness();
  h.socket().accept();
  h.socket().deliverRaw("{ this is not json");
  h.socket().deliver({ type: "output", data: "ok" });
  assert.deepEqual(h.written, ["ok"]);
  assert.deepEqual(h.closes, []);
});

test("未知帧类型忽略，不当成输出画出来", () => {
  const h = harness();
  h.socket().accept();
  h.socket().deliver({ type: "from-the-future", data: "不该出现" });
  assert.deepEqual(h.written, []);
});

test("解绑会关掉 socket，并且之后的帧不再写进终端", () => {
  const h = harness();
  h.socket().accept();
  const socket = h.socket();
  h.detach();
  assert.ok(socket.closed, "解绑没关 socket —— PTY 子进程会留着");
  socket.deliver({ type: "output", data: "迟到的帧" });
  assert.deepEqual(h.written, []);
});

test("连接出错要告诉终端，不能静默停住", () => {
  const h = harness();
  h.socket().onerror?.();
  assert.equal(h.closes.length, 1);
});
