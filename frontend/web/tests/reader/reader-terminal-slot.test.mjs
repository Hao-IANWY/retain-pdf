/** 阅读页终端槽位的结构不变量。
 *
 * 这几条是源码门禁（读文本、匹配模式），不是行为测试 —— 因为它们守的东西跨了
 * 包边界（@retainpdf/reader 的 dock）和真实 DOM（xterm 要画布），两者都不适合
 * 在这里起运行时。反证跑出来它们确实抓得住：把任意一条改掉都会红。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { code } from "../helpers/source-text.mjs";

import { READER_ADAPTER_KEYS } from "../../../../frontend/packages/reader/src/adapters.ts";
import { READER_HOST_PANELS } from "../../../../frontend/packages/reader/src/components/react-pdf/reader-host-panels.ts";
import { readerDockTabs } from "../../../../frontend/packages/reader/src/components/react-pdf/reader-dock-tabs.ts";

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const DOCK = read(
  "../../../../frontend/packages/reader/src/components/react-pdf/ReaderAssistantDock.tsx",
);
// 先剥注释：这个文件的注释里现在引用着旧写法（`sessionKey: session.jobId || …`），
// 不剥的话下面那条 doesNotMatch 会被自己的说明命中。
const APP = code(
  read("../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx"),
);
const HOST = read("../../src/features/reader/ui/terminal.tsx");
const ADAPTERS = read("../../../../frontend/packages/reader/src/adapters.ts");
const SHELL = read(
  "../../../../frontend/packages/reader/src/components/react-pdf/ReaderHostPanelShell.tsx",
);

test("每个宿主槽位都按「有没有注册渲染器」决定显不显示", () => {
  // 点了没反应的 tab 比没有这个功能更糟 —— 用户会以为是坏了。
  //
  // 直接跑 readerDockTabs 的两支，不对 dock 源码做正则：正则在实现换个变量名
  // 之后照样绿，而这里跑的就是 dock 渲染 tab 用的那一个函数。
  const registered = readerDockTabs(() => true).map((tab) => tab.id);
  const none = readerDockTabs(() => false).map((tab) => tab.id);
  assert.ok(READER_HOST_PANELS.length >= 1, "槽位面板没找全");
  for (const panel of READER_HOST_PANELS) {
    assert.ok(registered.includes(panel.id), `宿主注册了渲染器，${panel.id} 却没有 tab`);
    assert.ok(!none.includes(panel.id), `宿主没注册渲染器，${panel.id} 仍然给了一个点不出东西的 tab`);
  }
  for (const panel of READER_HOST_PANELS) {
    // adapterKey 拼错的话过滤永远为假，tab 永远不出现，而且不报错。
    assert.ok(
      READER_ADAPTER_KEYS.includes(panel.adapterKey),
      `${panel.id} 的 adapterKey «${panel.adapterKey}» 不在 READER_ADAPTER_KEYS 里`,
    );
    assert.match(ADAPTERS, new RegExp(`${panel.adapterKey}\\?:`), `适配器类型里没有 ${panel.adapterKey}`);
  }
});

test("宿主槽位的 id、标签、缩写都不重复", () => {
  // 两个面板共用一个 adapterKey 的话，两个 tab 打开同一块内容，而且不报错。
  for (const field of ["id", "label", "short", "adapterKey"]) {
    const values = READER_HOST_PANELS.map((panel) => panel[field]);
    assert.equal(new Set(values).size, values.length, `${field} 有重复: ${values}`);
  }
});

test("终端面板关掉时用 hidden，不能卸载", () => {
  // 卸载 = 关 WebSocket = 杀掉 PTY 子进程。用户切个 tab 回来会发现 fx 的
  // 会话没了，而这在别的面板上是不会发生的（它们没有进程）。
  assert.match(HOST, /hidden=\{!open\}/);
  assert.doesNotMatch(
    HOST,
    /if\s*\(!open\)\s*return null/,
    "不能在 !open 时返回 null —— 那就是卸载",
  );
});

test("终端一旦开过就保持挂载", () => {
  // 同一个理由：卸载会杀掉 PTY。现在这件事由注册表上的 keepMounted 表达，
  // 壳按它决定用不用挂载 latch。
  const terminal = READER_HOST_PANELS.find((panel) => panel.id === "terminal");
  assert.ok(terminal, "终端不在注册表里了");
  assert.equal(terminal.keepMounted, true, "终端 keepMounted 被关掉了 —— 切 tab 会杀掉 fx 会话");
  assert.match(SHELL, /useMountedSinceFirstOpen\(open\)/, "壳不再用挂载 latch");
  assert.match(SHELL, /panel\.keepMounted \? latched : open/, "壳没按 keepMounted 选行为");
});

test("所有宿主槽位都套在和其它面板同一个壳里", () => {
  // 第一版把终端渲染在 <Suspense> 外面、不套壳，结果它铺满整个窗口盖住了 PDF
  // —— 定位是包的事，宿主只给内容。
  //
  // 现在三个面板共用一个壳，所以这条一次覆盖全部，不用每加一个面板补一遍。
  assert.match(SHELL, /<ReaderPanelShell/, "槽位必须套在 ReaderPanelShell 里");
  assert.match(SHELL, /className="is-pane-right"/);
  assert.match(SHELL, /id=\{`reader-\$\{panel\.id\}-panel`\}/, "壳的 id 不再按面板 id 生成（CSS 会失配）");

  const rendered = APP.indexOf("READER_HOST_PANELS.map");
  assert.ok(rendered > 0, "宿主不再按注册表渲染槽位了");
  assert.ok(
    rendered > APP.indexOf("<Suspense") && rendered < APP.indexOf("</Suspense>"),
    "槽位必须在 Suspense 块内，和 Markdown / AI 面板同一个父容器",
  );
});

test("宿主给的那块不自己定位", () => {
  // 宿主不知道 dock 在哪一侧，写死定位就会和包的布局打架。
  assert.doesNotMatch(HOST, /position:\s*(fixed|absolute)/);
  assert.doesNotMatch(HOST, /\b(left|right|top|bottom)\s*:/);
});

test("终端会话 key 只认 jobId —— 原来那个 documentId 兜底是个静默失效的行为", () => {
  // 换文档要换终端（fx 的 workspace 按 session key 分），这一条 `session.jobId`
  // 自己就满足。
  //
  // **去掉的是 `|| session.documentId || "reader"` 那截。** 它本意是「没有任务时
  // 也给个稳定的键」，但那个键指向一个不存在的工作区：fx 侧
  // `resolve_job_workspace` 找不到 `data/jobs/<documentId>` 就退回私有目录，
  // 终端开起来了而 `books/` 是空的，不报错；产物条同时在 404 上空转。
  // 完整的链路和四处静默见 reader-terminal-needs-job.test.mjs 的文件头。
  assert.match(APP, /sessionKey: session\.jobId,/);
  assert.doesNotMatch(
    APP,
    /sessionKey: session\.jobId \|\|/,
    "documentId 兜底又回来了 —— 那个值会被当成 job id 打到 /api/v1/jobs/<id>/board 上",
  );
});

test("端点配不出来时槽位返回 null，而不是渲染一个连不上的终端", () => {
  assert.match(HOST, /if \(!base \|\| !apiKey\) return null;/);
});

test("终端槽位是可选适配键，不能进必填列表", () => {
  // 进了必填列表就等于「所有宿主都必须实现终端」—— 这个包要能被别的宿主用。
  const required = ADAPTERS.slice(
    ADAPTERS.indexOf("READER_REQUIRED_ADAPTER_KEYS"),
  );
  const block = required.slice(0, required.indexOf("] as const"));
  assert.doesNotMatch(block, /renderReaderTerminal/);
  assert.match(ADAPTERS, /"renderReaderTerminal",/, "但它必须在完整键列表里");
});

test("包不依赖 xterm —— 只看 import 和 package.json，不看注释", () => {
  // 第一版这条写成了全文匹配，结果被 adapters.ts 里一句解释性注释命中而误红。
  // 不变量是「包不依赖它」，能证明这一点的是 import 语句和依赖清单。
  const packageSources = [DOCK, APP, ADAPTERS].join("\n");
  assert.doesNotMatch(
    packageSources,
    /from\s+["']@xterm\//,
    "包直接 import 了 xterm —— 它就只能给 RetainPDF 用了",
  );
  const manifest = JSON.parse(
    read("../../../../frontend/packages/reader/package.json"),
  );
  const declared = Object.keys({
    ...manifest.dependencies,
    ...manifest.peerDependencies,
  });
  assert.deepEqual(
    declared.filter((name) => name.startsWith("@xterm/")),
    [],
    "xterm 不该出现在阅读器包的依赖里",
  );
});
