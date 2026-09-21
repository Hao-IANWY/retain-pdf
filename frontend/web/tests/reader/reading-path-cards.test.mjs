/** 阅读路径卡片（没有概念图时的退路）的 props 必须通过 tldraw 自己的校验。
 *
 * 起因是一个线上白屏：第一版给 geo 图形传了 `props.text`，而 tldraw 5 的 geo
 * 根本没有这个键（文字走 `richText`）。表现是 `createShapes` 抛记录校验错误，
 * 画布整个不出来，栈还是压缩过的。
 *
 * typecheck 当时没拦住 —— 那一版 `buildShapes` 结尾有个 `as never`，把 props 的
 * 类型检查抹平了。现在 cast 去掉了，tsc 会管住键名；这里再加一道**运行时**的，
 * 因为 tsc 管不到值域（`size: "xs"` 类型上过得去，tldraw 不认）。
 *
 * 用的是 `@tldraw/tlschema` 导出的真校验器，不是我抄的一份规则 —— 抄的那份只会
 * 跟着我一起错。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

import {
  CARD_H,
  GAP_Y,
  buildShapes,
  cardTextFor,
  shapeIdForIndex,
  stepForShapeId,
} from "../../src/features/reader/domain/reading-path-cards.ts";
import { toRichTextDoc } from "../../src/features/reader/domain/tldraw-primitives.ts";

// tlschema 是 CJS，而且在 node 里能直接跑（不碰 DOM）。
const require = createRequire(import.meta.url);
const tlschema = require("@tldraw/tlschema");

const STEPS = [
  { order: 1, page_idx: 0, block_id: "b-abstract", why: "先看摘要建立全局印象" },
  { order: 2, page_idx: 3, block_id: "b-method-1", why: "方法的主干" },
  { order: 3, page_idx: 7, block_id: "b-fig-2" },
];

test("每个字段都能过 tldraw 的 geo props 校验", () => {
  const { geoShapeProps } = tlschema;
  assert.ok(geoShapeProps, "tlschema 没导出 geoShapeProps，校验器换地方了");

  for (const shape of buildShapes(STEPS)) {
    assert.equal(shape.type, "geo");
    for (const [key, value] of Object.entries(shape.props)) {
      assert.ok(
        key in geoShapeProps,
        `geo 没有 ${key} 这个属性 —— 写进去 createShapes 会抛校验错误`,
      );
      // 每个键单独验：整体验的话报错只说「某处不合法」，定位不到是哪个键。
      geoShapeProps[key].validate(value);
    }
  }
});

test("`text` 不是 geo 的属性 —— 这就是白屏那次踩的键", () => {
  assert.ok(
    !("text" in tlschema.geoShapeProps),
    "如果上游又把 text 加回来了，这条可以删，但要先确认 richText 还在",
  );
  for (const shape of buildShapes(STEPS)) {
    assert.ok(!("text" in shape.props), "props 里又出现 text 了");
    assert.ok("richText" in shape.props, "文字没了");
  }
});

test("富文本和 tlschema 自己的 toRichText 同形", () => {
  // 我们自己拼是因为 `tldraw` 主包没转出 toRichText（运行时和 .d.ts 都没有）。
  // 拿真实现当基准：上游改了文档格式，这条会红。
  assert.equal(typeof tlschema.toRichText, "function");
  for (const sample of ["一行", "上\n下", "空行\n\n之后", "", "尾部换行\n"]) {
    assert.deepEqual(
      toRichTextDoc(sample),
      tlschema.toRichText(sample),
      `「${sample}」拼出来的结构和 tlschema 不一致`,
    );
  }
});

test("卡片上印着锚点，页码是 1-based", () => {
  // 锚点印在卡片上才能一眼看出 agent 锚错没有。page_idx 是 0-based，显示要 +1。
  const text = cardTextFor(STEPS[1], 1);
  assert.match(text, /第 4 页/);
  assert.match(text, /b-method-1/);
  assert.match(text, /方法的主干/);
});

test("缺字段的步骤不会把画布拖垮", () => {
  // 这份 JSON 是 agent 写的，形状不保证。
  const shapes = buildShapes([{ block_id: "b-only" }]);
  assert.equal(shapes.length, 1);
  for (const [key, value] of Object.entries(shapes[0].props)) {
    tlschema.geoShapeProps[key].validate(value);
  }
  assert.match(cardTextFor({ block_id: "b-only" }, 0), /第 1 页/);
});

test("id 能往返，越界的 id 不返回步骤", () => {
  assert.equal(stepForShapeId(STEPS, shapeIdForIndex(2)), STEPS[2]);
  assert.equal(stepForShapeId(STEPS, "shape:reading-step-99"), undefined);
  assert.equal(stepForShapeId(STEPS, "shape:some-other-thing"), undefined);
});

test("卡片竖排且不重叠", () => {
  const ys = buildShapes(STEPS).map((shape) => shape.y);
  assert.deepEqual(ys, [0, CARD_H + GAP_Y, 2 * (CARD_H + GAP_Y)]);
  assert.ok(GAP_Y > 0, "间距为 0 的话卡片会贴在一起");
});
