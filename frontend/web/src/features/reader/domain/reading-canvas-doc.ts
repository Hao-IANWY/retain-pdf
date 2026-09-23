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
 * 坐标、颜色、图形都在 reading-canvas-render.ts 里算 —— 本文件只认 agent 的格式。
 *
 * ## 图片
 *
 * 节点可以直接放论文里的图（`image` 给 `md/images/` 下的文件名，agent 从
 * document.v1.json 的 `metadata.asset_key` 取）。一张图顶一段话，这是这个功能
 * 里唯一能真正减少阅读量的东西。
 *
 * 图片走 `data:` URL：tldraw 的资产校验器**拒绝 `blob:`**（实测「invalid
 * protocol」），而图片端点要 `X-API-Key`，`<img src>` 带不了 header。所以在
 * 宿主侧带着 key 取回来转成 data URL 再喂进去。这本书 35 张图共 0.6 MB，
 * 平均 17 KB，base64 那点开销无所谓。
 *
 * ## 这份文件是 agent 写的，形状不保证
 *
 * 所以每一步都往「少画一个」偏，不往「整块崩掉」偏：缺 id 或缺文字的节点丢掉，
 * 指向不存在节点的边丢掉，认不出的 kind 退回灰色。
 */

export type CanvasAnchor = { page_idx?: number; block_id?: string };

export type CanvasNode = {
  id: string;
  text: string;
  kind?: string;
  anchor?: CanvasAnchor;
  /** `md/images/` 下的文件名。有它就画成图片，`text` 变成图下面的说明。 */
  image?: string;
};

export type CanvasEdge = { from: string; to: string; label?: string };

export type CanvasDoc = { nodes: CanvasNode[]; edges: CanvasEdge[] };

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
      // 只收文件名，不收路径：`../` 之类的东西拼进图片 URL 就是任意文件读取。
      image: typeof node.image === "string" && /^[A-Za-z0-9._-]+$/.test(node.image)
        ? node.image
        : undefined,
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

/** 文档里引用到的图片文件名，去重。宿主拿它去取图。 */
export function imageRefsOf(doc: CanvasDoc): string[] {
  return [...new Set(doc.nodes.map((node) => node.image).filter((name): name is string => !!name))];
}

// ---------------------------------------------------------------- 读哪一份

/** 画布面板有两个数据源，优先级不是「谁先加载完」，是固定的。 */
export type CanvasSource =
  /** `canvas.v1.json` —— agent 画的概念图。 */
  | { kind: "canvas"; doc: CanvasDoc }
  /** 还没画过。这是正常状态，不是错误。 */
  | { kind: "empty" }
  /** 概念图存在但读不懂。**不静默退回别的东西** —— 那样 agent 写坏了文件，
   * 用户只会看到一张旧图，永远不知道该让它重写。 */
  | { kind: "broken"; reason: string };

/** `null` 表示那个文件不存在（HTTP 404）。 */
/** `null` 表示 `canvas.v1.json` 不存在（HTTP 404）。
 *
 * **没有退路分支。** 早先这里在没有概念图时会退回 `reading-path.v1.json` 的
 * 步骤卡片 —— 而阅读路径本来就在旁边那个 tab 里有自己的面板。结果是同一份数据
 * 两个地方画，而且打开「画布」看到的是一列卡片，会让人以为那就是概念图。
 */
export function chooseCanvasSource(input: { canvasText: string | null }): CanvasSource {
  if (input.canvasText === null) return { kind: "empty" };
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
