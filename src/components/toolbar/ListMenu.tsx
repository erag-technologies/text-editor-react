import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from 'react';
import type { ListCommand } from '../../types';
import { classNames, focusMenuButton, preventDefault } from '../../utils/events';

interface ListStyleOption {
    label: string;
    style: string;
    markers: [string, string, string];
}

interface ListMenuProps {
    command: ListCommand;
    active: boolean;
    selectedStyle: string;
    className?: string;
    style?: CSSProperties;
    onClose: () => void;
    onSelect: (command: ListCommand, style: string) => void;
}

const BULLET_OPTIONS: ListStyleOption[] = [
    { label: 'Default bullets', style: '', markers: ['•', '•', '•'] },
    { label: 'Circle bullets', style: 'circle', markers: ['○', '○', '○'] },
    { label: 'Disc bullets', style: 'disc', markers: ['●', '●', '●'] },
    { label: 'Square bullets', style: 'square', markers: ['▪', '▪', '▪'] },
];
const NUMBERED_OPTIONS: ListStyleOption[] = [
    { label: 'Decimal numbers', style: 'decimal', markers: ['1.', '2.', '3.'] },
    { label: 'Lower alpha', style: 'lower-alpha', markers: ['a.', 'b.', 'c.'] },
    { label: 'Lower greek', style: 'lower-greek', markers: ['α.', 'β.', 'γ.'] },
    { label: 'Lower roman', style: 'lower-roman', markers: ['i.', 'ii.', 'iii.'] },
    { label: 'Upper alpha', style: 'upper-alpha', markers: ['A.', 'B.', 'C.'] },
    { label: 'Upper roman', style: 'upper-roman', markers: ['I.', 'II.', 'III.'] },
];

export function ListMenu({
    command,
    active,
    selectedStyle,
    className,
    style,
    onClose,
    onSelect,
}: ListMenuProps) {
    const root = useRef<HTMLDivElement>(null);
    const options = command === 'bullist' ? BULLET_OPTIONS : NUMBERED_OPTIONS;
    const columnCount = command === 'bullist' ? 4 : 3;

    function isSelected(option: ListStyleOption): boolean {
        if (!active) return false;
        return option.style === selectedStyle;
    }

    function keydown(event: KeyboardEvent<HTMLDivElement>): void {
        if (event.key === 'Escape') {
            event.preventDefault();
            onClose();
            return;
        }
        if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))
            return;
        event.preventDefault();
        focusMenuButton(root.current, event.key, columnCount, true);
    }

    useEffect(() => {
        root.current?.querySelector<HTMLButtonElement>('.erag-list-style-menu__item')?.focus();
    }, []);

    return (
        <div
            ref={root}
            className={classNames(
                'erag-list-style-menu',
                `erag-list-style-menu--${command}`,
                className,
            )}
            style={style}
            role="menu"
            aria-label={command === 'bullist' ? 'Bulleted list styles' : 'Numbered list styles'}
            onKeyDown={keydown}
        >
            {options.map((option) => (
                <button
                    key={option.label}
                    type="button"
                    className={classNames(
                        'erag-list-style-menu__item',
                        isSelected(option) && 'erag-is-active',
                    )}
                    role="menuitemradio"
                    aria-label={option.label}
                    aria-checked={isSelected(option)}
                    title={option.label}
                    onMouseDown={preventDefault}
                    onClick={() => onSelect(command, option.style)}
                >
                    {option.markers.map((marker, index) => (
                        <span
                            key={`${option.label}-${index}`}
                            className="erag-list-style-menu__row"
                        >
                            <span className="erag-list-style-menu__marker">{marker}</span>
                            <span className="erag-list-style-menu__line" />
                        </span>
                    ))}
                </button>
            ))}
        </div>
    );
}
