import test from "node:test";
import assert from "node:assert/strict";
import { waitFor } from "../helpers/async.mjs";
import { clickWithMouseDown, makeDom as makeDomWith } from "../helpers/dom.mjs";

// 组件直接挂进 #root，并且用到了 SVG 图标（SVGElement）。
const makeDom = () => makeDomWith("", {
  html: "<!doctype html><html><body><div id='root'></div></body></html>",
  keys: [
    "window", "document", "HTMLElement", "HTMLInputElement", "HTMLButtonElement", "Element",
    "SVGElement", "CustomEvent", "Event", "KeyboardEvent", "MouseEvent", "Node",
    "MutationObserver", "NodeFilter",
  ],
});

const click = (dom, element) => clickWithMouseDown(dom, element, { cancelable: true });

test("不明确的翻译阶段必须二次确认重复调用风险", async () => {
  const dom = makeDom();
  const React = await import("react");
  const { createRoot } = await import("react-dom/client");
  const { TranslationStageActions } = await import(
    "../../src/features/book-detail/ui/panels/translate/TranslationStageActions.jsx"
  );
  const calls = [];
  const root = createRoot(dom.window.document.getElementById("root"));
  root.render(React.createElement(TranslationStageActions, {
    actions: [{
      stage: "translation",
      label: "重试翻译",
      can_retry: true,
      danger: true,
      disabled_reason: "request outcome is ambiguous",
    }],
    onRetry: async (...args) => calls.push(args),
  }));

  const retryButton = await waitFor(
    () => dom.window.document.getElementById("book-detail-retry-translation-btn"),
    "重新翻译按钮",
  );
  click(dom, retryButton);
  await waitFor(
    () => dom.window.document.getElementById("book-detail-translation-risk-confirm"),
    "重复风险确认框",
  );
  assert.equal(calls.length, 0, "打开确认框不能直接提交");
  click(dom, dom.window.document.getElementById("book-detail-translation-risk-confirm-confirm"));
  await waitFor(() => calls.length === 1, "确认后提交");
  assert.deepEqual(calls[0], ["translation", { acceptDuplicateRisk: true }]);

  root.unmount();
  dom.window.close();
});

test("阶段能力读取期间固定展示重新翻译和重新渲染按钮", async () => {
  const dom = makeDom();
  const React = await import("react");
  const { createRoot } = await import("react-dom/client");
  const { TranslationStageActions } = await import(
    "../../src/features/book-detail/ui/panels/translate/TranslationStageActions.jsx"
  );
  const root = createRoot(dom.window.document.getElementById("root"));
  root.render(React.createElement(TranslationStageActions, {
    actions: [],
    loading: true,
    onRetry: async () => {},
  }));

  const translation = await waitFor(
    () => dom.window.document.getElementById("book-detail-retry-translation-btn"),
    "加载态重新翻译按钮",
  );
  const render = dom.window.document.getElementById("book-detail-retry-render-btn");
  assert.ok(render, "加载态同时保留重新渲染按钮");
  assert.equal(translation.disabled, true);
  assert.equal(render.disabled, true);
  assert.equal(translation.textContent.trim(), "重新翻译");
  assert.equal(render.textContent.trim(), "重新渲染");
  assert.equal(
    dom.window.document.querySelector('[data-translation-stage-actions="true"]')?.getAttribute("aria-busy"),
    "true",
  );

  root.unmount();
  dom.window.close();
});
