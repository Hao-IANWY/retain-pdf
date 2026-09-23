/** AI 批注的入口。
 *
 * 起因：这个功能的数据链路早就通了（轮询 → 页面上画记号 → 点开弹窗），但
 * **界面上没有任何东西说明它存在**。没让 agent 标过时一片空白；标过了，一本
 * 两百页的论文里散着五条，得正好翻到那一页才撞见。等于没有。
 *
 * 所以这里守的第一件事不是"列表好不好用"，是**入口在不在、空的时候还在不在**。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  AI_NOTE_NO_PAGE,
  groupAiNotesByPage,
  notesUpToLevel,
  parseAiNotes,
} from "../../../packages/reader/src/shared/data/ai-notes.ts";

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const PKG = "../../../packages/reader/src/";
const FAB = read(`${PKG}components/react-pdf/ReaderFab.tsx`);
const PANEL = read(`${PKG}components/react-pdf/ReaderAiNotesPanel.tsx`);
const APP = read(`${PKG}ReaderAppReactPdf.tsx`);
const ROW = read(`${PKG}components/react-pdf/ReaderFabMenu.tsx`);

// ---------------------------------------------------------------- 入口

test("FAB 上有 AI 批注这一行", () => {
  // 没有它，这个功能只能靠"碰巧翻到有记号的那一页"被发现。
  //
  // 钉在 LOCAL_TOOLS 这个数组上,不是全文查 "ai-notes" —— 那个词在 TOOL_ICONS
  // 和类型别名里也有,把这一项从数组里删掉照样绿（反证时发现的）。
  const tools = FAB.slice(FAB.indexOf("const LOCAL_TOOLS"), FAB.indexOf("];", FAB.indexOf("const LOCAL_TOOLS")));
  assert.match(tools, /id: "ai-notes" as const/, "LOCAL_TOOLS 里没有 AI 批注这一项");
  assert.match(tools, /title: "AI 批注"/);
  assert.match(FAB, /"ai-notes": Highlighter/, "没给图标,那一行会崩");
  assert.match(APP, /id === "ai-notes"/, "FAB 点了没人接");
  assert.match(APP, /<ReaderAiNotesPanel/, "面板没挂上去");
});

test("0 条时那一行照样画出来", () => {
  // 这是整条修复的要害：条数为 0 恰恰是最需要入口的时候（用户根本不知道
  // 有这回事）。把行本身藏掉等于把功能藏掉。
  // 枚举"哪几种藏法"是守不住的（反证时一个 .filter 就绕过去了）。改成守
  // **条数只能喂给角标**：整行的存在与否完全不看它。
  const block = FAB.slice(FAB.indexOf("{LOCAL_TOOLS"), FAB.indexOf("AUXILIARY_TOOLS.map"));
  const uses = block.match(/aiNoteCount/g) ?? [];
  assert.equal(uses.length, 1, `渲染这段里 aiNoteCount 出现了 ${uses.length} 次,只该有角标那一处`);
  assert.match(block, /badge=\{tool\.id === "notes" \? noteCount : aiNoteCount\}/);
  // 直接 .map 而不是先 .filter —— 任何按条数筛的写法都会让上面那条计数失败,
  // 这一条再挡住"换个变量名筛"。
  assert.ok(block.startsWith("{LOCAL_TOOLS.map("), `整行渲染被加了条件: ${block.slice(0, 60)}`);
  // 角标本身可以不画（"0 条"比不画更像坏了），但那是 badge 的事，不是行的事。
  assert.match(ROW, /\{badge \? <span className="reader-fab-row-badge">/);
});

test("空状态要教人怎么生成，而不是只说「暂无」", () => {
  // 面板开出来是空的，和"功能坏了"长得一模一样。这段是这个功能唯一的说明书。
  assert.match(PANEL, /还没有 AI 批注/);
  assert.match(PANEL, /notes\.v1\.json/, "没告诉人产物落在哪");
  assert.match(PANEL, /不用刷新/, "没说会自己出现 —— 人会以为要重开");
});

test("点一条要跳到锚点，而不是只展开正文", () => {
  assert.match(PANEL, /onJump\(\{ page_idx: note\.anchor\.pageIdx \?\? undefined, block_id: note\.anchor\.blockId \}\)/);
  assert.match(APP, /onJump=\{jumpCitation\}[\s\S]{0,80}\/>\s*<ReaderNotesPanel/, "没接到阅读页的跳转上");
});

// ---------------------------------------------------------------- 密度

test("默认挡掉 level 3，但要能看全", () => {
  // 模型很容易把"这段讲了 X"这种复述也写进来。默认全显示的话，第一次打开
  // 就是一屏噪音，人会直接关掉再也不开。
  assert.match(PANEL, /const DEFAULT_MAX_LEVEL = 2;/);
  assert.match(PANEL, /显示全部/, "没有看全的出口");
  assert.match(PANEL, /只看重点/, "看全了回不去");
});

test("notesUpToLevel 真的按 level 过滤", () => {
  const doc = parseAiNotes({
    notes: [
      { id: "a", level: 1, text: "必看", anchor: { block_id: "b1", page_idx: 0 } },
      { id: "b", level: 2, text: "有用", anchor: { block_id: "b2", page_idx: 1 } },
      { id: "c", level: 3, text: "细节", anchor: { block_id: "b3", page_idx: 1 } },
    ],
  });
  assert.equal(doc.notes.length, 3);
  assert.deepEqual(notesUpToLevel(doc.notes, 2).map((n) => n.id), ["a", "b"]);
  assert.deepEqual(notesUpToLevel(doc.notes, 3).map((n) => n.id), ["a", "b", "c"]);
});

test("没写页码的批注不冒充第 1 页", () => {
  // pageIdx 为 null 时归到 0 会显示成「第 1 页」,点了跳到错的地方,而且看起来
  // 完全正常。**这条原本是查源码里有没有 MAX_SAFE_INTEGER,而那个词在渲染那段
  // 也出现,所以永远绿** —— 反证时才发现。现在是真跑分组。
  const doc = parseAiNotes({
    notes: [
      { id: "a", level: 1, text: "第 3 页", anchor: { block_id: "b1", page_idx: 2 } },
      { id: "b", level: 1, text: "没页码", anchor: { block_id: "b2" } },
      { id: "c", level: 1, text: "第 1 页", anchor: { block_id: "b3", page_idx: 0 } },
    ],
  });
  const groups = groupAiNotesByPage(doc.notes);
  assert.deepEqual(groups.map((g) => g.page), [0, 2, AI_NOTE_NO_PAGE], "页码没升序,或没页码的没落到最后");
  assert.deepEqual(groups.at(-1).items.map((n) => n.id), ["b"]);
  assert.match(PANEL, /未标页码/, "最后那组没有自己的标题,会显示成一个巨大的页码");
});

// ---------------------------------------------------------------- 边界

test("不和手写批注合成一个列表", () => {
  // 手写的可改可删可导出；AI 的是 agent 重写整份文件时一起换掉的,改了下一轮
  // 就没了。混在一起会出现"一半条目能编辑一半不能",而且分不出谁写的。
  assert.doesNotMatch(PANEL, /onUpdateNote|onRemove|onExport/);
  assert.match(APP, /<ReaderNotesPanel/, "手写那个面板被顺手删了");
});

test("面板住在包里，不走宿主适配器", () => {
  // 数据已经在包手上（useReaderAiNotes），再绕一圈宿主注入等于凭空多一层,
  // 而那层每加一个面板要改 7 个文件（见 reader-assistant-panels.ts 顶部）。
  assert.doesNotMatch(PANEL, /adapters/);
  assert.match(PANEL, /from "\.\.\/\.\.\/shared\/data\/ai-notes\.js"/);
});
