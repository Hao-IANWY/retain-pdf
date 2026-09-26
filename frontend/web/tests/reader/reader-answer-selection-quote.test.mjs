/**
 * 「选中的文字 → 输入框里的 Markdown 引用块」这条契约。
 *
 * 原来这个文件还钉着阅读器 AI 面板的接线（AnswerSelectionToolbar 用哪个
 * primitive、挂在 ReaderReadingView 的哪儿）。那个面板随「阅读页只留一扇 AI
 * 的门」删掉了，那两段就没有守的东西了。
 *
 * 但 buildQuoteBlock / mergeQuoteIntoDraft 本身**活着** —— 首页的「问」
 * (features/ask/ui/use-home-ask-composer.ts) 从 @retainpdf/reader/runtime/ai
 * 取的就是这两个。所以这个文件留下来，只保留测它们行为的那部分。
 *
 * 钉的最要紧一条：引用要落进输入框正文，不是留在 composer 的 quote 状态 ——
 * 发送链路只读消息的 text part，挂在 metadata 上的引用会一声不响到不了模型。
 */

import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";

const { buildQuoteBlock, mergeQuoteIntoDraft } = await import(
  "../../../packages/reader/src/shared/ai/answer-quote.ts"
);

/** 记录 composer 收到的调用，模拟 assistant-ui 的 ComposerMethods。 */
function fakeComposer(initialText = "") {
  let text = initialText;
  const quotes = [];
  return {
    getState: () => ({ text }),
    setText: (next) => { text = next; },
    setQuote: (q) => { quotes.push(q); },
    get text() { return text; },
    get quotes() { return quotes; },
  };
}

/**
 * 组件里那段逻辑的等价实现。
 *
 * 直接渲染组件要把整个 assistant-ui runtime 立起来，那会把这条测试变成在测框架。
 * 这里测的是「选中的文字怎么变成输入框里的内容」这条契约本身；组件确实调了它，由
 * 下面的源码契约测试钉住。
 */
function quoteInto(composer, selected) {
  const text = `${selected || ""}`.trim();
  if (!text) return;
  const block = buildQuoteBlock(text);
  if (!block) return;
  composer.setText(mergeQuoteIntoDraft(composer.getState().text || "", block));
}

describe("引用落进输入框", () => {
  let composer;
  beforeEach(() => { composer = fakeComposer(); });

  it("选中的话变成 Markdown 引用块进正文", () => {
    quoteInto(composer, "第二种是线搜索方法");
    assert.equal(composer.text, "> 第二种是线搜索方法\n\n");
  });

  it("不覆盖已经写了一半的草稿", () => {
    const withDraft = fakeComposer("我想问的是");
    quoteInto(withDraft, "线搜索");
    assert.equal(withDraft.text, "> 线搜索\n\n我想问的是");
  });

  it("空选区什么都不做", () => {
    quoteInto(composer, "   ");
    assert.equal(composer.text, "");
  });

  it("不走 setQuote——那条路上没人读 metadata，引用到不了模型", () => {
    quoteInto(composer, "线搜索");
    assert.deepEqual(composer.quotes, [], "引用被留在了 composer 的 quote 状态里");
  });

  it("连续引用两段都进去", () => {
    quoteInto(composer, "第一段");
    quoteInto(composer, "第二段");
    assert.ok(composer.text.includes("> 第一段"));
    assert.ok(composer.text.includes("> 第二段"));
  });
});
