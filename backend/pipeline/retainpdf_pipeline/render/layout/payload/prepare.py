from __future__ import annotations

from copy import deepcopy
from pathlib import Path
from statistics import median

import fitz

from retainpdf_pipeline.render.semantics.item_view import is_caption_like_block
from retainpdf_pipeline.render.semantics.item_view import is_footnote_like_block
from retainpdf_pipeline.render.layout.font_fit import page_baseline_font_size
from retainpdf_pipeline.render.layout.payload.metrics import block_metrics
from retainpdf_pipeline.render.layout.payload.metrics import box_capacity_units
from retainpdf_pipeline.render.layout.payload.metrics import text_demand_units
from retainpdf_pipeline.render.layout.inline_content.mode_router import is_direct_typst_math_mode
from retainpdf_pipeline.render.layout.payload.first_line_indent import detect_first_line_indent_pt_with_displaylist
from retainpdf_pipeline.render.layout.payload.first_line_indent import is_first_line_indent_candidate
from retainpdf_pipeline.render.layout.payload.render_item import clear_render_fields
from retainpdf_pipeline.render.layout.payload.render_item import group_render_unit_items
from retainpdf_pipeline.render.layout.payload.render_item import group_unit_formula_map
from retainpdf_pipeline.render.layout.payload.render_item import group_unit_protected_text
from retainpdf_pipeline.render.layout.payload.render_item import group_unit_source_text
from retainpdf_pipeline.render.layout.payload.render_item import get_render_inner_bbox
from retainpdf_pipeline.render.layout.payload.render_item import item_has_group_render_text
from retainpdf_pipeline.render.layout.payload.render_item import seed_render_fields
from retainpdf_pipeline.render.layout.payload.reading_sort import sort_items_by_reading_order
from retainpdf_pipeline.render.layout.payload.shared import same_meaningful_render_text
from retainpdf_pipeline.render.layout.payload.shared import split_protected_text_for_boxes
from retainpdf_pipeline.render.layout.payload.suspicious_ocr import detect_and_drop_suspicious_ocr_glued_blocks
from retainpdf_pipeline.render.layout.typography.geometry import inner_bbox
from retainpdf_pipeline.render.layout.typography.measurement import bbox_width
from retainpdf_pipeline.render.semantics.item_view import block_kind


CONTINUATION_NARROW_BOX_MIN_NEIGHBOR_RATIO = 0.78
CONTINUATION_NARROW_BOX_CAPACITY_RELAX_RATIO = 0.72


def _is_annotation_like(item: dict) -> bool:
    return is_caption_like_block(item) or is_footnote_like_block(item)


def _inner_bbox_width(item: dict) -> float:
    bbox = inner_bbox(item)
    if len(bbox) != 4:
        return 0.0
    return max(0.0, bbox[2] - bbox[0])


def _continuation_adjusted_capacities(items: list[dict], capacities: list[float]) -> list[float]:
    if len(items) != len(capacities) or len(items) < 2:
        return capacities

    widths = [_inner_bbox_width(item) for item in items]
    adjusted = list(capacities)
    if len(items) == 2:
        # Two-member cross-page group (narrow tail + wide head): neither index
        # is "middle", so the loop below would never fire. Apply the same
        # narrow-box rule pairwise, reusing the identical ratios/formula.
        for index, other in ((0, 1), (1, 0)):
            current_width = widths[index]
            neighbor_width = widths[other]
            if current_width <= 0 or neighbor_width <= 0:
                continue
            if current_width >= neighbor_width * CONTINUATION_NARROW_BOX_MIN_NEIGHBOR_RATIO:
                continue
            width_ratio = current_width / neighbor_width
            relax_ratio = max(width_ratio, CONTINUATION_NARROW_BOX_CAPACITY_RELAX_RATIO)
            adjusted[index] = capacities[index] * relax_ratio
        return adjusted
    for index in range(1, len(items) - 1):
        current_width = widths[index]
        if current_width <= 0:
            continue
        prev_width = widths[index - 1]
        next_width = widths[index + 1]
        if prev_width <= 0 or next_width <= 0:
            continue
        neighbor_avg = (prev_width + next_width) / 2.0
        if neighbor_avg <= 0:
            continue
        if current_width >= neighbor_avg * CONTINUATION_NARROW_BOX_MIN_NEIGHBOR_RATIO:
            continue
        width_ratio = current_width / neighbor_avg
        relax_ratio = max(width_ratio, CONTINUATION_NARROW_BOX_CAPACITY_RELAX_RATIO)
        adjusted[index] = capacities[index] * relax_ratio
    return adjusted


def _union_bbox(boxes: list[list[float]]) -> list[float]:
    return [
        min(box[0] for box in boxes),
        min(box[1] for box in boxes),
        max(box[2] for box in boxes),
        max(box[3] for box in boxes),
    ]


AGGREGATE_STACK_EDGE_TOLERANCE_PT = 8.0
AGGREGATE_STACK_MAX_GAP_PT = 14.0


def _stacked_in_one_column(boxes: list[list[float]]) -> bool:
    ordered = sorted(boxes, key=lambda box: box[1])
    left = [box[0] for box in ordered]
    right = [box[2] for box in ordered]
    if max(left) - min(left) > AGGREGATE_STACK_EDGE_TOLERANCE_PT:
        return False
    if max(right) - min(right) > AGGREGATE_STACK_EDGE_TOLERANCE_PT:
        return False
    return all(
        -AGGREGATE_STACK_EDGE_TOLERANCE_PT <= lower[1] - upper[3] <= AGGREGATE_STACK_MAX_GAP_PT
        for upper, lower in zip(ordered, ordered[1:])
    )


def _merge_aggregate_geometry_group(
    items: list[dict],
    unit_text: str,
    unit_source_text: str,
    unit_formula_map: list[dict],
) -> bool:
    """摘要这类「合并几何」的翻译组：几个框合成一个，整段译文只排一次。

    翻译阶段给它们打的 translation_group_strategy 就是 aggregate_geometry，但渲染这边
    一直按跨页续段的办法把整段译文按容量切回各框 —— 切点落在词中间（「教 / 学医院」），
    「方法：」「结果：」也对不上原来每块的开头。同页、上下相接的几块，直接在并集框里
    排整段，其余成员不再画字（原文照旧由各自的 bbox 擦除）。

    只合并「同一栏里上下相接」的几块（左右边对齐、上下间隙小）：这时并集就是原来那片
    正文区域。摘要绕着图排（图旁一个窄框 + 图下一个通栏框）时并集会盖住图，那种照旧
    按容量切回各框（见 test_translation_abstract_groups）。
    """
    if len(items) < 2:
        return False
    if any(str(item.get("translation_group_strategy", "") or "").strip() != "aggregate_geometry" for item in items):
        return False
    if len({item.get("page_idx") for item in items}) != 1:
        return False
    boxes = [item.get("bbox") for item in items]
    if any(not isinstance(box, list) or len(box) != 4 for box in boxes):
        return False
    if not _stacked_in_one_column(boxes):
        return False
    head = items[0]
    inner_boxes = [get_render_inner_bbox(item) or inner_bbox(item) for item in items]
    head["bbox"] = _union_bbox(boxes)
    if all(isinstance(box, list) and len(box) == 4 for box in inner_boxes):
        head["_render_inner_bbox"] = _union_bbox(inner_boxes)
    head["render_protected_text"] = unit_text
    head["render_source_text"] = unit_source_text
    head["render_formula_map"] = unit_formula_map
    for item in items[1:]:
        clear_render_fields(item)
        item["render_source_text"] = ""
    return True


def _attach_first_line_indents(
    prepared: dict[int, list[dict]],
    page_metrics: dict[int, tuple[float, float, float, float, float]],
    source_doc: fitz.Document | None,
    first_line_indent_lookup: dict[str, float] | None = None,
) -> None:
    if source_doc is None and not first_line_indent_lookup:
        return
    for page_idx, items in prepared.items():
        if page_idx not in page_metrics:
            continue
        page_font_size, page_line_pitch, page_line_height, density_baseline, page_text_width_med = page_metrics[page_idx]
        displaylist: fitz.DisplayList | None = None
        for item in items:
            item_id = str(item.get("item_id", "") or "")
            if first_line_indent_lookup is not None and item_id:
                indent_pt = float(first_line_indent_lookup.get(item_id, 0.0) or 0.0)
                if indent_pt > 0:
                    item["_render_first_line_indent_pt"] = indent_pt
                continue
            if source_doc is None:
                continue
            font_size_pt, _leading_em = block_metrics(
                item,
                page_font_size,
                page_line_pitch,
                page_line_height,
                density_baseline,
                page_text_width_med,
            )
            if not is_first_line_indent_candidate(item, page_text_width_med=page_text_width_med):
                continue
            if displaylist is None:
                displaylist = source_doc[page_idx].get_displaylist()
            indent_pt = detect_first_line_indent_pt_with_displaylist(
                source_doc,
                displaylist,
                item,
                page_idx=page_idx,
                font_size_pt=font_size_pt,
                page_text_width_med=page_text_width_med,
            )
            if indent_pt > 0:
                item["_render_first_line_indent_pt"] = indent_pt


def prepare_render_payloads_by_page(
    translated_pages: dict[int, list[dict]],
    *,
    source_pdf_path: Path | None = None,
    first_line_indent_lookup: dict[str, float] | None = None,
    effective_inner_bbox_lookup: dict[str, list[float]] | None = None,
) -> dict[int, list[dict]]:
    prepared = {page_idx: deepcopy(items) for page_idx, items in translated_pages.items()}
    if not prepared:
        return prepared

    source_doc = fitz.open(source_pdf_path) if source_pdf_path and first_line_indent_lookup is None else None
    page_metrics: dict[int, tuple[float, float, float, float, float]] = {}
    flat_items: list[dict] = []
    try:
        for page_idx in sorted(prepared):
            items = prepared[page_idx]
            page_font_size, page_line_pitch, page_line_height, density_baseline = page_baseline_font_size(items)
            text_widths = [bbox_width(item) for item in items if block_kind(item) == "text" and not _is_annotation_like(item)]
            page_text_width_med = median(text_widths) if text_widths else 0.0
            page_metrics[page_idx] = (
                page_font_size,
                page_line_pitch,
                page_line_height,
                density_baseline,
                page_text_width_med,
            )
            for item in items:
                seed_render_fields(item)
                item_id = str(item.get("item_id", "") or "")
                if effective_inner_bbox_lookup is not None and item_id:
                    effective_bbox = effective_inner_bbox_lookup.get(item_id)
                    if isinstance(effective_bbox, list) and len(effective_bbox) == 4:
                        item["_render_inner_bbox"] = [float(value) for value in effective_bbox]
                flat_items.append(item)

        _attach_first_line_indents(prepared, page_metrics, source_doc, first_line_indent_lookup)

        units = group_render_unit_items(flat_items)

        for _, items in units.items():
            items = [item for item in items if item_has_group_render_text(item)]
            if not items:
                continue
            # Reading-order-first: capacities/chunks are positional, so zip()
            # below mis-assigns text when group members arrive out of reading
            # order (double-column / cross-page). No reading_order -> legacy
            # order is kept (never raises).
            items = sort_items_by_reading_order(items)
            direct_math_mode = any(is_direct_typst_math_mode(item) for item in items)
            unit_formula_map = group_unit_formula_map(items)
            protected_unit_text = group_unit_protected_text(items)
            protected_unit_source_text = group_unit_source_text(items)
            if same_meaningful_render_text(protected_unit_source_text, protected_unit_text):
                for item in items:
                    clear_render_fields(item)
                continue
            if _merge_aggregate_geometry_group(items, protected_unit_text, protected_unit_source_text, unit_formula_map):
                continue
            capacities: list[float] = []
            source_weights: list[float] = []
            for item in items:
                page_font_size, page_line_pitch, page_line_height, density_baseline, page_text_width_med = page_metrics[
                    item.get("page_idx", 0)
                ]
                font_size_pt, leading_em = block_metrics(
                    item,
                    page_font_size,
                    page_line_pitch,
                    page_line_height,
                    density_baseline,
                    page_text_width_med,
                )
                capacities.append(box_capacity_units(inner_bbox(item), font_size_pt, leading_em))
                source_weights.append(
                    text_demand_units(
                        item.get("protected_source_text") or "",
                        item.get("formula_map", []),
                    )
                )
            capacities = _continuation_adjusted_capacities(items, capacities)

            chunks = split_protected_text_for_boxes(
                protected_unit_text,
                unit_formula_map,
                capacities,
                preferred_weights=source_weights if any(weight > 0 for weight in source_weights) else None,
                direct_math_mode=direct_math_mode,
            )
            source_chunks = split_protected_text_for_boxes(
                protected_unit_source_text,
                unit_formula_map,
                capacities,
                preferred_weights=source_weights if any(weight > 0 for weight in source_weights) else None,
            )
            for item, chunk, source_chunk in zip(items, chunks, source_chunks):
                item["render_protected_text"] = chunk
                item["render_source_text"] = source_chunk
                item["render_formula_map"] = unit_formula_map

        suspicious_total = 0
        for page_idx, items in prepared.items():
            page_font_size, page_line_pitch, page_line_height, density_baseline, page_text_width_med = page_metrics[page_idx]
            summary = detect_and_drop_suspicious_ocr_glued_blocks(
                items,
                page_idx=page_idx,
                page_font_size=page_font_size,
                page_line_pitch=page_line_pitch,
                page_line_height=page_line_height,
                density_baseline=density_baseline,
                page_text_width_med=page_text_width_med,
            )
            suspicious_total += summary["count"]
            for hit in summary["hits"]:
                print(
                    "render skip suspicious OCR-glued block "
                    f"page={hit['page_idx'] + 1} item={hit['item_id']} next={hit['next_item_id']} "
                    f"chars={hit['source_chars']} chars_per_pt={hit['char_height_ratio']:.2f} "
                    f"gap={hit['source_gap_pt']:.1f} overlap={hit['width_overlap_ratio']:.3f} "
                    f"est={hit['estimated_height_pt']:.1f} allowed={hit['allowed_height_pt']:.1f} "
                    f"overflow={hit['overflow_ratio']:.2f}",
                    flush=True,
                )
        if suspicious_total:
            print(f"render skip suspicious OCR-glued blocks total={suspicious_total}", flush=True)
    finally:
        if source_doc is not None:
            source_doc.close()

    return prepared
