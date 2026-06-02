'use client';

import { useTranslations } from 'next-intl';

const year = new Date().getFullYear();

export default function Footer() {
  const t = useTranslations('footer');

  const navLinks = [
    { href: '#inicio', label: t('home') },
    { href: '#nosotros', label: t('about') },
    { href: '#menu', label: t('menu') },
    { href: '#resenas', label: t('reviews') },
    { href: '#contacto', label: t('contact') },
  ];

  const socialLinks = [
    { href: 'https://instagram.com/dimoe_restobar', text: '@dimoe_restobar' },
    { href: 'https://wa.me/56973694101', text: '+56 9 7369 4101' },
    { href: 'mailto:contacto@dimoe.cl', text: 'contacto@dimoe.cl' },
  ];

  return (
    <footer style={{ background: '#0D0B09', borderTop: '1px solid #2A2520', padding: 'clamp(40px, 6vw, 48px) clamp(16px, 4vw, 24px)' }}>
      <div className="footer-inner" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 4px' }}>DiMOE</p>
          <p style={{ fontSize: '13px', color: '#9B8B7E', margin: '0 0 2px' }}>{t('tagline')}</p>
          <p style={{ fontSize: '12px', color: 'rgba(155,139,126,0.6)', margin: 0 }}>{t('location')}</p>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: '14px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {socialLinks.map(l => (
            <a key={l.text} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '14px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
            >
              {l.text}
            </a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '32px auto 0', borderTop: '1px solid #2A2520', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '12px', color: 'rgba(155,139,126,0.6)' }}>
        <span>© {year} DiMOE. {t('copyright')}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <a href="/privacidad" style={{ color: 'rgba(155,139,126,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C17A3B')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(155,139,126,0.6)')}
        >
          {t('privacy')}
        </a>
      </div>
    </footer>
  );
}
