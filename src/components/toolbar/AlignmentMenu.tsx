import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from 'react';
import type { TextAlignmentCommand } from '../../types';
import { classNames, focusMenuButton, preventDefault } from '../../utils/events';
import { EditorIcon } from '../icons/EditorIcon';

interface AlignmentMenuProps {
    selected: TextAlignmentCommand;
    className?: string;
    style?: CSSProperties;
    onClose: () => void;
    onSelect: (command: TextAlignmentCommand) => void;
}

const OPTIONS: { label: string; value: TextAlignmentCommand; icon: string }[] = [
    { label: 'Align left', value: 'alignleft', icon: 'align-left' },
    { label: 'Align center', value: 'aligncenter', icon: 'align-center' },
    { label: 'Align right', value: 'alignright', icon: 'align-right' },
    { label: 'Justify', value: 'alignjustify', icon: 'align-justify' },
];

export function AlignmentMenu({
    selected,
    className,
    style,
    onClose,
    onSelect,
}: AlignmentMenuProps) {
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
        root.current
            ?.querySelector<HTMLButtonElement>(`[data-erag-alignment="${selected}"]`)
            ?.focus();
        // Focus only when the menu opens.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={root}
            className={classNames('erag-case-menu', className)}
            style={style}
            role="menu"
            aria-label="Text alignment"
            onKeyDown={keydown}
        >
            {OPTIONS.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={classNames(
                        'erag-case-menu__item',
                        selected === option.value && 'erag-is-active',
                    )}
                    role="menuitemradio"
                    aria-checked={selected === option.value}
                    data-erag-alignment={option.value}
                    onMouseDown={preventDefault}
                    onClick={() => onSelect(option.value)}
                >
                    <EditorIcon
                        className="erag-case-menu__icon"
                        name={option.icon}
                        size={16}
                    />
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
