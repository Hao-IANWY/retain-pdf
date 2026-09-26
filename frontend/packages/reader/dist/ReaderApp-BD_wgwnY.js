var An = (e) => {
  throw TypeError(e);
};
var kn = (e, t, n) => t.has(e) || An("Cannot " + n);
var Ke = (e, t, n) => (kn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Nn = (e, t, n) => t.has(e) ? An("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Cn = (e, t, n, r) => (kn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as D, jsx as y, Fragment as It } from "react/jsx-runtime";
import { useMemo as V, useState as L, useEffect as j, useCallback as _, useRef as N, useLayoutEffect as _e, memo as tn, forwardRef as bo, useImperativeHandle as nn, createContext as rn, useContext as on, useSyncExternalStore as yo, useId as br, Suspense as vo, lazy as an } from "react";
import { requireAdapter as he, getReaderAdapters as ae } from "./adapters.js";
import { resolveReaderDownloadName as So, createReaderServerFavoritesPort as wo, resolveReaderDownloadUrls as Po, READER_PROGRESS_COPY as we, trimString as vt, READER_DOWNLOAD_ACTIONS as Ro, disabledReason as Io } from "./runtime/state.js";
import { d as To } from "./ask-answerer-GNQdzitl.js";
import "@retainpdf/api/conversations";
import { r as Eo, b as Mo } from "./page-config-Ct7qR5rm.js";
import { c as Ao, n as ko, f as Ct, h as jt, a as No, b as Co, i as yr, p as Tt, g as vr, r as Sr, j as Ln, e as Lo } from "./reader-regions-DsePY7B_.js";
import { i as xo, c as _o } from "./live-translation-CbniFg2b.js";
import { sortByPageAndCreatedAt as zo, buildAnnotationsMarkdown as Do, groupByPageAndCreatedAt as Fo } from "./runtime/content.js";
import { toast as Ut, Toaster as Oo } from "sonner";
import { X as sn, Radio as $o, FileText as wr, Columns2 as Pr, Languages as Rr, PanelRightClose as jo, Bookmark as Uo, StickyNote as Ir, Sparkles as Tr, FileCode2 as Bo, SquareTerminal as Ho, PenTool as Jo, Route as Wo, Sigma as Vo, Table2 as qo, Type as Ko, Image as Go, Check as Zo, Copy as Yo, Keyboard as Xo } from "lucide-react";
import { pdfjs as Qo, Page as ea, Document as ta } from "react-pdf";
import { e as na, m as ra, a as oa } from "./markdown-math-XkF5urpn.js";
const aa = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, sa = "", ia = Object.freeze({
  progress: "retainpdf-reader-progress"
}), ca = (e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, xl = (...e) => {
  var n;
  return (((n = ae()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Ee = () => he("defaultReaderDataPort"), xn = () => he("defaultReaderPageConfigPort"), _l = {
  get apiPrefix() {
    return Ee().apiPrefix;
  },
  fetchProtected: (...e) => Ee().fetchProtected(...e),
  loadMarkdownPayload: (e) => Ee().loadMarkdownPayload(e),
  loadMarkdownSource: (e) => Ee().loadMarkdownSource(e),
  loadMarkdownRange: (e, t, n, r, o) => Ee().loadMarkdownRange(e, t, n, r, o),
  loadJobPayload: (e) => Ee().loadJobPayload(e),
  loadReaderPayload: (e, t) => Ee().loadReaderPayload(e, t),
  get liveTranslation() {
    return Ee().liveTranslation;
  }
}, Er = {
  messageTargetOrigin: () => xn().messageTargetOrigin(),
  readerJobId: () => xn().readerJobId()
}, la = () => {
  var e;
  return ((e = ae()) == null ? void 0 : e.liveTranslation) ?? null;
}, tt = () => {
  var t;
  const e = ae();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, cn = () => {
  const e = ae();
  if (e != null && e.sessionData) return e.sessionData;
  const t = e == null ? void 0 : e.defaultReaderDataPort;
  if (!t) throw new Error("Reader adapter missing: defaultReaderDataPort (call setReaderAdapters)");
  return {
    loadReaderPayload: t.loadReaderPayload,
    loadJobPayload: t.loadJobPayload,
    fetchDocumentByJobId: (...n) => he("fetchDocumentByJobId")(...n),
    fetchProtected: t.fetchProtected,
    resolveResourceUrl: e.resolveResourceUrl ?? ((n) => n),
    resolveReaderSourcePdf: (n) => {
      var r;
      return ((r = e.resolveReaderSourcePdf) == null ? void 0 : r.call(e, n)) ?? null;
    },
    resolveReaderTranslatedPdfUrl: (n, r) => {
      var o;
      return ((o = e.resolveReaderTranslatedPdfUrl) == null ? void 0 : o.call(e, n, r)) ?? "";
    },
    resolveReaderArtifactUrl: (n) => {
      var r;
      return ((r = e.resolveReaderArtifactUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, zl = () => {
  var e;
  return ((e = ae()) == null ? void 0 : e.aiOperations) ?? null;
}, Dl = () => {
  var e;
  return ((e = ae()) == null ? void 0 : e.conversations) ?? null;
}, Fl = () => {
  var e;
  return ((e = ae()) == null ? void 0 : e.askChat) ?? null;
}, da = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, ua = () => {
  var e, t;
  return ((t = (e = ae()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, fa = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, ma = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? So(...e);
}, pa = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? Po(...e);
}, ha = (...e) => he("downloadProtectedResource")(...e), ga = (...e) => he("failDownloadToast")(...e), Ol = (e, t) => he("resolveMarkdownAssetUrl")(e, t), $l = (e = {}) => {
  const t = ae();
  return To({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) || "/api/v1",
    ask: t == null ? void 0 : t.askDocumentAi,
    documentByJobId: t == null ? void 0 : t.fetchDocumentByJobId,
    ...e
  });
}, ln = "/api/v1", jl = (e = ln, t = {}) => {
  var n;
  return he("fetchFavorites")(
    ((n = ae()) == null ? void 0 : n.apiPrefix) ?? e,
    t
  );
};
function Ul(e = {}) {
  const t = ae();
  return wo({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) ?? ln,
    documentByJobId: (...n) => he("fetchDocumentByJobId")(...n),
    submitFavorite: (...n) => he("createFavorite")(...n),
    loadFavorites: (...n) => he("fetchFavorites")(...n),
    removeFavorite: (...n) => he("deleteFavorite")(...n),
    ...e
  });
}
function ba() {
  const e = () => {
    var r;
    return Eo(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = L(e);
  return j(() => {
    var l, i, c, d;
    const r = () => n(e()), o = (i = (l = globalThis.history) == null ? void 0 : l.pushState) == null ? void 0 : i.bind(globalThis.history), a = (d = (c = globalThis.history) == null ? void 0 : c.replaceState) == null ? void 0 : d.bind(globalThis.history);
    let s = !1;
    if (o && a)
      try {
        const u = (f) => function(...m) {
          const b = f.apply(this, m);
          return r(), globalThis.dispatchEvent(new Event("pushstate")), globalThis.dispatchEvent(new Event("replacestate")), globalThis.dispatchEvent(new Event("locationchange")), b;
        };
        globalThis.history.pushState = u(o), globalThis.history.replaceState = u(a), s = !0;
      } catch {
      }
    return window.addEventListener("popstate", r), window.addEventListener("hashchange", r), window.addEventListener("pushstate", r), window.addEventListener("replacestate", r), window.addEventListener("locationchange", r), () => {
      if (window.removeEventListener("popstate", r), window.removeEventListener("hashchange", r), window.removeEventListener("pushstate", r), window.removeEventListener("replacestate", r), window.removeEventListener("locationchange", r), s && o && a)
        try {
          globalThis.history.pushState = o, globalThis.history.replaceState = a;
        } catch {
        }
    };
  }, []), t;
}
function ya() {
  const e = ba(), t = V(() => fa(Er), [e]), n = V(() => ua(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function va(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: o,
    documentIdRef: a,
    sessionJobIdRef: s,
    switchToSourceMode: l
  } = e, [i, c] = L({
    documentId: "",
    jobId: ""
  }), [d, u] = L({
    documentId: "",
    jobId: ""
  }), f = i.documentId === t ? i.jobId : "", m = d.documentId === t ? d.jobId : "", b = n || f, [p, g] = L({
    jobId: "",
    documentId: ""
  }), v = p.jobId === b ? p.documentId : "", S = t || v, P = !!t && !b, [h, w] = L(null), A = (h == null ? void 0 : h.sessionIdentity) === r && h.documentId === S ? h : null, M = P || !!A, F = _((C) => {
    const I = `${C.documentId || ""}`.trim();
    if (!I || a.current && a.current !== I) return;
    if (!a.current && s.current)
      g({
        jobId: s.current,
        documentId: I
      });
    else if (!a.current)
      return;
    const R = `${C.revision || ""}`.trim() || `${Date.now()}`;
    w({
      documentId: I,
      revision: R,
      sessionIdentity: o.current
    }), l();
  }, []);
  j(() => {
    w((C) => C && C.sessionIdentity !== r ? null : C);
  }, [r]);
  const x = _((C) => {
    switch (C.type) {
      case "resolved-document-job":
        c({ documentId: C.documentId, jobId: C.jobId });
        break;
      case "cleared-resolved-document-job":
        c({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        u({ documentId: C.documentId, jobId: C.jobId });
        break;
      case "resolved-job-document":
        g((I) => I.jobId === C.jobId && I.documentId === C.documentId ? I : { jobId: C.jobId, documentId: C.documentId });
        break;
      case "committed-source":
        w({
          documentId: C.documentId,
          revision: C.revision,
          sessionIdentity: C.sessionIdentity
        });
        break;
    }
  }, []);
  return {
    resolvedDocumentJob: i,
    setResolvedDocumentJob: c,
    missingDocumentJob: d,
    setMissingDocumentJob: u,
    documentJobId: f,
    rejectedDocumentJobId: m,
    sessionJobId: b,
    resolvedJobDocument: p,
    setResolvedJobDocument: g,
    jobDocumentId: v,
    documentId: S,
    sourceOnly: P,
    committedDocumentSource: h,
    setCommittedDocumentSource: w,
    activeCommittedDocumentSource: A,
    sourceViewOnly: M,
    refreshCommittedDocument: F,
    applyIdentityEvent: x
  };
}
const Sa = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function _n(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function wa(e) {
  var r, o, a, s;
  if (!e || typeof e != "object") return "";
  const t = e, n = [
    t.document_id,
    t.documentId,
    (r = t.document) == null ? void 0 : r.document_id,
    (o = t.book_summary) == null ? void 0 : o.document_id,
    (s = (a = t.request_payload) == null ? void 0 : a.source) == null ? void 0 : s.document_id
  ];
  for (const l of n) {
    const i = `${l || ""}`.trim();
    if (i) return i;
  }
  return "";
}
function zn(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return ca(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function Pa(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function Ra(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !Pa(a, t))
      return a.replace(/\.pdf$/i, "");
  }
  return "";
}
function Bt({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: ia.progress,
        stage: n,
        percent: e,
        text: t
      },
      Er.messageTargetOrigin()
    );
  } catch {
  }
}
function St(e, t, n, r = "progress") {
  e({
    loading: !0,
    percent: t,
    text: n,
    stage: r,
    failed: !1
  }), Bt({ percent: t, text: n, stage: r });
}
function Ia(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [l, i] = L(null), [c, d] = L(null), [u, f] = L(""), [m, b] = L(0), p = u === n ? l : null, g = u === n ? c : null, v = _n(p), S = Sa.has(v), P = _(() => {
    b((x) => x + 1);
  }, []), h = _((x) => {
    i(x.jobPayload), d(x.manifestPayload), f(x.sessionIdentity);
  }, []), w = _((x) => {
    i(null), d(null), f(x);
  }, []), A = N(""), M = N(""), F = _(async () => {
    const x = o.current;
    if (!x || A.current === x) return;
    const C = cn().loadJobPayload;
    if (typeof C != "function") return;
    const I = a.current.value;
    A.current = x;
    try {
      const R = await C(x);
      if (s.current || a.current.value !== I || o.current !== x || !R || typeof R != "object")
        return;
      const T = _n(R);
      i(R), f(r.current), T === "succeeded" && M.current !== x && (M.current = x, b((E) => E + 1));
    } catch {
    } finally {
      A.current === x && (A.current = "");
    }
  }, []);
  return j(() => {
    M.current = "";
  }, [n]), j(() => {
    if (!t || S || !p) return;
    const x = window.setInterval(() => {
      F();
    }, 1e3);
    return () => window.clearInterval(x);
  }, [S, F, p, t]), {
    jobPayload: l,
    setJobPayload: i,
    manifestPayload: c,
    setManifestPayload: d,
    payloadSessionIdentity: u,
    setPayloadSessionIdentity: f,
    scopedJobPayload: p,
    scopedManifestPayload: g,
    jobStatus: v,
    jobTerminal: S,
    jobRefreshRevision: m,
    refreshJobArtifacts: P,
    refreshJobStatus: F,
    publishPayload: h,
    clearPayload: w
  };
}
function Ht(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function Ta(e, t) {
  e(t), Ht(t);
}
function Ea(e) {
  const [t, n] = L(e ? "source" : "compare"), r = _((a) => {
    e && a !== "source" || (n(a), Ht(a));
  }, [e]), o = _((a) => {
    Ta(n, a);
  }, []);
  return j(() => (e && document.documentElement.classList.add("reader-source-only"), Ht(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: o };
}
function Dn(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function Ma(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: Dn(n.active_job_id),
    activeVersionId: Dn(n.active_version_id)
  };
}
function Aa(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function ka(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function Na(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function Ca(e) {
  return e ? { data: e.data.slice() } : null;
}
const La = 2, ge = /* @__PURE__ */ new Map();
function Jt(e, t) {
  ge.delete(e), ge.set(e, t);
}
function xa(e) {
  if (ge.size < La) return;
  const t = ge.keys().next().value;
  t && ge.delete(t);
}
function Lt(e) {
  const t = `${e || ""}`.trim();
  if (!t || !ge.has(t)) return null;
  const n = ge.get(t);
  return Jt(t, n), n;
}
async function Mr(e, t = tt().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (ge.has(r)) {
    const l = ge.get(r);
    return Jt(r, l), l;
  }
  const o = await t(r, { signal: n.signal });
  if (!o.ok) {
    const l = new Error(`读取 PDF 失败 (${o.status})`);
    throw l.status = o.status, l;
  }
  const a = await o.arrayBuffer(), s = { data: new Uint8Array(a) };
  return ge.has(r) ? Jt(r, s) : (xa(), ge.set(r, s)), s;
}
function _a(e = "", t = null) {
  const [n, r] = L(
    () => t || Lt(e)
  ), [o, a] = L(
    () => !!`${e || ""}`.trim() && !t && !Lt(e)
  ), [s, l] = L("");
  return j(() => {
    if (t) {
      r(t), a(!1), l("");
      return;
    }
    const i = `${e || ""}`.trim();
    if (!i) {
      r(null), a(!1), l("");
      return;
    }
    const c = Lt(i);
    if (c) {
      r(c), a(!1), l("");
      return;
    }
    let d = !1;
    return a(!0), l(""), r(null), Mr(i).then((u) => {
      d || (r(u), a(!1));
    }).catch((u) => {
      d || (r(null), a(!1), l((u == null ? void 0 : u.message) || String(u)));
    }), () => {
      d = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function za(e) {
  const { sessionEpochRef: t, closingRef: n, abort: r, sessionEpoch: o } = e;
  let a = !1;
  const s = () => r.signal.aborted || n.current || t.current.value !== o;
  return {
    signal: r.signal,
    isClosedOrStale: s,
    isInactive: () => a || s(),
    markFailed: () => {
      a = !0;
    }
  };
}
async function Wt(e) {
  const { url: t, label: n, percentStart: r, percentEnd: o, fence: a, setBoot: s } = e;
  if (!t || a.isInactive())
    return null;
  St(s, r, n, "download");
  const l = await Mr(t, tt().fetchProtected, {
    signal: a.signal
  });
  return a.isInactive() ? null : (St(s, o, n, "download"), l);
}
async function Da(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: o } = e;
  St(o, 25, "正在下载 PDF…", "download");
  const a = [];
  let s = null, l = null;
  return t && a.push(
    Wt({
      url: t,
      label: "正在下载原文 PDF…",
      percentStart: 30,
      percentEnd: 55,
      fence: r,
      setBoot: o
    }).then((d) => {
      s = d;
    })
  ), n && a.push(
    Wt({
      url: n,
      label: "正在下载译文 PDF…",
      percentStart: 55,
      percentEnd: 85,
      fence: r,
      setBoot: o
    }).then((d) => {
      l = d;
    })
  ), await Promise.all(a), r.isInactive() ? { status: "inactive" } : !!t && !s || !!n && !l ? { status: "incomplete" } : { status: "downloaded", sourceBytes: s, translatedBytes: l };
}
const ft = {
  regions: null,
  metadata: null
};
function Fa(e) {
  const {
    sessionJobId: t,
    jobId: n,
    routeDocumentId: r,
    documentJobId: o,
    rejectedDocumentJobId: a,
    sourceOnly: s,
    locationKey: l,
    sessionIdentity: i,
    committedSource: c,
    applyIdentityEvent: d,
    publishPayload: u,
    clearPayload: f,
    switchSessionMode: m,
    jobRefreshRevision: b,
    sessionEpochRef: p,
    closingRef: g,
    activeLoadAbortRef: v
  } = e, [S, P] = L(""), [h, w] = L(""), [A, M] = L(null), [F, x] = L(null), [C, I] = L(!1), [R, T] = L(""), [E, k] = L([]), [U, B] = L(() => ({
    source: null,
    translated: null
  })), [Z, te] = L(
    ft
  ), [re, O] = L({
    loading: !0,
    percent: 4,
    text: we.boot,
    stage: "progress",
    failed: !1
  });
  return j(() => {
    const Y = new AbortController(), ce = p.current.value, ne = za({
      sessionEpochRef: p,
      closingRef: g,
      abort: Y,
      sessionEpoch: ce
    });
    v.current = Y;
    const $ = cn();
    if (g.current)
      return Y.abort(), () => {
        v.current === Y && (v.current = null);
      };
    function W(X, q) {
      ne.markFailed(), O({
        loading: !1,
        percent: 100,
        text: X,
        stage: "failed",
        failed: !0
      }), Bt({ percent: 100, text: q, stage: "failed" });
    }
    function ue() {
      I(!0), O({
        loading: !1,
        percent: 100,
        text: we.ready,
        stage: "ready",
        failed: !1
      }), Bt({ percent: 100, text: we.ready, stage: "ready" });
    }
    function fe() {
      return c != null && c.documentId ? zn(
        c.documentId,
        c.revision
      ) : aa() ? sa : $.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function Fe() {
      let X = { activeJobId: "", activeVersionId: "" };
      try {
        const me = await $.fetchProtected(
          $.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (me != null && me.ok) {
          const ke = await me.json().catch(() => null);
          X = Ma(ke);
        }
      } catch {
      }
      const q = Aa({
        link: X,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!c
      });
      if (q.kind === "follow-active-job") {
        if (ne.isInactive()) return;
        d({
          type: "resolved-document-job",
          documentId: r,
          jobId: q.jobId
        }), q.activeVersionId ? (c || d({
          type: "committed-source",
          documentId: r,
          revision: q.activeVersionId,
          sessionIdentity: i
        }), m("source")) : m("compare");
        return;
      }
      if (q.kind === "open-committed-source") {
        if (ne.isInactive()) return;
        d({
          type: "committed-source",
          documentId: r,
          revision: q.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const oe = fe();
      if (ne.isInactive()) return;
      P(oe), w(""), T(""), f(i);
      const ve = await Wt({
        url: oe,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: ne,
        setBoot: O
      });
      if (!ne.isInactive()) {
        if (!ve) {
          W("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        M(ve), ue();
      }
    }
    async function kt() {
      var ut;
      const X = await ((ut = $.loadSessionSnapshot) == null ? void 0 : ut.call($, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: c,
        includeOptionalArtifacts: !c
      })), q = X ? {
        jobPayload: X.sourcePayload,
        manifestPayload: X.manifestPayload,
        readerMetadata: X.readerMetadata,
        regionsPayload: X.regions,
        readerErrors: X.readerErrors
      } : await $.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !c
      });
      if (ne.isInactive()) return;
      let oe = null;
      if (n && !r) {
        try {
          oe = await $.fetchDocumentByJobId(ln, t);
        } catch {
        }
        if (ne.isInactive()) return;
      }
      const ve = wa(q.jobPayload) || `${(oe == null ? void 0 : oe.document_id) || ""}`.trim();
      ve && !r && d({
        type: "resolved-job-document",
        jobId: t,
        documentId: ve
      });
      const me = ka({
        payloadDocumentId: ve,
        linkedActiveJobId: `${(oe == null ? void 0 : oe.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(oe == null ? void 0 : oe.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!c
      });
      if (me.kind === "restore-committed-source") {
        if (ne.isInactive()) return;
        d({
          type: "committed-source",
          documentId: me.documentId,
          revision: me.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const ke = $.resolveReaderSourcePdf(q.manifestPayload), lt = $.resolveReaderTranslatedPdfUrl(q.jobPayload, q.manifestPayload), Nt = typeof ke == "string" ? ke : $.resolveReaderArtifactUrl(ke), dt = r || ve, Se = c != null && c.documentId ? zn(
        c.documentId,
        c.revision
      ) : Nt || (dt ? $.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(dt)}/source.pdf`) : ""), Te = c ? "" : lt || "";
      if (P(Se || ""), w(Te), T(Ra(q.jobPayload, t)), u({
        jobPayload: q.jobPayload || null,
        manifestPayload: q.manifestPayload || null,
        sessionIdentity: i
      }), k(c ? [] : Ao(q.regionsPayload)), B(c ? { source: null, translated: null } : ko(q.readerMetadata)), te(c ? ft : q.readerErrors ?? ft), !Se && !Te) {
        W(we.failed, we.failed);
        return;
      }
      const $e = await Da({
        sourceFinal: Se || "",
        translatedFinal: Te,
        fence: ne,
        setBoot: O
      });
      if ($e.status !== "inactive") {
        if ($e.status === "incomplete") {
          W("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        M($e.sourceBytes), x($e.translatedBytes), ue();
      }
    }
    async function Oe() {
      I(!1), M(null), x(null), k([]), B({ source: null, translated: null }), te(ft), St(O, 8, we.metadata, "metadata");
      try {
        if (s) {
          await Fe();
          return;
        }
        if (!t) {
          W(we.failed, we.failed);
          return;
        }
        await kt();
      } catch (X) {
        if (ne.isClosedOrStale() || (X == null ? void 0 : X.name) === "AbortError") return;
        ne.markFailed();
        const q = Number(X == null ? void 0 : X.status);
        if (Na({
          status: q,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          d({ type: "missing-document-job", documentId: r, jobId: t }), d({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const oe = X instanceof Error ? X.message : we.failed;
        W(oe, oe);
      }
    }
    return Oe(), () => {
      Y.abort(), v.current === Y && (v.current = null);
    };
  }, [t, r, o, a, s, l, c, b, n, i, d, u, f, m]), {
    sourceUrl: S,
    translatedUrl: h,
    sourceFile: A,
    translatedFile: F,
    assetsReady: C,
    title: R,
    regions: E,
    readerMetadata: U,
    readerErrors: Z,
    boot: re
  };
}
function Oa() {
  const e = N(!1), t = N(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = ya(), s = N({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const l = N(a), i = N(""), c = N(""), d = N(() => {
  }), u = _(() => d.current(), []), f = va({
    routeDocumentId: o,
    jobId: r,
    sessionIdentity: a,
    sessionIdentityRef: l,
    documentIdRef: i,
    sessionJobIdRef: c,
    switchToSourceMode: u
  }), {
    sessionJobId: m,
    documentId: b,
    sourceOnly: p,
    sourceViewOnly: g
  } = f, { mode: v, setMode: S, switchSessionMode: P } = Ea(g);
  d.current = () => {
    P("source");
  }, l.current = a, i.current = b, c.current = m;
  const h = Ia({
    sessionJobId: m,
    sessionIdentity: a,
    sessionIdentityRef: l,
    sessionJobIdRef: c,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: w,
    scopedManifestPayload: A,
    jobStatus: M,
    jobTerminal: F,
    jobRefreshRevision: x,
    refreshJobArtifacts: C,
    refreshJobStatus: I
  } = h, R = Fa({
    sessionJobId: m,
    jobId: r,
    routeDocumentId: o,
    documentJobId: f.documentJobId,
    rejectedDocumentJobId: f.rejectedDocumentJobId,
    sourceOnly: p,
    locationKey: n,
    sessionIdentity: a,
    committedSource: f.activeCommittedDocumentSource,
    applyIdentityEvent: f.applyIdentityEvent,
    publishPayload: h.publishPayload,
    clearPayload: h.clearPayload,
    switchSessionMode: P,
    jobRefreshRevision: x,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), T = _(() => {
    var k;
    e.current = !0, (k = t.current) == null || k.abort();
  }, []), E = V(
    () => ({
      fetchProtected: cn().fetchProtected,
      jobId: m,
      jobPayload: w,
      manifestPayload: A,
      sourceUrl: R.sourceUrl,
      translatedUrl: R.translatedUrl,
      sourceOnly: g
    }),
    [m, w, A, R.sourceUrl, R.translatedUrl, g]
  );
  return {
    jobId: m,
    jobStatus: M,
    workflow: `${(w == null ? void 0 : w.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: F,
    documentId: b,
    sessionIdentity: a,
    sourceOnly: p,
    mode: v,
    setMode: S,
    sourceUrl: R.sourceUrl,
    translatedUrl: R.translatedUrl,
    sourceFile: R.sourceFile,
    translatedFile: R.translatedFile,
    assetsReady: R.assetsReady,
    boot: R.boot,
    title: R.title,
    regions: R.regions,
    readerMetadata: R.readerMetadata,
    readerErrors: R.readerErrors,
    download: E,
    refreshJobArtifacts: C,
    refreshJobStatus: I,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: T
  };
}
const $a = 160, ja = 8, Ua = 960;
function Ba() {
  const e = N(null), [t, n] = L(null), [r, o] = L(Ua), a = _((s) => {
    e.current = s, n(s);
  }, []);
  return j(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const l = (c) => {
      !Number.isFinite(c) || c < $a || o((d) => Math.abs(d - c) < ja ? d : c);
    }, i = new ResizeObserver((c) => {
      var d, u;
      l(((u = (d = c[0]) == null ? void 0 : d.contentRect) == null ? void 0 : u.width) ?? s.clientWidth);
    });
    return i.observe(s), l(s.clientWidth), () => i.disconnect();
  }, [t]), {
    shellRef: e,
    shellEl: t,
    shellWidth: r,
    bindShell: a
  };
}
function Ha(e) {
  const { mode: t, sourceOnly: n, assetsReady: r, hasSource: o, hasTranslated: a } = e, s = r && o, l = r && a && !n, i = t === "source" || t === "compare", c = !n && (t === "translated" || t === "compare");
  return {
    mountSource: s,
    mountTranslated: l,
    showSource: i,
    showTranslated: c,
    compareMode: t === "compare" && i && c && s && l,
    primaryPane: t === "translated" ? "translated" : "source"
  };
}
const xt = { source: 0, translated: 0 };
function Ja(e, t) {
  const {
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    sourceUrl: a,
    translatedUrl: s,
    sourceFile: l,
    translatedFile: i
  } = e, c = `${(t == null ? void 0 : t.identityKey) || ""}\0${a}\0${s}`, d = N(c);
  d.current = c;
  const [u, f] = L(() => ({
    identity: c,
    pages: xt
  })), [m, b] = L(() => ({ identity: c, tick: 0 })), p = u.identity === c ? u.pages : xt, g = m.identity === c ? m.tick : 0, v = Ha({
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    hasSource: !!l || !!a,
    hasTranslated: !!i
  }), { primaryPane: S } = v, P = _((I, R) => {
    d.current === c && f((T) => {
      const E = T.identity === c ? T.pages : xt;
      return E[R] === I && T.identity === c ? T : {
        identity: c,
        pages: { ...E, [R]: I }
      };
    });
  }, [c]), h = N(null), w = _(() => {
    h.current && clearTimeout(h.current);
    const I = c;
    h.current = setTimeout(() => {
      h.current = null, d.current === I && b((R) => ({
        identity: I,
        tick: R.identity === I ? R.tick + 1 : 1
      }));
    }, 60);
  }, [c]);
  j(() => (h.current && (clearTimeout(h.current), h.current = null), f((I) => I.identity === c && I.pages.source === 0 && I.pages.translated === 0 ? I : { identity: c, pages: { source: 0, translated: 0 } }), b((I) => I.identity === c && I.tick === 0 ? I : { identity: c, tick: 0 }), () => {
    h.current && (clearTimeout(h.current), h.current = null);
  }), [c]);
  const A = V(
    () => Math.max(p.source, p.translated),
    [p]
  ), M = S === "translated" ? p.translated : p.source || p.translated, F = t == null ? void 0 : t.userZoom, x = t == null ? void 0 : t.shellWidth, C = `${c}-${g}-${F}-${n}-${p.source}-${p.translated}-${x}`;
  return {
    ...v,
    numPagesByPane: p,
    hudNumPages: A,
    primaryNumPages: M,
    metricsTick: g,
    onNumPages: P,
    onMetrics: w,
    rowSyncRevision: C
  };
}
const We = "data-reader-page", Ve = "data-reader-pane", dn = "data-natural-height", Wa = "reader-react-root", Va = "reader-react-grid", Ar = "reader-react-scroll-shell", qa = "reader-react-pdf-pane", kr = "reader-react-pdf-page", wt = "reader-react-pdf-page-placeholder", un = "reader-react-pdf-page-slot";
function nt(e, t) {
  const n = e != null ? `[${We}="${e}"]` : `[${We}]`;
  return t ? `${n}[${Ve}="${t}"]` : n;
}
function Ka() {
  return `.${un}[${We}]`;
}
function Et(e) {
  return Number(e.getAttribute(We));
}
const Nr = 0.25, Cr = 1, Ga = 0.05, it = 0.5, Za = 16, Ya = 8;
function Qe(e) {
  return it;
}
function Mt(e) {
  return Number.isFinite(e) ? Math.min(Cr, Math.max(Nr, e)) : it;
}
function rt(e, t) {
  const n = Mt(Number(e) + t * Ga);
  return Math.round(n * 100) / 100;
}
function Xa(e) {
  return Math.round(Mt(e) * 100);
}
function Qa(e) {
  const n = (Number(e) || 0) - Za - Ya;
  return Math.max(160, Math.floor(n));
}
function es(e, t = it) {
  const n = Mt(t);
  return Qa((Number(e) || 0) * n);
}
function ts(e, t) {
  if (!e || !Number.isFinite(t) || t <= 0 || Math.abs(t - 1) < 1e-3)
    return;
  const n = e.scrollLeft + e.clientWidth / 2, r = e.scrollTop + e.clientHeight / 2, o = Array.from(
    e.querySelectorAll(`[${Ve}]`)
  ).map((s) => ({
    pane: s,
    cx: s.scrollLeft + s.clientWidth / 2,
    hadOverflow: s.scrollWidth > s.clientWidth + 1
  })), a = () => {
    e.scrollLeft = Math.max(0, n * t - e.clientWidth / 2), e.scrollTop = Math.max(0, r * t - e.clientHeight / 2);
    for (const { pane: s, cx: l, hadOverflow: i } of o) {
      const c = Math.max(0, s.scrollWidth - s.clientWidth);
      if (c <= 0) {
        s.scrollLeft = 0;
        continue;
      }
      i ? s.scrollLeft = Math.min(
        c,
        Math.max(0, l * t - s.clientWidth / 2)
      ) : s.scrollLeft = c / 2;
    }
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(a);
  });
}
const Lr = [
  "markdown",
  "ai",
  "notes",
  "favorites"
], xr = [
  "reading-path",
  "reading-canvas",
  "terminal"
], ns = [
  ...Lr,
  ...xr
];
function _r(e) {
  return ns.includes(e);
}
const rs = "retainpdf:reader:view:v1:", Fn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), os = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function zr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function Vt(e) {
  return `${e || ""}`.trim();
}
function as({
  documentId: e,
  jobId: t
}) {
  const n = Vt(e);
  if (n) return `document:${n}`;
  const r = Vt(t);
  return r ? `job:${r}` : "";
}
function Dr(e) {
  const t = Vt(e);
  return t ? `${rs}${t}` : "";
}
function ss(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function is(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!Fn.has(t) || !Fn.has(n) || t === n))
    return { left: t, right: n };
}
function cs(e) {
  return e === null ? null : _r(e) ? e : void 0;
}
function ls(e) {
  return os.has(e) ? e : void 0;
}
function Fr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = ss(t.anchor), r = Number(t.zoom), o = ls(t.mode), a = is(t.splitLayout), s = cs(t.assistantPanel);
  return {
    schema: "retainpdf_reader_view_v1",
    ...n ? { anchor: n } : {},
    ...Number.isFinite(r) ? { zoom: Math.max(0.25, Math.min(1, r)) } : {},
    ...o !== void 0 ? { mode: o } : {},
    ...a !== void 0 ? { splitLayout: a } : {},
    ...s !== void 0 ? { assistantPanel: s } : {},
    updatedAt: Number.isFinite(Number(t.updatedAt)) ? Number(t.updatedAt) : 0
  };
}
function Re(e, t = zr()) {
  const n = Dr(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Fr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function At(e, t, n = zr()) {
  const r = Dr(e);
  if (!r || !n) return null;
  const o = Re(e, n), a = Fr({
    schema: "retainpdf_reader_view_v1",
    ...o || {},
    ...t,
    updatedAt: Date.now()
  });
  if (!a) return null;
  try {
    return n.setItem(r, JSON.stringify(a)), a;
  } catch {
    return null;
  }
}
function ds(e, t, n = "") {
  const [r, o] = L(() => {
    var u;
    return ((u = Re(n)) == null ? void 0 : u.zoom) ?? Qe();
  }), a = N(r), s = N(n);
  a.current = r;
  const l = N(1);
  j(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const u = ((f = Re(n)) == null ? void 0 : f.zoom) ?? Qe();
    l.current = 1, a.current = u, o(u);
  }, [e, n]);
  const i = _((u) => {
    const f = Mt(u), m = a.current;
    Math.abs(f - m) < 5e-4 || (l.current = f / (m || 1), At(s.current, { zoom: f }), o(f));
  }, []), c = _((u) => {
    i(rt(a.current, u));
  }, [i]), d = _((u) => {
    i(Qe());
  }, [i]);
  return _e(() => {
    const u = l.current;
    Math.abs(u - 1) < 1e-3 || (l.current = 1, ts(t == null ? void 0 : t.current, u));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: c, resetZoom: d };
}
function us(e, t = !0) {
  const [n, r] = L(null), o = _(() => {
    var l, i;
    r(null);
    const s = (l = globalThis.getSelection) == null ? void 0 : l.call(globalThis);
    (i = s == null ? void 0 : s.removeAllRanges) == null || i.call(s);
  }, []), a = e.current ?? null;
  return j(() => {
    if (!t)
      return;
    const s = () => {
      var k, U;
      const p = e.current, g = (k = globalThis.getSelection) == null ? void 0 : k.call(globalThis);
      if (!p || !g || g.isCollapsed || !g.rangeCount) {
        r(null);
        return;
      }
      const v = g.getRangeAt(0);
      if (!p.contains(v.commonAncestorContainer)) {
        r(null);
        return;
      }
      const S = `${g.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (S.length < 2) {
        r(null);
        return;
      }
      let P = v.commonAncestorContainer;
      P.nodeType === Node.TEXT_NODE && (P = P.parentElement);
      const h = (U = P == null ? void 0 : P.closest) == null ? void 0 : U.call(
        P,
        nt()
      );
      if (!h || !p.contains(h)) {
        r(null);
        return;
      }
      const w = Math.max(1, Math.floor(Et(h) || 1)), M = h.getAttribute(Ve) === "translated" ? "translated" : "source", F = v.getClientRects(), x = F[F.length - 1] || v.getBoundingClientRect();
      if (!x || x.width === 0 && x.height === 0) {
        r(null);
        return;
      }
      const C = typeof window < "u" ? window.innerWidth : 800, I = typeof window < "u" ? window.innerHeight : 600, R = 16, T = Math.min(Math.max(R, x.left), C - R), E = Math.min(Math.max(R, x.top), I - R);
      r({
        selectionType: "text",
        quote: S,
        page: w,
        pane: M,
        rect: {
          left: T,
          top: E,
          width: x.width,
          height: x.height
        }
      });
    }, l = () => {
      window.setTimeout(s, 0);
    }, i = () => {
      l();
    }, c = () => l(), d = () => l(), u = () => {
      l();
    }, f = (p) => {
      p.key === "Escape" && o();
    }, m = () => {
      r((p) => p && null);
    };
    document.addEventListener("mouseup", i), document.addEventListener("pointerup", c), document.addEventListener("touchend", d), document.addEventListener("selectionchange", u), document.addEventListener("keyup", f);
    const b = a ?? e.current;
    return b == null || b.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", i), document.removeEventListener("pointerup", c), document.removeEventListener("touchend", d), document.removeEventListener("selectionchange", u), document.removeEventListener("keyup", f), b == null || b.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, a, o]), { selection: n, clearSelection: o };
}
function fs(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, o = N(t), a = N(n), s = N(r);
  return o.current = t, a.current = n, s.current = r, { setModeKeepingPage: _((i) => {
    i !== o.current && (s.current(), a.current(i));
  }, []) };
}
const fn = 48;
function Or(e, t = fn) {
  return e.getBoundingClientRect().top + t;
}
function $r(e, t) {
  if (!e.length)
    return null;
  let n = null, r = -1 / 0;
  for (const i of e) {
    const c = i.getBoundingClientRect();
    c.height < 8 || c.width < 8 || c.top <= t + 1 && c.top >= r && (n = i, r = c.top);
  }
  if (!n && (n = e.find((c) => {
    const d = c.getBoundingClientRect();
    return d.height >= 8 && d.width >= 8;
  }) ?? e[0] ?? null, n)) {
    const c = [...e].reverse().find((d) => {
      const u = d.getBoundingClientRect();
      return u.height >= 8 && u.width >= 8;
    });
    c && c.getBoundingClientRect().bottom < t && (n = c);
  }
  if (!n)
    return null;
  const o = Et(n);
  if (!Number.isFinite(o) || o < 1)
    return null;
  const a = n.getBoundingClientRect(), s = a.height > 0 ? a.height : 1, l = Math.min(1, Math.max(0, (t - a.top) / s));
  return { el: n, page: o, fraction: l };
}
function _t(e, t, n = fn) {
  if (!e)
    return null;
  const r = nt(void 0, t), o = Array.from(e.querySelectorAll(r));
  if (!o.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Or(e, n), l = $r(o, s);
  return l ? { page: l.page, fraction: l.fraction } : null;
}
function mn(e, t, n = "auto", r, o = fn) {
  if (!e || !t)
    return !1;
  const a = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let l = null;
  if (r && (l = e.querySelector(nt(a, r))), l || (l = e.querySelector(nt(a))), !l)
    return !1;
  const i = e.getBoundingClientRect(), c = l.getBoundingClientRect();
  if (i.height <= 0 || c.height < 8 && l.offsetHeight < 8)
    return !1;
  const d = c.height > 0 ? c.height : l.offsetHeight, u = e.scrollTop + (c.top - i.top), f = Math.max(0, u + s * d - o);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function ms(e, t, n = "smooth", r) {
  return mn(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function qt(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", o = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let a = !1, s = !1;
  const l = [], i = () => {
    var d;
    if (a) return;
    mn(
      e(),
      t,
      r,
      n == null ? void 0 : n.pane
    ) && !s && (s = !0, (d = n == null ? void 0 : n.onDone) == null || d.call(n));
  };
  for (const c of o)
    c <= 0 ? requestAnimationFrame(() => {
      requestAnimationFrame(i);
    }) : l.push(setTimeout(i, c));
  return () => {
    a = !0;
    for (const c of l)
      clearTimeout(c);
  };
}
function ps(e, t, n) {
  return qt(
    e,
    { page: t, fraction: 0 },
    n
  );
}
function Pt(e, t) {
  if (!Number.isFinite(e))
    return 1;
  const n = Math.max(1, Math.floor(e));
  return !Number.isFinite(t) || t <= 0 ? n : Math.min(t, n);
}
function pe(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function hs(e, t, n = !0, r = "", o) {
  const [a, s] = L(1);
  return j(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const l = e.current;
    if (!l)
      return;
    let i = !1, c = null, d = 0;
    const u = nt(void 0, o), f = () => {
      if (i) return;
      const p = Array.from(l.querySelectorAll(u));
      if (!p.length)
        return;
      const g = Or(l), v = $r(p, g);
      v && s(v.page);
    }, m = () => {
      i || (d && cancelAnimationFrame(d), d = requestAnimationFrame(() => {
        d = 0, f();
      }));
    }, b = () => {
      if (i) return;
      if (!Array.from(l.querySelectorAll(u)).length) {
        c = setTimeout(b, 120);
        return;
      }
      f(), l.addEventListener("scroll", m, { passive: !0 });
    };
    return b(), () => {
      i = !0, c && clearTimeout(c), d && cancelAnimationFrame(d), l.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, o]), a;
}
const gs = `canvas, .react-pdf__Page, .${kr}, .${wt}`, On = /* @__PURE__ */ new WeakMap();
function bs(e) {
  const t = Number(e.getAttribute(dn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = On.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(gs), On.set(e, n)), n) {
    const o = n.getBoundingClientRect().height;
    if (Number.isFinite(o) && o > 0)
      return o;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function ys(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function vs(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(Ka()).forEach((r) => {
    const o = Et(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = bs(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function Ss(e, t, n = "", r) {
  const [o, a] = L(() => /* @__PURE__ */ new Map()), s = N(o), l = N(r);
  return l.current = r, _e(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), a(s.current));
      return;
    }
    let i = !1, c = 0, d = !1, u = !1;
    const f = () => {
      var w;
      if (i) return;
      const P = e.current;
      if (!P) return;
      const h = vs(P);
      ys(s.current, h) || (s.current = h, a(h)), d && !u && (u = !0, (w = l.current) == null || w.call(l));
    }, m = () => {
      cancelAnimationFrame(c), c = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const b = window.setTimeout(m, 100), p = window.setTimeout(() => {
      d = !0, m();
    }, 300), g = window.setTimeout(m, 700), v = e.current;
    let S = null;
    return v && typeof ResizeObserver < "u" && (S = new ResizeObserver(() => m()), S.observe(v)), () => {
      i = !0, cancelAnimationFrame(c), window.clearTimeout(b), window.clearTimeout(p), window.clearTimeout(g), S == null || S.disconnect();
    };
  }, [e, t, n]), o;
}
const ws = [0, 48, 140, 320, 560], Ps = 700, Rs = [80, 200, 400], Is = 500, Ts = 50, Es = 180, $n = [0, 48, 140, 320, 700, 1200];
function Ms(e, t) {
  var I;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, l = N(
    ((I = Re(a)) == null ? void 0 : I.anchor) || { page: 1, fraction: 0 }
  ), i = N(null), c = N(!1), d = N(r), u = N(null), f = N(null), m = N(null), b = N(null), p = N(a), g = N(""), v = N(n);
  v.current = n;
  const S = _(() => {
    var R;
    (R = u.current) == null || R.call(u), u.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), P = _((R = !1) => {
    b.current != null && (clearTimeout(b.current), b.current = null);
    const T = () => {
      b.current = null, At(p.current, {
        anchor: pe(l.current)
      });
    };
    R ? T() : b.current = setTimeout(T, Es);
  }, []), h = _((R) => {
    l.current = pe(R), i.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, c.current = !1;
    }, Ts);
  }, []);
  j(() => {
    if (!o)
      return;
    let R = !1, T = null, E = null, k = null;
    const U = () => {
      if (R) return;
      const B = e.current;
      if (!B) {
        k = setTimeout(U, 50);
        return;
      }
      T = B, E = () => {
        if (c.current)
          return;
        const Z = _t(T, v.current);
        Z && (l.current = Z, P());
      }, T.addEventListener("scroll", E, { passive: !0 }), c.current || E();
    };
    return U(), () => {
      R = !0, k != null && clearTimeout(k), T && E && T.removeEventListener("scroll", E);
    };
  }, [o, r, n, e, P]), _e(() => {
    var T;
    if (p.current === a) return;
    P(!0), S(), m.current != null && (clearTimeout(m.current), m.current = null), p.current = a, g.current = "";
    const R = (T = Re(a)) == null ? void 0 : T.anchor;
    l.current = R ? pe(R) : { page: 1, fraction: 0 }, i.current = null, c.current = !!a, d.current = r;
  }, [a, r, P, S]), j(() => {
    var T;
    if (!o || !s || !a || g.current === a) return;
    g.current = a;
    const R = pe(
      ((T = Re(a)) == null ? void 0 : T.anchor) || { page: 1, fraction: 0 }
    );
    return l.current = R, i.current = R, c.current = !0, S(), u.current = qt(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: v.current,
        delaysMs: $n,
        onDone: () => h(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, h(R);
    }, Math.max(...$n) + 160), () => S();
  }, [o, s, a, e, h, S]), j(() => {
    if (d.current === r)
      return;
    if (d.current = r, !o) {
      c.current = !1, i.current = null, S();
      return;
    }
    const R = i.current ? pe(i.current) : pe(l.current);
    return c.current = !0, i.current = R, l.current = R, S(), u.current = qt(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: ws,
        onDone: () => h(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, h(R);
    }, Ps), () => {
      S();
    };
  }, [r, o, n, e, h, S]), j(() => () => {
    S(), m.current != null && (clearTimeout(m.current), m.current = null), P(!0);
  }, [S, P]);
  const w = _(() => {
    const R = _t(
      e.current,
      v.current
    );
    return pe(R || l.current);
  }, [e]), A = _(() => {
    c.current = !0;
    const R = _t(
      e.current,
      v.current
    ), T = pe(R ?? l.current);
    return l.current = T, i.current = T, P(), T;
  }, [e, P]), M = _((R, T, E) => {
    const k = E || v.current, U = Pt(R, T || 1), B = { page: U, fraction: 0 };
    l.current = B, c.current = !0, i.current = B, P(), S(), ms(e.current, U, "smooth", k), u.current = ps(
      () => e.current,
      U,
      {
        behavior: "auto",
        pane: k,
        delaysMs: Rs,
        onDone: () => h(B)
      }
    ), f.current = setTimeout(() => {
      f.current = null, h(B);
    }, Is);
  }, [e, h, S, P]), F = _(() => pe(l.current), []), x = _(() => c.current, []), C = _(() => {
    if (!c.current || !i.current)
      return;
    const R = pe(i.current);
    mn(
      e.current,
      R,
      "auto",
      v.current
    );
  }, [e]);
  return {
    lockFromShell: w,
    beginModeSwitch: A,
    goToPage: M,
    getAnchor: F,
    isRestoring: x,
    repinIfRestoring: C
  };
}
function As(e, t) {
  if (!e) return null;
  if (e.blockId && t) {
    const o = t(e.blockId);
    if (o != null && Number.isFinite(o) && o >= 1)
      return Math.floor(o);
  }
  if (e.pageIdx === null || e.pageIdx === void 0) return null;
  const n = Number(e.pageIdx);
  if (!Number.isFinite(n)) return null;
  const r = Math.floor(n) + 1;
  return r >= 1 ? r : null;
}
function jr(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), o = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), a = `j:${r}:d:${o}`;
  return t == null ? `${a}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${a}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const ks = [0, 80, 200, 400, 800], Ns = 120, Cs = 400;
function Ls(e, t, n) {
  const { enabled: r, numPages: o, goToPage: a, resolveBlockPage: s, onAnchorApplied: l, jobId: i, documentId: c } = e, d = N(a);
  d.current = a;
  const u = N(s);
  u.current = s;
  const f = N(l);
  f.current = l;
  const m = N(n);
  m.current = n, j(() => {
    var P, h;
    if (!r || !Number.isFinite(o) || o < 1)
      return;
    const b = da(), p = As(b, u.current), g = jr(b, p, { jobId: i, documentId: c });
    if (t.current === g)
      return;
    if (p == null) {
      t.current = g, (P = m.current) == null || P.call(m);
      return;
    }
    t.current = g, b && ((h = f.current) == null || h.call(f, b, p));
    const v = [];
    let S = 0;
    for (const w of ks)
      S = Math.max(S, w), v.push(
        setTimeout(() => {
          d.current(p);
        }, w)
      );
    return v.push(
      setTimeout(() => {
        var w;
        (w = m.current) == null || w.call(m);
      }, S + Ns)
    ), () => {
      for (const w of v) clearTimeout(w);
    };
  }, [r, o, i, c, t]);
}
function xs(e) {
  var a;
  const t = globalThis.window;
  if (!t || typeof ((a = t.history) == null ? void 0 : a.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, o = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", o);
}
function _s(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: o,
    resolveBlockPage: a,
    syncDebounceMs: s = Cs,
    jobId: l,
    documentId: i,
    applyReaderSearch: c
  } = e, d = N(a);
  d.current = a;
  const u = N(c);
  u.current = c;
  const f = N(0);
  j(() => {
    if (!n || !r || !t.current || !Number.isFinite(o) || o < 1 || f.current === o) return;
    const m = setTimeout(() => {
      var v;
      const b = ((v = globalThis.location) == null ? void 0 : v.search) || "", p = Mo(b, o, d.current);
      if (f.current = o, p === null) return;
      const g = `${new URLSearchParams(p).get("block_id") || ""}`.trim();
      t.current = jr(
        { blockId: g },
        o,
        { jobId: l, documentId: i }
      ), (u.current || xs)(p);
    }, s);
    return () => clearTimeout(m);
  }, [
    n,
    r,
    o,
    s,
    l,
    i,
    t
  ]);
}
function zs(e) {
  const t = N(""), [n, r] = L(!1), o = _(() => r(!0), []), a = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  Ls(a, t, o), _s(e, t, n);
}
const Ge = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function Ds(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function jn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function Ur(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = jn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const o = jn(n, e);
  return o < 0 ? "ignore" : o === 0 ? n.page_hash === e.pageHash ? "ignore" : "retry" : "accept";
}
function Fs(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), o = Ur(r, t, n);
  if (o === "retry") return e;
  if (o === "ignore")
    return { ...e, lastSeq: t.seq, connection: "live", error: "" };
  const a = new Map(n.items.map((i) => [i.item_id, i])), s = new Map((r == null ? void 0 : r.changedAtSeqById) || []);
  for (const i of t.changed_item_ids)
    a.has(i) && s.set(i, t.seq);
  const l = new Map(e.pagesByPage);
  return l.set(t.page_idx, {
    attempt: n.attempt,
    generation: n.generation,
    pageHash: n.page_hash,
    itemsById: a,
    changedAtSeqById: s,
    lastEventSeq: t.seq
  }), {
    ...e,
    pagesByPage: l,
    lastSeq: t.seq,
    connection: "live",
    error: ""
  };
}
const Un = [250, 500, 1e3, 2e3, 4e3], zt = [80, 160, 320, 640, 1e3, 1500], Bn = [250, 500, 1e3, 2e3, 4e3, 5e3], Os = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Kt(e, t) {
  return new Promise((n, r) => {
    if (t.aborted) {
      r(new DOMException("Aborted", "AbortError"));
      return;
    }
    const o = () => {
      clearTimeout(a), r(new DOMException("Aborted", "AbortError"));
    }, a = setTimeout(() => {
      t.removeEventListener("abort", o), n();
    }, e);
    t.addEventListener("abort", o, { once: !0 });
  });
}
function pn(e) {
  return xo(e) ? `${e.code || ""}`.trim() : "";
}
function mt(e, t) {
  const n = pn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function $s(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if (Ur(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = _o(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (i) {
      if ((i == null ? void 0 : i.name) === "AbortError") throw i;
      a = i;
      const c = pn(i);
      if (c && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(c)) throw i;
    }
    const l = zt[Math.min(s, zt.length - 1)];
    if (await Kt(l, r), s >= zt.length + 2) throw a;
  }
}
function js({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = L(Ge), s = N(o), l = N("");
  s.current = o;
  const i = `${e || ""}`.trim(), c = `${t || ""}`.trim().toLowerCase(), d = Os.has(c) ? c : "";
  return j(() => {
    if (!n || !i) {
      l.current = "", s.current = Ge, a(Ge);
      return;
    }
    const u = r === void 0 ? la() : r, f = l.current === i;
    if (l.current = i, !u) {
      const P = {
        ...f ? s.current : Ge,
        connection: d ? "terminal" : "unavailable",
        jobStatus: c,
        error: "实时译文暂不可用"
      };
      s.current = P, a(P);
      return;
    }
    const m = new AbortController();
    let b = !1;
    const p = {
      ...f ? s.current : Ge,
      connection: d ? "terminal" : "connecting",
      jobStatus: c,
      error: ""
    };
    s.current = p, a(p);
    const g = (P) => {
      m.signal.aborted || a((h) => {
        const w = P(h);
        return s.current = w, w;
      });
    }, v = async () => {
      let P = 0;
      for (; !m.signal.aborted; )
        try {
          const h = await u.fetchLayout(i, { signal: m.signal });
          b = !0, g((w) => ({
            ...w,
            layoutByPage: Ds(h),
            jobStatus: c,
            error: ""
          }));
          return;
        } catch (h) {
          if ((h == null ? void 0 : h.name) === "AbortError") return;
          const w = pn(h);
          if (!(w === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !w)) {
            g((M) => ({
              ...M,
              connection: d ? "terminal" : "unavailable",
              jobStatus: c,
              error: mt(h, "实时译文暂不可用")
            }));
            return;
          }
          if (d) {
            g((M) => ({
              ...M,
              connection: "terminal",
              jobStatus: c,
              error: ""
            }));
            return;
          }
          g((M) => ({
            ...M,
            connection: "connecting",
            jobStatus: c,
            error: mt(h, "正在等待 OCR 版面数据")
          })), await Kt(Un[Math.min(P, Un.length - 1)], m.signal).catch(() => {
          }), P += 1;
        }
    };
    return (async () => {
      if (await v(), !b || m.signal.aborted) return;
      let P = 0;
      for (; !m.signal.aborted; ) {
        d || g((h) => ({
          ...h,
          connection: h.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: c,
          // 保留已有错误：首页还没提交（lastSeq 为 0）时恰恰是最容易出错的阶段，
          // 此前这里把它清成空串，UI 于是一直显示「连接中」，用户看到的是
          // "正在努力"，实际可能已经在反复失败。
          error: h.error
        }));
        try {
          await u.streamEvents(i, {
            afterSeq: s.current.lastSeq,
            signal: m.signal,
            onEvent: async (h) => {
              if (h.seq <= s.current.lastSeq) return;
              let w;
              try {
                w = await $s(
                  i,
                  h,
                  s.current,
                  m.signal,
                  u
                );
              } catch (A) {
                if ((A == null ? void 0 : A.name) === "AbortError" || m.signal.aborted) throw A;
                g((M) => ({
                  ...M,
                  lastSeq: Math.max(M.lastSeq, h.seq),
                  error: mt(A, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              g((A) => {
                const M = Fs(A, h, w);
                return d ? {
                  ...M,
                  connection: "terminal",
                  jobStatus: c
                } : {
                  ...M,
                  jobStatus: c
                };
              }), P = 0;
            }
          });
        } catch (h) {
          if ((h == null ? void 0 : h.name) === "AbortError" || m.signal.aborted) return;
          g((w) => ({
            ...w,
            connection: d ? "terminal" : "reconnecting",
            jobStatus: c,
            error: mt(h, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (d) {
          g((h) => ({
            ...h,
            connection: "terminal",
            jobStatus: c
          }));
          return;
        }
        await Kt(Bn[Math.min(P, Bn.length - 1)], m.signal).catch(() => {
        }), P += 1;
      }
    })(), () => m.abort();
  }, [n, r, i, d]), o;
}
const Us = 2e3;
function Bs(e) {
  if (typeof e == "number") {
    const r = Number(e);
    return !Number.isFinite(r) || r < 0 ? null : Math.floor(r) + 1;
  }
  if (!e || typeof e != "object") return null;
  const t = e.page_idx;
  if (t != null && `${t}`.trim() !== "") {
    const r = Number(t);
    return !Number.isFinite(r) || r < 0 ? null : Math.floor(r) + 1;
  }
  const n = e.page;
  if (n != null && `${n}`.trim() !== "") {
    const r = Number(n);
    return !Number.isFinite(r) || r < 1 ? null : Math.floor(r);
  }
  return null;
}
const Hs = /* @__PURE__ */ new Set(["book", "translate"]);
function Br(e) {
  return !!(e.jobId && e.sourceUrl && Hs.has(e.workflow));
}
function Js(e) {
  return !!(Br(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function Ws() {
  const e = Oa(), t = Br({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = Js({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = js({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), { shellRef: o, shellEl: a, shellWidth: s, bindShell: l } = Ba(), i = as({
    documentId: e.documentId,
    jobId: e.jobId
  }), c = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: d, onZoomChange: u } = ds(e.mode, o, i), f = Ja(
    {
      mode: e.mode,
      sourceOnly: e.sourceOnly,
      assetsReady: e.assetsReady,
      sourceUrl: e.sourceUrl,
      translatedUrl: e.translatedUrl,
      sourceFile: e.sourceFile,
      translatedFile: e.translatedFile
    },
    { userZoom: d, shellWidth: s, identityKey: c }
  ), {
    beginModeSwitch: m,
    goToPage: b,
    repinIfRestoring: p
  } = Ms(o, {
    primaryPane: f.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: f.primaryNumPages > 0
  });
  j(() => {
    p();
  }, [s, p]);
  const g = Ss(
    o,
    f.compareMode,
    f.rowSyncRevision,
    p
  ), v = hs(
    o,
    f.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${d}-${f.metricsTick}`,
    f.primaryPane
  ), S = _((O, Y) => {
    var ne, $;
    const ce = Math.max(
      Number(f.hudNumPages) || 0,
      Number(f.primaryNumPages) || 0,
      Number((ne = f.numPagesByPane) == null ? void 0 : ne.source) || 0,
      Number(($ = f.numPagesByPane) == null ? void 0 : $.translated) || 0
    );
    b(O, ce, Y);
  }, [b, f.hudNumPages, f.primaryNumPages, f.numPagesByPane]), [P, h] = L(null), w = N(null), A = _((O) => {
    w.current && clearTimeout(w.current), h(O), O && (w.current = setTimeout(() => h(null), Us));
  }, []);
  j(() => () => {
    w.current && clearTimeout(w.current);
  }, []);
  const M = _((O) => {
    const Y = Ct(e.regions, O);
    return Y ? jt(Y, f.primaryPane).page : null;
  }, [e.regions, f.primaryPane]), F = _((O, Y) => {
    const ce = Y || f.primaryPane, ne = typeof O == "object" && O ? `${O.block_id || ""}`.trim() : "", $ = typeof O == "object" && O ? `${O.image_url || ""}`.trim() : "", W = typeof O == "object" && O ? O.page_idx != null ? Number(O.page_idx) + 1 : O.page != null ? Number(O.page) : null : typeof O == "number" ? O + 1 : null, ue = No(e.regions, $, W) || Ct(e.regions, ne) || (typeof O == "object" ? Co(e.regions, O) : null);
    let fe = ue ? jt(ue, ce).page : null;
    fe == null && (fe = Bs(O)), !(fe == null || fe < 1) && (A(ue), S(fe, ce));
  }, [A, S, f.primaryPane, e.regions]);
  zs({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: f.hudNumPages || 0,
    currentPage: v,
    goToPage: S,
    resolveBlockPage: M,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (O) => {
      A(Ct(e.regions, O.blockId));
    }
  });
  const { setModeKeepingPage: x } = fs({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: m
  }), [C, I] = L(null), {
    selection: R,
    clearSelection: T
  } = us(o, !e.boot.loading && !e.boot.failed), E = _(() => {
    I(null), T();
  }, [T]), k = _((O) => {
    T(), I(O);
  }, [T]);
  j(() => {
    R && I(null);
  }, [R]), j(() => {
    const O = o.current;
    if (!O) return;
    const Y = () => I(null);
    return O.addEventListener("scroll", Y, { passive: !0 }), () => O.removeEventListener("scroll", Y);
  }, [a, o]);
  const U = R || C;
  j(() => {
    A(null), E();
  }, [c, A, E]);
  const B = !e.boot.loading && !e.boot.failed, Z = V(() => ({ bindShell: l, shellEl: a, shellWidth: s, shellRef: o }), [l, a, s, o]), te = V(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), re = V(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: d,
    onZoomChange: u,
    shell: Z,
    panes: f,
    sessionFiles: te,
    rowHeights: g,
    goToPage: S,
    activeRegion: P,
    jumpToAnchor: F,
    setModeKeepingPage: x,
    download: e.download,
    showHud: B,
    selection: U,
    clearSelection: E,
    selectRegion: k,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, Z, f, te, g, S, P, F, x, B, U, E, k, d, u, i, r, n]);
  return V(() => ({
    ...re,
    currentPage: v
  }), [re, v]);
}
const Vs = [
  { action: "mode-source", keys: ["1"], mode: "source" },
  { action: "mode-compare", keys: ["2"], mode: "compare" },
  { action: "mode-translated", keys: ["3"], mode: "translated" },
  { action: "zoom-in", keys: ["+", "="] },
  { action: "zoom-out", keys: ["-", "_"] },
  { action: "zoom-reset", keys: ["0"] },
  { action: "next-page", keys: ["j", "ArrowDown", "PageDown"], requiresPages: !0 },
  { action: "prev-page", keys: ["k", "ArrowUp", "PageUp"], requiresPages: !0 },
  { action: "first-page", keys: ["Home"], requiresPages: !0 },
  { action: "last-page", keys: ["End"], requiresPages: !0 }
], qs = [
  {
    title: "翻页",
    items: [
      { actions: ["next-page"], keys: "J · ↓ · PgDn", desc: "下一页" },
      { actions: ["prev-page"], keys: "K · ↑ · PgUp", desc: "上一页" },
      { actions: ["first-page", "last-page"], keys: "Home / End", desc: "首页 / 末页" },
      { actions: [], keys: "点底栏页码", desc: "输入页码跳转" }
    ]
  },
  {
    title: "缩放",
    items: [
      { actions: ["zoom-in", "zoom-out"], keys: "+ / −", desc: "放大 / 缩小" },
      { actions: ["zoom-reset"], keys: "0", desc: "重置为模式默认" },
      { actions: [], keys: "点百分比", desc: "重置为模式默认" }
    ]
  },
  {
    title: "模式",
    items: [
      { actions: ["mode-source"], keys: "1", desc: "源文件" },
      { actions: ["mode-compare"], keys: "2", desc: "对照" },
      { actions: ["mode-translated"], keys: "3", desc: "翻译文件" }
    ]
  }
];
function Ks(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Vs)
    if (n.keys.some(
      (o) => o.length === 1 ? o === t : o === e
    )) return n;
  return null;
}
function Gs(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Zs(e) {
  const {
    mode: t,
    sourceOnly: n,
    setMode: r,
    userZoom: o,
    onZoomChange: a,
    currentPage: s,
    numPages: l,
    goToPage: i,
    enabled: c = !0
  } = e;
  j(() => {
    if (!c)
      return;
    const d = (u) => {
      if (u.defaultPrevented || u.metaKey || u.ctrlKey || u.altKey || Gs(u.target))
        return;
      const f = u.key, m = Ks(f);
      if (m) {
        if (m.mode) {
          if (n && m.mode !== "source")
            return;
          u.preventDefault(), r(m.mode);
          return;
        }
        if (!(m.requiresPages && l <= 0))
          switch (u.preventDefault(), m.action) {
            case "zoom-in":
              a(rt(o, 1));
              return;
            case "zoom-out":
              a(rt(o, -1));
              return;
            case "zoom-reset":
              a(Qe());
              return;
            case "next-page":
              i(Pt(s + 1, l));
              return;
            case "prev-page":
              i(Pt(s - 1, l));
              return;
            case "first-page":
              i(1);
              return;
            case "last-page":
              i(l);
              return;
          }
      }
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [
    c,
    t,
    n,
    r,
    o,
    a,
    s,
    l,
    i
  ]);
}
const Ys = "retainpdf:soft-reader-close";
function Xs() {
  return new URL("./index.html", window.location.href).href;
}
function Qs() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: Ys },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function ei(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), o = new URL(e, r);
    return o.origin === r.origin && !/reader\.html$/i.test(o.pathname) && !/detail\.html$/i.test(o.pathname);
  } catch {
    return !1;
  }
}
function ti() {
  if (!(typeof window > "u") && !Qs()) {
    if (ei(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(Xs());
  }
}
function ni({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ D(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), ti();
      },
      children: [
        /* @__PURE__ */ y(sn, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ y("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let Hn = !1;
function ri() {
  if (Hn)
    return;
  const e = tt().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (Qo.GlobalWorkerOptions.workerSrc = e, Hn = !0);
}
const oi = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function ai({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: o
}) {
  const a = r.flatMap((s) => {
    if (!yr(s.region)) return [];
    const l = Tt(s, t, n);
    return l ? [{ highlight: s, rect: l }] : [];
  });
  return a.length ? /* @__PURE__ */ y("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: a.map(({ highlight: s, rect: l }) => {
    const i = s.region, c = vr(i), d = oi[c];
    return /* @__PURE__ */ D(
      "button",
      {
        type: "button",
        className: `reader-structure-selection-target is-${c}`,
        "data-reader-region-id": i.itemId,
        "data-reader-region-kind": c,
        style: l,
        "aria-label": `${d}区域，点击选择`,
        title: `${d} · 点击选择`,
        onClick: (u) => {
          u.stopPropagation();
          const f = u.currentTarget.getBoundingClientRect();
          o == null || o({
            selectionType: "region",
            region: i,
            kind: c,
            page: s.box.page,
            pane: e,
            rect: {
              left: f.left,
              top: f.top,
              width: f.width,
              height: f.height
            }
          });
        },
        children: [
          /* @__PURE__ */ y("span", { className: "reader-structure-selection-label", "aria-hidden": "true", children: d }),
          /* @__PURE__ */ y("span", { className: "sr-only", children: Sr(i, e) })
        ]
      },
      i.itemId
    );
  }) }) : null;
}
function si(e, t, n) {
  return e.flatMap((r) => {
    if (vr(r.region) !== "text") return [];
    const o = Tt(r, t, n);
    return o ? [{ itemId: r.itemId, highlight: r, rect: o }] : [];
  });
}
function Jn(e, t, n) {
  let r = null, o = Number.POSITIVE_INFINITY;
  for (const a of e) {
    const { rect: s } = a;
    if (t < s.left || t > s.left + s.width || n < s.top || n > s.top + s.height)
      continue;
    const l = s.width * s.height;
    l < o && (r = a, o = l);
  }
  return r;
}
function ii({ target: e }) {
  return e ? /* @__PURE__ */ y("div", { className: "reader-text-hover-layer", "aria-hidden": "true", children: /* @__PURE__ */ y(
    "div",
    {
      className: "reader-text-hover-frame",
      "data-reader-text-hover-id": e.itemId,
      style: e.rect,
      children: /* @__PURE__ */ y("span", { className: "reader-text-hover-label", children: "文字" })
    }
  ) }) : null;
}
function ci(e, t) {
  const n = e.page_idx + 1, r = {
    page: n,
    bbox: t.bbox,
    unit: "pdf_point",
    origin: "top_left",
    text: t.source_text
  }, o = {
    itemId: t.item_id,
    source: r,
    translated: r,
    markdown: t.source_text,
    regionType: t.kind,
    status: "live_translation",
    assetIds: [],
    assetUrls: []
  };
  return {
    itemId: t.item_id,
    region: o,
    box: r,
    pageSize: { page: n, width: e.width, height: e.height }
  };
}
function li(e, t, n, r) {
  if (!e || !t) return [];
  const o = [];
  for (const a of e.blocks) {
    const s = t.itemsById.get(a.item_id);
    if (!(s != null && s.translated_text)) continue;
    const l = Tt(
      ci(e, a),
      n,
      r
    );
    l && o.push({
      itemId: a.item_id,
      translatedText: s.translated_text,
      status: s.status,
      kind: a.kind,
      sourceText: a.source_text,
      typography: a.typography,
      rect: l,
      changedAtSeq: t.changedAtSeqById.get(a.item_id) || 0,
      changedNow: t.changedAtSeqById.get(a.item_id) === t.lastEventSeq
    });
  }
  return o;
}
const di = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', ui = 256, Ze = /* @__PURE__ */ new Map();
function fi(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function mi(e) {
  const t = `${e || ""}`, { text: n, slots: r } = na(t, { bareLatex: !0 }), o = fi(n), a = ra(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Ze.get(t);
  if (!s && (s = oa(o, r), Ze.set(t, s), Ze.size > ui)) {
    const l = Ze.keys().next().value;
    l !== void 0 && Ze.delete(l);
  }
  return { fallbackHtml: a, richHtml: s, hasMath: !0 };
}
function Dt(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function Pe(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function pi(e, t) {
  const n = e.typography, r = Pe(t) || 1, o = Pe(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), l = Dt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, l * r)), c = Pe(n == null ? void 0 : n.fit_min_font_size_pt), d = Pe(n == null ? void 0 : n.fit_max_font_size_pt), u = Math.max(3.5, (c || 5.5) * r), f = Math.max(
    u,
    d ? d * r : o ? o * r : i
  ), m = o ? o * r : i, b = Pe(n == null ? void 0 : n.leading_em), p = [
    Pe(n == null ? void 0 : n.padding_top_pt) || 0,
    Pe(n == null ? void 0 : n.padding_right_pt) || 0,
    Pe(n == null ? void 0 : n.padding_bottom_pt) || 0,
    Pe(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((g) => g * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || di,
    fontSizePx: Math.max(u, Math.min(f, m)),
    minFontSizePx: u,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: b ? 1 + b : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (Dt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : Dt(e.kind) ? "center" : "justify",
    padding: p,
    exact: !!o
  };
}
function hi(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), l = (u) => {
    const f = s.get(u);
    if (f !== void 0) return f;
    const { width: m, height: b } = e(u), p = m <= t + 0.5 && b <= n + 0.5;
    return s.set(u, p), p;
  };
  let i = o, c = a, d = Math.min(r.requestedFontSizePx, c);
  if (l(d)) {
    if (!r.exact) {
      i = d;
      for (let u = 0; u < 6 && c > i; u += 1) {
        const f = (i + c) / 2;
        l(f) ? (d = f, i = f) : c = f;
      }
    }
  } else {
    c = d, d = i;
    for (let u = 0; u < 8 && c > i; u += 1) {
      const f = (i + c) / 2;
      l(f) ? (d = f, i = f) : c = f;
    }
  }
  return Math.max(o, d);
}
const gi = 512, Ye = /* @__PURE__ */ new Map();
let Gt = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Gt += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Gt += 1;
}));
function bi(e, t, n, r) {
  return [
    Gt,
    r.fontFamily,
    r.fontWeight,
    r.lineHeight,
    r.textAlign,
    r.minFontSizePx,
    r.maxFontSizePx,
    r.fontSizePx,
    r.exact ? 1 : 0,
    t,
    n,
    e
  ].join("");
}
function yi({ item: e, pageScale: t }) {
  const n = N(null), r = V(
    () => mi(e.translatedText),
    [e.translatedText]
  ), [o, a] = L(r.fallbackHtml), s = V(
    () => pi(e, t),
    [e, t]
  );
  j(() => {
    let u = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      u && a(f);
    }), () => {
      u = !1;
    };
  }, [r]), _e(() => {
    const u = n.current;
    if (!u) return;
    const [f, m, b, p] = s.padding, g = Math.max(1, e.rect.width - p - m), v = Math.max(1, e.rect.height - f - b), S = bi(o, g, v, s);
    let P = Ye.get(S);
    if (P === void 0 && (P = hi(
      (h) => (u.style.fontSize = `${h}px`, { width: u.scrollWidth, height: u.scrollHeight }),
      g,
      v,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Ye.set(S, P), Ye.size > gi)) {
      const h = Ye.keys().next().value;
      h !== void 0 && Ye.delete(h);
    }
    u.style.fontSize = `${P.toFixed(2)}px`;
  }, [o, e.rect.height, e.rect.width, s]);
  const [l, i, c, d] = s.padding;
  return /* @__PURE__ */ y(
    "div",
    {
      className: `reader-live-translation-item${e.changedNow ? " is-changed" : ""}`,
      "data-live-translation-item": e.itemId,
      "data-live-translation-kind": e.kind,
      "data-live-translation-status": e.status,
      "data-live-translation-typography": s.exact ? "typst" : "fitted",
      style: {
        ...e.rect,
        padding: `${l}px ${i}px ${c}px ${d}px`
      },
      children: /* @__PURE__ */ y(
        "div",
        {
          ref: n,
          className: "reader-live-translation-content",
          style: {
            fontFamily: s.fontFamily,
            fontSize: s.fontSizePx,
            fontWeight: s.fontWeight,
            lineHeight: s.lineHeight,
            textAlign: s.textAlign
          },
          dangerouslySetInnerHTML: { __html: o }
        }
      )
    }
  );
}
function vi({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = V(
    () => li(e, t, n, r),
    [r, e, t, n]
  );
  return o.length ? /* @__PURE__ */ y(
    "div",
    {
      className: "reader-live-translation-overlay",
      "data-live-translation-page": e == null ? void 0 : e.page_idx,
      "data-live-translation-generation": t == null ? void 0 : t.generation,
      "aria-hidden": "true",
      children: o.map((a) => /* @__PURE__ */ y(
        yi,
        {
          item: a,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${a.itemId}:${a.changedAtSeq}`
      ))
    }
  ) : null;
}
const Si = tn(vi), Hr = 1.414;
function wi({
  pageNumber: e,
  width: t,
  devicePixelRatio: n,
  pane: r,
  active: o = !1,
  syncedMinHeight: a = 0,
  onMetrics: s,
  cachedAspect: l,
  onAspectChange: i,
  sentinelRef: c,
  regionHighlight: d = null,
  regionTargets: u = [],
  onSelectRegion: f,
  liveTranslationLayout: m,
  liveTranslationPage: b,
  showLiveTranslation: p = r === "source"
}) {
  const g = N(l ?? Hr), [v, S] = L(g.current);
  j(() => {
    l != null && Math.abs(l - g.current) >= 1e-3 && (g.current = l, S(l));
  }, [l]);
  const P = N(c);
  P.current = c;
  const h = N((k) => {
    var U;
    (U = P.current) == null || U.call(P, k);
  }).current, w = Math.max(120, Math.floor(t * v)), A = Math.max(w, Math.ceil(a || 0)), M = Tt(d, t, w), F = V(
    () => si(u, t, w),
    [w, u, t]
  ), [x, C] = L(null), I = V(
    () => F.find((k) => k.itemId === x) || null,
    [x, F]
  ), R = (k) => {
    if (k.buttons !== 0) {
      C(null);
      return;
    }
    const U = k.currentTarget.getBoundingClientRect(), B = Jn(
      F,
      k.clientX - U.left,
      k.clientY - U.top
    ), Z = (B == null ? void 0 : B.itemId) || null;
    C((te) => te === Z ? te : Z);
  }, T = (k) => {
    var Z, te, re;
    if (!f || (te = (Z = k.target) == null ? void 0 : Z.closest) != null && te.call(Z, ".reader-structure-selection-target") || `${((re = window.getSelection()) == null ? void 0 : re.toString()) || ""}`.trim()) return;
    const U = k.currentTarget.getBoundingClientRect(), B = Jn(
      F,
      k.clientX - U.left,
      k.clientY - U.top
    );
    B && f({
      selectionType: "region",
      region: B.highlight.region,
      kind: "text",
      page: B.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: U.left + B.rect.left,
        top: U.top + B.rect.top,
        width: B.rect.width,
        height: B.rect.height
      }
    });
  }, E = (k) => {
    !Number.isFinite(k) || k <= 0 || Math.abs(g.current - k) < 1e-3 || (g.current = k, S(k), i == null || i(e, k));
  };
  return /* @__PURE__ */ D(
    "div",
    {
      ref: h,
      [We]: e,
      [Ve]: r,
      [dn]: w,
      className: un,
      onPointerMoveCapture: R,
      onClick: T,
      onPointerLeave: () => C(null),
      style: {
        width: t,
        height: A,
        minHeight: A
      },
      children: [
        o ? /* @__PURE__ */ y(
          ea,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: kr,
            loading: /* @__PURE__ */ y(
              "div",
              {
                className: wt,
                style: { width: t, height: w }
              }
            ),
            onLoadSuccess: (k) => {
              try {
                const U = k.getViewport({ scale: 1 });
                if (U.width > 0) {
                  const B = U.height / U.width;
                  E(B);
                }
              } catch {
              }
              s == null || s();
            },
            onRenderSuccess: () => {
              s == null || s();
            }
          }
        ) : /* @__PURE__ */ y(
          "div",
          {
            className: wt,
            style: { width: t, height: w },
            "aria-hidden": !0
          }
        ),
        M ? /* @__PURE__ */ y(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": d == null ? void 0 : d.itemId,
            style: M,
            "aria-hidden": "true"
          }
        ) : null,
        o && p ? /* @__PURE__ */ y(
          Si,
          {
            layoutPage: m,
            pageState: b,
            width: t,
            height: w
          }
        ) : null,
        /* @__PURE__ */ y(ii, { target: o ? I : null }),
        /* @__PURE__ */ y(
          ai,
          {
            pane: r === "translated" ? "translated" : "source",
            width: t,
            height: w,
            regions: u,
            onSelect: f
          }
        )
      ]
    }
  );
}
const Pi = tn(wi), Ft = 5, Ri = "120% 0px", Ii = 120;
let Wn = 1;
const Vn = /* @__PURE__ */ new WeakMap();
function Ti(e) {
  if (!e) return 0;
  const t = Vn.get(e);
  if (t) return t;
  const n = Wn;
  return Wn += 1, Vn.set(e, n), n;
}
function Ei() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const Mi = bo(
  function({
    pane: t,
    url: n = "",
    preloadedFile: r = null,
    userZoom: o = 1,
    visible: a = !0,
    emptyLabel: s = "暂无 PDF",
    scrollRoot: l = null,
    pageWidthOverride: i = null,
    rowHeights: c,
    onMetrics: d,
    onLoadSuccess: u,
    onLoadError: f,
    onNumPagesChange: m,
    activeRegion: b = null,
    regions: p = [],
    readerMetadata: g = null,
    onSelectRegion: v,
    liveTranslation: S,
    showLiveTranslation: P = t === "source",
    liveTranslationPendingLabel: h = "",
    paneAction: w
  }, A) {
    ri();
    const { file: M, loading: F, error: x } = _a(n, r), C = `${n}\0${Ti(M)}`, I = N(C);
    I.current = C;
    const R = V(
      () => Ca(M),
      [M, n]
    ), [T, E] = L(0), [k, U] = L(""), [B, Z] = L(null), [te, re] = L(480), O = N(null), Y = N(0), ce = V(() => Ei(), []), ne = V(() => ({
      cMapUrl: tt().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: tt().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    nn(A, () => B, [B]), j(() => {
      const z = (H) => {
        !Number.isFinite(H) || H < 80 || Math.abs(H - Y.current) < 8 || (Y.current = H, re(H));
      }, K = i && i >= 80 ? i : (l == null ? void 0 : l.clientWidth) || 0;
      if (z(K), !l || typeof ResizeObserver > "u" || i && i >= 80) return;
      const J = new ResizeObserver((H) => {
        var Q, ee;
        const se = ((ee = (Q = H[0]) == null ? void 0 : Q.contentRect) == null ? void 0 : ee.width) ?? l.clientWidth;
        !Number.isFinite(se) || se < 80 || (O.current && clearTimeout(O.current), O.current = setTimeout(() => z(se), 80));
      });
      return J.observe(l), () => {
        J.disconnect(), O.current && clearTimeout(O.current);
      };
    }, [i, l, a]);
    const $ = V(
      () => es(te, o),
      [te, o]
    ), [W, ue] = L(() => /* @__PURE__ */ new Map()), [fe, Fe] = L(() => /* @__PURE__ */ new Set()), [kt, Oe] = L(() => /* @__PURE__ */ new Set()), X = N(/* @__PURE__ */ new Map()), q = N(null), oe = N(/* @__PURE__ */ new Map()), ve = _((z, K) => {
      ue((J) => {
        if (J.get(z) === K) return J;
        const H = new Map(J);
        return H.set(z, K), H;
      });
    }, []), me = _((z, K) => {
      const J = X.current, H = J.get(z);
      if (H && q.current)
        try {
          q.current.unobserve(H);
        } catch {
        }
      if (K) {
        if (J.set(z, K), q.current)
          try {
            q.current.observe(K);
          } catch {
          }
      } else
        J.delete(z);
    }, []), ke = N(/* @__PURE__ */ new Map()), lt = _((z) => {
      const K = ke.current;
      let J = K.get(z);
      return J || (J = (H) => me(z, H), K.set(z, J)), J;
    }, [me]);
    j(() => {
      if (typeof IntersectionObserver > "u") return;
      const z = oe.current, K = new IntersectionObserver(
        (J) => {
          const H = [], se = [];
          for (const Q of J) {
            const ee = Q.target, de = Et(ee);
            Number.isFinite(de) && (Q.isIntersecting ? H : se).push(de);
          }
          if ((H.length || se.length) && Fe((Q) => {
            let ee = null;
            for (const de of H)
              Q.has(de) || (ee = ee || new Set(Q), ee.add(de));
            for (const de of se)
              Q.has(de) && (ee = ee || new Set(Q), ee.delete(de));
            return ee || Q;
          }), H.length) {
            for (const Q of H) {
              const ee = z.get(Q);
              ee && (clearTimeout(ee), z.delete(Q));
            }
            Oe((Q) => {
              let ee = null;
              for (const de of H)
                Q.has(de) || (ee = ee || new Set(Q), ee.add(de));
              return ee || Q;
            });
          }
          for (const Q of se)
            z.has(Q) || z.set(Q, setTimeout(() => {
              z.delete(Q), Oe((ee) => {
                if (!ee.has(Q)) return ee;
                const de = new Set(ee);
                return de.delete(Q), de;
              });
            }, Ii));
        },
        { root: l, rootMargin: Ri, threshold: 0 }
      );
      q.current = K;
      for (const J of X.current.values())
        try {
          K.observe(J);
        } catch {
        }
      return () => {
        K.disconnect(), q.current === K && (q.current = null);
        for (const J of z.values()) clearTimeout(J);
        z.clear();
      };
    }, [l]), _e(() => {
      E(0), U(""), Fe(/* @__PURE__ */ new Set()), Oe(/* @__PURE__ */ new Set()), ue(/* @__PURE__ */ new Map()), X.current.clear();
      const z = oe.current;
      for (const K of z.values()) clearTimeout(K);
      z.clear(), m == null || m(0, t);
    }, [C, m, t]);
    const Nt = _(
      ({ numPages: z }) => {
        I.current === C && (E(z), U(""), m == null || m(z, t), u == null || u({ numPages: z, pane: t }));
      },
      [C, u, m, t]
    ), dt = _(
      (z) => {
        if (I.current !== C) return;
        const K = (z == null ? void 0 : z.message) || "PDF 解析失败";
        U(K), E(0), m == null || m(0, t), f == null || f(z, t);
      },
      [C, f, m, t]
    ), Se = V(
      () => T > 0 ? Array.from({ length: T }, (z, K) => K + 1) : [],
      [T]
    );
    j(() => {
      typeof IntersectionObserver < "u" || Oe(new Set(Se));
    }, [Se]);
    const Te = V(
      () => Ln(b, g, t),
      [b, g, t]
    ), $e = V(() => {
      const z = /* @__PURE__ */ new Map();
      for (const K of p) {
        const J = Ln(K, g, t);
        if (!J) continue;
        const H = z.get(J.box.page) || [];
        H.push(J), z.set(J.box.page, H);
      }
      return z;
    }, [t, g, p]), ut = V(() => {
      if (T === 0) return /* @__PURE__ */ new Set();
      if (!(!!l && typeof IntersectionObserver < "u" && a)) return new Set(Se);
      if (fe.size === 0) {
        const J = Math.min(T, Ft * 2 + 1);
        return new Set(Array.from({ length: J }, (H, se) => se + 1));
      }
      const K = /* @__PURE__ */ new Set();
      for (const J of fe)
        for (let H = -Ft; H <= Ft; H++) {
          const se = J + H;
          se >= 1 && se <= T && K.add(se);
        }
      return K;
    }, [T, Se, l, a, fe]), ho = !n || !!x || !!k, go = n && (x || k) || s;
    return /* @__PURE__ */ D(
      "section",
      {
        ref: Z,
        className: `reader-panel ${qa}${a ? "" : " is-hidden"}`,
        [Ve]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": a ? "true" : "false",
        "data-live-translation-status": (S == null ? void 0 : S.jobStatus) || void 0,
        "aria-hidden": a ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          w ? /* @__PURE__ */ y("div", { className: "reader-react-pdf-pane-action", children: w }) : null,
          h ? /* @__PURE__ */ D("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ y("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ y("span", { children: h })
          ] }) : null,
          ho && !F ? /* @__PURE__ */ y("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: go }) : null,
          F ? /* @__PURE__ */ y("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          R && !x ? /* @__PURE__ */ y("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ y(
            ta,
            {
              file: R,
              loading: null,
              error: null,
              options: ne,
              onLoadSuccess: Nt,
              onLoadError: dt,
              className: "reader-react-pdf-document",
              children: Se.map((z) => {
                if (ut.has(z))
                  return /* @__PURE__ */ y(
                    Pi,
                    {
                      pane: t,
                      pageNumber: z,
                      width: $,
                      devicePixelRatio: ce,
                      active: kt.has(z),
                      syncedMinHeight: (c == null ? void 0 : c.get(z)) || 0,
                      onMetrics: d,
                      cachedAspect: W.get(z),
                      onAspectChange: ve,
                      sentinelRef: lt(z),
                      regionHighlight: (Te == null ? void 0 : Te.box.page) === z ? Te : null,
                      regionTargets: $e.get(z),
                      onSelectRegion: v,
                      liveTranslationLayout: S == null ? void 0 : S.layoutByPage.get(z - 1),
                      liveTranslationPage: S == null ? void 0 : S.pagesByPage.get(z - 1),
                      showLiveTranslation: P
                    },
                    `${t}-${z}`
                  );
                const J = W.get(z) ?? Hr, H = Math.max(120, Math.floor($ * J)), se = Math.max(H, Math.ceil((c == null ? void 0 : c.get(z)) || 0));
                return /* @__PURE__ */ y(
                  "div",
                  {
                    ref: lt(z),
                    [We]: z,
                    [Ve]: t,
                    [dn]: H,
                    className: un,
                    style: {
                      width: $,
                      height: se,
                      minHeight: se
                    },
                    children: /* @__PURE__ */ y(
                      "div",
                      {
                        className: wt,
                        style: { width: $, height: H },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${z}`
                );
              })
            },
            C
          ) }) : null
        ]
      }
    );
  }
), qn = tn(Mi), Jr = rn(null), Wr = rn(null);
function Ai({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ y(Jr.Provider, { value: e, children: /* @__PURE__ */ y(Wr.Provider, { value: t, children: n }) });
}
function ct() {
  return on(Jr);
}
function ki() {
  return on(Wr);
}
function Ni({
  mode: e,
  compareMode: t,
  showSource: n,
  showTranslated: r,
  markdownSplit: o,
  overlayOnSource: a = !1
}) {
  const s = o && e === "compare";
  return {
    mode: s ? "source" : e,
    compareMode: t && !o,
    showSource: s ? !0 : n,
    showTranslated: s ? !1 : r
  };
}
function Ci(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function Li(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function xi(e) {
  const t = ct(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", l = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, c = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), d = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, u = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? it, b = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, p = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), g = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, v = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, S = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, P = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", h = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", w = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, A = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, M = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), F = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), x = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), C = e.regions ?? (t == null ? void 0 : t.regions) ?? [], I = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), R = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), T = Ni({
    mode: s,
    compareMode: l,
    showSource: i,
    showTranslated: c,
    markdownSplit: n,
    overlayOnSource: d
  }), E = Ci(
    b,
    n || r,
    typeof document > "u" ? b * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ y(
    "div",
    {
      ref: u,
      className: Ar,
      "data-reader-region-count": C.length,
      "data-reader-structured-region-count": C.filter(yr).length,
      "data-reader-metadata-ready": I ? "true" : "false",
      children: /* @__PURE__ */ D(
        "main",
        {
          className: `${Va} reader-mode-${T.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            g ? /* @__PURE__ */ y(
              qn,
              {
                pane: "source",
                url: P,
                preloadedFile: w,
                userZoom: m,
                visible: T.showSource,
                scrollRoot: f,
                pageWidthOverride: E,
                rowHeights: T.compareMode ? p : void 0,
                onMetrics: M,
                emptyLabel: S ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: F,
                activeRegion: x,
                regions: C,
                readerMetadata: I,
                onSelectRegion: R,
                liveTranslation: d ? o : void 0,
                showLiveTranslation: d,
                liveTranslationPendingLabel: d ? Li(o) : "",
                paneAction: d ? /* @__PURE__ */ D(It, { children: [
                  e.sourcePaneAction,
                  /* @__PURE__ */ y(
                    "span",
                    {
                      className: "reader-source-overlay-badge",
                      "data-source-overlay-badge": "true",
                      title: "源栏正在叠加实时译文，右栏为最终译文 PDF",
                      children: "原文+实时译文叠加"
                    }
                  )
                ] }) : e.sourcePaneAction
              }
            ) : null,
            v ? /* @__PURE__ */ y(
              qn,
              {
                pane: "translated",
                url: h,
                preloadedFile: A,
                userZoom: m,
                visible: T.showTranslated,
                scrollRoot: f,
                pageWidthOverride: E,
                rowHeights: T.compareMode ? p : void 0,
                onMetrics: M,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: F,
                activeRegion: x,
                regions: C,
                readerMetadata: I,
                onSelectRegion: R,
                liveTranslation: void 0,
                showLiveTranslation: !1
              }
            ) : null
          ]
        }
      )
    }
  );
}
const _i = [
  { id: "source", label: "源文件", Icon: wr },
  { id: "compare", label: "对照", Icon: Pr },
  { id: "translated", label: "翻译文件", Icon: Rr }
];
function Kn(e) {
  return `辅助面板占了右半边，对照只剩${e === "translated" ? "译文" : "原文"} · 点此关闭面板恢复对照`;
}
function zi(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function Di(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Fi(e) {
  const t = ct(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null,
    compareDegraded: s = !1,
    onRestoreCompare: l
  } = e, i = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, c = a ? zi(a.state) : "";
  return /* @__PURE__ */ D("header", { className: "reader-workspace-bar", children: [
    a ? /* @__PURE__ */ D(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${a.state.connection}${a.visible ? " is-active" : ""}`,
        "aria-pressed": a.visible,
        "aria-label": a.visible ? "隐藏实时译文" : "显示实时译文",
        title: a.state.error || c,
        onClick: a.onToggle,
        children: [
          /* @__PURE__ */ y($o, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { className: "reader-live-translation-toggle-label", children: c })
        ]
      }
    ) : null,
    /* @__PURE__ */ y("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: _i.map(({ id: d, label: u, Icon: f }) => {
      const m = n === d, b = Di({
        id: d,
        documentReady: r,
        sourceViewOnly: i,
        liveTranslationAvailable: !!a
      });
      return /* @__PURE__ */ D(
        "button",
        {
          type: "button",
          className: `reader-workspace-tab${m ? " is-active" : ""}`,
          role: "tab",
          "aria-selected": m,
          "aria-label": u,
          title: b ? `${u} 需要文档任务` : u,
          disabled: b,
          onClick: () => o(d),
          children: [
            /* @__PURE__ */ y(f, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ y("span", { className: "reader-workspace-tab-label", children: u })
          ]
        },
        d
      );
    }) }),
    s ? /* @__PURE__ */ D(
      "button",
      {
        type: "button",
        className: "reader-compare-degraded",
        onClick: l,
        title: Kn(n),
        children: [
          /* @__PURE__ */ y(jo, { size: 13, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { className: "reader-compare-degraded-label", children: Kn(n) })
        ]
      }
    ) : null
  ] });
}
const Oi = {
  markdown: { label: "Markdown", short: "MD", Icon: Bo, needsJob: !0 },
  ai: { label: "AI 问答", short: "AI", Icon: Tr, needsJob: !0 },
  notes: { label: "批注", short: "注", Icon: Ir, needsJob: !1 },
  // 手写批注和 agent 标的批注不合并：前者可改可删可导出，后者是 agent 重写整份
  // 摘录走 documentId 也能读，没有 job 一样有内容。
  favorites: { label: "摘录", short: "藏", Icon: Uo, needsJob: !1 }
}, $i = Lr.map(
  (e) => ({ id: e, ...Oi[e] })
), ji = {
  "reading-path": {
    label: "阅读路径",
    short: "路径",
    Icon: Wo,
    adapterKey: "renderReaderReadingPath",
    slot: "document",
    ariaLabel: "阅读路径",
    keepMounted: !1
  },
  "reading-canvas": {
    label: "画布",
    short: "画",
    Icon: Jo,
    adapterKey: "renderReaderReadingCanvas",
    slot: "document",
    ariaLabel: "AI 画布",
    keepMounted: !0
  },
  terminal: {
    label: "终端",
    short: "SH",
    Icon: Ho,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    ariaLabel: "fx 终端",
    keepMounted: !0
  }
}, Vr = xr.map(
  (e) => ({ id: e, ...ji[e] })
);
function Ui(e) {
  return [
    ...$i.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: a
    })),
    ...Vr.filter((t) => e(t.adapterKey)).map(({ id: t, label: n, short: r, Icon: o }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: !1
    }))
  ];
}
function Bi() {
  const e = ae();
  return Ui((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function Hi(e) {
  const t = ct(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), l = Bi();
  return n ? /* @__PURE__ */ D("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ y("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: l.map(({ id: i, label: c, Icon: d, needsJob: u }) => {
      const f = n === i, m = u && o, b = r == null ? void 0 : r[i];
      return /* @__PURE__ */ D(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": f,
          className: `reader-assistant-dock-tab${f ? " is-active" : ""}`,
          title: m ? `${c} 需打开任务阅读` : c,
          disabled: m,
          onClick: () => a(i),
          children: [
            /* @__PURE__ */ y(d, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ y("span", { className: "reader-assistant-dock-tab-label", children: c }),
            b ? /* @__PURE__ */ y("span", { className: "reader-assistant-dock-badge", children: b }) : null
          ]
        },
        i
      );
    }) }),
    /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        className: "reader-assistant-dock-close",
        "aria-label": "关闭阅读辅助面板",
        title: "关闭辅助面板",
        onClick: s,
        children: /* @__PURE__ */ y(sn, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ y("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: l.map(({ id: i, label: c, short: d, Icon: u, needsJob: f }) => {
    const m = f && o, b = r == null ? void 0 : r[i];
    return /* @__PURE__ */ D(
      "button",
      {
        type: "button",
        className: "reader-assistant-rail-button",
        "aria-label": `打开${c}`,
        title: m ? `${c} 需打开任务阅读` : c,
        disabled: m,
        onClick: () => a(i),
        children: [
          /* @__PURE__ */ y(u, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { children: d }),
          b ? /* @__PURE__ */ y("span", { className: "reader-assistant-dock-badge", children: b }) : null
        ]
      },
      i
    );
  }) });
}
function Ji(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function Wi(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function Vi(e) {
  return e / 100 * window.innerHeight;
}
function qi(e) {
  return e / 100 * window.innerWidth;
}
function Ki(e) {
  switch (typeof e) {
    case "number":
      return [e, "px"];
    case "string": {
      const t = parseFloat(e);
      return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
    }
  }
}
function Xe({
  groupSize: e,
  panelElement: t,
  styleProp: n
}) {
  let r;
  const [o, a] = Ki(n);
  switch (a) {
    case "%": {
      r = o / 100 * e;
      break;
    }
    case "px": {
      r = o;
      break;
    }
    case "rem": {
      r = Wi(t, o);
      break;
    }
    case "em": {
      r = Ji(t, o);
      break;
    }
    case "vh": {
      r = Vi(o);
      break;
    }
    case "vw": {
      r = qi(o);
      break;
    }
  }
  return r;
}
function le(e) {
  return parseFloat(e.toFixed(3));
}
function qe({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, o) => (r += t === "horizontal" ? o.element.offsetWidth : o.element.offsetHeight, r), 0);
}
function Zt(e) {
  const { panels: t } = e, n = qe({ group: e });
  return n === 0 ? t.map((r) => ({
    groupResizeBehavior: r.panelConstraints.groupResizeBehavior,
    collapsedSize: 0,
    collapsible: r.panelConstraints.collapsible === !0,
    defaultSize: void 0,
    disabled: r.panelConstraints.disabled,
    minSize: 0,
    maxSize: 100,
    panelId: r.id
  })) : t.map((r) => {
    const { element: o, panelConstraints: a } = r;
    let s = 0;
    if (a.collapsedSize !== void 0) {
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.collapsedSize
      });
      s = le(d / n * 100);
    }
    let l;
    if (a.defaultSize !== void 0) {
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      l = le(d / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.minSize
      });
      i = le(d / n * 100);
    }
    let c = 100;
    if (a.maxSize !== void 0) {
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      c = le(d / n * 100);
    }
    return {
      groupResizeBehavior: a.groupResizeBehavior,
      collapsedSize: s,
      collapsible: a.collapsible === !0,
      defaultSize: l,
      disabled: a.disabled,
      minSize: i,
      maxSize: c,
      panelId: r.id
    };
  });
}
function G(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function Yt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? Gi : Zi
  );
}
function Gi(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function Zi(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function qr(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Kr(e, t) {
  return {
    x: e.x >= t.left && e.x <= t.right ? 0 : Math.min(
      Math.abs(e.x - t.left),
      Math.abs(e.x - t.right)
    ),
    y: e.y >= t.top && e.y <= t.bottom ? 0 : Math.min(
      Math.abs(e.y - t.top),
      Math.abs(e.y - t.bottom)
    )
  };
}
function Yi({
  orientation: e,
  rects: t,
  targetRect: n
}) {
  const r = {
    x: n.x + n.width / 2,
    y: n.y + n.height / 2
  };
  let o, a = Number.MAX_VALUE;
  for (const s of t) {
    const { x: l, y: i } = Kr(r, s), c = e === "horizontal" ? l : i;
    c < a && (a = c, o = s);
  }
  return G(o, "No rect found"), o;
}
let pt;
function Xi() {
  return pt === void 0 && (typeof matchMedia == "function" ? pt = !!matchMedia("(pointer:coarse)").matches : pt = !1), pt;
}
function Gr(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = Yt(
    n,
    Array.from(t.children).filter(qr).map((b) => ({ element: b }))
  ).map(({ element: b }) => b), s = [];
  let l = !1, i = !1, c = -1, d = -1, u = 0, f, m = [];
  {
    let b = -1;
    for (const p of a)
      p.hasAttribute("data-panel") && (b++, p.hasAttribute("data-disabled") || (u++, c === -1 && (c = b), d = b));
  }
  if (u > 1) {
    let b = -1;
    for (const p of a)
      if (p.hasAttribute("data-panel")) {
        b++;
        const g = r.find(
          (v) => v.element === p
        );
        if (g) {
          if (f) {
            const v = f.element.getBoundingClientRect(), S = p.getBoundingClientRect();
            let P;
            if (i) {
              const h = n === "horizontal" ? new DOMRect(
                v.right,
                v.top,
                0,
                v.height
              ) : new DOMRect(
                v.left,
                v.bottom,
                v.width,
                0
              ), w = n === "horizontal" ? new DOMRect(S.left, S.top, 0, S.height) : new DOMRect(S.left, S.top, S.width, 0);
              switch (m.length) {
                case 0: {
                  P = [
                    h,
                    w
                  ];
                  break;
                }
                case 1: {
                  const A = m[0], M = Yi({
                    orientation: n,
                    rects: [v, S],
                    targetRect: A.element.getBoundingClientRect()
                  });
                  P = [
                    A,
                    M === v ? w : h
                  ];
                  break;
                }
                default: {
                  P = m;
                  break;
                }
              }
            } else
              m.length ? P = m : P = [
                n === "horizontal" ? new DOMRect(
                  v.right,
                  S.top,
                  S.left - v.right,
                  S.height
                ) : new DOMRect(
                  S.left,
                  v.bottom,
                  S.width,
                  S.top - v.bottom
                )
              ];
            for (const h of P) {
              let w = "width" in h ? h : h.element.getBoundingClientRect();
              const A = Xi() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (w.width < A) {
                const F = A - w.width;
                w = new DOMRect(
                  w.x - F / 2,
                  w.y,
                  w.width + F,
                  w.height
                );
              }
              if (w.height < A) {
                const F = A - w.height;
                w = new DOMRect(
                  w.x,
                  w.y - F / 2,
                  w.width,
                  w.height + F
                );
              }
              const M = b <= c || b > d;
              !l && !M && s.push({
                group: e,
                groupSize: qe({ group: e }),
                panels: [f, g],
                separator: "width" in h ? void 0 : h,
                rect: w
              }), l = !1;
            }
          }
          i = !1, f = g, m = [];
        }
      } else if (p.hasAttribute("data-separator")) {
        p.ariaDisabled !== null && (l = !0);
        const g = o.find(
          (v) => v.element === p
        );
        g ? m.push(g) : (f = void 0, m = []);
      } else
        i = !0;
  }
  return s;
}
var Me;
class Zr {
  constructor() {
    Nn(this, Me, {});
  }
  addListener(t, n) {
    const r = Ke(this, Me)[t];
    return r === void 0 ? Ke(this, Me)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = Ke(this, Me)[t];
    if (r !== void 0)
      if (r.length === 1)
        r[0].call(null, n);
      else {
        let o = !1, a = null;
        const s = Array.from(r);
        for (let l = 0; l < s.length; l++) {
          const i = s[l];
          try {
            i.call(null, n);
          } catch (c) {
            a === null && (o = !0, a = c);
          }
        }
        if (o)
          throw a;
      }
  }
  removeAllListeners() {
    Cn(this, Me, {});
  }
  removeListener(t, n) {
    const r = Ke(this, Me)[t];
    if (r !== void 0) {
      const o = r.indexOf(n);
      o >= 0 && r.splice(o, 1);
    }
  }
}
Me = new WeakMap();
let He = {
  cursorFlags: 0,
  state: "inactive"
};
const hn = new Zr();
function Ce() {
  return He;
}
function Qi(e) {
  return hn.addListener("change", e);
}
function ec(e) {
  const t = He, n = { ...He };
  n.cursorFlags = e, He = n, hn.emit("change", {
    prev: t,
    next: n
  });
}
function Je(e) {
  const t = He;
  He = e, hn.emit("change", {
    prev: t,
    next: e
  });
}
const tc = (e) => e, Ot = () => {
}, Yr = 1, Xr = 2, Qr = 4, eo = 8, Gn = 3, Zn = 12;
let ht;
function Yn() {
  return ht === void 0 && (ht = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (ht = !0)), ht;
}
function nc({
  cursorFlags: e,
  groups: t,
  state: n
}) {
  let r = 0, o = 0;
  switch (n) {
    case "active":
    case "hover":
      t.forEach((a) => {
        if (!a.mutableState.disableCursor)
          switch (a.orientation) {
            case "horizontal": {
              r++;
              break;
            }
            case "vertical": {
              o++;
              break;
            }
          }
      });
  }
  if (!(r === 0 && o === 0)) {
    switch (n) {
      case "active": {
        if (e && Yn()) {
          const a = (e & Yr) !== 0, s = (e & Xr) !== 0, l = (e & Qr) !== 0, i = (e & eo) !== 0;
          if (a)
            return l ? "se-resize" : i ? "ne-resize" : "e-resize";
          if (s)
            return l ? "sw-resize" : i ? "nw-resize" : "w-resize";
          if (l)
            return "s-resize";
          if (i)
            return "n-resize";
        }
        break;
      }
    }
    return Yn() ? r > 0 && o > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && o > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const Xn = /* @__PURE__ */ new WeakMap();
function gn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = Xn.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = Ce();
  switch (r.state) {
    case "active":
    case "hover": {
      const o = nc({
        cursorFlags: r.cursorFlags,
        groups: r.hitRegions.map((s) => s.group),
        state: r.state
      }), a = `*, *:hover {cursor: ${o} !important; }`;
      if (t === a)
        return;
      t = a, o ? n.cssRules.length === 0 ? n.insertRule(a) : n.replaceSync(a) : n.cssRules.length === 1 && n.deleteRule(0);
      break;
    }
    case "inactive": {
      t = void 0, n.cssRules.length === 1 && n.deleteRule(0);
      break;
    }
  }
  Xn.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let ye = /* @__PURE__ */ new Map();
const to = new Zr();
function rc(e) {
  ye = new Map(ye), ye.delete(e);
}
function Qn(e, t) {
  for (const [n] of ye)
    if (n.id === e)
      return n;
}
function Ae(e, t) {
  for (const [n, r] of ye)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function ze() {
  return ye;
}
function bn(e, t) {
  return to.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Ie(e, t, n) {
  const r = ye.get(e);
  ye = new Map(ye), ye.set(e, t), to.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function no(e) {
  const t = Ce();
  let n = !1;
  switch (t.state) {
    case "active":
      Je({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (gn(e), n = !0, t.hitRegions.forEach((r) => {
        const o = Ae(r.group.id, !0);
        Ie(r.group, o, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function er(e) {
  e.defaultPrevented || no(e.currentTarget);
}
function oc(e, t, n) {
  let r, o = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const s = Kr(n, a.rect);
    switch (e) {
      case "horizontal": {
        s.x <= o.x && (r = a, o = s);
        break;
      }
      case "vertical": {
        s.y <= o.y && (r = a, o = s);
        break;
      }
    }
  }
  return r ? {
    distance: o,
    hitRegion: r
  } : void 0;
}
function ac(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function sc(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: rr(e),
    b: rr(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  G(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const o = {
    a: nr(tr(n.a)),
    b: nr(tr(n.b))
  };
  if (o.a === o.b) {
    const a = r.childNodes, s = {
      a: n.a.at(-1),
      b: n.b.at(-1)
    };
    let l = a.length;
    for (; l--; ) {
      const i = a[l];
      if (i === s.a) return 1;
      if (i === s.b) return -1;
    }
  }
  return Math.sign(o.a - o.b);
}
const ic = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function cc(e) {
  const t = getComputedStyle(ro(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function lc(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || cc(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || ic.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function tr(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (G(n, "Missing node"), lc(n)) return n;
  }
  return null;
}
function nr(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function rr(e) {
  const t = [];
  for (; e; )
    t.push(e), e = ro(e);
  return t;
}
function ro(e) {
  const { parentNode: t } = e;
  return ac(t) ? t.host : t;
}
function dc(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function uc({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!qr(n) || n.contains(e) || e.contains(n))
    return !0;
  if (sc(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (dc(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function yn(e, t) {
  const n = [];
  return t.forEach((r, o) => {
    if (o.disabled)
      return;
    const a = Gr(o), s = oc(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && uc({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function fc(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function ie(e, t, n = 0) {
  return Math.abs(le(e) - le(t)) <= n;
}
function be(e, t) {
  return ie(e, t) ? 0 : e > t ? 1 : -1;
}
function Be({
  overrideDisabledPanels: e,
  panelConstraints: t,
  prevSize: n,
  size: r
}) {
  const {
    collapsedSize: o = 0,
    collapsible: a,
    disabled: s,
    maxSize: l = 100,
    minSize: i = 0
  } = t;
  if (s && !e)
    return n;
  if (be(r, i) < 0)
    if (a) {
      const c = (o + i) / 2;
      be(r, c) < 0 ? r = o : r = i;
    } else
      r = i;
  return r = Math.min(l, r), r = le(r), r;
}
function ot({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: o,
  trigger: a
}) {
  if (ie(e, 0))
    return t;
  const s = a === "imperative-api", l = Object.values(t), i = Object.values(o), c = [...l], [d, u] = r;
  G(d != null, "Invalid first pivot index"), G(u != null, "Invalid second pivot index");
  let f = 0;
  switch (a) {
    case "keyboard": {
      {
        const p = e < 0 ? u : d, g = n[p];
        G(
          g,
          `Panel constraints not found for index ${p}`
        );
        const {
          collapsedSize: v = 0,
          collapsible: S,
          minSize: P = 0
        } = g;
        if (S) {
          const h = l[p];
          if (G(
            h != null,
            `Previous layout not found for panel index ${p}`
          ), ie(h, v)) {
            const w = P - h;
            be(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      {
        const p = e < 0 ? d : u, g = n[p];
        G(
          g,
          `No panel constraints found for index ${p}`
        );
        const {
          collapsedSize: v = 0,
          collapsible: S,
          minSize: P = 0
        } = g;
        if (S) {
          const h = l[p];
          if (G(
            h != null,
            `Previous layout not found for panel index ${p}`
          ), ie(h, P)) {
            const w = h - v;
            be(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      break;
    }
    default: {
      const p = e < 0 ? u : d, g = n[p];
      G(
        g,
        `Panel constraints not found for index ${p}`
      );
      const v = l[p], { collapsible: S, collapsedSize: P, minSize: h } = g;
      if (S && be(v, h) < 0)
        if (e > 0) {
          const w = h - P, A = w / 2, M = v + e;
          be(M, h) < 0 && (e = be(e, A) <= 0 ? 0 : w);
        } else {
          const w = h - P, A = 100 - w / 2, M = v - e;
          be(M, h) < 0 && (e = be(100 + e, A) > 0 ? 0 : -w);
        }
      break;
    }
  }
  {
    const p = e < 0 ? 1 : -1;
    let g = e < 0 ? u : d, v = 0;
    for (; ; ) {
      const P = l[g];
      G(
        P != null,
        `Previous layout not found for panel index ${g}`
      );
      const h = Be({
        overrideDisabledPanels: s,
        panelConstraints: n[g],
        prevSize: P,
        size: 100
      }) - P;
      if (v += h, g += p, g < 0 || g >= n.length)
        break;
    }
    const S = Math.min(Math.abs(e), Math.abs(v));
    e = e < 0 ? 0 - S : S;
  }
  {
    let p = e < 0 ? d : u;
    for (; p >= 0 && p < n.length; ) {
      const g = Math.abs(e) - Math.abs(f), v = l[p];
      G(
        v != null,
        `Previous layout not found for panel index ${p}`
      );
      const S = v - g, P = Be({
        overrideDisabledPanels: s,
        panelConstraints: n[p],
        prevSize: v,
        size: S
      });
      if (!ie(v, P) && (f += v - P, c[p] = P, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? p-- : p++;
    }
  }
  if (fc(i, c))
    return o;
  {
    const p = e < 0 ? u : d, g = l[p];
    G(
      g != null,
      `Previous layout not found for panel index ${p}`
    );
    const v = g + f, S = Be({
      overrideDisabledPanels: s,
      panelConstraints: n[p],
      prevSize: g,
      size: v
    });
    if (c[p] = S, !ie(S, v)) {
      let P = v - S, h = e < 0 ? u : d;
      for (; h >= 0 && h < n.length; ) {
        const w = c[h];
        G(
          w != null,
          `Previous layout not found for panel index ${h}`
        );
        const A = w + P, M = Be({
          overrideDisabledPanels: s,
          panelConstraints: n[h],
          prevSize: w,
          size: A
        });
        if (ie(w, M) || (P -= M - w, c[h] = M), ie(P, 0))
          break;
        e > 0 ? h-- : h++;
      }
    }
  }
  const m = Object.values(c).reduce(
    (p, g) => g + p,
    0
  );
  if (!ie(m, 100, 0.1))
    return o;
  const b = Object.keys(o);
  return c.reduce((p, g, v) => (p[b[v]] = g, p), {});
}
function Le(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || be(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function xe({
  layout: e,
  panelConstraints: t
}) {
  const n = Object.values(e), r = [...n], o = r.reduce(
    (l, i) => l + i,
    0
  );
  if (r.length !== t.length)
    throw Error(
      `Invalid ${t.length} panel layout: ${r.map((l) => `${l}%`).join(", ")}`
    );
  if (!ie(o, 100) && r.length > 0)
    for (let l = 0; l < t.length; l++) {
      const i = r[l];
      G(i != null, `No layout data found for index ${l}`);
      const c = 100 / o * i;
      r[l] = c;
    }
  let a = 0;
  for (let l = 0; l < t.length; l++) {
    const i = n[l];
    G(i != null, `No layout data found for index ${l}`);
    const c = r[l];
    G(c != null, `No layout data found for index ${l}`);
    const d = Be({
      overrideDisabledPanels: !0,
      panelConstraints: t[l],
      prevSize: i,
      size: c
    });
    c != d && (a += c - d, r[l] = d);
  }
  if (!ie(a, 0))
    for (let l = 0; l < t.length; l++) {
      const i = r[l];
      G(i != null, `No layout data found for index ${l}`);
      const c = i + a, d = Be({
        overrideDisabledPanels: !0,
        panelConstraints: t[l],
        prevSize: i,
        size: c
      });
      if (i !== d && (a -= d - i, r[l] = d, ie(a, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((l, i, c) => (l[s[c]] = i, l), {});
}
function oo({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const i = ze();
    for (const [
      c,
      {
        defaultLayoutDeferred: d,
        derivedPanelConstraints: u,
        layout: f,
        groupSize: m,
        separatorToPanels: b
      }
    ] of i)
      if (c.id === e)
        return {
          defaultLayoutDeferred: d,
          derivedPanelConstraints: u,
          group: c,
          groupSize: m,
          layout: f,
          separatorToPanels: b
        };
    throw Error(`Group ${e} not found`);
  }, r = () => {
    const i = n().derivedPanelConstraints.find(
      (c) => c.panelId === t
    );
    if (i !== void 0)
      return i;
    throw Error(`Panel constraints not found for Panel ${t}`);
  }, o = () => {
    const i = n().group.panels.find((c) => c.id === t);
    if (i !== void 0)
      return i;
    throw Error(`Layout not found for Panel ${t}`);
  }, a = () => {
    const i = n().layout[t];
    if (i !== void 0)
      return i;
    throw Error(`Layout not found for Panel ${t}`);
  }, s = ({
    nextSize: i,
    panels: c,
    prevLayout: d,
    derivedPanelConstraints: u
  }) => {
    const f = a(), m = c.findIndex((g) => g.id === t), b = m === 0, p = m === c.length - 1;
    if (p && i < f && (b || c.slice(0, m).every((g, v) => {
      const S = u[v];
      return (S == null ? void 0 : S.collapsible) && ie(S.collapsedSize, d[S.panelId]);
    }))) {
      const g = c.slice(0, m).reduce((v, S) => v + d[S.id], 0);
      return {
        ...d,
        [t]: le(100 - g)
      };
    }
    return ot({
      delta: p ? f - i : i - f,
      initialLayout: d,
      panelConstraints: u,
      pivotIndices: p ? [m - 1, m] : [m, m + 1],
      prevLayout: d,
      trigger: "imperative-api"
    });
  }, l = (i) => {
    const c = a();
    if (i === c)
      return;
    const {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      group: f,
      groupSize: m,
      layout: b,
      separatorToPanels: p
    } = n(), g = s({
      nextSize: i,
      panels: f.panels,
      prevLayout: b,
      derivedPanelConstraints: u
    }), v = xe({
      layout: g,
      panelConstraints: u
    });
    Le(b, v) || Ie(f, {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      groupSize: m,
      layout: v,
      separatorToPanels: p
    });
  };
  return {
    collapse: () => {
      const { collapsible: i, collapsedSize: c } = r(), { mutableValues: d } = o(), u = a();
      i && u !== c && (d.expandToSize = u, l(c));
    },
    expand: () => {
      const { collapsible: i, collapsedSize: c, minSize: d } = r(), { mutableValues: u } = o(), f = a();
      if (i && f === c) {
        let m = u.expandToSize ?? d;
        m === 0 && (m = 1), l(m);
      }
    },
    getSize: () => {
      const { group: i } = n(), c = a(), { element: d } = o(), u = i.orientation === "horizontal" ? d.offsetWidth : d.offsetHeight;
      return {
        asPercentage: c,
        inPixels: u
      };
    },
    isCollapsed: () => {
      const { collapsible: i, collapsedSize: c } = r(), d = a();
      return i && ie(c, d);
    },
    resize: (i) => {
      const { group: c } = n(), { element: d } = o(), u = qe({ group: c }), f = Xe({
        groupSize: u,
        panelElement: d,
        styleProp: i
      }), m = le(f / u * 100);
      l(m);
    }
  };
}
function or(e) {
  if (e.defaultPrevented)
    return;
  const t = ze();
  yn(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (o) => o.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const o = r.panelConstraints.defaultSize, a = oo({
          groupId: n.group.id,
          panelId: r.id
        });
        a && o !== void 0 && (a.resize(o), e.preventDefault());
      }
    }
  });
}
function bt(e) {
  const t = ze();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function ao({
  groupId: e
}) {
  const t = () => {
    const n = ze();
    for (const [r, o] of n)
      if (r.id === e)
        return { group: r, ...o };
    throw Error(`Could not find Group with id "${e}"`);
  };
  return {
    getLayout() {
      const { defaultLayoutDeferred: n, layout: r } = t();
      return n ? {} : r;
    },
    setLayout(n) {
      const {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: o,
        group: a,
        groupSize: s,
        layout: l,
        separatorToPanels: i
      } = t(), c = xe({
        layout: n,
        panelConstraints: o
      });
      return r ? l : (Le(l, c) || Ie(a, {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: o,
        groupSize: s,
        layout: c,
        separatorToPanels: i
      }), c);
    }
  };
}
function Ne(e, t) {
  const n = bt(e), r = Ae(n.id, !0), o = n.separators.find(
    (d) => d.element === e
  );
  G(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  G(a, "Matching panels not found");
  const s = a.map((d) => n.panels.indexOf(d)), l = ao({ groupId: n.id }).getLayout(), i = ot({
    delta: t,
    initialLayout: l,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: l,
    trigger: "keyboard"
  }), c = xe({
    layout: i,
    panelConstraints: r.derivedPanelConstraints
  });
  Le(l, c) || Ie(
    n,
    {
      defaultLayoutDeferred: r.defaultLayoutDeferred,
      derivedPanelConstraints: r.derivedPanelConstraints,
      groupSize: r.groupSize,
      layout: c,
      separatorToPanels: r.separatorToPanels
    },
    // Keyboard resizes (arrow keys, Home/End, Enter collapse/expand) originate
    // from a real DOM event on the separator, so they are user interactions
    // just like pointer drags. This function is only reached from
    // onDocumentKeyDown. See #716.
    { isUserInteraction: !0 }
  );
}
function ar(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = bt(t);
  if (!n.disabled)
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault(), n.orientation === "vertical" && Ne(t, 5);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault(), n.orientation === "horizontal" && Ne(t, -5);
        break;
      }
      case "ArrowRight": {
        e.preventDefault(), n.orientation === "horizontal" && Ne(t, 5);
        break;
      }
      case "ArrowUp": {
        e.preventDefault(), n.orientation === "vertical" && Ne(t, -5);
        break;
      }
      case "End": {
        e.preventDefault(), Ne(t, 100);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const r = bt(t), o = Ae(r.id, !0), { derivedPanelConstraints: a, layout: s, separatorToPanels: l } = o, i = r.separators.find(
          (f) => f.element === t
        );
        G(i, "Matching separator not found");
        const c = l.get(i);
        G(c, "Matching panels not found");
        const d = c[0], u = a.find(
          (f) => f.panelId === d.id
        );
        if (G(u, "Panel metadata not found"), u.collapsible) {
          const f = s[d.id], m = u.collapsedSize === f ? r.mutableState.expandedPanelSizes[d.id] ?? u.minSize : u.collapsedSize;
          Ne(t, m - f);
        }
        break;
      }
      case "F6": {
        e.preventDefault();
        const r = bt(t).separators.map(
          (s) => s.element
        ), o = Array.from(r).findIndex(
          (s) => s === e.currentTarget
        );
        G(o !== null, "Index not found");
        const a = e.shiftKey ? o > 0 ? o - 1 : r.length - 1 : o + 1 < r.length ? o + 1 : 0;
        r[a].focus({
          preventScroll: !0
        });
        break;
      }
      case "Home": {
        e.preventDefault(), Ne(t, -100);
        break;
      }
    }
}
function sr(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = ze(), n = yn(e, t), r = /* @__PURE__ */ new Map();
  let o = !1;
  n.forEach((a) => {
    a.separator && (o || (o = !0, a.separator.element.focus({
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
      focusVisible: !1,
      preventScroll: !0
    })));
    const s = t.get(a.group);
    s && r.set(a.group, s.layout);
  }), Je({
    cursorFlags: 0,
    hitRegions: n,
    initialLayoutMap: r,
    pointerDownAtPoint: { x: e.clientX, y: e.clientY },
    state: "active"
  }), n.length && e.preventDefault();
}
function so({
  document: e,
  event: t,
  hitRegions: n,
  initialLayoutMap: r,
  mountedGroups: o,
  pointerDownAtPoint: a,
  prevCursorFlags: s
}) {
  let l = 0;
  n.forEach((c) => {
    const { group: d, groupSize: u } = c, { orientation: f, panels: m } = d, { disableCursor: b } = d.mutableState;
    let p = 0;
    a ? f === "horizontal" ? p = (t.clientX - a.x) / u * 100 : p = (t.clientY - a.y) / u * 100 : f === "horizontal" ? p = t.clientX < 0 ? -100 : 100 : p = t.clientY < 0 ? -100 : 100;
    const g = r.get(d), v = o.get(d);
    if (!g || !v)
      return;
    const {
      defaultLayoutDeferred: S,
      derivedPanelConstraints: P,
      groupSize: h,
      layout: w,
      separatorToPanels: A
    } = v;
    if (P && w && A) {
      const M = ot({
        delta: p,
        initialLayout: g,
        panelConstraints: P,
        pivotIndices: c.panels.map((F) => m.indexOf(F)),
        prevLayout: w,
        trigger: "mouse-or-touch"
      });
      if (Le(M, w)) {
        if (p !== 0 && !b)
          switch (f) {
            case "horizontal": {
              l |= p < 0 ? Yr : Xr;
              break;
            }
            case "vertical": {
              l |= p < 0 ? Qr : eo;
              break;
            }
          }
      } else
        Ie(c.group, {
          defaultLayoutDeferred: S,
          derivedPanelConstraints: P,
          groupSize: h,
          layout: M,
          separatorToPanels: A
        });
    }
  });
  let i = 0;
  t.movementX === 0 ? i |= s & Gn : i |= l & Gn, t.movementY === 0 ? i |= s & Zn : i |= l & Zn, ec(i), gn(e);
}
function ir(e) {
  const t = ze(), n = Ce();
  switch (n.state) {
    case "active":
      so({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function cr(e) {
  var r, o;
  if (e.defaultPrevented)
    return;
  const t = Ce(), n = ze();
  switch (t.state) {
    case "active": {
      if (
        // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
        e.buttons === 0
      ) {
        Je({
          cursorFlags: 0,
          state: "inactive"
        }), t.hitRegions.forEach((a) => {
          const s = Ae(a.group.id, !0);
          Ie(a.group, s, {
            isUserInteraction: !0
          });
        });
        return;
      }
      for (const a of t.hitRegions)
        if (a.separator) {
          const { element: s } = a.separator;
          (r = s.hasPointerCapture) != null && r.call(s, e.pointerId) || ((o = s.setPointerCapture) == null || o.call(s, e.pointerId));
        }
      so({
        document: e.currentTarget,
        event: e,
        hitRegions: t.hitRegions,
        initialLayoutMap: t.initialLayoutMap,
        mountedGroups: n,
        pointerDownAtPoint: t.pointerDownAtPoint,
        prevCursorFlags: t.cursorFlags
      });
      break;
    }
    default: {
      const a = yn(e, n);
      a.length === 0 ? t.state !== "inactive" && Je({
        cursorFlags: 0,
        state: "inactive"
      }) : Je({
        cursorFlags: 0,
        hitRegions: a,
        state: "hover"
      }), gn(e.currentTarget);
      break;
    }
  }
}
function lr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (Ce().state) {
      case "hover":
        Je({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function dr(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || no(e.currentTarget) && e.preventDefault();
}
function ur(e) {
  let t = 0, n = 0;
  const r = {};
  for (const a of e)
    if (a.defaultSize !== void 0) {
      t++;
      const s = le(a.defaultSize);
      n += s, r[a.panelId] = s;
    } else
      r[a.panelId] = void 0;
  const o = e.length - t;
  if (o !== 0) {
    const a = le((100 - n) / o);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = a);
  }
  return r;
}
function mc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = qe({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, l = {
    asPercentage: le(a / o * 100),
    inPixels: a
  };
  r.mutableValues.prevSize = l, r.onResize(l, r.id, s);
}
function pc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function hc({
  group: e,
  nextGroupSize: t,
  prevGroupSize: n,
  prevLayout: r
}) {
  if (n <= 0 || t <= 0 || n === t)
    return r;
  let o = 0, a = 0, s = !1;
  const l = /* @__PURE__ */ new Map(), i = [];
  for (const u of e.panels) {
    const f = r[u.id] ?? 0;
    switch (u.panelConstraints.groupResizeBehavior) {
      case "preserve-pixel-size": {
        s = !0;
        const m = f / 100 * n, b = le(
          m / t * 100
        );
        l.set(u.id, b), o += b;
        break;
      }
      case "preserve-relative-size":
      default: {
        i.push(u.id), a += f;
        break;
      }
    }
  }
  if (!s || i.length === 0)
    return r;
  const c = 100 - o, d = { ...r };
  if (l.forEach((u, f) => {
    d[f] = u;
  }), a > 0)
    for (const u of i) {
      const f = r[u] ?? 0;
      d[u] = le(
        f / a * c
      );
    }
  else {
    const u = le(
      c / i.length
    );
    for (const f of i)
      d[f] = u;
  }
  return d;
}
function gc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const je = /* @__PURE__ */ new Map();
function bc(e) {
  let t = !0;
  G(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new n((b) => {
    for (const p of b) {
      const { borderBoxSize: g, target: v } = p;
      if (v === e.element) {
        if (t) {
          const S = qe({ group: e });
          if (S === 0)
            return;
          const P = Ae(e.id);
          if (!P)
            return;
          const h = Zt(e), w = P.defaultLayoutDeferred ? ur(h) : P.layout, A = hc({
            group: e,
            nextGroupSize: S,
            prevGroupSize: P.groupSize,
            prevLayout: w
          }), M = xe({
            layout: A,
            panelConstraints: h
          });
          if (!P.defaultLayoutDeferred && Le(P.layout, M) && pc(
            P.derivedPanelConstraints,
            h
          ) && P.groupSize === S)
            return;
          Ie(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: h,
            groupSize: S,
            layout: M,
            separatorToPanels: P.separatorToPanels
          });
        }
      } else
        mc(e, v, g);
    }
  });
  a.observe(e.element), e.panels.forEach((b) => {
    G(
      !r.has(b.id),
      `Panel ids must be unique; id "${b.id}" was used more than once`
    ), r.add(b.id), b.onResize && a.observe(b.element);
  });
  const s = qe({ group: e }), l = Zt(e), i = e.panels.map(({ id: b }) => b).join(",");
  let c = e.mutableState.defaultLayout;
  c && (gc(e.panels, c) || (c = void 0));
  const d = e.mutableState.layouts[i] ?? c ?? ur(l), u = xe({
    layout: d,
    panelConstraints: l
  }), f = e.element.ownerDocument;
  je.set(
    f,
    (je.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return Gr(e).forEach((b) => {
    b.separator && m.set(b.separator, b.panels);
  }), Ie(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: l,
    groupSize: s,
    layout: u,
    separatorToPanels: m
  }), e.separators.forEach((b) => {
    G(
      !o.has(b.id),
      `Separator ids must be unique; id "${b.id}" was used more than once`
    ), o.add(b.id), b.element.addEventListener("keydown", ar);
  }), je.get(f) === 1 && (f.addEventListener("contextmenu", er, !0), f.addEventListener("dblclick", or, !0), f.addEventListener("pointerdown", sr, !0), f.addEventListener("pointerleave", ir), f.addEventListener("pointermove", cr), f.addEventListener("pointerout", lr), f.addEventListener("pointerup", dr, !0)), function() {
    t = !1, je.set(
      f,
      Math.max(0, (je.get(f) ?? 0) - 1)
    ), rc(e), e.separators.forEach((b) => {
      b.element.removeEventListener("keydown", ar);
    }), je.get(f) || (f.removeEventListener(
      "contextmenu",
      er,
      !0
    ), f.removeEventListener(
      "dblclick",
      or,
      !0
    ), f.removeEventListener(
      "pointerdown",
      sr,
      !0
    ), f.removeEventListener("pointerleave", ir), f.removeEventListener("pointermove", cr), f.removeEventListener("pointerout", lr), f.removeEventListener("pointerup", dr, !0)), a.disconnect();
  };
}
function yc() {
  const [e, t] = L({}), n = _(() => t({}), []);
  return [e, n];
}
function vn(e) {
  const t = br();
  return `${e ?? t}`;
}
const De = typeof window < "u" ? _e : j;
function et(e) {
  const t = N(e);
  return De(() => {
    t.current = e;
  }, [e]), _(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function Sn(...e) {
  return et((t) => {
    e.forEach((n) => {
      if (n)
        switch (typeof n) {
          case "function": {
            n(t);
            break;
          }
          case "object": {
            n.current = t;
            break;
          }
        }
    });
  });
}
function wn(e) {
  const t = N({ ...e });
  return De(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const io = rn(null);
function vc(e, t) {
  const n = N({
    getLayout: () => ({}),
    setLayout: tc
  });
  nn(t, () => n.current, []), De(() => {
    Object.assign(
      n.current,
      ao({ groupId: e })
    );
  });
}
function co({
  children: e,
  className: t,
  defaultLayout: n,
  disableCursor: r,
  disabled: o,
  elementRef: a,
  groupRef: s,
  id: l,
  onLayoutChange: i,
  onLayoutChanged: c,
  orientation: d = "horizontal",
  resizeTargetMinimumSize: u = {
    coarse: 20,
    fine: 10
  },
  style: f,
  ...m
}) {
  const b = N({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), p = et((I) => {
    Le(b.current.onLayoutChange, I) || (b.current.onLayoutChange = I, i == null || i(I));
  }), g = et(
    (I, R) => {
      Le(b.current.onLayoutChanged, I) || (b.current.onLayoutChanged = I, c == null || c(I, { isUserInteraction: R }));
    }
  ), v = vn(l), S = N(null), [P, h] = yc(), w = N({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: u,
    separators: []
  }), A = Sn(S, a);
  vc(v, s);
  const M = et(
    (I, R) => {
      const T = Ce(), E = Qn(I), k = Ae(I);
      if (k) {
        let U = !1;
        switch (T.state) {
          case "active": {
            U = T.hitRegions.some(
              (B) => B.group === E
            );
            break;
          }
        }
        return {
          flexGrow: k.layout[R] ?? 1,
          pointerEvents: U ? "none" : void 0
        };
      }
      if (n != null && n[R])
        return {
          flexGrow: n == null ? void 0 : n[R]
        };
    }
  ), F = wn({
    defaultLayout: n,
    disableCursor: r
  }), x = V(
    () => ({
      get disableCursor() {
        return !!F.disableCursor;
      },
      getPanelStyles: M,
      id: v,
      orientation: d,
      registerPanel: (I) => {
        const R = w.current;
        return R.panels = Yt(d, [
          ...R.panels,
          I
        ]), h(), () => {
          R.panels = R.panels.filter(
            (T) => T !== I
          ), h();
        };
      },
      registerSeparator: (I) => {
        const R = w.current;
        return R.separators = Yt(d, [
          ...R.separators,
          I
        ]), h(), () => {
          R.separators = R.separators.filter(
            (T) => T !== I
          ), h();
        };
      },
      updatePanelProps: (I, { disabled: R }) => {
        const T = w.current.panels.find(
          (U) => U.id === I
        );
        T && (T.panelConstraints.disabled = R);
        const E = Qn(v), k = Ae(v);
        E && k && Ie(E, {
          ...k,
          derivedPanelConstraints: Zt(E)
        });
      },
      updateSeparatorProps: (I, {
        disabled: R,
        disableDoubleClick: T
      }) => {
        const E = w.current.separators.find(
          (k) => k.id === I
        );
        E && (E.disabled = R, E.disableDoubleClick = T);
      }
    }),
    [M, v, h, d, F]
  ), C = N(null);
  return De(() => {
    const I = S.current;
    if (I === null)
      return;
    const R = w.current;
    let T;
    if (F.defaultLayout !== void 0 && Object.keys(F.defaultLayout).length === R.panels.length) {
      T = {};
      for (const re of R.panels) {
        const O = F.defaultLayout[re.id];
        O !== void 0 && (T[re.id] = O);
      }
    }
    const E = {
      disabled: !!o,
      element: I,
      id: v,
      mutableState: {
        defaultLayout: T,
        disableCursor: !!F.disableCursor,
        expandedPanelSizes: w.current.lastExpandedPanelSizes,
        layouts: w.current.layouts
      },
      orientation: d,
      panels: R.panels,
      resizeTargetMinimumSize: R.resizeTargetMinimumSize,
      separators: R.separators
    };
    C.current = E;
    const k = bc(E), { defaultLayoutDeferred: U, derivedPanelConstraints: B, layout: Z } = Ae(E.id, !0);
    !U && B.length > 0 && (p(Z), g(Z, !1));
    const te = bn(v, (re) => {
      const { defaultLayoutDeferred: O, derivedPanelConstraints: Y, layout: ce } = re.next;
      if (O || Y.length === 0)
        return;
      const ne = E.panels.map(({ id: W }) => W).join(",");
      E.mutableState.layouts[ne] = ce, Y.forEach((W) => {
        if (W.collapsible) {
          const { layout: ue } = re.prev ?? {};
          if (ue) {
            const fe = ie(
              W.collapsedSize,
              ce[W.panelId]
            ), Fe = ie(
              W.collapsedSize,
              ue[W.panelId]
            );
            fe && !Fe && (E.mutableState.expandedPanelSizes[W.panelId] = ue[W.panelId]);
          }
        }
      });
      const $ = Ce().state !== "active";
      p(ce), $ && g(ce, re.isUserInteraction);
    });
    return () => {
      C.current = null, k(), te();
    };
  }, [
    o,
    v,
    g,
    p,
    d,
    P,
    F
  ]), j(() => {
    const I = C.current;
    I && (I.mutableState.defaultLayout = n, I.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ y(io.Provider, { value: x, children: /* @__PURE__ */ y(
    "div",
    {
      ...m,
      className: t,
      "data-group": !0,
      "data-testid": v,
      id: v,
      ref: A,
      style: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
        ...f,
        display: "flex",
        flexDirection: d === "horizontal" ? "row" : "column",
        flexWrap: "nowrap",
        // Inform the browser that the library is handling touch events for this element
        // but still allow users to scroll content within panels in the non-resizing direction
        // NOTE This is not an inherited style
        // See github.com/bvaughn/react-resizable-panels/issues/662
        touchAction: d === "horizontal" ? "pan-y" : "pan-x"
      },
      children: e
    }
  ) });
}
co.displayName = "Group";
function Pn() {
  const e = on(io);
  return G(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function Sc(e, t) {
  const { id: n } = Pn(), r = N({
    collapse: Ot,
    expand: Ot,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Ot
  });
  nn(t, () => r.current, []), De(() => {
    Object.assign(
      r.current,
      oo({ groupId: n, panelId: e })
    );
  });
}
function Xt({
  children: e,
  className: t,
  collapsedSize: n = "0%",
  collapsible: r = !1,
  defaultSize: o,
  disabled: a,
  elementRef: s,
  groupResizeBehavior: l = "preserve-relative-size",
  id: i,
  maxSize: c = "100%",
  minSize: d = "0%",
  onResize: u,
  panelRef: f,
  style: m,
  ...b
}) {
  const p = !!i, g = vn(i), v = wn({
    disabled: a
  }), S = N(null), P = Sn(S, s), {
    getPanelStyles: h,
    id: w,
    orientation: A,
    registerPanel: M,
    updatePanelProps: F
  } = Pn(), x = u !== null, C = et(
    (E, k, U) => {
      u == null || u(E, i, U);
    }
  );
  De(() => {
    const E = S.current;
    if (E !== null) {
      const k = {
        element: E,
        id: g,
        idIsStable: p,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: x ? C : void 0,
        panelConstraints: {
          groupResizeBehavior: l,
          collapsedSize: n,
          collapsible: r,
          defaultSize: o,
          disabled: v.disabled,
          maxSize: c,
          minSize: d
        }
      };
      return M(k);
    }
  }, [
    l,
    n,
    r,
    o,
    x,
    g,
    p,
    c,
    d,
    C,
    M,
    v
  ]), j(() => {
    F(g, { disabled: a });
  }, [a, g, F]), Sc(g, f);
  const I = () => {
    const E = h(w, g);
    if (E)
      return JSON.stringify(E);
  }, R = yo(
    (E) => bn(w, E),
    I,
    I
  );
  let T;
  return R ? T = JSON.parse(R) : o !== void 0 ? T = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: o
  } : T = { flexGrow: 1 }, /* @__PURE__ */ y(
    "div",
    {
      ...b,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": g,
      id: g,
      ref: P,
      style: {
        ...wc,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...T
      },
      children: /* @__PURE__ */ y(
        "div",
        {
          className: t,
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            flexGrow: 1,
            overflow: "auto",
            ...m,
            // Inform the browser that the library is handling touch events for this element
            // but still allow users to scroll content within panels in the non-resizing direction
            // NOTE This is not an inherited style
            // See github.com/bvaughn/react-resizable-panels/issues/662
            touchAction: A === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
Xt.displayName = "Panel";
const wc = {
  minHeight: 0,
  maxHeight: "100%",
  height: "auto",
  minWidth: 0,
  maxWidth: "100%",
  width: "auto",
  border: "none",
  borderWidth: 0,
  padding: 0,
  margin: 0
};
function Pc({
  layout: e,
  panelConstraints: t,
  panelId: n,
  panelIndex: r
}) {
  let o, a;
  const s = e[n], l = t.find(
    (i) => i.panelId === n
  );
  if (l) {
    const i = l.maxSize, c = l.collapsible ? l.collapsedSize : l.minSize, d = [r, r + 1];
    a = xe({
      layout: ot({
        delta: c - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], o = xe({
      layout: ot({
        delta: i - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n];
  }
  return {
    valueControls: n,
    valueMax: o,
    valueMin: a,
    valueNow: s
  };
}
function lo({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: o,
  id: a,
  style: s,
  ...l
}) {
  const i = vn(a), c = wn({
    disabled: n,
    disableDoubleClick: r
  }), [d, u] = L({}), [f, m] = L("inactive"), [b, p] = L(!1), g = N(null), v = Sn(g, o), {
    disableCursor: S,
    id: P,
    orientation: h,
    registerSeparator: w,
    updateSeparatorProps: A
  } = Pn(), M = h === "horizontal" ? "vertical" : "horizontal";
  De(() => {
    const C = g.current;
    if (C !== null) {
      const I = {
        disabled: c.disabled,
        disableDoubleClick: c.disableDoubleClick,
        element: C,
        id: i
      }, R = w(I), T = Qi(
        (k) => {
          m(
            k.next.state !== "inactive" && k.next.hitRegions.some(
              (U) => U.separator === I
            ) ? k.next.state : "inactive"
          );
        }
      ), E = bn(
        P,
        (k) => {
          const { derivedPanelConstraints: U, layout: B, separatorToPanels: Z } = k.next, te = Z.get(I);
          if (te) {
            const re = te[0], O = te.indexOf(re);
            u(
              Pc({
                layout: B,
                panelConstraints: U,
                panelId: re.id,
                panelIndex: O
              })
            );
          }
        }
      );
      return () => {
        T(), E(), R();
      };
    }
  }, [P, i, w, c]), j(() => {
    A(i, { disabled: n, disableDoubleClick: r });
  }, [n, r, i, A]);
  let F;
  n && !S && (F = "not-allowed");
  let x;
  if (n)
    x = "disabled";
  else
    switch (f) {
      case "active": {
        x = "active";
        break;
      }
      default:
        b ? x = "focus" : x = f;
    }
  return /* @__PURE__ */ y(
    "div",
    {
      ...l,
      "aria-controls": d.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": M,
      "aria-valuemax": d.valueMax,
      "aria-valuemin": d.valueMin,
      "aria-valuenow": d.valueNow,
      children: e,
      className: t,
      "data-separator": x,
      "data-testid": i,
      id: i,
      onBlur: () => p(!1),
      onFocus: () => p(!0),
      ref: v,
      role: "separator",
      style: {
        flexBasis: "auto",
        cursor: F,
        ...s,
        flexGrow: 0,
        flexShrink: 0,
        // Inform the browser that the library is handling touch events for this element
        // See github.com/bvaughn/react-resizable-panels/issues/662
        touchAction: "none"
      },
      tabIndex: n ? void 0 : 0
    }
  );
}
lo.displayName = "Separator";
const Rn = 30, In = 65, at = 50, Rc = 100 - In, Ic = 100 - Rn;
function Tc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(In, Math.max(Rn, t)) : at;
}
function Tn(e) {
  return 100 - e;
}
function Ue(e) {
  return `${e}%`;
}
const En = "reader-document", st = "reader-assistant", uo = "retainpdf.reader.ai-split-layout.v1", Ec = {
  [En]: Tn(at),
  [st]: at
};
function Mn(e) {
  const t = Tc(e == null ? void 0 : e[st]);
  return {
    [En]: Tn(t),
    [st]: t
  };
}
function Mc() {
  try {
    const e = JSON.parse(localStorage.getItem(uo) || "null");
    return Mn(e);
  } catch {
    return Ec;
  }
}
function Ac(e) {
  try {
    localStorage.setItem(uo, JSON.stringify(Mn(e)));
  } catch {
  }
}
function $t(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = Mn(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[st]}vw`
  );
}
function kc() {
  const e = N(null), [t] = L(Mc);
  _e(() => {
    const o = e.current;
    return $t(o, t), () => {
      var a;
      (a = o == null ? void 0 : o.closest(".reader-react-root")) == null || a.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = _((o) => {
    $t(e.current, o);
  }, []), r = _((o, a) => {
    $t(e.current, o), a.isUserInteraction && Ac(o);
  }, []);
  return /* @__PURE__ */ D(
    co,
    {
      id: "reader-ai-split",
      className: "reader-ai-split-resizer",
      elementRef: e,
      orientation: "horizontal",
      defaultLayout: t,
      onLayoutChange: n,
      onLayoutChanged: r,
      resizeTargetMinimumSize: { fine: 12, coarse: 28 },
      children: [
        /* @__PURE__ */ y(
          Xt,
          {
            id: En,
            defaultSize: Ue(Tn(at)),
            minSize: Ue(Rc),
            maxSize: Ue(Ic)
          }
        ),
        /* @__PURE__ */ y(
          lo,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ y("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ y(
          Xt,
          {
            id: st,
            defaultSize: Ue(at),
            minSize: Ue(Rn),
            maxSize: Ue(In)
          }
        )
      ]
    }
  );
}
function fo({
  id: e,
  open: t,
  ariaLabel: n,
  className: r = "",
  keepMounted: o = !1,
  onClose: a,
  toolbar: s,
  children: l
}) {
  return j(() => {
    if (!t) return;
    const i = (c) => {
      var u;
      if (c.key !== "Escape") return;
      const d = c.target;
      (u = d == null ? void 0 : d.closest) != null && u.call(d, "textarea, input, select, [contenteditable='true']") || (c.preventDefault(), a());
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [t, a]), !t && !o ? null : /* @__PURE__ */ D(
    "aside",
    {
      id: e,
      className: `reader-notes-panel reader-notes-panel--workspace${s ? " has-panel-toolbar" : ""} ${r}`.trim(),
      "aria-label": n,
      role: "dialog",
      "aria-modal": "false",
      "data-hidden": t ? void 0 : "",
      inert: t ? void 0 : !0,
      "aria-hidden": t ? void 0 : !0,
      children: [
        s ? /* @__PURE__ */ y("div", { className: "reader-notes-panel-toolbar", children: s }) : null,
        /* @__PURE__ */ y("div", { className: "reader-notes-panel-body", children: l })
      ]
    }
  );
}
function Nc({
  note: e,
  onJump: t,
  onUpdateNote: n,
  onRemove: r
}) {
  const [o, a] = L(!1), [s, l] = L(e.note);
  return j(() => {
    o || l(e.note);
  }, [e.note, o]), /* @__PURE__ */ D("article", { className: "reader-notes-item", children: [
    /* @__PURE__ */ D("div", { className: "reader-notes-item-top", children: [
      /* @__PURE__ */ y("span", { className: "reader-notes-kind", children: e.pane === "translated" ? "译文" : "原文" }),
      /* @__PURE__ */ D("div", { className: "reader-notes-item-actions", children: [
        /* @__PURE__ */ y("button", { type: "button", className: "reader-notes-link", onClick: () => t(e), children: "定位" }),
        /* @__PURE__ */ y("button", { type: "button", className: "reader-notes-danger", onClick: () => r(e.id), children: "删除" })
      ] })
    ] }),
    /* @__PURE__ */ y("p", { className: "reader-notes-quote", children: e.quote }),
    o ? /* @__PURE__ */ D("div", { className: "reader-notes-editor", children: [
      /* @__PURE__ */ y(
        "textarea",
        {
          className: "reader-notes-textarea",
          value: s,
          placeholder: "写点想法…",
          rows: 3,
          onChange: (i) => l(i.target.value)
        }
      ),
      /* @__PURE__ */ D("div", { className: "reader-notes-editor-actions", children: [
        /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            className: "reader-notes-primary",
            onClick: () => {
              n(e.id, s), a(!1);
            },
            children: "保存"
          }
        ),
        /* @__PURE__ */ y("button", { type: "button", className: "reader-notes-link", onClick: () => a(!1), children: "取消" })
      ] })
    ] }) : e.note ? /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        className: "reader-notes-note",
        onClick: () => a(!0),
        title: "点击编辑",
        children: e.note
      }
    ) : /* @__PURE__ */ y("button", { type: "button", className: "reader-notes-add-note", onClick: () => a(!0), children: "添加笔记" })
  ] });
}
function Cc({
  open: e,
  groups: t,
  count: n,
  onClose: r,
  onJump: o,
  onUpdateNote: a,
  onRemove: s,
  onExport: l
}) {
  const [i, c] = L(!1);
  return /* @__PURE__ */ y(
    fo,
    {
      id: "reader-notes-panel",
      open: e,
      ariaLabel: "批注",
      className: "is-pane-right",
      onClose: r,
      toolbar: /* @__PURE__ */ D(It, { children: [
        /* @__PURE__ */ D("span", { className: "reader-notes-count", children: [
          n,
          " 条"
        ] }),
        /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            disabled: i || n === 0,
            onClick: async () => {
              await l() && (c(!0), window.setTimeout(() => c(!1), 1800));
            },
            children: i ? "已复制" : "导出 Markdown"
          }
        )
      ] }),
      children: n === 0 ? /* @__PURE__ */ y("p", { className: "reader-notes-empty", children: "暂无批注。在 PDF 上拖选文字，点「添加批注」。" }) : t.map((d) => /* @__PURE__ */ D("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ D("h3", { className: "reader-notes-group-title", children: [
          "第 ",
          d.page,
          " 页"
        ] }),
        d.items.map((u) => /* @__PURE__ */ y(
          Nc,
          {
            note: u,
            onJump: o,
            onUpdateNote: a,
            onRemove: s
          },
          u.id
        ))
      ] }, d.page))
    }
  );
}
function Lc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = L(!1);
  if (j(() => {
    !e && !t && r(!1);
  }, [e, t]), n || !e && !t)
    return null;
  const o = [
    e ? "译文区域" : "",
    t ? "阅读元数据" : ""
  ].filter(Boolean);
  return /* @__PURE__ */ D("div", { className: "reader-error-notice", role: "status", "data-reader-error-notice": "true", children: [
    /* @__PURE__ */ D("span", { className: "reader-error-notice-text", children: [
      o.join("、"),
      "加载失败，正文仍可正常阅读。"
    ] }),
    /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        className: "reader-error-notice-dismiss",
        "aria-label": "关闭提示",
        onClick: () => r(!0),
        children: "×"
      }
    )
  ] });
}
function xc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ y(Lc, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ D(It, { children: [
    e ? /* @__PURE__ */ y("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ D("div", { className: "reader-boot-loading-card", children: [
      /* @__PURE__ */ y("div", { className: "reader-boot-loading-text", children: n }),
      /* @__PURE__ */ y("div", { className: "reader-boot-loading-track", children: /* @__PURE__ */ y(
        "span",
        {
          className: "reader-boot-loading-bar",
          style: { width: `${Math.max(0, Math.min(100, r))}%` }
        }
      ) })
    ] }) }) : null,
    t ? /* @__PURE__ */ y("div", { className: "reader-react-error", role: "alert", children: n }) : null
  ] });
}
function _c(e) {
  if (e.selectionType !== "region") return null;
  const t = `${e.region.source.text || ""}`.trim(), n = `${e.region.translated.text || ""}`.trim();
  return !t || !n || t === n ? null : { source: t, translated: n };
}
function zc(e, t) {
  const n = e.selectionType === "text" ? "text" : e.kind, r = _c(e), o = r != null, a = o && t ? t : e.pane, s = r ? r[a] : e.selectionType === "text" ? e.quote : Sr(e.region, a), l = e.selectionType === "region" ? jt(e.region, a).page : e.page;
  return {
    kind: n,
    pane: a,
    page: l,
    text: s,
    copyValue: n === "formula" ? Lo(s) : s,
    canSwitch: o,
    showPeek: o && a !== e.pane
  };
}
const fr = {
  source: "原文",
  translated: "译文"
}, mr = 190, pr = 16;
function Dc() {
  const e = typeof window > "u" ? 800 : window.innerWidth;
  if (typeof document > "u") return e;
  const t = document.querySelector(`.${Ar}`), n = (t == null ? void 0 : t.getBoundingClientRect().width) ?? 0;
  return n > 0 ? n : e;
}
function Fc(e, t) {
  const n = pr + mr, r = t - pr - mr;
  return r < n ? t / 2 : Math.min(Math.max(n, e), r);
}
async function Oc(e) {
  var o;
  const t = `${e || ""}`;
  if (!t) throw new Error("empty selection");
  try {
    if ((o = navigator.clipboard) != null && o.writeText) {
      await navigator.clipboard.writeText(t);
      return;
    }
  } catch {
  }
  const n = document.createElement("textarea");
  n.value = t, n.setAttribute("readonly", ""), n.style.position = "fixed", n.style.opacity = "0", document.body.appendChild(n), n.select();
  const r = document.execCommand("copy");
  if (n.remove(), !r) throw new Error("copy failed");
}
function $c({
  selection: e,
  onDismiss: t,
  onAskAi: n,
  onAddNote: r
}) {
  const [o, a] = L(!1), [s, l] = L(null), i = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if (j(() => l(null), [i]), j(() => a(!1), [i, s]), !e)
    return null;
  const c = zc(e, s), d = typeof window < "u" ? window.innerHeight : 600, u = e.rect.left + e.rect.width / 2, f = Fc(u, Dc()), m = e.rect.top > (c.showPeek ? 220 : 72), b = m ? Math.max(12, e.rect.top - 8) : Math.min(d - 12, e.rect.top + e.rect.height + 8), p = m ? "above" : "below", g = c.kind, v = g === "formula" ? "公式" : g === "table" ? "表格" : g === "figure" ? "图片" : g === "text" ? "文字" : "区域", S = c.copyValue, P = g === "formula" ? Vo : g === "table" ? qo : g === "text" ? Ko : Go;
  return /* @__PURE__ */ D(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${p} reader-sel-pop--region`,
      style: { left: f, top: b },
      role: "toolbar",
      "aria-label": "选区操作",
      onPointerDown: (h) => {
        h.preventDefault();
      },
      children: [
        /* @__PURE__ */ D("div", { className: "reader-sel-pop-card reader-floating-surface", children: [
          /* @__PURE__ */ D("div", { className: "reader-sel-pop-row", children: [
            /* @__PURE__ */ D("div", { className: "reader-sel-pop-context", children: [
              /* @__PURE__ */ y(P, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
              /* @__PURE__ */ y("span", { children: v }),
              /* @__PURE__ */ y("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
              c.canSwitch ? /* @__PURE__ */ y("span", { className: "reader-sel-pop-panes", role: "group", "aria-label": "看这段的原文或译文", children: ["source", "translated"].map((h) => /* @__PURE__ */ y(
                "button",
                {
                  type: "button",
                  className: `reader-sel-pop-pane${c.pane === h ? " is-active" : ""}`,
                  "aria-pressed": c.pane === h,
                  onClick: () => l(h),
                  children: fr[h]
                },
                h
              )) }) : (
                // 两侧拿不到各自的文本时不画开关 —— 画一个点了不动的按钮比没有更糟。
                /* @__PURE__ */ y("span", { children: fr[e.pane] })
              ),
              /* @__PURE__ */ y("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
              /* @__PURE__ */ D("span", { children: [
                c.page,
                " 页"
              ] })
            ] }),
            /* @__PURE__ */ D("div", { className: "reader-sel-pop-actions", children: [
              S ? /* @__PURE__ */ D(
                "button",
                {
                  type: "button",
                  className: "reader-sel-pop-btn reader-sel-pop-btn--primary",
                  onClick: async () => {
                    try {
                      await Oc(S), a(!0), window.setTimeout(() => a(!1), 1400);
                    } catch (h) {
                      console.warn("[reader-selection] copy failed", h);
                    }
                  },
                  children: [
                    o ? /* @__PURE__ */ y(Zo, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ y(Yo, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                    /* @__PURE__ */ y("span", { children: o ? "已复制" : g === "formula" ? "复制 LaTeX" : "复制" })
                  ]
                }
              ) : /* @__PURE__ */ y("span", { className: "reader-sel-pop-selection-hint", children: "已选择图片" }),
              r && S ? /* @__PURE__ */ D(
                "button",
                {
                  type: "button",
                  className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                  onClick: () => r({ page: c.page, pane: c.pane, quote: S }),
                  children: [
                    /* @__PURE__ */ y(Ir, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                    /* @__PURE__ */ y("span", { children: "添加批注" })
                  ]
                }
              ) : null,
              n ? (
                // 问 AI 交的是原选区，不跟着上面的切换走：askSelectedRegion 会把
                // 文档切到选区所在那一栏，跟着切等于人只想瞄一眼原文，阅读位置却
                // 被搬走了。
                /* @__PURE__ */ D(
                  "button",
                  {
                    type: "button",
                    className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                    onClick: () => n(e),
                    children: [
                      /* @__PURE__ */ y(Tr, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                      /* @__PURE__ */ y("span", { children: "问 AI" })
                    ]
                  }
                )
              ) : null,
              /* @__PURE__ */ y(
                "button",
                {
                  type: "button",
                  className: "reader-sel-pop-btn reader-sel-pop-btn--ghost",
                  onClick: t,
                  "aria-label": "取消选区",
                  title: "取消",
                  children: /* @__PURE__ */ y(sn, { size: 15, strokeWidth: 2.5, "aria-hidden": !0 })
                }
              )
            ] })
          ] }),
          c.showPeek ? (
            // 只在看「另一栏」时展开：看的就是页面上那一栏时再抄一遍是噪声。
            /* @__PURE__ */ y("p", { className: "reader-sel-pop-peek", "data-reader-peek-pane": c.pane, children: c.text })
          ) : null
        ] }),
        /* @__PURE__ */ y("span", { className: "reader-sel-pop-caret", "aria-hidden": "true" })
      ]
    }
  );
}
function jc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Uc() {
  const [e, t] = L(!1), n = br(), r = N(null);
  return j(() => {
    if (!e) return;
    const o = (s) => {
      const l = r.current;
      l && s.target instanceof Node && !l.contains(s.target) && t(!1);
    }, a = (s) => {
      s.key === "Escape" && (s.preventDefault(), t(!1));
    };
    return document.addEventListener("mousedown", o), window.addEventListener("keydown", a), () => {
      document.removeEventListener("mousedown", o), window.removeEventListener("keydown", a);
    };
  }, [e]), j(() => {
    const o = (a) => {
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || jc(a.target)) return;
      const s = a.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !a.shiftKey)
          return;
        a.preventDefault(), t((l) => !l);
      }
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, []), /* @__PURE__ */ D("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
    /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        className: `reader-react-hud-btn reader-react-shortcuts-btn${e ? " is-active" : ""}`,
        "aria-label": "快捷键说明",
        "aria-expanded": e,
        "aria-controls": n,
        title: "快捷键（H 或 ?）",
        onClick: () => t((o) => !o),
        children: /* @__PURE__ */ y(Xo, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    ),
    e ? /* @__PURE__ */ D(
      "div",
      {
        id: n,
        className: "reader-react-shortcuts-panel reader-floating-surface",
        role: "dialog",
        "aria-label": "阅读器快捷键",
        children: [
          /* @__PURE__ */ D("div", { className: "reader-react-shortcuts-head", children: [
            /* @__PURE__ */ y("strong", { children: "快捷键" }),
            /* @__PURE__ */ y(
              "button",
              {
                type: "button",
                className: "reader-react-shortcuts-close reader-floating-close",
                "aria-label": "关闭",
                onClick: () => t(!1),
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ y("div", { className: "reader-react-shortcuts-body", children: qs.map((o) => /* @__PURE__ */ D("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ y("h3", { children: o.title }),
            /* @__PURE__ */ y("ul", { children: o.items.map((a) => /* @__PURE__ */ D("li", { children: [
              /* @__PURE__ */ y("kbd", { children: a.keys }),
              /* @__PURE__ */ y("span", { children: a.desc })
            ] }, `${o.title}-${a.keys}`)) })
          ] }, o.title)) }),
          /* @__PURE__ */ y("p", { className: "reader-react-shortcuts-foot", children: "在输入框内不会触发快捷键" })
        ]
      }
    ) : null
  ] });
}
const Bc = ["source", "sideBySide", "translated"], Hc = { source: "", translated: "", sideBySide: "" };
function Jc(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = vt(e.sourceUrl), n = vt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return pa({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function Wc(e) {
  const [t, n] = L(() => /* @__PURE__ */ new Set()), r = V(
    () => e ? Jc(e) : Hc,
    [e]
  ), o = V(
    () => Bc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = _(async (s) => {
    if (!e) return;
    const l = vt(r[s]);
    if (!(!l || t.has(s)))
      try {
        const i = e.jobId ? ma(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await ha(
          e.fetchProtected,
          l,
          i,
          i,
          null,
          (c) => n((d) => {
            const u = new Set(d);
            return c ? u.add(s) : u.delete(s), u;
          })
        );
      } catch (i) {
        const c = i instanceof Error ? i.message : "下载失败";
        ga(c), n((d) => {
          const u = new Set(d);
          return u.delete(s), u;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const Vc = {
  source: wr,
  sideBySide: Pr,
  translated: Rr
}, qc = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function Kc(e) {
  const t = ct(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = Wc(n);
  return /* @__PURE__ */ y("div", { className: "reader-download-actions", role: "group", "aria-label": "下载 PDF", children: o.map((l) => {
    const i = Ro[l], c = vt(r[l]), d = a.has(l), u = !!c && !d, f = u ? "" : Io(l, r), m = Vc[l];
    return (
      // 外面这层 span 是为了**让「为什么点不动」这句话真的弹得出来**。
      //
      // disabled 的按钮在主流浏览器上不派发鼠标事件，挂在它自己身上的
      // title 永远不显示 —— 原因只有读屏拿得到（aria-label 还在），鼠标
      // 用户看到的就是一个灰掉的按钮。窄屏（≤900px）下文字标签还会被裁成
      // 1px 只留图标，那时连「这是哪一路」都没了。
      // span 不是 disabled，hover 照样触发。
      /* @__PURE__ */ y(
        "span",
        {
          className: "reader-download-action-slot",
          title: u ? `下载${i.label}` : f,
          children: /* @__PURE__ */ D(
            "button",
            {
              type: "button",
              id: `reader-download-${l}`,
              className: `reader-download-action${d ? " is-busy" : ""}`,
              disabled: !u,
              "aria-label": u ? `下载${i.label}` : f,
              onClick: () => void s(l),
              children: [
                /* @__PURE__ */ y(m, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
                /* @__PURE__ */ y("span", { className: "reader-download-action-label", children: qc[l] })
              ]
            }
          )
        },
        l
      )
    );
  }) });
}
function Gc(e) {
  const t = ct(), n = ki(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? it, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), l = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, c = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), d = Xa(a), u = a > Nr + 1e-3, f = a < Cr - 1e-3, m = Qe(), b = "50%（半屏，对照铺满）", [p, g] = L(!1), [v, S] = L(`${l}`);
  j(() => {
    p || S(`${Math.min(Math.max(l, 1), Math.max(i, 1))}`);
  }, [l, i, p]);
  const P = () => {
    if (g(!1), !c || i <= 0)
      return;
    const h = Number(`${v}`.trim());
    c(Pt(h, i));
  };
  return /* @__PURE__ */ D("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    o ? /* @__PURE__ */ y("div", { className: "reader-react-hud-group reader-react-hud-modes", children: o }) : null,
    /* @__PURE__ */ y("div", { className: "reader-react-hud-group", "aria-label": "页码", children: p ? /* @__PURE__ */ D(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (h) => {
          h.preventDefault(), P();
        },
        children: [
          /* @__PURE__ */ y(
            "input",
            {
              className: "reader-react-hud-page-input",
              type: "text",
              inputMode: "numeric",
              pattern: "[0-9]*",
              "aria-label": "跳转到页码",
              value: v,
              autoFocus: !0,
              onChange: (h) => S(h.target.value.replace(/[^\d]/g, "")),
              onBlur: P,
              onKeyDown: (h) => {
                h.key === "Escape" && (h.preventDefault(), g(!1), S(`${l}`));
              }
            }
          ),
          /* @__PURE__ */ D("span", { className: "reader-react-hud-page-suffix", children: [
            "/ ",
            i || "—"
          ] })
        ]
      }
    ) : /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        className: "reader-react-hud-page reader-react-hud-page-btn",
        "aria-label": i > 0 ? `跳转页码，当前第 ${l} 页，共 ${i} 页` : "页码",
        title: i > 0 ? "点击输入页码跳转" : void 0,
        disabled: !c || i <= 0,
        onClick: () => {
          !c || i <= 0 || (S(`${l}`), g(!0));
        },
        children: i > 0 ? `${Math.min(l, i)} / ${i}` : "—"
      }
    ) }),
    /* @__PURE__ */ D("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ y(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "缩小",
          disabled: !u,
          onClick: () => s(rt(a, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ D(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn reader-react-hud-zoom-label",
          "aria-label": `重置为${b}`,
          title: b,
          onClick: () => s(m),
          children: [
            d,
            "%"
          ]
        }
      ),
      /* @__PURE__ */ y(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "放大",
          disabled: !f,
          onClick: () => s(rt(a, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ y("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ y(Uc, {}) })
  ] });
}
function Rt(e) {
  const t = `${e.documentId || ""}`.trim();
  if (t)
    return `${yt}doc:${t}`;
  const n = `${e.jobId || ""}`.trim();
  return n ? `${yt}job:${n}` : `${yt}anonymous`;
}
const yt = "retainpdf.reader.notes.v1:";
function Zc(e) {
  const t = `${e.jobId || ""}`.trim();
  if (!t)
    return [];
  const n = `${yt}job:${t}`;
  return n === Rt(e) ? [] : [n];
}
function Yc() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Xc(e) {
  return {
    pageIdx: Number(e.page) - 1,
    quoteText: e.quote,
    note: e.note,
    createdAt: e.createdAt
  };
}
function mo(e) {
  return zo(e, (t) => t.page);
}
function Qc(e) {
  return Fo(e, (t) => t.page).map((t) => ({ page: t.pageIdx, items: t.items }));
}
function el(e, t) {
  return Do({
    title: e,
    annotations: t.map(Xc)
  });
}
function tl(e) {
  if (!e)
    return [];
  try {
    const t = JSON.parse(e);
    return Array.isArray(t) ? t.map((n) => ({
      id: `${(n == null ? void 0 : n.id) || ""}`.trim(),
      page: Math.max(1, Math.floor(Number(n == null ? void 0 : n.page) || 1)),
      pane: (n == null ? void 0 : n.pane) === "translated" ? "translated" : "source",
      quote: `${(n == null ? void 0 : n.quote) || ""}`.trim(),
      note: `${(n == null ? void 0 : n.note) || ""}`.trim(),
      createdAt: `${(n == null ? void 0 : n.createdAt) || ""}`.trim() || (/* @__PURE__ */ new Date()).toISOString()
    })).filter((n) => n.id && n.quote) : [];
  } catch {
    return [];
  }
}
function Qt(e) {
  try {
    return tl(localStorage.getItem(e));
  } catch {
    return [];
  }
}
function nl(...e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const r of n)
      t.has(r.id) || t.set(r.id, r);
  return mo([...t.values()]);
}
function rl(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch (r) {
    return console.warn("[reader-notes] persist failed", r), !1;
  }
  const n = new Set(Qt(e).map((r) => r.id));
  return t.every((r) => n.has(r.id));
}
function hr(e) {
  if (typeof localStorage > "u")
    return [];
  const t = Rt(e), n = Qt(t), r = Zc(e).map((a) => ({ key: a, notes: Qt(a) })).filter((a) => a.notes.length > 0);
  if (r.length === 0)
    return n;
  const o = nl(n, ...r.map((a) => a.notes));
  if (!rl(t, o))
    return o;
  for (const a of r)
    try {
      localStorage.removeItem(a.key);
    } catch {
    }
  return o;
}
function ol(e, t) {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.setItem(e, JSON.stringify(t));
    } catch (n) {
      console.warn("[reader-notes] persist failed", n);
    }
}
function al(e, t = {}) {
  const n = V(
    () => ({
      jobId: `${e.jobId || ""}`.trim(),
      documentId: `${e.documentId || ""}`.trim()
    }),
    [e.jobId, e.documentId]
  ), [r, o] = L(() => ({
    key: Rt(n),
    notes: hr(n)
  })), a = r.notes, s = _(
    (b) => {
      o((p) => ({
        key: p.key,
        notes: typeof b == "function" ? b(p.notes) : b
      }));
    },
    []
  ), l = t.onAfterAdd, i = Rt(n);
  j(() => {
    o((b) => b.key === i ? b : { key: i, notes: hr(n) });
  }, [n, i]), j(() => {
    ol(r.key, r.notes);
  }, [r]);
  const c = _((b) => {
    const p = `${b.quote || ""}`.trim();
    if (!p)
      return null;
    const g = {
      id: Yc(),
      page: Math.max(1, Math.floor(Number(b.page) || 1)),
      pane: b.pane === "translated" ? "translated" : "source",
      quote: p,
      note: `${b.note || ""}`.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s((v) => mo([g, ...v])), l == null || l(), g;
  }, [l]), d = _((b, p) => {
    const g = `${p || ""}`.trim();
    s((v) => v.map((S) => S.id === b ? { ...S, note: g } : S));
  }, []), u = _((b) => {
    s((p) => p.filter((g) => g.id !== b));
  }, []), f = _(async (b = "") => {
    var g, v;
    const p = el(b, a);
    try {
      return await ((v = (g = navigator.clipboard) == null ? void 0 : g.writeText) == null ? void 0 : v.call(g, p)), !0;
    } catch (S) {
      return console.error("[reader-notes] copy failed", S), !1;
    }
  }, [a]), m = V(() => Qc(a), [a]);
  return {
    notes: a,
    groups: m,
    addFromQuote: c,
    updateNote: d,
    remove: u,
    exportMarkdown: f,
    count: a.length
  };
}
function gr(e) {
  var t, n, r, o;
  return _r(e == null ? void 0 : e.assistantPanel) ? e.assistantPanel : ((t = e == null ? void 0 : e.splitLayout) == null ? void 0 : t.left) === "ai" || ((n = e == null ? void 0 : e.splitLayout) == null ? void 0 : n.right) === "ai" ? "ai" : ((r = e == null ? void 0 : e.splitLayout) == null ? void 0 : r.left) === "markdown" || ((o = e == null ? void 0 : e.splitLayout) == null ? void 0 : o.right) === "markdown" ? "markdown" : null;
}
function sl(e) {
  const [t, n] = L(() => ({
    scope: e,
    panel: gr(Re(e))
  }));
  j(() => {
    n((o) => o.scope === e ? o : {
      scope: e,
      panel: gr(Re(e))
    });
  }, [e]), j(() => {
    t.scope === e && At(t.scope, {
      assistantPanel: t.panel,
      // 旧的自由两栏布局已经没有写入者了，恢复时只当迁移来源读一次。
      splitLayout: null
    });
  }, [t, e]);
  const r = _((o) => {
    n((a) => ({
      scope: a.scope,
      panel: typeof o == "function" ? o(a.panel) : o
    }));
  }, []);
  return { panel: t.panel, scope: t.scope, setPanel: r };
}
const en = "download-toast";
function il({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: o = "progress"
}) {
  const a = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ D("div", { className: "download-toast-card reader-floating-surface", "data-tone": o, "aria-live": "polite", children: [
    /* @__PURE__ */ D("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ y("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ y("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ y("div", { className: "download-toast-track", children: /* @__PURE__ */ y("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${a}%` } }) }),
    /* @__PURE__ */ y("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function cl(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: o = "等待响应...",
    percent: a = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    Ut.dismiss(en);
    return;
  }
  Ut.custom(
    () => /* @__PURE__ */ y(il, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: en, duration: 1 / 0 }
  );
}
function ll() {
  const e = _((t) => {
    t && (t.setState = cl, t.hide = () => Ut.dismiss(en));
  }, []);
  return /* @__PURE__ */ D(It, { children: [
    /* @__PURE__ */ y(Oo, { position: "bottom-right" }),
    /* @__PURE__ */ y("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function po(e) {
  const t = N(!1);
  return e && (t.current = !0), t.current;
}
function gt(e, t) {
  const n = e === t;
  return { open: n, mounted: po(n) };
}
function dl({
  panel: e,
  active: t,
  context: n
}) {
  var i, c;
  const r = t === e.id, o = po(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = ae(), l = e.slot === "terminal" ? (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, {
    open: r,
    sessionKey: n.sessionKey,
    onClose: n.onClose
  }) : (c = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : c.call(s, {
    open: r,
    jobId: n.jobId,
    onJump: n.onJump,
    onClose: n.onClose
  });
  return l == null ? null : /* @__PURE__ */ y(
    fo,
    {
      id: `reader-${e.id}-panel`,
      open: r,
      ariaLabel: e.ariaLabel,
      keepMounted: e.keepMounted,
      className: "is-pane-right",
      onClose: n.onClose,
      children: l
    }
  );
}
const ul = an(() => import("./ReaderFavoritesPanel-CtEn-K5B.js").then((e) => ({ default: e.ReaderFavoritesPanel }))), fl = an(() => import("./ReaderMarkdownPanel-C8jlqFqz.js").then((e) => ({ default: e.ReaderMarkdownPanel }))), ml = an(() => import("./ReaderAiPanel-kok-ar52.js").then((e) => ({ default: e.ReaderAiPanel })));
function pl(e) {
  const t = e.sourceOnly || !e.translatedUrl, n = !!(e.overlayContentAvailable && e.liveTranslationVisible && !e.assistantOpen), o = e.assistantPdfPane || (e.assistantOpen && e.mode === "compare" ? "source" : e.mode), a = o === "compare", s = n || o !== "translated", l = o === "translated" || o === "compare", i = e.mode === "compare" && o !== "compare";
  return {
    kind: n ? "live-overlay" : o === "compare" ? "final-compare" : o === "translated" ? "translated-only" : "source-only",
    visibleMode: o,
    compareMode: a,
    showSource: s,
    showTranslated: l,
    overlayOnSource: n,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: t,
    compareDegradedByAssistant: i
  };
}
function hl(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function gl(e) {
  return e ?? "notes";
}
function bl() {
  const e = Ws(), { boot: t, panes: n, sessionFiles: r, session: o } = e, a = sl(e.viewStateKey), s = a.panel, l = a.setPanel, [i, c] = L(null), [d, u] = L(null), [f, m] = L(!1), b = N(null), p = s !== null, g = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, v = pl({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: g,
    liveTranslationVisible: f,
    assistantOpen: p,
    assistantPdfPane: i
  }), S = v.sourceViewOnly, P = v.visibleMode, h = _(() => l(gl), []), w = al(
    { jobId: o.jobId, documentId: o.documentId },
    { onAfterAdd: h }
  ), A = _(($) => {
    w.addFromQuote($), e.clearSelection();
  }, [w.addFromQuote, e.clearSelection]), M = _(($) => {
    e.goToPage($.page, $.pane === "translated" ? "translated" : "source");
  }, [e.goToPage]), F = _(
    () => w.exportMarkdown(o.title || ""),
    [w.exportMarkdown, o.title]
  );
  j(() => {
    u(null), m(!1);
  }, [e.viewStateKey]), j(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), j(() => {
    c(null);
  }, [a.scope]), j(() => {
    if (!(t.loading || t.failed)) {
      if (b.current !== e.viewStateKey) {
        b.current = e.viewStateKey;
        const $ = Re(e.viewStateKey), W = S ? "source" : $ == null ? void 0 : $.mode;
        W && W !== e.mode && e.setModeKeepingPage(W);
        return;
      }
      At(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, S]);
  const x = s || (e.mode === "compare" ? "compare" : "reading"), C = gt(s, "favorites"), I = gt(s, "markdown"), R = gt(s, "ai"), T = gt(s, "notes");
  Zs({
    mode: P,
    sourceOnly: e.sourceOnly,
    setMode: e.setModeKeepingPage,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    currentPage: e.currentPage,
    numPages: n.hudNumPages,
    goToPage: e.goToPage,
    enabled: e.showHud
  });
  const E = _(() => {
    l(null), c(null), u(null);
  }, []), k = _(($) => {
    const W = P === "translated" ? "translated" : "source";
    e.jumpToAnchor($, W);
  }, [e.jumpToAnchor, P]), U = _(($) => {
    o.refreshCommittedDocument($);
  }, [o.refreshCommittedDocument]), B = _(($) => {
    c(null);
    const W = hl($, e.liveTranslationAvailable);
    W !== null && m(W), e.setModeKeepingPage($);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), Z = V(() => !g || !v.showSource ? null : /* @__PURE__ */ y(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m(($) => !$),
      "aria-pressed": f,
      title: f ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ), [g, v.showSource, f]), te = _(($) => {
    l($), $ !== "ai" && u(null);
  }, []);
  j(() => {
  }, [o.jobId]);
  const re = V(() => ({
    jobId: o.jobId,
    sessionKey: o.jobId || o.documentId || "reader",
    onJump: k,
    onClose: E
  }), [E, k, o.documentId, o.jobId]), O = _(($) => {
    const W = $.pane === "translated" && !S ? "translated" : "source";
    u($), l("ai"), c(W), e.clearSelection();
  }, [e.clearSelection, S]), Y = V(() => ({
    bindShell: e.shell.bindShell,
    shellEl: e.shell.shellEl,
    shellWidth: e.shell.shellWidth,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    rowHeights: e.rowHeights,
    mountSource: e.panes.mountSource,
    mountTranslated: e.panes.mountTranslated,
    onMetrics: e.panes.onMetrics,
    onNumPagesChange: e.panes.onNumPages,
    sourceUrl: e.sessionFiles.sourceUrl,
    translatedUrl: e.sessionFiles.translatedUrl,
    sourceFile: e.sessionFiles.sourceFile,
    translatedFile: e.sessionFiles.translatedFile,
    regions: o.regions,
    readerMetadata: o.readerMetadata,
    activeRegion: e.activeRegion,
    onSelectRegion: e.selectRegion,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: S,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: te, close: E }
  }), [
    e.shell,
    e.userZoom,
    e.onZoomChange,
    e.rowHeights,
    e.panes,
    e.sessionFiles,
    o.regions,
    o.readerMetadata,
    e.activeRegion,
    e.selectRegion,
    e.sourceOnly,
    S,
    e.download,
    e.goToPage,
    te,
    E
  ]), ce = V(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), ne = [
    Wa,
    `is-workspace-${x}`,
    p ? "is-assistant-open" : "",
    v.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ y(Ai, { value: Y, hud: ce, children: /* @__PURE__ */ D("div", { className: ne, "data-reader-engine": "react-pdf", "data-reader-workspace": x, children: [
    /* @__PURE__ */ y(xc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ D("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ y(Kc, {}),
      /* @__PURE__ */ y(ni, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ y(
      Fi,
      {
        mode: P,
        documentReady: !!o.jobId,
        sourceViewOnly: S,
        onModeChange: B,
        liveTranslation: g ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m(($) => !$)
        } : null,
        compareDegraded: v.compareDegradedByAssistant,
        onRestoreCompare: E
      }
    ),
    /* @__PURE__ */ y(
      Hi,
      {
        active: s,
        badges: { notes: w.count }
      }
    ),
    p ? /* @__PURE__ */ y(kc, {}) : null,
    /* @__PURE__ */ y(xi, { paneComposition: v, markdownSplit: I.open, assistantSplit: p, liveTranslation: e.liveTranslation, sourcePaneAction: Z }),
    e.showHud ? /* @__PURE__ */ y(
      Gc,
      {
        mode: P,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ D(vo, { fallback: null, children: [
      C.mounted ? /* @__PURE__ */ y(ul, { open: C.open, jobId: o.jobId, documentId: o.documentId, onClose: E, onJumpPage: e.goToPage }) : null,
      Vr.map(($) => /* @__PURE__ */ y(
        dl,
        {
          panel: $,
          active: s,
          context: re
        },
        $.id
      )),
      I.mounted ? /* @__PURE__ */ y(fl, { open: I.open, jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: E }) : null,
      R.mounted ? /* @__PURE__ */ y(ml, { open: R.open, jobId: o.jobId, documentId: o.documentId, sessionIdentity: o.sessionIdentity, side: "right", selectionContext: d, onClearSelectionContext: () => u(null), onClose: E, onJumpCitation: k, onDocumentCommitted: U }, o.documentId || o.jobId || "reader-ai-pending") : null
    ] }),
    /* @__PURE__ */ y(
      Cc,
      {
        open: T.open,
        groups: w.groups,
        count: w.count,
        onClose: E,
        onJump: M,
        onUpdateNote: w.updateNote,
        onRemove: w.remove,
        onExport: F
      }
    ),
    /* @__PURE__ */ y($c, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: O, onAddNote: A }),
    /* @__PURE__ */ y(ll, {})
  ] }) });
}
function Bl() {
  return /* @__PURE__ */ y(bl, {});
}
export {
  ln as A,
  Bl as R,
  bl as a,
  fo as b,
  Ul as c,
  _l as d,
  xl as e,
  jl as f,
  Dl as g,
  zl as h,
  Fl as i,
  $l as j,
  Ol as r
};
//# sourceMappingURL=ReaderApp-BD_wgwnY.js.map
