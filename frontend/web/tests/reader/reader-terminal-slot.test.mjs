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

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const DOCK = read(
  "../../../../frontend/packages/reader/src/components/react-pdf/ReaderAssistantDock.tsx",
);
const APP = read(
  "../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx",
);
const HOST = read("../../src/features/reader/ui/terminal.tsx");
const ADAPTERS = read("../../../../frontend/packages/reader/src/adapters.ts");

test("宿主没注册终端渲染器时，dock 里不显示这个 tab", () => {
  // 点了没反应的 tab 比没有这个功能更糟 —— 用户会以为是坏了。
  assert.match(DOCK, /renderReaderTerminal.*===\s*"function"/s);
  assert.match(
    DOCK,
    /hasTerminal\s*\?\s*\[\.\.\.BASE_PANELS,\s*TERMINAL_PANEL\]\s*:\s*BASE_PANELS/,
    "终端 tab 必须按宿主是否注册渲染器来决定显不显示",
  );
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
  // 同一个理由：useMountedSinceFirstOpen 是挂载 latch，缺了它切 tab 就会
  // 把整个槽位从树上摘掉。
  assert.match(APP, /terminalMounted = useMountedSinceFirstOpen\(assistantPanel === "terminal"\)/);
});

test("终端槽位套在和其它面板同一个壳里", () => {
  // 第一版把槽位渲染在 <Suspense> 外面、不套 ReaderFloatShell，结果终端铺满
  // 整个窗口盖住了 PDF —— 定位是包的事，宿主只给内容。
  const shell = APP.slice(
    APP.indexOf("terminalMounted && renderTerminal"),
    APP.indexOf("markdownMounted ?"),
  );
  assert.match(shell, /<ReaderFloatShell/, "槽位必须套在 ReaderFloatShell 里");
  assert.match(shell, /placement="workspace"/);
  assert.match(shell, /className="is-pane-right"/);
  assert.ok(
    APP.indexOf("terminalMounted && renderTerminal") > APP.indexOf("<Suspense"),
    "槽位必须在 Suspense 块内，和 Markdown / AI 面板同一个父容器",
  );
});

test("宿主给的那块不自己定位", () => {
  // 宿主不知道 dock 在哪一侧，写死定位就会和包的布局打架。
  assert.doesNotMatch(HOST, /position:\s*(fixed|absolute)/);
  assert.doesNotMatch(HOST, /\b(left|right|top|bottom)\s*:/);
});

test("终端会话 key 跟着文档走", () => {
  // 换文档要换终端（fx 的 workspace 是按 session key 分的）；同一文档来回切
  // tab 要接回同一个。
  assert.match(APP, /sessionKey: session\.jobId \|\| session\.documentId/);
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
