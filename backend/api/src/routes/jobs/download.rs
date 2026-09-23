use crate::error::AppError;
use crate::models::api::{ArtifactDownloadQuery, LayoutDocxQuery, MarkdownQuery, PagePreviewQuery};
use crate::models::api::ApiResponse;
use crate::services::jobs::{AiBoardListing, DocumentDownloadKind};
use crate::AppState;
use axum::extract::State;
use axum::http::HeaderMap;
use axum::response::Response;
use axum::Json;

use crate::routes::common::{build_jobs_download_route_deps, ApiPath, ApiQuery};
use crate::routes::download_response::{
    bundle_response, cover_response, download_document_response, markdown_document_response,
    layout_docx_response, markdown_image_response, markdown_response, page_preview_response,
    ai_board_file_response, registered_artifact_response, side_by_side_pdf_response,
    thumbnail_response,
};

pub async fn download_pdf(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    download_document_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        false,
        DocumentDownloadKind::OutputPdf,
    )
    .await
}

pub async fn download_side_by_side_pdf(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    side_by_side_pdf_response(&build_jobs_download_route_deps(&state), &headers, &job_id).await
}

pub async fn download_layout_docx(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
    ApiQuery(query): ApiQuery<LayoutDocxQuery>,
) -> Result<Response, AppError> {
    layout_docx_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        &query,
    )
    .await
}

pub async fn download_cover(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    cover_response(&build_jobs_download_route_deps(&state), &headers, &job_id).await
}

pub async fn download_thumbnail(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    thumbnail_response(&build_jobs_download_route_deps(&state), &headers, &job_id).await
}

pub async fn download_page_preview(
    State(state): State<AppState>,
    ApiPath((job_id, page)): ApiPath<(String, u32)>,
    headers: HeaderMap,
    ApiQuery(query): ApiQuery<PagePreviewQuery>,
) -> Result<Response, AppError> {
    page_preview_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        page,
        &query,
    )
    .await
}

pub async fn download_artifact_by_key(
    State(state): State<AppState>,
    ApiPath((job_id, artifact_key)): ApiPath<(String, String)>,
    headers: HeaderMap,
    ApiQuery(query): ApiQuery<ArtifactDownloadQuery>,
) -> Result<Response, AppError> {
    registered_artifact_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        &artifact_key,
        query.include_job_dir,
        false,
    )
    .await
}

pub async fn download_ocr_artifact_by_key(
    State(state): State<AppState>,
    ApiPath((job_id, artifact_key)): ApiPath<(String, String)>,
    headers: HeaderMap,
    ApiQuery(query): ApiQuery<ArtifactDownloadQuery>,
) -> Result<Response, AppError> {
    registered_artifact_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        &artifact_key,
        query.include_job_dir,
        true,
    )
    .await
}

pub async fn download_normalized_document(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    download_document_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        false,
        DocumentDownloadKind::NormalizedDocument,
    )
    .await
}

pub async fn download_ocr_normalized_document(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    download_document_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        true,
        DocumentDownloadKind::NormalizedDocument,
    )
    .await
}

pub async fn download_ai_reading_path(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    download_document_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        false,
        DocumentDownloadKind::AiReadingPath,
    )
    .await
}

pub async fn download_ai_canvas(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    download_document_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        false,
        DocumentDownloadKind::AiCanvas,
    )
    .await
}

pub async fn download_ai_notes(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    download_document_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        false,
        DocumentDownloadKind::AiNotes,
    )
    .await
}

pub async fn download_normalization_report(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    download_document_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        false,
        DocumentDownloadKind::NormalizationReport,
    )
    .await
}

pub async fn download_ocr_normalization_report(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    download_document_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        true,
        DocumentDownloadKind::NormalizationReport,
    )
    .await
}

pub async fn download_markdown(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
    ApiQuery(query): ApiQuery<MarkdownQuery>,
) -> Result<Response, AppError> {
    markdown_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        job_id,
        &query,
    )
    .await
}

pub async fn get_markdown_document(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    markdown_document_response(&build_jobs_download_route_deps(&state), &headers, &job_id).await
}

pub async fn download_markdown_image(
    State(state): State<AppState>,
    ApiPath((job_id, path)): ApiPath<(String, String)>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    markdown_image_response(
        &build_jobs_download_route_deps(&state),
        &headers,
        &job_id,
        &path,
    )
    .await
}

/// agent 画板里有什么。目录不存在返回空列表，不是 404 —— 画板是叠加层，
/// 「还没往里放过」是正常状态。
pub async fn list_ai_board(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
) -> Result<Json<ApiResponse<AiBoardListing>>, AppError> {
    let deps = build_jobs_download_route_deps(&state);
    Ok(Json(ApiResponse::ok(deps.downloads.ai_board_listing(&job_id)?)))
}

/// 取画板里的一个文件。**这是唯一接受调用方文件名的 agent 产物端点**，
/// 防护（单层名、拒符号链接、解析后仍在目录内）在 services 那边，见
/// `services/jobs/downloads/ai_board.rs`。
pub async fn download_ai_board_file(
    State(state): State<AppState>,
    ApiPath((job_id, name)): ApiPath<(String, String)>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    ai_board_file_response(&build_jobs_download_route_deps(&state), &headers, &job_id, &name).await
}

pub async fn download_bundle(
    State(state): State<AppState>,
    ApiPath(job_id): ApiPath<String>,
    headers: HeaderMap,
) -> Result<Response, AppError> {
    bundle_response(&build_jobs_download_route_deps(&state), &headers, &job_id).await
}
