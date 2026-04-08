"use client";

import type { PropsWithChildren } from "react";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type ScrollSlideSectionProps = PropsWithChildren<{
  offset?: number;
}>;

export default function ScrollSlideSection({
  children,
  offset = 120,
}: ScrollSlideSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const entryOffset = prefersReducedMotion ? 0 : offset;
  const exitOffset = prefersReducedMotion ? 0 : -offset * 0.16;

  const yTarget = useTransform(
    scrollYProgress,
    [0, 0.42, 1],
    [entryOffset, 0, exitOffset]
  );
  const opacityTarget = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 1],
    [0.2, 0.72, 1, 1]
  );
  const scaleTarget = useTransform(
    scrollYProgress,
    [0, 0.42, 1],
    [0.965, 1, 0.992]
  );

  const y = useSpring(yTarget, {
    stiffness: 82,
    damping: 24,
    mass: 0.8,
  });
  const opacity = useSpring(opacityTarget, {
    stiffness: 110,
    damping: 28,
    mass: 0.5,
  });
  const scale = useSpring(scaleTarget, {
    stiffness: 110,
    damping: 28,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        scale,
        willChange: prefersReducedMotion ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
