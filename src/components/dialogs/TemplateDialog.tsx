import { useState } from 'react';
import type {
    EditorTemplateItem,
    ResolvedEditorInit,
    ResolvedEditorTemplatesConfig,
} from '../../types';
import { classNames } from '../../utils/events';
import { sanitizeHtml } from '../../utils/sanitizer';
import { BaseDialog } from './BaseDialog';

interface TemplateDialogProps {
    templates: ResolvedEditorTemplatesConfig;
    config: ResolvedEditorInit;
    onClose: () => void;
    onInsert: (item: EditorTemplateItem) => void;
}

export function TemplateDialog({ templates, config, onClose, onInsert }: TemplateDialogProps) {
    const [search, setSearch] = useState('');
    const [preferredId, setPreferredId] = useState<string | number | null>(null);
    const query = search.trim().toLocaleLowerCase();
    const filteredItems = query
        ? templates.items.filter((item) =>
              [item.label, item.description, item.group]
                  .filter((value): value is string => Boolean(value))
                  .some((value) => value.toLocaleLowerCase().includes(query)),
          )
        : templates.items;
    const selectedId = filteredItems.some((item) => item.id === preferredId)
        ? preferredId
        : (filteredItems[0]?.id ?? null);
    const groupedItems = new Map<string, EditorTemplateItem[]>();
    for (const item of filteredItems) {
        const group = item.group?.trim() || 'General';
        const items = groupedItems.get(group) ?? [];
        items.push(item);
        groupedItems.set(group, items);
    }
    const groups = [...groupedItems].map(([label, items]) => ({ label, items }));
    const selected = templates.items.find((item) => item.id === selectedId) ?? null;
    const previewHtml = selected
        ? sanitizeHtml(selected.content, {
              allowedTags: config.allowedTags,
              allowedAttributes: config.allowedAttributes,
              allowRelativeUrls: config.relativeUrls,
          })
        : '';

    function insert(): void {
        if (selected) onInsert(selected);
    }

    return (
        <BaseDialog
            title="Templates"
            wide
            bodyClass="erag-dialog__body--template"
            footerDivider={false}
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
                        disabled={!selected}
                        onClick={insert}
                    >
                        Insert
                    </button>
                </>
            }
        >
            <div className="erag-template-dialog">
                <aside className="erag-template-dialog__sidebar">
                    <label className="erag-template-dialog__search">
                        <span className="erag-template-dialog__search-label">Search templates</span>
                        <input
                            value={search}
                            type="search"
                            className="erag-template-dialog__search-input"
                            placeholder="Search"
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </label>
                    <div className="erag-template-dialog__groups">
                        {groups.map((group) => (
                            <section
                                key={group.label}
                                className="erag-template-dialog__group"
                            >
                                <h3 className="erag-template-dialog__group-title">{group.label}</h3>
                                {group.items.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={classNames(
                                            'erag-template-dialog__item',
                                            item.id === selectedId && 'erag-is-active',
                                        )}
                                        aria-pressed={item.id === selectedId}
                                        onClick={() => setPreferredId(item.id)}
                                        onDoubleClick={() => onInsert(item)}
                                    >
                                        <span className="erag-template-dialog__item-label">
                                            {item.label}
                                        </span>
                                        {item.description && (
                                            <span className="erag-template-dialog__item-description">
                                                {item.description}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </section>
                        ))}
                        {groups.length === 0 && (
                            <p className="erag-template-dialog__empty">No templates found</p>
                        )}
                    </div>
                </aside>
                <section
                    className="erag-template-dialog__preview"
                    aria-label="Template preview"
                >
                    {selected ? (
                        <div
                            className="erag-template-dialog__preview-content"
                            dangerouslySetInnerHTML={{ __html: previewHtml }}
                        />
                    ) : (
                        <p className="erag-template-dialog__empty">
                            Select a template to preview it
                        </p>
                    )}
                </section>
            </div>
        </BaseDialog>
    );
}
