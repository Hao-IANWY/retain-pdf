/** 把阅读路径的每一步变成一个 tldraw 图形。
 *
 * 单独成模块有两个理由，都不是为了「分层好看」：
 *
 * 1. **它得能被测**。这里产出的 props 必须通过 tldraw 自己的记录校验，而那个校验
 *    只有 `createShapes` 真正跑起来才会触发 —— 在浏览器里，报错是一串压缩过的
 *    栈。抽出来之后，测试可以直接拿 `@tldraw/tlschema` 的 `geoShapeProps` 逐字段
 *    验，错在哪个键一眼看得见。
 * 2. **它不碰 React**，所以放在 domain/ 里，测试不用起渲染环境。
 *
 * ## 踩过的坑：geo 图形没有 `text` 这个属性
 *
 * 第一版写的是 `props: { text: "..." }`。tldraw 5 的 geo props 里**没有这个键**，
 * 文字走 `richText`（TipTap 的文档 JSON）。传进去的结果是 `createShapes` 抛记录
 * 校验错误，画布整个白掉。
 *
 * 更值得记的是**为什么 typecheck 没拦住**：那一版 `buildShapes` 结尾有个
 * `as never`，把 props 的类型检查整个抹平了。类型是对的工具，是我自己把它关掉的。
 * 所以这里不再有任何 cast，而且 `.map()` 的回调标了显式返回类型（原因见下面那段
 * 注释）—— 拼错一个键，tsc 当场就红。
 */
import type { TLGeoShape, TLRichText, TLShapePartial } from "tldraw";

export type ReadingStep = {
  order?: number;
  page_idx?: number;
  block_id?: string;
  why?: string;
};

/** 卡片尺寸和间距。竖排是有意的：阅读顺序天然是从上往下。 */
export const CARD_W = 300;
export const CARD_H = 120;
export const GAP_Y = 52;

/** shape id ↔ 步骤序号。tldraw 的 id 必须以 `shape:` 开头。 */
export function shapeIdForIndex(index: number): TLShapePartial<TLGeoShape>["id"] {
  return `shape:reading-step-${index}` as TLShapePartial<TLGeoShape>["id"];
}

export function stepForShapeId(
  steps: readonly ReadingStep[],
  shapeId: string,
): ReadingStep | undefined {
  const match = /^shape:reading-step-(\d+)$/.exec(shapeId);
  return match ? steps[Number(match[1])] : undefined;
}

/** 纯文本 → TipTap 文档。空行是「没有 content 的段落」，不是空字符串的段落。
 *
 * 和 `@tldraw/tlschema` 的 `toRichText` 同形 —— 那个函数在 `tldraw` 主包里**没有
 * 转出**（运行时和 .d.ts 都没有），只能自己拼。测试拿 tlschema 的真实现逐例对比，
 * 上游改了格式这里会红。
 */
export function toRichTextDoc(text: string): TLRichText {
  return {
    type: "doc",
    content: text.split("\n").map((line) =>
      line.length === 0
        ? { type: "paragraph" }
        : { type: "paragraph", content: [{ type: "text", text: line }] },
    ),
  } as TLRichText;
}

/** 卡片正文：序号 + 理由 + 锚点。
 *
 * 锚点直接印在卡片上，不是藏在点击行为里 —— agent 锚错了页码，扫一眼就看得出来，
 * 不用逐个点开才发现。
 */
export function cardTextFor(step: ReadingStep, index: number): string {
  const anchor = `第 ${(step.page_idx ?? 0) + 1} 页 · ${step.block_id ?? ""}`;
  return `${step.order ?? index + 1}. ${step.why ?? ""}\n\n${anchor}`;
}

export function buildShapes(
  steps: readonly ReadingStep[],
): TLShapePartial<TLGeoShape>[] {
  // 回调的返回类型必须**显式写出来**。只在函数返回值上标注是不够的：`.map()` 会
  // 去推断回调的返回类型，对象字面量因此没有上下文类型，多余属性检查不触发 ——
  // 把 richText 写成 text，tsc 一声不吭（实测过）。标注上去才会当场报 TS2353。
  return steps.map((step, index): TLShapePartial<TLGeoShape> => ({
    id: shapeIdForIndex(index),
    type: "geo",
    x: 0,
    y: index * (CARD_H + GAP_Y),
    props: {
      geo: "rectangle",
      w: CARD_W,
      h: CARD_H,
      richText: toRichTextDoc(cardTextFor(step, index)),
      size: "s",
      align: "start",
      verticalAlign: "start",
    },
  }));
}
