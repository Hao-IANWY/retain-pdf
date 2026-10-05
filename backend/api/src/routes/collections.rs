//! 分类文件夹(合集)CRUD——collections/collection_documents 表早已随图书馆
//! 数据层建好(见 db/schema.rs),这里只是补上一直缺失的路由层。
//!
//! All handlers go through library_api (PR5).

use axum::extract::State;
use axum::Json;

use crate::error::AppError;
use crate::models::api::{
    AddCollectionDocumentsInput, ApiResponse, CollectionListView, CollectionMutationResult,
    CollectionRecord, CreateCollectionInput, PatchCollectionInput,
};
use crate::routes::common::{build_library_route_deps, ok_json, ApiJson, ApiPath};
use crate::services::library::api::{
    add_collection_documents_view, create_collection_view, delete_collection_view,
    list_collections_view, patch_collection_view, remove_collection_document_view,
};
use crate::services::collection_workspace::{
    ensure_collection_workspace, CollectionWorkspace, ReadingBook,
};
use crate::AppState;

pub async fn create_collection_route(
    State(state): State<AppState>,
    ApiJson(payload): ApiJson<CreateCollectionInput>,
) -> Result<Json<ApiResponse<CollectionRecord>>, AppError> {
    let deps = build_library_route_deps(&state);
    Ok(ok_json(create_collection_view(&deps.library, &payload)?))
}

pub async fn list_collections_route(
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<CollectionListView>>, AppError> {
    let deps = build_library_route_deps(&state);
    Ok(ok_json(list_collections_view(&deps.library)?))
}

pub async fn patch_collection_route(
    State(state): State<AppState>,
    ApiPath(collection_id): ApiPath<String>,
    ApiJson(payload): ApiJson<PatchCollectionInput>,
) -> Result<Json<ApiResponse<CollectionRecord>>, AppError> {
    let deps = build_library_route_deps(&state);
    Ok(ok_json(patch_collection_view(
        &deps.library,
        &collection_id,
        &payload,
    )?))
}

pub async fn delete_collection_route(
    State(state): State<AppState>,
    ApiPath(collection_id): ApiPath<String>,
) -> Result<Json<ApiResponse<CollectionMutationResult>>, AppError> {
    let deps = build_library_route_deps(&state);
    Ok(ok_json(delete_collection_view(
        &deps.library,
        &collection_id,
    )?))
}

pub async fn add_collection_documents_route(
    State(state): State<AppState>,
    ApiPath(collection_id): ApiPath<String>,
    ApiJson(payload): ApiJson<AddCollectionDocumentsInput>,
) -> Result<Json<ApiResponse<CollectionRecord>>, AppError> {
    let deps = build_library_route_deps(&state);
    Ok(ok_json(add_collection_documents_view(
        &deps.library,
        &collection_id,
        payload,
    )?))
}

pub async fn remove_collection_document_route(
    State(state): State<AppState>,
    ApiPath((collection_id, document_id)): ApiPath<(String, String)>,
) -> Result<Json<ApiResponse<CollectionMutationResult>>, AppError> {
    let deps = build_library_route_deps(&state);
    Ok(ok_json(remove_collection_document_view(
        &deps.library,
        &collection_id,
        &document_id,
    )?))
}

/// 物化这个文件夹的 agent 工作区，返回清单。
///
/// 每次调用都重建 `books/` —— 成员和 active_job 都会变，而那个目录是纯派生物。
/// 所以前端在开终端**之前**打一次就行，不需要额外的失效逻辑。
pub async fn collection_agent_workspace_route(
    State(state): State<AppState>,
    ApiPath(collection_id): ApiPath<String>,
) -> Result<Json<ApiResponse<CollectionWorkspace>>, AppError> {
    let db = state.db.clone();
    let config = state.config.clone();
    // 多次范围翻译的书要按需生成合并目录（子进程），放进阻塞线程。
    let workspace = tokio::task::spawn_blocking(move || {
        let deps = crate::services::derived_artifacts::DerivedArtifactDeps::with_pipeline_command(
            &config.python_bin,
            &config.pipeline_command,
        );
        let reading_book = |document: &crate::models::api::DocumentRecord| {
            let upload = db.find_upload_for_document(&document.document_id).ok()??;
            let target = crate::services::merge::reading::resolve_reading_target(
                &db,
                &config.data_root,
                deps,
                &document.document_id,
                std::path::Path::new(&upload.stored_path),
            )
            .ok()?;
            match target {
                crate::services::merge::reading::ReadingTarget::Merged { job_id, merged } => {
                    Some(ReadingBook { job_id, root: merged.root })
                }
                // 单个任务、没有译文：交回原来那套按 active_job 的逻辑。
                _ => None,
            }
        };
        ensure_collection_workspace(&db, &config.data_root, &collection_id, &reading_book)
    })
    .await
    .map_err(|_| AppError::internal("collection workspace task failed"))??;
    Ok(ok_json(workspace))
}
