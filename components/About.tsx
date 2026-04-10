"use client";

import { useEffect, useRef, useState } from "react";
import { Target, Eye, Award, CheckCircle } from "lucide-react";
import { companyInfo } from "@/data/company";
import dynamic from "next/dynamic";

const DroneModel = dynamic(() => import("./DroneModel"), { ssr: false });


function useInView(threshold = 0.2) {
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

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref}>
      <span style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 900,
        background: "linear-gradient(135deg, var(--accent), var(--highlight))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {count.toLocaleString()}{suffix}
      </span>
    </div>
  );
}

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.1);

  const certifications = [
    { icon: <Award size={16} />, text: "DGCA Certified UAV Operator" },
    { icon: <Award size={16} />, text: "ISO 9001:2015 Quality Management" },
    { icon: <Award size={16} />, text: "Make in India Certified" },
    { icon: <Award size={16} />, text: "Defence R&D Partner" },
  ];

  return (
    <>
      <section
        id="about"
        className={`relative py-10 lg:py-14 overflow-hidden section-reveal ${inView ? "visible" : ""}`}
        style={{ backgroundColor: "var(--bg)" }}
        ref={sectionRef}
      >
      {/* Background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(var(--highlight-rgb),0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
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
            // WHO WE ARE
          </p>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ display: "block" }}>ABOUT</span>
            <span style={{ color: "var(--accent)", display: "block" }}>
              METKAEROX SYSTEMS
            </span>
          </h2>
          <div
            className="mx-auto mt-4"
            style={{
              height: "1px",
              width: "80px",
              background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            }}
          />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12 lg:mb-14">

          {/* Left: Drone illustration / visual */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-secondary)",
                minHeight: "430px",
                boxShadow: "0 14px 36px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="absolute inset-x-[10%] bottom-[14%] h-14 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(var(--accent-rgb),0.12) 0%, rgba(var(--accent-rgb),0) 72%)",
                  filter: "blur(14px)",
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 38%, rgba(var(--accent-rgb),0.05) 0%, transparent 58%)",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center p-3">
                <div
                  className="relative w-full h-full"
                  style={{
                    animation: "hoverDrift 4.8s ease-in-out infinite",
                  }}
                >
                  <DroneModel
                    modelPath="/inside_drone.glb"
                    scale={8.4}
                    position={[0, -0.08, 0]}
                    rotationSpeed={0.0015}
                    floatSpeed={0.9}
                    rotationIntensity={0.2}
                    floatIntensity={0.25}
                    cameraPosition={[0, 0.02, 1.95]}
                    fov={36}
                    enableControls
                    enableZoom
                    minDistance={0.9}
                    maxDistance={3.6}
                    zoomSpeed={1.1}
                    controlsTarget={[0, 0, 0]}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={(2 * Math.PI) / 3}
                    enablePropellerSpin
                    propellerSpeed={0.6}
                    propellerAxis="z"
                    ambientIntensity={0.45}
                    keyLightIntensity={0.8}
                  />
                </div>
              </div>

              {/* Scan line effect */}
              <div
                className="absolute left-0 right-0 h-px pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                  opacity: 0.16,
                  animation: "scan 4s ease-in-out infinite",
                }}
              />

              {/* Corner marks */}
              {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-5 h-5`}
                  style={{
                    borderTop: i < 2 ? "2px solid var(--accent)" : "none",
                    borderBottom: i >= 2 ? "2px solid var(--accent)" : "none",
                    borderLeft: i % 2 === 0 ? "2px solid var(--accent)" : "none",
                    borderRight: i % 2 === 1 ? "2px solid var(--accent)" : "none",
                    opacity: 0.28,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Text content */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            {/* Mission */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Target size={20} style={{ color: "var(--accent)" }} />
                <h3
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    letterSpacing: "0.1em",
                  }}
                >
                  OUR MISSION
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                  fontWeight: 400,
                }}
              >
                {companyInfo.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={20} style={{ color: "var(--highlight)" }} />
                <h3
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--highlight)",
                    letterSpacing: "0.1em",
                  }}
                >
                  OUR VISION
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                  fontWeight: 400,
                }}
              >
                {companyInfo.vision}
              </p>
            </div>

            {/* Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg"
                  style={{
                    border: "1px solid var(--border)",
                    backgroundColor: "rgba(var(--accent-rgb),0.03)",
                  }}
                >
                  <CheckCircle size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {cert.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.6s",
          }}
        >
          {companyInfo.stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-xl"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-secondary)",
                backdropFilter: "blur(8px)",
              }}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  marginTop: "8px",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes hoverDrift {
          0%, 100% { transform: translate3d(0, 10px, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      </section>
    </>
  );
}
