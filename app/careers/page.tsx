import type { Metadata } from "next";
import CareersPageContent from "@/components/careers/CareersPageContent";

export const metadata: Metadata = {
  title: "Careers | Metkaerox Systems",
  description:
    "Join Metkaerox Systems and help build the next generation of autonomous aerial systems in India.",
};

export default function Page() {
  return <CareersPageContent />;
}
