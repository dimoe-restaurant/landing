'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const stats = [
  { value: '48h', label: 'Fermentación de masa' },
  { value: '450°C', label: 'Horno de leña' },
  { value: '2°', label: 'Top Chile 2025' },
];

const tags = ['Pet-friendly', 'Vegetariano, vegano y carnes', '35 min de Santiago'];

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="nosotros" style={{ background: '#181310', padding: 'clamp(64px, 8vw, 96px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
        }}>

          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ borderRadius: '16px', overflow: 'hidden', height: 'clamp(380px, 52vw, 560px)', position: 'relative', flexShrink: 0 }}
          >
            <Image
              src="/images/landing-actual-3.jpg"
              alt="Marisol Osorio, pizzaiola de DiMOE, lanzando masa napolitana"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
              sizes="(max-width: 900px) 100vw, 550px"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,11,9,0.45) 0%, transparent 55%)' }} />
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <p className="eyebrow" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('label')}
            </p>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.8vw, 48px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: '0 0 20px', letterSpacing: '-0.01em' }}>
              {t('headline1')}<br />{t('headline2')}
            </h2>

            <p style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.75, color: 'rgba(242,237,228,0.55)', margin: '0 0 24px' }}>
              {t('body')}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              {tags.map(tag => (
                <span key={tag} style={{ fontSize: '12px', color: '#9B8B7E', background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '100px', padding: '5px 14px' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Award badge */}
            <a
              href="https://thetop.cl/post/mejores-pizzas-chile-2025/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,122,59,0.07)', border: '1px solid rgba(193,122,59,0.28)', borderRadius: '100px', padding: '8px 18px', marginBottom: '36px', alignSelf: 'flex-start', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(193,122,59,0.14)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(193,122,59,0.07)')}
            >
              <span style={{ fontSize: '13px' }}>🏆</span>
              <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', color: '#C17A3B' }}>2° Mejor Restaurante · Top Chile 2025 →</span>
            </a>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', paddingTop: '28px', borderTop: '1px solid #2A2520' }}>
              {stats.map(s => (
                <div key={s.value}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 700, color: '#C17A3B', margin: '0 0 4px', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: '12px', color: '#9B8B7E', margin: 0, lineHeight: 1.5 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
