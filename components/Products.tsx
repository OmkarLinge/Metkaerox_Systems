"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { products, type Product } from "@/data/company";

// Refined Sleek Neutral Palette
const themeColors: Record<string, string> = {
  flysurveilx: "var(--bg)",
  flyastros: "var(--bg-secondary)",
  flycleon: "var(--surface-contrast)",
  flygripper: "var(--bg)",
  flyirax: "var(--bg-secondary)",
  flyvarun: "var(--surface-contrast)",
  flyspyder: "var(--bg)",
  firehawks: "var(--bg-secondary)",
};

const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

function InternalMockup({ product, isFront }: { product: Product; isFront: boolean }) {
  const cleanTagline = product.tagline.replace(/\\n/g, " ");

  return (
    <div className="w-full aspect-[16/11] bg-white rounded-[2rem] shadow-xl overflow-hidden relative border border-gray-100 flex flex-col">
      {/* Navbar Mockup - High Contrast */}
      <div className="h-8 px-4 flex items-center justify-between bg-white/40 backdrop-blur-sm z-20 border-b border-gray-100">
         <span className="text-[10px] font-black tracking-tighter text-black uppercase">{product.name}</span>
         <div className="flex items-center gap-2">
            <ShoppingBag size={10} className="text-black/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-black/30" />
         </div>
      </div>

      {/* Content Mockup - Hardened Legibility */}
      <div className="flex-1 px-6 relative flex flex-col justify-center">
         <div className="w-full z-10 space-y-2">
            <h4 className="text-xl font-extrabold text-black leading-tight tracking-tighter uppercase">
               {cleanTagline.split(" ").slice(0, 2).join(" ")}
            </h4>
            <div className="flex gap-1.5">
               <span className="px-2 py-0.5 bg-black text-white text-[7px] font-black uppercase rounded-sm italic">
                  Systems Ready
               </span>
            </div>
            <p className="text-[9px] text-[#18181B] font-bold leading-relaxed max-w-[140px]">
               Metkaerox Industrial Precision System. Active Pulse Logic.
            </p>
         </div>

         {/* Product Image - Restored Size/Position */}
         <div className="absolute right-[-10%] top-0 bottom-0 w-[75%] flex items-center justify-center">
            <div className={`relative w-full h-[80%] transform transition-transform duration-1000 ${isFront ? 'scale-110 translate-x-2' : 'opacity-20 grayscale'}`}>
               <Image 
                 src={product.image}
                 alt={product.name}
                 fill
                 className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                 sizes="300px"
                 priority
               />
            </div>
         </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentProduct = products[activeIndex];

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <motion.section 
      id="products" 
      animate={{ backgroundColor: themeColors[currentProduct.id] || "var(--bg)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="relative py-12 min-h-[95vh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Texture Noise Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: `url("${noiseSvg}")` }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center relative z-10">
        
        {/* Editorial Heading */}
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-6xl font-black text-black leading-none tracking-tighter uppercase"
          >
             OUR <span 
              className="text-white" 
              style={{ WebkitTextStroke: '1.5px #000' }}
             >
                PRODUCTS
             </span>
          </motion.h2>
        </div>

        {/* 5-Card Deck */}
        <div className="relative w-full max-w-[340px] h-[520px] flex items-center justify-center pt-10">
           {products.map((product, i) => {
              let relativeIndex = i - activeIndex;
              if (relativeIndex > products.length / 2) relativeIndex -= products.length;
              if (relativeIndex < -products.length / 2) relativeIndex += products.length;
              
              const isVisible = Math.abs(relativeIndex) <= 2;
              if (!isVisible) return null;

              const isFront = relativeIndex === 0;
              
              return (
                <motion.div
                  key={product.id}
                  style={{ 
                    backgroundColor: "white", 
                    zIndex: 100 - Math.abs(relativeIndex),
                  }}
                  animate={{ 
                    scale: 1 - Math.abs(relativeIndex) * 0.16,
                    x: relativeIndex * 260,
                    rotate: relativeIndex * 6,
                    y: Math.abs(relativeIndex) * 35,
                    opacity: 1 - Math.abs(relativeIndex) * 0.45,
                    filter: isFront ? "none" : `blur(${Math.abs(relativeIndex) * 4}px) grayscale(0.8)`,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 220, 
                    damping: 38,
                  }}
                  className="absolute w-full h-full rounded-[4rem] p-10 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.15)] flex flex-col cursor-pointer border border-gray-100"
                  onClick={() => {
                    if (relativeIndex > 0) nextCard();
                    else if (relativeIndex < 0) prevCard();
                    else nextCard();
                  }}
                >
                  <div className="flex items-center justify-between mb-8">
                     <div 
                        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
                        onClick={(e) => { e.stopPropagation(); prevCard(); }}
                     >
                        <ArrowLeft size={16} />
                     </div>
                     <span className="text-[11px] font-black tracking-widest text-[#18181B] bg-black/5 px-3 py-1 rounded-full uppercase">
                        // {product.category.split(" ")[0]}
                     </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                     <InternalMockup product={product} isFront={isFront} />
                  </div>

                  <div className="mt-10 flex justify-between items-end">
                     <div className="space-y-1">
                        <h3 className="text-3xl font-black text-black leading-tight tracking-tighter uppercase italic">
                           {product.name}
                        </h3>
                        <p className="text-[11px] font-black text-[#52525B] uppercase tracking-widest">
                           Industrial Grade // Fleet
                        </p>
                     </div>
                     <Link href={`/products/${product.id}`} className="group/btn" onClick={(e) => e.stopPropagation()}>
                        <div className="w-14 h-14 rounded-[1.8rem] bg-black text-white flex items-center justify-center group-hover/btn:scale-110 transition-all shadow-2xl shadow-black/30">
                           <ChevronRight size={28} />
                        </div>
                     </Link>
                  </div>
                </motion.div>
              );
           })}
        </div>

        {/* Improved Navigation */}
        <div className="mt-14 flex flex-col items-center gap-10 w-full">
           <div className="flex items-center gap-2">
              {products.map((_, idx) => (
                 <motion.div 
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-1000 ${idx === activeIndex ? 'w-12 bg-black' : 'w-2 bg-black/20'}`}
                 />
              ))}
           </div>

           <div className="flex items-center gap-10">
              <button 
                onClick={prevCard}
                className="relative w-16 h-16 flex items-center justify-center group"
              >
                 <div className="absolute inset-0 bg-black rounded-full scale-[0.85] group-hover:scale-100 transition-all duration-700 shadow shadow-black/20" />
                 <ArrowLeft size={24} className="text-white relative z-10" />
                 
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                   <motion.circle 
                     cx="32" cy="32" r="30" 
                     fill="none" 
                     stroke="currentColor" 
                     strokeWidth="1.2" 
                     className="text-black"
                     strokeDasharray="188.5"
                     animate={{ strokeDashoffset: 188.5 - (188.5 * (activeIndex + 1)) / products.length }}
                     transition={{ duration: 0.8 }}
                   />
                 </svg>
              </button>

              <button 
                onClick={nextCard}
                className="relative w-16 h-16 flex items-center justify-center group"
              >
                 <div className="absolute inset-0 bg-black rounded-full scale-[0.85] group-hover:scale-100 transition-all duration-700 shadow shadow-black/20" />
                 <ArrowRight size={24} className="text-white relative z-10" />
                 
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                   <motion.circle 
                     cx="32" cy="32" r="30" 
                     fill="none" 
                     stroke="currentColor" 
                     strokeWidth="1.2" 
                     className="text-black"
                     strokeDasharray="188.5"
                     animate={{ strokeDashoffset: 188.5 - (188.5 * (activeIndex + 1)) / products.length }}
                     transition={{ duration: 0.8 }}
                   />
                 </svg>
              </button>
           </div>
        </div>
      </div>
    </motion.section>
  );
}
