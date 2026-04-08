"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => {
      setEnabled(mediaQuery.matches && window.innerWidth >= 768);
    };

    updateEnabled();
    window.addEventListener("resize", updateEnabled, { passive: true });
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      window.removeEventListener("resize", updateEnabled);
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let animationFrame = 0;
    let hoverActive = false;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };

    const render = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;

      outer.style.transform = `translate3d(${current.x - 20}px, ${current.y - 20}px, 0) scale(${hoverActive ? 1.35 : 1})`;
      inner.style.transform = `translate3d(${current.x - 3}px, ${current.y - 3}px, 0)`;

      animationFrame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const handlePointerOver = (event: Event) => {
      const targetElement = event.target as Element | null;
      hoverActive = Boolean(targetElement?.closest("a, button, [data-hover]"));
    };

    const handlePointerLeave = () => {
      hoverActive = false;
    };

    animationFrame = window.requestAnimationFrame(render);
    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handlePointerOver, { passive: true });
    document.addEventListener("mouseout", handlePointerOver, { passive: true });
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handlePointerOver);
      document.removeEventListener("mouseout", handlePointerOver);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          border: "1px solid rgba(var(--accent-rgb), 0.28)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "border-color 0.2s ease, opacity 0.2s ease",
          transform: "translate3d(-100px, -100px, 0) scale(1)",
          transformOrigin: "center",
          willChange: "transform",
          opacity: 0.8,
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          backgroundColor: "var(--accent)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          boxShadow: "0 0 6px rgba(var(--accent-rgb), 0.2)",
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
        }}
      />
    </>
  );
}
