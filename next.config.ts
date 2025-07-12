import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api-back/:path*",
        destination: "http://13.209.69.235:8080/api-back/:path*",
      },
    ];
  },
};

export default nextConfig;
