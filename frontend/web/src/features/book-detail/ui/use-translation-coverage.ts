import { useEffect, useMemo, useState } from "react";
import { fetchDocumentTranslationCoverage, type TranslationCoverageView } from "@/platform/api/index.js";
import { API_PREFIX } from "@/platform/config/api-constants.js";

type FetchCoverage = (documentId: string) => Promise<TranslationCoverageView>;

const fetchFromApi: FetchCoverage = (documentId) => fetchDocumentTranslationCoverage(API_PREFIX, documentId);

/**
 * 这本书的翻译覆盖和任务记录。
 *
 * 打开详情时取一次；之后任务的状态一变（某次翻译完成、失败、新提交）就重取 —— 键是
 * 「每个任务的 id:状态」。轮询本身由 useDocumentJobs 负责，这里不另起定时器。
 * 失败只是不显示这两块，不影响「进度」分区的其余部分。
 */
export function useTranslationCoverage({
  open,
  documentId,
  jobs,
  fetchCoverage = fetchFromApi,
}: {
  open: boolean;
  documentId: string;
  jobs: Array<{ job_id?: string; id?: string; status?: string }>;
  fetchCoverage?: FetchCoverage;
}) {
  // 连同书的 id 一起存：换到另一本书时，新数据回来之前不能显示上一本的覆盖。
  const [loaded, setLoaded] = useState<{ documentId: string; view: TranslationCoverageView } | null>(null);
  const jobsKey = useMemo(
    () => jobs.map((job) => `${job.job_id || job.id || ""}:${job.status || ""}`).sort().join("|"),
    [jobs],
  );

  useEffect(() => {
    const id = `${documentId || ""}`.trim();
    if (!open || !id) {
      setLoaded(null);
      return undefined;
    }
    let cancelled = false;
    fetchCoverage(id)
      .then((view) => {
        if (!cancelled) setLoaded({ documentId: id, view });
      })
      .catch(() => {
        if (!cancelled) setLoaded(null);
      });
    return () => {
      cancelled = true;
    };
  }, [open, documentId, jobsKey, fetchCoverage]);

  return loaded && loaded.documentId === `${documentId || ""}`.trim() ? loaded.view : null;
}
