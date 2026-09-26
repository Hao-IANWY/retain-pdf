import { s as a } from "./config-CgaWliJ_.js";
import { s as t, r as s } from "./answer-enhance-D8zK9znw.js";
import { h as P, l as v, n as D } from "./markdown-payload-kK3ewW_I.js";
const l = [
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
  "aiOperations",
  "conversations",
  "askChat",
  "resolveMarkdownAssetUrl",
  "resolveReaderDownloadUrls",
  "resolveReaderDownloadName",
  "downloadProtectedResource",
  "failDownloadToast",
  "apiPrefix",
  "fetchDocumentByJobId",
  "credentialsPort",
  "askDocumentAi",
  "renderReaderTerminal",
  "renderReaderReadingMap"
], c = [
  "resolveMarkdownAssetUrl",
  "resolveReaderDownloadUrls",
  "resolveReaderDownloadName",
  "downloadProtectedResource",
  "failDownloadToast",
  "fetchDocumentByJobId",
  "credentialsPort",
  "askDocumentAi"
];
let r = null;
function i(e) {
  r = e, a({ credentialsPort: (e == null ? void 0 : e.credentialsPort) ?? null }), s(), e && t({
    fetchProtected: e.fetchProtected,
    resolveResourceUrl: e.resolveResourceUrl
  });
}
function R() {
  return r;
}
function f(e) {
  const o = r == null ? void 0 : r[e];
  if (o == null) throw new Error(`Reader adapter missing: ${String(e)} (call setReaderAdapters)`);
  return o;
}
export {
  l as READER_ADAPTER_KEYS,
  c as READER_REQUIRED_ADAPTER_KEYS,
  R as getReaderAdapters,
  P as hasMarkdownContent,
  v as loadMarkdownPayloadWithFallback,
  D as normalizeMarkdownPayload,
  f as requireAdapter,
  i as setReaderAdapters
};
//# sourceMappingURL=adapters.js.map
