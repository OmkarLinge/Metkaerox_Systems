"use client";

import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/company";
import {
  formatStageIndex,
  getPanelSpecs,
  parseMetricValue,
  toRgba,
} from "@/components/products/productStageUtils";

type ProductStagePanelProps = {
  product: Product;
  productIndex: number;
  isActive: boolean;
  depth: 0 | 1 | 2;
};

function StageSpec({
  label,
  value,
  accentColor,
  isActive,
}: {
  label: string;
  value: string;
  accentColor: string;
  isActive: boolean;
}) {
  const parsed = parseMetricValue(value);

  return (
    <div
      className="relative overflow-hidden rounded-[1.15rem] border px-3 py-3"
      style={{
        borderColor: toRgba(accentColor, isActive ? 0.22 : 0.14),
        background: isActive
          ? "linear-gradient(180deg, rgba(var(--highlight-rgb),0.05) 0%, rgba(var(--highlight-rgb),0.11) 100%)"
          : "linear-gradient(180deg, rgba(var(--highlight-rgb),0.04) 0%, rgba(var(--highlight-rgb),0.08) 100%)",
      }}
    >
      <div
        className="absolute inset-x-4 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${toRgba(accentColor, 0.86)}, transparent)`,
          opacity: isActive ? 0.92 : 0.56,
        }}
      />

      <p
        className="text-[0.58rem] font-black uppercase tracking-[0.24em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>

      <div className="mt-3 flex items-end gap-2">
        <div
          className={`${isActive ? "text-[1.7rem] sm:text-[1.95rem]" : "text-[1.1rem] sm:text-[1.25rem]"} font-black leading-none tracking-tight`}
          style={{ color: "var(--highlight)", fontFamily: "'Orbitron', sans-serif" }}
        >
          {parsed && isActive ? (
            <CountUp
              key={value}
              end={parsed.numericValue}
              duration={1}
              decimals={parsed.decimals}
              preserveValue={false}
            />
          ) : (
            value
          )}
        </div>

        {parsed?.suffix && isActive ? (
          <span
            className="pb-0.5 text-[0.62rem] font-black uppercase tracking-[0.18em]"
            style={{ color: accentColor }}
          >
            {parsed.suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function ProductStagePanel({
  product,
  productIndex,
  isActive,
  depth,
}: ProductStagePanelProps) {
  const panelSpecs = getPanelSpecs(product);
  const accentColor = product.color;
  const imagePadding =
    depth === 0 ? "clamp(1rem, 2vw, 1.75rem)" : depth === 1 ? "1rem" : "0.85rem";

  const panelContent = (
    <motion.div
      className="product-stage-panel relative flex h-full flex-col overflow-hidden rounded-[2rem] border"
      style={{
        borderColor: isActive ? toRgba(accentColor, 0.28) : toRgba(accentColor, 0.16),
        background: isActive
          ? `linear-gradient(180deg, rgba(var(--highlight-rgb),0.09) 0%, rgba(var(--shadow-rgb),0.3) 100%)`
          : "linear-gradient(180deg, rgba(var(--highlight-rgb),0.08) 0%, rgba(var(--shadow-rgb),0.22) 100%)",
        boxShadow: isActive
          ? `inset 0 1px 0 rgba(255,255,255,0.06), 0 42px 100px ${toRgba(accentColor, 0.18)}`
          : `inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 60px ${toRgba(accentColor, 0.1)}`,
      }}
      whileHover={
        isActive
          ? {
              scale: 1.018,
              y: -8,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 52px 120px ${toRgba(accentColor, 0.24)}`,
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div className="grid-bg h-full w-full" />
      </div>

      <div
        className="pointer-events-none absolute left-[10%] top-[8%] h-28 w-28 rounded-full blur-3xl"
        style={{ backgroundColor: toRgba(accentColor, isActive ? 0.16 : 0.08) }}
      />
      <div
        className="pointer-events-none absolute bottom-[12%] right-[8%] h-24 w-24 rounded-full blur-3xl"
        style={{ backgroundColor: toRgba(accentColor, isActive ? 0.14 : 0.06) }}
      />

      <div className="relative z-10 flex items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <span
          className="rounded-full border px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.24em] sm:text-[0.6rem]"
          style={{
            borderColor: toRgba(accentColor, 0.28),
            backgroundColor: toRgba(accentColor, 0.1),
            color: accentColor,
          }}
        >
          {product.category}
        </span>

        <span
          className="rounded-full border px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.22em] sm:text-[0.6rem]"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "rgba(var(--highlight-rgb),0.08)",
            color: "var(--text-muted)",
          }}
        >
          Stage {formatStageIndex(productIndex)}
        </span>
      </div>

      <div className="relative z-10 flex-1 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <div className={`${isActive ? "grid gap-5 lg:grid-cols-[1.08fr_0.92fr]" : "grid gap-4"}`}>
          <div
            className={`${isActive ? "min-h-[240px] sm:min-h-[290px] lg:min-h-[340px]" : depth === 1 ? "min-h-[180px] sm:min-h-[210px]" : "min-h-[150px] sm:min-h-[180px]"} relative overflow-hidden rounded-[1.7rem] border`}
            style={{
              borderColor: toRgba(accentColor, isActive ? 0.24 : 0.14),
              background:
                "radial-gradient(circle at 50% 24%, rgba(255,255,255,0.06) 0%, rgba(var(--shadow-rgb),0.22) 58%, rgba(var(--shadow-rgb),0.3) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-[12%] bottom-5 h-12 rounded-full blur-2xl"
              style={{ backgroundColor: toRgba(accentColor, isActive ? 0.26 : 0.12) }}
            />

            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1280px) 58vw, 760px"
              className="object-contain drop-shadow-[0_28px_72px_rgba(0,0,0,0.42)]"
              style={{
                objectPosition: product.imagePosition ?? "center center",
                padding: imagePadding,
              }}
              priority={isActive}
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3
                className={`${isActive ? "text-3xl sm:text-4xl lg:text-[2.8rem]" : depth === 1 ? "text-2xl sm:text-[1.8rem]" : "text-xl sm:text-2xl"} font-black uppercase tracking-tight`}
                style={{ color: "var(--highlight)", fontFamily: "'Orbitron', sans-serif" }}
              >
                {product.name}
              </h3>

              <p
                className="mt-2 text-[0.68rem] font-black uppercase tracking-[0.22em] sm:text-[0.72rem]"
                style={{ color: accentColor }}
              >
                {product.category}
              </p>

              <p
                className={`${isActive ? "mt-4 text-base sm:text-lg" : "mt-3 text-sm"} leading-relaxed`}
                style={{ color: "var(--text-muted)" }}
              >
                {product.description}
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {panelSpecs.map((spec) => (
                  <StageSpec
                    key={`${product.id}-${spec.label}`}
                    label={spec.label}
                    value={spec.value}
                    accentColor={accentColor}
                    isActive={isActive}
                  />
                ))}
              </div>

              {isActive ? (
                <motion.div
                  className="inline-flex"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-[0.72rem] font-black uppercase tracking-[0.22em] sm:text-sm"
                    style={{
                      borderColor: toRgba(accentColor, 0.34),
                      background: `linear-gradient(135deg, ${toRgba(accentColor, 0.18)} 0%, rgba(var(--highlight-rgb),0.08) 100%)`,
                      color: "var(--highlight)",
                      boxShadow: `0 18px 40px ${toRgba(accentColor, 0.16)}`,
                    }}
                  >
                    Explore Drone
                    <motion.span
                      className="inline-flex"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </motion.div>
              ) : (
                <div
                  className="inline-flex items-center gap-3 rounded-full border px-5 py-3 text-[0.68rem] font-black uppercase tracking-[0.2em] opacity-70"
                  style={{
                    borderColor: toRgba(accentColor, 0.18),
                    background: "rgba(var(--highlight-rgb),0.05)",
                    color: "var(--text-muted)",
                  }}
                >
                  Explore Drone
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return isActive ? panelContent : <div className="pointer-events-none h-full">{panelContent}</div>;
}
