/** 终端可以同时开几条。
 *
 * 起因：后端**一直支持并行**（`build_terminal_launch` 收 `busy_session_ids`，
 * 第二条连接会挑一个没被占用的 fx 会话），卡点一直在前端 —— dock 里只有一个
 * `<FxTerminal>`。于是想一边让它跑长任务、一边问别的，只能等。
 *
 * 这里守的两类东西，性质完全不同：
 * - **标签逻辑**（纯函数，直接跑）
 * - **切标签不能卸载**（源码门禁）。卸载 = 关 WebSocket = 杀 PTY = 那段对话没了。
 *   这条错了不会报错，只是你切回来发现 fx 忘了一切。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  MAX_TERMINALS,
  activateTab,
  addTab,
  closeTab,
  initialTabs,
  setTabScope,
  tabLabel,
} from "../../src/features/reader/domain/terminal-tabs.ts";

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const PANEL = read("../../src/features/reader/ui/terminal.tsx");
const CHROME = read("../../src/features/reader/ui/terminal-chrome.tsx");
const CSS = read("../../src/styles/entries/reader.css");

let counter = 1;
const nextId = () => `t${++counter}`;
const fresh = () => { counter = 1; return initialTabs("job-1"); };

// ---------------------------------------------------------------- 标签逻辑

test("能开不止一条 —— 这就是原来缺的那件事", () => {
  let state = fresh();
  assert.equal(state.tabs.length, 1);
  state = addTab(state, nextId);
  assert.equal(state.tabs.length, 2);
  assert.equal(state.activeId, state.tabs[1].id, "新开的没有被激活");
  assert.notEqual(state.tabs[0].id, state.tabs[1].id);
});

test("有上限，到顶了原样返回而不是抛", () => {
  // 每条 = 一个 WebSocket + 一个 PTY + 一个 fx 进程（还带一个回环 HTTP 桥）。
  // 不封顶的话点几下就能把机器点满，而失败的样子是「新终端起不来」。
  let state = fresh();
  for (let i = 0; i < MAX_TERMINALS + 3; i += 1) state = addTab(state, nextId);
  assert.equal(state.tabs.length, MAX_TERMINALS);
  // 按钮该是点不动，不是报错。
  assert.doesNotThrow(() => addTab(state, nextId));
});

test("最后一条关不掉", () => {
  // 关掉之后面板里空无一物，而用户想要的多半是「重开一条」。
  const state = fresh();
  assert.equal(closeTab(state, state.activeId).tabs.length, 1);
});

test("关掉当前这条，激活权交给左边那条", () => {
  let state = fresh();
  state = addTab(state, nextId);
  state = addTab(state, nextId);
  const [first, second, third] = state.tabs;
  assert.equal(state.activeId, third.id);
  const after = closeTab(state, third.id);
  assert.equal(after.activeId, second.id, "没退到左边那条");
  // 关掉不是当前的那条，当前的不该变。
  const other = closeTab(after, first.id);
  assert.equal(other.activeId, second.id);
});

test("关一条不存在的 id 不改变任何东西", () => {
  let state = fresh();
  state = addTab(state, nextId);
  assert.deepEqual(closeTab(state, "没有这个"), state);
  assert.deepEqual(activateTab(state, "没有这个"), state);
});

// ---------------------------------------------------------------- 作用域

test("作用域是每条各自的", () => {
  // 一条盯着这本书、另一条盯着整个文件夹 —— 这是这个功能最有用的形态。
  let state = fresh();
  state = addTab(state, nextId);
  const scope = { kind: "collection", collectionId: "c1", name: "化学", documentCount: 3 };
  state = setTabScope(state, state.tabs[1].id, scope);
  assert.equal(state.tabs[0].scope.kind, "job", "改一条把另一条也改了");
  assert.equal(state.tabs[1].scope.kind, "collection");
});

test("新开的一条继承当前的作用域", () => {
  // 多半是想在同一批书上另起一段。
  let state = fresh();
  const scope = { kind: "collection", collectionId: "c1", name: "化学", documentCount: 3 };
  state = setTabScope(state, state.activeId, scope);
  state = addTab(state, nextId);
  assert.equal(state.tabs[1].scope.collectionId, "c1");
});

test("标签上带作用域，不只带序号", () => {
  // 两条长得一模一样而跑在不同的书上，切错了没有任何提示，
  // 得到的答案却是另一批书的。
  assert.equal(tabLabel({ id: "a", scope: { kind: "job", jobId: "j" } }, 0), "1 书");
  assert.equal(
    tabLabel({ id: "b", scope: { kind: "collection", collectionId: "c", name: "化学", documentCount: 3 } }, 1),
    "2 化学",
  );
});

// ---------------------------------------------------------------- 不能卸载

test("非当前的终端留在树上，只是藏起来", () => {
  // 卸载 = 关 WebSocket = 杀 PTY = 那段对话没了。不报错，只是你切回来
  // 发现 fx 忘了一切。
  assert.match(PANEL, /tabs\.tabs\.map\(\(tab\) => \(\s*<TerminalInstance/,
    "按标签条件渲染了 —— 非当前的会被卸载");
  assert.doesNotMatch(PANEL, /active \?\s*<FxTerminal/, "只渲染当前那条了");
  assert.match(PANEL, /data-hidden=\{!active \? "" : undefined\}/);
});

test("藏起来不能用 display:none", () => {
  // xterm 自己量容器尺寸,量到 0 会把终端算成 1 行,切回来是一团乱码。
  const block = CSS.slice(CSS.indexOf(".reader-terminal-instance[data-hidden]"));
  const rule = block.slice(0, block.indexOf("}"));
  assert.doesNotMatch(rule, /display:\s*none/);
  assert.match(rule, /position:\s*absolute/);
  assert.match(rule, /left:\s*-\d+vw/);
  // 藏着也要有确定尺寸,否则 fit() 还是量到 0。
  assert.match(rule, /width:/);
  assert.match(rule, /height:/);
});

test("藏起来的不参与 Tab 键，也不被读屏念", () => {
  assert.match(PANEL, /inert=\{!active \? true : undefined\}/);
  assert.match(PANEL, /aria-hidden=\{!active \? true : undefined\}/);
});

test("作用域条和提示 chip 作用在当前这条上", () => {
  // 作用在别条上的话，你切到 A 改范围，实际改的是 B —— 而两边都不会提示。
  assert.match(PANEL, /scope=\{activeTab\.scope\}/);
  assert.match(PANEL, /setTabScope\(state, state\.activeId, scope\)/);
  assert.match(PANEL, /focusTerminal=\{focusActive\}/);
});
