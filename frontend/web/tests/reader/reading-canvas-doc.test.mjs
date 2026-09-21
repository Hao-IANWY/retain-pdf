/** agent 画的概念图：解析、布局、图形构造。
 *
 * 两类断言，作用不同：
 *
 * - **props 过 tldraw 的真校验器**（`@tldraw/tlschema`）。geo 那边已经栽过一次
 *   （`text` 根本不是属性，画布整个白屏），箭头这边属性更多，不验等着再栽。
 * - **坏输入不能把图整个搞没**。这份 JSON 是 agent 写的，缺字段、指向不存在的
 *   节点、写出环，都会真实发生。每一条都应该只丢掉那一个，不是丢掉整张图。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

import {
  CANVAS_LAYOUT,
  buildCanvasShapes,
  colorForKind,
  layerOf,
  nodeForShapeId,
  nodeShapeId,
  parseCanvasDoc,
} from "../../src/features/reader/domain/reading-canvas-doc.ts";

const require = createRequire(import.meta.url);
const tlschema = require("@tldraw/tlschema");

const PROPS_BY_TYPE = {
  geo: tlschema.geoShapeProps,
  arrow: tlschema.arrowShapeProps,
};

function validateShapes(shapes) {
  assert.ok(shapes.length > 0, "一个图形都没生成");
  for (const shape of shapes) {
    const schema = PROPS_BY_TYPE[shape.type];
    assert.ok(schema, `没有 ${shape.type} 的校验器`);
    for (const [key, value] of Object.entries(shape.props)) {
      assert.ok(key in schema, `${shape.type} 没有 ${key} 这个属性`);
      // 逐键验：整体验的话报错说不清是哪个键。
      schema[key].validate(value);
    }
  }
}

const DOC = {
  schema: "retainpdf_reading_canvas_v1",
  nodes: [
    { id: "a", kind: "concept", text: "自注意力替代循环", anchor: { page_idx: 1, block_id: "b-intro-3" } },
    { id: "b", kind: "result", text: "训练可以完全并行" },
    { id: "c", kind: "question", text: "那位置信息从哪来？" },
  ],
  edges: [
    { from: "a", to: "b", label: "因此" },
    { from: "a", to: "c" },
  ],
};

test("整张图的每个属性都过 tldraw 校验（节点 + 箭头）", () => {
  const { shapes } = buildCanvasShapes(parseCanvasDoc(DOC));
  assert.equal(shapes.filter((s) => s.type === "geo").length, 3);
  assert.equal(shapes.filter((s) => s.type === "arrow").length, 2);
  validateShapes(shapes);
});

test("kind 认不出就退回灰色，不抛错", () => {
  // 颜色错了图还能看，抛错就什么都没了。
  assert.equal(colorForKind("concept"), "blue");
  assert.equal(colorForKind("agent 自己编的一个词"), "grey");
  assert.equal(colorForKind(undefined), "grey");
  // 退回值也必须是 tldraw 认的颜色，不然等于把崩溃推迟到渲染时。
  for (const kind of ["concept", "note", "question", "warning", "result", "乱写", undefined]) {
    tlschema.geoShapeProps.color.validate(colorForKind(kind));
  }
});

test("没锚点的节点画虚线 —— 点上去没反应得先看得出来", () => {
  const { shapes } = buildCanvasShapes(parseCanvasDoc(DOC));
  const [a, b] = shapes;
  assert.equal(a.props.dash, "solid", "有锚点的该是实线");
  assert.equal(b.props.dash, "dashed", "没锚点的该是虚线");
});

test("层数由边决定，从左往右", () => {
  const layers = layerOf(parseCanvasDoc(DOC));
  assert.equal(layers.get("a"), 0);
  assert.equal(layers.get("b"), 1);
  assert.equal(layers.get("c"), 1);

  const { placed } = buildCanvasShapes(parseCanvasDoc(DOC));
  const x = Object.fromEntries(placed.map((p) => [p.node.id, p.x]));
  assert.equal(x.a, 0);
  assert.equal(x.b, CANVAS_LAYOUT.NODE_W + CANVAS_LAYOUT.COL_GAP);
  assert.equal(x.b, x.c, "同一层该在同一列");
  const y = Object.fromEntries(placed.map((p) => [p.node.id, p.y]));
  assert.notEqual(y.b, y.c, "同一层的两个节点叠在一起了");
});

test("agent 写出环也要画得出来", () => {
  // 「A 导致 B，B 又强化 A」在论文里是常见说法，拓扑排序遇到它要么抛错要么丢边。
  const cyclic = parseCanvasDoc({
    nodes: [{ id: "a", text: "甲" }, { id: "b", text: "乙" }],
    edges: [{ from: "a", to: "b" }, { from: "b", to: "a" }],
  });
  const { shapes } = buildCanvasShapes(cyclic);
  assert.equal(shapes.filter((s) => s.type === "geo").length, 2);
  assert.equal(shapes.filter((s) => s.type === "arrow").length, 2);
  validateShapes(shapes);
});

test("坏输入只丢掉坏的那一个", () => {
  const doc = parseCanvasDoc({
    nodes: [
      { id: "ok", text: "留下" },
      { id: "no-text" },                       // 空框
      { text: "没有 id" },                      // 边引用不到
      { id: "ok", text: "重复 id" },            // 后来的丢掉
      null,
      "字符串",
    ],
    edges: [
      { from: "ok", to: "不存在" },             // 画不出来
      { from: "ok", to: "ok" },                 // 自环：画出来是个点
      { from: "ok" },
      null,
    ],
  });
  assert.equal(doc.nodes.length, 1);
  assert.equal(doc.nodes[0].text, "留下");
  assert.equal(doc.edges.length, 0);
  validateShapes(buildCanvasShapes(doc).shapes);
});

test("整份文件不可用时返回 null，交给调用方当「还没有」", () => {
  assert.equal(parseCanvasDoc(null), null);
  assert.equal(parseCanvasDoc("字符串"), null);
  assert.equal(parseCanvasDoc({}), null);
  assert.equal(parseCanvasDoc({ nodes: "不是数组" }), null);
  assert.equal(parseCanvasDoc({ nodes: [] }), null);
  assert.equal(parseCanvasDoc({ nodes: [{ id: "x" }] }), null, "全是坏节点等于没有图");
});

test("shape id 能往返，越界不返回节点", () => {
  const { placed } = buildCanvasShapes(parseCanvasDoc(DOC));
  assert.equal(nodeForShapeId(placed, nodeShapeId(0)).id, "a");
  assert.equal(nodeForShapeId(placed, nodeShapeId(2)).id, "c");
  assert.equal(nodeForShapeId(placed, "shape:canvas-node-99"), undefined);
  assert.equal(nodeForShapeId(placed, "shape:canvas-edge-0"), undefined);
});

test("箭头从源的右边连到目标的左边", () => {
  const { shapes } = buildCanvasShapes(parseCanvasDoc(DOC));
  const arrow = shapes.find((s) => s.type === "arrow");
  const { NODE_W, NODE_H, COL_GAP } = CANVAS_LAYOUT;
  assert.deepEqual(arrow.props.start, { x: NODE_W, y: NODE_H / 2 });
  assert.deepEqual(arrow.props.end, { x: NODE_W + COL_GAP, y: NODE_H / 2 });
  assert.ok(arrow.props.end.x > arrow.props.start.x, "箭头方向反了");
});

// ---------------------------------------------------------------- 读哪一份

const { chooseCanvasSource } = await import(
  "../../src/features/reader/domain/reading-canvas-doc.ts"
);

const PATH_JSON = JSON.stringify({ steps: [{ order: 1, page_idx: 0, block_id: "b-1" }] });

test("有概念图就用概念图，没有才退回阅读路径", () => {
  assert.equal(
    chooseCanvasSource({ canvasText: JSON.stringify(DOC), pathText: PATH_JSON }).kind,
    "canvas",
  );
  assert.equal(
    chooseCanvasSource({ canvasText: null, pathText: PATH_JSON }).kind,
    "path",
  );
  assert.equal(chooseCanvasSource({ canvasText: null, pathText: null }).kind, "empty");
});

test("概念图写坏了要说出来，不能静默退回阅读路径", () => {
  // 静默退回的话，agent 写坏了文件用户只会看到一张旧图，永远不知道该让它重写。
  for (const bad of ["{ 不是 json", JSON.stringify({ nodes: [] }), JSON.stringify({})]) {
    const chosen = chooseCanvasSource({ canvasText: bad, pathText: PATH_JSON });
    assert.equal(chosen.kind, "broken", `「${bad.slice(0, 20)}」该报 broken`);
    assert.ok(chosen.reason.length > 0, "得说清楚哪里不对");
  }
});

test("阅读路径自己坏了就当没有 —— 它只是退路", () => {
  // 在这里报错会盖住「去画一张图」这个真正该给的提示。
  assert.equal(chooseCanvasSource({ canvasText: null, pathText: "{ 坏的" }).kind, "empty");
  assert.equal(
    chooseCanvasSource({ canvasText: null, pathText: JSON.stringify({ steps: [] }) }).kind,
    "empty",
  );
  assert.equal(
    chooseCanvasSource({ canvasText: null, pathText: JSON.stringify({ steps: [{}] }) }).kind,
    "empty",
    "步骤全都没有 block_id 等于没有路径",
  );
});
