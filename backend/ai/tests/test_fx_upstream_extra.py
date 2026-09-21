"""把 provider 自己的参数透传到上游。

fx 0.0.5 的网关协议只发 prompt / tools / toolChoice —— 没有 temperature、
没有 max_tokens、没有任何思考强度参数（抓包确认过）。想调 provider 的旋钮
只能从宿主这边加。

不做成「思考强度」这种命名参数：各家开关形状完全不同。实测 DeepSeek 只认
{"thinking":{"type":"disabled"}}（reasoning_tokens 归零，两次一致），而
reasoning_effort 和 thinking.budget_tokens 一概忽略 —— 叫「强度」会让人以为
能调档，实际只有开关。所以只搬运，不翻译语义。
"""

from __future__ import annotations

import os

import pytest

from retainpdf_ai.config import _env_json_object
from retainpdf_ai.fx_openai_bridge import merge_safe_extra_body, translate_gateway_request

PROMPT = {"prompt": [{"role": "user", "content": [{"type": "text", "text": "hi"}]}]}


def test_extra_fields_reach_the_upstream_body() -> None:
    body = translate_gateway_request(
        PROMPT, model="m", extra_body={"thinking": {"type": "disabled"}}
    )
    assert body["thinking"] == {"type": "disabled"}


def test_no_extra_body_changes_nothing() -> None:
    assert translate_gateway_request(PROMPT, model="m") == translate_gateway_request(
        PROMPT, model="m", extra_body={}
    )


@pytest.mark.parametrize("field", ["model", "messages", "stream"])
def test_the_bridge_owned_fields_cannot_be_overridden(field: str) -> None:
    """model / messages / stream 是桥对 fx 的协议契约。

    被外部配置改掉会让「fx 收到的」和「它以为的」对不上，而且不报错 ——
    比如把 stream 打开，桥的非流式解析会当场拿到一堆 SSE 文本。
    """
    body = translate_gateway_request(
        PROMPT, model="real-model", extra_body={field: "hijacked"}
    )
    assert body[field] != "hijacked"


def test_merge_ignores_non_objects() -> None:
    assert merge_safe_extra_body({"a": 1}, None) == {"a": 1}
    assert merge_safe_extra_body({"a": 1}, "not-an-object") == {"a": 1}  # type: ignore[arg-type]


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ('{"thinking":{"type":"disabled"}}', {"thinking": {"type": "disabled"}}),
        ("", {}),
        ("not json", {}),
        ("[1,2]", {}),      # 是 JSON 但不是对象
        ('"a string"', {}),
        ("null", {}),
    ],
)
def test_the_env_var_only_accepts_a_json_object(
    monkeypatch: pytest.MonkeyPatch, raw: str, expected: dict
) -> None:
    """写错了不该让整个服务起不来，但也不能猜 —— 不是对象就当没配。"""
    monkeypatch.setenv("RETAIN_AI_TEST_EXTRA", raw)
    assert _env_json_object("RETAIN_AI_TEST_EXTRA") == expected


def test_the_env_var_is_empty_when_unset(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("RETAIN_AI_TEST_EXTRA", raising=False)
    assert _env_json_object("RETAIN_AI_TEST_EXTRA") == {}
