'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const CONSENT_KEY = 'dimoe_cookie_consent';
export type ConsentValue = 'all' | 'essential' | null;

export function getConsent(): ConsentValue {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem(CONSENT_KEY) as ConsentValue) ?? null;
}

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => { if (!getConsent()) setVisible(true); }, []);

  function accept(value: 'all' | 'essential') {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    if (value === 'all') window.dispatchEvent(new Event('dimoe:consent-granted'));
    else document.dispatchEvent(new Event('dimoe:consent-essential'));
  }

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie notice" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 60, background: 'rgba(13,11,9,0.97)', borderTop: '1px solid #2A2520', backdropFilter: 'blur(12px)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
      <p style={{ fontSize: '11.5px', color: '#9B8B7E', margin: 0, maxWidth: '620px', lineHeight: 1.4 }}>
        {t('text')}{' '}<a href="/privacidad" style={{ color: '#C17A3B', textDecoration: 'none' }}>{t('policy')}</a>.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button onClick={() => accept('essential')} style={{ background: 'transparent', border: '1px solid #2A2520', color: '#9B8B7E', padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-sans)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#9B8B7E'; e.currentTarget.style.color = '#F2EDE4'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2520'; e.currentTarget.style.color = '#9B8B7E'; }}>
          {t('essential')}
        </button>
        <button onClick={() => accept('all')} style={{ background: '#C17A3B', border: 'none', color: '#F2EDE4', padding: '6px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }} onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
