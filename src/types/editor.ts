import type { ReactNode } from 'react';
import type { EditorInit } from './config';
import type { ImageDeleteInfo } from './image';
import type {
    MentionErrorSlotProps,
    MentionItemSlotProps,
    MentionQuerySlotProps,
    MentionRemoveEvent,
    MentionSearchEvent,
    MentionSelectEvent,
} from './mention';
import type { MergeTagRemoveEvent, MergeTagSelectEvent } from './mergeTag';
import type { TemplateInsertEvent } from './template';

export interface EditorSlots {
    toolbarStart?: ReactNode;
    toolbarEnd?: ReactNode;
    menubarEnd?: ReactNode;
    statusbarStart?: ReactNode;
    statusbarEnd?: ReactNode;
    emptyState?: ReactNode;
    renderMentionItem?: (props: MentionItemSlotProps) => ReactNode;
    renderMentionLoading?: (props: MentionQuerySlotProps) => ReactNode;
    renderMentionEmpty?: (props: MentionQuerySlotProps) => ReactNode;
    renderMentionError?: (props: MentionErrorSlotProps) => ReactNode;
}

export interface EditorEvents {
    onChange?: (value: string) => void;
    onCommit?: (value: string) => void;
    onClick?: (event: MouseEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    onInput?: (event: InputEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onPaste?: (event: ClipboardEvent) => void;
    onReady?: (root: HTMLElement) => void;
    onSelectionChange?: (selection: Selection) => void;
    onResize?: (value: { height: number }) => void;
    onMentionSearch?: (event: MentionSearchEvent) => void;
    onMentionSelect?: (event: MentionSelectEvent) => void;
    onMentionRemove?: (event: MentionRemoveEvent) => void;
    onMergeTagSelect?: (event: MergeTagSelectEvent) => void;
    onMergeTagRemove?: (event: MergeTagRemoveEvent) => void;
    onTemplateInsert?: (event: TemplateInsertEvent) => void;
    onImageRemove?: (image: ImageDeleteInfo) => void;
}

export interface EditorProps extends EditorSlots, EditorEvents {
    value?: string;
    defaultValue?: string;
    init?: EditorInit;
    disabled?: boolean;
    readOnly?: boolean;
    id?: string;
    name?: string;
    ariaLabel?: string;
    className?: string;
}
export interface EditorInstance {
    focus(): void;
    blur(): void;
    getHtml(): string;
    setHtml(value: string): void;
    getText(): string;
    clear(): void;
    insertHtml(value: string): void;
    insertText(value: string): void;
    selectAll(): void;
    undo(): void;
    redo(): void;
    openSourceCode(): void;
    openPreview(): void;
    getRootElement(): HTMLElement | null;
}
export interface EditorCounts {
    words: number;
    characters: number;
}
export interface EditorSelectionState {
    path: string;
    commands: Record<string, boolean>;
    insideTable: boolean;
}
