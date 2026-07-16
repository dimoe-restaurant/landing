'use client';

import { IconWhatsApp, IconEmail } from '@/components/ui/icons';

export default function CartaFooter() {
  return (
    <footer style={{ background: '#0D0B09', borderTop: '1px solid #2A2520', padding: '20px clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#F2EDE4' }}>DiMOE</span>
        <a href="mailto:contacto@dimoe.cl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
          onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
        >
          <IconEmail size={14} /> contacto@dimoe.cl
        </a>
        <a href="https://wa.me/56973694101" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
          onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
        >
          <IconWhatsApp size={14} /> +56 9 7369 4101
        </a>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <a href="/privacidad" style={{ fontSize: '11px', color: 'rgba(155,139,126,0.5)', textDecoration: 'none' }}>
          Privacidad
        </a>
      </div>
    </footer>
  );
}
