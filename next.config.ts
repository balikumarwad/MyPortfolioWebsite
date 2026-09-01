import type { NextConfig } from "next";

const nextConfig = {
  output: 'export', // <-- Add this line
  images: {
    unoptimized: true, // <-- Highly recommended for GitHub Pages
  },
};

module.exports = nextConfig;