'use client';

import { useState, useEffect } from 'react';

const WHATSAPP_URL = 'https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva';

const links = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Carta', href: '#menu' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || mobileOpen;

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        background: solid ? 'rgba(13,11,9,0.95)' : 'transparent',
        borderBottom: `1px solid ${solid ? '#2A2520' : 'transparent'}`,
        backdropFilter: solid ? 'blur(12px)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
        height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#inicio" style={{
          fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700,
          color: '#F2EDE4', textDecoration: 'none', letterSpacing: '0.02em',
        }}>
          DiMOE
        </a>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{ fontSize: '14px', color: 'rgba(242,237,228,0.7)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.7)')}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#C17A3B', color: '#F2EDE4', fontSize: '14px', fontWeight: 600, padding: '10px 22px', borderRadius: '100px', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Reservar
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px',
            background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#F2EDE4',
          }}
        >
          <span style={{ width: '22px', height: '1.5px', background: '#F2EDE4', display: 'block', transition: 'transform 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
          <span style={{ width: '22px', height: '1.5px', background: '#F2EDE4', display: 'block', transition: 'opacity 0.25s', opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ width: '22px', height: '1.5px', background: '#F2EDE4', display: 'block', transition: 'transform 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="nav-mobile-panel" style={{ background: 'rgba(13,11,9,0.97)', borderTop: '1px solid #2A2520', padding: '16px 24px 24px' }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '14px 0', fontSize: '18px', color: 'rgba(242,237,228,0.75)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid #2A2520' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', background: '#C17A3B', color: '#F2EDE4', padding: '14px', borderRadius: '100px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}
          >
            Reservar por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
