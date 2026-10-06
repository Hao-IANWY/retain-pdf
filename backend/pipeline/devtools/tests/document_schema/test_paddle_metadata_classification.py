"""Paddle 适配器的元数据判定：front matter、元数据提示词、项目符号、文末附属章节不能混进正文。

图表标题/资源绑定、行内公式/几何各自拆到了 test_paddle_captions_and_assets.py 与
test_paddle_inline_formula_and_geometry.py。
"""

import json

from retainpdf_pipeline.ocr.document_schema.provider_adapters.paddle.page_reader import build_page_spec
from retainpdf_pipeline.ocr.document_schema.provider_adapters.paddle.relations import classify_page_blocks
from devtools.tests.document_schema.fixtures.registry import PADDLE_SCI_FIXTURE_JSON


def test_paddle_json_sci_empty_text_slots_stay_on_text_only_repair_path() -> None:
    payload = json.loads(PADDLE_SCI_FIXTURE_JSON.read_text(encoding="utf-8"))
    repaired_pages: dict[int, list[dict]] = {}
    empty_slot_pages: dict[int, list[int]] = {}

    for page_index, page_payload in enumerate(payload["layoutParsingResults"], start=1):
        page_meta = payload["dataInfo"]["pages"][page_index - 1]
        page_spec = build_page_spec(
            page_payload=page_payload,
            page_index=page_index - 1,
            page_meta=page_meta,
            preprocessed_image=payload["preprocessedImages"][page_index - 1],
        )
        page_blocks = page_payload["prunedResult"]["parsing_res_list"]
        empty_orders = [
            order
            for order, block in enumerate(page_blocks)
            if block.get("block_label") == "text" and not str(block.get("block_content", "") or "").strip()
        ]
        if empty_orders:
            empty_slot_pages[page_index] = empty_orders
        if page_spec["metadata"]["body_repair_pairs"]:
            repaired_pages[page_index] = list(page_spec["metadata"]["body_repair_pairs"])
            for pair in page_spec["metadata"]["body_repair_pairs"]:
                absorber = page_blocks[pair["absorber_order"]]
                peer = page_blocks[pair["peer_order"]]
                assert absorber.get("block_label") == "text"
                assert peer.get("block_label") == "text"

    assert empty_slot_pages == {
        1: [17],
        2: [6],
        3: [12],
        4: [16],
        6: [18],
        9: [16],
        11: [8],
        14: [10],
        15: [8],
        16: [12],
    }
    assert repaired_pages == {}


def test_paddle_json_sci_front_matter_text_does_not_become_body() -> None:
    payload = json.loads(PADDLE_SCI_FIXTURE_JSON.read_text(encoding="utf-8"))
    page_blocks = payload["layoutParsingResults"][0]["prunedResult"]["parsing_res_list"]
    classified = classify_page_blocks(page_blocks)

    assert classified[8][:2] == ("text", "metadata")
    assert classified[9][:2] == ("text", "metadata")
    assert classified[10][:2] == ("text", "metadata")
    assert classified[11][:2] == ("text", "body")
    assert classified[14][:2] == ("text", "heading")
    assert classified[15][:2] == ("text", "body")


def test_paddle_classifies_metadata_text_cues_before_translation() -> None:
    classified = classify_page_blocks(
        [
            {"block_label": "text", "block_content": "The authors declare that they have no competing interests."},
            {"block_label": "text", "block_content": "This work was funded by Consejo Nacional de Ciencia y Tecnologia."},
            {"block_label": "text", "block_content": "Received: 6 April 2012 Accepted: 19 June 2012 Published: 18 July 2012"},
            {"block_label": "text", "block_content": "Cite this article as: Example Journal 2012, 6:70"},
            {"block_label": "text", "block_content": "Submit your manuscript here: http://example.test/manuscript/"},
            {"block_label": "text", "block_content": "Normal body paragraph should remain in body classification."},
        ]
    )

    assert classified[0][:2] == ("text", "metadata")
    assert classified[1][:2] == ("text", "metadata")
    assert classified[2][:2] == ("text", "metadata")
    assert classified[3][:2] == ("text", "metadata")
    assert classified[4][:2] == ("text", "metadata")
    assert classified[5][:2] == ("text", "body")


def test_paddle_does_not_treat_body_bullets_as_metadata() -> None:
    classified = classify_page_blocks(
        [
            {
                "block_label": "text",
                "block_content": (
                    "• Knowledge: In assessments of broad world knowledge, DeepSeek-V4-Pro-Max "
                    "significantly outperforms leading open-source models on the SimpleQA benchmark."
                ),
            },
            {
                "block_label": "text",
                "block_content": (
                    "• Reasoning: Through the expansion of reasoning tokens, DeepSeek-V4-Pro-Max "
                    "demonstrates superior performance relative to GPT-5.2 on standard reasoning benchmarks."
                ),
            },
            {
                "block_label": "text",
                "block_content": "• Keywords: document parsing; translation; layout analysis",
            },
        ]
    )

    assert classified[0][:2] == ("text", "body")
    assert classified[1][:2] == ("text", "body")
    assert classified[2][:2] == ("text", "metadata")


def test_paddle_limits_metadata_bullet_by_word_count() -> None:
    classified = classify_page_blocks(
        [
            {
                "block_label": "text",
                "block_content": (
                    "• Keywords: a b c d e f g h i j k l m n o p q r s t u v w x y z "
                    "this is already too long to be treated as a tiny metadata fragment"
                ),
            },
            {
                "block_label": "text",
                "block_content": "• DOI: 10.1000/xyz123",
            },
        ]
    )

    assert classified[0][:2] == ("text", "body")
    assert classified[1][:2] == ("text", "metadata")


def test_paddle_metadata_cues_must_appear_at_start() -> None:
    classified = classify_page_blocks(
        [
            {
                "block_label": "text",
                "block_content": (
                    "This paragraph discusses benchmark setup and mentions keywords: translation, "
                    "layout, parsing in the middle of normal body text."
                ),
            },
            {
                "block_label": "text",
                "block_content": (
                    "The appendix also references doi: 10.1000/xyz123 inside a longer explanatory sentence."
                ),
            },
            {
                "block_label": "text",
                "block_content": "Keywords: translation; layout; parsing",
            },
            {
                "block_label": "text",
                "block_content": "• Keywords: translation; layout; parsing",
            },
        ]
    )

    assert classified[0][:2] == ("text", "body")
    assert classified[1][:2] == ("text", "body")
    assert classified[2][:2] == ("text", "metadata")
    assert classified[3][:2] == ("text", "metadata")


def test_paddle_long_body_paragraph_mentioning_copyright_stays_body() -> None:
    """正文顺带提到 copyright / funded by / open access，不能整段当元数据跳过。

    实测（BMC Neurol 2021, 21:433 第 2 页）：一段 189 词的方法学描述因为写了
    「a cognitive impairment screening tool copyrighted by the University of New South
    Wales」被判成 metadata，整段没翻译。真正的元数据声明在本机所有 Paddle 任务里
    都不超过 27 词。
    """
    gpcog = (
        "The General Practitioner Assessment of Cognition (GPCOG), a cognitive impairment "
        "screening tool copyrighted by the University of New South Wales, was utilized in the "
        "assessment of cognitive impairment. The GPCOG has been validated for use in a wide "
        "variety of populations including hypertension and resistant hypertension subpopulations. "
        "With a sensitivity and specificity for the English GPCOG ranging from 0.81 to 0.98 and "
        "0.72 to 0.95, respectively; the GPCOG performed at least as well as, if not better, than "
        "the widely-used cognitive screens such as the Mini-Mental State Examination (MMSE)."
    )
    funded = (
        "Participants were recruited from three outpatient clinics whose screening programme is "
        "funded by the regional health authority; all clinics followed the same protocol, used the "
        "same trained assessors, and recorded blood pressure with validated automated devices at "
        "every visit over the twelve month follow-up period."
    )
    classified = classify_page_blocks(
        [
            {"block_label": "text", "block_content": gpcog},
            {"block_label": "text", "block_content": funded},
            {"block_label": "text", "block_content": "Open Access"},
            {"block_label": "text", "block_content": "Received: 22 June 2021 Accepted: 25 October 2021 Published online: 08 November 2021"},
        ]
    )

    assert classified[0][:2] == ("text", "body")
    assert classified[1][:2] == ("text", "body")
    # 反向：线索在开头的短声明照旧是元数据。
    assert classified[2][:2] == ("text", "metadata")
    assert classified[3][:2] == ("text", "metadata")


def test_paddle_classifies_ancillary_tail_headings_as_metadata() -> None:
    classified = classify_page_blocks(
        [
            {"block_label": "paragraph_title", "block_content": "Competing interests"},
            {"block_label": "paragraph_title", "block_content": "Acknowledgments"},
            {"block_label": "paragraph_title", "block_content": "References"},
            {"block_label": "paragraph_title", "block_content": "Introduction"},
        ]
    )

    assert classified[0][:2] == ("text", "metadata")
    assert classified[1][:2] == ("text", "metadata")
    assert classified[2][:2] == ("text", "metadata")
    assert classified[3][:2] == ("text", "heading")
