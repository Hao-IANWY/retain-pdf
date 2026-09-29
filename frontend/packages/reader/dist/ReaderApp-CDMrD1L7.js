var Pn = (e) => {
  throw TypeError(e);
};
var Rn = (e, t, n) => t.has(e) || Pn("Cannot " + n);
var Ge = (e, t, n) => (Rn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Tn = (e, t, n) => t.has(e) ? Pn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), In = (e, t, n, r) => (Rn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as j, jsx as S, Fragment as Zt } from "react/jsx-runtime";
import { useMemo as G, useState as _, useEffect as $, useCallback as O, useRef as A, useLayoutEffect as _e, memo as Yt, forwardRef as so, useImperativeHandle as Xt, createContext as Qt, useContext as en, useSyncExternalStore as io, useId as dr, Suspense as co, lazy as lo } from "react";
import { requireAdapter as qe, getReaderAdapters as fe, renderReaderBoardSlot as uo } from "./adapters.js";
import { resolveReaderDownloadName as fo, resolveReaderDownloadUrls as mo, READER_PROGRESS_COPY as Se, trimString as bt, READER_DOWNLOAD_ACTIONS as ho, disabledReason as po } from "./runtime/state.js";
import "@retainpdf/api/conversations";
import { r as go, b as bo } from "./page-config-Ct7qR5rm.js";
import { c as yo, n as vo, f as Mt, j as Dt, a as So, b as wo, i as ur, p as wt, g as fr, r as mr, k as En, e as Po, h as Ro } from "./reader-regions-DJ7L9Ej-.js";
import { isReaderTransportError as To, createReaderTransportError as Io } from "./contracts.js";
import { toast as Ot, Toaster as Eo } from "sonner";
import { X as tn, Radio as Mo, FileText as hr, Columns2 as pr, Languages as gr, PanelRightClose as Ao, FileCode2 as ko, Sparkles as br, Sigma as Lo, Table2 as Co, Type as No, Image as _o, Check as xo, Copy as zo, Keyboard as Do, Download as Oo } from "lucide-react";
import { pdfjs as Fo, Page as $o, Document as jo } from "react-pdf";
import { e as Uo, m as Bo, a as Ho } from "./markdown-math-XkF5urpn.js";
const Wo = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, Jo = "", Vo = Object.freeze({
  progress: "retainpdf-reader-progress"
}), qo = (e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, cl = (...e) => {
  var n;
  return (((n = fe()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Ie = () => qe("defaultReaderDataPort"), Mn = () => qe("defaultReaderPageConfigPort"), ll = {
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
}, Go = () => {
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
}, Ko = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, Zo = () => {
  var e, t;
  return ((t = (e = fe()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, Yo = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, Xo = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? fo(...e);
}, Qo = (...e) => {
  var t, n;
  return ((n = (t = fe()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? mo(...e);
}, ea = (...e) => qe("downloadProtectedResource")(...e), ta = (...e) => qe("failDownloadToast")(...e), dl = (e, t) => qe("resolveMarkdownAssetUrl")(e, t), na = "/api/v1";
function ra() {
  const e = () => {
    var r;
    return go(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = _(e);
  return $(() => {
    var c, i, l, d;
    const r = () => n(e()), o = (i = (c = globalThis.history) == null ? void 0 : c.pushState) == null ? void 0 : i.bind(globalThis.history), a = (d = (l = globalThis.history) == null ? void 0 : l.replaceState) == null ? void 0 : d.bind(globalThis.history);
    let s = !1;
    if (o && a)
      try {
        const u = (f) => function(...m) {
          const g = f.apply(this, m);
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
function oa() {
  const e = ra(), t = G(() => Yo(yr), [e]), n = G(() => Zo(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function aa(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: o,
    documentIdRef: a,
    sessionJobIdRef: s,
    switchToSourceMode: c
  } = e, [i, l] = _({
    documentId: "",
    jobId: ""
  }), [d, u] = _({
    documentId: "",
    jobId: ""
  }), f = i.documentId === t ? i.jobId : "", m = d.documentId === t ? d.jobId : "", g = n || f, [h, y] = _({
    jobId: "",
    documentId: ""
  }), b = h.jobId === g ? h.documentId : "", P = t || b, v = !!t && !g, [p, w] = _(null), M = (p == null ? void 0 : p.sessionIdentity) === r && p.documentId === P ? p : null, E = v || !!M, z = O((k) => {
    const T = `${k.documentId || ""}`.trim();
    if (!T || a.current && a.current !== T) return;
    if (!a.current && s.current)
      y({
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
  const C = O((k) => {
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
        y((T) => T.jobId === k.jobId && T.documentId === k.documentId ? T : { jobId: k.jobId, documentId: k.documentId });
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
    missingDocumentJob: d,
    setMissingDocumentJob: u,
    documentJobId: f,
    rejectedDocumentJobId: m,
    sessionJobId: g,
    resolvedJobDocument: h,
    setResolvedJobDocument: y,
    jobDocumentId: b,
    documentId: P,
    sourceOnly: v,
    committedDocumentSource: p,
    setCommittedDocumentSource: w,
    activeCommittedDocumentSource: M,
    sourceViewOnly: E,
    refreshCommittedDocument: z,
    applyIdentityEvent: C
  };
}
const sa = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function An(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function ia(e) {
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
  return qo(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function ca(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function la(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !ca(a, t))
      return a.replace(/\.pdf$/i, "");
  }
  return "";
}
function Ft({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: Vo.progress,
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
  }), Ft({ percent: t, text: n, stage: r });
}
function da(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [c, i] = _(null), [l, d] = _(null), [u, f] = _(""), [m, g] = _(0), h = u === n ? c : null, y = u === n ? l : null, b = An(h), P = sa.has(b), v = O(() => {
    g((C) => C + 1);
  }, []), p = O((C) => {
    i(C.jobPayload), d(C.manifestPayload), f(C.sessionIdentity);
  }, []), w = O((C) => {
    i(null), d(null), f(C);
  }, []), M = A(""), E = A(""), z = O(async () => {
    const C = o.current;
    if (!C || M.current === C) return;
    const k = nn().loadJobPayload;
    if (typeof k != "function") return;
    const T = a.current.value;
    M.current = C;
    try {
      const R = await k(C);
      if (s.current || a.current.value !== T || o.current !== C || !R || typeof R != "object")
        return;
      const I = An(R);
      i(R), f(r.current), I === "succeeded" && E.current !== C && (E.current = C, g((N) => N + 1));
    } catch {
    } finally {
      M.current === C && (M.current = "");
    }
  }, []);
  return $(() => {
    E.current = "";
  }, [n]), $(() => {
    if (!t || P || !h) return;
    const C = window.setInterval(() => {
      z();
    }, 1e3);
    return () => window.clearInterval(C);
  }, [P, z, h, t]), {
    jobPayload: c,
    setJobPayload: i,
    manifestPayload: l,
    setManifestPayload: d,
    payloadSessionIdentity: u,
    setPayloadSessionIdentity: f,
    scopedJobPayload: h,
    scopedManifestPayload: y,
    jobStatus: b,
    jobTerminal: P,
    jobRefreshRevision: m,
    refreshJobArtifacts: v,
    refreshJobStatus: z,
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
function fa(e) {
  const [t, n] = _(e ? "source" : "compare"), r = O((a) => {
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
function ma(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: Ln(n.active_job_id),
    activeVersionId: Ln(n.active_version_id)
  };
}
function ha(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function pa(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function ga(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function ba(e) {
  return e ? { data: e.data.slice() } : null;
}
const ya = 2, pe = /* @__PURE__ */ new Map();
function jt(e, t) {
  pe.delete(e), pe.set(e, t);
}
function va(e) {
  if (pe.size < ya) return;
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
  return pe.has(r) ? jt(r, s) : (va(), pe.set(r, s)), s;
}
function Sa(e = "", t = null) {
  const [n, r] = _(
    () => t || At(e)
  ), [o, a] = _(
    () => !!`${e || ""}`.trim() && !t && !At(e)
  ), [s, c] = _("");
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
    let d = !1;
    return a(!0), c(""), r(null), vr(i).then((u) => {
      d || (r(u), a(!1));
    }).catch((u) => {
      d || (r(null), a(!1), c((u == null ? void 0 : u.message) || String(u)));
    }), () => {
      d = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function wa(e) {
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
async function Pa(e) {
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
    }).then((d) => {
      s = d;
    })
  ), n && a.push(
    Ut({
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
function Ra(e) {
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
    jobRefreshRevision: g,
    sessionEpochRef: h,
    closingRef: y,
    activeLoadAbortRef: b
  } = e, [P, v] = _(""), [p, w] = _(""), [M, E] = _(null), [z, C] = _(null), [k, T] = _(!1), [R, I] = _(""), [N, L] = _([]), [F, U] = _(() => ({
    source: null,
    translated: null
  })), [Y, te] = _(
    ft
  ), [B, x] = _({
    loading: !0,
    percent: 4,
    text: Se.boot,
    stage: "progress",
    failed: !1
  });
  return $(() => {
    const X = new AbortController(), se = h.current.value, ne = wa({
      sessionEpochRef: h,
      closingRef: y,
      abort: X,
      sessionEpoch: se
    });
    b.current = X;
    const Q = nn();
    if (y.current)
      return X.abort(), () => {
        b.current === X && (b.current = null);
      };
    function re(ee, J) {
      ne.markFailed(), x({
        loading: !1,
        percent: 100,
        text: ee,
        stage: "failed",
        failed: !0
      }), Ft({ percent: 100, text: J, stage: "failed" });
    }
    function de() {
      T(!0), x({
        loading: !1,
        percent: 100,
        text: Se.ready,
        stage: "ready",
        failed: !1
      }), Ft({ percent: 100, text: Se.ready, stage: "ready" });
    }
    function ue() {
      return l != null && l.documentId ? kn(
        l.documentId,
        l.revision
      ) : Wo() ? Jo : Q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function De() {
      let ee = { activeJobId: "", activeVersionId: "" };
      try {
        const me = await Q.fetchProtected(
          Q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (me != null && me.ok) {
          const Ae = await me.json().catch(() => null);
          ee = ma(Ae);
        }
      } catch {
      }
      const J = ha({
        link: ee,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!l
      });
      if (J.kind === "follow-active-job") {
        if (ne.isInactive()) return;
        d({
          type: "resolved-document-job",
          documentId: r,
          jobId: J.jobId
        }), J.activeVersionId ? (l || d({
          type: "committed-source",
          documentId: r,
          revision: J.activeVersionId,
          sessionIdentity: i
        }), m("source")) : m("compare");
        return;
      }
      if (J.kind === "open-committed-source") {
        if (ne.isInactive()) return;
        d({
          type: "committed-source",
          documentId: r,
          revision: J.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const oe = ue();
      if (ne.isInactive()) return;
      v(oe), w(""), I(""), f(i);
      const ye = await Ut({
        url: oe,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: ne,
        setBoot: x
      });
      if (!ne.isInactive()) {
        if (!ye) {
          re("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        E(ye), de();
      }
    }
    async function It() {
      var ut;
      const ee = await ((ut = Q.loadSessionSnapshot) == null ? void 0 : ut.call(Q, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: l,
        includeOptionalArtifacts: !l
      })), J = ee ? {
        jobPayload: ee.sourcePayload,
        manifestPayload: ee.manifestPayload,
        readerMetadata: ee.readerMetadata,
        regionsPayload: ee.regions,
        readerErrors: ee.readerErrors
      } : await Q.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !l
      });
      if (ne.isInactive()) return;
      let oe = null;
      if (n && !r) {
        try {
          oe = await Q.fetchDocumentByJobId(na, t);
        } catch {
        }
        if (ne.isInactive()) return;
      }
      const ye = ia(J.jobPayload) || `${(oe == null ? void 0 : oe.document_id) || ""}`.trim();
      ye && !r && d({
        type: "resolved-job-document",
        jobId: t,
        documentId: ye
      });
      const me = pa({
        payloadDocumentId: ye,
        linkedActiveJobId: `${(oe == null ? void 0 : oe.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(oe == null ? void 0 : oe.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!l
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
      const Ae = Q.resolveReaderSourcePdf(J.manifestPayload), lt = Q.resolveReaderTranslatedPdfUrl(J.jobPayload, J.manifestPayload), Et = typeof Ae == "string" ? Ae : Q.resolveReaderArtifactUrl(Ae), dt = r || ye, ve = l != null && l.documentId ? kn(
        l.documentId,
        l.revision
      ) : Et || (dt ? Q.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(dt)}/source.pdf`) : ""), Te = l ? "" : lt || "";
      if (v(ve || ""), w(Te), I(la(J.jobPayload, t)), u({
        jobPayload: J.jobPayload || null,
        manifestPayload: J.manifestPayload || null,
        sessionIdentity: i
      }), L(l ? [] : yo(J.regionsPayload)), U(l ? { source: null, translated: null } : vo(J.readerMetadata)), te(l ? ft : J.readerErrors ?? ft), !ve && !Te) {
        re(Se.failed, Se.failed);
        return;
      }
      const Fe = await Pa({
        sourceFinal: ve || "",
        translatedFinal: Te,
        fence: ne,
        setBoot: x
      });
      if (Fe.status !== "inactive") {
        if (Fe.status === "incomplete") {
          re("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        E(Fe.sourceBytes), C(Fe.translatedBytes), de();
      }
    }
    async function Oe() {
      T(!1), E(null), C(null), L([]), U({ source: null, translated: null }), te(ft), yt(x, 8, Se.metadata, "metadata");
      try {
        if (s) {
          await De();
          return;
        }
        if (!t) {
          re(Se.failed, Se.failed);
          return;
        }
        await It();
      } catch (ee) {
        if (ne.isClosedOrStale() || (ee == null ? void 0 : ee.name) === "AbortError") return;
        ne.markFailed();
        const J = Number(ee == null ? void 0 : ee.status);
        if (ga({
          status: J,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          d({ type: "missing-document-job", documentId: r, jobId: t }), d({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const oe = ee instanceof Error ? ee.message : Se.failed;
        re(oe, oe);
      }
    }
    return Oe(), () => {
      X.abort(), b.current === X && (b.current = null);
    };
  }, [t, r, o, a, s, c, l, g, n, i, d, u, f, m]), {
    sourceUrl: P,
    translatedUrl: p,
    sourceFile: M,
    translatedFile: z,
    assetsReady: k,
    title: R,
    regions: N,
    readerMetadata: F,
    readerErrors: Y,
    boot: B
  };
}
function Ta() {
  const e = A(!1), t = A(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = oa(), s = A({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const c = A(a), i = A(""), l = A(""), d = A(() => {
  }), u = O(() => d.current(), []), f = aa({
    routeDocumentId: o,
    jobId: r,
    sessionIdentity: a,
    sessionIdentityRef: c,
    documentIdRef: i,
    sessionJobIdRef: l,
    switchToSourceMode: u
  }), {
    sessionJobId: m,
    documentId: g,
    sourceOnly: h,
    sourceViewOnly: y
  } = f, { mode: b, setMode: P, switchSessionMode: v } = fa(y);
  d.current = () => {
    v("source");
  }, c.current = a, i.current = g, l.current = m;
  const p = da({
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
    jobTerminal: z,
    jobRefreshRevision: C,
    refreshJobArtifacts: k,
    refreshJobStatus: T
  } = p, R = Ra({
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
    jobRefreshRevision: C,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), I = O(() => {
    var L;
    e.current = !0, (L = t.current) == null || L.abort();
  }, []), N = G(
    () => ({
      fetchProtected: nn().fetchProtected,
      jobId: m,
      jobPayload: w,
      manifestPayload: M,
      sourceUrl: R.sourceUrl,
      translatedUrl: R.translatedUrl,
      sourceOnly: y
    }),
    [m, w, M, R.sourceUrl, R.translatedUrl, y]
  );
  return {
    jobId: m,
    jobStatus: E,
    workflow: `${(w == null ? void 0 : w.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: z,
    documentId: g,
    sessionIdentity: a,
    sourceOnly: h,
    mode: b,
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
    download: N,
    refreshJobArtifacts: k,
    refreshJobStatus: T,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: I
  };
}
const Ia = 160, Ea = 8, Ma = 960;
function Aa() {
  const e = A(null), [t, n] = _(null), [r, o] = _(Ma), a = O((s) => {
    e.current = s, n(s);
  }, []);
  return $(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const c = (l) => {
      !Number.isFinite(l) || l < Ia || o((d) => Math.abs(d - l) < Ea ? d : l);
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
function ka(e) {
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
function La(e, t) {
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
  const [u, f] = _(() => ({
    identity: l,
    pages: kt
  })), [m, g] = _(() => ({ identity: l, tick: 0 })), h = u.identity === l ? u.pages : kt, y = m.identity === l ? m.tick : 0, b = ka({
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    hasSource: !!c || !!a,
    hasTranslated: !!i
  }), { primaryPane: P } = b, v = O((T, R) => {
    d.current === l && f((I) => {
      const N = I.identity === l ? I.pages : kt;
      return N[R] === T && I.identity === l ? I : {
        identity: l,
        pages: { ...N, [R]: T }
      };
    });
  }, [l]), p = A(null), w = O(() => {
    p.current && clearTimeout(p.current);
    const T = l;
    p.current = setTimeout(() => {
      p.current = null, d.current === T && g((R) => ({
        identity: T,
        tick: R.identity === T ? R.tick + 1 : 1
      }));
    }, 60);
  }, [l]);
  $(() => (p.current && (clearTimeout(p.current), p.current = null), f((T) => T.identity === l && T.pages.source === 0 && T.pages.translated === 0 ? T : { identity: l, pages: { source: 0, translated: 0 } }), g((T) => T.identity === l && T.tick === 0 ? T : { identity: l, tick: 0 }), () => {
    p.current && (clearTimeout(p.current), p.current = null);
  }), [l]);
  const M = G(
    () => Math.max(h.source, h.translated),
    [h]
  ), E = P === "translated" ? h.translated : h.source || h.translated, z = t == null ? void 0 : t.userZoom, C = t == null ? void 0 : t.shellWidth, k = `${l}-${y}-${z}-${n}-${h.source}-${h.translated}-${C}`;
  return {
    ...b,
    numPagesByPane: h,
    hudNumPages: M,
    primaryNumPages: E,
    metricsTick: y,
    onNumPages: v,
    onMetrics: w,
    rowSyncRevision: k
  };
}
const We = "data-reader-page", Je = "data-reader-pane", rn = "data-natural-height", Ca = "reader-react-root", Na = "reader-react-grid", Sr = "reader-react-scroll-shell", _a = "reader-react-pdf-pane", wr = "reader-react-pdf-page", vt = "reader-react-pdf-page-placeholder", on = "reader-react-pdf-page-slot";
function nt(e, t) {
  const n = e != null ? `[${We}="${e}"]` : `[${We}]`;
  return t ? `${n}[${Je}="${t}"]` : n;
}
function xa() {
  return `.${on}[${We}]`;
}
function Pt(e) {
  return Number(e.getAttribute(We));
}
const Pr = 0.25, Rr = 1, za = 0.05, it = 0.5, Da = 16, Oa = 8;
function Qe(e) {
  return it;
}
function Rt(e) {
  return Number.isFinite(e) ? Math.min(Rr, Math.max(Pr, e)) : it;
}
function rt(e, t) {
  const n = Rt(Number(e) + t * za);
  return Math.round(n * 100) / 100;
}
function Fa(e) {
  return Math.round(Rt(e) * 100);
}
function $a(e) {
  const n = (Number(e) || 0) - Da - Oa;
  return Math.max(160, Math.floor(n));
}
function ja(e, t = it) {
  const n = Rt(t);
  return $a((Number(e) || 0) * n);
}
function Ua(e, t) {
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
const Ba = 8;
function Ha(e, t) {
  return !Number.isFinite(e) || e < 80 || Math.abs(e - t) < Ba ? "ignore" : !Number.isFinite(t) || t <= 0 ? "immediate" : "settle";
}
const Wa = 200, Tr = [
  "markdown"
], Ir = [
  "terminal"
], Ja = [
  ...Tr,
  ...Ir
];
function Er(e) {
  return Ja.includes(e);
}
const Va = "retainpdf:reader:view:v1:", Cn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), qa = /* @__PURE__ */ new Set([
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
function Ga({
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
  return t ? `${Va}${t}` : "";
}
function Ka(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function Za(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!Cn.has(t) || !Cn.has(n) || t === n))
    return { left: t, right: n };
}
function Ya(e) {
  return e === null ? null : Er(e) ? e : void 0;
}
function Xa(e) {
  return qa.has(e) ? e : void 0;
}
function kr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = Ka(t.anchor), r = Number(t.zoom), o = Xa(t.mode), a = Za(t.splitLayout), s = Ya(t.assistantPanel);
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
function Qa(e, t, n = "") {
  const [r, o] = _(() => {
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
  const i = O((u) => {
    const f = Rt(u), m = a.current;
    Math.abs(f - m) < 5e-4 || (c.current = f / (m || 1), Tt(s.current, { zoom: f }), o(f));
  }, []), l = O((u) => {
    i(rt(a.current, u));
  }, [i]), d = O((u) => {
    i(Qe());
  }, [i]);
  return _e(() => {
    const u = c.current;
    Math.abs(u - 1) < 1e-3 || (c.current = 1, Ua(t == null ? void 0 : t.current, u));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: l, resetZoom: d };
}
function es(e, t = !0) {
  const [n, r] = _(null), o = O(() => {
    var c, i;
    r(null);
    const s = (c = globalThis.getSelection) == null ? void 0 : c.call(globalThis);
    (i = s == null ? void 0 : s.removeAllRanges) == null || i.call(s);
  }, []), a = e.current ?? null;
  return $(() => {
    if (!t)
      return;
    const s = () => {
      var L, F;
      const h = e.current, y = (L = globalThis.getSelection) == null ? void 0 : L.call(globalThis);
      if (!h || !y || y.isCollapsed || !y.rangeCount) {
        r(null);
        return;
      }
      const b = y.getRangeAt(0);
      if (!h.contains(b.commonAncestorContainer)) {
        r(null);
        return;
      }
      const P = `${y.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (P.length < 2) {
        r(null);
        return;
      }
      let v = b.commonAncestorContainer;
      v.nodeType === Node.TEXT_NODE && (v = v.parentElement);
      const p = (F = v == null ? void 0 : v.closest) == null ? void 0 : F.call(
        v,
        nt()
      );
      if (!p || !h.contains(p)) {
        r(null);
        return;
      }
      const w = Math.max(1, Math.floor(Pt(p) || 1)), E = p.getAttribute(Je) === "translated" ? "translated" : "source", z = b.getClientRects(), C = z[z.length - 1] || b.getBoundingClientRect();
      if (!C || C.width === 0 && C.height === 0) {
        r(null);
        return;
      }
      const k = typeof window < "u" ? window.innerWidth : 800, T = typeof window < "u" ? window.innerHeight : 600, R = 16, I = Math.min(Math.max(R, C.left), k - R), N = Math.min(Math.max(R, C.top), T - R);
      r({
        selectionType: "text",
        quote: P,
        page: w,
        pane: E,
        rect: {
          left: I,
          top: N,
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
    }, f = (h) => {
      h.key === "Escape" && o();
    }, m = () => {
      r((h) => h && null);
    };
    document.addEventListener("mouseup", i), document.addEventListener("pointerup", l), document.addEventListener("touchend", d), document.addEventListener("selectionchange", u), document.addEventListener("keyup", f);
    const g = a ?? e.current;
    return g == null || g.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", i), document.removeEventListener("pointerup", l), document.removeEventListener("touchend", d), document.removeEventListener("selectionchange", u), document.removeEventListener("keyup", f), g == null || g.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, a, o]), { selection: n, clearSelection: o };
}
function ts(e) {
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
  const d = l.height > 0 ? l.height : c.offsetHeight, u = e.scrollTop + (l.top - i.top), f = Math.max(0, u + s * d - o);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function ns(e, t, n = "smooth", r) {
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
    var d;
    if (a) return;
    sn(
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
function rs(e, t, n) {
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
function os(e, t, n = !0, r = "", o) {
  const [a, s] = _(1);
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
      const h = Array.from(c.querySelectorAll(u));
      if (!h.length)
        return;
      const y = Lr(c), b = Cr(h, y);
      b && s(b.page);
    }, m = () => {
      i || (d && cancelAnimationFrame(d), d = requestAnimationFrame(() => {
        d = 0, f();
      }));
    }, g = () => {
      if (i) return;
      if (!Array.from(c.querySelectorAll(u)).length) {
        l = setTimeout(g, 120);
        return;
      }
      f(), c.addEventListener("scroll", m, { passive: !0 });
    };
    return g(), () => {
      i = !0, l && clearTimeout(l), d && cancelAnimationFrame(d), c.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, o]), a;
}
const as = `canvas, .react-pdf__Page, .${wr}, .${vt}`, Nn = /* @__PURE__ */ new WeakMap();
function ss(e) {
  const t = Number(e.getAttribute(rn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Nn.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(as), Nn.set(e, n)), n) {
    const o = n.getBoundingClientRect().height;
    if (Number.isFinite(o) && o > 0)
      return o;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function is(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function cs(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(xa()).forEach((r) => {
    const o = Pt(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = ss(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function ls(e, t, n = "", r) {
  const [o, a] = _(() => /* @__PURE__ */ new Map()), s = A(o), c = A(r);
  return c.current = r, _e(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), a(s.current));
      return;
    }
    let i = !1, l = 0, d = !1, u = !1;
    const f = () => {
      var w;
      if (i) return;
      const v = e.current;
      if (!v) return;
      const p = cs(v);
      is(s.current, p) || (s.current = p, a(p)), d && !u && (u = !0, (w = c.current) == null || w.call(c));
    }, m = () => {
      cancelAnimationFrame(l), l = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const g = window.setTimeout(m, 100), h = window.setTimeout(() => {
      d = !0, m();
    }, 300), y = window.setTimeout(m, 700), b = e.current;
    let P = null;
    return b && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => m()), P.observe(b)), () => {
      i = !0, cancelAnimationFrame(l), window.clearTimeout(g), window.clearTimeout(h), window.clearTimeout(y), P == null || P.disconnect();
    };
  }, [e, t, n]), o;
}
const ds = [0, 48, 140, 320, 560], us = 700, fs = [80, 200, 400], ms = 500, hs = 50, ps = 180, _n = [0, 48, 140, 320, 700, 1200];
function gs(e, t) {
  var T;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, c = A(
    ((T = Pe(a)) == null ? void 0 : T.anchor) || { page: 1, fraction: 0 }
  ), i = A(null), l = A(!1), d = A(r), u = A(null), f = A(null), m = A(null), g = A(null), h = A(a), y = A(""), b = A(n);
  b.current = n;
  const P = O(() => {
    var R;
    (R = u.current) == null || R.call(u), u.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), v = O((R = !1) => {
    g.current != null && (clearTimeout(g.current), g.current = null);
    const I = () => {
      g.current = null, Tt(h.current, {
        anchor: he(c.current)
      });
    };
    R ? I() : g.current = setTimeout(I, ps);
  }, []), p = O((R) => {
    c.current = he(R), i.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, l.current = !1;
    }, hs);
  }, []);
  $(() => {
    if (!o)
      return;
    let R = !1, I = null, N = null, L = null;
    const F = () => {
      if (R) return;
      const U = e.current;
      if (!U) {
        L = setTimeout(F, 50);
        return;
      }
      I = U, N = () => {
        if (l.current)
          return;
        const Y = Lt(I, b.current);
        Y && (c.current = Y, v());
      }, I.addEventListener("scroll", N, { passive: !0 }), l.current || N();
    };
    return F(), () => {
      R = !0, L != null && clearTimeout(L), I && N && I.removeEventListener("scroll", N);
    };
  }, [o, r, n, e, v]), _e(() => {
    var I;
    if (h.current === a) return;
    v(!0), P(), m.current != null && (clearTimeout(m.current), m.current = null), h.current = a, y.current = "";
    const R = (I = Pe(a)) == null ? void 0 : I.anchor;
    c.current = R ? he(R) : { page: 1, fraction: 0 }, i.current = null, l.current = !!a, d.current = r;
  }, [a, r, v, P]), $(() => {
    var I;
    if (!o || !s || !a || y.current === a) return;
    y.current = a;
    const R = he(
      ((I = Pe(a)) == null ? void 0 : I.anchor) || { page: 1, fraction: 0 }
    );
    return c.current = R, i.current = R, l.current = !0, P(), u.current = Ht(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: b.current,
        delaysMs: _n,
        onDone: () => p(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, p(R);
    }, Math.max(..._n) + 160), () => P();
  }, [o, s, a, e, p, P]), $(() => {
    if (d.current === r)
      return;
    if (d.current = r, !o) {
      l.current = !1, i.current = null, P();
      return;
    }
    const R = i.current ? he(i.current) : he(c.current);
    return l.current = !0, i.current = R, c.current = R, P(), u.current = Ht(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: ds,
        onDone: () => p(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, p(R);
    }, us), () => {
      P();
    };
  }, [r, o, n, e, p, P]), $(() => () => {
    P(), m.current != null && (clearTimeout(m.current), m.current = null), v(!0);
  }, [P, v]);
  const w = O(() => {
    const R = Lt(
      e.current,
      b.current
    );
    return he(R || c.current);
  }, [e]), M = O(() => {
    l.current = !0;
    const R = Lt(
      e.current,
      b.current
    ), I = he(R ?? c.current);
    return c.current = I, i.current = I, v(), I;
  }, [e, v]), E = O((R, I, N) => {
    const L = N || b.current, F = St(R, I || 1), U = { page: F, fraction: 0 };
    c.current = U, l.current = !0, i.current = U, v(), P(), ns(e.current, F, "smooth", L), u.current = rs(
      () => e.current,
      F,
      {
        behavior: "auto",
        pane: L,
        delaysMs: fs,
        onDone: () => p(U)
      }
    ), f.current = setTimeout(() => {
      f.current = null, p(U);
    }, ms);
  }, [e, p, P, v]), z = O(() => he(c.current), []), C = O(() => l.current, []), k = O(() => {
    if (!l.current || !i.current)
      return;
    const R = he(i.current);
    sn(
      e.current,
      R,
      "auto",
      b.current
    );
  }, [e]);
  return {
    lockFromShell: w,
    beginModeSwitch: M,
    goToPage: E,
    getAnchor: z,
    isRestoring: C,
    repinIfRestoring: k
  };
}
function bs(e, t) {
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
const ys = [0, 80, 200, 400, 800], vs = 120, Ss = 400;
function ws(e, t, n) {
  const { enabled: r, numPages: o, goToPage: a, resolveBlockPage: s, onAnchorApplied: c, jobId: i, documentId: l } = e, d = A(a);
  d.current = a;
  const u = A(s);
  u.current = s;
  const f = A(c);
  f.current = c;
  const m = A(n);
  m.current = n, $(() => {
    var v, p;
    if (!r || !Number.isFinite(o) || o < 1)
      return;
    const g = Ko(), h = bs(g, u.current), y = Nr(g, h, { jobId: i, documentId: l });
    if (t.current === y)
      return;
    if (h == null) {
      t.current = y, (v = m.current) == null || v.call(m);
      return;
    }
    t.current = y, g && ((p = f.current) == null || p.call(f, g, h));
    const b = [];
    let P = 0;
    for (const w of ys)
      P = Math.max(P, w), b.push(
        setTimeout(() => {
          d.current(h);
        }, w)
      );
    return b.push(
      setTimeout(() => {
        var w;
        (w = m.current) == null || w.call(m);
      }, P + vs)
    ), () => {
      for (const w of b) clearTimeout(w);
    };
  }, [r, o, i, l, t]);
}
function Ps(e) {
  var a;
  const t = globalThis.window;
  if (!t || typeof ((a = t.history) == null ? void 0 : a.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, o = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", o);
}
function Rs(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: o,
    resolveBlockPage: a,
    syncDebounceMs: s = Ss,
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
      var b;
      const g = ((b = globalThis.location) == null ? void 0 : b.search) || "", h = bo(g, o, d.current);
      if (f.current = o, h === null) return;
      const y = `${new URLSearchParams(h).get("block_id") || ""}`.trim();
      t.current = Nr(
        { blockId: y },
        o,
        { jobId: c, documentId: i }
      ), (u.current || Ps)(h);
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
function Ts(e) {
  const t = A(""), [n, r] = _(!1), o = O(() => r(!0), []), a = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  ws(a, t, o), Rs(e, t, n);
}
const Ke = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function Is(e) {
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
function Es(e, t, n) {
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
function Ms(e) {
  const { hasOverlayContent: t, connection: n, showSource: r } = e;
  return {
    topBarPill: t && n !== "terminal",
    sourcePaneToggle: t && r,
    overlayRenderable: t && r
  };
}
const zn = [250, 500, 1e3, 2e3, 4e3], Ct = [80, 160, 320, 640, 1e3, 1500], Dn = [250, 500, 1e3, 2e3, 4e3, 5e3], As = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
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
  return To(e) ? `${e.code || ""}`.trim() : "";
}
function mt(e, t) {
  const n = cn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function ks(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if (_r(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = Io(
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
function Ls({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = _(Ke), s = A(o), c = A("");
  s.current = o;
  const i = `${e || ""}`.trim(), l = `${t || ""}`.trim().toLowerCase(), d = As.has(l) ? l : "";
  return $(() => {
    if (!n || !i) {
      c.current = "", s.current = Ke, a(Ke);
      return;
    }
    const u = r === void 0 ? Go() : r, f = c.current === i;
    if (c.current = i, !u) {
      const v = {
        ...f ? s.current : Ke,
        connection: d ? "terminal" : "unavailable",
        jobStatus: l,
        error: "实时译文暂不可用"
      };
      s.current = v, a(v);
      return;
    }
    const m = new AbortController();
    let g = !1;
    const h = {
      ...f ? s.current : Ke,
      connection: d ? "terminal" : "connecting",
      jobStatus: l,
      error: ""
    };
    s.current = h, a(h);
    const y = (v) => {
      m.signal.aborted || a((p) => {
        const w = v(p);
        return s.current = w, w;
      });
    }, b = async () => {
      let v = 0;
      for (; !m.signal.aborted; )
        try {
          const p = await u.fetchLayout(i, { signal: m.signal });
          g = !0, y((w) => ({
            ...w,
            layoutByPage: Is(p),
            jobStatus: l,
            error: ""
          }));
          return;
        } catch (p) {
          if ((p == null ? void 0 : p.name) === "AbortError") return;
          const w = cn(p);
          if (!(w === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !w)) {
            y((E) => ({
              ...E,
              connection: d ? "terminal" : "unavailable",
              jobStatus: l,
              error: mt(p, "实时译文暂不可用")
            }));
            return;
          }
          if (d) {
            y((E) => ({
              ...E,
              connection: "terminal",
              jobStatus: l,
              error: ""
            }));
            return;
          }
          y((E) => ({
            ...E,
            connection: "connecting",
            jobStatus: l,
            error: mt(p, "正在等待 OCR 版面数据")
          })), await Wt(zn[Math.min(v, zn.length - 1)], m.signal).catch(() => {
          }), v += 1;
        }
    };
    return (async () => {
      if (await b(), !g || m.signal.aborted) return;
      let v = 0;
      for (; !m.signal.aborted; ) {
        d || y((p) => ({
          ...p,
          connection: p.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: l,
          // 保留已有错误：首页还没提交（lastSeq 为 0）时恰恰是最容易出错的阶段，
          // 此前这里把它清成空串，UI 于是一直显示「连接中」，用户看到的是
          // "正在努力"，实际可能已经在反复失败。
          error: p.error
        }));
        try {
          await u.streamEvents(i, {
            afterSeq: s.current.lastSeq,
            signal: m.signal,
            onEvent: async (p) => {
              if (p.seq <= s.current.lastSeq) return;
              let w;
              try {
                w = await ks(
                  i,
                  p,
                  s.current,
                  m.signal,
                  u
                );
              } catch (M) {
                if ((M == null ? void 0 : M.name) === "AbortError" || m.signal.aborted) throw M;
                y((E) => ({
                  ...E,
                  lastSeq: Math.max(E.lastSeq, p.seq),
                  error: mt(M, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              y((M) => {
                const E = Es(M, p, w);
                return d ? {
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
          y((w) => ({
            ...w,
            connection: d ? "terminal" : "reconnecting",
            jobStatus: l,
            error: mt(p, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (d) {
          y((p) => ({
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
  }, [n, r, i, d]), o;
}
const Cs = 2e3;
function Ns(e) {
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
function xr(e) {
  return !!(e.jobId && e.sourceUrl && _s.has(e.workflow));
}
function xs(e) {
  return !!(xr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function zs() {
  const e = Ta(), t = xr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = xs({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = Ls({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), { shellRef: o, shellEl: a, shellWidth: s, bindShell: c } = Aa(), i = Ga({
    documentId: e.documentId,
    jobId: e.jobId
  }), l = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: d, onZoomChange: u } = Qa(e.mode, o, i), f = La(
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
    goToPage: g,
    repinIfRestoring: h
  } = gs(o, {
    primaryPane: f.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: f.primaryNumPages > 0
  });
  $(() => {
    h();
  }, [s, h]);
  const y = ls(
    o,
    f.compareMode,
    f.rowSyncRevision,
    h
  ), b = os(
    o,
    f.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${d}-${f.metricsTick}`,
    f.primaryPane
  ), P = O((x, X) => {
    var ne, Q;
    const se = Math.max(
      Number(f.hudNumPages) || 0,
      Number(f.primaryNumPages) || 0,
      Number((ne = f.numPagesByPane) == null ? void 0 : ne.source) || 0,
      Number((Q = f.numPagesByPane) == null ? void 0 : Q.translated) || 0
    );
    g(x, se, X);
  }, [g, f.hudNumPages, f.primaryNumPages, f.numPagesByPane]), [v, p] = _(null), w = A(null), M = O((x) => {
    w.current && clearTimeout(w.current), p(x), x && (w.current = setTimeout(() => p(null), Cs));
  }, []);
  $(() => () => {
    w.current && clearTimeout(w.current);
  }, []);
  const E = O((x) => {
    const X = Mt(e.regions, x);
    return X ? Dt(X, f.primaryPane).page : null;
  }, [e.regions, f.primaryPane]), z = O((x, X) => {
    const se = X || f.primaryPane, ne = typeof x == "object" && x ? `${x.block_id || ""}`.trim() : "", Q = typeof x == "object" && x ? `${x.image_url || ""}`.trim() : "", re = typeof x == "object" && x ? x.page_idx != null ? Number(x.page_idx) + 1 : x.page != null ? Number(x.page) : null : typeof x == "number" ? x + 1 : null, de = So(e.regions, Q, re) || Mt(e.regions, ne) || (typeof x == "object" ? wo(e.regions, x) : null);
    let ue = de ? Dt(de, se).page : null;
    ue == null && (ue = Ns(x)), !(ue == null || ue < 1) && (M(de), P(ue, se));
  }, [M, P, f.primaryPane, e.regions]);
  Ts({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: f.hudNumPages || 0,
    currentPage: b,
    goToPage: P,
    resolveBlockPage: E,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (x) => {
      M(Mt(e.regions, x.blockId));
    }
  });
  const { setModeKeepingPage: C } = ts({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: m
  }), [k, T] = _(null), {
    selection: R,
    clearSelection: I
  } = es(o, !e.boot.loading && !e.boot.failed), N = O(() => {
    T(null), I();
  }, [I]), L = O((x) => {
    I(), T(x);
  }, [I]);
  $(() => {
    R && T(null);
  }, [R]), $(() => {
    const x = o.current;
    if (!x) return;
    const X = () => T(null);
    return x.addEventListener("scroll", X, { passive: !0 }), () => x.removeEventListener("scroll", X);
  }, [a, o]);
  const F = R || k;
  $(() => {
    M(null), N();
  }, [l, M, N]);
  const U = !e.boot.loading && !e.boot.failed, Y = G(() => ({ bindShell: c, shellEl: a, shellWidth: s, shellRef: o }), [c, a, s, o]), te = G(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), B = G(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: d,
    onZoomChange: u,
    shell: Y,
    panes: f,
    sessionFiles: te,
    rowHeights: y,
    goToPage: P,
    activeRegion: v,
    jumpToAnchor: z,
    setModeKeepingPage: C,
    download: e.download,
    showHud: U,
    selection: F,
    clearSelection: N,
    selectRegion: L,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, Y, f, te, y, P, v, z, C, U, F, N, L, d, u, i, r, n]);
  return G(() => ({
    ...B,
    currentPage: b
  }), [B, b]);
}
const Ds = [
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
], Os = [
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
function Fs(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Ds)
    if (n.keys.some(
      (o) => o.length === 1 ? o === t : o === e
    )) return n;
  return null;
}
function $s(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function js(e) {
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
      if (u.defaultPrevented || u.metaKey || u.ctrlKey || u.altKey || $s(u.target))
        return;
      const f = u.key, m = Fs(f);
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
const Us = "retainpdf:soft-reader-close";
function Bs() {
  return new URL("./index.html", window.location.href).href;
}
function Hs() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: Us },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function Ws(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), o = new URL(e, r);
    return o.origin === r.origin && !/reader\.html$/i.test(o.pathname) && !/detail\.html$/i.test(o.pathname);
  } catch {
    return !1;
  }
}
function Js() {
  if (!(typeof window > "u") && !Hs()) {
    if (Ws(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(Bs());
  }
}
function Vs({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ j(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), Js();
      },
      children: [
        /* @__PURE__ */ S(tn, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ S("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let On = !1;
function qs() {
  if (On)
    return;
  const e = tt().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (Fo.GlobalWorkerOptions.workerSrc = e, On = !0);
}
const Gs = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function Ks({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: o
}) {
  const a = r.flatMap((s) => {
    if (!ur(s.region)) return [];
    const c = wt(s, t, n);
    return c ? [{ highlight: s, rect: c }] : [];
  });
  return a.length ? /* @__PURE__ */ S("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: a.map(({ highlight: s, rect: c }) => {
    const i = s.region, l = fr(i), d = Gs[l];
    return /* @__PURE__ */ j(
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
          /* @__PURE__ */ S("span", { className: "reader-structure-selection-label", "aria-hidden": "true", children: d }),
          /* @__PURE__ */ S("span", { className: "sr-only", children: mr(i, e) })
        ]
      },
      i.itemId
    );
  }) }) : null;
}
function Zs(e, t, n) {
  return e.flatMap((r) => {
    if (fr(r.region) !== "text") return [];
    const o = wt(r, t, n);
    return o ? [{ itemId: r.itemId, highlight: r, rect: o }] : [];
  });
}
function Fn(e, t, n) {
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
function Ys({ target: e }) {
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
function Xs(e, t) {
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
function Qs(e, t, n, r) {
  if (!e || !t) return [];
  const o = [];
  for (const a of e.blocks) {
    const s = t.itemsById.get(a.item_id);
    if (!(s != null && s.translated_text)) continue;
    const c = wt(
      Xs(e, a),
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
const ei = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', ti = 256, Ze = /* @__PURE__ */ new Map();
function ni(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function ri(e) {
  const t = `${e || ""}`, { text: n, slots: r } = Uo(t, { bareLatex: !0 }), o = ni(n), a = Bo(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Ze.get(t);
  if (!s && (s = Ho(o, r), Ze.set(t, s), Ze.size > ti)) {
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
function oi(e, t) {
  const n = e.typography, r = we(t) || 1, o = we(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), c = Nt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, c * r)), l = we(n == null ? void 0 : n.fit_min_font_size_pt), d = we(n == null ? void 0 : n.fit_max_font_size_pt), u = Math.max(3.5, (l || 5.5) * r), f = Math.max(
    u,
    d ? d * r : o ? o * r : i
  ), m = o ? o * r : i, g = we(n == null ? void 0 : n.leading_em), h = [
    we(n == null ? void 0 : n.padding_top_pt) || 0,
    we(n == null ? void 0 : n.padding_right_pt) || 0,
    we(n == null ? void 0 : n.padding_bottom_pt) || 0,
    we(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((y) => y * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || ei,
    fontSizePx: Math.max(u, Math.min(f, m)),
    minFontSizePx: u,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: g ? 1 + g : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (Nt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : Nt(e.kind) ? "center" : "justify",
    padding: h,
    exact: !!o
  };
}
function ai(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), c = (u) => {
    const f = s.get(u);
    if (f !== void 0) return f;
    const { width: m, height: g } = e(u), h = m <= t + 0.5 && g <= n + 0.5;
    return s.set(u, h), h;
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
const si = 512, Ye = /* @__PURE__ */ new Map();
let Jt = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Jt += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Jt += 1;
}));
function ii(e, t, n, r) {
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
function ci({ item: e, pageScale: t }) {
  const n = A(null), r = G(
    () => ri(e.translatedText),
    [e.translatedText]
  ), [o, a] = _(r.fallbackHtml), s = G(
    () => oi(e, t),
    [e, t]
  );
  $(() => {
    let u = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      u && a(f);
    }), () => {
      u = !1;
    };
  }, [r]), _e(() => {
    const u = n.current;
    if (!u) return;
    const [f, m, g, h] = s.padding, y = Math.max(1, e.rect.width - h - m), b = Math.max(1, e.rect.height - f - g), P = ii(o, y, b, s);
    let v = Ye.get(P);
    if (v === void 0 && (v = ai(
      (p) => (u.style.fontSize = `${p}px`, { width: u.scrollWidth, height: u.scrollHeight }),
      y,
      b,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Ye.set(P, v), Ye.size > si)) {
      const p = Ye.keys().next().value;
      p !== void 0 && Ye.delete(p);
    }
    u.style.fontSize = `${v.toFixed(2)}px`;
  }, [o, e.rect.height, e.rect.width, s]);
  const [c, i, l, d] = s.padding;
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
        padding: `${c}px ${i}px ${l}px ${d}px`
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
function li({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = G(
    () => Qs(e, t, n, r),
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
        ci,
        {
          item: a,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${a.itemId}:${a.changedAtSeq}`
      ))
    }
  ) : null;
}
const di = Yt(li), zr = 1.414;
function ui({
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
  liveTranslationPage: g,
  showLiveTranslation: h = r === "source"
}) {
  const y = A(c ?? zr), [b, P] = _(y.current);
  $(() => {
    c != null && Math.abs(c - y.current) >= 1e-3 && (y.current = c, P(c));
  }, [c]);
  const v = A(l);
  v.current = l;
  const p = A((L) => {
    var F;
    (F = v.current) == null || F.call(v, L);
  }).current, w = Math.max(120, Math.floor(t * b)), M = Math.max(w, Math.ceil(a || 0)), E = wt(d, t, w), z = G(
    () => Zs(u, t, w),
    [w, u, t]
  ), [C, k] = _(null), T = G(
    () => z.find((L) => L.itemId === C) || null,
    [C, z]
  ), R = (L) => {
    if (L.buttons !== 0) {
      k(null);
      return;
    }
    const F = L.currentTarget.getBoundingClientRect(), U = Fn(
      z,
      L.clientX - F.left,
      L.clientY - F.top
    ), Y = (U == null ? void 0 : U.itemId) || null;
    k((te) => te === Y ? te : Y);
  }, I = (L) => {
    var Y, te, B;
    if (!f || (te = (Y = L.target) == null ? void 0 : Y.closest) != null && te.call(Y, ".reader-structure-selection-target") || `${((B = window.getSelection()) == null ? void 0 : B.toString()) || ""}`.trim()) return;
    const F = L.currentTarget.getBoundingClientRect(), U = Fn(
      z,
      L.clientX - F.left,
      L.clientY - F.top
    );
    U && f({
      selectionType: "region",
      region: U.highlight.region,
      kind: "text",
      page: U.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: F.left + U.rect.left,
        top: F.top + U.rect.top,
        width: U.rect.width,
        height: U.rect.height
      }
    });
  }, N = (L) => {
    !Number.isFinite(L) || L <= 0 || Math.abs(y.current - L) < 1e-3 || (y.current = L, P(L), i == null || i(e, L));
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
          $o,
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
                const F = L.getViewport({ scale: 1 });
                if (F.width > 0) {
                  const U = F.height / F.width;
                  N(U);
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
            "data-reader-region-id": d == null ? void 0 : d.itemId,
            style: E,
            "aria-hidden": "true"
          }
        ) : null,
        o && h ? /* @__PURE__ */ S(
          di,
          {
            layoutPage: m,
            pageState: g,
            width: t,
            height: w
          }
        ) : null,
        /* @__PURE__ */ S(Ys, { target: o ? T : null }),
        /* @__PURE__ */ S(
          Ks,
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
const fi = Yt(ui), _t = 5, mi = "120% 0px", hi = 120;
let $n = 1;
const jn = /* @__PURE__ */ new WeakMap();
function pi(e) {
  if (!e) return 0;
  const t = jn.get(e);
  if (t) return t;
  const n = $n;
  return $n += 1, jn.set(e, n), n;
}
function gi() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const bi = so(
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
    activeRegion: g = null,
    regions: h = [],
    readerMetadata: y = null,
    onSelectRegion: b,
    liveTranslation: P,
    showLiveTranslation: v = t === "source",
    liveTranslationPendingLabel: p = "",
    paneAction: w
  }, M) {
    qs();
    const { file: E, loading: z, error: C } = Sa(n, r), k = `${n}\0${pi(E)}`, T = A(k);
    T.current = k;
    const R = G(
      () => ba(E),
      [E, n]
    ), [I, N] = _(0), [L, F] = _(""), [U, Y] = _(null), [te, B] = _(480), x = A(null), X = A(0), se = G(() => gi(), []), ne = G(() => ({
      cMapUrl: tt().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: tt().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    Xt(M, () => U, [U]), $(() => {
      const D = (W) => {
        X.current = W, B(W);
      }, V = (W) => {
        const Z = Ha(W, X.current);
        if (Z !== "ignore") {
          if (x.current && clearTimeout(x.current), Z === "immediate") {
            D(W);
            return;
          }
          x.current = setTimeout(() => D(W), Wa);
        }
      }, H = !!(i && i >= 80);
      V(H ? i : (c == null ? void 0 : c.clientWidth) || 0);
      const ae = !H && c && typeof ResizeObserver < "u" ? new ResizeObserver((W) => {
        var Z, ie;
        V(((ie = (Z = W[0]) == null ? void 0 : Z.contentRect) == null ? void 0 : ie.width) ?? c.clientWidth);
      }) : null;
      return ae && c && ae.observe(c), () => {
        ae == null || ae.disconnect(), x.current && clearTimeout(x.current);
      };
    }, [i, c, a]);
    const Q = G(
      () => ja(te, o),
      [te, o]
    ), [re, de] = _(() => /* @__PURE__ */ new Map()), [ue, De] = _(() => /* @__PURE__ */ new Set()), [It, Oe] = _(() => /* @__PURE__ */ new Set()), ee = A(/* @__PURE__ */ new Map()), J = A(null), oe = A(/* @__PURE__ */ new Map()), ye = O((D, V) => {
      de((H) => {
        if (H.get(D) === V) return H;
        const K = new Map(H);
        return K.set(D, V), K;
      });
    }, []), me = O((D, V) => {
      const H = ee.current, K = H.get(D);
      if (K && J.current)
        try {
          J.current.unobserve(K);
        } catch {
        }
      if (V) {
        if (H.set(D, V), J.current)
          try {
            J.current.observe(V);
          } catch {
          }
      } else
        H.delete(D);
    }, []), Ae = A(/* @__PURE__ */ new Map()), lt = O((D) => {
      const V = Ae.current;
      let H = V.get(D);
      return H || (H = (K) => me(D, K), V.set(D, H)), H;
    }, [me]);
    $(() => {
      if (typeof IntersectionObserver > "u") return;
      const D = oe.current, V = new IntersectionObserver(
        (H) => {
          const K = [], ae = [];
          for (const W of H) {
            const Z = W.target, ie = Pt(Z);
            Number.isFinite(ie) && (W.isIntersecting ? K : ae).push(ie);
          }
          if ((K.length || ae.length) && De((W) => {
            let Z = null;
            for (const ie of K)
              W.has(ie) || (Z = Z || new Set(W), Z.add(ie));
            for (const ie of ae)
              W.has(ie) && (Z = Z || new Set(W), Z.delete(ie));
            return Z || W;
          }), K.length) {
            for (const W of K) {
              const Z = D.get(W);
              Z && (clearTimeout(Z), D.delete(W));
            }
            Oe((W) => {
              let Z = null;
              for (const ie of K)
                W.has(ie) || (Z = Z || new Set(W), Z.add(ie));
              return Z || W;
            });
          }
          for (const W of ae)
            D.has(W) || D.set(W, setTimeout(() => {
              D.delete(W), Oe((Z) => {
                if (!Z.has(W)) return Z;
                const ie = new Set(Z);
                return ie.delete(W), ie;
              });
            }, hi));
        },
        { root: c, rootMargin: mi, threshold: 0 }
      );
      J.current = V;
      for (const H of ee.current.values())
        try {
          V.observe(H);
        } catch {
        }
      return () => {
        V.disconnect(), J.current === V && (J.current = null);
        for (const H of D.values()) clearTimeout(H);
        D.clear();
      };
    }, [c]), _e(() => {
      N(0), F(""), De(/* @__PURE__ */ new Set()), Oe(/* @__PURE__ */ new Set()), de(/* @__PURE__ */ new Map()), ee.current.clear();
      const D = oe.current;
      for (const V of D.values()) clearTimeout(V);
      D.clear(), m == null || m(0, t);
    }, [k, m, t]);
    const Et = O(
      ({ numPages: D }) => {
        T.current === k && (N(D), F(""), m == null || m(D, t), u == null || u({ numPages: D, pane: t }));
      },
      [k, u, m, t]
    ), dt = O(
      (D) => {
        if (T.current !== k) return;
        const V = (D == null ? void 0 : D.message) || "PDF 解析失败";
        F(V), N(0), m == null || m(0, t), f == null || f(D, t);
      },
      [k, f, m, t]
    ), ve = G(
      () => I > 0 ? Array.from({ length: I }, (D, V) => V + 1) : [],
      [I]
    );
    $(() => {
      typeof IntersectionObserver < "u" || Oe(new Set(ve));
    }, [ve]);
    const Te = G(
      () => En(g, y, t),
      [g, y, t]
    ), Fe = G(() => {
      const D = /* @__PURE__ */ new Map();
      for (const V of h) {
        const H = En(V, y, t);
        if (!H) continue;
        const K = D.get(H.box.page) || [];
        K.push(H), D.set(H.box.page, K);
      }
      return D;
    }, [t, y, h]), ut = G(() => {
      if (I === 0) return /* @__PURE__ */ new Set();
      if (!(!!c && typeof IntersectionObserver < "u" && a)) return new Set(ve);
      if (ue.size === 0) {
        const H = Math.min(I, _t * 2 + 1);
        return new Set(Array.from({ length: H }, (K, ae) => ae + 1));
      }
      const V = /* @__PURE__ */ new Set();
      for (const H of ue)
        for (let K = -_t; K <= _t; K++) {
          const ae = H + K;
          ae >= 1 && ae <= I && V.add(ae);
        }
      return V;
    }, [I, ve, c, a, ue]), oo = !n || !!C || !!L, ao = n && (C || L) || s;
    return /* @__PURE__ */ j(
      "section",
      {
        ref: Y,
        className: `reader-panel ${_a}${a ? "" : " is-hidden"}`,
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
          oo && !z ? /* @__PURE__ */ S("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: ao }) : null,
          z ? /* @__PURE__ */ S("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          R && !C ? /* @__PURE__ */ S("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ S(
            jo,
            {
              file: R,
              loading: null,
              error: null,
              options: ne,
              onLoadSuccess: Et,
              onLoadError: dt,
              className: "reader-react-pdf-document",
              children: ve.map((D) => {
                if (ut.has(D))
                  return /* @__PURE__ */ S(
                    fi,
                    {
                      pane: t,
                      pageNumber: D,
                      width: Q,
                      devicePixelRatio: se,
                      active: It.has(D),
                      syncedMinHeight: (l == null ? void 0 : l.get(D)) || 0,
                      onMetrics: d,
                      cachedAspect: re.get(D),
                      onAspectChange: ye,
                      sentinelRef: lt(D),
                      regionHighlight: (Te == null ? void 0 : Te.box.page) === D ? Te : null,
                      regionTargets: Fe.get(D),
                      onSelectRegion: b,
                      liveTranslationLayout: P == null ? void 0 : P.layoutByPage.get(D - 1),
                      liveTranslationPage: P == null ? void 0 : P.pagesByPage.get(D - 1),
                      showLiveTranslation: v
                    },
                    `${t}-${D}`
                  );
                const H = re.get(D) ?? zr, K = Math.max(120, Math.floor(Q * H)), ae = Math.max(K, Math.ceil((l == null ? void 0 : l.get(D)) || 0));
                return /* @__PURE__ */ S(
                  "div",
                  {
                    ref: lt(D),
                    [We]: D,
                    [Je]: t,
                    [rn]: K,
                    className: on,
                    style: {
                      width: Q,
                      height: ae,
                      minHeight: ae
                    },
                    children: /* @__PURE__ */ S(
                      "div",
                      {
                        className: vt,
                        style: { width: Q, height: K },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${D}`
                );
              })
            },
            k
          ) }) : null
        ]
      }
    );
  }
), Un = Yt(bi), Dr = Qt(null), Or = Qt(null);
function yi({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ S(Dr.Provider, { value: e, children: /* @__PURE__ */ S(Or.Provider, { value: t, children: n }) });
}
function ct() {
  return en(Dr);
}
function vi() {
  return en(Or);
}
function Si({
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
function wi(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function Pi(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function Ri(e) {
  const t = ct(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", c = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, l = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), d = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, u = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? it, g = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, h = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), y = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, b = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, P = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, v = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", p = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", w = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, M = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, E = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), z = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), C = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), k = e.regions ?? (t == null ? void 0 : t.regions) ?? [], T = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), R = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), I = Si({
    mode: s,
    compareMode: c,
    showSource: i,
    showTranslated: l,
    markdownSplit: n,
    overlayOnSource: d
  }), N = wi(
    g,
    n || r,
    typeof document > "u" ? g * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ S(
    "div",
    {
      ref: u,
      className: Sr,
      "data-reader-region-count": k.length,
      "data-reader-structured-region-count": k.filter(ur).length,
      "data-reader-metadata-ready": T ? "true" : "false",
      children: /* @__PURE__ */ j(
        "main",
        {
          className: `${Na} reader-mode-${I.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            y ? /* @__PURE__ */ S(
              Un,
              {
                pane: "source",
                url: v,
                preloadedFile: w,
                userZoom: m,
                visible: I.showSource,
                scrollRoot: f,
                pageWidthOverride: N,
                rowHeights: I.compareMode ? h : void 0,
                onMetrics: E,
                emptyLabel: P ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: z,
                activeRegion: C,
                regions: k,
                readerMetadata: T,
                onSelectRegion: R,
                liveTranslation: d ? o : void 0,
                showLiveTranslation: d,
                liveTranslationPendingLabel: d ? Pi(o) : "",
                paneAction: d ? /* @__PURE__ */ j(Zt, { children: [
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
              Un,
              {
                pane: "translated",
                url: p,
                preloadedFile: M,
                userZoom: m,
                visible: I.showTranslated,
                scrollRoot: f,
                pageWidthOverride: N,
                rowHeights: I.compareMode ? h : void 0,
                onMetrics: E,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: z,
                activeRegion: C,
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
const Ti = [
  { id: "source", label: "源文件", Icon: hr },
  { id: "compare", label: "对照", Icon: pr },
  { id: "translated", label: "翻译文件", Icon: gr }
];
function Bn(e) {
  return `辅助面板占了右半边，对照只剩${e === "translated" ? "译文" : "原文"} · 点此关闭面板恢复对照`;
}
function Ii(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function Ei(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Mi(e) {
  const t = ct(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null,
    compareDegraded: s = !1,
    onRestoreCompare: c
  } = e, i = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, l = a ? Ii(a.state) : "";
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
          /* @__PURE__ */ S(Mo, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ S("span", { className: "reader-live-translation-toggle-label", children: l })
        ]
      }
    ) : null,
    /* @__PURE__ */ S("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: Ti.map(({ id: d, label: u, Icon: f }) => {
      const m = n === d, g = Ei({
        id: d,
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
          "aria-label": u,
          title: g ? `${u} 需要文档任务` : u,
          disabled: g,
          onClick: () => o(d),
          children: [
            /* @__PURE__ */ S(f, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ S("span", { className: "reader-workspace-tab-label", children: u })
          ]
        },
        d
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
          /* @__PURE__ */ S(Ao, { size: 13, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ S("span", { className: "reader-compare-degraded-label", children: Bn(n) })
        ]
      }
    ) : null
  ] });
}
const Ai = {
  markdown: { label: "Markdown", short: "MD", Icon: ko, needsJob: !0 }
}, ki = Tr.map(
  (e) => ({ id: e, ...Ai[e] })
), Li = {
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
}, Fr = Ir.map(
  (e) => ({ id: e, ...Li[e] })
);
function Ci(e) {
  return [
    ...ki.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: a
    })),
    ...Fr.filter((t) => e(t.adapterKey)).map(({ id: t, label: n, short: r, Icon: o }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: !1
    }))
  ];
}
function Ni() {
  const e = fe();
  return Ci((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function _i(e) {
  const t = ct(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), c = Ni();
  return n ? /* @__PURE__ */ j("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ S("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: c.map(({ id: i, label: l, Icon: d, needsJob: u }) => {
      const f = n === i, m = u && o, g = r == null ? void 0 : r[i];
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
            /* @__PURE__ */ S(d, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ S("span", { className: "reader-assistant-dock-tab-label", children: l }),
            g ? /* @__PURE__ */ S("span", { className: "reader-assistant-dock-badge", children: g }) : null
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
  ] }) : /* @__PURE__ */ S("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: c.map(({ id: i, label: l, short: d, Icon: u, needsJob: f }) => {
    const m = f && o, g = r == null ? void 0 : r[i];
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
          /* @__PURE__ */ S(u, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
          /* @__PURE__ */ S("span", { children: d }),
          g ? /* @__PURE__ */ S("span", { className: "reader-assistant-dock-badge", children: g }) : null
        ]
      },
      i
    );
  }) });
}
function xi(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function zi(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function Di(e) {
  return e / 100 * window.innerHeight;
}
function Oi(e) {
  return e / 100 * window.innerWidth;
}
function Fi(e) {
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
  const [o, a] = Fi(n);
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
      r = zi(t, o);
      break;
    }
    case "em": {
      r = xi(t, o);
      break;
    }
    case "vh": {
      r = Di(o);
      break;
    }
    case "vw": {
      r = Oi(o);
      break;
    }
  }
  return r;
}
function le(e) {
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
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.collapsedSize
      });
      s = le(d / n * 100);
    }
    let c;
    if (a.defaultSize !== void 0) {
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      c = le(d / n * 100);
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
    let l = 100;
    if (a.maxSize !== void 0) {
      const d = Xe({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      l = le(d / n * 100);
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
function q(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function qt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? $i : ji
  );
}
function $i(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function ji(e, t) {
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
function Ui({
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
  return q(o, "No rect found"), o;
}
let ht;
function Bi() {
  return ht === void 0 && (typeof matchMedia == "function" ? ht = !!matchMedia("(pointer:coarse)").matches : ht = !1), ht;
}
function Ur(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = qt(
    n,
    Array.from(t.children).filter($r).map((g) => ({ element: g }))
  ).map(({ element: g }) => g), s = [];
  let c = !1, i = !1, l = -1, d = -1, u = 0, f, m = [];
  {
    let g = -1;
    for (const h of a)
      h.hasAttribute("data-panel") && (g++, h.hasAttribute("data-disabled") || (u++, l === -1 && (l = g), d = g));
  }
  if (u > 1) {
    let g = -1;
    for (const h of a)
      if (h.hasAttribute("data-panel")) {
        g++;
        const y = r.find(
          (b) => b.element === h
        );
        if (y) {
          if (f) {
            const b = f.element.getBoundingClientRect(), P = h.getBoundingClientRect();
            let v;
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
                  const M = m[0], E = Ui({
                    orientation: n,
                    rects: [b, P],
                    targetRect: M.element.getBoundingClientRect()
                  });
                  v = [
                    M,
                    E === b ? w : p
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
            for (const p of v) {
              let w = "width" in p ? p : p.element.getBoundingClientRect();
              const M = Bi() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (w.width < M) {
                const z = M - w.width;
                w = new DOMRect(
                  w.x - z / 2,
                  w.y,
                  w.width + z,
                  w.height
                );
              }
              if (w.height < M) {
                const z = M - w.height;
                w = new DOMRect(
                  w.x,
                  w.y - z / 2,
                  w.width,
                  w.height + z
                );
              }
              const E = g <= l || g > d;
              !c && !E && s.push({
                group: e,
                groupSize: Ve({ group: e }),
                panels: [f, y],
                separator: "width" in p ? void 0 : p,
                rect: w
              }), c = !1;
            }
          }
          i = !1, f = y, m = [];
        }
      } else if (h.hasAttribute("data-separator")) {
        h.ariaDisabled !== null && (c = !0);
        const y = o.find(
          (b) => b.element === h
        );
        y ? m.push(y) : (f = void 0, m = []);
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
function Hi(e) {
  return ln.addListener("change", e);
}
function Wi(e) {
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
const Ji = (e) => e, xt = () => {
}, Hr = 1, Wr = 2, Jr = 4, Vr = 8, Hn = 3, Wn = 12;
let pt;
function Jn() {
  return pt === void 0 && (pt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (pt = !0)), pt;
}
function Vi({
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
function dn(e) {
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
      const o = Vi({
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
function qi(e) {
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
function un(e, t) {
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
      }), t.hitRegions.length > 0 && (dn(e), n = !0, t.hitRegions.forEach((r) => {
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
function Gi(e, t, n) {
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
function Ki(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function Zi(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: Yn(e),
    b: Yn(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  q(
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
const Yi = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function Xi(e) {
  const t = getComputedStyle(Kr(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function Qi(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || Xi(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || Yi.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function Kn(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (q(n, "Missing node"), Qi(n)) return n;
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
  return Ki(t) ? t.host : t;
}
function ec(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function tc({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!$r(n) || n.contains(e) || e.contains(n))
    return !0;
  if (Zi(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (ec(r.getBoundingClientRect(), t))
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
    const a = Ur(o), s = Gi(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && tc({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function nc(e, t) {
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
function ge(e, t) {
  return ce(e, t) ? 0 : e > t ? 1 : -1;
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
  return r = Math.min(c, r), r = le(r), r;
}
function ot({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: o,
  trigger: a
}) {
  if (ce(e, 0))
    return t;
  const s = a === "imperative-api", c = Object.values(t), i = Object.values(o), l = [...c], [d, u] = r;
  q(d != null, "Invalid first pivot index"), q(u != null, "Invalid second pivot index");
  let f = 0;
  switch (a) {
    case "keyboard": {
      {
        const h = e < 0 ? u : d, y = n[h];
        q(
          y,
          `Panel constraints not found for index ${h}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: v = 0
        } = y;
        if (P) {
          const p = c[h];
          if (q(
            p != null,
            `Previous layout not found for panel index ${h}`
          ), ce(p, b)) {
            const w = v - p;
            ge(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      {
        const h = e < 0 ? d : u, y = n[h];
        q(
          y,
          `No panel constraints found for index ${h}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: v = 0
        } = y;
        if (P) {
          const p = c[h];
          if (q(
            p != null,
            `Previous layout not found for panel index ${h}`
          ), ce(p, v)) {
            const w = p - b;
            ge(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      break;
    }
    default: {
      const h = e < 0 ? u : d, y = n[h];
      q(
        y,
        `Panel constraints not found for index ${h}`
      );
      const b = c[h], { collapsible: P, collapsedSize: v, minSize: p } = y;
      if (P && ge(b, p) < 0)
        if (e > 0) {
          const w = p - v, M = w / 2, E = b + e;
          ge(E, p) < 0 && (e = ge(e, M) <= 0 ? 0 : w);
        } else {
          const w = p - v, M = 100 - w / 2, E = b - e;
          ge(E, p) < 0 && (e = ge(100 + e, M) > 0 ? 0 : -w);
        }
      break;
    }
  }
  {
    const h = e < 0 ? 1 : -1;
    let y = e < 0 ? u : d, b = 0;
    for (; ; ) {
      const v = c[y];
      q(
        v != null,
        `Previous layout not found for panel index ${y}`
      );
      const p = Ue({
        overrideDisabledPanels: s,
        panelConstraints: n[y],
        prevSize: v,
        size: 100
      }) - v;
      if (b += p, y += h, y < 0 || y >= n.length)
        break;
    }
    const P = Math.min(Math.abs(e), Math.abs(b));
    e = e < 0 ? 0 - P : P;
  }
  {
    let h = e < 0 ? d : u;
    for (; h >= 0 && h < n.length; ) {
      const y = Math.abs(e) - Math.abs(f), b = c[h];
      q(
        b != null,
        `Previous layout not found for panel index ${h}`
      );
      const P = b - y, v = Ue({
        overrideDisabledPanels: s,
        panelConstraints: n[h],
        prevSize: b,
        size: P
      });
      if (!ce(b, v) && (f += b - v, l[h] = v, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? h-- : h++;
    }
  }
  if (nc(i, l))
    return o;
  {
    const h = e < 0 ? u : d, y = c[h];
    q(
      y != null,
      `Previous layout not found for panel index ${h}`
    );
    const b = y + f, P = Ue({
      overrideDisabledPanels: s,
      panelConstraints: n[h],
      prevSize: y,
      size: b
    });
    if (l[h] = P, !ce(P, b)) {
      let v = b - P, p = e < 0 ? u : d;
      for (; p >= 0 && p < n.length; ) {
        const w = l[p];
        q(
          w != null,
          `Previous layout not found for panel index ${p}`
        );
        const M = w + v, E = Ue({
          overrideDisabledPanels: s,
          panelConstraints: n[p],
          prevSize: w,
          size: M
        });
        if (ce(w, E) || (v -= E - w, l[p] = E), ce(v, 0))
          break;
        e > 0 ? p-- : p++;
      }
    }
  }
  const m = Object.values(l).reduce(
    (h, y) => y + h,
    0
  );
  if (!ce(m, 100, 0.1))
    return o;
  const g = Object.keys(o);
  return l.reduce((h, y, b) => (h[g[b]] = y, h), {});
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
  if (!ce(o, 100) && r.length > 0)
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      q(i != null, `No layout data found for index ${c}`);
      const l = 100 / o * i;
      r[c] = l;
    }
  let a = 0;
  for (let c = 0; c < t.length; c++) {
    const i = n[c];
    q(i != null, `No layout data found for index ${c}`);
    const l = r[c];
    q(l != null, `No layout data found for index ${c}`);
    const d = Ue({
      overrideDisabledPanels: !0,
      panelConstraints: t[c],
      prevSize: i,
      size: l
    });
    l != d && (a += l - d, r[c] = d);
  }
  if (!ce(a, 0))
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      q(i != null, `No layout data found for index ${c}`);
      const l = i + a, d = Ue({
        overrideDisabledPanels: !0,
        panelConstraints: t[c],
        prevSize: i,
        size: l
      });
      if (i !== d && (a -= d - i, r[c] = d, ce(a, 0)))
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
        defaultLayoutDeferred: d,
        derivedPanelConstraints: u,
        layout: f,
        groupSize: m,
        separatorToPanels: g
      }
    ] of i)
      if (l.id === e)
        return {
          defaultLayoutDeferred: d,
          derivedPanelConstraints: u,
          group: l,
          groupSize: m,
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
    const f = a(), m = l.findIndex((y) => y.id === t), g = m === 0, h = m === l.length - 1;
    if (h && i < f && (g || l.slice(0, m).every((y, b) => {
      const P = u[b];
      return (P == null ? void 0 : P.collapsible) && ce(P.collapsedSize, d[P.panelId]);
    }))) {
      const y = l.slice(0, m).reduce((b, P) => b + d[P.id], 0);
      return {
        ...d,
        [t]: le(100 - y)
      };
    }
    return ot({
      delta: h ? f - i : i - f,
      initialLayout: d,
      panelConstraints: u,
      pivotIndices: h ? [m - 1, m] : [m, m + 1],
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
      layout: g,
      separatorToPanels: h
    } = n(), y = s({
      nextSize: i,
      panels: f.panels,
      prevLayout: g,
      derivedPanelConstraints: u
    }), b = Ne({
      layout: y,
      panelConstraints: u
    });
    Ce(g, b) || Re(f, {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      groupSize: m,
      layout: b,
      separatorToPanels: h
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
      return i && ce(l, d);
    },
    resize: (i) => {
      const { group: l } = n(), { element: d } = o(), u = Ve({ group: l }), f = Xe({
        groupSize: u,
        panelElement: d,
        styleProp: i
      }), m = le(f / u * 100);
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
    (d) => d.element === e
  );
  q(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  q(a, "Matching panels not found");
  const s = a.map((d) => n.panels.indexOf(d)), c = Yr({ groupId: n.id }).getLayout(), i = ot({
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
        q(i, "Matching separator not found");
        const l = c.get(i);
        q(l, "Matching panels not found");
        const d = l[0], u = a.find(
          (f) => f.panelId === d.id
        );
        if (q(u, "Panel metadata not found"), u.collapsible) {
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
        q(o !== null, "Index not found");
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
    const { group: d, groupSize: u } = l, { orientation: f, panels: m } = d, { disableCursor: g } = d.mutableState;
    let h = 0;
    a ? f === "horizontal" ? h = (t.clientX - a.x) / u * 100 : h = (t.clientY - a.y) / u * 100 : f === "horizontal" ? h = t.clientX < 0 ? -100 : 100 : h = t.clientY < 0 ? -100 : 100;
    const y = r.get(d), b = o.get(d);
    if (!y || !b)
      return;
    const {
      defaultLayoutDeferred: P,
      derivedPanelConstraints: v,
      groupSize: p,
      layout: w,
      separatorToPanels: M
    } = b;
    if (v && w && M) {
      const E = ot({
        delta: h,
        initialLayout: y,
        panelConstraints: v,
        pivotIndices: l.panels.map((z) => m.indexOf(z)),
        prevLayout: w,
        trigger: "mouse-or-touch"
      });
      if (Ce(E, w)) {
        if (h !== 0 && !g)
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
  t.movementX === 0 ? i |= s & Hn : i |= c & Hn, t.movementY === 0 ? i |= s & Wn : i |= c & Wn, Wi(i), dn(e);
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
      }), dn(e.currentTarget);
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
function rc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = Ve({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, c = {
    asPercentage: le(a / o * 100),
    inPixels: a
  };
  r.mutableValues.prevSize = c, r.onResize(c, r.id, s);
}
function oc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function ac({
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
        const m = f / 100 * n, g = le(
          m / t * 100
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
      d[u] = le(
        f / a * l
      );
    }
  else {
    const u = le(
      l / i.length
    );
    for (const f of i)
      d[f] = u;
  }
  return d;
}
function sc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const $e = /* @__PURE__ */ new Map();
function ic(e) {
  let t = !0;
  q(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new n((g) => {
    for (const h of g) {
      const { borderBoxSize: y, target: b } = h;
      if (b === e.element) {
        if (t) {
          const P = Ve({ group: e });
          if (P === 0)
            return;
          const v = Me(e.id);
          if (!v)
            return;
          const p = Vt(e), w = v.defaultLayoutDeferred ? ar(p) : v.layout, M = ac({
            group: e,
            nextGroupSize: P,
            prevGroupSize: v.groupSize,
            prevLayout: w
          }), E = Ne({
            layout: M,
            panelConstraints: p
          });
          if (!v.defaultLayoutDeferred && Ce(v.layout, E) && oc(
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
        rc(e, b, y);
    }
  });
  a.observe(e.element), e.panels.forEach((g) => {
    q(
      !r.has(g.id),
      `Panel ids must be unique; id "${g.id}" was used more than once`
    ), r.add(g.id), g.onResize && a.observe(g.element);
  });
  const s = Ve({ group: e }), c = Vt(e), i = e.panels.map(({ id: g }) => g).join(",");
  let l = e.mutableState.defaultLayout;
  l && (sc(e.panels, l) || (l = void 0));
  const d = e.mutableState.layouts[i] ?? l ?? ar(c), u = Ne({
    layout: d,
    panelConstraints: c
  }), f = e.element.ownerDocument;
  $e.set(
    f,
    ($e.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return Ur(e).forEach((g) => {
    g.separator && m.set(g.separator, g.panels);
  }), Re(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: c,
    groupSize: s,
    layout: u,
    separatorToPanels: m
  }), e.separators.forEach((g) => {
    q(
      !o.has(g.id),
      `Separator ids must be unique; id "${g.id}" was used more than once`
    ), o.add(g.id), g.element.addEventListener("keydown", Qn);
  }), $e.get(f) === 1 && (f.addEventListener("contextmenu", Gn, !0), f.addEventListener("dblclick", Xn, !0), f.addEventListener("pointerdown", er, !0), f.addEventListener("pointerleave", tr), f.addEventListener("pointermove", nr), f.addEventListener("pointerout", rr), f.addEventListener("pointerup", or, !0)), function() {
    t = !1, $e.set(
      f,
      Math.max(0, ($e.get(f) ?? 0) - 1)
    ), qi(e), e.separators.forEach((g) => {
      g.element.removeEventListener("keydown", Qn);
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
function cc() {
  const [e, t] = _({}), n = O(() => t({}), []);
  return [e, n];
}
function mn(e) {
  const t = dr();
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
function lc(e, t) {
  const n = A({
    getLayout: () => ({}),
    setLayout: Ji
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
  orientation: d = "horizontal",
  resizeTargetMinimumSize: u = {
    coarse: 20,
    fine: 10
  },
  style: f,
  ...m
}) {
  const g = A({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), h = et((T) => {
    Ce(g.current.onLayoutChange, T) || (g.current.onLayoutChange = T, i == null || i(T));
  }), y = et(
    (T, R) => {
      Ce(g.current.onLayoutChanged, T) || (g.current.onLayoutChanged = T, l == null || l(T, { isUserInteraction: R }));
    }
  ), b = mn(c), P = A(null), [v, p] = cc(), w = A({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: u,
    separators: []
  }), M = hn(P, a);
  lc(b, s);
  const E = et(
    (T, R) => {
      const I = Le(), N = qn(T), L = Me(T);
      if (L) {
        let F = !1;
        switch (I.state) {
          case "active": {
            F = I.hitRegions.some(
              (U) => U.group === N
            );
            break;
          }
        }
        return {
          flexGrow: L.layout[R] ?? 1,
          pointerEvents: F ? "none" : void 0
        };
      }
      if (n != null && n[R])
        return {
          flexGrow: n == null ? void 0 : n[R]
        };
    }
  ), z = pn({
    defaultLayout: n,
    disableCursor: r
  }), C = G(
    () => ({
      get disableCursor() {
        return !!z.disableCursor;
      },
      getPanelStyles: E,
      id: b,
      orientation: d,
      registerPanel: (T) => {
        const R = w.current;
        return R.panels = qt(d, [
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
        return R.separators = qt(d, [
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
          (F) => F.id === T
        );
        I && (I.panelConstraints.disabled = R);
        const N = qn(b), L = Me(b);
        N && L && Re(N, {
          ...L,
          derivedPanelConstraints: Vt(N)
        });
      },
      updateSeparatorProps: (T, {
        disabled: R,
        disableDoubleClick: I
      }) => {
        const N = w.current.separators.find(
          (L) => L.id === T
        );
        N && (N.disabled = R, N.disableDoubleClick = I);
      }
    }),
    [E, b, p, d, z]
  ), k = A(null);
  return ze(() => {
    const T = P.current;
    if (T === null)
      return;
    const R = w.current;
    let I;
    if (z.defaultLayout !== void 0 && Object.keys(z.defaultLayout).length === R.panels.length) {
      I = {};
      for (const B of R.panels) {
        const x = z.defaultLayout[B.id];
        x !== void 0 && (I[B.id] = x);
      }
    }
    const N = {
      disabled: !!o,
      element: T,
      id: b,
      mutableState: {
        defaultLayout: I,
        disableCursor: !!z.disableCursor,
        expandedPanelSizes: w.current.lastExpandedPanelSizes,
        layouts: w.current.layouts
      },
      orientation: d,
      panels: R.panels,
      resizeTargetMinimumSize: R.resizeTargetMinimumSize,
      separators: R.separators
    };
    k.current = N;
    const L = ic(N), { defaultLayoutDeferred: F, derivedPanelConstraints: U, layout: Y } = Me(N.id, !0);
    !F && U.length > 0 && (h(Y), y(Y, !1));
    const te = un(b, (B) => {
      const { defaultLayoutDeferred: x, derivedPanelConstraints: X, layout: se } = B.next;
      if (x || X.length === 0)
        return;
      const ne = N.panels.map(({ id: re }) => re).join(",");
      N.mutableState.layouts[ne] = se, X.forEach((re) => {
        if (re.collapsible) {
          const { layout: de } = B.prev ?? {};
          if (de) {
            const ue = ce(
              re.collapsedSize,
              se[re.panelId]
            ), De = ce(
              re.collapsedSize,
              de[re.panelId]
            );
            ue && !De && (N.mutableState.expandedPanelSizes[re.panelId] = de[re.panelId]);
          }
        }
      });
      const Q = Le().state !== "active";
      h(se), Q && y(se, B.isUserInteraction);
    });
    return () => {
      k.current = null, L(), te();
    };
  }, [
    o,
    b,
    y,
    h,
    d,
    v,
    z
  ]), $(() => {
    const T = k.current;
    T && (T.mutableState.defaultLayout = n, T.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ S(Qr.Provider, { value: C, children: /* @__PURE__ */ S(
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
eo.displayName = "Group";
function gn() {
  const e = en(Qr);
  return q(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function dc(e, t) {
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
  minSize: d = "0%",
  onResize: u,
  panelRef: f,
  style: m,
  ...g
}) {
  const h = !!i, y = mn(i), b = pn({
    disabled: a
  }), P = A(null), v = hn(P, s), {
    getPanelStyles: p,
    id: w,
    orientation: M,
    registerPanel: E,
    updatePanelProps: z
  } = gn(), C = u !== null, k = et(
    (N, L, F) => {
      u == null || u(N, i, F);
    }
  );
  ze(() => {
    const N = P.current;
    if (N !== null) {
      const L = {
        element: N,
        id: y,
        idIsStable: h,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: C ? k : void 0,
        panelConstraints: {
          groupResizeBehavior: c,
          collapsedSize: n,
          collapsible: r,
          defaultSize: o,
          disabled: b.disabled,
          maxSize: l,
          minSize: d
        }
      };
      return E(L);
    }
  }, [
    c,
    n,
    r,
    o,
    C,
    y,
    h,
    l,
    d,
    k,
    E,
    b
  ]), $(() => {
    z(y, { disabled: a });
  }, [a, y, z]), dc(y, f);
  const T = () => {
    const N = p(w, y);
    if (N)
      return JSON.stringify(N);
  }, R = io(
    (N) => un(w, N),
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
      ...g,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": y,
      id: y,
      ref: v,
      style: {
        ...uc,
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
const uc = {
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
function fc({
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
    a = Ne({
      layout: ot({
        delta: l - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], o = Ne({
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
  }), [d, u] = _({}), [f, m] = _("inactive"), [g, h] = _(!1), y = A(null), b = hn(y, o), {
    disableCursor: P,
    id: v,
    orientation: p,
    registerSeparator: w,
    updateSeparatorProps: M
  } = gn(), E = p === "horizontal" ? "vertical" : "horizontal";
  ze(() => {
    const k = y.current;
    if (k !== null) {
      const T = {
        disabled: l.disabled,
        disableDoubleClick: l.disableDoubleClick,
        element: k,
        id: i
      }, R = w(T), I = Hi(
        (L) => {
          m(
            L.next.state !== "inactive" && L.next.hitRegions.some(
              (F) => F.separator === T
            ) ? L.next.state : "inactive"
          );
        }
      ), N = un(
        v,
        (L) => {
          const { derivedPanelConstraints: F, layout: U, separatorToPanels: Y } = L.next, te = Y.get(T);
          if (te) {
            const B = te[0], x = te.indexOf(B);
            u(
              fc({
                layout: U,
                panelConstraints: F,
                panelId: B.id,
                panelIndex: x
              })
            );
          }
        }
      );
      return () => {
        I(), N(), R();
      };
    }
  }, [v, i, w, l]), $(() => {
    M(i, { disabled: n, disableDoubleClick: r });
  }, [n, r, i, M]);
  let z;
  n && !P && (z = "not-allowed");
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
  return /* @__PURE__ */ S(
    "div",
    {
      ...c,
      "aria-controls": d.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": E,
      "aria-valuemax": d.valueMax,
      "aria-valuemin": d.valueMin,
      "aria-valuenow": d.valueNow,
      children: e,
      className: t,
      "data-separator": C,
      "data-testid": i,
      id: i,
      onBlur: () => h(!1),
      onFocus: () => h(!0),
      ref: b,
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
to.displayName = "Separator";
const bn = 30, yn = 65, at = 50, mc = 100 - yn, hc = 100 - bn;
function pc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(yn, Math.max(bn, t)) : at;
}
function vn(e) {
  return 100 - e;
}
function je(e) {
  return `${e}%`;
}
const Sn = "reader-document", st = "reader-assistant", no = "retainpdf.reader.ai-split-layout.v1", gc = {
  [Sn]: vn(at),
  [st]: at
};
function wn(e) {
  const t = pc(e == null ? void 0 : e[st]);
  return {
    [Sn]: vn(t),
    [st]: t
  };
}
function bc() {
  try {
    const e = JSON.parse(localStorage.getItem(no) || "null");
    return wn(e);
  } catch {
    return gc;
  }
}
function yc(e) {
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
function vc() {
  const e = A(null), [t] = _(bc);
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
    zt(e.current, o), a.isUserInteraction && yc(o);
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
            minSize: je(mc),
            maxSize: je(hc)
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
function Sc({
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
function wc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = _(!1);
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
function Pc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ S(wc, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ j(Zt, { children: [
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
function Rc(e) {
  if (e.selectionType !== "region") return null;
  const t = `${e.region.source.text || ""}`.trim(), n = `${e.region.translated.text || ""}`.trim();
  return !t || !n || t === n ? null : { source: t, translated: n };
}
function Tc(e, t) {
  const n = e.selectionType === "text" ? "text" : e.kind, r = Rc(e), o = r != null, a = o && t ? t : e.pane, s = r ? r[a] : e.selectionType === "text" ? e.quote : mr(e.region, a), c = e.selectionType === "region" ? Dt(e.region, a).page : e.page;
  return {
    kind: n,
    pane: a,
    page: c,
    text: s,
    copyValue: n === "formula" ? Po(s) : s,
    canSwitch: o,
    showPeek: o && a !== e.pane
  };
}
const sr = {
  source: "原文",
  translated: "译文"
}, ir = 190, cr = 16;
function Ic() {
  const e = typeof window > "u" ? 800 : window.innerWidth;
  if (typeof document > "u") return e;
  const t = document.querySelector(`.${Sr}`), n = (t == null ? void 0 : t.getBoundingClientRect().width) ?? 0;
  return n > 0 ? n : e;
}
function Ec(e, t) {
  const n = cr + ir, r = t - cr - ir;
  return r < n ? t / 2 : Math.min(Math.max(n, e), r);
}
async function Mc(e) {
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
function Ac({
  selection: e,
  onDismiss: t,
  onAskAi: n
}) {
  const [r, o] = _(!1), [a, s] = _(null), c = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if ($(() => s(null), [c]), $(() => o(!1), [c, a]), !e)
    return null;
  const i = Tc(e, a), l = typeof window < "u" ? window.innerHeight : 600, d = e.rect.left + e.rect.width / 2, u = Ec(d, Ic()), f = e.rect.top > (i.showPeek ? 220 : 72), m = f ? Math.max(12, e.rect.top - 8) : Math.min(l - 12, e.rect.top + e.rect.height + 8), g = f ? "above" : "below", h = i.kind, y = h === "formula" ? "公式" : h === "table" ? "表格" : h === "figure" ? "图片" : h === "text" ? "文字" : "区域", b = i.copyValue, P = h === "formula" ? Lo : h === "table" ? Co : h === "text" ? No : _o;
  return /* @__PURE__ */ j(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${g} reader-sel-pop--region`,
      style: { left: u, top: m },
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
              /* @__PURE__ */ S("span", { children: y }),
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
              b ? /* @__PURE__ */ j(
                "button",
                {
                  type: "button",
                  className: "reader-sel-pop-btn reader-sel-pop-btn--primary",
                  onClick: async () => {
                    try {
                      await Mc(b), o(!0), window.setTimeout(() => o(!1), 1400);
                    } catch (v) {
                      console.warn("[reader-selection] copy failed", v);
                    }
                  },
                  children: [
                    r ? /* @__PURE__ */ S(xo, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ S(zo, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
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
function kc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Lc() {
  const [e, t] = _(!1), n = dr(), r = A(null);
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
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || kc(a.target)) return;
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
        children: /* @__PURE__ */ S(Do, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
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
          /* @__PURE__ */ S("div", { className: "reader-react-shortcuts-body", children: Os.map((o) => /* @__PURE__ */ j("section", { className: "reader-react-shortcuts-group", children: [
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
const Cc = ["source", "sideBySide", "translated"], Nc = { source: "", translated: "", sideBySide: "" };
function _c(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = bt(e.sourceUrl), n = bt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return Qo({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function xc(e) {
  const [t, n] = _(() => /* @__PURE__ */ new Set()), r = G(
    () => e ? _c(e) : Nc,
    [e]
  ), o = G(
    () => Cc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = O(async (s) => {
    if (!e) return;
    const c = bt(r[s]);
    if (!(!c || t.has(s)))
      try {
        const i = e.jobId ? Xo(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await ea(
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
        ta(l), n((d) => {
          const u = new Set(d);
          return u.delete(s), u;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const zc = {
  source: hr,
  sideBySide: pr,
  translated: gr
}, Dc = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function Oc(e) {
  const t = ct(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = xc(n);
  return /* @__PURE__ */ j("div", { className: "reader-download-actions", role: "group", "aria-label": "下载 PDF", children: [
    /* @__PURE__ */ S("span", { className: "reader-download-actions-prefix", "aria-hidden": !0, children: /* @__PURE__ */ S(Oo, { size: 14, strokeWidth: 2.2 }) }),
    o.map((c) => {
      const i = ho[c], l = bt(r[c]), d = a.has(c), u = !!l && !d, f = u ? "" : po(c, r), m = zc[c];
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
            title: u ? `下载${i.label}` : f,
            children: /* @__PURE__ */ j(
              "button",
              {
                type: "button",
                id: `reader-download-${c}`,
                className: `reader-download-action${d ? " is-busy" : ""}`,
                disabled: !u,
                "aria-label": u ? `下载${i.label}` : f,
                onClick: () => void s(c),
                children: [
                  /* @__PURE__ */ S(m, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
                  /* @__PURE__ */ S("span", { className: "reader-download-action-label", children: Dc[c] })
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
function Fc(e) {
  const t = ct(), n = vi(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? it, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), c = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, l = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), d = Fa(a), u = a > Pr + 1e-3, f = a < Rr - 1e-3, m = Qe(), g = "50%（半屏，对照铺满）", [h, y] = _(!1), [b, P] = _(`${c}`);
  $(() => {
    h || P(`${Math.min(Math.max(c, 1), Math.max(i, 1))}`);
  }, [c, i, h]);
  const v = () => {
    if (y(!1), !l || i <= 0)
      return;
    const p = Number(`${b}`.trim());
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
              value: b,
              autoFocus: !0,
              onChange: (p) => P(p.target.value.replace(/[^\d]/g, "")),
              onBlur: v,
              onKeyDown: (p) => {
                p.key === "Escape" && (p.preventDefault(), y(!1), P(`${c}`));
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
          !l || i <= 0 || (P(`${c}`), y(!0));
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
          disabled: !u,
          onClick: () => s(rt(a, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ j(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn reader-react-hud-zoom-label",
          "aria-label": `重置为${g}`,
          title: g,
          onClick: () => s(m),
          children: [
            d,
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
    /* @__PURE__ */ S("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ S(Lc, {}) })
  ] });
}
function lr(e) {
  var t, n;
  return Er(e == null ? void 0 : e.assistantPanel) ? e.assistantPanel : ((t = e == null ? void 0 : e.splitLayout) == null ? void 0 : t.left) === "markdown" || ((n = e == null ? void 0 : e.splitLayout) == null ? void 0 : n.right) === "markdown" ? "markdown" : null;
}
function $c(e) {
  const [t, n] = _(() => ({
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
function jc({
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
function Uc(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: o = "等待响应...",
    percent: a = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    Ot.dismiss(Kt);
    return;
  }
  Ot.custom(
    () => /* @__PURE__ */ S(jc, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: Kt, duration: 1 / 0 }
  );
}
function Bc() {
  const e = O((t) => {
    t && (t.setState = Uc, t.hide = () => Ot.dismiss(Kt));
  }, []);
  return /* @__PURE__ */ j(Zt, { children: [
    /* @__PURE__ */ S(Eo, { position: "bottom-right" }),
    /* @__PURE__ */ S("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function ro(e) {
  const t = A(!1);
  return e && (t.current = !0), t.current;
}
function Hc(e, t) {
  const n = e === t;
  return { open: n, mounted: ro(n) };
}
function Wc({
  panel: e,
  active: t,
  context: n
}) {
  var i;
  const r = t === e.id, o = ro(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = fe(), c = (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, { ...n, open: r });
  return c == null ? null : /* @__PURE__ */ S(
    Sc,
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
const Jc = lo(() => import("./ReaderMarkdownPanel-BgzGGu3D.js").then((e) => ({ default: e.ReaderMarkdownPanel })));
function Vc(e) {
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
function qc(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function Gc() {
  const e = zs(), { boot: t, panes: n, sessionFiles: r, session: o } = e, a = $c(e.viewStateKey), s = a.panel, c = a.setPanel, [i, l] = _(null), [d, u] = _(null), [f, m] = _(null), [g, h] = _(!1), y = A(null), b = s !== null, P = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, v = Vc({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: P,
    liveTranslationVisible: g,
    assistantOpen: b,
    assistantPdfPane: i
  }), p = O(() => m(null), []), w = f ? uo({ jobId: o.jobId, name: f, onClose: p }) : null, M = Ms({
    hasOverlayContent: P,
    connection: e.liveTranslation.connection,
    showSource: v.showSource
  }), E = v.sourceViewOnly, z = v.visibleMode;
  $(() => {
    u(null), m(null), h(!1);
  }, [e.viewStateKey]), $(() => {
    e.session.jobTerminal && h(!1);
  }, [e.session.jobTerminal]), $(() => {
    l(null);
  }, [a.scope]), $(() => {
    if (!(t.loading || t.failed)) {
      if (y.current !== e.viewStateKey) {
        y.current = e.viewStateKey;
        const B = Pe(e.viewStateKey), x = E ? "source" : B == null ? void 0 : B.mode;
        x && x !== e.mode && e.setModeKeepingPage(x);
        return;
      }
      Tt(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, E]);
  const C = s || (e.mode === "compare" ? "compare" : "reading"), k = Hc(s, "markdown");
  js({
    mode: z,
    sourceOnly: e.sourceOnly,
    setMode: e.setModeKeepingPage,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    currentPage: e.currentPage,
    numPages: n.hudNumPages,
    goToPage: e.goToPage,
    enabled: e.showHud
  });
  const T = O(() => {
    c(null), l(null), u(null);
  }, []), R = O((B) => {
    l(null);
    const x = qc(B, e.liveTranslationAvailable);
    x !== null && h(x), e.setModeKeepingPage(B);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), I = G(() => M.sourcePaneToggle ? /* @__PURE__ */ S(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${g ? " is-active" : ""}`,
      onClick: () => h((B) => !B),
      "aria-pressed": g,
      title: g ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ) : null, [M.sourcePaneToggle, g]), N = O((B) => {
    c(B);
  }, []), L = G(() => ({
    sessionKey: o.jobId || o.documentId || "reader",
    pendingInput: d,
    onOpenBoard: m,
    onClose: T
  }), [T, o.documentId, o.jobId, d]), F = O((B) => {
    const x = B.pane === "translated" && !E ? "translated" : "source", X = Ro(B);
    u((se) => ({ text: X, token: ((se == null ? void 0 : se.token) ?? 0) + 1 })), c("terminal"), l(x), e.clearSelection();
  }, [e.clearSelection, E]), U = G(() => ({
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
    sourceViewOnly: E,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: N, close: T }
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
    E,
    e.download,
    e.goToPage,
    N,
    T
  ]), Y = G(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), te = [
    Ca,
    `is-workspace-${C}`,
    b ? "is-assistant-open" : "",
    v.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ S(yi, { value: U, hud: Y, children: /* @__PURE__ */ j("div", { className: te, "data-reader-engine": "react-pdf", "data-reader-workspace": C, children: [
    /* @__PURE__ */ S(Pc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ j("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ S(Oc, {}),
      /* @__PURE__ */ S(Vs, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ S(
      Mi,
      {
        mode: z,
        documentReady: !!o.jobId,
        sourceViewOnly: E,
        onModeChange: R,
        liveTranslation: M.topBarPill ? {
          visible: g,
          state: e.liveTranslation,
          onToggle: () => h((B) => !B)
        } : null,
        compareDegraded: v.compareDegradedByAssistant,
        onRestoreCompare: T
      }
    ),
    /* @__PURE__ */ S(_i, { active: s }),
    b ? /* @__PURE__ */ S(vc, {}) : null,
    /* @__PURE__ */ S(Ri, { paneComposition: v, markdownSplit: k.open, assistantSplit: b, liveTranslation: e.liveTranslation, sourcePaneAction: I }),
    w,
    e.showHud ? /* @__PURE__ */ S(
      Fc,
      {
        mode: z,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ j(co, { fallback: null, children: [
      Fr.map((B) => /* @__PURE__ */ S(
        Wc,
        {
          panel: B,
          active: s,
          context: L
        },
        B.id
      )),
      k.mounted ? /* @__PURE__ */ S(Jc, { open: k.open, jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: T }) : null
    ] }),
    /* @__PURE__ */ S(Ac, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: F }),
    /* @__PURE__ */ S(Bc, {})
  ] }) });
}
function ul() {
  return /* @__PURE__ */ S(Gc, {});
}
export {
  ul as R,
  Gc as a,
  Sc as b,
  ll as d,
  cl as f,
  dl as r
};
//# sourceMappingURL=ReaderApp-CDMrD1L7.js.map
