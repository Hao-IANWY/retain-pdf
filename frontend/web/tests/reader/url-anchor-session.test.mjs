import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { waitFor } from "../helpers/async.mjs";

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost/reader.html?job_id=job-A",
});
for (const k of ["window", "document", "HTMLElement", "Node", "MutationObserver", "navigator", "CustomEvent", "Event"]) {
  try {
    Object.defineProperty(globalThis, k, {
      value: dom.window[k] ?? dom.window,
      writable: true,
      configurable: true,
    });
  } catch { /* 只读键忽略 */ }
}
globalThis.window = dom.window;
globalThis.IS_REACT_ACT_ENVIRONMENT = false;

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { buildUrlAnchorAppliedKey, useUrlAnchorJump } = await import(
  "../../../../frontend/packages/reader/src/hooks/use-url-anchor-jump.ts"
);
const { setReaderAdapters } = await import(
  "../../../../frontend/packages/reader/src/adapters.ts"
);

function wait(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 重试链是 use-url-anchor-jump.ts 的 JUMP_DELAYS_MS = [0,80,200,400,800]，而
// 「同文档重渲染」时 effect 依赖没变、cleanup 不跑、**在途 timer 不被 clear**。
// 原来的 `await wait(1000)` 是从 render 之前起算的，只给首帧 flush 留了 200ms 余量：
// flush 一慢，F+800 那次跳页就掉进下一段的 `await wait(80)` 里，把「不应再跳」打红。
//
// 改成等「jumps 连续 QUIET_MS 不再增长」= 整条链确实打完了，与机器快慢无关。
// 改 JUMP_DELAYS_MS 的最后一档时要回头看这个数。
const QUIET_MS = 400;
async function waitForJumpsQuiet(jumps, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  let seen = -1;
  let since = Date.now();
  while (Date.now() < deadline) {
    if (jumps.length !== seen) {
      seen = jumps.length;
      since = Date.now();
    } else if (jumps.length > 0 && Date.now() - since >= QUIET_MS) {
      return;
    }
    await wait(20);
  }
  assert.fail(`等待跳页序列落定超时，实际 ${jumps.length} 次`);
}

test("appliedKey 混入会话身份：同 anchor 跨文档键不同，同文档键稳定", () => {
  const anchor = { pageIdx: 2, blockId: "b-7" };
  const keyA = buildUrlAnchorAppliedKey(anchor, 3, { jobId: "job-A", documentId: "doc-A" });
  const keyB = buildUrlAnchorAppliedKey(anchor, 3, { jobId: "job-B", documentId: "doc-B" });
  assert.notEqual(keyA, keyB);
  assert.equal(
    buildUrlAnchorAppliedKey(anchor, 3, { jobId: "job-A", documentId: "doc-A" }),
    keyA,
  );
});

test("跨文档同 anchor 会重新跳页（同文档同 anchor 只跳一次）", async () => {
  setReaderAdapters({
    resolveReaderAnchor: () => ({ pageIdx: 2, blockId: "b-7" }),
  });
  try {
    const jumps = [];
    function Harness({ jobId }) {
      useUrlAnchorJump({
        enabled: true,
        numPages: 10,
        goToPage: (page) => jumps.push([jobId, page]),
        jobId,
        documentId: `doc-of-${jobId}`,
      });
      return null;
    }
    const root = createRoot(dom.window.document.getElementById("root"));
    root.render(React.createElement(Harness, { jobId: "job-A" }));
    await waitForJumpsQuiet(jumps);
    assert.ok(jumps.length >= 1, `首文档应跳页，实际 ${jumps.length} 次`);
    assert.deepEqual(jumps[0], ["job-A", 3]);
    // 同文档重渲染：去重，不应再跳
    const sameDocCount = jumps.length;
    root.render(React.createElement(Harness, { jobId: "job-A" }));
    await wait(QUIET_MS);
    assert.equal(jumps.length, sameDocCount, "同文档同 anchor 不应再跳");

    // 跨文档同 anchor：必须重新跳
    root.render(React.createElement(Harness, { jobId: "job-B" }));
    await waitFor(
      () => jumps.length > sameDocCount,
      () => `跨文档同 anchor 应重新跳页，实际仍是 ${jumps.length} 次`,
    );
    assert.deepEqual(jumps.at(-1), ["job-B", 3]);

    root.unmount();
  } finally {
    setReaderAdapters(null);
  }
});
