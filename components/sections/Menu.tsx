'use client';

import { useState, useEffect } from 'react';
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

// DSC food shots — sin personas, sin rostros, platos y manos del restaurante
const TAB_PHOTO: Record<MenuTab, string> = {
  ENTRADAS: '/images/DSC01931.jpg',   // bruschettas prosciutto con mano
  PIZZAS:   '/images/DSC09219.jpg',   // cheese pull con horno napolitano
  FONDOS:   '/images/DSC02482.jpg',   // pappardelle bolognesa humeante
  POSTRES:  '/images/DSC02223.jpg',   // pappardelle camarón con flores
  BAR:      '/images/DSC02288.jpg',   // cóctel de berries en copa de cristal
};

const TAB_PHOTO_POS: Record<MenuTab, string> = {
  ENTRADAS: 'center 52%',
  PIZZAS:   'center 36%',
  FONDOS:   'center 40%',
  POSTRES:  'center 28%',
  BAR:      'center 54%',
};

const TAB_DISPLAY: Record<MenuTab, string> = {
  ENTRADAS: 'ANTIPASTI',
  PIZZAS:   'PIZZAS',
  FONDOS:   'FONDOS',
  POSTRES:  'DOLCE',
  BAR:      'BAR',
};

function fmt(p: number | string | undefined | null): string | null {
  if (p == null || p === '') return null;
  if (typeof p === 'string') return p;
  return p.toLocaleString('es-CL');
}

type Props = { menu?: Record<MenuTab, MenuGroup[]> }

export default function Menu({ menu }: Props) {
  const t = useTranslations('menu');
  const [active, setActive] = useState<MenuTab>('ENTRADAS');
  const resolvedMenu = menu ?? FALLBACK_MENU;
  const groups = resolvedMenu[active];

  // Leer hash de URL al cargar: /carta#pizzas → activa PIZZAS
  useEffect(() => {
    const hash = window.location.hash.slice(1).toUpperCase() as MenuTab;
    if (TABS.includes(hash)) setActive(hash);
  }, []);

  const handleTab = (tab: MenuTab) => {
    setActive(tab);
    window.history.replaceState(null, '', `#${tab.toLowerCase()}`);
  };

  return (
    <section
      id="menu"
      style={{
        background: TAB_BG[active],
        transition: 'background-color 0.45s ease',
        padding: 'clamp(48px, 7vw, 80px) 0 clamp(48px, 7vw, 80px)',
      }}
    >
      {/* Label + headline */}
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
        paddingTop: '14px', paddingBottom: '14px',
        display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap',
      }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => handleTab(tab)}
            style={{
              background: active === tab ? '#C17A3B' : 'transparent',
              color: active === tab ? '#F2EDE4' : 'rgba(242,237,228,0.5)',
              border: `1px solid ${active === tab ? '#C17A3B' : 'rgba(242,237,228,0.15)'}`,
              padding: '7px 18px', borderRadius: '100px', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={e => { if (active !== tab) { e.currentTarget.style.borderColor = 'rgba(193,122,59,0.5)'; e.currentTarget.style.color = 'rgba(242,237,228,0.8)'; } }}
            onMouseLeave={e => { if (active !== tab) { e.currentTarget.style.borderColor = 'rgba(242,237,228,0.15)'; e.currentTarget.style.color = 'rgba(242,237,228,0.5)'; } }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Layout: contenido + foto lateral */}
      <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'flex', minHeight: '600px' }}>

        {/* Columna contenido */}
        <div style={{ flex: 1, minWidth: 0, padding: 'clamp(32px, 5vw, 48px) clamp(16px, 4vw, 40px)' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {/* Título watermark de sección */}
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(52px, 9vw, 96px)',
                fontWeight: 900, lineHeight: 1,
                color: 'rgba(242,237,228,0.07)',
                margin: '0 0 28px',
                letterSpacing: '-0.02em',
                userSelect: 'none',
              }}>
                {TAB_DISPLAY[active]}
              </p>

              {groups.map((group, gi) => {
                const isHappyHour = group.name === 'Happy Hour';
                const isKids = group.name === 'Para Niños';
                const isBarTab = active === 'BAR';
                // BAR siempre compacto; otros grupos compactos si ningún ítem tiene desc larga
                const noDesc = group.items.every(i => !i.desc);
                const isCompact = isBarTab || (noDesc && group.items.length > 2);

                return (
                  <div key={gi} style={{ marginBottom: gi < groups.length - 1 ? '44px' : 0 }}>

                    {/* Happy Hour — banner ámbar prominente */}
                    {isHappyHour && (
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(193,122,59,0.13) 0%, rgba(193,122,59,0.06) 100%)',
                        border: '1px solid rgba(193,122,59,0.28)',
                        borderRadius: '12px',
                        padding: '13px 18px 10px',
                        marginBottom: '16px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#C17A3B' }}>Happy Hour</span>
                          <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(193,122,59,0.72)' }}>
                            {group.subtitle ?? 'Todos los días · 12:30 – 19:30'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Para Niños — separador sutil con línea punteada */}
                    {isKids && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(242,237,228,0.22)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                          Para los pequeños
                        </span>
                        <div style={{ flex: 1, borderTop: '1px dashed rgba(242,237,228,0.10)' }} />
                      </div>
                    )}

                    {/* Header regular (no Happy Hour, no Niños) */}
                    {group.name && !isHappyHour && !isKids && (
                      <div style={{ marginBottom: '18px', paddingBottom: '11px', borderBottom: '1px solid rgba(242,237,228,0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#F2EDE4', margin: 0 }}>{group.name}</h3>
                          {group.subtitle && (
                            <span style={{ fontSize: '11px', color: 'rgba(242,237,228,0.38)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                              {group.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Ítems */}
                    <div style={isCompact ? {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                      gap: '2px 20px',
                    } : {}}>
                      {group.items.map((item, ii) => (
                        <div key={ii} style={{
                          display: 'flex',
                          alignItems: isCompact ? 'baseline' : 'flex-start',
                          justifyContent: 'space-between',
                          gap: isCompact ? '8px' : '16px',
                          padding: isCompact ? '7px 0' : '16px 0',
                          borderBottom: isCompact ? 'none' : '1px solid rgba(242,237,228,0.06)',
                          opacity: isKids ? 0.62 : 1,
                        }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap',
                              marginBottom: (!isCompact && item.desc) ? '5px' : 0,
                            }}>
                              <span style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: isCompact ? '13px' : '15px',
                                fontWeight: 700,
                                color: '#F2EDE4',
                                lineHeight: 1.3,
                              }}>
                                {item.name}
                              </span>
                              {item.badge && (
                                <span style={{
                                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em',
                                  color: '#C17A3B', textTransform: 'uppercase',
                                  border: '1px solid rgba(193,122,59,0.4)',
                                  borderRadius: '100px', padding: '2px 8px', whiteSpace: 'nowrap',
                                }}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {/* Compact: desc como nota breve de sabor */}
                            {isCompact && item.desc && (
                              <span style={{ fontSize: '11px', color: 'rgba(242,237,228,0.30)', display: 'block', lineHeight: 1.4, marginTop: '1px' }}>
                                {item.desc}
                              </span>
                            )}
                            {/* Full: descripción completa */}
                            {!isCompact && item.desc && (
                              <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(242,237,228,0.38)', margin: 0 }}>
                                {item.desc}
                              </p>
                            )}
                            {item.note && (
                              <p style={{ fontSize: '11px', color: 'rgba(193,122,59,0.55)', margin: '3px 0 0', fontStyle: 'italic' }}>
                                {item.note}
                              </p>
                            )}
                          </div>
                          {fmt(item.price) != null && (
                            <span style={{
                              flexShrink: 0,
                              fontSize: isCompact ? '13px' : '14px',
                              fontWeight: 600,
                              color: '#C17A3B',
                              lineHeight: '1.3',
                            }}>
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

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ textAlign: 'left', marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(242,237,228,0.08)' }}
          >
            <p style={{ fontSize: '13px', color: 'rgba(242,237,228,0.28)', marginBottom: '16px' }}>
              Precios en pesos chilenos · IVA incluido
            </p>
            <a
              href={process.env.NEXT_PUBLIC_MENU_PDF_URL ?? 'https://linktr.ee/di_moe'}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', background: '#C17A3B', color: '#F2EDE4', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {t('cta')}
            </a>
          </motion.div>
        </div>

        {/* Foto lateral — food shots sin rostros */}
        <div
          aria-hidden="true"
          style={{
            width: 'clamp(80px, 22%, 220px)',
            flexShrink: 0,
            backgroundImage: `url(${TAB_PHOTO[active]})`,
            backgroundSize: 'cover',
            backgroundPosition: TAB_PHOTO_POS[active],
            borderLeft: '1px solid rgba(242,237,228,0.04)',
          }}
        />
      </div>
    </section>
  );
}
