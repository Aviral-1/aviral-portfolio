import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

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
};

export default nextConfig;
