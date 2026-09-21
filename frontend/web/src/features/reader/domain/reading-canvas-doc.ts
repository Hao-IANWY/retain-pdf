/** `<job>/ai/canvas.v1.json` —— agent 画的概念图。
 *
 * ## 为什么不让 agent 直接写 tldraw 的快照
 *
 * tldraw 的记录格式啰嗦且跟版本绑死（这个功能第一版就栽在 `text` → `richText`
 * 的改名上），而且要写一行字得先会拼 TipTap 的文档 JSON。让模型写那种东西，它
 * 会把精力花在格式上，不是花在「这篇论文该怎么讲」上。
 *
 * 所以 agent 只写**语义**：一个节点说一句话、一条边说明两句话之间的关系，
 * 可选地挂一个锚点。图形、坐标、颜色、箭头全由这里生成。
 *
 *     {
 *       "schema": "retainpdf_reading_canvas_v1",
 *       "nodes": [
 *         { "id": "n1", "kind": "concept", "text": "核心假设：注意力可以完全替代循环",
 *           "anchor": { "page_idx": 1, "block_id": "b-intro-3" } }
 *       ],
 *       "edges": [ { "from": "n1", "to": "n2", "label": "因此" } ]
 *     }
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
 * ## 这份文件是 agent 写的，形状不保证
 *
 * 所以每一步都往「少画一个」偏，不往「整块崩掉」偏：缺 id 或缺文字的节点丢掉，
 * 指向不存在节点的边丢掉，认不出的 kind 退回灰色。
 */
import type {
  TLArrowShape,
  TLGeoShape,
  TLShapePartial,
} from "tldraw";

import { type TLDefaultColorStyleLike, toRichTextDoc } from "./reading-canvas-shapes.js";

export type CanvasAnchor = { page_idx?: number; block_id?: string };

export type CanvasNode = {
  id: string;
  text: string;
  kind?: string;
  anchor?: CanvasAnchor;
};

export type CanvasEdge = { from: string; to: string; label?: string };

export type CanvasDoc = { nodes: CanvasNode[]; edges: CanvasEdge[] };

const NODE_W = 260;
const NODE_H = 120;
const COL_GAP = 140;
const ROW_GAP = 48;

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

/** 从任意 JSON 里取出能用的部分。整份都不可用时返回 null（调用方当「还没有」）。 */
export function parseCanvasDoc(payload: unknown): CanvasDoc | null {
  if (!payload || typeof payload !== "object") return null;
  const raw = payload as { nodes?: unknown; edges?: unknown };
  if (!Array.isArray(raw.nodes)) return null;

  const nodes: CanvasNode[] = [];
  const seen = new Set<string>();
  for (const candidate of raw.nodes) {
    if (!candidate || typeof candidate !== "object") continue;
    const node = candidate as Record<string, unknown>;
    const id = typeof node.id === "string" ? node.id : "";
    const text = typeof node.text === "string" ? node.text : "";
    // 没 id 就没法被边引用，没文字就是个空框 —— 两者都等于这个节点没写完。
    if (!id || !text || seen.has(id)) continue;
    seen.add(id);
    const anchor = node.anchor as CanvasAnchor | undefined;
    nodes.push({
      id,
      text,
      kind: typeof node.kind === "string" ? node.kind : undefined,
      anchor: anchor && typeof anchor === "object"
        ? {
            page_idx: typeof anchor.page_idx === "number" ? anchor.page_idx : undefined,
            block_id: typeof anchor.block_id === "string" ? anchor.block_id : undefined,
          }
        : undefined,
    });
  }
  if (nodes.length === 0) return null;

  const edges: CanvasEdge[] = [];
  if (Array.isArray(raw.edges)) {
    for (const candidate of raw.edges) {
      if (!candidate || typeof candidate !== "object") continue;
      const edge = candidate as Record<string, unknown>;
      const from = typeof edge.from === "string" ? edge.from : "";
      const to = typeof edge.to === "string" ? edge.to : "";
      // 指向不存在的节点 = 画不出来。自环也丢掉：起点终点重合，tldraw 画出来是
      // 一个点，看不出任何东西。
      if (!seen.has(from) || !seen.has(to) || from === to) continue;
      edges.push({
        from,
        to,
        label: typeof edge.label === "string" ? edge.label : undefined,
      });
    }
  }
  return { nodes, edges };
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

type Placed = { node: CanvasNode; x: number; y: number };

/** 层内按 nodes 里的原始顺序竖排 —— agent 写的顺序通常就是它讲解的顺序。 */
export function layout(doc: CanvasDoc): Placed[] {
  const layers = layerOf(doc);
  const rowsUsed = new Map<number, number>();
  return doc.nodes.map((node) => {
    const layer = layers.get(node.id) ?? 0;
    const row = rowsUsed.get(layer) ?? 0;
    rowsUsed.set(layer, row + 1);
    return {
      node,
      x: layer * (NODE_W + COL_GAP),
      y: row * (NODE_H + ROW_GAP),
    };
  });
}

export function nodeShapeId(index: number): TLShapePartial<TLGeoShape>["id"] {
  return `shape:canvas-node-${index}` as TLShapePartial<TLGeoShape>["id"];
}

/** shape id → 节点。tldraw 的 id 有格式要求，而 agent 给的 id 是任意字符串，
 * 所以图形用下标编号，不直接用 agent 的 id。 */
export function nodeForShapeId(
  placed: readonly Placed[],
  shapeId: string,
): CanvasNode | undefined {
  const match = /^shape:canvas-node-(\d+)$/.exec(shapeId);
  return match ? placed[Number(match[1])]?.node : undefined;
}

export function buildCanvasShapes(
  doc: CanvasDoc,
): { placed: Placed[]; shapes: TLShapePartial<TLGeoShape | TLArrowShape>[] } {
  const placed = layout(doc);
  const byId = new Map(placed.map((item, index) => [item.node.id, { item, index }]));

  // 回调的返回类型是显式写出来的：只标注外层数组类型的话，`.map()` 会去推断回调
  // 返回值，对象字面量就没有上下文类型，属性名拼错 tsc 不报。见
  // reading-canvas-shapes.ts 里那段同样的注释（是踩过的坑）。
  const nodes = placed.map(({ node, x, y }, index): TLShapePartial<TLGeoShape> => ({
    id: nodeShapeId(index),
    type: "geo",
    x,
    y,
    props: {
      geo: "rectangle",
      w: NODE_W,
      h: NODE_H,
      richText: toRichTextDoc(node.text),
      color: colorForKind(node.kind),
      // 有锚点的画实线（点了能跳），没有的画虚线 —— 免得点上去没反应还以为坏了。
      dash: node.anchor?.block_id ? "solid" : "dashed",
      size: "s",
      align: "start",
      verticalAlign: "start",
    },
  }));

  const arrows = doc.edges.flatMap((edge, index): TLShapePartial<TLArrowShape>[] => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) return [];
    // 从源的右边中点连到目标的左边中点。start/end 是相对图形原点的偏移，
    // 所以图形原点放 (0,0)，两端直接用画布坐标。
    return [{
      id: `shape:canvas-edge-${index}` as TLShapePartial<TLArrowShape>["id"],
      type: "arrow",
      x: 0,
      y: 0,
      props: {
        start: { x: from.item.x + NODE_W, y: from.item.y + NODE_H / 2 },
        end: { x: to.item.x, y: to.item.y + NODE_H / 2 },
        richText: toRichTextDoc(edge.label ?? ""),
        arrowheadStart: "none",
        arrowheadEnd: "arrow",
        color: "grey",
        size: "s",
      },
    }];
  });

  return { placed, shapes: [...nodes, ...arrows] };
}

export const CANVAS_LAYOUT = { NODE_W, NODE_H, COL_GAP, ROW_GAP } as const;

// ---------------------------------------------------------------- 读哪一份

/** 画布面板有两个数据源，优先级不是「谁先加载完」，是固定的。 */
export type CanvasSource =
  /** `canvas.v1.json` —— agent 画的概念图。 */
  | { kind: "canvas"; doc: CanvasDoc }
  /** 没有概念图时退回 `reading-path.v1.json` 的步骤卡片。 */
  | { kind: "path"; steps: unknown[] }
  /** 两份都没有。这是正常状态（还没让 agent 画过），不是错误。 */
  | { kind: "empty" }
  /** 概念图存在但读不懂。**不静默退回阅读路径** —— 那样 agent 写坏了文件，
   * 用户只会看到一张旧图，永远不知道该让它重写。 */
  | { kind: "broken"; reason: string };

/** `null` 表示那个文件不存在（HTTP 404）。 */
export function chooseCanvasSource(input: {
  canvasText: string | null;
  pathText: string | null;
}): CanvasSource {
  if (input.canvasText !== null) {
    let payload: unknown;
    try {
      payload = JSON.parse(input.canvasText);
    } catch (error) {
      return { kind: "broken", reason: `不是合法 JSON：${String(error).slice(0, 80)}` };
    }
    const doc = parseCanvasDoc(payload);
    if (doc) return { kind: "canvas", doc };
    return { kind: "broken", reason: "没有一个可用的节点（需要 nodes[]，每项要有 id 和 text）" };
  }
  if (input.pathText !== null) {
    try {
      const payload = JSON.parse(input.pathText) as { steps?: unknown };
      const steps = Array.isArray(payload?.steps)
        ? payload.steps.filter(
            (step): step is Record<string, unknown> =>
              !!step && typeof step === "object" && typeof (step as { block_id?: unknown }).block_id === "string",
          )
        : [];
      if (steps.length > 0) return { kind: "path", steps };
    } catch {
      // 阅读路径读不懂就当没有：它只是退路，在这里报错会盖住「去画一张图」这个
      // 真正该给的提示。
    }
  }
  return { kind: "empty" };
}
