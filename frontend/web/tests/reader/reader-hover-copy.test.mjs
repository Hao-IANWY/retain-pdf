// 阅读器悬停复制：鼠标在 PDF 内容块上 → 红色虚线框 + 「复制」，对照时左右两栏同一块一起画；
// 左栏复制原文、右栏复制译文；双击整块复制。4.1.x 旧引擎里最常用的交互，React 引擎替换时丢了，
// 同时内容块数据被「归一化两次」清成了 0，悬停框、点块浮条一起失效。
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import {
  copyReaderText,
  projectReaderTextHoverTargets,
  ReaderTextHoverLayer,
} from "../../../../frontend/packages/reader/src/pdf/ReaderTextHoverLayer.tsx";
import { normalizeReaderRegions } from "../../../../frontend/packages/reader/src/shared/data/reader-regions.ts";
import { shouldEnableLiveTranslation } from "../../../../frontend/packages/reader/src/hooks/use-reader-react-controller.ts";

const PAYLOAD = {
  code: 0,
  data: {
    items: [{
      item_id: "p001-b0003",
      source: { page: 1, bbox: [20, 40, 180, 100], unit: "pdf_point", origin: "top_left", text: "The vibration of a diatomic molecule" },
      translated: { page: 1, bbox: [20, 40, 180, 100], unit: "pdf_point", origin: "top_left", text: "双原子分子的振动" },
      markdown: "双原子分子的振动",
      region_type: "text",
      status: "translated",
      asset_ids: ["a1"],
      asset_urls: ["/a1.png"],
    }],
  },
};

test("内容块归一化是幂等的：宿主快照归一化过一次，session 再归一化不能清空", () => {
  const once = normalizeReaderRegions(PAYLOAD);
  assert.equal(once.length, 1);
  assert.deepEqual(normalizeReaderRegions(once), once, "第二次归一化（拿到数组）必须原样保留，含 assetIds");
});

function target(pane) {
  const [region] = normalizeReaderRegions(PAYLOAD);
  const box = pane === "translated" ? region.translated : region.source;
  const [t] = projectReaderTextHoverTargets([{
    itemId: region.itemId,
    region,
    box,
    pageSize: { page: 1, width: 200, height: 200 },
  }], 200, 200);
  return t;
}

test("悬停框带「复制」，左栏标原文、右栏标译文；没有可复制的文字就不给按钮", () => {
  const left = renderToStaticMarkup(createElement(ReaderTextHoverLayer, { target: target("source"), pane: "source" }));
  assert.match(left, /reader-text-hover-frame/);
  assert.match(left, /aria-label="复制这段原文"/);
  const right = renderToStaticMarkup(createElement(ReaderTextHoverLayer, { target: target("translated"), pane: "translated" }));
  assert.match(right, /aria-label="复制这段译文"/);
  const empty = target("source");
  empty.highlight.region = { ...empty.highlight.region, source: { ...empty.highlight.region.source, text: "" }, markdown: "" };
  assert.doesNotMatch(renderToStaticMarkup(createElement(ReaderTextHoverLayer, { target: empty, pane: "source" })), /复制/);
});

test("红色虚线框用 danger 语义色", () => {
  const css = readFileSync(new URL("../../../../frontend/packages/reader/styles/react-pdf.css", import.meta.url), "utf8");
  assert.match(css, /\.reader-text-hover-frame\s*\{[^}]*border:\s*2px dashed[^}]*var\(--danger\)/);
});

test("复制：剪贴板可用就写进去；空文本不假装成功", async () => {
  const written = [];
  const original = globalThis.navigator;
  Object.defineProperty(globalThis, "navigator", { value: { clipboard: { writeText: async (text) => { written.push(text); } } }, configurable: true });
  try {
    assert.equal(await copyReaderText("双原子分子的振动"), true);
    assert.deepEqual(written, ["双原子分子的振动"]);
    assert.equal(await copyReaderText("   "), false);
  } finally {
    Object.defineProperty(globalThis, "navigator", { value: original, configurable: true });
  }
});

test("对照两栏共享悬停块；页里只把悬停 id 交给含这一块的页", () => {
  const grid = readFileSync(new URL("../../../../frontend/packages/reader/src/components/react-pdf/ReaderCompareGrid.tsx", import.meta.url), "utf8");
  assert.equal((grid.match(/hoveredRegionId=\{hoveredRegionId\}/g) || []).length, 2, "左右两个 PdfDocumentPane 都拿到同一个悬停块");
  const pane = readFileSync(new URL("../../../../frontend/packages/reader/src/pdf/PdfDocumentPane.tsx", import.meta.url), "utf8");
  assert.match(pane, /hoveredRegionId && hoveredPages\.has\(pageNumber\) \? hoveredRegionId : null/);
});

test("打开时就已成功且有最终译文的任务不跟实时译文", () => {
  assert.equal(shouldEnableLiveTranslation({
    jobId: "j", sourceUrl: "/s.pdf", translatedUrl: "/t.pdf", jobStatus: "succeeded", workflow: "book",
  }), false);
  const controller = readFileSync(new URL("../../../../frontend/packages/reader/src/hooks/use-reader-react-controller.ts", import.meta.url), "utf8");
  assert.match(controller, /enabled: liveTranslationTracked && \(liveTranslationAvailable \|\| sawRunningRef\.current\.running\)/);
});
