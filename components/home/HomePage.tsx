import SiteShell from "@/components/layout/SiteShell";
import HeroSection from "@/components/home/HeroSection";
import ClientsSection from "@/components/home/ClientsSection";
import AboutSection from "@/components/about/AboutSection";
import ProductsSection from "@/components/products/ProductsSection";
import TechnologySection from "@/components/about/TechnologySection";

export default function HomePage() {
  return (
    <SiteShell breadcrumbs={false}>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <TechnologySection />
      <ClientsSection />
    </SiteShell>
  );
}
