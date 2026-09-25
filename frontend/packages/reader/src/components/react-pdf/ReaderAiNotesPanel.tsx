/** agent 标在页面上的批注，列一份索引。
 *
 * ## 为什么需要它
 *
 * 这个功能的数据链路早就通了：轮询 `<job>/ai/notes.v1.json` → 页面上画记号 →
 * 点开弹窗看正文。但**界面上没有任何东西说明它存在**。
 *
 * 结果是两头都不成立：没让 agent 标过的时候，你看不出有这回事；标过了，一本
 * 两百页的论文里散着五条，你得正好翻到那一页才撞见。等于没有。
 *
 * 所以这个面板的第一职责不是"更好地读批注"，是**让人知道有几条、在哪**。
 * 空的时候也要开得出来，空状态里写清楚怎么生成 —— 那才是入口。
 *
 * ## 和手写批注面板分开
 *
 * 手写批注可改可删可导出；这些是 agent 重写整份 `notes.v1.json` 时一起换掉的，
 * 你改了下一轮就没了。合成一个列表的话，一半条目能编辑一半不能，而且分不出
 * 哪条是谁写的。
 *
 * ## 密度控制用 level，不用条数
 *
 * `level` 是 agent 自己标的：1 必看 / 2 有用 / 3 细节。默认只显示 1+2 ——
 * 模型很容易把"这段讲了 X"这种复述也写进来（数据层用 `weak` 标着，见
 * shared/data/ai-notes.ts 顶部）。想看全的人点一下切到全部，而不是反过来让
 * 所有人先被细节淹一遍。
 */
import { useState, type ReactElement } from "react";

import {
  AI_NOTE_KIND_LABEL,
  AI_NOTE_NO_PAGE,
  groupAiNotesByPage,
  notesUpToLevel,
  type AiNotesDoc,
} from "../../shared/data/ai-notes.js";
import { ReaderPanelShell } from "./ReaderPanelShell.js";

export type ReaderAiNotesPanelProps = {
  open: boolean;
  doc: AiNotesDoc | null;
  onClose: () => void;
  onJump: (anchor: { page_idx?: number; block_id?: string }) => void;
};

/** 默认挡掉 level 3。见文件头：不让所有人先被细节淹一遍。 */
const DEFAULT_MAX_LEVEL = 2;

export function ReaderAiNotesPanel({
  open,
  doc,
  onClose,
  onJump,
}: ReaderAiNotesPanelProps): ReactElement {
  const [maxLevel, setMaxLevel] = useState(DEFAULT_MAX_LEVEL);
  const all = doc?.notes ?? [];
  const visible = notesUpToLevel(all, maxLevel);
  const groups = groupAiNotesByPage(visible);

  return (
    <ReaderPanelShell
      id="reader-ai-notes-panel"
      open={open}
      ariaLabel="AI 批注"
      className="is-pane-right"
      onClose={onClose}
      toolbar={(
        <>
          <span className="reader-notes-count">{visible.length} 条</span>
          {all.length > visible.length ? (
            <button
              type="button"
              className="reader-notes-export"
              onClick={() => setMaxLevel(3)}
            >
              显示全部 {all.length} 条
            </button>
          ) : null}
          {maxLevel === 3 && all.length > 0 ? (
            <button
              type="button"
              className="reader-notes-export"
              onClick={() => setMaxLevel(DEFAULT_MAX_LEVEL)}
            >
              只看重点
            </button>
          ) : null}
        </>
      )}
    >
      {all.length === 0 ? (
        // 这段是这个功能唯一的说明书。写不清楚的话，面板开出来是空的，和"功能
        // 坏了"长得一模一样。
        <p className="reader-notes-empty">
          还没有 AI 批注。在终端里让 fx 标一遍，比如：
          <code>把第 3 节的隐含前提和跨页依赖标到 ./notes.v1.json 上</code>
          标完这里会自己出现，不用刷新。
        </p>
      ) : (
        groups.map((group) => (
          <section key={group.page} className="reader-notes-group">
            <h3 className="reader-notes-group-title">
              {group.page === AI_NOTE_NO_PAGE ? "未标页码" : `第 ${group.page + 1} 页`}
            </h3>
            {group.items.map((note) => (
              <button
                key={note.id}
                type="button"
                className="reader-ai-note-row"
                data-kind={note.kind}
                data-weak={note.weak ? "" : undefined}
                onClick={() =>
                  onJump({ page_idx: note.anchor.pageIdx ?? undefined, block_id: note.anchor.blockId })
                }
              >
                <span className="reader-ai-note-kind">{AI_NOTE_KIND_LABEL[note.kind]}</span>
                <span className="reader-ai-note-text">{note.text}</span>
                {note.refs.length > 0 ? (
                  // refs 是这份数据里最有价值的部分（见 shared/data/ai-notes.ts：
                  // 指向别处的批注才不是复述）。列表里先让人看见有没有。
                  <span className="reader-ai-note-refs">↗ {note.refs.length} 处关联</span>
                ) : null}
              </button>
            ))}
          </section>
        ))
      )}
    </ReaderPanelShell>
  );
}
