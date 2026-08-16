---
name: branching
description: Modelo de ramas y flujo de trabajo por issue
---

# Branching

Modelo simple: **1 issue = 1 rama = 1 PR**. Este es el modelo *documentado*
por defecto de este repo desde la migración al template agnóstico.

> ⚠️ **Gap conocido, pendiente de resolver aparte:** los skills
> `/session-start`, `/plan-task`, `/apply`, `/build`, `/deploy` y los
> agentes `audit`, `pentest`, `secure` todavía implementan internamente
> el modelo previo (work-item padre + sub-issues nativos, ownership-lock
> por work-item, push-mode configurable). Esa mecánica sigue en
> producción y funcionando — no se tocó como parte de esta migración a
> propósito, para no arriesgar romper el flujo real. Migrar esos skills
> al modelo simple descrito acá es un work-item `chore` separado,
> todavía sin planificar.

## Ramas

- `main` — protegida, siempre desplegable. Nunca se edita directo (ver
  hook en `.claude/settings.json`).
- `dev` — integración, obligatoria en este repo. Todas las ramas de
  trabajo salen de acá.
- Ramas de trabajo: `feature/<slug>`, `fix/<slug>`, `chore/<slug>`,
  `refactor/<slug>` — nombradas a partir del issue que resuelven, ej.
  `fix/123-null-pointer-checkout`.

## Flujo

1. Antes de escribir código: crear o identificar el issue.
2. Crear la rama desde `dev`.
3. Commits pequeños y descriptivos (ver `commits.md`).
4. Al terminar: PR contra `dev`, referenciando el issue (`Closes #123`).
5. Rebase con `--force-with-lease` (nunca `--force` puro) si hace falta
   sincronizar con la base tras un rebase — y solo en tu propia rama.
6. Merge y borrar la rama.

## Qué evitar

- Commitear directo en `main`/`dev`, incluso "solo para docs".
- Ramas de larga vida que acumulan múltiples features no relacionadas.
- `git push --force` a una rama compartida por más de una persona/agente.
