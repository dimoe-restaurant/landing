'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { MenuTab, MenuGroup } from '@/lib/menu';
import { FALLBACK_MENU } from '@/lib/menu-fallback';

const TABS: MenuTab[] = ['ENTRADAS', 'PIZZAS', 'FONDOS', 'POSTRES', 'BAR'];

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
    <section id="menu" style={{ background: '#0D0B09', padding: 'clamp(64px, 8vw, 96px) 0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px)' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>{t('label')}</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: 0 }}>{t('headline')}</h2>
        </motion.div>

        {/* Tabs — sticky debajo del navbar */}
        <div style={{ position: 'sticky', top: '72px', zIndex: 10, background: '#0D0B09', paddingTop: '16px', paddingBottom: '16px', marginBottom: '32px', display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActive(tab)}
              style={{
                background: active === tab ? '#C17A3B' : 'transparent',
                color: active === tab ? '#F2EDE4' : 'rgba(242,237,228,0.45)',
                border: `1px solid ${active === tab ? '#C17A3B' : 'rgba(242,237,228,0.12)'}`,
                padding: '8px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-sans)',
              }}
              onMouseEnter={e => { if (active !== tab) { e.currentTarget.style.borderColor = 'rgba(193,122,59,0.5)'; e.currentTarget.style.color = 'rgba(242,237,228,0.75)'; } }}
              onMouseLeave={e => { if (active !== tab) { e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)'; e.currentTarget.style.color = 'rgba(242,237,228,0.45)'; } }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {groups.map((group, gi) => {
              const isCompactGroup = group.items.every(i => !i.desc) && group.items.length > 3;
              const isHappyHour = group.name === 'Happy Hour';

              return (
                <div key={gi} style={{ marginBottom: gi < groups.length - 1 ? '40px' : 0 }}>

                  {/* Group header */}
                  {group.name && (
                    <div style={{ marginBottom: '20px', paddingBottom: '12px', borderBottom: `1px solid ${isHappyHour ? 'rgba(193,122,59,0.3)' : '#2A2520'}` }}>
                      {isHappyHour ? (
                        <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '10px', background: 'rgba(193,122,59,0.08)', border: '1px solid rgba(193,122,59,0.25)', borderRadius: '8px', padding: '8px 16px' }}>
                          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#C17A3B' }}>{group.name}</span>
                          {group.subtitle && <span style={{ fontSize: '12px', color: 'rgba(193,122,59,0.7)' }}>{group.subtitle}</span>}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#F2EDE4', margin: 0 }}>{group.name}</h3>
                          {group.subtitle && <span style={{ fontSize: '11px', color: '#9B8B7E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{group.subtitle}</span>}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Items list or compact grid */}
                  <div style={isCompactGroup ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2px 24px' } : {}}>
                    {group.items.map((item, ii) => (
                      <div key={ii} style={{
                        display: 'flex', alignItems: isCompactGroup ? 'center' : 'flex-start',
                        justifyContent: 'space-between', gap: '16px',
                        padding: isCompactGroup ? '6px 0' : '16px 0',
                        borderBottom: isCompactGroup ? 'none' : `1px solid rgba(42,37,32,0.7)`,
                      }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: item.desc ? '5px' : 0 }}>
                            <span style={{ fontFamily: 'var(--font-serif)', fontSize: isCompactGroup ? '13px' : '15px', fontWeight: 700, color: '#F2EDE4' }}>{item.name}</span>
                            {item.badge && (
                              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', color: '#C17A3B', textTransform: 'uppercase', border: '1px solid rgba(193,122,59,0.4)', borderRadius: '100px', padding: '2px 8px', whiteSpace: 'nowrap' }}>{item.badge}</span>
                            )}
                          </div>
                          {item.desc && <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(242,237,228,0.42)', margin: 0 }}>{item.desc}</p>}
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
          style={{ textAlign: 'center', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #2A2520' }}>
          <p style={{ fontSize: '13px', color: '#9B8B7E', marginBottom: '16px' }}>Precios en pesos chilenos · IVA incluido</p>
          <a href={process.env.NEXT_PUBLIC_MENU_PDF_URL ?? 'https://linktr.ee/di_moe'} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', background: '#C17A3B', color: '#F2EDE4', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {t('cta')}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
