'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getConsent } from '@/components/ui/CookieBanner';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (getConsent() === 'all') setEnabled(true);

    function handleConsent() { setEnabled(true); }
    window.addEventListener('dimoe:consent-granted', handleConsent);
    return () => window.removeEventListener('dimoe:consent-granted', handleConsent);
  }, []);

  if (!GA_ID || !enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
