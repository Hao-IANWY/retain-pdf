import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/reader.html?job_id=job-notes",
  pretendToBeVisual: true,
});
for (const key of [
  "window",
  "document",
  "location",
  "localStorage",
  "HTMLElement",
  "Element",
  "Event",
  "Node",
]) {
  Object.defineProperty(globalThis, key, {
    value: dom.window[key],
    writable: true,
    configurable: true,
  });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = false;

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { renderToStaticMarkup } = await import("react-dom/server");
const { ReaderSelectionToolbar } = await import(
  "../../../../frontend/packages/reader/src/components/react-pdf/ReaderSelectionToolbar.tsx"
);
const { ReaderNotesPanel } = await import(
  "../../../../frontend/packages/reader/src/components/react-pdf/ReaderNotesPanel.tsx"
);
const { useReaderAnnotations } = await import(
  "../../../../frontend/packages/reader/src/hooks/use-reader-annotations.ts"
);

const TEXT_SELECTION = {
  selectionType: "text",
  quote: "hello annotation world",
  page: 3,
  pane: "source",
  rect: { left: 100, top: 200, width: 120, height: 18 },
};

function findButton(host, label) {
  return [...host.querySelectorAll("button")].find(
    (button) => (button.textContent || "").includes(label),
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFor(predicate, description) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (predicate()) return;
    await wait(10);
  }
  assert.fail(`等待超时：${description}`);
}

test("选择工具条：有 onAddNote 时出现「添加批注」，复制/问 AI/取消保持", () => {
  const withNote = renderToStaticMarkup(React.createElement(ReaderSelectionToolbar, {
    selection: TEXT_SELECTION,
    onDismiss() {},
    onAskAi() {},
    onAddNote() {},
  }));
  assert.match(withNote, /添加批注/);
  assert.match(withNote, />复制</);
  assert.match(withNote, /问 AI/);
  assert.match(withNote, /aria-label="取消选区"/);

  const withoutNote = renderToStaticMarkup(React.createElement(ReaderSelectionToolbar, {
    selection: TEXT_SELECTION,
    onDismiss() {},
    onAskAi() {},
  }));
  assert.doesNotMatch(withoutNote, /添加批注/);
  assert.match(withoutNote, />复制</);
});

// harness 同时给了 jobId 和 documentId，所以键是 doc 的那个 —— 笔记挂在文档身份
// 上（sha256(文件字节)），不挂在 job 上，否则同一本书重译一次笔记就没了。
const NOTES_KEY = "retainpdf.reader.notes.v1:doc:doc-notes";

function NotesHarness({ selection, onExportCopy }) {
  const [open, setOpen] = React.useState(false);
  const annotations = useReaderAnnotations(
    { jobId: "job-notes", documentId: "doc-notes" },
    { onAfterAdd: () => setOpen(true) },
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(ReaderSelectionToolbar, {
      selection,
      onDismiss() {},
      onAskAi() {},
      onAddNote(input) {
        annotations.addFromQuote(input);
      },
    }),
    React.createElement(ReaderNotesPanel, {
      open,
      groups: annotations.groups,
      count: annotations.count,
      onClose() {
        setOpen(false);
      },
      onJump() {},
      onUpdateNote: annotations.updateNote,
      onRemove: annotations.remove,
      onExport: async () => {
        const ok = await annotations.exportMarkdown("Demo");
        onExportCopy(ok);
        return ok;
      },
    }),
  );
}

test("选中文字添加批注：面板打开、按页分组、删除后清空", async () => {
  localStorage.clear();
  const host = dom.window.document.createElement("div");
  dom.window.document.body.appendChild(host);
  const root = createRoot(host);
  let exportOk = null;
  root.render(React.createElement(NotesHarness, {
    selection: TEXT_SELECTION,
    onExportCopy: (ok) => {
      exportOk = ok;
    },
  }));
  await waitFor(() => findButton(host, "添加批注") !== undefined, "工具条渲染");
  await waitFor(
    () => localStorage.getItem(NOTES_KEY) !== null,
    "批注挂载副作用就绪",
  );

  findButton(host, "添加批注").dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await waitFor(
    () => (host.querySelector(".reader-notes-quote")?.textContent || "") === TEXT_SELECTION.quote,
    "批注条目渲染",
  );
  assert.match(host.querySelector(".reader-notes-group-title")?.textContent || "", /第 3 页/);
  assert.match(host.querySelector(".reader-notes-count")?.textContent || "", /1 条/);
  const stored = JSON.parse(localStorage.getItem(NOTES_KEY));
  assert.equal(stored.length, 1);
  assert.equal(stored[0].page, 3);
  assert.equal(stored[0].pane, "source");

  findButton(host, "删除").dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await waitFor(
    () => (host.querySelector(".reader-notes-count")?.textContent || "") === "0 条",
    "删除后计数归零",
  );
  assert.equal(host.querySelector(".reader-notes-quote"), null);
  root.unmount();
  host.remove();
});

test("导出 Markdown：把分组批注复制到剪贴板", async () => {
  localStorage.clear();
  let copied = "";
  Object.defineProperty(globalThis, "navigator", {
    value: { clipboard: { writeText: async (text) => { copied = text; } } },
    writable: true,
    configurable: true,
  });
  const host = dom.window.document.createElement("div");
  dom.window.document.body.appendChild(host);
  const root = createRoot(host);
  root.render(React.createElement(NotesHarness, {
    selection: TEXT_SELECTION,
    onExportCopy() {},
  }));
  await waitFor(() => findButton(host, "添加批注") !== undefined, "工具条渲染");
  await waitFor(
    () => localStorage.getItem(NOTES_KEY) !== null,
    "批注挂载副作用就绪",
  );
  findButton(host, "添加批注").dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await waitFor(
    () => (host.querySelector(".reader-notes-count")?.textContent || "") === "1 条",
    "批注写入",
  );

  findButton(host, "导出 Markdown").dispatchEvent(
    new dom.window.MouseEvent("click", { bubbles: true }),
  );
  await waitFor(() => copied.includes("Demo"), "剪贴板写入批注 Markdown");
  assert.match(copied, /# Demo 批注/);
  assert.match(copied, /## 第 3 页/);
  assert.match(copied, /> hello annotation world/);
  root.unmount();
  host.remove();
});

test("ReaderAppReactPdf 把批注接到选择工具条与面板", () => {
  const source = readFileSync(
    new URL("../../../../frontend/packages/reader/src/ReaderAppReactPdf.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /useReaderAnnotations\(/);
  assert.match(source, /<ReaderNotesPanel/);
  assert.match(source, /onAddNote=\{addNoteFromSelection\}/);
  assert.match(source, /groups=\{annotations\.groups\}/);
  assert.match(source, /onJump=\{jumpToNote\}/);

  const toolbar = readFileSync(
    new URL(
      "../../../../frontend/packages/reader/src/components/react-pdf/ReaderSelectionToolbar.tsx",
      import.meta.url,
    ),
    "utf8",
  );
  assert.match(toolbar, /onAddNote\?: \(input: ReaderSelectionNoteInput\) => void/);
  // 这里原来还钉着 `onAddNote({ page: selection.page, pane: selection.pane, … })`
  // 的字面写法。它守不住任何东西：换个变量名就红，而「存下来的页码/栏别对不对」
  // 它一个字都没验。真正守这件事的是本文件上面那条 —— 点「添加批注」后从
  // localStorage 里对 page/pane —— 以及 reader-selection-pane-switch 里
  // 「切到原文后批注跟着切」那条。浮条改成能切栏之后，这个字面量也已经是错的。
});
