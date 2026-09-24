import React, { useState, useEffect } from 'react';
import { Target, Briefcase, ShieldCheck, Sliders, DollarSign, Award, Check, Sparkles, ArrowRight } from 'lucide-react';
import { fallbackServices } from '../data/mockData';

const iconMap = {
  Target,
  Briefcase,
  ShieldCheck,
  Sliders,
  DollarSign,
  Award
};

export default function PlaybookServices({ scrollTo }) {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          if (data.services) setServices(data.services);
        }
      } catch (e) {
        console.warn('Services API error, using fallback');
      }
    }
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background Accent glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-extrabold uppercase tracking-widest border border-amber-400/20 mb-3 inline-block">
            Core Offerings
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Oswald'] text-white tracking-tight">
            The <span className="text-amber-400">Playbook</span> & Services
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            High-performance solutions designed for scaling enterprises, executive talent, and complex People Operations.
          </p>
        </div>

        {/* 3-Column Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const IconComponent = iconMap[srv.iconName || srv.icon] || Target;
            return (
              <div
                key={srv.id || idx}
                className="group relative rounded-3xl bg-slate-900/90 border border-slate-800 p-8 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-['Oswald'] text-slate-700 group-hover:text-amber-400 transition-colors">
                      {srv.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-amber-400/50 group-hover:scale-110 transition-all">
                      <IconComponent className="text-amber-400" size={24} />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-black font-['Oswald'] uppercase text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-bold text-sky-400 uppercase tracking-wide mb-4">
                    {srv.subtitle}
                  </p>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6">
                    {srv.features?.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check size={16} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Highlight Metric Badge */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-center">
                    <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                      ⚡ {srv.highlight}
                    </span>
                  </div>

                  <button
                    onClick={() => scrollTo('contact')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    Engage Strategy
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
