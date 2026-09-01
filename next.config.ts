import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure basePath is completely left out or empty if using a root domain
};

export default nextConfig;