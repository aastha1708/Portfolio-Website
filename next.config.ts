import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Overridable so sandboxed/CI runs don't fight the local .next cache. */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
