import { computed, type SetupScope } from '../hooks/useSetup';
import { getPersistentHtml, getPersistentText, getTextCounts } from '../utils/html';
import { canSanitizeHtml, sanitizeHtml } from '../utils/sanitizer';
import { restoreSelection, saveSelection } from '../utils/selection';
import type { EditorCounts, ReadonlyRef, ResolvedEditorInit } from '../types';

export function createEditor(
    scope: SetupScope,
    config: ReadonlyRef<ResolvedEditorInit>,
    initialHtml: string,
) {
    const root = scope.ref<HTMLElement | null>(null);
    const html = scope.ref(clean(initialHtml));
    const counts = scope.ref<EditorCounts>({ words: 0, characters: 0 });
    const empty = computed(() => {
        if (!root.value) return !html.value.trim();
        return (
            !getPersistentText(root.value).trim() &&
            !root.value.querySelector('img,video,audio,iframe,table,hr,[data-erag-checklist]')
        );
    });
    function clean(value: string): string {
        return config.value.sanitize && canSanitizeHtml()
            ? sanitizeHtml(value, {
                  allowedTags: config.value.allowedTags,
                  allowedAttributes: config.value.allowedAttributes,
                  allowRelativeUrls: config.value.relativeUrls,
              })
            : value;
    }
    function connect(element: HTMLElement): void {
        root.value = element;
        if (element.innerHTML !== html.value) element.innerHTML = html.value;
        updateCounts();
    }
    function sync(): string {
        if (!root.value) return html.value;
        html.value = getPersistentHtml(root.value);
        updateCounts();
        return html.value;
    }
    function setHtml(value: string, preserve = true): void {
        const next = clean(value);
        if (next === html.value && root.value?.innerHTML === next) return;
        const range = preserve && root.value ? saveSelection(root.value) : null;
        html.value = next;
        if (root.value) {
            root.value.innerHTML = next;
            restoreSelection(range, root.value);
        }
        updateCounts();
    }
    function updateCounts(): void {
        const next = root.value ? getTextCounts(root.value) : { words: 0, characters: 0 };
        if (next.words !== counts.value.words || next.characters !== counts.value.characters)
            counts.value = next;
    }
    function getText(): string {
        return root.value ? getPersistentText(root.value) : '';
    }
    return { root, html, counts, empty, clean, connect, sync, setHtml, getText, updateCounts };
}

export type EditorController = ReturnType<typeof createEditor>;
