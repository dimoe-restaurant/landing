---
type: skill
name: a11y
description: Auditoría de accesibilidad WCAG 2.1 AA con axe-core via Playwright. Reporta violaciones por severidad y crea work-item con tasks por cada hallazgo Critical/Serious. Distinto de /test (que corre specs existentes) — este audita gaps nuevos.
tags: [a11y, testing]
---

# /a11y

Auditoría de accesibilidad automática. Usa axe-core sobre Playwright (ya instalado) para detectar violaciones WCAG 2.1 AA. No crea specs permanentes — hace un barrido en una sesión y convierte los hallazgos en work-items accionables.

## Cuándo invocar

- Antes del primer deploy a producción.
- Después de agregar páginas o componentes nuevos.
- Como check periódico (recomendado: una vez por sprint).
- Si hay reporte externo de problemas de accesibilidad.

## Step 1 — Verificar dependencia axe-core

```bash
# axe-core/playwright es el wrapper oficial
pnpm list @axe-core/playwright 2>/dev/null || echo "NO_AXE"
```

Si no está instalado:
```bash
pnpm add -D @axe-core/playwright
```

Si el dev no quiere instalarlo → usar solo los checks manuales del Step 4.

## Step 2 — Levantar el servidor local

```bash
# El servidor debe estar corriendo para que Playwright pueda auditarlo
# Verifica si ya está corriendo en el puerto del proyecto
curl -s -o /dev/null -w "%{http_code}" http://localhost:39847 || echo "DOWN"
```

Si no está corriendo → `pnpm dev --port 39847` en background antes de continuar.

## Step 3 — Correr auditoría axe-core

Crear spec temporal (no se commitea):

```bash
cat > /tmp/a11y-audit.spec.ts << 'EOF'
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  { path: '/', name: 'Home' },
  { path: '/carta', name: 'Carta' },
  // agregar rutas nuevas aquí si aplica
];

for (const route of ROUTES) {
  test(`a11y: ${route.name} (${route.path})`, async ({ page }) => {
    await page.goto(route.path);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    // Loguear todas las violaciones para el reporte
    if (results.violations.length > 0) {
      console.log(JSON.stringify(results.violations, null, 2));
    }

    expect(results.violations).toEqual([]);
  });
}
EOF

# Correr solo el spec temporal contra el servidor local
PLAYWRIGHT_E2E_PORT=39847 npx playwright test /tmp/a11y-audit.spec.ts \
  --reporter=json 2>&1 | tee /tmp/a11y-results.json
```

## Step 4 — Checks manuales complementarios

Además de axe-core, verificar manualmente los puntos que los automáticos no cubren bien:

```bash
# Imágenes sin alt text
grep -rn '<img' app/ components/ --include="*.tsx" --include="*.jsx" \
  | grep -v 'alt=' | grep -v '// '

# Botones sin texto accesible (icon-only buttons)
grep -rn '<button' app/ components/ --include="*.tsx" \
  | grep -v 'aria-label\|aria-labelledby\|children'

# Inputs sin label
grep -rn '<input' app/ components/ --include="*.tsx" \
  | grep -v 'aria-label\|id=\|type="hidden"'

# Links sin texto descriptivo
grep -rn 'href=' app/ components/ --include="*.tsx" \
  | grep -iE '"(aquí|click here|ver más|más|here)"'
```

## Step 5 — Clasificar hallazgos

Categorías de axe-core:

| axe impact | Severidad | Acción |
|---|---|---|
| `critical` | Bloquea uso para usuarios con discapacidad | Task obligatoria |
| `serious` | Dificulta uso significativamente | Task obligatoria |
| `moderate` | Reduce calidad de experiencia | Task recomendada |
| `minor` | Mejora menor | Checkbox en work-item padre |

## Step 6 — Crear work-item con tasks (si hay Critical/Serious)

Si hay hallazgos críticos o serios, crear work-item igual que el agente `audit`:

```bash
source .claude/scripts/gh-isolated.sh || exit 1

# Work-item padre
gh issue create \
  --title "[A11Y] Violaciones de accesibilidad WCAG 2.1 AA" \
  --label "fix,a11y" \
  --body "$(cat <<EOF
## Objetivo
Corregir violaciones de accesibilidad detectadas en auditoría axe-core.

## Rutas auditadas
$(for route in "${ROUTES[@]}"; do echo "- $route"; done)

## Fecha del check
$(date +%Y-%m-%d)

## Tasks
<!-- Se llenan con los sub-issues reales -->
- [ ] #TBD

## Criterios de aceptación
- [ ] 0 violaciones critical/serious en axe-core
- [ ] /a11y pasa sin hallazgos bloqueantes
EOF
)"
```

Una task por hallazgo Critical/Serious, con:
- Elemento afectado (selector o descripción)
- Ruta donde aparece
- Regla WCAG violada
- Remediación concreta

## Step 7 — Reporte

```
=== /a11y — YYYY-MM-DD ===
Rutas auditadas: /, /carta

Hallazgos:
  CRITICAL (2):
    - Contraste insuficiente en botón CTA (#hero button) — WCAG 1.4.3
      Rutas: /
      Fix: cambiar color de #F5A623 a #C47D00 (ratio 4.5:1 requerido)

    - Imagen sin alt text (<img src="/plato.jpg">) — WCAG 1.1.1
      Rutas: /carta
      Fix: agregar alt="[descripción del plato]"

  SERIOUS (1):
    - Link sin texto descriptivo ("Haz clic aquí") — WCAG 2.4.6
      Rutas: /
      Fix: cambiar texto a "Ver menú completo"

  MODERATE (1):
    - Foco no visible en nav links — WCAG 2.4.7
      (incluido como checkbox en work-item, no task separada)

Work-item creado: #55 — [A11Y] Violaciones de accesibilidad WCAG 2.1 AA
Tasks creadas: #56 (contraste CTA), #57 (alt text), #58 (link descriptivo)
```

## Siguiente paso

- **Hallazgos Critical/Serious** → `/apply` en las tasks creadas
- **Solo Moderate/Minor** → agregar al backlog como chore
- **0 hallazgos** → confirmar en CLAUDE.md como "auditado en YYYY-MM-DD, baseline limpio"
