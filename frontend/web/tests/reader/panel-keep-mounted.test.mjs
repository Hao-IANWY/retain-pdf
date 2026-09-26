/** keepMounted 的面板切走 tab 时不能被卸载。
 *
 * ## 这个 bug 长什么样
 *
 * 用户报的是「从终端切换到画板会暂停对话」。实际是**整条链断在中间**：
 *
 *     keepMounted: true  →  ReaderHostPanelShell 留在树上        ✓
 *                        →  但传 open={false} 给 ReaderPanelShell
 *                        →  ReaderPanelShell 里 `if (!open) return null`  ✗
 *                        →  FxTerminal 卸载 → WebSocket 关 → PTY 被杀
 *
 * 也就是说 `keepMounted` 只让**壳组件**留在树上，壳内部又把子树整个摘了 ——
 * 终端里 `hidden={!open}` 那行和「卸载会杀掉 PTY」的注释根本没机会生效，
 * 这个字段一直是个摆设。
 *
 * 表现之所以是「暂停」而不是「消失」，是因为会话恢复会在切回来时把历史拉回来，
 * 但**正在生成的那一轮回答丢了**。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { READER_HOST_PANELS } from "../../../packages/reader/src/components/react-pdf/reader-host-panels.ts";

const PKG = new URL("../../../packages/reader/src/", import.meta.url);
const read = (relative) => readFileSync(new URL(relative, PKG), "utf8");

test("壳不再无条件卸载 —— keepMounted 的面板关着也留在树上", () => {
  const shell = read("components/react-pdf/ReaderPanelShell.tsx");
  assert.match(shell, /if \(!open && !keepMounted\) return null;/);
  // 无条件那行必须消失，否则里层照样推翻外层。
  assert.doesNotMatch(shell, /\n\s*if \(!open\) return null;/);
});

test("keepMounted 真的从注册表传到了壳", () => {
  // 断在中间就是这个 bug：上游声明了，下游收不到。
  const host = read("components/react-pdf/ReaderHostPanelShell.tsx");
  assert.match(host, /keepMounted=\{panel\.keepMounted\}/);
});

test("隐藏不能用 display:none —— xterm 会把 0 尺寸容器算成 1 行", () => {
  // 切回来那段输出全挤在一行里。挪到视口外是唯一既看不见又保住布局的做法。
  const shell = read("components/react-pdf/ReaderPanelShell.tsx");
  assert.match(shell, /data-hidden=\{!open \? "" : undefined\}/);
  const css = read("../styles/react-pdf.css");
  const block = css.slice(css.indexOf(".reader-notes-panel[data-hidden]"));
  assert.ok(block, "CSS 里没有 [data-hidden] 规则，面板会照常显示");
  const rule = block.slice(0, 200);
  assert.match(rule, /position:\s*absolute/);
  assert.match(rule, /left:\s*-\d+vw/);
  assert.doesNotMatch(rule, /display:\s*none/, "display:none 会让 xterm 算成 1 行");
  assert.doesNotMatch(rule, /visibility:\s*hidden/, "visibility:hidden 同样丢尺寸");
});

test("藏起来的面板不参与 Tab、不被读屏念出来", () => {
  const shell = read("components/react-pdf/ReaderPanelShell.tsx");
  assert.match(shell, /inert=\{!open \? true : undefined\}/);
  assert.match(shell, /aria-hidden=\{!open \? true : undefined\}/);
});

test("两个宿主面板都是 keepMounted 的，各有各的理由", () => {
  // 只在「卸载会丢掉不可重建的状态」时才开：终端 = 杀 PTY，阅读地图 = 里面
  // 的画布会让 tldraw 整个重建（闪一下，且丢掉平移缩放）。
  //
  // 阅读地图的列表那半本来不需要常驻，但它很轻 —— 不值得为它把一个面板拆成
  // 两种生命周期，那正是合并之前的样子。
  const by = Object.fromEntries(READER_HOST_PANELS.map((p) => [p.id, p.keepMounted]));
  assert.equal(by.terminal, true, "终端被卸载 = 杀掉 fx 会话");
  assert.equal(by["reading-map"], true, "画布被卸载 = tldraw 整个重建，会闪");
  assert.equal(Object.keys(by).length, 2, "宿主面板数变了，这条断言要跟着看一遍");
});

test("终端自己那层的 hidden 仍在 —— 两层配合，不是二选一", () => {
  // 壳负责「留在树上」，内容负责「不显示」。少一层都不行：
  // 只有壳 → 面板叠在画布上；只有内容 → 壳先把它摘了，内容没机会生效。
  const panel = readFileSync(
    new URL("../../src/features/reader/ui/terminal.tsx", import.meta.url), "utf8");
  assert.match(panel, /hidden=\{!open\}/);
});
