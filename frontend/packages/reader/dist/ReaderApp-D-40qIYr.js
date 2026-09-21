var Dn = (e) => {
  throw TypeError(e);
};
var On = (e, t, n) => t.has(e) || Dn("Cannot " + n);
var Qe = (e, t, n) => (On(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Fn = (e, t, n) => t.has(e) ? Dn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), $n = (e, t, n, r) => (On(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as z, jsx as h, Fragment as Ct } from "react/jsx-runtime";
import { useMemo as K, useState as C, useEffect as $, useCallback as k, useRef as x, useLayoutEffect as Fe, memo as cn, forwardRef as vo, useImperativeHandle as ln, createContext as dn, useContext as un, useSyncExternalStore as wo, useId as fn, Suspense as So, lazy as mn } from "react";
import { requireAdapter as be, getReaderAdapters as ae } from "./adapters.js";
import { resolveReaderDownloadName as Po, createReaderServerFavoritesPort as Io, resolveReaderDownloadUrls as Ro, READER_PROGRESS_COPY as Ie, trimString as it, READER_DOWNLOAD_ACTIONS as To, disabledReason as Eo } from "./runtime/state.js";
import { d as Mo } from "./ask-answerer-GNQdzitl.js";
import "@retainpdf/api/conversations";
import { r as Ao, b as ko } from "./page-config-Ct7qR5rm.js";
import { c as No, n as xo, f as Ft, h as jn, a as Co, b as Lo, i as Rr, p as Lt, g as Tr, r as Er, j as Un, e as zo } from "./reader-regions-DsePY7B_.js";
import { i as _o, c as Do } from "./live-translation-CbniFg2b.js";
import { sortByPageAndCreatedAt as Oo, buildAnnotationsMarkdown as Fo, groupByPageAndCreatedAt as $o } from "./runtime/content.js";
import { toast as qt, Toaster as jo } from "sonner";
import { X as Xe, Radio as Uo, FileText as Mr, Columns2 as Ar, Languages as kr, SquareTerminal as Bo, PenTool as Ho, Route as Wo, FileCode2 as Nr, Sparkles as hn, GripHorizontal as Jo, StickyNote as zt, Sigma as Ko, Table2 as qo, Type as Vo, Image as Go, Check as Yo, Copy as Zo, Keyboard as Xo, Download as Qo, Bookmark as ea } from "lucide-react";
import { pdfjs as ta, Page as na, Document as ra } from "react-pdf";
import { e as oa, m as aa, a as sa } from "./markdown-math-XkF5urpn.js";
const ia = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, ca = "", la = Object.freeze({
  progress: "retainpdf-reader-progress"
}), da = (e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, ql = (...e) => {
  var n;
  return (((n = ae()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, ke = () => be("defaultReaderDataPort"), Bn = () => be("defaultReaderPageConfigPort"), Vl = {
  get apiPrefix() {
    return ke().apiPrefix;
  },
  fetchProtected: (...e) => ke().fetchProtected(...e),
  loadMarkdownPayload: (e) => ke().loadMarkdownPayload(e),
  loadMarkdownSource: (e) => ke().loadMarkdownSource(e),
  loadMarkdownRange: (e, t, n, r, a) => ke().loadMarkdownRange(e, t, n, r, a),
  loadJobPayload: (e) => ke().loadJobPayload(e),
  loadReaderPayload: (e, t) => ke().loadReaderPayload(e, t),
  get liveTranslation() {
    return ke().liveTranslation;
  }
}, xr = {
  messageTargetOrigin: () => Bn().messageTargetOrigin(),
  readerJobId: () => Bn().readerJobId()
}, ua = () => {
  var e;
  return ((e = ae()) == null ? void 0 : e.liveTranslation) ?? null;
}, ct = () => {
  var t;
  const e = ae();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, pn = () => {
  const e = ae();
  if (e != null && e.sessionData) return e.sessionData;
  const t = e == null ? void 0 : e.defaultReaderDataPort;
  if (!t) throw new Error("Reader adapter missing: defaultReaderDataPort (call setReaderAdapters)");
  return {
    loadReaderPayload: t.loadReaderPayload,
    loadJobPayload: t.loadJobPayload,
    fetchDocumentByJobId: (...n) => be("fetchDocumentByJobId")(...n),
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
}, Gl = () => {
  var e;
  return ((e = ae()) == null ? void 0 : e.aiOperations) ?? null;
}, Yl = () => {
  var e;
  return ((e = ae()) == null ? void 0 : e.conversations) ?? null;
}, Zl = () => {
  var e;
  return ((e = ae()) == null ? void 0 : e.askChat) ?? null;
}, fa = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, ma = () => {
  var e, t;
  return ((t = (e = ae()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, ha = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, pa = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? Po(...e);
}, ga = (...e) => {
  var t, n;
  return ((n = (t = ae()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? Ro(...e);
}, ba = (...e) => be("downloadProtectedResource")(...e), ya = (...e) => be("failDownloadToast")(...e), Xl = (e, t) => be("resolveMarkdownAssetUrl")(e, t), Ql = (e = {}) => {
  const t = ae();
  return Mo({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) || "/api/v1",
    ask: t == null ? void 0 : t.askDocumentAi,
    documentByJobId: t == null ? void 0 : t.fetchDocumentByJobId,
    ...e
  });
}, gn = "/api/v1", ed = (e = gn, t = {}) => {
  var n;
  return be("fetchFavorites")(
    ((n = ae()) == null ? void 0 : n.apiPrefix) ?? e,
    t
  );
};
function td(e = {}) {
  const t = ae();
  return Io({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) ?? gn,
    documentByJobId: (...n) => be("fetchDocumentByJobId")(...n),
    submitFavorite: (...n) => be("createFavorite")(...n),
    loadFavorites: (...n) => be("fetchFavorites")(...n),
    removeFavorite: (...n) => be("deleteFavorite")(...n),
    ...e
  });
}
function va() {
  const e = () => {
    var r;
    return Ao(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = C(e);
  return $(() => {
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
function wa() {
  const e = va(), t = K(() => ha(xr), [e]), n = K(() => ma(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function Sa(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: a,
    documentIdRef: o,
    sessionJobIdRef: s,
    switchToSourceMode: l
  } = e, [c, i] = C({
    documentId: "",
    jobId: ""
  }), [d, u] = C({
    documentId: "",
    jobId: ""
  }), f = c.documentId === t ? c.jobId : "", m = d.documentId === t ? d.jobId : "", v = n || f, [p, g] = C({
    jobId: "",
    documentId: ""
  }), y = p.jobId === v ? p.documentId : "", w = t || y, S = !!t && !v, [b, P] = C(null), N = (b == null ? void 0 : b.sessionIdentity) === r && b.documentId === w ? b : null, M = S || !!N, O = k((E) => {
    const R = `${E.documentId || ""}`.trim();
    if (!R || o.current && o.current !== R) return;
    if (!o.current && s.current)
      g({
        jobId: s.current,
        documentId: R
      });
    else if (!o.current)
      return;
    const I = `${E.revision || ""}`.trim() || `${Date.now()}`;
    P({
      documentId: R,
      revision: I,
      sessionIdentity: a.current
    }), l();
  }, []);
  $(() => {
    P((E) => E && E.sessionIdentity !== r ? null : E);
  }, [r]);
  const T = k((E) => {
    switch (E.type) {
      case "resolved-document-job":
        i({ documentId: E.documentId, jobId: E.jobId });
        break;
      case "cleared-resolved-document-job":
        i({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        u({ documentId: E.documentId, jobId: E.jobId });
        break;
      case "resolved-job-document":
        g((R) => R.jobId === E.jobId && R.documentId === E.documentId ? R : { jobId: E.jobId, documentId: E.documentId });
        break;
      case "committed-source":
        P({
          documentId: E.documentId,
          revision: E.revision,
          sessionIdentity: E.sessionIdentity
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
    documentId: w,
    sourceOnly: S,
    committedDocumentSource: b,
    setCommittedDocumentSource: P,
    activeCommittedDocumentSource: N,
    sourceViewOnly: M,
    refreshCommittedDocument: O,
    applyIdentityEvent: T
  };
}
const Pa = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Hn(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function Ia(e) {
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
function Wn(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return da(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function Ra(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function Ta(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const a of n) {
    const o = `${a || ""}`.trim();
    if (o && !Ra(o, t))
      return o.replace(/\.pdf$/i, "");
  }
  return "";
}
function Vt({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: la.progress,
        stage: n,
        percent: e,
        text: t
      },
      xr.messageTargetOrigin()
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
  }), Vt({ percent: t, text: n, stage: r });
}
function Ea(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: a,
    sessionEpochRef: o,
    closingRef: s
  } = e, [l, c] = C(null), [i, d] = C(null), [u, f] = C(""), [m, v] = C(0), p = u === n ? l : null, g = u === n ? i : null, y = Hn(p), w = Pa.has(y), S = k(() => {
    v((T) => T + 1);
  }, []), b = k((T) => {
    c(T.jobPayload), d(T.manifestPayload), f(T.sessionIdentity);
  }, []), P = k((T) => {
    c(null), d(null), f(T);
  }, []), N = x(""), M = x(""), O = k(async () => {
    const T = a.current;
    if (!T || N.current === T) return;
    const E = pn().loadJobPayload;
    if (typeof E != "function") return;
    const R = o.current.value;
    N.current = T;
    try {
      const I = await E(T);
      if (s.current || o.current.value !== R || a.current !== T || !I || typeof I != "object")
        return;
      const A = Hn(I);
      c(I), f(r.current), A === "succeeded" && M.current !== T && (M.current = T, v((D) => D + 1));
    } catch {
    } finally {
      N.current === T && (N.current = "");
    }
  }, []);
  return $(() => {
    M.current = "";
  }, [n]), $(() => {
    if (!t || w || !p) return;
    const T = window.setInterval(() => {
      O();
    }, 1e3);
    return () => window.clearInterval(T);
  }, [w, O, p, t]), {
    jobPayload: l,
    setJobPayload: c,
    manifestPayload: i,
    setManifestPayload: d,
    payloadSessionIdentity: u,
    setPayloadSessionIdentity: f,
    scopedJobPayload: p,
    scopedManifestPayload: g,
    jobStatus: y,
    jobTerminal: w,
    jobRefreshRevision: m,
    refreshJobArtifacts: S,
    refreshJobStatus: O,
    publishPayload: b,
    clearPayload: P
  };
}
function Gt(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function Ma(e, t) {
  e(t), Gt(t);
}
function Aa(e) {
  const [t, n] = C(e ? "source" : "compare"), r = k((o) => {
    e && o !== "source" || (n(o), Gt(o));
  }, [e]), a = k((o) => {
    Ma(n, o);
  }, []);
  return $(() => (e && document.documentElement.classList.add("reader-source-only"), Gt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: a };
}
function Jn(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function ka(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: Jn(n.active_job_id),
    activeVersionId: Jn(n.active_version_id)
  };
}
function Na(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, a = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return a ? { kind: "follow-active-job", jobId: a, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function xa(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: a,
    hasCommittedSource: o
  } = e;
  return t && r && n === a && !o ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function Ca(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function La(e) {
  return e ? { data: e.data.slice() } : null;
}
const za = 2, ye = /* @__PURE__ */ new Map();
function Yt(e, t) {
  ye.delete(e), ye.set(e, t);
}
function _a(e) {
  if (ye.size < za) return;
  const t = ye.keys().next().value;
  t && ye.delete(t);
}
function $t(e) {
  const t = `${e || ""}`.trim();
  if (!t || !ye.has(t)) return null;
  const n = ye.get(t);
  return Yt(t, n), n;
}
async function Cr(e, t = ct().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (ye.has(r)) {
    const l = ye.get(r);
    return Yt(r, l), l;
  }
  const a = await t(r, { signal: n.signal });
  if (!a.ok) {
    const l = new Error(`读取 PDF 失败 (${a.status})`);
    throw l.status = a.status, l;
  }
  const o = await a.arrayBuffer(), s = { data: new Uint8Array(o) };
  return ye.has(r) ? Yt(r, s) : (_a(), ye.set(r, s)), s;
}
function Da(e = "", t = null) {
  const [n, r] = C(
    () => t || $t(e)
  ), [a, o] = C(
    () => !!`${e || ""}`.trim() && !t && !$t(e)
  ), [s, l] = C("");
  return $(() => {
    if (t) {
      r(t), o(!1), l("");
      return;
    }
    const c = `${e || ""}`.trim();
    if (!c) {
      r(null), o(!1), l("");
      return;
    }
    const i = $t(c);
    if (i) {
      r(i), o(!1), l("");
      return;
    }
    let d = !1;
    return o(!0), l(""), r(null), Cr(c).then((u) => {
      d || (r(u), o(!1));
    }).catch((u) => {
      d || (r(null), o(!1), l((u == null ? void 0 : u.message) || String(u)));
    }), () => {
      d = !0;
    };
  }, [e, t]), { file: n, loading: a, error: s };
}
function Oa(e) {
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
async function Zt(e) {
  const { url: t, label: n, percentStart: r, percentEnd: a, fence: o, setBoot: s } = e;
  if (!t || o.isInactive())
    return null;
  Et(s, r, n, "download");
  const l = await Cr(t, ct().fetchProtected, {
    signal: o.signal
  });
  return o.isInactive() ? null : (Et(s, a, n, "download"), l);
}
async function Fa(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: a } = e;
  Et(a, 25, "正在下载 PDF…", "download");
  const o = [];
  let s = null, l = null;
  return t && o.push(
    Zt({
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
    Zt({
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
const vt = {
  regions: null,
  metadata: null
};
function $a(e) {
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
  } = e, [w, S] = C(""), [b, P] = C(""), [N, M] = C(null), [O, T] = C(null), [E, R] = C(!1), [I, A] = C(""), [D, L] = C([]), [j, H] = C(() => ({
    source: null,
    translated: null
  })), [q, Q] = C(
    vt
  ), [re, ne] = C({
    loading: !0,
    percent: 4,
    text: Ie.boot,
    stage: "progress",
    failed: !1
  });
  return $(() => {
    const se = new AbortController(), U = p.current.value, V = Oa({
      sessionEpochRef: p,
      closingRef: g,
      abort: se,
      sessionEpoch: U
    });
    y.current = se;
    const Z = pn();
    if (g.current)
      return se.abort(), () => {
        y.current === se && (y.current = null);
      };
    function X(_, B) {
      V.markFailed(), ne({
        loading: !1,
        percent: 100,
        text: _,
        stage: "failed",
        failed: !0
      }), Vt({ percent: 100, text: B, stage: "failed" });
    }
    function ce() {
      R(!0), ne({
        loading: !1,
        percent: 100,
        text: Ie.ready,
        stage: "ready",
        failed: !1
      }), Vt({ percent: 100, text: Ie.ready, stage: "ready" });
    }
    function me() {
      return i != null && i.documentId ? Wn(
        i.documentId,
        i.revision
      ) : ia() ? ca : Z.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function fe() {
      let _ = { activeJobId: "", activeVersionId: "" };
      try {
        const pe = await Z.fetchProtected(
          Z.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (pe != null && pe.ok) {
          const Le = await pe.json().catch(() => null);
          _ = ka(Le);
        }
      } catch {
      }
      const B = Na({
        link: _,
        rejectedDocumentJobId: o,
        hasCommittedSource: !!i
      });
      if (B.kind === "follow-active-job") {
        if (V.isInactive()) return;
        d({
          type: "resolved-document-job",
          documentId: r,
          jobId: B.jobId
        }), B.activeVersionId ? (i || d({
          type: "committed-source",
          documentId: r,
          revision: B.activeVersionId,
          sessionIdentity: c
        }), m("source")) : m("compare");
        return;
      }
      if (B.kind === "open-committed-source") {
        if (V.isInactive()) return;
        d({
          type: "committed-source",
          documentId: r,
          revision: B.revision,
          sessionIdentity: c
        }), m("source");
        return;
      }
      const oe = me();
      if (V.isInactive()) return;
      S(oe), P(""), A(""), f(c);
      const Se = await Zt({
        url: oe,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: V,
        setBoot: ne
      });
      if (!V.isInactive()) {
        if (!Se) {
          X("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        M(Se), ce();
      }
    }
    async function he() {
      var yt;
      const _ = await ((yt = Z.loadSessionSnapshot) == null ? void 0 : yt.call(Z, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: i,
        includeOptionalArtifacts: !i
      })), B = _ ? {
        jobPayload: _.sourcePayload,
        manifestPayload: _.manifestPayload,
        readerMetadata: _.readerMetadata,
        regionsPayload: _.regions,
        readerErrors: _.readerErrors
      } : await Z.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !i
      });
      if (V.isInactive()) return;
      let oe = null;
      if (n && !r) {
        try {
          oe = await Z.fetchDocumentByJobId(gn, t);
        } catch {
        }
        if (V.isInactive()) return;
      }
      const Se = Ia(B.jobPayload) || `${(oe == null ? void 0 : oe.document_id) || ""}`.trim();
      Se && !r && d({
        type: "resolved-job-document",
        jobId: t,
        documentId: Se
      });
      const pe = xa({
        payloadDocumentId: Se,
        linkedActiveJobId: `${(oe == null ? void 0 : oe.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(oe == null ? void 0 : oe.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!i
      });
      if (pe.kind === "restore-committed-source") {
        if (V.isInactive()) return;
        d({
          type: "committed-source",
          documentId: pe.documentId,
          revision: pe.revision,
          sessionIdentity: c
        }), m("source");
        return;
      }
      const Le = Z.resolveReaderSourcePdf(B.manifestPayload), gt = Z.resolveReaderTranslatedPdfUrl(B.jobPayload, B.manifestPayload), Ot = typeof Le == "string" ? Le : Z.resolveReaderArtifactUrl(Le), bt = r || Se, Pe = i != null && i.documentId ? Wn(
        i.documentId,
        i.revision
      ) : Ot || (bt ? Z.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(bt)}/source.pdf`) : ""), Ae = i ? "" : gt || "";
      if (S(Pe || ""), P(Ae), A(Ta(B.jobPayload, t)), u({
        jobPayload: B.jobPayload || null,
        manifestPayload: B.manifestPayload || null,
        sessionIdentity: c
      }), L(i ? [] : No(B.regionsPayload)), H(i ? { source: null, translated: null } : xo(B.readerMetadata)), Q(i ? vt : B.readerErrors ?? vt), !Pe && !Ae) {
        X(Ie.failed, Ie.failed);
        return;
      }
      const Ue = await Fa({
        sourceFinal: Pe || "",
        translatedFinal: Ae,
        fence: V,
        setBoot: ne
      });
      if (Ue.status !== "inactive") {
        if (Ue.status === "incomplete") {
          X("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        M(Ue.sourceBytes), T(Ue.translatedBytes), ce();
      }
    }
    async function Me() {
      R(!1), M(null), T(null), L([]), H({ source: null, translated: null }), Q(vt), Et(ne, 8, Ie.metadata, "metadata");
      try {
        if (s) {
          await fe();
          return;
        }
        if (!t) {
          X(Ie.failed, Ie.failed);
          return;
        }
        await he();
      } catch (_) {
        if (V.isClosedOrStale() || (_ == null ? void 0 : _.name) === "AbortError") return;
        V.markFailed();
        const B = Number(_ == null ? void 0 : _.status);
        if (Ca({
          status: B,
          jobId: n,
          routeDocumentId: r,
          documentJobId: a,
          sessionJobId: t
        })) {
          d({ type: "missing-document-job", documentId: r, jobId: t }), d({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const oe = _ instanceof Error ? _.message : Ie.failed;
        X(oe, oe);
      }
    }
    return Me(), () => {
      se.abort(), y.current === se && (y.current = null);
    };
  }, [t, r, a, o, s, l, i, v, n, c, d, u, f, m]), {
    sourceUrl: w,
    translatedUrl: b,
    sourceFile: N,
    translatedFile: O,
    assetsReady: E,
    title: I,
    regions: D,
    readerMetadata: j,
    readerErrors: q,
    boot: re
  };
}
function ja() {
  const e = x(!1), t = x(null), { locationKey: n, jobId: r, routeDocumentId: a, sessionIdentity: o } = wa(), s = x({ identity: "", value: 0 });
  s.current.identity !== o && (s.current = {
    identity: o,
    value: s.current.value + 1
  }, e.current = !1);
  const l = x(o), c = x(""), i = x(""), d = x(() => {
  }), u = k(() => d.current(), []), f = Sa({
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
  } = f, { mode: y, setMode: w, switchSessionMode: S } = Aa(g);
  d.current = () => {
    S("source");
  }, l.current = o, c.current = v, i.current = m;
  const b = Ea({
    sessionJobId: m,
    sessionIdentity: o,
    sessionIdentityRef: l,
    sessionJobIdRef: i,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: P,
    scopedManifestPayload: N,
    jobStatus: M,
    jobTerminal: O,
    jobRefreshRevision: T,
    refreshJobArtifacts: E,
    refreshJobStatus: R
  } = b, I = $a({
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
    switchSessionMode: S,
    jobRefreshRevision: T,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), A = k(() => {
    var L;
    e.current = !0, (L = t.current) == null || L.abort();
  }, []), D = K(
    () => ({
      fetchProtected: pn().fetchProtected,
      jobId: m,
      jobPayload: P,
      manifestPayload: N,
      sourceUrl: I.sourceUrl,
      translatedUrl: I.translatedUrl,
      sourceOnly: g
    }),
    [m, P, N, I.sourceUrl, I.translatedUrl, g]
  );
  return {
    jobId: m,
    jobStatus: M,
    workflow: `${(P == null ? void 0 : P.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: O,
    documentId: v,
    sessionIdentity: o,
    sourceOnly: p,
    mode: y,
    setMode: w,
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
    refreshJobArtifacts: E,
    refreshJobStatus: R,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: A
  };
}
const Ua = 160, Ba = 8, Ha = 960;
function Wa() {
  const e = x(null), [t, n] = C(null), [r, a] = C(Ha), o = k((s) => {
    e.current = s, n(s);
  }, []);
  return $(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const l = (i) => {
      !Number.isFinite(i) || i < Ua || a((d) => Math.abs(d - i) < Ba ? d : i);
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
function Ja(e) {
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
const jt = { source: 0, translated: 0 };
function Ka(e, t) {
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
  const [u, f] = C(() => ({
    identity: i,
    pages: jt
  })), [m, v] = C(() => ({ identity: i, tick: 0 })), p = u.identity === i ? u.pages : jt, g = m.identity === i ? m.tick : 0, y = Ja({
    mode: n,
    sourceOnly: r,
    assetsReady: a,
    hasSource: !!l || !!o,
    hasTranslated: !!c
  }), { primaryPane: w } = y, S = k((R, I) => {
    d.current === i && f((A) => {
      const D = A.identity === i ? A.pages : jt;
      return D[I] === R && A.identity === i ? A : {
        identity: i,
        pages: { ...D, [I]: R }
      };
    });
  }, [i]), b = x(null), P = k(() => {
    b.current && clearTimeout(b.current);
    const R = i;
    b.current = setTimeout(() => {
      b.current = null, d.current === R && v((I) => ({
        identity: R,
        tick: I.identity === R ? I.tick + 1 : 1
      }));
    }, 60);
  }, [i]);
  $(() => (b.current && (clearTimeout(b.current), b.current = null), f((R) => R.identity === i && R.pages.source === 0 && R.pages.translated === 0 ? R : { identity: i, pages: { source: 0, translated: 0 } }), v((R) => R.identity === i && R.tick === 0 ? R : { identity: i, tick: 0 }), () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [i]);
  const N = K(
    () => Math.max(p.source, p.translated),
    [p]
  ), M = w === "translated" ? p.translated : p.source || p.translated, O = t == null ? void 0 : t.userZoom, T = t == null ? void 0 : t.shellWidth, E = `${i}-${g}-${O}-${n}-${p.source}-${p.translated}-${T}`;
  return {
    ...y,
    numPagesByPane: p,
    hudNumPages: N,
    primaryNumPages: M,
    metricsTick: g,
    onNumPages: S,
    onMetrics: P,
    rowSyncRevision: E
  };
}
const Ge = "data-reader-page", Ye = "data-reader-pane", bn = "data-natural-height", qa = "reader-react-root", Va = "reader-react-grid", Ga = "reader-react-scroll-shell", Ya = "reader-react-pdf-pane", Lr = "reader-react-pdf-page", Mt = "reader-react-pdf-page-placeholder", yn = "reader-react-pdf-page-slot";
function lt(e, t) {
  const n = e != null ? `[${Ge}="${e}"]` : `[${Ge}]`;
  return t ? `${n}[${Ye}="${t}"]` : n;
}
function Za() {
  return `.${yn}[${Ge}]`;
}
function _t(e) {
  return Number(e.getAttribute(Ge));
}
const zr = 0.25, _r = 1, Xa = 0.05, ht = 0.5, Qa = 16, es = 8;
function ot(e) {
  return ht;
}
function Dt(e) {
  return Number.isFinite(e) ? Math.min(_r, Math.max(zr, e)) : ht;
}
function dt(e, t) {
  const n = Dt(Number(e) + t * Xa);
  return Math.round(n * 100) / 100;
}
function ts(e) {
  return Math.round(Dt(e) * 100);
}
function ns(e) {
  const n = (Number(e) || 0) - Qa - es;
  return Math.max(160, Math.floor(n));
}
function rs(e, t = ht) {
  const n = Dt(t);
  return ns((Number(e) || 0) * n);
}
function os(e, t) {
  if (!e || !Number.isFinite(t) || t <= 0 || Math.abs(t - 1) < 1e-3)
    return;
  const n = e.scrollLeft + e.clientWidth / 2, r = e.scrollTop + e.clientHeight / 2, a = Array.from(
    e.querySelectorAll(`[${Ye}]`)
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
const as = ["markdown", "ai"], vn = [
  "reading-path",
  "reading-canvas",
  "terminal"
], ss = [
  ...as,
  ...vn
];
function Dr(e) {
  return ss.includes(e);
}
function is(e) {
  return vn.includes(e);
}
const cs = "retainpdf:reader:view:v1:", Kn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), ls = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function Or() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function Xt(e) {
  return `${e || ""}`.trim();
}
function ds({
  documentId: e,
  jobId: t
}) {
  const n = Xt(e);
  if (n) return `document:${n}`;
  const r = Xt(t);
  return r ? `job:${r}` : "";
}
function Fr(e) {
  const t = Xt(e);
  return t ? `${cs}${t}` : "";
}
function us(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function fs(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!Kn.has(t) || !Kn.has(n) || t === n))
    return { left: t, right: n };
}
function ms(e) {
  return e === null ? null : Dr(e) ? e : void 0;
}
function hs(e) {
  return ls.has(e) ? e : void 0;
}
function $r(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = us(t.anchor), r = Number(t.zoom), a = hs(t.mode), o = fs(t.splitLayout), s = ms(t.assistantPanel);
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
function Te(e, t = Or()) {
  const n = Fr(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? $r(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function At(e, t, n = Or()) {
  const r = Fr(e);
  if (!r || !n) return null;
  const a = Te(e, n), o = $r({
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
function ps(e, t, n = "") {
  const [r, a] = C(() => {
    var u;
    return ((u = Te(n)) == null ? void 0 : u.zoom) ?? ot();
  }), o = x(r), s = x(n);
  o.current = r;
  const l = x(1);
  $(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const u = ((f = Te(n)) == null ? void 0 : f.zoom) ?? ot();
    l.current = 1, o.current = u, a(u);
  }, [e, n]);
  const c = k((u) => {
    const f = Dt(u), m = o.current;
    Math.abs(f - m) < 5e-4 || (l.current = f / (m || 1), At(s.current, { zoom: f }), a(f));
  }, []), i = k((u) => {
    c(dt(o.current, u));
  }, [c]), d = k((u) => {
    c(ot());
  }, [c]);
  return Fe(() => {
    const u = l.current;
    Math.abs(u - 1) < 1e-3 || (l.current = 1, os(t == null ? void 0 : t.current, u));
  }, [r, t]), { userZoom: r, onZoomChange: c, stepZoom: i, resetZoom: d };
}
function gs(e, t = !0) {
  const [n, r] = C(null), a = k(() => {
    var l, c;
    r(null);
    const s = (l = globalThis.getSelection) == null ? void 0 : l.call(globalThis);
    (c = s == null ? void 0 : s.removeAllRanges) == null || c.call(s);
  }, []), o = e.current ?? null;
  return $(() => {
    if (!t)
      return;
    const s = () => {
      var L, j;
      const p = e.current, g = (L = globalThis.getSelection) == null ? void 0 : L.call(globalThis);
      if (!p || !g || g.isCollapsed || !g.rangeCount) {
        r(null);
        return;
      }
      const y = g.getRangeAt(0);
      if (!p.contains(y.commonAncestorContainer)) {
        r(null);
        return;
      }
      const w = `${g.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (w.length < 2) {
        r(null);
        return;
      }
      let S = y.commonAncestorContainer;
      S.nodeType === Node.TEXT_NODE && (S = S.parentElement);
      const b = (j = S == null ? void 0 : S.closest) == null ? void 0 : j.call(
        S,
        lt()
      );
      if (!b || !p.contains(b)) {
        r(null);
        return;
      }
      const P = Math.max(1, Math.floor(_t(b) || 1)), M = b.getAttribute(Ye) === "translated" ? "translated" : "source", O = y.getClientRects(), T = O[O.length - 1] || y.getBoundingClientRect();
      if (!T || T.width === 0 && T.height === 0) {
        r(null);
        return;
      }
      const E = typeof window < "u" ? window.innerWidth : 800, R = typeof window < "u" ? window.innerHeight : 600, I = 16, A = Math.min(Math.max(I, T.left), E - I), D = Math.min(Math.max(I, T.top), R - I);
      r({
        selectionType: "text",
        quote: w,
        page: P,
        pane: M,
        rect: {
          left: A,
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
function bs(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, a = x(t), o = x(n), s = x(r);
  return a.current = t, o.current = n, s.current = r, { setModeKeepingPage: k((c) => {
    c !== a.current && (s.current(), o.current(c));
  }, []) };
}
function ys() {
  const [e, t] = C(null), n = k((s) => {
    t(s);
  }, []), r = k((s = null) => {
    t((l) => !s || l === s ? null : l);
  }, []), a = k((s) => {
    t((l) => l === s ? null : s);
  }, []), o = k(
    (s) => e === s,
    [e]
  );
  return { active: e, open: n, close: r, toggle: a, isOpen: o };
}
const wn = 48;
function jr(e, t = wn) {
  return e.getBoundingClientRect().top + t;
}
function Ur(e, t) {
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
  const a = _t(n);
  if (!Number.isFinite(a) || a < 1)
    return null;
  const o = n.getBoundingClientRect(), s = o.height > 0 ? o.height : 1, l = Math.min(1, Math.max(0, (t - o.top) / s));
  return { el: n, page: a, fraction: l };
}
function Ut(e, t, n = wn) {
  if (!e)
    return null;
  const r = lt(void 0, t), a = Array.from(e.querySelectorAll(r));
  if (!a.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = jr(e, n), l = Ur(a, s);
  return l ? { page: l.page, fraction: l.fraction } : null;
}
function Sn(e, t, n = "auto", r, a = wn) {
  if (!e || !t)
    return !1;
  const o = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let l = null;
  if (r && (l = e.querySelector(lt(o, r))), l || (l = e.querySelector(lt(o))), !l)
    return !1;
  const c = e.getBoundingClientRect(), i = l.getBoundingClientRect();
  if (c.height <= 0 || i.height < 8 && l.offsetHeight < 8)
    return !1;
  const d = i.height > 0 ? i.height : l.offsetHeight, u = e.scrollTop + (i.top - c.top), f = Math.max(0, u + s * d - a);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function vs(e, t, n = "smooth", r) {
  return Sn(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function Qt(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", a = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let o = !1, s = !1;
  const l = [], c = () => {
    var d;
    if (o) return;
    Sn(
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
function ws(e, t, n) {
  return Qt(
    e,
    { page: t, fraction: 0 },
    n
  );
}
function kt(e, t) {
  if (!Number.isFinite(e))
    return 1;
  const n = Math.max(1, Math.floor(e));
  return !Number.isFinite(t) || t <= 0 ? n : Math.min(t, n);
}
function ge(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function Ss(e, t, n = !0, r = "", a) {
  const [o, s] = C(1);
  return $(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const l = e.current;
    if (!l)
      return;
    let c = !1, i = null, d = 0;
    const u = lt(void 0, a), f = () => {
      if (c) return;
      const p = Array.from(l.querySelectorAll(u));
      if (!p.length)
        return;
      const g = jr(l), y = Ur(p, g);
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
const Ps = `canvas, .react-pdf__Page, .${Lr}, .${Mt}`, qn = /* @__PURE__ */ new WeakMap();
function Is(e) {
  const t = Number(e.getAttribute(bn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = qn.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(Ps), qn.set(e, n)), n) {
    const a = n.getBoundingClientRect().height;
    if (Number.isFinite(a) && a > 0)
      return a;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function Rs(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function Ts(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(Za()).forEach((r) => {
    const a = _t(r);
    if (!Number.isFinite(a) || a < 1) return;
    const o = Is(r);
    if (o <= 0) return;
    const s = t.get(a) || { height: 0, count: 0 };
    s.height = Math.max(s.height, o), s.count += 1, t.set(a, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, a) => {
    r.count >= 2 && r.height > 0 && n.set(a, Math.ceil(r.height));
  }), n;
}
function Es(e, t, n = "", r) {
  const [a, o] = C(() => /* @__PURE__ */ new Map()), s = x(a), l = x(r);
  return l.current = r, Fe(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), o(s.current));
      return;
    }
    let c = !1, i = 0, d = !1, u = !1;
    const f = () => {
      var P;
      if (c) return;
      const S = e.current;
      if (!S) return;
      const b = Ts(S);
      Rs(s.current, b) || (s.current = b, o(b)), d && !u && (u = !0, (P = l.current) == null || P.call(l));
    }, m = () => {
      cancelAnimationFrame(i), i = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const v = window.setTimeout(m, 100), p = window.setTimeout(() => {
      d = !0, m();
    }, 300), g = window.setTimeout(m, 700), y = e.current;
    let w = null;
    return y && typeof ResizeObserver < "u" && (w = new ResizeObserver(() => m()), w.observe(y)), () => {
      c = !0, cancelAnimationFrame(i), window.clearTimeout(v), window.clearTimeout(p), window.clearTimeout(g), w == null || w.disconnect();
    };
  }, [e, t, n]), a;
}
const Ms = [0, 48, 140, 320, 560], As = 700, ks = [80, 200, 400], Ns = 500, xs = 50, Cs = 180, Vn = [0, 48, 140, 320, 700, 1200];
function Ls(e, t) {
  var R;
  const {
    primaryPane: n,
    mode: r,
    enabled: a = !0,
    persistenceKey: o = "",
    restoreReady: s = !0
  } = t, l = x(
    ((R = Te(o)) == null ? void 0 : R.anchor) || { page: 1, fraction: 0 }
  ), c = x(null), i = x(!1), d = x(r), u = x(null), f = x(null), m = x(null), v = x(null), p = x(o), g = x(""), y = x(n);
  y.current = n;
  const w = k(() => {
    var I;
    (I = u.current) == null || I.call(u), u.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), S = k((I = !1) => {
    v.current != null && (clearTimeout(v.current), v.current = null);
    const A = () => {
      v.current = null, At(p.current, {
        anchor: ge(l.current)
      });
    };
    I ? A() : v.current = setTimeout(A, Cs);
  }, []), b = k((I) => {
    l.current = ge(I), c.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, i.current = !1;
    }, xs);
  }, []);
  $(() => {
    if (!a)
      return;
    let I = !1, A = null, D = null, L = null;
    const j = () => {
      if (I) return;
      const H = e.current;
      if (!H) {
        L = setTimeout(j, 50);
        return;
      }
      A = H, D = () => {
        if (i.current)
          return;
        const q = Ut(A, y.current);
        q && (l.current = q, S());
      }, A.addEventListener("scroll", D, { passive: !0 }), i.current || D();
    };
    return j(), () => {
      I = !0, L != null && clearTimeout(L), A && D && A.removeEventListener("scroll", D);
    };
  }, [a, r, n, e, S]), Fe(() => {
    var A;
    if (p.current === o) return;
    S(!0), w(), m.current != null && (clearTimeout(m.current), m.current = null), p.current = o, g.current = "";
    const I = (A = Te(o)) == null ? void 0 : A.anchor;
    l.current = I ? ge(I) : { page: 1, fraction: 0 }, c.current = null, i.current = !!o, d.current = r;
  }, [o, r, S, w]), $(() => {
    var A;
    if (!a || !s || !o || g.current === o) return;
    g.current = o;
    const I = ge(
      ((A = Te(o)) == null ? void 0 : A.anchor) || { page: 1, fraction: 0 }
    );
    return l.current = I, c.current = I, i.current = !0, w(), u.current = Qt(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: y.current,
        delaysMs: Vn,
        onDone: () => b(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(I);
    }, Math.max(...Vn) + 160), () => w();
  }, [a, s, o, e, b, w]), $(() => {
    if (d.current === r)
      return;
    if (d.current = r, !a) {
      i.current = !1, c.current = null, w();
      return;
    }
    const I = c.current ? ge(c.current) : ge(l.current);
    return i.current = !0, c.current = I, l.current = I, w(), u.current = Qt(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: Ms,
        onDone: () => b(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(I);
    }, As), () => {
      w();
    };
  }, [r, a, n, e, b, w]), $(() => () => {
    w(), m.current != null && (clearTimeout(m.current), m.current = null), S(!0);
  }, [w, S]);
  const P = k(() => {
    const I = Ut(
      e.current,
      y.current
    );
    return ge(I || l.current);
  }, [e]), N = k(() => {
    i.current = !0;
    const I = Ut(
      e.current,
      y.current
    ), A = ge(I ?? l.current);
    return l.current = A, c.current = A, S(), A;
  }, [e, S]), M = k((I, A, D) => {
    const L = D || y.current, j = kt(I, A || 1), H = { page: j, fraction: 0 };
    l.current = H, i.current = !0, c.current = H, S(), w(), vs(e.current, j, "smooth", L), u.current = ws(
      () => e.current,
      j,
      {
        behavior: "auto",
        pane: L,
        delaysMs: ks,
        onDone: () => b(H)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(H);
    }, Ns);
  }, [e, b, w, S]), O = k(() => ge(l.current), []), T = k(() => i.current, []), E = k(() => {
    if (!i.current || !c.current)
      return;
    const I = ge(c.current);
    Sn(
      e.current,
      I,
      "auto",
      y.current
    );
  }, [e]);
  return {
    lockFromShell: P,
    beginModeSwitch: N,
    goToPage: M,
    getAnchor: O,
    isRestoring: T,
    repinIfRestoring: E
  };
}
function zs(e, t) {
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
function Br(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), a = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), o = `j:${r}:d:${a}`;
  return t == null ? `${o}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${o}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const _s = [0, 80, 200, 400, 800], Ds = 120, Os = 400;
function Fs(e, t, n) {
  const { enabled: r, numPages: a, goToPage: o, resolveBlockPage: s, onAnchorApplied: l, jobId: c, documentId: i } = e, d = x(o);
  d.current = o;
  const u = x(s);
  u.current = s;
  const f = x(l);
  f.current = l;
  const m = x(n);
  m.current = n, $(() => {
    var S, b;
    if (!r || !Number.isFinite(a) || a < 1)
      return;
    const v = fa(), p = zs(v, u.current), g = Br(v, p, { jobId: c, documentId: i });
    if (t.current === g)
      return;
    if (p == null) {
      t.current = g, (S = m.current) == null || S.call(m);
      return;
    }
    t.current = g, v && ((b = f.current) == null || b.call(f, v, p));
    const y = [];
    let w = 0;
    for (const P of _s)
      w = Math.max(w, P), y.push(
        setTimeout(() => {
          d.current(p);
        }, P)
      );
    return y.push(
      setTimeout(() => {
        var P;
        (P = m.current) == null || P.call(m);
      }, w + Ds)
    ), () => {
      for (const P of y) clearTimeout(P);
    };
  }, [r, a, c, i, t]);
}
function $s(e) {
  var o;
  const t = globalThis.window;
  if (!t || typeof ((o = t.history) == null ? void 0 : o.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, a = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", a);
}
function js(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: a,
    resolveBlockPage: o,
    syncDebounceMs: s = Os,
    jobId: l,
    documentId: c,
    applyReaderSearch: i
  } = e, d = x(o);
  d.current = o;
  const u = x(i);
  u.current = i;
  const f = x(0);
  $(() => {
    if (!n || !r || !t.current || !Number.isFinite(a) || a < 1 || f.current === a) return;
    const m = setTimeout(() => {
      var y;
      const v = ((y = globalThis.location) == null ? void 0 : y.search) || "", p = ko(v, a, d.current);
      if (f.current = a, p === null) return;
      const g = `${new URLSearchParams(p).get("block_id") || ""}`.trim();
      t.current = Br(
        { blockId: g },
        a,
        { jobId: l, documentId: c }
      ), (u.current || $s)(p);
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
function Us(e) {
  const t = x(""), [n, r] = C(!1), a = k(() => r(!0), []), o = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  Fs(o, t, a), js(e, t, n);
}
const et = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function Bs(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function Gn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function Hr(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = Gn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const a = Gn(n, e);
  return a < 0 ? "ignore" : a === 0 ? n.page_hash === e.pageHash ? "ignore" : "retry" : "accept";
}
function Hs(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), a = Hr(r, t, n);
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
const Yn = [250, 500, 1e3, 2e3, 4e3], Bt = [80, 160, 320, 640, 1e3, 1500], Zn = [250, 500, 1e3, 2e3, 4e3, 5e3], Ws = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function en(e, t) {
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
function Pn(e) {
  return _o(e) ? `${e.code || ""}`.trim() : "";
}
function wt(e, t) {
  const n = Pn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Js(e, t, n, r, a) {
  let o = null;
  for (let s = 0; ; s += 1) {
    try {
      const c = await a.fetchPage(e, t.page_idx, { signal: r });
      if (Hr(n.pagesByPage.get(t.page_idx), t, c) !== "retry")
        return c;
      o = Do(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (c) {
      if ((c == null ? void 0 : c.name) === "AbortError") throw c;
      o = c;
      const i = Pn(c);
      if (i && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(i)) throw c;
    }
    const l = Bt[Math.min(s, Bt.length - 1)];
    if (await en(l, r), s >= Bt.length + 2) throw o;
  }
}
function Ks({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [a, o] = C(et), s = x(a), l = x("");
  s.current = a;
  const c = `${e || ""}`.trim(), i = `${t || ""}`.trim().toLowerCase(), d = Ws.has(i) ? i : "";
  return $(() => {
    if (!n || !c) {
      l.current = "", s.current = et, o(et);
      return;
    }
    const u = r === void 0 ? ua() : r, f = l.current === c;
    if (l.current = c, !u) {
      const S = {
        ...f ? s.current : et,
        connection: d ? "terminal" : "unavailable",
        jobStatus: i,
        error: "实时译文暂不可用"
      };
      s.current = S, o(S);
      return;
    }
    const m = new AbortController();
    let v = !1;
    const p = {
      ...f ? s.current : et,
      connection: d ? "terminal" : "connecting",
      jobStatus: i,
      error: ""
    };
    s.current = p, o(p);
    const g = (S) => {
      m.signal.aborted || o((b) => {
        const P = S(b);
        return s.current = P, P;
      });
    }, y = async () => {
      let S = 0;
      for (; !m.signal.aborted; )
        try {
          const b = await u.fetchLayout(c, { signal: m.signal });
          v = !0, g((P) => ({
            ...P,
            layoutByPage: Bs(b),
            jobStatus: i,
            error: ""
          }));
          return;
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError") return;
          const P = Pn(b);
          if (!(P === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !P)) {
            g((M) => ({
              ...M,
              connection: d ? "terminal" : "unavailable",
              jobStatus: i,
              error: wt(b, "实时译文暂不可用")
            }));
            return;
          }
          if (d) {
            g((M) => ({
              ...M,
              connection: "terminal",
              jobStatus: i,
              error: ""
            }));
            return;
          }
          g((M) => ({
            ...M,
            connection: "connecting",
            jobStatus: i,
            error: wt(b, "正在等待 OCR 版面数据")
          })), await en(Yn[Math.min(S, Yn.length - 1)], m.signal).catch(() => {
          }), S += 1;
        }
    };
    return (async () => {
      if (await y(), !v || m.signal.aborted) return;
      let S = 0;
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
              let P;
              try {
                P = await Js(
                  c,
                  b,
                  s.current,
                  m.signal,
                  u
                );
              } catch (N) {
                if ((N == null ? void 0 : N.name) === "AbortError" || m.signal.aborted) throw N;
                g((M) => ({
                  ...M,
                  lastSeq: Math.max(M.lastSeq, b.seq),
                  error: wt(N, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              g((N) => {
                const M = Hs(N, b, P);
                return d ? {
                  ...M,
                  connection: "terminal",
                  jobStatus: i
                } : {
                  ...M,
                  jobStatus: i
                };
              }), S = 0;
            }
          });
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError" || m.signal.aborted) return;
          g((P) => ({
            ...P,
            connection: d ? "terminal" : "reconnecting",
            jobStatus: i,
            error: wt(b, "实时译文连接已中断，正在重连")
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
        await en(Zn[Math.min(S, Zn.length - 1)], m.signal).catch(() => {
        }), S += 1;
      }
    })(), () => m.abort();
  }, [n, r, c, d]), a;
}
const qs = 2e3;
function Vs(e) {
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
const Gs = /* @__PURE__ */ new Set(["book", "translate"]);
function Wr(e) {
  return !!(e.jobId && e.sourceUrl && Gs.has(e.workflow));
}
function Ys(e) {
  return !!(Wr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function Zs() {
  const e = ja(), t = Wr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = Ys({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = Ks({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), a = ys(), { shellRef: o, shellEl: s, shellWidth: l, bindShell: c } = Wa(), i = ds({
    documentId: e.documentId,
    jobId: e.jobId
  }), d = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: u, onZoomChange: f } = ps(e.mode, o, i), m = Ka(
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
  } = Ls(o, {
    primaryPane: m.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: m.primaryNumPages > 0
  });
  $(() => {
    g();
  }, [l, g]);
  const y = Es(
    o,
    m.compareMode,
    m.rowSyncRevision,
    g
  ), w = Ss(
    o,
    m.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${u}-${m.metricsTick}`,
    m.primaryPane
  ), S = k((U, V) => {
    var X, ce;
    const Z = Math.max(
      Number(m.hudNumPages) || 0,
      Number(m.primaryNumPages) || 0,
      Number((X = m.numPagesByPane) == null ? void 0 : X.source) || 0,
      Number((ce = m.numPagesByPane) == null ? void 0 : ce.translated) || 0
    );
    p(U, Z, V);
  }, [p, m.hudNumPages, m.primaryNumPages, m.numPagesByPane]), [b, P] = C(null), N = x(null), M = k((U) => {
    N.current && clearTimeout(N.current), P(U), U && (N.current = setTimeout(() => P(null), qs));
  }, []);
  $(() => () => {
    N.current && clearTimeout(N.current);
  }, []);
  const O = k((U) => {
    const V = Ft(e.regions, U);
    return V ? jn(V, m.primaryPane).page : null;
  }, [e.regions, m.primaryPane]), T = k((U, V) => {
    const Z = V || m.primaryPane, X = typeof U == "object" && U ? `${U.block_id || ""}`.trim() : "", ce = typeof U == "object" && U ? `${U.image_url || ""}`.trim() : "", me = typeof U == "object" && U ? U.page_idx != null ? Number(U.page_idx) + 1 : U.page != null ? Number(U.page) : null : typeof U == "number" ? U + 1 : null, fe = Co(e.regions, ce, me) || Ft(e.regions, X) || (typeof U == "object" ? Lo(e.regions, U) : null);
    let he = fe ? jn(fe, Z).page : null;
    he == null && (he = Vs(U)), !(he == null || he < 1) && (M(fe), S(he, Z));
  }, [M, S, m.primaryPane, e.regions]);
  Us({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: m.hudNumPages || 0,
    currentPage: w,
    goToPage: S,
    resolveBlockPage: O,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (U) => {
      M(Ft(e.regions, U.blockId));
    }
  });
  const { setModeKeepingPage: E } = bs({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: v
  }), [R, I] = C(null), {
    selection: A,
    clearSelection: D
  } = gs(o, !e.boot.loading && !e.boot.failed), L = k(() => {
    I(null), D();
  }, [D]), j = k((U) => {
    D(), I(U);
  }, [D]);
  $(() => {
    A && I(null);
  }, [A]), $(() => {
    const U = o.current;
    if (!U) return;
    const V = () => I(null);
    return U.addEventListener("scroll", V, { passive: !0 }), () => U.removeEventListener("scroll", V);
  }, [s, o]);
  const H = A || R;
  $(() => {
    M(null), L();
  }, [d, M, L]);
  const q = !e.boot.loading && !e.boot.failed, Q = K(() => a, [a.active, a.open, a.close, a.toggle, a.isOpen]), re = K(() => ({ bindShell: c, shellEl: s, shellWidth: l, shellRef: o }), [c, s, l, o]), ne = K(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), se = K(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: u,
    onZoomChange: f,
    shell: re,
    panes: m,
    sessionFiles: ne,
    rowHeights: y,
    goToPage: S,
    activeRegion: b,
    jumpToAnchor: T,
    setModeKeepingPage: E,
    download: e.download,
    showHud: q,
    tools: Q,
    selection: H,
    clearSelection: L,
    selectRegion: j,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, re, m, ne, y, S, b, T, E, q, Q, H, L, j, u, f, i, r, n]);
  return K(() => ({
    ...se,
    currentPage: w
  }), [se, w]);
}
const Xs = [
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
], Qs = [
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
function ei(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Xs)
    if (n.keys.some(
      (a) => a.length === 1 ? a === t : a === e
    )) return n;
  return null;
}
function ti(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function ni(e) {
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
  $(() => {
    if (!i)
      return;
    const d = (u) => {
      if (u.defaultPrevented || u.metaKey || u.ctrlKey || u.altKey || ti(u.target))
        return;
      const f = u.key, m = ei(f);
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
              o(dt(a, 1));
              return;
            case "zoom-out":
              o(dt(a, -1));
              return;
            case "zoom-reset":
              o(ot());
              return;
            case "next-page":
              c(kt(s + 1, l));
              return;
            case "prev-page":
              c(kt(s - 1, l));
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
const ri = "retainpdf:soft-reader-close";
function oi() {
  return new URL("./index.html", window.location.href).href;
}
function ai() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: ri },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function si(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), a = new URL(e, r);
    return a.origin === r.origin && !/reader\.html$/i.test(a.pathname) && !/detail\.html$/i.test(a.pathname);
  } catch {
    return !1;
  }
}
function ii() {
  if (!(typeof window > "u") && !ai()) {
    if (si(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(oi());
  }
}
function ci({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ z(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), ii();
      },
      children: [
        /* @__PURE__ */ h(Xe, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ h("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let Xn = !1;
function li() {
  if (Xn)
    return;
  const e = ct().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (ta.GlobalWorkerOptions.workerSrc = e, Xn = !0);
}
const di = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function ui({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: a
}) {
  const o = r.flatMap((s) => {
    if (!Rr(s.region)) return [];
    const l = Lt(s, t, n);
    return l ? [{ highlight: s, rect: l }] : [];
  });
  return o.length ? /* @__PURE__ */ h("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: o.map(({ highlight: s, rect: l }) => {
    const c = s.region, i = Tr(c), d = di[i];
    return /* @__PURE__ */ z(
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
          /* @__PURE__ */ h("span", { className: "sr-only", children: Er(c, e) })
        ]
      },
      c.itemId
    );
  }) }) : null;
}
function fi(e, t, n) {
  return e.flatMap((r) => {
    if (Tr(r.region) !== "text") return [];
    const a = Lt(r, t, n);
    return a ? [{ itemId: r.itemId, highlight: r, rect: a }] : [];
  });
}
function Qn(e, t, n) {
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
function mi({ target: e }) {
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
function hi(e, t) {
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
function pi(e, t, n, r) {
  if (!e || !t) return [];
  const a = [];
  for (const o of e.blocks) {
    const s = t.itemsById.get(o.item_id);
    if (!(s != null && s.translated_text)) continue;
    const l = Lt(
      hi(e, o),
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
const gi = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', bi = 256, tt = /* @__PURE__ */ new Map();
function yi(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function vi(e) {
  const t = `${e || ""}`, { text: n, slots: r } = oa(t, { bareLatex: !0 }), a = yi(n), o = aa(a, r);
  if (!r.length)
    return { fallbackHtml: o, richHtml: Promise.resolve(o), hasMath: !1 };
  let s = tt.get(t);
  if (!s && (s = sa(a, r), tt.set(t, s), tt.size > bi)) {
    const l = tt.keys().next().value;
    l !== void 0 && tt.delete(l);
  }
  return { fallbackHtml: o, richHtml: s, hasMath: !0 };
}
function Ht(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function Re(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function wi(e, t) {
  const n = e.typography, r = Re(t) || 1, a = Re(n == null ? void 0 : n.font_size_pt), o = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, o * 1.18), l = Ht(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, c = Math.max(5.5 * r, Math.min(s, l * r)), i = Re(n == null ? void 0 : n.fit_min_font_size_pt), d = Re(n == null ? void 0 : n.fit_max_font_size_pt), u = Math.max(3.5, (i || 5.5) * r), f = Math.max(
    u,
    d ? d * r : a ? a * r : c
  ), m = a ? a * r : c, v = Re(n == null ? void 0 : n.leading_em), p = [
    Re(n == null ? void 0 : n.padding_top_pt) || 0,
    Re(n == null ? void 0 : n.padding_right_pt) || 0,
    Re(n == null ? void 0 : n.padding_bottom_pt) || 0,
    Re(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((g) => g * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || gi,
    fontSizePx: Math.max(u, Math.min(f, m)),
    minFontSizePx: u,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: v ? 1 + v : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (Ht(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : Ht(e.kind) ? "center" : "justify",
    padding: p,
    exact: !!a
  };
}
function Si(e, t, n, r) {
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
const Pi = 512, nt = /* @__PURE__ */ new Map();
let tn = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  tn += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  tn += 1;
}));
function Ii(e, t, n, r) {
  return [
    tn,
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
function Ri({ item: e, pageScale: t }) {
  const n = x(null), r = K(
    () => vi(e.translatedText),
    [e.translatedText]
  ), [a, o] = C(r.fallbackHtml), s = K(
    () => wi(e, t),
    [e, t]
  );
  $(() => {
    let u = !0;
    return o(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      u && o(f);
    }), () => {
      u = !1;
    };
  }, [r]), Fe(() => {
    const u = n.current;
    if (!u) return;
    const [f, m, v, p] = s.padding, g = Math.max(1, e.rect.width - p - m), y = Math.max(1, e.rect.height - f - v), w = Ii(a, g, y, s);
    let S = nt.get(w);
    if (S === void 0 && (S = Si(
      (b) => (u.style.fontSize = `${b}px`, { width: u.scrollWidth, height: u.scrollHeight }),
      g,
      y,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), nt.set(w, S), nt.size > Pi)) {
      const b = nt.keys().next().value;
      b !== void 0 && nt.delete(b);
    }
    u.style.fontSize = `${S.toFixed(2)}px`;
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
function Ti({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const a = K(
    () => pi(e, t, n, r),
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
        Ri,
        {
          item: o,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${o.itemId}:${o.changedAtSeq}`
      ))
    }
  ) : null;
}
const Ei = cn(Ti), Jr = 1.414;
function Mi({
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
  onSelectRegion: f,
  liveTranslationLayout: m,
  liveTranslationPage: v,
  showLiveTranslation: p = r === "source"
}) {
  const g = x(l ?? Jr), [y, w] = C(g.current);
  $(() => {
    l != null && Math.abs(l - g.current) >= 1e-3 && (g.current = l, w(l));
  }, [l]);
  const S = x(i);
  S.current = i;
  const b = x((L) => {
    var j;
    (j = S.current) == null || j.call(S, L);
  }).current, P = Math.max(120, Math.floor(t * y)), N = Math.max(P, Math.ceil(o || 0)), M = Lt(d, t, P), O = K(
    () => fi(u, t, P),
    [P, u, t]
  ), [T, E] = C(null), R = K(
    () => O.find((L) => L.itemId === T) || null,
    [T, O]
  ), I = (L) => {
    if (L.buttons !== 0) {
      E(null);
      return;
    }
    const j = L.currentTarget.getBoundingClientRect(), H = Qn(
      O,
      L.clientX - j.left,
      L.clientY - j.top
    ), q = (H == null ? void 0 : H.itemId) || null;
    E((Q) => Q === q ? Q : q);
  }, A = (L) => {
    var q, Q, re;
    if (!f || (Q = (q = L.target) == null ? void 0 : q.closest) != null && Q.call(q, ".reader-structure-selection-target") || `${((re = window.getSelection()) == null ? void 0 : re.toString()) || ""}`.trim()) return;
    const j = L.currentTarget.getBoundingClientRect(), H = Qn(
      O,
      L.clientX - j.left,
      L.clientY - j.top
    );
    H && f({
      selectionType: "region",
      region: H.highlight.region,
      kind: "text",
      page: H.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: j.left + H.rect.left,
        top: j.top + H.rect.top,
        width: H.rect.width,
        height: H.rect.height
      }
    });
  }, D = (L) => {
    !Number.isFinite(L) || L <= 0 || Math.abs(g.current - L) < 1e-3 || (g.current = L, w(L), c == null || c(e, L));
  };
  return /* @__PURE__ */ z(
    "div",
    {
      ref: b,
      [Ge]: e,
      [Ye]: r,
      [bn]: P,
      className: yn,
      onPointerMoveCapture: I,
      onClick: A,
      onPointerLeave: () => E(null),
      style: {
        width: t,
        height: N,
        minHeight: N
      },
      children: [
        a ? /* @__PURE__ */ h(
          na,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: Lr,
            loading: /* @__PURE__ */ h(
              "div",
              {
                className: Mt,
                style: { width: t, height: P }
              }
            ),
            onLoadSuccess: (L) => {
              try {
                const j = L.getViewport({ scale: 1 });
                if (j.width > 0) {
                  const H = j.height / j.width;
                  D(H);
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
            className: Mt,
            style: { width: t, height: P },
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
        a && p ? /* @__PURE__ */ h(
          Ei,
          {
            layoutPage: m,
            pageState: v,
            width: t,
            height: P
          }
        ) : null,
        /* @__PURE__ */ h(mi, { target: a ? R : null }),
        /* @__PURE__ */ h(
          ui,
          {
            pane: r === "translated" ? "translated" : "source",
            width: t,
            height: P,
            regions: u,
            onSelect: f
          }
        )
      ]
    }
  );
}
const Ai = cn(Mi), Wt = 5, ki = "120% 0px", Ni = 120;
let er = 1;
const tr = /* @__PURE__ */ new WeakMap();
function xi(e) {
  if (!e) return 0;
  const t = tr.get(e);
  if (t) return t;
  const n = er;
  return er += 1, tr.set(e, n), n;
}
function Ci() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const Li = vo(
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
    readerMetadata: g = null,
    onSelectRegion: y,
    liveTranslation: w,
    showLiveTranslation: S = t === "source",
    liveTranslationPendingLabel: b = "",
    paneAction: P
  }, N) {
    li();
    const { file: M, loading: O, error: T } = Da(n, r), E = `${n}\0${xi(M)}`, R = x(E);
    R.current = E;
    const I = K(
      () => La(M),
      [M, n]
    ), [A, D] = C(0), [L, j] = C(""), [H, q] = C(null), [Q, re] = C(480), ne = x(null), se = x(0), U = K(() => Ci(), []), V = K(() => ({
      cMapUrl: ct().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: ct().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    ln(N, () => H, [H]), $(() => {
      const F = (W) => {
        !Number.isFinite(W) || W < 80 || Math.abs(W - se.current) < 8 || (se.current = W, re(W));
      }, G = c && c >= 80 ? c : (l == null ? void 0 : l.clientWidth) || 0;
      if (F(G), !l || typeof ResizeObserver > "u" || c && c >= 80) return;
      const J = new ResizeObserver((W) => {
        var ee, te;
        const ie = ((te = (ee = W[0]) == null ? void 0 : ee.contentRect) == null ? void 0 : te.width) ?? l.clientWidth;
        !Number.isFinite(ie) || ie < 80 || (ne.current && clearTimeout(ne.current), ne.current = setTimeout(() => F(ie), 80));
      });
      return J.observe(l), () => {
        J.disconnect(), ne.current && clearTimeout(ne.current);
      };
    }, [c, l, o]);
    const Z = K(
      () => rs(Q, a),
      [Q, a]
    ), [X, ce] = C(() => /* @__PURE__ */ new Map()), [me, fe] = C(() => /* @__PURE__ */ new Set()), [he, Me] = C(() => /* @__PURE__ */ new Set()), _ = x(/* @__PURE__ */ new Map()), B = x(null), oe = x(/* @__PURE__ */ new Map()), Se = k((F, G) => {
      ce((J) => {
        if (J.get(F) === G) return J;
        const W = new Map(J);
        return W.set(F, G), W;
      });
    }, []), pe = k((F, G) => {
      const J = _.current, W = J.get(F);
      if (W && B.current)
        try {
          B.current.unobserve(W);
        } catch {
        }
      if (G) {
        if (J.set(F, G), B.current)
          try {
            B.current.observe(G);
          } catch {
          }
      } else
        J.delete(F);
    }, []), Le = x(/* @__PURE__ */ new Map()), gt = k((F) => {
      const G = Le.current;
      let J = G.get(F);
      return J || (J = (W) => pe(F, W), G.set(F, J)), J;
    }, [pe]);
    $(() => {
      if (typeof IntersectionObserver > "u") return;
      const F = oe.current, G = new IntersectionObserver(
        (J) => {
          const W = [], ie = [];
          for (const ee of J) {
            const te = ee.target, ue = _t(te);
            Number.isFinite(ue) && (ee.isIntersecting ? W : ie).push(ue);
          }
          if ((W.length || ie.length) && fe((ee) => {
            let te = null;
            for (const ue of W)
              ee.has(ue) || (te = te || new Set(ee), te.add(ue));
            for (const ue of ie)
              ee.has(ue) && (te = te || new Set(ee), te.delete(ue));
            return te || ee;
          }), W.length) {
            for (const ee of W) {
              const te = F.get(ee);
              te && (clearTimeout(te), F.delete(ee));
            }
            Me((ee) => {
              let te = null;
              for (const ue of W)
                ee.has(ue) || (te = te || new Set(ee), te.add(ue));
              return te || ee;
            });
          }
          for (const ee of ie)
            F.has(ee) || F.set(ee, setTimeout(() => {
              F.delete(ee), Me((te) => {
                if (!te.has(ee)) return te;
                const ue = new Set(te);
                return ue.delete(ee), ue;
              });
            }, Ni));
        },
        { root: l, rootMargin: ki, threshold: 0 }
      );
      B.current = G;
      for (const J of _.current.values())
        try {
          G.observe(J);
        } catch {
        }
      return () => {
        G.disconnect(), B.current === G && (B.current = null);
        for (const J of F.values()) clearTimeout(J);
        F.clear();
      };
    }, [l]), Fe(() => {
      D(0), j(""), fe(/* @__PURE__ */ new Set()), Me(/* @__PURE__ */ new Set()), ce(/* @__PURE__ */ new Map()), _.current.clear();
      const F = oe.current;
      for (const G of F.values()) clearTimeout(G);
      F.clear(), m == null || m(0, t);
    }, [E, m, t]);
    const Ot = k(
      ({ numPages: F }) => {
        R.current === E && (D(F), j(""), m == null || m(F, t), u == null || u({ numPages: F, pane: t }));
      },
      [E, u, m, t]
    ), bt = k(
      (F) => {
        if (R.current !== E) return;
        const G = (F == null ? void 0 : F.message) || "PDF 解析失败";
        j(G), D(0), m == null || m(0, t), f == null || f(F, t);
      },
      [E, f, m, t]
    ), Pe = K(
      () => A > 0 ? Array.from({ length: A }, (F, G) => G + 1) : [],
      [A]
    );
    $(() => {
      typeof IntersectionObserver < "u" || Me(new Set(Pe));
    }, [Pe]);
    const Ae = K(
      () => Un(v, g, t),
      [v, g, t]
    ), Ue = K(() => {
      const F = /* @__PURE__ */ new Map();
      for (const G of p) {
        const J = Un(G, g, t);
        if (!J) continue;
        const W = F.get(J.box.page) || [];
        W.push(J), F.set(J.box.page, W);
      }
      return F;
    }, [t, g, p]), yt = K(() => {
      if (A === 0) return /* @__PURE__ */ new Set();
      if (!(!!l && typeof IntersectionObserver < "u" && o)) return new Set(Pe);
      if (me.size === 0) {
        const J = Math.min(A, Wt * 2 + 1);
        return new Set(Array.from({ length: J }, (W, ie) => ie + 1));
      }
      const G = /* @__PURE__ */ new Set();
      for (const J of me)
        for (let W = -Wt; W <= Wt; W++) {
          const ie = J + W;
          ie >= 1 && ie <= A && G.add(ie);
        }
      return G;
    }, [A, Pe, l, o, me]), bo = !n || !!T || !!L, yo = n && (T || L) || s;
    return /* @__PURE__ */ z(
      "section",
      {
        ref: q,
        className: `reader-panel ${Ya}${o ? "" : " is-hidden"}`,
        [Ye]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": o ? "true" : "false",
        "data-live-translation-status": (w == null ? void 0 : w.jobStatus) || void 0,
        "aria-hidden": o ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          P ? /* @__PURE__ */ h("div", { className: "reader-react-pdf-pane-action", children: P }) : null,
          b ? /* @__PURE__ */ z("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ h("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ h("span", { children: b })
          ] }) : null,
          bo && !O ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: yo }) : null,
          O ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          I && !T ? /* @__PURE__ */ h("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ h(
            ra,
            {
              file: I,
              loading: null,
              error: null,
              options: V,
              onLoadSuccess: Ot,
              onLoadError: bt,
              className: "reader-react-pdf-document",
              children: Pe.map((F) => {
                if (yt.has(F))
                  return /* @__PURE__ */ h(
                    Ai,
                    {
                      pane: t,
                      pageNumber: F,
                      width: Z,
                      devicePixelRatio: U,
                      active: he.has(F),
                      syncedMinHeight: (i == null ? void 0 : i.get(F)) || 0,
                      onMetrics: d,
                      cachedAspect: X.get(F),
                      onAspectChange: Se,
                      sentinelRef: gt(F),
                      regionHighlight: (Ae == null ? void 0 : Ae.box.page) === F ? Ae : null,
                      regionTargets: Ue.get(F),
                      onSelectRegion: y,
                      liveTranslationLayout: w == null ? void 0 : w.layoutByPage.get(F - 1),
                      liveTranslationPage: w == null ? void 0 : w.pagesByPage.get(F - 1),
                      showLiveTranslation: S
                    },
                    `${t}-${F}`
                  );
                const J = X.get(F) ?? Jr, W = Math.max(120, Math.floor(Z * J)), ie = Math.max(W, Math.ceil((i == null ? void 0 : i.get(F)) || 0));
                return /* @__PURE__ */ h(
                  "div",
                  {
                    ref: gt(F),
                    [Ge]: F,
                    [Ye]: t,
                    [bn]: W,
                    className: yn,
                    style: {
                      width: Z,
                      height: ie,
                      minHeight: ie
                    },
                    children: /* @__PURE__ */ h(
                      "div",
                      {
                        className: Mt,
                        style: { width: Z, height: W },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${F}`
                );
              })
            },
            E
          ) }) : null
        ]
      }
    );
  }
), nr = cn(Li), Kr = dn(null), qr = dn(null);
function zi({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ h(Kr.Provider, { value: e, children: /* @__PURE__ */ h(qr.Provider, { value: t, children: n }) });
}
function pt() {
  return un(Kr);
}
function _i() {
  return un(qr);
}
function Di({
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
function Oi(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function Fi(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function $i(e) {
  const t = pt(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: a,
    paneComposition: o
  } = e, s = (o == null ? void 0 : o.visibleMode) ?? e.mode ?? "compare", l = (o == null ? void 0 : o.compareMode) ?? e.compareMode ?? s === "compare", c = (o == null ? void 0 : o.showSource) ?? e.showSource ?? !0, i = (o == null ? void 0 : o.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), d = (o == null ? void 0 : o.overlayOnSource) ?? e.overlayOnSource ?? !1, u = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? ht, v = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, p = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), g = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, y = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, w = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, S = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", b = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", P = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, N = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, M = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), O = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), T = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), E = e.regions ?? (t == null ? void 0 : t.regions) ?? [], R = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), I = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), A = Di({
    mode: s,
    compareMode: l,
    showSource: c,
    showTranslated: i,
    markdownSplit: n,
    overlayOnSource: d
  }), D = Oi(
    v,
    n || r,
    typeof document > "u" ? v * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ h(
    "div",
    {
      ref: u,
      className: Ga,
      "data-reader-region-count": E.length,
      "data-reader-structured-region-count": E.filter(Rr).length,
      "data-reader-metadata-ready": R ? "true" : "false",
      children: /* @__PURE__ */ z(
        "main",
        {
          className: `${Va} reader-mode-${A.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            g ? /* @__PURE__ */ h(
              nr,
              {
                pane: "source",
                url: S,
                preloadedFile: P,
                userZoom: m,
                visible: A.showSource,
                scrollRoot: f,
                pageWidthOverride: D,
                rowHeights: A.compareMode ? p : void 0,
                onMetrics: M,
                emptyLabel: w ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: O,
                activeRegion: T,
                regions: E,
                readerMetadata: R,
                onSelectRegion: I,
                liveTranslation: d ? a : void 0,
                showLiveTranslation: d,
                liveTranslationPendingLabel: d ? Fi(a) : "",
                paneAction: d ? /* @__PURE__ */ z(Ct, { children: [
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
              nr,
              {
                pane: "translated",
                url: b,
                preloadedFile: N,
                userZoom: m,
                visible: A.showTranslated,
                scrollRoot: f,
                pageWidthOverride: D,
                rowHeights: A.compareMode ? p : void 0,
                onMetrics: M,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: O,
                activeRegion: T,
                regions: E,
                readerMetadata: R,
                onSelectRegion: I,
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
const ji = [
  { id: "source", label: "源文件", Icon: Mr },
  { id: "compare", label: "对照", Icon: Ar },
  { id: "translated", label: "翻译文件", Icon: kr }
];
function Ui(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function Bi(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Hi(e) {
  const t = pt(), {
    mode: n,
    documentReady: r,
    onModeChange: a,
    liveTranslation: o = null
  } = e, s = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, l = o ? Ui(o.state) : "";
  return /* @__PURE__ */ z("header", { className: "reader-workspace-bar", children: [
    o ? /* @__PURE__ */ z(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${o.state.connection}${o.visible ? " is-active" : ""}`,
        "aria-pressed": o.visible,
        "aria-label": o.visible ? "隐藏实时译文" : "显示实时译文",
        title: o.state.error || l,
        onClick: o.onToggle,
        children: [
          /* @__PURE__ */ h(Uo, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ h("span", { className: "reader-live-translation-toggle-label", children: l })
        ]
      }
    ) : null,
    /* @__PURE__ */ h("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: ji.map(({ id: c, label: i, Icon: d }) => {
      const u = n === c, f = Bi({
        id: c,
        documentReady: r,
        sourceViewOnly: s,
        liveTranslationAvailable: !!o
      });
      return /* @__PURE__ */ z(
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
const Wi = {
  "reading-path": {
    label: "阅读路径",
    short: "路径",
    Icon: Wo,
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
    Icon: Ho,
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
    Icon: Bo,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    storageKey: "retainpdf.reader.terminal-float.pos.v1",
    ariaLabel: "fx 终端",
    width: 420,
    keepMounted: !0
  }
}, Vr = vn.map(
  (e) => ({ id: e, ...Wi[e] })
), Ji = [
  { id: "markdown", label: "Markdown", short: "MD", Icon: Nr },
  { id: "ai", label: "AI 问答", short: "AI", Icon: hn }
];
function Ki() {
  const e = ae();
  return [
    ...Ji,
    ...Vr.filter(
      (t) => typeof (e == null ? void 0 : e[t.adapterKey]) == "function"
    )
  ];
}
function qi(e) {
  const t = pt(), { active: n } = e, r = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), a = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), o = Ki();
  return n ? /* @__PURE__ */ z("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ h("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: o.map(({ id: s, label: l, Icon: c }) => {
      const i = n === s;
      return /* @__PURE__ */ z(
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
        children: /* @__PURE__ */ h(Xe, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ h("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: o.map(({ id: s, label: l, short: c, Icon: i }) => /* @__PURE__ */ z(
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
function Vi(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function Gi(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function Yi(e) {
  return e / 100 * window.innerHeight;
}
function Zi(e) {
  return e / 100 * window.innerWidth;
}
function Xi(e) {
  switch (typeof e) {
    case "number":
      return [e, "px"];
    case "string": {
      const t = parseFloat(e);
      return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
    }
  }
}
function rt({
  groupSize: e,
  panelElement: t,
  styleProp: n
}) {
  let r;
  const [a, o] = Xi(n);
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
      r = Gi(t, a);
      break;
    }
    case "em": {
      r = Vi(t, a);
      break;
    }
    case "vh": {
      r = Yi(a);
      break;
    }
    case "vw": {
      r = Zi(a);
      break;
    }
  }
  return r;
}
function de(e) {
  return parseFloat(e.toFixed(3));
}
function Ze({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, a) => (r += t === "horizontal" ? a.element.offsetWidth : a.element.offsetHeight, r), 0);
}
function nn(e) {
  const { panels: t } = e, n = Ze({ group: e });
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
      const d = rt({
        groupSize: n,
        panelElement: a,
        styleProp: o.collapsedSize
      });
      s = de(d / n * 100);
    }
    let l;
    if (o.defaultSize !== void 0) {
      const d = rt({
        groupSize: n,
        panelElement: a,
        styleProp: o.defaultSize
      });
      l = de(d / n * 100);
    }
    let c = 0;
    if (o.minSize !== void 0) {
      const d = rt({
        groupSize: n,
        panelElement: a,
        styleProp: o.minSize
      });
      c = de(d / n * 100);
    }
    let i = 100;
    if (o.maxSize !== void 0) {
      const d = rt({
        groupSize: n,
        panelElement: a,
        styleProp: o.maxSize
      });
      i = de(d / n * 100);
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
function Y(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function rn(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? Qi : ec
  );
}
function Qi(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function ec(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function Gr(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Yr(e, t) {
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
function tc({
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
    const { x: l, y: c } = Yr(r, s), i = e === "horizontal" ? l : c;
    i < o && (o = i, a = s);
  }
  return Y(a, "No rect found"), a;
}
let St;
function nc() {
  return St === void 0 && (typeof matchMedia == "function" ? St = !!matchMedia("(pointer:coarse)").matches : St = !1), St;
}
function Zr(e) {
  const { element: t, orientation: n, panels: r, separators: a } = e, o = rn(
    n,
    Array.from(t.children).filter(Gr).map((v) => ({ element: v }))
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
            const y = f.element.getBoundingClientRect(), w = p.getBoundingClientRect();
            let S;
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
              ), P = n === "horizontal" ? new DOMRect(w.left, w.top, 0, w.height) : new DOMRect(w.left, w.top, w.width, 0);
              switch (m.length) {
                case 0: {
                  S = [
                    b,
                    P
                  ];
                  break;
                }
                case 1: {
                  const N = m[0], M = tc({
                    orientation: n,
                    rects: [y, w],
                    targetRect: N.element.getBoundingClientRect()
                  });
                  S = [
                    N,
                    M === y ? P : b
                  ];
                  break;
                }
                default: {
                  S = m;
                  break;
                }
              }
            } else
              m.length ? S = m : S = [
                n === "horizontal" ? new DOMRect(
                  y.right,
                  w.top,
                  w.left - y.right,
                  w.height
                ) : new DOMRect(
                  w.left,
                  y.bottom,
                  w.width,
                  w.top - y.bottom
                )
              ];
            for (const b of S) {
              let P = "width" in b ? b : b.element.getBoundingClientRect();
              const N = nc() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (P.width < N) {
                const O = N - P.width;
                P = new DOMRect(
                  P.x - O / 2,
                  P.y,
                  P.width + O,
                  P.height
                );
              }
              if (P.height < N) {
                const O = N - P.height;
                P = new DOMRect(
                  P.x,
                  P.y - O / 2,
                  P.width,
                  P.height + O
                );
              }
              const M = v <= i || v > d;
              !l && !M && s.push({
                group: e,
                groupSize: Ze({ group: e }),
                panels: [f, g],
                separator: "width" in b ? void 0 : b,
                rect: P
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
var xe;
class Xr {
  constructor() {
    Fn(this, xe, {});
  }
  addListener(t, n) {
    const r = Qe(this, xe)[t];
    return r === void 0 ? Qe(this, xe)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = Qe(this, xe)[t];
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
    $n(this, xe, {});
  }
  removeListener(t, n) {
    const r = Qe(this, xe)[t];
    if (r !== void 0) {
      const a = r.indexOf(n);
      a >= 0 && r.splice(a, 1);
    }
  }
}
xe = new WeakMap();
let qe = {
  cursorFlags: 0,
  state: "inactive"
};
const In = new Xr();
function _e() {
  return qe;
}
function rc(e) {
  return In.addListener("change", e);
}
function oc(e) {
  const t = qe, n = { ...qe };
  n.cursorFlags = e, qe = n, In.emit("change", {
    prev: t,
    next: n
  });
}
function Ve(e) {
  const t = qe;
  qe = e, In.emit("change", {
    prev: t,
    next: e
  });
}
const ac = (e) => e, Jt = () => {
}, Qr = 1, eo = 2, to = 4, no = 8, rr = 3, or = 12;
let Pt;
function ar() {
  return Pt === void 0 && (Pt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (Pt = !0)), Pt;
}
function sc({
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
        if (e && ar()) {
          const o = (e & Qr) !== 0, s = (e & eo) !== 0, l = (e & to) !== 0, c = (e & no) !== 0;
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
    return ar() ? r > 0 && a > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && a > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const sr = /* @__PURE__ */ new WeakMap();
function Rn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = sr.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = _e();
  switch (r.state) {
    case "active":
    case "hover": {
      const a = sc({
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
  sr.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let we = /* @__PURE__ */ new Map();
const ro = new Xr();
function ic(e) {
  we = new Map(we), we.delete(e);
}
function ir(e, t) {
  for (const [n] of we)
    if (n.id === e)
      return n;
}
function Ce(e, t) {
  for (const [n, r] of we)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function $e() {
  return we;
}
function Tn(e, t) {
  return ro.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Ee(e, t, n) {
  const r = we.get(e);
  we = new Map(we), we.set(e, t), ro.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function oo(e) {
  const t = _e();
  let n = !1;
  switch (t.state) {
    case "active":
      Ve({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (Rn(e), n = !0, t.hitRegions.forEach((r) => {
        const a = Ce(r.group.id, !0);
        Ee(r.group, a, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function cr(e) {
  e.defaultPrevented || oo(e.currentTarget);
}
function cc(e, t, n) {
  let r, a = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const o of t) {
    const s = Yr(n, o.rect);
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
function lc(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function dc(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: ur(e),
    b: ur(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  Y(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const a = {
    a: dr(lr(n.a)),
    b: dr(lr(n.b))
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
const uc = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function fc(e) {
  const t = getComputedStyle(ao(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function mc(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || fc(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || uc.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function lr(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (Y(n, "Missing node"), mc(n)) return n;
  }
  return null;
}
function dr(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function ur(e) {
  const t = [];
  for (; e; )
    t.push(e), e = ao(e);
  return t;
}
function ao(e) {
  const { parentNode: t } = e;
  return lc(t) ? t.host : t;
}
function hc(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function pc({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!Gr(n) || n.contains(e) || e.contains(n))
    return !0;
  if (dc(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (hc(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function En(e, t) {
  const n = [];
  return t.forEach((r, a) => {
    if (a.disabled)
      return;
    const o = Zr(a), s = cc(a.orientation, o, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && pc({
      groupElement: a.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function gc(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function le(e, t, n = 0) {
  return Math.abs(de(e) - de(t)) <= n;
}
function ve(e, t) {
  return le(e, t) ? 0 : e > t ? 1 : -1;
}
function Je({
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
  if (ve(r, c) < 0)
    if (o) {
      const i = (a + c) / 2;
      ve(r, i) < 0 ? r = a : r = c;
    } else
      r = c;
  return r = Math.min(l, r), r = de(r), r;
}
function ut({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: a,
  trigger: o
}) {
  if (le(e, 0))
    return t;
  const s = o === "imperative-api", l = Object.values(t), c = Object.values(a), i = [...l], [d, u] = r;
  Y(d != null, "Invalid first pivot index"), Y(u != null, "Invalid second pivot index");
  let f = 0;
  switch (o) {
    case "keyboard": {
      {
        const p = e < 0 ? u : d, g = n[p];
        Y(
          g,
          `Panel constraints not found for index ${p}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: w,
          minSize: S = 0
        } = g;
        if (w) {
          const b = l[p];
          if (Y(
            b != null,
            `Previous layout not found for panel index ${p}`
          ), le(b, y)) {
            const P = S - b;
            ve(P, Math.abs(e)) > 0 && (e = e < 0 ? 0 - P : P);
          }
        }
      }
      {
        const p = e < 0 ? d : u, g = n[p];
        Y(
          g,
          `No panel constraints found for index ${p}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: w,
          minSize: S = 0
        } = g;
        if (w) {
          const b = l[p];
          if (Y(
            b != null,
            `Previous layout not found for panel index ${p}`
          ), le(b, S)) {
            const P = b - y;
            ve(P, Math.abs(e)) > 0 && (e = e < 0 ? 0 - P : P);
          }
        }
      }
      break;
    }
    default: {
      const p = e < 0 ? u : d, g = n[p];
      Y(
        g,
        `Panel constraints not found for index ${p}`
      );
      const y = l[p], { collapsible: w, collapsedSize: S, minSize: b } = g;
      if (w && ve(y, b) < 0)
        if (e > 0) {
          const P = b - S, N = P / 2, M = y + e;
          ve(M, b) < 0 && (e = ve(e, N) <= 0 ? 0 : P);
        } else {
          const P = b - S, N = 100 - P / 2, M = y - e;
          ve(M, b) < 0 && (e = ve(100 + e, N) > 0 ? 0 : -P);
        }
      break;
    }
  }
  {
    const p = e < 0 ? 1 : -1;
    let g = e < 0 ? u : d, y = 0;
    for (; ; ) {
      const S = l[g];
      Y(
        S != null,
        `Previous layout not found for panel index ${g}`
      );
      const b = Je({
        overrideDisabledPanels: s,
        panelConstraints: n[g],
        prevSize: S,
        size: 100
      }) - S;
      if (y += b, g += p, g < 0 || g >= n.length)
        break;
    }
    const w = Math.min(Math.abs(e), Math.abs(y));
    e = e < 0 ? 0 - w : w;
  }
  {
    let p = e < 0 ? d : u;
    for (; p >= 0 && p < n.length; ) {
      const g = Math.abs(e) - Math.abs(f), y = l[p];
      Y(
        y != null,
        `Previous layout not found for panel index ${p}`
      );
      const w = y - g, S = Je({
        overrideDisabledPanels: s,
        panelConstraints: n[p],
        prevSize: y,
        size: w
      });
      if (!le(y, S) && (f += y - S, i[p] = S, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? p-- : p++;
    }
  }
  if (gc(c, i))
    return a;
  {
    const p = e < 0 ? u : d, g = l[p];
    Y(
      g != null,
      `Previous layout not found for panel index ${p}`
    );
    const y = g + f, w = Je({
      overrideDisabledPanels: s,
      panelConstraints: n[p],
      prevSize: g,
      size: y
    });
    if (i[p] = w, !le(w, y)) {
      let S = y - w, b = e < 0 ? u : d;
      for (; b >= 0 && b < n.length; ) {
        const P = i[b];
        Y(
          P != null,
          `Previous layout not found for panel index ${b}`
        );
        const N = P + S, M = Je({
          overrideDisabledPanels: s,
          panelConstraints: n[b],
          prevSize: P,
          size: N
        });
        if (le(P, M) || (S -= M - P, i[b] = M), le(S, 0))
          break;
        e > 0 ? b-- : b++;
      }
    }
  }
  const m = Object.values(i).reduce(
    (p, g) => g + p,
    0
  );
  if (!le(m, 100, 0.1))
    return a;
  const v = Object.keys(a);
  return i.reduce((p, g, y) => (p[v[y]] = g, p), {});
}
function De(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || ve(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function Oe({
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
  if (!le(a, 100) && r.length > 0)
    for (let l = 0; l < t.length; l++) {
      const c = r[l];
      Y(c != null, `No layout data found for index ${l}`);
      const i = 100 / a * c;
      r[l] = i;
    }
  let o = 0;
  for (let l = 0; l < t.length; l++) {
    const c = n[l];
    Y(c != null, `No layout data found for index ${l}`);
    const i = r[l];
    Y(i != null, `No layout data found for index ${l}`);
    const d = Je({
      overrideDisabledPanels: !0,
      panelConstraints: t[l],
      prevSize: c,
      size: i
    });
    i != d && (o += i - d, r[l] = d);
  }
  if (!le(o, 0))
    for (let l = 0; l < t.length; l++) {
      const c = r[l];
      Y(c != null, `No layout data found for index ${l}`);
      const i = c + o, d = Je({
        overrideDisabledPanels: !0,
        panelConstraints: t[l],
        prevSize: c,
        size: i
      });
      if (c !== d && (o -= d - c, r[l] = d, le(o, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((l, c, i) => (l[s[i]] = c, l), {});
}
function so({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const c = $e();
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
      const w = u[y];
      return (w == null ? void 0 : w.collapsible) && le(w.collapsedSize, d[w.panelId]);
    }))) {
      const g = i.slice(0, m).reduce((y, w) => y + d[w.id], 0);
      return {
        ...d,
        [t]: de(100 - g)
      };
    }
    return ut({
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
    }), y = Oe({
      layout: g,
      panelConstraints: u
    });
    De(v, y) || Ee(f, {
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
      return c && le(i, d);
    },
    resize: (c) => {
      const { group: i } = n(), { element: d } = a(), u = Ze({ group: i }), f = rt({
        groupSize: u,
        panelElement: d,
        styleProp: c
      }), m = de(f / u * 100);
      l(m);
    }
  };
}
function fr(e) {
  if (e.defaultPrevented)
    return;
  const t = $e();
  En(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (a) => a.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const a = r.panelConstraints.defaultSize, o = so({
          groupId: n.group.id,
          panelId: r.id
        });
        o && a !== void 0 && (o.resize(a), e.preventDefault());
      }
    }
  });
}
function It(e) {
  const t = $e();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function io({
  groupId: e
}) {
  const t = () => {
    const n = $e();
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
      } = t(), i = Oe({
        layout: n,
        panelConstraints: a
      });
      return r ? l : (De(l, i) || Ee(o, {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: a,
        groupSize: s,
        layout: i,
        separatorToPanels: c
      }), i);
    }
  };
}
function ze(e, t) {
  const n = It(e), r = Ce(n.id, !0), a = n.separators.find(
    (d) => d.element === e
  );
  Y(a, "Matching separator not found");
  const o = r.separatorToPanels.get(a);
  Y(o, "Matching panels not found");
  const s = o.map((d) => n.panels.indexOf(d)), l = io({ groupId: n.id }).getLayout(), c = ut({
    delta: t,
    initialLayout: l,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: l,
    trigger: "keyboard"
  }), i = Oe({
    layout: c,
    panelConstraints: r.derivedPanelConstraints
  });
  De(l, i) || Ee(
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
function mr(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = It(t);
  if (!n.disabled)
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault(), n.orientation === "vertical" && ze(t, 5);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault(), n.orientation === "horizontal" && ze(t, -5);
        break;
      }
      case "ArrowRight": {
        e.preventDefault(), n.orientation === "horizontal" && ze(t, 5);
        break;
      }
      case "ArrowUp": {
        e.preventDefault(), n.orientation === "vertical" && ze(t, -5);
        break;
      }
      case "End": {
        e.preventDefault(), ze(t, 100);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const r = It(t), a = Ce(r.id, !0), { derivedPanelConstraints: o, layout: s, separatorToPanels: l } = a, c = r.separators.find(
          (f) => f.element === t
        );
        Y(c, "Matching separator not found");
        const i = l.get(c);
        Y(i, "Matching panels not found");
        const d = i[0], u = o.find(
          (f) => f.panelId === d.id
        );
        if (Y(u, "Panel metadata not found"), u.collapsible) {
          const f = s[d.id], m = u.collapsedSize === f ? r.mutableState.expandedPanelSizes[d.id] ?? u.minSize : u.collapsedSize;
          ze(t, m - f);
        }
        break;
      }
      case "F6": {
        e.preventDefault();
        const r = It(t).separators.map(
          (s) => s.element
        ), a = Array.from(r).findIndex(
          (s) => s === e.currentTarget
        );
        Y(a !== null, "Index not found");
        const o = e.shiftKey ? a > 0 ? a - 1 : r.length - 1 : a + 1 < r.length ? a + 1 : 0;
        r[o].focus({
          preventScroll: !0
        });
        break;
      }
      case "Home": {
        e.preventDefault(), ze(t, -100);
        break;
      }
    }
}
function hr(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = $e(), n = En(e, t), r = /* @__PURE__ */ new Map();
  let a = !1;
  n.forEach((o) => {
    o.separator && (a || (a = !0, o.separator.element.focus({
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
      focusVisible: !1,
      preventScroll: !0
    })));
    const s = t.get(o.group);
    s && r.set(o.group, s.layout);
  }), Ve({
    cursorFlags: 0,
    hitRegions: n,
    initialLayoutMap: r,
    pointerDownAtPoint: { x: e.clientX, y: e.clientY },
    state: "active"
  }), n.length && e.preventDefault();
}
function co({
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
      defaultLayoutDeferred: w,
      derivedPanelConstraints: S,
      groupSize: b,
      layout: P,
      separatorToPanels: N
    } = y;
    if (S && P && N) {
      const M = ut({
        delta: p,
        initialLayout: g,
        panelConstraints: S,
        pivotIndices: i.panels.map((O) => m.indexOf(O)),
        prevLayout: P,
        trigger: "mouse-or-touch"
      });
      if (De(M, P)) {
        if (p !== 0 && !v)
          switch (f) {
            case "horizontal": {
              l |= p < 0 ? Qr : eo;
              break;
            }
            case "vertical": {
              l |= p < 0 ? to : no;
              break;
            }
          }
      } else
        Ee(i.group, {
          defaultLayoutDeferred: w,
          derivedPanelConstraints: S,
          groupSize: b,
          layout: M,
          separatorToPanels: N
        });
    }
  });
  let c = 0;
  t.movementX === 0 ? c |= s & rr : c |= l & rr, t.movementY === 0 ? c |= s & or : c |= l & or, oc(c), Rn(e);
}
function pr(e) {
  const t = $e(), n = _e();
  switch (n.state) {
    case "active":
      co({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function gr(e) {
  var r, a;
  if (e.defaultPrevented)
    return;
  const t = _e(), n = $e();
  switch (t.state) {
    case "active": {
      if (
        // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
        e.buttons === 0
      ) {
        Ve({
          cursorFlags: 0,
          state: "inactive"
        }), t.hitRegions.forEach((o) => {
          const s = Ce(o.group.id, !0);
          Ee(o.group, s, {
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
      co({
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
      const o = En(e, n);
      o.length === 0 ? t.state !== "inactive" && Ve({
        cursorFlags: 0,
        state: "inactive"
      }) : Ve({
        cursorFlags: 0,
        hitRegions: o,
        state: "hover"
      }), Rn(e.currentTarget);
      break;
    }
  }
}
function br(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (_e().state) {
      case "hover":
        Ve({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function yr(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || oo(e.currentTarget) && e.preventDefault();
}
function vr(e) {
  let t = 0, n = 0;
  const r = {};
  for (const o of e)
    if (o.defaultSize !== void 0) {
      t++;
      const s = de(o.defaultSize);
      n += s, r[o.panelId] = s;
    } else
      r[o.panelId] = void 0;
  const a = e.length - t;
  if (a !== 0) {
    const o = de((100 - n) / a);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = o);
  }
  return r;
}
function bc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((c) => c.element === t);
  if (!r || !r.onResize)
    return;
  const a = Ze({ group: e }), o = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, l = {
    asPercentage: de(o / a * 100),
    inPixels: o
  };
  r.mutableValues.prevSize = l, r.onResize(l, r.id, s);
}
function yc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function vc({
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
        const m = f / 100 * n, v = de(
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
      d[u] = de(
        f / o * i
      );
    }
  else {
    const u = de(
      i / c.length
    );
    for (const f of c)
      d[f] = u;
  }
  return d;
}
function wc(e, t) {
  const n = e.map((a) => a.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const a of n)
    if (!r.includes(a))
      return !1;
  return !0;
}
const Be = /* @__PURE__ */ new Map();
function Sc(e) {
  let t = !0;
  Y(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = new n((v) => {
    for (const p of v) {
      const { borderBoxSize: g, target: y } = p;
      if (y === e.element) {
        if (t) {
          const w = Ze({ group: e });
          if (w === 0)
            return;
          const S = Ce(e.id);
          if (!S)
            return;
          const b = nn(e), P = S.defaultLayoutDeferred ? vr(b) : S.layout, N = vc({
            group: e,
            nextGroupSize: w,
            prevGroupSize: S.groupSize,
            prevLayout: P
          }), M = Oe({
            layout: N,
            panelConstraints: b
          });
          if (!S.defaultLayoutDeferred && De(S.layout, M) && yc(
            S.derivedPanelConstraints,
            b
          ) && S.groupSize === w)
            return;
          Ee(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: b,
            groupSize: w,
            layout: M,
            separatorToPanels: S.separatorToPanels
          });
        }
      } else
        bc(e, y, g);
    }
  });
  o.observe(e.element), e.panels.forEach((v) => {
    Y(
      !r.has(v.id),
      `Panel ids must be unique; id "${v.id}" was used more than once`
    ), r.add(v.id), v.onResize && o.observe(v.element);
  });
  const s = Ze({ group: e }), l = nn(e), c = e.panels.map(({ id: v }) => v).join(",");
  let i = e.mutableState.defaultLayout;
  i && (wc(e.panels, i) || (i = void 0));
  const d = e.mutableState.layouts[c] ?? i ?? vr(l), u = Oe({
    layout: d,
    panelConstraints: l
  }), f = e.element.ownerDocument;
  Be.set(
    f,
    (Be.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return Zr(e).forEach((v) => {
    v.separator && m.set(v.separator, v.panels);
  }), Ee(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: l,
    groupSize: s,
    layout: u,
    separatorToPanels: m
  }), e.separators.forEach((v) => {
    Y(
      !a.has(v.id),
      `Separator ids must be unique; id "${v.id}" was used more than once`
    ), a.add(v.id), v.element.addEventListener("keydown", mr);
  }), Be.get(f) === 1 && (f.addEventListener("contextmenu", cr, !0), f.addEventListener("dblclick", fr, !0), f.addEventListener("pointerdown", hr, !0), f.addEventListener("pointerleave", pr), f.addEventListener("pointermove", gr), f.addEventListener("pointerout", br), f.addEventListener("pointerup", yr, !0)), function() {
    t = !1, Be.set(
      f,
      Math.max(0, (Be.get(f) ?? 0) - 1)
    ), ic(e), e.separators.forEach((v) => {
      v.element.removeEventListener("keydown", mr);
    }), Be.get(f) || (f.removeEventListener(
      "contextmenu",
      cr,
      !0
    ), f.removeEventListener(
      "dblclick",
      fr,
      !0
    ), f.removeEventListener(
      "pointerdown",
      hr,
      !0
    ), f.removeEventListener("pointerleave", pr), f.removeEventListener("pointermove", gr), f.removeEventListener("pointerout", br), f.removeEventListener("pointerup", yr, !0)), o.disconnect();
  };
}
function Pc() {
  const [e, t] = C({}), n = k(() => t({}), []);
  return [e, n];
}
function Mn(e) {
  const t = fn();
  return `${e ?? t}`;
}
const je = typeof window < "u" ? Fe : $;
function at(e) {
  const t = x(e);
  return je(() => {
    t.current = e;
  }, [e]), k(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function An(...e) {
  return at((t) => {
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
function kn(e) {
  const t = x({ ...e });
  return je(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const lo = dn(null);
function Ic(e, t) {
  const n = x({
    getLayout: () => ({}),
    setLayout: ac
  });
  ln(t, () => n.current, []), je(() => {
    Object.assign(
      n.current,
      io({ groupId: e })
    );
  });
}
function uo({
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
  }), p = at((R) => {
    De(v.current.onLayoutChange, R) || (v.current.onLayoutChange = R, c == null || c(R));
  }), g = at(
    (R, I) => {
      De(v.current.onLayoutChanged, R) || (v.current.onLayoutChanged = R, i == null || i(R, { isUserInteraction: I }));
    }
  ), y = Mn(l), w = x(null), [S, b] = Pc(), P = x({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: u,
    separators: []
  }), N = An(w, o);
  Ic(y, s);
  const M = at(
    (R, I) => {
      const A = _e(), D = ir(R), L = Ce(R);
      if (L) {
        let j = !1;
        switch (A.state) {
          case "active": {
            j = A.hitRegions.some(
              (H) => H.group === D
            );
            break;
          }
        }
        return {
          flexGrow: L.layout[I] ?? 1,
          pointerEvents: j ? "none" : void 0
        };
      }
      if (n != null && n[I])
        return {
          flexGrow: n == null ? void 0 : n[I]
        };
    }
  ), O = kn({
    defaultLayout: n,
    disableCursor: r
  }), T = K(
    () => ({
      get disableCursor() {
        return !!O.disableCursor;
      },
      getPanelStyles: M,
      id: y,
      orientation: d,
      registerPanel: (R) => {
        const I = P.current;
        return I.panels = rn(d, [
          ...I.panels,
          R
        ]), b(), () => {
          I.panels = I.panels.filter(
            (A) => A !== R
          ), b();
        };
      },
      registerSeparator: (R) => {
        const I = P.current;
        return I.separators = rn(d, [
          ...I.separators,
          R
        ]), b(), () => {
          I.separators = I.separators.filter(
            (A) => A !== R
          ), b();
        };
      },
      updatePanelProps: (R, { disabled: I }) => {
        const A = P.current.panels.find(
          (j) => j.id === R
        );
        A && (A.panelConstraints.disabled = I);
        const D = ir(y), L = Ce(y);
        D && L && Ee(D, {
          ...L,
          derivedPanelConstraints: nn(D)
        });
      },
      updateSeparatorProps: (R, {
        disabled: I,
        disableDoubleClick: A
      }) => {
        const D = P.current.separators.find(
          (L) => L.id === R
        );
        D && (D.disabled = I, D.disableDoubleClick = A);
      }
    }),
    [M, y, b, d, O]
  ), E = x(null);
  return je(() => {
    const R = w.current;
    if (R === null)
      return;
    const I = P.current;
    let A;
    if (O.defaultLayout !== void 0 && Object.keys(O.defaultLayout).length === I.panels.length) {
      A = {};
      for (const re of I.panels) {
        const ne = O.defaultLayout[re.id];
        ne !== void 0 && (A[re.id] = ne);
      }
    }
    const D = {
      disabled: !!a,
      element: R,
      id: y,
      mutableState: {
        defaultLayout: A,
        disableCursor: !!O.disableCursor,
        expandedPanelSizes: P.current.lastExpandedPanelSizes,
        layouts: P.current.layouts
      },
      orientation: d,
      panels: I.panels,
      resizeTargetMinimumSize: I.resizeTargetMinimumSize,
      separators: I.separators
    };
    E.current = D;
    const L = Sc(D), { defaultLayoutDeferred: j, derivedPanelConstraints: H, layout: q } = Ce(D.id, !0);
    !j && H.length > 0 && (p(q), g(q, !1));
    const Q = Tn(y, (re) => {
      const { defaultLayoutDeferred: ne, derivedPanelConstraints: se, layout: U } = re.next;
      if (ne || se.length === 0)
        return;
      const V = D.panels.map(({ id: X }) => X).join(",");
      D.mutableState.layouts[V] = U, se.forEach((X) => {
        if (X.collapsible) {
          const { layout: ce } = re.prev ?? {};
          if (ce) {
            const me = le(
              X.collapsedSize,
              U[X.panelId]
            ), fe = le(
              X.collapsedSize,
              ce[X.panelId]
            );
            me && !fe && (D.mutableState.expandedPanelSizes[X.panelId] = ce[X.panelId]);
          }
        }
      });
      const Z = _e().state !== "active";
      p(U), Z && g(U, re.isUserInteraction);
    });
    return () => {
      E.current = null, L(), Q();
    };
  }, [
    a,
    y,
    g,
    p,
    d,
    S,
    O
  ]), $(() => {
    const R = E.current;
    R && (R.mutableState.defaultLayout = n, R.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ h(lo.Provider, { value: T, children: /* @__PURE__ */ h(
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
uo.displayName = "Group";
function Nn() {
  const e = un(lo);
  return Y(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function Rc(e, t) {
  const { id: n } = Nn(), r = x({
    collapse: Jt,
    expand: Jt,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Jt
  });
  ln(t, () => r.current, []), je(() => {
    Object.assign(
      r.current,
      so({ groupId: n, panelId: e })
    );
  });
}
function on({
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
  const p = !!c, g = Mn(c), y = kn({
    disabled: o
  }), w = x(null), S = An(w, s), {
    getPanelStyles: b,
    id: P,
    orientation: N,
    registerPanel: M,
    updatePanelProps: O
  } = Nn(), T = u !== null, E = at(
    (D, L, j) => {
      u == null || u(D, c, j);
    }
  );
  je(() => {
    const D = w.current;
    if (D !== null) {
      const L = {
        element: D,
        id: g,
        idIsStable: p,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: T ? E : void 0,
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
      return M(L);
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
    E,
    M,
    y
  ]), $(() => {
    O(g, { disabled: o });
  }, [o, g, O]), Rc(g, f);
  const R = () => {
    const D = b(P, g);
    if (D)
      return JSON.stringify(D);
  }, I = wo(
    (D) => Tn(P, D),
    R,
    R
  );
  let A;
  return I ? A = JSON.parse(I) : a !== void 0 ? A = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: a
  } : A = { flexGrow: 1 }, /* @__PURE__ */ h(
    "div",
    {
      ...v,
      "data-disabled": o || void 0,
      "data-panel": !0,
      "data-testid": g,
      id: g,
      ref: S,
      style: {
        ...Tc,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...A
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
on.displayName = "Panel";
const Tc = {
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
function Ec({
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
    o = Oe({
      layout: ut({
        delta: i - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], a = Oe({
      layout: ut({
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
function fo({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: a,
  id: o,
  style: s,
  ...l
}) {
  const c = Mn(o), i = kn({
    disabled: n,
    disableDoubleClick: r
  }), [d, u] = C({}), [f, m] = C("inactive"), [v, p] = C(!1), g = x(null), y = An(g, a), {
    disableCursor: w,
    id: S,
    orientation: b,
    registerSeparator: P,
    updateSeparatorProps: N
  } = Nn(), M = b === "horizontal" ? "vertical" : "horizontal";
  je(() => {
    const E = g.current;
    if (E !== null) {
      const R = {
        disabled: i.disabled,
        disableDoubleClick: i.disableDoubleClick,
        element: E,
        id: c
      }, I = P(R), A = rc(
        (L) => {
          m(
            L.next.state !== "inactive" && L.next.hitRegions.some(
              (j) => j.separator === R
            ) ? L.next.state : "inactive"
          );
        }
      ), D = Tn(
        S,
        (L) => {
          const { derivedPanelConstraints: j, layout: H, separatorToPanels: q } = L.next, Q = q.get(R);
          if (Q) {
            const re = Q[0], ne = Q.indexOf(re);
            u(
              Ec({
                layout: H,
                panelConstraints: j,
                panelId: re.id,
                panelIndex: ne
              })
            );
          }
        }
      );
      return () => {
        A(), D(), I();
      };
    }
  }, [S, c, P, i]), $(() => {
    N(c, { disabled: n, disableDoubleClick: r });
  }, [n, r, c, N]);
  let O;
  n && !w && (O = "not-allowed");
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
      "aria-orientation": M,
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
        cursor: O,
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
fo.displayName = "Separator";
const xn = 30, Cn = 65, ft = 50, Mc = 100 - Cn, Ac = 100 - xn;
function kc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Cn, Math.max(xn, t)) : ft;
}
function Ln(e) {
  return 100 - e;
}
function He(e) {
  return `${e}%`;
}
const zn = "reader-document", mt = "reader-assistant", mo = "retainpdf.reader.ai-split-layout.v1", Nc = {
  [zn]: Ln(ft),
  [mt]: ft
};
function _n(e) {
  const t = kc(e == null ? void 0 : e[mt]);
  return {
    [zn]: Ln(t),
    [mt]: t
  };
}
function xc() {
  try {
    const e = JSON.parse(localStorage.getItem(mo) || "null");
    return _n(e);
  } catch {
    return Nc;
  }
}
function Cc(e) {
  try {
    localStorage.setItem(mo, JSON.stringify(_n(e)));
  } catch {
  }
}
function Kt(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = _n(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[mt]}vw`
  );
}
function Lc() {
  const e = x(null), [t] = C(xc);
  Fe(() => {
    const a = e.current;
    return Kt(a, t), () => {
      var o;
      (o = a == null ? void 0 : a.closest(".reader-react-root")) == null || o.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = k((a) => {
    Kt(e.current, a);
  }, []), r = k((a, o) => {
    Kt(e.current, a), o.isUserInteraction && Cc(a);
  }, []);
  return /* @__PURE__ */ z(
    uo,
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
          on,
          {
            id: zn,
            defaultSize: He(Ln(ft)),
            minSize: He(Mc),
            maxSize: He(Ac)
          }
        ),
        /* @__PURE__ */ h(
          fo,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ h("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ h(
          on,
          {
            id: mt,
            defaultSize: He(ft),
            minSize: He(xn),
            maxSize: He(Cn)
          }
        )
      ]
    }
  );
}
const Ne = 12, zc = 4;
function Ke(e, t, n) {
  if (typeof window > "u") return { x: e, y: t };
  const r = Math.min(n, window.innerWidth - Ne * 2), a = Math.max(Ne, window.innerWidth - r - Ne), o = Math.min(window.innerHeight * 0.9, 860), s = Math.max(Ne, window.innerHeight - o - Ne);
  return {
    x: Math.min(a, Math.max(Ne, e)),
    y: Math.min(s, Math.max(Ne, t))
  };
}
function wr(e) {
  if (typeof window > "u") return { x: 24, y: 72 };
  const t = Math.min(e, window.innerWidth - Ne * 2);
  return Ke(window.innerWidth - t - 20, 72, e);
}
function _c(e, t) {
  try {
    const n = localStorage.getItem(e);
    if (!n) return wr(t);
    const r = JSON.parse(n);
    if (typeof r.x == "number" && typeof r.y == "number")
      return Ke(r.x, r.y, t);
  } catch {
  }
  return wr(t);
}
function Dc(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
}
function ho({
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
  const v = i === "workspace", p = i === "dock-right", g = p || v, [y, w] = C(() => _c(o, c)), [S, b] = C(!1), P = x(null);
  $(() => {
    !t || g || w((T) => Ke(T.x, T.y, c));
  }, [g, t, c]), $(() => {
    if (!t || g) return;
    const T = () => w((E) => Ke(E.x, E.y, c));
    return window.addEventListener("resize", T), () => window.removeEventListener("resize", T);
  }, [g, t, c]), $(() => {
    if (!t) return;
    const T = (E) => {
      var I;
      if (E.key !== "Escape") return;
      const R = E.target;
      (I = R == null ? void 0 : R.closest) != null && I.call(R, "textarea, input, select, [contenteditable='true']") || (E.preventDefault(), u());
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [t, u]);
  const N = k((T) => {
    var E, R;
    g || T.button === 0 && ((R = (E = T.target) == null ? void 0 : E.closest) != null && R.call(E, "button") || (T.currentTarget.setPointerCapture(T.pointerId), P.current = {
      pointerId: T.pointerId,
      startX: T.clientX,
      startY: T.clientY,
      originX: y.x,
      originY: y.y,
      moved: !1
    }, b(!0)));
  }, [g, y.x, y.y]), M = k((T) => {
    const E = P.current;
    if (!E || E.pointerId !== T.pointerId) return;
    const R = T.clientX - E.startX, I = T.clientY - E.startY;
    !E.moved && Math.hypot(R, I) < zc || (E.moved = !0, w(Ke(E.originX + R, E.originY + I, c)));
  }, [c]), O = k((T) => {
    const E = P.current;
    if (!(!E || E.pointerId !== T.pointerId)) {
      P.current = null, b(!1);
      try {
        T.currentTarget.releasePointerCapture(T.pointerId);
      } catch {
      }
      E.moved && w((R) => {
        const I = Ke(R.x, R.y, c);
        return Dc(o, I), I;
      });
    }
  }, [o, c]);
  return t ? /* @__PURE__ */ z(
    "aside",
    {
      id: e,
      className: `reader-notes-panel reader-notes-panel--${v ? "workspace" : p ? "docked" : "float"}${g ? "" : " reader-floating-surface"}${d ? " has-panel-header" : " is-headerless"}${f ? " has-panel-toolbar" : ""}${S ? " is-dragging" : ""} ${l}`.trim(),
      style: g ? void 0 : { left: y.x, top: y.y, width: Math.min(c, typeof window < "u" ? window.innerWidth - 24 : c) },
      "aria-label": s,
      role: "dialog",
      "aria-modal": "false",
      children: [
        d ? /* @__PURE__ */ z(
          "header",
          {
            className: "reader-notes-panel-head",
            onPointerDown: N,
            onPointerMove: M,
            onPointerUp: O,
            onPointerCancel: O,
            children: [
              g ? null : /* @__PURE__ */ h("div", { className: "reader-notes-panel-drag", "aria-hidden": "true", children: /* @__PURE__ */ h(Jo, { size: 14, strokeWidth: 2.25 }) }),
              /* @__PURE__ */ z("div", { className: "reader-notes-panel-head-text", children: [
                /* @__PURE__ */ z("strong", { children: [
                  a,
                  n
                ] }),
                r ? /* @__PURE__ */ h("span", { children: r }) : null
              ] }),
              /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-close reader-floating-close", "aria-label": `关闭${n}`, onClick: u, children: /* @__PURE__ */ h(Xe, { size: 14, strokeWidth: 2.5, "aria-hidden": !0 }) })
            ]
          }
        ) : null,
        f ? /* @__PURE__ */ h("div", { className: "reader-notes-panel-toolbar", children: f }) : null,
        /* @__PURE__ */ h("div", { className: "reader-notes-panel-body", children: m })
      ]
    }
  ) : null;
}
function Oc({
  note: e,
  onJump: t,
  onUpdateNote: n,
  onRemove: r
}) {
  const [a, o] = C(!1), [s, l] = C(e.note);
  return $(() => {
    a || l(e.note);
  }, [e.note, a]), /* @__PURE__ */ z("article", { className: "reader-notes-item", children: [
    /* @__PURE__ */ z("div", { className: "reader-notes-item-top", children: [
      /* @__PURE__ */ h("span", { className: "reader-notes-kind", children: e.pane === "translated" ? "译文" : "原文" }),
      /* @__PURE__ */ z("div", { className: "reader-notes-item-actions", children: [
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-link", onClick: () => t(e), children: "定位" }),
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-danger", onClick: () => r(e.id), children: "删除" })
      ] })
    ] }),
    /* @__PURE__ */ h("p", { className: "reader-notes-quote", children: e.quote }),
    a ? /* @__PURE__ */ z("div", { className: "reader-notes-editor", children: [
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
      /* @__PURE__ */ z("div", { className: "reader-notes-editor-actions", children: [
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
function Fc({
  open: e,
  groups: t,
  count: n,
  onClose: r,
  onJump: a,
  onUpdateNote: o,
  onRemove: s,
  onExport: l
}) {
  const [c, i] = C(!1);
  return /* @__PURE__ */ h(
    ho,
    {
      id: "reader-notes-panel",
      open: e,
      title: "批注",
      subtitle: "选中 PDF 文字后可添加 · 本地保存",
      titleIcon: /* @__PURE__ */ h(zt, { size: 14, strokeWidth: 2.25, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.notes-float.pos.v1",
      ariaLabel: "批注",
      onClose: r,
      toolbar: /* @__PURE__ */ z(Ct, { children: [
        /* @__PURE__ */ z("span", { className: "reader-notes-count", children: [
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
      children: n === 0 ? /* @__PURE__ */ h("p", { className: "reader-notes-empty", children: "暂无批注。在 PDF 上拖选文字，点「添加批注」。" }) : t.map((d) => /* @__PURE__ */ z("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ z("h3", { className: "reader-notes-group-title", children: [
          "第 ",
          d.page,
          " 页"
        ] }),
        d.items.map((u) => /* @__PURE__ */ h(
          Oc,
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
function $c({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = C(!1);
  if ($(() => {
    !e && !t && r(!1);
  }, [e, t]), n || !e && !t)
    return null;
  const a = [
    e ? "译文区域" : "",
    t ? "阅读元数据" : ""
  ].filter(Boolean);
  return /* @__PURE__ */ z("div", { className: "reader-error-notice", role: "status", "data-reader-error-notice": "true", children: [
    /* @__PURE__ */ z("span", { className: "reader-error-notice-text", children: [
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
function jc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: a = !1,
  metadataError: o = !1
}) {
  return !e && !t ? /* @__PURE__ */ h($c, { regionsFailed: a, metadataFailed: o }) : /* @__PURE__ */ z(Ct, { children: [
    e ? /* @__PURE__ */ h("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ z("div", { className: "reader-boot-loading-card", children: [
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
async function Uc(e) {
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
function Bc({
  selection: e,
  onDismiss: t,
  onAskAi: n,
  onAddNote: r
}) {
  const [a, o] = C(!1), s = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if ($(() => o(!1), [s]), !e)
    return null;
  const l = typeof window < "u" ? window.innerWidth : 800, c = typeof window < "u" ? window.innerHeight : 600, i = e.rect.left + e.rect.width / 2, d = 170, u = Math.min(Math.max(16 + d, i), l - 16 - d), f = e.rect.top > 72, m = f ? Math.max(12, e.rect.top - 8) : Math.min(c - 12, e.rect.top + e.rect.height + 8), v = f ? "above" : "below", p = e.pane === "translated" ? "译文" : "原文", g = e.selectionType === "text" ? "text" : e.kind, y = e.selectionType === "text" ? e.quote : Er(e.region, e.pane), w = g === "formula" ? "公式" : g === "table" ? "表格" : g === "figure" ? "图片" : g === "text" ? "文字" : "区域", S = g === "formula" ? zo(y) : y, b = g === "formula" ? Ko : g === "table" ? qo : g === "text" ? Vo : Go;
  return /* @__PURE__ */ z(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${v} reader-sel-pop--region`,
      style: { left: u, top: m },
      role: "toolbar",
      "aria-label": "选区操作",
      onPointerDown: (P) => {
        P.preventDefault();
      },
      children: [
        /* @__PURE__ */ z("div", { className: "reader-sel-pop-card reader-floating-surface", children: [
          /* @__PURE__ */ z("div", { className: "reader-sel-pop-context", children: [
            /* @__PURE__ */ h(b, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { children: w }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ h("span", { children: p }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ z("span", { children: [
              e.page,
              " 页"
            ] })
          ] }),
          /* @__PURE__ */ z("div", { className: "reader-sel-pop-actions", children: [
            S ? /* @__PURE__ */ z(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--primary",
                onClick: async () => {
                  try {
                    await Uc(S), o(!0), window.setTimeout(() => o(!1), 1400);
                  } catch (P) {
                    console.warn("[reader-selection] copy failed", P);
                  }
                },
                children: [
                  a ? /* @__PURE__ */ h(Yo, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ h(Zo, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: a ? "已复制" : g === "formula" ? "复制 LaTeX" : "复制" })
                ]
              }
            ) : /* @__PURE__ */ h("span", { className: "reader-sel-pop-selection-hint", children: "已选择图片" }),
            r && S ? /* @__PURE__ */ z(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => r({ page: e.page, pane: e.pane, quote: S }),
                children: [
                  /* @__PURE__ */ h(zt, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: "添加批注" })
                ]
              }
            ) : null,
            n ? /* @__PURE__ */ z(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => n(e),
                children: [
                  /* @__PURE__ */ h(hn, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
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
                children: /* @__PURE__ */ h(Xe, { size: 15, strokeWidth: 2.5, "aria-hidden": !0 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ h("span", { className: "reader-sel-pop-caret", "aria-hidden": "true" })
      ]
    }
  );
}
function Hc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Wc() {
  const [e, t] = C(!1), n = fn(), r = x(null);
  return $(() => {
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
  }, [e]), $(() => {
    const a = (o) => {
      if (o.defaultPrevented || o.metaKey || o.ctrlKey || o.altKey || Hc(o.target)) return;
      const s = o.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !o.shiftKey)
          return;
        o.preventDefault(), t((l) => !l);
      }
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, []), /* @__PURE__ */ z("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
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
        children: /* @__PURE__ */ h(Xo, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    ),
    e ? /* @__PURE__ */ z(
      "div",
      {
        id: n,
        className: "reader-react-shortcuts-panel reader-floating-surface",
        role: "dialog",
        "aria-label": "阅读器快捷键",
        children: [
          /* @__PURE__ */ z("div", { className: "reader-react-shortcuts-head", children: [
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
          /* @__PURE__ */ h("div", { className: "reader-react-shortcuts-body", children: Qs.map((a) => /* @__PURE__ */ z("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ h("h3", { children: a.title }),
            /* @__PURE__ */ h("ul", { children: a.items.map((o) => /* @__PURE__ */ z("li", { children: [
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
const Jc = Object.freeze([
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
]), Kc = ["source", "sideBySide", "translated"], qc = { source: "", translated: "", sideBySide: "" };
function Vc(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = it(e.sourceUrl), n = it(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return ga({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function Gc(e) {
  const [t, n] = C(() => /* @__PURE__ */ new Set()), r = K(
    () => e ? Vc(e) : qc,
    [e]
  ), a = K(
    () => Kc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), o = k(async (s) => {
    if (!e) return;
    const l = it(r[s]);
    if (!(!l || t.has(s)))
      try {
        const c = e.jobId ? pa(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await ba(
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
        ya(i), n((d) => {
          const u = new Set(d);
          return u.delete(s), u;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: a, busyActions: t, handleDownload: o };
}
function Yc(e) {
  const [t, n] = C(!1), r = k(() => n(!1), []), a = k(() => n((o) => !o), []);
  return $(() => {
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
const po = "retainpdf.reader.fab.pos.v1", Nt = 52, We = 12, Zc = 6;
function st(e, t) {
  if (typeof window > "u")
    return { x: e, y: t };
  const n = Math.max(We, window.innerWidth - Nt - We), r = Math.max(We, window.innerHeight - Nt - We);
  return {
    x: Math.min(n, Math.max(We, e)),
    y: Math.min(r, Math.max(We, t))
  };
}
function Sr() {
  return typeof window > "u" ? { x: 24, y: 120 } : st(
    window.innerWidth - Nt - 20,
    window.innerHeight - Nt - 88
  );
}
function Xc() {
  try {
    const e = localStorage.getItem(po);
    if (!e) return Sr();
    const t = JSON.parse(e);
    if (typeof t.x == "number" && typeof t.y == "number")
      return st(t.x, t.y);
  } catch {
  }
  return Sr();
}
function Qc(e) {
  try {
    localStorage.setItem(po, JSON.stringify(e));
  } catch {
  }
}
function el(e) {
  return typeof window < "u" && e.y > window.innerHeight * 0.55;
}
function tl(e = {}) {
  const { onDragStart: t, onActivate: n } = e, [r, a] = C(() => Xc()), o = x(null);
  $(() => {
    const i = () => a((d) => st(d.x, d.y));
    return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, []);
  const s = k((i) => {
    i.button === 0 && (i.currentTarget.setPointerCapture(i.pointerId), o.current = {
      pointerId: i.pointerId,
      startX: i.clientX,
      startY: i.clientY,
      originX: r.x,
      originY: r.y,
      moved: !1
    });
  }, [r.x, r.y]), l = k((i) => {
    const d = o.current;
    if (!d || d.pointerId !== i.pointerId) return;
    const u = i.clientX - d.startX, f = i.clientY - d.startY;
    !d.moved && Math.hypot(u, f) < Zc || (d.moved || (d.moved = !0, t == null || t()), a(st(d.originX + u, d.originY + f)));
  }, [t]), c = k((i) => {
    const d = o.current;
    if (!(!d || d.pointerId !== i.pointerId)) {
      o.current = null;
      try {
        i.currentTarget.releasePointerCapture(i.pointerId);
      } catch {
      }
      if (d.moved) {
        a((u) => {
          const f = st(u.x, u.y);
          return Qc(f), f;
        });
        return;
      }
      n == null || n();
    }
  }, [n]);
  return {
    pos: r,
    openUp: el(r),
    onPointerDown: s,
    onPointerMove: l,
    onPointerUp: c
  };
}
const nl = {
  source: Mr,
  sideBySide: Ar,
  translated: kr
}, rl = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function ol({ onClose: e }) {
  return /* @__PURE__ */ z("header", { className: "reader-fab-menu-head", children: [
    /* @__PURE__ */ z("div", { className: "reader-fab-menu-head-text", children: [
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
        children: /* @__PURE__ */ h(Xe, { size: 14, strokeWidth: 2.5, "aria-hidden": !0 })
      }
    )
  ] });
}
function al({
  index: e,
  icon: t,
  title: n,
  sub: r,
  active: a,
  disabled: o,
  onClick: s
}) {
  return /* @__PURE__ */ z(
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
        /* @__PURE__ */ z("span", { className: "reader-fab-row-copy", children: [
          /* @__PURE__ */ h("span", { className: "reader-fab-row-title", children: n }),
          /* @__PURE__ */ h("span", { className: "reader-fab-row-sub", children: r })
        ] })
      ]
    }
  );
}
function sl({
  urls: e,
  items: t,
  busyActions: n,
  onDownload: r
}) {
  return /* @__PURE__ */ z("div", { className: "reader-fab-section", role: "group", "aria-label": "下载", children: [
    /* @__PURE__ */ z("div", { className: "reader-fab-section-head", children: [
      /* @__PURE__ */ h(Qo, { size: 12, strokeWidth: 2.5, "aria-hidden": !0 }),
      /* @__PURE__ */ h("span", { children: "下载 PDF" })
    ] }),
    /* @__PURE__ */ h("div", { className: "reader-fab-download-grid", children: t.map((a, o) => {
      const s = To[a], l = it(e[a]), c = n.has(a), i = !!l && !c, d = i ? "" : Eo(a, e), u = nl[a];
      return /* @__PURE__ */ z(
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
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-label", children: rl[a] }),
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-state", children: c ? "…" : i ? "↓" : "—" })
          ]
        },
        a
      );
    }) }),
    t.every((a) => !it(e[a])) ? /* @__PURE__ */ h("p", { className: "reader-fab-empty", children: "产物尚未就绪" }) : null
  ] });
}
const il = {
  favorites: ea,
  markdown: Nr,
  ai: hn,
  notes: zt
}, cl = Jc;
function ll(e) {
  const { activeTool: t, noteCount: n, onToggleTool: r } = e, a = pt(), o = e.sourceOnly ?? (a == null ? void 0 : a.sourceOnly) ?? !1, s = e.download ?? (a == null ? void 0 : a.download), l = x(null), c = fn(), { open: i, setOpen: d, closeMenu: u, toggleMenu: f } = Yc(l), { pos: m, openUp: v, onPointerDown: p, onPointerMove: g, onPointerUp: y } = tl({
    onDragStart: u,
    onActivate: f
  }), { urls: w, downloadItems: S, busyActions: b, handleDownload: P } = Gc(s), N = k((M) => {
    r(M), d(!1);
  }, [r, d]);
  return /* @__PURE__ */ z(
    "div",
    {
      ref: l,
      className: `reader-fab${i ? " is-open" : ""}${v ? " is-open-up" : ""}`,
      style: { left: m.x, top: m.y },
      "data-reader-fab": "",
      children: [
        i ? /* @__PURE__ */ z(
          "div",
          {
            id: c,
            className: "reader-fab-menu reader-floating-surface",
            role: "menu",
            "aria-label": "阅读工具",
            children: [
              /* @__PURE__ */ h(ol, { onClose: u }),
              (() => {
                const M = t === "notes";
                return /* @__PURE__ */ z(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    className: `reader-fab-row${M ? " is-active" : ""}`,
                    "aria-pressed": M,
                    onClick: () => N("notes"),
                    style: { "--fab-i": 0 },
                    children: [
                      /* @__PURE__ */ h("span", { className: "reader-fab-row-icon", "aria-hidden": "true", children: /* @__PURE__ */ h(zt, { size: 18, strokeWidth: 2 }) }),
                      /* @__PURE__ */ z("span", { className: "reader-fab-row-copy", children: [
                        /* @__PURE__ */ h("span", { className: "reader-fab-row-title", children: "批注" }),
                        /* @__PURE__ */ h("span", { className: "reader-fab-row-sub", children: M ? "关闭悬浮窗" : "本地批注 · 导出" })
                      ] }),
                      n > 0 ? /* @__PURE__ */ h("span", { className: "reader-fab-row-badge", children: n }) : null
                    ]
                  }
                );
              })(),
              cl.map((M, O) => {
                const T = il[M.id], E = t === M.id, R = M.needsJob && o;
                let I = E ? M.subOpen : M.subIdle;
                return R && (I = "需打开任务阅读"), /* @__PURE__ */ h(
                  al,
                  {
                    index: O,
                    icon: T,
                    title: M.label,
                    sub: I,
                    active: E,
                    disabled: R,
                    onClick: () => N(M.id)
                  },
                  M.id
                );
              }),
              /* @__PURE__ */ h(
                sl,
                {
                  urls: w,
                  items: S,
                  busyActions: b,
                  onDownload: P
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
            children: /* @__PURE__ */ h("span", { className: "reader-fab-icon", "aria-hidden": "true", children: i ? /* @__PURE__ */ h(Xe, { size: 20, strokeWidth: 2.5 }) : /* @__PURE__ */ z("span", { className: "reader-fab-dots", children: [
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
function dl(e) {
  const t = pt(), n = _i(), { mode: r = "compare", modeControls: a } = e, o = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? ht, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), l = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, c = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, i = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), d = ts(o), u = o > zr + 1e-3, f = o < _r - 1e-3, m = ot(), v = "50%（半屏，对照铺满）", [p, g] = C(!1), [y, w] = C(`${l}`);
  $(() => {
    p || w(`${Math.min(Math.max(l, 1), Math.max(c, 1))}`);
  }, [l, c, p]);
  const S = () => {
    if (g(!1), !i || c <= 0)
      return;
    const b = Number(`${y}`.trim());
    i(kt(b, c));
  };
  return /* @__PURE__ */ z("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    a ? /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-modes", children: a }) : null,
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group", "aria-label": "页码", children: p ? /* @__PURE__ */ z(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (b) => {
          b.preventDefault(), S();
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
              onChange: (b) => w(b.target.value.replace(/[^\d]/g, "")),
              onBlur: S,
              onKeyDown: (b) => {
                b.key === "Escape" && (b.preventDefault(), g(!1), w(`${l}`));
              }
            }
          ),
          /* @__PURE__ */ z("span", { className: "reader-react-hud-page-suffix", children: [
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
          !i || c <= 0 || (w(`${l}`), g(!0));
        },
        children: c > 0 ? `${Math.min(l, c)} / ${c}` : "—"
      }
    ) }),
    /* @__PURE__ */ z("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "缩小",
          disabled: !u,
          onClick: () => s(dt(o, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ z(
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
          onClick: () => s(dt(o, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ h(Wc, {}) })
  ] });
}
function xt(e) {
  const t = `${e.documentId || ""}`.trim();
  if (t)
    return `${Rt}doc:${t}`;
  const n = `${e.jobId || ""}`.trim();
  return n ? `${Rt}job:${n}` : `${Rt}anonymous`;
}
const Rt = "retainpdf.reader.notes.v1:";
function ul(e) {
  const t = `${e.jobId || ""}`.trim();
  if (!t)
    return [];
  const n = `${Rt}job:${t}`;
  return n === xt(e) ? [] : [n];
}
function fl() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function ml(e) {
  return {
    pageIdx: Number(e.page) - 1,
    quoteText: e.quote,
    note: e.note,
    createdAt: e.createdAt
  };
}
function go(e) {
  return Oo(e, (t) => t.page);
}
function hl(e) {
  return $o(e, (t) => t.page).map((t) => ({ page: t.pageIdx, items: t.items }));
}
function pl(e, t) {
  return Fo({
    title: e,
    annotations: t.map(ml)
  });
}
function gl(e) {
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
function an(e) {
  try {
    return gl(localStorage.getItem(e));
  } catch {
    return [];
  }
}
function bl(...e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const r of n)
      t.has(r.id) || t.set(r.id, r);
  return go([...t.values()]);
}
function yl(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch (r) {
    return console.warn("[reader-notes] persist failed", r), !1;
  }
  const n = new Set(an(e).map((r) => r.id));
  return t.every((r) => n.has(r.id));
}
function Pr(e) {
  if (typeof localStorage > "u")
    return [];
  const t = xt(e), n = an(t), r = ul(e).map((o) => ({ key: o, notes: an(o) })).filter((o) => o.notes.length > 0);
  if (r.length === 0)
    return n;
  const a = bl(n, ...r.map((o) => o.notes));
  if (!yl(t, a))
    return a;
  for (const o of r)
    try {
      localStorage.removeItem(o.key);
    } catch {
    }
  return a;
}
function vl(e, t) {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.setItem(e, JSON.stringify(t));
    } catch (n) {
      console.warn("[reader-notes] persist failed", n);
    }
}
function wl(e, t = {}) {
  const n = K(
    () => ({
      jobId: `${e.jobId || ""}`.trim(),
      documentId: `${e.documentId || ""}`.trim()
    }),
    [e.jobId, e.documentId]
  ), [r, a] = C(() => ({
    key: xt(n),
    notes: Pr(n)
  })), o = r.notes, s = k(
    (v) => {
      a((p) => ({
        key: p.key,
        notes: typeof v == "function" ? v(p.notes) : v
      }));
    },
    []
  ), l = t.onAfterAdd, c = xt(n);
  $(() => {
    a((v) => v.key === c ? v : { key: c, notes: Pr(n) });
  }, [n, c]), $(() => {
    vl(r.key, r.notes);
  }, [r]);
  const i = k((v) => {
    const p = `${v.quote || ""}`.trim();
    if (!p)
      return null;
    const g = {
      id: fl(),
      page: Math.max(1, Math.floor(Number(v.page) || 1)),
      pane: v.pane === "translated" ? "translated" : "source",
      quote: p,
      note: `${v.note || ""}`.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s((y) => go([g, ...y])), l == null || l(), g;
  }, [l]), d = k((v, p) => {
    const g = `${p || ""}`.trim();
    s((y) => y.map((w) => w.id === v ? { ...w, note: g } : w));
  }, []), u = k((v) => {
    s((p) => p.filter((g) => g.id !== v));
  }, []), f = k(async (v = "") => {
    var g, y;
    const p = pl(v, o);
    try {
      return await ((y = (g = navigator.clipboard) == null ? void 0 : g.writeText) == null ? void 0 : y.call(g, p)), !0;
    } catch (w) {
      return console.error("[reader-notes] copy failed", w), !1;
    }
  }, [o]), m = K(() => hl(o), [o]);
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
const sn = "download-toast";
function Sl({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: a = "progress"
}) {
  const o = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ z("div", { className: "download-toast-card reader-floating-surface", "data-tone": a, "aria-live": "polite", children: [
    /* @__PURE__ */ z("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ h("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ h("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ h("div", { className: "download-toast-track", children: /* @__PURE__ */ h("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${o}%` } }) }),
    /* @__PURE__ */ h("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function Pl(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: a = "等待响应...",
    percent: o = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    qt.dismiss(sn);
    return;
  }
  qt.custom(
    () => /* @__PURE__ */ h(Sl, { title: n, status: r, meta: a, percent: o, tone: s }),
    { id: sn, duration: 1 / 0 }
  );
}
function Il() {
  const e = k((t) => {
    t && (t.setState = Pl, t.hide = () => qt.dismiss(sn));
  }, []);
  return /* @__PURE__ */ z(Ct, { children: [
    /* @__PURE__ */ h(jo, { position: "bottom-right" }),
    /* @__PURE__ */ h("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function Tt(e) {
  const t = x(!1);
  return e && (t.current = !0), t.current;
}
function Rl({
  panel: e,
  active: t,
  context: n
}) {
  var c, i;
  const r = t === e.id, a = Tt(r);
  if (!(e.keepMounted ? a : r)) return null;
  const s = ae(), l = e.slot === "terminal" ? (c = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : c.call(s, {
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
    ho,
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
const Tl = mn(() => import("./ReaderFavoritesPanel-DZA4sTbJ.js").then((e) => ({ default: e.ReaderFavoritesPanel }))), El = mn(() => import("./ReaderMarkdownPanel-DG8DaWtK.js").then((e) => ({ default: e.ReaderMarkdownPanel }))), Ml = mn(() => import("./ReaderAiPanel-CsR0PVOP.js").then((e) => ({ default: e.ReaderAiPanel })));
function Al(e) {
  return "workspace";
}
function kl(e) {
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
function Nl(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function Ir(e, t) {
  var n, r, a, o;
  return e === "compare" ? null : Dr(t == null ? void 0 : t.assistantPanel) ? t.assistantPanel : ((n = t == null ? void 0 : t.splitLayout) == null ? void 0 : n.left) === "ai" || ((r = t == null ? void 0 : t.splitLayout) == null ? void 0 : r.right) === "ai" ? "ai" : ((a = t == null ? void 0 : t.splitLayout) == null ? void 0 : a.left) === "markdown" || ((o = t == null ? void 0 : t.splitLayout) == null ? void 0 : o.right) === "markdown" ? "markdown" : null;
}
function xl() {
  const e = Zs(), { boot: t, panes: n, sessionFiles: r, tools: a, session: o } = e, [s, l] = C(() => Ir(e.mode, Te(e.viewStateKey))), [c, i] = C(null), [d, u] = C(null), [f, m] = C(!1), v = x(e.viewStateKey), p = x(null), g = s !== null, y = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, w = kl({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: y,
    liveTranslationVisible: f,
    assistantOpen: g,
    assistantPdfPane: c
  }), S = w.sourceViewOnly, b = w.visibleMode, [P, N] = C(!1), M = k(() => N(!0), []), O = k(() => N((_) => !_), []), T = wl(
    { jobId: o.jobId, documentId: o.documentId },
    { onAfterAdd: M }
  ), E = k((_) => {
    T.addFromQuote(_), e.clearSelection();
  }, [T.addFromQuote, e.clearSelection]), R = k((_) => {
    e.goToPage(_.page, _.pane === "translated" ? "translated" : "source");
  }, [e.goToPage]), I = k(
    () => T.exportMarkdown(o.title || ""),
    [T.exportMarkdown, o.title]
  );
  $(() => {
    u(null), m(!0), N(!1);
  }, [e.viewStateKey]), $(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), $(() => {
    if (!t.loading) {
      if (v.current !== e.viewStateKey) {
        v.current = e.viewStateKey;
        const _ = Te(e.viewStateKey);
        l(Ir(e.mode, _)), i(null);
        return;
      }
      At(e.viewStateKey, { assistantPanel: s, splitLayout: null });
    }
  }, [s, t.loading, e.mode, e.viewStateKey]), $(() => {
    if (!(t.loading || t.failed)) {
      if (p.current !== e.viewStateKey) {
        p.current = e.viewStateKey;
        const _ = Te(e.viewStateKey), B = S ? "source" : _ == null ? void 0 : _.mode;
        B && B !== e.mode && e.setModeKeepingPage(B);
        return;
      }
      At(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, S]);
  const A = s || (e.mode === "compare" ? "compare" : "reading"), D = Tt(a.isOpen("favorites")), L = Tt(s === "markdown"), j = Tt(s === "ai");
  ni({
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
  const H = k(() => {
    a.close();
  }, [a]), q = k(() => {
    l(null), i(null), u(null);
  }, []), Q = k((_) => {
    const B = b === "translated" ? "translated" : "source";
    e.jumpToAnchor(_, B);
  }, [e.jumpToAnchor, b]), re = k((_) => {
    o.refreshCommittedDocument(_);
  }, [o.refreshCommittedDocument]), ne = k((_) => {
    a.close(), i(null);
    const B = Nl(_, e.liveTranslationAvailable);
    B !== null && m(B), e.setModeKeepingPage(_);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage, a]), se = K(() => !y || !w.showSource ? null : /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m((_) => !_),
      "aria-pressed": f,
      title: f ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ), [y, w.showSource, f]), U = k((_) => {
    l(_), _ !== "ai" && u(null);
  }, []), V = k((_) => {
    if (_ === "notes") {
      O();
      return;
    }
    if (_ === "markdown" || _ === "ai") {
      s === _ ? (l(null), i(null), u(null)) : (l(_), i(null), _ !== "ai" && u(null));
      return;
    }
    a.toggle(_);
  }, [s, O, a]), Z = is(s) ? null : s, X = P ? "notes" : Z ?? a.active, ce = K(() => ({
    jobId: o.jobId,
    sessionKey: o.jobId || o.documentId || "reader",
    onJump: Q,
    onClose: q
  }), [q, Q, o.documentId, o.jobId]), me = k((_) => {
    const B = _.pane === "translated" && !S ? "translated" : "source";
    u(_), l("ai"), i(B), e.clearSelection();
  }, [e.clearSelection, S]), fe = K(() => ({
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
    assistant: { select: U, close: q }
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
    U,
    q
  ]), he = K(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), Me = [
    qa,
    `is-workspace-${A}`,
    g ? "is-assistant-open" : "",
    w.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ h(zi, { value: fe, hud: he, children: /* @__PURE__ */ z("div", { className: Me, "data-reader-engine": "react-pdf", "data-reader-workspace": A, children: [
    /* @__PURE__ */ h(jc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ h(ci, { onBeforeClose: o.prepareClose }),
    /* @__PURE__ */ h(
      Hi,
      {
        mode: b,
        documentReady: !!o.jobId,
        sourceViewOnly: S,
        onModeChange: ne,
        liveTranslation: y ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m((_) => !_)
        } : null
      }
    ),
    /* @__PURE__ */ h(qi, { active: s }),
    g ? /* @__PURE__ */ h(Lc, {}) : null,
    e.showHud ? /* @__PURE__ */ h(ll, { activeTool: X, noteCount: T.count, onToggleTool: V }) : null,
    /* @__PURE__ */ h($i, { paneComposition: w, markdownSplit: s === "markdown", assistantSplit: g, liveTranslation: e.liveTranslation, sourcePaneAction: se }),
    e.showHud ? /* @__PURE__ */ h(
      dl,
      {
        mode: b,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ z(So, { fallback: null, children: [
      D ? /* @__PURE__ */ h(Tl, { open: a.isOpen("favorites"), jobId: o.jobId, documentId: o.documentId, onClose: H, onJumpPage: e.goToPage }) : null,
      Vr.map((_) => /* @__PURE__ */ h(
        Rl,
        {
          panel: _,
          active: s,
          context: ce
        },
        _.id
      )),
      L ? /* @__PURE__ */ h(El, { open: s === "markdown", jobId: o.jobId, sourceOnly: e.sourceOnly, layout: "workspace", side: "right", onClose: q }) : null,
      j ? /* @__PURE__ */ h(Ml, { open: s === "ai", jobId: o.jobId, documentId: o.documentId, sessionIdentity: o.sessionIdentity, layout: Al(e.mode), side: "right", selectionContext: d, onClearSelectionContext: () => u(null), onClose: q, onJumpCitation: Q, onDocumentCommitted: re }, o.documentId || o.jobId || "reader-ai-pending") : null
    ] }),
    /* @__PURE__ */ h(
      Fc,
      {
        open: P,
        groups: T.groups,
        count: T.count,
        onClose: () => N(!1),
        onJump: R,
        onUpdateNote: T.updateNote,
        onRemove: T.remove,
        onExport: I
      }
    ),
    /* @__PURE__ */ h(Bc, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: me, onAddNote: E }),
    /* @__PURE__ */ h(Il, {})
  ] }) });
}
function nd() {
  return /* @__PURE__ */ h(xl, {});
}
export {
  gn as A,
  nd as R,
  xl as a,
  ho as b,
  td as c,
  Vl as d,
  ql as e,
  ed as f,
  Yl as g,
  Gl as h,
  Zl as i,
  Ql as j,
  Xl as r
};
//# sourceMappingURL=ReaderApp-D-40qIYr.js.map
