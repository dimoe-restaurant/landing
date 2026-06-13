import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/ui/Navbar';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import CookieBanner from '@/components/ui/CookieBanner';
import GoogleAnalytics from '@/components/ui/GoogleAnalytics';
import '@/app/globals.css';

const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'], display: 'swap' });
const dmSans = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? 'DiMOE — Neapolitan Pizzeria & Restobar | Paine, Chile'
      : 'DiMOE — Pizzería Napolitana y Restobar | Paine, Chile',
    description: isEn
      ? 'Award-winning Neapolitan pizza, artisan pasta and craft cocktails. 35 minutes from Santiago, in Paine. 2nd Best Restaurant in Chile 2025. Book your table.'
      : 'Pizza napolitana con ingredientes frescos, pastas artesanales y cócteles de autor. A 35 minutos de Santiago, en Paine. 2° Top Chile 2025. Reserva tu mesa.',
    keywords: isEn
      ? ['Neapolitan pizza', 'Paine', 'Chile', 'Santiago day trip', 'restobar', 'pasta', 'cocktails', 'best restaurant Chile']
      : ['pizzería', 'pizza napolitana', 'Paine', 'Chile', 'restobar', 'pasta', 'cócteles', 'Santiago', 'restaurante'],
    authors: [{ name: 'DiMOE' }],
    openGraph: {
      title: isEn ? 'DiMOE — Neapolitan Pizzeria & Restobar' : 'DiMOE — Pizzería Napolitana y Restobar',
      description: isEn
        ? 'Neapolitan pizza, artisan pasta & cocktails. 2nd Best in Chile 2025. 35 min from Santiago.'
        : 'Pizza napolitana, pastas artesanales y cócteles. 2° Top Chile 2025. A 35 minutos de Santiago.',
      url: isEn ? 'https://dimoe.cl/en' : 'https://dimoe.cl',
      siteName: 'DiMOE',
      locale: isEn ? 'en_US' : 'es_CL',
      type: 'website',
      images: [{ url: 'https://dimoe.cl/og-image.jpg', width: 1200, height: 630, alt: 'DiMOE Pizzería Napolitana y Restobar — Paine, Chile' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn ? 'DiMOE — Neapolitan Pizzeria | Paine, Chile' : 'DiMOE — Pizzería Napolitana y Restobar | Paine',
      description: isEn ? 'Neapolitan pizza & cocktails. 2nd Best in Chile 2025.' : 'Pizza napolitana, pastas y cócteles. 2° Top Chile 2025.',
      images: ['https://dimoe.cl/og-image.jpg'],
    },
    alternates: {
      canonical: isEn ? 'https://dimoe.cl/en' : 'https://dimoe.cl',
      languages: { 'es': 'https://dimoe.cl', 'en': 'https://dimoe.cl/en' },
    },
    robots: { index: true, follow: true },
  };
}

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'DiMOE Pizzería Napolitana y Restobar',
  url: 'https://dimoe.cl',
  telephone: '+56973694101',
  email: 'contacto@dimoe.cl',
  image: 'https://dimoe.cl/og-image.jpg',
  priceRange: '$$',
  servesCuisine: ['Italian', 'Neapolitan Pizza', 'Pasta'],
  address: { '@type': 'PostalAddress', streetAddress: 'Darío Pavez 16, Champa', addressLocality: 'Paine', addressRegion: 'Región Metropolitana', addressCountry: 'CL' },
  geo: { '@type': 'GeoCoordinates', latitude: -33.8555048, longitude: -70.7650772 },
  hasMap: 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7',
  menu: 'https://linktr.ee/di_moe',
  sameAs: ['https://instagram.com/dimoe_restobar', 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7'],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'], opens: '12:30', closes: '22:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '13:00', closes: '00:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '13:00', closes: '17:30' },
  ],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Estacionamiento', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Pet-friendly', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Opciones vegetarianas', value: true },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      </head>
      <body style={{ margin: 0, minHeight: '100vh' }}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <WhatsAppFloat />
          <CookieBanner />
          <GoogleAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
