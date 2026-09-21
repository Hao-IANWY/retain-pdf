/** 笔记存储键从 jobId 改成 documentId，以及旧键的迁移。
 *
 * 这一片是**会丢用户数据**的地方，所以每条失败路径都要有测试，不能只测顺利情况。
 *
 * 背景：原来的键是 jobId 优先，同一本书重新翻译一次就换了 job，键跟着换，你自己
 * 写的笔记当场消失（还在旧键里，但没有任何入口看得到）。本机数据里同一个 PDF
 * 跑过 7 次的就有，所以这不是假想问题。
 *
 * documentId 是 sha256(文件字节)（retain-core/src/models/library.rs），同一份 PDF
 * 永远同一个值。
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  legacyNotesStorageKeys,
  notesStorageKey,
} from "../../../../frontend/packages/reader/src/annotations/types.ts";

const PREFIX = "retainpdf.reader.notes.v1:";

function note(id, page = 1) {
  return {
    id,
    page,
    pane: "source",
    quote: `引文 ${id}`,
    note: `笔记 ${id}`,
    createdAt: `2026-09-2${page}T00:00:00.000Z`,
  };
}

/** 每个用例一个干净的 localStorage。`failOn` 让写入在指定键上抛异常（配额满）。 */
function installStorage({ failOn } = {}) {
  const map = new Map();
  globalThis.localStorage = {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => {
      if (failOn && failOn(key)) {
        throw new DOMException("QuotaExceededError");
      }
      map.set(key, value);
    },
    removeItem: (key) => map.delete(key),
  };
  return map;
}

/** storage.ts 在模块作用域外读 localStorage，所以每次重新 import 也无所谓 ——
 * 但它读的是调用时的 globalThis.localStorage，装好再 import 即可。 */
async function storage() {
  return await import(
    "../../../../frontend/packages/reader/src/annotations/storage.ts"
  );
}

test("documentId 是第一身份，jobId 只是兜底", () => {
  // 原来是反的。反着来的后果就是重译一次笔记全丢。
  assert.equal(notesStorageKey({ jobId: "j1", documentId: "d1" }), `${PREFIX}doc:d1`);
  assert.equal(notesStorageKey({ documentId: "d1" }), `${PREFIX}doc:d1`);
  assert.equal(notesStorageKey({ jobId: "j1" }), `${PREFIX}job:j1`);
  assert.equal(notesStorageKey({}), `${PREFIX}anonymous`);
});

test("同一份 PDF 的不同 job 落在同一个键上", () => {
  // 这条就是这次改动的全部意义。
  const a = notesStorageKey({ jobId: "20260916234056-b343d1", documentId: "sha-x" });
  const b = notesStorageKey({ jobId: "20260917011730-70d8a7", documentId: "sha-x" });
  assert.equal(a, b);
});

test("只把当前 job 的键当作待迁移的旧键", () => {
  // localStorage 里只有 job id，没有 job→document 的映射。把所有 job 键都合并
  // 进来会把两本不同的书搅在一起。
  assert.deepEqual(legacyNotesStorageKeys({ jobId: "j1", documentId: "d1" }), [`${PREFIX}job:j1`]);
  assert.deepEqual(legacyNotesStorageKeys({ jobId: "j1" }), [], "还没有 documentId 时没有旧键可迁");
  assert.deepEqual(legacyNotesStorageKeys({ documentId: "d1" }), []);
});

test("旧 job 键里的笔记会迁到 document 键，并且旧键被删掉", async () => {
  const map = installStorage();
  const { loadNotes } = await storage();
  map.set(`${PREFIX}job:j1`, JSON.stringify([note("a"), note("b", 2)]));

  const loaded = loadNotes({ jobId: "j1", documentId: "d1" });
  assert.deepEqual(loaded.map((n) => n.id), ["a", "b"]);
  assert.ok(map.has(`${PREFIX}doc:d1`), "没写进新键");
  assert.ok(!map.has(`${PREFIX}job:j1`), "旧键没删 —— 删掉的笔记下次会复活");
});

test("删掉一条迁移过来的笔记，它不会复活", async () => {
  // 这就是上一条为什么必须删旧键：留着的话下次 loadNotes 又把它合并回来。
  const map = installStorage();
  const { loadNotes, saveNotes } = await storage();
  map.set(`${PREFIX}job:j1`, JSON.stringify([note("a"), note("b", 2)]));

  const doc = { jobId: "j1", documentId: "d1" };
  loadNotes(doc);
  saveNotes(doc, [note("a")]);        // 用户删掉了 b
  assert.deepEqual(loadNotes(doc).map((n) => n.id), ["a"], "b 复活了");
});

test("两边都有笔记时合并，不是覆盖", async () => {
  const map = installStorage();
  const { loadNotes } = await storage();
  map.set(`${PREFIX}doc:d1`, JSON.stringify([note("new")]));
  map.set(`${PREFIX}job:j1`, JSON.stringify([note("old", 2)]));

  const ids = loadNotes({ jobId: "j1", documentId: "d1" }).map((n) => n.id);
  assert.deepEqual(ids.sort(), ["new", "old"], "有一边被覆盖了");
});

test("重复迁移是幂等的", async () => {
  const map = installStorage();
  const { loadNotes } = await storage();
  map.set(`${PREFIX}job:j1`, JSON.stringify([note("a")]));
  const doc = { jobId: "j1", documentId: "d1" };
  loadNotes(doc);
  loadNotes(doc);
  assert.deepEqual(loadNotes(doc).map((n) => n.id), ["a"], "重复迁移把笔记翻倍了");
});

test("新键写不进去时，旧键必须原样留着", async () => {
  // localStorage 满了。这时候「先删旧再写新」就是永久丢数据。
  const map = installStorage({ failOn: (key) => key.includes(":doc:") });
  const { loadNotes } = await storage();
  map.set(`${PREFIX}job:j1`, JSON.stringify([note("a")]));

  const loaded = loadNotes({ jobId: "j1", documentId: "d1" });
  assert.deepEqual(loaded.map((n) => n.id), ["a"], "读出来的内容不该受影响");
  assert.ok(map.has(`${PREFIX}job:j1`), "写失败却把旧键删了 —— 笔记永久没了");
  assert.ok(!map.has(`${PREFIX}doc:d1`));
});

test("documentId 还没到达时不迁移，也不清空", async () => {
  // documentId 是异步来的。这一帧的键还是 job 键，正常读，什么都别动。
  const map = installStorage();
  const { loadNotes } = await storage();
  map.set(`${PREFIX}job:j1`, JSON.stringify([note("a")]));

  assert.deepEqual(loadNotes({ jobId: "j1" }).map((n) => n.id), ["a"]);
  assert.ok(map.has(`${PREFIX}job:j1`), "还没到迁移的时候就把旧键删了");
});

test("坏数据当作没有，不抛错也不连累旧键", async () => {
  const map = installStorage();
  const { loadNotes } = await storage();
  map.set(`${PREFIX}doc:d1`, "{ 不是 JSON");
  map.set(`${PREFIX}job:j1`, JSON.stringify([note("a")]));
  assert.deepEqual(loadNotes({ jobId: "j1", documentId: "d1" }).map((n) => n.id), ["a"]);
});

test("saveNotesToKey 写的是给它的键，不是现算的", async () => {
  // 键切换那一瞬，state 里的笔记还属于旧键。现算键会把旧键的笔记写进新键。
  const map = installStorage();
  const { saveNotesToKey } = await storage();
  saveNotesToKey(`${PREFIX}job:j1`, [note("a")]);
  assert.ok(map.has(`${PREFIX}job:j1`));
  assert.ok(!map.has(`${PREFIX}doc:d1`));
});
