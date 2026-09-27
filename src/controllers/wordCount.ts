import type { ReadonlyRef, WordCountData } from '../types';
import { getDetailedTextCounts } from '../utils/html';

export function getWordCountData(
    root: ReadonlyRef<HTMLElement | null>,
    selectedRange: ReadonlyRef<Range | null>,
): WordCountData {
    return {
        document: getDetailedTextCounts(root.value?.innerText ?? ''),
        selection: getDetailedTextCounts(selectedRange.value?.toString() ?? ''),
    };
}
