from __future__ import annotations


def format_translation_progress_message(
    current: int,
    total: int,
    touched_pages: set[int],
    *,
    substage: str = "translation_batches",
) -> str:
    if touched_pages:
        sorted_pages = sorted(page_idx + 1 for page_idx in touched_pages)
        if len(sorted_pages) == 1:
            page_suffix = f"（最近页: {sorted_pages[0]}）"
        else:
            preview = ",".join(str(page) for page in sorted_pages[:4])
            if len(sorted_pages) > 4:
                preview = f"{preview}..."
            page_suffix = f"（最近页: {preview}）"
    else:
        page_suffix = ""
    if substage == "translation_tail_retry":
        return f"正在处理翻译重试队列，第 {current}/{total} 项{page_suffix}"
    return f"已完成第 {current}/{total} 批翻译{page_suffix}"


def format_translation_block_progress_message(
    translated_blocks: int,
    total_blocks: int,
    completed_pages: int,
    total_pages: int,
) -> str:
    """翻译进度文案:块数 + 已整页完成的页数。

    刻意不写「约第 x/P 页」:批次是乱序完成的,只有「已完成多少页」是如实的。
    """
    return (
        f"已翻译 {translated_blocks}/{total_blocks} 块"
        f" · 已完成 {completed_pages}/{total_pages} 页"
    )


__all__ = [
    "format_translation_block_progress_message",
    "format_translation_progress_message",
]
