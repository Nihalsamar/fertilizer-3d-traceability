import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KisanTrace Diorama 3.0 — Provenance, Perfected',
  description:
    'Ultra-premium physical-digital farm-to-fork traceability diorama and edge blockchain consensus platform.',
  themeColor: '#050505',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#050505] text-white/90 antialiased selection:bg-[#0050FF] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
