// 详情「翻译」Tab：发起 / 重新翻译表单。
// 从原 TranslateWorkspacePanel 抽出；书已在馆，无需 WorkflowPanel 上传瓦片。

import { PageSpecInput } from "../PageSpecInput.js";
import type { ReactNode } from "react";
import { Check, Languages } from "lucide-react";
import { btn } from "../ui.jsx";

export type BookTranslateLaunchFormProps = {
  canTranslate: boolean;
  readerAvailable?: boolean;
  isActive?: boolean;
  statusTone?: string;
  rangeOn: boolean;
  pageSpec: string;
  pageCount?: number;
  busy?: string;
  error?: string;
  ocrReuse?: { jobId: string } | null;
  /** 与「翻译整本」同排的附加动作（例如「仅 OCR」按钮），统一成一行。 */
  extraActions?: ReactNode;
  onRangeOnChange: (value: boolean) => void;
  onPageSpecChange: (value: string) => void;
  onTranslate: () => void;
};

export function BookTranslateLaunchForm({
  canTranslate,
  readerAvailable = false,
  isActive = false,
  statusTone = "",
  rangeOn,
  pageSpec,
  pageCount,
  busy = "",
  error = "",
  ocrReuse = null,
  extraActions = null,
  onRangeOnChange,
  onPageSpecChange,
  onTranslate,
}: BookTranslateLaunchFormProps) {
  return (
    <div className="book-translate-launch-form space-y-2.5">
      {error ? (
        <p
          id="book-detail-translate-error"
          className="rounded-md border border-foreground/20 bg-muted/40 px-3 py-2 text-xs text-foreground"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {canTranslate ? (
        <div className="book-detail-processing-actions flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {ocrReuse ? (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted px-2 py-1 text-[11px] font-medium text-foreground"
                data-ocr-reuse="true"
                title={`复用 OCR 任务 ${ocrReuse.jobId}`}
              >
                <Check className="size-3" aria-hidden="true" />
                复用已有 OCR
              </span>
            ) : null}
            <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-muted-foreground/40"
                checked={rangeOn}
                onChange={(e) => onRangeOnChange(e.target.checked)}
              />
              指定页码
            </label>
            {rangeOn ? (
              <PageSpecInput
                  id="book-detail-translate-pages"
                  label="要翻译的页码"
                  value={pageSpec}
                  pageCount={pageCount}
                  onChange={onPageSpecChange}
                />
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {extraActions}
            <button
              id="book-detail-translate-btn"
              type="button"
              className={btn("default")}
              disabled={Boolean(busy)}
              onClick={onTranslate}
            >
              <Languages className="mr-1 size-4" aria-hidden="true" />
              {busy === "translate"
                ? "提交中…"
                : rangeOn
                  ? "翻译选定页码"
                  : statusTone === "failed"
                    ? "重新翻译整本"
                    : "翻译整本"}
            </button>
          </div>
        </div>
      ) : extraActions ? (
        <div className="book-detail-processing-actions flex flex-wrap items-center justify-end gap-2">
          {readerAvailable ? <p className="book-detail-processing-hint">左侧可直接对照阅读</p> : null}
          {extraActions}
        </div>
      ) : readerAvailable ? (
        <p className="book-detail-processing-hint">左侧可直接对照阅读</p>
      ) : isActive ? (
        null
      ) : null}
    </div>
  );
}
