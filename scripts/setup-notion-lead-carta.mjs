/**
 * One-shot script: extiende la base Notion "Contactos" para el origen "Carta - Nuevo Cliente".
 * Ejecutar UNA sola vez con: node scripts/setup-notion-lead-carta.mjs
 *
 * Requiere NOTION_ACCESS_TOKEN y NOTION_DB_CONTACTOS en .env.local
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

try {
  const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length && !process.env[key.trim()]) {
      const val = rest.join('=').trim().replace(/^["']|["']$/g, '')
      if (val) process.env[key.trim()] = val
    }
  }
} catch {
  // Si no existe .env.local, las vars deben venir del entorno
}

const TOKEN = process.env.NOTION_ACCESS_TOKEN
const DB_ID = process.env.NOTION_DB_CONTACTOS
if (!TOKEN || !DB_ID) {
  console.error('❌  Falta NOTION_ACCESS_TOKEN o NOTION_DB_CONTACTOS en .env.local')
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

const NEW_ORIGEN = 'Carta - Nuevo Cliente'

async function main() {
  console.log('🚀  Extendiendo base Contactos para leads de /carta...\n')

  const db = await notion('GET', `/databases/${DB_ID}`)
  const currentOptions = db.properties.Origen?.select?.options ?? []

  if (currentOptions.some(o => o.name === NEW_ORIGEN)) {
    console.log(`ℹ  La opción "${NEW_ORIGEN}" ya existe en Origen — no se duplica.`)
  } else {
    await notion('PATCH', `/databases/${DB_ID}`, {
      properties: {
        Origen: {
          select: {
            options: [...currentOptions, { name: NEW_ORIGEN, color: 'purple' }],
          },
        },
      },
    })
    console.log(`✓  Opción "${NEW_ORIGEN}" agregada a Origen (preservando las ${currentOptions.length} opciones existentes)`)
  }

  if (db.properties['Fecha de Nacimiento']) {
    console.log('ℹ  La propiedad "Fecha de Nacimiento" ya existe — no se recrea.')
  } else {
    await notion('PATCH', `/databases/${DB_ID}`, {
      properties: {
        'Fecha de Nacimiento': { date: {} },
      },
    })
    console.log('✓  Propiedad "Fecha de Nacimiento" (date) agregada')
  }

  console.log('\n✅  Listo — base Contactos lista para el origen "Carta - Nuevo Cliente".')
}

main().catch(err => {
  console.error('❌ ', err.message)
  process.exit(1)
})
