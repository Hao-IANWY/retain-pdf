import type { ReactElement } from "react";
import type { LiveTranslationState } from "../../shared/data/live-translation-state.js";
export type ReaderWorkspaceView = "reading" | "compare" | "markdown" | "ai";
export type ReaderWorkspaceMode = "source" | "compare" | "translated";
export type ReaderWorkspaceTabsProps = {
    mode: ReaderWorkspaceMode;
    documentReady: boolean;
    /**
     * 「无可并排的最终译文」(sourceOnly || !translatedUrl)。
     * 与 FAB 的 sourceOnly（无 job）语义不同：禁对照/译文页签看这个。
     */
    sourceViewOnly?: boolean;
    onModeChange: (mode: ReaderWorkspaceMode) => void;
    liveTranslation?: {
        visible: boolean;
        state: LiveTranslationState;
        onToggle: () => void;
    } | null;
    /**
     * 对照被辅助面板降级成了单栏（paneComposition.compareDegradedByAssistant）。
     * 传了就在顶栏上说这件事，并给一个一键恢复。
     */
    compareDegraded?: boolean;
    onRestoreCompare?: () => void;
};
/** 降级时顶栏那条提示说什么。
 *
 * 只写「对照不可用」没用 —— 用户要知道**是谁占了它**和**怎么拿回来**。
 * 降级到哪一栏也得说：从选区问 AI 会锁到译文栏，这时留下的是译文不是原文。
 */
export declare function compareDegradedCopy(visiblePane: ReaderWorkspaceMode): string;
export declare function liveTranslationStatusCopy(state: LiveTranslationState): string;
export declare function isReaderWorkspaceDisabled(input: {
    id: ReaderWorkspaceMode;
    documentReady: boolean;
    /** 「无可并排的最终译文」；有 live 译文时对照仍可开 */
    sourceViewOnly: boolean;
    liveTranslationAvailable: boolean;
}): boolean;
export declare function ReaderWorkspaceTabs(props: ReaderWorkspaceTabsProps): ReactElement;
//# sourceMappingURL=ReaderWorkspaceTabs.d.ts.map