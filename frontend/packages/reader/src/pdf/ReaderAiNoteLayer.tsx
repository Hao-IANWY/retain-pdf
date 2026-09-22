/** AI 批注在 PDF 页面上的标记层。
 *
 * ## 页面上只画记号，永远不画正文
 *
 * 这是密度的根本解。批注正文只在点开的弹窗里 —— 无论 agent 标了 3 条还是 30 条，
 * 页面本身永远保持可读。把文字铺在页面上的做法在几条之后就没法看了，而这个功能
 * 的全部价值是「读的时候不被打断」。
 *
 * ## 用点击，不用悬停
 *
 * 标记密集时悬停会疯狂闪烁，而且触屏上根本没有悬停。
 *
 * ## 定位复用已有的投影
 *
 * `projectReaderRegion(highlight, width, height)` 把 bbox 换算成页面内的 CSS 矩形，
 * 它已经处理了 `bottom_left` / `top_left` 两种原点。记号贴在块的左边缘外侧，不盖住
 * 正文 —— 盖住正文的标注是在帮倒忙。
 *
 * 一条批注在原文栏和译文栏各自定位，是因为 highlight 是按 pane 解析出来的：锚点
 * 是语义的（block_id），不是某张 PDF 的坐标。英文原文上标的疑问，中文译文的同一
 * 个块上也有。
 */
import { projectReaderRegion, type ReaderRegionHighlight } from "../shared/data/reader-regions.js";
import type { AiNote } from "../shared/data/ai-notes.js";

export type ReaderAiNoteTarget = {
  note: AiNote;
  highlight: ReaderRegionHighlight;
};

type ReaderAiNoteLayerProps = {
  width: number;
  height: number;
  targets: readonly ReaderAiNoteTarget[];
  activeNoteId: string | null;
  onSelect: (note: AiNote, rect: { left: number; top: number; width: number; height: number }) => void;
};

const KIND_LABEL: Record<AiNote["kind"], string> = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注",
};

/** 记号贴在块左边缘外侧的宽度。够点得到，又不盖正文。 */
const MARK_W = 10;

export function ReaderAiNoteLayer({
  width,
  height,
  targets,
  activeNoteId,
  onSelect,
}: ReaderAiNoteLayerProps) {
  const marks = targets.flatMap(({ note, highlight }) => {
    const rect = projectReaderRegion(highlight, width, height);
    return rect ? [{ note, rect }] : [];
  });
  if (!marks.length) return null;

  return (
    <div className="reader-ai-note-layer" aria-label="AI 批注">
      {marks.map(({ note, rect }) => (
        <button
          key={note.id}
          type="button"
          className={
            `reader-ai-note-mark is-${note.kind} is-level-${note.level}`
            + (note.weak ? " is-weak" : "")
            + (activeNoteId === note.id ? " is-active" : "")
          }
          data-reader-ai-note-id={note.id}
          style={{
            // 贴在块的左外侧：盖住正文的标注是在帮倒忙。左边越界时退回块内。
            left: Math.max(0, rect.left - MARK_W - 2),
            top: rect.top,
            width: MARK_W,
            height: Math.max(12, rect.height),
          }}
          aria-label={`${KIND_LABEL[note.kind]}：${note.text}`}
          title={note.text}
          onClick={(event) => {
            event.stopPropagation();
            // 视口坐标：弹窗渲染在页面树之外（要盖住所有 PDF 页），只能用 fixed。
            const box = event.currentTarget.getBoundingClientRect();
            onSelect(note, {
              left: box.left, top: box.top, width: box.width, height: box.height,
            });
          }}
        >
          <span className="sr-only">{note.text}</span>
        </button>
      ))}
    </div>
  );
}
