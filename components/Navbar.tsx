"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Technology", href: "#technology" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLElement>(null);
  const scrolledRef = useRef(false);
  const activeSectionRef = useRef("hero");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 50;
        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setScrolled(nextScrolled);
        }

        const sections = navLinks.map((link) => link.href.replace("#", ""));
        let nextActiveSection = activeSectionRef.current;

        for (const section of [...sections].reverse()) {
          const element = document.getElementById(section);
          if (element && window.scrollY >= element.offsetTop - 120) {
            nextActiveSection = section;
            break;
          }
        }

        if (nextActiveSection !== activeSectionRef.current) {
          activeSectionRef.current = nextActiveSection;
          setActiveSection(nextActiveSection);
        }

        animationFrame = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const getScrollOffset = () => {
    const navHeight = navRef.current?.getBoundingClientRect().height ?? 56;
    return navHeight + 28;
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const offset = id === "hero" ? 20 : getScrollOffset();
    const top = window.scrollY + el.getBoundingClientRect().top - offset;

    activeSectionRef.current = id;
    setActiveSection(id);
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  const navBackground = isDark
    ? scrolled
      ? "rgba(16, 26, 36, 0.84)"
      : "rgba(16, 26, 36, 0.62)"
    : scrolled
      ? "rgba(244,239,227,0.82)"
      : "rgba(244,239,227,0.62)";
  const navBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.14)" : "1px solid rgba(var(--accent-rgb),0.1)";
  const navShadow = isDark
    ? scrolled
      ? "0 16px 40px rgba(3,8,14,0.28), 0 0 24px rgba(var(--accent-rgb),0.08)"
      : "0 10px 24px rgba(3,8,14,0.16)"
    : scrolled
      ? "0 12px 28px rgba(37,35,24,0.08)"
      : "0 8px 20px rgba(37,35,24,0.04)";
  const logoText = isDark ? "var(--text)" : "var(--text)";
  const inactiveText = isDark ? "rgba(238,246,255,0.66)" : "var(--text-muted)";
  const toggleBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.18)" : "1px solid rgba(var(--accent-rgb),0.12)";
  const toggleBackground = isDark ? "rgba(24,37,52,0.72)" : "rgba(255,255,255,0.42)";
  const toggleColor = isDark ? "var(--text)" : "var(--text)";
  const ctaBackground = isDark
    ? "linear-gradient(135deg, var(--accent), var(--highlight))"
    : "linear-gradient(135deg, var(--accent), var(--highlight))";
  const ctaShadow = isDark ? "0 10px 26px rgba(var(--accent-rgb),0.18)" : "0 8px 18px rgba(var(--accent-rgb),0.18)";
  const mobileBackground = isDark ? "rgba(16,26,36,0.96)" : "rgba(243,238,225,0.97)";
  const mobileBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.1)" : "1px solid rgba(var(--accent-rgb),0.08)";

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-3 left-1/2 -translate-x-1/2 z-nav transition-all duration-500 w-[calc(100%-1.5rem)] max-w-6xl rounded-[24px]"
        )}
        style={{
          backgroundColor: navBackground,
          border: navBorder,
          backdropFilter: "blur(14px)",
          boxShadow: navShadow,
          opacity: mounted ? 1 : 0,
          transform: `translateX(-50%) translateY(${mounted ? "0" : "-12px"})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#hero")}
              className="flex items-center gap-2 group"
            >
              <div
                className="relative"
                style={{ color: "var(--accent)" }}
              >
                <Zap
                  size={24}
                  style={{ color: "var(--accent)", fill: "var(--accent)" }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-display text-sm font-black tracking-widest"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: logoText,
                    letterSpacing: "0.2em",
                  }}
                >
                  METKAEROX
                </span>
                <span
                  className="font-mono text-xs tracking-[0.35em]"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color: "var(--accent)",
                    fontSize: "0.6rem",
                  }}
                >
                  SYSTEMS
                </span>
              </div>
            </button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="relative px-3 py-2 group"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      letterSpacing: "0.07em",
                      color: isActive ? "var(--accent)" : inactiveText,
                      textTransform: "uppercase",
                      transition: "color 0.3s ease",
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-xl transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? "rgba(var(--accent-rgb),0.09)" : "rgba(var(--accent-rgb),0.04)",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scale(1)" : "scale(0.86)",
                      }}
                    />
                    <span className="relative z-10 transition-colors duration-300" style={{ color: isActive ? "var(--accent)" : undefined }}>
                      {link.label}
                    </span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: toggleBorder,
                  backgroundColor: toggleBackground,
                  color: toggleColor,
                  boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.06)" : "inset 0 1px 0 rgba(255,255,255,0.65)",
                }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* CTA */}
              <button
                onClick={() => scrollTo("#contact")}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  background: ctaBackground,
                  color: "var(--button-contrast)",
                  boxShadow: ctaShadow,
                }}
              >
                GET STARTED
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center"
                style={{ color: logoText }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? "400px" : "0",
            backgroundColor: mobileBackground,
            borderTop: mobileOpen ? mobileBorder : "none",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="w-full text-left px-4 py-3 rounded transition-colors duration-200"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: logoText,
                  fontSize: "0.9rem",
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-2 w-full py-3 rounded font-bold text-sm"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                background: ctaBackground,
                color: "var(--button-contrast)",
              }}
            >
              GET STARTED
            </button>
          </div>
        </div>
      </nav>

      <style jsx global>{`
        .z-nav { z-index: 500; }
        .group:hover > span:first-child {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `}</style>
    </>
  );
}
