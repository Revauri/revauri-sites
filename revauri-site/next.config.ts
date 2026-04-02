import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/book", destination: "/contact#book", permanent: true }];
  },
};

export default nextConfig;
