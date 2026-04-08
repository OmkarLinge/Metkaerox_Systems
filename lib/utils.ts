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

export function scrollToSection(id: string, offset = 104) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(id);
  if (!element) return;

  const top = window.scrollY + element.getBoundingClientRect().top - offset;
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}
