/** 任务失败时，「进度」页签真的画出失败卡片 —— 两段都要。
 *
 * 后端把 JobFailureBriefView 接到了 document jobs 列表上，卡片组件自己也有 13 条门禁，
 * 但「页签把列表项里的 failure 交给了卡片」这一环**一条测试都没有**
 * （`grep -rn failure tests/` 在 book-detail 下只命中卡片那个文件）。
 *
 * 这正是本仓库出过两次事故的那一类：
 *   - ReaderHostPanelShell 手抄 props 时漏了 onOpenBoard → 点产物条抛异常，两边单测全绿
 *   - parseBoardListing 按错的信封形状解析 → 列表恒空，而测试喂的是同样错的形状
 * 两次 tsc 都没报，因为 props 是 any。这里取值处还有 `as` 强转，更靠不住。
 */
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

// 字段取自真实数据：一条 MinerU 解析失败 / 一条翻译失败。
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

const cards = (host) => [...host.querySelectorAll("[data-job-failure]")];
const translationRegion = (host) => host.querySelector('[data-processing-region="translation"]');

test("OCR 任务失败时，OCR 段真的出现失败卡片", async () => {
  const dom = makeDom();
  const { root, host } = await mountTab(dom, {
    loading: false, ocr: { ...idleOcr, job: failedOcrJob() }, translation: idleTranslation,
  });
  const all = cards(host);
  assert.equal(all.length, 1, "失败卡片没出现 —— 用户又只能看到「失败」两个字");
  assert.ok(!translationRegion(host)?.contains(all[0]), "OCR 的失败卡片画到翻译段里去了");
  assert.match(host.textContent, /上游服务没能处理这份文件/, "分类建议没画出来 —— failure 没接上");
  assert.match(host.textContent, /MinerU batch task failed/, "后端给的根因没画出来");
  assert.match(host.textContent, /展开完整错误/, "loadDetail 没接上，traceback 永远取不回来");
  root.unmount(); host.remove();
});

test("OCR 失败卡片上的重试接到的是 ocr.onOcr", async () => {
  const dom = makeDom();
  let clicked = 0;
  const { root, host } = await mountTab(dom, {
    loading: false,
    ocr: { ...idleOcr, job: failedOcrJob(), onOcr() { clicked += 1; } },
    translation: idleTranslation,
  });
  const retry = host.querySelector("#book-detail-retry-failed-btn");
  assert.ok(retry, "失败了却没有重试入口");
  retry.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await wait(50);
  assert.equal(clicked, 1, "点了重试什么都没发生 —— onRetry 接空了");
  root.unmount(); host.remove();
});

test("翻译任务失败时，翻译段真的出现失败卡片，重试接到 onTranslate", async () => {
  const dom = makeDom();
  let clicked = 0;
  const translation = failedTranslation();
  const { root, host } = await mountTab(dom, {
    loading: false, ocr: idleOcr,
    translation: { ...translation, onTranslate() { clicked += 1; } },
  });
  const all = cards(host);
  assert.equal(all.length, 1, "翻译失败没有卡片 —— 一半的失败仍然只有「失败」两个字");
  assert.ok(translationRegion(host)?.contains(all[0]), "翻译的失败卡片没画在翻译段里");
  assert.match(host.textContent, /DeepSeek 返回空译文/, "翻译失败的根因没画出来");
  host.querySelector("#book-detail-retry-failed-btn")
    .dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await wait(50);
  assert.equal(clicked, 1, "翻译的重试按钮接空了");
  root.unmount(); host.remove();
});

test("两段各自失败时两张卡片都在", async () => {
  const dom = makeDom();
  const { root, host } = await mountTab(dom, {
    loading: false, ocr: { ...idleOcr, job: failedOcrJob() }, translation: failedTranslation(),
  });
  assert.equal(cards(host).length, 2, "只画了一边 —— 另一半的失败没有说法");
  root.unmount(); host.remove();
});

test("没有 failure 的任务不画卡片 —— 否则成功的任务也会被说成失败", async () => {
  const dom = makeDom();
  const { root, host } = await mountTab(dom, {
    loading: false,
    ocr: { ...idleOcr, job: { job_id: "job-ocr-ok", workflow: "ocr", status: "succeeded" } },
    translation: {
      ...idleTranslation, item: { job_id: "job-tr-ok", status: "succeeded" },
      status: { label: "已完成", tone: "done" }, canTranslate: false,
    },
  });
  assert.equal(cards(host).length, 0, "成功的任务也画出了失败卡片");
  root.unmount(); host.remove();
});

test("合成的 OCR 任务不在 OCR 段重复画同一个失败", async () => {
  // ocr_status_derived 的那条「OCR 任务」其实指向翻译任务，它的 failure 属于翻译段。
  const dom = makeDom();
  const { root, host } = await mountTab(dom, {
    loading: false,
    ocr: { ...idleOcr, job: failedOcrJob(TRANSLATION_FAILURE, { job_id: "job-tr-1", ocr_status_derived: true }) },
    translation: failedTranslation(),
  });
  const all = cards(host);
  assert.equal(all.length, 1, "同一个任务的失败被画了两遍");
  assert.ok(translationRegion(host)?.contains(all[0]), "留下的那张不在翻译段");
  root.unmount(); host.remove();
});
