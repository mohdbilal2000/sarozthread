import type { Metadata, Viewport } from 'next';
import './globals.css';
import { archivo, inter, plexMono } from '@/lib/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { SITE_URL } from '@/lib/site';
import { company } from '@/data/company';
import { graph, organization, place, website } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Saroz Threadz — Womenswear Manufacturer in Jaipur, India',
    template: '%s | Saroz Threadz',
  },
  description: company.descriptionShort,
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: '/', types: { 'application/rss+xml': '/rss.xml' } },
  openGraph: {
    type: 'website',
    siteName: company.name,
    locale: 'en',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Jaipur',
    'geo.position': `${company.geo.lat};${company.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: '#070708',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // suppressHydrationWarning is on <html> because the inline script below adds
  // a `js` class before React hydrates — that is the point of it, and it is the
  // only intentional mismatch on this element.
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before first paint, so the reveal CSS only
            hides what it will actually be able to show again. */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: graph([organization(), place(), website()]) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
