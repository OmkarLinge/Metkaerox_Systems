"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jobOpenings, benefits } from "@/data/careers";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Linkedin, 
  Mail, 
  MessageCircle,
  Code,
  Cpu,
  Zap,
  CheckCircle2
} from "lucide-react";

import { useTheme } from "@/components/ClientLayout";

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  return (
    <main className="min-h-screen pt-24 pb-12 overflow-hidden" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-24 relative">
        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <Cpu size={400} />
        </div>
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--text)" }}
          >
            Building the Future <br />
            <span style={{ color: "var(--accent)" }}>From the Ground Up.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted max-w-2xl mb-10 leading-relaxed"
          >
            At Metkaerox Systems, we're not just building drones. We're engineering the autonomous systems 
            that will safeguard our borders, revolutionize farming, and save lives in disaster zones.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#openings" 
              className="px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.35)] transition-all duration-300 btn-interaction"
              style={{ backgroundColor: "var(--accent)", color: "var(--button-contrast)" }}
            >
              View Openings
            </a>
            <a 
              href="https://www.linkedin.com/company/flymore-drone/" 
              target="_blank"
              className="px-8 py-4 rounded-xl border font-bold text-sm tracking-widest uppercase hover:text-white transition-all duration-300 flex items-center gap-2 btn-interaction"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent)";
                e.currentTarget.style.color = "var(--button-contrast)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--accent)";
              }}
            >
              <Linkedin size={18} /> Follow Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="bg-bg-secondary py-24 mb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Make in India. <br />
                <span className="text-accent">Impact Globally.</span>
              </h2>
              <div className="space-y-6">
                <p className="text-muted leading-relaxed">
                  We are part of the team designing and building drones in India 🇮🇳. Our culture is defined by 
                  relentless innovation, hands-on hardware engineering, and a commitment to solving 
                  real-world problems that matter.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  {benefits.map((benefit, i) => (
                    <motion.div 
                      key={benefit.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col gap-2"
                    >
                      <CheckCircle2 size={20} style={{ color: "var(--accent)" }} />
                      <h4 className="font-bold uppercase tracking-wide text-sm" style={{ color: "var(--text)" }}>{benefit.title}</h4>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-accent/20 shadow-2xl">
              <img 
                src="/products/flyastros.jpg" 
                alt="Working on Drones" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-mono text-xs tracking-widest uppercase">
                  Pune, India // Engineering Base
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="container mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Current <span style={{ color: "var(--accent)" }}>Openings</span>
            </h2>
            <p style={{ color: "var(--text-muted)" }} className="mt-4">Join our growing UAV & robotics team in Pune.</p>
          </div>
          <div className="px-4 py-2 rounded-lg flex items-center gap-2" style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--accent)" }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--accent)" }}></span>
            </span>
            <span className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>We're Hiring</span>
          </div>
        </div>

        <div className="space-y-6">
          {jobOpenings.map((job) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group rounded-3xl transition-all duration-300"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--card-bg)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <div 
                className="p-8 cursor-pointer flex flex-col md:flex-row justify-between items-center gap-6"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: "rgba(var(--accent-rgb), 0.05)", color: "var(--accent)" }}
                  >
                    <Code size={30} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight transition-colors duration-300">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1.5"><MapPin size={12} /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {job.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-accent/20 transition-colors">
                    {job.experience}
                  </span>
                  <div className={cn("transition-transform duration-300", expandedJob === job.id && "rotate-90")}>
                    <ChevronRight size={24} style={{ color: "var(--accent)" }} />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedJob === job.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-4 border-t" style={{ borderColor: "rgba(var(--accent-rgb), 0.1)" }}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                          <div>
                            <h4 style={{ color: "var(--accent)" }} className="text-[0.65rem] font-black uppercase tracking-[0.3em] mb-4">The Role</h4>
                            <p style={{ color: "var(--text-muted)" }} className="leading-relaxed italic">"{job.description}"</p>
                          </div>
                          <div>
                            <h4 style={{ color: "var(--accent)" }} className="text-[0.65rem] font-black uppercase tracking-[0.3em] mb-4">Requirements</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-6 rounded-2xl" style={{ backgroundColor: "rgba(var(--accent-rgb), 0.05)", border: "1px solid rgba(var(--accent-rgb), 0.1)" }}>
                            <h4 style={{ color: "var(--accent)" }} className="text-[0.65rem] font-black uppercase tracking-[0.3em] mb-3">Ideal Candidate</h4>
                            <p className="text-sm italic" style={{ color: "var(--text)" }}>{job.idealFor}</p>
                          </div>
                        </div>
                        <div className="lg:col-span-1">
                          <div className="p-8 rounded-3xl sticky top-24" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--accent)" }}>
                            <h4 className="text-lg font-bold mb-6 uppercase tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--text)" }}>
                              Apply Now
                            </h4>
                            <div className="space-y-4">
                              <a 
                                href="mailto:info@flymoredrone.in" 
                                className="w-full py-4 rounded-xl font-bold text-[0.7rem] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                                style={{ backgroundColor: "var(--accent)", color: "var(--button-contrast)" }}
                              >
                                <Mail size={16} /> Email Application
                              </a>
                              <a 
                                href="https://wa.me/919960585253" 
                                className="w-full py-4 rounded-xl border border-green-500 text-green-500 font-bold text-[0.7rem] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition-all"
                              >
                                <MessageCircle size={16} /> WhatsApp Us
                              </a>
                            </div>
                            <p className="text-[0.6rem] mt-6 text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
                              Send your resume and portfolio referencing the <br />
                              <strong>"{job.title}"</strong> position.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-6 mb-24">
        <div className="p-12 md:p-20 rounded-[40px] relative overflow-hidden text-center" style={{ backgroundColor: "var(--accent)", color: "var(--button-contrast)" }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid-bg w-full h-full" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Don't see a <span style={{ opacity: 0.3 }}>Perfect match?</span>
            </h2>
            <p className="mb-10 text-lg opacity-80" style={{ color: "inherit" }}>
              We are always looking for exceptional talent. If you're passionate about robotics 
              and want to change the world, send us your resume anyway.
            </p>
            <a 
              href="mailto:info@flymoredrone.in" 
              className="px-10 py-5 rounded-2xl font-black text-[0.7rem] tracking-[0.3em] uppercase hover:scale-105 transition-all inline-block btn-interaction"
              style={{ backgroundColor: "var(--button-contrast)", color: "var(--accent)" }}
            >
              General Application
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .bg-card-bg { background-color: var(--card-bg); }
        .text-accent { color: var(--accent); }
        .border-accent { border-color: var(--border); }
        .bg-bg-secondary { background-color: var(--bg-secondary); }
      `,
        }}
      />
    </main>
  );
}
