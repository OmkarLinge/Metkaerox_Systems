import type { ReactNode } from "react";

type EmptyStateProps = {
  action?: ReactNode;
  description?: ReactNode;
  title: string;
};

export default function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-6 py-12 text-center">
      <h3 className="text-xl font-black uppercase tracking-[0.08em] text-[var(--text)]">
        {title}
      </h3>
      {description ? (
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[var(--text-muted)]">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
