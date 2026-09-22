/** 拉 agent 写的页面批注，并且**持续拉**。
 *
 * 为什么轮询：agent 是在你读的时候写的（终端里说一句「把第 3 节的隐含前提标出来」）。
 * 一次性加载的话，写完要整页刷新才看得见 —— 画布那次就是这个 bug，别再犯。
 *
 * 只在有 jobId 时拉。内容没变就不换引用，否则每 5 秒一次的重渲染会把整摞 PDF 页
 * 全部重算标记位置。
 */
import { useEffect, useState } from "react";

import { getReaderAdapters } from "../adapters.js";
import { parseAiNotes, type AiNotesDoc } from "../shared/data/ai-notes.js";

/** 比画布慢一点：批注是一次写一批，而且叠在 PDF 上，抖动比画布更烦人。 */
const POLL_MS = 5000;

export function useReaderAiNotes(jobId: string): AiNotesDoc | null {
  const [doc, setDoc] = useState<AiNotesDoc | null>(null);

  useEffect(() => {
    if (!jobId) {
      setDoc(null);
      return;
    }
    let cancelled = false;
    let lastRaw = "";
    const tick = async () => {
      const port = getReaderAdapters()?.defaultReaderDataPort;
      if (!port?.loadAiNotes) return;
      const payload = await port.loadAiNotes(jobId);
      if (cancelled) return;
      // 比字符串而不是比对象：解析结果每次都是新对象，直接 setState 会让每页的
      // 标记层白白重算。
      const raw = payload == null ? "" : JSON.stringify(payload);
      if (raw === lastRaw) return;
      lastRaw = raw;
      setDoc(parseAiNotes(payload));
    };
    void tick();
    const timer = setInterval(() => void tick(), POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [jobId]);

  return doc;
}
