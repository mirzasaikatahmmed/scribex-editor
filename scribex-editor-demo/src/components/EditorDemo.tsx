'use client';

import { useState } from 'react';
import {
  ScribexEditor,
  ScribexThemeProvider,
  useScribexTheme,
  type Editor,
  type ThemeColor,
  type ThemeMode,
  type Locale,
} from 'scribex-editor';

// Import required styles
import 'easydrawer/styles.css';
import 'katex/dist/katex.min.css';
import 'prism-code-editor-lightweight/layout.css';
import 'prism-code-editor-lightweight/themes/github-dark.css';
import 'reactjs-tiptap-editor/style.css';

const MOCK_USERS = [
  {
    id: '0',
    label: 'John Doe',
    avatar: {
      src: 'https://i.pravatar.cc/150?u=john',
    },
  },
  {
    id: '1',
    label: 'Jane Smith',
    avatar: {
      src: 'https://i.pravatar.cc/150?u=jane',
    },
  },
  {
    id: '2',
    label: 'Bob Wilson',
    avatar: {
      src: 'https://i.pravatar.cc/150?u=bob',
    },
  },
];

const DEFAULT_CONTENT = `
<h1 style="text-align: center">Scribex Editor Demo</h1>
<p style="text-align: center">A modern WYSIWYG rich text editor built on TipTap and shadcn/ui</p>
<p></p>
<h2>Features</h2>
<ul>
  <li><p>Rich text formatting (bold, italic, underline, strike)</p></li>
  <li><p>Headings, lists, and blockquotes</p></li>
  <li><p>Code blocks with syntax highlighting</p></li>
  <li><p>Tables and multi-column layouts</p></li>
  <li><p>Image, video, and GIF support</p></li>
  <li><p>Emoji support (type : to trigger)</p></li>
  <li><p>Slash commands (type / for menu)</p></li>
  <li><p>Math equations with KaTeX</p></li>
  <li><p>Mermaid diagrams</p></li>
  <li><p>And much more!</p></li>
</ul>
<p></p>
<h2>Try it out!</h2>
<p>Start typing or use slash commands to explore all features.</p>
`;

function ThemeControls() {
  const { mode, setMode, color, setColor, locale, setLocale, borderRadius, setBorderRadius } =
    useScribexTheme();

  const colors: ThemeColor[] = [
    'default',
    'red',
    'blue',
    'green',
    'orange',
    'rose',
    'violet',
    'yellow',
  ];

  const locales: { value: Locale; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'zh_CN', label: 'Chinese' },
    { value: 'pt_BR', label: 'Portuguese' },
    { value: 'hu_HU', label: 'Hungarian' },
    { value: 'fi', label: 'Finnish' },
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 border-b border-border bg-muted/50">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Theme:</label>
        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-accent transition-colors"
        >
          {mode === 'light' ? 'Light' : 'Dark'}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Color:</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value as ThemeColor)}
          className="px-3 py-1.5 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Radius:</label>
        <select
          value={borderRadius}
          onChange={(e) => setBorderRadius(Number(e.target.value))}
          className="px-3 py-1.5 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value={0}>0</option>
          <option value={0.25}>0.25</option>
          <option value={0.5}>0.5</option>
          <option value={0.75}>0.75</option>
          <option value={1}>1</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Language:</label>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="px-3 py-1.5 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {locales.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function EditorWrapper() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [editable, setEditable] = useState(true);

  const handleEditorReady = (editor: Editor) => {
    console.log('Editor is ready!', editor);
    // Make editor available globally for debugging
    if (typeof window !== 'undefined') {
      (window as any).editor = editor;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Scribex Editor</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEditable(!editable)}
                className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-accent transition-colors"
              >
                {editable ? 'Set Readonly' : 'Set Editable'}
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <ThemeControls />
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <ScribexEditor
          initialContent={DEFAULT_CONTENT}
          onChange={(newContent) => setContent(newContent)}
          onEditorReady={handleEditorReady}
          editable={editable}
          characterLimit={10000}
          mentionUsers={MOCK_USERS}
          showToolbar={true}
          showBubbleMenus={true}
          showSlashCommands={true}
          showCharacterCount={true}
          className="shadow-lg"
        />

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">HTML Output:</h3>
          <textarea
            className="w-full h-48 p-4 text-sm font-mono border border-border rounded-lg bg-muted resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            readOnly
            value={content}
          />
        </div>
      </main>

      <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        <p>Built with scribex-editor, TipTap, and shadcn/ui</p>
      </footer>
    </div>
  );
}

export default function EditorDemo() {
  return (
    <ScribexThemeProvider
      defaultConfig={{
        mode: 'light',
        color: 'default',
        borderRadius: 0.5,
        locale: 'en',
      }}
    >
      <EditorWrapper />
    </ScribexThemeProvider>
  );
}
