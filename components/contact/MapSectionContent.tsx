"use client";

import { ArrowUpRight, Clock3, MapPin, Navigation, RadioTower } from "lucide-react";
import {
  COMPANY_ADDRESS,
  MAP_DIRECTIONS_URL,
  MAP_EMBED_URL,
} from "./contactData";

const mapDetails = [
  { icon: Navigation, label: "Operating Base", value: "Flymore Drone" },
  { icon: Clock3, label: "Availability", value: "Mon-Sat, 09:00-18:00 IST" },
  { icon: RadioTower, label: "Routing", value: "Sales, demos, integrations" },
];

export default function MapSectionContent() {
  return (
    <section
      className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
        <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-[0_22px_60px_rgba(var(--shadow-rgb),0.12)] lg:min-h-[560px]">
          <iframe
            title="Flymore Drone office map"
            src={MAP_EMBED_URL}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/18 bg-black/36 p-4 text-white backdrop-blur-md sm:left-8 sm:right-auto sm:w-[360px]">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/65">
              Office Location
            </p>
            <h2 className="mt-2 font-display text-xl font-black uppercase tracking-[0.1em]">
              Flymore Drone
            </h2>
            <p
              className="mt-2 text-sm leading-6 text-white/76"
              style={{ fontFamily: "var(--site-font)" }}
            >
              Ground floor, Bhumkar Chowk, Krushna Tower, Ambegaon Budruk,
              Pune, Maharashtra 411046.
            </p>
            <a
              href={MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-interaction mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--highlight)]"
            >
              Get Directions
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 sm:p-8">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--accent)]">
            Operations Map
          </p>
          <h2 className="mt-4 font-display text-2xl font-black uppercase leading-tight text-[var(--text)] sm:text-3xl">
            Where your inquiry lands.
          </h2>
          <p
            className="mt-4 text-base leading-7 text-[var(--text-muted)]"
            style={{ fontFamily: "var(--site-font)" }}
          >
            Visit the Flymore Drone office for scheduled demonstrations,
            integration reviews, and operational consultations.
          </p>
          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[rgba(var(--accent-rgb),0.24)] bg-[rgba(var(--accent-rgb),0.08)] text-[var(--accent)]">
                <MapPin size={18} />
              </span>
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Full Address
                </p>
                <p
                  className="mt-1 text-base font-bold leading-7 text-[var(--text)]"
                  style={{ fontFamily: "var(--site-font)" }}
                >
                  {COMPANY_ADDRESS}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {mapDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <div
                  key={detail.label}
                  className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[rgba(var(--accent-rgb),0.24)] bg-[rgba(var(--accent-rgb),0.08)] text-[var(--accent)]">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {detail.label}
                    </p>
                    <p
                      className="mt-1 text-base font-bold text-[var(--text)]"
                      style={{ fontFamily: "var(--site-font)" }}
                    >
                      {detail.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
