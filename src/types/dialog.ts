export type EditorDialogName =
    | 'link'
    | 'media'
    | 'table'
    | 'special-character'
    | 'emoji'
    | 'source'
    | 'preview'
    | 'find-replace'
    | 'shortcuts'
    | 'about'
    | 'word-count'
    | 'table-properties'
    | 'cell-properties'
    | 'templates';
export interface LinkValue {
    url: string;
    text: string;
    title: string;
    target: '_self' | '_blank';
}
export interface MediaValue {
    type: 'video' | 'audio' | 'iframe';
    src: string;
    width: string;
    height: string;
    poster: string;
}

export interface TablePropertiesValue {
    width: string;
    cellPadding: string;
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
    backgroundColor: string;
    alignment: 'left' | 'center' | 'right';
}

export interface CellPropertiesValue {
    target: 'cell' | 'first-row';
    cellType: 'td' | 'th';
    scope: '' | 'row' | 'col';
    horizontalAlign: '' | 'left' | 'center' | 'right';
    verticalAlign: '' | 'top' | 'middle' | 'bottom';
}

export interface EditorDialogsProps {
    dialog: EditorDialogName | null;
    dialogMode: 'forecolor' | 'backcolor' | null;
    config: ResolvedEditorInit;
    linkInitial: LinkValue;
    html: string;
    previewHtml: string;
    sourceCodeEditable: boolean;
    root: HTMLElement | null;
    wordCountData: WordCountData;
    cellPropertiesInitial: CellPropertiesValue;
    tablePropertiesInitial: TablePropertiesValue;
}

export interface EditorDialogsEvents {
    onClose: () => void;
    onSaveLink: (value: LinkValue) => void;
    onUnlink: () => void;
    onSaveMedia: (value: MediaValue) => void;
    onSaveTable: (rows: number, columns: number) => void;
    onSelectCharacter: (value: string) => void;
    onSaveSource: (value: string) => void;
    onChanged: () => void;
    onSaveTableProperties: (values: Record<string, string>) => void;
    onSaveCellProperties: (values: CellPropertiesValue) => void;
    onSelectColor: (color: string) => void;
    onInsertTemplate: (item: EditorTemplateItem) => void;
}
import type { ResolvedEditorInit } from './config';
import type { WordCountData } from './count';
import type { EditorTemplateItem } from './template';
