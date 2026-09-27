import { useState } from 'react';
import { EMOJI_CATEGORIES, EMOJIS } from '../../constants/emojis';
import type { EmojiCategoryFilter } from '../../types';
import { classNames } from '../../utils/events';
import { BaseDialog } from './BaseDialog';

interface EmojiDialogProps {
    onClose: () => void;
    onSelect: (value: string) => void;
}

export function EmojiDialog({ onClose, onSelect }: EmojiDialogProps) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<EmojiCategoryFilter>('All');
    const search = query.trim().toLocaleLowerCase();
    const visibleEmojis = EMOJIS.filter(
        (emoji) =>
            (category === 'All' || emoji.category === category) &&
            (!search || emoji.label.toLocaleLowerCase().includes(search) || emoji.value === search),
    );

    return (
        <BaseDialog
            title="Emojis"
            footerDivider={false}
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
            <div className="erag-emoji-dialog">
                <nav
                    className="erag-emoji-dialog__categories"
                    aria-label="Emoji categories"
                >
                    {EMOJI_CATEGORIES.map((name) => (
                        <button
                            key={name}
                            type="button"
                            className={classNames(
                                'erag-emoji-dialog__category',
                                category === name && 'erag-is-active',
                            )}
                            aria-pressed={category === name}
                            onClick={() => setCategory(name)}
                        >
                            {name}
                        </button>
                    ))}
                </nav>
                <div className="erag-emoji-dialog__content">
                    <label className="erag-field">
                        <span className="erag-field__label">Search</span>
                        <input
                            value={query}
                            className="erag-field__input"
                            type="search"
                            autoComplete="off"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </label>
                    {visibleEmojis.length ? (
                        <div
                            className="erag-emoji-dialog__grid"
                            role="listbox"
                            aria-label="Emojis"
                        >
                            {visibleEmojis.map((emoji) => (
                                <button
                                    key={`${emoji.category}-${emoji.label}`}
                                    type="button"
                                    className="erag-emoji-dialog__emoji"
                                    role="option"
                                    aria-label={emoji.label}
                                    title={emoji.label}
                                    onClick={() => onSelect(emoji.value)}
                                >
                                    {emoji.value}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p
                            className="erag-emoji-dialog__empty"
                            role="status"
                        >
                            No emojis found
                        </p>
                    )}
                </div>
            </div>
        </BaseDialog>
    );
}
