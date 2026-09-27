import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { MentionItem } from '../../types';
import { initialsOf } from './MentionItem';

interface MentionHoverCardProps {
    item: MentionItem;
    positionStyle: CSSProperties;
    onReady: (element: HTMLElement) => void;
}

export function MentionHoverCard({ item, positionStyle, onReady }: MentionHoverCardProps) {
    const root = useRef<HTMLDivElement>(null);
    const [failedAvatar, setFailedAvatar] = useState<string | null>(null);
    const avatarVisible = Boolean(item.avatar) && failedAvatar !== item.avatar;

    useEffect(() => {
        if (root.current) onReady(root.current);
        // Report the element once it mounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={root}
            className="erag-mention-hover-card"
            style={positionStyle}
            role="tooltip"
        >
            {item.avatar && avatarVisible ? (
                <img
                    className="erag-mention-hover-card__avatar"
                    src={item.avatar}
                    alt=""
                    onError={() => setFailedAvatar(item.avatar ?? null)}
                />
            ) : (
                <span
                    className="erag-mention-hover-card__avatar-fallback"
                    aria-hidden="true"
                >
                    {initialsOf(item.label)}
                </span>
            )}
            <span className="erag-mention-hover-card__content">
                <span className="erag-mention-hover-card__label">{item.label}</span>
                {item.description && (
                    <span className="erag-mention-hover-card__description">{item.description}</span>
                )}
                {item.value && <span className="erag-mention-hover-card__value">{item.value}</span>}
            </span>
        </div>
    );
}
