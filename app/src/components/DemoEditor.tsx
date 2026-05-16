'use client';

import { useState } from 'react';
import {
  ScribexEditor,
  ScribexThemeProvider,
  useScribexTheme,
  type ThemeColor,
  type ThemeMode,
  type Locale,
} from 'scribex-editor';
import 'scribex-editor/styles.css';
import 'reactjs-tiptap-editor/style.css';

const INITIAL_CONTENT = `<h1>Welcome to Scribex Editor ✍️</h1>
<p>This is a <strong>full-featured WYSIWYG editor</strong> built on <em>TipTap</em> and <em>shadcn/ui</em>. Try the toolbar above or type <code>/</code> to open the slash command menu.</p>
<h2>Key Features</h2>
<ul>
  <li>Rich text formatting — bold, italic, underline, strike</li>
  <li>Headings H1–H6, bullet &amp; ordered lists, task lists</li>
  <li>Tables, multi-column layouts, blockquotes</li>
  <li>Code blocks with syntax highlighting</li>
  <li>Images, videos, GIFs, file attachments</li>
  <li>Math equations (KaTeX) and Mermaid diagrams</li>
  <li>Excalidraw whiteboard and drawing tool</li>
  <li>@mentions, slash commands, search &amp; replace</li>
  <li>Export to PDF / Word, import from Word</li>
</ul>
<blockquote><p>Type <strong>/</strong> anywhere to open the slash command palette, or select text to see the bubble menu.</p></blockquote>`;

const THEME_COLORS: { value: ThemeColor; label: string; dot: string }[] = [
  { value: 'default', label: 'Default', dot: 'bg-zinc-800' },
  { value: 'red', label: 'Red', dot: 'bg-red-500' },
  { value: 'blue', label: 'Blue', dot: 'bg-blue-500' },
  { value: 'green', label: 'Green', dot: 'bg-green-500' },
  { value: 'orange', label: 'Orange', dot: 'bg-orange-500' },
  { value: 'rose', label: 'Rose', dot: 'bg-rose-500' },
  { value: 'violet', label: 'Violet', dot: 'bg-violet-500' },
  { value: 'yellow', label: 'Yellow', dot: 'bg-yellow-400' },
];

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'zh_CN', label: '简体中文' },
  { value: 'pt_BR', label: 'Português (BR)' },
  { value: 'hu_HU', label: 'Magyar' },
  { value: 'fi', label: 'Suomi' },
];

function ThemeBar() {
  const { mode, setMode, color, setColor, locale, setLocale, borderRadius, setBorderRadius } =
    useScribexTheme();

  return (
    <div className="flex flex-wrap items-center gap-4 px-4 py-2 border-b border-border bg-muted/30 text-sm">
      {/* Mode toggle */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground font-medium">Mode</span>
        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-border bg-background hover:bg-accent transition-colors"
        >
          {mode === 'light' ? '☀️' : '🌙'} {mode === 'light' ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Color picker */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground font-medium">Color</span>
        <div className="flex gap-1">
          {THEME_COLORS.map((c) => (
            <button
              key={c.value}
              title={c.label}
              onClick={() => setColor(c.value)}
              className={`w-5 h-5 rounded-full border-2 transition-transform ${c.dot} ${
                color === c.value
                  ? 'border-foreground scale-110'
                  : 'border-transparent hover:scale-105'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Locale selector */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground font-medium">Locale</span>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="px-2 py-1 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {LOCALES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* Border radius */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground font-medium">Radius</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={borderRadius}
          onChange={(e) => setBorderRadius(parseFloat(e.target.value))}
          className="w-20 accent-foreground"
        />
        <span className="text-muted-foreground w-8">{borderRadius}rem</span>
      </div>
    </div>
  );
}

function OutputPanel({ content }: { content: string }) {
  const [tab, setTab] = useState<'preview' | 'html'>('preview');

  return (
    <div className="flex flex-col h-full border border-border rounded-lg overflow-hidden bg-card">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-muted/30">
        <span className="text-xs font-semibold text-muted-foreground mr-2">OUTPUT</span>
        <button
          onClick={() => setTab('preview')}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            tab === 'preview'
              ? 'bg-background border border-border text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setTab('html')}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            tab === 'html'
              ? 'bg-background border border-border text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          HTML
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {tab === 'preview' ? (
          <div
            className="prose prose-sm max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-all font-mono leading-relaxed">
            {content
              ? content
                  .replace(/></g, '>\n<')
                  .split('\n')
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .join('\n')
              : '// Start typing to see HTML output...'}
          </pre>
        )}
      </div>
    </div>
  );
}

export default function DemoEditor() {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [showOutput, setShowOutput] = useState(true);

  return (
    <ScribexThemeProvider defaultConfig={{ mode: 'light', color: 'default', locale: 'en' }}>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-foreground">✍️ Scribex</span>
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              Demo
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <button
              onClick={() => setShowOutput((v) => !v)}
              className="px-3 py-1.5 rounded-md border border-border bg-background hover:bg-accent transition-colors text-foreground"
            >
              {showOutput ? 'Hide' : 'Show'} Output
            </button>
            <a
              href="https://github.com/mirzasaikatahmmed/scribex-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md border border-border bg-background hover:bg-accent transition-colors text-foreground"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.npmjs.com/package/scribex-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              npm ↗
            </a>
          </div>
        </header>

        {/* Theme controls bar */}
        <ThemeBar />

        {/* Main content */}
        <main className="flex-1 flex gap-4 p-4 overflow-hidden min-h-0">
          {/* Editor panel */}
          <div className={showOutput ? 'flex-1 min-w-0' : 'w-full'}>
            <ScribexEditor
              initialContent={INITIAL_CONTENT}
              onChange={setContent}
              placeholder="Press '/' for commands or start typing..."
              characterLimit={10000}
              mentionUsers={[
                { id: '1', label: 'Alice Johnson', avatar: { src: '' } },
                { id: '2', label: 'Bob Smith', avatar: { src: '' } },
                { id: '3', label: 'Carol White', avatar: { src: '' } },
                { id: '4', label: 'David Brown', avatar: { src: '' } },
              ]}
            />
          </div>

          {/* Output panel */}
          {showOutput && (
            <div className="w-96 flex-shrink-0">
              <OutputPanel content={content} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between px-6 py-2 border-t border-border bg-card text-xs text-muted-foreground">
          <span>
            Built with{' '}
            <a
              href="https://github.com/mirzasaikatahmmed/scribex-editor"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              scribex-editor
            </a>{' '}
            v1.0.8
          </span>
          <span>
            Made with ❤️ by{' '}
            <a
              href="https://github.com/mirzasaikatahmmed"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Mirza Saikat Ahmmed
            </a>
          </span>
        </footer>
      </div>
    </ScribexThemeProvider>
  );
}
