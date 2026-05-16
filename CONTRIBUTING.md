# Contributing to Scribex Editor

Thanks for taking the time to contribute! This guide covers everything you need to get started.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md). By participating you agree to abide by its terms. Report violations to **contact@saikat.com.bd**.

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v7 or higher
- A working React 18+ project for manual testing

### Fork & Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/<your-username>/scribex-editor.git
cd scribex-editor
```

### Install Dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run dev    # tsup --watch — rebuilds on every save
```

---

## Project Structure

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
│   │   ├── cn.ts                 # Class name utility
│   │   ├── helpers.ts            # debounce, file, base64 helpers
│   │   └── index.ts
│   ├── emojis.ts                 # Emoji data list
│   └── index.ts                  # Public API barrel export
├── dist/                         # Compiled output (git-ignored)
├── package.json
├── tsup.config.ts
└── tsconfig.json
```

---

## Development Workflow

### Testing your changes locally

After building, link the package into a test React app:

```bash
# In the scribex-editor directory
npm run build
npm link

# In your test React app
npm link scribex-editor
```

Import and use `ScribexEditor` in your test app just as a consumer would.

### Key Source Areas

| File | What to touch |
|------|--------------|
| `ScribexEditor.tsx` | Core editor props, extensions, toolbar defaults |
| `ThemeProvider.tsx` | Theme context, color tokens, locale handling |
| `EditorPreview.tsx` | Read-only rendering of editor HTML |
| `RichTextEditor.tsx` | Quill-based alternative (independent of TipTap) |
| `helpers.ts` | Utility functions — debounce, file helpers |
| `emojis.ts` | Emoji dataset |
| `index.ts` | Public API surface — add new exports here |

### TypeScript

The project uses strict TypeScript. Run the type checker before opening a PR:

```bash
npx tsc --noEmit
```

---

## Making Changes

1. Create a branch from `main`:

   ```bash
   git checkout -b feat/your-feature
   # or
   git checkout -b fix/your-bug
   ```

2. Make your changes in `src/`.

3. Rebuild after edits:

   ```bash
   npm run build
   ```

4. Test in a local React app via `npm link`.

5. Ensure there are no TypeScript errors:

   ```bash
   npx tsc --noEmit
   ```

---

## Commit Guidelines

Use emoji prefixes for clear, scannable commit history:

| Prefix | When to use |
|--------|------------|
| `✨ feat:` | New feature or component |
| `🐛 fix:` | Bug fix |
| `🔒 security:` | Security improvement |
| `♻️ refactor:` | Code change with no behaviour change |
| `📝 docs:` | Documentation only |
| `🏗️ build:` | Build system or dependency change |
| `✅ test:` | Adding or fixing tests |
| `🚀 ci:` | CI/CD changes |
| `🎨 style:` | Formatting, missing semicolons, etc. |

Keep the subject line under 72 characters. Add a body if the *why* is non-obvious.

---

## Pull Request Process

1. Push your branch and open a PR against `main`.
2. Fill in the PR description: what changed, why, and how you tested it.
3. For major changes (new components, breaking prop changes, new peer dependencies), open an issue first to align on the approach.
4. A maintainer will review within a few days. Address feedback and push to the same branch — the PR updates automatically.
5. Once approved, the maintainer will merge and include your change in the next npm release.

---

## Reporting Bugs

Open a [GitHub Issue](https://github.com/mirzasaikatahmmed/scribex-editor/issues) and include:

- `scribex-editor` version from your `package.json`
- React version (`react` field in `package.json`)
- Node.js version (`node -v`)
- Framework (Next.js, Vite, CRA, etc.) and version
- Steps to reproduce
- What you expected vs. what actually happened
- Any console errors or stack traces (paste the full output)

---

## Suggesting Features

Open an issue with the `enhancement` label. Describe the use case — not just what you want but *why*. If you're ready to implement it, mention that in the issue so we can discuss the approach before you write code.

---

## Questions?

Open an issue or reach out to [Mirza Saikat Ahmmed](https://github.com/mirzasaikatahmmed).
