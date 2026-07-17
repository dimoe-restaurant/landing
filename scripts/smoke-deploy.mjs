/**
 * Smoke test post-deploy para el flujo de publicación controlada (work-item #118).
 * Corré esto después de cada `vercel deploy --prod` manual — es lo único que
 * habría detectado los incidentes de producción encontrados en la auditoría
 * (401 vs 404 en las rutas de publish/undo/preview, y contenido real en /carta).
 *
 * No usa el secret real ni dispara publish/undo — es de solo lectura, sin
 * efectos secundarios, para poder correrlo tantas veces como haga falta.
 *
 * Uso: node scripts/smoke-deploy.mjs [base-url]
 * Default base-url: https://dev.dimoe.cl
 */

const BASE_URL = process.argv[2] ?? 'https://dev.dimoe.cl'

// Item real y estable del menú publicado — ajustar si cambia en Notion.
const MENU_MARKER = 'Palitos di Agglio'

const checks = []
let failed = 0

function check(name, ok, detail) {
  checks.push({ name, ok, detail })
  if (!ok) failed++
  console.log(`${ok ? '✓' : '✗'}  ${name}${detail ? ' — ' + detail : ''}`)
}

async function fetchStatus(path) {
  const res = await fetch(`${BASE_URL}${path}`, { redirect: 'manual' })
  return res.status
}

async function fetchBody(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  return res.text()
}

async function main() {
  console.log(`🔎  Smoke test contra ${BASE_URL}\n`)

  // Rutas de auth — sin secret, deben rechazar con 401 (no 404, no 500).
  for (const path of ['/api/publish', '/api/undo', '/api/preview']) {
    const status = await fetchStatus(path)
    check(`${path} sin secret → 401`, status === 401, `status real: ${status}`)
  }

  // /api/preview-exit no requiere secret (solo borra la cookie propia del navegador) — debe redirigir.
  const exitStatus = await fetchStatus('/api/preview-exit')
  check('/api/preview-exit sin secret → 307 (no requiere auth)', exitStatus === 307, `status real: ${exitStatus}`)

  // Contenido real publicado, visible sin cookie de preview.
  const bareBody = await fetchBody('/carta')
  check('/carta contiene el item marcador del menú', bareBody.includes(MENU_MARKER))

  const esStatus = await fetchStatus('/es/carta')
  check('/es/carta redirige (307) al path sin prefijo (comportamiento esperado de next-intl)', esStatus === 307, `status real: ${esStatus}`)

  console.log(`\n${failed === 0 ? '✅  Todo OK' : `❌  ${failed} check(s) fallaron`}`)
  process.exit(failed === 0 ? 0 : 1)
}

main().catch(err => {
  console.error('❌  Error corriendo el smoke test:', err.message)
  process.exit(1)
})
