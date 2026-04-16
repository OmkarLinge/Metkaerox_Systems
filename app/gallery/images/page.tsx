"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { imageGallery } from "@/data/gallery";
import { motion } from "framer-motion";
import Image from "next/image";

import { useTheme } from "@/components/ClientLayout";

export default function ImageGalleryPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 overflow-hidden" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Navbar />
      
      <div className="container mx-auto px-6">
        <header className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Image <span className="text-accent">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted max-w-2xl mx-auto"
          >
            Capturing the precision and power of Metkaerox unmanned aerial systems across diverse environments.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imageGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-accent bg-card-bg shadow-lg hover:shadow-accent/20 transition-all duration-500"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-[0.6rem] font-bold tracking-[0.2em] text-accent uppercase mb-1">
                    {item.category}
                  </span>
                  <p className="text-white text-sm font-medium leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="p-5 border-t border-accent/10">
                <h3 className="font-display text-lg font-bold tracking-tight mb-2 uppercase">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .bg-card-bg { background-color: var(--card-bg); }
        .text-accent { color: var(--accent); }
        .border-accent { border-color: var(--border); }
      `,
        }}
      />
    </main>
  );
}
