---
type: skill
name: close
description: Cierra la sesión de trabajo. Escribe un resumen comprimido en memoria, registra decisiones y contexto para la próxima sesión. Invocar siempre antes de cerrar Claude.
tags: [workflow, memory]
---

# /close

Guarda el contexto de la sesión actual en memoria persistente para que la próxima sesión arranque sin perder nada. **Es el inverso de `/session-start`**: donde `/session-start` carga, `/close` escribe.

## Cuándo invocar

Al terminar la sesión de trabajo, antes de cerrar Claude. También útil en pausa larga (>4h).

## Pasos

### 1. Recolectar estado de la sesión

Sin hacer queries a GitHub — trabajar con lo que ya está en el contexto de la sesión:

```
¿Qué tarea(s) se trabajaron hoy?
¿Qué se completó? ¿Qué quedó pendiente?
¿Qué decisiones se tomaron? (arquitectura, copy, prioridades, etc.)
¿Qué branches están activas?
¿Hay contexto externo (Notion, documentos) que se usó y debería estar disponible después?
¿Hay algo que NO funcionó y no debería repetirse?
```

### 2. Preguntar al dev antes de escribir

Mostrar un resumen de lo que se va a guardar y pedir confirmación/adiciones:

```
=== Resumen de sesión — [fecha] ===

Completado:
  • [lista de cosas terminadas]

Pendiente:
  • [lista de cosas sin terminar]

Decisiones tomadas:
  • [lista de decisiones con su "por qué" si está claro]

¿Algo más que quieras que recuerde para la próxima sesión?
[S para guardar / agrega lo que falta]
```

### 3. Escribir o actualizar archivos de memoria

**Regla:** no crear un archivo de sesión nuevo por cada sesión — eso contamina la memoria con historia. En cambio, **actualizar los archivos existentes** que correspondan al tipo de contexto:

- Trabajo de product/landing → actualizar `project_dimoe_landing.md` (o el proyecto relevante)
- Decisión de arquitectura → crear o actualizar un `feedback_*.md`
- Nuevo recurso externo descubierto → crear o actualizar un `reference_*.md`
- Información del usuario → actualizar `user_*.md`

Para los pendientes que no encajan en ningún archivo existente, crear uno nuevo con prefijo `project_`:

```markdown
---
name: project-[nombre]
description: [una línea — qué es y cuándo es relevante]
metadata:
  type: project
---

## Estado ([fecha])

[Hecho] ...
[Pendiente] ...
[Decisiones] ...

**Why:** [por qué importa esto]
**How to apply:** [cómo usarlo en la próxima sesión]
```

### 4. Actualizar MEMORY.md si se agregó un archivo nuevo

Si se creó un archivo de memoria nuevo en el paso 3, agregar su entrada al índice:

```markdown
- [Título descriptivo](archivo.md) — una línea de para qué sirve
```

**Regla:** MEMORY.md nunca supera 30 entradas. Si ya hay 30, reemplazar la entrada menos relevante o combinar dos entradas relacionadas.

### 5. Guardar contexto de Notion usado en la sesión

Si durante la sesión se fetcheó una página de Notion que NO estaba en memoria, registrarla:

```markdown
# En reference_notion_pages.md (crear si no existe)
- **[Nombre]:** [URL] — [para qué sirve, cuándo fetchear]
```

Esto evita tener que buscar la URL la próxima vez.

### 6. Confirmar cierre

```
=== Sesión guardada ===
Archivos actualizados: [lista]

Para retomar: /session-start → leerá este contexto automáticamente.
```

## Lo que NO guardar

- Código — está en Git
- Historial de cambios — está en `git log`
- Errores ya resueltos — el fix está en el commit
- Contexto que ya está en CLAUDE.md o en `.claude/rules/`
- Listas largas de actividad (>10 items) — comprimir a lo esencial

## Formato de fecha

Siempre usar fecha absoluta (ISO 8601): `2026-05-23`. Nunca "ayer", "esta semana".
