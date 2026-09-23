// 可拖动悬浮工具钮（FAB）：点击展开菜单，拖动改位置。
// 菜单：摘录 / Markdown / AI + 批注 + 下载（原始 / 译文 / 对照）。
// Markdown / AI 与 ReaderAssistantDock 同行为（workspace 辅助面板），
// 展示行与 registry.ts READER_TOOLS 对齐。
//
// 拖拽定位、菜单/外点关闭、三路下载 busy 与菜单展示行已拆到同目录子模块：
// use-reader-fab-position / use-reader-fab-menu / use-reader-fab-downloads /
// ReaderFabMenu。主组件只组合行为并保留 ReaderFab 导出名。

import { Bookmark, FileCode2, Highlighter, Sparkles, StickyNote, X } from "lucide-react";
import { useCallback, useId, useRef, type ReactElement } from "react";
import type { ReaderDownloadContext } from "../../hooks/use-reader-session.js";
import type { ReaderToolId } from "../../tools/registry.js";
import { READER_TOOLS } from "../../tools/registry.js";
import { useReaderContext } from "./reader-context.js";
import { useReaderFabDownloads } from "./use-reader-fab-downloads.js";
import { useReaderFabMenu } from "./use-reader-fab-menu.js";
import { useReaderFabPosition } from "./use-reader-fab-position.js";
import {
  ReaderFabDownloadSection,
  ReaderFabMenuHeader,
  ReaderFabToolRow,
} from "./ReaderFabMenu.js";

/** FAB 菜单里的工具 id：除注册表工具外，两种批注由 FAB 直接开合本地面板。 */
export type ReaderFabToolId = ReaderToolId | "notes" | "ai-notes";

const TOOL_ICONS: Record<ReaderFabToolId, typeof Bookmark> = {
  favorites: Bookmark,
  markdown: FileCode2,
  ai: Sparkles,
  notes: StickyNote,
  "ai-notes": Highlighter,
};

const AUXILIARY_TOOLS = READER_TOOLS;

/** 两种批注：自己写的，和 agent 标的。
 *
 * ## 为什么 AI 批注非要有这一行
 *
 * 它的数据链路早就通了（轮询 → 页面上的记号 → 点开弹窗），但**界面上没有任何
 * 东西说明它存在**：没让 agent 标过的时候一片空白，标过了也得正好翻到那一页才
 * 看得见。一本两百页的论文里有五条批注，等于没有。
 *
 * 所以这一行的主要作用不是"打开面板"，是**让人知道有这回事**，以及有几条。
 * 角标为 0 时行还在（空状态会教你怎么生成），这一点是有意的。
 *
 * ## 为什么不合进「批注」那一行
 *
 * 手写批注可改可删可导出；AI 批注是 agent 重写整份文件时一起换掉的，改了下一轮
 * 就没了。放一起的话，同一个列表里一半条目能编辑一半不能，而且分不出哪条是谁
 * 写的 —— 那比多一行糟得多。
 */
const LOCAL_TOOLS = [
  { id: "notes" as const, title: "批注", idle: "本地批注 · 导出" },
  { id: "ai-notes" as const, title: "AI 批注", idle: "agent 标在页面上" },
];

export type ReaderFabProps = {
  /** 当前打开的工具 id；null 表示都关 */
  activeTool: ReaderFabToolId | null;
  /** 本地批注数量，用于工具项 badge */
  noteCount: number;
  /** agent 批注数量。0 也要把那一行画出来 —— 它同时是这个功能的唯一入口。 */
  aiNoteCount: number;
  /** 无 job 时为 true；缺省从 reader context 取 controller.sourceOnly（不是 sourceViewOnly） */
  sourceOnly?: boolean;
  onToggleTool: (id: ReaderFabToolId) => void;
  /** 缺省时从 reader context 取 controller.download */
  download?: ReaderDownloadContext;
};

export function ReaderFab(props: ReaderFabProps): ReactElement {
  const { activeTool, noteCount, aiNoteCount, onToggleTool } = props;
  const ctx = useReaderContext();
  const sourceOnly = props.sourceOnly ?? ctx?.sourceOnly ?? false;
  const download = props.download ?? ctx?.download;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const { open, setOpen, closeMenu, toggleMenu } = useReaderFabMenu(rootRef);
  const { pos, openUp, onPointerDown, onPointerMove, onPointerUp } = useReaderFabPosition({
    onDragStart: closeMenu,
    onActivate: toggleMenu,
  });
  const { urls, downloadItems, busyActions, handleDownload } = useReaderFabDownloads(download);

  const handleTool = useCallback((id: ReaderFabToolId) => {
    onToggleTool(id);
    setOpen(false);
  }, [onToggleTool, setOpen]);

  return (
    <div
      ref={rootRef}
      className={`reader-fab${open ? " is-open" : ""}${openUp ? " is-open-up" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      data-reader-fab=""
    >
      {open ? (
        <div
          id={menuId}
          className="reader-fab-menu reader-floating-surface"
          role="menu"
          aria-label="阅读工具"
        >
          <ReaderFabMenuHeader onClose={closeMenu} />

          {LOCAL_TOOLS.map((tool, index) => {
            const isActive = activeTool === tool.id;
            return (
              <ReaderFabToolRow
                key={tool.id}
                index={index - 1}
                icon={TOOL_ICONS[tool.id]}
                title={tool.title}
                sub={isActive ? "关闭悬浮窗" : tool.idle}
                active={isActive}
                disabled={false}
                badge={tool.id === "notes" ? noteCount : aiNoteCount}
                onClick={() => handleTool(tool.id)}
              />
            );
          })}

          {AUXILIARY_TOOLS.map((tool, index) => {
            const Icon = TOOL_ICONS[tool.id];
            const isActive = activeTool === tool.id;
            const disabled = tool.needsJob && sourceOnly;
            let sub = isActive ? tool.subOpen : tool.subIdle;
            if (disabled) {
              sub = "需打开任务阅读";
            }
            return (
              <ReaderFabToolRow
                key={tool.id}
                index={index + 1}
                icon={Icon}
                title={tool.label}
                sub={sub}
                active={isActive}
                disabled={disabled}
                onClick={() => handleTool(tool.id)}
              />
            );
          })}

          <ReaderFabDownloadSection
            urls={urls}
            items={downloadItems}
            busyActions={busyActions}
            onDownload={handleDownload}
          />
        </div>
      ) : null}

      <button
        type="button"
        className={`reader-fab-trigger${open ? " is-open" : ""}${activeTool ? " has-active-tool" : ""}`}
        aria-label={open ? "收起工具菜单" : "打开工具菜单"}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="menu"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <span className="reader-fab-icon" aria-hidden="true">
          {open ? <X size={20} strokeWidth={2.5} /> : (
            <span className="reader-fab-dots">
              <i /><i /><i />
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
