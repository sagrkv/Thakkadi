import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  metadataBase: new URL('https://thakkadi.in'),
  title: {
    default: 'Thakkadi — Legal Calculator Suite',
    template: '%s | Thakkadi',
  },
  description:
    'Free legal calculators for Indian lawyers — limitation period calculator, Karnataka court fee calculator, and stamp duty calculator. No login required, no data stored. 100% client-side.',
  keywords: [
    'legal calculator',
    'limitation period calculator',
    'court fee calculator',
    'stamp duty calculator Karnataka',
    'Karnataka Court Fees Act 1958',
    'Karnataka Stamp Act 1957',
    'Limitation Act 1963',
    'appeal deadline India',
    'SLP limitation period',
    'Indian law calculator',
    'court fee Karnataka',
    'property registration fee Karnataka',
    'Thakkadi',
  ],
  authors: [{ name: 'Thakkadi' }],
  creator: 'Thakkadi',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Thakkadi',
    title: 'Thakkadi — Free Legal Calculators for Indian Lawyers',
    description:
      'Calculate limitation periods, Karnataka court fees, and stamp duty. Free, open-source, no login, no data stored.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thakkadi — Free Legal Calculators for Indian Lawyers',
    description:
      'Calculate limitation periods, Karnataka court fees, and stamp duty. Free, open-source, no login, no data stored.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://thakkadi.in',
  },
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
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebSiteSchema()} />
      </head>
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="adc22b09-8042-41e9-9998-6b2ba6452de9"
        strategy="afterInteractive"
      />
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
