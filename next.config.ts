import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "watertools-qa.dupont.com",
      },
    ],
  },
};

export default nextConfig;
