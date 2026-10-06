// 最近任务分页结果的提交：page / empty / no-more / error 四种 commit 怎么改状态、交给谁渲染。
// 从原 recent-jobs.test.mjs 拆出，用例原样搬移。

import test from "node:test";
import assert from "node:assert/strict";
import { createRecentJobsStatePort } from "../../src/features/library/domain/recent-jobs/state.js";
import {
  commitRecentJobsEmpty,
  commitRecentJobsError,
  commitRecentJobsNoMore,
  commitRecentJobsPage,
} from "../../src/features/library/domain/recent-jobs/commit.js";
import { createRecentJobsRuntimePatches } from "../../src/features/library/domain/recent-jobs/runtime-patches.js";
import { createRecentJobsStoreRenderer } from "../../src/features/library/domain/recent-jobs/store-renderer.js";

test("recent jobs page commit refreshes cards and silently recovers the active job", () => {
  // 旧 DOM 直写 viewPort(createRecentJobsViewPort() 默认值)已随 cutover 删除
  // (controller/runtime/loader/commit/bindings 5 处默认参数改必传;view.js 等
  // 视图层随之物理删除)。这里改用最小 stub 直接捕获 renderList 的 items,
  // 不再模拟 document/fragment——断言意图不变(渲染了哪些 job id)。
  const rendered = [];
  const recovered = [];
  const refreshCalls = [];
  const autoLoads = [];
  const viewPort = {
    renderList: ({ items }) => {
      rendered.push(...items.map((item) => item.job_id));
    },
  };

  const statePort = createRecentJobsStatePort({
    recentJobsOffset: 0,
    recentJobsHasMore: true,
    recentJobsItems: [],
  });
  const runtimePatches = createRecentJobsRuntimePatches({
    statePort,
    replaceRecentJobCard: () => false,
    renderCurrentRecentJobs() {},
    scheduleActiveRefresh() {},
  });

  const result = commitRecentJobsPage({
    reset: true,
    collected: [{ job_id: "job-running", status: "running" }],
    hasMore: true,
    nextOffset: 24,
    recentJobActions: {
      recoverActiveJob: (items) => recovered.push(items.map((item) => item.job_id)),
      selectJob() {},
      deleteJob() {},
      openJobReader() {},
    },
    runtimePatches,
    activeRefreshLoop: () => ({
      schedule: () => refreshCalls.push("schedule"),
      stop: () => refreshCalls.push("stop"),
    }),
    scheduleAutoLoadIfNeeded: () => autoLoads.push("auto"),
    recentJobsStatePort: statePort,
    setTimeoutFn(callback) {
      callback();
      return 1;
    },
    viewPort,
  });

  assert.deepEqual(result.nextItems.map((item) => item.job_id), ["job-running"]);
  assert.deepEqual(rendered, ["job-running"]);
  assert.deepEqual(recovered, [["job-running"]]);
  assert.deepEqual(refreshCalls, ["schedule"]);
  assert.deepEqual(autoLoads, ["auto"]);
  assert.equal(statePort.getSnapshot().offset, 24);
});

test("recent jobs page commit can delegate page rendering to the store renderer", () => {
  const statePort = createRecentJobsStatePort({
    recentJobsOffset: 0,
    recentJobsHasMore: true,
    recentJobsItems: [],
  });
  const storeRenders = [];
  const renderer = createRecentJobsStoreRenderer({
    recentJobsStatePort: statePort,
    renderActions: ["setOffset"],
    renderRecentJobsList: (payload) => {
      storeRenders.push({
        items: payload.items.map((item) => item.job_id),
        invocationSummary: payload.invocationSummary,
        hasMore: payload.hasMore,
      });
    },
  });
  const runtimePatches = createRecentJobsRuntimePatches({
    statePort,
    replaceRecentJobCard: () => false,
    renderCurrentRecentJobs() {
      throw new Error("commit should not use runtime rerender in store-driven mode");
    },
    scheduleActiveRefresh() {},
    storeDrivenRendering: true,
  });
  const recentJobActions = {
    recoverActiveJob() {},
    selectJob() {},
    deleteJob() {},
    openJobReader() {},
  };

  try {
    const result = commitRecentJobsPage({
      reset: true,
      collected: [{ job_id: "job-store-rendered", status: "succeeded" }],
      hasMore: false,
      invocationSummary: { stage_spec_count: 7, unknown_count: 2 },
      nextOffset: 10,
      recentJobActions,
      runtimePatches,
      activeRefreshLoop: () => ({
        schedule() {},
        stop() {},
      }),
      scheduleAutoLoadIfNeeded() {},
      recentJobsStatePort: statePort,
      storeDrivenRendering: true,
    });

    assert.deepEqual(result.nextItems.map((item) => item.job_id), ["job-store-rendered"]);
    assert.deepEqual(storeRenders, [
      {
        items: ["job-store-rendered"],
        invocationSummary: { stage_spec_count: 7, unknown_count: 2 },
        hasMore: false,
      },
    ]);
  } finally {
    renderer.unmount();
  }
});

test("recent jobs page commit can route rendering through the view port", () => {
  const statePort = createRecentJobsStatePort({
    recentJobsOffset: 0,
    recentJobsHasMore: true,
    recentJobsItems: [],
  });
  const rendered = [];
  const result = commitRecentJobsPage({
    reset: true,
    collected: [{ job_id: "job-view-port-commit", status: "succeeded" }],
    hasMore: false,
    nextOffset: 10,
    recentJobActions: {
      recoverActiveJob() {},
      selectJob() {},
      deleteJob() {},
      openJobReader() {},
    },
    runtimePatches: createRecentJobsRuntimePatches({
      statePort,
      replaceRecentJobCard: () => false,
      renderCurrentRecentJobs() {},
      scheduleActiveRefresh() {},
    }),
    activeRefreshLoop: () => ({
      schedule() {},
      stop() {},
    }),
    scheduleAutoLoadIfNeeded() {},
    recentJobsStatePort: statePort,
    viewPort: {
      renderList(payload) {
        rendered.push(payload.items.map((item) => item.job_id));
      },
    },
  });

  assert.deepEqual(result.nextItems.map((item) => item.job_id), ["job-view-port-commit"]);
  assert.deepEqual(rendered, [["job-view-port-commit"]]);
});

test("recent jobs page commit appends only collected items while preserving state patches", () => {
  // 旧 DOM 直写 viewPort 已随 cutover 删除,改用最小 stub 直接捕获渲染 items。
  const rendered = [];
  const viewPort = {
    renderList: ({ items }) => {
      rendered.push(...items.map((item) => item.job_id));
    },
  };

  const statePort = createRecentJobsStatePort({
    recentJobsOffset: 24,
    recentJobsHasMore: true,
    recentJobsItems: [
      { job_id: "job-created-active", status: "running" },
      { job_id: "job-existing", status: "succeeded" },
    ],
  });
  const runtimePatches = createRecentJobsRuntimePatches({
    statePort,
    replaceRecentJobCard: () => false,
    renderCurrentRecentJobs() {},
    scheduleActiveRefresh() {},
  });
  runtimePatches.insert({
    job_id: "job-created-active",
    status: "running",
    display_stage: "ocr",
    progress: { current: 1, total: 10, unit: "page" },
  });

  const result = commitRecentJobsPage({
    reset: false,
    collected: [{ job_id: "job-page-2", status: "succeeded" }],
    hasMore: false,
    nextOffset: 48,
    recentJobActions: {
      recoverActiveJob() {},
      selectJob() {},
      deleteJob() {},
      openJobReader() {},
    },
    runtimePatches,
    activeRefreshLoop: () => ({
      schedule() {},
      stop() {},
    }),
    scheduleAutoLoadIfNeeded() {},
    recentJobsStatePort: statePort,
    viewPort,
  });

  assert.deepEqual(rendered, ["job-page-2"]);
  assert.deepEqual(result.nextItems.map((item) => item.job_id), [
    "job-created-active",
    "job-existing",
    "job-page-2",
  ]);
  assert.deepEqual(result.renderItems.map((item) => item.job_id), ["job-page-2"]);
});

test("recent jobs empty commit owns empty state and search copy", () => {
  // 旧 DOM 直写 viewPort 已随 cutover 删除,改用最小 stub 直接捕获 renderEmpty。
  const loadingStates = [];
  let emptyText = "";
  const viewPort = {
    renderEmpty: (message) => {
      emptyText = message;
    },
  };
  const statePort = createRecentJobsStatePort({
    recentJobsItems: [{ job_id: "old" }],
    recentJobsHasMore: true,
  });

  const result = commitRecentJobsEmpty({
    query: "quantum",
    invocationSummary: null,
    homeStatePort: {
      setRecentJobsLoadingState: (...args) => loadingStates.push(args),
    },
    recentJobsStatePort: statePort,
    viewPort,
  });

  assert.equal(result.message, "没有匹配的书籍");
  assert.deepEqual(statePort.getSnapshot().items, []);
  assert.equal(statePort.getSnapshot().hasMore, false);
  assert.equal(emptyText, "没有匹配的书籍");
  assert.deepEqual(loadingStates, [["ready"]]);
});

test("recent jobs empty commit can delegate rendering to view-state owner", () => {
  const loadingStates = [];
  const renders = [];
  const statePort = createRecentJobsStatePort({
    recentJobsItems: [{ job_id: "old" }],
    recentJobsHasMore: true,
  });

  const result = commitRecentJobsEmpty({
    query: "",
    invocationSummary: null,
    homeStatePort: {
      setRecentJobsLoadingState: (...args) => loadingStates.push(args),
    },
    recentJobsStatePort: statePort,
    storeDrivenRendering: true,
    renderEmpty: (...args) => renders.push(args),
  });

  assert.equal(result.message, "暂无最近任务");
  assert.deepEqual(statePort.getSnapshot().items, []);
  assert.equal(statePort.getSnapshot().hasMore, false);
  assert.deepEqual(loadingStates, [["ready"]]);
  assert.deepEqual(renders, []);
});

test("recent jobs no-more and error commits own terminal loading state", () => {
  // 旧 DOM 直写 viewPort 已随 cutover 删除,改用最小 stub 直接捕获 renderError。
  const loadingStates = [];
  const renderErrorCalls = [];
  const viewPort = {
    renderError: (...args) => renderErrorCalls.push(args),
  };
  const statePort = createRecentJobsStatePort({
    recentJobsHasMore: true,
    recentJobsItems: [{ job_id: "job-existing" }],
  });
  const homeStatePort = {
    setRecentJobsLoadingState: (...args) => loadingStates.push(args),
  };

  commitRecentJobsNoMore({
    homeStatePort,
    recentJobsStatePort: statePort,
    viewPort,
  });
  assert.equal(statePort.getSnapshot().hasMore, false);
  assert.deepEqual(loadingStates, [["ready"]]);
  assert.deepEqual(renderErrorCalls, [["", { reset: false }]]);

  commitRecentJobsError({
    error: new Error("network down"),
    reset: false,
    homeStatePort,
    recentJobsStatePort: statePort,
    viewPort,
  });
  assert.deepEqual(loadingStates.at(-1), ["error", "network down"]);
});

test("recent jobs no-more and error commits can delegate rendering", () => {
  const loadingStates = [];
  const renders = [];
  const statePort = createRecentJobsStatePort({
    recentJobsHasMore: true,
    recentJobsItems: [{ job_id: "job-existing" }],
  });
  const homeStatePort = {
    setRecentJobsLoadingState: (...args) => loadingStates.push(args),
  };

  commitRecentJobsNoMore({
    homeStatePort,
    recentJobsStatePort: statePort,
    storeDrivenRendering: true,
    renderError: (...args) => renders.push(args),
  });

  commitRecentJobsError({
    error: new Error("network down"),
    reset: false,
    homeStatePort,
    recentJobsStatePort: statePort,
    storeDrivenRendering: true,
    renderError: (...args) => renders.push(args),
  });

  assert.equal(statePort.getSnapshot().hasMore, false);
  assert.deepEqual(loadingStates, [
    ["ready"],
    ["error", "network down"],
  ]);
  assert.deepEqual(renders, []);
});
