/** 宿主槽位面板的壳 —— 三个面板共用这一个，不再各写一份。
 *
 * 原来 ReaderAppReactPdf 里有三段 19–21 行、彼此九成相同的 `ReaderFloatShell`。
 * 重复本身还不是最糟的：dock 的 tab 由「适配器在不在」决定，而壳由宿主另写一遍，
 * **两边没有任何强制关系** —— 忘了写壳，tab 照样在，点了什么都不显示，tsc 和
 * 609 个测试全绿（实测）。现在两边同源于 READER_HOST_PANELS。
 *
 * 定位由**包**负责：和 Markdown / AI 面板套同一个壳、同一个 placement。宿主只给
 * 内容 —— 它不知道 dock 在哪一侧，也不该知道。第一版终端把这段放在 Suspense
 * 外面、不套壳，结果铺满整个窗口盖住了 PDF。
 *
 * 这是个组件而不是一段 map 里的 JSX：`useMountedSinceFirstOpen` 是 hook，必须
 * 无条件调用，只能住在组件里。
 */
import type { ReactNode } from "react";

import { getReaderAdapters } from "../../adapters.js";
import { useMountedSinceFirstOpen } from "../../shared/react/use-mounted-since-first-open.js";
import { ReaderFloatShell } from "./ReaderFloatShell.js";
import type { ReaderHostPanelSpec } from "./reader-host-panels.js";

export type ReaderHostPanelContext = {
  jobId: string;
  /** 换文档就换终端会话；同一文档来回切 tab 接回同一个。 */
  sessionKey: string;
  /** 跳转留在包里：锚点怎么变成翻页+高亮要看当前分栏和模式，宿主自己实现会和
   * 这些状态打架。 */
  onJump: (anchor: { page_idx?: number; block_id?: string }) => void;
  onClose: () => void;
};

export function ReaderHostPanelShell({
  panel,
  active,
  context,
}: {
  panel: ReaderHostPanelSpec;
  active: string | null;
  context: ReaderHostPanelContext;
}): ReactNode {
  const open = active === panel.id;
  // hook 无条件调用；keepMounted 决定要不要用它的结果。
  const latched = useMountedSinceFirstOpen(open);
  const mounted = panel.keepMounted ? latched : open;
  if (!mounted) return null;

  // props 按 slot 的形状给，不按面板逐个给 —— 再加一个「文档类」面板时这里
  // 一行都不用改。
  //
  // 靠 slot 收窄，**不用 cast**：`adapters[panel.adapterKey]` 在 adapterKey 是
  // 宽联合时会塌成一个谁也满足不了的调用签名，第一版为此写了 `as never`，
  // 等于把类型检查关掉 —— 这个功能上一次白屏正是这么来的。
  const adapters = getReaderAdapters();
  const content = panel.slot === "terminal"
    ? adapters?.[panel.adapterKey]?.({
        open,
        sessionKey: context.sessionKey,
        onClose: context.onClose,
      })
    : adapters?.[panel.adapterKey]?.({
        open,
        jobId: context.jobId,
        onJump: context.onJump,
        onClose: context.onClose,
      });
  // 宿主没注册渲染器 = 这个面板根本不该存在（dock 也不会给它 tab）。
  if (content === undefined || content === null) return null;

  return (
    <ReaderFloatShell
      id={`reader-${panel.id}-panel`}
      open={open}
      title={panel.label}
      storageKey={panel.storageKey}
      ariaLabel={panel.ariaLabel}
      width={panel.width}
      keepMounted={panel.keepMounted}
      placement="workspace"
      showHeader={false}
      className="is-pane-right"
      onClose={context.onClose}
    >
      {content}
    </ReaderFloatShell>
  );
}
