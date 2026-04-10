"use client";

import { useEffect, useRef, useState } from "react";
import { clients } from "@/data/company";

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

function ClientLogo({ client }: { client: typeof clients[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 mx-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-40 h-20 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
        style={{
          border: hovered ? "1px solid rgba(var(--accent-rgb),0.18)" : "1px solid var(--border)",
          backgroundColor: hovered ? "rgba(var(--accent-rgb),0.04)" : "var(--bg-secondary)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hovered ? "0 12px 22px rgba(0,0,0,0.05)" : "none",
        }}
      >
        {/* Logo placeholder - stylized abbreviation */}
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 900,
            color: hovered ? "var(--text)" : "var(--text-muted)",
            letterSpacing: "0.12em",
            transition: "color 0.3s ease",
          }}
        >
          {client.abbreviation}
        </div>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.15em",
            color: hovered ? "var(--accent)" : "rgba(107,114,128,0.5)",
            marginTop: "4px",
            transition: "color 0.3s ease",
          }}
        >
          {client.sector.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  const { ref, inView } = useInView(0.1);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const clientsDouble = [...clients, ...clients, ...clients];

  return (
    <section
      id="clients"
      className={`relative py-10 lg:py-14 overflow-hidden section-reveal ${inView ? "visible" : ""}`}
      style={{ backgroundColor: "var(--bg-secondary)" }}
      ref={ref}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(var(--highlight-rgb),0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-10">
        {/* Header */}
        <div
          className="text-center"
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
            // TRUSTED BY
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
            OUR <span style={{ color: "var(--accent)" }}>CLIENTS</span>
          </h2>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Trusted by government agencies, defense organizations, and industry leaders across India and beyond.
          </p>
        </div>
      </div>

      {/* Marquee rows */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        {/* Row 1 — left to right */}
        <div
          className="relative overflow-hidden mb-4"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            ref={track1Ref}
            className="flex"
            style={{ animation: "marqueeLeft 25s linear infinite" }}
          >
            {clientsDouble.map((client, i) => (
              <ClientLogo key={`r1-${i}`} client={client} />
            ))}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            ref={track2Ref}
            className="flex"
            style={{ animation: "marqueeRight 30s linear infinite" }}
          >
            {[...clientsDouble].reverse().map((client, i) => (
              <ClientLogo key={`r2-${i}`} client={client} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 lg:mt-12">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.5s",
          }}
        >
          {[
            { label: "Government Agencies", value: "12+" },
            { label: "Defense Partners", value: "8+" },
            { label: "Industries Served", value: "15+" },
            { label: "States Covered", value: "22+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-5 rounded-xl"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 900,
                  color: "var(--text)",
                }}
              >
                {stat.value}
              </div>
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--text-muted)",
                  marginTop: "6px",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div
          className="mt-8 lg:mt-10 p-8 rounded-2xl text-center relative overflow-hidden"
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.8s ease 0.7s",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(var(--accent-rgb),0.025) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "2rem",
                color: "var(--accent)",
                opacity: 0.5,
                lineHeight: 1,
                marginBottom: "12px",
              }}
            >
              "
            </div>
            <blockquote
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                lineHeight: 1.8,
                color: "var(--text)",
                fontWeight: 500,
                maxWidth: "700px",
                margin: "0 auto 20px",
                fontStyle: "italic",
              }}
            >
              Metkaerox Systems has transformed our aerial surveillance operations. Their technology is mission-critical to our border monitoring program and has proven reliable in the most demanding field conditions.
            </blockquote>
            <div>
              <p
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                SENIOR OFFICER
              </p>
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                }}
              >
                GOVERNMENT DEFENSE AGENCY — INDIA
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
