---
type: skill
name: self-review
description: Revisar el diff actual con perspectiva fresca antes de abrir PR — bugs, simplificación, reuso. Úsalo tras terminar una implementación y antes de pre-merge-check.
tags: [workflow, quality-gate]
---

# /self-review

> Nombrado así (no `/review`) porque `review` choca con el alias del
> bundled skill `/code-review` de Claude Code — un skill custom con ese
> nombre lo sobreescribe en silencio, sin aviso ni indicio en `/help`.
> Además, el nombre aclara que es autorevisión rápida antes de abrir PR,
> distinta del agente `pr-review` (revisión completa, idealmente en
> sesión fresca, sin haber visto la implementación).

## Cuándo invocar

Después de implementar (`apply`), antes de `pre-merge-check`/`build`. O
cuando el dev pide una revisión rápida del diff actual.

## Pasos

1. Mirar el diff completo (`git diff dev...HEAD`) como si no se hubiera
   escrito el código — perspectiva de revisor externo.
2. Buscar, en este orden de prioridad:
   - Bugs de correctitud (casos borde no manejados, lógica invertida).
   - Riesgos de seguridad (ver [security.md](../../rules/security.md) — inyección, auth faltante,
     secrets expuestos).
   - Simplificación posible (código más complejo de lo necesario para lo
     que hace).
   - Reuso perdido (lógica duplicada que ya existe en otro lado del repo).
3. Para una revisión exhaustiva multi-dimensión, con verificación
   adversarial de cada hallazgo y perspectiva de sesión fresca (sin el
   contexto de haber escrito el código) — no lo hagas inline: delega al
   agente `pr-review` para no llenar el contexto principal con
   exploración, o si el cambio toca autenticación/pagos/datos sensibles,
   al agente `audit`.
4. Reportar hallazgos priorizados por severidad, con archivo y línea.

## Output esperado

Lista de hallazgos (o "sin hallazgos") con ubicación exacta y severidad,
no una reescritura del código salvo que se pida aplicar los fixes.

## Siguiente skill

`pre-merge-check` antes de abrir PR.
