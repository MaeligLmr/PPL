const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  distDir: "docs",
  basePath: isProd ? "/PPL" : "",
  assetPrefix: isProd ? "/PPL/" : "",
};

export default nextConfig;
