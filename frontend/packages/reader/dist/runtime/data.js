import { r as C, l as $, h as y } from "../markdown-payload-kK3ewW_I.js";
import { d as B } from "../pdf-document-config-DOSsufI-.js";
import { e as he, f as _e, a as ve, b as Ue, i as ke, n as ge, c as Me, p as Ae, r as Ee, d as Le, g as De, h as Fe, j as Je } from "../reader-regions-DsePY7B_.js";
const X = "/api/v1", S = 250;
function T(e, t) {
  return e().then(
    (u) => ({ value: u, error: null }),
    (u) => ({ value: t, error: u })
  );
}
function Z() {
  return Promise.resolve(null);
}
function Q() {
  return Promise.resolve({ items: [] });
}
function Y() {
  return Promise.resolve(null);
}
function P() {
  return Promise.resolve(null);
}
function V() {
  return Promise.resolve({ items: [] });
}
function x() {
  return Promise.resolve(null);
}
function I() {
  return Promise.resolve(null);
}
function b(e, t) {
  return typeof globalThis.fetch == "function" ? globalThis.fetch(e, t) : Promise.reject(new Error(`fetchProtected not injected for ${e}`));
}
function j({
  apiPrefix: e = X,
  loadJob: t = Z,
  loadManifest: u = Q,
  loadMarkdown: r = Y,
  loadMarkdownDocument: s = P,
  loadMarkdownSource: l = null,
  fetchMarkdownRange: o = null,
  loadRegions: f = V,
  loadMetadata: p = x,
  loadAiNotes: v = I,
  fetchProtectedResource: m = b,
  liveTranslation: U = null
} = {}) {
  const h = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map();
  function k(n) {
    const a = R.get(n);
    if (a && Date.now() - a.at < S)
      return Promise.resolve(a.value);
    const i = h.get(n);
    if (i) return i;
    let c;
    try {
      c = Promise.resolve(t(n, e)).then((d) => {
        const g = Date.now();
        R.set(n, { at: g, value: d });
        for (const [L, M] of R)
          g - M.at >= S && R.delete(L);
        return d;
      }).finally(() => {
        h.get(n) === c && h.delete(n);
      });
    } catch (d) {
      c = Promise.reject(d);
    }
    return h.set(n, c), c;
  }
  async function O(n, a = {}) {
    const i = a.includeOptionalArtifacts !== !1, c = k(n), d = u(n, e).catch((w) => {
      if (Number(w == null ? void 0 : w.status) === 404) return { items: [] };
      throw w;
    });
    if (!i) {
      const [w, q] = await Promise.all([c, d]);
      return {
        jobPayload: w,
        manifestPayload: q,
        readerMetadata: null,
        regionsPayload: { items: [] },
        readerErrors: { regions: null, metadata: null }
      };
    }
    const [g, L, M, J] = await Promise.all([
      c,
      d,
      T(() => f(n, e), { items: [] }),
      T(() => p(n, e), null)
    ]);
    return {
      jobPayload: g,
      manifestPayload: L,
      readerMetadata: J.value,
      regionsPayload: M.value,
      readerErrors: {
        regions: M.error,
        metadata: J.error
      }
    };
  }
  function z(n) {
    return k(n);
  }
  async function H(n) {
    const a = await $(
      () => s(n, e),
      () => r(n, e)
    );
    if (y(a)) return a;
    try {
      const i = await k(n), c = C(i, n);
      if (!c) return a;
      const d = await $(
        () => s(c, e),
        () => r(c, e)
      );
      return y(d) ? d : a;
    } catch {
      return a;
    }
  }
  async function K(n) {
    if (typeof l != "function") return null;
    let a = await l(n, e).catch(() => null);
    if (a != null && a.rawUrl) return a;
    try {
      const i = await k(n), c = C(i, n);
      return c ? (a = await l(c, e).catch(() => null), a != null && a.rawUrl ? a : null) : a;
    } catch {
      return a;
    }
  }
  function W(n, a, i, c, d) {
    return typeof o != "function" ? Promise.reject(new Error("fetchMarkdownRange not injected")) : o(n, a, i, c, d);
  }
  function G(n) {
    return n ? Promise.resolve(v(n, e)).catch(() => null) : Promise.resolve(null);
  }
  return Object.freeze({
    apiPrefix: e,
    fetchProtected: m,
    loadMarkdownPayload: H,
    loadMarkdownSource: K,
    loadMarkdownRange: W,
    loadJobPayload: z,
    loadReaderPayload: O,
    loadAiNotes: G,
    liveTranslation: U
  });
}
const ce = j();
function N(e) {
  return `${e ?? ""}`.trim();
}
function A(e = "") {
  return `${e ?? ""}`.trim() ? `${e}`.trim() : "";
}
const ee = 512 * 1024;
let _ = null;
function D(e = A) {
  return {
    moduleUrl: e("build/pdf.mjs"),
    workerUrl: e("build/pdf.worker.mjs"),
    cmapUrl: e("cmaps/"),
    standardFontDataUrl: e("standard_fonts/")
  };
}
async function te({ resolvePdfjsVendorUrl: e = A } = {}) {
  const { moduleUrl: t, workerUrl: u } = D(e);
  if (!t)
    throw new Error("resolvePdfjsVendorUrl not injected");
  return _ || (_ = import(t).then((r) => (r.GlobalWorkerOptions.workerSrc = u, r)).catch((r) => {
    throw _ = null, r;
  })), _;
}
function re(e, { resolveResourceUrl: t = N } = {}) {
  return t((e == null ? void 0 : e.resource_url) || (e == null ? void 0 : e.resource_path) || "");
}
function ne({
  url: e,
  configPort: t = B,
  resolvePdfjsVendorUrl: u = A
} = {}) {
  var l;
  if (!e)
    return null;
  const { cmapUrl: r, standardFontDataUrl: s } = D(u);
  return {
    url: e,
    httpHeaders: ((l = t == null ? void 0 : t.apiHeaders) == null ? void 0 : l.call(t)) ?? {},
    withCredentials: !1,
    disableRange: !1,
    disableStream: !1,
    rangeChunkSize: ee,
    cMapUrl: r,
    cMapPacked: !0,
    standardFontDataUrl: s
  };
}
async function de({
  itemOrUrl: e,
  configPort: t = B,
  fetchProtected: u = null,
  resolveResourceUrl: r = N,
  resolvePdfjsVendorUrl: s = A
} = {}) {
  const l = typeof e == "string" ? e : re(e, { resolveResourceUrl: r });
  if (!l)
    return null;
  const o = await te({ resolvePdfjsVendorUrl: s }), { cmapUrl: f, standardFontDataUrl: p } = D(s);
  if (l.startsWith("mock://") && typeof u == "function") {
    const v = await u(l), m = new Uint8Array(await v.arrayBuffer());
    return o.getDocument({
      data: m,
      cMapUrl: f,
      cMapPacked: !0,
      standardFontDataUrl: p
    }).promise;
  }
  return o.getDocument(ne({ url: l, configPort: t, resolvePdfjsVendorUrl: s })).promise;
}
function ie() {
  _ = null;
}
function E(e) {
  return `${e ?? ""}`.trim();
}
function F(e, t) {
  return (Array.isArray(e == null ? void 0 : e.items) ? e.items : []).find((r) => (r == null ? void 0 : r.artifact_key) === t && (r == null ? void 0 : r.ready)) || null;
}
function ae(e, t, { resolveResourceUrl: u = E, findReadyManifestArtifact: r = F } = {}) {
  const s = r(e, t), l = `${(s == null ? void 0 : s.resource_url) || (s == null ? void 0 : s.resource_path) || ""}`.trim();
  return l ? u(l) : "";
}
function se(e, { resolveResourceUrl: t = E } = {}) {
  return t((e == null ? void 0 : e.resource_url) || (e == null ? void 0 : e.resource_path) || "");
}
function ue(e) {
  var l, o, f, p;
  if (!e) return null;
  const t = (e == null ? void 0 : e.actions) || {}, u = (e == null ? void 0 : e.artifacts) || {}, r = !!(((l = t.download_pdf) == null ? void 0 : l.enabled) ?? ((o = u.pdf) == null ? void 0 : o.ready) ?? (e == null ? void 0 : e.pdf_ready) ?? (e == null ? void 0 : e.output_pdf_ready)), s = `${((f = t.download_pdf) == null ? void 0 : f.url) || ((p = u.pdf) == null ? void 0 : p.url) || (e == null ? void 0 : e.pdf_url) || ""}`.trim();
  return { pdfEnabled: r, pdf: s ? E(s) : "" };
}
function fe(e) {
  var t;
  return ((t = e == null ? void 0 : e.readerJobId) == null ? void 0 : t.call(e)) || "";
}
function pe(e, {
  findReadyManifestArtifact: t = F,
  resolveManifestArtifactUrl: u = (r, s) => ae(r, s, { findReadyManifestArtifact: t })
} = {}) {
  const r = u(e, "source_pdf");
  return r || t(e, "source_pdf");
}
function Re(e, t, {
  resolveJobActions: u = ue,
  findReadyManifestArtifact: r = F,
  resolveReaderArtifactUrl: s = se,
  resolveResourceUrl: l = E
} = {}) {
  const o = e ? u(e) : null;
  if (o != null && o.pdfEnabled && (o != null && o.pdf))
    return o.pdf;
  const f = ["pdf", "translated_pdf", "result_pdf"];
  for (const m of f) {
    const U = r(t, m), R = s(U, { resolveResourceUrl: l }) || s(U);
    if (R)
      return R;
  }
  const p = `${(e == null ? void 0 : e.workflow) || (e == null ? void 0 : e.job_type) || ""}`.trim().toLowerCase();
  return ((o == null ? void 0 : o.pdfEnabled) || `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase() === "succeeded" && p !== "ocr") && (e != null && e.job_id) ? l(`/api/v1/jobs/${encodeURIComponent(e.job_id)}/pdf`) : "";
}
export {
  ie as __resetPdfjsForTests,
  ne as buildPdfDocumentOptions,
  j as createReaderDataPort,
  ce as defaultReaderDataPort,
  he as extractReaderFormulaLatex,
  _e as findReaderRegion,
  ve as findReaderRegionByAssetUrl,
  Ue as findReaderRegionByCitation,
  ke as isStructuredReaderRegion,
  de as loadPdfDocument,
  ge as normalizeReaderMetadata,
  Me as normalizeReaderRegions,
  Ae as projectReaderRegion,
  Ee as readerRegionContent,
  Le as readerRegionKind,
  De as readerRegionKindForRegion,
  Fe as regionBoxForPane,
  re as resolveReaderArtifactUrl,
  fe as resolveReaderJobId,
  Je as resolveReaderRegionHighlight,
  pe as resolveReaderSourcePdf,
  Re as resolveReaderTranslatedPdfUrl
};
//# sourceMappingURL=data.js.map
