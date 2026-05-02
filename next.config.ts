import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.must.edu.pk",
        port: "8082",
        pathname: "/Chartlet/**",
      },
    ],
  },
};

export default nextConfig;
