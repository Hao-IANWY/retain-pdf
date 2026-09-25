/** 同一条 AI 批注，在页面上和在面板里必须叫同一个名字。
 *
 * 起因：页面标记层写的是「疑问 / 注意 / 关联 / 术语 / 批注」，索引面板写的是
 * 「存疑 / 当心 / 跨页 / 术语 / 笔记」—— 两份手抄的 KIND_LABEL，而面板那份的
 * 注释还写着「和页面上那层同一套词，否则对不上号」。点开面板里的「跨页」跳到
 * 页面上，读屏念出来的是「关联」。
 *
 * 断言方式：两边**都真渲染**，从 DOM 里把词抠出来比。比常量表没意义 —— 常量
 * 对上了、渲染时用的却是别处那份，照样对不上号。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";

import { ReaderAiNoteLayer } from "../../../packages/reader/src/pdf/ReaderAiNoteLayer.tsx";
import { ReaderAiNotesPanel } from "../../../packages/reader/src/components/react-pdf/ReaderAiNotesPanel.tsx";

const KINDS = ["question", "warning", "link", "term", "note"];

const note = (kind) => ({
  id: `n-${kind}`,
  anchor: { blockId: `b-${kind}`, pageIdx: 0 },
  kind,
  level: 1,
  text: `${kind} 的批注正文`,
  refs: [],
  weak: false,
});

const highlight = {
  itemId: "b-1",
  region: null,
  box: { page: 1, bbox: [10, 20, 90, 50], unit: "pdf_point", origin: "top_left", text: "" },
  pageSize: { page: 1, width: 100, height: 200 },
};

function body(markup) {
  return new JSDOM(`<body>${markup}</body>`).window.document.body;
}

/** 页面标记层：词在 aria-label 的冒号之前（记号上不画正文，见该文件头）。 */
function labelsOnPage() {
  const root = body(renderToStaticMarkup(createElement(ReaderAiNoteLayer, {
    width: 200,
    height: 400,
    targets: KINDS.map((kind) => ({ note: note(kind), highlight: { ...highlight, itemId: `b-${kind}` } })),
    activeNoteId: null,
    onSelect() {},
  })));
  return [...root.querySelectorAll(".reader-ai-note-mark")]
    .map((mark) => mark.getAttribute("aria-label").split("：")[0]);
}

function labelsInPanel() {
  const root = body(renderToStaticMarkup(createElement(ReaderAiNotesPanel, {
    open: true,
    doc: { notes: KINDS.map(note), weakCount: 0 },
    onClose() {},
    onJump() {},
  })));
  return [...root.querySelectorAll(".reader-ai-note-kind")].map((span) => span.textContent);
}

test("两处都真的渲染出了 5 个类别 —— 否则下面那条在空数组上永远绿", () => {
  assert.equal(labelsOnPage().length, KINDS.length);
  assert.equal(labelsInPanel().length, KINDS.length);
});

test("页面标记和面板列表用的是同一套类别名", () => {
  assert.deepEqual(
    labelsInPanel(),
    labelsOnPage(),
    "同一条批注在页面上和面板里叫了两个名字",
  );
});
