/** 宿主槽位面板的壳 —— 三个面板共用这一个，不再各写一份。
 *
 * 原来 ReaderAppReactPdf 里有三段 19–21 行、彼此九成相同的 `ReaderFloatShell`。
 * 重复本身还不是最糟的：dock 的 tab 由「适配器在不在」决定，而壳由宿主另写一遍，
 * **两边没有任何强制关系** —— 忘了写壳，tab 照样在，点了什么都不显示，tsc 和
 * 609 个测试全绿（实测）。现在两边同源于 READER_HOST_PANELS。
 *
 * 定位由**包**负责：和 Markdown / AI 面板套同一个壳、同一个 placement。宿主只给
 * 内容 —— 它不知道 dock 在哪一侧，也不该知道。第一版终端把这段放在 Suspense
 * 外面、不套壳，结果铺满整个窗口盖住了 PDF。
 *
 * 这是个组件而不是一段 map 里的 JSX：`useMountedSinceFirstOpen` 是 hook，必须
 * 无条件调用，只能住在组件里。
 */
import type { ReactNode } from "react";
import type { ReaderHostPanelSpec } from "./reader-host-panels.js";
export type ReaderHostPanelContext = {
    jobId: string;
    /** 换文档就换终端会话；同一文档来回切 tab 接回同一个。 */
    sessionKey: string;
    /** 跳转留在包里：锚点怎么变成翻页+高亮要看当前分栏和模式，宿主自己实现会和
     * 这些状态打架。 */
    onJump: (anchor: {
        page_idx?: number;
        block_id?: string;
    }) => void;
    onClose: () => void;
};
export declare function ReaderHostPanelShell({ panel, active, context, }: {
    panel: ReaderHostPanelSpec;
    active: string | null;
    context: ReaderHostPanelContext;
}): ReactNode;
//# sourceMappingURL=ReaderHostPanelShell.d.ts.map