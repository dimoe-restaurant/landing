/**
 * populate-vinos-semanal.mjs
 *
 * 1. Agrega propiedades L/M/W/J/V/S/D (checkboxes de días) al schema de la DB.
 * 2. Puebla ítems de VINOS y SEMANAL en Notion.
 *
 * Convención de días: L=Lunes M=Martes W=Miércoles J=Jueves V=Viernes S=Sábado D=Domingo
 * Regla: todos en false = mostrar siempre · al menos uno en true = solo ese(os) día(s)
 *
 * Seguro de re-ejecutar: verifica si ya existen ítems en cada categoría antes de crear.
 *
 * Uso:
 *   node scripts/populate-vinos-semanal.mjs
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// ── Cargar .env.local ──────────────────────────────────────────────────────────
const envPath = resolve(process.cwd(), '.env.local')
try {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const eq = line.indexOf('=')
    if (eq < 0) continue
    const k = line.slice(0, eq).trim()
    const v = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (k && !process.env[k]) process.env[k] = v
  }
} catch { /* en Vercel/CI las vars ya vienen en el entorno */ }

const TOKEN = process.env.NOTION_ACCESS_TOKEN
const DB_ID = process.env.NOTION_DB_MENU

if (!TOKEN || TOKEN.length < 10) { console.error('✗ NOTION_ACCESS_TOKEN faltante'); process.exit(1) }
if (!DB_ID) { console.error('✗ NOTION_DB_MENU faltante'); process.exit(1) }

const H = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

// ── 1. Agregar propiedades de días al schema ────────────────────────────────────
console.log('\n→ Actualizando schema: añadiendo propiedades Lunes..Domingo ...')
const schemaPatch = await fetch(`https://api.notion.com/v1/databases/${DB_ID}`, {
  method: 'PATCH',
  headers: H,
  body: JSON.stringify({
    properties: {
      Lunes: { checkbox: {} },
      Martes: { checkbox: {} },
      Miércoles: { checkbox: {} },
      Jueves: { checkbox: {} },
      Viernes: { checkbox: {} },
      Sábado: { checkbox: {} },
      Domingo: { checkbox: {} },
    },
  }),
})
const schemaResult = await schemaPatch.json()
if (schemaResult.object === 'error') {
  console.error('✗ Error al actualizar schema:', schemaResult.message)
  process.exit(1)
}
console.log('✓ Propiedades de días añadidas (o ya existían)')

// ── Helpers ────────────────────────────────────────────────────────────────────
async function countCategory(cat) {
  const r = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
    method: 'POST',
    headers: H,
    body: JSON.stringify({
      filter: { property: 'Categoría', select: { equals: cat } },
      page_size: 1,
    }),
  })
  const d = await r.json()
  return d.results?.length ?? 0
}

async function createItem(cat, subcat, item) {
  const props = {
    Nombre: { title: [{ text: { content: item.name } }] },
    Categoría: { select: { name: cat } },
    Activo: { checkbox: true },
    Orden: { number: item.ord ?? 0 },
    // Días — sin `item.dias` se marcan los 7 (siempre visible, explícito).
    // Con `item.dias` (ej. ['Miércoles','Jueves','Viernes']) solo esos quedan marcados.
    Lunes: { checkbox: item.dias?.includes('Lunes') ?? true },
    Martes: { checkbox: item.dias?.includes('Martes') ?? true },
    Miércoles: { checkbox: item.dias?.includes('Miércoles') ?? true },
    Jueves: { checkbox: item.dias?.includes('Jueves') ?? true },
    Viernes: { checkbox: item.dias?.includes('Viernes') ?? true },
    Sábado: { checkbox: item.dias?.includes('Sábado') ?? true },
    Domingo: { checkbox: item.dias?.includes('Domingo') ?? true },
  }
  if (item.desc) props['Descripción'] = { rich_text: [{ text: { content: item.desc } }] }
  if (item.price != null && item.price !== '') props['Precio'] = { number: item.price }
  if (subcat) props['Subcategoría'] = { select: { name: subcat } }
  if (item.note) props['Nota'] = { rich_text: [{ text: { content: item.note } }] }
  if (item.badge) props['Tag'] = { select: { name: item.badge } }

  const r = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: H,
    body: JSON.stringify({ parent: { database_id: DB_ID }, properties: props }),
  })
  const d = await r.json()
  if (d.object === 'error') throw new Error(`${item.name}: ${d.message}`)
  return d.id
}

// ── 2. Datos ───────────────────────────────────────────────────────────────────

/**
 * VINOS — orden de sommelier:
 * Blancos (aperitivo) → Carménère (cepa insigne CL, más stock)
 * → Cabernet Sauvignon → Merlot → Ensamblajes premium → Dulce
 * Precios por tier (de bar.pdf): Varietal $9k · Reserva $15k · Gran Reserva $20k
 */
const VINOS_GROUPS = [
  { name: 'Sauvignon Blanc', items: [
    { name: 'Viu Manent Reserva', desc: 'Valle de Colchagua · cítrico y herbal, ideal aperitivo', price: 15000, ord: 1 },
  ]},
  { name: 'Chardonnay', items: [
    { name: 'Viu Manent Reserva', desc: 'Valle de Colchagua · fresco, mineral, notas de pera', price: 15000, ord: 2 },
    { name: 'Morandé Pionero Reserva', desc: 'Valle Central · redondo, vainilla suave, persistente', price: 15000, ord: 3 },
  ]},
  { name: 'Carménère', items: [
    { name: 'Tarapacá Gran Reserva', desc: 'Valle del Maipo · especiado, frutos rojos, terroso', price: 20000, ord: 4 },
    { name: 'San Pedro Castillo del Maule Gran Reserva', desc: 'Valle del Maule · herbáceo, ciruela negra', price: 20000, ord: 5 },
    { name: 'Casa Silva Doble D Gran Reserva', desc: 'Valle de Colchagua · elegante, pimienta verde, taninos sedosos', price: 20000, ord: 6 },
    { name: 'Tarapacá Gran Reserva Etiqueta Negra', desc: 'Valle del Maipo · concentrado, especias, largo final', price: 20000, ord: 7 },
    { name: 'Santa Helena Gran Reserva', desc: 'Valle Central · redondo, frutos negros, buen cuerpo', price: 20000, ord: 8 },
    { name: 'Montes Limited Selection', desc: 'Valle de Colchagua · medalla de oro, equilibrado y elegante', price: 15000, ord: 9 },
    { name: 'Santa Ema Select Terroir', desc: 'Valle del Cachapoal · accesible, frutal y directo', price: 9000, ord: 10 },
  ]},
  { name: 'Cabernet Sauvignon', items: [
    { name: 'Santa Ema Select Terroir Reserva Especial', desc: 'Valle del Cachapoal · robusto, cassis y cedro', price: 15000, note: 'Copa disponible', ord: 11 },
    { name: 'Requingua Toro de Piedra Gran Reserva', desc: 'Valle del Curicó · mineral, ciruela, tabaco', price: 20000, ord: 12 },
    { name: 'San Pedro Castillo del Maule Tributo Gran Reserva', desc: 'Valle del Maule · potente, especiado, taninos firmes', price: 20000, ord: 13 },
    { name: 'Tarapacá Gran Reserva Etiqueta Negra', desc: 'Valle del Maipo · intenso, mineral, largo final', price: 20000, ord: 14 },
    { name: 'Santa Ema Gran Reserva', desc: 'Valle del Cachapoal · estructura clásica, maduro', price: 20000, ord: 15 },
    { name: 'Casa Silva Doble D Gran Reserva', desc: 'Valle de Colchagua · añadas 2022 · 2023', price: 20000, ord: 16 },
    { name: 'Santa Rita 120 Reserva', desc: 'Valle del Maipo · accesible, frutos negros, fácil de beber', price: 9000, ord: 17 },
  ]},
  { name: 'Merlot', items: [
    { name: 'Santa Ema Select Terroir Reserva Especial', desc: 'Valle del Cachapoal · suave, ciruela y chocolate', price: 15000, ord: 18 },
    { name: 'Santa Catalina El Arpa Blue Reserva Fría', desc: 'Valle Central · fresco, frutos rojos, especias', price: 15000, ord: 19 },
    { name: 'Santa Rita Medalla Real Reserva', desc: 'Valle del Maipo · aterciopelado, baya oscura', price: 15000, ord: 20 },
  ]},
  { name: 'Ensamblajes', items: [
    { name: 'Tarapacá Gran Reserva Etiqueta Azul', desc: 'Cabernet · Carménère · Syrah · Valle del Maipo', price: 20000, ord: 21 },
    { name: 'San Pedro Sideral', desc: 'Blend de autor · Valle del Cachapoal · reconocido mundialmente', price: 20000, ord: 22 },
  ]},
  { name: 'Dulce', items: [
    { name: '7 Colores Cortejo Moscato', desc: 'Valle Central · notas de durazno, flores blancas y miel', price: 9000, ord: 23 },
  ]},
]

/**
 * SEMANAL — menú del chef. Cambia semanalmente.
 * Subcategorías: "Menú del Chef" y "Elige tu Opción"
 * Para restringir días: agregar `dias: ['Lunes','Martes','Miércoles','Jueves','Viernes']` en el ítem.
 * Sin `dias` = se marcan los 7 (mostrar siempre, explícito).
 *
 * Este menú de ejemplo viene del Canva (2026-06-30).
 * En Notion puedes desactivar un ítem (Activo=false) y crear el nuevo
 * sin necesidad de borrar.
 */
const SEMANAL_GROUPS = [
  { name: 'Menú del Chef', items: [
    {
      name: 'Entrada',
      desc: 'Reineta fresca del día con el toque justo de limón y especias, presentada sobre una delicada crema de palta artesanal. Una entrada ligera y refrescante.',
      // dias: ['Lunes','Martes','Miércoles','Jueves','Viernes']  ← descomentar para mostrar solo lunes a viernes
      ord: 1,
    },
    {
      name: 'Fondo',
      desc: 'Jugoso filete de salmón en su propia emulsión, servido sobre un artesanal puré de papas y zapallo. Terminado con una fresca salsa de alcaparras y cilantro.',
      ord: 2,
    },
  ]},
  { name: 'Elige tu Opción', items: [
    { name: 'Con Aperitivo Espumante', price: 19900, ord: 3 },
    { name: 'Con Aperitivo Sour de Sabores', price: 21900, ord: 4 },
  ]},
]

// ── 3. Poblar ──────────────────────────────────────────────────────────────────
for (const [cat, groups] of [['VINOS', VINOS_GROUPS], ['SEMANAL', SEMANAL_GROUPS]]) {
  const existing = await countCategory(cat)
  if (existing > 0) {
    console.log(`\n⚠  ${cat}: ${existing} ítem(s) ya existen — saltando para evitar duplicados`)
    continue
  }

  console.log(`\n→ Poblando ${cat}...`)
  let count = 0
  for (const group of groups) {
    const subcat = group.name ?? null
    for (const item of group.items) {
      await createItem(cat, subcat, item)
      count++
      process.stdout.write('.')
      await sleep(350) // ~3 req/s respeta el rate limit de Notion
    }
  }
  console.log(`\n✓ ${cat}: ${count} ítems creados`)
}

console.log('\n✅ Listo. Recuerda hacer on-demand revalidation si la carta ya está en prod:')
console.log(`   curl -X POST "https://dimoe.cl/api/revalidate?secret=TU_SECRET&tag=menu"\n`)
