import React, { useState } from 'react';
import { Landmark, ShieldCheck, GraduationCap, ShoppingBag, Car, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedLetters, { AnimatedHeading } from './AnimatedLetters';

export default function SectorsGrid() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // High-definition enterprise sector imagery from direct reliable CDN sources
  const sectors = [
    {
      title: 'Banking & Financial Services',
      subtitle: 'Core Banking, Treasury & General Ledger',
      icon: Landmark,
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      badge: 'FSCM & Treasury',
      description: 'Streamlining financial management, general ledger accounting, accounts payable, and regulatory compliance for financial institutions.'
    },
    {
      title: 'Insurance Enterprise',
      subtitle: 'Claims Processing & Billing Integration',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      badge: 'Billing & Claims',
      description: 'Automating high-volume policy billing, risk assessment workflows, and claims management in PeopleSoft enterprise systems.'
    },
    {
      title: 'Higher Education',
      subtitle: 'Campus Solutions & Financial Aid',
      icon: GraduationCap,
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
      badge: 'Campus Solutions',
      description: 'Empowering universities and colleges with unified student records, tuition billing, academic advisement, and financial aid.'
    },
    {
      title: 'Retail & E-Commerce',
      subtitle: 'Supply Chain & Inventory Analytics',
      icon: ShoppingBag,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      badge: 'Supply Chain & HCM',
      description: 'Optimizing multi-store inventory procurement, workforce scheduling, global payroll, and supply chain logistics.'
    },
    {
      title: 'Automobile & Manufacturing',
      subtitle: 'Asset Management & Supplier Logistics',
      icon: Car,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      badge: 'Asset & Supplier Mgmt',
      description: 'Enhancing heavy equipment asset tracking, manufacturing operations, supplier contract management, and maintenance.'
    }
  ];

  // Scrolling Sector Images Showcase Carousel Array
  const scrollingSectorImages = [
    { title: 'Banking Operations', url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=600&q=80' },
    { title: 'Insurance Solutions', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80' },
    { title: 'Campus Excellence', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80' },
    { title: 'Retail Supply Chain', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80' },
    { title: 'Automotive Manufacturing', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' },
    { title: 'Global Treasury', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <section id="sectors" className="py-20 bg-sky-50/50 border-b border-sky-100 relative overflow-hidden">
      
      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles size={14} className="text-sky-500" />
            <span>CLIENT SECTORS WE SERVE</span>
          </motion.div>

          <AnimatedHeading
            plainText="Empowering Key"
            highlightText="Enterprise Industries"
            highlightPosition="after"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Inter']"
            as="h2"
            delay={0.1}
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-sky-700 leading-relaxed font-normal"
          >
            PeopleLabs Consulting provides specialized Oracle &amp; PeopleSoft solutions engineered specifically for complex, high-demand industry sectors.
          </motion.p>
        </div>

        {/* 5 SECTOR CARDS GRID WITH DYNAMIC SCROLL ENTRANCE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => {
            const SectorIcon = sector.icon;
            const isHovered = hoveredIdx === index;

            return (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-xl hover:shadow-sky-500/15 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                {/* COMPACT TOP IMAGE CONTAINER */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-900">
                  
                  {/* Sector Image */}
                  <motion.img
                    src={sector.image}
                    alt={sector.title}
                    loading="lazy"
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
                  />

                  {/* Overlay */}
                  <motion.div 
                    animate={{ opacity: isHovered ? 0.4 : 0.25 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-900/40 to-transparent pointer-events-none"
                  />

                  {/* Top Floating Glass Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-sky-800 text-[10px] font-extrabold uppercase tracking-wider shadow-sm border border-white flex items-center gap-1">
                    <SectorIcon size={12} className="text-sky-500" />
                    <span>{sector.badge}</span>
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-slate-800 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Sector Title Overlaid on Image Bottom */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 text-white">
                    <h3 className="text-base font-extrabold tracking-tight font-['Inter'] drop-shadow-md text-white">
                      {sector.title}
                    </h3>
                    <p className="text-[11px] text-sky-200 font-medium truncate">
                      {sector.subtitle}
                    </p>
                  </div>

                </div>

                {/* BOTTOM CONTENT AREA */}
                <div className="p-4 space-y-2.5 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {sector.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-sky-700 group-hover:text-sky-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      <motion.span 
                        animate={{ scale: isHovered ? 1.08 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="p-1 rounded-md bg-sky-50 text-sky-600"
                      >
                        <SectorIcon size={14} />
                      </motion.span>
                      <span>Explore Sector Practice</span>
                    </span>
                    <span className="text-sky-500 font-black">✦</span>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 origin-left"
                />

              </motion.div>
            );
          })}
        </div>

        {/* SCROLLING IMAGES MARQUEE CAROUSEL UNDER SECTORS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mt-14 pt-8 border-t border-sky-200/60"
        >
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block">
              SECTOR VISUAL GALLERY
            </span>
          </div>

          <div className="overflow-hidden select-none py-2 rounded-2xl bg-white/60 border border-sky-100 shadow-inner">
            <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
              {[...scrollingSectorImages, ...scrollingSectorImages].map((imgItem, idx) => (
                <div key={idx} className="inline-block mx-3 group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-sky-200 shrink-0 w-52 h-32">
                  <img 
                    src={imgItem.url} 
                    alt={imgItem.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-transparent to-transparent opacity-90 flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white tracking-wide truncate">
                      {imgItem.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
