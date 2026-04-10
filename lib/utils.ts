import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}

function getNavOffset(fallback = 88) {
  if (typeof window === "undefined") return fallback;
  const nav = document.querySelector("nav");
  if (!nav) return fallback;

  const rect = nav.getBoundingClientRect();
  const offset = Math.round(rect.bottom + 8);
  document.documentElement.style.setProperty("--nav-offset", `${offset}px`);
  return offset;
}

export function scrollToSection(id: string, offset = 104) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(id);
  if (!element) return;

  if (id === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (offset !== 104) {
    const top = window.scrollY + element.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    return;
  }

  getNavOffset();
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
