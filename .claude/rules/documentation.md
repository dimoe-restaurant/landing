---
type: rule
name: documentation
description: Convención para crear archivos .md nuevos (ADRs, runbooks, docs de arquitectura) de forma indexable y buscable
tags: [documentation, okf]
---

# Documentación

Convención basada en el [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)
(OKF): la forma más simple de que un `.md` nuevo sea indexable/buscable
por un agente o una herramienta de búsqueda, sin necesitar SDK ni
plataforma propietaria. Aplica a docs de proyecto fuera de
`.claude/rules/` y `.claude/skills/` (esas ya tienen su propia
convención — ver más abajo).

## Cuándo crear un `.md` nuevo

Ante una decisión de arquitectura con alternativas descartadas, un
runbook operativo, o documentación de un concepto que un agente futuro
va a necesitar encontrar (no solo leer si ya lo tiene en contexto).

## Estructura

- **La carpeta/ruta es la identidad del concepto.** `docs/adr/0007-auth-provider.md`
  se referencia siempre por esa ruta, no por un ID separado.
- **Un `index.md` por directorio** que no sea trivial — permite a un
  agente navegar el árbol antes de leer cada archivo entero.
- **Frontmatter mínimo, un solo campo obligatorio**: `type` (ej. `ADR`,
  `runbook`, `architecture-note`). El resto es opcional y se agrega si
  aporta:

```yaml
---
type: ADR
title: Título corto y específico
description: Una frase — qué decisión, no el detalle
tags: [auth, backend]
timestamp: 2026-08-16
---
```

- **Enlazar entre documentos con markdown normal** (`[texto](/ruta.md)`),
  no con IDs opacos — los links forman un grafo navegable sin
  herramienta adicional.

## Qué NO hacer

- No crear un `.md` de documentación para algo que ya vive en el código
  o en `.claude/rules/` — evitar la duplicación de fuente de verdad.
- No omitir `type` — es el único campo que hace la diferencia entre un
  archivo indexable y un texto suelto.
- No versionar automáticamente cada cambio menor en `timestamp` — solo
  actualizarlo cuando el contenido cambia de verdad.

## Relación con `.claude/rules/` y `.claude/skills/`

Esos dos ya adoptan el mismo criterio: cada `.md` tiene `type: rule` o
`type: skill` en su frontmatter, además de `name`/`description` (que
siguen siendo obligatorios ahí por la spec de Agent Skills — no los
reemplaza `type`, lo complementa).
