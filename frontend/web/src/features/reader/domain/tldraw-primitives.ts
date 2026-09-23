/** tldraw 的两个小原语 —— 概念图和画板的图形都要用。
 *
 * 只许类型导入 tldraw（值导入会把 1.6 MB 拽进首屏，把画布的懒加载废掉）。
 *
 * ## 踩过的坑：geo 图形没有 `text` 这个属性
 *
 * 第一版图形写的是 `props: { text: "..." }`。tldraw 5 的 geo props 里**没有这个
 * 键**，文字走 `richText`（TipTap 的文档 JSON，也就是下面这个函数产出的东西）。
 * 传进去的结果是 `createShapes` 抛记录校验错误，画布整个白掉。
 *
 * 更值得记的是**为什么 typecheck 没拦住**，这里有两条，加图形的人两条都会撞上：
 *
 * 1. 那一版结尾有个 `as never`，把 props 的类型检查整个抹平了。类型是对的工具，
 *    是我自己把它关掉的 —— 所以图形构造里不该再出现任何 cast。
 * 2. 去掉 cast 还不够：`.map()` 会**推断**回调的返回类型，对象字面量因此没有
 *    上下文类型，多余属性检查不触发。把 richText 写成 text，tsc 一声不吭
 *    （实测过）。回调必须**显式标返回类型**（`(node): TLShapePartial<TLGeoShape>
 *    => ({...})`）才会当场报 TS2353。
 *
 * 运行时那道由 reading-canvas-doc / board 的测试守着（拿 `@tldraw/tlschema` 的
 * `geoShapeProps` 逐字段验）。这段说的是编译期那道为什么会漏。
 */
import type { TLGeoShape, TLRichText } from "tldraw";

/** geo 图形的合法颜色。从 tldraw 的类型里取，不自己列一份 —— 列出来的那份只会
 * 跟上游漂移，而漂移的表现是运行时校验失败。 */
export type TLDefaultColorStyleLike = TLGeoShape["props"]["color"];

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
