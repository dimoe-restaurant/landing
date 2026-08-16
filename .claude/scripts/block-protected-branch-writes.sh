#!/usr/bin/env bash
# PreToolUse hook: bloquea escritura de código (Edit/Write/MultiEdit) dentro
# de ESTE repo mientras la rama activa es una rama protegida (main/master/dev
# por defecto — ajusta PROTECTED_BRANCHES abajo). No bloquea escrituras fuera
# del working tree del repo (ej. memoria global de Claude en ~/.claude/, o
# archivos de otro proyecto) — la rama de este repo es irrelevante para esos
# paths.
#
# Bypass explícito y auditable: CLAUDE_ALLOW_DIRECT_EDIT=1 (queda en el
# log de la sesión). Úsalo solo para casos legítimos puntuales, no como
# hábito.
#
# Exit 0 = permitir. Exit 2 = bloquear (Claude Code interpreta 2 como
# "deny" en un hook PreToolUse).

set -euo pipefail

PROTECTED_BRANCHES="${PROTECTED_BRANCHES:-main master dev}"

if [ "${CLAUDE_ALLOW_DIRECT_EDIT:-0}" = "1" ]; then
  exit 0
fi

# El hook recibe un JSON por stdin con, entre otros campos,
# tool_input.file_path — el archivo que Edit/Write/MultiEdit va a tocar.
hook_input="$(cat)"
repo_root="$(git rev-parse --show-toplevel 2>/dev/null || echo "")"

# Sin repo git: no bloquear (no hay rama protegida de la que hablar).
if [ -z "$repo_root" ]; then
  exit 0
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
is_inside_repo="$(printf '%s' "$hook_input" | node "$script_dir/is-path-inside-repo.mjs" "$repo_root" 2>/dev/null || echo "unknown")"

# Solo se permite sin chequeo de rama si se confirmó que el archivo está
# FUERA del repo. Si no se pudo determinar (formato inesperado, node
# falló), seguir al chequeo de rama como antes de este fix — no arriesgar
# un falso permiso silencioso sobre un archivo que podría estar adentro.
if [ "$is_inside_repo" = "no" ]; then
  exit 0
fi

current_branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"

if [ -z "$current_branch" ]; then
  exit 0
fi

for protected in $PROTECTED_BRANCHES; do
  if [ "$current_branch" = "$protected" ]; then
    echo "Bloqueado: intento de escritura directa en rama protegida '$current_branch'." >&2
    echo "Crea una rama de trabajo primero (ver .claude/rules/branching.md)." >&2
    echo "Bypass puntual: CLAUDE_ALLOW_DIRECT_EDIT=1 (queda registrado)." >&2
    exit 2
  fi
done

exit 0
