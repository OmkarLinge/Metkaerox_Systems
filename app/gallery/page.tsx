import type { Metadata } from "next";
import GalleryPageContent from "@/components/gallery/GalleryPageContent";

export const metadata: Metadata = {
  title: "Gallery | Metkaerox Systems",
  description:
    "Explore Metkaerox Systems drone imagery and demonstration videos across surveillance, logistics, industrial, and agricultural use cases.",
};

export default function Page() {
  return <GalleryPageContent />;
}
