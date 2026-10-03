/** @type {import('next').NextConfig} */
// GitHub Pages serves the static export from /aurelia-landing (project page),
// so every route/asset must be prefixed. basePath is skipped during `next dev`
// (dev server keeps running at http://localhost:3000).
const basePath =
  process.env.NODE_ENV === "production" ? "/aurelia-landing" : "";

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