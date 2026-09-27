import { Fragment } from 'react';
import { EDITOR_VERSION } from '../../constants/packageInfo';
import { EditorIcon } from '../icons/EditorIcon';
import { BaseDialog } from './BaseDialog';

interface InfoDialogProps {
    kind: 'shortcuts' | 'about';
    onClose: () => void;
}

const SHORTCUTS: [string, string][] = [
    ['Bold', 'Ctrl/⌘ B'],
    ['Italic', 'Ctrl/⌘ I'],
    ['Underline', 'Ctrl/⌘ U'],
    ['Undo', 'Ctrl/⌘ Z'],
    ['Redo', 'Ctrl/⌘ Shift Z'],
    ['Link', 'Ctrl/⌘ K'],
    ['Find', 'Ctrl/⌘ F'],
    ['Help', 'Alt 0'],
];

export function InfoDialog({ kind, onClose }: InfoDialogProps) {
    return (
        <BaseDialog
            title={kind === 'about' ? 'About' : 'Shortcuts'}
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
            {kind === 'about' ? (
                <div className="erag-info">
                    <div className="erag-info__product">
                        <h3 className="erag-info__heading">@erag/text-editor-react</h3>
                        <span className="erag-info__version">v{EDITOR_VERSION}</span>
                    </div>
                    <p className="erag-info__description">
                        A dependency-free React rich text editor built with native browser APIs,
                        flexible configuration, and full TypeScript support.
                    </p>
                    <p className="erag-info__author">Created and maintained by Er Amit Gupta.</p>
                    <div className="erag-info__links">
                        <a
                            className="erag-info__link"
                            href="https://github.com/erag-technologies/text-editor-react"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <EditorIcon
                                className="erag-info__link-icon"
                                name="github"
                                size={20}
                            />
                            <span className="erag-info__link-content">
                                <strong className="erag-info__link-label">GitHub repository</strong>
                                <span className="erag-info__link-url">
                                    github.com/erag-technologies/text-editor-react
                                </span>
                            </span>
                        </a>
                        <a
                            className="erag-info__link"
                            href="https://erag.in/text-editor-react"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <EditorIcon
                                className="erag-info__link-icon"
                                name="documentation"
                                size={20}
                            />
                            <span className="erag-info__link-content">
                                <strong className="erag-info__link-label">Documentation</strong>
                                <span className="erag-info__link-url">
                                    erag.in/text-editor-react
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            ) : (
                <dl className="erag-shortcuts">
                    {SHORTCUTS.map(([label, keys]) => (
                        <Fragment key={label}>
                            <dt>{label}</dt>
                            <dd>{keys}</dd>
                        </Fragment>
                    ))}
                </dl>
            )}
        </BaseDialog>
    );
}
