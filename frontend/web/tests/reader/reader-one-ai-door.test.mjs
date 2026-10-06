/** 阅读页只有一扇 AI 的门。
 *
 * 之前一篇文档有三扇，互相不知道对方存在：
 *
 *   AI 问答面板   自带 chunking + retrieval + llm + config 的 Rust 栈   4 个会话
 *   fx 终端       agent 进程                                          17 个会话
 *   阅读地图      渲染 agent 产物                                      1 条路径 / 1 张画布
 *
 * （用量是 15 本真实文档上的数）。两套 LLM 栈零共用代码、零共用配置、零共用会话，
 * 还有两条路由服务同一个功能（jobs/:id/reader/ai/chat 自己的注释写着 deprecated）。
 *
 * 留下用得最多、且能力是超集的那个：终端里的 agent。它有 shell，问答能做的它都能做。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { code } from "../helpers/source-text.mjs";

import {
  READER_ASSISTANT_PANEL_IDS,
  READER_HOST_PANEL_IDS,
} from "../../../packages/reader/src/shared/types/reader-assistant-panels.ts";
import { READER_HOST_PANELS }
  from "../../../packages/reader/src/components/react-pdf/reader-host-panels.ts";
import { stripComments } from "./helpers/reader-css.mjs";

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), "utf8");
const APP = read("../../../packages/reader/src/ReaderAppReactPdf.tsx");
const TERMINAL = read("../../src/features/reader/ui/terminal.tsx");

test("dock 收到只剩 Markdown 和 AI", () => {
  // 批注也删了 —— 用户的原话是「批注部分我觉得也去掉，后续翻译什么的也全部走
  // ai agent」。它是 localStorage 存的，磁盘上量不到用量，按产品方向删。
  assert.deepEqual([...READER_ASSISTANT_PANEL_IDS], ["markdown", "terminal"]);
});

test("批注的样式和外壳样式分开了 —— 外壳是所有面板共用的，不能一起删", () => {
  // 必须先剥注释再比：这个文件顶上的说明里就写着 .reader-notes-count，
  // 不剥的话把规则整条删掉、正则照样命中那句注释（反证时实测，这条曾是假的）。
  const shell = stripComments(read("../../../packages/reader/styles/panel-shell.css"));
  // 还活着的：ReaderPanelShell 的三层 + Markdown 面板用的两个
  for (const c of ["reader-notes-panel", "reader-notes-panel-toolbar",
                   "reader-notes-panel-body", "reader-notes-count", "reader-notes-empty"]) {
    assert.match(shell, new RegExp(`\\.${c}\\b`), `${c} 被删了，但组件还在用它`);
  }
  // 批注专属的：不该留
  for (const c of ["reader-notes-export", "reader-notes-quote", "reader-notes-editor",
                   "reader-ai-note-row"]) {
    assert.doesNotMatch(shell, new RegExp(`\\.${c}\\b`), `${c} 是批注专属的，没跟着走`);
  }
  // 窄屏和减动效那两块 @media 里装的是**存活**规则，整块删掉会静默弄坏面板布局。
  assert.match(shell, /@media \(max-width: 520px\)[\s\S]{0,120}reader-notes-panel--workspace/);
  assert.match(shell, /@keyframes reader-workspace-in/, "动画关键帧没了，但 animation 还引用着它");
});

test("dock 里只有一个 AI 入口", () => {
  assert.ok(!READER_ASSISTANT_PANEL_IDS.includes("ai"), "AI 问答面板还在");
  assert.ok(!READER_HOST_PANEL_IDS.includes("reading-map"), "阅读地图还在");
  const ai = READER_HOST_PANELS.filter((p) => /AI/.test(p.label));
  assert.equal(ai.length, 1, `顶着 AI 名字的面板有 ${ai.length} 个`);
  assert.equal(ai[0].id, "terminal", "那扇门不是终端");
});

test("面板 id 仍是 terminal —— 改 id 会让所有存下来的面板恢复失效", () => {
  assert.ok(READER_HOST_PANEL_IDS.includes("terminal"));
});

// ------------------------------------------------ 选区 → 终端（这是真行为测试）

test("阅读页不再有点块浮条：只留悬停红框和复制", () => {
  // 用户原话：「只保留红色虚线和复制部分」，点块 / 拖选后弹出的「文字 · 原文/译文 · 页码 ·
  // 复制 · 问 AI」浮条整个删掉。复制交给悬停框，拖选文字照旧是浏览器原生选区。
  assert.doesNotMatch(APP, /ReaderSelectionToolbar/, "浮条还挂在阅读页上");
  assert.doesNotMatch(APP, /onSelectRegion/, "点块选择还在往下传");
  assert.match(APP, /pendingInput: null/, "阅读器这边已经没有要预填进终端的东西了");
  for (const gone of [
    "../../../packages/reader/src/components/react-pdf/ReaderSelectionToolbar.tsx",
    "../../../packages/reader/src/pdf/ReaderStructureSelectionLayer.tsx",
    "../../../packages/reader/src/hooks/use-reader-text-selection.ts",
  ]) {
    assert.throws(() => read(gone), /ENOENT/, `${gone} 应已删除`);
  }
});

test("注入不替用户回车", () => {
  // 宿主的注入能力保留（阅读器现在不预填，但接口还在）：真有调用方时，
  // 一条拼出来的命令直接开跑太意外了。
  const inject = TERMINAL.slice(TERMINAL.indexOf("sentTokenRef"), TERMINAL.indexOf("const themeId"));
  assert.match(inject, /sendToActive\(pendingInput\.text\)/, "宿主没把选区送进终端");
  assert.doesNotMatch(inject, /\\r|\\n/, "注入时带了回车，agent 会直接跑起来");
  assert.match(inject, /sentTokenRef\.current === pendingInput\.token/, "没按 token 去重，会重复注入");
  assert.match(inject, /if \(!open/, "面板没开时也送 —— 那会静默丢掉");
});

// ------------------------------------------------ 删干净了没

test("tldraw 不再是依赖 —— 画布没了它就该走", () => {
  const pkg = JSON.parse(read("../../package.json"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  assert.ok(!deps.tldraw, "画布删了，tldraw 还挂在依赖里（1.6 MB）");
});
