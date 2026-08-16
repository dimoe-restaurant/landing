---
name: security
description: Guardrails de seguridad aplicables a cualquier stack
---

# Security

Checklist agnóstico, complementario a la sección "Seguridad — protección
de red (Vercel)" de `CLAUDE.md` (esa es específica de la infraestructura
de este proyecto; esto es genérico de cualquier stack).

## Secrets

- Nunca hardcodear API keys, tokens, passwords, connection strings en
  código o en commits — viven en variables de entorno no versionadas.
- Nunca exponer una clave de servicio (service role / admin key) al
  cliente/frontend. Solo la clave pública/anónima llega al browser.
- Antes de un commit, revisar que no se esté agregando un `.env` real,
  una credencial pegada en un comentario, o un archivo de config con
  secrets — incluso si el nombre del archivo parece inocuo.

## Autenticación y autorización

- Toda ruta/acción que toque datos de un usuario/tenant revalida sesión y
  pertenencia explícitamente en el propio handler — nunca asumir que un
  middleware/proxy anterior ya filtró correctamente.
- Un recurso al que un usuario no tiene acceso responde con el mismo
  código que "no existe" (evitar que el código de error revele la
  existencia de recursos ajenos).
- Definir permisos explícitos por endpoint/acción — nunca depender de un
  default global permisivo.

## Dependencias e infraestructura

- Escaneo de dependencias además del audit nativo del gestor de paquetes.
- Si hay contenedores: usuario no-root, sin tags `:latest` en producción.
- Nunca deshabilitar verificación TLS/certificados "para probar" y
  olvidar revertirlo.

## Antes de cualquier deploy

- `pnpm audit`/equivalente sin vulnerabilidades críticas sin atender.
- Sin flags de debug ni credenciales default activas en producción.
- CI (si existe) corre tests antes de permitir el deploy.

Para el checklist operativo completo de este repo (env vars, gitignore,
Dockerfile, CI) ver el agente `secure` en `.claude/agents/secure.md`.
