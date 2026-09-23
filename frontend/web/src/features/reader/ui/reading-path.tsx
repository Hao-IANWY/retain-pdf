/** 阅读路径面板 —— agent 生成的「先读哪、再读哪」，每步锚定到真实内容块。
 *
 * 数据是 fx 在 `<job>/ai/reading-path.v1.json` 里写的，经 Rust API 读出来。
 * 所以：**文件不存在是正常状态**（还没生成过），不是错误，别当失败渲染。
 *
 * 这一版刻意做得很朴素 —— 一个可点列表。先验证「锚点点了能跳到对的地方」这件事
 * 成立，再谈画布。锚定跑不通的话，画布再漂亮也只是一堆飘着的方框。
 *
 * ## 为什么要轮询
 *
 * 你是在**读的过程中**让 agent 写这份路径的。只在挂载时拉一次的话，写完要整页
 * 刷新才看得见，而没人知道要刷新 —— 面板看起来就是「它没生成」。画布上犯过这个
 * bug，批注那边留了注释说别再犯，这个面板一直没改。
 *
 * ## 瞬时故障不清空已有内容
 *
 * 轮询把一次网络抖动的代价放大了：拉失败就把列表换成错误页的话，你读到一半列表
 * 会自己消失，四秒后又回来。所以**手上有数据就留着**，只在底下挂一行小字说更新
 * 失败了。404 是例外 —— 那是权威状态（文件真没了），不是抖动。
 */
import { useEffect, useRef, useState } from "react";
import type { ReaderReadingPathSlotProps } from "@retainpdf/reader/adapters";

import { apiBase, frontendApiKey } from "@/platform/config/runtime.js";

import { AGENT_ARTIFACT_POLL_MS } from "../domain/agent-artifacts.js";
import { parseReadingPathSteps, type ReadingPathStep } from "../domain/reading-path-doc.js";

export function renderReaderReadingPath(props: ReaderReadingPathSlotProps) {
  if (!props.jobId) return null;
  return <ReadingPathPanel key={props.jobId} {...props} />;
}

function ReadingPathPanel({ open, jobId, onJump }: ReaderReadingPathSlotProps) {
  // null = 还没拿到过任何结果。空数组 = 确认过「没有」，两者渲染不一样。
  const [steps, setSteps] = useState<ReadingPathStep[] | null>(null);
  const [failure, setFailure] = useState("");
  // 上一次的原文。没变就不 setState —— 每 4 秒换一次数组引用会让整个列表重建，
  // 正在点的那个按钮会丢掉焦点。
  const lastRawRef = useRef("");

  useEffect(() => {
    // 这个面板 keepMounted 为 false，关掉就卸载了，这一行平时不生效。留着是因为
    // 哪天把 keepMounted 打开，没有它就会在后台一直轮询到标签页关闭。
    if (!open) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const response = await fetch(
          new URL(`/api/v1/jobs/${encodeURIComponent(jobId)}/reading-path`, apiBase()),
          { headers: { "X-API-Key": frontendApiKey() } },
        );
        if (cancelled) return;
        // 404 = 还没生成，或者被删了。这是权威状态，该清空 —— 和网络抖动不同。
        if (response.status === 404) {
          lastRawRef.current = "";
          setFailure("");
          setSteps([]);
          return;
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const raw = await response.text();
        if (cancelled) return;
        setFailure("");
        if (raw === lastRawRef.current) return;
        lastRawRef.current = raw;
        setSteps(parseReadingPathSteps(raw));
      } catch (error) {
        // 手上的数据不动 —— 下面靠 steps 是不是 null 决定显示错误页还是小字。
        if (!cancelled) setFailure(String(error).slice(0, 120));
      }
    };
    void tick();
    const timer = setInterval(() => void tick(), AGENT_ARTIFACT_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [jobId, open]);

  return (
    <div className="reader-reading-path" aria-label="阅读路径">
      {steps === null && !failure ? (
        <p className="reader-reading-path-note">加载中…</p>
      ) : null}
      {steps === null && failure ? (
        <p className="reader-reading-path-note">读取失败：{failure}</p>
      ) : null}
      {steps !== null && steps.length === 0 ? (
        <p className="reader-reading-path-note">
          还没有阅读路径。在终端里让 fx 生成一份：
          <code>写一条阅读路径到 ./reading-path.v1.json</code>
        </p>
      ) : null}
      {steps !== null && steps.length > 0 ? (
        <ol className="reader-reading-path-list">
          {steps.map((step, index) => (
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
      {steps !== null && failure ? (
        <p className="reader-reading-path-note reader-reading-path-stale">
          更新暂时失败，显示的是上一次的结果
        </p>
      ) : null}
    </div>
  );
}
