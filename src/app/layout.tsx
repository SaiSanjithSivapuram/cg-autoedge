import type { Metadata, Viewport } from 'next';
import { Lexend, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/providers/ReduxProvider';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});
import MuiThemeProvider from '@/providers/MuiThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://cgautoedge.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'CG AutoEdge | Car Deal Negotiators — Get the Best Price on Your Next Car',
    template: '%s | CG AutoEdge',
  },
  description:
    'CG AutoEdge negotiates car deals on your behalf so you never overpay again. Expert negotiators, transparent pricing, and guaranteed savings on new and used vehicles.',
  keywords: [
    'car deal negotiator',
    'auto negotiation service',
    'car buying service',
    'best car deals',
    'car price negotiation',
    'save money on cars',
    'auto consultant',
    'vehicle purchase negotiation',
  ],
  authors: [{ name: 'CG AutoEdge' }],
  creator: 'CG AutoEdge',
  publisher: 'CG AutoEdge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'CG AutoEdge',
    title: 'CG AutoEdge | Car Deal Negotiators',
    description:
      'Expert car deal negotiators who fight for the best price on your behalf. Save thousands on your next vehicle.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CG AutoEdge — Car Deal Negotiators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CG AutoEdge | Car Deal Negotiators',
    description:
      'Expert car deal negotiators who fight for the best price on your behalf.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: BASE_URL },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E293B',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CG AutoEdge',
    description:
      'Professional car deal negotiation service helping buyers save thousands on new and used vehicles.',
    url: BASE_URL,
    telephone: '+1-800-AUTO-EDGE',
    address: { '@type': 'PostalAddress', addressCountry: 'US' },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
  };

  return (
    <html lang="en" className={`${lexend.variable} ${sourceSans3.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <MuiThemeProvider>
          <ReduxProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </ReduxProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
