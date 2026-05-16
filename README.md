<div align="center">

# ✍️ Scribex Editor

**A modern, feature-rich WYSIWYG editor for React — built on TipTap and shadcn/ui.**

[![npm version](https://img.shields.io/npm/v/scribex-editor?color=blue&label=npm)](https://www.npmjs.com/package/scribex-editor)
[![npm downloads](https://img.shields.io/npm/dm/scribex-editor?color=green)](https://www.npmjs.com/package/scribex-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-%3E%3D18-61dafb?logo=react)](https://reactjs.org)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178c6)](https://www.typescriptlang.org)
[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-ea4aaa?logo=github-sponsors)](https://github.com/sponsors/mirzasaikatahmmed)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-☕-yellow?logo=buy-me-a-coffee)](https://buymeacoffee.com/saikat)

<br/>

> Drop-in rich text editor with 30+ toolbar components, dark mode, themes, slash commands, and AI-friendly content output.

</div>

---

## 🧩 What it includes

| Feature | Description |
|---------|-------------|
| ✍️ | **Rich text formatting** — bold, italic, underline, strike, code |
| 📋 | **Headings & lists** — H1–H6, bullet, ordered, task lists |
| 🖼️ | **Media** — images, videos, GIFs (Giphy), file attachments |
| 📐 | **Layout** — tables, multi-column, horizontal rules, blockquotes |
| 💻 | **Code** — syntax-highlighted code blocks, inline code, code view |
| 🧮 | **Advanced** — math equations (KaTeX), Mermaid diagrams, Excalidraw whiteboard |
| 🐦 | **Embeds** — Twitter/X, iframes, drawing tool |
| 🔍 | **Productivity** — slash commands, @mentions, search & replace, character count |
| 🎨 | **Theming** — dark/light mode, 8 color themes, custom border radius |
| 🌍 | **i18n** — English, Vietnamese, Simplified Chinese, Brazilian Portuguese, Hungarian, Finnish |
| 📄 | **Export/Import** — PDF export, Word export, Word import |

---

## 📦 Installation

### Requirements

- **React** v18 or higher
- **Node.js** v18 or higher

### Install

```bash
npm install scribex-editor
# or
pnpm add scribex-editor
# or
yarn add scribex-editor
```

### Import styles

Add both stylesheets to your app entry point:

```tsx
import 'scribex-editor/styles.css';
import 'reactjs-tiptap-editor/style.css';
```

---

## 🚀 Quick Start

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

> **Next.js users:** Add `"use client"` at the top of any file that imports `ScribexEditor` — it requires browser APIs.

---

## 🎨 Theme Customization

### Provider configuration

```tsx
<ScribexThemeProvider
  defaultConfig={{
    mode: 'dark',        // 'light' | 'dark'
    color: 'blue',       // see color options below
    borderRadius: 0.5,   // 0–1
    locale: 'en',        // see locale options below
  }}
>
  <ScribexEditor ... />
</ScribexThemeProvider>
```

### Available colors

| Value | Preview |
|-------|---------|
| `default` | Neutral gray |
| `red` | Red accent |
| `blue` | Blue accent |
| `green` | Green accent |
| `orange` | Orange accent |
| `rose` | Rose accent |
| `violet` | Violet accent |
| `yellow` | Yellow accent |

### Available locales

| Value | Language |
|-------|----------|
| `en` | English |
| `vi` | Vietnamese |
| `zh_CN` | Simplified Chinese |
| `pt_BR` | Brazilian Portuguese |
| `hu_HU` | Hungarian |
| `fi` | Finnish |

### Dynamic theme switching

```tsx
import { useScribexTheme } from 'scribex-editor';

function ThemeControls() {
  const { mode, setMode, color, setColor } = useScribexTheme();

  return (
    <div>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <select value={color} onChange={(e) => setColor(e.target.value as ThemeColor)}>
        {['default','red','blue','green','orange','rose','violet','yellow'].map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
```

---

## ⚙️ Props Reference

### `<ScribexEditor>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content |
| `onChange` | `(content: string) => void` | — | Fires on content change (debounced) |
| `onEditorReady` | `(editor: Editor) => void` | — | Fires when editor is initialized |
| `placeholder` | `string` | `"Press '/' for commands"` | Placeholder text |
| `characterLimit` | `number` | `10000` | Maximum character limit |
| `editable` | `boolean` | `true` | Enable or disable editing |
| `className` | `string` | — | Class on the container element |
| `toolbarClassName` | `string` | — | Class on the toolbar element |
| `contentClassName` | `string` | — | Class on the content area |
| `imageUpload` | `(file: File) => Promise<string>` | — | Custom image upload handler; return the URL |
| `videoUpload` | `(file: File) => Promise<string>` | — | Custom video upload handler; return the URL |
| `attachmentUpload` | `(file: File) => Promise<string>` | — | Custom attachment upload handler; return the URL |
| `giphyApiKey` | `string` | — | Giphy API key to enable GIF search |
| `mentionUsers` | `Array<{id, label, avatar?}>` | `[]` | Users available for @mentions |
| `showToolbar` | `boolean` | `true` | Show or hide the toolbar |
| `showBubbleMenus` | `boolean` | `true` | Show or hide bubble menus on selection |
| `showSlashCommands` | `boolean` | `true` | Enable `/` slash command palette |
| `showCharacterCount` | `boolean` | `true` | Show character count indicator |
| `debounceMs` | `number` | `300` | Debounce delay for `onChange` (ms) |

### `<ScribexThemeProvider>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultConfig` | `ScribexThemeConfig` | — | Initial theme settings |
| `children` | `ReactNode` | — | Required — wrap your editor here |

### `<EditorPreview>`

Read-only display of HTML content with the same styles as the editor.

```tsx
import { EditorPreview } from 'scribex-editor';

<EditorPreview content="<p>Hello <strong>World</strong></p>" />
```

---

## 🔌 Editor Instance

Access the TipTap editor instance directly via `onEditorReady`:

```tsx
import { ScribexEditor } from 'scribex-editor';
import type { Editor } from 'scribex-editor';

function App() {
  const handleEditorReady = (editor: Editor) => {
    editor.commands.insertContent('<p>Injected content</p>');
    editor.commands.focus();
  };

  return <ScribexEditor onEditorReady={handleEditorReady} />;
}
```

---

## 🛠️ Custom Toolbar

Build a fully custom toolbar by composing individual toolbar components:

```tsx
import {
  ScribexEditor,
  ScribexThemeProvider,
  RichTextBold,
  RichTextItalic,
  RichTextHeading,
  RichTextBulletList,
  RichTextOrderedList,
  RichTextLink,
  RichTextImage,
  RichTextUndo,
  RichTextRedo,
} from 'scribex-editor';

function App() {
  return (
    <ScribexThemeProvider>
      <ScribexEditor
        showToolbar={false}  // hide the built-in toolbar
        onChange={(c) => console.log(c)}
      />
    </ScribexThemeProvider>
  );
}
```

### All available toolbar components

| Component | Description |
|-----------|-------------|
| `RichTextBold` | Bold |
| `RichTextItalic` | Italic |
| `RichTextUnderline` | Underline |
| `RichTextStrike` | Strikethrough |
| `RichTextCode` | Inline code |
| `RichTextCodeBlock` | Code block |
| `RichTextLink` | Hyperlink |
| `RichTextImage` | Image |
| `RichTextVideo` | Video |
| `RichTextImageGif` | GIF (Giphy) |
| `RichTextBlockquote` | Blockquote |
| `RichTextBulletList` | Bullet list |
| `RichTextOrderedList` | Ordered list |
| `RichTextTaskList` | Task / checklist |
| `RichTextHeading` | Headings H1–H6 |
| `RichTextUndo` / `RichTextRedo` | History |
| `RichTextColor` | Text color |
| `RichTextHighlight` | Background highlight |
| `RichTextAlign` | Text alignment |
| `RichTextIndent` | Indent / outdent |
| `RichTextFontFamily` | Font family |
| `RichTextFontSize` | Font size |
| `RichTextLineHeight` | Line height |
| `RichTextTable` | Table |
| `RichTextColumn` | Multi-column layout |
| `RichTextEmoji` | Emoji picker |
| `RichTextKatex` | Math equations (KaTeX) |
| `RichTextMermaid` | Mermaid diagrams |
| `RichTextExcalidraw` | Excalidraw whiteboard |
| `RichTextDrawer` | Drawing tool |
| `RichTextIframe` | Iframe embed |
| `RichTextTwitter` | Twitter / X embed |
| `RichTextCallout` | Callout block |
| `RichTextAttachment` | File attachment |
| `RichTextExportPdf` | Export to PDF |
| `RichTextImportWord` | Import from Word |
| `RichTextExportWord` | Export to Word |
| `RichTextSearchAndReplace` | Search and replace |
| `RichTextClear` | Clear formatting |
| `RichTextMoreMark` | More marks menu |
| `RichTextTextDirection` | Text direction (RTL/LTR) |
| `RichTextCodeView` | HTML source view |
| `RichTextHorizontalRule` | Horizontal rule |

---

## 📁 Project Structure

```
scribex-editor/
├── src/
│   ├── components/
│   │   ├── ScribexEditor.tsx     # Main TipTap-based editor component
│   │   ├── RichTextEditor.tsx    # Quill-based alternative editor
│   │   ├── EditorPreview.tsx     # Read-only content preview
│   │   ├── ThemeProvider.tsx     # React Context for theming & locale
│   │   └── index.ts
│   ├── utils/
│   │   ├── cn.ts                 # Class name utility (clsx + tailwind-merge)
│   │   ├── helpers.ts            # debounce, createObjectURL, base64 helpers
│   │   └── index.ts
│   ├── emojis.ts                 # EMOJI_LIST data
│   └── index.ts                  # Public API barrel export
├── dist/                         # Compiled output (git-ignored)
├── package.json
├── tsup.config.ts
└── tsconfig.json
```

---

## 🛠️ Development

```bash
# Clone the repo
git clone https://github.com/mirzasaikatahmmed/scribex-editor.git
cd scribex-editor

# Install dependencies
npm install

# Build the package
npm run build

# Watch mode (rebuilds on save)
npm run dev
```

---

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full version history.

### v1.0.8 — Current
- 📝 Full open source documentation suite (CONTRIBUTING, CODE_OF_CONDUCT, REPOSITORY_RULES, CHANGELOG)
- ✨ Complete Next.js 15 + React 19 demo app with live theme controls and HTML output panel

### v1.0.7
- 🔒 Security: malware scanner script and GitHub Actions workflow added

### v1.0.5
- 🛠️ Tailwind config path fixes and `.gitignore` cleanup

### v1.0.4
- 📝 README documentation improvements

### v1.0.3
- 🚀 CI/CD publish workflow stabilised

### v1.0.2
- ✨ Added `RichTextEditor` (Quill-based) and `EditorPreview` components
- 🏗️ Repo flattened from pnpm monorepo to single npm package

### v1.0.0
- 🎉 Initial release — `ScribexEditor`, `ScribexThemeProvider`, 30+ toolbar components, 6 locales, full TipTap feature set

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

1. Fork the repository
2. Create your branch: `git checkout -b feat/your-feature`
3. Make changes, build, and test
4. Push and open a PR

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before participating. All contributors are listed in [CONTRIBUTORS.md](CONTRIBUTORS.md).

---

## 💛 Support

If Scribex Editor saves you time, consider supporting the project:

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20on%20GitHub-%E2%9D%A4-ea4aaa?logo=github-sponsors&style=for-the-badge)](https://github.com/sponsors/mirzasaikatahmmed)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-☕-yellow?logo=buy-me-a-coffee&style=for-the-badge)](https://buymeacoffee.com/saikat)

---

<div align="center">

Made with ❤️ by [Mirza Saikat Ahmmed](https://github.com/mirzasaikatahmmed)

</div>
