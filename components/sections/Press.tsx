'use client';

import { motion } from 'framer-motion';

const VIDEOS = [
  {
    channel: 'Chilevision · 2026',
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
    channel: 'Chilevision · 2025',
    outlet: 'Sabingo',
    desc: 'La primera vez que Sabingo llegó a Paine buscando la mejor pizza.',
    href: 'https://www.instagram.com/reel/DPZe_1fEXVI/',
  },
];

const ARTICLES = [
  {
    outlet: 'The Top Chile 2025',
    year: '2025',
    quote: '«2° mejor pizza de la Región Metropolitana — con la Mechada e Cipolla.»',
    href: 'https://thetop.cl/post/mejores-pizzas-chile-2025/',
  },
  {
    outlet: 'Soprole Food Professionals',
    year: 'Maestri Pizzaioli 2023',
    quote: '«La combinación de ingredientes nobles y la técnica correcta — 3° lugar con Del Campo A Tu Mesa.»',
    href: 'https://comunidadsoprolefp.cl/marisol-osorio-presenta-del-campo-a-tu-mesa-maestri-pizzaioli-2023-soprole-food-professionals/',
  },
];

const MENTIONS = [
  { name: 'En Cancha', href: 'https://www.encancha.cl/enlahora/panoramas/2026/01/20/se-ubica-en-paine-esta-pizzeria-y-restobar-es-el-lugar-perfecto-para-ir-con-amigos-y-amigas-en-estas-vacaciones-de-verano/' },
  { name: 'Soy de Paine', href: 'https://soydepaine.cl/dimoe-pizzeria-y-restobar/' },
];

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
            Prensa & Premios
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2EDE4', margin: 0, lineHeight: 1.15 }}>
            DiMOE en los medios
          </h2>
        </motion.div>

        {/* TV appearances */}
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(155,139,126,0.6)', textTransform: 'uppercase', marginBottom: '14px' }}>
          En televisión
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '12px', marginBottom: '40px' }}>
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
              {/* Preview area — gradient always, no broken img */}
              <div style={{
                position: 'relative',
                height: '180px',
                background: 'radial-gradient(ellipse at 65% 35%, rgba(193,122,59,0.13) 0%, rgba(13,11,9,0) 68%), #111009',
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.055) 3px, rgba(0,0,0,0.055) 4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <motion.div
                  variants={{ hover: { scale: 1.1 } }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'rgba(193,122,59,0.14)',
                    border: '1.5px solid rgba(193,122,59,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#C17A3B" aria-hidden>
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </motion.div>
                <span style={{
                  position: 'absolute', top: '14px', left: '14px',
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em',
                  color: 'rgba(242,237,228,0.7)', textTransform: 'uppercase',
                  background: 'rgba(0,0,0,0.4)', borderRadius: '100px', padding: '4px 10px',
                }}>
                  {v.channel}
                </span>
              </div>

              <div style={{ padding: '20px 22px 22px', background: '#0D0B09', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 6px', lineHeight: 1.05 }}>
                  {v.outlet}
                </p>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(242,237,228,0.5)', margin: '0 0 18px', flex: 1 }}>
                  {v.desc}
                </p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: '#C17A3B' }}>
                  Ver segmento <ArrowIcon />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Awards & press */}
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(155,139,126,0.6)', textTransform: 'uppercase', marginBottom: '14px' }}>
          Premios & prensa escrita
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '12px', marginBottom: '28px' }}>
          {ARTICLES.map((art, i) => (
            <motion.a
              key={art.href}
              href={art.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '24px 26px', gap: '10px', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(193,122,59,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2520')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#F2EDE4', margin: 0, lineHeight: 1.2 }}>
                  {art.outlet}
                </p>
                <span style={{ fontSize: '11px', color: '#C17A3B', fontWeight: 600, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {art.year}
                </span>
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(242,237,228,0.55)', margin: 0, fontStyle: 'italic', flex: 1 }}>
                {art.quote}
              </p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 500, color: '#C17A3B', marginTop: '4px' }}>
                Ver publicación <ArrowIcon />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Minor mentions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <span style={{ fontSize: '12px', color: 'rgba(155,139,126,0.45)' }}>También en:</span>
          {MENTIONS.map((m, idx) => (
            <span key={m.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <a href={m.href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '12px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C17A3B')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
              >
                {m.name}
              </a>
              {idx < MENTIONS.length - 1 && <span style={{ color: 'rgba(155,139,126,0.25)' }}>·</span>}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
