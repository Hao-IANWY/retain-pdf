import { setReaderAiConfigAdapters } from "./shared/ai/config.js";
import {
  resetAnswerEnhanceAdapters,
  setAnswerEnhanceAdapters,
} from "./shared/ai/answer-enhance.js";
import type { createReaderDataPort } from "./runtime/data.js";
import type { createReaderPageConfigPort } from "./runtime/config.js";
import type {
} from "./shared/types/types.js";
import type { askLibraryAi } from "@retainpdf/api/ai";
import type { ReactNode } from "react";
import type { ReaderLiveTranslationPort } from "./contracts/live-translation.js";
import type { ReaderPdfPort } from "./contracts/pdf.js";
import type { ReaderSessionDataPort } from "./contracts/session.js";
import type { ReaderAgentOperationPort } from "./contracts/ai-operations.js";
import type { ReaderConversationPort } from "./contracts/conversations.js";
import type { ReaderAskPort } from "./contracts/ai-chat.js";
export {
  hasMarkdownContent,
  loadMarkdownPayloadWithFallback,
  normalizeMarkdownPayload,
} from "./shared/data/markdown-payload.js";

// frontend/packages/reader 对宿主环境的唯一契约（取代 frontend/web/src/pages/reader/external.ts）
// 扩展：将 external 的 20+ 符号收敛为可注入能力，逐步替换直接 import
export type ReaderSessionAdapters = {
  // 细粒度：保留旧 external 的关键能力以便渐进迁移
  isMockMode?: () => boolean;
  resolveResourceUrl?: (url: string) => string;
  fetchProtected?: typeof fetch;
  resolvePdfjsVendorUrl?: (relativePath?: string) => string;
  // 形状直接取自包内 runtime 工厂签名，宿主漏注入/结构漂移在 tsc 阶段暴露。
  defaultReaderDataPort?: ReturnType<typeof createReaderDataPort>;
  defaultReaderPageConfigPort?: ReturnType<typeof createReaderPageConfigPort>;
  resolveReaderAnchor?: (...args: any[]) => any;
  resolveReaderDocumentId?: () => string;
  resolveReaderJobId?: () => string;
  resolveReaderArtifactUrl?: (...args: any[]) => string;
  resolveReaderSourcePdf?: (...args: any[]) => any;
  resolveReaderTranslatedPdfUrl?: (...args: any[]) => string;
  /** Optional during migration; hosts without live translation remain supported. */
  liveTranslation?: ReaderLiveTranslationPort;
  /** Optional during migration; legacy flat fields remain supported. */
  pdf?: ReaderPdfPort;
  /** Optional during migration; legacy data/runtime fields remain supported. */
  sessionData?: ReaderSessionDataPort;
  /** Optional during migration; assistant operation UI uses an unavailable fallback. */
  aiOperations?: ReaderAgentOperationPort;
  /** Optional during migration; legacy conversation exports remain available. */
  conversations?: ReaderConversationPort;
  /** Optional during migration; assistant displays the existing unavailable state without it. */
  askChat?: ReaderAskPort;
};
export type ReaderMarkdownAdapters = {
  resolveMarkdownAssetUrl: (imagesBaseUrl: unknown, relativePath: unknown) => string;
};
export type ReaderDownloadContext = {
  jobId?: string;
  jobPayload?: unknown;
  manifestPayload?: unknown;
};
export type ReaderDownloadUrls = {
  source: string;
  sideBySide: string;
  translated: string;
};
export type ReaderDownloadAdapters = {
  resolveReaderDownloadUrls: (context?: ReaderDownloadContext) => ReaderDownloadUrls;
  resolveReaderDownloadName: (action: string, context: ReaderDownloadContext) => string;
  downloadProtectedResource: (
    fetchProtected: typeof fetch,
    url: string,
    fallbackName: string,
    preferredName?: string,
    onStatus?: ((status: unknown) => void) | null,
    onBusy?: ((busy: boolean, status?: string) => void) | null,
  ) => Promise<unknown>;
  failDownloadToast: (message?: string) => void;
};
/** 文档身份查询。原来这块叫 ReaderFavoritesAdapters —— 收藏删掉之后只剩这两项，
 * 而它们是「按 jobId 反查文档」这件事，跟收藏无关。 */
export type ReaderDocumentIdentityAdapters = {
  apiPrefix?: string;
  fetchDocumentByJobId: (apiPrefix: string, jobId: string) => Promise<{
    document_id?: string;
    active_job_id?: string | null;
    active_version_id?: string | null;
  } | null>;
};
export type ReaderCredentialsPort = {
  getCredentials?: () => { modelApiKey?: string } | null;
};
export type ReaderCredentialsAdapters = {
  credentialsPort: ReaderCredentialsPort;
};
export type ReaderAiAdapters = {
  /** Canonical /ai/ask client supplied by the host (SSE + credentials). */
  askDocumentAi: (
    options: Parameters<typeof askLibraryAi>[0],
  ) => ReturnType<typeof askLibraryAi>;
};
/** 宿主往辅助面板里塞一块自己的 UI 时拿到的东西。 */
export type ReaderTerminalSlotProps = {
  open: boolean;
  /** 同一个 key 接回同一份终端会话。用 jobId，换文档就换终端。 */
  sessionKey: string;
  onClose: () => void;
};

/** 宿主渲染阅读路径面板时拿到的东西。
 *
 * `onJump` 是包给的：锚点怎么变成翻页+高亮是阅读器的事，宿主只管在用户点某一步
 * 时把锚点递回来。宿主自己去实现跳转会和包的分栏/模式状态打架。
 */
export type ReaderReadingPathSlotProps = {
  open: boolean;
  jobId: string;
  onJump: (anchor: { page_idx?: number; block_id?: string }) => void;
  onClose: () => void;
};

export type ReaderReadingPathAdapters = {
  /** 阅读路径面板由宿主渲染 —— 数据来自 RetainPDF 的 API，包不认识那个端点。
   *
   * 和终端槽位同一个道理：包决定它在 dock 里的位置和生命周期，内容宿主给。
   * 不提供 = 这个 tab 不出现。
   */
  renderReaderReadingPath?: (props: ReaderReadingPathSlotProps) => ReactNode;
};

export type ReaderReadingCanvasAdapters = {
  /** 阅读路径的画布视图。和 renderReaderReadingPath 是同一份数据的两个渲染器 ——
   * 列表看顺序，画布看空间关系。分成两个槽位而不是一个带模式开关，是因为画布
   * 依赖很重（tldraw），要能单独懒加载。
   */
  renderReaderReadingCanvas?: (props: ReaderReadingPathSlotProps) => ReactNode;
};

export type ReaderTerminalAdapters = {
  /** 终端面板由**宿主**渲染。
   *
   * 本包不认识终端用什么渲染，也不认识它连到哪 —— 那是 RetainPDF 应用的东西，
   * 而这个包要能被别的宿主用。所以这里只留一个槽：包决定它在 dock 里的位置和
   * 生命周期，内容宿主给。
   *
   * 不提供 = 这个 tab 在 dock 里根本不出现。留一个点了没反应的 tab 比没有
   * 这个功能更糟。
   */
  renderReaderTerminal?: (props: ReaderTerminalSlotProps) => ReactNode;
};

export type ReaderAdapters = ReaderSessionAdapters
  & ReaderMarkdownAdapters
  & ReaderDownloadAdapters
  & ReaderDocumentIdentityAdapters
  & ReaderCredentialsAdapters
  & ReaderAiAdapters
  & ReaderTerminalAdapters
  & ReaderReadingPathAdapters
  & ReaderReadingCanvasAdapters;

/**
 * ReaderAdapters 声明键的运行时镜像（TS 类型在运行时被擦除）。
 * 注册层与门禁测试共用，避免手工复制字段集漂移；`satisfies` 保证不引入拼错键。
 * 完整性由紧随其后的编译期断言守护。
 */
export const READER_ADAPTER_KEYS = [
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
  "renderReaderReadingPath",
  "renderReaderReadingCanvas",
] as const satisfies readonly (keyof ReaderAdapters)[];

/** 必填（非 `?`）适配键子集，供门禁断言最小注入面。 */
export const READER_REQUIRED_ADAPTER_KEYS = [
  "resolveMarkdownAssetUrl",
  "resolveReaderDownloadUrls",
  "resolveReaderDownloadName",
  "downloadProtectedResource",
  "failDownloadToast",
  "fetchDocumentByJobId",
  "credentialsPort",
  "askDocumentAi",
] as const satisfies readonly (keyof ReaderAdapters)[];

type RequiredAdapterKey = {
  [K in keyof ReaderAdapters]: undefined extends ReaderAdapters[K] ? never : K;
}[keyof ReaderAdapters];

// 编译期守护：声明新增/删除字段时，上面两个运行时数组必须同步。
const _adapterKeysComplete: Exclude<
  keyof ReaderAdapters,
  (typeof READER_ADAPTER_KEYS)[number]
> extends never ? true : false = true;
const _requiredKeysCovered: Exclude<
  RequiredAdapterKey,
  (typeof READER_REQUIRED_ADAPTER_KEYS)[number]
> extends never ? true : false = true;
void _adapterKeysComplete;
void _requiredKeysCovered;

// 全局注入注册（monorepo 内由 frontend/web 在启动时 set）
let _adapters: ReaderAdapters | null = null;
export function setReaderAdapters(a: ReaderAdapters | null) {
  _adapters = a;
  setReaderAiConfigAdapters({ credentialsPort: a?.credentialsPort ?? null });
  resetAnswerEnhanceAdapters();
  if (a) {
    setAnswerEnhanceAdapters({
      fetchProtected: a.fetchProtected,
      resolveResourceUrl: a.resolveResourceUrl,
    });
  }
}
export function getReaderAdapters(): ReaderAdapters | null { return _adapters; }
export function requireAdapter<T extends keyof ReaderAdapters>(key: T): NonNullable<ReaderAdapters[T]> {
  const v = _adapters?.[key];
  if (v == null) throw new Error(`Reader adapter missing: ${String(key)} (call setReaderAdapters)`);
  return v as NonNullable<ReaderAdapters[T]>;
}
