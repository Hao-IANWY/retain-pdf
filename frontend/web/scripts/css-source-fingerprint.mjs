/** 源 CSS 的内容指纹 —— 构建时写下，测试时重算比对。
 *
 * # 为什么需要它
 *
 * `tests/layout/*` 两条浏览器门禁量的是**构建产物** `dist/css/reader.css`（源分片
 * 单独看都没问题，问题出在层叠合到一起之后）。而：
 *
 *   - `npm test` 的 pretest 只跑 prepare:workspace，**不碰 dist/css**
 *   - CI 的 frontend job 也只跑包的 build，从不跑 bundle:css
 *   - `dist/css/reader.css` 是**被 git 跟踪**的
 *
 * 于是改完源 CSS 不跑 `build:css`，那两条门禁读的还是上次提交的那份产物，照样绿 ——
 * 而「改完忘了 build」恰恰是最容易发生的一步。
 *
 * 不用 mtime 比较：git checkout 不保留 mtime，CI 上所有文件都是 checkout 时间、
 * 先后顺序不定，产物可能看起来比源文件旧 → 假红。内容哈希没有这个问题。
 *
 * 不在 pretest 里直接重建：`bundle:css` 实测 17.75 秒，而套件本身约 50 秒 ——
 * 为了 2 条门禁给每次 npm test 加 35% 不划算。门禁比构建步骤便宜得多。
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const WEB_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const REPO_ROOT = dirname(dirname(WEB_ROOT));

/** reader.css 的源：入口自己，加上它 @import 的那棵 reader 样式树。
 *
 * 入口里另外两个 @import 是 `tailwindcss` 和 `@xterm/xterm/css/xterm.css` ——
 * 它们随 node_modules 走，由 lockfile 管，不在这里追。 */
export const CSS_SOURCES = [
  { kind: "file", path: join(WEB_ROOT, "src/styles/entries/reader.css") },
  { kind: "dir", path: join(REPO_ROOT, "frontend/packages/reader/styles") },
];

export const FINGERPRINT_PATH = join(WEB_ROOT, "dist/css/.reader-sources.sha256");

function cssFilesUnder(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...cssFilesUnder(full));
    else if (entry.endsWith(".css")) out.push(full);
  }
  return out;
}

/** 列出全部源文件，按仓库相对路径排序 —— 排序必须稳定，否则指纹随文件系统漂。 */
export function readerCssSourceFiles() {
  const files = [];
  for (const source of CSS_SOURCES) {
    if (source.kind === "file") files.push(source.path);
    else files.push(...cssFilesUnder(source.path));
  }
  return files.sort();
}

/** 指纹里带上路径，这样「新增/删除一个分片」也会变 —— 只哈希内容的话，
 *  把一个文件原封不动改个名就察觉不到。 */
export function computeReaderCssFingerprint() {
  const hash = createHash("sha256");
  for (const file of readerCssSourceFiles()) {
    hash.update(relative(REPO_ROOT, file).split("\\").join("/"));
    hash.update("\0");
    hash.update(readFileSync(file));
    hash.update("\0");
  }
  return hash.digest("hex");
}
