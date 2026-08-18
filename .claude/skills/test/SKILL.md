---
type: skill
name: test
description: Corre el gate de tests (Playwright, ver tests.md) e identifica specs faltantes.
tags: [testing]
---

# /test

Corre el gate de tests definido en `.claude/rules/tests.md` e identifica qué páginas/flujos públicos todavía no tienen spec.

## Cuándo invocar

- Después de `/apply` para verificar que la implementación está completa.
- Antes del agente `pr-review` para asegurar que el PR no tiene tests rotos.
- Antes del agente `secure` y de `/deploy` como gate de calidad.

## Pasos

### 1. Correr el gate único del repo

El gate de este repo es Playwright — ver `.claude/rules/tests.md` para la
convención completa (puerto `39847`, script `test:e2e`, carpeta
`tests/e2e/`). No dupliques esa lógica acá; solo invócala:

```bash
pnpm run test:e2e 2>&1
```

Si el repo alguna vez deja de tener `test:e2e` en `package.json`, es un
gap de `tests.md`, no algo que este skill deba improvisar detectando
otro runner.

### 2. Analizar resultados

Para cada test fallido:
- Identificar si es un test roto por el código nuevo o un test preexistente roto
- Si es por código nuevo → reportar al dev qué función está fallando
- Si es preexistente → registrarlo como deuda técnica separada, no bloqueante

### 3. Identificar componentes/rutas sin spec

```bash
# Páginas y componentes sin spec correspondiente en tests/e2e/
find app components -name "*.tsx" -not -name "*.test.*" 2>/dev/null | head -30
ls tests/e2e/*.spec.ts 2>/dev/null
```

Cruzar ambas listas a ojo — no hay tooling de cobertura configurado para
Playwright en este repo; el criterio es "toda página/flujo público tiene
al menos un spec happy-path + un caso de error" (ver `tests.md`).

### 4. Generar reporte

```
=== /test — Reporte ===

Suite: 12 passed / 1 failed / 0 skipped

Tests fallidos:
  ✗ contacto.spec.ts › muestra error si Turnstile falla
    → el form no muestra el mensaje de error esperado

Specs faltantes (páginas sin spec en tests/e2e/):
  app/reserva/page.tsx
```

### 5. Decidir si continuar

- **Todo verde** → listo para `/build` o el agente `pr-review`
- **Tests fallidos por código nuevo** → volver a `/apply` o llamar a `/investigate-bug`
- **Tests fallidos preexistentes** → crear issue de deuda técnica y continuar
- **Página/flujo público sin spec** → escribir el spec mínimo antes de continuar

## Siguiente paso

- **Todo verde** → `/build` (guardar progreso) o el agente `pr-review` (si ya hay PR)
- **Tests fallan por código nuevo** → `/investigate-bug` con el error específico
- **Página/flujo público sin spec** → `/apply` para agregar el spec faltante
- **Tests preexistentes rotos** → crear issue de deuda técnica con `/plan-task` y continuar

## Notas

- No modificar specs existentes para que pasen — solo el código de producción.
- Mocks (MSW) para llamadas a API, no credenciales reales — ver `tests.md`.
- Si una página/flujo público nuevo no tiene spec, crearlo antes de dar la task por terminada (ver `/apply` paso 8).
