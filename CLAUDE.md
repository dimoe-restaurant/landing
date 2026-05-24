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
