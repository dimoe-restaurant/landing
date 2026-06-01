'use client';

import { useEffect, useState } from 'react';

const CONSENT_KEY = 'dimoe_cookie_consent';

export type ConsentValue = 'all' | 'essential' | null;

export function getConsent(): ConsentValue {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem(CONSENT_KEY) as ConsentValue) ?? null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  function accept(value: 'all' | 'essential') {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    if (value === 'all') window.dispatchEvent(new Event('dimoe:consent-granted'));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 60,
        background: 'rgba(13,11,9,0.97)', borderTop: '1px solid #2A2520',
        backdropFilter: 'blur(12px)', padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '24px', flexWrap: 'wrap',
      }}
    >
      <p style={{ fontSize: '13px', color: '#9B8B7E', margin: 0, maxWidth: '620px', lineHeight: 1.6 }}>
        Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio.
        Al continuar, aceptas nuestra{' '}
        <a href="/privacidad" style={{ color: '#C17A3B', textDecoration: 'none' }}>
          política de privacidad
        </a>.
      </p>
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button
          onClick={() => accept('essential')}
          style={{
            background: 'transparent', border: '1px solid #2A2520', color: '#9B8B7E',
            padding: '9px 18px', borderRadius: '100px', fontSize: '13px',
            fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-sans)',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#9B8B7E'; e.currentTarget.style.color = '#F2EDE4'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2520'; e.currentTarget.style.color = '#9B8B7E'; }}
        >
          Solo esenciales
        </button>
        <button
          onClick={() => accept('all')}
          style={{
            background: '#C17A3B', border: 'none', color: '#F2EDE4',
            padding: '9px 20px', borderRadius: '100px', fontSize: '13px',
            fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Aceptar todo
        </button>
      </div>
    </div>
  );
}
