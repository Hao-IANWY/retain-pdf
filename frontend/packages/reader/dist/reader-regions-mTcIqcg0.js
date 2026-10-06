import { n as b } from "./block-key-BTxcG28S.js";
function h(n) {
  return n && typeof n == "object" && !Array.isArray(n) ? n : null;
}
function M(n) {
  const t = h(n);
  return t && "data" in t ? t.data : n;
}
function g(n) {
  const t = Number(n);
  return Number.isFinite(t) && t > 0 ? t : null;
}
function w(n) {
  const t = h(n);
  if (!t || !Array.isArray(t.bbox) || t.bbox.length !== 4) return null;
  const r = t.bbox.map(Number);
  if (!r.every(Number.isFinite)) return null;
  const o = g(t.page);
  if (o == null) return null;
  const [s, a, e, l] = r, i = Math.min(s, e), u = Math.min(a, l), f = Math.max(s, e), c = Math.max(a, l);
  if (f <= i || c <= u) return null;
  const p = `${t.unit || "pdf_point"}`.trim().toLowerCase();
  if (p !== "pdf_point" && p !== "pt") return null;
  const d = `${t.origin || "top_left"}`.trim().toLowerCase();
  return d !== "top_left" && d !== "bottom_left" ? null : {
    page: Math.floor(o),
    bbox: [i, u, f, c],
    unit: "pdf_point",
    origin: d,
    text: `${t.text || ""}`
  };
}
function z(n) {
  const t = M(n), r = h(t), o = Array.isArray(t) ? t : Array.isArray(r == null ? void 0 : r.items) ? r.items : [], s = [];
  for (const a of o) {
    const e = h(a), l = `${(e == null ? void 0 : e.item_id) || (e == null ? void 0 : e.itemId) || ""}`.trim(), i = w(e == null ? void 0 : e.source), u = w(e == null ? void 0 : e.translated);
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
function _(n) {
  const t = `${n || ""}`.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return t.includes("formula") || t.includes("equation") ? "formula" : t.includes("table") ? "table" : t.includes("figure") || t.includes("image") || t.includes("chart") || t.includes("seal") ? "figure" : t.includes("text") || t.includes("title") || t.includes("paragraph") || t.includes("reference") || t.includes("caption") ? "text" : "region";
}
function R(n) {
  const t = _(n.regionType);
  if (t !== "region") return t;
  if (n.assetIds.length || n.assetUrls.length) return "figure";
  const r = `${n.markdown || n.source.text || n.translated.text || ""}`.trim();
  return /^<table(?:\s|>)/i.test(r) || /\n\s*\|?\s*:?-{3,}/.test(r) ? "table" : /^\$\$[\s\S]+\$\$$/.test(r) || /^\\\[[\s\S]+\\\]$/.test(r) || /^\\begin\{(?:equation|align|gather|multline)\*?\}/.test(r) ? "formula" : r ? "text" : t;
}
function L(n) {
  const t = R(n);
  return t === "formula" || t === "table" || t === "figure";
}
function C(n, t) {
  return `${A(n, t).text || n.markdown || ""}`.trim();
}
function U(n, t) {
  const r = C(n, t) || (t === "translated" ? `${n.source.text || ""}`.trim() : "");
  return R(n) === "formula" ? N(r) : r;
}
function N(n) {
  let t = `${n || ""}`.trim();
  if (!t) return "";
  const r = t.match(/^```(?:latex|tex|math)?\s*([\s\S]*?)\s*```$/i);
  r && (t = r[1].trim());
  const o = [
    ["$$", "$$"],
    ["\\[", "\\]"],
    ["\\(", "\\)"],
    ["$", "$"]
  ];
  for (const [s, a] of o)
    if (t.startsWith(s) && t.endsWith(a) && t.length > s.length + a.length)
      return t.slice(s.length, -a.length).trim();
  return t;
}
function y(n) {
  const t = h(n);
  if (!t) return null;
  const r = [];
  for (const s of Array.isArray(t.pages) ? t.pages : []) {
    const a = h(s), e = g(a == null ? void 0 : a.page), l = g(a == null ? void 0 : a.width), i = g(a == null ? void 0 : a.height);
    e == null || l == null || i == null || r.push({ page: Math.floor(e), width: l, height: i });
  }
  if (!r.length) return null;
  const o = g(t.page_count ?? t.pageCount);
  return {
    pageCount: o == null ? r.length : Math.floor(o),
    pages: r
  };
}
function F(n) {
  const t = h(M(n));
  return {
    source: y(t == null ? void 0 : t.source),
    translated: y(t == null ? void 0 : t.translated)
  };
}
function I(n, t) {
  const r = b(t);
  return r && n.find((o) => b(o.itemId) === r) || null;
}
function m(n) {
  return `${n || ""}`.normalize("NFKC").toLocaleLowerCase().replace(/[\p{P}\p{S}\s]+/gu, "").trim();
}
function S(n) {
  const t = `${n || ""}`.trim();
  if (!t) return [];
  const r = t.split(/\n\s*\n/g).map(m).filter(Boolean), o = t.split(">").map(m).filter(Boolean), s = [...r.reverse(), ...o.reverse(), m(t)];
  return [...new Set(s)].filter((a) => a.length >= 16);
}
function B(n, t) {
  if (!n || !t) return 0;
  if (n.includes(t)) return 1e4 + t.length;
  const r = Math.min(72, t.length);
  if (r < 24) return 0;
  const o = Math.min(32, Math.max(0, t.length - r));
  for (let s = 0; s <= o; s += 4) {
    const a = t.slice(s, s + r);
    if (a.length >= 24 && n.includes(a))
      return a.length * 100 - s;
  }
  return 0;
}
function T(n, t) {
  if (!t) return null;
  const r = I(n, t.block_id);
  if (r) return r;
  const o = S(t.snippet);
  if (!o.length) return null;
  const s = t.page_idx != null ? Number(t.page_idx) + 1 : t.page != null ? Number(t.page) : null, a = Number.isFinite(s) && Number(s) >= 1 ? n.filter((u) => u.source.page === Math.floor(Number(s)) || u.translated.page === Math.floor(Number(s))) : n;
  let e = null, l = 0, i = !1;
  for (const u of a) {
    const f = [u.source.text, u.translated.text, u.markdown].map(m).filter(Boolean);
    let c = 0;
    for (const p of o)
      for (const d of f)
        c = Math.max(c, B(d, p));
    c > l ? (e = u, l = c, i = !1) : c > 0 && c === l && (i = !0);
  }
  return l > 0 && !i ? e : null;
}
function $(n) {
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
  const r = "/markdown/images/", o = t.toLowerCase().indexOf(r);
  return o >= 0 && (t = t.slice(o + r.length)), t.replace(/^\.?\/?(?:images\/)?/i, "").replace(/\/{2,}/g, "/");
}
function P(n, t, r) {
  const o = $(t);
  if (!o) return null;
  const s = Number(r);
  return (Number.isFinite(s) && s >= 1 ? n.filter((e) => e.source.page === Math.floor(s)) : n).find((e) => [...e.assetUrls, ...e.assetIds].some((l) => {
    const i = $(l);
    return !!i && (i === o || o.endsWith(`/${i}`) || i.endsWith(`/${o}`));
  })) || null;
}
function A(n, t) {
  return t === "translated" ? n.translated : n.source;
}
function K(n, t, r) {
  if (!n || !t) return null;
  const o = A(n, r), s = r === "translated" ? t.translated : t.source || t.translated, a = s == null ? void 0 : s.pages.find((e) => e.page === o.page);
  return a ? { itemId: n.itemId, region: n, box: o, pageSize: a } : null;
}
function Y(n, t, r) {
  if (!n || t <= 0 || r <= 0) return null;
  const { box: o, pageSize: s } = n;
  if (s.width <= 0 || s.height <= 0) return null;
  const [a, e, l, i] = o.bbox, u = o.origin === "bottom_left" ? s.height - i : e, f = o.origin === "bottom_left" ? s.height - e : i, c = Math.max(0, Math.min(t, a / s.width * t)), p = Math.max(c, Math.min(t, l / s.width * t)), d = Math.max(0, Math.min(r, u / s.height * r)), x = Math.max(d, Math.min(r, f / s.height * r));
  return p <= c || x <= d ? null : { left: c, top: d, width: p - c, height: x - d };
}
export {
  P as a,
  T as b,
  z as c,
  U as d,
  N as e,
  I as f,
  _ as g,
  R as h,
  L as i,
  A as j,
  K as k,
  F as n,
  Y as p,
  C as r
};
//# sourceMappingURL=reader-regions-mTcIqcg0.js.map
