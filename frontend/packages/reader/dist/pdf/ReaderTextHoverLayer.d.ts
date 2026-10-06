import { type ReaderRegionHighlight, type ReaderRegionRect } from "../shared/data/reader-regions.js";
export type ReaderTextHoverTarget = {
    itemId: string;
    highlight: ReaderRegionHighlight;
    rect: ReaderRegionRect;
};
export declare function projectReaderTextHoverTargets(regions: readonly ReaderRegionHighlight[], width: number, height: number): ReaderTextHoverTarget[];
export declare function hitTestReaderTextHoverTarget(targets: readonly ReaderTextHoverTarget[], x: number, y: number): ReaderTextHoverTarget | null;
/**
 * 写剪贴板。`navigator.clipboard` 在非安全上下文（局域网 IP 打开的 http 页面）里不存在，
 * 退回 execCommand("copy")；两条都失败返回 false，不假装成功。
 */
export declare function copyReaderText(text: string): Promise<boolean>;
export declare const READER_TEXT_HOVER_COPY_CLASS = "reader-text-hover-copy";
export declare const READER_TEXT_HOVER_ID_CLASS = "reader-text-hover-id";
export declare const READER_TEXT_HOVER_TOOLS_CLASS = "reader-text-hover-tools";
/**
 * 悬停内容块：红色虚线框 + 左上角翻译编号 + 右上角「复制」（行间公式是「复制 LaTeX」）。
 *
 * 对照阅读时左右两栏一起画（悬停的 itemId 由 ReaderCompareGrid 共享），左栏复制原文、
 * 右栏复制译文 —— 这是 4.1.x 旧引擎里最常用的那个交互，React 引擎替换时丢了，只剩一个
 * 灰色细框和「文字」标签，复制要先点块、再在浮条里点。
 */
export declare function ReaderTextHoverLayer({ target, pane, copiedSignal, }: {
    target: ReaderTextHoverTarget | null;
    pane?: "source" | "translated";
    /** 双击整块复制成功时递增：框上的按钮跟着显示「已复制」。 */
    copiedSignal?: number;
}): import("react").JSX.Element;
//# sourceMappingURL=ReaderTextHoverLayer.d.ts.map