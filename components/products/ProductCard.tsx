import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import Card from "@/components/shared/Card";
import type { Product } from "@/data/company";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const keySpecs = product.specs.slice(0, 3);

  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-[var(--card-bg)]">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--border)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: product.imagePosition ?? "center center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/8 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/14 bg-black/40 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
          <span aria-hidden="true">{product.icon}</span>
          {product.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.64rem] font-black uppercase tracking-[0.22em] text-[var(--accent)]">
          {product.tagline}
        </p>
        <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-[var(--text)]">
          {product.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--text-muted)]">
          {product.description}
        </p>

        <div className="mt-5 grid gap-2">
          {keySpecs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--panel-muted)] px-3 py-2.5"
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                <ChevronRight size={13} className="text-[var(--accent)]" />
                {spec.label}
              </span>
              <span className="text-sm font-black text-[var(--text)]">{spec.value}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/products/${product.id}`}
          className="btn-interaction mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(var(--accent-rgb),0.22)] bg-[rgba(var(--accent-rgb),0.08)] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--button-contrast)]"
        >
          View Product
          <ArrowRight size={14} />
        </Link>
      </div>
    </Card>
  );
}
