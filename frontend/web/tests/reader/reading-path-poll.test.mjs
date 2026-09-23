/** 阅读路径面板：轮询 + 解析。
 *
 * 起因：你是在**读的过程中**让 agent 写这份路径的。只在挂载时拉一次的话，写完
 * 要整页刷新才看得见 —— 而没人知道要刷新，面板看起来就是「它没生成」。
 *
 * 这个 bug 在画布上犯过一次并修好了，批注的 hook 里还留着一句「别再犯」，
 * **而阅读路径面板一直没改**。所以这里守的不只是行为，还有「这类面板都要轮询」
 * 这条规律本身。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  parseReadingPathSteps,
} from "../../src/features/reader/domain/reading-path-doc.ts";
import { AGENT_ARTIFACT_POLL_MS } from "../../src/features/reader/domain/agent-artifacts.ts";

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const PANEL = read("../../src/features/reader/ui/reading-path.tsx");
const CANVAS = read("../../src/features/reader/ui/reading-canvas.tsx");

// ---------------------------------------------------------------- 解析

test("单步缺 block_id 就丢掉那一步，不让整个面板白屏", () => {
  // 文件是模型生成的，形状不保证。block_id 是锚点 —— 没有它这一步点了跳不到
  // 任何地方，留着只会骗人。
  const steps = parseReadingPathSteps(
    JSON.stringify({
      steps: [
        { block_id: "b1", why: "先看结论" },
        { why: "这一步没锚点" },
        null,
        { block_id: 42 },
        { block_id: "b2", page_idx: 3 },
      ],
    }),
  );
  assert.deepEqual(steps.map((s) => s.block_id), ["b1", "b2"]);
});

test("没有 steps 字段就是空，不是错误", () => {
  assert.deepEqual(parseReadingPathSteps("{}"), []);
  assert.deepEqual(parseReadingPathSteps(JSON.stringify({ steps: "nope" })), []);
  assert.deepEqual(parseReadingPathSteps("null"), []);
});

test("整个文件不是 JSON 要抛，且报错要指向 agent", () => {
  // 静默显示空列表的话，用户只会觉得「它没干活」，不会想到让它重写一遍。
  // JSON.parse 的原话（"Unexpected token < in JSON at position 0"）没有指向性。
  assert.throws(
    () => parseReadingPathSteps("<html>502</html>"),
    (err) => {
      assert.match(err.message, /agent/);
      assert.doesNotMatch(err.message, /Unexpected token/);
      return true;
    },
  );
});

// ---------------------------------------------------------------- 轮询

test("面板会轮询，而不是只拉一次", () => {
  assert.match(PANEL, /setInterval\(\(\) => void tick\(\), AGENT_ARTIFACT_POLL_MS\)/);
  assert.match(PANEL, /clearInterval\(timer\)/, "卸载不清定时器就会一直打请求");
});

test("画布和阅读路径共用同一个间隔常量", () => {
  // 两个面板显示的是同一批 agent 产物。间隔各写一份的话，改了一个忘了另一个,
  // 表现是"有的面板更新快有的慢",没人会把它当 bug 报。
  assert.match(CANVAS, /AGENT_ARTIFACT_POLL_MS/);
  assert.doesNotMatch(CANVAS, /const POLL_MS/, "画布又自己定义了一份间隔");
  assert.doesNotMatch(PANEL, /const POLL_MS/);
  assert.equal(typeof AGENT_ARTIFACT_POLL_MS, "number");
  assert.ok(AGENT_ARTIFACT_POLL_MS >= 1000 && AGENT_ARTIFACT_POLL_MS <= 15000);
});

test("瞬时故障不清空已有内容", () => {
  // 轮询把一次网络抖动的代价放大了:拉失败就换成错误页的话,你读到一半列表会
  // 自己消失,四秒后又回来。
  const block = PANEL.slice(PANEL.indexOf("} catch (error)"), PANEL.indexOf("void tick();"));
  assert.match(block, /setFailure\(/);
  assert.doesNotMatch(block, /setSteps\(/, "catch 里动了 steps —— 抖动会清空列表");
  // 有数据时错误只做一行小字,不顶掉列表。
  assert.match(PANEL, /steps === null && failure/);
  assert.match(PANEL, /steps !== null && failure/);
  assert.match(PANEL, /显示的是上一次的结果/);
});

test("404 是权威状态,该清空 —— 和抖动不同", () => {
  // 文件真被删了还一直显示旧列表,点哪一步都跳不动。
  const block = PANEL.slice(PANEL.indexOf("status === 404"), PANEL.indexOf("if (!response.ok)"));
  assert.match(block, /setSteps\(\[\]\)/);
  assert.match(block, /lastRawRef\.current = ""/, "指纹不清,文件重新出现时不会刷新");
});

test("内容没变就不 setState", () => {
  // 每 4 秒换一次数组引用会让整个列表重建,正在点的那个按钮会丢掉焦点。
  assert.match(PANEL, /if \(raw === lastRawRef\.current\) return;/);
});
