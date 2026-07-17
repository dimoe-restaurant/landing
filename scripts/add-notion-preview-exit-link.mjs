/**
 * One-shot script: agrega el callout "Salir de preview" al lado de los otros
 * 3 links de publicación controlada (ver scripts/setup-notion-callout.mjs).
 * Ejecutar UNA sola vez con: node scripts/add-notion-preview-exit-link.mjs
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

async function main() {
  console.log('🔎  Buscando página padre de la DB Menú...')
  const db = await notion('GET', `/databases/${DB_ID}`)
  const parentPageId = db.parent?.page_id
  if (!parentPageId) throw new Error('La DB Menú no tiene una página padre (parent.page_id ausente)')

  const children = await notion('GET', `/blocks/${parentPageId}/children?page_size=50`)
  const calloutBlocks = children.results.filter(b => b.type === 'callout')
  const lastCallout = calloutBlocks[calloutBlocks.length - 1]
  if (!lastCallout) throw new Error('No se encontraron los callouts existentes (correr primero scripts/setup-notion-callout.mjs)')

  console.log('🖊️  Agregando callout "Salir de preview"...')
  await notion('PATCH', `/blocks/${parentPageId}/children`, {
    children: [linkCallout('🚪', 'Salir de preview', `${SITE_URL}/api/preview/exit?secret=${SECRET}`)],
    after: lastCallout.id,
  })

  console.log('✓  Callout agregado')
}

main().catch(err => {
  console.error('❌ ', err.message)
  process.exit(1)
})
