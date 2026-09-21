/** 阅读路径面板 —— agent 生成的「先读哪、再读哪」，每步锚定到真实内容块。
 *
 * 数据是 fx 在 `<job>/ai/reading-path.v1.json` 里写的，经 Rust API 读出来。
 * 所以：**文件不存在是正常状态**（还没生成过），不是错误，别当失败渲染。
 *
 * 这一版刻意做得很朴素 —— 一个可点列表。先验证「锚点点了能跳到对的地方」这件事
 * 成立，再谈画布。锚定跑不通的话，画布再漂亮也只是一堆飘着的方框。
 */
import { useEffect, useState } from "react";
import type { ReaderReadingPathSlotProps } from "@retainpdf/reader/adapters";

import { apiBase, frontendApiKey } from "@/platform/config/runtime.js";

type Step = {
  order?: number;
  page_idx?: number;
  block_id?: string;
  why?: string;
};

type State =
  | { kind: "loading" }
  | { kind: "empty" }
  | { kind: "failed"; message: string }
  | { kind: "ready"; steps: Step[] };

export function renderReaderReadingPath(props: ReaderReadingPathSlotProps) {
  if (!props.jobId) return null;
  return <ReadingPathPanel key={props.jobId} {...props} />;
}

function ReadingPathPanel({ jobId, onJump }: ReaderReadingPathSlotProps) {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ kind: "loading" });
    void (async () => {
      try {
        const response = await fetch(
          new URL(`/api/v1/jobs/${encodeURIComponent(jobId)}/reading-path`, apiBase()),
          { headers: { "X-API-Key": frontendApiKey() } },
        );
        if (cancelled) return;
        // 404 = 还没生成，是正常状态。其余状态码才是真失败。
        if (response.status === 404) return setState({ kind: "empty" });
        if (!response.ok) {
          return setState({ kind: "failed", message: `HTTP ${response.status}` });
        }
        const payload = await response.json();
        if (cancelled) return;
        // 这是 agent 生成的文件，形状不保证。只取能用的步骤，坏的丢掉 ——
        // 让整个面板因为一步畸形而白屏，比少显示一步糟糕得多。
        const steps: Step[] = Array.isArray(payload?.steps)
          ? payload.steps.filter(
              (step: Step) => step && typeof step.block_id === "string",
            )
          : [];
        setState(steps.length ? { kind: "ready", steps } : { kind: "empty" });
      } catch (error) {
        if (!cancelled) {
          setState({ kind: "failed", message: String(error).slice(0, 120) });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  return (
    <div className="reader-reading-path" aria-label="阅读路径">
      {state.kind === "loading" ? <p className="reader-reading-path-note">加载中…</p> : null}
      {state.kind === "empty" ? (
        <p className="reader-reading-path-note">
          还没有阅读路径。在终端里让 fx 生成一份：
          <code>写一条阅读路径到 ./reading-path.v1.json</code>
        </p>
      ) : null}
      {state.kind === "failed" ? (
        <p className="reader-reading-path-note">读取失败：{state.message}</p>
      ) : null}
      {state.kind === "ready" ? (
        <ol className="reader-reading-path-list">
          {state.steps.map((step, index) => (
            <li key={`${step.block_id}-${index}`}>
              <button
                type="button"
                className="reader-reading-path-step"
                onClick={() =>
                  onJump({ page_idx: step.page_idx, block_id: step.block_id })
                }
              >
                <span className="reader-reading-path-order">
                  {step.order ?? index + 1}
                </span>
                <span className="reader-reading-path-body">
                  <span className="reader-reading-path-why">{step.why || step.block_id}</span>
                  <span className="reader-reading-path-anchor">
                    第 {(step.page_idx ?? 0) + 1} 页 · {step.block_id}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
