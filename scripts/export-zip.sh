#!/usr/bin/env bash
# Zips the two deployable exports produced by `pnpm export:build`.
# Runs on the sandbox host (no zip binary there, so a python container does it),
# or anywhere `zip` is installed.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d export/noor-al-thaqalain-static ] || [ ! -d export/noor-al-thaqalain-theme ]; then
  echo "export/ is empty — run: docker compose -f docker-compose.base44.yml exec -T web pnpm export:build" >&2
  exit 1
fi

if command -v zip >/dev/null 2>&1; then
  rm -f export/noor-al-thaqalain-static.zip export/noor-al-thaqalain-theme.zip
  (cd export && zip -qr noor-al-thaqalain-static.zip noor-al-thaqalain-static)
  (cd export && zip -qr noor-al-thaqalain-theme.zip noor-al-thaqalain-theme)
else
  docker run --rm -v "$PWD/export:/e" python:3.12-slim python -c "
import os, shutil
for name in ('noor-al-thaqalain-static', 'noor-al-thaqalain-theme'):
    out = '/e/' + name + '.zip'
    if os.path.exists(out):
        os.remove(out)
    shutil.make_archive(out[:-4], 'zip', '/e', name)
    print(name + '.zip', round(os.path.getsize(out) / 1048576, 2), 'MB')
"
fi

ls -lh export/*.zip
