import test from "node:test";
import assert from "node:assert/strict";

import {
  coverageCells,
  coverageHeadline,
  formatDuration,
  formatTime,
  jobRows,
} from "../../src/features/book-detail/domain/translation-coverage.ts";

const NOW = new Date("2026-10-05T12:00:00");

// 先翻 1-3 页（whole），再专门重翻第 3 页并新翻第 4 页（redo）；另有一次 OCR、一次失败。
const VIEW = {
  page_count: 6,
  translated_pages: 4,
  contributing_jobs: 2,
  segments: [
    { first: 1, last: 2, job_id: "whole" },
    { first: 3, last: 4, job_id: "redo" },
    { first: 5, last: 6, job_id: null },
  ],
  jobs: [
    { job_id: "failed", workflow: "book", status: "failed", created_at: "2026-10-05T10:00:00", finished_at: "2026-10-05T10:01:00", model: "glm-5.3-flash", pages: [5], supplied_pages: 0, ocr_reused: true },
    { job_id: "redo", workflow: "translate", status: "succeeded", created_at: "2026-10-04T09:00:00", finished_at: "2026-10-04T09:03:05", model: "glm-5.3-flash", pages: [3, 4], supplied_pages: 2, ocr_reused: true },
    { job_id: "whole", workflow: "book", status: "succeeded", created_at: "2026-10-01T08:00:00", finished_at: "2026-10-01T08:00:42", model: "deepseek-flash", pages: [1, 2, 3], supplied_pages: 2, ocr_reused: false },
    { job_id: "ocr", workflow: "ocr", status: "succeeded", created_at: "2025-12-31T23:00:00", finished_at: "2026-01-01T00:02:00", model: "", pages: [1, 2, 3, 4, 5, 6], supplied_pages: 0, ocr_reused: false },
  ],
};

test("标题：已翻译几页、由几次翻译拼成", () => {
  assert.equal(coverageHeadline(VIEW), "已翻译 4 / 6 页 · 由 2 次翻译拼成");
  assert.equal(coverageHeadline({ ...VIEW, translated_pages: 6, contributing_jobs: 1 }), "已翻译全部 6 页");
  assert.equal(coverageHeadline({ ...VIEW, translated_pages: 0, contributing_jobs: 0 }), "共 6 页，尚未翻译");
  assert.equal(coverageHeadline(null), "");
});

test("覆盖条：每页一格，未翻译为 0 档，最近的翻译最深", () => {
  const cells = coverageCells(VIEW);
  assert.equal(cells.length, 6);
  assert.deepEqual(cells.map((cell) => cell.shade), [2, 2, 1, 1, 0, 0], "redo 更新，应该是第 1 档（最深）");
  assert.equal(cells[2].title, "第 3 页 · 10月4日 09:00 的翻译");
  assert.equal(cells[5].title, "第 6 页 · 未翻译");
});

test("任务记录：类型、页码、时间、用时、模型、状态、采用了几页", () => {
  const rows = jobRows(VIEW, NOW);
  const [failed, redo, whole, ocr] = rows;
  assert.equal(redo.kind, "翻译");
  assert.equal(redo.pagesText, "第 3-4 页");
  assert.equal(redo.meta, "10月4日 09:00 · 用时 3 分 5 秒 · glm-5.3-flash · 复用 OCR");
  assert.equal(redo.statusLabel, "完成");
  assert.equal(redo.suppliedText, "采用 2 页");
  assert.equal(whole.suppliedText, "采用 2 页（其余被之后的翻译替换）", "第 3 页被 redo 替换了");
  assert.equal(whole.meta, "10月1日 08:00 · 用时 42 秒 · deepseek-flash");
  assert.equal(failed.statusLabel, "失败");
  assert.equal(failed.statusTone, "failed");
  assert.equal(failed.suppliedText, "", "失败的任务不谈采用");
  assert.equal(failed.meta.includes("用时"), false, "失败的任务不显示用时");
  assert.equal(ocr.kind, "OCR");
  assert.equal(ocr.pagesText, "全部 6 页");
  assert.equal(ocr.meta, "2025年12月31日 23:00 · 用时 1 小时 2 分", "跨年要写年份");
  assert.equal(ocr.suppliedText, "");
});

test("翻译成功但全部被之后的翻译替换", () => {
  const view = { ...VIEW, jobs: [{ ...VIEW.jobs[2], supplied_pages: 0 }] };
  assert.equal(jobRows(view, NOW)[0].suppliedText, "已被之后的翻译替换");
});

test("时间和用时的格式", () => {
  assert.equal(formatTime("2026-10-05T07:23:11Z", NOW), "10月5日 07:23");
  assert.equal(formatTime("", NOW), "");
  assert.equal(formatDuration("2026-10-05T07:00:00", "2026-10-05T08:02:00"), "1 小时 2 分");
  assert.equal(formatDuration("2026-10-05T07:00:00", "2026-10-05T07:05:00"), "5 分");
  assert.equal(formatDuration("2026-10-05T07:00:00", null), "");
  assert.equal(formatDuration("2026-10-05T08:00:00", "2026-10-05T07:00:00"), "", "结束早于开始不显示");
});
