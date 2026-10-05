//! 合并译文 PDF：同一本书的多个范围任务拼成一本整本长度的译文。
//!
//! 计划由 `document_pages::merge_plan` 算，拼接交给 Python 的 `merge-translated-pdf`
//! （pikepdf「移植」，见那边的模块注释）。这里只管两件事：缓存键、调子进程。
//!
//! # 缓存：按内容指纹命名的不可变文件
//!
//! 产物是 `data/documents/<doc>/merged/merged-<指纹>.pdf`，**文件存在即新鲜**。
//!
//! 不能沿用 `cached_output_is_fresh` 的 mtime 比较：删掉一个较新的任务后，剩下所有输入
//! 都比产物旧，它会继续返回包含已删任务的旧合并结果；改了拼接代码也不会失效。指纹里
//! 放的是「这次合并由什么决定」—— 拼接器版本、源 PDF、每页取自哪个任务的哪一页、每份
//! 参与的输出 PDF 的大小和修改时间。任何一项变了就是一个新文件名。
//!
//! 文件名不可变还有一个好处：用户正在下载旧的合并结果时，新的合并不会把它从脚下替换掉
//! （断点续传不会拼出半新半旧的 PDF）。旧文件的清理另做。

// 合并功能分步落地中：第 5 步「下游切换到解析函数」接上生产调用方后删掉这一行。
#![cfg_attr(not(test), allow(dead_code))]

use std::collections::BTreeMap;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::time::{Duration, UNIX_EPOCH};

use sha2::{Digest, Sha256};

use crate::error::AppError;
use crate::services::document_pages::{JobCoverage, PageSource};

use super::{document_artifacts_dir, DerivedArtifactDeps};

/// 拼接器的行为一变就加一。它进了指纹，旧缓存自动作废 —— Word 导出就吃过「改了代码、
/// 缓存不认」的亏（`word.rs` 的 `RENDERER_VERSION`）。
const MERGE_VERSION: u32 = 1;

/// 50 页 4 个来源交错实测 0.5 秒；留足余量给大书和慢盘。
const BUILD_TIMEOUT: Duration = Duration::from_secs(120);

fn file_stamp(path: &Path) -> Result<String, AppError> {
    let meta = std::fs::metadata(path)?;
    let modified = meta
        .modified()
        .ok()
        .and_then(|time| time.duration_since(UNIX_EPOCH).ok())
        .map(|elapsed| elapsed.as_nanos())
        .unwrap_or(0);
    Ok(format!("{}|{}|{}", path.display(), meta.len(), modified))
}

/// 计划里引用到的任务 → 它的覆盖记录。计划引用了不存在的任务就是调用方的 bug。
fn referenced_jobs<'a>(
    plan: &[PageSource],
    coverages: &'a [JobCoverage],
) -> Result<BTreeMap<&'a str, &'a JobCoverage>, AppError> {
    let by_id: BTreeMap<&str, &JobCoverage> =
        coverages.iter().map(|c| (c.job_id.as_str(), c)).collect();
    let mut referenced = BTreeMap::new();
    for source in plan {
        if let PageSource::Job { job_id, .. } = source {
            let coverage = by_id.get(job_id.as_str()).ok_or_else(|| {
                AppError::internal(format!("merge plan references unknown job {job_id}"))
            })?;
            referenced.insert(coverage.job_id.as_str(), *coverage);
        }
    }
    Ok(referenced)
}

pub(crate) fn merge_fingerprint(
    source_pdf: &Path,
    plan: &[PageSource],
    coverages: &[JobCoverage],
) -> Result<String, AppError> {
    let mut hasher = Sha256::new();
    hasher.update(format!("v{MERGE_VERSION}\n"));
    hasher.update(format!("source {}\n", file_stamp(source_pdf)?));
    for source in plan {
        match source {
            PageSource::Original => hasher.update("page original\n"),
            PageSource::Job { job_id, local_index } => {
                hasher.update(format!("page {job_id}#{local_index}\n"))
            }
        }
    }
    for (job_id, coverage) in referenced_jobs(plan, coverages)? {
        hasher.update(format!("job {job_id} {}\n", file_stamp(&coverage.output_pdf)?));
    }
    Ok(hasher
        .finalize()
        .iter()
        .map(|byte| format!("{byte:02x}"))
        .collect())
}

/// 交给 Python 的计划：`{"pages": [null | {"pdf": 绝对路径, "index": n}, …]}`。
fn plan_json(plan: &[PageSource], coverages: &[JobCoverage]) -> Result<String, AppError> {
    let jobs = referenced_jobs(plan, coverages)?;
    let pages: Vec<serde_json::Value> = plan
        .iter()
        .map(|source| match source {
            PageSource::Original => serde_json::Value::Null,
            PageSource::Job { job_id, local_index } => serde_json::json!({
                "pdf": jobs[job_id.as_str()].output_pdf,
                "index": local_index,
            }),
        })
        .collect();
    Ok(serde_json::json!({ "pages": pages }).to_string())
}

pub(crate) fn merged_pdf_path(
    data_root: &Path,
    document_id: &str,
    fingerprint: &str,
) -> Result<PathBuf, AppError> {
    let dir = document_artifacts_dir(data_root, document_id)?.join("merged");
    std::fs::create_dir_all(&dir)?;
    Ok(dir.join(format!("merged-{}.pdf", &fingerprint[..16])))
}

/// 拿到（必要时生成）这本书当前的合并译文 PDF。
pub(crate) fn ensure_merged_translated_pdf(
    deps: DerivedArtifactDeps<'_>,
    data_root: &Path,
    document_id: &str,
    source_pdf: &Path,
    plan: &[PageSource],
    coverages: &[JobCoverage],
) -> Result<PathBuf, AppError> {
    let fingerprint = merge_fingerprint(source_pdf, plan, coverages)?;
    let output = merged_pdf_path(data_root, document_id, &fingerprint)?;
    if output.is_file() {
        return Ok(output);
    }
    let plan_file = output.with_extension(format!("plan-{:016x}.json", fastrand::u64(..)));
    let result = (|| {
        std::fs::File::create(&plan_file)?.write_all(plan_json(plan, coverages)?.as_bytes())?;
        super::side_by_side::build_with_command(&output, "merged-pdf", BUILD_TIMEOUT, |tmp_pdf| {
            let mut command = merge_command(deps);
            command
                .arg("--source-pdf")
                .arg(source_pdf)
                .arg("--plan")
                .arg(&plan_file)
                .arg("--output-pdf")
                .arg(tmp_pdf);
            command
        })
    })();
    let _ = std::fs::remove_file(&plan_file);
    result.map(|()| output)
}

fn merge_command(deps: DerivedArtifactDeps<'_>) -> std::process::Command {
    let mut command = std::process::Command::new(deps.pipeline_command);
    command.arg("merge-translated-pdf");
    command
}

#[cfg(test)]
#[path = "merged_tests.rs"]
mod tests;
