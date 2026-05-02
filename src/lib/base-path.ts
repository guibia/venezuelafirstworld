/**
 * Prefix for root-relative static assets on hosts where the app is not at the domain root
 * (e.g. GitHub Pages project sites). Set at build time:
 * NEXT_PUBLIC_BASE_PATH=/venezuelafirstworld
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${base}${normalized}`
}
