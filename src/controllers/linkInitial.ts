import type { LinkValue, ReadonlyRef } from '../types';
import { closestElement } from '../utils/dom';

export function createLinkInitial(
    root: ReadonlyRef<HTMLElement | null>,
    savedRange: ReadonlyRef<Range | null>,
) {
    function getSelectedAnchor(): HTMLAnchorElement | null {
        return root.value ? closestElement(root.value, 'a', savedRange.value) : null;
    }
    function getInitial(): LinkValue {
        const anchor = getSelectedAnchor();
        const selectedText = savedRange.value?.toString() ?? '';
        return {
            url: anchor?.getAttribute('href') ?? '',
            text: anchor?.textContent ?? selectedText,
            title: anchor?.title ?? '',
            target: anchor?.target === '_blank' ? '_blank' : '_self',
        };
    }
    return { getInitial, getSelectedAnchor };
}
