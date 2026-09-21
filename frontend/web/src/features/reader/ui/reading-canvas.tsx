/** 阅读路径的画布视图 —— 同一份数据，换个渲染器。
 *
 * 列表版（reading-path.tsx）先验证了锚定：agent 产出的 block_id 都真实存在，
 * 点了能跳到对的地方。画布在这之上只做一件事 —— **把顺序变成空间**，让「先读
 * 哪、再读哪」一眼看得出来，而不是从上往下扫一列。
 *
 * 两者共用同一个 `reading-path.v1.json`，所以画布不是新功能，是新视图。
 *
 * tldraw 是动态 import 的：它很大，而且阅读页首屏已经有 pdfjs + react-pdf。
 * 不开这个 tab 就不下载 —— 和 xterm 一样的处理。
 */
import { useEffect, useRef, useState } from "react";
import type { ReaderReadingPathSlotProps } from "@retainpdf/reader/adapters";

import { apiBase, frontendApiKey } from "@/platform/config/runtime.js";

type Step = { order?: number; page_idx?: number; block_id?: string; why?: string };

/** 卡片尺寸和间距。竖排是有意的：阅读顺序天然是从上往下。 */
const CARD_W = 300;
const CARD_H = 120;
const GAP_Y = 52;

export function renderReaderReadingCanvas(props: ReaderReadingPathSlotProps) {
  if (!props.jobId) return null;
  return <ReadingCanvasPanel key={props.jobId} {...props} />;
}

function ReadingCanvasPanel({ jobId, onJump }: ReaderReadingPathSlotProps) {
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [failure, setFailure] = useState("");
  // onJump 每次渲染可能是新函数；画布的 onMount 只跑一次，用 ref 拿最新的，
  // 否则点击会调到挂载那一刻的旧闭包。
  const jumpRef = useRef(onJump);
  jumpRef.current = onJump;

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch(
          new URL(`/api/v1/jobs/${encodeURIComponent(jobId)}/reading-path`, apiBase()),
          { headers: { "X-API-Key": frontendApiKey() } },
        );
        if (cancelled) return;
        if (response.status === 404) return setSteps([]);
        if (!response.ok) return setFailure(`HTTP ${response.status}`);
        const payload = await response.json();
        if (cancelled) return;
        setSteps(
          Array.isArray(payload?.steps)
            ? payload.steps.filter(
                (step: Step) => step && typeof step.block_id === "string",
              )
            : [],
        );
      } catch (error) {
        if (!cancelled) setFailure(String(error).slice(0, 120));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  if (failure) {
    return <p className="reader-reading-path-note">读取失败：{failure}</p>;
  }
  if (steps === null) {
    return <p className="reader-reading-path-note">加载中…</p>;
  }
  if (steps.length === 0) {
    return (
      <p className="reader-reading-path-note">
        还没有阅读路径。在终端里让 fx 生成一份。
      </p>
    );
  }
  return <Canvas steps={steps} jumpRef={jumpRef} />;
}

function Canvas({
  steps,
  jumpRef,
}: {
  steps: Step[];
  jumpRef: { current: ReaderReadingPathSlotProps["onJump"] };
}) {
  const [mod, setMod] = useState<typeof import("tldraw") | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        // 只动态 import 组件。样式走 CSS 链（见 styles/entries/reader.css）——
        // 从 JS 里 import CSS 在这套 esbuild 配置下没有类型，也进不了 CSS 产物。
        const loaded = await import("tldraw");
        if (!cancelled) setMod(loaded);
      } catch {
        if (!cancelled) setLoadFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loadFailed) {
    return <p className="reader-reading-path-note">画布组件加载失败</p>;
  }
  if (!mod) {
    return <p className="reader-reading-path-note">画布加载中…</p>;
  }

  const { Tldraw } = mod;
  return (
    <div className="reader-reading-canvas">
      <Tldraw
        onMount={(editor) => {
          editor.createShapes(buildShapes(steps, editor));
          editor.zoomToFit();
          // 选中即跳转。用 side effect 而不是轮询：tldraw 没有 onShapeClick，
          // 而选中变化就是「用户点了这一步」最直接的信号。
          return editor.store.listen(
            () => {
              const selected = editor.getSelectedShapeIds();
              if (selected.length !== 1) return;
              const step = stepForShapeId(steps, selected[0]);
              if (step) {
                jumpRef.current({
                  page_idx: step.page_idx,
                  block_id: step.block_id,
                });
              }
            },
            { scope: "session", source: "user" },
          );
        }}
      />
    </div>
  );
}

/** shape id ↔ 步骤序号。tldraw 的 id 必须以 `shape:` 开头。 */
function shapeIdForIndex(index: number): string {
  return `shape:reading-step-${index}`;
}

function stepForShapeId(steps: Step[], shapeId: string): Step | undefined {
  const match = /^shape:reading-step-(\d+)$/.exec(shapeId);
  return match ? steps[Number(match[1])] : undefined;
}

function buildShapes(steps: Step[], editor: { createShapes: unknown }) {
  void editor;
  return steps.map((step, index) => ({
    id: shapeIdForIndex(index),
    type: "geo",
    x: 0,
    y: index * (CARD_H + GAP_Y),
    props: {
      geo: "rectangle",
      w: CARD_W,
      h: CARD_H,
      // 锚点写进卡片：锚错了一眼能看出来，不用点进去才发现。
      text: `${step.order ?? index + 1}. ${step.why ?? ""}\n\n第 ${
        (step.page_idx ?? 0) + 1
      } 页 · ${step.block_id ?? ""}`,
      size: "s",
      align: "start",
      verticalAlign: "start",
    },
  })) as never;
}
