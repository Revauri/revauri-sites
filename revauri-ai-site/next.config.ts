import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/portfolio", destination: "/capabilities", permanent: false },
      {
        source: "/portfolio/:slug",
        destination: "/capabilities",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
