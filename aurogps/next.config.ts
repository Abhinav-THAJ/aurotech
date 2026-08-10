import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dodgerblue-manatee-326041.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;
