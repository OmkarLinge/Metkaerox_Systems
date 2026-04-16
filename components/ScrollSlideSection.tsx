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
  offset = 88,
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
    [0.35, 0.78, 1, 1]
  );
  const scaleTarget = useTransform(
    scrollYProgress,
    [0, 0.42, 1],
    [0.98, 1, 0.996]
  );

  const y = useSpring(yTarget, {
    stiffness: 74,
    damping: 26,
    mass: 0.92,
  });
  const opacity = useSpring(opacityTarget, {
    stiffness: 96,
    damping: 30,
    mass: 0.7,
  });
  const scale = useSpring(scaleTarget, {
    stiffness: 96,
    damping: 30,
    mass: 0.7,
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
