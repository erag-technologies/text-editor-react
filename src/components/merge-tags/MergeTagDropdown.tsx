import { useEffect, useId, useRef, type CSSProperties } from 'react';
import type { MergeTagItem } from '../../types';
import { classNames, preventDefault } from '../../utils/events';
import { formatMergeTagValue } from '../../utils/mergeTag';

interface MergeTagDropdownProps {
    items: MergeTagItem[];
    activeIndex: number;
    query: string;
    positionStyle: CSSProperties;
    onSelect: (item: MergeTagItem) => void;
    onActivate: (index: number) => void;
    onReady: (element: HTMLElement) => void;
}

export function MergeTagDropdown(props: MergeTagDropdownProps) {
    const { items, activeIndex, query } = props;
    const root = useRef<HTMLDivElement>(null);
    const instanceId = useId().replaceAll(':', '');
    const activeId = items[activeIndex]
        ? `erag-merge-tag-option-${instanceId}-${activeIndex}`
        : undefined;
    const groupedItems = new Map<string, { item: MergeTagItem; index: number }[]>();
    items.forEach((item, index) => {
        const group = item.group?.trim() ?? '';
        const entries = groupedItems.get(group) ?? [];
        entries.push({ item, index });
        groupedItems.set(group, entries);
    });
    const sections = [...groupedItems].map(([label, entries]) => ({ label, entries }));

    useEffect(() => {
        if (root.current) props.onReady(root.current);
        // Report the element once it mounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={root}
            className="erag-merge-tag-dropdown"
            style={props.positionStyle}
            role="listbox"
            aria-label="Merge tag suggestions"
            aria-activedescendant={activeId}
        >
            <div
                className="erag-merge-tag-dropdown__status"
                aria-live="polite"
            >
                {items.length} merge tag suggestions for {query}
            </div>
            {items.length ? (
                <div className="erag-merge-tag-dropdown__list">
                    {sections.map((section) => (
                        <div
                            key={section.label || 'ungrouped'}
                            className="erag-merge-tag-dropdown__section"
                            role="group"
                            aria-label={section.label || 'Merge tags'}
                        >
                            {section.label && (
                                <span className="erag-merge-tag-dropdown__section-title">
                                    {section.label}
                                </span>
                            )}
                            {section.entries.map((entry) => (
                                <button
                                    id={`erag-merge-tag-option-${instanceId}-${entry.index}`}
                                    key={`${entry.item.value}-${entry.index}`}
                                    type="button"
                                    className={classNames(
                                        'erag-merge-tag-dropdown__item',
                                        entry.index === activeIndex && 'erag-is-active',
                                    )}
                                    role="option"
                                    aria-selected={entry.index === activeIndex}
                                    tabIndex={-1}
                                    onPointerEnter={() => props.onActivate(entry.index)}
                                    onPointerDown={(event) => {
                                        preventDefault(event);
                                        props.onSelect(entry.item);
                                    }}
                                >
                                    <span className="erag-merge-tag-dropdown__label">
                                        {entry.item.name && (
                                            <span className="erag-merge-tag-dropdown__name">
                                                {entry.item.name}
                                            </span>
                                        )}
                                        <span className="erag-merge-tag-dropdown__value">
                                            {formatMergeTagValue(entry.item.value)}
                                        </span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="erag-merge-tag-dropdown__empty"
                    role="status"
                >
                    No merge tags found
                </div>
            )}
        </div>
    );
}
