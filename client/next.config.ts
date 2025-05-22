import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["unavatar.io", "ik.imagekit.io"],
  },
};

export default nextConfig;
