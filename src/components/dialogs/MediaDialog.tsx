import { useState } from 'react';
import type { MediaValue } from '../../types';
import { isSafeUrl } from '../../utils/url';
import { BaseDialog } from './BaseDialog';

interface MediaDialogProps {
    allowRelative: boolean;
    onClose: () => void;
    onSave: (value: MediaValue) => void;
}

export function MediaDialog({ allowRelative, onClose, onSave }: MediaDialogProps) {
    const [form, setForm] = useState<MediaValue>({
        type: 'video',
        src: '',
        width: '640',
        height: '360',
        poster: '',
    });
    const [error, setError] = useState('');

    function update<K extends keyof MediaValue>(key: K, value: MediaValue[K]): void {
        setForm((current) => ({ ...current, [key]: value }));
    }
    function save(): void {
        const value = { ...form, src: form.src.trim(), poster: form.poster.trim() };
        if (
            !isSafeUrl(value.src, { allowRelative }) ||
            (value.type === 'iframe' && !/^https:\/\//i.test(value.src))
        ) {
            setError('Enter a safe media URL. Embeds must use HTTPS.');
            return;
        }
        onSave(value);
    }

    return (
        <BaseDialog
            title="Insert media"
            onClose={onClose}
            footer={
                <>
                    <button
                        type="button"
                        className="erag-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="erag-button erag-button--primary"
                        onClick={save}
                    >
                        Save
                    </button>
                </>
            }
        >
            <div className="erag-dialog__form">
                <label className="erag-field">
                    <span className="erag-field__label">Media type</span>
                    <select
                        value={form.type}
                        className="erag-field__input"
                        onChange={(event) =>
                            update('type', event.target.value as MediaValue['type'])
                        }
                    >
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                        <option value="iframe">Secure embed</option>
                    </select>
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Source URL</span>
                    <input
                        value={form.src}
                        className="erag-field__input"
                        required
                        onChange={(event) => update('src', event.target.value)}
                        onBlur={(event) => update('src', event.target.value.trim())}
                    />
                </label>
                {form.type !== 'audio' && (
                    <div className="erag-field__row">
                        <label className="erag-field">
                            <span className="erag-field__label">Width</span>
                            <input
                                value={form.width}
                                className="erag-field__input"
                                type="number"
                                onChange={(event) => update('width', event.target.value)}
                            />
                        </label>
                        <label className="erag-field">
                            <span className="erag-field__label">Height</span>
                            <input
                                value={form.height}
                                className="erag-field__input"
                                type="number"
                                onChange={(event) => update('height', event.target.value)}
                            />
                        </label>
                    </div>
                )}
                {form.type === 'video' && (
                    <label className="erag-field">
                        <span className="erag-field__label">Poster image</span>
                        <input
                            value={form.poster}
                            className="erag-field__input"
                            onChange={(event) => update('poster', event.target.value)}
                            onBlur={(event) => update('poster', event.target.value.trim())}
                        />
                    </label>
                )}
                {error && <p className="erag-field__error">{error}</p>}
            </div>
        </BaseDialog>
    );
}
