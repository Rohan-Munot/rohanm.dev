import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "anyplaceholder.com",
      },
    ],
  },
};

export default nextConfig;
