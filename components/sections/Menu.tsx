'use client';

import { motion } from 'framer-motion';

// Actualizar con URL del PDF de carta cuando esté disponible
const MENU_PDF_URL = process.env.NEXT_PUBLIC_MENU_PDF_URL ?? 'https://linktr.ee/di_moe';

const categories = [
  { emoji: '🍕', name: 'Pizzas', desc: 'Masa de fermentación lenta, horno de piedra. Napolitanas y al molde.' },
  { emoji: '🍝', name: 'Pastas', desc: 'Recetas artesanales con salsas preparadas al momento.' },
  { emoji: '🍹', name: 'Cócteles', desc: 'De autor y clásicos italianos. El Negroni que esperabas.' },
  { emoji: '🥗', name: 'Más', desc: 'Entradas, ensaladas, postres y opciones vegetarianas y veganas.' },
];

export default function Menu() {
  return (
    <section id="menu" style={{ background: '#0D0B09', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '12px' }}>
              La carta
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: 0, letterSpacing: '-0.01em' }}>
              Para todos los gustos
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href={MENU_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flexShrink: 0, background: '#C17A3B', color: '#F2EDE4', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Ver carta completa →
          </motion.a>
        </div>

        <div style={{ height: '1px', background: '#2A2520', marginBottom: '40px' }} />

        {/* Category cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '14px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}
            >
              <span style={{ fontSize: '36px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{cat.emoji}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 8px' }}>{cat.name}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9B8B7E', margin: 0 }}>{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Online order callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: '24px', background: '#181310', border: '1px solid rgba(193,122,59,0.25)', borderRadius: '14px', padding: '24px 32px', textAlign: 'center' }}
        >
          <p style={{ fontSize: '14px', color: '#9B8B7E', margin: '0 0 4px' }}>¿No podés venir hoy?</p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 12px' }}>
            Pedí online y retirá en local
          </p>
          <a
            href={MENU_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '14px', fontWeight: 500, color: '#C17A3B', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Ver la carta →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
