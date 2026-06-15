'use client';

import { motion } from 'framer-motion';

type PressItem = {
  type: 'article' | 'video';
  outlet: string;
  channel?: string;
  title: string;
  date?: string;
  href: string;
};

const PRESS: PressItem[] = [
  {
    type: 'video',
    outlet: 'Sabingo',
    channel: 'Mega TV',
    title: 'DiMOE en el programa más visto del fin de semana chileno',
    href: 'https://www.facebook.com/watch/?v=1517782482512425',
  },
  {
    type: 'video',
    outlet: 'Sabingo',
    channel: 'Mega TV · Segunda visita',
    title: 'Volvieron a Paine — y volvieron a DiMOE',
    href: 'https://www.instagram.com/reel/DPZe_1fEXVI/',
  },
  {
    type: 'video',
    outlet: 'Sergio Lagos',
    channel: 'Visita especial',
    title: 'El conductor pasó por DiMOE y lo contó',
    href: 'https://www.instagram.com/dimoe_restobar/reel/C6g1T9su9hx/',
  },
  {
    type: 'article',
    outlet: 'En Cancha',
    title: '«El lugar perfecto para ir con amigos en estas vacaciones de verano»',
    date: 'Enero 2026',
    href: 'https://www.encancha.cl/enlahora/panoramas/2026/01/20/se-ubica-en-paine-esta-pizzeria-y-restobar-es-el-lugar-perfecto-para-ir-con-amigos-y-amigas-en-estas-vacaciones-de-verano/',
  },
  {
    type: 'article',
    outlet: 'Soy de Paine',
    title: '«Una auténtica experiencia italiana en el corazón de Paine»',
    href: 'https://soydepaine.cl/dimoe-pizzeria-y-restobar/',
  },
];

const IconPlay = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

const IconArticle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
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
            Prensa
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2EDE4', margin: 0, lineHeight: 1.15 }}>
            Cuando Paine sale en televisión
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '12px' }}>
          {PRESS.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                background: '#0D0B09',
                border: '1px solid #2A2520',
                borderRadius: '16px',
                padding: '28px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(193,122,59,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2520')}
            >
              {/* Type badge + outlet */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em',
                    color: item.type === 'video' ? '#C17A3B' : '#9B8B7E',
                    background: item.type === 'video' ? 'rgba(193,122,59,0.1)' : 'rgba(155,139,126,0.1)',
                    border: `1px solid ${item.type === 'video' ? 'rgba(193,122,59,0.25)' : 'rgba(155,139,126,0.2)'}`,
                    borderRadius: '100px',
                    padding: '3px 10px 3px 7px',
                    textTransform: 'uppercase',
                  }}>
                    {item.type === 'video' ? <IconPlay /> : <IconArticle />}
                    {item.type === 'video' ? 'Video' : 'Nota'}
                  </span>
                </div>
                {item.date && (
                  <span style={{ fontSize: '12px', color: 'rgba(155,139,126,0.6)' }}>{item.date}</span>
                )}
              </div>

              {/* Outlet name */}
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: item.type === 'video' ? '26px' : '18px',
                fontWeight: 700,
                color: '#F2EDE4',
                margin: '0 0 4px',
                lineHeight: 1.1,
              }}>
                {item.outlet}
              </p>

              {item.channel && (
                <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', color: '#C17A3B', textTransform: 'uppercase', margin: '0 0 14px' }}>
                  {item.channel}
                </p>
              )}

              {/* Title */}
              <p style={{
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'rgba(242,237,228,0.55)',
                margin: item.channel ? '0 0 24px' : '14px 0 24px',
                flex: 1,
              }}>
                {item.title}
              </p>

              {/* CTA */}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: '#C17A3B' }}>
                {item.type === 'video' ? 'Ver segmento' : 'Leer nota'}
                <IconArrow />
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
