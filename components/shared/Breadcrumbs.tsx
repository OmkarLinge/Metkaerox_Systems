"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { products } from "@/data/company";

const labelMap: Record<string, string> = {
  about: "About",
  products: "Products",
  blog: "Blog",
  gallery: "Gallery",
  careers: "Careers",
  contact: "Contact",
};

function formatLabel(segment: string) {
  const product = products.find((item) => item.id === segment);
  if (product) return product.name;
  return labelMap[segment] ?? segment.replace(/-/g, " ");
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto flex max-w-7xl items-center gap-2 px-4 pt-[calc(var(--nav-offset)+0.75rem)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] sm:px-6 lg:px-8"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 transition-colors hover:text-[var(--text)]"
      >
        <Home size={14} />
        Home
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <span key={href} className="inline-flex items-center gap-2">
            <ChevronRight size={14} aria-hidden="true" />
            {isLast ? (
              <span className="text-[var(--text)]">{formatLabel(segment)}</span>
            ) : (
              <Link href={href} className="transition-colors hover:text-[var(--text)]">
                {formatLabel(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
