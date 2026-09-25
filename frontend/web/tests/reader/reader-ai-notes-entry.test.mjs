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
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import {
  AI_NOTE_NO_PAGE,
  groupAiNotesByPage,
  notesUpToLevel,
  parseAiNotes,
} from "../../../packages/reader/src/shared/data/ai-notes.ts";
import { readerDockTabs } from "../../../packages/reader/src/components/react-pdf/reader-dock-tabs.ts";
import { ReaderAssistantDock } from "../../../packages/reader/src/components/react-pdf/ReaderAssistantDock.tsx";

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const PKG = "../../../packages/reader/src/";
const PANEL = read(`${PKG}components/react-pdf/ReaderAiNotesPanel.tsx`);
const APP = read(`${PKG}ReaderAppReactPdf.tsx`);
const DOCK = read(`${PKG}components/react-pdf/ReaderAssistantDock.tsx`);

// ---------------------------------------------------------------- 入口

test("唯一那个启动器上有 AI 批注", () => {
  // 没有它，这个功能只能靠"碰巧翻到有记号的那一页"被发现。
  //
  // 跑 readerDockTabs 本身，不对源码做正则：dock 渲染 tab 用的就是这个函数，
  // 换个变量名、搬个文件都绕不过去。
  const tabs = readerDockTabs(() => true);
  const entry = tabs.find((tab) => tab.id === "ai-notes");
  assert.ok(entry, `启动器清单里没有 AI 批注: ${tabs.map((t) => t.id)}`);
  assert.equal(entry.label, "AI 批注");
  assert.ok(entry.Icon, "没给图标，那个 tab 会崩");
  assert.match(APP, /open=\{assistantPanel === "ai-notes"\}/, "点了没人接");
  assert.match(APP, /<ReaderAiNotesPanel/, "面板没挂上去");
});

test("0 条时那个 tab 照样在", () => {
  // 这是整条修复的要害：条数为 0 恰恰是最需要入口的时候（用户根本不知道
  // 有这回事）。把入口藏掉等于把功能藏掉。
  //
  // 枚举"哪几种藏法"是守不住的（反证时一个 .filter 就绕过去了）。现在是
  // **结构上不可能**：readerDockTabs 的签名里没有条数这个入参，按条数筛
  // 写不出来。这里连一条 0 都不用喂 —— 它本来就拿不到。
  const ids = readerDockTabs(() => true).map((tab) => tab.id);
  assert.ok(ids.includes("ai-notes"));
  assert.ok(ids.includes("notes"));
  assert.equal(readerDockTabs.length, 1, "readerDockTabs 多了入参 —— 条数可能又被引进来了");

  // 角标本身可以不画（"0 条"比不画更像坏了），但那是角标的事，不是 tab 的事。
  assert.match(APP, /"ai-notes": aiNoteDoc\?\.notes\.length \?\? 0/);
});

test("有几条要在**两种形态上都**看得见 —— 关着的竖条和开着的 tab 条", () => {
  // 这条原本只查源码里有没有那个 <span>，于是「只在竖条上画、tab 条上漏掉」
  // 照样绿（反证时发现的）。现在两种形态各渲染一次，各自数一遍。
  const badges = { "ai-notes": 7, notes: 0 };
  const rail = renderToStaticMarkup(
    createElement(ReaderAssistantDock, { active: null, badges, onSelect() {}, onClose() {} }),
  );
  const dock = renderToStaticMarkup(
    createElement(ReaderAssistantDock, { active: "markdown", badges, onSelect() {}, onClose() {} }),
  );
  for (const [form, markup] of [["竖条", rail], ["tab 条", dock]]) {
    assert.match(markup, /reader-assistant-dock-badge/, `${form}上没有角标`);
    assert.match(markup, />7</, `${form}上的角标没写出条数`);
    // 0 条不画角标（"0 条"比不画更像坏了），但那个入口本身必须还在。
    assert.doesNotMatch(markup, />0</, `${form}上画了一个「0」`);
    assert.ok(markup.includes("批注"), `${form}上没有批注入口`);
  }
  assert.ok(DOCK.includes("badges"), "dock 不再接收角标");
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
