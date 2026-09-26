/** 画布面板 —— agent 在这里给你讲这篇论文。
 *
 * 三个数据源，同时显示：
 *
 *     ai/board/                **画板目录** —— 丢进去什么就显示什么
 *     ai/canvas.v1.json        概念图（节点 + 箭头），画在画板左边
 *     ai/reading-path.v1.json  两者都没有时退回步骤卡片
 *
 * 画板是重点：agent 手里已经有 shell 了，`python3` 画张图、`typst` 排一份 PDF、
 * `jq` 导个表，丢进 `board/` 就能看见 —— 不需要我们为每种可视化新增一套 schema
 * 和渲染器。前三个产物就是那么加的，加到第三次 AGENTS.md 一半篇幅都在教格式。
 *
 * 三份都由 agent 在终端里写，我们只读。概念图的节点点击跳到 PDF 对应位置。
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

import {
  type CanvasSource,
  chooseCanvasSource,
  imageRefsOf,
} from "../domain/reading-canvas-doc.js";
import {
  type CanvasImage,
  buildCanvasShapes,
  nodeForShapeId,
} from "../domain/reading-canvas-render.js";
import {
  READER_CANVAS_STYLESHEET,
  ensureLazyStylesheet,
} from "../domain/lazy-stylesheet.js";
import { AGENT_ARTIFACT_POLL_MS } from "../domain/agent-artifacts.js";
import { type BoardItem, type BoardListing, buildBoardShapes } from "../domain/board.js";
import {
  fetchArtifact,
  fetchBoardListing,
  loadBoardItem,
  loadImage,
} from "../domain/canvas-fetch.js";



/** 概念图那一列占多宽。画板从这里往右开始，两边不重叠。 */
const LEFT_COLUMN_W = 760;

export function renderReaderReadingCanvas(props: ReaderReadingPathSlotProps) {
  if (!props.jobId) return null;
  return <ReadingCanvasPanel key={props.jobId} {...props} />;
}

function ReadingCanvasPanel({ open, jobId, onJump }: ReaderReadingPathSlotProps) {
  const [source, setSource] = useState<CanvasSource | null>(null);
  const [board, setBoard] = useState<BoardListing[]>([]);
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
        const [canvasText, listing] = await Promise.all([
          fetchArtifact(jobId, "canvas"),
          fetchBoardListing(jobId),
        ]);
        if (cancelled) return;
        // 画板的指纹用「名字 + 修改时间」，不用文件内容 —— 内容要再发 N 个请求，
        // 而 agent 重写一个文件必然改 mtime。
        const boardRaw = (listing ?? [])
          .map((item) => `${item.name}@${item.modifiedMs}`)
          .join(",");
        const raw = `${canvasText ?? ""}\u0000${boardRaw}`;
        setFailure("");
        if (raw === lastRawRef.current) return;
        lastRawRef.current = raw;
        setBoard(listing ?? []);
        setSource(chooseCanvasSource({ canvasText }));
      } catch (error) {
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
  if (source.kind === "empty" && board.length === 0) {
    return (
      <p className="reader-reading-path-note">
        画布是空的。这里放概念图和 agent 画的东西（阅读顺序在「路径」那个视图）。
        在终端里让 fx 往里放：它有 python3、jq、typst，产物丢进
        <code>./board/</code> 就会出现在这里：
        <code>把每页的翻译问题数画成柱状图，存到 ./board/issues.png</code>
        图和 PDF 都收（PDF 画第 1 页）。
      </p>
    );
  }
  return <Canvas source={source} board={board} jobId={jobId} jumpRef={jumpRef} />;
}

type LoadedTldraw = typeof import("tldraw");
type TldrawEditor = Parameters<
  NonNullable<Parameters<LoadedTldraw["Tldraw"]>[0]["onMount"]>
>[0];
type PlacedNodes = ReturnType<typeof buildCanvasShapes>["placed"];
type TldrawShapes = Parameters<TldrawEditor["createShapes"]>[0];
type TldrawAssets = Parameters<TldrawEditor["createAssets"]>[0];

function Canvas({
  source,
  board,
  jobId,
  jumpRef,
}: {
  source: CanvasSource;
  board: readonly BoardListing[];
  jobId: string;
  jumpRef: { current: ReaderReadingPathSlotProps["onJump"] };
}) {
  const [mod, setMod] = useState<LoadedTldraw | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [images, setImages] = useState<ReadonlyMap<string, CanvasImage>>(new Map());
  const [boardItems, setBoardItems] = useState<BoardItem[]>([]);

  // 画板内容。依赖用「名字@时间」拼的字符串，不用数组 —— 数组每次渲染都是新的，
  // 直接放进依赖会无限取文件。
  const boardKey = board.map((item) => `${item.name}@${item.modifiedMs}`).join(",");
  useEffect(() => {
    if (!board.length) return setBoardItems([]);
    let cancelled = false;
    void (async () => {
      const loaded = await Promise.all(board.map((item) => loadBoardItem(jobId, item)));
      if (cancelled) return;
      setBoardItems(loaded.filter((item): item is BoardItem => !!item));
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId, boardKey]);

  const refs = source.kind === "canvas" ? imageRefsOf(source.doc) : [];
  // 文件名列表拼成字符串当依赖：数组每次渲染都是新的，直接放进依赖数组会无限取图。
  const refsKey = refs.join("\u0000");
  useEffect(() => {
    if (!refsKey) return setImages(new Map());
    let cancelled = false;
    void (async () => {
      const loaded = await Promise.all(
        refsKey.split("\u0000").map((name) => loadImage(jobId, name)),
      );
      if (cancelled) return;
      setImages(new Map(loaded.filter((item): item is CanvasImage => !!item).map((i) => [i.name, i])));
    })();
    return () => {
      cancelled = true;
    };
  }, [jobId, refsKey]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        // 样式和组件**并行**加载，但都等到齐再渲染：先渲染再上样式会闪一下
        // 无样式的画布。样式是单独产物（75 KB），不进 reader.html 的渲染阻塞链
        // —— 见 domain/lazy-stylesheet.ts。
        const [loaded] = await Promise.all([
          import("tldraw"),
          ensureLazyStylesheet(READER_CANVAS_STYLESHEET),
        ]);
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
    // 概念图占左边，画板从它右边开始往下铺。
    let leftShapes: TldrawShapes = [];
    let leftAssets: TldrawAssets = [];
    let leftPlaced: PlacedNodes | null = null;
    if (source.kind === "canvas") {
      const built = buildCanvasShapes(source.doc, images);
      leftShapes = built.shapes;
      leftAssets = built.assets;
      leftPlaced = built.placed;
    }
    const right = buildBoardShapes(boardItems, leftShapes.length ? LEFT_COLUMN_W : 0);

    editor.deleteShapes([...editor.getCurrentPageShapeIds()]);
    // 资产要先于引用它的图形存在，否则图片图形拿不到 src，画出来是空框。
    const assets = [...leftAssets, ...right.assets];
    if (assets.length) editor.createAssets(assets);
    editor.createShapes([...leftShapes, ...right.shapes]);
    editor.zoomToFit();
    placedRef.current = leftPlaced;
  }, [boardItems, images, source]);

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
  source: CanvasSource,
  placed: PlacedNodes | null,
  shapeId: string,
): { page_idx?: number; block_id?: string } | null {
  // 画板上的东西没有锚点（它们是 agent 用 shell 产出的文件，不一定对应某个块），
  // 点了不跳 —— 跳到第 1 页比不动更让人困惑。
  if (source.kind !== "canvas") return null;
  const node = placed ? nodeForShapeId(placed, shapeId) : undefined;
  // 没锚点的节点（画成虚线的那些）同理，点了不该跳。
  if (!node?.anchor?.block_id) return null;
  return { page_idx: node.anchor.page_idx, block_id: node.anchor.block_id };
}
