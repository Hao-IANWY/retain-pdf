var Pn = (e) => {
  throw TypeError(e);
};
var Rn = (e, t, n) => t.has(e) || Pn("Cannot " + n);
var Ge = (e, t, n) => (Rn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Tn = (e, t, n) => t.has(e) ? Pn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), In = (e, t, n, r) => (Rn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as j, jsx as S, Fragment as Zt } from "react/jsx-runtime";
import { useMemo as q, useState as x, useEffect as $, useCallback as O, useRef as A, useLayoutEffect as _e, memo as Yt, forwardRef as so, useImperativeHandle as Xt, createContext as Qt, useContext as en, useSyncExternalStore as io, useId as ur, Suspense as co, lazy as lo } from "react";
import { requireAdapter as qe, getReaderAdapters as fe } from "./adapters.js";
import { resolveReaderDownloadName as uo, resolveReaderDownloadUrls as fo, READER_PROGRESS_COPY as Se, trimString as bt, READER_DOWNLOAD_ACTIONS as mo, disabledReason as ho } from "./runtime/state.js";
import "@retainpdf/api/conversations";
import { r as po, b as go } from "./page-config-Ct7qR5rm.js";
import { c as bo, n as yo, f as Mt, j as Dt, a as vo, b as So, i as dr, p as wt, g as fr, r as mr, k as En, e as wo, h as Po } from "./reader-regions-DJ7L9Ej-.js";
import { isReaderTransportError as Ro, createReaderTransportError as To } from "./contracts.js";
import { toast as Ft, Toaster as Io } from "sonner";
import { X as tn, Radio as Eo, FileText as hr, Columns2 as pr, Languages as gr, PanelRightClose as Mo, FileCode2 as Ao, Sparkles as br, Sigma as ko, Table2 as Lo, Type as Co, Image as No, Check as _o, Copy as xo, Keyboard as zo, Download as Do } from "lucide-react";
import { pdfjs as Fo, Page as Oo, Document as $o } from "react-pdf";
import { e as jo, m as Uo, a as Bo } from "./markdown-math-XkF5urpn.js";
const Ho = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, Wo = "", Jo = Object.freeze({
  progress: "retainpdf-reader-progress"
}), Vo = (e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, ol = (...e) => {
  var n;
  return (((n = fe()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Ie = () => qe("defaultReaderDataPort"), Mn = () => qe("defaultReaderPageConfigPort"), al = {
  get apiPrefix() {
    return Ie().apiPrefix;
  },
  fetchProtected: (...e) => Ie().fetchProtected(...e),
  loadMarkdownPayload: (e) => Ie().loadMarkdownPayload(e),
  loadMarkdownSource: (e) => Ie().loadMarkdownSource(e),
  loadMarkdownRange: (e, t, n, r, o) => Ie().loadMarkdownRange(e, t, n, r, o),
  loadJobPayload: (e) => Ie().loadJobPayload(e),
  loadReaderPayload: (e, t) => Ie().loadReaderPayload(e, t),
  get liveTranslation() {
    return Ie().liveTranslation;
  }
}, yr = {
  messageTargetOrigin: () => Mn().messageTargetOrigin(),
  readerJobId: () => Mn().readerJobId()
}, qo = () => {
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
}, nn = () => {
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
}, Go = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, Ko = () => {
  var e, t;
  return ((t = (e = fe()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, Zo = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, Yo = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? uo(...e);
}, Xo = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? fo(...e);
}, Qo = (...e) => qe("downloadProtectedResource")(...e), ea = (...e) => qe("failDownloadToast")(...e), sl = (e, t) => qe("resolveMarkdownAssetUrl")(e, t), ta = "/api/v1";
function na() {
  const e = () => {
    var r;
    return po(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = x(e);
  return $(() => {
    var c, i, l, u;
    const r = () => n(e()), o = (i = (c = globalThis.history) == null ? void 0 : c.pushState) == null ? void 0 : i.bind(globalThis.history), a = (u = (l = globalThis.history) == null ? void 0 : l.replaceState) == null ? void 0 : u.bind(globalThis.history);
    let s = !1;
    if (o && a)
      try {
        const d = (f) => function(...m) {
          const y = f.apply(this, m);
          return r(), globalThis.dispatchEvent(new Event("pushstate")), globalThis.dispatchEvent(new Event("replacestate")), globalThis.dispatchEvent(new Event("locationchange")), y;
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
function ra() {
  const e = na(), t = q(() => Zo(yr), [e]), n = q(() => Ko(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function oa(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: o,
    documentIdRef: a,
    sessionJobIdRef: s,
    switchToSourceMode: c
  } = e, [i, l] = x({
    documentId: "",
    jobId: ""
  }), [u, d] = x({
    documentId: "",
    jobId: ""
  }), f = i.documentId === t ? i.jobId : "", m = u.documentId === t ? u.jobId : "", y = n || f, [h, b] = x({
    jobId: "",
    documentId: ""
  }), g = h.jobId === y ? h.documentId : "", P = t || g, v = !!t && !y, [p, w] = x(null), M = (p == null ? void 0 : p.sessionIdentity) === r && p.documentId === P ? p : null, E = v || !!M, D = O((k) => {
    const T = `${k.documentId || ""}`.trim();
    if (!T || a.current && a.current !== T) return;
    if (!a.current && s.current)
      b({
        jobId: s.current,
        documentId: T
      });
    else if (!a.current)
      return;
    const R = `${k.revision || ""}`.trim() || `${Date.now()}`;
    w({
      documentId: T,
      revision: R,
      sessionIdentity: o.current
    }), c();
  }, []);
  $(() => {
    w((k) => k && k.sessionIdentity !== r ? null : k);
  }, [r]);
  const N = O((k) => {
    switch (k.type) {
      case "resolved-document-job":
        l({ documentId: k.documentId, jobId: k.jobId });
        break;
      case "cleared-resolved-document-job":
        l({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        d({ documentId: k.documentId, jobId: k.jobId });
        break;
      case "resolved-job-document":
        b((T) => T.jobId === k.jobId && T.documentId === k.documentId ? T : { jobId: k.jobId, documentId: k.documentId });
        break;
      case "committed-source":
        w({
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
    missingDocumentJob: u,
    setMissingDocumentJob: d,
    documentJobId: f,
    rejectedDocumentJobId: m,
    sessionJobId: y,
    resolvedJobDocument: h,
    setResolvedJobDocument: b,
    jobDocumentId: g,
    documentId: P,
    sourceOnly: v,
    committedDocumentSource: p,
    setCommittedDocumentSource: w,
    activeCommittedDocumentSource: M,
    sourceViewOnly: E,
    refreshCommittedDocument: D,
    applyIdentityEvent: N
  };
}
const aa = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function An(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function sa(e) {
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
function kn(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return Vo(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function ia(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function ca(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !ia(a, t))
      return a.replace(/\.pdf$/i, "");
  }
  return "";
}
function Ot({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: Jo.progress,
        stage: n,
        percent: e,
        text: t
      },
      yr.messageTargetOrigin()
    );
  } catch {
  }
}
function yt(e, t, n, r = "progress") {
  e({
    loading: !0,
    percent: t,
    text: n,
    stage: r,
    failed: !1
  }), Ot({ percent: t, text: n, stage: r });
}
function la(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [c, i] = x(null), [l, u] = x(null), [d, f] = x(""), [m, y] = x(0), h = d === n ? c : null, b = d === n ? l : null, g = An(h), P = aa.has(g), v = O(() => {
    y((N) => N + 1);
  }, []), p = O((N) => {
    i(N.jobPayload), u(N.manifestPayload), f(N.sessionIdentity);
  }, []), w = O((N) => {
    i(null), u(null), f(N);
  }, []), M = A(""), E = A(""), D = O(async () => {
    const N = o.current;
    if (!N || M.current === N) return;
    const k = nn().loadJobPayload;
    if (typeof k != "function") return;
    const T = a.current.value;
    M.current = N;
    try {
      const R = await k(N);
      if (s.current || a.current.value !== T || o.current !== N || !R || typeof R != "object")
        return;
      const I = An(R);
      i(R), f(r.current), I === "succeeded" && E.current !== N && (E.current = N, y((_) => _ + 1));
    } catch {
    } finally {
      M.current === N && (M.current = "");
    }
  }, []);
  return $(() => {
    E.current = "";
  }, [n]), $(() => {
    if (!t || P || !h) return;
    const N = window.setInterval(() => {
      D();
    }, 1e3);
    return () => window.clearInterval(N);
  }, [P, D, h, t]), {
    jobPayload: c,
    setJobPayload: i,
    manifestPayload: l,
    setManifestPayload: u,
    payloadSessionIdentity: d,
    setPayloadSessionIdentity: f,
    scopedJobPayload: h,
    scopedManifestPayload: b,
    jobStatus: g,
    jobTerminal: P,
    jobRefreshRevision: m,
    refreshJobArtifacts: v,
    refreshJobStatus: D,
    publishPayload: p,
    clearPayload: w
  };
}
function $t(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function ua(e, t) {
  e(t), $t(t);
}
function da(e) {
  const [t, n] = x(e ? "source" : "compare"), r = O((a) => {
    e && a !== "source" || (n(a), $t(a));
  }, [e]), o = O((a) => {
    ua(n, a);
  }, []);
  return $(() => (e && document.documentElement.classList.add("reader-source-only"), $t(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: o };
}
function Ln(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function fa(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: Ln(n.active_job_id),
    activeVersionId: Ln(n.active_version_id)
  };
}
function ma(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function ha(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function pa(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function ga(e) {
  return e ? { data: e.data.slice() } : null;
}
const ba = 2, pe = /* @__PURE__ */ new Map();
function jt(e, t) {
  pe.delete(e), pe.set(e, t);
}
function ya(e) {
  if (pe.size < ba) return;
  const t = pe.keys().next().value;
  t && pe.delete(t);
}
function At(e) {
  const t = `${e || ""}`.trim();
  if (!t || !pe.has(t)) return null;
  const n = pe.get(t);
  return jt(t, n), n;
}
async function vr(e, t = tt().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (pe.has(r)) {
    const c = pe.get(r);
    return jt(r, c), c;
  }
  const o = await t(r, { signal: n.signal });
  if (!o.ok) {
    const c = new Error(`读取 PDF 失败 (${o.status})`);
    throw c.status = o.status, c;
  }
  const a = await o.arrayBuffer(), s = { data: new Uint8Array(a) };
  return pe.has(r) ? jt(r, s) : (ya(), pe.set(r, s)), s;
}
function va(e = "", t = null) {
  const [n, r] = x(
    () => t || At(e)
  ), [o, a] = x(
    () => !!`${e || ""}`.trim() && !t && !At(e)
  ), [s, c] = x("");
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
    const l = At(i);
    if (l) {
      r(l), a(!1), c("");
      return;
    }
    let u = !1;
    return a(!0), c(""), r(null), vr(i).then((d) => {
      u || (r(d), a(!1));
    }).catch((d) => {
      u || (r(null), a(!1), c((d == null ? void 0 : d.message) || String(d)));
    }), () => {
      u = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function Sa(e) {
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
async function Ut(e) {
  const { url: t, label: n, percentStart: r, percentEnd: o, fence: a, setBoot: s } = e;
  if (!t || a.isInactive())
    return null;
  yt(s, r, n, "download");
  const c = await vr(t, tt().fetchProtected, {
    signal: a.signal
  });
  return a.isInactive() ? null : (yt(s, o, n, "download"), c);
}
async function wa(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: o } = e;
  yt(o, 25, "正在下载 PDF…", "download");
  const a = [];
  let s = null, c = null;
  return t && a.push(
    Ut({
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
    Ut({
      url: n,
      label: "正在下载译文 PDF…",
      percentStart: 55,
      percentEnd: 85,
      fence: r,
      setBoot: o
    }).then((u) => {
      c = u;
    })
  ), await Promise.all(a), r.isInactive() ? { status: "inactive" } : !!t && !s || !!n && !c ? { status: "incomplete" } : { status: "downloaded", sourceBytes: s, translatedBytes: c };
}
const ft = {
  regions: null,
  metadata: null
};
function Pa(e) {
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
    applyIdentityEvent: u,
    publishPayload: d,
    clearPayload: f,
    switchSessionMode: m,
    jobRefreshRevision: y,
    sessionEpochRef: h,
    closingRef: b,
    activeLoadAbortRef: g
  } = e, [P, v] = x(""), [p, w] = x(""), [M, E] = x(null), [D, N] = x(null), [k, T] = x(!1), [R, I] = x(""), [_, L] = x([]), [C, U] = x(() => ({
    source: null,
    translated: null
  })), [G, K] = x(
    ft
  ), [re, F] = x({
    loading: !0,
    percent: 4,
    text: Se.boot,
    stage: "progress",
    failed: !1
  });
  return $(() => {
    const ee = new AbortController(), le = h.current.value, te = Sa({
      sessionEpochRef: h,
      closingRef: b,
      abort: ee,
      sessionEpoch: le
    });
    g.current = ee;
    const Z = nn();
    if (b.current)
      return ee.abort(), () => {
        g.current === ee && (g.current = null);
      };
    function ne(Y, W) {
      te.markFailed(), F({
        loading: !1,
        percent: 100,
        text: Y,
        stage: "failed",
        failed: !0
      }), Ot({ percent: 100, text: W, stage: "failed" });
    }
    function ue() {
      T(!0), F({
        loading: !1,
        percent: 100,
        text: Se.ready,
        stage: "ready",
        failed: !1
      }), Ot({ percent: 100, text: Se.ready, stage: "ready" });
    }
    function de() {
      return l != null && l.documentId ? kn(
        l.documentId,
        l.revision
      ) : Ho() ? Wo : Z.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function De() {
      let Y = { activeJobId: "", activeVersionId: "" };
      try {
        const me = await Z.fetchProtected(
          Z.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (me != null && me.ok) {
          const Ae = await me.json().catch(() => null);
          Y = fa(Ae);
        }
      } catch {
      }
      const W = ma({
        link: Y,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!l
      });
      if (W.kind === "follow-active-job") {
        if (te.isInactive()) return;
        u({
          type: "resolved-document-job",
          documentId: r,
          jobId: W.jobId
        }), W.activeVersionId ? (l || u({
          type: "committed-source",
          documentId: r,
          revision: W.activeVersionId,
          sessionIdentity: i
        }), m("source")) : m("compare");
        return;
      }
      if (W.kind === "open-committed-source") {
        if (te.isInactive()) return;
        u({
          type: "committed-source",
          documentId: r,
          revision: W.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const oe = de();
      if (te.isInactive()) return;
      v(oe), w(""), I(""), f(i);
      const ye = await Ut({
        url: oe,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: te,
        setBoot: F
      });
      if (!te.isInactive()) {
        if (!ye) {
          ne("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        E(ye), ue();
      }
    }
    async function It() {
      var dt;
      const Y = await ((dt = Z.loadSessionSnapshot) == null ? void 0 : dt.call(Z, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: l,
        includeOptionalArtifacts: !l
      })), W = Y ? {
        jobPayload: Y.sourcePayload,
        manifestPayload: Y.manifestPayload,
        readerMetadata: Y.readerMetadata,
        regionsPayload: Y.regions,
        readerErrors: Y.readerErrors
      } : await Z.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !l
      });
      if (te.isInactive()) return;
      let oe = null;
      if (n && !r) {
        try {
          oe = await Z.fetchDocumentByJobId(ta, t);
        } catch {
        }
        if (te.isInactive()) return;
      }
      const ye = sa(W.jobPayload) || `${(oe == null ? void 0 : oe.document_id) || ""}`.trim();
      ye && !r && u({
        type: "resolved-job-document",
        jobId: t,
        documentId: ye
      });
      const me = ha({
        payloadDocumentId: ye,
        linkedActiveJobId: `${(oe == null ? void 0 : oe.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(oe == null ? void 0 : oe.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!l
      });
      if (me.kind === "restore-committed-source") {
        if (te.isInactive()) return;
        u({
          type: "committed-source",
          documentId: me.documentId,
          revision: me.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const Ae = Z.resolveReaderSourcePdf(W.manifestPayload), lt = Z.resolveReaderTranslatedPdfUrl(W.jobPayload, W.manifestPayload), Et = typeof Ae == "string" ? Ae : Z.resolveReaderArtifactUrl(Ae), ut = r || ye, ve = l != null && l.documentId ? kn(
        l.documentId,
        l.revision
      ) : Et || (ut ? Z.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(ut)}/source.pdf`) : ""), Te = l ? "" : lt || "";
      if (v(ve || ""), w(Te), I(ca(W.jobPayload, t)), d({
        jobPayload: W.jobPayload || null,
        manifestPayload: W.manifestPayload || null,
        sessionIdentity: i
      }), L(l ? [] : bo(W.regionsPayload)), U(l ? { source: null, translated: null } : yo(W.readerMetadata)), K(l ? ft : W.readerErrors ?? ft), !ve && !Te) {
        ne(Se.failed, Se.failed);
        return;
      }
      const Oe = await wa({
        sourceFinal: ve || "",
        translatedFinal: Te,
        fence: te,
        setBoot: F
      });
      if (Oe.status !== "inactive") {
        if (Oe.status === "incomplete") {
          ne("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        E(Oe.sourceBytes), N(Oe.translatedBytes), ue();
      }
    }
    async function Fe() {
      T(!1), E(null), N(null), L([]), U({ source: null, translated: null }), K(ft), yt(F, 8, Se.metadata, "metadata");
      try {
        if (s) {
          await De();
          return;
        }
        if (!t) {
          ne(Se.failed, Se.failed);
          return;
        }
        await It();
      } catch (Y) {
        if (te.isClosedOrStale() || (Y == null ? void 0 : Y.name) === "AbortError") return;
        te.markFailed();
        const W = Number(Y == null ? void 0 : Y.status);
        if (pa({
          status: W,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          u({ type: "missing-document-job", documentId: r, jobId: t }), u({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const oe = Y instanceof Error ? Y.message : Se.failed;
        ne(oe, oe);
      }
    }
    return Fe(), () => {
      ee.abort(), g.current === ee && (g.current = null);
    };
  }, [t, r, o, a, s, c, l, y, n, i, u, d, f, m]), {
    sourceUrl: P,
    translatedUrl: p,
    sourceFile: M,
    translatedFile: D,
    assetsReady: k,
    title: R,
    regions: _,
    readerMetadata: C,
    readerErrors: G,
    boot: re
  };
}
function Ra() {
  const e = A(!1), t = A(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = ra(), s = A({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const c = A(a), i = A(""), l = A(""), u = A(() => {
  }), d = O(() => u.current(), []), f = oa({
    routeDocumentId: o,
    jobId: r,
    sessionIdentity: a,
    sessionIdentityRef: c,
    documentIdRef: i,
    sessionJobIdRef: l,
    switchToSourceMode: d
  }), {
    sessionJobId: m,
    documentId: y,
    sourceOnly: h,
    sourceViewOnly: b
  } = f, { mode: g, setMode: P, switchSessionMode: v } = da(b);
  u.current = () => {
    v("source");
  }, c.current = a, i.current = y, l.current = m;
  const p = la({
    sessionJobId: m,
    sessionIdentity: a,
    sessionIdentityRef: c,
    sessionJobIdRef: l,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: w,
    scopedManifestPayload: M,
    jobStatus: E,
    jobTerminal: D,
    jobRefreshRevision: N,
    refreshJobArtifacts: k,
    refreshJobStatus: T
  } = p, R = Pa({
    sessionJobId: m,
    jobId: r,
    routeDocumentId: o,
    documentJobId: f.documentJobId,
    rejectedDocumentJobId: f.rejectedDocumentJobId,
    sourceOnly: h,
    locationKey: n,
    sessionIdentity: a,
    committedSource: f.activeCommittedDocumentSource,
    applyIdentityEvent: f.applyIdentityEvent,
    publishPayload: p.publishPayload,
    clearPayload: p.clearPayload,
    switchSessionMode: v,
    jobRefreshRevision: N,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), I = O(() => {
    var L;
    e.current = !0, (L = t.current) == null || L.abort();
  }, []), _ = q(
    () => ({
      fetchProtected: nn().fetchProtected,
      jobId: m,
      jobPayload: w,
      manifestPayload: M,
      sourceUrl: R.sourceUrl,
      translatedUrl: R.translatedUrl,
      sourceOnly: b
    }),
    [m, w, M, R.sourceUrl, R.translatedUrl, b]
  );
  return {
    jobId: m,
    jobStatus: E,
    workflow: `${(w == null ? void 0 : w.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: D,
    documentId: y,
    sessionIdentity: a,
    sourceOnly: h,
    mode: g,
    setMode: P,
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
    download: _,
    refreshJobArtifacts: k,
    refreshJobStatus: T,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: I
  };
}
const Ta = 160, Ia = 8, Ea = 960;
function Ma() {
  const e = A(null), [t, n] = x(null), [r, o] = x(Ea), a = O((s) => {
    e.current = s, n(s);
  }, []);
  return $(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const c = (l) => {
      !Number.isFinite(l) || l < Ta || o((u) => Math.abs(u - l) < Ia ? u : l);
    }, i = new ResizeObserver((l) => {
      var u, d;
      c(((d = (u = l[0]) == null ? void 0 : u.contentRect) == null ? void 0 : d.width) ?? s.clientWidth);
    });
    return i.observe(s), c(s.clientWidth), () => i.disconnect();
  }, [t]), {
    shellRef: e,
    shellEl: t,
    shellWidth: r,
    bindShell: a
  };
}
function Aa(e) {
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
const kt = { source: 0, translated: 0 };
function ka(e, t) {
  const {
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    sourceUrl: a,
    translatedUrl: s,
    sourceFile: c,
    translatedFile: i
  } = e, l = `${(t == null ? void 0 : t.identityKey) || ""}\0${a}\0${s}`, u = A(l);
  u.current = l;
  const [d, f] = x(() => ({
    identity: l,
    pages: kt
  })), [m, y] = x(() => ({ identity: l, tick: 0 })), h = d.identity === l ? d.pages : kt, b = m.identity === l ? m.tick : 0, g = Aa({
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    hasSource: !!c || !!a,
    hasTranslated: !!i
  }), { primaryPane: P } = g, v = O((T, R) => {
    u.current === l && f((I) => {
      const _ = I.identity === l ? I.pages : kt;
      return _[R] === T && I.identity === l ? I : {
        identity: l,
        pages: { ..._, [R]: T }
      };
    });
  }, [l]), p = A(null), w = O(() => {
    p.current && clearTimeout(p.current);
    const T = l;
    p.current = setTimeout(() => {
      p.current = null, u.current === T && y((R) => ({
        identity: T,
        tick: R.identity === T ? R.tick + 1 : 1
      }));
    }, 60);
  }, [l]);
  $(() => (p.current && (clearTimeout(p.current), p.current = null), f((T) => T.identity === l && T.pages.source === 0 && T.pages.translated === 0 ? T : { identity: l, pages: { source: 0, translated: 0 } }), y((T) => T.identity === l && T.tick === 0 ? T : { identity: l, tick: 0 }), () => {
    p.current && (clearTimeout(p.current), p.current = null);
  }), [l]);
  const M = q(
    () => Math.max(h.source, h.translated),
    [h]
  ), E = P === "translated" ? h.translated : h.source || h.translated, D = t == null ? void 0 : t.userZoom, N = t == null ? void 0 : t.shellWidth, k = `${l}-${b}-${D}-${n}-${h.source}-${h.translated}-${N}`;
  return {
    ...g,
    numPagesByPane: h,
    hudNumPages: M,
    primaryNumPages: E,
    metricsTick: b,
    onNumPages: v,
    onMetrics: w,
    rowSyncRevision: k
  };
}
const We = "data-reader-page", Je = "data-reader-pane", rn = "data-natural-height", La = "reader-react-root", Ca = "reader-react-grid", Sr = "reader-react-scroll-shell", Na = "reader-react-pdf-pane", wr = "reader-react-pdf-page", vt = "reader-react-pdf-page-placeholder", on = "reader-react-pdf-page-slot";
function nt(e, t) {
  const n = e != null ? `[${We}="${e}"]` : `[${We}]`;
  return t ? `${n}[${Je}="${t}"]` : n;
}
function _a() {
  return `.${on}[${We}]`;
}
function Pt(e) {
  return Number(e.getAttribute(We));
}
const Pr = 0.25, Rr = 1, xa = 0.05, it = 0.5, za = 16, Da = 8;
function Qe(e) {
  return it;
}
function Rt(e) {
  return Number.isFinite(e) ? Math.min(Rr, Math.max(Pr, e)) : it;
}
function rt(e, t) {
  const n = Rt(Number(e) + t * xa);
  return Math.round(n * 100) / 100;
}
function Fa(e) {
  return Math.round(Rt(e) * 100);
}
function Oa(e) {
  const n = (Number(e) || 0) - za - Da;
  return Math.max(160, Math.floor(n));
}
function $a(e, t = it) {
  const n = Rt(t);
  return Oa((Number(e) || 0) * n);
}
function ja(e, t) {
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
const Tr = [
  "markdown"
], Ir = [
  "terminal"
], Ua = [
  ...Tr,
  ...Ir
];
function Er(e) {
  return Ua.includes(e);
}
const Ba = "retainpdf:reader:view:v1:", Cn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), Ha = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function Mr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function Bt(e) {
  return `${e || ""}`.trim();
}
function Wa({
  documentId: e,
  jobId: t
}) {
  const n = Bt(e);
  if (n) return `document:${n}`;
  const r = Bt(t);
  return r ? `job:${r}` : "";
}
function Ar(e) {
  const t = Bt(e);
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
  if (!(!Cn.has(t) || !Cn.has(n) || t === n))
    return { left: t, right: n };
}
function qa(e) {
  return e === null ? null : Er(e) ? e : void 0;
}
function Ga(e) {
  return Ha.has(e) ? e : void 0;
}
function kr(e) {
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
function Pe(e, t = Mr()) {
  const n = Ar(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? kr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function Tt(e, t, n = Mr()) {
  const r = Ar(e);
  if (!r || !n) return null;
  const o = Pe(e, n), a = kr({
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
  const [r, o] = x(() => {
    var d;
    return ((d = Pe(n)) == null ? void 0 : d.zoom) ?? Qe();
  }), a = A(r), s = A(n);
  a.current = r;
  const c = A(1);
  $(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const d = ((f = Pe(n)) == null ? void 0 : f.zoom) ?? Qe();
    c.current = 1, a.current = d, o(d);
  }, [e, n]);
  const i = O((d) => {
    const f = Rt(d), m = a.current;
    Math.abs(f - m) < 5e-4 || (c.current = f / (m || 1), Tt(s.current, { zoom: f }), o(f));
  }, []), l = O((d) => {
    i(rt(a.current, d));
  }, [i]), u = O((d) => {
    i(Qe());
  }, [i]);
  return _e(() => {
    const d = c.current;
    Math.abs(d - 1) < 1e-3 || (c.current = 1, ja(t == null ? void 0 : t.current, d));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: l, resetZoom: u };
}
function Za(e, t = !0) {
  const [n, r] = x(null), o = O(() => {
    var c, i;
    r(null);
    const s = (c = globalThis.getSelection) == null ? void 0 : c.call(globalThis);
    (i = s == null ? void 0 : s.removeAllRanges) == null || i.call(s);
  }, []), a = e.current ?? null;
  return $(() => {
    if (!t)
      return;
    const s = () => {
      var L, C;
      const h = e.current, b = (L = globalThis.getSelection) == null ? void 0 : L.call(globalThis);
      if (!h || !b || b.isCollapsed || !b.rangeCount) {
        r(null);
        return;
      }
      const g = b.getRangeAt(0);
      if (!h.contains(g.commonAncestorContainer)) {
        r(null);
        return;
      }
      const P = `${b.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (P.length < 2) {
        r(null);
        return;
      }
      let v = g.commonAncestorContainer;
      v.nodeType === Node.TEXT_NODE && (v = v.parentElement);
      const p = (C = v == null ? void 0 : v.closest) == null ? void 0 : C.call(
        v,
        nt()
      );
      if (!p || !h.contains(p)) {
        r(null);
        return;
      }
      const w = Math.max(1, Math.floor(Pt(p) || 1)), E = p.getAttribute(Je) === "translated" ? "translated" : "source", D = g.getClientRects(), N = D[D.length - 1] || g.getBoundingClientRect();
      if (!N || N.width === 0 && N.height === 0) {
        r(null);
        return;
      }
      const k = typeof window < "u" ? window.innerWidth : 800, T = typeof window < "u" ? window.innerHeight : 600, R = 16, I = Math.min(Math.max(R, N.left), k - R), _ = Math.min(Math.max(R, N.top), T - R);
      r({
        selectionType: "text",
        quote: P,
        page: w,
        pane: E,
        rect: {
          left: I,
          top: _,
          width: N.width,
          height: N.height
        }
      });
    }, c = () => {
      window.setTimeout(s, 0);
    }, i = () => {
      c();
    }, l = () => c(), u = () => c(), d = () => {
      c();
    }, f = (h) => {
      h.key === "Escape" && o();
    }, m = () => {
      r((h) => h && null);
    };
    document.addEventListener("mouseup", i), document.addEventListener("pointerup", l), document.addEventListener("touchend", u), document.addEventListener("selectionchange", d), document.addEventListener("keyup", f);
    const y = a ?? e.current;
    return y == null || y.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", i), document.removeEventListener("pointerup", l), document.removeEventListener("touchend", u), document.removeEventListener("selectionchange", d), document.removeEventListener("keyup", f), y == null || y.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, a, o]), { selection: n, clearSelection: o };
}
function Ya(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, o = A(t), a = A(n), s = A(r);
  return o.current = t, a.current = n, s.current = r, { setModeKeepingPage: O((i) => {
    i !== o.current && (s.current(), a.current(i));
  }, []) };
}
const an = 48;
function Lr(e, t = an) {
  return e.getBoundingClientRect().top + t;
}
function Cr(e, t) {
  if (!e.length)
    return null;
  let n = null, r = -1 / 0;
  for (const i of e) {
    const l = i.getBoundingClientRect();
    l.height < 8 || l.width < 8 || l.top <= t + 1 && l.top >= r && (n = i, r = l.top);
  }
  if (!n && (n = e.find((l) => {
    const u = l.getBoundingClientRect();
    return u.height >= 8 && u.width >= 8;
  }) ?? e[0] ?? null, n)) {
    const l = [...e].reverse().find((u) => {
      const d = u.getBoundingClientRect();
      return d.height >= 8 && d.width >= 8;
    });
    l && l.getBoundingClientRect().bottom < t && (n = l);
  }
  if (!n)
    return null;
  const o = Pt(n);
  if (!Number.isFinite(o) || o < 1)
    return null;
  const a = n.getBoundingClientRect(), s = a.height > 0 ? a.height : 1, c = Math.min(1, Math.max(0, (t - a.top) / s));
  return { el: n, page: o, fraction: c };
}
function Lt(e, t, n = an) {
  if (!e)
    return null;
  const r = nt(void 0, t), o = Array.from(e.querySelectorAll(r));
  if (!o.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Lr(e, n), c = Cr(o, s);
  return c ? { page: c.page, fraction: c.fraction } : null;
}
function sn(e, t, n = "auto", r, o = an) {
  if (!e || !t)
    return !1;
  const a = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let c = null;
  if (r && (c = e.querySelector(nt(a, r))), c || (c = e.querySelector(nt(a))), !c)
    return !1;
  const i = e.getBoundingClientRect(), l = c.getBoundingClientRect();
  if (i.height <= 0 || l.height < 8 && c.offsetHeight < 8)
    return !1;
  const u = l.height > 0 ? l.height : c.offsetHeight, d = e.scrollTop + (l.top - i.top), f = Math.max(0, d + s * u - o);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function Xa(e, t, n = "smooth", r) {
  return sn(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function Ht(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", o = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let a = !1, s = !1;
  const c = [], i = () => {
    var u;
    if (a) return;
    sn(
      e(),
      t,
      r,
      n == null ? void 0 : n.pane
    ) && !s && (s = !0, (u = n == null ? void 0 : n.onDone) == null || u.call(n));
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
function Qa(e, t, n) {
  return Ht(
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
function he(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function es(e, t, n = !0, r = "", o) {
  const [a, s] = x(1);
  return $(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const c = e.current;
    if (!c)
      return;
    let i = !1, l = null, u = 0;
    const d = nt(void 0, o), f = () => {
      if (i) return;
      const h = Array.from(c.querySelectorAll(d));
      if (!h.length)
        return;
      const b = Lr(c), g = Cr(h, b);
      g && s(g.page);
    }, m = () => {
      i || (u && cancelAnimationFrame(u), u = requestAnimationFrame(() => {
        u = 0, f();
      }));
    }, y = () => {
      if (i) return;
      if (!Array.from(c.querySelectorAll(d)).length) {
        l = setTimeout(y, 120);
        return;
      }
      f(), c.addEventListener("scroll", m, { passive: !0 });
    };
    return y(), () => {
      i = !0, l && clearTimeout(l), u && cancelAnimationFrame(u), c.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, o]), a;
}
const ts = `canvas, .react-pdf__Page, .${wr}, .${vt}`, Nn = /* @__PURE__ */ new WeakMap();
function ns(e) {
  const t = Number(e.getAttribute(rn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Nn.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(ts), Nn.set(e, n)), n) {
    const o = n.getBoundingClientRect().height;
    if (Number.isFinite(o) && o > 0)
      return o;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function rs(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function os(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(_a()).forEach((r) => {
    const o = Pt(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = ns(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function as(e, t, n = "", r) {
  const [o, a] = x(() => /* @__PURE__ */ new Map()), s = A(o), c = A(r);
  return c.current = r, _e(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), a(s.current));
      return;
    }
    let i = !1, l = 0, u = !1, d = !1;
    const f = () => {
      var w;
      if (i) return;
      const v = e.current;
      if (!v) return;
      const p = os(v);
      rs(s.current, p) || (s.current = p, a(p)), u && !d && (d = !0, (w = c.current) == null || w.call(c));
    }, m = () => {
      cancelAnimationFrame(l), l = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const y = window.setTimeout(m, 100), h = window.setTimeout(() => {
      u = !0, m();
    }, 300), b = window.setTimeout(m, 700), g = e.current;
    let P = null;
    return g && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => m()), P.observe(g)), () => {
      i = !0, cancelAnimationFrame(l), window.clearTimeout(y), window.clearTimeout(h), window.clearTimeout(b), P == null || P.disconnect();
    };
  }, [e, t, n]), o;
}
const ss = [0, 48, 140, 320, 560], is = 700, cs = [80, 200, 400], ls = 500, us = 50, ds = 180, _n = [0, 48, 140, 320, 700, 1200];
function fs(e, t) {
  var T;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, c = A(
    ((T = Pe(a)) == null ? void 0 : T.anchor) || { page: 1, fraction: 0 }
  ), i = A(null), l = A(!1), u = A(r), d = A(null), f = A(null), m = A(null), y = A(null), h = A(a), b = A(""), g = A(n);
  g.current = n;
  const P = O(() => {
    var R;
    (R = d.current) == null || R.call(d), d.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), v = O((R = !1) => {
    y.current != null && (clearTimeout(y.current), y.current = null);
    const I = () => {
      y.current = null, Tt(h.current, {
        anchor: he(c.current)
      });
    };
    R ? I() : y.current = setTimeout(I, ds);
  }, []), p = O((R) => {
    c.current = he(R), i.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, l.current = !1;
    }, us);
  }, []);
  $(() => {
    if (!o)
      return;
    let R = !1, I = null, _ = null, L = null;
    const C = () => {
      if (R) return;
      const U = e.current;
      if (!U) {
        L = setTimeout(C, 50);
        return;
      }
      I = U, _ = () => {
        if (l.current)
          return;
        const G = Lt(I, g.current);
        G && (c.current = G, v());
      }, I.addEventListener("scroll", _, { passive: !0 }), l.current || _();
    };
    return C(), () => {
      R = !0, L != null && clearTimeout(L), I && _ && I.removeEventListener("scroll", _);
    };
  }, [o, r, n, e, v]), _e(() => {
    var I;
    if (h.current === a) return;
    v(!0), P(), m.current != null && (clearTimeout(m.current), m.current = null), h.current = a, b.current = "";
    const R = (I = Pe(a)) == null ? void 0 : I.anchor;
    c.current = R ? he(R) : { page: 1, fraction: 0 }, i.current = null, l.current = !!a, u.current = r;
  }, [a, r, v, P]), $(() => {
    var I;
    if (!o || !s || !a || b.current === a) return;
    b.current = a;
    const R = he(
      ((I = Pe(a)) == null ? void 0 : I.anchor) || { page: 1, fraction: 0 }
    );
    return c.current = R, i.current = R, l.current = !0, P(), d.current = Ht(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: g.current,
        delaysMs: _n,
        onDone: () => p(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, p(R);
    }, Math.max(..._n) + 160), () => P();
  }, [o, s, a, e, p, P]), $(() => {
    if (u.current === r)
      return;
    if (u.current = r, !o) {
      l.current = !1, i.current = null, P();
      return;
    }
    const R = i.current ? he(i.current) : he(c.current);
    return l.current = !0, i.current = R, c.current = R, P(), d.current = Ht(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: ss,
        onDone: () => p(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, p(R);
    }, is), () => {
      P();
    };
  }, [r, o, n, e, p, P]), $(() => () => {
    P(), m.current != null && (clearTimeout(m.current), m.current = null), v(!0);
  }, [P, v]);
  const w = O(() => {
    const R = Lt(
      e.current,
      g.current
    );
    return he(R || c.current);
  }, [e]), M = O(() => {
    l.current = !0;
    const R = Lt(
      e.current,
      g.current
    ), I = he(R ?? c.current);
    return c.current = I, i.current = I, v(), I;
  }, [e, v]), E = O((R, I, _) => {
    const L = _ || g.current, C = St(R, I || 1), U = { page: C, fraction: 0 };
    c.current = U, l.current = !0, i.current = U, v(), P(), Xa(e.current, C, "smooth", L), d.current = Qa(
      () => e.current,
      C,
      {
        behavior: "auto",
        pane: L,
        delaysMs: cs,
        onDone: () => p(U)
      }
    ), f.current = setTimeout(() => {
      f.current = null, p(U);
    }, ls);
  }, [e, p, P, v]), D = O(() => he(c.current), []), N = O(() => l.current, []), k = O(() => {
    if (!l.current || !i.current)
      return;
    const R = he(i.current);
    sn(
      e.current,
      R,
      "auto",
      g.current
    );
  }, [e]);
  return {
    lockFromShell: w,
    beginModeSwitch: M,
    goToPage: E,
    getAnchor: D,
    isRestoring: N,
    repinIfRestoring: k
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
function Nr(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), o = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), a = `j:${r}:d:${o}`;
  return t == null ? `${a}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${a}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const hs = [0, 80, 200, 400, 800], ps = 120, gs = 400;
function bs(e, t, n) {
  const { enabled: r, numPages: o, goToPage: a, resolveBlockPage: s, onAnchorApplied: c, jobId: i, documentId: l } = e, u = A(a);
  u.current = a;
  const d = A(s);
  d.current = s;
  const f = A(c);
  f.current = c;
  const m = A(n);
  m.current = n, $(() => {
    var v, p;
    if (!r || !Number.isFinite(o) || o < 1)
      return;
    const y = Go(), h = ms(y, d.current), b = Nr(y, h, { jobId: i, documentId: l });
    if (t.current === b)
      return;
    if (h == null) {
      t.current = b, (v = m.current) == null || v.call(m);
      return;
    }
    t.current = b, y && ((p = f.current) == null || p.call(f, y, h));
    const g = [];
    let P = 0;
    for (const w of hs)
      P = Math.max(P, w), g.push(
        setTimeout(() => {
          u.current(h);
        }, w)
      );
    return g.push(
      setTimeout(() => {
        var w;
        (w = m.current) == null || w.call(m);
      }, P + ps)
    ), () => {
      for (const w of g) clearTimeout(w);
    };
  }, [r, o, i, l, t]);
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
    jobId: c,
    documentId: i,
    applyReaderSearch: l
  } = e, u = A(a);
  u.current = a;
  const d = A(l);
  d.current = l;
  const f = A(0);
  $(() => {
    if (!n || !r || !t.current || !Number.isFinite(o) || o < 1 || f.current === o) return;
    const m = setTimeout(() => {
      var g;
      const y = ((g = globalThis.location) == null ? void 0 : g.search) || "", h = go(y, o, u.current);
      if (f.current = o, h === null) return;
      const b = `${new URLSearchParams(h).get("block_id") || ""}`.trim();
      t.current = Nr(
        { blockId: b },
        o,
        { jobId: c, documentId: i }
      ), (d.current || ys)(h);
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
function Ss(e) {
  const t = A(""), [n, r] = x(!1), o = O(() => r(!0), []), a = {
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
const Ke = {
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
function xn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function _r(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = xn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const o = xn(n, e);
  return o < 0 ? "ignore" : o === 0 ? n.page_hash === e.pageHash ? "ignore" : "retry" : "accept";
}
function Ps(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), o = _r(r, t, n);
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
function Rs(e) {
  const { hasOverlayContent: t, connection: n, showSource: r } = e;
  return {
    topBarPill: t && n !== "terminal",
    sourcePaneToggle: t && r,
    overlayRenderable: t && r
  };
}
const zn = [250, 500, 1e3, 2e3, 4e3], Ct = [80, 160, 320, 640, 1e3, 1500], Dn = [250, 500, 1e3, 2e3, 4e3, 5e3], Ts = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Wt(e, t) {
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
function cn(e) {
  return Ro(e) ? `${e.code || ""}`.trim() : "";
}
function mt(e, t) {
  const n = cn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Is(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if (_r(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = To(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (i) {
      if ((i == null ? void 0 : i.name) === "AbortError") throw i;
      a = i;
      const l = cn(i);
      if (l && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(l)) throw i;
    }
    const c = Ct[Math.min(s, Ct.length - 1)];
    if (await Wt(c, r), s >= Ct.length + 2) throw a;
  }
}
function Es({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = x(Ke), s = A(o), c = A("");
  s.current = o;
  const i = `${e || ""}`.trim(), l = `${t || ""}`.trim().toLowerCase(), u = Ts.has(l) ? l : "";
  return $(() => {
    if (!n || !i) {
      c.current = "", s.current = Ke, a(Ke);
      return;
    }
    const d = r === void 0 ? qo() : r, f = c.current === i;
    if (c.current = i, !d) {
      const v = {
        ...f ? s.current : Ke,
        connection: u ? "terminal" : "unavailable",
        jobStatus: l,
        error: "实时译文暂不可用"
      };
      s.current = v, a(v);
      return;
    }
    const m = new AbortController();
    let y = !1;
    const h = {
      ...f ? s.current : Ke,
      connection: u ? "terminal" : "connecting",
      jobStatus: l,
      error: ""
    };
    s.current = h, a(h);
    const b = (v) => {
      m.signal.aborted || a((p) => {
        const w = v(p);
        return s.current = w, w;
      });
    }, g = async () => {
      let v = 0;
      for (; !m.signal.aborted; )
        try {
          const p = await d.fetchLayout(i, { signal: m.signal });
          y = !0, b((w) => ({
            ...w,
            layoutByPage: ws(p),
            jobStatus: l,
            error: ""
          }));
          return;
        } catch (p) {
          if ((p == null ? void 0 : p.name) === "AbortError") return;
          const w = cn(p);
          if (!(w === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !w)) {
            b((E) => ({
              ...E,
              connection: u ? "terminal" : "unavailable",
              jobStatus: l,
              error: mt(p, "实时译文暂不可用")
            }));
            return;
          }
          if (u) {
            b((E) => ({
              ...E,
              connection: "terminal",
              jobStatus: l,
              error: ""
            }));
            return;
          }
          b((E) => ({
            ...E,
            connection: "connecting",
            jobStatus: l,
            error: mt(p, "正在等待 OCR 版面数据")
          })), await Wt(zn[Math.min(v, zn.length - 1)], m.signal).catch(() => {
          }), v += 1;
        }
    };
    return (async () => {
      if (await g(), !y || m.signal.aborted) return;
      let v = 0;
      for (; !m.signal.aborted; ) {
        u || b((p) => ({
          ...p,
          connection: p.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: l,
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
              let w;
              try {
                w = await Is(
                  i,
                  p,
                  s.current,
                  m.signal,
                  d
                );
              } catch (M) {
                if ((M == null ? void 0 : M.name) === "AbortError" || m.signal.aborted) throw M;
                b((E) => ({
                  ...E,
                  lastSeq: Math.max(E.lastSeq, p.seq),
                  error: mt(M, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              b((M) => {
                const E = Ps(M, p, w);
                return u ? {
                  ...E,
                  connection: "terminal",
                  jobStatus: l
                } : {
                  ...E,
                  jobStatus: l
                };
              }), v = 0;
            }
          });
        } catch (p) {
          if ((p == null ? void 0 : p.name) === "AbortError" || m.signal.aborted) return;
          b((w) => ({
            ...w,
            connection: u ? "terminal" : "reconnecting",
            jobStatus: l,
            error: mt(p, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (u) {
          b((p) => ({
            ...p,
            connection: "terminal",
            jobStatus: l
          }));
          return;
        }
        await Wt(Dn[Math.min(v, Dn.length - 1)], m.signal).catch(() => {
        }), v += 1;
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
const ks = /* @__PURE__ */ new Set(["book", "translate"]);
function xr(e) {
  return !!(e.jobId && e.sourceUrl && ks.has(e.workflow));
}
function Ls(e) {
  return !!(xr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function Cs() {
  const e = Ra(), t = xr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = Ls({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = Es({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), { shellRef: o, shellEl: a, shellWidth: s, bindShell: c } = Ma(), i = Wa({
    documentId: e.documentId,
    jobId: e.jobId
  }), l = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: u, onZoomChange: d } = Ka(e.mode, o, i), f = ka(
    {
      mode: e.mode,
      sourceOnly: e.sourceOnly,
      assetsReady: e.assetsReady,
      sourceUrl: e.sourceUrl,
      translatedUrl: e.translatedUrl,
      sourceFile: e.sourceFile,
      translatedFile: e.translatedFile
    },
    { userZoom: u, shellWidth: s, identityKey: l }
  ), {
    beginModeSwitch: m,
    goToPage: y,
    repinIfRestoring: h
  } = fs(o, {
    primaryPane: f.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: f.primaryNumPages > 0
  });
  $(() => {
    h();
  }, [s, h]);
  const b = as(
    o,
    f.compareMode,
    f.rowSyncRevision,
    h
  ), g = es(
    o,
    f.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${u}-${f.metricsTick}`,
    f.primaryPane
  ), P = O((F, ee) => {
    var te, Z;
    const le = Math.max(
      Number(f.hudNumPages) || 0,
      Number(f.primaryNumPages) || 0,
      Number((te = f.numPagesByPane) == null ? void 0 : te.source) || 0,
      Number((Z = f.numPagesByPane) == null ? void 0 : Z.translated) || 0
    );
    y(F, le, ee);
  }, [y, f.hudNumPages, f.primaryNumPages, f.numPagesByPane]), [v, p] = x(null), w = A(null), M = O((F) => {
    w.current && clearTimeout(w.current), p(F), F && (w.current = setTimeout(() => p(null), Ms));
  }, []);
  $(() => () => {
    w.current && clearTimeout(w.current);
  }, []);
  const E = O((F) => {
    const ee = Mt(e.regions, F);
    return ee ? Dt(ee, f.primaryPane).page : null;
  }, [e.regions, f.primaryPane]), D = O((F, ee) => {
    const le = ee || f.primaryPane, te = typeof F == "object" && F ? `${F.block_id || ""}`.trim() : "", Z = typeof F == "object" && F ? `${F.image_url || ""}`.trim() : "", ne = typeof F == "object" && F ? F.page_idx != null ? Number(F.page_idx) + 1 : F.page != null ? Number(F.page) : null : typeof F == "number" ? F + 1 : null, ue = vo(e.regions, Z, ne) || Mt(e.regions, te) || (typeof F == "object" ? So(e.regions, F) : null);
    let de = ue ? Dt(ue, le).page : null;
    de == null && (de = As(F)), !(de == null || de < 1) && (M(ue), P(de, le));
  }, [M, P, f.primaryPane, e.regions]);
  Ss({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: f.hudNumPages || 0,
    currentPage: g,
    goToPage: P,
    resolveBlockPage: E,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (F) => {
      M(Mt(e.regions, F.blockId));
    }
  });
  const { setModeKeepingPage: N } = Ya({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: m
  }), [k, T] = x(null), {
    selection: R,
    clearSelection: I
  } = Za(o, !e.boot.loading && !e.boot.failed), _ = O(() => {
    T(null), I();
  }, [I]), L = O((F) => {
    I(), T(F);
  }, [I]);
  $(() => {
    R && T(null);
  }, [R]), $(() => {
    const F = o.current;
    if (!F) return;
    const ee = () => T(null);
    return F.addEventListener("scroll", ee, { passive: !0 }), () => F.removeEventListener("scroll", ee);
  }, [a, o]);
  const C = R || k;
  $(() => {
    M(null), _();
  }, [l, M, _]);
  const U = !e.boot.loading && !e.boot.failed, G = q(() => ({ bindShell: c, shellEl: a, shellWidth: s, shellRef: o }), [c, a, s, o]), K = q(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), re = q(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: u,
    onZoomChange: d,
    shell: G,
    panes: f,
    sessionFiles: K,
    rowHeights: b,
    goToPage: P,
    activeRegion: v,
    jumpToAnchor: D,
    setModeKeepingPage: N,
    download: e.download,
    showHud: U,
    selection: C,
    clearSelection: _,
    selectRegion: L,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, G, f, K, b, P, v, D, N, U, C, _, L, u, d, i, r, n]);
  return q(() => ({
    ...re,
    currentPage: g
  }), [re, g]);
}
const Ns = [
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
], _s = [
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
function xs(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Ns)
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
function Ds(e) {
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
    const u = (d) => {
      if (d.defaultPrevented || d.metaKey || d.ctrlKey || d.altKey || zs(d.target))
        return;
      const f = d.key, m = xs(f);
      if (m) {
        if (m.mode) {
          if (n && m.mode !== "source")
            return;
          d.preventDefault(), r(m.mode);
          return;
        }
        if (!(m.requiresPages && c <= 0))
          switch (d.preventDefault(), m.action) {
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
              i(St(s + 1, c));
              return;
            case "prev-page":
              i(St(s - 1, c));
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
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
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
const Fs = "retainpdf:soft-reader-close";
function Os() {
  return new URL("./index.html", window.location.href).href;
}
function $s() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: Fs },
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
    window.location.assign(Os());
  }
}
function Bs({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ j(
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
        /* @__PURE__ */ S(tn, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ S("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let Fn = !1;
function Hs() {
  if (Fn)
    return;
  const e = tt().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (Fo.GlobalWorkerOptions.workerSrc = e, Fn = !0);
}
const Ws = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function Js({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: o
}) {
  const a = r.flatMap((s) => {
    if (!dr(s.region)) return [];
    const c = wt(s, t, n);
    return c ? [{ highlight: s, rect: c }] : [];
  });
  return a.length ? /* @__PURE__ */ S("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: a.map(({ highlight: s, rect: c }) => {
    const i = s.region, l = fr(i), u = Ws[l];
    return /* @__PURE__ */ j(
      "button",
      {
        type: "button",
        className: `reader-structure-selection-target is-${l}`,
        "data-reader-region-id": i.itemId,
        "data-reader-region-kind": l,
        style: c,
        "aria-label": `${u}区域，点击选择`,
        title: `${u} · 点击选择`,
        onClick: (d) => {
          d.stopPropagation();
          const f = d.currentTarget.getBoundingClientRect();
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
          /* @__PURE__ */ S("span", { className: "reader-structure-selection-label", "aria-hidden": "true", children: u }),
          /* @__PURE__ */ S("span", { className: "sr-only", children: mr(i, e) })
        ]
      },
      i.itemId
    );
  }) }) : null;
}
function Vs(e, t, n) {
  return e.flatMap((r) => {
    if (fr(r.region) !== "text") return [];
    const o = wt(r, t, n);
    return o ? [{ itemId: r.itemId, highlight: r, rect: o }] : [];
  });
}
function On(e, t, n) {
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
function qs({ target: e }) {
  return e ? /* @__PURE__ */ S("div", { className: "reader-text-hover-layer", "aria-hidden": "true", children: /* @__PURE__ */ S(
    "div",
    {
      className: "reader-text-hover-frame",
      "data-reader-text-hover-id": e.itemId,
      style: e.rect,
      children: /* @__PURE__ */ S("span", { className: "reader-text-hover-label", children: "文字" })
    }
  ) }) : null;
}
function Gs(e, t) {
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
function Ks(e, t, n, r) {
  if (!e || !t) return [];
  const o = [];
  for (const a of e.blocks) {
    const s = t.itemsById.get(a.item_id);
    if (!(s != null && s.translated_text)) continue;
    const c = wt(
      Gs(e, a),
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
const Zs = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', Ys = 256, Ze = /* @__PURE__ */ new Map();
function Xs(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function Qs(e) {
  const t = `${e || ""}`, { text: n, slots: r } = jo(t, { bareLatex: !0 }), o = Xs(n), a = Uo(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Ze.get(t);
  if (!s && (s = Bo(o, r), Ze.set(t, s), Ze.size > Ys)) {
    const c = Ze.keys().next().value;
    c !== void 0 && Ze.delete(c);
  }
  return { fallbackHtml: a, richHtml: s, hasMath: !0 };
}
function Nt(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function we(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function ei(e, t) {
  const n = e.typography, r = we(t) || 1, o = we(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), c = Nt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, c * r)), l = we(n == null ? void 0 : n.fit_min_font_size_pt), u = we(n == null ? void 0 : n.fit_max_font_size_pt), d = Math.max(3.5, (l || 5.5) * r), f = Math.max(
    d,
    u ? u * r : o ? o * r : i
  ), m = o ? o * r : i, y = we(n == null ? void 0 : n.leading_em), h = [
    we(n == null ? void 0 : n.padding_top_pt) || 0,
    we(n == null ? void 0 : n.padding_right_pt) || 0,
    we(n == null ? void 0 : n.padding_bottom_pt) || 0,
    we(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((b) => b * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || Zs,
    fontSizePx: Math.max(d, Math.min(f, m)),
    minFontSizePx: d,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: y ? 1 + y : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (Nt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : Nt(e.kind) ? "center" : "justify",
    padding: h,
    exact: !!o
  };
}
function ti(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), c = (d) => {
    const f = s.get(d);
    if (f !== void 0) return f;
    const { width: m, height: y } = e(d), h = m <= t + 0.5 && y <= n + 0.5;
    return s.set(d, h), h;
  };
  let i = o, l = a, u = Math.min(r.requestedFontSizePx, l);
  if (c(u)) {
    if (!r.exact) {
      i = u;
      for (let d = 0; d < 6 && l > i; d += 1) {
        const f = (i + l) / 2;
        c(f) ? (u = f, i = f) : l = f;
      }
    }
  } else {
    l = u, u = i;
    for (let d = 0; d < 8 && l > i; d += 1) {
      const f = (i + l) / 2;
      c(f) ? (u = f, i = f) : l = f;
    }
  }
  return Math.max(o, u);
}
const ni = 512, Ye = /* @__PURE__ */ new Map();
let Jt = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Jt += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Jt += 1;
}));
function ri(e, t, n, r) {
  return [
    Jt,
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
function oi({ item: e, pageScale: t }) {
  const n = A(null), r = q(
    () => Qs(e.translatedText),
    [e.translatedText]
  ), [o, a] = x(r.fallbackHtml), s = q(
    () => ei(e, t),
    [e, t]
  );
  $(() => {
    let d = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      d && a(f);
    }), () => {
      d = !1;
    };
  }, [r]), _e(() => {
    const d = n.current;
    if (!d) return;
    const [f, m, y, h] = s.padding, b = Math.max(1, e.rect.width - h - m), g = Math.max(1, e.rect.height - f - y), P = ri(o, b, g, s);
    let v = Ye.get(P);
    if (v === void 0 && (v = ti(
      (p) => (d.style.fontSize = `${p}px`, { width: d.scrollWidth, height: d.scrollHeight }),
      b,
      g,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Ye.set(P, v), Ye.size > ni)) {
      const p = Ye.keys().next().value;
      p !== void 0 && Ye.delete(p);
    }
    d.style.fontSize = `${v.toFixed(2)}px`;
  }, [o, e.rect.height, e.rect.width, s]);
  const [c, i, l, u] = s.padding;
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
        padding: `${c}px ${i}px ${l}px ${u}px`
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
function ai({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = q(
    () => Ks(e, t, n, r),
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
        oi,
        {
          item: a,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${a.itemId}:${a.changedAtSeq}`
      ))
    }
  ) : null;
}
const si = Yt(ai), zr = 1.414;
function ii({
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
  regionHighlight: u = null,
  regionTargets: d = [],
  onSelectRegion: f,
  liveTranslationLayout: m,
  liveTranslationPage: y,
  showLiveTranslation: h = r === "source"
}) {
  const b = A(c ?? zr), [g, P] = x(b.current);
  $(() => {
    c != null && Math.abs(c - b.current) >= 1e-3 && (b.current = c, P(c));
  }, [c]);
  const v = A(l);
  v.current = l;
  const p = A((L) => {
    var C;
    (C = v.current) == null || C.call(v, L);
  }).current, w = Math.max(120, Math.floor(t * g)), M = Math.max(w, Math.ceil(a || 0)), E = wt(u, t, w), D = q(
    () => Vs(d, t, w),
    [w, d, t]
  ), [N, k] = x(null), T = q(
    () => D.find((L) => L.itemId === N) || null,
    [N, D]
  ), R = (L) => {
    if (L.buttons !== 0) {
      k(null);
      return;
    }
    const C = L.currentTarget.getBoundingClientRect(), U = On(
      D,
      L.clientX - C.left,
      L.clientY - C.top
    ), G = (U == null ? void 0 : U.itemId) || null;
    k((K) => K === G ? K : G);
  }, I = (L) => {
    var G, K, re;
    if (!f || (K = (G = L.target) == null ? void 0 : G.closest) != null && K.call(G, ".reader-structure-selection-target") || `${((re = window.getSelection()) == null ? void 0 : re.toString()) || ""}`.trim()) return;
    const C = L.currentTarget.getBoundingClientRect(), U = On(
      D,
      L.clientX - C.left,
      L.clientY - C.top
    );
    U && f({
      selectionType: "region",
      region: U.highlight.region,
      kind: "text",
      page: U.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: C.left + U.rect.left,
        top: C.top + U.rect.top,
        width: U.rect.width,
        height: U.rect.height
      }
    });
  }, _ = (L) => {
    !Number.isFinite(L) || L <= 0 || Math.abs(b.current - L) < 1e-3 || (b.current = L, P(L), i == null || i(e, L));
  };
  return /* @__PURE__ */ j(
    "div",
    {
      ref: p,
      [We]: e,
      [Je]: r,
      [rn]: w,
      className: on,
      onPointerMoveCapture: R,
      onClick: I,
      onPointerLeave: () => k(null),
      style: {
        width: t,
        height: M,
        minHeight: M
      },
      children: [
        o ? /* @__PURE__ */ S(
          Oo,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: wr,
            loading: /* @__PURE__ */ S(
              "div",
              {
                className: vt,
                style: { width: t, height: w }
              }
            ),
            onLoadSuccess: (L) => {
              try {
                const C = L.getViewport({ scale: 1 });
                if (C.width > 0) {
                  const U = C.height / C.width;
                  _(U);
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
            className: vt,
            style: { width: t, height: w },
            "aria-hidden": !0
          }
        ),
        E ? /* @__PURE__ */ S(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": u == null ? void 0 : u.itemId,
            style: E,
            "aria-hidden": "true"
          }
        ) : null,
        o && h ? /* @__PURE__ */ S(
          si,
          {
            layoutPage: m,
            pageState: y,
            width: t,
            height: w
          }
        ) : null,
        /* @__PURE__ */ S(qs, { target: o ? T : null }),
        /* @__PURE__ */ S(
          Js,
          {
            pane: r === "translated" ? "translated" : "source",
            width: t,
            height: w,
            regions: d,
            onSelect: f
          }
        )
      ]
    }
  );
}
const ci = Yt(ii), _t = 5, li = "120% 0px", ui = 120;
let $n = 1;
const jn = /* @__PURE__ */ new WeakMap();
function di(e) {
  if (!e) return 0;
  const t = jn.get(e);
  if (t) return t;
  const n = $n;
  return $n += 1, jn.set(e, n), n;
}
function fi() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const mi = so(
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
    onMetrics: u,
    onLoadSuccess: d,
    onLoadError: f,
    onNumPagesChange: m,
    activeRegion: y = null,
    regions: h = [],
    readerMetadata: b = null,
    onSelectRegion: g,
    liveTranslation: P,
    showLiveTranslation: v = t === "source",
    liveTranslationPendingLabel: p = "",
    paneAction: w
  }, M) {
    Hs();
    const { file: E, loading: D, error: N } = va(n, r), k = `${n}\0${di(E)}`, T = A(k);
    T.current = k;
    const R = q(
      () => ga(E),
      [E, n]
    ), [I, _] = x(0), [L, C] = x(""), [U, G] = x(null), [K, re] = x(480), F = A(null), ee = A(0), le = q(() => fi(), []), te = q(() => ({
      cMapUrl: tt().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: tt().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    Xt(M, () => U, [U]), $(() => {
      const z = (B) => {
        !Number.isFinite(B) || B < 80 || Math.abs(B - ee.current) < 8 || (ee.current = B, re(B));
      }, J = i && i >= 80 ? i : (c == null ? void 0 : c.clientWidth) || 0;
      if (z(J), !c || typeof ResizeObserver > "u" || i && i >= 80) return;
      const H = new ResizeObserver((B) => {
        var X, Q;
        const ae = ((Q = (X = B[0]) == null ? void 0 : X.contentRect) == null ? void 0 : Q.width) ?? c.clientWidth;
        !Number.isFinite(ae) || ae < 80 || (F.current && clearTimeout(F.current), F.current = setTimeout(() => z(ae), 80));
      });
      return H.observe(c), () => {
        H.disconnect(), F.current && clearTimeout(F.current);
      };
    }, [i, c, a]);
    const Z = q(
      () => $a(K, o),
      [K, o]
    ), [ne, ue] = x(() => /* @__PURE__ */ new Map()), [de, De] = x(() => /* @__PURE__ */ new Set()), [It, Fe] = x(() => /* @__PURE__ */ new Set()), Y = A(/* @__PURE__ */ new Map()), W = A(null), oe = A(/* @__PURE__ */ new Map()), ye = O((z, J) => {
      ue((H) => {
        if (H.get(z) === J) return H;
        const B = new Map(H);
        return B.set(z, J), B;
      });
    }, []), me = O((z, J) => {
      const H = Y.current, B = H.get(z);
      if (B && W.current)
        try {
          W.current.unobserve(B);
        } catch {
        }
      if (J) {
        if (H.set(z, J), W.current)
          try {
            W.current.observe(J);
          } catch {
          }
      } else
        H.delete(z);
    }, []), Ae = A(/* @__PURE__ */ new Map()), lt = O((z) => {
      const J = Ae.current;
      let H = J.get(z);
      return H || (H = (B) => me(z, B), J.set(z, H)), H;
    }, [me]);
    $(() => {
      if (typeof IntersectionObserver > "u") return;
      const z = oe.current, J = new IntersectionObserver(
        (H) => {
          const B = [], ae = [];
          for (const X of H) {
            const Q = X.target, ce = Pt(Q);
            Number.isFinite(ce) && (X.isIntersecting ? B : ae).push(ce);
          }
          if ((B.length || ae.length) && De((X) => {
            let Q = null;
            for (const ce of B)
              X.has(ce) || (Q = Q || new Set(X), Q.add(ce));
            for (const ce of ae)
              X.has(ce) && (Q = Q || new Set(X), Q.delete(ce));
            return Q || X;
          }), B.length) {
            for (const X of B) {
              const Q = z.get(X);
              Q && (clearTimeout(Q), z.delete(X));
            }
            Fe((X) => {
              let Q = null;
              for (const ce of B)
                X.has(ce) || (Q = Q || new Set(X), Q.add(ce));
              return Q || X;
            });
          }
          for (const X of ae)
            z.has(X) || z.set(X, setTimeout(() => {
              z.delete(X), Fe((Q) => {
                if (!Q.has(X)) return Q;
                const ce = new Set(Q);
                return ce.delete(X), ce;
              });
            }, ui));
        },
        { root: c, rootMargin: li, threshold: 0 }
      );
      W.current = J;
      for (const H of Y.current.values())
        try {
          J.observe(H);
        } catch {
        }
      return () => {
        J.disconnect(), W.current === J && (W.current = null);
        for (const H of z.values()) clearTimeout(H);
        z.clear();
      };
    }, [c]), _e(() => {
      _(0), C(""), De(/* @__PURE__ */ new Set()), Fe(/* @__PURE__ */ new Set()), ue(/* @__PURE__ */ new Map()), Y.current.clear();
      const z = oe.current;
      for (const J of z.values()) clearTimeout(J);
      z.clear(), m == null || m(0, t);
    }, [k, m, t]);
    const Et = O(
      ({ numPages: z }) => {
        T.current === k && (_(z), C(""), m == null || m(z, t), d == null || d({ numPages: z, pane: t }));
      },
      [k, d, m, t]
    ), ut = O(
      (z) => {
        if (T.current !== k) return;
        const J = (z == null ? void 0 : z.message) || "PDF 解析失败";
        C(J), _(0), m == null || m(0, t), f == null || f(z, t);
      },
      [k, f, m, t]
    ), ve = q(
      () => I > 0 ? Array.from({ length: I }, (z, J) => J + 1) : [],
      [I]
    );
    $(() => {
      typeof IntersectionObserver < "u" || Fe(new Set(ve));
    }, [ve]);
    const Te = q(
      () => En(y, b, t),
      [y, b, t]
    ), Oe = q(() => {
      const z = /* @__PURE__ */ new Map();
      for (const J of h) {
        const H = En(J, b, t);
        if (!H) continue;
        const B = z.get(H.box.page) || [];
        B.push(H), z.set(H.box.page, B);
      }
      return z;
    }, [t, b, h]), dt = q(() => {
      if (I === 0) return /* @__PURE__ */ new Set();
      if (!(!!c && typeof IntersectionObserver < "u" && a)) return new Set(ve);
      if (de.size === 0) {
        const H = Math.min(I, _t * 2 + 1);
        return new Set(Array.from({ length: H }, (B, ae) => ae + 1));
      }
      const J = /* @__PURE__ */ new Set();
      for (const H of de)
        for (let B = -_t; B <= _t; B++) {
          const ae = H + B;
          ae >= 1 && ae <= I && J.add(ae);
        }
      return J;
    }, [I, ve, c, a, de]), oo = !n || !!N || !!L, ao = n && (N || L) || s;
    return /* @__PURE__ */ j(
      "section",
      {
        ref: G,
        className: `reader-panel ${Na}${a ? "" : " is-hidden"}`,
        [Je]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": a ? "true" : "false",
        "data-live-translation-status": (P == null ? void 0 : P.jobStatus) || void 0,
        "aria-hidden": a ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          w ? /* @__PURE__ */ S("div", { className: "reader-react-pdf-pane-action", children: w }) : null,
          p ? /* @__PURE__ */ j("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ S("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ S("span", { children: p })
          ] }) : null,
          oo && !D ? /* @__PURE__ */ S("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: ao }) : null,
          D ? /* @__PURE__ */ S("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          R && !N ? /* @__PURE__ */ S("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ S(
            $o,
            {
              file: R,
              loading: null,
              error: null,
              options: te,
              onLoadSuccess: Et,
              onLoadError: ut,
              className: "reader-react-pdf-document",
              children: ve.map((z) => {
                if (dt.has(z))
                  return /* @__PURE__ */ S(
                    ci,
                    {
                      pane: t,
                      pageNumber: z,
                      width: Z,
                      devicePixelRatio: le,
                      active: It.has(z),
                      syncedMinHeight: (l == null ? void 0 : l.get(z)) || 0,
                      onMetrics: u,
                      cachedAspect: ne.get(z),
                      onAspectChange: ye,
                      sentinelRef: lt(z),
                      regionHighlight: (Te == null ? void 0 : Te.box.page) === z ? Te : null,
                      regionTargets: Oe.get(z),
                      onSelectRegion: g,
                      liveTranslationLayout: P == null ? void 0 : P.layoutByPage.get(z - 1),
                      liveTranslationPage: P == null ? void 0 : P.pagesByPage.get(z - 1),
                      showLiveTranslation: v
                    },
                    `${t}-${z}`
                  );
                const H = ne.get(z) ?? zr, B = Math.max(120, Math.floor(Z * H)), ae = Math.max(B, Math.ceil((l == null ? void 0 : l.get(z)) || 0));
                return /* @__PURE__ */ S(
                  "div",
                  {
                    ref: lt(z),
                    [We]: z,
                    [Je]: t,
                    [rn]: B,
                    className: on,
                    style: {
                      width: Z,
                      height: ae,
                      minHeight: ae
                    },
                    children: /* @__PURE__ */ S(
                      "div",
                      {
                        className: vt,
                        style: { width: Z, height: B },
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
), Un = Yt(mi), Dr = Qt(null), Fr = Qt(null);
function hi({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ S(Dr.Provider, { value: e, children: /* @__PURE__ */ S(Fr.Provider, { value: t, children: n }) });
}
function ct() {
  return en(Dr);
}
function pi() {
  return en(Fr);
}
function gi({
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
function bi(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function yi(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function vi(e) {
  const t = ct(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", c = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, l = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), u = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, d = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? it, y = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, h = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), b = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, g = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, P = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, v = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", p = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", w = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, M = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, E = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), D = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), N = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), k = e.regions ?? (t == null ? void 0 : t.regions) ?? [], T = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), R = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), I = gi({
    mode: s,
    compareMode: c,
    showSource: i,
    showTranslated: l,
    markdownSplit: n,
    overlayOnSource: u
  }), _ = bi(
    y,
    n || r,
    typeof document > "u" ? y * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ S(
    "div",
    {
      ref: d,
      className: Sr,
      "data-reader-region-count": k.length,
      "data-reader-structured-region-count": k.filter(dr).length,
      "data-reader-metadata-ready": T ? "true" : "false",
      children: /* @__PURE__ */ j(
        "main",
        {
          className: `${Ca} reader-mode-${I.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            b ? /* @__PURE__ */ S(
              Un,
              {
                pane: "source",
                url: v,
                preloadedFile: w,
                userZoom: m,
                visible: I.showSource,
                scrollRoot: f,
                pageWidthOverride: _,
                rowHeights: I.compareMode ? h : void 0,
                onMetrics: E,
                emptyLabel: P ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: D,
                activeRegion: N,
                regions: k,
                readerMetadata: T,
                onSelectRegion: R,
                liveTranslation: u ? o : void 0,
                showLiveTranslation: u,
                liveTranslationPendingLabel: u ? yi(o) : "",
                paneAction: u ? /* @__PURE__ */ j(Zt, { children: [
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
            g ? /* @__PURE__ */ S(
              Un,
              {
                pane: "translated",
                url: p,
                preloadedFile: M,
                userZoom: m,
                visible: I.showTranslated,
                scrollRoot: f,
                pageWidthOverride: _,
                rowHeights: I.compareMode ? h : void 0,
                onMetrics: E,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: D,
                activeRegion: N,
                regions: k,
                readerMetadata: T,
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
const Si = [
  { id: "source", label: "源文件", Icon: hr },
  { id: "compare", label: "对照", Icon: pr },
  { id: "translated", label: "翻译文件", Icon: gr }
];
function Bn(e) {
  return `辅助面板占了右半边，对照只剩${e === "translated" ? "译文" : "原文"} · 点此关闭面板恢复对照`;
}
function wi(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function Pi(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Ri(e) {
  const t = ct(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null,
    compareDegraded: s = !1,
    onRestoreCompare: c
  } = e, i = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, l = a ? wi(a.state) : "";
  return /* @__PURE__ */ j("header", { className: "reader-workspace-bar", children: [
    a ? /* @__PURE__ */ j(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${a.state.connection}${a.visible ? " is-active" : ""}`,
        "aria-pressed": a.visible,
        "aria-label": a.visible ? "隐藏实时译文" : "显示实时译文",
        title: a.state.error || l,
        onClick: a.onToggle,
        children: [
          /* @__PURE__ */ S(Eo, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ S("span", { className: "reader-live-translation-toggle-label", children: l })
        ]
      }
    ) : null,
    /* @__PURE__ */ S("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: Si.map(({ id: u, label: d, Icon: f }) => {
      const m = n === u, y = Pi({
        id: u,
        documentReady: r,
        sourceViewOnly: i,
        liveTranslationAvailable: !!a
      });
      return /* @__PURE__ */ j(
        "button",
        {
          type: "button",
          className: `reader-workspace-tab${m ? " is-active" : ""}`,
          role: "tab",
          "aria-selected": m,
          "aria-label": d,
          title: y ? `${d} 需要文档任务` : d,
          disabled: y,
          onClick: () => o(u),
          children: [
            /* @__PURE__ */ S(f, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ S("span", { className: "reader-workspace-tab-label", children: d })
          ]
        },
        u
      );
    }) }),
    s ? /* @__PURE__ */ j(
      "button",
      {
        type: "button",
        className: "reader-compare-degraded",
        onClick: c,
        title: Bn(n),
        children: [
          /* @__PURE__ */ S(Mo, { size: 13, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ S("span", { className: "reader-compare-degraded-label", children: Bn(n) })
        ]
      }
    ) : null
  ] });
}
const Ti = {
  markdown: { label: "Markdown", short: "MD", Icon: Ao, needsJob: !0 }
}, Ii = Tr.map(
  (e) => ({ id: e, ...Ti[e] })
), Ei = {
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
    Icon: br,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    ariaLabel: "AI（agent 终端）",
    keepMounted: !0
  }
}, Or = Ir.map(
  (e) => ({ id: e, ...Ei[e] })
);
function Mi(e) {
  return [
    ...Ii.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: a
    })),
    ...Or.filter((t) => e(t.adapterKey)).map(({ id: t, label: n, short: r, Icon: o }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: !1
    }))
  ];
}
function Ai() {
  const e = fe();
  return Mi((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function ki(e) {
  const t = ct(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), c = Ai();
  return n ? /* @__PURE__ */ j("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ S("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: c.map(({ id: i, label: l, Icon: u, needsJob: d }) => {
      const f = n === i, m = d && o, y = r == null ? void 0 : r[i];
      return /* @__PURE__ */ j(
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
            /* @__PURE__ */ S(u, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ S("span", { className: "reader-assistant-dock-tab-label", children: l }),
            y ? /* @__PURE__ */ S("span", { className: "reader-assistant-dock-badge", children: y }) : null
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
        children: /* @__PURE__ */ S(tn, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ S("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: c.map(({ id: i, label: l, short: u, Icon: d, needsJob: f }) => {
    const m = f && o, y = r == null ? void 0 : r[i];
    return /* @__PURE__ */ j(
      "button",
      {
        type: "button",
        className: "reader-assistant-rail-button",
        "aria-label": `打开${l}`,
        title: m ? `${l} 需打开任务阅读` : l,
        disabled: m,
        onClick: () => a(i),
        children: [
          /* @__PURE__ */ S(d, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
          /* @__PURE__ */ S("span", { children: u }),
          y ? /* @__PURE__ */ S("span", { className: "reader-assistant-dock-badge", children: y }) : null
        ]
      },
      i
    );
  }) });
}
function Li(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function Ci(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function Ni(e) {
  return e / 100 * window.innerHeight;
}
function _i(e) {
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
function Xe({
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
      r = Ci(t, o);
      break;
    }
    case "em": {
      r = Li(t, o);
      break;
    }
    case "vh": {
      r = Ni(o);
      break;
    }
    case "vw": {
      r = _i(o);
      break;
    }
  }
  return r;
}
function ie(e) {
  return parseFloat(e.toFixed(3));
}
function Ve({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, o) => (r += t === "horizontal" ? o.element.offsetWidth : o.element.offsetHeight, r), 0);
}
function Vt(e) {
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
      const u = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.collapsedSize
      });
      s = ie(u / n * 100);
    }
    let c;
    if (a.defaultSize !== void 0) {
      const u = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      c = ie(u / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const u = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.minSize
      });
      i = ie(u / n * 100);
    }
    let l = 100;
    if (a.maxSize !== void 0) {
      const u = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      l = ie(u / n * 100);
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
function V(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function qt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? zi : Di
  );
}
function zi(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function Di(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function $r(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function jr(e, t) {
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
function Fi({
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
    const { x: c, y: i } = jr(r, s), l = e === "horizontal" ? c : i;
    l < a && (a = l, o = s);
  }
  return V(o, "No rect found"), o;
}
let ht;
function Oi() {
  return ht === void 0 && (typeof matchMedia == "function" ? ht = !!matchMedia("(pointer:coarse)").matches : ht = !1), ht;
}
function Ur(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = qt(
    n,
    Array.from(t.children).filter($r).map((y) => ({ element: y }))
  ).map(({ element: y }) => y), s = [];
  let c = !1, i = !1, l = -1, u = -1, d = 0, f, m = [];
  {
    let y = -1;
    for (const h of a)
      h.hasAttribute("data-panel") && (y++, h.hasAttribute("data-disabled") || (d++, l === -1 && (l = y), u = y));
  }
  if (d > 1) {
    let y = -1;
    for (const h of a)
      if (h.hasAttribute("data-panel")) {
        y++;
        const b = r.find(
          (g) => g.element === h
        );
        if (b) {
          if (f) {
            const g = f.element.getBoundingClientRect(), P = h.getBoundingClientRect();
            let v;
            if (i) {
              const p = n === "horizontal" ? new DOMRect(
                g.right,
                g.top,
                0,
                g.height
              ) : new DOMRect(
                g.left,
                g.bottom,
                g.width,
                0
              ), w = n === "horizontal" ? new DOMRect(P.left, P.top, 0, P.height) : new DOMRect(P.left, P.top, P.width, 0);
              switch (m.length) {
                case 0: {
                  v = [
                    p,
                    w
                  ];
                  break;
                }
                case 1: {
                  const M = m[0], E = Fi({
                    orientation: n,
                    rects: [g, P],
                    targetRect: M.element.getBoundingClientRect()
                  });
                  v = [
                    M,
                    E === g ? w : p
                  ];
                  break;
                }
                default: {
                  v = m;
                  break;
                }
              }
            } else
              m.length ? v = m : v = [
                n === "horizontal" ? new DOMRect(
                  g.right,
                  P.top,
                  P.left - g.right,
                  P.height
                ) : new DOMRect(
                  P.left,
                  g.bottom,
                  P.width,
                  P.top - g.bottom
                )
              ];
            for (const p of v) {
              let w = "width" in p ? p : p.element.getBoundingClientRect();
              const M = Oi() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (w.width < M) {
                const D = M - w.width;
                w = new DOMRect(
                  w.x - D / 2,
                  w.y,
                  w.width + D,
                  w.height
                );
              }
              if (w.height < M) {
                const D = M - w.height;
                w = new DOMRect(
                  w.x,
                  w.y - D / 2,
                  w.width,
                  w.height + D
                );
              }
              const E = y <= l || y > u;
              !c && !E && s.push({
                group: e,
                groupSize: Ve({ group: e }),
                panels: [f, b],
                separator: "width" in p ? void 0 : p,
                rect: w
              }), c = !1;
            }
          }
          i = !1, f = b, m = [];
        }
      } else if (h.hasAttribute("data-separator")) {
        h.ariaDisabled !== null && (c = !0);
        const b = o.find(
          (g) => g.element === h
        );
        b ? m.push(b) : (f = void 0, m = []);
      } else
        i = !0;
  }
  return s;
}
var Ee;
class Br {
  constructor() {
    Tn(this, Ee, {});
  }
  addListener(t, n) {
    const r = Ge(this, Ee)[t];
    return r === void 0 ? Ge(this, Ee)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = Ge(this, Ee)[t];
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
    In(this, Ee, {});
  }
  removeListener(t, n) {
    const r = Ge(this, Ee)[t];
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
const ln = new Br();
function Le() {
  return Be;
}
function $i(e) {
  return ln.addListener("change", e);
}
function ji(e) {
  const t = Be, n = { ...Be };
  n.cursorFlags = e, Be = n, ln.emit("change", {
    prev: t,
    next: n
  });
}
function He(e) {
  const t = Be;
  Be = e, ln.emit("change", {
    prev: t,
    next: e
  });
}
const Ui = (e) => e, xt = () => {
}, Hr = 1, Wr = 2, Jr = 4, Vr = 8, Hn = 3, Wn = 12;
let pt;
function Jn() {
  return pt === void 0 && (pt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (pt = !0)), pt;
}
function Bi({
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
        if (e && Jn()) {
          const a = (e & Hr) !== 0, s = (e & Wr) !== 0, c = (e & Jr) !== 0, i = (e & Vr) !== 0;
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
    return Jn() ? r > 0 && o > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && o > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const Vn = /* @__PURE__ */ new WeakMap();
function un(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = Vn.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = Le();
  switch (r.state) {
    case "active":
    case "hover": {
      const o = Bi({
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
  Vn.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let be = /* @__PURE__ */ new Map();
const qr = new Br();
function Hi(e) {
  be = new Map(be), be.delete(e);
}
function qn(e, t) {
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
function xe() {
  return be;
}
function dn(e, t) {
  return qr.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Re(e, t, n) {
  const r = be.get(e);
  be = new Map(be), be.set(e, t), qr.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function Gr(e) {
  const t = Le();
  let n = !1;
  switch (t.state) {
    case "active":
      He({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (un(e), n = !0, t.hitRegions.forEach((r) => {
        const o = Me(r.group.id, !0);
        Re(r.group, o, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function Gn(e) {
  e.defaultPrevented || Gr(e.currentTarget);
}
function Wi(e, t, n) {
  let r, o = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const s = jr(n, a.rect);
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
function Ji(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function Vi(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: Yn(e),
    b: Yn(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  V(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const o = {
    a: Zn(Kn(n.a)),
    b: Zn(Kn(n.b))
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
const qi = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function Gi(e) {
  const t = getComputedStyle(Kr(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function Ki(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || Gi(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || qi.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function Kn(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (V(n, "Missing node"), Ki(n)) return n;
  }
  return null;
}
function Zn(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function Yn(e) {
  const t = [];
  for (; e; )
    t.push(e), e = Kr(e);
  return t;
}
function Kr(e) {
  const { parentNode: t } = e;
  return Ji(t) ? t.host : t;
}
function Zi(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function Yi({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!$r(n) || n.contains(e) || e.contains(n))
    return !0;
  if (Vi(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (Zi(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function fn(e, t) {
  const n = [];
  return t.forEach((r, o) => {
    if (o.disabled)
      return;
    const a = Ur(o), s = Wi(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && Yi({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function Xi(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function se(e, t, n = 0) {
  return Math.abs(ie(e) - ie(t)) <= n;
}
function ge(e, t) {
  return se(e, t) ? 0 : e > t ? 1 : -1;
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
  return r = Math.min(c, r), r = ie(r), r;
}
function ot({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: o,
  trigger: a
}) {
  if (se(e, 0))
    return t;
  const s = a === "imperative-api", c = Object.values(t), i = Object.values(o), l = [...c], [u, d] = r;
  V(u != null, "Invalid first pivot index"), V(d != null, "Invalid second pivot index");
  let f = 0;
  switch (a) {
    case "keyboard": {
      {
        const h = e < 0 ? d : u, b = n[h];
        V(
          b,
          `Panel constraints not found for index ${h}`
        );
        const {
          collapsedSize: g = 0,
          collapsible: P,
          minSize: v = 0
        } = b;
        if (P) {
          const p = c[h];
          if (V(
            p != null,
            `Previous layout not found for panel index ${h}`
          ), se(p, g)) {
            const w = v - p;
            ge(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      {
        const h = e < 0 ? u : d, b = n[h];
        V(
          b,
          `No panel constraints found for index ${h}`
        );
        const {
          collapsedSize: g = 0,
          collapsible: P,
          minSize: v = 0
        } = b;
        if (P) {
          const p = c[h];
          if (V(
            p != null,
            `Previous layout not found for panel index ${h}`
          ), se(p, v)) {
            const w = p - g;
            ge(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      break;
    }
    default: {
      const h = e < 0 ? d : u, b = n[h];
      V(
        b,
        `Panel constraints not found for index ${h}`
      );
      const g = c[h], { collapsible: P, collapsedSize: v, minSize: p } = b;
      if (P && ge(g, p) < 0)
        if (e > 0) {
          const w = p - v, M = w / 2, E = g + e;
          ge(E, p) < 0 && (e = ge(e, M) <= 0 ? 0 : w);
        } else {
          const w = p - v, M = 100 - w / 2, E = g - e;
          ge(E, p) < 0 && (e = ge(100 + e, M) > 0 ? 0 : -w);
        }
      break;
    }
  }
  {
    const h = e < 0 ? 1 : -1;
    let b = e < 0 ? d : u, g = 0;
    for (; ; ) {
      const v = c[b];
      V(
        v != null,
        `Previous layout not found for panel index ${b}`
      );
      const p = Ue({
        overrideDisabledPanels: s,
        panelConstraints: n[b],
        prevSize: v,
        size: 100
      }) - v;
      if (g += p, b += h, b < 0 || b >= n.length)
        break;
    }
    const P = Math.min(Math.abs(e), Math.abs(g));
    e = e < 0 ? 0 - P : P;
  }
  {
    let h = e < 0 ? u : d;
    for (; h >= 0 && h < n.length; ) {
      const b = Math.abs(e) - Math.abs(f), g = c[h];
      V(
        g != null,
        `Previous layout not found for panel index ${h}`
      );
      const P = g - b, v = Ue({
        overrideDisabledPanels: s,
        panelConstraints: n[h],
        prevSize: g,
        size: P
      });
      if (!se(g, v) && (f += g - v, l[h] = v, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? h-- : h++;
    }
  }
  if (Xi(i, l))
    return o;
  {
    const h = e < 0 ? d : u, b = c[h];
    V(
      b != null,
      `Previous layout not found for panel index ${h}`
    );
    const g = b + f, P = Ue({
      overrideDisabledPanels: s,
      panelConstraints: n[h],
      prevSize: b,
      size: g
    });
    if (l[h] = P, !se(P, g)) {
      let v = g - P, p = e < 0 ? d : u;
      for (; p >= 0 && p < n.length; ) {
        const w = l[p];
        V(
          w != null,
          `Previous layout not found for panel index ${p}`
        );
        const M = w + v, E = Ue({
          overrideDisabledPanels: s,
          panelConstraints: n[p],
          prevSize: w,
          size: M
        });
        if (se(w, E) || (v -= E - w, l[p] = E), se(v, 0))
          break;
        e > 0 ? p-- : p++;
      }
    }
  }
  const m = Object.values(l).reduce(
    (h, b) => b + h,
    0
  );
  if (!se(m, 100, 0.1))
    return o;
  const y = Object.keys(o);
  return l.reduce((h, b, g) => (h[y[g]] = b, h), {});
}
function Ce(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || ge(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function Ne({
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
  if (!se(o, 100) && r.length > 0)
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      V(i != null, `No layout data found for index ${c}`);
      const l = 100 / o * i;
      r[c] = l;
    }
  let a = 0;
  for (let c = 0; c < t.length; c++) {
    const i = n[c];
    V(i != null, `No layout data found for index ${c}`);
    const l = r[c];
    V(l != null, `No layout data found for index ${c}`);
    const u = Ue({
      overrideDisabledPanels: !0,
      panelConstraints: t[c],
      prevSize: i,
      size: l
    });
    l != u && (a += l - u, r[c] = u);
  }
  if (!se(a, 0))
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      V(i != null, `No layout data found for index ${c}`);
      const l = i + a, u = Ue({
        overrideDisabledPanels: !0,
        panelConstraints: t[c],
        prevSize: i,
        size: l
      });
      if (i !== u && (a -= u - i, r[c] = u, se(a, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((c, i, l) => (c[s[l]] = i, c), {});
}
function Zr({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const i = xe();
    for (const [
      l,
      {
        defaultLayoutDeferred: u,
        derivedPanelConstraints: d,
        layout: f,
        groupSize: m,
        separatorToPanels: y
      }
    ] of i)
      if (l.id === e)
        return {
          defaultLayoutDeferred: u,
          derivedPanelConstraints: d,
          group: l,
          groupSize: m,
          layout: f,
          separatorToPanels: y
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
    prevLayout: u,
    derivedPanelConstraints: d
  }) => {
    const f = a(), m = l.findIndex((b) => b.id === t), y = m === 0, h = m === l.length - 1;
    if (h && i < f && (y || l.slice(0, m).every((b, g) => {
      const P = d[g];
      return (P == null ? void 0 : P.collapsible) && se(P.collapsedSize, u[P.panelId]);
    }))) {
      const b = l.slice(0, m).reduce((g, P) => g + u[P.id], 0);
      return {
        ...u,
        [t]: ie(100 - b)
      };
    }
    return ot({
      delta: h ? f - i : i - f,
      initialLayout: u,
      panelConstraints: d,
      pivotIndices: h ? [m - 1, m] : [m, m + 1],
      prevLayout: u,
      trigger: "imperative-api"
    });
  }, c = (i) => {
    const l = a();
    if (i === l)
      return;
    const {
      defaultLayoutDeferred: u,
      derivedPanelConstraints: d,
      group: f,
      groupSize: m,
      layout: y,
      separatorToPanels: h
    } = n(), b = s({
      nextSize: i,
      panels: f.panels,
      prevLayout: y,
      derivedPanelConstraints: d
    }), g = Ne({
      layout: b,
      panelConstraints: d
    });
    Ce(y, g) || Re(f, {
      defaultLayoutDeferred: u,
      derivedPanelConstraints: d,
      groupSize: m,
      layout: g,
      separatorToPanels: h
    });
  };
  return {
    collapse: () => {
      const { collapsible: i, collapsedSize: l } = r(), { mutableValues: u } = o(), d = a();
      i && d !== l && (u.expandToSize = d, c(l));
    },
    expand: () => {
      const { collapsible: i, collapsedSize: l, minSize: u } = r(), { mutableValues: d } = o(), f = a();
      if (i && f === l) {
        let m = d.expandToSize ?? u;
        m === 0 && (m = 1), c(m);
      }
    },
    getSize: () => {
      const { group: i } = n(), l = a(), { element: u } = o(), d = i.orientation === "horizontal" ? u.offsetWidth : u.offsetHeight;
      return {
        asPercentage: l,
        inPixels: d
      };
    },
    isCollapsed: () => {
      const { collapsible: i, collapsedSize: l } = r(), u = a();
      return i && se(l, u);
    },
    resize: (i) => {
      const { group: l } = n(), { element: u } = o(), d = Ve({ group: l }), f = Xe({
        groupSize: d,
        panelElement: u,
        styleProp: i
      }), m = ie(f / d * 100);
      c(m);
    }
  };
}
function Xn(e) {
  if (e.defaultPrevented)
    return;
  const t = xe();
  fn(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (o) => o.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const o = r.panelConstraints.defaultSize, a = Zr({
          groupId: n.group.id,
          panelId: r.id
        });
        a && o !== void 0 && (a.resize(o), e.preventDefault());
      }
    }
  });
}
function gt(e) {
  const t = xe();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function Yr({
  groupId: e
}) {
  const t = () => {
    const n = xe();
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
      } = t(), l = Ne({
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
    (u) => u.element === e
  );
  V(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  V(a, "Matching panels not found");
  const s = a.map((u) => n.panels.indexOf(u)), c = Yr({ groupId: n.id }).getLayout(), i = ot({
    delta: t,
    initialLayout: c,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: c,
    trigger: "keyboard"
  }), l = Ne({
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
function Qn(e) {
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
        V(i, "Matching separator not found");
        const l = c.get(i);
        V(l, "Matching panels not found");
        const u = l[0], d = a.find(
          (f) => f.panelId === u.id
        );
        if (V(d, "Panel metadata not found"), d.collapsible) {
          const f = s[u.id], m = d.collapsedSize === f ? r.mutableState.expandedPanelSizes[u.id] ?? d.minSize : d.collapsedSize;
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
        V(o !== null, "Index not found");
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
function er(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = xe(), n = fn(e, t), r = /* @__PURE__ */ new Map();
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
function Xr({
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
    const { group: u, groupSize: d } = l, { orientation: f, panels: m } = u, { disableCursor: y } = u.mutableState;
    let h = 0;
    a ? f === "horizontal" ? h = (t.clientX - a.x) / d * 100 : h = (t.clientY - a.y) / d * 100 : f === "horizontal" ? h = t.clientX < 0 ? -100 : 100 : h = t.clientY < 0 ? -100 : 100;
    const b = r.get(u), g = o.get(u);
    if (!b || !g)
      return;
    const {
      defaultLayoutDeferred: P,
      derivedPanelConstraints: v,
      groupSize: p,
      layout: w,
      separatorToPanels: M
    } = g;
    if (v && w && M) {
      const E = ot({
        delta: h,
        initialLayout: b,
        panelConstraints: v,
        pivotIndices: l.panels.map((D) => m.indexOf(D)),
        prevLayout: w,
        trigger: "mouse-or-touch"
      });
      if (Ce(E, w)) {
        if (h !== 0 && !y)
          switch (f) {
            case "horizontal": {
              c |= h < 0 ? Hr : Wr;
              break;
            }
            case "vertical": {
              c |= h < 0 ? Jr : Vr;
              break;
            }
          }
      } else
        Re(l.group, {
          defaultLayoutDeferred: P,
          derivedPanelConstraints: v,
          groupSize: p,
          layout: E,
          separatorToPanels: M
        });
    }
  });
  let i = 0;
  t.movementX === 0 ? i |= s & Hn : i |= c & Hn, t.movementY === 0 ? i |= s & Wn : i |= c & Wn, ji(i), un(e);
}
function tr(e) {
  const t = xe(), n = Le();
  switch (n.state) {
    case "active":
      Xr({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function nr(e) {
  var r, o;
  if (e.defaultPrevented)
    return;
  const t = Le(), n = xe();
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
      Xr({
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
      const a = fn(e, n);
      a.length === 0 ? t.state !== "inactive" && He({
        cursorFlags: 0,
        state: "inactive"
      }) : He({
        cursorFlags: 0,
        hitRegions: a,
        state: "hover"
      }), un(e.currentTarget);
      break;
    }
  }
}
function rr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (Le().state) {
      case "hover":
        He({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function or(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || Gr(e.currentTarget) && e.preventDefault();
}
function ar(e) {
  let t = 0, n = 0;
  const r = {};
  for (const a of e)
    if (a.defaultSize !== void 0) {
      t++;
      const s = ie(a.defaultSize);
      n += s, r[a.panelId] = s;
    } else
      r[a.panelId] = void 0;
  const o = e.length - t;
  if (o !== 0) {
    const a = ie((100 - n) / o);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = a);
  }
  return r;
}
function Qi(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = Ve({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, c = {
    asPercentage: ie(a / o * 100),
    inPixels: a
  };
  r.mutableValues.prevSize = c, r.onResize(c, r.id, s);
}
function ec(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function tc({
  group: e,
  nextGroupSize: t,
  prevGroupSize: n,
  prevLayout: r
}) {
  if (n <= 0 || t <= 0 || n === t)
    return r;
  let o = 0, a = 0, s = !1;
  const c = /* @__PURE__ */ new Map(), i = [];
  for (const d of e.panels) {
    const f = r[d.id] ?? 0;
    switch (d.panelConstraints.groupResizeBehavior) {
      case "preserve-pixel-size": {
        s = !0;
        const m = f / 100 * n, y = ie(
          m / t * 100
        );
        c.set(d.id, y), o += y;
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
  const l = 100 - o, u = { ...r };
  if (c.forEach((d, f) => {
    u[f] = d;
  }), a > 0)
    for (const d of i) {
      const f = r[d] ?? 0;
      u[d] = ie(
        f / a * l
      );
    }
  else {
    const d = ie(
      l / i.length
    );
    for (const f of i)
      u[f] = d;
  }
  return u;
}
function nc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const $e = /* @__PURE__ */ new Map();
function rc(e) {
  let t = !0;
  V(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new n((y) => {
    for (const h of y) {
      const { borderBoxSize: b, target: g } = h;
      if (g === e.element) {
        if (t) {
          const P = Ve({ group: e });
          if (P === 0)
            return;
          const v = Me(e.id);
          if (!v)
            return;
          const p = Vt(e), w = v.defaultLayoutDeferred ? ar(p) : v.layout, M = tc({
            group: e,
            nextGroupSize: P,
            prevGroupSize: v.groupSize,
            prevLayout: w
          }), E = Ne({
            layout: M,
            panelConstraints: p
          });
          if (!v.defaultLayoutDeferred && Ce(v.layout, E) && ec(
            v.derivedPanelConstraints,
            p
          ) && v.groupSize === P)
            return;
          Re(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: p,
            groupSize: P,
            layout: E,
            separatorToPanels: v.separatorToPanels
          });
        }
      } else
        Qi(e, g, b);
    }
  });
  a.observe(e.element), e.panels.forEach((y) => {
    V(
      !r.has(y.id),
      `Panel ids must be unique; id "${y.id}" was used more than once`
    ), r.add(y.id), y.onResize && a.observe(y.element);
  });
  const s = Ve({ group: e }), c = Vt(e), i = e.panels.map(({ id: y }) => y).join(",");
  let l = e.mutableState.defaultLayout;
  l && (nc(e.panels, l) || (l = void 0));
  const u = e.mutableState.layouts[i] ?? l ?? ar(c), d = Ne({
    layout: u,
    panelConstraints: c
  }), f = e.element.ownerDocument;
  $e.set(
    f,
    ($e.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return Ur(e).forEach((y) => {
    y.separator && m.set(y.separator, y.panels);
  }), Re(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: c,
    groupSize: s,
    layout: d,
    separatorToPanels: m
  }), e.separators.forEach((y) => {
    V(
      !o.has(y.id),
      `Separator ids must be unique; id "${y.id}" was used more than once`
    ), o.add(y.id), y.element.addEventListener("keydown", Qn);
  }), $e.get(f) === 1 && (f.addEventListener("contextmenu", Gn, !0), f.addEventListener("dblclick", Xn, !0), f.addEventListener("pointerdown", er, !0), f.addEventListener("pointerleave", tr), f.addEventListener("pointermove", nr), f.addEventListener("pointerout", rr), f.addEventListener("pointerup", or, !0)), function() {
    t = !1, $e.set(
      f,
      Math.max(0, ($e.get(f) ?? 0) - 1)
    ), Hi(e), e.separators.forEach((y) => {
      y.element.removeEventListener("keydown", Qn);
    }), $e.get(f) || (f.removeEventListener(
      "contextmenu",
      Gn,
      !0
    ), f.removeEventListener(
      "dblclick",
      Xn,
      !0
    ), f.removeEventListener(
      "pointerdown",
      er,
      !0
    ), f.removeEventListener("pointerleave", tr), f.removeEventListener("pointermove", nr), f.removeEventListener("pointerout", rr), f.removeEventListener("pointerup", or, !0)), a.disconnect();
  };
}
function oc() {
  const [e, t] = x({}), n = O(() => t({}), []);
  return [e, n];
}
function mn(e) {
  const t = ur();
  return `${e ?? t}`;
}
const ze = typeof window < "u" ? _e : $;
function et(e) {
  const t = A(e);
  return ze(() => {
    t.current = e;
  }, [e]), O(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function hn(...e) {
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
function pn(e) {
  const t = A({ ...e });
  return ze(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const Qr = Qt(null);
function ac(e, t) {
  const n = A({
    getLayout: () => ({}),
    setLayout: Ui
  });
  Xt(t, () => n.current, []), ze(() => {
    Object.assign(
      n.current,
      Yr({ groupId: e })
    );
  });
}
function eo({
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
  orientation: u = "horizontal",
  resizeTargetMinimumSize: d = {
    coarse: 20,
    fine: 10
  },
  style: f,
  ...m
}) {
  const y = A({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), h = et((T) => {
    Ce(y.current.onLayoutChange, T) || (y.current.onLayoutChange = T, i == null || i(T));
  }), b = et(
    (T, R) => {
      Ce(y.current.onLayoutChanged, T) || (y.current.onLayoutChanged = T, l == null || l(T, { isUserInteraction: R }));
    }
  ), g = mn(c), P = A(null), [v, p] = oc(), w = A({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: d,
    separators: []
  }), M = hn(P, a);
  ac(g, s);
  const E = et(
    (T, R) => {
      const I = Le(), _ = qn(T), L = Me(T);
      if (L) {
        let C = !1;
        switch (I.state) {
          case "active": {
            C = I.hitRegions.some(
              (U) => U.group === _
            );
            break;
          }
        }
        return {
          flexGrow: L.layout[R] ?? 1,
          pointerEvents: C ? "none" : void 0
        };
      }
      if (n != null && n[R])
        return {
          flexGrow: n == null ? void 0 : n[R]
        };
    }
  ), D = pn({
    defaultLayout: n,
    disableCursor: r
  }), N = q(
    () => ({
      get disableCursor() {
        return !!D.disableCursor;
      },
      getPanelStyles: E,
      id: g,
      orientation: u,
      registerPanel: (T) => {
        const R = w.current;
        return R.panels = qt(u, [
          ...R.panels,
          T
        ]), p(), () => {
          R.panels = R.panels.filter(
            (I) => I !== T
          ), p();
        };
      },
      registerSeparator: (T) => {
        const R = w.current;
        return R.separators = qt(u, [
          ...R.separators,
          T
        ]), p(), () => {
          R.separators = R.separators.filter(
            (I) => I !== T
          ), p();
        };
      },
      updatePanelProps: (T, { disabled: R }) => {
        const I = w.current.panels.find(
          (C) => C.id === T
        );
        I && (I.panelConstraints.disabled = R);
        const _ = qn(g), L = Me(g);
        _ && L && Re(_, {
          ...L,
          derivedPanelConstraints: Vt(_)
        });
      },
      updateSeparatorProps: (T, {
        disabled: R,
        disableDoubleClick: I
      }) => {
        const _ = w.current.separators.find(
          (L) => L.id === T
        );
        _ && (_.disabled = R, _.disableDoubleClick = I);
      }
    }),
    [E, g, p, u, D]
  ), k = A(null);
  return ze(() => {
    const T = P.current;
    if (T === null)
      return;
    const R = w.current;
    let I;
    if (D.defaultLayout !== void 0 && Object.keys(D.defaultLayout).length === R.panels.length) {
      I = {};
      for (const re of R.panels) {
        const F = D.defaultLayout[re.id];
        F !== void 0 && (I[re.id] = F);
      }
    }
    const _ = {
      disabled: !!o,
      element: T,
      id: g,
      mutableState: {
        defaultLayout: I,
        disableCursor: !!D.disableCursor,
        expandedPanelSizes: w.current.lastExpandedPanelSizes,
        layouts: w.current.layouts
      },
      orientation: u,
      panels: R.panels,
      resizeTargetMinimumSize: R.resizeTargetMinimumSize,
      separators: R.separators
    };
    k.current = _;
    const L = rc(_), { defaultLayoutDeferred: C, derivedPanelConstraints: U, layout: G } = Me(_.id, !0);
    !C && U.length > 0 && (h(G), b(G, !1));
    const K = dn(g, (re) => {
      const { defaultLayoutDeferred: F, derivedPanelConstraints: ee, layout: le } = re.next;
      if (F || ee.length === 0)
        return;
      const te = _.panels.map(({ id: ne }) => ne).join(",");
      _.mutableState.layouts[te] = le, ee.forEach((ne) => {
        if (ne.collapsible) {
          const { layout: ue } = re.prev ?? {};
          if (ue) {
            const de = se(
              ne.collapsedSize,
              le[ne.panelId]
            ), De = se(
              ne.collapsedSize,
              ue[ne.panelId]
            );
            de && !De && (_.mutableState.expandedPanelSizes[ne.panelId] = ue[ne.panelId]);
          }
        }
      });
      const Z = Le().state !== "active";
      h(le), Z && b(le, re.isUserInteraction);
    });
    return () => {
      k.current = null, L(), K();
    };
  }, [
    o,
    g,
    b,
    h,
    u,
    v,
    D
  ]), $(() => {
    const T = k.current;
    T && (T.mutableState.defaultLayout = n, T.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ S(Qr.Provider, { value: N, children: /* @__PURE__ */ S(
    "div",
    {
      ...m,
      className: t,
      "data-group": !0,
      "data-testid": g,
      id: g,
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
eo.displayName = "Group";
function gn() {
  const e = en(Qr);
  return V(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function sc(e, t) {
  const { id: n } = gn(), r = A({
    collapse: xt,
    expand: xt,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: xt
  });
  Xt(t, () => r.current, []), ze(() => {
    Object.assign(
      r.current,
      Zr({ groupId: n, panelId: e })
    );
  });
}
function Gt({
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
  minSize: u = "0%",
  onResize: d,
  panelRef: f,
  style: m,
  ...y
}) {
  const h = !!i, b = mn(i), g = pn({
    disabled: a
  }), P = A(null), v = hn(P, s), {
    getPanelStyles: p,
    id: w,
    orientation: M,
    registerPanel: E,
    updatePanelProps: D
  } = gn(), N = d !== null, k = et(
    (_, L, C) => {
      d == null || d(_, i, C);
    }
  );
  ze(() => {
    const _ = P.current;
    if (_ !== null) {
      const L = {
        element: _,
        id: b,
        idIsStable: h,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: N ? k : void 0,
        panelConstraints: {
          groupResizeBehavior: c,
          collapsedSize: n,
          collapsible: r,
          defaultSize: o,
          disabled: g.disabled,
          maxSize: l,
          minSize: u
        }
      };
      return E(L);
    }
  }, [
    c,
    n,
    r,
    o,
    N,
    b,
    h,
    l,
    u,
    k,
    E,
    g
  ]), $(() => {
    D(b, { disabled: a });
  }, [a, b, D]), sc(b, f);
  const T = () => {
    const _ = p(w, b);
    if (_)
      return JSON.stringify(_);
  }, R = io(
    (_) => dn(w, _),
    T,
    T
  );
  let I;
  return R ? I = JSON.parse(R) : o !== void 0 ? I = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: o
  } : I = { flexGrow: 1 }, /* @__PURE__ */ S(
    "div",
    {
      ...y,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": b,
      id: b,
      ref: v,
      style: {
        ...ic,
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
Gt.displayName = "Panel";
const ic = {
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
function cc({
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
    const i = c.maxSize, l = c.collapsible ? c.collapsedSize : c.minSize, u = [r, r + 1];
    a = Ne({
      layout: ot({
        delta: l - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: u,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], o = Ne({
      layout: ot({
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
function to({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: o,
  id: a,
  style: s,
  ...c
}) {
  const i = mn(a), l = pn({
    disabled: n,
    disableDoubleClick: r
  }), [u, d] = x({}), [f, m] = x("inactive"), [y, h] = x(!1), b = A(null), g = hn(b, o), {
    disableCursor: P,
    id: v,
    orientation: p,
    registerSeparator: w,
    updateSeparatorProps: M
  } = gn(), E = p === "horizontal" ? "vertical" : "horizontal";
  ze(() => {
    const k = b.current;
    if (k !== null) {
      const T = {
        disabled: l.disabled,
        disableDoubleClick: l.disableDoubleClick,
        element: k,
        id: i
      }, R = w(T), I = $i(
        (L) => {
          m(
            L.next.state !== "inactive" && L.next.hitRegions.some(
              (C) => C.separator === T
            ) ? L.next.state : "inactive"
          );
        }
      ), _ = dn(
        v,
        (L) => {
          const { derivedPanelConstraints: C, layout: U, separatorToPanels: G } = L.next, K = G.get(T);
          if (K) {
            const re = K[0], F = K.indexOf(re);
            d(
              cc({
                layout: U,
                panelConstraints: C,
                panelId: re.id,
                panelIndex: F
              })
            );
          }
        }
      );
      return () => {
        I(), _(), R();
      };
    }
  }, [v, i, w, l]), $(() => {
    M(i, { disabled: n, disableDoubleClick: r });
  }, [n, r, i, M]);
  let D;
  n && !P && (D = "not-allowed");
  let N;
  if (n)
    N = "disabled";
  else
    switch (f) {
      case "active": {
        N = "active";
        break;
      }
      default:
        y ? N = "focus" : N = f;
    }
  return /* @__PURE__ */ S(
    "div",
    {
      ...c,
      "aria-controls": u.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": E,
      "aria-valuemax": u.valueMax,
      "aria-valuemin": u.valueMin,
      "aria-valuenow": u.valueNow,
      children: e,
      className: t,
      "data-separator": N,
      "data-testid": i,
      id: i,
      onBlur: () => h(!1),
      onFocus: () => h(!0),
      ref: g,
      role: "separator",
      style: {
        flexBasis: "auto",
        cursor: D,
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
to.displayName = "Separator";
const bn = 30, yn = 65, at = 50, lc = 100 - yn, uc = 100 - bn;
function dc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(yn, Math.max(bn, t)) : at;
}
function vn(e) {
  return 100 - e;
}
function je(e) {
  return `${e}%`;
}
const Sn = "reader-document", st = "reader-assistant", no = "retainpdf.reader.ai-split-layout.v1", fc = {
  [Sn]: vn(at),
  [st]: at
};
function wn(e) {
  const t = dc(e == null ? void 0 : e[st]);
  return {
    [Sn]: vn(t),
    [st]: t
  };
}
function mc() {
  try {
    const e = JSON.parse(localStorage.getItem(no) || "null");
    return wn(e);
  } catch {
    return fc;
  }
}
function hc(e) {
  try {
    localStorage.setItem(no, JSON.stringify(wn(e)));
  } catch {
  }
}
function zt(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = wn(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[st]}vw`
  );
}
function pc() {
  const e = A(null), [t] = x(mc);
  _e(() => {
    const o = e.current;
    return zt(o, t), () => {
      var a;
      (a = o == null ? void 0 : o.closest(".reader-react-root")) == null || a.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = O((o) => {
    zt(e.current, o);
  }, []), r = O((o, a) => {
    zt(e.current, o), a.isUserInteraction && hc(o);
  }, []);
  return /* @__PURE__ */ j(
    eo,
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
          Gt,
          {
            id: Sn,
            defaultSize: je(vn(at)),
            minSize: je(lc),
            maxSize: je(uc)
          }
        ),
        /* @__PURE__ */ S(
          to,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ S("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ S(
          Gt,
          {
            id: st,
            defaultSize: je(at),
            minSize: je(bn),
            maxSize: je(yn)
          }
        )
      ]
    }
  );
}
function gc({
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
      var d;
      if (l.key !== "Escape") return;
      const u = l.target;
      (d = u == null ? void 0 : u.closest) != null && d.call(u, "textarea, input, select, [contenteditable='true']") || (l.preventDefault(), a());
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [t, a]), !t && !o ? null : /* @__PURE__ */ j(
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
        /* @__PURE__ */ S("div", { className: "reader-notes-panel-body", children: c })
      ]
    }
  );
}
function bc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = x(!1);
  if ($(() => {
    !e && !t && r(!1);
  }, [e, t]), n || !e && !t)
    return null;
  const o = [
    e ? "译文区域" : "",
    t ? "阅读元数据" : ""
  ].filter(Boolean);
  return /* @__PURE__ */ j("div", { className: "reader-error-notice", role: "status", "data-reader-error-notice": "true", children: [
    /* @__PURE__ */ j("span", { className: "reader-error-notice-text", children: [
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
function yc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ S(bc, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ j(Zt, { children: [
    e ? /* @__PURE__ */ S("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ j("div", { className: "reader-boot-loading-card", children: [
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
function vc(e) {
  if (e.selectionType !== "region") return null;
  const t = `${e.region.source.text || ""}`.trim(), n = `${e.region.translated.text || ""}`.trim();
  return !t || !n || t === n ? null : { source: t, translated: n };
}
function Sc(e, t) {
  const n = e.selectionType === "text" ? "text" : e.kind, r = vc(e), o = r != null, a = o && t ? t : e.pane, s = r ? r[a] : e.selectionType === "text" ? e.quote : mr(e.region, a), c = e.selectionType === "region" ? Dt(e.region, a).page : e.page;
  return {
    kind: n,
    pane: a,
    page: c,
    text: s,
    copyValue: n === "formula" ? wo(s) : s,
    canSwitch: o,
    showPeek: o && a !== e.pane
  };
}
const sr = {
  source: "原文",
  translated: "译文"
}, ir = 190, cr = 16;
function wc() {
  const e = typeof window > "u" ? 800 : window.innerWidth;
  if (typeof document > "u") return e;
  const t = document.querySelector(`.${Sr}`), n = (t == null ? void 0 : t.getBoundingClientRect().width) ?? 0;
  return n > 0 ? n : e;
}
function Pc(e, t) {
  const n = cr + ir, r = t - cr - ir;
  return r < n ? t / 2 : Math.min(Math.max(n, e), r);
}
async function Rc(e) {
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
function Tc({
  selection: e,
  onDismiss: t,
  onAskAi: n
}) {
  const [r, o] = x(!1), [a, s] = x(null), c = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if ($(() => s(null), [c]), $(() => o(!1), [c, a]), !e)
    return null;
  const i = Sc(e, a), l = typeof window < "u" ? window.innerHeight : 600, u = e.rect.left + e.rect.width / 2, d = Pc(u, wc()), f = e.rect.top > (i.showPeek ? 220 : 72), m = f ? Math.max(12, e.rect.top - 8) : Math.min(l - 12, e.rect.top + e.rect.height + 8), y = f ? "above" : "below", h = i.kind, b = h === "formula" ? "公式" : h === "table" ? "表格" : h === "figure" ? "图片" : h === "text" ? "文字" : "区域", g = i.copyValue, P = h === "formula" ? ko : h === "table" ? Lo : h === "text" ? Co : No;
  return /* @__PURE__ */ j(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${y} reader-sel-pop--region`,
      style: { left: d, top: m },
      role: "toolbar",
      "aria-label": "选区操作",
      onPointerDown: (v) => {
        v.preventDefault();
      },
      children: [
        /* @__PURE__ */ j("div", { className: "reader-sel-pop-card reader-floating-surface", children: [
          /* @__PURE__ */ j("div", { className: "reader-sel-pop-row", children: [
            /* @__PURE__ */ j("div", { className: "reader-sel-pop-context", children: [
              /* @__PURE__ */ S(P, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
              /* @__PURE__ */ S("span", { children: b }),
              /* @__PURE__ */ S("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
              i.canSwitch ? /* @__PURE__ */ S("span", { className: "reader-sel-pop-panes", role: "group", "aria-label": "看这段的原文或译文", children: ["source", "translated"].map((v) => /* @__PURE__ */ S(
                "button",
                {
                  type: "button",
                  className: `reader-sel-pop-pane${i.pane === v ? " is-active" : ""}`,
                  "aria-pressed": i.pane === v,
                  onClick: () => s(v),
                  children: sr[v]
                },
                v
              )) }) : (
                // 两侧拿不到各自的文本时不画开关 —— 画一个点了不动的按钮比没有更糟。
                /* @__PURE__ */ S("span", { children: sr[e.pane] })
              ),
              /* @__PURE__ */ S("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
              /* @__PURE__ */ j("span", { children: [
                i.page,
                " 页"
              ] })
            ] }),
            /* @__PURE__ */ j("div", { className: "reader-sel-pop-actions", children: [
              g ? /* @__PURE__ */ j(
                "button",
                {
                  type: "button",
                  className: "reader-sel-pop-btn reader-sel-pop-btn--primary",
                  onClick: async () => {
                    try {
                      await Rc(g), o(!0), window.setTimeout(() => o(!1), 1400);
                    } catch (v) {
                      console.warn("[reader-selection] copy failed", v);
                    }
                  },
                  children: [
                    r ? /* @__PURE__ */ S(_o, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ S(xo, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                    /* @__PURE__ */ S("span", { children: r ? "已复制" : h === "formula" ? "复制 LaTeX" : "复制" })
                  ]
                }
              ) : /* @__PURE__ */ S("span", { className: "reader-sel-pop-selection-hint", children: "已选择图片" }),
              n ? (
                // 问 AI 交的是原选区，不跟着上面的切换走：askSelectedRegion 会把
                // 文档切到选区所在那一栏，跟着切等于人只想瞄一眼原文，阅读位置却
                // 被搬走了。
                /* @__PURE__ */ j(
                  "button",
                  {
                    type: "button",
                    className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                    onClick: () => n(e),
                    children: [
                      /* @__PURE__ */ S(br, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                      /* @__PURE__ */ S("span", { children: "问 AI" })
                    ]
                  }
                )
              ) : null,
              /* @__PURE__ */ S(
                "button",
                {
                  type: "button",
                  className: "reader-sel-pop-btn reader-sel-pop-btn--ghost",
                  onClick: t,
                  "aria-label": "取消选区",
                  title: "取消",
                  children: /* @__PURE__ */ S(tn, { size: 15, strokeWidth: 2.5, "aria-hidden": !0 })
                }
              )
            ] })
          ] }),
          i.showPeek ? (
            // 只在看「另一栏」时展开：看的就是页面上那一栏时再抄一遍是噪声。
            /* @__PURE__ */ S("p", { className: "reader-sel-pop-peek", "data-reader-peek-pane": i.pane, children: i.text })
          ) : null
        ] }),
        /* @__PURE__ */ S("span", { className: "reader-sel-pop-caret", "aria-hidden": "true" })
      ]
    }
  );
}
function Ic(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Ec() {
  const [e, t] = x(!1), n = ur(), r = A(null);
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
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || Ic(a.target)) return;
      const s = a.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !a.shiftKey)
          return;
        a.preventDefault(), t((c) => !c);
      }
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, []), /* @__PURE__ */ j("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
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
        children: /* @__PURE__ */ S(zo, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    ),
    e ? /* @__PURE__ */ j(
      "div",
      {
        id: n,
        className: "reader-react-shortcuts-panel reader-floating-surface",
        role: "dialog",
        "aria-label": "阅读器快捷键",
        children: [
          /* @__PURE__ */ j("div", { className: "reader-react-shortcuts-head", children: [
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
          /* @__PURE__ */ S("div", { className: "reader-react-shortcuts-body", children: _s.map((o) => /* @__PURE__ */ j("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ S("h3", { children: o.title }),
            /* @__PURE__ */ S("ul", { children: o.items.map((a) => /* @__PURE__ */ j("li", { children: [
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
const Mc = ["source", "sideBySide", "translated"], Ac = { source: "", translated: "", sideBySide: "" };
function kc(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = bt(e.sourceUrl), n = bt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return Xo({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function Lc(e) {
  const [t, n] = x(() => /* @__PURE__ */ new Set()), r = q(
    () => e ? kc(e) : Ac,
    [e]
  ), o = q(
    () => Mc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = O(async (s) => {
    if (!e) return;
    const c = bt(r[s]);
    if (!(!c || t.has(s)))
      try {
        const i = e.jobId ? Yo(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await Qo(
          e.fetchProtected,
          c,
          i,
          i,
          null,
          (l) => n((u) => {
            const d = new Set(u);
            return l ? d.add(s) : d.delete(s), d;
          })
        );
      } catch (i) {
        const l = i instanceof Error ? i.message : "下载失败";
        ea(l), n((u) => {
          const d = new Set(u);
          return d.delete(s), d;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const Cc = {
  source: hr,
  sideBySide: pr,
  translated: gr
}, Nc = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function _c(e) {
  const t = ct(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = Lc(n);
  return /* @__PURE__ */ j("div", { className: "reader-download-actions", role: "group", "aria-label": "下载 PDF", children: [
    /* @__PURE__ */ S("span", { className: "reader-download-actions-prefix", "aria-hidden": !0, children: /* @__PURE__ */ S(Do, { size: 14, strokeWidth: 2.2 }) }),
    o.map((c) => {
      const i = mo[c], l = bt(r[c]), u = a.has(c), d = !!l && !u, f = d ? "" : ho(c, r), m = Cc[c];
      return (
        // 外面这层 span 是为了**让「为什么点不动」这句话真的弹得出来**。
        //
        // disabled 的按钮在主流浏览器上不派发鼠标事件，挂在它自己身上的
        // title 永远不显示 —— 原因只有读屏拿得到（aria-label 还在），鼠标
        // 用户看到的就是一个灰掉的按钮。窄屏（≤900px）下文字标签还会被裁成
        // 1px 只留图标，那时连「这是哪一路」都没了。
        // span 不是 disabled，hover 照样触发。
        /* @__PURE__ */ S(
          "span",
          {
            className: "reader-download-action-slot",
            title: d ? `下载${i.label}` : f,
            children: /* @__PURE__ */ j(
              "button",
              {
                type: "button",
                id: `reader-download-${c}`,
                className: `reader-download-action${u ? " is-busy" : ""}`,
                disabled: !d,
                "aria-label": d ? `下载${i.label}` : f,
                onClick: () => void s(c),
                children: [
                  /* @__PURE__ */ S(m, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
                  /* @__PURE__ */ S("span", { className: "reader-download-action-label", children: Nc[c] })
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
function xc(e) {
  const t = ct(), n = pi(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? it, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), c = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, l = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), u = Fa(a), d = a > Pr + 1e-3, f = a < Rr - 1e-3, m = Qe(), y = "50%（半屏，对照铺满）", [h, b] = x(!1), [g, P] = x(`${c}`);
  $(() => {
    h || P(`${Math.min(Math.max(c, 1), Math.max(i, 1))}`);
  }, [c, i, h]);
  const v = () => {
    if (b(!1), !l || i <= 0)
      return;
    const p = Number(`${g}`.trim());
    l(St(p, i));
  };
  return /* @__PURE__ */ j("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    o ? /* @__PURE__ */ S("div", { className: "reader-react-hud-group reader-react-hud-modes", children: o }) : null,
    /* @__PURE__ */ S("div", { className: "reader-react-hud-group", "aria-label": "页码", children: h ? /* @__PURE__ */ j(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (p) => {
          p.preventDefault(), v();
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
              value: g,
              autoFocus: !0,
              onChange: (p) => P(p.target.value.replace(/[^\d]/g, "")),
              onBlur: v,
              onKeyDown: (p) => {
                p.key === "Escape" && (p.preventDefault(), b(!1), P(`${c}`));
              }
            }
          ),
          /* @__PURE__ */ j("span", { className: "reader-react-hud-page-suffix", children: [
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
        "aria-label": i > 0 ? `跳转页码，当前第 ${c} 页，共 ${i} 页` : "页码",
        title: i > 0 ? "点击输入页码跳转" : void 0,
        disabled: !l || i <= 0,
        onClick: () => {
          !l || i <= 0 || (P(`${c}`), b(!0));
        },
        children: i > 0 ? `${Math.min(c, i)} / ${i}` : "—"
      }
    ) }),
    /* @__PURE__ */ j("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ S(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "缩小",
          disabled: !d,
          onClick: () => s(rt(a, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ j(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn reader-react-hud-zoom-label",
          "aria-label": `重置为${y}`,
          title: y,
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
          onClick: () => s(rt(a, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ S(Ec, {}) })
  ] });
}
function lr(e) {
  var t, n;
  return Er(e == null ? void 0 : e.assistantPanel) ? e.assistantPanel : ((t = e == null ? void 0 : e.splitLayout) == null ? void 0 : t.left) === "markdown" || ((n = e == null ? void 0 : e.splitLayout) == null ? void 0 : n.right) === "markdown" ? "markdown" : null;
}
function zc(e) {
  const [t, n] = x(() => ({
    scope: e,
    panel: lr(Pe(e))
  }));
  $(() => {
    n((o) => o.scope === e ? o : {
      scope: e,
      panel: lr(Pe(e))
    });
  }, [e]), $(() => {
    t.scope === e && Tt(t.scope, {
      assistantPanel: t.panel,
      // 旧的自由两栏布局已经没有写入者了，恢复时只当迁移来源读一次。
      splitLayout: null
    });
  }, [t, e]);
  const r = O((o) => {
    n((a) => ({
      scope: a.scope,
      panel: typeof o == "function" ? o(a.panel) : o
    }));
  }, []);
  return { panel: t.panel, scope: t.scope, setPanel: r };
}
const Kt = "download-toast";
function Dc({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: o = "progress"
}) {
  const a = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ j("div", { className: "download-toast-card reader-floating-surface", "data-tone": o, "aria-live": "polite", children: [
    /* @__PURE__ */ j("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ S("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ S("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ S("div", { className: "download-toast-track", children: /* @__PURE__ */ S("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${a}%` } }) }),
    /* @__PURE__ */ S("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function Fc(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: o = "等待响应...",
    percent: a = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    Ft.dismiss(Kt);
    return;
  }
  Ft.custom(
    () => /* @__PURE__ */ S(Dc, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: Kt, duration: 1 / 0 }
  );
}
function Oc() {
  const e = O((t) => {
    t && (t.setState = Fc, t.hide = () => Ft.dismiss(Kt));
  }, []);
  return /* @__PURE__ */ j(Zt, { children: [
    /* @__PURE__ */ S(Io, { position: "bottom-right" }),
    /* @__PURE__ */ S("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function ro(e) {
  const t = A(!1);
  return e && (t.current = !0), t.current;
}
function $c(e, t) {
  const n = e === t;
  return { open: n, mounted: ro(n) };
}
function jc({
  panel: e,
  active: t,
  context: n
}) {
  var i;
  const r = t === e.id, o = ro(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = fe(), c = (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, {
    open: r,
    sessionKey: n.sessionKey,
    pendingInput: n.pendingInput,
    onClose: n.onClose
  });
  return c == null ? null : /* @__PURE__ */ S(
    gc,
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
const Uc = lo(() => import("./ReaderMarkdownPanel-B6FHGeW1.js").then((e) => ({ default: e.ReaderMarkdownPanel })));
function Bc(e) {
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
function Hc(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function Wc() {
  const e = Cs(), { boot: t, panes: n, sessionFiles: r, session: o } = e, a = zc(e.viewStateKey), s = a.panel, c = a.setPanel, [i, l] = x(null), [u, d] = x(null), [f, m] = x(!1), y = A(null), h = s !== null, b = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, g = Bc({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: b,
    liveTranslationVisible: f,
    assistantOpen: h,
    assistantPdfPane: i
  }), P = Rs({
    hasOverlayContent: b,
    connection: e.liveTranslation.connection,
    showSource: g.showSource
  }), v = g.sourceViewOnly, p = g.visibleMode;
  $(() => {
    d(null), m(!1);
  }, [e.viewStateKey]), $(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), $(() => {
    l(null);
  }, [a.scope]), $(() => {
    if (!(t.loading || t.failed)) {
      if (y.current !== e.viewStateKey) {
        y.current = e.viewStateKey;
        const C = Pe(e.viewStateKey), U = v ? "source" : C == null ? void 0 : C.mode;
        U && U !== e.mode && e.setModeKeepingPage(U);
        return;
      }
      Tt(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, v]);
  const w = s || (e.mode === "compare" ? "compare" : "reading"), M = $c(s, "markdown");
  Ds({
    mode: p,
    sourceOnly: e.sourceOnly,
    setMode: e.setModeKeepingPage,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    currentPage: e.currentPage,
    numPages: n.hudNumPages,
    goToPage: e.goToPage,
    enabled: e.showHud
  });
  const E = O(() => {
    c(null), l(null), d(null);
  }, []), D = O((C) => {
    l(null);
    const U = Hc(C, e.liveTranslationAvailable);
    U !== null && m(U), e.setModeKeepingPage(C);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), N = q(() => P.sourcePaneToggle ? /* @__PURE__ */ S(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m((C) => !C),
      "aria-pressed": f,
      title: f ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ) : null, [P.sourcePaneToggle, f]), k = O((C) => {
    c(C);
  }, []), T = q(() => ({
    sessionKey: o.jobId || o.documentId || "reader",
    pendingInput: u,
    onClose: E
  }), [E, o.documentId, o.jobId, u]), R = O((C) => {
    const U = C.pane === "translated" && !v ? "translated" : "source", G = Po(C);
    d((K) => ({ text: G, token: ((K == null ? void 0 : K.token) ?? 0) + 1 })), c("terminal"), l(U), e.clearSelection();
  }, [e.clearSelection, v]), I = q(() => ({
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
    sourceViewOnly: v,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: k, close: E }
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
    v,
    e.download,
    e.goToPage,
    k,
    E
  ]), _ = q(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), L = [
    La,
    `is-workspace-${w}`,
    h ? "is-assistant-open" : "",
    g.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ S(hi, { value: I, hud: _, children: /* @__PURE__ */ j("div", { className: L, "data-reader-engine": "react-pdf", "data-reader-workspace": w, children: [
    /* @__PURE__ */ S(yc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ j("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ S(_c, {}),
      /* @__PURE__ */ S(Bs, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ S(
      Ri,
      {
        mode: p,
        documentReady: !!o.jobId,
        sourceViewOnly: v,
        onModeChange: D,
        liveTranslation: P.topBarPill ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m((C) => !C)
        } : null,
        compareDegraded: g.compareDegradedByAssistant,
        onRestoreCompare: E
      }
    ),
    /* @__PURE__ */ S(ki, { active: s }),
    h ? /* @__PURE__ */ S(pc, {}) : null,
    /* @__PURE__ */ S(vi, { paneComposition: g, markdownSplit: M.open, assistantSplit: h, liveTranslation: e.liveTranslation, sourcePaneAction: N }),
    e.showHud ? /* @__PURE__ */ S(
      xc,
      {
        mode: p,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ j(co, { fallback: null, children: [
      Or.map((C) => /* @__PURE__ */ S(
        jc,
        {
          panel: C,
          active: s,
          context: T
        },
        C.id
      )),
      M.mounted ? /* @__PURE__ */ S(Uc, { open: M.open, jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: E }) : null
    ] }),
    /* @__PURE__ */ S(Tc, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: R }),
    /* @__PURE__ */ S(Oc, {})
  ] }) });
}
function il() {
  return /* @__PURE__ */ S(Wc, {});
}
export {
  il as R,
  Wc as a,
  gc as b,
  al as d,
  ol as f,
  sl as r
};
//# sourceMappingURL=ReaderApp-DuaTFdfB.js.map
