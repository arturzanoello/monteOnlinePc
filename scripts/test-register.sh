#!/usr/bin/env bash
# Test script to insert a user into the `usuario` table via Supabase REST API.
# Usage:
#   EXPO_PUBLIC_SUPABASE_URL="https://xyz.supabase.co" \
#   EXPO_PUBLIC_SUPABASE_KEY="your-anon-or-service-key" \
#   ./scripts/test-register.sh user@example.com mypassword
# This will attempt to insert { login: user@example.com, senha: mypassword } and print the response.

set -euo pipefail

SUPABASE_URL=${EXPO_PUBLIC_SUPABASE_URL:-}
SUPABASE_KEY=${EXPO_PUBLIC_SUPABASE_KEY:-}
LOGIN=${1:-test-$(date +%s)@example.com}
SENHA=${2:-password123}

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ]; then
  echo "ERROR: Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY environment variables." >&2
  exit 1
fi

URL="$SUPABASE_URL/rest/v1/usuario"

curl -sS -X POST "$URL" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d "[{ \"login\": \"$LOGIN\", \"senha\": \"$SENHA\" }]" \
  | jq . || true

# Note: jq is optional but makes JSON pretty; if you don't have jq installed the raw JSON will print.
