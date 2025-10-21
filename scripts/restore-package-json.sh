#!/usr/bin/env bash
set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "git is required to locate the repository root."
  exit 1
fi

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
FRONTEND_DIR="$REPO_ROOT/frontend"
SCRIPT_PATH="$FRONTEND_DIR/scripts/check-package-json.cjs"

if [ ! -f "$SCRIPT_PATH" ]; then
  echo "Unable to find $SCRIPT_PATH. Make sure you are inside the V-Team-Budget-Easy repository."
  exit 1
fi

cd "$FRONTEND_DIR"

echo "Restoring frontend/package.json from the committed template..."
node "$SCRIPT_PATH" --restore

echo
cat <<'MSG'
Next steps:
  1. npm install
  2. npm run dev

Run both commands inside the frontend/ folder (the script already places you there).
MSG
