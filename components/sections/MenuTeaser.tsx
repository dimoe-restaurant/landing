'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

// SVG icons — thin-stroke gold, conectados a la identidad del local
const IconFlame = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 2c-1 2.5-3 4-3 7 0 1.5.5 2.5 1 3-.5-1.5 0-3 1-4 0 2.5 2 4.5 2 7a4 4 0 01-8 0c0-5 4-8 4-12 1 2 3 3 3 4 1-2 0-5 0-5z" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBowl = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 9h14l-1.5 7a2 2 0 01-2 1.7H8.5a2 2 0 01-2-1.7L5 9z" stroke="#C17A3B" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M3 9h18" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M9 6c0-1.5.8-2.5 0-4M12 6c0-1.5.8-2.5 0-4M15 6c0-1.5.8-2.5 0-4" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconDrop = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3L17.5 12.5a6 6 0 11-11 0L12 3z" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 14.5a3 3 0 01-2 2.5" stroke="#C17A3B" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const IconStar = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.2l-6.2 4.1 2.4-7.4L2 9.4h7.6z" stroke="#C17A3B" strokeWidth="1.4" strokeLinejoin="round"/>
  </svg>
);

const HIGHLIGHTS = [
  {
    key: 'pizzas',
    Icon: IconFlame,
    label: 'Pizzas',
    headline: 'Queen Margherita · Catalina · Veracruz',
    body: 'Masa fermentada 48 horas. Horno de piedra a 450°C. Italianas, biancas y clásicas. La diferencia está en la base.',
    photo: '/images/menu-pizzas-mechada.jpg',
    photoPos: 'center 45%',
  },
  {
    key: 'fondos',
    Icon: IconBowl,
    label: 'Fondos',
    headline: 'Risotto · Lasagna · Pappardelle',
    body: 'Especialidades de la casa que la gente vuelve a pedir. Cada plato cocinado al momento, sin atajos.',
    photo: '/images/menu-fondos-lasagna.jpg',
    photoPos: 'center 45%',
  },
  {
    key: 'bar',
    Icon: IconDrop,
    label: 'Bar',
    headline: 'Spritz · Sours · Coctelería clásica',
    body: 'Cócteles de autor y clásicos italianos ejecutados con cuidado. El Negroni que merecías. Happy Hour Mar–Vie.',
    photo: '/images/DSC02288.jpg',
    photoPos: 'center 55%',
  },
  {
    key: 'postres',
    Icon: IconStar,
    label: 'Postres',
    headline: 'Tiramisú · Panna Cotta · Pizza Dolce',
    body: 'El Tiramisú Pistacchio es el que se roba la noche. Siempre hay algo dulce para cerrar bien.',
    photo: '/images/menu-postres-tiramisu-pistacho.jpg',
    photoPos: 'center 60%',
  },
];

export default function MenuTeaser() {
  const t = useTranslations('menu');
  const locale = useLocale();

  return (
    <section id="menu" style={{ background: '#181310', padding: 'clamp(64px, 8vw, 96px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '48px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '12px' }}>{t('label')}</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.1, color: '#F2EDE4', margin: 0 }}>{t('headline')}</h2>
          </div>
          <Link href="/carta"
            style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid #C17A3B', color: '#C17A3B', padding: '10px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background 0.2s, color 0.2s' }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = '#C17A3B'; e.currentTarget.style.color = '#F2EDE4'; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C17A3B'; }}
          >
            {t('cta')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>

        {/* 4 cards — altura uniforme via grid stretch + flex column */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '12px', marginBottom: '32px', alignItems: 'stretch' }}>
          {HIGHLIGHTS.map((h, i) => (
            <motion.div key={h.key}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ height: '100%' }}
            >
              <Link href={`/carta#${h.key}`} style={{
                position: 'relative', display: 'flex', flexDirection: 'column', textDecoration: 'none',
                background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', overflow: 'hidden',
                padding: '24px', height: '100%', transition: 'border-color 0.2s',
              }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.borderColor = 'rgba(193,122,59,0.4)')}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.borderColor = '#2A2520')}
              >
                <Image src={h.photo} alt="" fill aria-hidden
                  sizes="(max-width: 767px) 100vw, 280px"
                  style={{ objectFit: 'cover', objectPosition: h.photoPos, zIndex: 0 }}
                />
                <div aria-hidden style={{
                  position: 'absolute', inset: 0, zIndex: 1,
                  background: 'linear-gradient(180deg, rgba(13,11,9,0.35) 0%, rgba(13,11,9,0.88) 65%, #0D0B09 100%)',
                }} />
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ marginBottom: '16px' }}><h.Icon /></div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 6px' }}>{h.label}</h3>
                  <p style={{ fontSize: '12px', fontWeight: 500, color: '#C17A3B', margin: '0 0 10px', lineHeight: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.headline}</p>
                  <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#9B8B7E', margin: 0, flex: 1 }}>{h.body}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: 'clamp(18px, 2.5vw, 24px) clamp(20px, 3vw, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(16px, 2vw, 19px)', fontWeight: 700, color: '#F2EDE4', margin: '0 0 4px' }}>
              {t('order_q')}
            </p>
            <p style={{ fontSize: '13px', color: '#9B8B7E', margin: 0 }}>
              {t('order_title')}
            </p>
          </div>
          <a href={process.env.NEXT_PUBLIC_MENU_PDF_URL ?? 'https://linktr.ee/di_moe'} target="_blank" rel="noopener noreferrer"
            style={{ flexShrink: 0, fontSize: '14px', fontWeight: 500, color: '#C17A3B', textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            {t('order_cta')}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
