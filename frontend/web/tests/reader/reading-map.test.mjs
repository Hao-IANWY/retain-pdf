/** 阅读地图：路径和画布合成一个面板。
 *
 * 起因：这两个原来是 dock 里并列的两个 tab，而它们**在互相解释自己不是对方** ——
 * adapters.ts 写着「同一份数据的两个渲染器」，画布的空状态写着「阅读路径在旁边
 * 那个 tab」。用户看到两个名字，没有依据判断该点哪个。
 *
 * 合并最容易破坏两件事，这里各守一条：
 * - **tldraw 被拽进首屏**（1.6 MB）。合之前它靠「画布是独立面板 + 动态 import」
 *   保证，合之后只剩动态 import 这一道。
 * - **切视图时画布被卸载**。那会让 tldraw 整个重建，闪一下并丢掉平移缩放。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { READER_HOST_PANEL_IDS } from "../../../packages/reader/src/shared/types/reader-assistant-panels.ts";

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const MAP = read("../../src/features/reader/ui/reading-map.tsx");
const CSS = read("../../src/styles/entries/reader.css");

test("两个视图合成一个面板 id", () => {
  assert.ok(READER_HOST_PANEL_IDS.includes("reading-map"));
  assert.ok(!READER_HOST_PANEL_IDS.includes("reading-path"), "旧 id 还在，等于没合");
  assert.ok(!READER_HOST_PANEL_IDS.includes("reading-canvas"), "旧 id 还在，等于没合");
});

test("tldraw 仍然只在切到画布时才加载", () => {
  // 合并最容易破坏的就是这个：把 reading-canvas 的内容直接搬进来、或者顶层
  // import 它的 tldraw 依赖，1.6 MB 就回到首屏了，而且**不会有任何报错**。
  assert.doesNotMatch(MAP, /from "tldraw"/, "阅读地图直接 import 了 tldraw");
  assert.doesNotMatch(MAP, /from "@tldraw\//, "阅读地图直接 import 了 tldraw 的子包");
  // 画布那边的动态 import 还在。
  const canvas = read("../../src/features/reader/ui/reading-canvas.tsx");
  assert.match(canvas, /import\("tldraw"\)/, "画布的动态 import 没了");
});

test("切视图不卸载另一边", () => {
  // 卸载画布 = tldraw 整个重建，闪一下并丢掉用户的平移缩放。
  // 窗口必须够宽、且允许 `"list"` 和 `?` 之间换行：三元写开了就是
  //   view === "list"
  //     ? renderReaderReadingPath(...)
  //     : renderReaderReadingCanvas(...)
  // 原来卡 40 字符又只认空格，这条抓不到任何真实写法（反证时它没变红）。
  assert.doesNotMatch(MAP, /view === "list"\s*\?[\s\S]{0,200}renderReaderReadingCanvas/,
    "用三元在两个视图之间二选一 —— 非当前的会被卸载");
  assert.match(MAP, /data-hidden=\{view !== "list"/);
  assert.match(MAP, /data-hidden=\{view !== "canvas"/);
});

test("藏起来不能用 display:none", () => {
  // tldraw 量到 0 尺寸就画不出来。和终端标签同一个坑。
  const rule = CSS.slice(CSS.indexOf(".reader-reading-map-body[data-hidden]"));
  const body = rule.slice(0, rule.indexOf("}"));
  assert.doesNotMatch(body, /display:\s*none/);
  assert.match(body, /position:\s*absolute/);
  assert.match(body, /width:/);
  assert.match(body, /height:/);
});

test("非当前视图的 open 传 false —— 否则两边都在轮询", () => {
  // 两个视图都留在树上，如果都收到 open=true，就是两条 4 秒轮询同时在跑。
  assert.match(MAP, /open: props\.open && view === "list"/);
  assert.match(MAP, /open: props\.open && view === "canvas"/);
});

test("那两条互相矛盾的注释清掉了", () => {
  // 「同一份数据的两个渲染器」和「阅读路径在旁边那个 tab」—— 合并之后一个是
  // 错的、一个指向不存在的 tab。
  const adapters = read("../../../packages/reader/src/adapters.ts");
  assert.doesNotMatch(adapters, /同一份数据的两个渲染器/);
  const canvas = read("../../src/features/reader/ui/reading-canvas.tsx");
  assert.doesNotMatch(canvas, /阅读路径在旁边那个 tab/);
});
