import type { ReactElement } from "react";
import type { ReaderAssistantPanel } from "./reader-assistant-types.js";
export type { ReaderAssistantPanel } from "./reader-assistant-types.js";
export type ReaderAssistantDockProps = {
    active: ReaderAssistantPanel | null;
    /** 角标条数。0 / 缺省不画 —— 「0 条」比不画更让人以为坏了。
     *
     * 但**行本身永远在**：条数为 0 恰恰是最需要入口的时候（用户根本不知道有
     * AI 批注这回事）。tab 清单来自 readerDockTabs()，它连条数都拿不到，
     * 所以「按条数把 tab 藏掉」在这里写不出来。
     */
    badges?: Partial<Record<ReaderAssistantPanel, number>>;
    /** 无 job 时为 true；缺省从 reader context 取 controller.sourceOnly */
    sourceOnly?: boolean;
    /** 缺省时从 reader context 的 assistant actions 取 */
    onSelect?: (panel: ReaderAssistantPanel) => void;
    onClose?: () => void;
};
export declare function ReaderAssistantDock(props: ReaderAssistantDockProps): ReactElement;
//# sourceMappingURL=ReaderAssistantDock.d.ts.map