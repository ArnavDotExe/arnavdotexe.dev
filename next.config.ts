import type { NextConfig } from "next";

// GitHub Pages serves static files only — no server, so no Next.js Image
// Optimization API and no dynamic (edge/node) route handlers. Setting
// STATIC_EXPORT=true switches to `output: "export"` for that target while
// leaving the default `npm run build` (Vercel, or any Node host) untouched.
const isStaticExport = process.env.STATIC_EXPORT === "true";

// GitHub Pages *project* sites (repo name != <user>.github.io) are served at
// https://<user>.github.io/<repo>/ and need that prefix baked into every
// internal link/asset via NEXT_PUBLIC_BASE_PATH. This repo is the special
// <user>.github.io "user site" name instead, served at the account root, so
// NEXT_PUBLIC_BASE_PATH is intentionally left unset — same as it would be
// for a custom domain or any non-Pages host.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,

  experimental: {
    // Only the icons actually imported get bundled, instead of Next having
    // to trace through the whole lucide-react barrel file.
    optimizePackageImports: ["lucide-react"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year — photos don't change once deployed
    // Static export has no server to run the optimizer on, so images ship
    // as-is (still fine — they're already reasonably sized JPEGs).
    unoptimized: isStaticExport,
  },

  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
  }),

  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
