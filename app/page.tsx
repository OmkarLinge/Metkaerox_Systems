"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Technology from "@/components/Technology";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollSlideSection from "@/components/ScrollSlideSection";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
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

  if (loading) return <Preloader />;

  return (
    <main className="relative overflow-hidden" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <ScrollSlideSection>
        <About />
      </ScrollSlideSection>
      <ScrollSlideSection>
        <Products />
      </ScrollSlideSection>
      <ScrollSlideSection>
        <Technology />
      </ScrollSlideSection>
      <ScrollSlideSection>
        <Clients />
      </ScrollSlideSection>
      <ScrollSlideSection>
        <Contact />
      </ScrollSlideSection>
      <ScrollSlideSection offset={84}>
        <Footer />
      </ScrollSlideSection>
    </main>
  );
}
