// 「打开这本书」时该打开哪个任务。
//
// 一本书可能被翻译了好几次、每次只翻一部分页。后端 `/documents/:id/reading` 知道该怎么
// 拼：一个任务覆盖整本就是它，否则是合并结果的虚拟任务 id。调用方手里的 job_id 往往是
// `active_job_id` —— 最近一次提交的任务，可能只覆盖了几页。

export type ReadingAnchor = { pageIdx: number | null; blockId: string } | null;

export type ReadingRequest = {
  jobId: string;
  documentId: string;
  anchor: ReadingAnchor;
};

export type FetchReading = (documentId: string) => Promise<{ job_id: string | null } | null | undefined>;

/**
 * 返回该打开的 job_id；空串表示没有译文、按 documentId 读原文。
 *
 * - 带锚点（搜索结果、引用跳到某页某段）：锚点的页号和块 id 属于调用方给的那个任务，
 *   不换。
 * - 没有 documentId：没法问，用调用方给的。
 * - 接口失败：退回调用方给的 —— 打开阅读器不能因为这一步坏掉。
 */
export async function resolveReadingJobId(request: ReadingRequest, fetchReading: FetchReading): Promise<string> {
  const jobId = `${request.jobId || ""}`.trim();
  const documentId = `${request.documentId || ""}`.trim();
  if (request.anchor || !documentId) return jobId;
  try {
    const view = await fetchReading(documentId);
    const resolved = `${view?.job_id || ""}`.trim();
    return resolved || jobId;
  } catch {
    return jobId;
  }
}

