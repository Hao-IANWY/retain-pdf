var $n = (e) => {
  throw TypeError(e);
};
var jn = (e, t, n) => t.has(e) || $n("Cannot " + n);
var nt = (e, t, n) => (jn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Un = (e, t, n) => t.has(e) ? $n("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Bn = (e, t, n, r) => (jn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as C, jsx as h, Fragment as Ot } from "react/jsx-runtime";
import { useMemo as V, useState as L, useEffect as O, useCallback as A, useRef as x, useLayoutEffect as $e, memo as un, forwardRef as Mo, useImperativeHandle as fn, createContext as mn, useContext as hn, useSyncExternalStore as ko, useId as pn, Suspense as Ao, lazy as gn } from "react";
import { requireAdapter as we, getReaderAdapters as ce } from "./adapters.js";
import { resolveReaderDownloadName as No, createReaderServerFavoritesPort as xo, resolveReaderDownloadUrls as Lo, READER_PROGRESS_COPY as Re, trimString as ut, READER_DOWNLOAD_ACTIONS as Co, disabledReason as _o } from "./runtime/state.js";
import { d as Do } from "./ask-answerer-GNQdzitl.js";
import "@retainpdf/api/conversations";
import { r as zo, b as Oo } from "./page-config-Ct7qR5rm.js";
import { c as Fo, n as $o, f as Mt, h as Hn, a as jo, b as Uo, i as Ar, p as yt, g as Nr, r as xr, j as Ut, e as Bo } from "./reader-regions-DsePY7B_.js";
import { i as Ho, c as Wo } from "./live-translation-CbniFg2b.js";
import { sortByPageAndCreatedAt as Jo, buildAnnotationsMarkdown as Ko, groupByPageAndCreatedAt as qo } from "./runtime/content.js";
import { toast as Yt, Toaster as Vo } from "sonner";
import { X as et, Radio as Go, FileText as Lr, Columns2 as Cr, Languages as _r, SquareTerminal as Yo, PenTool as Zo, Route as Xo, FileCode2 as Dr, Sparkles as bn, GripHorizontal as Qo, StickyNote as Ft, Sigma as ea, Table2 as ta, Type as na, Image as ra, Check as oa, Copy as aa, Keyboard as sa, Download as ia, Bookmark as ca } from "lucide-react";
import { pdfjs as la, Page as da, Document as ua } from "react-pdf";
import { e as fa, m as ma, a as ha } from "./markdown-math-XkF5urpn.js";
const pa = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, ga = "", ba = Object.freeze({
  progress: "retainpdf-reader-progress"
}), ya = (e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, dd = (...e) => {
  var n;
  return (((n = ce()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Te = () => we("defaultReaderDataPort"), Wn = () => we("defaultReaderPageConfigPort"), ud = {
  get apiPrefix() {
    return Te().apiPrefix;
  },
  fetchProtected: (...e) => Te().fetchProtected(...e),
  loadMarkdownPayload: (e) => Te().loadMarkdownPayload(e),
  loadMarkdownSource: (e) => Te().loadMarkdownSource(e),
  loadMarkdownRange: (e, t, n, r, a) => Te().loadMarkdownRange(e, t, n, r, a),
  loadJobPayload: (e) => Te().loadJobPayload(e),
  loadReaderPayload: (e, t) => Te().loadReaderPayload(e, t),
  loadAiNotes: (e) => Te().loadAiNotes(e),
  get liveTranslation() {
    return Te().liveTranslation;
  }
}, zr = {
  messageTargetOrigin: () => Wn().messageTargetOrigin(),
  readerJobId: () => Wn().readerJobId()
}, va = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.liveTranslation) ?? null;
}, ft = () => {
  var t;
  const e = ce();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, yn = () => {
  const e = ce();
  if (e != null && e.sessionData) return e.sessionData;
  const t = e == null ? void 0 : e.defaultReaderDataPort;
  if (!t) throw new Error("Reader adapter missing: defaultReaderDataPort (call setReaderAdapters)");
  return {
    loadReaderPayload: t.loadReaderPayload,
    loadJobPayload: t.loadJobPayload,
    fetchDocumentByJobId: (...n) => we("fetchDocumentByJobId")(...n),
    fetchProtected: t.fetchProtected,
    resolveResourceUrl: e.resolveResourceUrl ?? ((n) => n),
    resolveReaderSourcePdf: (n) => {
      var r;
      return ((r = e.resolveReaderSourcePdf) == null ? void 0 : r.call(e, n)) ?? null;
    },
    resolveReaderTranslatedPdfUrl: (n, r) => {
      var a;
      return ((a = e.resolveReaderTranslatedPdfUrl) == null ? void 0 : a.call(e, n, r)) ?? "";
    },
    resolveReaderArtifactUrl: (n) => {
      var r;
      return ((r = e.resolveReaderArtifactUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, fd = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.aiOperations) ?? null;
}, md = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.conversations) ?? null;
}, hd = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.askChat) ?? null;
}, wa = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, Sa = () => {
  var e, t;
  return ((t = (e = ce()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, Pa = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, Ia = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? No(...e);
}, Ra = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? Lo(...e);
}, Ta = (...e) => we("downloadProtectedResource")(...e), Ea = (...e) => we("failDownloadToast")(...e), pd = (e, t) => we("resolveMarkdownAssetUrl")(e, t), gd = (e = {}) => {
  const t = ce();
  return Do({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) || "/api/v1",
    ask: t == null ? void 0 : t.askDocumentAi,
    documentByJobId: t == null ? void 0 : t.fetchDocumentByJobId,
    ...e
  });
}, vn = "/api/v1", bd = (e = vn, t = {}) => {
  var n;
  return we("fetchFavorites")(
    ((n = ce()) == null ? void 0 : n.apiPrefix) ?? e,
    t
  );
};
function yd(e = {}) {
  const t = ce();
  return xo({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) ?? vn,
    documentByJobId: (...n) => we("fetchDocumentByJobId")(...n),
    submitFavorite: (...n) => we("createFavorite")(...n),
    loadFavorites: (...n) => we("fetchFavorites")(...n),
    removeFavorite: (...n) => we("deleteFavorite")(...n),
    ...e
  });
}
function Ma() {
  const e = () => {
    var r;
    return zo(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = L(e);
  return O(() => {
    var l, c, i, d;
    const r = () => n(e()), a = (c = (l = globalThis.history) == null ? void 0 : l.pushState) == null ? void 0 : c.bind(globalThis.history), o = (d = (i = globalThis.history) == null ? void 0 : i.replaceState) == null ? void 0 : d.bind(globalThis.history);
    let s = !1;
    if (a && o)
      try {
        const u = (f) => function(...m) {
          const v = f.apply(this, m);
          return r(), globalThis.dispatchEvent(new Event("pushstate")), globalThis.dispatchEvent(new Event("replacestate")), globalThis.dispatchEvent(new Event("locationchange")), v;
        };
        globalThis.history.pushState = u(a), globalThis.history.replaceState = u(o), s = !0;
      } catch {
      }
    return window.addEventListener("popstate", r), window.addEventListener("hashchange", r), window.addEventListener("pushstate", r), window.addEventListener("replacestate", r), window.addEventListener("locationchange", r), () => {
      if (window.removeEventListener("popstate", r), window.removeEventListener("hashchange", r), window.removeEventListener("pushstate", r), window.removeEventListener("replacestate", r), window.removeEventListener("locationchange", r), s && a && o)
        try {
          globalThis.history.pushState = a, globalThis.history.replaceState = o;
        } catch {
        }
    };
  }, []), t;
}
function ka() {
  const e = Ma(), t = V(() => Pa(zr), [e]), n = V(() => Sa(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function Aa(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: a,
    documentIdRef: o,
    sessionJobIdRef: s,
    switchToSourceMode: l
  } = e, [c, i] = L({
    documentId: "",
    jobId: ""
  }), [d, u] = L({
    documentId: "",
    jobId: ""
  }), f = c.documentId === t ? c.jobId : "", m = d.documentId === t ? d.jobId : "", v = n || f, [p, g] = L({
    jobId: "",
    documentId: ""
  }), y = p.jobId === v ? p.documentId : "", P = t || y, w = !!t && !v, [b, S] = L(null), N = (b == null ? void 0 : b.sessionIdentity) === r && b.documentId === P ? b : null, E = w || !!N, _ = A((M) => {
    const R = `${M.documentId || ""}`.trim();
    if (!R || o.current && o.current !== R) return;
    if (!o.current && s.current)
      g({
        jobId: s.current,
        documentId: R
      });
    else if (!o.current)
      return;
    const I = `${M.revision || ""}`.trim() || `${Date.now()}`;
    S({
      documentId: R,
      revision: I,
      sessionIdentity: a.current
    }), l();
  }, []);
  O(() => {
    S((M) => M && M.sessionIdentity !== r ? null : M);
  }, [r]);
  const T = A((M) => {
    switch (M.type) {
      case "resolved-document-job":
        i({ documentId: M.documentId, jobId: M.jobId });
        break;
      case "cleared-resolved-document-job":
        i({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        u({ documentId: M.documentId, jobId: M.jobId });
        break;
      case "resolved-job-document":
        g((R) => R.jobId === M.jobId && R.documentId === M.documentId ? R : { jobId: M.jobId, documentId: M.documentId });
        break;
      case "committed-source":
        S({
          documentId: M.documentId,
          revision: M.revision,
          sessionIdentity: M.sessionIdentity
        });
        break;
    }
  }, []);
  return {
    resolvedDocumentJob: c,
    setResolvedDocumentJob: i,
    missingDocumentJob: d,
    setMissingDocumentJob: u,
    documentJobId: f,
    rejectedDocumentJobId: m,
    sessionJobId: v,
    resolvedJobDocument: p,
    setResolvedJobDocument: g,
    jobDocumentId: y,
    documentId: P,
    sourceOnly: w,
    committedDocumentSource: b,
    setCommittedDocumentSource: S,
    activeCommittedDocumentSource: N,
    sourceViewOnly: E,
    refreshCommittedDocument: _,
    applyIdentityEvent: T
  };
}
const Na = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Jn(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function xa(e) {
  var r, a, o, s;
  if (!e || typeof e != "object") return "";
  const t = e, n = [
    t.document_id,
    t.documentId,
    (r = t.document) == null ? void 0 : r.document_id,
    (a = t.book_summary) == null ? void 0 : a.document_id,
    (s = (o = t.request_payload) == null ? void 0 : o.source) == null ? void 0 : s.document_id
  ];
  for (const l of n) {
    const c = `${l || ""}`.trim();
    if (c) return c;
  }
  return "";
}
function Kn(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return ya(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function La(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function Ca(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const a of n) {
    const o = `${a || ""}`.trim();
    if (o && !La(o, t))
      return o.replace(/\.pdf$/i, "");
  }
  return "";
}
function Zt({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: ba.progress,
        stage: n,
        percent: e,
        text: t
      },
      zr.messageTargetOrigin()
    );
  } catch {
  }
}
function xt(e, t, n, r = "progress") {
  e({
    loading: !0,
    percent: t,
    text: n,
    stage: r,
    failed: !1
  }), Zt({ percent: t, text: n, stage: r });
}
function _a(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: a,
    sessionEpochRef: o,
    closingRef: s
  } = e, [l, c] = L(null), [i, d] = L(null), [u, f] = L(""), [m, v] = L(0), p = u === n ? l : null, g = u === n ? i : null, y = Jn(p), P = Na.has(y), w = A(() => {
    v((T) => T + 1);
  }, []), b = A((T) => {
    c(T.jobPayload), d(T.manifestPayload), f(T.sessionIdentity);
  }, []), S = A((T) => {
    c(null), d(null), f(T);
  }, []), N = x(""), E = x(""), _ = A(async () => {
    const T = a.current;
    if (!T || N.current === T) return;
    const M = yn().loadJobPayload;
    if (typeof M != "function") return;
    const R = o.current.value;
    N.current = T;
    try {
      const I = await M(T);
      if (s.current || o.current.value !== R || a.current !== T || !I || typeof I != "object")
        return;
      const k = Jn(I);
      c(I), f(r.current), k === "succeeded" && E.current !== T && (E.current = T, v((D) => D + 1));
    } catch {
    } finally {
      N.current === T && (N.current = "");
    }
  }, []);
  return O(() => {
    E.current = "";
  }, [n]), O(() => {
    if (!t || P || !p) return;
    const T = window.setInterval(() => {
      _();
    }, 1e3);
    return () => window.clearInterval(T);
  }, [P, _, p, t]), {
    jobPayload: l,
    setJobPayload: c,
    manifestPayload: i,
    setManifestPayload: d,
    payloadSessionIdentity: u,
    setPayloadSessionIdentity: f,
    scopedJobPayload: p,
    scopedManifestPayload: g,
    jobStatus: y,
    jobTerminal: P,
    jobRefreshRevision: m,
    refreshJobArtifacts: w,
    refreshJobStatus: _,
    publishPayload: b,
    clearPayload: S
  };
}
function Xt(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function Da(e, t) {
  e(t), Xt(t);
}
function za(e) {
  const [t, n] = L(e ? "source" : "compare"), r = A((o) => {
    e && o !== "source" || (n(o), Xt(o));
  }, [e]), a = A((o) => {
    Da(n, o);
  }, []);
  return O(() => (e && document.documentElement.classList.add("reader-source-only"), Xt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: a };
}
function qn(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function Oa(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: qn(n.active_job_id),
    activeVersionId: qn(n.active_version_id)
  };
}
function Fa(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, a = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return a ? { kind: "follow-active-job", jobId: a, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function $a(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: a,
    hasCommittedSource: o
  } = e;
  return t && r && n === a && !o ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function ja(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function Ua(e) {
  return e ? { data: e.data.slice() } : null;
}
const Ba = 2, Se = /* @__PURE__ */ new Map();
function Qt(e, t) {
  Se.delete(e), Se.set(e, t);
}
function Ha(e) {
  if (Se.size < Ba) return;
  const t = Se.keys().next().value;
  t && Se.delete(t);
}
function Bt(e) {
  const t = `${e || ""}`.trim();
  if (!t || !Se.has(t)) return null;
  const n = Se.get(t);
  return Qt(t, n), n;
}
async function Or(e, t = ft().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (Se.has(r)) {
    const l = Se.get(r);
    return Qt(r, l), l;
  }
  const a = await t(r, { signal: n.signal });
  if (!a.ok) {
    const l = new Error(`读取 PDF 失败 (${a.status})`);
    throw l.status = a.status, l;
  }
  const o = await a.arrayBuffer(), s = { data: new Uint8Array(o) };
  return Se.has(r) ? Qt(r, s) : (Ha(), Se.set(r, s)), s;
}
function Wa(e = "", t = null) {
  const [n, r] = L(
    () => t || Bt(e)
  ), [a, o] = L(
    () => !!`${e || ""}`.trim() && !t && !Bt(e)
  ), [s, l] = L("");
  return O(() => {
    if (t) {
      r(t), o(!1), l("");
      return;
    }
    const c = `${e || ""}`.trim();
    if (!c) {
      r(null), o(!1), l("");
      return;
    }
    const i = Bt(c);
    if (i) {
      r(i), o(!1), l("");
      return;
    }
    let d = !1;
    return o(!0), l(""), r(null), Or(c).then((u) => {
      d || (r(u), o(!1));
    }).catch((u) => {
      d || (r(null), o(!1), l((u == null ? void 0 : u.message) || String(u)));
    }), () => {
      d = !0;
    };
  }, [e, t]), { file: n, loading: a, error: s };
}
function Ja(e) {
  const { sessionEpochRef: t, closingRef: n, abort: r, sessionEpoch: a } = e;
  let o = !1;
  const s = () => r.signal.aborted || n.current || t.current.value !== a;
  return {
    signal: r.signal,
    isClosedOrStale: s,
    isInactive: () => o || s(),
    markFailed: () => {
      o = !0;
    }
  };
}
async function en(e) {
  const { url: t, label: n, percentStart: r, percentEnd: a, fence: o, setBoot: s } = e;
  if (!t || o.isInactive())
    return null;
  xt(s, r, n, "download");
  const l = await Or(t, ft().fetchProtected, {
    signal: o.signal
  });
  return o.isInactive() ? null : (xt(s, a, n, "download"), l);
}
async function Ka(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: a } = e;
  xt(a, 25, "正在下载 PDF…", "download");
  const o = [];
  let s = null, l = null;
  return t && o.push(
    en({
      url: t,
      label: "正在下载原文 PDF…",
      percentStart: 30,
      percentEnd: 55,
      fence: r,
      setBoot: a
    }).then((d) => {
      s = d;
    })
  ), n && o.push(
    en({
      url: n,
      label: "正在下载译文 PDF…",
      percentStart: 55,
      percentEnd: 85,
      fence: r,
      setBoot: a
    }).then((d) => {
      l = d;
    })
  ), await Promise.all(o), r.isInactive() ? { status: "inactive" } : !!t && !s || !!n && !l ? { status: "incomplete" } : { status: "downloaded", sourceBytes: s, translatedBytes: l };
}
const It = {
  regions: null,
  metadata: null
};
function qa(e) {
  const {
    sessionJobId: t,
    jobId: n,
    routeDocumentId: r,
    documentJobId: a,
    rejectedDocumentJobId: o,
    sourceOnly: s,
    locationKey: l,
    sessionIdentity: c,
    committedSource: i,
    applyIdentityEvent: d,
    publishPayload: u,
    clearPayload: f,
    switchSessionMode: m,
    jobRefreshRevision: v,
    sessionEpochRef: p,
    closingRef: g,
    activeLoadAbortRef: y
  } = e, [P, w] = L(""), [b, S] = L(""), [N, E] = L(null), [_, T] = L(null), [M, R] = L(!1), [I, k] = L(""), [D, $] = L([]), [B, Y] = L(() => ({
    source: null,
    translated: null
  })), [j, W] = L(
    It
  ), [K, X] = L({
    loading: !0,
    percent: 4,
    text: Re.boot,
    stage: "progress",
    failed: !1
  });
  return O(() => {
    const ae = new AbortController(), U = p.current.value, q = Ja({
      sessionEpochRef: p,
      closingRef: g,
      abort: ae,
      sessionEpoch: U
    });
    y.current = ae;
    const te = yn();
    if (g.current)
      return ae.abort(), () => {
        y.current === ae && (y.current = null);
      };
    function ne(Q, ee) {
      q.markFailed(), X({
        loading: !1,
        percent: 100,
        text: Q,
        stage: "failed",
        failed: !0
      }), Zt({ percent: 100, text: ee, stage: "failed" });
    }
    function de() {
      R(!0), X({
        loading: !1,
        percent: 100,
        text: Re.ready,
        stage: "ready",
        failed: !1
      }), Zt({ percent: 100, text: Re.ready, stage: "ready" });
    }
    function ue() {
      return i != null && i.documentId ? Kn(
        i.documentId,
        i.revision
      ) : pa() ? ga : te.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function pe() {
      let Q = { activeJobId: "", activeVersionId: "" };
      try {
        const le = await te.fetchProtected(
          te.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (le != null && le.ok) {
          const F = await le.json().catch(() => null);
          Q = Oa(F);
        }
      } catch {
      }
      const ee = Fa({
        link: Q,
        rejectedDocumentJobId: o,
        hasCommittedSource: !!i
      });
      if (ee.kind === "follow-active-job") {
        if (q.isInactive()) return;
        d({
          type: "resolved-document-job",
          documentId: r,
          jobId: ee.jobId
        }), ee.activeVersionId ? (i || d({
          type: "committed-source",
          documentId: r,
          revision: ee.activeVersionId,
          sessionIdentity: c
        }), m("source")) : m("compare");
        return;
      }
      if (ee.kind === "open-committed-source") {
        if (q.isInactive()) return;
        d({
          type: "committed-source",
          documentId: r,
          revision: ee.revision,
          sessionIdentity: c
        }), m("source");
        return;
      }
      const se = ue();
      if (q.isInactive()) return;
      w(se), S(""), k(""), f(c);
      const be = await en({
        url: se,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: q,
        setBoot: X
      });
      if (!q.isInactive()) {
        if (!be) {
          ne("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        E(be), de();
      }
    }
    async function ye() {
      var Ne;
      const Q = await ((Ne = te.loadSessionSnapshot) == null ? void 0 : Ne.call(te, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: i,
        includeOptionalArtifacts: !i
      })), ee = Q ? {
        jobPayload: Q.sourcePayload,
        manifestPayload: Q.manifestPayload,
        readerMetadata: Q.readerMetadata,
        regionsPayload: Q.regions,
        readerErrors: Q.readerErrors
      } : await te.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !i
      });
      if (q.isInactive()) return;
      let se = null;
      if (n && !r) {
        try {
          se = await te.fetchDocumentByJobId(vn, t);
        } catch {
        }
        if (q.isInactive()) return;
      }
      const be = xa(ee.jobPayload) || `${(se == null ? void 0 : se.document_id) || ""}`.trim();
      be && !r && d({
        type: "resolved-job-document",
        jobId: t,
        documentId: be
      });
      const le = $a({
        payloadDocumentId: be,
        linkedActiveJobId: `${(se == null ? void 0 : se.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(se == null ? void 0 : se.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!i
      });
      if (le.kind === "restore-committed-source") {
        if (q.isInactive()) return;
        d({
          type: "committed-source",
          documentId: le.documentId,
          revision: le.revision,
          sessionIdentity: c
        }), m("source");
        return;
      }
      const F = te.resolveReaderSourcePdf(ee.manifestPayload), fe = te.resolveReaderTranslatedPdfUrl(ee.jobPayload, ee.manifestPayload), Ae = typeof F == "string" ? F : te.resolveReaderArtifactUrl(F), St = r || be, Be = i != null && i.documentId ? Kn(
        i.documentId,
        i.revision
      ) : Ae || (St ? te.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(St)}/source.pdf`) : ""), tt = i ? "" : fe || "";
      if (w(Be || ""), S(tt), k(Ca(ee.jobPayload, t)), u({
        jobPayload: ee.jobPayload || null,
        manifestPayload: ee.manifestPayload || null,
        sessionIdentity: c
      }), $(i ? [] : Fo(ee.regionsPayload)), Y(i ? { source: null, translated: null } : $o(ee.readerMetadata)), W(i ? It : ee.readerErrors ?? It), !Be && !tt) {
        ne(Re.failed, Re.failed);
        return;
      }
      const He = await Ka({
        sourceFinal: Be || "",
        translatedFinal: tt,
        fence: q,
        setBoot: X
      });
      if (He.status !== "inactive") {
        if (He.status === "incomplete") {
          ne("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        E(He.sourceBytes), T(He.translatedBytes), de();
      }
    }
    async function _e() {
      R(!1), E(null), T(null), $([]), Y({ source: null, translated: null }), W(It), xt(X, 8, Re.metadata, "metadata");
      try {
        if (s) {
          await pe();
          return;
        }
        if (!t) {
          ne(Re.failed, Re.failed);
          return;
        }
        await ye();
      } catch (Q) {
        if (q.isClosedOrStale() || (Q == null ? void 0 : Q.name) === "AbortError") return;
        q.markFailed();
        const ee = Number(Q == null ? void 0 : Q.status);
        if (ja({
          status: ee,
          jobId: n,
          routeDocumentId: r,
          documentJobId: a,
          sessionJobId: t
        })) {
          d({ type: "missing-document-job", documentId: r, jobId: t }), d({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const se = Q instanceof Error ? Q.message : Re.failed;
        ne(se, se);
      }
    }
    return _e(), () => {
      ae.abort(), y.current === ae && (y.current = null);
    };
  }, [t, r, a, o, s, l, i, v, n, c, d, u, f, m]), {
    sourceUrl: P,
    translatedUrl: b,
    sourceFile: N,
    translatedFile: _,
    assetsReady: M,
    title: I,
    regions: D,
    readerMetadata: B,
    readerErrors: j,
    boot: K
  };
}
function Va() {
  const e = x(!1), t = x(null), { locationKey: n, jobId: r, routeDocumentId: a, sessionIdentity: o } = ka(), s = x({ identity: "", value: 0 });
  s.current.identity !== o && (s.current = {
    identity: o,
    value: s.current.value + 1
  }, e.current = !1);
  const l = x(o), c = x(""), i = x(""), d = x(() => {
  }), u = A(() => d.current(), []), f = Aa({
    routeDocumentId: a,
    jobId: r,
    sessionIdentity: o,
    sessionIdentityRef: l,
    documentIdRef: c,
    sessionJobIdRef: i,
    switchToSourceMode: u
  }), {
    sessionJobId: m,
    documentId: v,
    sourceOnly: p,
    sourceViewOnly: g
  } = f, { mode: y, setMode: P, switchSessionMode: w } = za(g);
  d.current = () => {
    w("source");
  }, l.current = o, c.current = v, i.current = m;
  const b = _a({
    sessionJobId: m,
    sessionIdentity: o,
    sessionIdentityRef: l,
    sessionJobIdRef: i,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: S,
    scopedManifestPayload: N,
    jobStatus: E,
    jobTerminal: _,
    jobRefreshRevision: T,
    refreshJobArtifacts: M,
    refreshJobStatus: R
  } = b, I = qa({
    sessionJobId: m,
    jobId: r,
    routeDocumentId: a,
    documentJobId: f.documentJobId,
    rejectedDocumentJobId: f.rejectedDocumentJobId,
    sourceOnly: p,
    locationKey: n,
    sessionIdentity: o,
    committedSource: f.activeCommittedDocumentSource,
    applyIdentityEvent: f.applyIdentityEvent,
    publishPayload: b.publishPayload,
    clearPayload: b.clearPayload,
    switchSessionMode: w,
    jobRefreshRevision: T,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), k = A(() => {
    var $;
    e.current = !0, ($ = t.current) == null || $.abort();
  }, []), D = V(
    () => ({
      fetchProtected: yn().fetchProtected,
      jobId: m,
      jobPayload: S,
      manifestPayload: N,
      sourceUrl: I.sourceUrl,
      translatedUrl: I.translatedUrl,
      sourceOnly: g
    }),
    [m, S, N, I.sourceUrl, I.translatedUrl, g]
  );
  return {
    jobId: m,
    jobStatus: E,
    workflow: `${(S == null ? void 0 : S.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: _,
    documentId: v,
    sessionIdentity: o,
    sourceOnly: p,
    mode: y,
    setMode: P,
    sourceUrl: I.sourceUrl,
    translatedUrl: I.translatedUrl,
    sourceFile: I.sourceFile,
    translatedFile: I.translatedFile,
    assetsReady: I.assetsReady,
    boot: I.boot,
    title: I.title,
    regions: I.regions,
    readerMetadata: I.readerMetadata,
    readerErrors: I.readerErrors,
    download: D,
    refreshJobArtifacts: M,
    refreshJobStatus: R,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: k
  };
}
const Ga = 160, Ya = 8, Za = 960;
function Xa() {
  const e = x(null), [t, n] = L(null), [r, a] = L(Za), o = A((s) => {
    e.current = s, n(s);
  }, []);
  return O(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const l = (i) => {
      !Number.isFinite(i) || i < Ga || a((d) => Math.abs(d - i) < Ya ? d : i);
    }, c = new ResizeObserver((i) => {
      var d, u;
      l(((u = (d = i[0]) == null ? void 0 : d.contentRect) == null ? void 0 : u.width) ?? s.clientWidth);
    });
    return c.observe(s), l(s.clientWidth), () => c.disconnect();
  }, [t]), {
    shellRef: e,
    shellEl: t,
    shellWidth: r,
    bindShell: o
  };
}
function Qa(e) {
  const { mode: t, sourceOnly: n, assetsReady: r, hasSource: a, hasTranslated: o } = e, s = r && a, l = r && o && !n, c = t === "source" || t === "compare", i = !n && (t === "translated" || t === "compare");
  return {
    mountSource: s,
    mountTranslated: l,
    showSource: c,
    showTranslated: i,
    compareMode: t === "compare" && c && i && s && l,
    primaryPane: t === "translated" ? "translated" : "source"
  };
}
const Ht = { source: 0, translated: 0 };
function es(e, t) {
  const {
    mode: n,
    sourceOnly: r,
    assetsReady: a,
    sourceUrl: o,
    translatedUrl: s,
    sourceFile: l,
    translatedFile: c
  } = e, i = `${(t == null ? void 0 : t.identityKey) || ""}\0${o}\0${s}`, d = x(i);
  d.current = i;
  const [u, f] = L(() => ({
    identity: i,
    pages: Ht
  })), [m, v] = L(() => ({ identity: i, tick: 0 })), p = u.identity === i ? u.pages : Ht, g = m.identity === i ? m.tick : 0, y = Qa({
    mode: n,
    sourceOnly: r,
    assetsReady: a,
    hasSource: !!l || !!o,
    hasTranslated: !!c
  }), { primaryPane: P } = y, w = A((R, I) => {
    d.current === i && f((k) => {
      const D = k.identity === i ? k.pages : Ht;
      return D[I] === R && k.identity === i ? k : {
        identity: i,
        pages: { ...D, [I]: R }
      };
    });
  }, [i]), b = x(null), S = A(() => {
    b.current && clearTimeout(b.current);
    const R = i;
    b.current = setTimeout(() => {
      b.current = null, d.current === R && v((I) => ({
        identity: R,
        tick: I.identity === R ? I.tick + 1 : 1
      }));
    }, 60);
  }, [i]);
  O(() => (b.current && (clearTimeout(b.current), b.current = null), f((R) => R.identity === i && R.pages.source === 0 && R.pages.translated === 0 ? R : { identity: i, pages: { source: 0, translated: 0 } }), v((R) => R.identity === i && R.tick === 0 ? R : { identity: i, tick: 0 }), () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [i]);
  const N = V(
    () => Math.max(p.source, p.translated),
    [p]
  ), E = P === "translated" ? p.translated : p.source || p.translated, _ = t == null ? void 0 : t.userZoom, T = t == null ? void 0 : t.shellWidth, M = `${i}-${g}-${_}-${n}-${p.source}-${p.translated}-${T}`;
  return {
    ...y,
    numPagesByPane: p,
    hudNumPages: N,
    primaryNumPages: E,
    metricsTick: g,
    onNumPages: w,
    onMetrics: S,
    rowSyncRevision: M
  };
}
const Ze = "data-reader-page", Xe = "data-reader-pane", wn = "data-natural-height", ts = "reader-react-root", ns = "reader-react-grid", rs = "reader-react-scroll-shell", os = "reader-react-pdf-pane", Fr = "reader-react-pdf-page", Lt = "reader-react-pdf-page-placeholder", Sn = "reader-react-pdf-page-slot";
function mt(e, t) {
  const n = e != null ? `[${Ze}="${e}"]` : `[${Ze}]`;
  return t ? `${n}[${Xe}="${t}"]` : n;
}
function as() {
  return `.${Sn}[${Ze}]`;
}
function $t(e) {
  return Number(e.getAttribute(Ze));
}
const $r = 0.25, jr = 1, ss = 0.05, vt = 0.5, is = 16, cs = 8;
function ct(e) {
  return vt;
}
function jt(e) {
  return Number.isFinite(e) ? Math.min(jr, Math.max($r, e)) : vt;
}
function ht(e, t) {
  const n = jt(Number(e) + t * ss);
  return Math.round(n * 100) / 100;
}
function ls(e) {
  return Math.round(jt(e) * 100);
}
function ds(e) {
  const n = (Number(e) || 0) - is - cs;
  return Math.max(160, Math.floor(n));
}
function us(e, t = vt) {
  const n = jt(t);
  return ds((Number(e) || 0) * n);
}
function fs(e, t) {
  if (!e || !Number.isFinite(t) || t <= 0 || Math.abs(t - 1) < 1e-3)
    return;
  const n = e.scrollLeft + e.clientWidth / 2, r = e.scrollTop + e.clientHeight / 2, a = Array.from(
    e.querySelectorAll(`[${Xe}]`)
  ).map((s) => ({
    pane: s,
    cx: s.scrollLeft + s.clientWidth / 2,
    hadOverflow: s.scrollWidth > s.clientWidth + 1
  })), o = () => {
    e.scrollLeft = Math.max(0, n * t - e.clientWidth / 2), e.scrollTop = Math.max(0, r * t - e.clientHeight / 2);
    for (const { pane: s, cx: l, hadOverflow: c } of a) {
      const i = Math.max(0, s.scrollWidth - s.clientWidth);
      if (i <= 0) {
        s.scrollLeft = 0;
        continue;
      }
      c ? s.scrollLeft = Math.min(
        i,
        Math.max(0, l * t - s.clientWidth / 2)
      ) : s.scrollLeft = i / 2;
    }
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(o);
  });
}
const ms = ["markdown", "ai"], Pn = [
  "reading-path",
  "reading-canvas",
  "terminal"
], hs = [
  ...ms,
  ...Pn
];
function Ur(e) {
  return hs.includes(e);
}
function ps(e) {
  return Pn.includes(e);
}
const gs = "retainpdf:reader:view:v1:", Vn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), bs = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function Br() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function tn(e) {
  return `${e || ""}`.trim();
}
function ys({
  documentId: e,
  jobId: t
}) {
  const n = tn(e);
  if (n) return `document:${n}`;
  const r = tn(t);
  return r ? `job:${r}` : "";
}
function Hr(e) {
  const t = tn(e);
  return t ? `${gs}${t}` : "";
}
function vs(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function ws(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!Vn.has(t) || !Vn.has(n) || t === n))
    return { left: t, right: n };
}
function Ss(e) {
  return e === null ? null : Ur(e) ? e : void 0;
}
function Ps(e) {
  return bs.has(e) ? e : void 0;
}
function Wr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = vs(t.anchor), r = Number(t.zoom), a = Ps(t.mode), o = ws(t.splitLayout), s = Ss(t.assistantPanel);
  return {
    schema: "retainpdf_reader_view_v1",
    ...n ? { anchor: n } : {},
    ...Number.isFinite(r) ? { zoom: Math.max(0.25, Math.min(1, r)) } : {},
    ...a !== void 0 ? { mode: a } : {},
    ...o !== void 0 ? { splitLayout: o } : {},
    ...s !== void 0 ? { assistantPanel: s } : {},
    updatedAt: Number.isFinite(Number(t.updatedAt)) ? Number(t.updatedAt) : 0
  };
}
function Me(e, t = Br()) {
  const n = Hr(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Wr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function Ct(e, t, n = Br()) {
  const r = Hr(e);
  if (!r || !n) return null;
  const a = Me(e, n), o = Wr({
    schema: "retainpdf_reader_view_v1",
    ...a || {},
    ...t,
    updatedAt: Date.now()
  });
  if (!o) return null;
  try {
    return n.setItem(r, JSON.stringify(o)), o;
  } catch {
    return null;
  }
}
function Is(e, t, n = "") {
  const [r, a] = L(() => {
    var u;
    return ((u = Me(n)) == null ? void 0 : u.zoom) ?? ct();
  }), o = x(r), s = x(n);
  o.current = r;
  const l = x(1);
  O(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const u = ((f = Me(n)) == null ? void 0 : f.zoom) ?? ct();
    l.current = 1, o.current = u, a(u);
  }, [e, n]);
  const c = A((u) => {
    const f = jt(u), m = o.current;
    Math.abs(f - m) < 5e-4 || (l.current = f / (m || 1), Ct(s.current, { zoom: f }), a(f));
  }, []), i = A((u) => {
    c(ht(o.current, u));
  }, [c]), d = A((u) => {
    c(ct());
  }, [c]);
  return $e(() => {
    const u = l.current;
    Math.abs(u - 1) < 1e-3 || (l.current = 1, fs(t == null ? void 0 : t.current, u));
  }, [r, t]), { userZoom: r, onZoomChange: c, stepZoom: i, resetZoom: d };
}
function Rs(e, t = !0) {
  const [n, r] = L(null), a = A(() => {
    var l, c;
    r(null);
    const s = (l = globalThis.getSelection) == null ? void 0 : l.call(globalThis);
    (c = s == null ? void 0 : s.removeAllRanges) == null || c.call(s);
  }, []), o = e.current ?? null;
  return O(() => {
    if (!t)
      return;
    const s = () => {
      var $, B;
      const p = e.current, g = ($ = globalThis.getSelection) == null ? void 0 : $.call(globalThis);
      if (!p || !g || g.isCollapsed || !g.rangeCount) {
        r(null);
        return;
      }
      const y = g.getRangeAt(0);
      if (!p.contains(y.commonAncestorContainer)) {
        r(null);
        return;
      }
      const P = `${g.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (P.length < 2) {
        r(null);
        return;
      }
      let w = y.commonAncestorContainer;
      w.nodeType === Node.TEXT_NODE && (w = w.parentElement);
      const b = (B = w == null ? void 0 : w.closest) == null ? void 0 : B.call(
        w,
        mt()
      );
      if (!b || !p.contains(b)) {
        r(null);
        return;
      }
      const S = Math.max(1, Math.floor($t(b) || 1)), E = b.getAttribute(Xe) === "translated" ? "translated" : "source", _ = y.getClientRects(), T = _[_.length - 1] || y.getBoundingClientRect();
      if (!T || T.width === 0 && T.height === 0) {
        r(null);
        return;
      }
      const M = typeof window < "u" ? window.innerWidth : 800, R = typeof window < "u" ? window.innerHeight : 600, I = 16, k = Math.min(Math.max(I, T.left), M - I), D = Math.min(Math.max(I, T.top), R - I);
      r({
        selectionType: "text",
        quote: P,
        page: S,
        pane: E,
        rect: {
          left: k,
          top: D,
          width: T.width,
          height: T.height
        }
      });
    }, l = () => {
      window.setTimeout(s, 0);
    }, c = () => {
      l();
    }, i = () => l(), d = () => l(), u = () => {
      l();
    }, f = (p) => {
      p.key === "Escape" && a();
    }, m = () => {
      r((p) => p && null);
    };
    document.addEventListener("mouseup", c), document.addEventListener("pointerup", i), document.addEventListener("touchend", d), document.addEventListener("selectionchange", u), document.addEventListener("keyup", f);
    const v = o ?? e.current;
    return v == null || v.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", c), document.removeEventListener("pointerup", i), document.removeEventListener("touchend", d), document.removeEventListener("selectionchange", u), document.removeEventListener("keyup", f), v == null || v.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, o, a]), { selection: n, clearSelection: a };
}
function Ts(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, a = x(t), o = x(n), s = x(r);
  return a.current = t, o.current = n, s.current = r, { setModeKeepingPage: A((c) => {
    c !== a.current && (s.current(), o.current(c));
  }, []) };
}
function Es() {
  const [e, t] = L(null), n = A((s) => {
    t(s);
  }, []), r = A((s = null) => {
    t((l) => !s || l === s ? null : l);
  }, []), a = A((s) => {
    t((l) => l === s ? null : s);
  }, []), o = A(
    (s) => e === s,
    [e]
  );
  return { active: e, open: n, close: r, toggle: a, isOpen: o };
}
const In = 48;
function Jr(e, t = In) {
  return e.getBoundingClientRect().top + t;
}
function Kr(e, t) {
  if (!e.length)
    return null;
  let n = null, r = -1 / 0;
  for (const c of e) {
    const i = c.getBoundingClientRect();
    i.height < 8 || i.width < 8 || i.top <= t + 1 && i.top >= r && (n = c, r = i.top);
  }
  if (!n && (n = e.find((i) => {
    const d = i.getBoundingClientRect();
    return d.height >= 8 && d.width >= 8;
  }) ?? e[0] ?? null, n)) {
    const i = [...e].reverse().find((d) => {
      const u = d.getBoundingClientRect();
      return u.height >= 8 && u.width >= 8;
    });
    i && i.getBoundingClientRect().bottom < t && (n = i);
  }
  if (!n)
    return null;
  const a = $t(n);
  if (!Number.isFinite(a) || a < 1)
    return null;
  const o = n.getBoundingClientRect(), s = o.height > 0 ? o.height : 1, l = Math.min(1, Math.max(0, (t - o.top) / s));
  return { el: n, page: a, fraction: l };
}
function Wt(e, t, n = In) {
  if (!e)
    return null;
  const r = mt(void 0, t), a = Array.from(e.querySelectorAll(r));
  if (!a.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Jr(e, n), l = Kr(a, s);
  return l ? { page: l.page, fraction: l.fraction } : null;
}
function Rn(e, t, n = "auto", r, a = In) {
  if (!e || !t)
    return !1;
  const o = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let l = null;
  if (r && (l = e.querySelector(mt(o, r))), l || (l = e.querySelector(mt(o))), !l)
    return !1;
  const c = e.getBoundingClientRect(), i = l.getBoundingClientRect();
  if (c.height <= 0 || i.height < 8 && l.offsetHeight < 8)
    return !1;
  const d = i.height > 0 ? i.height : l.offsetHeight, u = e.scrollTop + (i.top - c.top), f = Math.max(0, u + s * d - a);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function Ms(e, t, n = "smooth", r) {
  return Rn(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function nn(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", a = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let o = !1, s = !1;
  const l = [], c = () => {
    var d;
    if (o) return;
    Rn(
      e(),
      t,
      r,
      n == null ? void 0 : n.pane
    ) && !s && (s = !0, (d = n == null ? void 0 : n.onDone) == null || d.call(n));
  };
  for (const i of a)
    i <= 0 ? requestAnimationFrame(() => {
      requestAnimationFrame(c);
    }) : l.push(setTimeout(c, i));
  return () => {
    o = !0;
    for (const i of l)
      clearTimeout(i);
  };
}
function ks(e, t, n) {
  return nn(
    e,
    { page: t, fraction: 0 },
    n
  );
}
function _t(e, t) {
  if (!Number.isFinite(e))
    return 1;
  const n = Math.max(1, Math.floor(e));
  return !Number.isFinite(t) || t <= 0 ? n : Math.min(t, n);
}
function ve(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function As(e, t, n = !0, r = "", a) {
  const [o, s] = L(1);
  return O(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const l = e.current;
    if (!l)
      return;
    let c = !1, i = null, d = 0;
    const u = mt(void 0, a), f = () => {
      if (c) return;
      const p = Array.from(l.querySelectorAll(u));
      if (!p.length)
        return;
      const g = Jr(l), y = Kr(p, g);
      y && s(y.page);
    }, m = () => {
      c || (d && cancelAnimationFrame(d), d = requestAnimationFrame(() => {
        d = 0, f();
      }));
    }, v = () => {
      if (c) return;
      if (!Array.from(l.querySelectorAll(u)).length) {
        i = setTimeout(v, 120);
        return;
      }
      f(), l.addEventListener("scroll", m, { passive: !0 });
    };
    return v(), () => {
      c = !0, i && clearTimeout(i), d && cancelAnimationFrame(d), l.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, a]), o;
}
const Ns = `canvas, .react-pdf__Page, .${Fr}, .${Lt}`, Gn = /* @__PURE__ */ new WeakMap();
function xs(e) {
  const t = Number(e.getAttribute(wn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Gn.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(Ns), Gn.set(e, n)), n) {
    const a = n.getBoundingClientRect().height;
    if (Number.isFinite(a) && a > 0)
      return a;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function Ls(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function Cs(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(as()).forEach((r) => {
    const a = $t(r);
    if (!Number.isFinite(a) || a < 1) return;
    const o = xs(r);
    if (o <= 0) return;
    const s = t.get(a) || { height: 0, count: 0 };
    s.height = Math.max(s.height, o), s.count += 1, t.set(a, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, a) => {
    r.count >= 2 && r.height > 0 && n.set(a, Math.ceil(r.height));
  }), n;
}
function _s(e, t, n = "", r) {
  const [a, o] = L(() => /* @__PURE__ */ new Map()), s = x(a), l = x(r);
  return l.current = r, $e(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), o(s.current));
      return;
    }
    let c = !1, i = 0, d = !1, u = !1;
    const f = () => {
      var S;
      if (c) return;
      const w = e.current;
      if (!w) return;
      const b = Cs(w);
      Ls(s.current, b) || (s.current = b, o(b)), d && !u && (u = !0, (S = l.current) == null || S.call(l));
    }, m = () => {
      cancelAnimationFrame(i), i = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const v = window.setTimeout(m, 100), p = window.setTimeout(() => {
      d = !0, m();
    }, 300), g = window.setTimeout(m, 700), y = e.current;
    let P = null;
    return y && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => m()), P.observe(y)), () => {
      c = !0, cancelAnimationFrame(i), window.clearTimeout(v), window.clearTimeout(p), window.clearTimeout(g), P == null || P.disconnect();
    };
  }, [e, t, n]), a;
}
const Ds = [0, 48, 140, 320, 560], zs = 700, Os = [80, 200, 400], Fs = 500, $s = 50, js = 180, Yn = [0, 48, 140, 320, 700, 1200];
function Us(e, t) {
  var R;
  const {
    primaryPane: n,
    mode: r,
    enabled: a = !0,
    persistenceKey: o = "",
    restoreReady: s = !0
  } = t, l = x(
    ((R = Me(o)) == null ? void 0 : R.anchor) || { page: 1, fraction: 0 }
  ), c = x(null), i = x(!1), d = x(r), u = x(null), f = x(null), m = x(null), v = x(null), p = x(o), g = x(""), y = x(n);
  y.current = n;
  const P = A(() => {
    var I;
    (I = u.current) == null || I.call(u), u.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), w = A((I = !1) => {
    v.current != null && (clearTimeout(v.current), v.current = null);
    const k = () => {
      v.current = null, Ct(p.current, {
        anchor: ve(l.current)
      });
    };
    I ? k() : v.current = setTimeout(k, js);
  }, []), b = A((I) => {
    l.current = ve(I), c.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, i.current = !1;
    }, $s);
  }, []);
  O(() => {
    if (!a)
      return;
    let I = !1, k = null, D = null, $ = null;
    const B = () => {
      if (I) return;
      const Y = e.current;
      if (!Y) {
        $ = setTimeout(B, 50);
        return;
      }
      k = Y, D = () => {
        if (i.current)
          return;
        const j = Wt(k, y.current);
        j && (l.current = j, w());
      }, k.addEventListener("scroll", D, { passive: !0 }), i.current || D();
    };
    return B(), () => {
      I = !0, $ != null && clearTimeout($), k && D && k.removeEventListener("scroll", D);
    };
  }, [a, r, n, e, w]), $e(() => {
    var k;
    if (p.current === o) return;
    w(!0), P(), m.current != null && (clearTimeout(m.current), m.current = null), p.current = o, g.current = "";
    const I = (k = Me(o)) == null ? void 0 : k.anchor;
    l.current = I ? ve(I) : { page: 1, fraction: 0 }, c.current = null, i.current = !!o, d.current = r;
  }, [o, r, w, P]), O(() => {
    var k;
    if (!a || !s || !o || g.current === o) return;
    g.current = o;
    const I = ve(
      ((k = Me(o)) == null ? void 0 : k.anchor) || { page: 1, fraction: 0 }
    );
    return l.current = I, c.current = I, i.current = !0, P(), u.current = nn(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: y.current,
        delaysMs: Yn,
        onDone: () => b(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(I);
    }, Math.max(...Yn) + 160), () => P();
  }, [a, s, o, e, b, P]), O(() => {
    if (d.current === r)
      return;
    if (d.current = r, !a) {
      i.current = !1, c.current = null, P();
      return;
    }
    const I = c.current ? ve(c.current) : ve(l.current);
    return i.current = !0, c.current = I, l.current = I, P(), u.current = nn(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: Ds,
        onDone: () => b(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(I);
    }, zs), () => {
      P();
    };
  }, [r, a, n, e, b, P]), O(() => () => {
    P(), m.current != null && (clearTimeout(m.current), m.current = null), w(!0);
  }, [P, w]);
  const S = A(() => {
    const I = Wt(
      e.current,
      y.current
    );
    return ve(I || l.current);
  }, [e]), N = A(() => {
    i.current = !0;
    const I = Wt(
      e.current,
      y.current
    ), k = ve(I ?? l.current);
    return l.current = k, c.current = k, w(), k;
  }, [e, w]), E = A((I, k, D) => {
    const $ = D || y.current, B = _t(I, k || 1), Y = { page: B, fraction: 0 };
    l.current = Y, i.current = !0, c.current = Y, w(), P(), Ms(e.current, B, "smooth", $), u.current = ks(
      () => e.current,
      B,
      {
        behavior: "auto",
        pane: $,
        delaysMs: Os,
        onDone: () => b(Y)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(Y);
    }, Fs);
  }, [e, b, P, w]), _ = A(() => ve(l.current), []), T = A(() => i.current, []), M = A(() => {
    if (!i.current || !c.current)
      return;
    const I = ve(c.current);
    Rn(
      e.current,
      I,
      "auto",
      y.current
    );
  }, [e]);
  return {
    lockFromShell: S,
    beginModeSwitch: N,
    goToPage: E,
    getAnchor: _,
    isRestoring: T,
    repinIfRestoring: M
  };
}
function Bs(e, t) {
  if (!e) return null;
  if (e.blockId && t) {
    const a = t(e.blockId);
    if (a != null && Number.isFinite(a) && a >= 1)
      return Math.floor(a);
  }
  if (e.pageIdx === null || e.pageIdx === void 0) return null;
  const n = Number(e.pageIdx);
  if (!Number.isFinite(n)) return null;
  const r = Math.floor(n) + 1;
  return r >= 1 ? r : null;
}
function qr(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), a = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), o = `j:${r}:d:${a}`;
  return t == null ? `${o}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${o}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const Hs = [0, 80, 200, 400, 800], Ws = 120, Js = 400;
function Ks(e, t, n) {
  const { enabled: r, numPages: a, goToPage: o, resolveBlockPage: s, onAnchorApplied: l, jobId: c, documentId: i } = e, d = x(o);
  d.current = o;
  const u = x(s);
  u.current = s;
  const f = x(l);
  f.current = l;
  const m = x(n);
  m.current = n, O(() => {
    var w, b;
    if (!r || !Number.isFinite(a) || a < 1)
      return;
    const v = wa(), p = Bs(v, u.current), g = qr(v, p, { jobId: c, documentId: i });
    if (t.current === g)
      return;
    if (p == null) {
      t.current = g, (w = m.current) == null || w.call(m);
      return;
    }
    t.current = g, v && ((b = f.current) == null || b.call(f, v, p));
    const y = [];
    let P = 0;
    for (const S of Hs)
      P = Math.max(P, S), y.push(
        setTimeout(() => {
          d.current(p);
        }, S)
      );
    return y.push(
      setTimeout(() => {
        var S;
        (S = m.current) == null || S.call(m);
      }, P + Ws)
    ), () => {
      for (const S of y) clearTimeout(S);
    };
  }, [r, a, c, i, t]);
}
function qs(e) {
  var o;
  const t = globalThis.window;
  if (!t || typeof ((o = t.history) == null ? void 0 : o.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, a = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", a);
}
function Vs(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: a,
    resolveBlockPage: o,
    syncDebounceMs: s = Js,
    jobId: l,
    documentId: c,
    applyReaderSearch: i
  } = e, d = x(o);
  d.current = o;
  const u = x(i);
  u.current = i;
  const f = x(0);
  O(() => {
    if (!n || !r || !t.current || !Number.isFinite(a) || a < 1 || f.current === a) return;
    const m = setTimeout(() => {
      var y;
      const v = ((y = globalThis.location) == null ? void 0 : y.search) || "", p = Oo(v, a, d.current);
      if (f.current = a, p === null) return;
      const g = `${new URLSearchParams(p).get("block_id") || ""}`.trim();
      t.current = qr(
        { blockId: g },
        a,
        { jobId: l, documentId: c }
      ), (u.current || qs)(p);
    }, s);
    return () => clearTimeout(m);
  }, [
    n,
    r,
    a,
    s,
    l,
    c,
    t
  ]);
}
function Gs(e) {
  const t = x(""), [n, r] = L(!1), a = A(() => r(!0), []), o = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  Ks(o, t, a), Vs(e, t, n);
}
const rt = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function Ys(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function Zn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function Vr(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = Zn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const a = Zn(n, e);
  return a < 0 ? "ignore" : a === 0 ? n.page_hash === e.pageHash ? "ignore" : "retry" : "accept";
}
function Zs(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), a = Vr(r, t, n);
  if (a === "retry") return e;
  if (a === "ignore")
    return { ...e, lastSeq: t.seq, connection: "live", error: "" };
  const o = new Map(n.items.map((c) => [c.item_id, c])), s = new Map((r == null ? void 0 : r.changedAtSeqById) || []);
  for (const c of t.changed_item_ids)
    o.has(c) && s.set(c, t.seq);
  const l = new Map(e.pagesByPage);
  return l.set(t.page_idx, {
    attempt: n.attempt,
    generation: n.generation,
    pageHash: n.page_hash,
    itemsById: o,
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
const Xn = [250, 500, 1e3, 2e3, 4e3], Jt = [80, 160, 320, 640, 1e3, 1500], Qn = [250, 500, 1e3, 2e3, 4e3, 5e3], Xs = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function rn(e, t) {
  return new Promise((n, r) => {
    if (t.aborted) {
      r(new DOMException("Aborted", "AbortError"));
      return;
    }
    const a = () => {
      clearTimeout(o), r(new DOMException("Aborted", "AbortError"));
    }, o = setTimeout(() => {
      t.removeEventListener("abort", a), n();
    }, e);
    t.addEventListener("abort", a, { once: !0 });
  });
}
function Tn(e) {
  return Ho(e) ? `${e.code || ""}`.trim() : "";
}
function Rt(e, t) {
  const n = Tn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Qs(e, t, n, r, a) {
  let o = null;
  for (let s = 0; ; s += 1) {
    try {
      const c = await a.fetchPage(e, t.page_idx, { signal: r });
      if (Vr(n.pagesByPage.get(t.page_idx), t, c) !== "retry")
        return c;
      o = Wo(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (c) {
      if ((c == null ? void 0 : c.name) === "AbortError") throw c;
      o = c;
      const i = Tn(c);
      if (i && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(i)) throw c;
    }
    const l = Jt[Math.min(s, Jt.length - 1)];
    if (await rn(l, r), s >= Jt.length + 2) throw o;
  }
}
function ei({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [a, o] = L(rt), s = x(a), l = x("");
  s.current = a;
  const c = `${e || ""}`.trim(), i = `${t || ""}`.trim().toLowerCase(), d = Xs.has(i) ? i : "";
  return O(() => {
    if (!n || !c) {
      l.current = "", s.current = rt, o(rt);
      return;
    }
    const u = r === void 0 ? va() : r, f = l.current === c;
    if (l.current = c, !u) {
      const w = {
        ...f ? s.current : rt,
        connection: d ? "terminal" : "unavailable",
        jobStatus: i,
        error: "实时译文暂不可用"
      };
      s.current = w, o(w);
      return;
    }
    const m = new AbortController();
    let v = !1;
    const p = {
      ...f ? s.current : rt,
      connection: d ? "terminal" : "connecting",
      jobStatus: i,
      error: ""
    };
    s.current = p, o(p);
    const g = (w) => {
      m.signal.aborted || o((b) => {
        const S = w(b);
        return s.current = S, S;
      });
    }, y = async () => {
      let w = 0;
      for (; !m.signal.aborted; )
        try {
          const b = await u.fetchLayout(c, { signal: m.signal });
          v = !0, g((S) => ({
            ...S,
            layoutByPage: Ys(b),
            jobStatus: i,
            error: ""
          }));
          return;
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError") return;
          const S = Tn(b);
          if (!(S === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !S)) {
            g((E) => ({
              ...E,
              connection: d ? "terminal" : "unavailable",
              jobStatus: i,
              error: Rt(b, "实时译文暂不可用")
            }));
            return;
          }
          if (d) {
            g((E) => ({
              ...E,
              connection: "terminal",
              jobStatus: i,
              error: ""
            }));
            return;
          }
          g((E) => ({
            ...E,
            connection: "connecting",
            jobStatus: i,
            error: Rt(b, "正在等待 OCR 版面数据")
          })), await rn(Xn[Math.min(w, Xn.length - 1)], m.signal).catch(() => {
          }), w += 1;
        }
    };
    return (async () => {
      if (await y(), !v || m.signal.aborted) return;
      let w = 0;
      for (; !m.signal.aborted; ) {
        d || g((b) => ({
          ...b,
          connection: b.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: i,
          // 保留已有错误：首页还没提交（lastSeq 为 0）时恰恰是最容易出错的阶段，
          // 此前这里把它清成空串，UI 于是一直显示「连接中」，用户看到的是
          // "正在努力"，实际可能已经在反复失败。
          error: b.error
        }));
        try {
          await u.streamEvents(c, {
            afterSeq: s.current.lastSeq,
            signal: m.signal,
            onEvent: async (b) => {
              if (b.seq <= s.current.lastSeq) return;
              let S;
              try {
                S = await Qs(
                  c,
                  b,
                  s.current,
                  m.signal,
                  u
                );
              } catch (N) {
                if ((N == null ? void 0 : N.name) === "AbortError" || m.signal.aborted) throw N;
                g((E) => ({
                  ...E,
                  lastSeq: Math.max(E.lastSeq, b.seq),
                  error: Rt(N, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              g((N) => {
                const E = Zs(N, b, S);
                return d ? {
                  ...E,
                  connection: "terminal",
                  jobStatus: i
                } : {
                  ...E,
                  jobStatus: i
                };
              }), w = 0;
            }
          });
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError" || m.signal.aborted) return;
          g((S) => ({
            ...S,
            connection: d ? "terminal" : "reconnecting",
            jobStatus: i,
            error: Rt(b, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (d) {
          g((b) => ({
            ...b,
            connection: "terminal",
            jobStatus: i
          }));
          return;
        }
        await rn(Qn[Math.min(w, Qn.length - 1)], m.signal).catch(() => {
        }), w += 1;
      }
    })(), () => m.abort();
  }, [n, r, c, d]), a;
}
const ti = 2e3;
function ni(e) {
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
const ri = /* @__PURE__ */ new Set(["book", "translate"]);
function Gr(e) {
  return !!(e.jobId && e.sourceUrl && ri.has(e.workflow));
}
function oi(e) {
  return !!(Gr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function ai() {
  const e = Va(), t = Gr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = oi({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = ei({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), a = Es(), { shellRef: o, shellEl: s, shellWidth: l, bindShell: c } = Xa(), i = ys({
    documentId: e.documentId,
    jobId: e.jobId
  }), d = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: u, onZoomChange: f } = Is(e.mode, o, i), m = es(
    {
      mode: e.mode,
      sourceOnly: e.sourceOnly,
      assetsReady: e.assetsReady,
      sourceUrl: e.sourceUrl,
      translatedUrl: e.translatedUrl,
      sourceFile: e.sourceFile,
      translatedFile: e.translatedFile
    },
    { userZoom: u, shellWidth: l, identityKey: d }
  ), {
    beginModeSwitch: v,
    goToPage: p,
    repinIfRestoring: g
  } = Us(o, {
    primaryPane: m.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: m.primaryNumPages > 0
  });
  O(() => {
    g();
  }, [l, g]);
  const y = _s(
    o,
    m.compareMode,
    m.rowSyncRevision,
    g
  ), P = As(
    o,
    m.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${u}-${m.metricsTick}`,
    m.primaryPane
  ), w = A((U, q) => {
    var ne, de;
    const te = Math.max(
      Number(m.hudNumPages) || 0,
      Number(m.primaryNumPages) || 0,
      Number((ne = m.numPagesByPane) == null ? void 0 : ne.source) || 0,
      Number((de = m.numPagesByPane) == null ? void 0 : de.translated) || 0
    );
    p(U, te, q);
  }, [p, m.hudNumPages, m.primaryNumPages, m.numPagesByPane]), [b, S] = L(null), N = x(null), E = A((U) => {
    N.current && clearTimeout(N.current), S(U), U && (N.current = setTimeout(() => S(null), ti));
  }, []);
  O(() => () => {
    N.current && clearTimeout(N.current);
  }, []);
  const _ = A((U) => {
    const q = Mt(e.regions, U);
    return q ? Hn(q, m.primaryPane).page : null;
  }, [e.regions, m.primaryPane]), T = A((U, q) => {
    const te = q || m.primaryPane, ne = typeof U == "object" && U ? `${U.block_id || ""}`.trim() : "", de = typeof U == "object" && U ? `${U.image_url || ""}`.trim() : "", ue = typeof U == "object" && U ? U.page_idx != null ? Number(U.page_idx) + 1 : U.page != null ? Number(U.page) : null : typeof U == "number" ? U + 1 : null, pe = jo(e.regions, de, ue) || Mt(e.regions, ne) || (typeof U == "object" ? Uo(e.regions, U) : null);
    let ye = pe ? Hn(pe, te).page : null;
    ye == null && (ye = ni(U)), !(ye == null || ye < 1) && (E(pe), w(ye, te));
  }, [E, w, m.primaryPane, e.regions]);
  Gs({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: m.hudNumPages || 0,
    currentPage: P,
    goToPage: w,
    resolveBlockPage: _,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (U) => {
      E(Mt(e.regions, U.blockId));
    }
  });
  const { setModeKeepingPage: M } = Ts({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: v
  }), [R, I] = L(null), {
    selection: k,
    clearSelection: D
  } = Rs(o, !e.boot.loading && !e.boot.failed), $ = A(() => {
    I(null), D();
  }, [D]), B = A((U) => {
    D(), I(U);
  }, [D]);
  O(() => {
    k && I(null);
  }, [k]), O(() => {
    const U = o.current;
    if (!U) return;
    const q = () => I(null);
    return U.addEventListener("scroll", q, { passive: !0 }), () => U.removeEventListener("scroll", q);
  }, [s, o]);
  const Y = k || R;
  O(() => {
    E(null), $();
  }, [d, E, $]);
  const j = !e.boot.loading && !e.boot.failed, W = V(() => a, [a.active, a.open, a.close, a.toggle, a.isOpen]), K = V(() => ({ bindShell: c, shellEl: s, shellWidth: l, shellRef: o }), [c, s, l, o]), X = V(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), ae = V(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: u,
    onZoomChange: f,
    shell: K,
    panes: m,
    sessionFiles: X,
    rowHeights: y,
    goToPage: w,
    activeRegion: b,
    jumpToAnchor: T,
    setModeKeepingPage: M,
    download: e.download,
    showHud: j,
    tools: W,
    selection: Y,
    clearSelection: $,
    selectRegion: B,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, K, m, X, y, w, b, T, M, j, W, Y, $, B, u, f, i, r, n]);
  return V(() => ({
    ...ae,
    currentPage: P
  }), [ae, P]);
}
const si = [
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
], ii = [
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
function ci(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of si)
    if (n.keys.some(
      (a) => a.length === 1 ? a === t : a === e
    )) return n;
  return null;
}
function li(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function di(e) {
  const {
    mode: t,
    sourceOnly: n,
    setMode: r,
    userZoom: a,
    onZoomChange: o,
    currentPage: s,
    numPages: l,
    goToPage: c,
    enabled: i = !0
  } = e;
  O(() => {
    if (!i)
      return;
    const d = (u) => {
      if (u.defaultPrevented || u.metaKey || u.ctrlKey || u.altKey || li(u.target))
        return;
      const f = u.key, m = ci(f);
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
              o(ht(a, 1));
              return;
            case "zoom-out":
              o(ht(a, -1));
              return;
            case "zoom-reset":
              o(ct());
              return;
            case "next-page":
              c(_t(s + 1, l));
              return;
            case "prev-page":
              c(_t(s - 1, l));
              return;
            case "first-page":
              c(1);
              return;
            case "last-page":
              c(l);
              return;
          }
      }
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [
    i,
    t,
    n,
    r,
    a,
    o,
    s,
    l,
    c
  ]);
}
const ui = "retainpdf:soft-reader-close";
function fi() {
  return new URL("./index.html", window.location.href).href;
}
function mi() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: ui },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function hi(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), a = new URL(e, r);
    return a.origin === r.origin && !/reader\.html$/i.test(a.pathname) && !/detail\.html$/i.test(a.pathname);
  } catch {
    return !1;
  }
}
function pi() {
  if (!(typeof window > "u") && !mi()) {
    if (hi(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(fi());
  }
}
function gi({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ C(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), pi();
      },
      children: [
        /* @__PURE__ */ h(et, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ h("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let er = !1;
function bi() {
  if (er)
    return;
  const e = ft().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (la.GlobalWorkerOptions.workerSrc = e, er = !0);
}
const yi = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function vi({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: a
}) {
  const o = r.flatMap((s) => {
    if (!Ar(s.region)) return [];
    const l = yt(s, t, n);
    return l ? [{ highlight: s, rect: l }] : [];
  });
  return o.length ? /* @__PURE__ */ h("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: o.map(({ highlight: s, rect: l }) => {
    const c = s.region, i = Nr(c), d = yi[i];
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        className: `reader-structure-selection-target is-${i}`,
        "data-reader-region-id": c.itemId,
        "data-reader-region-kind": i,
        style: l,
        "aria-label": `${d}区域，点击选择`,
        title: `${d} · 点击选择`,
        onClick: (u) => {
          u.stopPropagation();
          const f = u.currentTarget.getBoundingClientRect();
          a == null || a({
            selectionType: "region",
            region: c,
            kind: i,
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
          /* @__PURE__ */ h("span", { className: "reader-structure-selection-label", "aria-hidden": "true", children: d }),
          /* @__PURE__ */ h("span", { className: "sr-only", children: xr(c, e) })
        ]
      },
      c.itemId
    );
  }) }) : null;
}
function wi(e, t, n) {
  return e.flatMap((r) => {
    if (Nr(r.region) !== "text") return [];
    const a = yt(r, t, n);
    return a ? [{ itemId: r.itemId, highlight: r, rect: a }] : [];
  });
}
function tr(e, t, n) {
  let r = null, a = Number.POSITIVE_INFINITY;
  for (const o of e) {
    const { rect: s } = o;
    if (t < s.left || t > s.left + s.width || n < s.top || n > s.top + s.height)
      continue;
    const l = s.width * s.height;
    l < a && (r = o, a = l);
  }
  return r;
}
function Si({ target: e }) {
  return e ? /* @__PURE__ */ h("div", { className: "reader-text-hover-layer", "aria-hidden": "true", children: /* @__PURE__ */ h(
    "div",
    {
      className: "reader-text-hover-frame",
      "data-reader-text-hover-id": e.itemId,
      style: e.rect,
      children: /* @__PURE__ */ h("span", { className: "reader-text-hover-label", children: "文字" })
    }
  ) }) : null;
}
function Pi(e, t) {
  const n = e.page_idx + 1, r = {
    page: n,
    bbox: t.bbox,
    unit: "pdf_point",
    origin: "top_left",
    text: t.source_text
  }, a = {
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
    region: a,
    box: r,
    pageSize: { page: n, width: e.width, height: e.height }
  };
}
function Ii(e, t, n, r) {
  if (!e || !t) return [];
  const a = [];
  for (const o of e.blocks) {
    const s = t.itemsById.get(o.item_id);
    if (!(s != null && s.translated_text)) continue;
    const l = yt(
      Pi(e, o),
      n,
      r
    );
    l && a.push({
      itemId: o.item_id,
      translatedText: s.translated_text,
      status: s.status,
      kind: o.kind,
      sourceText: o.source_text,
      typography: o.typography,
      rect: l,
      changedAtSeq: t.changedAtSeqById.get(o.item_id) || 0,
      changedNow: t.changedAtSeqById.get(o.item_id) === t.lastEventSeq
    });
  }
  return a;
}
const Ri = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', Ti = 256, ot = /* @__PURE__ */ new Map();
function Ei(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function Mi(e) {
  const t = `${e || ""}`, { text: n, slots: r } = fa(t, { bareLatex: !0 }), a = Ei(n), o = ma(a, r);
  if (!r.length)
    return { fallbackHtml: o, richHtml: Promise.resolve(o), hasMath: !1 };
  let s = ot.get(t);
  if (!s && (s = ha(a, r), ot.set(t, s), ot.size > Ti)) {
    const l = ot.keys().next().value;
    l !== void 0 && ot.delete(l);
  }
  return { fallbackHtml: o, richHtml: s, hasMath: !0 };
}
function Kt(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function Ee(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function ki(e, t) {
  const n = e.typography, r = Ee(t) || 1, a = Ee(n == null ? void 0 : n.font_size_pt), o = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, o * 1.18), l = Kt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, c = Math.max(5.5 * r, Math.min(s, l * r)), i = Ee(n == null ? void 0 : n.fit_min_font_size_pt), d = Ee(n == null ? void 0 : n.fit_max_font_size_pt), u = Math.max(3.5, (i || 5.5) * r), f = Math.max(
    u,
    d ? d * r : a ? a * r : c
  ), m = a ? a * r : c, v = Ee(n == null ? void 0 : n.leading_em), p = [
    Ee(n == null ? void 0 : n.padding_top_pt) || 0,
    Ee(n == null ? void 0 : n.padding_right_pt) || 0,
    Ee(n == null ? void 0 : n.padding_bottom_pt) || 0,
    Ee(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((g) => g * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || Ri,
    fontSizePx: Math.max(u, Math.min(f, m)),
    minFontSizePx: u,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: v ? 1 + v : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (Kt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : Kt(e.kind) ? "center" : "justify",
    padding: p,
    exact: !!a
  };
}
function Ai(e, t, n, r) {
  const { minFontSizePx: a, maxFontSizePx: o } = r, s = /* @__PURE__ */ new Map(), l = (u) => {
    const f = s.get(u);
    if (f !== void 0) return f;
    const { width: m, height: v } = e(u), p = m <= t + 0.5 && v <= n + 0.5;
    return s.set(u, p), p;
  };
  let c = a, i = o, d = Math.min(r.requestedFontSizePx, i);
  if (l(d)) {
    if (!r.exact) {
      c = d;
      for (let u = 0; u < 6 && i > c; u += 1) {
        const f = (c + i) / 2;
        l(f) ? (d = f, c = f) : i = f;
      }
    }
  } else {
    i = d, d = c;
    for (let u = 0; u < 8 && i > c; u += 1) {
      const f = (c + i) / 2;
      l(f) ? (d = f, c = f) : i = f;
    }
  }
  return Math.max(a, d);
}
const Ni = 512, at = /* @__PURE__ */ new Map();
let on = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  on += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  on += 1;
}));
function xi(e, t, n, r) {
  return [
    on,
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
function Li({ item: e, pageScale: t }) {
  const n = x(null), r = V(
    () => Mi(e.translatedText),
    [e.translatedText]
  ), [a, o] = L(r.fallbackHtml), s = V(
    () => ki(e, t),
    [e, t]
  );
  O(() => {
    let u = !0;
    return o(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      u && o(f);
    }), () => {
      u = !1;
    };
  }, [r]), $e(() => {
    const u = n.current;
    if (!u) return;
    const [f, m, v, p] = s.padding, g = Math.max(1, e.rect.width - p - m), y = Math.max(1, e.rect.height - f - v), P = xi(a, g, y, s);
    let w = at.get(P);
    if (w === void 0 && (w = Ai(
      (b) => (u.style.fontSize = `${b}px`, { width: u.scrollWidth, height: u.scrollHeight }),
      g,
      y,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), at.set(P, w), at.size > Ni)) {
      const b = at.keys().next().value;
      b !== void 0 && at.delete(b);
    }
    u.style.fontSize = `${w.toFixed(2)}px`;
  }, [a, e.rect.height, e.rect.width, s]);
  const [l, c, i, d] = s.padding;
  return /* @__PURE__ */ h(
    "div",
    {
      className: `reader-live-translation-item${e.changedNow ? " is-changed" : ""}`,
      "data-live-translation-item": e.itemId,
      "data-live-translation-kind": e.kind,
      "data-live-translation-status": e.status,
      "data-live-translation-typography": s.exact ? "typst" : "fitted",
      style: {
        ...e.rect,
        padding: `${l}px ${c}px ${i}px ${d}px`
      },
      children: /* @__PURE__ */ h(
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
          dangerouslySetInnerHTML: { __html: a }
        }
      )
    }
  );
}
function Ci({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const a = V(
    () => Ii(e, t, n, r),
    [r, e, t, n]
  );
  return a.length ? /* @__PURE__ */ h(
    "div",
    {
      className: "reader-live-translation-overlay",
      "data-live-translation-page": e == null ? void 0 : e.page_idx,
      "data-live-translation-generation": t == null ? void 0 : t.generation,
      "aria-hidden": "true",
      children: a.map((o) => /* @__PURE__ */ h(
        Li,
        {
          item: o,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${o.itemId}:${o.changedAtSeq}`
      ))
    }
  ) : null;
}
const _i = un(Ci), Di = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注"
}, nr = 10;
function zi({
  width: e,
  height: t,
  targets: n,
  activeNoteId: r,
  onSelect: a
}) {
  const o = n.flatMap(({ note: s, highlight: l }) => {
    const c = yt(l, e, t);
    return c ? [{ note: s, rect: c }] : [];
  });
  return o.length ? /* @__PURE__ */ h("div", { className: "reader-ai-note-layer", "aria-label": "AI 批注", children: o.map(({ note: s, rect: l }) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      className: `reader-ai-note-mark is-${s.kind} is-level-${s.level}` + (s.weak ? " is-weak" : "") + (r === s.id ? " is-active" : ""),
      "data-reader-ai-note-id": s.id,
      style: {
        // 贴在块的左外侧：盖住正文的标注是在帮倒忙。左边越界时退回块内。
        left: Math.max(0, l.left - nr - 2),
        top: l.top,
        width: nr,
        height: Math.max(12, l.height)
      },
      "aria-label": `${Di[s.kind]}：${s.text}`,
      title: s.text,
      onClick: (c) => {
        c.stopPropagation();
        const i = c.currentTarget.getBoundingClientRect();
        a(s, {
          left: i.left,
          top: i.top,
          width: i.width,
          height: i.height
        });
      },
      children: /* @__PURE__ */ h("span", { className: "sr-only", children: s.text })
    },
    s.id
  )) }) : null;
}
const Yr = 1.414;
function Oi({
  pageNumber: e,
  width: t,
  devicePixelRatio: n,
  pane: r,
  active: a = !1,
  syncedMinHeight: o = 0,
  onMetrics: s,
  cachedAspect: l,
  onAspectChange: c,
  sentinelRef: i,
  regionHighlight: d = null,
  regionTargets: u = [],
  aiNoteTargets: f = [],
  activeAiNoteId: m = null,
  onSelectAiNote: v,
  onSelectRegion: p,
  liveTranslationLayout: g,
  liveTranslationPage: y,
  showLiveTranslation: P = r === "source"
}) {
  const w = x(l ?? Yr), [b, S] = L(w.current);
  O(() => {
    l != null && Math.abs(l - w.current) >= 1e-3 && (w.current = l, S(l));
  }, [l]);
  const N = x(i);
  N.current = i;
  const E = x((j) => {
    var W;
    (W = N.current) == null || W.call(N, j);
  }).current, _ = Math.max(120, Math.floor(t * b)), T = Math.max(_, Math.ceil(o || 0)), M = yt(d, t, _), R = V(
    () => wi(u, t, _),
    [_, u, t]
  ), [I, k] = L(null), D = V(
    () => R.find((j) => j.itemId === I) || null,
    [I, R]
  ), $ = (j) => {
    if (j.buttons !== 0) {
      k(null);
      return;
    }
    const W = j.currentTarget.getBoundingClientRect(), K = tr(
      R,
      j.clientX - W.left,
      j.clientY - W.top
    ), X = (K == null ? void 0 : K.itemId) || null;
    k((ae) => ae === X ? ae : X);
  }, B = (j) => {
    var X, ae, U;
    if (!p || (ae = (X = j.target) == null ? void 0 : X.closest) != null && ae.call(X, ".reader-structure-selection-target") || `${((U = window.getSelection()) == null ? void 0 : U.toString()) || ""}`.trim()) return;
    const W = j.currentTarget.getBoundingClientRect(), K = tr(
      R,
      j.clientX - W.left,
      j.clientY - W.top
    );
    K && p({
      selectionType: "region",
      region: K.highlight.region,
      kind: "text",
      page: K.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: W.left + K.rect.left,
        top: W.top + K.rect.top,
        width: K.rect.width,
        height: K.rect.height
      }
    });
  }, Y = (j) => {
    !Number.isFinite(j) || j <= 0 || Math.abs(w.current - j) < 1e-3 || (w.current = j, S(j), c == null || c(e, j));
  };
  return /* @__PURE__ */ C(
    "div",
    {
      ref: E,
      [Ze]: e,
      [Xe]: r,
      [wn]: _,
      className: Sn,
      onPointerMoveCapture: $,
      onClick: B,
      onPointerLeave: () => k(null),
      style: {
        width: t,
        height: T,
        minHeight: T
      },
      children: [
        a ? /* @__PURE__ */ h(
          da,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: Fr,
            loading: /* @__PURE__ */ h(
              "div",
              {
                className: Lt,
                style: { width: t, height: _ }
              }
            ),
            onLoadSuccess: (j) => {
              try {
                const W = j.getViewport({ scale: 1 });
                if (W.width > 0) {
                  const K = W.height / W.width;
                  Y(K);
                }
              } catch {
              }
              s == null || s();
            },
            onRenderSuccess: () => {
              s == null || s();
            }
          }
        ) : /* @__PURE__ */ h(
          "div",
          {
            className: Lt,
            style: { width: t, height: _ },
            "aria-hidden": !0
          }
        ),
        M ? /* @__PURE__ */ h(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": d == null ? void 0 : d.itemId,
            style: M,
            "aria-hidden": "true"
          }
        ) : null,
        a && P ? /* @__PURE__ */ h(
          _i,
          {
            layoutPage: g,
            pageState: y,
            width: t,
            height: _
          }
        ) : null,
        v ? /* @__PURE__ */ h(
          zi,
          {
            width: t,
            height: _,
            targets: f,
            activeNoteId: m,
            onSelect: (j, W) => v(j, W)
          }
        ) : null,
        /* @__PURE__ */ h(Si, { target: a ? D : null }),
        /* @__PURE__ */ h(
          vi,
          {
            pane: r === "translated" ? "translated" : "source",
            width: t,
            height: _,
            regions: u,
            onSelect: p
          }
        )
      ]
    }
  );
}
const Fi = un(Oi), qt = 5, $i = "120% 0px", ji = 120;
let rr = 1;
const or = /* @__PURE__ */ new WeakMap();
function Ui(e) {
  if (!e) return 0;
  const t = or.get(e);
  if (t) return t;
  const n = rr;
  return rr += 1, or.set(e, n), n;
}
function Bi() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const Hi = Mo(
  function({
    pane: t,
    url: n = "",
    preloadedFile: r = null,
    userZoom: a = 1,
    visible: o = !0,
    emptyLabel: s = "暂无 PDF",
    scrollRoot: l = null,
    pageWidthOverride: c = null,
    rowHeights: i,
    onMetrics: d,
    onLoadSuccess: u,
    onLoadError: f,
    onNumPagesChange: m,
    activeRegion: v = null,
    regions: p = [],
    aiNotes: g = [],
    activeAiNoteId: y = null,
    onSelectAiNote: P,
    readerMetadata: w = null,
    onSelectRegion: b,
    liveTranslation: S,
    showLiveTranslation: N = t === "source",
    liveTranslationPendingLabel: E = "",
    paneAction: _
  }, T) {
    bi();
    const { file: M, loading: R, error: I } = Wa(n, r), k = `${n}\0${Ui(M)}`, D = x(k);
    D.current = k;
    const $ = V(
      () => Ua(M),
      [M, n]
    ), [B, Y] = L(0), [j, W] = L(""), [K, X] = L(null), [ae, U] = L(480), q = x(null), te = x(0), ne = V(() => Bi(), []), de = V(() => ({
      cMapUrl: ft().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: ft().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    fn(T, () => K, [K]), O(() => {
      const z = (H) => {
        !Number.isFinite(H) || H < 80 || Math.abs(H - te.current) < 8 || (te.current = H, U(H));
      }, G = c && c >= 80 ? c : (l == null ? void 0 : l.clientWidth) || 0;
      if (z(G), !l || typeof ResizeObserver > "u" || c && c >= 80) return;
      const J = new ResizeObserver((H) => {
        var re, oe;
        const ie = ((oe = (re = H[0]) == null ? void 0 : re.contentRect) == null ? void 0 : oe.width) ?? l.clientWidth;
        !Number.isFinite(ie) || ie < 80 || (q.current && clearTimeout(q.current), q.current = setTimeout(() => z(ie), 80));
      });
      return J.observe(l), () => {
        J.disconnect(), q.current && clearTimeout(q.current);
      };
    }, [c, l, o]);
    const ue = V(
      () => us(ae, a),
      [ae, a]
    ), [pe, ye] = L(() => /* @__PURE__ */ new Map()), [_e, Q] = L(() => /* @__PURE__ */ new Set()), [ee, se] = L(() => /* @__PURE__ */ new Set()), be = x(/* @__PURE__ */ new Map()), le = x(null), F = x(/* @__PURE__ */ new Map()), fe = A((z, G) => {
      ye((J) => {
        if (J.get(z) === G) return J;
        const H = new Map(J);
        return H.set(z, G), H;
      });
    }, []), Ae = A((z, G) => {
      const J = be.current, H = J.get(z);
      if (H && le.current)
        try {
          le.current.unobserve(H);
        } catch {
        }
      if (G) {
        if (J.set(z, G), le.current)
          try {
            le.current.observe(G);
          } catch {
          }
      } else
        J.delete(z);
    }, []), St = x(/* @__PURE__ */ new Map()), Be = A((z) => {
      const G = St.current;
      let J = G.get(z);
      return J || (J = (H) => Ae(z, H), G.set(z, J)), J;
    }, [Ae]);
    O(() => {
      if (typeof IntersectionObserver > "u") return;
      const z = F.current, G = new IntersectionObserver(
        (J) => {
          const H = [], ie = [];
          for (const re of J) {
            const oe = re.target, ge = $t(oe);
            Number.isFinite(ge) && (re.isIntersecting ? H : ie).push(ge);
          }
          if ((H.length || ie.length) && Q((re) => {
            let oe = null;
            for (const ge of H)
              re.has(ge) || (oe = oe || new Set(re), oe.add(ge));
            for (const ge of ie)
              re.has(ge) && (oe = oe || new Set(re), oe.delete(ge));
            return oe || re;
          }), H.length) {
            for (const re of H) {
              const oe = z.get(re);
              oe && (clearTimeout(oe), z.delete(re));
            }
            se((re) => {
              let oe = null;
              for (const ge of H)
                re.has(ge) || (oe = oe || new Set(re), oe.add(ge));
              return oe || re;
            });
          }
          for (const re of ie)
            z.has(re) || z.set(re, setTimeout(() => {
              z.delete(re), se((oe) => {
                if (!oe.has(re)) return oe;
                const ge = new Set(oe);
                return ge.delete(re), ge;
              });
            }, ji));
        },
        { root: l, rootMargin: $i, threshold: 0 }
      );
      le.current = G;
      for (const J of be.current.values())
        try {
          G.observe(J);
        } catch {
        }
      return () => {
        G.disconnect(), le.current === G && (le.current = null);
        for (const J of z.values()) clearTimeout(J);
        z.clear();
      };
    }, [l]), $e(() => {
      Y(0), W(""), Q(/* @__PURE__ */ new Set()), se(/* @__PURE__ */ new Set()), ye(/* @__PURE__ */ new Map()), be.current.clear();
      const z = F.current;
      for (const G of z.values()) clearTimeout(G);
      z.clear(), m == null || m(0, t);
    }, [k, m, t]);
    const tt = A(
      ({ numPages: z }) => {
        D.current === k && (Y(z), W(""), m == null || m(z, t), u == null || u({ numPages: z, pane: t }));
      },
      [k, u, m, t]
    ), He = A(
      (z) => {
        if (D.current !== k) return;
        const G = (z == null ? void 0 : z.message) || "PDF 解析失败";
        W(G), Y(0), m == null || m(0, t), f == null || f(z, t);
      },
      [k, f, m, t]
    ), Ne = V(
      () => B > 0 ? Array.from({ length: B }, (z, G) => G + 1) : [],
      [B]
    );
    O(() => {
      typeof IntersectionObserver < "u" || se(new Set(Ne));
    }, [Ne]);
    const Pt = V(
      () => Ut(v, w, t),
      [v, w, t]
    ), Po = V(() => {
      const z = /* @__PURE__ */ new Map();
      for (const G of p) {
        const J = Ut(G, w, t);
        if (!J) continue;
        const H = z.get(J.box.page) || [];
        H.push(J), z.set(J.box.page, H);
      }
      return z;
    }, [t, w, p]), Io = V(() => {
      const z = /* @__PURE__ */ new Map();
      for (const G of g) {
        const J = Mt(p, G.anchor.blockId);
        if (!J) continue;
        const H = Ut(J, w, t);
        if (!H) continue;
        const ie = z.get(H.box.page) || [];
        ie.push({ note: G, highlight: H }), z.set(H.box.page, ie);
      }
      return z;
    }, [g, t, w, p]), Ro = V(() => {
      if (B === 0) return /* @__PURE__ */ new Set();
      if (!(!!l && typeof IntersectionObserver < "u" && o)) return new Set(Ne);
      if (_e.size === 0) {
        const J = Math.min(B, qt * 2 + 1);
        return new Set(Array.from({ length: J }, (H, ie) => ie + 1));
      }
      const G = /* @__PURE__ */ new Set();
      for (const J of _e)
        for (let H = -qt; H <= qt; H++) {
          const ie = J + H;
          ie >= 1 && ie <= B && G.add(ie);
        }
      return G;
    }, [B, Ne, l, o, _e]), To = !n || !!I || !!j, Eo = n && (I || j) || s;
    return /* @__PURE__ */ C(
      "section",
      {
        ref: X,
        className: `reader-panel ${os}${o ? "" : " is-hidden"}`,
        [Xe]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": o ? "true" : "false",
        "data-live-translation-status": (S == null ? void 0 : S.jobStatus) || void 0,
        "aria-hidden": o ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          _ ? /* @__PURE__ */ h("div", { className: "reader-react-pdf-pane-action", children: _ }) : null,
          E ? /* @__PURE__ */ C("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ h("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ h("span", { children: E })
          ] }) : null,
          To && !R ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: Eo }) : null,
          R ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          $ && !I ? /* @__PURE__ */ h("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ h(
            ua,
            {
              file: $,
              loading: null,
              error: null,
              options: de,
              onLoadSuccess: tt,
              onLoadError: He,
              className: "reader-react-pdf-document",
              children: Ne.map((z) => {
                if (Ro.has(z))
                  return /* @__PURE__ */ h(
                    Fi,
                    {
                      pane: t,
                      pageNumber: z,
                      width: ue,
                      devicePixelRatio: ne,
                      active: ee.has(z),
                      syncedMinHeight: (i == null ? void 0 : i.get(z)) || 0,
                      onMetrics: d,
                      cachedAspect: pe.get(z),
                      onAspectChange: fe,
                      sentinelRef: Be(z),
                      regionHighlight: (Pt == null ? void 0 : Pt.box.page) === z ? Pt : null,
                      regionTargets: Po.get(z),
                      aiNoteTargets: Io.get(z),
                      activeAiNoteId: y,
                      onSelectAiNote: P,
                      onSelectRegion: b,
                      liveTranslationLayout: S == null ? void 0 : S.layoutByPage.get(z - 1),
                      liveTranslationPage: S == null ? void 0 : S.pagesByPage.get(z - 1),
                      showLiveTranslation: N
                    },
                    `${t}-${z}`
                  );
                const J = pe.get(z) ?? Yr, H = Math.max(120, Math.floor(ue * J)), ie = Math.max(H, Math.ceil((i == null ? void 0 : i.get(z)) || 0));
                return /* @__PURE__ */ h(
                  "div",
                  {
                    ref: Be(z),
                    [Ze]: z,
                    [Xe]: t,
                    [wn]: H,
                    className: Sn,
                    style: {
                      width: ue,
                      height: ie,
                      minHeight: ie
                    },
                    children: /* @__PURE__ */ h(
                      "div",
                      {
                        className: Lt,
                        style: { width: ue, height: H },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${z}`
                );
              })
            },
            k
          ) }) : null
        ]
      }
    );
  }
), ar = un(Hi), Zr = mn(null), Xr = mn(null);
function Wi({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ h(Zr.Provider, { value: e, children: /* @__PURE__ */ h(Xr.Provider, { value: t, children: n }) });
}
function wt() {
  return hn(Zr);
}
function Ji() {
  return hn(Xr);
}
function Ki({
  mode: e,
  compareMode: t,
  showSource: n,
  showTranslated: r,
  markdownSplit: a,
  overlayOnSource: o = !1
}) {
  const s = a && e === "compare";
  return {
    mode: s ? "source" : e,
    compareMode: t && !a,
    showSource: s ? !0 : n,
    showTranslated: s ? !1 : r
  };
}
function qi(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function Vi(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function Gi(e) {
  const t = wt(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: a,
    paneComposition: o
  } = e, s = (o == null ? void 0 : o.visibleMode) ?? e.mode ?? "compare", l = (o == null ? void 0 : o.compareMode) ?? e.compareMode ?? s === "compare", c = (o == null ? void 0 : o.showSource) ?? e.showSource ?? !0, i = (o == null ? void 0 : o.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), d = (o == null ? void 0 : o.overlayOnSource) ?? e.overlayOnSource ?? !1, u = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? vt, v = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, p = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), g = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, y = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, P = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, w = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", b = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", S = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, N = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, E = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), _ = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), T = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), M = e.regions ?? (t == null ? void 0 : t.regions) ?? [], R = (t == null ? void 0 : t.aiNotes) ?? [], I = (t == null ? void 0 : t.activeAiNoteId) ?? null, k = t == null ? void 0 : t.onSelectAiNote, D = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), $ = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), B = Ki({
    mode: s,
    compareMode: l,
    showSource: c,
    showTranslated: i,
    markdownSplit: n,
    overlayOnSource: d
  }), Y = qi(
    v,
    n || r,
    typeof document > "u" ? v * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ h(
    "div",
    {
      ref: u,
      className: rs,
      "data-reader-region-count": M.length,
      "data-reader-structured-region-count": M.filter(Ar).length,
      "data-reader-metadata-ready": D ? "true" : "false",
      children: /* @__PURE__ */ C(
        "main",
        {
          className: `${ns} reader-mode-${B.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            g ? /* @__PURE__ */ h(
              ar,
              {
                pane: "source",
                url: w,
                preloadedFile: S,
                userZoom: m,
                visible: B.showSource,
                scrollRoot: f,
                pageWidthOverride: Y,
                rowHeights: B.compareMode ? p : void 0,
                onMetrics: E,
                emptyLabel: P ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: _,
                activeRegion: T,
                regions: M,
                aiNotes: R,
                activeAiNoteId: I,
                onSelectAiNote: k,
                readerMetadata: D,
                onSelectRegion: $,
                liveTranslation: d ? a : void 0,
                showLiveTranslation: d,
                liveTranslationPendingLabel: d ? Vi(a) : "",
                paneAction: d ? /* @__PURE__ */ C(Ot, { children: [
                  e.sourcePaneAction,
                  /* @__PURE__ */ h(
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
            y ? /* @__PURE__ */ h(
              ar,
              {
                pane: "translated",
                url: b,
                preloadedFile: N,
                userZoom: m,
                visible: B.showTranslated,
                scrollRoot: f,
                pageWidthOverride: Y,
                rowHeights: B.compareMode ? p : void 0,
                onMetrics: E,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: _,
                activeRegion: T,
                regions: M,
                aiNotes: R,
                activeAiNoteId: I,
                onSelectAiNote: k,
                readerMetadata: D,
                onSelectRegion: $,
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
const Yi = [
  { id: "source", label: "源文件", Icon: Lr },
  { id: "compare", label: "对照", Icon: Cr },
  { id: "translated", label: "翻译文件", Icon: _r }
];
function Zi(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function Xi(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Qi(e) {
  const t = wt(), {
    mode: n,
    documentReady: r,
    onModeChange: a,
    liveTranslation: o = null
  } = e, s = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, l = o ? Zi(o.state) : "";
  return /* @__PURE__ */ C("header", { className: "reader-workspace-bar", children: [
    o ? /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${o.state.connection}${o.visible ? " is-active" : ""}`,
        "aria-pressed": o.visible,
        "aria-label": o.visible ? "隐藏实时译文" : "显示实时译文",
        title: o.state.error || l,
        onClick: o.onToggle,
        children: [
          /* @__PURE__ */ h(Go, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ h("span", { className: "reader-live-translation-toggle-label", children: l })
        ]
      }
    ) : null,
    /* @__PURE__ */ h("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: Yi.map(({ id: c, label: i, Icon: d }) => {
      const u = n === c, f = Xi({
        id: c,
        documentReady: r,
        sourceViewOnly: s,
        liveTranslationAvailable: !!o
      });
      return /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          className: `reader-workspace-tab${u ? " is-active" : ""}`,
          role: "tab",
          "aria-selected": u,
          "aria-label": i,
          title: f ? `${i} 需要文档任务` : i,
          disabled: f,
          onClick: () => a(c),
          children: [
            /* @__PURE__ */ h(d, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { className: "reader-workspace-tab-label", children: i })
          ]
        },
        c
      );
    }) })
  ] });
}
const ec = {
  "reading-path": {
    label: "阅读路径",
    short: "路径",
    Icon: Xo,
    adapterKey: "renderReaderReadingPath",
    slot: "document",
    storageKey: "retainpdf.reader.reading-path-float.pos.v1",
    ariaLabel: "阅读路径",
    width: 420,
    keepMounted: !1
  },
  "reading-canvas": {
    label: "画布",
    short: "画",
    Icon: Zo,
    adapterKey: "renderReaderReadingCanvas",
    slot: "document",
    storageKey: "retainpdf.reader.reading-canvas-float.pos.v1",
    ariaLabel: "阅读路径画布",
    width: 520,
    keepMounted: !0
  },
  terminal: {
    label: "终端",
    short: "SH",
    Icon: Yo,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    storageKey: "retainpdf.reader.terminal-float.pos.v1",
    ariaLabel: "fx 终端",
    width: 420,
    keepMounted: !0
  }
}, Qr = Pn.map(
  (e) => ({ id: e, ...ec[e] })
), tc = [
  { id: "markdown", label: "Markdown", short: "MD", Icon: Dr },
  { id: "ai", label: "AI 问答", short: "AI", Icon: bn }
];
function nc() {
  const e = ce();
  return [
    ...tc,
    ...Qr.filter(
      (t) => typeof (e == null ? void 0 : e[t.adapterKey]) == "function"
    )
  ];
}
function rc(e) {
  const t = wt(), { active: n } = e, r = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), a = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), o = nc();
  return n ? /* @__PURE__ */ C("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ h("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: o.map(({ id: s, label: l, Icon: c }) => {
      const i = n === s;
      return /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": i,
          className: `reader-assistant-dock-tab${i ? " is-active" : ""}`,
          onClick: () => r(s),
          children: [
            /* @__PURE__ */ h(c, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { children: l })
          ]
        },
        s
      );
    }) }),
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-assistant-dock-close",
        "aria-label": "关闭阅读辅助面板",
        title: "关闭辅助面板",
        onClick: a,
        children: /* @__PURE__ */ h(et, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ h("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: o.map(({ id: s, label: l, short: c, Icon: i }) => /* @__PURE__ */ C(
    "button",
    {
      type: "button",
      className: "reader-assistant-rail-button",
      "aria-label": `打开${l}`,
      title: l,
      onClick: () => r(s),
      children: [
        /* @__PURE__ */ h(i, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
        /* @__PURE__ */ h("span", { children: c })
      ]
    },
    s
  )) });
}
function oc(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function ac(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function sc(e) {
  return e / 100 * window.innerHeight;
}
function ic(e) {
  return e / 100 * window.innerWidth;
}
function cc(e) {
  switch (typeof e) {
    case "number":
      return [e, "px"];
    case "string": {
      const t = parseFloat(e);
      return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
    }
  }
}
function st({
  groupSize: e,
  panelElement: t,
  styleProp: n
}) {
  let r;
  const [a, o] = cc(n);
  switch (o) {
    case "%": {
      r = a / 100 * e;
      break;
    }
    case "px": {
      r = a;
      break;
    }
    case "rem": {
      r = ac(t, a);
      break;
    }
    case "em": {
      r = oc(t, a);
      break;
    }
    case "vh": {
      r = sc(a);
      break;
    }
    case "vw": {
      r = ic(a);
      break;
    }
  }
  return r;
}
function he(e) {
  return parseFloat(e.toFixed(3));
}
function Qe({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, a) => (r += t === "horizontal" ? a.element.offsetWidth : a.element.offsetHeight, r), 0);
}
function an(e) {
  const { panels: t } = e, n = Qe({ group: e });
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
    const { element: a, panelConstraints: o } = r;
    let s = 0;
    if (o.collapsedSize !== void 0) {
      const d = st({
        groupSize: n,
        panelElement: a,
        styleProp: o.collapsedSize
      });
      s = he(d / n * 100);
    }
    let l;
    if (o.defaultSize !== void 0) {
      const d = st({
        groupSize: n,
        panelElement: a,
        styleProp: o.defaultSize
      });
      l = he(d / n * 100);
    }
    let c = 0;
    if (o.minSize !== void 0) {
      const d = st({
        groupSize: n,
        panelElement: a,
        styleProp: o.minSize
      });
      c = he(d / n * 100);
    }
    let i = 100;
    if (o.maxSize !== void 0) {
      const d = st({
        groupSize: n,
        panelElement: a,
        styleProp: o.maxSize
      });
      i = he(d / n * 100);
    }
    return {
      groupResizeBehavior: o.groupResizeBehavior,
      collapsedSize: s,
      collapsible: o.collapsible === !0,
      defaultSize: l,
      disabled: o.disabled,
      minSize: c,
      maxSize: i,
      panelId: r.id
    };
  });
}
function Z(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function sn(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? lc : dc
  );
}
function lc(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function dc(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function eo(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function to(e, t) {
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
function uc({
  orientation: e,
  rects: t,
  targetRect: n
}) {
  const r = {
    x: n.x + n.width / 2,
    y: n.y + n.height / 2
  };
  let a, o = Number.MAX_VALUE;
  for (const s of t) {
    const { x: l, y: c } = to(r, s), i = e === "horizontal" ? l : c;
    i < o && (o = i, a = s);
  }
  return Z(a, "No rect found"), a;
}
let Tt;
function fc() {
  return Tt === void 0 && (typeof matchMedia == "function" ? Tt = !!matchMedia("(pointer:coarse)").matches : Tt = !1), Tt;
}
function no(e) {
  const { element: t, orientation: n, panels: r, separators: a } = e, o = sn(
    n,
    Array.from(t.children).filter(eo).map((v) => ({ element: v }))
  ).map(({ element: v }) => v), s = [];
  let l = !1, c = !1, i = -1, d = -1, u = 0, f, m = [];
  {
    let v = -1;
    for (const p of o)
      p.hasAttribute("data-panel") && (v++, p.hasAttribute("data-disabled") || (u++, i === -1 && (i = v), d = v));
  }
  if (u > 1) {
    let v = -1;
    for (const p of o)
      if (p.hasAttribute("data-panel")) {
        v++;
        const g = r.find(
          (y) => y.element === p
        );
        if (g) {
          if (f) {
            const y = f.element.getBoundingClientRect(), P = p.getBoundingClientRect();
            let w;
            if (c) {
              const b = n === "horizontal" ? new DOMRect(
                y.right,
                y.top,
                0,
                y.height
              ) : new DOMRect(
                y.left,
                y.bottom,
                y.width,
                0
              ), S = n === "horizontal" ? new DOMRect(P.left, P.top, 0, P.height) : new DOMRect(P.left, P.top, P.width, 0);
              switch (m.length) {
                case 0: {
                  w = [
                    b,
                    S
                  ];
                  break;
                }
                case 1: {
                  const N = m[0], E = uc({
                    orientation: n,
                    rects: [y, P],
                    targetRect: N.element.getBoundingClientRect()
                  });
                  w = [
                    N,
                    E === y ? S : b
                  ];
                  break;
                }
                default: {
                  w = m;
                  break;
                }
              }
            } else
              m.length ? w = m : w = [
                n === "horizontal" ? new DOMRect(
                  y.right,
                  P.top,
                  P.left - y.right,
                  P.height
                ) : new DOMRect(
                  P.left,
                  y.bottom,
                  P.width,
                  P.top - y.bottom
                )
              ];
            for (const b of w) {
              let S = "width" in b ? b : b.element.getBoundingClientRect();
              const N = fc() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (S.width < N) {
                const _ = N - S.width;
                S = new DOMRect(
                  S.x - _ / 2,
                  S.y,
                  S.width + _,
                  S.height
                );
              }
              if (S.height < N) {
                const _ = N - S.height;
                S = new DOMRect(
                  S.x,
                  S.y - _ / 2,
                  S.width,
                  S.height + _
                );
              }
              const E = v <= i || v > d;
              !l && !E && s.push({
                group: e,
                groupSize: Qe({ group: e }),
                panels: [f, g],
                separator: "width" in b ? void 0 : b,
                rect: S
              }), l = !1;
            }
          }
          c = !1, f = g, m = [];
        }
      } else if (p.hasAttribute("data-separator")) {
        p.ariaDisabled !== null && (l = !0);
        const g = a.find(
          (y) => y.element === p
        );
        g ? m.push(g) : (f = void 0, m = []);
      } else
        c = !0;
  }
  return s;
}
var Le;
class ro {
  constructor() {
    Un(this, Le, {});
  }
  addListener(t, n) {
    const r = nt(this, Le)[t];
    return r === void 0 ? nt(this, Le)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = nt(this, Le)[t];
    if (r !== void 0)
      if (r.length === 1)
        r[0].call(null, n);
      else {
        let a = !1, o = null;
        const s = Array.from(r);
        for (let l = 0; l < s.length; l++) {
          const c = s[l];
          try {
            c.call(null, n);
          } catch (i) {
            o === null && (a = !0, o = i);
          }
        }
        if (a)
          throw o;
      }
  }
  removeAllListeners() {
    Bn(this, Le, {});
  }
  removeListener(t, n) {
    const r = nt(this, Le)[t];
    if (r !== void 0) {
      const a = r.indexOf(n);
      a >= 0 && r.splice(a, 1);
    }
  }
}
Le = new WeakMap();
let Ge = {
  cursorFlags: 0,
  state: "inactive"
};
const En = new ro();
function ze() {
  return Ge;
}
function mc(e) {
  return En.addListener("change", e);
}
function hc(e) {
  const t = Ge, n = { ...Ge };
  n.cursorFlags = e, Ge = n, En.emit("change", {
    prev: t,
    next: n
  });
}
function Ye(e) {
  const t = Ge;
  Ge = e, En.emit("change", {
    prev: t,
    next: e
  });
}
const pc = (e) => e, Vt = () => {
}, oo = 1, ao = 2, so = 4, io = 8, sr = 3, ir = 12;
let Et;
function cr() {
  return Et === void 0 && (Et = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (Et = !0)), Et;
}
function gc({
  cursorFlags: e,
  groups: t,
  state: n
}) {
  let r = 0, a = 0;
  switch (n) {
    case "active":
    case "hover":
      t.forEach((o) => {
        if (!o.mutableState.disableCursor)
          switch (o.orientation) {
            case "horizontal": {
              r++;
              break;
            }
            case "vertical": {
              a++;
              break;
            }
          }
      });
  }
  if (!(r === 0 && a === 0)) {
    switch (n) {
      case "active": {
        if (e && cr()) {
          const o = (e & oo) !== 0, s = (e & ao) !== 0, l = (e & so) !== 0, c = (e & io) !== 0;
          if (o)
            return l ? "se-resize" : c ? "ne-resize" : "e-resize";
          if (s)
            return l ? "sw-resize" : c ? "nw-resize" : "w-resize";
          if (l)
            return "s-resize";
          if (c)
            return "n-resize";
        }
        break;
      }
    }
    return cr() ? r > 0 && a > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && a > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const lr = /* @__PURE__ */ new WeakMap();
function Mn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = lr.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = ze();
  switch (r.state) {
    case "active":
    case "hover": {
      const a = gc({
        cursorFlags: r.cursorFlags,
        groups: r.hitRegions.map((s) => s.group),
        state: r.state
      }), o = `*, *:hover {cursor: ${a} !important; }`;
      if (t === o)
        return;
      t = o, a ? n.cssRules.length === 0 ? n.insertRule(o) : n.replaceSync(o) : n.cssRules.length === 1 && n.deleteRule(0);
      break;
    }
    case "inactive": {
      t = void 0, n.cssRules.length === 1 && n.deleteRule(0);
      break;
    }
  }
  lr.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let Ie = /* @__PURE__ */ new Map();
const co = new ro();
function bc(e) {
  Ie = new Map(Ie), Ie.delete(e);
}
function dr(e, t) {
  for (const [n] of Ie)
    if (n.id === e)
      return n;
}
function Ce(e, t) {
  for (const [n, r] of Ie)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function je() {
  return Ie;
}
function kn(e, t) {
  return co.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function ke(e, t, n) {
  const r = Ie.get(e);
  Ie = new Map(Ie), Ie.set(e, t), co.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function lo(e) {
  const t = ze();
  let n = !1;
  switch (t.state) {
    case "active":
      Ye({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (Mn(e), n = !0, t.hitRegions.forEach((r) => {
        const a = Ce(r.group.id, !0);
        ke(r.group, a, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function ur(e) {
  e.defaultPrevented || lo(e.currentTarget);
}
function yc(e, t, n) {
  let r, a = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const o of t) {
    const s = to(n, o.rect);
    switch (e) {
      case "horizontal": {
        s.x <= a.x && (r = o, a = s);
        break;
      }
      case "vertical": {
        s.y <= a.y && (r = o, a = s);
        break;
      }
    }
  }
  return r ? {
    distance: a,
    hitRegion: r
  } : void 0;
}
function vc(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function wc(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: hr(e),
    b: hr(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  Z(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const a = {
    a: mr(fr(n.a)),
    b: mr(fr(n.b))
  };
  if (a.a === a.b) {
    const o = r.childNodes, s = {
      a: n.a.at(-1),
      b: n.b.at(-1)
    };
    let l = o.length;
    for (; l--; ) {
      const c = o[l];
      if (c === s.a) return 1;
      if (c === s.b) return -1;
    }
  }
  return Math.sign(a.a - a.b);
}
const Sc = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function Pc(e) {
  const t = getComputedStyle(uo(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function Ic(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || Pc(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || Sc.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function fr(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (Z(n, "Missing node"), Ic(n)) return n;
  }
  return null;
}
function mr(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function hr(e) {
  const t = [];
  for (; e; )
    t.push(e), e = uo(e);
  return t;
}
function uo(e) {
  const { parentNode: t } = e;
  return vc(t) ? t.host : t;
}
function Rc(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function Tc({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!eo(n) || n.contains(e) || e.contains(n))
    return !0;
  if (wc(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (Rc(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function An(e, t) {
  const n = [];
  return t.forEach((r, a) => {
    if (a.disabled)
      return;
    const o = no(a), s = yc(a.orientation, o, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && Tc({
      groupElement: a.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function Ec(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function me(e, t, n = 0) {
  return Math.abs(he(e) - he(t)) <= n;
}
function Pe(e, t) {
  return me(e, t) ? 0 : e > t ? 1 : -1;
}
function qe({
  overrideDisabledPanels: e,
  panelConstraints: t,
  prevSize: n,
  size: r
}) {
  const {
    collapsedSize: a = 0,
    collapsible: o,
    disabled: s,
    maxSize: l = 100,
    minSize: c = 0
  } = t;
  if (s && !e)
    return n;
  if (Pe(r, c) < 0)
    if (o) {
      const i = (a + c) / 2;
      Pe(r, i) < 0 ? r = a : r = c;
    } else
      r = c;
  return r = Math.min(l, r), r = he(r), r;
}
function pt({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: a,
  trigger: o
}) {
  if (me(e, 0))
    return t;
  const s = o === "imperative-api", l = Object.values(t), c = Object.values(a), i = [...l], [d, u] = r;
  Z(d != null, "Invalid first pivot index"), Z(u != null, "Invalid second pivot index");
  let f = 0;
  switch (o) {
    case "keyboard": {
      {
        const p = e < 0 ? u : d, g = n[p];
        Z(
          g,
          `Panel constraints not found for index ${p}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: P,
          minSize: w = 0
        } = g;
        if (P) {
          const b = l[p];
          if (Z(
            b != null,
            `Previous layout not found for panel index ${p}`
          ), me(b, y)) {
            const S = w - b;
            Pe(S, Math.abs(e)) > 0 && (e = e < 0 ? 0 - S : S);
          }
        }
      }
      {
        const p = e < 0 ? d : u, g = n[p];
        Z(
          g,
          `No panel constraints found for index ${p}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: P,
          minSize: w = 0
        } = g;
        if (P) {
          const b = l[p];
          if (Z(
            b != null,
            `Previous layout not found for panel index ${p}`
          ), me(b, w)) {
            const S = b - y;
            Pe(S, Math.abs(e)) > 0 && (e = e < 0 ? 0 - S : S);
          }
        }
      }
      break;
    }
    default: {
      const p = e < 0 ? u : d, g = n[p];
      Z(
        g,
        `Panel constraints not found for index ${p}`
      );
      const y = l[p], { collapsible: P, collapsedSize: w, minSize: b } = g;
      if (P && Pe(y, b) < 0)
        if (e > 0) {
          const S = b - w, N = S / 2, E = y + e;
          Pe(E, b) < 0 && (e = Pe(e, N) <= 0 ? 0 : S);
        } else {
          const S = b - w, N = 100 - S / 2, E = y - e;
          Pe(E, b) < 0 && (e = Pe(100 + e, N) > 0 ? 0 : -S);
        }
      break;
    }
  }
  {
    const p = e < 0 ? 1 : -1;
    let g = e < 0 ? u : d, y = 0;
    for (; ; ) {
      const w = l[g];
      Z(
        w != null,
        `Previous layout not found for panel index ${g}`
      );
      const b = qe({
        overrideDisabledPanels: s,
        panelConstraints: n[g],
        prevSize: w,
        size: 100
      }) - w;
      if (y += b, g += p, g < 0 || g >= n.length)
        break;
    }
    const P = Math.min(Math.abs(e), Math.abs(y));
    e = e < 0 ? 0 - P : P;
  }
  {
    let p = e < 0 ? d : u;
    for (; p >= 0 && p < n.length; ) {
      const g = Math.abs(e) - Math.abs(f), y = l[p];
      Z(
        y != null,
        `Previous layout not found for panel index ${p}`
      );
      const P = y - g, w = qe({
        overrideDisabledPanels: s,
        panelConstraints: n[p],
        prevSize: y,
        size: P
      });
      if (!me(y, w) && (f += y - w, i[p] = w, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? p-- : p++;
    }
  }
  if (Ec(c, i))
    return a;
  {
    const p = e < 0 ? u : d, g = l[p];
    Z(
      g != null,
      `Previous layout not found for panel index ${p}`
    );
    const y = g + f, P = qe({
      overrideDisabledPanels: s,
      panelConstraints: n[p],
      prevSize: g,
      size: y
    });
    if (i[p] = P, !me(P, y)) {
      let w = y - P, b = e < 0 ? u : d;
      for (; b >= 0 && b < n.length; ) {
        const S = i[b];
        Z(
          S != null,
          `Previous layout not found for panel index ${b}`
        );
        const N = S + w, E = qe({
          overrideDisabledPanels: s,
          panelConstraints: n[b],
          prevSize: S,
          size: N
        });
        if (me(S, E) || (w -= E - S, i[b] = E), me(w, 0))
          break;
        e > 0 ? b-- : b++;
      }
    }
  }
  const m = Object.values(i).reduce(
    (p, g) => g + p,
    0
  );
  if (!me(m, 100, 0.1))
    return a;
  const v = Object.keys(a);
  return i.reduce((p, g, y) => (p[v[y]] = g, p), {});
}
function Oe(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || Pe(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function Fe({
  layout: e,
  panelConstraints: t
}) {
  const n = Object.values(e), r = [...n], a = r.reduce(
    (l, c) => l + c,
    0
  );
  if (r.length !== t.length)
    throw Error(
      `Invalid ${t.length} panel layout: ${r.map((l) => `${l}%`).join(", ")}`
    );
  if (!me(a, 100) && r.length > 0)
    for (let l = 0; l < t.length; l++) {
      const c = r[l];
      Z(c != null, `No layout data found for index ${l}`);
      const i = 100 / a * c;
      r[l] = i;
    }
  let o = 0;
  for (let l = 0; l < t.length; l++) {
    const c = n[l];
    Z(c != null, `No layout data found for index ${l}`);
    const i = r[l];
    Z(i != null, `No layout data found for index ${l}`);
    const d = qe({
      overrideDisabledPanels: !0,
      panelConstraints: t[l],
      prevSize: c,
      size: i
    });
    i != d && (o += i - d, r[l] = d);
  }
  if (!me(o, 0))
    for (let l = 0; l < t.length; l++) {
      const c = r[l];
      Z(c != null, `No layout data found for index ${l}`);
      const i = c + o, d = qe({
        overrideDisabledPanels: !0,
        panelConstraints: t[l],
        prevSize: c,
        size: i
      });
      if (c !== d && (o -= d - c, r[l] = d, me(o, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((l, c, i) => (l[s[i]] = c, l), {});
}
function fo({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const c = je();
    for (const [
      i,
      {
        defaultLayoutDeferred: d,
        derivedPanelConstraints: u,
        layout: f,
        groupSize: m,
        separatorToPanels: v
      }
    ] of c)
      if (i.id === e)
        return {
          defaultLayoutDeferred: d,
          derivedPanelConstraints: u,
          group: i,
          groupSize: m,
          layout: f,
          separatorToPanels: v
        };
    throw Error(`Group ${e} not found`);
  }, r = () => {
    const c = n().derivedPanelConstraints.find(
      (i) => i.panelId === t
    );
    if (c !== void 0)
      return c;
    throw Error(`Panel constraints not found for Panel ${t}`);
  }, a = () => {
    const c = n().group.panels.find((i) => i.id === t);
    if (c !== void 0)
      return c;
    throw Error(`Layout not found for Panel ${t}`);
  }, o = () => {
    const c = n().layout[t];
    if (c !== void 0)
      return c;
    throw Error(`Layout not found for Panel ${t}`);
  }, s = ({
    nextSize: c,
    panels: i,
    prevLayout: d,
    derivedPanelConstraints: u
  }) => {
    const f = o(), m = i.findIndex((g) => g.id === t), v = m === 0, p = m === i.length - 1;
    if (p && c < f && (v || i.slice(0, m).every((g, y) => {
      const P = u[y];
      return (P == null ? void 0 : P.collapsible) && me(P.collapsedSize, d[P.panelId]);
    }))) {
      const g = i.slice(0, m).reduce((y, P) => y + d[P.id], 0);
      return {
        ...d,
        [t]: he(100 - g)
      };
    }
    return pt({
      delta: p ? f - c : c - f,
      initialLayout: d,
      panelConstraints: u,
      pivotIndices: p ? [m - 1, m] : [m, m + 1],
      prevLayout: d,
      trigger: "imperative-api"
    });
  }, l = (c) => {
    const i = o();
    if (c === i)
      return;
    const {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      group: f,
      groupSize: m,
      layout: v,
      separatorToPanels: p
    } = n(), g = s({
      nextSize: c,
      panels: f.panels,
      prevLayout: v,
      derivedPanelConstraints: u
    }), y = Fe({
      layout: g,
      panelConstraints: u
    });
    Oe(v, y) || ke(f, {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      groupSize: m,
      layout: y,
      separatorToPanels: p
    });
  };
  return {
    collapse: () => {
      const { collapsible: c, collapsedSize: i } = r(), { mutableValues: d } = a(), u = o();
      c && u !== i && (d.expandToSize = u, l(i));
    },
    expand: () => {
      const { collapsible: c, collapsedSize: i, minSize: d } = r(), { mutableValues: u } = a(), f = o();
      if (c && f === i) {
        let m = u.expandToSize ?? d;
        m === 0 && (m = 1), l(m);
      }
    },
    getSize: () => {
      const { group: c } = n(), i = o(), { element: d } = a(), u = c.orientation === "horizontal" ? d.offsetWidth : d.offsetHeight;
      return {
        asPercentage: i,
        inPixels: u
      };
    },
    isCollapsed: () => {
      const { collapsible: c, collapsedSize: i } = r(), d = o();
      return c && me(i, d);
    },
    resize: (c) => {
      const { group: i } = n(), { element: d } = a(), u = Qe({ group: i }), f = st({
        groupSize: u,
        panelElement: d,
        styleProp: c
      }), m = he(f / u * 100);
      l(m);
    }
  };
}
function pr(e) {
  if (e.defaultPrevented)
    return;
  const t = je();
  An(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (a) => a.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const a = r.panelConstraints.defaultSize, o = fo({
          groupId: n.group.id,
          panelId: r.id
        });
        o && a !== void 0 && (o.resize(a), e.preventDefault());
      }
    }
  });
}
function kt(e) {
  const t = je();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function mo({
  groupId: e
}) {
  const t = () => {
    const n = je();
    for (const [r, a] of n)
      if (r.id === e)
        return { group: r, ...a };
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
        derivedPanelConstraints: a,
        group: o,
        groupSize: s,
        layout: l,
        separatorToPanels: c
      } = t(), i = Fe({
        layout: n,
        panelConstraints: a
      });
      return r ? l : (Oe(l, i) || ke(o, {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: a,
        groupSize: s,
        layout: i,
        separatorToPanels: c
      }), i);
    }
  };
}
function De(e, t) {
  const n = kt(e), r = Ce(n.id, !0), a = n.separators.find(
    (d) => d.element === e
  );
  Z(a, "Matching separator not found");
  const o = r.separatorToPanels.get(a);
  Z(o, "Matching panels not found");
  const s = o.map((d) => n.panels.indexOf(d)), l = mo({ groupId: n.id }).getLayout(), c = pt({
    delta: t,
    initialLayout: l,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: l,
    trigger: "keyboard"
  }), i = Fe({
    layout: c,
    panelConstraints: r.derivedPanelConstraints
  });
  Oe(l, i) || ke(
    n,
    {
      defaultLayoutDeferred: r.defaultLayoutDeferred,
      derivedPanelConstraints: r.derivedPanelConstraints,
      groupSize: r.groupSize,
      layout: i,
      separatorToPanels: r.separatorToPanels
    },
    // Keyboard resizes (arrow keys, Home/End, Enter collapse/expand) originate
    // from a real DOM event on the separator, so they are user interactions
    // just like pointer drags. This function is only reached from
    // onDocumentKeyDown. See #716.
    { isUserInteraction: !0 }
  );
}
function gr(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = kt(t);
  if (!n.disabled)
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault(), n.orientation === "vertical" && De(t, 5);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault(), n.orientation === "horizontal" && De(t, -5);
        break;
      }
      case "ArrowRight": {
        e.preventDefault(), n.orientation === "horizontal" && De(t, 5);
        break;
      }
      case "ArrowUp": {
        e.preventDefault(), n.orientation === "vertical" && De(t, -5);
        break;
      }
      case "End": {
        e.preventDefault(), De(t, 100);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const r = kt(t), a = Ce(r.id, !0), { derivedPanelConstraints: o, layout: s, separatorToPanels: l } = a, c = r.separators.find(
          (f) => f.element === t
        );
        Z(c, "Matching separator not found");
        const i = l.get(c);
        Z(i, "Matching panels not found");
        const d = i[0], u = o.find(
          (f) => f.panelId === d.id
        );
        if (Z(u, "Panel metadata not found"), u.collapsible) {
          const f = s[d.id], m = u.collapsedSize === f ? r.mutableState.expandedPanelSizes[d.id] ?? u.minSize : u.collapsedSize;
          De(t, m - f);
        }
        break;
      }
      case "F6": {
        e.preventDefault();
        const r = kt(t).separators.map(
          (s) => s.element
        ), a = Array.from(r).findIndex(
          (s) => s === e.currentTarget
        );
        Z(a !== null, "Index not found");
        const o = e.shiftKey ? a > 0 ? a - 1 : r.length - 1 : a + 1 < r.length ? a + 1 : 0;
        r[o].focus({
          preventScroll: !0
        });
        break;
      }
      case "Home": {
        e.preventDefault(), De(t, -100);
        break;
      }
    }
}
function br(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = je(), n = An(e, t), r = /* @__PURE__ */ new Map();
  let a = !1;
  n.forEach((o) => {
    o.separator && (a || (a = !0, o.separator.element.focus({
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
      focusVisible: !1,
      preventScroll: !0
    })));
    const s = t.get(o.group);
    s && r.set(o.group, s.layout);
  }), Ye({
    cursorFlags: 0,
    hitRegions: n,
    initialLayoutMap: r,
    pointerDownAtPoint: { x: e.clientX, y: e.clientY },
    state: "active"
  }), n.length && e.preventDefault();
}
function ho({
  document: e,
  event: t,
  hitRegions: n,
  initialLayoutMap: r,
  mountedGroups: a,
  pointerDownAtPoint: o,
  prevCursorFlags: s
}) {
  let l = 0;
  n.forEach((i) => {
    const { group: d, groupSize: u } = i, { orientation: f, panels: m } = d, { disableCursor: v } = d.mutableState;
    let p = 0;
    o ? f === "horizontal" ? p = (t.clientX - o.x) / u * 100 : p = (t.clientY - o.y) / u * 100 : f === "horizontal" ? p = t.clientX < 0 ? -100 : 100 : p = t.clientY < 0 ? -100 : 100;
    const g = r.get(d), y = a.get(d);
    if (!g || !y)
      return;
    const {
      defaultLayoutDeferred: P,
      derivedPanelConstraints: w,
      groupSize: b,
      layout: S,
      separatorToPanels: N
    } = y;
    if (w && S && N) {
      const E = pt({
        delta: p,
        initialLayout: g,
        panelConstraints: w,
        pivotIndices: i.panels.map((_) => m.indexOf(_)),
        prevLayout: S,
        trigger: "mouse-or-touch"
      });
      if (Oe(E, S)) {
        if (p !== 0 && !v)
          switch (f) {
            case "horizontal": {
              l |= p < 0 ? oo : ao;
              break;
            }
            case "vertical": {
              l |= p < 0 ? so : io;
              break;
            }
          }
      } else
        ke(i.group, {
          defaultLayoutDeferred: P,
          derivedPanelConstraints: w,
          groupSize: b,
          layout: E,
          separatorToPanels: N
        });
    }
  });
  let c = 0;
  t.movementX === 0 ? c |= s & sr : c |= l & sr, t.movementY === 0 ? c |= s & ir : c |= l & ir, hc(c), Mn(e);
}
function yr(e) {
  const t = je(), n = ze();
  switch (n.state) {
    case "active":
      ho({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function vr(e) {
  var r, a;
  if (e.defaultPrevented)
    return;
  const t = ze(), n = je();
  switch (t.state) {
    case "active": {
      if (
        // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
        e.buttons === 0
      ) {
        Ye({
          cursorFlags: 0,
          state: "inactive"
        }), t.hitRegions.forEach((o) => {
          const s = Ce(o.group.id, !0);
          ke(o.group, s, {
            isUserInteraction: !0
          });
        });
        return;
      }
      for (const o of t.hitRegions)
        if (o.separator) {
          const { element: s } = o.separator;
          (r = s.hasPointerCapture) != null && r.call(s, e.pointerId) || ((a = s.setPointerCapture) == null || a.call(s, e.pointerId));
        }
      ho({
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
      const o = An(e, n);
      o.length === 0 ? t.state !== "inactive" && Ye({
        cursorFlags: 0,
        state: "inactive"
      }) : Ye({
        cursorFlags: 0,
        hitRegions: o,
        state: "hover"
      }), Mn(e.currentTarget);
      break;
    }
  }
}
function wr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (ze().state) {
      case "hover":
        Ye({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function Sr(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || lo(e.currentTarget) && e.preventDefault();
}
function Pr(e) {
  let t = 0, n = 0;
  const r = {};
  for (const o of e)
    if (o.defaultSize !== void 0) {
      t++;
      const s = he(o.defaultSize);
      n += s, r[o.panelId] = s;
    } else
      r[o.panelId] = void 0;
  const a = e.length - t;
  if (a !== 0) {
    const o = he((100 - n) / a);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = o);
  }
  return r;
}
function Mc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((c) => c.element === t);
  if (!r || !r.onResize)
    return;
  const a = Qe({ group: e }), o = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, l = {
    asPercentage: he(o / a * 100),
    inPixels: o
  };
  r.mutableValues.prevSize = l, r.onResize(l, r.id, s);
}
function kc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Ac({
  group: e,
  nextGroupSize: t,
  prevGroupSize: n,
  prevLayout: r
}) {
  if (n <= 0 || t <= 0 || n === t)
    return r;
  let a = 0, o = 0, s = !1;
  const l = /* @__PURE__ */ new Map(), c = [];
  for (const u of e.panels) {
    const f = r[u.id] ?? 0;
    switch (u.panelConstraints.groupResizeBehavior) {
      case "preserve-pixel-size": {
        s = !0;
        const m = f / 100 * n, v = he(
          m / t * 100
        );
        l.set(u.id, v), a += v;
        break;
      }
      case "preserve-relative-size":
      default: {
        c.push(u.id), o += f;
        break;
      }
    }
  }
  if (!s || c.length === 0)
    return r;
  const i = 100 - a, d = { ...r };
  if (l.forEach((u, f) => {
    d[f] = u;
  }), o > 0)
    for (const u of c) {
      const f = r[u] ?? 0;
      d[u] = he(
        f / o * i
      );
    }
  else {
    const u = he(
      i / c.length
    );
    for (const f of c)
      d[f] = u;
  }
  return d;
}
function Nc(e, t) {
  const n = e.map((a) => a.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const a of n)
    if (!r.includes(a))
      return !1;
  return !0;
}
const We = /* @__PURE__ */ new Map();
function xc(e) {
  let t = !0;
  Z(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = new n((v) => {
    for (const p of v) {
      const { borderBoxSize: g, target: y } = p;
      if (y === e.element) {
        if (t) {
          const P = Qe({ group: e });
          if (P === 0)
            return;
          const w = Ce(e.id);
          if (!w)
            return;
          const b = an(e), S = w.defaultLayoutDeferred ? Pr(b) : w.layout, N = Ac({
            group: e,
            nextGroupSize: P,
            prevGroupSize: w.groupSize,
            prevLayout: S
          }), E = Fe({
            layout: N,
            panelConstraints: b
          });
          if (!w.defaultLayoutDeferred && Oe(w.layout, E) && kc(
            w.derivedPanelConstraints,
            b
          ) && w.groupSize === P)
            return;
          ke(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: b,
            groupSize: P,
            layout: E,
            separatorToPanels: w.separatorToPanels
          });
        }
      } else
        Mc(e, y, g);
    }
  });
  o.observe(e.element), e.panels.forEach((v) => {
    Z(
      !r.has(v.id),
      `Panel ids must be unique; id "${v.id}" was used more than once`
    ), r.add(v.id), v.onResize && o.observe(v.element);
  });
  const s = Qe({ group: e }), l = an(e), c = e.panels.map(({ id: v }) => v).join(",");
  let i = e.mutableState.defaultLayout;
  i && (Nc(e.panels, i) || (i = void 0));
  const d = e.mutableState.layouts[c] ?? i ?? Pr(l), u = Fe({
    layout: d,
    panelConstraints: l
  }), f = e.element.ownerDocument;
  We.set(
    f,
    (We.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return no(e).forEach((v) => {
    v.separator && m.set(v.separator, v.panels);
  }), ke(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: l,
    groupSize: s,
    layout: u,
    separatorToPanels: m
  }), e.separators.forEach((v) => {
    Z(
      !a.has(v.id),
      `Separator ids must be unique; id "${v.id}" was used more than once`
    ), a.add(v.id), v.element.addEventListener("keydown", gr);
  }), We.get(f) === 1 && (f.addEventListener("contextmenu", ur, !0), f.addEventListener("dblclick", pr, !0), f.addEventListener("pointerdown", br, !0), f.addEventListener("pointerleave", yr), f.addEventListener("pointermove", vr), f.addEventListener("pointerout", wr), f.addEventListener("pointerup", Sr, !0)), function() {
    t = !1, We.set(
      f,
      Math.max(0, (We.get(f) ?? 0) - 1)
    ), bc(e), e.separators.forEach((v) => {
      v.element.removeEventListener("keydown", gr);
    }), We.get(f) || (f.removeEventListener(
      "contextmenu",
      ur,
      !0
    ), f.removeEventListener(
      "dblclick",
      pr,
      !0
    ), f.removeEventListener(
      "pointerdown",
      br,
      !0
    ), f.removeEventListener("pointerleave", yr), f.removeEventListener("pointermove", vr), f.removeEventListener("pointerout", wr), f.removeEventListener("pointerup", Sr, !0)), o.disconnect();
  };
}
function Lc() {
  const [e, t] = L({}), n = A(() => t({}), []);
  return [e, n];
}
function Nn(e) {
  const t = pn();
  return `${e ?? t}`;
}
const Ue = typeof window < "u" ? $e : O;
function lt(e) {
  const t = x(e);
  return Ue(() => {
    t.current = e;
  }, [e]), A(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function xn(...e) {
  return lt((t) => {
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
function Ln(e) {
  const t = x({ ...e });
  return Ue(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const po = mn(null);
function Cc(e, t) {
  const n = x({
    getLayout: () => ({}),
    setLayout: pc
  });
  fn(t, () => n.current, []), Ue(() => {
    Object.assign(
      n.current,
      mo({ groupId: e })
    );
  });
}
function go({
  children: e,
  className: t,
  defaultLayout: n,
  disableCursor: r,
  disabled: a,
  elementRef: o,
  groupRef: s,
  id: l,
  onLayoutChange: c,
  onLayoutChanged: i,
  orientation: d = "horizontal",
  resizeTargetMinimumSize: u = {
    coarse: 20,
    fine: 10
  },
  style: f,
  ...m
}) {
  const v = x({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), p = lt((R) => {
    Oe(v.current.onLayoutChange, R) || (v.current.onLayoutChange = R, c == null || c(R));
  }), g = lt(
    (R, I) => {
      Oe(v.current.onLayoutChanged, R) || (v.current.onLayoutChanged = R, i == null || i(R, { isUserInteraction: I }));
    }
  ), y = Nn(l), P = x(null), [w, b] = Lc(), S = x({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: u,
    separators: []
  }), N = xn(P, o);
  Cc(y, s);
  const E = lt(
    (R, I) => {
      const k = ze(), D = dr(R), $ = Ce(R);
      if ($) {
        let B = !1;
        switch (k.state) {
          case "active": {
            B = k.hitRegions.some(
              (Y) => Y.group === D
            );
            break;
          }
        }
        return {
          flexGrow: $.layout[I] ?? 1,
          pointerEvents: B ? "none" : void 0
        };
      }
      if (n != null && n[I])
        return {
          flexGrow: n == null ? void 0 : n[I]
        };
    }
  ), _ = Ln({
    defaultLayout: n,
    disableCursor: r
  }), T = V(
    () => ({
      get disableCursor() {
        return !!_.disableCursor;
      },
      getPanelStyles: E,
      id: y,
      orientation: d,
      registerPanel: (R) => {
        const I = S.current;
        return I.panels = sn(d, [
          ...I.panels,
          R
        ]), b(), () => {
          I.panels = I.panels.filter(
            (k) => k !== R
          ), b();
        };
      },
      registerSeparator: (R) => {
        const I = S.current;
        return I.separators = sn(d, [
          ...I.separators,
          R
        ]), b(), () => {
          I.separators = I.separators.filter(
            (k) => k !== R
          ), b();
        };
      },
      updatePanelProps: (R, { disabled: I }) => {
        const k = S.current.panels.find(
          (B) => B.id === R
        );
        k && (k.panelConstraints.disabled = I);
        const D = dr(y), $ = Ce(y);
        D && $ && ke(D, {
          ...$,
          derivedPanelConstraints: an(D)
        });
      },
      updateSeparatorProps: (R, {
        disabled: I,
        disableDoubleClick: k
      }) => {
        const D = S.current.separators.find(
          ($) => $.id === R
        );
        D && (D.disabled = I, D.disableDoubleClick = k);
      }
    }),
    [E, y, b, d, _]
  ), M = x(null);
  return Ue(() => {
    const R = P.current;
    if (R === null)
      return;
    const I = S.current;
    let k;
    if (_.defaultLayout !== void 0 && Object.keys(_.defaultLayout).length === I.panels.length) {
      k = {};
      for (const K of I.panels) {
        const X = _.defaultLayout[K.id];
        X !== void 0 && (k[K.id] = X);
      }
    }
    const D = {
      disabled: !!a,
      element: R,
      id: y,
      mutableState: {
        defaultLayout: k,
        disableCursor: !!_.disableCursor,
        expandedPanelSizes: S.current.lastExpandedPanelSizes,
        layouts: S.current.layouts
      },
      orientation: d,
      panels: I.panels,
      resizeTargetMinimumSize: I.resizeTargetMinimumSize,
      separators: I.separators
    };
    M.current = D;
    const $ = xc(D), { defaultLayoutDeferred: B, derivedPanelConstraints: Y, layout: j } = Ce(D.id, !0);
    !B && Y.length > 0 && (p(j), g(j, !1));
    const W = kn(y, (K) => {
      const { defaultLayoutDeferred: X, derivedPanelConstraints: ae, layout: U } = K.next;
      if (X || ae.length === 0)
        return;
      const q = D.panels.map(({ id: ne }) => ne).join(",");
      D.mutableState.layouts[q] = U, ae.forEach((ne) => {
        if (ne.collapsible) {
          const { layout: de } = K.prev ?? {};
          if (de) {
            const ue = me(
              ne.collapsedSize,
              U[ne.panelId]
            ), pe = me(
              ne.collapsedSize,
              de[ne.panelId]
            );
            ue && !pe && (D.mutableState.expandedPanelSizes[ne.panelId] = de[ne.panelId]);
          }
        }
      });
      const te = ze().state !== "active";
      p(U), te && g(U, K.isUserInteraction);
    });
    return () => {
      M.current = null, $(), W();
    };
  }, [
    a,
    y,
    g,
    p,
    d,
    w,
    _
  ]), O(() => {
    const R = M.current;
    R && (R.mutableState.defaultLayout = n, R.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ h(po.Provider, { value: T, children: /* @__PURE__ */ h(
    "div",
    {
      ...m,
      className: t,
      "data-group": !0,
      "data-testid": y,
      id: y,
      ref: N,
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
go.displayName = "Group";
function Cn() {
  const e = hn(po);
  return Z(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function _c(e, t) {
  const { id: n } = Cn(), r = x({
    collapse: Vt,
    expand: Vt,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Vt
  });
  fn(t, () => r.current, []), Ue(() => {
    Object.assign(
      r.current,
      fo({ groupId: n, panelId: e })
    );
  });
}
function cn({
  children: e,
  className: t,
  collapsedSize: n = "0%",
  collapsible: r = !1,
  defaultSize: a,
  disabled: o,
  elementRef: s,
  groupResizeBehavior: l = "preserve-relative-size",
  id: c,
  maxSize: i = "100%",
  minSize: d = "0%",
  onResize: u,
  panelRef: f,
  style: m,
  ...v
}) {
  const p = !!c, g = Nn(c), y = Ln({
    disabled: o
  }), P = x(null), w = xn(P, s), {
    getPanelStyles: b,
    id: S,
    orientation: N,
    registerPanel: E,
    updatePanelProps: _
  } = Cn(), T = u !== null, M = lt(
    (D, $, B) => {
      u == null || u(D, c, B);
    }
  );
  Ue(() => {
    const D = P.current;
    if (D !== null) {
      const $ = {
        element: D,
        id: g,
        idIsStable: p,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: T ? M : void 0,
        panelConstraints: {
          groupResizeBehavior: l,
          collapsedSize: n,
          collapsible: r,
          defaultSize: a,
          disabled: y.disabled,
          maxSize: i,
          minSize: d
        }
      };
      return E($);
    }
  }, [
    l,
    n,
    r,
    a,
    T,
    g,
    p,
    i,
    d,
    M,
    E,
    y
  ]), O(() => {
    _(g, { disabled: o });
  }, [o, g, _]), _c(g, f);
  const R = () => {
    const D = b(S, g);
    if (D)
      return JSON.stringify(D);
  }, I = ko(
    (D) => kn(S, D),
    R,
    R
  );
  let k;
  return I ? k = JSON.parse(I) : a !== void 0 ? k = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: a
  } : k = { flexGrow: 1 }, /* @__PURE__ */ h(
    "div",
    {
      ...v,
      "data-disabled": o || void 0,
      "data-panel": !0,
      "data-testid": g,
      id: g,
      ref: w,
      style: {
        ...Dc,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...k
      },
      children: /* @__PURE__ */ h(
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
            touchAction: N === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
cn.displayName = "Panel";
const Dc = {
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
function zc({
  layout: e,
  panelConstraints: t,
  panelId: n,
  panelIndex: r
}) {
  let a, o;
  const s = e[n], l = t.find(
    (c) => c.panelId === n
  );
  if (l) {
    const c = l.maxSize, i = l.collapsible ? l.collapsedSize : l.minSize, d = [r, r + 1];
    o = Fe({
      layout: pt({
        delta: i - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], a = Fe({
      layout: pt({
        delta: c - s,
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
    valueMax: a,
    valueMin: o,
    valueNow: s
  };
}
function bo({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: a,
  id: o,
  style: s,
  ...l
}) {
  const c = Nn(o), i = Ln({
    disabled: n,
    disableDoubleClick: r
  }), [d, u] = L({}), [f, m] = L("inactive"), [v, p] = L(!1), g = x(null), y = xn(g, a), {
    disableCursor: P,
    id: w,
    orientation: b,
    registerSeparator: S,
    updateSeparatorProps: N
  } = Cn(), E = b === "horizontal" ? "vertical" : "horizontal";
  Ue(() => {
    const M = g.current;
    if (M !== null) {
      const R = {
        disabled: i.disabled,
        disableDoubleClick: i.disableDoubleClick,
        element: M,
        id: c
      }, I = S(R), k = mc(
        ($) => {
          m(
            $.next.state !== "inactive" && $.next.hitRegions.some(
              (B) => B.separator === R
            ) ? $.next.state : "inactive"
          );
        }
      ), D = kn(
        w,
        ($) => {
          const { derivedPanelConstraints: B, layout: Y, separatorToPanels: j } = $.next, W = j.get(R);
          if (W) {
            const K = W[0], X = W.indexOf(K);
            u(
              zc({
                layout: Y,
                panelConstraints: B,
                panelId: K.id,
                panelIndex: X
              })
            );
          }
        }
      );
      return () => {
        k(), D(), I();
      };
    }
  }, [w, c, S, i]), O(() => {
    N(c, { disabled: n, disableDoubleClick: r });
  }, [n, r, c, N]);
  let _;
  n && !P && (_ = "not-allowed");
  let T;
  if (n)
    T = "disabled";
  else
    switch (f) {
      case "active": {
        T = "active";
        break;
      }
      default:
        v ? T = "focus" : T = f;
    }
  return /* @__PURE__ */ h(
    "div",
    {
      ...l,
      "aria-controls": d.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": E,
      "aria-valuemax": d.valueMax,
      "aria-valuemin": d.valueMin,
      "aria-valuenow": d.valueNow,
      children: e,
      className: t,
      "data-separator": T,
      "data-testid": c,
      id: c,
      onBlur: () => p(!1),
      onFocus: () => p(!0),
      ref: y,
      role: "separator",
      style: {
        flexBasis: "auto",
        cursor: _,
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
bo.displayName = "Separator";
const _n = 30, Dn = 65, gt = 50, Oc = 100 - Dn, Fc = 100 - _n;
function $c(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Dn, Math.max(_n, t)) : gt;
}
function zn(e) {
  return 100 - e;
}
function Je(e) {
  return `${e}%`;
}
const On = "reader-document", bt = "reader-assistant", yo = "retainpdf.reader.ai-split-layout.v1", jc = {
  [On]: zn(gt),
  [bt]: gt
};
function Fn(e) {
  const t = $c(e == null ? void 0 : e[bt]);
  return {
    [On]: zn(t),
    [bt]: t
  };
}
function Uc() {
  try {
    const e = JSON.parse(localStorage.getItem(yo) || "null");
    return Fn(e);
  } catch {
    return jc;
  }
}
function Bc(e) {
  try {
    localStorage.setItem(yo, JSON.stringify(Fn(e)));
  } catch {
  }
}
function Gt(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = Fn(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[bt]}vw`
  );
}
function Hc() {
  const e = x(null), [t] = L(Uc);
  $e(() => {
    const a = e.current;
    return Gt(a, t), () => {
      var o;
      (o = a == null ? void 0 : a.closest(".reader-react-root")) == null || o.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = A((a) => {
    Gt(e.current, a);
  }, []), r = A((a, o) => {
    Gt(e.current, a), o.isUserInteraction && Bc(a);
  }, []);
  return /* @__PURE__ */ C(
    go,
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
        /* @__PURE__ */ h(
          cn,
          {
            id: On,
            defaultSize: Je(zn(gt)),
            minSize: Je(Oc),
            maxSize: Je(Fc)
          }
        ),
        /* @__PURE__ */ h(
          bo,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ h("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ h(
          cn,
          {
            id: bt,
            defaultSize: Je(gt),
            minSize: Je(_n),
            maxSize: Je(Dn)
          }
        )
      ]
    }
  );
}
const xe = 12, Wc = 4;
function Ve(e, t, n) {
  if (typeof window > "u") return { x: e, y: t };
  const r = Math.min(n, window.innerWidth - xe * 2), a = Math.max(xe, window.innerWidth - r - xe), o = Math.min(window.innerHeight * 0.9, 860), s = Math.max(xe, window.innerHeight - o - xe);
  return {
    x: Math.min(a, Math.max(xe, e)),
    y: Math.min(s, Math.max(xe, t))
  };
}
function Ir(e) {
  if (typeof window > "u") return { x: 24, y: 72 };
  const t = Math.min(e, window.innerWidth - xe * 2);
  return Ve(window.innerWidth - t - 20, 72, e);
}
function Jc(e, t) {
  try {
    const n = localStorage.getItem(e);
    if (!n) return Ir(t);
    const r = JSON.parse(n);
    if (typeof r.x == "number" && typeof r.y == "number")
      return Ve(r.x, r.y, t);
  } catch {
  }
  return Ir(t);
}
function Kc(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
}
function vo({
  id: e,
  open: t,
  title: n,
  subtitle: r = "拖动标题可移动",
  titleIcon: a,
  storageKey: o,
  ariaLabel: s,
  className: l = "",
  width: c = 360,
  placement: i = "floating",
  showHeader: d = !0,
  onClose: u,
  toolbar: f,
  children: m
}) {
  const v = i === "workspace", p = i === "dock-right", g = p || v, [y, P] = L(() => Jc(o, c)), [w, b] = L(!1), S = x(null);
  O(() => {
    !t || g || P((T) => Ve(T.x, T.y, c));
  }, [g, t, c]), O(() => {
    if (!t || g) return;
    const T = () => P((M) => Ve(M.x, M.y, c));
    return window.addEventListener("resize", T), () => window.removeEventListener("resize", T);
  }, [g, t, c]), O(() => {
    if (!t) return;
    const T = (M) => {
      var I;
      if (M.key !== "Escape") return;
      const R = M.target;
      (I = R == null ? void 0 : R.closest) != null && I.call(R, "textarea, input, select, [contenteditable='true']") || (M.preventDefault(), u());
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [t, u]);
  const N = A((T) => {
    var M, R;
    g || T.button === 0 && ((R = (M = T.target) == null ? void 0 : M.closest) != null && R.call(M, "button") || (T.currentTarget.setPointerCapture(T.pointerId), S.current = {
      pointerId: T.pointerId,
      startX: T.clientX,
      startY: T.clientY,
      originX: y.x,
      originY: y.y,
      moved: !1
    }, b(!0)));
  }, [g, y.x, y.y]), E = A((T) => {
    const M = S.current;
    if (!M || M.pointerId !== T.pointerId) return;
    const R = T.clientX - M.startX, I = T.clientY - M.startY;
    !M.moved && Math.hypot(R, I) < Wc || (M.moved = !0, P(Ve(M.originX + R, M.originY + I, c)));
  }, [c]), _ = A((T) => {
    const M = S.current;
    if (!(!M || M.pointerId !== T.pointerId)) {
      S.current = null, b(!1);
      try {
        T.currentTarget.releasePointerCapture(T.pointerId);
      } catch {
      }
      M.moved && P((R) => {
        const I = Ve(R.x, R.y, c);
        return Kc(o, I), I;
      });
    }
  }, [o, c]);
  return t ? /* @__PURE__ */ C(
    "aside",
    {
      id: e,
      className: `reader-notes-panel reader-notes-panel--${v ? "workspace" : p ? "docked" : "float"}${g ? "" : " reader-floating-surface"}${d ? " has-panel-header" : " is-headerless"}${f ? " has-panel-toolbar" : ""}${w ? " is-dragging" : ""} ${l}`.trim(),
      style: g ? void 0 : { left: y.x, top: y.y, width: Math.min(c, typeof window < "u" ? window.innerWidth - 24 : c) },
      "aria-label": s,
      role: "dialog",
      "aria-modal": "false",
      children: [
        d ? /* @__PURE__ */ C(
          "header",
          {
            className: "reader-notes-panel-head",
            onPointerDown: N,
            onPointerMove: E,
            onPointerUp: _,
            onPointerCancel: _,
            children: [
              g ? null : /* @__PURE__ */ h("div", { className: "reader-notes-panel-drag", "aria-hidden": "true", children: /* @__PURE__ */ h(Qo, { size: 14, strokeWidth: 2.25 }) }),
              /* @__PURE__ */ C("div", { className: "reader-notes-panel-head-text", children: [
                /* @__PURE__ */ C("strong", { children: [
                  a,
                  n
                ] }),
                r ? /* @__PURE__ */ h("span", { children: r }) : null
              ] }),
              /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-close reader-floating-close", "aria-label": `关闭${n}`, onClick: u, children: /* @__PURE__ */ h(et, { size: 14, strokeWidth: 2.5, "aria-hidden": !0 }) })
            ]
          }
        ) : null,
        f ? /* @__PURE__ */ h("div", { className: "reader-notes-panel-toolbar", children: f }) : null,
        /* @__PURE__ */ h("div", { className: "reader-notes-panel-body", children: m })
      ]
    }
  ) : null;
}
function qc({
  note: e,
  onJump: t,
  onUpdateNote: n,
  onRemove: r
}) {
  const [a, o] = L(!1), [s, l] = L(e.note);
  return O(() => {
    a || l(e.note);
  }, [e.note, a]), /* @__PURE__ */ C("article", { className: "reader-notes-item", children: [
    /* @__PURE__ */ C("div", { className: "reader-notes-item-top", children: [
      /* @__PURE__ */ h("span", { className: "reader-notes-kind", children: e.pane === "translated" ? "译文" : "原文" }),
      /* @__PURE__ */ C("div", { className: "reader-notes-item-actions", children: [
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-link", onClick: () => t(e), children: "定位" }),
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-danger", onClick: () => r(e.id), children: "删除" })
      ] })
    ] }),
    /* @__PURE__ */ h("p", { className: "reader-notes-quote", children: e.quote }),
    a ? /* @__PURE__ */ C("div", { className: "reader-notes-editor", children: [
      /* @__PURE__ */ h(
        "textarea",
        {
          className: "reader-notes-textarea",
          value: s,
          placeholder: "写点想法…",
          rows: 3,
          onChange: (c) => l(c.target.value)
        }
      ),
      /* @__PURE__ */ C("div", { className: "reader-notes-editor-actions", children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: "reader-notes-primary",
            onClick: () => {
              n(e.id, s), o(!1);
            },
            children: "保存"
          }
        ),
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-link", onClick: () => o(!1), children: "取消" })
      ] })
    ] }) : e.note ? /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-notes-note",
        onClick: () => o(!0),
        title: "点击编辑",
        children: e.note
      }
    ) : /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-add-note", onClick: () => o(!0), children: "添加笔记" })
  ] });
}
function Vc({
  open: e,
  groups: t,
  count: n,
  onClose: r,
  onJump: a,
  onUpdateNote: o,
  onRemove: s,
  onExport: l
}) {
  const [c, i] = L(!1);
  return /* @__PURE__ */ h(
    vo,
    {
      id: "reader-notes-panel",
      open: e,
      title: "批注",
      subtitle: "选中 PDF 文字后可添加 · 本地保存",
      titleIcon: /* @__PURE__ */ h(Ft, { size: 14, strokeWidth: 2.25, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.notes-float.pos.v1",
      ariaLabel: "批注",
      onClose: r,
      toolbar: /* @__PURE__ */ C(Ot, { children: [
        /* @__PURE__ */ C("span", { className: "reader-notes-count", children: [
          n,
          " 条"
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            disabled: c || n === 0,
            onClick: async () => {
              await l() && (i(!0), window.setTimeout(() => i(!1), 1800));
            },
            children: c ? "已复制" : "导出 Markdown"
          }
        )
      ] }),
      children: n === 0 ? /* @__PURE__ */ h("p", { className: "reader-notes-empty", children: "暂无批注。在 PDF 上拖选文字，点「添加批注」。" }) : t.map((d) => /* @__PURE__ */ C("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ C("h3", { className: "reader-notes-group-title", children: [
          "第 ",
          d.page,
          " 页"
        ] }),
        d.items.map((u) => /* @__PURE__ */ h(
          qc,
          {
            note: u,
            onJump: a,
            onUpdateNote: o,
            onRemove: s
          },
          u.id
        ))
      ] }, d.page))
    }
  );
}
function Gc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = L(!1);
  if (O(() => {
    !e && !t && r(!1);
  }, [e, t]), n || !e && !t)
    return null;
  const a = [
    e ? "译文区域" : "",
    t ? "阅读元数据" : ""
  ].filter(Boolean);
  return /* @__PURE__ */ C("div", { className: "reader-error-notice", role: "status", "data-reader-error-notice": "true", children: [
    /* @__PURE__ */ C("span", { className: "reader-error-notice-text", children: [
      a.join("、"),
      "加载失败，正文仍可正常阅读。"
    ] }),
    /* @__PURE__ */ h(
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
function Yc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: a = !1,
  metadataError: o = !1
}) {
  return !e && !t ? /* @__PURE__ */ h(Gc, { regionsFailed: a, metadataFailed: o }) : /* @__PURE__ */ C(Ot, { children: [
    e ? /* @__PURE__ */ h("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ C("div", { className: "reader-boot-loading-card", children: [
      /* @__PURE__ */ h("div", { className: "reader-boot-loading-text", children: n }),
      /* @__PURE__ */ h("div", { className: "reader-boot-loading-track", children: /* @__PURE__ */ h(
        "span",
        {
          className: "reader-boot-loading-bar",
          style: { width: `${Math.max(0, Math.min(100, r))}%` }
        }
      ) })
    ] }) }) : null,
    t ? /* @__PURE__ */ h("div", { className: "reader-react-error", role: "alert", children: n }) : null
  ] });
}
async function Zc(e) {
  var a;
  const t = `${e || ""}`;
  if (!t) throw new Error("empty selection");
  try {
    if ((a = navigator.clipboard) != null && a.writeText) {
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
function Xc({
  selection: e,
  onDismiss: t,
  onAskAi: n,
  onAddNote: r
}) {
  const [a, o] = L(!1), s = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if (O(() => o(!1), [s]), !e)
    return null;
  const l = typeof window < "u" ? window.innerWidth : 800, c = typeof window < "u" ? window.innerHeight : 600, i = e.rect.left + e.rect.width / 2, d = 170, u = Math.min(Math.max(16 + d, i), l - 16 - d), f = e.rect.top > 72, m = f ? Math.max(12, e.rect.top - 8) : Math.min(c - 12, e.rect.top + e.rect.height + 8), v = f ? "above" : "below", p = e.pane === "translated" ? "译文" : "原文", g = e.selectionType === "text" ? "text" : e.kind, y = e.selectionType === "text" ? e.quote : xr(e.region, e.pane), P = g === "formula" ? "公式" : g === "table" ? "表格" : g === "figure" ? "图片" : g === "text" ? "文字" : "区域", w = g === "formula" ? Bo(y) : y, b = g === "formula" ? ea : g === "table" ? ta : g === "text" ? na : ra;
  return /* @__PURE__ */ C(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${v} reader-sel-pop--region`,
      style: { left: u, top: m },
      role: "toolbar",
      "aria-label": "选区操作",
      onPointerDown: (S) => {
        S.preventDefault();
      },
      children: [
        /* @__PURE__ */ C("div", { className: "reader-sel-pop-card reader-floating-surface", children: [
          /* @__PURE__ */ C("div", { className: "reader-sel-pop-context", children: [
            /* @__PURE__ */ h(b, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { children: P }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ h("span", { children: p }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ C("span", { children: [
              e.page,
              " 页"
            ] })
          ] }),
          /* @__PURE__ */ C("div", { className: "reader-sel-pop-actions", children: [
            w ? /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--primary",
                onClick: async () => {
                  try {
                    await Zc(w), o(!0), window.setTimeout(() => o(!1), 1400);
                  } catch (S) {
                    console.warn("[reader-selection] copy failed", S);
                  }
                },
                children: [
                  a ? /* @__PURE__ */ h(oa, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ h(aa, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: a ? "已复制" : g === "formula" ? "复制 LaTeX" : "复制" })
                ]
              }
            ) : /* @__PURE__ */ h("span", { className: "reader-sel-pop-selection-hint", children: "已选择图片" }),
            r && w ? /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => r({ page: e.page, pane: e.pane, quote: w }),
                children: [
                  /* @__PURE__ */ h(Ft, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: "添加批注" })
                ]
              }
            ) : null,
            n ? /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => n(e),
                children: [
                  /* @__PURE__ */ h(bn, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: "问 AI" })
                ]
              }
            ) : null,
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--ghost",
                onClick: t,
                "aria-label": "取消选区",
                title: "取消",
                children: /* @__PURE__ */ h(et, { size: 15, strokeWidth: 2.5, "aria-hidden": !0 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ h("span", { className: "reader-sel-pop-caret", "aria-hidden": "true" })
      ]
    }
  );
}
function Qc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function el() {
  const [e, t] = L(!1), n = pn(), r = x(null);
  return O(() => {
    if (!e) return;
    const a = (s) => {
      const l = r.current;
      l && s.target instanceof Node && !l.contains(s.target) && t(!1);
    }, o = (s) => {
      s.key === "Escape" && (s.preventDefault(), t(!1));
    };
    return document.addEventListener("mousedown", a), window.addEventListener("keydown", o), () => {
      document.removeEventListener("mousedown", a), window.removeEventListener("keydown", o);
    };
  }, [e]), O(() => {
    const a = (o) => {
      if (o.defaultPrevented || o.metaKey || o.ctrlKey || o.altKey || Qc(o.target)) return;
      const s = o.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !o.shiftKey)
          return;
        o.preventDefault(), t((l) => !l);
      }
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, []), /* @__PURE__ */ C("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: `reader-react-hud-btn reader-react-shortcuts-btn${e ? " is-active" : ""}`,
        "aria-label": "快捷键说明",
        "aria-expanded": e,
        "aria-controls": n,
        title: "快捷键（H 或 ?）",
        onClick: () => t((a) => !a),
        children: /* @__PURE__ */ h(sa, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    ),
    e ? /* @__PURE__ */ C(
      "div",
      {
        id: n,
        className: "reader-react-shortcuts-panel reader-floating-surface",
        role: "dialog",
        "aria-label": "阅读器快捷键",
        children: [
          /* @__PURE__ */ C("div", { className: "reader-react-shortcuts-head", children: [
            /* @__PURE__ */ h("strong", { children: "快捷键" }),
            /* @__PURE__ */ h(
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
          /* @__PURE__ */ h("div", { className: "reader-react-shortcuts-body", children: ii.map((a) => /* @__PURE__ */ C("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ h("h3", { children: a.title }),
            /* @__PURE__ */ h("ul", { children: a.items.map((o) => /* @__PURE__ */ C("li", { children: [
              /* @__PURE__ */ h("kbd", { children: o.keys }),
              /* @__PURE__ */ h("span", { children: o.desc })
            ] }, `${a.title}-${o.keys}`)) })
          ] }, a.title)) }),
          /* @__PURE__ */ h("p", { className: "reader-react-shortcuts-foot", children: "在输入框内不会触发快捷键" })
        ]
      }
    ) : null
  ] });
}
const tl = Object.freeze([
  {
    id: "favorites",
    label: "摘录",
    subIdle: "本书云端收藏",
    subOpen: "关闭悬浮窗",
    needsJob: !1
  },
  {
    id: "markdown",
    label: "Markdown",
    subIdle: "识别 / 译文文本",
    subOpen: "关闭悬浮窗",
    needsJob: !0
  },
  {
    id: "ai",
    label: "AI 问答",
    subIdle: "基于文档提问",
    subOpen: "关闭悬浮窗",
    needsJob: !0
  }
]), nl = ["source", "sideBySide", "translated"], rl = { source: "", translated: "", sideBySide: "" };
function ol(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = ut(e.sourceUrl), n = ut(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return Ra({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function al(e) {
  const [t, n] = L(() => /* @__PURE__ */ new Set()), r = V(
    () => e ? ol(e) : rl,
    [e]
  ), a = V(
    () => nl.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), o = A(async (s) => {
    if (!e) return;
    const l = ut(r[s]);
    if (!(!l || t.has(s)))
      try {
        const c = e.jobId ? Ia(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await Ta(
          e.fetchProtected,
          l,
          c,
          c,
          null,
          (i) => n((d) => {
            const u = new Set(d);
            return i ? u.add(s) : u.delete(s), u;
          })
        );
      } catch (c) {
        const i = c instanceof Error ? c.message : "下载失败";
        Ea(i), n((d) => {
          const u = new Set(d);
          return u.delete(s), u;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: a, busyActions: t, handleDownload: o };
}
function sl(e) {
  const [t, n] = L(!1), r = A(() => n(!1), []), a = A(() => n((o) => !o), []);
  return O(() => {
    if (!t) return;
    const o = (l) => {
      const c = e.current;
      c && l.target instanceof Node && !c.contains(l.target) && n(!1);
    }, s = (l) => {
      l.key === "Escape" && (l.preventDefault(), n(!1));
    };
    return document.addEventListener("mousedown", o), window.addEventListener("keydown", s), () => {
      document.removeEventListener("mousedown", o), window.removeEventListener("keydown", s);
    };
  }, [t, e]), { open: t, setOpen: n, closeMenu: r, toggleMenu: a };
}
const wo = "retainpdf.reader.fab.pos.v1", Dt = 52, Ke = 12, il = 6;
function dt(e, t) {
  if (typeof window > "u")
    return { x: e, y: t };
  const n = Math.max(Ke, window.innerWidth - Dt - Ke), r = Math.max(Ke, window.innerHeight - Dt - Ke);
  return {
    x: Math.min(n, Math.max(Ke, e)),
    y: Math.min(r, Math.max(Ke, t))
  };
}
function Rr() {
  return typeof window > "u" ? { x: 24, y: 120 } : dt(
    window.innerWidth - Dt - 20,
    window.innerHeight - Dt - 88
  );
}
function cl() {
  try {
    const e = localStorage.getItem(wo);
    if (!e) return Rr();
    const t = JSON.parse(e);
    if (typeof t.x == "number" && typeof t.y == "number")
      return dt(t.x, t.y);
  } catch {
  }
  return Rr();
}
function ll(e) {
  try {
    localStorage.setItem(wo, JSON.stringify(e));
  } catch {
  }
}
function dl(e) {
  return typeof window < "u" && e.y > window.innerHeight * 0.55;
}
function ul(e = {}) {
  const { onDragStart: t, onActivate: n } = e, [r, a] = L(() => cl()), o = x(null);
  O(() => {
    const i = () => a((d) => dt(d.x, d.y));
    return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, []);
  const s = A((i) => {
    i.button === 0 && (i.currentTarget.setPointerCapture(i.pointerId), o.current = {
      pointerId: i.pointerId,
      startX: i.clientX,
      startY: i.clientY,
      originX: r.x,
      originY: r.y,
      moved: !1
    });
  }, [r.x, r.y]), l = A((i) => {
    const d = o.current;
    if (!d || d.pointerId !== i.pointerId) return;
    const u = i.clientX - d.startX, f = i.clientY - d.startY;
    !d.moved && Math.hypot(u, f) < il || (d.moved || (d.moved = !0, t == null || t()), a(dt(d.originX + u, d.originY + f)));
  }, [t]), c = A((i) => {
    const d = o.current;
    if (!(!d || d.pointerId !== i.pointerId)) {
      o.current = null;
      try {
        i.currentTarget.releasePointerCapture(i.pointerId);
      } catch {
      }
      if (d.moved) {
        a((u) => {
          const f = dt(u.x, u.y);
          return ll(f), f;
        });
        return;
      }
      n == null || n();
    }
  }, [n]);
  return {
    pos: r,
    openUp: dl(r),
    onPointerDown: s,
    onPointerMove: l,
    onPointerUp: c
  };
}
const fl = {
  source: Lr,
  sideBySide: Cr,
  translated: _r
}, ml = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function hl({ onClose: e }) {
  return /* @__PURE__ */ C("header", { className: "reader-fab-menu-head", children: [
    /* @__PURE__ */ C("div", { className: "reader-fab-menu-head-text", children: [
      /* @__PURE__ */ h("strong", { children: "工具" }),
      /* @__PURE__ */ h("span", { children: "拖动圆钮可移动" })
    ] }),
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-fab-menu-close reader-floating-close",
        "aria-label": "关闭菜单",
        onClick: e,
        children: /* @__PURE__ */ h(et, { size: 14, strokeWidth: 2.5, "aria-hidden": !0 })
      }
    )
  ] });
}
function pl({
  index: e,
  icon: t,
  title: n,
  sub: r,
  active: a,
  disabled: o,
  onClick: s
}) {
  return /* @__PURE__ */ C(
    "button",
    {
      type: "button",
      role: "menuitem",
      className: `reader-fab-row${a ? " is-active" : ""}${o ? " is-disabled" : ""}`,
      "aria-pressed": a,
      disabled: o,
      onClick: s,
      style: { "--fab-i": e + 1 },
      children: [
        /* @__PURE__ */ h("span", { className: "reader-fab-row-icon", "aria-hidden": "true", children: /* @__PURE__ */ h(t, { size: 18, strokeWidth: 2 }) }),
        /* @__PURE__ */ C("span", { className: "reader-fab-row-copy", children: [
          /* @__PURE__ */ h("span", { className: "reader-fab-row-title", children: n }),
          /* @__PURE__ */ h("span", { className: "reader-fab-row-sub", children: r })
        ] })
      ]
    }
  );
}
function gl({
  urls: e,
  items: t,
  busyActions: n,
  onDownload: r
}) {
  return /* @__PURE__ */ C("div", { className: "reader-fab-section", role: "group", "aria-label": "下载", children: [
    /* @__PURE__ */ C("div", { className: "reader-fab-section-head", children: [
      /* @__PURE__ */ h(ia, { size: 12, strokeWidth: 2.5, "aria-hidden": !0 }),
      /* @__PURE__ */ h("span", { children: "下载 PDF" })
    ] }),
    /* @__PURE__ */ h("div", { className: "reader-fab-download-grid", children: t.map((a, o) => {
      const s = Co[a], l = ut(e[a]), c = n.has(a), i = !!l && !c, d = i ? "" : _o(a, e), u = fl[a];
      return /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          role: "menuitem",
          id: `reader-fab-download-${a}`,
          className: `reader-fab-chip${c ? " is-busy" : ""}${i ? "" : " is-disabled"}`,
          disabled: !i,
          title: i ? `下载${s.label}` : d,
          onClick: () => void r(a),
          style: { "--fab-i": o },
          children: [
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-icon", "aria-hidden": "true", children: /* @__PURE__ */ h(u, { size: 16, strokeWidth: 2 }) }),
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-label", children: ml[a] }),
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-state", children: c ? "…" : i ? "↓" : "—" })
          ]
        },
        a
      );
    }) }),
    t.every((a) => !ut(e[a])) ? /* @__PURE__ */ h("p", { className: "reader-fab-empty", children: "产物尚未就绪" }) : null
  ] });
}
const bl = {
  favorites: ca,
  markdown: Dr,
  ai: bn,
  notes: Ft
}, yl = tl;
function vl(e) {
  const { activeTool: t, noteCount: n, onToggleTool: r } = e, a = wt(), o = e.sourceOnly ?? (a == null ? void 0 : a.sourceOnly) ?? !1, s = e.download ?? (a == null ? void 0 : a.download), l = x(null), c = pn(), { open: i, setOpen: d, closeMenu: u, toggleMenu: f } = sl(l), { pos: m, openUp: v, onPointerDown: p, onPointerMove: g, onPointerUp: y } = ul({
    onDragStart: u,
    onActivate: f
  }), { urls: P, downloadItems: w, busyActions: b, handleDownload: S } = al(s), N = A((E) => {
    r(E), d(!1);
  }, [r, d]);
  return /* @__PURE__ */ C(
    "div",
    {
      ref: l,
      className: `reader-fab${i ? " is-open" : ""}${v ? " is-open-up" : ""}`,
      style: { left: m.x, top: m.y },
      "data-reader-fab": "",
      children: [
        i ? /* @__PURE__ */ C(
          "div",
          {
            id: c,
            className: "reader-fab-menu reader-floating-surface",
            role: "menu",
            "aria-label": "阅读工具",
            children: [
              /* @__PURE__ */ h(hl, { onClose: u }),
              (() => {
                const E = t === "notes";
                return /* @__PURE__ */ C(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    className: `reader-fab-row${E ? " is-active" : ""}`,
                    "aria-pressed": E,
                    onClick: () => N("notes"),
                    style: { "--fab-i": 0 },
                    children: [
                      /* @__PURE__ */ h("span", { className: "reader-fab-row-icon", "aria-hidden": "true", children: /* @__PURE__ */ h(Ft, { size: 18, strokeWidth: 2 }) }),
                      /* @__PURE__ */ C("span", { className: "reader-fab-row-copy", children: [
                        /* @__PURE__ */ h("span", { className: "reader-fab-row-title", children: "批注" }),
                        /* @__PURE__ */ h("span", { className: "reader-fab-row-sub", children: E ? "关闭悬浮窗" : "本地批注 · 导出" })
                      ] }),
                      n > 0 ? /* @__PURE__ */ h("span", { className: "reader-fab-row-badge", children: n }) : null
                    ]
                  }
                );
              })(),
              yl.map((E, _) => {
                const T = bl[E.id], M = t === E.id, R = E.needsJob && o;
                let I = M ? E.subOpen : E.subIdle;
                return R && (I = "需打开任务阅读"), /* @__PURE__ */ h(
                  pl,
                  {
                    index: _,
                    icon: T,
                    title: E.label,
                    sub: I,
                    active: M,
                    disabled: R,
                    onClick: () => N(E.id)
                  },
                  E.id
                );
              }),
              /* @__PURE__ */ h(
                gl,
                {
                  urls: P,
                  items: w,
                  busyActions: b,
                  onDownload: S
                }
              )
            ]
          }
        ) : null,
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: `reader-fab-trigger${i ? " is-open" : ""}${t ? " has-active-tool" : ""}`,
            "aria-label": i ? "收起工具菜单" : "打开工具菜单",
            "aria-expanded": i,
            "aria-controls": i ? c : void 0,
            "aria-haspopup": "menu",
            onPointerDown: p,
            onPointerMove: g,
            onPointerUp: y,
            onPointerCancel: y,
            children: /* @__PURE__ */ h("span", { className: "reader-fab-icon", "aria-hidden": "true", children: i ? /* @__PURE__ */ h(et, { size: 20, strokeWidth: 2.5 }) : /* @__PURE__ */ C("span", { className: "reader-fab-dots", children: [
              /* @__PURE__ */ h("i", {}),
              /* @__PURE__ */ h("i", {}),
              /* @__PURE__ */ h("i", {})
            ] }) })
          }
        )
      ]
    }
  );
}
function wl(e) {
  const t = wt(), n = Ji(), { mode: r = "compare", modeControls: a } = e, o = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? vt, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), l = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, c = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, i = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), d = ls(o), u = o > $r + 1e-3, f = o < jr - 1e-3, m = ct(), v = "50%（半屏，对照铺满）", [p, g] = L(!1), [y, P] = L(`${l}`);
  O(() => {
    p || P(`${Math.min(Math.max(l, 1), Math.max(c, 1))}`);
  }, [l, c, p]);
  const w = () => {
    if (g(!1), !i || c <= 0)
      return;
    const b = Number(`${y}`.trim());
    i(_t(b, c));
  };
  return /* @__PURE__ */ C("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    a ? /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-modes", children: a }) : null,
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group", "aria-label": "页码", children: p ? /* @__PURE__ */ C(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (b) => {
          b.preventDefault(), w();
        },
        children: [
          /* @__PURE__ */ h(
            "input",
            {
              className: "reader-react-hud-page-input",
              type: "text",
              inputMode: "numeric",
              pattern: "[0-9]*",
              "aria-label": "跳转到页码",
              value: y,
              autoFocus: !0,
              onChange: (b) => P(b.target.value.replace(/[^\d]/g, "")),
              onBlur: w,
              onKeyDown: (b) => {
                b.key === "Escape" && (b.preventDefault(), g(!1), P(`${l}`));
              }
            }
          ),
          /* @__PURE__ */ C("span", { className: "reader-react-hud-page-suffix", children: [
            "/ ",
            c || "—"
          ] })
        ]
      }
    ) : /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-react-hud-page reader-react-hud-page-btn",
        "aria-label": c > 0 ? `跳转页码，当前第 ${l} 页，共 ${c} 页` : "页码",
        title: c > 0 ? "点击输入页码跳转" : void 0,
        disabled: !i || c <= 0,
        onClick: () => {
          !i || c <= 0 || (P(`${l}`), g(!0));
        },
        children: c > 0 ? `${Math.min(l, c)} / ${c}` : "—"
      }
    ) }),
    /* @__PURE__ */ C("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "缩小",
          disabled: !u,
          onClick: () => s(ht(o, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn reader-react-hud-zoom-label",
          "aria-label": `重置为${v}`,
          title: v,
          onClick: () => s(m),
          children: [
            d,
            "%"
          ]
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "放大",
          disabled: !f,
          onClick: () => s(ht(o, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ h(el, {}) })
  ] });
}
function zt(e) {
  const t = `${e.documentId || ""}`.trim();
  if (t)
    return `${At}doc:${t}`;
  const n = `${e.jobId || ""}`.trim();
  return n ? `${At}job:${n}` : `${At}anonymous`;
}
const At = "retainpdf.reader.notes.v1:";
function Sl(e) {
  const t = `${e.jobId || ""}`.trim();
  if (!t)
    return [];
  const n = `${At}job:${t}`;
  return n === zt(e) ? [] : [n];
}
function Pl() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Il(e) {
  return {
    pageIdx: Number(e.page) - 1,
    quoteText: e.quote,
    note: e.note,
    createdAt: e.createdAt
  };
}
function So(e) {
  return Jo(e, (t) => t.page);
}
function Rl(e) {
  return qo(e, (t) => t.page).map((t) => ({ page: t.pageIdx, items: t.items }));
}
function Tl(e, t) {
  return Ko({
    title: e,
    annotations: t.map(Il)
  });
}
function El(e) {
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
function ln(e) {
  try {
    return El(localStorage.getItem(e));
  } catch {
    return [];
  }
}
function Ml(...e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const r of n)
      t.has(r.id) || t.set(r.id, r);
  return So([...t.values()]);
}
function kl(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch (r) {
    return console.warn("[reader-notes] persist failed", r), !1;
  }
  const n = new Set(ln(e).map((r) => r.id));
  return t.every((r) => n.has(r.id));
}
function Tr(e) {
  if (typeof localStorage > "u")
    return [];
  const t = zt(e), n = ln(t), r = Sl(e).map((o) => ({ key: o, notes: ln(o) })).filter((o) => o.notes.length > 0);
  if (r.length === 0)
    return n;
  const a = Ml(n, ...r.map((o) => o.notes));
  if (!kl(t, a))
    return a;
  for (const o of r)
    try {
      localStorage.removeItem(o.key);
    } catch {
    }
  return a;
}
function Al(e, t) {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.setItem(e, JSON.stringify(t));
    } catch (n) {
      console.warn("[reader-notes] persist failed", n);
    }
}
function Nl(e, t = {}) {
  const n = V(
    () => ({
      jobId: `${e.jobId || ""}`.trim(),
      documentId: `${e.documentId || ""}`.trim()
    }),
    [e.jobId, e.documentId]
  ), [r, a] = L(() => ({
    key: zt(n),
    notes: Tr(n)
  })), o = r.notes, s = A(
    (v) => {
      a((p) => ({
        key: p.key,
        notes: typeof v == "function" ? v(p.notes) : v
      }));
    },
    []
  ), l = t.onAfterAdd, c = zt(n);
  O(() => {
    a((v) => v.key === c ? v : { key: c, notes: Tr(n) });
  }, [n, c]), O(() => {
    Al(r.key, r.notes);
  }, [r]);
  const i = A((v) => {
    const p = `${v.quote || ""}`.trim();
    if (!p)
      return null;
    const g = {
      id: Pl(),
      page: Math.max(1, Math.floor(Number(v.page) || 1)),
      pane: v.pane === "translated" ? "translated" : "source",
      quote: p,
      note: `${v.note || ""}`.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s((y) => So([g, ...y])), l == null || l(), g;
  }, [l]), d = A((v, p) => {
    const g = `${p || ""}`.trim();
    s((y) => y.map((P) => P.id === v ? { ...P, note: g } : P));
  }, []), u = A((v) => {
    s((p) => p.filter((g) => g.id !== v));
  }, []), f = A(async (v = "") => {
    var g, y;
    const p = Tl(v, o);
    try {
      return await ((y = (g = navigator.clipboard) == null ? void 0 : g.writeText) == null ? void 0 : y.call(g, p)), !0;
    } catch (P) {
      return console.error("[reader-notes] copy failed", P), !1;
    }
  }, [o]), m = V(() => Rl(o), [o]);
  return {
    notes: o,
    groups: m,
    addFromQuote: i,
    updateNote: d,
    remove: u,
    exportMarkdown: f,
    count: o.length
  };
}
const dn = "download-toast";
function xl({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: a = "progress"
}) {
  const o = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ C("div", { className: "download-toast-card reader-floating-surface", "data-tone": a, "aria-live": "polite", children: [
    /* @__PURE__ */ C("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ h("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ h("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ h("div", { className: "download-toast-track", children: /* @__PURE__ */ h("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${o}%` } }) }),
    /* @__PURE__ */ h("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function Ll(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: a = "等待响应...",
    percent: o = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    Yt.dismiss(dn);
    return;
  }
  Yt.custom(
    () => /* @__PURE__ */ h(xl, { title: n, status: r, meta: a, percent: o, tone: s }),
    { id: dn, duration: 1 / 0 }
  );
}
function Cl() {
  const e = A((t) => {
    t && (t.setState = Ll, t.hide = () => Yt.dismiss(dn));
  }, []);
  return /* @__PURE__ */ C(Ot, { children: [
    /* @__PURE__ */ h(Vo, { position: "bottom-right" }),
    /* @__PURE__ */ h("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function Nt(e) {
  const t = x(!1);
  return e && (t.current = !0), t.current;
}
function _l({
  panel: e,
  active: t,
  context: n
}) {
  var c, i;
  const r = t === e.id, a = Nt(r);
  if (!(e.keepMounted ? a : r)) return null;
  const s = ce(), l = e.slot === "terminal" ? (c = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : c.call(s, {
    open: r,
    sessionKey: n.sessionKey,
    onClose: n.onClose
  }) : (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, {
    open: r,
    jobId: n.jobId,
    onJump: n.onJump,
    onClose: n.onClose
  });
  return l == null ? null : /* @__PURE__ */ h(
    vo,
    {
      id: `reader-${e.id}-panel`,
      open: r,
      title: e.label,
      storageKey: e.storageKey,
      ariaLabel: e.ariaLabel,
      width: e.width,
      placement: "workspace",
      showHeader: !1,
      className: "is-pane-right",
      onClose: n.onClose,
      children: l
    }
  );
}
const Er = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注"
};
function Dl({
  note: e,
  anchorRect: t,
  onJump: n,
  onClose: r
}) {
  const a = x(null);
  return O(() => {
    const o = (s) => {
      s.key === "Escape" && r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [r]), O(() => {
    const o = (s) => {
      var c, i;
      const l = a.current;
      !l || l.contains(s.target) || (i = (c = s.target) == null ? void 0 : c.closest) != null && i.call(c, ".reader-ai-note-mark") || r();
    };
    return document.addEventListener("pointerdown", o, !0), () => document.removeEventListener("pointerdown", o, !0);
  }, [r]), /* @__PURE__ */ C(
    "div",
    {
      ref: a,
      className: `reader-ai-note-popover is-${e.kind}`,
      role: "dialog",
      "aria-label": `${Er[e.kind]}批注`,
      style: {
        left: t.left + t.width + 8,
        top: t.top
      },
      children: [
        /* @__PURE__ */ C("header", { className: "reader-ai-note-popover-head", children: [
          /* @__PURE__ */ h("span", { className: `reader-ai-note-kind is-${e.kind}`, children: Er[e.kind] }),
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              className: "reader-ai-note-popover-close",
              "aria-label": "关闭批注",
              onClick: r,
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ h("p", { className: "reader-ai-note-popover-text", children: e.text }),
        e.refs.length > 0 ? /* @__PURE__ */ h("ul", { className: "reader-ai-note-refs", children: e.refs.map((o, s) => /* @__PURE__ */ h("li", { children: /* @__PURE__ */ C(
          "button",
          {
            type: "button",
            className: "reader-ai-note-ref",
            onClick: () => {
              n({ page_idx: o.pageIdx ?? void 0, block_id: o.blockId }), r();
            },
            children: [
              o.label,
              o.pageIdx != null ? /* @__PURE__ */ C("span", { className: "reader-ai-note-ref-page", children: [
                "第 ",
                o.pageIdx + 1,
                " 页"
              ] }) : null
            ]
          }
        ) }, `${o.blockId}-${s}`)) }) : (
          // 不隐藏这条：没有依据的批注该让人看得出来，自己判断信不信。
          /* @__PURE__ */ h("p", { className: "reader-ai-note-popover-weak", children: "没有给出依据（refs），多半只是复述原文" })
        )
      ]
    }
  );
}
const zl = ["question", "warning", "link", "term", "note"];
function it(e) {
  return typeof e == "string" ? e.trim() : "";
}
function Mr(e) {
  if (!e || typeof e != "object") return null;
  const t = e, n = it(t.block_id);
  if (!n) return null;
  const r = typeof t.page_idx == "number" && Number.isFinite(t.page_idx) ? Math.max(0, Math.floor(t.page_idx)) : null;
  return { blockId: n, pageIdx: r };
}
function Ol(e) {
  const t = Math.round(Number(e));
  return t === 1 || t === 2 ? t : 3;
}
function Fl(e) {
  if (!e || typeof e != "object") return null;
  const t = e.notes;
  if (!Array.isArray(t)) return null;
  const n = [], r = /* @__PURE__ */ new Set();
  return t.forEach((a, o) => {
    if (!a || typeof a != "object") return;
    const s = a, l = Mr(s.anchor), c = it(s.text);
    if (!l || !c) return;
    const i = it(s.id) || `ai-note-${o}`;
    if (r.has(i)) return;
    r.add(i);
    const d = it(s.kind), u = Array.isArray(s.refs) ? s.refs.flatMap((f) => {
      const m = Mr(f);
      if (!m) return [];
      const v = it(f == null ? void 0 : f.label);
      return [{ ...m, label: v || m.blockId }];
    }) : [];
    n.push({
      id: i,
      anchor: l,
      kind: zl.includes(d) ? d : "note",
      level: Ol(s.level),
      text: c,
      refs: u,
      weak: u.length === 0
    });
  }), n.length === 0 ? null : { notes: n, weakCount: n.filter((a) => a.weak).length };
}
const $l = 5e3;
function jl(e) {
  const [t, n] = L(null);
  return O(() => {
    if (!e) {
      n(null);
      return;
    }
    let r = !1, a = "";
    const o = async () => {
      var d;
      const l = (d = ce()) == null ? void 0 : d.defaultReaderDataPort;
      if (!(l != null && l.loadAiNotes)) return;
      const c = await l.loadAiNotes(e);
      if (r) return;
      const i = c == null ? "" : JSON.stringify(c);
      i !== a && (a = i, n(Fl(c)));
    };
    o();
    const s = setInterval(() => void o(), $l);
    return () => {
      r = !0, clearInterval(s);
    };
  }, [e]), t;
}
const Ul = gn(() => import("./ReaderFavoritesPanel-Ca4j9ctF.js").then((e) => ({ default: e.ReaderFavoritesPanel }))), Bl = gn(() => import("./ReaderMarkdownPanel-BheXZsVh.js").then((e) => ({ default: e.ReaderMarkdownPanel }))), Hl = gn(() => import("./ReaderAiPanel-6giGUvK0.js").then((e) => ({ default: e.ReaderAiPanel }))), Wl = [];
function Jl(e) {
  return "workspace";
}
function Kl(e) {
  const t = e.sourceOnly || !e.translatedUrl, n = !!(e.overlayContentAvailable && e.liveTranslationVisible && !e.assistantOpen), a = e.assistantPdfPane || (e.assistantOpen && e.mode === "compare" ? "source" : e.mode);
  return {
    kind: n ? "live-overlay" : a === "compare" ? "final-compare" : a === "translated" ? "translated-only" : "source-only",
    visibleMode: a,
    compareMode: a === "compare",
    showSource: n || a !== "translated",
    showTranslated: a === "translated" || a === "compare",
    overlayOnSource: n,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: t
  };
}
function ql(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function kr(e, t) {
  var n, r, a, o;
  return e === "compare" ? null : Ur(t == null ? void 0 : t.assistantPanel) ? t.assistantPanel : ((n = t == null ? void 0 : t.splitLayout) == null ? void 0 : n.left) === "ai" || ((r = t == null ? void 0 : t.splitLayout) == null ? void 0 : r.right) === "ai" ? "ai" : ((a = t == null ? void 0 : t.splitLayout) == null ? void 0 : a.left) === "markdown" || ((o = t == null ? void 0 : t.splitLayout) == null ? void 0 : o.right) === "markdown" ? "markdown" : null;
}
function Vl() {
  const e = ai(), { boot: t, panes: n, sessionFiles: r, tools: a, session: o } = e, [s, l] = L(() => kr(e.mode, Me(e.viewStateKey))), [c, i] = L(null), [d, u] = L(null), [f, m] = L(!1), v = x(e.viewStateKey), p = x(null), g = s !== null, y = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, P = Kl({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: y,
    liveTranslationVisible: f,
    assistantOpen: g,
    assistantPdfPane: c
  }), w = P.sourceViewOnly, b = P.visibleMode, [S, N] = L(!1), E = A(() => N(!0), []), _ = A(() => N((F) => !F), []), T = Nl(
    { jobId: o.jobId, documentId: o.documentId },
    { onAfterAdd: E }
  ), M = A((F) => {
    T.addFromQuote(F), e.clearSelection();
  }, [T.addFromQuote, e.clearSelection]), R = A((F) => {
    e.goToPage(F.page, F.pane === "translated" ? "translated" : "source");
  }, [e.goToPage]), I = A(
    () => T.exportMarkdown(o.title || ""),
    [T.exportMarkdown, o.title]
  );
  O(() => {
    u(null), m(!0), N(!1);
  }, [e.viewStateKey]), O(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), O(() => {
    if (!t.loading) {
      if (v.current !== e.viewStateKey) {
        v.current = e.viewStateKey;
        const F = Me(e.viewStateKey);
        l(kr(e.mode, F)), i(null);
        return;
      }
      Ct(e.viewStateKey, { assistantPanel: s, splitLayout: null });
    }
  }, [s, t.loading, e.mode, e.viewStateKey]), O(() => {
    if (!(t.loading || t.failed)) {
      if (p.current !== e.viewStateKey) {
        p.current = e.viewStateKey;
        const F = Me(e.viewStateKey), fe = w ? "source" : F == null ? void 0 : F.mode;
        fe && fe !== e.mode && e.setModeKeepingPage(fe);
        return;
      }
      Ct(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, w]);
  const k = s || (e.mode === "compare" ? "compare" : "reading"), D = Nt(a.isOpen("favorites")), $ = Nt(s === "markdown"), B = Nt(s === "ai");
  di({
    mode: b,
    sourceOnly: e.sourceOnly,
    setMode: e.setModeKeepingPage,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    currentPage: e.currentPage,
    numPages: n.hudNumPages,
    goToPage: e.goToPage,
    enabled: e.showHud
  });
  const Y = A(() => {
    a.close();
  }, [a]), j = A(() => {
    l(null), i(null), u(null);
  }, []), W = A((F) => {
    const fe = b === "translated" ? "translated" : "source";
    e.jumpToAnchor(F, fe);
  }, [e.jumpToAnchor, b]), K = A((F) => {
    o.refreshCommittedDocument(F);
  }, [o.refreshCommittedDocument]), X = A((F) => {
    a.close(), i(null);
    const fe = ql(F, e.liveTranslationAvailable);
    fe !== null && m(fe), e.setModeKeepingPage(F);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage, a]), ae = V(() => !y || !P.showSource ? null : /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m((F) => !F),
      "aria-pressed": f,
      title: f ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ), [y, P.showSource, f]), U = A((F) => {
    l(F), F !== "ai" && u(null);
  }, []), q = A((F) => {
    if (F === "notes") {
      _();
      return;
    }
    if (F === "markdown" || F === "ai") {
      s === F ? (l(null), i(null), u(null)) : (l(F), i(null), F !== "ai" && u(null));
      return;
    }
    a.toggle(F);
  }, [s, _, a]), te = ps(s) ? null : s, ne = S ? "notes" : te ?? a.active, de = jl(o.jobId), [ue, pe] = L(null), ye = A((F, fe) => {
    pe((Ae) => (Ae == null ? void 0 : Ae.note.id) === F.id ? null : { note: F, rect: fe });
  }, []), _e = A(() => pe(null), []);
  O(() => {
    pe(null);
  }, [o.jobId]);
  const Q = V(() => ({
    jobId: o.jobId,
    sessionKey: o.jobId || o.documentId || "reader",
    onJump: W,
    onClose: j
  }), [j, W, o.documentId, o.jobId]), ee = A((F) => {
    const fe = F.pane === "translated" && !w ? "translated" : "source";
    u(F), l("ai"), i(fe), e.clearSelection();
  }, [e.clearSelection, w]), se = V(() => ({
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
    aiNotes: (de == null ? void 0 : de.notes) ?? Wl,
    activeAiNoteId: (ue == null ? void 0 : ue.note.id) ?? null,
    onSelectAiNote: ye,
    readerMetadata: o.readerMetadata,
    activeRegion: e.activeRegion,
    onSelectRegion: e.selectRegion,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: w,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: U, close: j }
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
    w,
    e.download,
    e.goToPage,
    U,
    j
  ]), be = V(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), le = [
    ts,
    `is-workspace-${k}`,
    g ? "is-assistant-open" : "",
    P.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ h(Wi, { value: se, hud: be, children: /* @__PURE__ */ C("div", { className: le, "data-reader-engine": "react-pdf", "data-reader-workspace": k, children: [
    /* @__PURE__ */ h(Yc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ h(gi, { onBeforeClose: o.prepareClose }),
    /* @__PURE__ */ h(
      Qi,
      {
        mode: b,
        documentReady: !!o.jobId,
        sourceViewOnly: w,
        onModeChange: X,
        liveTranslation: y ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m((F) => !F)
        } : null
      }
    ),
    /* @__PURE__ */ h(rc, { active: s }),
    g ? /* @__PURE__ */ h(Hc, {}) : null,
    e.showHud ? /* @__PURE__ */ h(vl, { activeTool: ne, noteCount: T.count, onToggleTool: q }) : null,
    /* @__PURE__ */ h(Gi, { paneComposition: P, markdownSplit: s === "markdown", assistantSplit: g, liveTranslation: e.liveTranslation, sourcePaneAction: ae }),
    e.showHud ? /* @__PURE__ */ h(
      wl,
      {
        mode: b,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ C(Ao, { fallback: null, children: [
      D ? /* @__PURE__ */ h(Ul, { open: a.isOpen("favorites"), jobId: o.jobId, documentId: o.documentId, onClose: Y, onJumpPage: e.goToPage }) : null,
      Qr.map((F) => /* @__PURE__ */ h(
        _l,
        {
          panel: F,
          active: s,
          context: Q
        },
        F.id
      )),
      $ ? /* @__PURE__ */ h(Bl, { open: s === "markdown", jobId: o.jobId, sourceOnly: e.sourceOnly, layout: "workspace", side: "right", onClose: j }) : null,
      B ? /* @__PURE__ */ h(Hl, { open: s === "ai", jobId: o.jobId, documentId: o.documentId, sessionIdentity: o.sessionIdentity, layout: Jl(e.mode), side: "right", selectionContext: d, onClearSelectionContext: () => u(null), onClose: j, onJumpCitation: W, onDocumentCommitted: K }, o.documentId || o.jobId || "reader-ai-pending") : null
    ] }),
    ue ? /* @__PURE__ */ h(
      Dl,
      {
        note: ue.note,
        anchorRect: ue.rect,
        onJump: W,
        onClose: _e
      }
    ) : null,
    /* @__PURE__ */ h(
      Vc,
      {
        open: S,
        groups: T.groups,
        count: T.count,
        onClose: () => N(!1),
        onJump: R,
        onUpdateNote: T.updateNote,
        onRemove: T.remove,
        onExport: I
      }
    ),
    /* @__PURE__ */ h(Xc, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: ee, onAddNote: M }),
    /* @__PURE__ */ h(Cl, {})
  ] }) });
}
function vd() {
  return /* @__PURE__ */ h(Vl, {});
}
export {
  vn as A,
  vd as R,
  Vl as a,
  vo as b,
  yd as c,
  ud as d,
  dd as e,
  bd as f,
  md as g,
  fd as h,
  hd as i,
  gd as j,
  pd as r
};
//# sourceMappingURL=ReaderApp-3ZWL-tcJ.js.map
