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


# ---------------------------------------------------------------- 界面契约
#
# canvas.v1.json / reading-path.v1.json 是 agent 写、前端读的。字段名分别写在两
# 个语言的两个文件里，没有共享定义 —— 所以这里跨文件对一遍。不对的话表现是
# 「agent 照文档写了，界面什么都不显示」，而且两边看起来都没错。


def _reader_domain_dir():
    """前端 reader 功能的 domain 目录。找不到就让测试红 —— 不 skip。

    skip 的话文档漂了没人知道，而这正是这一节唯一要防的事。
    """
    from pathlib import Path as _Path

    here = _Path(__file__).resolve()
    for parent in here.parents:
        candidate = parent / "frontend/web/src/features/reader/domain"
        if candidate.is_dir():
            return candidate
    raise AssertionError(f"找不到前端 domain 目录（从 {here} 往上找）")


def _parser_source() -> str:
    """画布相关的前端源码，整个目录拼起来。

    **不认具体文件名**：这些模块会被拆分（canvas-doc 就拆成过 doc/render/cards），
    写死文件名的话拆一次这条门禁就指向空气。上一次拆分正是这么把它弄红的，
    而当时只跑了前端测试没跑这边。
    """
    return "\n".join(
        path.read_text(encoding="utf-8")
        for path in sorted(_reader_domain_dir().glob("reading-canvas*.ts"))
    )


def test_the_canvas_fields_match_what_the_frontend_actually_parses(
    tmp_path: Path,
) -> None:
    """文档里的字段名 = 解析器真正读的字段名。"""
    import re

    parser = _parser_source()
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))

    # 解析器里 `node.xxx` / `edge.xxx` / `anchor.xxx` 的那些取值。
    read_fields = set(re.findall(r"\b(?:node|edge|anchor)\.([a-z_]+)", parser))
    assert read_fields >= {"id", "text", "kind", "from", "to", "label"}, read_fields
    for field in read_fields:
        assert field in text, f"解析器读 {field}，但工作区说明里没写"


def _indented_json_example(text: str, marker: str) -> dict:
    """把说明里那段缩进 4 格的 JSON 例子抠出来解析。

    不用正则找结尾：`.*?\]\}` 这种非贪婪写法会在**内层**的 `}]}` 提前收尾，
    例子只截到一半（notes 的例子就是这么漏的；canvas 的例子当时碰巧没踩到）。
    按缩进取到块尾才可靠。
    """
    import json

    lines = text.splitlines()
    start = next(i for i, line in enumerate(lines) if marker in line)
    body = []
    for line in lines[start:]:
        if line.strip() and not line.startswith("    "):
            break
        body.append(line[4:])
        # 逐行试解析，第一次成功就收尾。按缩进取到块尾会一路吃进后面的字段表
        # （那张表也缩进 4 格）。
        try:
            return json.loads("\n".join(body))
        except ValueError:
            continue
    raise AssertionError(f"{marker} 的例子解析不出来：\n" + "\n".join(body))


def test_the_canvas_schema_is_documented_with_a_copyable_example(
    tmp_path: Path,
) -> None:
    """给个能直接抄的例子。只描述字段的话模型还是会猜结构。"""
    import json
    import re

    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    assert "canvas.v1.json" in text
    assert "retainpdf_reading_canvas_v1" in text

    # 把缩进的 JSON 块抠出来，确认它真能 parse —— 例子本身写错过一次就全白费。
    payload = _indented_json_example(text, '"retainpdf_reading_canvas_v1"')
    assert payload["nodes"][0]["id"]
    assert payload["nodes"][0]["anchor"]["block_id"]
    assert payload["edges"][0]["from"] == payload["nodes"][0]["id"]


def test_the_instructions_say_not_to_invent_coordinates(tmp_path: Path) -> None:
    """坐标是我们算的。不说清楚，模型会自己塞 x/y，然后奇怪为什么没生效。"""
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    assert "只写语义" in text
    assert "坐标" in text


def test_the_instructions_tie_anchors_to_real_block_ids(tmp_path: Path) -> None:
    """锚点是这个功能的全部价值。编出来的 block_id 点了不跳，而且看不出为什么。"""
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    assert "block_id" in text
    canvas_section = text[text.index("canvas.v1.json") :]
    assert "document.v1.json" in canvas_section, "没说 block_id 要从哪儿取"


def test_the_instructions_cap_how_much_gets_drawn(tmp_path: Path) -> None:
    """「产生的东西太多了看不过来」是真实反馈。

    模型不会自己节制 —— 它默认把知道的都倒出来。不写上限，画布就退化成一张
    拥挤的文档，而画布的全部价值是一眼看完。
    """
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    canvas = text[text.index("canvas.v1.json") :]
    assert "8 个节点" in canvas, "没写节点数量上限"
    assert "20 字" in canvas, "没写每个节点的长度上限"
    assert "截断" in canvas, "没说超了会被截断，模型不知道后果"


def test_the_instructions_push_for_figures_over_prose(tmp_path: Path) -> None:
    """一张图顶一段话。不明说的话模型只会写字 —— 它更擅长写字。"""
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    canvas = text[text.index("canvas.v1.json") :]
    assert "image" in canvas
    assert "md/images" in canvas, "没说图在哪儿"
    # 查那条 jq 命令本身，不是散文里出现过 asset_key 就算数 —— 第一版这么写的，
    # 把命令里的字段换掉也照样绿。
    assert '.metadata.asset_key' in canvas, (
        "没给「块 → 图片文件名」的可跑命令，模型只能猜文件名"
    )
    assert 'select(.type=="image")' in canvas, "没说怎么筛出图片块"


def test_the_truncation_limit_in_the_docs_matches_the_code(tmp_path: Path) -> None:
    """文档说的截断长度必须和前端真正的上限一致。

    两个数字分别写在 Python 文档和 TS 常量里。不一致的表现是「按文档写了却被
    截断」，而两边看起来都没错 —— 和 canvas 字段名同一类问题。
    """
    import re

    parser = _parser_source()
    match = re.search(r"const MAX_LABEL = (\d+);", parser)
    assert match, "前端没有 MAX_LABEL 了，这条断言要跟着改"
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    assert f"{match.group(1)} 字" in text, (
        f"前端截断在 {match.group(1)} 字，但说明里没提这个数"
    )


# ---------------------------------------------------------------- 页面批注


def _ai_notes_parser_source() -> str:
    from pathlib import Path as _Path

    here = _Path(__file__).resolve()
    for parent in here.parents:
        candidate = parent / "frontend/packages/reader/src/shared/data/ai-notes.ts"
        if candidate.is_file():
            return candidate.read_text(encoding="utf-8")
    raise AssertionError(f"找不到批注解析器（从 {here} 往上找）")


def test_the_note_fields_match_what_the_frontend_actually_parses(
    tmp_path: Path,
) -> None:
    """文档里的字段名 = 解析器真正读的字段名。

    和 canvas 同一类问题：两边分处 Python 和 TS，没有共享定义，漂了的表现是
    「agent 照文档写了，页面上什么都没有」，而且两边看起来都没错。
    """
    import re

    parser = _ai_notes_parser_source()
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    notes_section = text[text.index("notes.v1.json") :]

    assert "notes" in notes_section, "说明里没写顶层 notes[]"
    # `(?![A-Za-z(])` 排掉方法调用：`raw.forEach` 会被 `[a-z_]+` 截成 "for"。
    read_fields = set(
        re.findall(r"\b(?:raw|item)\.([a-z_]+)(?![A-Za-z(])", parser)
    )
    flat = set(read_fields)
    assert flat >= {"anchor", "text", "kind", "level", "refs"}, flat
    for field in flat:
        assert field in notes_section, f"解析器读 {field}，但说明里没写"
    # anchor 里的两个键单独查：它们在嵌套对象里，上面的正则抓不到。
    for nested in ("block_id", "page_idx"):
        assert nested in notes_section, f"说明里没写 anchor.{nested}"


def test_the_notes_schema_example_parses(tmp_path: Path) -> None:
    """例子必须能直接抄。写错过一次就全白费。"""
    import json
    import re

    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    payload = _indented_json_example(text, '"retainpdf_ai_notes_v1"')
    note = payload["notes"][0]
    assert note["anchor"]["block_id"]
    assert note["refs"][0]["block_id"], "例子里没演示 refs —— 那是这个功能的重点"
    assert note["level"] in (1, 2, 3)


def test_the_instructions_forbid_summaries_and_demand_evidence(tmp_path: Path) -> None:
    """总结性批注是废话：原文就在旁边三厘米处。

    不明说的话模型默认就会写总结 —— 那是它最擅长的事。refs（凭什么这么说）是
    唯一能把「跨页连接/隐含前提/术语首现」和「复述」区分开的东西。
    """
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    notes_section = text[text.index("notes.v1.json") :]
    assert "不要写总结" in notes_section
    assert "refs" in notes_section
    assert "跨页" in notes_section and "隐含前提" in notes_section


def test_the_notes_level_quota_is_on_the_top_tier(tmp_path: Path) -> None:
    """配额必须卡在最高级上。

    只说「别标太多」的话，模型会把什么都标成 level 1，分级就等于没有。
    """
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    notes_section = text[text.index("notes.v1.json") :]
    assert "level=1 最多 5 条" in notes_section


def test_the_notes_docs_say_unanchored_notes_are_dropped(tmp_path: Path) -> None:
    """不说清楚的话，模型会以为只给 page_idx 也能标。"""
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    notes_section = text[text.index("notes.v1.json") :]
    assert "锚不到" in notes_section
    assert "必须真实存在" in notes_section


# ---------------------------------------------------------------- 画板目录


def _board_section(tmp_path: Path) -> str:
    text = build_job_workspace_instructions(_job(tmp_path, "job-1"))
    start = text.index("丢进 `./board/`")
    end = text.index("## 另外三个有固定格式的产物")
    return text[start:end]


def _board_accepted_line(tmp_path: Path) -> str:
    """「认这些后缀」那一行。

    **必须单独取这一行**：整段里到处都是 `.pdf`、`.png`（例子命令里就有），
    拿整段去查「pdf 在不在」的话，把白名单里的 pdf 删掉测试照样绿 —— 反证当场
    抓到过这个，两条门禁都中招。
    """
    for line in _board_section(tmp_path).splitlines():
        if "认这些后缀" in line:
            return line
    raise AssertionError("画板那节没有「认这些后缀」这一行了，门禁要跟着改")


def test_the_board_is_pitched_as_use_the_shell_you_already_have(
    tmp_path: Path,
) -> None:
    """画板的全部价值是「不用学新格式」。

    不把这点说透，模型会继续去找 schema —— 它被前三个产物训练成那样了。
    """
    section = _board_section(tmp_path)
    assert "已经有 shell" in section, "没说清楚用现有工具就行"
    # 给可抄的例子，而不是只描述。模型照着抄比照着想靠谱。
    for tool in ("python3", "jq", "pdftoppm"):
        assert tool in section, f"没举 {tool} 的例子"


def test_the_board_docs_state_the_accepted_shapes(tmp_path: Path) -> None:
    """后缀、文件名字符集、大小 —— 不写清楚的表现是「我放进去了却没显示」，
    而那时候模型没有任何线索能自己查出来。"""
    section = _board_section(tmp_path)
    for token in ("png", "md", "json", "16 MB"):
        assert token in section, f"没写 {token}"
    assert "svg" in section.lower(), "没说 svg 不收"


def test_the_board_accepted_kinds_match_the_backend(tmp_path: Path) -> None:
    """文档说收哪些后缀，必须和后端真正收的一致。

    两边分处 Python 文档和 Rust 代码，没有共享定义。漂了的表现是「照文档放进去
    却不显示」—— 和 canvas / notes 字段名同一类问题。
    """
    import re
    from pathlib import Path as _Path

    here = _Path(__file__).resolve()
    board_rs = None
    for parent in here.parents:
        candidate = parent / "backend/api/src/services/jobs/downloads/ai_board.rs"
        if candidate.is_file():
            board_rs = candidate.read_text(encoding="utf-8")
            break
    assert board_rs, "找不到后端的 ai_board.rs"

    # board_kind 的 match 臂里那些后缀就是真源。
    block = board_rs[board_rs.index("fn board_kind") : board_rs.index("/// 只认单层")]
    accepted = set(re.findall(r'^\s*"([a-z]+)"(?:\s*\|\s*"([a-z]+)")?\s*=>', block, re.M))
    flat = {ext for pair in accepted for ext in pair if ext}
    assert flat >= {"png", "md", "json"}, flat

    accepted = _board_accepted_line(tmp_path)
    for ext in flat:
        assert ext in accepted, f"后端收 .{ext}，但白名单那一行里没写"
    assert "svg" not in flat, "后端开始收 svg 了 —— 要先做消毒，并更新这条断言"


def test_the_board_docs_explain_that_the_file_name_is_the_label(
    tmp_path: Path,
) -> None:
    """画板上一堆图，文件名是唯一的区分。不说的话模型会起 out.png 这种名字。"""
    section = _board_section(tmp_path)
    assert "标签" in section
    assert "修改时间" in section, "没说排序规则，模型不知道怎么控制顺序"


def test_the_board_docs_say_pdf_shows_only_its_first_page(tmp_path: Path) -> None:
    """PDF 在画布上只画第 1 页。

    不说的话模型会把结论放在第 3 页，然后用户看到的是一页封面 —— 而这件事从
    界面上看不出来是被截了。
    """
    assert "pdf" in _board_accepted_line(tmp_path), "白名单那一行里没写 pdf"
    assert "第 1 页" in _board_section(tmp_path), "没说画布上只有第 1 页"


def test_the_board_docs_point_at_typst_with_a_runnable_command(
    tmp_path: Path,
) -> None:
    """typst 就在 PATH 上（实测：`shutil.which('typst', path=<fx 的 PATH>)` 命中），
    它是这里唯一能把「一份像样的中文文档」交出去的工具，而且零新依赖。

    不写进说明，模型不会去试一个它不知道存在的命令 —— 这份文档的全部作用就是
    补上「你的环境里有什么」。命令还必须是**单条**，复合命令在这个终端里拿不到
    输出（见文档开头那条）。
    """
    section = _board_section(tmp_path)
    assert "typst" in section, "没提 typst"
    commands = [
        line.strip()
        for line in section.splitlines()
        if line.strip().startswith("typst ")
    ]
    assert commands, "只提了名字，没给能抄的命令"
    for command in commands:
        assert "&&" not in command and ";" not in command and "|" not in command, (
            f"typst 的例子是复合命令，在这个终端里拿不到输出: {command}"
        )
    assert any("./board/" in command for command in commands), (
        "例子没直接渲进 ./board/，模型会渲到别处再忘了搬"
    )
