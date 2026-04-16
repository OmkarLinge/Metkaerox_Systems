"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Preloader from "./Preloader";

interface ThemeContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ClientLayout");
  return context;
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const rootTheme = root.classList.contains("dark") ? "dark" : root.classList.contains("light") ? "light" : null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const resolvedTheme = savedTheme ?? rootTheme ?? systemTheme;

    setTheme(resolvedTheme);
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    localStorage.setItem("theme", resolvedTheme);
    setMounted(true);

    const hasShown = sessionStorage.getItem("metkaerox_preloader_shown");
    if (hasShown) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("metkaerox_preloader_shown", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="transition-opacity duration-700 ease-in-out opacity-100">
        {children}
      </div>
      {mounted && loading ? <Preloader /> : null}
    </ThemeContext.Provider>
  );
}
