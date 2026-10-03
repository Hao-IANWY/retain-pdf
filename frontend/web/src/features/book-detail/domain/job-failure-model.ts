/** 把后端那份失败简报翻成「用户该做什么」。
 *
 * # 为什么需要这一层
 *
 * 后端给的是分类代号（provider / timeout / translation / render / internal）和一句
 * 通用 summary。真实数据里那句 summary 常常是「任务失败，但暂未识别出明确根因」——
 * 对用户没有任何信息量，而旁边的 `failure_category=provider` + `provider=mineru`
 * 其实已经说清了「上游的问题，重试大概率能过」。
 *
 * 所以这里不直接把后端文案摆上去，而是按分类给出**该怎么办**。
 *
 * # 真实分布（15 本书 61 个任务里的 17 次失败）
 *
 *     provider / ocr          6   MinerU 解析失败，错误里自己写着 try again later
 *     translation             4   导出闸拦住（后来已修）
 *     timeout / ocr           3   上传超时
 *     render                  2
 *     internal                2   SQLite 锁冲突
 *
 * 17/17 都是 retryable。
 */

import type { JobFailureBrief } from "@/platform/contracts/library-payloads.js";

export type FailureAdvice = {
  /** 一行标题：说清是谁的问题。 */
  title: string;
  /** 该怎么办。后端 suggestion 质量参差，这里按分类给确定的说法。 */
  action: string;
  /** 重试大概率有用吗 —— 决定重试按钮是主按钮还是次按钮。 */
  retryLikelyHelps: boolean;
};

const BY_CATEGORY: Record<string, FailureAdvice> = {
  provider: {
    title: "上游服务没能处理这份文件",
    action: "多数是对方临时故障，隔一会儿重试通常能过。连续几次都失败再换解析方式。",
    retryLikelyHelps: true,
  },
  timeout: {
    title: "等待上游超时",
    action: "文件大或网络慢时会这样，直接重试。",
    retryLikelyHelps: true,
  },
  translation: {
    title: "翻译阶段中断",
    action: "已翻好的页有 checkpoint，重试会接着跑，不会整本重翻、不会重复付费。",
    retryLikelyHelps: true,
  },
  render: {
    title: "生成最终 PDF 时失败",
    action: "译文还在，重试只重跑排版这一步。",
    retryLikelyHelps: true,
  },
  internal: {
    title: "本机内部错误",
    action: "通常是并发写同一个库导致的瞬时冲突，重试即可。反复出现请把诊断信息发出来。",
    retryLikelyHelps: true,
  },
};

const FALLBACK: FailureAdvice = {
  title: "任务失败",
  action: "可以先重试一次；仍然失败请复制诊断信息。",
  retryLikelyHelps: true,
};

export function failureAdvice(failure?: JobFailureBrief | null): FailureAdvice {
  if (!failure) return FALLBACK;
  const base = BY_CATEGORY[`${failure.category || ""}`.trim().toLowerCase()] ?? FALLBACK;
  // 后端说不可重试时，不管分类怎么写都不能怂恿用户去点重试。
  if (!failure.retryable) {
    return { ...base, retryLikelyHelps: false, action: "这次失败重试解决不了，请复制诊断信息。" };
  }
  return base;
}

/** 卡片上那行副标题：谁、哪一段。 */
export function failureSubtitle(failure?: JobFailureBrief | null): string {
  if (!failure) return "";
  const stage = { ocr: "OCR", translation: "翻译", render: "渲染" }[`${failure.stage || ""}`.trim()]
    ?? failure.stage;
  const provider = `${failure.provider || ""}`.trim();
  return provider ? `${stage} · ${provider}` : `${stage}`;
}

/** 复制给排查用的那段文本。
 *
 * 刻意是纯文本而不是 JSON：用户是粘进聊天框发给我的，JSON 在那里会被折行糊成一团。
 * 也刻意**不含**任何路径和 key —— 诊断信息会被贴到外面去。
 */
export function failureDiagnosticText(input: {
  failure?: JobFailureBrief | null;
  jobId?: string;
  detail?: string;
}): string {
  const { failure, jobId, detail } = input;
  const lines = [
    `任务: ${jobId || "(未知)"}`,
    failure ? `分类: ${failure.category} / ${failure.stage}` : "",
    failure?.provider ? `上游: ${failure.provider}` : "",
    failure ? `可重试: ${failure.retryable ? "是" : "否"}` : "",
    failure?.root_cause ? `根因: ${failure.root_cause}` : "",
    detail ? `\n完整错误:\n${detail}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}
