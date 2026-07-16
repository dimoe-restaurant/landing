/**
 * One-shot script: exporta el estado ACTUAL completo de la DB Menú de Notion
 * a un JSON local, con timestamp. Red de seguridad previa al flujo de
 * publicación controlada (work-item #118) — no escribe nada en Notion.
 *
 * Ejecutar con: node scripts/backup-menu.mjs
 * Requiere NOTION_ACCESS_TOKEN y NOTION_DB_MENU en .env.local
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
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

if (!TOKEN || TOKEN.length < 10) {
  console.error('❌  Falta NOTION_ACCESS_TOKEN en .env.local')
  process.exit(1)
}
if (!DB_ID) {
  console.error('❌  Falta NOTION_DB_MENU en .env.local')
  process.exit(1)
}

const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
}

async function fetchAllPages() {
  const results = []
  let cursor = undefined

  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        page_size: 100,
        ...(cursor ? { start_cursor: cursor } : {}),
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(`Notion API: ${JSON.stringify(data)}`)

    results.push(...data.results)
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)

  return results
}

async function main() {
  console.log('🔎  Exportando DB Menú completa de Notion...\n')

  const pages = await fetchAllPages()

  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
  mkdirSync(resolve(process.cwd(), 'backups'), { recursive: true })
  const outPath = resolve(process.cwd(), 'backups', `menu-${timestamp}.json`)

  writeFileSync(outPath, JSON.stringify(pages, null, 2))

  console.log(`✓  ${pages.length} páginas exportadas`)
  console.log(`✓  Guardado en: ${outPath}`)
}

main().catch(err => {
  console.error('❌ ', err.message)
  process.exit(1)
})
