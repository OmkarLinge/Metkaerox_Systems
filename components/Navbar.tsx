"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, Zap, ChevronDown } from "lucide-react";
import { cn, scrollToSection } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTheme } from "@/components/ClientLayout";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Blog", href: "/blog" },
  { 
    label: "Gallery", 
    dropdown: [
      { label: "Image Gallery", href: "/gallery/images" },
      { label: "Video Gallery", href: "/gallery/videos" },
    ]
  },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrolledRef = useRef(false);
  const activeSectionRef = useRef("hero");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const updateNavOffset = () => {
      const nav = navRef.current;
      if (!nav) return;
      const rect = nav.getBoundingClientRect();
      const offset = Math.round(rect.bottom + 8);
      document.documentElement.style.setProperty("--nav-offset", `${offset}px`);
    };

    updateNavOffset();
    window.addEventListener("resize", updateNavOffset, { passive: true });
    return () => window.removeEventListener("resize", updateNavOffset);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    let animationFrame = 0;

    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 50;
        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setScrolled(nextScrolled);
        }

        const sections = navLinks
          .filter(link => link.href && link.href.startsWith("#"))
          .map((link) => link.href!.replace("#", ""));
        
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
  }, [pathname]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const id = href.replace("#", "");
    activeSectionRef.current = id;
    setActiveSection(id);
    scrollToSection(id, id === "hero" ? 20 : 104);
  };

  const navBackground = isDark
    ? scrolled
      ? "rgba(12, 18, 26, 0.78)"
      : "rgba(12, 18, 26, 0.56)"
    : scrolled
      ? "rgba(246, 249, 243, 0.9)"
      : "rgba(246, 249, 243, 0.82)";
  const navBorder = isDark
    ? scrolled
      ? "1px solid rgba(var(--accent-rgb),0.22)"
      : "1px solid rgba(var(--accent-rgb),0.14)"
    : scrolled
      ? "1px solid rgba(var(--accent-rgb),0.18)"
      : "1px solid rgba(var(--accent-rgb),0.12)";
  const navShadow = isDark
    ? scrolled
      ? "0 18px 44px rgba(3,8,14,0.34), 0 0 30px rgba(var(--accent-rgb),0.12)"
      : "0 10px 24px rgba(3,8,14,0.16)"
    : scrolled
      ? "0 18px 40px rgba(36,55,72,0.12), 0 8px 18px rgba(95,119,86,0.08)"
      : "0 12px 28px rgba(36,55,72,0.08)";
  const navBackdrop = scrolled ? "blur(18px)" : "blur(10px)";
  const navHighlight = scrolled
    ? isDark
      ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 60%)"
      : "linear-gradient(135deg, rgba(255,255,255,0.42), rgba(var(--accent-rgb),0.08) 36%, rgba(var(--highlight-rgb),0) 72%)"
    : "none";
  const logoText = isDark 
    ? "var(--text)" 
    : "var(--highlight)";
  const inactiveText = isDark 
    ? "rgba(238,246,255,0.66)" 
    : "var(--text-muted)";
  const toggleBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.18)" : "1px solid rgba(var(--accent-rgb),0.12)";
  const toggleBackground = isDark ? "rgba(24,37,52,0.72)" : "rgba(255,255,255,0.62)";
  const toggleColor = isDark 
    ? "var(--text)" 
    : "var(--highlight)";
  const ctaBackground = isDark
    ? "linear-gradient(135deg, var(--accent), var(--highlight))"
    : "linear-gradient(135deg, var(--accent), var(--highlight))";
  const ctaShadow = isDark ? "0 10px 26px rgba(var(--accent-rgb),0.18)" : "0 8px 18px rgba(var(--accent-rgb),0.18)";
  const mobileBackground = isDark ? "rgba(16,26,36,0.96)" : "rgba(244,248,240,0.98)";
  const mobileBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.1)" : "1px solid rgba(var(--accent-rgb),0.08)";

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-3 left-1/2 -translate-x-1/2 z-nav transition-all duration-500 w-[calc(100%-1.5rem)] max-w-[1380px] rounded-[24px]"
        )}
        style={{
          backgroundColor: navBackground,
          backgroundImage: navHighlight,
          border: navBorder,
          backdropFilter: navBackdrop,
          WebkitBackdropFilter: navBackdrop,
          boxShadow: navShadow,
          opacity: mounted ? 1 : 0,
          transform: `translateX(-50%) translateY(${mounted ? "0" : "-12px"})`,
        }}
      >
        <div className="mx-auto w-full px-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#hero")}
              className="flex items-center gap-2 group"
              style={{ boxShadow: "none", outline: "none", border: "none", background: "none" }}
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
            <div className="hidden md:flex items-center gap-0">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative group/dropdown"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className="relative px-3 py-2 flex items-center gap-1 group nav-link"
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          letterSpacing: "0.07em",
                          color: activeDropdown === link.label ? "var(--accent)" : inactiveText,
                          textTransform: "uppercase",
                          transition: "color 0.3s ease",
                        }}
                      >
                        <span className="relative z-10">{link.label}</span>
                        <ChevronDown size={14} className={cn("transition-transform duration-300", activeDropdown === link.label && "rotate-180")} />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-0 mt-1 w-48 rounded-xl overflow-hidden border border-accent shadow-xl backdrop-blur-xl"
                            style={{ backgroundColor: navBackground }}
                          >
                            <div className="py-1">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block px-4 py-2.5 text-[0.75rem] font-bold tracking-wider hover:bg-accent hover:text-white transition-colors duration-200"
                                  style={{
                                    fontFamily: "'Orbitron', sans-serif",
                                    color: logoText,
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const href = link.href!;
                const isHash = href.startsWith("#");

                if (!isHash) {
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="relative px-2.5 py-2 group nav-link"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        letterSpacing: "0.07em",
                        color: pathname === href ? "var(--accent)" : inactiveText,
                        textTransform: "uppercase",
                        transition: "color 0.3s ease",
                      }}
                    >
                      <span className="relative z-10 transition-colors duration-300" style={{ color: pathname === href ? "var(--accent)" : undefined }}>
                        {link.label}
                      </span>
                    </Link>
                  );
                }

                const id = href.replace("#", "");
                const isActive = pathname === "/" && activeSection === id;
                return (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className="relative px-2.5 py-2 group nav-link"
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
                className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 btn-interaction"
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
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 btn-interaction"
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
                className="md:hidden w-10 h-10 flex items-center justify-center btn-interaction"
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
            maxHeight: mobileOpen ? "500px" : "0",
            backgroundColor: mobileBackground,
            borderTop: mobileOpen ? mobileBorder : "none",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <div className="flex flex-col gap-1">
                    <span
                      className="px-4 py-2 text-[0.7rem] font-bold tracking-widest text-accent uppercase"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {link.label}
                    </span>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="w-full text-left px-8 py-2.5 rounded transition-colors duration-200 btn-interaction"
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: logoText,
                          fontSize: "0.85rem",
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <>
                    {link.href!.startsWith("#") ? (
                      <button
                        onClick={() => scrollTo(link.href!)}
                        className="w-full text-left px-4 py-3 rounded transition-colors duration-200 btn-interaction"
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
                    ) : (
                      <Link
                        href={link.href!}
                        onClick={() => setMobileOpen(false)}
                        className="w-full text-left px-4 py-3 rounded transition-colors duration-200 btn-interaction block"
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
                      </Link>
                    )}
                  </>
                )}
              </div>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-2 w-full py-3 rounded font-bold text-sm btn-interaction"
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .z-nav { z-index: 500; }
        .group:hover > span:first-child {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `,
        }}
      />
    </>
  );
}
