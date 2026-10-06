// 单页：对齐旧 createManualPageElement + setManualPageSize（固定宽高）
// 对照时 syncedMinHeight 来自 syncReaderPageRows 的 max 高度

import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Page } from "react-pdf";
import {
  READER_NATURAL_HEIGHT_ATTR,
  READER_PAGE_ATTR,
  READER_PAGE_SLOT_CLASS,
  READER_PANE_ATTR,
  READER_PDF_PAGE_CLASS,
  READER_PDF_PAGE_PLACEHOLDER_CLASS,
  type ReaderPaneId,
} from "./reader-dom-contract.js";
import {
  projectReaderRegion,
  readerRegionContent,
  type ReaderRegionHighlight,
  type ReaderRegionSelection,
} from "../shared/data/reader-regions.js";
import { ReaderStructureSelectionLayer } from "./ReaderStructureSelectionLayer.js";
import {
  copyReaderText,
  hitTestReaderTextHoverTarget,
  projectReaderTextHoverTargets,
  READER_TEXT_HOVER_COPY_CLASS,
  ReaderTextHoverLayer,
} from "./ReaderTextHoverLayer.js";
import { LiveTranslationOverlay } from "./LiveTranslationOverlay.js";
import type { ReaderLiveTranslationLayoutPage as LiveTranslationLayoutPage } from "../contracts/live-translation.js";
import type { LiveTranslationPageState } from "../shared/data/live-translation-state.js";

export const DEFAULT_ASPECT = 1.414;

type PdfPageSlotProps = {
  pageNumber: number;
  width: number;
  devicePixelRatio: number;
  pane?: ReaderPaneId;
  /** pane-level windowing decides whether the page canvas should be mounted */
  active?: boolean;
  /** 对照左右同页 max 高度 */
  syncedMinHeight?: number;
  onMetrics?: () => void;
  /** windowed rendering: aspect cache from pane to keep placeholder height correct */
  cachedAspect?: number;
  onAspectChange?: (pageNumber: number, aspect: number) => void;
  /** pane-level windowing sentinel registration (the pane observer owns activeness) */
  sentinelRef?: (el: HTMLDivElement | null) => void;
  regionHighlight?: ReaderRegionHighlight | null;
  regionTargets?: ReaderRegionHighlight[];
  onSelectRegion?: (selection: ReaderRegionSelection) => void;
  /**
   * 对照阅读时左右两栏共享的悬停块（itemId）。给了 onHoverRegion 就由外面管，
   * 鼠标在哪栏，两栏都画同一块的框；没给（单栏）就用本页自己的状态。
   */
  hoveredRegionId?: string | null;
  onHoverRegion?: (itemId: string | null) => void;
  liveTranslationLayout?: LiveTranslationLayoutPage;
  liveTranslationPage?: LiveTranslationPageState;
  showLiveTranslation?: boolean;
};

function PdfPageSlotInner({
  pageNumber,
  width,
  devicePixelRatio,
  pane,
  active = false,
  syncedMinHeight = 0,
  onMetrics,
  cachedAspect,
  onAspectChange,
  sentinelRef,
  regionHighlight = null,
  regionTargets = [],
  onSelectRegion,
  hoveredRegionId,
  onHoverRegion,
  liveTranslationLayout,
  liveTranslationPage,
  showLiveTranslation = pane === "source",
}: PdfPageSlotProps) {
  const aspectRef = useRef(cachedAspect ?? DEFAULT_ASPECT);
  const [aspect, setAspect] = useState(aspectRef.current);

  // keep local aspect in sync with pane-level cache (e.g. after remount)
  useEffect(() => {
    if (cachedAspect != null && Math.abs(cachedAspect - aspectRef.current) >= 0.001) {
      aspectRef.current = cachedAspect;
      setAspect(cachedAspect);
    }
  }, [cachedAspect]);

  const sentinelRefRef = useRef(sentinelRef);
  sentinelRefRef.current = sentinelRef;
  // Stable callback ref that forwards the slot node to the pane's per-page
  // sentinel registration. Keeping its identity stable avoids re-attaching the
  // observer on every render.
  const sentinelCallbackRef = useRef<(el: HTMLDivElement | null) => void>((el: HTMLDivElement | null) => {
    sentinelRefRef.current?.(el);
  }).current;

  // 旧引擎 page 固定 height = viewport * scale
  const naturalHeight = Math.max(120, Math.floor(width * aspect));
  const boxHeight = Math.max(naturalHeight, Math.ceil(syncedMinHeight || 0));
  const regionRect = projectReaderRegion(regionHighlight, width, naturalHeight);
  const textHoverTargets = useMemo(
    () => projectReaderTextHoverTargets(regionTargets, width, naturalHeight),
    [naturalHeight, regionTargets, width],
  );
  const [localHoveredTextId, setLocalHoveredTextId] = useState<string | null>(null);
  const controlled = typeof onHoverRegion === "function";
  const hoveredTextId = controlled ? hoveredRegionId ?? null : localHoveredTextId;
  const setHoveredTextId = (next: string | null) => {
    if (controlled) {
      if (next !== (hoveredRegionId ?? null)) onHoverRegion?.(next);
    } else {
      setLocalHoveredTextId((current) => (current === next ? current : next));
    }
  };
  const [copiedSignal, setCopiedSignal] = useState(0);
  const hoveredTextTarget = useMemo(
    () => textHoverTargets.find((target) => target.itemId === hoveredTextId) || null,
    [hoveredTextId, textHoverTargets],
  );

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    // 拖选正文时隐藏轮廓，绝不接管 PDF textLayer 的事件。
    if (event.buttons !== 0) {
      setHoveredTextId(null);
      return;
    }
    const hostRect = event.currentTarget.getBoundingClientRect();
    const target = hitTestReaderTextHoverTarget(
      textHoverTargets,
      event.clientX - hostRect.left,
      event.clientY - hostRect.top,
    );
    setHoveredTextId(target?.itemId || null);
  };

  // 双击一个内容块：整块复制（左栏原文、右栏译文），框上的按钮显示「已复制」。
  // 浏览器默认的双击选词这时没有意义，顺手清掉。
  const handleTextRegionDoubleClick = async (event: ReactMouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement | null)?.closest?.(`.${READER_TEXT_HOVER_COPY_CLASS}`)) return;
    const hostRect = event.currentTarget.getBoundingClientRect();
    const target = hitTestReaderTextHoverTarget(
      textHoverTargets,
      event.clientX - hostRect.left,
      event.clientY - hostRect.top,
    );
    if (!target) return;
    const text = readerRegionContent(target.highlight.region, pane === "translated" ? "translated" : "source");
    if (!text) return;
    window.getSelection()?.removeAllRanges();
    if (await copyReaderText(text)) setCopiedSignal((value) => value + 1);
  };

  const handleTextRegionClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!onSelectRegion) return;
    if ((event.target as HTMLElement | null)?.closest?.(".reader-structure-selection-target")) return;
    if ((event.target as HTMLElement | null)?.closest?.(`.${READER_TEXT_HOVER_COPY_CLASS}`)) return;
    // 用户刚完成原生拖选时保留浏览器选区，不把它误判成整块点击。
    if (`${window.getSelection()?.toString() || ""}`.trim()) return;
    const hostRect = event.currentTarget.getBoundingClientRect();
    const target = hitTestReaderTextHoverTarget(
      textHoverTargets,
      event.clientX - hostRect.left,
      event.clientY - hostRect.top,
    );
    if (!target) return;
    onSelectRegion({
      selectionType: "region",
      region: target.highlight.region,
      kind: "text",
      page: target.highlight.box.page,
      pane: pane === "translated" ? "translated" : "source",
      rect: {
        left: hostRect.left + target.rect.left,
        top: hostRect.top + target.rect.top,
        width: target.rect.width,
        height: target.rect.height,
      },
    });
  };

  // notify pane of aspect so placeholder heights stay correct when windowed out.
  // onLoadSuccess is an async react-pdf callback, not render, so notifying the
  // parent directly is safe; the ref guard keeps StrictMode double-loads quiet.
  const handleAspect = (next: number) => {
    if (!Number.isFinite(next) || next <= 0) return;
    if (Math.abs(aspectRef.current - next) < 0.001) return;
    aspectRef.current = next;
    setAspect(next);
    onAspectChange?.(pageNumber, next);
  };

  return (
    <div
      ref={sentinelCallbackRef}
      {...{
        [READER_PAGE_ATTR]: pageNumber,
        [READER_PANE_ATTR]: pane,
        [READER_NATURAL_HEIGHT_ATTR]: naturalHeight,
      }}
      className={READER_PAGE_SLOT_CLASS}
      // pdf.js text spans may handle pointer events themselves. Capture at the
      // page boundary so source-PDF hover hit testing stays active without
      // placing an interactive overlay above the native text selection layer.
      onPointerMoveCapture={handlePointerMove}
      onClick={handleTextRegionClick}
      onDoubleClick={handleTextRegionDoubleClick}
      onPointerLeave={() => setHoveredTextId(null)}
      style={{
        width,
        height: boxHeight,
        minHeight: boxHeight,
      }}
    >
      {active ? (
        <Page
          pageNumber={pageNumber}
          width={width}
          devicePixelRatio={devicePixelRatio}
          renderTextLayer
          renderAnnotationLayer={false}
          className={READER_PDF_PAGE_CLASS}
          loading={
            <div
              className={READER_PDF_PAGE_PLACEHOLDER_CLASS}
              style={{ width, height: naturalHeight }}
            />
          }
          onLoadSuccess={(page) => {
            try {
              const viewport = page.getViewport({ scale: 1 });
              if (viewport.width > 0) {
                const next = viewport.height / viewport.width;
                handleAspect(next);
              }
            } catch {
              // ignore
            }
            onMetrics?.();
          }}
          onRenderSuccess={() => {
            onMetrics?.();
          }}
        />
      ) : (
        <div
          className={READER_PDF_PAGE_PLACEHOLDER_CLASS}
          style={{ width, height: naturalHeight }}
          aria-hidden
        />
      )}
      {regionRect ? (
        <div
          className="reader-react-pdf-region-highlight"
          data-reader-region-id={regionHighlight?.itemId}
          style={regionRect}
          aria-hidden="true"
        />
      ) : null}
      {active && showLiveTranslation ? (
        <LiveTranslationOverlay
          layoutPage={liveTranslationLayout}
          pageState={liveTranslationPage}
          width={width}
          height={naturalHeight}
        />
      ) : null}
      <ReaderTextHoverLayer
        target={active ? hoveredTextTarget : null}
        pane={pane === "translated" ? "translated" : "source"}
        copiedSignal={copiedSignal}
      />
      <ReaderStructureSelectionLayer
        pane={pane === "translated" ? "translated" : "source"}
        width={width}
        height={naturalHeight}
        regions={regionTargets}
        onSelect={onSelectRegion}
      />
    </div>
  );
}

export const PdfPageSlot = memo(PdfPageSlotInner);
