/** AI 批注在 PDF 页面上的标记层。
 *
 * ## 页面上只画记号，永远不画正文
 *
 * 这是密度的根本解。批注正文只在点开的弹窗里 —— 无论 agent 标了 3 条还是 30 条，
 * 页面本身永远保持可读。把文字铺在页面上的做法在几条之后就没法看了，而这个功能
 * 的全部价值是「读的时候不被打断」。
 *
 * ## 用点击，不用悬停
 *
 * 标记密集时悬停会疯狂闪烁，而且触屏上根本没有悬停。
 *
 * ## 定位复用已有的投影
 *
 * `projectReaderRegion(highlight, width, height)` 把 bbox 换算成页面内的 CSS 矩形，
 * 它已经处理了 `bottom_left` / `top_left` 两种原点。记号贴在块的左边缘外侧，不盖住
 * 正文 —— 盖住正文的标注是在帮倒忙。
 *
 * 一条批注在原文栏和译文栏各自定位，是因为 highlight 是按 pane 解析出来的：锚点
 * 是语义的（block_id），不是某张 PDF 的坐标。英文原文上标的疑问，中文译文的同一
 * 个块上也有。
 */
import { type ReaderRegionHighlight } from "../shared/data/reader-regions.js";
import type { AiNote } from "../shared/data/ai-notes.js";
export type ReaderAiNoteTarget = {
    note: AiNote;
    highlight: ReaderRegionHighlight;
};
type ReaderAiNoteLayerProps = {
    width: number;
    height: number;
    targets: readonly ReaderAiNoteTarget[];
    activeNoteId: string | null;
    onSelect: (note: AiNote, rect: {
        left: number;
        top: number;
        width: number;
        height: number;
    }) => void;
};
export declare function ReaderAiNoteLayer({ width, height, targets, activeNoteId, onSelect, }: ReaderAiNoteLayerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ReaderAiNoteLayer.d.ts.map