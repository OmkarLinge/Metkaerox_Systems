"use client";

import { useEffect, useState } from "react";

const orbitDots = [
  { size: 7, angle: 30, duration: 16, radius: 132, delay: 0 },
  { size: 9, angle: 206, duration: 19, radius: 132, delay: 0.7 },
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 60);

    const phaseTimer1 = setTimeout(() => setPhase(1), 220);
    const phaseTimer2 = setTimeout(() => setPhase(2), 820);
    const phaseTimer3 = setTimeout(() => setPhase(3), 1320);

    return () => {
      clearInterval(interval);
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      clearTimeout(phaseTimer3);
    };
  }, []);

  const clampedProgress = Math.min(100, Math.round(progress));

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--surface-contrast)", zIndex: 9999 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--accent-rgb), 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-rgb), 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "58px 58px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 14%, rgba(var(--accent-rgb),0.08), transparent 34%), radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb),0.05), transparent 55%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border"
            style={{
              width: `${ring * 160}px`,
              height: `${ring * 160}px`,
              borderColor: "rgba(var(--accent-rgb),0.08)",
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "scale(1)" : "scale(0.88)",
              transition: "opacity 0.55s ease, transform 0.7s ease",
              animation: `spin ${ring * 12}s linear infinite ${ring % 2 === 0 ? "reverse" : ""}`,
            }}
          />
        ))}

        {orbitDots.map((dot, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${dot.radius * 2}px`,
              height: `${dot.radius * 2}px`,
              marginLeft: `${-dot.radius}px`,
              marginTop: `${-dot.radius}px`,
              animation: `spin ${dot.duration}s linear infinite`,
              animationDelay: `${dot.delay}s`,
              opacity: phase >= 2 ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <span
              className="absolute rounded-full"
              style={{
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                left: "50%",
                top: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(var(--accent-rgb),0.55) 55%, rgba(var(--accent-rgb),0.14) 100%)",
                boxShadow: "0 0 10px rgba(var(--accent-rgb),0.18)",
                transform: `rotate(${dot.angle}deg) translateY(-${dot.radius}px)`,
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute left-1/2 top-1/2 rounded-full pointer-events-none blur-3xl"
        style={{
          width: phase >= 2 ? "280px" : "200px",
          height: phase >= 2 ? "280px" : "200px",
          background:
            "radial-gradient(circle, rgba(var(--accent-rgb),0.14) 0%, rgba(var(--accent-rgb),0.04) 36%, rgba(var(--accent-rgb),0) 72%)",
          transform: "translate(-50%, -50%)",
          transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center px-6"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "min(92vw, 1120px)",
            minHeight: "180px",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: phase >= 2 ? "72%" : "26%",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(var(--accent-rgb),0), rgba(var(--accent-rgb),0.28), rgba(var(--accent-rgb),0))",
              transform: "translate(-50%, -50%)",
              opacity: phase >= 2 ? 1 : 0.2,
              transition: "all 0.75s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />

          <div
            className="absolute inset-y-0"
            style={{
              left: phase >= 2 ? "100%" : "0%",
              width: "18%",
              background:
                "linear-gradient(90deg, rgba(var(--accent-rgb),0), rgba(255,255,255,0.1), rgba(var(--accent-rgb),0))",
              filter: "blur(8px)",
              opacity: phase >= 2 ? 0.9 : 0,
              transition: "left 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.35s ease",
            }}
          />

          <div className="relative text-center">
            <h1
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(2.2rem, 6vw, 5.8rem)",
                fontWeight: 900,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
                textShadow: "0 0 16px rgba(var(--accent-rgb),0.12)",
                transform: phase >= 2 ? "scale(1)" : "scale(0.94)",
                opacity: phase >= 2 ? 1 : 0.75,
                transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s ease",
              }}
            >
              METKAEROX SYSTEMS
            </h1>

            <p
              className="mt-4"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "rgba(var(--accent-rgb),0.58)",
                opacity: phase >= 3 ? 1 : 0,
                transform: phase >= 3 ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.55s ease",
              }}
            >
              Autonomous Aerospace Systems
            </p>
          </div>
        </div>

        <div
          className="mt-5 rounded-full"
          style={{
            width: phase >= 3 ? "92px" : "54px",
            height: "3px",
            background:
              "linear-gradient(90deg, rgba(var(--accent-rgb),0), rgba(var(--accent-rgb),0.52), rgba(var(--accent-rgb),0))",
            boxShadow: "0 0 10px rgba(var(--accent-rgb),0.14)",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-72"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 0.5s ease 0.35s",
        }}
      >
        <div className="flex justify-between mb-2">
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(var(--accent-rgb),0.5)", fontFamily: "'Share Tech Mono', monospace" }}
          >
            INITIALIZING SYSTEMS
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: "var(--accent)", fontFamily: "'Share Tech Mono', monospace" }}
          >
            {clampedProgress}%
          </span>
        </div>

        <div
          className="h-0.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(var(--accent-rgb),0.15)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${clampedProgress}%`,
              background: "linear-gradient(90deg, var(--accent), var(--highlight))",
              boxShadow: "0 0 10px rgba(var(--accent-rgb),0.5)",
            }}
          />
        </div>

        <div className="mt-3 text-center">
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(var(--accent-rgb),0.42)", fontFamily: "'Share Tech Mono', monospace" }}
          >
            {progress < 30
              ? "LOADING COMMAND LAYERS..."
              : progress < 62
              ? "ALIGNING AEROSPACE INTERFACE..."
              : progress < 88
              ? "ESTABLISHING SECURE SYSTEM GRID..."
              : "SYSTEMS READY"}
          </span>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `,
        }}
      />
    </div>
  );
}
