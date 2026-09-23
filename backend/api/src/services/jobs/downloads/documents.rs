use crate::error::AppError;
use crate::models::domain::JobSnapshot;
use crate::storage_paths::{
    resolve_ai_canvas, resolve_ai_notes, resolve_ai_reading_path, resolve_normalization_report, resolve_normalized_document,
    resolve_output_pdf,
};

use super::ai_carryover::carry_over_ai_workspace;
use super::pdf::linearized_pdf_or_original;
use super::{DownloadJobsDeps, FileDownload};

#[derive(Clone, Copy)]
pub(crate) enum DocumentDownloadKind {
    OutputPdf,
    NormalizedDocument,
    NormalizationReport,
    /// Agent 在 `<job>/ai/` 里写的阅读路径。和其它三个不同：它**不是流水线产
    /// 物**，可能不存在、可能是 agent 上一次写坏的。所以 404 是正常状态，
    /// 前端得当「还没有」处理，不是错误。
    AiReadingPath,
    /// Agent 在 `<job>/ai/` 里画的概念图。和 AiReadingPath 同一类：
    /// 非流水线产物，404 是正常状态。
    AiCanvas,
    /// Agent 标在 PDF 页面上的批注。和上面两个同一类：非流水线产物，
    /// 404 是正常状态。
    AiNotes,
}

impl DocumentDownloadKind {
    fn content_type(self) -> &'static str {
        match self {
            Self::OutputPdf => "application/pdf",
            Self::NormalizedDocument
            | Self::NormalizationReport
            | Self::AiReadingPath
            | Self::AiCanvas
            | Self::AiNotes => "application/json",
        }
    }

    fn not_ready_label(self) -> &'static str {
        match self {
            Self::OutputPdf => "pdf not ready",
            Self::NormalizedDocument => "normalized document not ready",
            Self::NormalizationReport => "normalization report not ready",
            Self::AiReadingPath => "reading path not generated yet",
            Self::AiCanvas => "canvas not generated yet",
            Self::AiNotes => "notes not generated yet",
        }
    }

    /// 是不是 agent 自己写的产物（而不是流水线产物）。
    ///
    /// 只有这几个需要在重译后做工作区接力 —— 流水线产物每个 job 各跑各的，
    /// 天然就该是新的。
    fn is_agent_artifact(self) -> bool {
        matches!(self, Self::AiReadingPath | Self::AiCanvas | Self::AiNotes)
    }

    fn resolve_path(
        self,
        job: &JobSnapshot,
        data_root: &std::path::Path,
    ) -> Option<std::path::PathBuf> {
        match self {
            Self::OutputPdf => resolve_output_pdf(job, data_root),
            Self::NormalizedDocument => resolve_normalized_document(job, data_root),
            Self::NormalizationReport => resolve_normalization_report(job, data_root),
            Self::AiReadingPath => resolve_ai_reading_path(job, data_root),
            Self::AiCanvas => resolve_ai_canvas(job, data_root),
            Self::AiNotes => resolve_ai_notes(job, data_root),
        }
    }
}

pub(super) fn document_download(
    deps: &DownloadJobsDeps<'_>,
    job: &JobSnapshot,
    kind: DocumentDownloadKind,
) -> Result<FileDownload, AppError> {
    let content_type = kind.content_type();
    // 解析路径**之前**接力：这几个端点在阅读页首屏就会被打，接力发生在用户
    // 看到空面板之前。
    if kind.is_agent_artifact() {
        carry_over_ai_workspace(deps.db, deps.data_root, job);
    }
    let path = kind.resolve_path(job, deps.data_root).ok_or_else(|| {
        AppError::not_found(format!("{}: {}", kind.not_ready_label(), job.job_id))
    })?;
    let path = if matches!(kind, DocumentDownloadKind::OutputPdf) {
        linearized_pdf_or_original(deps, job, &path, "output")?
    } else {
        path
    };
    Ok(FileDownload::new(path, content_type, None))
}
