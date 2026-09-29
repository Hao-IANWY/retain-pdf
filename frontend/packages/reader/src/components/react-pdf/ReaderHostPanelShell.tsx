/** 宿主槽位面板的壳 —— 三个面板共用这一个，不再各写一份。
 *
 * 原来 ReaderAppReactPdf 里有三段 19–21 行、彼此九成相同的 `ReaderPanelShell`。
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
import { ReaderPanelShell } from "./ReaderPanelShell.js";
import type { ReaderHostPanelSpec } from "./reader-host-panels.js";

export type ReaderHostPanelContext = {
  /** 换文档就换终端会话；同一文档来回切 tab 接回同一个。 */
  sessionKey: string;
  /** 从选区问 AI 时要送进终端的那段文字。token 自增表示「这是新的一次注入」——
   * 不能拿文本判重，连着两次选同一段也得送两次。 */
  pendingInput: { text: string; token: number } | null;
  /** agent 在 board/ 里写了个能看的东西，请求把它在左边打开。 */
  onOpenBoard: (name: string) => void;
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

  // props 按 slot 的形状给，不按面板逐个给。
  //
  // 曾经这里是个三元，另一半给「文档类」槽位（阅读路径 / 画布）。那两个面板
  // 随「阅读页只留一扇 AI 的门」一起删了，slot 联合塌成一个成员，那一半成了
  // 死支。留着会让人以为还支持第二种形状。
  //
  // 靠 slot 收窄，**不用 cast**：`adapters[panel.adapterKey]` 在 adapterKey 是
  // 宽联合时会塌成一个谁也满足不了的调用签名，第一版为此写了 `as never`，
  // 等于把类型检查关掉 —— 这个功能上一次白屏正是这么来的。
  const adapters = getReaderAdapters();
  // **整个 context 展开下去，不手抄字段。**
  //
  // 第一版是手抄的四个键，漏了 onOpenBoard —— 于是「agent 写 HTML、点一下在
  // 左边打开」整条路是死的：点产物条抛 `onOpen is not a function`。tsc 抓不到，
  // 因为 AdapterKeysTaking 推出来的 adapterKey 是个宽联合（ReaderAdapters 里
  // 有 `resolveReaderAnchor?: (...args: any[]) => any` 这类成员也满足约束），
  // 调用参数被 any 吃掉，对象字面量根本没被检查。
  //
  // 展开之后，context 加字段就自动到位，不再依赖「记得同步两处」。
  const content = adapters?.[panel.adapterKey]?.({ ...context, open });
  // 宿主没注册渲染器 = 这个面板根本不该存在（dock 也不会给它 tab）。
  if (content === undefined || content === null) return null;

  return (
    <ReaderPanelShell
      id={`reader-${panel.id}-panel`}
      open={open}
      ariaLabel={panel.ariaLabel}
      keepMounted={panel.keepMounted}
      className="is-pane-right"
      onClose={context.onClose}
    >
      {content}
    </ReaderPanelShell>
  );
}
