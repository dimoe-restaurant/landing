'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

const HIGHLIGHTS = [
  {
    key: 'pizzas',
    icon: '🍕',
    label: 'Pizzas',
    headline: 'Queen Margherita, Mortadella e Pistacchio, Catalina...',
    body: 'Masa fermentada 48 horas. Horno de piedra a 450°C. Italianas, biancas y clásicas. La diferencia está en la base.',
  },
  {
    key: 'fondos',
    icon: '🍝',
    label: 'Fondos',
    headline: 'Risotto, Lasagna, Pappardelle...',
    body: 'Especialidades de la casa que la gente vuelve a pedir. Cada plato cocinado al momento, sin atajos.',
  },
  {
    key: 'bar',
    icon: '🍹',
    label: 'Bar',
    headline: 'Spritz, Sours, Coctelería clásica...',
    body: 'Cócteles de autor y clásicos italianos ejecutados con cuidado. El Negroni que merecías. Happy Hour Mar–Vie.',
  },
  {
    key: 'postres',
    icon: '🍮',
    label: 'Postres',
    headline: 'Tiramisú, Panna Cotta, Pizza Dolce...',
    body: 'El Tiramisú Pistacchio es el que se roba la noche. Siempre hay algo dulce para cerrar bien.',
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

        {/* 4 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '12px', marginBottom: '32px' }}>
          {HIGHLIGHTS.map((h, i) => (
            <motion.div key={h.key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <Link href="/carta" style={{ display: 'block', textDecoration: 'none', background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '24px', height: '100%', transition: 'border-color 0.2s' }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.borderColor = 'rgba(193,122,59,0.4)')}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.borderColor = '#2A2520')}
              >
                <span style={{ fontSize: '28px', lineHeight: 1 }}>{h.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#F2EDE4', margin: '16px 0 6px' }}>{h.label}</h3>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#C17A3B', margin: '0 0 8px', lineHeight: 1.5 }}>{h.headline}</p>
                <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#9B8B7E', margin: 0 }}>{h.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: 'clamp(18px, 2.5vw, 24px) clamp(20px, 3vw, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(16px, 2vw, 19px)', fontWeight: 700, color: '#F2EDE4', margin: '0 0 4px' }}>
              {locale === 'en' ? "Can't make it today?" : '¿No podés venir hoy?'}
            </p>
            <p style={{ fontSize: '13px', color: '#9B8B7E', margin: 0 }}>
              {locale === 'en' ? 'Order online and pick up at the restaurant.' : 'Pedí online y retirá en nuestro local.'}
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
