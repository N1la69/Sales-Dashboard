import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //allow all image sources
  images: {
    remotePatterns: [
      {
        hostname: "**",
        port: "",
        pathname: "**"
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
