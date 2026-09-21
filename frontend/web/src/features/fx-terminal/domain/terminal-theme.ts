/** xterm 的配色必须从皮肤令牌读，不能写死。
 *
 * 两个原因，第二个是硬约束：
 * 1. 全站有 5 套皮肤（classic/jiangnan/mojia/seacliff/…），终端写死色就会在
 *    换肤时变成唯一一块不跟随的区域。
 * 2. tests/architecture/tsx-color-literals.test.mjs 是棘轮门禁，**新文件必须
 *    零颜色字面量**。xterm 的 ITheme 要十几个颜色，一个都不能自己编。
 *
 * 取值走 themes/_contract.css 的必选 20 项，语义对齐而不是挑好看的：
 * 报错用 --danger，成功用 --ok，警告用 --warn，强调用 --accent。
 *
 * 本模块是纯函数：只依赖一个「读变量」的回调，不碰 document，
 * 所以能在 jsdom 里直接测，不用把 xterm 拖进测试。
 */

/** 读一个 CSS 自定义属性；拿不到就返回空串。 */
export type ReadCssVariable = (name: string) => string;

/** xterm 的 ITheme 子集——只列我们真的会设的键，避免假装支持全部。 */
export type TerminalTheme = {
  background: string;
  foreground: string;
  cursor: string;
  cursorAccent: string;
  selectionBackground: string;
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightMagenta: string;
  brightCyan: string;
  brightWhite: string;
};

/** 令牌名 → 兜底令牌名。皮肤没写可选项时退到必选项，绝不退到字面色。 */
const FALLBACK: Record<string, string> = {
  "--surface": "--paper",
  "--accent-weak": "--accent",
  "--danger-weak": "--danger",
  "--ok-weak": "--ok",
  "--warn-weak": "--warn",
  "--gold-weak": "--gold",
};

function pick(read: ReadCssVariable, name: string): string {
  const direct = read(name).trim();
  if (direct) return direct;
  const fallback = FALLBACK[name];
  return fallback ? read(fallback).trim() : "";
}

/** 把皮肤令牌映射成 xterm 配色。
 *
 * 任何一项取不到就整体返回 null —— 宁可让 xterm 用它自己的默认配色，也不要
 * 半套令牌半套默认拼出一个没人设计过的样子。调用方据此决定传不传 theme。
 */
export function readTerminalTheme(read: ReadCssVariable): TerminalTheme | null {
  const theme: TerminalTheme = {
    background: pick(read, "--surface"),
    foreground: pick(read, "--ink"),
    cursor: pick(read, "--accent"),
    cursorAccent: pick(read, "--paper"),
    selectionBackground: pick(read, "--selection"),
    // 标准 8 色：ANSI 的语义与皮肤语义对齐，不按色相硬凑。
    black: pick(read, "--ink"),
    red: pick(read, "--danger"),
    green: pick(read, "--ok"),
    yellow: pick(read, "--warn"),
    blue: pick(read, "--accent"),
    magenta: pick(read, "--gold"),
    cyan: pick(read, "--accent-weak"),
    white: pick(read, "--muted"),
    // bright 组走各自的 weak/强对照，保持同一皮肤内的明度关系。
    brightBlack: pick(read, "--line"),
    brightRed: pick(read, "--danger-weak"),
    brightGreen: pick(read, "--ok-weak"),
    brightYellow: pick(read, "--warn-weak"),
    brightBlue: pick(read, "--accent-weak"),
    brightMagenta: pick(read, "--gold-weak"),
    brightCyan: pick(read, "--accent"),
    brightWhite: pick(read, "--paper"),
  };
  for (const value of Object.values(theme)) {
    if (!value) return null;
  }
  return theme;
}

/** 绑到真实元素上的读取器。抽出来是为了让上面那个函数保持纯函数。 */
export function cssVariableReader(element: Element): ReadCssVariable {
  const styles = getComputedStyle(element);
  return (name) => styles.getPropertyValue(name);
}
