declare global {
  interface Window {
    /** Set by the WordPress theme shell: absolute URI of the theme's assets. */
    __NOOR_ASSET_BASE__?: string;
  }
}

/**
 * Resolves a file that lives in the app's `public/` directory (the hero clip,
 * the reference photograph, the fonts).
 *
 * Vite's `BASE_URL` covers the normal cases: `/` for the static export, or
 * whatever `--base` the build used. The WordPress theme build runs with a
 * relative base, so its PHP shell prints `window.__NOOR_ASSET_BASE__` with the
 * real theme URI — that keeps images and video working whether WordPress is
 * installed at the domain root or in a subdirectory.
 *
 * @param path Public path, with or without a leading slash.
 */
export function asset(path: string): string {
  const override = typeof window === "undefined" ? undefined : window.__NOOR_ASSET_BASE__;
  const base = override || import.meta.env.BASE_URL;

  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
