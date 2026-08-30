import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only. No server runtime anywhere.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
