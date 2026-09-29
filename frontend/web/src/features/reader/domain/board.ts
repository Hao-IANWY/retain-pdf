/** `<job>/ai/board/` —— agent 丢给你看的东西。
 *
 * ## 为什么是目录，不是又一套 schema
 *
 * 阅读器早先的 agent 产物（reading-path / canvas / notes）各有一套 JSON schema。
 * 每加一种可视化要动三处：schema、渲染器、AGENTS.md 一节。加到第三次时
 * AGENTS.md 里一半篇幅都在教 agent 拼格式，而三种产物的真实用量加起来是个位数。
 *
 * 画板反过来：**agent 手里已经有 shell 了**。它写一份自包含 HTML 丢进 `board/`
 * 就能被看见，我们不用为「图表」写一行渲染代码。
 *
 * ## 这个文件只管「有哪些」
 *
 * 解析后端的列目录，不碰内容。HTML 怎么渲染见 ui/board-html.tsx —— 那边有一整套
 * 隔离措施，因为 agent 写的 HTML 是这条链上最危险的字节。
 */

/** 后端认得出的类型。认不出的文件不会出现在列表里。 */
export type BoardItemKind = "image" | "pdf" | "markdown" | "json" | "text" | "html";

const KINDS: BoardItemKind[] = ["image", "pdf", "markdown", "json", "text", "html"];

/** 后端列目录给的。 */
export type BoardListing = {
  name: string;
  kind: BoardItemKind;
  contentType: string;
  size: number;
  modifiedMs: number;
};

export function parseBoardListing(payload: unknown): BoardListing[] | null {
  // 端点走 `ApiResponse::ok(...)`，也就是 `{code, message, data:{schema, items}}`。
  // 第一版直接读 `payload.items` —— 恒为 undefined，列表永远是空的，agent 写完
  // 文件说「好了」而用户那边什么都不出现，也没有任何报错。
  //
  // 同 feature 目录下 terminal-scope.ts 读的是 `data?.books`，是对的；这个仓库
  // 知道信封长什么样，是我没看。两种都收下：裸对象让单测好写，真实响应能走通。
  const envelope = payload as { data?: { items?: unknown }; items?: unknown } | null;
  const raw = envelope?.data?.items ?? envelope?.items;
  if (!Array.isArray(raw)) return null;
  const items: BoardListing[] = [];
  for (const candidate of raw) {
    if (!candidate || typeof candidate !== "object") continue;
    const item = candidate as Record<string, unknown>;
    const name = typeof item.name === "string" ? item.name : "";
    const kind = item.kind as BoardItemKind;
    if (!name || !KINDS.includes(kind)) continue;
    items.push({
      name,
      kind,
      contentType: typeof item.content_type === "string" ? item.content_type : "",
      size: typeof item.size === "number" ? item.size : 0,
      modifiedMs: typeof item.modified_ms === "number" ? item.modified_ms : 0,
    });
  }
  // 后端已经排过，这里再排一次：顺序是列表的依据，不能指望传输过程保序。
  return items.sort((a, b) => a.modifiedMs - b.modifiedMs || a.name.localeCompare(b.name));
}

/** 能在左边打开的那些。目前只有 HTML —— 别的类型没有渲染器。 */
export function openableBoardItems(items: readonly BoardListing[]): BoardListing[] {
  return items.filter((item) => item.kind === "html");
}
