import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scribex Editor — Demo',
  description: 'Interactive demo for the scribex-editor React component library',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
