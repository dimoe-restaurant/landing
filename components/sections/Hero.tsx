'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
        overflow: 'hidden',
        background: '#0D0B09',
      }}
    >
      {/* Background gradient layers */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61,26,8,0.7) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 40% 30% at 50% 100%, rgba(193,122,59,0.08) 0%, transparent 70%)',
      }} />

      {/* Decorative grain texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 10, maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
      >
        {/* Top rule + eyebrow */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          style={{ width: '48px', height: '1px', background: '#C17A3B' }}
        />
        <p style={{
          fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em',
          color: '#C17A3B', textTransform: 'uppercase', margin: 0,
        }}>
          Paine · Chile &nbsp;·&nbsp; Pizzería Napolitana &nbsp;·&nbsp; 2° Top Chile 2025
        </p>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(48px, 7vw, 84px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: '#F2EDE4',
          margin: '8px 0 0',
          letterSpacing: '-0.01em',
        }}>
          La auténtica pizza{' '}
          <em style={{ fontStyle: 'italic', color: '#C17A3B' }}>napolitana,</em>
          <br />
          a minutos de Santiago
        </h1>

        {/* Subline */}
        <p style={{
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          lineHeight: 1.65,
          color: 'rgba(242,237,228,0.62)',
          maxWidth: '560px',
          margin: '4px 0 0',
        }}>
          Masa de fermentación lenta, ingredientes frescos y cócteles de autor.
          Para reunirte con quien más querés, en un lugar que lo vale.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: '#C17A3B', color: '#F2EDE4',
              padding: '14px 32px', borderRadius: '100px',
              fontSize: '14px', fontWeight: 600, textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            Reservar mesa
          </a>
          <a
            href="#menu"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', color: '#F2EDE4',
              border: '1px solid rgba(242,237,228,0.2)',
              padding: '14px 32px', borderRadius: '100px',
              fontSize: '14px', fontWeight: 600, textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            Ver la carta
          </a>
        </div>

        {/* Hours */}
        <p style={{
          fontSize: '12px', color: '#9B8B7E', marginTop: '8px',
          letterSpacing: '0.02em',
        }}>
          Mar–Jue 12:30–22:30 &nbsp;·&nbsp; Vie–Sáb 13:00–00:00 &nbsp;·&nbsp; Dom 13:00–17:30
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#9B8B7E', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #C17A3B, transparent)' }}
        />
      </motion.div>
    </section>
  );
}
