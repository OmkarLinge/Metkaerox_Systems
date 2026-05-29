import { CheckCircle2 } from "lucide-react";
import Card from "@/components/shared/Card";
import Section from "@/components/shared/Section";
import type { Product } from "@/data/company";

type ProductFeaturesSectionProps = {
  product: Product;
};

export default function ProductFeaturesSection({ product }: ProductFeaturesSectionProps) {
  return (
    <Section className="pt-0">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text)]">
            Key Features
          </h2>
          <div className="mt-6 grid gap-3">
            {product.features.map((feature) => (
              <div key={feature} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--panel-muted)] p-4">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span className="text-sm font-semibold leading-6 text-[var(--text)]">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text)]">
            Mission Applications
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.applications.map((application) => (
              <div
                key={application}
                className="rounded-xl border border-[rgba(var(--accent-rgb),0.22)] bg-[rgba(var(--accent-rgb),0.07)] p-4 text-sm font-black uppercase tracking-[0.08em] text-[var(--text)]"
              >
                {application}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
