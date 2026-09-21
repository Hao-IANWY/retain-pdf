/** tldraw 的两个小原语。单独一个文件，因为**概念图和阅读路径卡片都要用**。
 *
 * 原来它们混在 reading-path-cards.ts（当时叫 reading-path-cards.ts）里，
 * 结果概念图渲染器为了拿这两个 helper，依赖了「退路视图」那个模块 —— 一个跟它
 * 毫无关系的东西。文件名说的是 shapes，内容是两回事。
 *
 * 只许类型导入 tldraw（值导入会把 1.6 MB 拽进首屏，把画布的懒加载废掉）。
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
