import type { NextConfig } from "next";

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
  },
};

export default nextConfig;
