---
name: monitor
description: Verificación post-deploy en producción. Confirma que el deploy levantó, las rutas críticas responden y no hay errores nuevos en logs. Invocar después de /deploy o ante sospecha de problema en prod.
---

# /monitor

Cierra el loop deploy→verify. `/deploy` sube el código; `/monitor` confirma que la app real funciona. Son skills distintos: `/verify` es local pre-PR, `/monitor` es producción post-merge.

## Cuándo invocar

- Inmediatamente después de `/deploy`.
- Cuando el dev reporta comportamiento raro en producción.
- Como check periódico antes de iniciar trabajo en una sesión.

## Step 1 — Estado del deploy en Vercel

```bash
# Último deployment y su estado
npx vercel ls --prod 2>/dev/null | head -5

# O via GitHub deployments API
gh api repos/dimoe-restaurant/landing/deployments \
  --jq '[.[:3] | .[] | {id, environment, created_at}]'

gh api repos/dimoe-restaurant/landing/deployments/$(
  gh api repos/dimoe-restaurant/landing/deployments --jq '.[0].id'
)/statuses --jq '.[0] | {state, description, target_url}'
```

Si el estado no es `success` → parar y reportar. No continuar con checks de URL.

## Step 2 — Rutas críticas responden

Verificar que las rutas principales devuelven 200 y cargan sin errores:

```bash
BASE_URL="https://dimoe.cl"   # o la URL del preview si es deploy a dev

for path in "/" "/carta" "/contacto"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${BASE_URL}${path}")
  echo "${path}: ${STATUS}"
done
```

Cualquier código distinto de 200 → bloqueante. Reportar ruta y status.

Verificar también que no hay redirect loops:
```bash
curl -s -o /dev/null -w "%{url_effective} %{num_redirects}\n" \
  -L --max-redirs 5 "$BASE_URL"
```

## Step 3 — Verificar JS sin errores en browser

Usar Playwright headless para detectar errores de consola en producción:

```bash
# Script temporal de verificación
cat > /tmp/monitor-check.ts << 'EOF'
import { chromium } from '@playwright/test';

const BASE = process.env.MONITOR_URL || 'https://dimoe.cl';
const ROUTES = ['/', '/carta'];

(async () => {
  const browser = await chromium.launch();
  const errors: string[] = [];

  for (const route of ROUTES) {
    const page = await browser.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(`${route}: ${msg.text()}`);
    });
    page.on('pageerror', err => errors.push(`${route} uncaught: ${err.message}`));
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.close();
  }

  await browser.close();

  if (errors.length > 0) {
    console.error('JS ERRORS DETECTED:');
    errors.forEach(e => console.error(' -', e));
    process.exit(1);
  } else {
    console.log('✓ No JS errors in production');
  }
})();
EOF

npx tsx /tmp/monitor-check.ts 2>&1
```

Si hay errores de JS → bloqueante. Sugerir `/investigate-bug` + `/rollback` si es crítico.

## Step 4 — Logs de Vercel (últimos errores)

```bash
# Requiere Vercel CLI autenticado
npx vercel logs --prod --output raw 2>/dev/null | grep -iE "error|exception|500" | tail -20
```

Si no hay Vercel CLI disponible → revisar manualmente en el dashboard e indicar la URL al dev.

## Step 5 — Reporte

```
=== /monitor — YYYY-MM-DD HH:MM ===
URL: https://dimoe.cl

Deploy Vercel:     ✓ ready (hace 3 min)
Rutas críticas:
  /               ✓ 200
  /carta          ✓ 200
  /contacto       ✓ 200
JS errors:        ✓ ninguno
Logs (errores):   ✓ sin errores nuevos

Estado: ✓ Producción saludable.
```

Si hay problemas:
```
Estado: ✗ 2 problemas detectados

  CRÍTICO: /carta devuelve 500
  WARN:    1 error de JS en consola ("Cannot read property of undefined")

Acciones sugeridas:
  → /rollback si el error es nuevo desde el último deploy
  → /investigate-bug + /apply si es un bug conocido
```

## Cuándo escalar a `/rollback`

- Ruta crítica devuelve 5xx.
- Errores de JS en consola que no existían antes del deploy.
- Deploy atascado en estado `building` > 10 minutos.

## Siguiente paso

- **Todo verde** → sesión puede continuar normalmente
- **Errores detectados** → `/investigate-bug` para identificar causa → `/apply` fix → `/deploy` → `/monitor` de nuevo
- **Error crítico nuevo en prod** → `/rollback` primero, luego `/investigate-bug` sin presión
