import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGIN
    ? process.env.ALLOWED_DEV_ORIGIN.replace(/[\[\]]/g, "").split(",").map((s) => s.trim()).filter(Boolean)
    : [],
};

export default nextConfig;
