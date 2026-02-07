import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
    ],
  },
  output: "export",
  basePath: "/PPL",
  distDir: "docs",
  trailingSlash: true,
};

export default nextConfig;
