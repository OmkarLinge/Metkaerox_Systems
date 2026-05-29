import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  containerClassName?: string;
};

export default function Section({
  children,
  className,
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative px-4 py-14 sm:px-6 lg:px-8 lg:py-20", className)}
      style={{ backgroundColor: "var(--bg)", color: "var(--text)", ...props.style }}
      {...props}
    >
      <div className={cn("mx-auto max-w-7xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
