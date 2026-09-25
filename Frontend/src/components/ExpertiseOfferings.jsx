import React from 'react';
import { CreditCard, Users, GraduationCap, BarChart3, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedLetters, { AnimatedHeading } from './AnimatedLetters';

export default function ExpertiseOfferings() {
  const categories = [
    {
      title: "PeopleSoft FSCM",
      icon: CreditCard,
      subtitle: "Financials & Supply Chain Management",
      description: "Optimizing core financial accounting, procurement workflows, cash management, and supply chain logistics for enterprise organizations.",
      items: [
        "Accounts Payable",
        "Accounts Receivable",
        "Billing",
        "Expenses",
        "General Ledger",
        "Treasury / Cash Management",
        "Asset Management",
        "Supply Chain Management",
        "Grants Management"
      ]
    },
    {
      title: "PeopleSoft HCM",
      icon: Users,
      subtitle: "Human Capital Management",
      description: "Transforming workforce administration, global payroll execution, time tracking, and benefit administration.",
      items: [
        "Core HR / Workforce Development",
        "Benefits & Compensation Management",
        "Absence Management",
        "Time & Labor",
        "Global Payroll"
      ]
    },
    {
      title: "PeopleSoft Campus Solutions",
      icon: GraduationCap,
      subtitle: "Student & Academic Administration",
      description: "Empowering higher education institutions with unified student records, financial aid rules, and academic advisement.",
      items: [
        "Academic Advisement",
        "Student Administration",
        "Student Financials",
        "Financial Aid"
      ]
    },
    {
      title: "PeopleSoft Reporting",
      icon: BarChart3,
      subtitle: "Analytics, nVision & Kibana",
      description: "Delivering real-time executive visibility, financial matrix reports, and interactive operational dashboards.",
      items: [
        "Kibana Dashboards",
        "nVision Financial Reports",
        "Query & BI Publisher",
        "Operational Analytics"
      ]
    }
  ];

  return (
    <section id="expertise" className="py-20 bg-white border-b border-sky-100 relative overflow-hidden">
      
      {/* SECTION BACKGROUND: Light Grid, Large Blurred Sky-Blue Glow & Moving Dots */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Large Blurred Sky-Blue Glow */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 25, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* Decorative Moving Dots */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }}
            style={{
              top: `${(i * 15) + 10}%`,
              left: `${(i * 12) + 10}%`
            }}
            className="absolute w-2 h-2 rounded-full bg-sky-400/40 blur-[1px]"
          />
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100 px-3.5 py-1 rounded-full border border-sky-200 inline-block">
            ENTERPRISE CAPABILITIES
          </span>
          <AnimatedHeading
            plainText="Our Expertise &"
            highlightText="Capabilities"
            highlightPosition="after"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Inter']"
            as="h2"
            delay={0.1}
          />
          <p className="text-sky-700 text-base sm:text-lg">
            PeopleLabs Consulting provides specialized Oracle and PeopleSoft expertise across enterprise finance, human capital management, higher education, and executive analytics.
          </p>
        </motion.div>

        {/* 2 x 2 Desktop Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-2xl hover:shadow-sky-500/15 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Top Accent Line Animates 0% -> 100% Width Across Card */}
                <span className="absolute top-0 left-0 w-0 h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 group-hover:w-full transition-all duration-500 ease-out" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors shrink-0 shadow-sm"
                    >
                      <IconComponent size={24} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-sky-900 group-hover:text-sky-600 transition-colors font-['Inter']">
                        {cat.title}
                      </h3>
                      <p className="text-xs font-bold text-sky-600">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {cat.description}
                  </p>

                  {/* Capabilities & Checkmarks */}
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-900 block mb-3">
                      Core Capabilities &amp; Modules:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {cat.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                          <div className="w-4.5 h-4.5 rounded-md bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors border border-sky-200">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
