/** 点一条 chip，界面上**只有那一条**消失。
 *
 * 为什么单独渲染一遍而不是对 tsx 做正则：原来的缺陷不在文案里，在
 * `onClick` 调的是哪个函数。`dismiss()` 和 `dismissSuggestion(…)` 长得差不多，
 * 正则守不住；而这一条错了，用户点一次就永久失去另外四条能力的唯一说明。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { JSDOM } from "jsdom";

import { TERMINAL_SUGGESTIONS } from "../../src/features/fx-terminal/domain/terminal-suggestions.ts";

function installDom() {
  const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
    url: "http://localhost/reader.html?job_id=job-suggestions",
    pretendToBeVisual: true,
  });
  const keys = [
    "window", "document", "localStorage", "location",
    "Element", "HTMLElement", "Node", "Event", "MouseEvent", "MutationObserver",
  ];
  const previous = Object.fromEntries(keys.map((key) => [key, globalThis[key]]));
  for (const key of keys) {
    Object.defineProperty(globalThis, key, {
      value: dom.window[key], writable: true, configurable: true,
    });
  }
  globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  return {
    dom,
    restore() {
      for (const [key, value] of Object.entries(previous)) {
        Object.defineProperty(globalThis, key, { value, writable: true, configurable: true });
      }
      delete globalThis.IS_REACT_ACT_ENVIRONMENT;
    },
  };
}

const chipLabels = (host) =>
  [...host.querySelectorAll(".reader-terminal-suggestion")].map((el) => el.textContent);

test("点一条 chip：只有那一条从 DOM 里消失，其余仍然在", async () => {
  const env = installDom();
  try {
    const { TerminalSuggestions } = await import(
      "../../src/features/reader/ui/terminal-chrome.tsx"
    );
    const host = env.dom.window.document.getElementById("root");
    const root = createRoot(host);
    const sent = [];
    const focused = [];
    await act(async () => {
      root.render(createElement(TerminalSuggestions, {
        session: { send: (data) => sent.push(data) },
        focusTerminal: () => focused.push(1),
      }));
    });

    assert.deepEqual(chipLabels(host), TERMINAL_SUGGESTIONS.map((s) => s.label));

    const target = TERMINAL_SUGGESTIONS[1];
    const button = [...host.querySelectorAll(".reader-terminal-suggestion")]
      .find((el) => el.textContent === target.label);
    await act(async () => {
      button.dispatchEvent(new env.dom.window.MouseEvent("click", { bubbles: true }));
    });

    assert.deepEqual(sent, [target.prompt], "提示没打进输入行");
    assert.equal(focused.length, 1, "焦点没还给终端");
    const left = chipLabels(host);
    assert.ok(!left.includes(target.label), "点过的那条还在");
    assert.equal(
      left.length,
      TERMINAL_SUGGESTIONS.length - 1,
      `点一条没了 ${TERMINAL_SUGGESTIONS.length - left.length} 条`,
    );

    // 重新挂载：已经点过的不回来，没点过的还在。
    await act(async () => { root.unmount(); });
    const again = createRoot(host);
    await act(async () => {
      again.render(createElement(TerminalSuggestions, {
        session: { send: () => {} }, focusTerminal: () => {},
      }));
    });
    assert.deepEqual(chipLabels(host), left);
    await act(async () => { again.unmount(); });
  } finally {
    env.restore();
  }
});

test("× 一次全收，整排消失", async () => {
  const env = installDom();
  try {
    const { TerminalSuggestions } = await import(
      "../../src/features/reader/ui/terminal-chrome.tsx"
    );
    const host = env.dom.window.document.getElementById("root");
    const root = createRoot(host);
    await act(async () => {
      root.render(createElement(TerminalSuggestions, {
        session: { send: () => {} }, focusTerminal: () => {},
      }));
    });
    // 先断言「在」，否则下面那条「不在」在任何情况下都绿。
    assert.equal(chipLabels(host).length, TERMINAL_SUGGESTIONS.length);
    const close = host.querySelector(".reader-terminal-suggestions-close");
    assert.ok(close, "× 按钮不见了");
    await act(async () => {
      close.dispatchEvent(new env.dom.window.MouseEvent("click", { bubbles: true }));
    });
    assert.equal(host.querySelector(".reader-terminal-suggestions"), null, "整排没收掉");
    await act(async () => { root.unmount(); });
  } finally {
    env.restore();
  }
});
