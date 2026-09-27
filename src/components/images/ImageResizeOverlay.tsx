import { IMAGE_RESIZE_HANDLES } from '../../constants/imageResize';
import type { ImageResizeBox, ImageResizeHandle } from '../../types';
import { classNames } from '../../utils/events';
import { EditorIcon } from '../icons/EditorIcon';

interface ImageResizeOverlayProps {
    box: ImageResizeBox;
    deleting: boolean;
    deleteError: string;
    deleteFromServer: boolean;
    onResizeStart: (event: PointerEvent, handle: ImageResizeHandle) => void;
    onDelete: () => void;
}

export function ImageResizeOverlay({
    box,
    deleting,
    deleteError,
    deleteFromServer,
    onResizeStart,
    onDelete,
}: ImageResizeOverlayProps) {
    const deleteLabel =
        deleteError || (deleteFromServer ? 'Delete from server' : 'Delete image from editor');
    return (
        <div
            className="erag-image-resize"
            style={{
                top: `${box.top}px`,
                left: `${box.left}px`,
                width: `${box.width}px`,
                height: `${box.height}px`,
            }}
        >
            {IMAGE_RESIZE_HANDLES.map((handle) => (
                <button
                    key={handle}
                    type="button"
                    className={`erag-image-resize__handle erag-image-resize__handle--${handle}`}
                    tabIndex={-1}
                    aria-label={`Resize image from ${handle.replace('-', ' ')}`}
                    onPointerDown={(event) => onResizeStart(event.nativeEvent, handle)}
                />
            ))}
            <button
                type="button"
                className={classNames(
                    'erag-image-resize__delete',
                    deleting && 'erag-is-loading',
                    Boolean(deleteError) && 'erag-has-error',
                )}
                disabled={deleting}
                aria-label={deleteLabel}
                aria-busy={deleting}
                data-erag-tooltip={deleteLabel}
                onPointerDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                }}
                onClick={(event) => {
                    event.stopPropagation();
                    onDelete();
                }}
            >
                <EditorIcon
                    name="trash"
                    size={13}
                />
            </button>
        </div>
    );
}
