import type { NextConfig } from "next";

// Static export served by the root Express app at /v4 (see ../server.js).
// Dynamic endpoints (/v4/api/chat, /v4/mcp) live in Express under ../JS/v4.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/v4",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
