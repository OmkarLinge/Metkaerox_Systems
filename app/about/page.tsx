import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About | Metkaerox Systems",
  description:
    "Learn about Metkaerox Systems, our mission, engineering culture, and autonomous UAV technology.",
};

export default function Page() {
  return <AboutPage />;
}
