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

**Auto-deploy activo.** Cada merge/push a `dev` dispara un deployment automático a Production (`dev.dimoe.cl`) — confirmado empíricamente el 2026-07-17 tras correr `vercel git connect`. No hace falta correr `vercel deploy` a mano en el flujo normal.

Tras cada merge a `dev`, correr el smoke test (de solo lectura, sin efectos secundarios) para confirmar que el deploy automático terminó bien:

```bash
node scripts/smoke-deploy.mjs
```

Si algo falla, no asumir que es el código nuevo — comparar contra `next dev`/`next start` local primero (varios bugs de esta clase solo se reproducen en Vercel, nunca en local).

**Si alguna vez hace falta forzar un deploy manual** (ej. el automático no disparó, o se sospecha de un manifest de rutas corrupto tras varios deploys seguidos):

```bash
vercel deploy --prod --yes --force
```

El `--force` es importante en ese caso puntual — se detectó al menos un caso donde un deploy reusó un manifest de rutas corrupto/desactualizado y una ruta nueva dio 404 en producción pese a compilar bien localmente.

## Seguridad — protección de red (Vercel)

Qué cubre hoy la infraestructura sin ninguna configuración, y qué depende de trabajo de aplicación pendiente (work-item #235).

**Automático, ya activo, gratis en todos los planes (incluido Hobby — el plan de este proyecto):**
- Mitigación DDoS L3/L4/L7 — activa por defecto, sin configuración, sin costo.
- Firewall: bloqueo de IPs y reglas custom básicas.

**Manual, gratis, pero hay que activarlo a mano durante un ataque real (no es un toggle "siempre on"):**
- **Attack Mode** (Dashboard → Firewall → Bot Management → Attack Mode) — página de challenge para todo el tráfico excepto bots conocidos (Google, webhooks) y requests internos del propio proyecto. Gratis, ilimitado, sin impacto en SEO. Usar solo durante un ataque focalizado, no como default permanente (agrega fricción a usuarios reales).
  - ⚠ APIs standalone o tráfico no reconocido como "browser" pueden no pasar el challenge — si se activa, verificar que `/api/contact` siga funcionando.

**No cubierto por Vercel hoy — depende de las tasks #237/#238 del work-item #235:**
- Rate limiting a nivel de aplicación (cuántas veces puede la misma IP enviar el formulario de contacto) — Vercel ofrece esto como feature de pago (reglas de rate-limit del WAF), separado del rate limit de aplicación vía Upstash que resuelve #237. Se eligió resolver a nivel de aplicación primero (gratis, más control) antes de pagar por WAF.
- Captcha en el formulario (que un humano no pueda enviarlo cientos de veces manualmente) — no lo cubre nada de lo anterior, lo resuelve #238 (Turnstile).

**Conclusión:** el sitio ya está protegido contra un ataque de volumen de infraestructura (DDoS) sin hacer nada. Lo que falta es protección a nivel de aplicación (abuso del formulario específicamente) — eso es lo que agregan #237 y #238.

## ⚠️ Trampa conocida: ruta default de next-intl sin prefijo

`i18n/routing.ts` usa `localePrefix: 'as-needed'` — el locale default (`es`) se sirve **sin prefijo** (`/carta`) vía un rewrite interno del middleware, mientras que las rutas con prefijo explícito (`/en/carta`, y `/es/carta` que en realidad redirige a `/carta`) hacen match directo. Esta asimetría causó dos incidentes de producción (solo reproducibles en Vercel, nunca en local) durante el desarrollo del work-item #118 — ambos se resolvieron, pero la asimetría estructural sigue ahí.

**Regla:** cualquier página/ruta bajo el locale default sin prefijo que dependa de cookies, headers dinámicos o Draft Mode debe probarse explícitamente ahí (contra el dominio real de Vercel, no solo `next dev`/`next start` local) — no asumir que "funciona igual" que su versión prefijada.

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
