// 右栏：错误提示 + 删除确认（ConfirmDialog 二次确认）。

import { useState } from "react";
import { ConfirmDialog } from "@/ui/components/confirm-dialog.js";
import { Trash2 } from "lucide-react";

/**
 * @param {object} props
 * @param {string} [props.error]
 * @param {string|boolean} props.busy
 * @param {() => void} props.onDelete
 * @param {string} [props.title] 确认框展示的书名
 */
export function DeleteFooterPanel({
  error,
  busy,
  onDelete,
  title = "",
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const bookName = `${title || ""}`.trim();
  return (
    <>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
      <div className="book-detail-delete-panel border-t border-border/30 pt-3">
        <button
          id="book-detail-delete-btn"
          type="button"
          disabled={Boolean(busy)}
          onClick={() => setConfirmOpen(true)}
          className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/25 hover:bg-muted hover:text-foreground disabled:opacity-55"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          删除
        </button>
        <ConfirmDialog
          id="book-detail-delete-confirm"
          title="删除书籍"
          description={bookName ? `确定删除「${bookName}」吗？关联的任务与文件将一并删除，无法恢复。` : "确定删除这本书吗？关联的任务与文件将一并删除，无法恢复。"}
          confirmLabel="删除"
          tone="danger"
          level="nested"
          open={confirmOpen}
          pending={busy === "delete"}
          onOpenChange={(next) => { if (!next) setConfirmOpen(false); }}
          onConfirm={() => { setConfirmOpen(false); onDelete(); }}
        />
      </div>
    </>
  );
}
