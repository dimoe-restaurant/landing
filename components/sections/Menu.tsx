'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { MenuTab, MenuGroup } from '@/lib/menu';
import { FALLBACK_MENU } from '@/lib/menu-fallback';
import { typography } from '@/lib/typography';
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
// Solo para agrupar deliberadamente varias subcategorías bajo un mismo tab
// (ej. Spritz + Sours + Coctelería Clásica → "Cócteles"). Una subcategoría
// que no está acá NO cae en un cajón genérico — se muestra con su propio
// nombre (ver fallback en `presentBuckets` más abajo), así que agregar una
// subcategoría nueva en Notion no requiere tocar este archivo.
const TAB_SUBTABS: Partial<Record<MenuTab, Record<string, string>>> = {
  BAR: {
    'Happy Hour': 'Happy Hour',
    'Coctelería de la Casa': 'Cócteles',
    'Spritz': 'Cócteles',
    'Sours': 'Cócteles',
    'Coctelería Clásica': 'Cócteles',
    'Cervezas': 'Cerveza',
    'Coctelería sin alcohol': 'Sin Alcohol',
    'Jugos y Bebidas': 'Sin Alcohol',
    'Vinos y Espumantes': 'Vino y Espumante',
    // Destilados — antes un solo grupo "Tragos" con desc redundante (repetía
    // el tipo de licor en cada ítem); ahora una Subcategoría real por tipo,
    // todas agrupadas bajo el mismo subtab "Destilados".
    'Pisco': 'Destilados',
    'Ron': 'Destilados',
    'Whisky': 'Destilados',
    'Ginebra': 'Destilados',
    'Tequila': 'Destilados',
    'Bajativo': 'Destilados',
    'Shots': 'Destilados',
  },
  // Objeto vacío (no undefined): activa el bucketing pero sin agrupar nada
  // explícito, así cada Subcategoría real (Espumante, Carménère, Cabernet
  // Sauvignon, Merlot, Blanco, ...) aparece como su propio subtab — mismo
  // patrón de fallback-a-nombre-propio que #224 aplicó en BAR.
  VINOS: {},
};

const TAB_DISPLAY: Record<MenuTab, string> = {
  ENTRADAS: 'ENTRADAS',
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

// Íconos de flags dietarios — trazo fino, mismo estilo que MenuTeaser
const IconLeaf = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 4C10 4 4 10 4 18v2h2c8 0 14-6 14-16V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M6 18C10 14 14 10 19 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IconChili = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M8 8c-2 2-3 5-2 8 1 3 4 4 7 3 4-1.5 6-5 5-9-1-3.5-4-5-7-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7c-1-2-1-4 1-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IconVegan = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 13c0 6 4.5 8 7 8s7-2 7-8c-3 0-5 1-7 3-2-2-4-3-7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M12 21V9c0-3 2-5 6-5 0 4-1.5 6-4 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Espiga de trigo tachada — símbolo estándar de "libre de gluten"
const IconGlutenFree = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 21V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M12 6l-3-2M12 6l3-2M12 10l-3-2M12 10l3-2M12 14l-3-2M12 14l3-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

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
  // Fallback: si la subcategoría no está agrupada explícitamente, se usa su
  // propio nombre — Notion ya dice a qué subcategoría pertenece un ítem, no
  // hace falta un bucket "Otros" genérico ni tocar código para que aparezca.
  const bucketFor = (name?: string) => subtabConfig?.[name ?? ''] ?? name ?? 'Otros';
  const presentBuckets = subtabConfig
    ? groups.map(g => bucketFor(g.name))
    : [];
  const subtabLabels = subtabConfig
    ? ['Todos', ...Array.from(new Set(presentBuckets))]
    : [];
  const groupsInSubtabs = subtabConfig
    ? groups.filter(g => activeSubtab === 'Todos' || bucketFor(g.name) === activeSubtab)
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
    <>
    {/* Back link + accesos de pedido — estos últimos solo en el home de /carta */}
    <div style={{
      maxWidth: '860px', margin: '0 auto', padding: '24px clamp(16px, 4vw, 24px) 0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
    }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', ...typography.bodySm, color: 'rgba(242,237,228,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'block', flexShrink: 0 }}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span style={{ display: 'inline-block', lineHeight: '14px' }}>{locale === 'en' ? 'Back to home' : 'Volver al inicio'}</span>
      </Link>
      {!active && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="https://piderural.cl/stores/dimoe/" target="_blank" rel="noopener noreferrer"
            style={{ ...typography.bodySm, lineHeight: '14px', color: '#C17A3B', textDecoration: 'none', transition: 'color 0.2s' }}
          >
            Carta Delivery
          </a>
          <a href="https://menu.fu.do/dimoe" target="_blank" rel="noopener noreferrer"
            style={{ ...typography.bodySm, lineHeight: '14px', color: '#C17A3B', textDecoration: 'none', transition: 'color 0.2s' }}
          >
            Carta Retiro
          </a>
        </div>
      )}
    </div>
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
            <p style={{ ...typography.eyebrow, color: '#C17A3B', marginBottom: '12px' }}>{t('label')}</p>
            <h2 style={{ ...typography.displayLg, color: '#F2EDE4', margin: 0 }}>{t('headline')}</h2>
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
              padding: '7px 18px', borderRadius: '100px', ...typography.navTab,
              cursor: 'pointer', transition: 'all 0.2s',
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
                ...typography.titleMd, color: '#F2EDE4', letterSpacing: '0.02em',
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
      <div style={{ position: 'relative', maxWidth: '760px', width: '100%', margin: '0 auto', height: '240px', overflow: 'hidden' }}>
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
              sizes="(max-width: 800px) 100vw, 760px"
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
            ...typography.displayMd, color: '#C17A3B', margin: '0 0 14px',
          }}>
            {TAB_DISPLAY[active]}
          </h2>
          <div style={{ width: '48px', height: '2px', background: 'rgba(193,122,59,0.4)', margin: '0 auto' }} />
          {active === 'PIZZAS' && (
            <p style={{
              ...typography.overline,
              color: 'rgba(193,122,59,0.75)', marginTop: '14px', marginBottom: 0,
            }}>
              2° Lugar The Top Pizza Chile — Región Metropolitana
            </p>
          )}
        </div>

        <MenuSubtabs labels={subtabLabels} active={activeSubtab} onChange={setActiveSubtab} />

        <AnimatePresence mode="wait">
          <motion.div key={`${active}-${activeSubtab}`}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {groupsInSubtabs.map((group, gi) => {
              const isHappyHour = group.name === 'Happy Hour';
              const isKids = group.name === 'Para Niños';
              const isSemanaleChef = active === 'SEMANAL' && group.name === 'Menú del Chef';
              // Compacto = sin desc, punto. El umbral de "> 2 ítems" quedó
              // sacando grupos chicos (ej. Ron con 1 ítem) del modo compacto
              // aunque estuvieran al lado de otros grupos sin desc que sí
              // calificaban — mismo tab, tamaños de letra distintos sin razón
              // de contenido real.
              const isCompact = group.items.every(i => !i.desc);
              // Puntero "ver detalle en Vinos" — el único ítem de este grupo en BAR
              // debe navegar de verdad a la tab VINOS, no quedar como texto suelto.
              const isVinosPointer = active === 'BAR' && group.name === 'Vinos y Espumantes';

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
                        <span style={{ ...typography.titleMd, color: 'rgba(220,80,80,0.9)' }}>Menú de la Semana</span>
                        <span style={{ ...typography.caption, color: 'rgba(220,80,80,0.55)' }}>
                          {group.subtitle ?? 'Disponible hasta las 16:00 hrs'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Happy Hour — banner ámbar, tratamiento explícito para diferenciarlo del resto de la carta */}
                  {isHappyHour && (
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(193,122,59,0.3) 0%, rgba(193,122,59,0.16) 100%)',
                      border: '2px solid rgba(193,122,59,0.6)',
                      borderLeft: '5px solid #C17A3B',
                      borderRadius: '6px 10px 10px 6px', padding: '13px 18px 10px 15px', marginBottom: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ ...typography.titleMd, color: '#C17A3B' }}>Happy Hour</span>
                        <span style={{ ...typography.caption, color: 'rgba(193,122,59,0.85)' }}>
                          {group.subtitle ?? 'Miércoles a Viernes · 17:00 – 20:00'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Para Niños — mismo tratamiento visual que un grupo regular */}
                  {isKids && (
                    <div style={{ marginBottom: '18px', paddingBottom: '11px', borderBottom: '2px solid rgba(242,237,228,0.18)' }}>
                      <h3 style={{ ...typography.titleSm, color: '#F2EDE4', margin: 0 }}>
                        Para los Pequeños
                      </h3>
                    </div>
                  )}

                  {/* Header regular */}
                  {group.name && !isHappyHour && !isKids && (
                    <div style={{ marginBottom: '18px', paddingBottom: '11px', borderBottom: '2px solid rgba(242,237,228,0.18)' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                        <h3 style={{ ...typography.titleSm, color: '#F2EDE4', margin: 0 }}>{group.name}</h3>
                        {group.subtitle && (
                          <span style={{ ...typography.caption, fontWeight: 400, color: 'rgba(242,237,228,0.38)' }}>
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
                    {group.items.map((item, ii) => {
                      const row = (
                        <div style={{
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
                                ...(isCompact ? typography.itemNameCompact : typography.itemName),
                                color: isVinosPointer ? '#C17A3B' : '#F2EDE4',
                              }}>
                                {item.name}
                              </span>
                              {item.badge && (
                                <span style={{
                                  ...typography.badge,
                                  color: '#C17A3B',
                                  border: '1px solid rgba(193,122,59,0.4)',
                                  borderRadius: '100px', padding: '2px 8px', whiteSpace: 'nowrap',
                                }}>
                                  {item.badge}
                                </span>
                              )}
                              {item.vegetariano && (
                                <span title="Vegetariano" style={{
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                  border: '1px solid rgba(127,166,90,0.5)', color: '#7FA65A',
                                }}>
                                  <IconLeaf />
                                </span>
                              )}
                              {item.picante && (
                                <span title="Picante" style={{
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                  border: '1px solid rgba(193,80,59,0.5)', color: '#C1503B',
                                }}>
                                  <IconChili />
                                </span>
                              )}
                              {item.veganizable && (
                                <span title="Veganizable: 100% libre de origen animal" style={{
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                  border: '1px solid rgba(78,155,122,0.5)', color: '#4E9B7A',
                                }}>
                                  <IconVegan />
                                </span>
                              )}
                              {item.libreDeGluten && (
                                <span title="Libre de Gluten: Apto para intolerantes pero no para alérgicos (no es libre de trazas)" style={{
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                  border: '1px solid rgba(196,148,59,0.5)', color: '#C4943B',
                                }}>
                                  <IconGlutenFree />
                                </span>
                              )}
                            </div>
                            {!isCompact && item.desc && (
                              <p style={{ ...typography.body, color: isVinosPointer ? 'rgba(193,122,59,0.75)' : 'rgba(242,237,228,0.48)', margin: 0 }}>
                                {item.desc}
                              </p>
                            )}
                            {item.note && (
                              <p style={{ ...typography.note, color: 'rgba(193,122,59,0.55)', margin: '3px 0 0' }}>
                                {item.note}
                              </p>
                            )}
                          </div>
                          {fmt(item.price) != null && (
                            <span style={{
                              flexShrink: 0,
                              ...(isCompact ? typography.priceCompact : typography.price),
                              color: '#C17A3B',
                            }}>
                              ${fmt(item.price)}
                            </span>
                          )}
                        </div>
                      );

                      if (isVinosPointer) {
                        return (
                          <Link key={ii} href="/carta#vinos" style={{ textDecoration: 'none', cursor: 'pointer' }}
                            onClick={(e) => { e.preventDefault(); handleTab('VINOS'); }}
                          >
                            {row}
                          </Link>
                        );
                      }
                      return <Fragment key={ii}>{row}</Fragment>;
                    })}
                  </div>

                </div>

                {/* Foto real, ritmo editorial del PDF — limitada al ancho del contenido para no perder resolución en desktop */}
                {gi === sepIndex && sepPhoto && (
                  <div className="menu-separator" style={{
                    position: 'relative', overflow: 'hidden', marginTop: '4px', marginBottom: '44px',
                    borderTop: '1px solid rgba(193,122,59,0.25)', borderBottom: '1px solid rgba(193,122,59,0.25)',
                  }}>
                    <Image src={sepPhoto.src} alt={TAB_DISPLAY[active]} fill sizes="(max-width: 800px) 100vw, 760px" quality={90}
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
            <p style={{ ...typography.bodySm, color: 'rgba(242,237,228,0.28)', margin: 0 }}>
              Prices in Chilean pesos, tax included.
            </p>
          </motion.div>
        )}
      </div>
      </>)}
    </section>
    </>
  );
}
