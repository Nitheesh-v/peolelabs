import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ContactFooter from '../components/ContactFooter';
import ScrollToTop from '../components/ScrollToTop';
import PeopleLabLogo from '../components/PeopleLabLogo';
import ThreeCanvas3D from '../components/ThreeCanvas3D';
import AnimatedLetters, { AnimatedHeading } from '../components/AnimatedLetters';
import { 
  Landmark, Users, GraduationCap, Cloud, ShieldCheck, ShoppingBag, Car, 
  MapPin, ArrowRight, Layers, Sparkles, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'About Us | PeopleLab Consulting Inc.';
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-['Inter']">
      
      {/* Shared Navbar */}
      <Navbar />

      <main className="pt-[92px]">
        
        {/* ================================================== */}
        {/* 1. ABOUT HERO WITH 3D CANVAS ANIMATION */}
        {/* ================================================== */}
        <section className="relative bg-gradient-to-b from-sky-100/70 via-sky-50/40 to-white border-b border-sky-100 py-12 md:py-16 min-h-[420px] flex items-center overflow-hidden">
          
          {/* 3D Canvas Background */}
          <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
            <ThreeCanvas3D mode="hero" className="w-full h-full" />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Eyebrow */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider"
                >
                  <Sparkles size={14} className="text-sky-500" />
                  <span>ABOUT PEOPLELAB</span>
                </motion.div>

                {/* H1 */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight font-['Inter']">
                  <AnimatedLetters text="Oracle Expertise." className="text-slate-900" delay={0.1} /> <br />
                  <AnimatedLetters
                    text="Built Around Your Business."
                    className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 bg-clip-text text-transparent"
                    delay={0.35}
                  />
                </h1>

                {/* Supporting Text */}
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl"
                >
                  Founded in 2016 in Edmonton, Alberta, PeopleLab Consulting Inc. provides Oracle and PeopleSoft consulting services designed around the unique technology requirements of Canadian and global enterprise organizations.
                </motion.p>

                {/* Primary CTA Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/services"
                      className="px-7 py-3.5 rounded-xl text-base font-bold text-white bg-sky-500 hover:bg-sky-600 transition-all shadow-md inline-flex items-center gap-2 group active:scale-95"
                    >
                      <span>Explore Our Capabilities</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-sky-500 shrink-0" />
                    Serving Canadian enterprise organizations since 2016
                  </span>
                </motion.div>

              </div>

              {/* Right Column: Official Logo Visual Component */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-full max-w-md bg-white border-2 border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-500/10 space-y-6 relative">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <PeopleLabLogo size="md" animated={true} />
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-extrabold border border-sky-200">
                      Est. 2016
                    </span>
                  </div>

                  {/* Connected Enterprise Modules Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center space-x-2.5"
                    >
                      <Layers size={18} className="text-sky-600 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">PeopleSoft FSCM</span>
                        <span className="text-[10px] text-slate-500">Finance &amp; Supply</span>
                      </div>
                    </motion.div>

                    <motion.div 
                      animate={{ y: [0, -7, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                      className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center space-x-2.5"
                    >
                      <Users size={18} className="text-sky-600 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">PeopleSoft HCM</span>
                        <span className="text-[10px] text-slate-500">Human Capital</span>
                      </div>
                    </motion.div>

                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                      className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center space-x-2.5"
                    >
                      <GraduationCap size={18} className="text-sky-600 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Campus Solutions</span>
                        <span className="text-[10px] text-slate-500">Higher Education</span>
                      </div>
                    </motion.div>

                    <motion.div 
                      animate={{ y: [0, -7, 0] }}
                      transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                      className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center space-x-2.5"
                    >
                      <Cloud size={18} className="text-sky-600 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Oracle Cloud</span>
                        <span className="text-[10px] text-slate-500">Cloud Applications</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sky-500 text-white text-xs font-medium flex items-center justify-between shadow-sm">
                    <span className="text-white flex items-center gap-1.5 font-bold">
                      <Sparkles size={14} className="text-sky-200" />
                      Services &amp; Training
                    </span>
                    <span className="text-[10px] font-extrabold text-sky-800 bg-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">Managed Services</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ================================================== */}
        {/* 2. GET TO KNOW PEOPLELAB */}
        {/* ================================================== */}
        <section className="py-16 md:py-20 bg-white border-b border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Official Logo Card */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-full max-w-md bg-gradient-to-br from-sky-50 via-white to-sky-100/50 border-2 border-sky-100 rounded-3xl p-8 shadow-md relative overflow-hidden space-y-6">
                  
                  <PeopleLabLogo size="lg" animated={true} />

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      PeopleLab Consulting Inc.
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Delivering consistent service and meaningful business value across Oracle and PeopleSoft platforms.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center space-x-3 text-slate-700">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sky-600 shrink-0 shadow-sm">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Edmonton, Alberta, Canada</span>
                      <span className="text-[11px] text-slate-500">Corporate Headquarters</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Company Content */}
              <div className="lg:col-span-7 space-y-6">
                
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 inline-block mb-2">
                    GET TO KNOW US
                  </span>
                  <AnimatedHeading
                    plainText="Get to Know"
                    highlightText="PeopleLab Consulting Inc."
                    highlightPosition="after"
                    className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                    as="h2"
                    delay={0.1}
                  />
                </div>

                {/* Paragraphs with Vertical Accent Line */}
                <div className="relative pl-5 border-l-3 border-sky-500 space-y-4 text-slate-600 text-base leading-relaxed">
                  <p>
                    Founded in 2016 in Edmonton, Alberta, PeopleLab Consulting Inc. provides high-quality IT services to organizations across a range of industries. Our team brings experience across Oracle technologies, including PeopleSoft FSCM, PeopleSoft HCM, PeopleSoft Campus Solutions, and Oracle Cloud.
                  </p>

                  <p>
                    We understand that every organization has unique IT requirements. That is why we work closely with our clients to develop solutions aligned with their specific business and technology needs.
                  </p>

                  <p>
                    With knowledge spanning Oracle applications, technology, managed services, and training, PeopleLab Consulting Inc. focuses on delivering consistent service and meaningful business value.
                  </p>
                </div>

                {/* Edmonton Location Tag */}
                <div className="pt-2 flex items-center space-x-2 text-sm font-bold text-slate-900">
                  <MapPin size={18} className="text-sky-500" />
                  <span>Edmonton, Alberta, Canada</span>
                </div>

              </div>

            </div>
          </div>
        </section>


        {/* ================================================== */}
        {/* 3. WHAT WE DO / OUR EXPERTISE */}
        {/* ================================================== */}
        <section className="py-16 bg-sky-50/60 border-b border-sky-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 inline-block">
                OUR EXPERTISE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Technology Expertise That Supports Your Business
              </h2>
              <p className="text-slate-600 text-base">
                Our experience spans key Oracle and PeopleSoft technologies, managed services, and training.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {[
                { title: 'PeopleSoft FSCM', desc: 'Support for financial and supply chain processes across PeopleSoft applications.', icon: Landmark },
                { title: 'PeopleSoft HCM', desc: 'PeopleSoft capabilities supporting human capital management and workforce processes.', icon: Users },
                { title: 'PeopleSoft Campus Solutions', desc: 'PeopleSoft expertise supporting higher education administration and student-focused processes.', icon: GraduationCap },
                { title: 'Oracle Cloud', desc: 'Oracle Cloud expertise supporting evolving enterprise technology requirements.', icon: Cloud }
              ].map((card, idx) => {
                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    whileHover={{ y: -5 }}
                    className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm hover:border-sky-400 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                        <CardIcon size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

            </div>

            {/* View All Services Link */}
            <div className="text-center pt-10">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-base font-bold text-sky-600 hover:text-sky-700 transition-colors group"
              >
                <span>View All Services</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </section>


        {/* ================================================== */}
        {/* 4. INDUSTRIES WE UNDERSTAND */}
        {/* ================================================== */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 inline-block">
                INDUSTRY EXPERIENCE
              </span>
              <AnimatedHeading
                plainText="Experience Across"
                highlightText="Diverse Sectors"
                highlightPosition="after"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                as="h2"
                delay={0.1}
              />
              <p className="text-slate-600 text-base">
                PeopleLab Consulting Inc.'s team has experience working across multiple Canadian &amp; global sectors.
              </p>
            </div>

            {/* 5 Sectors Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'Banking', icon: Landmark },
                { name: 'Insurance', icon: ShieldCheck },
                { name: 'Higher Education', icon: GraduationCap },
                { name: 'Retail', icon: ShoppingBag },
                { name: 'Automobile', icon: Car }
              ].map((sec, idx) => {
                const SecIcon = sec.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="bg-white border-2 border-slate-100 rounded-2xl p-5 text-center hover:border-sky-400 transition-colors space-y-3"
                  >
                    <div className="w-10 h-10 mx-auto rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <SecIcon size={20} />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {sec.name}
                    </h3>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* 5. SHARED FOOTER */}
        {/* ================================================== */}
        <ContactFooter showUpperForm={false} />

      </main>

      {/* Floating Back to Top Button */}
      <ScrollToTop />

    </div>
  );
}
