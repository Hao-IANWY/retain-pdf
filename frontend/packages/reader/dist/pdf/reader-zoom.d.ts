export declare const READER_ZOOM_MIN = 0.25;
export declare const READER_ZOOM_MAX = 1;
/** 默认 50%：半屏宽，对照两侧刚好铺满 */
export declare const READER_ZOOM_DEFAULT = 0.5;
export type ReaderZoomMode = "source" | "translated" | "compare";
export declare function defaultZoomForMode(_mode?: ReaderZoomMode | string): number;
/** 内部 zoom 即「占 shell 全宽的比例」0.25–1 */
export declare function clampReaderZoom(value: number): number;
export declare function stepReaderZoom(current: number, direction: 1 | -1): number;
/** UI 显示百分比 = zoom × 100（最大 100） */
export declare function zoomToDisplayPercent(zoom: number): number;
/** UI 百分比 → zoom */
export declare function displayPercentToZoom(percent: number): number;
/** 对照半栏宽（仅布局用，不参与 zoom 百分比语义） */
export declare function comparePaneWidth(shellWidth: number): number;
/**
 * 目标容器可用内容宽（扣 padding）。
 * 这里的 containerWidth 应是「期望页宽对应的壳宽度」= shellWidth × zoom。
 */
export declare function fitContentWidth(containerWidth: number): number;
/**
 * 由 shell 全宽 + 全宽占比 zoom 得到绘制页宽。
 * 原文/译文/对照共用：同一 zoom → 同一页像素宽。
 */
export declare function pageWidthFromShell(shellWidth: number, userZoom?: number): number;
export declare function preserveScrollCenter(shell: HTMLElement | null | undefined, zoomRatio: number): void;
/** shell 宽度变化时，页面宽度该立刻跟、还是等布局稳定再跟。
 *
 * # 为什么需要这个判断
 *
 * PDF 每一页的 canvas 是按 `<Page width>` 重画的，而这个 width 最终跟的是
 * **shell 的实时宽度**。shell 宽度在两种操作下是**连续变化**的：
 *
 * - 开关右侧面板：`.reader-react-scroll-shell { transition: right 180ms ease }`，
 *   180ms 内每帧都在变
 * - 拖分栏线：ReaderAssistantSplitResizeHandle 每次指针移动写一次
 *   `--reader-ai-split-width`
 *
 * 不防抖的话，开关一次面板会让每张可见页重画十来次，每次都要取消上一次
 * pdf.js 的渲染任务。除了纯粹的浪费，它还是取消竞态的必要前提 —— 竞态的表现是
 * canvas 已经换成新尺寸、画上去的却是上一次按旧比例画了一半的内容，看起来就是
 * 「页面被从中间切掉，右边空白」，而且**栏那一层看不到溢出，所以横向滚不动**。
 *
 * # 首次为什么必须立刻
 *
 * 等 200ms 再给宽度 = 打开文档先白屏 200ms。只有**变化**需要等稳定。
 *
 * # 代价
 *
 * 过渡的那 200ms 里页面还是旧宽度，会短暂地比栏宽（栏内可横向滚），然后一次
 * 到位。这比渲染坏掉好得多，而且是自愈的。
 */
export type ReaderWidthCommit = "ignore" | "immediate" | "settle";
/** 小于这个幅度的变化不值得重画整页。 */
export declare const READER_WIDTH_EPSILON = 8;
export declare function resolveReaderWidthCommit(next: number, last: number): ReaderWidthCommit;
/** 等布局稳定的时长。比 shell 的 180ms 过渡略长，保证过渡结束后只提交一次。 */
export declare const READER_WIDTH_SETTLE_MS = 200;
//# sourceMappingURL=reader-zoom.d.ts.map