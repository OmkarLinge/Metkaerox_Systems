import Link from "next/link";

export default function NotFound() {
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
          Route Not Found
        </p>
        <h1
          className="mt-5 text-4xl font-black uppercase tracking-tight sm:text-6xl"
          style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--highlight)" }}
        >
          The requested page is unavailable.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
          The link may be outdated or the page may have moved. Return to the homepage to continue
          exploring the Metkaerox platform.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full border px-6 py-3 text-sm font-black uppercase tracking-[0.2em]"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "rgba(var(--accent-rgb),0.08)",
            color: "var(--highlight)",
          }}
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
