import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // 프로젝트 루트를 명시 (상위 폴더의 lockfile로 인한 잘못된 루트 감지 방지)
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
