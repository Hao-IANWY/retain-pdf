/** 宿主槽位面板的完整规格 —— dock 的 tab 和宿主的面板壳都从这里来。
 *
 * 这张表存在的理由见 shared/types/reader-assistant-panels.ts 顶部那段：同一个
 * 面板原来要在 7 个文件里各写一遍，漏一处不报错、不失败，只是某个行为悄悄没了。
 *
 * ## 为什么用 Record 而不是数组字面量
 *
 * `satisfies Record<ReaderHostPanelId, …>` 让「id 清单」和「规格表」**必须**
 * 一一对应：清单里加了 id 而这里没写规格，编译不过。数组写法给不了这个保证 ——
 * 少一项只是数组短了一个。
 *
 * ## slot：props 的形状，不是面板的身份
 *
 * 两种形状而不是三种：阅读路径和画布拿的是同一套（`jobId` + 跳转），终端拿的是
 * 会话键。再加一个「给它文档和跳转」的面板时，宿主侧**一行都不用改** —— 这正是
 * 这次要换来的东西。
 */
import { PenTool, Route, SquareTerminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type {
  ReaderAdapters,
  ReaderReadingPathSlotProps,
  ReaderTerminalSlotProps,
} from "../../adapters.js";
import {
  READER_HOST_PANEL_IDS,
  type ReaderHostPanelId,
} from "../../shared/types/reader-assistant-panels.js";

/** 收 props 形状为 P 的那些适配键。
 *
 * 从 ReaderAdapters 推出来，不在这里抄一份键名 —— 抄的那份会漂，而漂了的表现是
 * 「tab 永远不出现」，没有任何报错。新增一个同形状的适配器会自动可用。
 */
type AdapterKeysTaking<P> = {
  [K in keyof ReaderAdapters]-?: NonNullable<ReaderAdapters[K]> extends (props: P) => unknown
    ? K
    : never;
}[keyof ReaderAdapters];

type ReaderHostPanelBase = {
  id: ReaderHostPanelId;
  /** dock 展开时 tab 上的文字。 */
  label: string;
  /** dock 收起时侧边竖条上的缩写。 */
  short: string;
  Icon: LucideIcon;
  /** 浮窗位置的 localStorage 键。改了等于用户挪好的位置丢失。 */
  storageKey: string;
  ariaLabel: string;
  width: number;
  /** 关了 tab 也不卸载。
   *
   * 只在「卸载会丢东西」时才开：终端卸载 = 关 WebSocket = 杀掉 PTY 子进程，
   * 切个 tab 回来 fx 的会话就没了；画布卸载 = tldraw 整个重建，会闪。
   * 阅读路径没有这类状态，而且每次打开重新拉一次反而是对的（agent 可能刚重写过）。
   */
  keepMounted: boolean;
};

/** 按 props 形状分两种。做成判别联合，壳里就能靠 `slot` 收窄到正确的调用签名 ——
 * 第一版在这儿用 `as never` 硬转，等于把类型检查关掉，而这个功能上一次白屏
 * 正是这么来的。 */
export type ReaderHostPanelSpec = ReaderHostPanelBase & (
  | { slot: "document"; adapterKey: AdapterKeysTaking<ReaderReadingPathSlotProps> }
  | { slot: "terminal"; adapterKey: AdapterKeysTaking<ReaderTerminalSlotProps> }
);

export type ReaderHostPanelSlotKind = ReaderHostPanelSpec["slot"];

const SPECS = {
  "reading-path": {
    label: "阅读路径",
    short: "路径",
    Icon: Route,
    adapterKey: "renderReaderReadingPath",
    slot: "document",
    storageKey: "retainpdf.reader.reading-path-float.pos.v1",
    ariaLabel: "阅读路径",
    width: 420,
    keepMounted: false,
  },
  "reading-canvas": {
    label: "画布",
    short: "画",
    Icon: PenTool,
    adapterKey: "renderReaderReadingCanvas",
    slot: "document",
    storageKey: "retainpdf.reader.reading-canvas-float.pos.v1",
    ariaLabel: "AI 画布",
    width: 520,
    keepMounted: true,
  },
  terminal: {
    label: "终端",
    short: "SH",
    Icon: SquareTerminal,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    storageKey: "retainpdf.reader.terminal-float.pos.v1",
    ariaLabel: "fx 终端",
    width: 420,
    keepMounted: true,
  },
} satisfies Record<ReaderHostPanelId, Omit<ReaderHostPanelSpec, "id">>;

/** 顺序来自 id 清单，不是这张表的字面量顺序 —— 清单才是真源。 */
export const READER_HOST_PANELS: readonly ReaderHostPanelSpec[] = READER_HOST_PANEL_IDS.map(
  (id) => ({ id, ...SPECS[id] }),
);

export function readerHostPanelSpec(id: ReaderHostPanelId): ReaderHostPanelSpec {
  return { id, ...SPECS[id] };
}
