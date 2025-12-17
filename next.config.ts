import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1338",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1338",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "mui.edu.pk",
      },
    ],
  },
};

export default nextConfig;
