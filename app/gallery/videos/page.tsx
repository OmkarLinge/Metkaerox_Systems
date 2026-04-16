"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { videoGallery } from "@/data/gallery";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X } from "lucide-react";

import { useTheme } from "@/components/ClientLayout";

export default function VideoGalleryPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
            Video <span className="text-accent">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted max-w-2xl mx-auto"
          >
            Experience the future of autonomous systems through our cinematic video collection.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videoGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-3xl overflow-hidden border border-accent bg-card-bg shadow-2xl transition-all duration-500"
            >
              <div 
                className="relative h-72 md:h-96 w-full cursor-pointer overflow-hidden"
                onClick={() => setActiveVideo(item.videoUrl)}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center text-white shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)] group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight mb-3 uppercase">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4 md:p-12"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-accent transition-colors duration-300"
              onClick={() => setActiveVideo(null)}
            >
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
