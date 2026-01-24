# scribex-editor

A modern, feature-rich WYSIWYG editor for React built on TipTap and shadcn/ui.

## Installation

```bash
npm install scribex-editor
# or
pnpm add scribex-editor
# or
yarn add scribex-editor
```

## Usage

### Basic Usage

```tsx
import { ScribexEditor, ScribexThemeProvider } from 'scribex-editor';
import 'scribex-editor/styles.css';
import 'reactjs-tiptap-editor/style.css';

function App() {
  const handleChange = (content: string) => {
    console.log('Content changed:', content);
  };

  return (
    <ScribexThemeProvider>
      <ScribexEditor
        initialContent="<p>Start typing...</p>"
        onChange={handleChange}
      />
    </ScribexThemeProvider>
  );
}
```

### With Custom Configuration

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
        imageUpload={async (file) => {
          // Upload to your server and return URL
          return URL.createObjectURL(file);
        }}
        videoUpload={async (file) => {
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

### Theme Customization

```tsx
import { useScribexTheme, ScribexThemeProvider } from 'scribex-editor';

function ThemeToggle() {
  const { mode, setMode, color, setColor } = useScribexTheme();

  return (
    <div>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="default">Default</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
      </select>
    </div>
  );
}
```

### Access Editor Instance

```tsx
import { ScribexEditor, Editor } from 'scribex-editor';

function App() {
  const handleEditorReady = (editor: Editor) => {
    // Access editor instance
    console.log('Editor is ready:', editor);

    // Programmatically insert content
    editor.commands.insertContent('<p>Inserted content</p>');
  };

  return (
    <ScribexEditor
      onEditorReady={handleEditorReady}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content |
| `onChange` | `(content: string) => void` | - | Called when content changes |
| `placeholder` | `string` | `"Press '/' for commands"` | Placeholder text |
| `characterLimit` | `number` | `10000` | Maximum character count |
| `editable` | `boolean` | `true` | Enable/disable editing |
| `className` | `string` | - | Container class name |
| `toolbarClassName` | `string` | - | Toolbar class name |
| `contentClassName` | `string` | - | Content area class name |
| `onEditorReady` | `(editor: Editor) => void` | - | Called when editor is initialized |
| `imageUpload` | `(file: File) => Promise<string>` | - | Custom image upload handler |
| `videoUpload` | `(file: File) => Promise<string>` | - | Custom video upload handler |
| `attachmentUpload` | `(file: File) => Promise<string>` | - | Custom attachment upload handler |
| `giphyApiKey` | `string` | - | Giphy API key for GIF support |
| `mentionUsers` | `Array<{id, label, avatar}>` | `[]` | Users for @mentions |
| `showToolbar` | `boolean` | `true` | Show/hide toolbar |
| `showBubbleMenus` | `boolean` | `true` | Show/hide bubble menus |
| `showSlashCommands` | `boolean` | `true` | Enable slash commands |
| `showCharacterCount` | `boolean` | `true` | Show character counter |
| `debounceMs` | `number` | `300` | Debounce delay for onChange |

## Features

- Rich text formatting (bold, italic, underline, strike)
- Headings (H1-H6)
- Lists (bullet, ordered, task lists)
- Code blocks with syntax highlighting
- Tables
- Images, videos, GIFs
- Links
- Blockquotes
- Horizontal rules
- Multi-column layouts
- Emoji support
- @mentions
- Slash commands
- Math equations (KaTeX)
- Mermaid diagrams
- Excalidraw whiteboard
- Drawing tool
- Twitter embeds
- File attachments
- Export to PDF/Word
- Import from Word
- Search and replace
- Dark mode support
- Multiple color themes
- Internationalization (6+ languages)

## License

MIT
