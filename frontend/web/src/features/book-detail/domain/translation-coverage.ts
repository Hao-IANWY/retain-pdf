// 书籍详情「进度」分区：翻译覆盖条和任务记录的展示逻辑。纯函数，不碰网络和 DOM。
//
// 数据来自 GET /documents/:id/translation-coverage —— 和阅读入口同一套合并规则（每页取最近
// 翻译了它的任务），所以这里说「第 7 页来自某次翻译」，阅读器打开时第 7 页就是那次翻译。

import type {
  TranslationCoverageJob,
  TranslationCoverageView,
} from "@/platform/api/index.js";
import { compactPageSpec } from "@/features/library/domain.js";

/** 覆盖条的深浅档位数：不同次翻译用墨色深浅区分（单色设计，不引入新颜色）。 */
export const COVERAGE_SHADES = 4;

export type CoverageCell = {
  page: number;
  /** 0 = 没翻译；1..COVERAGE_SHADES = 第几档墨色。 */
  shade: number;
  jobId: string | null;
  title: string;
};

export type JobRow = {
  jobId: string;
  kind: string;
  pagesText: string;
  meta: string;
  statusLabel: string;
  statusTone: "done" | "active" | "failed" | "idle";
  suppliedText: string;
  shade: number;
};

const KIND_LABEL: Record<string, string> = { ocr: "OCR", book: "翻译", translate: "翻译", render: "重新排版" };
const STATUS: Record<string, [string, JobRow["statusTone"]]> = {
  succeeded: ["完成", "done"],
  running: ["进行中", "active"],
  queued: ["排队中", "active"],
  failed: ["失败", "failed"],
  canceled: ["已取消", "idle"],
};

/** 顶部一句话：「已翻译 23 / 47 页 · 由 3 次翻译拼成」。 */
export function coverageHeadline(view: TranslationCoverageView | null | undefined): string {
  if (!view || !view.page_count) return "";
  if (!view.translated_pages) return `共 ${view.page_count} 页，尚未翻译`;
  const base = view.translated_pages >= view.page_count
    ? `已翻译全部 ${view.page_count} 页`
    : `已翻译 ${view.translated_pages} / ${view.page_count} 页`;
  return view.contributing_jobs > 1 ? `${base} · 由 ${view.contributing_jobs} 次翻译拼成` : base;
}

/** 给参与合并的任务分墨色档位：最近的一次最深，往前依次变浅（超过档位数就循环）。 */
export function shadeByJob(view: TranslationCoverageView): Map<string, number> {
  const contributing = view.jobs.filter((job) => job.supplied_pages > 0);
  const shades = new Map<string, number>();
  contributing.forEach((job, index) => shades.set(job.job_id, (index % COVERAGE_SHADES) + 1));
  return shades;
}

export function coverageCells(view: TranslationCoverageView | null | undefined): CoverageCell[] {
  if (!view || !view.page_count) return [];
  const shades = shadeByJob(view);
  const jobs = new Map(view.jobs.map((job) => [job.job_id, job]));
  const cells: CoverageCell[] = [];
  for (const segment of view.segments) {
    for (let page = segment.first; page <= segment.last; page += 1) {
      const job = segment.job_id ? jobs.get(segment.job_id) : undefined;
      cells.push({
        page,
        shade: segment.job_id ? shades.get(segment.job_id) || 1 : 0,
        jobId: segment.job_id,
        title: job ? `第 ${page} 页 · ${formatTime(job.created_at)} 的翻译` : `第 ${page} 页 · 未翻译`,
      });
    }
  }
  return cells;
}

/** `2026-10-05T07:23:00` → `10月5日 07:23`（同一年不写年份）。 */
export function formatTime(iso: string | null | undefined, now: Date = new Date()): string {
  const text = `${iso || ""}`.trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/);
  if (!match) return text;
  const [, year, month, day, hour, minute] = match;
  const date = `${Number(month)}月${Number(day)}日 ${hour}:${minute}`;
  return Number(year) === now.getFullYear() ? date : `${year}年${date}`;
}

/** 用时：「42 秒」「3 分 5 秒」「1 小时 2 分」。时间认不出返回空串。 */
export function formatDuration(startIso: string | null | undefined, endIso: string | null | undefined): string {
  const start = Date.parse(`${startIso || ""}`);
  const end = Date.parse(`${endIso || ""}`);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return "";
  const seconds = Math.round((end - start) / 1000);
  if (seconds < 60) return `${seconds} 秒`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return seconds % 60 ? `${minutes} 分 ${seconds % 60} 秒` : `${minutes} 分`;
  const hours = Math.floor(minutes / 60);
  return minutes % 60 ? `${hours} 小时 ${minutes % 60} 分` : `${hours} 小时`;
}

function pagesText(job: TranslationCoverageJob, pageCount: number): string {
  if (!job.pages.length) return "";
  if (pageCount && job.pages.length >= pageCount) return `全部 ${pageCount} 页`;
  return `第 ${compactPageSpec(job.pages).replace(/,/g, "、")} 页`;
}

export function jobRows(view: TranslationCoverageView | null | undefined, now: Date = new Date()): JobRow[] {
  if (!view) return [];
  const shades = shadeByJob(view);
  return view.jobs.map((job) => {
    const [statusLabel, statusTone] = STATUS[job.status] || [job.status || "未知", "idle"];
    const duration = job.status === "succeeded" ? formatDuration(job.created_at, job.finished_at) : "";
    const meta = [
      formatTime(job.created_at, now),
      duration ? `用时 ${duration}` : "",
      job.model,
      job.ocr_reused ? "复用 OCR" : "",
    ].filter(Boolean).join(" · ");
    const isTranslation = job.workflow !== "ocr";
    let suppliedText = "";
    if (isTranslation && job.status === "succeeded") {
      suppliedText = job.supplied_pages > 0
        ? (job.supplied_pages < job.pages.length ? `采用 ${job.supplied_pages} 页（其余被之后的翻译替换）` : `采用 ${job.supplied_pages} 页`)
        : "已被之后的翻译替换";
    }
    return {
      jobId: job.job_id,
      kind: KIND_LABEL[job.workflow] || job.workflow || "任务",
      pagesText: pagesText(job, view.page_count),
      meta,
      statusLabel,
      statusTone,
      suppliedText,
      shade: shades.get(job.job_id) || 0,
    };
  });
}
