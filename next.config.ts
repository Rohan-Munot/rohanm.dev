import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rohanm.dev" }],
        destination: "https://rohanm.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
