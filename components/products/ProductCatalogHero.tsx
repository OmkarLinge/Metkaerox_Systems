import Button from "@/components/shared/Button";
import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/shared/Section";

export default function ProductCatalogHero() {
  return (
    <Section id="products" className="pt-12">
      <PageHeader
        eyebrow="Products"
        title={
          <>
            Mission-ready <span className="text-[var(--accent)]">drone systems</span>
          </>
        }
        description="Explore the full Metkaerox fleet for surveillance, agriculture, firefighting, logistics, tethered operations, and industrial field missions."
        actions={
          <>
            <Button href="/contact" size="lg">
              Request Demo
            </Button>
            <Button href="/gallery" size="lg" variant="secondary">
              View Gallery
            </Button>
          </>
        }
      />
    </Section>
  );
}
