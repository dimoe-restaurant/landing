---
type: skill
name: perf
description: Baseline de performance. Mide Lighthouse scores y bundle size. Modo --before guarda el baseline; modo --after compara contra él. Usar antes y después de cambios que puedan afectar carga o CWV.
tags: [performance, testing]
---

# /perf

Mide y compara performance. Dos modos:
- **`/perf --before`** → guarda baseline del estado actual en `.claude/perf-baseline.json`
- **`/perf --after`** → compara estado actual contra el baseline y reporta delta
- **`/perf`** (sin args) → mide y reporta sin comparar

## Cuándo invocar

- Antes de un refactor que toca imágenes, fuentes, scripts o SSR: `--before`
- Después de ese mismo cambio: `--after`
- Como check periódico antes de un release a producción

## Step 1 — Bundle size (siempre disponible, sin servidor)

```bash
pnpm build 2>&1 | grep -E "Route|Page|Size|First Load" | head -40
```

Capturar específicamente el "First Load JS" por ruta — ese número importa para SEO y CWV.

## Step 2 — Lighthouse (requiere servidor corriendo)

Verificar servidor local:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:39847 || echo "DOWN"
```

Si está down → `pnpm dev --port 39847` antes de continuar (o apuntar a prod con `PERF_URL`).

```bash
PERF_URL=${PERF_URL:-"http://localhost:39847"}

# Correr Lighthouse en las rutas críticas
for path in "/" "/carta"; do
  echo "=== Lighthouse: ${PERF_URL}${path} ==="
  npx lighthouse "${PERF_URL}${path}" \
    --only-categories=performance,accessibility,seo,best-practices \
    --output=json \
    --output-path="/tmp/lh-${path//\//-}.json" \
    --chrome-flags="--headless --no-sandbox" \
    --quiet 2>/dev/null

  # Extraer scores
  node -e "
    const r = require('/tmp/lh-${path//\//-}.json');
    const c = r.categories;
    console.log('Performance:', Math.round(c.performance.score * 100));
    console.log('Accessibility:', Math.round(c.accessibility.score * 100));
    console.log('SEO:', Math.round(c.seo.score * 100));
    console.log('Best Practices:', Math.round(c['best-practices'].score * 100));
    const m = r.audits;
    console.log('LCP:', m['largest-contentful-paint']?.displayValue);
    console.log('CLS:', m['cumulative-layout-shift']?.displayValue);
    console.log('TBT:', m['total-blocking-time']?.displayValue);
  " 2>/dev/null
done
```

Si `lighthouse` no está instalado:
```bash
npm install -g lighthouse
```

## Step 3 — Guardar o comparar baseline

### Modo `--before` (guardar):

```bash
cat > .claude/perf-baseline.json << EOF
{
  "date": "$(date +%Y-%m-%d)",
  "commit": "$(git rev-parse --short HEAD)",
  "bundle": {
    "first_load_js_home": "<valor en kB>",
    "first_load_js_carta": "<valor en kB>"
  },
  "lighthouse": {
    "/": {
      "performance": <score>,
      "accessibility": <score>,
      "seo": <score>,
      "lcp": "<valor>",
      "cls": "<valor>"
    },
    "/carta": { ... }
  }
}
EOF
```

Commitear el baseline si corresponde (es un snapshot de estado, útil en PRs):
```bash
git add .claude/perf-baseline.json
# Se commitea junto con los cambios del work-item en /build
```

### Modo `--after` (comparar):

Leer `.claude/perf-baseline.json` y calcular delta:

```
=== /perf --after — vs baseline de 2026-06-01 ===

Bundle size:
  / First Load JS:     82kB → 79kB  ✓ -3kB (-4%)
  /carta First Load:   94kB → 98kB  ⚠ +4kB (+4%) — revisar imports nuevos

Lighthouse /:
  Performance:    72 → 81  ✓ +9 pts
  Accessibility:  88 → 95  ✓ +7 pts (mejoras de /a11y)
  SEO:            91 → 91    sin cambio
  LCP:            2.8s → 2.1s  ✓ mejora
  CLS:            0.12 → 0.08  ✓ mejora

Lighthouse /carta:
  Performance:    68 → 65  ⚠ -3 pts — puede ser variación de red, re-testear
```

## Umbrales de referencia (Core Web Vitals 2024)

| Métrica | Bueno | Necesita mejora | Malo |
|---|---|---|---|
| LCP | < 2.5s | 2.5–4s | > 4s |
| CLS | < 0.1 | 0.1–0.25 | > 0.25 |
| TBT (proxy FID) | < 200ms | 200–600ms | > 600ms |
| Performance score | ≥ 90 | 50–89 | < 50 |

## Step 4 — Crear work-item si hay regresiones

Si el delta muestra regresión en Performance score > 5 pts o LCP > +0.5s:

```bash
gh issue create \
  --title "[PERF] Regresión de performance en $(date +%Y-%m-%d)" \
  --label "fix,performance" \
  --body "Detectado en /perf --after. Delta: ..."
```

## Siguiente paso

- **Scores mejoraron o sin cambio** → confirmar y continuar
- **Regresión detectada** → `/investigate-bug` para identificar qué cambio la causó; crear work-item
- **Score de Accessibility bajó** → `/a11y` para auditoría detallada
- **Bundle creció > 10%** → revisar imports nuevos, considerar lazy loading
