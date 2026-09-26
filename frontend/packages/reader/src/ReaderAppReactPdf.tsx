// 从 frontend/web 迁入的 React-pdf 视图真值，现为 @retainpdf/reader 主入口
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReaderReactController } from "./hooks/use-reader-react-controller.js";
import { useReaderKeyboard } from "./hooks/use-reader-keyboard.js";
import {
  ReaderAssistantSplitResizeHandle,
  ReaderAssistantDock,
  ReaderCloseHome,
  ReaderWorkspaceTabs,
  ReaderReactBoot,
  ReaderCompareGrid,
  ReaderZoomHud,
  ReaderDownloadActions,
  ReaderSelectionToolbar,
} from "./components/react-pdf/index.js";
import type { ReaderAssistantPanel, ReaderWorkspaceMode } from "./components/react-pdf/index.js";
import { useReaderAssistantPanel } from "./hooks/use-reader-assistant-panel.js";
import { DownloadToastHost } from "./shared/react/DownloadToastHost.jsx";
import { READER_ROOT_CLASS } from "./pdf/reader-dom-contract.js";
import {
  loadReaderViewState,
  saveReaderViewState,
} from "./shared/state/reader-view-state.js";
import { readerSelectionPrompt } from "./shared/data/reader-regions.js";
import type { ReaderSelection } from "./shared/data/reader-regions.js";
import {
  ReaderProvider,
  type ReaderContextValue,
  type ReaderHudContextValue,
} from "./components/react-pdf/reader-context.js";

const ReaderMarkdownPanel = lazy(() => import("./components/react-pdf/ReaderMarkdownPanel.js").then((m) => ({ default: m.ReaderMarkdownPanel })));

import { useReaderPanelSlot } from "./components/react-pdf/use-reader-panel-slot.js";
import { ReaderHostPanelShell } from "./components/react-pdf/ReaderHostPanelShell.js";

/** 稳定的空数组：每次渲染新建一个会让每页的标记层白白重算。 */
import { READER_HOST_PANELS } from "./components/react-pdf/reader-host-panels.js";
import { resolveLiveTranslationToggles } from "./shared/data/live-translation-state.js";

/** 阅读视图可见台面的判别联合。 */
export type ReaderPaneComposition = {
  /**
   * 台面形态（单一真源）：
   * - source-only：单栏原文；
   * - translated-only：仅译文（右栏语义）；
   * - final-compare：左源右最终译文的并排；
   * - live-overlay：源栏原文 + 流式实时译文叠加（对照态保留右栏最终译文）。
   */
  kind: "source-only" | "translated-only" | "final-compare" | "live-overlay";
  /** 顶栏页签 / 键盘 / HUD 使用的可见 PDF 模式 */
  visibleMode: "source" | "compare" | "translated";
  compareMode: boolean;
  showSource: boolean;
  showTranslated: boolean;
  /**
   * 单一真值：是否把流式实时译文叠加到原文 PDF 上（Grid 消费）。
   * 仅在实时译文可用（最终译文 PDF 未就绪）时为 true；最终就绪后恒为 false。
   */
  overlayOnSource: boolean;
  /** 无 job：FAB / Markdown / AI 等「需要任务」能力判定 */
  sourceOnly: boolean;
  /** 无可并排的最终译文 (sourceOnly || !translatedUrl)：页签禁用判定 */
  sourceViewOnly: boolean;
  /**
   * 对照被辅助面板降级成了单栏。**顶栏必须就此说话。**
   *
   * 实测（1440 宽、有译文的书、开终端）：右栏从 720px 塌成 0，顶栏选中项从
   * 「对照」跳到「源文件」，全程没有一个字解释。用户看到的是「开个终端，译文
   * 没了」，而终端和译文毫无关系。关掉面板它又自己回来 —— 更像坏了。
   */
  compareDegradedByAssistant: boolean;
};

/**
 * 单一纯函数，从 session.mode、实时译文可用/可见、助手开合与译文产物派生
 * 可见台面。原先散落在 app 的实时对照 / visiblePdfMode /
 * resolveReaderGridPresentation 全部收口到这里，Grid/Tabs/键盘/HUD 只消费结果。
 *
 * liveTranslationVisible 只作为「用户是否想开实时译文」的用户意图（默认关）：
 * 源栏按钮切换后，实时译文直接叠加在原文 PDF 上（overlayOnSource）；
 * overlayContentAvailable 表示「有可叠加的流式译文内容」（进行中或已完成都成立）。
 * 默认不叠加，避免旧「左右都是中文」的自动叠加 bug。
 */
export function resolveReaderPaneComposition(input: {
  mode: "source" | "compare" | "translated";
  sourceOnly: boolean;
  translatedUrl: string;
  overlayContentAvailable: boolean;
  liveTranslationVisible: boolean;
  assistantOpen: boolean;
  assistantPdfPane?: "source" | "translated" | null;
}): ReaderPaneComposition {
  const sourceViewOnly = input.sourceOnly || !input.translatedUrl;
  // 单一真值：仅「有可叠加译文内容且用户主动开启且无助手接管」时，
  // 在当前原文 PDF 上叠加流式译文。
  const overlayOnSource = Boolean(
    input.overlayContentAvailable
    && input.liveTranslationVisible
    && !input.assistantOpen,
  );
  // AI 从某栏选区发起时锁定该栏；否则助手分栏把对照降级为单栏原文。
  const pdfMode = input.assistantPdfPane
    || (input.assistantOpen && input.mode === "compare" ? "source" : input.mode);
  const visibleMode = pdfMode;
  // 对照态叠加不再「消栏」：overlay 只在源栏叠加流式画布，右栏（最终译文）
  // 照常保留。compareMode / showTranslated 不再被 overlay 强制关闭。
  const compareMode = visibleMode === "compare";
  const showSource = overlayOnSource || visibleMode !== "translated";
  const showTranslated = visibleMode === "translated" || visibleMode === "compare";
  // 降级发生在「会话想要对照，可见台面却不是对照」时。assistantPdfPane 锁栏
  // （从选区问 AI）也算 —— 那条路同样会让右栏无声消失。
  const compareDegradedByAssistant = input.mode === "compare" && visibleMode !== "compare";
  const kind: ReaderPaneComposition["kind"] = overlayOnSource
    ? "live-overlay"
    : visibleMode === "compare"
      ? "final-compare"
      : visibleMode === "translated"
        ? "translated-only"
        : "source-only";
  return {
    kind,
    visibleMode,
    compareMode,
    showSource,
    showTranslated,
    overlayOnSource,
    sourceOnly: input.sourceOnly,
    sourceViewOnly,
    compareDegradedByAssistant,
  };
}

/**
 * 切换工作区页签时，是否自动开关实时译文叠加。
 * - 切到对照：仅在“实时译文真正可用（最终译文 PDF 未就绪）”时自动打开。
 *   任务完成后即使残留已提交的实时页，也不得自动选中「实时译文 · 已完成」。
 * - 离开对照（原文/译文）：关闭，回到页签自身的显示。
 * 返回 null 表示保持用户当前选择不动。
 */
export function resolveLiveTranslationVisibleOnWorkspaceChange(
  next: ReaderWorkspaceMode,
  liveTranslationAvailable: boolean,
): boolean | null {
  if (next === "compare") {
    return liveTranslationAvailable ? true : null;
  }
  return false;
}

export function ReaderAppReactPdf() {
  const c = useReaderReactController();
  const { boot, panes, sessionFiles, session } = c;
  // 「开着哪个面板」的恢复 / 持久化整段在 use-reader-assistant-panel 里 ——
  // 那是 effect 顺序的事，只有真渲染才测得到，所以单独成 hook 好被真渲染。
  const assistant = useReaderAssistantPanel(c.viewStateKey);
  const assistantPanel = assistant.panel;
  const setAssistantPanel = assistant.setPanel;
  const [assistantPdfPane, setAssistantPdfPane] = useState<"source" | "translated" | null>(null);
  // 选区要送进终端的那段文字。token 每次自增，宿主据此判断「这是新的一次注入」
  // —— 不能拿文本本身判重，连着两次选同一段也得送两次。
  const [terminalPrefill, setTerminalPrefill] =
    useState<{ text: string; token: number } | null>(null);
  const [liveTranslationVisible, setLiveTranslationVisible] = useState(false);
  const modeScopeRef = useRef<string | null>(null);

  const assistantOpen = assistantPanel !== null;
  // 是否有「可叠加到原文 PDF 上的流式译文内容」：进行中（available）或已完成
  // （实时页仍在 state 里）都成立，供源栏开关显示与叠加判定。
  const hasOverlayContent = c.liveTranslationAvailable
    || c.liveTranslation.pagesByPage.size > 0;
  // 可见台面唯一真源：Grid / Tabs / 键盘 / HUD 都从这里取。
  const paneComposition = resolveReaderPaneComposition({
    mode: c.mode,
    sourceOnly: c.sourceOnly,
    translatedUrl: sessionFiles.translatedUrl,
    overlayContentAvailable: hasOverlayContent,
    liveTranslationVisible,
    assistantOpen,
    assistantPdfPane,
  });
  // 叠层的两个开关分别摆在哪 —— 判断在 live-translation-state.ts 里，因为
  // 「收掉顶栏 pill 之后叠层还够得着吗」这个不变式要能单测（见那里的注释）。
  const liveToggles = resolveLiveTranslationToggles({
    hasOverlayContent,
    connection: c.liveTranslation.connection,
    showSource: paneComposition.showSource,
  });
  const sourceViewOnly = paneComposition.sourceViewOnly;
  const visiblePdfMode = paneComposition.visibleMode;
  // 换文档（或 viewStateKey 迁移）时丢掉上一本书的选区上下文。
  //
  // 这里原来还有一行 `setLiveTranslationVisible(true)`，它让上面那个
  // `useState(false)` 成了死初值 —— 挂载时就跑，而且 viewStateKey 每迁一次就
  // 再跑一次，连「任务到终态自动取消叠加」都能被它翻回来。和
  // resolveReaderPaneComposition 头上写的「默认不叠加，避免旧『左右都是中文』
  // 的自动叠加 bug」直接矛盾，删掉才是那段注释说的行为。
  // 需要自动打开的那一处走 resolveLiveTranslationVisibleOnWorkspaceChange。
  useEffect(() => {
    setTerminalPrefill(null);
    setLiveTranslationVisible(false);
  }, [c.viewStateKey]);

  // 任务到终态后自动取消「实时译文」选中：终态应回到最终译文 PDF / 对照，
  // 不应默认停留在实时叠加态（用户仍可手动再点开）。
  useEffect(() => {
    if (c.session.jobTerminal) setLiveTranslationVisible(false);
  }, [c.session.jobTerminal]);

  // 栏锁（从某栏的选区问 AI）也是按 scope 作废的：换了书那一栏就不是那一栏了。
  useEffect(() => {
    setAssistantPdfPane(null);
  }, [assistant.scope]);

  // 阅读模式恢复/持久化：与 anchor/zoom 对齐。sourceViewOnly 时只允许 source。
  useEffect(() => {
    if (boot.loading || boot.failed) return;
    if (modeScopeRef.current !== c.viewStateKey) {
      modeScopeRef.current = c.viewStateKey;
      const saved = loadReaderViewState(c.viewStateKey);
      const target = sourceViewOnly ? "source" : saved?.mode;
      if (target && target !== c.mode) {
        c.setModeKeepingPage(target);
      }
      return;
    }
    saveReaderViewState(c.viewStateKey, { mode: c.mode });
  }, [boot.failed, boot.loading, c.mode, c.setModeKeepingPage, c.viewStateKey, sourceViewOnly]);
  const workspaceView = assistantPanel || (c.mode === "compare" ? "compare" : "reading");
  // 五个包内面板的开合 —— 每个 id 只在这里写一次，open 和挂载闸都从它派生。
  // 原来是「闸一遍、open 一遍」，两处各自合法，抄改时把闸上那个写成别的面板
  // 整套测试全绿而摘录永远打不开。见 use-reader-panel-slot.ts。
  const markdownSlot = useReaderPanelSlot(assistantPanel, "markdown");
  // 槽位面板（阅读路径 / 画布 / 终端）的挂载、适配器查找和壳都在
  // ReaderHostPanelShell 里，按 READER_HOST_PANELS 逐个渲染 —— 见下面那段 map。
  // 键盘与 UI 共用同一「可见模式」真源：paneComposition.visibleMode。
  // 「0」重置缩放据此取模式默认，避免与 HUD/网格显示的模式脱节。
  useReaderKeyboard({
    mode: visiblePdfMode,
    sourceOnly: c.sourceOnly,
    setMode: c.setModeKeepingPage,
    userZoom: c.userZoom,
    onZoomChange: c.onZoomChange,
    currentPage: c.currentPage,
    numPages: panes.hudNumPages,
    goToPage: c.goToPage,
    enabled: c.showHud,
  });
  const closeAssistant = useCallback(() => {
    setAssistantPanel(null);
    setAssistantPdfPane(null);
    setTerminalPrefill(null);
  }, []);
  const changeWorkspace = useCallback((next: ReaderWorkspaceMode) => {
    setAssistantPdfPane(null);
    // A running translation can provide the compare workspace before the
    // immutable translated PDF exists. Keep the visible workspace and the
    // top-bar selection in sync instead of asking the session mode (which is
    // correctly source-only until the final artifact arrives) to represent
    // this temporary live pair.
    const autoEnable = resolveLiveTranslationVisibleOnWorkspaceChange(next, c.liveTranslationAvailable);
    if (autoEnable !== null) setLiveTranslationVisible(autoEnable);
    c.setModeKeepingPage(next);
  }, [c.liveTranslationAvailable, c.setModeKeepingPage]);

  // 源栏「译文」开关：把流式译文直接叠在原文 PDF 上 / 收起。进行中与完成后
  // 都可用（只要有可叠加内容）。默认关，避免自动叠加造成「左右都中文」。
  const sourcePaneAction = useMemo(() => {
    if (!liveToggles.sourcePaneToggle) return null;
    return (
      <button
        type="button"
        className={`reader-live-translation-toggle${liveTranslationVisible ? " is-active" : ""}`}
        onClick={() => setLiveTranslationVisible((visible) => !visible)}
        aria-pressed={liveTranslationVisible}
        title={liveTranslationVisible ? "隐藏实时译文" : "在原文 PDF 上叠加实时译文"}
      >
        译文
      </button>
    );
  }, [liveToggles.sourcePaneToggle, liveTranslationVisible]);

  const selectAssistant = useCallback((next: ReaderAssistantPanel) => {
    setAssistantPanel(next);
  }, []);

  const hostPanelContext = useMemo(() => ({
    sessionKey: session.jobId || session.documentId || "reader",
    pendingInput: terminalPrefill,
    onClose: closeAssistant,
  }), [closeAssistant, session.documentId, session.jobId, terminalPrefill]);

  /** 从选区问 AI —— 现在唯一的 AI 入口是终端里的 agent。
   *
   * 送进去但**不回车**：让 agent 直接跑一条由页面选区拼出来的命令太意外了，
   * 用户得先看见自己要问什么。栏锁照旧（从译文栏选的就把译文栏锁住），否则
   * 助手分栏会把你正看的那栏挤掉。
   */
  const askSelectedRegion = useCallback((selection: ReaderSelection) => {
    const pdf = selection.pane === "translated" && !sourceViewOnly
      ? "translated"
      : "source";
    const prompt = readerSelectionPrompt(selection);
    setTerminalPrefill((prev) => ({ text: prompt, token: (prev?.token ?? 0) + 1 }));
    setAssistantPanel("terminal");
    setAssistantPdfPane(pdf);
    c.clearSelection();
  }, [c.clearSelection, sourceViewOnly]);

  // 外壳 Context：只装频繁下钻、且此前纯透传的值；currentPage/numPages 走 HUD
  // context，避免滚动带动整棵外壳重渲染。
  const readerContext = useMemo<ReaderContextValue>(() => ({
    bindShell: c.shell.bindShell,
    shellEl: c.shell.shellEl,
    shellWidth: c.shell.shellWidth,
    userZoom: c.userZoom,
    onZoomChange: c.onZoomChange,
    rowHeights: c.rowHeights,
    mountSource: c.panes.mountSource,
    mountTranslated: c.panes.mountTranslated,
    onMetrics: c.panes.onMetrics,
    onNumPagesChange: c.panes.onNumPages,
    sourceUrl: c.sessionFiles.sourceUrl,
    translatedUrl: c.sessionFiles.translatedUrl,
    sourceFile: c.sessionFiles.sourceFile,
    translatedFile: c.sessionFiles.translatedFile,
    regions: session.regions,
    readerMetadata: session.readerMetadata,
    activeRegion: c.activeRegion,
    onSelectRegion: c.selectRegion,
    sourceOnly: c.sourceOnly,
    sourceViewOnly,
    download: c.download,
    goToPage: c.goToPage,
    assistant: { select: selectAssistant, close: closeAssistant },
  }), [
    c.shell,
    c.userZoom,
    c.onZoomChange,
    c.rowHeights,
    c.panes,
    c.sessionFiles,
    session.regions,
    session.readerMetadata,
    c.activeRegion,
    c.selectRegion,
    c.sourceOnly,
    sourceViewOnly,
    c.download,
    c.goToPage,
    selectAssistant,
    closeAssistant,
  ]);

  const readerHud = useMemo<ReaderHudContextValue>(() => ({
    currentPage: c.currentPage,
    numPages: panes.hudNumPages,
  }), [c.currentPage, panes.hudNumPages]);

  const rootClasses = [
    READER_ROOT_CLASS,
    `is-workspace-${workspaceView}`,
    assistantOpen ? "is-assistant-open" : "",
    paneComposition.overlayOnSource ? "is-live-translation-overlay" : "",
  ].filter(Boolean).join(" ");

  return (
    <ReaderProvider value={readerContext} hud={readerHud}>
      <div className={rootClasses} data-reader-engine="react-pdf" data-reader-workspace={workspaceView}>
        <ReaderReactBoot loading={boot.loading} failed={boot.failed} text={boot.text} percent={boot.percent} regionsError={Boolean(session.readerErrors.regions)} metadataError={Boolean(session.readerErrors.metadata)} />
        {/* 三路下载和「关闭回主页」同一组：顶栏常驻，任何面板开着都够得到。
            原来它们在可拖动圆钮的菜单里，而圆钮一开 dock 就被 CSS 整个吃掉。 */}
        <div className="reader-chrome-tray">
          <ReaderDownloadActions />
          <ReaderCloseHome onBeforeClose={session.prepareClose} />
        </div>
        <ReaderWorkspaceTabs
          mode={visiblePdfMode}
          documentReady={Boolean(session.jobId)}
          sourceViewOnly={sourceViewOnly}
          onModeChange={changeWorkspace}
          liveTranslation={liveToggles.topBarPill ? {
            visible: liveTranslationVisible,
            state: c.liveTranslation,
            onToggle: () => setLiveTranslationVisible((visible) => !visible),
          } : null}
          compareDegraded={paneComposition.compareDegradedByAssistant}
          onRestoreCompare={closeAssistant}
        />
        <ReaderAssistantDock active={assistantPanel} />
        {assistantOpen ? <ReaderAssistantSplitResizeHandle /> : null}
        <ReaderCompareGrid paneComposition={paneComposition} markdownSplit={markdownSlot.open} assistantSplit={assistantOpen} liveTranslation={c.liveTranslation} sourcePaneAction={sourcePaneAction} />
        {c.showHud ? (
          <ReaderZoomHud
            mode={visiblePdfMode}
            modeControls={null}
          />
        ) : null}
        <Suspense fallback={null}>
          {READER_HOST_PANELS.map((panel) => (
            <ReaderHostPanelShell
              key={panel.id}
              panel={panel}
              active={assistantPanel}
              context={hostPanelContext}
            />
          ))}
          {markdownSlot.mounted ? <ReaderMarkdownPanel open={markdownSlot.open} jobId={session.jobId} sourceOnly={c.sourceOnly} side="right" onClose={closeAssistant} /> : null}
        </Suspense>
        <ReaderSelectionToolbar selection={c.selection} onDismiss={c.clearSelection} onAskAi={askSelectedRegion} />
        <DownloadToastHost />
      </div>
    </ReaderProvider>
  );
}
