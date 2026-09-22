import type { AiNote } from "../shared/data/ai-notes.js";
export type ReaderAiNotePopoverProps = {
    note: AiNote;
    /** 记号在视口里的位置，弹窗贴着它开。 */
    anchorRect: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    onJump: (anchor: {
        page_idx?: number;
        block_id?: string;
    }) => void;
    onClose: () => void;
};
export declare function ReaderAiNotePopover({ note, anchorRect, onJump, onClose, }: ReaderAiNotePopoverProps): import("react").JSX.Element;
//# sourceMappingURL=ReaderAiNotePopover.d.ts.map