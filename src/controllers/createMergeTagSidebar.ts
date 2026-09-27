import type { SetupScope } from '../hooks/useSetup';
import type {
    EditorMenuName,
    MergeTagItem,
    MergeTagSidebarCallbacks,
    MergeTagSidebarSources,
} from '../types';
import { structuralSignature } from '../utils/signature';

let sidebarSequence = 0;

export function createMergeTagSidebar(
    scope: SetupScope,
    sources: MergeTagSidebarSources,
    callbacks: MergeTagSidebarCallbacks,
) {
    const isOpen = scope.ref(false);
    const id = `erag-merge-tag-sidebar-${(sidebarSequence += 1)}`;

    function handleMenubarOpening(name: EditorMenuName): void {
        callbacks.saveSelection();
        if (name !== 'merge-tags') isOpen.value = false;
    }

    function toggle(): void {
        if (!sources.disabled.value) isOpen.value = !isOpen.value;
    }

    function close(): void {
        isOpen.value = false;
    }

    function select(item: MergeTagItem): void {
        if (sources.locked.value) return;
        callbacks.restoreSelection();
        callbacks.insert(item);
        callbacks.saveSelection();
    }

    scope.watch(
        () => structuralSignature(sources.config.value),
        () => {
            const config = sources.config.value;
            if (!config.enabled || config.items.length === 0) close();
        },
    );

    return { isOpen, id, handleMenubarOpening, toggle, close, select };
}
