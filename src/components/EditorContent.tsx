import { useEffect, useRef, type ClipboardEvent, type FocusEvent, type FormEvent } from 'react';
import { useIsomorphicLayoutEffect } from '../hooks/useSetup';
import { classNames } from '../utils/events';

interface EditorContentProps {
    id: string | undefined;
    html: string;
    disabled: boolean;
    readonly: boolean;
    placeholder: string;
    spellcheck: boolean;
    direction: 'ltr' | 'rtl';
    contentClass: string;
    contentStyle: string;
    label: string;
    onClick: (event: MouseEvent) => void;
    onFocus: (event: globalThis.FocusEvent) => void;
    onBlur: (event: globalThis.FocusEvent) => void;
    onInput: (event: InputEvent) => void;
    onKeyDown: (event: KeyboardEvent) => void;
    onPaste: (event: globalThis.ClipboardEvent) => void;
    onSelectionChange: () => void;
    onReady: (root: HTMLElement) => void;
}

export function EditorContent(props: EditorContentProps) {
    const root = useRef<HTMLDivElement>(null);
    const initialHtml = useRef(props.html);
    const onReady = useRef(props.onReady);
    onReady.current = props.onReady;

    useIsomorphicLayoutEffect(() => {
        if (root.current) root.current.style.cssText = props.contentStyle;
    }, [props.contentStyle]);

    useEffect(() => {
        if (!root.current) return;
        root.current.innerHTML = initialHtml.current;
        onReady.current(root.current);
    }, []);

    return (
        <div className="erag-editor__canvas">
            <div
                ref={root}
                className={classNames('erag-editor__content', props.contentClass)}
                id={props.id}
                contentEditable={!props.disabled && !props.readonly}
                suppressContentEditableWarning
                aria-label={props.label}
                aria-disabled={props.disabled}
                aria-readonly={props.readonly}
                data-erag-placeholder={props.placeholder}
                spellCheck={props.spellcheck}
                dir={props.direction}
                role="textbox"
                aria-multiline="true"
                onClick={(event) => props.onClick(event.nativeEvent)}
                onFocus={(event: FocusEvent<HTMLDivElement>) => props.onFocus(event.nativeEvent)}
                onBlur={(event: FocusEvent<HTMLDivElement>) => props.onBlur(event.nativeEvent)}
                onInput={(event: FormEvent<HTMLDivElement>) =>
                    props.onInput(event.nativeEvent as InputEvent)
                }
                onKeyDown={(event) => props.onKeyDown(event.nativeEvent)}
                onKeyUp={props.onSelectionChange}
                onMouseUp={props.onSelectionChange}
                onPaste={(event: ClipboardEvent<HTMLDivElement>) =>
                    props.onPaste(event.nativeEvent)
                }
            />
        </div>
    );
}
