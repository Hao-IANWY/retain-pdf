/** 终端可以同时开几条，以及它们各自跑在哪个作用域。
 *
 * ## 为什么需要
 *
 * 后端**一直支持并行**：`build_terminal_launch` 收一个 `busy_session_ids`，
 * 第二条连接会挑一个没被占用的 fx 会话，全占了就开新的。也就是说「同一本书
 * 开两条各自独立的对话」在后端是成立的。
 *
 * 卡点只在前端：dock 里只有一个终端面板、一个 `<FxTerminal>`、一个 session。
 * 于是想一边让它跑一个长任务、一边问点别的，只能等 —— 或者把当前这段对话搅乱。
 *
 * ## 为什么有上限
 *
 * 每条终端 = 一个 WebSocket + 一个 PTY + 一个 fx 进程（还带一个回环 HTTP 桥）。
 * 不封顶的话，点几下 `+` 就能把机器点满，而失败的样子是「新终端起不来」，
 * 没人会联想到是自己开多了。
 */
import { type TerminalScope } from "./terminal-scope.js";

/** 同时最多几条。四条够用，再多也看不过来（面板就那么宽）。 */
export const MAX_TERMINALS = 4;

export type TerminalTab = {
  /** 稳定 id，只用来做 React key 和激活标记 —— **不是** fx 的会话 id。
   * 两者刻意不挂钩：哪条 fx 对话被续上由后端挑，前端不该假装自己知道。 */
  id: string;
  scope: TerminalScope;
};

export type TerminalTabs = {
  tabs: TerminalTab[];
  activeId: string;
};

export function initialTabs(jobId: string): TerminalTabs {
  const tab: TerminalTab = { id: "t1", scope: { kind: "job", jobId } };
  return { tabs: [tab], activeId: tab.id };
}

/** 开一条新的，继承当前这条的作用域（多半是想在同一批书上另起一段）。
 *
 * 到上限就原样返回 —— 调用方据此把 `+` 禁掉。**不抛**：这是个按钮，
 * 点满了该是点不动，不是报错。
 */
export function addTab(state: TerminalTabs, nextId: () => string): TerminalTabs {
  if (state.tabs.length >= MAX_TERMINALS) return state;
  const current = state.tabs.find((tab) => tab.id === state.activeId);
  const tab: TerminalTab = {
    id: nextId(),
    scope: current?.scope ?? { kind: "job", jobId: "" },
  };
  return { tabs: [...state.tabs, tab], activeId: tab.id };
}

/** 关一条。
 *
 * **最后一条关不掉** —— 关掉之后面板里空无一物，而用户想要的多半是「重开一条」
 * 而不是「没有终端」。想重开有专门的动作。
 *
 * 关的是当前这条时，激活权交给它**左边**那条（和浏览器标签页一致）。
 */
export function closeTab(state: TerminalTabs, id: string): TerminalTabs {
  if (state.tabs.length <= 1) return state;
  const index = state.tabs.findIndex((tab) => tab.id === id);
  if (index < 0) return state;
  const tabs = state.tabs.filter((tab) => tab.id !== id);
  if (state.activeId !== id) return { tabs, activeId: state.activeId };
  const fallback = tabs[Math.max(0, index - 1)];
  return { tabs, activeId: fallback.id };
}

export function activateTab(state: TerminalTabs, id: string): TerminalTabs {
  return state.tabs.some((tab) => tab.id === id) ? { ...state, activeId: id } : state;
}

/** 改某一条的作用域。作用域是**每条各自的** —— 一条盯着这本书、另一条盯着整个
 * 文件夹，是这个功能最有用的形态。 */
export function setTabScope(
  state: TerminalTabs,
  id: string,
  scope: TerminalScope,
): TerminalTabs {
  return {
    ...state,
    tabs: state.tabs.map((tab) => (tab.id === id ? { ...tab, scope } : tab)),
  };
}

/** 标签上的短名字：序号 + 作用域的一个字。
 *
 * 只写序号的话，两条标签长得一模一样,而它们跑在不同的书上 —— 切错了不会有任何
 * 提示,得到的答案却是另一批书的。
 */
export function tabLabel(tab: TerminalTab, index: number): string {
  return tab.scope.kind === "job" ? `${index + 1} 书` : `${index + 1} ${tab.scope.name}`;
}
