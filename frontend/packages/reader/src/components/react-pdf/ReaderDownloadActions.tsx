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
import { Columns2, Download, FileText, Languages } from "lucide-react";
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
      {/* 这个 ⤓ 是给眼睛看的组标签，不是按钮。
        *
        * 没有它的时候这一组和顶栏中间的模式页签**用的是同一套图标**
        * （FileText / Columns2 / Languages）、词也几乎一样（原文/对照/译文
        * vs 源文件/对照/翻译文件），两组都写着「对照」，挨在一条栏上。一个切
        * 视图、一个下文件，看不出区别 —— 用户报的就是这个。
        *
        * 为什么不改成「按当前模式下载」的单个按钮：≤900px 时文字标签会被裁掉
        * 只剩图标（见 chrome.css 的 900 断点），单按钮方案在窄屏反而更糊；而且
        * 三路摊开是为了让 disabled 的那一路能就地说出原因。
        *
        * 为什么不去掉各自的图标：同样是那条 900 断点 —— 去掉就变成三个一模一样
        * 的按钮。所以留图标，给整组加前缀。
        * 读屏走的是 role=group 的 aria-label，所以这里 aria-hidden。 */}
      <span className="reader-download-actions-prefix" aria-hidden>
        <Download size={14} strokeWidth={2.2} />
      </span>
      {downloadItems.map((action) => {
        const meta = READER_DOWNLOAD_ACTIONS[action];
        const url = trimReaderDownloadString(urls[action]);
        const busy = busyActions.has(action);
        const enabled = Boolean(url) && !busy;
        const reason = enabled ? "" : readerDownloadDisabledReason(action, urls);
        const Icon = ICONS[action];
        return (
          // 外面这层 span 是为了**让「为什么点不动」这句话真的弹得出来**。
          //
          // disabled 的按钮在主流浏览器上不派发鼠标事件，挂在它自己身上的
          // title 永远不显示 —— 原因只有读屏拿得到（aria-label 还在），鼠标
          // 用户看到的就是一个灰掉的按钮。窄屏（≤900px）下文字标签还会被裁成
          // 1px 只留图标，那时连「这是哪一路」都没了。
          // span 不是 disabled，hover 照样触发。
          <span
            key={action}
            className="reader-download-action-slot"
            title={enabled ? `下载${meta.label}` : reason}
          >
            <button
              type="button"
              id={`reader-download-${action}`}
              className={`reader-download-action${busy ? " is-busy" : ""}`}
              disabled={!enabled}
              aria-label={enabled ? `下载${meta.label}` : reason}
              onClick={() => void handleDownload(action)}
            >
              <Icon size={15} strokeWidth={2.1} aria-hidden />
              <span className="reader-download-action-label">{SHORT[action]}</span>
            </button>
          </span>
        );
      })}
    </div>
  );
}
