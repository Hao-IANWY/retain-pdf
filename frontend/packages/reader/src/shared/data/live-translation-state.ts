import type {
  ReaderLiveTranslationCommitEvent as LiveTranslationCommitEvent,
  ReaderLiveTranslationItem as LiveTranslationItem,
  ReaderLiveTranslationLayout as LiveTranslationLayout,
  ReaderLiveTranslationLayoutPage as LiveTranslationLayoutPage,
  ReaderLiveTranslationPageSnapshot as LiveTranslationPageSnapshot,
} from "../../contracts/live-translation.js";

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

export const EMPTY_LIVE_TRANSLATION_STATE: LiveTranslationState = {
  layoutByPage: new Map(),
  pagesByPage: new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: "",
};

export function layoutPageMap(layout: LiveTranslationLayout): ReadonlyMap<number, LiveTranslationLayoutPage> {
  return new Map((layout?.pages || []).map((page) => [page.page_idx, page]));
}

export type SnapshotDecision = "accept" | "ignore" | "retry";

function compareVersion(
  left: Pick<LiveTranslationPageState | LiveTranslationPageSnapshot, "attempt" | "generation">,
  right: Pick<LiveTranslationPageState | LiveTranslationPageSnapshot, "attempt" | "generation">,
): number {
  if (left.attempt !== right.attempt) return left.attempt < right.attempt ? -1 : 1;
  if (left.generation !== right.generation) return left.generation < right.generation ? -1 : 1;
  return 0;
}

/**
 * Decide against the event first, then against the already rendered page.
 * A newer snapshot is valid because the immutable page endpoint may have advanced
 * again between the SSE hint and this read.
 */
export function decideLiveTranslationSnapshot(
  current: LiveTranslationPageState | undefined,
  event: LiveTranslationCommitEvent,
  snapshot: LiveTranslationPageSnapshot,
): SnapshotDecision {
  if (snapshot.page_idx !== event.page_idx) return "retry";
  const againstEvent = compareVersion(snapshot, event);
  if (againstEvent < 0) return "retry";
  if (againstEvent === 0 && snapshot.page_hash !== event.page_hash) return "retry";
  if (!current) return "accept";
  const againstCurrent = compareVersion(snapshot, current);
  if (againstCurrent < 0) return "ignore";
  if (againstCurrent === 0) {
    // 同版本、hash 对不上 → **以后端为准**，不能 retry。
    //
    // 走到这一行时快照已经过了对事件的全部校验（版本不低于事件，且同版本时
    // hash 与事件一致），也就是后端给的就是权威答案。而 retry 会去重读**同一个
    // 不可变端点** 9 次（SNAPSHOT_RETRY_MS 累计 8.2s），后端那三个字段来自同一行
    // DB 记录，9 次的答案必然完全相同 —— 这条 retry 在物理上不可能成功。
    //
    // 代价是实打实的：那 8.2 秒里 onEvent 被 await 堵着，**后面所有页的译文一起
    // 停**；9 次之后放弃这一页并推进 lastSeq，而重连用 afterSeq，这个事件再也不会
    // 被重放 —— 该页于本次会话内永久停在旧版本。
    return snapshot.page_hash === current.pageHash ? "ignore" : "accept";
  }
  return "accept";
}

export function applyLiveTranslationSnapshot(
  state: LiveTranslationState,
  event: LiveTranslationCommitEvent,
  snapshot: LiveTranslationPageSnapshot,
): LiveTranslationState {
  if (event.seq <= state.lastSeq) return state;
  const current = state.pagesByPage.get(event.page_idx);
  const decision = decideLiveTranslationSnapshot(current, event, snapshot);
  if (decision === "retry") return state;
  if (decision === "ignore") {
    return { ...state, lastSeq: event.seq, connection: "live", error: "" };
  }
  const itemsById = new Map(snapshot.items.map((item) => [item.item_id, item]));
  const changedAtSeqById = new Map(current?.changedAtSeqById || []);
  for (const itemId of event.changed_item_ids) {
    if (itemsById.has(itemId)) changedAtSeqById.set(itemId, event.seq);
  }
  const pagesByPage = new Map(state.pagesByPage);
  pagesByPage.set(event.page_idx, {
    attempt: snapshot.attempt,
    generation: snapshot.generation,
    pageHash: snapshot.page_hash,
    itemsById,
    changedAtSeqById,
    lastEventSeq: event.seq,
  });
  return {
    ...state,
    pagesByPage,
    lastSeq: event.seq,
    connection: "live",
    error: "",
  };
}

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

export function resolveLiveTranslationToggles(input: {
  hasOverlayContent: boolean;
  connection: LiveTranslationState["connection"];
  showSource: boolean;
}): LiveTranslationToggles {
  const { hasOverlayContent, connection, showSource } = input;
  return {
    topBarPill: hasOverlayContent && connection !== "terminal",
    sourcePaneToggle: hasOverlayContent && showSource,
    overlayRenderable: hasOverlayContent && showSource,
  };
}
