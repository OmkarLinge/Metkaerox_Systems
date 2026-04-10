"use client";

import { Zap } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const footerLinks = {
  Products: [
    "FlySurveilX",
    "FlyAstros",
    "FlyCleon",
    "FlyGripper",
    "FlyIrax",
    "FlyVarun",
    "FlySpyder",
    "FireHawks",
  ],
  Technology: [
    "SLAM Navigation",
    "Frequency Hopping",
    "GPS Anti-Spoofing",
    "Swarm Intelligence",
    "Tether Systems",
  ],
  Company: [
    "About Us",
    "Mission & Vision",
    "Certifications",
    "Careers",
    "Press & Media",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Export Compliance",
    "Cookie Policy",
  ],
};

export default function Footer() {
  const scrollTo = (id: string) => {
    scrollToSection(id, id === "hero" ? 20 : 104);
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--surface-contrast)", borderTop: "1px solid var(--border)" }}
    >
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          opacity: 0.4,
        }}
      />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--accent-rgb), 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-rgb), 0.02) 1px, transparent 1px)
          `,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-14 grid lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <Zap
                size={24}
                style={{
                  color: "var(--accent)",
                  fill: "var(--accent)",
                  filter: "drop-shadow(0 0 8px rgba(var(--accent-rgb),0.45))",
                }}
              />
              <div className="flex flex-col leading-none">
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    color: "var(--text)",
                  }}
                >
                  METKAEROX
                </span>
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.35em",
                    color: "var(--accent)",
                  }}
                >
                  SYSTEMS
                </span>
              </div>

            </div>

            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
                marginBottom: "20px",
              }}
            >
              India's premier autonomous systems company, engineering advanced unmanned aerial platforms for defense, agriculture, surveillance, and industrial operations.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {["DGCA", "ISO 9001", "Make in India"].map((cert) => (
                <span
                  key={cert}
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.1em",
                    color: "var(--accent)",
                    border: "1px solid rgba(var(--accent-rgb),0.25)",
                    backgroundColor: "rgba(var(--accent-rgb),0.05)",
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="mb-4"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        if (link === "About Us") scrollTo("about");
                        else if (link === "Mission & Vision") scrollTo("about");
                      }}
                      className="text-left transition-all duration-200 hover:translate-x-1 block"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "var(--text-muted)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                      }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
          }}
        />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
            }}
          >
            © {new Date().getFullYear()} METKAEROX SYSTEMS TECHNOLOGIES PVT. LTD. — ALL RIGHTS RESERVED
          </p>

          <div className="flex items-center gap-6">
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
              }}
            >
              MADE WITH ❤️ IN INDIA
            </span>
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ animation: "pulse 2s ease infinite" }}
              />
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "rgba(52,211,153,0.7)",
                }}
              >
                ALL SYSTEMS NOMINAL
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </footer>
  );
}
