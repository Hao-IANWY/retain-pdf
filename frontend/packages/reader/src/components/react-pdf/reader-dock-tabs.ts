/** dock 的 tab 清单 —— 阅读页**唯一**的面板启动器。
 *
 * ## 为什么这是纯函数，而不是 dock 组件里的一段 JSX
 *
 * 「每个面板都进得去」这件事必须能被测到，而测一段 JSX 要么起 DOM 要么对源码
 * 做正则 —— 后者在实现改个变量名之后照样绿。做成纯函数，门禁就能直接把
 * READER_ASSISTANT_PANEL_IDS 和这里返回的 id 集合对账。
 *
 * ## 为什么 hasAdapter 是参数
 *
 * 宿主没注册渲染器的槽位面板不给 tab（点了没反应的 tab 比没有这个功能更糟）。
 * 把这个判断收成入参，门禁就能在不碰全局适配器注册表的情况下拿到「全都注册了」
 * 那一支 —— 否则测到的永远是 5 个 base，8 个面板的那条断言等于没写。
 */
import type { LucideIcon } from "lucide-react";

import type { ReaderAdapters } from "../../adapters.js";
import type { ReaderAssistantPanel } from "../../shared/types/reader-assistant-panels.js";
import { READER_BASE_PANELS } from "./reader-base-panels.js";
import { READER_HOST_PANELS } from "./reader-host-panels.js";

export type ReaderDockTab = {
  id: ReaderAssistantPanel;
  label: string;
  short: string;
  Icon: LucideIcon;
  /** 没有任务时禁用并说明原因。槽位面板一律 false：它们是否可用由宿主决定 */
  needsJob: boolean;
};

export type ReaderAdapterPresence = (key: keyof ReaderAdapters) => boolean;

export function readerDockTabs(hasAdapter: ReaderAdapterPresence): readonly ReaderDockTab[] {
  return [
    ...READER_BASE_PANELS.map(({ id, label, short, Icon, needsJob }) => ({
      id: id as ReaderAssistantPanel,
      label,
      short,
      Icon,
      needsJob,
    })),
    ...READER_HOST_PANELS
      .filter((panel) => hasAdapter(panel.adapterKey))
      .map(({ id, label, short, Icon }) => ({
        id: id as ReaderAssistantPanel,
        label,
        short,
        Icon,
        needsJob: false,
      })),
  ];
}
