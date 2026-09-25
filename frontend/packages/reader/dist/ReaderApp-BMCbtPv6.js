var Cn = (e) => {
  throw TypeError(e);
};
var Ln = (e, t, n) => t.has(e) || Cn("Cannot " + n);
var Ze = (e, t, n) => (Ln(e, t, "read from private field"), n ? n.call(e) : t.get(e)), xn = (e, t, n) => t.has(e) ? Cn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), _n = (e, t, n, r) => (Ln(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as N, jsx as h, Fragment as ut } from "react/jsx-runtime";
import { useMemo as Z, useState as M, useEffect as $, useCallback as x, useRef as A, useLayoutEffect as De, memo as rn, forwardRef as Eo, useImperativeHandle as on, createContext as an, useContext as sn, useSyncExternalStore as Ao, useId as Ir, Suspense as ko, lazy as cn } from "react";
import { requireAdapter as be, getReaderAdapters as ce } from "./adapters.js";
import { resolveReaderDownloadName as Mo, createReaderServerFavoritesPort as No, resolveReaderDownloadUrls as Co, READER_PROGRESS_COPY as we, trimString as Tt, READER_DOWNLOAD_ACTIONS as Lo, disabledReason as xo } from "./runtime/state.js";
import { d as _o } from "./ask-answerer-GNQdzitl.js";
import "@retainpdf/api/conversations";
import { r as Do, b as zo } from "./page-config-Ct7qR5rm.js";
import { c as Fo, n as Oo, f as Pt, h as Dn, a as $o, b as jo, i as Rr, p as ft, g as Tr, r as Er, j as _t, e as Uo } from "./reader-regions-DsePY7B_.js";
import { i as Bo, c as Ho } from "./live-translation-CbniFg2b.js";
import { sortByPageAndCreatedAt as Jo, buildAnnotationsMarkdown as Wo, groupByPageAndCreatedAt as qo } from "./runtime/content.js";
import { toast as Ht, Toaster as Ko } from "sonner";
import { X as ln, Radio as Vo, FileText as Ar, Columns2 as kr, Languages as Mr, PanelRightClose as Go, Bookmark as Zo, Highlighter as Yo, StickyNote as Nr, Sparkles as Cr, FileCode2 as Xo, SquareTerminal as Qo, PenTool as ea, Route as ta, Sigma as na, Table2 as ra, Type as oa, Image as aa, Check as sa, Copy as ia, Keyboard as ca } from "lucide-react";
import { pdfjs as la, Page as da, Document as ua } from "react-pdf";
import { e as fa, m as ma, a as pa } from "./markdown-math-XkF5urpn.js";
const ha = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, ga = "", ba = Object.freeze({
  progress: "retainpdf-reader-progress"
}), ya = (e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, ed = (...e) => {
  var n;
  return (((n = ce()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Pe = () => be("defaultReaderDataPort"), zn = () => be("defaultReaderPageConfigPort"), td = {
  get apiPrefix() {
    return Pe().apiPrefix;
  },
  fetchProtected: (...e) => Pe().fetchProtected(...e),
  loadMarkdownPayload: (e) => Pe().loadMarkdownPayload(e),
  loadMarkdownSource: (e) => Pe().loadMarkdownSource(e),
  loadMarkdownRange: (e, t, n, r, o) => Pe().loadMarkdownRange(e, t, n, r, o),
  loadJobPayload: (e) => Pe().loadJobPayload(e),
  loadReaderPayload: (e, t) => Pe().loadReaderPayload(e, t),
  loadAiNotes: (e) => Pe().loadAiNotes(e),
  get liveTranslation() {
    return Pe().liveTranslation;
  }
}, Lr = {
  messageTargetOrigin: () => zn().messageTargetOrigin(),
  readerJobId: () => zn().readerJobId()
}, va = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.liveTranslation) ?? null;
}, at = () => {
  var t;
  const e = ce();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, dn = () => {
  const e = ce();
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
      var o;
      return ((o = e.resolveReaderTranslatedPdfUrl) == null ? void 0 : o.call(e, n, r)) ?? "";
    },
    resolveReaderArtifactUrl: (n) => {
      var r;
      return ((r = e.resolveReaderArtifactUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, nd = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.aiOperations) ?? null;
}, rd = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.conversations) ?? null;
}, od = () => {
  var e;
  return ((e = ce()) == null ? void 0 : e.askChat) ?? null;
}, Sa = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, wa = () => {
  var e, t;
  return ((t = (e = ce()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, Pa = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, Ia = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? Mo(...e);
}, Ra = (...e) => {
  var t, n;
  return ((n = (t = ce()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? Co(...e);
}, Ta = (...e) => be("downloadProtectedResource")(...e), Ea = (...e) => be("failDownloadToast")(...e), ad = (e, t) => be("resolveMarkdownAssetUrl")(e, t), sd = (e = {}) => {
  const t = ce();
  return _o({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) || "/api/v1",
    ask: t == null ? void 0 : t.askDocumentAi,
    documentByJobId: t == null ? void 0 : t.fetchDocumentByJobId,
    ...e
  });
}, un = "/api/v1", id = (e = un, t = {}) => {
  var n;
  return be("fetchFavorites")(
    ((n = ce()) == null ? void 0 : n.apiPrefix) ?? e,
    t
  );
};
function cd(e = {}) {
  const t = ce();
  return No({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) ?? un,
    documentByJobId: (...n) => be("fetchDocumentByJobId")(...n),
    submitFavorite: (...n) => be("createFavorite")(...n),
    loadFavorites: (...n) => be("fetchFavorites")(...n),
    removeFavorite: (...n) => be("deleteFavorite")(...n),
    ...e
  });
}
function Aa() {
  const e = () => {
    var r;
    return Do(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = M(e);
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
function ka() {
  const e = Aa(), t = Z(() => Pa(Lr), [e]), n = Z(() => wa(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function Ma(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: o,
    documentIdRef: a,
    sessionJobIdRef: s,
    switchToSourceMode: c
  } = e, [i, l] = M({
    documentId: "",
    jobId: ""
  }), [d, u] = M({
    documentId: "",
    jobId: ""
  }), f = i.documentId === t ? i.jobId : "", m = d.documentId === t ? d.jobId : "", g = n || f, [p, v] = M({
    jobId: "",
    documentId: ""
  }), y = p.jobId === g ? p.documentId : "", P = t || y, w = !!t && !g, [b, S] = M(null), E = (b == null ? void 0 : b.sessionIdentity) === r && b.documentId === P ? b : null, k = w || !!E, z = x((F) => {
    const R = `${F.documentId || ""}`.trim();
    if (!R || a.current && a.current !== R) return;
    if (!a.current && s.current)
      v({
        jobId: s.current,
        documentId: R
      });
    else if (!a.current)
      return;
    const I = `${F.revision || ""}`.trim() || `${Date.now()}`;
    S({
      documentId: R,
      revision: I,
      sessionIdentity: o.current
    }), c();
  }, []);
  $(() => {
    S((F) => F && F.sessionIdentity !== r ? null : F);
  }, [r]);
  const _ = x((F) => {
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
    rejectedDocumentJobId: m,
    sessionJobId: g,
    resolvedJobDocument: p,
    setResolvedJobDocument: v,
    jobDocumentId: y,
    documentId: P,
    sourceOnly: w,
    committedDocumentSource: b,
    setCommittedDocumentSource: S,
    activeCommittedDocumentSource: E,
    sourceViewOnly: k,
    refreshCommittedDocument: z,
    applyIdentityEvent: _
  };
}
const Na = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Fn(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function Ca(e) {
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
  return ya(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function La(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function xa(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const o of n) {
    const a = `${o || ""}`.trim();
    if (a && !La(a, t))
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
        type: ba.progress,
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
function _a(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: o,
    sessionEpochRef: a,
    closingRef: s
  } = e, [c, i] = M(null), [l, d] = M(null), [u, f] = M(""), [m, g] = M(0), p = u === n ? c : null, v = u === n ? l : null, y = Fn(p), P = Na.has(y), w = x(() => {
    g((_) => _ + 1);
  }, []), b = x((_) => {
    i(_.jobPayload), d(_.manifestPayload), f(_.sessionIdentity);
  }, []), S = x((_) => {
    i(null), d(null), f(_);
  }, []), E = A(""), k = A(""), z = x(async () => {
    const _ = o.current;
    if (!_ || E.current === _) return;
    const F = dn().loadJobPayload;
    if (typeof F != "function") return;
    const R = a.current.value;
    E.current = _;
    try {
      const I = await F(_);
      if (s.current || a.current.value !== R || o.current !== _ || !I || typeof I != "object")
        return;
      const T = Fn(I);
      i(I), f(r.current), T === "succeeded" && k.current !== _ && (k.current = _, g((C) => C + 1));
    } catch {
    } finally {
      E.current === _ && (E.current = "");
    }
  }, []);
  return $(() => {
    k.current = "";
  }, [n]), $(() => {
    if (!t || P || !p) return;
    const _ = window.setInterval(() => {
      z();
    }, 1e3);
    return () => window.clearInterval(_);
  }, [P, z, p, t]), {
    jobPayload: c,
    setJobPayload: i,
    manifestPayload: l,
    setManifestPayload: d,
    payloadSessionIdentity: u,
    setPayloadSessionIdentity: f,
    scopedJobPayload: p,
    scopedManifestPayload: v,
    jobStatus: y,
    jobTerminal: P,
    jobRefreshRevision: m,
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
function Da(e, t) {
  e(t), Wt(t);
}
function za(e) {
  const [t, n] = M(e ? "source" : "compare"), r = x((a) => {
    e && a !== "source" || (n(a), Wt(a));
  }, [e]), o = x((a) => {
    Da(n, a);
  }, []);
  return $(() => (e && document.documentElement.classList.add("reader-source-only"), Wt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: o };
}
function $n(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function Fa(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: $n(n.active_job_id),
    activeVersionId: $n(n.active_version_id)
  };
}
function Oa(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, o = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return o ? { kind: "follow-active-job", jobId: o, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function $a(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: o,
    hasCommittedSource: a
  } = e;
  return t && r && n === o && !a ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function ja(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function Ua(e) {
  return e ? { data: e.data.slice() } : null;
}
const Ba = 2, ye = /* @__PURE__ */ new Map();
function qt(e, t) {
  ye.delete(e), ye.set(e, t);
}
function Ha(e) {
  if (ye.size < Ba) return;
  const t = ye.keys().next().value;
  t && ye.delete(t);
}
function Dt(e) {
  const t = `${e || ""}`.trim();
  if (!t || !ye.has(t)) return null;
  const n = ye.get(t);
  return qt(t, n), n;
}
async function xr(e, t = at().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (ye.has(r)) {
    const c = ye.get(r);
    return qt(r, c), c;
  }
  const o = await t(r, { signal: n.signal });
  if (!o.ok) {
    const c = new Error(`读取 PDF 失败 (${o.status})`);
    throw c.status = o.status, c;
  }
  const a = await o.arrayBuffer(), s = { data: new Uint8Array(a) };
  return ye.has(r) ? qt(r, s) : (Ha(), ye.set(r, s)), s;
}
function Ja(e = "", t = null) {
  const [n, r] = M(
    () => t || Dt(e)
  ), [o, a] = M(
    () => !!`${e || ""}`.trim() && !t && !Dt(e)
  ), [s, c] = M("");
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
    const l = Dt(i);
    if (l) {
      r(l), a(!1), c("");
      return;
    }
    let d = !1;
    return a(!0), c(""), r(null), xr(i).then((u) => {
      d || (r(u), a(!1));
    }).catch((u) => {
      d || (r(null), a(!1), c((u == null ? void 0 : u.message) || String(u)));
    }), () => {
      d = !0;
    };
  }, [e, t]), { file: n, loading: o, error: s };
}
function Wa(e) {
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
async function Kt(e) {
  const { url: t, label: n, percentStart: r, percentEnd: o, fence: a, setBoot: s } = e;
  if (!t || a.isInactive())
    return null;
  Et(s, r, n, "download");
  const c = await xr(t, at().fetchProtected, {
    signal: a.signal
  });
  return a.isInactive() ? null : (Et(s, o, n, "download"), c);
}
async function qa(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: o } = e;
  Et(o, 25, "正在下载 PDF…", "download");
  const a = [];
  let s = null, c = null;
  return t && a.push(
    Kt({
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
    Kt({
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
const yt = {
  regions: null,
  metadata: null
};
function Ka(e) {
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
    sessionEpochRef: p,
    closingRef: v,
    activeLoadAbortRef: y
  } = e, [P, w] = M(""), [b, S] = M(""), [E, k] = M(null), [z, _] = M(null), [F, R] = M(!1), [I, T] = M(""), [C, O] = M([]), [j, Y] = M(() => ({
    source: null,
    translated: null
  })), [U, K] = M(
    yt
  ), [V, L] = M({
    loading: !0,
    percent: 4,
    text: we.boot,
    stage: "progress",
    failed: !1
  });
  return $(() => {
    const W = new AbortController(), se = p.current.value, Q = Wa({
      sessionEpochRef: p,
      closingRef: v,
      abort: W,
      sessionEpoch: se
    });
    y.current = W;
    const te = dn();
    if (v.current)
      return W.abort(), () => {
        y.current === W && (y.current = null);
      };
    function oe(J, ee) {
      Q.markFailed(), L({
        loading: !1,
        percent: 100,
        text: J,
        stage: "failed",
        failed: !0
      }), Jt({ percent: 100, text: ee, stage: "failed" });
    }
    function me() {
      R(!0), L({
        loading: !1,
        percent: 100,
        text: we.ready,
        stage: "ready",
        failed: !1
      }), Jt({ percent: 100, text: we.ready, stage: "ready" });
    }
    function le() {
      return l != null && l.documentId ? On(
        l.documentId,
        l.revision
      ) : ha() ? ga : te.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function Ee() {
      let J = { activeJobId: "", activeVersionId: "" };
      try {
        const de = await te.fetchProtected(
          te.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (de != null && de.ok) {
          const Ae = await de.json().catch(() => null);
          J = Fa(Ae);
        }
      } catch {
      }
      const ee = Oa({
        link: J,
        rejectedDocumentJobId: a,
        hasCommittedSource: !!l
      });
      if (ee.kind === "follow-active-job") {
        if (Q.isInactive()) return;
        d({
          type: "resolved-document-job",
          documentId: r,
          jobId: ee.jobId
        }), ee.activeVersionId ? (l || d({
          type: "committed-source",
          documentId: r,
          revision: ee.activeVersionId,
          sessionIdentity: i
        }), m("source")) : m("compare");
        return;
      }
      if (ee.kind === "open-committed-source") {
        if (Q.isInactive()) return;
        d({
          type: "committed-source",
          documentId: r,
          revision: ee.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const ae = le();
      if (Q.isInactive()) return;
      w(ae), S(""), T(""), f(i);
      const he = await Kt({
        url: ae,
        label: "正在下载原文 PDF…",
        percentStart: 30,
        percentEnd: 85,
        fence: Q,
        setBoot: L
      });
      if (!Q.isInactive()) {
        if (!he) {
          oe("源文件不可用：该文档没有可读取的源 PDF。", "源文件下载失败");
          return;
        }
        k(he), me();
      }
    }
    async function Oe() {
      var ke;
      const J = await ((ke = te.loadSessionSnapshot) == null ? void 0 : ke.call(te, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: l,
        includeOptionalArtifacts: !l
      })), ee = J ? {
        jobPayload: J.sourcePayload,
        manifestPayload: J.manifestPayload,
        readerMetadata: J.readerMetadata,
        regionsPayload: J.regions,
        readerErrors: J.readerErrors
      } : await te.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !l
      });
      if (Q.isInactive()) return;
      let ae = null;
      if (n && !r) {
        try {
          ae = await te.fetchDocumentByJobId(un, t);
        } catch {
        }
        if (Q.isInactive()) return;
      }
      const he = Ca(ee.jobPayload) || `${(ae == null ? void 0 : ae.document_id) || ""}`.trim();
      he && !r && d({
        type: "resolved-job-document",
        jobId: t,
        documentId: he
      });
      const de = $a({
        payloadDocumentId: he,
        linkedActiveJobId: `${(ae == null ? void 0 : ae.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(ae == null ? void 0 : ae.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!l
      });
      if (de.kind === "restore-committed-source") {
        if (Q.isInactive()) return;
        d({
          type: "committed-source",
          documentId: de.documentId,
          revision: de.revision,
          sessionIdentity: i
        }), m("source");
        return;
      }
      const Ae = te.resolveReaderSourcePdf(ee.manifestPayload), xt = te.resolveReaderTranslatedPdfUrl(ee.jobPayload, ee.manifestPayload), ht = typeof Ae == "string" ? Ae : te.resolveReaderArtifactUrl(Ae), gt = r || he, $e = l != null && l.documentId ? On(
        l.documentId,
        l.revision
      ) : ht || (gt ? te.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(gt)}/source.pdf`) : ""), Ge = l ? "" : xt || "";
      if (w($e || ""), S(Ge), T(xa(ee.jobPayload, t)), u({
        jobPayload: ee.jobPayload || null,
        manifestPayload: ee.manifestPayload || null,
        sessionIdentity: i
      }), O(l ? [] : Fo(ee.regionsPayload)), Y(l ? { source: null, translated: null } : Oo(ee.readerMetadata)), K(l ? yt : ee.readerErrors ?? yt), !$e && !Ge) {
        oe(we.failed, we.failed);
        return;
      }
      const je = await qa({
        sourceFinal: $e || "",
        translatedFinal: Ge,
        fence: Q,
        setBoot: L
      });
      if (je.status !== "inactive") {
        if (je.status === "incomplete") {
          oe("PDF 下载失败，请重试", "PDF 下载失败");
          return;
        }
        k(je.sourceBytes), _(je.translatedBytes), me();
      }
    }
    async function H() {
      R(!1), k(null), _(null), O([]), Y({ source: null, translated: null }), K(yt), Et(L, 8, we.metadata, "metadata");
      try {
        if (s) {
          await Ee();
          return;
        }
        if (!t) {
          oe(we.failed, we.failed);
          return;
        }
        await Oe();
      } catch (J) {
        if (Q.isClosedOrStale() || (J == null ? void 0 : J.name) === "AbortError") return;
        Q.markFailed();
        const ee = Number(J == null ? void 0 : J.status);
        if (ja({
          status: ee,
          jobId: n,
          routeDocumentId: r,
          documentJobId: o,
          sessionJobId: t
        })) {
          d({ type: "missing-document-job", documentId: r, jobId: t }), d({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const ae = J instanceof Error ? J.message : we.failed;
        oe(ae, ae);
      }
    }
    return H(), () => {
      W.abort(), y.current === W && (y.current = null);
    };
  }, [t, r, o, a, s, c, l, g, n, i, d, u, f, m]), {
    sourceUrl: P,
    translatedUrl: b,
    sourceFile: E,
    translatedFile: z,
    assetsReady: F,
    title: I,
    regions: C,
    readerMetadata: j,
    readerErrors: U,
    boot: V
  };
}
function Va() {
  const e = A(!1), t = A(null), { locationKey: n, jobId: r, routeDocumentId: o, sessionIdentity: a } = ka(), s = A({ identity: "", value: 0 });
  s.current.identity !== a && (s.current = {
    identity: a,
    value: s.current.value + 1
  }, e.current = !1);
  const c = A(a), i = A(""), l = A(""), d = A(() => {
  }), u = x(() => d.current(), []), f = Ma({
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
    sourceOnly: p,
    sourceViewOnly: v
  } = f, { mode: y, setMode: P, switchSessionMode: w } = za(v);
  d.current = () => {
    w("source");
  }, c.current = a, i.current = g, l.current = m;
  const b = _a({
    sessionJobId: m,
    sessionIdentity: a,
    sessionIdentityRef: c,
    sessionJobIdRef: l,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: S,
    scopedManifestPayload: E,
    jobStatus: k,
    jobTerminal: z,
    jobRefreshRevision: _,
    refreshJobArtifacts: F,
    refreshJobStatus: R
  } = b, I = Ka({
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
    publishPayload: b.publishPayload,
    clearPayload: b.clearPayload,
    switchSessionMode: w,
    jobRefreshRevision: _,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), T = x(() => {
    var O;
    e.current = !0, (O = t.current) == null || O.abort();
  }, []), C = Z(
    () => ({
      fetchProtected: dn().fetchProtected,
      jobId: m,
      jobPayload: S,
      manifestPayload: E,
      sourceUrl: I.sourceUrl,
      translatedUrl: I.translatedUrl,
      sourceOnly: v
    }),
    [m, S, E, I.sourceUrl, I.translatedUrl, v]
  );
  return {
    jobId: m,
    jobStatus: k,
    workflow: `${(S == null ? void 0 : S.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: z,
    documentId: g,
    sessionIdentity: a,
    sourceOnly: p,
    mode: y,
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
    download: C,
    refreshJobArtifacts: F,
    refreshJobStatus: R,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: T
  };
}
const Ga = 160, Za = 8, Ya = 960;
function Xa() {
  const e = A(null), [t, n] = M(null), [r, o] = M(Ya), a = x((s) => {
    e.current = s, n(s);
  }, []);
  return $(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const c = (l) => {
      !Number.isFinite(l) || l < Ga || o((d) => Math.abs(d - l) < Za ? d : l);
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
function Qa(e) {
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
const zt = { source: 0, translated: 0 };
function es(e, t) {
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
  const [u, f] = M(() => ({
    identity: l,
    pages: zt
  })), [m, g] = M(() => ({ identity: l, tick: 0 })), p = u.identity === l ? u.pages : zt, v = m.identity === l ? m.tick : 0, y = Qa({
    mode: n,
    sourceOnly: r,
    assetsReady: o,
    hasSource: !!c || !!a,
    hasTranslated: !!i
  }), { primaryPane: P } = y, w = x((R, I) => {
    d.current === l && f((T) => {
      const C = T.identity === l ? T.pages : zt;
      return C[I] === R && T.identity === l ? T : {
        identity: l,
        pages: { ...C, [I]: R }
      };
    });
  }, [l]), b = A(null), S = x(() => {
    b.current && clearTimeout(b.current);
    const R = l;
    b.current = setTimeout(() => {
      b.current = null, d.current === R && g((I) => ({
        identity: R,
        tick: I.identity === R ? I.tick + 1 : 1
      }));
    }, 60);
  }, [l]);
  $(() => (b.current && (clearTimeout(b.current), b.current = null), f((R) => R.identity === l && R.pages.source === 0 && R.pages.translated === 0 ? R : { identity: l, pages: { source: 0, translated: 0 } }), g((R) => R.identity === l && R.tick === 0 ? R : { identity: l, tick: 0 }), () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [l]);
  const E = Z(
    () => Math.max(p.source, p.translated),
    [p]
  ), k = P === "translated" ? p.translated : p.source || p.translated, z = t == null ? void 0 : t.userZoom, _ = t == null ? void 0 : t.shellWidth, F = `${l}-${v}-${z}-${n}-${p.source}-${p.translated}-${_}`;
  return {
    ...y,
    numPagesByPane: p,
    hudNumPages: E,
    primaryNumPages: k,
    metricsTick: v,
    onNumPages: w,
    onMetrics: S,
    rowSyncRevision: F
  };
}
const qe = "data-reader-page", Ke = "data-reader-pane", fn = "data-natural-height", ts = "reader-react-root", ns = "reader-react-grid", _r = "reader-react-scroll-shell", rs = "reader-react-pdf-pane", Dr = "reader-react-pdf-page", At = "reader-react-pdf-page-placeholder", mn = "reader-react-pdf-page-slot";
function st(e, t) {
  const n = e != null ? `[${qe}="${e}"]` : `[${qe}]`;
  return t ? `${n}[${Ke}="${t}"]` : n;
}
function os() {
  return `.${mn}[${qe}]`;
}
function Nt(e) {
  return Number(e.getAttribute(qe));
}
const zr = 0.25, Fr = 1, as = 0.05, mt = 0.5, ss = 16, is = 8;
function rt(e) {
  return mt;
}
function Ct(e) {
  return Number.isFinite(e) ? Math.min(Fr, Math.max(zr, e)) : mt;
}
function it(e, t) {
  const n = Ct(Number(e) + t * as);
  return Math.round(n * 100) / 100;
}
function cs(e) {
  return Math.round(Ct(e) * 100);
}
function ls(e) {
  const n = (Number(e) || 0) - ss - is;
  return Math.max(160, Math.floor(n));
}
function ds(e, t = mt) {
  const n = Ct(t);
  return ls((Number(e) || 0) * n);
}
function us(e, t) {
  if (!e || !Number.isFinite(t) || t <= 0 || Math.abs(t - 1) < 1e-3)
    return;
  const n = e.scrollLeft + e.clientWidth / 2, r = e.scrollTop + e.clientHeight / 2, o = Array.from(
    e.querySelectorAll(`[${Ke}]`)
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
const Or = [
  "markdown",
  "ai",
  "notes",
  "ai-notes",
  "favorites"
], $r = [
  "reading-path",
  "reading-canvas",
  "terminal"
], fs = [
  ...Or,
  ...$r
];
function jr(e) {
  return fs.includes(e);
}
const ms = "retainpdf:reader:view:v1:", jn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), ps = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function Ur() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function Vt(e) {
  return `${e || ""}`.trim();
}
function hs({
  documentId: e,
  jobId: t
}) {
  const n = Vt(e);
  if (n) return `document:${n}`;
  const r = Vt(t);
  return r ? `job:${r}` : "";
}
function Br(e) {
  const t = Vt(e);
  return t ? `${ms}${t}` : "";
}
function gs(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function bs(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!jn.has(t) || !jn.has(n) || t === n))
    return { left: t, right: n };
}
function ys(e) {
  return e === null ? null : jr(e) ? e : void 0;
}
function vs(e) {
  return ps.has(e) ? e : void 0;
}
function Hr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = gs(t.anchor), r = Number(t.zoom), o = vs(t.mode), a = bs(t.splitLayout), s = ys(t.assistantPanel);
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
function Re(e, t = Ur()) {
  const n = Br(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Hr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function Lt(e, t, n = Ur()) {
  const r = Br(e);
  if (!r || !n) return null;
  const o = Re(e, n), a = Hr({
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
function Ss(e, t, n = "") {
  const [r, o] = M(() => {
    var u;
    return ((u = Re(n)) == null ? void 0 : u.zoom) ?? rt();
  }), a = A(r), s = A(n);
  a.current = r;
  const c = A(1);
  $(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const u = ((f = Re(n)) == null ? void 0 : f.zoom) ?? rt();
    c.current = 1, a.current = u, o(u);
  }, [e, n]);
  const i = x((u) => {
    const f = Ct(u), m = a.current;
    Math.abs(f - m) < 5e-4 || (c.current = f / (m || 1), Lt(s.current, { zoom: f }), o(f));
  }, []), l = x((u) => {
    i(it(a.current, u));
  }, [i]), d = x((u) => {
    i(rt());
  }, [i]);
  return De(() => {
    const u = c.current;
    Math.abs(u - 1) < 1e-3 || (c.current = 1, us(t == null ? void 0 : t.current, u));
  }, [r, t]), { userZoom: r, onZoomChange: i, stepZoom: l, resetZoom: d };
}
function ws(e, t = !0) {
  const [n, r] = M(null), o = x(() => {
    var c, i;
    r(null);
    const s = (c = globalThis.getSelection) == null ? void 0 : c.call(globalThis);
    (i = s == null ? void 0 : s.removeAllRanges) == null || i.call(s);
  }, []), a = e.current ?? null;
  return $(() => {
    if (!t)
      return;
    const s = () => {
      var O, j;
      const p = e.current, v = (O = globalThis.getSelection) == null ? void 0 : O.call(globalThis);
      if (!p || !v || v.isCollapsed || !v.rangeCount) {
        r(null);
        return;
      }
      const y = v.getRangeAt(0);
      if (!p.contains(y.commonAncestorContainer)) {
        r(null);
        return;
      }
      const P = `${v.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (P.length < 2) {
        r(null);
        return;
      }
      let w = y.commonAncestorContainer;
      w.nodeType === Node.TEXT_NODE && (w = w.parentElement);
      const b = (j = w == null ? void 0 : w.closest) == null ? void 0 : j.call(
        w,
        st()
      );
      if (!b || !p.contains(b)) {
        r(null);
        return;
      }
      const S = Math.max(1, Math.floor(Nt(b) || 1)), k = b.getAttribute(Ke) === "translated" ? "translated" : "source", z = y.getClientRects(), _ = z[z.length - 1] || y.getBoundingClientRect();
      if (!_ || _.width === 0 && _.height === 0) {
        r(null);
        return;
      }
      const F = typeof window < "u" ? window.innerWidth : 800, R = typeof window < "u" ? window.innerHeight : 600, I = 16, T = Math.min(Math.max(I, _.left), F - I), C = Math.min(Math.max(I, _.top), R - I);
      r({
        selectionType: "text",
        quote: P,
        page: S,
        pane: k,
        rect: {
          left: T,
          top: C,
          width: _.width,
          height: _.height
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
    const g = a ?? e.current;
    return g == null || g.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", i), document.removeEventListener("pointerup", l), document.removeEventListener("touchend", d), document.removeEventListener("selectionchange", u), document.removeEventListener("keyup", f), g == null || g.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, a, o]), { selection: n, clearSelection: o };
}
function Ps(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, o = A(t), a = A(n), s = A(r);
  return o.current = t, a.current = n, s.current = r, { setModeKeepingPage: x((i) => {
    i !== o.current && (s.current(), a.current(i));
  }, []) };
}
const pn = 48;
function Jr(e, t = pn) {
  return e.getBoundingClientRect().top + t;
}
function Wr(e, t) {
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
  const o = Nt(n);
  if (!Number.isFinite(o) || o < 1)
    return null;
  const a = n.getBoundingClientRect(), s = a.height > 0 ? a.height : 1, c = Math.min(1, Math.max(0, (t - a.top) / s));
  return { el: n, page: o, fraction: c };
}
function Ft(e, t, n = pn) {
  if (!e)
    return null;
  const r = st(void 0, t), o = Array.from(e.querySelectorAll(r));
  if (!o.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Jr(e, n), c = Wr(o, s);
  return c ? { page: c.page, fraction: c.fraction } : null;
}
function hn(e, t, n = "auto", r, o = pn) {
  if (!e || !t)
    return !1;
  const a = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let c = null;
  if (r && (c = e.querySelector(st(a, r))), c || (c = e.querySelector(st(a))), !c)
    return !1;
  const i = e.getBoundingClientRect(), l = c.getBoundingClientRect();
  if (i.height <= 0 || l.height < 8 && c.offsetHeight < 8)
    return !1;
  const d = l.height > 0 ? l.height : c.offsetHeight, u = e.scrollTop + (l.top - i.top), f = Math.max(0, u + s * d - o);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function Is(e, t, n = "smooth", r) {
  return hn(
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
    hn(
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
function Rs(e, t, n) {
  return Gt(
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
function Ts(e, t, n = !0, r = "", o) {
  const [a, s] = M(1);
  return $(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const c = e.current;
    if (!c)
      return;
    let i = !1, l = null, d = 0;
    const u = st(void 0, o), f = () => {
      if (i) return;
      const p = Array.from(c.querySelectorAll(u));
      if (!p.length)
        return;
      const v = Jr(c), y = Wr(p, v);
      y && s(y.page);
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
const Es = `canvas, .react-pdf__Page, .${Dr}, .${At}`, Un = /* @__PURE__ */ new WeakMap();
function As(e) {
  const t = Number(e.getAttribute(fn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Un.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(Es), Un.set(e, n)), n) {
    const o = n.getBoundingClientRect().height;
    if (Number.isFinite(o) && o > 0)
      return o;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function ks(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function Ms(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(os()).forEach((r) => {
    const o = Nt(r);
    if (!Number.isFinite(o) || o < 1) return;
    const a = As(r);
    if (a <= 0) return;
    const s = t.get(o) || { height: 0, count: 0 };
    s.height = Math.max(s.height, a), s.count += 1, t.set(o, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, o) => {
    r.count >= 2 && r.height > 0 && n.set(o, Math.ceil(r.height));
  }), n;
}
function Ns(e, t, n = "", r) {
  const [o, a] = M(() => /* @__PURE__ */ new Map()), s = A(o), c = A(r);
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
      const b = Ms(w);
      ks(s.current, b) || (s.current = b, a(b)), d && !u && (u = !0, (S = c.current) == null || S.call(c));
    }, m = () => {
      cancelAnimationFrame(l), l = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const g = window.setTimeout(m, 100), p = window.setTimeout(() => {
      d = !0, m();
    }, 300), v = window.setTimeout(m, 700), y = e.current;
    let P = null;
    return y && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => m()), P.observe(y)), () => {
      i = !0, cancelAnimationFrame(l), window.clearTimeout(g), window.clearTimeout(p), window.clearTimeout(v), P == null || P.disconnect();
    };
  }, [e, t, n]), o;
}
const Cs = [0, 48, 140, 320, 560], Ls = 700, xs = [80, 200, 400], _s = 500, Ds = 50, zs = 180, Bn = [0, 48, 140, 320, 700, 1200];
function Fs(e, t) {
  var R;
  const {
    primaryPane: n,
    mode: r,
    enabled: o = !0,
    persistenceKey: a = "",
    restoreReady: s = !0
  } = t, c = A(
    ((R = Re(a)) == null ? void 0 : R.anchor) || { page: 1, fraction: 0 }
  ), i = A(null), l = A(!1), d = A(r), u = A(null), f = A(null), m = A(null), g = A(null), p = A(a), v = A(""), y = A(n);
  y.current = n;
  const P = x(() => {
    var I;
    (I = u.current) == null || I.call(u), u.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), w = x((I = !1) => {
    g.current != null && (clearTimeout(g.current), g.current = null);
    const T = () => {
      g.current = null, Lt(p.current, {
        anchor: ge(c.current)
      });
    };
    I ? T() : g.current = setTimeout(T, zs);
  }, []), b = x((I) => {
    c.current = ge(I), i.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, l.current = !1;
    }, Ds);
  }, []);
  $(() => {
    if (!o)
      return;
    let I = !1, T = null, C = null, O = null;
    const j = () => {
      if (I) return;
      const Y = e.current;
      if (!Y) {
        O = setTimeout(j, 50);
        return;
      }
      T = Y, C = () => {
        if (l.current)
          return;
        const U = Ft(T, y.current);
        U && (c.current = U, w());
      }, T.addEventListener("scroll", C, { passive: !0 }), l.current || C();
    };
    return j(), () => {
      I = !0, O != null && clearTimeout(O), T && C && T.removeEventListener("scroll", C);
    };
  }, [o, r, n, e, w]), De(() => {
    var T;
    if (p.current === a) return;
    w(!0), P(), m.current != null && (clearTimeout(m.current), m.current = null), p.current = a, v.current = "";
    const I = (T = Re(a)) == null ? void 0 : T.anchor;
    c.current = I ? ge(I) : { page: 1, fraction: 0 }, i.current = null, l.current = !!a, d.current = r;
  }, [a, r, w, P]), $(() => {
    var T;
    if (!o || !s || !a || v.current === a) return;
    v.current = a;
    const I = ge(
      ((T = Re(a)) == null ? void 0 : T.anchor) || { page: 1, fraction: 0 }
    );
    return c.current = I, i.current = I, l.current = !0, P(), u.current = Gt(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: y.current,
        delaysMs: Bn,
        onDone: () => b(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(I);
    }, Math.max(...Bn) + 160), () => P();
  }, [o, s, a, e, b, P]), $(() => {
    if (d.current === r)
      return;
    if (d.current = r, !o) {
      l.current = !1, i.current = null, P();
      return;
    }
    const I = i.current ? ge(i.current) : ge(c.current);
    return l.current = !0, i.current = I, c.current = I, P(), u.current = Gt(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: Cs,
        onDone: () => b(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(I);
    }, Ls), () => {
      P();
    };
  }, [r, o, n, e, b, P]), $(() => () => {
    P(), m.current != null && (clearTimeout(m.current), m.current = null), w(!0);
  }, [P, w]);
  const S = x(() => {
    const I = Ft(
      e.current,
      y.current
    );
    return ge(I || c.current);
  }, [e]), E = x(() => {
    l.current = !0;
    const I = Ft(
      e.current,
      y.current
    ), T = ge(I ?? c.current);
    return c.current = T, i.current = T, w(), T;
  }, [e, w]), k = x((I, T, C) => {
    const O = C || y.current, j = kt(I, T || 1), Y = { page: j, fraction: 0 };
    c.current = Y, l.current = !0, i.current = Y, w(), P(), Is(e.current, j, "smooth", O), u.current = Rs(
      () => e.current,
      j,
      {
        behavior: "auto",
        pane: O,
        delaysMs: xs,
        onDone: () => b(Y)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(Y);
    }, _s);
  }, [e, b, P, w]), z = x(() => ge(c.current), []), _ = x(() => l.current, []), F = x(() => {
    if (!l.current || !i.current)
      return;
    const I = ge(i.current);
    hn(
      e.current,
      I,
      "auto",
      y.current
    );
  }, [e]);
  return {
    lockFromShell: S,
    beginModeSwitch: E,
    goToPage: k,
    getAnchor: z,
    isRestoring: _,
    repinIfRestoring: F
  };
}
function Os(e, t) {
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
function qr(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), o = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), a = `j:${r}:d:${o}`;
  return t == null ? `${a}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${a}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const $s = [0, 80, 200, 400, 800], js = 120, Us = 400;
function Bs(e, t, n) {
  const { enabled: r, numPages: o, goToPage: a, resolveBlockPage: s, onAnchorApplied: c, jobId: i, documentId: l } = e, d = A(a);
  d.current = a;
  const u = A(s);
  u.current = s;
  const f = A(c);
  f.current = c;
  const m = A(n);
  m.current = n, $(() => {
    var w, b;
    if (!r || !Number.isFinite(o) || o < 1)
      return;
    const g = Sa(), p = Os(g, u.current), v = qr(g, p, { jobId: i, documentId: l });
    if (t.current === v)
      return;
    if (p == null) {
      t.current = v, (w = m.current) == null || w.call(m);
      return;
    }
    t.current = v, g && ((b = f.current) == null || b.call(f, g, p));
    const y = [];
    let P = 0;
    for (const S of $s)
      P = Math.max(P, S), y.push(
        setTimeout(() => {
          d.current(p);
        }, S)
      );
    return y.push(
      setTimeout(() => {
        var S;
        (S = m.current) == null || S.call(m);
      }, P + js)
    ), () => {
      for (const S of y) clearTimeout(S);
    };
  }, [r, o, i, l, t]);
}
function Hs(e) {
  var a;
  const t = globalThis.window;
  if (!t || typeof ((a = t.history) == null ? void 0 : a.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, o = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", o);
}
function Js(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: o,
    resolveBlockPage: a,
    syncDebounceMs: s = Us,
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
      var y;
      const g = ((y = globalThis.location) == null ? void 0 : y.search) || "", p = zo(g, o, d.current);
      if (f.current = o, p === null) return;
      const v = `${new URLSearchParams(p).get("block_id") || ""}`.trim();
      t.current = qr(
        { blockId: v },
        o,
        { jobId: c, documentId: i }
      ), (u.current || Hs)(p);
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
function Ws(e) {
  const t = A(""), [n, r] = M(!1), o = x(() => r(!0), []), a = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  Bs(a, t, o), Js(e, t, n);
}
const Ye = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function qs(e) {
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
function Ks(e, t, n) {
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
const Jn = [250, 500, 1e3, 2e3, 4e3], Ot = [80, 160, 320, 640, 1e3, 1500], Wn = [250, 500, 1e3, 2e3, 4e3, 5e3], Vs = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
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
  return Bo(e) ? `${e.code || ""}`.trim() : "";
}
function vt(e, t) {
  const n = gn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? "尚未收到可显示的页面译文" : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? "正在等待 OCR 版面数据" : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Gs(e, t, n, r, o) {
  let a = null;
  for (let s = 0; ; s += 1) {
    try {
      const i = await o.fetchPage(e, t.page_idx, { signal: r });
      if (Kr(n.pagesByPage.get(t.page_idx), t, i) !== "retry")
        return i;
      a = Ho(
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
function Zs({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [o, a] = M(Ye), s = A(o), c = A("");
  s.current = o;
  const i = `${e || ""}`.trim(), l = `${t || ""}`.trim().toLowerCase(), d = Vs.has(l) ? l : "";
  return $(() => {
    if (!n || !i) {
      c.current = "", s.current = Ye, a(Ye);
      return;
    }
    const u = r === void 0 ? va() : r, f = c.current === i;
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
    const m = new AbortController();
    let g = !1;
    const p = {
      ...f ? s.current : Ye,
      connection: d ? "terminal" : "connecting",
      jobStatus: l,
      error: ""
    };
    s.current = p, a(p);
    const v = (w) => {
      m.signal.aborted || a((b) => {
        const S = w(b);
        return s.current = S, S;
      });
    }, y = async () => {
      let w = 0;
      for (; !m.signal.aborted; )
        try {
          const b = await u.fetchLayout(i, { signal: m.signal });
          g = !0, v((S) => ({
            ...S,
            layoutByPage: qs(b),
            jobStatus: l,
            error: ""
          }));
          return;
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError") return;
          const S = gn(b);
          if (!(S === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !S)) {
            v((k) => ({
              ...k,
              connection: d ? "terminal" : "unavailable",
              jobStatus: l,
              error: vt(b, "实时译文暂不可用")
            }));
            return;
          }
          if (d) {
            v((k) => ({
              ...k,
              connection: "terminal",
              jobStatus: l,
              error: ""
            }));
            return;
          }
          v((k) => ({
            ...k,
            connection: "connecting",
            jobStatus: l,
            error: vt(b, "正在等待 OCR 版面数据")
          })), await Zt(Jn[Math.min(w, Jn.length - 1)], m.signal).catch(() => {
          }), w += 1;
        }
    };
    return (async () => {
      if (await y(), !g || m.signal.aborted) return;
      let w = 0;
      for (; !m.signal.aborted; ) {
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
            signal: m.signal,
            onEvent: async (b) => {
              if (b.seq <= s.current.lastSeq) return;
              let S;
              try {
                S = await Gs(
                  i,
                  b,
                  s.current,
                  m.signal,
                  u
                );
              } catch (E) {
                if ((E == null ? void 0 : E.name) === "AbortError" || m.signal.aborted) throw E;
                v((k) => ({
                  ...k,
                  lastSeq: Math.max(k.lastSeq, b.seq),
                  error: vt(E, "部分页面的实时译文暂时取不到")
                }));
                return;
              }
              v((E) => {
                const k = Ks(E, b, S);
                return d ? {
                  ...k,
                  connection: "terminal",
                  jobStatus: l
                } : {
                  ...k,
                  jobStatus: l
                };
              }), w = 0;
            }
          });
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError" || m.signal.aborted) return;
          v((S) => ({
            ...S,
            connection: d ? "terminal" : "reconnecting",
            jobStatus: l,
            error: vt(b, "实时译文连接已中断，正在重连")
          }));
        }
        if (m.signal.aborted) return;
        if (d) {
          v((b) => ({
            ...b,
            connection: "terminal",
            jobStatus: l
          }));
          return;
        }
        await Zt(Wn[Math.min(w, Wn.length - 1)], m.signal).catch(() => {
        }), w += 1;
      }
    })(), () => m.abort();
  }, [n, r, i, d]), o;
}
const Ys = 2e3;
function Xs(e) {
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
const Qs = /* @__PURE__ */ new Set(["book", "translate"]);
function Vr(e) {
  return !!(e.jobId && e.sourceUrl && Qs.has(e.workflow));
}
function ei(e) {
  return !!(Vr(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function ti() {
  const e = Va(), t = Vr({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = ei({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = Zs({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), { shellRef: o, shellEl: a, shellWidth: s, bindShell: c } = Xa(), i = hs({
    documentId: e.documentId,
    jobId: e.jobId
  }), l = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: d, onZoomChange: u } = Ss(e.mode, o, i), f = es(
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
    repinIfRestoring: p
  } = Fs(o, {
    primaryPane: f.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: f.primaryNumPages > 0
  });
  $(() => {
    p();
  }, [s, p]);
  const v = Ns(
    o,
    f.compareMode,
    f.rowSyncRevision,
    p
  ), y = Ts(
    o,
    f.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${d}-${f.metricsTick}`,
    f.primaryPane
  ), P = x((L, W) => {
    var Q, te;
    const se = Math.max(
      Number(f.hudNumPages) || 0,
      Number(f.primaryNumPages) || 0,
      Number((Q = f.numPagesByPane) == null ? void 0 : Q.source) || 0,
      Number((te = f.numPagesByPane) == null ? void 0 : te.translated) || 0
    );
    g(L, se, W);
  }, [g, f.hudNumPages, f.primaryNumPages, f.numPagesByPane]), [w, b] = M(null), S = A(null), E = x((L) => {
    S.current && clearTimeout(S.current), b(L), L && (S.current = setTimeout(() => b(null), Ys));
  }, []);
  $(() => () => {
    S.current && clearTimeout(S.current);
  }, []);
  const k = x((L) => {
    const W = Pt(e.regions, L);
    return W ? Dn(W, f.primaryPane).page : null;
  }, [e.regions, f.primaryPane]), z = x((L, W) => {
    const se = W || f.primaryPane, Q = typeof L == "object" && L ? `${L.block_id || ""}`.trim() : "", te = typeof L == "object" && L ? `${L.image_url || ""}`.trim() : "", oe = typeof L == "object" && L ? L.page_idx != null ? Number(L.page_idx) + 1 : L.page != null ? Number(L.page) : null : typeof L == "number" ? L + 1 : null, me = $o(e.regions, te, oe) || Pt(e.regions, Q) || (typeof L == "object" ? jo(e.regions, L) : null);
    let le = me ? Dn(me, se).page : null;
    le == null && (le = Xs(L)), !(le == null || le < 1) && (E(me), P(le, se));
  }, [E, P, f.primaryPane, e.regions]);
  Ws({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: f.hudNumPages || 0,
    currentPage: y,
    goToPage: P,
    resolveBlockPage: k,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (L) => {
      E(Pt(e.regions, L.blockId));
    }
  });
  const { setModeKeepingPage: _ } = Ps({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: m
  }), [F, R] = M(null), {
    selection: I,
    clearSelection: T
  } = ws(o, !e.boot.loading && !e.boot.failed), C = x(() => {
    R(null), T();
  }, [T]), O = x((L) => {
    T(), R(L);
  }, [T]);
  $(() => {
    I && R(null);
  }, [I]), $(() => {
    const L = o.current;
    if (!L) return;
    const W = () => R(null);
    return L.addEventListener("scroll", W, { passive: !0 }), () => L.removeEventListener("scroll", W);
  }, [a, o]);
  const j = I || F;
  $(() => {
    E(null), C();
  }, [l, E, C]);
  const Y = !e.boot.loading && !e.boot.failed, U = Z(() => ({ bindShell: c, shellEl: a, shellWidth: s, shellRef: o }), [c, a, s, o]), K = Z(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), V = Z(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: d,
    onZoomChange: u,
    shell: U,
    panes: f,
    sessionFiles: K,
    rowHeights: v,
    goToPage: P,
    activeRegion: w,
    jumpToAnchor: z,
    setModeKeepingPage: _,
    download: e.download,
    showHud: Y,
    selection: j,
    clearSelection: C,
    selectRegion: O,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, U, f, K, v, P, w, z, _, Y, j, C, O, d, u, i, r, n]);
  return Z(() => ({
    ...V,
    currentPage: y
  }), [V, y]);
}
const ni = [
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
], ri = [
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
function oi(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of ni)
    if (n.keys.some(
      (o) => o.length === 1 ? o === t : o === e
    )) return n;
  return null;
}
function ai(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function si(e) {
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
      if (u.defaultPrevented || u.metaKey || u.ctrlKey || u.altKey || ai(u.target))
        return;
      const f = u.key, m = oi(f);
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
              a(it(o, 1));
              return;
            case "zoom-out":
              a(it(o, -1));
              return;
            case "zoom-reset":
              a(rt());
              return;
            case "next-page":
              i(kt(s + 1, c));
              return;
            case "prev-page":
              i(kt(s - 1, c));
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
const ii = "retainpdf:soft-reader-close";
function ci() {
  return new URL("./index.html", window.location.href).href;
}
function li() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: ii },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function di(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), o = new URL(e, r);
    return o.origin === r.origin && !/reader\.html$/i.test(o.pathname) && !/detail\.html$/i.test(o.pathname);
  } catch {
    return !1;
  }
}
function ui() {
  if (!(typeof window > "u") && !li()) {
    if (di(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(ci());
  }
}
function fi({ onBeforeClose: e } = {}) {
  return /* @__PURE__ */ N(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": "返回主页",
      title: "返回主页",
      onClick: () => {
        e == null || e(), ui();
      },
      children: [
        /* @__PURE__ */ h(ln, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ h("span", { className: "reader-close-home-label", children: "关闭" })
      ]
    }
  );
}
let qn = !1;
function mi() {
  if (qn)
    return;
  const e = at().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (la.GlobalWorkerOptions.workerSrc = e, qn = !0);
}
const pi = {
  formula: "公式",
  table: "表格",
  figure: "图片",
  text: "文字",
  region: "区域"
};
function hi({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: o
}) {
  const a = r.flatMap((s) => {
    if (!Rr(s.region)) return [];
    const c = ft(s, t, n);
    return c ? [{ highlight: s, rect: c }] : [];
  });
  return a.length ? /* @__PURE__ */ h("div", { className: "reader-structure-selection-layer", "aria-label": "PDF 结构选择层", children: a.map(({ highlight: s, rect: c }) => {
    const i = s.region, l = Tr(i), d = pi[l];
    return /* @__PURE__ */ N(
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
          /* @__PURE__ */ h("span", { className: "reader-structure-selection-label", "aria-hidden": "true", children: d }),
          /* @__PURE__ */ h("span", { className: "sr-only", children: Er(i, e) })
        ]
      },
      i.itemId
    );
  }) }) : null;
}
function gi(e, t, n) {
  return e.flatMap((r) => {
    if (Tr(r.region) !== "text") return [];
    const o = ft(r, t, n);
    return o ? [{ itemId: r.itemId, highlight: r, rect: o }] : [];
  });
}
function Kn(e, t, n) {
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
function bi({ target: e }) {
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
function yi(e, t) {
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
function vi(e, t, n, r) {
  if (!e || !t) return [];
  const o = [];
  for (const a of e.blocks) {
    const s = t.itemsById.get(a.item_id);
    if (!(s != null && s.translated_text)) continue;
    const c = ft(
      yi(e, a),
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
const Si = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', wi = 256, Xe = /* @__PURE__ */ new Map();
function Pi(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function Ii(e) {
  const t = `${e || ""}`, { text: n, slots: r } = fa(t, { bareLatex: !0 }), o = Pi(n), a = ma(o, r);
  if (!r.length)
    return { fallbackHtml: a, richHtml: Promise.resolve(a), hasMath: !1 };
  let s = Xe.get(t);
  if (!s && (s = pa(o, r), Xe.set(t, s), Xe.size > wi)) {
    const c = Xe.keys().next().value;
    c !== void 0 && Xe.delete(c);
  }
  return { fallbackHtml: a, richHtml: s, hasMath: !0 };
}
function $t(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function Ie(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function Ri(e, t) {
  const n = e.typography, r = Ie(t) || 1, o = Ie(n == null ? void 0 : n.font_size_pt), a = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, a * 1.18), c = $t(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, i = Math.max(5.5 * r, Math.min(s, c * r)), l = Ie(n == null ? void 0 : n.fit_min_font_size_pt), d = Ie(n == null ? void 0 : n.fit_max_font_size_pt), u = Math.max(3.5, (l || 5.5) * r), f = Math.max(
    u,
    d ? d * r : o ? o * r : i
  ), m = o ? o * r : i, g = Ie(n == null ? void 0 : n.leading_em), p = [
    Ie(n == null ? void 0 : n.padding_top_pt) || 0,
    Ie(n == null ? void 0 : n.padding_right_pt) || 0,
    Ie(n == null ? void 0 : n.padding_bottom_pt) || 0,
    Ie(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((v) => v * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || Si,
    fontSizePx: Math.max(u, Math.min(f, m)),
    minFontSizePx: u,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: g ? 1 + g : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || ($t(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : $t(e.kind) ? "center" : "justify",
    padding: p,
    exact: !!o
  };
}
function Ti(e, t, n, r) {
  const { minFontSizePx: o, maxFontSizePx: a } = r, s = /* @__PURE__ */ new Map(), c = (u) => {
    const f = s.get(u);
    if (f !== void 0) return f;
    const { width: m, height: g } = e(u), p = m <= t + 0.5 && g <= n + 0.5;
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
const Ei = 512, Qe = /* @__PURE__ */ new Map();
let Yt = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  Yt += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  Yt += 1;
}));
function Ai(e, t, n, r) {
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
function ki({ item: e, pageScale: t }) {
  const n = A(null), r = Z(
    () => Ii(e.translatedText),
    [e.translatedText]
  ), [o, a] = M(r.fallbackHtml), s = Z(
    () => Ri(e, t),
    [e, t]
  );
  $(() => {
    let u = !0;
    return a(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      u && a(f);
    }), () => {
      u = !1;
    };
  }, [r]), De(() => {
    const u = n.current;
    if (!u) return;
    const [f, m, g, p] = s.padding, v = Math.max(1, e.rect.width - p - m), y = Math.max(1, e.rect.height - f - g), P = Ai(o, v, y, s);
    let w = Qe.get(P);
    if (w === void 0 && (w = Ti(
      (b) => (u.style.fontSize = `${b}px`, { width: u.scrollWidth, height: u.scrollHeight }),
      v,
      y,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), Qe.set(P, w), Qe.size > Ei)) {
      const b = Qe.keys().next().value;
      b !== void 0 && Qe.delete(b);
    }
    u.style.fontSize = `${w.toFixed(2)}px`;
  }, [o, e.rect.height, e.rect.width, s]);
  const [c, i, l, d] = s.padding;
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
        padding: `${c}px ${i}px ${l}px ${d}px`
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
          dangerouslySetInnerHTML: { __html: o }
        }
      )
    }
  );
}
function Mi({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const o = Z(
    () => vi(e, t, n, r),
    [r, e, t, n]
  );
  return o.length ? /* @__PURE__ */ h(
    "div",
    {
      className: "reader-live-translation-overlay",
      "data-live-translation-page": e == null ? void 0 : e.page_idx,
      "data-live-translation-generation": t == null ? void 0 : t.generation,
      "aria-hidden": "true",
      children: o.map((a) => /* @__PURE__ */ h(
        ki,
        {
          item: a,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${a.itemId}:${a.changedAtSeq}`
      ))
    }
  ) : null;
}
const Ni = rn(Mi), Ci = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注"
}, Vn = 10;
function Li({
  width: e,
  height: t,
  targets: n,
  activeNoteId: r,
  onSelect: o
}) {
  const a = n.flatMap(({ note: s, highlight: c }) => {
    const i = ft(c, e, t);
    return i ? [{ note: s, rect: i }] : [];
  });
  return a.length ? /* @__PURE__ */ h("div", { className: "reader-ai-note-layer", "aria-label": "AI 批注", children: a.map(({ note: s, rect: c }) => /* @__PURE__ */ h(
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
      "aria-label": `${Ci[s.kind]}：${s.text}`,
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
      children: /* @__PURE__ */ h("span", { className: "sr-only", children: s.text })
    },
    s.id
  )) }) : null;
}
const Gr = 1.414;
function xi({
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
  activeAiNoteId: m = null,
  onSelectAiNote: g,
  onSelectRegion: p,
  liveTranslationLayout: v,
  liveTranslationPage: y,
  showLiveTranslation: P = r === "source"
}) {
  const w = A(c ?? Gr), [b, S] = M(w.current);
  $(() => {
    c != null && Math.abs(c - w.current) >= 1e-3 && (w.current = c, S(c));
  }, [c]);
  const E = A(l);
  E.current = l;
  const k = A((U) => {
    var K;
    (K = E.current) == null || K.call(E, U);
  }).current, z = Math.max(120, Math.floor(t * b)), _ = Math.max(z, Math.ceil(a || 0)), F = ft(d, t, z), R = Z(
    () => gi(u, t, z),
    [z, u, t]
  ), [I, T] = M(null), C = Z(
    () => R.find((U) => U.itemId === I) || null,
    [I, R]
  ), O = (U) => {
    if (U.buttons !== 0) {
      T(null);
      return;
    }
    const K = U.currentTarget.getBoundingClientRect(), V = Kn(
      R,
      U.clientX - K.left,
      U.clientY - K.top
    ), L = (V == null ? void 0 : V.itemId) || null;
    T((W) => W === L ? W : L);
  }, j = (U) => {
    var L, W, se;
    if (!p || (W = (L = U.target) == null ? void 0 : L.closest) != null && W.call(L, ".reader-structure-selection-target") || `${((se = window.getSelection()) == null ? void 0 : se.toString()) || ""}`.trim()) return;
    const K = U.currentTarget.getBoundingClientRect(), V = Kn(
      R,
      U.clientX - K.left,
      U.clientY - K.top
    );
    V && p({
      selectionType: "region",
      region: V.highlight.region,
      kind: "text",
      page: V.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: K.left + V.rect.left,
        top: K.top + V.rect.top,
        width: V.rect.width,
        height: V.rect.height
      }
    });
  }, Y = (U) => {
    !Number.isFinite(U) || U <= 0 || Math.abs(w.current - U) < 1e-3 || (w.current = U, S(U), i == null || i(e, U));
  };
  return /* @__PURE__ */ N(
    "div",
    {
      ref: k,
      [qe]: e,
      [Ke]: r,
      [fn]: z,
      className: mn,
      onPointerMoveCapture: O,
      onClick: j,
      onPointerLeave: () => T(null),
      style: {
        width: t,
        height: _,
        minHeight: _
      },
      children: [
        o ? /* @__PURE__ */ h(
          da,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: Dr,
            loading: /* @__PURE__ */ h(
              "div",
              {
                className: At,
                style: { width: t, height: z }
              }
            ),
            onLoadSuccess: (U) => {
              try {
                const K = U.getViewport({ scale: 1 });
                if (K.width > 0) {
                  const V = K.height / K.width;
                  Y(V);
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
            className: At,
            style: { width: t, height: z },
            "aria-hidden": !0
          }
        ),
        F ? /* @__PURE__ */ h(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": d == null ? void 0 : d.itemId,
            style: F,
            "aria-hidden": "true"
          }
        ) : null,
        o && P ? /* @__PURE__ */ h(
          Ni,
          {
            layoutPage: v,
            pageState: y,
            width: t,
            height: z
          }
        ) : null,
        g ? /* @__PURE__ */ h(
          Li,
          {
            width: t,
            height: z,
            targets: f,
            activeNoteId: m,
            onSelect: (U, K) => g(U, K)
          }
        ) : null,
        /* @__PURE__ */ h(bi, { target: o ? C : null }),
        /* @__PURE__ */ h(
          hi,
          {
            pane: r === "translated" ? "translated" : "source",
            width: t,
            height: z,
            regions: u,
            onSelect: p
          }
        )
      ]
    }
  );
}
const _i = rn(xi), jt = 5, Di = "120% 0px", zi = 120;
let Gn = 1;
const Zn = /* @__PURE__ */ new WeakMap();
function Fi(e) {
  if (!e) return 0;
  const t = Zn.get(e);
  if (t) return t;
  const n = Gn;
  return Gn += 1, Zn.set(e, n), n;
}
function Oi() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const $i = Eo(
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
    regions: p = [],
    aiNotes: v = [],
    activeAiNoteId: y = null,
    onSelectAiNote: P,
    readerMetadata: w = null,
    onSelectRegion: b,
    liveTranslation: S,
    showLiveTranslation: E = t === "source",
    liveTranslationPendingLabel: k = "",
    paneAction: z
  }, _) {
    mi();
    const { file: F, loading: R, error: I } = Ja(n, r), T = `${n}\0${Fi(F)}`, C = A(T);
    C.current = T;
    const O = Z(
      () => Ua(F),
      [F, n]
    ), [j, Y] = M(0), [U, K] = M(""), [V, L] = M(null), [W, se] = M(480), Q = A(null), te = A(0), oe = Z(() => Oi(), []), me = Z(() => ({
      cMapUrl: at().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: at().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    on(_, () => V, [V]), $(() => {
      const D = (B) => {
        !Number.isFinite(B) || B < 80 || Math.abs(B - te.current) < 8 || (te.current = B, se(B));
      }, G = i && i >= 80 ? i : (c == null ? void 0 : c.clientWidth) || 0;
      if (D(G), !c || typeof ResizeObserver > "u" || i && i >= 80) return;
      const q = new ResizeObserver((B) => {
        var ne, re;
        const ie = ((re = (ne = B[0]) == null ? void 0 : ne.contentRect) == null ? void 0 : re.width) ?? c.clientWidth;
        !Number.isFinite(ie) || ie < 80 || (Q.current && clearTimeout(Q.current), Q.current = setTimeout(() => D(ie), 80));
      });
      return q.observe(c), () => {
        q.disconnect(), Q.current && clearTimeout(Q.current);
      };
    }, [i, c, a]);
    const le = Z(
      () => ds(W, o),
      [W, o]
    ), [Ee, Oe] = M(() => /* @__PURE__ */ new Map()), [H, J] = M(() => /* @__PURE__ */ new Set()), [ee, ae] = M(() => /* @__PURE__ */ new Set()), he = A(/* @__PURE__ */ new Map()), de = A(null), Ae = A(/* @__PURE__ */ new Map()), xt = x((D, G) => {
      Oe((q) => {
        if (q.get(D) === G) return q;
        const B = new Map(q);
        return B.set(D, G), B;
      });
    }, []), ht = x((D, G) => {
      const q = he.current, B = q.get(D);
      if (B && de.current)
        try {
          de.current.unobserve(B);
        } catch {
        }
      if (G) {
        if (q.set(D, G), de.current)
          try {
            de.current.observe(G);
          } catch {
          }
      } else
        q.delete(D);
    }, []), gt = A(/* @__PURE__ */ new Map()), $e = x((D) => {
      const G = gt.current;
      let q = G.get(D);
      return q || (q = (B) => ht(D, B), G.set(D, q)), q;
    }, [ht]);
    $(() => {
      if (typeof IntersectionObserver > "u") return;
      const D = Ae.current, G = new IntersectionObserver(
        (q) => {
          const B = [], ie = [];
          for (const ne of q) {
            const re = ne.target, pe = Nt(re);
            Number.isFinite(pe) && (ne.isIntersecting ? B : ie).push(pe);
          }
          if ((B.length || ie.length) && J((ne) => {
            let re = null;
            for (const pe of B)
              ne.has(pe) || (re = re || new Set(ne), re.add(pe));
            for (const pe of ie)
              ne.has(pe) && (re = re || new Set(ne), re.delete(pe));
            return re || ne;
          }), B.length) {
            for (const ne of B) {
              const re = D.get(ne);
              re && (clearTimeout(re), D.delete(ne));
            }
            ae((ne) => {
              let re = null;
              for (const pe of B)
                ne.has(pe) || (re = re || new Set(ne), re.add(pe));
              return re || ne;
            });
          }
          for (const ne of ie)
            D.has(ne) || D.set(ne, setTimeout(() => {
              D.delete(ne), ae((re) => {
                if (!re.has(ne)) return re;
                const pe = new Set(re);
                return pe.delete(ne), pe;
              });
            }, zi));
        },
        { root: c, rootMargin: Di, threshold: 0 }
      );
      de.current = G;
      for (const q of he.current.values())
        try {
          G.observe(q);
        } catch {
        }
      return () => {
        G.disconnect(), de.current === G && (de.current = null);
        for (const q of D.values()) clearTimeout(q);
        D.clear();
      };
    }, [c]), De(() => {
      Y(0), K(""), J(/* @__PURE__ */ new Set()), ae(/* @__PURE__ */ new Set()), Oe(/* @__PURE__ */ new Map()), he.current.clear();
      const D = Ae.current;
      for (const G of D.values()) clearTimeout(G);
      D.clear(), m == null || m(0, t);
    }, [T, m, t]);
    const Ge = x(
      ({ numPages: D }) => {
        C.current === T && (Y(D), K(""), m == null || m(D, t), u == null || u({ numPages: D, pane: t }));
      },
      [T, u, m, t]
    ), je = x(
      (D) => {
        if (C.current !== T) return;
        const G = (D == null ? void 0 : D.message) || "PDF 解析失败";
        K(G), Y(0), m == null || m(0, t), f == null || f(D, t);
      },
      [T, f, m, t]
    ), ke = Z(
      () => j > 0 ? Array.from({ length: j }, (D, G) => G + 1) : [],
      [j]
    );
    $(() => {
      typeof IntersectionObserver < "u" || ae(new Set(ke));
    }, [ke]);
    const bt = Z(
      () => _t(g, w, t),
      [g, w, t]
    ), wo = Z(() => {
      const D = /* @__PURE__ */ new Map();
      for (const G of p) {
        const q = _t(G, w, t);
        if (!q) continue;
        const B = D.get(q.box.page) || [];
        B.push(q), D.set(q.box.page, B);
      }
      return D;
    }, [t, w, p]), Po = Z(() => {
      const D = /* @__PURE__ */ new Map();
      for (const G of v) {
        const q = Pt(p, G.anchor.blockId);
        if (!q) continue;
        const B = _t(q, w, t);
        if (!B) continue;
        const ie = D.get(B.box.page) || [];
        ie.push({ note: G, highlight: B }), D.set(B.box.page, ie);
      }
      return D;
    }, [v, t, w, p]), Io = Z(() => {
      if (j === 0) return /* @__PURE__ */ new Set();
      if (!(!!c && typeof IntersectionObserver < "u" && a)) return new Set(ke);
      if (H.size === 0) {
        const q = Math.min(j, jt * 2 + 1);
        return new Set(Array.from({ length: q }, (B, ie) => ie + 1));
      }
      const G = /* @__PURE__ */ new Set();
      for (const q of H)
        for (let B = -jt; B <= jt; B++) {
          const ie = q + B;
          ie >= 1 && ie <= j && G.add(ie);
        }
      return G;
    }, [j, ke, c, a, H]), Ro = !n || !!I || !!U, To = n && (I || U) || s;
    return /* @__PURE__ */ N(
      "section",
      {
        ref: L,
        className: `reader-panel ${rs}${a ? "" : " is-hidden"}`,
        [Ke]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": a ? "true" : "false",
        "data-live-translation-status": (S == null ? void 0 : S.jobStatus) || void 0,
        "aria-hidden": a ? void 0 : !0,
        "aria-label": t === "source" ? "原文 PDF" : "译文 PDF",
        children: [
          z ? /* @__PURE__ */ h("div", { className: "reader-react-pdf-pane-action", children: z }) : null,
          k ? /* @__PURE__ */ N("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ h("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ h("span", { children: k })
          ] }) : null,
          Ro && !R ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: To }) : null,
          R ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: "正在加载 PDF…" }) : null,
          O && !I ? /* @__PURE__ */ h("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ h(
            ua,
            {
              file: O,
              loading: null,
              error: null,
              options: me,
              onLoadSuccess: Ge,
              onLoadError: je,
              className: "reader-react-pdf-document",
              children: ke.map((D) => {
                if (Io.has(D))
                  return /* @__PURE__ */ h(
                    _i,
                    {
                      pane: t,
                      pageNumber: D,
                      width: le,
                      devicePixelRatio: oe,
                      active: ee.has(D),
                      syncedMinHeight: (l == null ? void 0 : l.get(D)) || 0,
                      onMetrics: d,
                      cachedAspect: Ee.get(D),
                      onAspectChange: xt,
                      sentinelRef: $e(D),
                      regionHighlight: (bt == null ? void 0 : bt.box.page) === D ? bt : null,
                      regionTargets: wo.get(D),
                      aiNoteTargets: Po.get(D),
                      activeAiNoteId: y,
                      onSelectAiNote: P,
                      onSelectRegion: b,
                      liveTranslationLayout: S == null ? void 0 : S.layoutByPage.get(D - 1),
                      liveTranslationPage: S == null ? void 0 : S.pagesByPage.get(D - 1),
                      showLiveTranslation: E
                    },
                    `${t}-${D}`
                  );
                const q = Ee.get(D) ?? Gr, B = Math.max(120, Math.floor(le * q)), ie = Math.max(B, Math.ceil((l == null ? void 0 : l.get(D)) || 0));
                return /* @__PURE__ */ h(
                  "div",
                  {
                    ref: $e(D),
                    [qe]: D,
                    [Ke]: t,
                    [fn]: B,
                    className: mn,
                    style: {
                      width: le,
                      height: ie,
                      minHeight: ie
                    },
                    children: /* @__PURE__ */ h(
                      "div",
                      {
                        className: At,
                        style: { width: le, height: B },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${D}`
                );
              })
            },
            T
          ) }) : null
        ]
      }
    );
  }
), Yn = rn($i), Zr = an(null), Yr = an(null);
function ji({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ h(Zr.Provider, { value: e, children: /* @__PURE__ */ h(Yr.Provider, { value: t, children: n }) });
}
function pt() {
  return sn(Zr);
}
function Ui() {
  return sn(Yr);
}
function Bi({
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
function Hi(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function Ji(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? `翻译已暂停，已保留 ${e.pagesByPage.size} 页译文` : "翻译已暂停，原始 PDF 仍可阅读" : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? `翻译已取消，已保留 ${e.pagesByPage.size} 页译文` : "翻译已取消，原始 PDF 仍可阅读" : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || "实时译文暂不可用，原始 PDF 仍可阅读" : e.error ? e.error : e.layoutByPage.size === 0 ? "正在完成 OCR，译文将在这里逐页出现" : "版面已就绪，正在等待首个译文页面" : "";
}
function Wi(e) {
  const t = pt(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: o,
    paneComposition: a
  } = e, s = (a == null ? void 0 : a.visibleMode) ?? e.mode ?? "compare", c = (a == null ? void 0 : a.compareMode) ?? e.compareMode ?? s === "compare", i = (a == null ? void 0 : a.showSource) ?? e.showSource ?? !0, l = (a == null ? void 0 : a.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), d = (a == null ? void 0 : a.overlayOnSource) ?? e.overlayOnSource ?? !1, u = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? mt, g = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, p = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), v = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, y = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, P = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, w = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", b = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", S = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, E = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, k = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), z = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), _ = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), F = e.regions ?? (t == null ? void 0 : t.regions) ?? [], R = (t == null ? void 0 : t.aiNotes) ?? [], I = (t == null ? void 0 : t.activeAiNoteId) ?? null, T = t == null ? void 0 : t.onSelectAiNote, C = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), O = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), j = Bi({
    mode: s,
    compareMode: c,
    showSource: i,
    showTranslated: l,
    markdownSplit: n,
    overlayOnSource: d
  }), Y = Hi(
    g,
    n || r,
    typeof document > "u" ? g * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ h(
    "div",
    {
      ref: u,
      className: _r,
      "data-reader-region-count": F.length,
      "data-reader-structured-region-count": F.filter(Rr).length,
      "data-reader-metadata-ready": C ? "true" : "false",
      children: /* @__PURE__ */ N(
        "main",
        {
          className: `${ns} reader-mode-${j.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            v ? /* @__PURE__ */ h(
              Yn,
              {
                pane: "source",
                url: w,
                preloadedFile: S,
                userZoom: m,
                visible: j.showSource,
                scrollRoot: f,
                pageWidthOverride: Y,
                rowHeights: j.compareMode ? p : void 0,
                onMetrics: k,
                emptyLabel: P ? "源文件不可用：该文档没有可读取的源 PDF。" : "暂无原文 PDF",
                onNumPagesChange: z,
                activeRegion: _,
                regions: F,
                aiNotes: R,
                activeAiNoteId: I,
                onSelectAiNote: T,
                readerMetadata: C,
                onSelectRegion: O,
                liveTranslation: d ? o : void 0,
                showLiveTranslation: d,
                liveTranslationPendingLabel: d ? Ji(o) : "",
                paneAction: d ? /* @__PURE__ */ N(ut, { children: [
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
              Yn,
              {
                pane: "translated",
                url: b,
                preloadedFile: E,
                userZoom: m,
                visible: j.showTranslated,
                scrollRoot: f,
                pageWidthOverride: Y,
                rowHeights: j.compareMode ? p : void 0,
                onMetrics: k,
                emptyLabel: "暂无译文 PDF",
                onNumPagesChange: z,
                activeRegion: _,
                regions: F,
                aiNotes: R,
                activeAiNoteId: I,
                onSelectAiNote: T,
                readerMetadata: C,
                onSelectRegion: O,
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
const qi = [
  { id: "source", label: "源文件", Icon: Ar },
  { id: "compare", label: "对照", Icon: kr },
  { id: "translated", label: "翻译文件", Icon: Mr }
];
function Xn(e) {
  return `辅助面板占了右半边，对照只剩${e === "translated" ? "译文" : "原文"} · 点此关闭面板恢复对照`;
}
function Ki(e) {
  return e.connection === "live" ? `实时译文 · ${e.pagesByPage.size} 页` : e.connection === "reconnecting" ? "实时译文 · 重连中" : e.connection === "unavailable" ? "实时译文 · 不可用" : e.connection === "terminal" ? e.jobStatus === "failed" ? "实时译文 · 已暂停" : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? "实时译文 · 已取消" : e.jobStatus === "succeeded" ? "实时译文 · 已完成" : "实时译文 · 已结束" : e.error || "实时译文 · 连接中";
}
function Vi(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function Gi(e) {
  const t = pt(), {
    mode: n,
    documentReady: r,
    onModeChange: o,
    liveTranslation: a = null,
    compareDegraded: s = !1,
    onRestoreCompare: c
  } = e, i = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, l = a ? Ki(a.state) : "";
  return /* @__PURE__ */ N("header", { className: "reader-workspace-bar", children: [
    a ? /* @__PURE__ */ N(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${a.state.connection}${a.visible ? " is-active" : ""}`,
        "aria-pressed": a.visible,
        "aria-label": a.visible ? "隐藏实时译文" : "显示实时译文",
        title: a.state.error || l,
        onClick: a.onToggle,
        children: [
          /* @__PURE__ */ h(Vo, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ h("span", { className: "reader-live-translation-toggle-label", children: l })
        ]
      }
    ) : null,
    /* @__PURE__ */ h("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": "阅读工作区", children: qi.map(({ id: d, label: u, Icon: f }) => {
      const m = n === d, g = Vi({
        id: d,
        documentReady: r,
        sourceViewOnly: i,
        liveTranslationAvailable: !!a
      });
      return /* @__PURE__ */ N(
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
            /* @__PURE__ */ h(f, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { className: "reader-workspace-tab-label", children: u })
          ]
        },
        d
      );
    }) }),
    s ? /* @__PURE__ */ N(
      "button",
      {
        type: "button",
        className: "reader-compare-degraded",
        onClick: c,
        title: Xn(n),
        children: [
          /* @__PURE__ */ h(Go, { size: 13, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ h("span", { className: "reader-compare-degraded-label", children: Xn(n) })
        ]
      }
    ) : null
  ] });
}
const Zi = {
  markdown: { label: "Markdown", short: "MD", Icon: Xo, needsJob: !0 },
  ai: { label: "AI 问答", short: "AI", Icon: Cr, needsJob: !0 },
  notes: { label: "批注", short: "注", Icon: Nr, needsJob: !1 },
  // 手写批注和 agent 标的批注不合并：前者可改可删可导出，后者是 agent 重写整份
  // notes.v1.json 时一起换掉的。合成一个列表会出现「一半条目能编辑一半不能」。
  "ai-notes": { label: "AI 批注", short: "标", Icon: Yo, needsJob: !1 },
  // 摘录走 documentId 也能读，没有 job 一样有内容。
  favorites: { label: "摘录", short: "藏", Icon: Zo, needsJob: !1 }
}, Yi = Or.map(
  (e) => ({ id: e, ...Zi[e] })
), Xi = {
  "reading-path": {
    label: "阅读路径",
    short: "路径",
    Icon: ta,
    adapterKey: "renderReaderReadingPath",
    slot: "document",
    ariaLabel: "阅读路径",
    keepMounted: !1
  },
  "reading-canvas": {
    label: "画布",
    short: "画",
    Icon: ea,
    adapterKey: "renderReaderReadingCanvas",
    slot: "document",
    ariaLabel: "AI 画布",
    keepMounted: !0
  },
  terminal: {
    label: "终端",
    short: "SH",
    Icon: Qo,
    adapterKey: "renderReaderTerminal",
    slot: "terminal",
    ariaLabel: "fx 终端",
    keepMounted: !0
  }
}, Xr = $r.map(
  (e) => ({ id: e, ...Xi[e] })
);
function Qi(e) {
  return [
    ...Yi.map(({ id: t, label: n, short: r, Icon: o, needsJob: a }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: a
    })),
    ...Xr.filter((t) => e(t.adapterKey)).map(({ id: t, label: n, short: r, Icon: o }) => ({
      id: t,
      label: n,
      short: r,
      Icon: o,
      needsJob: !1
    }))
  ];
}
function ec() {
  const e = ce();
  return Qi((t) => typeof (e == null ? void 0 : e[t]) == "function");
}
function tc(e) {
  const t = pt(), { active: n, badges: r } = e, o = e.sourceOnly ?? (t == null ? void 0 : t.sourceOnly) ?? !1, a = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), s = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  }), c = ec();
  return n ? /* @__PURE__ */ N("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ h("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": "阅读辅助面板", children: c.map(({ id: i, label: l, Icon: d, needsJob: u }) => {
      const f = n === i, m = u && o, g = r == null ? void 0 : r[i];
      return /* @__PURE__ */ N(
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
            /* @__PURE__ */ h(d, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { className: "reader-assistant-dock-tab-label", children: l }),
            g ? /* @__PURE__ */ h("span", { className: "reader-assistant-dock-badge", children: g }) : null
          ]
        },
        i
      );
    }) }),
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-assistant-dock-close",
        "aria-label": "关闭阅读辅助面板",
        title: "关闭辅助面板",
        onClick: s,
        children: /* @__PURE__ */ h(ln, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ h("nav", { className: "reader-assistant-rail", "aria-label": "阅读辅助工具", children: c.map(({ id: i, label: l, short: d, Icon: u, needsJob: f }) => {
    const m = f && o, g = r == null ? void 0 : r[i];
    return /* @__PURE__ */ N(
      "button",
      {
        type: "button",
        className: "reader-assistant-rail-button",
        "aria-label": `打开${l}`,
        title: m ? `${l} 需打开任务阅读` : l,
        disabled: m,
        onClick: () => a(i),
        children: [
          /* @__PURE__ */ h(u, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
          /* @__PURE__ */ h("span", { children: d }),
          g ? /* @__PURE__ */ h("span", { className: "reader-assistant-dock-badge", children: g }) : null
        ]
      },
      i
    );
  }) });
}
function nc(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function rc(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function oc(e) {
  return e / 100 * window.innerHeight;
}
function ac(e) {
  return e / 100 * window.innerWidth;
}
function sc(e) {
  switch (typeof e) {
    case "number":
      return [e, "px"];
    case "string": {
      const t = parseFloat(e);
      return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
    }
  }
}
function tt({
  groupSize: e,
  panelElement: t,
  styleProp: n
}) {
  let r;
  const [o, a] = sc(n);
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
      r = rc(t, o);
      break;
    }
    case "em": {
      r = nc(t, o);
      break;
    }
    case "vh": {
      r = oc(o);
      break;
    }
    case "vw": {
      r = ac(o);
      break;
    }
  }
  return r;
}
function fe(e) {
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
      const d = tt({
        groupSize: n,
        panelElement: o,
        styleProp: a.collapsedSize
      });
      s = fe(d / n * 100);
    }
    let c;
    if (a.defaultSize !== void 0) {
      const d = tt({
        groupSize: n,
        panelElement: o,
        styleProp: a.defaultSize
      });
      c = fe(d / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const d = tt({
        groupSize: n,
        panelElement: o,
        styleProp: a.minSize
      });
      i = fe(d / n * 100);
    }
    let l = 100;
    if (a.maxSize !== void 0) {
      const d = tt({
        groupSize: n,
        panelElement: o,
        styleProp: a.maxSize
      });
      l = fe(d / n * 100);
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
function Qt(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? ic : cc
  );
}
function ic(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function cc(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function Qr(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function eo(e, t) {
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
function lc({
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
    const { x: c, y: i } = eo(r, s), l = e === "horizontal" ? c : i;
    l < a && (a = l, o = s);
  }
  return X(o, "No rect found"), o;
}
let St;
function dc() {
  return St === void 0 && (typeof matchMedia == "function" ? St = !!matchMedia("(pointer:coarse)").matches : St = !1), St;
}
function to(e) {
  const { element: t, orientation: n, panels: r, separators: o } = e, a = Qt(
    n,
    Array.from(t.children).filter(Qr).map((g) => ({ element: g }))
  ).map(({ element: g }) => g), s = [];
  let c = !1, i = !1, l = -1, d = -1, u = 0, f, m = [];
  {
    let g = -1;
    for (const p of a)
      p.hasAttribute("data-panel") && (g++, p.hasAttribute("data-disabled") || (u++, l === -1 && (l = g), d = g));
  }
  if (u > 1) {
    let g = -1;
    for (const p of a)
      if (p.hasAttribute("data-panel")) {
        g++;
        const v = r.find(
          (y) => y.element === p
        );
        if (v) {
          if (f) {
            const y = f.element.getBoundingClientRect(), P = p.getBoundingClientRect();
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
              ), S = n === "horizontal" ? new DOMRect(P.left, P.top, 0, P.height) : new DOMRect(P.left, P.top, P.width, 0);
              switch (m.length) {
                case 0: {
                  w = [
                    b,
                    S
                  ];
                  break;
                }
                case 1: {
                  const E = m[0], k = lc({
                    orientation: n,
                    rects: [y, P],
                    targetRect: E.element.getBoundingClientRect()
                  });
                  w = [
                    E,
                    k === y ? S : b
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
                  P.top,
                  P.left - y.right,
                  P.height
                ) : new DOMRect(
                  P.left,
                  y.bottom,
                  P.width,
                  P.top - y.bottom
                )
              ];
            for (const b of w) {
              let S = "width" in b ? b : b.element.getBoundingClientRect();
              const E = dc() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
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
              const k = g <= l || g > d;
              !c && !k && s.push({
                group: e,
                groupSize: Ve({ group: e }),
                panels: [f, v],
                separator: "width" in b ? void 0 : b,
                rect: S
              }), c = !1;
            }
          }
          i = !1, f = v, m = [];
        }
      } else if (p.hasAttribute("data-separator")) {
        p.ariaDisabled !== null && (c = !0);
        const v = o.find(
          (y) => y.element === p
        );
        v ? m.push(v) : (f = void 0, m = []);
      } else
        i = !0;
  }
  return s;
}
var Me;
class no {
  constructor() {
    xn(this, Me, {});
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
    _n(this, Me, {});
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
let Je = {
  cursorFlags: 0,
  state: "inactive"
};
const bn = new no();
function Le() {
  return Je;
}
function uc(e) {
  return bn.addListener("change", e);
}
function fc(e) {
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
const mc = (e) => e, Ut = () => {
}, ro = 1, oo = 2, ao = 4, so = 8, Qn = 3, er = 12;
let wt;
function tr() {
  return wt === void 0 && (wt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (wt = !0)), wt;
}
function pc({
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
        if (e && tr()) {
          const a = (e & ro) !== 0, s = (e & oo) !== 0, c = (e & ao) !== 0, i = (e & so) !== 0;
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
    return tr() ? r > 0 && o > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && o > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const nr = /* @__PURE__ */ new WeakMap();
function yn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = nr.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = Le();
  switch (r.state) {
    case "active":
    case "hover": {
      const o = pc({
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
  nr.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let Se = /* @__PURE__ */ new Map();
const io = new no();
function hc(e) {
  Se = new Map(Se), Se.delete(e);
}
function rr(e, t) {
  for (const [n] of Se)
    if (n.id === e)
      return n;
}
function Ne(e, t) {
  for (const [n, r] of Se)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function ze() {
  return Se;
}
function vn(e, t) {
  return io.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Te(e, t, n) {
  const r = Se.get(e);
  Se = new Map(Se), Se.set(e, t), io.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function co(e) {
  const t = Le();
  let n = !1;
  switch (t.state) {
    case "active":
      We({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (yn(e), n = !0, t.hitRegions.forEach((r) => {
        const o = Ne(r.group.id, !0);
        Te(r.group, o, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function or(e) {
  e.defaultPrevented || co(e.currentTarget);
}
function gc(e, t, n) {
  let r, o = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const s = eo(n, a.rect);
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
function bc(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function yc(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: ir(e),
    b: ir(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  X(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const o = {
    a: sr(ar(n.a)),
    b: sr(ar(n.b))
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
const vc = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function Sc(e) {
  const t = getComputedStyle(lo(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function wc(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || Sc(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || vc.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function ar(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (X(n, "Missing node"), wc(n)) return n;
  }
  return null;
}
function sr(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function ir(e) {
  const t = [];
  for (; e; )
    t.push(e), e = lo(e);
  return t;
}
function lo(e) {
  const { parentNode: t } = e;
  return bc(t) ? t.host : t;
}
function Pc(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function Ic({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!Qr(n) || n.contains(e) || e.contains(n))
    return !0;
  if (yc(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (Pc(r.getBoundingClientRect(), t))
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
    const a = to(o), s = gc(o.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && Ic({
      groupElement: o.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function Rc(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function ue(e, t, n = 0) {
  return Math.abs(fe(e) - fe(t)) <= n;
}
function ve(e, t) {
  return ue(e, t) ? 0 : e > t ? 1 : -1;
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
  if (ve(r, i) < 0)
    if (a) {
      const l = (o + i) / 2;
      ve(r, l) < 0 ? r = o : r = i;
    } else
      r = i;
  return r = Math.min(c, r), r = fe(r), r;
}
function ct({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: o,
  trigger: a
}) {
  if (ue(e, 0))
    return t;
  const s = a === "imperative-api", c = Object.values(t), i = Object.values(o), l = [...c], [d, u] = r;
  X(d != null, "Invalid first pivot index"), X(u != null, "Invalid second pivot index");
  let f = 0;
  switch (a) {
    case "keyboard": {
      {
        const p = e < 0 ? u : d, v = n[p];
        X(
          v,
          `Panel constraints not found for index ${p}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: P,
          minSize: w = 0
        } = v;
        if (P) {
          const b = c[p];
          if (X(
            b != null,
            `Previous layout not found for panel index ${p}`
          ), ue(b, y)) {
            const S = w - b;
            ve(S, Math.abs(e)) > 0 && (e = e < 0 ? 0 - S : S);
          }
        }
      }
      {
        const p = e < 0 ? d : u, v = n[p];
        X(
          v,
          `No panel constraints found for index ${p}`
        );
        const {
          collapsedSize: y = 0,
          collapsible: P,
          minSize: w = 0
        } = v;
        if (P) {
          const b = c[p];
          if (X(
            b != null,
            `Previous layout not found for panel index ${p}`
          ), ue(b, w)) {
            const S = b - y;
            ve(S, Math.abs(e)) > 0 && (e = e < 0 ? 0 - S : S);
          }
        }
      }
      break;
    }
    default: {
      const p = e < 0 ? u : d, v = n[p];
      X(
        v,
        `Panel constraints not found for index ${p}`
      );
      const y = c[p], { collapsible: P, collapsedSize: w, minSize: b } = v;
      if (P && ve(y, b) < 0)
        if (e > 0) {
          const S = b - w, E = S / 2, k = y + e;
          ve(k, b) < 0 && (e = ve(e, E) <= 0 ? 0 : S);
        } else {
          const S = b - w, E = 100 - S / 2, k = y - e;
          ve(k, b) < 0 && (e = ve(100 + e, E) > 0 ? 0 : -S);
        }
      break;
    }
  }
  {
    const p = e < 0 ? 1 : -1;
    let v = e < 0 ? u : d, y = 0;
    for (; ; ) {
      const w = c[v];
      X(
        w != null,
        `Previous layout not found for panel index ${v}`
      );
      const b = He({
        overrideDisabledPanels: s,
        panelConstraints: n[v],
        prevSize: w,
        size: 100
      }) - w;
      if (y += b, v += p, v < 0 || v >= n.length)
        break;
    }
    const P = Math.min(Math.abs(e), Math.abs(y));
    e = e < 0 ? 0 - P : P;
  }
  {
    let p = e < 0 ? d : u;
    for (; p >= 0 && p < n.length; ) {
      const v = Math.abs(e) - Math.abs(f), y = c[p];
      X(
        y != null,
        `Previous layout not found for panel index ${p}`
      );
      const P = y - v, w = He({
        overrideDisabledPanels: s,
        panelConstraints: n[p],
        prevSize: y,
        size: P
      });
      if (!ue(y, w) && (f += y - w, l[p] = w, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? p-- : p++;
    }
  }
  if (Rc(i, l))
    return o;
  {
    const p = e < 0 ? u : d, v = c[p];
    X(
      v != null,
      `Previous layout not found for panel index ${p}`
    );
    const y = v + f, P = He({
      overrideDisabledPanels: s,
      panelConstraints: n[p],
      prevSize: v,
      size: y
    });
    if (l[p] = P, !ue(P, y)) {
      let w = y - P, b = e < 0 ? u : d;
      for (; b >= 0 && b < n.length; ) {
        const S = l[b];
        X(
          S != null,
          `Previous layout not found for panel index ${b}`
        );
        const E = S + w, k = He({
          overrideDisabledPanels: s,
          panelConstraints: n[b],
          prevSize: S,
          size: E
        });
        if (ue(S, k) || (w -= k - S, l[b] = k), ue(w, 0))
          break;
        e > 0 ? b-- : b++;
      }
    }
  }
  const m = Object.values(l).reduce(
    (p, v) => v + p,
    0
  );
  if (!ue(m, 100, 0.1))
    return o;
  const g = Object.keys(o);
  return l.reduce((p, v, y) => (p[g[y]] = v, p), {});
}
function xe(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || ve(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function _e({
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
  if (!ue(o, 100) && r.length > 0)
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
    const d = He({
      overrideDisabledPanels: !0,
      panelConstraints: t[c],
      prevSize: i,
      size: l
    });
    l != d && (a += l - d, r[c] = d);
  }
  if (!ue(a, 0))
    for (let c = 0; c < t.length; c++) {
      const i = r[c];
      X(i != null, `No layout data found for index ${c}`);
      const l = i + a, d = He({
        overrideDisabledPanels: !0,
        panelConstraints: t[c],
        prevSize: i,
        size: l
      });
      if (i !== d && (a -= d - i, r[c] = d, ue(a, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((c, i, l) => (c[s[l]] = i, c), {});
}
function uo({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const i = ze();
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
    const f = a(), m = l.findIndex((v) => v.id === t), g = m === 0, p = m === l.length - 1;
    if (p && i < f && (g || l.slice(0, m).every((v, y) => {
      const P = u[y];
      return (P == null ? void 0 : P.collapsible) && ue(P.collapsedSize, d[P.panelId]);
    }))) {
      const v = l.slice(0, m).reduce((y, P) => y + d[P.id], 0);
      return {
        ...d,
        [t]: fe(100 - v)
      };
    }
    return ct({
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
      layout: g,
      separatorToPanels: p
    } = n(), v = s({
      nextSize: i,
      panels: f.panels,
      prevLayout: g,
      derivedPanelConstraints: u
    }), y = _e({
      layout: v,
      panelConstraints: u
    });
    xe(g, y) || Te(f, {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      groupSize: m,
      layout: y,
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
      return i && ue(l, d);
    },
    resize: (i) => {
      const { group: l } = n(), { element: d } = o(), u = Ve({ group: l }), f = tt({
        groupSize: u,
        panelElement: d,
        styleProp: i
      }), m = fe(f / u * 100);
      c(m);
    }
  };
}
function cr(e) {
  if (e.defaultPrevented)
    return;
  const t = ze();
  Sn(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (o) => o.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const o = r.panelConstraints.defaultSize, a = uo({
          groupId: n.group.id,
          panelId: r.id
        });
        a && o !== void 0 && (a.resize(o), e.preventDefault());
      }
    }
  });
}
function It(e) {
  const t = ze();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function fo({
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
      } = t(), l = _e({
        layout: n,
        panelConstraints: o
      });
      return r ? c : (xe(c, l) || Te(a, {
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
  const n = It(e), r = Ne(n.id, !0), o = n.separators.find(
    (d) => d.element === e
  );
  X(o, "Matching separator not found");
  const a = r.separatorToPanels.get(o);
  X(a, "Matching panels not found");
  const s = a.map((d) => n.panels.indexOf(d)), c = fo({ groupId: n.id }).getLayout(), i = ct({
    delta: t,
    initialLayout: c,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: c,
    trigger: "keyboard"
  }), l = _e({
    layout: i,
    panelConstraints: r.derivedPanelConstraints
  });
  xe(c, l) || Te(
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
function lr(e) {
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
        const r = It(t), o = Ne(r.id, !0), { derivedPanelConstraints: a, layout: s, separatorToPanels: c } = o, i = r.separators.find(
          (f) => f.element === t
        );
        X(i, "Matching separator not found");
        const l = c.get(i);
        X(l, "Matching panels not found");
        const d = l[0], u = a.find(
          (f) => f.panelId === d.id
        );
        if (X(u, "Panel metadata not found"), u.collapsible) {
          const f = s[d.id], m = u.collapsedSize === f ? r.mutableState.expandedPanelSizes[d.id] ?? u.minSize : u.collapsedSize;
          Ce(t, m - f);
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
function dr(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = ze(), n = Sn(e, t), r = /* @__PURE__ */ new Map();
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
function mo({
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
    let p = 0;
    a ? f === "horizontal" ? p = (t.clientX - a.x) / u * 100 : p = (t.clientY - a.y) / u * 100 : f === "horizontal" ? p = t.clientX < 0 ? -100 : 100 : p = t.clientY < 0 ? -100 : 100;
    const v = r.get(d), y = o.get(d);
    if (!v || !y)
      return;
    const {
      defaultLayoutDeferred: P,
      derivedPanelConstraints: w,
      groupSize: b,
      layout: S,
      separatorToPanels: E
    } = y;
    if (w && S && E) {
      const k = ct({
        delta: p,
        initialLayout: v,
        panelConstraints: w,
        pivotIndices: l.panels.map((z) => m.indexOf(z)),
        prevLayout: S,
        trigger: "mouse-or-touch"
      });
      if (xe(k, S)) {
        if (p !== 0 && !g)
          switch (f) {
            case "horizontal": {
              c |= p < 0 ? ro : oo;
              break;
            }
            case "vertical": {
              c |= p < 0 ? ao : so;
              break;
            }
          }
      } else
        Te(l.group, {
          defaultLayoutDeferred: P,
          derivedPanelConstraints: w,
          groupSize: b,
          layout: k,
          separatorToPanels: E
        });
    }
  });
  let i = 0;
  t.movementX === 0 ? i |= s & Qn : i |= c & Qn, t.movementY === 0 ? i |= s & er : i |= c & er, fc(i), yn(e);
}
function ur(e) {
  const t = ze(), n = Le();
  switch (n.state) {
    case "active":
      mo({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function fr(e) {
  var r, o;
  if (e.defaultPrevented)
    return;
  const t = Le(), n = ze();
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
          const s = Ne(a.group.id, !0);
          Te(a.group, s, {
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
      mo({
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
function mr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (Le().state) {
      case "hover":
        We({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function pr(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || co(e.currentTarget) && e.preventDefault();
}
function hr(e) {
  let t = 0, n = 0;
  const r = {};
  for (const a of e)
    if (a.defaultSize !== void 0) {
      t++;
      const s = fe(a.defaultSize);
      n += s, r[a.panelId] = s;
    } else
      r[a.panelId] = void 0;
  const o = e.length - t;
  if (o !== 0) {
    const a = fe((100 - n) / o);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = a);
  }
  return r;
}
function Tc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((i) => i.element === t);
  if (!r || !r.onResize)
    return;
  const o = Ve({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, c = {
    asPercentage: fe(a / o * 100),
    inPixels: a
  };
  r.mutableValues.prevSize = c, r.onResize(c, r.id, s);
}
function Ec(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Ac({
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
        const m = f / 100 * n, g = fe(
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
      d[u] = fe(
        f / a * l
      );
    }
  else {
    const u = fe(
      l / i.length
    );
    for (const f of i)
      d[f] = u;
  }
  return d;
}
function kc(e, t) {
  const n = e.map((o) => o.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n)
    if (!r.includes(o))
      return !1;
  return !0;
}
const Ue = /* @__PURE__ */ new Map();
function Mc(e) {
  let t = !0;
  X(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new n((g) => {
    for (const p of g) {
      const { borderBoxSize: v, target: y } = p;
      if (y === e.element) {
        if (t) {
          const P = Ve({ group: e });
          if (P === 0)
            return;
          const w = Ne(e.id);
          if (!w)
            return;
          const b = Xt(e), S = w.defaultLayoutDeferred ? hr(b) : w.layout, E = Ac({
            group: e,
            nextGroupSize: P,
            prevGroupSize: w.groupSize,
            prevLayout: S
          }), k = _e({
            layout: E,
            panelConstraints: b
          });
          if (!w.defaultLayoutDeferred && xe(w.layout, k) && Ec(
            w.derivedPanelConstraints,
            b
          ) && w.groupSize === P)
            return;
          Te(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: b,
            groupSize: P,
            layout: k,
            separatorToPanels: w.separatorToPanels
          });
        }
      } else
        Tc(e, y, v);
    }
  });
  a.observe(e.element), e.panels.forEach((g) => {
    X(
      !r.has(g.id),
      `Panel ids must be unique; id "${g.id}" was used more than once`
    ), r.add(g.id), g.onResize && a.observe(g.element);
  });
  const s = Ve({ group: e }), c = Xt(e), i = e.panels.map(({ id: g }) => g).join(",");
  let l = e.mutableState.defaultLayout;
  l && (kc(e.panels, l) || (l = void 0));
  const d = e.mutableState.layouts[i] ?? l ?? hr(c), u = _e({
    layout: d,
    panelConstraints: c
  }), f = e.element.ownerDocument;
  Ue.set(
    f,
    (Ue.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return to(e).forEach((g) => {
    g.separator && m.set(g.separator, g.panels);
  }), Te(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: c,
    groupSize: s,
    layout: u,
    separatorToPanels: m
  }), e.separators.forEach((g) => {
    X(
      !o.has(g.id),
      `Separator ids must be unique; id "${g.id}" was used more than once`
    ), o.add(g.id), g.element.addEventListener("keydown", lr);
  }), Ue.get(f) === 1 && (f.addEventListener("contextmenu", or, !0), f.addEventListener("dblclick", cr, !0), f.addEventListener("pointerdown", dr, !0), f.addEventListener("pointerleave", ur), f.addEventListener("pointermove", fr), f.addEventListener("pointerout", mr), f.addEventListener("pointerup", pr, !0)), function() {
    t = !1, Ue.set(
      f,
      Math.max(0, (Ue.get(f) ?? 0) - 1)
    ), hc(e), e.separators.forEach((g) => {
      g.element.removeEventListener("keydown", lr);
    }), Ue.get(f) || (f.removeEventListener(
      "contextmenu",
      or,
      !0
    ), f.removeEventListener(
      "dblclick",
      cr,
      !0
    ), f.removeEventListener(
      "pointerdown",
      dr,
      !0
    ), f.removeEventListener("pointerleave", ur), f.removeEventListener("pointermove", fr), f.removeEventListener("pointerout", mr), f.removeEventListener("pointerup", pr, !0)), a.disconnect();
  };
}
function Nc() {
  const [e, t] = M({}), n = x(() => t({}), []);
  return [e, n];
}
function wn(e) {
  const t = Ir();
  return `${e ?? t}`;
}
const Fe = typeof window < "u" ? De : $;
function ot(e) {
  const t = A(e);
  return Fe(() => {
    t.current = e;
  }, [e]), x(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function Pn(...e) {
  return ot((t) => {
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
function In(e) {
  const t = A({ ...e });
  return Fe(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const po = an(null);
function Cc(e, t) {
  const n = A({
    getLayout: () => ({}),
    setLayout: mc
  });
  on(t, () => n.current, []), Fe(() => {
    Object.assign(
      n.current,
      fo({ groupId: e })
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
  ...m
}) {
  const g = A({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), p = ot((R) => {
    xe(g.current.onLayoutChange, R) || (g.current.onLayoutChange = R, i == null || i(R));
  }), v = ot(
    (R, I) => {
      xe(g.current.onLayoutChanged, R) || (g.current.onLayoutChanged = R, l == null || l(R, { isUserInteraction: I }));
    }
  ), y = wn(c), P = A(null), [w, b] = Nc(), S = A({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: u,
    separators: []
  }), E = Pn(P, a);
  Cc(y, s);
  const k = ot(
    (R, I) => {
      const T = Le(), C = rr(R), O = Ne(R);
      if (O) {
        let j = !1;
        switch (T.state) {
          case "active": {
            j = T.hitRegions.some(
              (Y) => Y.group === C
            );
            break;
          }
        }
        return {
          flexGrow: O.layout[I] ?? 1,
          pointerEvents: j ? "none" : void 0
        };
      }
      if (n != null && n[I])
        return {
          flexGrow: n == null ? void 0 : n[I]
        };
    }
  ), z = In({
    defaultLayout: n,
    disableCursor: r
  }), _ = Z(
    () => ({
      get disableCursor() {
        return !!z.disableCursor;
      },
      getPanelStyles: k,
      id: y,
      orientation: d,
      registerPanel: (R) => {
        const I = S.current;
        return I.panels = Qt(d, [
          ...I.panels,
          R
        ]), b(), () => {
          I.panels = I.panels.filter(
            (T) => T !== R
          ), b();
        };
      },
      registerSeparator: (R) => {
        const I = S.current;
        return I.separators = Qt(d, [
          ...I.separators,
          R
        ]), b(), () => {
          I.separators = I.separators.filter(
            (T) => T !== R
          ), b();
        };
      },
      updatePanelProps: (R, { disabled: I }) => {
        const T = S.current.panels.find(
          (j) => j.id === R
        );
        T && (T.panelConstraints.disabled = I);
        const C = rr(y), O = Ne(y);
        C && O && Te(C, {
          ...O,
          derivedPanelConstraints: Xt(C)
        });
      },
      updateSeparatorProps: (R, {
        disabled: I,
        disableDoubleClick: T
      }) => {
        const C = S.current.separators.find(
          (O) => O.id === R
        );
        C && (C.disabled = I, C.disableDoubleClick = T);
      }
    }),
    [k, y, b, d, z]
  ), F = A(null);
  return Fe(() => {
    const R = P.current;
    if (R === null)
      return;
    const I = S.current;
    let T;
    if (z.defaultLayout !== void 0 && Object.keys(z.defaultLayout).length === I.panels.length) {
      T = {};
      for (const V of I.panels) {
        const L = z.defaultLayout[V.id];
        L !== void 0 && (T[V.id] = L);
      }
    }
    const C = {
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
      panels: I.panels,
      resizeTargetMinimumSize: I.resizeTargetMinimumSize,
      separators: I.separators
    };
    F.current = C;
    const O = Mc(C), { defaultLayoutDeferred: j, derivedPanelConstraints: Y, layout: U } = Ne(C.id, !0);
    !j && Y.length > 0 && (p(U), v(U, !1));
    const K = vn(y, (V) => {
      const { defaultLayoutDeferred: L, derivedPanelConstraints: W, layout: se } = V.next;
      if (L || W.length === 0)
        return;
      const Q = C.panels.map(({ id: oe }) => oe).join(",");
      C.mutableState.layouts[Q] = se, W.forEach((oe) => {
        if (oe.collapsible) {
          const { layout: me } = V.prev ?? {};
          if (me) {
            const le = ue(
              oe.collapsedSize,
              se[oe.panelId]
            ), Ee = ue(
              oe.collapsedSize,
              me[oe.panelId]
            );
            le && !Ee && (C.mutableState.expandedPanelSizes[oe.panelId] = me[oe.panelId]);
          }
        }
      });
      const te = Le().state !== "active";
      p(se), te && v(se, V.isUserInteraction);
    });
    return () => {
      F.current = null, O(), K();
    };
  }, [
    o,
    y,
    v,
    p,
    d,
    w,
    z
  ]), $(() => {
    const R = F.current;
    R && (R.mutableState.defaultLayout = n, R.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ h(po.Provider, { value: _, children: /* @__PURE__ */ h(
    "div",
    {
      ...m,
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
  const e = sn(po);
  return X(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function Lc(e, t) {
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
  on(t, () => r.current, []), Fe(() => {
    Object.assign(
      r.current,
      uo({ groupId: n, panelId: e })
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
  style: m,
  ...g
}) {
  const p = !!i, v = wn(i), y = In({
    disabled: a
  }), P = A(null), w = Pn(P, s), {
    getPanelStyles: b,
    id: S,
    orientation: E,
    registerPanel: k,
    updatePanelProps: z
  } = Rn(), _ = u !== null, F = ot(
    (C, O, j) => {
      u == null || u(C, i, j);
    }
  );
  Fe(() => {
    const C = P.current;
    if (C !== null) {
      const O = {
        element: C,
        id: v,
        idIsStable: p,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: _ ? F : void 0,
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
      return k(O);
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
    d,
    F,
    k,
    y
  ]), $(() => {
    z(v, { disabled: a });
  }, [a, v, z]), Lc(v, f);
  const R = () => {
    const C = b(S, v);
    if (C)
      return JSON.stringify(C);
  }, I = Ao(
    (C) => vn(S, C),
    R,
    R
  );
  let T;
  return I ? T = JSON.parse(I) : o !== void 0 ? T = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: o
  } : T = { flexGrow: 1 }, /* @__PURE__ */ h(
    "div",
    {
      ...g,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": v,
      id: v,
      ref: w,
      style: {
        ...xc,
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
            touchAction: E === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
en.displayName = "Panel";
const xc = {
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
function _c({
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
    a = _e({
      layout: ct({
        delta: l - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], o = _e({
      layout: ct({
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
function go({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: o,
  id: a,
  style: s,
  ...c
}) {
  const i = wn(a), l = In({
    disabled: n,
    disableDoubleClick: r
  }), [d, u] = M({}), [f, m] = M("inactive"), [g, p] = M(!1), v = A(null), y = Pn(v, o), {
    disableCursor: P,
    id: w,
    orientation: b,
    registerSeparator: S,
    updateSeparatorProps: E
  } = Rn(), k = b === "horizontal" ? "vertical" : "horizontal";
  Fe(() => {
    const F = v.current;
    if (F !== null) {
      const R = {
        disabled: l.disabled,
        disableDoubleClick: l.disableDoubleClick,
        element: F,
        id: i
      }, I = S(R), T = uc(
        (O) => {
          m(
            O.next.state !== "inactive" && O.next.hitRegions.some(
              (j) => j.separator === R
            ) ? O.next.state : "inactive"
          );
        }
      ), C = vn(
        w,
        (O) => {
          const { derivedPanelConstraints: j, layout: Y, separatorToPanels: U } = O.next, K = U.get(R);
          if (K) {
            const V = K[0], L = K.indexOf(V);
            u(
              _c({
                layout: Y,
                panelConstraints: j,
                panelId: V.id,
                panelIndex: L
              })
            );
          }
        }
      );
      return () => {
        T(), C(), I();
      };
    }
  }, [w, i, S, l]), $(() => {
    E(i, { disabled: n, disableDoubleClick: r });
  }, [n, r, i, E]);
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
        g ? _ = "focus" : _ = f;
    }
  return /* @__PURE__ */ h(
    "div",
    {
      ...c,
      "aria-controls": d.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": k,
      "aria-valuemax": d.valueMax,
      "aria-valuemin": d.valueMin,
      "aria-valuenow": d.valueNow,
      children: e,
      className: t,
      "data-separator": _,
      "data-testid": i,
      id: i,
      onBlur: () => p(!1),
      onFocus: () => p(!0),
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
go.displayName = "Separator";
const Tn = 30, En = 65, lt = 50, Dc = 100 - En, zc = 100 - Tn;
function Fc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(En, Math.max(Tn, t)) : lt;
}
function An(e) {
  return 100 - e;
}
function Be(e) {
  return `${e}%`;
}
const kn = "reader-document", dt = "reader-assistant", bo = "retainpdf.reader.ai-split-layout.v1", Oc = {
  [kn]: An(lt),
  [dt]: lt
};
function Mn(e) {
  const t = Fc(e == null ? void 0 : e[dt]);
  return {
    [kn]: An(t),
    [dt]: t
  };
}
function $c() {
  try {
    const e = JSON.parse(localStorage.getItem(bo) || "null");
    return Mn(e);
  } catch {
    return Oc;
  }
}
function jc(e) {
  try {
    localStorage.setItem(bo, JSON.stringify(Mn(e)));
  } catch {
  }
}
function Bt(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = Mn(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[dt]}vw`
  );
}
function Uc() {
  const e = A(null), [t] = M($c);
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
    Bt(e.current, o), a.isUserInteraction && jc(o);
  }, []);
  return /* @__PURE__ */ N(
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
        /* @__PURE__ */ h(
          en,
          {
            id: kn,
            defaultSize: Be(An(lt)),
            minSize: Be(Dc),
            maxSize: Be(zc)
          }
        ),
        /* @__PURE__ */ h(
          go,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": "调整文档与 AI 问答宽度",
            children: /* @__PURE__ */ h("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ h(
          en,
          {
            id: dt,
            defaultSize: Be(lt),
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
  return $(() => {
    if (!t) return;
    const i = (l) => {
      var u;
      if (l.key !== "Escape") return;
      const d = l.target;
      (u = d == null ? void 0 : d.closest) != null && u.call(d, "textarea, input, select, [contenteditable='true']") || (l.preventDefault(), a());
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [t, a]), !t && !o ? null : /* @__PURE__ */ N(
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
        s ? /* @__PURE__ */ h("div", { className: "reader-notes-panel-toolbar", children: s }) : null,
        /* @__PURE__ */ h("div", { className: "reader-notes-panel-body", children: c })
      ]
    }
  );
}
function Bc({
  note: e,
  onJump: t,
  onUpdateNote: n,
  onRemove: r
}) {
  const [o, a] = M(!1), [s, c] = M(e.note);
  return $(() => {
    o || c(e.note);
  }, [e.note, o]), /* @__PURE__ */ N("article", { className: "reader-notes-item", children: [
    /* @__PURE__ */ N("div", { className: "reader-notes-item-top", children: [
      /* @__PURE__ */ h("span", { className: "reader-notes-kind", children: e.pane === "translated" ? "译文" : "原文" }),
      /* @__PURE__ */ N("div", { className: "reader-notes-item-actions", children: [
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-link", onClick: () => t(e), children: "定位" }),
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-danger", onClick: () => r(e.id), children: "删除" })
      ] })
    ] }),
    /* @__PURE__ */ h("p", { className: "reader-notes-quote", children: e.quote }),
    o ? /* @__PURE__ */ N("div", { className: "reader-notes-editor", children: [
      /* @__PURE__ */ h(
        "textarea",
        {
          className: "reader-notes-textarea",
          value: s,
          placeholder: "写点想法…",
          rows: 3,
          onChange: (i) => c(i.target.value)
        }
      ),
      /* @__PURE__ */ N("div", { className: "reader-notes-editor-actions", children: [
        /* @__PURE__ */ h(
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
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-link", onClick: () => a(!1), children: "取消" })
      ] })
    ] }) : e.note ? /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-notes-note",
        onClick: () => a(!0),
        title: "点击编辑",
        children: e.note
      }
    ) : /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-add-note", onClick: () => a(!0), children: "添加笔记" })
  ] });
}
function Hc({
  open: e,
  groups: t,
  count: n,
  onClose: r,
  onJump: o,
  onUpdateNote: a,
  onRemove: s,
  onExport: c
}) {
  const [i, l] = M(!1);
  return /* @__PURE__ */ h(
    Nn,
    {
      id: "reader-notes-panel",
      open: e,
      ariaLabel: "批注",
      className: "is-pane-right",
      onClose: r,
      toolbar: /* @__PURE__ */ N(ut, { children: [
        /* @__PURE__ */ N("span", { className: "reader-notes-count", children: [
          n,
          " 条"
        ] }),
        /* @__PURE__ */ h(
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
      children: n === 0 ? /* @__PURE__ */ h("p", { className: "reader-notes-empty", children: "暂无批注。在 PDF 上拖选文字，点「添加批注」。" }) : t.map((d) => /* @__PURE__ */ N("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ N("h3", { className: "reader-notes-group-title", children: [
          "第 ",
          d.page,
          " 页"
        ] }),
        d.items.map((u) => /* @__PURE__ */ h(
          Bc,
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
function Jc({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = M(!1);
  if ($(() => {
    !e && !t && r(!1);
  }, [e, t]), n || !e && !t)
    return null;
  const o = [
    e ? "译文区域" : "",
    t ? "阅读元数据" : ""
  ].filter(Boolean);
  return /* @__PURE__ */ N("div", { className: "reader-error-notice", role: "status", "data-reader-error-notice": "true", children: [
    /* @__PURE__ */ N("span", { className: "reader-error-notice-text", children: [
      o.join("、"),
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
function Wc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: o = !1,
  metadataError: a = !1
}) {
  return !e && !t ? /* @__PURE__ */ h(Jc, { regionsFailed: o, metadataFailed: a }) : /* @__PURE__ */ N(ut, { children: [
    e ? /* @__PURE__ */ h("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ N("div", { className: "reader-boot-loading-card", children: [
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
const gr = 170, br = 16;
function qc() {
  const e = typeof window > "u" ? 800 : window.innerWidth;
  if (typeof document > "u") return e;
  const t = document.querySelector(`.${_r}`), n = (t == null ? void 0 : t.getBoundingClientRect().width) ?? 0;
  return n > 0 ? n : e;
}
function Kc(e, t) {
  const n = br + gr, r = t - br - gr;
  return r < n ? t / 2 : Math.min(Math.max(n, e), r);
}
async function Vc(e) {
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
function Gc({
  selection: e,
  onDismiss: t,
  onAskAi: n,
  onAddNote: r
}) {
  const [o, a] = M(!1), s = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if ($(() => a(!1), [s]), !e)
    return null;
  const c = typeof window < "u" ? window.innerHeight : 600, i = e.rect.left + e.rect.width / 2, l = Kc(i, qc()), d = e.rect.top > 72, u = d ? Math.max(12, e.rect.top - 8) : Math.min(c - 12, e.rect.top + e.rect.height + 8), f = d ? "above" : "below", m = e.pane === "translated" ? "译文" : "原文", g = e.selectionType === "text" ? "text" : e.kind, p = e.selectionType === "text" ? e.quote : Er(e.region, e.pane), v = g === "formula" ? "公式" : g === "table" ? "表格" : g === "figure" ? "图片" : g === "text" ? "文字" : "区域", y = g === "formula" ? Uo(p) : p, P = g === "formula" ? na : g === "table" ? ra : g === "text" ? oa : aa;
  return /* @__PURE__ */ N(
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
        /* @__PURE__ */ N("div", { className: "reader-sel-pop-card reader-floating-surface", children: [
          /* @__PURE__ */ N("div", { className: "reader-sel-pop-context", children: [
            /* @__PURE__ */ h(P, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { children: v }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ h("span", { children: m }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ N("span", { children: [
              e.page,
              " 页"
            ] })
          ] }),
          /* @__PURE__ */ N("div", { className: "reader-sel-pop-actions", children: [
            y ? /* @__PURE__ */ N(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--primary",
                onClick: async () => {
                  try {
                    await Vc(y), a(!0), window.setTimeout(() => a(!1), 1400);
                  } catch (w) {
                    console.warn("[reader-selection] copy failed", w);
                  }
                },
                children: [
                  o ? /* @__PURE__ */ h(sa, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ h(ia, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: o ? "已复制" : g === "formula" ? "复制 LaTeX" : "复制" })
                ]
              }
            ) : /* @__PURE__ */ h("span", { className: "reader-sel-pop-selection-hint", children: "已选择图片" }),
            r && y ? /* @__PURE__ */ N(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => r({ page: e.page, pane: e.pane, quote: y }),
                children: [
                  /* @__PURE__ */ h(Nr, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: "添加批注" })
                ]
              }
            ) : null,
            n ? /* @__PURE__ */ N(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => n(e),
                children: [
                  /* @__PURE__ */ h(Cr, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
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
                children: /* @__PURE__ */ h(ln, { size: 15, strokeWidth: 2.5, "aria-hidden": !0 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ h("span", { className: "reader-sel-pop-caret", "aria-hidden": "true" })
      ]
    }
  );
}
function Zc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Yc() {
  const [e, t] = M(!1), n = Ir(), r = A(null);
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
      if (a.defaultPrevented || a.metaKey || a.ctrlKey || a.altKey || Zc(a.target)) return;
      const s = a.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !a.shiftKey)
          return;
        a.preventDefault(), t((c) => !c);
      }
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, []), /* @__PURE__ */ N("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: `reader-react-hud-btn reader-react-shortcuts-btn${e ? " is-active" : ""}`,
        "aria-label": "快捷键说明",
        "aria-expanded": e,
        "aria-controls": n,
        title: "快捷键（H 或 ?）",
        onClick: () => t((o) => !o),
        children: /* @__PURE__ */ h(ca, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    ),
    e ? /* @__PURE__ */ N(
      "div",
      {
        id: n,
        className: "reader-react-shortcuts-panel reader-floating-surface",
        role: "dialog",
        "aria-label": "阅读器快捷键",
        children: [
          /* @__PURE__ */ N("div", { className: "reader-react-shortcuts-head", children: [
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
          /* @__PURE__ */ h("div", { className: "reader-react-shortcuts-body", children: ri.map((o) => /* @__PURE__ */ N("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ h("h3", { children: o.title }),
            /* @__PURE__ */ h("ul", { children: o.items.map((a) => /* @__PURE__ */ N("li", { children: [
              /* @__PURE__ */ h("kbd", { children: a.keys }),
              /* @__PURE__ */ h("span", { children: a.desc })
            ] }, `${o.title}-${a.keys}`)) })
          ] }, o.title)) }),
          /* @__PURE__ */ h("p", { className: "reader-react-shortcuts-foot", children: "在输入框内不会触发快捷键" })
        ]
      }
    ) : null
  ] });
}
const Xc = ["source", "sideBySide", "translated"], Qc = { source: "", translated: "", sideBySide: "" };
function el(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = Tt(e.sourceUrl), n = Tt(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return Ra({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function tl(e) {
  const [t, n] = M(() => /* @__PURE__ */ new Set()), r = Z(
    () => e ? el(e) : Qc,
    [e]
  ), o = Z(
    () => Xc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), a = x(async (s) => {
    if (!e) return;
    const c = Tt(r[s]);
    if (!(!c || t.has(s)))
      try {
        const i = e.jobId ? Ia(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await Ta(
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
        Ea(l), n((d) => {
          const u = new Set(d);
          return u.delete(s), u;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: o, busyActions: t, handleDownload: a };
}
const nl = {
  source: Ar,
  sideBySide: kr,
  translated: Mr
}, rl = {
  source: "原文",
  sideBySide: "对照",
  translated: "译文"
};
function ol(e) {
  const t = pt(), n = e.download ?? (t == null ? void 0 : t.download), { urls: r, downloadItems: o, busyActions: a, handleDownload: s } = tl(n);
  return /* @__PURE__ */ h("div", { className: "reader-download-actions", role: "group", "aria-label": "下载 PDF", children: o.map((c) => {
    const i = Lo[c], l = Tt(r[c]), d = a.has(c), u = !!l && !d, f = u ? "" : xo(c, r), m = nl[c];
    return (
      // 外面这层 span 是为了**让「为什么点不动」这句话真的弹得出来**。
      //
      // disabled 的按钮在主流浏览器上不派发鼠标事件，挂在它自己身上的
      // title 永远不显示 —— 原因只有读屏拿得到（aria-label 还在），鼠标
      // 用户看到的就是一个灰掉的按钮。窄屏（≤900px）下文字标签还会被裁成
      // 1px 只留图标，那时连「这是哪一路」都没了。
      // span 不是 disabled，hover 照样触发。
      /* @__PURE__ */ h(
        "span",
        {
          className: "reader-download-action-slot",
          title: u ? `下载${i.label}` : f,
          children: /* @__PURE__ */ N(
            "button",
            {
              type: "button",
              id: `reader-download-${c}`,
              className: `reader-download-action${d ? " is-busy" : ""}`,
              disabled: !u,
              "aria-label": u ? `下载${i.label}` : f,
              onClick: () => void s(c),
              children: [
                /* @__PURE__ */ h(m, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
                /* @__PURE__ */ h("span", { className: "reader-download-action-label", children: rl[c] })
              ]
            }
          )
        },
        c
      )
    );
  }) });
}
function al(e) {
  const t = pt(), n = Ui(), { mode: r = "compare", modeControls: o } = e, a = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? mt, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), c = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, i = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, l = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), d = cs(a), u = a > zr + 1e-3, f = a < Fr - 1e-3, m = rt(), g = "50%（半屏，对照铺满）", [p, v] = M(!1), [y, P] = M(`${c}`);
  $(() => {
    p || P(`${Math.min(Math.max(c, 1), Math.max(i, 1))}`);
  }, [c, i, p]);
  const w = () => {
    if (v(!1), !l || i <= 0)
      return;
    const b = Number(`${y}`.trim());
    l(kt(b, i));
  };
  return /* @__PURE__ */ N("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    o ? /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-modes", children: o }) : null,
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group", "aria-label": "页码", children: p ? /* @__PURE__ */ N(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (b) => {
          b.preventDefault(), w();
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
              onChange: (b) => P(b.target.value.replace(/[^\d]/g, "")),
              onBlur: w,
              onKeyDown: (b) => {
                b.key === "Escape" && (b.preventDefault(), v(!1), P(`${c}`));
              }
            }
          ),
          /* @__PURE__ */ N("span", { className: "reader-react-hud-page-suffix", children: [
            "/ ",
            i || "—"
          ] })
        ]
      }
    ) : /* @__PURE__ */ h(
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
    /* @__PURE__ */ N("div", { className: "reader-react-hud-group", "aria-label": "缩放", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "缩小",
          disabled: !u,
          onClick: () => s(it(a, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ N(
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
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": "放大",
          disabled: !f,
          onClick: () => s(it(a, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": "帮助", children: /* @__PURE__ */ h(Yc, {}) })
  ] });
}
function Mt(e) {
  const t = `${e.documentId || ""}`.trim();
  if (t)
    return `${Rt}doc:${t}`;
  const n = `${e.jobId || ""}`.trim();
  return n ? `${Rt}job:${n}` : `${Rt}anonymous`;
}
const Rt = "retainpdf.reader.notes.v1:";
function sl(e) {
  const t = `${e.jobId || ""}`.trim();
  if (!t)
    return [];
  const n = `${Rt}job:${t}`;
  return n === Mt(e) ? [] : [n];
}
function il() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function cl(e) {
  return {
    pageIdx: Number(e.page) - 1,
    quoteText: e.quote,
    note: e.note,
    createdAt: e.createdAt
  };
}
function yo(e) {
  return Jo(e, (t) => t.page);
}
function ll(e) {
  return qo(e, (t) => t.page).map((t) => ({ page: t.pageIdx, items: t.items }));
}
function dl(e, t) {
  return Wo({
    title: e,
    annotations: t.map(cl)
  });
}
function ul(e) {
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
    return ul(localStorage.getItem(e));
  } catch {
    return [];
  }
}
function fl(...e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const r of n)
      t.has(r.id) || t.set(r.id, r);
  return yo([...t.values()]);
}
function ml(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch (r) {
    return console.warn("[reader-notes] persist failed", r), !1;
  }
  const n = new Set(tn(e).map((r) => r.id));
  return t.every((r) => n.has(r.id));
}
function yr(e) {
  if (typeof localStorage > "u")
    return [];
  const t = Mt(e), n = tn(t), r = sl(e).map((a) => ({ key: a, notes: tn(a) })).filter((a) => a.notes.length > 0);
  if (r.length === 0)
    return n;
  const o = fl(n, ...r.map((a) => a.notes));
  if (!ml(t, o))
    return o;
  for (const a of r)
    try {
      localStorage.removeItem(a.key);
    } catch {
    }
  return o;
}
function pl(e, t) {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.setItem(e, JSON.stringify(t));
    } catch (n) {
      console.warn("[reader-notes] persist failed", n);
    }
}
function hl(e, t = {}) {
  const n = Z(
    () => ({
      jobId: `${e.jobId || ""}`.trim(),
      documentId: `${e.documentId || ""}`.trim()
    }),
    [e.jobId, e.documentId]
  ), [r, o] = M(() => ({
    key: Mt(n),
    notes: yr(n)
  })), a = r.notes, s = x(
    (g) => {
      o((p) => ({
        key: p.key,
        notes: typeof g == "function" ? g(p.notes) : g
      }));
    },
    []
  ), c = t.onAfterAdd, i = Mt(n);
  $(() => {
    o((g) => g.key === i ? g : { key: i, notes: yr(n) });
  }, [n, i]), $(() => {
    pl(r.key, r.notes);
  }, [r]);
  const l = x((g) => {
    const p = `${g.quote || ""}`.trim();
    if (!p)
      return null;
    const v = {
      id: il(),
      page: Math.max(1, Math.floor(Number(g.page) || 1)),
      pane: g.pane === "translated" ? "translated" : "source",
      quote: p,
      note: `${g.note || ""}`.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s((y) => yo([v, ...y])), c == null || c(), v;
  }, [c]), d = x((g, p) => {
    const v = `${p || ""}`.trim();
    s((y) => y.map((P) => P.id === g ? { ...P, note: v } : P));
  }, []), u = x((g) => {
    s((p) => p.filter((v) => v.id !== g));
  }, []), f = x(async (g = "") => {
    var v, y;
    const p = dl(g, a);
    try {
      return await ((y = (v = navigator.clipboard) == null ? void 0 : v.writeText) == null ? void 0 : y.call(v, p)), !0;
    } catch (P) {
      return console.error("[reader-notes] copy failed", P), !1;
    }
  }, [a]), m = Z(() => ll(a), [a]);
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
function vr(e) {
  var t, n, r, o;
  return jr(e == null ? void 0 : e.assistantPanel) ? e.assistantPanel : ((t = e == null ? void 0 : e.splitLayout) == null ? void 0 : t.left) === "ai" || ((n = e == null ? void 0 : e.splitLayout) == null ? void 0 : n.right) === "ai" ? "ai" : ((r = e == null ? void 0 : e.splitLayout) == null ? void 0 : r.left) === "markdown" || ((o = e == null ? void 0 : e.splitLayout) == null ? void 0 : o.right) === "markdown" ? "markdown" : null;
}
function gl(e) {
  const [t, n] = M(() => ({
    scope: e,
    panel: vr(Re(e))
  }));
  $(() => {
    n((o) => o.scope === e ? o : {
      scope: e,
      panel: vr(Re(e))
    });
  }, [e]), $(() => {
    t.scope === e && Lt(t.scope, {
      assistantPanel: t.panel,
      // 旧的自由两栏布局已经没有写入者了，恢复时只当迁移来源读一次。
      splitLayout: null
    });
  }, [t, e]);
  const r = x((o) => {
    n((a) => ({
      scope: a.scope,
      panel: typeof o == "function" ? o(a.panel) : o
    }));
  }, []);
  return { panel: t.panel, scope: t.scope, setPanel: r };
}
const nn = "download-toast";
function bl({
  title: e = "下载中",
  status: t = "正在准备...",
  meta: n = "等待响应...",
  percent: r = NaN,
  tone: o = "progress"
}) {
  const a = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ N("div", { className: "download-toast-card reader-floating-surface", "data-tone": o, "aria-live": "polite", children: [
    /* @__PURE__ */ N("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ h("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ h("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ h("div", { className: "download-toast-track", children: /* @__PURE__ */ h("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${a}%` } }) }),
    /* @__PURE__ */ h("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function yl(e = {}) {
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
    () => /* @__PURE__ */ h(bl, { title: n, status: r, meta: o, percent: a, tone: s }),
    { id: nn, duration: 1 / 0 }
  );
}
function vl() {
  const e = x((t) => {
    t && (t.setState = yl, t.hide = () => Ht.dismiss(nn));
  }, []);
  return /* @__PURE__ */ N(ut, { children: [
    /* @__PURE__ */ h(Ko, { position: "bottom-right" }),
    /* @__PURE__ */ h("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
function vo(e) {
  const t = A(!1);
  return e && (t.current = !0), t.current;
}
function et(e, t) {
  const n = e === t;
  return { open: n, mounted: vo(n) };
}
function Sl({
  panel: e,
  active: t,
  context: n
}) {
  var i, l;
  const r = t === e.id, o = vo(r);
  if (!(e.keepMounted ? o : r)) return null;
  const s = ce(), c = e.slot === "terminal" ? (i = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : i.call(s, {
    open: r,
    sessionKey: n.sessionKey,
    onClose: n.onClose
  }) : (l = s == null ? void 0 : s[e.adapterKey]) == null ? void 0 : l.call(s, {
    open: r,
    jobId: n.jobId,
    onJump: n.onJump,
    onClose: n.onClose
  });
  return c == null ? null : /* @__PURE__ */ h(
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
const Sr = {
  question: "疑问",
  warning: "注意",
  link: "关联",
  term: "术语",
  note: "批注"
};
function wl({
  note: e,
  anchorRect: t,
  onJump: n,
  onClose: r
}) {
  const o = A(null);
  return $(() => {
    const a = (s) => {
      s.key === "Escape" && r();
    };
    return document.addEventListener("keydown", a), () => document.removeEventListener("keydown", a);
  }, [r]), $(() => {
    const a = (s) => {
      var i, l;
      const c = o.current;
      !c || c.contains(s.target) || (l = (i = s.target) == null ? void 0 : i.closest) != null && l.call(i, ".reader-ai-note-mark") || r();
    };
    return document.addEventListener("pointerdown", a, !0), () => document.removeEventListener("pointerdown", a, !0);
  }, [r]), /* @__PURE__ */ N(
    "div",
    {
      ref: o,
      className: `reader-ai-note-popover is-${e.kind}`,
      role: "dialog",
      "aria-label": `${Sr[e.kind]}批注`,
      style: {
        left: t.left + t.width + 8,
        top: t.top
      },
      children: [
        /* @__PURE__ */ N("header", { className: "reader-ai-note-popover-head", children: [
          /* @__PURE__ */ h("span", { className: `reader-ai-note-kind is-${e.kind}`, children: Sr[e.kind] }),
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
        e.refs.length > 0 ? /* @__PURE__ */ h("ul", { className: "reader-ai-note-refs", children: e.refs.map((a, s) => /* @__PURE__ */ h("li", { children: /* @__PURE__ */ N(
          "button",
          {
            type: "button",
            className: "reader-ai-note-ref",
            onClick: () => {
              n({ page_idx: a.pageIdx ?? void 0, block_id: a.blockId }), r();
            },
            children: [
              a.label,
              a.pageIdx != null ? /* @__PURE__ */ N("span", { className: "reader-ai-note-ref-page", children: [
                "第 ",
                a.pageIdx + 1,
                " 页"
              ] }) : null
            ]
          }
        ) }, `${a.blockId}-${s}`)) }) : (
          // 不隐藏这条：没有依据的批注该让人看得出来，自己判断信不信。
          /* @__PURE__ */ h("p", { className: "reader-ai-note-popover-weak", children: "没有给出依据（refs），多半只是复述原文" })
        )
      ]
    }
  );
}
const Pl = ["question", "warning", "link", "term", "note"];
function nt(e) {
  return typeof e == "string" ? e.trim() : "";
}
function wr(e) {
  if (!e || typeof e != "object") return null;
  const t = e, n = nt(t.block_id);
  if (!n) return null;
  const r = typeof t.page_idx == "number" && Number.isFinite(t.page_idx) ? Math.max(0, Math.floor(t.page_idx)) : null;
  return { blockId: n, pageIdx: r };
}
function Il(e) {
  const t = Math.round(Number(e));
  return t === 1 || t === 2 ? t : 3;
}
function Rl(e) {
  if (!e || typeof e != "object") return null;
  const t = e.notes;
  if (!Array.isArray(t)) return null;
  const n = [], r = /* @__PURE__ */ new Set();
  return t.forEach((o, a) => {
    if (!o || typeof o != "object") return;
    const s = o, c = wr(s.anchor), i = nt(s.text);
    if (!c || !i) return;
    const l = nt(s.id) || `ai-note-${a}`;
    if (r.has(l)) return;
    r.add(l);
    const d = nt(s.kind), u = Array.isArray(s.refs) ? s.refs.flatMap((f) => {
      const m = wr(f);
      if (!m) return [];
      const g = nt(f == null ? void 0 : f.label);
      return [{ ...m, label: g || m.blockId }];
    }) : [];
    n.push({
      id: l,
      anchor: c,
      kind: Pl.includes(d) ? d : "note",
      level: Il(s.level),
      text: i,
      refs: u,
      weak: u.length === 0
    });
  }), n.length === 0 ? null : { notes: n, weakCount: n.filter((o) => o.weak).length };
}
const So = Number.MAX_SAFE_INTEGER;
function Tl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = n.anchor.pageIdx ?? So, o = t.get(r);
    o ? o.push(n) : t.set(r, [n]);
  }
  return [...t.entries()].sort((n, r) => n[0] - r[0]).map(([n, r]) => ({ page: n, items: r }));
}
function El(e, t) {
  return e.filter((n) => n.level <= t);
}
const Al = {
  question: "存疑",
  warning: "当心",
  link: "跨页",
  term: "术语",
  note: "笔记"
}, Pr = 2;
function kl({
  open: e,
  doc: t,
  onClose: n,
  onJump: r
}) {
  const [o, a] = M(Pr), s = (t == null ? void 0 : t.notes) ?? [], c = El(s, o), i = Tl(c);
  return /* @__PURE__ */ h(
    Nn,
    {
      id: "reader-ai-notes-panel",
      open: e,
      ariaLabel: "AI 批注",
      className: "is-pane-right",
      onClose: n,
      toolbar: /* @__PURE__ */ N(ut, { children: [
        /* @__PURE__ */ N("span", { className: "reader-notes-count", children: [
          c.length,
          " 条"
        ] }),
        s.length > c.length ? /* @__PURE__ */ N(
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
        o === 3 && s.length > 0 ? /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            onClick: () => a(Pr),
            children: "只看重点"
          }
        ) : null
      ] }),
      children: s.length === 0 ? (
        // 这段是这个功能唯一的说明书。写不清楚的话，面板开出来是空的，和"功能
        // 坏了"长得一模一样。
        /* @__PURE__ */ N("p", { className: "reader-notes-empty", children: [
          "还没有 AI 批注。在终端里让 fx 标一遍，比如：",
          /* @__PURE__ */ h("code", { children: "把第 3 节的隐含前提和跨页依赖标到 ./notes.v1.json 上" }),
          "标完这里会自己出现，不用刷新。"
        ] })
      ) : i.map((l) => /* @__PURE__ */ N("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ h("h3", { className: "reader-notes-group-title", children: l.page === So ? "未标页码" : `第 ${l.page + 1} 页` }),
        l.items.map((d) => /* @__PURE__ */ N(
          "button",
          {
            type: "button",
            className: "reader-ai-note-row",
            "data-kind": d.kind,
            "data-weak": d.weak ? "" : void 0,
            onClick: () => r({ page_idx: d.anchor.pageIdx ?? void 0, block_id: d.anchor.blockId }),
            children: [
              /* @__PURE__ */ h("span", { className: "reader-ai-note-kind", children: Al[d.kind] }),
              /* @__PURE__ */ h("span", { className: "reader-ai-note-text", children: d.text }),
              d.refs.length > 0 ? (
                // refs 是这份数据里最有价值的部分（见 shared/data/ai-notes.ts：
                // 指向别处的批注才不是复述）。列表里先让人看见有没有。
                /* @__PURE__ */ N("span", { className: "reader-ai-note-refs", children: [
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
const Ml = 5e3;
function Nl(e) {
  const [t, n] = M(null);
  return $(() => {
    if (!e) {
      n(null);
      return;
    }
    let r = !1, o = "";
    const a = async () => {
      var d;
      const c = (d = ce()) == null ? void 0 : d.defaultReaderDataPort;
      if (!(c != null && c.loadAiNotes)) return;
      const i = await c.loadAiNotes(e);
      if (r) return;
      const l = i == null ? "" : JSON.stringify(i);
      l !== o && (o = l, n(Rl(i)));
    };
    a();
    const s = setInterval(() => void a(), Ml);
    return () => {
      r = !0, clearInterval(s);
    };
  }, [e]), t;
}
const Cl = cn(() => import("./ReaderFavoritesPanel-CSwONLDs.js").then((e) => ({ default: e.ReaderFavoritesPanel }))), Ll = cn(() => import("./ReaderMarkdownPanel-BUTDj8ZI.js").then((e) => ({ default: e.ReaderMarkdownPanel }))), xl = cn(() => import("./ReaderAiPanel-B3tJfuTI.js").then((e) => ({ default: e.ReaderAiPanel }))), _l = [];
function Dl(e) {
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
function zl(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function Fl(e) {
  return e ?? "notes";
}
function Ol() {
  const e = ti(), { boot: t, panes: n, sessionFiles: r, session: o } = e, a = gl(e.viewStateKey), s = a.panel, c = a.setPanel, [i, l] = M(null), [d, u] = M(null), [f, m] = M(!1), g = A(null), p = s !== null, v = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, y = Dl({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: v,
    liveTranslationVisible: f,
    assistantOpen: p,
    assistantPdfPane: i
  }), P = y.sourceViewOnly, w = y.visibleMode, b = x(() => c(Fl), []), S = hl(
    { jobId: o.jobId, documentId: o.documentId },
    { onAfterAdd: b }
  ), E = x((H) => {
    S.addFromQuote(H), e.clearSelection();
  }, [S.addFromQuote, e.clearSelection]), k = x((H) => {
    e.goToPage(H.page, H.pane === "translated" ? "translated" : "source");
  }, [e.goToPage]), z = x(
    () => S.exportMarkdown(o.title || ""),
    [S.exportMarkdown, o.title]
  );
  $(() => {
    u(null), m(!1);
  }, [e.viewStateKey]), $(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), $(() => {
    l(null);
  }, [a.scope]), $(() => {
    if (!(t.loading || t.failed)) {
      if (g.current !== e.viewStateKey) {
        g.current = e.viewStateKey;
        const H = Re(e.viewStateKey), J = P ? "source" : H == null ? void 0 : H.mode;
        J && J !== e.mode && e.setModeKeepingPage(J);
        return;
      }
      Lt(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, P]);
  const _ = s || (e.mode === "compare" ? "compare" : "reading"), F = et(s, "favorites"), R = et(s, "markdown"), I = et(s, "ai"), T = et(s, "notes"), C = et(s, "ai-notes");
  si({
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
  const O = x(() => {
    c(null), l(null), u(null);
  }, []), j = x((H) => {
    const J = w === "translated" ? "translated" : "source";
    e.jumpToAnchor(H, J);
  }, [e.jumpToAnchor, w]), Y = x((H) => {
    o.refreshCommittedDocument(H);
  }, [o.refreshCommittedDocument]), U = x((H) => {
    l(null);
    const J = zl(H, e.liveTranslationAvailable);
    J !== null && m(J), e.setModeKeepingPage(H);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage]), K = Z(() => !v || !y.showSource ? null : /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m((H) => !H),
      "aria-pressed": f,
      title: f ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文",
      children: "译文"
    }
  ), [v, y.showSource, f]), V = x((H) => {
    c(H), H !== "ai" && u(null);
  }, []), L = Nl(o.jobId), [W, se] = M(null), Q = x((H, J) => {
    se((ee) => (ee == null ? void 0 : ee.note.id) === H.id ? null : { note: H, rect: J });
  }, []), te = x(() => se(null), []);
  $(() => {
    se(null);
  }, [o.jobId]);
  const oe = Z(() => ({
    jobId: o.jobId,
    sessionKey: o.jobId || o.documentId || "reader",
    onJump: j,
    onClose: O
  }), [O, j, o.documentId, o.jobId]), me = x((H) => {
    const J = H.pane === "translated" && !P ? "translated" : "source";
    u(H), c("ai"), l(J), e.clearSelection();
  }, [e.clearSelection, P]), le = Z(() => ({
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
    aiNotes: (L == null ? void 0 : L.notes) ?? _l,
    activeAiNoteId: (W == null ? void 0 : W.note.id) ?? null,
    onSelectAiNote: Q,
    readerMetadata: o.readerMetadata,
    activeRegion: e.activeRegion,
    onSelectRegion: e.selectRegion,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: P,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: V, close: O }
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
    P,
    e.download,
    e.goToPage,
    V,
    O
  ]), Ee = Z(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), Oe = [
    ts,
    `is-workspace-${_}`,
    p ? "is-assistant-open" : "",
    y.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ h(ji, { value: le, hud: Ee, children: /* @__PURE__ */ N("div", { className: Oe, "data-reader-engine": "react-pdf", "data-reader-workspace": _, children: [
    /* @__PURE__ */ h(Wc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ N("div", { className: "reader-chrome-tray", children: [
      /* @__PURE__ */ h(ol, {}),
      /* @__PURE__ */ h(fi, { onBeforeClose: o.prepareClose })
    ] }),
    /* @__PURE__ */ h(
      Gi,
      {
        mode: w,
        documentReady: !!o.jobId,
        sourceViewOnly: P,
        onModeChange: U,
        liveTranslation: v ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m((H) => !H)
        } : null,
        compareDegraded: y.compareDegradedByAssistant,
        onRestoreCompare: O
      }
    ),
    /* @__PURE__ */ h(
      tc,
      {
        active: s,
        badges: { notes: S.count, "ai-notes": (L == null ? void 0 : L.notes.length) ?? 0 }
      }
    ),
    p ? /* @__PURE__ */ h(Uc, {}) : null,
    /* @__PURE__ */ h(Wi, { paneComposition: y, markdownSplit: R.open, assistantSplit: p, liveTranslation: e.liveTranslation, sourcePaneAction: K }),
    e.showHud ? /* @__PURE__ */ h(
      al,
      {
        mode: w,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ N(ko, { fallback: null, children: [
      F.mounted ? /* @__PURE__ */ h(Cl, { open: F.open, jobId: o.jobId, documentId: o.documentId, onClose: O, onJumpPage: e.goToPage }) : null,
      Xr.map((H) => /* @__PURE__ */ h(
        Sl,
        {
          panel: H,
          active: s,
          context: oe
        },
        H.id
      )),
      R.mounted ? /* @__PURE__ */ h(Ll, { open: R.open, jobId: o.jobId, sourceOnly: e.sourceOnly, side: "right", onClose: O }) : null,
      I.mounted ? /* @__PURE__ */ h(xl, { open: I.open, jobId: o.jobId, documentId: o.documentId, sessionIdentity: o.sessionIdentity, side: "right", selectionContext: d, onClearSelectionContext: () => u(null), onClose: O, onJumpCitation: j, onDocumentCommitted: Y }, o.documentId || o.jobId || "reader-ai-pending") : null
    ] }),
    W ? /* @__PURE__ */ h(
      wl,
      {
        note: W.note,
        anchorRect: W.rect,
        onJump: j,
        onClose: te
      }
    ) : null,
    /* @__PURE__ */ h(
      kl,
      {
        open: C.open,
        doc: L,
        onClose: O,
        onJump: j
      }
    ),
    /* @__PURE__ */ h(
      Hc,
      {
        open: T.open,
        groups: S.groups,
        count: S.count,
        onClose: O,
        onJump: k,
        onUpdateNote: S.updateNote,
        onRemove: S.remove,
        onExport: z
      }
    ),
    /* @__PURE__ */ h(Gc, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: me, onAddNote: E }),
    /* @__PURE__ */ h(vl, {})
  ] }) });
}
function ld() {
  return /* @__PURE__ */ h(Ol, {});
}
export {
  un as A,
  ld as R,
  Ol as a,
  Nn as b,
  cd as c,
  td as d,
  ed as e,
  id as f,
  rd as g,
  nd as h,
  od as i,
  sd as j,
  ad as r
};
//# sourceMappingURL=ReaderApp-BMCbtPv6.js.map
