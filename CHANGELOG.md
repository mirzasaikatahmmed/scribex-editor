# Changelog

All notable changes to **scribex-editor** are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.8] — 2026-05-17 — Current

### 📝 Documentation
- Added full open source documentation suite: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `REPOSITORY_RULES.md`, `CONTRIBUTORS.md`, `CHANGELOG.md`
- Rewrote `README.md` with badges, feature table, complete props reference, toolbar component list, theme/locale guides, project structure tree, and quick-start examples

### ✨ Added
- Completed `app/` demo — fully working Next.js 15 + React 19 demo application showcasing all editor features
  - Interactive theme bar: mode toggle, 8 colour swatches, locale selector, border radius slider
  - Live HTML output panel with Preview and HTML source tabs
  - Sample @mention users and pre-loaded rich content
  - Toggleable output panel and GitHub / npm header links

---

## [1.0.7] — 2026-05-15

### 🔒 Security
- Added `.github/scripts/malware-scan.sh` — shell script that scans the repository for malicious patterns, hardcoded secrets, and suspicious files before release
- Added `.github/workflows/malware-scan.yml` — GitHub Actions workflow that runs the malware scan automatically on every push and pull request to `master`

---

## [1.0.5] — 2026-05-15

### 🛠️ Maintenance
- Fixed Tailwind CSS content paths in `tailwind.config.js` to correctly resolve component styles
- Updated `.gitignore` to exclude security report artifacts (`.security-reports/`) and build intermediates

---

## [1.0.4] — 2026-05-02

### 📝 Documentation
- Updated `README.md` with improved usage examples, props table, and feature list

---

## [1.0.3] — 2026-05-02

### 🚀 CI/CD
- Stabilised the npm publish workflow — fixed publish trigger conditions and package provenance settings
- CI now correctly runs on `master` branch push events only

---

## [1.0.2] — 2026-01-24

### ✨ Added
- **`RichTextEditor`** — new Quill-based rich text editor component (`<RichTextEditor>`) as a lightweight alternative to the TipTap-powered `ScribexEditor`
- **`EditorPreview`** — read-only HTML preview component (`<EditorPreview content="..." />`) for rendering stored editor output
- **`editor.css`** — dedicated stylesheet for the Quill-based editor with full dark-mode support and custom scrollbar styling

### 🏗️ Refactored
- Flattened the repository from a pnpm monorepo (`scribex-editor/` + `scribex-editor-demo/` workspaces) into a single package at the repository root — simpler to install, build, and contribute to
- Removed `pnpm-workspace.yaml` and `pnpm-lock.yaml`; project now uses npm
- Updated `tsup.config.ts` to include the new CSS output in the bundle

### 📦 Build
- `src/index.ts` now exports `RichTextEditor`, `EditorPreview`, and their prop types alongside the existing `ScribexEditor` exports

---

## [1.0.0] — 2026-01-24

### 🎉 Initial Release

#### Core Components
- **`ScribexEditor`** — full-featured WYSIWYG editor built on [TipTap](https://tiptap.dev) with 30+ built-in extensions
- **`ScribexThemeProvider`** — React Context provider for runtime theme switching
- **`useScribexTheme`** — hook to read and update theme settings from any child component

#### Editor Features
- Rich text formatting — bold, italic, underline, strikethrough, inline code
- Headings H1–H6
- Bullet lists, ordered lists, task/checklist lists
- Code blocks with syntax highlighting
- Tables with full row/column controls
- Multi-column layouts (2 and 3 column)
- Blockquotes and horizontal rules
- Hyperlinks with bubble menu controls
- Images and videos with custom upload handler support
- GIF search via Giphy (requires API key)
- File attachments with custom upload handler
- Emoji picker with `:shortcode:` suggestion support
- @mention support with configurable user list
- Slash command palette (`/` to open)
- Math equations powered by KaTeX
- Mermaid diagrams (flowcharts, sequence diagrams, etc.)
- Excalidraw whiteboard embed
- Drawing tool
- Twitter / X embed
- iFrame embed
- Callout blocks
- Text alignment, indent, line height, font family, font size
- Text direction (LTR / RTL)
- Search and replace
- HTML source (code view) mode
- Export to PDF, export to Word, import from Word
- Character and word count with visual progress ring

#### Theming
- Light and dark mode (synced to `reactjs-tiptap-editor` theme engine)
- 8 colour themes: `default`, `red`, `blue`, `green`, `orange`, `rose`, `violet`, `yellow`
- Configurable border radius
- All colours expressed as shadcn/ui CSS variables (`--primary`, `--background`, etc.)

#### Internationalisation
- 6 locales out of the box: `en`, `vi`, `zh_CN`, `pt_BR`, `hu_HU`, `fi`

#### Exports
- 30+ individual toolbar components re-exported (`RichTextBold`, `RichTextItalic`, …) for building fully custom toolbars
- TipTap hooks re-exported: `useEditor`, `EditorContent`, `Editor` type
- Utility exports: `cn()`, `debounce()`, `createObjectURL()`, `createBlobURL()`, `convertBase64ToBlob()`, `EMOJI_LIST`
- `themeActions`, `localeActions`, `RichTextProvider` from `reactjs-tiptap-editor`

#### Infrastructure
- TypeScript with strict mode; dual CJS + ESM output via tsup
- CSS exported separately as `scribex-editor/styles.css`
- Peer dependencies: React ≥ 18, React DOM ≥ 18
- GitHub Actions publish workflow for automated npm releases
- Demo app included under `scribex-editor-demo/` (monorepo, later restructured in v1.0.2)

---

[1.0.8]: https://github.com/mirzasaikatahmmed/scribex-editor/compare/v1.0.7...v1.0.8
[1.0.7]: https://github.com/mirzasaikatahmmed/scribex-editor/compare/v1.0.5...v1.0.7
[1.0.5]: https://github.com/mirzasaikatahmmed/scribex-editor/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/mirzasaikatahmmed/scribex-editor/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/mirzasaikatahmmed/scribex-editor/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/mirzasaikatahmmed/scribex-editor/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/mirzasaikatahmmed/scribex-editor/releases/tag/v1.0.0
