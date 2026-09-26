/** 顶栏上两组长得一样的东西。
 *
 * 用户报的原话是「这几个我发现有多余的」。查下来不是功能重复，是**两组不同的
 * 东西穿了同一身衣服**：
 *
 *   中间（ReaderWorkspaceTabs）  FileText 源文件 · Columns2 对照 · Languages 翻译文件  切视图
 *   右上（ReaderDownloadActions）FileText 原文   · Columns2 对照 · Languages 译文      下载文件
 *
 * 同一套 lucide 图标各出现一次，两组都写着「对照」，挨在一条栏上。
 *
 * 外加一个永久噪音：任务进终态后 pagesByPage 不清空，顶栏那个
 * 「实时译文 · 已完成」pill 就在每篇读完的文档上永久挂着。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { resolveLiveTranslationToggles }
  from "../../../packages/reader/src/shared/data/live-translation-state.ts";

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const DOWNLOADS = read("../../../packages/reader/src/components/react-pdf/ReaderDownloadActions.tsx");
const CHROME = read("../../../packages/reader/styles/chrome.css");
const APP = read("../../../packages/reader/src/ReaderAppReactPdf.tsx");

test("下载组有自己的组标识，不再和模式页签共用一身图标", () => {
  assert.match(DOWNLOADS, /reader-download-actions-prefix/,
    "下载组没有组前缀 —— 它和中间的模式页签用同一套图标、同样的词");
  assert.match(DOWNLOADS, /\bDownload\b/, "前缀不是下载语义的图标");
  assert.match(CHROME, /\.reader-download-actions-prefix\s*\{/,
    "前缀没样式 —— 会挤在第一个按钮上看不出是组标识");
});

test("前缀和各按钮的图标在窄屏都不能被裁掉", () => {
  // 900 断点只裁文字标签。裁掉图标 = 三个下载按钮长得一模一样；
  // 裁掉前缀 = 窄屏又回到「两组图标撞脸」。
  const at900 = CHROME.slice(CHROME.indexOf("@media (max-width: 900px)"));
  const block = at900.slice(0, at900.indexOf("\n}\n\n"));
  assert.match(block, /\.reader-download-action-label/, "断点里没在裁文字标签，前提变了");
  assert.doesNotMatch(block, /\.reader-download-actions-prefix/, "窄屏把组前缀裁了");
  assert.doesNotMatch(block, /display:\s*none/, "窄屏用 display:none 藏了整块");
});

test("每一路仍然有自己的图标 —— 窄屏只剩图标时要分得出来", () => {
  // 只查「文件里出现 FileText」是假的 —— import 行就满足了，图标从按钮上删掉
  // 也照样绿。查 ICONS 这张表本身，外加按钮里确实渲染了它。
  const icons = DOWNLOADS.slice(DOWNLOADS.indexOf("const ICONS"), DOWNLOADS.indexOf("const SHORT"));
  assert.ok(icons.length > 0 && icons.length < 400, "ICONS 表没找到");
  for (const icon of ["FileText", "Columns2", "Languages"]) {
    assert.match(icons, new RegExp(`\\b${icon}\\b`), `${icon} 不在 ICONS 表里`);
  }
  assert.match(DOWNLOADS, /<Icon\s/, "按钮里没渲染图标 —— 窄屏三个按钮一模一样");
});

test("任务终态后顶栏 pill 不再渲染", () => {
  const live = resolveLiveTranslationToggles({
    hasOverlayContent: true, connection: "terminal", showSource: true,
  });
  assert.equal(live.topBarPill, false, "读完的文档顶栏还永久挂着「实时译文 · 已完成」");
});

test("翻译进行中 pill 还在 —— 它报的是进度", () => {
  for (const connection of ["live", "reconnecting", "connecting"]) {
    const live = resolveLiveTranslationToggles({
      hasOverlayContent: true, connection, showSource: true,
    });
    assert.equal(live.topBarPill, true, `${connection} 时 pill 不见了，进度没地方看`);
  }
});

test("叠层画得出来，就一定至少有一个开关够得着", () => {
  // 这是收掉顶栏 pill 的**全部前提**。穷举三个输入。
  const connections = ["idle", "connecting", "live", "reconnecting", "terminal", "unavailable"];
  for (const hasOverlayContent of [true, false]) {
    for (const connection of connections) {
      for (const showSource of [true, false]) {
        const live = resolveLiveTranslationToggles({ hasOverlayContent, connection, showSource });
        if (!live.overlayRenderable) continue;
        assert.ok(live.topBarPill || live.sourcePaneToggle,
          `叠层能画出来却没有任何开关：${JSON.stringify({ hasOverlayContent, connection, showSource })}`);
      }
    }
  }
});

test("两个开关都真的接在这个函数上 —— 否则上面那条守的是没人调的代码", () => {
  assert.match(APP, /resolveLiveTranslationToggles\(/, "组件没调这个函数");
  assert.match(APP, /liveToggles\.topBarPill/, "顶栏 pill 没走 liveToggles");
  assert.match(APP, /liveToggles\.sourcePaneToggle/, "源文栏开关没走 liveToggles");
  // 旧的自己拼条件的写法不能留着，留着就是两套真源。
  assert.doesNotMatch(APP, /!hasOverlayContent \|\| !paneComposition\.showSource/,
    "源文栏开关还在自己拼条件");
});
