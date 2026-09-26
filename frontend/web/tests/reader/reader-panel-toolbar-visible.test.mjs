/** 面板工具条上的那几个入口，是**看得见**的。
 *
 * ## 起因：和圆钮同型的第二起
 *
 * 批注 从浮窗搬进 dock 之后，class 从
 * `reader-notes-panel--float` 变成 `--workspace`，于是撞上 float-markdown.css
 * 里一条本来命不中的规则：
 *
 *     .reader-notes-panel--workspace .reader-notes-panel-toolbar { display: none }
 *
 * 特异性 (0,2,0) 压过 notes-float.css 的 (0,1,0)，三个面板的工具条整条消失。
 * 代码在、DOM 里有、点不到：
 *
 * - 批注的「导出 Markdown」是 `annotations.exportMarkdown` 在整个包里**唯一**
 *   的入口，没了就是批注导不出来；
 * - 摘录的「刷新」和「加载中…／N 条」状态同理。
 *
 * ## 所以这份文件测的是「渲染得出来」，不是「代码长什么样」
 *
 * 先把面板真渲染一遍，从 DOM 里**拿到那个按钮**（拿不到就直接红 —— 否则下面
 * 「没人藏它」在按钮根本不存在时永远绿），再拿它那条祖先链去和每一份会进
 * 阅读页的 CSS 对账。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";

import { ReaderNotesPanel } from "../../../packages/reader/src/components/react-pdf/ReaderNotesPanel.tsx";
import { hidingRulesFor } from "./helpers/reader-css.mjs";

const noop = () => {};

function render(node) {
  const dom = new JSDOM(`<body>${renderToStaticMarkup(node)}</body>`);
  return dom.window.document.body;
}

/** 按可见文字找按钮 —— 找的是用户点的那个东西，不是某个 class 名。 */
function buttonByText(root, text) {
  return [...root.querySelectorAll("button")].find((b) => b.textContent.trim() === text) ?? null;
}

const CASES = [
  {
    name: "批注面板的「导出 Markdown」",
    label: "导出 Markdown",
    node: () => createElement(ReaderNotesPanel, {
      open: true,
      groups: [{ page: 1, items: [{ id: "n1", page: 1, quote: "一段引文", note: "", pane: "source" }] }],
      count: 1,
      onClose: noop,
      onJump: noop,
      onUpdateNote: noop,
      onRemove: noop,
      onExport: async () => true,
    }),
  },
];

for (const { name, label, node } of CASES) {
  test(`${name} 真的渲染出来了，而且没有 CSS 把它藏掉`, () => {
    const body = render(node());
    // 先证明「这个东西存在」：它不存在时，下面那条在任何情况下都绿。
    const button = buttonByText(body, label);
    assert.ok(button, `${name} 没渲染出来：找不到「${label}」按钮`);
    // 工具条那一层也得在（按钮在、容器被藏掉一样看不见）。
    assert.ok(
      button.closest(".reader-notes-panel-toolbar"),
      `${name} 不在面板工具条里，这条门禁守错了地方`,
    );
    assert.deepEqual(
      hidingRulesFor(button),
      [],
      `${name} 被 CSS 藏起来了 —— 和圆钮同一种死法`,
    );
  });
}

test("扫描器本身是活的：故意藏掉就会被抓出来", () => {
  // 这条守的是上面三条的有效性。扫描器失效（解析不出规则、路径写错、正则不匹配）
  // 时上面三条会变成「永远绿」，而这正是假门禁最常见的形状。
  const dom = new JSDOM(
    `<body><aside class="reader-notes-panel reader-notes-panel--workspace">`
    + `<div class="reader-notes-panel-toolbar"><button class="reader-notes-export">x</button></div>`
    + `</aside></body>`,
  );
  const button = dom.window.document.querySelector(".reader-notes-export");
  assert.deepEqual(hidingRulesFor(button), [], "真实 CSS 里已经有人藏工具条了");
  // 同一条链上挂一条隐藏规则，扫描器必须报出来。
  const fake = dom.window.document.querySelector(".reader-notes-panel-toolbar");
  fake.classList.add("reader-float-markdown-content", "hidden");
  assert.notDeepEqual(
    hidingRulesFor(button),
    [],
    "扫描器没认出 .reader-float-markdown-content.hidden { display: none }",
  );
});
