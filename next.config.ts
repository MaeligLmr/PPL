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
  // Pour GitHub Pages, le chemin de base doit être le nom du repo :
  basePath: "/PPL",
  assetPrefix: "/PPL/",
    trailingSlash: true,

};

export default nextConfig;
