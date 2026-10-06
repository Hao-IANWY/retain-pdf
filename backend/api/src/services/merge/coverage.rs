//! 一本书的翻译覆盖和任务记录 —— 书籍详情「进度」分区展示用。
//!
//! 只**计算**，不生成：合并计划是纯函数，这里不调 Python、不建合并目录，打开详情页不会
//! 触发一次合并。
//!
//! 「覆盖」和阅读入口用同一套规则（每页取最近翻译了它的那个任务），所以这里说「第 7 页
//! 来自某次翻译」，阅读器打开时第 7 页就是那次翻译。

use std::collections::BTreeMap;
use std::path::Path;

use serde::Serialize;

use crate::db::Db;
use crate::error::AppError;
use crate::models::domain::{JobSnapshot, JobStatusKind, WorkflowKind};
use crate::services::document_pages::translated_document_pages;

use super::plan::{merge_plan, PageSource};
use super::reading::document_merge_sources;

/// 连续几页来自同一个来源：`job_id` 为空表示原文（没翻译）。
#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct CoverageSegment {
    pub first: u32,
    pub last: u32,
    pub job_id: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct CoverageJobView {
    pub job_id: String,
    pub workflow: WorkflowKind,
    pub status: JobStatusKind,
    pub created_at: String,
    pub finished_at: Option<String>,
    /// 翻译模型；纯 OCR 任务为空。
    pub model: String,
    /// 这个任务处理的文档页（1 起、升序）。成功的翻译任务按实际执行算；没完成的按请求算；
    /// 算不出来（老任务没记录）就是空。
    pub pages: Vec<u32>,
    /// 当前合并结果里，有几页取自这个任务（被后来的翻译盖掉的不算）。
    pub supplied_pages: u32,
    /// 复用了别的任务的 OCR。
    pub ocr_reused: bool,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct TranslationCoverageView {
    pub page_count: u32,
    /// 有译文的文档页数。
    pub translated_pages: u32,
    /// 当前合并结果用到了几次翻译。
    pub contributing_jobs: u32,
    /// 整本书按页的来源，连续同源的页合成一段。
    pub segments: Vec<CoverageSegment>,
    /// 这本书的全部任务，新到旧。
    pub jobs: Vec<CoverageJobView>,
}

/// 文档页 → 来源的整本计划，压成连续段。
pub(crate) fn segments_of(plan: &[PageSource]) -> Vec<CoverageSegment> {
    let mut segments: Vec<CoverageSegment> = Vec::new();
    for (index, source) in plan.iter().enumerate() {
        let page = index as u32 + 1;
        let job_id = match source {
            PageSource::Original => None,
            PageSource::Job { job_id, .. } => Some(job_id.clone()),
        };
        match segments.last_mut() {
            Some(segment) if segment.job_id == job_id && segment.last + 1 == page => segment.last = page,
            _ => segments.push(CoverageSegment { first: page, last: page, job_id }),
        }
    }
    segments
}

/// 一个任务处理的文档页：成功的翻译按实际执行（OCR 页号表 + 本地 start/end），否则按请求。
fn job_pages(job: &JobSnapshot, document_page_count: u32) -> Vec<u32> {
    let artifacts = job.artifacts.as_ref();
    let ocr_pages = artifacts.map(|a| a.ocr_page_numbers.clone()).unwrap_or_default();
    let translation = &job.request_payload.translation;
    if job.workflow == WorkflowKind::Ocr {
        if !ocr_pages.is_empty() {
            return ocr_pages;
        }
        return parse_spec(&job.request_payload.ocr.page_ranges, document_page_count);
    }
    if job.status == JobStatusKind::Succeeded && !ocr_pages.is_empty() {
        if let Some(pages) = translated_document_pages(&ocr_pages, translation.start_page, translation.end_page) {
            return pages;
        }
    }
    if !translation.page_ranges.is_empty() {
        let mut pages = translation.page_ranges.clone();
        pages.sort_unstable();
        pages.dedup();
        return pages;
    }
    parse_spec(&job.request_payload.ocr.page_ranges, document_page_count)
}

/// `"1-3,7"` → `[1,2,3,7]`；空串或 `all` 表示整本。认不出的部分跳过。
fn parse_spec(spec: &str, document_page_count: u32) -> Vec<u32> {
    let spec = spec.trim();
    if spec.is_empty() || spec.eq_ignore_ascii_case("all") {
        return (1..=document_page_count).collect();
    }
    let mut pages = Vec::new();
    for part in spec.split(',') {
        let part = part.trim();
        let (first, last) = part.split_once('-').unwrap_or((part, part));
        if let (Ok(first), Ok(last)) = (first.trim().parse::<u32>(), last.trim().parse::<u32>()) {
            pages.extend((first.max(1)..=last.min(document_page_count)).filter(|_| first <= last));
        }
    }
    pages.sort_unstable();
    pages.dedup();
    pages
}

pub(crate) fn translation_coverage(
    db: &Db,
    data_root: &Path,
    document_id: &str,
    document_page_count: u32,
) -> Result<TranslationCoverageView, AppError> {
    let mut jobs = db.list_jobs_for_document(document_id, 500, 0)?;
    jobs.sort_by(|a, b| (&b.created_at, &b.job_id).cmp(&(&a.created_at, &a.job_id)));
    let sources = document_merge_sources(&jobs, data_root);
    let ranked: Vec<_> = sources.iter().map(|source| source.ranked.clone()).collect();
    let plan = merge_plan(document_page_count, &ranked);
    let mut supplied: BTreeMap<&str, u32> = BTreeMap::new();
    for source in &plan {
        if let PageSource::Job { job_id, .. } = source {
            *supplied.entry(job_id.as_str()).or_default() += 1;
        }
    }
    let translated_pages = supplied.values().sum();
    let contributing_jobs = supplied.len() as u32;
    let job_views = jobs
        .iter()
        .map(|job| CoverageJobView {
            job_id: job.job_id.clone(),
            workflow: job.workflow.clone(),
            status: job.status.clone(),
            created_at: job.created_at.clone(),
            finished_at: job.finished_at.clone(),
            model: if job.workflow == WorkflowKind::Ocr {
                String::new()
            } else {
                job.request_payload.translation.model.clone()
            },
            pages: job_pages(job, document_page_count),
            supplied_pages: supplied.get(job.job_id.as_str()).copied().unwrap_or(0),
            ocr_reused: !job.request_payload.source.artifact_job_id.trim().is_empty(),
        })
        .collect();
    Ok(TranslationCoverageView {
        page_count: document_page_count,
        translated_pages,
        contributing_jobs,
        segments: segments_of(&plan),
        jobs: job_views,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn job(id: &str, local: usize) -> PageSource {
        PageSource::Job { job_id: id.to_string(), local_index: local }
    }

    #[test]
    fn runs_of_the_same_source_collapse_into_segments() {
        let plan = [job("a", 0), job("a", 1), PageSource::Original, job("b", 0), job("b", 1), job("a", 2)];
        assert_eq!(
            segments_of(&plan),
            vec![
                CoverageSegment { first: 1, last: 2, job_id: Some("a".into()) },
                CoverageSegment { first: 3, last: 3, job_id: None },
                CoverageSegment { first: 4, last: 5, job_id: Some("b".into()) },
                CoverageSegment { first: 6, last: 6, job_id: Some("a".into()) },
            ]
        );
        assert_eq!(segments_of(&[]), vec![]);
    }

    #[test]
    fn page_specs_parse_like_the_ocr_request() {
        assert_eq!(parse_spec("1-3, 7", 10), vec![1, 2, 3, 7]);
        assert_eq!(parse_spec("", 3), vec![1, 2, 3]);
        assert_eq!(parse_spec("all", 2), vec![1, 2]);
        assert_eq!(parse_spec("8-12", 10), vec![8, 9, 10], "超出页数的截掉");
        assert_eq!(parse_spec("5-3, x, 2", 10), vec![2], "颠倒的和认不出的跳过");
    }
}
