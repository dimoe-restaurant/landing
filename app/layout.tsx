import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DiMOE — Pizzería Napolitana y Restobar | Paine, Chile',
  description:
    'Pizza napolitana con ingredientes frescos, pastas artesanales y cócteles de autor. A 35 minutos de Santiago, en Paine. 2° Top Chile 2025. Reserva tu mesa.',
  keywords: ['pizzería', 'pizza napolitana', 'Paine', 'Chile', 'restobar', 'pasta', 'cócteles', 'Santiago', 'restaurante'],
  authors: [{ name: 'DiMOE' }],
  openGraph: {
    title: 'DiMOE — Pizzería Napolitana y Restobar',
    description: 'Pizza napolitana, pastas artesanales y cócteles. 2° Top Chile 2025. A 35 minutos de Santiago, en Paine.',
    url: 'https://dimoe.cl',
    siteName: 'DiMOE',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: 'https://dimoe.cl/og-image.jpg', width: 1200, height: 630, alt: 'DiMOE Pizzería Napolitana y Restobar — Paine, Chile' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiMOE — Pizzería Napolitana y Restobar | Paine',
    description: 'Pizza napolitana, pastas y cócteles. 2° Top Chile 2025.',
    images: ['https://dimoe.cl/og-image.jpg'],
  },
  alternates: { canonical: 'https://dimoe.cl' },
  robots: { index: true, follow: true },
};

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
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Darío Pavez 16, Champa',
    addressLocality: 'Paine',
    addressRegion: 'Región Metropolitana',
    addressCountry: 'CL',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -33.8555048, longitude: -70.7650772 },
  hasMap: 'https://www.google.com/maps/place/DiMOE+Pizzer%C3%ADa+y+Restobar/@-33.8555048,-70.7650772,18z',
  menu: 'https://linktr.ee/di_moe',
  sameAs: ['https://instagram.com/dimoe_restobar', 'https://www.google.com/maps/place/DiMOE+Pizzer%C3%ADa+y+Restobar/@-33.8555048,-70.7650772,18z'],
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body style={{ margin: 0, minHeight: '100vh' }}>
        <Navbar />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
