import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { TextCaseMode } from '../../types';
import { classNames, focusMenuButton, preventDefault } from '../../utils/events';

interface CaseChangeMenuProps {
    mode: TextCaseMode | null;
    className?: string;
    style?: CSSProperties;
    onClose: () => void;
    onSelect: (mode: TextCaseMode) => void;
}

const OPTIONS: { label: string; value: TextCaseMode }[] = [
    { label: 'lowercase', value: 'lowercase' },
    { label: 'UPPERCASE', value: 'uppercase' },
    { label: 'Title Case', value: 'titlecase' },
];

export function CaseChangeMenu({ mode, className, style, onClose, onSelect }: CaseChangeMenuProps) {
    const root = useRef<HTMLDivElement>(null);
    const [highlightedMode, setHighlightedMode] = useState<TextCaseMode | null>(null);

    function keydown(event: KeyboardEvent<HTMLDivElement>): void {
        if (event.key === 'Escape') {
            event.preventDefault();
            onClose();
            return;
        }
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        focusMenuButton(root.current, event.key);
    }

    function isHighlighted(value: TextCaseMode): boolean {
        return highlightedMode === value || (highlightedMode === null && mode === value);
    }

    function restoreFocusedHighlight(): void {
        const focused = root.current?.contains(document.activeElement)
            ? (document.activeElement as HTMLElement).dataset.eragCase
            : undefined;
        setHighlightedMode((focused as TextCaseMode | undefined) ?? null);
    }

    useEffect(() => {
        const selector = mode ? `[data-erag-case="${mode}"]` : 'button';
        root.current?.querySelector<HTMLButtonElement>(selector)?.focus();
        // Focus only when the menu opens.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={root}
            className={classNames('erag-case-menu', className)}
            style={style}
            role="menu"
            aria-label="Change text case"
            onKeyDown={keydown}
            onPointerLeave={restoreFocusedHighlight}
        >
            {OPTIONS.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={classNames(
                        'erag-case-menu__item',
                        isHighlighted(option.value) && 'erag-is-active',
                    )}
                    role="menuitemradio"
                    aria-checked={mode === option.value}
                    data-erag-case={option.value}
                    onFocus={() => setHighlightedMode(option.value)}
                    onPointerEnter={() => setHighlightedMode(option.value)}
                    onMouseDown={preventDefault}
                    onClick={() => onSelect(option.value)}
                >
                    <span className="erag-case-menu__label">{option.label}</span>
                    <span
                        className="erag-case-menu__check"
                        aria-hidden="true"
                    >
                        {mode === option.value ? '✓' : ''}
                    </span>
                </button>
            ))}
        </div>
    );
}
