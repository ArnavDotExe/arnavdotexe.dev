/**
 * next/image (with unoptimized: true, required for static export) and plain
 * <a href>/<img src> string literals do NOT automatically get `basePath`
 * prepended — only next/link's <Link> and the built-in image *optimizer*
 * handle that. On a custom domain (no NEXT_PUBLIC_BASE_PATH set) this is a
 * harmless no-op; on a GitHub Pages project-site subpath it's required, or
 * every asset 404s.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
