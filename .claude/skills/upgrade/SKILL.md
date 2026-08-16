---
name: upgrade
description: Workflow proactivo de actualización de dependencias. Identifica outdated, categoriza por riesgo (patch/minor/major), revisa breaking changes en majors y crea work-item con tasks por grupo. Distinto del agente secure (que corre npm audit reactivo para CVEs).
---

# /upgrade

Actualización planificada de dependencias. El agente `secure` es reactivo — bloquea CVEs. `/upgrade` es proactivo — mantiene el árbol de deps sano antes de que acumulen deuda.

## Cuándo invocar

- Una vez por mes o antes de un release importante.
- Cuando `pnpm outdated` muestra muchas deps atrasadas.
- Antes del agente `pentest` (deps actualizadas reducen superficie).

## Step 1 — Inventario de deps outdated

```bash
pnpm outdated 2>&1
```

Capturar: nombre, versión actual, versión wanted (semver-safe), versión latest.

```bash
# Separar por categoría de riesgo
pnpm outdated --format json 2>/dev/null | node -e "
const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
const patch=[], minor=[], major=[];
for (const [name, info] of Object.entries(data)) {
  const cur = info.current?.split('.').map(Number) || [0,0,0];
  const lat = info.latest?.split('.').map(Number) || [0,0,0];
  if (lat[0] > cur[0]) major.push({name, current: info.current, latest: info.latest});
  else if (lat[1] > cur[1]) minor.push({name, current: info.current, latest: info.latest});
  else patch.push({name, current: info.current, latest: info.latest});
}
console.log('PATCH:', patch.map(d=>d.name).join(', '));
console.log('MINOR:', minor.map(d=>d.name).join(', '));
console.log('MAJOR:', major.map(d=>'\n  '+d.name+': '+d.current+' → '+d.latest).join(''));
"
```

## Step 2 — Revisar breaking changes en majors

Para cada dep con major bump, leer el changelog antes de decidir:

```bash
# Ver changelog/releases en GitHub (cuando está disponible)
for dep in <lista-de-majors>; do
  echo "=== $dep ==="
  npm view "$dep" repository.url 2>/dev/null
  # Luego leer CHANGELOG.md o releases del repo con gh o WebFetch
done
```

Clasificar cada major como:
- **Safe**: breaking changes no afectan el uso actual en este repo
- **Requires work**: hay cambios de API que necesitan refactor (→ task separada)
- **Skip**: la versión nueva no es compatible todavía (documentar en work-item)

## Step 3 — Plan de upgrade por grupos

Mostrar al dev el plan antes de ejecutar:

```
📦 Plan de upgrade
──────────────────────────────────────────
PATCH (seguro, batch):
  tailwindcss 4.0.1 → 4.0.3
  typescript 5.3.2 → 5.3.4
  @types/react 18.2.45 → 18.2.48

MINOR (revisar, batch con tests):
  framer-motion 10.16.4 → 10.18.0
  next-intl 3.4.0 → 3.6.2

MAJOR (cada uno por separado, con task en GitHub):
  next 14.0.4 → 15.2.0  — requiere trabajo (app router changes)
  eslint 8.56.0 → 9.0.0 — requiere trabajo (config format change)

──────────────────────────────────────────
¿Proceder? [S/n]
```

## Step 4 — Ejecutar por grupos

### Grupo patch — batch seguro

```bash
# Solo deps con patch bump
pnpm update --filter "..." 2>&1

# Verificar build + tests
pnpm build 2>&1 | tail -5
pnpm test:e2e --reporter=line 2>&1 | tail -10
```

Si pasan → commitear como una task:
```
chore(deps): patch upgrades — <lista corta> (#N) — chore #M
```

### Grupo minor — batch con verificación

```bash
pnpm update <dep1> <dep2> 2>&1
pnpm build && pnpm test:e2e
```

Si fallan tests → revertir la dep problemática e investigar:
```bash
pnpm add <dep-problemática>@<versión-anterior>
```

### Grupo major — cada uno individual

Cada major con breaking changes potenciales = una task separada en el work-item. No hacer batch de majors.

```bash
# Ejemplo: actualizar Next.js
pnpm add next@latest react@latest react-dom@latest
pnpm build 2>&1   # detectar errores de compilación
pnpm test:e2e     # detectar regresiones de comportamiento
```

## Step 5 — Crear work-item en GitHub

Si hay majors que requieren trabajo, crear work-item:

```bash
source .claude/scripts/gh-isolated.sh || exit 1

gh issue create \
  --title "[CHORE] Upgrade de dependencias — $(date +%Y-%m)" \
  --label "chore" \
  --body "$(cat <<EOF
## Objetivo
Mantener el árbol de dependencias actualizado.

## Inventario
- Patch: <N> deps — batch seguro
- Minor: <N> deps — batch con verificación
- Major: <lista> — tasks individuales

## Criterios de aceptación
- [ ] pnpm build verde tras cada grupo
- [ ] pnpm test:e2e verde tras cada grupo
- [ ] pnpm audit sin CVEs nuevos
- [ ] Sin regresiones visuales detectadas por /perf
EOF
)"
```

Una task por cada major que requiera refactor.

## Step 6 — Reporte final

```
=== /upgrade completado ===

Patch (batch):  8 deps actualizadas ✓
Minor (batch):  3 deps actualizadas ✓ (framer-motion necesitó fix en 1 import)
Major:
  next:        task #61 creada (requiere migración config)
  eslint:      task #62 creada (requiere nuevo formato)
  tailwind:    ✓ actualizado sin breaking changes

Tests:         ✓ pasan tras patch + minor
Work-item:     #60 — Upgrade deps 2026-06
```

## Reglas

- **Nunca batch majors.** Cada major con cambios es una task y un commit separado.
- **Siempre correr build + test:e2e** después de cada grupo, no solo al final.
- **No actualizar y commitear sin verificar.** El build puede pasar pero los tests fallar.
- Si una dep tiene CVE Y es outdated → priorizar; no esperar al ciclo mensual.

## Siguiente paso

- **Upgrades completados sin issues** → documentar en CLAUDE.md la fecha del último upgrade
- **Tasks de majors pendientes** → `/apply` en cada una
- **CVE nuevo descubierto durante el proceso** → agente `secure` para triage de severidad
