import { useState } from 'react';
import { replaceTextInElement } from '../../utils/dom';
import { BaseDialog } from './BaseDialog';

interface FindReplaceDialogProps {
    root: HTMLElement;
    onClose: () => void;
    onChanged: () => void;
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function selectTextOffset(root: HTMLElement, start: number, length: number): void {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let offset = 0;
    let node = walker.nextNode();
    while (node) {
        const end = offset + (node.textContent?.length ?? 0);
        if (start >= offset && start < end) {
            const range = document.createRange();
            range.setStart(node, start - offset);
            range.setEnd(node, Math.min(start - offset + length, node.textContent?.length ?? 0));
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
            return;
        }
        offset = end;
        node = walker.nextNode();
    }
}

export function FindReplaceDialog({ root, onClose, onChanged }: FindReplaceDialogProps) {
    const [find, setFind] = useState('');
    const [replacement, setReplacement] = useState('');
    const [matchCase, setMatchCase] = useState(false);
    const [wholeWord, setWholeWord] = useState(false);
    const [index, setIndex] = useState(-1);
    const [, setRevision] = useState(0);
    const source = wholeWord ? `\\b${escapeRegExp(find)}\\b` : escapeRegExp(find);
    const matches = find
        ? [...(root.textContent ?? '').matchAll(new RegExp(source, matchCase ? 'g' : 'gi'))]
        : [];

    function navigate(offset: number): void {
        if (!matches.length) return;
        const next = (index + offset + matches.length) % matches.length;
        setIndex(next);
        const match = matches[next];
        if (!match || match.index === undefined) return;
        selectTextOffset(root, match.index, match[0].length);
    }
    function replace(all: boolean): void {
        const flags = `${matchCase ? '' : 'i'}${all ? 'g' : ''}`;
        replaceTextInElement(root, new RegExp(source, flags), replacement, all);
        setRevision((revision) => revision + 1);
        onChanged();
    }

    return (
        <BaseDialog
            title="Find and replace"
            onClose={onClose}
            footer={
                <>
                    <button
                        type="button"
                        className="erag-button"
                        onClick={() => navigate(-1)}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="erag-button"
                        onClick={() => navigate(1)}
                    >
                        Next
                    </button>
                    <button
                        type="button"
                        className="erag-button"
                        onClick={() => replace(false)}
                    >
                        Replace
                    </button>
                    <button
                        type="button"
                        className="erag-button erag-button--primary"
                        onClick={() => replace(true)}
                    >
                        Replace all
                    </button>
                </>
            }
        >
            <div className="erag-dialog__form">
                <label className="erag-field">
                    <span className="erag-field__label">Find</span>
                    <input
                        value={find}
                        className="erag-field__input"
                        onChange={(event) => setFind(event.target.value)}
                    />
                </label>
                <label className="erag-field">
                    <span className="erag-field__label">Replace with</span>
                    <input
                        value={replacement}
                        className="erag-field__input"
                        onChange={(event) => setReplacement(event.target.value)}
                    />
                </label>
                <div className="erag-field__row">
                    <label className="erag-field__check">
                        <input
                            checked={matchCase}
                            type="checkbox"
                            onChange={(event) => setMatchCase(event.target.checked)}
                        />{' '}
                        Match case
                    </label>
                    <label className="erag-field__check">
                        <input
                            checked={wholeWord}
                            type="checkbox"
                            onChange={(event) => setWholeWord(event.target.checked)}
                        />{' '}
                        Whole word
                    </label>
                </div>
                <p className="erag-find__count">
                    {matches.length ? `${index + 1} of ${matches.length}` : 'No matches'}
                </p>
            </div>
        </BaseDialog>
    );
}
