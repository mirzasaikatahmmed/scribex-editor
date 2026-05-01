// Main Editor Component
export {
  ScribexEditor,
  type ScribexEditorProps,
} from './components/ScribexEditor';

// Quill-based Rich Text Editor
export { default as RichTextEditor, type RichTextEditorProps } from './components/RichTextEditor';
export { default as EditorPreview, type EditorPreviewProps } from './components/EditorPreview';

// Theme Provider
export {
  ScribexThemeProvider,
  useScribexTheme,
  type ScribexThemeConfig,
  type ThemeColor,
  type ThemeMode,
  type Locale,
} from './components/ThemeProvider';

// Utilities
export { cn } from './utils/cn';
export {
  debounce,
  createObjectURL,
  createBlobURL,
  convertBase64ToBlob,
} from './utils/helpers';

// Emoji List
export { EMOJI_LIST } from './emojis';

// Re-export useful items from reactjs-tiptap-editor
export { themeActions } from 'reactjs-tiptap-editor/theme';
export { localeActions } from 'reactjs-tiptap-editor/locale-bundle';
export { RichTextProvider } from 'reactjs-tiptap-editor';

// Re-export toolbar components for custom toolbars
export { RichTextBold } from 'reactjs-tiptap-editor/bold';
export { RichTextItalic } from 'reactjs-tiptap-editor/italic';
export { RichTextUnderline } from 'reactjs-tiptap-editor/textunderline';
export { RichTextStrike } from 'reactjs-tiptap-editor/strike';
export { RichTextCode } from 'reactjs-tiptap-editor/code';
export { RichTextCodeBlock } from 'reactjs-tiptap-editor/codeblock';
export { RichTextLink } from 'reactjs-tiptap-editor/link';
export { RichTextImage } from 'reactjs-tiptap-editor/image';
export { RichTextVideo } from 'reactjs-tiptap-editor/video';
export { RichTextBlockquote } from 'reactjs-tiptap-editor/blockquote';
export { RichTextBulletList } from 'reactjs-tiptap-editor/bulletlist';
export { RichTextOrderedList } from 'reactjs-tiptap-editor/orderedlist';
export { RichTextTaskList } from 'reactjs-tiptap-editor/tasklist';
export { RichTextHeading } from 'reactjs-tiptap-editor/heading';
export { RichTextUndo, RichTextRedo } from 'reactjs-tiptap-editor/history';
export { RichTextColor } from 'reactjs-tiptap-editor/color';
export { RichTextHighlight } from 'reactjs-tiptap-editor/highlight';
export { RichTextAlign } from 'reactjs-tiptap-editor/textalign';
export { RichTextIndent } from 'reactjs-tiptap-editor/indent';
export { RichTextFontFamily } from 'reactjs-tiptap-editor/fontfamily';
export { RichTextFontSize } from 'reactjs-tiptap-editor/fontsize';
export { RichTextLineHeight } from 'reactjs-tiptap-editor/lineheight';
export { RichTextTable } from 'reactjs-tiptap-editor/table';
export { RichTextColumn } from 'reactjs-tiptap-editor/column';
export { RichTextEmoji } from 'reactjs-tiptap-editor/emoji';
export { RichTextKatex } from 'reactjs-tiptap-editor/katex';
export { RichTextMermaid } from 'reactjs-tiptap-editor/mermaid';
export { RichTextExcalidraw } from 'reactjs-tiptap-editor/excalidraw';
export { RichTextDrawer } from 'reactjs-tiptap-editor/drawer';
export { RichTextIframe } from 'reactjs-tiptap-editor/iframe';
export { RichTextTwitter } from 'reactjs-tiptap-editor/twitter';
export { RichTextCallout } from 'reactjs-tiptap-editor/callout';
export { RichTextAttachment } from 'reactjs-tiptap-editor/attachment';
export { RichTextExportPdf } from 'reactjs-tiptap-editor/exportpdf';
export { RichTextImportWord } from 'reactjs-tiptap-editor/importword';
export { RichTextExportWord } from 'reactjs-tiptap-editor/exportword';
export { RichTextSearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
export { RichTextClear } from 'reactjs-tiptap-editor/clear';
export { RichTextMoreMark } from 'reactjs-tiptap-editor/moremark';
export { RichTextTextDirection } from 'reactjs-tiptap-editor/textdirection';
export { RichTextCodeView } from 'reactjs-tiptap-editor/codeview';
export { RichTextImageGif } from 'reactjs-tiptap-editor/imagegif';
export { RichTextHorizontalRule } from 'reactjs-tiptap-editor/horizontalrule';

// Re-export tiptap hooks
export { useEditor, EditorContent } from '@tiptap/react';
export type { Editor } from '@tiptap/react';
