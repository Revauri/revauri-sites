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
      { source: "/inbox", destination: "https://www.revauri.com/inbox", permanent: false },
      {
        source: "/inbox/:path*",
        destination: "https://www.revauri.com/inbox/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
