import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static export — host the /out folder on GitHub Pages, Netlify, Vercel, etc.
  output: "export",
  images: { unoptimized: true },
  // Pin the workspace root (a stray lockfile in the home dir confuses auto-detection).
  turbopack: { root: __dirname },
};

export default nextConfig;
