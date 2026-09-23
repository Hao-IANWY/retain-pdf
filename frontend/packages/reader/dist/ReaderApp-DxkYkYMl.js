var jn = (e) => {
  throw TypeError(e);
};
var Un = (e, t, n) => t.has(e) || jn("Cannot " + n);
var rt = (e, t, n) => (Un(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Bn = (e, t, n) => t.has(e) ? jn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Hn = (e, t, n, r) => (Un(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as x, jsx as h, Fragment as vt } from "react/jsx-runtime";
import { useMemo as V, useState as L, useEffect as O, useCallback as A, useRef as C, useLayoutEffect as je, memo as dn, forwardRef as Lo, useImperativeHandle as un, createContext as fn, useContext as mn, useSyncExternalStore as Co, useId as hn, Suspense as _o, lazy as pn } from "react";
import { requireAdapter as we, getReaderAdapters as ce } from "./adapters.js";
import { resolveReaderDownloadName as Do, createReaderServerFavoritesPort as zo, resolveReaderDownloadUrls as Oo, READER_PROGRESS_COPY as Me, trimString as ft, READER_DOWNLOAD_ACTIONS as Fo, disabledReason as $o } from "./runtime/state.js";
import { d as jo } from "./ask-answerer-GNQdzitl.js";
import "@retainpdf/api/conversations";
import { r as Uo, b as Bo } from "./page-config-Ct7qR5rm.js";
import { c as Ho, n as Wo, f as kt, h as Wn, a as Jo, b as Ko, i as Cr, p as wt, g as _r, r as Dr, j as jt, e as qo } from "./reader-regions-DsePY7B_.js";
import { i as Vo, c as Go } from "./live-translation-CbniFg2b.js";
import { sortByPageAndCreatedAt as Yo, buildAnnotationsMarkdown as Zo, groupByPageAndCreatedAt as Xo } from "./runtime/content.js";
import { toast as Gt, Toaster as Qo } from "sonner";
import { X as et, Radio as ea, FileText as zr, Columns2 as Or, Languages as Fr, SquareTerminal as ta, PenTool as na, Route as ra, FileCode2 as $r, Sparkles as gn, GripHorizontal as oa, StickyNote as bn, Sigma as aa, Table2 as sa, Type as ia, Image as ca, Check as la, Copy as da, Keyboard as ua, Download as fa, Highlighter as jr, Bookmark as ma } from "lucide-react";
import { pdfjs as ha, Page as pa, Document as ga } from "react-pdf";
import { e as ba, m as ya, a as va } from "./markdown-math-XkF5urpn.js";
const wa = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, Sa = "", Ia = Object.freeze({
  progress: "retainpdf-reader-progress"
}), Pa = (e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, yd = (...e) => {
  var n;
  return (((n = ce()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, ke = () => we("defaultReaderDataPort"), Jn = () => we("defaultReaderPageConfigPort"), vd = {
  get apiPrefix() {
    return ke().apiPrefix;
  },
  fetchProtected: (...e) => ke().fetchProtected(...e),
  loadMarkdownPayload: (e) => ke().loadMarkdownPayload(e),
  loadMarkdownSource: (e) => ke().loadMarkdownSource(e),
  loadMarkdownRange: (e, t, n, r, a) => ke().loadMarkdownRange(e, t, n, r, a),
  loadJobPayload: (e) => ke().loadJobPayload(e),
  loadReaderPayload: (e, t) => ke().loadReaderPayload(e, t),
  loadAiNotes: (e) => ke().loadAiNotes(e),
  get liveTranslation() {
    return ke().liveTranslation;
  }
}, Ur = {
  messageTargetOrigin: () => Jn().messageTargetOrigin(),
  readerJobId: () => Jn().readerJobId()
}, Ra = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.liveTranslation) ?? null;
}, mt = () => {
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
}, wd = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.aiOperations) ?? null;
}, Sd = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.conversations) ?? null;
}, Id = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.askChat) ?? null;
}, Ta = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, Ea = () => {
  var e, t;
  return ((t = (e = ce()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, Ma = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, ka = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? Do(...e);
}, Aa = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? Oo(...e);
}, Na = (...e) => we("downloadProtectedResource")(...e), xa = (...e) => we("failDownloadToast")(...e), Pd = (e, t) => we("resolveMarkdownAssetUrl")(e, t), Rd = (e = {}) => {
  const t = ce();
  return jo({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) || "/api/v1",
    ask: t == null ? void 0 : t.askDocumentAi,
    documentByJobId: t == null ? void 0 : t.fetchDocumentByJobId,
    ...e
  });
}, vn = "/api/v1", Td = (e = vn, t = {}) => {
  var n;
  return we("fetchFavorites")(
    ((n = ce()) == null ? void 0 : n.apiPrefix) ?? e,
    t
  );
};
function Ed(e = {}) {
  const t = ce();
  return zo({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) ?? vn,
    documentByJobId: (...n) => we("fetchDocumentByJobId")(...n),
    submitFavorite: (...n) => we("createFavorite")(...n),
    loadFavorites: (...n) => we("fetchFavorites")(...n),
    removeFavorite: (...n) => we("deleteFavorite")(...n),
    ...e
  });
}
function La() {
  const e = () => {
    var r;
    return Uo(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = L(e);
  return O(() => {
    var c, l, i, d;
    const r = () => n(e()), a = (l = (c = globalThis.history) == null ? void 0 : c.pushState) == null ? void 0 : l.bind(globalThis.history), o = (d = (i = globalThis.history) == null ? void 0 : i.replaceState) == null ? void 0 : d.bind(globalThis.history);
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
function Ca() {
  const e = La(), t = V(() => Ma(Ur), [e]), n = V(() => Ea(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function _a(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: a,
    documentIdRef: o,
    sessionJobIdRef: s,
    switchToSourceMode: c
  } = e, [l, i] = L({
    documentId: "",
    jobId: ""
  }), [d, u] = L({
    documentId: "",
    jobId: ""
  }), f = l.documentId === t ? l.jobId : "", m = d.documentId === t ? d.jobId : "", v = n || f, [p, b] = L({
    jobId: "",
    documentId: ""
  }), y = p.jobId === v ? p.documentId : "", S = t || y, w = !!t && !v, [g, I] = L(null), k = (g == null ? void 0 : g.sessionIdentity) === r && g.documentId === S ? g : null, N = w || !!k, M = A((E) => {
    const R = `${E.documentId || ""}`.trim();
    if (!R || o.current && o.current !== R) return;
    if (!o.current && s.current)
      b({
        jobId: s.current,
        documentId: R
      });
    else if (!o.current)
      return;
    const P = `${E.revision || ""}`.trim() || `${Date.now()}`;
    I({
      documentId: R,
      revision: P,
      sessionIdentity: a.current
    }), c();
  }, []);
  O(() => {
    I((E) => E && E.sessionIdentity !== r ? null : E);
  }, [r]);
  const _ = A((E) => {
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
        b((R) => R.jobId === E.jobId && R.documentId === E.documentId ? R : { jobId: E.jobId, documentId: E.documentId });
        break;
      case "committed-source":
        I({
          documentId: E.documentId,
          revision: E.revision,
          sessionIdentity: E.sessionIdentity
        });
        break;
    }
  }, []);
  return {
    resolvedDocumentJob: l,
    setResolvedDocumentJob: i,
    missingDocumentJob: d,
    setMissingDocumentJob: u,
    documentJobId: f,
    rejectedDocumentJobId: m,
    sessionJobId: v,
    resolvedJobDocument: p,
    setResolvedJobDocument: b,
    jobDocumentId: y,
    documentId: S,
    sourceOnly: w,
    committedDocumentSource: g,
    setCommittedDocumentSource: I,
    activeCommittedDocumentSource: k,
    sourceViewOnly: N,
    refreshCommittedDocument: M,
    applyIdentityEvent: _
  };
}
const Da = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Kn(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function za(e) {
  var r, a, o, s;
  if (!e || typeof e != "object") return "";
  const t = e, n = [
    t.document_id,
    t.documentId,
    (r = t.document) == null ? void 0 : r.document_id,
    (a = t.book_summary) == null ? void 0 : a.document_id,
    (s = (o = t.request_payload) == null ? void 0 : o.source) == null ? void 0 : s.document_id
  ];
  for (const c of n) {
    const l = `${c || ""}`.trim();
    if (l) return l;
  }
  return "";
}
function qn(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return Pa(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function Oa(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function Fa(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const a of n) {
    const o = `${a || ""}`.trim();
    if (o && !Oa(o, t))
      return o.replace(/\.pdf$/i, "");
  }
  return "";
}
function Yt({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: Ia.progress,
        stage: n,
        percent: e,
        text: t
      },
      Ur.messageTargetOrigin()
    );
  } catch {
  }
}
function Lt(e, t, n, r = "progress") {
  e({
    loading: !0,
    percent: t,
    text: n,
    stage: r,
    failed: !1
  }), Yt({ percent: t, text: n, stage: r });
}
function $a(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: a,
    sessionEpochRef: o,
    closingRef: s
  } = e, [c, l] = L(null), [i, d] = L(null), [u, f] = L(""), [m, v] = L(0), p = u === n ? c : null, b = u === n ? i : null, y = Kn(p), S = Da.has(y), w = A(() => {
    v((_) => _ + 1);
  }, []), g = A((_) => {
    l(_.jobPayload), d(_.manifestPayload), f(_.sessionIdentity);
  }, []), I = A((_) => {
    l(null), d(null), f(_);
  }, []), k = C(""), N = C(""), M = A(async () => {
    const _ = a.current;
    if (!_ || k.current === _) return;
    const E = yn().loadJobPayload;
    if (typeof E != "function") return;
    const R = o.current.value;
    k.current = _;
    try {
      const P = await E(_);
      if (s.current || o.current.value !== R || a.current !== _ || !P || typeof P != "object")
        return;
      const T = Kn(P);
      l(P), f(r.current), T === "succeeded" && N.current !== _ && (N.current = _, v((D) => D + 1));
    } catch {
    } finally {
      k.current === _ && (k.current = "");
    }
  }, []);
  return O(() => {
    N.current = "";
  }, [n]), O(() => {
    if (!t || S || !p) return;
    const _ = window.setInterval(() => {
      M();
    }, 1e3);
    return () => window.clearInterval(_);
  }, [S, M, p, t]), {
    jobPayload: c,
    setJobPayload: l,
    manifestPayload: i,
    setManifestPayload: d,
    payloadSessionIdentity: u,
    setPayloadSessionIdentity: f,
    scopedJobPayload: p,
    scopedManifestPayload: b,
    jobStatus: y,
    jobTerminal: S,
    jobRefreshRevision: m,
    refreshJobArtifacts: w,
    refreshJobStatus: M,
    publishPayload: g,
    clearPayload: I
  };
}
function Zt(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function ja(e, t) {
  e(t), Zt(t);
}
function Ua(e) {
  const [t, n] = L(e ? "source" : "compare"), r = A((o) => {
    e && o !== "source" || (n(o), Zt(o));
  }, [e]), a = A((o) => {
    ja(n, o);
  }, []);
  return O(() => (e && document.documentElement.classList.add("reader-source-only"), Zt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: a };
}
function Vn(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function Ba(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: Vn(n.active_job_id),
    activeVersionId: Vn(n.active_version_id)
  };
}
function Ha(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, a = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return a ? { kind: "follow-active-job", jobId: a, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function Wa(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: a,
    hasCommittedSource: o
  } = e;
  return t && r && n === a && !o ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function Ja(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function Ka(e) {
  return e ? { data: e.data.slice() } : null;
}
const qa = 2, Se = /* @__PURE__ */ new Map();
function Xt(e, t) {
  Se.delete(e), Se.set(e, t);
}
function Va(e) {
  if (Se.size < qa) return;
  const t = Se.keys().next().value;
  t && Se.delete(t);
}
function Ut(e) {
  const t = `${e || ""}`.trim();
  if (!t || !Se.has(t)) return null;
  const n = Se.get(t);
  return Xt(t, n), n;
}
async function Br(e, t = mt().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (Se.has(r)) {
    const c = Se.get(r);
    return Xt(r, c), c;
  }
  const a = await t(r, { signal: n.signal });
  if (!a.ok) {
    const c = new Error(`读取 PDF 失败 (${a.status})`);
    throw c.status = a.status, c;
  }
  const o = await a.arrayBuffer(), s = { data: new Uint8Array(o) };
  return Se.has(r) ? Xt(r, s) : (Va(), Se.set(r, s)), s;
}
function Ga(e = "", t = null) {
  const [n, r] = L(
    () => t || Ut(e)
  ), [a, o] = L(
    () => !!`${e || ""}`.trim() && !t && !Ut(e)
  ), [s, c] = L("");
  return O(() => {
    if (t) {
      r(t), o(!1), c("");
      return;
    }
    const l = `${e || ""}`.trim();
    if (!l) {
      r(null), o(!1), c("");
      return;
    }
    const i = Ut(l);
    if (i) {
      r(i), o(!1), c("");
      return;
    }
    let d = !1;
    return o(!0), c(""), r(null), Br(l).then((u) => {
      d || (r(u), o(!1));
    }).catch((u) => {
      d || (r(null), o(!1), c((u == null ? void 0 : u.message) || String(u)));
    }), () => {
      d = !0;
    };
  }, [e, t]), { file: n, loading: a, error: s };
}
function Ya(e) {
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
async function Qt(e) {
  const { url: t, label: n, percentStart: r, percentEnd: a, fence: o, setBoot: s } = e;
  if (!t || o.isInactive())
    return null;
  Lt(s, r, n, "download");
  const c = await Br(t, mt().fetchProtected, {
    signal: o.signal
  });
  return o.isInactive() ? null : (Lt(s, a, n, "download"), c);
}
async function Za(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: a } = e;
  Lt(a, 25, "正在下载 PDF…", "download");
  const o = [];
  let s = null, c = null;
  return t && o.push(
    Qt({
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
    Qt({
      url: n,
      label: "正在下载译文 PDF…",
      percentStart: 55,
      percentEnd: 85,
      fence: r,
      setBoot: a
    }).then((d) => {
      c = d;
    })
  ), await Promise.all(o), r.isInactive() ? { status: "inactive" } : !!t && !s || !!n && !c ? { status: "incomplete" } : { status: "downloaded", sourceBytes: s, translatedBytes: c };
}
const Rt = {
  regions: null,
  metadata: null
};
function Xa(e) {
  const {
    sessionJobId: t,
    jobId: n,
    routeDocumentId: r,
    documentJobId: a,
    rejectedDocumentJobId: o,
    sourceOnly: s,
    locationKey: c,
    sessionIdentity: l,
    committedSource: i,
    applyIdentityEvent: d,
    publishPayload: u,
    clearPayload: f,
    switchSessionMode: m,
    jobRefreshRevision: v,
    sessionEpochRef: p,
    closingRef: b,
    activeLoadAbortRef: y
  } = e, [S, w] = L(""), [g, I] = L(""), [k, N] = L(null), [M, _] = L(null), [E, R] = L(!1), [P, T] = L(""), [D, F] = L([]), [U, Z] = L(() => ({
    source: null,
    translated: null
  })), [B, K] = L(
    Rt
  ), [W, G] = L({
    loading: !0,
    percent: 4,
    text: Me.boot,
    stage: "progress",
    failed: !1
  });
  return O(() => {
    const ae = new AbortController(), j = p.current.value, q = Ya({
      sessionEpochRef: p,
      closingRef: b,
      abort: ae,
      sessionEpoch: j
    });
    y.current = ae;
    const Q = yn();
    if (b.current)
      return ae.abort(), () => {
        y.current === ae && (y.current = null);
      };
    function ne(ee, te) {
      q.markFailed(), G({
        loading: !1,
        percent: 100,
        text: ee,
        stage: "failed",
        failed: !0
      }), Yt({ percent: 100, text: te, stage: "failed" });
    }
    function he() {
      R(!0), G({
        loading: !1,
        percent: 100,
        text: Me.ready,
        stage: "ready",
        failed: !1
      }), Yt({ percent: 100, text: Me.ready, stage: "ready" });
    }
    function ye() {
      return i != null && i.documentId ? qn(
        i.documentId,
        i.revision
      ) : wa() ? Sa : Q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function de() {
      let ee = { activeJobId: "", activeVersionId: "" };
      try {
        const ue = await Q.fetchProtected(
          Q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (ue != null && ue.ok) {
          const Ie = await ue.json().catch(() => null);
          ee = Ba(Ie);
        }
      } catch {
      }
      const te = Ha({
        link: ee,
        rejectedDocumentJobId: o,
        hasCommittedSource: !!i
      });
      if (te.kind === "follow-active-job") {
        if (q.isInactive()) return;
        d({
          type: "resolved-document-job",
          documentId: r,
          jobId: te.jobId
        }), te.activeVersionId ? (i || d({
          type: "committed-source",
          documentId: r,
          revision: te.activeVersionId,
          sessionIdentity: l
        }), m("source")) : m("compare");
        return;
      }
      if (te.kind === "open-committed-source") {
        if (q.isInactive()) return;
        d({
          type: "committed-source",
          documentId: r,
          revision: te.revision,
          sessionIdentity: l
        }), m("source");
        return;
      }
      const se = ye();
      if (q.isInactive()) return;
      w(se), I(""), T(""), f(l);
      const be = await Qt({
        url: se,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: q,
        setBoot: G
      });
      if (!q.isInactive()) {
        if (!be) {
          ne("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        N(be), he();
      }
    }
    async function fe() {
      var Le;
      const ee = await ((Le = Q.loadSessionSnapshot) == null ? void 0 : Le.call(Q, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: i,
        includeOptionalArtifacts: !i
      })), te = ee ? {
        jobPayload: ee.sourcePayload,
        manifestPayload: ee.manifestPayload,
        readerMetadata: ee.readerMetadata,
        regionsPayload: ee.regions,
        readerErrors: ee.readerErrors
      } : await Q.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !i
      });
      if (q.isInactive()) return;
      let se = null;
      if (n && !r) {
        try {
          se = await Q.fetchDocumentByJobId(vn, t);
        } catch {
        }
        if (q.isInactive()) return;
      }
      const be = za(te.jobPayload) || `${(se == null ? void 0 : se.document_id) || ""}`.trim();
      be && !r && d({
        type: "resolved-job-document",
        jobId: t,
        documentId: be
      });
      const ue = Wa({
        payloadDocumentId: be,
        linkedActiveJobId: `${(se == null ? void 0 : se.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(se == null ? void 0 : se.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!i
      });
      if (ue.kind === "restore-committed-source") {
        if (q.isInactive()) return;
        d({
          type: "committed-source",
          documentId: ue.documentId,
          revision: ue.revision,
          sessionIdentity: l
        }), m("source");
        return;
      }
      const Ie = Q.resolveReaderSourcePdf(te.manifestPayload), tt = Q.resolveReaderTranslatedPdfUrl(te.jobPayload, te.manifestPayload), $ = typeof Ie == "string" ? Ie : Q.resolveReaderArtifactUrl(Ie), le = r || be, Pe = i != null && i.documentId ? qn(
        i.documentId,
        i.revision
      ) : $ || (le ? Q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(le)}/source.pdf`) : ""), nt = i ? "" : tt || "";
      if (w(Pe || ""), I(nt), T(Fa(te.jobPayload, t)), u({
        jobPayload: te.jobPayload || null,
        manifestPayload: te.manifestPayload || null,
        sessionIdentity: l
      }), F(i ? [] : Ho(te.regionsPayload)), Z(i ? { source: null, translated: null } : Wo(te.readerMetadata)), K(i ? Rt : te.readerErrors ?? Rt), !Pe && !nt) {
        ne(Me.failed, Me.failed);
        return;
      }
      const He = await Za({
        sourceFinal: Pe || "",
        translatedFinal: nt,
        fence: q,
        setBoot: G
      });
      if (He.status !== "inactive") {
        if (He.status === "incomplete") {
          ne("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        N(He.sourceBytes), _(He.translatedBytes), he();
      }
    }
    async function Ee() {
      R(!1), N(null), _(null), F([]), Z({ source: null, translated: null }), K(Rt), Lt(G, 8, Me.metadata, "metadata");
      try {
        if (s) {
          await de();
          return;
        }
        if (!t) {
          ne(Me.failed, Me.failed);
          return;
        }
        await fe();
      } catch (ee) {
        if (q.isClosedOrStale() || (ee == null ? void 0 : ee.name) === "AbortError") return;
        q.markFailed();
        const te = Number(ee == null ? void 0 : ee.status);
        if (Ja({
          status: te,
          jobId: n,
          routeDocumentId: r,
          documentJobId: a,
          sessionJobId: t
        })) {
          d({ type: "missing-document-job", documentId: r, jobId: t }), d({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const se = ee instanceof Error ? ee.message : Me.failed;
        ne(se, se);
      }
    }
    return Ee(), () => {
      ae.abort(), y.current === ae && (y.current = null);
    };
  }, [t, r, a, o, s, c, i, v, n, l, d, u, f, m]), {
    sourceUrl: S,
    translatedUrl: g,
    sourceFile: k,
    translatedFile: M,
    assetsReady: E,
    title: P,
    regions: D,
    readerMetadata: U,
    readerErrors: B,
    boot: W
  };
}
function Qa() {
  const e = C(!1), t = C(null), { locationKey: n, jobId: r, routeDocumentId: a, sessionIdentity: o } = Ca(), s = C({ identity: "", value: 0 });
  s.current.identity !== o && (s.current = {
    identity: o,
    value: s.current.value + 1
  }, e.current = !1);
  const c = C(o), l = C(""), i = C(""), d = C(() => {
  }), u = A(() => d.current(), []), f = _a({
    routeDocumentId: a,
    jobId: r,
    sessionIdentity: o,
    sessionIdentityRef: c,
    documentIdRef: l,
    sessionJobIdRef: i,
    switchToSourceMode: u
  }), {
    sessionJobId: m,
    documentId: v,
    sourceOnly: p,
    sourceViewOnly: b
  } = f, { mode: y, setMode: S, switchSessionMode: w } = Ua(b);
  d.current = () => {
    w("source");
  }, c.current = o, l.current = v, i.current = m;
  const g = $a({
    sessionJobId: m,
    sessionIdentity: o,
    sessionIdentityRef: c,
    sessionJobIdRef: i,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: I,
    scopedManifestPayload: k,
    jobStatus: N,
    jobTerminal: M,
    jobRefreshRevision: _,
    refreshJobArtifacts: E,
    refreshJobStatus: R
  } = g, P = Xa({
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
    publishPayload: g.publishPayload,
    clearPayload: g.clearPayload,
    switchSessionMode: w,
    jobRefreshRevision: _,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), T = A(() => {
    var F;
    e.current = !0, (F = t.current) == null || F.abort();
  }, []), D = V(
    () => ({
      fetchProtected: yn().fetchProtected,
      jobId: m,
      jobPayload: I,
      manifestPayload: k,
      sourceUrl: P.sourceUrl,
      translatedUrl: P.translatedUrl,
      sourceOnly: b
    }),
    [m, I, k, P.sourceUrl, P.translatedUrl, b]
  );
  return {
    jobId: m,
    jobStatus: N,
    workflow: `${(I == null ? void 0 : I.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: M,
    documentId: v,
    sessionIdentity: o,
    sourceOnly: p,
    mode: y,
    setMode: S,
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
    download: D,
    refreshJobArtifacts: E,
    refreshJobStatus: R,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: T
  };
}
const es = 160, ts = 8, ns = 960;
function rs() {
  const e = C(null), [t, n] = L(null), [r, a] = L(ns), o = A((s) => {
    e.current = s, n(s);
  }, []);
  return O(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const c = (i) => {
      !Number.isFinite(i) || i < es || a((d) => Math.abs(d - i) < ts ? d : i);
    }, l = new ResizeObserver((i) => {
      var d, u;
      c(((u = (d = i[0]) == null ? void 0 : d.contentRect) == null ? void 0 : u.width) ?? s.clientWidth);
    });
    return l.observe(s), c(s.clientWidth), () => l.disconnect();
  }, [t]), {
    shellRef: e,
    shellEl: t,
    shellWidth: r,
    bindShell: o
  };
}
function os(e) {
  const { mode: t, sourceOnly: n, assetsReady: r, hasSource: a, hasTranslated: o } = e, s = r && a, c = r && o && !n, l = t === "source" || t === "compare", i = !n && (t === "translated" || t === "compare");
  return {
    mountSource: s,
    mountTranslated: c,
    showSource: l,
    showTranslated: i,
    compareMode: t === "compare" && l && i && s && c,
    primaryPane: t === "translated" ? "translated" : "source"
  };
}
const Bt = { source: 0, translated: 0 };
function as(e, t) {
  const {
    mode: n,
    sourceOnly: r,
    assetsReady: a,
    sourceUrl: o,
    translatedUrl: s,
    sourceFile: c,
    translatedFile: l
  } = e, i = `${(t == null ? void 0 : t.identityKey) || ""}\0${o}\0${s}`, d = C(i);
  d.current = i;
  const [u, f] = L(() => ({
    identity: i,
    pages: Bt
  })), [m, v] = L(() => ({ identity: i, tick: 0 })), p = u.identity === i ? u.pages : Bt, b = m.identity === i ? m.tick : 0, y = os({
    mode: n,
    sourceOnly: r,
    assetsReady: a,
    hasSource: !!c || !!o,
    hasTranslated: !!l
  }), { primaryPane: S } = y, w = A((R, P) => {
    d.current === i && f((T) => {
      const D = T.identity === i ? T.pages : Bt;
      return D[P] === R && T.identity === i ? T : {
        identity: i,
        pages: { ...D, [P]: R }
      };
    });
  }, [i]), g = C(null), I = A(() => {
    g.current && clearTimeout(g.current);
    const R = i;
    g.current = setTimeout(() => {
      g.current = null, d.current === R && v((P) => ({
        identity: R,
        tick: P.identity === R ? P.tick + 1 : 1
      }));
    }, 60);
  }, [i]);
  O(() => (g.current && (clearTimeout(g.current), g.current = null), f((R) => R.identity === i && R.pages.source === 0 && R.pages.translated === 0 ? R : { identity: i, pages: { source: 0, translated: 0 } }), v((R) => R.identity === i && R.tick === 0 ? R : { identity: i, tick: 0 }), () => {
    g.current && (clearTimeout(g.current), g.current = null);
  }), [i]);
  const k = V(
    () => Math.max(p.source, p.translated),
    [p]
  ), N = S === "translated" ? p.translated : p.source || p.translated, M = t == null ? void 0 : t.userZoom, _ = t == null ? void 0 : t.shellWidth, E = `${i}-${b}-${M}-${n}-${p.source}-${p.translated}-${_}`;
  return {
    ...y,
    numPagesByPane: p,
    hudNumPages: k,
    primaryNumPages: N,
    metricsTick: b,
    onNumPages: w,
    onMetrics: I,
    rowSyncRevision: E
  };
}
const Ze = "data-reader-page", Xe = "data-reader-pane", wn = "data-natural-height", ss = "reader-react-root", is = "reader-react-grid", cs = "reader-react-scroll-shell", ls = "reader-react-pdf-pane", Hr = "reader-react-pdf-page", Ct = "reader-react-pdf-page-placeholder", Sn = "reader-react-pdf-page-slot";
function ht(e, t) {
  const n = e != null ? `[${Ze}="${e}"]` : `[${Ze}]`;
  return t ? `${n}[${Xe}="${t}"]` : n;
}
function ds() {
  return `.${Sn}[${Ze}]`;
}
function Ft(e) {
  return Number(e.getAttribute(Ze));
}
const Wr = 0.25, Jr = 1, us = 0.05, St = 0.5, fs = 16, ms = 8;
function lt(e) {
  return St;
}
function $t(e) {
  return Number.isFinite(e) ? Math.min(Jr, Math.max(Wr, e)) : St;
}
function pt(e, t) {
  const n = $t(Number(e) + t * us);
  return Math.round(n * 100) / 100;
}
function hs(e) {
  return Math.round($t(e) * 100);
}
function ps(e) {
  const n = (Number(e) || 0) - fs - ms;
  return Math.max(160, Math.floor(n));
}
function gs(e, t = St) {
  const n = $t(t);
  return ps((Number(e) || 0) * n);
}
function bs(e, t) {
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
    for (const { pane: s, cx: c, hadOverflow: l } of a) {
      const i = Math.max(0, s.scrollWidth - s.clientWidth);
      if (i <= 0) {
        s.scrollLeft = 0;
        continue;
      }
      l ? s.scrollLeft = Math.min(
        i,
        Math.max(0, c * t - s.clientWidth / 2)
      ) : s.scrollLeft = i / 2;
    }
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(o);
  });
}
const ys = ["markdown", "ai"], In = [
  "reading-path",
  "reading-canvas",
  "terminal"
], vs = [
  ...ys,
  ...In
];
function Kr(e) {
  return vs.includes(e);
}
function ws(e) {
  return In.includes(e);
}
const Ss = "retainpdf:reader:view:v1:", Gn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), Is = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function qr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function en(e) {
  return `${e || ""}`.trim();
}
function Ps({
  documentId: e,
  jobId: t
}) {
  const n = en(e);
  if (n) return `document:${n}`;
  const r = en(t);
  return r ? `job:${r}` : "";
}
function Vr(e) {
  const t = en(e);
  return t ? `${Ss}${t}` : "";
}
function Rs(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function Ts(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!Gn.has(t) || !Gn.has(n) || t === n))
    return { left: t, right: n };
}
function Es(e) {
  return e === null ? null : Kr(e) ? e : void 0;
}
function Ms(e) {
  return Is.has(e) ? e : void 0;
}
function Gr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = Rs(t.anchor), r = Number(t.zoom), a = Ms(t.mode), o = Ts(t.splitLayout), s = Es(t.assistantPanel);
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
function Ne(e, t = qr()) {
  const n = Vr(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Gr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function _t(e, t, n = qr()) {
  const r = Vr(e);
  if (!r || !n) return null;
  const a = Ne(e, n), o = Gr({
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
function ks(e, t, n = "") {
  const [r, a] = L(() => {
    var u;
    return ((u = Ne(n)) == null ? void 0 : u.zoom) ?? lt();
  }), o = C(r), s = C(n);
  o.current = r;
  const c = C(1);
  O(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const u = ((f = Ne(n)) == null ? void 0 : f.zoom) ?? lt();
    c.current = 1, o.current = u, a(u);
  }, [e, n]);
  const l = A((u) => {
    const f = $t(u), m = o.current;
    Math.abs(f - m) < 5e-4 || (c.current = f / (m || 1), _t(s.current, { zoom: f }), a(f));
  }, []), i = A((u) => {
    l(pt(o.current, u));
  }, [l]), d = A((u) => {
    l(lt());
  }, [l]);
  return je(() => {
    const u = c.current;
    Math.abs(u - 1) < 1e-3 || (c.current = 1, bs(t == null ? void 0 : t.current, u));
  }, [r, t]), { userZoom: r, onZoomChange: l, stepZoom: i, resetZoom: d };
}
function As(e, t = !0) {
  const [n, r] = L(null), a = A(() => {
    var c, l;
    r(null);
    const s = (c = globalThis.getSelection) == null ? void 0 : c.call(globalThis);
    (l = s == null ? void 0 : s.removeAllRanges) == null || l.call(s);
  }, []), o = e.current ?? null;
  return O(() => {
    if (!t)
      return;
    const s = () => {
      var F, U;
      const p = e.current, b = (F = globalThis.getSelection) == null ? void 0 : F.call(globalThis);
      if (!p || !b || b.isCollapsed || !b.rangeCount) {
        r(null);
        return;
      }
      const y = b.getRangeAt(0);
      if (!p.contains(y.commonAncestorContainer)) {
        r(null);
        return;
      }
      const S = `${b.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (S.length < 2) {
        r(null);
        return;
      }
      let w = y.commonAncestorContainer;
      w.nodeType === Node.TEXT_NODE && (w = w.parentElement);
      const g = (U = w == null ? void 0 : w.closest) == null ? void 0 : U.call(
        w,
        ht()
      );
      if (!g || !p.contains(g)) {
        r(null);
        return;
      }
      const I = Math.max(1, Math.floor(Ft(g) || 1)), N = g.getAttribute(Xe) === "translated" ? "translated" : "source", M = y.getClientRects(), _ = M[M.length - 1] || y.getBoundingClientRect();
      if (!_ || _.width === 0 && _.height === 0) {
        r(null);
        return;
      }
      const E = typeof window < "u" ? window.innerWidth : 800, R = typeof window < "u" ? window.innerHeight : 600, P = 16, T = Math.min(Math.max(P, _.left), E - P), D = Math.min(Math.max(P, _.top), R - P);
      r({
        selectionType: "text",
        quote: S,
        page: I,
        pane: N,
        rect: {
          left: T,
          top: D,
          width: _.width,
          height: _.height
        }
      });
    }, c = () => {
      window.setTimeout(s, 0);
    }, l = () => {
      c();
    }, i = () => c(), d = () => c(), u = () => {
      c();
    }, f = (p) => {
      p.key === "Escape" && a();
    }, m = () => {
      r((p) => p && null);
    };
    document.addEventListener("mouseup", l), document.addEventListener("pointerup", i), document.addEventListener("touchend", d), document.addEventListener("selectionchange", u), document.addEventListener("keyup", f);
    const v = o ?? e.current;
    return v == null || v.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", l), document.removeEventListener("pointerup", i), document.removeEventListener("touchend", d), document.removeEventListener("selectionchange", u), document.removeEventListener("keyup", f), v == null || v.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, o, a]), { selection: n, clearSelection: a };
}
function Ns(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, a = C(t), o = C(n), s = C(r);
  return a.current = t, o.current = n, s.current = r, { setModeKeepingPage: A((l) => {
    l !== a.current && (s.current(), o.current(l));
  }, []) };
}
function xs() {
  const [e, t] = L(null), n = A((s) => {
    t(s);
  }, []), r = A((s = null) => {
    t((c) => !s || c === s ? null : c);
  }, []), a = A((s) => {
    t((c) => c === s ? null : s);
  }, []), o = A(
    (s) => e === s,
    [e]
  );
  return { active: e, open: n, close: r, toggle: a, isOpen: o };
}
const Pn = 48;
function Yr(e, t = Pn) {
  return e.getBoundingClientRect().top + t;
}
function Zr(e, t) {
  if (!e.length)
    return null;
  let n = null, r = -1 / 0;
  for (const l of e) {
    const i = l.getBoundingClientRect();
    i.height < 8 || i.width < 8 || i.top <= t + 1 && i.top >= r && (n = l, r = i.top);
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
  const a = Ft(n);
  if (!Number.isFinite(a) || a < 1)
    return null;
  const o = n.getBoundingClientRect(), s = o.height > 0 ? o.height : 1, c = Math.min(1, Math.max(0, (t - o.top) / s));
  return { el: n, page: a, fraction: c };
}
function Ht(e, t, n = Pn) {
  if (!e)
    return null;
  const r = ht(void 0, t), a = Array.from(e.querySelectorAll(r));
  if (!a.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Yr(e, n), c = Zr(a, s);
  return c ? { page: c.page, fraction: c.fraction } : null;
}
function Rn(e, t, n = "auto", r, a = Pn) {
  if (!e || !t)
    return !1;
  const o = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let c = null;
  if (r && (c = e.querySelector(ht(o, r))), c || (c = e.querySelector(ht(o))), !c)
    return !1;
  const l = e.getBoundingClientRect(), i = c.getBoundingClientRect();
  if (l.height <= 0 || i.height < 8 && c.offsetHeight < 8)
    return !1;
  const d = i.height > 0 ? i.height : c.offsetHeight, u = e.scrollTop + (i.top - l.top), f = Math.max(0, u + s * d - a);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function Ls(e, t, n = "smooth", r) {
  return Rn(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function tn(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", a = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let o = !1, s = !1;
  const c = [], l = () => {
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
      requestAnimationFrame(l);
    }) : c.push(setTimeout(l, i));
  return () => {
    o = !0;
    for (const i of c)
      clearTimeout(i);
  };
}
function Cs(e, t, n) {
  return tn(
    e,
    { page: t, fraction: 0 },
    n
  );
}
function Dt(e, t) {
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
function _s(e, t, n = !0, r = "", a) {
  const [o, s] = L(1);
  return O(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const c = e.current;
    if (!c)
      return;
    let l = !1, i = null, d = 0;
    const u = ht(void 0, a), f = () => {
      if (l) return;
      const p = Array.from(c.querySelectorAll(u));
      if (!p.length)
        return;
      const b = Yr(c), y = Zr(p, b);
      y && s(y.page);
    }, m = () => {
      l || (d && cancelAnimationFrame(d), d = requestAnimationFrame(() => {
        d = 0, f();
      }));
    }, v = () => {
      if (l) return;
      if (!Array.from(c.querySelectorAll(u)).length) {
        i = setTimeout(v, 120);
        return;
      }
      f(), c.addEventListener("scroll", m, { passive: !0 });
    };
    return v(), () => {
      l = !0, i && clearTimeout(i), d && cancelAnimationFrame(d), c.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, a]), o;
}
const Ds = `canvas, .react-pdf__Page, .${Hr}, .${Ct}`, Yn = /* @__PURE__ */ new WeakMap();
function zs(e) {
  const t = Number(e.getAttribute(wn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Yn.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(Ds), Yn.set(e, n)), n) {
    const a = n.getBoundingClientRect().height;
    if (Number.isFinite(a) && a > 0)
      return a;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function Os(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function Fs(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(ds()).forEach((r) => {
    const a = Ft(r);
    if (!Number.isFinite(a) || a < 1) return;
    const o = zs(r);
    if (o <= 0) return;
    const s = t.get(a) || { height: 0, count: 0 };
    s.height = Math.max(s.height, o), s.count += 1, t.set(a, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, a) => {
    r.count >= 2 && r.height > 0 && n.set(a, Math.ceil(r.height));
  }), n;
}
function $s(e, t, n = "", r) {
  const [a, o] = L(() => /* @__PURE__ */ new Map()), s = C(a), c = C(r);
  return c.current = r, je(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), o(s.current));
      return;
    }
    let l = !1, i = 0, d = !1, u = !1;
    const f = () => {
      var I;
      if (l) return;
      const w = e.current;
      if (!w) return;
      const g = Fs(w);
      Os(s.current, g) || (s.current = g, o(g)), d && !u && (u = !0, (I = c.current) == null || I.call(c));
    }, m = () => {
      cancelAnimationFrame(i), i = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const v = window.setTimeout(m, 100), p = window.setTimeout(() => {
      d = !0, m();
    }, 300), b = window.setTimeout(m, 700), y = e.current;
    let S = null;
    return y && typeof ResizeObserver < "u" && (S = new ResizeObserver(() => m()), S.observe(y)), () => {
      l = !0, cancelAnimationFrame(i), window.clearTimeout(v), window.clearTimeout(p), window.clearTimeout(b), S == null || S.disconnect();
    };
  }, [e, t, n]), a;
}
const js = [0, 48, 140, 320, 560], Us = 700, Bs = [80, 200, 400], Hs = 500, Ws = 50, Js = 180, Zn = [0, 48, 140, 320, 700, 1200];
function Ks(e, t) {
  var R;
  const {
    primaryPane: n,
    mode: r,
    enabled: a = !0,
    persistenceKey: o = "",
    restoreReady: s = !0
  } = t, c = C(
    ((R = Ne(o)) == null ? void 0 : R.anchor) || { page: 1, fraction: 0 }
  ), l = C(null), i = C(!1), d = C(r), u = C(null), f = C(null), m = C(null), v = C(null), p = C(o), b = C(""), y = C(n);
  y.current = n;
  const S = A(() => {
    var P;
    (P = u.current) == null || P.call(u), u.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), w = A((P = !1) => {
    v.current != null && (clearTimeout(v.current), v.current = null);
    const T = () => {
      v.current = null, _t(p.current, {
        anchor: ve(c.current)
      });
    };
    P ? T() : v.current = setTimeout(T, Js);
  }, []), g = A((P) => {
    c.current = ve(P), l.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, i.current = !1;
    }, Ws);
  }, []);
  O(() => {
    if (!a)
      return;
    let P = !1, T = null, D = null, F = null;
    const U = () => {
      if (P) return;
      const Z = e.current;
      if (!Z) {
        F = setTimeout(U, 50);
        return;
      }
      T = Z, D = () => {
        if (i.current)
          return;
        const B = Ht(T, y.current);
        B && (c.current = B, w());
      }, T.addEventListener("scroll", D, { passive: !0 }), i.current || D();
    };
    return U(), () => {
      P = !0, F != null && clearTimeout(F), T && D && T.removeEventListener("scroll", D);
    };
  }, [a, r, n, e, w]), je(() => {
    var T;
    if (p.current === o) return;
    w(!0), S(), m.current != null && (clearTimeout(m.current), m.current = null), p.current = o, b.current = "";
    const P = (T = Ne(o)) == null ? void 0 : T.anchor;
    c.current = P ? ve(P) : { page: 1, fraction: 0 }, l.current = null, i.current = !!o, d.current = r;
  }, [o, r, w, S]), O(() => {
    var T;
    if (!a || !s || !o || b.current === o) return;
    b.current = o;
    const P = ve(
      ((T = Ne(o)) == null ? void 0 : T.anchor) || { page: 1, fraction: 0 }
    );
    return c.current = P, l.current = P, i.current = !0, S(), u.current = tn(
      () => e.current,
      P,
      {
        behavior: "auto",
        pane: y.current,
        delaysMs: Zn,
        onDone: () => g(P)
      }
    ), f.current = setTimeout(() => {
      f.current = null, g(P);
    }, Math.max(...Zn) + 160), () => S();
  }, [a, s, o, e, g, S]), O(() => {
    if (d.current === r)
      return;
    if (d.current = r, !a) {
      i.current = !1, l.current = null, S();
      return;
    }
    const P = l.current ? ve(l.current) : ve(c.current);
    return i.current = !0, l.current = P, c.current = P, S(), u.current = tn(
      () => e.current,
      P,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: js,
        onDone: () => g(P)
      }
    ), f.current = setTimeout(() => {
      f.current = null, g(P);
    }, Us), () => {
      S();
    };
  }, [r, a, n, e, g, S]), O(() => () => {
    S(), m.current != null && (clearTimeout(m.current), m.current = null), w(!0);
  }, [S, w]);
  const I = A(() => {
    const P = Ht(
      e.current,
      y.current
    );
    return ve(P || c.current);
  }, [e]), k = A(() => {
    i.current = !0;
    const P = Ht(
      e.current,
      y.current
    ), T = ve(P ?? c.current);
    return c.current = T, l.current = T, w(), T;
  }, [e, w]), N = A((P, T, D) => {
    const F = D || y.current, U = Dt(P, T || 1), Z = { page: U, fraction: 0 };
    c.current = Z, i.current = !0, l.current = Z, w(), S(), Ls(e.current, U, "smooth", F), u.current = Cs(
      () => e.current,
      U,
      {
        behavior: "auto",
        pane: F,
        delaysMs: Bs,
        onDone: () => g(Z)
      }
    ), f.current = setTimeout(() => {
      f.current = null, g(Z);
    }, Hs);
  }, [e, g, S, w]), M = A(() => ve(c.current), []), _ = A(() => i.current, []), E = A(() => {
    if (!i.current || !l.current)
      return;
    const P = ve(l.current);
    Rn(
      e.current,
      P,
      "auto",
      y.current
    );
  }, [e]);
  return {
    lockFromShell: I,
    beginModeSwitch: k,
    goToPage: N,
    getAnchor: M,
    isRestoring: _,
    repinIfRestoring: E
  };
}
function qs(e, t) {
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
function Xr(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), a = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), o = `j:${r}:d:${a}`;
  return t == null ? `${o}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${o}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const Vs = [0, 80, 200, 400, 800], Gs = 120, Ys = 400;
function Zs(e, t, n) {
  const { enabled: r, numPages: a, goToPage: o, resolveBlockPage: s, onAnchorApplied: c, jobId: l, documentId: i } = e, d = C(o);
  d.current = o;
  const u = C(s);
  u.current = s;
  const f = C(c);
  f.current = c;
  const m = C(n);
  m.current = n, O(() => {
    var w, g;
    if (!r || !Number.isFinite(a) || a < 1)
      return;
    const v = Ta(), p = qs(v, u.current), b = Xr(v, p, { jobId: l, documentId: i });
    if (t.current === b)
      return;
    if (p == null) {
      t.current = b, (w = m.current) == null || w.call(m);
      return;
    }
    t.current = b, v && ((g = f.current) == null || g.call(f, v, p));
    const y = [];
    let S = 0;
    for (const I of Vs)
      S = Math.max(S, I), y.push(
        setTimeout(() => {
          d.current(p);
        }, I)
      );
    return y.push(
      setTimeout(() => {
        var I;
        (I = m.current) == null || I.call(m);
      }, S + Gs)
    ), () => {
      for (const I of y) clearTimeout(I);
    };
  }, [r, a, l, i, t]);
}
function Xs(e) {
  var o;
  const t = globalThis.window;
  if (!t || typeof ((o = t.history) == null ? void 0 : o.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, a = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", a);
}
function Qs(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: a,
    resolveBlockPage: o,
    syncDebounceMs: s = Ys,
    jobId: c,
    documentId: l,
    applyReaderSearch: i
  } = e, d = C(o);
  d.current = o;
  const u = C(i);
  u.current = i;
  const f = C(0);
  O(() => {
    if (!n || !r || !t.current || !Number.isFinite(a) || a < 1 || f.current === a) return;
    const m = setTimeout(() => {
      var y;
      const v = ((y = globalThis.location) == null ? void 0 : y.search) || "", p = Bo(v, a, d.current);
      if (f.current = a, p === null) return;
      const b = `${new URLSearchParams(p).get("block_id") || ""}`.trim();
      t.current = Xr(
        { blockId: b },
        a,
        { jobId: c, documentId: l }
      ), (u.current || Xs)(p);
    }, s);
    return () => clearTimeout(m);
  }, [
    n,
    r,
    a,
    s,
    c,
    l,
    t
  ]);
}
function ei(e) {
  const t = C(""), [n, r] = L(!1), a = A(() => r(!0), []), o = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  Zs(o, t, a), Qs(e, t, n);
}
const ot = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function ti(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function Xn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function Qr(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = Xn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const a = Xn(n, e);
  return a < 0 ? "ignore" : a === 0 ? n.page_hash === e.pageHash ? "ignore" : "retry" : "accept";
}
function ni(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), a = Qr(r, t, n);
  if (a === "retry") return e;
  if (a === "ignore")
    return { ...e, lastSeq: t.seq, connection: "live", error: "" };
  const o = new Map(n.items.map((l) => [l.item_id, l])), s = new Map((r == null ? void 0 : r.changedAtSeqById) || []);
  for (const l of t.changed_item_ids)
    o.has(l) && s.set(l, t.seq);
  const c = new Map(e.pagesByPage);
  return c.set(t.page_idx, {
    attempt: n.attempt,
    generation: n.generation,
    pageHash: n.page_hash,
    itemsById: o,
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
const Qn = [250, 500, 1e3, 2e3, 4e3], Wt = [80, 160, 320, 640, 1e3, 1500], er = [250, 500, 1e3, 2e3, 4e3, 5e3], ri = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function nn(e, t) {
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
  return Vo(e) ? `${e.code || ""}`.trim() : "";
}
function Tt(e, t) {
  const n = Tn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function oi(e, t, n, r, a) {
  let o = null;
  for (let s = 0; ; s += 1) {
    try {
      const l = await a.fetchPage(e, t.page_idx, { signal: r });
      if (Qr(n.pagesByPage.get(t.page_idx), t, l) !== "retry")
        return l;
      o = Go(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (l) {
      if ((l == null ? void 0 : l.name) === "AbortError") throw l;
      o = l;
      const i = Tn(l);
      if (i && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(i)) throw l;
    }
    const c = Wt[Math.min(s, Wt.length - 1)];
    if (await nn(c, r), s >= Wt.length + 2) throw o;
  }
}
function ai({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [a, o] = L(ot), s = C(a), c = C("");
  s.current = a;
  const l = `${e || ""}`.trim(), i = `${t || ""}`.trim().toLowerCase(), d = ri.has(i) ? i : "";
  return O(() => {
    if (!n || !l) {
      c.current = "", s.current = ot, o(ot);
      return;
    }
    const u = r === void 0 ? Ra() : r, f = c.current === l;
    if (c.current = l, !u) {
      const w = {
        ...f ? s.current : ot,
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
      ...f ? s.current : ot,
      connection: d ? "terminal" : "connecting",
      jobStatus: i,
      error: ""
    };
    s.current = p, o(p);
    const b = (w) => {
      m.signal.aborted || o((g) => {
        const I = w(g);
        return s.current = I, I;
      });
    }, y = async () => {
      let w = 0;
      for (; !m.signal.aborted; )
        try {
          const g = await u.fetchLayout(l, { signal: m.signal });
          v = !0, b((I) => ({
            ...I,
            layoutByPage: ti(g),
            jobStatus: i,
            error: ""
          }));
          return;
        } catch (g) {
          if ((g == null ? void 0 : g.name) === "AbortError") return;
          const I = Tn(g);
          if (!(I === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !I)) {
            b((N) => ({
              ...N,
              connection: d ? "terminal" : "unavailable",
              jobStatus: i,
              error: Tt(g, "实时译文暂不可用")
            }));
            return;
          }
          if (d) {
            b((N) => ({
              ...N,
              connection: "terminal",
              jobStatus: i,
              error: ""
            }));
            return;
          }
          b((N) => ({
            ...N,
            connection: "connecting",
            jobStatus: i,
            error: Tt(g, "正在等待 OCR 版面数据")
          })), await nn(Qn[Math.min(w, Qn.length - 1)], m.signal).catch(() => {
          }), w += 1;
        }
    };
    return (async () => {
      if (await y(), !v || m.signal.aborted) return;
      let w = 0;
      for (; !m.signal.aborted; ) {
        d || b((g) => ({
          ...g,
          connection: g.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: i,
          // 保留已有错误：首页还没提交（lastSeq 为 0）时恰恰是最容易出错的阶段，
          // 此前这里把它清成空串，UI 于是一直显示「连接中」，用户看到的是
          // "正在努力"，实际可能已经在反复失败。
          error: g.error
        }));
        try {
          await u.streamEvents(l, {
            afterSeq: s.current.lastSeq,
            signal: m.signal,
            onEvent: async (g) => {
              if (g.seq <= s.current.lastSeq) return;
              let I;
              try {
                I = await oi(
                  l,
                  g,
                  s.current,
                  m.signal,
                  u
                );
              } catch (k) {
                if ((k == null ? void 0 : k.name) === "AbortError" || m.signal.aborted) throw k;
                b((N) => ({
                  ...N,
                  lastSeq: Math.max(N.lastSeq, g.seq),
                  error: Tt(k, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              b((k) => {
                const N = ni(k, g, I);
                return d ? {
                  ...N,
                  connection: "terminal",
                  jobStatus: i
                } : {
                  ...N,
                  jobStatus: i
                };
              }), w = 0;
            }
          });
        } catch (g) {
          if ((g == null ? void 0 : g.name) === "AbortError" || m.signal.aborted) return;
          b((I) => ({
            ...I,
            connection: d ? "terminal" : "reconnecting",
            jobStatus: i,
            error: Tt(g, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (d) {
          b((g) => ({
            ...g,
            connection: "terminal",
            jobStatus: i
          }));
          return;
        }
        await nn(er[Math.min(w, er.length - 1)], m.signal).catch(() => {
        }), w += 1;
      }
    })(), () => m.abort();
  }, [n, r, l, d]), a;
}
const si = 2e3;
function ii(e) {
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
const ci = /* @__PURE__ */ new Set(["book", "translate"]);
function eo(e) {
  return !!(e.jobId && e.sourceUrl && ci.has(e.workflow));
}
function li(e) {
  return !!(eo(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function di() {
  const e = Qa(), t = eo({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = li({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = ai({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), a = xs(), { shellRef: o, shellEl: s, shellWidth: c, bindShell: l } = rs(), i = Ps({
    documentId: e.documentId,
    jobId: e.jobId
  }), d = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: u, onZoomChange: f } = ks(e.mode, o, i), m = as(
    {
      mode: e.mode,
      sourceOnly: e.sourceOnly,
      assetsReady: e.assetsReady,
      sourceUrl: e.sourceUrl,
      translatedUrl: e.translatedUrl,
      sourceFile: e.sourceFile,
      translatedFile: e.translatedFile
    },
    { userZoom: u, shellWidth: c, identityKey: d }
  ), {
    beginModeSwitch: v,
    goToPage: p,
    repinIfRestoring: b
  } = Ks(o, {
    primaryPane: m.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: m.primaryNumPages > 0
  });
  O(() => {
    b();
  }, [c, b]);
  const y = $s(
    o,
    m.compareMode,
    m.rowSyncRevision,
    b
  ), S = _s(
    o,
    m.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${u}-${m.metricsTick}`,
    m.primaryPane
  ), w = A((j, q) => {
    var ne, he;
    const Q = Math.max(
      Number(m.hudNumPages) || 0,
      Number(m.primaryNumPages) || 0,
      Number((ne = m.numPagesByPane) == null ? void 0 : ne.source) || 0,
      Number((he = m.numPagesByPane) == null ? void 0 : he.translated) || 0
    );
    p(j, Q, q);
  }, [p, m.hudNumPages, m.primaryNumPages, m.numPagesByPane]), [g, I] = L(null), k = C(null), N = A((j) => {
    k.current && clearTimeout(k.current), I(j), j && (k.current = setTimeout(() => I(null), si));
  }, []);
  O(() => () => {
    k.current && clearTimeout(k.current);
  }, []);
  const M = A((j) => {
    const q = kt(e.regions, j);
    return q ? Wn(q, m.primaryPane).page : null;
  }, [e.regions, m.primaryPane]), _ = A((j, q) => {
    const Q = q || m.primaryPane, ne = typeof j == "object" && j ? `${j.block_id || ""}`.trim() : "", he = typeof j == "object" && j ? `${j.image_url || ""}`.trim() : "", ye = typeof j == "object" && j ? j.page_idx != null ? Number(j.page_idx) + 1 : j.page != null ? Number(j.page) : null : typeof j == "number" ? j + 1 : null, de = Jo(e.regions, he, ye) || kt(e.regions, ne) || (typeof j == "object" ? Ko(e.regions, j) : null);
    let fe = de ? Wn(de, Q).page : null;
    fe == null && (fe = ii(j)), !(fe == null || fe < 1) && (N(de), w(fe, Q));
  }, [N, w, m.primaryPane, e.regions]);
  ei({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: m.hudNumPages || 0,
    currentPage: S,
    goToPage: w,
    resolveBlockPage: M,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (j) => {
      N(kt(e.regions, j.blockId));
    }
  });
  const { setModeKeepingPage: E } = Ns({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: v
  }), [R, P] = L(null), {
    selection: T,
    clearSelection: D
  } = As(o, !e.boot.loading && !e.boot.failed), F = A(() => {
    P(null), D();
  }, [D]), U = A((j) => {
    D(), P(j);
  }, [D]);
  O(() => {
    T && P(null);
  }, [T]), O(() => {
    const j = o.current;
    if (!j) return;
    const q = () => P(null);
    return j.addEventListener("scroll", q, { passive: !0 }), () => j.removeEventListener("scroll", q);
  }, [s, o]);
  const Z = T || R;
  O(() => {
    N(null), F();
  }, [d, N, F]);
  const B = !e.boot.loading && !e.boot.failed, K = V(() => a, [a.active, a.open, a.close, a.toggle, a.isOpen]), W = V(() => ({ bindShell: l, shellEl: s, shellWidth: c, shellRef: o }), [l, s, c, o]), G = V(() => ({
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
    shell: W,
    panes: m,
    sessionFiles: G,
    rowHeights: y,
    goToPage: w,
    activeRegion: g,
    jumpToAnchor: _,
    setModeKeepingPage: E,
    download: e.download,
    showHud: B,
    tools: K,
    selection: Z,
    clearSelection: F,
    selectRegion: U,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, W, m, G, y, w, g, _, E, B, K, Z, F, U, u, f, i, r, n]);
  return V(() => ({
    ...ae,
    currentPage: S
  }), [ae, S]);
}
const ui = [
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
], fi = [
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
function mi(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of ui)
    if (n.keys.some(
      (a) => a.length === 1 ? a === t : a === e
    )) return n;
  return null;
}
function hi(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function pi(e) {
  const {
    mode: t,
    sourceOnly: n,
    setMode: r,
    userZoom: a,
    onZoomChange: o,
    currentPage: s,
    numPages: c,
    goToPage: l,
    enabled: i = !0
  } = e;
  O(() => {
    if (!i)
      return;
    const d = (u) => {
      if (u.defaultPrevented || u.metaKey || u.ctrlKey || u.altKey || hi(u.target))
        return;
      const f = u.key, m = mi(f);
      if (m) {
        if (m.mode) {
          if (n && m.mode !== "source")
            return;
          u.preventDefault(), r(m.mode);
          return;
        }
        if (!(m.requiresPages && c <= 0))
          switch (u.preventDefault(), m.action) {
            case "zoom-in":
              o(pt(a, 1));
              return;
            case "zoom-out":
              o(pt(a, -1));
              return;
            case "zoom-reset":
              o(lt());
              return;
            case "next-page":
              l(Dt(s + 1, c));
              return;
            case "prev-page":
              l(Dt(s - 1, c));
              return;
            case "first-page":
              l(1);
              return;
            case "last-page":
              l(c);
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
    c,
    l
  ]);
}
const gi = "retainpdf:soft-reader-close";
function bi() {
  return new URL("./index.html", window.location.href).href;
}
function yi() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: gi },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function vi(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), a = new URL(e, r);
    return a.origin === r.origin && !/reader\.html$/i.test(a.pathname) && !/detail\.html$/i.test(a.pathname);
  } catch {
    return !1;
  }
}
function wi() {
  if (!(typeof window > "u") && !yi()) {
    if (vi(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(bi());
  }
}
function Si({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ x(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), wi();
      },
      children: [
        /* @__PURE__ */ h(et, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ h("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let tr = !1;
function Ii() {
  if (tr)
    return;
  const e = mt().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (ha.GlobalWorkerOptions.workerSrc = e, tr = !0);
}
const Pi = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function Ri({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: a
}) {
  const o = r.flatMap((s) => {
    if (!Cr(s.region)) return [];
    const c = wt(s, t, n);
    return c ? [{ highlight: s, rect: c }] : [];
  });
  return o.length ? /* @__PURE__ */ h("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: o.map(({ highlight: s, rect: c }) => {
    const l = s.region, i = _r(l), d = Pi[i];
    return /* @__PURE__ */ x(
      "button",
      {
        type: "button",
        className: `reader-structure-selection-target is-${i}`,
        "data-reader-region-id": l.itemId,
        "data-reader-region-kind": i,
        style: c,
        "aria-label": `${d}区域，点击选择`,
        title: `${d} · 点击选择`,
        onClick: (u) => {
          u.stopPropagation();
          const f = u.currentTarget.getBoundingClientRect();
          a == null || a({
            selectionType: "region",
            region: l,
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
          /* @__PURE__ */ h("span", { className: "sr-only", children: Dr(l, e) })
        ]
      },
      l.itemId
    );
  }) }) : null;
}
function Ti(e, t, n) {
  return e.flatMap((r) => {
    if (_r(r.region) !== "text") return [];
    const a = wt(r, t, n);
    return a ? [{ itemId: r.itemId, highlight: r, rect: a }] : [];
  });
}
function nr(e, t, n) {
  let r = null, a = Number.POSITIVE_INFINITY;
  for (const o of e) {
    const { rect: s } = o;
    if (t < s.left || t > s.left + s.width || n < s.top || n > s.top + s.height)
      continue;
    const c = s.width * s.height;
    c < a && (r = o, a = c);
  }
  return r;
}
function Ei({ target: e }) {
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
function Mi(e, t) {
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
function ki(e, t, n, r) {
  if (!e || !t) return [];
  const a = [];
  for (const o of e.blocks) {
    const s = t.itemsById.get(o.item_id);
    if (!(s != null && s.translated_text)) continue;
    const c = wt(
      Mi(e, o),
      n,
      r
    );
    c && a.push({
      itemId: o.item_id,
      translatedText: s.translated_text,
      status: s.status,
      kind: o.kind,
      sourceText: o.source_text,
      typography: o.typography,
      rect: c,
      changedAtSeq: t.changedAtSeqById.get(o.item_id) || 0,
      changedNow: t.changedAtSeqById.get(o.item_id) === t.lastEventSeq
    });
  }
  return a;
}
const Ai = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', Ni = 256, at = /* @__PURE__ */ new Map();
function xi(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function Li(e) {
  const t = `${e || ""}`, { text: n, slots: r } = ba(t, { bareLatex: !0 }), a = xi(n), o = ya(a, r);
  if (!r.length)
    return { fallbackHtml: o, richHtml: Promise.resolve(o), hasMath: !1 };
  let s = at.get(t);
  if (!s && (s = va(a, r), at.set(t, s), at.size > Ni)) {
    const c = at.keys().next().value;
    c !== void 0 && at.delete(c);
  }
  return { fallbackHtml: o, richHtml: s, hasMath: !0 };
}
function Jt(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function Ae(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function Ci(e, t) {
  const n = e.typography, r = Ae(t) || 1, a = Ae(n == null ? void 0 : n.font_size_pt), o = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, o * 1.18), c = Jt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, l = Math.max(5.5 * r, Math.min(s, c * r)), i = Ae(n == null ? void 0 : n.fit_min_font_size_pt), d = Ae(n == null ? void 0 : n.fit_max_font_size_pt), u = Math.max(3.5, (i || 5.5) * r), f = Math.max(
    u,
    d ? d * r : a ? a * r : l
  ), m = a ? a * r : l, v = Ae(n == null ? void 0 : n.leading_em), p = [
    Ae(n == null ? void 0 : n.padding_top_pt) || 0,
    Ae(n == null ? void 0 : n.padding_right_pt) || 0,
    Ae(n == null ? void 0 : n.padding_bottom_pt) || 0,
    Ae(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((b) => b * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || Ai,
    fontSizePx: Math.max(u, Math.min(f, m)),
    minFontSizePx: u,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: v ? 1 + v : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (Jt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : Jt(e.kind) ? "center" : "justify",
    padding: p,
    exact: !!a
  };
}
function _i(e, t, n, r) {
  const { minFontSizePx: a, maxFontSizePx: o } = r, s = /* @__PURE__ */ new Map(), c = (u) => {
    const f = s.get(u);
    if (f !== void 0) return f;
    const { width: m, height: v } = e(u), p = m <= t + 0.5 && v <= n + 0.5;
    return s.set(u, p), p;
  };
  let l = a, i = o, d = Math.min(r.requestedFontSizePx, i);
  if (c(d)) {
    if (!r.exact) {
      l = d;
      for (let u = 0; u < 6 && i > l; u += 1) {
        const f = (l + i) / 2;
        c(f) ? (d = f, l = f) : i = f;
      }
    }
  } else {
    i = d, d = l;
    for (let u = 0; u < 8 && i > l; u += 1) {
      const f = (l + i) / 2;
      c(f) ? (d = f, l = f) : i = f;
    }
  }
  return Math.max(a, d);
}
const Di = 512, st = /* @__PURE__ */ new Map();
let rn = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  rn += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  rn += 1;
}));
function zi(e, t, n, r) {
  return [
    rn,
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
function Oi({ item: e, pageScale: t }) {
  const n = C(null), r = V(
    () => Li(e.translatedText),
    [e.translatedText]
  ), [a, o] = L(r.fallbackHtml), s = V(
    () => Ci(e, t),
    [e, t]
  );
  O(() => {
    let u = !0;
    return o(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      u && o(f);
    }), () => {
      u = !1;
    };
  }, [r]), je(() => {
    const u = n.current;
    if (!u) return;
    const [f, m, v, p] = s.padding, b = Math.max(1, e.rect.width - p - m), y = Math.max(1, e.rect.height - f - v), S = zi(a, b, y, s);
    let w = st.get(S);
    if (w === void 0 && (w = _i(
      (g) => (u.style.fontSize = `${g}px`, { width: u.scrollWidth, height: u.scrollHeight }),
      b,
      y,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), st.set(S, w), st.size > Di)) {
      const g = st.keys().next().value;
      g !== void 0 && st.delete(g);
    }
    u.style.fontSize = `${w.toFixed(2)}px`;
  }, [a, e.rect.height, e.rect.width, s]);
  const [c, l, i, d] = s.padding;
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
        padding: `${c}px ${l}px ${i}px ${d}px`
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
function Fi({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const a = V(
    () => ki(e, t, n, r),
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
        Oi,
        {
          item: o,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${o.itemId}:${o.changedAtSeq}`
      ))
    }
  ) : null;
}
const $i = dn(Fi), ji = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注"
}, rr = 10;
function Ui({
  width: e,
  height: t,
  targets: n,
  activeNoteId: r,
  onSelect: a
}) {
  const o = n.flatMap(({ note: s, highlight: c }) => {
    const l = wt(c, e, t);
    return l ? [{ note: s, rect: l }] : [];
  });
  return o.length ? /* @__PURE__ */ h("div", { className: "reader-ai-note-layer", "aria-label": "AI 批注", children: o.map(({ note: s, rect: c }) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      className: `reader-ai-note-mark is-${s.kind} is-level-${s.level}` + (s.weak ? " is-weak" : "") + (r === s.id ? " is-active" : ""),
      "data-reader-ai-note-id": s.id,
      style: {
        // 贴在块的左外侧：盖住正文的标注是在帮倒忙。左边越界时退回块内。
        left: Math.max(0, c.left - rr - 2),
        top: c.top,
        width: rr,
        height: Math.max(12, c.height)
      },
      "aria-label": `${ji[s.kind]}：${s.text}`,
      title: s.text,
      onClick: (l) => {
        l.stopPropagation();
        const i = l.currentTarget.getBoundingClientRect();
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
const to = 1.414;
function Bi({
  pageNumber: e,
  width: t,
  devicePixelRatio: n,
  pane: r,
  active: a = !1,
  syncedMinHeight: o = 0,
  onMetrics: s,
  cachedAspect: c,
  onAspectChange: l,
  sentinelRef: i,
  regionHighlight: d = null,
  regionTargets: u = [],
  aiNoteTargets: f = [],
  activeAiNoteId: m = null,
  onSelectAiNote: v,
  onSelectRegion: p,
  liveTranslationLayout: b,
  liveTranslationPage: y,
  showLiveTranslation: S = r === "source"
}) {
  const w = C(c ?? to), [g, I] = L(w.current);
  O(() => {
    c != null && Math.abs(c - w.current) >= 1e-3 && (w.current = c, I(c));
  }, [c]);
  const k = C(i);
  k.current = i;
  const N = C((B) => {
    var K;
    (K = k.current) == null || K.call(k, B);
  }).current, M = Math.max(120, Math.floor(t * g)), _ = Math.max(M, Math.ceil(o || 0)), E = wt(d, t, M), R = V(
    () => Ti(u, t, M),
    [M, u, t]
  ), [P, T] = L(null), D = V(
    () => R.find((B) => B.itemId === P) || null,
    [P, R]
  ), F = (B) => {
    if (B.buttons !== 0) {
      T(null);
      return;
    }
    const K = B.currentTarget.getBoundingClientRect(), W = nr(
      R,
      B.clientX - K.left,
      B.clientY - K.top
    ), G = (W == null ? void 0 : W.itemId) || null;
    T((ae) => ae === G ? ae : G);
  }, U = (B) => {
    var G, ae, j;
    if (!p || (ae = (G = B.target) == null ? void 0 : G.closest) != null && ae.call(G, ".reader-structure-selection-target") || `${((j = window.getSelection()) == null ? void 0 : j.toString()) || ""}`.trim()) return;
    const K = B.currentTarget.getBoundingClientRect(), W = nr(
      R,
      B.clientX - K.left,
      B.clientY - K.top
    );
    W && p({
      selectionType: "region",
      region: W.highlight.region,
      kind: "text",
      page: W.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: K.left + W.rect.left,
        top: K.top + W.rect.top,
        width: W.rect.width,
        height: W.rect.height
      }
    });
  }, Z = (B) => {
    !Number.isFinite(B) || B <= 0 || Math.abs(w.current - B) < 1e-3 || (w.current = B, I(B), l == null || l(e, B));
  };
  return /* @__PURE__ */ x(
    "div",
    {
      ref: N,
      [Ze]: e,
      [Xe]: r,
      [wn]: M,
      className: Sn,
      onPointerMoveCapture: F,
      onClick: U,
      onPointerLeave: () => T(null),
      style: {
        width: t,
        height: _,
        minHeight: _
      },
      children: [
        a ? /* @__PURE__ */ h(
          pa,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: Hr,
            loading: /* @__PURE__ */ h(
              "div",
              {
                className: Ct,
                style: { width: t, height: M }
              }
            ),
            onLoadSuccess: (B) => {
              try {
                const K = B.getViewport({ scale: 1 });
                if (K.width > 0) {
                  const W = K.height / K.width;
                  Z(W);
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
            className: Ct,
            style: { width: t, height: M },
            "aria-hidden": !0
          }
        ),
        E ? /* @__PURE__ */ h(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": d == null ? void 0 : d.itemId,
            style: E,
            "aria-hidden": "true"
          }
        ) : null,
        a && S ? /* @__PURE__ */ h(
          $i,
          {
            layoutPage: b,
            pageState: y,
            width: t,
            height: M
          }
        ) : null,
        v ? /* @__PURE__ */ h(
          Ui,
          {
            width: t,
            height: M,
            targets: f,
            activeNoteId: m,
            onSelect: (B, K) => v(B, K)
          }
        ) : null,
        /* @__PURE__ */ h(Ei, { target: a ? D : null }),
        /* @__PURE__ */ h(
          Ri,
          {
            pane: r === "translated" ? "translated" : "source",
            width: t,
            height: M,
            regions: u,
            onSelect: p
          }
        )
      ]
    }
  );
}
const Hi = dn(Bi), Kt = 5, Wi = "120% 0px", Ji = 120;
let or = 1;
const ar = /* @__PURE__ */ new WeakMap();
function Ki(e) {
  if (!e) return 0;
  const t = ar.get(e);
  if (t) return t;
  const n = or;
  return or += 1, ar.set(e, n), n;
}
function qi() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const Vi = Lo(
  function({
    pane: t,
    url: n = "",
    preloadedFile: r = null,
    userZoom: a = 1,
    visible: o = !0,
    emptyLabel: s = "暂无 PDF",
    scrollRoot: c = null,
    pageWidthOverride: l = null,
    rowHeights: i,
    onMetrics: d,
    onLoadSuccess: u,
    onLoadError: f,
    onNumPagesChange: m,
    activeRegion: v = null,
    regions: p = [],
    aiNotes: b = [],
    activeAiNoteId: y = null,
    onSelectAiNote: S,
    readerMetadata: w = null,
    onSelectRegion: g,
    liveTranslation: I,
    showLiveTranslation: k = t === "source",
    liveTranslationPendingLabel: N = "",
    paneAction: M
  }, _) {
    Ii();
    const { file: E, loading: R, error: P } = Ga(n, r), T = `${n}\0${Ki(E)}`, D = C(T);
    D.current = T;
    const F = V(
      () => Ka(E),
      [E, n]
    ), [U, Z] = L(0), [B, K] = L(""), [W, G] = L(null), [ae, j] = L(480), q = C(null), Q = C(0), ne = V(() => qi(), []), he = V(() => ({
      cMapUrl: mt().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: mt().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    un(_, () => W, [W]), O(() => {
      const z = (H) => {
        !Number.isFinite(H) || H < 80 || Math.abs(H - Q.current) < 8 || (Q.current = H, j(H));
      }, Y = l && l >= 80 ? l : (c == null ? void 0 : c.clientWidth) || 0;
      if (z(Y), !c || typeof ResizeObserver > "u" || l && l >= 80) return;
      const J = new ResizeObserver((H) => {
        var re, oe;
        const ie = ((oe = (re = H[0]) == null ? void 0 : re.contentRect) == null ? void 0 : oe.width) ?? c.clientWidth;
        !Number.isFinite(ie) || ie < 80 || (q.current && clearTimeout(q.current), q.current = setTimeout(() => z(ie), 80));
      });
      return J.observe(c), () => {
        J.disconnect(), q.current && clearTimeout(q.current);
      };
    }, [l, c, o]);
    const ye = V(
      () => gs(ae, a),
      [ae, a]
    ), [de, fe] = L(() => /* @__PURE__ */ new Map()), [Ee, ee] = L(() => /* @__PURE__ */ new Set()), [te, se] = L(() => /* @__PURE__ */ new Set()), be = C(/* @__PURE__ */ new Map()), ue = C(null), Ie = C(/* @__PURE__ */ new Map()), tt = A((z, Y) => {
      fe((J) => {
        if (J.get(z) === Y) return J;
        const H = new Map(J);
        return H.set(z, Y), H;
      });
    }, []), $ = A((z, Y) => {
      const J = be.current, H = J.get(z);
      if (H && ue.current)
        try {
          ue.current.unobserve(H);
        } catch {
        }
      if (Y) {
        if (J.set(z, Y), ue.current)
          try {
            ue.current.observe(Y);
          } catch {
          }
      } else
        J.delete(z);
    }, []), le = C(/* @__PURE__ */ new Map()), Pe = A((z) => {
      const Y = le.current;
      let J = Y.get(z);
      return J || (J = (H) => $(z, H), Y.set(z, J)), J;
    }, [$]);
    O(() => {
      if (typeof IntersectionObserver > "u") return;
      const z = Ie.current, Y = new IntersectionObserver(
        (J) => {
          const H = [], ie = [];
          for (const re of J) {
            const oe = re.target, ge = Ft(oe);
            Number.isFinite(ge) && (re.isIntersecting ? H : ie).push(ge);
          }
          if ((H.length || ie.length) && ee((re) => {
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
            }, Ji));
        },
        { root: c, rootMargin: Wi, threshold: 0 }
      );
      ue.current = Y;
      for (const J of be.current.values())
        try {
          Y.observe(J);
        } catch {
        }
      return () => {
        Y.disconnect(), ue.current === Y && (ue.current = null);
        for (const J of z.values()) clearTimeout(J);
        z.clear();
      };
    }, [c]), je(() => {
      Z(0), K(""), ee(/* @__PURE__ */ new Set()), se(/* @__PURE__ */ new Set()), fe(/* @__PURE__ */ new Map()), be.current.clear();
      const z = Ie.current;
      for (const Y of z.values()) clearTimeout(Y);
      z.clear(), m == null || m(0, t);
    }, [T, m, t]);
    const nt = A(
      ({ numPages: z }) => {
        D.current === T && (Z(z), K(""), m == null || m(z, t), u == null || u({ numPages: z, pane: t }));
      },
      [T, u, m, t]
    ), He = A(
      (z) => {
        if (D.current !== T) return;
        const Y = (z == null ? void 0 : z.message) || "PDF 解析失败";
        K(Y), Z(0), m == null || m(0, t), f == null || f(z, t);
      },
      [T, f, m, t]
    ), Le = V(
      () => U > 0 ? Array.from({ length: U }, (z, Y) => Y + 1) : [],
      [U]
    );
    O(() => {
      typeof IntersectionObserver < "u" || se(new Set(Le));
    }, [Le]);
    const Pt = V(
      () => jt(v, w, t),
      [v, w, t]
    ), Mo = V(() => {
      const z = /* @__PURE__ */ new Map();
      for (const Y of p) {
        const J = jt(Y, w, t);
        if (!J) continue;
        const H = z.get(J.box.page) || [];
        H.push(J), z.set(J.box.page, H);
      }
      return z;
    }, [t, w, p]), ko = V(() => {
      const z = /* @__PURE__ */ new Map();
      for (const Y of b) {
        const J = kt(p, Y.anchor.blockId);
        if (!J) continue;
        const H = jt(J, w, t);
        if (!H) continue;
        const ie = z.get(H.box.page) || [];
        ie.push({ note: Y, highlight: H }), z.set(H.box.page, ie);
      }
      return z;
    }, [b, t, w, p]), Ao = V(() => {
      if (U === 0) return /* @__PURE__ */ new Set();
      if (!(!!c && typeof IntersectionObserver < "u" && o)) return new Set(Le);
      if (Ee.size === 0) {
        const J = Math.min(U, Kt * 2 + 1);
        return new Set(Array.from({ length: J }, (H, ie) => ie + 1));
      }
      const Y = /* @__PURE__ */ new Set();
      for (const J of Ee)
        for (let H = -Kt; H <= Kt; H++) {
          const ie = J + H;
          ie >= 1 && ie <= U && Y.add(ie);
        }
      return Y;
    }, [U, Le, c, o, Ee]), No = !n || !!P || !!B, xo = n && (P || B) || s;
    return /* @__PURE__ */ x(
      "section",
      {
        ref: G,
        className: `reader-panel ${ls}${o ? "" : " is-hidden"}`,
        [Xe]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": o ? "true" : "false",
        "data-live-translation-status": (I == null ? void 0 : I.jobStatus) || void 0,
        "aria-hidden": o ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          M ? /* @__PURE__ */ h("div", { className: "reader-react-pdf-pane-action", children: M }) : null,
          N ? /* @__PURE__ */ x("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ h("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ h("span", { children: N })
          ] }) : null,
          No && !R ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: xo }) : null,
          R ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          F && !P ? /* @__PURE__ */ h("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ h(
            ga,
            {
              file: F,
              loading: null,
              error: null,
              options: he,
              onLoadSuccess: nt,
              onLoadError: He,
              className: "reader-react-pdf-document",
              children: Le.map((z) => {
                if (Ao.has(z))
                  return /* @__PURE__ */ h(
                    Hi,
                    {
                      pane: t,
                      pageNumber: z,
                      width: ye,
                      devicePixelRatio: ne,
                      active: te.has(z),
                      syncedMinHeight: (i == null ? void 0 : i.get(z)) || 0,
                      onMetrics: d,
                      cachedAspect: de.get(z),
                      onAspectChange: tt,
                      sentinelRef: Pe(z),
                      regionHighlight: (Pt == null ? void 0 : Pt.box.page) === z ? Pt : null,
                      regionTargets: Mo.get(z),
                      aiNoteTargets: ko.get(z),
                      activeAiNoteId: y,
                      onSelectAiNote: S,
                      onSelectRegion: g,
                      liveTranslationLayout: I == null ? void 0 : I.layoutByPage.get(z - 1),
                      liveTranslationPage: I == null ? void 0 : I.pagesByPage.get(z - 1),
                      showLiveTranslation: k
                    },
                    `${t}-${z}`
                  );
                const J = de.get(z) ?? to, H = Math.max(120, Math.floor(ye * J)), ie = Math.max(H, Math.ceil((i == null ? void 0 : i.get(z)) || 0));
                return /* @__PURE__ */ h(
                  "div",
                  {
                    ref: Pe(z),
                    [Ze]: z,
                    [Xe]: t,
                    [wn]: H,
                    className: Sn,
                    style: {
                      width: ye,
                      height: ie,
                      minHeight: ie
                    },
                    children: /* @__PURE__ */ h(
                      "div",
                      {
                        className: Ct,
                        style: { width: ye, height: H },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${z}`
                );
              })
            },
            T
          ) }) : null
        ]
      }
    );
  }
), sr = dn(Vi), no = fn(null), ro = fn(null);
function Gi({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ h(no.Provider, { value: e, children: /* @__PURE__ */ h(ro.Provider, { value: t, children: n }) });
}
function It() {
  return mn(no);
}
function Yi() {
  return mn(ro);
}
function Zi({
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
function Xi(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function Qi(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function ec(e) {
  const t = It(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: a,
    paneComposition: o
  } = e, s = (o == null ? void 0 : o.visibleMode) ?? e.mode ?? "compare", c = (o == null ? void 0 : o.compareMode) ?? e.compareMode ?? s === "compare", l = (o == null ? void 0 : o.showSource) ?? e.showSource ?? !0, i = (o == null ? void 0 : o.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), d = (o == null ? void 0 : o.overlayOnSource) ?? e.overlayOnSource ?? !1, u = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? St, v = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, p = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), b = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, y = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, S = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, w = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", g = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", I = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, k = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, N = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), M = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), _ = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), E = e.regions ?? (t == null ? void 0 : t.regions) ?? [], R = (t == null ? void 0 : t.aiNotes) ?? [], P = (t == null ? void 0 : t.activeAiNoteId) ?? null, T = t == null ? void 0 : t.onSelectAiNote, D = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), F = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), U = Zi({
    mode: s,
    compareMode: c,
    showSource: l,
    showTranslated: i,
    markdownSplit: n,
    overlayOnSource: d
  }), Z = Xi(
    v,
    n || r,
    typeof document > "u" ? v * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ h(
    "div",
    {
      ref: u,
      className: cs,
      "data-reader-region-count": E.length,
      "data-reader-structured-region-count": E.filter(Cr).length,
      "data-reader-metadata-ready": D ? "true" : "false",
      children: /* @__PURE__ */ x(
        "main",
        {
          className: `${is} reader-mode-${U.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            b ? /* @__PURE__ */ h(
              sr,
              {
                pane: "source",
                url: w,
                preloadedFile: I,
                userZoom: m,
                visible: U.showSource,
                scrollRoot: f,
                pageWidthOverride: Z,
                rowHeights: U.compareMode ? p : void 0,
                onMetrics: N,
                emptyLabel: S ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: M,
                activeRegion: _,
                regions: E,
                aiNotes: R,
                activeAiNoteId: P,
                onSelectAiNote: T,
                readerMetadata: D,
                onSelectRegion: F,
                liveTranslation: d ? a : void 0,
                showLiveTranslation: d,
                liveTranslationPendingLabel: d ? Qi(a) : "",
                paneAction: d ? /* @__PURE__ */ x(vt, { children: [
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
              sr,
              {
                pane: "translated",
                url: g,
                preloadedFile: k,
                userZoom: m,
                visible: U.showTranslated,
                scrollRoot: f,
                pageWidthOverride: Z,
                rowHeights: U.compareMode ? p : void 0,
                onMetrics: N,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: M,
                activeRegion: _,
                regions: E,
                aiNotes: R,
                activeAiNoteId: P,
                onSelectAiNote: T,
                readerMetadata: D,
                onSelectRegion: F,
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
const tc = [
  { id: "source", label: "源文件", Icon: zr },
  { id: "compare", label: "对照", Icon: Or },
  { id: "translated", label: "翻译文件", Icon: Fr }
];
function nc(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function rc(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function oc(e) {
  const t = It(), {
    mode: n,
    documentReady: r,
    onModeChange: a,
    liveTranslation: o = null
  } = e, s = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, c = o ? nc(o.state) : "";
  return /* @__PURE__ */ x("header", { className: "reader-workspace-bar", children: [
    o ? /* @__PURE__ */ x(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${o.state.connection}${o.visible ? " is-active" : ""}`,
        "aria-pressed": o.visible,
        "aria-label": o.visible ? "隐藏实时译文" : "显示实时译文",
        title: o.state.error || c,
        onClick: o.onToggle,
        children: [
          /* @__PURE__ */ h(ea, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ h("span", { className: "reader-live-translation-toggle-label", children: c })
        ]
      }
    ) : null,
    /* @__PURE__ */ h("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: tc.map(({ id: l, label: i, Icon: d }) => {
      const u = n === l, f = rc({
        id: l,
        documentReady: r,
        sourceViewOnly: s,
        liveTranslationAvailable: !!o
      });
      return /* @__PURE__ */ x(
        "button",
        {
          type: "button",
          className: `reader-workspace-tab${u ? " is-active" : ""}`,
          role: "tab",
          "aria-selected": u,
          "aria-label": i,
          title: f ? `${i} 需要文档任务` : i,
          disabled: f,
          onClick: () => a(l),
          children: [
            /* @__PURE__ */ h(d, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { className: "reader-workspace-tab-label", children: i })
          ]
        },
        l
      );
    }) })
  ] });
}
const ac = {
  "reading-path": {
    label: "阅读路径",
    short: "路径",
    Icon: ra,
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
    Icon: na,
    adapterKey: "renderReaderReadingCanvas",
    slot: "document",
    storageKey: "retainpdf.reader.reading-canvas-float.pos.v1",
    ariaLabel: "AI 画布",
    width: 520,
    keepMounted: !0
  },
  terminal: {
    label: "终端",
    short: "SH",
    Icon: ta,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    storageKey: "retainpdf.reader.terminal-float.pos.v1",
    ariaLabel: "fx 终端",
    width: 420,
    keepMounted: !0
  }
}, oo = In.map(
  (e) => ({ id: e, ...ac[e] })
), sc = [
  { id: "markdown", label: "Markdown", short: "MD", Icon: $r },
  { id: "ai", label: "AI 问答", short: "AI", Icon: gn }
];
function ic() {
  const e = ce();
  return [
    ...sc,
    ...oo.filter(
      (t) => typeof (e == null ? void 0 : e[t.adapterKey]) == "function"
    )
  ];
}
function cc(e) {
  const t = It(), { active: n } = e, r = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), a = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), o = ic();
  return n ? /* @__PURE__ */ x("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ h("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: o.map(({ id: s, label: c, Icon: l }) => {
      const i = n === s;
      return /* @__PURE__ */ x(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": i,
          className: `reader-assistant-dock-tab${i ? " is-active" : ""}`,
          onClick: () => r(s),
          children: [
            /* @__PURE__ */ h(l, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { children: c })
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
  ] }) : /* @__PURE__ */ h("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: o.map(({ id: s, label: c, short: l, Icon: i }) => /* @__PURE__ */ x(
    "button",
    {
      type: "button",
      className: "reader-assistant-rail-button",
      "aria-label": `打开${c}`,
      title: c,
      onClick: () => r(s),
      children: [
        /* @__PURE__ */ h(i, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
        /* @__PURE__ */ h("span", { children: l })
      ]
    },
    s
  )) });
}
function lc(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function dc(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function uc(e) {
  return e / 100 * window.innerHeight;
}
function fc(e) {
  return e / 100 * window.innerWidth;
}
function mc(e) {
  switch (typeof e) {
    case "number":
      return [e, "px"];
    case "string": {
      const t = parseFloat(e);
      return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
    }
  }
}
function it({
  groupSize: e,
  panelElement: t,
  styleProp: n
}) {
  let r;
  const [a, o] = mc(n);
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
      r = dc(t, a);
      break;
    }
    case "em": {
      r = lc(t, a);
      break;
    }
    case "vh": {
      r = uc(a);
      break;
    }
    case "vw": {
      r = fc(a);
      break;
    }
  }
  return r;
}
function pe(e) {
  return parseFloat(e.toFixed(3));
}
function Qe({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, a) => (r += t === "horizontal" ? a.element.offsetWidth : a.element.offsetHeight, r), 0);
}
function on(e) {
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
      const d = it({
        groupSize: n,
        panelElement: a,
        styleProp: o.collapsedSize
      });
      s = pe(d / n * 100);
    }
    let c;
    if (o.defaultSize !== void 0) {
      const d = it({
        groupSize: n,
        panelElement: a,
        styleProp: o.defaultSize
      });
      c = pe(d / n * 100);
    }
    let l = 0;
    if (o.minSize !== void 0) {
      const d = it({
        groupSize: n,
        panelElement: a,
        styleProp: o.minSize
      });
      l = pe(d / n * 100);
    }
    let i = 100;
    if (o.maxSize !== void 0) {
      const d = it({
        groupSize: n,
        panelElement: a,
        styleProp: o.maxSize
      });
      i = pe(d / n * 100);
    }
    return {
      groupResizeBehavior: o.groupResizeBehavior,
      collapsedSize: s,
      collapsible: o.collapsible === !0,
      defaultSize: c,
      disabled: o.disabled,
      minSize: l,
      maxSize: i,
      panelId: r.id
    };
  });
}
function X(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function an(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? hc : pc
  );
}
function hc(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function pc(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function ao(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function so(e, t) {
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
function gc({
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
    const { x: c, y: l } = so(r, s), i = e === "horizontal" ? c : l;
    i < o && (o = i, a = s);
  }
  return X(a, "No rect found"), a;
}
let Et;
function bc() {
  return Et === void 0 && (typeof matchMedia == "function" ? Et = !!matchMedia("(pointer:coarse)").matches : Et = !1), Et;
}
function io(e) {
  const { element: t, orientation: n, panels: r, separators: a } = e, o = an(
    n,
    Array.from(t.children).filter(ao).map((v) => ({ element: v }))
  ).map(({ element: v }) => v), s = [];
  let c = !1, l = !1, i = -1, d = -1, u = 0, f, m = [];
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
        const b = r.find(
          (y) => y.element === p
        );
        if (b) {
          if (f) {
            const y = f.element.getBoundingClientRect(), S = p.getBoundingClientRect();
            let w;
            if (l) {
              const g = n === "horizontal" ? new DOMRect(
                y.right,
                y.top,
                0,
                y.height
              ) : new DOMRect(
                y.left,
                y.bottom,
                y.width,
                0
              ), I = n === "horizontal" ? new DOMRect(S.left, S.top, 0, S.height) : new DOMRect(S.left, S.top, S.width, 0);
              switch (m.length) {
                case 0: {
                  w = [
                    g,
                    I
                  ];
                  break;
                }
                case 1: {
                  const k = m[0], N = gc({
                    orientation: n,
                    rects: [y, S],
                    targetRect: k.element.getBoundingClientRect()
                  });
                  w = [
                    k,
                    N === y ? I : g
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
                  S.top,
                  S.left - y.right,
                  S.height
                ) : new DOMRect(
                  S.left,
                  y.bottom,
                  S.width,
                  S.top - y.bottom
                )
              ];
            for (const g of w) {
              let I = "width" in g ? g : g.element.getBoundingClientRect();
              const k = bc() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (I.width < k) {
                const M = k - I.width;
                I = new DOMRect(
                  I.x - M / 2,
                  I.y,
                  I.width + M,
                  I.height
                );
              }
              if (I.height < k) {
                const M = k - I.height;
                I = new DOMRect(
                  I.x,
                  I.y - M / 2,
                  I.width,
                  I.height + M
                );
              }
              const N = v <= i || v > d;
              !c && !N && s.push({
                group: e,
                groupSize: Qe({ group: e }),
                panels: [f, b],
                separator: "width" in g ? void 0 : g,
                rect: I
              }), c = !1;
            }
          }
          l = !1, f = b, m = [];
        }
      } else if (p.hasAttribute("data-separator")) {
        p.ariaDisabled !== null && (c = !0);
        const b = a.find(
          (y) => y.element === p
        );
        b ? m.push(b) : (f = void 0, m = []);
      } else
        l = !0;
  }
  return s;
}
var _e;
class co {
  constructor() {
    Bn(this, _e, {});
  }
  addListener(t, n) {
    const r = rt(this, _e)[t];
    return r === void 0 ? rt(this, _e)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = rt(this, _e)[t];
    if (r !== void 0)
      if (r.length === 1)
        r[0].call(null, n);
      else {
        let a = !1, o = null;
        const s = Array.from(r);
        for (let c = 0; c < s.length; c++) {
          const l = s[c];
          try {
            l.call(null, n);
          } catch (i) {
            o === null && (a = !0, o = i);
          }
        }
        if (a)
          throw o;
      }
  }
  removeAllListeners() {
    Hn(this, _e, {});
  }
  removeListener(t, n) {
    const r = rt(this, _e)[t];
    if (r !== void 0) {
      const a = r.indexOf(n);
      a >= 0 && r.splice(a, 1);
    }
  }
}
_e = new WeakMap();
let Ge = {
  cursorFlags: 0,
  state: "inactive"
};
const En = new co();
function Oe() {
  return Ge;
}
function yc(e) {
  return En.addListener("change", e);
}
function vc(e) {
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
const wc = (e) => e, qt = () => {
}, lo = 1, uo = 2, fo = 4, mo = 8, ir = 3, cr = 12;
let Mt;
function lr() {
  return Mt === void 0 && (Mt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (Mt = !0)), Mt;
}
function Sc({
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
        if (e && lr()) {
          const o = (e & lo) !== 0, s = (e & uo) !== 0, c = (e & fo) !== 0, l = (e & mo) !== 0;
          if (o)
            return c ? "se-resize" : l ? "ne-resize" : "e-resize";
          if (s)
            return c ? "sw-resize" : l ? "nw-resize" : "w-resize";
          if (c)
            return "s-resize";
          if (l)
            return "n-resize";
        }
        break;
      }
    }
    return lr() ? r > 0 && a > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && a > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const dr = /* @__PURE__ */ new WeakMap();
function Mn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = dr.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = Oe();
  switch (r.state) {
    case "active":
    case "hover": {
      const a = Sc({
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
  dr.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let Te = /* @__PURE__ */ new Map();
const ho = new co();
function Ic(e) {
  Te = new Map(Te), Te.delete(e);
}
function ur(e, t) {
  for (const [n] of Te)
    if (n.id === e)
      return n;
}
function De(e, t) {
  for (const [n, r] of Te)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function Ue() {
  return Te;
}
function kn(e, t) {
  return ho.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function xe(e, t, n) {
  const r = Te.get(e);
  Te = new Map(Te), Te.set(e, t), ho.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function po(e) {
  const t = Oe();
  let n = !1;
  switch (t.state) {
    case "active":
      Ye({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (Mn(e), n = !0, t.hitRegions.forEach((r) => {
        const a = De(r.group.id, !0);
        xe(r.group, a, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function fr(e) {
  e.defaultPrevented || po(e.currentTarget);
}
function Pc(e, t, n) {
  let r, a = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const o of t) {
    const s = so(n, o.rect);
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
function Rc(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function Tc(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: pr(e),
    b: pr(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  X(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const a = {
    a: hr(mr(n.a)),
    b: hr(mr(n.b))
  };
  if (a.a === a.b) {
    const o = r.childNodes, s = {
      a: n.a.at(-1),
      b: n.b.at(-1)
    };
    let c = o.length;
    for (; c--; ) {
      const l = o[c];
      if (l === s.a) return 1;
      if (l === s.b) return -1;
    }
  }
  return Math.sign(a.a - a.b);
}
const Ec = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function Mc(e) {
  const t = getComputedStyle(go(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function kc(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || Mc(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || Ec.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function mr(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (X(n, "Missing node"), kc(n)) return n;
  }
  return null;
}
function hr(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function pr(e) {
  const t = [];
  for (; e; )
    t.push(e), e = go(e);
  return t;
}
function go(e) {
  const { parentNode: t } = e;
  return Rc(t) ? t.host : t;
}
function Ac(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function Nc({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!ao(n) || n.contains(e) || e.contains(n))
    return !0;
  if (Tc(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (Ac(r.getBoundingClientRect(), t))
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
    const o = io(a), s = Pc(a.orientation, o, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && Nc({
      groupElement: a.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function xc(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function me(e, t, n = 0) {
  return Math.abs(pe(e) - pe(t)) <= n;
}
function Re(e, t) {
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
    maxSize: c = 100,
    minSize: l = 0
  } = t;
  if (s && !e)
    return n;
  if (Re(r, l) < 0)
    if (o) {
      const i = (a + l) / 2;
      Re(r, i) < 0 ? r = a : r = l;
    } else
      r = l;
  return r = Math.min(c, r), r = pe(r), r;
}
function gt({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: a,
  trigger: o
}) {
  if (me(e, 0))
    return t;
  const s = o === "imperative-api", c = Object.values(t), l = Object.values(a), i = [...c], [d, u] = r;
  X(d != null, "Invalid first pivot index"), X(u != null, "Invalid second pivot index");
  let f = 0;
  switch (o) {
    case "keyboard": {
      {
        const p = e < 0 ? u : d, b = n[p];
        X(
          b,
          `Panel constraints not found for index ${p}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: S,
          minSize: w = 0
        } = b;
        if (S) {
          const g = c[p];
          if (X(
            g != null,
            `Previous layout not found for panel index ${p}`
          ), me(g, y)) {
            const I = w - g;
            Re(I, Math.abs(e)) > 0 && (e = e < 0 ? 0 - I : I);
          }
        }
      }
      {
        const p = e < 0 ? d : u, b = n[p];
        X(
          b,
          `No panel constraints found for index ${p}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: S,
          minSize: w = 0
        } = b;
        if (S) {
          const g = c[p];
          if (X(
            g != null,
            `Previous layout not found for panel index ${p}`
          ), me(g, w)) {
            const I = g - y;
            Re(I, Math.abs(e)) > 0 && (e = e < 0 ? 0 - I : I);
          }
        }
      }
      break;
    }
    default: {
      const p = e < 0 ? u : d, b = n[p];
      X(
        b,
        `Panel constraints not found for index ${p}`
      );
      const y = c[p], { collapsible: S, collapsedSize: w, minSize: g } = b;
      if (S && Re(y, g) < 0)
        if (e > 0) {
          const I = g - w, k = I / 2, N = y + e;
          Re(N, g) < 0 && (e = Re(e, k) <= 0 ? 0 : I);
        } else {
          const I = g - w, k = 100 - I / 2, N = y - e;
          Re(N, g) < 0 && (e = Re(100 + e, k) > 0 ? 0 : -I);
        }
      break;
    }
  }
  {
    const p = e < 0 ? 1 : -1;
    let b = e < 0 ? u : d, y = 0;
    for (; ; ) {
      const w = c[b];
      X(
        w != null,
        `Previous layout not found for panel index ${b}`
      );
      const g = qe({
        overrideDisabledPanels: s,
        panelConstraints: n[b],
        prevSize: w,
        size: 100
      }) - w;
      if (y += g, b += p, b < 0 || b >= n.length)
        break;
    }
    const S = Math.min(Math.abs(e), Math.abs(y));
    e = e < 0 ? 0 - S : S;
  }
  {
    let p = e < 0 ? d : u;
    for (; p >= 0 && p < n.length; ) {
      const b = Math.abs(e) - Math.abs(f), y = c[p];
      X(
        y != null,
        `Previous layout not found for panel index ${p}`
      );
      const S = y - b, w = qe({
        overrideDisabledPanels: s,
        panelConstraints: n[p],
        prevSize: y,
        size: S
      });
      if (!me(y, w) && (f += y - w, i[p] = w, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? p-- : p++;
    }
  }
  if (xc(l, i))
    return a;
  {
    const p = e < 0 ? u : d, b = c[p];
    X(
      b != null,
      `Previous layout not found for panel index ${p}`
    );
    const y = b + f, S = qe({
      overrideDisabledPanels: s,
      panelConstraints: n[p],
      prevSize: b,
      size: y
    });
    if (i[p] = S, !me(S, y)) {
      let w = y - S, g = e < 0 ? u : d;
      for (; g >= 0 && g < n.length; ) {
        const I = i[g];
        X(
          I != null,
          `Previous layout not found for panel index ${g}`
        );
        const k = I + w, N = qe({
          overrideDisabledPanels: s,
          panelConstraints: n[g],
          prevSize: I,
          size: k
        });
        if (me(I, N) || (w -= N - I, i[g] = N), me(w, 0))
          break;
        e > 0 ? g-- : g++;
      }
    }
  }
  const m = Object.values(i).reduce(
    (p, b) => b + p,
    0
  );
  if (!me(m, 100, 0.1))
    return a;
  const v = Object.keys(a);
  return i.reduce((p, b, y) => (p[v[y]] = b, p), {});
}
function Fe(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || Re(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function $e({
  layout: e,
  panelConstraints: t
}) {
  const n = Object.values(e), r = [...n], a = r.reduce(
    (c, l) => c + l,
    0
  );
  if (r.length !== t.length)
    throw Error(
      `Invalid ${t.length} panel layout: ${r.map((c) => `${c}%`).join(", ")}`
    );
  if (!me(a, 100) && r.length > 0)
    for (let c = 0; c < t.length; c++) {
      const l = r[c];
      X(l != null, `No layout data found for index ${c}`);
      const i = 100 / a * l;
      r[c] = i;
    }
  let o = 0;
  for (let c = 0; c < t.length; c++) {
    const l = n[c];
    X(l != null, `No layout data found for index ${c}`);
    const i = r[c];
    X(i != null, `No layout data found for index ${c}`);
    const d = qe({
      overrideDisabledPanels: !0,
      panelConstraints: t[c],
      prevSize: l,
      size: i
    });
    i != d && (o += i - d, r[c] = d);
  }
  if (!me(o, 0))
    for (let c = 0; c < t.length; c++) {
      const l = r[c];
      X(l != null, `No layout data found for index ${c}`);
      const i = l + o, d = qe({
        overrideDisabledPanels: !0,
        panelConstraints: t[c],
        prevSize: l,
        size: i
      });
      if (l !== d && (o -= d - l, r[c] = d, me(o, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((c, l, i) => (c[s[i]] = l, c), {});
}
function bo({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const l = Ue();
    for (const [
      i,
      {
        defaultLayoutDeferred: d,
        derivedPanelConstraints: u,
        layout: f,
        groupSize: m,
        separatorToPanels: v
      }
    ] of l)
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
    const l = n().derivedPanelConstraints.find(
      (i) => i.panelId === t
    );
    if (l !== void 0)
      return l;
    throw Error(`Panel constraints not found for Panel ${t}`);
  }, a = () => {
    const l = n().group.panels.find((i) => i.id === t);
    if (l !== void 0)
      return l;
    throw Error(`Layout not found for Panel ${t}`);
  }, o = () => {
    const l = n().layout[t];
    if (l !== void 0)
      return l;
    throw Error(`Layout not found for Panel ${t}`);
  }, s = ({
    nextSize: l,
    panels: i,
    prevLayout: d,
    derivedPanelConstraints: u
  }) => {
    const f = o(), m = i.findIndex((b) => b.id === t), v = m === 0, p = m === i.length - 1;
    if (p && l < f && (v || i.slice(0, m).every((b, y) => {
      const S = u[y];
      return (S == null ? void 0 : S.collapsible) && me(S.collapsedSize, d[S.panelId]);
    }))) {
      const b = i.slice(0, m).reduce((y, S) => y + d[S.id], 0);
      return {
        ...d,
        [t]: pe(100 - b)
      };
    }
    return gt({
      delta: p ? f - l : l - f,
      initialLayout: d,
      panelConstraints: u,
      pivotIndices: p ? [m - 1, m] : [m, m + 1],
      prevLayout: d,
      trigger: "imperative-api"
    });
  }, c = (l) => {
    const i = o();
    if (l === i)
      return;
    const {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      group: f,
      groupSize: m,
      layout: v,
      separatorToPanels: p
    } = n(), b = s({
      nextSize: l,
      panels: f.panels,
      prevLayout: v,
      derivedPanelConstraints: u
    }), y = $e({
      layout: b,
      panelConstraints: u
    });
    Fe(v, y) || xe(f, {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      groupSize: m,
      layout: y,
      separatorToPanels: p
    });
  };
  return {
    collapse: () => {
      const { collapsible: l, collapsedSize: i } = r(), { mutableValues: d } = a(), u = o();
      l && u !== i && (d.expandToSize = u, c(i));
    },
    expand: () => {
      const { collapsible: l, collapsedSize: i, minSize: d } = r(), { mutableValues: u } = a(), f = o();
      if (l && f === i) {
        let m = u.expandToSize ?? d;
        m === 0 && (m = 1), c(m);
      }
    },
    getSize: () => {
      const { group: l } = n(), i = o(), { element: d } = a(), u = l.orientation === "horizontal" ? d.offsetWidth : d.offsetHeight;
      return {
        asPercentage: i,
        inPixels: u
      };
    },
    isCollapsed: () => {
      const { collapsible: l, collapsedSize: i } = r(), d = o();
      return l && me(i, d);
    },
    resize: (l) => {
      const { group: i } = n(), { element: d } = a(), u = Qe({ group: i }), f = it({
        groupSize: u,
        panelElement: d,
        styleProp: l
      }), m = pe(f / u * 100);
      c(m);
    }
  };
}
function gr(e) {
  if (e.defaultPrevented)
    return;
  const t = Ue();
  An(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (a) => a.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const a = r.panelConstraints.defaultSize, o = bo({
          groupId: n.group.id,
          panelId: r.id
        });
        o && a !== void 0 && (o.resize(a), e.preventDefault());
      }
    }
  });
}
function At(e) {
  const t = Ue();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function yo({
  groupId: e
}) {
  const t = () => {
    const n = Ue();
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
        layout: c,
        separatorToPanels: l
      } = t(), i = $e({
        layout: n,
        panelConstraints: a
      });
      return r ? c : (Fe(c, i) || xe(o, {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: a,
        groupSize: s,
        layout: i,
        separatorToPanels: l
      }), i);
    }
  };
}
function ze(e, t) {
  const n = At(e), r = De(n.id, !0), a = n.separators.find(
    (d) => d.element === e
  );
  X(a, "Matching separator not found");
  const o = r.separatorToPanels.get(a);
  X(o, "Matching panels not found");
  const s = o.map((d) => n.panels.indexOf(d)), c = yo({ groupId: n.id }).getLayout(), l = gt({
    delta: t,
    initialLayout: c,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: c,
    trigger: "keyboard"
  }), i = $e({
    layout: l,
    panelConstraints: r.derivedPanelConstraints
  });
  Fe(c, i) || xe(
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
function br(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = At(t);
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
        const r = At(t), a = De(r.id, !0), { derivedPanelConstraints: o, layout: s, separatorToPanels: c } = a, l = r.separators.find(
          (f) => f.element === t
        );
        X(l, "Matching separator not found");
        const i = c.get(l);
        X(i, "Matching panels not found");
        const d = i[0], u = o.find(
          (f) => f.panelId === d.id
        );
        if (X(u, "Panel metadata not found"), u.collapsible) {
          const f = s[d.id], m = u.collapsedSize === f ? r.mutableState.expandedPanelSizes[d.id] ?? u.minSize : u.collapsedSize;
          ze(t, m - f);
        }
        break;
      }
      case "F6": {
        e.preventDefault();
        const r = At(t).separators.map(
          (s) => s.element
        ), a = Array.from(r).findIndex(
          (s) => s === e.currentTarget
        );
        X(a !== null, "Index not found");
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
function yr(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = Ue(), n = An(e, t), r = /* @__PURE__ */ new Map();
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
function vo({
  document: e,
  event: t,
  hitRegions: n,
  initialLayoutMap: r,
  mountedGroups: a,
  pointerDownAtPoint: o,
  prevCursorFlags: s
}) {
  let c = 0;
  n.forEach((i) => {
    const { group: d, groupSize: u } = i, { orientation: f, panels: m } = d, { disableCursor: v } = d.mutableState;
    let p = 0;
    o ? f === "horizontal" ? p = (t.clientX - o.x) / u * 100 : p = (t.clientY - o.y) / u * 100 : f === "horizontal" ? p = t.clientX < 0 ? -100 : 100 : p = t.clientY < 0 ? -100 : 100;
    const b = r.get(d), y = a.get(d);
    if (!b || !y)
      return;
    const {
      defaultLayoutDeferred: S,
      derivedPanelConstraints: w,
      groupSize: g,
      layout: I,
      separatorToPanels: k
    } = y;
    if (w && I && k) {
      const N = gt({
        delta: p,
        initialLayout: b,
        panelConstraints: w,
        pivotIndices: i.panels.map((M) => m.indexOf(M)),
        prevLayout: I,
        trigger: "mouse-or-touch"
      });
      if (Fe(N, I)) {
        if (p !== 0 && !v)
          switch (f) {
            case "horizontal": {
              c |= p < 0 ? lo : uo;
              break;
            }
            case "vertical": {
              c |= p < 0 ? fo : mo;
              break;
            }
          }
      } else
        xe(i.group, {
          defaultLayoutDeferred: S,
          derivedPanelConstraints: w,
          groupSize: g,
          layout: N,
          separatorToPanels: k
        });
    }
  });
  let l = 0;
  t.movementX === 0 ? l |= s & ir : l |= c & ir, t.movementY === 0 ? l |= s & cr : l |= c & cr, vc(l), Mn(e);
}
function vr(e) {
  const t = Ue(), n = Oe();
  switch (n.state) {
    case "active":
      vo({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function wr(e) {
  var r, a;
  if (e.defaultPrevented)
    return;
  const t = Oe(), n = Ue();
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
          const s = De(o.group.id, !0);
          xe(o.group, s, {
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
      vo({
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
function Sr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (Oe().state) {
      case "hover":
        Ye({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function Ir(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || po(e.currentTarget) && e.preventDefault();
}
function Pr(e) {
  let t = 0, n = 0;
  const r = {};
  for (const o of e)
    if (o.defaultSize !== void 0) {
      t++;
      const s = pe(o.defaultSize);
      n += s, r[o.panelId] = s;
    } else
      r[o.panelId] = void 0;
  const a = e.length - t;
  if (a !== 0) {
    const o = pe((100 - n) / a);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = o);
  }
  return r;
}
function Lc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((l) => l.element === t);
  if (!r || !r.onResize)
    return;
  const a = Qe({ group: e }), o = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, c = {
    asPercentage: pe(o / a * 100),
    inPixels: o
  };
  r.mutableValues.prevSize = c, r.onResize(c, r.id, s);
}
function Cc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function _c({
  group: e,
  nextGroupSize: t,
  prevGroupSize: n,
  prevLayout: r
}) {
  if (n <= 0 || t <= 0 || n === t)
    return r;
  let a = 0, o = 0, s = !1;
  const c = /* @__PURE__ */ new Map(), l = [];
  for (const u of e.panels) {
    const f = r[u.id] ?? 0;
    switch (u.panelConstraints.groupResizeBehavior) {
      case "preserve-pixel-size": {
        s = !0;
        const m = f / 100 * n, v = pe(
          m / t * 100
        );
        c.set(u.id, v), a += v;
        break;
      }
      case "preserve-relative-size":
      default: {
        l.push(u.id), o += f;
        break;
      }
    }
  }
  if (!s || l.length === 0)
    return r;
  const i = 100 - a, d = { ...r };
  if (c.forEach((u, f) => {
    d[f] = u;
  }), o > 0)
    for (const u of l) {
      const f = r[u] ?? 0;
      d[u] = pe(
        f / o * i
      );
    }
  else {
    const u = pe(
      i / l.length
    );
    for (const f of l)
      d[f] = u;
  }
  return d;
}
function Dc(e, t) {
  const n = e.map((a) => a.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const a of n)
    if (!r.includes(a))
      return !1;
  return !0;
}
const We = /* @__PURE__ */ new Map();
function zc(e) {
  let t = !0;
  X(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = new n((v) => {
    for (const p of v) {
      const { borderBoxSize: b, target: y } = p;
      if (y === e.element) {
        if (t) {
          const S = Qe({ group: e });
          if (S === 0)
            return;
          const w = De(e.id);
          if (!w)
            return;
          const g = on(e), I = w.defaultLayoutDeferred ? Pr(g) : w.layout, k = _c({
            group: e,
            nextGroupSize: S,
            prevGroupSize: w.groupSize,
            prevLayout: I
          }), N = $e({
            layout: k,
            panelConstraints: g
          });
          if (!w.defaultLayoutDeferred && Fe(w.layout, N) && Cc(
            w.derivedPanelConstraints,
            g
          ) && w.groupSize === S)
            return;
          xe(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: g,
            groupSize: S,
            layout: N,
            separatorToPanels: w.separatorToPanels
          });
        }
      } else
        Lc(e, y, b);
    }
  });
  o.observe(e.element), e.panels.forEach((v) => {
    X(
      !r.has(v.id),
      `Panel ids must be unique; id "${v.id}" was used more than once`
    ), r.add(v.id), v.onResize && o.observe(v.element);
  });
  const s = Qe({ group: e }), c = on(e), l = e.panels.map(({ id: v }) => v).join(",");
  let i = e.mutableState.defaultLayout;
  i && (Dc(e.panels, i) || (i = void 0));
  const d = e.mutableState.layouts[l] ?? i ?? Pr(c), u = $e({
    layout: d,
    panelConstraints: c
  }), f = e.element.ownerDocument;
  We.set(
    f,
    (We.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return io(e).forEach((v) => {
    v.separator && m.set(v.separator, v.panels);
  }), xe(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: c,
    groupSize: s,
    layout: u,
    separatorToPanels: m
  }), e.separators.forEach((v) => {
    X(
      !a.has(v.id),
      `Separator ids must be unique; id "${v.id}" was used more than once`
    ), a.add(v.id), v.element.addEventListener("keydown", br);
  }), We.get(f) === 1 && (f.addEventListener("contextmenu", fr, !0), f.addEventListener("dblclick", gr, !0), f.addEventListener("pointerdown", yr, !0), f.addEventListener("pointerleave", vr), f.addEventListener("pointermove", wr), f.addEventListener("pointerout", Sr), f.addEventListener("pointerup", Ir, !0)), function() {
    t = !1, We.set(
      f,
      Math.max(0, (We.get(f) ?? 0) - 1)
    ), Ic(e), e.separators.forEach((v) => {
      v.element.removeEventListener("keydown", br);
    }), We.get(f) || (f.removeEventListener(
      "contextmenu",
      fr,
      !0
    ), f.removeEventListener(
      "dblclick",
      gr,
      !0
    ), f.removeEventListener(
      "pointerdown",
      yr,
      !0
    ), f.removeEventListener("pointerleave", vr), f.removeEventListener("pointermove", wr), f.removeEventListener("pointerout", Sr), f.removeEventListener("pointerup", Ir, !0)), o.disconnect();
  };
}
function Oc() {
  const [e, t] = L({}), n = A(() => t({}), []);
  return [e, n];
}
function Nn(e) {
  const t = hn();
  return `${e ?? t}`;
}
const Be = typeof window < "u" ? je : O;
function dt(e) {
  const t = C(e);
  return Be(() => {
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
  return dt((t) => {
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
  const t = C({ ...e });
  return Be(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const wo = fn(null);
function Fc(e, t) {
  const n = C({
    getLayout: () => ({}),
    setLayout: wc
  });
  un(t, () => n.current, []), Be(() => {
    Object.assign(
      n.current,
      yo({ groupId: e })
    );
  });
}
function So({
  children: e,
  className: t,
  defaultLayout: n,
  disableCursor: r,
  disabled: a,
  elementRef: o,
  groupRef: s,
  id: c,
  onLayoutChange: l,
  onLayoutChanged: i,
  orientation: d = "horizontal",
  resizeTargetMinimumSize: u = {
    coarse: 20,
    fine: 10
  },
  style: f,
  ...m
}) {
  const v = C({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), p = dt((R) => {
    Fe(v.current.onLayoutChange, R) || (v.current.onLayoutChange = R, l == null || l(R));
  }), b = dt(
    (R, P) => {
      Fe(v.current.onLayoutChanged, R) || (v.current.onLayoutChanged = R, i == null || i(R, { isUserInteraction: P }));
    }
  ), y = Nn(c), S = C(null), [w, g] = Oc(), I = C({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: u,
    separators: []
  }), k = xn(S, o);
  Fc(y, s);
  const N = dt(
    (R, P) => {
      const T = Oe(), D = ur(R), F = De(R);
      if (F) {
        let U = !1;
        switch (T.state) {
          case "active": {
            U = T.hitRegions.some(
              (Z) => Z.group === D
            );
            break;
          }
        }
        return {
          flexGrow: F.layout[P] ?? 1,
          pointerEvents: U ? "none" : void 0
        };
      }
      if (n != null && n[P])
        return {
          flexGrow: n == null ? void 0 : n[P]
        };
    }
  ), M = Ln({
    defaultLayout: n,
    disableCursor: r
  }), _ = V(
    () => ({
      get disableCursor() {
        return !!M.disableCursor;
      },
      getPanelStyles: N,
      id: y,
      orientation: d,
      registerPanel: (R) => {
        const P = I.current;
        return P.panels = an(d, [
          ...P.panels,
          R
        ]), g(), () => {
          P.panels = P.panels.filter(
            (T) => T !== R
          ), g();
        };
      },
      registerSeparator: (R) => {
        const P = I.current;
        return P.separators = an(d, [
          ...P.separators,
          R
        ]), g(), () => {
          P.separators = P.separators.filter(
            (T) => T !== R
          ), g();
        };
      },
      updatePanelProps: (R, { disabled: P }) => {
        const T = I.current.panels.find(
          (U) => U.id === R
        );
        T && (T.panelConstraints.disabled = P);
        const D = ur(y), F = De(y);
        D && F && xe(D, {
          ...F,
          derivedPanelConstraints: on(D)
        });
      },
      updateSeparatorProps: (R, {
        disabled: P,
        disableDoubleClick: T
      }) => {
        const D = I.current.separators.find(
          (F) => F.id === R
        );
        D && (D.disabled = P, D.disableDoubleClick = T);
      }
    }),
    [N, y, g, d, M]
  ), E = C(null);
  return Be(() => {
    const R = S.current;
    if (R === null)
      return;
    const P = I.current;
    let T;
    if (M.defaultLayout !== void 0 && Object.keys(M.defaultLayout).length === P.panels.length) {
      T = {};
      for (const W of P.panels) {
        const G = M.defaultLayout[W.id];
        G !== void 0 && (T[W.id] = G);
      }
    }
    const D = {
      disabled: !!a,
      element: R,
      id: y,
      mutableState: {
        defaultLayout: T,
        disableCursor: !!M.disableCursor,
        expandedPanelSizes: I.current.lastExpandedPanelSizes,
        layouts: I.current.layouts
      },
      orientation: d,
      panels: P.panels,
      resizeTargetMinimumSize: P.resizeTargetMinimumSize,
      separators: P.separators
    };
    E.current = D;
    const F = zc(D), { defaultLayoutDeferred: U, derivedPanelConstraints: Z, layout: B } = De(D.id, !0);
    !U && Z.length > 0 && (p(B), b(B, !1));
    const K = kn(y, (W) => {
      const { defaultLayoutDeferred: G, derivedPanelConstraints: ae, layout: j } = W.next;
      if (G || ae.length === 0)
        return;
      const q = D.panels.map(({ id: ne }) => ne).join(",");
      D.mutableState.layouts[q] = j, ae.forEach((ne) => {
        if (ne.collapsible) {
          const { layout: he } = W.prev ?? {};
          if (he) {
            const ye = me(
              ne.collapsedSize,
              j[ne.panelId]
            ), de = me(
              ne.collapsedSize,
              he[ne.panelId]
            );
            ye && !de && (D.mutableState.expandedPanelSizes[ne.panelId] = he[ne.panelId]);
          }
        }
      });
      const Q = Oe().state !== "active";
      p(j), Q && b(j, W.isUserInteraction);
    });
    return () => {
      E.current = null, F(), K();
    };
  }, [
    a,
    y,
    b,
    p,
    d,
    w,
    M
  ]), O(() => {
    const R = E.current;
    R && (R.mutableState.defaultLayout = n, R.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ h(wo.Provider, { value: _, children: /* @__PURE__ */ h(
    "div",
    {
      ...m,
      className: t,
      "data-group": !0,
      "data-testid": y,
      id: y,
      ref: k,
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
So.displayName = "Group";
function Cn() {
  const e = mn(wo);
  return X(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function $c(e, t) {
  const { id: n } = Cn(), r = C({
    collapse: qt,
    expand: qt,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: qt
  });
  un(t, () => r.current, []), Be(() => {
    Object.assign(
      r.current,
      bo({ groupId: n, panelId: e })
    );
  });
}
function sn({
  children: e,
  className: t,
  collapsedSize: n = "0%",
  collapsible: r = !1,
  defaultSize: a,
  disabled: o,
  elementRef: s,
  groupResizeBehavior: c = "preserve-relative-size",
  id: l,
  maxSize: i = "100%",
  minSize: d = "0%",
  onResize: u,
  panelRef: f,
  style: m,
  ...v
}) {
  const p = !!l, b = Nn(l), y = Ln({
    disabled: o
  }), S = C(null), w = xn(S, s), {
    getPanelStyles: g,
    id: I,
    orientation: k,
    registerPanel: N,
    updatePanelProps: M
  } = Cn(), _ = u !== null, E = dt(
    (D, F, U) => {
      u == null || u(D, l, U);
    }
  );
  Be(() => {
    const D = S.current;
    if (D !== null) {
      const F = {
        element: D,
        id: b,
        idIsStable: p,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: _ ? E : void 0,
        panelConstraints: {
          groupResizeBehavior: c,
          collapsedSize: n,
          collapsible: r,
          defaultSize: a,
          disabled: y.disabled,
          maxSize: i,
          minSize: d
        }
      };
      return N(F);
    }
  }, [
    c,
    n,
    r,
    a,
    _,
    b,
    p,
    i,
    d,
    E,
    N,
    y
  ]), O(() => {
    M(b, { disabled: o });
  }, [o, b, M]), $c(b, f);
  const R = () => {
    const D = g(I, b);
    if (D)
      return JSON.stringify(D);
  }, P = Co(
    (D) => kn(I, D),
    R,
    R
  );
  let T;
  return P ? T = JSON.parse(P) : a !== void 0 ? T = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: a
  } : T = { flexGrow: 1 }, /* @__PURE__ */ h(
    "div",
    {
      ...v,
      "data-disabled": o || void 0,
      "data-panel": !0,
      "data-testid": b,
      id: b,
      ref: w,
      style: {
        ...jc,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...T
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
            touchAction: k === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
sn.displayName = "Panel";
const jc = {
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
function Uc({
  layout: e,
  panelConstraints: t,
  panelId: n,
  panelIndex: r
}) {
  let a, o;
  const s = e[n], c = t.find(
    (l) => l.panelId === n
  );
  if (c) {
    const l = c.maxSize, i = c.collapsible ? c.collapsedSize : c.minSize, d = [r, r + 1];
    o = $e({
      layout: gt({
        delta: i - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], a = $e({
      layout: gt({
        delta: l - s,
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
function Io({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: a,
  id: o,
  style: s,
  ...c
}) {
  const l = Nn(o), i = Ln({
    disabled: n,
    disableDoubleClick: r
  }), [d, u] = L({}), [f, m] = L("inactive"), [v, p] = L(!1), b = C(null), y = xn(b, a), {
    disableCursor: S,
    id: w,
    orientation: g,
    registerSeparator: I,
    updateSeparatorProps: k
  } = Cn(), N = g === "horizontal" ? "vertical" : "horizontal";
  Be(() => {
    const E = b.current;
    if (E !== null) {
      const R = {
        disabled: i.disabled,
        disableDoubleClick: i.disableDoubleClick,
        element: E,
        id: l
      }, P = I(R), T = yc(
        (F) => {
          m(
            F.next.state !== "inactive" && F.next.hitRegions.some(
              (U) => U.separator === R
            ) ? F.next.state : "inactive"
          );
        }
      ), D = kn(
        w,
        (F) => {
          const { derivedPanelConstraints: U, layout: Z, separatorToPanels: B } = F.next, K = B.get(R);
          if (K) {
            const W = K[0], G = K.indexOf(W);
            u(
              Uc({
                layout: Z,
                panelConstraints: U,
                panelId: W.id,
                panelIndex: G
              })
            );
          }
        }
      );
      return () => {
        T(), D(), P();
      };
    }
  }, [w, l, I, i]), O(() => {
    k(l, { disabled: n, disableDoubleClick: r });
  }, [n, r, l, k]);
  let M;
  n && !S && (M = "not-allowed");
  let _;
  if (n)
    _ = "disabled";
  else
    switch (f) {
      case "active": {
        _ = "active";
        break;
      }
      default:
        v ? _ = "focus" : _ = f;
    }
  return /* @__PURE__ */ h(
    "div",
    {
      ...c,
      "aria-controls": d.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": N,
      "aria-valuemax": d.valueMax,
      "aria-valuemin": d.valueMin,
      "aria-valuenow": d.valueNow,
      children: e,
      className: t,
      "data-separator": _,
      "data-testid": l,
      id: l,
      onBlur: () => p(!1),
      onFocus: () => p(!0),
      ref: y,
      role: "separator",
      style: {
        flexBasis: "auto",
        cursor: M,
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
Io.displayName = "Separator";
const _n = 30, Dn = 65, bt = 50, Bc = 100 - Dn, Hc = 100 - _n;
function Wc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Dn, Math.max(_n, t)) : bt;
}
function zn(e) {
  return 100 - e;
}
function Je(e) {
  return `${e}%`;
}
const On = "reader-document", yt = "reader-assistant", Po = "retainpdf.reader.ai-split-layout.v1", Jc = {
  [On]: zn(bt),
  [yt]: bt
};
function Fn(e) {
  const t = Wc(e == null ? void 0 : e[yt]);
  return {
    [On]: zn(t),
    [yt]: t
  };
}
function Kc() {
  try {
    const e = JSON.parse(localStorage.getItem(Po) || "null");
    return Fn(e);
  } catch {
    return Jc;
  }
}
function qc(e) {
  try {
    localStorage.setItem(Po, JSON.stringify(Fn(e)));
  } catch {
  }
}
function Vt(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = Fn(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[yt]}vw`
  );
}
function Vc() {
  const e = C(null), [t] = L(Kc);
  je(() => {
    const a = e.current;
    return Vt(a, t), () => {
      var o;
      (o = a == null ? void 0 : a.closest(".reader-react-root")) == null || o.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = A((a) => {
    Vt(e.current, a);
  }, []), r = A((a, o) => {
    Vt(e.current, a), o.isUserInteraction && qc(a);
  }, []);
  return /* @__PURE__ */ x(
    So,
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
          sn,
          {
            id: On,
            defaultSize: Je(zn(bt)),
            minSize: Je(Bc),
            maxSize: Je(Hc)
          }
        ),
        /* @__PURE__ */ h(
          Io,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ h("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ h(
          sn,
          {
            id: yt,
            defaultSize: Je(bt),
            minSize: Je(_n),
            maxSize: Je(Dn)
          }
        )
      ]
    }
  );
}
const Ce = 12, Gc = 4;
function Ve(e, t, n) {
  if (typeof window > "u") return { x: e, y: t };
  const r = Math.min(n, window.innerWidth - Ce * 2), a = Math.max(Ce, window.innerWidth - r - Ce), o = Math.min(window.innerHeight * 0.9, 860), s = Math.max(Ce, window.innerHeight - o - Ce);
  return {
    x: Math.min(a, Math.max(Ce, e)),
    y: Math.min(s, Math.max(Ce, t))
  };
}
function Rr(e) {
  if (typeof window > "u") return { x: 24, y: 72 };
  const t = Math.min(e, window.innerWidth - Ce * 2);
  return Ve(window.innerWidth - t - 20, 72, e);
}
function Yc(e, t) {
  try {
    const n = localStorage.getItem(e);
    if (!n) return Rr(t);
    const r = JSON.parse(n);
    if (typeof r.x == "number" && typeof r.y == "number")
      return Ve(r.x, r.y, t);
  } catch {
  }
  return Rr(t);
}
function Zc(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
}
function $n({
  id: e,
  open: t,
  title: n,
  subtitle: r = "拖动标题可移动",
  titleIcon: a,
  storageKey: o,
  ariaLabel: s,
  className: c = "",
  width: l = 360,
  placement: i = "floating",
  showHeader: d = !0,
  keepMounted: u = !1,
  onClose: f,
  toolbar: m,
  children: v
}) {
  const p = i === "workspace", b = i === "dock-right", y = b || p, [S, w] = L(() => Yc(o, l)), [g, I] = L(!1), k = C(null);
  O(() => {
    !t || y || w((E) => Ve(E.x, E.y, l));
  }, [y, t, l]), O(() => {
    if (!t || y) return;
    const E = () => w((R) => Ve(R.x, R.y, l));
    return window.addEventListener("resize", E), () => window.removeEventListener("resize", E);
  }, [y, t, l]), O(() => {
    if (!t) return;
    const E = (R) => {
      var T;
      if (R.key !== "Escape") return;
      const P = R.target;
      (T = P == null ? void 0 : P.closest) != null && T.call(P, "textarea, input, select, [contenteditable='true']") || (R.preventDefault(), f());
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [t, f]);
  const N = A((E) => {
    var R, P;
    y || E.button === 0 && ((P = (R = E.target) == null ? void 0 : R.closest) != null && P.call(R, "button") || (E.currentTarget.setPointerCapture(E.pointerId), k.current = {
      pointerId: E.pointerId,
      startX: E.clientX,
      startY: E.clientY,
      originX: S.x,
      originY: S.y,
      moved: !1
    }, I(!0)));
  }, [y, S.x, S.y]), M = A((E) => {
    const R = k.current;
    if (!R || R.pointerId !== E.pointerId) return;
    const P = E.clientX - R.startX, T = E.clientY - R.startY;
    !R.moved && Math.hypot(P, T) < Gc || (R.moved = !0, w(Ve(R.originX + P, R.originY + T, l)));
  }, [l]), _ = A((E) => {
    const R = k.current;
    if (!(!R || R.pointerId !== E.pointerId)) {
      k.current = null, I(!1);
      try {
        E.currentTarget.releasePointerCapture(E.pointerId);
      } catch {
      }
      R.moved && w((P) => {
        const T = Ve(P.x, P.y, l);
        return Zc(o, T), T;
      });
    }
  }, [o, l]);
  return !t && !u ? null : /* @__PURE__ */ x(
    "aside",
    {
      id: e,
      className: `reader-notes-panel reader-notes-panel--${p ? "workspace" : b ? "docked" : "float"}${y ? "" : " reader-floating-surface"}${d ? " has-panel-header" : " is-headerless"}${m ? " has-panel-toolbar" : ""}${g ? " is-dragging" : ""} ${c}`.trim(),
      style: y ? void 0 : { left: S.x, top: S.y, width: Math.min(l, typeof window < "u" ? window.innerWidth - 24 : l) },
      "aria-label": s,
      role: "dialog",
      "aria-modal": "false",
      "data-hidden": t ? void 0 : "",
      inert: t ? void 0 : !0,
      "aria-hidden": t ? void 0 : !0,
      children: [
        d ? /* @__PURE__ */ x(
          "header",
          {
            className: "reader-notes-panel-head",
            onPointerDown: N,
            onPointerMove: M,
            onPointerUp: _,
            onPointerCancel: _,
            children: [
              y ? null : /* @__PURE__ */ h("div", { className: "reader-notes-panel-drag", "aria-hidden": "true", children: /* @__PURE__ */ h(oa, { size: 14, strokeWidth: 2.25 }) }),
              /* @__PURE__ */ x("div", { className: "reader-notes-panel-head-text", children: [
                /* @__PURE__ */ x("strong", { children: [
                  a,
                  n
                ] }),
                r ? /* @__PURE__ */ h("span", { children: r }) : null
              ] }),
              /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-close reader-floating-close", "aria-label": `关闭${n}`, onClick: f, children: /* @__PURE__ */ h(et, { size: 14, strokeWidth: 2.5, "aria-hidden": !0 }) })
            ]
          }
        ) : null,
        m ? /* @__PURE__ */ h("div", { className: "reader-notes-panel-toolbar", children: m }) : null,
        /* @__PURE__ */ h("div", { className: "reader-notes-panel-body", children: v })
      ]
    }
  );
}
function Xc({
  note: e,
  onJump: t,
  onUpdateNote: n,
  onRemove: r
}) {
  const [a, o] = L(!1), [s, c] = L(e.note);
  return O(() => {
    a || c(e.note);
  }, [e.note, a]), /* @__PURE__ */ x("article", { className: "reader-notes-item", children: [
    /* @__PURE__ */ x("div", { className: "reader-notes-item-top", children: [
      /* @__PURE__ */ h("span", { className: "reader-notes-kind", children: e.pane === "translated" ? "译文" : "原文" }),
      /* @__PURE__ */ x("div", { className: "reader-notes-item-actions", children: [
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-link", onClick: () => t(e), children: "定位" }),
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-danger", onClick: () => r(e.id), children: "删除" })
      ] })
    ] }),
    /* @__PURE__ */ h("p", { className: "reader-notes-quote", children: e.quote }),
    a ? /* @__PURE__ */ x("div", { className: "reader-notes-editor", children: [
      /* @__PURE__ */ h(
        "textarea",
        {
          className: "reader-notes-textarea",
          value: s,
          placeholder: "写点想法…",
          rows: 3,
          onChange: (l) => c(l.target.value)
        }
      ),
      /* @__PURE__ */ x("div", { className: "reader-notes-editor-actions", children: [
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
function Qc({
  open: e,
  groups: t,
  count: n,
  onClose: r,
  onJump: a,
  onUpdateNote: o,
  onRemove: s,
  onExport: c
}) {
  const [l, i] = L(!1);
  return /* @__PURE__ */ h(
    $n,
    {
      id: "reader-notes-panel",
      open: e,
      title: "批注",
      subtitle: "选中 PDF 文字后可添加 · 本地保存",
      titleIcon: /* @__PURE__ */ h(bn, { size: 14, strokeWidth: 2.25, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.notes-float.pos.v1",
      ariaLabel: "批注",
      onClose: r,
      toolbar: /* @__PURE__ */ x(vt, { children: [
        /* @__PURE__ */ x("span", { className: "reader-notes-count", children: [
          n,
          " 条"
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            disabled: l || n === 0,
            onClick: async () => {
              await c() && (i(!0), window.setTimeout(() => i(!1), 1800));
            },
            children: l ? "已复制" : "导出 Markdown"
          }
        )
      ] }),
      children: n === 0 ? /* @__PURE__ */ h("p", { className: "reader-notes-empty", children: "暂无批注。在 PDF 上拖选文字，点「添加批注」。" }) : t.map((d) => /* @__PURE__ */ x("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ x("h3", { className: "reader-notes-group-title", children: [
          "第 ",
          d.page,
          " 页"
        ] }),
        d.items.map((u) => /* @__PURE__ */ h(
          Xc,
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
function el({
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
  return /* @__PURE__ */ x("div", { className: "reader-error-notice", role: "status", "data-reader-error-notice": "true", children: [
    /* @__PURE__ */ x("span", { className: "reader-error-notice-text", children: [
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
function tl({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: a = !1,
  metadataError: o = !1
}) {
  return !e && !t ? /* @__PURE__ */ h(el, { regionsFailed: a, metadataFailed: o }) : /* @__PURE__ */ x(vt, { children: [
    e ? /* @__PURE__ */ h("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ x("div", { className: "reader-boot-loading-card", children: [
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
async function nl(e) {
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
function rl({
  selection: e,
  onDismiss: t,
  onAskAi: n,
  onAddNote: r
}) {
  const [a, o] = L(!1), s = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if (O(() => o(!1), [s]), !e)
    return null;
  const c = typeof window < "u" ? window.innerWidth : 800, l = typeof window < "u" ? window.innerHeight : 600, i = e.rect.left + e.rect.width / 2, d = 170, u = Math.min(Math.max(16 + d, i), c - 16 - d), f = e.rect.top > 72, m = f ? Math.max(12, e.rect.top - 8) : Math.min(l - 12, e.rect.top + e.rect.height + 8), v = f ? "above" : "below", p = e.pane === "translated" ? "译文" : "原文", b = e.selectionType === "text" ? "text" : e.kind, y = e.selectionType === "text" ? e.quote : Dr(e.region, e.pane), S = b === "formula" ? "公式" : b === "table" ? "表格" : b === "figure" ? "图片" : b === "text" ? "文字" : "区域", w = b === "formula" ? qo(y) : y, g = b === "formula" ? aa : b === "table" ? sa : b === "text" ? ia : ca;
  return /* @__PURE__ */ x(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${v} reader-sel-pop--region`,
      style: { left: u, top: m },
      role: "toolbar",
      "aria-label": "选区操作",
      onPointerDown: (I) => {
        I.preventDefault();
      },
      children: [
        /* @__PURE__ */ x("div", { className: "reader-sel-pop-card reader-floating-surface", children: [
          /* @__PURE__ */ x("div", { className: "reader-sel-pop-context", children: [
            /* @__PURE__ */ h(g, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { children: S }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ h("span", { children: p }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ x("span", { children: [
              e.page,
              " 页"
            ] })
          ] }),
          /* @__PURE__ */ x("div", { className: "reader-sel-pop-actions", children: [
            w ? /* @__PURE__ */ x(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--primary",
                onClick: async () => {
                  try {
                    await nl(w), o(!0), window.setTimeout(() => o(!1), 1400);
                  } catch (I) {
                    console.warn("[reader-selection] copy failed", I);
                  }
                },
                children: [
                  a ? /* @__PURE__ */ h(la, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ h(da, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: a ? "已复制" : b === "formula" ? "复制 LaTeX" : "复制" })
                ]
              }
            ) : /* @__PURE__ */ h("span", { className: "reader-sel-pop-selection-hint", children: "已选择图片" }),
            r && w ? /* @__PURE__ */ x(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => r({ page: e.page, pane: e.pane, quote: w }),
                children: [
                  /* @__PURE__ */ h(bn, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: "添加批注" })
                ]
              }
            ) : null,
            n ? /* @__PURE__ */ x(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => n(e),
                children: [
                  /* @__PURE__ */ h(gn, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
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
function ol(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function al() {
  const [e, t] = L(!1), n = hn(), r = C(null);
  return O(() => {
    if (!e) return;
    const a = (s) => {
      const c = r.current;
      c && s.target instanceof Node && !c.contains(s.target) && t(!1);
    }, o = (s) => {
      s.key === "Escape" && (s.preventDefault(), t(!1));
    };
    return document.addEventListener("mousedown", a), window.addEventListener("keydown", o), () => {
      document.removeEventListener("mousedown", a), window.removeEventListener("keydown", o);
    };
  }, [e]), O(() => {
    const a = (o) => {
      if (o.defaultPrevented || o.metaKey || o.ctrlKey || o.altKey || ol(o.target)) return;
      const s = o.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !o.shiftKey)
          return;
        o.preventDefault(), t((c) => !c);
      }
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, []), /* @__PURE__ */ x("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
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
        children: /* @__PURE__ */ h(ua, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    ),
    e ? /* @__PURE__ */ x(
      "div",
      {
        id: n,
        className: "reader-react-shortcuts-panel reader-floating-surface",
        role: "dialog",
        "aria-label": "阅读器快捷键",
        children: [
          /* @__PURE__ */ x("div", { className: "reader-react-shortcuts-head", children: [
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
          /* @__PURE__ */ h("div", { className: "reader-react-shortcuts-body", children: fi.map((a) => /* @__PURE__ */ x("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ h("h3", { children: a.title }),
            /* @__PURE__ */ h("ul", { children: a.items.map((o) => /* @__PURE__ */ x("li", { children: [
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
const sl = Object.freeze([
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
]), il = ["source", "sideBySide", "translated"], cl = { source: "", translated: "", sideBySide: "" };
function ll(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = ft(e.sourceUrl), n = ft(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return Aa({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function dl(e) {
  const [t, n] = L(() => /* @__PURE__ */ new Set()), r = V(
    () => e ? ll(e) : cl,
    [e]
  ), a = V(
    () => il.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), o = A(async (s) => {
    if (!e) return;
    const c = ft(r[s]);
    if (!(!c || t.has(s)))
      try {
        const l = e.jobId ? ka(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await Na(
          e.fetchProtected,
          c,
          l,
          l,
          null,
          (i) => n((d) => {
            const u = new Set(d);
            return i ? u.add(s) : u.delete(s), u;
          })
        );
      } catch (l) {
        const i = l instanceof Error ? l.message : "下载失败";
        xa(i), n((d) => {
          const u = new Set(d);
          return u.delete(s), u;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: a, busyActions: t, handleDownload: o };
}
function ul(e) {
  const [t, n] = L(!1), r = A(() => n(!1), []), a = A(() => n((o) => !o), []);
  return O(() => {
    if (!t) return;
    const o = (c) => {
      const l = e.current;
      l && c.target instanceof Node && !l.contains(c.target) && n(!1);
    }, s = (c) => {
      c.key === "Escape" && (c.preventDefault(), n(!1));
    };
    return document.addEventListener("mousedown", o), window.addEventListener("keydown", s), () => {
      document.removeEventListener("mousedown", o), window.removeEventListener("keydown", s);
    };
  }, [t, e]), { open: t, setOpen: n, closeMenu: r, toggleMenu: a };
}
const Ro = "retainpdf.reader.fab.pos.v1", zt = 52, Ke = 12, fl = 6;
function ut(e, t) {
  if (typeof window > "u")
    return { x: e, y: t };
  const n = Math.max(Ke, window.innerWidth - zt - Ke), r = Math.max(Ke, window.innerHeight - zt - Ke);
  return {
    x: Math.min(n, Math.max(Ke, e)),
    y: Math.min(r, Math.max(Ke, t))
  };
}
function Tr() {
  return typeof window > "u" ? { x: 24, y: 120 } : ut(
    window.innerWidth - zt - 20,
    window.innerHeight - zt - 88
  );
}
function ml() {
  try {
    const e = localStorage.getItem(Ro);
    if (!e) return Tr();
    const t = JSON.parse(e);
    if (typeof t.x == "number" && typeof t.y == "number")
      return ut(t.x, t.y);
  } catch {
  }
  return Tr();
}
function hl(e) {
  try {
    localStorage.setItem(Ro, JSON.stringify(e));
  } catch {
  }
}
function pl(e) {
  return typeof window < "u" && e.y > window.innerHeight * 0.55;
}
function gl(e = {}) {
  const { onDragStart: t, onActivate: n } = e, [r, a] = L(() => ml()), o = C(null);
  O(() => {
    const i = () => a((d) => ut(d.x, d.y));
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
  }, [r.x, r.y]), c = A((i) => {
    const d = o.current;
    if (!d || d.pointerId !== i.pointerId) return;
    const u = i.clientX - d.startX, f = i.clientY - d.startY;
    !d.moved && Math.hypot(u, f) < fl || (d.moved || (d.moved = !0, t == null || t()), a(ut(d.originX + u, d.originY + f)));
  }, [t]), l = A((i) => {
    const d = o.current;
    if (!(!d || d.pointerId !== i.pointerId)) {
      o.current = null;
      try {
        i.currentTarget.releasePointerCapture(i.pointerId);
      } catch {
      }
      if (d.moved) {
        a((u) => {
          const f = ut(u.x, u.y);
          return hl(f), f;
        });
        return;
      }
      n == null || n();
    }
  }, [n]);
  return {
    pos: r,
    openUp: pl(r),
    onPointerDown: s,
    onPointerMove: c,
    onPointerUp: l
  };
}
const bl = {
  source: zr,
  sideBySide: Or,
  translated: Fr
}, yl = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function vl({ onClose: e }) {
  return /* @__PURE__ */ x("header", { className: "reader-fab-menu-head", children: [
    /* @__PURE__ */ x("div", { className: "reader-fab-menu-head-text", children: [
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
function Er({
  index: e,
  icon: t,
  title: n,
  sub: r,
  active: a,
  disabled: o,
  onClick: s,
  badge: c
}) {
  return /* @__PURE__ */ x(
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
        /* @__PURE__ */ x("span", { className: "reader-fab-row-copy", children: [
          /* @__PURE__ */ h("span", { className: "reader-fab-row-title", children: n }),
          /* @__PURE__ */ h("span", { className: "reader-fab-row-sub", children: r })
        ] }),
        c ? /* @__PURE__ */ h("span", { className: "reader-fab-row-badge", children: c }) : null
      ]
    }
  );
}
function wl({
  urls: e,
  items: t,
  busyActions: n,
  onDownload: r
}) {
  return /* @__PURE__ */ x("div", { className: "reader-fab-section", role: "group", "aria-label": "下载", children: [
    /* @__PURE__ */ x("div", { className: "reader-fab-section-head", children: [
      /* @__PURE__ */ h(fa, { size: 12, strokeWidth: 2.5, "aria-hidden": !0 }),
      /* @__PURE__ */ h("span", { children: "下载 PDF" })
    ] }),
    /* @__PURE__ */ h("div", { className: "reader-fab-download-grid", children: t.map((a, o) => {
      const s = Fo[a], c = ft(e[a]), l = n.has(a), i = !!c && !l, d = i ? "" : $o(a, e), u = bl[a];
      return /* @__PURE__ */ x(
        "button",
        {
          type: "button",
          role: "menuitem",
          id: `reader-fab-download-${a}`,
          className: `reader-fab-chip${l ? " is-busy" : ""}${i ? "" : " is-disabled"}`,
          disabled: !i,
          title: i ? `下载${s.label}` : d,
          onClick: () => void r(a),
          style: { "--fab-i": o },
          children: [
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-icon", "aria-hidden": "true", children: /* @__PURE__ */ h(u, { size: 16, strokeWidth: 2 }) }),
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-label", children: yl[a] }),
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-state", children: l ? "…" : i ? "↓" : "—" })
          ]
        },
        a
      );
    }) }),
    t.every((a) => !ft(e[a])) ? /* @__PURE__ */ h("p", { className: "reader-fab-empty", children: "产物尚未就绪" }) : null
  ] });
}
const Mr = {
  favorites: ma,
  markdown: $r,
  ai: gn,
  notes: bn,
  "ai-notes": jr
}, Sl = sl, Il = [
  { id: "notes", title: "批注", idle: "本地批注 · 导出" },
  { id: "ai-notes", title: "AI 批注", idle: "agent 标在页面上" }
];
function Pl(e) {
  const { activeTool: t, noteCount: n, aiNoteCount: r, onToggleTool: a } = e, o = It(), s = e.sourceOnly ?? (o == null ? void 0 : o.sourceOnly) ?? !1, c = e.download ?? (o == null ? void 0 : o.download), l = C(null), i = hn(), { open: d, setOpen: u, closeMenu: f, toggleMenu: m } = ul(l), { pos: v, openUp: p, onPointerDown: b, onPointerMove: y, onPointerUp: S } = gl({
    onDragStart: f,
    onActivate: m
  }), { urls: w, downloadItems: g, busyActions: I, handleDownload: k } = dl(c), N = A((M) => {
    a(M), u(!1);
  }, [a, u]);
  return /* @__PURE__ */ x(
    "div",
    {
      ref: l,
      className: `reader-fab${d ? " is-open" : ""}${p ? " is-open-up" : ""}`,
      style: { left: v.x, top: v.y },
      "data-reader-fab": "",
      children: [
        d ? /* @__PURE__ */ x(
          "div",
          {
            id: i,
            className: "reader-fab-menu reader-floating-surface",
            role: "menu",
            "aria-label": "阅读工具",
            children: [
              /* @__PURE__ */ h(vl, { onClose: f }),
              Il.map((M, _) => {
                const E = t === M.id;
                return /* @__PURE__ */ h(
                  Er,
                  {
                    index: _ - 1,
                    icon: Mr[M.id],
                    title: M.title,
                    sub: E ? "关闭悬浮窗" : M.idle,
                    active: E,
                    disabled: !1,
                    badge: M.id === "notes" ? n : r,
                    onClick: () => N(M.id)
                  },
                  M.id
                );
              }),
              Sl.map((M, _) => {
                const E = Mr[M.id], R = t === M.id, P = M.needsJob && s;
                let T = R ? M.subOpen : M.subIdle;
                return P && (T = "需打开任务阅读"), /* @__PURE__ */ h(
                  Er,
                  {
                    index: _ + 1,
                    icon: E,
                    title: M.label,
                    sub: T,
                    active: R,
                    disabled: P,
                    onClick: () => N(M.id)
                  },
                  M.id
                );
              }),
              /* @__PURE__ */ h(
                wl,
                {
                  urls: w,
                  items: g,
                  busyActions: I,
                  onDownload: k
                }
              )
            ]
          }
        ) : null,
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: `reader-fab-trigger${d ? " is-open" : ""}${t ? " has-active-tool" : ""}`,
            "aria-label": d ? "收起工具菜单" : "打开工具菜单",
            "aria-expanded": d,
            "aria-controls": d ? i : void 0,
            "aria-haspopup": "menu",
            onPointerDown: b,
            onPointerMove: y,
            onPointerUp: S,
            onPointerCancel: S,
            children: /* @__PURE__ */ h("span", { className: "reader-fab-icon", "aria-hidden": "true", children: d ? /* @__PURE__ */ h(et, { size: 20, strokeWidth: 2.5 }) : /* @__PURE__ */ x("span", { className: "reader-fab-dots", children: [
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
function Rl(e) {
  const t = It(), n = Yi(), { mode: r = "compare", modeControls: a } = e, o = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? St, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), c = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, l = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, i = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), d = hs(o), u = o > Wr + 1e-3, f = o < Jr - 1e-3, m = lt(), v = "50%（半屏，对照铺满）", [p, b] = L(!1), [y, S] = L(`${c}`);
  O(() => {
    p || S(`${Math.min(Math.max(c, 1), Math.max(l, 1))}`);
  }, [c, l, p]);
  const w = () => {
    if (b(!1), !i || l <= 0)
      return;
    const g = Number(`${y}`.trim());
    i(Dt(g, l));
  };
  return /* @__PURE__ */ x("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    a ? /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-modes", children: a }) : null,
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group", "aria-label": "页码", children: p ? /* @__PURE__ */ x(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (g) => {
          g.preventDefault(), w();
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
              onChange: (g) => S(g.target.value.replace(/[^\d]/g, "")),
              onBlur: w,
              onKeyDown: (g) => {
                g.key === "Escape" && (g.preventDefault(), b(!1), S(`${c}`));
              }
            }
          ),
          /* @__PURE__ */ x("span", { className: "reader-react-hud-page-suffix", children: [
            "/ ",
            l || "—"
          ] })
        ]
      }
    ) : /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-react-hud-page reader-react-hud-page-btn",
        "aria-label": l > 0 ? `跳转页码，当前第 ${c} 页，共 ${l} 页` : "页码",
        title: l > 0 ? "点击输入页码跳转" : void 0,
        disabled: !i || l <= 0,
        onClick: () => {
          !i || l <= 0 || (S(`${c}`), b(!0));
        },
        children: l > 0 ? `${Math.min(c, l)} / ${l}` : "—"
      }
    ) }),
    /* @__PURE__ */ x("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "缩小",
          disabled: !u,
          onClick: () => s(pt(o, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ x(
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
          onClick: () => s(pt(o, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ h(al, {}) })
  ] });
}
function Ot(e) {
  const t = `${e.documentId || ""}`.trim();
  if (t)
    return `${Nt}doc:${t}`;
  const n = `${e.jobId || ""}`.trim();
  return n ? `${Nt}job:${n}` : `${Nt}anonymous`;
}
const Nt = "retainpdf.reader.notes.v1:";
function Tl(e) {
  const t = `${e.jobId || ""}`.trim();
  if (!t)
    return [];
  const n = `${Nt}job:${t}`;
  return n === Ot(e) ? [] : [n];
}
function El() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ml(e) {
  return {
    pageIdx: Number(e.page) - 1,
    quoteText: e.quote,
    note: e.note,
    createdAt: e.createdAt
  };
}
function To(e) {
  return Yo(e, (t) => t.page);
}
function kl(e) {
  return Xo(e, (t) => t.page).map((t) => ({ page: t.pageIdx, items: t.items }));
}
function Al(e, t) {
  return Zo({
    title: e,
    annotations: t.map(Ml)
  });
}
function Nl(e) {
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
function cn(e) {
  try {
    return Nl(localStorage.getItem(e));
  } catch {
    return [];
  }
}
function xl(...e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const r of n)
      t.has(r.id) || t.set(r.id, r);
  return To([...t.values()]);
}
function Ll(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch (r) {
    return console.warn("[reader-notes] persist failed", r), !1;
  }
  const n = new Set(cn(e).map((r) => r.id));
  return t.every((r) => n.has(r.id));
}
function kr(e) {
  if (typeof localStorage > "u")
    return [];
  const t = Ot(e), n = cn(t), r = Tl(e).map((o) => ({ key: o, notes: cn(o) })).filter((o) => o.notes.length > 0);
  if (r.length === 0)
    return n;
  const a = xl(n, ...r.map((o) => o.notes));
  if (!Ll(t, a))
    return a;
  for (const o of r)
    try {
      localStorage.removeItem(o.key);
    } catch {
    }
  return a;
}
function Cl(e, t) {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.setItem(e, JSON.stringify(t));
    } catch (n) {
      console.warn("[reader-notes] persist failed", n);
    }
}
function _l(e, t = {}) {
  const n = V(
    () => ({
      jobId: `${e.jobId || ""}`.trim(),
      documentId: `${e.documentId || ""}`.trim()
    }),
    [e.jobId, e.documentId]
  ), [r, a] = L(() => ({
    key: Ot(n),
    notes: kr(n)
  })), o = r.notes, s = A(
    (v) => {
      a((p) => ({
        key: p.key,
        notes: typeof v == "function" ? v(p.notes) : v
      }));
    },
    []
  ), c = t.onAfterAdd, l = Ot(n);
  O(() => {
    a((v) => v.key === l ? v : { key: l, notes: kr(n) });
  }, [n, l]), O(() => {
    Cl(r.key, r.notes);
  }, [r]);
  const i = A((v) => {
    const p = `${v.quote || ""}`.trim();
    if (!p)
      return null;
    const b = {
      id: El(),
      page: Math.max(1, Math.floor(Number(v.page) || 1)),
      pane: v.pane === "translated" ? "translated" : "source",
      quote: p,
      note: `${v.note || ""}`.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s((y) => To([b, ...y])), c == null || c(), b;
  }, [c]), d = A((v, p) => {
    const b = `${p || ""}`.trim();
    s((y) => y.map((S) => S.id === v ? { ...S, note: b } : S));
  }, []), u = A((v) => {
    s((p) => p.filter((b) => b.id !== v));
  }, []), f = A(async (v = "") => {
    var b, y;
    const p = Al(v, o);
    try {
      return await ((y = (b = navigator.clipboard) == null ? void 0 : b.writeText) == null ? void 0 : y.call(b, p)), !0;
    } catch (S) {
      return console.error("[reader-notes] copy failed", S), !1;
    }
  }, [o]), m = V(() => kl(o), [o]);
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
const ln = "download-toast";
function Dl({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: a = "progress"
}) {
  const o = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ x("div", { className: "download-toast-card reader-floating-surface", "data-tone": a, "aria-live": "polite", children: [
    /* @__PURE__ */ x("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ h("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ h("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ h("div", { className: "download-toast-track", children: /* @__PURE__ */ h("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${o}%` } }) }),
    /* @__PURE__ */ h("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function zl(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: a = "等待响应...",
    percent: o = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    Gt.dismiss(ln);
    return;
  }
  Gt.custom(
    () => /* @__PURE__ */ h(Dl, { title: n, status: r, meta: a, percent: o, tone: s }),
    { id: ln, duration: 1 / 0 }
  );
}
function Ol() {
  const e = A((t) => {
    t && (t.setState = zl, t.hide = () => Gt.dismiss(ln));
  }, []);
  return /* @__PURE__ */ x(vt, { children: [
    /* @__PURE__ */ h(Qo, { position: "bottom-right" }),
    /* @__PURE__ */ h("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function xt(e) {
  const t = C(!1);
  return e && (t.current = !0), t.current;
}
function Fl({
  panel: e,
  active: t,
  context: n
}) {
  var l, i;
  const r = t === e.id, a = xt(r);
  if (!(e.keepMounted ? a : r)) return null;
  const s = ce(), c = e.slot === "terminal" ? (l = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : l.call(s, {
    open: r,
    sessionKey: n.sessionKey,
    onClose: n.onClose
  }) : (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, {
    open: r,
    jobId: n.jobId,
    onJump: n.onJump,
    onClose: n.onClose
  });
  return c == null ? null : /* @__PURE__ */ h(
    $n,
    {
      id: `reader-${e.id}-panel`,
      open: r,
      title: e.label,
      storageKey: e.storageKey,
      ariaLabel: e.ariaLabel,
      width: e.width,
      keepMounted: e.keepMounted,
      placement: "workspace",
      showHeader: !1,
      className: "is-pane-right",
      onClose: n.onClose,
      children: c
    }
  );
}
const Ar = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注"
};
function $l({
  note: e,
  anchorRect: t,
  onJump: n,
  onClose: r
}) {
  const a = C(null);
  return O(() => {
    const o = (s) => {
      s.key === "Escape" && r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [r]), O(() => {
    const o = (s) => {
      var l, i;
      const c = a.current;
      !c || c.contains(s.target) || (i = (l = s.target) == null ? void 0 : l.closest) != null && i.call(l, ".reader-ai-note-mark") || r();
    };
    return document.addEventListener("pointerdown", o, !0), () => document.removeEventListener("pointerdown", o, !0);
  }, [r]), /* @__PURE__ */ x(
    "div",
    {
      ref: a,
      className: `reader-ai-note-popover is-${e.kind}`,
      role: "dialog",
      "aria-label": `${Ar[e.kind]}批注`,
      style: {
        left: t.left + t.width + 8,
        top: t.top
      },
      children: [
        /* @__PURE__ */ x("header", { className: "reader-ai-note-popover-head", children: [
          /* @__PURE__ */ h("span", { className: `reader-ai-note-kind is-${e.kind}`, children: Ar[e.kind] }),
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
        e.refs.length > 0 ? /* @__PURE__ */ h("ul", { className: "reader-ai-note-refs", children: e.refs.map((o, s) => /* @__PURE__ */ h("li", { children: /* @__PURE__ */ x(
          "button",
          {
            type: "button",
            className: "reader-ai-note-ref",
            onClick: () => {
              n({ page_idx: o.pageIdx ?? void 0, block_id: o.blockId }), r();
            },
            children: [
              o.label,
              o.pageIdx != null ? /* @__PURE__ */ x("span", { className: "reader-ai-note-ref-page", children: [
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
const jl = ["question", "warning", "link", "term", "note"];
function ct(e) {
  return typeof e == "string" ? e.trim() : "";
}
function Nr(e) {
  if (!e || typeof e != "object") return null;
  const t = e, n = ct(t.block_id);
  if (!n) return null;
  const r = typeof t.page_idx == "number" && Number.isFinite(t.page_idx) ? Math.max(0, Math.floor(t.page_idx)) : null;
  return { blockId: n, pageIdx: r };
}
function Ul(e) {
  const t = Math.round(Number(e));
  return t === 1 || t === 2 ? t : 3;
}
function Bl(e) {
  if (!e || typeof e != "object") return null;
  const t = e.notes;
  if (!Array.isArray(t)) return null;
  const n = [], r = /* @__PURE__ */ new Set();
  return t.forEach((a, o) => {
    if (!a || typeof a != "object") return;
    const s = a, c = Nr(s.anchor), l = ct(s.text);
    if (!c || !l) return;
    const i = ct(s.id) || `ai-note-${o}`;
    if (r.has(i)) return;
    r.add(i);
    const d = ct(s.kind), u = Array.isArray(s.refs) ? s.refs.flatMap((f) => {
      const m = Nr(f);
      if (!m) return [];
      const v = ct(f == null ? void 0 : f.label);
      return [{ ...m, label: v || m.blockId }];
    }) : [];
    n.push({
      id: i,
      anchor: c,
      kind: jl.includes(d) ? d : "note",
      level: Ul(s.level),
      text: l,
      refs: u,
      weak: u.length === 0
    });
  }), n.length === 0 ? null : { notes: n, weakCount: n.filter((a) => a.weak).length };
}
const Eo = Number.MAX_SAFE_INTEGER;
function Hl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = n.anchor.pageIdx ?? Eo, a = t.get(r);
    a ? a.push(n) : t.set(r, [n]);
  }
  return [...t.entries()].sort((n, r) => n[0] - r[0]).map(([n, r]) => ({ page: n, items: r }));
}
function Wl(e, t) {
  return e.filter((n) => n.level <= t);
}
const Jl = {
  question: "存疑",
  warning: "当心",
  link: "跨页",
  term: "术语",
  note: "笔记"
}, xr = 2;
function Kl({
  open: e,
  doc: t,
  onClose: n,
  onJump: r
}) {
  const [a, o] = L(xr), s = (t == null ? void 0 : t.notes) ?? [], c = Wl(s, a), l = Hl(c);
  return /* @__PURE__ */ h(
    $n,
    {
      id: "reader-ai-notes-panel",
      open: e,
      title: "AI 批注",
      subtitle: "agent 标在页面上 · 点一条跳过去",
      titleIcon: /* @__PURE__ */ h(jr, { size: 14, strokeWidth: 2.25, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.ai-notes-float.pos.v1",
      ariaLabel: "AI 批注",
      onClose: n,
      toolbar: /* @__PURE__ */ x(vt, { children: [
        /* @__PURE__ */ x("span", { className: "reader-notes-count", children: [
          c.length,
          " 条"
        ] }),
        s.length > c.length ? /* @__PURE__ */ x(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            onClick: () => o(3),
            children: [
              "显示全部 ",
              s.length,
              " 条"
            ]
          }
        ) : null,
        a === 3 && s.length > 0 ? /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            onClick: () => o(xr),
            children: "只看重点"
          }
        ) : null
      ] }),
      children: s.length === 0 ? (
        // 这段是这个功能唯一的说明书。写不清楚的话，面板开出来是空的，和"功能
        // 坏了"长得一模一样。
        /* @__PURE__ */ x("p", { className: "reader-notes-empty", children: [
          "还没有 AI 批注。在终端里让 fx 标一遍，比如：",
          /* @__PURE__ */ h("code", { children: "把第 3 节的隐含前提和跨页依赖标到 ./notes.v1.json 上" }),
          "标完这里会自己出现，不用刷新。"
        ] })
      ) : l.map((i) => /* @__PURE__ */ x("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ h("h3", { className: "reader-notes-group-title", children: i.page === Eo ? "未标页码" : `第 ${i.page + 1} 页` }),
        i.items.map((d) => /* @__PURE__ */ x(
          "button",
          {
            type: "button",
            className: "reader-ai-note-row",
            "data-kind": d.kind,
            "data-weak": d.weak ? "" : void 0,
            onClick: () => r({ page_idx: d.anchor.pageIdx ?? void 0, block_id: d.anchor.blockId }),
            children: [
              /* @__PURE__ */ h("span", { className: "reader-ai-note-kind", children: Jl[d.kind] }),
              /* @__PURE__ */ h("span", { className: "reader-ai-note-text", children: d.text }),
              d.refs.length > 0 ? (
                // refs 是这份数据里最有价值的部分（见 shared/data/ai-notes.ts：
                // 指向别处的批注才不是复述）。列表里先让人看见有没有。
                /* @__PURE__ */ x("span", { className: "reader-ai-note-refs", children: [
                  "↗ ",
                  d.refs.length,
                  " 处关联"
                ] })
              ) : null
            ]
          },
          d.id
        ))
      ] }, i.page))
    }
  );
}
const ql = 5e3;
function Vl(e) {
  const [t, n] = L(null);
  return O(() => {
    if (!e) {
      n(null);
      return;
    }
    let r = !1, a = "";
    const o = async () => {
      var d;
      const c = (d = ce()) == null ? void 0 : d.defaultReaderDataPort;
      if (!(c != null && c.loadAiNotes)) return;
      const l = await c.loadAiNotes(e);
      if (r) return;
      const i = l == null ? "" : JSON.stringify(l);
      i !== a && (a = i, n(Bl(l)));
    };
    o();
    const s = setInterval(() => void o(), ql);
    return () => {
      r = !0, clearInterval(s);
    };
  }, [e]), t;
}
const Gl = pn(() => import("./ReaderFavoritesPanel-CK0vLqly.js").then((e) => ({ default: e.ReaderFavoritesPanel }))), Yl = pn(() => import("./ReaderMarkdownPanel-DR2IonnB.js").then((e) => ({ default: e.ReaderMarkdownPanel }))), Zl = pn(() => import("./ReaderAiPanel-fPn_SXsg.js").then((e) => ({ default: e.ReaderAiPanel }))), Xl = [];
function Ql(e) {
  return "workspace";
}
function ed(e) {
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
function td(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function Lr(e, t) {
  var n, r, a, o;
  return e === "compare" ? null : Kr(t == null ? void 0 : t.assistantPanel) ? t.assistantPanel : ((n = t == null ? void 0 : t.splitLayout) == null ? void 0 : n.left) === "ai" || ((r = t == null ? void 0 : t.splitLayout) == null ? void 0 : r.right) === "ai" ? "ai" : ((a = t == null ? void 0 : t.splitLayout) == null ? void 0 : a.left) === "markdown" || ((o = t == null ? void 0 : t.splitLayout) == null ? void 0 : o.right) === "markdown" ? "markdown" : null;
}
function nd() {
  const e = di(), { boot: t, panes: n, sessionFiles: r, tools: a, session: o } = e, [s, c] = L(() => Lr(e.mode, Ne(e.viewStateKey))), [l, i] = L(null), [d, u] = L(null), [f, m] = L(!1), v = C(e.viewStateKey), p = C(null), b = s !== null, y = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, S = ed({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: y,
    liveTranslationVisible: f,
    assistantOpen: b,
    assistantPdfPane: l
  }), w = S.sourceViewOnly, g = S.visibleMode, [I, k] = L(!1), [N, M] = L(!1), _ = A(() => k(!0), []), E = A(() => k(($) => !$), []), R = _l(
    { jobId: o.jobId, documentId: o.documentId },
    { onAfterAdd: _ }
  ), P = A(($) => {
    R.addFromQuote($), e.clearSelection();
  }, [R.addFromQuote, e.clearSelection]), T = A(($) => {
    e.goToPage($.page, $.pane === "translated" ? "translated" : "source");
  }, [e.goToPage]), D = A(
    () => R.exportMarkdown(o.title || ""),
    [R.exportMarkdown, o.title]
  );
  O(() => {
    u(null), m(!0), k(!1);
  }, [e.viewStateKey]), O(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), O(() => {
    if (!t.loading) {
      if (v.current !== e.viewStateKey) {
        v.current = e.viewStateKey;
        const $ = Ne(e.viewStateKey);
        c(Lr(e.mode, $)), i(null);
        return;
      }
      _t(e.viewStateKey, { assistantPanel: s, splitLayout: null });
    }
  }, [s, t.loading, e.mode, e.viewStateKey]), O(() => {
    if (!(t.loading || t.failed)) {
      if (p.current !== e.viewStateKey) {
        p.current = e.viewStateKey;
        const $ = Ne(e.viewStateKey), le = w ? "source" : $ == null ? void 0 : $.mode;
        le && le !== e.mode && e.setModeKeepingPage(le);
        return;
      }
      _t(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, w]);
  const F = s || (e.mode === "compare" ? "compare" : "reading"), U = xt(a.isOpen("favorites")), Z = xt(s === "markdown"), B = xt(s === "ai");
  pi({
    mode: g,
    sourceOnly: e.sourceOnly,
    setMode: e.setModeKeepingPage,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    currentPage: e.currentPage,
    numPages: n.hudNumPages,
    goToPage: e.goToPage,
    enabled: e.showHud
  });
  const K = A(() => {
    a.close();
  }, [a]), W = A(() => {
    c(null), i(null), u(null);
  }, []), G = A(($) => {
    const le = g === "translated" ? "translated" : "source";
    e.jumpToAnchor($, le);
  }, [e.jumpToAnchor, g]), ae = A(($) => {
    o.refreshCommittedDocument($);
  }, [o.refreshCommittedDocument]), j = A(($) => {
    a.close(), i(null);
    const le = td($, e.liveTranslationAvailable);
    le !== null && m(le), e.setModeKeepingPage($);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage, a]), q = V(() => !y || !S.showSource ? null : /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m(($) => !$),
      "aria-pressed": f,
      title: f ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ), [y, S.showSource, f]), Q = A(($) => {
    c($), $ !== "ai" && u(null);
  }, []), ne = A(($) => {
    if ($ === "notes") {
      E();
      return;
    }
    if ($ === "ai-notes") {
      M((le) => !le);
      return;
    }
    if ($ === "markdown" || $ === "ai") {
      s === $ ? (c(null), i(null), u(null)) : (c($), i(null), $ !== "ai" && u(null));
      return;
    }
    a.toggle($);
  }, [s, E, a]), he = ws(s) ? null : s, ye = I ? "notes" : N ? "ai-notes" : he ?? a.active, de = Vl(o.jobId), [fe, Ee] = L(null), ee = A(($, le) => {
    Ee((Pe) => (Pe == null ? void 0 : Pe.note.id) === $.id ? null : { note: $, rect: le });
  }, []), te = A(() => Ee(null), []);
  O(() => {
    Ee(null);
  }, [o.jobId]);
  const se = V(() => ({
    jobId: o.jobId,
    sessionKey: o.jobId || o.documentId || "reader",
    onJump: G,
    onClose: W
  }), [W, G, o.documentId, o.jobId]), be = A(($) => {
    const le = $.pane === "translated" && !w ? "translated" : "source";
    u($), c("ai"), i(le), e.clearSelection();
  }, [e.clearSelection, w]), ue = V(() => ({
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
    aiNotes: (de == null ? void 0 : de.notes) ?? Xl,
    activeAiNoteId: (fe == null ? void 0 : fe.note.id) ?? null,
    onSelectAiNote: ee,
    readerMetadata: o.readerMetadata,
    activeRegion: e.activeRegion,
    onSelectRegion: e.selectRegion,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: w,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: Q, close: W }
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
    Q,
    W
  ]), Ie = V(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), tt = [
    ss,
    `is-workspace-${F}`,
    b ? "is-assistant-open" : "",
    S.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ h(Gi, { value: ue, hud: Ie, children: /* @__PURE__ */ x("div", { className: tt, "data-reader-engine": "react-pdf", "data-reader-workspace": F, children: [
    /* @__PURE__ */ h(tl, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ h(Si, { onBeforeClose: o.prepareClose }),
    /* @__PURE__ */ h(
      oc,
      {
        mode: g,
        documentReady: !!o.jobId,
        sourceViewOnly: w,
        onModeChange: j,
        liveTranslation: y ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m(($) => !$)
        } : null
      }
    ),
    /* @__PURE__ */ h(cc, { active: s }),
    b ? /* @__PURE__ */ h(Vc, {}) : null,
    e.showHud ? /* @__PURE__ */ h(Pl, { activeTool: ye, noteCount: R.count, aiNoteCount: (de == null ? void 0 : de.notes.length) ?? 0, onToggleTool: ne }) : null,
    /* @__PURE__ */ h(ec, { paneComposition: S, markdownSplit: s === "markdown", assistantSplit: b, liveTranslation: e.liveTranslation, sourcePaneAction: q }),
    e.showHud ? /* @__PURE__ */ h(
      Rl,
      {
        mode: g,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ x(_o, { fallback: null, children: [
      U ? /* @__PURE__ */ h(Gl, { open: a.isOpen("favorites"), jobId: o.jobId, documentId: o.documentId, onClose: K, onJumpPage: e.goToPage }) : null,
      oo.map(($) => /* @__PURE__ */ h(
        Fl,
        {
          panel: $,
          active: s,
          context: se
        },
        $.id
      )),
      Z ? /* @__PURE__ */ h(Yl, { open: s === "markdown", jobId: o.jobId, sourceOnly: e.sourceOnly, layout: "workspace", side: "right", onClose: W }) : null,
      B ? /* @__PURE__ */ h(Zl, { open: s === "ai", jobId: o.jobId, documentId: o.documentId, sessionIdentity: o.sessionIdentity, layout: Ql(e.mode), side: "right", selectionContext: d, onClearSelectionContext: () => u(null), onClose: W, onJumpCitation: G, onDocumentCommitted: ae }, o.documentId || o.jobId || "reader-ai-pending") : null
    ] }),
    fe ? /* @__PURE__ */ h(
      $l,
      {
        note: fe.note,
        anchorRect: fe.rect,
        onJump: G,
        onClose: te
      }
    ) : null,
    /* @__PURE__ */ h(
      Kl,
      {
        open: N,
        doc: de,
        onClose: () => M(!1),
        onJump: G
      }
    ),
    /* @__PURE__ */ h(
      Qc,
      {
        open: I,
        groups: R.groups,
        count: R.count,
        onClose: () => k(!1),
        onJump: T,
        onUpdateNote: R.updateNote,
        onRemove: R.remove,
        onExport: D
      }
    ),
    /* @__PURE__ */ h(rl, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: be, onAddNote: P }),
    /* @__PURE__ */ h(Ol, {})
  ] }) });
}
function Md() {
  return /* @__PURE__ */ h(nd, {});
}
export {
  vn as A,
  Md as R,
  nd as a,
  $n as b,
  Ed as c,
  vd as d,
  yd as e,
  Td as f,
  Sd as g,
  wd as h,
  Id as i,
  Rd as j,
  Pd as r
};
//# sourceMappingURL=ReaderApp-DxkYkYMl.js.map
