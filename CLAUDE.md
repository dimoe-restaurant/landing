# CLAUDE.md — dimoe-landing

Landing de la marca **dimoe** (dimoe.cl). Objetivo: posicionar la marca y vender.
Migración desde GoDaddy a código propio. Deploy en Vercel.

## Repo

**GitHub:** `dimoe-restaurant/landing`  
**Dominio:** dimoe.cl  
**Deploy:** Vercel (rama `main` → producción, `dev` → preview)  
**Puerto local:** 39847 (convención Playwright del workspace)

## Stack web

- **Next.js 15** (App Router) — Vercel-native, SEO, RSC
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Framer Motion** (animaciones de marca)
- Tests E2E: **Playwright** (gate de `/apply`)

## Estructura

```
app/                   ← Next.js App Router
  layout.tsx
  page.tsx
  (secciones)/
components/
  ui/                  ← primitivos (Button, Card, etc.)
  sections/            ← Hero, Menu, Contact, etc.
public/
  images/
tests/
  e2e/                 ← specs Playwright
```

## Setup local

```bash
pnpm install
pnpm dev              # → http://localhost:39847
```

## Deploy a producción (dev.dimoe.cl)

**No hay auto-deploy configurado a Production.** Los Preview deployments sí se generan automáticos por cada push/PR, pero `dev.dimoe.cl` (el dominio real, target "Production" del proyecto Vercel) solo se actualiza con:

```bash
vercel deploy --prod --yes --force
```

**El `--force` es obligatorio** — sin él, se detectó al menos un caso donde el deploy reusó un manifest de rutas corrupto/desactualizado de un deployment anterior y una ruta nueva dio 404 en producción pese a compilar bien localmente.

Tras cada deploy, correr el smoke test (de solo lectura, sin efectos secundarios):

```bash
node scripts/smoke-deploy.mjs
```

Si algo falla, no asumir que es el código nuevo — comparar contra `next dev`/`next start` local primero (varios bugs de esta clase solo se reproducen en Vercel, nunca en local).

## Convenciones

### Commits

Conventional commits:
```
feat(scope): descripción
fix(scope): descripción
chore(scope): descripción
```

### Branching

| Branch | Rol |
|---|---|
| `main` | Producción → Vercel prod |
| `dev` | Integración → Vercel preview |
| `feat/*`, `fix/*`, `chore/*` | Trabajo efímero por work-item |
