/**
 * One-shot script: crea la estructura de Notion para dimoe landing.
 * Ejecutar UNA sola vez con: node scripts/setup-notion.mjs
 *
 * Requiere NOTION_ACCESS_TOKEN en .env.local
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// Cargar .env.local manualmente
try {
  const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  }
} catch {
  // Si no existe .env.local, asumir que la var ya está en el entorno
}

const TOKEN = process.env.NOTION_ACCESS_TOKEN
if (!TOKEN) {
  console.error('❌  Falta NOTION_ACCESS_TOKEN en .env.local')
  process.exit(1)
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
}

async function notion(method, path, body) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`Notion API ${path}: ${JSON.stringify(data)}`)
  return data
}

async function createPage(title, emoji, parentPageId) {
  const parent = parentPageId
    ? { type: 'page_id', page_id: parentPageId }
    : { type: 'workspace', workspace: true }

  return notion('POST', '/pages', {
    parent,
    icon: { type: 'emoji', emoji },
    properties: {
      title: { title: [{ text: { content: title } }] },
    },
  })
}

async function createDatabase(title, parentPageId, properties) {
  return notion('POST', '/databases', {
    parent: { type: 'page_id', page_id: parentPageId },
    title: [{ text: { content: title } }],
    properties,
  })
}

async function main() {
  console.log('🚀  Creando estructura Notion para dimoe...\n')

  // --- Root pages ---
  const cms = await createPage('CMS — Landing', '🖊️')
  const crm = await createPage('CRM — Leads', '📥')
  console.log(`✓  CMS page:  ${cms.id}`)
  console.log(`✓  CRM page:  ${crm.id}`)

  // --- CMS: Menú ---
  const menuDb = await createDatabase('Menú', cms.id, {
    Nombre: { title: {} },
    Descripción: { rich_text: {} },
    Precio: { number: { format: 'number' } },
    Categoría: {
      select: {
        options: [
          { name: 'Pizzas', color: 'red' },
          { name: 'Bebidas', color: 'blue' },
          { name: 'Extras', color: 'yellow' },
        ],
      },
    },
    Disponible: { checkbox: {} },
    'Imagen URL': { url: {} },
  })
  console.log(`✓  DB Menú:   ${menuDb.id}`)

  // --- CMS: Contenido Hero ---
  const heroDb = await createDatabase('Contenido Hero', cms.id, {
    Campo: { title: {} },
    Valor: { rich_text: {} },
  })
  console.log(`✓  DB Hero:   ${heroDb.id}`)

  // Seed: filas del Hero
  for (const [campo, valor] of [
    ['titulo_h1', 'Pizza artesanal en'],
    ['subtitulo', 'Masa madre, ingredientes frescos, horno a leña.'],
    ['cta_texto', 'Ver el menú'],
  ]) {
    await notion('POST', '/pages', {
      parent: { database_id: heroDb.id },
      properties: {
        Campo: { title: [{ text: { content: campo } }] },
        Valor: { rich_text: [{ text: { content: valor } }] },
      },
    })
  }
  console.log(`✓  Hero seed: 3 campos`)

  // --- CMS: Info Restaurante ---
  const infoDb = await createDatabase('Info Restaurante', cms.id, {
    Campo: { title: {} },
    Valor: { rich_text: {} },
  })
  console.log(`✓  DB Info:   ${infoDb.id}`)

  for (const [campo, valor] of [
    ['direccion', ''],
    ['telefono', ''],
    ['horario', ''],
    ['instagram_url', ''],
    ['maps_url', ''],
  ]) {
    await notion('POST', '/pages', {
      parent: { database_id: infoDb.id },
      properties: {
        Campo: { title: [{ text: { content: campo } }] },
        Valor: { rich_text: [{ text: { content: valor } }] },
      },
    })
  }
  console.log(`✓  Info seed: 5 campos`)

  // --- CRM: Contactos ---
  const contactosDb = await createDatabase('Contactos', crm.id, {
    Nombre: { title: {} },
    Email: { email: {} },
    Mensaje: { rich_text: {} },
    Fecha: { date: {} },
    Estado: {
      select: {
        options: [
          { name: 'Nuevo', color: 'blue' },
          { name: 'Contactado', color: 'yellow' },
          { name: 'Cerrado', color: 'green' },
        ],
      },
    },
  })
  console.log(`✓  DB Contactos: ${contactosDb.id}`)

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Listo. Agrega estas vars a .env.local y Vercel:

NOTION_DB_MENU=${menuDb.id}
NOTION_DB_HERO=${heroDb.id}
NOTION_DB_INFO=${infoDb.id}
NOTION_DB_CONTACTOS=${contactosDb.id}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
}

main().catch(err => {
  console.error('❌ ', err.message)
  process.exit(1)
})
