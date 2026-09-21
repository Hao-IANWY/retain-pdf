/** documentId 异步到达导致的存储键切换 —— 这一瞬不能丢笔记。
 *
 * 这条只有真渲染才测得出来，因为它是 effect 执行顺序的问题：
 *
 * 键从 `…:job:x` 切到 `…:doc:y` 时，「重载」和「保存」两个 effect 在同一次提交里
 * 依次跑。重载里的 setState 只是排了一次重渲染，**紧接着保存就会拿上一个键的
 * 笔记写进新键**。源码门禁看不出这个，纯函数测试也看不出这个。
 *
 * 现在键和笔记绑在同一份 state 里，保存只认 state 自带的键。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/reader.html",
  pretendToBeVisual: true,
});
for (const key of ["window", "document", "localStorage", "HTMLElement", "Element", "Event", "Node"]) {
  Object.defineProperty(globalThis, key, {
    value: dom.window[key],
    writable: true,
    configurable: true,
  });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { act } = await import("react");
const { useReaderAnnotations } = await import(
  "../../../../frontend/packages/reader/src/hooks/use-reader-annotations.ts"
);

const PREFIX = "retainpdf.reader.notes.v1:";

function note(id) {
  return {
    id,
    page: 1,
    pane: "source",
    quote: `引文 ${id}`,
    note: `笔记 ${id}`,
    createdAt: "2026-09-21T00:00:00.000Z",
  };
}

function read(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw).map((n) => n.id) : null;
}

/** 渲染 hook，返回一个能换 props 的把手。 */
function mount(initial) {
  const host = document.createElement("div");
  const root = createRoot(host);
  const seen = { api: null };
  function Probe({ doc }) {
    seen.api = useReaderAnnotations(doc);
    return null;
  }
  act(() => root.render(React.createElement(Probe, { doc: initial })));
  return {
    seen,
    rerender: (doc) => act(() => root.render(React.createElement(Probe, { doc }))),
    unmount: () => act(() => root.unmount()),
  };
}

test("documentId 晚到：旧 job 键的笔记迁过去，新键不会被写空", () => {
  localStorage.clear();
  localStorage.setItem(`${PREFIX}job:j1`, JSON.stringify([note("a"), note("b")]));

  // 第一帧只有 jobId —— documentId 还没到。
  const view = mount({ jobId: "j1", documentId: "" });
  assert.deepEqual(view.seen.api.notes.map((n) => n.id), ["a", "b"]);

  // documentId 到达，键切换。
  view.rerender({ jobId: "j1", documentId: "d1" });
  assert.deepEqual(
    view.seen.api.notes.map((n) => n.id),
    ["a", "b"],
    "键切换之后笔记不见了",
  );
  assert.deepEqual(read(`${PREFIX}doc:d1`), ["a", "b"], "新键里不是迁移过来的内容");
  assert.equal(localStorage.getItem(`${PREFIX}job:j1`), null, "旧键该在迁移后删掉");
  view.unmount();
});

test("换一本书：上一本的笔记不会被写进新书的键", () => {
  // 这是绑定 state 之前会发生的事：重载排了重渲染，保存先跑，拿旧笔记写新键。
  localStorage.clear();
  localStorage.setItem(`${PREFIX}doc:book-a`, JSON.stringify([note("a1"), note("a2")]));

  const view = mount({ jobId: "", documentId: "book-a" });
  assert.deepEqual(view.seen.api.notes.map((n) => n.id), ["a1", "a2"]);

  view.rerender({ jobId: "", documentId: "book-b" });
  assert.deepEqual(view.seen.api.notes.map((n) => n.id), [], "新书该是空的");
  // 不变量是「A 的笔记不能漏进 B」，不是「B 的键上什么都不能写」——新书渲染完
  // 保存一个空列表是正常的。第一版断言写成 `=== null`，红了但代码是对的。
  assert.deepEqual(read(`${PREFIX}doc:book-b`) ?? [], [], "上一本书的笔记被写进新书的键了");
  assert.deepEqual(read(`${PREFIX}doc:book-a`), ["a1", "a2"], "原来那本的笔记被动过了");
  view.unmount();
});

test("换回来还在", () => {
  localStorage.clear();
  localStorage.setItem(`${PREFIX}doc:book-a`, JSON.stringify([note("a1")]));
  const view = mount({ jobId: "", documentId: "book-a" });
  view.rerender({ jobId: "", documentId: "book-b" });
  view.rerender({ jobId: "", documentId: "book-a" });
  assert.deepEqual(view.seen.api.notes.map((n) => n.id), ["a1"]);
  view.unmount();
});

test("键没变时不重载 —— 正在编辑的笔记不会被磁盘内容顶掉", () => {
  localStorage.clear();
  const view = mount({ jobId: "j1", documentId: "d1" });
  act(() => {
    view.seen.api.addFromQuote({ page: 1, pane: "source", quote: "刚选的文字" });
  });
  assert.equal(view.seen.api.notes.length, 1);
  // 同样的 doc 再渲染一次（父组件重渲染是常态）。
  view.rerender({ jobId: "j1", documentId: "d1" });
  assert.equal(view.seen.api.notes.length, 1, "重渲染把新加的笔记冲掉了");
  view.unmount();
});
