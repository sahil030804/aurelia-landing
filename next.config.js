/** @type {import('next').NextConfig} */
// GitHub Pages serves static exports from a repository subpath (e.g., /repo-name).
// We determine basePath from process.env.NEXT_PUBLIC_BASE_PATH or process.env.GITHUB_REPOSITORY
// so that assets and routes resolve correctly regardless of the GitHub repository name.
// Dev server (next dev) runs without basePath unless explicitly defined.
const getBasePath = () => {
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  if (process.env.NODE_ENV === "production" && process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split("/")[1];
    if (repoName && !repoName.endsWith(".github.io")) {
      return `/${repoName}`;
    }
    return "";
  }
  return process.env.NODE_ENV === "production" ? "/aurelia-landing" : "";
};

const basePath = getBasePath();

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

module.exports = nextConfig;