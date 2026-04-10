import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/VenezuelaFirstWorld",
  assetPrefix: "/VenezuelaFirstWorld/",
};

export default nextConfig;
