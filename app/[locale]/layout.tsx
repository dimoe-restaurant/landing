import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/ui/Navbar';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import CookieBanner from '@/components/ui/CookieBanner';
import GoogleAnalytics from '@/components/ui/GoogleAnalytics';
import MetaPixel from '@/components/ui/MetaPixel';
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
    metadataBase: new URL('https://dimoe.cl'),
    title: isEn
      ? 'DiMOE — Neapolitan Pizzeria & Restobar | Paine, Chile'
      : 'DiMOE — Pizzería Napolitana y Restobar | Paine, Chile',
    description: isEn
      ? 'Neapolitan pizza from a wood-fired oven, artisan pasta and craft cocktails. 35 min from Santiago, in Paine, Chile. 2nd place Top Pizza Chile & Maestro Pizzaiolo Award. 4.8 ⭐ on Google.'
      : 'Pizza napolitana en horno de leña, pastas artesanales y cócteles de autor. En Paine, a 35 min de Santiago. 2° Top Pizza Chile · Premio Maestro Pizzaiolo Soprole 2023 · 4,8 ⭐ Google.',
    keywords: isEn
      ? ['Neapolitan pizza Paine', 'restaurant Paine Chile', 'wood-fired pizza Chile', 'restobar Paine', 'artisan pasta Chile', 'Top Pizza Chile', 'Santiago day trip restaurant', 'pizza near Santiago', 'DiMOE Paine']
      : ['pizza napolitana Paine', 'pizzería Paine', 'restaurante Paine Chile', 'pizza horno leña Paine', 'restobar Paine', 'pasta artesanal Paine', 'donde comer Paine', 'restaurante cerca Santiago', 'Top Pizza Chile', 'DiMOE Paine'],
    authors: [{ name: 'DiMOE' }],
    openGraph: {
      title: isEn ? 'DiMOE — Neapolitan Pizzeria & Restobar | Paine, Chile' : 'DiMOE — Pizzería Napolitana y Restobar | Paine, Chile',
      description: isEn
        ? 'Wood-fired Neapolitan pizza, artisan pasta & cocktails. 4.8 ⭐ on Google. 35 min from Santiago, Paine.'
        : 'Pizza napolitana en horno de leña, pastas y cócteles. 4,8 ⭐ en Google. A 35 min de Santiago, en Paine.',
      url: isEn ? 'https://dimoe.cl/en' : 'https://dimoe.cl',
      siteName: 'DiMOE',
      locale: isEn ? 'en_US' : 'es_CL',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'DiMOE Pizzería Napolitana y Restobar — Paine, Chile' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn ? 'DiMOE — Neapolitan Pizzeria | Paine, Chile' : 'DiMOE — Pizzería Napolitana y Restobar | Paine',
      description: isEn ? 'Wood-fired pizza & cocktails. 2nd place Top Pizza Chile · 4.8 ⭐ Google' : 'Pizza napolitana, pastas y cócteles. 2° Top Pizza Chile · 4,8 ⭐ Google',
      images: ['/opengraph-image'],
    },
    alternates: {
      canonical: isEn ? 'https://dimoe.cl/en' : 'https://dimoe.cl',
      languages: { 'es': 'https://dimoe.cl', 'en': 'https://dimoe.cl/en' },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  };
}

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': 'https://dimoe.cl/#restaurant',
  name: 'DiMOE Pizzería Napolitana y Restobar',
  alternateName: 'DiMOE',
  description: 'Restaurante en Paine especializado en pizza napolitana cocinada en horno de leña, pastas artesanales elaboradas a diario y cócteles de autor. 2° lugar The Top Pizza Chile (Región Metropolitana) y 2° lugar Premio Maestro Pizzaiolo Soprole 2023. A 35 minutos de Santiago por la Ruta 5 Sur.',
  url: 'https://dimoe.cl',
  telephone: '+56973694101',
  email: 'contacto@dimoe.cl',
  image: ['https://dimoe.cl/opengraph-image', 'https://dimoe.cl/images/gs_fb_891682793088451_1440x1440.jpg', 'https://dimoe.cl/images/gs_fb_868552525401478_1440x1800.jpg'],
  priceRange: '$$',
  currenciesAccepted: 'CLP',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  servesCuisine: ['Italian', 'Neapolitan Pizza', 'Pasta', 'Pizza napolitana', 'Cocina italiana', 'Cócteles'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '200',
  },
  award: ['2° lugar The Top Pizza Chile — Región Metropolitana', '2° lugar Premio Maestro Pizzaiolo — Soprole 2023'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Darío Pavez 16, Champa',
    addressLocality: 'Paine',
    addressRegion: 'Región Metropolitana',
    postalCode: '9640000',
    addressCountry: 'CL',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -33.8555048, longitude: -70.7650772 },
  areaServed: [
    { '@type': 'City', name: 'Paine' },
    { '@type': 'City', name: 'Santiago' },
    { '@type': 'AdministrativeArea', name: 'Región Metropolitana' },
  ],
  hasMap: 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7',
  menu: 'https://dimoe.cl/carta',
  sameAs: [
    'https://instagram.com/dimoe_restobar',
    'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7',
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'], opens: '12:30', closes: '22:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '13:00', closes: '00:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '13:00', closes: '17:30' },
  ],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Estacionamiento gratuito', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Pet-friendly', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Opciones vegetarianas', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Terraza exterior', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Reservas por WhatsApp', value: true },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Dónde está DiMOE?',
      acceptedAnswer: { '@type': 'Answer', text: 'DiMOE está en Darío Pavez 16, Champa, Paine, Región Metropolitana de Chile — a 40 km al sur de Santiago, aproximadamente 35–40 minutos por la Ruta 5 Sur.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuáles son los horarios de DiMOE?',
      acceptedAnswer: { '@type': 'Answer', text: 'Martes a jueves: 12:30–22:30 · Viernes y sábado: 13:00–00:00 · Domingo: 13:00–17:30. Lunes cerrado.' },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se hace una reserva en DiMOE?',
      acceptedAnswer: { '@type': 'Answer', text: 'Puedes reservar por WhatsApp al +56 9 7369 4101 o completando el formulario de contacto en dimoe.cl. No se cobra seña.' },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de comida sirve DiMOE?',
      acceptedAnswer: { '@type': 'Answer', text: 'DiMOE sirve pizza napolitana cocinada en horno de leña, pastas artesanales elaboradas a diario con masa fresca y cócteles de autor. Todo con ingredientes frescos y recetas de inspiración italiana.' },
    },
    {
      '@type': 'Question',
      name: '¿DiMOE tiene estacionamiento?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí, DiMOE cuenta con estacionamiento amplio y gratuito frente al local.' },
    },
    {
      '@type': 'Question',
      name: '¿DiMOE acepta mascotas?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. La terraza exterior de DiMOE es pet-friendly.' },
    },
    {
      '@type': 'Question',
      name: '¿Qué reconocimientos tiene DiMOE?',
      acceptedAnswer: { '@type': 'Answer', text: 'DiMOE obtuvo el 2° lugar en The Top Pizza Chile (Región Metropolitana) y el 2° lugar en el Premio Maestro Pizzaiolo de Soprole (2023). Además, tiene una calificación de 4,8 sobre 5 estrellas en Google Maps.' },
    },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body style={{ margin: 0, minHeight: '100vh' }}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <WhatsAppFloat />
          <CookieBanner />
          <GoogleAnalytics />
          <MetaPixel />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
