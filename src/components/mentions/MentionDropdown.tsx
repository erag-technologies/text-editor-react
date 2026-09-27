import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from 'react';
import type {
    MentionDropdownState,
    MentionErrorSlotProps,
    MentionItem,
    MentionItemSlotProps,
    MentionQuerySlotProps,
} from '../../types';
import { classNames, preventDefault } from '../../utils/events';
import { MentionItem as MentionResultItem } from './MentionItem';

interface MentionDropdownProps {
    items: MentionItem[];
    activeIndex: number;
    state: MentionDropdownState;
    query: string;
    positionStyle: CSSProperties;
    renderItem?: ((props: MentionItemSlotProps) => ReactNode) | undefined;
    renderLoading?: ((props: MentionQuerySlotProps) => ReactNode) | undefined;
    renderEmpty?: ((props: MentionQuerySlotProps) => ReactNode) | undefined;
    renderError?: ((props: MentionErrorSlotProps) => ReactNode) | undefined;
    onSelect: (item: MentionItem) => void;
    onActivate: (index: number) => void;
    onRetry: () => void;
    onReady: (element: HTMLElement) => void;
}

export function MentionDropdown(props: MentionDropdownProps) {
    const { items, activeIndex, state, query, onRetry } = props;
    const root = useRef<HTMLDivElement>(null);
    const instanceId = useId().replaceAll(':', '');
    const optionId = (index: number): string => `erag-mention-option-${instanceId}-${index}`;
    const activeOptionId =
        state === 'results' && items[activeIndex] ? optionId(activeIndex) : undefined;
    const announcement =
        state === 'loading'
            ? 'Loading mentions'
            : state === 'error'
              ? 'Unable to load mentions'
              : state === 'empty'
                ? 'No mentions found'
                : `${items.length} mention results available`;

    useEffect(() => {
        if (activeOptionId)
            document.getElementById(activeOptionId)?.scrollIntoView({ block: 'nearest' });
        // Scroll only when the active option changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    useEffect(() => {
        if (root.current) props.onReady(root.current);
        // Report the element once it mounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={root}
            className={classNames(
                'erag-mention-dropdown',
                state === 'loading' && 'erag-is-loading',
                state === 'empty' && 'erag-is-empty',
                state === 'error' && 'erag-has-error',
            )}
            style={props.positionStyle}
            role="listbox"
            aria-label="Mention suggestions"
            aria-activedescendant={activeOptionId}
        >
            <div
                className="erag-mention-dropdown__status"
                aria-live="polite"
                aria-atomic="true"
            >
                {announcement}
            </div>
            {state === 'loading' ? (
                <div className="erag-mention-dropdown__loading">
                    {props.renderLoading ? props.renderLoading({ query }) : 'Loading mentions…'}
                </div>
            ) : state === 'error' ? (
                <div className="erag-mention-dropdown__error">
                    {props.renderError ? (
                        props.renderError({ query, retry: onRetry })
                    ) : (
                        <>
                            <span>Unable to load mentions</span>
                            <button
                                type="button"
                                className="erag-mention-dropdown__retry"
                                onPointerDown={(event) => {
                                    preventDefault(event);
                                    onRetry();
                                }}
                            >
                                Retry
                            </button>
                        </>
                    )}
                </div>
            ) : state === 'empty' ? (
                <div className="erag-mention-dropdown__empty">
                    {props.renderEmpty ? props.renderEmpty({ query }) : 'No mentions found'}
                </div>
            ) : (
                <div className="erag-mention-dropdown__list">
                    {items.map((item, index) => (
                        <MentionResultItem
                            key={item.id}
                            item={item}
                            active={index === activeIndex}
                            optionId={optionId(index)}
                            renderItem={props.renderItem}
                            onActivate={() => props.onActivate(index)}
                            onSelect={() => props.onSelect(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
