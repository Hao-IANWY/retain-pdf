// 新阅读器批注模型（与旧 favorites / selection-favorites 无关）
//
// 两套批注模型已收敛：排序/分组/Markdown 导出的唯一实现是
// shared/content/annotations/view-model.ts。本文件只保留本地注记的领域类型与
// 持久化键，并把 ReaderNote 适配成共享视图（见 readerNoteToAnnotationItem）。
//
// 页码约定：ReaderNote.page 是 1-based（与 PDF 页脚、面板「第 N 页」一致）；
// 共享视图 AnnotationItem.pageIdx 是 0-based（与后端 page_idx 一致）。
// 两者只在 readerNoteToAnnotationItem 这一处换算，导出/UI 展示统一用 1-based。

import {
  buildAnnotationsMarkdown,
  groupByPageAndCreatedAt,
  sortByPageAndCreatedAt,
  type AnnotationItem,
} from "../shared/content/annotations/view-model.js";

export type ReaderNotePane = "source" | "translated";

export type ReaderNote = {
  id: string;
  /** 1-based 页码（面向人的约定；共享视图里会 -1 成 0-based pageIdx） */
  page: number;
  pane: ReaderNotePane;
  quote: string;
  note: string;
  createdAt: string;
};

export type ReaderNotesDocKey = {
  jobId?: string;
  documentId?: string;
};

/** 本地注记的存储键。**以 documentId（= sha256(文件字节)）为第一身份。**
 *
 * 原来是 jobId 优先。后果是：同一本书重新翻译一次就换了 job，键跟着换，**你自己
 * 写的笔记当场消失**（还在旧键里，但没有任何入口能看到）。这不是理论问题 ——
 * 本机数据里同一个 PDF 跑过 7 次的就有。
 *
 * documentId 是内容哈希（retain-core/src/models/library.rs：「文档:图书馆一等
 * 公民,document_id = sha256(文件字节)」），同一份 PDF 永远同一个值，这才是笔记
 * 该挂的身份。
 *
 * 注意 `document.v1.json` 里那个同名字段**不是**这个东西 —— 它等于 job_id。
 * 别拿它当文档身份。
 *
 * jobId 只剩兜底：documentId 是异步到达的（见 hooks/reader-session/job-identity
 * 里 documentId 初始为 ""），在它到达前先用 job 键，到达后迁移过去，
 * 见 storage.ts 的 loadNotes。
 */
export function notesStorageKey(doc: ReaderNotesDocKey): string {
  const documentId = `${doc.documentId || ""}`.trim();
  if (documentId) {
    return `${NOTES_KEY_PREFIX}doc:${documentId}`;
  }
  const job = `${doc.jobId || ""}`.trim();
  if (job) {
    return `${NOTES_KEY_PREFIX}job:${job}`;
  }
  return `${NOTES_KEY_PREFIX}anonymous`;
}

const NOTES_KEY_PREFIX = "retainpdf.reader.notes.v1:";

/** 这个文档的笔记还可能躺在哪些旧键里，等着被迁移。
 *
 * 只认**当前这个 job** 的键：别的 job 的笔记我们无从判断属于哪本书（localStorage
 * 里只有 job id，没有 job→document 的映射），乱合并会把两本书的笔记搅在一起。
 * 打开哪个 job 就迁哪个，多来几次自然迁完。
 */
export function legacyNotesStorageKeys(doc: ReaderNotesDocKey): string[] {
  const job = `${doc.jobId || ""}`.trim();
  if (!job) {
    return [];
  }
  const jobKey = `${NOTES_KEY_PREFIX}job:${job}`;
  return jobKey === notesStorageKey(doc) ? [] : [jobKey];
}

export function createNoteId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ReaderNote → 共享批注视图。两套模型唯一的页码换算点：page(1-based) - 1。
export function readerNoteToAnnotationItem(note: ReaderNote): AnnotationItem {
  return {
    pageIdx: Number(note.page) - 1,
    quoteText: note.quote,
    note: note.note,
    createdAt: note.createdAt,
  };
}

export function sortNotes(list: ReaderNote[]): ReaderNote[] {
  return sortByPageAndCreatedAt<ReaderNote>(list, (note) => note.page);
}

export function groupNotesByPage(list: ReaderNote[]): Array<{ page: number; items: ReaderNote[] }> {
  return groupByPageAndCreatedAt<ReaderNote>(list, (note) => note.page)
    .map((group) => ({ page: group.pageIdx, items: group.items }));
}

// 导出复用共享实现，格式与「摘录/服务端批注」的 Markdown 导出一致。
export function buildNotesMarkdown(title: string, list: ReaderNote[]): string {
  return buildAnnotationsMarkdown({
    title,
    annotations: list.map(readerNoteToAnnotationItem),
  });
}
