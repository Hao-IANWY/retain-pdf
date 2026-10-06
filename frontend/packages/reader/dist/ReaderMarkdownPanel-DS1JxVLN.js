import { jsxs as j, jsx as k } from "react/jsx-runtime";
import { useRef as z, useState as _, useEffect as ee, useMemo as $e } from "react";
import { Search as Ee, ChevronUp as Le, ChevronDown as Ue, ListTree as Ae } from "lucide-react";
import { d as pe, r as fe, f as he, b as Ie, u as xe } from "./ReaderApp-CXGPE9U9.js";
import { e as me, m as De, a as ge } from "./markdown-math-XkF5urpn.js";
import { n as _e } from "./markdown-payload-kK3ewW_I.js";
const ye = "h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, pre";
function Re(t) {
  t.querySelectorAll(".reader-markdown-search-hit, .reader-markdown-search-hit-active").forEach((e) => {
    e.classList.remove("reader-markdown-search-hit", "reader-markdown-search-hit-active");
  });
}
function Ne(t, e) {
  Re(t);
  const s = e.trim().toLocaleLowerCase();
  if (!s) return [];
  const c = [...t.querySelectorAll(ye)].filter((r) => [...r.children].some((d) => d.matches(ye)) ? !1 : (r.textContent || "").toLocaleLowerCase().includes(s));
  return c.forEach((r) => r.classList.add("reader-markdown-search-hit")), c;
}
function Te(t) {
  return t.normalize("NFKC").trim().toLocaleLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-+|-+$/g, "") || "section";
}
function ae(t, e = /* @__PURE__ */ new Map()) {
  return [...t.querySelectorAll("h1, h2, h3, h4, h5, h6")].flatMap((s) => {
    const o = (s.textContent || "").replace(/\s+/g, " ").trim();
    if (!o) return [];
    const c = Te(o), r = (e.get(c) || 0) + 1;
    e.set(c, r);
    const d = r === 1 ? `reader-md-${c}` : `reader-md-${c}-${r}`;
    return s.id = d, [{ id: d, level: Number(s.tagName.slice(1)), text: o }];
  });
}
function ze(t, e = "http://localhost/") {
  var s;
  if (/^mock:\/\//i.test(t)) return !0;
  try {
    const o = ((s = globalThis.location) == null ? void 0 : s.href) || "http://localhost/", c = new URL(e, o), r = new URL(t, c);
    if (!/\/api\/v1\/jobs\/[^/]+\/markdown\/images\//.test(r.pathname)) return !1;
    if (!/^[a-z][a-z\d+.-]*:/i.test(t)) return !0;
    const d = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(r.hostname);
    return r.origin === c.origin || d;
  } catch {
    return !1;
  }
}
function Pe(t, e) {
  if (/^data:image\//i.test(t) || /^blob:/i.test(t)) return !0;
  try {
    const s = new URL(t, e);
    return s.protocol === "http:" || s.protocol === "https:";
  } catch {
    return !1;
  }
}
function we(t, e) {
  let s = !1, o = 0, c = 0, r = 0;
  const d = [], m = [], E = /* @__PURE__ */ new Set(), y = (u, M) => {
    const g = u.ownerDocument.createElement("span");
    g.className = "reader-markdown-image-missing", g.textContent = M, g.title = u.getAttribute("data-reader-md-src") || "", u.replaceWith(g);
  };
  for (const u of t) {
    const M = u.getAttribute("data-reader-md-src") || "", g = u.ownerDocument.baseURI || "http://localhost/";
    ze(M, e.protectedBaseUrl || g) ? m.push(u) : Pe(M, g) ? u.src = M : y(u, "[图片地址不可用]");
  }
  const p = () => {
    var u;
    return (u = e.onProgress) == null ? void 0 : u.call(e, { failed: r, loaded: c, total: m.length });
  }, f = () => {
    if (!s)
      for (; o < 4 && d.length > 0; ) {
        const u = d.shift();
        if (!(u != null && u.isConnected)) continue;
        o += 1;
        const M = u.getAttribute("data-reader-md-src") || "";
        e.fetchImage(M, e.signal ? { signal: e.signal } : void 0).then(async (g) => {
          if (!(g != null && g.ok)) throw new Error(`HTTP ${(g == null ? void 0 : g.status) || 0}`);
          const q = URL.createObjectURL(await g.blob());
          if (s || !u.isConnected) {
            try {
              URL.revokeObjectURL(q);
            } catch {
            }
            return;
          }
          e.onObjectUrl(q), u.src = q, c += 1;
        }).catch(() => {
          s || !u.isConnected || (r += 1, y(u, "[图片暂不可用]"));
        }).finally(() => {
          o -= 1, s || (p(), f());
        });
      }
  }, w = (u) => {
    s || E.has(u) || (E.add(u), d.push(u), f());
  }, P = globalThis.IntersectionObserver;
  let v = null;
  return P && m.length > 0 ? (v = new P((u) => {
    u.forEach((M) => {
      if (!M.isIntersecting) return;
      const g = M.target;
      v == null || v.unobserve(g), w(g);
    });
  }, { root: e.root || null, rootMargin: "600px 0px" }), m.forEach((u) => v == null ? void 0 : v.observe(u))) : m.forEach(w), p(), () => {
    s = !0, d.length = 0, v == null || v.disconnect();
  };
}
let ie = null;
function be() {
  return ie || (ie = import("marked").catch((t) => {
    throw ie = null, t;
  })), ie;
}
function Be(t) {
  t.querySelectorAll("script, iframe, object, embed, style, link, meta, base, form, input, button, textarea, select").forEach((e) => e.remove()), t.querySelectorAll("*").forEach((e) => {
    for (const s of [...e.attributes])
      /^on/i.test(s.name) && e.removeAttribute(s.name);
  }), t.querySelectorAll("a[href]").forEach((e) => {
    const s = e;
    /^\s*javascript:/i.test(s.getAttribute("href") || "") && s.removeAttribute("href"), s.setAttribute("target", "_blank"), s.setAttribute("rel", "noopener noreferrer");
  });
}
function se(t, e, s, o = {}) {
  const c = t.ownerDocument.createElement("template");
  return c.innerHTML = e, Be(c.content), c.content.querySelectorAll("img[src]").forEach((r) => {
    var E;
    const d = r.getAttribute("src") || "", m = ((E = o.resolveAssetUrl) == null ? void 0 : E.call(o, s, d)) || d;
    r.setAttribute("data-reader-md-src", m), r.setAttribute("loading", "lazy"), r.setAttribute("decoding", "async"), r.removeAttribute("src");
  }), t.replaceChildren(c.content), t.classList.remove("hidden"), [...t.querySelectorAll("img[data-reader-md-src]")];
}
function qe(t, e) {
  let s = e;
  for (; s < t.length; ) {
    const o = t.indexOf(`
`, s), c = o === -1 ? t.length : o, r = t.slice(s, c).trim();
    if (r !== "") return r;
    if (o === -1) return null;
    s = o + 1;
  }
  return null;
}
const Ve = /^\s{0,3}\[[^\]]+\]:/;
function ve(t) {
  const e = t.match(/^(?:([-*+])|(\d+)([.)]))\s+/);
  return e ? e[1] ? `ul:${e[1]}` : `ol:${e[3]}` : null;
}
function Fe(t, e, s) {
  const o = qe(t, e);
  if (!o) return !1;
  if (Ve.test(o)) return !0;
  const c = s ? ve(s) : null, r = ve(o);
  return c != null && c === r;
}
function Me(t, { minChars: e = 16384 } = {}) {
  if (!t) return null;
  let s = "", o = null, c = 0;
  const r = t.length;
  for (; c < r; ) {
    const d = t.indexOf(`
`, c), m = d === -1 ? r : d, y = t.slice(c, m).trim(), p = y.match(/^(`{3,}|~{3,})/);
    if (p) {
      const f = p[1][0];
      s ? s === f && (s = "") : s = f;
    }
    if (!s && y === "") {
      const f = d === -1 ? r : d + 1;
      if (f >= e && !Fe(t, f, o))
        return { complete: t.slice(0, f), rest: t.slice(f) };
    } else y !== "" && (o = y);
    if (d === -1) break;
    c = d + 1;
  }
  return null;
}
function Ke({
  open: t,
  jobId: e,
  sourceOnly: s,
  searchQueryRef: o,
  reapplySearchRef: c
}) {
  const r = z(null), [d, m] = _("尚未加载"), E = z([]), y = z(null), p = z(/* @__PURE__ */ new Map()), f = z([]), w = z(null), P = z(!1), v = z(!1), u = z(null), [M, g] = _([]), [q, N] = _(!1), [S, A] = _(!1), I = () => {
    for (const a of E.current)
      try {
        URL.revokeObjectURL(a);
      } catch {
      }
    E.current = [];
  }, O = () => {
    var a, i;
    (a = y.current) == null || a.call(y), y.current = null;
    for (const h of f.current) h();
    f.current = [], (i = w.current) == null || i.call(w), w.current = null, I();
  }, $ = () => {
    const a = r.current;
    a && (p.current = /* @__PURE__ */ new Map(), g(ae(a, p.current)));
  }, n = () => {
    const a = u.current, i = r.current;
    if (!a || !i) return;
    const h = [...i.querySelectorAll("h1, h2, h3, h4, h5, h6")].find((L) => L.id === a);
    h && (u.current = null, typeof h.scrollIntoView == "function" && h.scrollIntoView({ block: "start", behavior: "smooth" }));
  };
  return ee(() => () => {
    var a;
    (a = y.current) == null || a.call(y), I();
  }, []), ee(() => {
    if (!t) {
      O(), g([]), v.current = !1, N(!1);
      return;
    }
    let a = !1;
    O(), p.current = /* @__PURE__ */ new Map(), v.current = !1, N(!1), g([]), P.current = !1, u.current = null, A(!1);
    const i = new AbortController(), h = pe;
    async function L() {
      var l, b, x, T, R, F;
      const B = e.startsWith("doc:");
      if (!e || B) {
        m(!e && s ? "源文档阅读不提供 Markdown 产物" : "该任务暂无 Markdown 产物"), r.current && (r.current.replaceChildren(), r.current.classList.add("hidden"));
        return;
      }
      m("正在加载 Markdown…"), (l = r.current) == null || l.replaceChildren(), (b = r.current) == null || b.classList.add("hidden");
      try {
        if (typeof (h == null ? void 0 : h.loadMarkdownSource) == "function" && typeof (h == null ? void 0 : h.loadMarkdownRange) == "function") {
          const D = await h.loadMarkdownSource(e, i.signal);
          if (a) return;
          if (D != null && D.rawUrl) {
            await U(D);
            return;
          }
        }
      } catch {
      }
      try {
        const D = await pe.loadMarkdownPayload(e);
        if (a) return;
        const { content: K, imagesBaseUrl: G } = _e(D);
        if (!K.trim()) {
          m("该任务暂无 Markdown 产物"), (x = r.current) == null || x.replaceChildren(), (T = r.current) == null || T.classList.add("hidden");
          return;
        }
        const { marked: V } = await be();
        if (a || !r.current) return;
        const { text: Q, slots: X } = me(K, { bareLatex: !0 }), te = String(V.parse(Q, { async: !1 })), re = De(te, X);
        se(r.current, re, G, {
          resolveAssetUrl: fe
        }), g(ae(r.current)), (R = c.current) == null || R.call(c), m(X.length > 0 ? `正文已显示 · 正在渲染 ${X.length} 个公式…` : "");
        const oe = X.length > 0 ? await ge(te, X) : te;
        if (a || !r.current) return;
        const le = se(r.current, oe, G, {
          resolveAssetUrl: fe
        });
        g(ae(r.current)), v.current = !0, N(!0), (F = c.current) == null || F.call(c), m("");
        const ue = r.current.closest(".reader-notes-panel-body");
        y.current = we(le, {
          root: ue,
          protectedBaseUrl: G || r.current.ownerDocument.baseURI,
          fetchImage: he,
          signal: i.signal,
          onObjectUrl: (J) => E.current.push(J),
          onProgress: ({ failed: J }) => {
            !a && J > 0 && m(`正文已加载 · ${J} 张图片不可用`);
          }
        });
      } catch (D) {
        if (a) return;
        m(D instanceof Error ? D.message : "Markdown 加载失败");
      }
    }
    async function U(B) {
      var J;
      const l = r.current;
      if (!l) return;
      const b = 262144, x = 8192, T = `${B.imagesBaseUrl || ""}`, R = l.closest(".reader-notes-panel-body");
      let F = new TextDecoder(), D = 0, K = `${B.etag || ""}`, G = Number.isFinite(Number(B.totalBytes)) ? Number(B.totalBytes) : null, V = "", Q = !1;
      const X = 4, te = 4e3;
      let re = 0;
      const oe = () => {
        for (const C of f.current) C();
        f.current = [], I(), p.current = /* @__PURE__ */ new Map(), g([]);
      }, le = async (C) => {
        const { marked: W } = await be();
        if (a || !r.current) return;
        const { text: H, slots: Y } = me(C, { bareLatex: !0 }), ne = String(W.parse(H, { async: !1 })), de = Y.length > 0 ? await ge(ne, Y) : ne;
        if (a || !r.current) return;
        const ce = l.ownerDocument.createElement("section");
        ce.className = "reader-markdown-chunk";
        const Se = se(ce, de, T, {
          resolveAssetUrl: fe
        });
        l.appendChild(ce), l.classList.remove("hidden");
        const ke = ae(ce, p.current);
        ke.length && g((Z) => [...Z, ...ke]), n();
        const Oe = we(Se, {
          root: R,
          protectedBaseUrl: T || l.ownerDocument.baseURI,
          fetchImage: he,
          signal: i.signal,
          onObjectUrl: (Z) => E.current.push(Z),
          onProgress: ({ failed: Z }) => {
            !a && Z > 0 && m(`正文已加载 · ${Z} 张图片不可用`);
          }
        });
        f.current.push(Oe);
      }, ue = async () => {
        P.current || !R || a || l.scrollHeight <= R.clientHeight * 2 || (A(!0), m("已加载部分 · 滚动或点击继续加载"), await new Promise((C) => {
          let W = !1, H = null;
          const Y = (de) => {
            W || (W = !0, R.removeEventListener("scroll", ne), H && (clearTimeout(H), H = null), w.current = null, a || (A(!1), de && (re = 0)), C());
          }, ne = () => {
            (l.scrollHeight <= R.clientHeight * 2 || R.scrollTop + R.clientHeight >= l.scrollHeight - 800) && Y(!0);
          };
          w.current = () => Y(!0), R.addEventListener("scroll", ne, { passive: !0 }), re < X && (re += 1, H = setTimeout(() => Y(!1), te));
        }));
      };
      try {
        for (; !Q && !a; ) {
          const C = await h.loadMarkdownRange(
            B.rawUrl,
            D,
            D + b - 1,
            K || void 0,
            i.signal
          );
          if (a) return;
          if (C.status === 404) {
            m("该任务暂无 Markdown 产物"), l.replaceChildren(), l.classList.add("hidden");
            return;
          }
          if (C.status === 200)
            l.replaceChildren(), oe(), F = new TextDecoder(), V = F.decode(C.bytes, { stream: !1 }), Q = !0;
          else if (C.status === 206) {
            if (K && C.etag && C.etag !== K) {
              l.replaceChildren(), oe(), F = new TextDecoder(), V = "", D = 0, Q = !1, K = C.etag;
              continue;
            }
            !K && C.etag && (K = C.etag), C.totalBytes != null && (G = C.totalBytes);
            const H = C.rangeEnd != null ? C.rangeEnd + 1 : D + C.bytes.length;
            Q = G != null ? H >= G : C.bytes.length < b, V += F.decode(C.bytes, { stream: !Q }), D = H;
          } else
            throw new Error(`读取 Markdown 失败，请稍后重试。(${C.status})`);
          let W = Me(V, { minChars: x });
          for (; W && !a; ) {
            if (V = W.rest, await le(W.complete), a) return;
            await ue(), W = Me(V, { minChars: x });
          }
          Q && V.trim() && (await le(V), V = "");
        }
        a || ($(), v.current = !0, N(!0), n(), m(""), o.current.trim() && ((J = c.current) == null || J.call(c)));
      } catch (C) {
        if (a || i.signal.aborted) return;
        m(C instanceof Error ? C.message : "Markdown 加载失败");
      }
    }
    return L(), () => {
      a = !0, i.abort(), O();
    };
  }, [t, e, s]), {
    contentRef: r,
    status: d,
    setStatus: m,
    outline: M,
    setOutline: g,
    outlineComplete: q,
    setOutlineComplete: N,
    outlineCompleteRef: v,
    pendingResume: S,
    rebuildOutline: $,
    renderAllRef: P,
    pendingAnchorRef: u,
    resumeCleanupRef: w
  };
}
function We(t) {
  return t === "page_number" || t === "header" || t === "footer" || t === "page_header" || t === "page_footer" || t === "aside_text";
}
function He(t) {
  const e = `${t.subType || ""}`.toLowerCase();
  return We(e) ? null : e === "title" || e === "heading" || e === "doc_title" || e === "paragraph_title" ? "heading" : e === "display_formula" || t.regionType === "formula" ? "formula" : e === "image_body" || e === "figure" || e === "image" || e === "chart" || t.regionType === "image" ? "figure" : e === "table_html" || e === "table_body" || t.regionType === "table" ? "table" : e.endsWith("caption") || e === "figure_title" || e === "table_footnote" ? "caption" : e === "reference_entry" ? "reference" : e === "footnote" || e === "page_footnote" ? "footnote" : e === "metadata" ? "meta" : "paragraph";
}
function je(t) {
  return t.length > 0 && t.every((e) => typeof e.readingOrder == "number");
}
function Qe(t) {
  if (!je(t)) return null;
  const e = [], s = /* @__PURE__ */ new Map();
  for (const o of t) {
    const c = `${o.subType || ""}`.toLowerCase(), r = o.source.text.trim();
    if (c === "formula_number") {
      const w = e[e.length - 1];
      (w == null ? void 0 : w.kind) === "formula" && !w.label && (w.label = r);
      continue;
    }
    const d = He(o);
    if (!d) continue;
    const m = o.translated.text.trim(), E = !!m && m !== r, y = o.continuationGroupId, p = y ? s.get(y) : void 0;
    if (p) {
      p.itemIds.push(o.itemId), p.source = `${p.source} ${r}`.trim(), !p.hasTranslation && E ? (p.translated = m, p.hasTranslation = !0) : p.hasTranslation || (p.translated = p.source);
      continue;
    }
    const f = {
      key: o.itemId,
      itemIds: [o.itemId],
      page: o.source.page,
      kind: d,
      level: d === "heading" ? o.headingLevel || (c === "title" || c === "doc_title" ? 1 : 2) : 0,
      source: r,
      translated: E ? m : r,
      hasTranslation: E,
      assetUrls: o.assetUrls,
      label: ""
    };
    y && s.set(y, f), !(!r && d !== "figure") && e.push(f);
  }
  return e;
}
function Ge(t, e) {
  const s = e === "translated" ? t.translated : t.source;
  if (t.kind === "heading") {
    const o = Math.min(Math.max(t.level, 1), 6);
    return `${"#".repeat(o)} ${s.replace(/\s*\n\s*/g, " ")}`;
  }
  return s;
}
const Ce = 40;
function Xe(t, e, s, o) {
  const [c, r] = _(""), [d, m] = _([]), E = z(/* @__PURE__ */ new Map()), [y, p] = _(0);
  return ee(() => {
    const f = t.current;
    if (!o || !f) return;
    let w = !1;
    const P = new AbortController(), v = [], u = [], M = /* @__PURE__ */ new Map();
    E.current = M, f.replaceChildren(), r("正在排版…");
    const g = f.closest(".reader-notes-panel-body"), q = async (S, A) => {
      const { text: I, slots: O } = me(S, { bareLatex: !0 }), $ = A(I);
      return O.length > 0 ? ge($, O) : $;
    }, N = async (S, A, I, O) => {
      if (A.kind === "figure") {
        const n = A.assetUrls.map((a) => `<img src="${Je(a)}" alt="">`).join("");
        return se(S, n, "");
      }
      let $ = await q(Ge(A, I), O);
      return A.kind === "formula" && A.label && ($ += `<span class="reader-md-formula-label">${Ye(A.label)}</span>`), se(S, $, "");
    };
    return (async () => {
      try {
        const { marked: S } = await be(), A = (I) => String(S.parse(I, { async: !1 }));
        for (let I = 0; I < e.length; I += Ce) {
          if (w) return;
          const O = f.ownerDocument.createDocumentFragment(), $ = [];
          for (const n of e.slice(I, I + Ce)) {
            const a = f.ownerDocument.createElement("div");
            a.className = `reader-md-block is-${n.kind}`, a.dataset.mdBlock = n.key, a.dataset.mdPage = `${n.page}`, a.tabIndex = 0, a.setAttribute("role", "button"), a.setAttribute("aria-label", `跳到第 ${n.page} 页的这一块`);
            const i = s === "bilingual" && n.hasTranslation, h = i ? ["source", "translated"] : [s === "source" ? "source" : "translated"];
            for (const L of h) {
              const U = f.ownerDocument.createElement("div");
              if (U.className = i ? `reader-md-block-${L}` : "reader-md-block-body", $.push(...await N(U, n, L, A)), w) return;
              a.appendChild(U);
            }
            for (const L of n.itemIds) M.set(L, a);
            O.appendChild(a);
          }
          f.appendChild(O), f.classList.remove("hidden"), u.push(we($, {
            root: g,
            fetchImage: he,
            signal: P.signal,
            onObjectUrl: (n) => v.push(n)
          })), await new Promise((n) => setTimeout(n, 0));
        }
        if (w) return;
        m(ae(f)), r(`${e.length} 块`), p((I) => I + 1);
      } catch (S) {
        w || r(S instanceof Error ? S.message : "Markdown 排版失败");
      }
    })(), () => {
      w = !0, P.abort();
      for (const S of u) S();
      for (const S of v)
        try {
          URL.revokeObjectURL(S);
        } catch {
        }
    };
  }, [e, s, o, t]), { status: c, outline: d, elementsRef: E, renderedRevision: y };
}
function Je(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function Ye(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const Ze = [
  { value: "translated", label: "译文" },
  { value: "source", label: "原文" },
  { value: "bilingual", label: "双语" }
];
function et({
  open: t,
  blocks: e,
  side: s = "right",
  regionHover: o,
  jumpToBlock: c,
  onClose: r
}) {
  const d = z(null), m = e.some((n) => n.hasTranslation), [E, y] = _(m ? "translated" : "source"), { status: p, outline: f, elementsRef: w, renderedRevision: P } = Xe(d, e, E, t), [v, u] = _(!1), [M, g] = _(""), q = z([]), [N, S] = _(0), [A, I] = _(-1);
  ee(() => {
    if (!o) return;
    let n = null;
    const a = () => {
      const { itemId: h, origin: L } = o.get(), U = h ? w.current.get(h) ?? null : null;
      U !== n && (n == null || n.classList.remove("is-linked"), n = U, U && (U.classList.add("is-linked"), L === "pdf" && typeof U.scrollIntoView == "function" && U.scrollIntoView({ block: "nearest", behavior: "smooth" })));
    };
    a();
    const i = o.subscribe(a);
    return () => {
      i(), n == null || n.classList.remove("is-linked");
    };
  }, [o, w, P]), ee(() => {
    const n = d.current;
    if (!n) return;
    const a = (l) => l instanceof Element ? l.closest("[data-md-block]") : null, i = (l) => {
      const b = a(l.target);
      o == null || o.set((b == null ? void 0 : b.dataset.mdBlock) ?? null, "markdown");
    }, h = () => o == null ? void 0 : o.set(null, "markdown"), L = (l) => {
      const b = l == null ? void 0 : l.dataset.mdBlock;
      b && (c == null || c(b));
    }, U = (l) => {
      var b;
      (b = n.ownerDocument.getSelection()) != null && b.toString() || l.target instanceof Element && l.target.closest("a[href]") || L(a(l.target));
    }, B = (l) => {
      if (l.key !== "Enter" && l.key !== " ") return;
      const b = a(l.target);
      !b || b !== l.target || (l.preventDefault(), L(b));
    };
    return n.addEventListener("mouseover", i), n.addEventListener("mouseleave", h), n.addEventListener("click", U), n.addEventListener("keydown", B), () => {
      n.removeEventListener("mouseover", i), n.removeEventListener("mouseleave", h), n.removeEventListener("click", U), n.removeEventListener("keydown", B);
    };
  }, [o, c]);
  const O = (n, a = !0) => {
    const i = q.current;
    if (i.forEach((U) => U.classList.remove("reader-markdown-search-hit-active")), i.length === 0) {
      I(-1);
      return;
    }
    const h = (n + i.length) % i.length, L = i[h];
    L.classList.add("reader-markdown-search-hit-active"), I(h), a && typeof L.scrollIntoView == "function" && L.scrollIntoView({ block: "center", behavior: "smooth" });
  }, $ = (n, a = !1) => {
    const i = d.current;
    if (!i) return;
    n.trim() || Re(i);
    const h = n.trim() ? Ne(i, n) : [];
    q.current = h, S(h.length), O(h.length > 0 ? 0 : -1, a);
  };
  return ee(() => {
    M.trim() && $(M);
  }, [P]), /* @__PURE__ */ j(
    Ie,
    {
      id: "reader-markdown-panel",
      open: t,
      ariaLabel: "Markdown 预览",
      className: `is-pane-${s}`,
      onClose: r,
      toolbar: /* @__PURE__ */ k("span", { className: "reader-notes-count", children: p || "已加载" }),
      children: [
        /* @__PURE__ */ j("div", { className: "reader-markdown-nav", "aria-label": "Markdown 导航与搜索", children: [
          m ? /* @__PURE__ */ k("div", { className: "reader-md-view-switch", role: "tablist", "aria-label": "显示原文还是译文", children: Ze.map((n) => /* @__PURE__ */ k(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": E === n.value,
              className: E === n.value ? "is-active" : void 0,
              onClick: () => y(n.value),
              children: n.label
            },
            n.value
          )) }) : null,
          /* @__PURE__ */ j("label", { className: "reader-markdown-search", children: [
            /* @__PURE__ */ k(Ee, { size: 13, "aria-hidden": !0 }),
            /* @__PURE__ */ k(
              "input",
              {
                type: "search",
                value: M,
                placeholder: "搜索正文",
                "aria-label": "搜索 Markdown 正文",
                onChange: (n) => {
                  g(n.target.value), $(n.target.value, !1);
                },
                onKeyDown: (n) => {
                  n.key !== "Enter" || N === 0 || (n.preventDefault(), O(A + (n.shiftKey ? -1 : 1)));
                }
              }
            ),
            M ? /* @__PURE__ */ k("span", { className: "reader-markdown-search-count", "aria-live": "polite", children: N > 0 ? `${A + 1}/${N}` : "0/0" }) : null,
            /* @__PURE__ */ k(
              "button",
              {
                type: "button",
                "aria-label": "上一个搜索结果",
                disabled: N === 0,
                onClick: () => O(A - 1),
                children: /* @__PURE__ */ k(Le, { size: 13, "aria-hidden": !0 })
              }
            ),
            /* @__PURE__ */ k(
              "button",
              {
                type: "button",
                "aria-label": "下一个搜索结果",
                disabled: N === 0,
                onClick: () => O(A + 1),
                children: /* @__PURE__ */ k(Ue, { size: 13, "aria-hidden": !0 })
              }
            )
          ] }),
          /* @__PURE__ */ j(
            "button",
            {
              type: "button",
              className: "reader-markdown-outline-toggle",
              "aria-expanded": v,
              disabled: f.length === 0,
              onClick: () => u((n) => !n),
              children: [
                /* @__PURE__ */ k(Ae, { size: 13, "aria-hidden": !0 }),
                "目录",
                f.length > 0 ? ` ${f.length}` : ""
              ]
            }
          )
        ] }),
        v && f.length > 0 ? /* @__PURE__ */ k("nav", { className: "reader-markdown-outline", "aria-label": "Markdown 目录", children: f.map((n) => /* @__PURE__ */ k(
          "button",
          {
            type: "button",
            style: { "--reader-md-outline-level": n.level - 1 },
            onClick: () => {
              var h, L, U;
              const a = (h = d.current) == null ? void 0 : h.querySelector(`#${CSS.escape(n.id)}`);
              (L = a == null ? void 0 : a.scrollIntoView) == null || L.call(a, { block: "start", behavior: "smooth" });
              const i = (U = a == null ? void 0 : a.closest("[data-md-block]")) == null ? void 0 : U.dataset.mdBlock;
              i && (c == null || c(i));
            },
            children: n.text
          },
          n.id
        )) }) : null,
        /* @__PURE__ */ k(
          "article",
          {
            ref: d,
            id: "reader-markdown-content",
            className: "reader-markdown-content reader-float-markdown-content is-blocks"
          }
        )
      ]
    }
  );
}
function ct(t) {
  const e = xe(), s = e == null ? void 0 : e.regions, o = $e(() => s ? Qe(s) : null, [s]);
  return o && o.length > 0 ? /* @__PURE__ */ k(
    et,
    {
      open: t.open,
      blocks: o,
      side: t.side,
      regionHover: e == null ? void 0 : e.regionHover,
      jumpToBlock: e == null ? void 0 : e.jumpToBlock,
      onClose: t.onClose
    }
  ) : /* @__PURE__ */ k(tt, { ...t });
}
function tt({
  open: t,
  jobId: e,
  sourceOnly: s,
  side: o = "right",
  onClose: c
}) {
  var U, B;
  const r = z([]), d = z(""), m = z(() => {
  }), [E, y] = _(!1), [p, f] = _(""), [w, P] = _(0), [v, u] = _(-1), {
    contentRef: M,
    status: g,
    setStatus: q,
    outline: N,
    outlineComplete: S,
    setOutlineComplete: A,
    outlineCompleteRef: I,
    pendingResume: O,
    rebuildOutline: $,
    renderAllRef: n,
    pendingAnchorRef: a,
    resumeCleanupRef: i
  } = Ke({
    open: t,
    jobId: e,
    sourceOnly: s,
    searchQueryRef: d,
    reapplySearchRef: m
  }), h = (l, b = !0) => {
    const x = r.current;
    if (x.forEach((F) => F.classList.remove("reader-markdown-search-hit-active")), x.length === 0) {
      u(-1);
      return;
    }
    const T = (l + x.length) % x.length, R = x[T];
    R.classList.add("reader-markdown-search-hit-active"), u(T), b && typeof R.scrollIntoView == "function" && R.scrollIntoView({ block: "center", behavior: "smooth" });
  }, L = (l, b = !1) => {
    var R;
    const x = `${l || ""}`.trim();
    if (n.current = x.length > 0, n.current && ((R = i.current) == null || R.call(i)), !M.current) return;
    const T = Ne(M.current, l);
    r.current = T, P(T.length), h(T.length > 0 ? 0 : -1, b);
  };
  return m.current = () => L(d.current), /* @__PURE__ */ j(
    Ie,
    {
      id: "reader-markdown-panel",
      open: t,
      ariaLabel: "Markdown 预览",
      className: `is-pane-${o}`,
      onClose: c,
      toolbar: /* @__PURE__ */ k("span", { className: "reader-notes-count", children: g || "已加载" }),
      children: [
        /* @__PURE__ */ j("div", { className: "reader-markdown-nav", "aria-label": "Markdown 导航与搜索", children: [
          /* @__PURE__ */ j("label", { className: "reader-markdown-search", children: [
            /* @__PURE__ */ k(Ee, { size: 13, "aria-hidden": !0 }),
            /* @__PURE__ */ k(
              "input",
              {
                type: "search",
                value: p,
                placeholder: "搜索正文",
                "aria-label": "搜索 Markdown 正文",
                onChange: (l) => {
                  const b = l.target.value;
                  d.current = b, f(b), L(b, !1);
                },
                onKeyDown: (l) => {
                  l.key !== "Enter" || w === 0 || (l.preventDefault(), h(v + (l.shiftKey ? -1 : 1)));
                }
              }
            ),
            p ? /* @__PURE__ */ k("span", { className: "reader-markdown-search-count", "aria-live": "polite", children: w > 0 ? `${v + 1}/${w}` : "0/0" }) : null,
            /* @__PURE__ */ k(
              "button",
              {
                type: "button",
                "aria-label": "上一个搜索结果",
                disabled: w === 0,
                onClick: () => h(v - 1),
                children: /* @__PURE__ */ k(Le, { size: 13, "aria-hidden": !0 })
              }
            ),
            /* @__PURE__ */ k(
              "button",
              {
                type: "button",
                "aria-label": "下一个搜索结果",
                disabled: w === 0,
                onClick: () => h(v + 1),
                children: /* @__PURE__ */ k(Ue, { size: 13, "aria-hidden": !0 })
              }
            )
          ] }),
          /* @__PURE__ */ j(
            "button",
            {
              type: "button",
              className: "reader-markdown-outline-toggle",
              "aria-expanded": E,
              disabled: N.length === 0,
              onClick: () => {
                $(), A(I.current), y((l) => !l);
              },
              children: [
                /* @__PURE__ */ k(Ae, { size: 13, "aria-hidden": !0 }),
                "目录",
                N.length > 0 ? ` ${N.length}` : ""
              ]
            }
          ),
          O ? /* @__PURE__ */ k(
            "button",
            {
              type: "button",
              className: "reader-markdown-resume",
              onClick: () => {
                var l;
                return (l = i.current) == null ? void 0 : l.call(i);
              },
              children: "继续加载"
            }
          ) : null
        ] }),
        E && N.length > 0 ? /* @__PURE__ */ j("nav", { className: "reader-markdown-outline", "aria-label": "Markdown 目录", children: [
          S ? null : /* @__PURE__ */ k("p", { className: "reader-markdown-outline-note", children: "仅显示已加载内容，滚动可加载更多" }),
          N.map((l) => /* @__PURE__ */ k(
            "button",
            {
              type: "button",
              style: { "--reader-md-outline-level": l.level - 1 },
              onClick: () => {
                var x, T;
                const b = [...((x = M.current) == null ? void 0 : x.querySelectorAll("h1, h2, h3, h4, h5, h6")) || []].find((R) => R.id === l.id);
                if (b && typeof b.scrollIntoView == "function") {
                  b.scrollIntoView({ block: "start", behavior: "smooth" });
                  return;
                }
                a.current = l.id, n.current = !0, (T = i.current) == null || T.call(i), q("正在加载目标章节…");
              },
              children: l.text
            },
            l.id
          ))
        ] }) : null,
        g && !((B = (U = M.current) == null ? void 0 : U.childNodes) != null && B.length) ? /* @__PURE__ */ k("p", { className: "reader-notes-empty", children: g }) : null,
        /* @__PURE__ */ k(
          "article",
          {
            ref: M,
            id: "reader-markdown-content",
            className: "reader-markdown-content reader-float-markdown-content"
          }
        )
      ]
    }
  );
}
export {
  ct as ReaderMarkdownPanel,
  ae as buildMarkdownOutline,
  Re as clearMarkdownSearchHighlights,
  Ne as findMarkdownSearchTargets,
  ze as isProtectedMarkdownAssetUrl,
  we as startMarkdownImageLoading
};
//# sourceMappingURL=ReaderMarkdownPanel-DS1JxVLN.js.map
