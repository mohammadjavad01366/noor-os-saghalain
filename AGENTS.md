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

## Home hero: scroll-scrubbed video

- The hero media is `public/videos/hero-scrub.mp4`, driven by
  `src/hooks/useScrollScrubVideo.ts` + `src/components/home/Hero.tsx`. The video is never played
  (`play()`/autoplay/loop are absent): the user's scroll sets `video.currentTime`, so the clip must
  stay in sync with the scroll track (`320vh` section, `100svh` sticky viewport).
- **Do not replace that file with a normal export.** The supplied source (4s, 24fps) had a single
  keyframe for the whole clip, which cannot be scrubbed. The committed encode is H.264 all-intra
  (`-g 1`), no audio, `+faststart`, ~2.2MB. Re-encode any replacement the same way, e.g.:
  `ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -g 1 -sc_threshold 0 -movflags +faststart out.mp4`
- Scroll progress is published as the CSS variable `--hero-p` on the hero `<section>`; the headline
  fade/parallax is pure CSS against it, so scrolling causes no React re-render. Keep it that way.
- The hero photograph stays underneath the video as pre-roll/poster and as the failure fallback;
  `prefers-reduced-motion` skips the clip entirely and renders that photograph at `100svh`.
- The source clip is 496x864, so a wide desktop viewport upscales it when it covers the screen. Ask
  for a 1080x1920 (or similar) export before expecting crisp desktop detail.

## Design system (3D, RTL, mobile-first)

- Tokens (palette, fonts, `--ease-soft`) live in the `@theme` block of
  `src/styles/tailwind.css`. Persian type is Vazirmatn (UI) + Amiri (Qur'anic text), self-hosted in
  `public/fonts`; the document is `lang="fa" dir="rtl"` from `index.html`.
- Depth is CSS-only: `.stage` (perspective), `.depth-card` / `.depth-card-dark` (hover lift +
  layered shadows), `.depth-plate`, plus `<Parallax>` for scroll-linked layers. `.depth-card` carries
  no `border-radius` on purpose — give each card its own Tailwind rounding.
- **One scroll listener for the whole site**: `src/lib/scrollEngine.ts` exposes
  `subscribeScroll(fn)` and calls every subscriber once per `requestAnimationFrame`. Add new
  scroll-linked visuals through it (or `<Parallax>`), never with their own `scroll` listener, and
  never by putting scroll progress into React state.
- All motion is guarded by `prefers-reduced-motion` (CSS media query + `prefersReducedMotion()`),
  which the stylesheet already neutralises globally.

## Routes and navigation

- Site map lives in `src/content/nav.ts` (`label` for menus/footer, `short` for the desktop bar —
  nine destinations only fit beside the brand with the short labels). Add a page to `src/routes.tsx`
  and to that list together.
- Pages: `/` · `/about` · `/goals` (اهداف و رسالت) · `/quran` · `/education` · `/activities` (+
  `/:slug`) · `/news` (+ `/:slug`) · `/gallery` · `/contact`, plus `/admin`.

## Deployable exports (no Base44 runtime)

- `pnpm export:build` (`scripts/build-export.mjs`) produces `export/noor-al-thaqalain-static/` and
  `export/noor-al-thaqalain-theme/`; `bash scripts/export-zip.sh` zips them. The `.zip` files are the
  shipped artifacts and are committed; the unpacked folders are gitignored.
- Two builds run, and they differ on purpose: the static one uses `--base=/` with browser URLs plus
  an `.htaccess` SPA fallback; the theme one uses `--base=/wp-content/themes/noor-al-thaqalain/assets/`
  and `VITE_ROUTER_MODE=hash`, because WordPress owns server routing and cannot install rewrites.
- Vite only rewrites the URLs it emits. Public-dir references in the app (`/images`, `/videos`,
  `/fonts`) are rewritten to the theme base by the build script — if you add a new public asset
  folder, extend the regex there or it will 404 inside the theme.
- The theme's `functions.php` reads `assets/.vite/manifest.json` (so the build MUST keep
  `--manifest`) and prints the entry as `<script type="module">` in the footer. PHP files are linted
  with `php -l` in a `php:8.2-cli` container.

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
