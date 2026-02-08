import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Thakkadi — Legal Calculator Suite',
    template: '%s | Thakkadi',
  },
  description:
    'Unified legal calculator suite for India. Calculate limitation periods, court fees, and more.',
  keywords: [
    'legal calculator',
    'limitation period',
    'court fee calculator',
    'Indian law',
    'Karnataka court fees',
    'appeal deadline',
    'Thakkadi',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="adc22b09-8042-41e9-9998-6b2ba6452de9"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
