var En = (e) => {
  throw TypeError(e);
};
var Mn = (e, t, n) => t.has(e) || En("Cannot " + n);
var Ze = (e, t, n) => (Mn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), An = (e, t, n) => t.has(e) ? En("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), kn = (e, t, n, r) => (Mn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as j, jsx as y, Fragment as en } from "react/jsx-runtime";
import { useMemo as Z, useState as C, useEffect as F, useCallback as O, useRef as k, useLayoutEffect as ze, memo as tn, forwardRef as fo, useImperativeHandle as nn, createContext as rn, useContext as on, useSyncExternalStore as mo, useId as mr, Suspense as po, lazy as ho } from "react";
import { requireAdapter as Ve, getReaderAdapters as he, renderReaderBoardSlot as go } from "./adapters.js";
import { resolveReaderDownloadName as bo, resolveReaderDownloadUrls as yo, READER_PROGRESS_COPY as Pe, trimString as yt, READER_DOWNLOAD_ACTIONS as vo, disabledReason as So } from "./runtime/state.js";
import "@retainpdf/api/conversations";
import { r as wo, b as Po } from "./page-config-Ct7qR5rm.js";
import { c as Ro, n as To, f as kt, j as $t, a as Io, b as Eo, i as pr, p as Pt, g as hr, r as Rt, k as Ln, e as Mo, h as Ao } from "./reader-regions-Dl_ljaDa.js";
import { isReaderTransportError as ko, createReaderTransportError as Lo } from "./contracts.js";
import { toast as jt, Toaster as Co } from "sonner";
import { X as an, Radio as _o, FileText as gr, Columns2 as br, Languages as yr, PanelRightClose as No, FileCode2 as xo, Sparkles as vr, Sigma as zo, Table2 as Do, Type as Oo, Image as Fo, Check as $o, Copy as jo, Keyboard as Uo, Download as Bo } from "lucide-react";
import { pdfjs as Ho, Page as Wo, Document as Jo } from "react-pdf";
import { e as Vo, m as qo, a as Ko } from "./markdown-math-XkF5urpn.js";
const Go = (...e) => {
  var t, n;
  return ((n = (t = he()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, Zo = "", Yo = Object.freeze({
  progress: "retainpdf-reader-progress"
}), Xo = (e) => {
  var t, n;
  return ((n = (t = he()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, pl = (...e) => {
  var n;
  return (((n = he()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Ee = () => Ve("defaultReaderDataPort"), Cn = () => Ve("defaultReaderPageConfigPort"), hl = {
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
}, Sr = {
  messageTargetOrigin: () => Cn().messageTargetOrigin(),
  readerJobId: () => Cn().readerJobId()
}, Qo = () => {
  var e;
  return ((e = he()) == null ? void 0 : e.liveTranslation) ?? null;
}, rt = () => {
  var t;
  const e = he();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, sn = () => {
  const e = he();
  if (e != null && e.sessionData) return e.sessionData;
  const t = e == null ? void 0 : e.defaultReaderDataPort;
  if (!t) throw new Error("Reader adapter missing: defaultReaderDataPort (call setReaderAdapters)");
  return {
    loadReaderPayload: t.loadReaderPayload,
    loadJobPayload: t.loadJobPayload,
    fetchDocumentByJobId: (...n) => Ve("fetchDocumentByJobId")(...n),
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
}, ea = (...e) => {
  var t, n;
  return ((n = (t = he()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, ta = () => {
  var e, t;
  return ((t = (e = he()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, na = (...e) => {
  var t, n;
  return ((n = (t = he()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, ra = (...e) => {
  var t, n;
  return ((n = (t = he()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? bo(...e);
}, oa = (...e) => {
  var t, n;
  return ((n = (t = he()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? yo(...e);
}, aa = (...e) => Ve("downloadProtectedResource")(...e), sa = (...e) => Ve("failDownloadToast")(...e), gl = (e, t) => Ve("resolveMarkdownAssetUrl")(e, t), ia = "/api/v1";
function ca() {
  const e = () => {
    var r;
    return wo(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = C(e);
  return F(() => {
    var c, i, l, u;
    const r = () => n(e()), o = (i = (c = globalThis.history) == null ? void 0 : c.pushState) == null ? void 0 : i.bind(globalThis.history), a = (u = (l = globalThis.history) == null ? void 0 : l.replaceState) == null ? void 0 : u.bind(globalThis.history);
    let s = !1;
    if (o && a)
      try {
        const d = (f) => function(...m) {
          const p = f.apply(this, m);
          return r(), globalThis.dispatchEvent(new Event("pushstate")), globalThis.dispatchEvent(new Event("replacestate")), globalThis.dispatchEvent(new Event("locationchange")), p;
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
function la() {
  const e = ca(), t = Z(() => na(Sr), [e]), n = Z(() => ta(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function ua(e) {
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
  }), [u, d] = C({
    documentId: "",
    jobId: ""
  }), f = i.documentId === t ? i.jobId : "", m = u.documentId === t ? u.jobId : "", p = n || f, [h, v] = C({
    jobId: "",
    documentId: ""
  }), b = h.jobId === p ? h.documentId : "", P = t || b, S = !!t && !p, [g, w] = C(null), L = (g == null ? void 0 : g.sessionIdentity) === r && g.documentId === P ? g : null, E = S || !!L, D = O((N) => {
    const T = `${N.documentId || ""}`.trim();
    if (!T || a.current && a.current !== T) return;
    if (!a.current && s.current)
      v({
        jobId: s.current,
        documentId: T
      });
    else if (!a.current)
      return;
    const I = `${N.revision || ""}`.trim() || `${Date.now()}`;
    w({
      documentId: T,
      revision: I,
      sessionIdentity: o.current
    }), c();
  }, []);
  F(() => {
    w((N) => N && N.sessionIdentity !== r ? null : N);
  }, [r]);
  const _ = O((N) => {
    switch (N.type) {
      case "resolved-document-job":
        l({ documentId: N.documentId, jobId: N.jobId });
        break;
      case "cleared-resolved-document-job":
        l({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        d({ documentId: N.documentId, jobId: N.jobId });
        break;
      case "resolved-job-document":
        v((T) => T.jobId === N.jobId && T.documentId === N.documentId ? T : { jobId: N.jobId, documentId: N.documentId });
        break;
      case "committed-source":
        w({
          documentId: N.documentId,
          revision: N.revision,
          sessionIdentity: N.sessionIdentity
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
    sessionJobId: p,
    resolvedJobDocument: h,
    setResolvedJobDocument: v,
    jobDocumentId: b,
    documentId: P,
    sourceOnly: S,
    committedDocumentSource: g,
    setCommittedDocumentSource: w,
    activeCommittedDocumentSource: L,
    sourceViewOnly: E,
    refreshCommittedDocument: D,
    applyIdentityEvent: _
  };
}
const da = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function _n(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function fa(e) {
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
function Nn(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return Xo(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function ma(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function pa(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !ma(a, t))
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
        type: Yo.progress,
        stage: n,
        percent: e,
        text: t
      },
      Sr.messageTargetOrigin()
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
function ha(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [c, i] = C(null), [l, u] = C(null), [d, f] = C(""), [m, p] = C(0), h = d === n ? c : null, v = d === n ? l : null, b = _n(h), P = da.has(b), S = O(() => {
    p((_) => _ + 1);
  }, []), g = O((_) => {
    i(_.jobPayload), u(_.manifestPayload), f(_.sessionIdentity);
  }, []), w = O((_) => {
    i(null), u(null), f(_);
  }, []), L = k(""), E = k(""), D = O(async () => {
    const _ = o.current;
    if (!_ || L.current === _) return;
    const N = sn().loadJobPayload;
    if (typeof N != "function") return;
    const T = a.current.value;
    L.current = _;
    try {
      const I = await N(_);
      if (s.current || a.current.value !== T || o.current !== _ || !I || typeof I != "object")
        return;
      const R = _n(I);
      i(I), f(r.current), R === "succeeded" && E.current !== _ && (E.current = _, p((A) => A + 1));
    } catch {
    } finally {
      L.current === _ && (L.current = "");
    }
  }, []);
  return F(() => {
    E.current = "";
  }, [n]), F(() => {
    if (!t || P || !h) return;
    const _ = window.setInterval(() => {
      D();
    }, 1e3);
    return () => window.clearInterval(_);
  }, [P, D, h, t]), {
    jobPayload: c,
    setJobPayload: i,
    manifestPayload: l,
    setManifestPayload: u,
    payloadSessionIdentity: d,
    setPayloadSessionIdentity: f,
    scopedJobPayload: h,
    scopedManifestPayload: v,
    jobStatus: b,
    jobTerminal: P,
    jobRefreshRevision: m,
    refreshJobArtifacts: S,
    refreshJobStatus: D,
    publishPayload: g,
    clearPayload: w
  };
}
function Bt(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function ga(e, t) {
  e(t), Bt(t);
}
function ba(e) {
  const [t, n] = C(e ? "source" : "compare"), r = O((a) => {
    e && a !== "source" || (n(a), Bt(a));
  }, [e]), o = O((a) => {
    ga(n, a);
  }, []);
  return F(() => (e && document.documentElement.classList.add("reader-source-only"), Bt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: o };
}
function xn(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function ya(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: xn(n.active_job_id),
    activeVersionId: xn(n.active_version_id)
  };
}
function va(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function Sa(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function wa(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function Pa(e) {
  return e ? { data: e.data.slice() } : null;
}
const Ra = 2, ye = /* @__PURE__ */ new Map();
function Ht(e, t) {
  ye.delete(e), ye.set(e, t);
}
function Ta(e) {
  if (ye.size < Ra) return;
  const t = ye.keys().next().value;
  t && ye.delete(t);
}
function Lt(e) {
  const t = `${e || ""}`.trim();
  if (!t || !ye.has(t)) return null;
  const n = ye.get(t);
  return Ht(t, n), n;
}
async function wr(e, t = rt().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (ye.has(r)) {
    const c = ye.get(r);
    return Ht(r, c), c;
  }
  const o = await t(r, { signal: n.signal });
  if (!o.ok) {
    const c = new Error(`读取 PDF 失败 (${o.status})`);
    throw c.status = o.status, c;
  }
  const a = await o.arrayBuffer(), s = { data: new Uint8Array(a) };
  return ye.has(r) ? Ht(r, s) : (Ta(), ye.set(r, s)), s;
}
function Ia(e = "", t = null) {
  const [n, r] = C(
    () => t || Lt(e)
  ), [o, a] = C(
    () => !!`${e || ""}`.trim() && !t && !Lt(e)
  ), [s, c] = C("");
  return F(() => {
    if (t) {
      r(t), a(!1), c("");
      return;
    }
    const i = `${e || ""}`.trim();
    if (!i) {
      r(null), a(!1), c("");
      return;
    }
    const l = Lt(i);
    if (l) {
      r(l), a(!1), c("");
      return;
    }
    let u = !1;
    return a(!0), c(""), r(null), wr(i).then((d) => {
      u || (r(d), a(!1));
    }).catch((d) => {
      u || (r(null), a(!1), c((d == null ? void 0 : d.message) || String(d)));
    }), () => {
      u = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function Ea(e) {
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
  const c = await wr(t, rt().fetchProtected, {
    signal: a.signal
  });
  return a.isInactive() ? null : (vt(s, o, n, "download"), c);
}
async function Ma(e) {
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
    }).then((u) => {
      s = u;
    })
  ), n && a.push(
    Wt({
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
const mt = {
  regions: null,
  metadata: null
};
function Aa(e) {
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
    jobRefreshRevision: p,
    sessionEpochRef: h,
    closingRef: v,
    activeLoadAbortRef: b
  } = e, [P, S] = C(""), [g, w] = C(""), [L, E] = C(null), [D, _] = C(null), [N, T] = C(!1), [I, R] = C(""), [A, x] = C([]), [U, ee] = C(() => ({
    source: null,
    translated: null
  })), [Y, re] = C(
    mt
  ), [H, K] = C({
    loading: !0,
    percent: 4,
    text: Pe.boot,
    stage: "progress",
    failed: !1
  });
  return F(() => {
    const ie = new AbortController(), M = h.current.value, $ = Ea({
      sessionEpochRef: h,
      closingRef: v,
      abort: ie,
      sessionEpoch: M
    });
    b.current = ie;
    const B = sn();
    if (v.current)
      return ie.abort(), () => {
        b.current === ie && (b.current = null);
      };
    function V(oe, te) {
      $.markFailed(), K({
        loading: !1,
        percent: 100,
        text: oe,
        stage: "failed",
        failed: !0
      }), Ut({ percent: 100, text: te, stage: "failed" });
    }
    function ne() {
      T(!0), K({
        loading: !1,
        percent: 100,
        text: Pe.ready,
        stage: "ready",
        failed: !1
      }), Ut({ percent: 100, text: Pe.ready, stage: "ready" });
    }
    function le() {
      return l != null && l.documentId ? Nn(
        l.documentId,
        l.revision
      ) : Go() ? Zo : B.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function ue() {
      let oe = { activeJobId: "", activeVersionId: "" };
      try {
        const ge = await B.fetchProtected(
          B.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (ge != null && ge.ok) {
          const ke = await ge.json().catch(() => null);
          oe = ya(ke);
        }
      } catch {
      }
      const te = va({
        link: oe,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!l
      });
      if (te.kind === "follow-active-job") {
        if ($.isInactive()) return;
        u({
          type: "resolved-document-job",
          documentId: r,
          jobId: te.jobId
        }), te.activeVersionId ? (l || u({
          type: "committed-source",
          documentId: r,
          revision: te.activeVersionId,
          sessionIdentity: i
        }), m("source")) : m("compare");
        return;
      }
      if (te.kind === "open-committed-source") {
        if ($.isInactive()) return;
        u({
          type: "committed-source",
          documentId: r,
          revision: te.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const ae = le();
      if ($.isInactive()) return;
      S(ae), w(""), R(""), f(i);
      const me = await Wt({
        url: ae,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: $,
        setBoot: K
      });
      if (!$.isInactive()) {
        if (!me) {
          V("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        E(me), ne();
      }
    }
    async function de() {
      var Le;
      const oe = await ((Le = B.loadSessionSnapshot) == null ? void 0 : Le.call(B, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: l,
        includeOptionalArtifacts: !l
      })), te = oe ? {
        jobPayload: oe.sourcePayload,
        manifestPayload: oe.manifestPayload,
        readerMetadata: oe.readerMetadata,
        regionsPayload: oe.regions,
        readerErrors: oe.readerErrors
      } : await B.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !l
      });
      if ($.isInactive()) return;
      let ae = null;
      if (n && !r) {
        try {
          ae = await B.fetchDocumentByJobId(ia, t);
        } catch {
        }
        if ($.isInactive()) return;
      }
      const me = fa(te.jobPayload) || `${(ae == null ? void 0 : ae.document_id) || ""}`.trim();
      me && !r && u({
        type: "resolved-job-document",
        jobId: t,
        documentId: me
      });
      const ge = Sa({
        payloadDocumentId: me,
        linkedActiveJobId: `${(ae == null ? void 0 : ae.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(ae == null ? void 0 : ae.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!l
      });
      if (ge.kind === "restore-committed-source") {
        if ($.isInactive()) return;
        u({
          type: "committed-source",
          documentId: ge.documentId,
          revision: ge.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const ke = B.resolveReaderSourcePdf(te.manifestPayload), ft = B.resolveReaderTranslatedPdfUrl(te.jobPayload, te.manifestPayload), Mt = typeof ke == "string" ? ke : B.resolveReaderArtifactUrl(ke), qe = r || me, Ke = l != null && l.documentId ? Nn(
        l.documentId,
        l.revision
      ) : Mt || (qe ? B.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(qe)}/source.pdf`) : ""), Ge = l ? "" : ft || "";
      if (S(Ke || ""), w(Ge), R(pa(te.jobPayload, t)), d({
        jobPayload: te.jobPayload || null,
        manifestPayload: te.manifestPayload || null,
        sessionIdentity: i
      }), x(l ? [] : Ro(te.regionsPayload)), ee(l ? { source: null, translated: null } : To(te.readerMetadata)), re(l ? mt : te.readerErrors ?? mt), !Ke && !Ge) {
        V(Pe.failed, Pe.failed);
        return;
      }
      const ve = await Ma({
        sourceFinal: Ke || "",
        translatedFinal: Ge,
        fence: $,
        setBoot: K
      });
      if (ve.status !== "inactive") {
        if (ve.status === "incomplete") {
          V("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        E(ve.sourceBytes), _(ve.translatedBytes), ne();
      }
    }
    async function dt() {
      T(!1), E(null), _(null), x([]), ee({ source: null, translated: null }), re(mt), vt(K, 8, Pe.metadata, "metadata");
      try {
        if (s) {
          await ue();
          return;
        }
        if (!t) {
          V(Pe.failed, Pe.failed);
          return;
        }
        await de();
      } catch (oe) {
        if ($.isClosedOrStale() || (oe == null ? void 0 : oe.name) === "AbortError") return;
        $.markFailed();
        const te = Number(oe == null ? void 0 : oe.status);
        if (wa({
          status: te,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          u({ type: "missing-document-job", documentId: r, jobId: t }), u({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const ae = oe instanceof Error ? oe.message : Pe.failed;
        V(ae, ae);
      }
    }
    return dt(), () => {
      ie.abort(), b.current === ie && (b.current = null);
    };
  }, [t, r, o, a, s, c, l, p, n, i, u, d, f, m]), {
    sourceUrl: P,
    translatedUrl: g,
    sourceFile: L,
    translatedFile: D,
    assetsReady: N,
    title: I,
    regions: A,
    readerMetadata: U,
    readerErrors: Y,
    boot: H
  };
}
function ka() {
  const e = k(!1), t = k(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = la(), s = k({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const c = k(a), i = k(""), l = k(""), u = k(() => {
  }), d = O(() => u.current(), []), f = ua({
    routeDocumentId: o,
    jobId: r,
    sessionIdentity: a,
    sessionIdentityRef: c,
    documentIdRef: i,
    sessionJobIdRef: l,
    switchToSourceMode: d
  }), {
    sessionJobId: m,
    documentId: p,
    sourceOnly: h,
    sourceViewOnly: v
  } = f, { mode: b, setMode: P, switchSessionMode: S } = ba(v);
  u.current = () => {
    S("source");
  }, c.current = a, i.current = p, l.current = m;
  const g = ha({
    sessionJobId: m,
    sessionIdentity: a,
    sessionIdentityRef: c,
    sessionJobIdRef: l,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: w,
    scopedManifestPayload: L,
    jobStatus: E,
    jobTerminal: D,
    jobRefreshRevision: _,
    refreshJobArtifacts: N,
    refreshJobStatus: T
  } = g, I = Aa({
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
    publishPayload: g.publishPayload,
    clearPayload: g.clearPayload,
    switchSessionMode: S,
    jobRefreshRevision: _,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), R = O(() => {
    var x;
    e.current = !0, (x = t.current) == null || x.abort();
  }, []), A = Z(
    () => ({
      fetchProtected: sn().fetchProtected,
      jobId: m,
      jobPayload: w,
      manifestPayload: L,
      sourceUrl: I.sourceUrl,
      translatedUrl: I.translatedUrl,
      sourceOnly: v
    }),
    [m, w, L, I.sourceUrl, I.translatedUrl, v]
  );
  return {
    jobId: m,
    jobStatus: E,
    workflow: `${(w == null ? void 0 : w.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: D,
    documentId: p,
    sessionIdentity: a,
    sourceOnly: h,
    mode: b,
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
    download: A,
    refreshJobArtifacts: N,
    refreshJobStatus: T,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: R
  };
}
const La = 160, Ca = 8, _a = 0;
function Na() {
  const e = k(null), [t, n] = C(null), [r, o] = C(_a), a = O((s) => {
    e.current = s, n(s);
  }, []);
  return F(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const c = (l) => {
      !Number.isFinite(l) || l < La || o((u) => Math.abs(u - l) < Ca ? u : l);
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
function xa(e) {
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
const Ct = { source: 0, translated: 0 };
function za(e, t) {
  const {
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    sourceUrl: a,
    translatedUrl: s,
    sourceFile: c,
    translatedFile: i
  } = e, l = `${(t == null ? void 0 : t.identityKey) || ""}\0${a}\0${s}`, u = k(l);
  u.current = l;
  const [d, f] = C(() => ({
    identity: l,
    pages: Ct
  })), [m, p] = C(() => ({ identity: l, tick: 0 })), h = d.identity === l ? d.pages : Ct, v = m.identity === l ? m.tick : 0, b = xa({
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    hasSource: !!c || !!a,
    hasTranslated: !!i
  }), { primaryPane: P } = b, S = O((T, I) => {
    u.current === l && f((R) => {
      const A = R.identity === l ? R.pages : Ct;
      return A[I] === T && R.identity === l ? R : {
        identity: l,
        pages: { ...A, [I]: T }
      };
    });
  }, [l]), g = k(null), w = O(() => {
    g.current && clearTimeout(g.current);
    const T = l;
    g.current = setTimeout(() => {
      g.current = null, u.current === T && p((I) => ({
        identity: T,
        tick: I.identity === T ? I.tick + 1 : 1
      }));
    }, 60);
  }, [l]);
  F(() => (g.current && (clearTimeout(g.current), g.current = null), f((T) => T.identity === l && T.pages.source === 0 && T.pages.translated === 0 ? T : { identity: l, pages: { source: 0, translated: 0 } }), p((T) => T.identity === l && T.tick === 0 ? T : { identity: l, tick: 0 }), () => {
    g.current && (clearTimeout(g.current), g.current = null);
  }), [l]);
  const L = Z(
    () => Math.max(h.source, h.translated),
    [h]
  ), E = P === "translated" ? h.translated : h.source || h.translated, D = t == null ? void 0 : t.userZoom, _ = t == null ? void 0 : t.shellWidth, N = `${l}-${v}-${D}-${n}-${h.source}-${h.translated}-${_}`;
  return {
    ...b,
    numPagesByPane: h,
    hudNumPages: L,
    primaryNumPages: E,
    metricsTick: v,
    onNumPages: S,
    onMetrics: w,
    rowSyncRevision: N
  };
}
const He = "data-reader-page", We = "data-reader-pane", cn = "data-natural-height", Da = "reader-react-root", Oa = "reader-react-grid", Pr = "reader-react-scroll-shell", Fa = "reader-react-pdf-pane", Rr = "reader-react-pdf-page", St = "reader-react-pdf-page-placeholder", ln = "reader-react-pdf-page-slot";
function ot(e, t) {
  const n = e != null ? `[${He}="${e}"]` : `[${He}]`;
  return t ? `${n}[${We}="${t}"]` : n;
}
function $a() {
  return `.${ln}[${He}]`;
}
function Tt(e) {
  return Number(e.getAttribute(He));
}
const Tr = 0.25, Ir = 1, ja = 0.05, lt = 0.5, Ua = 16, Ba = 8;
function tt(e) {
  return lt;
}
function It(e) {
  return Number.isFinite(e) ? Math.min(Ir, Math.max(Tr, e)) : lt;
}
function at(e, t) {
  const n = It(Number(e) + t * ja);
  return Math.round(n * 100) / 100;
}
function Ha(e) {
  return Math.round(It(e) * 100);
}
function Wa(e) {
  const n = (Number(e) || 0) - Ua - Ba;
  return Math.max(160, Math.floor(n));
}
function Ja(e, t = lt) {
  const n = It(t);
  return Wa((Number(e) || 0) * n);
}
function Va(e, t) {
  if (!e || !Number.isFinite(t) || t <= 0 || Math.abs(t - 1) < 1e-3)
    return;
  const n = e.scrollLeft + e.clientWidth / 2, r = e.scrollTop + e.clientHeight / 2, o = Array.from(
    e.querySelectorAll(`[${We}]`)
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
const qa = 8;
function Ka(e, t) {
  return !Number.isFinite(e) || e < 80 || Math.abs(e - t) < qa ? "ignore" : !Number.isFinite(t) || t <= 0 ? "immediate" : "settle";
}
const Ga = 200, Er = [
  "markdown"
], Mr = [
  "terminal"
], Za = [
  ...Er,
  ...Mr
];
function Ar(e) {
  return Za.includes(e);
}
const Ya = "retainpdf:reader:view:v1:", zn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), Xa = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function kr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function Jt(e) {
  return `${e || ""}`.trim();
}
function Qa({
  documentId: e,
  jobId: t
}) {
  const n = Jt(e);
  if (n) return `document:${n}`;
  const r = Jt(t);
  return r ? `job:${r}` : "";
}
function Lr(e) {
  const t = Jt(e);
  return t ? `${Ya}${t}` : "";
}
function es(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function ts(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!zn.has(t) || !zn.has(n) || t === n))
    return { left: t, right: n };
}
function ns(e) {
  return e === null ? null : Ar(e) ? e : void 0;
}
function rs(e) {
  return Xa.has(e) ? e : void 0;
}
function Cr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = es(t.anchor), r = Number(t.zoom), o = rs(t.mode), a = ts(t.splitLayout), s = ns(t.assistantPanel);
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
function Te(e, t = kr()) {
  const n = Lr(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Cr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function Et(e, t, n = kr()) {
  const r = Lr(e);
  if (!r || !n) return null;
  const o = Te(e, n), a = Cr({
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
function os(e, t, n = "") {
  const [r, o] = C(() => {
    var d;
    return ((d = Te(n)) == null ? void 0 : d.zoom) ?? tt();
  }), a = k(r), s = k(n);
  a.current = r;
  const c = k(1);
  F(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const d = ((f = Te(n)) == null ? void 0 : f.zoom) ?? tt();
    c.current = 1, a.current = d, o(d);
  }, [e, n]);
  const i = O((d) => {
    const f = It(d), m = a.current;
    Math.abs(f - m) < 5e-4 || (c.current = f / (m || 1), Et(s.current, { zoom: f }), o(f));
  }, []), l = O((d) => {
    i(at(a.current, d));
  }, [i]), u = O((d) => {
    i(tt());
  }, [i]);
  return ze(() => {
    const d = c.current;
    Math.abs(d - 1) < 1e-3 || (c.current = 1, Va(t == null ? void 0 : t.current, d));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: l, resetZoom: u };
}
function as(e, t = !0) {
  const [n, r] = C(null), o = O(() => {
    var c, i;
    r(null);
    const s = (c = globalThis.getSelection) == null ? void 0 : c.call(globalThis);
    (i = s == null ? void 0 : s.removeAllRanges) == null || i.call(s);
  }, []), a = e.current ?? null;
  return F(() => {
    if (!t)
      return;
    const s = () => {
      var x, U;
      const h = e.current, v = (x = globalThis.getSelection) == null ? void 0 : x.call(globalThis);
      if (!h || !v || v.isCollapsed || !v.rangeCount) {
        r(null);
        return;
      }
      const b = v.getRangeAt(0);
      if (!h.contains(b.commonAncestorContainer)) {
        r(null);
        return;
      }
      const P = `${v.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (P.length < 2) {
        r(null);
        return;
      }
      let S = b.commonAncestorContainer;
      S.nodeType === Node.TEXT_NODE && (S = S.parentElement);
      const g = (U = S == null ? void 0 : S.closest) == null ? void 0 : U.call(
        S,
        ot()
      );
      if (!g || !h.contains(g)) {
        r(null);
        return;
      }
      const w = Math.max(1, Math.floor(Tt(g) || 1)), E = g.getAttribute(We) === "translated" ? "translated" : "source", D = b.getClientRects(), _ = D[D.length - 1] || b.getBoundingClientRect();
      if (!_ || _.width === 0 && _.height === 0) {
        r(null);
        return;
      }
      const N = typeof window < "u" ? window.innerWidth : 800, T = typeof window < "u" ? window.innerHeight : 600, I = 16, R = Math.min(Math.max(I, _.left), N - I), A = Math.min(Math.max(I, _.top), T - I);
      r({
        selectionType: "text",
        quote: P,
        page: w,
        pane: E,
        rect: {
          left: R,
          top: A,
          width: _.width,
          height: _.height
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
    const p = a ?? e.current;
    return p == null || p.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", i), document.removeEventListener("pointerup", l), document.removeEventListener("touchend", u), document.removeEventListener("selectionchange", d), document.removeEventListener("keyup", f), p == null || p.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, a, o]), { selection: n, clearSelection: o };
}
function ss(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, o = k(t), a = k(n), s = k(r);
  return o.current = t, a.current = n, s.current = r, { setModeKeepingPage: O((i) => {
    i !== o.current && (s.current(), a.current(i));
  }, []) };
}
const un = 48;
function _r(e, t = un) {
  return e.getBoundingClientRect().top + t;
}
function Nr(e, t) {
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
  }) ?? null, n)) {
    const l = [...e].reverse().find((u) => {
      const d = u.getBoundingClientRect();
      return d.height >= 8 && d.width >= 8;
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
function _t(e, t, n = un) {
  if (!e)
    return null;
  const r = ot(void 0, t), o = Array.from(e.querySelectorAll(r));
  if (!o.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = _r(e, n), c = Nr(o, s);
  return c ? { page: c.page, fraction: c.fraction } : null;
}
function dn(e, t, n = "auto", r, o = un) {
  if (!e || !t)
    return !1;
  const a = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let c = null;
  if (r && (c = e.querySelector(ot(a, r))), c || (c = e.querySelector(ot(a))), !c)
    return !1;
  const i = e.getBoundingClientRect(), l = c.getBoundingClientRect();
  if (i.height <= 0 || l.height < 8 && c.offsetHeight < 8)
    return !1;
  const u = l.height > 0 ? l.height : c.offsetHeight, d = e.scrollTop + (l.top - i.top), f = Math.max(0, d + s * u - o);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function is(e, t, n = "smooth", r) {
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
    var u;
    if (a) return;
    dn(
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
function cs(e, t, n) {
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
function be(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function ls(e, t, n = !0, r = "", o) {
  const [a, s] = C(1);
  return F(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const c = e.current;
    if (!c)
      return;
    let i = !1, l = null, u = 0;
    const d = ot(void 0, o), f = () => {
      if (i) return;
      const h = Array.from(c.querySelectorAll(d));
      if (!h.length)
        return;
      const v = _r(c), b = Nr(h, v);
      b && s(b.page);
    }, m = () => {
      i || (u && cancelAnimationFrame(u), u = requestAnimationFrame(() => {
        u = 0, f();
      }));
    }, p = () => {
      if (i) return;
      if (!Array.from(c.querySelectorAll(d)).length) {
        l = setTimeout(p, 120);
        return;
      }
      f(), c.addEventListener("scroll", m, { passive: !0 });
    };
    return p(), () => {
      i = !0, l && clearTimeout(l), u && cancelAnimationFrame(u), c.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, o]), a;
}
const us = `canvas, .react-pdf__Page, .${Rr}, .${St}`, Dn = /* @__PURE__ */ new WeakMap();
function ds(e) {
  const t = Number(e.getAttribute(cn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Dn.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(us), Dn.set(e, n)), n) {
    const o = n.getBoundingClientRect().height;
    if (Number.isFinite(o) && o > 0)
      return o;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function fs(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function ms(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll($a()).forEach((r) => {
    const o = Tt(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = ds(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function ps(e, t, n = "", r) {
  const [o, a] = C(() => /* @__PURE__ */ new Map()), s = k(o), c = k(r);
  return c.current = r, ze(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), a(s.current));
      return;
    }
    let i = !1, l = 0, u = !1, d = !1;
    const f = () => {
      var w;
      if (i) return;
      const S = e.current;
      if (!S) return;
      const g = ms(S);
      fs(s.current, g) || (s.current = g, a(g)), u && !d && (d = !0, (w = c.current) == null || w.call(c));
    }, m = () => {
      cancelAnimationFrame(l), l = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const p = window.setTimeout(m, 100), h = window.setTimeout(() => {
      u = !0, m();
    }, 300), v = window.setTimeout(m, 700), b = e.current;
    let P = null;
    return b && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => m()), P.observe(b)), () => {
      i = !0, cancelAnimationFrame(l), window.clearTimeout(p), window.clearTimeout(h), window.clearTimeout(v), P == null || P.disconnect();
    };
  }, [e, t, n]), o;
}
const hs = [0, 48, 140, 320, 560], gs = 700, bs = [80, 200, 400], ys = 500, vs = 50, Ss = /* @__PURE__ */ new Set([
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
]), ws = 180, On = [0, 48, 140, 320, 700, 1200];
function Ps(e, t) {
  var I;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, c = k(
    ((I = Te(a)) == null ? void 0 : I.anchor) || { page: 1, fraction: 0 }
  ), i = k(null), l = k(!1), u = k(r), d = k(null), f = k(null), m = k(null), p = k(null), h = k(a), v = k(""), b = k(n);
  b.current = n;
  const P = O(() => {
    var R;
    (R = d.current) == null || R.call(d), d.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), S = O(() => {
    !l.current && i.current == null || (P(), m.current != null && (clearTimeout(m.current), m.current = null), i.current = null, l.current = !1);
  }, [P]), g = O((R = !1) => {
    p.current != null && (clearTimeout(p.current), p.current = null);
    const A = () => {
      p.current = null, Et(h.current, {
        anchor: be(c.current)
      });
    };
    R ? A() : p.current = setTimeout(A, ws);
  }, []), w = O((R) => {
    c.current = be(R), i.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, l.current = !1;
    }, vs);
  }, []);
  F(() => {
    if (!o)
      return;
    let R = !1, A = null, x = null, U = null;
    const ee = () => {
      if (R) return;
      const Y = e.current;
      if (!Y) {
        U = setTimeout(ee, 50);
        return;
      }
      A = Y, x = () => {
        if (l.current)
          return;
        const re = _t(A, b.current);
        re && (c.current = re, g());
      }, A.addEventListener("scroll", x, { passive: !0 }), l.current || x();
    };
    return ee(), () => {
      R = !0, U != null && clearTimeout(U), A && x && A.removeEventListener("scroll", x);
    };
  }, [o, r, n, e, g]), F(() => {
    if (!o) return;
    const R = e.current;
    if (!R) return;
    const A = (x) => {
      x.metaKey || x.ctrlKey || x.altKey || Ss.has(x.key) && S();
    };
    return R.addEventListener("wheel", S, { passive: !0 }), R.addEventListener("touchmove", S, { passive: !0 }), window.addEventListener("keydown", A), () => {
      R.removeEventListener("wheel", S), R.removeEventListener("touchmove", S), window.removeEventListener("keydown", A);
    };
  }, [o, e, S]), ze(() => {
    var A;
    if (h.current === a) return;
    g(!0), P(), m.current != null && (clearTimeout(m.current), m.current = null), h.current = a, v.current = "";
    const R = (A = Te(a)) == null ? void 0 : A.anchor;
    c.current = R ? be(R) : { page: 1, fraction: 0 }, i.current = null, l.current = !!a, u.current = r;
  }, [a, r, g, P]), F(() => {
    var A;
    if (!o || !s || !a || v.current === a) return;
    v.current = a;
    const R = be(
      ((A = Te(a)) == null ? void 0 : A.anchor) || { page: 1, fraction: 0 }
    );
    return c.current = R, i.current = R, l.current = !0, P(), d.current = Vt(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: b.current,
        delaysMs: On,
        onDone: () => w(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, w(R);
    }, Math.max(...On) + 160), () => P();
  }, [o, s, a, e, w, P]), F(() => {
    if (u.current === r)
      return;
    if (u.current = r, !o) {
      l.current = !1, i.current = null, P();
      return;
    }
    const R = i.current ? be(i.current) : be(c.current);
    return l.current = !0, i.current = R, c.current = R, P(), d.current = Vt(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: hs,
        onDone: () => w(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, w(R);
    }, gs), () => {
      P();
    };
  }, [r, o, n, e, w, P]), F(() => () => {
    P(), m.current != null && (clearTimeout(m.current), m.current = null), g(!0);
  }, [P, g]);
  const L = O(() => {
    const R = _t(
      e.current,
      b.current
    );
    return be(R || c.current);
  }, [e]), E = O(() => {
    l.current = !0;
    const R = _t(
      e.current,
      b.current
    ), A = be(R ?? c.current);
    return c.current = A, i.current = A, g(), A;
  }, [e, g]), D = O((R, A, x) => {
    const U = x || b.current, ee = wt(R, A || 1), Y = { page: ee, fraction: 0 };
    c.current = Y, l.current = !0, i.current = Y, g(), P(), is(e.current, ee, "smooth", U), d.current = cs(
      () => e.current,
      ee,
      {
        behavior: "auto",
        pane: U,
        delaysMs: bs,
        onDone: () => w(Y)
      }
    ), f.current = setTimeout(() => {
      f.current = null, w(Y);
    }, ys);
  }, [e, w, P, g]), _ = O(() => be(c.current), []), N = O(() => l.current, []), T = O(() => {
    if (!l.current || !i.current)
      return;
    const R = be(i.current);
    dn(
      e.current,
      R,
      "auto",
      b.current
    );
  }, [e]);
  return {
    lockFromShell: L,
    beginModeSwitch: E,
    goToPage: D,
    getAnchor: _,
    isRestoring: N,
    repinIfRestoring: T
  };
}
function Rs(e, t) {
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
function xr(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), o = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), a = `j:${r}:d:${o}`;
  return t == null ? `${a}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${a}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const Ts = [0, 80, 200, 400, 800], Is = 120, Es = 400;
function Ms(e, t, n) {
  const { enabled: r, numPages: o, goToPage: a, resolveBlockPage: s, onAnchorApplied: c, jobId: i, documentId: l } = e, u = k(a);
  u.current = a;
  const d = k(s);
  d.current = s;
  const f = k(c);
  f.current = c;
  const m = k(n);
  m.current = n, F(() => {
    var S, g;
    if (!r || !Number.isFinite(o) || o < 1)
      return;
    const p = ea(), h = Rs(p, d.current), v = xr(p, h, { jobId: i, documentId: l });
    if (t.current === v)
      return;
    if (h == null) {
      t.current = v, (S = m.current) == null || S.call(m);
      return;
    }
    t.current = v, p && ((g = f.current) == null || g.call(f, p, h));
    const b = [];
    let P = 0;
    for (const w of Ts)
      P = Math.max(P, w), b.push(
        setTimeout(() => {
          u.current(h);
        }, w)
      );
    return b.push(
      setTimeout(() => {
        var w;
        (w = m.current) == null || w.call(m);
      }, P + Is)
    ), () => {
      for (const w of b) clearTimeout(w);
    };
  }, [r, o, i, l, t]);
}
function As(e) {
  var a;
  const t = globalThis.window;
  if (!t || typeof ((a = t.history) == null ? void 0 : a.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, o = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", o);
}
function ks(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: o,
    resolveBlockPage: a,
    syncDebounceMs: s = Es,
    jobId: c,
    documentId: i,
    applyReaderSearch: l
  } = e, u = k(a);
  u.current = a;
  const d = k(l);
  d.current = l;
  const f = k(0);
  F(() => {
    if (!n || !r || !t.current || !Number.isFinite(o) || o < 1 || f.current === o) return;
    const m = setTimeout(() => {
      var b;
      const p = ((b = globalThis.location) == null ? void 0 : b.search) || "", h = Po(p, o, u.current);
      if (f.current = o, h === null) return;
      const v = `${new URLSearchParams(h).get("block_id") || ""}`.trim();
      t.current = xr(
        { blockId: v },
        o,
        { jobId: c, documentId: i }
      ), (d.current || As)(h);
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
function Ls(e) {
  const t = k(""), [n, r] = C(!1), o = O(() => r(!0), []), a = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  Ms(a, t, o), ks(e, t, n);
}
const Ye = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function Cs(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function Fn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function zr(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = Fn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const o = Fn(n, e);
  return o < 0 || o === 0 && n.page_hash === e.pageHash ? "ignore" : "accept";
}
function _s(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), o = zr(r, t, n);
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
function Ns(e) {
  const { hasOverlayContent: t, connection: n, showSource: r } = e;
  return {
    topBarPill: t && n !== "terminal",
    sourcePaneToggle: t && r,
    // 和 resolveReaderPaneComposition 的 overlayOnSource 同一套条件，外加
    // 「源文栏得在台面上」——否则叠层没有落脚的地方。
    overlayRenderable: t && r && e.liveTranslationVisible && !e.assistantOpen
  };
}
const $n = [250, 500, 1e3, 2e3, 4e3], Nt = [80, 160, 320, 640, 1e3, 1500], jn = [250, 500, 1e3, 2e3, 4e3, 5e3], xs = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
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
function fn(e) {
  return ko(e) ? `${e.code || ""}`.trim() : "";
}
function pt(e, t) {
  const n = fn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function zs(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if (zr(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = Lo(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (i) {
      if ((i == null ? void 0 : i.name) === "AbortError") throw i;
      a = i;
      const l = fn(i);
      if (l && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(l)) throw i;
    }
    const c = Nt[Math.min(s, Nt.length - 1)];
    if (await qt(c, r), s >= Nt.length + 2) throw a;
  }
}
function Ds({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = C(Ye), s = k(o), c = k("");
  s.current = o;
  const i = `${e || ""}`.trim(), l = `${t || ""}`.trim().toLowerCase(), u = xs.has(l) ? l : "";
  return F(() => {
    if (!n || !i) {
      c.current = "", s.current = Ye, a(Ye);
      return;
    }
    const d = r === void 0 ? Qo() : r, f = c.current === i;
    if (c.current = i, !d) {
      const S = {
        ...f ? s.current : Ye,
        connection: u ? "terminal" : "unavailable",
        jobStatus: l,
        error: "实时译文暂不可用"
      };
      s.current = S, a(S);
      return;
    }
    const m = new AbortController();
    let p = !1;
    const h = {
      ...f ? s.current : Ye,
      connection: u ? "terminal" : "connecting",
      jobStatus: l,
      error: ""
    };
    s.current = h, a(h);
    const v = (S) => {
      m.signal.aborted || a((g) => {
        const w = S(g);
        return s.current = w, w;
      });
    }, b = async () => {
      let S = 0;
      for (; !m.signal.aborted; )
        try {
          const g = await d.fetchLayout(i, { signal: m.signal });
          p = !0, v((w) => ({
            ...w,
            layoutByPage: Cs(g),
            jobStatus: l,
            error: ""
          }));
          return;
        } catch (g) {
          if ((g == null ? void 0 : g.name) === "AbortError") return;
          const w = fn(g);
          if (!(w === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !w)) {
            v((E) => ({
              ...E,
              connection: u ? "terminal" : "unavailable",
              jobStatus: l,
              error: pt(g, "实时译文暂不可用")
            }));
            return;
          }
          if (u) {
            v((E) => ({
              ...E,
              connection: "terminal",
              jobStatus: l,
              error: ""
            }));
            return;
          }
          v((E) => ({
            ...E,
            connection: "connecting",
            jobStatus: l,
            error: pt(g, "正在等待 OCR 版面数据")
          })), await qt($n[Math.min(S, $n.length - 1)], m.signal).catch(() => {
          }), S += 1;
        }
    };
    return (async () => {
      if (await b(), !p || m.signal.aborted) return;
      let S = 0;
      for (; !m.signal.aborted; ) {
        u || v((g) => ({
          ...g,
          connection: g.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: l,
          // 保留已有错误：首页还没提交（lastSeq 为 0）时恰恰是最容易出错的阶段，
          // 此前这里把它清成空串，UI 于是一直显示「连接中」，用户看到的是
          // "正在努力"，实际可能已经在反复失败。
          error: g.error
        }));
        try {
          await d.streamEvents(i, {
            afterSeq: s.current.lastSeq,
            signal: m.signal,
            onEvent: async (g) => {
              if (g.seq <= s.current.lastSeq) return;
              let w;
              try {
                w = await zs(
                  i,
                  g,
                  s.current,
                  m.signal,
                  d
                );
              } catch (L) {
                if ((L == null ? void 0 : L.name) === "AbortError" || m.signal.aborted) throw L;
                v((E) => ({
                  ...E,
                  lastSeq: Math.max(E.lastSeq, g.seq),
                  error: pt(L, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              v((L) => {
                const E = _s(L, g, w);
                return u ? {
                  ...E,
                  connection: "terminal",
                  jobStatus: l
                } : {
                  ...E,
                  jobStatus: l
                };
              }), S = 0;
            }
          });
        } catch (g) {
          if ((g == null ? void 0 : g.name) === "AbortError" || m.signal.aborted) return;
          v((w) => ({
            ...w,
            connection: u ? "terminal" : "reconnecting",
            jobStatus: l,
            error: pt(g, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (u) {
          v((g) => ({
            ...g,
            connection: "terminal",
            jobStatus: l
          }));
          return;
        }
        await qt(jn[Math.min(S, jn.length - 1)], m.signal).catch(() => {
        }), S += 1;
      }
    })(), () => m.abort();
  }, [n, r, i, u]), o;
}
const Os = 2e3;
function Fs(e) {
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
const $s = /* @__PURE__ */ new Set(["book", "translate"]);
function Dr(e) {
  return !!(e.jobId && e.sourceUrl && $s.has(e.workflow));
}
function js(e) {
  return !!(Dr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function Us() {
  const e = ka(), t = Dr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = js({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = k({ jobId: "", running: !1 });
  r.current.jobId !== e.jobId && (r.current = { jobId: e.jobId, running: !1 });
  const o = `${e.jobStatus || ""}`.trim().toLowerCase();
  o && !["succeeded", "failed", "cancelled", "canceled"].includes(o) && (r.current.running = !0);
  const a = Ds({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t && (n || r.current.running)
  }), { shellRef: s, shellEl: c, shellWidth: i, bindShell: l } = Na(), u = Qa({
    documentId: e.documentId,
    jobId: e.jobId
  }), d = `${u}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: f, onZoomChange: m } = os(e.mode, s, u), p = za(
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
    beginModeSwitch: h,
    goToPage: v,
    repinIfRestoring: b
  } = Ps(s, {
    primaryPane: p.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: u,
    restoreReady: p.primaryNumPages > 0
  });
  F(() => {
    b();
  }, [i, b]);
  const P = ps(
    s,
    p.compareMode,
    p.rowSyncRevision,
    b
  ), S = ls(
    s,
    p.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${f}-${p.metricsTick}`,
    p.primaryPane
  ), g = O((M, $) => {
    var V, ne;
    const B = Math.max(
      Number(p.hudNumPages) || 0,
      Number(p.primaryNumPages) || 0,
      Number((V = p.numPagesByPane) == null ? void 0 : V.source) || 0,
      Number((ne = p.numPagesByPane) == null ? void 0 : ne.translated) || 0
    );
    v(M, B, $);
  }, [v, p.hudNumPages, p.primaryNumPages, p.numPagesByPane]), [w, L] = C(null), E = k(null), D = O((M) => {
    E.current && clearTimeout(E.current), L(M), M && (E.current = setTimeout(() => L(null), Os));
  }, []);
  F(() => () => {
    E.current && clearTimeout(E.current);
  }, []);
  const _ = O((M) => {
    const $ = kt(e.regions, M);
    return $ ? $t($, p.primaryPane).page : null;
  }, [e.regions, p.primaryPane]), N = O((M, $) => {
    const B = $ || p.primaryPane, V = typeof M == "object" && M ? `${M.block_id || ""}`.trim() : "", ne = typeof M == "object" && M ? `${M.image_url || ""}`.trim() : "", le = typeof M == "object" && M ? M.page_idx != null ? Number(M.page_idx) + 1 : M.page != null ? Number(M.page) : null : typeof M == "number" ? M + 1 : null, ue = Io(e.regions, ne, le) || kt(e.regions, V) || (typeof M == "object" ? Eo(e.regions, M) : null);
    let de = ue ? $t(ue, B).page : null;
    de == null && (de = Fs(M)), !(de == null || de < 1) && (D(ue), g(de, B));
  }, [D, g, p.primaryPane, e.regions]);
  Ls({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: p.hudNumPages || 0,
    currentPage: S,
    goToPage: g,
    resolveBlockPage: _,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (M) => {
      D(kt(e.regions, M.blockId));
    }
  });
  const { setModeKeepingPage: T } = ss({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: h
  }), [I, R] = C(null), {
    selection: A,
    clearSelection: x
  } = as(s, !e.boot.loading && !e.boot.failed), U = O(() => {
    R(null), x();
  }, [x]), ee = O((M) => {
    x(), R(M);
  }, [x]);
  F(() => {
    A && R(null);
  }, [A]), F(() => {
    const M = s.current;
    if (!M) return;
    const $ = () => R(null);
    return M.addEventListener("scroll", $, { passive: !0 }), () => M.removeEventListener("scroll", $);
  }, [c, s]);
  const Y = A || I;
  F(() => {
    D(null), U();
  }, [d, D, U]);
  const re = !e.boot.loading && !e.boot.failed, H = Z(() => ({ bindShell: l, shellEl: c, shellWidth: i, shellRef: s }), [l, c, i, s]), K = Z(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), ie = Z(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: f,
    onZoomChange: m,
    shell: H,
    panes: p,
    sessionFiles: K,
    rowHeights: P,
    goToPage: g,
    activeRegion: w,
    jumpToAnchor: N,
    setModeKeepingPage: T,
    download: e.download,
    showHud: re,
    selection: Y,
    clearSelection: U,
    selectRegion: ee,
    viewStateKey: u,
    liveTranslation: a,
    liveTranslationAvailable: n
  }), [e, H, p, K, P, g, w, N, T, re, Y, U, ee, f, m, u, a, n]);
  return Z(() => ({
    ...ie,
    currentPage: S
  }), [ie, S]);
}
const Bs = [
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
], Hs = [
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
function Ws(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Bs)
    if (n.keys.some(
      (o) => o.length === 1 ? o === t : o === e
    )) return n;
  return null;
}
function Js(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Vs(e) {
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
  F(() => {
    if (!l)
      return;
    const u = (d) => {
      if (d.defaultPrevented || d.metaKey || d.ctrlKey || d.altKey || Js(d.target))
        return;
      const f = d.key, m = Ws(f);
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
              a(at(o, 1));
              return;
            case "zoom-out":
              a(at(o, -1));
              return;
            case "zoom-reset":
              a(tt());
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
const qs = "retainpdf:soft-reader-close";
function Ks() {
  return new URL("./index.html", window.location.href).href;
}
function Gs() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: qs },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function Zs(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), o = new URL(e, r);
    return o.origin === r.origin && !/reader\.html$/i.test(o.pathname) && !/detail\.html$/i.test(o.pathname);
  } catch {
    return !1;
  }
}
function Ys() {
  if (!(typeof window > "u") && !Gs()) {
    if (Zs(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(Ks());
  }
}
function Xs({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ j(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), Ys();
      },
      children: [
        /* @__PURE__ */ y(an, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ y("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let Un = !1;
function Qs() {
  if (Un)
    return;
  const e = rt().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (Ho.GlobalWorkerOptions.workerSrc = e, Un = !0);
}
const ei = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function ti({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: o
}) {
  const a = r.flatMap((s) => {
    if (!pr(s.region)) return [];
    const c = Pt(s, t, n);
    return c ? [{ highlight: s, rect: c }] : [];
  });
  return a.length ? /* @__PURE__ */ y("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: a.map(({ highlight: s, rect: c }) => {
    const i = s.region, l = hr(i), u = ei[l];
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
          /* @__PURE__ */ y("span", { className: "reader-structure-selection-label", "aria-hidden": "true", children: u }),
          /* @__PURE__ */ y("span", { className: "sr-only", children: Rt(i, e) })
        ]
      },
      i.itemId
    );
  }) }) : null;
}
function ni(e, t, n) {
  return e.flatMap((r) => {
    if (hr(r.region) !== "text") return [];
    const o = Pt(r, t, n);
    return o ? [{ itemId: r.itemId, highlight: r, rect: o }] : [];
  });
}
function xt(e, t, n) {
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
async function Or(e) {
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
const Kt = "reader-text-hover-copy";
function ri({
  target: e,
  pane: t = "source",
  copiedSignal: n = 0
}) {
  const [r, o] = C("idle"), a = (e == null ? void 0 : e.itemId) || "";
  if (F(() => o("idle"), [a]), F(() => {
    if (!n) return;
    o("copied");
    const i = window.setTimeout(() => o("idle"), 1200);
    return () => window.clearTimeout(i);
  }, [n]), !e) return null;
  const s = Rt(e.highlight.region, t), c = async (i) => {
    i.preventDefault(), i.stopPropagation();
    const l = await Or(s);
    o(l ? "copied" : "failed"), window.setTimeout(() => o("idle"), 1200);
  };
  return /* @__PURE__ */ y("div", { className: "reader-text-hover-layer", children: /* @__PURE__ */ y(
    "div",
    {
      className: "reader-text-hover-frame",
      "data-reader-text-hover-id": e.itemId,
      style: e.rect,
      children: s ? /* @__PURE__ */ y(
        "button",
        {
          type: "button",
          className: Kt,
          "data-copy-state": r,
          "aria-label": t === "translated" ? "复制这段译文" : "复制这段原文",
          onPointerDown: (i) => i.stopPropagation(),
          onClick: c,
          children: r === "copied" ? "已复制" : r === "failed" ? "复制失败" : "复制"
        }
      ) : null
    }
  ) });
}
function oi(e, t) {
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
function ai(e, t, n, r) {
  if (!e || !t) return [];
  const o = [];
  for (const a of e.blocks) {
    const s = t.itemsById.get(a.item_id);
    if (!(s != null && s.translated_text)) continue;
    const c = Pt(
      oi(e, a),
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
const si = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', ii = 256, Xe = /* @__PURE__ */ new Map();
function ci(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function li(e) {
  const t = `${e || ""}`, { text: n, slots: r } = Vo(t, { bareLatex: !0 }), o = ci(n), a = qo(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Xe.get(t);
  if (!s && (s = Ko(o, r), Xe.set(t, s), Xe.size > ii)) {
    const c = Xe.keys().next().value;
    c !== void 0 && Xe.delete(c);
  }
  return { fallbackHtml: a, richHtml: s, hasMath: !0 };
}
function zt(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function Re(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function ui(e, t) {
  const n = e.typography, r = Re(t) || 1, o = Re(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), c = zt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, c * r)), l = Re(n == null ? void 0 : n.fit_min_font_size_pt), u = Re(n == null ? void 0 : n.fit_max_font_size_pt), d = Math.max(3.5, (l || 5.5) * r), f = Math.max(
    d,
    u ? u * r : o ? o * r : i
  ), m = o ? o * r : i, p = Re(n == null ? void 0 : n.leading_em), h = [
    Re(n == null ? void 0 : n.padding_top_pt) || 0,
    Re(n == null ? void 0 : n.padding_right_pt) || 0,
    Re(n == null ? void 0 : n.padding_bottom_pt) || 0,
    Re(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((v) => v * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || si,
    fontSizePx: Math.max(d, Math.min(f, m)),
    minFontSizePx: d,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: p ? 1 + p : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (zt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : zt(e.kind) ? "center" : "justify",
    padding: h,
    exact: !!o
  };
}
function di(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), c = (d) => {
    const f = s.get(d);
    if (f !== void 0) return f;
    const { width: m, height: p } = e(d), h = m <= t + 0.5 && p <= n + 0.5;
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
const fi = 512, Qe = /* @__PURE__ */ new Map();
let Gt = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Gt += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Gt += 1;
}));
function mi(e, t, n, r) {
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
function pi({ item: e, pageScale: t }) {
  const n = k(null), r = Z(
    () => li(e.translatedText),
    [e.translatedText]
  ), [o, a] = C(r.fallbackHtml), s = Z(
    () => ui(e, t),
    [e, t]
  );
  F(() => {
    let d = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      d && a(f);
    }), () => {
      d = !1;
    };
  }, [r]), ze(() => {
    const d = n.current;
    if (!d) return;
    const [f, m, p, h] = s.padding, v = Math.max(1, e.rect.width - h - m), b = Math.max(1, e.rect.height - f - p), P = mi(o, v, b, s);
    let S = Qe.get(P);
    if (S === void 0 && (S = di(
      (g) => (d.style.fontSize = `${g}px`, { width: d.scrollWidth, height: d.scrollHeight }),
      v,
      b,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Qe.set(P, S), Qe.size > fi)) {
      const g = Qe.keys().next().value;
      g !== void 0 && Qe.delete(g);
    }
    d.style.fontSize = `${S.toFixed(2)}px`;
  }, [o, e.rect.height, e.rect.width, s]);
  const [c, i, l, u] = s.padding;
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
        padding: `${c}px ${i}px ${l}px ${u}px`
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
function hi({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = Z(
    () => ai(e, t, n, r),
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
        pi,
        {
          item: a,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${a.itemId}:${a.changedAtSeq}`
      ))
    }
  ) : null;
}
const gi = tn(hi), Fr = 1.414;
function bi({
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
  hoveredRegionId: m,
  onHoverRegion: p,
  liveTranslationLayout: h,
  liveTranslationPage: v,
  showLiveTranslation: b = r === "source"
}) {
  const P = k(c ?? Fr), [S, g] = C(P.current);
  F(() => {
    c != null && Math.abs(c - P.current) >= 1e-3 && (P.current = c, g(c));
  }, [c]);
  const w = k(l);
  w.current = l;
  const L = k((M) => {
    var $;
    ($ = w.current) == null || $.call(w, M);
  }).current, E = Math.max(120, Math.floor(t * S)), D = Math.max(E, Math.ceil(a || 0)), _ = Pt(u, t, E), N = Z(
    () => ni(d, t, E),
    [E, d, t]
  ), [T, I] = C(null), R = typeof p == "function", A = R ? m ?? null : T, x = (M) => {
    R ? M !== (m ?? null) && (p == null || p(M)) : I(($) => $ === M ? $ : M);
  }, [U, ee] = C(0), Y = Z(
    () => N.find((M) => M.itemId === A) || null,
    [A, N]
  ), re = (M) => {
    if (M.buttons !== 0) {
      x(null);
      return;
    }
    const $ = M.currentTarget.getBoundingClientRect(), B = xt(
      N,
      M.clientX - $.left,
      M.clientY - $.top
    );
    x((B == null ? void 0 : B.itemId) || null);
  }, H = async (M) => {
    var ne, le, ue;
    if ((le = (ne = M.target) == null ? void 0 : ne.closest) != null && le.call(ne, `.${Kt}`)) return;
    const $ = M.currentTarget.getBoundingClientRect(), B = xt(
      N,
      M.clientX - $.left,
      M.clientY - $.top
    );
    if (!B) return;
    const V = Rt(B.highlight.region, r === "translated" ? "translated" : "source");
    V && ((ue = window.getSelection()) == null || ue.removeAllRanges(), await Or(V) && ee((de) => de + 1));
  }, K = (M) => {
    var V, ne, le, ue, de;
    if (!f || (ne = (V = M.target) == null ? void 0 : V.closest) != null && ne.call(V, ".reader-structure-selection-target") || (ue = (le = M.target) == null ? void 0 : le.closest) != null && ue.call(le, `.${Kt}`) || `${((de = window.getSelection()) == null ? void 0 : de.toString()) || ""}`.trim()) return;
    const $ = M.currentTarget.getBoundingClientRect(), B = xt(
      N,
      M.clientX - $.left,
      M.clientY - $.top
    );
    B && f({
      selectionType: "region",
      region: B.highlight.region,
      kind: "text",
      page: B.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: $.left + B.rect.left,
        top: $.top + B.rect.top,
        width: B.rect.width,
        height: B.rect.height
      }
    });
  }, ie = (M) => {
    !Number.isFinite(M) || M <= 0 || Math.abs(P.current - M) < 1e-3 || (P.current = M, g(M), i == null || i(e, M));
  };
  return /* @__PURE__ */ j(
    "div",
    {
      ref: L,
      [He]: e,
      [We]: r,
      [cn]: E,
      className: ln,
      onPointerMoveCapture: re,
      onClick: K,
      onDoubleClick: H,
      onPointerLeave: () => x(null),
      style: {
        width: t,
        height: D,
        minHeight: D
      },
      children: [
        o ? /* @__PURE__ */ y(
          Wo,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: Rr,
            loading: /* @__PURE__ */ y(
              "div",
              {
                className: St,
                style: { width: t, height: E }
              }
            ),
            onLoadSuccess: (M) => {
              try {
                const $ = M.getViewport({ scale: 1 });
                if ($.width > 0) {
                  const B = $.height / $.width;
                  ie(B);
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
            style: { width: t, height: E },
            "aria-hidden": !0
          }
        ),
        _ ? /* @__PURE__ */ y(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": u == null ? void 0 : u.itemId,
            style: _,
            "aria-hidden": "true"
          }
        ) : null,
        o && b ? /* @__PURE__ */ y(
          gi,
          {
            layoutPage: h,
            pageState: v,
            width: t,
            height: E
          }
        ) : null,
        /* @__PURE__ */ y(
          ri,
          {
            target: o ? Y : null,
            pane: r === "translated" ? "translated" : "source",
            copiedSignal: U
          }
        ),
        /* @__PURE__ */ y(
          ti,
          {
            pane: r === "translated" ? "translated" : "source",
            width: t,
            height: E,
            regions: d,
            onSelect: f
          }
        )
      ]
    }
  );
}
const yi = tn(bi), Dt = 5, vi = "120% 0px", Si = 120;
let Bn = 1;
const Hn = /* @__PURE__ */ new WeakMap();
function wi(e) {
  if (!e) return 0;
  const t = Hn.get(e);
  if (t) return t;
  const n = Bn;
  return Bn += 1, Hn.set(e, n), n;
}
function Pi() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const Ri = fo(
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
    activeRegion: p = null,
    regions: h = [],
    readerMetadata: v = null,
    onSelectRegion: b,
    hoveredRegionId: P = null,
    onHoverRegion: S,
    liveTranslation: g,
    showLiveTranslation: w = t === "source",
    liveTranslationPendingLabel: L = "",
    paneAction: E
  }, D) {
    Qs();
    const { file: _, loading: N, error: T } = Ia(n, r), I = `${n}\0${wi(_)}`, R = k(I);
    R.current = I;
    const A = Z(
      () => Pa(_),
      [_, n]
    ), [x, U] = C(0), [ee, Y] = C(""), [re, H] = C(null), [K, ie] = C(480), M = k(null), $ = k(0), B = Z(() => Pi(), []), V = Z(() => ({
      cMapUrl: rt().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: rt().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    nn(D, () => re, [re]), F(() => {
      const z = (q) => {
        $.current = q, ie(q);
      }, J = (q) => {
        const Q = Ka(q, $.current);
        if (Q !== "ignore") {
          if (M.current && clearTimeout(M.current), Q === "immediate") {
            z(q);
            return;
          }
          M.current = setTimeout(() => z(q), Ga);
        }
      }, W = !!(i && i >= 80);
      J(W ? i : (c == null ? void 0 : c.clientWidth) || 0);
      const se = !W && c && typeof ResizeObserver < "u" ? new ResizeObserver((q) => {
        var Q, ce;
        J(((ce = (Q = q[0]) == null ? void 0 : Q.contentRect) == null ? void 0 : ce.width) ?? c.clientWidth);
      }) : null;
      return se && c && se.observe(c), () => {
        se == null || se.disconnect(), M.current && clearTimeout(M.current);
      };
    }, [i, c, a]);
    const ne = Z(
      () => Ja(K, o),
      [K, o]
    ), [le, ue] = C(() => /* @__PURE__ */ new Map()), [de, dt] = C(() => /* @__PURE__ */ new Set()), [oe, te] = C(() => /* @__PURE__ */ new Set()), ae = k(/* @__PURE__ */ new Map()), me = k(null), ge = k(/* @__PURE__ */ new Map()), ke = O((z, J) => {
      ue((W) => {
        if (W.get(z) === J) return W;
        const G = new Map(W);
        return G.set(z, J), G;
      });
    }, []), ft = O((z, J) => {
      const W = ae.current, G = W.get(z);
      if (G && me.current)
        try {
          me.current.unobserve(G);
        } catch {
        }
      if (J) {
        if (W.set(z, J), me.current)
          try {
            me.current.observe(J);
          } catch {
          }
      } else
        W.delete(z);
    }, []), Mt = k(/* @__PURE__ */ new Map()), qe = O((z) => {
      const J = Mt.current;
      let W = J.get(z);
      return W || (W = (G) => ft(z, G), J.set(z, W)), W;
    }, [ft]);
    F(() => {
      if (typeof IntersectionObserver > "u") return;
      const z = ge.current, J = new IntersectionObserver(
        (W) => {
          const G = [], se = [];
          for (const q of W) {
            const Q = q.target, ce = Tt(Q);
            Number.isFinite(ce) && (q.isIntersecting ? G : se).push(ce);
          }
          if ((G.length || se.length) && dt((q) => {
            let Q = null;
            for (const ce of G)
              q.has(ce) || (Q = Q || new Set(q), Q.add(ce));
            for (const ce of se)
              q.has(ce) && (Q = Q || new Set(q), Q.delete(ce));
            return Q || q;
          }), G.length) {
            for (const q of G) {
              const Q = z.get(q);
              Q && (clearTimeout(Q), z.delete(q));
            }
            te((q) => {
              let Q = null;
              for (const ce of G)
                q.has(ce) || (Q = Q || new Set(q), Q.add(ce));
              return Q || q;
            });
          }
          for (const q of se)
            z.has(q) || z.set(q, setTimeout(() => {
              z.delete(q), te((Q) => {
                if (!Q.has(q)) return Q;
                const ce = new Set(Q);
                return ce.delete(q), ce;
              });
            }, Si));
        },
        { root: c, rootMargin: vi, threshold: 0 }
      );
      me.current = J;
      for (const W of ae.current.values())
        try {
          J.observe(W);
        } catch {
        }
      return () => {
        J.disconnect(), me.current === J && (me.current = null);
        for (const W of z.values()) clearTimeout(W);
        z.clear();
      };
    }, [c]), ze(() => {
      U(0), Y(""), dt(/* @__PURE__ */ new Set()), te(/* @__PURE__ */ new Set()), ue(/* @__PURE__ */ new Map()), ae.current.clear();
      const z = ge.current;
      for (const J of z.values()) clearTimeout(J);
      z.clear(), m == null || m(0, t);
    }, [I, m, t]);
    const Ke = O(
      ({ numPages: z }) => {
        R.current === I && (U(z), Y(""), m == null || m(z, t), d == null || d({ numPages: z, pane: t }));
      },
      [I, d, m, t]
    ), Ge = O(
      (z) => {
        if (R.current !== I) return;
        const J = (z == null ? void 0 : z.message) || "PDF 解析失败";
        Y(J), U(0), m == null || m(0, t), f == null || f(z, t);
      },
      [I, f, m, t]
    ), ve = Z(
      () => x > 0 ? Array.from({ length: x }, (z, J) => J + 1) : [],
      [x]
    );
    F(() => {
      typeof IntersectionObserver < "u" || te(new Set(ve));
    }, [ve]);
    const Le = Z(
      () => Ln(p, v, t),
      [p, v, t]
    ), At = Z(() => {
      const z = /* @__PURE__ */ new Map();
      for (const J of h) {
        const W = Ln(J, v, t);
        if (!W) continue;
        const G = z.get(W.box.page) || [];
        G.push(W), z.set(W.box.page, G);
      }
      return z;
    }, [t, v, h]), io = Z(() => {
      const z = /* @__PURE__ */ new Set();
      if (!P) return z;
      for (const [J, W] of At)
        W.some((G) => G.itemId === P) && z.add(J);
      return z;
    }, [P, At]), co = Z(() => {
      if (x === 0) return /* @__PURE__ */ new Set();
      if (!a) return /* @__PURE__ */ new Set();
      if (!(!!c && typeof IntersectionObserver < "u")) return new Set(ve);
      if (de.size === 0) {
        const W = Math.min(x, Dt * 2 + 1);
        return new Set(Array.from({ length: W }, (G, se) => se + 1));
      }
      const J = /* @__PURE__ */ new Set();
      for (const W of de)
        for (let G = -Dt; G <= Dt; G++) {
          const se = W + G;
          se >= 1 && se <= x && J.add(se);
        }
      return J;
    }, [x, ve, c, a, de]), lo = !n || !!T || !!ee, uo = n && (T || ee) || s;
    return /* @__PURE__ */ j(
      "section",
      {
        ref: H,
        className: `reader-panel ${Fa}${a ? "" : " is-hidden"}`,
        [We]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": a ? "true" : "false",
        "data-live-translation-status": (g == null ? void 0 : g.jobStatus) || void 0,
        "aria-hidden": a ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          E ? /* @__PURE__ */ y("div", { className: "reader-react-pdf-pane-action", children: E }) : null,
          L ? /* @__PURE__ */ j("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ y("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ y("span", { children: L })
          ] }) : null,
          lo && !N ? /* @__PURE__ */ y("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: uo }) : null,
          N ? /* @__PURE__ */ y("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          A && !T ? /* @__PURE__ */ y("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ y(
            Jo,
            {
              file: A,
              loading: null,
              error: null,
              options: V,
              onLoadSuccess: Ke,
              onLoadError: Ge,
              className: "reader-react-pdf-document",
              children: ve.map((z) => {
                if (co.has(z))
                  return /* @__PURE__ */ y(
                    yi,
                    {
                      pane: t,
                      pageNumber: z,
                      width: ne,
                      devicePixelRatio: B,
                      active: oe.has(z),
                      syncedMinHeight: (l == null ? void 0 : l.get(z)) || 0,
                      onMetrics: u,
                      cachedAspect: le.get(z),
                      onAspectChange: ke,
                      sentinelRef: qe(z),
                      regionHighlight: (Le == null ? void 0 : Le.box.page) === z ? Le : null,
                      regionTargets: At.get(z),
                      onSelectRegion: b,
                      hoveredRegionId: P && io.has(z) ? P : null,
                      onHoverRegion: S,
                      liveTranslationLayout: g == null ? void 0 : g.layoutByPage.get(z - 1),
                      liveTranslationPage: g == null ? void 0 : g.pagesByPage.get(z - 1),
                      showLiveTranslation: w
                    },
                    `${t}-${z}`
                  );
                const W = le.get(z) ?? Fr, G = Math.max(120, Math.floor(ne * W)), se = Math.max(G, Math.ceil((l == null ? void 0 : l.get(z)) || 0));
                return /* @__PURE__ */ y(
                  "div",
                  {
                    ref: qe(z),
                    [He]: z,
                    [We]: t,
                    [cn]: G,
                    className: ln,
                    style: {
                      width: ne,
                      height: se,
                      minHeight: se
                    },
                    children: /* @__PURE__ */ y(
                      "div",
                      {
                        className: St,
                        style: { width: ne, height: G },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${z}`
                );
              })
            },
            I
          ) }) : null
        ]
      }
    );
  }
), Wn = tn(Ri), $r = rn(null), jr = rn(null);
function Ti({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ y($r.Provider, { value: e, children: /* @__PURE__ */ y(jr.Provider, { value: t, children: n }) });
}
function ut() {
  return on($r);
}
function Ii() {
  return on(jr);
}
function Ei({
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
function Mi(e, t, n = e * 2) {
  return t ? !Number.isFinite(e) || e <= 0 ? n : e * 2 : e;
}
function Ai(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function ki(e) {
  const t = ut(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", c = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, l = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), u = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, d = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? lt, p = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, h = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), v = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, b = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, P = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, S = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", g = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", w = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, L = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, E = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), D = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), _ = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), N = e.regions ?? (t == null ? void 0 : t.regions) ?? [], T = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), I = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), [R, A] = C(null), x = O((re) => A(re), []), U = Ei({
    mode: s,
    compareMode: c,
    showSource: i,
    showTranslated: l,
    markdownSplit: n,
    overlayOnSource: u
  }), Y = Number.isFinite(p) && p > 0 ? Mi(
    p,
    n || r,
    typeof document > "u" ? p * 2 : document.documentElement.clientWidth
  ) : null;
  return /* @__PURE__ */ y(
    "div",
    {
      ref: d,
      className: Pr,
      "data-reader-region-count": N.length,
      "data-reader-structured-region-count": N.filter(pr).length,
      "data-reader-metadata-ready": T ? "true" : "false",
      children: /* @__PURE__ */ j(
        "main",
        {
          className: `${Oa} reader-mode-${U.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            v ? /* @__PURE__ */ y(
              Wn,
              {
                pane: "source",
                url: S,
                preloadedFile: w,
                userZoom: m,
                visible: U.showSource,
                scrollRoot: f,
                pageWidthOverride: Y,
                rowHeights: U.compareMode ? h : void 0,
                onMetrics: E,
                emptyLabel: P ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: D,
                activeRegion: _,
                regions: N,
                readerMetadata: T,
                onSelectRegion: I,
                hoveredRegionId: R,
                onHoverRegion: x,
                liveTranslation: u ? o : void 0,
                showLiveTranslation: u,
                liveTranslationPendingLabel: u ? Ai(o) : "",
                paneAction: u ? /* @__PURE__ */ j(en, { children: [
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
            b ? /* @__PURE__ */ y(
              Wn,
              {
                pane: "translated",
                url: g,
                preloadedFile: L,
                userZoom: m,
                visible: U.showTranslated,
                scrollRoot: f,
                pageWidthOverride: Y,
                rowHeights: U.compareMode ? h : void 0,
                onMetrics: E,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: D,
                activeRegion: _,
                regions: N,
                readerMetadata: T,
                onSelectRegion: I,
                hoveredRegionId: R,
                onHoverRegion: x,
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
const Li = [
  { id: "source", label: "源文件", Icon: gr },
  { id: "compare", label: "对照", Icon: br },
  { id: "translated", label: "翻译文件", Icon: yr }
];
function Jn(e) {
  return `辅助面板占了右半边，对照只剩${e === "translated" ? "译文" : "原文"} · 点此关闭面板恢复对照`;
}
function Ci(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function _i(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Ni(e) {
  const t = ut(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null,
    compareDegraded: s = !1,
    onRestoreCompare: c
  } = e, i = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, l = a ? Ci(a.state) : "";
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
          /* @__PURE__ */ y(_o, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { className: "reader-live-translation-toggle-label", children: l })
        ]
      }
    ) : null,
    /* @__PURE__ */ y("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: Li.map(({ id: u, label: d, Icon: f }) => {
      const m = n === u, p = _i({
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
          title: p ? `${d} 需要文档任务` : d,
          disabled: p,
          onClick: () => o(u),
          children: [
            /* @__PURE__ */ y(f, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ y("span", { className: "reader-workspace-tab-label", children: d })
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
        title: Jn(n),
        children: [
          /* @__PURE__ */ y(No, { size: 13, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { className: "reader-compare-degraded-label", children: Jn(n) })
        ]
      }
    ) : null
  ] });
}
const xi = {
  markdown: { label: "Markdown", short: "MD", Icon: xo, needsJob: !0 }
}, zi = Er.map(
  (e) => ({ id: e, ...xi[e] })
), Di = {
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
    Icon: vr,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    ariaLabel: "AI（agent 终端）",
    keepMounted: !0
  }
}, Ur = Mr.map(
  (e) => ({ id: e, ...Di[e] })
);
function Oi(e) {
  return [
    ...zi.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: a
    })),
    ...Ur.filter((t) => e(t.adapterKey)).map(({ id: t, label: n, short: r, Icon: o }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: !1
    }))
  ];
}
function Fi() {
  const e = he();
  return Oi((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function $i(e) {
  const t = ut(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), c = Fi();
  return n ? /* @__PURE__ */ j("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ y("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: c.map(({ id: i, label: l, Icon: u, needsJob: d }) => {
      const f = n === i, m = d && o, p = r == null ? void 0 : r[i];
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
            /* @__PURE__ */ y(u, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ y("span", { className: "reader-assistant-dock-tab-label", children: l }),
            p ? /* @__PURE__ */ y("span", { className: "reader-assistant-dock-badge", children: p }) : null
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
        children: /* @__PURE__ */ y(an, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ y("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: c.map(({ id: i, label: l, short: u, Icon: d, needsJob: f }) => {
    const m = f && o, p = r == null ? void 0 : r[i];
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
          /* @__PURE__ */ y(d, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { children: u }),
          p ? /* @__PURE__ */ y("span", { className: "reader-assistant-dock-badge", children: p }) : null
        ]
      },
      i
    );
  }) });
}
function ji(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function Ui(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function Bi(e) {
  return e / 100 * window.innerHeight;
}
function Hi(e) {
  return e / 100 * window.innerWidth;
}
function Wi(e) {
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
  const [o, a] = Wi(n);
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
      r = Ui(t, o);
      break;
    }
    case "em": {
      r = ji(t, o);
      break;
    }
    case "vh": {
      r = Bi(o);
      break;
    }
    case "vw": {
      r = Hi(o);
      break;
    }
  }
  return r;
}
function pe(e) {
  return parseFloat(e.toFixed(3));
}
function Je({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, o) => (r += t === "horizontal" ? o.element.offsetWidth : o.element.offsetHeight, r), 0);
}
function Zt(e) {
  const { panels: t } = e, n = Je({ group: e });
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
      const u = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.collapsedSize
      });
      s = pe(u / n * 100);
    }
    let c;
    if (a.defaultSize !== void 0) {
      const u = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      c = pe(u / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const u = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.minSize
      });
      i = pe(u / n * 100);
    }
    let l = 100;
    if (a.maxSize !== void 0) {
      const u = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      l = pe(u / n * 100);
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
function X(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function Yt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? Ji : Vi
  );
}
function Ji(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function Vi(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function Br(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Hr(e, t) {
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
function qi({
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
    const { x: c, y: i } = Hr(r, s), l = e === "horizontal" ? c : i;
    l < a && (a = l, o = s);
  }
  return X(o, "No rect found"), o;
}
let ht;
function Ki() {
  return ht === void 0 && (typeof matchMedia == "function" ? ht = !!matchMedia("(pointer:coarse)").matches : ht = !1), ht;
}
function Wr(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = Yt(
    n,
    Array.from(t.children).filter(Br).map((p) => ({ element: p }))
  ).map(({ element: p }) => p), s = [];
  let c = !1, i = !1, l = -1, u = -1, d = 0, f, m = [];
  {
    let p = -1;
    for (const h of a)
      h.hasAttribute("data-panel") && (p++, h.hasAttribute("data-disabled") || (d++, l === -1 && (l = p), u = p));
  }
  if (d > 1) {
    let p = -1;
    for (const h of a)
      if (h.hasAttribute("data-panel")) {
        p++;
        const v = r.find(
          (b) => b.element === h
        );
        if (v) {
          if (f) {
            const b = f.element.getBoundingClientRect(), P = h.getBoundingClientRect();
            let S;
            if (i) {
              const g = n === "horizontal" ? new DOMRect(
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
                  S = [
                    g,
                    w
                  ];
                  break;
                }
                case 1: {
                  const L = m[0], E = qi({
                    orientation: n,
                    rects: [b, P],
                    targetRect: L.element.getBoundingClientRect()
                  });
                  S = [
                    L,
                    E === b ? w : g
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
            for (const g of S) {
              let w = "width" in g ? g : g.element.getBoundingClientRect();
              const L = Ki() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (w.width < L) {
                const D = L - w.width;
                w = new DOMRect(
                  w.x - D / 2,
                  w.y,
                  w.width + D,
                  w.height
                );
              }
              if (w.height < L) {
                const D = L - w.height;
                w = new DOMRect(
                  w.x,
                  w.y - D / 2,
                  w.width,
                  w.height + D
                );
              }
              const E = p <= l || p > u;
              !c && !E && s.push({
                group: e,
                groupSize: Je({ group: e }),
                panels: [f, v],
                separator: "width" in g ? void 0 : g,
                rect: w
              }), c = !1;
            }
          }
          i = !1, f = v, m = [];
        }
      } else if (h.hasAttribute("data-separator")) {
        h.ariaDisabled !== null && (c = !0);
        const v = o.find(
          (b) => b.element === h
        );
        v ? m.push(v) : (f = void 0, m = []);
      } else
        i = !0;
  }
  return s;
}
var Me;
class Jr {
  constructor() {
    An(this, Me, {});
  }
  addListener(t, n) {
    const r = Ze(this, Me)[t];
    return r === void 0 ? Ze(this, Me)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = Ze(this, Me)[t];
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
    kn(this, Me, {});
  }
  removeListener(t, n) {
    const r = Ze(this, Me)[t];
    if (r !== void 0) {
      const o = r.indexOf(n);
      o >= 0 && r.splice(o, 1);
    }
  }
}
Me = new WeakMap();
let Ue = {
  cursorFlags: 0,
  state: "inactive"
};
const mn = new Jr();
function _e() {
  return Ue;
}
function Gi(e) {
  return mn.addListener("change", e);
}
function Zi(e) {
  const t = Ue, n = { ...Ue };
  n.cursorFlags = e, Ue = n, mn.emit("change", {
    prev: t,
    next: n
  });
}
function Be(e) {
  const t = Ue;
  Ue = e, mn.emit("change", {
    prev: t,
    next: e
  });
}
const Yi = (e) => e, Ot = () => {
}, Vr = 1, qr = 2, Kr = 4, Gr = 8, Vn = 3, qn = 12;
let gt;
function Kn() {
  return gt === void 0 && (gt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (gt = !0)), gt;
}
function Xi({
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
          const a = (e & Vr) !== 0, s = (e & qr) !== 0, c = (e & Kr) !== 0, i = (e & Gr) !== 0;
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
function pn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = Gn.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = _e();
  switch (r.state) {
    case "active":
    case "hover": {
      const o = Xi({
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
let we = /* @__PURE__ */ new Map();
const Zr = new Jr();
function Qi(e) {
  we = new Map(we), we.delete(e);
}
function Zn(e, t) {
  for (const [n] of we)
    if (n.id === e)
      return n;
}
function Ae(e, t) {
  for (const [n, r] of we)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function De() {
  return we;
}
function hn(e, t) {
  return Zr.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Ie(e, t, n) {
  const r = we.get(e);
  we = new Map(we), we.set(e, t), Zr.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function Yr(e) {
  const t = _e();
  let n = !1;
  switch (t.state) {
    case "active":
      Be({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (pn(e), n = !0, t.hitRegions.forEach((r) => {
        const o = Ae(r.group.id, !0);
        Ie(r.group, o, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function Yn(e) {
  e.defaultPrevented || Yr(e.currentTarget);
}
function ec(e, t, n) {
  let r, o = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const s = Hr(n, a.rect);
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
function tc(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function nc(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: er(e),
    b: er(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  X(
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
const rc = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function oc(e) {
  const t = getComputedStyle(Xr(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function ac(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || oc(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || rc.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function Xn(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (X(n, "Missing node"), ac(n)) return n;
  }
  return null;
}
function Qn(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function er(e) {
  const t = [];
  for (; e; )
    t.push(e), e = Xr(e);
  return t;
}
function Xr(e) {
  const { parentNode: t } = e;
  return tc(t) ? t.host : t;
}
function sc(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function ic({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!Br(n) || n.contains(e) || e.contains(n))
    return !0;
  if (nc(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (sc(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function gn(e, t) {
  const n = [];
  return t.forEach((r, o) => {
    if (o.disabled)
      return;
    const a = Wr(o), s = ec(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && ic({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function cc(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function fe(e, t, n = 0) {
  return Math.abs(pe(e) - pe(t)) <= n;
}
function Se(e, t) {
  return fe(e, t) ? 0 : e > t ? 1 : -1;
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
  return r = Math.min(c, r), r = pe(r), r;
}
function st({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: o,
  trigger: a
}) {
  if (fe(e, 0))
    return t;
  const s = a === "imperative-api", c = Object.values(t), i = Object.values(o), l = [...c], [u, d] = r;
  X(u != null, "Invalid first pivot index"), X(d != null, "Invalid second pivot index");
  let f = 0;
  switch (a) {
    case "keyboard": {
      {
        const h = e < 0 ? d : u, v = n[h];
        X(
          v,
          `Panel constraints not found for index ${h}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: S = 0
        } = v;
        if (P) {
          const g = c[h];
          if (X(
            g != null,
            `Previous layout not found for panel index ${h}`
          ), fe(g, b)) {
            const w = S - g;
            Se(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      {
        const h = e < 0 ? u : d, v = n[h];
        X(
          v,
          `No panel constraints found for index ${h}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: S = 0
        } = v;
        if (P) {
          const g = c[h];
          if (X(
            g != null,
            `Previous layout not found for panel index ${h}`
          ), fe(g, S)) {
            const w = g - b;
            Se(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      break;
    }
    default: {
      const h = e < 0 ? d : u, v = n[h];
      X(
        v,
        `Panel constraints not found for index ${h}`
      );
      const b = c[h], { collapsible: P, collapsedSize: S, minSize: g } = v;
      if (P && Se(b, g) < 0)
        if (e > 0) {
          const w = g - S, L = w / 2, E = b + e;
          Se(E, g) < 0 && (e = Se(e, L) <= 0 ? 0 : w);
        } else {
          const w = g - S, L = 100 - w / 2, E = b - e;
          Se(E, g) < 0 && (e = Se(100 + e, L) > 0 ? 0 : -w);
        }
      break;
    }
  }
  {
    const h = e < 0 ? 1 : -1;
    let v = e < 0 ? d : u, b = 0;
    for (; ; ) {
      const S = c[v];
      X(
        S != null,
        `Previous layout not found for panel index ${v}`
      );
      const g = je({
        overrideDisabledPanels: s,
        panelConstraints: n[v],
        prevSize: S,
        size: 100
      }) - S;
      if (b += g, v += h, v < 0 || v >= n.length)
        break;
    }
    const P = Math.min(Math.abs(e), Math.abs(b));
    e = e < 0 ? 0 - P : P;
  }
  {
    let h = e < 0 ? u : d;
    for (; h >= 0 && h < n.length; ) {
      const v = Math.abs(e) - Math.abs(f), b = c[h];
      X(
        b != null,
        `Previous layout not found for panel index ${h}`
      );
      const P = b - v, S = je({
        overrideDisabledPanels: s,
        panelConstraints: n[h],
        prevSize: b,
        size: P
      });
      if (!fe(b, S) && (f += b - S, l[h] = S, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? h-- : h++;
    }
  }
  if (cc(i, l))
    return o;
  {
    const h = e < 0 ? d : u, v = c[h];
    X(
      v != null,
      `Previous layout not found for panel index ${h}`
    );
    const b = v + f, P = je({
      overrideDisabledPanels: s,
      panelConstraints: n[h],
      prevSize: v,
      size: b
    });
    if (l[h] = P, !fe(P, b)) {
      let S = b - P, g = e < 0 ? d : u;
      for (; g >= 0 && g < n.length; ) {
        const w = l[g];
        X(
          w != null,
          `Previous layout not found for panel index ${g}`
        );
        const L = w + S, E = je({
          overrideDisabledPanels: s,
          panelConstraints: n[g],
          prevSize: w,
          size: L
        });
        if (fe(w, E) || (S -= E - w, l[g] = E), fe(S, 0))
          break;
        e > 0 ? g-- : g++;
      }
    }
  }
  const m = Object.values(l).reduce(
    (h, v) => v + h,
    0
  );
  if (!fe(m, 100, 0.1))
    return o;
  const p = Object.keys(o);
  return l.reduce((h, v, b) => (h[p[b]] = v, h), {});
}
function Ne(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || Se(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function xe({
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
      X(i != null, `No layout data found for index ${c}`);
      const l = 100 / o * i;
      r[c] = l;
    }
  let a = 0;
  for (let c = 0; c < t.length; c++) {
    const i = n[c];
    X(i != null, `No layout data found for index ${c}`);
    const l = r[c];
    X(l != null, `No layout data found for index ${c}`);
    const u = je({
      overrideDisabledPanels: !0,
      panelConstraints: t[c],
      prevSize: i,
      size: l
    });
    l != u && (a += l - u, r[c] = u);
  }
  if (!fe(a, 0))
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      X(i != null, `No layout data found for index ${c}`);
      const l = i + a, u = je({
        overrideDisabledPanels: !0,
        panelConstraints: t[c],
        prevSize: i,
        size: l
      });
      if (i !== u && (a -= u - i, r[c] = u, fe(a, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((c, i, l) => (c[s[l]] = i, c), {});
}
function Qr({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const i = De();
    for (const [
      l,
      {
        defaultLayoutDeferred: u,
        derivedPanelConstraints: d,
        layout: f,
        groupSize: m,
        separatorToPanels: p
      }
    ] of i)
      if (l.id === e)
        return {
          defaultLayoutDeferred: u,
          derivedPanelConstraints: d,
          group: l,
          groupSize: m,
          layout: f,
          separatorToPanels: p
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
    const f = a(), m = l.findIndex((v) => v.id === t), p = m === 0, h = m === l.length - 1;
    if (h && i < f && (p || l.slice(0, m).every((v, b) => {
      const P = d[b];
      return (P == null ? void 0 : P.collapsible) && fe(P.collapsedSize, u[P.panelId]);
    }))) {
      const v = l.slice(0, m).reduce((b, P) => b + u[P.id], 0);
      return {
        ...u,
        [t]: pe(100 - v)
      };
    }
    return st({
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
      layout: p,
      separatorToPanels: h
    } = n(), v = s({
      nextSize: i,
      panels: f.panels,
      prevLayout: p,
      derivedPanelConstraints: d
    }), b = xe({
      layout: v,
      panelConstraints: d
    });
    Ne(p, b) || Ie(f, {
      defaultLayoutDeferred: u,
      derivedPanelConstraints: d,
      groupSize: m,
      layout: b,
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
      return i && fe(l, u);
    },
    resize: (i) => {
      const { group: l } = n(), { element: u } = o(), d = Je({ group: l }), f = et({
        groupSize: d,
        panelElement: u,
        styleProp: i
      }), m = pe(f / d * 100);
      c(m);
    }
  };
}
function tr(e) {
  if (e.defaultPrevented)
    return;
  const t = De();
  gn(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (o) => o.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const o = r.panelConstraints.defaultSize, a = Qr({
          groupId: n.group.id,
          panelId: r.id
        });
        a && o !== void 0 && (a.resize(o), e.preventDefault());
      }
    }
  });
}
function bt(e) {
  const t = De();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function eo({
  groupId: e
}) {
  const t = () => {
    const n = De();
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
      } = t(), l = xe({
        layout: n,
        panelConstraints: o
      });
      return r ? c : (Ne(c, l) || Ie(a, {
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
  const n = bt(e), r = Ae(n.id, !0), o = n.separators.find(
    (u) => u.element === e
  );
  X(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  X(a, "Matching panels not found");
  const s = a.map((u) => n.panels.indexOf(u)), c = eo({ groupId: n.id }).getLayout(), i = st({
    delta: t,
    initialLayout: c,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: c,
    trigger: "keyboard"
  }), l = xe({
    layout: i,
    panelConstraints: r.derivedPanelConstraints
  });
  Ne(c, l) || Ie(
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
  const t = e.currentTarget, n = bt(t);
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
        const r = bt(t), o = Ae(r.id, !0), { derivedPanelConstraints: a, layout: s, separatorToPanels: c } = o, i = r.separators.find(
          (f) => f.element === t
        );
        X(i, "Matching separator not found");
        const l = c.get(i);
        X(l, "Matching panels not found");
        const u = l[0], d = a.find(
          (f) => f.panelId === u.id
        );
        if (X(d, "Panel metadata not found"), d.collapsible) {
          const f = s[u.id], m = d.collapsedSize === f ? r.mutableState.expandedPanelSizes[u.id] ?? d.minSize : d.collapsedSize;
          Ce(t, m - f);
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
        X(o !== null, "Index not found");
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
function rr(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = De(), n = gn(e, t), r = /* @__PURE__ */ new Map();
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
function to({
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
    const { group: u, groupSize: d } = l, { orientation: f, panels: m } = u, { disableCursor: p } = u.mutableState;
    let h = 0;
    a ? f === "horizontal" ? h = (t.clientX - a.x) / d * 100 : h = (t.clientY - a.y) / d * 100 : f === "horizontal" ? h = t.clientX < 0 ? -100 : 100 : h = t.clientY < 0 ? -100 : 100;
    const v = r.get(u), b = o.get(u);
    if (!v || !b)
      return;
    const {
      defaultLayoutDeferred: P,
      derivedPanelConstraints: S,
      groupSize: g,
      layout: w,
      separatorToPanels: L
    } = b;
    if (S && w && L) {
      const E = st({
        delta: h,
        initialLayout: v,
        panelConstraints: S,
        pivotIndices: l.panels.map((D) => m.indexOf(D)),
        prevLayout: w,
        trigger: "mouse-or-touch"
      });
      if (Ne(E, w)) {
        if (h !== 0 && !p)
          switch (f) {
            case "horizontal": {
              c |= h < 0 ? Vr : qr;
              break;
            }
            case "vertical": {
              c |= h < 0 ? Kr : Gr;
              break;
            }
          }
      } else
        Ie(l.group, {
          defaultLayoutDeferred: P,
          derivedPanelConstraints: S,
          groupSize: g,
          layout: E,
          separatorToPanels: L
        });
    }
  });
  let i = 0;
  t.movementX === 0 ? i |= s & Vn : i |= c & Vn, t.movementY === 0 ? i |= s & qn : i |= c & qn, Zi(i), pn(e);
}
function or(e) {
  const t = De(), n = _e();
  switch (n.state) {
    case "active":
      to({
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
  const t = _e(), n = De();
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
      to({
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
      const a = gn(e, n);
      a.length === 0 ? t.state !== "inactive" && Be({
        cursorFlags: 0,
        state: "inactive"
      }) : Be({
        cursorFlags: 0,
        hitRegions: a,
        state: "hover"
      }), pn(e.currentTarget);
      break;
    }
  }
}
function sr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (_e().state) {
      case "hover":
        Be({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function ir(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || Yr(e.currentTarget) && e.preventDefault();
}
function cr(e) {
  let t = 0, n = 0;
  const r = {};
  for (const a of e)
    if (a.defaultSize !== void 0) {
      t++;
      const s = pe(a.defaultSize);
      n += s, r[a.panelId] = s;
    } else
      r[a.panelId] = void 0;
  const o = e.length - t;
  if (o !== 0) {
    const a = pe((100 - n) / o);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = a);
  }
  return r;
}
function lc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = Je({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, c = {
    asPercentage: pe(a / o * 100),
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
function dc({
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
        const m = f / 100 * n, p = pe(
          m / t * 100
        );
        c.set(d.id, p), o += p;
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
      u[d] = pe(
        f / a * l
      );
    }
  else {
    const d = pe(
      l / i.length
    );
    for (const f of i)
      u[f] = d;
  }
  return u;
}
function fc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const Fe = /* @__PURE__ */ new Map();
function mc(e) {
  let t = !0;
  X(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new n((p) => {
    for (const h of p) {
      const { borderBoxSize: v, target: b } = h;
      if (b === e.element) {
        if (t) {
          const P = Je({ group: e });
          if (P === 0)
            return;
          const S = Ae(e.id);
          if (!S)
            return;
          const g = Zt(e), w = S.defaultLayoutDeferred ? cr(g) : S.layout, L = dc({
            group: e,
            nextGroupSize: P,
            prevGroupSize: S.groupSize,
            prevLayout: w
          }), E = xe({
            layout: L,
            panelConstraints: g
          });
          if (!S.defaultLayoutDeferred && Ne(S.layout, E) && uc(
            S.derivedPanelConstraints,
            g
          ) && S.groupSize === P)
            return;
          Ie(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: g,
            groupSize: P,
            layout: E,
            separatorToPanels: S.separatorToPanels
          });
        }
      } else
        lc(e, b, v);
    }
  });
  a.observe(e.element), e.panels.forEach((p) => {
    X(
      !r.has(p.id),
      `Panel ids must be unique; id "${p.id}" was used more than once`
    ), r.add(p.id), p.onResize && a.observe(p.element);
  });
  const s = Je({ group: e }), c = Zt(e), i = e.panels.map(({ id: p }) => p).join(",");
  let l = e.mutableState.defaultLayout;
  l && (fc(e.panels, l) || (l = void 0));
  const u = e.mutableState.layouts[i] ?? l ?? cr(c), d = xe({
    layout: u,
    panelConstraints: c
  }), f = e.element.ownerDocument;
  Fe.set(
    f,
    (Fe.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return Wr(e).forEach((p) => {
    p.separator && m.set(p.separator, p.panels);
  }), Ie(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: c,
    groupSize: s,
    layout: d,
    separatorToPanels: m
  }), e.separators.forEach((p) => {
    X(
      !o.has(p.id),
      `Separator ids must be unique; id "${p.id}" was used more than once`
    ), o.add(p.id), p.element.addEventListener("keydown", nr);
  }), Fe.get(f) === 1 && (f.addEventListener("contextmenu", Yn, !0), f.addEventListener("dblclick", tr, !0), f.addEventListener("pointerdown", rr, !0), f.addEventListener("pointerleave", or), f.addEventListener("pointermove", ar), f.addEventListener("pointerout", sr), f.addEventListener("pointerup", ir, !0)), function() {
    t = !1, Fe.set(
      f,
      Math.max(0, (Fe.get(f) ?? 0) - 1)
    ), Qi(e), e.separators.forEach((p) => {
      p.element.removeEventListener("keydown", nr);
    }), Fe.get(f) || (f.removeEventListener(
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
function pc() {
  const [e, t] = C({}), n = O(() => t({}), []);
  return [e, n];
}
function bn(e) {
  const t = mr();
  return `${e ?? t}`;
}
const Oe = typeof window < "u" ? ze : F;
function nt(e) {
  const t = k(e);
  return Oe(() => {
    t.current = e;
  }, [e]), O(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function yn(...e) {
  return nt((t) => {
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
function vn(e) {
  const t = k({ ...e });
  return Oe(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const no = rn(null);
function hc(e, t) {
  const n = k({
    getLayout: () => ({}),
    setLayout: Yi
  });
  nn(t, () => n.current, []), Oe(() => {
    Object.assign(
      n.current,
      eo({ groupId: e })
    );
  });
}
function ro({
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
  const p = k({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), h = nt((T) => {
    Ne(p.current.onLayoutChange, T) || (p.current.onLayoutChange = T, i == null || i(T));
  }), v = nt(
    (T, I) => {
      Ne(p.current.onLayoutChanged, T) || (p.current.onLayoutChanged = T, l == null || l(T, { isUserInteraction: I }));
    }
  ), b = bn(c), P = k(null), [S, g] = pc(), w = k({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: d,
    separators: []
  }), L = yn(P, a);
  hc(b, s);
  const E = nt(
    (T, I) => {
      const R = _e(), A = Zn(T), x = Ae(T);
      if (x) {
        let U = !1;
        switch (R.state) {
          case "active": {
            U = R.hitRegions.some(
              (ee) => ee.group === A
            );
            break;
          }
        }
        return {
          flexGrow: x.layout[I] ?? 1,
          pointerEvents: U ? "none" : void 0
        };
      }
      if (n != null && n[I])
        return {
          flexGrow: n == null ? void 0 : n[I]
        };
    }
  ), D = vn({
    defaultLayout: n,
    disableCursor: r
  }), _ = Z(
    () => ({
      get disableCursor() {
        return !!D.disableCursor;
      },
      getPanelStyles: E,
      id: b,
      orientation: u,
      registerPanel: (T) => {
        const I = w.current;
        return I.panels = Yt(u, [
          ...I.panels,
          T
        ]), g(), () => {
          I.panels = I.panels.filter(
            (R) => R !== T
          ), g();
        };
      },
      registerSeparator: (T) => {
        const I = w.current;
        return I.separators = Yt(u, [
          ...I.separators,
          T
        ]), g(), () => {
          I.separators = I.separators.filter(
            (R) => R !== T
          ), g();
        };
      },
      updatePanelProps: (T, { disabled: I }) => {
        const R = w.current.panels.find(
          (U) => U.id === T
        );
        R && (R.panelConstraints.disabled = I);
        const A = Zn(b), x = Ae(b);
        A && x && Ie(A, {
          ...x,
          derivedPanelConstraints: Zt(A)
        });
      },
      updateSeparatorProps: (T, {
        disabled: I,
        disableDoubleClick: R
      }) => {
        const A = w.current.separators.find(
          (x) => x.id === T
        );
        A && (A.disabled = I, A.disableDoubleClick = R);
      }
    }),
    [E, b, g, u, D]
  ), N = k(null);
  return Oe(() => {
    const T = P.current;
    if (T === null)
      return;
    const I = w.current;
    let R;
    if (D.defaultLayout !== void 0 && Object.keys(D.defaultLayout).length === I.panels.length) {
      R = {};
      for (const H of I.panels) {
        const K = D.defaultLayout[H.id];
        K !== void 0 && (R[H.id] = K);
      }
    }
    const A = {
      disabled: !!o,
      element: T,
      id: b,
      mutableState: {
        defaultLayout: R,
        disableCursor: !!D.disableCursor,
        expandedPanelSizes: w.current.lastExpandedPanelSizes,
        layouts: w.current.layouts
      },
      orientation: u,
      panels: I.panels,
      resizeTargetMinimumSize: I.resizeTargetMinimumSize,
      separators: I.separators
    };
    N.current = A;
    const x = mc(A), { defaultLayoutDeferred: U, derivedPanelConstraints: ee, layout: Y } = Ae(A.id, !0);
    !U && ee.length > 0 && (h(Y), v(Y, !1));
    const re = hn(b, (H) => {
      const { defaultLayoutDeferred: K, derivedPanelConstraints: ie, layout: M } = H.next;
      if (K || ie.length === 0)
        return;
      const $ = A.panels.map(({ id: V }) => V).join(",");
      A.mutableState.layouts[$] = M, ie.forEach((V) => {
        if (V.collapsible) {
          const { layout: ne } = H.prev ?? {};
          if (ne) {
            const le = fe(
              V.collapsedSize,
              M[V.panelId]
            ), ue = fe(
              V.collapsedSize,
              ne[V.panelId]
            );
            le && !ue && (A.mutableState.expandedPanelSizes[V.panelId] = ne[V.panelId]);
          }
        }
      });
      const B = _e().state !== "active";
      h(M), B && v(M, H.isUserInteraction);
    });
    return () => {
      N.current = null, x(), re();
    };
  }, [
    o,
    b,
    v,
    h,
    u,
    S,
    D
  ]), F(() => {
    const T = N.current;
    T && (T.mutableState.defaultLayout = n, T.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ y(no.Provider, { value: _, children: /* @__PURE__ */ y(
    "div",
    {
      ...m,
      className: t,
      "data-group": !0,
      "data-testid": b,
      id: b,
      ref: L,
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
ro.displayName = "Group";
function Sn() {
  const e = on(no);
  return X(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function gc(e, t) {
  const { id: n } = Sn(), r = k({
    collapse: Ot,
    expand: Ot,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Ot
  });
  nn(t, () => r.current, []), Oe(() => {
    Object.assign(
      r.current,
      Qr({ groupId: n, panelId: e })
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
  groupResizeBehavior: c = "preserve-relative-size",
  id: i,
  maxSize: l = "100%",
  minSize: u = "0%",
  onResize: d,
  panelRef: f,
  style: m,
  ...p
}) {
  const h = !!i, v = bn(i), b = vn({
    disabled: a
  }), P = k(null), S = yn(P, s), {
    getPanelStyles: g,
    id: w,
    orientation: L,
    registerPanel: E,
    updatePanelProps: D
  } = Sn(), _ = d !== null, N = nt(
    (A, x, U) => {
      d == null || d(A, i, U);
    }
  );
  Oe(() => {
    const A = P.current;
    if (A !== null) {
      const x = {
        element: A,
        id: v,
        idIsStable: h,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: _ ? N : void 0,
        panelConstraints: {
          groupResizeBehavior: c,
          collapsedSize: n,
          collapsible: r,
          defaultSize: o,
          disabled: b.disabled,
          maxSize: l,
          minSize: u
        }
      };
      return E(x);
    }
  }, [
    c,
    n,
    r,
    o,
    _,
    v,
    h,
    l,
    u,
    N,
    E,
    b
  ]), F(() => {
    D(v, { disabled: a });
  }, [a, v, D]), gc(v, f);
  const T = () => {
    const A = g(w, v);
    if (A)
      return JSON.stringify(A);
  }, I = mo(
    (A) => hn(w, A),
    T,
    T
  );
  let R;
  return I ? R = JSON.parse(I) : o !== void 0 ? R = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: o
  } : R = { flexGrow: 1 }, /* @__PURE__ */ y(
    "div",
    {
      ...p,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": v,
      id: v,
      ref: S,
      style: {
        ...bc,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...R
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
            touchAction: L === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
Xt.displayName = "Panel";
const bc = {
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
function yc({
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
    a = xe({
      layout: st({
        delta: l - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: u,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], o = xe({
      layout: st({
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
function oo({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: o,
  id: a,
  style: s,
  ...c
}) {
  const i = bn(a), l = vn({
    disabled: n,
    disableDoubleClick: r
  }), [u, d] = C({}), [f, m] = C("inactive"), [p, h] = C(!1), v = k(null), b = yn(v, o), {
    disableCursor: P,
    id: S,
    orientation: g,
    registerSeparator: w,
    updateSeparatorProps: L
  } = Sn(), E = g === "horizontal" ? "vertical" : "horizontal";
  Oe(() => {
    const N = v.current;
    if (N !== null) {
      const T = {
        disabled: l.disabled,
        disableDoubleClick: l.disableDoubleClick,
        element: N,
        id: i
      }, I = w(T), R = Gi(
        (x) => {
          m(
            x.next.state !== "inactive" && x.next.hitRegions.some(
              (U) => U.separator === T
            ) ? x.next.state : "inactive"
          );
        }
      ), A = hn(
        S,
        (x) => {
          const { derivedPanelConstraints: U, layout: ee, separatorToPanels: Y } = x.next, re = Y.get(T);
          if (re) {
            const H = re[0], K = re.indexOf(H);
            d(
              yc({
                layout: ee,
                panelConstraints: U,
                panelId: H.id,
                panelIndex: K
              })
            );
          }
        }
      );
      return () => {
        R(), A(), I();
      };
    }
  }, [S, i, w, l]), F(() => {
    L(i, { disabled: n, disableDoubleClick: r });
  }, [n, r, i, L]);
  let D;
  n && !P && (D = "not-allowed");
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
        p ? _ = "focus" : _ = f;
    }
  return /* @__PURE__ */ y(
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
      "data-separator": _,
      "data-testid": i,
      id: i,
      onBlur: () => h(!1),
      onFocus: () => h(!0),
      ref: b,
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
oo.displayName = "Separator";
const wn = 30, Pn = 65, it = 50, vc = 100 - Pn, Sc = 100 - wn;
function wc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Pn, Math.max(wn, t)) : it;
}
function Rn(e) {
  return 100 - e;
}
function $e(e) {
  return `${e}%`;
}
const Tn = "reader-document", ct = "reader-assistant", ao = "retainpdf.reader.ai-split-layout.v1", Pc = {
  [Tn]: Rn(it),
  [ct]: it
};
function In(e) {
  const t = wc(e == null ? void 0 : e[ct]);
  return {
    [Tn]: Rn(t),
    [ct]: t
  };
}
function Rc() {
  try {
    const e = JSON.parse(localStorage.getItem(ao) || "null");
    return In(e);
  } catch {
    return Pc;
  }
}
function Tc(e) {
  try {
    localStorage.setItem(ao, JSON.stringify(In(e)));
  } catch {
  }
}
function Ft(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = In(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[ct]}vw`
  );
}
function Ic() {
  const e = k(null), [t] = C(Rc);
  ze(() => {
    const o = e.current;
    return Ft(o, t), () => {
      var a;
      (a = o == null ? void 0 : o.closest(".reader-react-root")) == null || a.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = O((o) => {
    Ft(e.current, o);
  }, []), r = O((o, a) => {
    Ft(e.current, o), a.isUserInteraction && Tc(o);
  }, []);
  return /* @__PURE__ */ j(
    ro,
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
            id: Tn,
            defaultSize: $e(Rn(it)),
            minSize: $e(vc),
            maxSize: $e(Sc)
          }
        ),
        /* @__PURE__ */ y(
          oo,
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
            id: ct,
            defaultSize: $e(it),
            minSize: $e(wn),
            maxSize: $e(Pn)
          }
        )
      ]
    }
  );
}
function Ec({
  id: e,
  open: t,
  ariaLabel: n,
  className: r = "",
  keepMounted: o = !1,
  onClose: a,
  toolbar: s,
  children: c
}) {
  return F(() => {
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
        s ? /* @__PURE__ */ y("div", { className: "reader-notes-panel-toolbar", children: s }) : null,
        /* @__PURE__ */ y("div", { className: "reader-notes-panel-body", children: c })
      ]
    }
  );
}
function Mc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = C(!1);
  if (F(() => {
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
function Ac({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ y(Mc, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ j(en, { children: [
    e ? /* @__PURE__ */ y("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ j("div", { className: "reader-boot-loading-card", children: [
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
function kc(e) {
  if (e.selectionType !== "region") return null;
  const t = `${e.region.source.text || ""}`.trim(), n = `${e.region.translated.text || ""}`.trim();
  return !t || !n || t === n ? null : { source: t, translated: n };
}
function Lc(e, t) {
  const n = e.selectionType === "text" ? "text" : e.kind, r = kc(e), o = r != null, a = o && t ? t : e.pane, s = r ? r[a] : e.selectionType === "text" ? e.quote : Rt(e.region, a), c = e.selectionType === "region" ? $t(e.region, a).page : e.page;
  return {
    kind: n,
    pane: a,
    page: c,
    text: s,
    copyValue: n === "formula" ? Mo(s) : s,
    canSwitch: o,
    showPeek: o && a !== e.pane
  };
}
const lr = {
  source: "原文",
  translated: "译文"
}, ur = 190, dr = 16;
function Cc() {
  const e = typeof window > "u" ? 800 : window.innerWidth;
  if (typeof document > "u") return e;
  const t = document.querySelector(`.${Pr}`), n = (t == null ? void 0 : t.getBoundingClientRect().width) ?? 0;
  return n > 0 ? n : e;
}
function _c(e, t) {
  const n = dr + ur, r = t - dr - ur;
  return r < n ? t / 2 : Math.min(Math.max(n, e), r);
}
async function Nc(e) {
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
function xc({
  selection: e,
  onDismiss: t,
  onAskAi: n
}) {
  const [r, o] = C(!1), [a, s] = C(null), c = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if (F(() => s(null), [c]), F(() => o(!1), [c, a]), !e)
    return null;
  const i = Lc(e, a), l = typeof window < "u" ? window.innerHeight : 600, u = e.rect.left + e.rect.width / 2, d = _c(u, Cc()), f = e.rect.top > (i.showPeek ? 220 : 72), m = f ? Math.max(12, e.rect.top - 8) : Math.min(l - 12, e.rect.top + e.rect.height + 8), p = f ? "above" : "below", h = i.kind, v = h === "formula" ? "公式" : h === "table" ? "表格" : h === "figure" ? "图片" : h === "text" ? "文字" : "区域", b = i.copyValue, P = h === "formula" ? zo : h === "table" ? Do : h === "text" ? Oo : Fo;
  return /* @__PURE__ */ j(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${p} reader-sel-pop--region`,
      style: { left: d, top: m },
      role: "toolbar",
      "aria-label": "选区操作",
      onPointerDown: (S) => {
        S.preventDefault();
      },
      children: [
        /* @__PURE__ */ j("div", { className: "reader-sel-pop-card reader-floating-surface", children: [
          /* @__PURE__ */ j("div", { className: "reader-sel-pop-row", children: [
            /* @__PURE__ */ j("div", { className: "reader-sel-pop-context", children: [
              /* @__PURE__ */ y(P, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
              /* @__PURE__ */ y("span", { children: v }),
              /* @__PURE__ */ y("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
              i.canSwitch ? /* @__PURE__ */ y("span", { className: "reader-sel-pop-panes", role: "group", "aria-label": "看这段的原文或译文", children: ["source", "translated"].map((S) => /* @__PURE__ */ y(
                "button",
                {
                  type: "button",
                  className: `reader-sel-pop-pane${i.pane === S ? " is-active" : ""}`,
                  "aria-pressed": i.pane === S,
                  onClick: () => s(S),
                  children: lr[S]
                },
                S
              )) }) : (
                // 两侧拿不到各自的文本时不画开关 —— 画一个点了不动的按钮比没有更糟。
                /* @__PURE__ */ y("span", { children: lr[e.pane] })
              ),
              /* @__PURE__ */ y("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
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
                      await Nc(b), o(!0), window.setTimeout(() => o(!1), 1400);
                    } catch (S) {
                      console.warn("[reader-selection] copy failed", S);
                    }
                  },
                  children: [
                    r ? /* @__PURE__ */ y($o, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ y(jo, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                    /* @__PURE__ */ y("span", { children: r ? "已复制" : h === "formula" ? "复制 LaTeX" : "复制" })
                  ]
                }
              ) : /* @__PURE__ */ y("span", { className: "reader-sel-pop-selection-hint", children: "已选择图片" }),
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
                      /* @__PURE__ */ y(vr, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
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
                  children: /* @__PURE__ */ y(an, { size: 15, strokeWidth: 2.5, "aria-hidden": !0 })
                }
              )
            ] })
          ] }),
          i.showPeek ? (
            // 只在看「另一栏」时展开：看的就是页面上那一栏时再抄一遍是噪声。
            /* @__PURE__ */ y("p", { className: "reader-sel-pop-peek", "data-reader-peek-pane": i.pane, children: i.text })
          ) : null
        ] }),
        /* @__PURE__ */ y("span", { className: "reader-sel-pop-caret", "aria-hidden": "true" })
      ]
    }
  );
}
function zc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Dc() {
  const [e, t] = C(!1), n = mr(), r = k(null);
  return F(() => {
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
  }, [e]), F(() => {
    const o = (a) => {
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || zc(a.target)) return;
      const s = a.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !a.shiftKey)
          return;
        a.preventDefault(), t((c) => !c);
      }
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, []), /* @__PURE__ */ j("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
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
        children: /* @__PURE__ */ y(Uo, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
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
          /* @__PURE__ */ y("div", { className: "reader-react-shortcuts-body", children: Hs.map((o) => /* @__PURE__ */ j("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ y("h3", { children: o.title }),
            /* @__PURE__ */ y("ul", { children: o.items.map((a) => /* @__PURE__ */ j("li", { children: [
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
const Oc = ["source", "sideBySide", "translated"], Fc = { source: "", translated: "", sideBySide: "" };
function $c(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = yt(e.sourceUrl), n = yt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return oa({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function jc(e) {
  const [t, n] = C(() => /* @__PURE__ */ new Set()), r = Z(
    () => e ? $c(e) : Fc,
    [e]
  ), o = Z(
    () => Oc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = O(async (s) => {
    if (!e) return;
    const c = yt(r[s]);
    if (!(!c || t.has(s)))
      try {
        const i = e.jobId ? ra(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await aa(
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
        sa(l), n((u) => {
          const d = new Set(u);
          return d.delete(s), d;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const Uc = {
  source: gr,
  sideBySide: br,
  translated: yr
}, Bc = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function Hc(e) {
  const t = ut(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = jc(n);
  return /* @__PURE__ */ j("div", { className: "reader-download-actions", role: "group", "aria-label": "下载 PDF", children: [
    /* @__PURE__ */ y("span", { className: "reader-download-actions-prefix", "aria-hidden": !0, children: /* @__PURE__ */ y(Bo, { size: 14, strokeWidth: 2.2 }) }),
    o.map((c) => {
      const i = vo[c], l = yt(r[c]), u = a.has(c), d = !!l && !u, f = d ? "" : So(c, r), m = Uc[c];
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
                  /* @__PURE__ */ y(m, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
                  /* @__PURE__ */ y("span", { className: "reader-download-action-label", children: Bc[c] })
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
function Wc(e) {
  const t = ut(), n = Ii(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? lt, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), c = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, l = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), u = Ha(a), d = a > Tr + 1e-3, f = a < Ir - 1e-3, m = tt(), p = "50%（半屏，对照铺满）", [h, v] = C(!1), [b, P] = C(`${c}`);
  F(() => {
    h || P(`${Math.min(Math.max(c, 1), Math.max(i, 1))}`);
  }, [c, i, h]);
  const S = () => {
    if (v(!1), !l || i <= 0)
      return;
    const g = Number(`${b}`.trim());
    l(wt(g, i));
  };
  return /* @__PURE__ */ j("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    o ? /* @__PURE__ */ y("div", { className: "reader-react-hud-group reader-react-hud-modes", children: o }) : null,
    /* @__PURE__ */ y("div", { className: "reader-react-hud-group", "aria-label": "页码", children: h ? /* @__PURE__ */ j(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (g) => {
          g.preventDefault(), S();
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
              value: b,
              autoFocus: !0,
              onChange: (g) => P(g.target.value.replace(/[^\d]/g, "")),
              onBlur: S,
              onKeyDown: (g) => {
                g.key === "Escape" && (g.preventDefault(), v(!1), P(`${c}`));
              }
            }
          ),
          /* @__PURE__ */ j("span", { className: "reader-react-hud-page-suffix", children: [
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
          !l || i <= 0 || (P(`${c}`), v(!0));
        },
        children: i > 0 ? `${Math.min(c, i)} / ${i}` : "—"
      }
    ) }),
    /* @__PURE__ */ j("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ y(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "缩小",
          disabled: !d,
          onClick: () => s(at(a, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ j(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn reader-react-hud-zoom-label",
          "aria-label": `重置为${p}`,
          title: p,
          onClick: () => s(m),
          children: [
            u,
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
          onClick: () => s(at(a, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ y("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ y(Dc, {}) })
  ] });
}
function fr(e) {
  var t, n;
  return Ar(e == null ? void 0 : e.assistantPanel) ? e.assistantPanel : ((t = e == null ? void 0 : e.splitLayout) == null ? void 0 : t.left) === "markdown" || ((n = e == null ? void 0 : e.splitLayout) == null ? void 0 : n.right) === "markdown" ? "markdown" : null;
}
function Jc(e) {
  const [t, n] = C(() => ({
    scope: e,
    panel: fr(Te(e))
  }));
  F(() => {
    n((o) => o.scope === e ? o : {
      scope: e,
      panel: fr(Te(e))
    });
  }, [e]), F(() => {
    t.scope === e && Et(t.scope, {
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
const Qt = "download-toast";
function Vc({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: o = "progress"
}) {
  const a = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ j("div", { className: "download-toast-card reader-floating-surface", "data-tone": o, "aria-live": "polite", children: [
    /* @__PURE__ */ j("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ y("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ y("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ y("div", { className: "download-toast-track", children: /* @__PURE__ */ y("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${a}%` } }) }),
    /* @__PURE__ */ y("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function qc(e = {}) {
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
    () => /* @__PURE__ */ y(Vc, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: Qt, duration: 1 / 0 }
  );
}
function Kc() {
  const e = O((t) => {
    t && (t.setState = qc, t.hide = () => jt.dismiss(Qt));
  }, []);
  return /* @__PURE__ */ j(en, { children: [
    /* @__PURE__ */ y(Co, { position: "bottom-right" }),
    /* @__PURE__ */ y("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function so(e) {
  const t = k(!1);
  return e && (t.current = !0), t.current;
}
function Gc(e, t) {
  const n = e === t;
  return { open: n, mounted: so(n) };
}
function Zc({
  panel: e,
  active: t,
  context: n
}) {
  var i;
  const r = t === e.id, o = so(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = he(), c = (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, { ...n, open: r });
  return c == null ? null : /* @__PURE__ */ y(
    Ec,
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
const Yc = ho(() => import("./ReaderMarkdownPanel-CdZAP2Wk.js").then((e) => ({ default: e.ReaderMarkdownPanel })));
function Xc(e) {
  const t = e.sourceOnly || !e.translatedUrl, n = !!(e.overlayContentAvailable && e.liveTranslationVisible && !e.assistantOpen), o = e.assistantPdfPane || (e.assistantOpen && e.mode === "compare" ? "source" : e.mode), a = !t && (o === "translated" || o === "compare"), s = o === "compare" && a, c = n || o !== "translated" || !a, i = e.mode === "compare" && o !== "compare";
  return {
    kind: n ? "live-overlay" : o === "compare" ? "final-compare" : o === "translated" ? "translated-only" : "source-only",
    visibleMode: o,
    compareMode: s,
    showSource: c,
    showTranslated: a,
    overlayOnSource: n,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: t,
    compareDegradedByAssistant: i
  };
}
function Qc(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function el() {
  const e = Us(), { boot: t, panes: n, sessionFiles: r, session: o } = e, a = Jc(e.viewStateKey), s = a.panel, c = a.setPanel, [i, l] = C(null), [u, d] = C(null), [f, m] = C(null), [p, h] = C(!1), v = k(null), b = s !== null, P = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, S = Xc({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: P,
    liveTranslationVisible: p,
    assistantOpen: b,
    assistantPdfPane: i
  }), g = O(() => m(null), []), w = f ? go({ jobId: o.jobId, name: f, onClose: g }) : null, L = Ns({
    hasOverlayContent: P,
    connection: e.liveTranslation.connection,
    showSource: S.showSource,
    liveTranslationVisible: p,
    assistantOpen: b
  }), E = S.sourceViewOnly, D = S.visibleMode;
  F(() => {
    d(null), m(null), h(!1);
  }, [e.viewStateKey]), F(() => {
    e.session.jobTerminal && h(!1);
  }, [e.session.jobTerminal]), F(() => {
    l(null);
  }, [a.scope]), F(() => {
    if (!(t.loading || t.failed)) {
      if (v.current !== e.viewStateKey) {
        v.current = e.viewStateKey;
        const H = Te(e.viewStateKey), K = E ? "source" : H == null ? void 0 : H.mode;
        K && K !== e.mode && e.setModeKeepingPage(K);
        return;
      }
      Et(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, E]);
  const _ = s || (e.mode === "compare" ? "compare" : "reading"), N = Gc(s, "markdown");
  Vs({
    mode: D,
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
    c(null), l(null), d(null);
  }, []), I = O((H) => {
    l(null);
    const K = Qc(H, e.liveTranslationAvailable);
    K !== null && h(K), e.setModeKeepingPage(H);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), R = Z(() => L.sourcePaneToggle ? /* @__PURE__ */ y(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${p ? " is-active" : ""}`,
      onClick: () => h((H) => !H),
      "aria-pressed": p,
      title: p ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ) : null, [L.sourcePaneToggle, p]), A = O((H) => {
    c(H), l(null);
  }, []), x = Z(() => ({
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
    pendingInput: u,
    onOpenBoard: m,
    onClose: T
  }), [T, o.documentId, o.jobId, u]), U = O((H) => {
    const K = H.pane === "translated" && !E ? "translated" : "source", ie = Ao(H);
    d((M) => ({ text: ie, token: ((M == null ? void 0 : M.token) ?? 0) + 1 })), c("terminal"), l(K), e.clearSelection();
  }, [e.clearSelection, E]), ee = Z(() => ({
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
    assistant: { select: A, close: T }
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
    A,
    T
  ]), Y = Z(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), re = [
    Da,
    `is-workspace-${_}`,
    b ? "is-assistant-open" : "",
    S.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ y(Ti, { value: ee, hud: Y, children: /* @__PURE__ */ j("div", { className: re, "data-reader-engine": "react-pdf", "data-reader-workspace": _, children: [
    /* @__PURE__ */ y(Ac, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ j("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ y(Hc, {}),
      /* @__PURE__ */ y(Xs, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ y(
      Ni,
      {
        mode: D,
        documentReady: !!o.jobId,
        sourceViewOnly: E,
        onModeChange: I,
        liveTranslation: L.topBarPill ? {
          visible: p,
          state: e.liveTranslation,
          onToggle: () => h((H) => !H)
        } : null,
        compareDegraded: S.compareDegradedByAssistant,
        onRestoreCompare: T
      }
    ),
    /* @__PURE__ */ y($i, { active: s }),
    b ? /* @__PURE__ */ y(Ic, {}) : null,
    /* @__PURE__ */ y(ki, { paneComposition: S, markdownSplit: N.open, assistantSplit: b, liveTranslation: e.liveTranslation, sourcePaneAction: R }),
    w,
    e.showHud ? /* @__PURE__ */ y(
      Wc,
      {
        mode: D,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ j(po, { fallback: null, children: [
      Ur.map((H) => /* @__PURE__ */ y(
        Zc,
        {
          panel: H,
          active: s,
          context: x
        },
        H.id
      )),
      N.mounted ? /* @__PURE__ */ y(Yc, { open: N.open, jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: T }) : null
    ] }),
    /* @__PURE__ */ y(xc, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: U }),
    /* @__PURE__ */ y(Kc, {})
  ] }) });
}
function bl() {
  return /* @__PURE__ */ y(el, {});
}
export {
  bl as R,
  el as a,
  Ec as b,
  hl as d,
  pl as f,
  gl as r
};
//# sourceMappingURL=ReaderApp-DG2pNyLh.js.map
