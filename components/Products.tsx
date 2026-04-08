"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { products, type Product } from "@/data/company";
import { scrollToSection } from "@/lib/utils";

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

function ProductCard({
  product,
  index,
  inView,
}: {
  product: Product;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.id}`}
      className="relative cursor-pointer group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s ease ${index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-xl overflow-hidden p-6 h-full"
        style={{
          border: hovered ? "1px solid rgba(var(--accent-rgb),0.18)" : "1px solid var(--border)",
          backgroundColor: "var(--card-bg)",
          backdropFilter: "blur(8px)",
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered ? "0 18px 36px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.36), transparent)",
            opacity: hovered ? 1 : 0.45,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              backgroundColor: "rgba(var(--accent-rgb),0.03)",
            }}
          >
            {product.category.toUpperCase()}
          </span>
          <span style={{ fontSize: "1.5rem" }}>{product.icon}</span>
        </div>

        {/* Drone visual */}
        <div
          className="relative mb-4 rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            height: "148px",
            background: "linear-gradient(180deg, rgba(var(--accent-rgb),0.03) 0%, rgba(var(--accent-rgb),0.01) 100%)",
            border: "1px solid rgba(var(--accent-rgb),0.08)",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            style={{
              objectFit: "cover",
              objectPosition: product.imagePosition,
              transform: hovered ? "scale(1.05)" : "scale(1)",
              filter: hovered ? "saturate(1)" : "saturate(0.92)",
              transition: "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.18) 100%)",
            }}
          />
        </div>

        {/* Product name */}
        <h3
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "6px",
            transition: "color 0.3s ease",
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
            marginBottom: "10px",
          }}
        >
          {product.tagline}
        </p>

        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            color: "var(--text-muted)",
            marginBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Quick specs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.specs.slice(0, 3).map((spec, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded text-xs"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                backgroundColor: "rgba(var(--accent-rgb),0.03)",
              }}
            >
              {spec.label}: <span style={{ color: "var(--text)" }}>{spec.value}</span>
            </span>
          ))}
        </div>

        {/* View details button */}
        <div
          className="flex items-center gap-2 group/btn"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "var(--accent)",
            textTransform: "uppercase",
          }}
        >
          VIEW DETAILS
          <ChevronRight
            size={14}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  const { ref, inView } = useInView(0.05);
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? products : products.filter((p) => p.category === filter);

  return (
    <section
      id="products"
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
      ref={ref}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--accent-rgb), 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-rgb), 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "62px 62px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            // DRONE FLEET
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
            OUR <span style={{ color: "var(--accent)" }}>PRODUCTS</span>
          </h2>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              maxWidth: "600px",
              margin: "0 auto 24px",
              lineHeight: 1.7,
            }}
          >
            A complete ecosystem of unmanned aerial systems engineered for every mission profile — from micro-reconnaissance to heavy industrial lift.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {["ALL", "Surveillance Drone", "Payload Drone", "Agriculture Drone", "Fire Fighting Drone"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: filter === cat ? "var(--button-contrast)" : "var(--text-muted)",
                  backgroundColor: filter === cat ? "var(--accent)" : "transparent",
                  border: "1px solid var(--border)",
                  boxShadow: filter === cat ? "0 8px 18px rgba(var(--accent-rgb),0.12)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-8 lg:mt-10"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease 0.8s",
          }}
        >
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            CUSTOM DRONE SOLUTIONS AVAILABLE ON REQUEST
          </p>
          <button
            onClick={() => scrollToSection("contact", 104)}
            className="px-8 py-4 rounded font-bold transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              backgroundColor: "transparent",
            }}
          >
            REQUEST CUSTOM BUILD
          </button>
        </div>
      </div>
    </section>
  );
}
