import type { ReadonlyRef } from './reactive';
import type { NativeEditorCommand } from './commands';

export interface MergeTagItem {
    value: string;
    name?: string;
    group?: string;
}

export interface MergeTagConfig {
    enabled?: boolean;
    limit?: number;
    items?: MergeTagItem[];
}

export interface ResolvedMergeTagConfig {
    enabled: boolean;
    limit: number;
    items: MergeTagItem[];
}

export interface MergeTagQueryMatch {
    query: string;
    range: Range;
}

export interface MergeTagSelectEvent {
    item: MergeTagItem;
    query: string;
}

export interface MergeTagRemoveEvent {
    item: MergeTagItem;
}

export interface MergeTagCallbacks {
    select(event: MergeTagSelectEvent): void;
    remove(event: MergeTagRemoveEvent): void;
    change(): void;
}

export interface MergeTagControllerSources {
    root: ReadonlyRef<HTMLElement | null>;
    config: ReadonlyRef<ResolvedMergeTagConfig>;
    locked: ReadonlyRef<boolean>;
    executeCommand: NativeEditorCommand;
}

export interface MergeTagSidebarSources {
    config: ReadonlyRef<ResolvedMergeTagConfig>;
    disabled: ReadonlyRef<boolean>;
    locked: ReadonlyRef<boolean>;
}

export interface MergeTagSidebarCallbacks {
    restoreSelection(): boolean;
    saveSelection(): void;
    insert(item: MergeTagItem): void;
}
