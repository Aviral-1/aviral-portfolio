import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {}, // Silence Next.js 16 ambiguity errors when using webpack config

  // Enable smooth scrolling restoration between navigations
  experimental: {
    scrollRestoration: true,
  },

  images: {
    // Allow external image domains for LinkedIn CDN and avatar services
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "**.linkedin.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "skillicons.dev",
      },
    ],
  // Optimize image formats
    formats: ["image/avif", "image/webp"],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent hmr from watching the data directory
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          ...(Array.isArray(config.watchOptions?.ignored) ? config.watchOptions.ignored : []),
          path.join(process.cwd(), 'data'),
          '**/data/**',
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
