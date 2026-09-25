var Ln = (e) => {
  throw TypeError(e);
};
var Cn = (e, t, n) => t.has(e) || Ln("Cannot " + n);
var Ze = (e, t, n) => (Cn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), xn = (e, t, n) => t.has(e) ? Ln("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), _n = (e, t, n, r) => (Cn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as L, jsx as p, Fragment as dt } from "react/jsx-runtime";
import { useMemo as V, useState as N, useEffect as O, useCallback as x, useRef as A, useLayoutEffect as De, memo as rn, forwardRef as Ro, useImperativeHandle as on, createContext as an, useContext as sn, useSyncExternalStore as To, useId as Ir, Suspense as Eo, lazy as cn } from "react";
import { requireAdapter as ye, getReaderAdapters as ie } from "./adapters.js";
import { resolveReaderDownloadName as Ao, createReaderServerFavoritesPort as ko, resolveReaderDownloadUrls as Mo, READER_PROGRESS_COPY as Pe, trimString as Tt, READER_DOWNLOAD_ACTIONS as No, disabledReason as Lo } from "./runtime/state.js";
import { d as Co } from "./ask-answerer-GNQdzitl.js";
import "@retainpdf/api/conversations";
import { r as xo, b as _o } from "./page-config-Ct7qR5rm.js";
import { c as zo, n as Do, f as wt, h as zn, a as Fo, b as Oo, i as Pr, p as ut, g as Rr, r as Tr, j as _t, e as $o } from "./reader-regions-DsePY7B_.js";
import { i as jo, c as Uo } from "./live-translation-CbniFg2b.js";
import { sortByPageAndCreatedAt as Bo, buildAnnotationsMarkdown as Ho, groupByPageAndCreatedAt as Jo } from "./runtime/content.js";
import { toast as Ht, Toaster as Wo } from "sonner";
import { X as ln, Radio as Ko, FileText as Er, Columns2 as Ar, Languages as kr, Bookmark as qo, Highlighter as Vo, StickyNote as Mr, Sparkles as Nr, FileCode2 as Go, SquareTerminal as Zo, PenTool as Yo, Route as Xo, Sigma as Qo, Table2 as ea, Type as ta, Image as na, Check as ra, Copy as oa, Keyboard as aa } from "lucide-react";
import { pdfjs as sa, Page as ia, Document as ca } from "react-pdf";
import { e as la, m as da, a as ua } from "./markdown-math-XkF5urpn.js";
const fa = (...e) => {
  var t, n;
  return ((n = (t = ie()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, ma = "", ha = Object.freeze({
  progress: "retainpdf-reader-progress"
}), pa = (e) => {
  var t, n;
  return ((n = (t = ie()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, Gl = (...e) => {
  var n;
  return (((n = ie()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Re = () => ye("defaultReaderDataPort"), Dn = () => ye("defaultReaderPageConfigPort"), Zl = {
  get apiPrefix() {
    return Re().apiPrefix;
  },
  fetchProtected: (...e) => Re().fetchProtected(...e),
  loadMarkdownPayload: (e) => Re().loadMarkdownPayload(e),
  loadMarkdownSource: (e) => Re().loadMarkdownSource(e),
  loadMarkdownRange: (e, t, n, r, o) => Re().loadMarkdownRange(e, t, n, r, o),
  loadJobPayload: (e) => Re().loadJobPayload(e),
  loadReaderPayload: (e, t) => Re().loadReaderPayload(e, t),
  loadAiNotes: (e) => Re().loadAiNotes(e),
  get liveTranslation() {
    return Re().liveTranslation;
  }
}, Lr = {
  messageTargetOrigin: () => Dn().messageTargetOrigin(),
  readerJobId: () => Dn().readerJobId()
}, ga = () => {
  var e;
  return ((e = ie()) == null ? void 0 : e.liveTranslation) ?? null;
}, ot = () => {
  var t;
  const e = ie();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, dn = () => {
  const e = ie();
  if (e != null && e.sessionData) return e.sessionData;
  const t = e == null ? void 0 : e.defaultReaderDataPort;
  if (!t) throw new Error("Reader adapter missing: defaultReaderDataPort (call setReaderAdapters)");
  return {
    loadReaderPayload: t.loadReaderPayload,
    loadJobPayload: t.loadJobPayload,
    fetchDocumentByJobId: (...n) => ye("fetchDocumentByJobId")(...n),
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
}, Yl = () => {
  var e;
  return ((e = ie()) == null ? void 0 : e.aiOperations) ?? null;
}, Xl = () => {
  var e;
  return ((e = ie()) == null ? void 0 : e.conversations) ?? null;
}, Ql = () => {
  var e;
  return ((e = ie()) == null ? void 0 : e.askChat) ?? null;
}, ba = (...e) => {
  var t, n;
  return ((n = (t = ie()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, ya = () => {
  var e, t;
  return ((t = (e = ie()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, va = (...e) => {
  var t, n;
  return ((n = (t = ie()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, Sa = (...e) => {
  var t, n;
  return ((n = (t = ie()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? Ao(...e);
}, wa = (...e) => {
  var t, n;
  return ((n = (t = ie()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? Mo(...e);
}, Ia = (...e) => ye("downloadProtectedResource")(...e), Pa = (...e) => ye("failDownloadToast")(...e), ed = (e, t) => ye("resolveMarkdownAssetUrl")(e, t), td = (e = {}) => {
  const t = ie();
  return Co({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) || "/api/v1",
    ask: t == null ? void 0 : t.askDocumentAi,
    documentByJobId: t == null ? void 0 : t.fetchDocumentByJobId,
    ...e
  });
}, un = "/api/v1", nd = (e = un, t = {}) => {
  var n;
  return ye("fetchFavorites")(
    ((n = ie()) == null ? void 0 : n.apiPrefix) ?? e,
    t
  );
};
function rd(e = {}) {
  const t = ie();
  return ko({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) ?? un,
    documentByJobId: (...n) => ye("fetchDocumentByJobId")(...n),
    submitFavorite: (...n) => ye("createFavorite")(...n),
    loadFavorites: (...n) => ye("fetchFavorites")(...n),
    removeFavorite: (...n) => ye("deleteFavorite")(...n),
    ...e
  });
}
function Ra() {
  const e = () => {
    var r;
    return xo(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = N(e);
  return O(() => {
    var c, i, l, d;
    const r = () => n(e()), o = (i = (c = globalThis.history) == null ? void 0 : c.pushState) == null ? void 0 : i.bind(globalThis.history), a = (d = (l = globalThis.history) == null ? void 0 : l.replaceState) == null ? void 0 : d.bind(globalThis.history);
    let s = !1;
    if (o && a)
      try {
        const u = (f) => function(...h) {
          const g = f.apply(this, h);
          return r(), globalThis.dispatchEvent(new Event("pushstate")), globalThis.dispatchEvent(new Event("replacestate")), globalThis.dispatchEvent(new Event("locationchange")), g;
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
function Ta() {
  const e = Ra(), t = V(() => va(Lr), [e]), n = V(() => ya(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function Ea(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: o,
    documentIdRef: a,
    sessionJobIdRef: s,
    switchToSourceMode: c
  } = e, [i, l] = N({
    documentId: "",
    jobId: ""
  }), [d, u] = N({
    documentId: "",
    jobId: ""
  }), f = i.documentId === t ? i.jobId : "", h = d.documentId === t ? d.jobId : "", g = n || f, [m, v] = N({
    jobId: "",
    documentId: ""
  }), y = m.jobId === g ? m.documentId : "", I = t || y, w = !!t && !g, [b, S] = N(null), E = (b == null ? void 0 : b.sessionIdentity) === r && b.documentId === I ? b : null, M = w || !!E, z = x((F) => {
    const R = `${F.documentId || ""}`.trim();
    if (!R || a.current && a.current !== R) return;
    if (!a.current && s.current)
      v({
        jobId: s.current,
        documentId: R
      });
    else if (!a.current)
      return;
    const P = `${F.revision || ""}`.trim() || `${Date.now()}`;
    S({
      documentId: R,
      revision: P,
      sessionIdentity: o.current
    }), c();
  }, []);
  O(() => {
    S((F) => F && F.sessionIdentity !== r ? null : F);
  }, [r]);
  const C = x((F) => {
    switch (F.type) {
      case "resolved-document-job":
        l({ documentId: F.documentId, jobId: F.jobId });
        break;
      case "cleared-resolved-document-job":
        l({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        u({ documentId: F.documentId, jobId: F.jobId });
        break;
      case "resolved-job-document":
        v((R) => R.jobId === F.jobId && R.documentId === F.documentId ? R : { jobId: F.jobId, documentId: F.documentId });
        break;
      case "committed-source":
        S({
          documentId: F.documentId,
          revision: F.revision,
          sessionIdentity: F.sessionIdentity
        });
        break;
    }
  }, []);
  return {
    resolvedDocumentJob: i,
    setResolvedDocumentJob: l,
    missingDocumentJob: d,
    setMissingDocumentJob: u,
    documentJobId: f,
    rejectedDocumentJobId: h,
    sessionJobId: g,
    resolvedJobDocument: m,
    setResolvedJobDocument: v,
    jobDocumentId: y,
    documentId: I,
    sourceOnly: w,
    committedDocumentSource: b,
    setCommittedDocumentSource: S,
    activeCommittedDocumentSource: E,
    sourceViewOnly: M,
    refreshCommittedDocument: z,
    applyIdentityEvent: C
  };
}
const Aa = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Fn(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function ka(e) {
  var r, o, a, s;
  if (!e || typeof e != "object") return "";
  const t = e, n = [
    t.document_id,
    t.documentId,
    (r = t.document) == null ? void 0 : r.document_id,
    (o = t.book_summary) == null ? void 0 : o.document_id,
    (s = (a = t.request_payload) == null ? void 0 : a.source) == null ? void 0 : s.document_id
  ];
  for (const c of n) {
    const i = `${c || ""}`.trim();
    if (i) return i;
  }
  return "";
}
function On(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return pa(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function Ma(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function Na(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !Ma(a, t))
      return a.replace(/\.pdf$/i, "");
  }
  return "";
}
function Jt({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: ha.progress,
        stage: n,
        percent: e,
        text: t
      },
      Lr.messageTargetOrigin()
    );
  } catch {
  }
}
function Et(e, t, n, r = "progress") {
  e({
    loading: !0,
    percent: t,
    text: n,
    stage: r,
    failed: !1
  }), Jt({ percent: t, text: n, stage: r });
}
function La(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [c, i] = N(null), [l, d] = N(null), [u, f] = N(""), [h, g] = N(0), m = u === n ? c : null, v = u === n ? l : null, y = Fn(m), I = Aa.has(y), w = x(() => {
    g((C) => C + 1);
  }, []), b = x((C) => {
    i(C.jobPayload), d(C.manifestPayload), f(C.sessionIdentity);
  }, []), S = x((C) => {
    i(null), d(null), f(C);
  }, []), E = A(""), M = A(""), z = x(async () => {
    const C = o.current;
    if (!C || E.current === C) return;
    const F = dn().loadJobPayload;
    if (typeof F != "function") return;
    const R = a.current.value;
    E.current = C;
    try {
      const P = await F(C);
      if (s.current || a.current.value !== R || o.current !== C || !P || typeof P != "object")
        return;
      const T = Fn(P);
      i(P), f(r.current), T === "succeeded" && M.current !== C && (M.current = C, g((k) => k + 1));
    } catch {
    } finally {
      E.current === C && (E.current = "");
    }
  }, []);
  return O(() => {
    M.current = "";
  }, [n]), O(() => {
    if (!t || I || !m) return;
    const C = window.setInterval(() => {
      z();
    }, 1e3);
    return () => window.clearInterval(C);
  }, [I, z, m, t]), {
    jobPayload: c,
    setJobPayload: i,
    manifestPayload: l,
    setManifestPayload: d,
    payloadSessionIdentity: u,
    setPayloadSessionIdentity: f,
    scopedJobPayload: m,
    scopedManifestPayload: v,
    jobStatus: y,
    jobTerminal: I,
    jobRefreshRevision: h,
    refreshJobArtifacts: w,
    refreshJobStatus: z,
    publishPayload: b,
    clearPayload: S
  };
}
function Wt(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function Ca(e, t) {
  e(t), Wt(t);
}
function xa(e) {
  const [t, n] = N(e ? "source" : "compare"), r = x((a) => {
    e && a !== "source" || (n(a), Wt(a));
  }, [e]), o = x((a) => {
    Ca(n, a);
  }, []);
  return O(() => (e && document.documentElement.classList.add("reader-source-only"), Wt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: o };
}
function $n(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function _a(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: $n(n.active_job_id),
    activeVersionId: $n(n.active_version_id)
  };
}
function za(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function Da(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function Fa(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function Oa(e) {
  return e ? { data: e.data.slice() } : null;
}
const $a = 2, ve = /* @__PURE__ */ new Map();
function Kt(e, t) {
  ve.delete(e), ve.set(e, t);
}
function ja(e) {
  if (ve.size < $a) return;
  const t = ve.keys().next().value;
  t && ve.delete(t);
}
function zt(e) {
  const t = `${e || ""}`.trim();
  if (!t || !ve.has(t)) return null;
  const n = ve.get(t);
  return Kt(t, n), n;
}
async function Cr(e, t = ot().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (ve.has(r)) {
    const c = ve.get(r);
    return Kt(r, c), c;
  }
  const o = await t(r, { signal: n.signal });
  if (!o.ok) {
    const c = new Error(`读取 PDF 失败 (${o.status})`);
    throw c.status = o.status, c;
  }
  const a = await o.arrayBuffer(), s = { data: new Uint8Array(a) };
  return ve.has(r) ? Kt(r, s) : (ja(), ve.set(r, s)), s;
}
function Ua(e = "", t = null) {
  const [n, r] = N(
    () => t || zt(e)
  ), [o, a] = N(
    () => !!`${e || ""}`.trim() && !t && !zt(e)
  ), [s, c] = N("");
  return O(() => {
    if (t) {
      r(t), a(!1), c("");
      return;
    }
    const i = `${e || ""}`.trim();
    if (!i) {
      r(null), a(!1), c("");
      return;
    }
    const l = zt(i);
    if (l) {
      r(l), a(!1), c("");
      return;
    }
    let d = !1;
    return a(!0), c(""), r(null), Cr(i).then((u) => {
      d || (r(u), a(!1));
    }).catch((u) => {
      d || (r(null), a(!1), c((u == null ? void 0 : u.message) || String(u)));
    }), () => {
      d = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function Ba(e) {
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
async function qt(e) {
  const { url: t, label: n, percentStart: r, percentEnd: o, fence: a, setBoot: s } = e;
  if (!t || a.isInactive())
    return null;
  Et(s, r, n, "download");
  const c = await Cr(t, ot().fetchProtected, {
    signal: a.signal
  });
  return a.isInactive() ? null : (Et(s, o, n, "download"), c);
}
async function Ha(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: o } = e;
  Et(o, 25, "正在下载 PDF…", "download");
  const a = [];
  let s = null, c = null;
  return t && a.push(
    qt({
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
    qt({
      url: n,
      label: "正在下载译文 PDF…",
      percentStart: 55,
      percentEnd: 85,
      fence: r,
      setBoot: o
    }).then((d) => {
      c = d;
    })
  ), await Promise.all(a), r.isInactive() ? { status: "inactive" } : !!t && !s || !!n && !c ? { status: "incomplete" } : { status: "downloaded", sourceBytes: s, translatedBytes: c };
}
const bt = {
  regions: null,
  metadata: null
};
function Ja(e) {
  const {
    sessionJobId: t,
    jobId: n,
    routeDocumentId: r,
    documentJobId: o,
    rejectedDocumentJobId: a,
    sourceOnly: s,
    locationKey: c,
    sessionIdentity: i,
    committedSource: l,
    applyIdentityEvent: d,
    publishPayload: u,
    clearPayload: f,
    switchSessionMode: h,
    jobRefreshRevision: g,
    sessionEpochRef: m,
    closingRef: v,
    activeLoadAbortRef: y
  } = e, [I, w] = N(""), [b, S] = N(""), [E, M] = N(null), [z, C] = N(null), [F, R] = N(!1), [P, T] = N(""), [k, $] = N([]), [j, G] = N(() => ({
    source: null,
    translated: null
  })), [U, B] = N(
    bt
  ), [W, D] = N({
    loading: !0,
    percent: 4,
    text: Pe.boot,
    stage: "progress",
    failed: !1
  });
  return O(() => {
    const Z = new AbortController(), ce = m.current.value, X = Ba({
      sessionEpochRef: m,
      closingRef: v,
      abort: Z,
      sessionEpoch: ce
    });
    y.current = Z;
    const Q = dn();
    if (v.current)
      return Z.abort(), () => {
        y.current === Z && (y.current = null);
      };
    function oe(ne, re) {
      X.markFailed(), D({
        loading: !1,
        percent: 100,
        text: ne,
        stage: "failed",
        failed: !0
      }), Jt({ percent: 100, text: re, stage: "failed" });
    }
    function he() {
      R(!0), D({
        loading: !1,
        percent: 100,
        text: Pe.ready,
        stage: "ready",
        failed: !1
      }), Jt({ percent: 100, text: Pe.ready, stage: "ready" });
    }
    function de() {
      return l != null && l.documentId ? On(
        l.documentId,
        l.revision
      ) : fa() ? ma : Q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function H() {
      let ne = { activeJobId: "", activeVersionId: "" };
      try {
        const ue = await Q.fetchProtected(
          Q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (ue != null && ue.ok) {
          const ke = await ue.json().catch(() => null);
          ne = _a(ke);
        }
      } catch {
      }
      const re = za({
        link: ne,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!l
      });
      if (re.kind === "follow-active-job") {
        if (X.isInactive()) return;
        d({
          type: "resolved-document-job",
          documentId: r,
          jobId: re.jobId
        }), re.activeVersionId ? (l || d({
          type: "committed-source",
          documentId: r,
          revision: re.activeVersionId,
          sessionIdentity: i
        }), h("source")) : h("compare");
        return;
      }
      if (re.kind === "open-committed-source") {
        if (X.isInactive()) return;
        d({
          type: "committed-source",
          documentId: r,
          revision: re.revision,
          sessionIdentity: i
        }), h("source");
        return;
      }
      const ae = de();
      if (X.isInactive()) return;
      w(ae), S(""), T(""), f(i);
      const ge = await qt({
        url: ae,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: X,
        setBoot: D
      });
      if (!X.isInactive()) {
        if (!ge) {
          oe("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        M(ge), he();
      }
    }
    async function le() {
      var Me;
      const ne = await ((Me = Q.loadSessionSnapshot) == null ? void 0 : Me.call(Q, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: l,
        includeOptionalArtifacts: !l
      })), re = ne ? {
        jobPayload: ne.sourcePayload,
        manifestPayload: ne.manifestPayload,
        readerMetadata: ne.readerMetadata,
        regionsPayload: ne.regions,
        readerErrors: ne.readerErrors
      } : await Q.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !l
      });
      if (X.isInactive()) return;
      let ae = null;
      if (n && !r) {
        try {
          ae = await Q.fetchDocumentByJobId(un, t);
        } catch {
        }
        if (X.isInactive()) return;
      }
      const ge = ka(re.jobPayload) || `${(ae == null ? void 0 : ae.document_id) || ""}`.trim();
      ge && !r && d({
        type: "resolved-job-document",
        jobId: t,
        documentId: ge
      });
      const ue = Da({
        payloadDocumentId: ge,
        linkedActiveJobId: `${(ae == null ? void 0 : ae.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(ae == null ? void 0 : ae.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!l
      });
      if (ue.kind === "restore-committed-source") {
        if (X.isInactive()) return;
        d({
          type: "committed-source",
          documentId: ue.documentId,
          revision: ue.revision,
          sessionIdentity: i
        }), h("source");
        return;
      }
      const ke = Q.resolveReaderSourcePdf(re.manifestPayload), xt = Q.resolveReaderTranslatedPdfUrl(re.jobPayload, re.manifestPayload), ht = typeof ke == "string" ? ke : Q.resolveReaderArtifactUrl(ke), pt = r || ge, $e = l != null && l.documentId ? On(
        l.documentId,
        l.revision
      ) : ht || (pt ? Q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(pt)}/source.pdf`) : ""), Ge = l ? "" : xt || "";
      if (w($e || ""), S(Ge), T(Na(re.jobPayload, t)), u({
        jobPayload: re.jobPayload || null,
        manifestPayload: re.manifestPayload || null,
        sessionIdentity: i
      }), $(l ? [] : zo(re.regionsPayload)), G(l ? { source: null, translated: null } : Do(re.readerMetadata)), B(l ? bt : re.readerErrors ?? bt), !$e && !Ge) {
        oe(Pe.failed, Pe.failed);
        return;
      }
      const je = await Ha({
        sourceFinal: $e || "",
        translatedFinal: Ge,
        fence: X,
        setBoot: D
      });
      if (je.status !== "inactive") {
        if (je.status === "incomplete") {
          oe("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        M(je.sourceBytes), C(je.translatedBytes), he();
      }
    }
    async function Ie() {
      R(!1), M(null), C(null), $([]), G({ source: null, translated: null }), B(bt), Et(D, 8, Pe.metadata, "metadata");
      try {
        if (s) {
          await H();
          return;
        }
        if (!t) {
          oe(Pe.failed, Pe.failed);
          return;
        }
        await le();
      } catch (ne) {
        if (X.isClosedOrStale() || (ne == null ? void 0 : ne.name) === "AbortError") return;
        X.markFailed();
        const re = Number(ne == null ? void 0 : ne.status);
        if (Fa({
          status: re,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          d({ type: "missing-document-job", documentId: r, jobId: t }), d({ type: "cleared-resolved-document-job" }), h("source");
          return;
        }
        const ae = ne instanceof Error ? ne.message : Pe.failed;
        oe(ae, ae);
      }
    }
    return Ie(), () => {
      Z.abort(), y.current === Z && (y.current = null);
    };
  }, [t, r, o, a, s, c, l, g, n, i, d, u, f, h]), {
    sourceUrl: I,
    translatedUrl: b,
    sourceFile: E,
    translatedFile: z,
    assetsReady: F,
    title: P,
    regions: k,
    readerMetadata: j,
    readerErrors: U,
    boot: W
  };
}
function Wa() {
  const e = A(!1), t = A(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = Ta(), s = A({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const c = A(a), i = A(""), l = A(""), d = A(() => {
  }), u = x(() => d.current(), []), f = Ea({
    routeDocumentId: o,
    jobId: r,
    sessionIdentity: a,
    sessionIdentityRef: c,
    documentIdRef: i,
    sessionJobIdRef: l,
    switchToSourceMode: u
  }), {
    sessionJobId: h,
    documentId: g,
    sourceOnly: m,
    sourceViewOnly: v
  } = f, { mode: y, setMode: I, switchSessionMode: w } = xa(v);
  d.current = () => {
    w("source");
  }, c.current = a, i.current = g, l.current = h;
  const b = La({
    sessionJobId: h,
    sessionIdentity: a,
    sessionIdentityRef: c,
    sessionJobIdRef: l,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: S,
    scopedManifestPayload: E,
    jobStatus: M,
    jobTerminal: z,
    jobRefreshRevision: C,
    refreshJobArtifacts: F,
    refreshJobStatus: R
  } = b, P = Ja({
    sessionJobId: h,
    jobId: r,
    routeDocumentId: o,
    documentJobId: f.documentJobId,
    rejectedDocumentJobId: f.rejectedDocumentJobId,
    sourceOnly: m,
    locationKey: n,
    sessionIdentity: a,
    committedSource: f.activeCommittedDocumentSource,
    applyIdentityEvent: f.applyIdentityEvent,
    publishPayload: b.publishPayload,
    clearPayload: b.clearPayload,
    switchSessionMode: w,
    jobRefreshRevision: C,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), T = x(() => {
    var $;
    e.current = !0, ($ = t.current) == null || $.abort();
  }, []), k = V(
    () => ({
      fetchProtected: dn().fetchProtected,
      jobId: h,
      jobPayload: S,
      manifestPayload: E,
      sourceUrl: P.sourceUrl,
      translatedUrl: P.translatedUrl,
      sourceOnly: v
    }),
    [h, S, E, P.sourceUrl, P.translatedUrl, v]
  );
  return {
    jobId: h,
    jobStatus: M,
    workflow: `${(S == null ? void 0 : S.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: z,
    documentId: g,
    sessionIdentity: a,
    sourceOnly: m,
    mode: y,
    setMode: I,
    sourceUrl: P.sourceUrl,
    translatedUrl: P.translatedUrl,
    sourceFile: P.sourceFile,
    translatedFile: P.translatedFile,
    assetsReady: P.assetsReady,
    boot: P.boot,
    title: P.title,
    regions: P.regions,
    readerMetadata: P.readerMetadata,
    readerErrors: P.readerErrors,
    download: k,
    refreshJobArtifacts: F,
    refreshJobStatus: R,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: T
  };
}
const Ka = 160, qa = 8, Va = 960;
function Ga() {
  const e = A(null), [t, n] = N(null), [r, o] = N(Va), a = x((s) => {
    e.current = s, n(s);
  }, []);
  return O(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const c = (l) => {
      !Number.isFinite(l) || l < Ka || o((d) => Math.abs(d - l) < qa ? d : l);
    }, i = new ResizeObserver((l) => {
      var d, u;
      c(((u = (d = l[0]) == null ? void 0 : d.contentRect) == null ? void 0 : u.width) ?? s.clientWidth);
    });
    return i.observe(s), c(s.clientWidth), () => i.disconnect();
  }, [t]), {
    shellRef: e,
    shellEl: t,
    shellWidth: r,
    bindShell: a
  };
}
function Za(e) {
  const { mode: t, sourceOnly: n, assetsReady: r, hasSource: o, hasTranslated: a } = e, s = r && o, c = r && a && !n, i = t === "source" || t === "compare", l = !n && (t === "translated" || t === "compare");
  return {
    mountSource: s,
    mountTranslated: c,
    showSource: i,
    showTranslated: l,
    compareMode: t === "compare" && i && l && s && c,
    primaryPane: t === "translated" ? "translated" : "source"
  };
}
const Dt = { source: 0, translated: 0 };
function Ya(e, t) {
  const {
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    sourceUrl: a,
    translatedUrl: s,
    sourceFile: c,
    translatedFile: i
  } = e, l = `${(t == null ? void 0 : t.identityKey) || ""}\0${a}\0${s}`, d = A(l);
  d.current = l;
  const [u, f] = N(() => ({
    identity: l,
    pages: Dt
  })), [h, g] = N(() => ({ identity: l, tick: 0 })), m = u.identity === l ? u.pages : Dt, v = h.identity === l ? h.tick : 0, y = Za({
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    hasSource: !!c || !!a,
    hasTranslated: !!i
  }), { primaryPane: I } = y, w = x((R, P) => {
    d.current === l && f((T) => {
      const k = T.identity === l ? T.pages : Dt;
      return k[P] === R && T.identity === l ? T : {
        identity: l,
        pages: { ...k, [P]: R }
      };
    });
  }, [l]), b = A(null), S = x(() => {
    b.current && clearTimeout(b.current);
    const R = l;
    b.current = setTimeout(() => {
      b.current = null, d.current === R && g((P) => ({
        identity: R,
        tick: P.identity === R ? P.tick + 1 : 1
      }));
    }, 60);
  }, [l]);
  O(() => (b.current && (clearTimeout(b.current), b.current = null), f((R) => R.identity === l && R.pages.source === 0 && R.pages.translated === 0 ? R : { identity: l, pages: { source: 0, translated: 0 } }), g((R) => R.identity === l && R.tick === 0 ? R : { identity: l, tick: 0 }), () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [l]);
  const E = V(
    () => Math.max(m.source, m.translated),
    [m]
  ), M = I === "translated" ? m.translated : m.source || m.translated, z = t == null ? void 0 : t.userZoom, C = t == null ? void 0 : t.shellWidth, F = `${l}-${v}-${z}-${n}-${m.source}-${m.translated}-${C}`;
  return {
    ...y,
    numPagesByPane: m,
    hudNumPages: E,
    primaryNumPages: M,
    metricsTick: v,
    onNumPages: w,
    onMetrics: S,
    rowSyncRevision: F
  };
}
const Ke = "data-reader-page", qe = "data-reader-pane", fn = "data-natural-height", Xa = "reader-react-root", Qa = "reader-react-grid", xr = "reader-react-scroll-shell", es = "reader-react-pdf-pane", _r = "reader-react-pdf-page", At = "reader-react-pdf-page-placeholder", mn = "reader-react-pdf-page-slot";
function at(e, t) {
  const n = e != null ? `[${Ke}="${e}"]` : `[${Ke}]`;
  return t ? `${n}[${qe}="${t}"]` : n;
}
function ts() {
  return `.${mn}[${Ke}]`;
}
function Lt(e) {
  return Number(e.getAttribute(Ke));
}
const zr = 0.25, Dr = 1, ns = 0.05, ft = 0.5, rs = 16, os = 8;
function nt(e) {
  return ft;
}
function Ct(e) {
  return Number.isFinite(e) ? Math.min(Dr, Math.max(zr, e)) : ft;
}
function st(e, t) {
  const n = Ct(Number(e) + t * ns);
  return Math.round(n * 100) / 100;
}
function as(e) {
  return Math.round(Ct(e) * 100);
}
function ss(e) {
  const n = (Number(e) || 0) - rs - os;
  return Math.max(160, Math.floor(n));
}
function is(e, t = ft) {
  const n = Ct(t);
  return ss((Number(e) || 0) * n);
}
function cs(e, t) {
  if (!e || !Number.isFinite(t) || t <= 0 || Math.abs(t - 1) < 1e-3)
    return;
  const n = e.scrollLeft + e.clientWidth / 2, r = e.scrollTop + e.clientHeight / 2, o = Array.from(
    e.querySelectorAll(`[${qe}]`)
  ).map((s) => ({
    pane: s,
    cx: s.scrollLeft + s.clientWidth / 2,
    hadOverflow: s.scrollWidth > s.clientWidth + 1
  })), a = () => {
    e.scrollLeft = Math.max(0, n * t - e.clientWidth / 2), e.scrollTop = Math.max(0, r * t - e.clientHeight / 2);
    for (const { pane: s, cx: c, hadOverflow: i } of o) {
      const l = Math.max(0, s.scrollWidth - s.clientWidth);
      if (l <= 0) {
        s.scrollLeft = 0;
        continue;
      }
      i ? s.scrollLeft = Math.min(
        l,
        Math.max(0, c * t - s.clientWidth / 2)
      ) : s.scrollLeft = l / 2;
    }
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(a);
  });
}
const Fr = [
  "markdown",
  "ai",
  "notes",
  "ai-notes",
  "favorites"
], Or = [
  "reading-path",
  "reading-canvas",
  "terminal"
], ls = [
  ...Fr,
  ...Or
];
function $r(e) {
  return ls.includes(e);
}
const ds = "retainpdf:reader:view:v1:", jn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), us = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function jr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function Vt(e) {
  return `${e || ""}`.trim();
}
function fs({
  documentId: e,
  jobId: t
}) {
  const n = Vt(e);
  if (n) return `document:${n}`;
  const r = Vt(t);
  return r ? `job:${r}` : "";
}
function Ur(e) {
  const t = Vt(e);
  return t ? `${ds}${t}` : "";
}
function ms(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function hs(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!jn.has(t) || !jn.has(n) || t === n))
    return { left: t, right: n };
}
function ps(e) {
  return e === null ? null : $r(e) ? e : void 0;
}
function gs(e) {
  return us.has(e) ? e : void 0;
}
function Br(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = ms(t.anchor), r = Number(t.zoom), o = gs(t.mode), a = hs(t.splitLayout), s = ps(t.assistantPanel);
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
function Ee(e, t = jr()) {
  const n = Ur(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Br(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function kt(e, t, n = jr()) {
  const r = Ur(e);
  if (!r || !n) return null;
  const o = Ee(e, n), a = Br({
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
function bs(e, t, n = "") {
  const [r, o] = N(() => {
    var u;
    return ((u = Ee(n)) == null ? void 0 : u.zoom) ?? nt();
  }), a = A(r), s = A(n);
  a.current = r;
  const c = A(1);
  O(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const u = ((f = Ee(n)) == null ? void 0 : f.zoom) ?? nt();
    c.current = 1, a.current = u, o(u);
  }, [e, n]);
  const i = x((u) => {
    const f = Ct(u), h = a.current;
    Math.abs(f - h) < 5e-4 || (c.current = f / (h || 1), kt(s.current, { zoom: f }), o(f));
  }, []), l = x((u) => {
    i(st(a.current, u));
  }, [i]), d = x((u) => {
    i(nt());
  }, [i]);
  return De(() => {
    const u = c.current;
    Math.abs(u - 1) < 1e-3 || (c.current = 1, cs(t == null ? void 0 : t.current, u));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: l, resetZoom: d };
}
function ys(e, t = !0) {
  const [n, r] = N(null), o = x(() => {
    var c, i;
    r(null);
    const s = (c = globalThis.getSelection) == null ? void 0 : c.call(globalThis);
    (i = s == null ? void 0 : s.removeAllRanges) == null || i.call(s);
  }, []), a = e.current ?? null;
  return O(() => {
    if (!t)
      return;
    const s = () => {
      var $, j;
      const m = e.current, v = ($ = globalThis.getSelection) == null ? void 0 : $.call(globalThis);
      if (!m || !v || v.isCollapsed || !v.rangeCount) {
        r(null);
        return;
      }
      const y = v.getRangeAt(0);
      if (!m.contains(y.commonAncestorContainer)) {
        r(null);
        return;
      }
      const I = `${v.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (I.length < 2) {
        r(null);
        return;
      }
      let w = y.commonAncestorContainer;
      w.nodeType === Node.TEXT_NODE && (w = w.parentElement);
      const b = (j = w == null ? void 0 : w.closest) == null ? void 0 : j.call(
        w,
        at()
      );
      if (!b || !m.contains(b)) {
        r(null);
        return;
      }
      const S = Math.max(1, Math.floor(Lt(b) || 1)), M = b.getAttribute(qe) === "translated" ? "translated" : "source", z = y.getClientRects(), C = z[z.length - 1] || y.getBoundingClientRect();
      if (!C || C.width === 0 && C.height === 0) {
        r(null);
        return;
      }
      const F = typeof window < "u" ? window.innerWidth : 800, R = typeof window < "u" ? window.innerHeight : 600, P = 16, T = Math.min(Math.max(P, C.left), F - P), k = Math.min(Math.max(P, C.top), R - P);
      r({
        selectionType: "text",
        quote: I,
        page: S,
        pane: M,
        rect: {
          left: T,
          top: k,
          width: C.width,
          height: C.height
        }
      });
    }, c = () => {
      window.setTimeout(s, 0);
    }, i = () => {
      c();
    }, l = () => c(), d = () => c(), u = () => {
      c();
    }, f = (m) => {
      m.key === "Escape" && o();
    }, h = () => {
      r((m) => m && null);
    };
    document.addEventListener("mouseup", i), document.addEventListener("pointerup", l), document.addEventListener("touchend", d), document.addEventListener("selectionchange", u), document.addEventListener("keyup", f);
    const g = a ?? e.current;
    return g == null || g.addEventListener("scroll", h, { passive: !0 }), window.addEventListener("scroll", h, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", i), document.removeEventListener("pointerup", l), document.removeEventListener("touchend", d), document.removeEventListener("selectionchange", u), document.removeEventListener("keyup", f), g == null || g.removeEventListener("scroll", h), window.removeEventListener("scroll", h, !0);
    };
  }, [t, a, o]), { selection: n, clearSelection: o };
}
function vs(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, o = A(t), a = A(n), s = A(r);
  return o.current = t, a.current = n, s.current = r, { setModeKeepingPage: x((i) => {
    i !== o.current && (s.current(), a.current(i));
  }, []) };
}
const hn = 48;
function Hr(e, t = hn) {
  return e.getBoundingClientRect().top + t;
}
function Jr(e, t) {
  if (!e.length)
    return null;
  let n = null, r = -1 / 0;
  for (const i of e) {
    const l = i.getBoundingClientRect();
    l.height < 8 || l.width < 8 || l.top <= t + 1 && l.top >= r && (n = i, r = l.top);
  }
  if (!n && (n = e.find((l) => {
    const d = l.getBoundingClientRect();
    return d.height >= 8 && d.width >= 8;
  }) ?? e[0] ?? null, n)) {
    const l = [...e].reverse().find((d) => {
      const u = d.getBoundingClientRect();
      return u.height >= 8 && u.width >= 8;
    });
    l && l.getBoundingClientRect().bottom < t && (n = l);
  }
  if (!n)
    return null;
  const o = Lt(n);
  if (!Number.isFinite(o) || o < 1)
    return null;
  const a = n.getBoundingClientRect(), s = a.height > 0 ? a.height : 1, c = Math.min(1, Math.max(0, (t - a.top) / s));
  return { el: n, page: o, fraction: c };
}
function Ft(e, t, n = hn) {
  if (!e)
    return null;
  const r = at(void 0, t), o = Array.from(e.querySelectorAll(r));
  if (!o.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Hr(e, n), c = Jr(o, s);
  return c ? { page: c.page, fraction: c.fraction } : null;
}
function pn(e, t, n = "auto", r, o = hn) {
  if (!e || !t)
    return !1;
  const a = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let c = null;
  if (r && (c = e.querySelector(at(a, r))), c || (c = e.querySelector(at(a))), !c)
    return !1;
  const i = e.getBoundingClientRect(), l = c.getBoundingClientRect();
  if (i.height <= 0 || l.height < 8 && c.offsetHeight < 8)
    return !1;
  const d = l.height > 0 ? l.height : c.offsetHeight, u = e.scrollTop + (l.top - i.top), f = Math.max(0, u + s * d - o);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function Ss(e, t, n = "smooth", r) {
  return pn(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function Gt(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", o = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let a = !1, s = !1;
  const c = [], i = () => {
    var d;
    if (a) return;
    pn(
      e(),
      t,
      r,
      n == null ? void 0 : n.pane
    ) && !s && (s = !0, (d = n == null ? void 0 : n.onDone) == null || d.call(n));
  };
  for (const l of o)
    l <= 0 ? requestAnimationFrame(() => {
      requestAnimationFrame(i);
    }) : c.push(setTimeout(i, l));
  return () => {
    a = !0;
    for (const l of c)
      clearTimeout(l);
  };
}
function ws(e, t, n) {
  return Gt(
    e,
    { page: t, fraction: 0 },
    n
  );
}
function Mt(e, t) {
  if (!Number.isFinite(e))
    return 1;
  const n = Math.max(1, Math.floor(e));
  return !Number.isFinite(t) || t <= 0 ? n : Math.min(t, n);
}
function be(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function Is(e, t, n = !0, r = "", o) {
  const [a, s] = N(1);
  return O(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const c = e.current;
    if (!c)
      return;
    let i = !1, l = null, d = 0;
    const u = at(void 0, o), f = () => {
      if (i) return;
      const m = Array.from(c.querySelectorAll(u));
      if (!m.length)
        return;
      const v = Hr(c), y = Jr(m, v);
      y && s(y.page);
    }, h = () => {
      i || (d && cancelAnimationFrame(d), d = requestAnimationFrame(() => {
        d = 0, f();
      }));
    }, g = () => {
      if (i) return;
      if (!Array.from(c.querySelectorAll(u)).length) {
        l = setTimeout(g, 120);
        return;
      }
      f(), c.addEventListener("scroll", h, { passive: !0 });
    };
    return g(), () => {
      i = !0, l && clearTimeout(l), d && cancelAnimationFrame(d), c.removeEventListener("scroll", h);
    };
  }, [e, t, n, r, o]), a;
}
const Ps = `canvas, .react-pdf__Page, .${_r}, .${At}`, Un = /* @__PURE__ */ new WeakMap();
function Rs(e) {
  const t = Number(e.getAttribute(fn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Un.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(Ps), Un.set(e, n)), n) {
    const o = n.getBoundingClientRect().height;
    if (Number.isFinite(o) && o > 0)
      return o;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function Ts(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function Es(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(ts()).forEach((r) => {
    const o = Lt(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = Rs(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function As(e, t, n = "", r) {
  const [o, a] = N(() => /* @__PURE__ */ new Map()), s = A(o), c = A(r);
  return c.current = r, De(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), a(s.current));
      return;
    }
    let i = !1, l = 0, d = !1, u = !1;
    const f = () => {
      var S;
      if (i) return;
      const w = e.current;
      if (!w) return;
      const b = Es(w);
      Ts(s.current, b) || (s.current = b, a(b)), d && !u && (u = !0, (S = c.current) == null || S.call(c));
    }, h = () => {
      cancelAnimationFrame(l), l = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    h();
    const g = window.setTimeout(h, 100), m = window.setTimeout(() => {
      d = !0, h();
    }, 300), v = window.setTimeout(h, 700), y = e.current;
    let I = null;
    return y && typeof ResizeObserver < "u" && (I = new ResizeObserver(() => h()), I.observe(y)), () => {
      i = !0, cancelAnimationFrame(l), window.clearTimeout(g), window.clearTimeout(m), window.clearTimeout(v), I == null || I.disconnect();
    };
  }, [e, t, n]), o;
}
const ks = [0, 48, 140, 320, 560], Ms = 700, Ns = [80, 200, 400], Ls = 500, Cs = 50, xs = 180, Bn = [0, 48, 140, 320, 700, 1200];
function _s(e, t) {
  var R;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, c = A(
    ((R = Ee(a)) == null ? void 0 : R.anchor) || { page: 1, fraction: 0 }
  ), i = A(null), l = A(!1), d = A(r), u = A(null), f = A(null), h = A(null), g = A(null), m = A(a), v = A(""), y = A(n);
  y.current = n;
  const I = x(() => {
    var P;
    (P = u.current) == null || P.call(u), u.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), w = x((P = !1) => {
    g.current != null && (clearTimeout(g.current), g.current = null);
    const T = () => {
      g.current = null, kt(m.current, {
        anchor: be(c.current)
      });
    };
    P ? T() : g.current = setTimeout(T, xs);
  }, []), b = x((P) => {
    c.current = be(P), i.current = null, h.current != null && clearTimeout(h.current), h.current = setTimeout(() => {
      h.current = null, l.current = !1;
    }, Cs);
  }, []);
  O(() => {
    if (!o)
      return;
    let P = !1, T = null, k = null, $ = null;
    const j = () => {
      if (P) return;
      const G = e.current;
      if (!G) {
        $ = setTimeout(j, 50);
        return;
      }
      T = G, k = () => {
        if (l.current)
          return;
        const U = Ft(T, y.current);
        U && (c.current = U, w());
      }, T.addEventListener("scroll", k, { passive: !0 }), l.current || k();
    };
    return j(), () => {
      P = !0, $ != null && clearTimeout($), T && k && T.removeEventListener("scroll", k);
    };
  }, [o, r, n, e, w]), De(() => {
    var T;
    if (m.current === a) return;
    w(!0), I(), h.current != null && (clearTimeout(h.current), h.current = null), m.current = a, v.current = "";
    const P = (T = Ee(a)) == null ? void 0 : T.anchor;
    c.current = P ? be(P) : { page: 1, fraction: 0 }, i.current = null, l.current = !!a, d.current = r;
  }, [a, r, w, I]), O(() => {
    var T;
    if (!o || !s || !a || v.current === a) return;
    v.current = a;
    const P = be(
      ((T = Ee(a)) == null ? void 0 : T.anchor) || { page: 1, fraction: 0 }
    );
    return c.current = P, i.current = P, l.current = !0, I(), u.current = Gt(
      () => e.current,
      P,
      {
        behavior: "auto",
        pane: y.current,
        delaysMs: Bn,
        onDone: () => b(P)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(P);
    }, Math.max(...Bn) + 160), () => I();
  }, [o, s, a, e, b, I]), O(() => {
    if (d.current === r)
      return;
    if (d.current = r, !o) {
      l.current = !1, i.current = null, I();
      return;
    }
    const P = i.current ? be(i.current) : be(c.current);
    return l.current = !0, i.current = P, c.current = P, I(), u.current = Gt(
      () => e.current,
      P,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: ks,
        onDone: () => b(P)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(P);
    }, Ms), () => {
      I();
    };
  }, [r, o, n, e, b, I]), O(() => () => {
    I(), h.current != null && (clearTimeout(h.current), h.current = null), w(!0);
  }, [I, w]);
  const S = x(() => {
    const P = Ft(
      e.current,
      y.current
    );
    return be(P || c.current);
  }, [e]), E = x(() => {
    l.current = !0;
    const P = Ft(
      e.current,
      y.current
    ), T = be(P ?? c.current);
    return c.current = T, i.current = T, w(), T;
  }, [e, w]), M = x((P, T, k) => {
    const $ = k || y.current, j = Mt(P, T || 1), G = { page: j, fraction: 0 };
    c.current = G, l.current = !0, i.current = G, w(), I(), Ss(e.current, j, "smooth", $), u.current = ws(
      () => e.current,
      j,
      {
        behavior: "auto",
        pane: $,
        delaysMs: Ns,
        onDone: () => b(G)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(G);
    }, Ls);
  }, [e, b, I, w]), z = x(() => be(c.current), []), C = x(() => l.current, []), F = x(() => {
    if (!l.current || !i.current)
      return;
    const P = be(i.current);
    pn(
      e.current,
      P,
      "auto",
      y.current
    );
  }, [e]);
  return {
    lockFromShell: S,
    beginModeSwitch: E,
    goToPage: M,
    getAnchor: z,
    isRestoring: C,
    repinIfRestoring: F
  };
}
function zs(e, t) {
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
function Wr(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), o = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), a = `j:${r}:d:${o}`;
  return t == null ? `${a}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${a}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const Ds = [0, 80, 200, 400, 800], Fs = 120, Os = 400;
function $s(e, t, n) {
  const { enabled: r, numPages: o, goToPage: a, resolveBlockPage: s, onAnchorApplied: c, jobId: i, documentId: l } = e, d = A(a);
  d.current = a;
  const u = A(s);
  u.current = s;
  const f = A(c);
  f.current = c;
  const h = A(n);
  h.current = n, O(() => {
    var w, b;
    if (!r || !Number.isFinite(o) || o < 1)
      return;
    const g = ba(), m = zs(g, u.current), v = Wr(g, m, { jobId: i, documentId: l });
    if (t.current === v)
      return;
    if (m == null) {
      t.current = v, (w = h.current) == null || w.call(h);
      return;
    }
    t.current = v, g && ((b = f.current) == null || b.call(f, g, m));
    const y = [];
    let I = 0;
    for (const S of Ds)
      I = Math.max(I, S), y.push(
        setTimeout(() => {
          d.current(m);
        }, S)
      );
    return y.push(
      setTimeout(() => {
        var S;
        (S = h.current) == null || S.call(h);
      }, I + Fs)
    ), () => {
      for (const S of y) clearTimeout(S);
    };
  }, [r, o, i, l, t]);
}
function js(e) {
  var a;
  const t = globalThis.window;
  if (!t || typeof ((a = t.history) == null ? void 0 : a.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, o = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", o);
}
function Us(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: o,
    resolveBlockPage: a,
    syncDebounceMs: s = Os,
    jobId: c,
    documentId: i,
    applyReaderSearch: l
  } = e, d = A(a);
  d.current = a;
  const u = A(l);
  u.current = l;
  const f = A(0);
  O(() => {
    if (!n || !r || !t.current || !Number.isFinite(o) || o < 1 || f.current === o) return;
    const h = setTimeout(() => {
      var y;
      const g = ((y = globalThis.location) == null ? void 0 : y.search) || "", m = _o(g, o, d.current);
      if (f.current = o, m === null) return;
      const v = `${new URLSearchParams(m).get("block_id") || ""}`.trim();
      t.current = Wr(
        { blockId: v },
        o,
        { jobId: c, documentId: i }
      ), (u.current || js)(m);
    }, s);
    return () => clearTimeout(h);
  }, [
    n,
    r,
    o,
    s,
    c,
    i,
    t
  ]);
}
function Bs(e) {
  const t = A(""), [n, r] = N(!1), o = x(() => r(!0), []), a = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  $s(a, t, o), Us(e, t, n);
}
const Ye = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function Hs(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function Hn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function Kr(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = Hn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const o = Hn(n, e);
  return o < 0 ? "ignore" : o === 0 ? n.page_hash === e.pageHash ? "ignore" : "retry" : "accept";
}
function Js(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), o = Kr(r, t, n);
  if (o === "retry") return e;
  if (o === "ignore")
    return { ...e, lastSeq: t.seq, connection: "live", error: "" };
  const a = new Map(n.items.map((i) => [i.item_id, i])), s = new Map((r == null ? void 0 : r.changedAtSeqById) || []);
  for (const i of t.changed_item_ids)
    a.has(i) && s.set(i, t.seq);
  const c = new Map(e.pagesByPage);
  return c.set(t.page_idx, {
    attempt: n.attempt,
    generation: n.generation,
    pageHash: n.page_hash,
    itemsById: a,
    changedAtSeqById: s,
    lastEventSeq: t.seq
  }), {
    ...e,
    pagesByPage: c,
    lastSeq: t.seq,
    connection: "live",
    error: ""
  };
}
const Jn = [250, 500, 1e3, 2e3, 4e3], Ot = [80, 160, 320, 640, 1e3, 1500], Wn = [250, 500, 1e3, 2e3, 4e3, 5e3], Ws = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Zt(e, t) {
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
function gn(e) {
  return jo(e) ? `${e.code || ""}`.trim() : "";
}
function yt(e, t) {
  const n = gn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Ks(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if (Kr(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = Uo(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (i) {
      if ((i == null ? void 0 : i.name) === "AbortError") throw i;
      a = i;
      const l = gn(i);
      if (l && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(l)) throw i;
    }
    const c = Ot[Math.min(s, Ot.length - 1)];
    if (await Zt(c, r), s >= Ot.length + 2) throw a;
  }
}
function qs({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = N(Ye), s = A(o), c = A("");
  s.current = o;
  const i = `${e || ""}`.trim(), l = `${t || ""}`.trim().toLowerCase(), d = Ws.has(l) ? l : "";
  return O(() => {
    if (!n || !i) {
      c.current = "", s.current = Ye, a(Ye);
      return;
    }
    const u = r === void 0 ? ga() : r, f = c.current === i;
    if (c.current = i, !u) {
      const w = {
        ...f ? s.current : Ye,
        connection: d ? "terminal" : "unavailable",
        jobStatus: l,
        error: "实时译文暂不可用"
      };
      s.current = w, a(w);
      return;
    }
    const h = new AbortController();
    let g = !1;
    const m = {
      ...f ? s.current : Ye,
      connection: d ? "terminal" : "connecting",
      jobStatus: l,
      error: ""
    };
    s.current = m, a(m);
    const v = (w) => {
      h.signal.aborted || a((b) => {
        const S = w(b);
        return s.current = S, S;
      });
    }, y = async () => {
      let w = 0;
      for (; !h.signal.aborted; )
        try {
          const b = await u.fetchLayout(i, { signal: h.signal });
          g = !0, v((S) => ({
            ...S,
            layoutByPage: Hs(b),
            jobStatus: l,
            error: ""
          }));
          return;
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError") return;
          const S = gn(b);
          if (!(S === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !S)) {
            v((M) => ({
              ...M,
              connection: d ? "terminal" : "unavailable",
              jobStatus: l,
              error: yt(b, "实时译文暂不可用")
            }));
            return;
          }
          if (d) {
            v((M) => ({
              ...M,
              connection: "terminal",
              jobStatus: l,
              error: ""
            }));
            return;
          }
          v((M) => ({
            ...M,
            connection: "connecting",
            jobStatus: l,
            error: yt(b, "正在等待 OCR 版面数据")
          })), await Zt(Jn[Math.min(w, Jn.length - 1)], h.signal).catch(() => {
          }), w += 1;
        }
    };
    return (async () => {
      if (await y(), !g || h.signal.aborted) return;
      let w = 0;
      for (; !h.signal.aborted; ) {
        d || v((b) => ({
          ...b,
          connection: b.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: l,
          // 保留已有错误：首页还没提交（lastSeq 为 0）时恰恰是最容易出错的阶段，
          // 此前这里把它清成空串，UI 于是一直显示「连接中」，用户看到的是
          // "正在努力"，实际可能已经在反复失败。
          error: b.error
        }));
        try {
          await u.streamEvents(i, {
            afterSeq: s.current.lastSeq,
            signal: h.signal,
            onEvent: async (b) => {
              if (b.seq <= s.current.lastSeq) return;
              let S;
              try {
                S = await Ks(
                  i,
                  b,
                  s.current,
                  h.signal,
                  u
                );
              } catch (E) {
                if ((E == null ? void 0 : E.name) === "AbortError" || h.signal.aborted) throw E;
                v((M) => ({
                  ...M,
                  lastSeq: Math.max(M.lastSeq, b.seq),
                  error: yt(E, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              v((E) => {
                const M = Js(E, b, S);
                return d ? {
                  ...M,
                  connection: "terminal",
                  jobStatus: l
                } : {
                  ...M,
                  jobStatus: l
                };
              }), w = 0;
            }
          });
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError" || h.signal.aborted) return;
          v((S) => ({
            ...S,
            connection: d ? "terminal" : "reconnecting",
            jobStatus: l,
            error: yt(b, "实时译文连接已中断，正在重连")
          }));
        }
        if (h.signal.aborted) return;
        if (d) {
          v((b) => ({
            ...b,
            connection: "terminal",
            jobStatus: l
          }));
          return;
        }
        await Zt(Wn[Math.min(w, Wn.length - 1)], h.signal).catch(() => {
        }), w += 1;
      }
    })(), () => h.abort();
  }, [n, r, i, d]), o;
}
const Vs = 2e3;
function Gs(e) {
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
const Zs = /* @__PURE__ */ new Set(["book", "translate"]);
function qr(e) {
  return !!(e.jobId && e.sourceUrl && Zs.has(e.workflow));
}
function Ys(e) {
  return !!(qr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function Xs() {
  const e = Wa(), t = qr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = Ys({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = qs({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), { shellRef: o, shellEl: a, shellWidth: s, bindShell: c } = Ga(), i = fs({
    documentId: e.documentId,
    jobId: e.jobId
  }), l = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: d, onZoomChange: u } = bs(e.mode, o, i), f = Ya(
    {
      mode: e.mode,
      sourceOnly: e.sourceOnly,
      assetsReady: e.assetsReady,
      sourceUrl: e.sourceUrl,
      translatedUrl: e.translatedUrl,
      sourceFile: e.sourceFile,
      translatedFile: e.translatedFile
    },
    { userZoom: d, shellWidth: s, identityKey: l }
  ), {
    beginModeSwitch: h,
    goToPage: g,
    repinIfRestoring: m
  } = _s(o, {
    primaryPane: f.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: f.primaryNumPages > 0
  });
  O(() => {
    m();
  }, [s, m]);
  const v = As(
    o,
    f.compareMode,
    f.rowSyncRevision,
    m
  ), y = Is(
    o,
    f.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${d}-${f.metricsTick}`,
    f.primaryPane
  ), I = x((D, Z) => {
    var X, Q;
    const ce = Math.max(
      Number(f.hudNumPages) || 0,
      Number(f.primaryNumPages) || 0,
      Number((X = f.numPagesByPane) == null ? void 0 : X.source) || 0,
      Number((Q = f.numPagesByPane) == null ? void 0 : Q.translated) || 0
    );
    g(D, ce, Z);
  }, [g, f.hudNumPages, f.primaryNumPages, f.numPagesByPane]), [w, b] = N(null), S = A(null), E = x((D) => {
    S.current && clearTimeout(S.current), b(D), D && (S.current = setTimeout(() => b(null), Vs));
  }, []);
  O(() => () => {
    S.current && clearTimeout(S.current);
  }, []);
  const M = x((D) => {
    const Z = wt(e.regions, D);
    return Z ? zn(Z, f.primaryPane).page : null;
  }, [e.regions, f.primaryPane]), z = x((D, Z) => {
    const ce = Z || f.primaryPane, X = typeof D == "object" && D ? `${D.block_id || ""}`.trim() : "", Q = typeof D == "object" && D ? `${D.image_url || ""}`.trim() : "", oe = typeof D == "object" && D ? D.page_idx != null ? Number(D.page_idx) + 1 : D.page != null ? Number(D.page) : null : typeof D == "number" ? D + 1 : null, he = Fo(e.regions, Q, oe) || wt(e.regions, X) || (typeof D == "object" ? Oo(e.regions, D) : null);
    let de = he ? zn(he, ce).page : null;
    de == null && (de = Gs(D)), !(de == null || de < 1) && (E(he), I(de, ce));
  }, [E, I, f.primaryPane, e.regions]);
  Bs({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: f.hudNumPages || 0,
    currentPage: y,
    goToPage: I,
    resolveBlockPage: M,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (D) => {
      E(wt(e.regions, D.blockId));
    }
  });
  const { setModeKeepingPage: C } = vs({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: h
  }), [F, R] = N(null), {
    selection: P,
    clearSelection: T
  } = ys(o, !e.boot.loading && !e.boot.failed), k = x(() => {
    R(null), T();
  }, [T]), $ = x((D) => {
    T(), R(D);
  }, [T]);
  O(() => {
    P && R(null);
  }, [P]), O(() => {
    const D = o.current;
    if (!D) return;
    const Z = () => R(null);
    return D.addEventListener("scroll", Z, { passive: !0 }), () => D.removeEventListener("scroll", Z);
  }, [a, o]);
  const j = P || F;
  O(() => {
    E(null), k();
  }, [l, E, k]);
  const G = !e.boot.loading && !e.boot.failed, U = V(() => ({ bindShell: c, shellEl: a, shellWidth: s, shellRef: o }), [c, a, s, o]), B = V(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), W = V(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: d,
    onZoomChange: u,
    shell: U,
    panes: f,
    sessionFiles: B,
    rowHeights: v,
    goToPage: I,
    activeRegion: w,
    jumpToAnchor: z,
    setModeKeepingPage: C,
    download: e.download,
    showHud: G,
    selection: j,
    clearSelection: k,
    selectRegion: $,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, U, f, B, v, I, w, z, C, G, j, k, $, d, u, i, r, n]);
  return V(() => ({
    ...W,
    currentPage: y
  }), [W, y]);
}
const Qs = [
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
], ei = [
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
function ti(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Qs)
    if (n.keys.some(
      (o) => o.length === 1 ? o === t : o === e
    )) return n;
  return null;
}
function ni(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function ri(e) {
  const {
    mode: t,
    sourceOnly: n,
    setMode: r,
    userZoom: o,
    onZoomChange: a,
    currentPage: s,
    numPages: c,
    goToPage: i,
    enabled: l = !0
  } = e;
  O(() => {
    if (!l)
      return;
    const d = (u) => {
      if (u.defaultPrevented || u.metaKey || u.ctrlKey || u.altKey || ni(u.target))
        return;
      const f = u.key, h = ti(f);
      if (h) {
        if (h.mode) {
          if (n && h.mode !== "source")
            return;
          u.preventDefault(), r(h.mode);
          return;
        }
        if (!(h.requiresPages && c <= 0))
          switch (u.preventDefault(), h.action) {
            case "zoom-in":
              a(st(o, 1));
              return;
            case "zoom-out":
              a(st(o, -1));
              return;
            case "zoom-reset":
              a(nt());
              return;
            case "next-page":
              i(Mt(s + 1, c));
              return;
            case "prev-page":
              i(Mt(s - 1, c));
              return;
            case "first-page":
              i(1);
              return;
            case "last-page":
              i(c);
              return;
          }
      }
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [
    l,
    t,
    n,
    r,
    o,
    a,
    s,
    c,
    i
  ]);
}
const oi = "retainpdf:soft-reader-close";
function ai() {
  return new URL("./index.html", window.location.href).href;
}
function si() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: oi },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function ii(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), o = new URL(e, r);
    return o.origin === r.origin && !/reader\.html$/i.test(o.pathname) && !/detail\.html$/i.test(o.pathname);
  } catch {
    return !1;
  }
}
function ci() {
  if (!(typeof window > "u") && !si()) {
    if (ii(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(ai());
  }
}
function li({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ L(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), ci();
      },
      children: [
        /* @__PURE__ */ p(ln, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ p("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let Kn = !1;
function di() {
  if (Kn)
    return;
  const e = ot().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (sa.GlobalWorkerOptions.workerSrc = e, Kn = !0);
}
const ui = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function fi({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: o
}) {
  const a = r.flatMap((s) => {
    if (!Pr(s.region)) return [];
    const c = ut(s, t, n);
    return c ? [{ highlight: s, rect: c }] : [];
  });
  return a.length ? /* @__PURE__ */ p("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: a.map(({ highlight: s, rect: c }) => {
    const i = s.region, l = Rr(i), d = ui[l];
    return /* @__PURE__ */ L(
      "button",
      {
        type: "button",
        className: `reader-structure-selection-target is-${l}`,
        "data-reader-region-id": i.itemId,
        "data-reader-region-kind": l,
        style: c,
        "aria-label": `${d}区域，点击选择`,
        title: `${d} · 点击选择`,
        onClick: (u) => {
          u.stopPropagation();
          const f = u.currentTarget.getBoundingClientRect();
          o == null || o({
            selectionType: "region",
            region: i,
            kind: l,
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
          /* @__PURE__ */ p("span", { className: "reader-structure-selection-label", "aria-hidden": "true", children: d }),
          /* @__PURE__ */ p("span", { className: "sr-only", children: Tr(i, e) })
        ]
      },
      i.itemId
    );
  }) }) : null;
}
function mi(e, t, n) {
  return e.flatMap((r) => {
    if (Rr(r.region) !== "text") return [];
    const o = ut(r, t, n);
    return o ? [{ itemId: r.itemId, highlight: r, rect: o }] : [];
  });
}
function qn(e, t, n) {
  let r = null, o = Number.POSITIVE_INFINITY;
  for (const a of e) {
    const { rect: s } = a;
    if (t < s.left || t > s.left + s.width || n < s.top || n > s.top + s.height)
      continue;
    const c = s.width * s.height;
    c < o && (r = a, o = c);
  }
  return r;
}
function hi({ target: e }) {
  return e ? /* @__PURE__ */ p("div", { className: "reader-text-hover-layer", "aria-hidden": "true", children: /* @__PURE__ */ p(
    "div",
    {
      className: "reader-text-hover-frame",
      "data-reader-text-hover-id": e.itemId,
      style: e.rect,
      children: /* @__PURE__ */ p("span", { className: "reader-text-hover-label", children: "文字" })
    }
  ) }) : null;
}
function pi(e, t) {
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
function gi(e, t, n, r) {
  if (!e || !t) return [];
  const o = [];
  for (const a of e.blocks) {
    const s = t.itemsById.get(a.item_id);
    if (!(s != null && s.translated_text)) continue;
    const c = ut(
      pi(e, a),
      n,
      r
    );
    c && o.push({
      itemId: a.item_id,
      translatedText: s.translated_text,
      status: s.status,
      kind: a.kind,
      sourceText: a.source_text,
      typography: a.typography,
      rect: c,
      changedAtSeq: t.changedAtSeqById.get(a.item_id) || 0,
      changedNow: t.changedAtSeqById.get(a.item_id) === t.lastEventSeq
    });
  }
  return o;
}
const bi = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', yi = 256, Xe = /* @__PURE__ */ new Map();
function vi(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function Si(e) {
  const t = `${e || ""}`, { text: n, slots: r } = la(t, { bareLatex: !0 }), o = vi(n), a = da(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Xe.get(t);
  if (!s && (s = ua(o, r), Xe.set(t, s), Xe.size > yi)) {
    const c = Xe.keys().next().value;
    c !== void 0 && Xe.delete(c);
  }
  return { fallbackHtml: a, richHtml: s, hasMath: !0 };
}
function $t(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function Te(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function wi(e, t) {
  const n = e.typography, r = Te(t) || 1, o = Te(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), c = $t(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, c * r)), l = Te(n == null ? void 0 : n.fit_min_font_size_pt), d = Te(n == null ? void 0 : n.fit_max_font_size_pt), u = Math.max(3.5, (l || 5.5) * r), f = Math.max(
    u,
    d ? d * r : o ? o * r : i
  ), h = o ? o * r : i, g = Te(n == null ? void 0 : n.leading_em), m = [
    Te(n == null ? void 0 : n.padding_top_pt) || 0,
    Te(n == null ? void 0 : n.padding_right_pt) || 0,
    Te(n == null ? void 0 : n.padding_bottom_pt) || 0,
    Te(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((v) => v * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || bi,
    fontSizePx: Math.max(u, Math.min(f, h)),
    minFontSizePx: u,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: g ? 1 + g : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || ($t(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : $t(e.kind) ? "center" : "justify",
    padding: m,
    exact: !!o
  };
}
function Ii(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), c = (u) => {
    const f = s.get(u);
    if (f !== void 0) return f;
    const { width: h, height: g } = e(u), m = h <= t + 0.5 && g <= n + 0.5;
    return s.set(u, m), m;
  };
  let i = o, l = a, d = Math.min(r.requestedFontSizePx, l);
  if (c(d)) {
    if (!r.exact) {
      i = d;
      for (let u = 0; u < 6 && l > i; u += 1) {
        const f = (i + l) / 2;
        c(f) ? (d = f, i = f) : l = f;
      }
    }
  } else {
    l = d, d = i;
    for (let u = 0; u < 8 && l > i; u += 1) {
      const f = (i + l) / 2;
      c(f) ? (d = f, i = f) : l = f;
    }
  }
  return Math.max(o, d);
}
const Pi = 512, Qe = /* @__PURE__ */ new Map();
let Yt = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Yt += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Yt += 1;
}));
function Ri(e, t, n, r) {
  return [
    Yt,
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
function Ti({ item: e, pageScale: t }) {
  const n = A(null), r = V(
    () => Si(e.translatedText),
    [e.translatedText]
  ), [o, a] = N(r.fallbackHtml), s = V(
    () => wi(e, t),
    [e, t]
  );
  O(() => {
    let u = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      u && a(f);
    }), () => {
      u = !1;
    };
  }, [r]), De(() => {
    const u = n.current;
    if (!u) return;
    const [f, h, g, m] = s.padding, v = Math.max(1, e.rect.width - m - h), y = Math.max(1, e.rect.height - f - g), I = Ri(o, v, y, s);
    let w = Qe.get(I);
    if (w === void 0 && (w = Ii(
      (b) => (u.style.fontSize = `${b}px`, { width: u.scrollWidth, height: u.scrollHeight }),
      v,
      y,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Qe.set(I, w), Qe.size > Pi)) {
      const b = Qe.keys().next().value;
      b !== void 0 && Qe.delete(b);
    }
    u.style.fontSize = `${w.toFixed(2)}px`;
  }, [o, e.rect.height, e.rect.width, s]);
  const [c, i, l, d] = s.padding;
  return /* @__PURE__ */ p(
    "div",
    {
      className: `reader-live-translation-item${e.changedNow ? " is-changed" : ""}`,
      "data-live-translation-item": e.itemId,
      "data-live-translation-kind": e.kind,
      "data-live-translation-status": e.status,
      "data-live-translation-typography": s.exact ? "typst" : "fitted",
      style: {
        ...e.rect,
        padding: `${c}px ${i}px ${l}px ${d}px`
      },
      children: /* @__PURE__ */ p(
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
function Ei({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = V(
    () => gi(e, t, n, r),
    [r, e, t, n]
  );
  return o.length ? /* @__PURE__ */ p(
    "div",
    {
      className: "reader-live-translation-overlay",
      "data-live-translation-page": e == null ? void 0 : e.page_idx,
      "data-live-translation-generation": t == null ? void 0 : t.generation,
      "aria-hidden": "true",
      children: o.map((a) => /* @__PURE__ */ p(
        Ti,
        {
          item: a,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${a.itemId}:${a.changedAtSeq}`
      ))
    }
  ) : null;
}
const Ai = rn(Ei), ki = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注"
}, Vn = 10;
function Mi({
  width: e,
  height: t,
  targets: n,
  activeNoteId: r,
  onSelect: o
}) {
  const a = n.flatMap(({ note: s, highlight: c }) => {
    const i = ut(c, e, t);
    return i ? [{ note: s, rect: i }] : [];
  });
  return a.length ? /* @__PURE__ */ p("div", { className: "reader-ai-note-layer", "aria-label": "AI 批注", children: a.map(({ note: s, rect: c }) => /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      className: `reader-ai-note-mark is-${s.kind} is-level-${s.level}` + (s.weak ? " is-weak" : "") + (r === s.id ? " is-active" : ""),
      "data-reader-ai-note-id": s.id,
      style: {
        // 贴在块的左外侧：盖住正文的标注是在帮倒忙。左边越界时退回块内。
        left: Math.max(0, c.left - Vn - 2),
        top: c.top,
        width: Vn,
        height: Math.max(12, c.height)
      },
      "aria-label": `${ki[s.kind]}：${s.text}`,
      title: s.text,
      onClick: (i) => {
        i.stopPropagation();
        const l = i.currentTarget.getBoundingClientRect();
        o(s, {
          left: l.left,
          top: l.top,
          width: l.width,
          height: l.height
        });
      },
      children: /* @__PURE__ */ p("span", { className: "sr-only", children: s.text })
    },
    s.id
  )) }) : null;
}
const Vr = 1.414;
function Ni({
  pageNumber: e,
  width: t,
  devicePixelRatio: n,
  pane: r,
  active: o = !1,
  syncedMinHeight: a = 0,
  onMetrics: s,
  cachedAspect: c,
  onAspectChange: i,
  sentinelRef: l,
  regionHighlight: d = null,
  regionTargets: u = [],
  aiNoteTargets: f = [],
  activeAiNoteId: h = null,
  onSelectAiNote: g,
  onSelectRegion: m,
  liveTranslationLayout: v,
  liveTranslationPage: y,
  showLiveTranslation: I = r === "source"
}) {
  const w = A(c ?? Vr), [b, S] = N(w.current);
  O(() => {
    c != null && Math.abs(c - w.current) >= 1e-3 && (w.current = c, S(c));
  }, [c]);
  const E = A(l);
  E.current = l;
  const M = A((U) => {
    var B;
    (B = E.current) == null || B.call(E, U);
  }).current, z = Math.max(120, Math.floor(t * b)), C = Math.max(z, Math.ceil(a || 0)), F = ut(d, t, z), R = V(
    () => mi(u, t, z),
    [z, u, t]
  ), [P, T] = N(null), k = V(
    () => R.find((U) => U.itemId === P) || null,
    [P, R]
  ), $ = (U) => {
    if (U.buttons !== 0) {
      T(null);
      return;
    }
    const B = U.currentTarget.getBoundingClientRect(), W = qn(
      R,
      U.clientX - B.left,
      U.clientY - B.top
    ), D = (W == null ? void 0 : W.itemId) || null;
    T((Z) => Z === D ? Z : D);
  }, j = (U) => {
    var D, Z, ce;
    if (!m || (Z = (D = U.target) == null ? void 0 : D.closest) != null && Z.call(D, ".reader-structure-selection-target") || `${((ce = window.getSelection()) == null ? void 0 : ce.toString()) || ""}`.trim()) return;
    const B = U.currentTarget.getBoundingClientRect(), W = qn(
      R,
      U.clientX - B.left,
      U.clientY - B.top
    );
    W && m({
      selectionType: "region",
      region: W.highlight.region,
      kind: "text",
      page: W.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: B.left + W.rect.left,
        top: B.top + W.rect.top,
        width: W.rect.width,
        height: W.rect.height
      }
    });
  }, G = (U) => {
    !Number.isFinite(U) || U <= 0 || Math.abs(w.current - U) < 1e-3 || (w.current = U, S(U), i == null || i(e, U));
  };
  return /* @__PURE__ */ L(
    "div",
    {
      ref: M,
      [Ke]: e,
      [qe]: r,
      [fn]: z,
      className: mn,
      onPointerMoveCapture: $,
      onClick: j,
      onPointerLeave: () => T(null),
      style: {
        width: t,
        height: C,
        minHeight: C
      },
      children: [
        o ? /* @__PURE__ */ p(
          ia,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: _r,
            loading: /* @__PURE__ */ p(
              "div",
              {
                className: At,
                style: { width: t, height: z }
              }
            ),
            onLoadSuccess: (U) => {
              try {
                const B = U.getViewport({ scale: 1 });
                if (B.width > 0) {
                  const W = B.height / B.width;
                  G(W);
                }
              } catch {
              }
              s == null || s();
            },
            onRenderSuccess: () => {
              s == null || s();
            }
          }
        ) : /* @__PURE__ */ p(
          "div",
          {
            className: At,
            style: { width: t, height: z },
            "aria-hidden": !0
          }
        ),
        F ? /* @__PURE__ */ p(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": d == null ? void 0 : d.itemId,
            style: F,
            "aria-hidden": "true"
          }
        ) : null,
        o && I ? /* @__PURE__ */ p(
          Ai,
          {
            layoutPage: v,
            pageState: y,
            width: t,
            height: z
          }
        ) : null,
        g ? /* @__PURE__ */ p(
          Mi,
          {
            width: t,
            height: z,
            targets: f,
            activeNoteId: h,
            onSelect: (U, B) => g(U, B)
          }
        ) : null,
        /* @__PURE__ */ p(hi, { target: o ? k : null }),
        /* @__PURE__ */ p(
          fi,
          {
            pane: r === "translated" ? "translated" : "source",
            width: t,
            height: z,
            regions: u,
            onSelect: m
          }
        )
      ]
    }
  );
}
const Li = rn(Ni), jt = 5, Ci = "120% 0px", xi = 120;
let Gn = 1;
const Zn = /* @__PURE__ */ new WeakMap();
function _i(e) {
  if (!e) return 0;
  const t = Zn.get(e);
  if (t) return t;
  const n = Gn;
  return Gn += 1, Zn.set(e, n), n;
}
function zi() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const Di = Ro(
  function({
    pane: t,
    url: n = "",
    preloadedFile: r = null,
    userZoom: o = 1,
    visible: a = !0,
    emptyLabel: s = "暂无 PDF",
    scrollRoot: c = null,
    pageWidthOverride: i = null,
    rowHeights: l,
    onMetrics: d,
    onLoadSuccess: u,
    onLoadError: f,
    onNumPagesChange: h,
    activeRegion: g = null,
    regions: m = [],
    aiNotes: v = [],
    activeAiNoteId: y = null,
    onSelectAiNote: I,
    readerMetadata: w = null,
    onSelectRegion: b,
    liveTranslation: S,
    showLiveTranslation: E = t === "source",
    liveTranslationPendingLabel: M = "",
    paneAction: z
  }, C) {
    di();
    const { file: F, loading: R, error: P } = Ua(n, r), T = `${n}\0${_i(F)}`, k = A(T);
    k.current = T;
    const $ = V(
      () => Oa(F),
      [F, n]
    ), [j, G] = N(0), [U, B] = N(""), [W, D] = N(null), [Z, ce] = N(480), X = A(null), Q = A(0), oe = V(() => zi(), []), he = V(() => ({
      cMapUrl: ot().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: ot().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    on(C, () => W, [W]), O(() => {
      const _ = (J) => {
        !Number.isFinite(J) || J < 80 || Math.abs(J - Q.current) < 8 || (Q.current = J, ce(J));
      }, q = i && i >= 80 ? i : (c == null ? void 0 : c.clientWidth) || 0;
      if (_(q), !c || typeof ResizeObserver > "u" || i && i >= 80) return;
      const K = new ResizeObserver((J) => {
        var ee, te;
        const se = ((te = (ee = J[0]) == null ? void 0 : ee.contentRect) == null ? void 0 : te.width) ?? c.clientWidth;
        !Number.isFinite(se) || se < 80 || (X.current && clearTimeout(X.current), X.current = setTimeout(() => _(se), 80));
      });
      return K.observe(c), () => {
        K.disconnect(), X.current && clearTimeout(X.current);
      };
    }, [i, c, a]);
    const de = V(
      () => is(Z, o),
      [Z, o]
    ), [H, le] = N(() => /* @__PURE__ */ new Map()), [Ie, ne] = N(() => /* @__PURE__ */ new Set()), [re, ae] = N(() => /* @__PURE__ */ new Set()), ge = A(/* @__PURE__ */ new Map()), ue = A(null), ke = A(/* @__PURE__ */ new Map()), xt = x((_, q) => {
      le((K) => {
        if (K.get(_) === q) return K;
        const J = new Map(K);
        return J.set(_, q), J;
      });
    }, []), ht = x((_, q) => {
      const K = ge.current, J = K.get(_);
      if (J && ue.current)
        try {
          ue.current.unobserve(J);
        } catch {
        }
      if (q) {
        if (K.set(_, q), ue.current)
          try {
            ue.current.observe(q);
          } catch {
          }
      } else
        K.delete(_);
    }, []), pt = A(/* @__PURE__ */ new Map()), $e = x((_) => {
      const q = pt.current;
      let K = q.get(_);
      return K || (K = (J) => ht(_, J), q.set(_, K)), K;
    }, [ht]);
    O(() => {
      if (typeof IntersectionObserver > "u") return;
      const _ = ke.current, q = new IntersectionObserver(
        (K) => {
          const J = [], se = [];
          for (const ee of K) {
            const te = ee.target, pe = Lt(te);
            Number.isFinite(pe) && (ee.isIntersecting ? J : se).push(pe);
          }
          if ((J.length || se.length) && ne((ee) => {
            let te = null;
            for (const pe of J)
              ee.has(pe) || (te = te || new Set(ee), te.add(pe));
            for (const pe of se)
              ee.has(pe) && (te = te || new Set(ee), te.delete(pe));
            return te || ee;
          }), J.length) {
            for (const ee of J) {
              const te = _.get(ee);
              te && (clearTimeout(te), _.delete(ee));
            }
            ae((ee) => {
              let te = null;
              for (const pe of J)
                ee.has(pe) || (te = te || new Set(ee), te.add(pe));
              return te || ee;
            });
          }
          for (const ee of se)
            _.has(ee) || _.set(ee, setTimeout(() => {
              _.delete(ee), ae((te) => {
                if (!te.has(ee)) return te;
                const pe = new Set(te);
                return pe.delete(ee), pe;
              });
            }, xi));
        },
        { root: c, rootMargin: Ci, threshold: 0 }
      );
      ue.current = q;
      for (const K of ge.current.values())
        try {
          q.observe(K);
        } catch {
        }
      return () => {
        q.disconnect(), ue.current === q && (ue.current = null);
        for (const K of _.values()) clearTimeout(K);
        _.clear();
      };
    }, [c]), De(() => {
      G(0), B(""), ne(/* @__PURE__ */ new Set()), ae(/* @__PURE__ */ new Set()), le(/* @__PURE__ */ new Map()), ge.current.clear();
      const _ = ke.current;
      for (const q of _.values()) clearTimeout(q);
      _.clear(), h == null || h(0, t);
    }, [T, h, t]);
    const Ge = x(
      ({ numPages: _ }) => {
        k.current === T && (G(_), B(""), h == null || h(_, t), u == null || u({ numPages: _, pane: t }));
      },
      [T, u, h, t]
    ), je = x(
      (_) => {
        if (k.current !== T) return;
        const q = (_ == null ? void 0 : _.message) || "PDF 解析失败";
        B(q), G(0), h == null || h(0, t), f == null || f(_, t);
      },
      [T, f, h, t]
    ), Me = V(
      () => j > 0 ? Array.from({ length: j }, (_, q) => q + 1) : [],
      [j]
    );
    O(() => {
      typeof IntersectionObserver < "u" || ae(new Set(Me));
    }, [Me]);
    const gt = V(
      () => _t(g, w, t),
      [g, w, t]
    ), vo = V(() => {
      const _ = /* @__PURE__ */ new Map();
      for (const q of m) {
        const K = _t(q, w, t);
        if (!K) continue;
        const J = _.get(K.box.page) || [];
        J.push(K), _.set(K.box.page, J);
      }
      return _;
    }, [t, w, m]), So = V(() => {
      const _ = /* @__PURE__ */ new Map();
      for (const q of v) {
        const K = wt(m, q.anchor.blockId);
        if (!K) continue;
        const J = _t(K, w, t);
        if (!J) continue;
        const se = _.get(J.box.page) || [];
        se.push({ note: q, highlight: J }), _.set(J.box.page, se);
      }
      return _;
    }, [v, t, w, m]), wo = V(() => {
      if (j === 0) return /* @__PURE__ */ new Set();
      if (!(!!c && typeof IntersectionObserver < "u" && a)) return new Set(Me);
      if (Ie.size === 0) {
        const K = Math.min(j, jt * 2 + 1);
        return new Set(Array.from({ length: K }, (J, se) => se + 1));
      }
      const q = /* @__PURE__ */ new Set();
      for (const K of Ie)
        for (let J = -jt; J <= jt; J++) {
          const se = K + J;
          se >= 1 && se <= j && q.add(se);
        }
      return q;
    }, [j, Me, c, a, Ie]), Io = !n || !!P || !!U, Po = n && (P || U) || s;
    return /* @__PURE__ */ L(
      "section",
      {
        ref: D,
        className: `reader-panel ${es}${a ? "" : " is-hidden"}`,
        [qe]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": a ? "true" : "false",
        "data-live-translation-status": (S == null ? void 0 : S.jobStatus) || void 0,
        "aria-hidden": a ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          z ? /* @__PURE__ */ p("div", { className: "reader-react-pdf-pane-action", children: z }) : null,
          M ? /* @__PURE__ */ L("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ p("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ p("span", { children: M })
          ] }) : null,
          Io && !R ? /* @__PURE__ */ p("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: Po }) : null,
          R ? /* @__PURE__ */ p("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          $ && !P ? /* @__PURE__ */ p("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ p(
            ca,
            {
              file: $,
              loading: null,
              error: null,
              options: he,
              onLoadSuccess: Ge,
              onLoadError: je,
              className: "reader-react-pdf-document",
              children: Me.map((_) => {
                if (wo.has(_))
                  return /* @__PURE__ */ p(
                    Li,
                    {
                      pane: t,
                      pageNumber: _,
                      width: de,
                      devicePixelRatio: oe,
                      active: re.has(_),
                      syncedMinHeight: (l == null ? void 0 : l.get(_)) || 0,
                      onMetrics: d,
                      cachedAspect: H.get(_),
                      onAspectChange: xt,
                      sentinelRef: $e(_),
                      regionHighlight: (gt == null ? void 0 : gt.box.page) === _ ? gt : null,
                      regionTargets: vo.get(_),
                      aiNoteTargets: So.get(_),
                      activeAiNoteId: y,
                      onSelectAiNote: I,
                      onSelectRegion: b,
                      liveTranslationLayout: S == null ? void 0 : S.layoutByPage.get(_ - 1),
                      liveTranslationPage: S == null ? void 0 : S.pagesByPage.get(_ - 1),
                      showLiveTranslation: E
                    },
                    `${t}-${_}`
                  );
                const K = H.get(_) ?? Vr, J = Math.max(120, Math.floor(de * K)), se = Math.max(J, Math.ceil((l == null ? void 0 : l.get(_)) || 0));
                return /* @__PURE__ */ p(
                  "div",
                  {
                    ref: $e(_),
                    [Ke]: _,
                    [qe]: t,
                    [fn]: J,
                    className: mn,
                    style: {
                      width: de,
                      height: se,
                      minHeight: se
                    },
                    children: /* @__PURE__ */ p(
                      "div",
                      {
                        className: At,
                        style: { width: de, height: J },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${_}`
                );
              })
            },
            T
          ) }) : null
        ]
      }
    );
  }
), Yn = rn(Di), Gr = an(null), Zr = an(null);
function Fi({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ p(Gr.Provider, { value: e, children: /* @__PURE__ */ p(Zr.Provider, { value: t, children: n }) });
}
function mt() {
  return sn(Gr);
}
function Oi() {
  return sn(Zr);
}
function $i({
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
function ji(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function Ui(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function Bi(e) {
  const t = mt(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", c = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, l = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), d = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, u = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, h = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? ft, g = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, m = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), v = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, y = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, I = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, w = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", b = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", S = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, E = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, M = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), z = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), C = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), F = e.regions ?? (t == null ? void 0 : t.regions) ?? [], R = (t == null ? void 0 : t.aiNotes) ?? [], P = (t == null ? void 0 : t.activeAiNoteId) ?? null, T = t == null ? void 0 : t.onSelectAiNote, k = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), $ = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), j = $i({
    mode: s,
    compareMode: c,
    showSource: i,
    showTranslated: l,
    markdownSplit: n,
    overlayOnSource: d
  }), G = ji(
    g,
    n || r,
    typeof document > "u" ? g * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ p(
    "div",
    {
      ref: u,
      className: xr,
      "data-reader-region-count": F.length,
      "data-reader-structured-region-count": F.filter(Pr).length,
      "data-reader-metadata-ready": k ? "true" : "false",
      children: /* @__PURE__ */ L(
        "main",
        {
          className: `${Qa} reader-mode-${j.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            v ? /* @__PURE__ */ p(
              Yn,
              {
                pane: "source",
                url: w,
                preloadedFile: S,
                userZoom: h,
                visible: j.showSource,
                scrollRoot: f,
                pageWidthOverride: G,
                rowHeights: j.compareMode ? m : void 0,
                onMetrics: M,
                emptyLabel: I ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: z,
                activeRegion: C,
                regions: F,
                aiNotes: R,
                activeAiNoteId: P,
                onSelectAiNote: T,
                readerMetadata: k,
                onSelectRegion: $,
                liveTranslation: d ? o : void 0,
                showLiveTranslation: d,
                liveTranslationPendingLabel: d ? Ui(o) : "",
                paneAction: d ? /* @__PURE__ */ L(dt, { children: [
                  e.sourcePaneAction,
                  /* @__PURE__ */ p(
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
            y ? /* @__PURE__ */ p(
              Yn,
              {
                pane: "translated",
                url: b,
                preloadedFile: E,
                userZoom: h,
                visible: j.showTranslated,
                scrollRoot: f,
                pageWidthOverride: G,
                rowHeights: j.compareMode ? m : void 0,
                onMetrics: M,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: z,
                activeRegion: C,
                regions: F,
                aiNotes: R,
                activeAiNoteId: P,
                onSelectAiNote: T,
                readerMetadata: k,
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
const Hi = [
  { id: "source", label: "源文件", Icon: Er },
  { id: "compare", label: "对照", Icon: Ar },
  { id: "translated", label: "翻译文件", Icon: kr }
];
function Ji(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function Wi(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Ki(e) {
  const t = mt(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null
  } = e, s = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, c = a ? Ji(a.state) : "";
  return /* @__PURE__ */ L("header", { className: "reader-workspace-bar", children: [
    a ? /* @__PURE__ */ L(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${a.state.connection}${a.visible ? " is-active" : ""}`,
        "aria-pressed": a.visible,
        "aria-label": a.visible ? "隐藏实时译文" : "显示实时译文",
        title: a.state.error || c,
        onClick: a.onToggle,
        children: [
          /* @__PURE__ */ p(Ko, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ p("span", { className: "reader-live-translation-toggle-label", children: c })
        ]
      }
    ) : null,
    /* @__PURE__ */ p("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: Hi.map(({ id: i, label: l, Icon: d }) => {
      const u = n === i, f = Wi({
        id: i,
        documentReady: r,
        sourceViewOnly: s,
        liveTranslationAvailable: !!a
      });
      return /* @__PURE__ */ L(
        "button",
        {
          type: "button",
          className: `reader-workspace-tab${u ? " is-active" : ""}`,
          role: "tab",
          "aria-selected": u,
          "aria-label": l,
          title: f ? `${l} 需要文档任务` : l,
          disabled: f,
          onClick: () => o(i),
          children: [
            /* @__PURE__ */ p(d, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ p("span", { className: "reader-workspace-tab-label", children: l })
          ]
        },
        i
      );
    }) })
  ] });
}
const qi = {
  markdown: { label: "Markdown", short: "MD", Icon: Go, needsJob: !0 },
  ai: { label: "AI 问答", short: "AI", Icon: Nr, needsJob: !0 },
  notes: { label: "批注", short: "注", Icon: Mr, needsJob: !1 },
  // 手写批注和 agent 标的批注不合并：前者可改可删可导出，后者是 agent 重写整份
  // notes.v1.json 时一起换掉的。合成一个列表会出现「一半条目能编辑一半不能」。
  "ai-notes": { label: "AI 批注", short: "标", Icon: Vo, needsJob: !1 },
  // 摘录走 documentId 也能读，没有 job 一样有内容。
  favorites: { label: "摘录", short: "藏", Icon: qo, needsJob: !1 }
}, Vi = Fr.map(
  (e) => ({ id: e, ...qi[e] })
), Gi = {
  "reading-path": {
    label: "阅读路径",
    short: "路径",
    Icon: Xo,
    adapterKey: "renderReaderReadingPath",
    slot: "document",
    ariaLabel: "阅读路径",
    keepMounted: !1
  },
  "reading-canvas": {
    label: "画布",
    short: "画",
    Icon: Yo,
    adapterKey: "renderReaderReadingCanvas",
    slot: "document",
    ariaLabel: "AI 画布",
    keepMounted: !0
  },
  terminal: {
    label: "终端",
    short: "SH",
    Icon: Zo,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    ariaLabel: "fx 终端",
    keepMounted: !0
  }
}, Yr = Or.map(
  (e) => ({ id: e, ...Gi[e] })
);
function Zi(e) {
  return [
    ...Vi.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: a
    })),
    ...Yr.filter((t) => e(t.adapterKey)).map(({ id: t, label: n, short: r, Icon: o }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: !1
    }))
  ];
}
function Yi() {
  const e = ie();
  return Zi((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function Xi(e) {
  const t = mt(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), c = Yi();
  return n ? /* @__PURE__ */ L("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ p("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: c.map(({ id: i, label: l, Icon: d, needsJob: u }) => {
      const f = n === i, h = u && o, g = r == null ? void 0 : r[i];
      return /* @__PURE__ */ L(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": f,
          className: `reader-assistant-dock-tab${f ? " is-active" : ""}`,
          title: h ? `${l} 需打开任务阅读` : l,
          disabled: h,
          onClick: () => a(i),
          children: [
            /* @__PURE__ */ p(d, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ p("span", { className: "reader-assistant-dock-tab-label", children: l }),
            g ? /* @__PURE__ */ p("span", { className: "reader-assistant-dock-badge", children: g }) : null
          ]
        },
        i
      );
    }) }),
    /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: "reader-assistant-dock-close",
        "aria-label": "关闭阅读辅助面板",
        title: "关闭辅助面板",
        onClick: s,
        children: /* @__PURE__ */ p(ln, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ p("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: c.map(({ id: i, label: l, short: d, Icon: u, needsJob: f }) => {
    const h = f && o, g = r == null ? void 0 : r[i];
    return /* @__PURE__ */ L(
      "button",
      {
        type: "button",
        className: "reader-assistant-rail-button",
        "aria-label": `打开${l}`,
        title: h ? `${l} 需打开任务阅读` : l,
        disabled: h,
        onClick: () => a(i),
        children: [
          /* @__PURE__ */ p(u, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
          /* @__PURE__ */ p("span", { children: d }),
          g ? /* @__PURE__ */ p("span", { className: "reader-assistant-dock-badge", children: g }) : null
        ]
      },
      i
    );
  }) });
}
function Qi(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function ec(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function tc(e) {
  return e / 100 * window.innerHeight;
}
function nc(e) {
  return e / 100 * window.innerWidth;
}
function rc(e) {
  switch (typeof e) {
    case "number":
      return [e, "px"];
    case "string": {
      const t = parseFloat(e);
      return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
    }
  }
}
function et({
  groupSize: e,
  panelElement: t,
  styleProp: n
}) {
  let r;
  const [o, a] = rc(n);
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
      r = ec(t, o);
      break;
    }
    case "em": {
      r = Qi(t, o);
      break;
    }
    case "vh": {
      r = tc(o);
      break;
    }
    case "vw": {
      r = nc(o);
      break;
    }
  }
  return r;
}
function me(e) {
  return parseFloat(e.toFixed(3));
}
function Ve({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, o) => (r += t === "horizontal" ? o.element.offsetWidth : o.element.offsetHeight, r), 0);
}
function Xt(e) {
  const { panels: t } = e, n = Ve({ group: e });
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
      const d = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.collapsedSize
      });
      s = me(d / n * 100);
    }
    let c;
    if (a.defaultSize !== void 0) {
      const d = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      c = me(d / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const d = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.minSize
      });
      i = me(d / n * 100);
    }
    let l = 100;
    if (a.maxSize !== void 0) {
      const d = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      l = me(d / n * 100);
    }
    return {
      groupResizeBehavior: a.groupResizeBehavior,
      collapsedSize: s,
      collapsible: a.collapsible === !0,
      defaultSize: c,
      disabled: a.disabled,
      minSize: i,
      maxSize: l,
      panelId: r.id
    };
  });
}
function Y(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function Qt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? oc : ac
  );
}
function oc(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function ac(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function Xr(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Qr(e, t) {
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
function sc({
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
    const { x: c, y: i } = Qr(r, s), l = e === "horizontal" ? c : i;
    l < a && (a = l, o = s);
  }
  return Y(o, "No rect found"), o;
}
let vt;
function ic() {
  return vt === void 0 && (typeof matchMedia == "function" ? vt = !!matchMedia("(pointer:coarse)").matches : vt = !1), vt;
}
function eo(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = Qt(
    n,
    Array.from(t.children).filter(Xr).map((g) => ({ element: g }))
  ).map(({ element: g }) => g), s = [];
  let c = !1, i = !1, l = -1, d = -1, u = 0, f, h = [];
  {
    let g = -1;
    for (const m of a)
      m.hasAttribute("data-panel") && (g++, m.hasAttribute("data-disabled") || (u++, l === -1 && (l = g), d = g));
  }
  if (u > 1) {
    let g = -1;
    for (const m of a)
      if (m.hasAttribute("data-panel")) {
        g++;
        const v = r.find(
          (y) => y.element === m
        );
        if (v) {
          if (f) {
            const y = f.element.getBoundingClientRect(), I = m.getBoundingClientRect();
            let w;
            if (i) {
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
              ), S = n === "horizontal" ? new DOMRect(I.left, I.top, 0, I.height) : new DOMRect(I.left, I.top, I.width, 0);
              switch (h.length) {
                case 0: {
                  w = [
                    b,
                    S
                  ];
                  break;
                }
                case 1: {
                  const E = h[0], M = sc({
                    orientation: n,
                    rects: [y, I],
                    targetRect: E.element.getBoundingClientRect()
                  });
                  w = [
                    E,
                    M === y ? S : b
                  ];
                  break;
                }
                default: {
                  w = h;
                  break;
                }
              }
            } else
              h.length ? w = h : w = [
                n === "horizontal" ? new DOMRect(
                  y.right,
                  I.top,
                  I.left - y.right,
                  I.height
                ) : new DOMRect(
                  I.left,
                  y.bottom,
                  I.width,
                  I.top - y.bottom
                )
              ];
            for (const b of w) {
              let S = "width" in b ? b : b.element.getBoundingClientRect();
              const E = ic() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (S.width < E) {
                const z = E - S.width;
                S = new DOMRect(
                  S.x - z / 2,
                  S.y,
                  S.width + z,
                  S.height
                );
              }
              if (S.height < E) {
                const z = E - S.height;
                S = new DOMRect(
                  S.x,
                  S.y - z / 2,
                  S.width,
                  S.height + z
                );
              }
              const M = g <= l || g > d;
              !c && !M && s.push({
                group: e,
                groupSize: Ve({ group: e }),
                panels: [f, v],
                separator: "width" in b ? void 0 : b,
                rect: S
              }), c = !1;
            }
          }
          i = !1, f = v, h = [];
        }
      } else if (m.hasAttribute("data-separator")) {
        m.ariaDisabled !== null && (c = !0);
        const v = o.find(
          (y) => y.element === m
        );
        v ? h.push(v) : (f = void 0, h = []);
      } else
        i = !0;
  }
  return s;
}
var Ne;
class to {
  constructor() {
    xn(this, Ne, {});
  }
  addListener(t, n) {
    const r = Ze(this, Ne)[t];
    return r === void 0 ? Ze(this, Ne)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = Ze(this, Ne)[t];
    if (r !== void 0)
      if (r.length === 1)
        r[0].call(null, n);
      else {
        let o = !1, a = null;
        const s = Array.from(r);
        for (let c = 0; c < s.length; c++) {
          const i = s[c];
          try {
            i.call(null, n);
          } catch (l) {
            a === null && (o = !0, a = l);
          }
        }
        if (o)
          throw a;
      }
  }
  removeAllListeners() {
    _n(this, Ne, {});
  }
  removeListener(t, n) {
    const r = Ze(this, Ne)[t];
    if (r !== void 0) {
      const o = r.indexOf(n);
      o >= 0 && r.splice(o, 1);
    }
  }
}
Ne = new WeakMap();
let Je = {
  cursorFlags: 0,
  state: "inactive"
};
const bn = new to();
function xe() {
  return Je;
}
function cc(e) {
  return bn.addListener("change", e);
}
function lc(e) {
  const t = Je, n = { ...Je };
  n.cursorFlags = e, Je = n, bn.emit("change", {
    prev: t,
    next: n
  });
}
function We(e) {
  const t = Je;
  Je = e, bn.emit("change", {
    prev: t,
    next: e
  });
}
const dc = (e) => e, Ut = () => {
}, no = 1, ro = 2, oo = 4, ao = 8, Xn = 3, Qn = 12;
let St;
function er() {
  return St === void 0 && (St = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (St = !0)), St;
}
function uc({
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
        if (e && er()) {
          const a = (e & no) !== 0, s = (e & ro) !== 0, c = (e & oo) !== 0, i = (e & ao) !== 0;
          if (a)
            return c ? "se-resize" : i ? "ne-resize" : "e-resize";
          if (s)
            return c ? "sw-resize" : i ? "nw-resize" : "w-resize";
          if (c)
            return "s-resize";
          if (i)
            return "n-resize";
        }
        break;
      }
    }
    return er() ? r > 0 && o > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && o > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const tr = /* @__PURE__ */ new WeakMap();
function yn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = tr.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = xe();
  switch (r.state) {
    case "active":
    case "hover": {
      const o = uc({
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
  tr.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let we = /* @__PURE__ */ new Map();
const so = new to();
function fc(e) {
  we = new Map(we), we.delete(e);
}
function nr(e, t) {
  for (const [n] of we)
    if (n.id === e)
      return n;
}
function Le(e, t) {
  for (const [n, r] of we)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function Fe() {
  return we;
}
function vn(e, t) {
  return so.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Ae(e, t, n) {
  const r = we.get(e);
  we = new Map(we), we.set(e, t), so.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function io(e) {
  const t = xe();
  let n = !1;
  switch (t.state) {
    case "active":
      We({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (yn(e), n = !0, t.hitRegions.forEach((r) => {
        const o = Le(r.group.id, !0);
        Ae(r.group, o, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function rr(e) {
  e.defaultPrevented || io(e.currentTarget);
}
function mc(e, t, n) {
  let r, o = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const s = Qr(n, a.rect);
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
function hc(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function pc(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: sr(e),
    b: sr(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  Y(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const o = {
    a: ar(or(n.a)),
    b: ar(or(n.b))
  };
  if (o.a === o.b) {
    const a = r.childNodes, s = {
      a: n.a.at(-1),
      b: n.b.at(-1)
    };
    let c = a.length;
    for (; c--; ) {
      const i = a[c];
      if (i === s.a) return 1;
      if (i === s.b) return -1;
    }
  }
  return Math.sign(o.a - o.b);
}
const gc = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function bc(e) {
  const t = getComputedStyle(co(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function yc(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || bc(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || gc.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function or(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (Y(n, "Missing node"), yc(n)) return n;
  }
  return null;
}
function ar(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function sr(e) {
  const t = [];
  for (; e; )
    t.push(e), e = co(e);
  return t;
}
function co(e) {
  const { parentNode: t } = e;
  return hc(t) ? t.host : t;
}
function vc(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function Sc({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!Xr(n) || n.contains(e) || e.contains(n))
    return !0;
  if (pc(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (vc(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function Sn(e, t) {
  const n = [];
  return t.forEach((r, o) => {
    if (o.disabled)
      return;
    const a = eo(o), s = mc(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && Sc({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function wc(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function fe(e, t, n = 0) {
  return Math.abs(me(e) - me(t)) <= n;
}
function Se(e, t) {
  return fe(e, t) ? 0 : e > t ? 1 : -1;
}
function He({
  overrideDisabledPanels: e,
  panelConstraints: t,
  prevSize: n,
  size: r
}) {
  const {
    collapsedSize: o = 0,
    collapsible: a,
    disabled: s,
    maxSize: c = 100,
    minSize: i = 0
  } = t;
  if (s && !e)
    return n;
  if (Se(r, i) < 0)
    if (a) {
      const l = (o + i) / 2;
      Se(r, l) < 0 ? r = o : r = i;
    } else
      r = i;
  return r = Math.min(c, r), r = me(r), r;
}
function it({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: o,
  trigger: a
}) {
  if (fe(e, 0))
    return t;
  const s = a === "imperative-api", c = Object.values(t), i = Object.values(o), l = [...c], [d, u] = r;
  Y(d != null, "Invalid first pivot index"), Y(u != null, "Invalid second pivot index");
  let f = 0;
  switch (a) {
    case "keyboard": {
      {
        const m = e < 0 ? u : d, v = n[m];
        Y(
          v,
          `Panel constraints not found for index ${m}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: I,
          minSize: w = 0
        } = v;
        if (I) {
          const b = c[m];
          if (Y(
            b != null,
            `Previous layout not found for panel index ${m}`
          ), fe(b, y)) {
            const S = w - b;
            Se(S, Math.abs(e)) > 0 && (e = e < 0 ? 0 - S : S);
          }
        }
      }
      {
        const m = e < 0 ? d : u, v = n[m];
        Y(
          v,
          `No panel constraints found for index ${m}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: I,
          minSize: w = 0
        } = v;
        if (I) {
          const b = c[m];
          if (Y(
            b != null,
            `Previous layout not found for panel index ${m}`
          ), fe(b, w)) {
            const S = b - y;
            Se(S, Math.abs(e)) > 0 && (e = e < 0 ? 0 - S : S);
          }
        }
      }
      break;
    }
    default: {
      const m = e < 0 ? u : d, v = n[m];
      Y(
        v,
        `Panel constraints not found for index ${m}`
      );
      const y = c[m], { collapsible: I, collapsedSize: w, minSize: b } = v;
      if (I && Se(y, b) < 0)
        if (e > 0) {
          const S = b - w, E = S / 2, M = y + e;
          Se(M, b) < 0 && (e = Se(e, E) <= 0 ? 0 : S);
        } else {
          const S = b - w, E = 100 - S / 2, M = y - e;
          Se(M, b) < 0 && (e = Se(100 + e, E) > 0 ? 0 : -S);
        }
      break;
    }
  }
  {
    const m = e < 0 ? 1 : -1;
    let v = e < 0 ? u : d, y = 0;
    for (; ; ) {
      const w = c[v];
      Y(
        w != null,
        `Previous layout not found for panel index ${v}`
      );
      const b = He({
        overrideDisabledPanels: s,
        panelConstraints: n[v],
        prevSize: w,
        size: 100
      }) - w;
      if (y += b, v += m, v < 0 || v >= n.length)
        break;
    }
    const I = Math.min(Math.abs(e), Math.abs(y));
    e = e < 0 ? 0 - I : I;
  }
  {
    let m = e < 0 ? d : u;
    for (; m >= 0 && m < n.length; ) {
      const v = Math.abs(e) - Math.abs(f), y = c[m];
      Y(
        y != null,
        `Previous layout not found for panel index ${m}`
      );
      const I = y - v, w = He({
        overrideDisabledPanels: s,
        panelConstraints: n[m],
        prevSize: y,
        size: I
      });
      if (!fe(y, w) && (f += y - w, l[m] = w, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? m-- : m++;
    }
  }
  if (wc(i, l))
    return o;
  {
    const m = e < 0 ? u : d, v = c[m];
    Y(
      v != null,
      `Previous layout not found for panel index ${m}`
    );
    const y = v + f, I = He({
      overrideDisabledPanels: s,
      panelConstraints: n[m],
      prevSize: v,
      size: y
    });
    if (l[m] = I, !fe(I, y)) {
      let w = y - I, b = e < 0 ? u : d;
      for (; b >= 0 && b < n.length; ) {
        const S = l[b];
        Y(
          S != null,
          `Previous layout not found for panel index ${b}`
        );
        const E = S + w, M = He({
          overrideDisabledPanels: s,
          panelConstraints: n[b],
          prevSize: S,
          size: E
        });
        if (fe(S, M) || (w -= M - S, l[b] = M), fe(w, 0))
          break;
        e > 0 ? b-- : b++;
      }
    }
  }
  const h = Object.values(l).reduce(
    (m, v) => v + m,
    0
  );
  if (!fe(h, 100, 0.1))
    return o;
  const g = Object.keys(o);
  return l.reduce((m, v, y) => (m[g[y]] = v, m), {});
}
function _e(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || Se(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function ze({
  layout: e,
  panelConstraints: t
}) {
  const n = Object.values(e), r = [...n], o = r.reduce(
    (c, i) => c + i,
    0
  );
  if (r.length !== t.length)
    throw Error(
      `Invalid ${t.length} panel layout: ${r.map((c) => `${c}%`).join(", ")}`
    );
  if (!fe(o, 100) && r.length > 0)
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      Y(i != null, `No layout data found for index ${c}`);
      const l = 100 / o * i;
      r[c] = l;
    }
  let a = 0;
  for (let c = 0; c < t.length; c++) {
    const i = n[c];
    Y(i != null, `No layout data found for index ${c}`);
    const l = r[c];
    Y(l != null, `No layout data found for index ${c}`);
    const d = He({
      overrideDisabledPanels: !0,
      panelConstraints: t[c],
      prevSize: i,
      size: l
    });
    l != d && (a += l - d, r[c] = d);
  }
  if (!fe(a, 0))
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      Y(i != null, `No layout data found for index ${c}`);
      const l = i + a, d = He({
        overrideDisabledPanels: !0,
        panelConstraints: t[c],
        prevSize: i,
        size: l
      });
      if (i !== d && (a -= d - i, r[c] = d, fe(a, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((c, i, l) => (c[s[l]] = i, c), {});
}
function lo({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const i = Fe();
    for (const [
      l,
      {
        defaultLayoutDeferred: d,
        derivedPanelConstraints: u,
        layout: f,
        groupSize: h,
        separatorToPanels: g
      }
    ] of i)
      if (l.id === e)
        return {
          defaultLayoutDeferred: d,
          derivedPanelConstraints: u,
          group: l,
          groupSize: h,
          layout: f,
          separatorToPanels: g
        };
    throw Error(`Group ${e} not found`);
  }, r = () => {
    const i = n().derivedPanelConstraints.find(
      (l) => l.panelId === t
    );
    if (i !== void 0)
      return i;
    throw Error(`Panel constraints not found for Panel ${t}`);
  }, o = () => {
    const i = n().group.panels.find((l) => l.id === t);
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
    panels: l,
    prevLayout: d,
    derivedPanelConstraints: u
  }) => {
    const f = a(), h = l.findIndex((v) => v.id === t), g = h === 0, m = h === l.length - 1;
    if (m && i < f && (g || l.slice(0, h).every((v, y) => {
      const I = u[y];
      return (I == null ? void 0 : I.collapsible) && fe(I.collapsedSize, d[I.panelId]);
    }))) {
      const v = l.slice(0, h).reduce((y, I) => y + d[I.id], 0);
      return {
        ...d,
        [t]: me(100 - v)
      };
    }
    return it({
      delta: m ? f - i : i - f,
      initialLayout: d,
      panelConstraints: u,
      pivotIndices: m ? [h - 1, h] : [h, h + 1],
      prevLayout: d,
      trigger: "imperative-api"
    });
  }, c = (i) => {
    const l = a();
    if (i === l)
      return;
    const {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      group: f,
      groupSize: h,
      layout: g,
      separatorToPanels: m
    } = n(), v = s({
      nextSize: i,
      panels: f.panels,
      prevLayout: g,
      derivedPanelConstraints: u
    }), y = ze({
      layout: v,
      panelConstraints: u
    });
    _e(g, y) || Ae(f, {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      groupSize: h,
      layout: y,
      separatorToPanels: m
    });
  };
  return {
    collapse: () => {
      const { collapsible: i, collapsedSize: l } = r(), { mutableValues: d } = o(), u = a();
      i && u !== l && (d.expandToSize = u, c(l));
    },
    expand: () => {
      const { collapsible: i, collapsedSize: l, minSize: d } = r(), { mutableValues: u } = o(), f = a();
      if (i && f === l) {
        let h = u.expandToSize ?? d;
        h === 0 && (h = 1), c(h);
      }
    },
    getSize: () => {
      const { group: i } = n(), l = a(), { element: d } = o(), u = i.orientation === "horizontal" ? d.offsetWidth : d.offsetHeight;
      return {
        asPercentage: l,
        inPixels: u
      };
    },
    isCollapsed: () => {
      const { collapsible: i, collapsedSize: l } = r(), d = a();
      return i && fe(l, d);
    },
    resize: (i) => {
      const { group: l } = n(), { element: d } = o(), u = Ve({ group: l }), f = et({
        groupSize: u,
        panelElement: d,
        styleProp: i
      }), h = me(f / u * 100);
      c(h);
    }
  };
}
function ir(e) {
  if (e.defaultPrevented)
    return;
  const t = Fe();
  Sn(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (o) => o.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const o = r.panelConstraints.defaultSize, a = lo({
          groupId: n.group.id,
          panelId: r.id
        });
        a && o !== void 0 && (a.resize(o), e.preventDefault());
      }
    }
  });
}
function It(e) {
  const t = Fe();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function uo({
  groupId: e
}) {
  const t = () => {
    const n = Fe();
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
        layout: c,
        separatorToPanels: i
      } = t(), l = ze({
        layout: n,
        panelConstraints: o
      });
      return r ? c : (_e(c, l) || Ae(a, {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: o,
        groupSize: s,
        layout: l,
        separatorToPanels: i
      }), l);
    }
  };
}
function Ce(e, t) {
  const n = It(e), r = Le(n.id, !0), o = n.separators.find(
    (d) => d.element === e
  );
  Y(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  Y(a, "Matching panels not found");
  const s = a.map((d) => n.panels.indexOf(d)), c = uo({ groupId: n.id }).getLayout(), i = it({
    delta: t,
    initialLayout: c,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: c,
    trigger: "keyboard"
  }), l = ze({
    layout: i,
    panelConstraints: r.derivedPanelConstraints
  });
  _e(c, l) || Ae(
    n,
    {
      defaultLayoutDeferred: r.defaultLayoutDeferred,
      derivedPanelConstraints: r.derivedPanelConstraints,
      groupSize: r.groupSize,
      layout: l,
      separatorToPanels: r.separatorToPanels
    },
    // Keyboard resizes (arrow keys, Home/End, Enter collapse/expand) originate
    // from a real DOM event on the separator, so they are user interactions
    // just like pointer drags. This function is only reached from
    // onDocumentKeyDown. See #716.
    { isUserInteraction: !0 }
  );
}
function cr(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = It(t);
  if (!n.disabled)
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault(), n.orientation === "vertical" && Ce(t, 5);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault(), n.orientation === "horizontal" && Ce(t, -5);
        break;
      }
      case "ArrowRight": {
        e.preventDefault(), n.orientation === "horizontal" && Ce(t, 5);
        break;
      }
      case "ArrowUp": {
        e.preventDefault(), n.orientation === "vertical" && Ce(t, -5);
        break;
      }
      case "End": {
        e.preventDefault(), Ce(t, 100);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const r = It(t), o = Le(r.id, !0), { derivedPanelConstraints: a, layout: s, separatorToPanels: c } = o, i = r.separators.find(
          (f) => f.element === t
        );
        Y(i, "Matching separator not found");
        const l = c.get(i);
        Y(l, "Matching panels not found");
        const d = l[0], u = a.find(
          (f) => f.panelId === d.id
        );
        if (Y(u, "Panel metadata not found"), u.collapsible) {
          const f = s[d.id], h = u.collapsedSize === f ? r.mutableState.expandedPanelSizes[d.id] ?? u.minSize : u.collapsedSize;
          Ce(t, h - f);
        }
        break;
      }
      case "F6": {
        e.preventDefault();
        const r = It(t).separators.map(
          (s) => s.element
        ), o = Array.from(r).findIndex(
          (s) => s === e.currentTarget
        );
        Y(o !== null, "Index not found");
        const a = e.shiftKey ? o > 0 ? o - 1 : r.length - 1 : o + 1 < r.length ? o + 1 : 0;
        r[a].focus({
          preventScroll: !0
        });
        break;
      }
      case "Home": {
        e.preventDefault(), Ce(t, -100);
        break;
      }
    }
}
function lr(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = Fe(), n = Sn(e, t), r = /* @__PURE__ */ new Map();
  let o = !1;
  n.forEach((a) => {
    a.separator && (o || (o = !0, a.separator.element.focus({
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
      focusVisible: !1,
      preventScroll: !0
    })));
    const s = t.get(a.group);
    s && r.set(a.group, s.layout);
  }), We({
    cursorFlags: 0,
    hitRegions: n,
    initialLayoutMap: r,
    pointerDownAtPoint: { x: e.clientX, y: e.clientY },
    state: "active"
  }), n.length && e.preventDefault();
}
function fo({
  document: e,
  event: t,
  hitRegions: n,
  initialLayoutMap: r,
  mountedGroups: o,
  pointerDownAtPoint: a,
  prevCursorFlags: s
}) {
  let c = 0;
  n.forEach((l) => {
    const { group: d, groupSize: u } = l, { orientation: f, panels: h } = d, { disableCursor: g } = d.mutableState;
    let m = 0;
    a ? f === "horizontal" ? m = (t.clientX - a.x) / u * 100 : m = (t.clientY - a.y) / u * 100 : f === "horizontal" ? m = t.clientX < 0 ? -100 : 100 : m = t.clientY < 0 ? -100 : 100;
    const v = r.get(d), y = o.get(d);
    if (!v || !y)
      return;
    const {
      defaultLayoutDeferred: I,
      derivedPanelConstraints: w,
      groupSize: b,
      layout: S,
      separatorToPanels: E
    } = y;
    if (w && S && E) {
      const M = it({
        delta: m,
        initialLayout: v,
        panelConstraints: w,
        pivotIndices: l.panels.map((z) => h.indexOf(z)),
        prevLayout: S,
        trigger: "mouse-or-touch"
      });
      if (_e(M, S)) {
        if (m !== 0 && !g)
          switch (f) {
            case "horizontal": {
              c |= m < 0 ? no : ro;
              break;
            }
            case "vertical": {
              c |= m < 0 ? oo : ao;
              break;
            }
          }
      } else
        Ae(l.group, {
          defaultLayoutDeferred: I,
          derivedPanelConstraints: w,
          groupSize: b,
          layout: M,
          separatorToPanels: E
        });
    }
  });
  let i = 0;
  t.movementX === 0 ? i |= s & Xn : i |= c & Xn, t.movementY === 0 ? i |= s & Qn : i |= c & Qn, lc(i), yn(e);
}
function dr(e) {
  const t = Fe(), n = xe();
  switch (n.state) {
    case "active":
      fo({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function ur(e) {
  var r, o;
  if (e.defaultPrevented)
    return;
  const t = xe(), n = Fe();
  switch (t.state) {
    case "active": {
      if (
        // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
        e.buttons === 0
      ) {
        We({
          cursorFlags: 0,
          state: "inactive"
        }), t.hitRegions.forEach((a) => {
          const s = Le(a.group.id, !0);
          Ae(a.group, s, {
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
      fo({
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
      const a = Sn(e, n);
      a.length === 0 ? t.state !== "inactive" && We({
        cursorFlags: 0,
        state: "inactive"
      }) : We({
        cursorFlags: 0,
        hitRegions: a,
        state: "hover"
      }), yn(e.currentTarget);
      break;
    }
  }
}
function fr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (xe().state) {
      case "hover":
        We({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function mr(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || io(e.currentTarget) && e.preventDefault();
}
function hr(e) {
  let t = 0, n = 0;
  const r = {};
  for (const a of e)
    if (a.defaultSize !== void 0) {
      t++;
      const s = me(a.defaultSize);
      n += s, r[a.panelId] = s;
    } else
      r[a.panelId] = void 0;
  const o = e.length - t;
  if (o !== 0) {
    const a = me((100 - n) / o);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = a);
  }
  return r;
}
function Ic(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = Ve({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, c = {
    asPercentage: me(a / o * 100),
    inPixels: a
  };
  r.mutableValues.prevSize = c, r.onResize(c, r.id, s);
}
function Pc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Rc({
  group: e,
  nextGroupSize: t,
  prevGroupSize: n,
  prevLayout: r
}) {
  if (n <= 0 || t <= 0 || n === t)
    return r;
  let o = 0, a = 0, s = !1;
  const c = /* @__PURE__ */ new Map(), i = [];
  for (const u of e.panels) {
    const f = r[u.id] ?? 0;
    switch (u.panelConstraints.groupResizeBehavior) {
      case "preserve-pixel-size": {
        s = !0;
        const h = f / 100 * n, g = me(
          h / t * 100
        );
        c.set(u.id, g), o += g;
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
  const l = 100 - o, d = { ...r };
  if (c.forEach((u, f) => {
    d[f] = u;
  }), a > 0)
    for (const u of i) {
      const f = r[u] ?? 0;
      d[u] = me(
        f / a * l
      );
    }
  else {
    const u = me(
      l / i.length
    );
    for (const f of i)
      d[f] = u;
  }
  return d;
}
function Tc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const Ue = /* @__PURE__ */ new Map();
function Ec(e) {
  let t = !0;
  Y(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new n((g) => {
    for (const m of g) {
      const { borderBoxSize: v, target: y } = m;
      if (y === e.element) {
        if (t) {
          const I = Ve({ group: e });
          if (I === 0)
            return;
          const w = Le(e.id);
          if (!w)
            return;
          const b = Xt(e), S = w.defaultLayoutDeferred ? hr(b) : w.layout, E = Rc({
            group: e,
            nextGroupSize: I,
            prevGroupSize: w.groupSize,
            prevLayout: S
          }), M = ze({
            layout: E,
            panelConstraints: b
          });
          if (!w.defaultLayoutDeferred && _e(w.layout, M) && Pc(
            w.derivedPanelConstraints,
            b
          ) && w.groupSize === I)
            return;
          Ae(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: b,
            groupSize: I,
            layout: M,
            separatorToPanels: w.separatorToPanels
          });
        }
      } else
        Ic(e, y, v);
    }
  });
  a.observe(e.element), e.panels.forEach((g) => {
    Y(
      !r.has(g.id),
      `Panel ids must be unique; id "${g.id}" was used more than once`
    ), r.add(g.id), g.onResize && a.observe(g.element);
  });
  const s = Ve({ group: e }), c = Xt(e), i = e.panels.map(({ id: g }) => g).join(",");
  let l = e.mutableState.defaultLayout;
  l && (Tc(e.panels, l) || (l = void 0));
  const d = e.mutableState.layouts[i] ?? l ?? hr(c), u = ze({
    layout: d,
    panelConstraints: c
  }), f = e.element.ownerDocument;
  Ue.set(
    f,
    (Ue.get(f) ?? 0) + 1
  );
  const h = /* @__PURE__ */ new Map();
  return eo(e).forEach((g) => {
    g.separator && h.set(g.separator, g.panels);
  }), Ae(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: c,
    groupSize: s,
    layout: u,
    separatorToPanels: h
  }), e.separators.forEach((g) => {
    Y(
      !o.has(g.id),
      `Separator ids must be unique; id "${g.id}" was used more than once`
    ), o.add(g.id), g.element.addEventListener("keydown", cr);
  }), Ue.get(f) === 1 && (f.addEventListener("contextmenu", rr, !0), f.addEventListener("dblclick", ir, !0), f.addEventListener("pointerdown", lr, !0), f.addEventListener("pointerleave", dr), f.addEventListener("pointermove", ur), f.addEventListener("pointerout", fr), f.addEventListener("pointerup", mr, !0)), function() {
    t = !1, Ue.set(
      f,
      Math.max(0, (Ue.get(f) ?? 0) - 1)
    ), fc(e), e.separators.forEach((g) => {
      g.element.removeEventListener("keydown", cr);
    }), Ue.get(f) || (f.removeEventListener(
      "contextmenu",
      rr,
      !0
    ), f.removeEventListener(
      "dblclick",
      ir,
      !0
    ), f.removeEventListener(
      "pointerdown",
      lr,
      !0
    ), f.removeEventListener("pointerleave", dr), f.removeEventListener("pointermove", ur), f.removeEventListener("pointerout", fr), f.removeEventListener("pointerup", mr, !0)), a.disconnect();
  };
}
function Ac() {
  const [e, t] = N({}), n = x(() => t({}), []);
  return [e, n];
}
function wn(e) {
  const t = Ir();
  return `${e ?? t}`;
}
const Oe = typeof window < "u" ? De : O;
function rt(e) {
  const t = A(e);
  return Oe(() => {
    t.current = e;
  }, [e]), x(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function In(...e) {
  return rt((t) => {
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
function Pn(e) {
  const t = A({ ...e });
  return Oe(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const mo = an(null);
function kc(e, t) {
  const n = A({
    getLayout: () => ({}),
    setLayout: dc
  });
  on(t, () => n.current, []), Oe(() => {
    Object.assign(
      n.current,
      uo({ groupId: e })
    );
  });
}
function ho({
  children: e,
  className: t,
  defaultLayout: n,
  disableCursor: r,
  disabled: o,
  elementRef: a,
  groupRef: s,
  id: c,
  onLayoutChange: i,
  onLayoutChanged: l,
  orientation: d = "horizontal",
  resizeTargetMinimumSize: u = {
    coarse: 20,
    fine: 10
  },
  style: f,
  ...h
}) {
  const g = A({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), m = rt((R) => {
    _e(g.current.onLayoutChange, R) || (g.current.onLayoutChange = R, i == null || i(R));
  }), v = rt(
    (R, P) => {
      _e(g.current.onLayoutChanged, R) || (g.current.onLayoutChanged = R, l == null || l(R, { isUserInteraction: P }));
    }
  ), y = wn(c), I = A(null), [w, b] = Ac(), S = A({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: u,
    separators: []
  }), E = In(I, a);
  kc(y, s);
  const M = rt(
    (R, P) => {
      const T = xe(), k = nr(R), $ = Le(R);
      if ($) {
        let j = !1;
        switch (T.state) {
          case "active": {
            j = T.hitRegions.some(
              (G) => G.group === k
            );
            break;
          }
        }
        return {
          flexGrow: $.layout[P] ?? 1,
          pointerEvents: j ? "none" : void 0
        };
      }
      if (n != null && n[P])
        return {
          flexGrow: n == null ? void 0 : n[P]
        };
    }
  ), z = Pn({
    defaultLayout: n,
    disableCursor: r
  }), C = V(
    () => ({
      get disableCursor() {
        return !!z.disableCursor;
      },
      getPanelStyles: M,
      id: y,
      orientation: d,
      registerPanel: (R) => {
        const P = S.current;
        return P.panels = Qt(d, [
          ...P.panels,
          R
        ]), b(), () => {
          P.panels = P.panels.filter(
            (T) => T !== R
          ), b();
        };
      },
      registerSeparator: (R) => {
        const P = S.current;
        return P.separators = Qt(d, [
          ...P.separators,
          R
        ]), b(), () => {
          P.separators = P.separators.filter(
            (T) => T !== R
          ), b();
        };
      },
      updatePanelProps: (R, { disabled: P }) => {
        const T = S.current.panels.find(
          (j) => j.id === R
        );
        T && (T.panelConstraints.disabled = P);
        const k = nr(y), $ = Le(y);
        k && $ && Ae(k, {
          ...$,
          derivedPanelConstraints: Xt(k)
        });
      },
      updateSeparatorProps: (R, {
        disabled: P,
        disableDoubleClick: T
      }) => {
        const k = S.current.separators.find(
          ($) => $.id === R
        );
        k && (k.disabled = P, k.disableDoubleClick = T);
      }
    }),
    [M, y, b, d, z]
  ), F = A(null);
  return Oe(() => {
    const R = I.current;
    if (R === null)
      return;
    const P = S.current;
    let T;
    if (z.defaultLayout !== void 0 && Object.keys(z.defaultLayout).length === P.panels.length) {
      T = {};
      for (const W of P.panels) {
        const D = z.defaultLayout[W.id];
        D !== void 0 && (T[W.id] = D);
      }
    }
    const k = {
      disabled: !!o,
      element: R,
      id: y,
      mutableState: {
        defaultLayout: T,
        disableCursor: !!z.disableCursor,
        expandedPanelSizes: S.current.lastExpandedPanelSizes,
        layouts: S.current.layouts
      },
      orientation: d,
      panels: P.panels,
      resizeTargetMinimumSize: P.resizeTargetMinimumSize,
      separators: P.separators
    };
    F.current = k;
    const $ = Ec(k), { defaultLayoutDeferred: j, derivedPanelConstraints: G, layout: U } = Le(k.id, !0);
    !j && G.length > 0 && (m(U), v(U, !1));
    const B = vn(y, (W) => {
      const { defaultLayoutDeferred: D, derivedPanelConstraints: Z, layout: ce } = W.next;
      if (D || Z.length === 0)
        return;
      const X = k.panels.map(({ id: oe }) => oe).join(",");
      k.mutableState.layouts[X] = ce, Z.forEach((oe) => {
        if (oe.collapsible) {
          const { layout: he } = W.prev ?? {};
          if (he) {
            const de = fe(
              oe.collapsedSize,
              ce[oe.panelId]
            ), H = fe(
              oe.collapsedSize,
              he[oe.panelId]
            );
            de && !H && (k.mutableState.expandedPanelSizes[oe.panelId] = he[oe.panelId]);
          }
        }
      });
      const Q = xe().state !== "active";
      m(ce), Q && v(ce, W.isUserInteraction);
    });
    return () => {
      F.current = null, $(), B();
    };
  }, [
    o,
    y,
    v,
    m,
    d,
    w,
    z
  ]), O(() => {
    const R = F.current;
    R && (R.mutableState.defaultLayout = n, R.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ p(mo.Provider, { value: C, children: /* @__PURE__ */ p(
    "div",
    {
      ...h,
      className: t,
      "data-group": !0,
      "data-testid": y,
      id: y,
      ref: E,
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
ho.displayName = "Group";
function Rn() {
  const e = sn(mo);
  return Y(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function Mc(e, t) {
  const { id: n } = Rn(), r = A({
    collapse: Ut,
    expand: Ut,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Ut
  });
  on(t, () => r.current, []), Oe(() => {
    Object.assign(
      r.current,
      lo({ groupId: n, panelId: e })
    );
  });
}
function en({
  children: e,
  className: t,
  collapsedSize: n = "0%",
  collapsible: r = !1,
  defaultSize: o,
  disabled: a,
  elementRef: s,
  groupResizeBehavior: c = "preserve-relative-size",
  id: i,
  maxSize: l = "100%",
  minSize: d = "0%",
  onResize: u,
  panelRef: f,
  style: h,
  ...g
}) {
  const m = !!i, v = wn(i), y = Pn({
    disabled: a
  }), I = A(null), w = In(I, s), {
    getPanelStyles: b,
    id: S,
    orientation: E,
    registerPanel: M,
    updatePanelProps: z
  } = Rn(), C = u !== null, F = rt(
    (k, $, j) => {
      u == null || u(k, i, j);
    }
  );
  Oe(() => {
    const k = I.current;
    if (k !== null) {
      const $ = {
        element: k,
        id: v,
        idIsStable: m,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: C ? F : void 0,
        panelConstraints: {
          groupResizeBehavior: c,
          collapsedSize: n,
          collapsible: r,
          defaultSize: o,
          disabled: y.disabled,
          maxSize: l,
          minSize: d
        }
      };
      return M($);
    }
  }, [
    c,
    n,
    r,
    o,
    C,
    v,
    m,
    l,
    d,
    F,
    M,
    y
  ]), O(() => {
    z(v, { disabled: a });
  }, [a, v, z]), Mc(v, f);
  const R = () => {
    const k = b(S, v);
    if (k)
      return JSON.stringify(k);
  }, P = To(
    (k) => vn(S, k),
    R,
    R
  );
  let T;
  return P ? T = JSON.parse(P) : o !== void 0 ? T = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: o
  } : T = { flexGrow: 1 }, /* @__PURE__ */ p(
    "div",
    {
      ...g,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": v,
      id: v,
      ref: w,
      style: {
        ...Nc,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...T
      },
      children: /* @__PURE__ */ p(
        "div",
        {
          className: t,
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            flexGrow: 1,
            overflow: "auto",
            ...h,
            // Inform the browser that the library is handling touch events for this element
            // but still allow users to scroll content within panels in the non-resizing direction
            // NOTE This is not an inherited style
            // See github.com/bvaughn/react-resizable-panels/issues/662
            touchAction: E === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
en.displayName = "Panel";
const Nc = {
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
function Lc({
  layout: e,
  panelConstraints: t,
  panelId: n,
  panelIndex: r
}) {
  let o, a;
  const s = e[n], c = t.find(
    (i) => i.panelId === n
  );
  if (c) {
    const i = c.maxSize, l = c.collapsible ? c.collapsedSize : c.minSize, d = [r, r + 1];
    a = ze({
      layout: it({
        delta: l - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], o = ze({
      layout: it({
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
function po({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: o,
  id: a,
  style: s,
  ...c
}) {
  const i = wn(a), l = Pn({
    disabled: n,
    disableDoubleClick: r
  }), [d, u] = N({}), [f, h] = N("inactive"), [g, m] = N(!1), v = A(null), y = In(v, o), {
    disableCursor: I,
    id: w,
    orientation: b,
    registerSeparator: S,
    updateSeparatorProps: E
  } = Rn(), M = b === "horizontal" ? "vertical" : "horizontal";
  Oe(() => {
    const F = v.current;
    if (F !== null) {
      const R = {
        disabled: l.disabled,
        disableDoubleClick: l.disableDoubleClick,
        element: F,
        id: i
      }, P = S(R), T = cc(
        ($) => {
          h(
            $.next.state !== "inactive" && $.next.hitRegions.some(
              (j) => j.separator === R
            ) ? $.next.state : "inactive"
          );
        }
      ), k = vn(
        w,
        ($) => {
          const { derivedPanelConstraints: j, layout: G, separatorToPanels: U } = $.next, B = U.get(R);
          if (B) {
            const W = B[0], D = B.indexOf(W);
            u(
              Lc({
                layout: G,
                panelConstraints: j,
                panelId: W.id,
                panelIndex: D
              })
            );
          }
        }
      );
      return () => {
        T(), k(), P();
      };
    }
  }, [w, i, S, l]), O(() => {
    E(i, { disabled: n, disableDoubleClick: r });
  }, [n, r, i, E]);
  let z;
  n && !I && (z = "not-allowed");
  let C;
  if (n)
    C = "disabled";
  else
    switch (f) {
      case "active": {
        C = "active";
        break;
      }
      default:
        g ? C = "focus" : C = f;
    }
  return /* @__PURE__ */ p(
    "div",
    {
      ...c,
      "aria-controls": d.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": M,
      "aria-valuemax": d.valueMax,
      "aria-valuemin": d.valueMin,
      "aria-valuenow": d.valueNow,
      children: e,
      className: t,
      "data-separator": C,
      "data-testid": i,
      id: i,
      onBlur: () => m(!1),
      onFocus: () => m(!0),
      ref: y,
      role: "separator",
      style: {
        flexBasis: "auto",
        cursor: z,
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
po.displayName = "Separator";
const Tn = 30, En = 65, ct = 50, Cc = 100 - En, xc = 100 - Tn;
function _c(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(En, Math.max(Tn, t)) : ct;
}
function An(e) {
  return 100 - e;
}
function Be(e) {
  return `${e}%`;
}
const kn = "reader-document", lt = "reader-assistant", go = "retainpdf.reader.ai-split-layout.v1", zc = {
  [kn]: An(ct),
  [lt]: ct
};
function Mn(e) {
  const t = _c(e == null ? void 0 : e[lt]);
  return {
    [kn]: An(t),
    [lt]: t
  };
}
function Dc() {
  try {
    const e = JSON.parse(localStorage.getItem(go) || "null");
    return Mn(e);
  } catch {
    return zc;
  }
}
function Fc(e) {
  try {
    localStorage.setItem(go, JSON.stringify(Mn(e)));
  } catch {
  }
}
function Bt(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = Mn(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[lt]}vw`
  );
}
function Oc() {
  const e = A(null), [t] = N(Dc);
  De(() => {
    const o = e.current;
    return Bt(o, t), () => {
      var a;
      (a = o == null ? void 0 : o.closest(".reader-react-root")) == null || a.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = x((o) => {
    Bt(e.current, o);
  }, []), r = x((o, a) => {
    Bt(e.current, o), a.isUserInteraction && Fc(o);
  }, []);
  return /* @__PURE__ */ L(
    ho,
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
        /* @__PURE__ */ p(
          en,
          {
            id: kn,
            defaultSize: Be(An(ct)),
            minSize: Be(Cc),
            maxSize: Be(xc)
          }
        ),
        /* @__PURE__ */ p(
          po,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ p("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ p(
          en,
          {
            id: lt,
            defaultSize: Be(ct),
            minSize: Be(Tn),
            maxSize: Be(En)
          }
        )
      ]
    }
  );
}
function Nn({
  id: e,
  open: t,
  ariaLabel: n,
  className: r = "",
  keepMounted: o = !1,
  onClose: a,
  toolbar: s,
  children: c
}) {
  return O(() => {
    if (!t) return;
    const i = (l) => {
      var u;
      if (l.key !== "Escape") return;
      const d = l.target;
      (u = d == null ? void 0 : d.closest) != null && u.call(d, "textarea, input, select, [contenteditable='true']") || (l.preventDefault(), a());
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [t, a]), !t && !o ? null : /* @__PURE__ */ L(
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
        s ? /* @__PURE__ */ p("div", { className: "reader-notes-panel-toolbar", children: s }) : null,
        /* @__PURE__ */ p("div", { className: "reader-notes-panel-body", children: c })
      ]
    }
  );
}
function $c({
  note: e,
  onJump: t,
  onUpdateNote: n,
  onRemove: r
}) {
  const [o, a] = N(!1), [s, c] = N(e.note);
  return O(() => {
    o || c(e.note);
  }, [e.note, o]), /* @__PURE__ */ L("article", { className: "reader-notes-item", children: [
    /* @__PURE__ */ L("div", { className: "reader-notes-item-top", children: [
      /* @__PURE__ */ p("span", { className: "reader-notes-kind", children: e.pane === "translated" ? "译文" : "原文" }),
      /* @__PURE__ */ L("div", { className: "reader-notes-item-actions", children: [
        /* @__PURE__ */ p("button", { type: "button", className: "reader-notes-link", onClick: () => t(e), children: "定位" }),
        /* @__PURE__ */ p("button", { type: "button", className: "reader-notes-danger", onClick: () => r(e.id), children: "删除" })
      ] })
    ] }),
    /* @__PURE__ */ p("p", { className: "reader-notes-quote", children: e.quote }),
    o ? /* @__PURE__ */ L("div", { className: "reader-notes-editor", children: [
      /* @__PURE__ */ p(
        "textarea",
        {
          className: "reader-notes-textarea",
          value: s,
          placeholder: "写点想法…",
          rows: 3,
          onChange: (i) => c(i.target.value)
        }
      ),
      /* @__PURE__ */ L("div", { className: "reader-notes-editor-actions", children: [
        /* @__PURE__ */ p(
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
        /* @__PURE__ */ p("button", { type: "button", className: "reader-notes-link", onClick: () => a(!1), children: "取消" })
      ] })
    ] }) : e.note ? /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: "reader-notes-note",
        onClick: () => a(!0),
        title: "点击编辑",
        children: e.note
      }
    ) : /* @__PURE__ */ p("button", { type: "button", className: "reader-notes-add-note", onClick: () => a(!0), children: "添加笔记" })
  ] });
}
function jc({
  open: e,
  groups: t,
  count: n,
  onClose: r,
  onJump: o,
  onUpdateNote: a,
  onRemove: s,
  onExport: c
}) {
  const [i, l] = N(!1);
  return /* @__PURE__ */ p(
    Nn,
    {
      id: "reader-notes-panel",
      open: e,
      ariaLabel: "批注",
      className: "is-pane-right",
      onClose: r,
      toolbar: /* @__PURE__ */ L(dt, { children: [
        /* @__PURE__ */ L("span", { className: "reader-notes-count", children: [
          n,
          " 条"
        ] }),
        /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            disabled: i || n === 0,
            onClick: async () => {
              await c() && (l(!0), window.setTimeout(() => l(!1), 1800));
            },
            children: i ? "已复制" : "导出 Markdown"
          }
        )
      ] }),
      children: n === 0 ? /* @__PURE__ */ p("p", { className: "reader-notes-empty", children: "暂无批注。在 PDF 上拖选文字，点「添加批注」。" }) : t.map((d) => /* @__PURE__ */ L("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ L("h3", { className: "reader-notes-group-title", children: [
          "第 ",
          d.page,
          " 页"
        ] }),
        d.items.map((u) => /* @__PURE__ */ p(
          $c,
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
function Uc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = N(!1);
  if (O(() => {
    !e && !t && r(!1);
  }, [e, t]), n || !e && !t)
    return null;
  const o = [
    e ? "译文区域" : "",
    t ? "阅读元数据" : ""
  ].filter(Boolean);
  return /* @__PURE__ */ L("div", { className: "reader-error-notice", role: "status", "data-reader-error-notice": "true", children: [
    /* @__PURE__ */ L("span", { className: "reader-error-notice-text", children: [
      o.join("、"),
      "加载失败，正文仍可正常阅读。"
    ] }),
    /* @__PURE__ */ p(
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
function Bc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ p(Uc, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ L(dt, { children: [
    e ? /* @__PURE__ */ p("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ L("div", { className: "reader-boot-loading-card", children: [
      /* @__PURE__ */ p("div", { className: "reader-boot-loading-text", children: n }),
      /* @__PURE__ */ p("div", { className: "reader-boot-loading-track", children: /* @__PURE__ */ p(
        "span",
        {
          className: "reader-boot-loading-bar",
          style: { width: `${Math.max(0, Math.min(100, r))}%` }
        }
      ) })
    ] }) }) : null,
    t ? /* @__PURE__ */ p("div", { className: "reader-react-error", role: "alert", children: n }) : null
  ] });
}
const pr = 170, gr = 16;
function Hc() {
  const e = typeof window > "u" ? 800 : window.innerWidth;
  if (typeof document > "u") return e;
  const t = document.querySelector(`.${xr}`), n = (t == null ? void 0 : t.getBoundingClientRect().width) ?? 0;
  return n > 0 ? n : e;
}
function Jc(e, t) {
  const n = gr + pr, r = t - gr - pr;
  return r < n ? t / 2 : Math.min(Math.max(n, e), r);
}
async function Wc(e) {
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
function Kc({
  selection: e,
  onDismiss: t,
  onAskAi: n,
  onAddNote: r
}) {
  const [o, a] = N(!1), s = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if (O(() => a(!1), [s]), !e)
    return null;
  const c = typeof window < "u" ? window.innerHeight : 600, i = e.rect.left + e.rect.width / 2, l = Jc(i, Hc()), d = e.rect.top > 72, u = d ? Math.max(12, e.rect.top - 8) : Math.min(c - 12, e.rect.top + e.rect.height + 8), f = d ? "above" : "below", h = e.pane === "translated" ? "译文" : "原文", g = e.selectionType === "text" ? "text" : e.kind, m = e.selectionType === "text" ? e.quote : Tr(e.region, e.pane), v = g === "formula" ? "公式" : g === "table" ? "表格" : g === "figure" ? "图片" : g === "text" ? "文字" : "区域", y = g === "formula" ? $o(m) : m, I = g === "formula" ? Qo : g === "table" ? ea : g === "text" ? ta : na;
  return /* @__PURE__ */ L(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${f} reader-sel-pop--region`,
      style: { left: l, top: u },
      role: "toolbar",
      "aria-label": "选区操作",
      onPointerDown: (w) => {
        w.preventDefault();
      },
      children: [
        /* @__PURE__ */ L("div", { className: "reader-sel-pop-card reader-floating-surface", children: [
          /* @__PURE__ */ L("div", { className: "reader-sel-pop-context", children: [
            /* @__PURE__ */ p(I, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
            /* @__PURE__ */ p("span", { children: v }),
            /* @__PURE__ */ p("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ p("span", { children: h }),
            /* @__PURE__ */ p("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ L("span", { children: [
              e.page,
              " 页"
            ] })
          ] }),
          /* @__PURE__ */ L("div", { className: "reader-sel-pop-actions", children: [
            y ? /* @__PURE__ */ L(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--primary",
                onClick: async () => {
                  try {
                    await Wc(y), a(!0), window.setTimeout(() => a(!1), 1400);
                  } catch (w) {
                    console.warn("[reader-selection] copy failed", w);
                  }
                },
                children: [
                  o ? /* @__PURE__ */ p(ra, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ p(oa, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ p("span", { children: o ? "已复制" : g === "formula" ? "复制 LaTeX" : "复制" })
                ]
              }
            ) : /* @__PURE__ */ p("span", { className: "reader-sel-pop-selection-hint", children: "已选择图片" }),
            r && y ? /* @__PURE__ */ L(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => r({ page: e.page, pane: e.pane, quote: y }),
                children: [
                  /* @__PURE__ */ p(Mr, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ p("span", { children: "添加批注" })
                ]
              }
            ) : null,
            n ? /* @__PURE__ */ L(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => n(e),
                children: [
                  /* @__PURE__ */ p(Nr, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ p("span", { children: "问 AI" })
                ]
              }
            ) : null,
            /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--ghost",
                onClick: t,
                "aria-label": "取消选区",
                title: "取消",
                children: /* @__PURE__ */ p(ln, { size: 15, strokeWidth: 2.5, "aria-hidden": !0 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ p("span", { className: "reader-sel-pop-caret", "aria-hidden": "true" })
      ]
    }
  );
}
function qc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Vc() {
  const [e, t] = N(!1), n = Ir(), r = A(null);
  return O(() => {
    if (!e) return;
    const o = (s) => {
      const c = r.current;
      c && s.target instanceof Node && !c.contains(s.target) && t(!1);
    }, a = (s) => {
      s.key === "Escape" && (s.preventDefault(), t(!1));
    };
    return document.addEventListener("mousedown", o), window.addEventListener("keydown", a), () => {
      document.removeEventListener("mousedown", o), window.removeEventListener("keydown", a);
    };
  }, [e]), O(() => {
    const o = (a) => {
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || qc(a.target)) return;
      const s = a.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !a.shiftKey)
          return;
        a.preventDefault(), t((c) => !c);
      }
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, []), /* @__PURE__ */ L("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
    /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: `reader-react-hud-btn reader-react-shortcuts-btn${e ? " is-active" : ""}`,
        "aria-label": "快捷键说明",
        "aria-expanded": e,
        "aria-controls": n,
        title: "快捷键（H 或 ?）",
        onClick: () => t((o) => !o),
        children: /* @__PURE__ */ p(aa, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    ),
    e ? /* @__PURE__ */ L(
      "div",
      {
        id: n,
        className: "reader-react-shortcuts-panel reader-floating-surface",
        role: "dialog",
        "aria-label": "阅读器快捷键",
        children: [
          /* @__PURE__ */ L("div", { className: "reader-react-shortcuts-head", children: [
            /* @__PURE__ */ p("strong", { children: "快捷键" }),
            /* @__PURE__ */ p(
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
          /* @__PURE__ */ p("div", { className: "reader-react-shortcuts-body", children: ei.map((o) => /* @__PURE__ */ L("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ p("h3", { children: o.title }),
            /* @__PURE__ */ p("ul", { children: o.items.map((a) => /* @__PURE__ */ L("li", { children: [
              /* @__PURE__ */ p("kbd", { children: a.keys }),
              /* @__PURE__ */ p("span", { children: a.desc })
            ] }, `${o.title}-${a.keys}`)) })
          ] }, o.title)) }),
          /* @__PURE__ */ p("p", { className: "reader-react-shortcuts-foot", children: "在输入框内不会触发快捷键" })
        ]
      }
    ) : null
  ] });
}
const Gc = ["source", "sideBySide", "translated"], Zc = { source: "", translated: "", sideBySide: "" };
function Yc(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = Tt(e.sourceUrl), n = Tt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return wa({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function Xc(e) {
  const [t, n] = N(() => /* @__PURE__ */ new Set()), r = V(
    () => e ? Yc(e) : Zc,
    [e]
  ), o = V(
    () => Gc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = x(async (s) => {
    if (!e) return;
    const c = Tt(r[s]);
    if (!(!c || t.has(s)))
      try {
        const i = e.jobId ? Sa(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await Ia(
          e.fetchProtected,
          c,
          i,
          i,
          null,
          (l) => n((d) => {
            const u = new Set(d);
            return l ? u.add(s) : u.delete(s), u;
          })
        );
      } catch (i) {
        const l = i instanceof Error ? i.message : "下载失败";
        Pa(l), n((d) => {
          const u = new Set(d);
          return u.delete(s), u;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const Qc = {
  source: Er,
  sideBySide: Ar,
  translated: kr
}, el = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function tl(e) {
  const t = mt(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = Xc(n);
  return /* @__PURE__ */ p("div", { className: "reader-download-actions", role: "group", "aria-label": "下载 PDF", children: o.map((c) => {
    const i = No[c], l = Tt(r[c]), d = a.has(c), u = !!l && !d, f = u ? "" : Lo(c, r), h = Qc[c];
    return /* @__PURE__ */ L(
      "button",
      {
        type: "button",
        id: `reader-download-${c}`,
        className: `reader-download-action${d ? " is-busy" : ""}`,
        disabled: !u,
        "aria-label": u ? `下载${i.label}` : f,
        title: u ? `下载${i.label}` : f,
        onClick: () => void s(c),
        children: [
          /* @__PURE__ */ p(h, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
          /* @__PURE__ */ p("span", { className: "reader-download-action-label", children: el[c] })
        ]
      },
      c
    );
  }) });
}
function nl(e) {
  const t = mt(), n = Oi(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? ft, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), c = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, l = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), d = as(a), u = a > zr + 1e-3, f = a < Dr - 1e-3, h = nt(), g = "50%（半屏，对照铺满）", [m, v] = N(!1), [y, I] = N(`${c}`);
  O(() => {
    m || I(`${Math.min(Math.max(c, 1), Math.max(i, 1))}`);
  }, [c, i, m]);
  const w = () => {
    if (v(!1), !l || i <= 0)
      return;
    const b = Number(`${y}`.trim());
    l(Mt(b, i));
  };
  return /* @__PURE__ */ L("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    o ? /* @__PURE__ */ p("div", { className: "reader-react-hud-group reader-react-hud-modes", children: o }) : null,
    /* @__PURE__ */ p("div", { className: "reader-react-hud-group", "aria-label": "页码", children: m ? /* @__PURE__ */ L(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (b) => {
          b.preventDefault(), w();
        },
        children: [
          /* @__PURE__ */ p(
            "input",
            {
              className: "reader-react-hud-page-input",
              type: "text",
              inputMode: "numeric",
              pattern: "[0-9]*",
              "aria-label": "跳转到页码",
              value: y,
              autoFocus: !0,
              onChange: (b) => I(b.target.value.replace(/[^\d]/g, "")),
              onBlur: w,
              onKeyDown: (b) => {
                b.key === "Escape" && (b.preventDefault(), v(!1), I(`${c}`));
              }
            }
          ),
          /* @__PURE__ */ L("span", { className: "reader-react-hud-page-suffix", children: [
            "/ ",
            i || "—"
          ] })
        ]
      }
    ) : /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: "reader-react-hud-page reader-react-hud-page-btn",
        "aria-label": i > 0 ? `跳转页码，当前第 ${c} 页，共 ${i} 页` : "页码",
        title: i > 0 ? "点击输入页码跳转" : void 0,
        disabled: !l || i <= 0,
        onClick: () => {
          !l || i <= 0 || (I(`${c}`), v(!0));
        },
        children: i > 0 ? `${Math.min(c, i)} / ${i}` : "—"
      }
    ) }),
    /* @__PURE__ */ L("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "缩小",
          disabled: !u,
          onClick: () => s(st(a, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ L(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn reader-react-hud-zoom-label",
          "aria-label": `重置为${g}`,
          title: g,
          onClick: () => s(h),
          children: [
            d,
            "%"
          ]
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "放大",
          disabled: !f,
          onClick: () => s(st(a, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ p(Vc, {}) })
  ] });
}
function Nt(e) {
  const t = `${e.documentId || ""}`.trim();
  if (t)
    return `${Pt}doc:${t}`;
  const n = `${e.jobId || ""}`.trim();
  return n ? `${Pt}job:${n}` : `${Pt}anonymous`;
}
const Pt = "retainpdf.reader.notes.v1:";
function rl(e) {
  const t = `${e.jobId || ""}`.trim();
  if (!t)
    return [];
  const n = `${Pt}job:${t}`;
  return n === Nt(e) ? [] : [n];
}
function ol() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function al(e) {
  return {
    pageIdx: Number(e.page) - 1,
    quoteText: e.quote,
    note: e.note,
    createdAt: e.createdAt
  };
}
function bo(e) {
  return Bo(e, (t) => t.page);
}
function sl(e) {
  return Jo(e, (t) => t.page).map((t) => ({ page: t.pageIdx, items: t.items }));
}
function il(e, t) {
  return Ho({
    title: e,
    annotations: t.map(al)
  });
}
function cl(e) {
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
function tn(e) {
  try {
    return cl(localStorage.getItem(e));
  } catch {
    return [];
  }
}
function ll(...e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const r of n)
      t.has(r.id) || t.set(r.id, r);
  return bo([...t.values()]);
}
function dl(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch (r) {
    return console.warn("[reader-notes] persist failed", r), !1;
  }
  const n = new Set(tn(e).map((r) => r.id));
  return t.every((r) => n.has(r.id));
}
function br(e) {
  if (typeof localStorage > "u")
    return [];
  const t = Nt(e), n = tn(t), r = rl(e).map((a) => ({ key: a, notes: tn(a) })).filter((a) => a.notes.length > 0);
  if (r.length === 0)
    return n;
  const o = ll(n, ...r.map((a) => a.notes));
  if (!dl(t, o))
    return o;
  for (const a of r)
    try {
      localStorage.removeItem(a.key);
    } catch {
    }
  return o;
}
function ul(e, t) {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.setItem(e, JSON.stringify(t));
    } catch (n) {
      console.warn("[reader-notes] persist failed", n);
    }
}
function fl(e, t = {}) {
  const n = V(
    () => ({
      jobId: `${e.jobId || ""}`.trim(),
      documentId: `${e.documentId || ""}`.trim()
    }),
    [e.jobId, e.documentId]
  ), [r, o] = N(() => ({
    key: Nt(n),
    notes: br(n)
  })), a = r.notes, s = x(
    (g) => {
      o((m) => ({
        key: m.key,
        notes: typeof g == "function" ? g(m.notes) : g
      }));
    },
    []
  ), c = t.onAfterAdd, i = Nt(n);
  O(() => {
    o((g) => g.key === i ? g : { key: i, notes: br(n) });
  }, [n, i]), O(() => {
    ul(r.key, r.notes);
  }, [r]);
  const l = x((g) => {
    const m = `${g.quote || ""}`.trim();
    if (!m)
      return null;
    const v = {
      id: ol(),
      page: Math.max(1, Math.floor(Number(g.page) || 1)),
      pane: g.pane === "translated" ? "translated" : "source",
      quote: m,
      note: `${g.note || ""}`.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s((y) => bo([v, ...y])), c == null || c(), v;
  }, [c]), d = x((g, m) => {
    const v = `${m || ""}`.trim();
    s((y) => y.map((I) => I.id === g ? { ...I, note: v } : I));
  }, []), u = x((g) => {
    s((m) => m.filter((v) => v.id !== g));
  }, []), f = x(async (g = "") => {
    var v, y;
    const m = il(g, a);
    try {
      return await ((y = (v = navigator.clipboard) == null ? void 0 : v.writeText) == null ? void 0 : y.call(v, m)), !0;
    } catch (I) {
      return console.error("[reader-notes] copy failed", I), !1;
    }
  }, [a]), h = V(() => sl(a), [a]);
  return {
    notes: a,
    groups: h,
    addFromQuote: l,
    updateNote: d,
    remove: u,
    exportMarkdown: f,
    count: a.length
  };
}
const nn = "download-toast";
function ml({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: o = "progress"
}) {
  const a = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ L("div", { className: "download-toast-card reader-floating-surface", "data-tone": o, "aria-live": "polite", children: [
    /* @__PURE__ */ L("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ p("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ p("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ p("div", { className: "download-toast-track", children: /* @__PURE__ */ p("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${a}%` } }) }),
    /* @__PURE__ */ p("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function hl(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: o = "等待响应...",
    percent: a = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    Ht.dismiss(nn);
    return;
  }
  Ht.custom(
    () => /* @__PURE__ */ p(ml, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: nn, duration: 1 / 0 }
  );
}
function pl() {
  const e = x((t) => {
    t && (t.setState = hl, t.hide = () => Ht.dismiss(nn));
  }, []);
  return /* @__PURE__ */ L(dt, { children: [
    /* @__PURE__ */ p(Wo, { position: "bottom-right" }),
    /* @__PURE__ */ p("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function Rt(e) {
  const t = A(!1);
  return e && (t.current = !0), t.current;
}
function gl({
  panel: e,
  active: t,
  context: n
}) {
  var i, l;
  const r = t === e.id, o = Rt(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = ie(), c = e.slot === "terminal" ? (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, {
    open: r,
    sessionKey: n.sessionKey,
    onClose: n.onClose
  }) : (l = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : l.call(s, {
    open: r,
    jobId: n.jobId,
    onJump: n.onJump,
    onClose: n.onClose
  });
  return c == null ? null : /* @__PURE__ */ p(
    Nn,
    {
      id: `reader-${e.id}-panel`,
      open: r,
      ariaLabel: e.ariaLabel,
      keepMounted: e.keepMounted,
      className: "is-pane-right",
      onClose: n.onClose,
      children: c
    }
  );
}
const yr = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注"
};
function bl({
  note: e,
  anchorRect: t,
  onJump: n,
  onClose: r
}) {
  const o = A(null);
  return O(() => {
    const a = (s) => {
      s.key === "Escape" && r();
    };
    return document.addEventListener("keydown", a), () => document.removeEventListener("keydown", a);
  }, [r]), O(() => {
    const a = (s) => {
      var i, l;
      const c = o.current;
      !c || c.contains(s.target) || (l = (i = s.target) == null ? void 0 : i.closest) != null && l.call(i, ".reader-ai-note-mark") || r();
    };
    return document.addEventListener("pointerdown", a, !0), () => document.removeEventListener("pointerdown", a, !0);
  }, [r]), /* @__PURE__ */ L(
    "div",
    {
      ref: o,
      className: `reader-ai-note-popover is-${e.kind}`,
      role: "dialog",
      "aria-label": `${yr[e.kind]}批注`,
      style: {
        left: t.left + t.width + 8,
        top: t.top
      },
      children: [
        /* @__PURE__ */ L("header", { className: "reader-ai-note-popover-head", children: [
          /* @__PURE__ */ p("span", { className: `reader-ai-note-kind is-${e.kind}`, children: yr[e.kind] }),
          /* @__PURE__ */ p(
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
        /* @__PURE__ */ p("p", { className: "reader-ai-note-popover-text", children: e.text }),
        e.refs.length > 0 ? /* @__PURE__ */ p("ul", { className: "reader-ai-note-refs", children: e.refs.map((a, s) => /* @__PURE__ */ p("li", { children: /* @__PURE__ */ L(
          "button",
          {
            type: "button",
            className: "reader-ai-note-ref",
            onClick: () => {
              n({ page_idx: a.pageIdx ?? void 0, block_id: a.blockId }), r();
            },
            children: [
              a.label,
              a.pageIdx != null ? /* @__PURE__ */ L("span", { className: "reader-ai-note-ref-page", children: [
                "第 ",
                a.pageIdx + 1,
                " 页"
              ] }) : null
            ]
          }
        ) }, `${a.blockId}-${s}`)) }) : (
          // 不隐藏这条：没有依据的批注该让人看得出来，自己判断信不信。
          /* @__PURE__ */ p("p", { className: "reader-ai-note-popover-weak", children: "没有给出依据（refs），多半只是复述原文" })
        )
      ]
    }
  );
}
const yl = ["question", "warning", "link", "term", "note"];
function tt(e) {
  return typeof e == "string" ? e.trim() : "";
}
function vr(e) {
  if (!e || typeof e != "object") return null;
  const t = e, n = tt(t.block_id);
  if (!n) return null;
  const r = typeof t.page_idx == "number" && Number.isFinite(t.page_idx) ? Math.max(0, Math.floor(t.page_idx)) : null;
  return { blockId: n, pageIdx: r };
}
function vl(e) {
  const t = Math.round(Number(e));
  return t === 1 || t === 2 ? t : 3;
}
function Sl(e) {
  if (!e || typeof e != "object") return null;
  const t = e.notes;
  if (!Array.isArray(t)) return null;
  const n = [], r = /* @__PURE__ */ new Set();
  return t.forEach((o, a) => {
    if (!o || typeof o != "object") return;
    const s = o, c = vr(s.anchor), i = tt(s.text);
    if (!c || !i) return;
    const l = tt(s.id) || `ai-note-${a}`;
    if (r.has(l)) return;
    r.add(l);
    const d = tt(s.kind), u = Array.isArray(s.refs) ? s.refs.flatMap((f) => {
      const h = vr(f);
      if (!h) return [];
      const g = tt(f == null ? void 0 : f.label);
      return [{ ...h, label: g || h.blockId }];
    }) : [];
    n.push({
      id: l,
      anchor: c,
      kind: yl.includes(d) ? d : "note",
      level: vl(s.level),
      text: i,
      refs: u,
      weak: u.length === 0
    });
  }), n.length === 0 ? null : { notes: n, weakCount: n.filter((o) => o.weak).length };
}
const yo = Number.MAX_SAFE_INTEGER;
function wl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = n.anchor.pageIdx ?? yo, o = t.get(r);
    o ? o.push(n) : t.set(r, [n]);
  }
  return [...t.entries()].sort((n, r) => n[0] - r[0]).map(([n, r]) => ({ page: n, items: r }));
}
function Il(e, t) {
  return e.filter((n) => n.level <= t);
}
const Pl = {
  question: "存疑",
  warning: "当心",
  link: "跨页",
  term: "术语",
  note: "笔记"
}, Sr = 2;
function Rl({
  open: e,
  doc: t,
  onClose: n,
  onJump: r
}) {
  const [o, a] = N(Sr), s = (t == null ? void 0 : t.notes) ?? [], c = Il(s, o), i = wl(c);
  return /* @__PURE__ */ p(
    Nn,
    {
      id: "reader-ai-notes-panel",
      open: e,
      ariaLabel: "AI 批注",
      className: "is-pane-right",
      onClose: n,
      toolbar: /* @__PURE__ */ L(dt, { children: [
        /* @__PURE__ */ L("span", { className: "reader-notes-count", children: [
          c.length,
          " 条"
        ] }),
        s.length > c.length ? /* @__PURE__ */ L(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            onClick: () => a(3),
            children: [
              "显示全部 ",
              s.length,
              " 条"
            ]
          }
        ) : null,
        o === 3 && s.length > 0 ? /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            onClick: () => a(Sr),
            children: "只看重点"
          }
        ) : null
      ] }),
      children: s.length === 0 ? (
        // 这段是这个功能唯一的说明书。写不清楚的话，面板开出来是空的，和"功能
        // 坏了"长得一模一样。
        /* @__PURE__ */ L("p", { className: "reader-notes-empty", children: [
          "还没有 AI 批注。在终端里让 fx 标一遍，比如：",
          /* @__PURE__ */ p("code", { children: "把第 3 节的隐含前提和跨页依赖标到 ./notes.v1.json 上" }),
          "标完这里会自己出现，不用刷新。"
        ] })
      ) : i.map((l) => /* @__PURE__ */ L("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ p("h3", { className: "reader-notes-group-title", children: l.page === yo ? "未标页码" : `第 ${l.page + 1} 页` }),
        l.items.map((d) => /* @__PURE__ */ L(
          "button",
          {
            type: "button",
            className: "reader-ai-note-row",
            "data-kind": d.kind,
            "data-weak": d.weak ? "" : void 0,
            onClick: () => r({ page_idx: d.anchor.pageIdx ?? void 0, block_id: d.anchor.blockId }),
            children: [
              /* @__PURE__ */ p("span", { className: "reader-ai-note-kind", children: Pl[d.kind] }),
              /* @__PURE__ */ p("span", { className: "reader-ai-note-text", children: d.text }),
              d.refs.length > 0 ? (
                // refs 是这份数据里最有价值的部分（见 shared/data/ai-notes.ts：
                // 指向别处的批注才不是复述）。列表里先让人看见有没有。
                /* @__PURE__ */ L("span", { className: "reader-ai-note-refs", children: [
                  "↗ ",
                  d.refs.length,
                  " 处关联"
                ] })
              ) : null
            ]
          },
          d.id
        ))
      ] }, l.page))
    }
  );
}
const Tl = 5e3;
function El(e) {
  const [t, n] = N(null);
  return O(() => {
    if (!e) {
      n(null);
      return;
    }
    let r = !1, o = "";
    const a = async () => {
      var d;
      const c = (d = ie()) == null ? void 0 : d.defaultReaderDataPort;
      if (!(c != null && c.loadAiNotes)) return;
      const i = await c.loadAiNotes(e);
      if (r) return;
      const l = i == null ? "" : JSON.stringify(i);
      l !== o && (o = l, n(Sl(i)));
    };
    a();
    const s = setInterval(() => void a(), Tl);
    return () => {
      r = !0, clearInterval(s);
    };
  }, [e]), t;
}
const Al = cn(() => import("./ReaderFavoritesPanel-CEoSM_n4.js").then((e) => ({ default: e.ReaderFavoritesPanel }))), kl = cn(() => import("./ReaderMarkdownPanel-CbSGua1x.js").then((e) => ({ default: e.ReaderMarkdownPanel }))), Ml = cn(() => import("./ReaderAiPanel-DfJG5H7U.js").then((e) => ({ default: e.ReaderAiPanel }))), Nl = [];
function Ll(e) {
  const t = e.sourceOnly || !e.translatedUrl, n = !!(e.overlayContentAvailable && e.liveTranslationVisible && !e.assistantOpen), o = e.assistantPdfPane || (e.assistantOpen && e.mode === "compare" ? "source" : e.mode);
  return {
    kind: n ? "live-overlay" : o === "compare" ? "final-compare" : o === "translated" ? "translated-only" : "source-only",
    visibleMode: o,
    compareMode: o === "compare",
    showSource: n || o !== "translated",
    showTranslated: o === "translated" || o === "compare",
    overlayOnSource: n,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: t
  };
}
function Cl(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function wr(e, t) {
  var n, r, o, a;
  return e === "compare" ? null : $r(t == null ? void 0 : t.assistantPanel) ? t.assistantPanel : ((n = t == null ? void 0 : t.splitLayout) == null ? void 0 : n.left) === "ai" || ((r = t == null ? void 0 : t.splitLayout) == null ? void 0 : r.right) === "ai" ? "ai" : ((o = t == null ? void 0 : t.splitLayout) == null ? void 0 : o.left) === "markdown" || ((a = t == null ? void 0 : t.splitLayout) == null ? void 0 : a.right) === "markdown" ? "markdown" : null;
}
function xl() {
  const e = Xs(), { boot: t, panes: n, sessionFiles: r, session: o } = e, [a, s] = N(() => wr(e.mode, Ee(e.viewStateKey))), [c, i] = N(null), [l, d] = N(null), [u, f] = N(!1), h = A(e.viewStateKey), g = A(null), m = a !== null, v = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, y = Ll({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: v,
    liveTranslationVisible: u,
    assistantOpen: m,
    assistantPdfPane: c
  }), I = y.sourceViewOnly, w = y.visibleMode, b = x(() => s("notes"), []), S = fl(
    { jobId: o.jobId, documentId: o.documentId },
    { onAfterAdd: b }
  ), E = x((H) => {
    S.addFromQuote(H), e.clearSelection();
  }, [S.addFromQuote, e.clearSelection]), M = x((H) => {
    e.goToPage(H.page, H.pane === "translated" ? "translated" : "source");
  }, [e.goToPage]), z = x(
    () => S.exportMarkdown(o.title || ""),
    [S.exportMarkdown, o.title]
  );
  O(() => {
    d(null), f(!0);
  }, [e.viewStateKey]), O(() => {
    e.session.jobTerminal && f(!1);
  }, [e.session.jobTerminal]), O(() => {
    if (!t.loading) {
      if (h.current !== e.viewStateKey) {
        h.current = e.viewStateKey;
        const H = Ee(e.viewStateKey);
        s(wr(e.mode, H)), i(null);
        return;
      }
      kt(e.viewStateKey, { assistantPanel: a, splitLayout: null });
    }
  }, [a, t.loading, e.mode, e.viewStateKey]), O(() => {
    if (!(t.loading || t.failed)) {
      if (g.current !== e.viewStateKey) {
        g.current = e.viewStateKey;
        const H = Ee(e.viewStateKey), le = I ? "source" : H == null ? void 0 : H.mode;
        le && le !== e.mode && e.setModeKeepingPage(le);
        return;
      }
      kt(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, I]);
  const C = a || (e.mode === "compare" ? "compare" : "reading"), F = Rt(a === "favorites"), R = Rt(a === "markdown"), P = Rt(a === "ai");
  ri({
    mode: w,
    sourceOnly: e.sourceOnly,
    setMode: e.setModeKeepingPage,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    currentPage: e.currentPage,
    numPages: n.hudNumPages,
    goToPage: e.goToPage,
    enabled: e.showHud
  });
  const T = x(() => {
    s(null), i(null), d(null);
  }, []), k = x((H) => {
    const le = w === "translated" ? "translated" : "source";
    e.jumpToAnchor(H, le);
  }, [e.jumpToAnchor, w]), $ = x((H) => {
    o.refreshCommittedDocument(H);
  }, [o.refreshCommittedDocument]), j = x((H) => {
    i(null);
    const le = Cl(H, e.liveTranslationAvailable);
    le !== null && f(le), e.setModeKeepingPage(H);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), G = V(() => !v || !y.showSource ? null : /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${u ? " is-active" : ""}`,
      onClick: () => f((H) => !H),
      "aria-pressed": u,
      title: u ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ), [v, y.showSource, u]), U = x((H) => {
    s(H), H !== "ai" && d(null);
  }, []), B = El(o.jobId), [W, D] = N(null), Z = x((H, le) => {
    D((Ie) => (Ie == null ? void 0 : Ie.note.id) === H.id ? null : { note: H, rect: le });
  }, []), ce = x(() => D(null), []);
  O(() => {
    D(null);
  }, [o.jobId]);
  const X = V(() => ({
    jobId: o.jobId,
    sessionKey: o.jobId || o.documentId || "reader",
    onJump: k,
    onClose: T
  }), [T, k, o.documentId, o.jobId]), Q = x((H) => {
    const le = H.pane === "translated" && !I ? "translated" : "source";
    d(H), s("ai"), i(le), e.clearSelection();
  }, [e.clearSelection, I]), oe = V(() => ({
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
    aiNotes: (B == null ? void 0 : B.notes) ?? Nl,
    activeAiNoteId: (W == null ? void 0 : W.note.id) ?? null,
    onSelectAiNote: Z,
    readerMetadata: o.readerMetadata,
    activeRegion: e.activeRegion,
    onSelectRegion: e.selectRegion,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: I,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: U, close: T }
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
    I,
    e.download,
    e.goToPage,
    U,
    T
  ]), he = V(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), de = [
    Xa,
    `is-workspace-${C}`,
    m ? "is-assistant-open" : "",
    y.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p(Fi, { value: oe, hud: he, children: /* @__PURE__ */ L("div", { className: de, "data-reader-engine": "react-pdf", "data-reader-workspace": C, children: [
    /* @__PURE__ */ p(Bc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ L("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ p(tl, {}),
      /* @__PURE__ */ p(li, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ p(
      Ki,
      {
        mode: w,
        documentReady: !!o.jobId,
        sourceViewOnly: I,
        onModeChange: j,
        liveTranslation: v ? {
          visible: u,
          state: e.liveTranslation,
          onToggle: () => f((H) => !H)
        } : null
      }
    ),
    /* @__PURE__ */ p(
      Xi,
      {
        active: a,
        badges: { notes: S.count, "ai-notes": (B == null ? void 0 : B.notes.length) ?? 0 }
      }
    ),
    m ? /* @__PURE__ */ p(Oc, {}) : null,
    /* @__PURE__ */ p(Bi, { paneComposition: y, markdownSplit: a === "markdown", assistantSplit: m, liveTranslation: e.liveTranslation, sourcePaneAction: G }),
    e.showHud ? /* @__PURE__ */ p(
      nl,
      {
        mode: w,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ L(Eo, { fallback: null, children: [
      F ? /* @__PURE__ */ p(Al, { open: a === "favorites", jobId: o.jobId, documentId: o.documentId, onClose: T, onJumpPage: e.goToPage }) : null,
      Yr.map((H) => /* @__PURE__ */ p(
        gl,
        {
          panel: H,
          active: a,
          context: X
        },
        H.id
      )),
      R ? /* @__PURE__ */ p(kl, { open: a === "markdown", jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: T }) : null,
      P ? /* @__PURE__ */ p(Ml, { open: a === "ai", jobId: o.jobId, documentId: o.documentId, sessionIdentity: o.sessionIdentity, side: "right", selectionContext: l, onClearSelectionContext: () => d(null), onClose: T, onJumpCitation: k, onDocumentCommitted: $ }, o.documentId || o.jobId || "reader-ai-pending") : null
    ] }),
    W ? /* @__PURE__ */ p(
      bl,
      {
        note: W.note,
        anchorRect: W.rect,
        onJump: k,
        onClose: ce
      }
    ) : null,
    /* @__PURE__ */ p(
      Rl,
      {
        open: a === "ai-notes",
        doc: B,
        onClose: T,
        onJump: k
      }
    ),
    /* @__PURE__ */ p(
      jc,
      {
        open: a === "notes",
        groups: S.groups,
        count: S.count,
        onClose: T,
        onJump: M,
        onUpdateNote: S.updateNote,
        onRemove: S.remove,
        onExport: z
      }
    ),
    /* @__PURE__ */ p(Kc, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: Q, onAddNote: E }),
    /* @__PURE__ */ p(pl, {})
  ] }) });
}
function od() {
  return /* @__PURE__ */ p(xl, {});
}
export {
  un as A,
  od as R,
  xl as a,
  Nn as b,
  rd as c,
  Zl as d,
  Gl as e,
  nd as f,
  Xl as g,
  Yl as h,
  Ql as i,
  td as j,
  ed as r
};
//# sourceMappingURL=ReaderApp-CfLABHNu.js.map
