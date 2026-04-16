"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/data/company";
import ProductStagePanel from "@/components/products/ProductStagePanel";
import {
  getRelativeIndex,
  wrapIndex,
} from "@/components/products/productStageUtils";

type InteractiveProductStageProps = {
  products: Product[];
};

type StageLayoutConfig = {
  x: number;
  y: number;
  scale: number;
  rotateY: number;
  opacity: number;
  zIndex: number;
  blur: number;
};

const STAGE_LAYOUT: Record<-2 | -1 | 0 | 1 | 2, StageLayoutConfig> = {
  [-2]: { x: -460, y: 82, scale: 0.68, rotateY: 42, opacity: 0.16, zIndex: 1, blur: 10 },
  [-1]: { x: -250, y: 34, scale: 0.84, rotateY: 18, opacity: 0.5, zIndex: 2, blur: 3.2 },
  [0]: { x: 0, y: 0, scale: 1, rotateY: 0, opacity: 1, zIndex: 4, blur: 0 },
  [1]: { x: 250, y: 34, scale: 0.84, rotateY: -18, opacity: 0.5, zIndex: 2, blur: 3.2 },
  [2]: { x: 460, y: 82, scale: 0.68, rotateY: -42, opacity: 0.16, zIndex: 1, blur: 10 },
};

const MOBILE_STAGE_LAYOUT: Record<-2 | -1 | 0 | 1 | 2, StageLayoutConfig> = {
  [-2]: { x: -260, y: 76, scale: 0.7, rotateY: 30, opacity: 0, zIndex: 1, blur: 10 },
  [-1]: { x: -136, y: 28, scale: 0.84, rotateY: 14, opacity: 0.46, zIndex: 2, blur: 3.6 },
  [0]: { x: 0, y: 0, scale: 1, rotateY: 0, opacity: 1, zIndex: 4, blur: 0 },
  [1]: { x: 136, y: 28, scale: 0.84, rotateY: -14, opacity: 0.46, zIndex: 2, blur: 3.6 },
  [2]: { x: 260, y: 76, scale: 0.7, rotateY: -30, opacity: 0, zIndex: 1, blur: 10 },
};

function getStageConfig(relativeIndex: number, isMobile: boolean) {
  const stageLayout = isMobile ? MOBILE_STAGE_LAYOUT : STAGE_LAYOUT;

  if (relativeIndex <= -2) {
    return stageLayout[-2];
  }

  if (relativeIndex >= 2) {
    return stageLayout[2];
  }

  return stageLayout[relativeIndex as -1 | 0 | 1];
}

function StageNavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="flex h-14 w-14 items-center justify-center rounded-full border sm:h-16 sm:w-16"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(180deg, rgba(var(--highlight-rgb),0.08) 0%, rgba(var(--shadow-rgb),0.26) 100%)",
        color: "var(--highlight)",
        boxShadow: "0 18px 44px rgba(var(--shadow-rgb),0.16)",
      }}
      aria-label={direction === "prev" ? "Show previous product" : "Show next product"}
    >
      <Icon size={20} />
    </motion.button>
  );
}

export default function InteractiveProductStage({
  products,
}: InteractiveProductStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncViewport = () => setIsDesktop(mediaQuery.matches);

    syncViewport();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncViewport);
      return () => mediaQuery.removeEventListener("change", syncViewport);
    }

    mediaQuery.addListener(syncViewport);
    return () => mediaQuery.removeListener(syncViewport);
  }, []);

  const showPrevious = () => {
    setActiveIndex((previous) => wrapIndex(previous - 1, products.length));
  };

  const showNext = () => {
    setActiveIndex((previous) => wrapIndex(previous + 1, products.length));
  };

  return (
    <section
      className="product-stage-shell relative overflow-hidden rounded-[2.4rem] border px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 lg:pb-12"
      style={{
        borderColor: "var(--border)",
        boxShadow: "0 44px 120px rgba(var(--shadow-rgb),0.2)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div className="grid-bg h-full w-full" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="product-stage-aura h-44 w-[74%] rounded-full blur-3xl" />
      </div>

      <div
        className="relative z-10 mx-auto max-w-6xl"
        style={{
          perspective: "2200px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="product-stage-viewport relative min-h-[440px] sm:min-h-[540px] lg:min-h-[620px]">
          {products.map((product, index) => {
            const relativeIndex = getRelativeIndex(index, activeIndex, products.length);
            const hidden = Math.abs(relativeIndex) > 2;
            const stageConfig = getStageConfig(relativeIndex, !isDesktop);
            const depth = relativeIndex === 0 ? 0 : Math.abs(relativeIndex) === 1 ? 1 : 2;

            return (
              <motion.div
                key={product.id}
                className="absolute left-1/2 top-0 h-full w-[96%] -translate-x-1/2 sm:w-[88%] lg:w-[84%]"
                initial={false}
                animate={{
                  x: stageConfig.x,
                  y: stageConfig.y,
                  scale: stageConfig.scale,
                  opacity: hidden ? 0 : stageConfig.opacity,
                  zIndex: hidden ? 0 : stageConfig.zIndex,
                  rotateY: shouldReduceMotion ? 0 : stageConfig.rotateY,
                  filter: `blur(${hidden ? 10 : stageConfig.blur}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 22,
                  mass: 0.9,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  pointerEvents: relativeIndex === 0 ? "auto" : "none",
                }}
              >
                <ProductStagePanel
                  product={product}
                  productIndex={index}
                  isActive={relativeIndex === 0}
                  depth={depth}
                />
              </motion.div>
            );
          })}

          <div className="product-stage-platform pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-28 w-[92%] max-w-5xl rounded-[999px]" />
          <div className="product-stage-platform-rim pointer-events-none absolute inset-x-0 bottom-5 mx-auto h-12 w-[72%] max-w-3xl rounded-[999px]" />
        </div>

        <div className="relative z-10 mt-8 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <StageNavButton direction="prev" onClick={showPrevious} />
            <StageNavButton direction="next" onClick={showNext} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {products.map((product, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="relative h-3 rounded-full transition-all duration-300"
                  initial={false}
                  animate={{ width: isActive ? 42 : 12 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  style={{
                    backgroundColor: isActive
                      ? product.color
                      : "rgba(var(--highlight-rgb),0.18)",
                    boxShadow: isActive
                      ? `0 0 24px ${product.color}66`
                      : "none",
                  }}
                  aria-label={`Show ${product.name}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
