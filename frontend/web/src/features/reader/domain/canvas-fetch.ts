/** 画布面板要取的东西：三份 agent 产物 + 画板文件 + 论文配图。
 *
 * 单独成模块只有一个理由：**它不碰 React**，而面板那边全是 hook。混在一起时
 * 那个文件到了 390 行，撞上体量棘轮（阈值 380）。拆开之后一边认端点和解码，
 * 一边认渲染。
 *
 * 共同的约定：**取不到就返回 null，不抛**。这些都是叠加层 —— 一个文件挂了不该
 * 让整块画布消失，更不该让阅读页报错。唯一会抛的是 `fetchArtifact` 的非 404
 * 错误码，因为那说明服务端真出问题了，该让人看见。
 */
import { apiBase, frontendApiKey } from "@/platform/config/runtime.js";

import { type BoardItem, type BoardListing, parseBoardListing } from "./board.js";
import { rasterizeBoardPdf } from "./board-pdf.js";
import type { CanvasImage } from "./reading-canvas-render.js";

/** 404 = 文件不存在，是正常状态，返回 null。其余非 2xx 才是真失败。 */
export async function fetchArtifact(jobId: string, name: string): Promise<string | null> {
  const response = await fetch(
    new URL(`/api/v1/jobs/${encodeURIComponent(jobId)}/${name}`, apiBase()),
    { headers: { "X-API-Key": frontendApiKey() } },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.text();
}

/** 画板里有什么。这个端点永远 200（目录不存在就是空列表）—— 画板是叠加层，
 * 「还没往里放过」是正常状态，不该走错误分支。 */
export async function fetchBoardListing(jobId: string): Promise<BoardListing[] | null> {
  const response = await fetch(
    new URL(`/api/v1/jobs/${encodeURIComponent(jobId)}/board`, apiBase()),
    { headers: { "X-API-Key": frontendApiKey() } },
  );
  if (!response.ok) return null;
  const payload = await response.json();
  return parseBoardListing(payload?.data ?? payload);
}

/** 取画板里的一个文件。图片转 data URL 并解码尺寸，PDF 先渲第 1 页再当图片用，
 * 文本直接拿原文。
 *
 * 一个文件取不到就跳过它，不让整块画板消失 —— 和论文配图同样的处理。 */
export async function loadBoardItem(jobId: string, listing: BoardListing): Promise<BoardItem | null> {
  try {
    const response = await fetch(
      new URL(
        `/api/v1/jobs/${encodeURIComponent(jobId)}/board/${encodeURIComponent(listing.name)}`,
        apiBase(),
      ),
      { headers: { "X-API-Key": frontendApiKey() } },
    );
    if (!response.ok) return null;
    if (listing.kind === "pdf") {
      // 渲不出来也要把这一项留着：返回 null 的话画板上就少一个东西，而 agent
      // 明明写了 —— 让它退回成一张写着原因的卡片（见 boardCardText）。
      const raster = await rasterizeBoardPdf(await response.arrayBuffer());
      if (!raster) return { ...listing };
      return {
        ...listing,
        dataUrl: raster.dataUrl,
        imageW: raster.w,
        imageH: raster.h,
        pageCount: raster.pageCount,
      };
    }
    if (listing.kind !== "image") {
      return { ...listing, text: await response.text() };
    }
    const blob = await response.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
    const size = await new Promise<{ w: number; h: number }>((resolve, reject) => {
      const probe = new Image();
      probe.onload = () => resolve({ w: probe.naturalWidth, h: probe.naturalHeight });
      probe.onerror = () => reject(new Error("decode failed"));
      probe.src = dataUrl;
    });
    return { ...listing, dataUrl, imageW: size.w, imageH: size.h };
  } catch {
    return null;
  }
}

/** 论文里的图。走 `data:` URL 而不是 blob：tldraw 的资产校验器拒绝 `blob:`
 * （实测报 invalid protocol），而图片端点要 `X-API-Key`，`<img src>` 带不了
 * header —— 所以在这里带着 key 取回来再转。
 *
 * 尺寸必须解码出来：图形的 w/h 决定画多大，按错的比例画会把图拉变形。
 */
export async function loadImage(jobId: string, name: string): Promise<CanvasImage | null> {
  try {
    const response = await fetch(
      new URL(
        `/api/v1/jobs/${encodeURIComponent(jobId)}/markdown/images/${encodeURIComponent(name)}`,
        apiBase(),
      ),
      { headers: { "X-API-Key": frontendApiKey() } },
    );
    if (!response.ok) return null;
    const blob = await response.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
    const size = await new Promise<{ w: number; h: number }>((resolve, reject) => {
      const probe = new Image();
      probe.onload = () => resolve({ w: probe.naturalWidth, h: probe.naturalHeight });
      probe.onerror = () => reject(new Error("decode failed"));
      probe.src = dataUrl;
    });
    return { name, dataUrl, w: size.w, h: size.h };
  } catch {
    // 一张图取不到不该让整张画布消失 —— 那个节点退回成文字框。
    return null;
  }
}
