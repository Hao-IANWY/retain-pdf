var Mn = (e) => {
  throw TypeError(e);
};
var An = (e, t, n) => t.has(e) || Mn("Cannot " + n);
var Ze = (e, t, n) => (An(e, t, "read from private field"), n ? n.call(e) : t.get(e)), kn = (e, t, n) => t.has(e) ? Mn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Ln = (e, t, n, r) => (An(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as j, jsx as y, Fragment as tn } from "react/jsx-runtime";
import { useMemo as X, useState as C, useEffect as F, useCallback as O, useRef as k, useLayoutEffect as De, memo as nn, forwardRef as po, useImperativeHandle as rn, createContext as on, useContext as an, useSyncExternalStore as go, useId as hr, Suspense as bo, lazy as yo } from "react";
import { requireAdapter as Je, getReaderAdapters as pe, renderReaderBoardSlot as vo } from "./adapters.js";
import { resolveReaderDownloadName as So, resolveReaderDownloadUrls as wo, READER_PROGRESS_COPY as Pe, trimString as yt, READER_DOWNLOAD_ACTIONS as Po, disabledReason as Ro } from "./runtime/state.js";
import "@retainpdf/api/conversations";
import { r as To, b as Io } from "./page-config-Ct7qR5rm.js";
import { c as Eo, n as Mo, f as kt, k as $t, a as Ao, b as ko, i as pr, p as Rt, h as vt, r as gr, d as br, l as Cn, e as Lo, j as Co } from "./reader-regions-Bwkgm0OU.js";
import { isReaderTransportError as _o, createReaderTransportError as No } from "./contracts.js";
import { toast as jt, Toaster as xo } from "sonner";
import { X as sn, Radio as Do, FileText as yr, Columns2 as vr, Languages as Sr, PanelRightClose as zo, FileCode2 as Oo, Sparkles as wr, Sigma as Fo, Table2 as $o, Type as jo, Image as Uo, Check as Bo, Copy as Ho, Keyboard as Wo, Download as Vo } from "lucide-react";
import { pdfjs as Jo, Page as qo, Document as Ko } from "react-pdf";
import { e as Go, m as Zo, a as Yo } from "./markdown-math-XkF5urpn.js";
const Xo = (...e) => {
  var t, n;
  return ((n = (t = pe()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, Qo = "", ea = Object.freeze({
  progress: "retainpdf-reader-progress"
}), ta = (e) => {
  var t, n;
  return ((n = (t = pe()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, vl = (...e) => {
  var n;
  return (((n = pe()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Ee = () => Je("defaultReaderDataPort"), _n = () => Je("defaultReaderPageConfigPort"), Sl = {
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
}, Pr = {
  messageTargetOrigin: () => _n().messageTargetOrigin(),
  readerJobId: () => _n().readerJobId()
}, na = () => {
  var e;
  return ((e = pe()) == null ? void 0 : e.liveTranslation) ?? null;
}, rt = () => {
  var t;
  const e = pe();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, cn = () => {
  const e = pe();
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
}, ra = (...e) => {
  var t, n;
  return ((n = (t = pe()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, oa = () => {
  var e, t;
  return ((t = (e = pe()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, aa = (...e) => {
  var t, n;
  return ((n = (t = pe()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, sa = (...e) => {
  var t, n;
  return ((n = (t = pe()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? So(...e);
}, ia = (...e) => {
  var t, n;
  return ((n = (t = pe()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? wo(...e);
}, ca = (...e) => Je("downloadProtectedResource")(...e), la = (...e) => Je("failDownloadToast")(...e), wl = (e, t) => Je("resolveMarkdownAssetUrl")(e, t), ua = "/api/v1";
function da() {
  const e = () => {
    var r;
    return To(
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
function fa() {
  const e = da(), t = X(() => aa(Pr), [e]), n = X(() => oa(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function ma(e) {
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
  }), f = i.documentId === t ? i.jobId : "", m = u.documentId === t ? u.jobId : "", h = n || f, [p, v] = C({
    jobId: "",
    documentId: ""
  }), b = p.jobId === h ? p.documentId : "", P = t || b, S = !!t && !h, [g, w] = C(null), L = (g == null ? void 0 : g.sessionIdentity) === r && g.documentId === P ? g : null, E = S || !!L, z = O((N) => {
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
    sessionJobId: h,
    resolvedJobDocument: p,
    setResolvedJobDocument: v,
    jobDocumentId: b,
    documentId: P,
    sourceOnly: S,
    committedDocumentSource: g,
    setCommittedDocumentSource: w,
    activeCommittedDocumentSource: L,
    sourceViewOnly: E,
    refreshCommittedDocument: z,
    applyIdentityEvent: _
  };
}
const ha = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Nn(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function pa(e) {
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
function xn(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return ta(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function ga(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function ba(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !ga(a, t))
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
        type: ea.progress,
        stage: n,
        percent: e,
        text: t
      },
      Pr.messageTargetOrigin()
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
  }), Ut({ percent: t, text: n, stage: r });
}
function ya(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [c, i] = C(null), [l, u] = C(null), [d, f] = C(""), [m, h] = C(0), p = d === n ? c : null, v = d === n ? l : null, b = Nn(p), P = ha.has(b), S = O(() => {
    h((_) => _ + 1);
  }, []), g = O((_) => {
    i(_.jobPayload), u(_.manifestPayload), f(_.sessionIdentity);
  }, []), w = O((_) => {
    i(null), u(null), f(_);
  }, []), L = k(""), E = k(""), z = O(async () => {
    const _ = o.current;
    if (!_ || L.current === _) return;
    const N = cn().loadJobPayload;
    if (typeof N != "function") return;
    const T = a.current.value;
    L.current = _;
    try {
      const I = await N(_);
      if (s.current || a.current.value !== T || o.current !== _ || !I || typeof I != "object")
        return;
      const R = Nn(I);
      i(I), f(r.current), R === "succeeded" && E.current !== _ && (E.current = _, h((A) => A + 1));
    } catch {
    } finally {
      L.current === _ && (L.current = "");
    }
  }, []);
  return F(() => {
    E.current = "";
  }, [n]), F(() => {
    if (!t || P || !p) return;
    const _ = window.setInterval(() => {
      z();
    }, 1e3);
    return () => window.clearInterval(_);
  }, [P, z, p, t]), {
    jobPayload: c,
    setJobPayload: i,
    manifestPayload: l,
    setManifestPayload: u,
    payloadSessionIdentity: d,
    setPayloadSessionIdentity: f,
    scopedJobPayload: p,
    scopedManifestPayload: v,
    jobStatus: b,
    jobTerminal: P,
    jobRefreshRevision: m,
    refreshJobArtifacts: S,
    refreshJobStatus: z,
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
function va(e, t) {
  e(t), Bt(t);
}
function Sa(e) {
  const [t, n] = C(e ? "source" : "compare"), r = O((a) => {
    e && a !== "source" || (n(a), Bt(a));
  }, [e]), o = O((a) => {
    va(n, a);
  }, []);
  return F(() => (e && document.documentElement.classList.add("reader-source-only"), Bt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: o };
}
function Dn(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function wa(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: Dn(n.active_job_id),
    activeVersionId: Dn(n.active_version_id)
  };
}
function Pa(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function Ra(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function Ta(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function Ia(e) {
  return e ? { data: e.data.slice() } : null;
}
const Ea = 2, ye = /* @__PURE__ */ new Map();
function Ht(e, t) {
  ye.delete(e), ye.set(e, t);
}
function Ma(e) {
  if (ye.size < Ea) return;
  const t = ye.keys().next().value;
  t && ye.delete(t);
}
function Lt(e) {
  const t = `${e || ""}`.trim();
  if (!t || !ye.has(t)) return null;
  const n = ye.get(t);
  return Ht(t, n), n;
}
async function Rr(e, t = rt().fetchProtected, n = {}) {
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
  return ye.has(r) ? Ht(r, s) : (Ma(), ye.set(r, s)), s;
}
function Aa(e = "", t = null) {
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
    return a(!0), c(""), r(null), Rr(i).then((d) => {
      u || (r(d), a(!1));
    }).catch((d) => {
      u || (r(null), a(!1), c((d == null ? void 0 : d.message) || String(d)));
    }), () => {
      u = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function ka(e) {
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
  const c = await Rr(t, rt().fetchProtected, {
    signal: a.signal
  });
  return a.isInactive() ? null : (St(s, o, n, "download"), c);
}
async function La(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: o } = e;
  St(o, 25, "正在下载 PDF…", "download");
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
function Ca(e) {
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
    jobRefreshRevision: h,
    sessionEpochRef: p,
    closingRef: v,
    activeLoadAbortRef: b
  } = e, [P, S] = C(""), [g, w] = C(""), [L, E] = C(null), [z, _] = C(null), [N, T] = C(!1), [I, R] = C(""), [A, x] = C([]), [U, te] = C(() => ({
    source: null,
    translated: null
  })), [J, re] = C(
    mt
  ), [H, Z] = C({
    loading: !0,
    percent: 4,
    text: Pe.boot,
    stage: "progress",
    failed: !1
  });
  return F(() => {
    const ue = new AbortController(), M = p.current.value, $ = ka({
      sessionEpochRef: p,
      closingRef: v,
      abort: ue,
      sessionEpoch: M
    });
    b.current = ue;
    const B = cn();
    if (v.current)
      return ue.abort(), () => {
        b.current === ue && (b.current = null);
      };
    function W(oe, ne) {
      $.markFailed(), Z({
        loading: !1,
        percent: 100,
        text: oe,
        stage: "failed",
        failed: !0
      }), Ut({ percent: 100, text: ne, stage: "failed" });
    }
    function q() {
      T(!0), Z({
        loading: !1,
        percent: 100,
        text: Pe.ready,
        stage: "ready",
        failed: !1
      }), Ut({ percent: 100, text: Pe.ready, stage: "ready" });
    }
    function se() {
      return l != null && l.documentId ? xn(
        l.documentId,
        l.revision
      ) : Xo() ? Qo : B.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function ae() {
      let oe = { activeJobId: "", activeVersionId: "" };
      try {
        const ge = await B.fetchProtected(
          B.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (ge != null && ge.ok) {
          const ke = await ge.json().catch(() => null);
          oe = wa(ke);
        }
      } catch {
      }
      const ne = Pa({
        link: oe,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!l
      });
      if (ne.kind === "follow-active-job") {
        if ($.isInactive()) return;
        u({
          type: "resolved-document-job",
          documentId: r,
          jobId: ne.jobId
        }), ne.activeVersionId ? (l || u({
          type: "committed-source",
          documentId: r,
          revision: ne.activeVersionId,
          sessionIdentity: i
        }), m("source")) : m("compare");
        return;
      }
      if (ne.kind === "open-committed-source") {
        if ($.isInactive()) return;
        u({
          type: "committed-source",
          documentId: r,
          revision: ne.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const ie = se();
      if ($.isInactive()) return;
      S(ie), w(""), R(""), f(i);
      const me = await Wt({
        url: ie,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: $,
        setBoot: Z
      });
      if (!$.isInactive()) {
        if (!me) {
          W("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        E(me), q();
      }
    }
    async function ce() {
      var Le;
      const oe = await ((Le = B.loadSessionSnapshot) == null ? void 0 : Le.call(B, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: l,
        includeOptionalArtifacts: !l
      })), ne = oe ? {
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
      let ie = null;
      if (n && !r) {
        try {
          ie = await B.fetchDocumentByJobId(ua, t);
        } catch {
        }
        if ($.isInactive()) return;
      }
      const me = pa(ne.jobPayload) || `${(ie == null ? void 0 : ie.document_id) || ""}`.trim();
      me && !r && u({
        type: "resolved-job-document",
        jobId: t,
        documentId: me
      });
      const ge = Ra({
        payloadDocumentId: me,
        linkedActiveJobId: `${(ie == null ? void 0 : ie.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(ie == null ? void 0 : ie.active_version_id) || ""}`.trim(),
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
      const ke = B.resolveReaderSourcePdf(ne.manifestPayload), ft = B.resolveReaderTranslatedPdfUrl(ne.jobPayload, ne.manifestPayload), Mt = typeof ke == "string" ? ke : B.resolveReaderArtifactUrl(ke), qe = r || me, Ke = l != null && l.documentId ? xn(
        l.documentId,
        l.revision
      ) : Mt || (qe ? B.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(qe)}/source.pdf`) : ""), Ge = l ? "" : ft || "";
      if (S(Ke || ""), w(Ge), R(ba(ne.jobPayload, t)), d({
        jobPayload: ne.jobPayload || null,
        manifestPayload: ne.manifestPayload || null,
        sessionIdentity: i
      }), x(l ? [] : Eo(ne.regionsPayload)), te(l ? { source: null, translated: null } : Mo(ne.readerMetadata)), re(l ? mt : ne.readerErrors ?? mt), !Ke && !Ge) {
        W(Pe.failed, Pe.failed);
        return;
      }
      const ve = await La({
        sourceFinal: Ke || "",
        translatedFinal: Ge,
        fence: $,
        setBoot: Z
      });
      if (ve.status !== "inactive") {
        if (ve.status === "incomplete") {
          W("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        E(ve.sourceBytes), _(ve.translatedBytes), q();
      }
    }
    async function dt() {
      T(!1), E(null), _(null), x([]), te({ source: null, translated: null }), re(mt), St(Z, 8, Pe.metadata, "metadata");
      try {
        if (s) {
          await ae();
          return;
        }
        if (!t) {
          W(Pe.failed, Pe.failed);
          return;
        }
        await ce();
      } catch (oe) {
        if ($.isClosedOrStale() || (oe == null ? void 0 : oe.name) === "AbortError") return;
        $.markFailed();
        const ne = Number(oe == null ? void 0 : oe.status);
        if (Ta({
          status: ne,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          u({ type: "missing-document-job", documentId: r, jobId: t }), u({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const ie = oe instanceof Error ? oe.message : Pe.failed;
        W(ie, ie);
      }
    }
    return dt(), () => {
      ue.abort(), b.current === ue && (b.current = null);
    };
  }, [t, r, o, a, s, c, l, h, n, i, u, d, f, m]), {
    sourceUrl: P,
    translatedUrl: g,
    sourceFile: L,
    translatedFile: z,
    assetsReady: N,
    title: I,
    regions: A,
    readerMetadata: U,
    readerErrors: J,
    boot: H
  };
}
function _a() {
  const e = k(!1), t = k(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = fa(), s = k({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const c = k(a), i = k(""), l = k(""), u = k(() => {
  }), d = O(() => u.current(), []), f = ma({
    routeDocumentId: o,
    jobId: r,
    sessionIdentity: a,
    sessionIdentityRef: c,
    documentIdRef: i,
    sessionJobIdRef: l,
    switchToSourceMode: d
  }), {
    sessionJobId: m,
    documentId: h,
    sourceOnly: p,
    sourceViewOnly: v
  } = f, { mode: b, setMode: P, switchSessionMode: S } = Sa(v);
  u.current = () => {
    S("source");
  }, c.current = a, i.current = h, l.current = m;
  const g = ya({
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
    jobTerminal: z,
    jobRefreshRevision: _,
    refreshJobArtifacts: N,
    refreshJobStatus: T
  } = g, I = Ca({
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
  }, []), A = X(
    () => ({
      fetchProtected: cn().fetchProtected,
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
    jobTerminal: z,
    documentId: h,
    sessionIdentity: a,
    sourceOnly: p,
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
const Na = 160, xa = 8, Da = 0;
function za() {
  const e = k(null), [t, n] = C(null), [r, o] = C(Da), a = O((s) => {
    e.current = s, n(s);
  }, []);
  return F(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const c = (l) => {
      !Number.isFinite(l) || l < Na || o((u) => Math.abs(u - l) < xa ? u : l);
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
function Oa(e) {
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
function Fa(e, t) {
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
  })), [m, h] = C(() => ({ identity: l, tick: 0 })), p = d.identity === l ? d.pages : Ct, v = m.identity === l ? m.tick : 0, b = Oa({
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
      g.current = null, u.current === T && h((I) => ({
        identity: T,
        tick: I.identity === T ? I.tick + 1 : 1
      }));
    }, 60);
  }, [l]);
  F(() => (g.current && (clearTimeout(g.current), g.current = null), f((T) => T.identity === l && T.pages.source === 0 && T.pages.translated === 0 ? T : { identity: l, pages: { source: 0, translated: 0 } }), h((T) => T.identity === l && T.tick === 0 ? T : { identity: l, tick: 0 }), () => {
    g.current && (clearTimeout(g.current), g.current = null);
  }), [l]);
  const L = X(
    () => Math.max(p.source, p.translated),
    [p]
  ), E = P === "translated" ? p.translated : p.source || p.translated, z = t == null ? void 0 : t.userZoom, _ = t == null ? void 0 : t.shellWidth, N = `${l}-${v}-${z}-${n}-${p.source}-${p.translated}-${_}`;
  return {
    ...b,
    numPagesByPane: p,
    hudNumPages: L,
    primaryNumPages: E,
    metricsTick: v,
    onNumPages: S,
    onMetrics: w,
    rowSyncRevision: N
  };
}
const He = "data-reader-page", We = "data-reader-pane", ln = "data-natural-height", $a = "reader-react-root", ja = "reader-react-grid", Tr = "reader-react-scroll-shell", Ua = "reader-react-pdf-pane", Ir = "reader-react-pdf-page", wt = "reader-react-pdf-page-placeholder", un = "reader-react-pdf-page-slot";
function ot(e, t) {
  const n = e != null ? `[${He}="${e}"]` : `[${He}]`;
  return t ? `${n}[${We}="${t}"]` : n;
}
function Ba() {
  return `.${un}[${He}]`;
}
function Tt(e) {
  return Number(e.getAttribute(He));
}
const Er = 0.25, Mr = 1, Ha = 0.05, lt = 0.5, Wa = 16, Va = 8;
function tt(e) {
  return lt;
}
function It(e) {
  return Number.isFinite(e) ? Math.min(Mr, Math.max(Er, e)) : lt;
}
function at(e, t) {
  const n = It(Number(e) + t * Ha);
  return Math.round(n * 100) / 100;
}
function Ja(e) {
  return Math.round(It(e) * 100);
}
function qa(e) {
  const n = (Number(e) || 0) - Wa - Va;
  return Math.max(160, Math.floor(n));
}
function Ka(e, t = lt) {
  const n = It(t);
  return qa((Number(e) || 0) * n);
}
function Ga(e, t) {
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
const Za = 8;
function Ya(e, t) {
  return !Number.isFinite(e) || e < 80 || Math.abs(e - t) < Za ? "ignore" : !Number.isFinite(t) || t <= 0 ? "immediate" : "settle";
}
const Xa = 200, Ar = [
  "markdown"
], kr = [
  "terminal"
], Qa = [
  ...Ar,
  ...kr
];
function Lr(e) {
  return Qa.includes(e);
}
const es = "retainpdf:reader:view:v1:", zn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), ts = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function Cr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function Vt(e) {
  return `${e || ""}`.trim();
}
function ns({
  documentId: e,
  jobId: t
}) {
  const n = Vt(e);
  if (n) return `document:${n}`;
  const r = Vt(t);
  return r ? `job:${r}` : "";
}
function _r(e) {
  const t = Vt(e);
  return t ? `${es}${t}` : "";
}
function rs(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function os(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!zn.has(t) || !zn.has(n) || t === n))
    return { left: t, right: n };
}
function as(e) {
  return e === null ? null : Lr(e) ? e : void 0;
}
function ss(e) {
  return ts.has(e) ? e : void 0;
}
function Nr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = rs(t.anchor), r = Number(t.zoom), o = ss(t.mode), a = os(t.splitLayout), s = as(t.assistantPanel);
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
function Te(e, t = Cr()) {
  const n = _r(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Nr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function Et(e, t, n = Cr()) {
  const r = _r(e);
  if (!r || !n) return null;
  const o = Te(e, n), a = Nr({
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
function is(e, t, n = "") {
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
  return De(() => {
    const d = c.current;
    Math.abs(d - 1) < 1e-3 || (c.current = 1, Ga(t == null ? void 0 : t.current, d));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: l, resetZoom: u };
}
function cs(e, t = !0) {
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
      const p = e.current, v = (x = globalThis.getSelection) == null ? void 0 : x.call(globalThis);
      if (!p || !v || v.isCollapsed || !v.rangeCount) {
        r(null);
        return;
      }
      const b = v.getRangeAt(0);
      if (!p.contains(b.commonAncestorContainer)) {
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
      if (!g || !p.contains(g)) {
        r(null);
        return;
      }
      const w = Math.max(1, Math.floor(Tt(g) || 1)), E = g.getAttribute(We) === "translated" ? "translated" : "source", z = b.getClientRects(), _ = z[z.length - 1] || b.getBoundingClientRect();
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
    }, f = (p) => {
      p.key === "Escape" && o();
    }, m = () => {
      r((p) => p && null);
    };
    document.addEventListener("mouseup", i), document.addEventListener("pointerup", l), document.addEventListener("touchend", u), document.addEventListener("selectionchange", d), document.addEventListener("keyup", f);
    const h = a ?? e.current;
    return h == null || h.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", i), document.removeEventListener("pointerup", l), document.removeEventListener("touchend", u), document.removeEventListener("selectionchange", d), document.removeEventListener("keyup", f), h == null || h.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, a, o]), { selection: n, clearSelection: o };
}
function ls(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, o = k(t), a = k(n), s = k(r);
  return o.current = t, a.current = n, s.current = r, { setModeKeepingPage: O((i) => {
    i !== o.current && (s.current(), a.current(i));
  }, []) };
}
const dn = 48;
function xr(e, t = dn) {
  return e.getBoundingClientRect().top + t;
}
function Dr(e, t) {
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
function _t(e, t, n = dn) {
  if (!e)
    return null;
  const r = ot(void 0, t), o = Array.from(e.querySelectorAll(r));
  if (!o.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = xr(e, n), c = Dr(o, s);
  return c ? { page: c.page, fraction: c.fraction } : null;
}
function fn(e, t, n = "auto", r, o = dn) {
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
function us(e, t, n = "smooth", r) {
  return fn(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function Jt(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", o = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let a = !1, s = !1;
  const c = [], i = () => {
    var u;
    if (a) return;
    fn(
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
function ds(e, t, n) {
  return Jt(
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
function be(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function fs(e, t, n = !0, r = "", o) {
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
      const p = Array.from(c.querySelectorAll(d));
      if (!p.length)
        return;
      const v = xr(c), b = Dr(p, v);
      b && s(b.page);
    }, m = () => {
      i || (u && cancelAnimationFrame(u), u = requestAnimationFrame(() => {
        u = 0, f();
      }));
    }, h = () => {
      if (i) return;
      if (!Array.from(c.querySelectorAll(d)).length) {
        l = setTimeout(h, 120);
        return;
      }
      f(), c.addEventListener("scroll", m, { passive: !0 });
    };
    return h(), () => {
      i = !0, l && clearTimeout(l), u && cancelAnimationFrame(u), c.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, o]), a;
}
const ms = `canvas, .react-pdf__Page, .${Ir}, .${wt}`, On = /* @__PURE__ */ new WeakMap();
function hs(e) {
  const t = Number(e.getAttribute(ln));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = On.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(ms), On.set(e, n)), n) {
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
function gs(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(Ba()).forEach((r) => {
    const o = Tt(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = hs(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function bs(e, t, n = "", r) {
  const [o, a] = C(() => /* @__PURE__ */ new Map()), s = k(o), c = k(r);
  return c.current = r, De(() => {
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
      const g = gs(S);
      ps(s.current, g) || (s.current = g, a(g)), u && !d && (d = !0, (w = c.current) == null || w.call(c));
    }, m = () => {
      cancelAnimationFrame(l), l = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const h = window.setTimeout(m, 100), p = window.setTimeout(() => {
      u = !0, m();
    }, 300), v = window.setTimeout(m, 700), b = e.current;
    let P = null;
    return b && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => m()), P.observe(b)), () => {
      i = !0, cancelAnimationFrame(l), window.clearTimeout(h), window.clearTimeout(p), window.clearTimeout(v), P == null || P.disconnect();
    };
  }, [e, t, n]), o;
}
const ys = [0, 48, 140, 320, 560], vs = 700, Ss = [80, 200, 400], ws = 500, Ps = 50, Rs = /* @__PURE__ */ new Set([
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
]), Ts = 180, Fn = [0, 48, 140, 320, 700, 1200];
function Is(e, t) {
  var I;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, c = k(
    ((I = Te(a)) == null ? void 0 : I.anchor) || { page: 1, fraction: 0 }
  ), i = k(null), l = k(!1), u = k(r), d = k(null), f = k(null), m = k(null), h = k(null), p = k(a), v = k(""), b = k(n);
  b.current = n;
  const P = O(() => {
    var R;
    (R = d.current) == null || R.call(d), d.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), S = O(() => {
    !l.current && i.current == null || (P(), m.current != null && (clearTimeout(m.current), m.current = null), i.current = null, l.current = !1);
  }, [P]), g = O((R = !1) => {
    h.current != null && (clearTimeout(h.current), h.current = null);
    const A = () => {
      h.current = null, Et(p.current, {
        anchor: be(c.current)
      });
    };
    R ? A() : h.current = setTimeout(A, Ts);
  }, []), w = O((R) => {
    c.current = be(R), i.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, l.current = !1;
    }, Ps);
  }, []);
  F(() => {
    if (!o)
      return;
    let R = !1, A = null, x = null, U = null;
    const te = () => {
      if (R) return;
      const J = e.current;
      if (!J) {
        U = setTimeout(te, 50);
        return;
      }
      A = J, x = () => {
        if (l.current)
          return;
        const re = _t(A, b.current);
        re && (c.current = re, g());
      }, A.addEventListener("scroll", x, { passive: !0 }), l.current || x();
    };
    return te(), () => {
      R = !0, U != null && clearTimeout(U), A && x && A.removeEventListener("scroll", x);
    };
  }, [o, r, n, e, g]), F(() => {
    if (!o) return;
    const R = e.current;
    if (!R) return;
    const A = (x) => {
      x.metaKey || x.ctrlKey || x.altKey || Rs.has(x.key) && S();
    };
    return R.addEventListener("wheel", S, { passive: !0 }), R.addEventListener("touchmove", S, { passive: !0 }), window.addEventListener("keydown", A), () => {
      R.removeEventListener("wheel", S), R.removeEventListener("touchmove", S), window.removeEventListener("keydown", A);
    };
  }, [o, e, S]), De(() => {
    var A;
    if (p.current === a) return;
    g(!0), P(), m.current != null && (clearTimeout(m.current), m.current = null), p.current = a, v.current = "";
    const R = (A = Te(a)) == null ? void 0 : A.anchor;
    c.current = R ? be(R) : { page: 1, fraction: 0 }, i.current = null, l.current = !!a, u.current = r;
  }, [a, r, g, P]), F(() => {
    var A;
    if (!o || !s || !a || v.current === a) return;
    v.current = a;
    const R = be(
      ((A = Te(a)) == null ? void 0 : A.anchor) || { page: 1, fraction: 0 }
    );
    return c.current = R, i.current = R, l.current = !0, P(), d.current = Jt(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: b.current,
        delaysMs: Fn,
        onDone: () => w(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, w(R);
    }, Math.max(...Fn) + 160), () => P();
  }, [o, s, a, e, w, P]), F(() => {
    if (u.current === r)
      return;
    if (u.current = r, !o) {
      l.current = !1, i.current = null, P();
      return;
    }
    const R = i.current ? be(i.current) : be(c.current);
    return l.current = !0, i.current = R, c.current = R, P(), d.current = Jt(
      () => e.current,
      R,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: ys,
        onDone: () => w(R)
      }
    ), f.current = setTimeout(() => {
      f.current = null, w(R);
    }, vs), () => {
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
  }, [e, g]), z = O((R, A, x) => {
    const U = x || b.current, te = Pt(R, A || 1), J = { page: te, fraction: 0 };
    c.current = J, l.current = !0, i.current = J, g(), P(), us(e.current, te, "smooth", U), d.current = ds(
      () => e.current,
      te,
      {
        behavior: "auto",
        pane: U,
        delaysMs: Ss,
        onDone: () => w(J)
      }
    ), f.current = setTimeout(() => {
      f.current = null, w(J);
    }, ws);
  }, [e, w, P, g]), _ = O(() => be(c.current), []), N = O(() => l.current, []), T = O(() => {
    if (!l.current || !i.current)
      return;
    const R = be(i.current);
    fn(
      e.current,
      R,
      "auto",
      b.current
    );
  }, [e]);
  return {
    lockFromShell: L,
    beginModeSwitch: E,
    goToPage: z,
    getAnchor: _,
    isRestoring: N,
    repinIfRestoring: T
  };
}
function Es(e, t) {
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
function zr(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), o = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), a = `j:${r}:d:${o}`;
  return t == null ? `${a}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${a}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const Ms = [0, 80, 200, 400, 800], As = 120, ks = 400;
function Ls(e, t, n) {
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
    const h = ra(), p = Es(h, d.current), v = zr(h, p, { jobId: i, documentId: l });
    if (t.current === v)
      return;
    if (p == null) {
      t.current = v, (S = m.current) == null || S.call(m);
      return;
    }
    t.current = v, h && ((g = f.current) == null || g.call(f, h, p));
    const b = [];
    let P = 0;
    for (const w of Ms)
      P = Math.max(P, w), b.push(
        setTimeout(() => {
          u.current(p);
        }, w)
      );
    return b.push(
      setTimeout(() => {
        var w;
        (w = m.current) == null || w.call(m);
      }, P + As)
    ), () => {
      for (const w of b) clearTimeout(w);
    };
  }, [r, o, i, l, t]);
}
function Cs(e) {
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
    syncDebounceMs: s = ks,
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
      const h = ((b = globalThis.location) == null ? void 0 : b.search) || "", p = Io(h, o, u.current);
      if (f.current = o, p === null) return;
      const v = `${new URLSearchParams(p).get("block_id") || ""}`.trim();
      t.current = zr(
        { blockId: v },
        o,
        { jobId: c, documentId: i }
      ), (d.current || Cs)(p);
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
function Ns(e) {
  const t = k(""), [n, r] = C(!1), o = O(() => r(!0), []), a = {
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
const Ye = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function xs(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function $n(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function Or(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = $n(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const o = $n(n, e);
  return o < 0 || o === 0 && n.page_hash === e.pageHash ? "ignore" : "accept";
}
function Ds(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), o = Or(r, t, n);
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
function zs(e) {
  const { hasOverlayContent: t, connection: n, showSource: r } = e;
  return {
    topBarPill: t && n !== "terminal",
    sourcePaneToggle: t && r,
    // 和 resolveReaderPaneComposition 的 overlayOnSource 同一套条件，外加
    // 「源文栏得在台面上」——否则叠层没有落脚的地方。
    overlayRenderable: t && r && e.liveTranslationVisible && !e.assistantOpen
  };
}
const jn = [250, 500, 1e3, 2e3, 4e3], Nt = [80, 160, 320, 640, 1e3, 1500], Un = [250, 500, 1e3, 2e3, 4e3, 5e3], Os = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
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
function mn(e) {
  return _o(e) ? `${e.code || ""}`.trim() : "";
}
function ht(e, t) {
  const n = mn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Fs(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if (Or(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = No(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (i) {
      if ((i == null ? void 0 : i.name) === "AbortError") throw i;
      a = i;
      const l = mn(i);
      if (l && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(l)) throw i;
    }
    const c = Nt[Math.min(s, Nt.length - 1)];
    if (await qt(c, r), s >= Nt.length + 2) throw a;
  }
}
function $s({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = C(Ye), s = k(o), c = k("");
  s.current = o;
  const i = `${e || ""}`.trim(), l = `${t || ""}`.trim().toLowerCase(), u = Os.has(l) ? l : "";
  return F(() => {
    if (!n || !i) {
      c.current = "", s.current = Ye, a(Ye);
      return;
    }
    const d = r === void 0 ? na() : r, f = c.current === i;
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
    let h = !1;
    const p = {
      ...f ? s.current : Ye,
      connection: u ? "terminal" : "connecting",
      jobStatus: l,
      error: ""
    };
    s.current = p, a(p);
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
          h = !0, v((w) => ({
            ...w,
            layoutByPage: xs(g),
            jobStatus: l,
            error: ""
          }));
          return;
        } catch (g) {
          if ((g == null ? void 0 : g.name) === "AbortError") return;
          const w = mn(g);
          if (!(w === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !w)) {
            v((E) => ({
              ...E,
              connection: u ? "terminal" : "unavailable",
              jobStatus: l,
              error: ht(g, "实时译文暂不可用")
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
            error: ht(g, "正在等待 OCR 版面数据")
          })), await qt(jn[Math.min(S, jn.length - 1)], m.signal).catch(() => {
          }), S += 1;
        }
    };
    return (async () => {
      if (await b(), !h || m.signal.aborted) return;
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
                w = await Fs(
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
                  error: ht(L, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              v((L) => {
                const E = Ds(L, g, w);
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
            error: ht(g, "实时译文连接已中断，正在重连")
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
        await qt(Un[Math.min(S, Un.length - 1)], m.signal).catch(() => {
        }), S += 1;
      }
    })(), () => m.abort();
  }, [n, r, i, u]), o;
}
const js = 2e3;
function Us(e) {
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
const Bs = /* @__PURE__ */ new Set(["book", "translate"]);
function Fr(e) {
  return !!(e.jobId && e.sourceUrl && Bs.has(e.workflow));
}
function Hs(e) {
  return !!(Fr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function Ws() {
  const e = _a(), t = Fr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = Hs({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = k({ jobId: "", running: !1 });
  r.current.jobId !== e.jobId && (r.current = { jobId: e.jobId, running: !1 });
  const o = `${e.jobStatus || ""}`.trim().toLowerCase();
  o && !["succeeded", "failed", "cancelled", "canceled"].includes(o) && (r.current.running = !0);
  const a = $s({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t && (n || r.current.running)
  }), { shellRef: s, shellEl: c, shellWidth: i, bindShell: l } = za(), u = ns({
    documentId: e.documentId,
    jobId: e.jobId
  }), d = `${u}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: f, onZoomChange: m } = is(e.mode, s, u), h = Fa(
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
    beginModeSwitch: p,
    goToPage: v,
    repinIfRestoring: b
  } = Is(s, {
    primaryPane: h.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: u,
    restoreReady: h.primaryNumPages > 0
  });
  F(() => {
    b();
  }, [i, b]);
  const P = bs(
    s,
    h.compareMode,
    h.rowSyncRevision,
    b
  ), S = fs(
    s,
    h.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${f}-${h.metricsTick}`,
    h.primaryPane
  ), g = O((M, $) => {
    var W, q;
    const B = Math.max(
      Number(h.hudNumPages) || 0,
      Number(h.primaryNumPages) || 0,
      Number((W = h.numPagesByPane) == null ? void 0 : W.source) || 0,
      Number((q = h.numPagesByPane) == null ? void 0 : q.translated) || 0
    );
    v(M, B, $);
  }, [v, h.hudNumPages, h.primaryNumPages, h.numPagesByPane]), [w, L] = C(null), E = k(null), z = O((M) => {
    E.current && clearTimeout(E.current), L(M), M && (E.current = setTimeout(() => L(null), js));
  }, []);
  F(() => () => {
    E.current && clearTimeout(E.current);
  }, []);
  const _ = O((M) => {
    const $ = kt(e.regions, M);
    return $ ? $t($, h.primaryPane).page : null;
  }, [e.regions, h.primaryPane]), N = O((M, $) => {
    const B = $ || h.primaryPane, W = typeof M == "object" && M ? `${M.block_id || ""}`.trim() : "", q = typeof M == "object" && M ? `${M.image_url || ""}`.trim() : "", se = typeof M == "object" && M ? M.page_idx != null ? Number(M.page_idx) + 1 : M.page != null ? Number(M.page) : null : typeof M == "number" ? M + 1 : null, ae = Ao(e.regions, q, se) || kt(e.regions, W) || (typeof M == "object" ? ko(e.regions, M) : null);
    let ce = ae ? $t(ae, B).page : null;
    ce == null && (ce = Us(M)), !(ce == null || ce < 1) && (z(ae), g(ce, B));
  }, [z, g, h.primaryPane, e.regions]);
  Ns({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: h.hudNumPages || 0,
    currentPage: S,
    goToPage: g,
    resolveBlockPage: _,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (M) => {
      z(kt(e.regions, M.blockId));
    }
  });
  const { setModeKeepingPage: T } = ls({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: p
  }), [I, R] = C(null), {
    selection: A,
    clearSelection: x
  } = cs(s, !e.boot.loading && !e.boot.failed), U = O(() => {
    R(null), x();
  }, [x]), te = O((M) => {
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
  const J = A || I;
  F(() => {
    z(null), U();
  }, [d, z, U]);
  const re = !e.boot.loading && !e.boot.failed, H = X(() => ({ bindShell: l, shellEl: c, shellWidth: i, shellRef: s }), [l, c, i, s]), Z = X(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), ue = X(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: f,
    onZoomChange: m,
    shell: H,
    panes: h,
    sessionFiles: Z,
    rowHeights: P,
    goToPage: g,
    activeRegion: w,
    jumpToAnchor: N,
    setModeKeepingPage: T,
    download: e.download,
    showHud: re,
    selection: J,
    clearSelection: U,
    selectRegion: te,
    viewStateKey: u,
    liveTranslation: a,
    liveTranslationAvailable: n
  }), [e, H, h, Z, P, g, w, N, T, re, J, U, te, f, m, u, a, n]);
  return X(() => ({
    ...ue,
    currentPage: S
  }), [ue, S]);
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
], Js = [
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
function qs(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Vs)
    if (n.keys.some(
      (o) => o.length === 1 ? o === t : o === e
    )) return n;
  return null;
}
function Ks(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Gs(e) {
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
      if (d.defaultPrevented || d.metaKey || d.ctrlKey || d.altKey || Ks(d.target))
        return;
      const f = d.key, m = qs(f);
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
              i(Pt(s + 1, c));
              return;
            case "prev-page":
              i(Pt(s - 1, c));
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
const Zs = "retainpdf:soft-reader-close";
function Ys() {
  return new URL("./index.html", window.location.href).href;
}
function Xs() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: Zs },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function Qs(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), o = new URL(e, r);
    return o.origin === r.origin && !/reader\.html$/i.test(o.pathname) && !/detail\.html$/i.test(o.pathname);
  } catch {
    return !1;
  }
}
function ei() {
  if (!(typeof window > "u") && !Xs()) {
    if (Qs(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(Ys());
  }
}
function ti({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ j(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), ei();
      },
      children: [
        /* @__PURE__ */ y(sn, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ y("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let Bn = !1;
function ni() {
  if (Bn)
    return;
  const e = rt().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (Jo.GlobalWorkerOptions.workerSrc = e, Bn = !0);
}
const ri = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function oi({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: o
}) {
  const a = r.flatMap((s) => {
    if (!pr(s.region)) return [];
    const c = Rt(s, t, n);
    return c ? [{ highlight: s, rect: c }] : [];
  });
  return a.length ? /* @__PURE__ */ y("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: a.map(({ highlight: s, rect: c }) => {
    const i = s.region, l = vt(i), u = ri[l];
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
          /* @__PURE__ */ y("span", { className: "sr-only", children: gr(i, e) })
        ]
      },
      i.itemId
    );
  }) }) : null;
}
const ai = /* @__PURE__ */ new Set(["text", "formula", "table"]);
function si(e, t, n) {
  return e.flatMap((r) => {
    if (!ai.has(vt(r.region))) return [];
    const o = Rt(r, t, n);
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
async function $r(e) {
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
const Kt = "reader-text-hover-copy", Gt = "reader-text-hover-id", jr = "reader-text-hover-tools";
function ii({
  target: e,
  pane: t = "source",
  copiedSignal: n = 0
}) {
  const [r, o] = C("idle"), [a, s] = C("idle"), c = (e == null ? void 0 : e.itemId) || "";
  if (F(() => {
    o("idle"), s("idle");
  }, [c]), F(() => {
    if (!n) return;
    o("copied");
    const f = window.setTimeout(() => o("idle"), 1200);
    return () => window.clearTimeout(f);
  }, [n]), !e) return null;
  const i = br(e.highlight.region, t), l = vt(e.highlight.region) === "formula", u = (f, m) => async (h) => {
    h.preventDefault(), h.stopPropagation();
    const p = await $r(f);
    m(p ? "copied" : "failed"), window.setTimeout(() => m("idle"), 1200);
  }, d = l ? "复制 LaTeX" : "复制";
  return /* @__PURE__ */ y("div", { className: "reader-text-hover-layer", children: /* @__PURE__ */ y(
    "div",
    {
      className: "reader-text-hover-frame",
      "data-reader-text-hover-id": e.itemId,
      "data-reader-text-hover-kind": vt(e.highlight.region),
      style: e.rect,
      children: /* @__PURE__ */ j("div", { className: jr, children: [
        /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            className: Gt,
            "data-copy-state": a,
            "aria-label": `复制翻译编号 ${e.itemId}`,
            title: "翻译编号，点击复制",
            onPointerDown: (f) => f.stopPropagation(),
            onClick: u(e.itemId, s),
            children: a === "copied" ? "已复制编号" : e.itemId
          }
        ),
        i ? /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            className: Kt,
            "data-copy-state": r,
            "aria-label": t === "translated" ? "复制这段译文" : "复制这段原文",
            onPointerDown: (f) => f.stopPropagation(),
            onClick: u(i, o),
            children: r === "copied" ? "已复制" : r === "failed" ? "复制失败" : d
          }
        ) : null
      ] })
    }
  ) });
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
    const c = Rt(
      ci(e, a),
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
const ui = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', di = 256, Xe = /* @__PURE__ */ new Map();
function fi(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function mi(e) {
  const t = `${e || ""}`, { text: n, slots: r } = Go(t, { bareLatex: !0 }), o = fi(n), a = Zo(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Xe.get(t);
  if (!s && (s = Yo(o, r), Xe.set(t, s), Xe.size > di)) {
    const c = Xe.keys().next().value;
    c !== void 0 && Xe.delete(c);
  }
  return { fallbackHtml: a, richHtml: s, hasMath: !0 };
}
function Dt(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function Re(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function hi(e, t) {
  const n = e.typography, r = Re(t) || 1, o = Re(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), c = Dt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, c * r)), l = Re(n == null ? void 0 : n.fit_min_font_size_pt), u = Re(n == null ? void 0 : n.fit_max_font_size_pt), d = Math.max(3.5, (l || 5.5) * r), f = Math.max(
    d,
    u ? u * r : o ? o * r : i
  ), m = o ? o * r : i, h = Re(n == null ? void 0 : n.leading_em), p = [
    Re(n == null ? void 0 : n.padding_top_pt) || 0,
    Re(n == null ? void 0 : n.padding_right_pt) || 0,
    Re(n == null ? void 0 : n.padding_bottom_pt) || 0,
    Re(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((v) => v * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || ui,
    fontSizePx: Math.max(d, Math.min(f, m)),
    minFontSizePx: d,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: h ? 1 + h : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (Dt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : Dt(e.kind) ? "center" : "justify",
    padding: p,
    exact: !!o
  };
}
function pi(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), c = (d) => {
    const f = s.get(d);
    if (f !== void 0) return f;
    const { width: m, height: h } = e(d), p = m <= t + 0.5 && h <= n + 0.5;
    return s.set(d, p), p;
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
const gi = 512, Qe = /* @__PURE__ */ new Map();
let Zt = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Zt += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Zt += 1;
}));
function bi(e, t, n, r) {
  return [
    Zt,
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
  const n = k(null), r = X(
    () => mi(e.translatedText),
    [e.translatedText]
  ), [o, a] = C(r.fallbackHtml), s = X(
    () => hi(e, t),
    [e, t]
  );
  F(() => {
    let d = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      d && a(f);
    }), () => {
      d = !1;
    };
  }, [r]), De(() => {
    const d = n.current;
    if (!d) return;
    const [f, m, h, p] = s.padding, v = Math.max(1, e.rect.width - p - m), b = Math.max(1, e.rect.height - f - h), P = bi(o, v, b, s);
    let S = Qe.get(P);
    if (S === void 0 && (S = pi(
      (g) => (d.style.fontSize = `${g}px`, { width: d.scrollWidth, height: d.scrollHeight }),
      v,
      b,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Qe.set(P, S), Qe.size > gi)) {
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
function vi({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = X(
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
const Si = nn(vi), Ur = 1.414, wi = 26;
function Pi({
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
  onHoverRegion: h,
  liveTranslationLayout: p,
  liveTranslationPage: v,
  showLiveTranslation: b = r === "source"
}) {
  const P = k(c ?? Ur), [S, g] = C(P.current);
  F(() => {
    c != null && Math.abs(c - P.current) >= 1e-3 && (P.current = c, g(c));
  }, [c]);
  const w = k(l);
  w.current = l;
  const L = k((M) => {
    var $;
    ($ = w.current) == null || $.call(w, M);
  }).current, E = Math.max(120, Math.floor(t * S)), z = Math.max(E, Math.ceil(a || 0)), _ = Rt(u, t, E), N = X(
    () => si(d, t, E),
    [E, d, t]
  ), [T, I] = C(null), R = typeof h == "function", A = R ? m ?? null : T, x = (M) => {
    R ? M !== (m ?? null) && (h == null || h(M)) : I(($) => $ === M ? $ : M);
  }, [U, te] = C(0), J = X(
    () => N.find((M) => M.itemId === A) || null,
    [A, N]
  ), re = (M) => {
    var ae, ce;
    if (M.buttons !== 0) {
      x(null);
      return;
    }
    if ((ce = (ae = M.target) == null ? void 0 : ae.closest) != null && ce.call(ae, `.${jr}`)) return;
    const $ = M.currentTarget.getBoundingClientRect(), B = M.clientX - $.left, W = M.clientY - $.top, q = J == null ? void 0 : J.rect;
    if (q && B >= q.left - 4 && B <= q.left + q.width + 4 && W >= q.top - wi && W <= q.top) return;
    const se = xt(N, B, W);
    x((se == null ? void 0 : se.itemId) || null);
  }, H = async (M) => {
    var q, se, ae;
    if ((se = (q = M.target) == null ? void 0 : q.closest) != null && se.call(q, `.${Kt}, .${Gt}`)) return;
    const $ = M.currentTarget.getBoundingClientRect(), B = xt(
      N,
      M.clientX - $.left,
      M.clientY - $.top
    );
    if (!B) return;
    const W = br(B.highlight.region, r === "translated" ? "translated" : "source");
    W && ((ae = window.getSelection()) == null || ae.removeAllRanges(), await $r(W) && te((ce) => ce + 1));
  }, Z = (M) => {
    var W, q, se, ae, ce;
    if (!f || (q = (W = M.target) == null ? void 0 : W.closest) != null && q.call(W, ".reader-structure-selection-target") || (ae = (se = M.target) == null ? void 0 : se.closest) != null && ae.call(se, `.${Kt}, .${Gt}`) || `${((ce = window.getSelection()) == null ? void 0 : ce.toString()) || ""}`.trim()) return;
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
  }, ue = (M) => {
    !Number.isFinite(M) || M <= 0 || Math.abs(P.current - M) < 1e-3 || (P.current = M, g(M), i == null || i(e, M));
  };
  return /* @__PURE__ */ j(
    "div",
    {
      ref: L,
      [He]: e,
      [We]: r,
      [ln]: E,
      className: un,
      onPointerMoveCapture: re,
      onClick: Z,
      onDoubleClick: H,
      onPointerLeave: () => x(null),
      style: {
        width: t,
        height: z,
        minHeight: z
      },
      children: [
        o ? /* @__PURE__ */ y(
          qo,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: Ir,
            loading: /* @__PURE__ */ y(
              "div",
              {
                className: wt,
                style: { width: t, height: E }
              }
            ),
            onLoadSuccess: (M) => {
              try {
                const $ = M.getViewport({ scale: 1 });
                if ($.width > 0) {
                  const B = $.height / $.width;
                  ue(B);
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
          Si,
          {
            layoutPage: p,
            pageState: v,
            width: t,
            height: E
          }
        ) : null,
        /* @__PURE__ */ y(
          ii,
          {
            target: o ? J : null,
            pane: r === "translated" ? "translated" : "source",
            copiedSignal: U
          }
        ),
        /* @__PURE__ */ y(
          oi,
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
const Ri = nn(Pi), zt = 5, Ti = "120% 0px", Ii = 120;
let Hn = 1;
const Wn = /* @__PURE__ */ new WeakMap();
function Ei(e) {
  if (!e) return 0;
  const t = Wn.get(e);
  if (t) return t;
  const n = Hn;
  return Hn += 1, Wn.set(e, n), n;
}
function Mi() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const Ai = po(
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
    activeRegion: h = null,
    regions: p = [],
    readerMetadata: v = null,
    onSelectRegion: b,
    hoveredRegionId: P = null,
    onHoverRegion: S,
    liveTranslation: g,
    showLiveTranslation: w = t === "source",
    liveTranslationPendingLabel: L = "",
    paneAction: E
  }, z) {
    ni();
    const { file: _, loading: N, error: T } = Aa(n, r), I = `${n}\0${Ei(_)}`, R = k(I);
    R.current = I;
    const A = X(
      () => Ia(_),
      [_, n]
    ), [x, U] = C(0), [te, J] = C(""), [re, H] = C(null), [Z, ue] = C(480), M = k(null), $ = k(0), B = X(() => Mi(), []), W = X(() => ({
      cMapUrl: rt().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: rt().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    rn(z, () => re, [re]), F(() => {
      const D = (G) => {
        $.current = G, ue(G);
      }, K = (G) => {
        const ee = Ya(G, $.current);
        if (ee !== "ignore") {
          if (M.current && clearTimeout(M.current), ee === "immediate") {
            D(G);
            return;
          }
          M.current = setTimeout(() => D(G), Xa);
        }
      }, V = !!(i && i >= 80);
      K(V ? i : (c == null ? void 0 : c.clientWidth) || 0);
      const le = !V && c && typeof ResizeObserver < "u" ? new ResizeObserver((G) => {
        var ee, de;
        K(((de = (ee = G[0]) == null ? void 0 : ee.contentRect) == null ? void 0 : de.width) ?? c.clientWidth);
      }) : null;
      return le && c && le.observe(c), () => {
        le == null || le.disconnect(), M.current && clearTimeout(M.current);
      };
    }, [i, c, a]);
    const q = X(
      () => Ka(Z, o),
      [Z, o]
    ), [se, ae] = C(() => /* @__PURE__ */ new Map()), [ce, dt] = C(() => /* @__PURE__ */ new Set()), [oe, ne] = C(() => /* @__PURE__ */ new Set()), ie = k(/* @__PURE__ */ new Map()), me = k(null), ge = k(/* @__PURE__ */ new Map()), ke = O((D, K) => {
      ae((V) => {
        if (V.get(D) === K) return V;
        const Y = new Map(V);
        return Y.set(D, K), Y;
      });
    }, []), ft = O((D, K) => {
      const V = ie.current, Y = V.get(D);
      if (Y && me.current)
        try {
          me.current.unobserve(Y);
        } catch {
        }
      if (K) {
        if (V.set(D, K), me.current)
          try {
            me.current.observe(K);
          } catch {
          }
      } else
        V.delete(D);
    }, []), Mt = k(/* @__PURE__ */ new Map()), qe = O((D) => {
      const K = Mt.current;
      let V = K.get(D);
      return V || (V = (Y) => ft(D, Y), K.set(D, V)), V;
    }, [ft]);
    F(() => {
      if (typeof IntersectionObserver > "u") return;
      const D = ge.current, K = new IntersectionObserver(
        (V) => {
          const Y = [], le = [];
          for (const G of V) {
            const ee = G.target, de = Tt(ee);
            Number.isFinite(de) && (G.isIntersecting ? Y : le).push(de);
          }
          if ((Y.length || le.length) && dt((G) => {
            let ee = null;
            for (const de of Y)
              G.has(de) || (ee = ee || new Set(G), ee.add(de));
            for (const de of le)
              G.has(de) && (ee = ee || new Set(G), ee.delete(de));
            return ee || G;
          }), Y.length) {
            for (const G of Y) {
              const ee = D.get(G);
              ee && (clearTimeout(ee), D.delete(G));
            }
            ne((G) => {
              let ee = null;
              for (const de of Y)
                G.has(de) || (ee = ee || new Set(G), ee.add(de));
              return ee || G;
            });
          }
          for (const G of le)
            D.has(G) || D.set(G, setTimeout(() => {
              D.delete(G), ne((ee) => {
                if (!ee.has(G)) return ee;
                const de = new Set(ee);
                return de.delete(G), de;
              });
            }, Ii));
        },
        { root: c, rootMargin: Ti, threshold: 0 }
      );
      me.current = K;
      for (const V of ie.current.values())
        try {
          K.observe(V);
        } catch {
        }
      return () => {
        K.disconnect(), me.current === K && (me.current = null);
        for (const V of D.values()) clearTimeout(V);
        D.clear();
      };
    }, [c]), De(() => {
      U(0), J(""), dt(/* @__PURE__ */ new Set()), ne(/* @__PURE__ */ new Set()), ae(/* @__PURE__ */ new Map()), ie.current.clear();
      const D = ge.current;
      for (const K of D.values()) clearTimeout(K);
      D.clear(), m == null || m(0, t);
    }, [I, m, t]);
    const Ke = O(
      ({ numPages: D }) => {
        R.current === I && (U(D), J(""), m == null || m(D, t), d == null || d({ numPages: D, pane: t }));
      },
      [I, d, m, t]
    ), Ge = O(
      (D) => {
        if (R.current !== I) return;
        const K = (D == null ? void 0 : D.message) || "PDF 解析失败";
        J(K), U(0), m == null || m(0, t), f == null || f(D, t);
      },
      [I, f, m, t]
    ), ve = X(
      () => x > 0 ? Array.from({ length: x }, (D, K) => K + 1) : [],
      [x]
    );
    F(() => {
      typeof IntersectionObserver < "u" || ne(new Set(ve));
    }, [ve]);
    const Le = X(
      () => Cn(h, v, t),
      [h, v, t]
    ), At = X(() => {
      const D = /* @__PURE__ */ new Map();
      for (const K of p) {
        const V = Cn(K, v, t);
        if (!V) continue;
        const Y = D.get(V.box.page) || [];
        Y.push(V), D.set(V.box.page, Y);
      }
      return D;
    }, [t, v, p]), uo = X(() => {
      const D = /* @__PURE__ */ new Set();
      if (!P) return D;
      for (const [K, V] of At)
        V.some((Y) => Y.itemId === P) && D.add(K);
      return D;
    }, [P, At]), fo = X(() => {
      if (x === 0) return /* @__PURE__ */ new Set();
      if (!a) return /* @__PURE__ */ new Set();
      if (!(!!c && typeof IntersectionObserver < "u")) return new Set(ve);
      if (ce.size === 0) {
        const V = Math.min(x, zt * 2 + 1);
        return new Set(Array.from({ length: V }, (Y, le) => le + 1));
      }
      const K = /* @__PURE__ */ new Set();
      for (const V of ce)
        for (let Y = -zt; Y <= zt; Y++) {
          const le = V + Y;
          le >= 1 && le <= x && K.add(le);
        }
      return K;
    }, [x, ve, c, a, ce]), mo = !n || !!T || !!te, ho = n && (T || te) || s;
    return /* @__PURE__ */ j(
      "section",
      {
        ref: H,
        className: `reader-panel ${Ua}${a ? "" : " is-hidden"}`,
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
          mo && !N ? /* @__PURE__ */ y("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: ho }) : null,
          N ? /* @__PURE__ */ y("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          A && !T ? /* @__PURE__ */ y("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ y(
            Ko,
            {
              file: A,
              loading: null,
              error: null,
              options: W,
              onLoadSuccess: Ke,
              onLoadError: Ge,
              className: "reader-react-pdf-document",
              children: ve.map((D) => {
                if (fo.has(D))
                  return /* @__PURE__ */ y(
                    Ri,
                    {
                      pane: t,
                      pageNumber: D,
                      width: q,
                      devicePixelRatio: B,
                      active: oe.has(D),
                      syncedMinHeight: (l == null ? void 0 : l.get(D)) || 0,
                      onMetrics: u,
                      cachedAspect: se.get(D),
                      onAspectChange: ke,
                      sentinelRef: qe(D),
                      regionHighlight: (Le == null ? void 0 : Le.box.page) === D ? Le : null,
                      regionTargets: At.get(D),
                      onSelectRegion: b,
                      hoveredRegionId: P && uo.has(D) ? P : null,
                      onHoverRegion: S,
                      liveTranslationLayout: g == null ? void 0 : g.layoutByPage.get(D - 1),
                      liveTranslationPage: g == null ? void 0 : g.pagesByPage.get(D - 1),
                      showLiveTranslation: w
                    },
                    `${t}-${D}`
                  );
                const V = se.get(D) ?? Ur, Y = Math.max(120, Math.floor(q * V)), le = Math.max(Y, Math.ceil((l == null ? void 0 : l.get(D)) || 0));
                return /* @__PURE__ */ y(
                  "div",
                  {
                    ref: qe(D),
                    [He]: D,
                    [We]: t,
                    [ln]: Y,
                    className: un,
                    style: {
                      width: q,
                      height: le,
                      minHeight: le
                    },
                    children: /* @__PURE__ */ y(
                      "div",
                      {
                        className: wt,
                        style: { width: q, height: Y },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${D}`
                );
              })
            },
            I
          ) }) : null
        ]
      }
    );
  }
), Vn = nn(Ai), Br = on(null), Hr = on(null);
function ki({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ y(Br.Provider, { value: e, children: /* @__PURE__ */ y(Hr.Provider, { value: t, children: n }) });
}
function ut() {
  return an(Br);
}
function Li() {
  return an(Hr);
}
function Ci({
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
function _i(e, t, n = e * 2) {
  return t ? !Number.isFinite(e) || e <= 0 ? n : e * 2 : e;
}
function Ni(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function xi(e) {
  const t = ut(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", c = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, l = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), u = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, d = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? lt, h = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, p = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), v = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, b = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, P = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, S = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", g = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", w = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, L = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, E = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), z = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), _ = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), N = e.regions ?? (t == null ? void 0 : t.regions) ?? [], T = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), I = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), [R, A] = C(null), x = O((re) => A(re), []), U = Ci({
    mode: s,
    compareMode: c,
    showSource: i,
    showTranslated: l,
    markdownSplit: n,
    overlayOnSource: u
  }), J = Number.isFinite(h) && h > 0 ? _i(
    h,
    n || r,
    typeof document > "u" ? h * 2 : document.documentElement.clientWidth
  ) : null;
  return /* @__PURE__ */ y(
    "div",
    {
      ref: d,
      className: Tr,
      "data-reader-region-count": N.length,
      "data-reader-structured-region-count": N.filter(pr).length,
      "data-reader-metadata-ready": T ? "true" : "false",
      children: /* @__PURE__ */ j(
        "main",
        {
          className: `${ja} reader-mode-${U.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            v ? /* @__PURE__ */ y(
              Vn,
              {
                pane: "source",
                url: S,
                preloadedFile: w,
                userZoom: m,
                visible: U.showSource,
                scrollRoot: f,
                pageWidthOverride: J,
                rowHeights: U.compareMode ? p : void 0,
                onMetrics: E,
                emptyLabel: P ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: z,
                activeRegion: _,
                regions: N,
                readerMetadata: T,
                onSelectRegion: I,
                hoveredRegionId: R,
                onHoverRegion: x,
                liveTranslation: u ? o : void 0,
                showLiveTranslation: u,
                liveTranslationPendingLabel: u ? Ni(o) : "",
                paneAction: u ? /* @__PURE__ */ j(tn, { children: [
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
              Vn,
              {
                pane: "translated",
                url: g,
                preloadedFile: L,
                userZoom: m,
                visible: U.showTranslated,
                scrollRoot: f,
                pageWidthOverride: J,
                rowHeights: U.compareMode ? p : void 0,
                onMetrics: E,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: z,
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
const Di = [
  { id: "source", label: "源文件", Icon: yr },
  { id: "compare", label: "对照", Icon: vr },
  { id: "translated", label: "翻译文件", Icon: Sr }
];
function Jn(e) {
  return `辅助面板占了右半边，对照只剩${e === "translated" ? "译文" : "原文"} · 点此关闭面板恢复对照`;
}
function zi(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function Oi(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Fi(e) {
  const t = ut(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null,
    compareDegraded: s = !1,
    onRestoreCompare: c
  } = e, i = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, l = a ? zi(a.state) : "";
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
          /* @__PURE__ */ y(Do, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { className: "reader-live-translation-toggle-label", children: l })
        ]
      }
    ) : null,
    /* @__PURE__ */ y("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: Di.map(({ id: u, label: d, Icon: f }) => {
      const m = n === u, h = Oi({
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
          title: h ? `${d} 需要文档任务` : d,
          disabled: h,
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
          /* @__PURE__ */ y(zo, { size: 13, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ y("span", { className: "reader-compare-degraded-label", children: Jn(n) })
        ]
      }
    ) : null
  ] });
}
const $i = {
  markdown: { label: "Markdown", short: "MD", Icon: Oo, needsJob: !0 }
}, ji = Ar.map(
  (e) => ({ id: e, ...$i[e] })
), Ui = {
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
    Icon: wr,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    ariaLabel: "AI（agent 终端）",
    keepMounted: !0
  }
}, Wr = kr.map(
  (e) => ({ id: e, ...Ui[e] })
);
function Bi(e) {
  return [
    ...ji.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
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
function Hi() {
  const e = pe();
  return Bi((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function Wi(e) {
  const t = ut(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), c = Hi();
  return n ? /* @__PURE__ */ j("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ y("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: c.map(({ id: i, label: l, Icon: u, needsJob: d }) => {
      const f = n === i, m = d && o, h = r == null ? void 0 : r[i];
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
            h ? /* @__PURE__ */ y("span", { className: "reader-assistant-dock-badge", children: h }) : null
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
  ] }) : /* @__PURE__ */ y("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: c.map(({ id: i, label: l, short: u, Icon: d, needsJob: f }) => {
    const m = f && o, h = r == null ? void 0 : r[i];
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
          h ? /* @__PURE__ */ y("span", { className: "reader-assistant-dock-badge", children: h }) : null
        ]
      },
      i
    );
  }) });
}
function Vi(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function Ji(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function qi(e) {
  return e / 100 * window.innerHeight;
}
function Ki(e) {
  return e / 100 * window.innerWidth;
}
function Gi(e) {
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
  const [o, a] = Gi(n);
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
      r = Ji(t, o);
      break;
    }
    case "em": {
      r = Vi(t, o);
      break;
    }
    case "vh": {
      r = qi(o);
      break;
    }
    case "vw": {
      r = Ki(o);
      break;
    }
  }
  return r;
}
function he(e) {
  return parseFloat(e.toFixed(3));
}
function Ve({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, o) => (r += t === "horizontal" ? o.element.offsetWidth : o.element.offsetHeight, r), 0);
}
function Yt(e) {
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
      const u = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.collapsedSize
      });
      s = he(u / n * 100);
    }
    let c;
    if (a.defaultSize !== void 0) {
      const u = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      c = he(u / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const u = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.minSize
      });
      i = he(u / n * 100);
    }
    let l = 100;
    if (a.maxSize !== void 0) {
      const u = et({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      l = he(u / n * 100);
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
function Q(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function Xt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? Zi : Yi
  );
}
function Zi(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function Yi(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function Vr(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Jr(e, t) {
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
function Xi({
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
    const { x: c, y: i } = Jr(r, s), l = e === "horizontal" ? c : i;
    l < a && (a = l, o = s);
  }
  return Q(o, "No rect found"), o;
}
let pt;
function Qi() {
  return pt === void 0 && (typeof matchMedia == "function" ? pt = !!matchMedia("(pointer:coarse)").matches : pt = !1), pt;
}
function qr(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = Xt(
    n,
    Array.from(t.children).filter(Vr).map((h) => ({ element: h }))
  ).map(({ element: h }) => h), s = [];
  let c = !1, i = !1, l = -1, u = -1, d = 0, f, m = [];
  {
    let h = -1;
    for (const p of a)
      p.hasAttribute("data-panel") && (h++, p.hasAttribute("data-disabled") || (d++, l === -1 && (l = h), u = h));
  }
  if (d > 1) {
    let h = -1;
    for (const p of a)
      if (p.hasAttribute("data-panel")) {
        h++;
        const v = r.find(
          (b) => b.element === p
        );
        if (v) {
          if (f) {
            const b = f.element.getBoundingClientRect(), P = p.getBoundingClientRect();
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
                  const L = m[0], E = Xi({
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
              const L = Qi() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (w.width < L) {
                const z = L - w.width;
                w = new DOMRect(
                  w.x - z / 2,
                  w.y,
                  w.width + z,
                  w.height
                );
              }
              if (w.height < L) {
                const z = L - w.height;
                w = new DOMRect(
                  w.x,
                  w.y - z / 2,
                  w.width,
                  w.height + z
                );
              }
              const E = h <= l || h > u;
              !c && !E && s.push({
                group: e,
                groupSize: Ve({ group: e }),
                panels: [f, v],
                separator: "width" in g ? void 0 : g,
                rect: w
              }), c = !1;
            }
          }
          i = !1, f = v, m = [];
        }
      } else if (p.hasAttribute("data-separator")) {
        p.ariaDisabled !== null && (c = !0);
        const v = o.find(
          (b) => b.element === p
        );
        v ? m.push(v) : (f = void 0, m = []);
      } else
        i = !0;
  }
  return s;
}
var Me;
class Kr {
  constructor() {
    kn(this, Me, {});
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
    Ln(this, Me, {});
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
const hn = new Kr();
function _e() {
  return Ue;
}
function ec(e) {
  return hn.addListener("change", e);
}
function tc(e) {
  const t = Ue, n = { ...Ue };
  n.cursorFlags = e, Ue = n, hn.emit("change", {
    prev: t,
    next: n
  });
}
function Be(e) {
  const t = Ue;
  Ue = e, hn.emit("change", {
    prev: t,
    next: e
  });
}
const nc = (e) => e, Ot = () => {
}, Gr = 1, Zr = 2, Yr = 4, Xr = 8, qn = 3, Kn = 12;
let gt;
function Gn() {
  return gt === void 0 && (gt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (gt = !0)), gt;
}
function rc({
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
        if (e && Gn()) {
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
    return Gn() ? r > 0 && o > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && o > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const Zn = /* @__PURE__ */ new WeakMap();
function pn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = Zn.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = _e();
  switch (r.state) {
    case "active":
    case "hover": {
      const o = rc({
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
  Zn.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let we = /* @__PURE__ */ new Map();
const Qr = new Kr();
function oc(e) {
  we = new Map(we), we.delete(e);
}
function Yn(e, t) {
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
function ze() {
  return we;
}
function gn(e, t) {
  return Qr.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Ie(e, t, n) {
  const r = we.get(e);
  we = new Map(we), we.set(e, t), Qr.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function eo(e) {
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
function Xn(e) {
  e.defaultPrevented || eo(e.currentTarget);
}
function ac(e, t, n) {
  let r, o = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const s = Jr(n, a.rect);
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
function sc(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function ic(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: tr(e),
    b: tr(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  Q(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const o = {
    a: er(Qn(n.a)),
    b: er(Qn(n.b))
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
const cc = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function lc(e) {
  const t = getComputedStyle(to(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function uc(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || lc(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || cc.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function Qn(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (Q(n, "Missing node"), uc(n)) return n;
  }
  return null;
}
function er(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function tr(e) {
  const t = [];
  for (; e; )
    t.push(e), e = to(e);
  return t;
}
function to(e) {
  const { parentNode: t } = e;
  return sc(t) ? t.host : t;
}
function dc(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function fc({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!Vr(n) || n.contains(e) || e.contains(n))
    return !0;
  if (ic(n, e) > 0) {
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
function bn(e, t) {
  const n = [];
  return t.forEach((r, o) => {
    if (o.disabled)
      return;
    const a = qr(o), s = ac(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && fc({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function mc(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function fe(e, t, n = 0) {
  return Math.abs(he(e) - he(t)) <= n;
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
  return r = Math.min(c, r), r = he(r), r;
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
  Q(u != null, "Invalid first pivot index"), Q(d != null, "Invalid second pivot index");
  let f = 0;
  switch (a) {
    case "keyboard": {
      {
        const p = e < 0 ? d : u, v = n[p];
        Q(
          v,
          `Panel constraints not found for index ${p}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: S = 0
        } = v;
        if (P) {
          const g = c[p];
          if (Q(
            g != null,
            `Previous layout not found for panel index ${p}`
          ), fe(g, b)) {
            const w = S - g;
            Se(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      {
        const p = e < 0 ? u : d, v = n[p];
        Q(
          v,
          `No panel constraints found for index ${p}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: S = 0
        } = v;
        if (P) {
          const g = c[p];
          if (Q(
            g != null,
            `Previous layout not found for panel index ${p}`
          ), fe(g, S)) {
            const w = g - b;
            Se(w, Math.abs(e)) > 0 && (e = e < 0 ? 0 - w : w);
          }
        }
      }
      break;
    }
    default: {
      const p = e < 0 ? d : u, v = n[p];
      Q(
        v,
        `Panel constraints not found for index ${p}`
      );
      const b = c[p], { collapsible: P, collapsedSize: S, minSize: g } = v;
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
    const p = e < 0 ? 1 : -1;
    let v = e < 0 ? d : u, b = 0;
    for (; ; ) {
      const S = c[v];
      Q(
        S != null,
        `Previous layout not found for panel index ${v}`
      );
      const g = je({
        overrideDisabledPanels: s,
        panelConstraints: n[v],
        prevSize: S,
        size: 100
      }) - S;
      if (b += g, v += p, v < 0 || v >= n.length)
        break;
    }
    const P = Math.min(Math.abs(e), Math.abs(b));
    e = e < 0 ? 0 - P : P;
  }
  {
    let p = e < 0 ? u : d;
    for (; p >= 0 && p < n.length; ) {
      const v = Math.abs(e) - Math.abs(f), b = c[p];
      Q(
        b != null,
        `Previous layout not found for panel index ${p}`
      );
      const P = b - v, S = je({
        overrideDisabledPanels: s,
        panelConstraints: n[p],
        prevSize: b,
        size: P
      });
      if (!fe(b, S) && (f += b - S, l[p] = S, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? p-- : p++;
    }
  }
  if (mc(i, l))
    return o;
  {
    const p = e < 0 ? d : u, v = c[p];
    Q(
      v != null,
      `Previous layout not found for panel index ${p}`
    );
    const b = v + f, P = je({
      overrideDisabledPanels: s,
      panelConstraints: n[p],
      prevSize: v,
      size: b
    });
    if (l[p] = P, !fe(P, b)) {
      let S = b - P, g = e < 0 ? d : u;
      for (; g >= 0 && g < n.length; ) {
        const w = l[g];
        Q(
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
    (p, v) => v + p,
    0
  );
  if (!fe(m, 100, 0.1))
    return o;
  const h = Object.keys(o);
  return l.reduce((p, v, b) => (p[h[b]] = v, p), {});
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
      Q(i != null, `No layout data found for index ${c}`);
      const l = 100 / o * i;
      r[c] = l;
    }
  let a = 0;
  for (let c = 0; c < t.length; c++) {
    const i = n[c];
    Q(i != null, `No layout data found for index ${c}`);
    const l = r[c];
    Q(l != null, `No layout data found for index ${c}`);
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
      Q(i != null, `No layout data found for index ${c}`);
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
function no({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const i = ze();
    for (const [
      l,
      {
        defaultLayoutDeferred: u,
        derivedPanelConstraints: d,
        layout: f,
        groupSize: m,
        separatorToPanels: h
      }
    ] of i)
      if (l.id === e)
        return {
          defaultLayoutDeferred: u,
          derivedPanelConstraints: d,
          group: l,
          groupSize: m,
          layout: f,
          separatorToPanels: h
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
    const f = a(), m = l.findIndex((v) => v.id === t), h = m === 0, p = m === l.length - 1;
    if (p && i < f && (h || l.slice(0, m).every((v, b) => {
      const P = d[b];
      return (P == null ? void 0 : P.collapsible) && fe(P.collapsedSize, u[P.panelId]);
    }))) {
      const v = l.slice(0, m).reduce((b, P) => b + u[P.id], 0);
      return {
        ...u,
        [t]: he(100 - v)
      };
    }
    return st({
      delta: p ? f - i : i - f,
      initialLayout: u,
      panelConstraints: d,
      pivotIndices: p ? [m - 1, m] : [m, m + 1],
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
      layout: h,
      separatorToPanels: p
    } = n(), v = s({
      nextSize: i,
      panels: f.panels,
      prevLayout: h,
      derivedPanelConstraints: d
    }), b = xe({
      layout: v,
      panelConstraints: d
    });
    Ne(h, b) || Ie(f, {
      defaultLayoutDeferred: u,
      derivedPanelConstraints: d,
      groupSize: m,
      layout: b,
      separatorToPanels: p
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
      const { group: l } = n(), { element: u } = o(), d = Ve({ group: l }), f = et({
        groupSize: d,
        panelElement: u,
        styleProp: i
      }), m = he(f / d * 100);
      c(m);
    }
  };
}
function nr(e) {
  if (e.defaultPrevented)
    return;
  const t = ze();
  bn(e, t).forEach((n) => {
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
function bt(e) {
  const t = ze();
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
  Q(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  Q(a, "Matching panels not found");
  const s = a.map((u) => n.panels.indexOf(u)), c = ro({ groupId: n.id }).getLayout(), i = st({
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
function rr(e) {
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
        Q(i, "Matching separator not found");
        const l = c.get(i);
        Q(l, "Matching panels not found");
        const u = l[0], d = a.find(
          (f) => f.panelId === u.id
        );
        if (Q(d, "Panel metadata not found"), d.collapsible) {
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
        Q(o !== null, "Index not found");
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
function or(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = ze(), n = bn(e, t), r = /* @__PURE__ */ new Map();
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
    const { group: u, groupSize: d } = l, { orientation: f, panels: m } = u, { disableCursor: h } = u.mutableState;
    let p = 0;
    a ? f === "horizontal" ? p = (t.clientX - a.x) / d * 100 : p = (t.clientY - a.y) / d * 100 : f === "horizontal" ? p = t.clientX < 0 ? -100 : 100 : p = t.clientY < 0 ? -100 : 100;
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
        delta: p,
        initialLayout: v,
        panelConstraints: S,
        pivotIndices: l.panels.map((z) => m.indexOf(z)),
        prevLayout: w,
        trigger: "mouse-or-touch"
      });
      if (Ne(E, w)) {
        if (p !== 0 && !h)
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
  t.movementX === 0 ? i |= s & qn : i |= c & qn, t.movementY === 0 ? i |= s & Kn : i |= c & Kn, tc(i), pn(e);
}
function ar(e) {
  const t = ze(), n = _e();
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
function sr(e) {
  var r, o;
  if (e.defaultPrevented)
    return;
  const t = _e(), n = ze();
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
      const a = bn(e, n);
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
function ir(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (_e().state) {
      case "hover":
        Be({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function cr(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || eo(e.currentTarget) && e.preventDefault();
}
function lr(e) {
  let t = 0, n = 0;
  const r = {};
  for (const a of e)
    if (a.defaultSize !== void 0) {
      t++;
      const s = he(a.defaultSize);
      n += s, r[a.panelId] = s;
    } else
      r[a.panelId] = void 0;
  const o = e.length - t;
  if (o !== 0) {
    const a = he((100 - n) / o);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = a);
  }
  return r;
}
function hc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = Ve({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, c = {
    asPercentage: he(a / o * 100),
    inPixels: a
  };
  r.mutableValues.prevSize = c, r.onResize(c, r.id, s);
}
function pc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function gc({
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
        const m = f / 100 * n, h = he(
          m / t * 100
        );
        c.set(d.id, h), o += h;
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
      u[d] = he(
        f / a * l
      );
    }
  else {
    const d = he(
      l / i.length
    );
    for (const f of i)
      u[f] = d;
  }
  return u;
}
function bc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const Fe = /* @__PURE__ */ new Map();
function yc(e) {
  let t = !0;
  Q(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new n((h) => {
    for (const p of h) {
      const { borderBoxSize: v, target: b } = p;
      if (b === e.element) {
        if (t) {
          const P = Ve({ group: e });
          if (P === 0)
            return;
          const S = Ae(e.id);
          if (!S)
            return;
          const g = Yt(e), w = S.defaultLayoutDeferred ? lr(g) : S.layout, L = gc({
            group: e,
            nextGroupSize: P,
            prevGroupSize: S.groupSize,
            prevLayout: w
          }), E = xe({
            layout: L,
            panelConstraints: g
          });
          if (!S.defaultLayoutDeferred && Ne(S.layout, E) && pc(
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
        hc(e, b, v);
    }
  });
  a.observe(e.element), e.panels.forEach((h) => {
    Q(
      !r.has(h.id),
      `Panel ids must be unique; id "${h.id}" was used more than once`
    ), r.add(h.id), h.onResize && a.observe(h.element);
  });
  const s = Ve({ group: e }), c = Yt(e), i = e.panels.map(({ id: h }) => h).join(",");
  let l = e.mutableState.defaultLayout;
  l && (bc(e.panels, l) || (l = void 0));
  const u = e.mutableState.layouts[i] ?? l ?? lr(c), d = xe({
    layout: u,
    panelConstraints: c
  }), f = e.element.ownerDocument;
  Fe.set(
    f,
    (Fe.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return qr(e).forEach((h) => {
    h.separator && m.set(h.separator, h.panels);
  }), Ie(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: c,
    groupSize: s,
    layout: d,
    separatorToPanels: m
  }), e.separators.forEach((h) => {
    Q(
      !o.has(h.id),
      `Separator ids must be unique; id "${h.id}" was used more than once`
    ), o.add(h.id), h.element.addEventListener("keydown", rr);
  }), Fe.get(f) === 1 && (f.addEventListener("contextmenu", Xn, !0), f.addEventListener("dblclick", nr, !0), f.addEventListener("pointerdown", or, !0), f.addEventListener("pointerleave", ar), f.addEventListener("pointermove", sr), f.addEventListener("pointerout", ir), f.addEventListener("pointerup", cr, !0)), function() {
    t = !1, Fe.set(
      f,
      Math.max(0, (Fe.get(f) ?? 0) - 1)
    ), oc(e), e.separators.forEach((h) => {
      h.element.removeEventListener("keydown", rr);
    }), Fe.get(f) || (f.removeEventListener(
      "contextmenu",
      Xn,
      !0
    ), f.removeEventListener(
      "dblclick",
      nr,
      !0
    ), f.removeEventListener(
      "pointerdown",
      or,
      !0
    ), f.removeEventListener("pointerleave", ar), f.removeEventListener("pointermove", sr), f.removeEventListener("pointerout", ir), f.removeEventListener("pointerup", cr, !0)), a.disconnect();
  };
}
function vc() {
  const [e, t] = C({}), n = O(() => t({}), []);
  return [e, n];
}
function yn(e) {
  const t = hr();
  return `${e ?? t}`;
}
const Oe = typeof window < "u" ? De : F;
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
function vn(...e) {
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
function Sn(e) {
  const t = k({ ...e });
  return Oe(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const ao = on(null);
function Sc(e, t) {
  const n = k({
    getLayout: () => ({}),
    setLayout: nc
  });
  rn(t, () => n.current, []), Oe(() => {
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
  orientation: u = "horizontal",
  resizeTargetMinimumSize: d = {
    coarse: 20,
    fine: 10
  },
  style: f,
  ...m
}) {
  const h = k({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), p = nt((T) => {
    Ne(h.current.onLayoutChange, T) || (h.current.onLayoutChange = T, i == null || i(T));
  }), v = nt(
    (T, I) => {
      Ne(h.current.onLayoutChanged, T) || (h.current.onLayoutChanged = T, l == null || l(T, { isUserInteraction: I }));
    }
  ), b = yn(c), P = k(null), [S, g] = vc(), w = k({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: d,
    separators: []
  }), L = vn(P, a);
  Sc(b, s);
  const E = nt(
    (T, I) => {
      const R = _e(), A = Yn(T), x = Ae(T);
      if (x) {
        let U = !1;
        switch (R.state) {
          case "active": {
            U = R.hitRegions.some(
              (te) => te.group === A
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
  ), z = Sn({
    defaultLayout: n,
    disableCursor: r
  }), _ = X(
    () => ({
      get disableCursor() {
        return !!z.disableCursor;
      },
      getPanelStyles: E,
      id: b,
      orientation: u,
      registerPanel: (T) => {
        const I = w.current;
        return I.panels = Xt(u, [
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
        return I.separators = Xt(u, [
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
        const A = Yn(b), x = Ae(b);
        A && x && Ie(A, {
          ...x,
          derivedPanelConstraints: Yt(A)
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
    [E, b, g, u, z]
  ), N = k(null);
  return Oe(() => {
    const T = P.current;
    if (T === null)
      return;
    const I = w.current;
    let R;
    if (z.defaultLayout !== void 0 && Object.keys(z.defaultLayout).length === I.panels.length) {
      R = {};
      for (const H of I.panels) {
        const Z = z.defaultLayout[H.id];
        Z !== void 0 && (R[H.id] = Z);
      }
    }
    const A = {
      disabled: !!o,
      element: T,
      id: b,
      mutableState: {
        defaultLayout: R,
        disableCursor: !!z.disableCursor,
        expandedPanelSizes: w.current.lastExpandedPanelSizes,
        layouts: w.current.layouts
      },
      orientation: u,
      panels: I.panels,
      resizeTargetMinimumSize: I.resizeTargetMinimumSize,
      separators: I.separators
    };
    N.current = A;
    const x = yc(A), { defaultLayoutDeferred: U, derivedPanelConstraints: te, layout: J } = Ae(A.id, !0);
    !U && te.length > 0 && (p(J), v(J, !1));
    const re = gn(b, (H) => {
      const { defaultLayoutDeferred: Z, derivedPanelConstraints: ue, layout: M } = H.next;
      if (Z || ue.length === 0)
        return;
      const $ = A.panels.map(({ id: W }) => W).join(",");
      A.mutableState.layouts[$] = M, ue.forEach((W) => {
        if (W.collapsible) {
          const { layout: q } = H.prev ?? {};
          if (q) {
            const se = fe(
              W.collapsedSize,
              M[W.panelId]
            ), ae = fe(
              W.collapsedSize,
              q[W.panelId]
            );
            se && !ae && (A.mutableState.expandedPanelSizes[W.panelId] = q[W.panelId]);
          }
        }
      });
      const B = _e().state !== "active";
      p(M), B && v(M, H.isUserInteraction);
    });
    return () => {
      N.current = null, x(), re();
    };
  }, [
    o,
    b,
    v,
    p,
    u,
    S,
    z
  ]), F(() => {
    const T = N.current;
    T && (T.mutableState.defaultLayout = n, T.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ y(ao.Provider, { value: _, children: /* @__PURE__ */ y(
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
so.displayName = "Group";
function wn() {
  const e = an(ao);
  return Q(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function wc(e, t) {
  const { id: n } = wn(), r = k({
    collapse: Ot,
    expand: Ot,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Ot
  });
  rn(t, () => r.current, []), Oe(() => {
    Object.assign(
      r.current,
      no({ groupId: n, panelId: e })
    );
  });
}
function Qt({
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
  ...h
}) {
  const p = !!i, v = yn(i), b = Sn({
    disabled: a
  }), P = k(null), S = vn(P, s), {
    getPanelStyles: g,
    id: w,
    orientation: L,
    registerPanel: E,
    updatePanelProps: z
  } = wn(), _ = d !== null, N = nt(
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
        idIsStable: p,
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
    p,
    l,
    u,
    N,
    E,
    b
  ]), F(() => {
    z(v, { disabled: a });
  }, [a, v, z]), wc(v, f);
  const T = () => {
    const A = g(w, v);
    if (A)
      return JSON.stringify(A);
  }, I = go(
    (A) => gn(w, A),
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
      ...h,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": v,
      id: v,
      ref: S,
      style: {
        ...Pc,
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
Qt.displayName = "Panel";
const Pc = {
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
function Rc({
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
  const i = yn(a), l = Sn({
    disabled: n,
    disableDoubleClick: r
  }), [u, d] = C({}), [f, m] = C("inactive"), [h, p] = C(!1), v = k(null), b = vn(v, o), {
    disableCursor: P,
    id: S,
    orientation: g,
    registerSeparator: w,
    updateSeparatorProps: L
  } = wn(), E = g === "horizontal" ? "vertical" : "horizontal";
  Oe(() => {
    const N = v.current;
    if (N !== null) {
      const T = {
        disabled: l.disabled,
        disableDoubleClick: l.disableDoubleClick,
        element: N,
        id: i
      }, I = w(T), R = ec(
        (x) => {
          m(
            x.next.state !== "inactive" && x.next.hitRegions.some(
              (U) => U.separator === T
            ) ? x.next.state : "inactive"
          );
        }
      ), A = gn(
        S,
        (x) => {
          const { derivedPanelConstraints: U, layout: te, separatorToPanels: J } = x.next, re = J.get(T);
          if (re) {
            const H = re[0], Z = re.indexOf(H);
            d(
              Rc({
                layout: te,
                panelConstraints: U,
                panelId: H.id,
                panelIndex: Z
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
  let z;
  n && !P && (z = "not-allowed");
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
        h ? _ = "focus" : _ = f;
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
      onBlur: () => p(!1),
      onFocus: () => p(!0),
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
io.displayName = "Separator";
const Pn = 30, Rn = 65, it = 50, Tc = 100 - Rn, Ic = 100 - Pn;
function Ec(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Rn, Math.max(Pn, t)) : it;
}
function Tn(e) {
  return 100 - e;
}
function $e(e) {
  return `${e}%`;
}
const In = "reader-document", ct = "reader-assistant", co = "retainpdf.reader.ai-split-layout.v1", Mc = {
  [In]: Tn(it),
  [ct]: it
};
function En(e) {
  const t = Ec(e == null ? void 0 : e[ct]);
  return {
    [In]: Tn(t),
    [ct]: t
  };
}
function Ac() {
  try {
    const e = JSON.parse(localStorage.getItem(co) || "null");
    return En(e);
  } catch {
    return Mc;
  }
}
function kc(e) {
  try {
    localStorage.setItem(co, JSON.stringify(En(e)));
  } catch {
  }
}
function Ft(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = En(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[ct]}vw`
  );
}
function Lc() {
  const e = k(null), [t] = C(Ac);
  De(() => {
    const o = e.current;
    return Ft(o, t), () => {
      var a;
      (a = o == null ? void 0 : o.closest(".reader-react-root")) == null || a.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = O((o) => {
    Ft(e.current, o);
  }, []), r = O((o, a) => {
    Ft(e.current, o), a.isUserInteraction && kc(o);
  }, []);
  return /* @__PURE__ */ j(
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
          Qt,
          {
            id: In,
            defaultSize: $e(Tn(it)),
            minSize: $e(Tc),
            maxSize: $e(Ic)
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
          Qt,
          {
            id: ct,
            defaultSize: $e(it),
            minSize: $e(Pn),
            maxSize: $e(Rn)
          }
        )
      ]
    }
  );
}
function Cc({
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
function _c({
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
function Nc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ y(_c, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ j(tn, { children: [
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
function xc(e) {
  if (e.selectionType !== "region") return null;
  const t = `${e.region.source.text || ""}`.trim(), n = `${e.region.translated.text || ""}`.trim();
  return !t || !n || t === n ? null : { source: t, translated: n };
}
function Dc(e, t) {
  const n = e.selectionType === "text" ? "text" : e.kind, r = xc(e), o = r != null, a = o && t ? t : e.pane, s = r ? r[a] : e.selectionType === "text" ? e.quote : gr(e.region, a), c = e.selectionType === "region" ? $t(e.region, a).page : e.page;
  return {
    kind: n,
    pane: a,
    page: c,
    text: s,
    copyValue: n === "formula" ? Lo(s) : s,
    canSwitch: o,
    showPeek: o && a !== e.pane
  };
}
const ur = {
  source: "原文",
  translated: "译文"
}, dr = 190, fr = 16;
function zc() {
  const e = typeof window > "u" ? 800 : window.innerWidth;
  if (typeof document > "u") return e;
  const t = document.querySelector(`.${Tr}`), n = (t == null ? void 0 : t.getBoundingClientRect().width) ?? 0;
  return n > 0 ? n : e;
}
function Oc(e, t) {
  const n = fr + dr, r = t - fr - dr;
  return r < n ? t / 2 : Math.min(Math.max(n, e), r);
}
async function Fc(e) {
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
  onAskAi: n
}) {
  const [r, o] = C(!1), [a, s] = C(null), c = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if (F(() => s(null), [c]), F(() => o(!1), [c, a]), !e)
    return null;
  const i = Dc(e, a), l = typeof window < "u" ? window.innerHeight : 600, u = e.rect.left + e.rect.width / 2, d = Oc(u, zc()), f = e.rect.top > (i.showPeek ? 220 : 72), m = f ? Math.max(12, e.rect.top - 8) : Math.min(l - 12, e.rect.top + e.rect.height + 8), h = f ? "above" : "below", p = i.kind, v = p === "formula" ? "公式" : p === "table" ? "表格" : p === "figure" ? "图片" : p === "text" ? "文字" : "区域", b = i.copyValue, P = p === "formula" ? Fo : p === "table" ? $o : p === "text" ? jo : Uo;
  return /* @__PURE__ */ j(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${h} reader-sel-pop--region`,
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
                  children: ur[S]
                },
                S
              )) }) : (
                // 两侧拿不到各自的文本时不画开关 —— 画一个点了不动的按钮比没有更糟。
                /* @__PURE__ */ y("span", { children: ur[e.pane] })
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
                      await Fc(b), o(!0), window.setTimeout(() => o(!1), 1400);
                    } catch (S) {
                      console.warn("[reader-selection] copy failed", S);
                    }
                  },
                  children: [
                    r ? /* @__PURE__ */ y(Bo, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ y(Ho, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                    /* @__PURE__ */ y("span", { children: r ? "已复制" : p === "formula" ? "复制 LaTeX" : "复制" })
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
                      /* @__PURE__ */ y(wr, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
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
function jc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Uc() {
  const [e, t] = C(!1), n = hr(), r = k(null);
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
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || jc(a.target)) return;
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
        children: /* @__PURE__ */ y(Wo, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
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
          /* @__PURE__ */ y("div", { className: "reader-react-shortcuts-body", children: Js.map((o) => /* @__PURE__ */ j("section", { className: "reader-react-shortcuts-group", children: [
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
const Bc = ["source", "sideBySide", "translated"], Hc = { source: "", translated: "", sideBySide: "" };
function Wc(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = yt(e.sourceUrl), n = yt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return ia({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function Vc(e) {
  const [t, n] = C(() => /* @__PURE__ */ new Set()), r = X(
    () => e ? Wc(e) : Hc,
    [e]
  ), o = X(
    () => Bc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = O(async (s) => {
    if (!e) return;
    const c = yt(r[s]);
    if (!(!c || t.has(s)))
      try {
        const i = e.jobId ? sa(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await ca(
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
        la(l), n((u) => {
          const d = new Set(u);
          return d.delete(s), d;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const Jc = {
  source: yr,
  sideBySide: vr,
  translated: Sr
}, qc = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function Kc(e) {
  const t = ut(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = Vc(n);
  return /* @__PURE__ */ j("div", { className: "reader-download-actions", role: "group", "aria-label": "下载 PDF", children: [
    /* @__PURE__ */ y("span", { className: "reader-download-actions-prefix", "aria-hidden": !0, children: /* @__PURE__ */ y(Vo, { size: 14, strokeWidth: 2.2 }) }),
    o.map((c) => {
      const i = Po[c], l = yt(r[c]), u = a.has(c), d = !!l && !u, f = d ? "" : Ro(c, r), m = Jc[c];
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
                  /* @__PURE__ */ y("span", { className: "reader-download-action-label", children: qc[c] })
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
function Gc(e) {
  const t = ut(), n = Li(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? lt, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), c = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, l = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), u = Ja(a), d = a > Er + 1e-3, f = a < Mr - 1e-3, m = tt(), h = "50%（半屏，对照铺满）", [p, v] = C(!1), [b, P] = C(`${c}`);
  F(() => {
    p || P(`${Math.min(Math.max(c, 1), Math.max(i, 1))}`);
  }, [c, i, p]);
  const S = () => {
    if (v(!1), !l || i <= 0)
      return;
    const g = Number(`${b}`.trim());
    l(Pt(g, i));
  };
  return /* @__PURE__ */ j("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    o ? /* @__PURE__ */ y("div", { className: "reader-react-hud-group reader-react-hud-modes", children: o }) : null,
    /* @__PURE__ */ y("div", { className: "reader-react-hud-group", "aria-label": "页码", children: p ? /* @__PURE__ */ j(
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
          "aria-label": `重置为${h}`,
          title: h,
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
    /* @__PURE__ */ y("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ y(Uc, {}) })
  ] });
}
function mr(e) {
  var t, n;
  return Lr(e == null ? void 0 : e.assistantPanel) ? e.assistantPanel : ((t = e == null ? void 0 : e.splitLayout) == null ? void 0 : t.left) === "markdown" || ((n = e == null ? void 0 : e.splitLayout) == null ? void 0 : n.right) === "markdown" ? "markdown" : null;
}
function Zc(e) {
  const [t, n] = C(() => ({
    scope: e,
    panel: mr(Te(e))
  }));
  F(() => {
    n((o) => o.scope === e ? o : {
      scope: e,
      panel: mr(Te(e))
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
const en = "download-toast";
function Yc({
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
function Xc(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: o = "等待响应...",
    percent: a = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    jt.dismiss(en);
    return;
  }
  jt.custom(
    () => /* @__PURE__ */ y(Yc, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: en, duration: 1 / 0 }
  );
}
function Qc() {
  const e = O((t) => {
    t && (t.setState = Xc, t.hide = () => jt.dismiss(en));
  }, []);
  return /* @__PURE__ */ j(tn, { children: [
    /* @__PURE__ */ y(xo, { position: "bottom-right" }),
    /* @__PURE__ */ y("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function lo(e) {
  const t = k(!1);
  return e && (t.current = !0), t.current;
}
function el(e, t) {
  const n = e === t;
  return { open: n, mounted: lo(n) };
}
function tl({
  panel: e,
  active: t,
  context: n
}) {
  var i;
  const r = t === e.id, o = lo(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = pe(), c = (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, { ...n, open: r });
  return c == null ? null : /* @__PURE__ */ y(
    Cc,
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
const nl = yo(() => import("./ReaderMarkdownPanel-B7xMv9Ld.js").then((e) => ({ default: e.ReaderMarkdownPanel })));
function rl(e) {
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
function ol(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function al() {
  const e = Ws(), { boot: t, panes: n, sessionFiles: r, session: o } = e, a = Zc(e.viewStateKey), s = a.panel, c = a.setPanel, [i, l] = C(null), [u, d] = C(null), [f, m] = C(null), [h, p] = C(!1), v = k(null), b = s !== null, P = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, S = rl({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: P,
    liveTranslationVisible: h,
    assistantOpen: b,
    assistantPdfPane: i
  }), g = O(() => m(null), []), w = f ? vo({ jobId: o.jobId, name: f, onClose: g }) : null, L = zs({
    hasOverlayContent: P,
    connection: e.liveTranslation.connection,
    showSource: S.showSource,
    liveTranslationVisible: h,
    assistantOpen: b
  }), E = S.sourceViewOnly, z = S.visibleMode;
  F(() => {
    d(null), m(null), p(!1);
  }, [e.viewStateKey]), F(() => {
    e.session.jobTerminal && p(!1);
  }, [e.session.jobTerminal]), F(() => {
    l(null);
  }, [a.scope]), F(() => {
    if (!(t.loading || t.failed)) {
      if (v.current !== e.viewStateKey) {
        v.current = e.viewStateKey;
        const H = Te(e.viewStateKey), Z = E ? "source" : H == null ? void 0 : H.mode;
        Z && Z !== e.mode && e.setModeKeepingPage(Z);
        return;
      }
      Et(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, E]);
  const _ = s || (e.mode === "compare" ? "compare" : "reading"), N = el(s, "markdown");
  Gs({
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
    c(null), l(null), d(null);
  }, []), I = O((H) => {
    l(null);
    const Z = ol(H, e.liveTranslationAvailable);
    Z !== null && p(Z), e.setModeKeepingPage(H);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), R = X(() => L.sourcePaneToggle ? /* @__PURE__ */ y(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${h ? " is-active" : ""}`,
      onClick: () => p((H) => !H),
      "aria-pressed": h,
      title: h ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ) : null, [L.sourcePaneToggle, h]), A = O((H) => {
    c(H), l(null);
  }, []), x = X(() => ({
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
    const Z = H.pane === "translated" && !E ? "translated" : "source", ue = Co(H);
    d((M) => ({ text: ue, token: ((M == null ? void 0 : M.token) ?? 0) + 1 })), c("terminal"), l(Z), e.clearSelection();
  }, [e.clearSelection, E]), te = X(() => ({
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
  ]), J = X(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), re = [
    $a,
    `is-workspace-${_}`,
    b ? "is-assistant-open" : "",
    S.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ y(ki, { value: te, hud: J, children: /* @__PURE__ */ j("div", { className: re, "data-reader-engine": "react-pdf", "data-reader-workspace": _, children: [
    /* @__PURE__ */ y(Nc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ j("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ y(Kc, {}),
      /* @__PURE__ */ y(ti, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ y(
      Fi,
      {
        mode: z,
        documentReady: !!o.jobId,
        sourceViewOnly: E,
        onModeChange: I,
        liveTranslation: L.topBarPill ? {
          visible: h,
          state: e.liveTranslation,
          onToggle: () => p((H) => !H)
        } : null,
        compareDegraded: S.compareDegradedByAssistant,
        onRestoreCompare: T
      }
    ),
    /* @__PURE__ */ y(Wi, { active: s }),
    b ? /* @__PURE__ */ y(Lc, {}) : null,
    /* @__PURE__ */ y(xi, { paneComposition: S, markdownSplit: N.open, assistantSplit: b, liveTranslation: e.liveTranslation, sourcePaneAction: R }),
    w,
    e.showHud ? /* @__PURE__ */ y(
      Gc,
      {
        mode: z,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ j(bo, { fallback: null, children: [
      Wr.map((H) => /* @__PURE__ */ y(
        tl,
        {
          panel: H,
          active: s,
          context: x
        },
        H.id
      )),
      N.mounted ? /* @__PURE__ */ y(nl, { open: N.open, jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: T }) : null
    ] }),
    /* @__PURE__ */ y($c, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: U }),
    /* @__PURE__ */ y(Qc, {})
  ] }) });
}
function Pl() {
  return /* @__PURE__ */ y(al, {});
}
export {
  Pl as R,
  al as a,
  Cc as b,
  Sl as d,
  vl as f,
  wl as r
};
//# sourceMappingURL=ReaderApp-B1Rbl-mC.js.map
