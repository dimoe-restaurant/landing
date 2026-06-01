import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import CookieBanner from "@/components/ui/CookieBanner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DiMOE — Pizzería Napolitana y Restobar | Paine, Chile",
  description:
    "Pizza napolitana con ingredientes frescos, pastas artesanales y cócteles de autor. A 35 minutos de Santiago, en Paine. 2° Top Chile 2025. Reserva tu mesa.",
  keywords: ["pizzería", "pizza napolitana", "Paine", "Chile", "restobar", "pasta", "cócteles", "Santiago", "restaurante"],
  authors: [{ name: "DiMOE" }],
  openGraph: {
    title: "DiMOE — Pizzería Napolitana y Restobar",
    description: "Pizza napolitana, pastas artesanales y cócteles. 2° Top Chile 2025. A 35 minutos de Santiago, en Paine.",
    url: "https://dimoe.cl",
    siteName: "DiMOE",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DiMOE — Pizzería Napolitana y Restobar | Paine",
    description: "Pizza napolitana, pastas y cócteles. 2° Top Chile 2025.",
  },
  alternates: {
    canonical: "https://dimoe.cl",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body style={{ margin: 0, minHeight: "100vh" }}>
        <Navbar />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
