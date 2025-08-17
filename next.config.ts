import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "pjndwfbgqajnhqcdgzlq.supabase.co" },
    ],
  },
};

export default nextConfig;
