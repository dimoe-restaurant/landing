# AGENTS.md

Este proyecto usa `CLAUDE.md` como fuente principal de instrucciones para
agentes — léelo primero.

Si tu herramienta agéntica no reconoce `CLAUDE.md` pero sí `AGENTS.md`
(convención más amplia adoptada por varias herramientas), este archivo
existe para que igual encuentres el contexto: todo lo relevante vive en
`CLAUDE.md` y en `.claude/rules/`. No dupliques contenido entre ambos —
si necesitas agregar algo, agrégalo en `CLAUDE.md` y deja este archivo
como puntero.

Nota: si el framework del proyecto autogenera un `AGENTS.md` propio (por
ejemplo, algunas versiones de Next.js regeneran un bloque marcado
`BEGIN/END:*-agent-rules` en cada `dev`/`build`), no pelees contra eso —
mantén ese bloque intacto y agrega el puntero a `CLAUDE.md` fuera de él.
