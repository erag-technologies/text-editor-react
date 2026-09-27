import type { MouseEvent } from 'react';
import type { ToolbarItemDefinition } from '../../types';
import { classNames, preventDefault } from '../../utils/events';
import { EditorIcon } from '../icons/EditorIcon';

interface ToolbarButtonProps {
    item: ToolbarItemDefinition;
    active: boolean;
    available: boolean;
    disabled: boolean;
    onActivate: (item: ToolbarItemDefinition, event: MouseEvent<HTMLButtonElement>) => void;
}

export function ToolbarButton({
    item,
    active,
    available,
    disabled,
    onActivate,
}: ToolbarButtonProps) {
    return (
        <button
            type="button"
            className={classNames(
                'erag-toolbar__button',
                item.dropdown && 'erag-toolbar__button--dropdown',
                active && 'erag-is-active',
                available && 'erag-is-available',
                disabled && 'erag-is-disabled',
            )}
            disabled={disabled}
            aria-label={item.label}
            title={item.label}
            aria-haspopup={item.dropdown ? 'menu' : undefined}
            aria-expanded={item.dropdown ? active : undefined}
            aria-pressed={item.dropdown ? undefined : active}
            onMouseDown={preventDefault}
            onClick={(event) => onActivate(item, event)}
        >
            <EditorIcon name={item.icon ?? 'more'} />
            {item.dropdown && (
                <EditorIcon
                    name="chevron-down"
                    size={12}
                />
            )}
        </button>
    );
}
