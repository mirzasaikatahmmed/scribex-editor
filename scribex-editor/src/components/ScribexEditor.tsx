'use client';

import { useCallback, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import { RichTextProvider } from 'reactjs-tiptap-editor';
import { EditorContent, useEditor } from '@tiptap/react';

// Base Kit
import { Document } from '@tiptap/extension-document';
import { HardBreak } from '@tiptap/extension-hard-break';
import { ListItem } from '@tiptap/extension-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { TextStyle } from '@tiptap/extension-text-style';
import {
  Dropcursor,
  Gapcursor,
  Placeholder,
  TrailingNode,
  CharacterCount,
} from '@tiptap/extensions';

// Extensions
import {
  Attachment,
  RichTextAttachment,
} from 'reactjs-tiptap-editor/attachment';
import {
  Blockquote,
  RichTextBlockquote,
} from 'reactjs-tiptap-editor/blockquote';
import { Bold, RichTextBold } from 'reactjs-tiptap-editor/bold';
import {
  BulletList,
  RichTextBulletList,
} from 'reactjs-tiptap-editor/bulletlist';
import { Clear, RichTextClear } from 'reactjs-tiptap-editor/clear';
import { Code, RichTextCode } from 'reactjs-tiptap-editor/code';
import { CodeBlock, RichTextCodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { CodeView, RichTextCodeView } from 'reactjs-tiptap-editor/codeview';
import { Color, RichTextColor } from 'reactjs-tiptap-editor/color';
import {
  Column,
  ColumnNode,
  MultipleColumnNode,
  RichTextColumn,
} from 'reactjs-tiptap-editor/column';
import { Drawer, RichTextDrawer } from 'reactjs-tiptap-editor/drawer';
import { Emoji, RichTextEmoji } from 'reactjs-tiptap-editor/emoji';
import {
  Excalidraw,
  RichTextExcalidraw,
} from 'reactjs-tiptap-editor/excalidraw';
import { ExportPdf, RichTextExportPdf } from 'reactjs-tiptap-editor/exportpdf';
import {
  ExportWord,
  RichTextExportWord,
} from 'reactjs-tiptap-editor/exportword';
import {
  FontFamily,
  RichTextFontFamily,
} from 'reactjs-tiptap-editor/fontfamily';
import { FontSize, RichTextFontSize } from 'reactjs-tiptap-editor/fontsize';
import { Heading, RichTextHeading } from 'reactjs-tiptap-editor/heading';
import { Highlight, RichTextHighlight } from 'reactjs-tiptap-editor/highlight';
import {
  History,
  RichTextRedo,
  RichTextUndo,
} from 'reactjs-tiptap-editor/history';
import {
  HorizontalRule,
  RichTextHorizontalRule,
} from 'reactjs-tiptap-editor/horizontalrule';
import { Iframe, RichTextIframe } from 'reactjs-tiptap-editor/iframe';
import { Image, RichTextImage } from 'reactjs-tiptap-editor/image';
import { ImageGif, RichTextImageGif } from 'reactjs-tiptap-editor/imagegif';
import {
  ImportWord,
  RichTextImportWord,
} from 'reactjs-tiptap-editor/importword';
import { Indent, RichTextIndent } from 'reactjs-tiptap-editor/indent';
import { Italic, RichTextItalic } from 'reactjs-tiptap-editor/italic';
import { Katex, RichTextKatex } from 'reactjs-tiptap-editor/katex';
import {
  LineHeight,
  RichTextLineHeight,
} from 'reactjs-tiptap-editor/lineheight';
import { Link, RichTextLink } from 'reactjs-tiptap-editor/link';
import { Mention } from 'reactjs-tiptap-editor/mention';
import { Mermaid, RichTextMermaid } from 'reactjs-tiptap-editor/mermaid';
import { MoreMark, RichTextMoreMark } from 'reactjs-tiptap-editor/moremark';
import {
  OrderedList,
  RichTextOrderedList,
} from 'reactjs-tiptap-editor/orderedlist';
import {
  RichTextSearchAndReplace,
  SearchAndReplace,
} from 'reactjs-tiptap-editor/searchandreplace';
import { RichTextStrike, Strike } from 'reactjs-tiptap-editor/strike';
import { RichTextTable, Table } from 'reactjs-tiptap-editor/table';
import { RichTextTaskList, TaskList } from 'reactjs-tiptap-editor/tasklist';
import { RichTextAlign, TextAlign } from 'reactjs-tiptap-editor/textalign';
import {
  RichTextTextDirection,
  TextDirection,
} from 'reactjs-tiptap-editor/textdirection';
import {
  RichTextUnderline,
  TextUnderline,
} from 'reactjs-tiptap-editor/textunderline';
import { RichTextTwitter, Twitter } from 'reactjs-tiptap-editor/twitter';
import { RichTextVideo, Video } from 'reactjs-tiptap-editor/video';
import { RichTextCallout, Callout } from 'reactjs-tiptap-editor/callout';

// Slash Command
import {
  SlashCommand,
  SlashCommandList,
} from 'reactjs-tiptap-editor/slashcommand';

// Bubble
import {
  RichTextBubbleColumns,
  RichTextBubbleDrawer,
  RichTextBubbleExcalidraw,
  RichTextBubbleIframe,
  RichTextBubbleImage,
  RichTextBubbleImageGif,
  RichTextBubbleKatex,
  RichTextBubbleLink,
  RichTextBubbleMermaid,
  RichTextBubbleTable,
  RichTextBubbleText,
  RichTextBubbleTwitter,
  RichTextBubbleVideo,
  RichTextBubbleMenuDragHandle,
  RichTextBubbleCallout,
} from 'reactjs-tiptap-editor/bubble';

import { EMOJI_LIST } from '../emojis';
import { debounce, createObjectURL, createBlobURL } from '../utils/helpers';
import { cn } from '../utils/cn';

// Custom document to support columns
const DocumentColumn = Document.extend({
  content: '(block|columns)+',
});

export interface ScribexEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  characterLimit?: number;
  editable?: boolean;
  className?: string;
  toolbarClassName?: string;
  contentClassName?: string;
  onEditorReady?: (editor: Editor) => void;
  imageUpload?: (file: File) => Promise<string>;
  videoUpload?: (file: File) => Promise<string>;
  attachmentUpload?: (file: File) => Promise<string>;
  giphyApiKey?: string;
  mentionUsers?: Array<{
    id: string;
    label: string;
    avatar?: { src: string };
  }>;
  showToolbar?: boolean;
  showBubbleMenus?: boolean;
  showSlashCommands?: boolean;
  showCharacterCount?: boolean;
  debounceMs?: number;
}

const DefaultToolbar = () => {
  return (
    <div className="flex items-center p-1 gap-2 flex-wrap border-b border-solid border-border">
      <RichTextUndo />
      <RichTextRedo />
      <RichTextSearchAndReplace />
      <RichTextClear />
      <RichTextFontFamily />
      <RichTextHeading />
      <RichTextFontSize />
      <RichTextBold />
      <RichTextItalic />
      <RichTextUnderline />
      <RichTextStrike />
      <RichTextMoreMark />
      <RichTextEmoji />
      <RichTextColor />
      <RichTextHighlight />
      <RichTextBulletList />
      <RichTextOrderedList />
      <RichTextAlign />
      <RichTextIndent />
      <RichTextLineHeight />
      <RichTextTaskList />
      <RichTextLink />
      <RichTextImage />
      <RichTextVideo />
      <RichTextImageGif />
      <RichTextBlockquote />
      <RichTextHorizontalRule />
      <RichTextCode />
      <RichTextCodeBlock />
      <RichTextColumn />
      <RichTextTable />
      <RichTextIframe />
      <RichTextExportPdf />
      <RichTextImportWord />
      <RichTextExportWord />
      <RichTextTextDirection />
      <RichTextAttachment />
      <RichTextKatex />
      <RichTextExcalidraw />
      <RichTextMermaid />
      <RichTextDrawer />
      <RichTextTwitter />
      <RichTextCodeView />
      <RichTextCallout />
    </div>
  );
};

const CharacterCounter = ({
  editor,
  limit,
}: {
  editor: Editor | null;
  limit: number;
}) => {
  if (!editor) return null;

  const charactersCount = editor.storage.characterCount?.characters() || 0;
  const wordsCount = editor.storage.characterCount?.words() || 0;
  const percentage = Math.round((100 / limit) * charactersCount);

  return (
    <div
      className={cn(
        'flex items-center gap-2 p-3 border-t border-border text-sm text-muted-foreground',
        charactersCount >= limit && 'text-destructive'
      )}
    >
      <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      {charactersCount} / {limit} characters | {wordsCount} words
    </div>
  );
};

export function ScribexEditor({
  initialContent = '',
  onChange,
  placeholder = "Press '/' for commands",
  characterLimit = 10000,
  editable = true,
  className,
  toolbarClassName,
  contentClassName,
  onEditorReady,
  imageUpload = createObjectURL,
  videoUpload = createObjectURL,
  attachmentUpload = createBlobURL,
  giphyApiKey,
  mentionUsers = [],
  showToolbar = true,
  showBubbleMenus = true,
  showSlashCommands = true,
  showCharacterCount = true,
  debounceMs = 300,
}: ScribexEditorProps) {
  const [content, setContent] = useState(initialContent);

  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      setContent(value);
      onChange?.(value);
    }, debounceMs),
    [onChange, debounceMs]
  );

  const BaseKit = [
    DocumentColumn,
    Text,
    Dropcursor.configure({
      class: 'scribex-editor-theme',
      color: 'hsl(var(--primary))',
      width: 2,
    }),
    Gapcursor,
    HardBreak,
    Paragraph,
    TrailingNode,
    ListItem,
    TextStyle,
    Placeholder.configure({
      placeholder,
    }),
  ];

  const extensions = [
    ...BaseKit,
    CharacterCount.configure({
      limit: characterLimit,
    }),
    History,
    SearchAndReplace,
    Clear,
    FontFamily,
    Heading,
    FontSize,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    MoreMark,
    Emoji.configure({
      suggestion: {
        items: async ({ query }: any) => {
          const lowerCaseQuery = query?.toLowerCase();
          return EMOJI_LIST.filter(({ name }) =>
            name.toLowerCase().includes(lowerCaseQuery)
          );
        },
      },
    }),
    Color,
    Highlight,
    BulletList,
    OrderedList,
    TextAlign,
    Indent,
    LineHeight,
    TaskList,
    Link,
    Image.configure({
      upload: imageUpload,
    }),
    Video.configure({
      upload: videoUpload,
    }),
    ...(giphyApiKey
      ? [
          ImageGif.configure({
            provider: 'giphy',
            API_KEY: giphyApiKey,
          }),
        ]
      : []),
    Blockquote,
    HorizontalRule,
    Code,
    CodeBlock,
    Column,
    ColumnNode,
    MultipleColumnNode,
    Table,
    Iframe,
    ExportPdf,
    ImportWord,
    ExportWord,
    TextDirection,
    Attachment.configure({
      upload: attachmentUpload,
    }),
    Katex,
    Excalidraw,
    Mermaid.configure({
      upload: createBlobURL,
    }),
    Drawer.configure({
      upload: createBlobURL,
    }),
    Twitter,
    ...(mentionUsers.length > 0
      ? [
          Mention.configure({
            suggestions: [
              {
                char: '@',
                items: async ({ query }: any) => {
                  return mentionUsers.filter((item) =>
                    item.label.toLowerCase().startsWith(query.toLowerCase())
                  );
                },
              },
            ],
          }),
        ]
      : []),
    ...(showSlashCommands ? [SlashCommand] : []),
    CodeView,
    Callout,
  ];

  const editor = useEditor({
    textDirection: 'auto',
    content: initialContent,
    extensions,
    immediatelyRender: false,
    editable,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      debouncedOnChange(html);
    },
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  return (
    <RichTextProvider editor={editor as any}>
      <div
        className={cn(
          'overflow-hidden rounded-lg bg-background border border-border',
          className
        )}
      >
        <div className="flex max-h-full w-full flex-col">
          {showToolbar && (
            <div className={toolbarClassName}>
              <DefaultToolbar />
            </div>
          )}

          <div className={contentClassName}>
            <EditorContent editor={editor} />
          </div>

          {showBubbleMenus && (
            <>
              <RichTextBubbleColumns />
              <RichTextBubbleDrawer />
              <RichTextBubbleExcalidraw />
              <RichTextBubbleIframe />
              <RichTextBubbleKatex />
              <RichTextBubbleLink />
              <RichTextBubbleImage />
              <RichTextBubbleVideo />
              {giphyApiKey && <RichTextBubbleImageGif />}
              <RichTextBubbleMermaid />
              <RichTextBubbleTable />
              <RichTextBubbleText />
              <RichTextBubbleTwitter />
              <RichTextBubbleCallout />
              <RichTextBubbleMenuDragHandle />
            </>
          )}

          {showSlashCommands && <SlashCommandList />}
        </div>

        {showCharacterCount && (
          <CharacterCounter editor={editor} limit={characterLimit} />
        )}
      </div>
    </RichTextProvider>
  );
}

export default ScribexEditor;
