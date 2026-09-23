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

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

import {
  imageRefsOf,
  parseCanvasDoc,
} from "../../src/features/reader/domain/reading-canvas-doc.ts";
import {
  CANVAS_LAYOUT,
  buildCanvasShapes,
  colorForKind,
  imageHeightFor,
  layerOf,
  nodeForShapeId,
  nodeShapeId,
  shortLabel,
} from "../../src/features/reader/domain/reading-canvas-render.ts";

const require = createRequire(import.meta.url);
const tlschema = require("@tldraw/tlschema");

const PROPS_BY_TYPE = {
  geo: tlschema.geoShapeProps,
  arrow: tlschema.arrowShapeProps,
  image: tlschema.imageShapeProps,
  text: tlschema.textShapeProps,
};

function validateAssets(assets) {
  for (const asset of assets) {
    assert.equal(asset.typeName, "asset");
    assert.equal(asset.type, "image");
    tlschema.assetIdValidator.validate(asset.id);
    for (const [key, value] of Object.entries(asset.props)) {
      assert.ok(key in tlschema.imageAssetProps, `image 资产没有 ${key} 这个属性`);
      tlschema.imageAssetProps[key].validate(value);
    }
  }
}

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

test("有概念图就用概念图，没有就是空 —— 没有任何退路", () => {
  // 早先这里在没有 canvas.v1.json 时会退回 reading-path.v1.json 的步骤卡片。
  // 而阅读路径在旁边那个 tab 里有自己的面板:同一份数据两个地方画,并且打开
  // 「画布」看到一列卡片,会让人以为那就是概念图。
  assert.equal(chooseCanvasSource({ canvasText: JSON.stringify(DOC) }).kind, "canvas");
  assert.equal(chooseCanvasSource({ canvasText: null }).kind, "empty");
});

test("退路不能被悄悄加回来", () => {
  // 加回来的表现是「画布 tab 里出现了阅读路径」—— 不报错、不失败,只是两个 tab
  // 显示同一份东西,而且其中一个挂着错的标题。
  const DOC_SRC = read("../../src/features/reader/domain/reading-canvas-doc.ts");
  assert.doesNotMatch(DOC_SRC, /pathText/, "chooseCanvasSource 又收阅读路径了");
  assert.doesNotMatch(DOC_SRC, /kind: "path"/, "CanvasSource 又多了 path 变体");
  const PANEL = read("../../src/features/reader/ui/reading-canvas.tsx");
  assert.doesNotMatch(PANEL, /fetchArtifact\(jobId, "reading-path"\)/,
    "画布又去拉阅读路径了 —— 每 4 秒一次的白拉请求");
  // 空状态得把人指到旁边那个 tab,否则「画布是空的」看起来像功能坏了。
  assert.match(PANEL, /阅读路径在旁边那个 tab/);
});

test("概念图写坏了要说出来，不能静默当成空", () => {
  // 静默的话,agent 写坏了文件用户只会看到「画布是空的」,永远不知道该让它重写。
  for (const bad of ["{ 不是 json", JSON.stringify({ nodes: [] }), JSON.stringify({})]) {
    const chosen = chooseCanvasSource({ canvasText: bad });
    assert.equal(chosen.kind, "broken", `「${bad.slice(0, 20)}」该报 broken`);
    assert.ok(chosen.reason.length > 0, "得说清楚哪里不对");
  }
});


// ---------------------------------------------------------------- 图片

const IMG = { name: "fig.jpg", dataUrl: "data:image/jpeg;base64,/9j/4AAQ", w: 1200, h: 600 };
const IMG_DOC = {
  nodes: [
    { id: "f", kind: "concept", text: "整体流程", image: "fig.jpg",
      anchor: { page_idx: 2, block_id: "p003-b0003" } },
    { id: "t", text: "纯文字节点" },
  ],
  edges: [{ from: "f", to: "t" }],
};

test("图片节点画成真图片，资产和图形都过校验", () => {
  const doc = parseCanvasDoc(IMG_DOC);
  const { shapes, assets } = buildCanvasShapes(doc, new Map([["fig.jpg", IMG]]));
  assert.equal(assets.length, 1, "该有一个图片资产");
  validateAssets(assets);
  const image = shapes.find((s) => s.type === "image");
  assert.ok(image, "没生成图片图形");
  assert.equal(image.props.assetId, assets[0].id, "图形引用的资产对不上");
  assert.ok(shapes.some((s) => s.type === "text"), "图下面该有一行说明");
  validateShapes(shapes);
});

test("取不到图就退回文字框，不是整张画布消失", () => {
  // 一张图挂了不该让别的都看不见。
  const doc = parseCanvasDoc(IMG_DOC);
  const { shapes, assets } = buildCanvasShapes(doc, new Map());
  assert.equal(assets.length, 0);
  assert.equal(shapes.filter((s) => s.type === "geo").length, 2, "两个节点都该是文字框");
  assert.equal(shapes.filter((s) => s.type === "image").length, 0);
  validateShapes(shapes);
});

test("图片按原比例缩放，且高度收在上下限里", () => {
  // 收上限不是美观问题：一张长条图能把画布顶到看不见别的。
  const { NODE_W, IMAGE_MIN_H, IMAGE_MAX_H } = CANVAS_LAYOUT;
  assert.equal(imageHeightFor({ ...IMG, w: 1200, h: 600 }), NODE_W / 2, "该按比例");
  assert.equal(imageHeightFor({ ...IMG, w: 100, h: 5000 }), IMAGE_MAX_H, "长条图该被收住");
  assert.equal(imageHeightFor({ ...IMG, w: 5000, h: 100 }), IMAGE_MIN_H, "扁条图该有下限");
  assert.equal(imageHeightFor({ ...IMG, w: 0, h: 0 }), CANVAS_LAYOUT.NODE_H, "坏尺寸退回默认");
  assert.equal(imageHeightFor(undefined), CANVAS_LAYOUT.NODE_H);
});

test("图和它的说明都能点，跳的是同一个节点", () => {
  // 点说明却不跳，会让人以为这个节点没锚点。
  const doc = parseCanvasDoc(IMG_DOC);
  const { placed } = buildCanvasShapes(doc, new Map([["fig.jpg", IMG]]));
  assert.equal(nodeForShapeId(placed, "shape:canvas-node-0").id, "f");
  assert.equal(nodeForShapeId(placed, "shape:canvas-cap-0").id, "f");
});

test("高矮不一的节点不会互相压着", () => {
  // 固定行高的话，图片节点要么压住下面的，要么中间空一大块。
  const doc = parseCanvasDoc({
    nodes: [
      { id: "a", text: "高图", image: "tall.jpg" },
      { id: "b", text: "紧接着" },
    ],
    edges: [],
  });
  const tall = { name: "tall.jpg", dataUrl: IMG.dataUrl, w: 100, h: 400 };
  const { placed } = buildCanvasShapes(doc, new Map([["tall.jpg", tall]]));
  const [first, second] = placed;
  assert.ok(second.y >= first.y + first.h, `第二个压在第一个上了: ${second.y} < ${first.y + first.h}`);
});

test("引用到的图片文件名去重后交给宿主", () => {
  const doc = parseCanvasDoc({
    nodes: [
      { id: "a", text: "一", image: "same.jpg" },
      { id: "b", text: "二", image: "same.jpg" },
      { id: "c", text: "三" },
    ],
    edges: [],
  });
  assert.deepEqual(imageRefsOf(doc), ["same.jpg"]);
});

test("image 只收文件名，路径一律丢掉", () => {
  // 拼进图片 URL 的东西带 `../` 就是任意文件读取。
  for (const hostile of ["../../../etc/passwd", "a/b.jpg", "/abs.jpg", "x.jpg?y=1", ""]) {
    const doc = parseCanvasDoc({ nodes: [{ id: "n", text: "t", image: hostile }], edges: [] });
    assert.equal(doc.nodes[0].image, undefined, `${hostile} 不该被收下`);
  }
  const ok = parseCanvasDoc({ nodes: [{ id: "n", text: "t", image: "e7b7.jpg" }], edges: [] });
  assert.equal(ok.nodes[0].image, "e7b7.jpg");
});

// ---------------------------------------------------------------- 看得过来

test("过长的标签被截断 —— 一个失控节点不该撑垮整张图", () => {
  const { MAX_LABEL } = CANVAS_LAYOUT;
  const long = "很长".repeat(200);
  assert.equal(shortLabel(long).length, MAX_LABEL);
  assert.ok(shortLabel(long).endsWith("…"), "截断了要看得出来");
  assert.equal(shortLabel("短的"), "短的", "短的不该动");
  assert.equal(shortLabel("  多  余   空白 "), "多 余 空白", "换行和多余空格会把卡片撑高");

  const doc = parseCanvasDoc({ nodes: [{ id: "n", text: long }], edges: [] });
  const { shapes } = buildCanvasShapes(doc);
  const rendered = JSON.stringify(shapes[0].props.richText);
  assert.ok(rendered.length < 400, `卡片里塞了 ${rendered.length} 字符`);
  // 截断只影响显示，原文还在文档里。
  assert.equal(doc.nodes[0].text, long);
});

test("箭头标签也截断", () => {
  const doc = parseCanvasDoc({
    nodes: [{ id: "a", text: "甲" }, { id: "b", text: "乙" }],
    edges: [{ from: "a", to: "b", label: "因为".repeat(200) }],
  });
  const arrow = buildCanvasShapes(doc).shapes.find((s) => s.type === "arrow");
  assert.ok(JSON.stringify(arrow.props.richText).length < 400);
});

// ---------------------------------------------------------------- 懒加载

test("domain 层只许类型导入 tldraw", () => {
  // 值导入会把整个 tldraw（1.6 MB）拽进首屏包，把画布面板的懒加载废掉 ——
  // 而且不会有任何报错，只是首屏慢了。我自己就写错过一次（AssetRecordType）。
  // 整个 domain 目录都要守，不只是某一个文件 —— 拆分之后新文件很容易漏掉。
  const dir = new URL("../../src/features/reader/domain/", import.meta.url);
  const files = readdirSync(dir).filter((name) => name.endsWith(".ts"));
  let checked = 0;
  for (const name of files) {
    const source = readFileSync(new URL(name, dir), "utf8");
    for (const line of source.match(/^import[^;]*from "tldraw";/gm) || []) {
      checked += 1;
      assert.match(line, /^import type /, `${name} 值导入了 tldraw:\n${line}`);
    }
  }
  assert.ok(checked >= 2, `只查到 ${checked} 条 tldraw 导入，断言方式该改了`);
});
