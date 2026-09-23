/** 把画板里的 PDF 画成一张图。
 *
 * ## 为什么画成图，而不是嵌一个 PDF 阅读器
 *
 * 画布上的东西要能被拖、被缩、和旁边的概念图排在一起。塞一个 iframe 进 tldraw
 * 就没有这些了，而画板的定位是「扫一眼」—— 真要逐页读，那是阅读页主区域的事。
 * 所以只取第 1 页，多出来的页数写在标签上（见 `boardLabelOf`）。
 *
 * ## 为什么零新依赖
 *
 * pdf.js 不是 bundle 出来的，是运行时从 `./vendor/pdfjs-dist/` 动态 import 的
 * （和 `features/ingest/domain/upload/pdf-page-count.ts` 同一条路）。阅读页本来
 * 就为正文加载了它，这里是复用同一个模块 —— **首屏一个字节都不会变大**。
 * 千万别改成 `import ... from "pdfjs-dist"`：那会把整个 pdf.js 拽进 reader 的
 * 入口包，而且不会有任何报错，只是每次打开阅读页都慢一点。
 *
 * ## 这些 PDF 是 agent 写的
 *
 * PDF 能内嵌 JavaScript（`/OpenAction`）。这条路上没有任何东西会去跑它：
 * `getDocument()` + `page.render()` 只解析和画，脚本是 pdf.js **viewer** 的功能，
 * 而我们没用 viewer。`isEvalSupported: false` 再关掉 pdf.js 自己为字体和图案
 * 做的 eval 优化 —— 代价是某些文件画得慢一点，换掉一整类「agent 写的字节能
 * 变成我们页面里的代码」的可能。
 *
 * 后端那边还给 PDF 加了 `Content-Disposition: attachment`，堵的是另一条路
 * （地址栏直接打开端点，由浏览器自带阅读器解释）。两处是互补的，别以为有一处
 * 就可以撤掉另一处。
 */
import { resolvePdfjsVendorUrl } from "@/platform/runtime/vendor-url.js";

/** 栅格化的最大宽度。画布上一张卡片宽 460，2 倍多一点够清楚了，再大只是
 * 把 data URL 撑大 —— 它要整个塞进 tldraw 的资产里。 */
const MAX_RASTER_W = 1100;

/** 惰性解析：`resolvePdfjsVendorUrl` 要读 document.baseURI，模块级求值会在没有
 * DOM 的环境（node 测试 import 到传递依赖时）直接抛。 */
const pdfjsUrl = (path: string) => resolvePdfjsVendorUrl(path);

/** 不自己存一份 promise：`import()` 本身就按 URL 缓存模块，`workerSrc` 赋值又是
 * 幂等的，所以每次都走一遍等价于走缓存。
 *
 * 顺带躲掉两件事：一个模块级可变状态（架构门禁在盯，见
 * `tests/architecture/global-singletons.test.mjs`），以及「加载失败后忘了清缓存，
 * 这个页面从此再也画不出 PDF」那类坑 —— 别处的同款缓存正是为此专门写了 catch。 */
async function loadPdfjs(): Promise<any> {
  const module: any = await import(pdfjsUrl("build/pdf.mjs"));
  module.GlobalWorkerOptions.workerSrc = pdfjsUrl("build/pdf.worker.mjs");
  return module;
}

export type BoardPdfRaster = {
  dataUrl: string;
  w: number;
  h: number;
  pageCount: number;
};

/** 第 1 页 → PNG 的 data URL。任何一步失败都返回 null，交给调用方退回文本卡片。 */
export async function rasterizeBoardPdf(bytes: ArrayBuffer): Promise<BoardPdfRaster | null> {
  let doc: any = null;
  try {
    const pdfjsLib = await loadPdfjs();
    doc = await pdfjsLib.getDocument({
      data: new Uint8Array(bytes),
      cMapUrl: pdfjsUrl("cmaps/"),
      cMapPacked: true,
      standardFontDataUrl: pdfjsUrl("standard_fonts/"),
      // 见模块头：这些文件是 agent 写的，不给 pdf.js 走 eval 那条快路。
      isEvalSupported: false,
    }).promise;
    const pageCount = Number(doc?.numPages || 0);
    if (!pageCount) return null;
    const page = await doc.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(2, MAX_RASTER_W / Math.max(1, base.width));
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(viewport.width));
    canvas.height = Math.max(1, Math.round(viewport.height));
    const context = canvas.getContext("2d");
    if (!context) return null;
    // 先铺白底：PDF 的页面背景是透明的，不铺的话深色画布上就是一团黑字压黑底。
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: context, viewport }).promise;
    return {
      dataUrl: canvas.toDataURL("image/png"),
      w: canvas.width,
      h: canvas.height,
      pageCount,
    };
  } catch {
    return null;
  } finally {
    // 不销毁的话每轮询一次就漏一个 worker 端口和一份解码后的页面。
    if (doc?.destroy) await doc.destroy().catch(() => {});
  }
}
