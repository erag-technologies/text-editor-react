import type { SyntheticEvent } from 'react';

export function preventDefault(event: SyntheticEvent): void {
    event.preventDefault();
}

export function classNames(...values: (string | false | null | undefined)[]): string {
    return values.filter(Boolean).join(' ');
}

/**
 * Moves focus between menu buttons for arrow, Home, and End keys.
 */
export function focusMenuButton(
    container: HTMLElement | null,
    key: string,
    columns = 1,
    horizontal = false,
): void {
    const buttons = [...(container?.querySelectorAll<HTMLButtonElement>('button') ?? [])];
    if (!buttons.length) return;
    const current = Math.max(0, buttons.indexOf(document.activeElement as HTMLButtonElement));
    const offsets: Record<string, number> = {
        ArrowDown: columns,
        ArrowUp: -columns,
        ...(horizontal ? { ArrowRight: 1, ArrowLeft: -1 } : {}),
    };
    const next =
        key === 'Home'
            ? 0
            : key === 'End'
              ? buttons.length - 1
              : (current + (offsets[key] ?? 0) + buttons.length) % buttons.length;
    buttons[next]?.focus();
}
