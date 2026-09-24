import React from 'react';
import { ArrowRight, Sparkles, Shield, Trophy, Users, CheckCircle2 } from 'lucide-react';

export default function Hero({ scrollTo }) {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Visual Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 shadow-xl mb-8">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-400" />
            Premier Talent & Executive Search Agency
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase font-['Oswald'] leading-tight mb-6">
          Your Performance, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-sky-400">
            Our Platform.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          Precision in Talent, Excellence in HR Consulting. Bridging the gap between world-class enterprises and top-tier professionals across <span className="text-sky-400 font-semibold">20+ global industries</span>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo('roster')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
          >
            Explore Agent Roster
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo('services')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider text-white bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-850 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            The Playbook (Services)
          </button>
        </div>

        {/* Quick Highlights Badge Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 text-amber-400 mb-1">
              <Trophy size={18} />
              <span className="font-extrabold text-lg text-white font-['Oswald']">500+</span>
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Placements Completed</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 text-sky-400 mb-1">
              <Users size={18} />
              <span className="font-extrabold text-lg text-white font-['Oswald']">20+</span>
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Sectors Represented</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 text-emerald-400 mb-1">
              <Shield size={18} />
              <span className="font-extrabold text-lg text-white font-['Oswald']">98%</span>
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Talent Retention Rate</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 text-amber-400 mb-1">
              <CheckCircle2 size={18} />
              <span className="font-extrabold text-lg text-white font-['Oswald']">$150M+</span>
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Negotiated Compensation</span>
          </div>
        </div>

      </div>
    </section>
  );
}
