import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ContactFooter from '../components/ContactFooter';
import ScrollToTop from '../components/ScrollToTop';
import ThreeCanvas3D from '../components/ThreeCanvas3D';
import AnimatedLetters, { AnimatedHeading } from '../components/AnimatedLetters';
import { servicesList } from '../data/servicesPageData';
import { ChevronRight, CheckCircle2, Shield, Sparkles, Activity, Layers, ArrowRight, Zap, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServicesPage() {
  const [selectedServiceId, setSelectedServiceId] = useState(servicesList[0]?.id || 'managed-app-services');
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const activeService = servicesList.find(s => s.id === selectedServiceId) || servicesList[0] || {};
  const ServiceIcon = activeService.icon || Sparkles;

  const cardsList = activeService.cards || [];
  const overviewText = activeService.bannerDesc || activeService.shortDesc || 'Comprehensive Oracle and PeopleSoft enterprise consulting services.';
  const valueText = activeService.shortDesc || 'Dedicated SLA-based technical and functional service model.';

  // Practice category filtering
  const categoryFilters = [
    { id: 'all', label: 'All Practices' },
    { id: 'managed', label: 'Managed & Technical' },
    { id: 'upgrade', label: 'Upgrades & Cloud' },
    { id: 'infra', label: 'Infrastructure & Training' }
  ];

  const filteredServices = servicesList.filter((srv) => {
    if (activeFilter === 'managed') return srv.id === 'managed-app-services' || srv.id === 'project-management';
    if (activeFilter === 'upgrade') return srv.id === 'peoplesoft-upgrade' || srv.id === 'cloud-migration';
    if (activeFilter === 'infra') return srv.id === 'virtualization-services' || srv.id === 'training-services';
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-['Inter']">
      
      {/* Shared Navbar */}
      <Navbar />

      <main className="pt-32 md:pt-36">
        
        {/* 1. SERVICES HERO WITH 3D CANVAS & METRIC BADGES */}
        <section className="relative bg-gradient-to-b from-sky-100/80 via-sky-50/50 to-white border-b border-sky-100 py-14 md:py-20 overflow-hidden">
          
          {/* 3D Canvas Background */}
          <div className="absolute inset-0 pointer-events-none opacity-60 z-0">
            <ThreeCanvas3D mode="hero" className="w-full h-full" />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <motion.ol 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 text-xs font-bold text-slate-500"
              >
                <li>
                  <Link to="/" className="hover:text-sky-600 transition-colors">Home</Link>
                </li>
                <li>/</li>
                <li className="text-sky-600 font-extrabold" aria-current="page">Services</li>
              </motion.ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Hero Main Copy */}
              <div className="lg:col-span-8 space-y-4">
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  <Sparkles size={14} className="text-sky-500 animate-pulse" />
                  <span>ENTERPRISE SERVICES &amp; PRACTICES</span>
                </motion.div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight font-['Inter']">
                  <AnimatedLetters text="PeopleSoft & Oracle" className="text-slate-900" delay={0.1} /> <br />
                  <AnimatedLetters
                    text="Specialized Practice Scope"
                    className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 bg-clip-text text-transparent"
                    delay={0.35}
                  />
                </h1>

                <motion.p 
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl"
                >
                  PeopleLab Consulting Inc. provides specialized PeopleSoft and Oracle Cloud services designed to help Canadian and global organizations manage, enhance, upgrade, and support their enterprise applications.
                </motion.p>

              </div>

              {/* Floating Stat Badges */}
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-4 space-y-3"
              >
                <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-sky-200 shadow-xl shadow-sky-500/10 flex items-center space-x-3.5">
                  <div className="p-3 rounded-xl bg-sky-500 text-white font-black text-xl shrink-0">
                    6+
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Enterprise Practice Areas</h3>
                    <p className="text-[11px] text-slate-500 font-medium">FSCM, HCM, Campus, Cloud, Virtualization &amp; Training</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-sky-200 shadow-xl shadow-sky-500/10 flex items-center space-x-3.5">
                  <div className="p-3 rounded-xl bg-emerald-500 text-white font-black text-xl shrink-0">
                    100%
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">SLA Commitment</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Structured SLA-based support &amp; 24/7 hypercare</p>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* 2. INTERACTIVE SERVICES EXPLORER WITH ANIMATED TABS & CARDS */}
        <section className="py-12 md:py-18 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* CATEGORY FILTER BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
              {categoryFilters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 relative cursor-pointer ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                        : 'bg-sky-50 text-slate-600 hover:text-sky-600 border border-sky-100'
                    }`}
                  >
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* MOBILE / TABLET SCROLLABLE TABS */}
            <div className="lg:hidden mb-6 overflow-x-auto no-scrollbar flex space-x-2 p-2 bg-sky-50/80 rounded-2xl border border-sky-200">
              {filteredServices.map((srv) => {
                const isSelected = srv.id === selectedServiceId;
                return (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 relative ${
                      isSelected
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-white text-slate-700 hover:text-sky-600'
                    }`}
                  >
                    <span>{srv.name}</span>
                  </button>
                );
              })}
            </div>

            {/* MAIN DESKTOP CONTAINER */}
            <div className="bg-white border-2 border-sky-100 rounded-3xl shadow-xl shadow-sky-500/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
              
              {/* LEFT SIDEBAR NAVIGATION (30% / lg:col-span-4) */}
              <div className="hidden lg:block lg:col-span-4 bg-sky-50/50 border-r border-sky-100 p-6 space-y-4">
                <div className="pb-3 border-b border-sky-100">
                  <h2 className="text-base font-extrabold text-slate-900 font-['Inter']">
                    Enterprise Practice Area
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Select a practice area to view service scope.</p>
                </div>

                <div className="space-y-2.5">
                  {filteredServices.map((srv) => {
                    const isSelected = srv.id === selectedServiceId;
                    const SrvIcon = srv.icon || Sparkles;

                    return (
                      <motion.button
                        key={srv.id}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedServiceId(srv.id)}
                        className={`w-full p-4 rounded-2xl text-left transition-all duration-200 flex items-center justify-between group cursor-pointer relative ${
                          isSelected
                            ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                            : 'bg-white/90 hover:bg-sky-100/70 text-slate-700 border border-sky-100/80'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 z-10">
                          <div className={`p-2.5 rounded-xl shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-600'
                          }`}>
                            <SrvIcon size={18} />
                          </div>
                          <span className="text-xs sm:text-sm font-bold tracking-tight font-['Inter']">
                            {srv.name}
                          </span>
                        </div>

                        <ChevronRight size={16} className={`z-10 transition-transform ${
                          isSelected ? 'translate-x-1 text-white' : 'text-slate-400 group-hover:translate-x-1 group-hover:text-sky-600'
                        }`} />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT CONTENT PANEL (70% / lg:col-span-8) */}
              <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id || 'service-panel'}
                    initial={{ opacity: 0, scale: 0.97, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -15 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    {/* Header Panel matching image-2.png */}
                    <div className="bg-gradient-to-br from-sky-50/90 via-white to-sky-50/40 border-2 border-sky-100 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-md shadow-sky-500/5 relative overflow-hidden space-y-3">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-400 to-sky-600 rounded-l-3xl" />
                      
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-sky-200 text-sky-700 text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                        <ServiceIcon size={14} className="text-sky-500" />
                        <span>PRACTICE OVERVIEW</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Inter']">
                        {activeService.name}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {overviewText}
                      </p>
                    </div>

                    {/* Offerings / Cards Grid with Staggered Entrance */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                        Core Service Scope &amp; Deliverables:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {cardsList.map((card, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.08 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-400 hover:bg-sky-50/40 transition-all duration-200 space-y-1.5 shadow-sm group cursor-pointer"
                          >
                            <div className="flex items-center space-x-2 font-bold text-slate-900 text-xs font-['Inter']">
                              <div className="p-1 rounded-md bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors shrink-0">
                                <CheckCircle2 size={14} />
                              </div>
                              <span className="group-hover:text-sky-600 transition-colors">{card.title}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                              {card.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Key Business Value */}
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-sky-100/50 to-sky-50 border border-sky-200 space-y-1 shadow-sm"
                    >
                      <div className="flex items-center space-x-2 text-sky-800 font-extrabold text-xs">
                        <Shield size={16} className="text-sky-500" />
                        <span>CLIENT VALUE &amp; SLA COMMITMENT</span>
                      </div>
                      <p className="text-xs text-sky-900 leading-relaxed font-medium">
                        {valueText}
                      </p>
                    </motion.div>

                  </motion.div>
                </AnimatePresence>

              </div>

            </div>

          </div>
        </section>

        {/* 3. ANIMATED METHODOLOGY ROADMAP PROCESS */}
        <section className="py-16 bg-sky-50/60 border-t border-b border-sky-100 relative overflow-hidden">
          
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto space-y-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100 px-3.5 py-1 rounded-full border border-sky-200 inline-block">
                DELIVERY METHODOLOGY
              </span>
              <AnimatedHeading
                plainText="How We Deliver"
                highlightText="Results"
                highlightPosition="after"
                className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Inter']"
                as="h2"
                delay={0.1}
              />
              <p className="text-xs sm:text-sm text-slate-600">
                A structured 4-step consulting framework engineered for low risk, on-time delivery, and maximum ROI.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                { step: '01', title: 'Discovery & Analysis', desc: 'Detailed technical audit of your PeopleSoft architecture, customizations, and operational bottlenecks.' },
                { step: '02', title: 'Strategy & Roadmap', desc: 'Formulating a phased implementation or upgrade plan with clear milestone deliverables.' },
                { step: '03', title: 'Execution & Integration', desc: 'Senior certified consultants execute technical development, data migration, and system testing.' },
                { step: '04', title: 'Go-Live & SLA Support', desc: 'Seamless deployment with hypercare support, user training, and 24/7 managed application services.' }
              ].map((st, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-md hover:shadow-2xl hover:shadow-sky-500/15 hover:border-sky-400 transition-all duration-300 space-y-3 relative group cursor-pointer"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-black text-sky-500 uppercase tracking-widest block">
                      Step {st.step}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors flex items-center justify-center font-bold text-xs">
                      {st.step}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors font-['Inter']">
                    {st.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {st.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* 4. FOOTER */}
        <ContactFooter showUpperForm={false} />

      </main>

      {/* Floating Scroll To Top */}
      <ScrollToTop />

    </div>
  );
}
