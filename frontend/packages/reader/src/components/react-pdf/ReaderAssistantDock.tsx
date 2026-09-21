import { FileCode2, Sparkles, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactElement } from "react";
import { getReaderAdapters } from "../../adapters.js";
import { READER_HOST_PANELS } from "./reader-host-panels.js";
import { useReaderContext } from "./reader-context.js";
import type { ReaderAssistantPanel } from "./reader-assistant-types.js";

// 既有 import 兼容：类型真值已移至叶子文件。
export type { ReaderAssistantPanel } from "./reader-assistant-types.js";

const BASE_PANELS = [
  { id: "markdown", label: "Markdown", short: "MD", Icon: FileCode2 },
  { id: "ai", label: "AI 问答", short: "AI", Icon: Sparkles },
] as const;

type DockTab = { id: string; label: string; short: string; Icon: LucideIcon };

/** 宿主没注册对应渲染器的槽位面板不显示 tab。
 *
 * 点了没反应的 tab 比没有这个功能更糟 —— 用户会以为是坏了。
 *
 * 面板清单来自 READER_HOST_PANELS，不在这里逐个写 if —— 那份表同时也是宿主
 * 渲染面板壳的依据，两边同源才不会出现「tab 在、内容没有」。
 */
function panelsFor(): readonly DockTab[] {
  const adapters = getReaderAdapters();
  return [
    ...BASE_PANELS,
    ...READER_HOST_PANELS.filter(
      (panel) => typeof adapters?.[panel.adapterKey] === "function",
    ),
  ];
}

export type ReaderAssistantDockProps = {
  active: ReaderAssistantPanel | null;
  /** 缺省时从 reader context 的 assistant actions 取 */
  onSelect?: (panel: ReaderAssistantPanel) => void;
  onClose?: () => void;
};

/**
 * Markdown 和 AI 是阅读辅助工具，不参与 PDF 阅读模式的选择。
 * 关闭时只显示安静的右侧工具栏；打开后由 Dock 顶栏负责切换与关闭。
 */
export function ReaderAssistantDock(props: ReaderAssistantDockProps): ReactElement {
  const ctx = useReaderContext();
  const { active } = props;
  const onSelect = props.onSelect ?? ctx?.assistant.select ?? (() => {});
  const onClose = props.onClose ?? ctx?.assistant.close ?? (() => {});
  const PANELS = panelsFor();
  if (!active) {
    return (
      <nav className="reader-assistant-rail" aria-label="阅读辅助工具">
        {PANELS.map(({ id, label, short, Icon }) => (
          <button
            key={id}
            type="button"
            className="reader-assistant-rail-button"
            aria-label={`打开${label}`}
            title={label}
            onClick={() => onSelect(id as never)}
          >
            <Icon size={18} strokeWidth={2} aria-hidden />
            <span>{short}</span>
          </button>
        ))}
      </nav>
    );
  }

  return (
    <header className="reader-assistant-dock-header">
      <div className="reader-assistant-dock-tabs" role="tablist" aria-label="阅读辅助面板">
        {PANELS.map(({ id, label, Icon }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`reader-assistant-dock-tab${selected ? " is-active" : ""}`}
              onClick={() => onSelect(id as never)}
            >
              <Icon size={15} strokeWidth={2.15} aria-hidden />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="reader-assistant-dock-close"
        aria-label="关闭阅读辅助面板"
        title="关闭辅助面板"
        onClick={onClose}
      >
        <X size={16} strokeWidth={2.25} aria-hidden />
      </button>
    </header>
  );
}
