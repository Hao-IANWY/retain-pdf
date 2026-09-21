"""`/v1/fx/terminal`：把 PTY 接到前端的 xterm.js 上。

协议两个方向都是 JSON，没有二进制帧 —— 终端流本来就要按帧边界分清「这是
输出」还是「这是控制」，混用一半裸文本一半 JSON 只会让两端都得猜。

    客户端 → 服务端   {"type":"input","data":"ls\\r"}
                      {"type":"resize","cols":120,"rows":40}
    服务端 → 客户端   {"type":"ready","pid":1234}
                      {"type":"output","data":"..."}
                      {"type":"exit","reason":"..."}

PTY 的读是阻塞的，所以读循环跑在线程池里（`to_thread`），不在事件循环上直接
os.read —— 那会把整个 AI 服务卡住。

鉴权走和 HTTP 路由同一套 X-API-Key。**浏览器的 WebSocket 构造函数不能设
请求头**，所以这里同时接受 `?api_key=` 查询参数。它会进 access log，这是已知
代价；本服务只监听回环，且这个 key 本来就存在浏览器里（见 README 里关于
凭据的说明）。
"""

from __future__ import annotations

import asyncio
import contextlib
from collections.abc import Callable, Iterable
from typing import Any

from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from .config import Settings
from .fx_terminal import PtySession, build_terminal_launch

# WS 关闭码。1008 = policy violation，用于鉴权失败；1011 = internal error。
_CLOSE_UNAUTHORIZED = 1008
_CLOSE_INTERNAL = 1011


def authorize_terminal_request(
    api_keys: Iterable[str], header_key: str, query_key: str
) -> bool:
    """握手鉴权。抽成纯函数是为了能直接测，不用起一个真的 WS。

    没有配置任何 key 时一律拒绝 —— 和 HTTP 那边「没配就 500」是同一个立场：
    空的 key 集合不代表「谁都能进」。
    """
    allowed = {key for key in api_keys if key}
    if not allowed:
        return False
    return header_key in allowed or query_key in allowed


def register_fx_terminal_routes(
    app: FastAPI,
    *,
    settings: Settings,
    session_key_for: Callable[[WebSocket], str] | None = None,
) -> None:
    @app.websocket("/v1/fx/terminal")
    async def fx_terminal(websocket: WebSocket) -> None:
        if not authorize_terminal_request(
            settings.api_keys,
            websocket.headers.get("X-API-Key", ""),
            websocket.query_params.get("api_key", ""),
        ):
            await websocket.close(code=_CLOSE_UNAUTHORIZED)
            return
        if not settings.fx_shell_mode:
            # 终端模式关着时不开 PTY。否则这条路会绕开 shell_mode 这个开关 ——
            # 开关的意义就是「模型/用户能不能在本机跑任意命令」，
            # 从 WS 进来和从 ACP 进来是同一件事。
            await websocket.accept()
            await websocket.send_json(
                {"type": "exit", "reason": "fx shell mode is disabled"}
            )
            await websocket.close()
            return

        await websocket.accept()
        session_key = (
            session_key_for(websocket)
            if session_key_for is not None
            else websocket.query_params.get("session", "default")
        )
        cols, rows = _requested_size(websocket.query_params)
        try:
            launch = build_terminal_launch(settings, session_key=session_key)
            pty_session = PtySession(launch)
            pty_session.open(cols=cols, rows=rows)
        except Exception as exc:  # noqa: BLE001 - 起不来要告诉前端原因
            await websocket.send_json({"type": "exit", "reason": str(exc)})
            await websocket.close(code=_CLOSE_INTERNAL)
            return

        await websocket.send_json({"type": "ready", "pid": pty_session.pid})
        pump = asyncio.create_task(_pump_output(websocket, pty_session))
        try:
            await _pump_input(websocket, pty_session)
        except WebSocketDisconnect:
            pass
        finally:
            pty_session.close()
            pump.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await pump


def _requested_size(params: Any) -> tuple[int, int]:
    def read(name: str, fallback: int) -> int:
        try:
            return int(params.get(name, fallback))
        except (TypeError, ValueError):
            return fallback

    return read("cols", 80), read("rows", 24)


async def _pump_input(websocket: WebSocket, session: PtySession) -> None:
    """浏览器 → PTY。未知 type 直接忽略，不回错 —— 前端版本可能比后端新。"""
    while True:
        message = await websocket.receive_json()
        if not isinstance(message, dict):
            continue
        kind = message.get("type")
        if kind == "input":
            data = message.get("data")
            if isinstance(data, str):
                session.write(data)
        elif kind == "resize":
            session.resize(message.get("cols", 80), message.get("rows", 24))


async def _pump_output(websocket: WebSocket, session: PtySession) -> None:
    """PTY → 浏览器。

    os.read 是阻塞的，必须走 to_thread：直接在事件循环里读会把整个服务顶死，
    因为终端空闲时那个 read 会一直挂着。
    """
    while True:
        chunk = await asyncio.to_thread(session.read)
        if chunk is None:
            with contextlib.suppress(Exception):
                await websocket.send_json(
                    {"type": "exit", "reason": "terminal session ended"}
                )
                await websocket.close()
            return
        if not chunk:
            continue
        with contextlib.suppress(Exception):
            await websocket.send_json({"type": "output", "data": chunk})


__all__ = ["authorize_terminal_request", "register_fx_terminal_routes"]
