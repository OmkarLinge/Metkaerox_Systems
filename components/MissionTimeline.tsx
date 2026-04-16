"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const milestones = [
  {
    year: "2019",
    title: "Company Founded",
    description:
      "Metkaerox Systems established its core R&D cell focused on defense-grade autonomous systems.",
    image: "/products/flysurveilx.jpg",
  },
  {
    year: "2021",
    title: "First Surveillance Drone Prototype",
    description:
      "Prototype airframe validated for long-range ISR with encrypted telemetry.",
    image: "/products/flyastros.jpg",
  },
  {
    year: "2022",
    title: "AI Tracking System Integrated",
    description:
      "Vision-based target tracking deployed for real-time situational awareness.",
    image: "/products/flyirax.jpg",
  },
  {
    year: "2023",
    title: "Industrial Drone Deployment",
    description:
      "Operational missions launched across critical industrial and infrastructure zones.",
    image: "/products/flycleon.jpg",
  },
  {
    year: "2024",
    title: "Autonomous Navigation System",
    description:
      "Resilient navigation stack delivered for contested, GPS-denied environments.",
    image: "/products/flygripper.jpg",
  },
  {
    year: "2025",
    title: "Defense Collaboration Projects",
    description:
      "Joint programs initiated for defense-ready UAV and autonomy payloads.",
    image: "/products/flyspyder.jpg",
  },
  {
    year: "2026",
    title: "Advanced UAV Ecosystem Launch",
    description:
      "Full-spectrum UAV ecosystem released with mission-ready analytics and control.",
    image: "/products/flyvarun.png",
  },
];

export default function MissionTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const active = milestones[activeIndex];
  const stepDeg = 360 / milestones.length;

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setRotation(-index * stepDeg);
    if (!isDesktop) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const arcNodes = useMemo(() => {
    return milestones.map((item, index) => {
      const angle = (index * 2 * Math.PI) / milestones.length - Math.PI / 2;
      const x = 50 + Math.cos(angle) * 42;
      const y = 50 + Math.sin(angle) * 42;
      return { ...item, x, y };
    });
  }, []);

  return (
    <motion.section
      id="timeline"
      className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mission-bg" aria-hidden="true" />
      <div className="mission-grid" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 900,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            SYSTEM <span style={{ color: "var(--accent)" }}>EVOLUTION</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "var(--text-muted)",
              maxWidth: "640px",
              margin: "12px auto 0",
              lineHeight: 1.7,
            }}
          >
            A tactical view of the milestones that shaped the Metkaerox autonomous defense ecosystem.
          </p>
        </div>

        <div className="hidden sm:block relative mission-circle-stage">
          <div className="mission-radar" aria-hidden="true">
            <div className="mission-radar-sweep" />
          </div>
          <div className="mission-circle-wrap">
            <motion.svg
              className="mission-circle"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(0, 191, 255, 0.35)"
                strokeWidth="0.9"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(var(--accent-rgb), 0.25)"
                strokeWidth="0.5"
                opacity="0.6"
              />
            </motion.svg>

            <div
              className="mission-circle-nodes"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.75s cubic-bezier(0.22, 1.08, 0.36, 1)",
                ["--timeline-rotation" as string]: `${rotation}deg`,
                willChange: "transform",
              }}
              onTransitionEnd={(event) => {
                if (event.propertyName === "transform") {
                  setActiveIndex(selectedIndex);
                }
              }}
            >
              {arcNodes.map((item, index) => {
                const isActive = index === selectedIndex;
                return (
                  <motion.button
                    key={item.year}
                    onClick={() => handleSelect(index)}
                    className={`mission-node ${isActive ? "is-active" : ""}`}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.18 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    aria-label={`Select ${item.year}`}
                  >
                    <span className="mission-node-year">
                      {item.year}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mission-card mission-card-circle">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.year}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="mission-card-header">
                    <span className="mission-card-year">{active.year}</span>
                    <h3 className="mission-card-title">{active.title}</h3>
                  </div>
                  <p className="mission-card-body">{active.description}</p>
                  {active.image ? (
                    <div className="mission-card-image">
                      <Image
                        src={active.image}
                        alt={active.title}
                        fill
                        sizes="(min-width: 1024px) 420px, 80vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="sm:hidden">
          <div className="flex gap-3 overflow-x-auto pb-3 mission-scroll">
            {milestones.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.year}
                  onClick={() => handleSelect(index)}
                  className={`mission-mobile-node ${isActive ? "is-active" : ""}`}
                >
                  <span className="mission-mobile-year">{item.year}</span>
                  <span className="mission-mobile-title">{item.title}</span>
                </button>
              );
            })}
          </div>

          <div className="mission-card mission-card-mobile">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.year}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="mission-card-header">
                  <span className="mission-card-year">{active.year}</span>
                  <h3 className="mission-card-title">{active.title}</h3>
                </div>
                <p className="mission-card-body">{active.description}</p>
                {active.image ? (
                  <div className="mission-card-image">
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      sizes="80vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
