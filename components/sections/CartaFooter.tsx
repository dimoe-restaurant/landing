'use client';

import { IconWhatsApp, IconEmail } from '@/components/ui/icons';

export default function CartaFooter() {
  return (
    <footer style={{ background: '#0D0B09', borderTop: '1px solid #2A2520', padding: '16px clamp(16px, 4vw, 24px)' }}>
      <div style={{
        maxWidth: '860px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: 'nowrap', gap: 'clamp(10px, 3vw, 24px)', overflowX: 'auto',
      }}>
        <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 700, color: '#F2EDE4', textDecoration: 'none', flexShrink: 0 }}>
          DiMOE
        </a>
        <a href="mailto:contacto@dimoe.cl" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
          onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
        >
          <IconEmail size={13} /> contacto@dimoe.cl
        </a>
        <a href="https://wa.me/56973694101" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
          onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
        >
          <IconWhatsApp size={13} /> +56 9 7369 4101
        </a>
      </div>
    </footer>
  );
}
