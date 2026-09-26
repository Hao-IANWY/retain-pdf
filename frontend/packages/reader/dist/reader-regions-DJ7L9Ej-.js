import { n as b } from "./block-key-BTxcG28S.js";
function p(n) {
  return n && typeof n == "object" && !Array.isArray(n) ? n : null;
}
function M(n) {
  const t = p(n);
  return t && "data" in t ? t.data : n;
}
function m(n) {
  const t = Number(n);
  return Number.isFinite(t) && t > 0 ? t : null;
}
function $(n) {
  const t = p(n);
  if (!t || !Array.isArray(t.bbox) || t.bbox.length !== 4) return null;
  const r = t.bbox.map(Number);
  if (!r.every(Number.isFinite)) return null;
  const a = m(t.page);
  if (a == null) return null;
  const [o, e, s, l] = r, i = Math.min(o, s), u = Math.min(e, l), g = Math.max(o, s), c = Math.max(e, l);
  if (g <= i || c <= u) return null;
  const d = `${t.unit || "pdf_point"}`.trim().toLowerCase();
  if (d !== "pdf_point" && d !== "pt") return null;
  const f = `${t.origin || "top_left"}`.trim().toLowerCase();
  return f !== "top_left" && f !== "bottom_left" ? null : {
    page: Math.floor(a),
    bbox: [i, u, g, c],
    unit: "pdf_point",
    origin: f,
    text: `${t.text || ""}`
  };
}
function B(n) {
  const t = p(M(n)), r = Array.isArray(t == null ? void 0 : t.items) ? t.items : [], a = [];
  for (const o of r) {
    const e = p(o), s = `${(e == null ? void 0 : e.item_id) || (e == null ? void 0 : e.itemId) || ""}`.trim(), l = $(e == null ? void 0 : e.source), i = $(e == null ? void 0 : e.translated);
    !s || !l || !i || a.push({
      itemId: s,
      source: l,
      translated: i,
      markdown: `${(e == null ? void 0 : e.markdown) || ""}`,
      regionType: `${(e == null ? void 0 : e.region_type) || (e == null ? void 0 : e.regionType) || ""}`,
      status: `${(e == null ? void 0 : e.status) || ""}`,
      assetIds: (Array.isArray(e == null ? void 0 : e.asset_ids) ? e.asset_ids : []).map((u) => `${u || ""}`.trim()).filter(Boolean),
      assetUrls: (Array.isArray(e == null ? void 0 : e.asset_urls) ? e.asset_urls : []).map((u) => `${u || ""}`.trim()).filter(Boolean)
    });
  }
  return a;
}
function _(n) {
  const t = `${n || ""}`.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return t.includes("formula") || t.includes("equation") ? "formula" : t.includes("table") ? "table" : t.includes("figure") || t.includes("image") || t.includes("chart") || t.includes("seal") ? "figure" : t.includes("text") || t.includes("title") || t.includes("paragraph") || t.includes("reference") || t.includes("caption") ? "text" : "region";
}
function C(n) {
  const t = _(n.regionType);
  if (t !== "region") return t;
  if (n.assetIds.length || n.assetUrls.length) return "figure";
  const r = `${n.markdown || n.source.text || n.translated.text || ""}`.trim();
  return /^<table(?:\s|>)/i.test(r) || /\n\s*\|?\s*:?-{3,}/.test(r) ? "table" : /^\$\$[\s\S]+\$\$$/.test(r) || /^\\\[[\s\S]+\\\]$/.test(r) || /^\\begin\{(?:equation|align|gather|multline)\*?\}/.test(r) ? "formula" : r ? "text" : t;
}
function I(n) {
  const t = C(n);
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
  for (const [o, e] of a)
    if (t.startsWith(o) && t.endsWith(e) && t.length > o.length + e.length)
      return t.slice(o.length, -e.length).trim();
  return t;
}
function w(n) {
  const t = p(n);
  if (!t) return null;
  const r = [];
  for (const o of Array.isArray(t.pages) ? t.pages : []) {
    const e = p(o), s = m(e == null ? void 0 : e.page), l = m(e == null ? void 0 : e.width), i = m(e == null ? void 0 : e.height);
    s == null || l == null || i == null || r.push({ page: Math.floor(s), width: l, height: i });
  }
  if (!r.length) return null;
  const a = m(t.page_count ?? t.pageCount);
  return {
    pageCount: a == null ? r.length : Math.floor(a),
    pages: r
  };
}
function F(n) {
  const t = p(M(n));
  return {
    source: w(t == null ? void 0 : t.source),
    translated: w(t == null ? void 0 : t.translated)
  };
}
function N(n, t) {
  const r = b(t);
  return r && n.find((a) => b(a.itemId) === r) || null;
}
function h(n) {
  return `${n || ""}`.normalize("NFKC").toLocaleLowerCase().replace(/[\p{P}\p{S}\s]+/gu, "").trim();
}
function k(n) {
  const t = `${n || ""}`.trim();
  if (!t) return [];
  const r = t.split(/\n\s*\n/g).map(h).filter(Boolean), a = t.split(">").map(h).filter(Boolean), o = [...r.reverse(), ...a.reverse(), h(t)];
  return [...new Set(o)].filter((e) => e.length >= 16);
}
function A(n, t) {
  if (!n || !t) return 0;
  if (n.includes(t)) return 1e4 + t.length;
  const r = Math.min(72, t.length);
  if (r < 24) return 0;
  const a = Math.min(32, Math.max(0, t.length - r));
  for (let o = 0; o <= a; o += 4) {
    const e = t.slice(o, o + r);
    if (e.length >= 24 && n.includes(e))
      return e.length * 100 - o;
  }
  return 0;
}
function U(n, t) {
  if (!t) return null;
  const r = N(n, t.block_id);
  if (r) return r;
  const a = k(t.snippet);
  if (!a.length) return null;
  const o = t.page_idx != null ? Number(t.page_idx) + 1 : t.page != null ? Number(t.page) : null, e = Number.isFinite(o) && Number(o) >= 1 ? n.filter((u) => u.source.page === Math.floor(Number(o)) || u.translated.page === Math.floor(Number(o))) : n;
  let s = null, l = 0, i = !1;
  for (const u of e) {
    const g = [u.source.text, u.translated.text, u.markdown].map(h).filter(Boolean);
    let c = 0;
    for (const d of a)
      for (const f of g)
        c = Math.max(c, A(f, d));
    c > l ? (s = u, l = c, i = !1) : c > 0 && c === l && (i = !0);
  }
  return l > 0 && !i ? s : null;
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
  const o = Number(r);
  return (Number.isFinite(o) && o >= 1 ? n.filter((s) => s.source.page === Math.floor(o)) : n).find((s) => [...s.assetUrls, ...s.assetIds].some((l) => {
    const i = y(l);
    return !!i && (i === a || a.endsWith(`/${i}`) || i.endsWith(`/${a}`));
  })) || null;
}
function R(n, t) {
  return t === "translated" ? n.translated : n.source;
}
function T(n, t, r) {
  if (!n || !t) return null;
  const a = R(n, r), o = r === "translated" ? t.translated : t.source || t.translated, e = o == null ? void 0 : o.pages.find((s) => s.page === a.page);
  return e ? { itemId: n.itemId, region: n, box: a, pageSize: e } : null;
}
function q(n, t, r) {
  if (!n || t <= 0 || r <= 0) return null;
  const { box: a, pageSize: o } = n;
  if (o.width <= 0 || o.height <= 0) return null;
  const [e, s, l, i] = a.bbox, u = a.origin === "bottom_left" ? o.height - i : s, g = a.origin === "bottom_left" ? o.height - s : i, c = Math.max(0, Math.min(t, e / o.width * t)), d = Math.max(c, Math.min(t, l / o.width * t)), f = Math.max(0, Math.min(r, u / o.height * r)), x = Math.max(f, Math.min(r, g / o.height * r));
  return d <= c || x <= f ? null : { left: c, top: f, width: d - c, height: x - f };
}
function K(n) {
  const t = `第 ${n.page} 页`;
  if (n.selectionType === "text") {
    const s = n.quote.trim();
    return s ? `关于${t}这段：「${s}」` : "";
  }
  const r = n.pane === "translated" ? n.region.translated : n.region.source, a = ((r == null ? void 0 : r.text) || n.region.markdown || "").trim(), e = {
    formula: "公式",
    table: "表格",
    figure: "图",
    text: "这段",
    region: "这块"
  }[n.kind] ?? "这块";
  return a ? `关于${t}的${e}：「${a}」` : "";
}
export {
  P as a,
  U as b,
  B as c,
  _ as d,
  z as e,
  N as f,
  C as g,
  K as h,
  I as i,
  R as j,
  T as k,
  F as n,
  q as p,
  L as r
};
//# sourceMappingURL=reader-regions-DJ7L9Ej-.js.map
