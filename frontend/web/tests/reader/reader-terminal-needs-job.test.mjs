/** 没有任务的阅读页里，那扇 AI 门要说清为什么不能用。
 *
 * # 起因：四处同时静默失败
 *
 * 书架卡片在没有 job_id 时跳 `reader.html?document_id=…`
 * （`recent-job-card-presenter.ts` 的 buildReaderUrl）—— 上传了但还没 OCR/翻译的书，
 * 点「阅读」走的就是这条。而 hostPanelContext 原来给的是
 * `session.jobId || session.documentId || "reader"`，于是一个 document id 被当成
 * job id 用：
 *
 *   - fx 侧 `resolve_job_workspace` 找不到 `data/jobs/<documentId>` → 退回私有目录，
 *     终端开起来了但 `books/` 是空的，**没有任何报错**
 *     （这个失败形状 terminal-scope.ts 的注释里早就写着）
 *   - 产物条每 4 秒打 `/api/v1/jobs/<documentId>/board` → load_job_or_404 → 404
 *     → `if (!response.ok) return;` 静默跳过
 *   - 左边那块 `renderReaderBoard` 看 `!props.jobId` → 静默返回 null
 *   - 终端面板零门控，所以这个空壳照常出现
 *
 * 顺带澄清一个**不成立**的说法：曾有「产物条有东西但点了左边不出现」的推断 ——
 * 不可能，404 时产物条根本拿不到条目。
 */
import test from "node:test";
import assert from "node:assert/strict";

import { code, readSource } from "../helpers/source-text.mjs";
import { wait } from "../helpers/async.mjs";
import { makeDom as makeDomWith, READER_PANEL_DOM_KEYS } from "../helpers/dom.mjs";

const makeDom = () => makeDomWith("", {
  url: "http://localhost/reader.html",
  keys: READER_PANEL_DOM_KEYS,
});

const read = (rel) => readSource(rel, import.meta.url);

// renderReaderTerminal 先看 apiBase()/frontendApiKey()，取不到就返回 null（dock 里
// 不出现这扇门）。这两个值在 jsdom 里是空的，所以从环境变量注入 —— runtime.ts 的
// readEnv 读的就是这两个名字。不桩的话下面每一条都会在「门根本没渲染」上恒绿。
process.env.RETAIN_PDF_FRONTEND_API_BASE = "http://localhost:8000";
process.env.RETAIN_PDF_FRONTEND_X_API_KEY = "test-key";

async function renderTerminal(dom, props) {
  const { createRoot } = await import("react-dom/client");
  const React = await import("react");
  const { renderReaderTerminal } = await import("../../src/features/reader/ui/terminal.js");
  const host = dom.window.document.createElement("div");
  dom.window.document.body.appendChild(host);
  const root = createRoot(host);
  root.render(React.createElement(() => renderReaderTerminal(props)));
  await wait(80);
  return { root, host };
}

const BASE_PROPS = { open: true, pendingInput: null, onOpenBoard() {} };

test("sessionKey 只认 jobId —— 不拿 documentId 兜底", () => {
  // 契约写在 adapters.ts 上：「用 jobId，换文档就换终端」。兜底一加，一个
  // document id 就会被当成 job id 打到 /api/v1/jobs/<id>/board 上去。
  const app = code(read("../../../packages/reader/src/ReaderAppReactPdf.tsx"));
  assert.match(app, /sessionKey: session\.jobId,/, "sessionKey 不是只认 jobId 了");
  assert.doesNotMatch(
    app,
    /sessionKey: session\.jobId \|\|/,
    "sessionKey 又拿 documentId（或字面量）兜底了 —— 那个值会被当成 job id 用",
  );
});

test("没有任务时画的是说明，不是终端", async () => {
  const dom = makeDom();
  let fetched = 0;
  globalThis.fetch = async () => { fetched += 1; return { ok: false, status: 404, json: async () => ({}) }; };
  const { root, host } = await renderTerminal(dom, { ...BASE_PROPS, sessionKey: "" });
  assert.ok(
    host.querySelector('[data-terminal-state="needs-job"]'),
    "没有任务却照常开终端 —— 那是个 books/ 为空、写什么都没有呈现路径的空壳",
  );
  // 说清「为什么」和「该怎么办」，而不是一句「不可用」。
  assert.match(host.textContent, /还没处理过/, "没说为什么不能用");
  assert.match(host.textContent, /OCR|翻译/, "没说该怎么办");
  const link = host.querySelector(".reader-terminal-needs-job-link");
  assert.ok(link, "没给去处");
  // detail.html 硬要 job_id，主页也没有按 document_id 直开详情的 URL 入口 ——
  // 一个会落空的链接比不给链接更糟。
  assert.equal(link.getAttribute("href"), "./index.html", "链接指到了一个这本书打不开的地方");
  assert.equal(fetched, 0, "没有任务却还在打端点");
  root.unmount(); host.remove();
});

test("没有任务时不渲染终端会话，也不列 board", async () => {
  const dom = makeDom();
  const urls = [];
  globalThis.fetch = async (url) => {
    urls.push(`${url}`);
    return { ok: true, json: async () => ({ code: 0, message: "ok", data: { items: [] } }) };
  };
  const { root, host } = await renderTerminal(dom, { ...BASE_PROPS, sessionKey: "" });
  assert.equal(host.querySelector(".reader-terminal-tabs"), null, "标签条还在 —— 终端被渲染了");
  assert.equal(host.querySelector(".reader-terminal-surface"), null, "终端画布还在");
  assert.deepEqual(urls.filter((u) => u.includes("/board")), [], "还在列 board/");
  root.unmount(); host.remove();
});

test("有任务时返回的是终端面板 —— 正对照，否则上面几条可能在守「永远不开」", async () => {
  // 这一条**不挂载**：真终端会动态 import @xterm/xterm，而 jsdom 里
  // `new mod.Terminal(...)` 不是构造器，异步抛在测试结束之后。正对照要的只是
  // 「有 jobId 时走的不是说明那条分支」，看返回的元素就够。
  //
  // 判别靠 props：终端面板拿 baseUrl / apiKey，说明面板一个 prop 都不拿。
  const { renderReaderTerminal } = await import("../../src/features/reader/ui/terminal.js");
  const withJob = renderReaderTerminal({ ...BASE_PROPS, sessionKey: "job-1" });
  assert.ok(withJob, "有任务却什么都没返回");
  assert.equal(withJob.props.sessionKey, "job-1", "返回的不是带会话键的终端面板");
  assert.equal(withJob.props.baseUrl, "http://localhost:8000", "终端面板没拿到端点");

  const withoutJob = renderReaderTerminal({ ...BASE_PROPS, sessionKey: "" });
  assert.ok(withoutJob, "没有任务时返回了 null —— 那扇门会悄悄消失");
  assert.equal(withoutJob.props.baseUrl, undefined, "没有任务时返回的仍是终端面板");
});

test("产物面板同样按 jobId 门控 —— 两边用的是同一个判断", () => {
  const board = code(read("../../src/features/reader/ui/board-html.tsx"));
  assert.match(board, /!props\.jobId/, "产物面板不再看 jobId 了");
});
