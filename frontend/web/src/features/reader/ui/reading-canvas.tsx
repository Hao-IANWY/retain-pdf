/** 画布面板 —— agent 在这里给你讲这篇论文。
 *
 * 两个数据源，优先级固定（规则和取舍见 domain/reading-canvas-doc.ts 的
 * `chooseCanvasSource`）：
 *
 *     ai/canvas.v1.json        agent 画的概念图（节点 + 箭头）
 *     ai/reading-path.v1.json  没有概念图时退回步骤卡片
 *
 * 两份都由 agent 在终端里写，我们只读。点击图形跳到 PDF 对应位置。
 *
 * ## 为什么要轮询
 *
 * agent 写完文件，画布得自己变。没有轮询的话它只在挂载那一刻拉一次 —— 而面板
 * 一旦打开就被 latch 保持挂载，于是「让 fx 画一张」之后要整页刷新才看得见。
 * 这正是第一版的行为，是个 bug 不是设计。
 *
 * 只在面板可见时轮询：不可见时它还挂在那儿（为了不让 tldraw 反复重建），但没人
 * 在看，不该继续发请求。
 *
 * tldraw 是动态 import 的：它很大，而且阅读页首屏已经有 pdfjs + react-pdf。
 * 不开这个 tab 就不下载 —— 和 xterm 一样的处理。
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReaderReadingPathSlotProps } from "@retainpdf/reader/adapters";

import { apiBase, frontendApiKey } from "@/platform/config/runtime.js";
import {
  type CanvasSource,
  buildCanvasShapes,
  chooseCanvasSource,
  nodeForShapeId,
} from "../domain/reading-canvas-doc.js";
import {
  type ReadingStep,
  buildShapes,
  stepForShapeId,
} from "../domain/reading-canvas-shapes.js";

/** agent 写完到画面更新之间的延迟上限。再短意义不大（模型写一次要几十秒），
 * 再长会让人以为没生效。 */
const POLL_MS = 4000;

export function renderReaderReadingCanvas(props: ReaderReadingPathSlotProps) {
  if (!props.jobId) return null;
  return <ReadingCanvasPanel key={props.jobId} {...props} />;
}

/** 404 = 文件不存在，是正常状态，返回 null。其余非 2xx 才是真失败。 */
async function fetchArtifact(jobId: string, name: string): Promise<string | null> {
  const response = await fetch(
    new URL(`/api/v1/jobs/${encodeURIComponent(jobId)}/${name}`, apiBase()),
    { headers: { "X-API-Key": frontendApiKey() } },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.text();
}

function ReadingCanvasPanel({ open, jobId, onJump }: ReaderReadingPathSlotProps) {
  const [source, setSource] = useState<CanvasSource | null>(null);
  const [failure, setFailure] = useState("");
  // onJump 每次渲染可能是新函数；画布的 onMount 只跑一次，用 ref 拿最新的，
  // 否则点击会调到挂载那一刻的旧闭包。
  const jumpRef = useRef(onJump);
  jumpRef.current = onJump;
  // 上一次拿到的原文。没变就不重建图形 —— 每 4 秒清空重画会打断你正在做的
  // 平移和缩放。
  const lastRawRef = useRef<string>("");

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const [canvasText, pathText] = await Promise.all([
          fetchArtifact(jobId, "canvas"),
          fetchArtifact(jobId, "reading-path"),
        ]);
        if (cancelled) return;
        const raw = `${canvasText ?? ""}\u0000${pathText ?? ""}`;
        setFailure("");
        if (raw === lastRawRef.current) return;
        lastRawRef.current = raw;
        setSource(chooseCanvasSource({ canvasText, pathText }));
      } catch (error) {
        if (!cancelled) setFailure(String(error).slice(0, 120));
      }
    };
    void tick();
    const timer = setInterval(() => void tick(), POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [jobId, open]);

  if (failure) {
    return <p className="reader-reading-path-note">读取失败：{failure}</p>;
  }
  if (source === null) {
    return <p className="reader-reading-path-note">加载中…</p>;
  }
  if (source.kind === "broken") {
    // 不静默退回阅读路径：agent 写坏了文件得说出来，否则你只会看到一张旧图，
    // 永远不知道该让它重写。
    return (
      <p className="reader-reading-path-note">
        <code>ai/canvas.v1.json</code> 读不懂：{source.reason}
      </p>
    );
  }
  if (source.kind === "empty") {
    return (
      <p className="reader-reading-path-note">
        还没有画布。在终端里让 fx 画一张：
        <code>把这篇论文的脉络画成 ./canvas.v1.json</code>
      </p>
    );
  }
  return <Canvas source={source} jumpRef={jumpRef} />;
}

type LoadedTldraw = typeof import("tldraw");
type TldrawEditor = Parameters<
  NonNullable<Parameters<LoadedTldraw["Tldraw"]>[0]["onMount"]>
>[0];
type PlacedNodes = ReturnType<typeof buildCanvasShapes>["placed"];

function Canvas({
  source,
  jumpRef,
}: {
  source: Extract<CanvasSource, { kind: "canvas" | "path" }>;
  jumpRef: { current: ReaderReadingPathSlotProps["onJump"] };
}) {
  const [mod, setMod] = useState<LoadedTldraw | null>(null);
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

  // 编辑器只建一次：重建会闪，也会丢掉你已经做过的平移和缩放。数据换了就删掉
  // 旧图形再放新的，而不是重建整个编辑器。
  const editorRef = useRef<TldrawEditor | null>(null);
  const placedRef = useRef<PlacedNodes | null>(null);

  const draw = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const built = source.kind === "canvas"
      ? buildCanvasShapes(source.doc)
      : { placed: null, shapes: buildShapes(source.steps as ReadingStep[]) };
    editor.deleteShapes([...editor.getCurrentPageShapeIds()]);
    editor.createShapes(built.shapes);
    editor.zoomToFit();
    placedRef.current = built.placed;
  }, [source]);

  useEffect(() => {
    draw();
  }, [draw]);

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
          editorRef.current = editor;
          draw();
          // 选中即跳转。用 side effect 而不是轮询：tldraw 没有 onShapeClick，
          // 而选中变化就是「用户点了这一个」最直接的信号。
          return editor.store.listen(
            () => {
              const selected = editor.getSelectedShapeIds();
              if (selected.length !== 1) return;
              const anchor = anchorForShape(source, placedRef.current, selected[0]);
              if (anchor) jumpRef.current(anchor);
            },
            { scope: "session", source: "user" },
          );
        }}
      />
    </div>
  );
}

/** 两种源的锚点取法不同，但给 onJump 的形状一样。 */
function anchorForShape(
  source: Extract<CanvasSource, { kind: "canvas" | "path" }>,
  placed: PlacedNodes | null,
  shapeId: string,
): { page_idx?: number; block_id?: string } | null {
  if (source.kind === "canvas") {
    const node = placed ? nodeForShapeId(placed, shapeId) : undefined;
    // 没锚点的节点（画成虚线的那些）点了不该跳 —— 跳到第 1 页比不动更让人困惑。
    if (!node?.anchor?.block_id) return null;
    return { page_idx: node.anchor.page_idx, block_id: node.anchor.block_id };
  }
  const step = stepForShapeId(source.steps as ReadingStep[], shapeId);
  return step ? { page_idx: step.page_idx, block_id: step.block_id } : null;
}
