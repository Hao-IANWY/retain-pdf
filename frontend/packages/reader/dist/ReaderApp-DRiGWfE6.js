var Tn = (e) => {
  throw TypeError(e);
};
var En = (e, t, n) => t.has(e) || Tn("Cannot " + n);
var Ke = (e, t, n) => (En(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Mn = (e, t, n) => t.has(e) ? Tn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), An = (e, t, n, r) => (En(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as D, jsx as y, Fragment as Rt } from "react/jsx-runtime";
import { useMemo as J, useState as C, useEffect as $, useCallback as _, useRef as A, useLayoutEffect as xe, memo as en, forwardRef as ho, useImperativeHandle as tn, createContext as nn, useContext as rn, useSyncExternalStore as go, useId as hr, Suspense as bo, lazy as yo } from "react";
import { requireAdapter as qe, getReaderAdapters as fe } from "./adapters.js";
import { resolveReaderDownloadName as vo, resolveReaderDownloadUrls as So, READER_PROGRESS_COPY as Se, trimString as yt, READER_DOWNLOAD_ACTIONS as wo, disabledReason as Po } from "./runtime/state.js";
import "@retainpdf/api/conversations";
import { r as Ro, b as Io } from "./page-config-Ct7qR5rm.js";
import { c as To, n as Eo, f as Nt, j as $t, a as Mo, b as Ao, i as gr, p as It, g as br, r as yr, k as kn, e as ko, h as No } from "./reader-regions-DJ7L9Ej-.js";
import { isReaderTransportError as Co, createReaderTransportError as Lo } from "./contracts.js";
import { sortByPageAndCreatedAt as xo, buildAnnotationsMarkdown as _o, groupByPageAndCreatedAt as zo } from "./runtime/content.js";
import { toast as jt, Toaster as Do } from "sonner";
import { X as on, Radio as Fo, FileText as vr, Columns2 as Sr, Languages as wr, PanelRightClose as Oo, StickyNote as Pr, FileCode2 as $o, Sparkles as Rr, Sigma as jo, Table2 as Uo, Type as Bo, Image as Ho, Check as Wo, Copy as Jo, Keyboard as Vo, Download as qo } from "lucide-react";
import { pdfjs as Ko, Page as Go, Document as Zo } from "react-pdf";
import { e as Yo, m as Xo, a as Qo } from "./markdown-math-XkF5urpn.js";
const ea = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, ta = "", na = Object.freeze({
  progress: "retainpdf-reader-progress"
}), ra = (e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, Ml = (...e) => {
  var n;
  return (((n = fe()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Te = () => qe("defaultReaderDataPort"), Nn = () => qe("defaultReaderPageConfigPort"), Al = {
  get apiPrefix() {
    return Te().apiPrefix;
  },
  fetchProtected: (...e) => Te().fetchProtected(...e),
  loadMarkdownPayload: (e) => Te().loadMarkdownPayload(e),
  loadMarkdownSource: (e) => Te().loadMarkdownSource(e),
  loadMarkdownRange: (e, t, n, r, o) => Te().loadMarkdownRange(e, t, n, r, o),
  loadJobPayload: (e) => Te().loadJobPayload(e),
  loadReaderPayload: (e, t) => Te().loadReaderPayload(e, t),
  get liveTranslation() {
    return Te().liveTranslation;
  }
}, Ir = {
  messageTargetOrigin: () => Nn().messageTargetOrigin(),
  readerJobId: () => Nn().readerJobId()
}, oa = () => {
  var e;
  return ((e = fe()) == null ? void 0 : e.liveTranslation) ?? null;
}, tt = () => {
  var t;
  const e = fe();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, an = () => {
  const e = fe();
  if (e != null && e.sessionData) return e.sessionData;
  const t = e == null ? void 0 : e.defaultReaderDataPort;
  if (!t) throw new Error("Reader adapter missing: defaultReaderDataPort (call setReaderAdapters)");
  return {
    loadReaderPayload: t.loadReaderPayload,
    loadJobPayload: t.loadJobPayload,
    fetchDocumentByJobId: (...n) => qe("fetchDocumentByJobId")(...n),
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
}, aa = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, sa = () => {
  var e, t;
  return ((t = (e = fe()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, ia = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, ca = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? vo(...e);
}, la = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? So(...e);
}, da = (...e) => qe("downloadProtectedResource")(...e), ua = (...e) => qe("failDownloadToast")(...e), kl = (e, t) => qe("resolveMarkdownAssetUrl")(e, t), fa = "/api/v1";
function ma() {
  const e = () => {
    var r;
    return Ro(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = C(e);
  return $(() => {
    var c, i, l, d;
    const r = () => n(e()), o = (i = (c = globalThis.history) == null ? void 0 : c.pushState) == null ? void 0 : i.bind(globalThis.history), a = (d = (l = globalThis.history) == null ? void 0 : l.replaceState) == null ? void 0 : d.bind(globalThis.history);
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
function pa() {
  const e = ma(), t = J(() => ia(Ir), [e]), n = J(() => sa(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function ha(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: o,
    documentIdRef: a,
    sessionJobIdRef: s,
    switchToSourceMode: c
  } = e, [i, l] = C({
    documentId: "",
    jobId: ""
  }), [d, u] = C({
    documentId: "",
    jobId: ""
  }), f = i.documentId === t ? i.jobId : "", m = d.documentId === t ? d.jobId : "", b = n || f, [p, g] = C({
    jobId: "",
    documentId: ""
  }), v = p.jobId === b ? p.documentId : "", S = t || v, w = !!t && !b, [h, P] = C(null), E = (h == null ? void 0 : h.sessionIdentity) === r && h.documentId === S ? h : null, M = w || !!E, F = _((k) => {
    const I = `${k.documentId || ""}`.trim();
    if (!I || a.current && a.current !== I) return;
    if (!a.current && s.current)
      g({
        jobId: s.current,
        documentId: I
      });
    else if (!a.current)
      return;
    const R = `${k.revision || ""}`.trim() || `${Date.now()}`;
    P({
      documentId: I,
      revision: R,
      sessionIdentity: o.current
    }), c();
  }, []);
  $(() => {
    P((k) => k && k.sessionIdentity !== r ? null : k);
  }, [r]);
  const L = _((k) => {
    switch (k.type) {
      case "resolved-document-job":
        l({ documentId: k.documentId, jobId: k.jobId });
        break;
      case "cleared-resolved-document-job":
        l({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        u({ documentId: k.documentId, jobId: k.jobId });
        break;
      case "resolved-job-document":
        g((I) => I.jobId === k.jobId && I.documentId === k.documentId ? I : { jobId: k.jobId, documentId: k.documentId });
        break;
      case "committed-source":
        P({
          documentId: k.documentId,
          revision: k.revision,
          sessionIdentity: k.sessionIdentity
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
    rejectedDocumentJobId: m,
    sessionJobId: b,
    resolvedJobDocument: p,
    setResolvedJobDocument: g,
    jobDocumentId: v,
    documentId: S,
    sourceOnly: w,
    committedDocumentSource: h,
    setCommittedDocumentSource: P,
    activeCommittedDocumentSource: E,
    sourceViewOnly: M,
    refreshCommittedDocument: F,
    applyIdentityEvent: L
  };
}
const ga = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Cn(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function ba(e) {
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
function Ln(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return ra(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function ya(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function va(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !ya(a, t))
      return a.replace(/\.pdf$/i, "");
  }
  return "";
}
function Ut({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: na.progress,
        stage: n,
        percent: e,
        text: t
      },
      Ir.messageTargetOrigin()
    );
  } catch {
  }
}
function vt(e, t, n, r = "progress") {
  e({
    loading: !0,
    percent: t,
    text: n,
    stage: r,
    failed: !1
  }), Ut({ percent: t, text: n, stage: r });
}
function Sa(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [c, i] = C(null), [l, d] = C(null), [u, f] = C(""), [m, b] = C(0), p = u === n ? c : null, g = u === n ? l : null, v = Cn(p), S = ga.has(v), w = _(() => {
    b((L) => L + 1);
  }, []), h = _((L) => {
    i(L.jobPayload), d(L.manifestPayload), f(L.sessionIdentity);
  }, []), P = _((L) => {
    i(null), d(null), f(L);
  }, []), E = A(""), M = A(""), F = _(async () => {
    const L = o.current;
    if (!L || E.current === L) return;
    const k = an().loadJobPayload;
    if (typeof k != "function") return;
    const I = a.current.value;
    E.current = L;
    try {
      const R = await k(L);
      if (s.current || a.current.value !== I || o.current !== L || !R || typeof R != "object")
        return;
      const T = Cn(R);
      i(R), f(r.current), T === "succeeded" && M.current !== L && (M.current = L, b((x) => x + 1));
    } catch {
    } finally {
      E.current === L && (E.current = "");
    }
  }, []);
  return $(() => {
    M.current = "";
  }, [n]), $(() => {
    if (!t || S || !p) return;
    const L = window.setInterval(() => {
      F();
    }, 1e3);
    return () => window.clearInterval(L);
  }, [S, F, p, t]), {
    jobPayload: c,
    setJobPayload: i,
    manifestPayload: l,
    setManifestPayload: d,
    payloadSessionIdentity: u,
    setPayloadSessionIdentity: f,
    scopedJobPayload: p,
    scopedManifestPayload: g,
    jobStatus: v,
    jobTerminal: S,
    jobRefreshRevision: m,
    refreshJobArtifacts: w,
    refreshJobStatus: F,
    publishPayload: h,
    clearPayload: P
  };
}
function Bt(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function wa(e, t) {
  e(t), Bt(t);
}
function Pa(e) {
  const [t, n] = C(e ? "source" : "compare"), r = _((a) => {
    e && a !== "source" || (n(a), Bt(a));
  }, [e]), o = _((a) => {
    wa(n, a);
  }, []);
  return $(() => (e && document.documentElement.classList.add("reader-source-only"), Bt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: o };
}
function xn(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function Ra(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: xn(n.active_job_id),
    activeVersionId: xn(n.active_version_id)
  };
}
function Ia(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function Ta(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function Ea(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function Ma(e) {
  return e ? { data: e.data.slice() } : null;
}
const Aa = 2, he = /* @__PURE__ */ new Map();
function Ht(e, t) {
  he.delete(e), he.set(e, t);
}
function ka(e) {
  if (he.size < Aa) return;
  const t = he.keys().next().value;
  t && he.delete(t);
}
function Ct(e) {
  const t = `${e || ""}`.trim();
  if (!t || !he.has(t)) return null;
  const n = he.get(t);
  return Ht(t, n), n;
}
async function Tr(e, t = tt().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (he.has(r)) {
    const c = he.get(r);
    return Ht(r, c), c;
  }
  const o = await t(r, { signal: n.signal });
  if (!o.ok) {
    const c = new Error(`读取 PDF 失败 (${o.status})`);
    throw c.status = o.status, c;
  }
  const a = await o.arrayBuffer(), s = { data: new Uint8Array(a) };
  return he.has(r) ? Ht(r, s) : (ka(), he.set(r, s)), s;
}
function Na(e = "", t = null) {
  const [n, r] = C(
    () => t || Ct(e)
  ), [o, a] = C(
    () => !!`${e || ""}`.trim() && !t && !Ct(e)
  ), [s, c] = C("");
  return $(() => {
    if (t) {
      r(t), a(!1), c("");
      return;
    }
    const i = `${e || ""}`.trim();
    if (!i) {
      r(null), a(!1), c("");
      return;
    }
    const l = Ct(i);
    if (l) {
      r(l), a(!1), c("");
      return;
    }
    let d = !1;
    return a(!0), c(""), r(null), Tr(i).then((u) => {
      d || (r(u), a(!1));
    }).catch((u) => {
      d || (r(null), a(!1), c((u == null ? void 0 : u.message) || String(u)));
    }), () => {
      d = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function Ca(e) {
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
  vt(s, r, n, "download");
  const c = await Tr(t, tt().fetchProtected, {
    signal: a.signal
  });
  return a.isInactive() ? null : (vt(s, o, n, "download"), c);
}
async function La(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: o } = e;
  vt(o, 25, "正在下载 PDF…", "download");
  const a = [];
  let s = null, c = null;
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
      c = d;
    })
  ), await Promise.all(a), r.isInactive() ? { status: "inactive" } : !!t && !s || !!n && !c ? { status: "incomplete" } : { status: "downloaded", sourceBytes: s, translatedBytes: c };
}
const ft = {
  regions: null,
  metadata: null
};
function xa(e) {
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
    switchSessionMode: m,
    jobRefreshRevision: b,
    sessionEpochRef: p,
    closingRef: g,
    activeLoadAbortRef: v
  } = e, [S, w] = C(""), [h, P] = C(""), [E, M] = C(null), [F, L] = C(null), [k, I] = C(!1), [R, T] = C(""), [x, N] = C([]), [j, B] = C(() => ({
    source: null,
    translated: null
  })), [Z, te] = C(
    ft
  ), [re, O] = C({
    loading: !0,
    percent: 4,
    text: Se.boot,
    stage: "progress",
    failed: !1
  });
  return $(() => {
    const U = new AbortController(), ne = p.current.value, ee = Ca({
      sessionEpochRef: p,
      closingRef: g,
      abort: U,
      sessionEpoch: ne
    });
    v.current = U;
    const q = an();
    if (g.current)
      return U.abort(), () => {
        v.current === U && (v.current = null);
      };
    function oe(Y, V) {
      ee.markFailed(), O({
        loading: !1,
        percent: 100,
        text: Y,
        stage: "failed",
        failed: !0
      }), Ut({ percent: 100, text: V, stage: "failed" });
    }
    function de() {
      I(!0), O({
        loading: !1,
        percent: 100,
        text: Se.ready,
        stage: "ready",
        failed: !1
      }), Ut({ percent: 100, text: Se.ready, stage: "ready" });
    }
    function ue() {
      return l != null && l.documentId ? Ln(
        l.documentId,
        l.revision
      ) : ea() ? ta : q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function De() {
      let Y = { activeJobId: "", activeVersionId: "" };
      try {
        const me = await q.fetchProtected(
          q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (me != null && me.ok) {
          const Ae = await me.json().catch(() => null);
          Y = Ra(Ae);
        }
      } catch {
      }
      const V = Ia({
        link: Y,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!l
      });
      if (V.kind === "follow-active-job") {
        if (ee.isInactive()) return;
        d({
          type: "resolved-document-job",
          documentId: r,
          jobId: V.jobId
        }), V.activeVersionId ? (l || d({
          type: "committed-source",
          documentId: r,
          revision: V.activeVersionId,
          sessionIdentity: i
        }), m("source")) : m("compare");
        return;
      }
      if (V.kind === "open-committed-source") {
        if (ee.isInactive()) return;
        d({
          type: "committed-source",
          documentId: r,
          revision: V.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const ae = ue();
      if (ee.isInactive()) return;
      w(ae), P(""), T(""), f(i);
      const ye = await Wt({
        url: ae,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: ee,
        setBoot: O
      });
      if (!ee.isInactive()) {
        if (!ye) {
          oe("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        M(ye), de();
      }
    }
    async function At() {
      var ut;
      const Y = await ((ut = q.loadSessionSnapshot) == null ? void 0 : ut.call(q, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: l,
        includeOptionalArtifacts: !l
      })), V = Y ? {
        jobPayload: Y.sourcePayload,
        manifestPayload: Y.manifestPayload,
        readerMetadata: Y.readerMetadata,
        regionsPayload: Y.regions,
        readerErrors: Y.readerErrors
      } : await q.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !l
      });
      if (ee.isInactive()) return;
      let ae = null;
      if (n && !r) {
        try {
          ae = await q.fetchDocumentByJobId(fa, t);
        } catch {
        }
        if (ee.isInactive()) return;
      }
      const ye = ba(V.jobPayload) || `${(ae == null ? void 0 : ae.document_id) || ""}`.trim();
      ye && !r && d({
        type: "resolved-job-document",
        jobId: t,
        documentId: ye
      });
      const me = Ta({
        payloadDocumentId: ye,
        linkedActiveJobId: `${(ae == null ? void 0 : ae.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(ae == null ? void 0 : ae.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!l
      });
      if (me.kind === "restore-committed-source") {
        if (ee.isInactive()) return;
        d({
          type: "committed-source",
          documentId: me.documentId,
          revision: me.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const Ae = q.resolveReaderSourcePdf(V.manifestPayload), lt = q.resolveReaderTranslatedPdfUrl(V.jobPayload, V.manifestPayload), kt = typeof Ae == "string" ? Ae : q.resolveReaderArtifactUrl(Ae), dt = r || ye, ve = l != null && l.documentId ? Ln(
        l.documentId,
        l.revision
      ) : kt || (dt ? q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(dt)}/source.pdf`) : ""), Ie = l ? "" : lt || "";
      if (w(ve || ""), P(Ie), T(va(V.jobPayload, t)), u({
        jobPayload: V.jobPayload || null,
        manifestPayload: V.manifestPayload || null,
        sessionIdentity: i
      }), N(l ? [] : To(V.regionsPayload)), B(l ? { source: null, translated: null } : Eo(V.readerMetadata)), te(l ? ft : V.readerErrors ?? ft), !ve && !Ie) {
        oe(Se.failed, Se.failed);
        return;
      }
      const Oe = await La({
        sourceFinal: ve || "",
        translatedFinal: Ie,
        fence: ee,
        setBoot: O
      });
      if (Oe.status !== "inactive") {
        if (Oe.status === "incomplete") {
          oe("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        M(Oe.sourceBytes), L(Oe.translatedBytes), de();
      }
    }
    async function Fe() {
      I(!1), M(null), L(null), N([]), B({ source: null, translated: null }), te(ft), vt(O, 8, Se.metadata, "metadata");
      try {
        if (s) {
          await De();
          return;
        }
        if (!t) {
          oe(Se.failed, Se.failed);
          return;
        }
        await At();
      } catch (Y) {
        if (ee.isClosedOrStale() || (Y == null ? void 0 : Y.name) === "AbortError") return;
        ee.markFailed();
        const V = Number(Y == null ? void 0 : Y.status);
        if (Ea({
          status: V,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          d({ type: "missing-document-job", documentId: r, jobId: t }), d({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const ae = Y instanceof Error ? Y.message : Se.failed;
        oe(ae, ae);
      }
    }
    return Fe(), () => {
      U.abort(), v.current === U && (v.current = null);
    };
  }, [t, r, o, a, s, c, l, b, n, i, d, u, f, m]), {
    sourceUrl: S,
    translatedUrl: h,
    sourceFile: E,
    translatedFile: F,
    assetsReady: k,
    title: R,
    regions: x,
    readerMetadata: j,
    readerErrors: Z,
    boot: re
  };
}
function _a() {
  const e = A(!1), t = A(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = pa(), s = A({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const c = A(a), i = A(""), l = A(""), d = A(() => {
  }), u = _(() => d.current(), []), f = ha({
    routeDocumentId: o,
    jobId: r,
    sessionIdentity: a,
    sessionIdentityRef: c,
    documentIdRef: i,
    sessionJobIdRef: l,
    switchToSourceMode: u
  }), {
    sessionJobId: m,
    documentId: b,
    sourceOnly: p,
    sourceViewOnly: g
  } = f, { mode: v, setMode: S, switchSessionMode: w } = Pa(g);
  d.current = () => {
    w("source");
  }, c.current = a, i.current = b, l.current = m;
  const h = Sa({
    sessionJobId: m,
    sessionIdentity: a,
    sessionIdentityRef: c,
    sessionJobIdRef: l,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: P,
    scopedManifestPayload: E,
    jobStatus: M,
    jobTerminal: F,
    jobRefreshRevision: L,
    refreshJobArtifacts: k,
    refreshJobStatus: I
  } = h, R = xa({
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
    switchSessionMode: w,
    jobRefreshRevision: L,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), T = _(() => {
    var N;
    e.current = !0, (N = t.current) == null || N.abort();
  }, []), x = J(
    () => ({
      fetchProtected: an().fetchProtected,
      jobId: m,
      jobPayload: P,
      manifestPayload: E,
      sourceUrl: R.sourceUrl,
      translatedUrl: R.translatedUrl,
      sourceOnly: g
    }),
    [m, P, E, R.sourceUrl, R.translatedUrl, g]
  );
  return {
    jobId: m,
    jobStatus: M,
    workflow: `${(P == null ? void 0 : P.workflow) || ""}`.trim().toLowerCase(),
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
    download: x,
    refreshJobArtifacts: k,
    refreshJobStatus: I,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: T
  };
}
const za = 160, Da = 8, Fa = 960;
function Oa() {
  const e = A(null), [t, n] = C(null), [r, o] = C(Fa), a = _((s) => {
    e.current = s, n(s);
  }, []);
  return $(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const c = (l) => {
      !Number.isFinite(l) || l < za || o((d) => Math.abs(d - l) < Da ? d : l);
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
function $a(e) {
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
const Lt = { source: 0, translated: 0 };
function ja(e, t) {
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
  const [u, f] = C(() => ({
    identity: l,
    pages: Lt
  })), [m, b] = C(() => ({ identity: l, tick: 0 })), p = u.identity === l ? u.pages : Lt, g = m.identity === l ? m.tick : 0, v = $a({
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    hasSource: !!c || !!a,
    hasTranslated: !!i
  }), { primaryPane: S } = v, w = _((I, R) => {
    d.current === l && f((T) => {
      const x = T.identity === l ? T.pages : Lt;
      return x[R] === I && T.identity === l ? T : {
        identity: l,
        pages: { ...x, [R]: I }
      };
    });
  }, [l]), h = A(null), P = _(() => {
    h.current && clearTimeout(h.current);
    const I = l;
    h.current = setTimeout(() => {
      h.current = null, d.current === I && b((R) => ({
        identity: I,
        tick: R.identity === I ? R.tick + 1 : 1
      }));
    }, 60);
  }, [l]);
  $(() => (h.current && (clearTimeout(h.current), h.current = null), f((I) => I.identity === l && I.pages.source === 0 && I.pages.translated === 0 ? I : { identity: l, pages: { source: 0, translated: 0 } }), b((I) => I.identity === l && I.tick === 0 ? I : { identity: l, tick: 0 }), () => {
    h.current && (clearTimeout(h.current), h.current = null);
  }), [l]);
  const E = J(
    () => Math.max(p.source, p.translated),
    [p]
  ), M = S === "translated" ? p.translated : p.source || p.translated, F = t == null ? void 0 : t.userZoom, L = t == null ? void 0 : t.shellWidth, k = `${l}-${g}-${F}-${n}-${p.source}-${p.translated}-${L}`;
  return {
    ...v,
    numPagesByPane: p,
    hudNumPages: E,
    primaryNumPages: M,
    metricsTick: g,
    onNumPages: w,
    onMetrics: P,
    rowSyncRevision: k
  };
}
const We = "data-reader-page", Je = "data-reader-pane", sn = "data-natural-height", Ua = "reader-react-root", Ba = "reader-react-grid", Er = "reader-react-scroll-shell", Ha = "reader-react-pdf-pane", Mr = "reader-react-pdf-page", St = "reader-react-pdf-page-placeholder", cn = "reader-react-pdf-page-slot";
function nt(e, t) {
  const n = e != null ? `[${We}="${e}"]` : `[${We}]`;
  return t ? `${n}[${Je}="${t}"]` : n;
}
function Wa() {
  return `.${cn}[${We}]`;
}
function Tt(e) {
  return Number(e.getAttribute(We));
}
const Ar = 0.25, kr = 1, Ja = 0.05, it = 0.5, Va = 16, qa = 8;
function Qe(e) {
  return it;
}
function Et(e) {
  return Number.isFinite(e) ? Math.min(kr, Math.max(Ar, e)) : it;
}
function rt(e, t) {
  const n = Et(Number(e) + t * Ja);
  return Math.round(n * 100) / 100;
}
function Ka(e) {
  return Math.round(Et(e) * 100);
}
function Ga(e) {
  const n = (Number(e) || 0) - Va - qa;
  return Math.max(160, Math.floor(n));
}
function Za(e, t = it) {
  const n = Et(t);
  return Ga((Number(e) || 0) * n);
}
function Ya(e, t) {
  if (!e || !Number.isFinite(t) || t <= 0 || Math.abs(t - 1) < 1e-3)
    return;
  const n = e.scrollLeft + e.clientWidth / 2, r = e.scrollTop + e.clientHeight / 2, o = Array.from(
    e.querySelectorAll(`[${Je}]`)
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
const Nr = [
  "markdown",
  "notes"
], Cr = [
  "terminal"
], Xa = [
  ...Nr,
  ...Cr
];
function Lr(e) {
  return Xa.includes(e);
}
const Qa = "retainpdf:reader:view:v1:", _n = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), es = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function xr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function Jt(e) {
  return `${e || ""}`.trim();
}
function ts({
  documentId: e,
  jobId: t
}) {
  const n = Jt(e);
  if (n) return `document:${n}`;
  const r = Jt(t);
  return r ? `job:${r}` : "";
}
function _r(e) {
  const t = Jt(e);
  return t ? `${Qa}${t}` : "";
}
function ns(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function rs(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!_n.has(t) || !_n.has(n) || t === n))
    return { left: t, right: n };
}
function os(e) {
  return e === null ? null : Lr(e) ? e : void 0;
}
function as(e) {
  return es.has(e) ? e : void 0;
}
function zr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = ns(t.anchor), r = Number(t.zoom), o = as(t.mode), a = rs(t.splitLayout), s = os(t.assistantPanel);
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
function Pe(e, t = xr()) {
  const n = _r(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? zr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function Mt(e, t, n = xr()) {
  const r = _r(e);
  if (!r || !n) return null;
  const o = Pe(e, n), a = zr({
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
function ss(e, t, n = "") {
  const [r, o] = C(() => {
    var u;
    return ((u = Pe(n)) == null ? void 0 : u.zoom) ?? Qe();
  }), a = A(r), s = A(n);
  a.current = r;
  const c = A(1);
  $(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const u = ((f = Pe(n)) == null ? void 0 : f.zoom) ?? Qe();
    c.current = 1, a.current = u, o(u);
  }, [e, n]);
  const i = _((u) => {
    const f = Et(u), m = a.current;
    Math.abs(f - m) < 5e-4 || (c.current = f / (m || 1), Mt(s.current, { zoom: f }), o(f));
  }, []), l = _((u) => {
    i(rt(a.current, u));
  }, [i]), d = _((u) => {
    i(Qe());
  }, [i]);
  return xe(() => {
    const u = c.current;
    Math.abs(u - 1) < 1e-3 || (c.current = 1, Ya(t == null ? void 0 : t.current, u));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: l, resetZoom: d };
}
function is(e, t = !0) {
  const [n, r] = C(null), o = _(() => {
    var c, i;
    r(null);
    const s = (c = globalThis.getSelection) == null ? void 0 : c.call(globalThis);
    (i = s == null ? void 0 : s.removeAllRanges) == null || i.call(s);
  }, []), a = e.current ?? null;
  return $(() => {
    if (!t)
      return;
    const s = () => {
      var N, j;
      const p = e.current, g = (N = globalThis.getSelection) == null ? void 0 : N.call(globalThis);
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
      let w = v.commonAncestorContainer;
      w.nodeType === Node.TEXT_NODE && (w = w.parentElement);
      const h = (j = w == null ? void 0 : w.closest) == null ? void 0 : j.call(
        w,
        nt()
      );
      if (!h || !p.contains(h)) {
        r(null);
        return;
      }
      const P = Math.max(1, Math.floor(Tt(h) || 1)), M = h.getAttribute(Je) === "translated" ? "translated" : "source", F = v.getClientRects(), L = F[F.length - 1] || v.getBoundingClientRect();
      if (!L || L.width === 0 && L.height === 0) {
        r(null);
        return;
      }
      const k = typeof window < "u" ? window.innerWidth : 800, I = typeof window < "u" ? window.innerHeight : 600, R = 16, T = Math.min(Math.max(R, L.left), k - R), x = Math.min(Math.max(R, L.top), I - R);
      r({
        selectionType: "text",
        quote: S,
        page: P,
        pane: M,
        rect: {
          left: T,
          top: x,
          width: L.width,
          height: L.height
        }
      });
    }, c = () => {
      window.setTimeout(s, 0);
    }, i = () => {
      c();
    }, l = () => c(), d = () => c(), u = () => {
      c();
    }, f = (p) => {
      p.key === "Escape" && o();
    }, m = () => {
      r((p) => p && null);
    };
    document.addEventListener("mouseup", i), document.addEventListener("pointerup", l), document.addEventListener("touchend", d), document.addEventListener("selectionchange", u), document.addEventListener("keyup", f);
    const b = a ?? e.current;
    return b == null || b.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", i), document.removeEventListener("pointerup", l), document.removeEventListener("touchend", d), document.removeEventListener("selectionchange", u), document.removeEventListener("keyup", f), b == null || b.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, a, o]), { selection: n, clearSelection: o };
}
function cs(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, o = A(t), a = A(n), s = A(r);
  return o.current = t, a.current = n, s.current = r, { setModeKeepingPage: _((i) => {
    i !== o.current && (s.current(), a.current(i));
  }, []) };
}
const ln = 48;
function Dr(e, t = ln) {
  return e.getBoundingClientRect().top + t;
}
function Fr(e, t) {
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
  const o = Tt(n);
  if (!Number.isFinite(o) || o < 1)
    return null;
  const a = n.getBoundingClientRect(), s = a.height > 0 ? a.height : 1, c = Math.min(1, Math.max(0, (t - a.top) / s));
  return { el: n, page: o, fraction: c };
}
function xt(e, t, n = ln) {
  if (!e)
    return null;
  const r = nt(void 0, t), o = Array.from(e.querySelectorAll(r));
  if (!o.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Dr(e, n), c = Fr(o, s);
  return c ? { page: c.page, fraction: c.fraction } : null;
}
function dn(e, t, n = "auto", r, o = ln) {
  if (!e || !t)
    return !1;
  const a = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let c = null;
  if (r && (c = e.querySelector(nt(a, r))), c || (c = e.querySelector(nt(a))), !c)
    return !1;
  const i = e.getBoundingClientRect(), l = c.getBoundingClientRect();
  if (i.height <= 0 || l.height < 8 && c.offsetHeight < 8)
    return !1;
  const d = l.height > 0 ? l.height : c.offsetHeight, u = e.scrollTop + (l.top - i.top), f = Math.max(0, u + s * d - o);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function ls(e, t, n = "smooth", r) {
  return dn(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function Vt(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", o = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let a = !1, s = !1;
  const c = [], i = () => {
    var d;
    if (a) return;
    dn(
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
function ds(e, t, n) {
  return Vt(
    e,
    { page: t, fraction: 0 },
    n
  );
}
function wt(e, t) {
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
function us(e, t, n = !0, r = "", o) {
  const [a, s] = C(1);
  return $(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const c = e.current;
    if (!c)
      return;
    let i = !1, l = null, d = 0;
    const u = nt(void 0, o), f = () => {
      if (i) return;
      const p = Array.from(c.querySelectorAll(u));
      if (!p.length)
        return;
      const g = Dr(c), v = Fr(p, g);
      v && s(v.page);
    }, m = () => {
      i || (d && cancelAnimationFrame(d), d = requestAnimationFrame(() => {
        d = 0, f();
      }));
    }, b = () => {
      if (i) return;
      if (!Array.from(c.querySelectorAll(u)).length) {
        l = setTimeout(b, 120);
        return;
      }
      f(), c.addEventListener("scroll", m, { passive: !0 });
    };
    return b(), () => {
      i = !0, l && clearTimeout(l), d && cancelAnimationFrame(d), c.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, o]), a;
}
const fs = `canvas, .react-pdf__Page, .${Mr}, .${St}`, zn = /* @__PURE__ */ new WeakMap();
function ms(e) {
  const t = Number(e.getAttribute(sn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = zn.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(fs), zn.set(e, n)), n) {
    const o = n.getBoundingClientRect().height;
    if (Number.isFinite(o) && o > 0)
      return o;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function ps(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function hs(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(Wa()).forEach((r) => {
    const o = Tt(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = ms(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function gs(e, t, n = "", r) {
  const [o, a] = C(() => /* @__PURE__ */ new Map()), s = A(o), c = A(r);
  return c.current = r, xe(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), a(s.current));
      return;
    }
    let i = !1, l = 0, d = !1, u = !1;
    const f = () => {
      var P;
      if (i) return;
      const w = e.current;
      if (!w) return;
      const h = hs(w);
      ps(s.current, h) || (s.current = h, a(h)), d && !u && (u = !0, (P = c.current) == null || P.call(c));
    }, m = () => {
      cancelAnimationFrame(l), l = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const b = window.setTimeout(m, 100), p = window.setTimeout(() => {
      d = !0, m();
    }, 300), g = window.setTimeout(m, 700), v = e.current;
    let S = null;
    return v && typeof ResizeObserver < "u" && (S = new ResizeObserver(() => m()), S.observe(v)), () => {
      i = !0, cancelAnimationFrame(l), window.clearTimeout(b), window.clearTimeout(p), window.clearTimeout(g), S == null || S.disconnect();
    };
  }, [e, t, n]), o;
}
const bs = [0, 48, 140, 320, 560], ys = 700, vs = [80, 200, 400], Ss = 500, ws = 50, Ps = 180, Dn = [0, 48, 140, 320, 700, 1200];
function Rs(e, t) {
  var I;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, c = A(
    ((I = Pe(a)) == null ? void 0 : I.anchor) || { page: 1, fraction: 0 }
  ), i = A(null), l = A(!1), d = A(r), u = A(null), f = A(null), m = A(null), b = A(null), p = A(a), g = A(""), v = A(n);
  v.current = n;
  const S = _(() => {
    var R;
    (R = u.current) == null || R.call(u), u.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), w = _((R = !1) => {
    b.current != null && (clearTimeout(b.current), b.current = null);
    const T = () => {
      b.current = null, Mt(p.current, {
        anchor: pe(c.current)
      });
    };
    R ? T() : b.current = setTimeout(T, Ps);
  }, []), h = _((R) => {
    c.current = pe(R), i.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, l.current = !1;
    }, ws);
  }, []);
  $(() => {
    if (!o)
      return;
    let R = !1, T = null, x = null, N = null;
    const j = () => {
      if (R) return;
      const B = e.current;
      if (!B) {
        N = setTimeout(j, 50);
        return;
      }
      T = B, x = () => {
        if (l.current)
          return;
        const Z = xt(T, v.current);
        Z && (c.current = Z, w());
      }, T.addEventListener("scroll", x, { passive: !0 }), l.current || x();
    };
    return j(), () => {
      R = !0, N != null && clearTimeout(N), T && x && T.removeEventListener("scroll", x);
    };
  }, [o, r, n, e, w]), xe(() => {
    var T;
    if (p.current === a) return;
    w(!0), S(), m.current != null && (clearTimeout(m.current), m.current = null), p.current = a, g.current = "";
    const R = (T = Pe(a)) == null ? void 0 : T.anchor;
    c.current = R ? pe(R) : { page: 1, fraction: 0 }, i.current = null, l.current = !!a, d.current = r;
  }, [a, r, w, S]), $(() => {
    var T;
    if (!o || !s || !a || g.current === a) return;
    g.current = a;
    const R = pe(
      ((T = Pe(a)) == null ? void 0 : T.anchor) || { page: 1, fraction: 0 }
    );
    return c.current = R, i.current = R, l.current = !0, S(), u.current = Vt(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: v.current,
        delaysMs: Dn,
        onDone: () => h(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, h(R);
    }, Math.max(...Dn) + 160), () => S();
  }, [o, s, a, e, h, S]), $(() => {
    if (d.current === r)
      return;
    if (d.current = r, !o) {
      l.current = !1, i.current = null, S();
      return;
    }
    const R = i.current ? pe(i.current) : pe(c.current);
    return l.current = !0, i.current = R, c.current = R, S(), u.current = Vt(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: bs,
        onDone: () => h(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, h(R);
    }, ys), () => {
      S();
    };
  }, [r, o, n, e, h, S]), $(() => () => {
    S(), m.current != null && (clearTimeout(m.current), m.current = null), w(!0);
  }, [S, w]);
  const P = _(() => {
    const R = xt(
      e.current,
      v.current
    );
    return pe(R || c.current);
  }, [e]), E = _(() => {
    l.current = !0;
    const R = xt(
      e.current,
      v.current
    ), T = pe(R ?? c.current);
    return c.current = T, i.current = T, w(), T;
  }, [e, w]), M = _((R, T, x) => {
    const N = x || v.current, j = wt(R, T || 1), B = { page: j, fraction: 0 };
    c.current = B, l.current = !0, i.current = B, w(), S(), ls(e.current, j, "smooth", N), u.current = ds(
      () => e.current,
      j,
      {
        behavior: "auto",
        pane: N,
        delaysMs: vs,
        onDone: () => h(B)
      }
    ), f.current = setTimeout(() => {
      f.current = null, h(B);
    }, Ss);
  }, [e, h, S, w]), F = _(() => pe(c.current), []), L = _(() => l.current, []), k = _(() => {
    if (!l.current || !i.current)
      return;
    const R = pe(i.current);
    dn(
      e.current,
      R,
      "auto",
      v.current
    );
  }, [e]);
  return {
    lockFromShell: P,
    beginModeSwitch: E,
    goToPage: M,
    getAnchor: F,
    isRestoring: L,
    repinIfRestoring: k
  };
}
function Is(e, t) {
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
function Or(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), o = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), a = `j:${r}:d:${o}`;
  return t == null ? `${a}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${a}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const Ts = [0, 80, 200, 400, 800], Es = 120, Ms = 400;
function As(e, t, n) {
  const { enabled: r, numPages: o, goToPage: a, resolveBlockPage: s, onAnchorApplied: c, jobId: i, documentId: l } = e, d = A(a);
  d.current = a;
  const u = A(s);
  u.current = s;
  const f = A(c);
  f.current = c;
  const m = A(n);
  m.current = n, $(() => {
    var w, h;
    if (!r || !Number.isFinite(o) || o < 1)
      return;
    const b = aa(), p = Is(b, u.current), g = Or(b, p, { jobId: i, documentId: l });
    if (t.current === g)
      return;
    if (p == null) {
      t.current = g, (w = m.current) == null || w.call(m);
      return;
    }
    t.current = g, b && ((h = f.current) == null || h.call(f, b, p));
    const v = [];
    let S = 0;
    for (const P of Ts)
      S = Math.max(S, P), v.push(
        setTimeout(() => {
          d.current(p);
        }, P)
      );
    return v.push(
      setTimeout(() => {
        var P;
        (P = m.current) == null || P.call(m);
      }, S + Es)
    ), () => {
      for (const P of v) clearTimeout(P);
    };
  }, [r, o, i, l, t]);
}
function ks(e) {
  var a;
  const t = globalThis.window;
  if (!t || typeof ((a = t.history) == null ? void 0 : a.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, o = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", o);
}
function Ns(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: o,
    resolveBlockPage: a,
    syncDebounceMs: s = Ms,
    jobId: c,
    documentId: i,
    applyReaderSearch: l
  } = e, d = A(a);
  d.current = a;
  const u = A(l);
  u.current = l;
  const f = A(0);
  $(() => {
    if (!n || !r || !t.current || !Number.isFinite(o) || o < 1 || f.current === o) return;
    const m = setTimeout(() => {
      var v;
      const b = ((v = globalThis.location) == null ? void 0 : v.search) || "", p = Io(b, o, d.current);
      if (f.current = o, p === null) return;
      const g = `${new URLSearchParams(p).get("block_id") || ""}`.trim();
      t.current = Or(
        { blockId: g },
        o,
        { jobId: c, documentId: i }
      ), (u.current || ks)(p);
    }, s);
    return () => clearTimeout(m);
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
function Cs(e) {
  const t = A(""), [n, r] = C(!1), o = _(() => r(!0), []), a = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  As(a, t, o), Ns(e, t, n);
}
const Ge = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function Ls(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function Fn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function $r(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = Fn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const o = Fn(n, e);
  return o < 0 ? "ignore" : o === 0 ? n.page_hash === e.pageHash ? "ignore" : "retry" : "accept";
}
function xs(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), o = $r(r, t, n);
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
function _s(e) {
  const { hasOverlayContent: t, connection: n, showSource: r } = e;
  return {
    topBarPill: t && n !== "terminal",
    sourcePaneToggle: t && r,
    overlayRenderable: t && r
  };
}
const On = [250, 500, 1e3, 2e3, 4e3], _t = [80, 160, 320, 640, 1e3, 1500], $n = [250, 500, 1e3, 2e3, 4e3, 5e3], zs = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function qt(e, t) {
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
function un(e) {
  return Co(e) ? `${e.code || ""}`.trim() : "";
}
function mt(e, t) {
  const n = un(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Ds(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if ($r(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = Lo(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (i) {
      if ((i == null ? void 0 : i.name) === "AbortError") throw i;
      a = i;
      const l = un(i);
      if (l && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(l)) throw i;
    }
    const c = _t[Math.min(s, _t.length - 1)];
    if (await qt(c, r), s >= _t.length + 2) throw a;
  }
}
function Fs({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = C(Ge), s = A(o), c = A("");
  s.current = o;
  const i = `${e || ""}`.trim(), l = `${t || ""}`.trim().toLowerCase(), d = zs.has(l) ? l : "";
  return $(() => {
    if (!n || !i) {
      c.current = "", s.current = Ge, a(Ge);
      return;
    }
    const u = r === void 0 ? oa() : r, f = c.current === i;
    if (c.current = i, !u) {
      const w = {
        ...f ? s.current : Ge,
        connection: d ? "terminal" : "unavailable",
        jobStatus: l,
        error: "实时译文暂不可用"
      };
      s.current = w, a(w);
      return;
    }
    const m = new AbortController();
    let b = !1;
    const p = {
      ...f ? s.current : Ge,
      connection: d ? "terminal" : "connecting",
      jobStatus: l,
      error: ""
    };
    s.current = p, a(p);
    const g = (w) => {
      m.signal.aborted || a((h) => {
        const P = w(h);
        return s.current = P, P;
      });
    }, v = async () => {
      let w = 0;
      for (; !m.signal.aborted; )
        try {
          const h = await u.fetchLayout(i, { signal: m.signal });
          b = !0, g((P) => ({
            ...P,
            layoutByPage: Ls(h),
            jobStatus: l,
            error: ""
          }));
          return;
        } catch (h) {
          if ((h == null ? void 0 : h.name) === "AbortError") return;
          const P = un(h);
          if (!(P === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !P)) {
            g((M) => ({
              ...M,
              connection: d ? "terminal" : "unavailable",
              jobStatus: l,
              error: mt(h, "实时译文暂不可用")
            }));
            return;
          }
          if (d) {
            g((M) => ({
              ...M,
              connection: "terminal",
              jobStatus: l,
              error: ""
            }));
            return;
          }
          g((M) => ({
            ...M,
            connection: "connecting",
            jobStatus: l,
            error: mt(h, "正在等待 OCR 版面数据")
          })), await qt(On[Math.min(w, On.length - 1)], m.signal).catch(() => {
          }), w += 1;
        }
    };
    return (async () => {
      if (await v(), !b || m.signal.aborted) return;
      let w = 0;
      for (; !m.signal.aborted; ) {
        d || g((h) => ({
          ...h,
          connection: h.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: l,
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
              let P;
              try {
                P = await Ds(
                  i,
                  h,
                  s.current,
                  m.signal,
                  u
                );
              } catch (E) {
                if ((E == null ? void 0 : E.name) === "AbortError" || m.signal.aborted) throw E;
                g((M) => ({
                  ...M,
                  lastSeq: Math.max(M.lastSeq, h.seq),
                  error: mt(E, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              g((E) => {
                const M = xs(E, h, P);
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
        } catch (h) {
          if ((h == null ? void 0 : h.name) === "AbortError" || m.signal.aborted) return;
          g((P) => ({
            ...P,
            connection: d ? "terminal" : "reconnecting",
            jobStatus: l,
            error: mt(h, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (d) {
          g((h) => ({
            ...h,
            connection: "terminal",
            jobStatus: l
          }));
          return;
        }
        await qt($n[Math.min(w, $n.length - 1)], m.signal).catch(() => {
        }), w += 1;
      }
    })(), () => m.abort();
  }, [n, r, i, d]), o;
}
const Os = 2e3;
function $s(e) {
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
const js = /* @__PURE__ */ new Set(["book", "translate"]);
function jr(e) {
  return !!(e.jobId && e.sourceUrl && js.has(e.workflow));
}
function Us(e) {
  return !!(jr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function Bs() {
  const e = _a(), t = jr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = Us({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = Fs({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), { shellRef: o, shellEl: a, shellWidth: s, bindShell: c } = Oa(), i = ts({
    documentId: e.documentId,
    jobId: e.jobId
  }), l = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: d, onZoomChange: u } = ss(e.mode, o, i), f = ja(
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
    beginModeSwitch: m,
    goToPage: b,
    repinIfRestoring: p
  } = Rs(o, {
    primaryPane: f.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: f.primaryNumPages > 0
  });
  $(() => {
    p();
  }, [s, p]);
  const g = gs(
    o,
    f.compareMode,
    f.rowSyncRevision,
    p
  ), v = us(
    o,
    f.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${d}-${f.metricsTick}`,
    f.primaryPane
  ), S = _((O, U) => {
    var ee, q;
    const ne = Math.max(
      Number(f.hudNumPages) || 0,
      Number(f.primaryNumPages) || 0,
      Number((ee = f.numPagesByPane) == null ? void 0 : ee.source) || 0,
      Number((q = f.numPagesByPane) == null ? void 0 : q.translated) || 0
    );
    b(O, ne, U);
  }, [b, f.hudNumPages, f.primaryNumPages, f.numPagesByPane]), [w, h] = C(null), P = A(null), E = _((O) => {
    P.current && clearTimeout(P.current), h(O), O && (P.current = setTimeout(() => h(null), Os));
  }, []);
  $(() => () => {
    P.current && clearTimeout(P.current);
  }, []);
  const M = _((O) => {
    const U = Nt(e.regions, O);
    return U ? $t(U, f.primaryPane).page : null;
  }, [e.regions, f.primaryPane]), F = _((O, U) => {
    const ne = U || f.primaryPane, ee = typeof O == "object" && O ? `${O.block_id || ""}`.trim() : "", q = typeof O == "object" && O ? `${O.image_url || ""}`.trim() : "", oe = typeof O == "object" && O ? O.page_idx != null ? Number(O.page_idx) + 1 : O.page != null ? Number(O.page) : null : typeof O == "number" ? O + 1 : null, de = Mo(e.regions, q, oe) || Nt(e.regions, ee) || (typeof O == "object" ? Ao(e.regions, O) : null);
    let ue = de ? $t(de, ne).page : null;
    ue == null && (ue = $s(O)), !(ue == null || ue < 1) && (E(de), S(ue, ne));
  }, [E, S, f.primaryPane, e.regions]);
  Cs({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: f.hudNumPages || 0,
    currentPage: v,
    goToPage: S,
    resolveBlockPage: M,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (O) => {
      E(Nt(e.regions, O.blockId));
    }
  });
  const { setModeKeepingPage: L } = cs({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: m
  }), [k, I] = C(null), {
    selection: R,
    clearSelection: T
  } = is(o, !e.boot.loading && !e.boot.failed), x = _(() => {
    I(null), T();
  }, [T]), N = _((O) => {
    T(), I(O);
  }, [T]);
  $(() => {
    R && I(null);
  }, [R]), $(() => {
    const O = o.current;
    if (!O) return;
    const U = () => I(null);
    return O.addEventListener("scroll", U, { passive: !0 }), () => O.removeEventListener("scroll", U);
  }, [a, o]);
  const j = R || k;
  $(() => {
    E(null), x();
  }, [l, E, x]);
  const B = !e.boot.loading && !e.boot.failed, Z = J(() => ({ bindShell: c, shellEl: a, shellWidth: s, shellRef: o }), [c, a, s, o]), te = J(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), re = J(() => ({
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
    activeRegion: w,
    jumpToAnchor: F,
    setModeKeepingPage: L,
    download: e.download,
    showHud: B,
    selection: j,
    clearSelection: x,
    selectRegion: N,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, Z, f, te, g, S, w, F, L, B, j, x, N, d, u, i, r, n]);
  return J(() => ({
    ...re,
    currentPage: v
  }), [re, v]);
}
const Hs = [
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
], Ws = [
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
function Js(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Hs)
    if (n.keys.some(
      (o) => o.length === 1 ? o === t : o === e
    )) return n;
  return null;
}
function Vs(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function qs(e) {
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
  $(() => {
    if (!l)
      return;
    const d = (u) => {
      if (u.defaultPrevented || u.metaKey || u.ctrlKey || u.altKey || Vs(u.target))
        return;
      const f = u.key, m = Js(f);
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
              a(rt(o, 1));
              return;
            case "zoom-out":
              a(rt(o, -1));
              return;
            case "zoom-reset":
              a(Qe());
              return;
            case "next-page":
              i(wt(s + 1, c));
              return;
            case "prev-page":
              i(wt(s - 1, c));
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
const Ks = "retainpdf:soft-reader-close";
function Gs() {
  return new URL("./index.html", window.location.href).href;
}
function Zs() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: Ks },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function Ys(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), o = new URL(e, r);
    return o.origin === r.origin && !/reader\.html$/i.test(o.pathname) && !/detail\.html$/i.test(o.pathname);
  } catch {
    return !1;
  }
}
function Xs() {
  if (!(typeof window > "u") && !Zs()) {
    if (Ys(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(Gs());
  }
}
function Qs({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ D(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), Xs();
      },
      children: [
        /* @__PURE__ */ y(on, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ y("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let jn = !1;
function ei() {
  if (jn)
    return;
  const e = tt().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (Ko.GlobalWorkerOptions.workerSrc = e, jn = !0);
}
const ti = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function ni({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: o
}) {
  const a = r.flatMap((s) => {
    if (!gr(s.region)) return [];
    const c = It(s, t, n);
    return c ? [{ highlight: s, rect: c }] : [];
  });
  return a.length ? /* @__PURE__ */ y("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: a.map(({ highlight: s, rect: c }) => {
    const i = s.region, l = br(i), d = ti[l];
    return /* @__PURE__ */ D(
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
          /* @__PURE__ */ y("span", { className: "reader-structure-selection-label", "aria-hidden": "true", children: d }),
          /* @__PURE__ */ y("span", { className: "sr-only", children: yr(i, e) })
        ]
      },
      i.itemId
    );
  }) }) : null;
}
function ri(e, t, n) {
  return e.flatMap((r) => {
    if (br(r.region) !== "text") return [];
    const o = It(r, t, n);
    return o ? [{ itemId: r.itemId, highlight: r, rect: o }] : [];
  });
}
function Un(e, t, n) {
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
function oi({ target: e }) {
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
function ai(e, t) {
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
function si(e, t, n, r) {
  if (!e || !t) return [];
  const o = [];
  for (const a of e.blocks) {
    const s = t.itemsById.get(a.item_id);
    if (!(s != null && s.translated_text)) continue;
    const c = It(
      ai(e, a),
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
const ii = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', ci = 256, Ze = /* @__PURE__ */ new Map();
function li(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function di(e) {
  const t = `${e || ""}`, { text: n, slots: r } = Yo(t, { bareLatex: !0 }), o = li(n), a = Xo(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Ze.get(t);
  if (!s && (s = Qo(o, r), Ze.set(t, s), Ze.size > ci)) {
    const c = Ze.keys().next().value;
    c !== void 0 && Ze.delete(c);
  }
  return { fallbackHtml: a, richHtml: s, hasMath: !0 };
}
function zt(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function we(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function ui(e, t) {
  const n = e.typography, r = we(t) || 1, o = we(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), c = zt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, c * r)), l = we(n == null ? void 0 : n.fit_min_font_size_pt), d = we(n == null ? void 0 : n.fit_max_font_size_pt), u = Math.max(3.5, (l || 5.5) * r), f = Math.max(
    u,
    d ? d * r : o ? o * r : i
  ), m = o ? o * r : i, b = we(n == null ? void 0 : n.leading_em), p = [
    we(n == null ? void 0 : n.padding_top_pt) || 0,
    we(n == null ? void 0 : n.padding_right_pt) || 0,
    we(n == null ? void 0 : n.padding_bottom_pt) || 0,
    we(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((g) => g * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || ii,
    fontSizePx: Math.max(u, Math.min(f, m)),
    minFontSizePx: u,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: b ? 1 + b : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (zt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : zt(e.kind) ? "center" : "justify",
    padding: p,
    exact: !!o
  };
}
function fi(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), c = (u) => {
    const f = s.get(u);
    if (f !== void 0) return f;
    const { width: m, height: b } = e(u), p = m <= t + 0.5 && b <= n + 0.5;
    return s.set(u, p), p;
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
const mi = 512, Ye = /* @__PURE__ */ new Map();
let Kt = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Kt += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Kt += 1;
}));
function pi(e, t, n, r) {
  return [
    Kt,
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
function hi({ item: e, pageScale: t }) {
  const n = A(null), r = J(
    () => di(e.translatedText),
    [e.translatedText]
  ), [o, a] = C(r.fallbackHtml), s = J(
    () => ui(e, t),
    [e, t]
  );
  $(() => {
    let u = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      u && a(f);
    }), () => {
      u = !1;
    };
  }, [r]), xe(() => {
    const u = n.current;
    if (!u) return;
    const [f, m, b, p] = s.padding, g = Math.max(1, e.rect.width - p - m), v = Math.max(1, e.rect.height - f - b), S = pi(o, g, v, s);
    let w = Ye.get(S);
    if (w === void 0 && (w = fi(
      (h) => (u.style.fontSize = `${h}px`, { width: u.scrollWidth, height: u.scrollHeight }),
      g,
      v,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Ye.set(S, w), Ye.size > mi)) {
      const h = Ye.keys().next().value;
      h !== void 0 && Ye.delete(h);
    }
    u.style.fontSize = `${w.toFixed(2)}px`;
  }, [o, e.rect.height, e.rect.width, s]);
  const [c, i, l, d] = s.padding;
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
        padding: `${c}px ${i}px ${l}px ${d}px`
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
function gi({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = J(
    () => si(e, t, n, r),
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
        hi,
        {
          item: a,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${a.itemId}:${a.changedAtSeq}`
      ))
    }
  ) : null;
}
const bi = en(gi), Ur = 1.414;
function yi({
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
  onSelectRegion: f,
  liveTranslationLayout: m,
  liveTranslationPage: b,
  showLiveTranslation: p = r === "source"
}) {
  const g = A(c ?? Ur), [v, S] = C(g.current);
  $(() => {
    c != null && Math.abs(c - g.current) >= 1e-3 && (g.current = c, S(c));
  }, [c]);
  const w = A(l);
  w.current = l;
  const h = A((N) => {
    var j;
    (j = w.current) == null || j.call(w, N);
  }).current, P = Math.max(120, Math.floor(t * v)), E = Math.max(P, Math.ceil(a || 0)), M = It(d, t, P), F = J(
    () => ri(u, t, P),
    [P, u, t]
  ), [L, k] = C(null), I = J(
    () => F.find((N) => N.itemId === L) || null,
    [L, F]
  ), R = (N) => {
    if (N.buttons !== 0) {
      k(null);
      return;
    }
    const j = N.currentTarget.getBoundingClientRect(), B = Un(
      F,
      N.clientX - j.left,
      N.clientY - j.top
    ), Z = (B == null ? void 0 : B.itemId) || null;
    k((te) => te === Z ? te : Z);
  }, T = (N) => {
    var Z, te, re;
    if (!f || (te = (Z = N.target) == null ? void 0 : Z.closest) != null && te.call(Z, ".reader-structure-selection-target") || `${((re = window.getSelection()) == null ? void 0 : re.toString()) || ""}`.trim()) return;
    const j = N.currentTarget.getBoundingClientRect(), B = Un(
      F,
      N.clientX - j.left,
      N.clientY - j.top
    );
    B && f({
      selectionType: "region",
      region: B.highlight.region,
      kind: "text",
      page: B.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: j.left + B.rect.left,
        top: j.top + B.rect.top,
        width: B.rect.width,
        height: B.rect.height
      }
    });
  }, x = (N) => {
    !Number.isFinite(N) || N <= 0 || Math.abs(g.current - N) < 1e-3 || (g.current = N, S(N), i == null || i(e, N));
  };
  return /* @__PURE__ */ D(
    "div",
    {
      ref: h,
      [We]: e,
      [Je]: r,
      [sn]: P,
      className: cn,
      onPointerMoveCapture: R,
      onClick: T,
      onPointerLeave: () => k(null),
      style: {
        width: t,
        height: E,
        minHeight: E
      },
      children: [
        o ? /* @__PURE__ */ y(
          Go,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: Mr,
            loading: /* @__PURE__ */ y(
              "div",
              {
                className: St,
                style: { width: t, height: P }
              }
            ),
            onLoadSuccess: (N) => {
              try {
                const j = N.getViewport({ scale: 1 });
                if (j.width > 0) {
                  const B = j.height / j.width;
                  x(B);
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
            className: St,
            style: { width: t, height: P },
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
          bi,
          {
            layoutPage: m,
            pageState: b,
            width: t,
            height: P
          }
        ) : null,
        /* @__PURE__ */ y(oi, { target: o ? I : null }),
        /* @__PURE__ */ y(
          ni,
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
const vi = en(yi), Dt = 5, Si = "120% 0px", wi = 120;
let Bn = 1;
const Hn = /* @__PURE__ */ new WeakMap();
function Pi(e) {
  if (!e) return 0;
  const t = Hn.get(e);
  if (t) return t;
  const n = Bn;
  return Bn += 1, Hn.set(e, n), n;
}
function Ri() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const Ii = ho(
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
    onNumPagesChange: m,
    activeRegion: b = null,
    regions: p = [],
    readerMetadata: g = null,
    onSelectRegion: v,
    liveTranslation: S,
    showLiveTranslation: w = t === "source",
    liveTranslationPendingLabel: h = "",
    paneAction: P
  }, E) {
    ei();
    const { file: M, loading: F, error: L } = Na(n, r), k = `${n}\0${Pi(M)}`, I = A(k);
    I.current = k;
    const R = J(
      () => Ma(M),
      [M, n]
    ), [T, x] = C(0), [N, j] = C(""), [B, Z] = C(null), [te, re] = C(480), O = A(null), U = A(0), ne = J(() => Ri(), []), ee = J(() => ({
      cMapUrl: tt().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: tt().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    tn(E, () => B, [B]), $(() => {
      const z = (H) => {
        !Number.isFinite(H) || H < 80 || Math.abs(H - U.current) < 8 || (U.current = H, re(H));
      }, K = i && i >= 80 ? i : (c == null ? void 0 : c.clientWidth) || 0;
      if (z(K), !c || typeof ResizeObserver > "u" || i && i >= 80) return;
      const W = new ResizeObserver((H) => {
        var X, Q;
        const se = ((Q = (X = H[0]) == null ? void 0 : X.contentRect) == null ? void 0 : Q.width) ?? c.clientWidth;
        !Number.isFinite(se) || se < 80 || (O.current && clearTimeout(O.current), O.current = setTimeout(() => z(se), 80));
      });
      return W.observe(c), () => {
        W.disconnect(), O.current && clearTimeout(O.current);
      };
    }, [i, c, a]);
    const q = J(
      () => Za(te, o),
      [te, o]
    ), [oe, de] = C(() => /* @__PURE__ */ new Map()), [ue, De] = C(() => /* @__PURE__ */ new Set()), [At, Fe] = C(() => /* @__PURE__ */ new Set()), Y = A(/* @__PURE__ */ new Map()), V = A(null), ae = A(/* @__PURE__ */ new Map()), ye = _((z, K) => {
      de((W) => {
        if (W.get(z) === K) return W;
        const H = new Map(W);
        return H.set(z, K), H;
      });
    }, []), me = _((z, K) => {
      const W = Y.current, H = W.get(z);
      if (H && V.current)
        try {
          V.current.unobserve(H);
        } catch {
        }
      if (K) {
        if (W.set(z, K), V.current)
          try {
            V.current.observe(K);
          } catch {
          }
      } else
        W.delete(z);
    }, []), Ae = A(/* @__PURE__ */ new Map()), lt = _((z) => {
      const K = Ae.current;
      let W = K.get(z);
      return W || (W = (H) => me(z, H), K.set(z, W)), W;
    }, [me]);
    $(() => {
      if (typeof IntersectionObserver > "u") return;
      const z = ae.current, K = new IntersectionObserver(
        (W) => {
          const H = [], se = [];
          for (const X of W) {
            const Q = X.target, le = Tt(Q);
            Number.isFinite(le) && (X.isIntersecting ? H : se).push(le);
          }
          if ((H.length || se.length) && De((X) => {
            let Q = null;
            for (const le of H)
              X.has(le) || (Q = Q || new Set(X), Q.add(le));
            for (const le of se)
              X.has(le) && (Q = Q || new Set(X), Q.delete(le));
            return Q || X;
          }), H.length) {
            for (const X of H) {
              const Q = z.get(X);
              Q && (clearTimeout(Q), z.delete(X));
            }
            Fe((X) => {
              let Q = null;
              for (const le of H)
                X.has(le) || (Q = Q || new Set(X), Q.add(le));
              return Q || X;
            });
          }
          for (const X of se)
            z.has(X) || z.set(X, setTimeout(() => {
              z.delete(X), Fe((Q) => {
                if (!Q.has(X)) return Q;
                const le = new Set(Q);
                return le.delete(X), le;
              });
            }, wi));
        },
        { root: c, rootMargin: Si, threshold: 0 }
      );
      V.current = K;
      for (const W of Y.current.values())
        try {
          K.observe(W);
        } catch {
        }
      return () => {
        K.disconnect(), V.current === K && (V.current = null);
        for (const W of z.values()) clearTimeout(W);
        z.clear();
      };
    }, [c]), xe(() => {
      x(0), j(""), De(/* @__PURE__ */ new Set()), Fe(/* @__PURE__ */ new Set()), de(/* @__PURE__ */ new Map()), Y.current.clear();
      const z = ae.current;
      for (const K of z.values()) clearTimeout(K);
      z.clear(), m == null || m(0, t);
    }, [k, m, t]);
    const kt = _(
      ({ numPages: z }) => {
        I.current === k && (x(z), j(""), m == null || m(z, t), u == null || u({ numPages: z, pane: t }));
      },
      [k, u, m, t]
    ), dt = _(
      (z) => {
        if (I.current !== k) return;
        const K = (z == null ? void 0 : z.message) || "PDF 解析失败";
        j(K), x(0), m == null || m(0, t), f == null || f(z, t);
      },
      [k, f, m, t]
    ), ve = J(
      () => T > 0 ? Array.from({ length: T }, (z, K) => K + 1) : [],
      [T]
    );
    $(() => {
      typeof IntersectionObserver < "u" || Fe(new Set(ve));
    }, [ve]);
    const Ie = J(
      () => kn(b, g, t),
      [b, g, t]
    ), Oe = J(() => {
      const z = /* @__PURE__ */ new Map();
      for (const K of p) {
        const W = kn(K, g, t);
        if (!W) continue;
        const H = z.get(W.box.page) || [];
        H.push(W), z.set(W.box.page, H);
      }
      return z;
    }, [t, g, p]), ut = J(() => {
      if (T === 0) return /* @__PURE__ */ new Set();
      if (!(!!c && typeof IntersectionObserver < "u" && a)) return new Set(ve);
      if (ue.size === 0) {
        const W = Math.min(T, Dt * 2 + 1);
        return new Set(Array.from({ length: W }, (H, se) => se + 1));
      }
      const K = /* @__PURE__ */ new Set();
      for (const W of ue)
        for (let H = -Dt; H <= Dt; H++) {
          const se = W + H;
          se >= 1 && se <= T && K.add(se);
        }
      return K;
    }, [T, ve, c, a, ue]), mo = !n || !!L || !!N, po = n && (L || N) || s;
    return /* @__PURE__ */ D(
      "section",
      {
        ref: Z,
        className: `reader-panel ${Ha}${a ? "" : " is-hidden"}`,
        [Je]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": a ? "true" : "false",
        "data-live-translation-status": (S == null ? void 0 : S.jobStatus) || void 0,
        "aria-hidden": a ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          P ? /* @__PURE__ */ y("div", { className: "reader-react-pdf-pane-action", children: P }) : null,
          h ? /* @__PURE__ */ D("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ y("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ y("span", { children: h })
          ] }) : null,
          mo && !F ? /* @__PURE__ */ y("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: po }) : null,
          F ? /* @__PURE__ */ y("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          R && !L ? /* @__PURE__ */ y("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ y(
            Zo,
            {
              file: R,
              loading: null,
              error: null,
              options: ee,
              onLoadSuccess: kt,
              onLoadError: dt,
              className: "reader-react-pdf-document",
              children: ve.map((z) => {
                if (ut.has(z))
                  return /* @__PURE__ */ y(
                    vi,
                    {
                      pane: t,
                      pageNumber: z,
                      width: q,
                      devicePixelRatio: ne,
                      active: At.has(z),
                      syncedMinHeight: (l == null ? void 0 : l.get(z)) || 0,
                      onMetrics: d,
                      cachedAspect: oe.get(z),
                      onAspectChange: ye,
                      sentinelRef: lt(z),
                      regionHighlight: (Ie == null ? void 0 : Ie.box.page) === z ? Ie : null,
                      regionTargets: Oe.get(z),
                      onSelectRegion: v,
                      liveTranslationLayout: S == null ? void 0 : S.layoutByPage.get(z - 1),
                      liveTranslationPage: S == null ? void 0 : S.pagesByPage.get(z - 1),
                      showLiveTranslation: w
                    },
                    `${t}-${z}`
                  );
                const W = oe.get(z) ?? Ur, H = Math.max(120, Math.floor(q * W)), se = Math.max(H, Math.ceil((l == null ? void 0 : l.get(z)) || 0));
                return /* @__PURE__ */ y(
                  "div",
                  {
                    ref: lt(z),
                    [We]: z,
                    [Je]: t,
                    [sn]: H,
                    className: cn,
                    style: {
                      width: q,
                      height: se,
                      minHeight: se
                    },
                    children: /* @__PURE__ */ y(
                      "div",
                      {
                        className: St,
                        style: { width: q, height: H },
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
), Wn = en(Ii), Br = nn(null), Hr = nn(null);
function Ti({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ y(Br.Provider, { value: e, children: /* @__PURE__ */ y(Hr.Provider, { value: t, children: n }) });
}
function ct() {
  return rn(Br);
}
function Ei() {
  return rn(Hr);
}
function Mi({
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
function Ai(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function ki(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function Ni(e) {
  const t = ct(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", c = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, l = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), d = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, u = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? it, b = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, p = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), g = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, v = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, S = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, w = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", h = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", P = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, E = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, M = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), F = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), L = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), k = e.regions ?? (t == null ? void 0 : t.regions) ?? [], I = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), R = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), T = Mi({
    mode: s,
    compareMode: c,
    showSource: i,
    showTranslated: l,
    markdownSplit: n,
    overlayOnSource: d
  }), x = Ai(
    b,
    n || r,
    typeof document > "u" ? b * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ y(
    "div",
    {
      ref: u,
      className: Er,
      "data-reader-region-count": k.length,
      "data-reader-structured-region-count": k.filter(gr).length,
      "data-reader-metadata-ready": I ? "true" : "false",
      children: /* @__PURE__ */ D(
        "main",
        {
          className: `${Ba} reader-mode-${T.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            g ? /* @__PURE__ */ y(
              Wn,
              {
                pane: "source",
                url: w,
                preloadedFile: P,
                userZoom: m,
                visible: T.showSource,
                scrollRoot: f,
                pageWidthOverride: x,
                rowHeights: T.compareMode ? p : void 0,
                onMetrics: M,
                emptyLabel: S ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: F,
                activeRegion: L,
                regions: k,
                readerMetadata: I,
                onSelectRegion: R,
                liveTranslation: d ? o : void 0,
                showLiveTranslation: d,
                liveTranslationPendingLabel: d ? ki(o) : "",
                paneAction: d ? /* @__PURE__ */ D(Rt, { children: [
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
              Wn,
              {
                pane: "translated",
                url: h,
                preloadedFile: E,
                userZoom: m,
                visible: T.showTranslated,
                scrollRoot: f,
                pageWidthOverride: x,
                rowHeights: T.compareMode ? p : void 0,
                onMetrics: M,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: F,
                activeRegion: L,
                regions: k,
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
const Ci = [
  { id: "source", label: "源文件", Icon: vr },
  { id: "compare", label: "对照", Icon: Sr },
  { id: "translated", label: "翻译文件", Icon: wr }
];
function Jn(e) {
  return `辅助面板占了右半边，对照只剩${e === "translated" ? "译文" : "原文"} · 点此关闭面板恢复对照`;
}
function Li(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function xi(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function _i(e) {
  const t = ct(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null,
    compareDegraded: s = !1,
    onRestoreCompare: c
  } = e, i = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, l = a ? Li(a.state) : "";
  return /* @__PURE__ */ D("header", { className: "reader-workspace-bar", children: [
    a ? /* @__PURE__ */ D(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${a.state.connection}${a.visible ? " is-active" : ""}`,
        "aria-pressed": a.visible,
        "aria-label": a.visible ? "隐藏实时译文" : "显示实时译文",
        title: a.state.error || l,
        onClick: a.onToggle,
        children: [
          /* @__PURE__ */ y(Fo, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { className: "reader-live-translation-toggle-label", children: l })
        ]
      }
    ) : null,
    /* @__PURE__ */ y("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: Ci.map(({ id: d, label: u, Icon: f }) => {
      const m = n === d, b = xi({
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
        onClick: c,
        title: Jn(n),
        children: [
          /* @__PURE__ */ y(Oo, { size: 13, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { className: "reader-compare-degraded-label", children: Jn(n) })
        ]
      }
    ) : null
  ] });
}
const zi = {
  markdown: { label: "Markdown", short: "MD", Icon: $o, needsJob: !0 },
  notes: { label: "批注", short: "注", Icon: Pr, needsJob: !1 }
  // 手写批注和 agent 标的批注不合并：前者可改可删可导出，后者是 agent 重写整份
  // 摘录走 documentId 也能读，没有 job 一样有内容。
}, Di = Nr.map(
  (e) => ({ id: e, ...zi[e] })
), Fi = {
  // 这个面板叫「AI」而不是「终端」：它是阅读页里**唯一**的 AI 入口。
  //
  // 原来一篇文档有三扇 AI 的门 —— AI 问答面板（自带一套 chunking + retrieval +
  // LLM 的 Rust 栈）、这个终端（agent 进程）、阅读地图（渲染 agent 产物）——
  // 三者互不知道对方存在，两套 LLM 栈零共用代码。15 本书上的用量是
  // 4 / 17 / 1，留用得最多且能力是超集的那个。
  //
  // id 仍是 terminal：改 id 会让所有存着的面板恢复记录失效。
  terminal: {
    label: "AI",
    short: "AI",
    Icon: Rr,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    ariaLabel: "AI（agent 终端）",
    keepMounted: !0
  }
}, Wr = Cr.map(
  (e) => ({ id: e, ...Fi[e] })
);
function Oi(e) {
  return [
    ...Di.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: a
    })),
    ...Wr.filter((t) => e(t.adapterKey)).map(({ id: t, label: n, short: r, Icon: o }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: !1
    }))
  ];
}
function $i() {
  const e = fe();
  return Oi((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function ji(e) {
  const t = ct(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), c = $i();
  return n ? /* @__PURE__ */ D("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ y("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: c.map(({ id: i, label: l, Icon: d, needsJob: u }) => {
      const f = n === i, m = u && o, b = r == null ? void 0 : r[i];
      return /* @__PURE__ */ D(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": f,
          className: `reader-assistant-dock-tab${f ? " is-active" : ""}`,
          title: m ? `${l} 需打开任务阅读` : l,
          disabled: m,
          onClick: () => a(i),
          children: [
            /* @__PURE__ */ y(d, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ y("span", { className: "reader-assistant-dock-tab-label", children: l }),
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
        children: /* @__PURE__ */ y(on, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ y("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: c.map(({ id: i, label: l, short: d, Icon: u, needsJob: f }) => {
    const m = f && o, b = r == null ? void 0 : r[i];
    return /* @__PURE__ */ D(
      "button",
      {
        type: "button",
        className: "reader-assistant-rail-button",
        "aria-label": `打开${l}`,
        title: m ? `${l} 需打开任务阅读` : l,
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
function Ui(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function Bi(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function Hi(e) {
  return e / 100 * window.innerHeight;
}
function Wi(e) {
  return e / 100 * window.innerWidth;
}
function Ji(e) {
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
  const [o, a] = Ji(n);
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
      r = Bi(t, o);
      break;
    }
    case "em": {
      r = Ui(t, o);
      break;
    }
    case "vh": {
      r = Hi(o);
      break;
    }
    case "vw": {
      r = Wi(o);
      break;
    }
  }
  return r;
}
function ce(e) {
  return parseFloat(e.toFixed(3));
}
function Ve({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, o) => (r += t === "horizontal" ? o.element.offsetWidth : o.element.offsetHeight, r), 0);
}
function Gt(e) {
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
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.collapsedSize
      });
      s = ce(d / n * 100);
    }
    let c;
    if (a.defaultSize !== void 0) {
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      c = ce(d / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.minSize
      });
      i = ce(d / n * 100);
    }
    let l = 100;
    if (a.maxSize !== void 0) {
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      l = ce(d / n * 100);
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
function G(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function Zt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? Vi : qi
  );
}
function Vi(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function qi(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function Jr(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Vr(e, t) {
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
function Ki({
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
    const { x: c, y: i } = Vr(r, s), l = e === "horizontal" ? c : i;
    l < a && (a = l, o = s);
  }
  return G(o, "No rect found"), o;
}
let pt;
function Gi() {
  return pt === void 0 && (typeof matchMedia == "function" ? pt = !!matchMedia("(pointer:coarse)").matches : pt = !1), pt;
}
function qr(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = Zt(
    n,
    Array.from(t.children).filter(Jr).map((b) => ({ element: b }))
  ).map(({ element: b }) => b), s = [];
  let c = !1, i = !1, l = -1, d = -1, u = 0, f, m = [];
  {
    let b = -1;
    for (const p of a)
      p.hasAttribute("data-panel") && (b++, p.hasAttribute("data-disabled") || (u++, l === -1 && (l = b), d = b));
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
            let w;
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
              ), P = n === "horizontal" ? new DOMRect(S.left, S.top, 0, S.height) : new DOMRect(S.left, S.top, S.width, 0);
              switch (m.length) {
                case 0: {
                  w = [
                    h,
                    P
                  ];
                  break;
                }
                case 1: {
                  const E = m[0], M = Ki({
                    orientation: n,
                    rects: [v, S],
                    targetRect: E.element.getBoundingClientRect()
                  });
                  w = [
                    E,
                    M === v ? P : h
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
            for (const h of w) {
              let P = "width" in h ? h : h.element.getBoundingClientRect();
              const E = Gi() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (P.width < E) {
                const F = E - P.width;
                P = new DOMRect(
                  P.x - F / 2,
                  P.y,
                  P.width + F,
                  P.height
                );
              }
              if (P.height < E) {
                const F = E - P.height;
                P = new DOMRect(
                  P.x,
                  P.y - F / 2,
                  P.width,
                  P.height + F
                );
              }
              const M = b <= l || b > d;
              !c && !M && s.push({
                group: e,
                groupSize: Ve({ group: e }),
                panels: [f, g],
                separator: "width" in h ? void 0 : h,
                rect: P
              }), c = !1;
            }
          }
          i = !1, f = g, m = [];
        }
      } else if (p.hasAttribute("data-separator")) {
        p.ariaDisabled !== null && (c = !0);
        const g = o.find(
          (v) => v.element === p
        );
        g ? m.push(g) : (f = void 0, m = []);
      } else
        i = !0;
  }
  return s;
}
var Ee;
class Kr {
  constructor() {
    Mn(this, Ee, {});
  }
  addListener(t, n) {
    const r = Ke(this, Ee)[t];
    return r === void 0 ? Ke(this, Ee)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = Ke(this, Ee)[t];
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
    An(this, Ee, {});
  }
  removeListener(t, n) {
    const r = Ke(this, Ee)[t];
    if (r !== void 0) {
      const o = r.indexOf(n);
      o >= 0 && r.splice(o, 1);
    }
  }
}
Ee = new WeakMap();
let Be = {
  cursorFlags: 0,
  state: "inactive"
};
const fn = new Kr();
function Ne() {
  return Be;
}
function Zi(e) {
  return fn.addListener("change", e);
}
function Yi(e) {
  const t = Be, n = { ...Be };
  n.cursorFlags = e, Be = n, fn.emit("change", {
    prev: t,
    next: n
  });
}
function He(e) {
  const t = Be;
  Be = e, fn.emit("change", {
    prev: t,
    next: e
  });
}
const Xi = (e) => e, Ft = () => {
}, Gr = 1, Zr = 2, Yr = 4, Xr = 8, Vn = 3, qn = 12;
let ht;
function Kn() {
  return ht === void 0 && (ht = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (ht = !0)), ht;
}
function Qi({
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
        if (e && Kn()) {
          const a = (e & Gr) !== 0, s = (e & Zr) !== 0, c = (e & Yr) !== 0, i = (e & Xr) !== 0;
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
    return Kn() ? r > 0 && o > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && o > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const Gn = /* @__PURE__ */ new WeakMap();
function mn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = Gn.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = Ne();
  switch (r.state) {
    case "active":
    case "hover": {
      const o = Qi({
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
  Gn.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let be = /* @__PURE__ */ new Map();
const Qr = new Kr();
function ec(e) {
  be = new Map(be), be.delete(e);
}
function Zn(e, t) {
  for (const [n] of be)
    if (n.id === e)
      return n;
}
function Me(e, t) {
  for (const [n, r] of be)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function _e() {
  return be;
}
function pn(e, t) {
  return Qr.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Re(e, t, n) {
  const r = be.get(e);
  be = new Map(be), be.set(e, t), Qr.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function eo(e) {
  const t = Ne();
  let n = !1;
  switch (t.state) {
    case "active":
      He({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (mn(e), n = !0, t.hitRegions.forEach((r) => {
        const o = Me(r.group.id, !0);
        Re(r.group, o, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function Yn(e) {
  e.defaultPrevented || eo(e.currentTarget);
}
function tc(e, t, n) {
  let r, o = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const s = Vr(n, a.rect);
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
function nc(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function rc(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: er(e),
    b: er(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  G(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const o = {
    a: Qn(Xn(n.a)),
    b: Qn(Xn(n.b))
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
const oc = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function ac(e) {
  const t = getComputedStyle(to(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function sc(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || ac(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || oc.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function Xn(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (G(n, "Missing node"), sc(n)) return n;
  }
  return null;
}
function Qn(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function er(e) {
  const t = [];
  for (; e; )
    t.push(e), e = to(e);
  return t;
}
function to(e) {
  const { parentNode: t } = e;
  return nc(t) ? t.host : t;
}
function ic(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function cc({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!Jr(n) || n.contains(e) || e.contains(n))
    return !0;
  if (rc(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (ic(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function hn(e, t) {
  const n = [];
  return t.forEach((r, o) => {
    if (o.disabled)
      return;
    const a = qr(o), s = tc(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && cc({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function lc(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function ie(e, t, n = 0) {
  return Math.abs(ce(e) - ce(t)) <= n;
}
function ge(e, t) {
  return ie(e, t) ? 0 : e > t ? 1 : -1;
}
function Ue({
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
  if (ge(r, i) < 0)
    if (a) {
      const l = (o + i) / 2;
      ge(r, l) < 0 ? r = o : r = i;
    } else
      r = i;
  return r = Math.min(c, r), r = ce(r), r;
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
  const s = a === "imperative-api", c = Object.values(t), i = Object.values(o), l = [...c], [d, u] = r;
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
          minSize: w = 0
        } = g;
        if (S) {
          const h = c[p];
          if (G(
            h != null,
            `Previous layout not found for panel index ${p}`
          ), ie(h, v)) {
            const P = w - h;
            ge(P, Math.abs(e)) > 0 && (e = e < 0 ? 0 - P : P);
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
          minSize: w = 0
        } = g;
        if (S) {
          const h = c[p];
          if (G(
            h != null,
            `Previous layout not found for panel index ${p}`
          ), ie(h, w)) {
            const P = h - v;
            ge(P, Math.abs(e)) > 0 && (e = e < 0 ? 0 - P : P);
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
      const v = c[p], { collapsible: S, collapsedSize: w, minSize: h } = g;
      if (S && ge(v, h) < 0)
        if (e > 0) {
          const P = h - w, E = P / 2, M = v + e;
          ge(M, h) < 0 && (e = ge(e, E) <= 0 ? 0 : P);
        } else {
          const P = h - w, E = 100 - P / 2, M = v - e;
          ge(M, h) < 0 && (e = ge(100 + e, E) > 0 ? 0 : -P);
        }
      break;
    }
  }
  {
    const p = e < 0 ? 1 : -1;
    let g = e < 0 ? u : d, v = 0;
    for (; ; ) {
      const w = c[g];
      G(
        w != null,
        `Previous layout not found for panel index ${g}`
      );
      const h = Ue({
        overrideDisabledPanels: s,
        panelConstraints: n[g],
        prevSize: w,
        size: 100
      }) - w;
      if (v += h, g += p, g < 0 || g >= n.length)
        break;
    }
    const S = Math.min(Math.abs(e), Math.abs(v));
    e = e < 0 ? 0 - S : S;
  }
  {
    let p = e < 0 ? d : u;
    for (; p >= 0 && p < n.length; ) {
      const g = Math.abs(e) - Math.abs(f), v = c[p];
      G(
        v != null,
        `Previous layout not found for panel index ${p}`
      );
      const S = v - g, w = Ue({
        overrideDisabledPanels: s,
        panelConstraints: n[p],
        prevSize: v,
        size: S
      });
      if (!ie(v, w) && (f += v - w, l[p] = w, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? p-- : p++;
    }
  }
  if (lc(i, l))
    return o;
  {
    const p = e < 0 ? u : d, g = c[p];
    G(
      g != null,
      `Previous layout not found for panel index ${p}`
    );
    const v = g + f, S = Ue({
      overrideDisabledPanels: s,
      panelConstraints: n[p],
      prevSize: g,
      size: v
    });
    if (l[p] = S, !ie(S, v)) {
      let w = v - S, h = e < 0 ? u : d;
      for (; h >= 0 && h < n.length; ) {
        const P = l[h];
        G(
          P != null,
          `Previous layout not found for panel index ${h}`
        );
        const E = P + w, M = Ue({
          overrideDisabledPanels: s,
          panelConstraints: n[h],
          prevSize: P,
          size: E
        });
        if (ie(P, M) || (w -= M - P, l[h] = M), ie(w, 0))
          break;
        e > 0 ? h-- : h++;
      }
    }
  }
  const m = Object.values(l).reduce(
    (p, g) => g + p,
    0
  );
  if (!ie(m, 100, 0.1))
    return o;
  const b = Object.keys(o);
  return l.reduce((p, g, v) => (p[b[v]] = g, p), {});
}
function Ce(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || ge(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function Le({
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
  if (!ie(o, 100) && r.length > 0)
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      G(i != null, `No layout data found for index ${c}`);
      const l = 100 / o * i;
      r[c] = l;
    }
  let a = 0;
  for (let c = 0; c < t.length; c++) {
    const i = n[c];
    G(i != null, `No layout data found for index ${c}`);
    const l = r[c];
    G(l != null, `No layout data found for index ${c}`);
    const d = Ue({
      overrideDisabledPanels: !0,
      panelConstraints: t[c],
      prevSize: i,
      size: l
    });
    l != d && (a += l - d, r[c] = d);
  }
  if (!ie(a, 0))
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      G(i != null, `No layout data found for index ${c}`);
      const l = i + a, d = Ue({
        overrideDisabledPanels: !0,
        panelConstraints: t[c],
        prevSize: i,
        size: l
      });
      if (i !== d && (a -= d - i, r[c] = d, ie(a, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((c, i, l) => (c[s[l]] = i, c), {});
}
function no({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const i = _e();
    for (const [
      l,
      {
        defaultLayoutDeferred: d,
        derivedPanelConstraints: u,
        layout: f,
        groupSize: m,
        separatorToPanels: b
      }
    ] of i)
      if (l.id === e)
        return {
          defaultLayoutDeferred: d,
          derivedPanelConstraints: u,
          group: l,
          groupSize: m,
          layout: f,
          separatorToPanels: b
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
    const f = a(), m = l.findIndex((g) => g.id === t), b = m === 0, p = m === l.length - 1;
    if (p && i < f && (b || l.slice(0, m).every((g, v) => {
      const S = u[v];
      return (S == null ? void 0 : S.collapsible) && ie(S.collapsedSize, d[S.panelId]);
    }))) {
      const g = l.slice(0, m).reduce((v, S) => v + d[S.id], 0);
      return {
        ...d,
        [t]: ce(100 - g)
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
  }, c = (i) => {
    const l = a();
    if (i === l)
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
    }), v = Le({
      layout: g,
      panelConstraints: u
    });
    Ce(b, v) || Re(f, {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      groupSize: m,
      layout: v,
      separatorToPanels: p
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
        let m = u.expandToSize ?? d;
        m === 0 && (m = 1), c(m);
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
      return i && ie(l, d);
    },
    resize: (i) => {
      const { group: l } = n(), { element: d } = o(), u = Ve({ group: l }), f = Xe({
        groupSize: u,
        panelElement: d,
        styleProp: i
      }), m = ce(f / u * 100);
      c(m);
    }
  };
}
function tr(e) {
  if (e.defaultPrevented)
    return;
  const t = _e();
  hn(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (o) => o.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const o = r.panelConstraints.defaultSize, a = no({
          groupId: n.group.id,
          panelId: r.id
        });
        a && o !== void 0 && (a.resize(o), e.preventDefault());
      }
    }
  });
}
function gt(e) {
  const t = _e();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function ro({
  groupId: e
}) {
  const t = () => {
    const n = _e();
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
      } = t(), l = Le({
        layout: n,
        panelConstraints: o
      });
      return r ? c : (Ce(c, l) || Re(a, {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: o,
        groupSize: s,
        layout: l,
        separatorToPanels: i
      }), l);
    }
  };
}
function ke(e, t) {
  const n = gt(e), r = Me(n.id, !0), o = n.separators.find(
    (d) => d.element === e
  );
  G(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  G(a, "Matching panels not found");
  const s = a.map((d) => n.panels.indexOf(d)), c = ro({ groupId: n.id }).getLayout(), i = ot({
    delta: t,
    initialLayout: c,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: c,
    trigger: "keyboard"
  }), l = Le({
    layout: i,
    panelConstraints: r.derivedPanelConstraints
  });
  Ce(c, l) || Re(
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
function nr(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = gt(t);
  if (!n.disabled)
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault(), n.orientation === "vertical" && ke(t, 5);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault(), n.orientation === "horizontal" && ke(t, -5);
        break;
      }
      case "ArrowRight": {
        e.preventDefault(), n.orientation === "horizontal" && ke(t, 5);
        break;
      }
      case "ArrowUp": {
        e.preventDefault(), n.orientation === "vertical" && ke(t, -5);
        break;
      }
      case "End": {
        e.preventDefault(), ke(t, 100);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const r = gt(t), o = Me(r.id, !0), { derivedPanelConstraints: a, layout: s, separatorToPanels: c } = o, i = r.separators.find(
          (f) => f.element === t
        );
        G(i, "Matching separator not found");
        const l = c.get(i);
        G(l, "Matching panels not found");
        const d = l[0], u = a.find(
          (f) => f.panelId === d.id
        );
        if (G(u, "Panel metadata not found"), u.collapsible) {
          const f = s[d.id], m = u.collapsedSize === f ? r.mutableState.expandedPanelSizes[d.id] ?? u.minSize : u.collapsedSize;
          ke(t, m - f);
        }
        break;
      }
      case "F6": {
        e.preventDefault();
        const r = gt(t).separators.map(
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
        e.preventDefault(), ke(t, -100);
        break;
      }
    }
}
function rr(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = _e(), n = hn(e, t), r = /* @__PURE__ */ new Map();
  let o = !1;
  n.forEach((a) => {
    a.separator && (o || (o = !0, a.separator.element.focus({
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
      focusVisible: !1,
      preventScroll: !0
    })));
    const s = t.get(a.group);
    s && r.set(a.group, s.layout);
  }), He({
    cursorFlags: 0,
    hitRegions: n,
    initialLayoutMap: r,
    pointerDownAtPoint: { x: e.clientX, y: e.clientY },
    state: "active"
  }), n.length && e.preventDefault();
}
function oo({
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
    const { group: d, groupSize: u } = l, { orientation: f, panels: m } = d, { disableCursor: b } = d.mutableState;
    let p = 0;
    a ? f === "horizontal" ? p = (t.clientX - a.x) / u * 100 : p = (t.clientY - a.y) / u * 100 : f === "horizontal" ? p = t.clientX < 0 ? -100 : 100 : p = t.clientY < 0 ? -100 : 100;
    const g = r.get(d), v = o.get(d);
    if (!g || !v)
      return;
    const {
      defaultLayoutDeferred: S,
      derivedPanelConstraints: w,
      groupSize: h,
      layout: P,
      separatorToPanels: E
    } = v;
    if (w && P && E) {
      const M = ot({
        delta: p,
        initialLayout: g,
        panelConstraints: w,
        pivotIndices: l.panels.map((F) => m.indexOf(F)),
        prevLayout: P,
        trigger: "mouse-or-touch"
      });
      if (Ce(M, P)) {
        if (p !== 0 && !b)
          switch (f) {
            case "horizontal": {
              c |= p < 0 ? Gr : Zr;
              break;
            }
            case "vertical": {
              c |= p < 0 ? Yr : Xr;
              break;
            }
          }
      } else
        Re(l.group, {
          defaultLayoutDeferred: S,
          derivedPanelConstraints: w,
          groupSize: h,
          layout: M,
          separatorToPanels: E
        });
    }
  });
  let i = 0;
  t.movementX === 0 ? i |= s & Vn : i |= c & Vn, t.movementY === 0 ? i |= s & qn : i |= c & qn, Yi(i), mn(e);
}
function or(e) {
  const t = _e(), n = Ne();
  switch (n.state) {
    case "active":
      oo({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function ar(e) {
  var r, o;
  if (e.defaultPrevented)
    return;
  const t = Ne(), n = _e();
  switch (t.state) {
    case "active": {
      if (
        // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
        e.buttons === 0
      ) {
        He({
          cursorFlags: 0,
          state: "inactive"
        }), t.hitRegions.forEach((a) => {
          const s = Me(a.group.id, !0);
          Re(a.group, s, {
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
      oo({
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
      const a = hn(e, n);
      a.length === 0 ? t.state !== "inactive" && He({
        cursorFlags: 0,
        state: "inactive"
      }) : He({
        cursorFlags: 0,
        hitRegions: a,
        state: "hover"
      }), mn(e.currentTarget);
      break;
    }
  }
}
function sr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (Ne().state) {
      case "hover":
        He({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function ir(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || eo(e.currentTarget) && e.preventDefault();
}
function cr(e) {
  let t = 0, n = 0;
  const r = {};
  for (const a of e)
    if (a.defaultSize !== void 0) {
      t++;
      const s = ce(a.defaultSize);
      n += s, r[a.panelId] = s;
    } else
      r[a.panelId] = void 0;
  const o = e.length - t;
  if (o !== 0) {
    const a = ce((100 - n) / o);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = a);
  }
  return r;
}
function dc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = Ve({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, c = {
    asPercentage: ce(a / o * 100),
    inPixels: a
  };
  r.mutableValues.prevSize = c, r.onResize(c, r.id, s);
}
function uc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function fc({
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
        const m = f / 100 * n, b = ce(
          m / t * 100
        );
        c.set(u.id, b), o += b;
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
      d[u] = ce(
        f / a * l
      );
    }
  else {
    const u = ce(
      l / i.length
    );
    for (const f of i)
      d[f] = u;
  }
  return d;
}
function mc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const $e = /* @__PURE__ */ new Map();
function pc(e) {
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
          const S = Ve({ group: e });
          if (S === 0)
            return;
          const w = Me(e.id);
          if (!w)
            return;
          const h = Gt(e), P = w.defaultLayoutDeferred ? cr(h) : w.layout, E = fc({
            group: e,
            nextGroupSize: S,
            prevGroupSize: w.groupSize,
            prevLayout: P
          }), M = Le({
            layout: E,
            panelConstraints: h
          });
          if (!w.defaultLayoutDeferred && Ce(w.layout, M) && uc(
            w.derivedPanelConstraints,
            h
          ) && w.groupSize === S)
            return;
          Re(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: h,
            groupSize: S,
            layout: M,
            separatorToPanels: w.separatorToPanels
          });
        }
      } else
        dc(e, v, g);
    }
  });
  a.observe(e.element), e.panels.forEach((b) => {
    G(
      !r.has(b.id),
      `Panel ids must be unique; id "${b.id}" was used more than once`
    ), r.add(b.id), b.onResize && a.observe(b.element);
  });
  const s = Ve({ group: e }), c = Gt(e), i = e.panels.map(({ id: b }) => b).join(",");
  let l = e.mutableState.defaultLayout;
  l && (mc(e.panels, l) || (l = void 0));
  const d = e.mutableState.layouts[i] ?? l ?? cr(c), u = Le({
    layout: d,
    panelConstraints: c
  }), f = e.element.ownerDocument;
  $e.set(
    f,
    ($e.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return qr(e).forEach((b) => {
    b.separator && m.set(b.separator, b.panels);
  }), Re(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: c,
    groupSize: s,
    layout: u,
    separatorToPanels: m
  }), e.separators.forEach((b) => {
    G(
      !o.has(b.id),
      `Separator ids must be unique; id "${b.id}" was used more than once`
    ), o.add(b.id), b.element.addEventListener("keydown", nr);
  }), $e.get(f) === 1 && (f.addEventListener("contextmenu", Yn, !0), f.addEventListener("dblclick", tr, !0), f.addEventListener("pointerdown", rr, !0), f.addEventListener("pointerleave", or), f.addEventListener("pointermove", ar), f.addEventListener("pointerout", sr), f.addEventListener("pointerup", ir, !0)), function() {
    t = !1, $e.set(
      f,
      Math.max(0, ($e.get(f) ?? 0) - 1)
    ), ec(e), e.separators.forEach((b) => {
      b.element.removeEventListener("keydown", nr);
    }), $e.get(f) || (f.removeEventListener(
      "contextmenu",
      Yn,
      !0
    ), f.removeEventListener(
      "dblclick",
      tr,
      !0
    ), f.removeEventListener(
      "pointerdown",
      rr,
      !0
    ), f.removeEventListener("pointerleave", or), f.removeEventListener("pointermove", ar), f.removeEventListener("pointerout", sr), f.removeEventListener("pointerup", ir, !0)), a.disconnect();
  };
}
function hc() {
  const [e, t] = C({}), n = _(() => t({}), []);
  return [e, n];
}
function gn(e) {
  const t = hr();
  return `${e ?? t}`;
}
const ze = typeof window < "u" ? xe : $;
function et(e) {
  const t = A(e);
  return ze(() => {
    t.current = e;
  }, [e]), _(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function bn(...e) {
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
function yn(e) {
  const t = A({ ...e });
  return ze(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const ao = nn(null);
function gc(e, t) {
  const n = A({
    getLayout: () => ({}),
    setLayout: Xi
  });
  tn(t, () => n.current, []), ze(() => {
    Object.assign(
      n.current,
      ro({ groupId: e })
    );
  });
}
function so({
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
  ...m
}) {
  const b = A({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), p = et((I) => {
    Ce(b.current.onLayoutChange, I) || (b.current.onLayoutChange = I, i == null || i(I));
  }), g = et(
    (I, R) => {
      Ce(b.current.onLayoutChanged, I) || (b.current.onLayoutChanged = I, l == null || l(I, { isUserInteraction: R }));
    }
  ), v = gn(c), S = A(null), [w, h] = hc(), P = A({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: u,
    separators: []
  }), E = bn(S, a);
  gc(v, s);
  const M = et(
    (I, R) => {
      const T = Ne(), x = Zn(I), N = Me(I);
      if (N) {
        let j = !1;
        switch (T.state) {
          case "active": {
            j = T.hitRegions.some(
              (B) => B.group === x
            );
            break;
          }
        }
        return {
          flexGrow: N.layout[R] ?? 1,
          pointerEvents: j ? "none" : void 0
        };
      }
      if (n != null && n[R])
        return {
          flexGrow: n == null ? void 0 : n[R]
        };
    }
  ), F = yn({
    defaultLayout: n,
    disableCursor: r
  }), L = J(
    () => ({
      get disableCursor() {
        return !!F.disableCursor;
      },
      getPanelStyles: M,
      id: v,
      orientation: d,
      registerPanel: (I) => {
        const R = P.current;
        return R.panels = Zt(d, [
          ...R.panels,
          I
        ]), h(), () => {
          R.panels = R.panels.filter(
            (T) => T !== I
          ), h();
        };
      },
      registerSeparator: (I) => {
        const R = P.current;
        return R.separators = Zt(d, [
          ...R.separators,
          I
        ]), h(), () => {
          R.separators = R.separators.filter(
            (T) => T !== I
          ), h();
        };
      },
      updatePanelProps: (I, { disabled: R }) => {
        const T = P.current.panels.find(
          (j) => j.id === I
        );
        T && (T.panelConstraints.disabled = R);
        const x = Zn(v), N = Me(v);
        x && N && Re(x, {
          ...N,
          derivedPanelConstraints: Gt(x)
        });
      },
      updateSeparatorProps: (I, {
        disabled: R,
        disableDoubleClick: T
      }) => {
        const x = P.current.separators.find(
          (N) => N.id === I
        );
        x && (x.disabled = R, x.disableDoubleClick = T);
      }
    }),
    [M, v, h, d, F]
  ), k = A(null);
  return ze(() => {
    const I = S.current;
    if (I === null)
      return;
    const R = P.current;
    let T;
    if (F.defaultLayout !== void 0 && Object.keys(F.defaultLayout).length === R.panels.length) {
      T = {};
      for (const re of R.panels) {
        const O = F.defaultLayout[re.id];
        O !== void 0 && (T[re.id] = O);
      }
    }
    const x = {
      disabled: !!o,
      element: I,
      id: v,
      mutableState: {
        defaultLayout: T,
        disableCursor: !!F.disableCursor,
        expandedPanelSizes: P.current.lastExpandedPanelSizes,
        layouts: P.current.layouts
      },
      orientation: d,
      panels: R.panels,
      resizeTargetMinimumSize: R.resizeTargetMinimumSize,
      separators: R.separators
    };
    k.current = x;
    const N = pc(x), { defaultLayoutDeferred: j, derivedPanelConstraints: B, layout: Z } = Me(x.id, !0);
    !j && B.length > 0 && (p(Z), g(Z, !1));
    const te = pn(v, (re) => {
      const { defaultLayoutDeferred: O, derivedPanelConstraints: U, layout: ne } = re.next;
      if (O || U.length === 0)
        return;
      const ee = x.panels.map(({ id: oe }) => oe).join(",");
      x.mutableState.layouts[ee] = ne, U.forEach((oe) => {
        if (oe.collapsible) {
          const { layout: de } = re.prev ?? {};
          if (de) {
            const ue = ie(
              oe.collapsedSize,
              ne[oe.panelId]
            ), De = ie(
              oe.collapsedSize,
              de[oe.panelId]
            );
            ue && !De && (x.mutableState.expandedPanelSizes[oe.panelId] = de[oe.panelId]);
          }
        }
      });
      const q = Ne().state !== "active";
      p(ne), q && g(ne, re.isUserInteraction);
    });
    return () => {
      k.current = null, N(), te();
    };
  }, [
    o,
    v,
    g,
    p,
    d,
    w,
    F
  ]), $(() => {
    const I = k.current;
    I && (I.mutableState.defaultLayout = n, I.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ y(ao.Provider, { value: L, children: /* @__PURE__ */ y(
    "div",
    {
      ...m,
      className: t,
      "data-group": !0,
      "data-testid": v,
      id: v,
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
so.displayName = "Group";
function vn() {
  const e = rn(ao);
  return G(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function bc(e, t) {
  const { id: n } = vn(), r = A({
    collapse: Ft,
    expand: Ft,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Ft
  });
  tn(t, () => r.current, []), ze(() => {
    Object.assign(
      r.current,
      no({ groupId: n, panelId: e })
    );
  });
}
function Yt({
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
  style: m,
  ...b
}) {
  const p = !!i, g = gn(i), v = yn({
    disabled: a
  }), S = A(null), w = bn(S, s), {
    getPanelStyles: h,
    id: P,
    orientation: E,
    registerPanel: M,
    updatePanelProps: F
  } = vn(), L = u !== null, k = et(
    (x, N, j) => {
      u == null || u(x, i, j);
    }
  );
  ze(() => {
    const x = S.current;
    if (x !== null) {
      const N = {
        element: x,
        id: g,
        idIsStable: p,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: L ? k : void 0,
        panelConstraints: {
          groupResizeBehavior: c,
          collapsedSize: n,
          collapsible: r,
          defaultSize: o,
          disabled: v.disabled,
          maxSize: l,
          minSize: d
        }
      };
      return M(N);
    }
  }, [
    c,
    n,
    r,
    o,
    L,
    g,
    p,
    l,
    d,
    k,
    M,
    v
  ]), $(() => {
    F(g, { disabled: a });
  }, [a, g, F]), bc(g, f);
  const I = () => {
    const x = h(P, g);
    if (x)
      return JSON.stringify(x);
  }, R = go(
    (x) => pn(P, x),
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
      ref: w,
      style: {
        ...yc,
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
            touchAction: E === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
Yt.displayName = "Panel";
const yc = {
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
function vc({
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
    a = Le({
      layout: ot({
        delta: l - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], o = Le({
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
function io({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: o,
  id: a,
  style: s,
  ...c
}) {
  const i = gn(a), l = yn({
    disabled: n,
    disableDoubleClick: r
  }), [d, u] = C({}), [f, m] = C("inactive"), [b, p] = C(!1), g = A(null), v = bn(g, o), {
    disableCursor: S,
    id: w,
    orientation: h,
    registerSeparator: P,
    updateSeparatorProps: E
  } = vn(), M = h === "horizontal" ? "vertical" : "horizontal";
  ze(() => {
    const k = g.current;
    if (k !== null) {
      const I = {
        disabled: l.disabled,
        disableDoubleClick: l.disableDoubleClick,
        element: k,
        id: i
      }, R = P(I), T = Zi(
        (N) => {
          m(
            N.next.state !== "inactive" && N.next.hitRegions.some(
              (j) => j.separator === I
            ) ? N.next.state : "inactive"
          );
        }
      ), x = pn(
        w,
        (N) => {
          const { derivedPanelConstraints: j, layout: B, separatorToPanels: Z } = N.next, te = Z.get(I);
          if (te) {
            const re = te[0], O = te.indexOf(re);
            u(
              vc({
                layout: B,
                panelConstraints: j,
                panelId: re.id,
                panelIndex: O
              })
            );
          }
        }
      );
      return () => {
        T(), x(), R();
      };
    }
  }, [w, i, P, l]), $(() => {
    E(i, { disabled: n, disableDoubleClick: r });
  }, [n, r, i, E]);
  let F;
  n && !S && (F = "not-allowed");
  let L;
  if (n)
    L = "disabled";
  else
    switch (f) {
      case "active": {
        L = "active";
        break;
      }
      default:
        b ? L = "focus" : L = f;
    }
  return /* @__PURE__ */ y(
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
      "data-separator": L,
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
io.displayName = "Separator";
const Sn = 30, wn = 65, at = 50, Sc = 100 - wn, wc = 100 - Sn;
function Pc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(wn, Math.max(Sn, t)) : at;
}
function Pn(e) {
  return 100 - e;
}
function je(e) {
  return `${e}%`;
}
const Rn = "reader-document", st = "reader-assistant", co = "retainpdf.reader.ai-split-layout.v1", Rc = {
  [Rn]: Pn(at),
  [st]: at
};
function In(e) {
  const t = Pc(e == null ? void 0 : e[st]);
  return {
    [Rn]: Pn(t),
    [st]: t
  };
}
function Ic() {
  try {
    const e = JSON.parse(localStorage.getItem(co) || "null");
    return In(e);
  } catch {
    return Rc;
  }
}
function Tc(e) {
  try {
    localStorage.setItem(co, JSON.stringify(In(e)));
  } catch {
  }
}
function Ot(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = In(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[st]}vw`
  );
}
function Ec() {
  const e = A(null), [t] = C(Ic);
  xe(() => {
    const o = e.current;
    return Ot(o, t), () => {
      var a;
      (a = o == null ? void 0 : o.closest(".reader-react-root")) == null || a.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = _((o) => {
    Ot(e.current, o);
  }, []), r = _((o, a) => {
    Ot(e.current, o), a.isUserInteraction && Tc(o);
  }, []);
  return /* @__PURE__ */ D(
    so,
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
          Yt,
          {
            id: Rn,
            defaultSize: je(Pn(at)),
            minSize: je(Sc),
            maxSize: je(wc)
          }
        ),
        /* @__PURE__ */ y(
          io,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ y("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ y(
          Yt,
          {
            id: st,
            defaultSize: je(at),
            minSize: je(Sn),
            maxSize: je(wn)
          }
        )
      ]
    }
  );
}
function lo({
  id: e,
  open: t,
  ariaLabel: n,
  className: r = "",
  keepMounted: o = !1,
  onClose: a,
  toolbar: s,
  children: c
}) {
  return $(() => {
    if (!t) return;
    const i = (l) => {
      var u;
      if (l.key !== "Escape") return;
      const d = l.target;
      (u = d == null ? void 0 : d.closest) != null && u.call(d, "textarea, input, select, [contenteditable='true']") || (l.preventDefault(), a());
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
        /* @__PURE__ */ y("div", { className: "reader-notes-panel-body", children: c })
      ]
    }
  );
}
function Mc({
  note: e,
  onJump: t,
  onUpdateNote: n,
  onRemove: r
}) {
  const [o, a] = C(!1), [s, c] = C(e.note);
  return $(() => {
    o || c(e.note);
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
          onChange: (i) => c(i.target.value)
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
function Ac({
  open: e,
  groups: t,
  count: n,
  onClose: r,
  onJump: o,
  onUpdateNote: a,
  onRemove: s,
  onExport: c
}) {
  const [i, l] = C(!1);
  return /* @__PURE__ */ y(
    lo,
    {
      id: "reader-notes-panel",
      open: e,
      ariaLabel: "批注",
      className: "is-pane-right",
      onClose: r,
      toolbar: /* @__PURE__ */ D(Rt, { children: [
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
              await c() && (l(!0), window.setTimeout(() => l(!1), 1800));
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
          Mc,
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
function kc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = C(!1);
  if ($(() => {
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
function Nc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ y(kc, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ D(Rt, { children: [
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
function Cc(e) {
  if (e.selectionType !== "region") return null;
  const t = `${e.region.source.text || ""}`.trim(), n = `${e.region.translated.text || ""}`.trim();
  return !t || !n || t === n ? null : { source: t, translated: n };
}
function Lc(e, t) {
  const n = e.selectionType === "text" ? "text" : e.kind, r = Cc(e), o = r != null, a = o && t ? t : e.pane, s = r ? r[a] : e.selectionType === "text" ? e.quote : yr(e.region, a), c = e.selectionType === "region" ? $t(e.region, a).page : e.page;
  return {
    kind: n,
    pane: a,
    page: c,
    text: s,
    copyValue: n === "formula" ? ko(s) : s,
    canSwitch: o,
    showPeek: o && a !== e.pane
  };
}
const lr = {
  source: "原文",
  translated: "译文"
}, dr = 190, ur = 16;
function xc() {
  const e = typeof window > "u" ? 800 : window.innerWidth;
  if (typeof document > "u") return e;
  const t = document.querySelector(`.${Er}`), n = (t == null ? void 0 : t.getBoundingClientRect().width) ?? 0;
  return n > 0 ? n : e;
}
function _c(e, t) {
  const n = ur + dr, r = t - ur - dr;
  return r < n ? t / 2 : Math.min(Math.max(n, e), r);
}
async function zc(e) {
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
function Dc({
  selection: e,
  onDismiss: t,
  onAskAi: n,
  onAddNote: r
}) {
  const [o, a] = C(!1), [s, c] = C(null), i = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if ($(() => c(null), [i]), $(() => a(!1), [i, s]), !e)
    return null;
  const l = Lc(e, s), d = typeof window < "u" ? window.innerHeight : 600, u = e.rect.left + e.rect.width / 2, f = _c(u, xc()), m = e.rect.top > (l.showPeek ? 220 : 72), b = m ? Math.max(12, e.rect.top - 8) : Math.min(d - 12, e.rect.top + e.rect.height + 8), p = m ? "above" : "below", g = l.kind, v = g === "formula" ? "公式" : g === "table" ? "表格" : g === "figure" ? "图片" : g === "text" ? "文字" : "区域", S = l.copyValue, w = g === "formula" ? jo : g === "table" ? Uo : g === "text" ? Bo : Ho;
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
              /* @__PURE__ */ y(w, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
              /* @__PURE__ */ y("span", { children: v }),
              /* @__PURE__ */ y("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
              l.canSwitch ? /* @__PURE__ */ y("span", { className: "reader-sel-pop-panes", role: "group", "aria-label": "看这段的原文或译文", children: ["source", "translated"].map((h) => /* @__PURE__ */ y(
                "button",
                {
                  type: "button",
                  className: `reader-sel-pop-pane${l.pane === h ? " is-active" : ""}`,
                  "aria-pressed": l.pane === h,
                  onClick: () => c(h),
                  children: lr[h]
                },
                h
              )) }) : (
                // 两侧拿不到各自的文本时不画开关 —— 画一个点了不动的按钮比没有更糟。
                /* @__PURE__ */ y("span", { children: lr[e.pane] })
              ),
              /* @__PURE__ */ y("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
              /* @__PURE__ */ D("span", { children: [
                l.page,
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
                      await zc(S), a(!0), window.setTimeout(() => a(!1), 1400);
                    } catch (h) {
                      console.warn("[reader-selection] copy failed", h);
                    }
                  },
                  children: [
                    o ? /* @__PURE__ */ y(Wo, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ y(Jo, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                    /* @__PURE__ */ y("span", { children: o ? "已复制" : g === "formula" ? "复制 LaTeX" : "复制" })
                  ]
                }
              ) : /* @__PURE__ */ y("span", { className: "reader-sel-pop-selection-hint", children: "已选择图片" }),
              r && S ? /* @__PURE__ */ D(
                "button",
                {
                  type: "button",
                  className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                  onClick: () => r({ page: l.page, pane: l.pane, quote: S }),
                  children: [
                    /* @__PURE__ */ y(Pr, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
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
                      /* @__PURE__ */ y(Rr, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
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
                  children: /* @__PURE__ */ y(on, { size: 15, strokeWidth: 2.5, "aria-hidden": !0 })
                }
              )
            ] })
          ] }),
          l.showPeek ? (
            // 只在看「另一栏」时展开：看的就是页面上那一栏时再抄一遍是噪声。
            /* @__PURE__ */ y("p", { className: "reader-sel-pop-peek", "data-reader-peek-pane": l.pane, children: l.text })
          ) : null
        ] }),
        /* @__PURE__ */ y("span", { className: "reader-sel-pop-caret", "aria-hidden": "true" })
      ]
    }
  );
}
function Fc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Oc() {
  const [e, t] = C(!1), n = hr(), r = A(null);
  return $(() => {
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
  }, [e]), $(() => {
    const o = (a) => {
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || Fc(a.target)) return;
      const s = a.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !a.shiftKey)
          return;
        a.preventDefault(), t((c) => !c);
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
        children: /* @__PURE__ */ y(Vo, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
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
          /* @__PURE__ */ y("div", { className: "reader-react-shortcuts-body", children: Ws.map((o) => /* @__PURE__ */ D("section", { className: "reader-react-shortcuts-group", children: [
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
const $c = ["source", "sideBySide", "translated"], jc = { source: "", translated: "", sideBySide: "" };
function Uc(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = yt(e.sourceUrl), n = yt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return la({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function Bc(e) {
  const [t, n] = C(() => /* @__PURE__ */ new Set()), r = J(
    () => e ? Uc(e) : jc,
    [e]
  ), o = J(
    () => $c.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = _(async (s) => {
    if (!e) return;
    const c = yt(r[s]);
    if (!(!c || t.has(s)))
      try {
        const i = e.jobId ? ca(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await da(
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
        ua(l), n((d) => {
          const u = new Set(d);
          return u.delete(s), u;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const Hc = {
  source: vr,
  sideBySide: Sr,
  translated: wr
}, Wc = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function Jc(e) {
  const t = ct(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = Bc(n);
  return /* @__PURE__ */ D("div", { className: "reader-download-actions", role: "group", "aria-label": "下载 PDF", children: [
    /* @__PURE__ */ y("span", { className: "reader-download-actions-prefix", "aria-hidden": !0, children: /* @__PURE__ */ y(qo, { size: 14, strokeWidth: 2.2 }) }),
    o.map((c) => {
      const i = wo[c], l = yt(r[c]), d = a.has(c), u = !!l && !d, f = u ? "" : Po(c, r), m = Hc[c];
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
                id: `reader-download-${c}`,
                className: `reader-download-action${d ? " is-busy" : ""}`,
                disabled: !u,
                "aria-label": u ? `下载${i.label}` : f,
                onClick: () => void s(c),
                children: [
                  /* @__PURE__ */ y(m, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
                  /* @__PURE__ */ y("span", { className: "reader-download-action-label", children: Wc[c] })
                ]
              }
            )
          },
          c
        )
      );
    })
  ] });
}
function Vc(e) {
  const t = ct(), n = Ei(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? it, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), c = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, l = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), d = Ka(a), u = a > Ar + 1e-3, f = a < kr - 1e-3, m = Qe(), b = "50%（半屏，对照铺满）", [p, g] = C(!1), [v, S] = C(`${c}`);
  $(() => {
    p || S(`${Math.min(Math.max(c, 1), Math.max(i, 1))}`);
  }, [c, i, p]);
  const w = () => {
    if (g(!1), !l || i <= 0)
      return;
    const h = Number(`${v}`.trim());
    l(wt(h, i));
  };
  return /* @__PURE__ */ D("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    o ? /* @__PURE__ */ y("div", { className: "reader-react-hud-group reader-react-hud-modes", children: o }) : null,
    /* @__PURE__ */ y("div", { className: "reader-react-hud-group", "aria-label": "页码", children: p ? /* @__PURE__ */ D(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (h) => {
          h.preventDefault(), w();
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
              onBlur: w,
              onKeyDown: (h) => {
                h.key === "Escape" && (h.preventDefault(), g(!1), S(`${c}`));
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
        "aria-label": i > 0 ? `跳转页码，当前第 ${c} 页，共 ${i} 页` : "页码",
        title: i > 0 ? "点击输入页码跳转" : void 0,
        disabled: !l || i <= 0,
        onClick: () => {
          !l || i <= 0 || (S(`${c}`), g(!0));
        },
        children: i > 0 ? `${Math.min(c, i)} / ${i}` : "—"
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
    /* @__PURE__ */ y("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ y(Oc, {}) })
  ] });
}
function Pt(e) {
  const t = `${e.documentId || ""}`.trim();
  if (t)
    return `${bt}doc:${t}`;
  const n = `${e.jobId || ""}`.trim();
  return n ? `${bt}job:${n}` : `${bt}anonymous`;
}
const bt = "retainpdf.reader.notes.v1:";
function qc(e) {
  const t = `${e.jobId || ""}`.trim();
  if (!t)
    return [];
  const n = `${bt}job:${t}`;
  return n === Pt(e) ? [] : [n];
}
function Kc() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Gc(e) {
  return {
    pageIdx: Number(e.page) - 1,
    quoteText: e.quote,
    note: e.note,
    createdAt: e.createdAt
  };
}
function uo(e) {
  return xo(e, (t) => t.page);
}
function Zc(e) {
  return zo(e, (t) => t.page).map((t) => ({ page: t.pageIdx, items: t.items }));
}
function Yc(e, t) {
  return _o({
    title: e,
    annotations: t.map(Gc)
  });
}
function Xc(e) {
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
function Xt(e) {
  try {
    return Xc(localStorage.getItem(e));
  } catch {
    return [];
  }
}
function Qc(...e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const r of n)
      t.has(r.id) || t.set(r.id, r);
  return uo([...t.values()]);
}
function el(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch (r) {
    return console.warn("[reader-notes] persist failed", r), !1;
  }
  const n = new Set(Xt(e).map((r) => r.id));
  return t.every((r) => n.has(r.id));
}
function fr(e) {
  if (typeof localStorage > "u")
    return [];
  const t = Pt(e), n = Xt(t), r = qc(e).map((a) => ({ key: a, notes: Xt(a) })).filter((a) => a.notes.length > 0);
  if (r.length === 0)
    return n;
  const o = Qc(n, ...r.map((a) => a.notes));
  if (!el(t, o))
    return o;
  for (const a of r)
    try {
      localStorage.removeItem(a.key);
    } catch {
    }
  return o;
}
function tl(e, t) {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.setItem(e, JSON.stringify(t));
    } catch (n) {
      console.warn("[reader-notes] persist failed", n);
    }
}
function nl(e, t = {}) {
  const n = J(
    () => ({
      jobId: `${e.jobId || ""}`.trim(),
      documentId: `${e.documentId || ""}`.trim()
    }),
    [e.jobId, e.documentId]
  ), [r, o] = C(() => ({
    key: Pt(n),
    notes: fr(n)
  })), a = r.notes, s = _(
    (b) => {
      o((p) => ({
        key: p.key,
        notes: typeof b == "function" ? b(p.notes) : b
      }));
    },
    []
  ), c = t.onAfterAdd, i = Pt(n);
  $(() => {
    o((b) => b.key === i ? b : { key: i, notes: fr(n) });
  }, [n, i]), $(() => {
    tl(r.key, r.notes);
  }, [r]);
  const l = _((b) => {
    const p = `${b.quote || ""}`.trim();
    if (!p)
      return null;
    const g = {
      id: Kc(),
      page: Math.max(1, Math.floor(Number(b.page) || 1)),
      pane: b.pane === "translated" ? "translated" : "source",
      quote: p,
      note: `${b.note || ""}`.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s((v) => uo([g, ...v])), c == null || c(), g;
  }, [c]), d = _((b, p) => {
    const g = `${p || ""}`.trim();
    s((v) => v.map((S) => S.id === b ? { ...S, note: g } : S));
  }, []), u = _((b) => {
    s((p) => p.filter((g) => g.id !== b));
  }, []), f = _(async (b = "") => {
    var g, v;
    const p = Yc(b, a);
    try {
      return await ((v = (g = navigator.clipboard) == null ? void 0 : g.writeText) == null ? void 0 : v.call(g, p)), !0;
    } catch (S) {
      return console.error("[reader-notes] copy failed", S), !1;
    }
  }, [a]), m = J(() => Zc(a), [a]);
  return {
    notes: a,
    groups: m,
    addFromQuote: l,
    updateNote: d,
    remove: u,
    exportMarkdown: f,
    count: a.length
  };
}
function mr(e) {
  var t, n;
  return Lr(e == null ? void 0 : e.assistantPanel) ? e.assistantPanel : ((t = e == null ? void 0 : e.splitLayout) == null ? void 0 : t.left) === "markdown" || ((n = e == null ? void 0 : e.splitLayout) == null ? void 0 : n.right) === "markdown" ? "markdown" : null;
}
function rl(e) {
  const [t, n] = C(() => ({
    scope: e,
    panel: mr(Pe(e))
  }));
  $(() => {
    n((o) => o.scope === e ? o : {
      scope: e,
      panel: mr(Pe(e))
    });
  }, [e]), $(() => {
    t.scope === e && Mt(t.scope, {
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
const Qt = "download-toast";
function ol({
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
function al(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: o = "等待响应...",
    percent: a = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    jt.dismiss(Qt);
    return;
  }
  jt.custom(
    () => /* @__PURE__ */ y(ol, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: Qt, duration: 1 / 0 }
  );
}
function sl() {
  const e = _((t) => {
    t && (t.setState = al, t.hide = () => jt.dismiss(Qt));
  }, []);
  return /* @__PURE__ */ D(Rt, { children: [
    /* @__PURE__ */ y(Do, { position: "bottom-right" }),
    /* @__PURE__ */ y("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function fo(e) {
  const t = A(!1);
  return e && (t.current = !0), t.current;
}
function pr(e, t) {
  const n = e === t;
  return { open: n, mounted: fo(n) };
}
function il({
  panel: e,
  active: t,
  context: n
}) {
  var i;
  const r = t === e.id, o = fo(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = fe(), c = (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, {
    open: r,
    sessionKey: n.sessionKey,
    pendingInput: n.pendingInput,
    onClose: n.onClose
  });
  return c == null ? null : /* @__PURE__ */ y(
    lo,
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
const cl = yo(() => import("./ReaderMarkdownPanel-BgWSOggK.js").then((e) => ({ default: e.ReaderMarkdownPanel })));
function ll(e) {
  const t = e.sourceOnly || !e.translatedUrl, n = !!(e.overlayContentAvailable && e.liveTranslationVisible && !e.assistantOpen), o = e.assistantPdfPane || (e.assistantOpen && e.mode === "compare" ? "source" : e.mode), a = o === "compare", s = n || o !== "translated", c = o === "translated" || o === "compare", i = e.mode === "compare" && o !== "compare";
  return {
    kind: n ? "live-overlay" : o === "compare" ? "final-compare" : o === "translated" ? "translated-only" : "source-only",
    visibleMode: o,
    compareMode: a,
    showSource: s,
    showTranslated: c,
    overlayOnSource: n,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: t,
    compareDegradedByAssistant: i
  };
}
function dl(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function ul(e) {
  return e ?? "notes";
}
function fl() {
  const e = Bs(), { boot: t, panes: n, sessionFiles: r, session: o } = e, a = rl(e.viewStateKey), s = a.panel, c = a.setPanel, [i, l] = C(null), [d, u] = C(null), [f, m] = C(!1), b = A(null), p = s !== null, g = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, v = ll({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: g,
    liveTranslationVisible: f,
    assistantOpen: p,
    assistantPdfPane: i
  }), S = _s({
    hasOverlayContent: g,
    connection: e.liveTranslation.connection,
    showSource: v.showSource
  }), w = v.sourceViewOnly, h = v.visibleMode, P = _(() => c(ul), []), E = nl(
    { jobId: o.jobId, documentId: o.documentId },
    { onAfterAdd: P }
  ), M = _((U) => {
    E.addFromQuote(U), e.clearSelection();
  }, [E.addFromQuote, e.clearSelection]), F = _((U) => {
    e.goToPage(U.page, U.pane === "translated" ? "translated" : "source");
  }, [e.goToPage]), L = _(
    () => E.exportMarkdown(o.title || ""),
    [E.exportMarkdown, o.title]
  );
  $(() => {
    u(null), m(!1);
  }, [e.viewStateKey]), $(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), $(() => {
    l(null);
  }, [a.scope]), $(() => {
    if (!(t.loading || t.failed)) {
      if (b.current !== e.viewStateKey) {
        b.current = e.viewStateKey;
        const U = Pe(e.viewStateKey), ne = w ? "source" : U == null ? void 0 : U.mode;
        ne && ne !== e.mode && e.setModeKeepingPage(ne);
        return;
      }
      Mt(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, w]);
  const k = s || (e.mode === "compare" ? "compare" : "reading"), I = pr(s, "markdown"), R = pr(s, "notes");
  qs({
    mode: h,
    sourceOnly: e.sourceOnly,
    setMode: e.setModeKeepingPage,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    currentPage: e.currentPage,
    numPages: n.hudNumPages,
    goToPage: e.goToPage,
    enabled: e.showHud
  });
  const T = _(() => {
    c(null), l(null), u(null);
  }, []), x = _((U) => {
    l(null);
    const ne = dl(U, e.liveTranslationAvailable);
    ne !== null && m(ne), e.setModeKeepingPage(U);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), N = J(() => S.sourcePaneToggle ? /* @__PURE__ */ y(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m((U) => !U),
      "aria-pressed": f,
      title: f ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ) : null, [S.sourcePaneToggle, f]), j = _((U) => {
    c(U);
  }, []), B = J(() => ({
    sessionKey: o.jobId || o.documentId || "reader",
    pendingInput: d,
    onClose: T
  }), [T, o.documentId, o.jobId, d]), Z = _((U) => {
    const ne = U.pane === "translated" && !w ? "translated" : "source", ee = No(U);
    u((q) => ({ text: ee, token: ((q == null ? void 0 : q.token) ?? 0) + 1 })), c("terminal"), l(ne), e.clearSelection();
  }, [e.clearSelection, w]), te = J(() => ({
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
    sourceViewOnly: w,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: j, close: T }
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
    j,
    T
  ]), re = J(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), O = [
    Ua,
    `is-workspace-${k}`,
    p ? "is-assistant-open" : "",
    v.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ y(Ti, { value: te, hud: re, children: /* @__PURE__ */ D("div", { className: O, "data-reader-engine": "react-pdf", "data-reader-workspace": k, children: [
    /* @__PURE__ */ y(Nc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ D("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ y(Jc, {}),
      /* @__PURE__ */ y(Qs, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ y(
      _i,
      {
        mode: h,
        documentReady: !!o.jobId,
        sourceViewOnly: w,
        onModeChange: x,
        liveTranslation: S.topBarPill ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m((U) => !U)
        } : null,
        compareDegraded: v.compareDegradedByAssistant,
        onRestoreCompare: T
      }
    ),
    /* @__PURE__ */ y(
      ji,
      {
        active: s,
        badges: { notes: E.count }
      }
    ),
    p ? /* @__PURE__ */ y(Ec, {}) : null,
    /* @__PURE__ */ y(Ni, { paneComposition: v, markdownSplit: I.open, assistantSplit: p, liveTranslation: e.liveTranslation, sourcePaneAction: N }),
    e.showHud ? /* @__PURE__ */ y(
      Vc,
      {
        mode: h,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ D(bo, { fallback: null, children: [
      Wr.map((U) => /* @__PURE__ */ y(
        il,
        {
          panel: U,
          active: s,
          context: B
        },
        U.id
      )),
      I.mounted ? /* @__PURE__ */ y(cl, { open: I.open, jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: T }) : null
    ] }),
    /* @__PURE__ */ y(
      Ac,
      {
        open: R.open,
        groups: E.groups,
        count: E.count,
        onClose: T,
        onJump: F,
        onUpdateNote: E.updateNote,
        onRemove: E.remove,
        onExport: L
      }
    ),
    /* @__PURE__ */ y(Dc, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: Z, onAddNote: M }),
    /* @__PURE__ */ y(sl, {})
  ] }) });
}
function Nl() {
  return /* @__PURE__ */ y(fl, {});
}
export {
  Nl as R,
  fl as a,
  lo as b,
  Al as d,
  Ml as f,
  kl as r
};
//# sourceMappingURL=ReaderApp-DRiGWfE6.js.map
