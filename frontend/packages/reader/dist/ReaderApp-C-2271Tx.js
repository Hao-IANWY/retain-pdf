var Sn = (e) => {
  throw TypeError(e);
};
var wn = (e, t, n) => t.has(e) || Sn("Cannot " + n);
var qe = (e, t, n) => (wn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Pn = (e, t, n) => t.has(e) ? Sn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Rn = (e, t, n, r) => (wn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as U, jsx as S, Fragment as qt } from "react/jsx-runtime";
import { useMemo as G, useState as C, useEffect as j, useCallback as F, useRef as _, useLayoutEffect as De, memo as Gt, forwardRef as ao, useImperativeHandle as Kt, createContext as Zt, useContext as Yt, useSyncExternalStore as so, useId as sr, Suspense as io, lazy as co } from "react";
import { requireAdapter as Je, getReaderAdapters as ue, renderReaderBoardSlot as lo } from "./adapters.js";
import { resolveReaderDownloadName as uo, resolveReaderDownloadUrls as fo, READER_PROGRESS_COPY as Se, trimString as gt, READER_DOWNLOAD_ACTIONS as mo, disabledReason as ho } from "./runtime/state.js";
import "@retainpdf/api/conversations";
import { r as po, b as go } from "./page-config-Ct7qR5rm.js";
import { c as bo, n as yo, f as Tt, j as In, a as vo, b as So, h as ir, p as Xt, d as wo, k as Tn, i as Po } from "./reader-regions-mTcIqcg0.js";
import { isReaderTransportError as Ro, createReaderTransportError as Io } from "./contracts.js";
import { toast as Nt, Toaster as To } from "sonner";
import { X as cr, Radio as Eo, FileText as lr, Columns2 as ur, Languages as dr, PanelRightClose as Mo, FileCode2 as Ao, Sparkles as _o, Keyboard as ko, Download as Lo, ChevronDown as Co } from "lucide-react";
import { pdfjs as Do, Page as No, Document as zo } from "react-pdf";
import { e as xo, m as Oo, a as Fo } from "./markdown-math-XkF5urpn.js";
const $o = (...e) => {
  var t, n;
  return ((n = (t = ue()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, jo = "", Uo = Object.freeze({
  progress: "retainpdf-reader-progress"
}), Bo = (e) => {
  var t, n;
  return ((n = (t = ue()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, el = (...e) => {
  var n;
  return (((n = ue()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Te = () => Je("defaultReaderDataPort"), En = () => Je("defaultReaderPageConfigPort"), tl = {
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
}, fr = {
  messageTargetOrigin: () => En().messageTargetOrigin(),
  readerJobId: () => En().readerJobId()
}, Ho = () => {
  var e;
  return ((e = ue()) == null ? void 0 : e.liveTranslation) ?? null;
}, et = () => {
  var t;
  const e = ue();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, Qt = () => {
  const e = ue();
  if (e != null && e.sessionData) return e.sessionData;
  const t = e == null ? void 0 : e.defaultReaderDataPort;
  if (!t) throw new Error("Reader adapter missing: defaultReaderDataPort (call setReaderAdapters)");
  return {
    loadReaderPayload: t.loadReaderPayload,
    loadJobPayload: t.loadJobPayload,
    fetchDocumentByJobId: (...n) => Je("fetchDocumentByJobId")(...n),
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
}, Wo = (...e) => {
  var t, n;
  return ((n = (t = ue()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, Jo = () => {
  var e, t;
  return ((t = (e = ue()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, Vo = (...e) => {
  var t, n;
  return ((n = (t = ue()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, qo = (...e) => {
  var t, n;
  return ((n = (t = ue()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? uo(...e);
}, Go = (...e) => {
  var t, n;
  return ((n = (t = ue()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? fo(...e);
}, Ko = (...e) => Je("downloadProtectedResource")(...e), Zo = (...e) => Je("failDownloadToast")(...e), nl = (e, t) => Je("resolveMarkdownAssetUrl")(e, t), Yo = "/api/v1";
function Xo() {
  const e = () => {
    var r;
    return po(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = C(e);
  return j(() => {
    var l, i, c, u;
    const r = () => n(e()), o = (i = (l = globalThis.history) == null ? void 0 : l.pushState) == null ? void 0 : i.bind(globalThis.history), a = (u = (c = globalThis.history) == null ? void 0 : c.replaceState) == null ? void 0 : u.bind(globalThis.history);
    let s = !1;
    if (o && a)
      try {
        const d = (f) => function(...m) {
          const h = f.apply(this, m);
          return r(), globalThis.dispatchEvent(new Event("pushstate")), globalThis.dispatchEvent(new Event("replacestate")), globalThis.dispatchEvent(new Event("locationchange")), h;
        };
        globalThis.history.pushState = d(o), globalThis.history.replaceState = d(a), s = !0;
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
function Qo() {
  const e = Xo(), t = G(() => Vo(fr), [e]), n = G(() => Jo(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function ea(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: o,
    documentIdRef: a,
    sessionJobIdRef: s,
    switchToSourceMode: l
  } = e, [i, c] = C({
    documentId: "",
    jobId: ""
  }), [u, d] = C({
    documentId: "",
    jobId: ""
  }), f = i.documentId === t ? i.jobId : "", m = u.documentId === t ? u.jobId : "", h = n || f, [g, y] = C({
    jobId: "",
    documentId: ""
  }), b = g.jobId === h ? g.documentId : "", P = t || b, w = !!t && !h, [p, v] = C(null), M = (p == null ? void 0 : p.sessionIdentity) === r && p.documentId === P ? p : null, A = w || !!M, x = F((N) => {
    const R = `${N.documentId || ""}`.trim();
    if (!R || a.current && a.current !== R) return;
    if (!a.current && s.current)
      y({
        jobId: s.current,
        documentId: R
      });
    else if (!a.current)
      return;
    const E = `${N.revision || ""}`.trim() || `${Date.now()}`;
    v({
      documentId: R,
      revision: E,
      sessionIdentity: o.current
    }), l();
  }, []);
  j(() => {
    v((N) => N && N.sessionIdentity !== r ? null : N);
  }, [r]);
  const L = F((N) => {
    switch (N.type) {
      case "resolved-document-job":
        c({ documentId: N.documentId, jobId: N.jobId });
        break;
      case "cleared-resolved-document-job":
        c({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        d({ documentId: N.documentId, jobId: N.jobId });
        break;
      case "resolved-job-document":
        y((R) => R.jobId === N.jobId && R.documentId === N.documentId ? R : { jobId: N.jobId, documentId: N.documentId });
        break;
      case "committed-source":
        v({
          documentId: N.documentId,
          revision: N.revision,
          sessionIdentity: N.sessionIdentity
        });
        break;
    }
  }, []);
  return {
    resolvedDocumentJob: i,
    setResolvedDocumentJob: c,
    missingDocumentJob: u,
    setMissingDocumentJob: d,
    documentJobId: f,
    rejectedDocumentJobId: m,
    sessionJobId: h,
    resolvedJobDocument: g,
    setResolvedJobDocument: y,
    jobDocumentId: b,
    documentId: P,
    sourceOnly: w,
    committedDocumentSource: p,
    setCommittedDocumentSource: v,
    activeCommittedDocumentSource: M,
    sourceViewOnly: A,
    refreshCommittedDocument: x,
    applyIdentityEvent: L
  };
}
const ta = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Mn(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function na(e) {
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
function An(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return Bo(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function ra(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function oa(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !ra(a, t))
      return a.replace(/\.pdf$/i, "");
  }
  return "";
}
function zt({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: Uo.progress,
        stage: n,
        percent: e,
        text: t
      },
      fr.messageTargetOrigin()
    );
  } catch {
  }
}
function bt(e, t, n, r = "progress") {
  e({
    loading: !0,
    percent: t,
    text: n,
    stage: r,
    failed: !1
  }), zt({ percent: t, text: n, stage: r });
}
function aa(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [l, i] = C(null), [c, u] = C(null), [d, f] = C(""), [m, h] = C(0), g = d === n ? l : null, y = d === n ? c : null, b = Mn(g), P = ta.has(b), w = F(() => {
    h((L) => L + 1);
  }, []), p = F((L) => {
    i(L.jobPayload), u(L.manifestPayload), f(L.sessionIdentity);
  }, []), v = F((L) => {
    i(null), u(null), f(L);
  }, []), M = _(""), A = _(""), x = F(async () => {
    const L = o.current;
    if (!L || M.current === L) return;
    const N = Qt().loadJobPayload;
    if (typeof N != "function") return;
    const R = a.current.value;
    M.current = L;
    try {
      const E = await N(L);
      if (s.current || a.current.value !== R || o.current !== L || !E || typeof E != "object")
        return;
      const I = Mn(E);
      i(E), f(r.current), I === "succeeded" && A.current !== L && (A.current = L, h((T) => T + 1));
    } catch {
    } finally {
      M.current === L && (M.current = "");
    }
  }, []);
  return j(() => {
    A.current = "";
  }, [n]), j(() => {
    if (!t || P || !g) return;
    const L = window.setInterval(() => {
      x();
    }, 1e3);
    return () => window.clearInterval(L);
  }, [P, x, g, t]), {
    jobPayload: l,
    setJobPayload: i,
    manifestPayload: c,
    setManifestPayload: u,
    payloadSessionIdentity: d,
    setPayloadSessionIdentity: f,
    scopedJobPayload: g,
    scopedManifestPayload: y,
    jobStatus: b,
    jobTerminal: P,
    jobRefreshRevision: m,
    refreshJobArtifacts: w,
    refreshJobStatus: x,
    publishPayload: p,
    clearPayload: v
  };
}
function xt(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function sa(e, t) {
  e(t), xt(t);
}
function ia(e) {
  const [t, n] = C(e ? "source" : "compare"), r = F((a) => {
    e && a !== "source" || (n(a), xt(a));
  }, [e]), o = F((a) => {
    sa(n, a);
  }, []);
  return j(() => (e && document.documentElement.classList.add("reader-source-only"), xt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: o };
}
function _n(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function ca(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: _n(n.active_job_id),
    activeVersionId: _n(n.active_version_id)
  };
}
function la(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function ua(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function da(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function fa(e) {
  return e ? { data: e.data.slice() } : null;
}
const ma = 2, fe = /* @__PURE__ */ new Map();
function Ot(e, t) {
  fe.delete(e), fe.set(e, t);
}
function ha(e) {
  if (fe.size < ma) return;
  const t = fe.keys().next().value;
  t && fe.delete(t);
}
function Et(e) {
  const t = `${e || ""}`.trim();
  if (!t || !fe.has(t)) return null;
  const n = fe.get(t);
  return Ot(t, n), n;
}
async function mr(e, t = et().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (fe.has(r)) {
    const l = fe.get(r);
    return Ot(r, l), l;
  }
  const o = await t(r, { signal: n.signal });
  if (!o.ok) {
    const l = new Error(`读取 PDF 失败 (${o.status})`);
    throw l.status = o.status, l;
  }
  const a = await o.arrayBuffer(), s = { data: new Uint8Array(a) };
  return fe.has(r) ? Ot(r, s) : (ha(), fe.set(r, s)), s;
}
function pa(e = "", t = null) {
  const [n, r] = C(
    () => t || Et(e)
  ), [o, a] = C(
    () => !!`${e || ""}`.trim() && !t && !Et(e)
  ), [s, l] = C("");
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
    const c = Et(i);
    if (c) {
      r(c), a(!1), l("");
      return;
    }
    let u = !1;
    return a(!0), l(""), r(null), mr(i).then((d) => {
      u || (r(d), a(!1));
    }).catch((d) => {
      u || (r(null), a(!1), l((d == null ? void 0 : d.message) || String(d)));
    }), () => {
      u = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function ga(e) {
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
async function Ft(e) {
  const { url: t, label: n, percentStart: r, percentEnd: o, fence: a, setBoot: s } = e;
  if (!t || a.isInactive())
    return null;
  bt(s, r, n, "download");
  const l = await mr(t, et().fetchProtected, {
    signal: a.signal
  });
  return a.isInactive() ? null : (bt(s, o, n, "download"), l);
}
async function ba(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: o } = e;
  bt(o, 25, "正在下载 PDF…", "download");
  const a = [];
  let s = null, l = null;
  return t && a.push(
    Ft({
      url: t,
      label: "正在下载原文 PDF…",
      percentStart: 30,
      percentEnd: 55,
      fence: r,
      setBoot: o
    }).then((u) => {
      s = u;
    })
  ), n && a.push(
    Ft({
      url: n,
      label: "正在下载译文 PDF…",
      percentStart: 55,
      percentEnd: 85,
      fence: r,
      setBoot: o
    }).then((u) => {
      l = u;
    })
  ), await Promise.all(a), r.isInactive() ? { status: "inactive" } : !!t && !s || !!n && !l ? { status: "incomplete" } : { status: "downloaded", sourceBytes: s, translatedBytes: l };
}
const dt = {
  regions: null,
  metadata: null
};
function ya(e) {
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
    applyIdentityEvent: u,
    publishPayload: d,
    clearPayload: f,
    switchSessionMode: m,
    jobRefreshRevision: h,
    sessionEpochRef: g,
    closingRef: y,
    activeLoadAbortRef: b
  } = e, [P, w] = C(""), [p, v] = C(""), [M, A] = C(null), [x, L] = C(null), [N, R] = C(!1), [E, I] = C(""), [T, D] = C([]), [z, $] = C(() => ({
    source: null,
    translated: null
  })), [W, O] = C(
    dt
  ), [B, Y] = C({
    loading: !0,
    percent: 4,
    text: Se.boot,
    stage: "progress",
    failed: !1
  });
  return j(() => {
    const te = new AbortController(), re = g.current.value, ae = ga({
      sessionEpochRef: g,
      closingRef: y,
      abort: te,
      sessionEpoch: re
    });
    b.current = te;
    const oe = Qt();
    if (y.current)
      return te.abort(), () => {
        b.current === te && (b.current = null);
      };
    function ne(X, Q) {
      ae.markFailed(), Y({
        loading: !1,
        percent: 100,
        text: X,
        stage: "failed",
        failed: !0
      }), zt({ percent: 100, text: Q, stage: "failed" });
    }
    function be() {
      R(!0), Y({
        loading: !1,
        percent: 100,
        text: Se.ready,
        stage: "ready",
        failed: !1
      }), zt({ percent: 100, text: Se.ready, stage: "ready" });
    }
    function xe() {
      return c != null && c.documentId ? An(
        c.documentId,
        c.revision
      ) : $o() ? jo : oe.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function Ae() {
      let X = { activeJobId: "", activeVersionId: "" };
      try {
        const he = await oe.fetchProtected(
          oe.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (he != null && he.ok) {
          const Ie = await he.json().catch(() => null);
          X = ca(Ie);
        }
      } catch {
      }
      const Q = la({
        link: X,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!c
      });
      if (Q.kind === "follow-active-job") {
        if (ae.isInactive()) return;
        u({
          type: "resolved-document-job",
          documentId: r,
          jobId: Q.jobId
        }), Q.activeVersionId ? (c || u({
          type: "committed-source",
          documentId: r,
          revision: Q.activeVersionId,
          sessionIdentity: i
        }), m("source")) : m("compare");
        return;
      }
      if (Q.kind === "open-committed-source") {
        if (ae.isInactive()) return;
        u({
          type: "committed-source",
          documentId: r,
          revision: Q.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const ee = xe();
      if (ae.isInactive()) return;
      w(ee), v(""), I(""), f(i);
      const me = await Ft({
        url: ee,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: ae,
        setBoot: Y
      });
      if (!ae.isInactive()) {
        if (!me) {
          ne("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        A(me), be();
      }
    }
    async function ct() {
      var Oe;
      const X = await ((Oe = oe.loadSessionSnapshot) == null ? void 0 : Oe.call(oe, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: c,
        includeOptionalArtifacts: !c
      })), Q = X ? {
        jobPayload: X.sourcePayload,
        manifestPayload: X.manifestPayload,
        readerMetadata: X.readerMetadata,
        regionsPayload: X.regions,
        readerErrors: X.readerErrors
      } : await oe.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !c
      });
      if (ae.isInactive()) return;
      let ee = null;
      if (n && !r) {
        try {
          ee = await oe.fetchDocumentByJobId(Yo, t);
        } catch {
        }
        if (ae.isInactive()) return;
      }
      const me = na(Q.jobPayload) || `${(ee == null ? void 0 : ee.document_id) || ""}`.trim();
      me && !r && u({
        type: "resolved-job-document",
        jobId: t,
        documentId: me
      });
      const he = ua({
        payloadDocumentId: me,
        linkedActiveJobId: `${(ee == null ? void 0 : ee.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(ee == null ? void 0 : ee.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!c
      });
      if (he.kind === "restore-committed-source") {
        if (ae.isInactive()) return;
        u({
          type: "committed-source",
          documentId: he.documentId,
          revision: he.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const Ie = oe.resolveReaderSourcePdf(Q.manifestPayload), It = oe.resolveReaderTranslatedPdfUrl(Q.jobPayload, Q.manifestPayload), lt = typeof Ie == "string" ? Ie : oe.resolveReaderArtifactUrl(Ie), ut = r || me, Ve = c != null && c.documentId ? An(
        c.documentId,
        c.revision
      ) : lt || (ut ? oe.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(ut)}/source.pdf`) : ""), ye = c ? "" : It || "";
      if (w(Ve || ""), v(ye), I(oa(Q.jobPayload, t)), d({
        jobPayload: Q.jobPayload || null,
        manifestPayload: Q.manifestPayload || null,
        sessionIdentity: i
      }), D(c ? [] : bo(Q.regionsPayload)), $(c ? { source: null, translated: null } : yo(Q.readerMetadata)), O(c ? dt : Q.readerErrors ?? dt), !Ve && !ye) {
        ne(Se.failed, Se.failed);
        return;
      }
      const ve = await ba({
        sourceFinal: Ve || "",
        translatedFinal: ye,
        fence: ae,
        setBoot: Y
      });
      if (ve.status !== "inactive") {
        if (ve.status === "incomplete") {
          ne("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        A(ve.sourceBytes), L(ve.translatedBytes), be();
      }
    }
    async function Rt() {
      R(!1), A(null), L(null), D([]), $({ source: null, translated: null }), O(dt), bt(Y, 8, Se.metadata, "metadata");
      try {
        if (s) {
          await Ae();
          return;
        }
        if (!t) {
          ne(Se.failed, Se.failed);
          return;
        }
        await ct();
      } catch (X) {
        if (ae.isClosedOrStale() || (X == null ? void 0 : X.name) === "AbortError") return;
        ae.markFailed();
        const Q = Number(X == null ? void 0 : X.status);
        if (da({
          status: Q,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          u({ type: "missing-document-job", documentId: r, jobId: t }), u({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const ee = X instanceof Error ? X.message : Se.failed;
        ne(ee, ee);
      }
    }
    return Rt(), () => {
      te.abort(), b.current === te && (b.current = null);
    };
  }, [t, r, o, a, s, l, c, h, n, i, u, d, f, m]), {
    sourceUrl: P,
    translatedUrl: p,
    sourceFile: M,
    translatedFile: x,
    assetsReady: N,
    title: E,
    regions: T,
    readerMetadata: z,
    readerErrors: W,
    boot: B
  };
}
function va() {
  const e = _(!1), t = _(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = Qo(), s = _({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const l = _(a), i = _(""), c = _(""), u = _(() => {
  }), d = F(() => u.current(), []), f = ea({
    routeDocumentId: o,
    jobId: r,
    sessionIdentity: a,
    sessionIdentityRef: l,
    documentIdRef: i,
    sessionJobIdRef: c,
    switchToSourceMode: d
  }), {
    sessionJobId: m,
    documentId: h,
    sourceOnly: g,
    sourceViewOnly: y
  } = f, { mode: b, setMode: P, switchSessionMode: w } = ia(y);
  u.current = () => {
    w("source");
  }, l.current = a, i.current = h, c.current = m;
  const p = aa({
    sessionJobId: m,
    sessionIdentity: a,
    sessionIdentityRef: l,
    sessionJobIdRef: c,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: v,
    scopedManifestPayload: M,
    jobStatus: A,
    jobTerminal: x,
    jobRefreshRevision: L,
    refreshJobArtifacts: N,
    refreshJobStatus: R
  } = p, E = ya({
    sessionJobId: m,
    jobId: r,
    routeDocumentId: o,
    documentJobId: f.documentJobId,
    rejectedDocumentJobId: f.rejectedDocumentJobId,
    sourceOnly: g,
    locationKey: n,
    sessionIdentity: a,
    committedSource: f.activeCommittedDocumentSource,
    applyIdentityEvent: f.applyIdentityEvent,
    publishPayload: p.publishPayload,
    clearPayload: p.clearPayload,
    switchSessionMode: w,
    jobRefreshRevision: L,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), I = F(() => {
    var D;
    e.current = !0, (D = t.current) == null || D.abort();
  }, []), T = G(
    () => ({
      fetchProtected: Qt().fetchProtected,
      jobId: m,
      jobPayload: v,
      manifestPayload: M,
      sourceUrl: E.sourceUrl,
      translatedUrl: E.translatedUrl,
      sourceOnly: y
    }),
    [m, v, M, E.sourceUrl, E.translatedUrl, y]
  );
  return {
    jobId: m,
    jobStatus: A,
    workflow: `${(v == null ? void 0 : v.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: x,
    documentId: h,
    sessionIdentity: a,
    sourceOnly: g,
    mode: b,
    setMode: P,
    sourceUrl: E.sourceUrl,
    translatedUrl: E.translatedUrl,
    sourceFile: E.sourceFile,
    translatedFile: E.translatedFile,
    assetsReady: E.assetsReady,
    boot: E.boot,
    title: E.title,
    regions: E.regions,
    readerMetadata: E.readerMetadata,
    readerErrors: E.readerErrors,
    download: T,
    refreshJobArtifacts: N,
    refreshJobStatus: R,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: I
  };
}
const Sa = 160, wa = 8, Pa = 0;
function Ra() {
  const e = _(null), [t, n] = C(null), [r, o] = C(Pa), a = F((s) => {
    e.current = s, n(s);
  }, []);
  return j(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const l = (c) => {
      !Number.isFinite(c) || c < Sa || o((u) => Math.abs(u - c) < wa ? u : c);
    }, i = new ResizeObserver((c) => {
      var u, d;
      l(((d = (u = c[0]) == null ? void 0 : u.contentRect) == null ? void 0 : d.width) ?? s.clientWidth);
    });
    return i.observe(s), l(s.clientWidth), () => i.disconnect();
  }, [t]), {
    shellRef: e,
    shellEl: t,
    shellWidth: r,
    bindShell: a
  };
}
function Ia(e) {
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
const Mt = { source: 0, translated: 0 };
function Ta(e, t) {
  const {
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    sourceUrl: a,
    translatedUrl: s,
    sourceFile: l,
    translatedFile: i
  } = e, c = `${(t == null ? void 0 : t.identityKey) || ""}\0${a}\0${s}`, u = _(c);
  u.current = c;
  const [d, f] = C(() => ({
    identity: c,
    pages: Mt
  })), [m, h] = C(() => ({ identity: c, tick: 0 })), g = d.identity === c ? d.pages : Mt, y = m.identity === c ? m.tick : 0, b = Ia({
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    hasSource: !!l || !!a,
    hasTranslated: !!i
  }), { primaryPane: P } = b, w = F((R, E) => {
    u.current === c && f((I) => {
      const T = I.identity === c ? I.pages : Mt;
      return T[E] === R && I.identity === c ? I : {
        identity: c,
        pages: { ...T, [E]: R }
      };
    });
  }, [c]), p = _(null), v = F(() => {
    p.current && clearTimeout(p.current);
    const R = c;
    p.current = setTimeout(() => {
      p.current = null, u.current === R && h((E) => ({
        identity: R,
        tick: E.identity === R ? E.tick + 1 : 1
      }));
    }, 60);
  }, [c]);
  j(() => (p.current && (clearTimeout(p.current), p.current = null), f((R) => R.identity === c && R.pages.source === 0 && R.pages.translated === 0 ? R : { identity: c, pages: { source: 0, translated: 0 } }), h((R) => R.identity === c && R.tick === 0 ? R : { identity: c, tick: 0 }), () => {
    p.current && (clearTimeout(p.current), p.current = null);
  }), [c]);
  const M = G(
    () => Math.max(g.source, g.translated),
    [g]
  ), A = P === "translated" ? g.translated : g.source || g.translated, x = t == null ? void 0 : t.userZoom, L = t == null ? void 0 : t.shellWidth, N = `${c}-${y}-${x}-${n}-${g.source}-${g.translated}-${L}`;
  return {
    ...b,
    numPagesByPane: g,
    hudNumPages: M,
    primaryNumPages: A,
    metricsTick: y,
    onNumPages: w,
    onMetrics: v,
    rowSyncRevision: N
  };
}
const He = "data-reader-page", tt = "data-reader-pane", en = "data-natural-height", Ea = "reader-react-root", Ma = "reader-react-grid", Aa = "reader-react-scroll-shell", _a = "reader-react-pdf-pane", hr = "reader-react-pdf-page", yt = "reader-react-pdf-page-placeholder", tn = "reader-react-pdf-page-slot";
function vt(e, t) {
  const n = e != null ? `[${He}="${e}"]` : `[${He}]`;
  return t ? `${n}[${tt}="${t}"]` : n;
}
function ka() {
  return `.${tn}[${He}]`;
}
function nn(e) {
  return Number(e.getAttribute(He));
}
const pr = 0.25, gr = 1, La = 0.05, st = 0.5, Ca = 16, Da = 8;
function Xe(e) {
  return st;
}
function wt(e) {
  return Number.isFinite(e) ? Math.min(gr, Math.max(pr, e)) : st;
}
function nt(e, t) {
  const n = wt(Number(e) + t * La);
  return Math.round(n * 100) / 100;
}
function Na(e) {
  return Math.round(wt(e) * 100);
}
function za(e) {
  const n = (Number(e) || 0) - Ca - Da;
  return Math.max(160, Math.floor(n));
}
function xa(e, t = st) {
  const n = wt(t);
  return za((Number(e) || 0) * n);
}
function Oa(e, t) {
  if (!e || !Number.isFinite(t) || t <= 0 || Math.abs(t - 1) < 1e-3)
    return;
  const n = e.scrollLeft + e.clientWidth / 2, r = e.scrollTop + e.clientHeight / 2, o = Array.from(
    e.querySelectorAll(`[${tt}]`)
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
const Fa = 8;
function $a(e, t) {
  return !Number.isFinite(e) || e < 80 || Math.abs(e - t) < Fa ? "ignore" : !Number.isFinite(t) || t <= 0 ? "immediate" : "settle";
}
const ja = 200, br = [
  "markdown"
], yr = [
  "terminal"
], Ua = [
  ...br,
  ...yr
];
function vr(e) {
  return Ua.includes(e);
}
const Ba = "retainpdf:reader:view:v1:", kn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), Ha = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function Sr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function $t(e) {
  return `${e || ""}`.trim();
}
function Wa({
  documentId: e,
  jobId: t
}) {
  const n = $t(e);
  if (n) return `document:${n}`;
  const r = $t(t);
  return r ? `job:${r}` : "";
}
function wr(e) {
  const t = $t(e);
  return t ? `${Ba}${t}` : "";
}
function Ja(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function Va(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!kn.has(t) || !kn.has(n) || t === n))
    return { left: t, right: n };
}
function qa(e) {
  return e === null ? null : vr(e) ? e : void 0;
}
function Ga(e) {
  return Ha.has(e) ? e : void 0;
}
function Pr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = Ja(t.anchor), r = Number(t.zoom), o = Ga(t.mode), a = Va(t.splitLayout), s = qa(t.assistantPanel);
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
function Pe(e, t = Sr()) {
  const n = wr(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Pr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function Pt(e, t, n = Sr()) {
  const r = wr(e);
  if (!r || !n) return null;
  const o = Pe(e, n), a = Pr({
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
function Ka(e, t, n = "") {
  const [r, o] = C(() => {
    var d;
    return ((d = Pe(n)) == null ? void 0 : d.zoom) ?? Xe();
  }), a = _(r), s = _(n);
  a.current = r;
  const l = _(1);
  j(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const d = ((f = Pe(n)) == null ? void 0 : f.zoom) ?? Xe();
    l.current = 1, a.current = d, o(d);
  }, [e, n]);
  const i = F((d) => {
    const f = wt(d), m = a.current;
    Math.abs(f - m) < 5e-4 || (l.current = f / (m || 1), Pt(s.current, { zoom: f }), o(f));
  }, []), c = F((d) => {
    i(nt(a.current, d));
  }, [i]), u = F((d) => {
    i(Xe());
  }, [i]);
  return De(() => {
    const d = l.current;
    Math.abs(d - 1) < 1e-3 || (l.current = 1, Oa(t == null ? void 0 : t.current, d));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: c, resetZoom: u };
}
function Za(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, o = _(t), a = _(n), s = _(r);
  return o.current = t, a.current = n, s.current = r, { setModeKeepingPage: F((i) => {
    i !== o.current && (s.current(), a.current(i));
  }, []) };
}
const rn = 48;
function Rr(e, t = rn) {
  return e.getBoundingClientRect().top + t;
}
function Ir(e, t) {
  if (!e.length)
    return null;
  let n = null, r = -1 / 0;
  for (const i of e) {
    const c = i.getBoundingClientRect();
    c.height < 8 || c.width < 8 || c.top <= t + 1 && c.top >= r && (n = i, r = c.top);
  }
  if (!n && (n = e.find((c) => {
    const u = c.getBoundingClientRect();
    return u.height >= 8 && u.width >= 8;
  }) ?? null, n)) {
    const c = [...e].reverse().find((u) => {
      const d = u.getBoundingClientRect();
      return d.height >= 8 && d.width >= 8;
    });
    c && c.getBoundingClientRect().bottom < t && (n = c);
  }
  if (!n)
    return null;
  const o = nn(n);
  if (!Number.isFinite(o) || o < 1)
    return null;
  const a = n.getBoundingClientRect(), s = a.height > 0 ? a.height : 1, l = Math.min(1, Math.max(0, (t - a.top) / s));
  return { el: n, page: o, fraction: l };
}
function At(e, t, n = rn) {
  if (!e)
    return null;
  const r = vt(void 0, t), o = Array.from(e.querySelectorAll(r));
  if (!o.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Rr(e, n), l = Ir(o, s);
  return l ? { page: l.page, fraction: l.fraction } : null;
}
function on(e, t, n = "auto", r, o = rn) {
  if (!e || !t)
    return !1;
  const a = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let l = null;
  if (r && (l = e.querySelector(vt(a, r))), l || (l = e.querySelector(vt(a))), !l)
    return !1;
  const i = e.getBoundingClientRect(), c = l.getBoundingClientRect();
  if (i.height <= 0 || c.height < 8 && l.offsetHeight < 8)
    return !1;
  const u = c.height > 0 ? c.height : l.offsetHeight, d = e.scrollTop + (c.top - i.top), f = Math.max(0, d + s * u - o);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function Ya(e, t, n = "smooth", r) {
  return on(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function jt(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", o = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let a = !1, s = !1;
  const l = [], i = () => {
    var u;
    if (a) return;
    on(
      e(),
      t,
      r,
      n == null ? void 0 : n.pane
    ) && !s && (s = !0, (u = n == null ? void 0 : n.onDone) == null || u.call(n));
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
function Xa(e, t, n) {
  return jt(
    e,
    { page: t, fraction: 0 },
    n
  );
}
function St(e, t) {
  if (!Number.isFinite(e))
    return 1;
  const n = Math.max(1, Math.floor(e));
  return !Number.isFinite(t) || t <= 0 ? n : Math.min(t, n);
}
function de(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function Qa(e, t, n = !0, r = "", o) {
  const [a, s] = C(1);
  return j(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const l = e.current;
    if (!l)
      return;
    let i = !1, c = null, u = 0;
    const d = vt(void 0, o), f = () => {
      if (i) return;
      const g = Array.from(l.querySelectorAll(d));
      if (!g.length)
        return;
      const y = Rr(l), b = Ir(g, y);
      b && s(b.page);
    }, m = () => {
      i || (u && cancelAnimationFrame(u), u = requestAnimationFrame(() => {
        u = 0, f();
      }));
    }, h = () => {
      if (i) return;
      if (!Array.from(l.querySelectorAll(d)).length) {
        c = setTimeout(h, 120);
        return;
      }
      f(), l.addEventListener("scroll", m, { passive: !0 });
    };
    return h(), () => {
      i = !0, c && clearTimeout(c), u && cancelAnimationFrame(u), l.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, o]), a;
}
const es = `canvas, .react-pdf__Page, .${hr}, .${yt}`, Ln = /* @__PURE__ */ new WeakMap();
function ts(e) {
  const t = Number(e.getAttribute(en));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Ln.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(es), Ln.set(e, n)), n) {
    const o = n.getBoundingClientRect().height;
    if (Number.isFinite(o) && o > 0)
      return o;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function ns(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function rs(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(ka()).forEach((r) => {
    const o = nn(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = ts(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function os(e, t, n = "", r) {
  const [o, a] = C(() => /* @__PURE__ */ new Map()), s = _(o), l = _(r);
  return l.current = r, De(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), a(s.current));
      return;
    }
    let i = !1, c = 0, u = !1, d = !1;
    const f = () => {
      var v;
      if (i) return;
      const w = e.current;
      if (!w) return;
      const p = rs(w);
      ns(s.current, p) || (s.current = p, a(p)), u && !d && (d = !0, (v = l.current) == null || v.call(l));
    }, m = () => {
      cancelAnimationFrame(c), c = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const h = window.setTimeout(m, 100), g = window.setTimeout(() => {
      u = !0, m();
    }, 300), y = window.setTimeout(m, 700), b = e.current;
    let P = null;
    return b && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => m()), P.observe(b)), () => {
      i = !0, cancelAnimationFrame(c), window.clearTimeout(h), window.clearTimeout(g), window.clearTimeout(y), P == null || P.disconnect();
    };
  }, [e, t, n]), o;
}
const as = [0, 48, 140, 320, 560], ss = 700, is = [80, 200, 400], cs = 500, ls = 50, us = /* @__PURE__ */ new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
  "Spacebar",
  "j",
  "k"
]), ds = 180, Cn = [0, 48, 140, 320, 700, 1200];
function fs(e, t) {
  var E;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, l = _(
    ((E = Pe(a)) == null ? void 0 : E.anchor) || { page: 1, fraction: 0 }
  ), i = _(null), c = _(!1), u = _(r), d = _(null), f = _(null), m = _(null), h = _(null), g = _(a), y = _(""), b = _(n);
  b.current = n;
  const P = F(() => {
    var I;
    (I = d.current) == null || I.call(d), d.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), w = F(() => {
    !c.current && i.current == null || (P(), m.current != null && (clearTimeout(m.current), m.current = null), i.current = null, c.current = !1);
  }, [P]), p = F((I = !1) => {
    h.current != null && (clearTimeout(h.current), h.current = null);
    const T = () => {
      h.current = null, Pt(g.current, {
        anchor: de(l.current)
      });
    };
    I ? T() : h.current = setTimeout(T, ds);
  }, []), v = F((I) => {
    l.current = de(I), i.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, c.current = !1;
    }, ls);
  }, []);
  j(() => {
    if (!o)
      return;
    let I = !1, T = null, D = null, z = null;
    const $ = () => {
      if (I) return;
      const W = e.current;
      if (!W) {
        z = setTimeout($, 50);
        return;
      }
      T = W, D = () => {
        if (c.current)
          return;
        const O = At(T, b.current);
        O && (l.current = O, p());
      }, T.addEventListener("scroll", D, { passive: !0 }), c.current || D();
    };
    return $(), () => {
      I = !0, z != null && clearTimeout(z), T && D && T.removeEventListener("scroll", D);
    };
  }, [o, r, n, e, p]), j(() => {
    if (!o) return;
    const I = e.current;
    if (!I) return;
    const T = (D) => {
      D.metaKey || D.ctrlKey || D.altKey || us.has(D.key) && w();
    };
    return I.addEventListener("wheel", w, { passive: !0 }), I.addEventListener("touchmove", w, { passive: !0 }), window.addEventListener("keydown", T), () => {
      I.removeEventListener("wheel", w), I.removeEventListener("touchmove", w), window.removeEventListener("keydown", T);
    };
  }, [o, e, w]), De(() => {
    var T;
    if (g.current === a) return;
    p(!0), P(), m.current != null && (clearTimeout(m.current), m.current = null), g.current = a, y.current = "";
    const I = (T = Pe(a)) == null ? void 0 : T.anchor;
    l.current = I ? de(I) : { page: 1, fraction: 0 }, i.current = null, c.current = !!a, u.current = r;
  }, [a, r, p, P]), j(() => {
    var T;
    if (!o || !s || !a || y.current === a) return;
    y.current = a;
    const I = de(
      ((T = Pe(a)) == null ? void 0 : T.anchor) || { page: 1, fraction: 0 }
    );
    return l.current = I, i.current = I, c.current = !0, P(), d.current = jt(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: b.current,
        delaysMs: Cn,
        onDone: () => v(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, v(I);
    }, Math.max(...Cn) + 160), () => P();
  }, [o, s, a, e, v, P]), j(() => {
    if (u.current === r)
      return;
    if (u.current = r, !o) {
      c.current = !1, i.current = null, P();
      return;
    }
    const I = i.current ? de(i.current) : de(l.current);
    return c.current = !0, i.current = I, l.current = I, P(), d.current = jt(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: as,
        onDone: () => v(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, v(I);
    }, ss), () => {
      P();
    };
  }, [r, o, n, e, v, P]), j(() => () => {
    P(), m.current != null && (clearTimeout(m.current), m.current = null), p(!0);
  }, [P, p]);
  const M = F(() => {
    const I = At(
      e.current,
      b.current
    );
    return de(I || l.current);
  }, [e]), A = F(() => {
    c.current = !0;
    const I = At(
      e.current,
      b.current
    ), T = de(I ?? l.current);
    return l.current = T, i.current = T, p(), T;
  }, [e, p]), x = F((I, T, D) => {
    const z = D || b.current, $ = St(I, T || 1), W = { page: $, fraction: 0 };
    l.current = W, c.current = !0, i.current = W, p(), P(), Ya(e.current, $, "smooth", z), d.current = Xa(
      () => e.current,
      $,
      {
        behavior: "auto",
        pane: z,
        delaysMs: is,
        onDone: () => v(W)
      }
    ), f.current = setTimeout(() => {
      f.current = null, v(W);
    }, cs);
  }, [e, v, P, p]), L = F(() => de(l.current), []), N = F(() => c.current, []), R = F(() => {
    if (!c.current || !i.current)
      return;
    const I = de(i.current);
    on(
      e.current,
      I,
      "auto",
      b.current
    );
  }, [e]);
  return {
    lockFromShell: M,
    beginModeSwitch: A,
    goToPage: x,
    getAnchor: L,
    isRestoring: N,
    repinIfRestoring: R
  };
}
function ms(e, t) {
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
function Tr(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), o = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), a = `j:${r}:d:${o}`;
  return t == null ? `${a}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${a}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const hs = [0, 80, 200, 400, 800], ps = 120, gs = 400;
function bs(e, t, n) {
  const { enabled: r, numPages: o, goToPage: a, resolveBlockPage: s, onAnchorApplied: l, jobId: i, documentId: c } = e, u = _(a);
  u.current = a;
  const d = _(s);
  d.current = s;
  const f = _(l);
  f.current = l;
  const m = _(n);
  m.current = n, j(() => {
    var w, p;
    if (!r || !Number.isFinite(o) || o < 1)
      return;
    const h = Wo(), g = ms(h, d.current), y = Tr(h, g, { jobId: i, documentId: c });
    if (t.current === y)
      return;
    if (g == null) {
      t.current = y, (w = m.current) == null || w.call(m);
      return;
    }
    t.current = y, h && ((p = f.current) == null || p.call(f, h, g));
    const b = [];
    let P = 0;
    for (const v of hs)
      P = Math.max(P, v), b.push(
        setTimeout(() => {
          u.current(g);
        }, v)
      );
    return b.push(
      setTimeout(() => {
        var v;
        (v = m.current) == null || v.call(m);
      }, P + ps)
    ), () => {
      for (const v of b) clearTimeout(v);
    };
  }, [r, o, i, c, t]);
}
function ys(e) {
  var a;
  const t = globalThis.window;
  if (!t || typeof ((a = t.history) == null ? void 0 : a.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, o = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", o);
}
function vs(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: o,
    resolveBlockPage: a,
    syncDebounceMs: s = gs,
    jobId: l,
    documentId: i,
    applyReaderSearch: c
  } = e, u = _(a);
  u.current = a;
  const d = _(c);
  d.current = c;
  const f = _(0);
  j(() => {
    if (!n || !r || !t.current || !Number.isFinite(o) || o < 1 || f.current === o) return;
    const m = setTimeout(() => {
      var b;
      const h = ((b = globalThis.location) == null ? void 0 : b.search) || "", g = go(h, o, u.current);
      if (f.current = o, g === null) return;
      const y = `${new URLSearchParams(g).get("block_id") || ""}`.trim();
      t.current = Tr(
        { blockId: y },
        o,
        { jobId: l, documentId: i }
      ), (d.current || ys)(g);
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
function Ss(e) {
  const t = _(""), [n, r] = C(!1), o = F(() => r(!0), []), a = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  bs(a, t, o), vs(e, t, n);
}
const Ge = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function ws(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function Dn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function Er(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = Dn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const o = Dn(n, e);
  return o < 0 || o === 0 && n.page_hash === e.pageHash ? "ignore" : "accept";
}
function Ps(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), o = Er(r, t, n);
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
function Rs(e) {
  const { hasOverlayContent: t, connection: n, showSource: r } = e;
  return {
    topBarPill: t && n !== "terminal",
    sourcePaneToggle: t && r,
    // 和 resolveReaderPaneComposition 的 overlayOnSource 同一套条件，外加
    // 「源文栏得在台面上」——否则叠层没有落脚的地方。
    overlayRenderable: t && r && e.liveTranslationVisible && !e.assistantOpen
  };
}
const Nn = [250, 500, 1e3, 2e3, 4e3], _t = [80, 160, 320, 640, 1e3, 1500], zn = [250, 500, 1e3, 2e3, 4e3, 5e3], Is = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Ut(e, t) {
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
function an(e) {
  return Ro(e) ? `${e.code || ""}`.trim() : "";
}
function ft(e, t) {
  const n = an(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Ts(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if (Er(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = Io(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (i) {
      if ((i == null ? void 0 : i.name) === "AbortError") throw i;
      a = i;
      const c = an(i);
      if (c && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(c)) throw i;
    }
    const l = _t[Math.min(s, _t.length - 1)];
    if (await Ut(l, r), s >= _t.length + 2) throw a;
  }
}
function Es({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = C(Ge), s = _(o), l = _("");
  s.current = o;
  const i = `${e || ""}`.trim(), c = `${t || ""}`.trim().toLowerCase(), u = Is.has(c) ? c : "";
  return j(() => {
    if (!n || !i) {
      l.current = "", s.current = Ge, a(Ge);
      return;
    }
    const d = r === void 0 ? Ho() : r, f = l.current === i;
    if (l.current = i, !d) {
      const w = {
        ...f ? s.current : Ge,
        connection: u ? "terminal" : "unavailable",
        jobStatus: c,
        error: "实时译文暂不可用"
      };
      s.current = w, a(w);
      return;
    }
    const m = new AbortController();
    let h = !1;
    const g = {
      ...f ? s.current : Ge,
      connection: u ? "terminal" : "connecting",
      jobStatus: c,
      error: ""
    };
    s.current = g, a(g);
    const y = (w) => {
      m.signal.aborted || a((p) => {
        const v = w(p);
        return s.current = v, v;
      });
    }, b = async () => {
      let w = 0;
      for (; !m.signal.aborted; )
        try {
          const p = await d.fetchLayout(i, { signal: m.signal });
          h = !0, y((v) => ({
            ...v,
            layoutByPage: ws(p),
            jobStatus: c,
            error: ""
          }));
          return;
        } catch (p) {
          if ((p == null ? void 0 : p.name) === "AbortError") return;
          const v = an(p);
          if (!(v === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !v)) {
            y((A) => ({
              ...A,
              connection: u ? "terminal" : "unavailable",
              jobStatus: c,
              error: ft(p, "实时译文暂不可用")
            }));
            return;
          }
          if (u) {
            y((A) => ({
              ...A,
              connection: "terminal",
              jobStatus: c,
              error: ""
            }));
            return;
          }
          y((A) => ({
            ...A,
            connection: "connecting",
            jobStatus: c,
            error: ft(p, "正在等待 OCR 版面数据")
          })), await Ut(Nn[Math.min(w, Nn.length - 1)], m.signal).catch(() => {
          }), w += 1;
        }
    };
    return (async () => {
      if (await b(), !h || m.signal.aborted) return;
      let w = 0;
      for (; !m.signal.aborted; ) {
        u || y((p) => ({
          ...p,
          connection: p.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: c,
          // 保留已有错误：首页还没提交（lastSeq 为 0）时恰恰是最容易出错的阶段，
          // 此前这里把它清成空串，UI 于是一直显示「连接中」，用户看到的是
          // "正在努力"，实际可能已经在反复失败。
          error: p.error
        }));
        try {
          await d.streamEvents(i, {
            afterSeq: s.current.lastSeq,
            signal: m.signal,
            onEvent: async (p) => {
              if (p.seq <= s.current.lastSeq) return;
              let v;
              try {
                v = await Ts(
                  i,
                  p,
                  s.current,
                  m.signal,
                  d
                );
              } catch (M) {
                if ((M == null ? void 0 : M.name) === "AbortError" || m.signal.aborted) throw M;
                y((A) => ({
                  ...A,
                  lastSeq: Math.max(A.lastSeq, p.seq),
                  error: ft(M, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              y((M) => {
                const A = Ps(M, p, v);
                return u ? {
                  ...A,
                  connection: "terminal",
                  jobStatus: c
                } : {
                  ...A,
                  jobStatus: c
                };
              }), w = 0;
            }
          });
        } catch (p) {
          if ((p == null ? void 0 : p.name) === "AbortError" || m.signal.aborted) return;
          y((v) => ({
            ...v,
            connection: u ? "terminal" : "reconnecting",
            jobStatus: c,
            error: ft(p, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (u) {
          y((p) => ({
            ...p,
            connection: "terminal",
            jobStatus: c
          }));
          return;
        }
        await Ut(zn[Math.min(w, zn.length - 1)], m.signal).catch(() => {
        }), w += 1;
      }
    })(), () => m.abort();
  }, [n, r, i, u]), o;
}
const Ms = 2e3;
function As(e) {
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
const _s = /* @__PURE__ */ new Set(["book", "translate"]);
function Mr(e) {
  return !!(e.jobId && e.sourceUrl && _s.has(e.workflow));
}
function ks(e) {
  return !!(Mr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function Ls() {
  const e = va(), t = Mr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = ks({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = _({ jobId: "", running: !1 });
  r.current.jobId !== e.jobId && (r.current = { jobId: e.jobId, running: !1 });
  const o = `${e.jobStatus || ""}`.trim().toLowerCase();
  o && !["succeeded", "failed", "cancelled", "canceled"].includes(o) && (r.current.running = !0);
  const a = Es({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t && (n || r.current.running)
  }), { shellRef: s, shellEl: l, shellWidth: i, bindShell: c } = Ra(), u = Wa({
    documentId: e.documentId,
    jobId: e.jobId
  }), d = `${u}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: f, onZoomChange: m } = Ka(e.mode, s, u), h = Ta(
    {
      mode: e.mode,
      sourceOnly: e.sourceOnly,
      assetsReady: e.assetsReady,
      sourceUrl: e.sourceUrl,
      translatedUrl: e.translatedUrl,
      sourceFile: e.sourceFile,
      translatedFile: e.translatedFile
    },
    { userZoom: f, shellWidth: i, identityKey: d }
  ), {
    beginModeSwitch: g,
    goToPage: y,
    repinIfRestoring: b
  } = fs(s, {
    primaryPane: h.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: u,
    restoreReady: h.primaryNumPages > 0
  });
  j(() => {
    b();
  }, [i, b]);
  const P = os(
    s,
    h.compareMode,
    h.rowSyncRevision,
    b
  ), w = Qa(
    s,
    h.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${f}-${h.metricsTick}`,
    h.primaryPane
  ), p = F((z, $) => {
    var O, B;
    const W = Math.max(
      Number(h.hudNumPages) || 0,
      Number(h.primaryNumPages) || 0,
      Number((O = h.numPagesByPane) == null ? void 0 : O.source) || 0,
      Number((B = h.numPagesByPane) == null ? void 0 : B.translated) || 0
    );
    y(z, W, $);
  }, [y, h.hudNumPages, h.primaryNumPages, h.numPagesByPane]), [v, M] = C(null), A = _(null), x = F((z) => {
    A.current && clearTimeout(A.current), M(z), z && (A.current = setTimeout(() => M(null), Ms));
  }, []);
  j(() => () => {
    A.current && clearTimeout(A.current);
  }, []);
  const L = F((z) => {
    const $ = Tt(e.regions, z);
    return $ ? In($, h.primaryPane).page : null;
  }, [e.regions, h.primaryPane]), N = F((z, $) => {
    const W = $ || h.primaryPane, O = typeof z == "object" && z ? `${z.block_id || ""}`.trim() : "", B = typeof z == "object" && z ? `${z.image_url || ""}`.trim() : "", Y = typeof z == "object" && z ? z.page_idx != null ? Number(z.page_idx) + 1 : z.page != null ? Number(z.page) : null : typeof z == "number" ? z + 1 : null, te = vo(e.regions, B, Y) || Tt(e.regions, O) || (typeof z == "object" ? So(e.regions, z) : null);
    let re = te ? In(te, W).page : null;
    re == null && (re = As(z)), !(re == null || re < 1) && (x(te), p(re, W));
  }, [x, p, h.primaryPane, e.regions]);
  Ss({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: h.hudNumPages || 0,
    currentPage: w,
    goToPage: p,
    resolveBlockPage: L,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (z) => {
      x(Tt(e.regions, z.blockId));
    }
  });
  const { setModeKeepingPage: R } = Za({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: g
  });
  j(() => {
    x(null);
  }, [d, x]);
  const E = !e.boot.loading && !e.boot.failed, I = G(() => ({ bindShell: c, shellEl: l, shellWidth: i, shellRef: s }), [c, l, i, s]), T = G(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), D = G(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: f,
    onZoomChange: m,
    shell: I,
    panes: h,
    sessionFiles: T,
    rowHeights: P,
    goToPage: p,
    activeRegion: v,
    jumpToAnchor: N,
    setModeKeepingPage: R,
    download: e.download,
    showHud: E,
    viewStateKey: u,
    liveTranslation: a,
    liveTranslationAvailable: n
  }), [e, I, h, T, P, p, v, N, R, E, f, m, u, a, n]);
  return G(() => ({
    ...D,
    currentPage: w
  }), [D, w]);
}
const Cs = [
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
], Ds = [
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
function Ns(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Cs)
    if (n.keys.some(
      (o) => o.length === 1 ? o === t : o === e
    )) return n;
  return null;
}
function zs(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function xs(e) {
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
    const u = (d) => {
      if (d.defaultPrevented || d.metaKey || d.ctrlKey || d.altKey || zs(d.target))
        return;
      const f = d.key, m = Ns(f);
      if (m) {
        if (m.mode) {
          if (n && m.mode !== "source")
            return;
          d.preventDefault(), r(m.mode);
          return;
        }
        if (!(m.requiresPages && l <= 0))
          switch (d.preventDefault(), m.action) {
            case "zoom-in":
              a(nt(o, 1));
              return;
            case "zoom-out":
              a(nt(o, -1));
              return;
            case "zoom-reset":
              a(Xe());
              return;
            case "next-page":
              i(St(s + 1, l));
              return;
            case "prev-page":
              i(St(s - 1, l));
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
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
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
const Os = "retainpdf:soft-reader-close";
function Fs() {
  return new URL("./index.html", window.location.href).href;
}
function $s() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: Os },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function js(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), o = new URL(e, r);
    return o.origin === r.origin && !/reader\.html$/i.test(o.pathname) && !/detail\.html$/i.test(o.pathname);
  } catch {
    return !1;
  }
}
function Us() {
  if (!(typeof window > "u") && !$s()) {
    if (js(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(Fs());
  }
}
function Bs({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ U(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), Us();
      },
      children: [
        /* @__PURE__ */ S(cr, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ S("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let xn = !1;
function Hs() {
  if (xn)
    return;
  const e = et().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (Do.GlobalWorkerOptions.workerSrc = e, xn = !0);
}
const Ws = /* @__PURE__ */ new Set(["text", "formula", "table"]);
function Js(e, t, n) {
  return e.flatMap((r) => {
    if (!Ws.has(ir(r.region))) return [];
    const o = Xt(r, t, n);
    return o ? [{ itemId: r.itemId, highlight: r, rect: o }] : [];
  });
}
function On(e, t, n) {
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
async function Vs(e) {
  var n;
  const t = `${e || ""}`;
  if (!t.trim()) return !1;
  try {
    if ((n = navigator.clipboard) != null && n.writeText)
      return await navigator.clipboard.writeText(t), !0;
  } catch {
  }
  try {
    const r = document.createElement("textarea");
    r.value = t, r.setAttribute("readonly", ""), r.style.position = "fixed", r.style.opacity = "0", document.body.appendChild(r), r.select();
    const o = document.execCommand("copy");
    return r.remove(), o;
  } catch {
    return !1;
  }
}
const qs = "reader-text-hover-copy", Gs = "reader-text-hover-id", Ar = "reader-text-hover-tools", _r = 26, kr = 190;
function Lr(e) {
  return e.height < _r * 2 || e.width < kr;
}
function Ks({
  target: e,
  pane: t = "source"
}) {
  const [n, r] = C("idle"), [o, a] = C("idle"), s = _([]), l = (e == null ? void 0 : e.itemId) || "";
  if (j(() => {
    r("idle"), a("idle");
    const m = s.current;
    return () => {
      m.forEach((h) => window.clearTimeout(h)), s.current = [];
    };
  }, [l]), !e) return null;
  const i = wo(e.highlight.region, t), c = ir(e.highlight.region), u = (m, h) => async (g) => {
    g.preventDefault(), g.stopPropagation();
    const y = await Vs(m);
    h(y ? "copied" : "failed"), s.current.push(window.setTimeout(() => h("idle"), 1200));
  }, d = c === "formula" ? "复制 LaTeX" : "复制", f = Lr(e.rect);
  return /* @__PURE__ */ S("div", { className: "reader-text-hover-layer", children: /* @__PURE__ */ S(
    "div",
    {
      className: "reader-text-hover-frame",
      "data-reader-text-hover-id": e.itemId,
      "data-reader-text-hover-kind": c,
      style: e.rect,
      children: /* @__PURE__ */ U(
        "div",
        {
          className: Ar,
          "data-placement": f ? "outside" : "inside",
          children: [
            /* @__PURE__ */ S(
              "button",
              {
                type: "button",
                className: Gs,
                "data-copy-state": o,
                "aria-label": `复制翻译编号 ${e.itemId}`,
                title: "翻译编号，点击复制",
                onPointerDown: (m) => m.stopPropagation(),
                onClick: u(e.itemId, a),
                children: o === "copied" ? "已复制编号" : e.itemId
              }
            ),
            i ? /* @__PURE__ */ S(
              "button",
              {
                type: "button",
                className: qs,
                "data-copy-state": n,
                "aria-label": t === "translated" ? "复制这段译文" : "复制这段原文",
                onPointerDown: (m) => m.stopPropagation(),
                onClick: u(i, r),
                children: n === "copied" ? "已复制" : n === "failed" ? "复制失败" : d
              }
            ) : null
          ]
        }
      )
    }
  ) });
}
function Zs(e, t) {
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
function Ys(e, t, n, r) {
  if (!e || !t) return [];
  const o = [];
  for (const a of e.blocks) {
    const s = t.itemsById.get(a.item_id);
    if (!(s != null && s.translated_text)) continue;
    const l = Xt(
      Zs(e, a),
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
const Xs = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', Qs = 256, Ke = /* @__PURE__ */ new Map();
function ei(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function ti(e) {
  const t = `${e || ""}`, { text: n, slots: r } = xo(t, { bareLatex: !0 }), o = ei(n), a = Oo(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Ke.get(t);
  if (!s && (s = Fo(o, r), Ke.set(t, s), Ke.size > Qs)) {
    const l = Ke.keys().next().value;
    l !== void 0 && Ke.delete(l);
  }
  return { fallbackHtml: a, richHtml: s, hasMath: !0 };
}
function kt(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function we(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function ni(e, t) {
  const n = e.typography, r = we(t) || 1, o = we(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), l = kt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, l * r)), c = we(n == null ? void 0 : n.fit_min_font_size_pt), u = we(n == null ? void 0 : n.fit_max_font_size_pt), d = Math.max(3.5, (c || 5.5) * r), f = Math.max(
    d,
    u ? u * r : o ? o * r : i
  ), m = o ? o * r : i, h = we(n == null ? void 0 : n.leading_em), g = [
    we(n == null ? void 0 : n.padding_top_pt) || 0,
    we(n == null ? void 0 : n.padding_right_pt) || 0,
    we(n == null ? void 0 : n.padding_bottom_pt) || 0,
    we(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((y) => y * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || Xs,
    fontSizePx: Math.max(d, Math.min(f, m)),
    minFontSizePx: d,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: h ? 1 + h : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (kt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : kt(e.kind) ? "center" : "justify",
    padding: g,
    exact: !!o
  };
}
function ri(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), l = (d) => {
    const f = s.get(d);
    if (f !== void 0) return f;
    const { width: m, height: h } = e(d), g = m <= t + 0.5 && h <= n + 0.5;
    return s.set(d, g), g;
  };
  let i = o, c = a, u = Math.min(r.requestedFontSizePx, c);
  if (l(u)) {
    if (!r.exact) {
      i = u;
      for (let d = 0; d < 6 && c > i; d += 1) {
        const f = (i + c) / 2;
        l(f) ? (u = f, i = f) : c = f;
      }
    }
  } else {
    c = u, u = i;
    for (let d = 0; d < 8 && c > i; d += 1) {
      const f = (i + c) / 2;
      l(f) ? (u = f, i = f) : c = f;
    }
  }
  return Math.max(o, u);
}
const oi = 512, Ze = /* @__PURE__ */ new Map();
let Bt = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Bt += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Bt += 1;
}));
function ai(e, t, n, r) {
  return [
    Bt,
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
function si({ item: e, pageScale: t }) {
  const n = _(null), r = G(
    () => ti(e.translatedText),
    [e.translatedText]
  ), [o, a] = C(r.fallbackHtml), s = G(
    () => ni(e, t),
    [e, t]
  );
  j(() => {
    let d = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      d && a(f);
    }), () => {
      d = !1;
    };
  }, [r]), De(() => {
    const d = n.current;
    if (!d) return;
    const [f, m, h, g] = s.padding, y = Math.max(1, e.rect.width - g - m), b = Math.max(1, e.rect.height - f - h), P = ai(o, y, b, s);
    let w = Ze.get(P);
    if (w === void 0 && (w = ri(
      (p) => (d.style.fontSize = `${p}px`, { width: d.scrollWidth, height: d.scrollHeight }),
      y,
      b,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Ze.set(P, w), Ze.size > oi)) {
      const p = Ze.keys().next().value;
      p !== void 0 && Ze.delete(p);
    }
    d.style.fontSize = `${w.toFixed(2)}px`;
  }, [o, e.rect.height, e.rect.width, s]);
  const [l, i, c, u] = s.padding;
  return /* @__PURE__ */ S(
    "div",
    {
      className: `reader-live-translation-item${e.changedNow ? " is-changed" : ""}`,
      "data-live-translation-item": e.itemId,
      "data-live-translation-kind": e.kind,
      "data-live-translation-status": e.status,
      "data-live-translation-typography": s.exact ? "typst" : "fitted",
      style: {
        ...e.rect,
        padding: `${l}px ${i}px ${c}px ${u}px`
      },
      children: /* @__PURE__ */ S(
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
function ii({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = G(
    () => Ys(e, t, n, r),
    [r, e, t, n]
  );
  return o.length ? /* @__PURE__ */ S(
    "div",
    {
      className: "reader-live-translation-overlay",
      "data-live-translation-page": e == null ? void 0 : e.page_idx,
      "data-live-translation-generation": t == null ? void 0 : t.generation,
      "aria-hidden": "true",
      children: o.map((a) => /* @__PURE__ */ S(
        si,
        {
          item: a,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${a.itemId}:${a.changedAtSeq}`
      ))
    }
  ) : null;
}
const ci = Gt(ii), Cr = 1.414;
function li({
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
  regionHighlight: u = null,
  regionTargets: d = [],
  hoveredRegionId: f,
  onHoverRegion: m,
  liveTranslationLayout: h,
  liveTranslationPage: g,
  showLiveTranslation: y = r === "source"
}) {
  const b = _(l ?? Cr), [P, w] = C(b.current);
  j(() => {
    l != null && Math.abs(l - b.current) >= 1e-3 && (b.current = l, w(l));
  }, [l]);
  const p = _(c);
  p.current = c;
  const v = _((O) => {
    var B;
    (B = p.current) == null || B.call(p, O);
  }).current, M = Math.max(120, Math.floor(t * P)), A = Math.max(M, Math.ceil(a || 0)), x = Xt(u, t, M), L = G(
    () => Js(d, t, M),
    [M, d, t]
  ), [N, R] = C(null), E = typeof m == "function", I = E ? f ?? null : N, T = (O) => {
    E ? O !== (f ?? null) && (m == null || m(O)) : R((B) => B === O ? B : O);
  }, D = G(
    () => L.find((O) => O.itemId === I) || null,
    [I, L]
  ), z = (O) => {
    var oe, ne;
    if (O.pointerType === "touch") return;
    if (O.buttons !== 0) {
      T(null);
      return;
    }
    if ((ne = (oe = O.target) == null ? void 0 : oe.closest) != null && ne.call(oe, `.${Ar}`)) return;
    const B = O.currentTarget.getBoundingClientRect(), Y = O.clientX - B.left, te = O.clientY - B.top, re = D == null ? void 0 : D.rect;
    if (re && Lr(re) && Y >= re.left - 4 && Y <= re.left + kr && te >= re.top - _r && te <= re.top) return;
    const ae = On(L, Y, te);
    T((ae == null ? void 0 : ae.itemId) || null);
  }, $ = (O) => {
    if (O.pointerType === "mouse") return;
    const B = O.currentTarget.getBoundingClientRect(), Y = On(
      L,
      O.clientX - B.left,
      O.clientY - B.top
    );
    T((Y == null ? void 0 : Y.itemId) || null);
  }, W = (O) => {
    !Number.isFinite(O) || O <= 0 || Math.abs(b.current - O) < 1e-3 || (b.current = O, w(O), i == null || i(e, O));
  };
  return /* @__PURE__ */ U(
    "div",
    {
      ref: v,
      [He]: e,
      [tt]: r,
      [en]: M,
      className: tn,
      onPointerMoveCapture: z,
      onPointerDown: $,
      onPointerLeave: (O) => {
        O.pointerType === "mouse" && T(null);
      },
      style: {
        width: t,
        height: A,
        minHeight: A
      },
      children: [
        o ? /* @__PURE__ */ S(
          No,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: hr,
            loading: /* @__PURE__ */ S(
              "div",
              {
                className: yt,
                style: { width: t, height: M }
              }
            ),
            onLoadSuccess: (O) => {
              try {
                const B = O.getViewport({ scale: 1 });
                if (B.width > 0) {
                  const Y = B.height / B.width;
                  W(Y);
                }
              } catch {
              }
              s == null || s();
            },
            onRenderSuccess: () => {
              s == null || s();
            }
          }
        ) : /* @__PURE__ */ S(
          "div",
          {
            className: yt,
            style: { width: t, height: M },
            "aria-hidden": !0
          }
        ),
        x ? /* @__PURE__ */ S(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": u == null ? void 0 : u.itemId,
            style: x,
            "aria-hidden": "true"
          }
        ) : null,
        o && y ? /* @__PURE__ */ S(
          ci,
          {
            layoutPage: h,
            pageState: g,
            width: t,
            height: M
          }
        ) : null,
        /* @__PURE__ */ S(
          Ks,
          {
            target: o ? D : null,
            pane: r === "translated" ? "translated" : "source"
          }
        )
      ]
    }
  );
}
const ui = Gt(li), Lt = 5, di = "120% 0px", fi = 120;
let Fn = 1;
const $n = /* @__PURE__ */ new WeakMap();
function mi(e) {
  if (!e) return 0;
  const t = $n.get(e);
  if (t) return t;
  const n = Fn;
  return Fn += 1, $n.set(e, n), n;
}
function hi() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const pi = ao(
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
    onMetrics: u,
    onLoadSuccess: d,
    onLoadError: f,
    onNumPagesChange: m,
    activeRegion: h = null,
    regions: g = [],
    readerMetadata: y = null,
    hoveredRegionId: b = null,
    onHoverRegion: P,
    liveTranslation: w,
    showLiveTranslation: p = t === "source",
    liveTranslationPendingLabel: v = "",
    paneAction: M
  }, A) {
    Hs();
    const { file: x, loading: L, error: N } = pa(n, r), R = `${n}\0${mi(x)}`, E = _(R);
    E.current = R;
    const I = G(
      () => fa(x),
      [x, n]
    ), [T, D] = C(0), [z, $] = C(""), [W, O] = C(null), [B, Y] = C(480), te = _(null), re = _(0), ae = G(() => hi(), []), oe = G(() => ({
      cMapUrl: et().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: et().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    Kt(A, () => W, [W]), j(() => {
      const k = (V) => {
        re.current = V, Y(V);
      }, J = (V) => {
        const Z = $a(V, re.current);
        if (Z !== "ignore") {
          if (te.current && clearTimeout(te.current), Z === "immediate") {
            k(V);
            return;
          }
          te.current = setTimeout(() => k(V), ja);
        }
      }, H = !!(i && i >= 80);
      J(H ? i : (l == null ? void 0 : l.clientWidth) || 0);
      const se = !H && l && typeof ResizeObserver < "u" ? new ResizeObserver((V) => {
        var Z, ie;
        J(((ie = (Z = V[0]) == null ? void 0 : Z.contentRect) == null ? void 0 : ie.width) ?? l.clientWidth);
      }) : null;
      return se && l && se.observe(l), () => {
        se == null || se.disconnect(), te.current && clearTimeout(te.current);
      };
    }, [i, l, a]);
    const ne = G(
      () => xa(B, o),
      [B, o]
    ), [be, xe] = C(() => /* @__PURE__ */ new Map()), [Ae, ct] = C(() => /* @__PURE__ */ new Set()), [Rt, X] = C(() => /* @__PURE__ */ new Set()), Q = _(/* @__PURE__ */ new Map()), ee = _(null), me = _(/* @__PURE__ */ new Map()), he = F((k, J) => {
      xe((H) => {
        if (H.get(k) === J) return H;
        const q = new Map(H);
        return q.set(k, J), q;
      });
    }, []), Ie = F((k, J) => {
      const H = Q.current, q = H.get(k);
      if (q && ee.current)
        try {
          ee.current.unobserve(q);
        } catch {
        }
      if (J) {
        if (H.set(k, J), ee.current)
          try {
            ee.current.observe(J);
          } catch {
          }
      } else
        H.delete(k);
    }, []), It = _(/* @__PURE__ */ new Map()), lt = F((k) => {
      const J = It.current;
      let H = J.get(k);
      return H || (H = (q) => Ie(k, q), J.set(k, H)), H;
    }, [Ie]);
    j(() => {
      if (typeof IntersectionObserver > "u") return;
      const k = me.current, J = new IntersectionObserver(
        (H) => {
          const q = [], se = [];
          for (const V of H) {
            const Z = V.target, ie = nn(Z);
            Number.isFinite(ie) && (V.isIntersecting ? q : se).push(ie);
          }
          if ((q.length || se.length) && ct((V) => {
            let Z = null;
            for (const ie of q)
              V.has(ie) || (Z = Z || new Set(V), Z.add(ie));
            for (const ie of se)
              V.has(ie) && (Z = Z || new Set(V), Z.delete(ie));
            return Z || V;
          }), q.length) {
            for (const V of q) {
              const Z = k.get(V);
              Z && (clearTimeout(Z), k.delete(V));
            }
            X((V) => {
              let Z = null;
              for (const ie of q)
                V.has(ie) || (Z = Z || new Set(V), Z.add(ie));
              return Z || V;
            });
          }
          for (const V of se)
            k.has(V) || k.set(V, setTimeout(() => {
              k.delete(V), X((Z) => {
                if (!Z.has(V)) return Z;
                const ie = new Set(Z);
                return ie.delete(V), ie;
              });
            }, fi));
        },
        { root: l, rootMargin: di, threshold: 0 }
      );
      ee.current = J;
      for (const H of Q.current.values())
        try {
          J.observe(H);
        } catch {
        }
      return () => {
        J.disconnect(), ee.current === J && (ee.current = null);
        for (const H of k.values()) clearTimeout(H);
        k.clear();
      };
    }, [l]), De(() => {
      D(0), $(""), ct(/* @__PURE__ */ new Set()), X(/* @__PURE__ */ new Set()), xe(/* @__PURE__ */ new Map()), Q.current.clear();
      const k = me.current;
      for (const J of k.values()) clearTimeout(J);
      k.clear(), m == null || m(0, t);
    }, [R, m, t]);
    const ut = F(
      ({ numPages: k }) => {
        E.current === R && (D(k), $(""), m == null || m(k, t), d == null || d({ numPages: k, pane: t }));
      },
      [R, d, m, t]
    ), Ve = F(
      (k) => {
        if (E.current !== R) return;
        const J = (k == null ? void 0 : k.message) || "PDF 解析失败";
        $(J), D(0), m == null || m(0, t), f == null || f(k, t);
      },
      [R, f, m, t]
    ), ye = G(
      () => T > 0 ? Array.from({ length: T }, (k, J) => J + 1) : [],
      [T]
    );
    j(() => {
      typeof IntersectionObserver < "u" || X(new Set(ye));
    }, [ye]);
    const ve = G(
      () => Tn(h, y, t),
      [h, y, t]
    ), Oe = G(() => {
      const k = /* @__PURE__ */ new Map();
      for (const J of g) {
        const H = Tn(J, y, t);
        if (!H) continue;
        const q = k.get(H.box.page) || [];
        q.push(H), k.set(H.box.page, q);
      }
      return k;
    }, [t, y, g]), to = G(() => {
      const k = /* @__PURE__ */ new Set();
      if (!b) return k;
      for (const [J, H] of Oe)
        H.some((q) => q.itemId === b) && k.add(J);
      return k;
    }, [b, Oe]), no = G(() => {
      if (T === 0) return /* @__PURE__ */ new Set();
      if (!a) return /* @__PURE__ */ new Set();
      if (!(!!l && typeof IntersectionObserver < "u")) return new Set(ye);
      if (Ae.size === 0) {
        const H = Math.min(T, Lt * 2 + 1);
        return new Set(Array.from({ length: H }, (q, se) => se + 1));
      }
      const J = /* @__PURE__ */ new Set();
      for (const H of Ae)
        for (let q = -Lt; q <= Lt; q++) {
          const se = H + q;
          se >= 1 && se <= T && J.add(se);
        }
      return J;
    }, [T, ye, l, a, Ae]), ro = !n || !!N || !!z, oo = n && (N || z) || s;
    return /* @__PURE__ */ U(
      "section",
      {
        ref: O,
        className: `reader-panel ${_a}${a ? "" : " is-hidden"}`,
        [tt]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": a ? "true" : "false",
        "data-live-translation-status": (w == null ? void 0 : w.jobStatus) || void 0,
        "aria-hidden": a ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          M ? /* @__PURE__ */ S("div", { className: "reader-react-pdf-pane-action", children: M }) : null,
          v ? /* @__PURE__ */ U("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ S("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ S("span", { children: v })
          ] }) : null,
          ro && !L ? /* @__PURE__ */ S("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: oo }) : null,
          L ? /* @__PURE__ */ S("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          I && !N ? /* @__PURE__ */ S("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ S(
            zo,
            {
              file: I,
              loading: null,
              error: null,
              options: oe,
              onLoadSuccess: ut,
              onLoadError: Ve,
              className: "reader-react-pdf-document",
              children: ye.map((k) => {
                if (no.has(k))
                  return /* @__PURE__ */ S(
                    ui,
                    {
                      pane: t,
                      pageNumber: k,
                      width: ne,
                      devicePixelRatio: ae,
                      active: Rt.has(k),
                      syncedMinHeight: (c == null ? void 0 : c.get(k)) || 0,
                      onMetrics: u,
                      cachedAspect: be.get(k),
                      onAspectChange: he,
                      sentinelRef: lt(k),
                      regionHighlight: (ve == null ? void 0 : ve.box.page) === k ? ve : null,
                      regionTargets: Oe.get(k),
                      hoveredRegionId: b && to.has(k) ? b : null,
                      onHoverRegion: P,
                      liveTranslationLayout: w == null ? void 0 : w.layoutByPage.get(k - 1),
                      liveTranslationPage: w == null ? void 0 : w.pagesByPage.get(k - 1),
                      showLiveTranslation: p
                    },
                    `${t}-${k}`
                  );
                const H = be.get(k) ?? Cr, q = Math.max(120, Math.floor(ne * H)), se = Math.max(q, Math.ceil((c == null ? void 0 : c.get(k)) || 0));
                return /* @__PURE__ */ S(
                  "div",
                  {
                    ref: lt(k),
                    [He]: k,
                    [tt]: t,
                    [en]: q,
                    className: tn,
                    style: {
                      width: ne,
                      height: se,
                      minHeight: se
                    },
                    children: /* @__PURE__ */ S(
                      "div",
                      {
                        className: yt,
                        style: { width: ne, height: q },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${k}`
                );
              })
            },
            R
          ) }) : null
        ]
      }
    );
  }
), jn = Gt(pi), Dr = Zt(null), Nr = Zt(null);
function gi({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ S(Dr.Provider, { value: e, children: /* @__PURE__ */ S(Nr.Provider, { value: t, children: n }) });
}
function it() {
  return Yt(Dr);
}
function bi() {
  return Yt(Nr);
}
function yi({
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
function vi(e, t, n = e * 2) {
  return t ? !Number.isFinite(e) || e <= 0 ? n : e * 2 : e;
}
function Si(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function wi(e) {
  const t = it(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", l = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, c = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), u = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, d = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? st, h = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, g = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), y = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, b = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, P = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, w = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", p = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", v = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, M = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, A = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), x = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), L = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), N = e.regions ?? (t == null ? void 0 : t.regions) ?? [], R = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), [E, I] = C(null), T = F((W) => I(W), []), D = yi({
    mode: s,
    compareMode: l,
    showSource: i,
    showTranslated: c,
    markdownSplit: n,
    overlayOnSource: u
  }), $ = Number.isFinite(h) && h > 0 ? vi(
    h,
    n || r,
    typeof document > "u" ? h * 2 : document.documentElement.clientWidth
  ) : null;
  return /* @__PURE__ */ S(
    "div",
    {
      ref: d,
      className: Aa,
      "data-reader-region-count": N.length,
      "data-reader-structured-region-count": N.filter(Po).length,
      "data-reader-metadata-ready": R ? "true" : "false",
      children: /* @__PURE__ */ U(
        "main",
        {
          className: `${Ma} reader-mode-${D.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            y ? /* @__PURE__ */ S(
              jn,
              {
                pane: "source",
                url: w,
                preloadedFile: v,
                userZoom: m,
                visible: D.showSource,
                scrollRoot: f,
                pageWidthOverride: $,
                rowHeights: D.compareMode ? g : void 0,
                onMetrics: A,
                emptyLabel: P ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: x,
                activeRegion: L,
                regions: N,
                readerMetadata: R,
                hoveredRegionId: E,
                onHoverRegion: T,
                liveTranslation: u ? o : void 0,
                showLiveTranslation: u,
                liveTranslationPendingLabel: u ? Si(o) : "",
                paneAction: u ? /* @__PURE__ */ U(qt, { children: [
                  e.sourcePaneAction,
                  /* @__PURE__ */ S(
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
            b ? /* @__PURE__ */ S(
              jn,
              {
                pane: "translated",
                url: p,
                preloadedFile: M,
                userZoom: m,
                visible: D.showTranslated,
                scrollRoot: f,
                pageWidthOverride: $,
                rowHeights: D.compareMode ? g : void 0,
                onMetrics: A,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: x,
                activeRegion: L,
                regions: N,
                readerMetadata: R,
                hoveredRegionId: E,
                onHoverRegion: T,
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
const Pi = [
  { id: "source", label: "源文件", Icon: lr },
  { id: "compare", label: "对照", Icon: ur },
  { id: "translated", label: "翻译文件", Icon: dr }
];
function Un(e) {
  return `辅助面板占了右半边，对照只剩${e === "translated" ? "译文" : "原文"} · 点此关闭面板恢复对照`;
}
function Ri(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function Ii(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Ti(e) {
  const t = it(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null,
    compareDegraded: s = !1,
    onRestoreCompare: l
  } = e, i = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, c = a ? Ri(a.state) : "";
  return /* @__PURE__ */ U("header", { className: "reader-workspace-bar", children: [
    a ? /* @__PURE__ */ U(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${a.state.connection}${a.visible ? " is-active" : ""}`,
        "aria-pressed": a.visible,
        "aria-label": a.visible ? "隐藏实时译文" : "显示实时译文",
        title: a.state.error || c,
        onClick: a.onToggle,
        children: [
          /* @__PURE__ */ S(Eo, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ S("span", { className: "reader-live-translation-toggle-label", children: c })
        ]
      }
    ) : null,
    /* @__PURE__ */ S("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: Pi.map(({ id: u, label: d, Icon: f }) => {
      const m = n === u, h = Ii({
        id: u,
        documentReady: r,
        sourceViewOnly: i,
        liveTranslationAvailable: !!a
      });
      return /* @__PURE__ */ U(
        "button",
        {
          type: "button",
          className: `reader-workspace-tab${m ? " is-active" : ""}`,
          role: "tab",
          "aria-selected": m,
          "aria-label": d,
          title: h ? `${d} 需要文档任务` : d,
          disabled: h,
          onClick: () => o(u),
          children: [
            /* @__PURE__ */ S(f, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ S("span", { className: "reader-workspace-tab-label", children: d })
          ]
        },
        u
      );
    }) }),
    s ? /* @__PURE__ */ U(
      "button",
      {
        type: "button",
        className: "reader-compare-degraded",
        onClick: l,
        title: Un(n),
        children: [
          /* @__PURE__ */ S(Mo, { size: 13, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ S("span", { className: "reader-compare-degraded-label", children: Un(n) })
        ]
      }
    ) : null
  ] });
}
const Ei = {
  markdown: { label: "Markdown", short: "MD", Icon: Ao, needsJob: !0 }
}, Mi = br.map(
  (e) => ({ id: e, ...Ei[e] })
), Ai = {
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
    Icon: _o,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    ariaLabel: "AI（agent 终端）",
    keepMounted: !0
  }
}, zr = yr.map(
  (e) => ({ id: e, ...Ai[e] })
);
function _i(e) {
  return [
    ...Mi.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: a
    })),
    ...zr.filter((t) => e(t.adapterKey)).map(({ id: t, label: n, short: r, Icon: o }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: !1
    }))
  ];
}
function ki() {
  const e = ue();
  return _i((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function Li(e) {
  const t = it(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), l = ki();
  return n ? /* @__PURE__ */ U("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ S("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: l.map(({ id: i, label: c, Icon: u, needsJob: d }) => {
      const f = n === i, m = d && o, h = r == null ? void 0 : r[i];
      return /* @__PURE__ */ U(
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
            /* @__PURE__ */ S(u, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ S("span", { className: "reader-assistant-dock-tab-label", children: c }),
            h ? /* @__PURE__ */ S("span", { className: "reader-assistant-dock-badge", children: h }) : null
          ]
        },
        i
      );
    }) }),
    /* @__PURE__ */ S(
      "button",
      {
        type: "button",
        className: "reader-assistant-dock-close",
        "aria-label": "关闭阅读辅助面板",
        title: "关闭辅助面板",
        onClick: s,
        children: /* @__PURE__ */ S(cr, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ S("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: l.map(({ id: i, label: c, short: u, Icon: d, needsJob: f }) => {
    const m = f && o, h = r == null ? void 0 : r[i];
    return /* @__PURE__ */ U(
      "button",
      {
        type: "button",
        className: "reader-assistant-rail-button",
        "aria-label": `打开${c}`,
        title: m ? `${c} 需打开任务阅读` : c,
        disabled: m,
        onClick: () => a(i),
        children: [
          /* @__PURE__ */ S(d, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
          /* @__PURE__ */ S("span", { children: u }),
          h ? /* @__PURE__ */ S("span", { className: "reader-assistant-dock-badge", children: h }) : null
        ]
      },
      i
    );
  }) });
}
function Ci(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function Di(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function Ni(e) {
  return e / 100 * window.innerHeight;
}
function zi(e) {
  return e / 100 * window.innerWidth;
}
function xi(e) {
  switch (typeof e) {
    case "number":
      return [e, "px"];
    case "string": {
      const t = parseFloat(e);
      return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
    }
  }
}
function Ye({
  groupSize: e,
  panelElement: t,
  styleProp: n
}) {
  let r;
  const [o, a] = xi(n);
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
      r = Di(t, o);
      break;
    }
    case "em": {
      r = Ci(t, o);
      break;
    }
    case "vh": {
      r = Ni(o);
      break;
    }
    case "vw": {
      r = zi(o);
      break;
    }
  }
  return r;
}
function le(e) {
  return parseFloat(e.toFixed(3));
}
function We({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, o) => (r += t === "horizontal" ? o.element.offsetWidth : o.element.offsetHeight, r), 0);
}
function Ht(e) {
  const { panels: t } = e, n = We({ group: e });
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
      const u = Ye({
        groupSize: n,
        panelElement: o,
        styleProp: a.collapsedSize
      });
      s = le(u / n * 100);
    }
    let l;
    if (a.defaultSize !== void 0) {
      const u = Ye({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      l = le(u / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const u = Ye({
        groupSize: n,
        panelElement: o,
        styleProp: a.minSize
      });
      i = le(u / n * 100);
    }
    let c = 100;
    if (a.maxSize !== void 0) {
      const u = Ye({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      c = le(u / n * 100);
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
function K(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function Wt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? Oi : Fi
  );
}
function Oi(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function Fi(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function xr(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Or(e, t) {
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
function $i({
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
    const { x: l, y: i } = Or(r, s), c = e === "horizontal" ? l : i;
    c < a && (a = c, o = s);
  }
  return K(o, "No rect found"), o;
}
let mt;
function ji() {
  return mt === void 0 && (typeof matchMedia == "function" ? mt = !!matchMedia("(pointer:coarse)").matches : mt = !1), mt;
}
function Fr(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = Wt(
    n,
    Array.from(t.children).filter(xr).map((h) => ({ element: h }))
  ).map(({ element: h }) => h), s = [];
  let l = !1, i = !1, c = -1, u = -1, d = 0, f, m = [];
  {
    let h = -1;
    for (const g of a)
      g.hasAttribute("data-panel") && (h++, g.hasAttribute("data-disabled") || (d++, c === -1 && (c = h), u = h));
  }
  if (d > 1) {
    let h = -1;
    for (const g of a)
      if (g.hasAttribute("data-panel")) {
        h++;
        const y = r.find(
          (b) => b.element === g
        );
        if (y) {
          if (f) {
            const b = f.element.getBoundingClientRect(), P = g.getBoundingClientRect();
            let w;
            if (i) {
              const p = n === "horizontal" ? new DOMRect(
                b.right,
                b.top,
                0,
                b.height
              ) : new DOMRect(
                b.left,
                b.bottom,
                b.width,
                0
              ), v = n === "horizontal" ? new DOMRect(P.left, P.top, 0, P.height) : new DOMRect(P.left, P.top, P.width, 0);
              switch (m.length) {
                case 0: {
                  w = [
                    p,
                    v
                  ];
                  break;
                }
                case 1: {
                  const M = m[0], A = $i({
                    orientation: n,
                    rects: [b, P],
                    targetRect: M.element.getBoundingClientRect()
                  });
                  w = [
                    M,
                    A === b ? v : p
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
                  b.right,
                  P.top,
                  P.left - b.right,
                  P.height
                ) : new DOMRect(
                  P.left,
                  b.bottom,
                  P.width,
                  P.top - b.bottom
                )
              ];
            for (const p of w) {
              let v = "width" in p ? p : p.element.getBoundingClientRect();
              const M = ji() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (v.width < M) {
                const x = M - v.width;
                v = new DOMRect(
                  v.x - x / 2,
                  v.y,
                  v.width + x,
                  v.height
                );
              }
              if (v.height < M) {
                const x = M - v.height;
                v = new DOMRect(
                  v.x,
                  v.y - x / 2,
                  v.width,
                  v.height + x
                );
              }
              const A = h <= c || h > u;
              !l && !A && s.push({
                group: e,
                groupSize: We({ group: e }),
                panels: [f, y],
                separator: "width" in p ? void 0 : p,
                rect: v
              }), l = !1;
            }
          }
          i = !1, f = y, m = [];
        }
      } else if (g.hasAttribute("data-separator")) {
        g.ariaDisabled !== null && (l = !0);
        const y = o.find(
          (b) => b.element === g
        );
        y ? m.push(y) : (f = void 0, m = []);
      } else
        i = !0;
  }
  return s;
}
var Ee;
class $r {
  constructor() {
    Pn(this, Ee, {});
  }
  addListener(t, n) {
    const r = qe(this, Ee)[t];
    return r === void 0 ? qe(this, Ee)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = qe(this, Ee)[t];
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
    Rn(this, Ee, {});
  }
  removeListener(t, n) {
    const r = qe(this, Ee)[t];
    if (r !== void 0) {
      const o = r.indexOf(n);
      o >= 0 && r.splice(o, 1);
    }
  }
}
Ee = new WeakMap();
let Ue = {
  cursorFlags: 0,
  state: "inactive"
};
const sn = new $r();
function ke() {
  return Ue;
}
function Ui(e) {
  return sn.addListener("change", e);
}
function Bi(e) {
  const t = Ue, n = { ...Ue };
  n.cursorFlags = e, Ue = n, sn.emit("change", {
    prev: t,
    next: n
  });
}
function Be(e) {
  const t = Ue;
  Ue = e, sn.emit("change", {
    prev: t,
    next: e
  });
}
const Hi = (e) => e, Ct = () => {
}, jr = 1, Ur = 2, Br = 4, Hr = 8, Bn = 3, Hn = 12;
let ht;
function Wn() {
  return ht === void 0 && (ht = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (ht = !0)), ht;
}
function Wi({
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
        if (e && Wn()) {
          const a = (e & jr) !== 0, s = (e & Ur) !== 0, l = (e & Br) !== 0, i = (e & Hr) !== 0;
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
    return Wn() ? r > 0 && o > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && o > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const Jn = /* @__PURE__ */ new WeakMap();
function cn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = Jn.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = ke();
  switch (r.state) {
    case "active":
    case "hover": {
      const o = Wi({
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
  Jn.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let ge = /* @__PURE__ */ new Map();
const Wr = new $r();
function Ji(e) {
  ge = new Map(ge), ge.delete(e);
}
function Vn(e, t) {
  for (const [n] of ge)
    if (n.id === e)
      return n;
}
function Me(e, t) {
  for (const [n, r] of ge)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function Ne() {
  return ge;
}
function ln(e, t) {
  return Wr.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Re(e, t, n) {
  const r = ge.get(e);
  ge = new Map(ge), ge.set(e, t), Wr.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function Jr(e) {
  const t = ke();
  let n = !1;
  switch (t.state) {
    case "active":
      Be({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (cn(e), n = !0, t.hitRegions.forEach((r) => {
        const o = Me(r.group.id, !0);
        Re(r.group, o, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function qn(e) {
  e.defaultPrevented || Jr(e.currentTarget);
}
function Vi(e, t, n) {
  let r, o = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const s = Or(n, a.rect);
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
function qi(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function Gi(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: Zn(e),
    b: Zn(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  K(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const o = {
    a: Kn(Gn(n.a)),
    b: Kn(Gn(n.b))
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
const Ki = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function Zi(e) {
  const t = getComputedStyle(Vr(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function Yi(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || Zi(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || Ki.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function Gn(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (K(n, "Missing node"), Yi(n)) return n;
  }
  return null;
}
function Kn(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function Zn(e) {
  const t = [];
  for (; e; )
    t.push(e), e = Vr(e);
  return t;
}
function Vr(e) {
  const { parentNode: t } = e;
  return qi(t) ? t.host : t;
}
function Xi(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function Qi({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!xr(n) || n.contains(e) || e.contains(n))
    return !0;
  if (Gi(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (Xi(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function un(e, t) {
  const n = [];
  return t.forEach((r, o) => {
    if (o.disabled)
      return;
    const a = Fr(o), s = Vi(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && Qi({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function ec(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function ce(e, t, n = 0) {
  return Math.abs(le(e) - le(t)) <= n;
}
function pe(e, t) {
  return ce(e, t) ? 0 : e > t ? 1 : -1;
}
function je({
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
  if (pe(r, i) < 0)
    if (a) {
      const c = (o + i) / 2;
      pe(r, c) < 0 ? r = o : r = i;
    } else
      r = i;
  return r = Math.min(l, r), r = le(r), r;
}
function rt({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: o,
  trigger: a
}) {
  if (ce(e, 0))
    return t;
  const s = a === "imperative-api", l = Object.values(t), i = Object.values(o), c = [...l], [u, d] = r;
  K(u != null, "Invalid first pivot index"), K(d != null, "Invalid second pivot index");
  let f = 0;
  switch (a) {
    case "keyboard": {
      {
        const g = e < 0 ? d : u, y = n[g];
        K(
          y,
          `Panel constraints not found for index ${g}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: w = 0
        } = y;
        if (P) {
          const p = l[g];
          if (K(
            p != null,
            `Previous layout not found for panel index ${g}`
          ), ce(p, b)) {
            const v = w - p;
            pe(v, Math.abs(e)) > 0 && (e = e < 0 ? 0 - v : v);
          }
        }
      }
      {
        const g = e < 0 ? u : d, y = n[g];
        K(
          y,
          `No panel constraints found for index ${g}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: w = 0
        } = y;
        if (P) {
          const p = l[g];
          if (K(
            p != null,
            `Previous layout not found for panel index ${g}`
          ), ce(p, w)) {
            const v = p - b;
            pe(v, Math.abs(e)) > 0 && (e = e < 0 ? 0 - v : v);
          }
        }
      }
      break;
    }
    default: {
      const g = e < 0 ? d : u, y = n[g];
      K(
        y,
        `Panel constraints not found for index ${g}`
      );
      const b = l[g], { collapsible: P, collapsedSize: w, minSize: p } = y;
      if (P && pe(b, p) < 0)
        if (e > 0) {
          const v = p - w, M = v / 2, A = b + e;
          pe(A, p) < 0 && (e = pe(e, M) <= 0 ? 0 : v);
        } else {
          const v = p - w, M = 100 - v / 2, A = b - e;
          pe(A, p) < 0 && (e = pe(100 + e, M) > 0 ? 0 : -v);
        }
      break;
    }
  }
  {
    const g = e < 0 ? 1 : -1;
    let y = e < 0 ? d : u, b = 0;
    for (; ; ) {
      const w = l[y];
      K(
        w != null,
        `Previous layout not found for panel index ${y}`
      );
      const p = je({
        overrideDisabledPanels: s,
        panelConstraints: n[y],
        prevSize: w,
        size: 100
      }) - w;
      if (b += p, y += g, y < 0 || y >= n.length)
        break;
    }
    const P = Math.min(Math.abs(e), Math.abs(b));
    e = e < 0 ? 0 - P : P;
  }
  {
    let g = e < 0 ? u : d;
    for (; g >= 0 && g < n.length; ) {
      const y = Math.abs(e) - Math.abs(f), b = l[g];
      K(
        b != null,
        `Previous layout not found for panel index ${g}`
      );
      const P = b - y, w = je({
        overrideDisabledPanels: s,
        panelConstraints: n[g],
        prevSize: b,
        size: P
      });
      if (!ce(b, w) && (f += b - w, c[g] = w, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? g-- : g++;
    }
  }
  if (ec(i, c))
    return o;
  {
    const g = e < 0 ? d : u, y = l[g];
    K(
      y != null,
      `Previous layout not found for panel index ${g}`
    );
    const b = y + f, P = je({
      overrideDisabledPanels: s,
      panelConstraints: n[g],
      prevSize: y,
      size: b
    });
    if (c[g] = P, !ce(P, b)) {
      let w = b - P, p = e < 0 ? d : u;
      for (; p >= 0 && p < n.length; ) {
        const v = c[p];
        K(
          v != null,
          `Previous layout not found for panel index ${p}`
        );
        const M = v + w, A = je({
          overrideDisabledPanels: s,
          panelConstraints: n[p],
          prevSize: v,
          size: M
        });
        if (ce(v, A) || (w -= A - v, c[p] = A), ce(w, 0))
          break;
        e > 0 ? p-- : p++;
      }
    }
  }
  const m = Object.values(c).reduce(
    (g, y) => y + g,
    0
  );
  if (!ce(m, 100, 0.1))
    return o;
  const h = Object.keys(o);
  return c.reduce((g, y, b) => (g[h[b]] = y, g), {});
}
function Le(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || pe(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function Ce({
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
  if (!ce(o, 100) && r.length > 0)
    for (let l = 0; l < t.length; l++) {
      const i = r[l];
      K(i != null, `No layout data found for index ${l}`);
      const c = 100 / o * i;
      r[l] = c;
    }
  let a = 0;
  for (let l = 0; l < t.length; l++) {
    const i = n[l];
    K(i != null, `No layout data found for index ${l}`);
    const c = r[l];
    K(c != null, `No layout data found for index ${l}`);
    const u = je({
      overrideDisabledPanels: !0,
      panelConstraints: t[l],
      prevSize: i,
      size: c
    });
    c != u && (a += c - u, r[l] = u);
  }
  if (!ce(a, 0))
    for (let l = 0; l < t.length; l++) {
      const i = r[l];
      K(i != null, `No layout data found for index ${l}`);
      const c = i + a, u = je({
        overrideDisabledPanels: !0,
        panelConstraints: t[l],
        prevSize: i,
        size: c
      });
      if (i !== u && (a -= u - i, r[l] = u, ce(a, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((l, i, c) => (l[s[c]] = i, l), {});
}
function qr({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const i = Ne();
    for (const [
      c,
      {
        defaultLayoutDeferred: u,
        derivedPanelConstraints: d,
        layout: f,
        groupSize: m,
        separatorToPanels: h
      }
    ] of i)
      if (c.id === e)
        return {
          defaultLayoutDeferred: u,
          derivedPanelConstraints: d,
          group: c,
          groupSize: m,
          layout: f,
          separatorToPanels: h
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
    prevLayout: u,
    derivedPanelConstraints: d
  }) => {
    const f = a(), m = c.findIndex((y) => y.id === t), h = m === 0, g = m === c.length - 1;
    if (g && i < f && (h || c.slice(0, m).every((y, b) => {
      const P = d[b];
      return (P == null ? void 0 : P.collapsible) && ce(P.collapsedSize, u[P.panelId]);
    }))) {
      const y = c.slice(0, m).reduce((b, P) => b + u[P.id], 0);
      return {
        ...u,
        [t]: le(100 - y)
      };
    }
    return rt({
      delta: g ? f - i : i - f,
      initialLayout: u,
      panelConstraints: d,
      pivotIndices: g ? [m - 1, m] : [m, m + 1],
      prevLayout: u,
      trigger: "imperative-api"
    });
  }, l = (i) => {
    const c = a();
    if (i === c)
      return;
    const {
      defaultLayoutDeferred: u,
      derivedPanelConstraints: d,
      group: f,
      groupSize: m,
      layout: h,
      separatorToPanels: g
    } = n(), y = s({
      nextSize: i,
      panels: f.panels,
      prevLayout: h,
      derivedPanelConstraints: d
    }), b = Ce({
      layout: y,
      panelConstraints: d
    });
    Le(h, b) || Re(f, {
      defaultLayoutDeferred: u,
      derivedPanelConstraints: d,
      groupSize: m,
      layout: b,
      separatorToPanels: g
    });
  };
  return {
    collapse: () => {
      const { collapsible: i, collapsedSize: c } = r(), { mutableValues: u } = o(), d = a();
      i && d !== c && (u.expandToSize = d, l(c));
    },
    expand: () => {
      const { collapsible: i, collapsedSize: c, minSize: u } = r(), { mutableValues: d } = o(), f = a();
      if (i && f === c) {
        let m = d.expandToSize ?? u;
        m === 0 && (m = 1), l(m);
      }
    },
    getSize: () => {
      const { group: i } = n(), c = a(), { element: u } = o(), d = i.orientation === "horizontal" ? u.offsetWidth : u.offsetHeight;
      return {
        asPercentage: c,
        inPixels: d
      };
    },
    isCollapsed: () => {
      const { collapsible: i, collapsedSize: c } = r(), u = a();
      return i && ce(c, u);
    },
    resize: (i) => {
      const { group: c } = n(), { element: u } = o(), d = We({ group: c }), f = Ye({
        groupSize: d,
        panelElement: u,
        styleProp: i
      }), m = le(f / d * 100);
      l(m);
    }
  };
}
function Yn(e) {
  if (e.defaultPrevented)
    return;
  const t = Ne();
  un(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (o) => o.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const o = r.panelConstraints.defaultSize, a = qr({
          groupId: n.group.id,
          panelId: r.id
        });
        a && o !== void 0 && (a.resize(o), e.preventDefault());
      }
    }
  });
}
function pt(e) {
  const t = Ne();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function Gr({
  groupId: e
}) {
  const t = () => {
    const n = Ne();
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
      } = t(), c = Ce({
        layout: n,
        panelConstraints: o
      });
      return r ? l : (Le(l, c) || Re(a, {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: o,
        groupSize: s,
        layout: c,
        separatorToPanels: i
      }), c);
    }
  };
}
function _e(e, t) {
  const n = pt(e), r = Me(n.id, !0), o = n.separators.find(
    (u) => u.element === e
  );
  K(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  K(a, "Matching panels not found");
  const s = a.map((u) => n.panels.indexOf(u)), l = Gr({ groupId: n.id }).getLayout(), i = rt({
    delta: t,
    initialLayout: l,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: l,
    trigger: "keyboard"
  }), c = Ce({
    layout: i,
    panelConstraints: r.derivedPanelConstraints
  });
  Le(l, c) || Re(
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
function Xn(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = pt(t);
  if (!n.disabled)
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault(), n.orientation === "vertical" && _e(t, 5);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault(), n.orientation === "horizontal" && _e(t, -5);
        break;
      }
      case "ArrowRight": {
        e.preventDefault(), n.orientation === "horizontal" && _e(t, 5);
        break;
      }
      case "ArrowUp": {
        e.preventDefault(), n.orientation === "vertical" && _e(t, -5);
        break;
      }
      case "End": {
        e.preventDefault(), _e(t, 100);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const r = pt(t), o = Me(r.id, !0), { derivedPanelConstraints: a, layout: s, separatorToPanels: l } = o, i = r.separators.find(
          (f) => f.element === t
        );
        K(i, "Matching separator not found");
        const c = l.get(i);
        K(c, "Matching panels not found");
        const u = c[0], d = a.find(
          (f) => f.panelId === u.id
        );
        if (K(d, "Panel metadata not found"), d.collapsible) {
          const f = s[u.id], m = d.collapsedSize === f ? r.mutableState.expandedPanelSizes[u.id] ?? d.minSize : d.collapsedSize;
          _e(t, m - f);
        }
        break;
      }
      case "F6": {
        e.preventDefault();
        const r = pt(t).separators.map(
          (s) => s.element
        ), o = Array.from(r).findIndex(
          (s) => s === e.currentTarget
        );
        K(o !== null, "Index not found");
        const a = e.shiftKey ? o > 0 ? o - 1 : r.length - 1 : o + 1 < r.length ? o + 1 : 0;
        r[a].focus({
          preventScroll: !0
        });
        break;
      }
      case "Home": {
        e.preventDefault(), _e(t, -100);
        break;
      }
    }
}
function Qn(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = Ne(), n = un(e, t), r = /* @__PURE__ */ new Map();
  let o = !1;
  n.forEach((a) => {
    a.separator && (o || (o = !0, a.separator.element.focus({
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
      focusVisible: !1,
      preventScroll: !0
    })));
    const s = t.get(a.group);
    s && r.set(a.group, s.layout);
  }), Be({
    cursorFlags: 0,
    hitRegions: n,
    initialLayoutMap: r,
    pointerDownAtPoint: { x: e.clientX, y: e.clientY },
    state: "active"
  }), n.length && e.preventDefault();
}
function Kr({
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
    const { group: u, groupSize: d } = c, { orientation: f, panels: m } = u, { disableCursor: h } = u.mutableState;
    let g = 0;
    a ? f === "horizontal" ? g = (t.clientX - a.x) / d * 100 : g = (t.clientY - a.y) / d * 100 : f === "horizontal" ? g = t.clientX < 0 ? -100 : 100 : g = t.clientY < 0 ? -100 : 100;
    const y = r.get(u), b = o.get(u);
    if (!y || !b)
      return;
    const {
      defaultLayoutDeferred: P,
      derivedPanelConstraints: w,
      groupSize: p,
      layout: v,
      separatorToPanels: M
    } = b;
    if (w && v && M) {
      const A = rt({
        delta: g,
        initialLayout: y,
        panelConstraints: w,
        pivotIndices: c.panels.map((x) => m.indexOf(x)),
        prevLayout: v,
        trigger: "mouse-or-touch"
      });
      if (Le(A, v)) {
        if (g !== 0 && !h)
          switch (f) {
            case "horizontal": {
              l |= g < 0 ? jr : Ur;
              break;
            }
            case "vertical": {
              l |= g < 0 ? Br : Hr;
              break;
            }
          }
      } else
        Re(c.group, {
          defaultLayoutDeferred: P,
          derivedPanelConstraints: w,
          groupSize: p,
          layout: A,
          separatorToPanels: M
        });
    }
  });
  let i = 0;
  t.movementX === 0 ? i |= s & Bn : i |= l & Bn, t.movementY === 0 ? i |= s & Hn : i |= l & Hn, Bi(i), cn(e);
}
function er(e) {
  const t = Ne(), n = ke();
  switch (n.state) {
    case "active":
      Kr({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function tr(e) {
  var r, o;
  if (e.defaultPrevented)
    return;
  const t = ke(), n = Ne();
  switch (t.state) {
    case "active": {
      if (
        // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
        e.buttons === 0
      ) {
        Be({
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
      Kr({
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
      const a = un(e, n);
      a.length === 0 ? t.state !== "inactive" && Be({
        cursorFlags: 0,
        state: "inactive"
      }) : Be({
        cursorFlags: 0,
        hitRegions: a,
        state: "hover"
      }), cn(e.currentTarget);
      break;
    }
  }
}
function nr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (ke().state) {
      case "hover":
        Be({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function rr(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || Jr(e.currentTarget) && e.preventDefault();
}
function or(e) {
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
function tc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = We({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, l = {
    asPercentage: le(a / o * 100),
    inPixels: a
  };
  r.mutableValues.prevSize = l, r.onResize(l, r.id, s);
}
function nc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function rc({
  group: e,
  nextGroupSize: t,
  prevGroupSize: n,
  prevLayout: r
}) {
  if (n <= 0 || t <= 0 || n === t)
    return r;
  let o = 0, a = 0, s = !1;
  const l = /* @__PURE__ */ new Map(), i = [];
  for (const d of e.panels) {
    const f = r[d.id] ?? 0;
    switch (d.panelConstraints.groupResizeBehavior) {
      case "preserve-pixel-size": {
        s = !0;
        const m = f / 100 * n, h = le(
          m / t * 100
        );
        l.set(d.id, h), o += h;
        break;
      }
      case "preserve-relative-size":
      default: {
        i.push(d.id), a += f;
        break;
      }
    }
  }
  if (!s || i.length === 0)
    return r;
  const c = 100 - o, u = { ...r };
  if (l.forEach((d, f) => {
    u[f] = d;
  }), a > 0)
    for (const d of i) {
      const f = r[d] ?? 0;
      u[d] = le(
        f / a * c
      );
    }
  else {
    const d = le(
      c / i.length
    );
    for (const f of i)
      u[f] = d;
  }
  return u;
}
function oc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const Fe = /* @__PURE__ */ new Map();
function ac(e) {
  let t = !0;
  K(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new n((h) => {
    for (const g of h) {
      const { borderBoxSize: y, target: b } = g;
      if (b === e.element) {
        if (t) {
          const P = We({ group: e });
          if (P === 0)
            return;
          const w = Me(e.id);
          if (!w)
            return;
          const p = Ht(e), v = w.defaultLayoutDeferred ? or(p) : w.layout, M = rc({
            group: e,
            nextGroupSize: P,
            prevGroupSize: w.groupSize,
            prevLayout: v
          }), A = Ce({
            layout: M,
            panelConstraints: p
          });
          if (!w.defaultLayoutDeferred && Le(w.layout, A) && nc(
            w.derivedPanelConstraints,
            p
          ) && w.groupSize === P)
            return;
          Re(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: p,
            groupSize: P,
            layout: A,
            separatorToPanels: w.separatorToPanels
          });
        }
      } else
        tc(e, b, y);
    }
  });
  a.observe(e.element), e.panels.forEach((h) => {
    K(
      !r.has(h.id),
      `Panel ids must be unique; id "${h.id}" was used more than once`
    ), r.add(h.id), h.onResize && a.observe(h.element);
  });
  const s = We({ group: e }), l = Ht(e), i = e.panels.map(({ id: h }) => h).join(",");
  let c = e.mutableState.defaultLayout;
  c && (oc(e.panels, c) || (c = void 0));
  const u = e.mutableState.layouts[i] ?? c ?? or(l), d = Ce({
    layout: u,
    panelConstraints: l
  }), f = e.element.ownerDocument;
  Fe.set(
    f,
    (Fe.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return Fr(e).forEach((h) => {
    h.separator && m.set(h.separator, h.panels);
  }), Re(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: l,
    groupSize: s,
    layout: d,
    separatorToPanels: m
  }), e.separators.forEach((h) => {
    K(
      !o.has(h.id),
      `Separator ids must be unique; id "${h.id}" was used more than once`
    ), o.add(h.id), h.element.addEventListener("keydown", Xn);
  }), Fe.get(f) === 1 && (f.addEventListener("contextmenu", qn, !0), f.addEventListener("dblclick", Yn, !0), f.addEventListener("pointerdown", Qn, !0), f.addEventListener("pointerleave", er), f.addEventListener("pointermove", tr), f.addEventListener("pointerout", nr), f.addEventListener("pointerup", rr, !0)), function() {
    t = !1, Fe.set(
      f,
      Math.max(0, (Fe.get(f) ?? 0) - 1)
    ), Ji(e), e.separators.forEach((h) => {
      h.element.removeEventListener("keydown", Xn);
    }), Fe.get(f) || (f.removeEventListener(
      "contextmenu",
      qn,
      !0
    ), f.removeEventListener(
      "dblclick",
      Yn,
      !0
    ), f.removeEventListener(
      "pointerdown",
      Qn,
      !0
    ), f.removeEventListener("pointerleave", er), f.removeEventListener("pointermove", tr), f.removeEventListener("pointerout", nr), f.removeEventListener("pointerup", rr, !0)), a.disconnect();
  };
}
function sc() {
  const [e, t] = C({}), n = F(() => t({}), []);
  return [e, n];
}
function dn(e) {
  const t = sr();
  return `${e ?? t}`;
}
const ze = typeof window < "u" ? De : j;
function Qe(e) {
  const t = _(e);
  return ze(() => {
    t.current = e;
  }, [e]), F(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function fn(...e) {
  return Qe((t) => {
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
function mn(e) {
  const t = _({ ...e });
  return ze(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const Zr = Zt(null);
function ic(e, t) {
  const n = _({
    getLayout: () => ({}),
    setLayout: Hi
  });
  Kt(t, () => n.current, []), ze(() => {
    Object.assign(
      n.current,
      Gr({ groupId: e })
    );
  });
}
function Yr({
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
  orientation: u = "horizontal",
  resizeTargetMinimumSize: d = {
    coarse: 20,
    fine: 10
  },
  style: f,
  ...m
}) {
  const h = _({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), g = Qe((R) => {
    Le(h.current.onLayoutChange, R) || (h.current.onLayoutChange = R, i == null || i(R));
  }), y = Qe(
    (R, E) => {
      Le(h.current.onLayoutChanged, R) || (h.current.onLayoutChanged = R, c == null || c(R, { isUserInteraction: E }));
    }
  ), b = dn(l), P = _(null), [w, p] = sc(), v = _({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: d,
    separators: []
  }), M = fn(P, a);
  ic(b, s);
  const A = Qe(
    (R, E) => {
      const I = ke(), T = Vn(R), D = Me(R);
      if (D) {
        let z = !1;
        switch (I.state) {
          case "active": {
            z = I.hitRegions.some(
              ($) => $.group === T
            );
            break;
          }
        }
        return {
          flexGrow: D.layout[E] ?? 1,
          pointerEvents: z ? "none" : void 0
        };
      }
      if (n != null && n[E])
        return {
          flexGrow: n == null ? void 0 : n[E]
        };
    }
  ), x = mn({
    defaultLayout: n,
    disableCursor: r
  }), L = G(
    () => ({
      get disableCursor() {
        return !!x.disableCursor;
      },
      getPanelStyles: A,
      id: b,
      orientation: u,
      registerPanel: (R) => {
        const E = v.current;
        return E.panels = Wt(u, [
          ...E.panels,
          R
        ]), p(), () => {
          E.panels = E.panels.filter(
            (I) => I !== R
          ), p();
        };
      },
      registerSeparator: (R) => {
        const E = v.current;
        return E.separators = Wt(u, [
          ...E.separators,
          R
        ]), p(), () => {
          E.separators = E.separators.filter(
            (I) => I !== R
          ), p();
        };
      },
      updatePanelProps: (R, { disabled: E }) => {
        const I = v.current.panels.find(
          (z) => z.id === R
        );
        I && (I.panelConstraints.disabled = E);
        const T = Vn(b), D = Me(b);
        T && D && Re(T, {
          ...D,
          derivedPanelConstraints: Ht(T)
        });
      },
      updateSeparatorProps: (R, {
        disabled: E,
        disableDoubleClick: I
      }) => {
        const T = v.current.separators.find(
          (D) => D.id === R
        );
        T && (T.disabled = E, T.disableDoubleClick = I);
      }
    }),
    [A, b, p, u, x]
  ), N = _(null);
  return ze(() => {
    const R = P.current;
    if (R === null)
      return;
    const E = v.current;
    let I;
    if (x.defaultLayout !== void 0 && Object.keys(x.defaultLayout).length === E.panels.length) {
      I = {};
      for (const B of E.panels) {
        const Y = x.defaultLayout[B.id];
        Y !== void 0 && (I[B.id] = Y);
      }
    }
    const T = {
      disabled: !!o,
      element: R,
      id: b,
      mutableState: {
        defaultLayout: I,
        disableCursor: !!x.disableCursor,
        expandedPanelSizes: v.current.lastExpandedPanelSizes,
        layouts: v.current.layouts
      },
      orientation: u,
      panels: E.panels,
      resizeTargetMinimumSize: E.resizeTargetMinimumSize,
      separators: E.separators
    };
    N.current = T;
    const D = ac(T), { defaultLayoutDeferred: z, derivedPanelConstraints: $, layout: W } = Me(T.id, !0);
    !z && $.length > 0 && (g(W), y(W, !1));
    const O = ln(b, (B) => {
      const { defaultLayoutDeferred: Y, derivedPanelConstraints: te, layout: re } = B.next;
      if (Y || te.length === 0)
        return;
      const ae = T.panels.map(({ id: ne }) => ne).join(",");
      T.mutableState.layouts[ae] = re, te.forEach((ne) => {
        if (ne.collapsible) {
          const { layout: be } = B.prev ?? {};
          if (be) {
            const xe = ce(
              ne.collapsedSize,
              re[ne.panelId]
            ), Ae = ce(
              ne.collapsedSize,
              be[ne.panelId]
            );
            xe && !Ae && (T.mutableState.expandedPanelSizes[ne.panelId] = be[ne.panelId]);
          }
        }
      });
      const oe = ke().state !== "active";
      g(re), oe && y(re, B.isUserInteraction);
    });
    return () => {
      N.current = null, D(), O();
    };
  }, [
    o,
    b,
    y,
    g,
    u,
    w,
    x
  ]), j(() => {
    const R = N.current;
    R && (R.mutableState.defaultLayout = n, R.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ S(Zr.Provider, { value: L, children: /* @__PURE__ */ S(
    "div",
    {
      ...m,
      className: t,
      "data-group": !0,
      "data-testid": b,
      id: b,
      ref: M,
      style: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
        ...f,
        display: "flex",
        flexDirection: u === "horizontal" ? "row" : "column",
        flexWrap: "nowrap",
        // Inform the browser that the library is handling touch events for this element
        // but still allow users to scroll content within panels in the non-resizing direction
        // NOTE This is not an inherited style
        // See github.com/bvaughn/react-resizable-panels/issues/662
        touchAction: u === "horizontal" ? "pan-y" : "pan-x"
      },
      children: e
    }
  ) });
}
Yr.displayName = "Group";
function hn() {
  const e = Yt(Zr);
  return K(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function cc(e, t) {
  const { id: n } = hn(), r = _({
    collapse: Ct,
    expand: Ct,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Ct
  });
  Kt(t, () => r.current, []), ze(() => {
    Object.assign(
      r.current,
      qr({ groupId: n, panelId: e })
    );
  });
}
function Jt({
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
  minSize: u = "0%",
  onResize: d,
  panelRef: f,
  style: m,
  ...h
}) {
  const g = !!i, y = dn(i), b = mn({
    disabled: a
  }), P = _(null), w = fn(P, s), {
    getPanelStyles: p,
    id: v,
    orientation: M,
    registerPanel: A,
    updatePanelProps: x
  } = hn(), L = d !== null, N = Qe(
    (T, D, z) => {
      d == null || d(T, i, z);
    }
  );
  ze(() => {
    const T = P.current;
    if (T !== null) {
      const D = {
        element: T,
        id: y,
        idIsStable: g,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: L ? N : void 0,
        panelConstraints: {
          groupResizeBehavior: l,
          collapsedSize: n,
          collapsible: r,
          defaultSize: o,
          disabled: b.disabled,
          maxSize: c,
          minSize: u
        }
      };
      return A(D);
    }
  }, [
    l,
    n,
    r,
    o,
    L,
    y,
    g,
    c,
    u,
    N,
    A,
    b
  ]), j(() => {
    x(y, { disabled: a });
  }, [a, y, x]), cc(y, f);
  const R = () => {
    const T = p(v, y);
    if (T)
      return JSON.stringify(T);
  }, E = so(
    (T) => ln(v, T),
    R,
    R
  );
  let I;
  return E ? I = JSON.parse(E) : o !== void 0 ? I = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: o
  } : I = { flexGrow: 1 }, /* @__PURE__ */ S(
    "div",
    {
      ...h,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": y,
      id: y,
      ref: w,
      style: {
        ...lc,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...I
      },
      children: /* @__PURE__ */ S(
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
            touchAction: M === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
Jt.displayName = "Panel";
const lc = {
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
function uc({
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
    const i = l.maxSize, c = l.collapsible ? l.collapsedSize : l.minSize, u = [r, r + 1];
    a = Ce({
      layout: rt({
        delta: c - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: u,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], o = Ce({
      layout: rt({
        delta: i - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: u,
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
function Xr({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: o,
  id: a,
  style: s,
  ...l
}) {
  const i = dn(a), c = mn({
    disabled: n,
    disableDoubleClick: r
  }), [u, d] = C({}), [f, m] = C("inactive"), [h, g] = C(!1), y = _(null), b = fn(y, o), {
    disableCursor: P,
    id: w,
    orientation: p,
    registerSeparator: v,
    updateSeparatorProps: M
  } = hn(), A = p === "horizontal" ? "vertical" : "horizontal";
  ze(() => {
    const N = y.current;
    if (N !== null) {
      const R = {
        disabled: c.disabled,
        disableDoubleClick: c.disableDoubleClick,
        element: N,
        id: i
      }, E = v(R), I = Ui(
        (D) => {
          m(
            D.next.state !== "inactive" && D.next.hitRegions.some(
              (z) => z.separator === R
            ) ? D.next.state : "inactive"
          );
        }
      ), T = ln(
        w,
        (D) => {
          const { derivedPanelConstraints: z, layout: $, separatorToPanels: W } = D.next, O = W.get(R);
          if (O) {
            const B = O[0], Y = O.indexOf(B);
            d(
              uc({
                layout: $,
                panelConstraints: z,
                panelId: B.id,
                panelIndex: Y
              })
            );
          }
        }
      );
      return () => {
        I(), T(), E();
      };
    }
  }, [w, i, v, c]), j(() => {
    M(i, { disabled: n, disableDoubleClick: r });
  }, [n, r, i, M]);
  let x;
  n && !P && (x = "not-allowed");
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
        h ? L = "focus" : L = f;
    }
  return /* @__PURE__ */ S(
    "div",
    {
      ...l,
      "aria-controls": u.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": A,
      "aria-valuemax": u.valueMax,
      "aria-valuemin": u.valueMin,
      "aria-valuenow": u.valueNow,
      children: e,
      className: t,
      "data-separator": L,
      "data-testid": i,
      id: i,
      onBlur: () => g(!1),
      onFocus: () => g(!0),
      ref: b,
      role: "separator",
      style: {
        flexBasis: "auto",
        cursor: x,
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
Xr.displayName = "Separator";
const pn = 30, gn = 65, ot = 50, dc = 100 - gn, fc = 100 - pn;
function mc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(gn, Math.max(pn, t)) : ot;
}
function bn(e) {
  return 100 - e;
}
function $e(e) {
  return `${e}%`;
}
const yn = "reader-document", at = "reader-assistant", Qr = "retainpdf.reader.ai-split-layout.v1", hc = {
  [yn]: bn(ot),
  [at]: ot
};
function vn(e) {
  const t = mc(e == null ? void 0 : e[at]);
  return {
    [yn]: bn(t),
    [at]: t
  };
}
function pc() {
  try {
    const e = JSON.parse(localStorage.getItem(Qr) || "null");
    return vn(e);
  } catch {
    return hc;
  }
}
function gc(e) {
  try {
    localStorage.setItem(Qr, JSON.stringify(vn(e)));
  } catch {
  }
}
function Dt(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = vn(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[at]}vw`
  );
}
function bc() {
  const e = _(null), [t] = C(pc);
  De(() => {
    const o = e.current;
    return Dt(o, t), () => {
      var a;
      (a = o == null ? void 0 : o.closest(".reader-react-root")) == null || a.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = F((o) => {
    Dt(e.current, o);
  }, []), r = F((o, a) => {
    Dt(e.current, o), a.isUserInteraction && gc(o);
  }, []);
  return /* @__PURE__ */ U(
    Yr,
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
        /* @__PURE__ */ S(
          Jt,
          {
            id: yn,
            defaultSize: $e(bn(ot)),
            minSize: $e(dc),
            maxSize: $e(fc)
          }
        ),
        /* @__PURE__ */ S(
          Xr,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ S("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ S(
          Jt,
          {
            id: at,
            defaultSize: $e(ot),
            minSize: $e(pn),
            maxSize: $e(gn)
          }
        )
      ]
    }
  );
}
function yc({
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
      var d;
      if (c.key !== "Escape") return;
      const u = c.target;
      (d = u == null ? void 0 : u.closest) != null && d.call(u, "textarea, input, select, [contenteditable='true']") || (c.preventDefault(), a());
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [t, a]), !t && !o ? null : /* @__PURE__ */ U(
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
        s ? /* @__PURE__ */ S("div", { className: "reader-notes-panel-toolbar", children: s }) : null,
        /* @__PURE__ */ S("div", { className: "reader-notes-panel-body", children: l })
      ]
    }
  );
}
function vc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = C(!1);
  if (j(() => {
    !e && !t && r(!1);
  }, [e, t]), n || !e && !t)
    return null;
  const o = [
    e ? "译文区域" : "",
    t ? "阅读元数据" : ""
  ].filter(Boolean);
  return /* @__PURE__ */ U("div", { className: "reader-error-notice", role: "status", "data-reader-error-notice": "true", children: [
    /* @__PURE__ */ U("span", { className: "reader-error-notice-text", children: [
      o.join("、"),
      "加载失败，正文仍可正常阅读。"
    ] }),
    /* @__PURE__ */ S(
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
function Sc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ S(vc, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ U(qt, { children: [
    e ? /* @__PURE__ */ S("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ U("div", { className: "reader-boot-loading-card", children: [
      /* @__PURE__ */ S("div", { className: "reader-boot-loading-text", children: n }),
      /* @__PURE__ */ S("div", { className: "reader-boot-loading-track", children: /* @__PURE__ */ S(
        "span",
        {
          className: "reader-boot-loading-bar",
          style: { width: `${Math.max(0, Math.min(100, r))}%` }
        }
      ) })
    ] }) }) : null,
    t ? /* @__PURE__ */ S("div", { className: "reader-react-error", role: "alert", children: n }) : null
  ] });
}
function wc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Pc() {
  const [e, t] = C(!1), n = sr(), r = _(null);
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
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || wc(a.target)) return;
      const s = a.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !a.shiftKey)
          return;
        a.preventDefault(), t((l) => !l);
      }
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, []), /* @__PURE__ */ U("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
    /* @__PURE__ */ S(
      "button",
      {
        type: "button",
        className: `reader-react-hud-btn reader-react-shortcuts-btn${e ? " is-active" : ""}`,
        "aria-label": "快捷键说明",
        "aria-expanded": e,
        "aria-controls": n,
        title: "快捷键（H 或 ?）",
        onClick: () => t((o) => !o),
        children: /* @__PURE__ */ S(ko, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    ),
    e ? /* @__PURE__ */ U(
      "div",
      {
        id: n,
        className: "reader-react-shortcuts-panel reader-floating-surface",
        role: "dialog",
        "aria-label": "阅读器快捷键",
        children: [
          /* @__PURE__ */ U("div", { className: "reader-react-shortcuts-head", children: [
            /* @__PURE__ */ S("strong", { children: "快捷键" }),
            /* @__PURE__ */ S(
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
          /* @__PURE__ */ S("div", { className: "reader-react-shortcuts-body", children: Ds.map((o) => /* @__PURE__ */ U("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ S("h3", { children: o.title }),
            /* @__PURE__ */ S("ul", { children: o.items.map((a) => /* @__PURE__ */ U("li", { children: [
              /* @__PURE__ */ S("kbd", { children: a.keys }),
              /* @__PURE__ */ S("span", { children: a.desc })
            ] }, `${o.title}-${a.keys}`)) })
          ] }, o.title)) }),
          /* @__PURE__ */ S("p", { className: "reader-react-shortcuts-foot", children: "在输入框内不会触发快捷键" })
        ]
      }
    ) : null
  ] });
}
const Rc = ["source", "sideBySide", "translated"], Ic = { source: "", translated: "", sideBySide: "" };
function Tc(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = gt(e.sourceUrl), n = gt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return Go({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function Ec(e) {
  const [t, n] = C(() => /* @__PURE__ */ new Set()), r = G(
    () => e ? Tc(e) : Ic,
    [e]
  ), o = G(
    () => Rc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = F(async (s) => {
    if (!e) return;
    const l = gt(r[s]);
    if (!(!l || t.has(s)))
      try {
        const i = e.jobId ? qo(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await Ko(
          e.fetchProtected,
          l,
          i,
          i,
          null,
          (c) => n((u) => {
            const d = new Set(u);
            return c ? d.add(s) : d.delete(s), d;
          })
        );
      } catch (i) {
        const c = i instanceof Error ? i.message : "下载失败";
        Zo(c), n((u) => {
          const d = new Set(u);
          return d.delete(s), d;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const Mc = {
  source: lr,
  sideBySide: ur,
  translated: dr
}, Ac = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function _c(e) {
  const t = it(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = Ec(n), l = _(null);
  return j(() => {
    const i = () => {
      var d;
      (d = l.current) != null && d.open && (l.current.open = !1);
    }, c = (d) => {
      l.current && !l.current.contains(d.target) && i();
    }, u = (d) => {
      d.key === "Escape" && i();
    };
    return document.addEventListener("pointerdown", c), document.addEventListener("keydown", u), () => {
      document.removeEventListener("pointerdown", c), document.removeEventListener("keydown", u);
    };
  }, []), /* @__PURE__ */ U("details", { ref: l, className: "reader-download-actions", children: [
    /* @__PURE__ */ U("summary", { className: "reader-download-trigger", "aria-label": "下载 PDF", title: "下载 PDF", children: [
      /* @__PURE__ */ S(Lo, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
      /* @__PURE__ */ S("span", { className: "reader-download-trigger-label", children: "下载" }),
      /* @__PURE__ */ S(Co, { size: 13, strokeWidth: 2.2, "aria-hidden": !0, className: "reader-download-trigger-caret" })
    ] }),
    /* @__PURE__ */ S("div", { className: "reader-download-menu", role: "group", "aria-label": "下载 PDF", children: o.map((i) => {
      const c = mo[i], u = gt(r[i]), d = a.has(i), f = !!u && !d, m = f ? "" : ho(i, r), h = Mc[i];
      return /* @__PURE__ */ U(
        "button",
        {
          type: "button",
          id: `reader-download-${i}`,
          className: `reader-download-action${d ? " is-busy" : ""}`,
          disabled: !f,
          "aria-label": f ? `下载${c.label}` : m,
          onClick: () => {
            l.current && (l.current.open = !1), s(i);
          },
          children: [
            /* @__PURE__ */ S(h, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
            /* @__PURE__ */ U("span", { className: "reader-download-action-text", children: [
              /* @__PURE__ */ U("span", { className: "reader-download-action-label", children: [
                Ac[i],
                " PDF"
              ] }),
              m ? /* @__PURE__ */ S("span", { className: "reader-download-action-reason", children: m }) : null
            ] })
          ]
        },
        i
      );
    }) })
  ] });
}
function kc(e) {
  const t = it(), n = bi(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? st, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), l = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, c = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), u = Na(a), d = a > pr + 1e-3, f = a < gr - 1e-3, m = Xe(), h = "50%（半屏，对照铺满）", [g, y] = C(!1), [b, P] = C(`${l}`);
  j(() => {
    g || P(`${Math.min(Math.max(l, 1), Math.max(i, 1))}`);
  }, [l, i, g]);
  const w = () => {
    if (y(!1), !c || i <= 0)
      return;
    const p = Number(`${b}`.trim());
    c(St(p, i));
  };
  return /* @__PURE__ */ U("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    o ? /* @__PURE__ */ S("div", { className: "reader-react-hud-group reader-react-hud-modes", children: o }) : null,
    /* @__PURE__ */ S("div", { className: "reader-react-hud-group", "aria-label": "页码", children: g ? /* @__PURE__ */ U(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (p) => {
          p.preventDefault(), w();
        },
        children: [
          /* @__PURE__ */ S(
            "input",
            {
              className: "reader-react-hud-page-input",
              type: "text",
              inputMode: "numeric",
              pattern: "[0-9]*",
              "aria-label": "跳转到页码",
              value: b,
              autoFocus: !0,
              onChange: (p) => P(p.target.value.replace(/[^\d]/g, "")),
              onBlur: w,
              onKeyDown: (p) => {
                p.key === "Escape" && (p.preventDefault(), y(!1), P(`${l}`));
              }
            }
          ),
          /* @__PURE__ */ U("span", { className: "reader-react-hud-page-suffix", children: [
            "/ ",
            i || "—"
          ] })
        ]
      }
    ) : /* @__PURE__ */ S(
      "button",
      {
        type: "button",
        className: "reader-react-hud-page reader-react-hud-page-btn",
        "aria-label": i > 0 ? `跳转页码，当前第 ${l} 页，共 ${i} 页` : "页码",
        title: i > 0 ? "点击输入页码跳转" : void 0,
        disabled: !c || i <= 0,
        onClick: () => {
          !c || i <= 0 || (P(`${l}`), y(!0));
        },
        children: i > 0 ? `${Math.min(l, i)} / ${i}` : "—"
      }
    ) }),
    /* @__PURE__ */ U("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ S(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "缩小",
          disabled: !d,
          onClick: () => s(nt(a, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ U(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn reader-react-hud-zoom-label",
          "aria-label": `重置为${h}`,
          title: h,
          onClick: () => s(m),
          children: [
            u,
            "%"
          ]
        }
      ),
      /* @__PURE__ */ S(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "放大",
          disabled: !f,
          onClick: () => s(nt(a, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ S(Pc, {}) })
  ] });
}
function ar(e) {
  var t, n;
  return vr(e == null ? void 0 : e.assistantPanel) ? e.assistantPanel : ((t = e == null ? void 0 : e.splitLayout) == null ? void 0 : t.left) === "markdown" || ((n = e == null ? void 0 : e.splitLayout) == null ? void 0 : n.right) === "markdown" ? "markdown" : null;
}
function Lc(e) {
  const [t, n] = C(() => ({
    scope: e,
    panel: ar(Pe(e))
  }));
  j(() => {
    n((o) => o.scope === e ? o : {
      scope: e,
      panel: ar(Pe(e))
    });
  }, [e]), j(() => {
    t.scope === e && Pt(t.scope, {
      assistantPanel: t.panel,
      // 旧的自由两栏布局已经没有写入者了，恢复时只当迁移来源读一次。
      splitLayout: null
    });
  }, [t, e]);
  const r = F((o) => {
    n((a) => ({
      scope: a.scope,
      panel: typeof o == "function" ? o(a.panel) : o
    }));
  }, []);
  return { panel: t.panel, scope: t.scope, setPanel: r };
}
const Vt = "download-toast";
function Cc({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: o = "progress"
}) {
  const a = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ U("div", { className: "download-toast-card reader-floating-surface", "data-tone": o, "aria-live": "polite", children: [
    /* @__PURE__ */ U("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ S("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ S("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ S("div", { className: "download-toast-track", children: /* @__PURE__ */ S("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${a}%` } }) }),
    /* @__PURE__ */ S("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function Dc(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: o = "等待响应...",
    percent: a = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    Nt.dismiss(Vt);
    return;
  }
  Nt.custom(
    () => /* @__PURE__ */ S(Cc, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: Vt, duration: 1 / 0 }
  );
}
function Nc() {
  const e = F((t) => {
    t && (t.setState = Dc, t.hide = () => Nt.dismiss(Vt));
  }, []);
  return /* @__PURE__ */ U(qt, { children: [
    /* @__PURE__ */ S(To, { position: "bottom-right" }),
    /* @__PURE__ */ S("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function eo(e) {
  const t = _(!1);
  return e && (t.current = !0), t.current;
}
function zc(e, t) {
  const n = e === t;
  return { open: n, mounted: eo(n) };
}
function xc({
  panel: e,
  active: t,
  context: n
}) {
  var i;
  const r = t === e.id, o = eo(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = ue(), l = (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, { ...n, open: r });
  return l == null ? null : /* @__PURE__ */ S(
    yc,
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
const Oc = co(() => import("./ReaderMarkdownPanel-Dtzb4IYy.js").then((e) => ({ default: e.ReaderMarkdownPanel })));
function Fc(e) {
  const t = e.sourceOnly || !e.translatedUrl, n = !!(e.overlayContentAvailable && e.liveTranslationVisible && !e.assistantOpen), o = e.assistantPdfPane || (e.assistantOpen && e.mode === "compare" ? "source" : e.mode), a = !t && (o === "translated" || o === "compare"), s = o === "compare" && a, l = n || o !== "translated" || !a, i = e.mode === "compare" && o !== "compare";
  return {
    kind: n ? "live-overlay" : o === "compare" ? "final-compare" : o === "translated" ? "translated-only" : "source-only",
    visibleMode: o,
    compareMode: s,
    showSource: l,
    showTranslated: a,
    overlayOnSource: n,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: t,
    compareDegradedByAssistant: i
  };
}
function $c(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function jc() {
  const e = Ls(), { boot: t, panes: n, sessionFiles: r, session: o } = e, a = Lc(e.viewStateKey), s = a.panel, l = a.setPanel, [i, c] = C(null), [u, d] = C(null), [f, m] = C(!1), h = _(null), g = s !== null, y = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, b = Fc({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: y,
    liveTranslationVisible: f,
    assistantOpen: g,
    assistantPdfPane: i
  }), P = F(() => d(null), []), w = u ? lo({ jobId: o.jobId, name: u, onClose: P }) : null, p = Rs({
    hasOverlayContent: y,
    connection: e.liveTranslation.connection,
    showSource: b.showSource,
    liveTranslationVisible: f,
    assistantOpen: g
  }), v = b.sourceViewOnly, M = b.visibleMode;
  j(() => {
    d(null), m(!1);
  }, [e.viewStateKey]), j(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), j(() => {
    c(null);
  }, [a.scope]), j(() => {
    if (!(t.loading || t.failed)) {
      if (h.current !== e.viewStateKey) {
        h.current = e.viewStateKey;
        const $ = Pe(e.viewStateKey), W = v ? "source" : $ == null ? void 0 : $.mode;
        W && W !== e.mode && e.setModeKeepingPage(W);
        return;
      }
      Pt(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, v]);
  const A = s || (e.mode === "compare" ? "compare" : "reading"), x = zc(s, "markdown");
  xs({
    mode: M,
    sourceOnly: e.sourceOnly,
    setMode: e.setModeKeepingPage,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    currentPage: e.currentPage,
    numPages: n.hudNumPages,
    goToPage: e.goToPage,
    enabled: e.showHud
  });
  const L = F(() => {
    l(null), c(null);
  }, []), N = F(($) => {
    c(null);
    const W = $c($, e.liveTranslationAvailable);
    W !== null && m(W), e.setModeKeepingPage($);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), R = G(() => p.sourcePaneToggle ? /* @__PURE__ */ S(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m(($) => !$),
      "aria-pressed": f,
      title: f ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ) : null, [p.sourcePaneToggle, f]), E = F(($) => {
    l($), c(null);
  }, []), I = G(() => ({
    // **只认 jobId**，不拿 documentId 兜底（契约见 adapters.ts：「用 jobId，换文档
    // 就换终端」）。原来是 `session.jobId || session.documentId || "reader"`，于是
    // 没有任务的阅读页（书架卡片在没有 job_id 时跳 `reader.html?document_id=…`）会
    // 拿一个 document id 当 job id 用，四处同时静默失败：
    //
    //   - fx 侧 resolve_job_workspace 找不到 data/jobs/<documentId> → 退回私有目录，
    //     终端开起来了但 books/ 是空的，无报错
    //   - 产物条每 4 秒打 /api/v1/jobs/<documentId>/board → 404 → 静默跳过
    //   - 左边那块 renderReaderBoard 看 !jobId → 静默返回 null
    //
    // 空字符串在这里是有意义的信号：renderReaderTerminal 会改画一段说明，
    // 而不是一个开得起来却什么都做不了的空壳。
    sessionKey: o.jobId,
    // 以前「点块 → 浮条 → 问 AI」会把选区预填进终端；浮条整个删了（只留悬停复制），
    // 阅读器这边没有要预填的了。宿主的注入能力保留，接口不动。
    pendingInput: null,
    onOpenBoard: d,
    onClose: L
  }), [L, o.documentId, o.jobId]), T = G(() => ({
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
    sourceOnly: e.sourceOnly,
    sourceViewOnly: v,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: E, close: L }
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
    e.sourceOnly,
    v,
    e.download,
    e.goToPage,
    E,
    L
  ]), D = G(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), z = [
    Ea,
    `is-workspace-${A}`,
    g ? "is-assistant-open" : "",
    b.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ S(gi, { value: T, hud: D, children: /* @__PURE__ */ U("div", { className: z, "data-reader-engine": "react-pdf", "data-reader-workspace": A, children: [
    /* @__PURE__ */ S(Sc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ U("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ S(_c, {}),
      /* @__PURE__ */ S(Bs, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ S(
      Ti,
      {
        mode: M,
        documentReady: !!o.jobId,
        sourceViewOnly: v,
        onModeChange: N,
        liveTranslation: p.topBarPill ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m(($) => !$)
        } : null,
        compareDegraded: b.compareDegradedByAssistant,
        onRestoreCompare: L
      }
    ),
    /* @__PURE__ */ S(Li, { active: s }),
    g ? /* @__PURE__ */ S(bc, {}) : null,
    /* @__PURE__ */ S(wi, { paneComposition: b, markdownSplit: x.open, assistantSplit: g, liveTranslation: e.liveTranslation, sourcePaneAction: R }),
    w,
    e.showHud ? /* @__PURE__ */ S(
      kc,
      {
        mode: M,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ U(io, { fallback: null, children: [
      zr.map(($) => /* @__PURE__ */ S(
        xc,
        {
          panel: $,
          active: s,
          context: I
        },
        $.id
      )),
      x.mounted ? /* @__PURE__ */ S(Oc, { open: x.open, jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: L }) : null
    ] }),
    /* @__PURE__ */ S(Nc, {})
  ] }) });
}
function rl() {
  return /* @__PURE__ */ S(jc, {});
}
export {
  rl as R,
  jc as a,
  yc as b,
  tl as d,
  el as f,
  nl as r
};
//# sourceMappingURL=ReaderApp-C-2271Tx.js.map
