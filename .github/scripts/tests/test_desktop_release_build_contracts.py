"""release-desktop 构建步骤里与耗时相关的约束。"""
from pathlib import Path
import re


WORKFLOWS = Path(__file__).resolve().parents[2] / "workflows"


def _job(name: str) -> str:
    source = (WORKFLOWS / "release-desktop.yml").read_text(encoding="utf-8")
    match = re.search(rf"^  {re.escape(name)}:\n(.*?)(?=^  [\w-]+:|\Z)", source, re.M | re.S)
    assert match is not None, f"missing {name}"
    return match.group(1)


def test_macos_python_bundle_uses_prebuilt_wheels_without_homebrew_qpdf():
    """pikepdf 的 macOS wheel 自带 qpdf，brew install qpdf 只是白花 0.4–1.1 分钟；
    改成只装 wheel，缺 wheel 时直接失败，不会悄悄源码编译。"""
    mac = _job("build-macos-release")
    assert "brew install" not in mac
    assert "brew update" not in mac
    assert "qpdf_prefix" not in mac
    for requirements in ("requirements-desktop-posix.txt", "requirements-ai-service.txt"):
        line = next(line for line in mac.splitlines() if f"-r frontend/desktop/{requirements}" in line)
        assert "--only-binary=:all:" in line
    # retainpdf-pipeline 是本仓库源码，必须照常从源码装，不能被 --only-binary 拦掉。
    pipeline = next(line for line in mac.splitlines() if '"$RETAIN_PDF_SERVICES_ROOT/pipeline"' in line)
    assert "--no-deps" in pipeline
    assert "--only-binary" not in pipeline
