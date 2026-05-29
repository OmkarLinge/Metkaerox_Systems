import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Metkaerox Systems",
  description:
    "Contact Metkaerox Systems for drone product demos, custom UAV integrations, partnerships, and aerial systems support.",
};

export default function Page() {
  return <ContactPage />;
}
