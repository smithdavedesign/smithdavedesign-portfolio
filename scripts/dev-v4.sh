#!/usr/bin/env bash
# Run the portfolio locally with the v4 assistant on Dave's local AI stack (LiteLLM :4000 → Ollama),
# falling back to Claude when ANTHROPIC_API_KEY is set in the environment.
set -euo pipefail
cd "$(dirname "$0")/.."

LITELLM_ENV="${LITELLM_ENV:-$HOME/ai-stack/litellm/.env}"
if [ -f "$LITELLM_ENV" ]; then
  V4_LOCAL_LLM_KEY="$(grep '^LITELLM_MASTER_KEY=' "$LITELLM_ENV" | cut -d= -f2- | tr -d "\"'")"
  export V4_LOCAL_LLM_KEY
  # Paid fallback: reuse the stack's Anthropic key unless one is already set.
  if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
    ANTHROPIC_API_KEY="$(grep '^ANTHROPIC_API_KEY=' "$LITELLM_ENV" | cut -d= -f2- | tr -d "\"'")"
    [ -n "$ANTHROPIC_API_KEY" ] && export ANTHROPIC_API_KEY || unset ANTHROPIC_API_KEY
  fi
fi
export V4_LOCAL_LLM_URL="${V4_LOCAL_LLM_URL:-http://localhost:4000/v1}"
export V4_LOCAL_LLM_MODEL="${V4_LOCAL_LLM_MODEL:-local-coder}"
export PORT="${PORT:-5055}"

[ "${SKIP_BUILD:-}" = 1 ] || npm run build:v4
echo "v4 → http://localhost:$PORT/v4/  (local: $V4_LOCAL_LLM_MODEL @ $V4_LOCAL_LLM_URL, paid fallback: ${ANTHROPIC_API_KEY:+on})"
exec node server.js
