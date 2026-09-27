import type { SetupScope } from '../hooks/useSetup';
import { elementPath, restoreSelection, saveSelection, selectionElement } from '../utils/selection';
import { isEditorCommandActive } from '../commands/commandRegistry';
import type { EditorSelectionState, ReadonlyRef } from '../types';

const TRACKED_COMMANDS = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'superscript',
    'subscript',
    'alignleft',
    'aligncenter',
    'alignright',
    'alignjustify',
    'bullist',
    'numlist',
    'checklist',
];

export function createEditorSelection(scope: SetupScope, root: ReadonlyRef<HTMLElement | null>) {
    const savedRange = scope.ref<Range | null>(null);
    const state = scope.ref<EditorSelectionState>({ path: 'p', commands: {}, insideTable: false });
    let frame = 0;
    function save(): void {
        if (!root.value) return;
        const range = saveSelection(root.value);
        if (range) savedRange.value = range;
    }
    function restore(): boolean {
        return root.value ? restoreSelection(savedRange.value, root.value) : false;
    }
    function update(): void {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            if (!root.value) return;
            const element = selectionElement(root.value);
            const next: EditorSelectionState = {
                path: elementPath(root.value),
                insideTable: Boolean(element?.closest('table')),
                commands: Object.fromEntries(
                    TRACKED_COMMANDS.map((id) => [id, isEditorCommandActive(id)]),
                ),
            };
            if (!isSameSelectionState(state.value, next)) state.value = next;
            save();
        });
    }
    scope.onBeforeUnmount(() => cancelAnimationFrame(frame));
    return { savedRange, state, save, restore, update };
}

function isSameSelectionState(left: EditorSelectionState, right: EditorSelectionState): boolean {
    return (
        left.path === right.path &&
        left.insideTable === right.insideTable &&
        TRACKED_COMMANDS.every((id) => left.commands[id] === right.commands[id])
    );
}

export type EditorSelectionController = ReturnType<typeof createEditorSelection>;
