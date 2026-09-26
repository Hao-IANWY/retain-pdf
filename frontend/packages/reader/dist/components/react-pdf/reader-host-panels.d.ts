import type { LucideIcon } from "lucide-react";
import type { ReaderAdapters, ReaderTerminalSlotProps } from "../../adapters.js";
import { type ReaderHostPanelId } from "../../shared/types/reader-assistant-panels.js";
/** 收 props 形状为 P 的那些适配键。
 *
 * 从 ReaderAdapters 推出来，不在这里抄一份键名 —— 抄的那份会漂，而漂了的表现是
 * 「tab 永远不出现」，没有任何报错。新增一个同形状的适配器会自动可用。
 */
type AdapterKeysTaking<P> = {
    [K in keyof ReaderAdapters]-?: NonNullable<ReaderAdapters[K]> extends (props: P) => unknown ? K : never;
}[keyof ReaderAdapters];
type ReaderHostPanelBase = {
    id: ReaderHostPanelId;
    /** dock 展开时 tab 上的文字。 */
    label: string;
    /** dock 收起时侧边竖条上的缩写。 */
    short: string;
    Icon: LucideIcon;
    ariaLabel: string;
    /** 关了 tab 也不卸载。
     *
     * 只在「卸载会丢东西」时才开：终端卸载 = 关 WebSocket = 杀掉 PTY 子进程，
     * 切个 tab 回来 fx 的会话就没了；画布卸载 = tldraw 整个重建，会闪。
     * 阅读路径没有这类状态，而且每次打开重新拉一次反而是对的（agent 可能刚重写过）。
     */
    keepMounted: boolean;
};
/** 按 props 形状分两种。做成判别联合，壳里就能靠 `slot` 收窄到正确的调用签名 ——
 * 第一版在这儿用 `as never` 硬转，等于把类型检查关掉，而这个功能上一次白屏
 * 正是这么来的。 */
export type ReaderHostPanelSpec = ReaderHostPanelBase & ({
    slot: "terminal";
    adapterKey: AdapterKeysTaking<ReaderTerminalSlotProps>;
});
export type ReaderHostPanelSlotKind = ReaderHostPanelSpec["slot"];
/** 顺序来自 id 清单，不是这张表的字面量顺序 —— 清单才是真源。 */
export declare const READER_HOST_PANELS: readonly ReaderHostPanelSpec[];
export declare function readerHostPanelSpec(id: ReaderHostPanelId): ReaderHostPanelSpec;
export {};
//# sourceMappingURL=reader-host-panels.d.ts.map