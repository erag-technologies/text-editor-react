import { useState, type FormEvent } from 'react';
import type { LinkValue } from '../../types';
import { isSafeUrl } from '../../utils/url';
import { BaseDialog } from './BaseDialog';

interface LinkDialogProps {
    initial: LinkValue;
    allowRelative: boolean;
    canUnlink: boolean;
    onClose: () => void;
    onSave: (value: LinkValue) => void;
    onUnlink: () => void;
}

export function LinkDialog({
    initial,
    allowRelative,
    canUnlink,
    onClose,
    onSave,
    onUnlink,
}: LinkDialogProps) {
    const [form, setForm] = useState<LinkValue>(() => ({ ...initial }));
    const [error, setError] = useState('');

    function update<K extends keyof LinkValue>(key: K, value: LinkValue[K]): void {
        setForm((current) => ({ ...current, [key]: value }));
    }
    function save(): void {
        const value = { ...form, url: form.url.trim() };
        if (!isSafeUrl(value.url, { allowRelative })) {
            setError('Enter a safe HTTP, email, telephone, anchor, or allowed relative URL.');
            return;
        }
        onSave(value);
    }
    function submit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        save();
    }

    return (
        <BaseDialog
            title="Insert/edit link"
            onClose={onClose}
            footer={
                <>
                    {canUnlink && (
                        <button
                            type="button"
                            className="erag-button erag-button--danger"
                            onClick={onUnlink}
                        >
                            Unlink
                        </button>
                    )}
                    <span className="erag-dialog__spacer" />
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
            <form
                className="erag-dialog__form"
                onSubmit={submit}
            >
                <label className="erag-field">
                    <span className="erag-field__label">URL</span>
                    <input
                        value={form.url}
                        className="erag-field__input"
                        required
                        inputMode="url"
                        onChange={(event) => update('url', event.target.value)}
                        onBlur={(event) => update('url', event.target.value.trim())}
                    />
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Text to display</span>
                    <input
                        value={form.text}
                        className="erag-field__input"
                        onChange={(event) => update('text', event.target.value)}
                    />
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Title</span>
                    <input
                        value={form.title}
                        className="erag-field__input"
                        onChange={(event) => update('title', event.target.value)}
                    />
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Open link in</span>
                    <select
                        value={form.target}
                        className="erag-field__input"
                        onChange={(event) =>
                            update('target', event.target.value as LinkValue['target'])
                        }
                    >
                        <option value="_self">Current window</option>
                        <option value="_blank">New window</option>
                    </select>
                </label>
                {error && (
                    <p
                        className="erag-field__error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </form>
        </BaseDialog>
    );
}
