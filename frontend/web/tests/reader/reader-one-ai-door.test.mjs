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

import {
  READER_ASSISTANT_PANEL_IDS,
  READER_HOST_PANEL_IDS,
} from "../../../packages/reader/src/shared/types/reader-assistant-panels.ts";
import { READER_HOST_PANELS }
  from "../../../packages/reader/src/components/react-pdf/reader-host-panels.ts";
import { readerSelectionPrompt }
  from "../../../packages/reader/src/shared/data/reader-regions.ts";

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), "utf8");
const APP = read("../../../packages/reader/src/ReaderAppReactPdf.tsx");
const TERMINAL = read("../../src/features/reader/ui/terminal.tsx");

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

const rect = { top: 0, left: 0, width: 1, height: 1 };

test("文本选区变成带页码的引用", () => {
  assert.equal(
    readerSelectionPrompt({ selectionType: "text", quote: "线搜索方法", page: 3, pane: "source", rect }),
    "关于第 3 页这段：「线搜索方法」",
  );
});

test("区域选区取的是用户选的那一栏 —— 从译文栏选公式不能塞原文进去", () => {
  const region = {
    itemId: "i1",
    source: { page: 2, bbox: [0, 0, 1, 1], unit: "pdf_point", origin: "top_left", text: "x squared" },
    translated: { page: 2, bbox: [0, 0, 1, 1], unit: "pdf_point", origin: "top_left", text: "x 的平方" },
    markdown: "$x^2$", regionType: "formula", status: "ok", assetIds: [], assetUrls: [],
  };
  const base = { selectionType: "region", region, kind: "formula", page: 2, rect };
  assert.equal(readerSelectionPrompt({ ...base, pane: "translated" }), "关于第 2 页的公式：「x 的平方」");
  assert.equal(readerSelectionPrompt({ ...base, pane: "source" }), "关于第 2 页的公式：「x squared」");
});

test("取不到文字就返回空串，不编一句话出来", () => {
  assert.equal(readerSelectionPrompt({ selectionType: "text", quote: "   ", page: 1, pane: "source", rect }), "");
  const empty = {
    itemId: "i2",
    source: { page: 1, bbox: [0, 0, 1, 1], unit: "pdf_point", origin: "top_left", text: "" },
    translated: { page: 1, bbox: [0, 0, 1, 1], unit: "pdf_point", origin: "top_left", text: "" },
    markdown: "", regionType: "figure", status: "ok", assetIds: [], assetUrls: [],
  };
  assert.equal(
    readerSelectionPrompt({ selectionType: "region", region: empty, kind: "figure", page: 1, pane: "source", rect }),
    "",
  );
});

test("选区问 AI 开的是终端，且用 token 而不是文本判重", () => {
  // 连着两次选同一段，两次都该送进去。拿文本判重第二次会被静默吞掉。
  assert.match(APP, /setAssistantPanel\("terminal"\)/, "选区问 AI 没开终端");
  assert.match(APP, /token: \(prev\?\.token \?\? 0\) \+ 1/, "没用自增 token");
});

test("注入不替用户回车", () => {
  // 由页面选区拼出来的一条命令直接开跑太意外了。
  const inject = TERMINAL.slice(TERMINAL.indexOf("sentTokenRef"), TERMINAL.indexOf("const themeId"));
  assert.match(inject, /sendToActive\.current\(pendingInput\.text\)/, "宿主没把选区送进终端");
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
