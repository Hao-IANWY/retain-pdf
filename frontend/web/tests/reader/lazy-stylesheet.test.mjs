/** 画布样式按需加载。
 *
 * 起因：画布的 JS 是动态 import 的（tldraw 1.6 MB），但它的 CSS 跟着 reader.css
 * 一起渲染阻塞地下载 —— **懒加载只做了一半**。tldraw.css 压完 75 KB，占 reader.css
 * 的 19%，而画布是多数阅读会话都不会打开的面板。
 *
 * 这里守两类东西：
 * - href 推导的正确性（写死路径会在非根路径下算错、且丢掉缓存戳）
 * - **这次优化不回退**：tldraw 不许再被 import 回 reader.css
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  READER_CANVAS_STYLESHEET,
  resolveLazyStylesheetHref,
} from "../../src/features/reader/domain/lazy-stylesheet.ts";

const read = (relative) => readFileSync(new URL(relative, import.meta.url), "utf8");

function links(...hrefs) {
  return hrefs.map((href) => ({ getAttribute: (name) => (name === "href" ? href : null) }));
}

test("href 从页面已有的 reader.css 上推出来，路径和缓存戳一起继承", () => {
  // 写死 "./dist/css/reader-canvas.css" 会有两个问题：页面不在根路径时相对路径
  // 算错，以及没有缓存戳、改了样式浏览器还用旧的。
  assert.equal(
    resolveLazyStylesheetHref(
      links("./vendor/x.css", "./dist/css/reader.css?v=0bc10b53f6"),
      READER_CANVAS_STYLESHEET,
    ),
    "./dist/css/reader-canvas.css?v=0bc10b53f6",
  );
});

test("页面部署在子路径下也对", () => {
  assert.equal(
    resolveLazyStylesheetHref(
      links("/app/retainpdf/dist/css/reader.css?v=abc"),
      READER_CANVAS_STYLESHEET,
    ),
    "/app/retainpdf/dist/css/reader-canvas.css?v=abc",
  );
});

test("找不到 sibling 就用兜底路径，而不是拼出一个坏 URL", () => {
  assert.equal(
    resolveLazyStylesheetHref(links("./dist/css/home.css"), READER_CANVAS_STYLESHEET),
    READER_CANVAS_STYLESHEET.fallbackHref,
  );
  assert.equal(
    resolveLazyStylesheetHref([], READER_CANVAS_STYLESHEET),
    READER_CANVAS_STYLESHEET.fallbackHref,
  );
});

// ---------------------------------------------------------------- 防回退

test("tldraw 的样式不在 reader.css 里 —— 这次优化不能被无意撤销", () => {
  // 把 @import "tldraw/tldraw.css" 加回 reader.css，75 KB 就又回到渲染阻塞链上，
  // 而且**没有任何报错**，只是每次打开阅读页都慢一点。
  const readerCss = read("../../src/styles/entries/reader.css");
  assert.doesNotMatch(readerCss, /@import\s+"tldraw/, "tldraw 的样式回到 reader.css 了");
  const canvasCss = read("../../src/styles/entries/reader-canvas.css");
  assert.match(canvasCss, /@import\s+"tldraw\/tldraw\.css"/, "画布那张表里没有 tldraw");
});

test("画布样式是独立构建产物，不然注入的 link 会 404", () => {
  const build = read("../../scripts/build-css.mjs");
  assert.match(build, /entries\/reader-canvas\.css.*dist\/css\/reader-canvas\.css/s);
});

test("样式和组件并行加载，但都等到齐再渲染", () => {
  // 先渲染再上样式会闪一下无样式的画布；串行加载则白等一个来回。
  const panel = read("../../src/features/reader/ui/reading-canvas.tsx");
  const block = panel.slice(panel.indexOf("const [mod, setMod]"), panel.indexOf("if (loadFailed)"));
  assert.match(block, /Promise\.all\(\[\s*import\("tldraw"\),\s*ensureLazyStylesheet/);
});

test("xterm 的样式故意留在 reader.css 里", () => {
  // 只有 6 KB，为这点体积再建一套机制不划算。写成断言是为了让下一个人看到这是
  // 权衡而不是遗漏。
  const readerCss = read("../../src/styles/entries/reader.css");
  assert.match(readerCss, /@import\s+"@xterm\/xterm\/css\/xterm\.css"/);
});
