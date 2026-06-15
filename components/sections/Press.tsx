'use client';

import { motion } from 'framer-motion';

const VIDEOS = [
  {
    channel: 'Mega TV · 2026',
    outlet: 'Sabingo',
    desc: 'El equipo de Sabingo volvió a Paine — y volvió a DiMOE.',
    href: 'https://www.facebook.com/watch/?v=1517782482512425',
  },
  {
    channel: 'Visita especial',
    outlet: 'Sergio Lagos',
    desc: 'El conductor pasó por DiMOE y lo compartió con sus seguidores.',
    href: 'https://www.instagram.com/dimoe_restobar/reel/C6g1T9su9hx/',
  },
  {
    channel: 'Mega TV · 2025',
    outlet: 'Sabingo',
    desc: 'La primera vez que Sabingo llegó a Paine buscando la mejor pizza.',
    href: 'https://www.instagram.com/reel/DPZe_1fEXVI/',
  },
];

const MENTIONS = [
  { name: 'En Cancha', href: 'https://www.encancha.cl/enlahora/panoramas/2026/01/20/se-ubica-en-paine-esta-pizzeria-y-restobar-es-el-lugar-perfecto-para-ir-con-amigos-y-amigas-en-estas-vacaciones-de-verano/' },
  { name: 'Soy de Paine', href: 'https://soydepaine.cl/dimoe-pizzeria-y-restobar/' },
];

export default function Press() {
  return (
    <section id="prensa" style={{ background: '#181310', padding: 'clamp(64px, 8vw, 96px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '12px' }}>
            Prensa
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2EDE4', margin: 0, lineHeight: 1.15 }}>
            Cuando Paine sale en televisión
          </h2>
        </motion.div>

        {/* 3 video cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '12px', marginBottom: '28px' }}>
          {VIDEOS.map((v, i) => (
            <motion.a
              key={v.href}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover="hover"
              style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2A2520', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(193,122,59,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2520')}
            >
              {/* Preview area */}
              <div style={{
                position: 'relative',
                background: 'radial-gradient(ellipse at 60% 40%, rgba(193,122,59,0.12) 0%, rgba(13,11,9,0.0) 70%), #111009',
                height: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '16px',
              }}>
                {/* Scanline texture overlay */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
                }} />
                {/* Play button */}
                <motion.div
                  variants={{ hover: { scale: 1.12 } }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: '52px', height: '52px', borderRadius: '50%',
                    background: 'rgba(193,122,59,0.15)',
                    border: '1.5px solid rgba(193,122,59,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#C17A3B" aria-hidden>
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </motion.div>
                {/* Channel badge */}
                <span style={{
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em',
                  color: 'rgba(193,122,59,0.8)', textTransform: 'uppercase',
                  position: 'relative', zIndex: 1,
                }}>
                  {v.channel}
                </span>
              </div>

              {/* Info area */}
              <div style={{ padding: '22px 24px 24px', background: '#0D0B09', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#F2EDE4',
                  margin: '0 0 8px',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                }}>
                  {v.outlet}
                </p>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(242,237,228,0.5)', margin: '0 0 20px', flex: 1 }}>
                  {v.desc}
                </p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: '#C17A3B' }}>
                  Ver segmento
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Secondary mentions strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <span style={{ fontSize: '12px', color: 'rgba(155,139,126,0.5)', letterSpacing: '0.04em' }}>También en:</span>
          {MENTIONS.map((m, i) => (
            <span key={m.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <a href={m.href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '12px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C17A3B')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
              >
                {m.name}
              </a>
              {i < MENTIONS.length - 1 && <span style={{ color: 'rgba(155,139,126,0.3)', fontSize: '12px' }}>·</span>}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
