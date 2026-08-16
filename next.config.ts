import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Inventario de dominios externos que carga el navegador (no server-side: Notion,
// Resend, Vercel Blob y la Places API de Google se llaman desde las API routes, no
// desde el cliente, así que no entran acá). GA4, Meta Pixel y Turnstile se activan
// solo si su env var pública está seteada, pero se allowlistean igual porque el
// código ya los soporta. Fuentes van por next/font/google (self-hosted en build),
// por eso no hace falta fonts.googleapis.com/fonts.gstatic.com en runtime.
//
// Report-Only a propósito: este proyecto no tiene ambiente de staging (dev.dimoe.cl
// ES producción, ver CLAUDE.md), así que no hay forma de probar una CSP enforcing
// sin arriesgar romper GA4/Turnstile/Meta Pixel en el sitio real. Cuando se confirme
// unas semanas sin violaciones reales (DevTools de usuarios reales o un endpoint de
// report-uri), pasar a Content-Security-Policy sin -Report-Only.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com https://www.facebook.com",
  "frame-src https://challenges.cloudflare.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Content-Security-Policy-Report-Only', value: CSP },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
