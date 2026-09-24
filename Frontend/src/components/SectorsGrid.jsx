import React, { useState, useEffect } from 'react';
import { Cpu, TrendingUp, Activity, Wrench, ShoppingBag, Truck, Layers, ArrowUpRight } from 'lucide-react';
import { fallbackSectors } from '../data/mockData';

const iconMap = {
  Cpu,
  TrendingUp,
  Activity,
  Wrench,
  ShoppingBag,
  Truck
};

export default function SectorsGrid({ scrollTo }) {
  const [sectors, setSectors] = useState(fallbackSectors);

  useEffect(() => {
    async function fetchSectors() {
      try {
        const res = await fetch('/api/sectors');
        if (res.ok) {
          const data = await res.json();
          if (data.sectors) setSectors(data.sectors);
        }
      } catch (e) {
        console.warn('Sectors API error, using fallback');
      }
    }
    fetchSectors();
  }, []);

  return (
    <section id="sectors" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-extrabold uppercase tracking-widest border border-sky-500/20 mb-3 inline-block">
            Domain Precision
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Oswald'] text-white tracking-tight">
            Key Sectors <span className="text-sky-400">We Command</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Deep specialized networks across critical industries, delivering specialized leaders with proven domain expertise.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sec, idx) => {
            const IconComponent = iconMap[sec.iconName || sec.icon] || Layers;
            return (
              <div
                key={sec.id || idx}
                className="group relative rounded-2xl bg-slate-950 border-t-4 border-t-sky-500 border-x border-b border-slate-800 p-8 hover:-translate-y-1 hover:border-t-amber-400 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Placement Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:border-sky-500/50 transition-all">
                      <IconComponent className="text-sky-400 group-hover:text-amber-400 transition-colors" size={28} />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 uppercase font-semibold block">Placements</span>
                      <span className="text-xl font-black font-['Oswald'] text-amber-400">{sec.placementsCount}</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-black font-['Oswald'] uppercase text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {sec.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    {sec.tagline}
                  </p>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {sec.description}
                  </p>

                  {/* Top Roles Placed */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-6">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
                      Key Roles Scouted
                    </span>
                    <ul className="space-y-1.5">
                      {sec.topRoles?.map((role, rIdx) => (
                        <li key={rIdx} className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => scrollTo('roster')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 hover:text-white hover:bg-sky-500 hover:border-sky-500 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  View Sector Specialists
                  <ArrowUpRight size={16} />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
