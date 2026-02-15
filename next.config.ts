import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "watertools-qa.dupont.com",
      },
      {
        protocol: "https",
        hostname: "substack.com",
      },
      {
        protocol: "https",
        hostname: "medium.com",
      },
      {
        protocol: "https",
        hostname: "www.medium.com",
      },
      {
        protocol: "https",
        hostname: "cdn-static-1.medium.com",
      },
    ],
  },
};

export default nextConfig;
