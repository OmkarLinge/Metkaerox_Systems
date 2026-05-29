import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/products/ProductDetailPage";
import { getProductById, products } from "@/data/company";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductById(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Metkaerox Systems",
    };
  }

  return {
    title: `${product.name} | Metkaerox Systems`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Metkaerox Systems`,
      description: product.description,
      type: "website",
    },
  };
}

export default function Page({ params }: ProductPageProps) {
  const product = getProductById(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
