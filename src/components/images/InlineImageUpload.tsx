import { useEffect, useId, useRef, useState, type DragEvent, type FormEvent } from 'react';
import { classNames, preventDefault } from '../../utils/events';
import { EditorIcon } from '../icons/EditorIcon';

interface InlineImageUploadProps {
    acceptedFormats: string[];
    filePicker: boolean;
    urlInput: boolean;
    loading: boolean;
    progress: number;
    error: string;
    onFile: (file: File) => void;
    onInsertUrl: (url: string) => void;
    onClose: () => void;
}

export function InlineImageUpload({
    acceptedFormats,
    filePicker,
    urlInput,
    loading,
    progress,
    error,
    onFile,
    onInsertUrl,
    onClose,
}: InlineImageUploadProps) {
    const fileInput = useRef<HTMLInputElement>(null);
    const urlField = useRef<HTMLInputElement>(null);
    const urlInputId = useId();
    const [url, setUrl] = useState('');
    const [mode, setMode] = useState<'actions' | 'url'>('actions');
    const [isDragging, setIsDragging] = useState(false);

    function chooseFile(): void {
        if (filePicker && !loading) fileInput.current?.click();
    }
    function selectFile(file: File | undefined): void {
        if (!file || loading) return;
        onFile(file);
        if (fileInput.current) fileInput.current.value = '';
    }
    function drop(event: DragEvent<HTMLSpanElement>): void {
        event.preventDefault();
        setIsDragging(false);
        if (filePicker) selectFile(event.dataTransfer.files[0]);
    }
    function submitUrl(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (url.trim() && !loading) onInsertUrl(url);
    }

    useEffect(() => {
        if (mode === 'url') urlField.current?.focus();
    }, [mode]);

    return (
        <span
            className={classNames(
                'erag-inline-image-upload',
                isDragging && 'erag-is-dragging',
                loading && 'erag-is-loading',
                Boolean(error) && 'erag-has-error',
            )}
            role="group"
            aria-label="Insert image"
            onKeyDown={(event) => {
                if (event.key !== 'Escape') return;
                event.preventDefault();
                onClose();
            }}
            onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
            }}
            onDragOver={preventDefault}
            onDragLeave={(event) => {
                event.preventDefault();
                setIsDragging(false);
            }}
            onDrop={drop}
        >
            <input
                ref={fileInput}
                className="erag-inline-image-upload__file"
                type="file"
                accept={acceptedFormats.join(',')}
                tabIndex={-1}
                aria-hidden="true"
                onChange={(event) => selectFile(event.target.files?.[0])}
            />
            {mode === 'actions' ? (
                <button
                    className="erag-inline-image-upload__dropzone"
                    type="button"
                    disabled={loading || !filePicker}
                    onClick={chooseFile}
                >
                    <span className="erag-inline-image-upload__illustration">
                        <EditorIcon
                            name="image"
                            size={34}
                        />
                    </span>
                    <span className="erag-inline-image-upload__title">
                        {loading ? 'Uploading image…' : 'Drop files here'}
                    </span>
                    {loading && (
                        <span className="erag-inline-image-upload__progress-label">
                            {Math.round(progress)}%
                        </span>
                    )}
                </button>
            ) : (
                <form
                    className="erag-inline-image-upload__url-form"
                    onSubmit={submitUrl}
                >
                    <label
                        className="erag-inline-image-upload__url-label"
                        htmlFor={urlInputId}
                    >
                        Image URL
                    </label>
                    <span className="erag-inline-image-upload__url-row">
                        <input
                            id={urlInputId}
                            ref={urlField}
                            value={url}
                            className="erag-inline-image-upload__url-input"
                            type="text"
                            inputMode="url"
                            autoComplete="url"
                            placeholder="https://example.com/image.jpg"
                            onChange={(event) => setUrl(event.target.value)}
                        />
                        <button
                            className="erag-inline-image-upload__insert"
                            type="submit"
                            disabled={loading || !url.trim()}
                        >
                            Insert
                        </button>
                    </span>
                </form>
            )}
            {loading && (
                <progress
                    className="erag-inline-image-upload__progress"
                    max={100}
                    value={progress > 0 ? progress : undefined}
                >
                    {progress}%
                </progress>
            )}
            {error && (
                <span
                    className="erag-inline-image-upload__error"
                    role="alert"
                >
                    {error}
                </span>
            )}
            <span className="erag-inline-image-upload__actions">
                {filePicker && (
                    <button
                        className="erag-inline-image-upload__action"
                        type="button"
                        title="Upload from device"
                        aria-label="Upload from device"
                        disabled={loading}
                        onClick={chooseFile}
                    >
                        <EditorIcon
                            name="upload"
                            size={18}
                        />
                    </button>
                )}
                {urlInput && (
                    <button
                        className={classNames(
                            'erag-inline-image-upload__action',
                            mode === 'url' && 'erag-is-active',
                        )}
                        type="button"
                        title="Upload from URL"
                        aria-label="Upload from URL"
                        disabled={loading}
                        onClick={() =>
                            setMode((current) => (current === 'url' ? 'actions' : 'url'))
                        }
                    >
                        <EditorIcon
                            name="link"
                            size={18}
                        />
                    </button>
                )}
                <button
                    className="erag-inline-image-upload__action erag-inline-image-upload__action--close"
                    type="button"
                    title="Cancel image upload"
                    aria-label="Cancel image upload"
                    onClick={onClose}
                >
                    <EditorIcon
                        name="close"
                        size={17}
                    />
                </button>
            </span>
        </span>
    );
}
