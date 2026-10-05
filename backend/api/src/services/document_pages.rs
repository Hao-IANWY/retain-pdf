//! 「这个任务的第 i 页，是文档的第几页」。
//!
//! # 为什么需要它
//!
//! 流水线**从头到尾用本地索引**：OCR 只跑第 6-10 页时，MinerU 只返回这 5 页（本地 0-4）；
//! 翻译再从里面挑一段时，`prepare.rs` 把选区改写成 OCR 产物里的本地位置；渲染时
//! `remap_selected_render_pages` 又重映射一次，产出一份**只含这几页**的 PDF。
//!
//! 流水线里到处写着 `page_number = page_idx + 1`（manifest、recovery、batch_translation、
//! policy、review_artifact），那是本地索引 +1，**不是文档页号**。它从没出过错，只因为真实
//! 数据里所有范围任务都从第 1 页开始（查过 21 个 job，`start_page` 全是 0），本地和全局
//! 恰好相等。
//!
//! 合并（同一本书的多个范围任务拼成一本）必须知道每一页对应文档第几页。与其把六七处
//! `page_idx + 1` 全改掉，不如让流水线保持本地索引，在 Rust 边界上把映射显式算出来 ——
//! 这就是这个模块。
//!
//! # 数据从哪来
//!
//! - **OCR 覆盖的文档页**：`ocr_artifact_reuse::source_document_pages`。主路径是
//!   `artifacts.ocr_page_numbers`（`artifacts` 表的 `artifacts_json`），实测 61 个 job 里
//!   **59 个有**，缺的 2 个是取消或失败的任务。重新解析 OCR 请求里 `page_ranges` 字符串
//!   只是罕见兜底，而且**在子集 OCR 上必然失效**：`ocr_flow/transport.rs` 先把源 PDF 裁成
//!   子集、再把 `ocr.page_ranges` 清成空串（`page_subset.rs::provider_page_ranges`），兜底
//!   拿到空串去比裁过的 PDF 页数，对不上就报 `ocr_page_coverage_unknown`。
//!
//!   `ocr_page_numbers` 是 OCR **开跑前**按请求写的，失败的任务里也有值 —— 它表示「打算
//!   覆盖」，必须配合 `status == Succeeded` 用（见 `coverage_from_parts`）。
//!
//!   （这里原先写的是「一个都没持久化」—— 错的。当时只查了 `jobs` 表的几个 JSON 列，
//!   列表名时又按 `'job' in name` 过滤，把 `artifacts` 表滤掉了。）
//! - **翻译挑了 OCR 产物里的哪一段**：job spec 里的 `translation.start_page / end_page`，
//!   已经被 `prepare.rs` 改写成本地位置。

// 合并功能分步落地中：这些函数在测试里已经全部用到，但要到第 5 步「下游切换到解析
// 函数」时才有生产调用方。接上之后删掉这一行。
#![cfg_attr(not(test), allow(dead_code))]

use std::path::{Path, PathBuf};

use crate::models::domain::{JobSnapshot, JobStatusKind, WorkflowKind};
use crate::storage_paths::{
    resolve_data_path, resolve_markdown_images_dir, resolve_normalized_document, resolve_output_pdf,
};

/// 一个翻译任务的输出覆盖了哪些文档页（1 起），按本地顺序排列：
/// 返回值的第 `i` 个元素就是该任务渲染产物第 `i` 页对应的文档页号。
///
/// - `source_document_pages`：OCR 覆盖的文档页，按 OCR 产物的本地顺序（1 起）
/// - `start_page` / `end_page`：翻译在 OCR 产物里选的本地区间（0 起，闭区间）；
///   `end_page < 0` 表示「到最后一页」，和流水线的约定一致
///
/// 区间越界或为空时返回 `None` —— 调用方不该拿一份对不上的映射去拼页，
/// 拼错页比不拼更糟（用户会看到第 7 页的译文出现在第 3 页的位置上）。
pub(crate) fn translated_document_pages(
    source_document_pages: &[u32],
    start_page: i64,
    end_page: i64,
) -> Option<Vec<u32>> {
    if source_document_pages.is_empty() {
        return None;
    }
    let last_local = source_document_pages.len() as i64 - 1;
    let start = start_page.max(0);
    let end = if end_page < 0 { last_local } else { end_page };
    if start > end || end > last_local {
        return None;
    }
    Some(source_document_pages[start as usize..=end as usize].to_vec())
}

/// 一个任务的输出 PDF 能拿来参与合并的覆盖范围：输出 PDF 第 `i` 页 = 文档第 `pages[i]` 页。
///
/// 只有同时满足这些的任务才算「覆盖」，否则返回 `None`：
///
/// - **成功了**。部分成功的任务没有 PDF —— 翻译导出门禁是全过或全不过（有页进了 dead
///   letter 整个任务就失败），所以不存在「这个任务翻好了其中几页」，粒度是整个任务。
///   取消的任务即使磁盘上有 PDF 也不算：取消可能在 PDF 写完之后才到。
/// - **不是纯 OCR 任务**。它没有译文。
/// - **输出 PDF 真的在、而且读得出页数**。原地重新排版（`rerun.rs`）一开始就删掉
///   `rendered/`，那段时间这个任务不覆盖任何页 —— 现算自然就看到了。
/// - **PDF 页数 == 算出来的覆盖页数**。对不上就拒绝：拼错页比不拼更糟，用户会看到
///   第 7 页的译文出现在第 3 页的位置上。
///
/// # 为什么现算、不在任务成功时持久化
///
/// `ocr_page_numbers` 和 `start/end` 本身已经持久化、对完成的任务不再变，覆盖范围完全
/// 可以由它们推出来。持久化一份反而要在原地重新排版时记得重算，否则就和磁盘对不上。
///
/// # 用的是「实际执行」的范围，不是用户意图
///
/// `start/end` 是 `prepare.rs` 改写过的、流水线真正跑的本地位置。**不用**
/// `translation.page_ranges`：那是用户想要的，而 `resolve_translation_selection` 在拿不到
/// 文档页数时会把它整个忽略、按本地位置照跑 —— 用户只要第 5-8 页，实际可能翻了整份
/// OCR。按实际执行算，合并至少不会拼错。
pub(crate) fn coverage_from_parts(
    status: &JobStatusKind,
    workflow: &WorkflowKind,
    ocr_page_numbers: &[u32],
    start_page: i64,
    end_page: i64,
    output_pdf_page_count: Option<usize>,
) -> Option<Vec<u32>> {
    if *status != JobStatusKind::Succeeded || *workflow == WorkflowKind::Ocr {
        return None;
    }
    let page_count = output_pdf_page_count?;
    let pages = translated_document_pages(ocr_page_numbers, start_page, end_page)?;
    (pages.len() == page_count).then_some(pages)
}

/// 一个任务对合并的贡献：覆盖哪些文档页、从哪份 PDF 取。
#[derive(Debug, Clone, PartialEq, Eq)]
pub(crate) struct JobCoverage {
    pub job_id: String,
    pub created_at: String,
    /// **产出这份译文的那个任务**的提交时间，合并时按它排「最新」。
    ///
    /// 默认就是自己的 `created_at`。单独建的 render 任务（换字体重新排版）没有产出新
    /// 译文 —— 它的 `translations_dir` 指向别的任务 —— 调用方要把这里改成那个产出者的
    /// 提交时间。否则调一次字体，旧译文就会翻盘盖掉后来专门重翻的页。
    pub producer_created_at: String,
    /// 输出 PDF 第 `i` 页 = 文档第 `pages[i]` 页（1 起）。
    pub pages: Vec<u32>,
    pub output_pdf: PathBuf,
    /// 数据层合并用：OCR 本地页 `L` = 文档第 `ocr_page_numbers[L]` 页。
    pub ocr_page_numbers: Vec<u32>,
    pub translations_dir: Option<PathBuf>,
    pub normalized_document: Option<PathBuf>,
    pub markdown_images_dir: Option<PathBuf>,
}

/// 读磁盘的那一层：解析输出 PDF、读它的页数，交给 `coverage_from_parts` 判定。
pub(crate) fn job_output_coverage(job: &JobSnapshot, data_root: &Path) -> Option<JobCoverage> {
    let artifacts = job.artifacts.as_ref()?;
    let output_pdf = resolve_output_pdf(job, data_root).filter(|path| path.is_file());
    let page_count = output_pdf
        .as_deref()
        .and_then(|path| lopdf::Document::load(path).ok())
        .map(|document| document.get_pages().len());
    let normalized_document =
        resolve_normalized_document(job, data_root).filter(|path| path.is_file());
    let pages = coverage_from_parts(
        &job.status,
        &job.workflow,
        &artifacts.ocr_page_numbers,
        job.request_payload.translation.start_page,
        job.request_payload.translation.end_page,
        page_count,
    )?;
    Some(JobCoverage {
        job_id: job.job_id.clone(),
        created_at: job.created_at.clone(),
        producer_created_at: job.created_at.clone(),
        pages,
        output_pdf: output_pdf?,
        ocr_page_numbers: artifacts.ocr_page_numbers.clone(),
        translations_dir: artifacts
            .translations_dir
            .as_deref()
            .and_then(|path| resolve_data_path(data_root, path).ok()),
        normalized_document: normalized_document.clone(),
        markdown_images_dir: markdown_images_dir(normalized_document.as_deref())
            .or_else(|| resolve_markdown_images_dir(job, data_root)),
    })
}

/// 图片目录从 OCR 文档的位置推：`<OCR 任务根>/ocr/normalized/document.v1.json` →
/// `<OCR 任务根>/md/images`。OCR 文档里的图片路径（`md/images/page-3/…`）本来就是相对
/// OCR 任务根目录的。
///
/// 不能用 `resolve_markdown_images_dir(job)`：它取的是**这个**任务的 `job_root`，而复用
/// OCR 的任务自己的 `md/` 是空的 —— 图片在提供 OCR 的那个任务目录里。
fn markdown_images_dir(normalized_document: Option<&Path>) -> Option<PathBuf> {
    let ocr_root = normalized_document?.parent()?.parent()?.parent()?;
    let images = ocr_root.join("md").join("images");
    images.is_dir().then_some(images)
}

/// 合并后某一文档页取自哪里。
#[derive(Debug, Clone, PartialEq, Eq)]
pub(crate) enum PageSource {
    /// 没有任何任务覆盖这一页：用源 PDF 的原文页。
    Original,
    /// 取 `job_id` 那个任务输出 PDF 的第 `local_index` 页（0 起）。
    Job { job_id: String, local_index: usize },
}

/// 合并计划：返回长度为 `document_page_count` 的向量，第 `k` 个元素是文档第 `k+1` 页的来源。
///
/// **整本长度**是刻意的：阅读器对照模式、双栏对照 PDF、Word 的字号回读都是**按页序号**
/// 配对原文和译文的。如果只把翻过的页紧凑地拼起来（第 1-5 页 + 第 20-25 页 → 11 页），
/// 这几处全部错页。没翻的页用原文填上。
///
/// # 「最新」的规则
///
/// 每页取覆盖它的任务里排序键最大的那个：`(产出者提交时间, 自己的提交时间, job_id)`。
///
/// - **按产出者的提交时间，不按完成时间**：原地重新排版（`rerun.rs`）会保留 `created_at`
///   但清空 `finished_at` 再重写。按完成时间排，调一次字体就会让旧译文盖掉新译文。用户的
///   心智模型是「我最后一次发起翻译的那页胜出，重新排版不算重新翻译」。
/// - **同一份译文的多个任务**（产出者 + 它的 render 任务）里，后提交的胜出 —— 那是更新的
///   排版。
/// - **job_id 兜底**：`now_iso()` 只精确到秒，混合范围拆成的子任务会在同一秒提交。它们彼此
///   不重叠所以不冲突，但排序必须确定。**不用 SQLite rowid**：`jobs` 表没有 INTEGER
///   PRIMARY KEY，VACUUM 可能重排 rowid。
pub(crate) fn merge_plan(document_page_count: u32, coverages: &[JobCoverage]) -> Vec<PageSource> {
    let mut ranked: Vec<&JobCoverage> = coverages.iter().collect();
    ranked.sort_by(|a, b| {
        (&a.producer_created_at, &a.created_at, &a.job_id)
            .cmp(&(&b.producer_created_at, &b.created_at, &b.job_id))
    });
    let mut plan = vec![PageSource::Original; document_page_count as usize];
    // 从旧到新依次覆盖：最后写进去的就是最新的。
    for coverage in ranked {
        for (local_index, page) in coverage.pages.iter().enumerate() {
            let Some(slot) = (*page as usize)
                .checked_sub(1)
                .and_then(|index| plan.get_mut(index))
            else {
                // 越界的页号（比文档还长）直接跳过，不让一个坏任务拖垮整本合并。
                continue;
            };
            *slot = PageSource::Job {
                job_id: coverage.job_id.clone(),
                local_index,
            };
        }
    }
    plan
}

#[cfg(test)]
mod tests {
    use super::{
        coverage_from_parts, markdown_images_dir, merge_plan, translated_document_pages, JobCoverage, PageSource,
    };
    use std::path::PathBuf;
    use crate::models::domain::{JobStatusKind, WorkflowKind};

    #[test]
    fn a_full_document_job_maps_local_pages_straight_through() {
        // 正对照：真实数据里全部 21 个 job 都是这种 —— 从第 1 页开始，本地 = 全局 - 1。
        let ocr = [1, 2, 3, 4, 5];
        assert_eq!(translated_document_pages(&ocr, 0, -1), Some(vec![1, 2, 3, 4, 5]));
    }

    #[test]
    fn an_ocr_range_that_starts_mid_document_keeps_its_document_page_numbers() {
        // **从没被跑过的路径**。OCR 只跑了第 6-10 页，产物本地 0-4。
        // 流水线会把这 5 页写成 page_number 1-5 —— 那是错的。
        let ocr = [6, 7, 8, 9, 10];
        assert_eq!(
            translated_document_pages(&ocr, 0, -1),
            Some(vec![6, 7, 8, 9, 10]),
            "从文档中间开始的 OCR 范围，映射回来的不是文档页号"
        );
    }

    #[test]
    fn a_translation_slice_inside_a_mid_document_ocr_range() {
        // OCR 第 6-10 页，翻译挑了本地 1..=3 → 文档第 7、8、9 页。
        // 两层本地索引叠在一起，正是最容易拼错页的情形。
        let ocr = [6, 7, 8, 9, 10];
        assert_eq!(translated_document_pages(&ocr, 1, 3), Some(vec![7, 8, 9]));
    }

    #[test]
    fn a_non_contiguous_ocr_coverage_is_followed_page_by_page() {
        // OCR 跑的是 `1-3,8,12-13`：本地 0..=5 对应文档 1,2,3,8,12,13。
        // 翻译挑本地 2..=4 → 文档 3,8,12 —— 映射必须逐页跟着 OCR 的覆盖走，
        // 不能当成连续区间去算偏移。
        let ocr = [1, 2, 3, 8, 12, 13];
        assert_eq!(translated_document_pages(&ocr, 2, 4), Some(vec![3, 8, 12]));
    }

    #[test]
    fn end_page_minus_one_means_through_the_last_ocr_page() {
        let ocr = [6, 7, 8];
        assert_eq!(translated_document_pages(&ocr, 1, -1), Some(vec![7, 8]));
    }

    #[test]
    fn an_out_of_range_selection_yields_no_mapping_rather_than_a_wrong_one() {
        // 拼错页比不拼更糟：用户会看到第 7 页的译文出现在第 3 页的位置上。
        let ocr = [6, 7, 8];
        assert_eq!(translated_document_pages(&ocr, 0, 5), None, "end 越界");
        assert_eq!(translated_document_pages(&ocr, 2, 1), None, "start > end");
        assert_eq!(translated_document_pages(&[], 0, -1), None, "OCR 一页都没覆盖");
    }

    #[test]
    fn a_negative_start_is_clamped_like_the_pipeline_does() {
        // 流水线 `_int_field(params, "start_page", 0)` 的默认值是 0，负数没有意义。
        let ocr = [6, 7, 8];
        assert_eq!(translated_document_pages(&ocr, -3, 1), Some(vec![6, 7]));
    }

    // ── coverage_from_parts ──────────────────────────────────────────────

    const OK: JobStatusKind = JobStatusKind::Succeeded;

    #[test]
    fn a_succeeded_translation_job_covers_its_mapped_pages() {
        let ocr = [6, 7, 8, 9, 10];
        assert_eq!(
            coverage_from_parts(&OK, &WorkflowKind::Book, &ocr, 1, 3, Some(3)),
            Some(vec![7, 8, 9])
        );
    }

    #[test]
    fn only_succeeded_jobs_cover_anything() {
        // 部分成功不存在（导出门禁全过或全不过）；取消的即使有 PDF 也不算。
        let ocr = [1, 2, 3];
        for status in [
            JobStatusKind::Queued,
            JobStatusKind::Running,
            JobStatusKind::Failed,
            JobStatusKind::Canceled,
        ] {
            assert_eq!(
                coverage_from_parts(&status, &WorkflowKind::Book, &ocr, 0, -1, Some(3)),
                None,
                "{status:?} 的任务被当成了覆盖"
            );
        }
    }

    #[test]
    fn an_ocr_only_job_covers_nothing() {
        // 它没有译文。不排除的话，重新 OCR 一次就会让原文盖掉译文。
        let ocr = [1, 2, 3];
        assert_eq!(
            coverage_from_parts(&OK, &WorkflowKind::Ocr, &ocr, 0, -1, Some(3)),
            None
        );
    }

    #[test]
    fn translate_and_render_workflows_both_count() {
        let ocr = [1, 2];
        for workflow in [WorkflowKind::Book, WorkflowKind::Translate, WorkflowKind::Render] {
            assert_eq!(
                coverage_from_parts(&OK, &workflow, &ocr, 0, -1, Some(2)),
                Some(vec![1, 2]),
                "{workflow:?} 没被算作覆盖"
            );
        }
    }

    #[test]
    fn a_missing_output_pdf_covers_nothing() {
        // 原地重新排版一开始就删掉 rendered/，那段时间不覆盖任何页。
        let ocr = [1, 2, 3];
        assert_eq!(
            coverage_from_parts(&OK, &WorkflowKind::Book, &ocr, 0, -1, None),
            None
        );
    }

    #[test]
    fn a_page_count_mismatch_is_rejected_rather_than_stitched_wrong() {
        // 映射说 3 页，PDF 只有 2 页 —— 拼进去就是错页。宁可不拼。
        let ocr = [6, 7, 8];
        assert_eq!(
            coverage_from_parts(&OK, &WorkflowKind::Book, &ocr, 0, -1, Some(2)),
            None,
            "页数对不上却被接受了"
        );
        assert_eq!(
            coverage_from_parts(&OK, &WorkflowKind::Book, &ocr, 0, -1, Some(4)),
            None,
            "PDF 比映射多一页也该拒绝"
        );
    }

    #[test]
    fn an_unmappable_range_covers_nothing() {
        let ocr = [1, 2, 3];
        assert_eq!(
            coverage_from_parts(&OK, &WorkflowKind::Book, &ocr, 0, 9, Some(10)),
            None
        );
        assert_eq!(
            coverage_from_parts(&OK, &WorkflowKind::Book, &[], 0, -1, Some(0)),
            None,
            "OCR 一页都没覆盖时不该返回空覆盖"
        );
    }

    // ── merge_plan ───────────────────────────────────────────────────────

    fn cov(job_id: &str, created_at: &str, pages: &[u32]) -> JobCoverage {
        JobCoverage {
            job_id: job_id.to_string(),
            created_at: created_at.to_string(),
            producer_created_at: created_at.to_string(),
            pages: pages.to_vec(),
            output_pdf: PathBuf::from(format!("/x/{job_id}.pdf")),
            ocr_page_numbers: pages.to_vec(),
            translations_dir: None,
            normalized_document: None,
            markdown_images_dir: None,
        }
    }

    fn job(id: &str, local: usize) -> PageSource {
        PageSource::Job { job_id: id.to_string(), local_index: local }
    }

    #[test]
    fn the_plan_is_always_full_document_length_with_untranslated_pages_original() {
        // 对照模式、双栏对照、Word 字号回读都按页序号配对 —— 必须整本长度。
        let plan = merge_plan(6, &[cov("a", "2026-10-01T00:00:00", &[2, 3])]);
        assert_eq!(plan.len(), 6, "合并结果不是整本长度");
        assert_eq!(
            plan,
            vec![
                PageSource::Original,
                job("a", 0),
                job("a", 1),
                PageSource::Original,
                PageSource::Original,
                PageSource::Original,
            ]
        );
    }

    #[test]
    fn the_latest_submission_wins_on_overlapping_pages() {
        // 先翻整本 1-5，再专门重翻 3-4：3-4 页用后者，其余用前者。
        let plan = merge_plan(
            5,
            &[
                cov("whole", "2026-10-01T00:00:00", &[1, 2, 3, 4, 5]),
                cov("redo", "2026-10-02T00:00:00", &[3, 4]),
            ],
        );
        assert_eq!(
            plan,
            vec![job("whole", 0), job("whole", 1), job("redo", 0), job("redo", 1), job("whole", 4)]
        );
    }

    #[test]
    fn input_order_does_not_change_the_result() {
        // 结果只能取决于「有哪些任务、谁先提交」，不能取决于数据库返回的顺序。
        let a = cov("whole", "2026-10-01T00:00:00", &[1, 2, 3]);
        let b = cov("redo", "2026-10-02T00:00:00", &[2]);
        assert_eq!(merge_plan(3, &[a.clone(), b.clone()]), merge_plan(3, &[b, a]));
    }

    #[test]
    fn local_index_follows_the_job_own_page_order() {
        // 第 6-10 页的任务：文档第 8 页是它输出 PDF 的第 2 页（0 起）。
        // 两层本地索引最容易在这里拼错。
        let plan = merge_plan(10, &[cov("mid", "2026-10-01T00:00:00", &[6, 7, 8, 9, 10])]);
        assert_eq!(plan[7], job("mid", 2), "文档第 8 页没有取 mid 的第 2 页");
        assert_eq!(plan[4], PageSource::Original, "文档第 5 页不该被覆盖");
    }

    #[test]
    fn a_relayout_keeps_its_producer_rank_so_it_cannot_overturn_a_newer_translation() {
        // 先翻整本（甲），再专门重翻第 2 页（乙），最后给甲换字体重新排版（render 任务丙）。
        // 丙没有产出新译文，按「产出者」甲的提交时间排 —— 第 2 页必须仍是乙。
        let whole = cov("whole", "2026-10-01T00:00:00", &[1, 2, 3]);
        let redo = cov("redo", "2026-10-02T00:00:00", &[2]);
        let mut relayout = cov("relayout", "2026-10-03T00:00:00", &[1, 2, 3]);
        relayout.producer_created_at = whole.created_at.clone();
        let plan = merge_plan(3, &[whole, redo, relayout]);
        assert_eq!(plan[1], job("redo", 0), "换个字体就让旧译文翻盘了");
        // 而第 1、3 页是同一份译文里更新的排版。
        assert_eq!(plan[0], job("relayout", 0));
        assert_eq!(plan[2], job("relayout", 2));
    }

    #[test]
    fn same_second_submissions_are_ordered_deterministically_by_job_id() {
        // now_iso() 只精确到秒。同一秒的两个任务覆盖同一页时，结果必须确定。
        let t = "2026-10-01T00:00:00";
        let plan = merge_plan(1, &[cov("job-b", t, &[1]), cov("job-a", t, &[1])]);
        assert_eq!(plan[0], job("job-b", 0), "同一秒提交时没有按 job_id 确定地兜底");
        let flipped = merge_plan(1, &[cov("job-a", t, &[1]), cov("job-b", t, &[1])]);
        assert_eq!(plan, flipped);
    }

    #[test]
    fn a_page_beyond_the_document_is_skipped_not_fatal() {
        let plan = merge_plan(2, &[cov("a", "2026-10-01T00:00:00", &[1, 2, 9])]);
        assert_eq!(plan, vec![job("a", 0), job("a", 1)]);
    }

    #[test]
    fn no_coverage_means_the_whole_document_is_original() {
        assert_eq!(merge_plan(3, &[]), vec![PageSource::Original; 3]);
    }

    #[test]
    fn markdown_images_come_from_the_job_that_produced_the_ocr() {
        // 复用 OCR 的任务自己的 md/ 是空的；图片在提供 OCR 的那个任务目录里。
        let root = std::env::temp_dir().join(format!("retain-images-{:016x}", fastrand::u64(..)));
        let ocr_job = root.join("jobs/ocr-job");
        std::fs::create_dir_all(ocr_job.join("ocr/normalized")).unwrap();
        std::fs::create_dir_all(ocr_job.join("md/images")).unwrap();
        let document = ocr_job.join("ocr/normalized/document.v1.json");
        assert_eq!(markdown_images_dir(Some(&document)), Some(ocr_job.join("md/images")));
        std::fs::remove_dir_all(ocr_job.join("md")).unwrap();
        assert_eq!(markdown_images_dir(Some(&document)), None, "目录不存在时不该返回");
        assert_eq!(markdown_images_dir(None), None);
        let _ = std::fs::remove_dir_all(&root);
    }
}
