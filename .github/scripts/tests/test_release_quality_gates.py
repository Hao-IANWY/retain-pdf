"""Every publishing path must include the same tests and architecture gates."""
from pathlib import Path
import re

import pytest


WORKFLOWS = Path(__file__).resolve().parents[2] / "workflows"


def job(workflow: str, name: str) -> str:
    source = (WORKFLOWS / workflow).read_text()
    match = re.search(rf"^  {re.escape(name)}:\n(.*?)(?=^  [\w-]+:|\Z)", source, re.M | re.S)
    assert match is not None, f"missing {name} in {workflow}"
    return match.group(1)


@pytest.mark.parametrize("workflow", [
    "publish-current-web.yml", "release-desktop.yml", "release-docker.yml",
])
def test_publish_workflows_require_complete_tests(workflow):
    gate = job(workflow, "quality-gate")
    assert "uses: ./.github/workflows/tests.yml" in gate
    assert re.search(r"^    if:", gate, re.M) is None
    assert "secrets: inherit" not in gate


@pytest.mark.parametrize("workflow,build_job", [
    ("publish-current-web.yml", "publish-web"),
    ("release-docker.yml", "build"),
])
def test_build_and_publish_cannot_bypass_failed_tests(workflow, build_job):
    build = job(workflow, build_job)
    # A build job may also need cheap preparation jobs (release-docker resolves
    # its per-platform matrix in `prepare`), but quality-gate must stay a direct
    # dependency.
    needs = re.search(r"^    needs: (.+)\n", build, re.M)
    assert needs is not None
    assert needs.group(1) == "quality-gate" or re.fullmatch(
        r"\[(?:[\w-]+, )*quality-gate(?:, [\w-]+)*\]", needs.group(1)
    )
    # Step conditions are fine; a job-level override could bypass success().
    assert re.search(r"^    if:", build, re.M) is None
    assert re.search(r"^    continue-on-error:", build, re.M) is None


DESKTOP_BUILD_JOBS = ("build-windows-release", "build-linux-release", "build-macos-release")


def test_desktop_builds_run_in_parallel_but_publish_waits_for_tests():
    """桌面端三个 build 与 quality-gate 并行跑（省掉干等测试的几分钟），门禁收在
    发布 job：它必须同时 needs quality-gate 和全部 build，且不能有 job 级 if /
    continue-on-error 绕过 success()。build 只产出 workflow 内 artifact，
    不得引用 secret，否则「未过测试先构建」就不再无害。"""
    publish = job("release-desktop.yml", "publish-desktop-release")
    needs = re.search(r"^    needs:\n((?:      - [\w-]+\n)+)", publish, re.M)
    assert needs is not None
    listed = set(re.findall(r"- ([\w-]+)", needs.group(1)))
    assert listed == {"quality-gate", *DESKTOP_BUILD_JOBS}
    assert re.search(r"^    if:", publish, re.M) is None
    assert re.search(r"^    continue-on-error:", publish, re.M) is None
    for name in DESKTOP_BUILD_JOBS:
        build = job("release-desktop.yml", name)
        assert re.search(r"^    if:", build, re.M) is None
        assert "secrets." not in build


def test_tests_include_reusable_architecture_gate():
    assert "uses: ./.github/workflows/rust-api-architecture.yml" in job("tests.yml", "architecture")
    source = (WORKFLOWS / "rust-api-architecture.yml").read_text()
    assert "  workflow_call: {}" in source
    assert 'python3 "$RETAIN_PDF_SERVICES_ROOT/api/scripts/check_architecture.py"' in source
    assert 'python3 "$RETAIN_PDF_SERVICES_ROOT/pipeline/devtools/check_pipeline_architecture.py"' in source


@pytest.mark.parametrize("workflow", ["tests.yml", "rust-api-architecture.yml"])
def test_tag_quality_gates_are_not_cancelled_by_other_release_runs(workflow):
    source = (WORKFLOWS / workflow).read_text()
    assert "cancel-in-progress: ${{ github.ref_type != 'tag' }}" in source


def test_docker_matrix_preparation_cannot_skip_the_build():
    """release-docker 的 build 依赖 prepare 产出的平台矩阵；prepare 不能带条件，
    否则它被跳过时 build 也会被跳过，而 merge/publish 都挂在 build 后面。"""
    prepare = job("release-docker.yml", "prepare")
    assert re.search(r"^    if:", prepare, re.M) is None
    assert re.search(r"^    continue-on-error:", prepare, re.M) is None
    for downstream in ("merge", "publish"):
        assert re.search(r"^    continue-on-error:", job("release-docker.yml", downstream), re.M) is None
