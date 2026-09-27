# @erag/text-editor-react

A dependency-free React rich text editor built with native browser APIs, flexible configuration, and full TypeScript support. It provides a responsive editing experience for applications that need rich formatting, structured content, dynamic data, media handling, and accessible controls without relying on an external editor framework.

## Key features

- 🪶 **Dependency-free runtime** — React and React DOM are the only peer dependencies.
- ✍️ **Rich text formatting** — paragraphs, headings, fonts, font sizes, line height, colors, alignment, indentation, blockquotes, inline code, superscript, and subscript.
- 📋 **Lists and structured content** — bulleted lists, numbered lists, nested lists, configurable list styles, and keyboard-friendly indentation.
- ↩️ **Editing history** — undo, redo, selection-aware formatting, clear formatting, cut, copy, paste, and plain-text paste.
- 🧭 **Responsive interface** — configurable menubar, adaptive toolbar overflow, nested menus, floating popovers, dialogs, and status bar.
- 🔗 **Links and anchors** — insert, edit, validate, unlink, target selection, safe URL handling, and anchor insertion.
- 🖼️ **Image workflow** — file selection, drag-and-drop, pasted images, custom uploads, URL uploads, progress, validation, resizing, alignment, and server-removal callbacks.
- 🎬 **Media support** — video, audio, sanitized iframe embeds, poster images, width, and height controls.
- 📊 **Table editing** — grid insertion, row and column controls, merge and split cells, headers, cell properties, alignment, borders, colors, and keyboard navigation.
- 👥 **Mentions** — static or asynchronous `@mention` suggestions, avatars, descriptions, keyboard navigation, insertion, removal events, and custom render props.
- 🧩 **Merge tags** — grouped dynamic tags, caret suggestions, sidebar browsing, keyboard navigation, selection events, and consumer-provided values.
- 📄 **Reusable templates** — grouped templates supplied through configuration and inserted at the current editor selection.
- 😊 **Content tools** — emojis, searchable special characters, horizontal rules, anchors, and configurable date and time formats.
- 🔍 **Document tools** — find and replace, word and character counts, source-code editing, preview, fullscreen, visual aids, show blocks, and editor-only printing.
- ⚙️ **Flexible configuration** — options for toolbars, menus, plugins, formats, colors, dimensions, uploads, content styles, sanitization, URLs, mentions, merge tags, and templates.
- 🔌 **Complete React API** — controlled `value` / `onChange`, uncontrolled `defaultValue`, typed props, event callbacks, render props, a typed `ref` instance, runtime configuration updates, disabled mode, and read-only mode.
- ⌨️ **Keyboard support** — editor shortcuts, accessible menu navigation, dialog focus management, table navigation, and suggestion controls.
- ♿ **Accessible controls** — ARIA labels, roles, live regions, focus restoration, active states, disabled states, and screen-reader-friendly interactions.
- 🧼 **Paste cleanup** — sanitized formatted HTML, plain-text paste, pasted-image upload, unsafe attribute removal, and practical Word and Google Docs normalization.
- 🛡️ **Safer HTML handling** — internal allowlist sanitization, safe URL checks, restricted embed handling, script removal, unsafe event removal, and SSR-safe rendering for Next.js and Inertia.
- 🎨 **Application-safe styling** — responsive light/dark editor UI, package-scoped selectors, consistent BEM naming, and prefixed `erag-` classes and CSS variables.
- 📦 **Publishing-ready package** — ESM bundle, generated TypeScript declarations, tree-shakable exports, stylesheet export, React 18 and 19 support, and Node.js 24 build support.

## Quick start

```bash
npm install @erag/text-editor-react
```

```tsx
import { useState } from 'react';
import { Editor } from '@erag/text-editor-react';
import '@erag/text-editor-react/style.css';

export default function Page() {
    const [content, setContent] = useState('<p>Hello World!</p>');

    return (
        <Editor
            value={content}
            onChange={setContent}
            init={{ placeholder: 'Start typing...' }}
        />
    );
}
```

## Documentation

Complete installation, configuration, examples, feature guides, and API documentation:

**[https://erag.in/text-editor-react/index.html](https://erag.in/text-editor-react/index.html)**

## ⭐ Support

If you like this package, give it a [GitHub star](https://github.com/erag-technologies/text-editor-react).
