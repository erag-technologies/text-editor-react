import { useState, type ReactNode } from 'react';
import type { MentionItem as MentionItemData, MentionItemSlotProps } from '../../types';
import { classNames, preventDefault } from '../../utils/events';

interface MentionItemProps {
    item: MentionItemData;
    active: boolean;
    optionId: string;
    renderItem?: ((props: MentionItemSlotProps) => ReactNode) | undefined;
    onSelect: () => void;
    onActivate: () => void;
}

export function initialsOf(label: string): string {
    return label
        .split(/\s+/u)
        .slice(0, 2)
        .map((part) => part.charAt(0).toLocaleUpperCase())
        .join('');
}

export function MentionItem({
    item,
    active,
    optionId,
    renderItem,
    onSelect,
    onActivate,
}: MentionItemProps) {
    const [failedAvatar, setFailedAvatar] = useState<string | null>(null);
    const avatarVisible = Boolean(item.avatar) && failedAvatar !== item.avatar;

    return (
        <button
            id={optionId}
            type="button"
            className={classNames('erag-mention-dropdown__item', active && 'erag-is-active')}
            role="option"
            aria-selected={active}
            tabIndex={-1}
            onPointerEnter={onActivate}
            onPointerDown={(event) => {
                preventDefault(event);
                onSelect();
            }}
        >
            {renderItem ? (
                renderItem({ item, active })
            ) : (
                <>
                    {item.avatar && avatarVisible ? (
                        <img
                            className="erag-mention-dropdown__avatar"
                            src={item.avatar}
                            alt=""
                            onError={() => setFailedAvatar(item.avatar ?? null)}
                        />
                    ) : (
                        <span
                            className="erag-mention-dropdown__avatar-fallback"
                            aria-hidden="true"
                        >
                            {initialsOf(item.label)}
                        </span>
                    )}
                    <span className="erag-mention-dropdown__content">
                        <span className="erag-mention-dropdown__label">{item.label}</span>
                        {item.description && (
                            <span className="erag-mention-dropdown__description">
                                {item.description}
                            </span>
                        )}
                    </span>
                </>
            )}
        </button>
    );
}
