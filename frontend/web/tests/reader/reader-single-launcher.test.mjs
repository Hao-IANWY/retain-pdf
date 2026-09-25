/** 阅读页只有**一个**面板启动器，而且它整体不会被藏起来。
 *
 * ## 起因
 *
 * 原来有两个：右侧竖条（rail）管 Markdown / AI / 阅读路径 / 画布 / 终端，
 * 可拖动圆钮（FAB）管 Markdown / AI / 批注 / AI 批注 / 摘录 / 三路下载。
 * 重叠两个、都看不到全貌，用户得先记住「批注在圆钮、路径在竖条」这张哪儿都
 * 没写的表。
 *
 * 更糟的是它们会互斥：
 *
 *     .reader-react-root.is-assistant-open .reader-fab { opacity: 0; pointer-events: none }
 *
 * `is-assistant-open` ⟺ 有面板开着。所以**只要任何一个 dock 面板开着，
 * 批注 / AI 批注 / 摘录 / 三路下载这 6 个功能全部不可达**，键盘也没有入口。
 * 而圆钮的高亮逻辑当时有 3 条测试守着 —— 守的是一段永远渲染不出来的 UI。
 *
 * ## 所以这份文件守的是「可达性」，不是「代码长什么样」
 *
 * - 8 个面板每一个都在唯一那个启动器的清单里（从 id 真源 map 出来对账，
 *   不手抄一份清单：手抄的那份漏一个也没人知道）；
 * - 三路下载仍然可达；
 * - **没有任何 CSS 规则会把这个启动器整体隐藏** —— 这正是圆钮栽的地方。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import {
  READER_ASSISTANT_PANEL_IDS,
  READER_BASE_PANEL_IDS,
} from "../../../packages/reader/src/shared/types/reader-assistant-panels.ts";
import { readerDockTabs } from "../../../packages/reader/src/components/react-pdf/reader-dock-tabs.ts";
import { ReaderAssistantDock } from "../../../packages/reader/src/components/react-pdf/ReaderAssistantDock.tsx";
import { READER_DOWNLOAD_ORDER } from "../../../packages/reader/src/components/react-pdf/use-reader-downloads.ts";

const READER_STYLES = fileURLToPath(
  new URL("../../../packages/reader/styles/", import.meta.url),
);
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");
const styleFiles = () =>
  readdirSync(READER_STYLES).filter((name) => name.endsWith(".css")).sort();
const readStyle = (name) => stripComments(readFileSync(join(READER_STYLES, name), "utf8"));

const APP = readFileSync(
  new URL("../../../packages/reader/src/ReaderAppReactPdf.tsx", import.meta.url),
  "utf8",
);

// ------------------------------------------------------------------ 清单对账

test("8 个面板每一个都在唯一那个启动器的清单里", () => {
  // 从 id 真源 map 出来比，不在这里抄第二份清单 —— 抄的那份漏一个的表现是
  // 「那个面板再也打不开」，而这条测试照样绿。
  const ids = readerDockTabs(() => true).map((tab) => tab.id);
  assert.equal(ids.length, READER_ASSISTANT_PANEL_IDS.length, `清单长度对不上: ${ids}`);
  assert.deepEqual([...ids].sort(), [...READER_ASSISTANT_PANEL_IDS].sort());
  // 顺序也来自真源：dock 里 tab 的先后就是这份清单的先后。
  assert.deepEqual(ids, [...READER_ASSISTANT_PANEL_IDS]);
  assert.ok(ids.length >= 8, `只有 ${ids.length} 个面板，八成漏登记了`);
});

test("每个面板都有标签和图标 —— 少一样那个 tab 要么空白要么崩", () => {
  for (const tab of readerDockTabs(() => true)) {
    assert.ok(tab.label && tab.label.trim(), `${tab.id} 没有标签`);
    assert.ok(tab.short && tab.short.trim(), `${tab.id} 没有竖条上的缩写`);
    assert.ok(tab.Icon, `${tab.id} 没有图标`);
  }
  const shorts = readerDockTabs(() => true).map((tab) => tab.short);
  assert.equal(new Set(shorts).size, shorts.length, `竖条缩写有重复: ${shorts}`);
});

test("**只有一个**启动器：圆钮那一套连同它的 CSS 一起没了", () => {
  // 先证明「另一个东西存在」：启动器本身的样式必须真的在，否则下面那条
  // 「圆钮不存在」在任何情况下都绿（整份 CSS 都被删掉时也绿）。
  const all = styleFiles().map(readStyle).join("\n");
  assert.match(all, /\.reader-assistant-rail\b/, "启动器的竖条样式没了");
  assert.match(all, /\.reader-assistant-dock-tabs\b/, "启动器的 tab 条样式没了");
  assert.doesNotMatch(all, /\.reader-fab\b/, "圆钮的 CSS 又回来了");
  assert.doesNotMatch(APP, /ReaderFab|fabActiveTool/, "阅读页又挂了一个圆钮");
});

test("每个面板的 tab 真的接到了那个面板上 —— 不是「tab 在、点了没东西」", () => {
  // 这条是补上来的：反证时把摘录的 `open` 改成写死的 false（tab 还在、点了
  // 打不开），**整个 2000 条的套件全绿**。启动器清单那几条只证明 tab 在，
  // 证明不了 tab 接到了东西 —— 而这正是这次要修的那类缺陷本身。
  //
  // 包自己渲染的面板逐个对账；宿主槽位面板走 READER_HOST_PANELS.map + 壳里的
  // `active === panel.id`，那一条由 reader-terminal-slot 的壳测试盖住。
  //
  // id 从真源 map 出来，不在这里抄第二份清单。
  for (const id of READER_BASE_PANEL_IDS) {
    const wiring = `open={assistantPanel === "${id}"}`;
    const at = APP.indexOf(wiring);
    assert.ok(at > 0, `${id} 的 tab 没接到面板上：阅读页里找不到 ${wiring}`);
    assert.equal(APP.indexOf(wiring, at + 1), -1, `${id} 接了两遍，会开出两个面板`);
  }
});

test("懒加载面板的挂载闸用的是它自己那个 id", () => {
  // 闸和 open 用了不同的 id 是个抄改出来的错：面板永远不挂载，点了什么都没有，
  // 而 tsc 和上面那条都不会红（两个 id 各自都是合法的）。
  const latched = [...APP.matchAll(/useMountedSinceFirstOpen\(assistantPanel === "([a-z-]+)"\)/g)]
    .map((m) => m[1]);
  assert.ok(latched.length >= 3, `只找到 ${latched.length} 个挂载闸，正则八成没匹配上`);
  for (const id of latched) {
    assert.ok(
      APP.includes(`open={assistantPanel === "${id}"}`),
      `挂载闸盯着 ${id}，但没有面板用这个 id 决定开合 —— 闸和面板对不上`,
    );
  }
});

// ------------------------------------------------- 没有 CSS 会把启动器整体藏掉

/** 顶层规则：选择器 → 声明块。 */
function topLevelRules(css) {
  const rules = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < css.length; i += 1) {
    const ch = css[i];
    if (ch === "{") {
      if (depth === 0) {
        rules.push({ prelude: css.slice(start, i).trim(), bodyStart: i + 1 });
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
  return rules.filter((rule) => rule.body !== undefined && !rule.prelude.startsWith("@"));
}

/** at-rule（@media / @container）里的规则也要看 —— 圆钮那条就住在普通规则里，
 * 但把它挪进一条 @media 同样能把入口藏掉。 */
function allRules(css) {
  const out = [];
  for (const rule of topLevelRules(css)) {
    if (rule.prelude.startsWith("@")) continue;
    out.push(rule);
  }
  // at-rule 的内容展开一层再扫。
  for (const [, body] of css.matchAll(/@(?:media|container|supports)[^{]*\{([\s\S]*?)\n\}/g)) {
    out.push(...topLevelRules(body));
  }
  return out;
}

const LAUNCHER_SELECTORS = [
  ".reader-assistant-rail",
  ".reader-assistant-dock-header",
  ".reader-assistant-dock-tabs",
  ".reader-assistant-dock-tab",
  ".reader-assistant-dock-close",
];

/** 「整体藏起来」的写法。圆钮当年用的是 opacity: 0 + pointer-events: none。 */
const HIDING = [
  /display\s*:\s*none/,
  /visibility\s*:\s*hidden/,
  /opacity\s*:\s*0(?:\.0*)?\s*(?:;|$)/,
  /pointer-events\s*:\s*none/,
  /content-visibility\s*:\s*hidden/,
];

test("没有任何 CSS 规则会把这个启动器整体隐藏", () => {
  // 圆钮就是这么没的：一条 `.is-assistant-open .reader-fab { opacity: 0 }`，
  // 于是它管的 6 个功能在「有面板开着」时全部不可达，而三条测试还在守着它的
  // 高亮逻辑 —— 守的是一段永远渲染不出来的 UI。
  let seen = 0;
  const problems = [];
  for (const file of styleFiles()) {
    for (const rule of allRules(readStyle(file))) {
      const hitsLauncher = LAUNCHER_SELECTORS.some((sel) =>
        // `.reader-assistant-rail-button` 是启动器里的一个按钮，不是启动器本身；
        // 只认「选择器以这个类结尾」的那些。
        new RegExp(`${sel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`).test(rule.prelude));
      if (!hitsLauncher) continue;
      seen += 1;
      // :hover / :focus / :disabled 之类的状态不算 —— 那是交互反馈，不是入口消失。
      if (/:(hover|focus|active|disabled|focus-visible)\b/.test(rule.prelude)) continue;
      if (/::(before|after|-webkit-scrollbar)/.test(rule.prelude)) continue;
      for (const pattern of HIDING) {
        if (pattern.test(rule.body)) {
          problems.push(`${file}: ${rule.prelude} { …${pattern} }`);
        }
      }
    }
  }
  // 先断言「扫到了东西」：扫描器失效时上面那条在任何情况下都绿。
  assert.ok(seen >= 5, `只扫到 ${seen} 条启动器规则，扫描器八成失效了`);
  assert.deepEqual(problems, [], `启动器被藏起来了：\n  ${problems.join("\n  ")}`);
});

test("启动器的两种形态都真的渲染出可点的东西", () => {
  // 上面那条是「没有人藏它」，这条是「它本来就在」—— 两条缺一不可。
  const rail = renderToStaticMarkup(
    createElement(ReaderAssistantDock, { active: null, onSelect() {}, onClose() {} }),
  );
  const dock = renderToStaticMarkup(
    createElement(ReaderAssistantDock, { active: "notes", onSelect() {}, onClose() {} }),
  );
  // 宿主适配器没注册时只有 5 个 base 面板，但它们必须一个不少地画出来。
  for (const id of ["markdown", "ai", "notes", "ai-notes", "favorites"]) {
    const label = readerDockTabs(() => false).find((tab) => tab.id === id)?.label;
    assert.ok(rail.includes(`打开${label}`), `竖条上没有${label}`);
    assert.ok(dock.includes(`>${label}<`), `tab 条上没有${label}`);
  }
  assert.match(dock, /aria-label="关闭阅读辅助面板"/);
});

// ------------------------------------------------------------------ 三路下载

test("三路下载仍然可达，而且不在启动器里 —— 它不该和面板抢位置", () => {
  assert.deepEqual([...READER_DOWNLOAD_ORDER], ["source", "sideBySide", "translated"]);
  // 顶栏那一组常驻：面板开着也够得到（原来在圆钮里，圆钮一被藏就下不了）。
  assert.match(APP, /<ReaderDownloadActions\s*\/>/, "阅读页没挂顶栏下载组");
  const tray = APP.slice(APP.indexOf('className="reader-chrome-tray"'), APP.indexOf("</div>", APP.indexOf('className="reader-chrome-tray"')));
  assert.match(tray, /<ReaderDownloadActions/, "下载组不在顶栏那一组里");
  assert.match(tray, /<ReaderCloseHome/, "顶栏那一组里没有「关闭回主页」");
  // 这一组不能被 dock 的开合影响 —— 圆钮当年就死在这一点上。
  const all = styleFiles().map(readStyle).join("\n");
  assert.match(all, /\.reader-chrome-tray\b/, "顶栏那一组没有样式");
  for (const rule of allRules(all)) {
    if (!/\.reader-(chrome-tray|download-action)(?![\w-])/.test(rule.prelude)) continue;
    if (/:(hover|focus|active|disabled|focus-visible)\b/.test(rule.prelude)) continue;
    assert.doesNotMatch(
      rule.body,
      /display\s*:\s*none|visibility\s*:\s*hidden|pointer-events\s*:\s*none/,
      `下载入口被藏起来了：${rule.prelude}`,
    );
  }
});

// ------------------------------------------------------------ tab 放不下的降级

test("8 个 tab 放不下时有降级，而不是溢出", () => {
  // dock 最窄 30vw（reader-ai-split-constraints.ts），1280 的屏上 384px；
  // 8 个中文 tab 一行要 ~560px。不处理的话要么撑破 header 把关闭按钮挤出去，
  // 要么横向溢出到看不见。
  const css = readStyle("assistant-dock.css");
  // 同一个选择器可能有好几条规则（基础样式一条、后来补的一条），**必须合起来
  // 看** —— 只取最后一条的话，写在前面那条声明就查不到，测试会红在对的地方
  // 却给出错的理由。
  const rules = new Map();
  for (const rule of allRules(css)) {
    const key = rule.prelude.trim();
    rules.set(key, (rules.get(key) ?? "") + rule.body);
  }
  const tabs = rules.get(".reader-assistant-dock-tabs");
  assert.ok(tabs, "tab 条的规则没了");
  assert.match(tabs, /min-width\s*:\s*0/, "tab 条不能被压缩，会把关闭按钮挤出去");
  assert.match(tabs, /overflow-x\s*:\s*(auto|scroll)/, "放不下时既不滚也不降级 = 溢出");

  const close = rules.get(".reader-assistant-dock-close");
  assert.ok(close, "关闭按钮的规则没了");
  assert.match(close, /flex\s*:\s*0 0 auto/, "关闭按钮会被 tab 条挤掉，面板只能靠 Esc 关");

  // 窄 dock 上只留图标。容器查询必须写在基础规则**之后**，否则同特异性下被
  // 后面的 padding / gap 覆盖回去 —— 看着写了降级，实际没生效。
  const labelHidden = css.indexOf("@container reader-dock");
  assert.ok(labelHidden > 0, "没有按 dock 宽度降级的容器查询");
  assert.ok(
    labelHidden > css.indexOf(".reader-assistant-dock-tab {"),
    "容器查询写在基础规则之前，会被覆盖回去",
  );
  assert.match(css.slice(labelHidden), /\.reader-assistant-dock-tab-label/);
  // 容器本身要声明，否则那条查询永远不匹配。
  assert.match(rules.get(".reader-assistant-dock-header"), /container-name\s*:\s*reader-dock/);
  assert.match(rules.get(".reader-assistant-dock-header"), /container-type\s*:\s*inline-size/);
});
