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
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateEnabled);
    } else {
      mediaQuery.addListener(updateEnabled);
    }

    return () => {
      window.removeEventListener("resize", updateEnabled);
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateEnabled);
      } else {
        mediaQuery.removeListener(updateEnabled);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let animationFrame = 0;
    let hoverActive = false;
    let hasMoved = false;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };

    const render = () => {
      if (!hasMoved) {
        animationFrame = window.requestAnimationFrame(render);
        return;
      }
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;

      outer.style.transform = `translate3d(${current.x - 20}px, ${current.y - 20}px, 0) scale(${hoverActive ? 1.35 : 1})`;
      inner.style.transform = `translate3d(${current.x - 3}px, ${current.y - 3}px, 0)`;

      animationFrame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!hasMoved) {
        current.x = event.clientX;
        current.y = event.clientY;
        hasMoved = true;
      }

      const targetElement = event.target as Element | null;
      hoverActive = Boolean(targetElement?.closest("a, button, [data-hover]"));
    };

    const handlePointerLeave = () => {
      hoverActive = false;
    };

    animationFrame = window.requestAnimationFrame(render);
    document.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("pointermove", handleMove);
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
