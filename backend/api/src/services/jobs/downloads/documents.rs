use crate::error::AppError;
use crate::models::domain::JobSnapshot;
use crate::storage_paths::{
    resolve_ai_reading_path, resolve_normalization_report, resolve_normalized_document,
    resolve_output_pdf,
};

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
}

impl DocumentDownloadKind {
    fn content_type(self) -> &'static str {
        match self {
            Self::OutputPdf => "application/pdf",
            Self::NormalizedDocument
            | Self::NormalizationReport
            | Self::AiReadingPath => "application/json",
        }
    }

    fn not_ready_label(self) -> &'static str {
        match self {
            Self::OutputPdf => "pdf not ready",
            Self::NormalizedDocument => "normalized document not ready",
            Self::NormalizationReport => "normalization report not ready",
            Self::AiReadingPath => "reading path not generated yet",
        }
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
        }
    }
}

pub(super) fn document_download(
    deps: &DownloadJobsDeps<'_>,
    job: &JobSnapshot,
    kind: DocumentDownloadKind,
) -> Result<FileDownload, AppError> {
    let content_type = kind.content_type();
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
