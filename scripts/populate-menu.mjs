import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local
const envPath = resolve(process.cwd(), '.env.local');
for (const line of readFileSync(envPath, 'utf8').split('\n')) {
  const eq = line.indexOf('=');
  if (eq < 0) continue;
  const k = line.slice(0, eq).trim();
  const v = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
  if (k && !process.env[k]) process.env[k] = v;
}

const TOKEN = process.env.NOTION_ACCESS_TOKEN;
const DB_ID = process.env.NOTION_DB_MENU;

if (!TOKEN || TOKEN.length < 10) { console.error('NOTION_ACCESS_TOKEN missing'); process.exit(1); }
if (!DB_ID) { console.error('NOTION_DB_MENU missing'); process.exit(1); }

const H = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
};

/** @type {Record<string, Array<{name?: string; subtitle?: string; items: Array<{name: string; desc?: string; price?: number; note?: string; badge?: string; ord: number}>>}>} */
const MENU = {
  ENTRADAS: [{ items: [
    { name: 'Palitos di Agglio', desc: 'Palitos de masa al horno bañados en ajo, decorados con parmesano y orégano. Acompañados de nuestra famosa salsa de ajo cilantro.', price: 6900, ord: 1 },
    { name: 'Papas al Forno', desc: 'Papas rústicas horneadas en fuego alto, con ciboulette, parmesano y una exquisita salsa Ranch para untar.', price: 8900, note: 'Opción de pollo, carne mechada, tocino o champiñones +1.000', ord: 2 },
    { name: 'Bruschettas Straciatella Prosciutto', desc: 'Cuatro mini bruschettas gourmet tostadas, stracciatella artesanal, rúcula cremosa, prosciutto italiano y tomates deshidratados.', price: 13500, ord: 3 },
    { name: 'Camarones al Pilpil / Ajillo', desc: 'En greda, al horno, estos camarones llegarán burbujeando en mantequilla a tu mesa, acompañados de pan duro.', price: 9500, ord: 4 },
    { name: 'Jardín de Oliva', desc: 'Aceitunas rellenas artesanalmente con ricota sobre aceite de oliva premium, tomates deshidratados y queso feta.', price: 9900, badge: 'Furor en carta', ord: 5 },
    { name: 'Carpaccio Prosciutto', desc: 'Base de rúcula, prosciutto madurado, alcaparras calabresas, hojas de parmesano, queso feta y limoncina.', price: 10500, ord: 6 },
    { name: 'Insalata César', desc: 'Lechuga romana y croutones con jugo de limón, aceite de oliva, salsa Worcestershire, anchoas, pollo, ajo, mostaza de Dijon, parmesano y pimienta negra.', price: 8900, ord: 7 },
    { name: 'Insalata Caprese', desc: 'Ensalada clásica a base de albahaca, tomate laminado, queso fresco Fior di latte y pesto de la casa.', price: 8500, ord: 8 },
  ]}],

  PIZZAS: [
    { name: 'Italianas y Especialidades', items: [
      { name: 'Queen Margherita', desc: 'La reina y lo sabemos. Margherita clásica elevada con Stracciatella, emulsión de aceite de albahaca, queso Fior di latte desmoronado, parmesano fino y albahaca fresca.', price: 11500, ord: 1 },
      { name: 'Veracruz', desc: 'Para los que buscan un poquito de fuego. Base pomidoro, fior di latte, pepperoncino fresco, tomate deshidratado, salame picante, aceitunas y albahaca.', price: 12800, ord: 2 },
      { name: 'Prosciutto', desc: 'Mucho más premium que el Serrano. Pomidoro, fior di latte, rúcula y hojas de prosciutto italiano madurado.', price: 13000, ord: 3 },
      { name: 'Mortadella e Pistacchio', desc: 'Si una es reina, esta es la Diosa. Pomidoro, fior di latte, ricotta, mortadella de pistache, albahaca, parmesano y pistachos triturados.', price: 13600, ord: 4 },
    ]},
    { name: 'Biancas', items: [
      { name: 'Catalina', desc: 'Caudal desde el primer bocado. Base crema y mozzarella, salmón premium marinado, cebolla morada en juliana y alcaparras. Terminada con parmesano y zeste de limón.', price: 14900, ord: 5 },
      { name: 'Pecatto di Trufa', desc: 'Base crema y mozzarella, cebolla caramelizada y champiñones perla negra salteados en pasta y aceite de trufa.', price: 13500, ord: 6 },
      { name: 'El Nonno', desc: 'Base crema y mozzarella, pimentón asado y tocino ahumado, cubierta de queso parmesano.', price: 11500, ord: 7 },
    ]},
    { name: 'Clásicas', items: [
      { name: 'Tres Carnes', desc: 'Base pomidoro, mozzarella, jamón pierna acaramelado, tocino ahumado, pepperoni americano y aceitunas.', price: 13500, ord: 8 },
      { name: 'Pollo BBQ', desc: 'Base pomidoro, mozzarella, cebolla caramelizada, pollo a la mantequilla y salsa BBQ artesanal.', price: 12500, ord: 9 },
    ]},
  ],

  FONDOS: [
    { name: 'Especialidades de la Casa', items: [
      { name: 'Risotto con Lomo Vetado', desc: 'Aclamado en 2 versiones: pesto di albahaca o chanterelles. Especialidad insigne del local con lomo vetado en salsa demi-glace de 12 horas de reducción.', price: 18500, ord: 1 },
      { name: 'Fuoco di Calabria', desc: 'Lasagna de stracciatella y salsa nduja. Crema de salame calabrese de textura suave, sabor intenso y picante de guindilla roja italiana.', price: 12500, ord: 2 },
      { name: 'Auténtica Lasagna', desc: 'Preparada al momento con bolognesa, béchamel, pasta 100% artesanal y parmesano. Cocida en horno napolitano, con mini insalata caprese y tostadas de ajo.', price: 13500, ord: 3 },
    ]},
    { name: 'Pappardelle', items: [
      { name: 'Pappardelle al Pesto', desc: 'Con salsa béchamel de pesto y parmesano. Fior di latte en frío en su cubierta.', price: 10500, ord: 4 },
      { name: 'Pappardelle al Camarón', desc: 'Camarones ecuatorianos en crema soubise reducida al vino blanco con toque de ciboulette.', price: 12500, ord: 5 },
      { name: 'Pappardelle Bolognesa', desc: 'Un plato mundial. Pappardelle con auténtica bolognesa reducida al vino tinto por 3 horas.', price: 11500, ord: 6 },
    ]},
    { name: 'Para Niños', items: [
      { name: 'Spaghetti Kids', desc: 'Clásicos spaghetti en porción reducida con salsa de tomate o alfredo.', price: 7500, ord: 7 },
      { name: 'Papitas Kid con Pollo', desc: 'Porción de papas doradas al horno con trocitos de pollo.', price: 3000, note: 'No trabajamos con ketchup ni mayo :)', ord: 8 },
    ]},
  ],

  POSTRES: [
    { items: [
      { name: 'Panna Cotta', desc: 'Dulce postre de la casa en salsa a elección, acompañado de una tierra de chocolate.', price: 3800, ord: 1 },
      { name: 'Tiramisú', desc: 'El favorito, el consentido y el rey. Al puro estilo italiano con Mascarpone romano, galleta italiana y café de grano.', price: 5800, ord: 2 },
      { name: 'Tiramisú Pistacchio', desc: 'La pura perfección. Este Tiramisú de pistacho le saca tres vueltas al consentido de la casa.', price: 7800, ord: 3 },
    ]},
    { name: 'Para Compartir', items: [
      { name: 'Pizza Dolce Tentazione', desc: 'Pizza dulce a base de crema de pistache con nutella italiana, frutillas y cantucci.', price: 15900, note: '6 personas', ord: 4 },
      { name: 'Bastions', desc: 'Bastones de masa espolvoreados en azúcar glass con nutella italiana y salsas de fruta.', price: 6900, note: '4 personas', ord: 5 },
    ]},
    { name: 'Cafetería', items: [
      { name: 'Kuchen', desc: 'Consultar disponibles', price: 4500, ord: 6 },
      { name: 'Torta', desc: 'Consultar disponibles', price: 4500, ord: 7 },
      { name: 'Té', price: 2000, ord: 8 },
      { name: 'Americano', price: 3200, ord: 9 },
      { name: 'Espresso', price: 2900, ord: 10 },
    ]},
  ],

  BAR: [
    { name: 'Happy Hour', items: [
      { name: 'Mojito', price: 3900, ord: 1 },
      { name: 'Mojito Sabores', price: 4900, ord: 2 },
      { name: 'Pisco Sour', price: 3900, ord: 3 },
      { name: 'Pisco Sour Catedral', price: 6500, ord: 4 },
      { name: 'Gin Tonic', price: 4900, ord: 5 },
      { name: 'Gin Frutal', desc: 'Tropical o Berries', price: 5700, ord: 6 },
      { name: '2x Pisco o Ron', desc: '+1 bebida 350cc', price: 7900, ord: 7 },
      { name: 'Spritz', desc: 'Ramazzotti Aperol · Hugo Cherry', price: 4900, ord: 8 },
    ]},
    { name: 'Spritz', items: [
      { name: 'Aperol Spritz', price: 6500, ord: 9 },
      { name: 'Ramazzotti Spritz', price: 6500, ord: 10 },
      { name: 'Cherry Spritz', price: 6500, ord: 11 },
      { name: 'Limoncello Spritz', desc: 'Fior de Manzana', price: 6500, ord: 12 },
      { name: 'Hugo Spritz', desc: 'Flor de Sauco', price: 6500, ord: 13 },
    ]},
    { name: 'Sours', items: [
      { name: 'Pisco Sour Tradicional', price: 4900, ord: 14 },
      { name: 'Mango Sour', price: 4900, ord: 15 },
      { name: 'Chardonnay Sour', price: 4900, ord: 16 },
      { name: 'Copao Sour', desc: 'Natural El Norte', price: 4900, ord: 17 },
      { name: 'Calafate Sour', desc: 'Natural del Sur', price: 4900, ord: 18 },
      { name: 'Sandía Sour', desc: 'Natural de Paine', price: 4900, ord: 19 },
    ]},
    { name: 'Coctelería Clásica', items: [
      { name: 'Mojito', price: 3500, ord: 20 },
      { name: 'Mojito Sabores', price: 6500, ord: 21 },
      { name: 'Amaretto Sour', price: 5000, ord: 22 },
      { name: 'Amaretto Martini', price: 6000, ord: 23 },
      { name: 'Gin Tonic', price: 4500, ord: 24 },
      { name: 'Margarita', price: 5000, ord: 25 },
      { name: 'El Padrino', price: 7500, ord: 26 },
      { name: 'Caipirinha', price: 5500, ord: 27 },
    ]},
  ],
};

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function createItem(cat, subcat, item) {
  const props = {
    Nombre: { title: [{ text: { content: item.name } }] },
    Categoría: { select: { name: cat } },
    Activo: { checkbox: true },
    Orden: { number: item.ord ?? 0 },
  };
  if (item.desc) props['Descripción'] = { rich_text: [{ text: { content: item.desc } }] };
  if (item.price != null) props['Precio'] = { number: item.price };
  if (subcat) props['Subcategoría'] = { select: { name: subcat } };
  if (item.note) props['Nota'] = { rich_text: [{ text: { content: item.note } }] };
  if (item.badge) props['Tag'] = { select: { name: item.badge } };

  const r = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: H,
    body: JSON.stringify({ parent: { database_id: DB_ID }, properties: props }),
  });
  const d = await r.json();
  if (d.object === 'error') throw new Error(`${item.name}: ${d.message}`);
  return d.id;
}

let count = 0;
for (const [cat, groups] of Object.entries(MENU)) {
  console.log(`\n→ ${cat}`);
  for (const group of groups) {
    const subcat = group.name ?? null;
    for (const item of group.items) {
      await createItem(cat, subcat, item);
      count++;
      process.stdout.write('.');
      await sleep(350); // ~3 req/sec Notion rate limit
    }
  }
}
console.log(`\n\n✓ ${count} ítems creados en Notion DB`);
