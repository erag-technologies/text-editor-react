import { useState } from 'react';
import type { CellPropertiesValue } from '../../types';
import { BaseDialog } from './BaseDialog';

interface CellPropertiesDialogProps {
    initial: CellPropertiesValue;
    onClose: () => void;
    onSave: (values: CellPropertiesValue) => void;
}

export function CellPropertiesDialog({ initial, onClose, onSave }: CellPropertiesDialogProps) {
    const [form, setForm] = useState<CellPropertiesValue>(() => ({ ...initial }));

    function update<K extends keyof CellPropertiesValue>(
        key: K,
        value: CellPropertiesValue[K],
    ): void {
        setForm((current) => ({ ...current, [key]: value }));
    }

    function updateCellType(cellType: CellPropertiesValue['cellType']): void {
        setForm((current) => ({
            ...current,
            cellType,
            scope: cellType === 'td' ? '' : current.scope,
        }));
    }

    return (
        <BaseDialog
            title="Cell properties"
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
                <label className="erag-field">
                    <span className="erag-field__label">Apply to</span>
                    <select
                        value={form.target}
                        className="erag-field__input"
                        onChange={(event) =>
                            update('target', event.target.value as CellPropertiesValue['target'])
                        }
                    >
                        <option value="cell">Selected cell</option>
                        <option value="first-row">First row</option>
                    </select>
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Cell type</span>
                    <select
                        value={form.cellType}
                        className="erag-field__input"
                        onChange={(event) =>
                            updateCellType(event.target.value as CellPropertiesValue['cellType'])
                        }
                    >
                        <option value="td">Cell</option>
                        <option value="th">Header cell</option>
                    </select>
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Scope</span>
                    <select
                        value={form.scope}
                        className="erag-field__input"
                        disabled={form.cellType === 'td'}
                        onChange={(event) =>
                            update('scope', event.target.value as CellPropertiesValue['scope'])
                        }
                    >
                        <option value="">None</option>
                        <option value="row">Row</option>
                        <option value="col">Column</option>
                    </select>
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Horizontal align</span>
                    <select
                        value={form.horizontalAlign}
                        className="erag-field__input"
                        onChange={(event) =>
                            update(
                                'horizontalAlign',
                                event.target.value as CellPropertiesValue['horizontalAlign'],
                            )
                        }
                    >
                        <option value="">None</option>
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Vertical align</span>
                    <select
                        value={form.verticalAlign}
                        className="erag-field__input"
                        onChange={(event) =>
                            update(
                                'verticalAlign',
                                event.target.value as CellPropertiesValue['verticalAlign'],
                            )
                        }
                    >
                        <option value="">None</option>
                        <option value="top">Top</option>
                        <option value="middle">Middle</option>
                        <option value="bottom">Bottom</option>
                    </select>
                </label>
            </div>
        </BaseDialog>
    );
}
