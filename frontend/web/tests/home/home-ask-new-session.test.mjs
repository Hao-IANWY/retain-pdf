import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost/",
});
for (const k of ["window", "document", "HTMLElement", "Node", "MutationObserver", "navigator", "CustomEvent", "Event", "localStorage"]) {
  try {
    Object.defineProperty(globalThis, k, {
      value: dom.window[k] ?? globalThis[k],
      writable: true,
      configurable: true,
    });
  } catch { /* 只读键忽略 */ }
}
globalThis.window = dom.window;
globalThis.IS_REACT_ACT_ENVIRONMENT = false;

// 首轮 send 挂起在建会话网络请求上，保持 running=true，制造“生成中新会话”窗口
globalThis.fetch = () => new Promise(() => {});

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { useHomeAskRuntime } = await import(
  "../../src/features/ask/ui/use-home-ask-runtime.ts"
);

function wait(ms = 10) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 固定 50ms 赌的是「React 在 50ms 内把首帧刷出来」。负载高时没刷，apiRef.current
// 还是 null，下面第一句就 TypeError: reading 'send'。实测把预算压到 0 → 10/10 红。
async function waitFor(predicate, description, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) return;
    await wait(10);
  }
  assert.fail(`等待超时：${typeof description === "function" ? description() : description}`);
}

test("newSession 复位运行态：生成中新会话后可立即再问", async () => {
  const apiRef = { current: null };
  function Harness() {
    apiRef.current = useHomeAskRuntime();
    return null;
  }
  const root = createRoot(dom.window.document.getElementById("root"));
  root.render(React.createElement(Harness));
  await waitFor(() => apiRef.current !== null, "Harness 首帧落地");

  void apiRef.current.send("第一问");
  await waitFor(
    () => apiRef.current.isRunning && apiRef.current.messages.length === 2,
    () => `首问应进入运行态并挂出两条消息，实际 isRunning=${apiRef.current.isRunning} len=${apiRef.current.messages.length}`,
  );

  apiRef.current.newSession();
  await waitFor(
    () => apiRef.current.messages.length === 0 && apiRef.current.isRunning === false,
    () => `newSession 应清空消息并复位运行态，实际 isRunning=${apiRef.current.isRunning} len=${apiRef.current.messages.length}`,
  );

  // runningRef 卡住会导致 send 直接 return，消息数保持 0
  void apiRef.current.send("第二问");
  await waitFor(
    () => apiRef.current.messages.length === 2 && apiRef.current.isRunning === true,
    () => `runningRef 卡住会让 send 直接 return；实际 isRunning=${apiRef.current.isRunning} len=${apiRef.current.messages.length}`,
  );

  root.unmount();
});
