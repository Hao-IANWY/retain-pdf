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

export type AiNoteRef = AiNoteAnchor & { label: string };

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

const KINDS: readonly AiNoteKind[] = ["question", "warning", "link", "term", "note"];

/** 类别的中文名，页面标记层和索引面板共用。
 *
 * 原来两处各写了一份：页面上是「疑问 / 注意 / 关联 / 术语 / 批注」，面板里是
 * 「存疑 / 当心 / 跨页 / 术语 / 笔记」—— 同一条批注在两个地方叫不同的名字，而
 * 面板那份的注释还写着「和页面上那层同一套词，否则对不上号」。放数据层是因为
 * kind 这个枚举本来就归这里管：加一个类别时，漏改的那一处会直接编译不过。 */
export const AI_NOTE_KIND_LABEL: Record<AiNoteKind, string> = {
  question: "存疑",
  warning: "当心",
  link: "跨页",
  term: "术语",
  note: "笔记",
};

function trimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseAnchor(value: unknown): AiNoteAnchor | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as { block_id?: unknown; page_idx?: unknown };
  const blockId = trimmed(raw.block_id);
  if (!blockId) return null;
  const pageIdx = typeof raw.page_idx === "number" && Number.isFinite(raw.page_idx)
    ? Math.max(0, Math.floor(raw.page_idx))
    : null;
  return { blockId, pageIdx };
}

function parseLevel(value: unknown): 1 | 2 | 3 {
  const level = Math.round(Number(value));
  if (level === 1 || level === 2) return level;
  // 默认 3（细节）而不是 1：模型漏写 level 时不该自动占用「必看」的配额。
  return 3;
}

/** 从任意 JSON 里取出能用的部分。整份都不可用时返回 null（调用方当「还没有」）。 */
export function parseAiNotes(payload: unknown): AiNotesDoc | null {
  if (!payload || typeof payload !== "object") return null;
  const raw = (payload as { notes?: unknown }).notes;
  if (!Array.isArray(raw)) return null;

  const notes: AiNote[] = [];
  const seen = new Set<string>();
  raw.forEach((candidate, index) => {
    if (!candidate || typeof candidate !== "object") return;
    const item = candidate as Record<string, unknown>;
    const anchor = parseAnchor(item.anchor);
    const text = trimmed(item.text);
    // 没有锚点就画不出来也跳不过去；没有正文就是个空标记。
    if (!anchor || !text) return;
    const id = trimmed(item.id) || `ai-note-${index}`;
    if (seen.has(id)) return;
    seen.add(id);

    const kindRaw = trimmed(item.kind) as AiNoteKind;
    const refs: AiNoteRef[] = Array.isArray(item.refs)
      ? item.refs.flatMap((candidateRef) => {
          const refAnchor = parseAnchor(candidateRef);
          if (!refAnchor) return [];
          const label = trimmed((candidateRef as { label?: unknown })?.label);
          return [{ ...refAnchor, label: label || refAnchor.blockId }];
        })
      : [];

    notes.push({
      id,
      anchor,
      kind: KINDS.includes(kindRaw) ? kindRaw : "note",
      level: parseLevel(item.level),
      text,
      refs,
      weak: refs.length === 0,
    });
  });

  if (notes.length === 0) return null;
  return { notes, weakCount: notes.filter((note) => note.weak).length };
}

/** 没写页码的批注归到这一档。
 *
 * 不能归 0 —— 那会显示成「第 1 页」，点了跳到错的地方，而且看起来完全正常。
 * 用最大值让它天然排在最后，调用方自己决定这一组叫什么。
 */
export const AI_NOTE_NO_PAGE = Number.MAX_SAFE_INTEGER;

/** 按页分组，页码升序，没页码的落在最后一组。
 *
 * 放在这里而不是面板里：这是纯逻辑，混进 .tsx 之后想验一条「没写页码」的
 * 数据就得先起一个组件。
 */
export function groupAiNotesByPage(
  notes: readonly AiNote[],
): Array<{ page: number; items: AiNote[] }> {
  const byPage = new Map<number, AiNote[]>();
  for (const note of notes) {
    const key = note.anchor.pageIdx ?? AI_NOTE_NO_PAGE;
    const bucket = byPage.get(key);
    if (bucket) bucket.push(note);
    else byPage.set(key, [note]);
  }
  return [...byPage.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([page, items]) => ({ page, items }));
}

/** 按 level 过滤。`maxLevel` 3 = 全部，1 = 只看必看。 */
export function notesUpToLevel(notes: readonly AiNote[], maxLevel: number): AiNote[] {
  return notes.filter((note) => note.level <= maxLevel);
}
