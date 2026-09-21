"""终端落在哪个目录。

session 参数是**浏览器传来的**，所以这里一半的测试在守路径穿越 —— 不校验的话
`?session=../../../../etc` 会让 fx 一开机就在任意目录里，而 permission_mode 是
auto（产品决定），没有第二道闸拦它。
"""

from __future__ import annotations

from pathlib import Path

import pytest

from retainpdf_ai.fx_workspace import (
    build_job_workspace_instructions,
    resolve_job_workspace,
)


def _job(data_root: Path, job_id: str) -> Path:
    job = data_root / "jobs" / job_id
    (job / "ocr").mkdir(parents=True, exist_ok=True)
    return job


def test_a_real_job_resolves_to_its_ai_subdirectory(tmp_path: Path) -> None:
    _job(tmp_path, "20260921092508-fe8d63")
    resolved = resolve_job_workspace(tmp_path, "20260921092508-fe8d63")
    assert resolved == tmp_path / "jobs" / "20260921092508-fe8d63" / "ai"


@pytest.mark.parametrize(
    "hostile",
    [
        "../../../../etc",
        "..",
        "../20260921092508-fe8d63",
        "foo/../../bar",
        "/etc/passwd",
        "job/../../..",
        ".",
        "",
        "   ",
    ],
)
def test_path_traversal_is_refused(tmp_path: Path, hostile: str) -> None:
    """session 来自浏览器。放过任何一个，fx 就在别人的目录里开机了。"""
    _job(tmp_path, "20260921092508-fe8d63")
    assert resolve_job_workspace(tmp_path, hostile) is None


def test_a_nonexistent_job_is_refused(tmp_path: Path) -> None:
    """不给一个不存在的 id 凭空建目录树 —— 那等于让任何字符串都能造出工作区。"""
    (tmp_path / "jobs").mkdir()
    assert resolve_job_workspace(tmp_path, "not-a-real-job") is None


def test_a_symlinked_job_that_escapes_is_refused(tmp_path: Path) -> None:
    """id 合法、目录也存在，但它是个指向外面的符号链接。

    只查 id 形状挡不住这个 —— 得在解析之后再确认一次仍在 jobs 里。
    """
    outside = tmp_path / "outside"
    outside.mkdir()
    jobs = tmp_path / "jobs"
    jobs.mkdir()
    (jobs / "escaped").symlink_to(outside, target_is_directory=True)
    assert resolve_job_workspace(tmp_path, "escaped") is None


# ---------------------------------------------------------------- 说明文件


def test_the_instructions_name_every_directory_that_exists(tmp_path: Path) -> None:
    """说明是 agent 唯一的约束（permission_mode=auto，没有闸门）。

    漏掉一个目录，它要么看不见那份数据，要么自己乱猜路径。
    """
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    for directory in (
        "../ocr/",
        "../translated/",
        "../md/",
        "../source/",
        "../rendered/",
        "../artifacts/",
        "../specs/",
        "../logs/",
    ):
        assert directory in text, f"说明里没提 {directory}"


def test_the_instructions_warn_that_compound_commands_produce_no_output(
    tmp_path: Path,
) -> None:
    """这条是整份文档里最值钱的一句。

    实测：`echo A && echo B`、`echo A; echo B`、`echo A | tr a-z A-Z` 全都拿不到
    输出，而且失败表现是「没有任何输出」而不是报错 —— agent 分不清「命令没输出」
    和「被拒了」，于是换着法子重试。一次真实会话里为此烧掉 32 次工具调用。

    不写进来它没法自己发现。
    """
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    assert "单条命令" in text
    for forbidden in ("&&", ";", "|"):
        assert forbidden in text, f"没举例说明 {forbidden} 不能用"


def test_the_instructions_map_the_json_shapes(tmp_path: Path) -> None:
    """同一次会话里 agent 花了七八次调用 `jq keys` 去摸结构。

    这些结构是固定的，直接给出来就不用摸。抽查每个文件的关键字段。
    """
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    for field in (
        "page_count",      # document.v1.json
        "blocks[]",
        "item_id",         # page-XXX-*.json
        "final_status",
        "translated_text",
        "issue_count",     # translation_review.json
        "severity",
    ):
        assert field in text, f"数据地图里没写 {field}"


def test_the_instructions_give_runnable_single_commands(tmp_path: Path) -> None:
    """给的例子必须是能直接抄的单条命令。

    只查 **shell 管道** —— jq 程序里的 `|` 是 jq 自己的语法，在单引号里，
    完全合法。第一版这条把两者混为一谈，误判了正确的例子。
    """
    import re

    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    examples = [
        line.strip()
        for line in text.splitlines()
        if line.strip().startswith("jq ") and "../" in line
    ]
    assert len(examples) >= 4, "可抄的 jq 例子太少"
    for example in examples:
        outside_quotes = re.sub(r"'[^']*'", "", example)
        assert "|" not in outside_quotes, f"例子里带了 shell 管道: {example}"
        assert "&&" not in example and ";" not in example, f"例子是复合命令: {example}"


def test_the_instructions_say_what_breaks_not_just_do_not_touch(tmp_path: Path) -> None:
    """含糊的「请勿修改」对 agent 没有约束力。得说清楚代价。"""
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    assert "page_hash" in text, "没说校验会失败"
    assert "重跑" in text or "重新付费" in text, "没说重跑的代价"


def test_the_instructions_mark_the_writable_place(tmp_path: Path) -> None:
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    assert "只有当前目录" in text


def test_the_instructions_keep_the_untrusted_input_rule(tmp_path: Path) -> None:
    """文档正文来自任意来源的 PDF。这条规则原来的 AGENTS.md 里有，不能丢。"""
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    assert "数据" in text and "指令" in text


# ---------------------------------------------------------------- 权限规则
#
# 注意这一节守的是**形状**，不是「规则生效」。实测没能证明任何一条 deny 拦得住
# 东西（见 fx_workspace 里 DEFAULT_DENIED_COMMANDS 上方的记录）。断言到此为止，
# 免得后来人从测试名里读出一个不存在的保证。


def test_the_shell_tool_class_is_the_real_name() -> None:
    """fx 的工具类名是 `shell`，不是文档里那个 `bash`。

    这条最值钱：**fx 不校验类名**。写错了它不报错，规则静默失效，而
    `fx permissions` 还会把它逐条列出来 —— 看起来完全正常。我第一版写的就是
    bash/edit/write，全错，是从 fx 发给模型的工具清单里才拿到真名的。
    """
    from retainpdf_ai.fx_workspace import SHELL_TOOL_CLASS, build_terminal_permissions

    assert SHELL_TOOL_CLASS == "shell"
    block = build_terminal_permissions(("rm *",))
    assert "shell" in block
    assert "bash" not in block, "bash 是错的类名，写进去等于什么都没做"


def test_deny_rules_come_after_the_catch_all_allow() -> None:
    """fx 的规则是「最后匹配的赢」，所以 deny 必须排在兜底 allow 之后。

    顺序反了的话整块规则等于没写 —— 而且照样不报错。
    """
    from retainpdf_ai.fx_workspace import build_terminal_permissions

    keys = list(build_terminal_permissions(("rm *", "sudo *"))["shell"])
    assert keys[0] == "*", "兜底 allow 得在最前"
    assert keys.index("rm *") > 0 and keys.index("sudo *") > 0


def test_the_settings_merge_keeps_fx_own_preferences(tmp_path: Path) -> None:
    """settings.json 里还有 fx 自己存的 provider / 模型 / effort 档位。

    整个写掉的话，用户在 TUI 里 `/model ... ` 选的思考档位每次开终端都会丢。
    """
    import json

    from retainpdf_ai.fx_workspace import apply_terminal_permissions

    home = tmp_path / "home"
    (home / ".fx").mkdir(parents=True)
    settings = home / ".fx" / "settings.json"
    settings.write_text(
        json.dumps({"provider": "gateway", "effort": "high", "fast_mode": False})
    )
    apply_terminal_permissions(home, ("rm *",))
    saved = json.loads(settings.read_text())
    assert saved["provider"] == "gateway"
    assert saved["effort"] == "high", "用户选的思考档位被覆盖了"
    assert saved["fast_mode"] is False
    assert saved["permission"]["shell"]["rm *"] == "deny"


def test_a_corrupt_settings_file_is_rebuilt(tmp_path: Path) -> None:
    """坏文件就当空的重建。带着它继续跑会让权限块也写不进去。"""
    import json

    from retainpdf_ai.fx_workspace import apply_terminal_permissions

    home = tmp_path / "home"
    (home / ".fx").mkdir(parents=True)
    (home / ".fx" / "settings.json").write_text("{ not json")
    apply_terminal_permissions(home, ("rm *",))
    assert json.loads((home / ".fx" / "settings.json").read_text())["permission"]


def test_denying_nothing_is_expressible(tmp_path: Path) -> None:
    """空清单是用户明确说「什么都不挡」，不该退回默认。"""
    import json

    from retainpdf_ai.fx_workspace import apply_terminal_permissions

    home = tmp_path / "home"
    apply_terminal_permissions(home, ())
    block = json.loads((home / ".fx" / "settings.json").read_text())["permission"]
    assert block["shell"] == {"*": "allow"}
