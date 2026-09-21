"""在伪终端里跑 fx 的 TUI，供前端 xterm.js 双向接管。

和 ACP 那条路的区别，一句话：**ACP 让宿主替用户做决定，PTY 让用户自己做。**

走 ACP 时 fx 每条命令都发 session/request_permission，由 approve_permission
替用户批。走 PTY 时 fx 跑的是它自己的交互式 TUI，权限提示直接画在终端里，
人看着、人批。宿主不再是审批者，只是管子。

沙箱没变：私有 HOME / workspace / tmp 和 PATH 都复用 fx_process 里那一份
（prepare_fx_state / resolve_fx_command_path），不另起炉灶 —— 两份复制出来的
加固一定会在某次改动后只改了其中一份。

一个必须处理的细节：PTY 读出来的是**字节**，一个多字节字符会跨读边界被切开。
中文输出必然踩到。所以用增量解码器，不能每块各自 decode。
"""

from __future__ import annotations

import codecs
import errno
import fcntl
import os
import pty
import select
import signal
import struct
import termios
import time
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from .config import Settings, fx_gateway_chat_url, normalize_fx_gateway_base_url
from .fx_openai_bridge import merge_safe_extra_body
from .fx_openai_bridge import FxOpenAIChatBridge
from .runtimes.fx_process import (
    prepare_fx_state,
    resolve_fx_command_path,
    resolve_fx_gateway_key,
)

# 一次从 PTY 读多少。终端会大段重绘，太小会把一帧切碎成很多次唤醒。
_READ_CHUNK_BYTES = 65536

# 尺寸的合理范围。cols/rows 直接进 TIOCSWINSZ 的 struct，超界会让 ioctl 报错，
# 或者让子进程按一个荒谬的尺寸重绘。前端传什么都不能直接信。
_MIN_COLS, _MAX_COLS = 2, 1000
_MIN_ROWS, _MAX_ROWS = 1, 500

# 一次 read 最多等多久。给超时不是为了省 CPU —— select 本来就是阻塞的 ——
# 而是为了让读循环能被取消：asyncio.to_thread 里的阻塞 syscall 取消不掉。
_READ_WAIT_SECONDS = 0.2

# SIGHUP 之后给 TUI 多久自己收尾，超了就 SIGKILL。
_HANGUP_GRACE_SECONDS = 1.0


def _reap(pid: int, *, blocking: bool, grace_s: float = 0.0) -> bool:
    """回收子进程。返回是否已回收。

    blocking=True 只在 SIGKILL 之后用 —— 那时进程必定会终止，不会卡住。
    """
    deadline = time.monotonic() + grace_s
    while True:
        try:
            waited, _ = os.waitpid(pid, 0 if blocking else os.WNOHANG)
        except ChildProcessError:
            return True  # 已经被别处回收了
        except OSError:
            return False
        if waited == pid:
            return True
        if blocking or time.monotonic() >= deadline:
            return False
        time.sleep(0.02)


def clamp_window_size(cols: int, rows: int) -> tuple[int, int]:
    """把前端报来的尺寸夹到合理区间。非数字按最小值算。"""
    try:
        cols_value = int(cols)
    except (TypeError, ValueError):
        cols_value = _MIN_COLS
    try:
        rows_value = int(rows)
    except (TypeError, ValueError):
        rows_value = _MIN_ROWS
    return (
        max(_MIN_COLS, min(_MAX_COLS, cols_value)),
        max(_MIN_ROWS, min(_MAX_ROWS, rows_value)),
    )


@dataclass(frozen=True)
class TerminalLaunch:
    """起一个终端要的全部东西。拆出来是为了能在不 fork 的情况下断言它。

    `cleanup` 是给 OpenAI 兼容桥用的：那是个跟着会话活的回环 HTTP 服务，
    终端关掉必须一起关，否则每开一次终端就漏一个监听端口。
    """

    argv: tuple[str, ...]
    cwd: Path
    env: dict[str, str]
    cleanup: Callable[[], None] | None = None


def _terminal_inference_endpoint(settings: Settings) -> tuple[str, str]:
    """终端该把推理发去哪，用哪把 key。

    优先 fx 专用的那一组（RETAIN_AI_FX_OPENAI_*），没配就**回退到 agent 自己
    的 LLM 配置**。

    回退是重点：用户在「设置 → API 设置 → AI Agent」里配好的端点和 key 就是
    他给这个 agent 选的模型，终端跑的又是同一个 agent，没有理由让他再配一套。
    不回退的话，唯一能用的路是去登录 Vercel —— 而他明明已经有一个能用的模型了。

    两把 key 别搞混：agent 的在 ai-runtime.json 的 llm_api_key，翻译的在
    credentials.json 的 translation_api_key，端点常常不是同一家。拿翻译那把发
    给 agent 的端点会 401，而错误信息只说「key 无效」，看不出是拿错了。
    """
    fx_base = settings.fx_openai_base_url.strip()
    if fx_base:
        return fx_base, settings.fx_openai_api_key
    llm_base = settings.llm_base_url.strip()
    if llm_base and settings.llm_api_key.strip():
        return llm_base, settings.llm_api_key
    return "", ""


def resolve_effort_override(
    effort: str, allowed: tuple[str, ...]
) -> dict[str, Any]:
    """把用户选的档位变成上游请求上的一个字段。

    只认**已声明**的档位（RETAIN_AI_FX_REASONING_EFFORTS）和 "auto"。前端传什么
    都不能直接进请求体 —— 上游对没见过的值可能 400，而那会表现成「终端一打开
    就断」，用户根本看不出是档位选错了。

    只设 reasoning_effort 这个 OpenAI 标准名。provider 特有的伴随字段
    （DeepSeek 要的 thinking:{"type":"enabled"}）留给 RETAIN_AI_FX_UPSTREAM_EXTRA
    —— 那是按 provider 配一次的东西，不该跟着每次切档重复。
    """
    value = effort.strip().lower()
    if not value or value == "auto":
        return {}
    if value not in {item.strip().lower() for item in allowed}:
        return {}
    return {"reasoning_effort": value}


def build_terminal_launch(
    settings: Settings,
    *,
    session_key: str,
    argv: tuple[str, ...] | None = None,
    effort: str = "",
) -> TerminalLaunch:
    """组装启动参数。

    `argv` 留出注入点：本机不一定装了 fx，测试也不该依赖它 —— PTY 这一层
    本来就不关心跑的是什么程序。

    `effort` 是**按会话**的思考档位。fx 0.0.10 的 TUI 里够不到它自己的 effort
    选择器（ACP 那侧可以），所以只能由宿主在起进程时决定 —— 换档 = 重开终端。
    """
    executable, home, workspace, tmp = prepare_fx_state(
        settings, session_key=session_key, shared_home=True
    )
    command_path = resolve_fx_command_path(settings, executable, None)
    env = {
        "HOME": str(home),
        "TMPDIR": str(tmp),
        "PATH": command_path,
        # TUI 要颜色。ACP 那条路设 NO_COLOR=1 是因为输出要被解析，
        # 这里输出是给人看的，反过来。
        "TERM": "xterm-256color",
        "LANG": "en_US.UTF-8",
        "FX_AUTO_UPGRADE": "0",
    }
    if settings.fx_model:
        env["FX_MODEL"] = settings.fx_model
    # 不传凭据的话，TUI 第一屏是「Welcome to fx，请登录」—— 而用户已经在
    # 设置里填过 Gateway Key 了，不该在终端里再登一次。
    gateway_api_key = resolve_fx_gateway_key(settings)
    # 宿主侧回环桥：配了 OpenAI 兼容端点就不需要 Vercel Gateway 的 key，
    # fx 仍然自己拥有 agent 循环，只是推理换个地址。
    #
    # ACP 那条路一直有这个，PTY 这条原来没有 —— 于是有自己端点的用户在终端里
    # 只能去登录 Vercel，而他明明已经配好了一个能用的模型。
    cleanup: Callable[[], None] | None = None
    bridge_base_url, bridge_api_key = _terminal_inference_endpoint(settings)
    if bridge_base_url:
        upstream_extra = merge_safe_extra_body(
            dict(settings.fx_upstream_extra),
            resolve_effort_override(effort, settings.fx_reasoning_efforts),
        )
        bridge = FxOpenAIChatBridge(
            base_url=bridge_base_url,
            api_key=bridge_api_key,
            model=settings.fx_model or settings.llm_model,
            timeout_s=settings.fx_turn_timeout_s,
            extra_body=upstream_extra,
            reasoning_efforts=settings.fx_reasoning_efforts,
        ).start()
        cleanup = bridge.close
        gateway_api_key = bridge.gateway_api_key
        env["FX_GATEWAY_BASE_URL"] = bridge.gateway_base_url
        env["FX_GATEWAY_CHAT_URL"] = bridge.chat_url
        env["FX_MODEL"] = settings.fx_model or settings.llm_model
    if gateway_api_key:
        env["AI_GATEWAY_API_KEY"] = gateway_api_key
    # 显式配的自定义 Gateway 优先于桥：两者同时配时，用户写死的地址是更强的意图。
    if settings.fx_gateway_base_url:
        base_url = normalize_fx_gateway_base_url(settings.fx_gateway_base_url)
        # fx 0.0.5 不从 base URL 推导 completion 端点，两个变量都得给，
        # 否则模型请求走公网 Gateway 而目录请求走自定义地址。
        env["FX_GATEWAY_BASE_URL"] = base_url
        env["FX_GATEWAY_CHAT_URL"] = fx_gateway_chat_url(base_url)
    return TerminalLaunch(
        argv=argv or (str(executable),),
        cwd=workspace,
        env=env,
        cleanup=cleanup,
    )


class PtySession:
    """一个伪终端。open → (read / write / resize)* → close。

    刻意不做成 async：PTY 的 fd 读写是阻塞的，交给调用方放进线程池，
    比在这里藏一个事件循环好调试。
    """

    def __init__(self, launch: TerminalLaunch) -> None:
        self._launch = launch
        self._pid = -1
        self._fd = -1
        self._decoder = codecs.getincrementaldecoder("utf-8")(errors="replace")

    @property
    def pid(self) -> int:
        return self._pid

    @property
    def closed(self) -> bool:
        return self._fd < 0

    def open(self, *, cols: int = 80, rows: int = 24) -> None:
        if self._fd >= 0:
            raise RuntimeError("pty session is already open")
        pid, fd = pty.fork()
        if pid == 0:  # 子进程：这里之后要么 exec 成功，要么必须 _exit。
            try:
                os.chdir(str(self._launch.cwd))
                os.execve(self._launch.argv[0], list(self._launch.argv), self._launch.env)
            except BaseException:  # noqa: BLE001 - 子进程绝不能把异常抛回父进程的栈
                os._exit(127)
        self._pid = pid
        self._fd = fd
        self.resize(cols, rows)

    def resize(self, cols: int, rows: int) -> None:
        if self._fd < 0:
            return
        cols, rows = clamp_window_size(cols, rows)
        # TIOCSWINSZ 的结构是 (rows, cols, xpixel, ypixel) —— 行在前。
        # 写反了终端会按转置的尺寸重绘，而且不会报任何错。
        packed = struct.pack("HHHH", rows, cols, 0, 0)
        try:
            fcntl.ioctl(self._fd, termios.TIOCSWINSZ, packed)
        except OSError:
            pass

    def write(self, data: str) -> None:
        if self._fd < 0:
            return
        payload = data.encode("utf-8")
        while payload:
            try:
                written = os.write(self._fd, payload)
            except OSError as exc:
                if exc.errno in {errno.EAGAIN, errno.EINTR}:
                    continue
                self.close()
                return
            payload = payload[written:]

    def read(self, timeout_s: float | None = _READ_WAIT_SECONDS) -> str | None:
        """等一块数据并解码。

        返回值三态：`None` = 对端已关闭（子进程退出）；`""` = 这次没等到，
        再来一次；其余 = 解码后的文本。

        **默认带超时，不是无限阻塞。** 调用方通常把它扔进线程池，而
        `asyncio.to_thread` 里的阻塞 syscall 是取消不掉的 —— 关掉 fd 在
        macOS 上也未必能唤醒那个卡住的 os.read。于是 WebSocket 一断，
        整个 turn 就永远等下去。默认给超时是为了让这个坑不能被踩到。

        解码用增量解码器：一个中文字符占 3 字节，跨块切开时逐块 decode 会
        吐出替换字符，而且再也补不回来。
        """
        if self._fd < 0:
            return None
        if timeout_s is not None:
            try:
                ready, _, _ = select.select([self._fd], [], [], timeout_s)
            except (OSError, ValueError):
                return None
            if not ready:
                return ""
        try:
            chunk = os.read(self._fd, _READ_CHUNK_BYTES)
        except OSError as exc:
            # PTY 主端在子进程退出后读会得到 EIO，这是正常收尾，不是故障。
            if exc.errno in {errno.EIO, errno.EBADF}:
                return None
            if exc.errno == errno.EINTR:
                return ""
            return None
        if not chunk:
            return None
        return self._decoder.decode(chunk)

    def close(self) -> None:
        """关闭并回收子进程。重复调用是安全的。"""
        fd, pid = self._fd, self._pid
        self._fd, self._pid = -1, -1
        if fd >= 0:
            try:
                os.close(fd)
            except OSError:
                pass
        if pid > 0:
            self._terminate(pid)
        # 桥要跟着会话一起关，否则每开一次终端漏一个监听端口。
        # 放在最后：先收掉子进程，再撤它可能还在用的上游。
        if self._launch.cleanup is not None:
            try:
                self._launch.cleanup()
            except Exception:  # noqa: BLE001,S110 - 收尾不该把关闭流程打断
                pass

    @staticmethod
    def _terminate(pid: int) -> None:
        """结束子进程并**收尸**。

        必须等到真的回收：只发信号不 waitpid 会留下僵尸，而 os.kill(pid, 0)
        对僵尸照样成功，所以「进程没了」这件事只能靠 waitpid 确认。
        WNOHANG 会在信号还没生效时立刻返回，单靠它等于没等。

        先 SIGHUP 留一个宽限期 —— TUI 收到挂断会自己收尾保存会话状态；
        宽限期内没走再 SIGKILL，之后阻塞等待（SIGKILL 不可挡，不会卡住）。
        """
        try:
            os.kill(pid, signal.SIGHUP)
        except ProcessLookupError:
            _reap(pid, blocking=False)
            return
        if _reap(pid, blocking=False, grace_s=_HANGUP_GRACE_SECONDS):
            return
        try:
            os.kill(pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
        _reap(pid, blocking=True)


__all__ = [
    "PtySession",
    "TerminalLaunch",
    "build_terminal_launch",
    "clamp_window_size",
]
