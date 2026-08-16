# CLAUDE.md — dimoe-landing

Landing de la marca **dimoe** (dimoe.cl). Objetivo: posicionar la marca y vender.
Migración desde GoDaddy a código propio. Deploy en Vercel. Proyecto 100%
independiente — no comparar ni referenciar otros proyectos u organizaciones.

## Repo

**GitHub:** `dimoe-restaurant/landing`
**Dominio:** dimoe.cl
**Deploy:** Vercel (rama `main` → producción, `dev` → preview)
**Puerto local:** 39847 (convención Playwright del workspace)

## Stack

- Next.js 15 (App Router) — Vercel-native, SEO, RSC
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion (animaciones de marca)
- Tests: Playwright (gate de `/apply`, ver `.claude/rules/tests.md`)

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

## Gotchas y decisiones no obvias

- **Deploy a `dev.dimoe.cl` es automático** — cada merge/push a `dev`
  dispara un deployment a Production (`dev.dimoe.cl`), confirmado
  empíricamente el 2026-07-17 tras `vercel git connect`. No hace falta
  `vercel deploy` a mano en el flujo normal. Tras cada merge a `dev`,
  correr `node scripts/smoke-deploy.mjs` (smoke test de solo lectura).
  Si algo falla, comparar contra `next dev`/`next start` local antes de
  asumir que es el código nuevo — varios bugs de esta clase solo se
  reproducen en Vercel.
- **Forzar deploy manual** (el automático no disparó, o se sospecha de
  un manifest de rutas corrupto): `vercel deploy --prod --yes --force`.
  El `--force` importa — se detectó un caso donde un deploy reusó un
  manifest de rutas corrupto y una ruta nueva dio 404 en producción pese
  a compilar bien localmente.
- **`i18n/routing.ts` usa `localePrefix: 'as-needed'`** — el locale
  default (`es`) se sirve **sin prefijo** (`/carta`) vía un rewrite
  interno del middleware, mientras que rutas con prefijo explícito
  (`/en/carta`) hacen match directo. Esta asimetría causó dos incidentes
  de producción (solo reproducibles en Vercel, nunca en local) durante
  el work-item #118. **Regla:** cualquier página bajo el locale default
  sin prefijo que dependa de cookies, headers dinámicos o Draft Mode
  debe probarse explícitamente contra el dominio real de Vercel, no solo
  local.

## Seguridad — protección de red (Vercel)

- **Automático, ya activo, gratis (incluido Hobby):** mitigación DDoS
  L3/L4/L7, firewall de bloqueo de IPs/reglas básicas.
- **Manual, gratis, activar solo durante un ataque real:** Attack Mode
  (Dashboard → Firewall → Bot Management) — challenge a todo tráfico
  salvo bots conocidos y requests internos. No usar como default
  permanente (agrega fricción a usuarios reales). ⚠ Verificar que
  `/api/contact` siga funcionando si se activa.
- **No cubierto por Vercel, resuelto a nivel de aplicación:** rate
  limiting por IP (Upstash, work-item #237) y Turnstile en el form de
  contacto (work-item #238) — se eligió resolver en aplicación primero
  (gratis, más control) antes de pagar por el WAF de Vercel.
- **Conclusión:** el sitio ya está protegido contra DDoS de
  infraestructura sin hacer nada. La protección de abuso del formulario
  específicamente la agregan #237/#238.

## Cómo se organiza esto

- `.claude/rules/*.md` — convenciones por tema (branching, commits,
  tests, seguridad, TypeScript). Se cargan completas; mantenerlas cortas.
- `.claude/skills/*/SKILL.md` — flujos de trabajo invocables
  (`/plan-task`, `/apply`, `/self-review`, etc. — nombrados para no
  chocar con slash commands nativos, ver gotcha abajo). Ver **matriz de
  decisión** abajo antes de crear uno nuevo.
- `.claude/agents/*.md` — subagentes para trabajo grande o que necesita
  contexto propio (auditorías completas, investigación multi-paso).
- `.claude/settings.json` — hooks y permisos. Los guardrails ahí
  descritos son **enforced técnicamente**, no solo convención.

**Gotchas de instalación:**

- Si `.gitignore` tiene una línea genérica `.claude/`, descarta en
  silencio todo este árbol. Verificar con `git status`/`git add .claude/`
  que el contenido aparece como stageable — ignorar solo el estado de
  sesión (`settings.local.json`, `scheduled_tasks.lock`, `.cache/`,
  `worktrees/`), nunca `.claude/` a secas.
- `init`, `plan`, `review`, `debug` son nombres reservados — Claude Code
  ya tiene funcionalidad nativa bajo esos nombres exactos (`/init`
  genera un CLAUDE.md, `plan` es el plan mode, `review` es alias del
  bundled `/code-review`, `debug` es un bundled skill). Un skill custom
  con el mismo nombre lo sobreescribe **sin ningún aviso visible**. Por
  eso este repo usa `session-start`, `plan-task`, `self-review`,
  `investigate-bug`. Antes de nombrar un skill nuevo, correr `/help` en
  una sesión real para confirmar que el nombre no está tomado.

## Guardrails — qué es hook y qué es convención

**ENFORCED (bloqueado por hook, ver `.claude/settings.json`):**
- No se edita/escribe directo en `main`/`dev` sin una rama de feature
  activa (`.claude/scripts/block-protected-branch-writes.sh`).

**CONVENCIÓN (esperado, no bloqueado técnicamente — ver `.claude/rules/`):**
- Conventional commits, 1 issue = 1 rama = 1 PR (modelo documentado; ver
  gap conocido en `branching.md` sobre los skills que aún usan
  work-item+sub-issues).
- Nunca `git push --force` a rama compartida (`--force-with-lease` solo
  en la propia rama de feature tras un rebase).
- Nunca `--no-verify` en commit/push.
- Secrets nunca hardcodeados ni commiteados — ver `.claude/rules/security.md`.

## Skill vs. Subagent — matriz de decisión

| Necesitas... | Usa | Por qué |
|---|---|---|
| Un flujo repetible, corto, invocable a demanda | **Skill** (`.claude/skills/*/SKILL.md`) | Auto-discovery liviano |
| Investigación o auditoría grande, multi-paso, que no debe llenar el contexto principal | **Subagent** (`.claude/agents/*.md`) | Contexto aislado; devuelve solo la síntesis |
| Un skill que en la práctica creció y ya hace trabajo pesado | Migrar a **Subagent** | Evita que el skill se vuelva otro CLAUDE.md de 1000 líneas |

Regla dura: si un `SKILL.md` supera ~500 líneas o empieza a hacer
research extenso en vez de pasos mecánicos, es candidato a convertirse
en subagente. Así migraron `audit`, `pentest`, `secure`, `pr-review`
(antes `review`), `triage` y `cross` a `.claude/agents/`.

## Reglas para escribir este archivo

- Máximo ~150-200 líneas. Cada línea compite por espacio de contexto.
- No documentar lo que ya es obvio leyendo el código o `.claude/rules/`.
- No pegar aquí historial de bugs resueltos ni changelogs — eso vive en
  issues/commits.
- Actualizar este archivo al descubrir un gotcha nuevo que un agente
  futuro necesitaría saber (ver skill `capture-context`).
