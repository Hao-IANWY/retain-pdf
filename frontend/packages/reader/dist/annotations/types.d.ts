import { type AnnotationItem } from "../shared/content/annotations/view-model.js";
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
export declare function notesStorageKey(doc: ReaderNotesDocKey): string;
/** 这个文档的笔记还可能躺在哪些旧键里，等着被迁移。
 *
 * 只认**当前这个 job** 的键：别的 job 的笔记我们无从判断属于哪本书（localStorage
 * 里只有 job id，没有 job→document 的映射），乱合并会把两本书的笔记搅在一起。
 * 打开哪个 job 就迁哪个，多来几次自然迁完。
 */
export declare function legacyNotesStorageKeys(doc: ReaderNotesDocKey): string[];
export declare function createNoteId(): string;
export declare function readerNoteToAnnotationItem(note: ReaderNote): AnnotationItem;
export declare function sortNotes(list: ReaderNote[]): ReaderNote[];
export declare function groupNotesByPage(list: ReaderNote[]): Array<{
    page: number;
    items: ReaderNote[];
}>;
export declare function buildNotesMarkdown(title: string, list: ReaderNote[]): string;
//# sourceMappingURL=types.d.ts.map