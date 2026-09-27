import { useRef } from 'react';
import { useFloatingPosition } from '../../hooks/useFloatingPosition';
import type { ResolvedEditorInit, UploadState } from '../../types';
import { InlineImageUpload } from './InlineImageUpload';

interface InlineImageUploadPortalProps {
    target: HTMLElement | null;
    config: ResolvedEditorInit;
    state: UploadState;
    error: string;
    onFile: (file: File) => void;
    onInsertUrl: (url: string) => void;
    onClose: () => void;
}

export function InlineImageUploadPortal({
    target,
    config,
    state,
    error,
    onFile,
    onInsertUrl,
    onClose,
}: InlineImageUploadPortalProps) {
    const panel = useRef<HTMLSpanElement>(null);
    const boundary = target?.closest<HTMLElement>('.erag-editor__content-wrap') ?? null;
    const style = useFloatingPosition(target, panel, boundary);

    if (!target) return null;

    return (
        <span
            ref={panel}
            className="erag-inline-image-upload-portal"
            style={style}
        >
            <InlineImageUpload
                acceptedFormats={config.acceptedFormats}
                filePicker={config.imageFilePicker}
                urlInput={config.imageUrlInput}
                loading={state.loading}
                progress={state.progress}
                error={error}
                onFile={onFile}
                onInsertUrl={onInsertUrl}
                onClose={onClose}
            />
        </span>
    );
}
