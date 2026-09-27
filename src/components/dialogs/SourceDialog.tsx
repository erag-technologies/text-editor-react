import { useState, type KeyboardEvent } from 'react';
import { BaseDialog } from './BaseDialog';

interface SourceDialogProps {
    html: string;
    editable: boolean;
    onClose: () => void;
    onSave: (html: string) => void;
}

export function SourceDialog({ html, editable, onClose, onSave }: SourceDialogProps) {
    const [source, setSource] = useState(html);

    function keydown(event: KeyboardEvent<HTMLTextAreaElement>): void {
        if (!editable || event.key !== 'Tab') return;
        event.preventDefault();
        const target = event.currentTarget;
        const start = target.selectionStart;
        setSource(`${source.slice(0, start)}    ${source.slice(target.selectionEnd)}`);
        requestAnimationFrame(() => target.setSelectionRange(start + 4, start + 4));
    }

    return (
        <BaseDialog
            title="Source code"
            wide
            bodyClass="erag-dialog__body--source"
            onClose={onClose}
            footer={
                <>
                    <button
                        type="button"
                        className="erag-button"
                        onClick={onClose}
                    >
                        {editable ? 'Cancel' : 'Close'}
                    </button>
                    {editable && (
                        <button
                            type="button"
                            className="erag-button erag-button--primary"
                            onClick={() => onSave(source)}
                        >
                            Apply
                        </button>
                    )}
                </>
            }
        >
            <textarea
                value={source}
                className="erag-source-editor"
                spellCheck={false}
                aria-label="HTML source"
                readOnly={!editable}
                onChange={(event) => setSource(event.target.value)}
                onKeyDown={keydown}
            />
        </BaseDialog>
    );
}
