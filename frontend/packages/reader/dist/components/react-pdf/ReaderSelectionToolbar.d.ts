import type { ReaderSelection } from "../../shared/data/reader-regions.js";
/** 紧凑工具条约 360px 宽（复制 / 批注 / 问 AI / 取消 + 原文·译文 切换），
 * 避免覆盖大段正文。原文／译文那一对按钮是**顶掉**了原来那个只能看不能点的
 * 栏别文字，不是加在它旁边，所以只贵了 40px 左右；切过去要看的那段文本走下面
 * 的气泡（纵向），宽度不再涨。 */
export declare const TOOLBAR_HALF = 190;
/** PDF 栏的宽度，不是视口宽度。
 *
 * dock 打开时视口右半边是 AI 面板，滚动壳被 `right: var(--reader-ai-split-width)`
 * 收窄（assistant-dock.css）。`--reader-ai-split-width` 的值是 `50vw` 这样的
 * 相对量，getComputedStyle 读自定义属性拿到的是原样字符串而不是像素，所以这里
 * 量元素而不是读 token。壳左边贴 0，量出来的宽度直接就是可用的 left 上界。
 */
export declare function readerColumnWidth(): number;
/** 把工具条夹进 PDF 栏。
 *
 * 原来夹的是 `window.innerWidth` —— dock 打开、选区又靠右时，工具条被允许画到
 * 分栏线右边，也就是糊在 AI 面板上。
 */
export declare function clampSelectionToolbarLeft(midX: number, columnWidth: number): number;
export type ReaderSelectionNoteInput = {
    page: number;
    pane: "source" | "translated";
    quote: string;
};
export type ReaderSelectionToolbarProps = {
    selection: ReaderSelection | null;
    onDismiss: () => void;
    onAskAi?: (selection: ReaderSelection) => void;
    onAddNote?: (input: ReaderSelectionNoteInput) => void;
};
export declare function copyReaderSelectionText(value: string): Promise<void>;
export declare function ReaderSelectionToolbar({ selection, onDismiss, onAskAi, onAddNote, }: ReaderSelectionToolbarProps): import("react").JSX.Element;
//# sourceMappingURL=ReaderSelectionToolbar.d.ts.map