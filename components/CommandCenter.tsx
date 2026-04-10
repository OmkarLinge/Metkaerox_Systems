"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  Map as MapIcon, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Wifi, 
  Eye, 
  Crosshair 
} from "lucide-react";
import { useState, useEffect } from "react";

// Minimalist Telemetry Data Generator
const useTelemetry = () => {
  const [stats, setStats] = useState({
    altitude: 124.5,
    speed: 42.8,
    battery: 88,
    signal: 92,
    latency: 18,
    satellites: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        altitude: +(prev.altitude + (Math.random() * 0.4 - 0.2)).toFixed(1),
        speed: +(prev.speed + (Math.random() * 0.6 - 0.3)).toFixed(1),
        battery: Math.max(0, prev.battery - (Math.random() > 0.95 ? 1 : 0)),
        signal: Math.min(100, Math.max(0, prev.signal + (Math.random() * 2 - 1))),
        latency: Math.min(100, Math.max(5, prev.latency + (Math.random() * 4 - 2))),
        satellites: prev.satellites
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return stats;
};

export default function CommandCenter() {
  const stats = useTelemetry();
  const [isLive, setIsLive] = useState(true);

  return (
    <section id="command-center" className="relative py-24 bg-white overflow-hidden">
      {/* Background Grid - Industrial Precision */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 0)', backgroundSize: '48px 48px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - Command Center */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                   Live Mission Stream
                </div>
                <span className="text-[10px] font-bold text-black/20 uppercase tracking-tighter italic">ID: MTX-COMMAND-HUB-01</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-black leading-none tracking-tighter uppercase">
                Intelligence <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #000' }}>Hub</span>
             </h2>
             <p className="text-sm text-[#3F3F46] max-w-lg font-bold uppercase tracking-tight">
                Experience real-time actionable autonomy. Metkaerox systems provide full-stack telemetry and AI-driven mission management.
             </p>
          </div>

          <div className="flex items-center gap-6">
             <div className="text-right">
                <div className="text-[10px] font-black text-black/20 uppercase tracking-widest">Global Status</div>
                <div className="text-2xl font-black text-black tracking-tighter uppercase">Optimal</div>
             </div>
             <div className="w-px h-12 bg-black/5" />
             <div className="text-right">
                <div className="text-[10px] font-black text-black/20 uppercase tracking-widest">Active Units</div>
                <div className="text-2xl font-black text-black tracking-tighter">01.07.25</div>
             </div>
          </div>
        </div>

        {/* Dashboard UI Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
           
           {/* Left Panel: Primary View (Thermal/Map) */}
           <div className="lg:col-span-8 relative bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-2xl group">
              {/* Thermal Vision Overlay Effect */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                 <div className="absolute top-8 left-8 p-4 border-l-2 border-t-2 border-white/40 w-12 h-12" />
                 <div className="absolute top-8 right-8 p-4 border-r-2 border-t-2 border-white/40 w-12 h-12" />
                 <div className="absolute bottom-8 left-8 p-4 border-l-2 border-b-2 border-white/40 w-12 h-12" />
                 <div className="absolute bottom-8 right-8 p-4 border-r-2 border-b-2 border-white/40 w-12 h-12" />
                 
                 <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none" />
                 
                 {/* Scanning Line */}
                 <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-white/20 blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                 />

                 {/* Center Crosshair */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Crosshair size={40} className="text-white/40 font-thin stroke-[0.5]" />
                 </div>
              </div>

              {/* Simulation Placeholder (Could be Video) */}
              <div className="absolute inset-0 bg-[#1A1C1E]">
                 <div className="absolute inset-0 opacity-40 mix-blend-screen bg-gradient-to-tr from-blue-900/40 via-transparent to-transparent" />
                 {/* Minimal Map SVG / Representation */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full opacity-30 p-20">
                       <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/20 stroke-[0.2] fill-none">
                          <rect x="10" y="10" width="80" height="80" />
                          <circle cx="50" cy="50" r="40" />
                          <line x1="10" y1="50" x2="90" y2="50" />
                          <line x1="50" y1="10" x2="50" y2="90" />
                          {/* Pulsing Target Point */}
                          <motion.circle 
                             animate={{ r: [1, 3, 1], opacity: [0.2, 0.8, 0.2] }}
                             transition={{ repeat: Infinity, duration: 2 }}
                             cx="65" cy="35" r="1.5" fill="#51E2F5" 
                           />
                           <motion.circle 
                             animate={{ r: [2, 6, 2], opacity: [0.1, 0.4, 0.1] }}
                             transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                             cx="30" cy="70" r="3" fill="#FFA8B6" 
                           />
                       </svg>
                    </div>
                 </div>
                 
                 {/* Visual UI Elements - Bottom Left */}
                 <div className="absolute bottom-8 left-8 z-20 space-y-4">
                    <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 w-48 shadow-xl">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Sensor Feed</span>
                          <span className="text-[8px] font-bold text-green-400">READY</span>
                       </div>
                       <div className="h-12 w-full flex items-end gap-1 overflow-hidden">
                          {[...Array(24)].map((_, i) => (
                             <motion.div 
                                key={i}
                                animate={{ height: [Math.random()*100+'%', Math.random()*100+'%'] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i*0.05 }}
                                className="w-1 bg-[#51E2F5]/40 rounded-t-[1px]" 
                             />
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Top Right: Status Info */}
                 <div className="absolute top-8 right-8 z-20 text-right">
                    <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Satellite Link</div>
                    <div className="flex items-center justify-end gap-2">
                       <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                             <div key={i} className={`w-1.5 h-3 ${i < 4 ? 'bg-[#51E2F5]' : 'bg-white/10'} rounded-sm`} />
                          ))}
                       </div>
                       <span className="text-xl font-black text-white leading-none">88<span className="text-xs">%</span></span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Panel: Side Telemetry / Modules */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Telemetry Module */}
              <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-[40px] -z-10" />
                 
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[12px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                       <Activity size={14} className="text-[#51E2F5]" />
                       Telemetry Modules
                    </h3>
                    <div className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase rounded-[2px]">Secured</div>
                 </div>

                 <div className="space-y-6">
                    {/* Stat Item */}
                    <div className="flex items-end justify-between border-b border-gray-50 pb-4">
                       <div>
                          <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em]">Relative Altitude</p>
                          <h4 className="text-3xl font-black text-black tracking-tighter italic">{stats.altitude}</h4>
                       </div>
                       <span className="text-[10px] font-black text-black uppercase tracking-widest italic flex items-center gap-1">
                          meters <Zap size={10} className="text-yellow-400" />
                       </span>
                    </div>

                    <div className="flex items-end justify-between border-b border-gray-100 pb-4">
                       <div>
                          <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em]">Ground Speed</p>
                          <h4 className="text-3xl font-black text-black tracking-tighter italic">{stats.speed}</h4>
                       </div>
                       <span className="text-[10px] font-black text-black uppercase tracking-widest italic flex items-center gap-1">
                          km/h <ShieldCheck size={10} className="text-[#51E2F5]" />
                       </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-4">
                       <div>
                          <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em]">Signal Strength</p>
                          <div className="flex items-center gap-3">
                             <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div 
                                   animate={{ width: stats.signal + '%' }}
                                   className="h-full bg-black rounded-full" 
                                />
                             </div>
                             <span className="text-xs font-black text-black">{stats.signal}%</span>
                          </div>
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em]">Latency</p>
                          <div className="flex items-center gap-3">
                             <span className="text-xs font-black text-black">{stats.latency}ms</span>
                             <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div 
                                   animate={{ width: stats.latency + '%' }}
                                   className="h-full bg-red-400 rounded-full" 
                                />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                          <Cpu size={18} className="text-black/40" />
                       </div>
                       <div className="flex-1">
                          <div className="text-[8px] font-black text-black/20 uppercase tracking-widest">Main CPU Load</div>
                          <div className="flex items-center justify-between">
                             <span className="text-xs font-black text-black italic">Active Process: SLAM-V3</span>
                             <span className="text-xs font-black text-[#51E2F5]">22%</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Botton Action Module */}
              <button className="h-24 bg-black rounded-[1.8rem] flex items-center justify-between px-8 text-white hover:scale-[1.02] transition-all group active:scale-95 shadow-2xl">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    </div>
                    <div className="text-left">
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Manual Override</p>
                       <h4 className="text-lg font-black tracking-tighter uppercase italic">Neutralize Stream</h4>
                    </div>
                 </div>
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Eye size={20} className="text-white" />
                 </div>
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}
