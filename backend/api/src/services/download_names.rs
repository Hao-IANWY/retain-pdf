//! 用户下载的文件名：`类型前缀_书名_后缀.扩展名`，所有入口一个规则。
//!
//! 以前同一本书的几个文件分别叫 `McQuarrie…-translated.pdf`、`zh_McQuarrie….pdf`、
//! `20261006023250-703433-side-by-side.pdf`、`full.md` —— 原文件名、任务号、固定名三种依据，
//! 同一个译文 PDF 从不同按钮点还有两个名字，下载几份之后在文件夹里对不上是哪本书。
//!
//! - 书名用详情页显示的那个（文档标题，会被自动整理 / 手改），没有就退回上传文件名、任务号；
//! - 前缀表示内容：`orig_` 原文、`zh_` 译文、`dual_` 对照，完整包两者都有、不加前缀。
//!   不写源语言代码（`en_`）：任务里没有记录源语言，库里也可能有日文、德文的书；
//!   译文固定是简体中文（提示词里写死），`zh_` 是真的；
//! - 排查用的文件（events.jsonl、paddle_result.json 等）不走这里，保持原名。

use crate::db::Db;
use crate::models::domain::JobSnapshot;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum DownloadKind {
    Source,
    Translated,
    SideBySide,
    Layout,
    OcrMarkdown,
    MarkdownBundle,
    Bundle,
}

impl DownloadKind {
    fn prefix(self) -> Option<&'static str> {
        match self {
            Self::Source | Self::OcrMarkdown | Self::MarkdownBundle => Some("orig"),
            Self::Translated | Self::Layout => Some("zh"),
            Self::SideBySide => Some("dual"),
            Self::Bundle => None,
        }
    }

    fn suffix(self) -> &'static str {
        match self {
            Self::Source => "source",
            Self::Translated => "translated",
            Self::SideBySide => "side-by-side",
            Self::Layout => "layout",
            Self::OcrMarkdown => "ocr",
            Self::MarkdownBundle => "markdown",
            Self::Bundle => "bundle",
        }
    }

    fn extension(self) -> &'static str {
        match self {
            Self::Source | Self::Translated | Self::SideBySide => "pdf",
            Self::Layout => "docx",
            Self::OcrMarkdown => "md",
            Self::MarkdownBundle | Self::Bundle => "zip",
        }
    }
}

/// 书名部分最多这么多个字符：再长的话加上前后缀，有的文件系统（255 字节）会放不下。
const MAX_TITLE_CHARS: usize = 120;

pub(crate) fn download_file_name(title: &str, kind: DownloadKind) -> String {
    let title = clean_title(title);
    match kind.prefix() {
        Some(prefix) => format!("{prefix}_{title}_{}.{}", kind.suffix(), kind.extension()),
        None => format!("{title}_{}.{}", kind.suffix(), kind.extension()),
    }
}

/// 去掉文件系统不认的字符和控制字符、去掉 `.pdf` 扩展名、压缩空白、截断；空了就是 `document`。
fn clean_title(title: &str) -> String {
    let trimmed = title.trim();
    let without_ext = trimmed
        .strip_suffix(".pdf")
        .or_else(|| trimmed.strip_suffix(".PDF"))
        .unwrap_or(trimmed);
    let replaced: String = without_ext
        .chars()
        .map(|ch| match ch {
            '/' | '\\' | ':' | '*' | '?' | '"' | '<' | '>' | '|' => ' ',
            ch if ch.is_control() => ' ',
            ch => ch,
        })
        .collect();
    let collapsed = replaced.split_whitespace().collect::<Vec<_>>().join(" ");
    let truncated: String = collapsed.chars().take(MAX_TITLE_CHARS).collect();
    let cleaned = truncated.trim().trim_matches('.').trim().to_string();
    if cleaned.is_empty() {
        "document".to_string()
    } else {
        cleaned
    }
}

/// 任务所属那本书的名字 —— 和书籍详情 / 书架卡片同一个规则（services::artifacts 的书名）。
pub(crate) fn job_title(db: &Db, job: &JobSnapshot) -> String {
    crate::services::artifacts::job_display_title(db, job)
}

pub(crate) fn job_download_file_name(db: &Db, job: &JobSnapshot, kind: DownloadKind) -> String {
    download_file_name(&job_title(db, job), kind)
}

#[cfg(test)]
mod tests {
    use super::*;

    const TITLE: &str = "The Harmonic Oscillator and Vibrational Spectroscopy";

    #[test]
    fn every_kind_follows_prefix_title_suffix() {
        let names: Vec<_> = [
            DownloadKind::Source,
            DownloadKind::Translated,
            DownloadKind::SideBySide,
            DownloadKind::Layout,
            DownloadKind::OcrMarkdown,
            DownloadKind::MarkdownBundle,
            DownloadKind::Bundle,
        ]
        .into_iter()
        .map(|kind| download_file_name(TITLE, kind))
        .collect();
        assert_eq!(
            names,
            vec![
                format!("orig_{TITLE}_source.pdf"),
                format!("zh_{TITLE}_translated.pdf"),
                format!("dual_{TITLE}_side-by-side.pdf"),
                format!("zh_{TITLE}_layout.docx"),
                format!("orig_{TITLE}_ocr.md"),
                format!("orig_{TITLE}_markdown.zip"),
                format!("{TITLE}_bundle.zip"),
            ]
        );
    }

    #[test]
    fn title_is_cleaned_for_file_systems() {
        assert_eq!(
            download_file_name("a/b: c?  \"d\"\n.pdf", DownloadKind::Source),
            "orig_a b c d_source.pdf"
        );
        assert_eq!(download_file_name("   ", DownloadKind::Bundle), "document_bundle.zip");
        assert_eq!(download_file_name("共轭在卤素.pdf", DownloadKind::Translated), "zh_共轭在卤素_translated.pdf");
        let long = "长".repeat(300);
        let name = download_file_name(&long, DownloadKind::Translated);
        assert_eq!(name.chars().count(), "zh__translated.pdf".chars().count() + MAX_TITLE_CHARS);
    }
}
