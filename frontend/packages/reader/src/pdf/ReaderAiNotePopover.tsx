/** 点开一条 AI 批注。
 *
 * 正文只出现在这里 —— 页面上只有记号（见 ReaderAiNoteLayer）。
 *
 * ## refs 是这个弹窗真正的价值
 *
 * 有价值的批注都指向别处：「这个符号第 12 页才定义」「这个假设第 4 节被推翻」。
 * 所以引用不是装饰，是**可点的跳转目标** —— 看到断言的同时能立刻去看依据。
 *
 * 没有 refs 的批注多半是复述（原文就在旁边，总结它没有意义）。这一版不拿这个
 * 过滤，只在弹窗里说明一句，先看看模型到底给不给 refs。
 */
import { useEffect, useRef } from "react";

import type { AiNote } from "../shared/data/ai-notes.js";

const KIND_LABEL: Record<AiNote["kind"], string> = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注",
};

export type ReaderAiNotePopoverProps = {
  note: AiNote;
  /** 记号在视口里的位置，弹窗贴着它开。 */
  anchorRect: { left: number; top: number; width: number; height: number };
  onJump: (anchor: { page_idx?: number; block_id?: string }) => void;
  onClose: () => void;
};

export function ReaderAiNotePopover({
  note,
  anchorRect,
  onJump,
  onClose,
}: ReaderAiNotePopoverProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Esc 关闭。弹窗盖在 PDF 上，没有退路的话只能去点那个小记号。
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // 点外面关闭。用 pointerdown 而不是 click：click 会被 PDF 文字选择吃掉。
  useEffect(() => {
    const onDown = (event: PointerEvent) => {
      const node = ref.current;
      if (!node || node.contains(event.target as Node)) return;
      // 点另一个记号时，由那个记号自己换掉当前批注，这里不抢着关。
      if ((event.target as HTMLElement)?.closest?.(".reader-ai-note-mark")) return;
      onClose();
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={`reader-ai-note-popover is-${note.kind}`}
      role="dialog"
      aria-label={`${KIND_LABEL[note.kind]}批注`}
      style={{
        left: anchorRect.left + anchorRect.width + 8,
        top: anchorRect.top,
      }}
    >
      <header className="reader-ai-note-popover-head">
        <span className={`reader-ai-note-kind is-${note.kind}`}>{KIND_LABEL[note.kind]}</span>
        <button
          type="button"
          className="reader-ai-note-popover-close"
          aria-label="关闭批注"
          onClick={onClose}
        >
          ×
        </button>
      </header>
      <p className="reader-ai-note-popover-text">{note.text}</p>
      {note.refs.length > 0 ? (
        <ul className="reader-ai-note-refs">
          {note.refs.map((ref_, index) => (
            <li key={`${ref_.blockId}-${index}`}>
              <button
                type="button"
                className="reader-ai-note-ref"
                onClick={() => {
                  onJump({ page_idx: ref_.pageIdx ?? undefined, block_id: ref_.blockId });
                  onClose();
                }}
              >
                {ref_.label}
                {ref_.pageIdx != null ? <span className="reader-ai-note-ref-page">第 {ref_.pageIdx + 1} 页</span> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        // 不隐藏这条：没有依据的批注该让人看得出来，自己判断信不信。
        <p className="reader-ai-note-popover-weak">没有给出依据（refs），多半只是复述原文</p>
      )}
    </div>
  );
}
