use crate::error::AppError;
use crate::models::api::{
    AmbiguousRequestPolicy, RetryStageKind, RetryStageRequest, RetryStageSubmissionView,
    StageActionsView,
};
use crate::services::job_launcher::start_job_execution;
use crate::services::jobs::stage_plan::stage_plan;
use crate::services::jobs::translation_request_recovery::load_translation_request_recovery;

use super::super::super::creation::{create_ocr_ambiguity_recovery_job, create_translation_job};
use super::super::super::query::load_job_or_404;
use super::super::JobsFacade;
use super::ocr_ambiguity::ambiguous_ocr_dispatch;
use super::rerun::prepare_in_place_render_job;
use super::stage_retry_overrides::{
    apply_retry_overrides, apply_retry_overrides_to_resolved_spec, discard_ocr_secret_sources,
    discard_translation_secret_sources,
};
use super::stage_retry_request::build_retry_request;
use super::stage_retry_view::{build_retry_stage_submission_view, build_stage_actions_view};

impl<'a> JobsFacade<'a> {
    pub fn stage_actions_view(
        &self,
        base_url: &str,
        job_id: &str,
    ) -> Result<StageActionsView, AppError> {
        let job = load_job_or_404(self.command.db, job_id)?;
        Ok(build_stage_actions_view(
            base_url,
            &job,
            self.command.control.data_root,
        ))
    }

    /// 重试即链文档：主页卡片靠 documents.active_job_id 找运行中任务。
    /// 源任务的文档可经 jobs.document_id / upload 反查；找不到就跳过，
    /// 终态 lifecycle 仍会再次对账，绝不影响提交。
    ///
    /// 新任务自己的 jobs.document_id 也要写上：重新渲染的任务没有 upload_id，lifecycle 的
    /// link_job_to_document 补不上它，于是它不在「这本书的任务」里 —— 阅读页的打开计划
    /// （resolve_reading_target）看不见它，点「阅读」一直打开重新渲染之前的旧任务。
    fn link_retry_to_source_document(&self, source_job_id: &str, new_job_id: &str) {
        let document_id = match self.command.db.document_id_for_job(source_job_id) {
            Ok(Some(document_id)) => Some(document_id),
            Ok(None) | Err(_) => match self.command.db.get_document_by_job_id(source_job_id) {
                Ok(doc) => doc.map(|doc| doc.document_id),
                Err(error) => {
                    tracing::warn!(
                        "library: resolve document for retry source {source_job_id} failed: {error}"
                    );
                    None
                }
            },
        };
        let Some(document_id) = document_id else {
            return;
        };
        if let Err(error) = self.command.db.set_job_document_id(new_job_id, &document_id) {
            tracing::warn!("library: link retry job {new_job_id} to {document_id} failed: {error}");
        }
        if let Err(error) = self
            .command
            .db
            .set_document_active_job(&document_id, new_job_id, None)
        {
            tracing::warn!("library: set active job for {document_id} at retry failed: {error}");
        }
    }

    pub fn retry_stage_submission(
        &self,
        base_url: &str,
        source_job_id: &str,
        request: RetryStageRequest,
    ) -> Result<RetryStageSubmissionView, AppError> {
        if !request.mode.trim().is_empty() && request.mode.trim() != "from_stage" {
            return Err(AppError::bad_request(format!(
                "unsupported retry mode: {}",
                request.mode
            )));
        }

        let source_job = load_job_or_404(self.command.db, source_job_id)?;
        if !matches!(request.stage, RetryStageKind::Render)
            && source_job
                .request_payload
                .translation
                .execution_connection
                .is_some()
        {
            return Err(AppError::conflict("Rust model translation retry requires receipt-preserving recovery; legacy retry is disabled even with duplicate-risk acceptance"));
        }
        let ambiguous_ocr = if matches!(request.stage, RetryStageKind::Ocr) {
            ambiguous_ocr_dispatch(self.command.db, source_job_id)?
        } else {
            None
        };
        if ambiguous_ocr.is_some()
            && request.ambiguous_request_policy != AmbiguousRequestPolicy::AcceptDuplicateRisk
        {
            return Err(AppError::conflict(
                "OCR request outcome is ambiguous; retry is paused. Use the OCR ambiguity resolution endpoint to bind an existing provider task, or retry-stage with ambiguous_request_policy=accept_duplicate_risk",
            ));
        }
        let plan = stage_plan(
            &source_job,
            request.stage.clone(),
            self.command.control.data_root,
        );
        if !plan.can_retry {
            return Err(AppError::bad_request(plan.disabled_reason));
        }
        if matches!(request.stage, RetryStageKind::Translation) {
            if let Some(state) =
                load_translation_request_recovery(&source_job, self.command.control.data_root)
            {
                if state.status == "corrupt" {
                    return Err(AppError::conflict(
                        "translation request journal is corrupt; retry remains paused because duplicate-risk acceptance cannot repair control-state corruption",
                    ));
                }
                if state.requires_confirmation
                    && request.ambiguous_request_policy
                        != AmbiguousRequestPolicy::AcceptDuplicateRisk
                {
                    return Err(AppError::conflict(
                        "translation request outcome is ambiguous; retry is paused. Resubmit retry-stage with ambiguous_request_policy=accept_duplicate_risk to acknowledge possible duplicate upstream work or billing",
                    ));
                }
            }
        }

        let request_input = if request.create_new_job {
            build_retry_request(&source_job, &request.stage)?
        } else if matches!(request.stage, RetryStageKind::Render) {
            let mut job = prepare_in_place_render_job(source_job)?;
            apply_retry_overrides_to_resolved_spec(&mut job.request_payload, &request.overrides)?;
            discard_ocr_secret_sources(&mut job.request_payload.ocr);
            discard_translation_secret_sources(&mut job.request_payload.translation);
            job.request_payload.runtime.job_id = job.job_id.clone();
            job.sync_runtime_state();
            let job = start_job_execution(&self.command.submit.launcher, job)?;
            self.link_retry_to_source_document(source_job_id, &job.job_id);
            return Ok(build_retry_stage_submission_view(
                base_url,
                source_job_id,
                &job,
                RetryStageKind::Render,
                plan.will_reuse,
                plan.will_rerun,
                plan.retry_workflow,
                request.ambiguous_request_policy,
            ));
        } else {
            return Err(AppError::bad_request(
                "create_new_job=false is currently supported only for render retry",
            ));
        };

        let mut request_input = request_input;
        apply_retry_overrides(&mut request_input, &request.overrides)?;
        request_input.translation.accepted_ambiguous_request_risk =
            request.ambiguous_request_policy == AmbiguousRequestPolicy::AcceptDuplicateRisk;
        let workflow = request_input.workflow.clone();
        let job = match ambiguous_ocr.as_ref() {
            Some(dispatch) => create_ocr_ambiguity_recovery_job(
                &self.command.submit,
                &request_input,
                dispatch,
                "accept_duplicate_risk",
                None,
            )?,
            None => create_translation_job(&self.command.submit, &request_input)?,
        };
        self.link_retry_to_source_document(source_job_id, &job.job_id);
        Ok(build_retry_stage_submission_view(
            base_url,
            source_job_id,
            &job,
            request.stage,
            plan.will_reuse,
            plan.will_rerun,
            workflow,
            request.ambiguous_request_policy,
        ))
    }
}
