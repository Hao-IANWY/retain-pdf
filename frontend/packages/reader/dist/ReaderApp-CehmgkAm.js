var wn = (e) => {
  throw TypeError(e);
};
var Pn = (e, t, n) => t.has(e) || wn("Cannot " + n);
var qe = (e, t, n) => (Pn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Rn = (e, t, n) => t.has(e) ? wn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), In = (e, t, n, r) => (Pn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as U, jsx as w, Fragment as Gt } from "react/jsx-runtime";
import { useMemo as G, useState as L, useEffect as j, useCallback as F, useRef as _, useLayoutEffect as ze, memo as Kt, forwardRef as so, useImperativeHandle as Zt, createContext as Yt, useContext as Xt, useSyncExternalStore as io, useId as ir, Suspense as co, lazy as lo } from "react";
import { requireAdapter as Je, getReaderAdapters as de, renderReaderBoardSlot as uo } from "./adapters.js";
import { resolveReaderDownloadName as fo, resolveReaderDownloadUrls as mo, READER_PROGRESS_COPY as we, trimString as gt, READER_DOWNLOAD_ACTIONS as ho, disabledReason as po } from "./runtime/state.js";
import "@retainpdf/api/conversations";
import { r as go, b as bo } from "./page-config-Ct7qR5rm.js";
import { c as yo, n as vo, f as Tt, j as Tn, a as So, b as wo, h as zt, p as Qt, d as cr, k as En, i as Po } from "./reader-regions-mTcIqcg0.js";
import { isReaderTransportError as Ro, createReaderTransportError as Io } from "./contracts.js";
import { toast as Nt, Toaster as To } from "sonner";
import { X as lr, Radio as Eo, FileText as ur, Columns2 as dr, Languages as fr, PanelRightClose as Mo, FileCode2 as Ao, Sparkles as _o, Keyboard as ko, Download as Lo } from "lucide-react";
import { pdfjs as Co, Page as Do, Document as zo } from "react-pdf";
import { e as No, m as xo, a as Oo } from "./markdown-math-XkF5urpn.js";
const Fo = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, $o = "", jo = Object.freeze({
  progress: "retainpdf-reader-progress"
}), Uo = (e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, Yc = (...e) => {
  var n;
  return (((n = de()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Ee = () => Je("defaultReaderDataPort"), Mn = () => Je("defaultReaderPageConfigPort"), Xc = {
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
}, mr = {
  messageTargetOrigin: () => Mn().messageTargetOrigin(),
  readerJobId: () => Mn().readerJobId()
}, Bo = () => {
  var e;
  return ((e = de()) == null ? void 0 : e.liveTranslation) ?? null;
}, et = () => {
  var t;
  const e = de();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, en = () => {
  const e = de();
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
}, Ho = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, Wo = () => {
  var e, t;
  return ((t = (e = de()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, Jo = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, Vo = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? fo(...e);
}, qo = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? mo(...e);
}, Go = (...e) => Je("downloadProtectedResource")(...e), Ko = (...e) => Je("failDownloadToast")(...e), Qc = (e, t) => Je("resolveMarkdownAssetUrl")(e, t), Zo = "/api/v1";
function Yo() {
  const e = () => {
    var r;
    return go(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = L(e);
  return j(() => {
    var l, i, c, u;
    const r = () => n(e()), o = (i = (l = globalThis.history) == null ? void 0 : l.pushState) == null ? void 0 : i.bind(globalThis.history), a = (u = (c = globalThis.history) == null ? void 0 : c.replaceState) == null ? void 0 : u.bind(globalThis.history);
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
function Xo() {
  const e = Yo(), t = G(() => Jo(mr), [e]), n = G(() => Wo(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function Qo(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: o,
    documentIdRef: a,
    sessionJobIdRef: s,
    switchToSourceMode: l
  } = e, [i, c] = L({
    documentId: "",
    jobId: ""
  }), [u, d] = L({
    documentId: "",
    jobId: ""
  }), f = i.documentId === t ? i.jobId : "", m = u.documentId === t ? u.jobId : "", p = n || f, [g, v] = L({
    jobId: "",
    documentId: ""
  }), b = g.jobId === p ? g.documentId : "", P = t || b, S = !!t && !p, [h, y] = L(null), M = (h == null ? void 0 : h.sessionIdentity) === r && h.documentId === P ? h : null, A = S || !!M, N = F((D) => {
    const R = `${D.documentId || ""}`.trim();
    if (!R || a.current && a.current !== R) return;
    if (!a.current && s.current)
      v({
        jobId: s.current,
        documentId: R
      });
    else if (!a.current)
      return;
    const E = `${D.revision || ""}`.trim() || `${Date.now()}`;
    y({
      documentId: R,
      revision: E,
      sessionIdentity: o.current
    }), l();
  }, []);
  j(() => {
    y((D) => D && D.sessionIdentity !== r ? null : D);
  }, [r]);
  const C = F((D) => {
    switch (D.type) {
      case "resolved-document-job":
        c({ documentId: D.documentId, jobId: D.jobId });
        break;
      case "cleared-resolved-document-job":
        c({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        d({ documentId: D.documentId, jobId: D.jobId });
        break;
      case "resolved-job-document":
        v((R) => R.jobId === D.jobId && R.documentId === D.documentId ? R : { jobId: D.jobId, documentId: D.documentId });
        break;
      case "committed-source":
        y({
          documentId: D.documentId,
          revision: D.revision,
          sessionIdentity: D.sessionIdentity
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
    sessionJobId: p,
    resolvedJobDocument: g,
    setResolvedJobDocument: v,
    jobDocumentId: b,
    documentId: P,
    sourceOnly: S,
    committedDocumentSource: h,
    setCommittedDocumentSource: y,
    activeCommittedDocumentSource: M,
    sourceViewOnly: A,
    refreshCommittedDocument: N,
    applyIdentityEvent: C
  };
}
const ea = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function An(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function ta(e) {
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
function _n(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return Uo(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function na(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function ra(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !na(a, t))
      return a.replace(/\.pdf$/i, "");
  }
  return "";
}
function xt({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: jo.progress,
        stage: n,
        percent: e,
        text: t
      },
      mr.messageTargetOrigin()
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
  }), xt({ percent: t, text: n, stage: r });
}
function oa(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [l, i] = L(null), [c, u] = L(null), [d, f] = L(""), [m, p] = L(0), g = d === n ? l : null, v = d === n ? c : null, b = An(g), P = ea.has(b), S = F(() => {
    p((C) => C + 1);
  }, []), h = F((C) => {
    i(C.jobPayload), u(C.manifestPayload), f(C.sessionIdentity);
  }, []), y = F((C) => {
    i(null), u(null), f(C);
  }, []), M = _(""), A = _(""), N = F(async () => {
    const C = o.current;
    if (!C || M.current === C) return;
    const D = en().loadJobPayload;
    if (typeof D != "function") return;
    const R = a.current.value;
    M.current = C;
    try {
      const E = await D(C);
      if (s.current || a.current.value !== R || o.current !== C || !E || typeof E != "object")
        return;
      const I = An(E);
      i(E), f(r.current), I === "succeeded" && A.current !== C && (A.current = C, p((T) => T + 1));
    } catch {
    } finally {
      M.current === C && (M.current = "");
    }
  }, []);
  return j(() => {
    A.current = "";
  }, [n]), j(() => {
    if (!t || P || !g) return;
    const C = window.setInterval(() => {
      N();
    }, 1e3);
    return () => window.clearInterval(C);
  }, [P, N, g, t]), {
    jobPayload: l,
    setJobPayload: i,
    manifestPayload: c,
    setManifestPayload: u,
    payloadSessionIdentity: d,
    setPayloadSessionIdentity: f,
    scopedJobPayload: g,
    scopedManifestPayload: v,
    jobStatus: b,
    jobTerminal: P,
    jobRefreshRevision: m,
    refreshJobArtifacts: S,
    refreshJobStatus: N,
    publishPayload: h,
    clearPayload: y
  };
}
function Ot(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function aa(e, t) {
  e(t), Ot(t);
}
function sa(e) {
  const [t, n] = L(e ? "source" : "compare"), r = F((a) => {
    e && a !== "source" || (n(a), Ot(a));
  }, [e]), o = F((a) => {
    aa(n, a);
  }, []);
  return j(() => (e && document.documentElement.classList.add("reader-source-only"), Ot(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: o };
}
function kn(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function ia(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: kn(n.active_job_id),
    activeVersionId: kn(n.active_version_id)
  };
}
function ca(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function la(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function ua(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function da(e) {
  return e ? { data: e.data.slice() } : null;
}
const fa = 2, he = /* @__PURE__ */ new Map();
function Ft(e, t) {
  he.delete(e), he.set(e, t);
}
function ma(e) {
  if (he.size < fa) return;
  const t = he.keys().next().value;
  t && he.delete(t);
}
function Et(e) {
  const t = `${e || ""}`.trim();
  if (!t || !he.has(t)) return null;
  const n = he.get(t);
  return Ft(t, n), n;
}
async function hr(e, t = et().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (he.has(r)) {
    const l = he.get(r);
    return Ft(r, l), l;
  }
  const o = await t(r, { signal: n.signal });
  if (!o.ok) {
    const l = new Error(`读取 PDF 失败 (${o.status})`);
    throw l.status = o.status, l;
  }
  const a = await o.arrayBuffer(), s = { data: new Uint8Array(a) };
  return he.has(r) ? Ft(r, s) : (ma(), he.set(r, s)), s;
}
function ha(e = "", t = null) {
  const [n, r] = L(
    () => t || Et(e)
  ), [o, a] = L(
    () => !!`${e || ""}`.trim() && !t && !Et(e)
  ), [s, l] = L("");
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
    return a(!0), l(""), r(null), hr(i).then((d) => {
      u || (r(d), a(!1));
    }).catch((d) => {
      u || (r(null), a(!1), l((d == null ? void 0 : d.message) || String(d)));
    }), () => {
      u = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function pa(e) {
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
async function $t(e) {
  const { url: t, label: n, percentStart: r, percentEnd: o, fence: a, setBoot: s } = e;
  if (!t || a.isInactive())
    return null;
  bt(s, r, n, "download");
  const l = await hr(t, et().fetchProtected, {
    signal: a.signal
  });
  return a.isInactive() ? null : (bt(s, o, n, "download"), l);
}
async function ga(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: o } = e;
  bt(o, 25, "正在下载 PDF…", "download");
  const a = [];
  let s = null, l = null;
  return t && a.push(
    $t({
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
    $t({
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
function ba(e) {
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
    jobRefreshRevision: p,
    sessionEpochRef: g,
    closingRef: v,
    activeLoadAbortRef: b
  } = e, [P, S] = L(""), [h, y] = L(""), [M, A] = L(null), [N, C] = L(null), [D, R] = L(!1), [E, I] = L(""), [T, x] = L([]), [z, O] = L(() => ({
    source: null,
    translated: null
  })), [W, ae] = L(
    dt
  ), [oe, $] = L({
    loading: !0,
    percent: 4,
    text: we.boot,
    stage: "progress",
    failed: !1
  });
  return j(() => {
    const B = new AbortController(), te = g.current.value, re = pa({
      sessionEpochRef: g,
      closingRef: v,
      abort: B,
      sessionEpoch: te
    });
    b.current = B;
    const K = en();
    if (v.current)
      return B.abort(), () => {
        b.current === B && (b.current = null);
      };
    function Y(Q, ee) {
      re.markFailed(), $({
        loading: !1,
        percent: 100,
        text: Q,
        stage: "failed",
        failed: !0
      }), xt({ percent: 100, text: ee, stage: "failed" });
    }
    function ie() {
      R(!0), $({
        loading: !1,
        percent: 100,
        text: we.ready,
        stage: "ready",
        failed: !1
      }), xt({ percent: 100, text: we.ready, stage: "ready" });
    }
    function fe() {
      return c != null && c.documentId ? _n(
        c.documentId,
        c.revision
      ) : Fo() ? $o : K.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function _e() {
      let Q = { activeJobId: "", activeVersionId: "" };
      try {
        const ge = await K.fetchProtected(
          K.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (ge != null && ge.ok) {
          const Te = await ge.json().catch(() => null);
          Q = ia(Te);
        }
      } catch {
      }
      const ee = ca({
        link: Q,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!c
      });
      if (ee.kind === "follow-active-job") {
        if (re.isInactive()) return;
        u({
          type: "resolved-document-job",
          documentId: r,
          jobId: ee.jobId
        }), ee.activeVersionId ? (c || u({
          type: "committed-source",
          documentId: r,
          revision: ee.activeVersionId,
          sessionIdentity: i
        }), m("source")) : m("compare");
        return;
      }
      if (ee.kind === "open-committed-source") {
        if (re.isInactive()) return;
        u({
          type: "committed-source",
          documentId: r,
          revision: ee.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const ne = fe();
      if (re.isInactive()) return;
      S(ne), y(""), I(""), f(i);
      const pe = await $t({
        url: ne,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: re,
        setBoot: $
      });
      if (!re.isInactive()) {
        if (!pe) {
          Y("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        A(pe), ie();
      }
    }
    async function ct() {
      var Oe;
      const Q = await ((Oe = K.loadSessionSnapshot) == null ? void 0 : Oe.call(K, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: c,
        includeOptionalArtifacts: !c
      })), ee = Q ? {
        jobPayload: Q.sourcePayload,
        manifestPayload: Q.manifestPayload,
        readerMetadata: Q.readerMetadata,
        regionsPayload: Q.regions,
        readerErrors: Q.readerErrors
      } : await K.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !c
      });
      if (re.isInactive()) return;
      let ne = null;
      if (n && !r) {
        try {
          ne = await K.fetchDocumentByJobId(Zo, t);
        } catch {
        }
        if (re.isInactive()) return;
      }
      const pe = ta(ee.jobPayload) || `${(ne == null ? void 0 : ne.document_id) || ""}`.trim();
      pe && !r && u({
        type: "resolved-job-document",
        jobId: t,
        documentId: pe
      });
      const ge = la({
        payloadDocumentId: pe,
        linkedActiveJobId: `${(ne == null ? void 0 : ne.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(ne == null ? void 0 : ne.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!c
      });
      if (ge.kind === "restore-committed-source") {
        if (re.isInactive()) return;
        u({
          type: "committed-source",
          documentId: ge.documentId,
          revision: ge.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const Te = K.resolveReaderSourcePdf(ee.manifestPayload), It = K.resolveReaderTranslatedPdfUrl(ee.jobPayload, ee.manifestPayload), lt = typeof Te == "string" ? Te : K.resolveReaderArtifactUrl(Te), ut = r || pe, Ve = c != null && c.documentId ? _n(
        c.documentId,
        c.revision
      ) : lt || (ut ? K.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(ut)}/source.pdf`) : ""), ve = c ? "" : It || "";
      if (S(Ve || ""), y(ve), I(ra(ee.jobPayload, t)), d({
        jobPayload: ee.jobPayload || null,
        manifestPayload: ee.manifestPayload || null,
        sessionIdentity: i
      }), x(c ? [] : yo(ee.regionsPayload)), O(c ? { source: null, translated: null } : vo(ee.readerMetadata)), ae(c ? dt : ee.readerErrors ?? dt), !Ve && !ve) {
        Y(we.failed, we.failed);
        return;
      }
      const Se = await ga({
        sourceFinal: Ve || "",
        translatedFinal: ve,
        fence: re,
        setBoot: $
      });
      if (Se.status !== "inactive") {
        if (Se.status === "incomplete") {
          Y("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        A(Se.sourceBytes), C(Se.translatedBytes), ie();
      }
    }
    async function Rt() {
      R(!1), A(null), C(null), x([]), O({ source: null, translated: null }), ae(dt), bt($, 8, we.metadata, "metadata");
      try {
        if (s) {
          await _e();
          return;
        }
        if (!t) {
          Y(we.failed, we.failed);
          return;
        }
        await ct();
      } catch (Q) {
        if (re.isClosedOrStale() || (Q == null ? void 0 : Q.name) === "AbortError") return;
        re.markFailed();
        const ee = Number(Q == null ? void 0 : Q.status);
        if (ua({
          status: ee,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          u({ type: "missing-document-job", documentId: r, jobId: t }), u({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const ne = Q instanceof Error ? Q.message : we.failed;
        Y(ne, ne);
      }
    }
    return Rt(), () => {
      B.abort(), b.current === B && (b.current = null);
    };
  }, [t, r, o, a, s, l, c, p, n, i, u, d, f, m]), {
    sourceUrl: P,
    translatedUrl: h,
    sourceFile: M,
    translatedFile: N,
    assetsReady: D,
    title: E,
    regions: T,
    readerMetadata: z,
    readerErrors: W,
    boot: oe
  };
}
function ya() {
  const e = _(!1), t = _(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = Xo(), s = _({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const l = _(a), i = _(""), c = _(""), u = _(() => {
  }), d = F(() => u.current(), []), f = Qo({
    routeDocumentId: o,
    jobId: r,
    sessionIdentity: a,
    sessionIdentityRef: l,
    documentIdRef: i,
    sessionJobIdRef: c,
    switchToSourceMode: d
  }), {
    sessionJobId: m,
    documentId: p,
    sourceOnly: g,
    sourceViewOnly: v
  } = f, { mode: b, setMode: P, switchSessionMode: S } = sa(v);
  u.current = () => {
    S("source");
  }, l.current = a, i.current = p, c.current = m;
  const h = oa({
    sessionJobId: m,
    sessionIdentity: a,
    sessionIdentityRef: l,
    sessionJobIdRef: c,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: y,
    scopedManifestPayload: M,
    jobStatus: A,
    jobTerminal: N,
    jobRefreshRevision: C,
    refreshJobArtifacts: D,
    refreshJobStatus: R
  } = h, E = ba({
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
    publishPayload: h.publishPayload,
    clearPayload: h.clearPayload,
    switchSessionMode: S,
    jobRefreshRevision: C,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), I = F(() => {
    var x;
    e.current = !0, (x = t.current) == null || x.abort();
  }, []), T = G(
    () => ({
      fetchProtected: en().fetchProtected,
      jobId: m,
      jobPayload: y,
      manifestPayload: M,
      sourceUrl: E.sourceUrl,
      translatedUrl: E.translatedUrl,
      sourceOnly: v
    }),
    [m, y, M, E.sourceUrl, E.translatedUrl, v]
  );
  return {
    jobId: m,
    jobStatus: A,
    workflow: `${(y == null ? void 0 : y.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: N,
    documentId: p,
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
    refreshJobArtifacts: D,
    refreshJobStatus: R,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: I
  };
}
const va = 160, Sa = 8, wa = 0;
function Pa() {
  const e = _(null), [t, n] = L(null), [r, o] = L(wa), a = F((s) => {
    e.current = s, n(s);
  }, []);
  return j(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const l = (c) => {
      !Number.isFinite(c) || c < va || o((u) => Math.abs(u - c) < Sa ? u : c);
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
function Ra(e) {
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
function Ia(e, t) {
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
  const [d, f] = L(() => ({
    identity: c,
    pages: Mt
  })), [m, p] = L(() => ({ identity: c, tick: 0 })), g = d.identity === c ? d.pages : Mt, v = m.identity === c ? m.tick : 0, b = Ra({
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    hasSource: !!l || !!a,
    hasTranslated: !!i
  }), { primaryPane: P } = b, S = F((R, E) => {
    u.current === c && f((I) => {
      const T = I.identity === c ? I.pages : Mt;
      return T[E] === R && I.identity === c ? I : {
        identity: c,
        pages: { ...T, [E]: R }
      };
    });
  }, [c]), h = _(null), y = F(() => {
    h.current && clearTimeout(h.current);
    const R = c;
    h.current = setTimeout(() => {
      h.current = null, u.current === R && p((E) => ({
        identity: R,
        tick: E.identity === R ? E.tick + 1 : 1
      }));
    }, 60);
  }, [c]);
  j(() => (h.current && (clearTimeout(h.current), h.current = null), f((R) => R.identity === c && R.pages.source === 0 && R.pages.translated === 0 ? R : { identity: c, pages: { source: 0, translated: 0 } }), p((R) => R.identity === c && R.tick === 0 ? R : { identity: c, tick: 0 }), () => {
    h.current && (clearTimeout(h.current), h.current = null);
  }), [c]);
  const M = G(
    () => Math.max(g.source, g.translated),
    [g]
  ), A = P === "translated" ? g.translated : g.source || g.translated, N = t == null ? void 0 : t.userZoom, C = t == null ? void 0 : t.shellWidth, D = `${c}-${v}-${N}-${n}-${g.source}-${g.translated}-${C}`;
  return {
    ...b,
    numPagesByPane: g,
    hudNumPages: M,
    primaryNumPages: A,
    metricsTick: v,
    onNumPages: S,
    onMetrics: y,
    rowSyncRevision: D
  };
}
const He = "data-reader-page", tt = "data-reader-pane", tn = "data-natural-height", Ta = "reader-react-root", Ea = "reader-react-grid", Ma = "reader-react-scroll-shell", Aa = "reader-react-pdf-pane", pr = "reader-react-pdf-page", yt = "reader-react-pdf-page-placeholder", nn = "reader-react-pdf-page-slot";
function vt(e, t) {
  const n = e != null ? `[${He}="${e}"]` : `[${He}]`;
  return t ? `${n}[${tt}="${t}"]` : n;
}
function _a() {
  return `.${nn}[${He}]`;
}
function rn(e) {
  return Number(e.getAttribute(He));
}
const gr = 0.25, br = 1, ka = 0.05, st = 0.5, La = 16, Ca = 8;
function Xe(e) {
  return st;
}
function wt(e) {
  return Number.isFinite(e) ? Math.min(br, Math.max(gr, e)) : st;
}
function nt(e, t) {
  const n = wt(Number(e) + t * ka);
  return Math.round(n * 100) / 100;
}
function Da(e) {
  return Math.round(wt(e) * 100);
}
function za(e) {
  const n = (Number(e) || 0) - La - Ca;
  return Math.max(160, Math.floor(n));
}
function Na(e, t = st) {
  const n = wt(t);
  return za((Number(e) || 0) * n);
}
function xa(e, t) {
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
const Oa = 8;
function Fa(e, t) {
  return !Number.isFinite(e) || e < 80 || Math.abs(e - t) < Oa ? "ignore" : !Number.isFinite(t) || t <= 0 ? "immediate" : "settle";
}
const $a = 200, yr = [
  "markdown"
], vr = [
  "terminal"
], ja = [
  ...yr,
  ...vr
];
function Sr(e) {
  return ja.includes(e);
}
const Ua = "retainpdf:reader:view:v1:", Ln = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), Ba = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function wr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function jt(e) {
  return `${e || ""}`.trim();
}
function Ha({
  documentId: e,
  jobId: t
}) {
  const n = jt(e);
  if (n) return `document:${n}`;
  const r = jt(t);
  return r ? `job:${r}` : "";
}
function Pr(e) {
  const t = jt(e);
  return t ? `${Ua}${t}` : "";
}
function Wa(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function Ja(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!Ln.has(t) || !Ln.has(n) || t === n))
    return { left: t, right: n };
}
function Va(e) {
  return e === null ? null : Sr(e) ? e : void 0;
}
function qa(e) {
  return Ba.has(e) ? e : void 0;
}
function Rr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = Wa(t.anchor), r = Number(t.zoom), o = qa(t.mode), a = Ja(t.splitLayout), s = Va(t.assistantPanel);
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
function Re(e, t = wr()) {
  const n = Pr(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Rr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function Pt(e, t, n = wr()) {
  const r = Pr(e);
  if (!r || !n) return null;
  const o = Re(e, n), a = Rr({
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
function Ga(e, t, n = "") {
  const [r, o] = L(() => {
    var d;
    return ((d = Re(n)) == null ? void 0 : d.zoom) ?? Xe();
  }), a = _(r), s = _(n);
  a.current = r;
  const l = _(1);
  j(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const d = ((f = Re(n)) == null ? void 0 : f.zoom) ?? Xe();
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
  return ze(() => {
    const d = l.current;
    Math.abs(d - 1) < 1e-3 || (l.current = 1, xa(t == null ? void 0 : t.current, d));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: c, resetZoom: u };
}
function Ka(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, o = _(t), a = _(n), s = _(r);
  return o.current = t, a.current = n, s.current = r, { setModeKeepingPage: F((i) => {
    i !== o.current && (s.current(), a.current(i));
  }, []) };
}
const on = 48;
function Ir(e, t = on) {
  return e.getBoundingClientRect().top + t;
}
function Tr(e, t) {
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
  const o = rn(n);
  if (!Number.isFinite(o) || o < 1)
    return null;
  const a = n.getBoundingClientRect(), s = a.height > 0 ? a.height : 1, l = Math.min(1, Math.max(0, (t - a.top) / s));
  return { el: n, page: o, fraction: l };
}
function At(e, t, n = on) {
  if (!e)
    return null;
  const r = vt(void 0, t), o = Array.from(e.querySelectorAll(r));
  if (!o.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Ir(e, n), l = Tr(o, s);
  return l ? { page: l.page, fraction: l.fraction } : null;
}
function an(e, t, n = "auto", r, o = on) {
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
function Za(e, t, n = "smooth", r) {
  return an(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function Ut(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", o = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let a = !1, s = !1;
  const l = [], i = () => {
    var u;
    if (a) return;
    an(
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
function Ya(e, t, n) {
  return Ut(
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
function me(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function Xa(e, t, n = !0, r = "", o) {
  const [a, s] = L(1);
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
      const v = Ir(l), b = Tr(g, v);
      b && s(b.page);
    }, m = () => {
      i || (u && cancelAnimationFrame(u), u = requestAnimationFrame(() => {
        u = 0, f();
      }));
    }, p = () => {
      if (i) return;
      if (!Array.from(l.querySelectorAll(d)).length) {
        c = setTimeout(p, 120);
        return;
      }
      f(), l.addEventListener("scroll", m, { passive: !0 });
    };
    return p(), () => {
      i = !0, c && clearTimeout(c), u && cancelAnimationFrame(u), l.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, o]), a;
}
const Qa = `canvas, .react-pdf__Page, .${pr}, .${yt}`, Cn = /* @__PURE__ */ new WeakMap();
function es(e) {
  const t = Number(e.getAttribute(tn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Cn.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(Qa), Cn.set(e, n)), n) {
    const o = n.getBoundingClientRect().height;
    if (Number.isFinite(o) && o > 0)
      return o;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function ts(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function ns(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(_a()).forEach((r) => {
    const o = rn(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = es(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function rs(e, t, n = "", r) {
  const [o, a] = L(() => /* @__PURE__ */ new Map()), s = _(o), l = _(r);
  return l.current = r, ze(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), a(s.current));
      return;
    }
    let i = !1, c = 0, u = !1, d = !1;
    const f = () => {
      var y;
      if (i) return;
      const S = e.current;
      if (!S) return;
      const h = ns(S);
      ts(s.current, h) || (s.current = h, a(h)), u && !d && (d = !0, (y = l.current) == null || y.call(l));
    }, m = () => {
      cancelAnimationFrame(c), c = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const p = window.setTimeout(m, 100), g = window.setTimeout(() => {
      u = !0, m();
    }, 300), v = window.setTimeout(m, 700), b = e.current;
    let P = null;
    return b && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => m()), P.observe(b)), () => {
      i = !0, cancelAnimationFrame(c), window.clearTimeout(p), window.clearTimeout(g), window.clearTimeout(v), P == null || P.disconnect();
    };
  }, [e, t, n]), o;
}
const os = [0, 48, 140, 320, 560], as = 700, ss = [80, 200, 400], is = 500, cs = 50, ls = /* @__PURE__ */ new Set([
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
]), us = 180, Dn = [0, 48, 140, 320, 700, 1200];
function ds(e, t) {
  var E;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, l = _(
    ((E = Re(a)) == null ? void 0 : E.anchor) || { page: 1, fraction: 0 }
  ), i = _(null), c = _(!1), u = _(r), d = _(null), f = _(null), m = _(null), p = _(null), g = _(a), v = _(""), b = _(n);
  b.current = n;
  const P = F(() => {
    var I;
    (I = d.current) == null || I.call(d), d.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), S = F(() => {
    !c.current && i.current == null || (P(), m.current != null && (clearTimeout(m.current), m.current = null), i.current = null, c.current = !1);
  }, [P]), h = F((I = !1) => {
    p.current != null && (clearTimeout(p.current), p.current = null);
    const T = () => {
      p.current = null, Pt(g.current, {
        anchor: me(l.current)
      });
    };
    I ? T() : p.current = setTimeout(T, us);
  }, []), y = F((I) => {
    l.current = me(I), i.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, c.current = !1;
    }, cs);
  }, []);
  j(() => {
    if (!o)
      return;
    let I = !1, T = null, x = null, z = null;
    const O = () => {
      if (I) return;
      const W = e.current;
      if (!W) {
        z = setTimeout(O, 50);
        return;
      }
      T = W, x = () => {
        if (c.current)
          return;
        const ae = At(T, b.current);
        ae && (l.current = ae, h());
      }, T.addEventListener("scroll", x, { passive: !0 }), c.current || x();
    };
    return O(), () => {
      I = !0, z != null && clearTimeout(z), T && x && T.removeEventListener("scroll", x);
    };
  }, [o, r, n, e, h]), j(() => {
    if (!o) return;
    const I = e.current;
    if (!I) return;
    const T = (x) => {
      x.metaKey || x.ctrlKey || x.altKey || ls.has(x.key) && S();
    };
    return I.addEventListener("wheel", S, { passive: !0 }), I.addEventListener("touchmove", S, { passive: !0 }), window.addEventListener("keydown", T), () => {
      I.removeEventListener("wheel", S), I.removeEventListener("touchmove", S), window.removeEventListener("keydown", T);
    };
  }, [o, e, S]), ze(() => {
    var T;
    if (g.current === a) return;
    h(!0), P(), m.current != null && (clearTimeout(m.current), m.current = null), g.current = a, v.current = "";
    const I = (T = Re(a)) == null ? void 0 : T.anchor;
    l.current = I ? me(I) : { page: 1, fraction: 0 }, i.current = null, c.current = !!a, u.current = r;
  }, [a, r, h, P]), j(() => {
    var T;
    if (!o || !s || !a || v.current === a) return;
    v.current = a;
    const I = me(
      ((T = Re(a)) == null ? void 0 : T.anchor) || { page: 1, fraction: 0 }
    );
    return l.current = I, i.current = I, c.current = !0, P(), d.current = Ut(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: b.current,
        delaysMs: Dn,
        onDone: () => y(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, y(I);
    }, Math.max(...Dn) + 160), () => P();
  }, [o, s, a, e, y, P]), j(() => {
    if (u.current === r)
      return;
    if (u.current = r, !o) {
      c.current = !1, i.current = null, P();
      return;
    }
    const I = i.current ? me(i.current) : me(l.current);
    return c.current = !0, i.current = I, l.current = I, P(), d.current = Ut(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: os,
        onDone: () => y(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, y(I);
    }, as), () => {
      P();
    };
  }, [r, o, n, e, y, P]), j(() => () => {
    P(), m.current != null && (clearTimeout(m.current), m.current = null), h(!0);
  }, [P, h]);
  const M = F(() => {
    const I = At(
      e.current,
      b.current
    );
    return me(I || l.current);
  }, [e]), A = F(() => {
    c.current = !0;
    const I = At(
      e.current,
      b.current
    ), T = me(I ?? l.current);
    return l.current = T, i.current = T, h(), T;
  }, [e, h]), N = F((I, T, x) => {
    const z = x || b.current, O = St(I, T || 1), W = { page: O, fraction: 0 };
    l.current = W, c.current = !0, i.current = W, h(), P(), Za(e.current, O, "smooth", z), d.current = Ya(
      () => e.current,
      O,
      {
        behavior: "auto",
        pane: z,
        delaysMs: ss,
        onDone: () => y(W)
      }
    ), f.current = setTimeout(() => {
      f.current = null, y(W);
    }, is);
  }, [e, y, P, h]), C = F(() => me(l.current), []), D = F(() => c.current, []), R = F(() => {
    if (!c.current || !i.current)
      return;
    const I = me(i.current);
    an(
      e.current,
      I,
      "auto",
      b.current
    );
  }, [e]);
  return {
    lockFromShell: M,
    beginModeSwitch: A,
    goToPage: N,
    getAnchor: C,
    isRestoring: D,
    repinIfRestoring: R
  };
}
function fs(e, t) {
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
function Er(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), o = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), a = `j:${r}:d:${o}`;
  return t == null ? `${a}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${a}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const ms = [0, 80, 200, 400, 800], hs = 120, ps = 400;
function gs(e, t, n) {
  const { enabled: r, numPages: o, goToPage: a, resolveBlockPage: s, onAnchorApplied: l, jobId: i, documentId: c } = e, u = _(a);
  u.current = a;
  const d = _(s);
  d.current = s;
  const f = _(l);
  f.current = l;
  const m = _(n);
  m.current = n, j(() => {
    var S, h;
    if (!r || !Number.isFinite(o) || o < 1)
      return;
    const p = Ho(), g = fs(p, d.current), v = Er(p, g, { jobId: i, documentId: c });
    if (t.current === v)
      return;
    if (g == null) {
      t.current = v, (S = m.current) == null || S.call(m);
      return;
    }
    t.current = v, p && ((h = f.current) == null || h.call(f, p, g));
    const b = [];
    let P = 0;
    for (const y of ms)
      P = Math.max(P, y), b.push(
        setTimeout(() => {
          u.current(g);
        }, y)
      );
    return b.push(
      setTimeout(() => {
        var y;
        (y = m.current) == null || y.call(m);
      }, P + hs)
    ), () => {
      for (const y of b) clearTimeout(y);
    };
  }, [r, o, i, c, t]);
}
function bs(e) {
  var a;
  const t = globalThis.window;
  if (!t || typeof ((a = t.history) == null ? void 0 : a.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, o = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", o);
}
function ys(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: o,
    resolveBlockPage: a,
    syncDebounceMs: s = ps,
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
      const p = ((b = globalThis.location) == null ? void 0 : b.search) || "", g = bo(p, o, u.current);
      if (f.current = o, g === null) return;
      const v = `${new URLSearchParams(g).get("block_id") || ""}`.trim();
      t.current = Er(
        { blockId: v },
        o,
        { jobId: l, documentId: i }
      ), (d.current || bs)(g);
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
function vs(e) {
  const t = _(""), [n, r] = L(!1), o = F(() => r(!0), []), a = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  gs(a, t, o), ys(e, t, n);
}
const Ge = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function Ss(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function zn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function Mr(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = zn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const o = zn(n, e);
  return o < 0 || o === 0 && n.page_hash === e.pageHash ? "ignore" : "accept";
}
function ws(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), o = Mr(r, t, n);
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
function Ps(e) {
  const { hasOverlayContent: t, connection: n, showSource: r } = e;
  return {
    topBarPill: t && n !== "terminal",
    sourcePaneToggle: t && r,
    // 和 resolveReaderPaneComposition 的 overlayOnSource 同一套条件，外加
    // 「源文栏得在台面上」——否则叠层没有落脚的地方。
    overlayRenderable: t && r && e.liveTranslationVisible && !e.assistantOpen
  };
}
const Nn = [250, 500, 1e3, 2e3, 4e3], _t = [80, 160, 320, 640, 1e3, 1500], xn = [250, 500, 1e3, 2e3, 4e3, 5e3], Rs = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Bt(e, t) {
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
function sn(e) {
  return Ro(e) ? `${e.code || ""}`.trim() : "";
}
function ft(e, t) {
  const n = sn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Is(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if (Mr(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = Io(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (i) {
      if ((i == null ? void 0 : i.name) === "AbortError") throw i;
      a = i;
      const c = sn(i);
      if (c && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(c)) throw i;
    }
    const l = _t[Math.min(s, _t.length - 1)];
    if (await Bt(l, r), s >= _t.length + 2) throw a;
  }
}
function Ts({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = L(Ge), s = _(o), l = _("");
  s.current = o;
  const i = `${e || ""}`.trim(), c = `${t || ""}`.trim().toLowerCase(), u = Rs.has(c) ? c : "";
  return j(() => {
    if (!n || !i) {
      l.current = "", s.current = Ge, a(Ge);
      return;
    }
    const d = r === void 0 ? Bo() : r, f = l.current === i;
    if (l.current = i, !d) {
      const S = {
        ...f ? s.current : Ge,
        connection: u ? "terminal" : "unavailable",
        jobStatus: c,
        error: "实时译文暂不可用"
      };
      s.current = S, a(S);
      return;
    }
    const m = new AbortController();
    let p = !1;
    const g = {
      ...f ? s.current : Ge,
      connection: u ? "terminal" : "connecting",
      jobStatus: c,
      error: ""
    };
    s.current = g, a(g);
    const v = (S) => {
      m.signal.aborted || a((h) => {
        const y = S(h);
        return s.current = y, y;
      });
    }, b = async () => {
      let S = 0;
      for (; !m.signal.aborted; )
        try {
          const h = await d.fetchLayout(i, { signal: m.signal });
          p = !0, v((y) => ({
            ...y,
            layoutByPage: Ss(h),
            jobStatus: c,
            error: ""
          }));
          return;
        } catch (h) {
          if ((h == null ? void 0 : h.name) === "AbortError") return;
          const y = sn(h);
          if (!(y === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !y)) {
            v((A) => ({
              ...A,
              connection: u ? "terminal" : "unavailable",
              jobStatus: c,
              error: ft(h, "实时译文暂不可用")
            }));
            return;
          }
          if (u) {
            v((A) => ({
              ...A,
              connection: "terminal",
              jobStatus: c,
              error: ""
            }));
            return;
          }
          v((A) => ({
            ...A,
            connection: "connecting",
            jobStatus: c,
            error: ft(h, "正在等待 OCR 版面数据")
          })), await Bt(Nn[Math.min(S, Nn.length - 1)], m.signal).catch(() => {
          }), S += 1;
        }
    };
    return (async () => {
      if (await b(), !p || m.signal.aborted) return;
      let S = 0;
      for (; !m.signal.aborted; ) {
        u || v((h) => ({
          ...h,
          connection: h.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: c,
          // 保留已有错误：首页还没提交（lastSeq 为 0）时恰恰是最容易出错的阶段，
          // 此前这里把它清成空串，UI 于是一直显示「连接中」，用户看到的是
          // "正在努力"，实际可能已经在反复失败。
          error: h.error
        }));
        try {
          await d.streamEvents(i, {
            afterSeq: s.current.lastSeq,
            signal: m.signal,
            onEvent: async (h) => {
              if (h.seq <= s.current.lastSeq) return;
              let y;
              try {
                y = await Is(
                  i,
                  h,
                  s.current,
                  m.signal,
                  d
                );
              } catch (M) {
                if ((M == null ? void 0 : M.name) === "AbortError" || m.signal.aborted) throw M;
                v((A) => ({
                  ...A,
                  lastSeq: Math.max(A.lastSeq, h.seq),
                  error: ft(M, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              v((M) => {
                const A = ws(M, h, y);
                return u ? {
                  ...A,
                  connection: "terminal",
                  jobStatus: c
                } : {
                  ...A,
                  jobStatus: c
                };
              }), S = 0;
            }
          });
        } catch (h) {
          if ((h == null ? void 0 : h.name) === "AbortError" || m.signal.aborted) return;
          v((y) => ({
            ...y,
            connection: u ? "terminal" : "reconnecting",
            jobStatus: c,
            error: ft(h, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (u) {
          v((h) => ({
            ...h,
            connection: "terminal",
            jobStatus: c
          }));
          return;
        }
        await Bt(xn[Math.min(S, xn.length - 1)], m.signal).catch(() => {
        }), S += 1;
      }
    })(), () => m.abort();
  }, [n, r, i, u]), o;
}
const Es = 2e3;
function Ms(e) {
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
const As = /* @__PURE__ */ new Set(["book", "translate"]);
function Ar(e) {
  return !!(e.jobId && e.sourceUrl && As.has(e.workflow));
}
function _s(e) {
  return !!(Ar(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function ks() {
  const e = ya(), t = Ar({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = _s({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = _({ jobId: "", running: !1 });
  r.current.jobId !== e.jobId && (r.current = { jobId: e.jobId, running: !1 });
  const o = `${e.jobStatus || ""}`.trim().toLowerCase();
  o && !["succeeded", "failed", "cancelled", "canceled"].includes(o) && (r.current.running = !0);
  const a = Ts({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t && (n || r.current.running)
  }), { shellRef: s, shellEl: l, shellWidth: i, bindShell: c } = Pa(), u = Ha({
    documentId: e.documentId,
    jobId: e.jobId
  }), d = `${u}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: f, onZoomChange: m } = Ga(e.mode, s, u), p = Ia(
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
    goToPage: v,
    repinIfRestoring: b
  } = ds(s, {
    primaryPane: p.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: u,
    restoreReady: p.primaryNumPages > 0
  });
  j(() => {
    b();
  }, [i, b]);
  const P = rs(
    s,
    p.compareMode,
    p.rowSyncRevision,
    b
  ), S = Xa(
    s,
    p.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${f}-${p.metricsTick}`,
    p.primaryPane
  ), h = F((z, O) => {
    var ae, oe;
    const W = Math.max(
      Number(p.hudNumPages) || 0,
      Number(p.primaryNumPages) || 0,
      Number((ae = p.numPagesByPane) == null ? void 0 : ae.source) || 0,
      Number((oe = p.numPagesByPane) == null ? void 0 : oe.translated) || 0
    );
    v(z, W, O);
  }, [v, p.hudNumPages, p.primaryNumPages, p.numPagesByPane]), [y, M] = L(null), A = _(null), N = F((z) => {
    A.current && clearTimeout(A.current), M(z), z && (A.current = setTimeout(() => M(null), Es));
  }, []);
  j(() => () => {
    A.current && clearTimeout(A.current);
  }, []);
  const C = F((z) => {
    const O = Tt(e.regions, z);
    return O ? Tn(O, p.primaryPane).page : null;
  }, [e.regions, p.primaryPane]), D = F((z, O) => {
    const W = O || p.primaryPane, ae = typeof z == "object" && z ? `${z.block_id || ""}`.trim() : "", oe = typeof z == "object" && z ? `${z.image_url || ""}`.trim() : "", $ = typeof z == "object" && z ? z.page_idx != null ? Number(z.page_idx) + 1 : z.page != null ? Number(z.page) : null : typeof z == "number" ? z + 1 : null, B = So(e.regions, oe, $) || Tt(e.regions, ae) || (typeof z == "object" ? wo(e.regions, z) : null);
    let te = B ? Tn(B, W).page : null;
    te == null && (te = Ms(z)), !(te == null || te < 1) && (N(B), h(te, W));
  }, [N, h, p.primaryPane, e.regions]);
  vs({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: p.hudNumPages || 0,
    currentPage: S,
    goToPage: h,
    resolveBlockPage: C,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (z) => {
      N(Tt(e.regions, z.blockId));
    }
  });
  const { setModeKeepingPage: R } = Ka({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: g
  });
  j(() => {
    N(null);
  }, [d, N]);
  const E = !e.boot.loading && !e.boot.failed, I = G(() => ({ bindShell: c, shellEl: l, shellWidth: i, shellRef: s }), [c, l, i, s]), T = G(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), x = G(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: f,
    onZoomChange: m,
    shell: I,
    panes: p,
    sessionFiles: T,
    rowHeights: P,
    goToPage: h,
    activeRegion: y,
    jumpToAnchor: D,
    setModeKeepingPage: R,
    download: e.download,
    showHud: E,
    viewStateKey: u,
    liveTranslation: a,
    liveTranslationAvailable: n
  }), [e, I, p, T, P, h, y, D, R, E, f, m, u, a, n]);
  return G(() => ({
    ...x,
    currentPage: S
  }), [x, S]);
}
const Ls = [
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
], Cs = [
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
function Ds(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Ls)
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
function Ns(e) {
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
      const f = d.key, m = Ds(f);
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
const xs = "retainpdf:soft-reader-close";
function Os() {
  return new URL("./index.html", window.location.href).href;
}
function Fs() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: xs },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function $s(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), o = new URL(e, r);
    return o.origin === r.origin && !/reader\.html$/i.test(o.pathname) && !/detail\.html$/i.test(o.pathname);
  } catch {
    return !1;
  }
}
function js() {
  if (!(typeof window > "u") && !Fs()) {
    if ($s(
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
function Us({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ U(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), js();
      },
      children: [
        /* @__PURE__ */ w(lr, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ w("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let On = !1;
function Bs() {
  if (On)
    return;
  const e = et().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (Co.GlobalWorkerOptions.workerSrc = e, On = !0);
}
const Hs = /* @__PURE__ */ new Set(["text", "formula", "table"]);
function Ws(e, t, n) {
  return e.flatMap((r) => {
    if (!Hs.has(zt(r.region))) return [];
    const o = Qt(r, t, n);
    return o ? [{ itemId: r.itemId, highlight: r, rect: o }] : [];
  });
}
function Fn(e, t, n) {
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
async function _r(e) {
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
const kr = "reader-text-hover-copy", Lr = "reader-text-hover-id", Cr = "reader-text-hover-tools";
function Js({
  target: e,
  pane: t = "source",
  copiedSignal: n = 0
}) {
  const [r, o] = L("idle"), [a, s] = L("idle"), l = (e == null ? void 0 : e.itemId) || "";
  if (j(() => {
    o("idle"), s("idle");
  }, [l]), j(() => {
    if (!n) return;
    o("copied");
    const f = window.setTimeout(() => o("idle"), 1200);
    return () => window.clearTimeout(f);
  }, [n]), !e) return null;
  const i = cr(e.highlight.region, t), c = zt(e.highlight.region) === "formula", u = (f, m) => async (p) => {
    p.preventDefault(), p.stopPropagation();
    const g = await _r(f);
    m(g ? "copied" : "failed"), window.setTimeout(() => m("idle"), 1200);
  }, d = c ? "复制 LaTeX" : "复制";
  return /* @__PURE__ */ w("div", { className: "reader-text-hover-layer", children: /* @__PURE__ */ w(
    "div",
    {
      className: "reader-text-hover-frame",
      "data-reader-text-hover-id": e.itemId,
      "data-reader-text-hover-kind": zt(e.highlight.region),
      style: e.rect,
      children: /* @__PURE__ */ U("div", { className: Cr, children: [
        /* @__PURE__ */ w(
          "button",
          {
            type: "button",
            className: Lr,
            "data-copy-state": a,
            "aria-label": `复制翻译编号 ${e.itemId}`,
            title: "翻译编号，点击复制",
            onPointerDown: (f) => f.stopPropagation(),
            onClick: u(e.itemId, s),
            children: a === "copied" ? "已复制编号" : e.itemId
          }
        ),
        i ? /* @__PURE__ */ w(
          "button",
          {
            type: "button",
            className: kr,
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
function Vs(e, t) {
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
function qs(e, t, n, r) {
  if (!e || !t) return [];
  const o = [];
  for (const a of e.blocks) {
    const s = t.itemsById.get(a.item_id);
    if (!(s != null && s.translated_text)) continue;
    const l = Qt(
      Vs(e, a),
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
const Gs = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', Ks = 256, Ke = /* @__PURE__ */ new Map();
function Zs(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function Ys(e) {
  const t = `${e || ""}`, { text: n, slots: r } = No(t, { bareLatex: !0 }), o = Zs(n), a = xo(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Ke.get(t);
  if (!s && (s = Oo(o, r), Ke.set(t, s), Ke.size > Ks)) {
    const l = Ke.keys().next().value;
    l !== void 0 && Ke.delete(l);
  }
  return { fallbackHtml: a, richHtml: s, hasMath: !0 };
}
function kt(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function Pe(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function Xs(e, t) {
  const n = e.typography, r = Pe(t) || 1, o = Pe(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), l = kt(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, l * r)), c = Pe(n == null ? void 0 : n.fit_min_font_size_pt), u = Pe(n == null ? void 0 : n.fit_max_font_size_pt), d = Math.max(3.5, (c || 5.5) * r), f = Math.max(
    d,
    u ? u * r : o ? o * r : i
  ), m = o ? o * r : i, p = Pe(n == null ? void 0 : n.leading_em), g = [
    Pe(n == null ? void 0 : n.padding_top_pt) || 0,
    Pe(n == null ? void 0 : n.padding_right_pt) || 0,
    Pe(n == null ? void 0 : n.padding_bottom_pt) || 0,
    Pe(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((v) => v * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || Gs,
    fontSizePx: Math.max(d, Math.min(f, m)),
    minFontSizePx: d,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: p ? 1 + p : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (kt(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : kt(e.kind) ? "center" : "justify",
    padding: g,
    exact: !!o
  };
}
function Qs(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), l = (d) => {
    const f = s.get(d);
    if (f !== void 0) return f;
    const { width: m, height: p } = e(d), g = m <= t + 0.5 && p <= n + 0.5;
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
const ei = 512, Ze = /* @__PURE__ */ new Map();
let Ht = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Ht += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Ht += 1;
}));
function ti(e, t, n, r) {
  return [
    Ht,
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
function ni({ item: e, pageScale: t }) {
  const n = _(null), r = G(
    () => Ys(e.translatedText),
    [e.translatedText]
  ), [o, a] = L(r.fallbackHtml), s = G(
    () => Xs(e, t),
    [e, t]
  );
  j(() => {
    let d = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      d && a(f);
    }), () => {
      d = !1;
    };
  }, [r]), ze(() => {
    const d = n.current;
    if (!d) return;
    const [f, m, p, g] = s.padding, v = Math.max(1, e.rect.width - g - m), b = Math.max(1, e.rect.height - f - p), P = ti(o, v, b, s);
    let S = Ze.get(P);
    if (S === void 0 && (S = Qs(
      (h) => (d.style.fontSize = `${h}px`, { width: d.scrollWidth, height: d.scrollHeight }),
      v,
      b,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Ze.set(P, S), Ze.size > ei)) {
      const h = Ze.keys().next().value;
      h !== void 0 && Ze.delete(h);
    }
    d.style.fontSize = `${S.toFixed(2)}px`;
  }, [o, e.rect.height, e.rect.width, s]);
  const [l, i, c, u] = s.padding;
  return /* @__PURE__ */ w(
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
      children: /* @__PURE__ */ w(
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
function ri({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = G(
    () => qs(e, t, n, r),
    [r, e, t, n]
  );
  return o.length ? /* @__PURE__ */ w(
    "div",
    {
      className: "reader-live-translation-overlay",
      "data-live-translation-page": e == null ? void 0 : e.page_idx,
      "data-live-translation-generation": t == null ? void 0 : t.generation,
      "aria-hidden": "true",
      children: o.map((a) => /* @__PURE__ */ w(
        ni,
        {
          item: a,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${a.itemId}:${a.changedAtSeq}`
      ))
    }
  ) : null;
}
const oi = Kt(ri), Dr = 1.414, ai = 26;
function si({
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
  liveTranslationLayout: p,
  liveTranslationPage: g,
  showLiveTranslation: v = r === "source"
}) {
  const b = _(l ?? Dr), [P, S] = L(b.current);
  j(() => {
    l != null && Math.abs(l - b.current) >= 1e-3 && (b.current = l, S(l));
  }, [l]);
  const h = _(c);
  h.current = c;
  const y = _(($) => {
    var B;
    (B = h.current) == null || B.call(h, $);
  }).current, M = Math.max(120, Math.floor(t * P)), A = Math.max(M, Math.ceil(a || 0)), N = Qt(u, t, M), C = G(
    () => Ws(d, t, M),
    [M, d, t]
  ), [D, R] = L(null), E = typeof m == "function", I = E ? f ?? null : D, T = ($) => {
    E ? $ !== (f ?? null) && (m == null || m($)) : R((B) => B === $ ? B : $);
  }, [x, z] = L(0), O = G(
    () => C.find(($) => $.itemId === I) || null,
    [I, C]
  ), W = ($) => {
    var ie, fe;
    if ($.buttons !== 0) {
      T(null);
      return;
    }
    if ((fe = (ie = $.target) == null ? void 0 : ie.closest) != null && fe.call(ie, `.${Cr}`)) return;
    const B = $.currentTarget.getBoundingClientRect(), te = $.clientX - B.left, re = $.clientY - B.top, K = O == null ? void 0 : O.rect;
    if (K && te >= K.left - 4 && te <= K.left + K.width + 4 && re >= K.top - ai && re <= K.top) return;
    const Y = Fn(C, te, re);
    T((Y == null ? void 0 : Y.itemId) || null);
  }, ae = async ($) => {
    var K, Y, ie;
    if ((Y = (K = $.target) == null ? void 0 : K.closest) != null && Y.call(K, `.${kr}, .${Lr}`)) return;
    const B = $.currentTarget.getBoundingClientRect(), te = Fn(
      C,
      $.clientX - B.left,
      $.clientY - B.top
    );
    if (!te) return;
    const re = cr(te.highlight.region, r === "translated" ? "translated" : "source");
    re && ((ie = window.getSelection()) == null || ie.removeAllRanges(), await _r(re) && z((fe) => fe + 1));
  }, oe = ($) => {
    !Number.isFinite($) || $ <= 0 || Math.abs(b.current - $) < 1e-3 || (b.current = $, S($), i == null || i(e, $));
  };
  return /* @__PURE__ */ U(
    "div",
    {
      ref: y,
      [He]: e,
      [tt]: r,
      [tn]: M,
      className: nn,
      onPointerMoveCapture: W,
      onDoubleClick: ae,
      onPointerLeave: () => T(null),
      style: {
        width: t,
        height: A,
        minHeight: A
      },
      children: [
        o ? /* @__PURE__ */ w(
          Do,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: pr,
            loading: /* @__PURE__ */ w(
              "div",
              {
                className: yt,
                style: { width: t, height: M }
              }
            ),
            onLoadSuccess: ($) => {
              try {
                const B = $.getViewport({ scale: 1 });
                if (B.width > 0) {
                  const te = B.height / B.width;
                  oe(te);
                }
              } catch {
              }
              s == null || s();
            },
            onRenderSuccess: () => {
              s == null || s();
            }
          }
        ) : /* @__PURE__ */ w(
          "div",
          {
            className: yt,
            style: { width: t, height: M },
            "aria-hidden": !0
          }
        ),
        N ? /* @__PURE__ */ w(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": u == null ? void 0 : u.itemId,
            style: N,
            "aria-hidden": "true"
          }
        ) : null,
        o && v ? /* @__PURE__ */ w(
          oi,
          {
            layoutPage: p,
            pageState: g,
            width: t,
            height: M
          }
        ) : null,
        /* @__PURE__ */ w(
          Js,
          {
            target: o ? O : null,
            pane: r === "translated" ? "translated" : "source",
            copiedSignal: x
          }
        )
      ]
    }
  );
}
const ii = Kt(si), Lt = 5, ci = "120% 0px", li = 120;
let $n = 1;
const jn = /* @__PURE__ */ new WeakMap();
function ui(e) {
  if (!e) return 0;
  const t = jn.get(e);
  if (t) return t;
  const n = $n;
  return $n += 1, jn.set(e, n), n;
}
function di() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const fi = so(
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
    activeRegion: p = null,
    regions: g = [],
    readerMetadata: v = null,
    hoveredRegionId: b = null,
    onHoverRegion: P,
    liveTranslation: S,
    showLiveTranslation: h = t === "source",
    liveTranslationPendingLabel: y = "",
    paneAction: M
  }, A) {
    Bs();
    const { file: N, loading: C, error: D } = ha(n, r), R = `${n}\0${ui(N)}`, E = _(R);
    E.current = R;
    const I = G(
      () => da(N),
      [N, n]
    ), [T, x] = L(0), [z, O] = L(""), [W, ae] = L(null), [oe, $] = L(480), B = _(null), te = _(0), re = G(() => di(), []), K = G(() => ({
      cMapUrl: et().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: et().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    Zt(A, () => W, [W]), j(() => {
      const k = (V) => {
        te.current = V, $(V);
      }, J = (V) => {
        const X = Fa(V, te.current);
        if (X !== "ignore") {
          if (B.current && clearTimeout(B.current), X === "immediate") {
            k(V);
            return;
          }
          B.current = setTimeout(() => k(V), $a);
        }
      }, H = !!(i && i >= 80);
      J(H ? i : (l == null ? void 0 : l.clientWidth) || 0);
      const se = !H && l && typeof ResizeObserver < "u" ? new ResizeObserver((V) => {
        var X, ce;
        J(((ce = (X = V[0]) == null ? void 0 : X.contentRect) == null ? void 0 : ce.width) ?? l.clientWidth);
      }) : null;
      return se && l && se.observe(l), () => {
        se == null || se.disconnect(), B.current && clearTimeout(B.current);
      };
    }, [i, l, a]);
    const Y = G(
      () => Na(oe, o),
      [oe, o]
    ), [ie, fe] = L(() => /* @__PURE__ */ new Map()), [_e, ct] = L(() => /* @__PURE__ */ new Set()), [Rt, Q] = L(() => /* @__PURE__ */ new Set()), ee = _(/* @__PURE__ */ new Map()), ne = _(null), pe = _(/* @__PURE__ */ new Map()), ge = F((k, J) => {
      fe((H) => {
        if (H.get(k) === J) return H;
        const q = new Map(H);
        return q.set(k, J), q;
      });
    }, []), Te = F((k, J) => {
      const H = ee.current, q = H.get(k);
      if (q && ne.current)
        try {
          ne.current.unobserve(q);
        } catch {
        }
      if (J) {
        if (H.set(k, J), ne.current)
          try {
            ne.current.observe(J);
          } catch {
          }
      } else
        H.delete(k);
    }, []), It = _(/* @__PURE__ */ new Map()), lt = F((k) => {
      const J = It.current;
      let H = J.get(k);
      return H || (H = (q) => Te(k, q), J.set(k, H)), H;
    }, [Te]);
    j(() => {
      if (typeof IntersectionObserver > "u") return;
      const k = pe.current, J = new IntersectionObserver(
        (H) => {
          const q = [], se = [];
          for (const V of H) {
            const X = V.target, ce = rn(X);
            Number.isFinite(ce) && (V.isIntersecting ? q : se).push(ce);
          }
          if ((q.length || se.length) && ct((V) => {
            let X = null;
            for (const ce of q)
              V.has(ce) || (X = X || new Set(V), X.add(ce));
            for (const ce of se)
              V.has(ce) && (X = X || new Set(V), X.delete(ce));
            return X || V;
          }), q.length) {
            for (const V of q) {
              const X = k.get(V);
              X && (clearTimeout(X), k.delete(V));
            }
            Q((V) => {
              let X = null;
              for (const ce of q)
                V.has(ce) || (X = X || new Set(V), X.add(ce));
              return X || V;
            });
          }
          for (const V of se)
            k.has(V) || k.set(V, setTimeout(() => {
              k.delete(V), Q((X) => {
                if (!X.has(V)) return X;
                const ce = new Set(X);
                return ce.delete(V), ce;
              });
            }, li));
        },
        { root: l, rootMargin: ci, threshold: 0 }
      );
      ne.current = J;
      for (const H of ee.current.values())
        try {
          J.observe(H);
        } catch {
        }
      return () => {
        J.disconnect(), ne.current === J && (ne.current = null);
        for (const H of k.values()) clearTimeout(H);
        k.clear();
      };
    }, [l]), ze(() => {
      x(0), O(""), ct(/* @__PURE__ */ new Set()), Q(/* @__PURE__ */ new Set()), fe(/* @__PURE__ */ new Map()), ee.current.clear();
      const k = pe.current;
      for (const J of k.values()) clearTimeout(J);
      k.clear(), m == null || m(0, t);
    }, [R, m, t]);
    const ut = F(
      ({ numPages: k }) => {
        E.current === R && (x(k), O(""), m == null || m(k, t), d == null || d({ numPages: k, pane: t }));
      },
      [R, d, m, t]
    ), Ve = F(
      (k) => {
        if (E.current !== R) return;
        const J = (k == null ? void 0 : k.message) || "PDF 解析失败";
        O(J), x(0), m == null || m(0, t), f == null || f(k, t);
      },
      [R, f, m, t]
    ), ve = G(
      () => T > 0 ? Array.from({ length: T }, (k, J) => J + 1) : [],
      [T]
    );
    j(() => {
      typeof IntersectionObserver < "u" || Q(new Set(ve));
    }, [ve]);
    const Se = G(
      () => En(p, v, t),
      [p, v, t]
    ), Oe = G(() => {
      const k = /* @__PURE__ */ new Map();
      for (const J of g) {
        const H = En(J, v, t);
        if (!H) continue;
        const q = k.get(H.box.page) || [];
        q.push(H), k.set(H.box.page, q);
      }
      return k;
    }, [t, v, g]), no = G(() => {
      const k = /* @__PURE__ */ new Set();
      if (!b) return k;
      for (const [J, H] of Oe)
        H.some((q) => q.itemId === b) && k.add(J);
      return k;
    }, [b, Oe]), ro = G(() => {
      if (T === 0) return /* @__PURE__ */ new Set();
      if (!a) return /* @__PURE__ */ new Set();
      if (!(!!l && typeof IntersectionObserver < "u")) return new Set(ve);
      if (_e.size === 0) {
        const H = Math.min(T, Lt * 2 + 1);
        return new Set(Array.from({ length: H }, (q, se) => se + 1));
      }
      const J = /* @__PURE__ */ new Set();
      for (const H of _e)
        for (let q = -Lt; q <= Lt; q++) {
          const se = H + q;
          se >= 1 && se <= T && J.add(se);
        }
      return J;
    }, [T, ve, l, a, _e]), oo = !n || !!D || !!z, ao = n && (D || z) || s;
    return /* @__PURE__ */ U(
      "section",
      {
        ref: ae,
        className: `reader-panel ${Aa}${a ? "" : " is-hidden"}`,
        [tt]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": a ? "true" : "false",
        "data-live-translation-status": (S == null ? void 0 : S.jobStatus) || void 0,
        "aria-hidden": a ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          M ? /* @__PURE__ */ w("div", { className: "reader-react-pdf-pane-action", children: M }) : null,
          y ? /* @__PURE__ */ U("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ w("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ w("span", { children: y })
          ] }) : null,
          oo && !C ? /* @__PURE__ */ w("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: ao }) : null,
          C ? /* @__PURE__ */ w("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          I && !D ? /* @__PURE__ */ w("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ w(
            zo,
            {
              file: I,
              loading: null,
              error: null,
              options: K,
              onLoadSuccess: ut,
              onLoadError: Ve,
              className: "reader-react-pdf-document",
              children: ve.map((k) => {
                if (ro.has(k))
                  return /* @__PURE__ */ w(
                    ii,
                    {
                      pane: t,
                      pageNumber: k,
                      width: Y,
                      devicePixelRatio: re,
                      active: Rt.has(k),
                      syncedMinHeight: (c == null ? void 0 : c.get(k)) || 0,
                      onMetrics: u,
                      cachedAspect: ie.get(k),
                      onAspectChange: ge,
                      sentinelRef: lt(k),
                      regionHighlight: (Se == null ? void 0 : Se.box.page) === k ? Se : null,
                      regionTargets: Oe.get(k),
                      hoveredRegionId: b && no.has(k) ? b : null,
                      onHoverRegion: P,
                      liveTranslationLayout: S == null ? void 0 : S.layoutByPage.get(k - 1),
                      liveTranslationPage: S == null ? void 0 : S.pagesByPage.get(k - 1),
                      showLiveTranslation: h
                    },
                    `${t}-${k}`
                  );
                const H = ie.get(k) ?? Dr, q = Math.max(120, Math.floor(Y * H)), se = Math.max(q, Math.ceil((c == null ? void 0 : c.get(k)) || 0));
                return /* @__PURE__ */ w(
                  "div",
                  {
                    ref: lt(k),
                    [He]: k,
                    [tt]: t,
                    [tn]: q,
                    className: nn,
                    style: {
                      width: Y,
                      height: se,
                      minHeight: se
                    },
                    children: /* @__PURE__ */ w(
                      "div",
                      {
                        className: yt,
                        style: { width: Y, height: q },
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
), Un = Kt(fi), zr = Yt(null), Nr = Yt(null);
function mi({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ w(zr.Provider, { value: e, children: /* @__PURE__ */ w(Nr.Provider, { value: t, children: n }) });
}
function it() {
  return Xt(zr);
}
function hi() {
  return Xt(Nr);
}
function pi({
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
function gi(e, t, n = e * 2) {
  return t ? !Number.isFinite(e) || e <= 0 ? n : e * 2 : e;
}
function bi(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function yi(e) {
  const t = it(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", l = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, c = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), u = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, d = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? st, p = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, g = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), v = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, b = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, P = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, S = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", h = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", y = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, M = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, A = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), N = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), C = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), D = e.regions ?? (t == null ? void 0 : t.regions) ?? [], R = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), [E, I] = L(null), T = F((W) => I(W), []), x = pi({
    mode: s,
    compareMode: l,
    showSource: i,
    showTranslated: c,
    markdownSplit: n,
    overlayOnSource: u
  }), O = Number.isFinite(p) && p > 0 ? gi(
    p,
    n || r,
    typeof document > "u" ? p * 2 : document.documentElement.clientWidth
  ) : null;
  return /* @__PURE__ */ w(
    "div",
    {
      ref: d,
      className: Ma,
      "data-reader-region-count": D.length,
      "data-reader-structured-region-count": D.filter(Po).length,
      "data-reader-metadata-ready": R ? "true" : "false",
      children: /* @__PURE__ */ U(
        "main",
        {
          className: `${Ea} reader-mode-${x.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            v ? /* @__PURE__ */ w(
              Un,
              {
                pane: "source",
                url: S,
                preloadedFile: y,
                userZoom: m,
                visible: x.showSource,
                scrollRoot: f,
                pageWidthOverride: O,
                rowHeights: x.compareMode ? g : void 0,
                onMetrics: A,
                emptyLabel: P ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: N,
                activeRegion: C,
                regions: D,
                readerMetadata: R,
                hoveredRegionId: E,
                onHoverRegion: T,
                liveTranslation: u ? o : void 0,
                showLiveTranslation: u,
                liveTranslationPendingLabel: u ? bi(o) : "",
                paneAction: u ? /* @__PURE__ */ U(Gt, { children: [
                  e.sourcePaneAction,
                  /* @__PURE__ */ w(
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
            b ? /* @__PURE__ */ w(
              Un,
              {
                pane: "translated",
                url: h,
                preloadedFile: M,
                userZoom: m,
                visible: x.showTranslated,
                scrollRoot: f,
                pageWidthOverride: O,
                rowHeights: x.compareMode ? g : void 0,
                onMetrics: A,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: N,
                activeRegion: C,
                regions: D,
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
const vi = [
  { id: "source", label: "源文件", Icon: ur },
  { id: "compare", label: "对照", Icon: dr },
  { id: "translated", label: "翻译文件", Icon: fr }
];
function Bn(e) {
  return `辅助面板占了右半边，对照只剩${e === "translated" ? "译文" : "原文"} · 点此关闭面板恢复对照`;
}
function Si(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function wi(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Pi(e) {
  const t = it(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null,
    compareDegraded: s = !1,
    onRestoreCompare: l
  } = e, i = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, c = a ? Si(a.state) : "";
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
          /* @__PURE__ */ w(Eo, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ w("span", { className: "reader-live-translation-toggle-label", children: c })
        ]
      }
    ) : null,
    /* @__PURE__ */ w("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: vi.map(({ id: u, label: d, Icon: f }) => {
      const m = n === u, p = wi({
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
          title: p ? `${d} 需要文档任务` : d,
          disabled: p,
          onClick: () => o(u),
          children: [
            /* @__PURE__ */ w(f, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ w("span", { className: "reader-workspace-tab-label", children: d })
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
        title: Bn(n),
        children: [
          /* @__PURE__ */ w(Mo, { size: 13, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ w("span", { className: "reader-compare-degraded-label", children: Bn(n) })
        ]
      }
    ) : null
  ] });
}
const Ri = {
  markdown: { label: "Markdown", short: "MD", Icon: Ao, needsJob: !0 }
}, Ii = yr.map(
  (e) => ({ id: e, ...Ri[e] })
), Ti = {
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
}, xr = vr.map(
  (e) => ({ id: e, ...Ti[e] })
);
function Ei(e) {
  return [
    ...Ii.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: a
    })),
    ...xr.filter((t) => e(t.adapterKey)).map(({ id: t, label: n, short: r, Icon: o }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: !1
    }))
  ];
}
function Mi() {
  const e = de();
  return Ei((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function Ai(e) {
  const t = it(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), l = Mi();
  return n ? /* @__PURE__ */ U("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ w("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: l.map(({ id: i, label: c, Icon: u, needsJob: d }) => {
      const f = n === i, m = d && o, p = r == null ? void 0 : r[i];
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
            /* @__PURE__ */ w(u, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ w("span", { className: "reader-assistant-dock-tab-label", children: c }),
            p ? /* @__PURE__ */ w("span", { className: "reader-assistant-dock-badge", children: p }) : null
          ]
        },
        i
      );
    }) }),
    /* @__PURE__ */ w(
      "button",
      {
        type: "button",
        className: "reader-assistant-dock-close",
        "aria-label": "关闭阅读辅助面板",
        title: "关闭辅助面板",
        onClick: s,
        children: /* @__PURE__ */ w(lr, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ w("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: l.map(({ id: i, label: c, short: u, Icon: d, needsJob: f }) => {
    const m = f && o, p = r == null ? void 0 : r[i];
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
          /* @__PURE__ */ w(d, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
          /* @__PURE__ */ w("span", { children: u }),
          p ? /* @__PURE__ */ w("span", { className: "reader-assistant-dock-badge", children: p }) : null
        ]
      },
      i
    );
  }) });
}
function _i(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function ki(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function Li(e) {
  return e / 100 * window.innerHeight;
}
function Ci(e) {
  return e / 100 * window.innerWidth;
}
function Di(e) {
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
  const [o, a] = Di(n);
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
      r = ki(t, o);
      break;
    }
    case "em": {
      r = _i(t, o);
      break;
    }
    case "vh": {
      r = Li(o);
      break;
    }
    case "vw": {
      r = Ci(o);
      break;
    }
  }
  return r;
}
function ue(e) {
  return parseFloat(e.toFixed(3));
}
function We({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, o) => (r += t === "horizontal" ? o.element.offsetWidth : o.element.offsetHeight, r), 0);
}
function Wt(e) {
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
      s = ue(u / n * 100);
    }
    let l;
    if (a.defaultSize !== void 0) {
      const u = Ye({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      l = ue(u / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const u = Ye({
        groupSize: n,
        panelElement: o,
        styleProp: a.minSize
      });
      i = ue(u / n * 100);
    }
    let c = 100;
    if (a.maxSize !== void 0) {
      const u = Ye({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      c = ue(u / n * 100);
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
function Z(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function Jt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? zi : Ni
  );
}
function zi(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function Ni(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function Or(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Fr(e, t) {
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
function xi({
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
    const { x: l, y: i } = Fr(r, s), c = e === "horizontal" ? l : i;
    c < a && (a = c, o = s);
  }
  return Z(o, "No rect found"), o;
}
let mt;
function Oi() {
  return mt === void 0 && (typeof matchMedia == "function" ? mt = !!matchMedia("(pointer:coarse)").matches : mt = !1), mt;
}
function $r(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = Jt(
    n,
    Array.from(t.children).filter(Or).map((p) => ({ element: p }))
  ).map(({ element: p }) => p), s = [];
  let l = !1, i = !1, c = -1, u = -1, d = 0, f, m = [];
  {
    let p = -1;
    for (const g of a)
      g.hasAttribute("data-panel") && (p++, g.hasAttribute("data-disabled") || (d++, c === -1 && (c = p), u = p));
  }
  if (d > 1) {
    let p = -1;
    for (const g of a)
      if (g.hasAttribute("data-panel")) {
        p++;
        const v = r.find(
          (b) => b.element === g
        );
        if (v) {
          if (f) {
            const b = f.element.getBoundingClientRect(), P = g.getBoundingClientRect();
            let S;
            if (i) {
              const h = n === "horizontal" ? new DOMRect(
                b.right,
                b.top,
                0,
                b.height
              ) : new DOMRect(
                b.left,
                b.bottom,
                b.width,
                0
              ), y = n === "horizontal" ? new DOMRect(P.left, P.top, 0, P.height) : new DOMRect(P.left, P.top, P.width, 0);
              switch (m.length) {
                case 0: {
                  S = [
                    h,
                    y
                  ];
                  break;
                }
                case 1: {
                  const M = m[0], A = xi({
                    orientation: n,
                    rects: [b, P],
                    targetRect: M.element.getBoundingClientRect()
                  });
                  S = [
                    M,
                    A === b ? y : h
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
            for (const h of S) {
              let y = "width" in h ? h : h.element.getBoundingClientRect();
              const M = Oi() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (y.width < M) {
                const N = M - y.width;
                y = new DOMRect(
                  y.x - N / 2,
                  y.y,
                  y.width + N,
                  y.height
                );
              }
              if (y.height < M) {
                const N = M - y.height;
                y = new DOMRect(
                  y.x,
                  y.y - N / 2,
                  y.width,
                  y.height + N
                );
              }
              const A = p <= c || p > u;
              !l && !A && s.push({
                group: e,
                groupSize: We({ group: e }),
                panels: [f, v],
                separator: "width" in h ? void 0 : h,
                rect: y
              }), l = !1;
            }
          }
          i = !1, f = v, m = [];
        }
      } else if (g.hasAttribute("data-separator")) {
        g.ariaDisabled !== null && (l = !0);
        const v = o.find(
          (b) => b.element === g
        );
        v ? m.push(v) : (f = void 0, m = []);
      } else
        i = !0;
  }
  return s;
}
var Me;
class jr {
  constructor() {
    Rn(this, Me, {});
  }
  addListener(t, n) {
    const r = qe(this, Me)[t];
    return r === void 0 ? qe(this, Me)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = qe(this, Me)[t];
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
    In(this, Me, {});
  }
  removeListener(t, n) {
    const r = qe(this, Me)[t];
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
const cn = new jr();
function Le() {
  return Ue;
}
function Fi(e) {
  return cn.addListener("change", e);
}
function $i(e) {
  const t = Ue, n = { ...Ue };
  n.cursorFlags = e, Ue = n, cn.emit("change", {
    prev: t,
    next: n
  });
}
function Be(e) {
  const t = Ue;
  Ue = e, cn.emit("change", {
    prev: t,
    next: e
  });
}
const ji = (e) => e, Ct = () => {
}, Ur = 1, Br = 2, Hr = 4, Wr = 8, Hn = 3, Wn = 12;
let ht;
function Jn() {
  return ht === void 0 && (ht = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (ht = !0)), ht;
}
function Ui({
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
          const a = (e & Ur) !== 0, s = (e & Br) !== 0, l = (e & Hr) !== 0, i = (e & Wr) !== 0;
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
    return Jn() ? r > 0 && o > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && o > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const Vn = /* @__PURE__ */ new WeakMap();
function ln(e) {
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
      const o = Ui({
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
let ye = /* @__PURE__ */ new Map();
const Jr = new jr();
function Bi(e) {
  ye = new Map(ye), ye.delete(e);
}
function qn(e, t) {
  for (const [n] of ye)
    if (n.id === e)
      return n;
}
function Ae(e, t) {
  for (const [n, r] of ye)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function Ne() {
  return ye;
}
function un(e, t) {
  return Jr.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Ie(e, t, n) {
  const r = ye.get(e);
  ye = new Map(ye), ye.set(e, t), Jr.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function Vr(e) {
  const t = Le();
  let n = !1;
  switch (t.state) {
    case "active":
      Be({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (ln(e), n = !0, t.hitRegions.forEach((r) => {
        const o = Ae(r.group.id, !0);
        Ie(r.group, o, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function Gn(e) {
  e.defaultPrevented || Vr(e.currentTarget);
}
function Hi(e, t, n) {
  let r, o = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const s = Fr(n, a.rect);
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
function Wi(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function Ji(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: Yn(e),
    b: Yn(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  Z(
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
    let l = a.length;
    for (; l--; ) {
      const i = a[l];
      if (i === s.a) return 1;
      if (i === s.b) return -1;
    }
  }
  return Math.sign(o.a - o.b);
}
const Vi = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function qi(e) {
  const t = getComputedStyle(qr(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function Gi(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || qi(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || Vi.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function Kn(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (Z(n, "Missing node"), Gi(n)) return n;
  }
  return null;
}
function Zn(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function Yn(e) {
  const t = [];
  for (; e; )
    t.push(e), e = qr(e);
  return t;
}
function qr(e) {
  const { parentNode: t } = e;
  return Wi(t) ? t.host : t;
}
function Ki(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function Zi({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!Or(n) || n.contains(e) || e.contains(n))
    return !0;
  if (Ji(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (Ki(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function dn(e, t) {
  const n = [];
  return t.forEach((r, o) => {
    if (o.disabled)
      return;
    const a = $r(o), s = Hi(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && Zi({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function Yi(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function le(e, t, n = 0) {
  return Math.abs(ue(e) - ue(t)) <= n;
}
function be(e, t) {
  return le(e, t) ? 0 : e > t ? 1 : -1;
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
  if (be(r, i) < 0)
    if (a) {
      const c = (o + i) / 2;
      be(r, c) < 0 ? r = o : r = i;
    } else
      r = i;
  return r = Math.min(l, r), r = ue(r), r;
}
function rt({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: o,
  trigger: a
}) {
  if (le(e, 0))
    return t;
  const s = a === "imperative-api", l = Object.values(t), i = Object.values(o), c = [...l], [u, d] = r;
  Z(u != null, "Invalid first pivot index"), Z(d != null, "Invalid second pivot index");
  let f = 0;
  switch (a) {
    case "keyboard": {
      {
        const g = e < 0 ? d : u, v = n[g];
        Z(
          v,
          `Panel constraints not found for index ${g}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: S = 0
        } = v;
        if (P) {
          const h = l[g];
          if (Z(
            h != null,
            `Previous layout not found for panel index ${g}`
          ), le(h, b)) {
            const y = S - h;
            be(y, Math.abs(e)) > 0 && (e = e < 0 ? 0 - y : y);
          }
        }
      }
      {
        const g = e < 0 ? u : d, v = n[g];
        Z(
          v,
          `No panel constraints found for index ${g}`
        );
        const {
          collapsedSize: b = 0,
          collapsible: P,
          minSize: S = 0
        } = v;
        if (P) {
          const h = l[g];
          if (Z(
            h != null,
            `Previous layout not found for panel index ${g}`
          ), le(h, S)) {
            const y = h - b;
            be(y, Math.abs(e)) > 0 && (e = e < 0 ? 0 - y : y);
          }
        }
      }
      break;
    }
    default: {
      const g = e < 0 ? d : u, v = n[g];
      Z(
        v,
        `Panel constraints not found for index ${g}`
      );
      const b = l[g], { collapsible: P, collapsedSize: S, minSize: h } = v;
      if (P && be(b, h) < 0)
        if (e > 0) {
          const y = h - S, M = y / 2, A = b + e;
          be(A, h) < 0 && (e = be(e, M) <= 0 ? 0 : y);
        } else {
          const y = h - S, M = 100 - y / 2, A = b - e;
          be(A, h) < 0 && (e = be(100 + e, M) > 0 ? 0 : -y);
        }
      break;
    }
  }
  {
    const g = e < 0 ? 1 : -1;
    let v = e < 0 ? d : u, b = 0;
    for (; ; ) {
      const S = l[v];
      Z(
        S != null,
        `Previous layout not found for panel index ${v}`
      );
      const h = je({
        overrideDisabledPanels: s,
        panelConstraints: n[v],
        prevSize: S,
        size: 100
      }) - S;
      if (b += h, v += g, v < 0 || v >= n.length)
        break;
    }
    const P = Math.min(Math.abs(e), Math.abs(b));
    e = e < 0 ? 0 - P : P;
  }
  {
    let g = e < 0 ? u : d;
    for (; g >= 0 && g < n.length; ) {
      const v = Math.abs(e) - Math.abs(f), b = l[g];
      Z(
        b != null,
        `Previous layout not found for panel index ${g}`
      );
      const P = b - v, S = je({
        overrideDisabledPanels: s,
        panelConstraints: n[g],
        prevSize: b,
        size: P
      });
      if (!le(b, S) && (f += b - S, c[g] = S, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? g-- : g++;
    }
  }
  if (Yi(i, c))
    return o;
  {
    const g = e < 0 ? d : u, v = l[g];
    Z(
      v != null,
      `Previous layout not found for panel index ${g}`
    );
    const b = v + f, P = je({
      overrideDisabledPanels: s,
      panelConstraints: n[g],
      prevSize: v,
      size: b
    });
    if (c[g] = P, !le(P, b)) {
      let S = b - P, h = e < 0 ? d : u;
      for (; h >= 0 && h < n.length; ) {
        const y = c[h];
        Z(
          y != null,
          `Previous layout not found for panel index ${h}`
        );
        const M = y + S, A = je({
          overrideDisabledPanels: s,
          panelConstraints: n[h],
          prevSize: y,
          size: M
        });
        if (le(y, A) || (S -= A - y, c[h] = A), le(S, 0))
          break;
        e > 0 ? h-- : h++;
      }
    }
  }
  const m = Object.values(c).reduce(
    (g, v) => v + g,
    0
  );
  if (!le(m, 100, 0.1))
    return o;
  const p = Object.keys(o);
  return c.reduce((g, v, b) => (g[p[b]] = v, g), {});
}
function Ce(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || be(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function De({
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
  if (!le(o, 100) && r.length > 0)
    for (let l = 0; l < t.length; l++) {
      const i = r[l];
      Z(i != null, `No layout data found for index ${l}`);
      const c = 100 / o * i;
      r[l] = c;
    }
  let a = 0;
  for (let l = 0; l < t.length; l++) {
    const i = n[l];
    Z(i != null, `No layout data found for index ${l}`);
    const c = r[l];
    Z(c != null, `No layout data found for index ${l}`);
    const u = je({
      overrideDisabledPanels: !0,
      panelConstraints: t[l],
      prevSize: i,
      size: c
    });
    c != u && (a += c - u, r[l] = u);
  }
  if (!le(a, 0))
    for (let l = 0; l < t.length; l++) {
      const i = r[l];
      Z(i != null, `No layout data found for index ${l}`);
      const c = i + a, u = je({
        overrideDisabledPanels: !0,
        panelConstraints: t[l],
        prevSize: i,
        size: c
      });
      if (i !== u && (a -= u - i, r[l] = u, le(a, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((l, i, c) => (l[s[c]] = i, l), {});
}
function Gr({
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
        separatorToPanels: p
      }
    ] of i)
      if (c.id === e)
        return {
          defaultLayoutDeferred: u,
          derivedPanelConstraints: d,
          group: c,
          groupSize: m,
          layout: f,
          separatorToPanels: p
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
    const f = a(), m = c.findIndex((v) => v.id === t), p = m === 0, g = m === c.length - 1;
    if (g && i < f && (p || c.slice(0, m).every((v, b) => {
      const P = d[b];
      return (P == null ? void 0 : P.collapsible) && le(P.collapsedSize, u[P.panelId]);
    }))) {
      const v = c.slice(0, m).reduce((b, P) => b + u[P.id], 0);
      return {
        ...u,
        [t]: ue(100 - v)
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
      layout: p,
      separatorToPanels: g
    } = n(), v = s({
      nextSize: i,
      panels: f.panels,
      prevLayout: p,
      derivedPanelConstraints: d
    }), b = De({
      layout: v,
      panelConstraints: d
    });
    Ce(p, b) || Ie(f, {
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
      return i && le(c, u);
    },
    resize: (i) => {
      const { group: c } = n(), { element: u } = o(), d = We({ group: c }), f = Ye({
        groupSize: d,
        panelElement: u,
        styleProp: i
      }), m = ue(f / d * 100);
      l(m);
    }
  };
}
function Xn(e) {
  if (e.defaultPrevented)
    return;
  const t = Ne();
  dn(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (o) => o.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const o = r.panelConstraints.defaultSize, a = Gr({
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
function Kr({
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
      } = t(), c = De({
        layout: n,
        panelConstraints: o
      });
      return r ? l : (Ce(l, c) || Ie(a, {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: o,
        groupSize: s,
        layout: c,
        separatorToPanels: i
      }), c);
    }
  };
}
function ke(e, t) {
  const n = pt(e), r = Ae(n.id, !0), o = n.separators.find(
    (u) => u.element === e
  );
  Z(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  Z(a, "Matching panels not found");
  const s = a.map((u) => n.panels.indexOf(u)), l = Kr({ groupId: n.id }).getLayout(), i = rt({
    delta: t,
    initialLayout: l,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: l,
    trigger: "keyboard"
  }), c = De({
    layout: i,
    panelConstraints: r.derivedPanelConstraints
  });
  Ce(l, c) || Ie(
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
function Qn(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = pt(t);
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
        const r = pt(t), o = Ae(r.id, !0), { derivedPanelConstraints: a, layout: s, separatorToPanels: l } = o, i = r.separators.find(
          (f) => f.element === t
        );
        Z(i, "Matching separator not found");
        const c = l.get(i);
        Z(c, "Matching panels not found");
        const u = c[0], d = a.find(
          (f) => f.panelId === u.id
        );
        if (Z(d, "Panel metadata not found"), d.collapsible) {
          const f = s[u.id], m = d.collapsedSize === f ? r.mutableState.expandedPanelSizes[u.id] ?? d.minSize : d.collapsedSize;
          ke(t, m - f);
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
        Z(o !== null, "Index not found");
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
  const t = Ne(), n = dn(e, t), r = /* @__PURE__ */ new Map();
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
function Zr({
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
    const { group: u, groupSize: d } = c, { orientation: f, panels: m } = u, { disableCursor: p } = u.mutableState;
    let g = 0;
    a ? f === "horizontal" ? g = (t.clientX - a.x) / d * 100 : g = (t.clientY - a.y) / d * 100 : f === "horizontal" ? g = t.clientX < 0 ? -100 : 100 : g = t.clientY < 0 ? -100 : 100;
    const v = r.get(u), b = o.get(u);
    if (!v || !b)
      return;
    const {
      defaultLayoutDeferred: P,
      derivedPanelConstraints: S,
      groupSize: h,
      layout: y,
      separatorToPanels: M
    } = b;
    if (S && y && M) {
      const A = rt({
        delta: g,
        initialLayout: v,
        panelConstraints: S,
        pivotIndices: c.panels.map((N) => m.indexOf(N)),
        prevLayout: y,
        trigger: "mouse-or-touch"
      });
      if (Ce(A, y)) {
        if (g !== 0 && !p)
          switch (f) {
            case "horizontal": {
              l |= g < 0 ? Ur : Br;
              break;
            }
            case "vertical": {
              l |= g < 0 ? Hr : Wr;
              break;
            }
          }
      } else
        Ie(c.group, {
          defaultLayoutDeferred: P,
          derivedPanelConstraints: S,
          groupSize: h,
          layout: A,
          separatorToPanels: M
        });
    }
  });
  let i = 0;
  t.movementX === 0 ? i |= s & Hn : i |= l & Hn, t.movementY === 0 ? i |= s & Wn : i |= l & Wn, $i(i), ln(e);
}
function tr(e) {
  const t = Ne(), n = Le();
  switch (n.state) {
    case "active":
      Zr({
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
  const t = Le(), n = Ne();
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
      Zr({
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
      const a = dn(e, n);
      a.length === 0 ? t.state !== "inactive" && Be({
        cursorFlags: 0,
        state: "inactive"
      }) : Be({
        cursorFlags: 0,
        hitRegions: a,
        state: "hover"
      }), ln(e.currentTarget);
      break;
    }
  }
}
function rr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (Le().state) {
      case "hover":
        Be({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function or(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || Vr(e.currentTarget) && e.preventDefault();
}
function ar(e) {
  let t = 0, n = 0;
  const r = {};
  for (const a of e)
    if (a.defaultSize !== void 0) {
      t++;
      const s = ue(a.defaultSize);
      n += s, r[a.panelId] = s;
    } else
      r[a.panelId] = void 0;
  const o = e.length - t;
  if (o !== 0) {
    const a = ue((100 - n) / o);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = a);
  }
  return r;
}
function Xi(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = We({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, l = {
    asPercentage: ue(a / o * 100),
    inPixels: a
  };
  r.mutableValues.prevSize = l, r.onResize(l, r.id, s);
}
function Qi(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function ec({
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
        const m = f / 100 * n, p = ue(
          m / t * 100
        );
        l.set(d.id, p), o += p;
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
      u[d] = ue(
        f / a * c
      );
    }
  else {
    const d = ue(
      c / i.length
    );
    for (const f of i)
      u[f] = d;
  }
  return u;
}
function tc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const Fe = /* @__PURE__ */ new Map();
function nc(e) {
  let t = !0;
  Z(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new n((p) => {
    for (const g of p) {
      const { borderBoxSize: v, target: b } = g;
      if (b === e.element) {
        if (t) {
          const P = We({ group: e });
          if (P === 0)
            return;
          const S = Ae(e.id);
          if (!S)
            return;
          const h = Wt(e), y = S.defaultLayoutDeferred ? ar(h) : S.layout, M = ec({
            group: e,
            nextGroupSize: P,
            prevGroupSize: S.groupSize,
            prevLayout: y
          }), A = De({
            layout: M,
            panelConstraints: h
          });
          if (!S.defaultLayoutDeferred && Ce(S.layout, A) && Qi(
            S.derivedPanelConstraints,
            h
          ) && S.groupSize === P)
            return;
          Ie(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: h,
            groupSize: P,
            layout: A,
            separatorToPanels: S.separatorToPanels
          });
        }
      } else
        Xi(e, b, v);
    }
  });
  a.observe(e.element), e.panels.forEach((p) => {
    Z(
      !r.has(p.id),
      `Panel ids must be unique; id "${p.id}" was used more than once`
    ), r.add(p.id), p.onResize && a.observe(p.element);
  });
  const s = We({ group: e }), l = Wt(e), i = e.panels.map(({ id: p }) => p).join(",");
  let c = e.mutableState.defaultLayout;
  c && (tc(e.panels, c) || (c = void 0));
  const u = e.mutableState.layouts[i] ?? c ?? ar(l), d = De({
    layout: u,
    panelConstraints: l
  }), f = e.element.ownerDocument;
  Fe.set(
    f,
    (Fe.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return $r(e).forEach((p) => {
    p.separator && m.set(p.separator, p.panels);
  }), Ie(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: l,
    groupSize: s,
    layout: d,
    separatorToPanels: m
  }), e.separators.forEach((p) => {
    Z(
      !o.has(p.id),
      `Separator ids must be unique; id "${p.id}" was used more than once`
    ), o.add(p.id), p.element.addEventListener("keydown", Qn);
  }), Fe.get(f) === 1 && (f.addEventListener("contextmenu", Gn, !0), f.addEventListener("dblclick", Xn, !0), f.addEventListener("pointerdown", er, !0), f.addEventListener("pointerleave", tr), f.addEventListener("pointermove", nr), f.addEventListener("pointerout", rr), f.addEventListener("pointerup", or, !0)), function() {
    t = !1, Fe.set(
      f,
      Math.max(0, (Fe.get(f) ?? 0) - 1)
    ), Bi(e), e.separators.forEach((p) => {
      p.element.removeEventListener("keydown", Qn);
    }), Fe.get(f) || (f.removeEventListener(
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
function rc() {
  const [e, t] = L({}), n = F(() => t({}), []);
  return [e, n];
}
function fn(e) {
  const t = ir();
  return `${e ?? t}`;
}
const xe = typeof window < "u" ? ze : j;
function Qe(e) {
  const t = _(e);
  return xe(() => {
    t.current = e;
  }, [e]), F(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function mn(...e) {
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
function hn(e) {
  const t = _({ ...e });
  return xe(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const Yr = Yt(null);
function oc(e, t) {
  const n = _({
    getLayout: () => ({}),
    setLayout: ji
  });
  Zt(t, () => n.current, []), xe(() => {
    Object.assign(
      n.current,
      Kr({ groupId: e })
    );
  });
}
function Xr({
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
  const p = _({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), g = Qe((R) => {
    Ce(p.current.onLayoutChange, R) || (p.current.onLayoutChange = R, i == null || i(R));
  }), v = Qe(
    (R, E) => {
      Ce(p.current.onLayoutChanged, R) || (p.current.onLayoutChanged = R, c == null || c(R, { isUserInteraction: E }));
    }
  ), b = fn(l), P = _(null), [S, h] = rc(), y = _({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: d,
    separators: []
  }), M = mn(P, a);
  oc(b, s);
  const A = Qe(
    (R, E) => {
      const I = Le(), T = qn(R), x = Ae(R);
      if (x) {
        let z = !1;
        switch (I.state) {
          case "active": {
            z = I.hitRegions.some(
              (O) => O.group === T
            );
            break;
          }
        }
        return {
          flexGrow: x.layout[E] ?? 1,
          pointerEvents: z ? "none" : void 0
        };
      }
      if (n != null && n[E])
        return {
          flexGrow: n == null ? void 0 : n[E]
        };
    }
  ), N = hn({
    defaultLayout: n,
    disableCursor: r
  }), C = G(
    () => ({
      get disableCursor() {
        return !!N.disableCursor;
      },
      getPanelStyles: A,
      id: b,
      orientation: u,
      registerPanel: (R) => {
        const E = y.current;
        return E.panels = Jt(u, [
          ...E.panels,
          R
        ]), h(), () => {
          E.panels = E.panels.filter(
            (I) => I !== R
          ), h();
        };
      },
      registerSeparator: (R) => {
        const E = y.current;
        return E.separators = Jt(u, [
          ...E.separators,
          R
        ]), h(), () => {
          E.separators = E.separators.filter(
            (I) => I !== R
          ), h();
        };
      },
      updatePanelProps: (R, { disabled: E }) => {
        const I = y.current.panels.find(
          (z) => z.id === R
        );
        I && (I.panelConstraints.disabled = E);
        const T = qn(b), x = Ae(b);
        T && x && Ie(T, {
          ...x,
          derivedPanelConstraints: Wt(T)
        });
      },
      updateSeparatorProps: (R, {
        disabled: E,
        disableDoubleClick: I
      }) => {
        const T = y.current.separators.find(
          (x) => x.id === R
        );
        T && (T.disabled = E, T.disableDoubleClick = I);
      }
    }),
    [A, b, h, u, N]
  ), D = _(null);
  return xe(() => {
    const R = P.current;
    if (R === null)
      return;
    const E = y.current;
    let I;
    if (N.defaultLayout !== void 0 && Object.keys(N.defaultLayout).length === E.panels.length) {
      I = {};
      for (const oe of E.panels) {
        const $ = N.defaultLayout[oe.id];
        $ !== void 0 && (I[oe.id] = $);
      }
    }
    const T = {
      disabled: !!o,
      element: R,
      id: b,
      mutableState: {
        defaultLayout: I,
        disableCursor: !!N.disableCursor,
        expandedPanelSizes: y.current.lastExpandedPanelSizes,
        layouts: y.current.layouts
      },
      orientation: u,
      panels: E.panels,
      resizeTargetMinimumSize: E.resizeTargetMinimumSize,
      separators: E.separators
    };
    D.current = T;
    const x = nc(T), { defaultLayoutDeferred: z, derivedPanelConstraints: O, layout: W } = Ae(T.id, !0);
    !z && O.length > 0 && (g(W), v(W, !1));
    const ae = un(b, (oe) => {
      const { defaultLayoutDeferred: $, derivedPanelConstraints: B, layout: te } = oe.next;
      if ($ || B.length === 0)
        return;
      const re = T.panels.map(({ id: Y }) => Y).join(",");
      T.mutableState.layouts[re] = te, B.forEach((Y) => {
        if (Y.collapsible) {
          const { layout: ie } = oe.prev ?? {};
          if (ie) {
            const fe = le(
              Y.collapsedSize,
              te[Y.panelId]
            ), _e = le(
              Y.collapsedSize,
              ie[Y.panelId]
            );
            fe && !_e && (T.mutableState.expandedPanelSizes[Y.panelId] = ie[Y.panelId]);
          }
        }
      });
      const K = Le().state !== "active";
      g(te), K && v(te, oe.isUserInteraction);
    });
    return () => {
      D.current = null, x(), ae();
    };
  }, [
    o,
    b,
    v,
    g,
    u,
    S,
    N
  ]), j(() => {
    const R = D.current;
    R && (R.mutableState.defaultLayout = n, R.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ w(Yr.Provider, { value: C, children: /* @__PURE__ */ w(
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
Xr.displayName = "Group";
function pn() {
  const e = Xt(Yr);
  return Z(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function ac(e, t) {
  const { id: n } = pn(), r = _({
    collapse: Ct,
    expand: Ct,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Ct
  });
  Zt(t, () => r.current, []), xe(() => {
    Object.assign(
      r.current,
      Gr({ groupId: n, panelId: e })
    );
  });
}
function Vt({
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
  ...p
}) {
  const g = !!i, v = fn(i), b = hn({
    disabled: a
  }), P = _(null), S = mn(P, s), {
    getPanelStyles: h,
    id: y,
    orientation: M,
    registerPanel: A,
    updatePanelProps: N
  } = pn(), C = d !== null, D = Qe(
    (T, x, z) => {
      d == null || d(T, i, z);
    }
  );
  xe(() => {
    const T = P.current;
    if (T !== null) {
      const x = {
        element: T,
        id: v,
        idIsStable: g,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: C ? D : void 0,
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
      return A(x);
    }
  }, [
    l,
    n,
    r,
    o,
    C,
    v,
    g,
    c,
    u,
    D,
    A,
    b
  ]), j(() => {
    N(v, { disabled: a });
  }, [a, v, N]), ac(v, f);
  const R = () => {
    const T = h(y, v);
    if (T)
      return JSON.stringify(T);
  }, E = io(
    (T) => un(y, T),
    R,
    R
  );
  let I;
  return E ? I = JSON.parse(E) : o !== void 0 ? I = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: o
  } : I = { flexGrow: 1 }, /* @__PURE__ */ w(
    "div",
    {
      ...p,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": v,
      id: v,
      ref: S,
      style: {
        ...sc,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...I
      },
      children: /* @__PURE__ */ w(
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
Vt.displayName = "Panel";
const sc = {
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
function ic({
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
    a = De({
      layout: rt({
        delta: c - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: u,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], o = De({
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
function Qr({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: o,
  id: a,
  style: s,
  ...l
}) {
  const i = fn(a), c = hn({
    disabled: n,
    disableDoubleClick: r
  }), [u, d] = L({}), [f, m] = L("inactive"), [p, g] = L(!1), v = _(null), b = mn(v, o), {
    disableCursor: P,
    id: S,
    orientation: h,
    registerSeparator: y,
    updateSeparatorProps: M
  } = pn(), A = h === "horizontal" ? "vertical" : "horizontal";
  xe(() => {
    const D = v.current;
    if (D !== null) {
      const R = {
        disabled: c.disabled,
        disableDoubleClick: c.disableDoubleClick,
        element: D,
        id: i
      }, E = y(R), I = Fi(
        (x) => {
          m(
            x.next.state !== "inactive" && x.next.hitRegions.some(
              (z) => z.separator === R
            ) ? x.next.state : "inactive"
          );
        }
      ), T = un(
        S,
        (x) => {
          const { derivedPanelConstraints: z, layout: O, separatorToPanels: W } = x.next, ae = W.get(R);
          if (ae) {
            const oe = ae[0], $ = ae.indexOf(oe);
            d(
              ic({
                layout: O,
                panelConstraints: z,
                panelId: oe.id,
                panelIndex: $
              })
            );
          }
        }
      );
      return () => {
        I(), T(), E();
      };
    }
  }, [S, i, y, c]), j(() => {
    M(i, { disabled: n, disableDoubleClick: r });
  }, [n, r, i, M]);
  let N;
  n && !P && (N = "not-allowed");
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
        p ? C = "focus" : C = f;
    }
  return /* @__PURE__ */ w(
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
      "data-separator": C,
      "data-testid": i,
      id: i,
      onBlur: () => g(!1),
      onFocus: () => g(!0),
      ref: b,
      role: "separator",
      style: {
        flexBasis: "auto",
        cursor: N,
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
Qr.displayName = "Separator";
const gn = 30, bn = 65, ot = 50, cc = 100 - bn, lc = 100 - gn;
function uc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(bn, Math.max(gn, t)) : ot;
}
function yn(e) {
  return 100 - e;
}
function $e(e) {
  return `${e}%`;
}
const vn = "reader-document", at = "reader-assistant", eo = "retainpdf.reader.ai-split-layout.v1", dc = {
  [vn]: yn(ot),
  [at]: ot
};
function Sn(e) {
  const t = uc(e == null ? void 0 : e[at]);
  return {
    [vn]: yn(t),
    [at]: t
  };
}
function fc() {
  try {
    const e = JSON.parse(localStorage.getItem(eo) || "null");
    return Sn(e);
  } catch {
    return dc;
  }
}
function mc(e) {
  try {
    localStorage.setItem(eo, JSON.stringify(Sn(e)));
  } catch {
  }
}
function Dt(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = Sn(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[at]}vw`
  );
}
function hc() {
  const e = _(null), [t] = L(fc);
  ze(() => {
    const o = e.current;
    return Dt(o, t), () => {
      var a;
      (a = o == null ? void 0 : o.closest(".reader-react-root")) == null || a.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = F((o) => {
    Dt(e.current, o);
  }, []), r = F((o, a) => {
    Dt(e.current, o), a.isUserInteraction && mc(o);
  }, []);
  return /* @__PURE__ */ U(
    Xr,
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
        /* @__PURE__ */ w(
          Vt,
          {
            id: vn,
            defaultSize: $e(yn(ot)),
            minSize: $e(cc),
            maxSize: $e(lc)
          }
        ),
        /* @__PURE__ */ w(
          Qr,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ w("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ w(
          Vt,
          {
            id: at,
            defaultSize: $e(ot),
            minSize: $e(gn),
            maxSize: $e(bn)
          }
        )
      ]
    }
  );
}
function pc({
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
        s ? /* @__PURE__ */ w("div", { className: "reader-notes-panel-toolbar", children: s }) : null,
        /* @__PURE__ */ w("div", { className: "reader-notes-panel-body", children: l })
      ]
    }
  );
}
function gc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = L(!1);
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
    /* @__PURE__ */ w(
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
function bc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ w(gc, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ U(Gt, { children: [
    e ? /* @__PURE__ */ w("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ U("div", { className: "reader-boot-loading-card", children: [
      /* @__PURE__ */ w("div", { className: "reader-boot-loading-text", children: n }),
      /* @__PURE__ */ w("div", { className: "reader-boot-loading-track", children: /* @__PURE__ */ w(
        "span",
        {
          className: "reader-boot-loading-bar",
          style: { width: `${Math.max(0, Math.min(100, r))}%` }
        }
      ) })
    ] }) }) : null,
    t ? /* @__PURE__ */ w("div", { className: "reader-react-error", role: "alert", children: n }) : null
  ] });
}
function yc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function vc() {
  const [e, t] = L(!1), n = ir(), r = _(null);
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
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || yc(a.target)) return;
      const s = a.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !a.shiftKey)
          return;
        a.preventDefault(), t((l) => !l);
      }
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, []), /* @__PURE__ */ U("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
    /* @__PURE__ */ w(
      "button",
      {
        type: "button",
        className: `reader-react-hud-btn reader-react-shortcuts-btn${e ? " is-active" : ""}`,
        "aria-label": "快捷键说明",
        "aria-expanded": e,
        "aria-controls": n,
        title: "快捷键（H 或 ?）",
        onClick: () => t((o) => !o),
        children: /* @__PURE__ */ w(ko, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
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
            /* @__PURE__ */ w("strong", { children: "快捷键" }),
            /* @__PURE__ */ w(
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
          /* @__PURE__ */ w("div", { className: "reader-react-shortcuts-body", children: Cs.map((o) => /* @__PURE__ */ U("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ w("h3", { children: o.title }),
            /* @__PURE__ */ w("ul", { children: o.items.map((a) => /* @__PURE__ */ U("li", { children: [
              /* @__PURE__ */ w("kbd", { children: a.keys }),
              /* @__PURE__ */ w("span", { children: a.desc })
            ] }, `${o.title}-${a.keys}`)) })
          ] }, o.title)) }),
          /* @__PURE__ */ w("p", { className: "reader-react-shortcuts-foot", children: "在输入框内不会触发快捷键" })
        ]
      }
    ) : null
  ] });
}
const Sc = ["source", "sideBySide", "translated"], wc = { source: "", translated: "", sideBySide: "" };
function Pc(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = gt(e.sourceUrl), n = gt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return qo({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function Rc(e) {
  const [t, n] = L(() => /* @__PURE__ */ new Set()), r = G(
    () => e ? Pc(e) : wc,
    [e]
  ), o = G(
    () => Sc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = F(async (s) => {
    if (!e) return;
    const l = gt(r[s]);
    if (!(!l || t.has(s)))
      try {
        const i = e.jobId ? Vo(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await Go(
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
        Ko(c), n((u) => {
          const d = new Set(u);
          return d.delete(s), d;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const Ic = {
  source: ur,
  sideBySide: dr,
  translated: fr
}, Tc = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function Ec(e) {
  const t = it(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = Rc(n);
  return /* @__PURE__ */ U("div", { className: "reader-download-actions", role: "group", "aria-label": "下载 PDF", children: [
    /* @__PURE__ */ w("span", { className: "reader-download-actions-prefix", "aria-hidden": !0, children: /* @__PURE__ */ w(Lo, { size: 14, strokeWidth: 2.2 }) }),
    o.map((l) => {
      const i = ho[l], c = gt(r[l]), u = a.has(l), d = !!c && !u, f = d ? "" : po(l, r), m = Ic[l];
      return (
        // 外面这层 span 是为了**让「为什么点不动」这句话真的弹得出来**。
        //
        // disabled 的按钮在主流浏览器上不派发鼠标事件，挂在它自己身上的
        // title 永远不显示 —— 原因只有读屏拿得到（aria-label 还在），鼠标
        // 用户看到的就是一个灰掉的按钮。窄屏（≤900px）下文字标签还会被裁成
        // 1px 只留图标，那时连「这是哪一路」都没了。
        // span 不是 disabled，hover 照样触发。
        /* @__PURE__ */ w(
          "span",
          {
            className: "reader-download-action-slot",
            title: d ? `下载${i.label}` : f,
            children: /* @__PURE__ */ U(
              "button",
              {
                type: "button",
                id: `reader-download-${l}`,
                className: `reader-download-action${u ? " is-busy" : ""}`,
                disabled: !d,
                "aria-label": d ? `下载${i.label}` : f,
                onClick: () => void s(l),
                children: [
                  /* @__PURE__ */ w(m, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
                  /* @__PURE__ */ w("span", { className: "reader-download-action-label", children: Tc[l] })
                ]
              }
            )
          },
          l
        )
      );
    })
  ] });
}
function Mc(e) {
  const t = it(), n = hi(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? st, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), l = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, c = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), u = Da(a), d = a > gr + 1e-3, f = a < br - 1e-3, m = Xe(), p = "50%（半屏，对照铺满）", [g, v] = L(!1), [b, P] = L(`${l}`);
  j(() => {
    g || P(`${Math.min(Math.max(l, 1), Math.max(i, 1))}`);
  }, [l, i, g]);
  const S = () => {
    if (v(!1), !c || i <= 0)
      return;
    const h = Number(`${b}`.trim());
    c(St(h, i));
  };
  return /* @__PURE__ */ U("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    o ? /* @__PURE__ */ w("div", { className: "reader-react-hud-group reader-react-hud-modes", children: o }) : null,
    /* @__PURE__ */ w("div", { className: "reader-react-hud-group", "aria-label": "页码", children: g ? /* @__PURE__ */ U(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (h) => {
          h.preventDefault(), S();
        },
        children: [
          /* @__PURE__ */ w(
            "input",
            {
              className: "reader-react-hud-page-input",
              type: "text",
              inputMode: "numeric",
              pattern: "[0-9]*",
              "aria-label": "跳转到页码",
              value: b,
              autoFocus: !0,
              onChange: (h) => P(h.target.value.replace(/[^\d]/g, "")),
              onBlur: S,
              onKeyDown: (h) => {
                h.key === "Escape" && (h.preventDefault(), v(!1), P(`${l}`));
              }
            }
          ),
          /* @__PURE__ */ U("span", { className: "reader-react-hud-page-suffix", children: [
            "/ ",
            i || "—"
          ] })
        ]
      }
    ) : /* @__PURE__ */ w(
      "button",
      {
        type: "button",
        className: "reader-react-hud-page reader-react-hud-page-btn",
        "aria-label": i > 0 ? `跳转页码，当前第 ${l} 页，共 ${i} 页` : "页码",
        title: i > 0 ? "点击输入页码跳转" : void 0,
        disabled: !c || i <= 0,
        onClick: () => {
          !c || i <= 0 || (P(`${l}`), v(!0));
        },
        children: i > 0 ? `${Math.min(l, i)} / ${i}` : "—"
      }
    ) }),
    /* @__PURE__ */ U("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ w(
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
          "aria-label": `重置为${p}`,
          title: p,
          onClick: () => s(m),
          children: [
            u,
            "%"
          ]
        }
      ),
      /* @__PURE__ */ w(
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
    /* @__PURE__ */ w("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ w(vc, {}) })
  ] });
}
function sr(e) {
  var t, n;
  return Sr(e == null ? void 0 : e.assistantPanel) ? e.assistantPanel : ((t = e == null ? void 0 : e.splitLayout) == null ? void 0 : t.left) === "markdown" || ((n = e == null ? void 0 : e.splitLayout) == null ? void 0 : n.right) === "markdown" ? "markdown" : null;
}
function Ac(e) {
  const [t, n] = L(() => ({
    scope: e,
    panel: sr(Re(e))
  }));
  j(() => {
    n((o) => o.scope === e ? o : {
      scope: e,
      panel: sr(Re(e))
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
const qt = "download-toast";
function _c({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: o = "progress"
}) {
  const a = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ U("div", { className: "download-toast-card reader-floating-surface", "data-tone": o, "aria-live": "polite", children: [
    /* @__PURE__ */ U("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ w("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ w("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ w("div", { className: "download-toast-track", children: /* @__PURE__ */ w("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${a}%` } }) }),
    /* @__PURE__ */ w("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function kc(e = {}) {
  const {
    visible: t = !1,
    title: n = "下载中",
    status: r = "正在准备...",
    meta: o = "等待响应...",
    percent: a = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    Nt.dismiss(qt);
    return;
  }
  Nt.custom(
    () => /* @__PURE__ */ w(_c, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: qt, duration: 1 / 0 }
  );
}
function Lc() {
  const e = F((t) => {
    t && (t.setState = kc, t.hide = () => Nt.dismiss(qt));
  }, []);
  return /* @__PURE__ */ U(Gt, { children: [
    /* @__PURE__ */ w(To, { position: "bottom-right" }),
    /* @__PURE__ */ w("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function to(e) {
  const t = _(!1);
  return e && (t.current = !0), t.current;
}
function Cc(e, t) {
  const n = e === t;
  return { open: n, mounted: to(n) };
}
function Dc({
  panel: e,
  active: t,
  context: n
}) {
  var i;
  const r = t === e.id, o = to(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = de(), l = (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, { ...n, open: r });
  return l == null ? null : /* @__PURE__ */ w(
    pc,
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
const zc = lo(() => import("./ReaderMarkdownPanel-ABX8nV2f.js").then((e) => ({ default: e.ReaderMarkdownPanel })));
function Nc(e) {
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
function xc(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function Oc() {
  const e = ks(), { boot: t, panes: n, sessionFiles: r, session: o } = e, a = Ac(e.viewStateKey), s = a.panel, l = a.setPanel, [i, c] = L(null), [u, d] = L(null), [f, m] = L(!1), p = _(null), g = s !== null, v = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, b = Nc({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: v,
    liveTranslationVisible: f,
    assistantOpen: g,
    assistantPdfPane: i
  }), P = F(() => d(null), []), S = u ? uo({ jobId: o.jobId, name: u, onClose: P }) : null, h = Ps({
    hasOverlayContent: v,
    connection: e.liveTranslation.connection,
    showSource: b.showSource,
    liveTranslationVisible: f,
    assistantOpen: g
  }), y = b.sourceViewOnly, M = b.visibleMode;
  j(() => {
    d(null), m(!1);
  }, [e.viewStateKey]), j(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), j(() => {
    c(null);
  }, [a.scope]), j(() => {
    if (!(t.loading || t.failed)) {
      if (p.current !== e.viewStateKey) {
        p.current = e.viewStateKey;
        const O = Re(e.viewStateKey), W = y ? "source" : O == null ? void 0 : O.mode;
        W && W !== e.mode && e.setModeKeepingPage(W);
        return;
      }
      Pt(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, y]);
  const A = s || (e.mode === "compare" ? "compare" : "reading"), N = Cc(s, "markdown");
  Ns({
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
  const C = F(() => {
    l(null), c(null);
  }, []), D = F((O) => {
    c(null);
    const W = xc(O, e.liveTranslationAvailable);
    W !== null && m(W), e.setModeKeepingPage(O);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), R = G(() => h.sourcePaneToggle ? /* @__PURE__ */ w(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m((O) => !O),
      "aria-pressed": f,
      title: f ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ) : null, [h.sourcePaneToggle, f]), E = F((O) => {
    l(O), c(null);
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
    onClose: C
  }), [C, o.documentId, o.jobId]), T = G(() => ({
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
    sourceViewOnly: y,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: E, close: C }
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
    y,
    e.download,
    e.goToPage,
    E,
    C
  ]), x = G(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), z = [
    Ta,
    `is-workspace-${A}`,
    g ? "is-assistant-open" : "",
    b.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ w(mi, { value: T, hud: x, children: /* @__PURE__ */ U("div", { className: z, "data-reader-engine": "react-pdf", "data-reader-workspace": A, children: [
    /* @__PURE__ */ w(bc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ U("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ w(Ec, {}),
      /* @__PURE__ */ w(Us, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ w(
      Pi,
      {
        mode: M,
        documentReady: !!o.jobId,
        sourceViewOnly: y,
        onModeChange: D,
        liveTranslation: h.topBarPill ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m((O) => !O)
        } : null,
        compareDegraded: b.compareDegradedByAssistant,
        onRestoreCompare: C
      }
    ),
    /* @__PURE__ */ w(Ai, { active: s }),
    g ? /* @__PURE__ */ w(hc, {}) : null,
    /* @__PURE__ */ w(yi, { paneComposition: b, markdownSplit: N.open, assistantSplit: g, liveTranslation: e.liveTranslation, sourcePaneAction: R }),
    S,
    e.showHud ? /* @__PURE__ */ w(
      Mc,
      {
        mode: M,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ U(co, { fallback: null, children: [
      xr.map((O) => /* @__PURE__ */ w(
        Dc,
        {
          panel: O,
          active: s,
          context: I
        },
        O.id
      )),
      N.mounted ? /* @__PURE__ */ w(zc, { open: N.open, jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: C }) : null
    ] }),
    /* @__PURE__ */ w(Lc, {})
  ] }) });
}
function el() {
  return /* @__PURE__ */ w(Oc, {});
}
export {
  el as R,
  Oc as a,
  pc as b,
  Xc as d,
  Yc as f,
  Qc as r
};
//# sourceMappingURL=ReaderApp-CehmgkAm.js.map
