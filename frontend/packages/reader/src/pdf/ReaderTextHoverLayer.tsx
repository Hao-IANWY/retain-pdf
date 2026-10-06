import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  projectReaderRegion,
  readerRegionContent,
  readerRegionKindForRegion,
  type ReaderRegionHighlight,
  type ReaderRegionRect,
} from "../shared/data/reader-regions.js";

export type ReaderTextHoverTarget = {
  itemId: string;
  highlight: ReaderRegionHighlight;
  rect: ReaderRegionRect;
};

export function projectReaderTextHoverTargets(
  regions: readonly ReaderRegionHighlight[],
  width: number,
  height: number,
): ReaderTextHoverTarget[] {
  return regions.flatMap((highlight) => {
    if (readerRegionKindForRegion(highlight.region) !== "text") return [];
    const rect = projectReaderRegion(highlight, width, height);
    return rect ? [{ itemId: highlight.itemId, highlight, rect }] : [];
  });
}

export function hitTestReaderTextHoverTarget(
  targets: readonly ReaderTextHoverTarget[],
  x: number,
  y: number,
): ReaderTextHoverTarget | null {
  let best: ReaderTextHoverTarget | null = null;
  let bestArea = Number.POSITIVE_INFINITY;
  for (const target of targets) {
    const { rect } = target;
    if (x < rect.left || x > rect.left + rect.width || y < rect.top || y > rect.top + rect.height) {
      continue;
    }
    const area = rect.width * rect.height;
    if (area < bestArea) {
      best = target;
      bestArea = area;
    }
  }
  return best;
}

/**
 * 写剪贴板。`navigator.clipboard` 在非安全上下文（局域网 IP 打开的 http 页面）里不存在，
 * 退回 execCommand("copy")；两条都失败返回 false，不假装成功。
 */
export async function copyReaderText(text: string): Promise<boolean> {
  const value = `${text || ""}`;
  if (!value.trim()) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // 落到下面的兜底
  }
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export const READER_TEXT_HOVER_COPY_CLASS = "reader-text-hover-copy";

type CopyState = "idle" | "copied" | "failed";

/**
 * 悬停内容块：红色虚线框 + 右上角「复制」。
 *
 * 对照阅读时左右两栏一起画（悬停的 itemId 由 ReaderCompareGrid 共享），左栏复制原文、
 * 右栏复制译文 —— 这是 4.1.x 旧引擎里最常用的那个交互，React 引擎替换时丢了，只剩一个
 * 灰色细框和「文字」标签，复制要先点块、再在浮条里点。
 */
export function ReaderTextHoverLayer({
  target,
  pane = "source",
  copiedSignal = 0,
}: {
  target: ReaderTextHoverTarget | null;
  pane?: "source" | "translated";
  /** 双击整块复制成功时递增：框上的按钮跟着显示「已复制」。 */
  copiedSignal?: number;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const itemId = target?.itemId || "";
  // 换了块，「已复制」必须跟着消 —— 否则它在说另一段的话。
  useEffect(() => setState("idle"), [itemId]);
  useEffect(() => {
    if (!copiedSignal) return undefined;
    setState("copied");
    const timer = window.setTimeout(() => setState("idle"), 1200);
    return () => window.clearTimeout(timer);
  }, [copiedSignal]);
  if (!target) return null;
  const text = readerRegionContent(target.highlight.region, pane);
  const handleCopy = async (event: ReactMouseEvent<HTMLButtonElement>) => {
    // 不让这次点击冒到页面上，被当成「点块」再弹出浮条。
    event.preventDefault();
    event.stopPropagation();
    const ok = await copyReaderText(text);
    setState(ok ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), 1200);
  };
  return (
    <div className="reader-text-hover-layer">
      <div
        className="reader-text-hover-frame"
        data-reader-text-hover-id={target.itemId}
        style={target.rect}
      >
        {text ? (
          <button
            type="button"
            className={READER_TEXT_HOVER_COPY_CLASS}
            data-copy-state={state}
            aria-label={pane === "translated" ? "复制这段译文" : "复制这段原文"}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={handleCopy}
          >
            {state === "copied" ? "已复制" : state === "failed" ? "复制失败" : "复制"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
