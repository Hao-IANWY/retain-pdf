// PDF 选择浮条：正文走原生选区，公式/表格/图片走 OCR 结构选择层。

import { useEffect, useState } from "react";
import { Check, Copy, Image, Sigma, Sparkles, Table2, Type, X } from "lucide-react";
import type { ReaderSelection } from "../../shared/data/reader-regions.js";
import type { ReaderPaneId } from "../../shared/types/reader-dom.js";
import {
  READER_PANE_LABEL,
  resolveReaderSelectionView,
} from "./reader-selection-view.js";
import { READER_SCROLL_SHELL_CLASS } from "../../pdf/reader-dom-contract.js";

/** 紧凑工具条约 320px 宽（复制 / 问 AI / 取消 + 原文·译文 切换），
 * 避免覆盖大段正文。原文／译文那一对按钮是**顶掉**了原来那个只能看不能点的
 * 栏别文字，不是加在它旁边，所以只贵了 40px 左右；切过去要看的那段文本走下面
 * 的气泡（纵向），宽度不再涨。 */
export const TOOLBAR_HALF = 190;
const GUTTER = 16;

/** PDF 栏的宽度，不是视口宽度。
 *
 * dock 打开时视口右半边是 AI 面板，滚动壳被 `right: var(--reader-ai-split-width)`
 * 收窄（assistant-dock.css）。`--reader-ai-split-width` 的值是 `50vw` 这样的
 * 相对量，getComputedStyle 读自定义属性拿到的是原样字符串而不是像素，所以这里
 * 量元素而不是读 token。壳左边贴 0，量出来的宽度直接就是可用的 left 上界。
 */
export function readerColumnWidth(): number {
  const fallback = typeof window === "undefined" ? 800 : window.innerWidth;
  if (typeof document === "undefined") return fallback;
  const shell = document.querySelector(`.${READER_SCROLL_SHELL_CLASS}`);
  const width = shell?.getBoundingClientRect().width ?? 0;
  // jsdom 里 getBoundingClientRect 全是 0；量不到就退回视口宽度。
  return width > 0 ? width : fallback;
}

/** 把工具条夹进 PDF 栏。
 *
 * 原来夹的是 `window.innerWidth` —— dock 打开、选区又靠右时，工具条被允许画到
 * 分栏线右边，也就是糊在 AI 面板上。
 */
export function clampSelectionToolbarLeft(midX: number, columnWidth: number): number {
  const min = GUTTER + TOOLBAR_HALF;
  const max = columnWidth - GUTTER - TOOLBAR_HALF;
  // 栏比工具条还窄时夹不住（min > max）。取栏中心：宁可两头对称溢出，也别
  // 因为 Math.min/Math.max 的先后顺序把它甩到栏外去。
  if (max < min) return columnWidth / 2;
  return Math.min(Math.max(min, midX), max);
}

export type ReaderSelectionToolbarProps = {
  selection: ReaderSelection | null;
  onDismiss: () => void;
  onAskAi?: (selection: ReaderSelection) => void;
};

export async function copyReaderSelectionText(value: string): Promise<void> {
  const text = `${value || ""}`;
  if (!text) throw new Error("empty selection");
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    // Clipboard permission can be unavailable in a local desktop webview.
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("copy failed");
}

export function ReaderSelectionToolbar({
  selection,
  onDismiss,
  onAskAi,
}: ReaderSelectionToolbarProps) {
  const [copied, setCopied] = useState(false);
  // null = 跟着选区所在那一栏。换一个选区就回到 null：上一段切到过原文，不该让
  // 下一段也默认显示原文。
  const [viewPane, setViewPane] = useState<ReaderPaneId | null>(null);
  const selectionKey = selection
    ? selection.selectionType === "text"
      ? `${selection.pane}:${selection.page}:${selection.quote}`
      : `${selection.region.itemId}:${selection.pane}`
    : "";
  useEffect(() => setViewPane(null), [selectionKey]);
  // 切了栏文本就换了，「已复制」必须跟着消 —— 否则它在说另一段的话。
  useEffect(() => setCopied(false), [selectionKey, viewPane]);

  if (!selection) {
    return null;
  }

  const view = resolveReaderSelectionView(selection, viewPane);

  const vh = typeof window !== "undefined" ? window.innerHeight : 600;
  const midX = selection.rect.left + selection.rect.width / 2;
  const left = clampSelectionToolbarLeft(midX, readerColumnWidth());

  // 优先选区上方；空间不够则翻到下方。展开了对照气泡时卡片高得多，headroom
  // 也得跟着涨 —— 按 72 判断会把整张卡片顶到视口上边之外。
  const preferAbove = selection.rect.top > (view.showPeek ? 220 : 72);
  const top = preferAbove
    ? Math.max(12, selection.rect.top - 8)
    : Math.min(vh - 12, selection.rect.top + selection.rect.height + 8);
  const place = preferAbove ? "above" : "below";

  const kind = view.kind;
  const kindLabel = kind === "formula" ? "公式"
    : kind === "table" ? "表格"
      : kind === "figure" ? "图片"
        : kind === "text" ? "文字" : "区域";
  const copyValue = view.copyValue;
  const KindIcon = kind === "formula" ? Sigma
    : kind === "table" ? Table2
      : kind === "text" ? Type : Image;

  return (
    <div
      className={`reader-sel-pop reader-sel-pop--${place} reader-sel-pop--region`}
      style={{ left, top }}
      role="toolbar"
      aria-label="选区操作"
      onPointerDown={(event) => {
        // 点击工具条不能先折叠 PDF.js 的原生文字选区，否则 selectionchange
        // 会在 click 之前卸载按钮，复制与问 AI 都无法触发。
        event.preventDefault();
      }}
    >
      <div className="reader-sel-pop-card reader-floating-surface">
        <div className="reader-sel-pop-row">
          <div className="reader-sel-pop-context">
            <KindIcon size={15} strokeWidth={2.1} aria-hidden />
            <span>{kindLabel}</span>
            <span className="reader-sel-pop-context-divider" aria-hidden>·</span>
            {view.canSwitch ? (
              <span className="reader-sel-pop-panes" role="group" aria-label="看这段的原文或译文">
                {(["source", "translated"] as const).map((pane) => (
                  <button
                    key={pane}
                    type="button"
                    className={`reader-sel-pop-pane${view.pane === pane ? " is-active" : ""}`}
                    aria-pressed={view.pane === pane}
                    onClick={() => setViewPane(pane)}
                  >
                    {READER_PANE_LABEL[pane]}
                  </button>
                ))}
              </span>
            ) : (
              // 两侧拿不到各自的文本时不画开关 —— 画一个点了不动的按钮比没有更糟。
              <span>{READER_PANE_LABEL[selection.pane]}</span>
            )}
            <span className="reader-sel-pop-context-divider" aria-hidden>·</span>
            <span>{view.page} 页</span>
          </div>

          <div className="reader-sel-pop-actions">
            {copyValue ? (
              <button
                type="button"
                className="reader-sel-pop-btn reader-sel-pop-btn--primary"
                onClick={async () => {
                  try {
                    await copyReaderSelectionText(copyValue);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1400);
                  } catch (error) {
                    console.warn("[reader-selection] copy failed", error);
                  }
                }}
              >
                {copied ? <Check size={15} strokeWidth={2.4} aria-hidden /> : <Copy size={15} strokeWidth={2.2} aria-hidden />}
                <span>{copied ? "已复制" : kind === "formula" ? "复制 LaTeX" : "复制"}</span>
              </button>
            ) : (
              <span className="reader-sel-pop-selection-hint">已选择图片</span>
            )}
            {onAskAi ? (
              // 问 AI 交的是原选区，不跟着上面的切换走：askSelectedRegion 会把
              // 文档切到选区所在那一栏，跟着切等于人只想瞄一眼原文，阅读位置却
              // 被搬走了。
              <button
                type="button"
                className="reader-sel-pop-btn reader-sel-pop-btn--secondary"
                onClick={() => onAskAi(selection)}
              >
                <Sparkles size={15} strokeWidth={2.2} aria-hidden />
                <span>问 AI</span>
              </button>
            ) : null}
            <button
              type="button"
              className="reader-sel-pop-btn reader-sel-pop-btn--ghost"
              onClick={onDismiss}
              aria-label="取消选区"
              title="取消"
            >
              <X size={15} strokeWidth={2.5} aria-hidden />
            </button>
          </div>
        </div>
        {view.showPeek ? (
          // 只在看「另一栏」时展开：看的就是页面上那一栏时再抄一遍是噪声。
          <p className="reader-sel-pop-peek" data-reader-peek-pane={view.pane}>{view.text}</p>
        ) : null}
      </div>
      <span className="reader-sel-pop-caret" aria-hidden="true" />
    </div>
  );
}
