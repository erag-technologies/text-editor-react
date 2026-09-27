import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from 'react';
import type { LineHeightOption } from '../../types';
import { classNames, focusMenuButton, preventDefault } from '../../utils/events';

interface LineHeightMenuProps {
    options: LineHeightOption[];
    selected: string | null;
    className?: string;
    style?: CSSProperties;
    onClose: () => void;
    onSelect: (value: string) => void;
}

export function LineHeightMenu({
    options,
    selected,
    className,
    style,
    onClose,
    onSelect,
}: LineHeightMenuProps) {
    const root = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const selector = selected ? `[data-erag-line-height="${selected}"]` : 'button';
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
            aria-label="Line height"
            onKeyDown={keydown}
        >
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={classNames(
                        'erag-case-menu__item',
                        selected === option.value && 'erag-is-active',
                    )}
                    role="menuitemradio"
                    aria-checked={selected === option.value}
                    data-erag-line-height={option.value}
                    onMouseDown={preventDefault}
                    onClick={() => onSelect(option.value)}
                >
                    <span className="erag-case-menu__label">{option.label}</span>
                    <span
                        className="erag-case-menu__check"
                        aria-hidden="true"
                    >
                        {selected === option.value ? '✓' : ''}
                    </span>
                </button>
            ))}
        </div>
    );
}
