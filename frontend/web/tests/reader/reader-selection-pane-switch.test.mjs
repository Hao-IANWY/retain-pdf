/** 选区浮条上的「原文 / 译文」切换 —— 以及复制、批注跟着切。
 *
 * ## 守的是什么
 *
 * `ReaderRegion` 一直同时带 source / translated 两个 box，各自有 text。浮条从前
 * 只按选区所在那一栏取一份，另一份就摆在内存里没人显示。这份门禁守三件事：
 *
 * 1. 两侧都有独立文本时，切过去**拿到的文本真的换了**（包括页码 —— 译文 PDF 的
 *    页码可以和原文不同，批注锚点跟着走）；
 * 2. 只有单侧文本（只跑了 OCR 的任务）时**不画那个开关**。这里最容易做出一个
 *    「点了没反应」的按钮：readerRegionContent 在 box.text 为空时会退回 markdown，
 *    于是译文栏取到的其实是同一份原文，看上去有两栏，切了什么都不变；
 * 3. 复制和添加批注拿的是**切过去那一栏**的文本，不是选区那一栏的。
 *
 * ## 为什么要真点
 *
 * 第 3 条是这次顺带修的既有缺陷，而它的全部实现就是两处 `view.pane` / `view.copyValue`
 * 的取值。对源码做正则守不住 —— 换个变量名照样绿。所以最后一条在 jsdom 里真渲染、
 * 真点按钮、真读剪贴板存根。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";

import { ReaderSelectionToolbar } from "../../../packages/reader/src/components/react-pdf/ReaderSelectionToolbar.tsx";
import {
  readerSelectionPaneTexts,
  resolveReaderSelectionView,
} from "../../../packages/reader/src/components/react-pdf/reader-selection-view.ts";
import { hidingRulesFor } from "./helpers/reader-css.mjs";

const RECT = { left: 300, top: 400, width: 200, height: 40 };

function box(page, text) {
  return { page, bbox: [10, 20, 90, 50], unit: "pdf_point", origin: "top_left", text };
}

/** 一个真实形状的双语区域：原文在第 3 页，译文在第 4 页。 */
function bilingualSelection(overrides = {}) {
  return {
    selectionType: "region",
    kind: "text",
    page: 4,
    pane: "translated",
    rect: RECT,
    region: {
      itemId: "p004-b0012",
      source: box(3, "The estimator is consistent under i.i.d. sampling."),
      translated: box(4, "在独立同分布抽样下，该估计量是相合的。"),
      markdown: "在独立同分布抽样下，该估计量是相合的。",
      regionType: "text",
      status: "translated",
      assetIds: [],
      assetUrls: [],
    },
    ...overrides,
  };
}

/** 只跑了 OCR 的任务：译文 box 没有 text，markdown 里是同一段原文的带标记版本。
 *
 * markdown 故意和 source.text 不逐字相同（真实数据里它带着 `##`、`**` 这类标记）。
 * 相同的话，这份 fixture 就同时被「两侧一样」那条规则挡住，测不出「不许用
 * readerRegionContent 判断能不能切」这一条 —— 两条规则互相打掩护。 */
function sourceOnlySelection() {
  const selection = bilingualSelection({ page: 3, pane: "source" });
  selection.region.translated = box(3, "");
  selection.region.markdown = "## The estimator is consistent under i.i.d. sampling.";
  selection.region.status = "source_only";
  return selection;
}

test("双语区域：切一下，取到的文本和页码都换成另一栏的", () => {
  const selection = bilingualSelection();
  const translated = resolveReaderSelectionView(selection, null);
  assert.equal(translated.canSwitch, true, "两栏各有文本却不给切");
  assert.equal(translated.pane, "translated");
  assert.equal(translated.text, "在独立同分布抽样下，该估计量是相合的。");
  assert.equal(translated.page, 4);
  assert.equal(translated.showPeek, false, "看的就是页面上那一栏，不该再抄一遍");

  const source = resolveReaderSelectionView(selection, "source");
  assert.equal(source.pane, "source");
  assert.equal(
    source.text,
    "The estimator is consistent under i.i.d. sampling.",
    "切到原文后拿到的还是译文 —— 这个按钮点了没反应",
  );
  assert.equal(source.copyValue, source.text, "复制拿的必须是切过去那一栏的文本");
  assert.equal(source.page, 3, "译文 PDF 的页码和原文不同，批注锚点没跟着走");
  assert.equal(source.showPeek, true, "另一栏的文字页面上看不见，浮条里必须显示");
});

test("只有单侧文本时不给切 —— markdown 兜底会把两栏伪装成一样的两栏", () => {
  // 先证明「有东西能切」，否则下面那条在任何情况下都绿。
  assert.notEqual(readerSelectionPaneTexts(bilingualSelection()), null);

  const selection = sourceOnlySelection();
  assert.equal(readerSelectionPaneTexts(selection), null, "译文 box 是空的，不该认为能切");
  const view = resolveReaderSelectionView(selection, "translated");
  assert.equal(view.canSwitch, false);
  assert.equal(view.pane, "source", "不能切时必须忽略残留的 viewPane");
  assert.equal(view.showPeek, false);
});

test("两侧文本一模一样时也不给切（公式在两栏是同一串 LaTeX）", () => {
  const selection = bilingualSelection({ kind: "formula" });
  selection.region.source = box(3, "$$e^{i\\pi}+1=0$$");
  selection.region.translated = box(4, "$$e^{i\\pi}+1=0$$");
  assert.equal(readerSelectionPaneTexts(selection), null);
  const view = resolveReaderSelectionView(selection, "source");
  assert.equal(view.canSwitch, false, "切过去屏幕上什么都不变，等于点了没反应");
  assert.equal(view.copyValue, "e^{i\\pi}+1=0", "公式复制仍要扒掉 $$ 包裹");

  // 同一段公式，两栏真的不一样时就该给切 —— 证明上面卡住的是「一样」而不是「公式」。
  selection.region.translated = box(4, "$$e^{i\\pi} + 1 = 0 \\quad (\\text{欧拉恒等式})$$");
  assert.equal(resolveReaderSelectionView(selection, null).canSwitch, true);
});

test("正文拖选没有 region，不给切，文本仍是选中的那一句", () => {
  const selection = {
    selectionType: "text",
    quote: "consistent under i.i.d. sampling",
    page: 4,
    pane: "translated",
    rect: RECT,
  };
  const view = resolveReaderSelectionView(selection, "source");
  assert.equal(view.canSwitch, false);
  assert.equal(view.text, "consistent under i.i.d. sampling");
  assert.equal(view.page, 4);
});

function renderToBody(selection) {
  const markup = renderToStaticMarkup(createElement(ReaderSelectionToolbar, {
    selection,
    onDismiss() {},
    onAddNote() {},
  }));
  return new JSDOM(`<body>${markup}</body>`).window.document.body;
}

test("双语区域渲染出两个栏别按钮；单侧区域渲染成一段文字而不是按钮", () => {
  const bilingual = renderToBody(bilingualSelection());
  const panes = [...bilingual.querySelectorAll(".reader-sel-pop-pane")];
  assert.deepEqual(panes.map((node) => node.textContent), ["原文", "译文"]);
  assert.equal(
    panes.find((node) => node.getAttribute("aria-pressed") === "true").textContent,
    "译文",
    "按下态没有落在选区所在的那一栏",
  );

  const sourceOnly = renderToBody(sourceOnlySelection());
  // 先断言「栏别信息还在」，再断言「它不是按钮」—— 否则整个浮条不渲染时也绿。
  assert.match(sourceOnly.textContent, /原文/);
  assert.equal(
    sourceOnly.querySelector(".reader-sel-pop-pane"),
    null,
    "单侧区域画出了一个点了不动的切换按钮",
  );
});

test("栏别按钮没有被 CSS 藏掉 —— 和圆钮、面板工具条同一种死法", () => {
  const button = renderToBody(bilingualSelection()).querySelector(".reader-sel-pop-pane");
  assert.ok(button, "按钮都没渲染出来，下面那条永远绿");
  assert.deepEqual(hidingRulesFor(button), [], "切换按钮被一条 CSS 藏起来了");

  // 扫描器自身是活的：同一条祖先链上挂一条隐藏规则必须被抓出来。
  button.closest(".reader-sel-pop-card").classList.add("reader-float-markdown-content", "hidden");
  assert.notDeepEqual(hidingRulesFor(button), [], "扫描器失效，上一条是假门禁");
});

test("点「原文」之后：气泡里是原文，复制和添加批注也跟着切", async () => {
  const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
    url: "http://localhost/reader.html",
    pretendToBeVisual: true,
  });
  const previous = Object.fromEntries(
    ["window", "document", "navigator", "HTMLElement", "Node", "Event", "MouseEvent"]
      .map((key) => [key, globalThis[key]]),
  );
  for (const key of Object.keys(previous)) {
    Object.defineProperty(globalThis, key, {
      value: dom.window[key],
      configurable: true,
      writable: true,
    });
  }
  const clipboard = [];
  Object.defineProperty(globalThis, "navigator", {
    value: { userAgent: "node.js", clipboard: { writeText: async (text) => { clipboard.push(text); } } },
    configurable: true,
    writable: true,
  });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;

  const notes = [];
  const root = createRoot(document.getElementById("root"));
  try {
    await act(async () => {
      root.render(createElement(ReaderSelectionToolbar, {
        selection: bilingualSelection(),
        onDismiss() {},
        onAddNote: (input) => notes.push(input),
      }));
    });

    const paneButton = (label) => [...document.querySelectorAll(".reader-sel-pop-pane")]
      .find((node) => node.textContent === label);
    const actionButton = (label) => [...document.querySelectorAll(".reader-sel-pop-btn")]
      .find((node) => node.textContent.includes(label));

    assert.equal(document.querySelector(".reader-sel-pop-peek"), null, "默认不该展开气泡");

    await act(async () => { paneButton("原文").click(); });
    assert.equal(
      document.querySelector(".reader-sel-pop-peek")?.textContent,
      "The estimator is consistent under i.i.d. sampling.",
      "点了「原文」，气泡里却没有原文",
    );

    await act(async () => { actionButton("复制").click(); });
    assert.deepEqual(
      clipboard,
      ["The estimator is consistent under i.i.d. sampling."],
      "复制拿的还是译文 —— 切换没带上复制",
    );

    await act(async () => { actionButton("添加批注").click(); });
    assert.deepEqual(notes, [{
      page: 3,
      pane: "source",
      quote: "The estimator is consistent under i.i.d. sampling.",
    }], "批注存下来的还是译文那一栏");

    // 切回去：同一条浮条上来回切都要成立，不是只有第一次对。
    await act(async () => { paneButton("译文").click(); });
    assert.equal(document.querySelector(".reader-sel-pop-peek"), null);
    await act(async () => { actionButton("复制").click(); });
    assert.equal(clipboard[1], "在独立同分布抽样下，该估计量是相合的。");
  } finally {
    await act(async () => root.unmount());
    for (const [key, value] of Object.entries(previous)) {
      Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
    }
    delete globalThis.IS_REACT_ACT_ENVIRONMENT;
    dom.window.close();
  }
});
