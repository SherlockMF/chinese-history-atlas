import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      ["WebGL.data.gz", "application/octet-stream"],
      ["WebGL.framework.js.gz", "application/javascript"],
      ["WebGL.wasm.gz", "application/wasm"],
    ].map(([file, contentType]) => ({
      source: `/history-field/li-jingxun/Build/${file}`,
      headers: [
        { key: "Content-Encoding", value: "gzip" },
        { key: "Content-Type", value: contentType },
        { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
      ],
    }));
  },
};

export default nextConfig;
