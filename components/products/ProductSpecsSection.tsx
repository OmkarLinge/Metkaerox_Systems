import { ShieldCheck } from "lucide-react";
import Card from "@/components/shared/Card";
import Section from "@/components/shared/Section";
import type { Product } from "@/data/company";

type ProductSpecsSectionProps = {
  product: Product;
};

export default function ProductSpecsSection({ product }: ProductSpecsSectionProps) {
  return (
    <Section className="pt-0">
      <Card className="p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <ShieldCheck size={18} className="text-[var(--accent)]" />
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text)]">
            Specifications
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--panel-muted)] p-4"
            >
              <span className="text-[0.64rem] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {spec.label}
              </span>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xl" aria-hidden="true">
                  {spec.icon}
                </span>
                <span className="text-xl font-black text-[var(--accent)]">{spec.value}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
