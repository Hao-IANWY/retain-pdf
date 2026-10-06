import type { ReaderPaneId } from "../types/reader-dom.js";
export type ReaderRegionBox = {
    page: number;
    bbox: [number, number, number, number];
    unit: "pdf_point";
    origin: "top_left" | "bottom_left";
    text: string;
};
export type ReaderRegion = {
    itemId: string;
    source: ReaderRegionBox;
    translated: ReaderRegionBox;
    markdown: string;
    regionType: string;
    status: string;
    assetIds: string[];
    assetUrls: string[];
};
export type ReaderRegionKind = "formula" | "table" | "figure" | "text" | "region";
export type ReaderRegionSelection = {
    selectionType: "region";
    region: ReaderRegion;
    kind: ReaderRegionKind;
    page: number;
    pane: ReaderPaneId;
    /** 视口坐标，用于浮条定位。 */
    rect: ReaderRegionRect;
};
export type ReaderTextSelection = {
    selectionType: "text";
    quote: string;
    page: number;
    pane: ReaderPaneId;
    /** 视口坐标，用于浮条定位。 */
    rect: ReaderRegionRect;
};
export type ReaderSelection = ReaderRegionSelection | ReaderTextSelection;
export type ReaderPageMetadata = {
    page: number;
    width: number;
    height: number;
};
export type ReaderDocumentMetadata = {
    pageCount: number;
    pages: ReaderPageMetadata[];
};
export type ReaderMetadata = {
    source: ReaderDocumentMetadata | null;
    translated: ReaderDocumentMetadata | null;
};
export type ReaderRegionHighlight = {
    itemId: string;
    region: ReaderRegion;
    box: ReaderRegionBox;
    pageSize: ReaderPageMetadata;
};
export type ReaderRegionRect = {
    left: number;
    top: number;
    width: number;
    height: number;
};
/**
 * 接口响应（`{ items: [...] }`，可带 `{ data }` 信封）→ ReaderRegion[]。
 *
 * 必须幂等：宿主的 loadSessionSnapshot 已经归一化过一次，session-assets 又会再调一次。
 * 以前这里只认 `{ items }`，第二次拿到的是数组，直接返回空 —— 阅读器里的内容块数恒为 0，
 * 悬停红框、整块复制、点块浮条全部失效（接口明明返回了 875 块）。
 */
export declare function normalizeReaderRegions(payload: unknown): ReaderRegion[];
export declare function readerRegionKind(regionType: string): ReaderRegionKind;
export declare function readerRegionKindForRegion(region: ReaderRegion): ReaderRegionKind;
export declare function isStructuredReaderRegion(region: ReaderRegion): boolean;
export declare function readerRegionContent(region: ReaderRegion, pane: ReaderPaneId): string;
export declare function extractReaderFormulaLatex(value: string): string;
export declare function normalizeReaderMetadata(payload: unknown): ReaderMetadata;
export declare function findReaderRegion(regions: readonly ReaderRegion[], blockId: string | null | undefined): ReaderRegion | null;
type ReaderCitationTarget = {
    block_id?: string;
    page_idx?: number;
    page?: number;
    snippet?: string;
};
/**
 * Resolve legacy Markdown fallback citations (md-xxxx, no page_idx) against
 * the structured region layer. The same region coordinates work for source
 * and translated PDFs, so one match restores navigation in either pane.
 */
export declare function findReaderRegionByCitation(regions: readonly ReaderRegion[], citation: ReaderCitationTarget | null | undefined): ReaderRegion | null;
/** Match an AI-rendered image back to its structured PDF region. */
export declare function findReaderRegionByAssetUrl(regions: readonly ReaderRegion[], assetUrl: string | null | undefined, page?: number | null): ReaderRegion | null;
export declare function regionBoxForPane(region: ReaderRegion, pane: ReaderPaneId): ReaderRegionBox;
export declare function resolveReaderRegionHighlight(region: ReaderRegion | null | undefined, metadata: ReaderMetadata | null | undefined, pane: ReaderPaneId): ReaderRegionHighlight | null;
export declare function projectReaderRegion(highlight: ReaderRegionHighlight | null | undefined, renderedWidth: number, renderedHeight: number): ReaderRegionRect | null;
/** 选区送进终端 agent 时先变成的那句话。
 *
 * 阅读页现在只有一扇 AI 的门（终端里的 agent），「从选区问 AI」就是把选中的
 * 东西喂给它。两种选区形状要分开取文字：
 * - 文本选区有 quote
 * - 区域选区（公式 / 表格 / 图）的文字在 region 里，且**要取用户选的那一栏**
 *   —— 从译文栏选公式却把原文塞进去，问出来的是另一回事。
 *
 * 取不到文字时不编：返回空串，调用方就只开面板不注入。
 */
export declare function readerSelectionPrompt(selection: ReaderSelection): string;
export {};
//# sourceMappingURL=reader-regions.d.ts.map