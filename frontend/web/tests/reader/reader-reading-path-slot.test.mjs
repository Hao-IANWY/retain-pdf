/** 阅读路径面板的结构不变量。
 *
 * 和终端槽位一样是源码门禁：守的东西跨了包边界（dock）和网络，不适合在这里起
 * 运行时。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const HOST = read("../../src/features/reader/ui/reading-path.tsx");
const APP = read("../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx");
const ADAPTERS = read("../../../../frontend/packages/reader/src/adapters.ts");

test("没生成过是正常状态，不能当失败渲染", () => {
  // 这个文件是 agent 写的，绝大多数书根本没有。404 渲染成「读取失败」会让
  // 用户以为坏了 —— 实际上只是还没让 fx 生成。
  assert.match(HOST, /response\.status === 404/);
  // 空数组和 null 是两种状态:确认过「没有」才给提示,还没拿到结果时显示加载中。
  assert.match(HOST, /setSteps\(\[\]\)/);
  assert.match(HOST, /还没有阅读路径/);
});

test("畸形的步骤丢掉，不让整个面板白屏", () => {
  // 文件是 agent 生成的，形状不保证。一步坏掉就整页崩，比少显示一步糟得多。
  //
  // 解析搬到 domain/reading-path-doc.ts 了(面板要轮询,解析不该跟 hook 混在
  // 一起),这里只守「面板仍然走那个解析器」—— 行为本身由那边的单测钉住。
  assert.match(HOST, /parseReadingPathSteps/);
  const DOC = read("../../src/features/reader/domain/reading-path-doc.ts");
  assert.match(DOC, /typeof \(step as ReadingPathStep\)\.block_id === "string"/);
});

test("跳转交给包，宿主不自己实现", () => {
  // 锚点怎么变成翻页+高亮要看当前分栏和模式。宿主自己做会和这些状态打架。
  assert.match(HOST, /onJump\(\{ page_idx: step\.page_idx, block_id: step\.block_id \}\)/);
  assert.doesNotMatch(HOST, /goToPage|scrollTo|jumpToAnchor/);
  assert.match(APP, /onJump: jumpCitation/);
});

test("每一步都显示锚点，不只显示说明", () => {
  // 用户得能看出这一步指向哪 —— 锚错了肉眼就能发现，否则只能点进去才知道。
  assert.match(HOST, /reader-reading-path-anchor/);
  assert.match(HOST, /step\.block_id/);
});

test("槽位是可选适配键，不能进必填列表", () => {
  const requiredBlock = ADAPTERS.slice(ADAPTERS.indexOf("READER_REQUIRED_ADAPTER_KEYS"));
  const block = requiredBlock.slice(0, requiredBlock.indexOf("] as const"));
  assert.doesNotMatch(block, /renderReaderReadingPath/);
  assert.match(ADAPTERS, /"renderReaderReadingPath",/);
});

test("包不认识那个 API 端点", () => {
  // 端点是 RetainPDF 的；包要能被别的宿主用。
  assert.doesNotMatch(APP, /reading-path\.v1\.json|api\/v1\/jobs/);
  assert.doesNotMatch(ADAPTERS, /api\/v1\/jobs/);
});
