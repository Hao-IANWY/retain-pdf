/** 终端上方的「你可以让它做什么」。
 *
 * 起因：agent 能产出四类东西（阅读路径 / 页面批注 / 概念图 / 画板文件），阅读页
 * 里每一类都有呈现 —— 但**唯一的说明书是 AGENTS.md，而那是写给模型看的**。
 * 用户打开终端只看到 fx 的裸 TUI。两个面板的空状态都指向终端，终端此前指向虚无。
 *
 * 这里守三件事：
 * - **路径和 AGENTS.md 一致**（跨文件对账）。不一致 = 教用户去要一个界面读不到
 *   的文件，而且两边看起来都没错。
 * - **点了不执行**，只把文字打进输入行。直接执行会让它退化成四个功能按钮。
 * - 点完把键盘还给终端，否则焦点留在按钮上，还得再点一下才能回车。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  TERMINAL_SUGGESTIONS,
  TERMINAL_SUGGESTIONS_DISMISSED_KEY,
  readSuggestionsDismissed,
  writeSuggestionsDismissed,
} from "../../src/features/fx-terminal/domain/terminal-suggestions.ts";

const read = (relative) => readFileSync(new URL(relative, import.meta.url), "utf8");

test("提示覆盖 agent 的四类产出，落点各不重复", () => {
  // 五条不是四条：画板那类给了两条。「画张图」和「排一份文档」在用户那边是两个
  // 不同的请求，而后者是猜不到的 —— 一个终端旁边的 AI 能交出一份带标题和表格的
  // 中文 PDF，不写出来没人会去要。
  assert.equal(TERMINAL_SUGGESTIONS.length, 5);
  const paths = TERMINAL_SUGGESTIONS.map((s) => s.path);
  assert.equal(new Set(paths).size, 5, `路径重复: ${paths}`);
  for (const suggestion of TERMINAL_SUGGESTIONS) {
    assert.ok(suggestion.label.length > 0 && suggestion.label.length <= 8,
      `标签要短才放得下: ${suggestion.label}`);
    // 提示里必须出现落点，否则模型不知道往哪写。
    assert.ok(suggestion.prompt.includes(suggestion.path.replace(/\/$/, "")),
      `提示里没提到落点 ${suggestion.path}: ${suggestion.prompt}`);
  }
});

test("路径和 AGENTS.md 一致 —— 跨文件对账", () => {
  // 不一致的表现：用户照 chip 点了，agent 老老实实写进去，界面什么都不显示。
  // 而 chip 和 AGENTS.md 分处 TS 和 Python，两边看起来都没错。
  const workspace = read("../../../../backend/ai/retainpdf_ai/fx_workspace.py");
  for (const { path } of TERMINAL_SUGGESTIONS) {
    assert.ok(workspace.includes(path), `AGENTS.md 里没有 ${path}`);
  }
});

test("提示里只有自然语言，不掺格式说明", () => {
  // schema / 字段名 / 后缀白名单留在 AGENTS.md —— 那份是唯一被实测验证有效的
  // 约束（fx 引用它拒绝写 ../）。这里掺一份就有两份要同步。
  for (const { prompt } of TERMINAL_SUGGESTIONS) {
    assert.doesNotMatch(prompt, /schema|block_id|page_idx|\{|\}/,
      `提示里混进了格式说明: ${prompt}`);
    assert.ok(prompt.length <= 40, `提示太长，输入行里看不全: ${prompt}`);
  }
});

test("点了不执行 —— 只打字，不回车", () => {
  // 带 \r 就变成四个功能按钮了，而这个产品的方向是用自然语言代替按钮。
  const panel = read("../../src/features/reader/ui/terminal.tsx");
  const block = panel.slice(panel.indexOf("function TerminalSuggestions"));
  assert.match(block, /session\.send\(suggestion\.prompt\)/);
  assert.doesNotMatch(block, /send\([^)]*\\r/, "提示被直接执行了");
  assert.doesNotMatch(block, /send\([^)]*\\n/, "提示被直接执行了");
});

test("点完把键盘还给终端", () => {
  const panel = read("../../src/features/reader/ui/terminal.tsx");
  const block = panel.slice(panel.indexOf("function TerminalSuggestions"));
  assert.match(block, /focusTerminal\(\)/, "焦点留在按钮上，用户还得再点一下终端");
  // FxTerminal 那边要真的把 focus 把手交出来。
  const term = read("../../src/features/fx-terminal/ui/FxTerminal.tsx");
  assert.match(term, /onReadyRef\.current\?\.\(\{ focus:/);
  assert.match(term, /focus\(\): void;/, "TerminalHandle 上没有 focus");
});

test("onReady 用 ref 转发，不进 effect 依赖", () => {
  // 进了依赖数组的话，父组件每次渲染都会把 WebSocket 和 PTY 拆了重建 ——
  // 也就是把 fx 会话杀掉。
  const term = read("../../src/features/fx-terminal/ui/FxTerminal.tsx");
  assert.match(term, /const onReadyRef = useRef\(onReady\)/);
  assert.match(term, /\}, \[session\]\);/, "终端的 effect 依赖被改了");
});

test("用过一次就收起来，且读写 localStorage 不会抛", () => {
  const map = new Map();
  const ok = { getItem: (k) => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) };
  assert.equal(readSuggestionsDismissed(ok), false);
  writeSuggestionsDismissed(ok);
  assert.equal(readSuggestionsDismissed(ok), true);
  assert.equal(map.get(TERMINAL_SUGGESTIONS_DISMISSED_KEY), "1");

  // 隐私模式下 localStorage 会抛 —— 多显示一次比整个面板崩了好。
  const boom = {
    getItem() { throw new Error("blocked"); },
    setItem() { throw new Error("blocked"); },
  };
  assert.equal(readSuggestionsDismissed(boom), false);
  assert.doesNotThrow(() => writeSuggestionsDismissed(boom));
});

test("提示行会换行，不会把终端挤窄", () => {
  // dock 可以拖到 30vw，四个 chip 一行放不下。
  const css = read("../../src/styles/entries/reader.css");
  const block = css.slice(css.indexOf(".reader-terminal-suggestions {"));
  assert.match(block.slice(0, 300), /flex-wrap:\s*wrap/);
});
