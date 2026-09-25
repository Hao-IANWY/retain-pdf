export { FxTerminal } from "./ui/FxTerminal.js";
export { echoTerminalSession } from "./domain/terminal-session.js";
export {
  DEFAULT_TERMINAL_PATH,
  terminalSocketUrl,
  websocketTerminalSession,
} from "./domain/websocket-session.js";
export type { WebSocketTerminalOptions } from "./domain/websocket-session.js";
export type {
  TerminalSession,
  TerminalSink,
  TerminalSize,
} from "./domain/terminal-session.js";
export {
  TERMINAL_SUGGESTIONS,
  TERMINAL_SUGGESTIONS_DISMISSED_KEY,
  dismissAllSuggestions,
  dismissSuggestion,
  readDismissedSuggestions,
  visibleSuggestions,
  writeDismissedSuggestions,
} from "./domain/terminal-suggestions.js";
export type { TerminalSuggestion } from "./domain/terminal-suggestions.js";
export { readTerminalTheme, cssVariableReader } from "./domain/terminal-theme.js";
export type { TerminalTheme, ReadCssVariable } from "./domain/terminal-theme.js";
