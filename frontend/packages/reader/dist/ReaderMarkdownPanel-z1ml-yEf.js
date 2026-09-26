import { jsxs as Z, jsx as L } from "react/jsx-runtime";
import { useRef as N, useState as q, useEffect as fe } from "react";
import { Search as Ue, ChevronUp as Ce, ChevronDown as Le, ListTree as Ne } from "lucide-react";
import { d as me, r as ue, f as we, b as Re } from "./ReaderApp-B9HbApxY.js";
import { e as ge, m as Ie, a as be } from "./markdown-math-XkF5urpn.js";
import { n as Oe } from "./markdown-payload-kK3ewW_I.js";
const ke = "h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, pre";
function Se(t) {
  t.querySelectorAll(".reader-markdown-search-hit, .reader-markdown-search-hit-active").forEach((r) => {
    r.classList.remove("reader-markdown-search-hit", "reader-markdown-search-hit-active");
  });
}
function xe(t, r) {
  Se(t);
  const n = r.trim().toLocaleLowerCase();
  if (!n) return [];
  const a = [...t.querySelectorAll(ke)].filter((e) => [...e.children].some((u) => u.matches(ke)) ? !1 : (e.textContent || "").toLocaleLowerCase().includes(n));
  return a.forEach((e) => e.classList.add("reader-markdown-search-hit")), a;
}
function De(t) {
  return t.normalize("NFKC").trim().toLocaleLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-+|-+$/g, "") || "section";
}
function ce(t, r = /* @__PURE__ */ new Map()) {
  return [...t.querySelectorAll("h1, h2, h3, h4, h5, h6")].flatMap((n) => {
    const i = (n.textContent || "").replace(/\s+/g, " ").trim();
    if (!i) return [];
    const a = De(i), e = (r.get(a) || 0) + 1;
    r.set(a, e);
    const u = e === 1 ? `reader-md-${a}` : `reader-md-${a}-${e}`;
    return n.id = u, [{ id: u, level: Number(n.tagName.slice(1)), text: i }];
  });
}
function Te(t, r = "http://localhost/") {
  var n;
  if (/^mock:\/\//i.test(t)) return !0;
  try {
    const i = ((n = globalThis.location) == null ? void 0 : n.href) || "http://localhost/", a = new URL(r, i), e = new URL(t, a);
    if (!/\/api\/v1\/jobs\/[^/]+\/markdown\/images\//.test(e.pathname)) return !1;
    if (!/^[a-z][a-z\d+.-]*:/i.test(t)) return !0;
    const u = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(e.hostname);
    return e.origin === a.origin || u;
  } catch {
    return !1;
  }
}
function $e(t, r) {
  if (/^data:image\//i.test(t) || /^blob:/i.test(t)) return !0;
  try {
    const n = new URL(t, r);
    return n.protocol === "http:" || n.protocol === "https:";
  } catch {
    return !1;
  }
}
function pe(t, r) {
  let n = !1, i = 0, a = 0, e = 0;
  const u = [], d = [], U = /* @__PURE__ */ new Set(), b = (o, p) => {
    const s = o.ownerDocument.createElement("span");
    s.className = "reader-markdown-image-missing", s.textContent = p, s.title = o.getAttribute("data-reader-md-src") || "", o.replaceWith(s);
  };
  for (const o of t) {
    const p = o.getAttribute("data-reader-md-src") || "", s = o.ownerDocument.baseURI || "http://localhost/";
    Te(p, r.protectedBaseUrl || s) ? d.push(o) : $e(p, s) ? o.src = p : b(o, "[图片地址不可用]");
  }
  const C = () => {
    var o;
    return (o = r.onProgress) == null ? void 0 : o.call(r, { failed: e, loaded: a, total: d.length });
  }, k = () => {
    if (!n)
      for (; i < 4 && u.length > 0; ) {
        const o = u.shift();
        if (!(o != null && o.isConnected)) continue;
        i += 1;
        const p = o.getAttribute("data-reader-md-src") || "";
        r.fetchImage(p, r.signal ? { signal: r.signal } : void 0).then(async (s) => {
          if (!(s != null && s.ok)) throw new Error(`HTTP ${(s == null ? void 0 : s.status) || 0}`);
          const z = URL.createObjectURL(await s.blob());
          if (n || !o.isConnected) {
            try {
              URL.revokeObjectURL(z);
            } catch {
            }
            return;
          }
          r.onObjectUrl(z), o.src = z, a += 1;
        }).catch(() => {
          n || !o.isConnected || (e += 1, b(o, "[图片暂不可用]"));
        }).finally(() => {
          i -= 1, n || (C(), k());
        });
      }
  }, y = (o) => {
    n || U.has(o) || (U.add(o), u.push(o), k());
  }, $ = globalThis.IntersectionObserver;
  let m = null;
  return $ && d.length > 0 ? (m = new $((o) => {
    o.forEach((p) => {
      if (!p.isIntersecting) return;
      const s = p.target;
      m == null || m.unobserve(s), y(s);
    });
  }, { root: r.root || null, rootMargin: "600px 0px" }), d.forEach((o) => m == null ? void 0 : m.observe(o))) : d.forEach(y), C(), () => {
    n = !0, u.length = 0, m == null || m.disconnect();
  };
}
let oe = null;
function Me() {
  return oe || (oe = import("marked").catch((t) => {
    throw oe = null, t;
  })), oe;
}
function He(t) {
  t.querySelectorAll("script, iframe, object, embed, style, link, meta, base, form, input, button, textarea, select").forEach((r) => r.remove()), t.querySelectorAll("*").forEach((r) => {
    for (const n of [...r.attributes])
      /^on/i.test(n.name) && r.removeAttribute(n.name);
  }), t.querySelectorAll("a[href]").forEach((r) => {
    const n = r;
    /^\s*javascript:/i.test(n.getAttribute("href") || "") && n.removeAttribute("href"), n.setAttribute("target", "_blank"), n.setAttribute("rel", "noopener noreferrer");
  });
}
function de(t, r, n, i = {}) {
  const a = t.ownerDocument.createElement("template");
  return a.innerHTML = r, He(a.content), a.content.querySelectorAll("img[src]").forEach((e) => {
    var U;
    const u = e.getAttribute("src") || "", d = ((U = i.resolveAssetUrl) == null ? void 0 : U.call(i, n, u)) || u;
    e.setAttribute("data-reader-md-src", d), e.setAttribute("loading", "lazy"), e.setAttribute("decoding", "async"), e.removeAttribute("src");
  }), t.replaceChildren(a.content), t.classList.remove("hidden"), [...t.querySelectorAll("img[data-reader-md-src]")];
}
function qe(t, r) {
  let n = r;
  for (; n < t.length; ) {
    const i = t.indexOf(`
`, n), a = i === -1 ? t.length : i, e = t.slice(n, a).trim();
    if (e !== "") return e;
    if (i === -1) return null;
    n = i + 1;
  }
  return null;
}
const ze = /^\s{0,3}\[[^\]]+\]:/;
function ye(t) {
  const r = t.match(/^(?:([-*+])|(\d+)([.)]))\s+/);
  return r ? r[1] ? `ul:${r[1]}` : `ol:${r[3]}` : null;
}
function Be(t, r, n) {
  const i = qe(t, r);
  if (!i) return !1;
  if (ze.test(i)) return !0;
  const a = n ? ye(n) : null, e = ye(i);
  return a != null && a === e;
}
function ve(t, { minChars: r = 16384 } = {}) {
  if (!t) return null;
  let n = "", i = null, a = 0;
  const e = t.length;
  for (; a < e; ) {
    const u = t.indexOf(`
`, a), d = u === -1 ? e : u, b = t.slice(a, d).trim(), C = b.match(/^(`{3,}|~{3,})/);
    if (C) {
      const k = C[1][0];
      n ? n === k && (n = "") : n = k;
    }
    if (!n && b === "") {
      const k = u === -1 ? e : u + 1;
      if (k >= r && !Be(t, k, i))
        return { complete: t.slice(0, k), rest: t.slice(k) };
    } else b !== "" && (i = b);
    if (u === -1) break;
    a = u + 1;
  }
  return null;
}
function Pe({
  open: t,
  jobId: r,
  sourceOnly: n,
  searchQueryRef: i,
  reapplySearchRef: a
}) {
  const e = N(null), [u, d] = q("尚未加载"), U = N([]), b = N(null), C = N(/* @__PURE__ */ new Map()), k = N([]), y = N(null), $ = N(!1), m = N(!1), o = N(null), [p, s] = q([]), [z, R] = q(!1), [le, W] = q(!1), Q = () => {
    for (const l of U.current)
      try {
        URL.revokeObjectURL(l);
      } catch {
      }
    U.current = [];
  }, X = () => {
    var l, f;
    (l = b.current) == null || l.call(b), b.current = null;
    for (const g of k.current) g();
    k.current = [], (f = y.current) == null || f.call(y), y.current = null, Q();
  }, ee = () => {
    const l = e.current;
    l && (C.current = /* @__PURE__ */ new Map(), s(ce(l, C.current)));
  }, j = () => {
    const l = o.current, f = e.current;
    if (!l || !f) return;
    const g = [...f.querySelectorAll("h1, h2, h3, h4, h5, h6")].find((F) => F.id === l);
    g && (o.current = null, typeof g.scrollIntoView == "function" && g.scrollIntoView({ block: "start", behavior: "smooth" }));
  };
  return fe(() => () => {
    var l;
    (l = b.current) == null || l.call(b), Q();
  }, []), fe(() => {
    if (!t) {
      X(), s([]), m.current = !1, R(!1);
      return;
    }
    let l = !1;
    X(), C.current = /* @__PURE__ */ new Map(), m.current = !1, R(!1), s([]), $.current = !1, o.current = null, W(!1);
    const f = new AbortController(), g = me;
    async function F() {
      var c, M, v, E, w, S;
      const O = r.startsWith("doc:");
      if (!r || O) {
        d(!r && n ? "源文档阅读不提供 Markdown 产物" : "该任务暂无 Markdown 产物"), e.current && (e.current.replaceChildren(), e.current.classList.add("hidden"));
        return;
      }
      d("正在加载 Markdown…"), (c = e.current) == null || c.replaceChildren(), (M = e.current) == null || M.classList.add("hidden");
      try {
        if (typeof (g == null ? void 0 : g.loadMarkdownSource) == "function" && typeof (g == null ? void 0 : g.loadMarkdownRange) == "function") {
          const A = await g.loadMarkdownSource(r, f.signal);
          if (l) return;
          if (A != null && A.rawUrl) {
            await te(A);
            return;
          }
        }
      } catch {
      }
      try {
        const A = await me.loadMarkdownPayload(r);
        if (l) return;
        const { content: x, imagesBaseUrl: B } = Oe(A);
        if (!x.trim()) {
          d("该任务暂无 Markdown 产物"), (v = e.current) == null || v.replaceChildren(), (E = e.current) == null || E.classList.add("hidden");
          return;
        }
        const { marked: I } = await Me();
        if (l || !e.current) return;
        const { text: H, slots: P } = ge(x, { bareLatex: !0 }), G = String(I.parse(H, { async: !1 })), J = Ie(G, P);
        de(e.current, J, B, {
          resolveAssetUrl: ue
        }), s(ce(e.current)), (w = a.current) == null || w.call(a), d(P.length > 0 ? `正文已显示 · 正在渲染 ${P.length} 个公式…` : "");
        const re = P.length > 0 ? await be(G, P) : G;
        if (l || !e.current) return;
        const ne = de(e.current, re, B, {
          resolveAssetUrl: ue
        });
        s(ce(e.current)), m.current = !0, R(!0), (S = a.current) == null || S.call(a), d("");
        const se = e.current.closest(".reader-notes-panel-body");
        b.current = pe(ne, {
          root: se,
          protectedBaseUrl: B || e.current.ownerDocument.baseURI,
          fetchImage: we,
          signal: f.signal,
          onObjectUrl: (_) => U.current.push(_),
          onProgress: ({ failed: _ }) => {
            !l && _ > 0 && d(`正文已加载 · ${_} 张图片不可用`);
          }
        });
      } catch (A) {
        if (l) return;
        d(A instanceof Error ? A.message : "Markdown 加载失败");
      }
    }
    async function te(O) {
      var _;
      const c = e.current;
      if (!c) return;
      const M = 262144, v = 8192, E = `${O.imagesBaseUrl || ""}`, w = c.closest(".reader-notes-panel-body");
      let S = new TextDecoder(), A = 0, x = `${O.etag || ""}`, B = Number.isFinite(Number(O.totalBytes)) ? Number(O.totalBytes) : null, I = "", H = !1;
      const P = 4, G = 4e3;
      let J = 0;
      const re = () => {
        for (const h of k.current) h();
        k.current = [], Q(), C.current = /* @__PURE__ */ new Map(), s([]);
      }, ne = async (h) => {
        const { marked: D } = await Me();
        if (l || !e.current) return;
        const { text: T, slots: K } = ge(h, { bareLatex: !0 }), Y = String(D.parse(T, { async: !1 })), ie = K.length > 0 ? await be(Y, K) : Y;
        if (l || !e.current) return;
        const ae = c.ownerDocument.createElement("section");
        ae.className = "reader-markdown-chunk";
        const Ae = de(ae, ie, E, {
          resolveAssetUrl: ue
        });
        c.appendChild(ae), c.classList.remove("hidden");
        const he = ce(ae, C.current);
        he.length && s((V) => [...V, ...he]), j();
        const Ee = pe(Ae, {
          root: w,
          protectedBaseUrl: E || c.ownerDocument.baseURI,
          fetchImage: we,
          signal: f.signal,
          onObjectUrl: (V) => U.current.push(V),
          onProgress: ({ failed: V }) => {
            !l && V > 0 && d(`正文已加载 · ${V} 张图片不可用`);
          }
        });
        k.current.push(Ee);
      }, se = async () => {
        $.current || !w || l || c.scrollHeight <= w.clientHeight * 2 || (W(!0), d("已加载部分 · 滚动或点击继续加载"), await new Promise((h) => {
          let D = !1, T = null;
          const K = (ie) => {
            D || (D = !0, w.removeEventListener("scroll", Y), T && (clearTimeout(T), T = null), y.current = null, l || (W(!1), ie && (J = 0)), h());
          }, Y = () => {
            (c.scrollHeight <= w.clientHeight * 2 || w.scrollTop + w.clientHeight >= c.scrollHeight - 800) && K(!0);
          };
          y.current = () => K(!0), w.addEventListener("scroll", Y, { passive: !0 }), J < P && (J += 1, T = setTimeout(() => K(!1), G));
        }));
      };
      try {
        for (; !H && !l; ) {
          const h = await g.loadMarkdownRange(
            O.rawUrl,
            A,
            A + M - 1,
            x || void 0,
            f.signal
          );
          if (l) return;
          if (h.status === 404) {
            d("该任务暂无 Markdown 产物"), c.replaceChildren(), c.classList.add("hidden");
            return;
          }
          if (h.status === 200)
            c.replaceChildren(), re(), S = new TextDecoder(), I = S.decode(h.bytes, { stream: !1 }), H = !0;
          else if (h.status === 206) {
            if (x && h.etag && h.etag !== x) {
              c.replaceChildren(), re(), S = new TextDecoder(), I = "", A = 0, H = !1, x = h.etag;
              continue;
            }
            !x && h.etag && (x = h.etag), h.totalBytes != null && (B = h.totalBytes);
            const T = h.rangeEnd != null ? h.rangeEnd + 1 : A + h.bytes.length;
            H = B != null ? T >= B : h.bytes.length < M, I += S.decode(h.bytes, { stream: !H }), A = T;
          } else
            throw new Error(`读取 Markdown 失败，请稍后重试。(${h.status})`);
          let D = ve(I, { minChars: v });
          for (; D && !l; ) {
            if (I = D.rest, await ne(D.complete), l) return;
            await se(), D = ve(I, { minChars: v });
          }
          H && I.trim() && (await ne(I), I = "");
        }
        l || (ee(), m.current = !0, R(!0), j(), d(""), i.current.trim() && ((_ = a.current) == null || _.call(a)));
      } catch (h) {
        if (l || f.signal.aborted) return;
        d(h instanceof Error ? h.message : "Markdown 加载失败");
      }
    }
    return F(), () => {
      l = !0, f.abort(), X();
    };
  }, [t, r, n]), {
    contentRef: e,
    status: u,
    setStatus: d,
    outline: p,
    setOutline: s,
    outlineComplete: z,
    setOutlineComplete: R,
    outlineCompleteRef: m,
    pendingResume: le,
    rebuildOutline: ee,
    renderAllRef: $,
    pendingAnchorRef: o,
    resumeCleanupRef: y
  };
}
function Qe({
  open: t,
  jobId: r,
  sourceOnly: n,
  side: i = "right",
  onClose: a
}) {
  var te, O;
  const e = N([]), u = N(""), d = N(() => {
  }), [U, b] = q(!1), [C, k] = q(""), [y, $] = q(0), [m, o] = q(-1), {
    contentRef: p,
    status: s,
    setStatus: z,
    outline: R,
    outlineComplete: le,
    setOutlineComplete: W,
    outlineCompleteRef: Q,
    pendingResume: X,
    rebuildOutline: ee,
    renderAllRef: j,
    pendingAnchorRef: l,
    resumeCleanupRef: f
  } = Pe({
    open: t,
    jobId: r,
    sourceOnly: n,
    searchQueryRef: u,
    reapplySearchRef: d
  }), g = (c, M = !0) => {
    const v = e.current;
    if (v.forEach((S) => S.classList.remove("reader-markdown-search-hit-active")), v.length === 0) {
      o(-1);
      return;
    }
    const E = (c + v.length) % v.length, w = v[E];
    w.classList.add("reader-markdown-search-hit-active"), o(E), M && typeof w.scrollIntoView == "function" && w.scrollIntoView({ block: "center", behavior: "smooth" });
  }, F = (c, M = !1) => {
    var w;
    const v = `${c || ""}`.trim();
    if (j.current = v.length > 0, j.current && ((w = f.current) == null || w.call(f)), !p.current) return;
    const E = xe(p.current, c);
    e.current = E, $(E.length), g(E.length > 0 ? 0 : -1, M);
  };
  return d.current = () => F(u.current), /* @__PURE__ */ Z(
    Re,
    {
      id: "reader-markdown-panel",
      open: t,
      ariaLabel: "Markdown 预览",
      className: `is-pane-${i}`,
      onClose: a,
      toolbar: /* @__PURE__ */ L("span", { className: "reader-notes-count", children: s || "已加载" }),
      children: [
        /* @__PURE__ */ Z("div", { className: "reader-markdown-nav", "aria-label": "Markdown 导航与搜索", children: [
          /* @__PURE__ */ Z("label", { className: "reader-markdown-search", children: [
            /* @__PURE__ */ L(Ue, { size: 13, "aria-hidden": !0 }),
            /* @__PURE__ */ L(
              "input",
              {
                type: "search",
                value: C,
                placeholder: "搜索正文",
                "aria-label": "搜索 Markdown 正文",
                onChange: (c) => {
                  const M = c.target.value;
                  u.current = M, k(M), F(M, !1);
                },
                onKeyDown: (c) => {
                  c.key !== "Enter" || y === 0 || (c.preventDefault(), g(m + (c.shiftKey ? -1 : 1)));
                }
              }
            ),
            C ? /* @__PURE__ */ L("span", { className: "reader-markdown-search-count", "aria-live": "polite", children: y > 0 ? `${m + 1}/${y}` : "0/0" }) : null,
            /* @__PURE__ */ L(
              "button",
              {
                type: "button",
                "aria-label": "上一个搜索结果",
                disabled: y === 0,
                onClick: () => g(m - 1),
                children: /* @__PURE__ */ L(Ce, { size: 13, "aria-hidden": !0 })
              }
            ),
            /* @__PURE__ */ L(
              "button",
              {
                type: "button",
                "aria-label": "下一个搜索结果",
                disabled: y === 0,
                onClick: () => g(m + 1),
                children: /* @__PURE__ */ L(Le, { size: 13, "aria-hidden": !0 })
              }
            )
          ] }),
          /* @__PURE__ */ Z(
            "button",
            {
              type: "button",
              className: "reader-markdown-outline-toggle",
              "aria-expanded": U,
              disabled: R.length === 0,
              onClick: () => {
                ee(), W(Q.current), b((c) => !c);
              },
              children: [
                /* @__PURE__ */ L(Ne, { size: 13, "aria-hidden": !0 }),
                "目录",
                R.length > 0 ? ` ${R.length}` : ""
              ]
            }
          ),
          X ? /* @__PURE__ */ L(
            "button",
            {
              type: "button",
              className: "reader-markdown-resume",
              onClick: () => {
                var c;
                return (c = f.current) == null ? void 0 : c.call(f);
              },
              children: "继续加载"
            }
          ) : null
        ] }),
        U && R.length > 0 ? /* @__PURE__ */ Z("nav", { className: "reader-markdown-outline", "aria-label": "Markdown 目录", children: [
          le ? null : /* @__PURE__ */ L("p", { className: "reader-markdown-outline-note", children: "仅显示已加载内容，滚动可加载更多" }),
          R.map((c) => /* @__PURE__ */ L(
            "button",
            {
              type: "button",
              style: { "--reader-md-outline-level": c.level - 1 },
              onClick: () => {
                var v, E;
                const M = [...((v = p.current) == null ? void 0 : v.querySelectorAll("h1, h2, h3, h4, h5, h6")) || []].find((w) => w.id === c.id);
                if (M && typeof M.scrollIntoView == "function") {
                  M.scrollIntoView({ block: "start", behavior: "smooth" });
                  return;
                }
                l.current = c.id, j.current = !0, (E = f.current) == null || E.call(f), z("正在加载目标章节…");
              },
              children: c.text
            },
            c.id
          ))
        ] }) : null,
        s && !((O = (te = p.current) == null ? void 0 : te.childNodes) != null && O.length) ? /* @__PURE__ */ L("p", { className: "reader-notes-empty", children: s }) : null,
        /* @__PURE__ */ L(
          "article",
          {
            ref: p,
            id: "reader-markdown-content",
            className: "reader-markdown-content reader-float-markdown-content"
          }
        )
      ]
    }
  );
}
export {
  Qe as ReaderMarkdownPanel,
  ce as buildMarkdownOutline,
  Se as clearMarkdownSearchHighlights,
  xe as findMarkdownSearchTargets,
  Te as isProtectedMarkdownAssetUrl,
  pe as startMarkdownImageLoading
};
//# sourceMappingURL=ReaderMarkdownPanel-z1ml-yEf.js.map
