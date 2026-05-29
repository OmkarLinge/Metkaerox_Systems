import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Section from "@/components/shared/Section";
import type { Product } from "@/data/company";

type ProductDetailCTAProps = {
  nextProduct: Product;
};

export default function ProductDetailCTA({ nextProduct }: ProductDetailCTAProps) {
  return (
    <Section className="pt-0">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--accent)]">
              Next Platform
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase text-[var(--text)]">
              Explore {nextProduct.name}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
              Continue through the Metkaerox fleet or compare every platform in
              the product catalog.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`/products/${nextProduct.id}`} size="lg">
              Next Product
            </Button>
            <Button href="/products" size="lg" variant="secondary">
              Catalog
            </Button>
          </div>
        </div>
      </Card>
    </Section>
  );
}
