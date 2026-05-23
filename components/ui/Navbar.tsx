'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Carta', href: '#menu' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        background: scrolled ? 'rgba(13,11,9,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid #2A2520' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#inicio" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '24px',
          fontWeight: 700,
          color: '#F2EDE4',
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}>
          DiMOE
        </a>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: '14px',
              color: 'rgba(242,237,228,0.7)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.7)')}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#C17A3B',
              color: '#F2EDE4',
              fontSize: '14px',
              fontWeight: 600,
              padding: '10px 22px',
              borderRadius: '100px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Reservar
          </a>
        </nav>
      </div>
    </header>
  );
}
