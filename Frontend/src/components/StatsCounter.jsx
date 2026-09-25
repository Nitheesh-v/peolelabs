import React from 'react';
import { DollarSign, ShieldCheck, TrendingDown, Clock, Building2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsCounter() {
  const stats = [
    {
      icon: DollarSign,
      value: "$1B+",
      label: "Transactions Processed",
      detail: "Trusted to securely process millions in enterprise financial data.",
      color: "from-sky-500 to-sky-600"
    },
    {
      icon: ShieldCheck,
      value: "99.9%",
      label: "SLA Uptime Score",
      detail: "Consistent 24/7 system health across FSCM, HCM & Campus Solutions.",
      color: "from-sky-500 to-emerald-500"
    },
    {
      icon: TrendingDown,
      value: "42%",
      label: "Lower Operating Cost",
      detail: "Automates repetitive PeopleSoft reporting and administrative workflows.",
      color: "from-sky-500 to-sky-600"
    },
    {
      icon: Clock,
      value: "21%",
      label: "Faster Resolution Time",
      detail: "Faster transaction routing, Kibana reporting, and nVision analytics.",
      color: "from-sky-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-sky-50/50 border-y border-sky-100 relative overflow-hidden">
      
      {/* Tech Grid */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles size={14} className="text-sky-500" />
            <span>PROVEN IMPACT ACROSS LOAN &amp; ENTERPRISE OPERATIONS</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Inter']">
            Quantifiable Results for Enterprise Clients
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Delivering measurable capacity, operational speed, and cost efficiency on the PeopleSoft &amp; Oracle platforms banks, universities, and enterprises run on.
          </p>
        </div>

        {/* 4 Kastle-Style Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-white border-2 border-sky-100 hover:border-sky-400 shadow-md hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mb-5 group-hover:bg-sky-500 group-hover:text-white transition-colors shadow-sm">
                    <Icon size={24} />
                  </div>

                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-['Inter'] mb-2 flex items-center gap-1">
                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-2 font-['Inter']">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal pt-2 border-t border-slate-100">
                  {stat.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
