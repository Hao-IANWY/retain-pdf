/** `<job>/ai/notes.v1.json` —— agent 标在 PDF 页面上的批注。
 *
 *     {"schema": "retainpdf_ai_notes_v1",
 *      "notes": [
 *        {"id": "n1", "kind": "warning", "level": 1,
 *         "anchor": {"page_idx": 3, "block_id": "p004-b0012"},
 *         "text": "这里默认了数据 i.i.d.，但第 4 节实验不满足",
 *         "refs": [{"page_idx": 7, "block_id": "p008-b0003", "label": "第 4 节实验设置"}]}
 *      ]}
 *
 * ## 为什么 refs 这么重要
 *
 * 总结性批注天然是废话 —— 原文就在旁边三厘米处。有价值的只有原文**没说**的东西：
 * 跨页连接、隐含前提、术语首次定义。这三类有个共同特征：**它们都指向别的地方**。
 * 而「这段讲了 X」这种复述指不出第二个 block。
 *
 * 所以 `refs`（引用的另一个 block）是个可以用代码识别的废话过滤器，而且它顺带是
 * 个功能：点「这个假设第 7 页被推翻」里的引用，直接跳过去。
 *
 * **但这一版不拿它过滤，只标记。** 没有 refs 的批注照样画，只是画成空心。理由是
 * 还没有任何真实数据说明模型会不会给 refs —— 先看见再决定要不要卡。数字通过
 * `weakCount` 暴露出来。指标没验之前就上强制，是在给自己造一个「看起来没生成」
 * 的假故障。
 *
 * ## 这份文件是 agent 写的，形状不保证
 *
 * 一律往「少画一条」偏：没有 block_id 的丢掉（画不出来，也跳不过去），
 * 认不出的 kind 退回中性色，level 超范围就钳到范围内。
 */
export type AiNoteKind = "question" | "warning" | "link" | "term" | "note";
export type AiNoteAnchor = {
    blockId: string;
    pageIdx: number | null;
};
export type AiNoteRef = AiNoteAnchor & {
    label: string;
};
export type AiNote = {
    id: string;
    anchor: AiNoteAnchor;
    kind: AiNoteKind;
    /** 1 = 必看，2 = 有用，3 = 细节。密度控制用这个。 */
    level: 1 | 2 | 3;
    text: string;
    refs: AiNoteRef[];
    /** 没有 refs —— 多半是复述。这一版只标记，不过滤，见文件头。 */
    weak: boolean;
};
export type AiNotesDoc = {
    notes: AiNote[];
    /** 没有 refs 的条数。先量再决定要不要卡掉它们。 */
    weakCount: number;
};
/** 从任意 JSON 里取出能用的部分。整份都不可用时返回 null（调用方当「还没有」）。 */
export declare function parseAiNotes(payload: unknown): AiNotesDoc | null;
/** 按 level 过滤。`maxLevel` 3 = 全部，1 = 只看必看。 */
export declare function notesUpToLevel(notes: readonly AiNote[], maxLevel: number): AiNote[];
//# sourceMappingURL=ai-notes.d.ts.map