import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "FlySurveilX", href: "/products/flysurveilx" },
    { label: "FlyAstros", href: "/products/flyastros" },
    { label: "FlyCleon", href: "/products/flycleon" },
    { label: "FlyGripper", href: "/products/flygripper" },
    { label: "FlyIrax", href: "/products/flyirax" },
    { label: "FlyVarun", href: "/products/flyvarun" },
    { label: "FlySpyder", href: "/products/flyspyder" },
    { label: "FireHawks", href: "/products/firehawks" },
  ],
  Technology: [
    { label: "SLAM Navigation", href: "/about#technology" },
    { label: "Frequency Hopping", href: "/about#technology" },
    { label: "GPS Anti-Spoofing", href: "/about#technology" },
    { label: "Swarm Intelligence", href: "/about#technology" },
    { label: "Tether Systems", href: "/about#technology" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Mission & Vision", href: "/about#timeline" },
    { label: "Certifications", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/contact" },
    { label: "Terms of Service", href: "/contact" },
    { label: "Export Compliance", href: "/contact" },
    { label: "Cookie Policy", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface-contrast)]"
    >
      <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(var(--accent-rgb),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--accent-rgb),0.02)_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <Zap
                size={24}
                className="text-[var(--accent)] drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.45)]"
                fill="currentColor"
              />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-black tracking-[0.2em] text-[var(--text)]">
                  METKAEROX
                </span>
                <span className="mt-1 text-[0.55rem] tracking-[0.35em] text-[var(--accent)]">
                  SYSTEMS
                </span>
              </div>
            </div>

            <p className="mb-5 text-sm leading-7 text-[var(--text-muted)]">
              India's premier autonomous systems company, engineering advanced
              unmanned aerial platforms for defense, agriculture, surveillance,
              and industrial operations.
            </p>

            <div className="flex flex-wrap gap-2">
              {["DGCA", "ISO 9001", "Make in India"].map((cert) => (
                <span
                  key={cert}
                  className="rounded border border-[rgba(var(--accent-rgb),0.25)] bg-[rgba(var(--accent-rgb),0.05)] px-2 py-1 text-[0.55rem] uppercase tracking-[0.1em] text-[var(--accent)]"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent)]">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block text-sm font-medium text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-[linear-gradient(90deg,transparent,var(--border),transparent)]" />

        <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-[0.6rem] uppercase tracking-[0.15em] text-[var(--text-muted)]">
            © {new Date().getFullYear()} METKAEROX SYSTEMS TECHNOLOGIES PVT. LTD. - ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[0.6rem] uppercase tracking-[0.1em] text-[var(--text-muted)]">
              MADE IN INDIA
            </span>
            <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.1em] text-emerald-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              ALL SYSTEMS NOMINAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
