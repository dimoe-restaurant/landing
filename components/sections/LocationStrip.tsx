'use client';

import { useTranslations } from 'next-intl';

const MAPS_LINK = 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';

export default function LocationStrip() {
  const t = useTranslations('contact');
  const waUrl = `https://wa.me/56973694101?text=${encodeURIComponent(t('wa_message'))}`;

  return (
    <div style={{
      background: '#0D0B09',
      borderTop: '1px solid #2A2520',
      borderBottom: '1px solid #2A2520',
      padding: '18px clamp(16px, 4vw, 24px)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '14px',
      }}>
        {/* Address */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" aria-hidden>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontSize: '13px', color: '#9B8B7E' }}>
            Darío Pavez 16, Champa, Paine
            <span style={{ color: 'rgba(155,139,126,0.4)', margin: '0 8px' }}>·</span>
            35 min de Santiago
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '13px', fontWeight: 500, color: '#F2EDE4',
              border: '1px solid #3A3028', borderRadius: '100px',
              padding: '7px 16px', textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C17A3B'; e.currentTarget.style.color = '#C17A3B'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#3A3028'; e.currentTarget.style.color = '#F2EDE4'; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            ¿Cómo llegar?
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '13px', fontWeight: 600, color: '#F2EDE4',
              background: '#C17A3B', borderRadius: '100px',
              padding: '7px 18px', textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Reservar mesa
          </a>
        </div>
      </div>
    </div>
  );
}
