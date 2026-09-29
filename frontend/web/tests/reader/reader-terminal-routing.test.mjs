/** 输入到底进了哪条终端。
 *
 * 两个症状，同一个根：`sendToActive` 原来是「空函数占位 + onReady 时替换」。
 *
 * 1. **第一次点「问 AI」必然静默丢失**。askSelectedRegion 同一次渲染里设了
 *    pendingInput 又把面板切过来，注入 effect 立刻跑；而 onReady 要等 xterm 的
 *    动态 import（~500KB）落地才执行，那时 sendToActive 还是空函数。更糟的是
 *    sentTokenRef 已经先记上了，同一个 token 不会重试 —— 得再选一次再点一次。
 * 2. **切/关标签后字进了别条终端**。onReady 只在挂载时触发一次，而 activateTab
 *    只改 state 不重挂载，所以 sendToActive 永远指着「最后一次挂载时恰好是当前」
 *    的那条。focusActive 是按 activeId 查的 —— 光标在你看的那条里闪，字去了另
 *    一条，这是最难自查的形态。
 *
 * 现在 session 由面板持有、按 activeId 现查现用。握手期不丢：websocket-session
 * 自己把输入攒进 pendingInput，socket 一开就冲出去。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), "utf8");
const PANEL = read("../../src/features/reader/ui/terminal.tsx");
const WS = read("../../src/features/fx-terminal/domain/websocket-session.ts");

test("握手期的输入被 session 攒住，不是丢掉 —— 这是「不用占位函数」的前提", () => {
  // 没有这条缓冲，按 activeId 现查现用就会把 socket 打开前的字丢掉，
  // 那还不如原来的占位写法。
  assert.match(WS, /pendingInput \+= data/, "session 不缓冲握手期输入");
  assert.match(WS, /pendingInput\s*=\s*""/, "缓冲冲出去之后没清空");
  const open = WS.slice(WS.indexOf("if (pendingInput)"), WS.indexOf("if (pendingInput)") + 240);
  assert.match(open, /socket\.send/, "socket 打开时没把攒住的输入发出去");
});

test("sendToActive 按 activeId 现查现用，不是一个被替换的 ref", () => {
  // 只要它还是 `useRef(() => {})` + 某处赋值，上面两个症状就都还在。
  assert.doesNotMatch(PANEL, /sendToActive\s*=\s*useRef/, "还是可替换的 ref 占位");
  assert.doesNotMatch(PANEL, /sendToActive\.current\s*=/, "还有地方在替换它");
  assert.match(PANEL, /const sendToActive = useCallback/, "不是按调用时求值的");
  const body = PANEL.slice(PANEL.indexOf("const sendToActive = useCallback"),
    PANEL.indexOf("const themeId"));
  assert.match(body, /tabs\.activeId/, "没有按 activeId 查");
  assert.match(body, /sessionFor\(tab\)\.send\(data\)/, "没有直接发给那条 session");
});

test("session 由面板持有并按 tab 缓存 —— 实例自己造就又变成两个对象", () => {
  assert.match(PANEL, /sessionsRef\s*=\s*useRef\(new Map/, "面板没有持有 session");
  // 作用域换了要换 session（连的是另一个 fx 会话），否则切了作用域还在老会话里打字。
  const forFn = PANEL.slice(PANEL.indexOf("const sessionFor = useCallback"),
    PANEL.indexOf("const sendToActive"));
  assert.match(forFn, /cached\.key === key/, "作用域变了不换 session");
  // TerminalInstance 不许自己造。
  const instance = PANEL.slice(PANEL.indexOf("function TerminalInstance"));
  assert.doesNotMatch(instance, /websocketTerminalSession\(/,
    "TerminalInstance 又自己造 session 了 —— 现查现用会拿到另一个对象");
});

test("关掉标签时把它的 session 从表里丢掉", () => {
  const close = PANEL.slice(PANEL.indexOf("onClose={(id) => {"),
    PANEL.indexOf("onClose={(id) => {") + 400);
  assert.match(close, /sessionsRef\.current\.delete\(id\)/, "关了标签 session 还留在表里");
  assert.match(close, /terminalRefs\.current\.delete\(id\)/, "handle 也该一起丢");
});

test("注入仍然不替用户回车、仍然按 token 去重", () => {
  // 改 sendToActive 的实现不能顺手把这两条弄丢。
  const inject = PANEL.slice(PANEL.indexOf("const sentTokenRef"), PANEL.indexOf("const themeId"));
  assert.match(inject, /sendToActive\(pendingInput\.text\)/);
  assert.doesNotMatch(inject, /\\r|\\n/, "注入时带了回车，agent 会直接跑起来");
  assert.match(inject, /sentTokenRef\.current === pendingInput\.token/);
  assert.match(inject, /if \(!open/);
});
