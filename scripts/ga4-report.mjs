/**
 * Reporte GA4 vía Analytics Data API (service account), sin dependencias nuevas
 * — firma el JWT a mano con el módulo `crypto` nativo de Node.
 *
 * Uso: node scripts/ga4-report.mjs [dias]
 * Default: 7 días.
 * Requiere GA4_PROPERTY_ID y GA4_SA_KEY_PATH en .env.local
 */

import { readFileSync } from 'fs'
import { createSign } from 'crypto'
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

const PROPERTY_ID = process.env.GA4_PROPERTY_ID
const KEY_PATH = process.env.GA4_SA_KEY_PATH
const DAYS = Number(process.argv[2] ?? 7)

if (!PROPERTY_ID) {
  console.error('❌  Falta GA4_PROPERTY_ID en .env.local')
  process.exit(1)
}
if (!KEY_PATH) {
  console.error('❌  Falta GA4_SA_KEY_PATH en .env.local')
  process.exit(1)
}

function base64url(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function getAccessToken() {
  const key = JSON.parse(readFileSync(KEY_PATH, 'utf8'))
  const now = Math.floor(Date.now() / 1000)

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = base64url(JSON.stringify({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }))

  const signer = createSign('RSA-SHA256')
  signer.update(`${header}.${claims}`)
  signer.end()
  const signature = signer.sign(key.private_key).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  const jwt = `${header}.${claims}.${signature}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`OAuth error: ${JSON.stringify(data)}`)
  return data.access_token
}

async function runReport(token, body) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`GA4 API error: ${JSON.stringify(data)}`)
  return data
}

function printTable(title, report) {
  console.log(`\n${title}`)
  console.log('-'.repeat(title.length))
  if (!report.rows?.length) {
    console.log('(sin datos en este rango)')
    return
  }
  const dimHeaders = report.dimensionHeaders.map(h => h.name)
  const metHeaders = report.metricHeaders.map(h => h.name)
  console.log([...dimHeaders, ...metHeaders].join(' | '))
  for (const row of report.rows) {
    const dims = row.dimensionValues.map(v => v.value)
    const mets = row.metricValues.map(v => v.value)
    console.log([...dims, ...mets].join(' | '))
  }
}

async function main() {
  console.log(`📊  GA4 property ${PROPERTY_ID} — últimos ${DAYS} día(s)\n`)
  const token = await getAccessToken()
  const dateRanges = [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }]

  const pages = await runReport(token, {
    dateRanges,
    dimensions: [{ name: 'pageTitle' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'sessions' },
      { name: 'averageSessionDuration' },
      { name: 'engagementRate' },
    ],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 20,
  })
  printTable('Vistas por página', pages)

  const events = await runReport(token, {
    dateRanges,
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    orderBys: [{ metric: { metricName: 'eventCount' } , desc: true }],
    limit: 20,
  })
  printTable('Eventos', events)

  const channels = await runReport(token, {
    dateRanges,
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10,
  })
  printTable('Sesiones por canal', channels)

  const carta = await runReport(token, {
    dateRanges,
    dimensions: [{ name: 'dayOfWeekName' }, { name: 'hour' }],
    metrics: [{ name: 'sessions' }],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: { matchType: 'CONTAINS', value: 'carta', caseSensitive: false },
      },
    },
    limit: 1000,
  })
  printCartaSplit(carta)
}

// Horario real de atención (posted +1h de tolerancia de cierre, confirmado por el dueño).
// El servicio de viernes y sábado cruza medianoche, por eso la hora 0 del día
// siguiente también cuenta como "en servicio".
function isInService(dayName, hour) {
  const h = Number(hour)
  switch (dayName) {
    case 'Monday': return false
    case 'Tuesday':
    case 'Wednesday':
    case 'Thursday':
    case 'Friday': return h >= 12 && h <= 23
    case 'Saturday': return (h >= 13 && h <= 23) || h === 0 // hora 0 = cola del servicio del viernes
    case 'Sunday': return (h >= 13 && h <= 18) || h === 0 // hora 0 = cola del servicio del sábado
    default: return false
  }
}

function printCartaSplit(report) {
  const title = 'Vistas a la Carta: en-local (horario de servicio) vs. externas'
  console.log(`\n${title}`)
  console.log('-'.repeat(title.length))
  if (!report.rows?.length) {
    console.log('(sin datos en este rango)')
    return
  }
  let inService = 0
  let outside = 0
  for (const row of report.rows) {
    const [dayName, hour] = row.dimensionValues.map(v => v.value)
    const sessions = Number(row.metricValues[0].value)
    if (isInService(dayName, hour)) inService += sessions
    else outside += sessions
  }
  const total = inService + outside
  console.log(`En horario de servicio (probable QR de mesa): ${inService} sesiones (${total ? Math.round((inService / total) * 100) : 0}%)`)
  console.log(`Fuera de horario (tráfico externo real):       ${outside} sesiones (${total ? Math.round((outside / total) * 100) : 0}%)`)
}

main().catch(err => {
  console.error('❌', err.message)
  process.exit(1)
})
