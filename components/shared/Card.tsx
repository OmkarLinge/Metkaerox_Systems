import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--panel)] shadow-[0_18px_42px_rgba(var(--shadow-rgb),0.08)]",
        className
      )}
      {...props}
    />
  );
}
