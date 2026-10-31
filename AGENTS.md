# Project notes

Persian (RTL) single-page site for مجموعه قرآنی و تربیتی امیرالمؤمنین نورالثقلین, built with
React 19 + Vite 8 + Tailwind CSS v4 + React Router 7. No backend: content lives in
`src/content/defaults.ts`, is editable at `/admin`, and persists in `localStorage`.

## Running in the Base44 sandbox

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- One service, `web`, serves Vite's dev server on container port 5173, published on host **3000**.
- `docker-compose.base44.yml` bind-mounts the repo, so edits hot-reload; `node_modules` lives in the
  `noor_node_modules` volume and is installed at container start from `pnpm-lock.yaml`.
- The image (`Dockerfile.base44`) only installs pnpm on `node:24-slim` — it deliberately does not
  copy application source, so the running app is always the mounted working tree.

## Non-obvious setup facts

- **Install needs two non-default flags.** pnpm 12 fails the install when dependency build scripts
  are skipped (`ERR_PNPM_IGNORED_BUILDS`), and the repo's `prepare` script runs `lefthook`, which
  needs `git` — not present in the slim image. Hence:
  `CI=true pnpm install --frozen-lockfile --config.strictDepBuilds=false`. Keep this in the compose
  command if the image changes.
- **Lockfile was regenerated once.** The committed `pnpm-lock.yaml` was out of sync with
  `package.json` (`@types/node` 24 vs 26) and blocked `--frozen-lockfile`. Re-run
  `pnpm install --lockfile-only` if dependency specifiers drift again.
- **`vite.config.ts` gates the HTTPS certificate plugin** on `BASE44_PREVIEW_MODE === "1"`. The
  sandbox preview is plain HTTP behind the platform proxy, and `vite-plugin-mkcert` would otherwise
  try to install a local CA. With the flag unset, the original mkcert/dev behaviour is preserved.
- **`tsconfig.json`**: `esModuleInterop: false` was removed — TypeScript 7 rejects that option, which
  made `pnpm check-types` fail before any source was compiled.

## Checks

Run inside the container (the host has no Node toolchain):

```bash
docker compose -f docker-compose.base44.yml exec -T web pnpm check-types
docker compose -f docker-compose.base44.yml exec -T web pnpm lint
```

## Content and admin

- `/admin` — passphrase gate. Default development passphrase `noor1405`; set `VITE_ADMIN_PASSWORD`
  (a build-time Vite variable) to change it. This is a client-side gate for the static preview, not
  real authentication: anyone with the bundle can read the content and the check. A production CMS
  needs a server, real sessions, and role checks.
- Edits and form submissions (contact messages, activity registrations) are stored in the visitor's
  `localStorage` under `noor:content:v1` / `noor:submissions:v1`; they are per-browser, not shared.
- Contact details, social links and map are intentionally empty until an administrator fills them in —
  do not seed invented addresses, phone numbers or accounts.

## Imagery

`public/images/hero-architecture.jpg` is the institution's own uploaded reference photograph and is
used for the hero, page headers, CTA band and gallery. Every other visual is generated from
`src/components/ui/ArtPlate.tsx` (SVG geometry) so no stock photography or fabricated institutional
photos are shown. Real event photos should replace those plates through the gallery editor.
