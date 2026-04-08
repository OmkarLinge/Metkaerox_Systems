"use client";

import { useEffect, useRef, useState } from "react";
import { technologies } from "@/data/company";
import { scrollToSection } from "@/lib/utils";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type Tech = typeof technologies[0];

function TechCard({ tech, index, inView }: { tech: Tech; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : index % 2 === 0 ? "translateX(-40px)" : "translateX(40px)",
        transition: `all 0.7s ease ${index * 0.15}s`,
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden cursor-pointer"
        style={{
          border: hovered || expanded ? "1px solid rgba(var(--accent-rgb),0.18)" : "1px solid var(--border)",
          backgroundColor: "var(--card-bg)",
          backdropFilter: "blur(8px)",
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          boxShadow: hovered ? "0 16px 34px rgba(0,0,0,0.06)" : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Top gradient line */}
        <div
          className="h-0.5"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.36), transparent)",
            opacity: hovered || expanded ? 1 : 0.45,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Card content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            {/* Left: icon + badge */}
            <div className="flex items-start gap-4">
              {/* Icon circle */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{
                  background: "rgba(var(--accent-rgb),0.04)",
                  border: "1px solid rgba(var(--accent-rgb),0.1)",
                  boxShadow: hovered ? "0 8px 18px rgba(var(--accent-rgb),0.08)" : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {tech.icon}
              </div>

              {/* Title area */}
              <div>
                <span
                  className="px-2 py-0.5 rounded text-xs mb-2 inline-block"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                    backgroundColor: "rgba(var(--accent-rgb),0.03)",
                  }}
                >
                  {tech.badge}
                </span>
                <h3
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "var(--text)",
                    transition: "color 0.3s ease",
                    lineHeight: 1.2,
                  }}
                >
                  {tech.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.05em",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  {tech.subtitle}
                </p>
              </div>
            </div>

            {/* Expand toggle */}
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                border: "1px solid rgba(var(--accent-rgb),0.12)",
                color: "var(--accent)",
                backgroundColor: "rgba(var(--accent-rgb),0.04)",
                transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <rect x="5" y="0" width="2" height="12" />
                <rect x="0" y="5" width="12" height="2" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <p
            className="mt-4"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--text-muted)",
            }}
          >
            {tech.description}
          </p>

          {/* Expandable details */}
          <div
            style={{
              maxHeight: expanded ? "400px" : "0",
              overflow: "hidden",
              transition: "max-height 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <div
              className="mt-6 pt-6 border-t"
              style={{ borderColor: "rgba(var(--accent-rgb),0.1)" }}
            >
              <h4
                className="mb-4"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "0.2em",
                }}
              >
                TECHNICAL DETAILS
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {tech.details.map((detail, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      border: "1px solid rgba(var(--accent-rgb),0.08)",
                      backgroundColor: "rgba(var(--accent-rgb),0.02)",
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.875rem",
                        color: "var(--text)",
                        fontWeight: 500,
                      }}
                    >
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Technology() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="technology"
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
      ref={ref}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 20% 50%, rgba(var(--accent-rgb),0.03) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(var(--highlight-rgb),0.03) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-10 lg:mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.35em",
              color: "var(--accent)",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            // CORE TECH
          </p>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "var(--text)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            ADVANCED <span style={{ color: "var(--accent)" }}>TECHNOLOGY</span>
          </h2>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Proprietary technologies that define the next generation of autonomous aerial systems — from AI-powered navigation to quantum-resistant communications.
          </p>
        </div>

        {/* Tech grid — 2 columns for larger screens */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {technologies.map((tech, i) => (
            <TechCard key={tech.id} tech={tech} index={i} inView={inView} />
          ))}

          {/* CTA card spanning full width */}
          <div
            className="md:col-span-2 rounded-xl p-8 text-center relative overflow-hidden"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-secondary)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease 0.8s",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(var(--accent-rgb),0.06) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  color: "var(--accent)",
                  marginBottom: "12px",
                }}
              >
                DEFENCE-GRADE • MAKE IN INDIA • INDIGENOUS TECHNOLOGY
              </p>
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                Built for the Harshest Environments
              </h3>
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  maxWidth: "600px",
                  margin: "0 auto 24px",
                  lineHeight: 1.7,
                }}
              >
                Every Metkaerox Systems platform is developed and tested under extreme conditions — from high-altitude Himalayan terrain to coastal salt-spray environments and desert heat.
              </p>
              <button
                onClick={() => scrollToSection("contact", 104)}
                className="px-8 py-4 rounded font-bold transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  background: "linear-gradient(135deg, var(--accent), var(--highlight))",
                  color: "var(--button-contrast)",
                  boxShadow: "0 0 30px rgba(var(--accent-rgb),0.25)",
                }}
              >
                EXPLORE TECH DEMOS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
