import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://13.209.69.235:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
