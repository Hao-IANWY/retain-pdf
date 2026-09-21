// 新阅读器批注状态：本地列表 + CRUD，不依赖旧抽屉/favorites 链路。

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buildNotesMarkdown,
  createNoteId,
  groupNotesByPage,
  sortNotes,
  type ReaderNote,
  type ReaderNotePane,
  type ReaderNotesDocKey,
} from "../annotations/types.js";
import { loadNotes, saveNotesToKey } from "../annotations/storage.js";
import { notesStorageKey } from "../annotations/types.js";

export type ReaderAnnotationsApi = {
  notes: ReaderNote[];
  groups: Array<{ page: number; items: ReaderNote[] }>;
  addFromQuote: (input: {
    page: number;
    pane: ReaderNotePane;
    quote: string;
    note?: string;
  }) => ReaderNote | null;
  updateNote: (id: string, note: string) => void;
  remove: (id: string) => void;
  exportMarkdown: (title?: string) => Promise<boolean>;
  count: number;
};

export function useReaderAnnotations(
  doc: ReaderNotesDocKey,
  options: { onAfterAdd?: () => void } = {},
): ReaderAnnotationsApi {
  const docKey = useMemo(
    () => ({
      jobId: `${doc.jobId || ""}`.trim(),
      documentId: `${doc.documentId || ""}`.trim(),
    }),
    [doc.jobId, doc.documentId],
  );

  // 存储键和笔记**绑在同一份 state 里**，不是两个独立的值。
  //
  // 这是为了堵住一个很难查的窗口：documentId 是异步到达的，键会从 `…:job:x`
  // 切到 `…:doc:y`。两个 effect 在同一次提交里依次跑，「重载」里的 setNotes 只是
  // 排了一次重渲染，紧接着「保存」就会拿**上一个键的笔记**写进新键。绑在一起之后
  // 保存副作用只认 state 自带的键，写的永远是同一个键的数据。
  //
  // 键变了才重载：loadNotes 会顺带做迁移，重复调用是幂等的，但没必要每次渲染都跑。
  const [state, setState] = useState<{ key: string; notes: ReaderNote[] }>(() => ({
    key: notesStorageKey(docKey),
    notes: loadNotes(docKey),
  }));
  const notes = state.notes;
  const setNotes = useCallback(
    (update: ReaderNote[] | ((prev: ReaderNote[]) => ReaderNote[])) => {
      setState((prev) => ({
        key: prev.key,
        notes: typeof update === "function" ? update(prev.notes) : update,
      }));
    },
    [],
  );
  const onAfterAdd = options.onAfterAdd;

  const storageKey = notesStorageKey(docKey);
  // 文档切换时重载
  useEffect(() => {
    setState((prev) => (
      prev.key === storageKey ? prev : { key: storageKey, notes: loadNotes(docKey) }
    ));
  }, [docKey, storageKey]);

  useEffect(() => {
    // 按 state 自带的键写，不按当前 docKey 写 —— 两者在键切换那一瞬不一致，
    // 而那正是会丢数据的时刻。
    saveNotesToKey(state.key, state.notes);
  }, [state]);

  const addFromQuote = useCallback((input: {
    page: number;
    pane: ReaderNotePane;
    quote: string;
    note?: string;
  }) => {
    const quote = `${input.quote || ""}`.trim();
    if (!quote) {
      return null;
    }
    const item: ReaderNote = {
      id: createNoteId(),
      page: Math.max(1, Math.floor(Number(input.page) || 1)),
      pane: input.pane === "translated" ? "translated" : "source",
      quote,
      note: `${input.note || ""}`.trim(),
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => sortNotes([item, ...prev]));
    onAfterAdd?.();
    return item;
  }, [onAfterAdd]);

  const updateNote = useCallback((id: string, note: string) => {
    const next = `${note || ""}`.trim();
    setNotes((prev) => prev.map((item) => (
      item.id === id ? { ...item, note: next } : item
    )));
  }, []);

  const remove = useCallback((id: string) => {
    setNotes((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const exportMarkdown = useCallback(async (title = "") => {
    const md = buildNotesMarkdown(title, notes);
    try {
      await navigator.clipboard?.writeText?.(md);
      return true;
    } catch (error) {
      console.error("[reader-notes] copy failed", error);
      return false;
    }
  }, [notes]);

  const groups = useMemo(() => groupNotesByPage(notes), [notes]);

  return {
    notes,
    groups,
    addFromQuote,
    updateNote,
    remove,
    exportMarkdown,
    count: notes.length,
  };
}
