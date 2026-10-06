export function createRecentJobsReaderPort({
  openReader,
}: any = {}) {
  return {
    openReader(jobId, anchor = null, documentId = "", options: { pinJob?: boolean } = {}) {
      const normalizedJobId = `${jobId || ""}`.trim();
      if (!normalizedJobId) {
        return false;
      }
      openReader?.(normalizedJobId, anchor, `${documentId || ""}`.trim(), options);
      return true;
    },
  };
}
