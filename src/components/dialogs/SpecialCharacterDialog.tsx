import { useState } from 'react';
import {
    ALL_SPECIAL_CHARACTERS,
    SPECIAL_CHARACTER_CATEGORIES,
} from '../../constants/specialCharacters';
import { classNames } from '../../utils/events';
import { BaseDialog } from './BaseDialog';

interface SpecialCharacterDialogProps {
    onClose: () => void;
    onSelect: (value: string) => void;
}

const CATEGORIES = ['All', ...SPECIAL_CHARACTER_CATEGORIES.map((item) => item.name)];

export function SpecialCharacterDialog({ onClose, onSelect }: SpecialCharacterDialogProps) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const source =
        category === 'All'
            ? ALL_SPECIAL_CHARACTERS
            : (SPECIAL_CHARACTER_CATEGORIES.find((item) => item.name === category)?.items ?? []);
    const search = query.trim().toLocaleLowerCase();
    const symbols = search
        ? source.filter(
              (item) =>
                  item.value.includes(search) || item.label.toLocaleLowerCase().includes(search),
          )
        : source;

    return (
        <BaseDialog
            title="Special Character"
            onClose={onClose}
            footer={
                <button
                    type="button"
                    className="erag-button erag-button--primary"
                    onClick={onClose}
                >
                    Close
                </button>
            }
        >
            <div className="erag-character-dialog">
                <div
                    className="erag-character-dialog__categories"
                    role="tablist"
                    aria-label="Special character categories"
                >
                    {CATEGORIES.map((name) => (
                        <button
                            key={name}
                            type="button"
                            className={classNames(
                                'erag-character-dialog__category',
                                category === name && 'erag-is-active',
                            )}
                            role="tab"
                            aria-selected={category === name}
                            onClick={() => setCategory(name)}
                        >
                            {name}
                        </button>
                    ))}
                </div>
                <div className="erag-character-dialog__content">
                    <label className="erag-character-dialog__search">
                        <span className="erag-character-dialog__search-label">Search</span>
                        <input
                            value={query}
                            className="erag-field__input"
                            type="search"
                            placeholder="Search"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </label>
                    <div
                        className="erag-character-dialog__grid"
                        role="tabpanel"
                    >
                        {symbols.map((symbol, index) => (
                            <button
                                key={`${symbol.value}-${index}`}
                                type="button"
                                className="erag-character-dialog__symbol"
                                aria-label={`Insert ${symbol.label}: ${symbol.value}`}
                                title={symbol.label}
                                onClick={() => onSelect(symbol.value)}
                            >
                                {symbol.value}
                            </button>
                        ))}
                        {symbols.length === 0 && (
                            <p className="erag-character-dialog__empty">No characters found</p>
                        )}
                    </div>
                </div>
            </div>
        </BaseDialog>
    );
}
