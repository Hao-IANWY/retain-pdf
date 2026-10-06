/** 「进度」分区的翻译覆盖条和任务记录：页签真的把 coverage 交给了两个面板。 */

import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

function makeDom() {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/index.html" });
  for (const key of [
    "window", "document", "DocumentFragment", "HTMLElement", "HTMLButtonElement",
    "HTMLFormElement", "HTMLInputElement", "CustomEvent", "Event", "KeyboardEvent",
    "MouseEvent", "Node", "MutationObserver", "NodeFilter",
  ]) {
    Object.defineProperty(globalThis, key, { value: dom.window[key] ?? dom.window, writable: true, configurable: true });
  }
  globalThis.window = dom.window;
  globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(0), 0);
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
  globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  return dom;
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitFor(predicate, description) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    const value = predicate();
    if (value) return value;
    await wait(15);
  }
  assert.fail(`等待超时：${typeof description === "function" ? description() : description}`);
}

// 失败的翻译任务会拉起 BookTranslateProgressPanel，它要 HomeShellProviders。
const services = {
  library: { actions: {} },
  statusCard: { store: { getSnapshot: () => ({ snapshot: {} }), subscribe: () => () => {} } },
  statusDetail: { controller: { openStatusDetailDialog: () => {} } },
};


const OCR_FAILURE = {
  category: "provider", stage: "ocr", retryable: true,
  summary: "任务失败，但暂未识别出明确根因",
  root_cause: "MinerU batch task failed: parsing failed, please try again later",
  suggestion: "查看 log_tail 和完整错误日志进一步排查", provider: "mineru",
};
const TRANSLATION_FAILURE = {
  category: "translation", stage: "translation", retryable: true,
  summary: "翻译阶段失败", root_cause: "DeepSeek 返回空译文", provider: "deepseek",
};

const idleOcr = {
  job: null, pending: false, cancelling: false, error: "", rangeOn: false, startPage: "1", endPage: "",
  onRangeOnChange() {}, onStartPageChange() {}, onEndPageChange() {}, onOcr() {}, onCancel() {},
};
const idleTranslation = {
  item: {}, status: { label: "尚未翻译", tone: "muted" }, isActive: false, canTranslate: true,
  rangeOn: false, startPage: "1", endPage: "",
  onRangeOnChange() {}, onStartPageChange() {}, onEndPageChange() {},
  onTranslate() {}, onRetryStage: async () => {},
};

const failedOcrJob = (failure = OCR_FAILURE, extra = {}) => ({
  job_id: "job-ocr-1", workflow: "ocr", job_type: "ocr", status: "failed",
  created_at: "2026-10-01T00:00:00Z", failure, ...extra,
});
const failedTranslation = (failure = TRANSLATION_FAILURE) => ({
  ...idleTranslation,
  item: {
    job_id: "job-tr-1", workflow: "translate", status: "failed",
    created_at: "2026-10-02T00:00:00Z", failure,
  },
  status: { label: "失败", tone: "failed" },
});

async function mountTab(dom, props) {
  const { createRoot } = await import("react-dom/client");
  const React = await import("react");
  const { HomeShellProviders } = await import("../../src/ui/context/home-services-context.js");
  const { BookDetailProcessingTab } = await import(
    "../../src/features/book-detail/ui/tabs/BookDetailProcessingTab.js"
  );
  const host = dom.window.document.createElement("div");
  dom.window.document.body.appendChild(host);
  const root = createRoot(host);
  root.render(React.createElement(
    HomeShellProviders,
    { services },
    React.createElement(BookDetailProcessingTab, props),
  ));
  await waitFor(() => host.querySelector(".book-detail-processing-card"), "进度卡渲染");
  return { root, host };
}


const COVERAGE = {
  page_count: 6,
  translated_pages: 4,
  contributing_jobs: 2,
  segments: [
    { first: 1, last: 2, job_id: "whole" },
    { first: 3, last: 4, job_id: "redo" },
    { first: 5, last: 6, job_id: null },
  ],
  jobs: [
    { job_id: "redo", workflow: "translate", status: "succeeded", created_at: "2026-10-04T09:00:00", finished_at: "2026-10-04T09:03:05", model: "glm-5.3-flash", pages: [3, 4], supplied_pages: 2, ocr_reused: true },
    { job_id: "whole", workflow: "book", status: "succeeded", created_at: "2026-10-01T08:00:00", finished_at: "2026-10-01T08:00:42", model: "deepseek-flash", pages: [1, 2, 3], supplied_pages: 2, ocr_reused: false },
  ],
};

test("有覆盖数据：显示覆盖条（每页一格）和任务记录", async () => {
  const dom = makeDom();
  const { root, host } = await mountTab(dom, { loading: false, ocr: idleOcr, translation: idleTranslation, coverage: COVERAGE });
  const headline = host.querySelector("[data-coverage-headline]");
  assert.equal(headline?.textContent, "已翻译 4 / 6 页 · 由 2 次翻译拼成");
  const cells = [...host.querySelectorAll(".book-detail-coverage-cell")];
  assert.deepEqual(cells.map((cell) => cell.getAttribute("data-shade")), ["2", "2", "1", "1", "0", "0"]);
  assert.equal(cells[4].getAttribute("title"), "第 5 页 · 未翻译");
  const rows = [...host.querySelectorAll(".book-detail-job-history-row")];
  assert.deepEqual(rows.map((row) => row.getAttribute("data-job-id")), ["redo", "whole"]);
  assert.match(rows[1].textContent, /第 1-3 页/);
  assert.match(rows[1].textContent, /采用 2 页（其余被之后的翻译替换）/);
  assert.match(rows[0].textContent, /glm-5\.3-flash/);
  root.unmount(); host.remove();
});

test("没有覆盖数据（接口失败 / mock）：两块都不出现，其余照常", async () => {
  const dom = makeDom();
  const { root, host } = await mountTab(dom, { loading: false, ocr: idleOcr, translation: idleTranslation, coverage: null });
  assert.equal(host.querySelector(".book-detail-coverage"), null);
  assert.equal(host.querySelector(".book-detail-job-history"), null);
  assert.ok(host.querySelector(".book-detail-processing-card"), "处理卡不该受影响");
  root.unmount(); host.remove();
});
