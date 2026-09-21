import { type ReaderNote, type ReaderNotesDocKey } from "./types.js";
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
export declare function loadNotes(doc: ReaderNotesDocKey): ReaderNote[];
export declare function saveNotes(doc: ReaderNotesDocKey, list: ReaderNote[]): void;
/** 按**具体的键**保存，而不是按 doc 现算一个。
 *
 * 调用方（use-reader-annotations）把键和笔记绑在同一份 state 里：documentId
 * 异步到达时键会变，而那一瞬 state 里的笔记还属于旧键。现算键就会把旧键的笔记
 * 写进新键。
 */
export declare function saveNotesToKey(key: string, list: ReaderNote[]): void;
//# sourceMappingURL=storage.d.ts.map