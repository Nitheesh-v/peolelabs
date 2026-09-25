import React, { useState } from 'react';
import { Database, Users, GraduationCap, Cloud, ChevronRight, CheckCircle2, ShieldCheck, Activity, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlaybookServices() {
  const [activeTab, setActiveTab] = useState(0);

  const practices = [
    {
      id: 'fscm',
      title: 'Loan & FSCM Financial Agent',
      subtitle: 'Financials & Supply Chain Automation',
      icon: Database,
      tag: '24/7 Financials',
      description: 'Resolves financial voucher inquiries, automates accounts payable workflows, treasury cash forecasting, and posts general ledger entries with zero human error.',
      features: [
        'Automated Voucher & Invoice Processing',
        'Real-time Cash Flow & Treasury Forecasting',
        'General Ledger Ledger Validation',
        'Audit-ready Financial Reporting'
      ],
      liveStatus: {
        agentName: 'FSCM Financials Engine',
        status: 'System Operational',
        action: 'Processing GL Vouchers & Cash Sync...',
        throughput: '$465,469.86 Today (+4.2%)',
        handleTime: '1m 45s (-12% Faster)'
      }
    },
    {
      id: 'hcm',
      title: 'HCM Workforce Agent',
      subtitle: 'Human Capital & Global Payroll',
      icon: Users,
      tag: 'Workforce AI',
      description: 'Streamlines workforce onboarding, absence requests, global payroll run validations, and benefits administration across complex multi-regional operations.',
      features: [
        'Global Payroll Pre-Run Validation',
        'Automated Absence & Time Approvals',
        'Workforce Onboarding & Offboarding',
        'Benefit Enrollment Verification'
      ],
      liveStatus: {
        agentName: 'HCM Workforce Engine',
        status: 'Active Syncing',
        action: 'Validating Global Payroll Run...',
        throughput: '12,450 Active Employees',
        handleTime: '0m 52s (-28% Faster)'
      }
    },
    {
      id: 'campus',
      title: 'Campus Solutions Agent',
      subtitle: 'Student & Academic Administration',
      icon: GraduationCap,
      tag: 'Higher Education',
      description: 'Empowers higher education institutions with automated student enrollment, tuition fee billing, academic transcript processing, and financial aid rules.',
      features: [
        'Automated Student Registration & Holds',
        'Financial Aid Rule Calculation',
        'Academic Transcript Generation',
        'Tuition Fee & Billing Management'
      ],
      liveStatus: {
        agentName: 'Campus Solutions Engine',
        status: 'System Operational',
        action: 'Processing Academic Records...',
        throughput: '8,920 Student Requests',
        handleTime: '1m 10s (-18% Faster)'
      }
    },
    {
      id: 'cloud',
      title: 'Oracle Cloud & Reporting Agent',
      subtitle: 'Analytics, nVision & Kibana',
      icon: Cloud,
      tag: 'Executive Analytics',
      description: 'Delivers real-time executive visibility, automated nVision financial matrix generation, Kibana operational dashboards, and seamless cloud data migration.',
      features: [
        'Real-time Kibana Operational Dashboards',
        'nVision Financial Matrix Generation',
        'Automated Query & BI Publisher Reports',
        'Seamless Cloud Data Migration'
      ],
      liveStatus: {
        agentName: 'Oracle Analytics Engine',
        status: 'Live Analytics',
        action: 'Generating Executive nVision Matrix...',
        throughput: '99.9% Data Sync Uptime',
        handleTime: '0m 35s (-42% Faster)'
      }
    }
  ];

  const current = practices[activeTab];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 bg-white border-b border-sky-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles size={14} className="text-sky-500" />
            <span>SPECIALIZED ENTERPRISE PRACTICE</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Inter']">
            Specialized Practice Solutions for Every Department
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Takes on routine enterprise work with compliance built in and complete auditability across your existing workflows.
          </p>
        </div>

        {/* Kastle.ai Style Tab Selector & Live Workflow Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Tab List (40% width) */}
          <div className="lg:col-span-5 space-y-3">
            {practices.map((p, idx) => {
              const isSelected = activeTab === idx;
              const IconComp = p.icon;

              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500 text-white border-sky-500 shadow-xl shadow-sky-500/20 scale-[1.02]'
                      : 'bg-white text-slate-800 border-sky-100 hover:border-sky-300 hover:bg-sky-50/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white text-sky-600' : 'bg-sky-100 text-sky-600'
                    }`}>
                      <IconComp size={22} />
                    </div>
                    <div>
                      <h3 className={`text-base font-extrabold font-['Inter'] ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {p.title}
                      </h3>
                      <p className={`text-xs ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                        {p.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={20} className={isSelected ? 'text-white' : 'text-slate-400 group-hover:text-sky-600 transition-colors'} />
                </button>
              );
            })}
          </div>

          {/* Right Live Operational Inspector Panel (60% width) */}
          <div className="lg:col-span-7 bg-white border-2 border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-500/10 flex flex-col justify-between space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Header Banner */}
                <div className="flex items-center justify-between pb-4 border-b border-sky-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                      <CurrentIcon size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 font-['Inter']">
                        {current.title}
                      </h3>
                      <span className="text-xs font-bold text-sky-600">
                        {current.tag}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1.5 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {current.liveStatus.status}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {current.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                    Key Automated Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 size={16} className="text-sky-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kastle.ai Style Live Metrics Simulator Banner */}
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Activity size={16} className="text-sky-600 animate-pulse" />
                      {current.liveStatus.agentName}
                    </span>
                    <span className="text-sky-700">{current.liveStatus.action}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-sky-200/60 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Daily Throughput</span>
                      <span className="font-extrabold text-slate-900">{current.liveStatus.throughput}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Avg SLA Handle Time</span>
                      <span className="font-extrabold text-sky-600">{current.liveStatus.handleTime}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
              <span>Ready to deploy {current.title}?</span>
              <a href="#contact" className="flex items-center gap-1 hover:text-sky-700 transition-colors group">
                <span>Book a Demo</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
