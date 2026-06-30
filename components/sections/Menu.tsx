'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { MenuTab, MenuGroup } from '@/lib/menu';
import { FALLBACK_MENU } from '@/lib/menu-fallback';

const TABS: MenuTab[] = ['ENTRADAS', 'PIZZAS', 'FONDOS', 'POSTRES', 'BAR'];

const TAB_BG: Record<MenuTab, string> = {
  ENTRADAS: '#152A1C',
  PIZZAS:   '#2A0808',
  FONDOS:   '#2A1205',
  POSTRES:  '#1E0F35',
  BAR:      '#1A0E35',
};

const TAB_PHOTO: Record<MenuTab, string> = {
  ENTRADAS: '/images/gs_fb_1058853146371414_1440x1920.jpg',
  PIZZAS:   '/images/gs_fb_1073951724861556_1440x1920.jpg',
  FONDOS:   '/images/gs_fb_1073951738194888_1440x1920.jpg',
  POSTRES:  '/images/DSC02288.jpg',
  BAR:      '/images/DSC02309.jpg',
};

const TAB_DISPLAY: Record<MenuTab, string> = {
  ENTRADAS: 'ANTIPASTI',
  PIZZAS:   'PIZZAS',
  FONDOS:   'FONDOS',
  POSTRES:  'DOLCE',
  BAR:      'BAR',
};

function fmt(p: number | string) {
  if (p === '' || p === undefined || p === null) return null;
  if (typeof p === 'string') return p;
  return p.toLocaleString('es-CL');
}

type Props = { menu?: Record<MenuTab, MenuGroup[]> }

export default function Menu({ menu }: Props) {
  const t = useTranslations('menu');
  const [active, setActive] = useState<MenuTab>('ENTRADAS');
  const resolvedMenu = menu ?? FALLBACK_MENU;
  const groups = resolvedMenu[active];

  return (
    <section
      id="menu"
      style={{
        background: TAB_BG[active],
        transition: 'background-color 0.45s ease',
        padding: 'clamp(48px, 7vw, 80px) 0 clamp(48px, 7vw, 80px)',
      }}
    >
      {/* Section label + headline */}
      <div style={{ textAlign: 'center', marginBottom: '32px', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '12px' }}>{t('label')}</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: 0 }}>{t('headline')}</h2>
        </motion.div>
      </div>

      {/* Sticky tabs */}
      <div style={{
        position: 'sticky', top: '72px', zIndex: 10,
        background: TAB_BG[active], transition: 'background-color 0.45s ease',
        paddingTop: '14px', paddingBottom: '14px', marginBottom: '0',
        display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap',
      }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActive(tab)}
            style={{
              background: active === tab ? '#C17A3B' : 'transparent',
              color: active === tab ? '#F2EDE4' : 'rgba(242,237,228,0.5)',
              border: `1px solid ${active === tab ? '#C17A3B' : 'rgba(242,237,228,0.15)'}`,
              padding: '7px 18px', borderRadius: '100px', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={e => { if (active !== tab) { e.currentTarget.style.borderColor = 'rgba(193,122,59,0.5)'; e.currentTarget.style.color = 'rgba(242,237,228,0.8)'; } }}
            onMouseLeave={e => { if (active !== tab) { e.currentTarget.style.borderColor = 'rgba(242,237,228,0.15)'; e.currentTarget.style.color = 'rgba(242,237,228,0.5)'; } }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Two-column layout: content + photo strip */}
      <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'flex', minHeight: '600px' }}>

        {/* Content column */}
        <div style={{ flex: 1, minWidth: 0, padding: 'clamp(32px, 5vw, 48px) clamp(16px, 4vw, 40px)' }}>

          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {/* Large section title */}
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(52px, 9vw, 96px)',
                fontWeight: 900, lineHeight: 1,
                color: 'rgba(242,237,228,0.12)',
                margin: '0 0 28px',
                letterSpacing: '-0.02em',
                userSelect: 'none',
              }}>
                {TAB_DISPLAY[active]}
              </p>

              {groups.map((group, gi) => {
                const isCompactGroup = group.items.every(i => !i.desc) && group.items.length > 3;
                const isHappyHour = group.name === 'Happy Hour';

                return (
                  <div key={gi} style={{ marginBottom: gi < groups.length - 1 ? '40px' : 0 }}>

                    {/* Group header */}
                    {group.name && (
                      <div style={{ marginBottom: '20px', paddingBottom: '12px', borderBottom: `1px solid ${isHappyHour ? 'rgba(193,122,59,0.3)' : 'rgba(242,237,228,0.08)'}` }}>
                        {isHappyHour ? (
                          <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '10px', background: 'rgba(193,122,59,0.08)', border: '1px solid rgba(193,122,59,0.25)', borderRadius: '8px', padding: '8px 16px' }}>
                            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#C17A3B' }}>{group.name}</span>
                            {group.subtitle && <span style={{ fontSize: '12px', color: 'rgba(193,122,59,0.7)' }}>{group.subtitle}</span>}
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#F2EDE4', margin: 0 }}>{group.name}</h3>
                            {group.subtitle && <span style={{ fontSize: '11px', color: 'rgba(242,237,228,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{group.subtitle}</span>}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Items */}
                    <div style={isCompactGroup ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '2px 20px' } : {}}>
                      {group.items.map((item, ii) => (
                        <div key={ii} style={{
                          display: 'flex', alignItems: isCompactGroup ? 'center' : 'flex-start',
                          justifyContent: 'space-between', gap: '16px',
                          padding: isCompactGroup ? '6px 0' : '16px 0',
                          borderBottom: isCompactGroup ? 'none' : `1px solid rgba(242,237,228,0.06)`,
                        }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: item.desc ? '5px' : 0 }}>
                              <span style={{ fontFamily: 'var(--font-serif)', fontSize: isCompactGroup ? '13px' : '15px', fontWeight: 700, color: '#F2EDE4' }}>{item.name}</span>
                              {item.badge && (
                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', color: '#C17A3B', textTransform: 'uppercase', border: '1px solid rgba(193,122,59,0.4)', borderRadius: '100px', padding: '2px 8px', whiteSpace: 'nowrap' }}>{item.badge}</span>
                              )}
                            </div>
                            {item.desc && <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(242,237,228,0.38)', margin: 0 }}>{item.desc}</p>}
                            {item.note && <p style={{ fontSize: '12px', color: 'rgba(193,122,59,0.6)', margin: '4px 0 0', fontStyle: 'italic' }}>{item.note}</p>}
                          </div>
                          {fmt(item.price) && (
                            <span style={{ flexShrink: 0, fontSize: isCompactGroup ? '13px' : '14px', fontWeight: 600, color: '#C17A3B' }}>
                              ${fmt(item.price)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Footer CTA */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ textAlign: 'left', marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(242,237,228,0.08)' }}>
            <p style={{ fontSize: '13px', color: 'rgba(242,237,228,0.35)', marginBottom: '16px' }}>Precios en pesos chilenos · IVA incluido</p>
            <a href={process.env.NEXT_PUBLIC_MENU_PDF_URL ?? 'https://linktr.ee/di_moe'} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', background: '#C17A3B', color: '#F2EDE4', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {t('cta')}
            </a>
          </motion.div>
        </div>

        {/* Photo strip — right column */}
        <div
          aria-hidden="true"
          style={{
            width: 'clamp(80px, 22%, 220px)',
            flexShrink: 0,
            backgroundImage: `url(${TAB_PHOTO[active]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0s, opacity 0.35s ease',
            borderLeft: '1px solid rgba(242,237,228,0.04)',
          }}
        />
      </div>
    </section>
  );
}
