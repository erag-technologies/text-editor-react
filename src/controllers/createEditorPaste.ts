import type { SetupScope } from '../hooks/useSetup';
import { insertImage } from '../commands/insertCommands';
import type { ReadonlyRef, ResolvedEditorInit } from '../types';
import { escapeHtml, insertAtSelection } from '../utils/html';
import type { EditorController } from './createEditor';
import type { EditorSelectionController } from './createEditorSelection';
import { createEditorUpload } from './createEditorUpload';

interface EditorPasteOptions {
    editor: EditorController;
    selection: EditorSelectionController;
    config: ReadonlyRef<ResolvedEditorInit>;
    locked: ReadonlyRef<boolean>;
    emitPaste: (event: ClipboardEvent) => void;
    onChange: () => void;
}

export function createEditorPaste(scope: SetupScope, options: EditorPasteOptions) {
    const { upload, cancel } = createEditorUpload(scope, options.config);

    async function handlePaste(event: ClipboardEvent): Promise<void> {
        options.emitPaste(event);
        const root = options.editor.root.value;
        if (options.locked.value || !root) {
            event.preventDefault();
            return;
        }

        const image = [...(event.clipboardData?.files ?? [])].find((file) =>
            file.type.startsWith('image/'),
        );
        if (image && options.config.value.pasteImages && options.config.value.automaticUploads) {
            event.preventDefault();
            options.selection.save();
            try {
                const url = await upload(image);
                options.selection.restore();
                insertImage(
                    root,
                    { src: url, alt: image.name, width: '', height: '' },
                    options.config.value.relativeUrls,
                    options.config.value.imageDefaultWidth,
                );
                options.onChange();
            } catch {
                return;
            } finally {
                cancel();
            }
            return;
        }

        const html = event.clipboardData?.getData('text/html');
        const text = event.clipboardData?.getData('text/plain') ?? '';
        event.preventDefault();
        options.selection.restore();
        insertAtSelection(
            root,
            html ? options.editor.clean(html) : escapeHtml(text).replaceAll('\n', '<br>'),
        );
        options.onChange();
    }

    return { handlePaste };
}
