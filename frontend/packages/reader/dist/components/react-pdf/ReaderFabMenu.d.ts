import { FileText } from "lucide-react";
import { type ReactElement } from "react";
import type { FabDownloadAction, FabDownloadUrls } from "./use-reader-fab-downloads.js";
type FabIcon = typeof FileText;
export type ReaderFabMenuHeaderProps = {
    onClose: () => void;
};
export declare function ReaderFabMenuHeader({ onClose }: ReaderFabMenuHeaderProps): ReactElement;
export type ReaderFabToolRowProps = {
    index: number;
    icon: FabIcon;
    title: string;
    sub: string;
    active: boolean;
    disabled: boolean;
    onClick: () => void;
    /** 右侧角标。0 或缺省不画 —— 「0 条」比不画更让人以为坏了。 */
    badge?: number;
};
export declare function ReaderFabToolRow({ index, icon: Icon, title, sub, active, disabled, onClick, badge, }: ReaderFabToolRowProps): ReactElement;
export type ReaderFabDownloadSectionProps = {
    urls: FabDownloadUrls;
    items: readonly FabDownloadAction[];
    busyActions: ReadonlySet<FabDownloadAction>;
    onDownload: (action: FabDownloadAction) => void;
};
export declare function ReaderFabDownloadSection({ urls, items, busyActions, onDownload, }: ReaderFabDownloadSectionProps): ReactElement;
export {};
//# sourceMappingURL=ReaderFabMenu.d.ts.map