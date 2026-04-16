"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Technology from "@/components/Technology";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollSlideSection from "@/components/ScrollSlideSection";

export default function Home() {
  return (
    <main className="relative overflow-hidden" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Navbar />
      <Hero />
      <ScrollSlideSection>
        <About />
      </ScrollSlideSection>
      <ScrollSlideSection>
        <Products />
      </ScrollSlideSection>
      <ScrollSlideSection>
        <Technology />
      </ScrollSlideSection>
      <ScrollSlideSection>
        <Clients />
      </ScrollSlideSection>
      <ScrollSlideSection>
        <Contact />
      </ScrollSlideSection>
      <ScrollSlideSection offset={84}>
        <Footer />
      </ScrollSlideSection>
    </main>
  );
}
