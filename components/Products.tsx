"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { products, type Product } from "@/data/company";

function getKeySpecs(product: Product) {
  return product.specs.slice(0, 3);
}

/* ── tiny animated counter ── */
function AnimatedValue({ value }: { value: string }) {
  const numMatch = value.match(/^([\d.,]+)/);
  const [displayed, setDisplayed] = useState(0);
  const num = numMatch ? parseFloat(numMatch[1].replace(/,/g, "")) : 0;
  const suffix = numMatch ? value.slice(numMatch[1].length) : value;

  useEffect(() => {
    if (!num) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(num * ease));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [num]);

  if (!num) return <>{value}</>;
  return (
    <>
      {displayed}
      {suffix}
    </>
  );
}

/* ── floating particles for each product ── */
function ProductParticles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            background: color,
            opacity: 0.15 + Math.random() * 0.2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20 - Math.random() * 30, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: 5 + Math.random() * 7,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── auto-advance progress bar ── */
const AUTO_ADVANCE_MS = 6000;

function ProgressRing({
  running,
  color,
  onComplete,
}: {
  running: boolean;
  color: string;
  onComplete: () => void;
}) {
  const elapsed = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) {
      elapsed.current = 0;
      if (barRef.current) barRef.current.style.width = "0%";
      return;
    }
    let prev = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const dt = now - prev;
      prev = now;
      elapsed.current += dt;
      const pct = Math.min(elapsed.current / AUTO_ADVANCE_MS, 1);
      if (barRef.current) barRef.current.style.width = `${pct * 100}%`;
      if (pct >= 1) {
        onComplete();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, onComplete]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden"
      style={{ backgroundColor: "rgba(var(--highlight-rgb),0.06)" }}
    >
      <div
        ref={barRef}
        className="h-full transition-none"
        style={{
          background: `linear-gradient(90deg, ${color}, var(--accent))`,
          width: "0%",
        }}
      />
    </div>
  );
}

/* ── main component ── */
export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const product = products[activeIndex];

  /* 3D tilt mouse tracking */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduceMotion) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  /* navigation helpers */
  const go = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : index < activeIndex ? -1 : 0);
      setActiveIndex(index);
      setHasInteracted(true);
    },
    [activeIndex]
  );

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((p) => (p - 1 + products.length) % products.length);
    setHasInteracted(true);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((p) => (p + 1) % products.length);
    setHasInteracted(true);
  }, []);

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  /* auto advance */
  const autoNext = useCallback(() => {
    if (!isHovered) {
      setDirection(1);
      setActiveIndex((p) => (p + 1) % products.length);
    }
  }, [isHovered]);

  const keySpecs = getKeySpecs(product);

  /* variants */
  const cardVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.92,
      rotateY: d > 0 ? 8 : -8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (d: number) => ({
      x: d > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.92,
      rotateY: d > 0 ? -8 : 8,
    }),
  };

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.07, delayChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "80px",
        paddingBottom: "40px",
      }}
    >
      {/* subtle grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="grid-bg h-full w-full" />
      </div>

      {/* top ambient glow — uses the product's color */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id + "-glow"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="h-72 w-[90vw] max-w-5xl rounded-full blur-[100px]"
            style={{
              background: `radial-gradient(circle, ${product.color}22 0%, rgba(var(--accent-rgb),0.04) 48%, transparent 72%)`,
            }}
          />
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* ── Section Heading ── */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.45 }}
            className="text-4xl font-black uppercase tracking-tighter md:text-5xl"
            style={{
              color: "var(--highlight)",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            Our <span style={{ color: "var(--accent)" }}>Products</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Browse our complete lineup of advanced drone systems built for
            defense, agriculture, industry, and beyond.
          </motion.p>
        </div>

        {/* ── Product Showcase Card ── */}
        <div style={{ perspective: "1200px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={product.id}
              ref={cardRef}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={
                shouldReduceMotion
                  ? { duration: 0.15 }
                  : {
                      type: "spring",
                      stiffness: 260,
                      damping: 28,
                      mass: 0.9,
                    }
              }
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: shouldReduceMotion ? 0 : rotateX,
                rotateY: shouldReduceMotion ? 0 : rotateY,
                transformStyle: "preserve-3d",
              }}
              className="product-showcase-card relative mx-auto flex flex-col lg:flex-row overflow-hidden"
            >
              {/* product particles */}
              <ProductParticles color={product.color} />

              {/* animated border glow */}
              <div
                className="absolute inset-0 rounded-[1.2rem] pointer-events-none z-[1] transition-opacity duration-500"
                style={{
                  boxShadow: isHovered
                    ? `0 0 40px ${product.color}30, inset 0 0 40px ${product.color}08`
                    : "none",
                  border: `1px solid ${isHovered ? product.color + "40" : "var(--border)"}`,
                  borderRadius: "1.2rem",
                  opacity: 1,
                }}
              />

              {/* ── Image Side ── */}
              <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width: "100%",
                  maxWidth: "520px",
                  aspectRatio: "1 / 1",
                }}
              >
                {/* color wash behind image */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}12 0%, rgba(var(--highlight-rgb),0.03) 50%, ${product.color}08 100%)`,
                  }}
                />

                <motion.div
                  className="relative w-full h-full"
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover"
                    style={{
                      objectPosition: product.imagePosition ?? "center center",
                    }}
                    priority
                  />
                </motion.div>

                {/* gradient overlay on image */}
                <div
                  className="absolute inset-0 z-[2]"
                  style={{
                    background: `linear-gradient(180deg, transparent 50%, ${product.color}18 100%)`,
                  }}
                />

                {/* category badge */}
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="absolute top-5 left-5 z-10 rounded-full px-4 py-2 text-[0.6rem] font-black uppercase tracking-[0.18em]"
                  style={{
                    backgroundColor: `${product.color}cc`,
                    color: "#fff",
                    backdropFilter: "blur(12px)",
                    boxShadow: `0 4px 20px ${product.color}50`,
                  }}
                >
                  {product.category}
                </motion.span>

                {/* product icon */}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
                  className="absolute bottom-5 left-5 z-10 text-3xl"
                  style={{
                    filter: `drop-shadow(0 2px 8px ${product.color}80)`,
                  }}
                >
                  {product.icon}
                </motion.span>
              </div>

              {/* ── Info Panel ── */}
              <motion.div
                className="relative flex flex-1 flex-col justify-center p-7 sm:p-9 lg:p-12 z-[2]"
                variants={stagger}
                initial="hidden"
                animate="show"
              >
                {/* tagline */}
                <motion.span
                  variants={fadeUp}
                  className="text-[0.6rem] font-black uppercase tracking-[0.3em]"
                  style={{ color: product.color }}
                >
                  {product.tagline}
                </motion.span>

                {/* name */}
                <motion.h3
                  variants={fadeUp}
                  className="mt-3 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]"
                  style={{
                    color: "var(--highlight)",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {product.name}
                </motion.h3>

                {/* divider line with product color */}
                <motion.div
                  variants={fadeUp}
                  className="mt-4 h-[2px] w-16 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${product.color}, transparent)`,
                  }}
                />

                {/* description */}
                <motion.p
                  variants={fadeUp}
                  className="mt-4 text-sm leading-relaxed sm:text-base"
                  style={{ color: "var(--text-muted)" }}
                >
                  {product.description}
                </motion.p>

                {/* specs with animated values */}
                <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
                  {keySpecs.map((spec) => (
                    <div
                      key={`${product.id}-${spec.label}`}
                      className="relative rounded-xl px-4 py-2.5 overflow-hidden"
                      style={{
                        backgroundColor: `${product.color}10`,
                        border: `1px solid ${product.color}25`,
                      }}
                    >
                      <span
                        className="block text-[0.55rem] font-bold uppercase tracking-[0.18em] mb-0.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {spec.label}
                      </span>
                      <span
                        className="block text-sm font-black"
                        style={{
                          color: product.color,
                          fontFamily: "'Share Tech Mono', monospace",
                        }}
                      >
                        <AnimatedValue value={spec.value} />
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA button */}
                <motion.div variants={fadeUp}>
                  <Link
                    href={`/products/${product.id}`}
                    className="group mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3 text-[0.7rem] font-black uppercase tracking-[0.2em] transition-all duration-300"
                    style={{
                      backgroundColor: `${product.color}15`,
                      color: product.color,
                      border: `1px solid ${product.color}30`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = product.color;
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.boxShadow = `0 8px 30px ${product.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${product.color}15`;
                      e.currentTarget.style.color = product.color;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    View Product
                    <ChevronRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </motion.div>

              {/* auto-advance progress bar */}
              <ProgressRing
                running={!isHovered && !hasInteracted}
                color={product.color}
                onComplete={autoNext}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation ── */}
        <div className="mt-8 flex flex-col items-center gap-5">
          {/* product name strip */}
          <div className="hidden sm:flex items-center gap-1 rounded-full px-2 py-1"
            style={{ backgroundColor: "rgba(var(--highlight-rgb),0.04)" }}
          >
            {products.map((p, index) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Show ${p.name}`}
                onClick={() => go(index)}
                className="relative rounded-full px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.12em] transition-all duration-300"
                style={{
                  color:
                    index === activeIndex
                      ? "#fff"
                      : "var(--text-muted)",
                }}
              >
                {index === activeIndex && (
                  <motion.div
                    layoutId="product-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: product.color }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{p.name}</span>
              </button>
            ))}
          </div>

          {/* mobile dots */}
          <div className="flex sm:hidden items-center gap-2">
            {products.map((p, index) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Show ${p.name}`}
                onClick={() => go(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-8" : "w-2"
                }`}
                style={{
                  backgroundColor:
                    index === activeIndex
                      ? product.color
                      : "rgba(var(--highlight-rgb),0.18)",
                }}
              />
            ))}
          </div>

          {/* arrow buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="group flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--highlight)",
                color: "var(--button-contrast)",
                boxShadow: `0 4px 16px rgba(var(--highlight-rgb),0.2)`,
              }}
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
            </button>

            {/* counter */}
            <span
              className="text-xs font-bold tracking-wider"
              style={{
                color: "var(--text-muted)",
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(products.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={next}
              className="group flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--highlight)",
                color: "var(--button-contrast)",
                boxShadow: `0 4px 16px rgba(var(--highlight-rgb),0.2)`,
              }}
            >
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
