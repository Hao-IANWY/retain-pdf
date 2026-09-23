/** 终端上方那几条「你可以让它做什么」。
 *
 * ## 为什么需要这个
 *
 * agent 能产出四类东西 —— 阅读路径、页面批注、概念图、画板文件 —— 每一类在阅读页
 * 里都有对应的呈现。但**这件事唯一的说明书是 AGENTS.md，而那份文档是写给模型看
 * 的**，用户根本看不到。
 *
 * 结果是：打开终端看到 fx 的裸 TUI，不知道 cwd 在哪、旁边有什么、能要什么。
 * 一个想让 AI 画图的人会去「AI 问答」里问，得到一段描述文字，然后得出「这工具的
 * AI 不行」的结论 —— 而真正能画图的终端就在旁边一个 tab。
 *
 * ## 为什么是提示而不是按钮
 *
 * 点一下把文字**打进 fx 的输入行但不回车**（`session.send` 不带 `\r`）。用户能改
 * 完再发 —— 这些都是自然语言提示，改一改往往更贴合当下想问的东西。直接执行会让
 * 它变成四个功能按钮，而这个产品的方向恰恰相反：用自然语言代替按钮。
 *
 * ## 这里只放自然语言，不放格式说明
 *
 * 字段名、schema、后缀白名单那些留在 AGENTS.md。往这里掺会有两份要同步的文档，
 * 而 AGENTS.md 那份是**唯一被实测验证有效**的约束（fx 引用它拒绝写 `../`）。
 * 这里只保证**路径**和那边一致，有跨文件门禁守着。
 */

export type TerminalSuggestion = {
  /** chip 上显示的短标签。 */
  label: string;
  /** 打进输入行的完整提示。 */
  prompt: string;
  /** 产出落在哪 —— 跨文件门禁按这个和 AGENTS.md 对账。 */
  path: string;
};

export const TERMINAL_SUGGESTIONS: readonly TerminalSuggestion[] = [
  {
    label: "写阅读路径",
    prompt: "读一遍这本书，写一条阅读路径到 ./reading-path.v1.json",
    path: "./reading-path.v1.json",
  },
  {
    label: "标注隐含前提",
    prompt: "把第 3 节的隐含前提和跨页依赖标到 ./notes.v1.json 上",
    path: "./notes.v1.json",
  },
  {
    label: "画概念图",
    prompt: "把这篇论文的脉络画成概念图，写到 ./canvas.v1.json",
    path: "./canvas.v1.json",
  },
  {
    label: "画张图表",
    prompt: "把每页的翻译问题数画成柱状图，存到 ./board/issues.png",
    path: "./board/",
  },
];

/** 用户点过一次就收起来。
 *
 * 全局而不是按文档：知道了就是知道了，换本书不需要再教一遍。
 */
export const TERMINAL_SUGGESTIONS_DISMISSED_KEY =
  "retainpdf.reader.terminal-suggestions-dismissed.v1";

export function readSuggestionsDismissed(storage?: Pick<Storage, "getItem">): boolean {
  const store = storage ?? (typeof localStorage === "undefined" ? null : localStorage);
  if (!store) return false;
  try {
    return store.getItem(TERMINAL_SUGGESTIONS_DISMISSED_KEY) === "1";
  } catch {
    // 隐私模式下读 localStorage 会抛。当作没收起过 —— 多显示一次比崩了好。
    return false;
  }
}

export function writeSuggestionsDismissed(storage?: Pick<Storage, "setItem">): void {
  const store = storage ?? (typeof localStorage === "undefined" ? null : localStorage);
  if (!store) return;
  try {
    store.setItem(TERMINAL_SUGGESTIONS_DISMISSED_KEY, "1");
  } catch {
    // 存不下就下次再显示一遍，没有别的后果。
  }
}
