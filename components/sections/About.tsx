'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const MAPS_LINK = 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';

const IconLeaf = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 22C7 22 3 17 3 11c0-5 4-9 9-9 5 0 9 4 9 9-2-1-4-1-6 0 2-2 2-5 0-7-3 4-4 8-3 12" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V14" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconAward = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="9" r="6" stroke="#C17A3B" strokeWidth="1.4"/>
    <path d="M9 21l3-3 3 3M8.5 15.5l-2 5.5M15.5 15.5l2 5.5" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M10 9l1.5 1.5L14 7" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPaw = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <ellipse cx="9" cy="6" rx="2" ry="2.5" stroke="#C17A3B" strokeWidth="1.4"/>
    <ellipse cx="15" cy="6" rx="2" ry="2.5" stroke="#C17A3B" strokeWidth="1.4"/>
    <ellipse cx="6" cy="11" rx="1.5" ry="2" stroke="#C17A3B" strokeWidth="1.4"/>
    <ellipse cx="18" cy="11" rx="1.5" ry="2" stroke="#C17A3B" strokeWidth="1.4"/>
    <path d="M12 10c-4 0-6 2-5 5.5 0.5 2 2 3.5 5 3.5s4.5-1.5 5-3.5C18 12 16 10 12 10z" stroke="#C17A3B" strokeWidth="1.4"/>
  </svg>
);

const IconFork = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M8 2v5c0 1.5 1 2.5 2.5 3V22M11 2v4M14 2v4" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M16 2c0 0 2 1.5 2 4s-2 4-2 4V22" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function About() {
  const t = useTranslations('about');

  const highlights = [
    { Icon: IconLeaf, title: t('h1_title'), desc: t('h1_desc') },
    { Icon: IconAward, title: t('h2_title'), desc: t('h2_desc') },
    { Icon: IconPaw, title: t('h3_title'), desc: t('h3_desc') },
    { Icon: IconFork, title: t('h4_title'), desc: t('h4_desc') },
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

        {/* Chef photo */}
        <motion.div initial={{ opacity: 0, scale: 1.03 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', height: 'clamp(320px, 40vw, 500px)', position: 'relative' }}
        >
          <Image src="/images/gs_fb_955131646743565_1440x1800.jpg" alt="Marisol Osorio, dueña y pizzaiola de DiMOE, estirando masa napolitana" fill style={{ objectFit: 'cover', objectPosition: 'center 25%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,11,9,0.5) 0%, transparent 50%)' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '12px', marginBottom: '12px' }}>
          {highlights.map((h, i) => (
            <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '24px' }}
            >
              <div style={{ width: '40px', height: '40px', background: 'rgba(193,122,59,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h.Icon />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#F2EDE4', margin: '14px 0 8px' }}>{h.title}</h3>
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
