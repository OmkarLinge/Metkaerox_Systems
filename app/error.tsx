"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-start justify-center">
        <p
          className="text-xs font-black uppercase tracking-[0.34em]"
          style={{ color: "var(--accent)" }}
        >
          Application Error
        </p>
        <h1
          className="mt-5 text-4xl font-black uppercase tracking-tight sm:text-6xl"
          style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--highlight)" }}
        >
          Something interrupted the page render.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Try reloading the current screen. If the problem persists, restart the dev server once so
          Next can rebuild the route cleanly.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center rounded-full border px-6 py-3 text-sm font-black uppercase tracking-[0.2em]"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "rgba(var(--accent-rgb),0.08)",
            color: "var(--highlight)",
          }}
        >
          Retry Render
        </button>
      </div>
    </main>
  );
}
