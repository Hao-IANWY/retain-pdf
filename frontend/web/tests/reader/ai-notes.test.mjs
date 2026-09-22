/** agent 写的页面批注：解析、锚定、密度。
 *
 * 这份 JSON 是 agent 写的，形状不保证。核心不变量只有一条：**锚不到的批注绝不
 * 猜位置**。贴错地方的批注比没有批注更糟 —— 你看不出它贴错了，只会被误导。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  notesUpToLevel,
  parseAiNotes,
} from "../../../../frontend/packages/reader/src/shared/data/ai-notes.ts";

const READER_SRC = new URL(
  "../../../../frontend/packages/reader/src/",
  import.meta.url,
);
const read = (relative) => readFileSync(new URL(relative, READER_SRC), "utf8");

const DOC = {
  schema: "retainpdf_ai_notes_v1",
  notes: [
    {
      id: "n1",
      kind: "warning",
      level: 1,
      anchor: { page_idx: 3, block_id: "p004-b0012" },
      text: "这里默认了数据 i.i.d.，但第 4 节实验不满足",
      refs: [{ page_idx: 7, block_id: "p008-b0003", label: "第 4 节实验设置" }],
    },
    {
      id: "n2",
      kind: "term",
      level: 2,
      anchor: { page_idx: 0, block_id: "p001-b0009" },
      text: "React-OT 在这里第一次出现",
      refs: [{ block_id: "p003-b0002" }],
    },
    {
      id: "n3",
      anchor: { page_idx: 5, block_id: "p006-b0001" },
      text: "这段讲了方法的整体流程",
    },
  ],
};

test("完整解析：锚点、类型、级别、引用", () => {
  const doc = parseAiNotes(DOC);
  assert.equal(doc.notes.length, 3);
  const [a, b, c] = doc.notes;
  assert.deepEqual(a.anchor, { blockId: "p004-b0012", pageIdx: 3 });
  assert.equal(a.kind, "warning");
  assert.equal(a.level, 1);
  assert.equal(a.refs[0].label, "第 4 节实验设置");
  assert.equal(b.refs[0].label, "p003-b0002", "没给 label 就用 block_id 兜底");
  assert.equal(c.kind, "note", "认不出/没写的 kind 退回中性");
});

test("没有 refs 的标成 weak，但照样解析出来", () => {
  // 没有 refs 多半是复述（原文就在旁边，总结它没意义）。这一版**只标记不过滤**：
  // 还没有任何真实数据说明模型会不会给 refs，先量再决定要不要卡。
  const doc = parseAiNotes(DOC);
  assert.equal(doc.notes[0].weak, false);
  assert.equal(doc.notes[2].weak, true);
  assert.equal(doc.weakCount, 1, "weakCount 是用来量的，不能丢");
  assert.equal(doc.notes.length, 3, "这一版不该把 weak 的过滤掉");
});

test("漏写 level 默认成 3，不占「必看」的配额", () => {
  // 默认 1 的话模型漏写就自动挤进必看，密度控制立刻失效。
  const doc = parseAiNotes(DOC);
  assert.equal(doc.notes[2].level, 3);
  for (const bad of [0, 4, -1, "1", null, undefined, NaN]) {
    const one = parseAiNotes({ notes: [{ id: "x", anchor: { block_id: "b" }, text: "t", level: bad }] });
    assert.ok([1, 2, 3].includes(one.notes[0].level), `level=${bad} 解析出了 ${one.notes[0].level}`);
  }
  assert.equal(parseAiNotes({ notes: [{ id: "x", anchor: { block_id: "b" }, text: "t", level: 1 }] }).notes[0].level, 1);
});

test("没有 block_id 的批注整条丢掉", () => {
  // 画不出来，也跳不过去 —— 留着只会变成一个点不动的幽灵。
  const doc = parseAiNotes({
    notes: [
      { id: "ok", anchor: { block_id: "b1" }, text: "留下" },
      { id: "no-anchor", text: "没有锚点" },
      { id: "empty-anchor", anchor: {}, text: "空锚点" },
      { id: "page-only", anchor: { page_idx: 2 }, text: "只有页码" },
      { id: "no-text", anchor: { block_id: "b2" } },
      { id: "dup", anchor: { block_id: "b3" }, text: "第一个" },
      { id: "dup", anchor: { block_id: "b4" }, text: "重复 id" },
      null,
      "字符串",
    ],
  });
  assert.deepEqual(doc.notes.map((n) => n.id), ["ok", "dup"]);
  assert.equal(doc.notes[1].text, "第一个", "重复 id 该保留先来的");
});

test("坏引用被丢掉，但批注本身留着", () => {
  const doc = parseAiNotes({
    notes: [{
      id: "n", anchor: { block_id: "b" }, text: "t",
      refs: [{ block_id: "good" }, { page_idx: 3 }, null, "x", {}],
    }],
  });
  assert.equal(doc.notes.length, 1);
  assert.deepEqual(doc.notes[0].refs.map((r) => r.blockId), ["good"]);
  assert.equal(doc.notes[0].weak, false, "还有一个有效引用就不算 weak");
});

test("整份不可用时返回 null，交给调用方当「还没有」", () => {
  for (const bad of [null, undefined, "字符串", 42, {}, { notes: "不是数组" }, { notes: [] }, { notes: [{}] }]) {
    assert.equal(parseAiNotes(bad), null, `${JSON.stringify(bad)} 该是 null`);
  }
});

test("按 level 过滤 —— 密度控制的基础", () => {
  const doc = parseAiNotes(DOC);
  assert.equal(notesUpToLevel(doc.notes, 3).length, 3);
  assert.equal(notesUpToLevel(doc.notes, 2).length, 2);
  assert.deepEqual(notesUpToLevel(doc.notes, 1).map((n) => n.id), ["n1"]);
});

// ---------------------------------------------------------------- 结构不变量

test("锚不到的批注不画 —— 绝不猜位置", () => {
  // 贴错地方的批注比没有批注更糟：你看不出它贴错了，只会被误导。
  const pane = read("pdf/PdfDocumentPane.tsx");
  const block = pane.slice(
    pane.indexOf("const aiNoteTargetsByPage"),
    pane.indexOf("const windowedSet"),
  );
  assert.ok(block, "找不到批注分组那段");
  assert.match(block, /findReaderRegion\(regions, note\.anchor\.blockId\)/);
  assert.match(block, /if \(!region\) continue;/, "锚不到时没有跳过");
  assert.match(block, /if \(!highlight\) continue;/, "解析不出 bbox 时没有跳过");
  // 不能有任何按页码兜底的分支：那就是在猜。
  assert.doesNotMatch(block, /pageIdx|page_idx/, "出现了按页码兜底 —— 那是在猜位置");
});

test("一条批注在原文栏和译文栏各自定位", () => {
  // 锚点是语义的（block_id），不是某张 PDF 的坐标。这是保版式翻译白送的性质：
  // 英文原文上标的疑问，中文译文的同一个块上也有。
  const pane = read("pdf/PdfDocumentPane.tsx");
  const block = pane.slice(
    pane.indexOf("const aiNoteTargetsByPage"),
    pane.indexOf("const windowedSet"),
  );
  assert.match(block, /resolveReaderRegionHighlight\(region, readerMetadata, pane\)/);
  assert.match(block, /\[aiNotes, pane, readerMetadata, regions\]/, "依赖里漏了 pane，换栏不会重算");
});

test("页面上只画记号，正文只在弹窗里", () => {
  // 密度的根本解。把正文铺在页面上，几条之后就没法看了。
  const layer = read("pdf/ReaderAiNoteLayer.tsx");
  assert.match(layer, /<span className="sr-only">\{note\.text\}<\/span>/, "正文该只给读屏");
  assert.doesNotMatch(
    layer,
    /<(p|div|span)(?![^>]*sr-only)[^>]*>\s*\{note\.text\}/,
    "批注正文被画到页面上了",
  );
  const popover = read("pdf/ReaderAiNotePopover.tsx");
  assert.match(popover, /className="reader-ai-note-popover-text"/);
});

test("点击触发，不用悬停", () => {
  // 标记密集时悬停会疯狂闪烁，触屏上更是根本没有悬停。
  const layer = read("pdf/ReaderAiNoteLayer.tsx");
  assert.match(layer, /onClick=/);
  assert.doesNotMatch(layer, /onMouseEnter|onPointerEnter|onMouseOver/);
});

test("引用是可点的跳转目标，不是装饰", () => {
  const popover = read("pdf/ReaderAiNotePopover.tsx");
  assert.match(popover, /onJump\(\{ page_idx: ref_\.pageIdx \?\? undefined, block_id: ref_\.blockId \}\)/);
  assert.match(popover, /reader-ai-note-popover-weak/, "没有依据的批注要让人看得出来");
});

test("批注会轮询，不是一次性加载", () => {
  // agent 是在你读的时候写的。一次性加载 = 标完了要刷新才看得见（画布踩过）。
  const hook = read("hooks/use-reader-ai-notes.ts");
  assert.match(hook, /setInterval/);
  assert.match(hook, /clearInterval/, "没清理定时器");
  assert.match(hook, /raw === lastRaw/, "内容没变也换引用，每页标记会白白重算");
});
