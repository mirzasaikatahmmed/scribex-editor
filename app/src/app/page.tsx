'use client';

import dynamic from 'next/dynamic';

const DemoEditor = dynamic(() => import('@/components/DemoEditor'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Loading editor...</span>
      </div>
    </div>
  ),
});

export default function HomePage() {
  return <DemoEditor />;
}
