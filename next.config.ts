import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.join(__dirname, "./"),
  turbopack: {},
  webpack: (config) => {
    return config;
  },
  env: {
    CURRENT_SITE_DOMAIN: process.env.CURRENT_SITE_DOMAIN || "navylighthouse.com",
  },
};

export default nextConfig;
