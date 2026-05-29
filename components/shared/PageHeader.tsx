import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("mx-auto max-w-4xl text-center", className)}>
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 text-4xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mx-auto mt-5 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
      {actions ? <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div> : null}
    </header>
  );
}
