'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { IconGlobe } from '@/components/ui/icons';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function switchLocale() {
    const next = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: next });
  }

  const WHATSAPP_URL = `https://wa.me/56973694101?text=${encodeURIComponent(
    locale === 'en' ? "Hello! I'd like to make a reservation" : 'Hola! Quiero hacer una reserva'
  )}`;

  const isHome = pathname === '/';

  // When not on home, anchor links need the full path prefix so the browser navigates there first
  function a(id: string) {
    if (isHome) return `#${id}`;
    return locale === 'en' ? `/en#${id}` : `/#${id}`;
  }

  const links = [
    { label: t('about'), href: a('nosotros') },
    { label: t('menu'), href: '/carta' },
    { label: t('reviews'), href: a('resenas') },
    { label: t('contact'), href: a('contacto') },
  ];

  const solid = scrolled || mobileOpen;

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'background 0.3s ease, border-color 0.3s ease',
      background: solid ? 'rgba(13,11,9,0.95)' : 'transparent',
      borderBottom: `1px solid ${solid ? '#2A2520' : 'transparent'}`,
      backdropFilter: solid ? 'blur(12px)' : 'none',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href={a('inicio')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', lineHeight: 0 }}>
          <img src="/images/logo-transparent.png" alt="DiMOE Pizzería y Restobar" style={{ height: '38px', width: 'auto', display: 'block', filter: 'brightness(1.15)' }} />
        </a>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{ fontSize: '14px', color: 'rgba(242,237,228,0.7)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.7)')}
            >
              {l.label}
            </a>
          ))}

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            style={{
              background: 'none', border: '1px solid rgba(242,237,228,0.2)', color: 'rgba(242,237,228,0.6)',
              padding: '5px 12px 5px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.05em', transition: 'border-color 0.2s, color 0.2s',
              fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', gap: '5px',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C17A3B'; e.currentTarget.style.color = '#C17A3B'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(242,237,228,0.2)'; e.currentTarget.style.color = 'rgba(242,237,228,0.6)'; }}
          >
            <IconGlobe size={13} />
            {locale === 'es' ? 'EN' : 'ES'}
          </button>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            style={{ background: '#C17A3B', color: '#F2EDE4', fontSize: '14px', fontWeight: 600, padding: '10px 22px', borderRadius: '100px', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {t('reserve')}
          </a>
        </nav>

        {/* Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="nav-hamburger"
            onClick={switchLocale}
            style={{ background: 'none', border: '1px solid rgba(242,237,228,0.2)', color: 'rgba(242,237,228,0.6)', padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
          >
            {locale === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#F2EDE4' }}
          >
            <span style={{ width: '22px', height: '1.5px', background: '#F2EDE4', display: 'block', transition: 'transform 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#F2EDE4', display: 'block', transition: 'opacity 0.25s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ width: '22px', height: '1.5px', background: '#F2EDE4', display: 'block', transition: 'transform 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="nav-mobile-panel" style={{ background: 'rgba(13,11,9,0.97)', borderTop: '1px solid #2A2520', padding: '16px 24px 24px' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '14px 0', fontSize: '18px', color: 'rgba(242,237,228,0.75)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid #2A2520' }}
            >
              {l.label}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', background: '#C17A3B', color: '#F2EDE4', padding: '14px', borderRadius: '100px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}
          >
            {t('reserve')}
          </a>
        </div>
      )}
    </header>
  );
}
