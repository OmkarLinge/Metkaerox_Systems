import SiteShell from "@/components/layout/SiteShell";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import Map from "./Map";
import FAQSection from "./FAQSection";

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactHero />
      <section id="contact" className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
      <Map />
      <FAQSection />
    </SiteShell>
  );
}
