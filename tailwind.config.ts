import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0A0F1C",
          secondary: "#111827",
          accent: "#00E5FF",
          highlight: "#3B82F6",
          text: "#E5E7EB",
        },
        light: {
          bg: "#F8FAFC",
          secondary: "#FFFFFF",
          accent: "#0077FF",
          highlight: "#00AEEF",
          text: "#0F172A",
        },
      },
      fontFamily: {
        display: ["'Orbitron'", "sans-serif"],
        body: ["'Rajdhani'", "sans-serif"],
        mono: ["'Share Tech Mono'", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee2": "marquee2 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "scan": "scan 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px #00E5FF44" },
          "50%": { boxShadow: "0 0 60px #00E5FFaa, 0 0 100px #00E5FF44" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        scan: {
          "0%": { top: "0%" },
          "50%": { top: "100%" },
          "100%": { top: "0%" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)",
        "hero-gradient": "radial-gradient(ellipse at center, rgba(0, 229, 255, 0.15) 0%, rgba(10, 15, 28, 0) 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
      },
      backgroundSize: {
        "grid": "50px 50px",
      },
    },
  },
  plugins: [],
};
export default config;
