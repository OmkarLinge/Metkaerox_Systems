import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, RadioTower, ShieldCheck } from "lucide-react";

const heroStats = [
  { label: "Response Window", value: "24H" },
  { label: "Mission Types", value: "10+" },
  { label: "Deployment Region", value: "INDIA" },
];

export default function ContactHero() {
  return (
    <section
      className="relative isolate overflow-hidden pt-12 pb-14 sm:pb-16 lg:pb-20"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--accent-rgb), 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-rgb), 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 58% 42% at 70% 20%, rgba(var(--accent-rgb),0.14), transparent 72%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:px-8">
        <div className="max-w-3xl">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-2"
            style={{
              borderColor: "rgba(var(--accent-rgb),0.24)",
              backgroundColor: "rgba(var(--accent-rgb),0.06)",
              color: "var(--accent)",
            }}
          >
            <RadioTower size={15} />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em]">
              Mission Control Online
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-[clamp(2.6rem,8vw,6.5rem)] font-black uppercase leading-[0.92] text-[var(--text)]">
            Start Your{" "}
            <span className="text-[var(--accent)]">Mission</span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg leading-8 sm:text-xl"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--site-font)",
            }}
          >
            Ready to integrate advanced drone technology into your operations?
            Our specialists are standing by to design your perfect aerial
            solution.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#contact-form"
              className="btn-interaction inline-flex items-center gap-3 rounded-lg px-6 py-4 text-xs font-bold uppercase tracking-[0.14em]"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--highlight))",
                color: "var(--button-contrast)",
                fontFamily: "var(--site-font)",
                boxShadow: "0 16px 34px rgba(var(--accent-rgb),0.18)",
              }}
            >
              Send Message
              <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:contact@metkaeroxsystems.com"
              className="btn-interaction inline-flex items-center gap-3 rounded-lg border px-6 py-4 text-xs font-bold uppercase tracking-[0.14em]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                backgroundColor: "rgba(var(--accent-rgb),0.04)",
                fontFamily: "var(--site-font)",
              }}
            >
              Email Team
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="border-r border-[var(--border)] px-3 py-4 last:border-r-0 sm:px-5"
              >
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-lg font-black text-[var(--text)] sm:text-2xl">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-[0_24px_70px_rgba(var(--shadow-rgb),0.12)] sm:min-h-[440px] lg:min-h-[560px]">
          <Image
            src="/products/flysurveilx.jpg"
            alt="Metkaerox Systems surveillance drone ready for field deployment"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--shadow-rgb),0.68)] via-[rgba(var(--shadow-rgb),0.18)] to-[rgba(var(--accent-rgb),0.18)]" />
          <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/18 bg-black/30 p-5 text-white backdrop-blur-md sm:inset-x-8 sm:bottom-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                <ShieldCheck size={19} />
              </span>
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/70">
                  Secure Inquiry Channel
                </p>
                <p className="mt-1 font-display text-sm font-black uppercase tracking-[0.12em]">
                  Engineering Review Queued
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 border-t border-white/15 pt-4">
              <Clock3 size={16} className="text-white/70" />
              <p
                className="text-sm font-semibold leading-6 text-white/82"
                style={{ fontFamily: "var(--site-font)" }}
              >
                Project briefs, demos, partnerships, and custom UAV builds are
                routed to the right technical team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
