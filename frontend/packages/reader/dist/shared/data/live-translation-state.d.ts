import type { ReaderLiveTranslationCommitEvent as LiveTranslationCommitEvent, ReaderLiveTranslationItem as LiveTranslationItem, ReaderLiveTranslationLayout as LiveTranslationLayout, ReaderLiveTranslationLayoutPage as LiveTranslationLayoutPage, ReaderLiveTranslationPageSnapshot as LiveTranslationPageSnapshot } from "../../contracts/live-translation.js";
export type LiveTranslationPageState = {
    attempt: number;
    generation: number;
    pageHash: string;
    itemsById: ReadonlyMap<string, LiveTranslationItem>;
    /** Last authoritative SSE seq that changed this item; used only as an animation key. */
    changedAtSeqById: ReadonlyMap<string, number>;
    lastEventSeq: number;
};
export type LiveTranslationState = {
    layoutByPage: ReadonlyMap<number, LiveTranslationLayoutPage>;
    pagesByPage: ReadonlyMap<number, LiveTranslationPageState>;
    lastSeq: number;
    connection: "idle" | "connecting" | "live" | "reconnecting" | "terminal" | "unavailable";
    /** Authoritative task status supplied by the Reader session. */
    jobStatus: string;
    /** Human-readable transport/capability failure. Never contains translated content. */
    error: string;
};
export declare const EMPTY_LIVE_TRANSLATION_STATE: LiveTranslationState;
export declare function layoutPageMap(layout: LiveTranslationLayout): ReadonlyMap<number, LiveTranslationLayoutPage>;
export type SnapshotDecision = "accept" | "ignore" | "retry";
/**
 * Decide against the event first, then against the already rendered page.
 * A newer snapshot is valid because the immutable page endpoint may have advanced
 * again between the SSE hint and this read.
 */
export declare function decideLiveTranslationSnapshot(current: LiveTranslationPageState | undefined, event: LiveTranslationCommitEvent, snapshot: LiveTranslationPageSnapshot): SnapshotDecision;
export declare function applyLiveTranslationSnapshot(state: LiveTranslationState, event: LiveTranslationCommitEvent, snapshot: LiveTranslationPageSnapshot): LiveTranslationState;
/** 实时译文叠层的开关分布在两处，这里是那个分布的唯一真源。
 *
 * - 顶栏 pill（ReaderWorkspaceTabs 的 liveTranslation）：兼报状态（N 页 /
 *   重连中），任务进终态后只剩一句永久的「已完成」，所以终态不给。
 * - 源文栏内的「译文」按钮（ReaderAppReactPdf 的 sourcePaneAction）：只要源文
 *   栏在台面上就在，它贴着叠层落地的那一栏。
 *
 * 收掉顶栏 pill 的前提是第二个开关接得住。这个函数存在就是为了让那句话可测：
 * 见 overlayToggleAlwaysReachable —— 叠层只要画得出来，就至少有一个开关够得着。
 */
export type LiveTranslationToggles = {
    /** 顶栏那个带状态文字的 pill */
    topBarPill: boolean;
    /** 源文栏内部那个「译文」按钮 */
    sourcePaneToggle: boolean;
    /** 叠层此刻是否真的会画到屏幕上（画得出来才谈得上需要开关） */
    overlayRenderable: boolean;
};
export declare function resolveLiveTranslationToggles(input: {
    hasOverlayContent: boolean;
    connection: LiveTranslationState["connection"];
    showSource: boolean;
}): LiveTranslationToggles;
//# sourceMappingURL=live-translation-state.d.ts.map