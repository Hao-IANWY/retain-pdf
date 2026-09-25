import { jsx as r, jsxs as n, Fragment as y } from "react/jsx-runtime";
import { useState as m, useCallback as g, useEffect as k } from "react";
import { c as x, f as b, A as F, b as P } from "./ReaderApp-BMCbtPv6.js";
import { normalizeServerFavorite as S } from "./runtime/state.js";
function A(t) {
  const a = `${t || ""}`.trim();
  return a === "figure" ? "图表" : a === "data" ? "数据" : a === "sentence" ? "摘录" : a || "摘录";
}
function q({
  open: t,
  jobId: a,
  documentId: s,
  onClose: u,
  onJumpPage: v
}) {
  const [o, l] = m([]), [i, p] = m(!1), [h, c] = m(""), d = g(async () => {
    if (!a && !s) {
      l([]), c("当前没有可关联的文档");
      return;
    }
    p(!0), c("");
    try {
      let e = [];
      if (a)
        e = await x({ jobId: a }).loadServerFavorites();
      else if (s) {
        const { favorites: f = [] } = await b(F, { documentId: s });
        e = (Array.isArray(f) ? f : []).map((N) => S(N)).filter(Boolean);
      }
      l(e);
    } catch (e) {
      c(e instanceof Error ? e.message : "读取摘录失败"), l([]);
    } finally {
      p(!1);
    }
  }, [a, s]);
  return k(() => {
    t && d();
  }, [t, d]), /* @__PURE__ */ r(
    P,
    {
      id: "reader-favorites-panel",
      open: t,
      ariaLabel: "摘录",
      className: "is-pane-right",
      onClose: u,
      toolbar: /* @__PURE__ */ n(y, { children: [
        /* @__PURE__ */ r("span", { className: "reader-notes-count", children: i ? "加载中…" : `${o.length} 条` }),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            disabled: i,
            onClick: () => void d(),
            children: "刷新"
          }
        )
      ] }),
      children: h ? /* @__PURE__ */ r("p", { className: "reader-notes-empty", role: "alert", children: h }) : i ? /* @__PURE__ */ r("p", { className: "reader-notes-empty", children: "正在加载摘录…" }) : o.length === 0 ? /* @__PURE__ */ r("p", { className: "reader-notes-empty", children: "暂无摘录。可从主页收藏内容后在这里定位阅读。" }) : o.map((e) => /* @__PURE__ */ n("article", { className: "reader-notes-item", children: [
        /* @__PURE__ */ n("div", { className: "reader-notes-item-top", children: [
          /* @__PURE__ */ r("span", { className: "reader-notes-kind", children: A(e.kind) }),
          /* @__PURE__ */ r("div", { className: "reader-notes-item-actions", children: /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "reader-notes-link",
              onClick: () => v(Math.max(1, (e.pageIdx || 0) + 1)),
              children: [
                "第 ",
                (e.pageIdx || 0) + 1,
                " 页"
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ r("p", { className: "reader-notes-quote", children: e.quoteText }),
        e.note ? /* @__PURE__ */ r("p", { className: "reader-notes-note", style: { cursor: "default" }, children: e.note }) : null
      ] }, e.favoriteId))
    }
  );
}
export {
  q as ReaderFavoritesPanel
};
//# sourceMappingURL=ReaderFavoritesPanel-CSwONLDs.js.map
