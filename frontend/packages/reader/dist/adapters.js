import { s as a } from "./config-CgaWliJ_.js";
import { s as t, r as d } from "./answer-enhance-3YjrVVwj.js";
import { h as P, l as v, n as w } from "./markdown-payload-kK3ewW_I.js";
const n = [
  "isMockMode",
  "resolveResourceUrl",
  "fetchProtected",
  "resolvePdfjsVendorUrl",
  "defaultReaderDataPort",
  "defaultReaderPageConfigPort",
  "resolveReaderAnchor",
  "resolveReaderDocumentId",
  "resolveReaderJobId",
  "resolveReaderArtifactUrl",
  "resolveReaderSourcePdf",
  "resolveReaderTranslatedPdfUrl",
  "liveTranslation",
  "pdf",
  "sessionData",
  "resolveMarkdownAssetUrl",
  "resolveReaderDownloadUrls",
  "resolveReaderDownloadName",
  "downloadProtectedResource",
  "failDownloadToast",
  "apiPrefix",
  "fetchDocumentByJobId",
  "credentialsPort",
  "renderReaderTerminal"
], c = [
  "resolveMarkdownAssetUrl",
  "resolveReaderDownloadUrls",
  "resolveReaderDownloadName",
  "downloadProtectedResource",
  "failDownloadToast",
  "fetchDocumentByJobId",
  "credentialsPort"
];
let r = null;
function R(e) {
  r = e, a({ credentialsPort: (e == null ? void 0 : e.credentialsPort) ?? null }), d(), e && t({
    fetchProtected: e.fetchProtected,
    resolveResourceUrl: e.resolveResourceUrl
  });
}
function i() {
  return r;
}
function f(e) {
  const o = r == null ? void 0 : r[e];
  if (o == null) throw new Error(`Reader adapter missing: ${String(e)} (call setReaderAdapters)`);
  return o;
}
export {
  n as READER_ADAPTER_KEYS,
  c as READER_REQUIRED_ADAPTER_KEYS,
  i as getReaderAdapters,
  P as hasMarkdownContent,
  v as loadMarkdownPayloadWithFallback,
  w as normalizeMarkdownPayload,
  f as requireAdapter,
  R as setReaderAdapters
};
//# sourceMappingURL=adapters.js.map
