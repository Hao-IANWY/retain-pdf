/** 辅助面板的 id 清单 —— **唯一真源**。
 *
 * 在这之前，「有哪些面板」这件事分散在 7 个文件、17 处：dock 的 tab 列表、宿主的
 * 面板壳、view-state 的校验、恢复上次面板的判断、FAB 的高亮过滤、适配器类型、
 * 适配器注册。
 *
 * 实测漏一处的后果，三个探针**全绿**（tsc 0 error，609 个测试全过）：
 *
 *     view-state 没登记            → 存了不恢复
 *     resolveInitial 没登记        → 重开阅读页丢面板
 *     宿主没给 ReaderFloatShell    → **tab 还在，点了什么都不显示**
 *
 * 第三个最糟：tab 由「适配器在不在」决定，壳由宿主另写一遍，两边没有任何强制
 * 关系。所以这里不是「再加一条断言」，是把那个关系变成类型上的必然 ——
 * 规格表用 `satisfies Record<ReaderHostPanelId, …>`，漏一个面板编译不过。
 *
 * 这个文件**没有任何依赖**（不碰 React、不碰 lucide、不碰适配器），因为
 * shared/state 的 view-state 也要用它 —— 带图标的完整规格在
 * components/react-pdf/reader-host-panels.ts。
 */

/** 包自己渲染的面板。内容在包里，不需要宿主注入。 */
export const READER_BASE_PANEL_IDS = ["markdown", "ai"] as const;

/** 宿主槽位面板：包决定它在 dock 里的位置和生命周期，**内容由宿主注入**。
 *
 * 宿主没注册对应的渲染器时，这个 tab 根本不出现 —— 留一个点了没反应的 tab 比
 * 没有这个功能更糟。
 *
 * 顺序就是 dock 里 tab 的顺序。
 */
export const READER_HOST_PANEL_IDS = [
  "reading-path",
  "reading-canvas",
  "terminal",
] as const;

export const READER_ASSISTANT_PANEL_IDS = [
  ...READER_BASE_PANEL_IDS,
  ...READER_HOST_PANEL_IDS,
] as const;

export type ReaderBasePanelId = (typeof READER_BASE_PANEL_IDS)[number];
export type ReaderHostPanelId = (typeof READER_HOST_PANEL_IDS)[number];
export type ReaderAssistantPanel = ReaderBasePanelId | ReaderHostPanelId;

export function isReaderAssistantPanel(value: unknown): value is ReaderAssistantPanel {
  return (READER_ASSISTANT_PANEL_IDS as readonly unknown[]).includes(value);
}

/** 宿主槽位面板都不在 FAB 的工具注册表（READER_TOOLS）里，所以它们打开时 FAB
 * 不该高亮任何东西 —— 而不是硬塞一个 FAB 没有图标的 id 进去。 */
export function isReaderHostPanel(value: unknown): value is ReaderHostPanelId {
  return (READER_HOST_PANEL_IDS as readonly unknown[]).includes(value);
}
