"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Card from "@/components/shared/Card";
import Section from "@/components/shared/Section";

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
  const active = milestones[activeIndex];

  const timelineItems = useMemo(() => {
    return milestones.map((item, index) => ({
      ...item,
      active: index === activeIndex,
    }));
  }, [activeIndex]);

  return (
    <Section id="timeline" className="pt-12">
      <div className="mb-12 text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--accent)]">
          Evolution
        </p>
        <h2 className="mt-4 text-3xl font-black uppercase text-[var(--text)] sm:text-5xl">
          System Milestones
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--text-muted)]">
          The milestones that shaped the Metkaerox autonomous defense and
          industrial UAV ecosystem.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.7fr)]">
        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-[var(--border)] sm:block" />
          <div className="grid gap-4">
            {timelineItems.map((item, index) => (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group text-left"
                aria-pressed={item.active}
              >
                <Card
                  className={`relative p-5 transition-[border-color,background-color,transform] duration-200 group-hover:-translate-y-0.5 ${
                    item.active
                      ? "border-[rgba(var(--accent-rgb),0.42)] bg-[rgba(var(--accent-rgb),0.08)]"
                      : ""
                  }`}
                >
                  <span className="absolute left-5 top-5 hidden h-3 w-3 -translate-x-[1.625rem] rounded-full border border-[var(--accent)] bg-[var(--bg)] sm:block" />
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                    {item.year}
                  </p>
                  <h3 className="mt-2 text-lg font-black uppercase text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </Card>
              </button>
            ))}
          </div>
        </div>

        <Card className="sticky top-28 overflow-hidden">
          <div className="relative aspect-[4/3]">
            <Image
              src={active.image}
              alt={active.title}
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/72">
                {active.year}
              </p>
              <h3 className="mt-2 text-2xl font-black uppercase">{active.title}</h3>
            </div>
          </div>
          <p className="p-6 text-sm leading-7 text-[var(--text-muted)]">
            {active.description}
          </p>
        </Card>
      </div>
    </Section>
  );
}
