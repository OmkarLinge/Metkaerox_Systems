import Section from "@/components/shared/Section";
import ProductCatalogHero from "./ProductCatalogHero";
import ProductGrid from "./ProductGrid";

export default function ProductsSection() {
  return (
    <>
      <ProductCatalogHero />
      <Section className="pt-0">
        <ProductGrid />
      </Section>
    </>
  );
}
