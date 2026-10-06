use anyhow::Result;
use rusqlite::{params, Connection, OptionalExtension};

use crate::models::api::{BlockSearchHit, DocumentRecord};

pub(in crate::db) const DOCUMENT_COLUMNS: &str = "d.document_id, d.title, COALESCE((SELECT ts.source FROM document_title_state ts WHERE ts.document_id = d.document_id), 'filename'), COALESCE((SELECT ts.locked FROM document_title_state ts WHERE ts.document_id = d.document_id), 0), d.authors_json, d.year, d.doi, d.source_filename, d.page_count, d.bytes, d.active_job_id, d.active_version_id, d.reading_status, d.added_at, d.last_opened_at, d.updated_at";

/// sha2 0.11 的输出类型不再实现 LowerHex,统一走手动十六进制编码。
pub fn sha256_hex(bytes: &[u8]) -> String {
    use sha2::{Digest, Sha256};
    let mut hasher = Sha256::new();
    hasher.update(bytes);
    hasher
        .finalize()
        .iter()
        .map(|byte| format!("{byte:02x}"))
        .collect()
}

pub(in crate::db) fn default_title_from_filename(filename: &str) -> String {
    filename
        .strip_suffix(".pdf")
        .or_else(|| filename.strip_suffix(".PDF"))
        .unwrap_or(filename)
        .trim()
        .to_string()
}

pub(in crate::db) fn query_document(
    conn: &Connection,
    document_id: &str,
) -> Result<Option<DocumentRecord>> {
    let record = conn
        .query_row(
            &format!("SELECT {DOCUMENT_COLUMNS} FROM documents d WHERE d.document_id = ?1"),
            params![document_id],
            row_to_document,
        )
        .optional()?;
    let Some(record) = record else {
        return Ok(None);
    };
    Ok(Some(record))
}


pub(in crate::db) fn row_to_document(row: &rusqlite::Row<'_>) -> rusqlite::Result<DocumentRecord> {
    Ok(DocumentRecord {
        document_id: row.get(0)?,
        title: row.get(1)?,
        title_source: row.get(2)?,
        title_locked: row.get::<_, i64>(3)? != 0,
        authors_json: row.get(4)?,
        year: row.get(5)?,
        doi: row.get(6)?,
        source_filename: row.get(7)?,
        page_count: row.get::<_, i64>(8)? as u32,
        bytes: row.get::<_, i64>(9)? as u64,
        active_job_id: row.get(10)?,
        active_version_id: row.get(11)?,
        reading_status: row.get(12)?,
        added_at: row.get(13)?,
        last_opened_at: row.get(14)?,
        updated_at: row.get(15)?,
        source_pdf_url: String::new(),
        cover_url: String::new(),
        thumbnail_url: String::new(),
    })
}

pub(super) fn row_to_search_hit(row: &rusqlite::Row<'_>) -> rusqlite::Result<BlockSearchHit> {
    Ok(BlockSearchHit {
        document_id: row.get(0)?,
        job_id: row.get(1)?,
        page_idx: row.get(2)?,
        block_id: row.get(3)?,
        source_snippet: row.get(4)?,
        translated_snippet: row.get(5)?,
    })
}

