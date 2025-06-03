import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5gb",
    },
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
};

export default nextConfig;