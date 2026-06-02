'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const MAPS_LINK = 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';

export default function About() {
  const t = useTranslations('about');

  const highlights = [
    { icon: '🌿', title: t('h1_title'), desc: t('h1_desc') },
    { icon: '🏆', title: t('h2_title'), desc: t('h2_desc') },
    { icon: '🐶', title: t('h3_title'), desc: t('h3_desc') },
    { icon: '🥗', title: t('h4_title'), desc: t('h4_desc') },
  ];

  return (
    <section id="nosotros" style={{ background: '#181310', padding: 'clamp(64px, 8vw, 96px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="eyebrow" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>{t('label')}</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: '0 0 20px', letterSpacing: '-0.01em' }}>
            {t('headline1')}<br />{t('headline2')}
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.7, color: 'rgba(242,237,228,0.55)', maxWidth: '600px', margin: '0 auto' }}>{t('body')}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '12px', marginBottom: '12px' }}>
          {highlights.map((h, i) => (
            <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '24px' }}
            >
              <span style={{ fontSize: '28px', lineHeight: 1 }}>{h.icon}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#F2EDE4', margin: '16px 0 8px' }}>{h.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9B8B7E', margin: 0 }}>{h.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: 'clamp(20px, 3vw, 24px) clamp(20px, 3vw, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(17px, 2vw, 20px)', fontWeight: 700, color: '#F2EDE4', margin: '0 0 4px' }}>{t('banner_title')}</p>
            <p style={{ fontSize: '14px', color: '#9B8B7E', margin: 0 }}>{t('banner_desc')}</p>
          </div>
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
            style={{ flexShrink: 0, border: '1px solid #C17A3B', color: '#C17A3B', padding: '10px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            {t('directions')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
