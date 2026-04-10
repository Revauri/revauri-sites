import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/preview/:id",
        destination: "https://rv-:id.vercel.app",
      },
    ];
  },
};

export default nextConfig;
