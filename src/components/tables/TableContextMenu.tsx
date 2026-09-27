import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { TableContextMenuPosition } from '../../controllers/createTableInteractions';
import type { TableContextAction } from '../../controllers/setupEditor';
import { preventDefault } from '../../utils/events';

interface TableContextMenuProps {
    position: TableContextMenuPosition;
    multipleCells: boolean;
    onSelect: (action: TableContextAction) => void;
}

export function TableContextMenu({ position, multipleCells, onSelect }: TableContextMenuProps) {
    const menu = useRef<HTMLDivElement>(null);
    const menuStyle = {
        top: `${Math.max(8, Math.min(position.y, window.innerHeight - 360))}px`,
        left: `${Math.max(8, Math.min(position.x, window.innerWidth - 220))}px`,
    };

    useEffect(() => {
        menu.current?.focus();
    }, []);

    function item(action: TableContextAction, label: string, className?: string) {
        return (
            <button
                type="button"
                className={className}
                role="menuitem"
                onClick={() => onSelect(action)}
            >
                {label}
            </button>
        );
    }

    return createPortal(
        <div
            ref={menu}
            className="erag-table-context-menu"
            style={menuStyle}
            role="menu"
            tabIndex={-1}
            aria-label="Table options"
            onContextMenu={preventDefault}
        >
            {item('cell-properties', 'Cell properties')}
            {item('table-properties', 'Table properties')}
            <span className="erag-table-context-menu__separator" />
            {item('rowBefore', 'Insert row before')}
            {item('rowAfter', 'Insert row after')}
            {item('deleteRow', 'Delete row')}
            <span className="erag-table-context-menu__separator" />
            {item('columnBefore', 'Insert column before')}
            {item('columnAfter', 'Insert column after')}
            {item('deleteColumn', 'Delete column')}
            <span className="erag-table-context-menu__separator" />
            {multipleCells
                ? item('mergeCells', 'Merge selected cells')
                : item('splitCell', 'Split cell')}
            {item('deleteTable', 'Delete table', 'erag-table-context-menu__danger')}
        </div>,
        document.body,
    );
}
