import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { READER_HOST_PANEL_IDS } from "../../../../frontend/packages/reader/src/shared/types/reader-assistant-panels.ts";
import { readerDockTabs } from "../../../../frontend/packages/reader/src/components/react-pdf/reader-dock-tabs.ts";
import { resolveAssistantPanelAfterNote } from "../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx";
import {
  loadReaderViewState,
  normalizeReaderViewState,
  readerViewStateScope,
  saveReaderViewState,
} from "../../../../frontend/packages/reader/src/shared/state/reader-view-state.ts";

function readerSource(relative) {
  return readFileSync(new URL(relative, import.meta.url), "utf8");
}

test("reader view state persists reading mode alongside anchor/zoom", () => {
  const values = new Map();
  const storage = {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, value); },
  };
  const scope = readerViewStateScope({ documentId: "doc-mode" });
  saveReaderViewState(scope, {
    anchor: { page: 4, fraction: 0.2 },
    zoom: 0.7,
    mode: "translated",
  }, storage);
  assert.deepEqual(loadReaderViewState(scope, storage), {
    schema: "retainpdf_reader_view_v1",
    anchor: { page: 4, fraction: 0.2 },
    zoom: 0.7,
    mode: "translated",
    updatedAt: loadReaderViewState(scope, storage).updatedAt,
  });

  saveReaderViewState(scope, { mode: "compare" }, storage);
  const reloaded = loadReaderViewState(scope, storage);
  assert.equal(reloaded.mode, "compare");
  assert.deepEqual(reloaded.anchor, { page: 4, fraction: 0.2 });
});

test("reader view state rejects unknown modes and keeps legacy payloads clean", () => {
  assert.deepEqual(normalizeReaderViewState({
    schema: "retainpdf_reader_view_v1",
    mode: "side-by-side",
    updatedAt: 5,
  }), {
    schema: "retainpdf_reader_view_v1",
    updatedAt: 5,
  });
  assert.equal(normalizeReaderViewState({
    schema: "retainpdf_reader_view_v1",
    mode: "source",
    updatedAt: 0,
  }).mode, "source");
  assert.equal(normalizeReaderViewState({
    schema: "retainpdf_reader_view_v1",
    updatedAt: 0,
  }).mode, undefined);
});

test("批注是唯一那个启动器上的一个 tab，带条数角标", () => {
  // 原来批注只能从可拖动圆钮（FAB）进，而圆钮被
  // `.is-assistant-open .reader-fab { opacity: 0 }` 在任何 dock 面板开着时整个
  // 吃掉 —— 开着 Markdown 就加不了批注。现在它和别的面板同一个清单。
  const ids = readerDockTabs(() => true).map((tab) => tab.id);
  assert.ok(ids.includes("notes"), `批注不在启动器清单里: ${ids}`);

  // 角标喂的是条数，但 tab 的存在与否**拿不到条数** —— readerDockTabs 的签名
  // 里根本没有这个入参，所以「0 条就把入口藏掉」在这里写不出来。
  const app = readerSource(
    "../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx",
  );
  assert.match(app, /badges=\{\{ notes: annotations\.count/);
  assert.match(app, /<ReaderNotesPanel/);
});

test("批注面板的开合和别的面板同一个状态，没有第二份 open 布尔", () => {
  // 两个启动器时代的遗留：notesOpen / aiNotesOpen 各是一份独立状态，于是
  // 「同时开着 Markdown 和批注」这种 dock 表达不了的组合是可能的，而它在
  // 界面上就是两个面板叠在一起。
  const app = readerSource(
    "../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx",
  );
  assert.match(app, /useReaderPanelSlot\(assistantPanel, "notes"\)/);
  assert.match(app, /open=\{notesSlot\.open\}/);
  assert.doesNotMatch(app, /notesOpen|aiNotesOpen|useReaderTools/);
  assert.doesNotMatch(app, /打开批注/);
});

test("加批注不会把你正开着的那个面板顶掉", () => {
  // 一份状态的代价：无条件 setAssistantPanel("notes") 在浮窗年代只是弹个浮窗，
  // 搬进 dock 之后变成「把当前面板整个换掉」—— 终端里跑着长任务，划一句加个
  // 批注，终端就被切走了。
  assert.equal(resolveAssistantPanelAfterNote(null), "notes", "没有面板开着时得把批注顶出来");
  for (const open of ["terminal", "ai", "markdown", "favorites", "notes"]) {
    assert.equal(resolveAssistantPanelAfterNote(open), open, `${open} 面板开着时被批注顶掉了`);
  }
  // 阅读页真的用的是这个决策，不是自己又写了一遍。
  const app = readerSource(
    "../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx",
  );
  assert.match(app, /setAssistantPanel\(resolveAssistantPanelAfterNote\)/);
});

test("原来 FAB 菜单里的东西一个都没丢", () => {
  // READER_TOOLS 这张表连同 FAB 一起删了；能证明「没丢」的是它们现在都在
  // 唯一那个启动器的清单里，而不是某个文件里还留着字符串。
  //
  // 当年那份菜单里有 Markdown 和 AI 问答两样。AI 问答面板后来整个删了（阅读页
  // 只留一扇 AI 的门，就是终端里的 agent），所以这里只能要求 Markdown ——
  // 把已经删掉的功能写进「没丢」的清单，守的是一个不存在的东西。
  const ids = readerDockTabs(() => true).map((tab) => tab.id);
  assert.ok(ids.includes("markdown"), `markdown 不在启动器清单里: ${ids}`);
  // 宿主槽位面板也在同一份清单里 —— 这正是「两个启动器各管一半」消失的证据。
  assert.ok(READER_HOST_PANEL_IDS.length >= 1, `宿主槽位面板没找全: ${READER_HOST_PANEL_IDS}`);
  for (const id of READER_HOST_PANEL_IDS) {
    assert.ok(ids.includes(id), `${id} 不在启动器清单里: ${ids}`);
  }
});

test("ReaderAppReactPdf restores and persists reading mode with a sourceViewOnly guard", () => {
  const app = readerSource(
    "../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx",
  );
  assert.match(app, /modeScopeRef/);
  assert.match(app, /sourceViewOnly \? "source" : saved\?\.mode/);
  assert.match(app, /saveReaderViewState\(c\.viewStateKey, \{ mode: c\.mode \}\)/);
});

test("compare column width and reversed panes dead links are removed", () => {
  const shell = readerSource(
    "../../../../frontend/packages/reader/src/hooks/use-reader-shell.ts",
  );
  const grid = readerSource(
    "../../../../frontend/packages/reader/src/components/react-pdf/ReaderCompareGrid.tsx",
  );
  const controller = readerSource(
    "../../../../frontend/packages/reader/src/hooks/use-reader-react-controller.ts",
  );
  const app = readerSource(
    "../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx",
  );
  assert.doesNotMatch(shell, /compareColWidth|onWidthChange|comparePaneWidth/);
  assert.doesNotMatch(grid, /compareColWidth|reversePanes|is-reversed/);
  assert.doesNotMatch(controller, /compareColWidth/);
  assert.doesNotMatch(app, /compareColWidth|reversePanes/);
});
