/** `<job>/ai/board/` —— agent 丢给你看的东西。
 *
 * ## 为什么是目录，不是又一套 schema
 *
 * 前三个产物（reading-path / canvas / notes）各有一套 JSON schema。每加一种
 * 可视化要动三处：schema、渲染器、AGENTS.md 一节。加到第三次时 AGENTS.md 里
 * 一半篇幅都在教 agent 拼格式。
 *
 * 画板反过来：**agent 手里已经有 shell 了**。`python3` 画张图、`pdftoppm` 截个
 * 页、`jq` 导个表 —— 丢进 `board/` 就能看见。它现有的本事直接变成可视化，我们
 * 不用为「图表」单独写一行渲染代码。
 *
 * ## 时间流式布局
 *
 * 按修改时间从上往下排，新的接在后面。**位置必须稳定**：已经在看的东西不能因为
 * agent 又写了一个文件就跳走。所以不做「自动整理」那种会重排全部的布局。
 *
 * 宽度统一，高度按各自内容算 —— 和概念图那边同一个道理（固定行高要么互相压着、
 * 要么中间空一块）。
 */
import type { TLAsset, TLAssetId, TLGeoShape, TLImageShape, TLShapePartial, TLTextShape } from "tldraw";

import { toRichTextDoc } from "./tldraw-primitives.js";

export type BoardItemKind = "image" | "pdf" | "markdown" | "json" | "text";

/** 后端列目录给的。 */
export type BoardListing = {
  name: string;
  kind: BoardItemKind;
  contentType: string;
  size: number;
  modifiedMs: number;
};

/** 宿主取回来之后补上内容：图片是 data URL（尺寸解码出来），文本是原文。
 *
 * PDF 也走 `dataUrl` —— 宿主用 pdf.js 把第 1 页画成 PNG 再塞进来，所以从这里
 * 往下它和一张图片没有区别。`pageCount` 只用来在标签上说清楚「还有别的页」。 */
export type BoardItem = BoardListing & {
  dataUrl?: string;
  imageW?: number;
  imageH?: number;
  text?: string;
  pageCount?: number;
};

const ITEM_W = 460;
const GAP_Y = 40;
/** 文本卡片的高度上限。一份长 markdown 不该把画板顶到看不见别的 —— 和批注、
 * 概念图踩过的是同一个坑（「产生的东西太多了看不过来」）。 */
const TEXT_MAX_H = 320;
const TEXT_LINE_H = 19;
const TEXT_PAD = 28;
/** 图片高度上下限，同上。 */
const IMAGE_MIN_H = 120;
const IMAGE_MAX_H = 520;

const KINDS: readonly BoardItemKind[] = ["image", "pdf", "markdown", "json", "text"];

export function parseBoardListing(payload: unknown): BoardListing[] | null {
  const raw = (payload as { items?: unknown } | null)?.items;
  if (!Array.isArray(raw)) return null;
  const items: BoardListing[] = [];
  for (const candidate of raw) {
    if (!candidate || typeof candidate !== "object") continue;
    const item = candidate as Record<string, unknown>;
    const name = typeof item.name === "string" ? item.name : "";
    const kind = item.kind as BoardItemKind;
    if (!name || !KINDS.includes(kind)) continue;
    items.push({
      name,
      kind,
      contentType: typeof item.content_type === "string" ? item.content_type : "",
      size: typeof item.size === "number" ? item.size : 0,
      modifiedMs: typeof item.modified_ms === "number" ? item.modified_ms : 0,
    });
  }
  // 后端已经排过，这里再排一次：顺序是布局的依据，不能指望传输过程保序。
  return items.sort((a, b) => a.modifiedMs - b.modifiedMs || a.name.localeCompare(b.name));
}

/** 文本卡片显示多少行。超出截断 —— 画板是用来扫一眼的，读全文该去开文件。 */
export function textPreviewOf(item: BoardItem): string {
  const body = (item.text ?? "").replace(/\r\n/g, "\n").trimEnd();
  const lines = body.split("\n");
  const limit = Math.floor((TEXT_MAX_H - TEXT_PAD) / TEXT_LINE_H);
  if (lines.length <= limit) return body;
  return [...lines.slice(0, limit - 1), `… 还有 ${lines.length - limit + 1} 行`].join("\n");
}

/** 画成图的那些：图片，以及第 1 页已经栅格化好的 PDF。 */
function isRasterCard(item: BoardItem): boolean {
  return (item.kind === "image" || item.kind === "pdf") && !!item.dataUrl && !!item.imageW && !!item.imageH;
}

/** 退回文本框时框里写什么。
 *
 * PDF 渲不出来（坏文件、pdf.js 没加载上）时**不能留个空框** —— 空框看起来像
 * 「agent 写了个空文件」，而实际是我们这边没画出来，两件事该让人分得清。
 */
export function boardCardText(item: BoardItem): string {
  if (item.kind === "pdf") return `${item.name}\n（PDF 的第 1 页没能画出来）`;
  return textPreviewOf(item);
}

export function boardItemHeight(item: BoardItem): number {
  if (item.kind === "image" || item.kind === "pdf") {
    if (!item.imageW || !item.imageH) return IMAGE_MIN_H;
    const scaled = (ITEM_W * item.imageH) / item.imageW;
    return Math.max(IMAGE_MIN_H, Math.min(IMAGE_MAX_H, Math.round(scaled)));
  }
  const lines = boardCardText(item).split("\n").length;
  return Math.max(80, Math.min(TEXT_MAX_H, lines * TEXT_LINE_H + TEXT_PAD));
}

export type PlacedBoardItem = { item: BoardItem; x: number; y: number; w: number; h: number };

/** 从 `originX` 开始往下铺。概念图在左边时把它的宽度传进来，两边不重叠。 */
export function layoutBoard(items: readonly BoardItem[], originX = 0): PlacedBoardItem[] {
  let y = 0;
  return items.map((item) => {
    const h = boardItemHeight(item);
    const placed = { item, x: originX, y, w: ITEM_W, h };
    y += h + GAP_Y;
    return placed;
  });
}

export function boardShapeId(index: number): TLShapePartial<TLGeoShape>["id"] {
  return `shape:board-${index}` as TLShapePartial<TLGeoShape>["id"];
}

export function boardItemForShapeId(
  placed: readonly PlacedBoardItem[],
  shapeId: string,
): BoardItem | undefined {
  const match = /^shape:board-(?:label-)?(\d+)$/.exec(shapeId);
  return match ? placed[Number(match[1])]?.item : undefined;
}

export type BoardBuild = {
  placed: PlacedBoardItem[];
  shapes: TLShapePartial<TLGeoShape | TLImageShape | TLTextShape>[];
  assets: TLAsset[];
};

/** 资产 id 自己拼，不用 tldraw 的 createId —— 那是值导入，会把 1.6 MB 拽进首屏。
 * 校验器只要求 `asset:` 前缀。 */
function boardAssetId(index: number): TLAssetId {
  return `asset:board-${index}` as TLAssetId;
}

/** 标签文字。多页 PDF 必须说出来 ——「画布上只有第 1 页」这件事不写出来的话，
 * 用户会以为 agent 只写了一页，而它可能写了十页。 */
export function boardLabelOf(item: BoardItem): string {
  if (item.kind === "pdf" && (item.pageCount ?? 0) > 1) {
    return `${item.name} · 共 ${item.pageCount} 页，画布上是第 1 页`;
  }
  return item.name;
}

export function buildBoardShapes(
  items: readonly BoardItem[],
  originX = 0,
): BoardBuild {
  const placed = layoutBoard(items, originX);
  const shapes: BoardBuild["shapes"] = [];
  const assets: TLAsset[] = [];

  placed.forEach(({ item, x, y, w, h }, index) => {
    if (isRasterCard(item)) {
      const assetId = boardAssetId(index);
      const asset: TLAsset = {
        id: assetId,
        typeName: "asset",
        type: "image",
        meta: {},
        props: {
          name: item.name,
          src: item.dataUrl!,
          w: item.imageW!,
          h: item.imageH!,
          // PDF 进到这里已经是一张 PNG 了。照抄 contentType 会写成
          // application/pdf，而这是个 image 资产 —— 类型对不上。
          mimeType: item.kind === "pdf" ? "image/png" : item.contentType || "image/png",
          isAnimated: false,
        },
      };
      assets.push(asset);
      const image: TLShapePartial<TLImageShape> = {
        id: boardShapeId(index),
        type: "image",
        x,
        y,
        props: { w, h, assetId, altText: item.name },
      };
      shapes.push(image);
    } else {
      // 文本类（markdown / json / txt）画成一个框，内容是截断过的预览。
      const box: TLShapePartial<TLGeoShape> = {
        id: boardShapeId(index),
        type: "geo",
        x,
        y,
        props: {
          geo: "rectangle",
          w,
          h,
          richText: toRichTextDoc(boardCardText(item)),
          color: item.kind === "json" ? "violet" : "black",
          dash: "solid",
          size: "s",
          align: "start",
          verticalAlign: "start",
        },
      };
      shapes.push(box);
    }
    // 文件名标签。没有它，画板上一堆图你分不清哪个是哪个 —— 而 agent 起的
    // 文件名通常就是最好的说明（fig-3-residual-by-page.png）。
    const label: TLShapePartial<TLTextShape> = {
      id: `shape:board-label-${index}` as TLShapePartial<TLTextShape>["id"],
      type: "text",
      x,
      y: y + h + 6,
      props: {
        richText: toRichTextDoc(boardLabelOf(item)),
        w,
        autoSize: false,
        size: "s",
        color: "grey",
      },
    };
    shapes.push(label);
  });

  return { placed, shapes, assets };
}

export const BOARD_LAYOUT = {
  ITEM_W,
  GAP_Y,
  TEXT_MAX_H,
  IMAGE_MIN_H,
  IMAGE_MAX_H,
} as const;
