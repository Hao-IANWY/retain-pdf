import { type ReactNode } from "react";
export type ReaderFloatShellProps = {
    id: string;
    open: boolean;
    title: string;
    subtitle?: string;
    titleIcon?: ReactNode;
    storageKey: string;
    ariaLabel: string;
    className?: string;
    /** 默认宽（px），会 min 到视口 */
    width?: number;
    /** dock-right 用于 PDF / Markdown 等稳定双栏，不启用拖拽定位。 */
    placement?: "floating" | "dock-right" | "workspace";
    showHeader?: boolean;
    /** 关掉时**隐藏而不是卸载**。
     *
     * 只给「卸载会丢掉不可重建的状态」的面板用：终端卸载 = 关 WebSocket = 杀掉
     * PTY 子进程，正在生成的那一轮回答直接没了；画布卸载 = tldraw 整个重建。
     *
     * 默认 false —— 多数面板卸载掉更省内存，而且重开时重新拉数据反而是对的。
     */
    keepMounted?: boolean;
    onClose: () => void;
    toolbar?: ReactNode;
    children: ReactNode;
};
export declare function ReaderFloatShell({ id, open, title, subtitle, titleIcon, storageKey, ariaLabel, className, width, placement, showHeader, keepMounted, onClose, toolbar, children, }: ReaderFloatShellProps): import("react").JSX.Element;
//# sourceMappingURL=ReaderFloatShell.d.ts.map