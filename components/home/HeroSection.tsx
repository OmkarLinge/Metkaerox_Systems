"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { useState } from "react";

const heroSlides = [
  {
    id: "field",
    eyebrow: "/// Next-gen tactical platforms",
    title: "Building",
    titleLineTwo: "Future-ready drones",
    accent: "For your mission.",
    body: "Advanced surveillance, payload, agriculture, and emergency-response platforms engineered for cleaner mission outcomes.",
    background: "/products/flysurveilx.jpg",
    backgroundAlt: "",
    backgroundPosition: "object-[center_42%]",
    cardImage: "/products/flyastros.jpg",
    cardAlt: "Metkaerox payload drone platform",
    cardEyebrow: "Payload platform",
    cardTitle: "Mission-ready UAV platforms",
  },
  {
    id: "mission",
    eyebrow: "/// Next-gen tactical platforms",
    title: "Building",
    titleLineTwo: "Future-ready drones",
    accent: "For your mission.",
    body: "Advanced surveillance, payload, agriculture, and emergency-response platforms engineered for cleaner mission outcomes.",
    background: "/home/mission-hero.jpg",
    backgroundAlt: "",
    backgroundPosition: "object-center",
    cardImage: "/products/flysurveilx.jpg",
    cardAlt: "Metkaerox surveillance drone platform",
    cardEyebrow: "Surveillance platform",
    cardTitle: "Precision support for critical teams",
  },
];

export default function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = heroSlides[activeSlideIndex];

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[var(--bg)]"
    >
      <Image
        key={activeSlide.id}
        src={activeSlide.background}
        alt={activeSlide.backgroundAlt}
        fill
        priority={activeSlideIndex === 0}
        quality={74}
        sizes="100vw"
        className={`absolute inset-0 z-0 object-cover ${activeSlide.backgroundPosition}`}
      />

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,8,12,0.82)_0%,rgba(5,8,12,0.48)_46%,rgba(5,8,12,0.18)_100%)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_74%_34%,rgba(var(--accent-rgb),0.12),transparent_42%)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:160px_160px] opacity-60" />

      <div className="relative z-10 w-full px-6 pb-12 pt-[calc(var(--nav-offset)+1.5rem)] sm:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto grid min-h-[calc(100svh-var(--nav-offset)-2rem)] max-w-[1380px] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.78fr)]">
          <div className="flex max-w-4xl flex-col justify-center py-8 lg:pr-4">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.24em] text-[var(--accent)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              {activeSlide.eyebrow}
            </p>
            <h1 className="text-[clamp(2.8rem,5.5vw,4.7rem)] font-black uppercase leading-[0.95] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
              {activeSlide.title}
              <br />
              {activeSlide.titleLineTwo}
              <br />
              <span className="mt-2 block text-[var(--accent)]">
                {activeSlide.accent}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {activeSlide.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="btn-interaction inline-flex items-center gap-3 rounded-md bg-[linear-gradient(135deg,var(--accent),var(--highlight))] px-6 py-4 text-sm font-black uppercase tracking-[0.15em] text-[var(--button-contrast)] shadow-[0_10px_24px_rgba(var(--accent-rgb),0.15)]"
              >
                Explore Fleet
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/contact"
                className="btn-interaction inline-flex items-center gap-3 rounded-md border border-[var(--border)] bg-transparent px-6 py-4 text-sm font-black uppercase tracking-[0.15em] text-white"
              >
                <PhoneCall size={16} />
                Contact Sales
              </Link>
            </div>

            <div
              className="mt-8 flex items-center gap-3"
              aria-label="Homepage background slides"
            >
              {heroSlides.map((slide, index) => {
                const isActive = index === activeSlideIndex;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Show ${slide.cardTitle} slide`}
                    aria-pressed={isActive}
                    onClick={() => setActiveSlideIndex(index)}
                    className={`h-3 rounded-full border transition-all duration-200 ${
                      isActive
                        ? "w-9 border-[var(--accent)] bg-[var(--accent)]"
                        : "w-3 border-white/45 bg-white/35 hover:border-[var(--accent)] hover:bg-[var(--accent)]"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/12 bg-black/28 shadow-[0_34px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm">
              <Image
                key={`${activeSlide.id}-card`}
                src={activeSlide.cardImage}
                alt={activeSlide.cardAlt}
                fill
                quality={70}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--accent)]">
                  {activeSlide.cardEyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-white">
                  {activeSlide.cardTitle}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
