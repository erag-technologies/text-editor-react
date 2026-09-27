import './styles/editor.css';
import './styles/toolbar.css';
import './styles/menus.css';
import './styles/dialogs.css';
import './styles/mentions.css';
import './styles/image-resize.css';
import './styles/image-upload.css';
import './styles/merge-tags.css';
import './styles/templates.css';
import './styles/theme.css';

export { Editor } from './components/Editor';
export { defaultEditorConfig } from './config/defaultConfig';
export { sanitizeHtml } from './utils/sanitizer';
export type {
    EditorEvents,
    EditorInit,
    EditorInstance,
    EditorMenuName,
    EditorPluginName,
    EditorProps,
    EditorSlots,
    EditorToolbarGroup,
    ImageBlobInfo,
    ImageDeleteInfo,
    ImagesDeleteHandler,
    ImagesUploadHandler,
    MentionConfig,
    MentionErrorSlotProps,
    MentionItem,
    MentionItemSlotProps,
    MentionQuerySlotProps,
    MentionRemoveEvent,
    MentionSearchEvent,
    MentionSelectEvent,
    MergeTagConfig,
    MergeTagItem,
    MergeTagRemoveEvent,
    MergeTagSelectEvent,
    EditorTemplateItem,
    EditorTemplatesConfig,
    TemplateInsertEvent,
} from './types';
