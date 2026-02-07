import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  basePath: isProd ? "/PPL" : "",
  assetPrefix: isProd ? "/PPL/" : "",

  distDir: "docs",

  images: {
    unoptimized: true, // obligatoire pour export statique
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
