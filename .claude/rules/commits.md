---
name: commits
description: Convención de mensajes de commit
---

# Commits

Conventional Commits, forma simple (sin sufijos de work-item padre):

```
tipo(scope): descripción corta en imperativo

Cuerpo opcional: el POR QUÉ, no el qué (el diff ya muestra el qué).

Closes #123
```

Tipos: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`,
`ci`. El `scope` es el módulo o área tocada (ej. `auth`, `checkout`, `api`).

## Reglas duras

- Nunca `git commit --no-verify` ni `git push --no-verify` — si un hook
  falla, se investiga y corrige la causa, no se saltea.
- Nunca `-c commit.gpgsign=false` si el repo firma commits.
- Commits atómicos: un commit debe poder revertirse solo sin romper otra
  cosa no relacionada.
- No commitear archivos generados/build output/`.env*` con secrets reales.

## Qué NO hacer

- No commitear "WIP" o "fix" sin contexto — el mensaje debe tener sentido
  leído en `git log` sin memoria de la conversación que lo generó.
- No usar `git add -A`/`git add .` a ciegas — revisar `git status` antes
  de stagear, para no arrastrar archivos sensibles o no relacionados.

## Push

Cuándo pushear (`per-task` / `on-pr` consolidado / `manual`) sigue siendo
configurable por work-item — ver `.claude/skills/build/SKILL.md`, paso 3.
Esa política no cambió con esta migración.
