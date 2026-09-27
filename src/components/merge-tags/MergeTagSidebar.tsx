import { useEffect, useRef, type Ref } from 'react';
import type { MergeTagItem } from '../../types';
import { classNames, preventDefault } from '../../utils/events';
import { formatMergeTagValue } from '../../utils/mergeTag';
import { EditorIcon } from '../icons/EditorIcon';

interface MergeTagSidebarProps {
    id: string;
    items: MergeTagItem[];
    disabled: boolean;
    className?: string;
    elementRef?: Ref<HTMLElement>;
    onClose: () => void;
    onSelect: (item: MergeTagItem) => void;
}

export function MergeTagSidebar({
    id,
    items,
    disabled,
    className,
    elementRef,
    onClose,
    onSelect,
}: MergeTagSidebarProps) {
    const close = useRef(onClose);
    close.current = onClose;
    const groupedItems = new Map<string, MergeTagItem[]>();
    for (const item of items) {
        const group = item.group?.trim() ?? '';
        const entries = groupedItems.get(group) ?? [];
        entries.push(item);
        groupedItems.set(group, entries);
    }
    const groups = [...groupedItems].map(([label, entries]) => ({ label, items: entries }));

    useEffect(() => {
        function keydown(event: KeyboardEvent): void {
            if (event.key === 'Escape') close.current();
        }
        document.addEventListener('keydown', keydown);
        return () => document.removeEventListener('keydown', keydown);
    }, []);

    return (
        <aside
            ref={elementRef}
            id={id}
            className={classNames('erag-merge-tag-sidebar', className)}
            aria-label="Merge tags"
        >
            <header className="erag-merge-tag-sidebar__header">
                <span className="erag-merge-tag-sidebar__title">Merge tag</span>
                <button
                    type="button"
                    className="erag-merge-tag-sidebar__close"
                    aria-label="Close merge tags"
                    onMouseDown={preventDefault}
                    onClick={onClose}
                >
                    <EditorIcon
                        name="close"
                        size={18}
                    />
                </button>
            </header>
            <div className="erag-merge-tag-sidebar__body">
                {groups.map((group) => (
                    <section
                        key={group.label}
                        className="erag-merge-tag-sidebar__group"
                    >
                        {group.label && (
                            <h3 className="erag-merge-tag-sidebar__group-title">{group.label}</h3>
                        )}
                        <div className="erag-merge-tag-sidebar__list">
                            {group.items.map((item) => (
                                <div
                                    key={item.value}
                                    className="erag-merge-tag-sidebar__item"
                                >
                                    {item.name && (
                                        <span className="erag-merge-tag-sidebar__item-name">
                                            {item.name}
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        className="erag-merge-tag-sidebar__item-value"
                                        disabled={disabled}
                                        onMouseDown={preventDefault}
                                        onClick={() => onSelect(item)}
                                    >
                                        {formatMergeTagValue(item.value)}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
                {groups.length === 0 && (
                    <p className="erag-merge-tag-sidebar__empty">No merge tags configured</p>
                )}
            </div>
        </aside>
    );
}
