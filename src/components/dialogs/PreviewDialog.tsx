import { useRef } from 'react';
import { printEditorContent } from '../../commands/printCommands';
import { useIsomorphicLayoutEffect } from '../../hooks/useSetup';
import { BaseDialog } from './BaseDialog';

interface PreviewDialogProps {
    html: string;
    contentStyle: string;
    onClose: () => void;
}

export function PreviewDialog({ html, contentStyle, onClose }: PreviewDialogProps) {
    const preview = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        if (preview.current) preview.current.style.cssText = contentStyle;
    }, [contentStyle]);

    function print(): void {
        if (preview.current) printEditorContent(preview.current);
    }

    return (
        <BaseDialog
            title="Preview"
            wide
            onClose={onClose}
            footer={
                <>
                    <button
                        type="button"
                        className="erag-button"
                        onClick={print}
                    >
                        Print
                    </button>
                    <button
                        type="button"
                        className="erag-button erag-button--primary"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </>
            }
        >
            <div
                ref={preview}
                className="erag-preview"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </BaseDialog>
    );
}
