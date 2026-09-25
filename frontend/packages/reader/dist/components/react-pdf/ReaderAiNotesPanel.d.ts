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
import { type ReactElement } from "react";
import { type AiNotesDoc } from "../../shared/data/ai-notes.js";
export type ReaderAiNotesPanelProps = {
    open: boolean;
    doc: AiNotesDoc | null;
    onClose: () => void;
    onJump: (anchor: {
        page_idx?: number;
        block_id?: string;
    }) => void;
};
export declare function ReaderAiNotesPanel({ open, doc, onClose, onJump, }: ReaderAiNotesPanelProps): ReactElement;
//# sourceMappingURL=ReaderAiNotesPanel.d.ts.map