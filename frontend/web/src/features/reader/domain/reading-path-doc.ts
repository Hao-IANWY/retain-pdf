/** 读 agent 写的 `reading-path.v1.json`。
 *
 * 单独成模块的理由和 `reading-canvas-doc.ts` 一样:**解析不碰 React**。面板
 * 那边全是 hook 和轮询,把"文件长什么样"混进去之后,想验一条畸形数据就得先
 * 起一个组件。
 *
 * ## 对畸形数据的两种态度
 *
 * - **单步坏掉:丢掉那一步**。文件是模型生成的,形状不保证。让整个面板因为
 *   一步缺 block_id 而白屏,比少显示一步糟糕得多。
 * - **整个文件不是 JSON:抛**。那说明 agent 把文件写坏了,得说出来 —— 静默
 *   显示空列表的话,用户只会觉得"它没干活",而不会想到让它重写一遍。
 */

export type ReadingPathStep = {
  order?: number;
  page_idx?: number;
  block_id?: string;
  why?: string;
};

/** 文件原文 → 能用的步骤。JSON 坏掉时抛,单步坏掉时丢。 */
export function parseReadingPathSteps(raw: string): ReadingPathStep[] {
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    // 不透传 JSON.parse 的原文:那句话("Unexpected token < in JSON at
    // position 0")对着 agent 写坏的文件毫无指向性。
    throw new Error("阅读路径文件不是合法 JSON —— 让 agent 重写一遍");
  }
  const steps = (payload as { steps?: unknown } | null)?.steps;
  if (!Array.isArray(steps)) return [];
  return steps.filter(
    (step): step is ReadingPathStep =>
      // block_id 是锚点,没有它这一步点了跳不到任何地方,留着只会骗人。
      !!step && typeof (step as ReadingPathStep).block_id === "string",
  );
}
