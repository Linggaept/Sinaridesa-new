import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: "localhost",
        port: '5001',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: "localhost",
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: "20.6.8.101",
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "api.sinaridesa.com",
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.sinaridesa.com',
      },
    ],
  },
};

export default nextConfig;
