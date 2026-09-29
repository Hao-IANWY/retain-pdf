/** 可见台面的不变式 —— 穷举，不挑几个点。
 *
 * 起因：翻译还在跑、最终译文 PDF 还不存在时点「对照」，**半个屏幕是纯白的**。
 * 不是空状态文案，是第二列一个子元素都没有。
 *
 * 成因是两套真源：`resolveReaderPaneComposition` 算 compareMode / showTranslated
 * 时完全不看 sourceViewOnly，而真正挂载右栏的闸在 use-reader-pane-model
 * （`mountTranslated = … && !sourceOnly`）。栅格按 compareMode 排两列，右栏却
 * 没东西可挂。
 *
 * 这是翻译期间点对照的**默认路径**：pill 在时对照页签是放开的，changeWorkspace
 * 还会自动打开叠加。
 *
 * 挑几个点测是抓不住的 —— 原来 reader-pane-composition.test.mjs 就把这个坏组合
 * 当成「保留既有行为」断言死了。所以这里穷举整个输入空间。
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveReaderPaneComposition }
  from "../../../packages/reader/src/ReaderAppReactPdf.tsx";

function allCompositions() {
  const rows = [];
  for (const mode of ["source", "compare", "translated"])
    for (const sourceOnly of [false, true])
      for (const translatedUrl of ["", "/t.pdf"])
        for (const overlayContentAvailable of [true, false])
          for (const liveTranslationVisible of [true, false])
            for (const assistantOpen of [true, false])
              for (const assistantPdfPane of [null, "source", "translated"]) {
                const input = {
                  mode, sourceOnly, translatedUrl, overlayContentAvailable,
                  liveTranslationVisible, assistantOpen, assistantPdfPane,
                };
                rows.push({ input, out: resolveReaderPaneComposition(input) });
              }
  return rows;
}

const ROWS = allCompositions();

/** 正对照：输入空间真的被枚举了。数字掉了说明循环被改坏。 */
test("枚举覆盖整个输入空间", () => {
  assert.equal(ROWS.length, 3 * 2 * 2 * 2 * 2 * 2 * 3);
  // 而且结果确实是多样的 —— 全部相同说明函数被短路了。
  assert.ok(new Set(ROWS.map((r) => r.out.kind)).size >= 3, "kind 只有一种，函数八成被短路了");
});

const violations = (name, predicate) => {
  const bad = ROWS.filter((r) => predicate(r.out, r.input));
  assert.deepEqual(
    bad.slice(0, 3).map((r) => JSON.stringify(r.input)),
    [],
    `${name}：${bad.length} 种组合命中`,
  );
};

test("对照排两列时，右栏一定有内容可挂", () => {
  // sourceViewOnly = 没有可并排的最终译文。此时排两列 = 半屏纯白。
  violations("对照两栏但右栏没内容", (o) => o.compareMode && o.sourceViewOnly);
});

test("永远不会两栏都不显示", () => {
  violations("整块台面空白", (o) => !o.showSource && !o.showTranslated);
});

test("说要显示译文时，译文一定存在", () => {
  violations("说要显示译文但没有译文", (o) => o.showTranslated && o.sourceViewOnly);
});

test("compareMode 和 showTranslated 不许脱钩", () => {
  // 脱钩就意味着栅格和内容各说各的 —— 正是这个 bug 的形状。
  violations("compareMode 真而 showTranslated 假", (o) => o.compareMode && !o.showTranslated);
});
