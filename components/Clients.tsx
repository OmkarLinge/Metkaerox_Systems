"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { clientGroups } from "@/data/company";
import { ExternalLink, ArrowUpRight } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type Client = {
  name: string;
  abbreviation: string;
  sector: string;
  logo?: string;
  website?: string;
};

function ClientCard({ client, size = "normal" }: { client: Client; size?: "normal" | "large" }) {
  const [hovered, setHovered] = useState(false);
  const [logoState, setLogoState] = useState<"idle" | "loaded" | "error">(
    client.logo ? "idle" : "error"
  );
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!client.logo) {
      setLogoState("error");
      return;
    }
    let active = true;
    const image = new window.Image();
    image.onload = () => { if (active) setLogoState("loaded"); };
    image.onerror = () => { if (active) setLogoState("error"); };
    image.src = client.logo;
    return () => { active = false; };
  }, [client.logo]);

  const showLogo = logoState === "loaded";
  const dim = size === "large" ? 180 : 150;
  const logoDim = size === "large" ? 56 : 48;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.08)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
    setHovered(false);
  }, []);

  const cardContent = (
    <div
      ref={cardRef}
      className="client-card relative flex flex-col items-center justify-center text-center overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: `${dim}px`,
        height: `${dim}px`,
        flexShrink: 0,
        borderRadius: "20px",
        border: hovered
          ? "1px solid rgba(var(--accent-rgb), 0.5)"
          : "1px solid rgba(var(--highlight-rgb), 0.08)",
        background: hovered
          ? "linear-gradient(135deg, rgba(var(--accent-rgb),0.12) 0%, rgba(var(--highlight-rgb),0.06) 50%, rgba(var(--accent-rgb),0.08) 100%)"
          : "linear-gradient(135deg, rgba(var(--highlight-rgb),0.04) 0%, rgba(var(--accent-rgb),0.02) 100%)",
        backdropFilter: "blur(20px)",
        cursor: client.website ? "pointer" : "default",
        transition: "border 0.4s ease, background 0.4s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Animated shimmer border */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          background: "conic-gradient(from 0deg, transparent, rgba(var(--accent-rgb),0.3), transparent, rgba(var(--accent-rgb),0.15), transparent)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          animation: hovered ? "spinBorder 3s linear infinite" : "none",
        }}
      />

      {/* Inner glow */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.2 : 0,
          background: "radial-gradient(circle at center, var(--accent), transparent 70%)",
        }}
      />

      {/* Logo */}
      <div
        className="relative flex items-center justify-center transition-all duration-500"
        style={{
          width: `${logoDim + 20}px`,
          height: `${logoDim + 20}px`,
          marginBottom: "12px",
          borderRadius: "16px",
          backgroundColor: showLogo
            ? "rgba(255,255,255,0.06)"
            : "rgba(var(--accent-rgb), 0.08)",
          border: "1px solid rgba(var(--highlight-rgb), 0.08)",
          transform: hovered ? "translateZ(20px) scale(1.05)" : "translateZ(0) scale(1)",
        }}
      >
        {showLogo ? (
          <img
            src={client.logo}
            alt={client.name}
            className="transition-all duration-500"
            style={{
              maxWidth: `${logoDim}px`,
              maxHeight: `${logoDim}px`,
              objectFit: "contain",
              filter: hovered ? "brightness(1.3) drop-shadow(0 0 8px rgba(var(--accent-rgb),0.3))" : "brightness(0.85)",
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: size === "large" ? "1.3rem" : "1.1rem",
              fontWeight: 800,
              color: hovered ? "var(--accent)" : "var(--highlight)",
              letterSpacing: "0.06em",
              transition: "color 0.3s ease",
              textShadow: hovered ? "0 0 12px rgba(var(--accent-rgb),0.4)" : "none",
            }}
          >
            {client.abbreviation.slice(0, 4)}
          </span>
        )}
      </div>

      {/* Name */}
      <div
        className="px-3 leading-tight transition-all duration-300"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "0.55rem",
          fontWeight: 700,
          color: hovered ? "var(--accent)" : "var(--highlight)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          maxWidth: `${dim - 20}px`,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          transform: hovered ? "translateZ(10px)" : "translateZ(0)",
        }}
      >
        {client.name}
      </div>

      {/* Sector */}
      <div
        className="mt-1 transition-all duration-300"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.48rem",
          color: "var(--text-muted)",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: hovered ? 1 : 0.7,
        }}
      >
        {client.sector}
      </div>

      {/* Visit link indicator on hover */}
      {client.website && (
        <div
          className="absolute bottom-3 right-3 flex items-center gap-1 transition-all duration-400"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0, 0) scale(1)" : "translate(6px, 6px) scale(0.6)",
          }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "rgba(var(--accent-rgb), 0.2)",
              border: "1px solid rgba(var(--accent-rgb), 0.3)",
            }}
          >
            <ArrowUpRight size={11} color="var(--accent)" />
          </div>
        </div>
      )}
    </div>
  );

  if (client.website) {
    return (
      <a
        href={client.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2.5 my-2 block flex-shrink-0"
        style={{ textDecoration: "none" }}
      >
        {cardContent}
      </a>
    );
  }

  return <div className="mx-2.5 my-2 flex-shrink-0">{cardContent}</div>;
}

function MarqueeRow({
  clients,
  direction,
  speed,
  rowKey,
}: {
  clients: Client[];
  direction: "left" | "right";
  speed: number;
  rowKey: string;
}) {
  const [paused, setPaused] = useState(false);
  const tripled = [...clients, ...clients, ...clients];

  return (
    <div
      className="flex overflow-hidden py-2"
      style={{
        maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex"
        style={{
          animation: direction === "left"
            ? `marqueeLeft ${speed}s linear infinite`
            : `marqueeRight ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          display: "flex",
          width: "max-content",
        }}
      >
        {tripled.map((client, i) => (
          <ClientCard key={`${rowKey}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="clients"
      className={`relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden section-reveal ${inView ? "visible" : ""}`}
      style={{ backgroundColor: "var(--bg)" }}
      ref={ref}
    >
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(var(--accent-rgb),0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
            animation: "floatGlow 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-0 bottom-1/4"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(var(--accent-rgb),0.04) 0%, transparent 60%)",
            filter: "blur(80px)",
            animation: "floatGlow 12s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className="mb-16 lg:mb-20 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div
            className="inline-block mb-5 px-4 py-1.5 rounded-full"
            style={{
              border: "1px solid rgba(var(--accent-rgb), 0.2)",
              background: "rgba(var(--accent-rgb), 0.06)",
            }}
          >
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--accent)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Trusted Partners & Clients
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              color: "var(--text)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              textTransform: "uppercase"
            }}
          >
            ESTABLISHED{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px var(--accent)",
                animation: "textGlow 4s ease-in-out infinite",
              }}
            >
              PARTNERSHIPS
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "var(--text-muted)",
              maxWidth: "600px",
              margin: "20px auto 0",
              lineHeight: 1.7,
            }}
          >
            Trusted by government agencies, defense organizations, and industry leaders across India and beyond.
          </p>
        </div>

        {clientGroups.map((group, idx) => {
          const hasSecondRow = group.clients.length > 10;
          const row1 = hasSecondRow ? group.clients.slice(0, 10) : group.clients;
          const row2 = hasSecondRow ? group.clients.slice(10) : [];

          return (
            <div
              key={group.id}
              className={`${idx !== 0 ? "mt-20" : ""}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${0.2 + idx * 0.15}s`,
              }}
            >
              {/* Section divider */}
              <div className="flex items-end justify-between mb-8 pb-5" style={{ borderBottom: "1px solid rgba(var(--highlight-rgb), 0.08)" }}>
                <div>
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: "var(--text)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase"
                  }}>
                    {group.subtitle}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginTop: "4px"
                  }}>
                    {group.name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: "var(--accent)",
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                  <span style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--accent)",
                    opacity: 0.6
                  }}>
                    {group.clients.length} PARTNERS
                  </span>
                </div>
              </div>

              {/* Marquee rows */}
              <MarqueeRow
                clients={row1}
                direction={idx % 2 === 0 ? "left" : "right"}
                speed={45}
                rowKey={`${group.id}-r1`}
              />

              {hasSecondRow && (
                <MarqueeRow
                  clients={row2}
                  direction={idx % 2 === 0 ? "right" : "left"}
                  speed={55}
                  rowKey={`${group.id}-r2`}
                />
              )}
            </div>
          );
        })}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        @keyframes spinBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes floatGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        @keyframes textGlow {
          0%, 100% { filter: drop-shadow(0 0 0px transparent); }
          50% { filter: drop-shadow(0 0 20px rgba(var(--accent-rgb), 0.3)); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .client-card {
          transition: border 0.4s ease, background 0.4s ease, transform 0.15s ease;
        }
      `,
        }}
      />
    </section>
  );
}
