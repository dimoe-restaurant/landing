'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import type { MenuTab, MenuGroup } from '@/lib/menu';
import { FALLBACK_MENU } from '@/lib/menu-fallback';
import MenuSubtabs from './MenuSubtabs';
import ScrollFadeEdges from './ScrollFadeEdges';
import { useScrollFade } from './use-scroll-fade';

const TABS: MenuTab[] = ['ENTRADAS', 'PIZZAS', 'FONDOS', 'POSTRES', 'BAR', 'VINOS', 'SEMANAL'];

const TAB_BG: Record<MenuTab, string> = {
  ENTRADAS: '#152A1C',
  PIZZAS:   '#2A0808',
  FONDOS:   '#2A1205',
  POSTRES:  '#1E0F35',
  BAR:      '#1A0E35',
  VINOS:    '#1C0A2A',
  SEMANAL:  '#1A0808',
};

// Fotos food reales de DiMOE — todas cargadas en el DOM, sin rostros
const TAB_PHOTO: Record<MenuTab, string> = {
  ENTRADAS: '/images/menu-entradas-jardin-oliva.jpg',    // Jardín Di Oliva, aceitunas rellenas
  PIZZAS:   '/images/menu-pizzas-mechada.jpg',            // Pizza Mechada e Cipolla
  FONDOS:   '/images/menu-fondos-lasagna.jpg',            // Auténtica Lasagna
  POSTRES:  '/images/menu-postres-tiramisu-pistacho.jpg', // Tiramisù Pistacchio
  BAR:      '/images/DSC02288.jpg',   // cóctel berries copa de cristal
  VINOS:    '/images/DSC02288.jpg',   // reutiliza la foto de BAR — sin foto real de vinos/copas disponible aún (mejor que la lasagna anterior)
  SEMANAL:  '/images/DSC02214.jpg',   // pappardelle al camarón, menú especial
};

const TAB_PHOTO_POS: Record<MenuTab, string> = {
  ENTRADAS: 'center 50%',
  PIZZAS:   'center 45%',
  FONDOS:   'center 45%',
  POSTRES:  'center 60%',
  BAR:      'center 55%',
  VINOS:    'center 55%',
  SEMANAL:  'center 55%',
};

// Foto real full-bleed que rompe la lista a mitad de sección — solo en tabs con suficiente contenido
const TAB_SEPARATOR_PHOTO: Partial<Record<MenuTab, { src: string; pos: string }>> = {
  ENTRADAS: { src: '/images/menu-entradas-jardin-oliva.jpg', pos: 'center 50%' },
  PIZZAS:   { src: '/images/menu-pizzas-catalina.jpg', pos: 'center 40%' },
  FONDOS:   { src: '/images/menu-fondos-pappardelle-camaron.jpg', pos: 'center 50%' },
  POSTRES:  { src: '/images/menu-postres-tiramisu-pistacho.jpg', pos: 'center 55%' },
};

// Subtabs de navegación dentro de un tab activo — mapea group.name → bucket.
// Grupos sin entrada caen en "Otros" (no desaparecen silenciosamente).
// Poblado por tarea: BAR (#107), VINOS (#108). Vacío = sin subtabs, comportamiento actual.
const TAB_SUBTABS: Partial<Record<MenuTab, Record<string, string>>> = {
  BAR: {
    'Happy Hour': 'Happy Hour',
    'Gin Frutal': 'Cócteles',
    'Coctelería de la Casa': 'Cócteles',
    'Spritz': 'Cócteles',
    'Sours': 'Cócteles',
    'Coctelería Clásica': 'Cócteles',
    'Cervezas Artesanales — La Casona': 'Cerveza',
    'Vinos y Espumantes': 'Vino y Espumante',
    'Sin Alcohol': 'Sin Alcohol',
    'Jugos y Bebidas': 'Sin Alcohol',
    'Tragos': 'Destilados',
    'Shots': 'Destilados',
  },
  VINOS: {
    'Sauvignon Blanc': 'Blancos',
    'Chardonnay': 'Blancos',
    'Carménère': 'Tintos',
    'Cabernet Sauvignon': 'Tintos',
    'Merlot': 'Tintos',
    'Ensamblajes': 'Ensamblajes y Dulce',
    'Dulce': 'Ensamblajes y Dulce',
  },
};

const TAB_DISPLAY: Record<MenuTab, string> = {
  ENTRADAS: 'ANTIPASTI',
  PIZZAS:   'PIZZAS',
  FONDOS:   'FONDOS',
  POSTRES:  'DOLCE',
  BAR:      'BAR',
  VINOS:    'VINOS',
  SEMANAL:  'MENÚ SEMANAL',
};

function fmt(p: number | string | undefined | null): string | null {
  if (p == null || p === '') return null;
  if (typeof p === 'string') return p;
  return p.toLocaleString('es-CL');
}

type Props = { menu?: Record<MenuTab, MenuGroup[]> }

export default function Menu({ menu }: Props) {
  const t = useTranslations('menu');
  const locale = useLocale();
  const [active, setActive] = useState<MenuTab | null>(null);
  const [activeSubtab, setActiveSubtab] = useState('Todos');
  const resolvedMenu = menu ?? FALLBACK_MENU;
  const groups = active ? resolvedMenu[active] : [];
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsFade = useScrollFade(tabsRef);
  const sectionRef = useRef<HTMLElement>(null);
  const bg = active ? TAB_BG[active] : '#0D0B09';

  // Subtabs del tab activo — sin config para ese tab = sin filtrado (comportamiento actual).
  // Los buckets se derivan de los grupos realmente presentes (no del mapeo completo),
  // para no ofrecer un subtab que lleve a una sección vacía si el contenido real (Notion)
  // todavía no tiene grupos para ese bucket.
  const subtabConfig = active ? TAB_SUBTABS[active] : undefined;
  const presentBuckets = subtabConfig
    ? groups.map(g => subtabConfig[g.name ?? ''] ?? 'Otros')
    : [];
  const subtabLabels = subtabConfig
    ? ['Todos', ...Array.from(new Set(presentBuckets))]
    : [];
  const groupsInSubtabs = subtabConfig
    ? groups.filter(g => activeSubtab === 'Todos' || (subtabConfig[g.name ?? ''] ?? 'Otros') === activeSubtab)
    : groups;

  // Punto de corte para el separador de foto: después del grupo donde se acumulan
  // ≥6 items, sin insertar justo antes del cierre de la sección.
  const sepPhoto = active ? TAB_SEPARATOR_PHOTO[active] : undefined;
  let sepIndex = -1;
  if (sepPhoto) {
    let count = 0;
    for (let i = 0; i < groupsInSubtabs.length - 1; i++) {
      count += groupsInSubtabs[i].items.length;
      if (count >= 6) { sepIndex = i; break; }
    }
  }

  useEffect(() => {
    const hash = window.location.hash.slice(1).toUpperCase() as MenuTab;
    if (TABS.includes(hash)) setActive(hash);
  }, []);

  useEffect(() => {
    setActiveSubtab('Todos');
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const el = tabsRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${active}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [active]);

  const handleTab = (tab: MenuTab) => {
    setActive(tab);
    window.history.replaceState(null, '', `#${tab.toLowerCase()}`);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleHome = () => {
    setActive(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="menu-texture"
      style={{
        backgroundColor: bg,
        transition: 'background-color 0.45s ease',
        paddingBottom: 'clamp(48px, 7vw, 80px)',
      }}
    >
      {/* Label + headline — solo en la vista home de la carta */}
      {!active && (
        <div style={{ textAlign: 'center', padding: 'clamp(48px, 7vw, 80px) clamp(16px, 4vw, 24px) 40px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '12px' }}>{t('label')}</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: 0 }}>{t('headline')}</h2>
          </motion.div>
        </div>
      )}

      {/* Sticky tabs */}
      <div ref={tabsRef} className="menu-tabs" onScroll={tabsFade.onScroll} style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: bg, transition: 'background-color 0.45s ease',
        paddingTop: '14px', paddingBottom: '14px',
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', flexWrap: 'wrap',
        paddingLeft: '16px', paddingRight: '16px',
      }}>
        <ScrollFadeEdges bg={bg} showLeft={tabsFade.showLeft} showRight={tabsFade.showRight} />
        {/* Home — vuelve al selector de secciones de la carta, no al sitio */}
        <button onClick={handleHome} aria-label="Inicio de la carta" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '34px', height: '34px', borderRadius: '100px', flexShrink: 0,
          border: `1px solid ${!active ? '#C17A3B' : 'rgba(242,237,228,0.15)'}`,
          background: !active ? '#C17A3B' : 'transparent',
          color: !active ? '#F2EDE4' : 'rgba(242,237,228,0.45)',
          cursor: 'pointer', transition: 'all 0.2s', marginRight: '4px',
        }}
          onMouseEnter={e => { if (active) { e.currentTarget.style.borderColor = 'rgba(193,122,59,0.5)'; e.currentTarget.style.color = '#C17A3B'; } }}
          onMouseLeave={e => { if (active) { e.currentTarget.style.borderColor = 'rgba(242,237,228,0.15)'; e.currentTarget.style.color = 'rgba(242,237,228,0.45)'; } }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </button>
        {TABS.map(tab => (
          <button key={tab} data-tab={tab} onClick={() => handleTab(tab)}
            style={{
              background: active === tab ? '#C17A3B' : 'transparent',
              color: active === tab ? '#F2EDE4' : 'rgba(242,237,228,0.5)',
              border: `1px solid ${active === tab ? '#C17A3B' : 'rgba(242,237,228,0.15)'}`,
              padding: '7px 18px', borderRadius: '100px', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: 'var(--font-sans)', flexShrink: 0,
            }}
            onMouseEnter={e => { if (active !== tab) { e.currentTarget.style.borderColor = 'rgba(193,122,59,0.5)'; e.currentTarget.style.color = 'rgba(242,237,228,0.8)'; } }}
            onMouseLeave={e => { if (active !== tab) { e.currentTarget.style.borderColor = 'rgba(242,237,228,0.15)'; e.currentTarget.style.color = 'rgba(242,237,228,0.5)'; } }}
          >
            {TAB_DISPLAY[tab]}
          </button>
        ))}
      </div>

      {/* ── Home de la carta: selector de secciones, sin productos ──────────── */}
      {!active && (
        <div style={{
          maxWidth: '760px', margin: '0 auto', padding: '8px clamp(16px, 4vw, 24px) 8px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px',
        }}>
          {TABS.map((tab, i) => (
            <motion.button key={tab} onClick={() => handleTab(tab)}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                position: 'relative', height: '130px', borderRadius: '14px', overflow: 'hidden',
                border: '1px solid rgba(193,122,59,0.3)', cursor: 'pointer', padding: 0,
              }}
            >
              <Image src={TAB_PHOTO[tab]} alt={TAB_DISPLAY[tab]} fill
                data-photo={`home-${tab.toLowerCase()}`}
                sizes="(max-width: 485px) 100vw, (max-width: 767px) 50vw, 240px"
                priority={i < 2}
                style={{ objectFit: 'cover', objectPosition: TAB_PHOTO_POS[tab] }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(180deg, ${TAB_BG[tab]}33 0%, ${TAB_BG[tab]}CC 100%)`,
              }} />
              <span style={{
                position: 'absolute', bottom: '12px', left: '14px', right: '14px', textAlign: 'left',
                fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#F2EDE4',
                letterSpacing: '0.02em',
              }}>
                {TAB_DISPLAY[tab]}
              </span>
            </motion.button>
          ))}
        </div>
      )}

      {active && (<>
      {/* ── Banner horizontal de foto ────────────────────────────────────────
          Solo la foto del tab activo se monta — evita descargar las 7 fotos
          a la vez en la carga inicial. El crossfade lo da AnimatePresence.
      ──────────────────────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
        <AnimatePresence>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={TAB_PHOTO[active]}
              alt={TAB_DISPLAY[active]}
              data-photo={`banner-${active.toLowerCase()}`}
              fill
              sizes="100vw"
              quality={90}
              priority
              style={{ objectFit: 'cover', objectPosition: TAB_PHOTO_POS[active] }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradiente inferior para integrar con el contenido */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
          background: `linear-gradient(to bottom, transparent, ${bg})`,
          transition: 'background 0.45s ease',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        {/* Título de sección */}
        <div style={{ textAlign: 'center', paddingTop: '28px', paddingBottom: '20px' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700,
            letterSpacing: '0.04em', color: '#C17A3B', textTransform: 'uppercase', margin: '0 0 14px',
          }}>
            {TAB_DISPLAY[active]}
          </h2>
          <div style={{ width: '48px', height: '2px', background: 'rgba(193,122,59,0.4)', margin: '0 auto' }} />
          {active === 'PIZZAS' && (
            <p style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(193,122,59,0.75)', marginTop: '14px', marginBottom: 0,
            }}>
              2° Lugar The Top Pizza Chile — Región Metropolitana
            </p>
          )}
        </div>

        <MenuSubtabs labels={subtabLabels} active={activeSubtab} onChange={setActiveSubtab} bg={bg} />

        <AnimatePresence mode="wait">
          <motion.div key={`${active}-${activeSubtab}`}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {groupsInSubtabs.map((group, gi) => {
              const isHappyHour = group.name === 'Happy Hour';
              const isKids = group.name === 'Para Niños';
              const isSemanaleChef = active === 'SEMANAL' && group.name === 'Menú del Chef';
              const isBarTab = active === 'BAR';
              const noDesc = group.items.every(i => !i.desc);
              const isCompact = isBarTab || (noDesc && group.items.length > 2);

              return (
                <Fragment key={gi}>
                <div style={{ marginBottom: gi < groupsInSubtabs.length - 1 ? '44px' : 0, paddingTop: gi === 0 ? '32px' : 0 }}>

                  {/* Menú Semanal — banner carmesí */}
                  {isSemanaleChef && (
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(180,20,20,0.16) 0%, rgba(180,20,20,0.06) 100%)',
                      border: '1px solid rgba(180,50,50,0.28)',
                      borderRadius: '12px', padding: '13px 18px 10px', marginBottom: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: 'rgba(220,80,80,0.9)' }}>Menú de la Semana</span>
                        <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(220,80,80,0.55)' }}>
                          {group.subtitle ?? 'Actualización semanal · consultar disponibilidad'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Happy Hour — banner ámbar */}
                  {isHappyHour && (
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(193,122,59,0.13) 0%, rgba(193,122,59,0.06) 100%)',
                      border: '1px solid rgba(193,122,59,0.28)',
                      borderRadius: '12px', padding: '13px 18px 10px', marginBottom: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#C17A3B' }}>Happy Hour</span>
                        <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(193,122,59,0.72)' }}>
                          {group.subtitle ?? 'Miércoles a Viernes · 17:00 – 20:00'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Para Niños — mismo tratamiento visual que un grupo regular */}
                  {isKids && (
                    <div style={{ marginBottom: '18px', paddingBottom: '11px', borderBottom: '2px solid rgba(242,237,228,0.18)' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#F2EDE4', margin: 0 }}>
                        Para los Pequeños
                      </h3>
                    </div>
                  )}

                  {/* Header regular */}
                  {group.name && !isHappyHour && !isKids && (
                    <div style={{ marginBottom: '18px', paddingBottom: '11px', borderBottom: '2px solid rgba(242,237,228,0.18)' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#F2EDE4', margin: 0 }}>{group.name}</h3>
                        {group.subtitle && (
                          <span style={{ fontSize: '11px', color: 'rgba(242,237,228,0.38)', letterSpacing: '0.06em' }}>
                            {group.subtitle}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Ítems */}
                  <div style={isCompact ? {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))',
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
                              fontWeight: 700, color: '#F2EDE4', lineHeight: 1.3,
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
                          {isCompact && item.desc && (
                            <span style={{ fontSize: '12px', color: 'rgba(242,237,228,0.42)', display: 'block', lineHeight: 1.4, marginTop: '1px' }}>
                              {item.desc}
                            </span>
                          )}
                          {!isCompact && item.desc && (
                            <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(242,237,228,0.48)', margin: 0 }}>
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
                            fontWeight: 600, color: '#C17A3B', lineHeight: '1.3',
                          }}>
                            ${fmt(item.price)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                </div>

                {/* Foto real full-bleed — rompe la lista a mitad de sección, ritmo editorial del PDF */}
                {gi === sepIndex && sepPhoto && (
                  <div className="menu-separator" style={{
                    position: 'relative', width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)',
                    overflow: 'hidden', marginTop: '4px', marginBottom: '44px',
                    borderTop: '1px solid rgba(193,122,59,0.25)', borderBottom: '1px solid rgba(193,122,59,0.25)',
                  }}>
                    <Image src={sepPhoto.src} alt={TAB_DISPLAY[active]} fill sizes="100vw" quality={90}
                      data-photo={`separator-${active.toLowerCase()}`}
                      style={{ objectFit: 'cover', objectPosition: sepPhoto.pos }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${bg}00 0%, ${bg}55 100%)` }} />
                  </div>
                )}
                </Fragment>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Footer — nota de precios solo en inglés, se asume en restaurantes en español */}
        {locale === 'en' && (
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(242,237,228,0.08)' }}
          >
            <p style={{ fontSize: '13px', color: 'rgba(242,237,228,0.28)', margin: 0 }}>
              Prices in Chilean pesos, tax included.
            </p>
          </motion.div>
        )}
      </div>
      </>)}
    </section>
  );
}
