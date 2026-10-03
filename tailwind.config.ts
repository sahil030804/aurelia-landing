import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#08080A",
        charcoal: "#101013",
        graphite: "#17171B",
        slate: "#232329",
        ivory: "#F4EFE7",
        cream: "#E8E0D2",
        sand: "#8E8878",
        champagne: "#C9A96A",
        "champagne-light": "#E6D2A4",
        "champagne-dark": "#9C7F45",
        terracotta: "#B4623F",
        wine: "#5B2333",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        mega: "0.35em",
        ultra: "0.55em",
      },
      fontSize: {
        "10xl": ["9rem", { lineHeight: "0.9" }],
        "12xl": ["13rem", { lineHeight: "0.85" }],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        "marquee-reverse": "marquee-reverse 36s linear infinite",
        "spin-slow": "spin 26s linear infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;