/** 顶栏的三路下载：原文 / 对照 / 译文。
 *
 * ## 为什么在顶栏而不是原来的圆钮菜单里
 *
 * 原来它是可拖动圆钮（FAB）菜单的最后一段，而圆钮被
 * `.is-assistant-open .reader-fab { opacity: 0; pointer-events: none }` 一条
 * CSS 在任何 dock 面板开着时整个吃掉 —— 开着 Markdown 就下不了 PDF，而且看不
 * 出为什么。顶栏这一组和「关闭回主页」同一层，永远在，也永远不被面板遮住。
 *
 * ## 为什么不做成一个下拉
 *
 * 三个而已，直接摊开比多一层点击好；而且 disabled 的那个要能把原因说出来
 * （title），藏进下拉里就得先点开才知道「译文还没生成」。
 */
import { Columns2, FileText, Languages } from "lucide-react";
import type { ReactElement } from "react";

import {
  READER_DOWNLOAD_ACTIONS,
  readerDownloadDisabledReason,
  trimReaderDownloadString,
} from "../../external.js";
import { useReaderContext } from "./reader-context.js";
import {
  useReaderDownloads,
  type ReaderDownloadAction,
} from "./use-reader-downloads.js";
import type { ReaderDownloadContext } from "../../hooks/use-reader-session.js";

const ICONS: Record<ReaderDownloadAction, typeof FileText> = {
  source: FileText,
  sideBySide: Columns2,
  translated: Languages,
};

const SHORT: Record<ReaderDownloadAction, string> = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文",
};

export type ReaderDownloadActionsProps = {
  /** 缺省时从 reader context 取 controller.download */
  download?: ReaderDownloadContext;
};

export function ReaderDownloadActions(props: ReaderDownloadActionsProps): ReactElement {
  const ctx = useReaderContext();
  const download = props.download ?? ctx?.download;
  const { urls, downloadItems, busyActions, handleDownload } = useReaderDownloads(download);

  return (
    <div className="reader-download-actions" role="group" aria-label="下载 PDF">
      {downloadItems.map((action) => {
        const meta = READER_DOWNLOAD_ACTIONS[action];
        const url = trimReaderDownloadString(urls[action]);
        const busy = busyActions.has(action);
        const enabled = Boolean(url) && !busy;
        const reason = enabled ? "" : readerDownloadDisabledReason(action, urls);
        const Icon = ICONS[action];
        return (
          <button
            key={action}
            type="button"
            id={`reader-download-${action}`}
            className={`reader-download-action${busy ? " is-busy" : ""}`}
            disabled={!enabled}
            aria-label={enabled ? `下载${meta.label}` : reason}
            title={enabled ? `下载${meta.label}` : reason}
            onClick={() => void handleDownload(action)}
          >
            <Icon size={15} strokeWidth={2.1} aria-hidden />
            <span className="reader-download-action-label">{SHORT[action]}</span>
          </button>
        );
      })}
    </div>
  );
}
