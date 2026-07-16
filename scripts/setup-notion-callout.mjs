/**
 * One-shot script: agrega un callout con los 3 links de publicación controlada
 * (preview / publicar / deshacer) a la página que contiene la DB Menú en Notion.
 * Ejecutar UNA sola vez con: node scripts/setup-notion-callout.mjs
 *
 * Requiere NOTION_ACCESS_TOKEN, NOTION_DB_MENU y PUBLISH_SECRET en .env.local
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

try {
  const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
  for (const line of env.split('\n')) {
    const eq = line.indexOf('=')
    if (eq < 0) continue
    const k = line.slice(0, eq).trim()
    const v = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (k && v && !process.env[k]) process.env[k] = v
  }
} catch {
  // Si no existe .env.local, las vars deben venir del entorno
}

const TOKEN = process.env.NOTION_ACCESS_TOKEN
const DB_ID = process.env.NOTION_DB_MENU
const SECRET = process.env.PUBLISH_SECRET
const SITE_URL = process.env.SITE_URL ?? 'https://dev.dimoe.cl'

if (!TOKEN) {
  console.error('❌  Falta NOTION_ACCESS_TOKEN en .env.local')
  process.exit(1)
}
if (!DB_ID) {
  console.error('❌  Falta NOTION_DB_MENU en .env.local')
  process.exit(1)
}
if (!SECRET) {
  console.error('❌  Falta PUBLISH_SECRET en .env.local')
  process.exit(1)
}

const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
}

async function notion(method, path, body) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`Notion API ${path}: ${JSON.stringify(data)}`)
  return data
}

function linkCallout(emoji, label, url) {
  return {
    object: 'block',
    type: 'callout',
    callout: {
      icon: { type: 'emoji', emoji },
      color: 'gray_background',
      rich_text: [
        { type: 'text', text: { content: label, link: { url } } },
      ],
    },
  }
}

function normalizeId(id) {
  return id.replace(/-/g, '')
}

async function main() {
  console.log('🔎  Buscando página padre de la DB Menú...')
  const db = await notion('GET', `/databases/${DB_ID}`)
  const parentPageId = db.parent?.page_id
  if (!parentPageId) throw new Error('La DB Menú no tiene una página padre (parent.page_id ausente)')
  console.log(`✓  Página padre: ${parentPageId}`)

  const children = await notion('GET', `/blocks/${parentPageId}/children?page_size=50`)
  const menuDbBlock = children.results.find(b => normalizeId(b.id) === normalizeId(DB_ID))
  if (!menuDbBlock) throw new Error('No se encontró el bloque de la DB Menú entre los children de la página padre')

  const blocks = [
    linkCallout('🔍', 'Ver preview', `${SITE_URL}/api/preview?secret=${SECRET}`),
    linkCallout('📢', 'Publicar carta', `${SITE_URL}/api/publish?secret=${SECRET}`),
    linkCallout('↩️', 'Deshacer último cambio', `${SITE_URL}/api/undo?secret=${SECRET}`),
  ]

  console.log('🖊️  Agregando callout con 3 links...')
  // Notion API no soporta insertar en la posición 0 — se inserta inmediatamente
  // después del bloque de la propia DB Menú (queda adyacente, no al final de la página).
  await notion('PATCH', `/blocks/${parentPageId}/children`, { children: blocks, after: menuDbBlock.id })

  console.log('✓  Callout agregado junto a la DB Menú')
}

main().catch(err => {
  console.error('❌ ', err.message)
  process.exit(1)
})
