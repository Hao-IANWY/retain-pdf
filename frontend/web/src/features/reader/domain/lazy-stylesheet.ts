/** 按需注入一张样式表。
 *
 * ## 为什么需要它
 *
 * 画布的 JS 是动态 import 的（tldraw 1.6 MB，不开那个 tab 就不下载），但它的
 * CSS 原先跟着 `reader.css` 一起渲染阻塞地加载 —— **懒加载只做了一半**。
 * tldraw.css 压完仍有 75 KB，占 reader.css 的 19%，而画布是多数阅读会话都不会
 * 打开的面板。
 *
 * ## href 从页面已有的 link 上推出来，不写死
 *
 * `reader.html` 里的 `<link href="./dist/css/reader.css?v=0bc10b53f6">` 带着构建
 * 戳。直接写死 `./dist/css/reader-canvas.css` 会有两个问题：页面不在根路径时相对
 * 路径算错，以及没有缓存戳、改了样式浏览器还用旧的。
 *
 * 所以拿同一个 link 的 href 做字符串替换 —— 路径和缓存戳一起继承。
 *
 * ## 失败也要放行
 *
 * 样式没加载成功时**照样 resolve**。画布没样式很难看，但比卡在加载中什么都不
 * 显示好 —— 后者看起来就是功能坏了。
 */

export type LazyStylesheetOptions = {
  /** 页面上已有的那张表的文件名，用来推路径和缓存戳。 */
  siblingFileName: string;
  /** 要注入的文件名。 */
  fileName: string;
  /** 兜底路径：页面上找不到 sibling 时用（测试环境、或 HTML 结构变了）。 */
  fallbackHref: string;
};

/** 从已有 link 推出目标 href。找不到 sibling 就用兜底。 */
export function resolveLazyStylesheetHref(
  links: readonly { getAttribute(name: string): string | null }[],
  options: LazyStylesheetOptions,
): string {
  for (const link of links) {
    const href = link.getAttribute("href") || "";
    // 匹配文件名而不是整个路径：路径前缀可能是 ./dist/css/ 也可能是别的。
    if (href.includes(options.siblingFileName)) {
      return href.replace(options.siblingFileName, options.fileName);
    }
  }
  return options.fallbackHref;
}

/** 等一张表真的加载完。
 *
 * **不用模块级 Map 去记「注入过没有」** —— `<head>` 本身就是那份状态，再存一份
 * 只会多一个真源。而且第一版那么写有个真 bug：第二个调用者发现 link 已存在就
 * 立即 resolve，可那时样式还没下载完，正好造成想避免的闪烁。
 *
 * 已加载完的同源样式表 `link.sheet` 不为 null，可以直接返回。跨域会抛，
 * 当作还没好去等事件。
 */
function waitForStylesheet(link: HTMLLinkElement): Promise<void> {
  try {
    if (link.sheet) return Promise.resolve();
  } catch {
    // 跨域访问 sheet 会抛 —— 落到下面等事件。
  }
  return new Promise((resolve) => {
    // 两条都 resolve：画布没样式很难看，但卡在加载中看起来是功能坏了，更糟。
    link.addEventListener("load", () => resolve(), { once: true });
    link.addEventListener("error", () => resolve(), { once: true });
  });
}

export function ensureLazyStylesheet(options: LazyStylesheetOptions): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const marker = `link[data-lazy-stylesheet="${options.fileName}"]`;
  const existing = document.querySelector(marker) as HTMLLinkElement | null;
  if (existing) return waitForStylesheet(existing);

  const href = resolveLazyStylesheetHref(
    [...document.querySelectorAll("link[rel='stylesheet']")],
    options,
  );
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.setAttribute("data-lazy-stylesheet", options.fileName);
  document.head.appendChild(link);
  return waitForStylesheet(link);
}

/** 画布那张表。 */
export const READER_CANVAS_STYLESHEET: LazyStylesheetOptions = {
  siblingFileName: "reader.css",
  fileName: "reader-canvas.css",
  fallbackHref: "./dist/css/reader-canvas.css",
};
