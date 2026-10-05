use super::*;

struct Dir(PathBuf);

impl Dir {
    fn new() -> Self {
        let path = std::env::temp_dir().join(format!("retain-merged-{:016x}", fastrand::u64(..)));
        std::fs::create_dir(&path).unwrap();
        Self(path)
    }

    fn file(&self, name: &str, bytes: &[u8]) -> PathBuf {
        let path = self.0.join(name);
        std::fs::write(&path, bytes).unwrap();
        path
    }
}

impl Drop for Dir {
    fn drop(&mut self) {
        let _ = std::fs::remove_dir_all(&self.0);
    }
}

fn cov(job_id: &str, pdf: &Path, pages: &[u32]) -> JobCoverage {
    JobCoverage {
        job_id: job_id.to_string(),
        created_at: "2026-10-01T00:00:00".to_string(),
        producer_created_at: "2026-10-01T00:00:00".to_string(),
        pages: pages.to_vec(),
        output_pdf: pdf.to_path_buf(),
    }
}

fn job(id: &str, local: usize) -> PageSource {
    PageSource::Job { job_id: id.to_string(), local_index: local }
}

#[test]
fn the_fingerprint_changes_when_the_plan_changes() {
    let dir = Dir::new();
    let source = dir.file("source.pdf", b"src");
    let a = dir.file("a.pdf", b"a");
    let coverages = [cov("a", &a, &[1, 2])];
    let both = [job("a", 0), job("a", 1)];
    let first_only = [job("a", 0), PageSource::Original];
    assert_ne!(
        merge_fingerprint(&source, &both, &coverages).unwrap(),
        merge_fingerprint(&source, &first_only, &coverages).unwrap()
    );
}

#[test]
fn the_fingerprint_changes_when_a_participating_pdf_is_rewritten() {
    // 原地重新排版会重写同一路径的输出 PDF —— 指纹必须跟着变，否则一直给旧排版。
    let dir = Dir::new();
    let source = dir.file("source.pdf", b"src");
    let a = dir.file("a.pdf", b"a");
    let coverages = [cov("a", &a, &[1])];
    let plan = [job("a", 0)];
    let before = merge_fingerprint(&source, &plan, &coverages).unwrap();
    std::fs::write(&a, b"rewritten, longer").unwrap();
    assert_ne!(before, merge_fingerprint(&source, &plan, &coverages).unwrap());
}

#[test]
fn deleting_a_newer_job_changes_the_fingerprint_even_though_every_input_is_older() {
    // mtime 比较在这里会说「缓存还新鲜」—— 剩下的输入都比产物旧。指纹不会。
    let dir = Dir::new();
    let source = dir.file("source.pdf", b"src");
    let old = dir.file("old.pdf", b"old");
    let new = dir.file("new.pdf", b"new");
    let with_new = merge_fingerprint(
        &source,
        &[job("new", 0)],
        &[cov("old", &old, &[1]), cov("new", &new, &[1])],
    )
    .unwrap();
    let after_delete = merge_fingerprint(&source, &[job("old", 0)], &[cov("old", &old, &[1])]).unwrap();
    assert_ne!(with_new, after_delete);
}

#[test]
fn unreferenced_jobs_do_not_affect_the_fingerprint() {
    // 一个被完全盖掉的旧任务被重写，不该让合并结果重新生成。
    let dir = Dir::new();
    let source = dir.file("source.pdf", b"src");
    let used = dir.file("used.pdf", b"u");
    let shadowed = dir.file("shadowed.pdf", b"s");
    let plan = [job("used", 0)];
    let coverages = [cov("used", &used, &[1]), cov("shadowed", &shadowed, &[1])];
    let before = merge_fingerprint(&source, &plan, &coverages).unwrap();
    std::fs::write(&shadowed, b"rewritten shadowed").unwrap();
    assert_eq!(before, merge_fingerprint(&source, &plan, &coverages).unwrap());
}

#[test]
fn a_plan_referencing_an_unknown_job_is_an_error() {
    let dir = Dir::new();
    let source = dir.file("source.pdf", b"src");
    assert!(merge_fingerprint(&source, &[job("ghost", 0)], &[]).is_err());
}

#[test]
fn plan_json_matches_the_python_contract() {
    let dir = Dir::new();
    let a = dir.file("a.pdf", b"a");
    let json: serde_json::Value = serde_json::from_str(
        &plan_json(&[PageSource::Original, job("a", 3)], &[cov("a", &a, &[2, 3, 4, 5])]).unwrap(),
    )
    .unwrap();
    assert_eq!(
        json,
        serde_json::json!({ "pages": [null, { "pdf": a, "index": 3 }] })
    );
}

#[test]
fn uses_the_merge_subcommand_of_the_installed_pipeline() {
    let deps = DerivedArtifactDeps::with_pipeline_command("python3", "/opt/bin/retainpdf-pipeline");
    let command = merge_command(deps);
    assert_eq!(command.get_program(), "/opt/bin/retainpdf-pipeline");
    assert_eq!(
        command.get_args().collect::<Vec<_>>(),
        vec![std::ffi::OsStr::new("merge-translated-pdf")]
    );
}

/// 和 `model_executor` 那个 worker bridge 测试同一套找法：环境缺了就红，不静默跳过。
fn project_venv_bin(name: &str) -> PathBuf {
    let root = Path::new(env!("CARGO_MANIFEST_DIR")).join("../..");
    std::env::var_os("UV_PROJECT_ENVIRONMENT")
        .map(PathBuf::from)
        .into_iter()
        .chain([root.join("backend/.venv"), root.join(".venv")])
        .map(|venv| venv.join("bin").join(name))
        .find(|path| path.is_file())
        .expect("a project Python environment is required (set UV_PROJECT_ENVIRONMENT or create <repo>/backend/.venv)")
}

fn python(script: &str, args: &[&Path]) -> String {
    let output = Command::new(project_venv_bin("python"))
        .arg("-c")
        .arg(script)
        .args(args)
        .output()
        .unwrap();
    assert!(output.status.success(), "{}", String::from_utf8_lossy(&output.stderr));
    String::from_utf8(output.stdout).unwrap()
}

const MAKE_PDF: &str = r#"
import sys, fitz
doc = fitz.open()
for text in sys.argv[2:]:
    doc.new_page(width=595, height=842).insert_text((72, 100), text, fontsize=24)
doc.save(sys.argv[1])
"#;

const PAGE_TEXTS: &str = r#"
import sys, fitz
print("|".join(page.get_text().strip() for page in fitz.open(sys.argv[1])))
"#;

fn make_pdf(path: &Path, texts: &[&str]) {
    let mut command = Command::new(project_venv_bin("python"));
    command.arg("-c").arg(MAKE_PDF).arg(path).args(texts);
    let output = command.output().unwrap();
    assert!(output.status.success(), "{}", String::from_utf8_lossy(&output.stderr));
}

use std::process::Command;

#[test]
fn end_to_end_the_real_pipeline_stitches_a_full_length_pdf_and_caches_it() {
    let dir = Dir::new();
    let data_root = dir.0.join("data");
    let source = dir.0.join("source.pdf");
    let mid = dir.0.join("mid.pdf");
    make_pdf(&source, &["SRC 1", "SRC 2", "SRC 3", "SRC 4"]);
    // 一个从文档中间开始的范围任务：它输出 PDF 的第 0 页是文档第 2 页。
    make_pdf(&mid, &["ZH 2", "ZH 3"]);
    let coverages = [cov("mid", &mid, &[2, 3])];
    let plan = crate::services::document_pages::merge_plan(4, &coverages);
    let pipeline = project_venv_bin("retainpdf-pipeline");
    let deps = DerivedArtifactDeps::with_pipeline_command("python3", pipeline.to_str().unwrap());

    let merged =
        ensure_merged_translated_pdf(deps, &data_root, "doc1", &source, &plan, &coverages).unwrap();
    assert_eq!(python(PAGE_TEXTS, &[&merged]).trim(), "SRC 1|ZH 2|ZH 3|SRC 4");
    assert!(merged.starts_with(data_root.join("documents/doc1/merged")));

    // 第二次直接命中缓存：同一个文件，没有重写。
    let stamp = std::fs::metadata(&merged).unwrap().modified().unwrap();
    let again =
        ensure_merged_translated_pdf(deps, &data_root, "doc1", &source, &plan, &coverages).unwrap();
    assert_eq!(again, merged);
    assert_eq!(std::fs::metadata(&again).unwrap().modified().unwrap(), stamp);

    // 计划文件不留在磁盘上。
    let leftovers: Vec<_> = std::fs::read_dir(merged.parent().unwrap())
        .unwrap()
        .map(|entry| entry.unwrap().file_name())
        .filter(|name| name.to_string_lossy().contains("plan"))
        .collect();
    assert!(leftovers.is_empty(), "残留计划文件: {leftovers:?}");
}

#[test]
fn end_to_end_a_page_count_mismatch_surfaces_the_python_error() {
    let dir = Dir::new();
    let source = dir.0.join("source.pdf");
    let rendered = dir.0.join("r.pdf");
    make_pdf(&source, &["SRC 1", "SRC 2"]);
    make_pdf(&rendered, &["ZH 1"]);
    let coverages = [cov("r", &rendered, &[1])];
    // 计划比源 PDF 少一页 —— 拼接器必须拒绝，错误里要带出原因。
    let plan = [job("r", 0)];
    let pipeline = project_venv_bin("retainpdf-pipeline");
    let deps = DerivedArtifactDeps::with_pipeline_command("python3", pipeline.to_str().unwrap());
    let error = ensure_merged_translated_pdf(deps, &dir.0.join("data"), "doc1", &source, &plan, &coverages)
        .unwrap_err()
        .to_string();
    assert!(error.contains("plan has 1 pages but source pdf has 2"), "{error}");
}
