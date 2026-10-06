import { n as b } from "./block-key-BTxcG28S.js";
function g(n) {
  return n && typeof n == "object" && !Array.isArray(n) ? n : null;
}
function M(n) {
  const t = g(n);
  return t && "data" in t ? t.data : n;
}
function h(n) {
  const t = Number(n);
  return Number.isFinite(t) && t > 0 ? t : null;
}
function w(n) {
  const t = g(n);
  if (!t || !Array.isArray(t.bbox) || t.bbox.length !== 4) return null;
  const r = t.bbox.map(Number);
  if (!r.every(Number.isFinite)) return null;
  const a = h(t.page);
  if (a == null) return null;
  const [s, o, e, l] = r, i = Math.min(s, e), u = Math.min(o, l), f = Math.max(s, e), c = Math.max(o, l);
  if (f <= i || c <= u) return null;
  const p = `${t.unit || "pdf_point"}`.trim().toLowerCase();
  if (p !== "pdf_point" && p !== "pt") return null;
  const d = `${t.origin || "top_left"}`.trim().toLowerCase();
  return d !== "top_left" && d !== "bottom_left" ? null : {
    page: Math.floor(a),
    bbox: [i, u, f, c],
    unit: "pdf_point",
    origin: d,
    text: `${t.text || ""}`
  };
}
function S(n) {
  const t = M(n), r = g(t), a = Array.isArray(t) ? t : Array.isArray(r == null ? void 0 : r.items) ? r.items : [], s = [];
  for (const o of a) {
    const e = g(o), l = `${(e == null ? void 0 : e.item_id) || (e == null ? void 0 : e.itemId) || ""}`.trim(), i = w(e == null ? void 0 : e.source), u = w(e == null ? void 0 : e.translated);
    !l || !i || !u || s.push({
      itemId: l,
      source: i,
      translated: u,
      markdown: `${(e == null ? void 0 : e.markdown) || ""}`,
      regionType: `${(e == null ? void 0 : e.region_type) || (e == null ? void 0 : e.regionType) || ""}`,
      status: `${(e == null ? void 0 : e.status) || ""}`,
      assetIds: (Array.isArray(e == null ? void 0 : e.asset_ids) ? e.asset_ids : Array.isArray(e == null ? void 0 : e.assetIds) ? e.assetIds : []).map((f) => `${f || ""}`.trim()).filter(Boolean),
      assetUrls: (Array.isArray(e == null ? void 0 : e.asset_urls) ? e.asset_urls : Array.isArray(e == null ? void 0 : e.assetUrls) ? e.assetUrls : []).map((f) => `${f || ""}`.trim()).filter(Boolean)
    });
  }
  return s;
}
function A(n) {
  const t = `${n || ""}`.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return t.includes("formula") || t.includes("equation") ? "formula" : t.includes("table") ? "table" : t.includes("figure") || t.includes("image") || t.includes("chart") || t.includes("seal") ? "figure" : t.includes("text") || t.includes("title") || t.includes("paragraph") || t.includes("reference") || t.includes("caption") ? "text" : "region";
}
function _(n) {
  const t = A(n.regionType);
  if (t !== "region") return t;
  if (n.assetIds.length || n.assetUrls.length) return "figure";
  const r = `${n.markdown || n.source.text || n.translated.text || ""}`.trim();
  return /^<table(?:\s|>)/i.test(r) || /\n\s*\|?\s*:?-{3,}/.test(r) ? "table" : /^\$\$[\s\S]+\$\$$/.test(r) || /^\\\[[\s\S]+\\\]$/.test(r) || /^\\begin\{(?:equation|align|gather|multline)\*?\}/.test(r) ? "formula" : r ? "text" : t;
}
function B(n) {
  const t = _(n);
  return t === "formula" || t === "table" || t === "figure";
}
function L(n, t) {
  return `${R(n, t).text || n.markdown || ""}`.trim();
}
function z(n) {
  let t = `${n || ""}`.trim();
  if (!t) return "";
  const r = t.match(/^```(?:latex|tex|math)?\s*([\s\S]*?)\s*```$/i);
  r && (t = r[1].trim());
  const a = [
    ["$$", "$$"],
    ["\\[", "\\]"],
    ["\\(", "\\)"],
    ["$", "$"]
  ];
  for (const [s, o] of a)
    if (t.startsWith(s) && t.endsWith(o) && t.length > s.length + o.length)
      return t.slice(s.length, -o.length).trim();
  return t;
}
function $(n) {
  const t = g(n);
  if (!t) return null;
  const r = [];
  for (const s of Array.isArray(t.pages) ? t.pages : []) {
    const o = g(s), e = h(o == null ? void 0 : o.page), l = h(o == null ? void 0 : o.width), i = h(o == null ? void 0 : o.height);
    e == null || l == null || i == null || r.push({ page: Math.floor(e), width: l, height: i });
  }
  if (!r.length) return null;
  const a = h(t.page_count ?? t.pageCount);
  return {
    pageCount: a == null ? r.length : Math.floor(a),
    pages: r
  };
}
function U(n) {
  const t = g(M(n));
  return {
    source: $(t == null ? void 0 : t.source),
    translated: $(t == null ? void 0 : t.translated)
  };
}
function C(n, t) {
  const r = b(t);
  return r && n.find((a) => b(a.itemId) === r) || null;
}
function m(n) {
  return `${n || ""}`.normalize("NFKC").toLocaleLowerCase().replace(/[\p{P}\p{S}\s]+/gu, "").trim();
}
function N(n) {
  const t = `${n || ""}`.trim();
  if (!t) return [];
  const r = t.split(/\n\s*\n/g).map(m).filter(Boolean), a = t.split(">").map(m).filter(Boolean), s = [...r.reverse(), ...a.reverse(), m(t)];
  return [...new Set(s)].filter((o) => o.length >= 16);
}
function k(n, t) {
  if (!n || !t) return 0;
  if (n.includes(t)) return 1e4 + t.length;
  const r = Math.min(72, t.length);
  if (r < 24) return 0;
  const a = Math.min(32, Math.max(0, t.length - r));
  for (let s = 0; s <= a; s += 4) {
    const o = t.slice(s, s + r);
    if (o.length >= 24 && n.includes(o))
      return o.length * 100 - s;
  }
  return 0;
}
function F(n, t) {
  if (!t) return null;
  const r = C(n, t.block_id);
  if (r) return r;
  const a = N(t.snippet);
  if (!a.length) return null;
  const s = t.page_idx != null ? Number(t.page_idx) + 1 : t.page != null ? Number(t.page) : null, o = Number.isFinite(s) && Number(s) >= 1 ? n.filter((u) => u.source.page === Math.floor(Number(s)) || u.translated.page === Math.floor(Number(s))) : n;
  let e = null, l = 0, i = !1;
  for (const u of o) {
    const f = [u.source.text, u.translated.text, u.markdown].map(m).filter(Boolean);
    let c = 0;
    for (const p of a)
      for (const d of f)
        c = Math.max(c, k(d, p));
    c > l ? (e = u, l = c, i = !1) : c > 0 && c === l && (i = !0);
  }
  return l > 0 && !i ? e : null;
}
function y(n) {
  let t = `${n || ""}`.trim().replace(/\\/g, "/");
  if (!t) return "";
  try {
    t = decodeURIComponent(new URL(t, "http://retainpdf.local/").pathname);
  } catch {
    try {
      t = decodeURIComponent(t);
    } catch {
    }
  }
  const r = "/markdown/images/", a = t.toLowerCase().indexOf(r);
  return a >= 0 && (t = t.slice(a + r.length)), t.replace(/^\.?\/?(?:images\/)?/i, "").replace(/\/{2,}/g, "/");
}
function P(n, t, r) {
  const a = y(t);
  if (!a) return null;
  const s = Number(r);
  return (Number.isFinite(s) && s >= 1 ? n.filter((e) => e.source.page === Math.floor(s)) : n).find((e) => [...e.assetUrls, ...e.assetIds].some((l) => {
    const i = y(l);
    return !!i && (i === a || a.endsWith(`/${i}`) || i.endsWith(`/${a}`));
  })) || null;
}
function R(n, t) {
  return t === "translated" ? n.translated : n.source;
}
function T(n, t, r) {
  if (!n || !t) return null;
  const a = R(n, r), s = r === "translated" ? t.translated : t.source || t.translated, o = s == null ? void 0 : s.pages.find((e) => e.page === a.page);
  return o ? { itemId: n.itemId, region: n, box: a, pageSize: o } : null;
}
function q(n, t, r) {
  if (!n || t <= 0 || r <= 0) return null;
  const { box: a, pageSize: s } = n;
  if (s.width <= 0 || s.height <= 0) return null;
  const [o, e, l, i] = a.bbox, u = a.origin === "bottom_left" ? s.height - i : e, f = a.origin === "bottom_left" ? s.height - e : i, c = Math.max(0, Math.min(t, o / s.width * t)), p = Math.max(c, Math.min(t, l / s.width * t)), d = Math.max(0, Math.min(r, u / s.height * r)), x = Math.max(d, Math.min(r, f / s.height * r));
  return p <= c || x <= d ? null : { left: c, top: d, width: p - c, height: x - d };
}
function K(n) {
  const t = `第 ${n.page} 页`;
  if (n.selectionType === "text") {
    const e = n.quote.trim();
    return e ? `关于${t}这段：「${e}」` : "";
  }
  const r = n.pane === "translated" ? n.region.translated : n.region.source, a = ((r == null ? void 0 : r.text) || n.region.markdown || "").trim(), o = {
    formula: "公式",
    table: "表格",
    figure: "图",
    text: "这段",
    region: "这块"
  }[n.kind] ?? "这块";
  return a ? `关于${t}的${o}：「${a}」` : "";
}
export {
  P as a,
  F as b,
  S as c,
  A as d,
  z as e,
  C as f,
  _ as g,
  K as h,
  B as i,
  R as j,
  T as k,
  U as n,
  q as p,
  L as r
};
//# sourceMappingURL=reader-regions-Dl_ljaDa.js.map
