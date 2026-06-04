'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const TABS = ['ENTRADAS', 'PIZZAS', 'FONDOS', 'POSTRES', 'BAR'] as const;
type Tab = typeof TABS[number];

type Item = { name: string; desc?: string; price: number | string; badge?: string; note?: string };
type Group = { name?: string; subtitle?: string; items: Item[] };

const MENU: Record<Tab, Group[]> = {
  ENTRADAS: [
    {
      items: [
        { name: 'Palitos di Agglio', desc: 'Palitos de masa al horno bañados en ajo, decorados con parmesano y orégano. Acompañados de nuestra famosa salsa de ajo cilantro.', price: 6900 },
        { name: 'Papas al Forno', desc: 'Papas rústicas horneadas en fuego alto, con ciboulette, parmesano y una exquisita salsa Ranch para untar.', price: 8900, note: 'Opción de pollo, carne mechada, tocino o champiñones +1.000' },
        { name: 'Bruschettas Straciatella Prosciutto', desc: 'Cuatro mini bruschettas gourmet tostadas, stracciatella artesanal, rúcula cremosa, prosciutto italiano y tomates deshidratados.', price: 13500 },
        { name: 'Camarones al Pilpil / Ajillo', desc: 'En greda, al horno, estos camarones llegarán burbujeando en mantequilla a tu mesa, acompañados de pan duro.', price: 9500 },
        { name: 'Jardín de Oliva', desc: 'Aceitunas rellenas artesanalmente con ricota sobre aceite de oliva premium, tomates deshidratados y queso feta. Con zeste de naranja y frescura de cilantro. Perfecto para untar.', price: 9900, badge: 'Furor en carta' },
        { name: 'Carpaccio Prosciutto', desc: 'Base de rúcula, prosciutto madurado, alcaparras calabresas, hojas de parmesano, queso feta y limoncina.', price: 10500 },
        { name: 'Insalata César', desc: 'Lechuga romana y croutones con jugo de limón, aceite de oliva, salsa Worcestershire, anchoas, pollo, ajo, mostaza de Dijon, parmesano y pimienta negra.', price: 8900 },
        { name: 'Insalata Caprese', desc: 'Ensalada clásica a base de albahaca, tomate laminado, queso fresco Fior di latte y pesto de la casa.', price: 8500 },
      ],
    },
  ],
  PIZZAS: [
    {
      name: 'Italianas y Especialidades',
      subtitle: '2° Lugar The Top Pizza Chile 2025',
      items: [
        { name: 'Queen Margherita', desc: 'La reina y lo sabemos. Margherita clásica elevada con Stracciatella, emulsión de aceite de albahaca, queso Fior di latte desmoronado, parmesano fino y albahaca fresca.', price: 11500 },
        { name: 'Veracruz', desc: 'Para los que buscan un poquito de fuego. Base pomidoro, fior di latte, pepperoncino fresco, tomate deshidratado, salame picante, aceitunas y albahaca.', price: 12800 },
        { name: 'Prosciutto', desc: 'Mucho más premium que el Serrano. Pomidoro, fior di latte, rúcula y hojas de prosciutto italiano madurado.', price: 13000 },
        { name: 'Mortadella e Pistacchio', desc: 'Si una es reina, esta es la Diosa. Pomidoro, fior di latte, ricotta, mortadella de pistache, albahaca, parmesano y pistachos triturados.', price: 13600 },
      ],
    },
    {
      name: 'Biancas',
      items: [
        { name: 'Catalina', desc: 'Caudal desde el primer bocado. Base crema y mozzarella, salmón premium marinado, cebolla morada en juliana y alcaparras. Terminada con parmesano y zeste de limón.', price: 14900 },
        { name: 'Pecatto di Trufa', desc: 'Base crema y mozzarella, cebolla caramelizada y champiñones perla negra salteados en pasta y aceite de trufa.', price: 13500 },
        { name: 'El Nonno', desc: 'Base crema y mozzarella, pimentón asado y tocino ahumado, cubierta de queso parmesano.', price: 11500 },
      ],
    },
    {
      name: 'Clásicas',
      items: [
        { name: 'Tres Carnes', desc: 'Base pomidoro, mozzarella, jamón pierna acaramelado, tocino ahumado, pepperoni americano y aceitunas.', price: 13500 },
        { name: 'Pollo BBQ', desc: 'Base pomidoro, mozzarella, cebolla caramelizada, pollo a la mantequilla y salsa BBQ artesanal.', price: 12500 },
      ],
    },
  ],
  FONDOS: [
    {
      name: 'Especialidades de la Casa',
      items: [
        { name: 'Risotto con Lomo Vetado', desc: 'Aclamado en 2 versiones: pesto di albahaca o chanterelles. Especialidad insigne del local con lomo vetado en salsa demi-glace de 12 horas de reducción.', price: 18500 },
        { name: 'Fuoco di Calabria', desc: 'Lasagna de stracciatella y salsa nduja. Crema de salame calabrese de textura suave, sabor intenso y picante de guindilla roja italiana.', price: 12500 },
        { name: 'Auténtica Lasagna', desc: 'Preparada al momento con bolognesa, béchamel, pasta 100% artesanal y parmesano. Cocida en horno napolitano, con mini insalata caprese y tostadas de ajo.', price: 13500 },
      ],
    },
    {
      name: 'Pappardelle',
      items: [
        { name: 'Pappardelle al Pesto', desc: 'Con salsa béchamel de pesto y parmesano. Fior di latte en frío en su cubierta.', price: 10500 },
        { name: 'Pappardelle al Camarón', desc: 'Camarones ecuatorianos en crema soubise reducida al vino blanco con toque de ciboulette.', price: 12500 },
        { name: 'Pappardelle Bolognesa', desc: 'Un plato mundial. Pappardelle con auténtica bolognesa reducida al vino tinto por 3 horas.', price: 11500 },
      ],
    },
    {
      name: 'Para Niños',
      items: [
        { name: 'Spaghetti Kids', desc: 'Clásicos spaghetti en porción reducida con salsa de tomate o alfredo.', price: 7500 },
        { name: 'Papitas Kid con Pollo', desc: 'Porción de papas doradas al horno con trocitos de pollo.', price: 3000, note: 'No trabajamos con ketchup ni mayo :)' },
      ],
    },
  ],
  POSTRES: [
    {
      items: [
        { name: 'Panna Cotta', desc: 'Dulce postre de la casa en salsa a elección, acompañado de una tierra de chocolate.', price: 3800 },
        { name: 'Tiramisú', desc: 'El favorito, el consentido y el rey. Al puro estilo italiano con Mascarpone romano, galleta italiana y café de grano. Perfecto para compartir de a 2.', price: 5800 },
        { name: 'Tiramisú Pistacchio', desc: 'La pura perfección. Este Tiramisú de pistacho le saca tres vueltas al consentido de la casa. Si buscas el nivel superior, es este.', price: 7800 },
      ],
    },
    {
      name: 'Para Compartir',
      items: [
        { name: 'Pizza Dolce Tentazione', desc: 'Pizza dulce a base de crema de pistache con nutella italiana, frutillas y cantucci.', price: 15900, note: '6 personas' },
        { name: 'Bastions', desc: 'Bastones de masa espolvoreados en azúcar glass con nutella italiana y salsas de fruta.', price: 6900, note: '4 personas' },
      ],
    },
    {
      name: 'Cafetería',
      items: [
        { name: 'Kuchen', desc: 'Consultar disponibles', price: 4500 },
        { name: 'Torta', desc: 'Consultar disponibles', price: 4500 },
        { name: 'Té', desc: '', price: 2000 },
        { name: 'Americano', desc: '', price: 3200 },
        { name: 'Espresso', desc: '', price: 2900 },
      ],
    },
  ],
  BAR: [
    {
      name: 'Happy Hour',
      subtitle: 'Miércoles a Viernes · 17:00 a 20:00 hrs',
      items: [
        { name: 'Mojito', desc: '', price: 3900 },
        { name: 'Mojito Sabores', desc: '', price: 4900 },
        { name: 'Pisco Sour', desc: '', price: 3900 },
        { name: 'Pisco Sour Catedral', desc: '', price: 6500 },
        { name: 'Gin Tonic', desc: '', price: 4900 },
        { name: 'Gin Frutal', desc: 'Tropical o Berries', price: 5700 },
        { name: '2x Pisco o Ron', desc: '+1 bebida 350cc', price: 7900 },
        { name: 'Spritz', desc: 'Ramazzotti Aperol · Hugo Cherry', price: 4900 },
      ],
    },
    {
      name: 'Spritz',
      subtitle: '6.500',
      items: [
        { name: 'Aperol Spritz', desc: '', price: '' },
        { name: 'Ramazzotti Spritz', desc: '', price: '' },
        { name: 'Cherry Spritz', desc: '', price: '' },
        { name: 'Limoncello Spritz', desc: 'Fior de Manzana', price: '' },
        { name: 'Hugo Spritz', desc: 'Flor de Sauco', price: '' },
      ],
    },
    {
      name: 'Sours',
      subtitle: '4.900 · Catedral 8.000',
      items: [
        { name: 'Tradicional', desc: '', price: '' },
        { name: 'Mango Sour', desc: '', price: '' },
        { name: 'Chardonnay', desc: '', price: '' },
        { name: 'Copao', desc: 'Natural El Norte', price: '' },
        { name: 'Calafate', desc: 'Natural del Sur', price: '' },
        { name: 'Sandía', desc: 'Natural de Paine', price: '' },
      ],
    },
    {
      name: 'Coctelería Clásica',
      items: [
        { name: 'Mojito', desc: '', price: 3500 },
        { name: 'Mojito Sabores', desc: '', price: 6500 },
        { name: 'Amaretto Sour', desc: '', price: 5000 },
        { name: 'Amaretto Martini', desc: '', price: 6000 },
        { name: 'Gin Tonic', desc: '', price: 4500 },
        { name: 'Margarita', desc: '', price: 5000 },
        { name: 'El Padrino', desc: '', price: 7500 },
        { name: 'Caipirinha', desc: '', price: 5500 },
        { name: 'Clavo Oxidado', desc: '', price: 4500 },
        { name: 'Collins', desc: '', price: 5500 },
        { name: 'José Cuervo', desc: '', price: 5500 },
      ],
    },
    {
      name: 'Tragos',
      subtitle: 'Copa',
      items: [
        { name: 'Pisco Mistral', desc: '', price: 5000 },
        { name: 'Pisco Mistral Manzana', desc: '', price: 5000 },
        { name: 'Pisco Alto del Carmen', desc: '', price: 5000 },
        { name: 'Pisco Horcón Quemado', desc: '', price: 7000 },
        { name: 'Ron Havana', desc: '', price: 5000 },
        { name: 'Tequila Senda', desc: '', price: 4000 },
        { name: 'Tequila José Cuervo', desc: '', price: 5500 },
        { name: 'Gin Bombay', desc: '', price: 5000 },
        { name: 'Gin Beefeater', desc: '', price: 6000 },
        { name: 'Gin Tanqueray', desc: '', price: 7500 },
        { name: 'Whisky Grants', desc: '', price: 6000 },
        { name: 'Whisky Chivas Regal', desc: '', price: 8000 },
        { name: 'Limoncello', desc: '', price: 6000 },
        { name: 'Amaretto', desc: '', price: 4000 },
        { name: 'Menta', desc: '', price: 4000 },
        { name: 'Manzanilla', desc: '', price: 5800 },
      ],
    },
    {
      name: 'Shots',
      subtitle: '5.000',
      items: [
        { name: 'Tequila José Cuervo', desc: '', price: '' },
        { name: 'Jägermeister', desc: '', price: '' },
        { name: 'Fireball', desc: '', price: '' },
      ],
    },
  ],
};

function fmt(p: number | string) {
  if (p === '' || p === undefined || p === null) return null;
  if (typeof p === 'string') return p;
  return p.toLocaleString('es-CL');
}

export default function Menu() {
  const t = useTranslations('menu');
  const [active, setActive] = useState<Tab>('ENTRADAS');
  const groups = MENU[active];

  return (
    <section id="menu" style={{ background: '#0D0B09', padding: 'clamp(64px, 8vw, 96px) 0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px)' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>{t('label')}</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: 0 }}>{t('headline')}</h2>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '48px', flexWrap: 'wrap' }}>
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
