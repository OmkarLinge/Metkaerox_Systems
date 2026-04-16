"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, User, Calendar, Tag, ArrowRight } from "lucide-react";

import { useTheme } from "@/components/ClientLayout";
export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-24 pb-12 overflow-hidden" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Navbar />
      
      <div className="container mx-auto px-6">
        <header className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Aerial <span className="text-accent">Intelligence</span> Blog
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted">
              <Search size={18} />
            </div>
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-accent bg-card-bg focus:ring-2 focus:ring-accent outline-none transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col md:flex-row gap-8 pb-12 border-b border-accent/10"
                >
                  <div className="relative w-full md:w-72 h-48 rounded-2xl overflow-hidden shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-accent text-[0.6rem] font-black text-white uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-[0.7rem] font-bold text-muted uppercase tracking-widest mb-3">
                      <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300 uppercase tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {post.title}
                    </h2>
                    <p className="text-muted leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <button className="flex items-center gap-2 text-[0.75rem] font-black uppercase tracking-[0.2em] text-accent group/btn">
                      Read Full Article <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </button>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="py-20 text-center text-muted">
                No articles found matching your search.
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-10">
            {/* Writing Space CTA */}
            <div className="p-8 rounded-3xl border border-accent bg-gradient-to-br from-accent/5 to-transparent backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 uppercase" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Write for <span className="text-accent">Us</span>
              </h3>
              <p className="text-sm text-muted mb-6 leading-relaxed">
                Have a story about drone technology, GIS, or aerial surveying? Share your knowledge with our global community.
              </p>
              <button className="w-full py-4 rounded-xl bg-accent text-white font-bold text-[0.7rem] tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] transition-all duration-300">
                Submit A Proposal
              </button>
            </div>

            {/* Newsletter */}
            <div className="p-8 rounded-3xl border border-accent bg-card-bg">
              <h3 className="text-lg font-bold mb-4 uppercase" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Newsletter
              </h3>
              <p className="text-sm text-muted mb-6">
                Stay updated with the latest in UAV tech and aerial intelligence.
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg focus:ring-1 focus:ring-accent outline-none"
                />
                <button className="w-full py-3 rounded-xl border border-accent text-accent font-bold text-[0.65rem] tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
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
        .bg-bg { background-color: var(--bg); }
      `,
        }}
      />
    </main>
  );
}
