"use client";

import dynamic from "next/dynamic";

const DynamicMapSection = dynamic(() => import("./MapSectionContent"), {
  ssr: false,
  loading: () => (
    <section
      aria-label="Loading operations map"
      className="px-4 py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-7xl rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8">
        <div className="h-[360px] rounded-xl border border-[var(--border)] bg-[rgba(var(--accent-rgb),0.05)]" />
      </div>
    </section>
  ),
});

export default function MapSection() {
  return <DynamicMapSection />;
}
