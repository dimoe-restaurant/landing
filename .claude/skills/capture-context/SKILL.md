---
type: skill
name: capture-context
description: Usar cuando aprendiste algo que vale la pena documentar — convención, decisión de arquitectura, gotcha, detalle de implementación no obvio. Clasifica el tipo de contexto y lo dirige al lugar correcto. NO usar para estado ephemeral de la sesión actual.
tags: [workflow, documentation]
---

# /capture-context

Helper para decidir rápido dónde va un aprendizaje y bajar la fricción de documentar. El objetivo es que cada pieza de contexto viva exactamente donde alguien la va a necesitar, ni más ni menos.

## Step 1 — Clasificar el tipo de contexto

Preguntar al dev:

```
¿Qué tipo de contexto querés capturar?

1) Convención de código — "siempre que X, hacer Y"
   Ej: "todo componente nuevo debe tener spec Playwright"

2) Decisión de arquitectura — "elegimos X en lugar de Y porque Z"
   Ej: "Vercel en lugar de Railway por integración con Next.js"

3) Gotcha persistente — "si te pasa X, es por Y"
   Ej: "next-intl rompe si falta el locale en el middleware"

4) Razón puntual de este cambio — no aplica a futuro, solo explica este PR
   Ej: "este workaround existe porque la API de Meta no soporta X"

5) Estado en curso (ephemeral) — progreso de la sesión actual

6) Detalle de implementación (WHY no obvio) — algo que un revisor
   podría preguntar al leer el código
```

## Step 2 — Dirigir al lugar correcto

| Respuesta | Acción |
|---|---|
| 1) Convención | Crear/editar rule en `.claude/rules/<nombre>.md`. Aclarar globs aplicables si es capa específica. |
| 2) Decisión arquitectural | Crear ADR en `docs/adr/NNNN-titulo.md` (ver Step 3 y 4). Crear `docs/adr/` si no existe. |
| 3) Gotcha | Agregar sección "## Gotchas" en `CLAUDE.md` del repo (o en un rule si aplica a una capa). |
| 4) Razón puntual | Va a PR description + commit body. **No crear archivo.** Decirle al dev: "esto va en el PR/commit, no en un archivo". |
| 5) Ephemeral | Va a comment del issue activo. **No crear archivo.** |
| 6) Detalle de implementación | Va a un inline comment en la línea o bloque al que aplica. **No crear archivo.** Decirle al dev: "esto va inline en el código". |

## Step 3 — Numeración de ADRs (solo si respuesta = 2)

1. Listar archivos en `docs/adr/` con prefijo numérico:
   ```bash
   ls docs/adr/ 2>/dev/null | grep -E '^[0-9]{4}-' | sort
   ```
2. Identificar el último número usado.
3. El ADR nuevo es `NNNN+1` con zero-padding a 4 dígitos.
4. Filename: `NNNN-titulo-corto-en-kebab-case.md`

Si `docs/adr/` no existe → crearlo:
```bash
mkdir -p docs/adr
```

## Step 4 — Template ADR

```markdown
# NNNN — Título corto de la decisión

**Estado:** Aceptado / Propuesto / Reemplazado por NNNN
**Fecha:** YYYY-MM-DD

## Contexto

¿Qué problema o situación llevó a esta decisión? Qué restricciones
había, qué opciones se consideraron.

## Decisión

¿Qué decidimos? En 2-3 oraciones, claro y específico.

## Consecuencias

✅ Positivas:
- ...

⚠ Negativas o trade-offs aceptados:
- ...

🔄 Señales de que hay que revisitar:
- ...

## Referencias

- Archivos relevantes
- ADRs relacionados
- Issues / PRs que materializan la decisión
```

## Step 5 — Confirmar y escribir

1. Mostrar al dev el path completo del archivo destino.
2. Si es archivo nuevo: crear con template (placeholders para que el dev complete el contenido específico).
3. Si es edición: señalar la sección exacta.
4. **No escribir el contenido específico del aprendizaje sin haber preguntado al dev** — el skill orienta, el dev escribe.

## Cuándo NO invocar

- El contexto ya está documentado en otro archivo (no duplicar).
- El usuario pide guardar algo que claramente es ephemeral de esta sesión.
- El contenido pertenece al PR/commit y no aplica a futuras sesiones.
