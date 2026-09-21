// 本地持久化批注（localStorage）。不接旧 favorites API。

import {
  legacyNotesStorageKeys,
  notesStorageKey,
  sortNotes,
  type ReaderNote,
  type ReaderNotesDocKey,
} from "./types.js";

function safeParse(raw: string | null): ReaderNote[] {
  if (!raw) {
    return [];
  }
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
      return [];
    }
    return data
      .map((item) => ({
        id: `${item?.id || ""}`.trim(),
        page: Math.max(1, Math.floor(Number(item?.page) || 1)),
        pane: item?.pane === "translated" ? "translated" as const : "source" as const,
        quote: `${item?.quote || ""}`.trim(),
        note: `${item?.note || ""}`.trim(),
        createdAt: `${item?.createdAt || ""}`.trim() || new Date().toISOString(),
      }))
      .filter((item) => item.id && item.quote);
  } catch {
    return [];
  }
}

function readKey(key: string): ReaderNote[] {
  try {
    return safeParse(localStorage.getItem(key));
  } catch {
    return [];
  }
}

/** 按 id 去重合并。先来的赢 —— 调用方把「当前键」放第一个。 */
function mergeById(...lists: ReaderNote[][]): ReaderNote[] {
  const byId = new Map<string, ReaderNote>();
  for (const list of lists) {
    for (const note of list) {
      if (!byId.has(note.id)) {
        byId.set(note.id, note);
      }
    }
  }
  return sortNotes([...byId.values()]);
}

/** 写入并**读回确认**。返回 false 表示这次写没有真正落盘。
 *
 * 不是防御性编程：localStorage 满了的时候 setItem 抛异常，而迁移正是在这种时候
 * 最危险 —— 写失败却把旧键删了，笔记就永久没了。所以删旧键之前必须确认新键
 * 真的读得回来。
 */
function persist(key: string, list: ReaderNote[]): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (error) {
    console.warn("[reader-notes] persist failed", error);
    return false;
  }
  const readBack = new Set(readKey(key).map((note) => note.id));
  return list.every((note) => readBack.has(note.id));
}

/**
 * 读笔记，顺带把旧 job 键里的笔记迁移到 documentId 键。
 *
 * ## 为什么迁移在「读」里做，而不是单独一个入口
 *
 * documentId 是异步到达的，所以键会从 `…:job:x` 切到 `…:doc:y`。迁移必须在
 * **任何人观察到新键是空的之前**完成 —— 否则 UI 会先渲染出「没有笔记」，
 * 而 use-reader-annotations 的保存副作用紧接着会把那个空列表写进新键，
 * 把笔记真删了。放在 loadNotes 里，新键从第一次被读到就已经是合并后的。
 *
 * ## 顺序：写新 → 读回验证 → 删旧
 *
 * 反过来（先删旧再写新）遇到 localStorage 写失败就是永久丢数据。
 *
 * 删旧键是必须的，不是清理癖：留着的话，你删掉一条迁移过来的笔记，下次打开
 * 它会从旧键里**复活**。
 */
export function loadNotes(doc: ReaderNotesDocKey): ReaderNote[] {
  if (typeof localStorage === "undefined") {
    return [];
  }
  const key = notesStorageKey(doc);
  const current = readKey(key);
  const legacy = legacyNotesStorageKeys(doc)
    .map((legacyKey) => ({ key: legacyKey, notes: readKey(legacyKey) }))
    .filter((entry) => entry.notes.length > 0);
  if (legacy.length === 0) {
    return current;
  }

  const merged = mergeById(current, ...legacy.map((entry) => entry.notes));
  if (!persist(key, merged)) {
    // 新键没写成 —— 旧键原样留着，下次再试。宁可迁不过去，不能两头都没有。
    return merged;
  }
  for (const entry of legacy) {
    try {
      localStorage.removeItem(entry.key);
    } catch {
      // 删不掉只是会再迁一次（合并按 id 去重，重复迁移是幂等的）。
    }
  }
  return merged;
}

export function saveNotes(doc: ReaderNotesDocKey, list: ReaderNote[]): void {
  saveNotesToKey(notesStorageKey(doc), list);
}

/** 按**具体的键**保存，而不是按 doc 现算一个。
 *
 * 调用方（use-reader-annotations）把键和笔记绑在同一份 state 里：documentId
 * 异步到达时键会变，而那一瞬 state 里的笔记还属于旧键。现算键就会把旧键的笔记
 * 写进新键。
 */
export function saveNotesToKey(key: string, list: ReaderNote[]): void {
  if (typeof localStorage === "undefined") {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (error) {
    console.warn("[reader-notes] persist failed", error);
  }
}
