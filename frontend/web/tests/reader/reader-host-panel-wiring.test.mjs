/** 宿主槽位面板（阅读路径 / 画布 / 终端）的 tab 接到的是它自己那个面板。
 *
 * ## 为什么单独一份
 *
 * 8 个面板里有 3 个住在宿主槽位里，它们的开合由 ReaderHostPanelShell 一行决定：
 *
 *     const open = active === panel.id;
 *
 * 这一行**一条门禁都没有**。复查时把它改成 `active === "terminal"`：tsc 零
 * 报错，整套 2049 条全绿。后果是阅读路径的 tab 点了永远不挂载
 * （keepMounted: false → mounted = open = false → 直接 return null），画布只在
 * 「开过终端之后」才出得来 —— 因为 keepMounted 的闸是单调 latch。
 *
 * reader-single-launcher 里那条 wiring 门禁只循环 READER_BASE_PANEL_IDS，注释
 * 里写「宿主槽位那一条由 reader-terminal-slot 的壳测试盖住」，但终端恰恰是这个
 * 改法下唯一还能工作的 id，所以那条照样绿。3 个面板里有 2 个的可达性无人守。
 *
 * ## 所以这里真渲染
 *
 * 给每个槽位注册一个只写出自己 id 的假渲染器，然后逐个面板 × 逐个 active 值
 * 渲染一遍，对账「谁开着」。对源码做正则守不住这一行 —— 它可以换写法、搬文件，
 * 而「点了没反应」的表现一点不变。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { setReaderAdapters } from "../../../packages/reader/src/adapters.ts";
import { READER_HOST_PANELS } from "../../../packages/reader/src/components/react-pdf/reader-host-panels.ts";
import { ReaderHostPanelShell } from "../../../packages/reader/src/components/react-pdf/ReaderHostPanelShell.tsx";

// 每个槽位一个假渲染器：只写出「我是谁、我开着没」。
const adapters = {};
for (const panel of READER_HOST_PANELS) {
  adapters[panel.adapterKey] = ({ open }) => createElement(
    "i",
    { "data-slot": panel.id, "data-open": open ? "yes" : "no" },
    panel.id,
  );
}
setReaderAdapters(adapters);

const context = {
  sessionKey: "session-1",
  pendingInput: null,
  onOpenBoard() {},
  onClose() {},
};

const renderShell = (panel, active) => renderToStaticMarkup(
  createElement(ReaderHostPanelShell, { panel, active, context }),
);

test("宿主槽位面板都真的接到了假渲染器 —— 否则下面两条永远绿", () => {
  // 下限 1：阅读地图删掉之后只剩终端一个槽位面板。这条守的是「壳真的把内容
  // 渲染出来了」，不是「有几个」。
  assert.ok(READER_HOST_PANELS.length >= 1, `只登记了 ${READER_HOST_PANELS.length} 个槽位面板`);
  for (const panel of READER_HOST_PANELS) {
    assert.match(
      renderShell(panel, panel.id),
      new RegExp(`data-slot="${panel.id}"`),
      `${panel.label} 的壳根本没渲染出内容，这份门禁守错了地方`,
    );
  }
});

test("选中哪个 tab，开的就是哪个面板", () => {
  for (const panel of READER_HOST_PANELS) {
    assert.match(
      renderShell(panel, panel.id),
      new RegExp(`data-slot="${panel.id}" data-open="yes"`),
      `点了「${panel.label}」，${panel.label} 面板却没打开 —— tab 接到别的面板上了`,
    );
  }
});

test("选中别的 tab 时，这个面板不会跟着开", () => {
  // 反过来的那一半：壳里的 id 写死成某一个时，别的面板会跟着它一起开／一起不开。
  for (const panel of READER_HOST_PANELS) {
    for (const other of READER_HOST_PANELS) {
      if (other.id === panel.id) continue;
      assert.doesNotMatch(
        renderShell(panel, other.id),
        /data-open="yes"/,
        `选中的是「${other.label}」，「${panel.label}」却开着`,
      );
    }
    // 一个面板都没开的时候同理。
    assert.doesNotMatch(renderShell(panel, null), /data-open="yes"/, `没选任何 tab，「${panel.label}」却开着`);
  }
});

test("keepMounted 的面板第一次打开前不挂载 —— 分包边界不能形同虚设", () => {
  // 这条守的是上面那条「不会跟着开」不是靠 keepMounted 把内容一直留在树上蒙混
  // 过关的：从没开过的面板应该整个不在 DOM 里。
  for (const panel of READER_HOST_PANELS) {
    assert.equal(renderShell(panel, null), "", `「${panel.label}」没开过就已经挂在树上了`);
  }
});

test("壳把 context 的每一个字段都转给了适配器 —— 漏一个就是「点了抛异常」", () => {
  // 起因：壳里原来手抄了四个键，漏掉 onOpenBoard。于是「agent 写 HTML、点一下
  // 在左边打开」整条路是死的 —— 点产物条抛 `onOpen is not a function`。
  //
  // tsc 抓不到：adapterKey 的类型是 AdapterKeysTaking<…> 推出来的宽联合
  // （ReaderAdapters 里有 `(...args: any[]) => any` 这类成员也满足约束），
  // 调用参数被 any 吃掉，对象字面量根本没被检查。
  //
  // 所以这条真渲染一遍，把适配器收到的 props 记下来和 context 对账。
  const seen = [];
  setReaderAdapters({
    ...adapters,
    renderReaderTerminal: (props) => { seen.push(props); return createElement("div", { "data-slot": "terminal" }); },
  });
  try {
    renderToStaticMarkup(createElement(ReaderHostPanelShell, {
      panel: READER_HOST_PANELS.find((p) => p.slot === "terminal"),
      active: "terminal",
      context,
    }));
  } finally {
    setReaderAdapters(adapters);
  }
  assert.equal(seen.length, 1, "适配器没被调用，下面的对账没有判别力");
  const missing = Object.keys(context).filter((k) => !(k in seen[0]));
  assert.deepEqual(missing, [], `壳漏传了这些字段：${missing}`);
  assert.ok("open" in seen[0], "壳没把 open 传下去");
});
