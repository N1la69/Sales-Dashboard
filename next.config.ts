import type { NextConfig } from "next";
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

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
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(new PrismaPlugin())
    }
    return config
  },
};

export default nextConfig;
