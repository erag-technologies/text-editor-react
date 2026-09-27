import { useState } from 'react';
import type { TablePropertiesValue } from '../../types';
import { BaseDialog } from './BaseDialog';

interface TablePropertiesDialogProps {
    initial: TablePropertiesValue;
    onClose: () => void;
    onSave: (values: Record<string, string>) => void;
}

const PROPERTY_FIELDS = [
    { key: 'width', label: 'Width', type: 'text' },
    { key: 'cellPadding', label: 'Cell padding', type: 'text' },
    { key: 'borderWidth', label: 'Border width', type: 'text' },
    { key: 'borderColor', label: 'Border color', type: 'color' },
    { key: 'backgroundColor', label: 'Background color', type: 'color' },
] as const;

export function TablePropertiesDialog({ initial, onClose, onSave }: TablePropertiesDialogProps) {
    const [form, setForm] = useState<TablePropertiesValue>(() => ({ ...initial }));

    function update<K extends keyof TablePropertiesValue>(
        key: K,
        value: TablePropertiesValue[K],
    ): void {
        setForm((current) => ({ ...current, [key]: value }));
    }

    return (
        <BaseDialog
            title="Table properties"
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
                        onClick={() => onSave({ ...form })}
                    >
                        Apply
                    </button>
                </>
            }
        >
            <div className="erag-dialog__form erag-dialog__form--grid">
                {PROPERTY_FIELDS.map((field) => (
                    <label
                        key={field.key}
                        className="erag-field"
                    >
                        <span className="erag-field__label">{field.label}</span>
                        {field.type === 'text' ? (
                            <input
                                value={form[field.key]}
                                className="erag-field__input"
                                type="text"
                                onChange={(event) => update(field.key, event.target.value)}
                            />
                        ) : (
                            <span className="erag-color-input">
                                <input
                                    value={form[field.key]}
                                    className="erag-color-input__swatch"
                                    type="color"
                                    aria-label={field.label}
                                    onChange={(event) => update(field.key, event.target.value)}
                                />
                                <span className="erag-color-input__value">{form[field.key]}</span>
                            </span>
                        )}
                    </label>
                ))}
                <label className="erag-field">
                    <span className="erag-field__label">Border style</span>
                    <select
                        value={form.borderStyle}
                        className="erag-field__input"
                        onChange={(event) => update('borderStyle', event.target.value)}
                    >
                        <option>solid</option>
                        <option>dashed</option>
                        <option>dotted</option>
                        <option>double</option>
                        <option>none</option>
                    </select>
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Alignment</span>
                    <select
                        value={form.alignment}
                        className="erag-field__input"
                        onChange={(event) =>
                            update(
                                'alignment',
                                event.target.value as TablePropertiesValue['alignment'],
                            )
                        }
                    >
                        <option>left</option>
                        <option>center</option>
                        <option>right</option>
                    </select>
                </label>
            </div>
        </BaseDialog>
    );
}
