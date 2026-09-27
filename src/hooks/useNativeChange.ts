import { useEffect, useRef, type RefObject } from 'react';

/**
 * Subscribes to the native `change` event, which React maps to `input` for
 * form fields. Color pickers need the commit-style native event.
 */
export function useNativeChange<T extends HTMLInputElement>(
    listener: (value: string) => void,
): RefObject<T | null> {
    const element = useRef<T>(null);
    const latest = useRef(listener);
    latest.current = listener;
    useEffect(() => {
        const input = element.current;
        if (!input) return;
        const handle = (): void => latest.current(input.value);
        input.addEventListener('change', handle);
        return () => input.removeEventListener('change', handle);
    }, []);
    return element;
}
