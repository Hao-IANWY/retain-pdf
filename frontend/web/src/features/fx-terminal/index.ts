export { FxTerminal } from "./ui/FxTerminal.js";
export { echoTerminalSession } from "./domain/terminal-session.js";
export {
  terminalSocketUrl,
  websocketTerminalSession,
} from "./domain/websocket-session.js";
export type { WebSocketTerminalOptions } from "./domain/websocket-session.js";
export type {
  TerminalSession,
  TerminalSink,
  TerminalSize,
} from "./domain/terminal-session.js";
export { readTerminalTheme, cssVariableReader } from "./domain/terminal-theme.js";
export type { TerminalTheme, ReadCssVariable } from "./domain/terminal-theme.js";
