use std::path::{Path, PathBuf};

use crate::models::domain::{JobArtifactRecord, JobSnapshot};

use super::constants::{
    AI_READING_PATH_FILE_NAME, OUTPUT_AI_DIR_NAME,
    OUTPUT_ARTIFACTS_DIR_NAME, OUTPUT_LOGS_DIR_NAME, OUTPUT_MARKDOWN_DIR_NAME,
    OUTPUT_RENDERED_DIR_NAME, OUTPUT_TRANSLATED_DIR_NAME, OUTPUT_TYPST_BOOK_OVERLAYS_DIR_NAME,
    OUTPUT_TYPST_DIR_NAME, TRANSLATION_MANIFEST_FILE_NAME, TRANSLATION_REQUEST_JOURNAL_FILE_NAME,
};
use super::path_ops::resolve_data_path;

const PIPELINE_EVENTS_JSONL_FILE_NAME: &str = "pipeline_events.jsonl";
const LEGACY_EVENTS_JSONL_FILE_NAME: &str = "events.jsonl";

pub fn resolve_markdown_path(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let root = resolve_job_root(job, data_root)?;
    let published = root.join(OUTPUT_MARKDOWN_DIR_NAME).join("full.md");
    published.exists().then_some(published)
}

pub fn resolve_markdown_images_dir(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let root = resolve_job_root(job, data_root)?;
    let published = root.join(OUTPUT_MARKDOWN_DIR_NAME).join("images");
    published.exists().then_some(published)
}

pub fn resolve_job_root(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let job_root = job.artifacts.as_ref()?.job_root.as_ref()?;
    resolve_data_path(data_root, job_root).ok()
}

pub fn resolve_markdown_bundle_zip(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let job_root = resolve_job_root(job, data_root)?;
    Some(
        job_root
            .join(OUTPUT_ARTIFACTS_DIR_NAME)
            .join(format!("{}-markdown.zip", job.job_id)),
    )
}

pub fn resolve_output_pdf(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let path = job.artifacts.as_ref()?.output_pdf.as_ref()?;
    resolve_data_path(data_root, path).ok()
}

pub fn resolve_source_pdf(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let path = job.artifacts.as_ref()?.source_pdf.as_ref()?;
    resolve_data_path(data_root, path).ok()
}

pub fn resolve_normalized_document(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let path = job.artifacts.as_ref()?.normalized_document_json.as_ref()?;
    resolve_data_path(data_root, path).ok()
}

pub fn resolve_normalization_report(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let path = job.artifacts.as_ref()?.normalization_report_json.as_ref()?;
    resolve_data_path(data_root, path).ok()
}

/// `<job>/ai/reading-path.v1.json` —— agent 写的阅读路径。
///
/// 和其它 resolver 一样从 job_root 拼出来，**不接受外部传入的文件名**：
/// `ai/` 是 agent 可写的目录，让调用方决定读哪个文件等于把任意文件读取
/// 暴露给前端。要加第二个产物就再加一个 resolver。
pub fn resolve_ai_reading_path(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let job_root = job.artifacts.as_ref()?.job_root.as_ref()?;
    Some(
        resolve_data_path(data_root, job_root)
            .ok()?
            .join(OUTPUT_AI_DIR_NAME)
            .join(AI_READING_PATH_FILE_NAME),
    )
}

pub fn resolve_typst_source(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let job_root = job.artifacts.as_ref()?.job_root.as_ref()?;
    Some(
        resolve_data_path(data_root, job_root)
            .ok()?
            .join(OUTPUT_RENDERED_DIR_NAME)
            .join(OUTPUT_TYPST_DIR_NAME)
            .join(OUTPUT_TYPST_BOOK_OVERLAYS_DIR_NAME)
            .join("book-overlay.typ"),
    )
}

pub fn resolve_typst_pdf(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let job_root = job.artifacts.as_ref()?.job_root.as_ref()?;
    Some(
        resolve_data_path(data_root, job_root)
            .ok()?
            .join(OUTPUT_RENDERED_DIR_NAME)
            .join(OUTPUT_TYPST_DIR_NAME)
            .join(OUTPUT_TYPST_BOOK_OVERLAYS_DIR_NAME)
            .join("book-overlay.pdf"),
    )
}

pub fn resolve_translation_manifest(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let translations_dir = job.artifacts.as_ref()?.translations_dir.as_ref()?;
    let path = resolve_data_path(data_root, translations_dir)
        .ok()?
        .join(TRANSLATION_MANIFEST_FILE_NAME);
    path.exists().then_some(path)
}

pub fn resolve_translation_diagnostics(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let job_root = resolve_job_root(job, data_root)?;
    let path = job_root
        .join(OUTPUT_ARTIFACTS_DIR_NAME)
        .join("translation_diagnostics.json");
    path.exists().then_some(path)
}

pub fn resolve_translation_request_journal(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let root = resolve_job_root(job, data_root)?;
    let path = root
        .join(OUTPUT_TRANSLATED_DIR_NAME)
        .join(TRANSLATION_REQUEST_JOURNAL_FILE_NAME);
    path.is_file().then_some(path)
}

pub fn resolve_pipeline_summary(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let path = job.artifacts.as_ref()?.summary.as_ref()?;
    let path = resolve_data_path(data_root, path).ok()?;
    path.exists().then_some(path)
}

pub fn resolve_translation_debug_index(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let job_root = resolve_job_root(job, data_root)?;
    let path = job_root
        .join(OUTPUT_ARTIFACTS_DIR_NAME)
        .join("translation_debug_index.json");
    path.exists().then_some(path)
}

pub fn resolve_registered_artifact_path(
    data_root: &Path,
    artifact: &JobArtifactRecord,
) -> anyhow::Result<PathBuf> {
    resolve_data_path(data_root, &artifact.relative_path)
}

pub fn resolve_events_jsonl(job: &JobSnapshot, data_root: &Path) -> Option<PathBuf> {
    let job_root = job.artifacts.as_ref()?.job_root.as_ref()?;
    let root = resolve_data_path(data_root, job_root).ok()?;
    let logs_dir = root.join(OUTPUT_LOGS_DIR_NAME);
    let pipeline_events = logs_dir.join(PIPELINE_EVENTS_JSONL_FILE_NAME);
    if pipeline_events.exists() {
        return Some(pipeline_events);
    }
    let legacy_events = logs_dir.join(LEGACY_EVENTS_JSONL_FILE_NAME);
    legacy_events.exists().then_some(legacy_events)
}
