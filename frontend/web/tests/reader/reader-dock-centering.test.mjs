/** dock 打开时，「居中」得按 PDF 栏算，不是按视口。
 *
 * 起因：`.reader-react-error` 和 `.reader-error-notice` 用 `left: 50%` +
 * `translateX(-50%)`。AI dock 打开后视口右半边是面板，50% 正好落在分栏线上 ——
 * 提示一半画在 PDF 上、一半画在面板上，而这两条偏偏是最需要读清楚的文案。
 * `.reader-react-hud` 是当时唯一做对的（走 --reader-ai-split-width）。
 *
 * 断言方式：把 CSS 里的 `left` 表达式**算出像素值**再比中心点，不是去匹配某个
 * 字符串。换写法（改成 right、改成 margin-left、换个等价 calc）只要中心点对了
 * 就该绿；中心点错了必须红。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  clampSelectionToolbarLeft,
  TOOLBAR_HALF,
} from "../../../../frontend/packages/reader/src/components/react-pdf/ReaderSelectionToolbar.tsx";

const READER_STYLES = fileURLToPath(
  new URL("../../../../frontend/packages/reader/styles/", import.meta.url),
);

const read = (name) =>
  readFileSync(new URL(name, `file://${READER_STYLES}`), "utf8").replace(
    /\/\*[\s\S]*?\*\//g,
    "",
  );

const VIEWPORT = 1000;
const SPLIT = 400;
const COLUMN = VIEWPORT - SPLIT;

/** 顶层规则（不含 @media 内部）。 */
function topLevelRules(css) {
  const rules = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < css.length; i += 1) {
    const ch = css[i];
    if (ch === "{") {
      if (depth === 0) {
        const prelude = css.slice(start, i).trim();
        rules.push({ prelude, bodyStart: i + 1, atRule: prelude.startsWith("@") });
      }
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        const rule = rules[rules.length - 1];
        rule.body = css.slice(rule.bodyStart, i);
        start = i + 1;
      }
    }
  }
  return rules.filter((rule) => !rule.atRule && rule.body !== undefined);
}

function declaration(files, selector, property) {
  let found = null;
  for (const file of files) {
    for (const rule of topLevelRules(read(file))) {
      const selectors = rule.prelude.split(",").map((part) => part.trim());
      if (!selectors.includes(selector)) continue;
      const hits = [...rule.body.matchAll(new RegExp(`${property}\\s*:\\s*([^;]+);`, "g"))];
      if (hits.length > 0) found = hits[hits.length - 1][1].trim();
    }
  }
  return found;
}

/** 把 CSS 长度表达式算成像素。position: fixed 的百分比按视口算。 */
function px(expression) {
  let expr = expression
    .replace(/calc\(/g, "(")
    .replace(/var\(--reader-ai-split-width\)/g, String(SPLIT))
    .replace(/(\d+(?:\.\d+)?)dvw/g, (_, n) => String((VIEWPORT * Number(n)) / 100))
    .replace(/(\d+(?:\.\d+)?)vw/g, (_, n) => String((VIEWPORT * Number(n)) / 100))
    .replace(/(\d+(?:\.\d+)?)%/g, (_, n) => String((VIEWPORT * Number(n)) / 100))
    .replace(/(\d+(?:\.\d+)?)px/g, "$1")
    .replace(/\bmin\(/g, "Math.min(")
    .replace(/\bmax\(/g, "Math.max(");
  expr = expr.trim();
  // 只放行算术 + min/max：别的写法宁可让测试炸掉，也不要悄悄算出个假数。
  const guard = expr.replace(/Math\.(?:min|max)/g, "");
  assert.match(guard, /^[-+*/(),0-9.\s]+$/, `算不动的表达式: ${expression}`);
  return Function(`"use strict"; return (${expr});`)();
}

const CHROME_FILES = ["react-pdf.css", "hud.css", "chrome.css", "assistant-dock.css"];
const DOCK_ONLY = ["assistant-dock.css"];

/** 这三条都是 fixed + translateX(-50%)，所以 left 就是中心点。 */
const CENTERED = [
  ".reader-react-error",
  ".reader-error-notice",
  ".reader-react-hud",
];

test("三条浮动 chrome 都靠 translateX(-50%) 居中 —— 下面按中心点比才成立", () => {
  for (const selector of CENTERED) {
    const transform = declaration(CHROME_FILES, selector, "transform");
    assert.ok(transform, `${selector} 没有 transform`);
    assert.match(transform, /translateX\(-50%\)/, `${selector}: ${transform}`);
  }
});

test("dock 关着的时候居中在视口", () => {
  for (const selector of CENTERED) {
    const left = declaration(CHROME_FILES.filter((f) => f !== "assistant-dock.css"), selector, "left");
    assert.ok(left, `${selector} 没有 left`);
    assert.equal(px(left), VIEWPORT / 2, `${selector} 的基础规则不在视口中间`);
  }
});

test("dock 打开的时候居中在 PDF 栏，而不是分栏线上", () => {
  for (const selector of CENTERED) {
    const left = declaration(DOCK_ONLY, `.reader-react-root.is-assistant-open ${selector}`, "left");
    assert.ok(left, `${selector} 在 is-assistant-open 下没有重新定位 —— 中心会落在分栏线上`);
    // 500 = 分栏线；300 = PDF 栏中心。
    assert.equal(px(left), COLUMN / 2, `${selector} 的中心是 ${px(left)}，PDF 栏中心是 ${COLUMN / 2}`);
  }
});

test("两条错误提示的宽度也收进 PDF 栏 —— 栏最窄 35vw，居中了照样溢出", () => {
  for (const selector of [".reader-react-error", ".reader-error-notice"]) {
    const maxWidth = declaration(
      DOCK_ONLY,
      `.reader-react-root.is-assistant-open ${selector}`,
      "max-width",
    );
    assert.ok(maxWidth, `${selector} 在 is-assistant-open 下没有收窄`);
    // 栏宽 600，两边各留 16 → 568；算出来不能超过这个数。
    const fitted = px(maxWidth);
    assert.ok(
      fitted <= COLUMN - 32,
      `${selector}: 算出来 ${fitted}，超出 PDF 栏可用宽度 ${COLUMN - 32}`,
    );
  }
});

// ------------------------------------------------- 选区浮条（TSX 里的纯逻辑）

test("选区浮条夹在 PDF 栏里，不是 window.innerWidth 里", () => {
  // 选区在 PDF 栏最右边：按视口夹的话，工具条会被允许画到分栏线右边（面板上）。
  // 半宽从实现里取：这条守的是「按栏夹还是按视口夹」，不是浮条到底多宽。
  // 抄一份数字在这里，只会让「加了一个动作」变成改门禁。
  const atRightEdge = clampSelectionToolbarLeft(COLUMN - 5, COLUMN);
  assert.ok(
    atRightEdge + TOOLBAR_HALF <= COLUMN,
    `工具条右边缘 ${atRightEdge + TOOLBAR_HALF} 越过了 PDF 栏 ${COLUMN}`,
  );
  assert.equal(atRightEdge, COLUMN - 16 - TOOLBAR_HALF);

  // 左边照旧留出 gutter。
  assert.equal(clampSelectionToolbarLeft(0, COLUMN), 16 + TOOLBAR_HALF);
  // 中间的选区不动。
  assert.equal(clampSelectionToolbarLeft(300, COLUMN), 300);
});

test("栏比工具条还窄时取栏中心，不会被甩到栏外", () => {
  // min > max，Math.min(Math.max(...)) 的先后顺序会赢出一个栏外的值。
  const narrow = 200;
  const left = clampSelectionToolbarLeft(190, narrow);
  assert.equal(left, narrow / 2);
  assert.ok(left > 0 && left < narrow, `${left} 落在 0..${narrow} 之外`);
});

test("浮条真的按量出来的 PDF 栏定位，不是按 window.innerWidth", async () => {
  // 纯函数测对了还不够：调用点传错宽度的话，上面两条照样绿（真实发生过 ——
  // 把 readerColumnWidth() 换成 window.innerWidth，clamp 的测试一条没红）。
  const { JSDOM } = await import("jsdom");
  const { act, createElement } = await import("react");
  const { createRoot } = await import("react-dom/client");
  const dom = new JSDOM(
    "<!doctype html><html><body><div class='reader-react-scroll-shell'></div><div id='root'></div></body></html>",
    { url: "http://localhost/reader.html", pretendToBeVisual: true },
  );
  const keys = ["window", "document", "Element", "HTMLElement", "Node", "Event", "MouseEvent", "MutationObserver", "navigator"];
  const previous = Object.fromEntries(keys.map((k) => [k, globalThis[k]]));
  for (const key of keys) {
    Object.defineProperty(globalThis, key, { value: dom.window[key], writable: true, configurable: true });
  }
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  // jsdom 不排版，所以手动给滚动壳一个宽度：dock 开着时它只有 PDF 栏那么宽。
  const shell = dom.window.document.querySelector(".reader-react-scroll-shell");
  shell.getBoundingClientRect = () => ({ left: 0, right: COLUMN, width: COLUMN, top: 0, bottom: 800, height: 800 });
  Object.defineProperty(dom.window, "innerWidth", { value: VIEWPORT, configurable: true });

  try {
    const { ReaderSelectionToolbar } = await import(
      "../../../../frontend/packages/reader/src/components/react-pdf/ReaderSelectionToolbar.tsx"
    );
    const host = dom.window.document.getElementById("root");
    const root = createRoot(host);
    await act(async () => {
      root.render(createElement(ReaderSelectionToolbar, {
        selection: {
          selectionType: "text",
          quote: "一段被选中的正文",
          page: 3,
          pane: "source",
          // 选区贴着 PDF 栏右缘。
          rect: { left: COLUMN - 20, top: 300, width: 10, height: 14 },
        },
        onDismiss: () => {},
      }));
    });
    const pop = host.querySelector(".reader-sel-pop");
    assert.ok(pop, "浮条没渲染出来");
    const left = Number.parseFloat(pop.style.left);
    // 按视口夹的话这里会落在分栏线右边，糊在 AI 面板上。
    assert.equal(left, COLUMN - 16 - TOOLBAR_HALF);
    assert.ok(left + TOOLBAR_HALF < VIEWPORT - SPLIT + 1, "浮条右缘越过了分栏线");
    await act(async () => { root.unmount(); });
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      Object.defineProperty(globalThis, key, { value, writable: true, configurable: true });
    }
    delete globalThis.IS_REACT_ACT_ENVIRONMENT;
  }
});
