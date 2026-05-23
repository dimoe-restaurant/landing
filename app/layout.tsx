import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
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
    "Pizza napolitana con ingredientes frescos, pastas artesanales y cócteles. A 35 minutos de Santiago, en Paine. Reserva tu mesa.",
  openGraph: {
    title: "DiMOE — Pizzería Napolitana y Restobar",
    description: "Pizza napolitana, pastas y cócteles en Paine, Chile.",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body style={{ margin: 0, minHeight: '100vh' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
