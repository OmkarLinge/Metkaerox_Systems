import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import Section from "@/components/shared/Section";
import { clientGroups } from "@/data/company";

type Client = (typeof clientGroups)[number]["clients"][number];

const allClients = clientGroups.flatMap((group) =>
  group.clients.map((client) => ({
    ...client,
    groupName: group.name,
  }))
);

const midpoint = Math.ceil(allClients.length / 2);
const marqueeRows = [
  allClients.slice(0, midpoint),
  allClients.slice(midpoint),
].filter((row) => row.length > 0);

function ClientCard({ client }: { client: Client & { groupName: string } }) {
  const content = (
    <div className="client-card relative flex h-36 w-40 shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-[rgba(var(--highlight-rgb),0.08)] bg-[linear-gradient(135deg,rgba(var(--highlight-rgb),0.045),rgba(var(--accent-rgb),0.025))] p-4 text-center transition-colors duration-300 hover:border-[rgba(var(--accent-rgb),0.5)] hover:bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.12),rgba(var(--highlight-rgb),0.05))] sm:h-40 sm:w-44">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(circle_at_50%_0%,rgba(var(--accent-rgb),0.18),transparent_58%)] group-hover:opacity-100" />

      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-[rgba(var(--accent-rgb),0.08)] shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
        <span className="max-w-[3.25rem] truncate text-center text-base font-black uppercase tracking-[0.06em] text-[var(--accent)]">
          {client.abbreviation.slice(0, 5)}
        </span>
      </div>

      <h3 className="relative mt-4 max-w-full truncate text-xs font-black uppercase tracking-[0.08em] text-[var(--text)]">
        {client.name}
      </h3>
      <p className="relative mt-1 max-w-full truncate text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        {client.sector}
      </p>

      {client.website ? (
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(var(--accent-rgb),0.24)] bg-[rgba(var(--accent-rgb),0.08)] text-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={13} />
        </span>
      ) : null}
    </div>
  );

  if (!client.website) {
    return <div className="group mx-2 shrink-0">{content}</div>;
  }

  return (
    <a
      href={client.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group mx-2 shrink-0 no-underline"
      aria-label={`Visit ${client.name}`}
    >
      {content}
    </a>
  );
}

function MarqueeRow({
  clients,
  direction,
  duration,
}: {
  clients: Array<Client & { groupName: string }>;
  direction: "left" | "right";
  duration: number;
}) {
  const loopedClients = [...clients, ...clients, ...clients];

  return (
    <div className="clients-marquee-mask overflow-hidden py-2">
      <div
        className={`clients-marquee-track flex w-max ${
          direction === "left" ? "clients-marquee-left" : "clients-marquee-right"
        }`}
        style={{ "--duration": `${duration}s` } as CSSProperties}
      >
        {loopedClients.map((client, index) => (
          <ClientCard
            key={`${client.name}-${direction}-${index}`}
            client={client}
          />
        ))}
      </div>
    </div>
  );
}

export default function ClientsSection() {
  return (
    <Section id="clients" className="pt-0">
      <div className="relative overflow-hidden rounded-[28px] border border-[rgba(var(--highlight-rgb),0.08)] bg-[linear-gradient(180deg,rgba(var(--panel-rgb),0.72),rgba(5,8,12,0.92))] px-4 py-12 shadow-[0_28px_80px_rgba(0,0,0,0.24)] sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--accent-rgb),0.12),transparent_48%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:120px_120px] opacity-40" />

        <div className="relative mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--accent)]">
            Trusted Partners & Clients
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase text-[var(--text)] sm:text-5xl">
            Established Partnerships
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
            Trusted by government agencies, defense organizations, industry
            leaders, and institutes across India and beyond.
          </p>
        </div>

        <div className="relative space-y-4">
          {marqueeRows.map((clients, index) => (
            <MarqueeRow
              key={`clients-row-${index}`}
              clients={clients}
              direction={index % 2 === 0 ? "left" : "right"}
              duration={index % 2 === 0 ? 42 : 50}
            />
          ))}
        </div>

        <div className="relative mt-8 grid gap-3 text-center sm:grid-cols-3">
          {clientGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-[var(--border)] bg-[rgba(var(--panel-rgb),0.58)] px-4 py-5"
            >
              <p className="text-2xl font-black text-[var(--accent)]">
                {group.clients.length}
              </p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {group.name}
              </p>
            </div>
          ))}
          <div className="rounded-2xl border border-[var(--border)] bg-[rgba(var(--panel-rgb),0.58)] px-4 py-5">
            <p className="text-2xl font-black text-[var(--accent)]">
              {allClients.length}+
            </p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Total Network
            </p>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .clients-marquee-mask {
              mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
              -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
            }

            .clients-marquee-track {
              animation-duration: var(--duration);
              animation-timing-function: linear;
              animation-iteration-count: infinite;
              will-change: transform;
            }

            .clients-marquee-track:hover {
              animation-play-state: paused;
            }

            .clients-marquee-left {
              animation-name: clientsMarqueeLeft;
            }

            .clients-marquee-right {
              animation-name: clientsMarqueeRight;
            }

            @keyframes clientsMarqueeLeft {
              from { transform: translateX(0); }
              to { transform: translateX(-33.333%); }
            }

            @keyframes clientsMarqueeRight {
              from { transform: translateX(-33.333%); }
              to { transform: translateX(0); }
            }

            @media (prefers-reduced-motion: reduce) {
              .clients-marquee-track {
                animation: none;
              }
            }
          `,
        }}
      />
    </Section>
  );
}
