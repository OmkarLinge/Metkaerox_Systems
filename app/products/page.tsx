import type { Metadata } from "next";
import ProductsPage from "@/components/products/ProductsPage";

export const metadata: Metadata = {
  title: "Products | Metkaerox Systems",
  description:
    "Explore Metkaerox Systems UAV platforms for surveillance, agriculture, firefighting, payload delivery, and industrial operations.",
};

export default function Page() {
  return <ProductsPage />;
}
