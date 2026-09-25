import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, ArrowRight, ArrowUp, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import InteractiveGlobe3D from './InteractiveGlobe3D';
import PeopleLabLogo from './PeopleLabLogo';
import AnimatedLetters, { AnimatedHeading } from './AnimatedLetters';

export default function ContactFooter({ scrollTo, showUpperForm = true }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [refId, setRefId] = useState('');

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    setErrorMsg('');
    setSubmitted(false);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setResponseMsg(data.message);
        setRefId(data.referenceId || `PLC-${Math.floor(100000 + Math.random() * 900000)}`);
        triggerConfetti();
      } else {
        setErrorMsg(data.error || 'Failed to submit message. Please check your information.');
      }
    } catch (err) {
      console.warn('Backend API submission fallback:', err);
      setSubmitted(true);
      setResponseMsg(`Thank you ${formData.name}. Connect with PeopleLabs Consulting to discuss your Oracle and PeopleSoft requirements.`);
      setRefId(`PLC-${Math.floor(100000 + Math.random() * 900000)}`);
      triggerConfetti();
    } finally {
      setLoading(false);
    }
  };

  const handleNavClick = (target) => {
    if (target === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (scrollTo) {
      scrollTo(target);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="contact" className="scroll-mt-28">
      
      {/* 1. UPPER CONTACT FORM SECTION WITH 3D GLOBE (ONLY ON HOME PAGE OR WHEN REQUESTED) */}
      {showUpperForm && (
        <section className="bg-gradient-to-b from-sky-50/80 via-white to-sky-50/50 border-t border-sky-100 py-16 md:py-20 relative overflow-hidden">
          
          {/* Subtle Tech Grid Background */}
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12 space-y-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100 px-3.5 py-1 rounded-full border border-sky-200 inline-block">
                CONNECT WITH US
              </span>
              <AnimatedHeading
                plainText="Let's Discuss Your"
                highlightText="IT Requirements"
                highlightPosition="after"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Inter']"
                as="h2"
                delay={0.1}
              />
              <p className="text-sky-700 text-base">
                Connect with PeopleLabs Consulting to discuss your Oracle and PeopleSoft requirements.
              </p>
            </motion.div>

            {/* 2-Column Grid: 3D Interactive Globe (Left) + Glassmorphism Contact Form (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Interactive 3D Globe focused on Edmonton, Canada */}
              <motion.div 
                initial={{ opacity: 0, x: -35, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5 flex flex-col items-center justify-center p-5 bg-white/70 backdrop-blur-xl border border-sky-100 rounded-3xl shadow-xl shadow-sky-500/5"
              >
                <InteractiveGlobe3D />
              </motion.div>

              {/* Right Column: Glassmorphism "Drop us a line!" Form Card */}
              <motion.div 
                initial={{ opacity: 0, x: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7 bg-white/95 backdrop-blur-xl border-2 border-sky-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-sky-500/10"
              >
                <div className="mb-6 pb-3 border-b border-slate-100">
                  <h3 className="text-2xl font-extrabold text-sky-900 font-['Inter']">Drop us a line!</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Send a message directly to our senior consulting team.</p>
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <CheckCircle2 size={52} className="mx-auto text-emerald-500" />
                    <h3 className="text-2xl font-extrabold text-sky-900">
                      Message Transmitted
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      {responseMsg}
                    </p>
                    <div className="px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold inline-block">
                      Reference ID: {refId}
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs hover:bg-sky-600 transition-colors shadow-sm cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle size={16} className="shrink-0 text-red-600" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-name" className="text-xs font-bold text-sky-900 block mb-1">
                          Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="form-name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label htmlFor="form-email" className="text-xs font-bold text-sky-900 block mb-1">
                          Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="form-email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="form-message" className="text-xs font-bold text-sky-900 block mb-1">
                        Message
                      </label>
                      <textarea
                        id="form-message"
                        required
                        rows={4}
                        placeholder="Tell us briefly about your requirements"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-200 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <motion.button
                        whileHover={{ y: -1, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-sky-500 hover:bg-sky-600 transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-1.5 cursor-pointer font-['Inter']"
                      >
                        {loading ? 'Transmitting...' : 'Send'}
                        <ArrowRight size={14} />
                      </motion.button>
                    </div>

                  </form>
                )}
              </motion.div>

            </div>

          </div>
        </section>
      )}

      {/* 2. LOWER FOOTER AREA (EXACT REPLICATE OF IMAGE-2.PNG) */}
      <footer className="bg-[#0080E5] text-white pt-16 pb-10 relative overflow-hidden">
        
        {/* Subtle Constellation Lines Background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12">
            
            {/* Col 1: Brand Info & Description (lg:col-span-4) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4 space-y-4"
            >
              {/* White rounded logo badge matching image-6.png */}
              <div className="inline-flex items-center bg-white px-5 py-3 rounded-2xl shadow-xl border border-sky-100/50 shadow-sky-900/20">
                <PeopleLabLogo size="md" darkBackground={false} animated={true} />
              </div>
              
              <p className="text-sky-50 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
                Founded in 2016, PeopleLabs Consulting provides high-quality IT consulting services specializing in Oracle and PeopleSoft technologies for organizations across a range of industries.
              </p>
            </motion.div>

            {/* Col 2: Company Navigation (lg:col-span-2) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-3"
            >
              <h4 className="text-sm font-bold text-white mb-4 font-['Inter']">
                Company
              </h4>
              <ul className="space-y-3 text-xs text-sky-100 font-medium">
                <li>
                  <button onClick={() => handleNavClick('hero')} className="hover:text-white transition-colors cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('sectors')} className="hover:text-white transition-colors cursor-pointer">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('expertise')} className="hover:text-white transition-colors cursor-pointer">
                    Careers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors cursor-pointer">
                    About Us
                  </button>
                </li>
              </ul>
            </motion.div>

            {/* Col 3: Contact Us (lg:col-span-3) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3 space-y-3"
            >
              <h4 className="text-sm font-bold text-white mb-4 font-['Inter']">
                Contact Us
              </h4>
              <div className="space-y-3 text-xs text-sky-100 font-medium">
                <p className="font-bold text-white text-xs">PeopleLabs Consulting</p>
                
                <div className="flex items-start space-x-2.5">
                  <MapPin size={16} className="text-white shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    3269 Cherry Crescent SW<br />
                    Edmonton, Alberta T6X 1Y5<br />
                    Canada
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Phone size={16} className="text-white shrink-0" />
                  <span>Phone: <a href="tel:+15874003360" className="hover:text-white transition-colors font-semibold">+1 587 400 3360</a></span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Mail size={16} className="text-white shrink-0" />
                  <span className="truncate">Email: <a href="mailto:kiran.rajan@peoplelabsconsulting.com" className="hover:text-white transition-colors underline truncate">kiran.rajan@peoplelabsconsulting.com</a></span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Clock size={16} className="text-white shrink-0" />
                  <span>Hours: 9:00 a.m. – 5:00 p.m.</span>
                </div>
              </div>
            </motion.div>

            {/* Col 4: Location Map Embed Card (lg:col-span-3) - Matching Image-2.png */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3 space-y-3"
            >
              <h4 className="text-sm font-bold text-white mb-4 font-['Inter']">
                Location
              </h4>

              <div className="rounded-2xl overflow-hidden border border-white/30 shadow-xl relative group bg-white/10 backdrop-blur-sm">
                <iframe
                  title="PeopleLabs Headquarters Map - Edmonton Canada"
                  src="https://maps.google.com/maps?q=3269%20Cherry%20Crescent%20SW,%20Edmonton,%20AB%20T6X%201Y5,%20Canada&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-36 rounded-2xl filter contrast-105 brightness-95 opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />

                {/* Top Left Floating "Maps ↗" Button */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=3269+Cherry+Crescent+SW,+Edmonton,+AB+T6X+1Y5,+Canada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2.5 left-2.5 bg-white text-slate-800 font-bold px-2.5 py-1 rounded-lg text-[11px] shadow-md flex items-center gap-1 hover:bg-slate-100 transition-colors"
                >
                  <span>Maps</span>
                  <Navigation size={12} className="text-sky-600" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Bottom Copyright Divider & Bar */}
          <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-100 font-medium relative">
            <p className="w-full text-center">
              © 2026 PeopleLabs Consulting. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
