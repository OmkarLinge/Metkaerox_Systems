import SiteShell from "@/components/layout/SiteShell";
import { products, type Product } from "@/data/company";
import ProductDetailCTA from "./ProductDetailCTA";
import ProductDetailHero from "./ProductDetailHero";
import ProductFeaturesSection from "./ProductFeaturesSection";
import ProductSpecsSection from "./ProductSpecsSection";

type ProductDetailPageProps = {
  product: Product;
};

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const currentIndex = products.findIndex((item) => item.id === product.id);
  const nextProduct = products[(currentIndex + 1) % products.length];

  return (
    <SiteShell>
      <ProductDetailHero product={product} />
      <ProductSpecsSection product={product} />
      <ProductFeaturesSection product={product} />
      <ProductDetailCTA nextProduct={nextProduct} />
    </SiteShell>
  );
}
