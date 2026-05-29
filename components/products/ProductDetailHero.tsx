import Image from "next/image";
import Button from "@/components/shared/Button";
import Section from "@/components/shared/Section";
import type { Product } from "@/data/company";

type ProductDetailHeroProps = {
  product: Product;
};

export default function ProductDetailHero({ product }: ProductDetailHeroProps) {
  return (
    <Section className="pt-12">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--accent)]">
            {product.category}
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-none text-[var(--text)] sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 text-base font-black uppercase tracking-[0.16em] text-[var(--accent)]">
            {product.tagline}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
            {product.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Request Demo
            </Button>
            <Button href="/products" size="lg" variant="secondary">
              All Products
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
            style={{ objectPosition: product.imagePosition ?? "center center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/8 to-transparent" />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full border border-white/14 bg-black/38 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
            <span aria-hidden="true">{product.icon}</span>
            {product.category}
          </div>
        </div>
      </div>
    </Section>
  );
}
