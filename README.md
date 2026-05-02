# scribex-editor

A modern, feature-rich WYSIWYG editor for React built on TipTap and shadcn/ui.

[![Build & Publish](https://github.com/mirzasaikatahmmed/scribex-editor/actions/workflows/publish.yml/badge.svg)](https://github.com/mirzasaikatahmmed/scribex-editor/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/scribex-editor.svg)](https://www.npmjs.com/package/scribex-editor)
[![npm downloads](https://img.shields.io/npm/dm/scribex-editor.svg)](https://www.npmjs.com/package/scribex-editor)
[![license](https://img.shields.io/npm/l/scribex-editor.svg)](https://github.com/mirzasaikatahmmed/scribex-editor/blob/master/LICENSE)

## Installation

```bash
npm install scribex-editor
# or
pnpm add scribex-editor
# or
yarn add scribex-editor
```

**Peer dependencies:** React >= 18

## Components

This package exports three editor components:

| Component | Engine | Use case |
|-----------|--------|----------|
| `ScribexEditor` | TipTap | Full-featured WYSIWYG editor |
| `RichTextEditor` | Quill | Lightweight alternative editor |
| `EditorPreview` | — | Read-only HTML preview |

---

## ScribexEditor

The primary editor with full toolbar, bubble menus, slash commands, and all extensions.

### Basic Usage

```tsx
import { ScribexEditor, ScribexThemeProvider } from 'scribex-editor';
import 'scribex-editor/styles.css';
import 'reactjs-tiptap-editor/style.css';

function App() {
  return (
    <ScribexThemeProvider>
      <ScribexEditor
        initialContent="<p>Start typing...</p>"
        onChange={(content) => console.log(content)}
      />
    </ScribexThemeProvider>
  );
}
```

### Full Configuration

```tsx
import { ScribexEditor, ScribexThemeProvider } from 'scribex-editor';

function App() {
  return (
    <ScribexThemeProvider
      defaultConfig={{
        mode: 'dark',
        color: 'blue',
        borderRadius: 0.5,
        locale: 'en',
      }}
    >
      <ScribexEditor
        initialContent="<p>Hello World!</p>"
        onChange={(content) => console.log(content)}
        placeholder="Type something..."
        characterLimit={5000}
        editable={true}
        showToolbar={true}
        showBubbleMenus={true}
        showSlashCommands={true}
        showCharacterCount={true}
        debounceMs={300}
        imageUpload={async (file) => {
          // Upload to your server and return URL
          return URL.createObjectURL(file);
        }}
        videoUpload={async (file) => {
          return URL.createObjectURL(file);
        }}
        attachmentUpload={async (file) => {
          return URL.createObjectURL(file);
        }}
        giphyApiKey="your-giphy-api-key"
        mentionUsers={[
          { id: '1', label: 'John Doe', avatar: { src: '/avatars/john.png' } },
          { id: '2', label: 'Jane Smith', avatar: { src: '/avatars/jane.png' } },
        ]}
      />
    </ScribexThemeProvider>
  );
}
```

### Access Editor Instance

```tsx
import { ScribexEditor, type Editor } from 'scribex-editor';

function App() {
  const handleEditorReady = (editor: Editor) => {
    editor.commands.insertContent('<p>Inserted content</p>');
  };

  return <ScribexEditor onEditorReady={handleEditorReady} />;
}
```

### ScribexEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content |
| `onChange` | `(content: string) => void` | — | Called when content changes (debounced) |
| `placeholder` | `string` | `"Press '/' for commands"` | Placeholder text |
| `characterLimit` | `number` | `10000` | Maximum character count |
| `editable` | `boolean` | `true` | Enable or disable editing |
| `className` | `string` | — | Class applied to the outer container |
| `toolbarClassName` | `string` | — | Class applied to the toolbar wrapper |
| `contentClassName` | `string` | — | Class applied to the content area |
| `onEditorReady` | `(editor: Editor) => void` | — | Fired once the editor is initialized |
| `imageUpload` | `(file: File) => Promise<string>` | `createObjectURL` | Custom image upload handler |
| `videoUpload` | `(file: File) => Promise<string>` | `createObjectURL` | Custom video upload handler |
| `attachmentUpload` | `(file: File) => Promise<string>` | `createBlobURL` | Custom attachment upload handler |
| `giphyApiKey` | `string` | — | Giphy API key — enables GIF picker when provided |
| `mentionUsers` | `Array<{id, label, avatar?}>` | `[]` | Users available for `@mention` |
| `showToolbar` | `boolean` | `true` | Show or hide the toolbar |
| `showBubbleMenus` | `boolean` | `true` | Show or hide contextual bubble menus |
| `showSlashCommands` | `boolean` | `true` | Enable `/` slash command menu |
| `showCharacterCount` | `boolean` | `true` | Show character and word counter |
| `debounceMs` | `number` | `300` | Debounce delay in ms for `onChange` |

---

## RichTextEditor

A lighter Quill-based editor for simpler use cases.

```tsx
import { RichTextEditor } from 'scribex-editor';

function App() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Start writing..."
      minHeight="400px"
    />
  );
}
```

### RichTextEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | HTML content (controlled) |
| `onChange` | `(value: string) => void` | — | Called on every change |
| `placeholder` | `string` | `'Start writing your content...'` | Placeholder text |
| `className` | `string` | `''` | Wrapper class name |
| `readOnly` | `boolean` | `false` | Disable editing |
| `theme` | `string` | `'snow'` | Quill theme |
| `minHeight` | `string` | `'400px'` | Minimum editor height |

---

## EditorPreview

Renders saved HTML content as a read-only preview.

```tsx
import { EditorPreview } from 'scribex-editor';

function PostView({ html }: { html: string }) {
  return <EditorPreview content={html} />;
}
```

### EditorPreview Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — | HTML string to render |
| `className` | `string` | `''` | Additional class name |
| `bare` | `boolean` | `false` | Remove padding and background |

---

## Theme & Locale

Wrap your app (or just the editor) in `ScribexThemeProvider` to control appearance and language.

```tsx
import { ScribexThemeProvider, useScribexTheme } from 'scribex-editor';

function ThemeControls() {
  const { mode, setMode, color, setColor, borderRadius, setBorderRadius, locale, setLocale } =
    useScribexTheme();

  return (
    <div>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <select value={color} onChange={(e) => setColor(e.target.value as any)}>
        <option value="default">Default</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="rose">Rose</option>
        <option value="violet">Violet</option>
        <option value="yellow">Yellow</option>
      </select>

      <select value={locale} onChange={(e) => setLocale(e.target.value as any)}>
        <option value="en">English</option>
        <option value="zh_CN">中文</option>
        <option value="vi">Tiếng Việt</option>
        <option value="pt_BR">Português</option>
        <option value="hu_HU">Magyar</option>
        <option value="fi">Suomi</option>
      </select>
    </div>
  );
}

function App() {
  return (
    <ScribexThemeProvider defaultConfig={{ mode: 'light', color: 'blue', borderRadius: 0.5, locale: 'en' }}>
      <ThemeControls />
      <ScribexEditor />
    </ScribexThemeProvider>
  );
}
```

### ScribexThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultConfig.mode` | `'light' \| 'dark'` | `'light'` | Initial color scheme |
| `defaultConfig.color` | `ThemeColor` | `'default'` | Accent color |
| `defaultConfig.borderRadius` | `number` | `0.5` | Border radius in `rem` |
| `defaultConfig.locale` | `Locale` | `'en'` | UI language |

**`ThemeColor`:** `'default' | 'red' | 'blue' | 'green' | 'orange' | 'rose' | 'violet' | 'yellow'`

**`Locale`:** `'en' | 'zh_CN' | 'vi' | 'pt_BR' | 'hu_HU' | 'fi'`

---

## Custom Toolbar

All toolbar button components are exported so you can compose a custom toolbar.

```tsx
import {
  RichTextProvider,
  useEditor,
  EditorContent,
  RichTextBold,
  RichTextItalic,
  RichTextUnderline,
  RichTextHeading,
  RichTextLink,
  RichTextImage,
  RichTextUndo,
  RichTextRedo,
} from 'scribex-editor';

function CustomToolbar() {
  return (
    <div className="toolbar">
      <RichTextUndo />
      <RichTextRedo />
      <RichTextHeading />
      <RichTextBold />
      <RichTextItalic />
      <RichTextUnderline />
      <RichTextLink />
      <RichTextImage />
    </div>
  );
}
```

All available toolbar exports: `RichTextBold`, `RichTextItalic`, `RichTextUnderline`, `RichTextStrike`, `RichTextCode`, `RichTextCodeBlock`, `RichTextCodeView`, `RichTextLink`, `RichTextImage`, `RichTextVideo`, `RichTextImageGif`, `RichTextBlockquote`, `RichTextBulletList`, `RichTextOrderedList`, `RichTextTaskList`, `RichTextHeading`, `RichTextUndo`, `RichTextRedo`, `RichTextColor`, `RichTextHighlight`, `RichTextAlign`, `RichTextIndent`, `RichTextFontFamily`, `RichTextFontSize`, `RichTextLineHeight`, `RichTextTable`, `RichTextColumn`, `RichTextEmoji`, `RichTextKatex`, `RichTextMermaid`, `RichTextExcalidraw`, `RichTextDrawer`, `RichTextIframe`, `RichTextTwitter`, `RichTextCallout`, `RichTextAttachment`, `RichTextExportPdf`, `RichTextImportWord`, `RichTextExportWord`, `RichTextSearchAndReplace`, `RichTextClear`, `RichTextMoreMark`, `RichTextTextDirection`, `RichTextHorizontalRule`

---

## Features

**Formatting**
- Bold, italic, underline, strikethrough
- Font family and font size
- Text color and highlight
- Superscript / subscript (via `MoreMark`)
- Text alignment and indentation
- Line height
- Text direction (LTR / RTL / auto)
- Clear formatting

**Structure**
- Headings H1–H6
- Bullet, ordered, and task lists
- Blockquotes and callout blocks
- Horizontal rules
- Multi-column layouts
- Tables

**Media & Embeds**
- Images with custom upload handler
- Videos with custom upload handler
- GIFs via Giphy integration
- Iframes
- Twitter / X embeds
- File attachments

**Advanced**
- Code blocks with syntax highlighting
- Raw HTML code view
- Math equations (KaTeX)
- Mermaid diagrams
- Excalidraw whiteboard
- Drawing tool

**Productivity**
- Slash commands (`/`)
- @mentions
- Emoji picker
- Search and replace
- Undo / redo history

**Import / Export**
- Import from Word (`.docx`)
- Export to Word (`.docx`)
- Export to PDF

**Internationalization**
- 6 built-in locales: English, Chinese, Vietnamese, Portuguese, Hungarian, Finnish

**Theming**
- Light and dark mode
- 8 accent color presets
- Configurable border radius

---

## Utilities

```ts
import { cn, debounce, createObjectURL, createBlobURL, convertBase64ToBlob } from 'scribex-editor';
```

| Export | Description |
|--------|-------------|
| `cn` | `clsx` + `tailwind-merge` class name helper |
| `debounce` | Generic debounce utility |
| `createObjectURL` | Wraps `URL.createObjectURL` for file uploads |
| `createBlobURL` | Creates a blob URL from base64 data |
| `convertBase64ToBlob` | Converts a base64 string to a `Blob` |

---

## License

MIT © [Mirza Saikat Ahmmed](https://saikat.com.bd)
