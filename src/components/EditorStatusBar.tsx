import type { ReactNode } from 'react';
import type { EditorCounts } from '../types';
import { EditorIcon } from './icons/EditorIcon';

interface EditorStatusBarProps {
    path: string;
    counts: EditorCounts;
    resize: boolean;
    helpText: string;
    disabled: boolean;
    start?: ReactNode;
    end?: ReactNode;
    onResizeStart: (event: PointerEvent) => void;
}

export function EditorStatusBar({
    path,
    counts,
    resize,
    helpText,
    disabled,
    start,
    end,
    onResizeStart,
}: EditorStatusBarProps) {
    return (
        <div className="erag-statusbar">
            {start != null && <div className="erag-statusbar__slot">{start}</div>}
            <span className="erag-statusbar__path">{path}</span>
            <span className="erag-statusbar__count">{counts.words} words</span>
            <span className="erag-statusbar__count">{counts.characters} characters</span>{' '}
            <span className="erag-statusbar__help">{helpText}</span>
            {end != null && <div className="erag-statusbar__slot">{end}</div>}
            {resize && (
                <button
                    type="button"
                    className="erag-statusbar__resize"
                    aria-label="Resize editor"
                    disabled={disabled}
                    onPointerDown={(event) => onResizeStart(event.nativeEvent)}
                >
                    <EditorIcon
                        name="resize"
                        size={16}
                    />
                </button>
            )}
        </div>
    );
}
