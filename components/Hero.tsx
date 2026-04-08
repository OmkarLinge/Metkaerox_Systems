"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, PhoneCall } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const missionTags = [
  "Defense Systems",
  "Industrial UAVs",
  "Autonomous Mapping",
];

const metrics = [
  { label: "Flight Hours", value: "10K+" },
  { label: "Mission Platforms", value: "08" },
  { label: "Operational States", value: "22" },
];

interface HeroProps {
  theme: "dark" | "light";
}

export default function Hero({ theme }: HeroProps) {
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const coreRef = useRef<HTMLDivElement>(null);

  const sectionBackground = isDark
    ? "linear-gradient(180deg, #0b131c 0%, #101a24 42%, #162230 100%)"
    : "linear-gradient(180deg, #efe9dc 0%, #e6dfcf 46%, #d8d0bf 100%)";
  const sectionGrid = isDark
    ? "linear-gradient(rgba(var(--accent-rgb),0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-rgb),0.03) 1px, transparent 1px)"
    : "linear-gradient(rgba(var(--accent-rgb),0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-rgb),0.04) 1px, transparent 1px)";
  const topGlow = isDark
    ? "radial-gradient(circle at 50% 0%, rgba(var(--accent-rgb),0.12), rgba(var(--accent-rgb),0) 72%)"
    : "radial-gradient(circle at 50% 0%, rgba(var(--accent-rgb),0.08), rgba(255,255,255,0.62) 38%, rgba(255,255,255,0) 75%)";
  const shellBackground = isDark ? "rgba(15,25,36,0.8)" : "rgba(246,242,233,0.9)";
  const shellBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.12)" : "1px solid rgba(var(--accent-rgb),0.1)";
  const shellShadow = isDark
    ? "0 28px 120px rgba(2,8,14,0.36), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(var(--accent-rgb),0.04)"
    : "0 28px 96px rgba(45, 47, 33, 0.12), inset 0 1px 0 rgba(255,255,255,0.72)";
  const leftGlow = isDark
    ? "radial-gradient(circle at 18% 18%, rgba(var(--accent-rgb),0.08), rgba(var(--accent-rgb),0) 52%)"
    : "radial-gradient(circle at 18% 18%, rgba(var(--accent-rgb),0.08), rgba(var(--accent-rgb),0) 55%)";
  const tagBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.12)" : "1px solid rgba(var(--accent-rgb),0.08)";
  const tagBackground = isDark ? "rgba(18,30,44,0.56)" : "rgba(255,255,255,0.48)";
  const tagColor = isDark ? "rgba(226,239,255,0.76)" : "var(--text-muted)";
  const tagShadow = "none";
  const eyebrowColor = isDark ? "rgba(140,170,198,0.82)" : "var(--text-muted)";
  const headingColor = isDark ? "#eef6ff" : "var(--text)";
  const headingAccent = isDark ? "var(--accent)" : "var(--accent)";
  const headingShadow = isDark ? "0 0 24px rgba(var(--accent-rgb),0.08)" : "0 1px 0 rgba(255,255,255,0.18)";
  const bodyColor = isDark ? "rgba(214,228,243,0.72)" : "var(--text-muted)";
  const primaryButtonBackground = isDark
    ? "linear-gradient(135deg, var(--accent), var(--highlight))"
    : "linear-gradient(135deg, var(--accent), var(--highlight))";
  const primaryButtonColor = "var(--button-contrast)";
  const primaryButtonShadow = isDark ? "0 10px 24px rgba(var(--accent-rgb),0.16)" : "0 10px 22px rgba(var(--accent-rgb),0.18)";
  const secondaryButtonBackground = isDark ? "rgba(18,30,44,0.9)" : "var(--surface-contrast)";
  const secondaryButtonColor = isDark ? "#f1f8ff" : "var(--bg-secondary)";
  const secondaryButtonBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.12)" : "1px solid rgba(var(--accent-rgb),0.12)";
  const secondaryButtonShadow = isDark ? "0 10px 24px rgba(4,8,14,0.18)" : "0 10px 22px rgba(27,31,21,0.14)";
  const metricPanelBackground = isDark ? "rgba(18,30,44,0.82)" : "rgba(255,255,255,0.64)";
  const metricPanelBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.1)" : "1px solid rgba(var(--accent-rgb),0.08)";
  const metricPanelShadow = isDark ? "0 12px 28px rgba(3,8,14,0.22)" : "0 10px 24px rgba(35,35,28,0.04)";
  const metricValueColor = isDark ? "#eff7ff" : "var(--text)";
  const metricLabelColor = isDark ? "rgba(142,170,198,0.7)" : "var(--text-muted)";
  const rightPanelBackground = isDark ? "linear-gradient(180deg, #182432 0%, #0f1823 100%)" : "linear-gradient(180deg, #2a3022 0%, #1b1f17 100%)";
  const dividerColor = isDark
    ? "linear-gradient(180deg, transparent, rgba(var(--accent-rgb),0.2), transparent)"
    : "linear-gradient(180deg, transparent, rgba(var(--accent-rgb),0.18), transparent)";
  const sideButtonBackground = isDark ? "rgba(var(--accent-rgb),0.08)" : "rgba(255,255,255,0.06)";
  const sideButtonBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.12)" : "1px solid rgba(255,255,255,0.08)";
  const rightAtmosphere = isDark
    ? "radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb),0.08), rgba(var(--accent-rgb),0) 66%)"
    : "radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb),0.08), rgba(var(--accent-rgb),0) 66%)";
  const underGlow = isDark
    ? "radial-gradient(circle, rgba(var(--accent-rgb),0.16), rgba(var(--highlight-rgb),0.06), rgba(var(--accent-rgb),0) 72%)"
    : "radial-gradient(circle, rgba(var(--accent-rgb),0.22), rgba(var(--accent-rgb),0) 72%)";
  const platformBackground = isDark
    ? "linear-gradient(180deg, rgba(28,43,58,0.96) 0%, rgba(16,26,38,0.98) 100%)"
    : "linear-gradient(180deg, #f5f0e5 0%, #d8d1c0 100%)";
  const platformShadow = isDark
    ? "0 18px 32px rgba(3,8,14,0.32), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 30px rgba(var(--accent-rgb),0.08)"
    : "0 18px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.9)";
  const platformText = isDark ? "#eff7ff" : "var(--surface-contrast)";
  const platformSubtext = isDark ? "rgba(145,176,206,0.66)" : "var(--text-muted)";
  const orbBackground = isDark
    ? "radial-gradient(circle at 35% 30%, rgba(247,252,255,0.98) 0%, rgba(214,236,252,0.94) 28%, rgba(114,157,204,0.72) 62%, rgba(20,37,58,0.92) 100%)"
    : "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.98) 0%, rgba(243,239,232,0.96) 34%, rgba(216,212,201,0.95) 72%, rgba(180,177,166,0.9) 100%)";
  const orbShadow = isDark
    ? "0 42px 80px rgba(4,8,14,0.4), inset -24px -24px 48px rgba(10,20,34,0.24), inset 24px 18px 32px rgba(255,255,255,0.2), 0 0 48px rgba(var(--accent-rgb),0.12)"
    : "0 42px 80px rgba(16,18,12,0.34), inset -24px -24px 48px rgba(0,0,0,0.1), inset 24px 18px 32px rgba(255,255,255,0.75)";
  const orbTexture = isDark
    ? "repeating-linear-gradient(135deg, rgba(12,26,44,0.14) 0 7px, rgba(255,255,255,0.06) 7px 13px)"
    : "repeating-linear-gradient(135deg, rgba(44,44,44,0.08) 0 7px, rgba(255,255,255,0.04) 7px 13px)";
  const orbInnerBorder = isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.24)";
  const orbOuterBorder = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.14)";
  const orbitRing = isDark ? "rgba(var(--accent-rgb),0.16)" : "rgba(var(--accent-rgb),0.18)";
  const glowBall = isDark
    ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), rgba(var(--accent-rgb),0.44))"
    : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.96), rgba(var(--accent-rgb),0.18))";
  const smallOrb = isDark
    ? "radial-gradient(circle at 30% 30%, #ffffff, rgba(var(--accent-rgb),0.32))"
    : "radial-gradient(circle at 30% 30%, #ffffff, rgba(var(--accent-rgb),0.26))";
  const smallOrbShadow = isDark ? "0 10px 24px rgba(10,32,52,0.3)" : "0 10px 24px rgba(0,0,0,0.18)";
  const infoCardBackground = isDark ? "rgba(18,30,44,0.56)" : "rgba(247,242,232,0.06)";
  const infoCardBorder = isDark ? "1px solid rgba(var(--accent-rgb),0.1)" : "1px solid rgba(255,255,255,0.08)";
  const infoLabelColor = isDark ? "rgba(151,182,211,0.58)" : "rgba(245,240,230,0.58)";
  const infoRangeColor = isDark ? "var(--accent)" : "var(--highlight)";
  const sideWordColor = isDark ? "rgba(var(--accent-rgb),0.08)" : "rgba(245,240,230,0.08)";
  const scrollLabelColor = isDark ? "rgba(142,170,198,0.7)" : "var(--text-muted)";
  const ringBorder = isDark ? "rgba(var(--accent-rgb),0.08)" : "rgba(var(--accent-rgb),0.09)";
  const tiltedRingBorder = isDark ? "rgba(var(--highlight-rgb),0.12)" : "rgba(var(--accent-rgb),0.11)";

  useEffect(() => {
    setMounted(true);

    let animationFrame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${currentX * 14}px, ${currentY * 10}px, 0)`;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("blur", reset);
    window.addEventListener("mouseleave", reset);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("blur", reset);
      window.removeEventListener("mouseleave", reset);
    };
  }, []);

  const scrollTo = (id: string) => {
    scrollToSection(id, id === "hero" ? 20 : 104);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{
        background: sectionBackground,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: sectionGrid,
          backgroundSize: "88px 88px",
          opacity: 0.55,
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{
          background: topGlow,
        }}
      />

      <div className="relative w-full max-w-[1380px] mx-auto px-3 sm:px-5 lg:px-6 pt-20 pb-6 lg:pt-20 lg:pb-6">
        <div
          className={`transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div
            className="rounded-[34px] overflow-hidden lg:h-[calc(100vh-102px)] lg:max-h-[760px]"
            style={{
              backgroundColor: shellBackground,
              border: shellBorder,
              boxShadow: shellShadow,
            }}
          >
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative px-6 py-7 sm:px-10 sm:py-8 lg:px-14 lg:py-10 flex flex-col justify-between">
                <div
                  className="absolute inset-x-0 top-0 h-40 pointer-events-none"
                  style={{
                    background: leftGlow,
                  }}
                />

                <div className="flex justify-end gap-2 mb-5 relative z-10">
                  <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end">
                    {missionTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full"
                        style={{
                          border: tagBorder,
                          backgroundColor: tagBackground,
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.12em",
                          color: tagColor,
                          boxShadow: tagShadow,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="max-w-[470px] relative z-10">
                  <p
                    className="mb-4"
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.7rem",
                      letterSpacing: "0.28em",
                      color: eyebrowColor,
                      fontWeight: 700,
                    }}
                  >
                    PRECISION UAV ECOSYSTEM
                  </p>

                  <h1
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "clamp(2.2rem, 4.9vw, 4.55rem)",
                      fontWeight: 900,
                      lineHeight: 0.84,
                      letterSpacing: "-0.04em",
                      color: headingColor,
                      textShadow: headingShadow,
                    }}
                  >
                    BUILDING
                    <br />
                    FUTURE READY
                    <br />
                    DRONES FOR
                    <br />
                    <span style={{ color: headingAccent }}>YOUR MISSION</span>
                  </h1>

                  <p
                    className="mt-5"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1.02rem",
                      lineHeight: 1.58,
                      color: bodyColor,
                      maxWidth: "450px",
                      fontWeight: 600,
                    }}
                  >
                    Advanced surveillance, payload, agriculture, and emergency-response
                    platforms engineered for a cleaner premium landing experience.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <button
                      onClick={() => scrollTo("products")}
                      className="group inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: primaryButtonBackground,
                        color: primaryButtonColor,
                        boxShadow: primaryButtonShadow,
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                      }}
                    >
                      EXPLORE FLEET
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>

                    <button
                      onClick={() => scrollTo("contact")}
                      className="inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        backgroundColor: secondaryButtonBackground,
                        color: secondaryButtonColor,
                        border: secondaryButtonBorder,
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        boxShadow: secondaryButtonShadow,
                      }}
                    >
                      <PhoneCall size={16} />
                      GET IN TOUCH
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6 pt-5 relative z-10" style={{ borderTop: isDark ? "1px solid rgba(89,231,255,0.1)" : "1px solid rgba(var(--accent-rgb),0.12)" }}>
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl px-3.5 py-3"
                      style={{
                        backgroundColor: metricPanelBackground,
                        border: metricPanelBorder,
                        boxShadow: metricPanelShadow,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: "1rem",
                          fontWeight: 900,
                          color: metricValueColor,
                          marginBottom: "3px",
                        }}
                      >
                        {metric.value}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.5rem",
                          letterSpacing: "0.14em",
                          color: metricLabelColor,
                        }}
                      >
                        {metric.label.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="relative px-6 py-8 sm:px-10 lg:px-8 lg:py-10 min-h-[380px] lg:min-h-0 h-full"
                style={{
                  background: rightPanelBackground,
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 w-px"
                  style={{
                    background: dividerColor,
                  }}
                />

                <div className="flex items-center justify-end mb-8">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: sideButtonBackground,
                      color: "var(--accent)",
                      border: sideButtonBorder,
                    }}
                  >
                    <PhoneCall size={16} />
                  </button>
                </div>

                <div className="relative h-full min-h-[300px] flex items-center justify-center">
                  <div
                    className="absolute inset-x-[12%] top-[14%] h-[38%] pointer-events-none"
                    style={{
                      background: rightAtmosphere,
                      filter: "blur(10px)",
                    }}
                  />

                  <div
                    className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 w-72 h-24 rounded-full"
                    style={{
                      background: underGlow,
                      filter: "blur(18px)",
                    }}
                  />

                  <div
                    className="absolute left-1/2 top-[67%] -translate-x-1/2 -translate-y-1/2 rounded-[30px] flex items-center justify-center"
                    style={{
                      width: "230px",
                      height: "52px",
                      background: platformBackground,
                      boxShadow: platformShadow,
                    }}
                  >
                    <div className="text-center leading-none">
                      <div
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: "0.8rem",
                          fontWeight: 900,
                          letterSpacing: "0.22em",
                          color: platformText,
                        }}
                      >
                        METKAEROX
                      </div>
                      <div
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.5rem",
                          letterSpacing: "0.32em",
                          color: platformSubtext,
                          marginTop: "4px",
                        }}
                      >
                        SYSTEMS
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative w-full h-full"
                  >
                    <div
                      className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: "min(86%, 435px)",
                        aspectRatio: "1 / 1",
                      }}
                    >
                        {[
                        { inset: "0%", border: ringBorder, duration: "26s", reverse: false },
                        { inset: "8%", border: tiltedRingBorder, duration: "20s", reverse: true },
                        { inset: "16%", border: orbitRing, duration: "15s", reverse: false },
                      ].map((ring, index) => (
                        <div
                          key={index}
                          className="absolute rounded-full"
                          style={{
                            inset: ring.inset,
                            border: `1px solid ${ring.border}`,
                            animation: `${ring.reverse ? "ringSpinReverse" : "ringSpin"} ${ring.duration} linear infinite`,
                          }}
                        />
                      ))}

                      <div
                        className="absolute left-[7%] right-[7%] top-1/2 h-[54%] -translate-y-1/2 rounded-full"
                        style={{
                          border: `1px solid ${ringBorder}`,
                          transform: "translateY(-50%) rotate(16deg)",
                        }}
                      />

                      <div
                        className="absolute left-[9%] right-[9%] top-1/2 h-[50%] -translate-y-1/2 rounded-full"
                        style={{
                          border: `1px solid ${tiltedRingBorder}`,
                          transform: "translateY(-50%) rotate(-18deg)",
                        }}
                      />

                      {[
                        { size: 100, top: "7%", left: "11%" },
                        { size: 18, top: "12%", left: "73%" },
                        { size: 14, top: "68%", left: "83%" },
                      ].map((glow, index) => (
                        <div
                          key={index}
                          className="absolute rounded-full"
                          style={{
                            width: glow.size,
                            height: glow.size,
                            top: glow.top,
                            left: glow.left,
                            background: glowBall,
                            filter: glow.size > 40 ? "blur(1px)" : "none",
                            opacity: glow.size > 40 ? 0.95 : 1,
                          }}
                        />
                      ))}

                      <div
                        ref={coreRef}
                        className="absolute inset-[17%] rounded-full overflow-hidden"
                        style={{
                          background: orbBackground,
                          boxShadow: orbShadow,
                          willChange: "transform",
                        }}
                      >
                        <div
                          className="absolute inset-[12%] rounded-full"
                          style={{
                            background: orbTexture,
                            opacity: 0.72,
                            animation: "textureSpin 18s linear infinite",
                          }}
                        />

                        <div
                          className="absolute inset-[6%] rounded-full"
                          style={{
                            border: orbInnerBorder,
                          }}
                        />
                      </div>

                      <div
                        className="absolute inset-[14%] rounded-full"
                        style={{
                          border: orbOuterBorder,
                        }}
                      />

                      {[
                        { size: 14, inset: "0%", duration: "12s", delay: "0s", angle: "12deg", reverse: false },
                        { size: 12, inset: "0%", duration: "16s", delay: "-3s", angle: "138deg", reverse: true },
                        { size: 10, inset: "8%", duration: "10s", delay: "-1s", angle: "262deg", reverse: false },
                        { size: 16, inset: "0%", duration: "18s", delay: "-7s", angle: "214deg", reverse: false },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="absolute rounded-full"
                          style={{
                            inset: item.inset,
                            transform: `rotate(${item.angle})`,
                            animation: `${item.reverse ? "ringSpinReverse" : "ringSpin"} ${item.duration} linear infinite`,
                            animationDelay: item.delay,
                          }}
                        >
                          <span
                            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{
                              width: item.size,
                              height: item.size,
                              background: smallOrb,
                              boxShadow: smallOrbShadow,
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div
                      className="absolute top-[13%] right-[8%] w-24 rounded-2xl px-3 py-3"
                      style={{
                        backgroundColor: infoCardBackground,
                        border: infoCardBorder,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.52rem",
                          letterSpacing: "0.14em",
                          color: infoLabelColor,
                        }}
                      >
                        RANGE
                      </div>
                      <div
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: "0.84rem",
                          color: infoRangeColor,
                          marginTop: "6px",
                        }}
                      >
                        100 KM
                      </div>
                    </div>

                    <div
                      className="absolute bottom-[34%] right-[8%] w-28 rounded-2xl px-3 py-3"
                      style={{
                        backgroundColor: infoCardBackground,
                        border: infoCardBorder,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.52rem",
                          letterSpacing: "0.14em",
                          color: infoLabelColor,
                        }}
                      >
                        ENCRYPTED
                      </div>
                      <div
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: "0.84rem",
                          color: "#ffffff",
                          marginTop: "6px",
                        }}
                      >
                        LIVE FEED
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-1/2 right-6 -translate-y-1/2 hidden md:block"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(3.5rem, 9vw, 6rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.08em",
                    color: sideWordColor,
                    writingMode: "vertical-rl",
                    transform: "translateY(-50%) rotate(180deg)",
                  }}
                >
                  METKAEROX
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.64rem",
              letterSpacing: "0.26em",
              color: scrollLabelColor,
            }}
          >
            SCROLL
          </span>
          <ChevronDown size={18} style={{ color: headingAccent }} />
        </button>
      </div>

      <style jsx>{`
        @keyframes ringSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ringSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes textureSpin {
          from { transform: rotate(0deg) scale(1.02); }
          to { transform: rotate(360deg) scale(1.02); }
        }
        @keyframes orbitFloat {
          0% {
            transform: translate(calc(-50% + var(--orbit-x)), calc(-50% + var(--orbit-y)));
          }
          25% {
            transform: translate(calc(-50% + var(--orbit-y)), calc(-50% - var(--orbit-x)));
          }
          50% {
            transform: translate(calc(-50% - var(--orbit-x)), calc(-50% - var(--orbit-y)));
          }
          75% {
            transform: translate(calc(-50% - var(--orbit-y)), calc(-50% + var(--orbit-x)));
          }
          100% {
            transform: translate(calc(-50% + var(--orbit-x)), calc(-50% + var(--orbit-y)));
          }
        }
      `}</style>
    </section>
  );
}
