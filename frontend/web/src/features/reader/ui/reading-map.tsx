/** 阅读地图 —— agent 产物的两种看法：列表和画布。
 *
 * ## 为什么合成一个
 *
 * 这两个原来是 dock 里并列的两个 tab，而它们**在互相解释自己不是对方**：
 * `adapters.ts` 的注释写着「同一份数据的两个渲染器」，画布的空状态写着
 * 「阅读路径在旁边那个 tab」。用户看到两个名字，没有任何依据判断该点哪个。
 *
 * 实际关系是：两者读的是不同文件（`reading-path.v1.json` / `canvas.v1.json`），
 * 但都是 agent 对同一篇论文结构的产出 —— 一个给顺序，一个给空间关系。这是
 * **同一件事的两个视角**，该是一个面板里的切换，不是两个面板。
 *
 * ## 视图切换保留在面板内，不做成两个 tab
 *
 * 切视图只换右边这块内容，dock 的 tab 不动 —— 这样「我在看阅读地图」这件事
 * 不会因为换个视角就变成「我切到别的面板了」。
 *
 * ## 画布保持懒加载
 *
 * tldraw 1.6 MB 仍然只在切到画布视图时才 `import("tldraw")`（那个动态 import
 * 在 reading-canvas.tsx 里，没动）。合并没有把它拽进首屏 —— 有门禁守着
 * （tests/reader/lazy-stylesheet.test.mjs）。
 */
import { useState } from "react";
import type { ReaderReadingPathSlotProps } from "@retainpdf/reader/adapters";

import { renderReaderReadingPath } from "./reading-path.js";
import { renderReaderReadingCanvas } from "./reading-canvas.js";

type MapView = "list" | "canvas";

const VIEWS: ReadonlyArray<{ id: MapView; label: string; hint: string }> = [
  { id: "list", label: "路径", hint: "agent 写的先读哪、再读哪，点一步跳过去" },
  { id: "canvas", label: "画布", hint: "概念图和 agent 丢进 board/ 的东西" },
];

export function renderReaderReadingMap(props: ReaderReadingPathSlotProps) {
  if (!props.jobId) return null;
  return <ReadingMapPanel key={props.jobId} {...props} />;
}

function ReadingMapPanel(props: ReaderReadingPathSlotProps) {
  const [view, setView] = useState<MapView>("list");
  return (
    <div className="reader-reading-map">
      <div className="reader-reading-map-views" aria-label="阅读地图视图">
        {VIEWS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="reader-reading-map-view"
            aria-pressed={view === item.id}
            title={item.hint}
            onClick={() => setView(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {/* 两个视图都留在树上：画布卸载会让 tldraw 整个重建（闪一下，而且丢掉
          用户的平移缩放）。非当前的挪到屏幕外，不能用 display:none —— 那会让
          tldraw 量到 0 尺寸。和终端标签同一套手法。 */}
      <div className="reader-reading-map-body" data-hidden={view !== "list" ? "" : undefined}>
        {renderReaderReadingPath({ ...props, open: props.open && view === "list" })}
      </div>
      <div className="reader-reading-map-body" data-hidden={view !== "canvas" ? "" : undefined}>
        {renderReaderReadingCanvas({ ...props, open: props.open && view === "canvas" })}
      </div>
    </div>
  );
}
