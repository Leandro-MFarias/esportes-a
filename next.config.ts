import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecqauvtyeljuqazesbix.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig