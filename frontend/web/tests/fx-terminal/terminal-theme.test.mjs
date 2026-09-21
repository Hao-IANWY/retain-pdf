import test from "node:test";
import assert from "node:assert/strict";

const { readTerminalTheme } = await import(
  "../../src/features/fx-terminal/domain/terminal-theme.js"
);

// themes/_contract.css 的必选项。用占位串而不是真颜色：这份测试关心的是
// 「有没有把某一项漏成空」，不关心色值，也不该在测试里引入颜色字面量。
const CONTRACT = {
  "--bg": "bg",
  "--paper": "paper",
  "--surface": "surface",
  "--ink": "ink",
  "--muted": "muted",
  "--line": "line",
  "--accent": "accent",
  "--accent-weak": "accent-weak",
  "--selection": "selection",
  "--danger": "danger",
  "--danger-weak": "danger-weak",
  "--ok": "ok",
  "--ok-weak": "ok-weak",
  "--warn": "warn",
  "--warn-weak": "warn-weak",
  "--gold": "gold",
  "--gold-weak": "gold-weak",
};

const readerFor = (vars) => (name) => vars[name] ?? "";

test("皮肤令牌齐全时，每一项都来自令牌，没有一项是自己编的", () => {
  const theme = readTerminalTheme(readerFor(CONTRACT));
  assert.ok(theme, "契约齐全却返回了 null");
  const allowed = new Set(Object.values(CONTRACT));
  for (const [key, value] of Object.entries(theme)) {
    assert.ok(allowed.has(value), `${key}=${value} 不是任何一个皮肤令牌的值`);
  }
});

test("语义要对齐，不是挑色相：报错→danger，成功→ok，警告→warn", () => {
  const theme = readTerminalTheme(readerFor(CONTRACT));
  assert.equal(theme.red, "danger");
  assert.equal(theme.green, "ok");
  assert.equal(theme.yellow, "warn");
  assert.equal(theme.cursor, "accent");
});

test("可选令牌缺失时退到必选项，而不是退到空或字面色", () => {
  const partial = { ...CONTRACT };
  delete partial["--danger-weak"];
  delete partial["--accent-weak"];
  const theme = readTerminalTheme(readerFor(partial));
  assert.ok(theme, "可选项缺失不该让整套配色失效");
  assert.equal(theme.brightRed, "danger", "--danger-weak 缺失应退到 --danger");
  assert.equal(theme.cyan, "accent", "--accent-weak 缺失应退到 --accent");
});

test("背景用 --bg，不用半透明的 --surface", () => {
  // --surface 在 night 里是 rgba(…,0.88)，叠在浅色页面上会被冲淡。
  // 终端要的是一块实底。
  const theme = readTerminalTheme(readerFor(CONTRACT));
  assert.equal(theme.background, "bg");
});

test("必选令牌缺一项就整体放弃，不拼半套", () => {
  for (const required of ["--ink", "--accent", "--selection", "--ok"]) {
    const broken = { ...CONTRACT };
    delete broken[required];
    assert.equal(
      readTerminalTheme(readerFor(broken)),
      null,
      `${required} 缺失时仍返回了配色 —— 会拼出半套令牌半套 xterm 默认色`,
    );
  }
});
