/** 选区浮条的取文规则 —— 一段的原文和译文本来就都在内存里。
 *
 * ## 为什么要有这一层
 *
 * `ReaderRegion` 同时带 `source` 和 `translated` 两个 box，各自有 text。浮条从前
 * 只按选区所在那一栏取一份，于是读译文时想对一眼原文，只能切整个文档的模式，再
 * 用肉眼在一整页看不懂的文字里找回那一段。数据早就到了，缺的只是一个开关。
 *
 * ## 「能不能切」不能拿 readerRegionContent 判断
 *
 * `readerRegionContent` 在 box.text 为空时会退回 `region.markdown`。对只跑了 OCR
 * 的任务（status = source_only），译文栏那一侧取到的其实是同一份原文 —— 按它判断
 * 就会做出一个点了没反应的按钮，而这正是最糟的形态：用户以为功能坏了。所以这里
 * 只认两个 box 各自的 text，一个空就不给切。
 *
 * 两侧文本完全相同时也不给切：公式在两栏是同一串 LaTeX，图片两侧都没文本，切过去
 * 屏幕上什么都没变，同样是「点了没反应」。
 *
 * 纯文本拖选（ReaderTextSelection）根本没有 region，只有一句 quote，天然不给切。
 */
import { type ReaderRegionKind, type ReaderSelection } from "../../shared/data/reader-regions.js";
import type { ReaderPaneId } from "../../shared/types/reader-dom.js";
export type ReaderSelectionPaneTexts = Record<ReaderPaneId, string>;
/** 两栏各自独立的文本；任意一侧缺失或两侧一样时返回 null（= 不给切）。 */
export declare function readerSelectionPaneTexts(selection: ReaderSelection): ReaderSelectionPaneTexts | null;
export type ReaderSelectionView = {
    kind: ReaderRegionKind;
    /** 当前取文的栏。不能切时恒等于选区所在的栏。 */
    pane: ReaderPaneId;
    /** 这一栏的页码。译文 PDF 的页码可以和原文不同，批注锚点得跟着走。 */
    page: number;
    /** 浮条上给人看、也是批注存下去的那段文本。 */
    text: string;
    /** 复制真正写进剪贴板的内容（公式扒掉 $$ 包裹）。 */
    copyValue: string;
    /** 渲染切换控件吗。false 时连控件都不画，而不是画一个点不动的。 */
    canSwitch: boolean;
    /** 切到了选区之外的那一栏 —— 这段字页面上看不见，必须在浮条里显示出来。
     * 反过来，看的就是选区那一栏时不要重复一遍：屏幕上已经有了。 */
    showPeek: boolean;
};
export declare function resolveReaderSelectionView(selection: ReaderSelection, viewPane: ReaderPaneId | null): ReaderSelectionView;
export declare const READER_PANE_LABEL: Record<ReaderPaneId, string>;
//# sourceMappingURL=reader-selection-view.d.ts.map