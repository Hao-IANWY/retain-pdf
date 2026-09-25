/** 终端上方那几条「你可以让它做什么」。
 *
 * ## 为什么需要这个
 *
 * agent 能产出四类东西 —— 阅读路径、页面批注、概念图、画板文件 —— 每一类在阅读页
 * 里都有对应的呈现。但**这件事唯一的说明书是 AGENTS.md，而那份文档是写给模型看
 * 的**，用户根本看不到。
 *
 * 画板那类给了两条提示而不是一条：「画张图」和「排一份文档」在用户那边是两个
 * 不同的请求，而后者猜不到 —— 没人会去要一份自己不知道能拿到的 PDF。
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
  /** 稳定标识，只用来记「这条用户已经点过了」。
   *
   * 不拿 label 或 path 当键 —— 那两个是文案和落点，改一次措辞就把用户「已经
   * 知道这条」的记录冲掉，chip 会毫无理由地重新冒出来。
   */
  id: string;
  /** chip 上显示的短标签。 */
  label: string;
  /** 打进输入行的完整提示。 */
  prompt: string;
  /** 产出落在哪 —— 跨文件门禁按这个和 AGENTS.md 对账。 */
  path: string;
};

export const TERMINAL_SUGGESTIONS: readonly TerminalSuggestion[] = [
  {
    id: "reading-path",
    label: "写阅读路径",
    prompt: "读一遍这本书，写一条阅读路径到 ./reading-path.v1.json",
    path: "./reading-path.v1.json",
  },
  {
    id: "notes",
    label: "标注隐含前提",
    prompt: "把第 3 节的隐含前提和跨页依赖标到 ./notes.v1.json 上",
    path: "./notes.v1.json",
  },
  {
    id: "canvas",
    label: "画概念图",
    prompt: "把这篇论文的脉络画成概念图，写到 ./canvas.v1.json",
    path: "./canvas.v1.json",
  },
  {
    id: "chart",
    label: "画张图表",
    prompt: "把每页的翻译问题数画成柱状图，存到 ./board/issues.png",
    path: "./board/",
  },
  {
    // 画板的第二条。「画张图」和「排一份文档」在用户那边是两个完全不同的请求，
    // 而后者是**猜不到的** —— 一个终端旁边的 AI 能交出一份带标题和表格的中文
    // PDF，不写出来没人会去要。（agent 那边用 typst 渲，说明在 AGENTS.md 里。）
    id: "report",
    label: "出份报告",
    prompt: "把翻译问题整理成一份报告，渲成 ./board/report.pdf",
    path: "./board/report.pdf",
  },
];

/** 用户已经点过哪几条。
 *
 * v1 存的是一个全局布尔，而界面上点**任意一条** chip 就写它 —— 五条一起永久
 * 消失，换本书也不再出现。这排 chip 是 agent 那四类产出唯一面向用户的说明书
 * （AGENTS.md 是写给模型看的），一次点击烧掉四条用户从没见过的能力，平均下来
 * 每人只会知道其中一条。当时注释写的「知道了就是知道了」判断错了：知道的只是
 * 点过的那一条。
 *
 * v2 存的是集合，按条收起：点哪条收哪条，其余几条继续在那儿等着被发现；全部
 * 点完这排就自己没了，所以「用完即隐」那个出发点没丢。× 仍然是一次全收 ——
 * 那才是用户真的说「别再显示了」。
 *
 * 不读 v1：它的 "1" 区分不了「点了一条」和「主动关掉」，照旧读等于把这个缺陷
 * 继续兑现给老用户。代价只是这些人再看见一次这排 chip。
 */
export const TERMINAL_SUGGESTIONS_DISMISSED_KEY =
  "retainpdf.reader.terminal-suggestions-dismissed.v2";

export function readDismissedSuggestions(
  storage?: Pick<Storage, "getItem">,
): ReadonlySet<string> {
  const store = storage ?? (typeof localStorage === "undefined" ? null : localStorage);
  if (!store) return new Set();
  try {
    const raw = store.getItem(TERMINAL_SUGGESTIONS_DISMISSED_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    // 不认识的 id 不用过滤：它匹配不到任何一条，留着也闷不掉谁。
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    // 隐私模式下读 localStorage 会抛，键里存的也可能不是合法 JSON。
    // 当作没收起过 —— 多显示一次比整个面板崩了好。
    return new Set();
  }
}

export function writeDismissedSuggestions(
  dismissed: ReadonlySet<string>,
  storage?: Pick<Storage, "setItem">,
): void {
  const store = storage ?? (typeof localStorage === "undefined" ? null : localStorage);
  if (!store) return;
  try {
    store.setItem(TERMINAL_SUGGESTIONS_DISMISSED_KEY, JSON.stringify([...dismissed]));
  } catch {
    // 存不下就下次再显示一遍，没有别的后果。
  }
}

/** 收起一条。纯函数：不改入参，否则 setState 拿到同一个引用，界面不会重渲染。 */
export function dismissSuggestion(
  dismissed: ReadonlySet<string>,
  id: string,
): ReadonlySet<string> {
  return new Set([...dismissed, id]);
}

/** × 按钮：一次全收。这才是用户真的说「别再显示了」。
 *
 * 每次现算而不是缓存成模块级常量 —— 顶层 `new Set()` 撞架构门禁（模块级可变
 * 状态），而五条的 map 不值得为它登记一条豁免。
 */
export function dismissAllSuggestions(): ReadonlySet<string> {
  return new Set(TERMINAL_SUGGESTIONS.map((suggestion) => suggestion.id));
}

export function visibleSuggestions(
  dismissed: ReadonlySet<string>,
): readonly TerminalSuggestion[] {
  return TERMINAL_SUGGESTIONS.filter((suggestion) => !dismissed.has(suggestion.id));
}
