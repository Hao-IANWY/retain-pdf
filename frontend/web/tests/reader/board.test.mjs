/** agent 的画板目录：解析、布局、图形构造。
 *
 * 这一块跟前三个 agent 产物最大的不同：**没有 schema**。agent 用它已有的 shell
 * 产出什么，画板就显示什么。所以这里要守的不是"字段对不对"，而是：
 *
 * - 不认的东西安静跳过，不让整块画板消失
 * - 位置稳定 —— 已经在看的东西不能因为 agent 又写了个文件就跳走
 * - 别把画板顶到看不见别的（图片和长文本都要收高度）
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

import {
  BOARD_LAYOUT,
  boardCardText,
  boardItemForShapeId,
  boardItemHeight,
  boardLabelOf,
  boardShapeId,
  buildBoardShapes,
  layoutBoard,
  parseBoardListing,
  textPreviewOf,
} from "../../src/features/reader/domain/board.ts";

const require = createRequire(import.meta.url);
const tlschema = require("@tldraw/tlschema");

const PROPS_BY_TYPE = {
  geo: tlschema.geoShapeProps,
  image: tlschema.imageShapeProps,
  text: tlschema.textShapeProps,
};

function validate({ shapes, assets }) {
  for (const shape of shapes) {
    const schema = PROPS_BY_TYPE[shape.type];
    assert.ok(schema, `没有 ${shape.type} 的校验器`);
    for (const [key, value] of Object.entries(shape.props)) {
      assert.ok(key in schema, `${shape.type} 没有 ${key} 这个属性`);
      schema[key].validate(value);
    }
  }
  for (const asset of assets) {
    tlschema.assetIdValidator.validate(asset.id);
    for (const [key, value] of Object.entries(asset.props)) {
      assert.ok(key in tlschema.imageAssetProps, `image 资产没有 ${key}`);
      tlschema.imageAssetProps[key].validate(value);
    }
  }
}

const LISTING = {
  schema: "retainpdf_ai_board_v1",
  items: [
    { name: "b.png", kind: "image", content_type: "image/png", size: 100, modified_ms: 200 },
    { name: "a.md", kind: "markdown", content_type: "text/markdown", size: 50, modified_ms: 100 },
  ],
};

const IMAGE = {
  name: "b.png", kind: "image", contentType: "image/png", size: 100, modifiedMs: 200,
  dataUrl: "data:image/png;base64,iVBORw0KGgo=", imageW: 800, imageH: 400,
};
const TEXT = {
  name: "a.md", kind: "markdown", contentType: "text/markdown", size: 50, modifiedMs: 100,
  text: "# 标题\n正文一行\n正文两行",
};
/** agent 用 typst 渲出来的 PDF，宿主已经把第 1 页画成 PNG 塞进 dataUrl 了。 */
const PDF = {
  name: "report.pdf", kind: "pdf", contentType: "application/pdf", size: 9000, modifiedMs: 300,
  dataUrl: "data:image/png;base64,iVBORw0KGgo=", imageW: 1100, imageH: 1556, pageCount: 3,
};

test("列表按修改时间排，不按后端给的顺序", () => {
  // 顺序就是布局的依据，不能指望传输过程保序。
  const items = parseBoardListing(LISTING);
  assert.deepEqual(items.map((i) => i.name), ["a.md", "b.png"]);
  assert.equal(items[0].modifiedMs, 100);
});

test("认不出的条目安静跳过，不连累别的", () => {
  const items = parseBoardListing({
    items: [
      { name: "ok.png", kind: "image", modified_ms: 1 },
      { name: "", kind: "image" },
      { name: "x.exe", kind: "binary" },
      { kind: "image" },
      null,
      "字符串",
    ],
  });
  assert.deepEqual(items.map((i) => i.name), ["ok.png"]);
});

test("整份不可用返回 null，交给调用方当「还没有」", () => {
  for (const bad of [null, undefined, {}, { items: "不是数组" }, "字符串"]) {
    assert.equal(parseBoardListing(bad), null, `${JSON.stringify(bad)} 该是 null`);
  }
  assert.deepEqual(parseBoardListing({ items: [] }), [], "空目录是空数组，不是 null");
});

test("图片和文本都过 tldraw 校验", () => {
  const built = buildBoardShapes([IMAGE, TEXT]);
  assert.equal(built.assets.length, 1, "只有图片有资产");
  assert.equal(built.shapes.filter((s) => s.type === "image").length, 1);
  assert.equal(built.shapes.filter((s) => s.type === "geo").length, 1, "文本画成框");
  assert.equal(built.shapes.filter((s) => s.type === "text").length, 2, "每项都有文件名标签");
  validate(built);
});

test("图片取不到就当文本框画，不是空洞", () => {
  // 一个文件取失败不该在画板上留个洞。
  const broken = { ...IMAGE, dataUrl: undefined, imageW: undefined, imageH: undefined };
  const built = buildBoardShapes([broken]);
  assert.equal(built.assets.length, 0);
  assert.equal(built.shapes.filter((s) => s.type === "image").length, 0);
  validate(built);
});

test("位置稳定：后来的接在后面，已有的不动", () => {
  // agent 又写了个文件就把你正在看的东西挪走，是这类界面最烦人的毛病。
  const before = layoutBoard([TEXT, IMAGE]);
  const after = layoutBoard([TEXT, IMAGE, { ...TEXT, name: "c.md", modifiedMs: 300 }]);
  assert.deepEqual(
    after.slice(0, 2).map((p) => [p.x, p.y]),
    before.map((p) => [p.x, p.y]),
    "加了一项之后前面的位置变了",
  );
  assert.ok(after[2].y > after[1].y, "新的该在下面");
});

test("项与项不重叠", () => {
  const placed = layoutBoard([TEXT, IMAGE, { ...TEXT, name: "c.md" }]);
  for (let i = 1; i < placed.length; i += 1) {
    assert.ok(
      placed[i].y >= placed[i - 1].y + placed[i - 1].h,
      `第 ${i} 项压在上一项上了`,
    );
  }
});

test("概念图在左边时，画板整体右移", () => {
  const withLeft = layoutBoard([TEXT], 760);
  assert.equal(withLeft[0].x, 760);
  assert.equal(layoutBoard([TEXT])[0].x, 0, "没有概念图时从 0 开始");
});

test("图片按比例缩放并收在上下限里", () => {
  // 一张长条图能把画板顶到看不见别的 —— 批注和概念图都踩过这个坑。
  const { ITEM_W, IMAGE_MIN_H, IMAGE_MAX_H } = BOARD_LAYOUT;
  assert.equal(boardItemHeight({ ...IMAGE, imageW: 800, imageH: 400 }), ITEM_W / 2);
  assert.equal(boardItemHeight({ ...IMAGE, imageW: 100, imageH: 9000 }), IMAGE_MAX_H);
  assert.equal(boardItemHeight({ ...IMAGE, imageW: 9000, imageH: 100 }), IMAGE_MIN_H);
});

test("长文本截断，并说清楚还有多少", () => {
  // 不说还有多少的话，你不知道自己看的是全部还是一角。
  const long = { ...TEXT, text: Array.from({ length: 200 }, (_, i) => `第 ${i} 行`).join("\n") };
  const preview = textPreviewOf(long);
  assert.ok(preview.split("\n").length < 30, "没截断");
  assert.match(preview, /还有 \d+ 行/);
  assert.ok(boardItemHeight(long) <= BOARD_LAYOUT.TEXT_MAX_H);
  // 短的不该动。
  assert.equal(textPreviewOf(TEXT), TEXT.text);
});

test("每项都带文件名标签", () => {
  // agent 起的文件名通常就是最好的说明（fig-3-residual-by-page.png）。
  // 没有标签，画板上一堆图分不清哪个是哪个。
  const built = buildBoardShapes([IMAGE, TEXT]);
  const labels = built.shapes.filter((s) => s.type === "text");
  const rendered = labels.map((s) => JSON.stringify(s.props.richText)).join(" ");
  assert.match(rendered, /b\.png/);
  assert.match(rendered, /a\.md/);
});

test("shape id 能往返，图形和它的标签指向同一项", () => {
  const { placed } = buildBoardShapes([IMAGE, TEXT]);
  assert.equal(boardItemForShapeId(placed, boardShapeId(0)).name, "b.png");
  assert.equal(boardItemForShapeId(placed, "shape:board-label-1").name, "a.md");
  assert.equal(boardItemForShapeId(placed, "shape:board-99"), undefined);
  assert.equal(boardItemForShapeId(placed, "shape:canvas-node-0"), undefined);
});

test("domain 层只许类型导入 tldraw", () => {
  // 值导入会把 1.6 MB 拽进首屏，把画布面板的懒加载废掉，而且不报错。
  const source = readFileSync(
    new URL("../../src/features/reader/domain/board.ts", import.meta.url),
    "utf8",
  );
  for (const line of source.match(/^import[^;]*from "tldraw";/gm) || []) {
    assert.match(line, /^import type /, `值导入了 tldraw:\n${line}`);
  }
});

// ------------------------------------------------------------------ PDF

test("PDF 是一种能显示的东西 —— 解析不掉它", () => {
  // agent 现在能写 .typ 用 typst 渲出中文 PDF（PATH 上就有），这条不通的话
  // 它辛苦渲出来的东西在画布上等于不存在。
  const items = parseBoardListing({
    items: [{ name: "report.pdf", kind: "pdf", content_type: "application/pdf", modified_ms: 1 }],
  });
  assert.deepEqual(items.map((i) => i.name), ["report.pdf"]);
});

test("渲好的 PDF 当图片画，资产类型是 PNG 不是 application/pdf", () => {
  // 照抄 contentType 会往 image 资产上写 application/pdf —— 类型对不上。
  const built = buildBoardShapes([PDF]);
  assert.equal(built.assets.length, 1);
  assert.equal(built.assets[0].props.mimeType, "image/png");
  assert.equal(built.shapes.filter((s) => s.type === "image").length, 1);
  validate(built);
});

test("PDF 按比例缩放，和图片同一套上下限", () => {
  const { ITEM_W, IMAGE_MAX_H } = BOARD_LAYOUT;
  assert.equal(boardItemHeight({ ...PDF, imageW: 800, imageH: 400 }), ITEM_W / 2);
  assert.equal(boardItemHeight({ ...PDF, imageW: 100, imageH: 9000 }), IMAGE_MAX_H);
});

test("渲不出来的 PDF 退成一张说明卡片，不是空框", () => {
  // 空框看起来像「agent 写了个空文件」，而实际是我们这边没画出来 —— 两件事
  // 让人分得清才知道该不该让 agent 重写。
  const broken = { name: "report.pdf", kind: "pdf", contentType: "application/pdf", size: 9000, modifiedMs: 300 };
  assert.ok(boardCardText(broken).includes("report.pdf"));
  assert.ok(boardCardText(broken).trim().split("\n").length >= 2, `卡片里只有一行: ${boardCardText(broken)}`);
  const built = buildBoardShapes([broken]);
  assert.equal(built.assets.length, 0);
  const box = built.shapes.find((s) => s.type === "geo");
  assert.ok(JSON.stringify(box.props.richText).includes("report.pdf"), "框里是空的");
  assert.ok(boardItemHeight(broken) > 0);
  validate(built);
});

test("多页 PDF 的标签说清画布上只有第 1 页", () => {
  // 不说的话用户会以为 agent 只写了一页，而它可能写了十页。
  assert.match(boardLabelOf(PDF), /共 3 页/);
  assert.match(boardLabelOf(PDF), /第 1 页/);
  // 单页的不加废话。
  assert.equal(boardLabelOf({ ...PDF, pageCount: 1 }), "report.pdf");
  assert.equal(boardLabelOf(IMAGE), "b.png");
  const labels = buildBoardShapes([PDF]).shapes.filter((s) => s.type === "text");
  assert.match(JSON.stringify(labels[0].props.richText), /共 3 页/);
});

test("PDF 渲染器不许静态 import pdfjs —— 它是运行时从 vendor 取的", () => {
  // 改成 `import ... from "pdfjs-dist"` 会把整个 pdf.js 拽进 reader 入口包，
  // 而且不会有任何报错，只是每次打开阅读页都慢一点。和 tldraw 那条是同一类回退。
  const source = readFileSync(
    new URL("../../src/features/reader/domain/board-pdf.ts", import.meta.url),
    "utf8",
  );
  for (const line of source.match(/^import[^;]*from\s+"[^"]+";/gm) || []) {
    assert.doesNotMatch(line, /"(pdfjs-dist|react-pdf)/, `静态 import 了 pdfjs:\n${line}`);
  }
  // 反过来也要守：确实走了 vendor 的动态 import。
  assert.match(source, /import\(pdfjsUrl\("build\/pdf\.mjs"\)\)/);
});

test("PDF 渲染这条路不开脚本", () => {
  // 这些 PDF 是 agent 写的，能内嵌 /OpenAction JavaScript。挡住它靠两件事：
  // 我们只用 `getDocument` + `page.render`（脚本是 pdf.js **viewer** 的功能，
  // 这里没有 viewer），以及关掉 pdf.js 自己为字体和图案做的 eval 优化。
  //
  // 只有后者能被这样守住。**必须在 getDocument 的选项块里查** —— 第一版查的是
  // 整个文件，而模块头的注释里就写着 `isEvalSupported: false`，于是把真选项删掉
  // 测试照样绿。这条反证当场抓出来了。
  const source = readFileSync(
    new URL("../../src/features/reader/domain/board-pdf.ts", import.meta.url),
    "utf8",
  );
  const start = source.indexOf("getDocument({");
  assert.ok(start > 0, "找不到 getDocument 的调用，这条门禁要跟着改");
  const options = source.slice(start, source.indexOf("}).promise", start));
  assert.match(options, /isEvalSupported:\s*false/, "getDocument 的选项里没关掉 eval");
});
