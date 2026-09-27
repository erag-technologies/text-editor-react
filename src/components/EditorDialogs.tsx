import type { EditorDialogsEvents, EditorDialogsProps } from '../types';
import { CellPropertiesDialog } from './dialogs/CellPropertiesDialog';
import { ColorDialog } from './dialogs/ColorDialog';
import { EmojiDialog } from './dialogs/EmojiDialog';
import { FindReplaceDialog } from './dialogs/FindReplaceDialog';
import { InfoDialog } from './dialogs/InfoDialog';
import { LinkDialog } from './dialogs/LinkDialog';
import { MediaDialog } from './dialogs/MediaDialog';
import { PreviewDialog } from './dialogs/PreviewDialog';
import { SourceDialog } from './dialogs/SourceDialog';
import { SpecialCharacterDialog } from './dialogs/SpecialCharacterDialog';
import { TableDialog } from './dialogs/TableDialog';
import { TablePropertiesDialog } from './dialogs/TablePropertiesDialog';
import { TemplateDialog } from './dialogs/TemplateDialog';
import { WordCountDialog } from './dialogs/WordCountDialog';

export function EditorDialogs(props: EditorDialogsProps & EditorDialogsEvents) {
    const { dialog, dialogMode, config, root, onClose } = props;
    return (
        <>
            {dialog === 'link' && (
                <LinkDialog
                    initial={props.linkInitial}
                    allowRelative={config.relativeUrls}
                    canUnlink={Boolean(props.linkInitial.url)}
                    onClose={onClose}
                    onSave={props.onSaveLink}
                    onUnlink={props.onUnlink}
                />
            )}
            {dialog === 'media' && (
                <MediaDialog
                    allowRelative={config.relativeUrls}
                    onClose={onClose}
                    onSave={props.onSaveMedia}
                />
            )}
            {dialog === 'table' && (
                <TableDialog
                    size={config.tableGridSize}
                    onClose={onClose}
                    onSave={props.onSaveTable}
                />
            )}
            {dialog === 'special-character' && (
                <SpecialCharacterDialog
                    onClose={onClose}
                    onSelect={props.onSelectCharacter}
                />
            )}
            {dialog === 'emoji' && (
                <EmojiDialog
                    onClose={onClose}
                    onSelect={props.onSelectCharacter}
                />
            )}
            {dialog === 'source' && (
                <SourceDialog
                    html={props.html}
                    editable={props.sourceCodeEditable}
                    onClose={onClose}
                    onSave={props.onSaveSource}
                />
            )}
            {dialog === 'preview' && (
                <PreviewDialog
                    html={props.previewHtml}
                    contentStyle={config.contentStyle}
                    onClose={onClose}
                />
            )}
            {dialog === 'find-replace' && root && (
                <FindReplaceDialog
                    root={root}
                    onClose={onClose}
                    onChanged={props.onChanged}
                />
            )}
            {(dialog === 'shortcuts' || dialog === 'about') && (
                <InfoDialog
                    kind={dialog}
                    onClose={onClose}
                />
            )}
            {dialog === 'word-count' && (
                <WordCountDialog
                    counts={props.wordCountData}
                    onClose={onClose}
                />
            )}
            {dialog === 'table-properties' && (
                <TablePropertiesDialog
                    initial={props.tablePropertiesInitial}
                    onClose={onClose}
                    onSave={props.onSaveTableProperties}
                />
            )}
            {dialog === 'cell-properties' && (
                <CellPropertiesDialog
                    initial={props.cellPropertiesInitial}
                    onClose={onClose}
                    onSave={props.onSaveCellProperties}
                />
            )}
            {dialog === 'templates' && (
                <TemplateDialog
                    templates={config.templates}
                    config={config}
                    onClose={onClose}
                    onInsert={props.onInsertTemplate}
                />
            )}
            {dialogMode && (
                <ColorDialog
                    mode={dialogMode}
                    colors={
                        dialogMode === 'forecolor' ? config.textColors : config.backgroundColors
                    }
                    onClose={onClose}
                    onSelect={props.onSelectColor}
                />
            )}
        </>
    );
}
