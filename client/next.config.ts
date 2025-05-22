import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["unavatar.io", "ik.imagekit.io"],
  },
  typescript: {
    ignoreBuildErrors: true, // 👈 this disables type errors on Vercel build
  },
};

export default nextConfig;
