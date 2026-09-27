import type { WordCountData } from '../../types';
import { BaseDialog } from './BaseDialog';

interface WordCountDialogProps {
    counts: WordCountData;
    onClose: () => void;
}

export function WordCountDialog({ counts, onClose }: WordCountDialogProps) {
    return (
        <BaseDialog
            title="Word Count"
            footerDivider={false}
            onClose={onClose}
            footer={
                <button
                    type="button"
                    className="erag-button erag-button--primary"
                    onClick={onClose}
                >
                    Close
                </button>
            }
        >
            <table className="erag-word-count__table">
                <thead>
                    <tr>
                        <th className="erag-word-count__heading erag-word-count__heading--label">
                            Count
                        </th>
                        <th className="erag-word-count__heading">Document</th>
                        <th className="erag-word-count__heading">Selection</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="erag-word-count__row">
                        <th className="erag-word-count__label">Words</th>
                        <td className="erag-word-count__value">{counts.document.words}</td>
                        <td className="erag-word-count__value">{counts.selection.words}</td>
                    </tr>
                    <tr className="erag-word-count__row">
                        <th className="erag-word-count__label">Characters (no spaces)</th>
                        <td className="erag-word-count__value">
                            {counts.document.charactersWithoutSpaces}
                        </td>
                        <td className="erag-word-count__value">
                            {counts.selection.charactersWithoutSpaces}
                        </td>
                    </tr>
                    <tr className="erag-word-count__row">
                        <th className="erag-word-count__label">Characters</th>
                        <td className="erag-word-count__value">{counts.document.characters}</td>
                        <td className="erag-word-count__value">{counts.selection.characters}</td>
                    </tr>
                </tbody>
            </table>
        </BaseDialog>
    );
}
