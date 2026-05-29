import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone, Timer, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import { COMPANY_ADDRESS } from "./contactData";

type ContactCard = {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  tone: string;
};

const contactCards: ContactCard[] = [
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Flymore Drone",
    note: COMPANY_ADDRESS,
    tone: "#00AEEF",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@metkaeroxsystems.com",
    note: "Product inquiries, partnerships, and support",
    tone: "#3B82F6",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 900 000 0000",
    note: "Speak with our mission advisory team",
    tone: "#10B981",
  },
  {
    icon: Timer,
    label: "Response",
    value: "Within 24 hours",
    note: "Priority routing for operational requirements",
    tone: "#F59E0B",
  },
];

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin },
  { label: "Twitter", icon: Twitter },
  { label: "YouTube", icon: Youtube },
  { label: "Instagram", icon: Instagram },
];

export default function ContactInfoCards() {
  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 sm:p-7">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--accent)]">
          Direct Channels
        </p>
        <h2 className="mt-4 font-display text-2xl font-black uppercase leading-tight text-[var(--text)] sm:text-3xl">
          Talk to the aerial systems team.
        </h2>
        <p
          className="mt-4 text-base leading-7 text-[var(--text-muted)]"
          style={{ fontFamily: "var(--site-font)" }}
        >
          Share your mission profile, payload requirements, operating
          environment, or procurement timeline. We will route it to the right
          specialist.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {contactCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.label}
              className="group rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_40px_rgba(var(--shadow-rgb),0.10)]"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border"
                  style={{
                    borderColor: `${card.tone}44`,
                    backgroundColor: `${card.tone}14`,
                    color: card.tone,
                  }}
                >
                  <Icon size={19} />
                </div>
                <div>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {card.label}
                  </p>
                  <h3
                    className="mt-1 text-lg font-bold text-[var(--text)]"
                    style={{ fontFamily: "var(--site-font)" }}
                  >
                    {card.value}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-6 text-[var(--text-muted)]"
                    style={{ fontFamily: "var(--site-font)" }}
                  >
                    {card.note}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4">
        <p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Follow Us
        </p>
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <button
                key={social.label}
                type="button"
                aria-label={social.label}
                className="btn-interaction flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
