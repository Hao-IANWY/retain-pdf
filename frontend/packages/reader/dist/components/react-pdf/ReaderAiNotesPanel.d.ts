import { type ReactElement } from "react";
import { type AiNotesDoc } from "../../shared/data/ai-notes.js";
export type ReaderAiNotesPanelProps = {
    open: boolean;
    doc: AiNotesDoc | null;
    onClose: () => void;
    onJump: (anchor: {
        page_idx?: number;
        block_id?: string;
    }) => void;
};
export declare function ReaderAiNotesPanel({ open, doc, onClose, onJump, }: ReaderAiNotesPanelProps): ReactElement;
//# sourceMappingURL=ReaderAiNotesPanel.d.ts.map