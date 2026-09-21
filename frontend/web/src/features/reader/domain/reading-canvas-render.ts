/** 把 agent 写的概念图变成 tldraw 图形。
 *
 * 和 reading-canvas-doc.ts 的分工：那边认 **agent 的格式**（字段名、容错、
 * 优先级），这边认 **tldraw 的格式**（图形类型、属性名、坐标）。两边各自会
 * 因为不同的原因变化 —— agent 的 schema 因为产品需求变，tldraw 的属性因为
 * 升级变（`text` → `richText` 就是一次），放一起改哪边都要读全部。
 *
 * ## 坐标是算出来的，不是 agent 给的
 *
 * 位置由边的拓扑决定：没有入边的是第 0 层，其余是「所有上游层数的最大值 + 1」，
 * 层从左往右排。这样「先有什么、后有什么」在画面上直接成立，而不依赖模型去猜
 * 像素。模型给坐标这件事本来也做不好。
 *
 * 注意**不是** PDF 页面坐标。画布是 dock 里的独立面板，不是叠在页面上的图层，
 * 把 bbox 搬进来没有意义 —— 锚点只用来点击跳转。等画布能叠到页面上时再说。
 *
 * ## 只许类型导入 tldraw
 *
 * 值导入会把整个 tldraw（1.6 MB）拽进首屏包，把画布面板的懒加载废掉，而且不会
 * 有任何报错 —— 只是首屏慢了。有门禁守着（tests/reader/reading-canvas-doc）。
 */
import type {
  TLArrowShape,
  TLAsset,
  TLAssetId,
  TLGeoShape,
  TLImageShape,
  TLShapePartial,
  TLTextShape,
} from "tldraw";

import type { CanvasDoc, CanvasNode } from "./reading-canvas-doc.js";
import { type TLDefaultColorStyleLike, toRichTextDoc } from "./tldraw-primitives.js";

/** 宿主取回来的图片：已经是 data URL，尺寸是解码出来的真实像素。 */
export type CanvasImage = { name: string; dataUrl: string; w: number; h: number };

const NODE_W = 260;
const NODE_H = 120;
const COL_GAP = 140;
const ROW_GAP = 48;
/** 图下面那行说明的高度。 */
const CAPTION_H = 44;
/** 图片高度的上下限。太矮看不清，太高一张图就占满屏幕 —— 而「看不过来」正是
 * 这个功能最容易犯的毛病。 */
const IMAGE_MIN_H = 90;
const IMAGE_MAX_H = 280;

/** 卡片上显示的字数上限。超出截断并加省略号。
 *
 * 不是为了好看：一个失控的长节点会把整张图撑到没法看，而画布的价值恰恰是「一眼
 * 看完」。截断只影响显示，原文还在 canvas.v1.json 里。真正的约束写在 AGENTS.md
 * 里（要求 agent 自己写短），这里只是兜底。 */
const MAX_LABEL = 60;

export function shortLabel(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > MAX_LABEL ? `${flat.slice(0, MAX_LABEL - 1)}…` : flat;
}

/** 层数上限。只用来在 agent 写出环的时候收住循环，不是产品限制。 */
const MAX_LAYERS = 64;

/** kind → 颜色。认不出的退回灰色，不要抛错 —— 颜色错了图还能看，抛错就什么都没了。 */
const KIND_COLOR: Readonly<Record<string, TLDefaultColorStyleLike>> = {
  concept: "blue",
  note: "yellow",
  question: "violet",
  warning: "red",
  result: "green",
};
const FALLBACK_COLOR: TLDefaultColorStyleLike = "grey";

export function colorForKind(kind: string | undefined): TLDefaultColorStyleLike {
  return (kind && KIND_COLOR[kind]) || FALLBACK_COLOR;
}


/** 每个节点在第几层。没有入边 = 第 0 层；否则是所有上游的最大层数 + 1。
 *
 * 用迭代放松而不是拓扑排序，是因为 agent **会**写出环（「A 导致 B，B 又强化 A」
 * 在论文里是常见说法）。拓扑排序遇到环要么抛错要么丢边；放松法到了上限就停，
 * 环里的节点各自落在某一层，图照样画得出来。
 */
export function layerOf(doc: CanvasDoc): Map<string, number> {
  const layers = new Map(doc.nodes.map((node) => [node.id, 0]));
  for (let round = 0; round < MAX_LAYERS; round += 1) {
    let moved = false;
    for (const edge of doc.edges) {
      const next = (layers.get(edge.from) ?? 0) + 1;
      if (next > (layers.get(edge.to) ?? 0)) {
        layers.set(edge.to, next);
        moved = true;
      }
    }
    if (!moved) break;
  }
  return layers;
}

export type Placed = {
  node: CanvasNode;
  x: number;
  y: number;
  /** 整个节点占的框（图片节点 = 图高 + 说明行）。箭头连到这个框上。 */
  w: number;
  h: number;
  /** 图片节点才有：图本身的高度，说明行在它下面。 */
  imageH?: number;
  image?: CanvasImage;
};

/** 图片按原比例缩到 NODE_W 宽，高度收在上下限之间。
 *
 * 收上限不是美观问题：一张长条图能把整张画布顶到看不见别的，而这个功能就是为了
 * 「一眼看完」。宁可图小一点 —— 点一下就跳到 PDF 里看原图了。
 */
export function imageHeightFor(image: CanvasImage | undefined): number {
  if (!image || image.w <= 0 || image.h <= 0) return NODE_H;
  const scaled = (NODE_W * image.h) / image.w;
  return Math.max(IMAGE_MIN_H, Math.min(IMAGE_MAX_H, Math.round(scaled)));
}

/** 层内按 nodes 里的原始顺序竖排 —— agent 写的顺序通常就是它讲解的顺序。
 *
 * 高度逐个累加而不是乘以固定行高：图片节点高矮不一，用固定行高要么互相压着，
 * 要么中间空一大块。
 */
export function layout(
  doc: CanvasDoc,
  images: ReadonlyMap<string, CanvasImage> = new Map(),
): Placed[] {
  const layers = layerOf(doc);
  const nextY = new Map<number, number>();
  return doc.nodes.map((node) => {
    const layer = layers.get(node.id) ?? 0;
    const image = node.image ? images.get(node.image) : undefined;
    const imageH = image ? imageHeightFor(image) : undefined;
    const h = imageH === undefined
      ? NODE_H
      : imageH + (node.text ? CAPTION_H : 0);
    const y = nextY.get(layer) ?? 0;
    nextY.set(layer, y + h + ROW_GAP);
    return { node, x: layer * (NODE_W + COL_GAP), y, w: NODE_W, h, imageH, image };
  });
}

export function nodeShapeId(index: number): TLShapePartial<TLGeoShape>["id"] {
  return `shape:canvas-node-${index}` as TLShapePartial<TLGeoShape>["id"];
}

/** shape id → 节点。
 *
 * 图片节点由两个图形组成（图 + 下面那行说明），**两个都要能点**：点说明却不跳
 * 会让人以为这个节点没锚点。所以两种前缀都认。
 */
export function nodeForShapeId(
  placed: readonly Placed[],
  shapeId: string,
): CanvasNode | undefined {
  const match = /^shape:canvas-(?:node|cap)-(\d+)$/.exec(shapeId);
  return match ? placed[Number(match[1])]?.node : undefined;
}


export type CanvasBuild = {
  placed: Placed[];
  shapes: TLShapePartial<TLGeoShape | TLArrowShape | TLImageShape | TLTextShape>[];
  assets: TLAsset[];
};

/** 资产 id 自己拼，**不用 tldraw 的 `AssetRecordType.createId()`**。
 *
 * 那个是值导入，会把整个 tldraw（1.6 MB）拽进首屏包，把这个面板的懒加载废掉 ——
 * 本文件只许有类型导入。顺带的好处：id 是确定的，重画同一份文档不会每次换 id。
 * 校验器只要求 `asset:` 前缀（实测）。 */
function assetIdFor(index: number): TLAssetId {
  return `asset:canvas-${index}` as TLAssetId;
}

export function buildCanvasShapes(
  doc: CanvasDoc,
  images: ReadonlyMap<string, CanvasImage> = new Map(),
): CanvasBuild {
  const placed = layout(doc, images);
  const byId = new Map(placed.map((item) => [item.node.id, item]));
  const assets: TLAsset[] = [];
  const shapes: CanvasBuild["shapes"] = [];

  // 回调/字面量的类型是显式写出来的：只标注外层数组类型的话，属性名拼错 tsc
  // 不报（`.map()` 会去推断回调返回值，对象字面量就没有上下文类型）。见
  // reading-path-cards.ts 里那段同样的注释 —— 是踩过的坑。
  placed.forEach((item, index) => {
    const { node, x, y, imageH, image } = item;
    if (image && imageH !== undefined) {
      const assetId = assetIdFor(index);
      const asset: TLAsset = {
        id: assetId,
        typeName: "asset",
        type: "image",
        meta: {},
        props: {
          name: image.name,
          src: image.dataUrl,
          w: image.w,
          h: image.h,
          mimeType: "image/jpeg",
          isAnimated: false,
        },
      };
      assets.push(asset);
      const imageShape: TLShapePartial<TLImageShape> = {
        id: nodeShapeId(index),
        type: "image",
        x,
        y,
        props: { w: NODE_W, h: imageH, assetId, altText: shortLabel(node.text) },
      };
      shapes.push(imageShape);
      if (node.text) {
        const caption: TLShapePartial<TLTextShape> = {
          id: `shape:canvas-cap-${index}` as TLShapePartial<TLTextShape>["id"],
          type: "text",
          x,
          y: y + imageH + 6,
          props: {
            richText: toRichTextDoc(shortLabel(node.text)),
            w: NODE_W,
            autoSize: false,
            size: "s",
            color: colorForKind(node.kind),
          },
        };
        shapes.push(caption);
      }
      return;
    }
    const box: TLShapePartial<TLGeoShape> = {
      id: nodeShapeId(index),
      type: "geo",
      x,
      y,
      props: {
        geo: "rectangle",
        w: NODE_W,
        h: NODE_H,
        richText: toRichTextDoc(shortLabel(node.text)),
        color: colorForKind(node.kind),
        // 有锚点的画实线（点了能跳），没有的画虚线 —— 免得点上去没反应还以为坏了。
        dash: node.anchor?.block_id ? "solid" : "dashed",
        size: "s",
        align: "start",
        verticalAlign: "start",
      },
    };
    shapes.push(box);
  });

  doc.edges.forEach((edge, index) => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) return;
    // 从源的右边中点连到目标的左边中点。start/end 是相对图形原点的偏移，
    // 所以图形原点放 (0,0)，两端直接用画布坐标。
    const arrow: TLShapePartial<TLArrowShape> = {
      id: `shape:canvas-edge-${index}` as TLShapePartial<TLArrowShape>["id"],
      type: "arrow",
      x: 0,
      y: 0,
      props: {
        start: { x: from.x + from.w, y: from.y + from.h / 2 },
        end: { x: to.x, y: to.y + to.h / 2 },
        richText: toRichTextDoc(edge.label ? shortLabel(edge.label) : ""),
        arrowheadStart: "none",
        arrowheadEnd: "arrow",
        color: "grey",
        size: "s",
      },
    };
    shapes.push(arrow);
  });

  return { placed, shapes, assets };
}

export const CANVAS_LAYOUT = {
  NODE_W, NODE_H, COL_GAP, ROW_GAP, CAPTION_H, IMAGE_MIN_H, IMAGE_MAX_H, MAX_LABEL,
} as const;
