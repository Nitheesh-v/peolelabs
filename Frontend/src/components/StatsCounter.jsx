import React from 'react';
import { Award, Globe, Building2, TrendingUp, DollarSign } from 'lucide-react';

export default function StatsCounter() {
  const stats = [
    {
      icon: Award,
      value: "500+",
      label: "Executive Placements",
      detail: "Top 1% C-Suite, VP & Senior Technical Roles",
      color: "from-amber-400 to-amber-600"
    },
    {
      icon: Building2,
      value: "20+",
      label: "Industries Served",
      detail: "From AI & Quant Trading to BioTech & Hardware",
      color: "from-sky-400 to-sky-600"
    },
    {
      icon: Globe,
      value: "30+",
      label: "Global Reach",
      detail: "Cross-border recruiting in US, UK, EU & Asia",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "12-Mo Retention",
      detail: "Unmatched match quality & long-term retention",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      icon: DollarSign,
      value: "$150M+",
      label: "Negotiated Equity & Packages",
      detail: "Maximizing client value and executive retention",
      color: "from-amber-300 to-yellow-500"
    }
  ];

  return (
    <section className="py-20 bg-slate-900/80 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase font-['Oswald'] text-white tracking-tight">
            Proven Metrics in <span className="text-amber-400">The Arena</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Quantifiable results delivered for Fortune 500 enterprises and high-growth venture-backed unicorns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="text-amber-400" size={24} />
                  </div>
                  <div className={`text-4xl font-black font-['Oswald'] bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-white mb-2">
                    {stat.label}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
