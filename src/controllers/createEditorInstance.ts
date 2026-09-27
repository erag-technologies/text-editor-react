import type { EditorInstance, NativeEditorCommand, ReadonlyRef } from '../types';
import { escapeHtml, insertAtSelection } from '../utils/html';
import type { EditorController } from './createEditor';
import type { EditorSelectionController } from './createEditorSelection';
import type { InlineImageUploadController } from './createInlineImageUpload';

interface EditorInstanceOptions {
    editor: EditorController;
    selection: EditorSelectionController;
    inlineImageUpload: InlineImageUploadController;
    locked: ReadonlyRef<boolean>;
    syncInput: () => void;
    runCommand: (id: string) => void;
    executeCommand: NativeEditorCommand;
    openDialog: (name: string) => void;
}

export function createEditorInstance(options: EditorInstanceOptions): EditorInstance {
    function focus(): void {
        options.editor.root.value?.focus();
    }

    function setHtml(value: string): void {
        options.inlineImageUpload.discard();
        options.editor.setHtml(value, false);
        options.syncInput();
    }

    function insertHtml(value: string): void {
        if (!options.editor.root.value || options.locked.value) return;
        options.selection.restore();
        insertAtSelection(options.editor.root.value, options.editor.clean(value));
        options.syncInput();
    }

    function selectAll(): void {
        focus();
        options.executeCommand('selectAll');
        options.selection.update();
    }

    return {
        focus,
        blur: () => options.editor.root.value?.blur(),
        getHtml: options.editor.sync,
        setHtml,
        getText: options.editor.getText,
        clear: () => setHtml(''),
        insertHtml,
        insertText: (value) => insertHtml(escapeHtml(value)),
        selectAll,
        undo: () => options.runCommand('undo'),
        redo: () => options.runCommand('redo'),
        openSourceCode: () => options.openDialog('source'),
        openPreview: () => options.openDialog('preview'),
        getRootElement: () => options.editor.root.value,
    };
}
