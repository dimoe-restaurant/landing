---
name: pre-merge-check
description: Self-gate antes de abrir un PR. Corre verificaciones técnicas (build, lint, types), escanea el diff por problemas de seguridad, verifica contratos cross-repo si aplica, y chequea si hay contexto que documentar. Invocar al terminar trabajo en una rama, antes de gh pr create.
---

# /pre-merge-check

Gate que vos corrés sobre tu propio trabajo antes de pedir review. **No reemplaza al agente `pr-review`** (que lo hace otra persona o sesión fresca). Es lo que asegura que el PR que vas a abrir no tiene problemas obvios ni deuda de documentación.

Distinto del agente `secure` (que es pre-deploy, chequea env vars, CVEs, Dockerfile) — este es pre-PR, chequea que el código en sí está listo para ser revisado.

## Cuándo invocar

Al terminar de implementar todas las tasks de un work-item, antes de `gh pr create`.

## Step 1 — Verificación técnica

```bash
# Build — detecta errores TypeScript y de configuración
pnpm build 2>&1 | tail -20

# Lint
pnpm lint 2>&1 | tail -20
```

**Si falla cualquier cosa:** parar acá. Reportar al dev. No avanzar a Step 2.

No correr Playwright aquí (corre en CI). Lo que importa es que el build y el lint estén verdes antes de subir el PR.

## Step 2 — Escaneo de seguridad del diff

Obtener el diff:
```bash
git diff dev...HEAD
```

Revisar contra esta lista. Para cada ítem: ✅ cumplido, ❌ violado, n/a.

**Secrets:**
- [ ] Sin API keys, tokens, passwords hardcodeados en el diff
- [ ] Sin URLs con credenciales embebidas (`://user:pass@...`)
- [ ] Sin claves privadas (`BEGIN PRIVATE KEY`)

**Código:**
- [ ] Sin `console.log` / `console.error` sin propósito (debug olvidado)
- [ ] Sin `TODO` sin issue asociado
- [ ] Sin código comentado que debería eliminarse
- [ ] Sin `as any` para silenciar errores TypeScript

**Frontend:**
- [ ] Variables de entorno nuevas agregadas a `.env.example`
- [ ] Headers de seguridad no degradados (si se tocó `next.config.ts`)

**Si hay ❌:** reportar y parar. El dev arregla y re-corre `/pre-merge-check`.

## Step 3 — Contratos cross-repo (si aplica)

Si el diff toca endpoints o tipos que consumen servicios externos:
- Verificar que el shape del request/response coincide con lo que el consumidor espera.
- Si hay desync: reportar al dev y no avanzar.

Si no hay dependencias cross-repo → saltar.

## Step 4 — Context policy (soft check, no bloquea)

Recorrer este checklist. Es un aviso, no un bloqueante — el dev decide. Pero queda visible para el reviewer.

- [ ] ¿El PR introduce una convención de código nueva? Si sí: ¿hay rule en `.claude/rules/`?
- [ ] ¿El PR toma una decisión arquitectural mayor? Si sí: ¿hay ADR en `docs/adr/`?
- [ ] ¿El PR descubre un gotcha persistente? Si sí: ¿`CLAUDE.md` actualizado?
- [ ] ¿`CLAUDE.md` del repo refleja cambios de stack, herramientas o configuración?

Si algún check es "sí sin documentación" → sugerir invocar `/capture-context` antes de abrir el PR.

## Step 5 — Reporte y siguiente paso

```
=== /pre-merge-check ===
Rama: feature/12-sistema-pagos

Build:          ✓
Lint:           ✓
Secrets:        ✓
Console.logs:   ✓
TODOs:          ⚠ 1 TODO sin issue en src/components/PaymentForm.tsx:42
Env example:    ✓
Cross-repo:     n/a

Context policy:
  ✓ Sin convenciones nuevas sin documentar
  ⚠ Decisión arquitectural detectada (elegiste Stripe sobre MercadoPago) — sin ADR todavía

Resultado: listo para PR con 2 advertencias menores.
```

**Si todo verde (o solo warnings de context policy):**
```bash
gh pr create --base dev --title "..." --body "..."
```
Luego invocar el agente `pr-review` en sesión fresca.

**Si hay bloqueantes técnicos o de seguridad:** corregir → re-correr `/pre-merge-check`.

## Cuándo NO invocar

- Hotfix de 1 línea con cambio trivial y test claro.
- Revert de un commit.
- Cambio de copy / texto / config sin lógica nueva.
