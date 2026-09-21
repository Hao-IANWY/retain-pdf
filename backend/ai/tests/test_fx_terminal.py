"""PTY 终端层：双向、尺寸、收尾，以及跨块解码。

这一层不关心跑的是什么程序 —— 本机不一定装了 fx，测试也不该依赖它。
所以被试一律用 coreutils，argv 从 build_terminal_launch 的注入点进去。
"""

from __future__ import annotations

import os
import time
from pathlib import Path

import pytest

from retainpdf_ai import fx_terminal
from retainpdf_ai.fx_terminal import PtySession, TerminalLaunch, clamp_window_size


def _launch(*argv: str) -> TerminalLaunch:
    return TerminalLaunch(
        argv=argv,
        cwd=Path("/tmp"),
        env={"PATH": "/usr/bin:/bin", "TERM": "xterm-256color", "LANG": "en_US.UTF-8"},
    )


def _drain(session: PtySession, *, deadline_s: float = 5.0) -> str:
    """读到子进程关闭为止。"""
    collected: list[str] = []
    end = time.monotonic() + deadline_s
    while time.monotonic() < end:
        chunk = session.read()
        if chunk is None:
            break
        collected.append(chunk)
    return "".join(collected)


def test_input_reaches_the_child_and_output_comes_back() -> None:
    session = PtySession(_launch("/bin/cat"))
    session.open(cols=100, rows=30)
    try:
        session.write("hello\n")
        time.sleep(0.3)
        assert "hello" in (session.read() or "")
    finally:
        session.close()


def test_a_multibyte_character_split_across_reads_survives(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """一个中文字符占 3 字节，跨读边界必被切开。

    逐块 decode 会在切口吐出替换字符，而且再也补不回来 —— 用户看到的就是
    满屏乱码。把 chunk 压到 1 字节，让每个字符都切开，逼出这个问题。
    """
    monkeypatch.setattr(fx_terminal, "_READ_CHUNK_BYTES", 1)
    text = "中文终端测试"
    session = PtySession(_launch("/bin/echo", text))
    session.open()
    try:
        assert text in _drain(session)
    finally:
        session.close()
    assert "�" not in text  # 源串本身没有替换字符，断言才有意义


def test_reading_after_the_child_exits_reports_closure_instead_of_raising() -> None:
    """子进程退出后读 PTY 主端会拿到 EIO。那是正常收尾，不是故障。"""
    session = PtySession(_launch("/bin/echo", "bye"))
    session.open()
    try:
        _drain(session)
        assert session.read() is None
    finally:
        session.close()


def test_close_is_idempotent_and_reaps_the_child() -> None:
    session = PtySession(_launch("/bin/cat"))
    session.open()
    pid = session.pid
    assert pid > 0
    session.close()
    assert session.closed
    session.close()  # 重复调用必须安全
    deadline = time.monotonic() + 3.0
    while time.monotonic() < deadline:
        try:
            os.kill(pid, 0)
        except ProcessLookupError:
            return
        time.sleep(0.05)
    pytest.fail("子进程没有被回收，close 留下了僵尸")


def test_a_child_that_ignores_hangup_is_still_killed_and_reaped(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """扛住 SIGHUP 的子进程必须被 SIGKILL 掉，并且收尸。

    这条和上面那条不是重复 —— 上面用 /bin/cat，它收到 SIGHUP 就死，在宽限期
    内就被回收，**SIGKILL 那条路根本走不到**。反证跑出来才发现：把结尾的
    阻塞 waitpid 改回 WNOHANG，上面那条照样绿。
    fx 的 TUI 正是会捕获挂断自己收尾的那类程序，所以这条路必须有人守。
    """
    monkeypatch.setattr(fx_terminal, "_HANGUP_GRACE_SECONDS", 0.2)
    session = PtySession(
        _launch("/bin/sh", "-c", 'trap "" HUP; while :; do sleep 0.1; done')
    )
    session.open()
    pid = session.pid
    time.sleep(0.2)  # 等 trap 装上
    session.close()
    deadline = time.monotonic() + 3.0
    while time.monotonic() < deadline:
        try:
            os.kill(pid, 0)
        except ProcessLookupError:
            return
        time.sleep(0.05)
    pytest.fail("扛 SIGHUP 的子进程没被回收，close 留下了僵尸")


def test_writing_to_a_closed_session_is_a_no_op() -> None:
    session = PtySession(_launch("/bin/cat"))
    session.open()
    session.close()
    session.write("这行没人收")  # 不该抛
    assert session.read() is None


def test_opening_twice_is_refused() -> None:
    """重复 open 会把第一个 fd 和 pid 覆盖掉，留下一个收不了尾的子进程。"""
    session = PtySession(_launch("/bin/cat"))
    session.open()
    try:
        with pytest.raises(RuntimeError):
            session.open()
    finally:
        session.close()


@pytest.mark.parametrize(
    ("cols", "rows", "expected"),
    [
        (80, 24, (80, 24)),
        (0, 0, (2, 1)),
        (-5, -5, (2, 1)),
        (99999, 99999, (1000, 500)),
        ("abc", None, (2, 1)),
    ],
)
def test_window_size_is_clamped(cols, rows, expected) -> None:
    """尺寸直接进 TIOCSWINSZ 的 struct，前端传什么都不能信。"""
    assert clamp_window_size(cols, rows) == expected


def test_the_child_sees_the_window_size_we_set() -> None:
    """行列不能写反。TIOCSWINSZ 是 (rows, cols)，写反了终端按转置尺寸重绘，
    而且不报任何错 —— 只能靠让子进程自己报出来。"""
    session = PtySession(
        _launch("/bin/sh", "-c", "stty size < /dev/tty")
    )
    session.open(cols=123, rows=45)
    try:
        assert "45 123" in _drain(session), "行列写反了"
    finally:
        session.close()
