'use client';

import dynamic from 'next/dynamic';

const EditorDemo = dynamic(() => import('@/components/EditorDemo'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-muted-foreground">Loading editor...</div>
    </div>
  ),
});

export default function Home() {
  return <EditorDemo />;
}
