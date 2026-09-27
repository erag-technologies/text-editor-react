import type {
    TableInteractionBox,
    TableResizeHandle,
} from '../../controllers/createTableInteractions';

interface TableInteractionOverlayProps {
    tableBox: TableInteractionBox;
    cellBoxes: TableInteractionBox[];
    onResizeStart: (event: PointerEvent, handle: TableResizeHandle) => void;
}

const HANDLES: TableResizeHandle[] = ['north-west', 'north-east', 'south-west', 'south-east'];

function boxStyle(box: TableInteractionBox) {
    return {
        top: `${box.top}px`,
        left: `${box.left}px`,
        width: `${box.width}px`,
        height: `${box.height}px`,
    };
}

export function TableInteractionOverlay({
    tableBox,
    cellBoxes,
    onResizeStart,
}: TableInteractionOverlayProps) {
    return (
        <>
            <div
                className="erag-table-selection"
                style={boxStyle(tableBox)}
                aria-hidden="true"
            >
                {HANDLES.map((handle) => (
                    <button
                        key={handle}
                        type="button"
                        className={`erag-table-selection__handle erag-table-selection__handle--${handle}`}
                        tabIndex={-1}
                        aria-label={`Resize table from ${handle.replace('-', ' ')}`}
                        onPointerDown={(event) => onResizeStart(event.nativeEvent, handle)}
                    />
                ))}
            </div>
            {cellBoxes.map((box, index) => (
                <div
                    key={index}
                    className="erag-table-cell-selection"
                    style={boxStyle(box)}
                    aria-hidden="true"
                />
            ))}
        </>
    );
}
