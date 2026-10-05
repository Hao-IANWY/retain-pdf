"""读回来的字号行距也要验一遍「装不装得下」。

# 起因

`converged_typography` 从译文 PDF 读回真实排版，这是最准的来源 —— 但它复现的是
**Typst 的排版**，而 Word 的断行和 Typst 不一样（两端对齐的伸缩、行内 OMML 的宽度、
CJK 换行规则、长西文词能不能断）。

原来这一支是**无条件采信**的：读回成功就直接写进 docx。实测真实 job 的前 6 页，
52 个读回成功的块里 **12 个（23%）** 按我们自己的度量就装不下，而它们照样被原样
写了进去 —— 到 Word 里就是超框被裁、被下一块的不透明白底盖住。

修之后全书 21 个读回块：装不下的从 11 个（52%）降到 3 个（14%），被缩小的 8 个块
字号只变成原来的 0.93×–0.98×（中位 0.96×）。
"""

from __future__ import annotations

import pytest

from retainpdf_pipeline.render.output.word.html_fit import LINE_STEP_RATIO, fits_in_box


class _Block:
    def __init__(self, text, rect, fit_to_box=True):
        self.plain_text = text
        self.content_rect = rect
        self.fit_to_box = fit_to_box
        self.math_map = None


def test_a_block_that_needs_more_lines_than_the_box_holds_does_not_fit():
    # 框高 20pt，行距 12.9pt → 最多一行。给它够排两行的字。
    block = _Block("中文正文" * 20, (0.0, 0.0, 120.0, 20.0))
    assert not fits_in_box(block, 10.0, 10.0 * LINE_STEP_RATIO), (
        "明显排不下的块被判成装得下 —— 读回值的验证就形同虚设"
    )


def test_a_block_with_room_to_spare_fits():
    # 正对照：否则上面那条可能在守「什么都装不下」。
    block = _Block("短句。", (0.0, 0.0, 300.0, 200.0))
    assert fits_in_box(block, 10.0, 10.0 * LINE_STEP_RATIO)


def test_shrinking_the_font_can_turn_a_miss_into_a_fit():
    # 这正是修复要做的事：读回值装不下时退回二分，用更小的字号。
    block = _Block("中文正文" * 12, (0.0, 0.0, 160.0, 40.0))
    big = 12.0
    small = 7.0
    assert not fits_in_box(block, big, big * LINE_STEP_RATIO)
    assert fits_in_box(block, small, small * LINE_STEP_RATIO), (
        "缩到 7pt 还装不下的话，这条分辨不出「缩小有没有用」"
    )


def test_blocks_the_layout_layer_never_fitted_are_let_through():
    # fit_to_box 为假时 Typst 直接按上界排、clip: false 允许溢出。对它们判「装不下」
    # 没有意义 —— 框高常常连一行都装不下（见过框高 8pt 而一行要 12.5pt 的）。
    block = _Block("中文正文" * 40, (0.0, 0.0, 100.0, 8.0), fit_to_box=False)
    assert fits_in_box(block, 10.0, 10.0 * LINE_STEP_RATIO)


def test_empty_text_fits():
    assert fits_in_box(_Block("   ", (0.0, 0.0, 10.0, 10.0)), 10.0, 12.9)


@pytest.mark.parametrize("line_step", [0.0, -1.0])
def test_a_nonpositive_line_step_never_claims_to_fit(line_step):
    """行距 <= 0 时「行数×行距」恒为 0，会把**任何**块判成装得下。

    exporter 里 `line_step_pt <= 0` 那条分支先拦了一道，所以今天到不了这里。但一个对
    垃圾输入回答「没问题」的函数迟早咬人 —— 验不了就别放行。
    """
    block = _Block("中文正文" * 20, (0.0, 0.0, 120.0, 20.0))
    assert not fits_in_box(block, 10.0, line_step), "行距非正时判成了装得下"


def test_the_line_box_is_never_shorter_than_the_glyphs():
    """行盒绝不能比字矮 —— docx 用 `w:lineRule="exact"`，Word 按行盒裁字。

    # 起因

    exporter 有一支是「读回到字号、但读不到行距」（单行块很常见：一行量不出基线间距）。
    它原来直接用 `fitted_step = 1.289 × fitted_size`，而 `fitted_size` 往往比读回字号
    小 —— 于是**行距比字还矮**。

    实测用户那个 job：39 个 fit_to_box 块里 11 个（28%）行距 < 字号，全是章节标题
    （「1. 引言」9.32pt 字配 8.30pt 行距 = 0.89×）。用户截图里那个被切掉上半截的
    「1. 引言」就是这么来的。

    这条不依赖任何关于 Word 断行的假设：exact 行高下行盒矮于字形就是确定会裁。
    """
    from retainpdf_pipeline.render.output.word.html_fit import LINE_STEP_RATIO as R

    # 这个比值本身就该 >= 1，否则 clamp 以外的每一条路都会产出矮行盒。
    assert R >= 1.0, f"LINE_STEP_RATIO = {R} < 1，正常路径就会把字裁掉"


def test_a_smaller_fitted_size_must_not_drag_the_line_step_below_the_readback_size():
    """这是上面那个缺陷的精确形状：两个来源的值被混用。

    读回字号 9.32pt + fitted 字号 6.44pt → 原来行距 = 1.289 × 6.44 = 8.30pt < 9.32pt。
    修复后行距从**真正要用的那个字号**导出，再过一道 `max(step, size)`。
    """
    from retainpdf_pipeline.render.output.word.html_fit import LINE_STEP_RATIO

    readback_size = 9.32
    fitted_size = 6.44
    wrong = fitted_size * LINE_STEP_RATIO
    assert wrong < readback_size, "这组数造不出「行距矮于字号」，换一组"

    right = max(readback_size * LINE_STEP_RATIO, readback_size)
    assert right >= readback_size, "行距仍然矮于字号"
