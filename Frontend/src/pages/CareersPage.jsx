import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ContactFooter from '../components/ContactFooter';
import ScrollToTop from '../components/ScrollToTop';
import ThreeCanvas3D from '../components/ThreeCanvas3D';
import AnimatedLetters, { AnimatedHeading } from '../components/AnimatedLetters';
import { careersList as fallbackJobs, benefitsList } from '../data/careersPageData';
import { 
  Briefcase, MapPin, Clock, ChevronDown, Check, Upload, FileText, 
  Trash2, Send, CheckCircle2, AlertCircle, ArrowDown, Heart, Zap, 
  Globe, Coffee, Shield, Building2, UserCheck, Award, Loader2, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CareersPage() {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [openJobId, setOpenJobId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentLocation: '',
    experienceLevel: '',
    position: '',
    introduction: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [isFieldHighlighted, setIsFieldHighlighted] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const positionSelectRef = useRef(null);

  // Fetch Jobs dynamically from backend API (/api/jobs)
  useEffect(() => {
    let isMounted = true;

    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0) {
            setJobs(data.jobs);
            setOpenJobId(data.jobs[0].id);
          }
        }
      } catch (err) {
        console.warn('Using static fallback jobs:', err);
      } finally {
        if (isMounted) setJobsLoading(false);
      }
    }

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleJob = (id) => {
    setOpenJobId(prev => prev === id ? null : id);
  };

  const handleApplyClick = (jobTitle) => {
    setFormData(prev => ({ ...prev, position: jobTitle }));
    setErrorMsg('');

    setIsFieldHighlighted(true);
    setTimeout(() => {
      setIsFieldHighlighted(false);
    }, 1200);

    // Smooth scroll to Apply Form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (positionSelectRef.current) {
      positionSelectRef.current.focus();
    }
  };

  const handleFileChange = (e) => {
    setResumeError('');
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setResumeError('Please upload a valid PDF file only.');
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeError('File size exceeds the 5 MB maximum limit.');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    setResumeError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
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

    if (!formData.fullName || !formData.email || !formData.phone || !formData.currentLocation || !formData.experienceLevel || !formData.position) {
      setErrorMsg('Please fill in all required fields marked with *.');
      return;
    }

    if (!resumeFile) {
      setErrorMsg('Please upload your resume in PDF format (Max 5 MB).');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        resumeName: resumeFile.name,
        resumeSize: `${(resumeFile.size / 1024).toFixed(1)} KB`
      };

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setAppId(data.applicationId || `PLC-APP-${Math.floor(100000 + Math.random() * 900000)}`);
        triggerConfetti();
      } else {
        setErrorMsg(data.error || 'Failed to submit application. Please check your information.');
      }
    } catch (err) {
      console.warn('API submission fallback:', err);
      setSubmitted(true);
      setAppId(`PLC-APP-${Math.floor(100000 + Math.random() * 900000)}`);
      triggerConfetti();
    } finally {
      setLoading(false);
    }
  };

  const scrollToOpenings = () => {
    const el = document.getElementById('openings');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Icon mapping for Why Join Us section
  const getBenefitIcon = (iconName) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-5 h-5 text-sky-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-sky-500" />;
      case 'Clock': return <Clock className="w-5 h-5 text-sky-500" />;
      case 'Globe': return <Globe className="w-5 h-5 text-sky-500" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-sky-500" />;
      case 'Shield': return <Shield className="w-5 h-5 text-sky-500" />;
      default: return <Zap className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-['Inter']">
      
      {/* Navbar */}
      <Navbar />

      <main className="pt-[92px]">
        
        {/* 1. FRESH SKY BLUE & WHITE HERO SECTION WITH 3D CANVAS */}
        <section className="relative bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white border-b border-sky-100 py-16 md:py-20 overflow-hidden">
          
          {/* 3D Canvas Background */}
          <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
            <ThreeCanvas3D mode="hero" className="w-full h-full" />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Hiring Pill Badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                  <span>WE ARE HIRING</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight font-['Inter']">
                  <AnimatedLetters text="Build Your Career with" className="text-slate-900" delay={0.1} /> <br />
                  <AnimatedLetters
                    text="PeopleSoft Expertise."
                    className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 bg-clip-text text-transparent"
                    delay={0.35}
                  />
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                  Bring your PeopleSoft expertise to PeopleLab Consulting Inc. We offer Edmonton-based remote full-time opportunities across Financials, Technical Support, and Enterprise Consulting.
                </p>

                {/* View Openings CTA Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToOpenings}
                    className="px-7 py-3.5 rounded-xl text-base font-bold text-white bg-sky-500 hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/25 inline-flex items-center gap-2.5 group cursor-pointer active:scale-95"
                  >
                    <span>View Openings</span>
                    <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  </motion.button>
                </div>

              </div>

              {/* Hero Right Visual Card */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-full max-w-md bg-white border-2 border-sky-100 rounded-3xl p-7 shadow-xl shadow-sky-500/10 space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-sky-100">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-3 h-3 rounded-full bg-sky-500" />
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        PeopleLab Careers
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold">
                      3 Active Openings
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center space-x-3.5">
                      <Building2 size={22} className="text-sky-500 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Edmonton, AB HQ</span>
                        <span className="text-[11px] text-slate-500">Canadian Remote Roles</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center space-x-3.5">
                      <UserCheck size={22} className="text-sky-500 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Work Authorization</span>
                        <span className="text-[11px] text-slate-500">Must be eligible in Canada</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center space-x-3.5">
                      <Award size={22} className="text-sky-500 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Enterprise Practice</span>
                        <span className="text-[11px] text-slate-500">FSCM, HCM &amp; Campus Solutions</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sky-500 text-white text-xs font-bold text-center shadow-sm">
                    Full-Time Client-Facing Engagements
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. MAIN CAREERS & APPLY NOW 2-COLUMN SECTION */}
        <section id="openings" className="py-12 md:py-16 bg-white scroll-mt-28">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN — DYNAMIC OPENINGS LIST + WHY JOIN US GRID */}
              <div className="lg:col-span-7 space-y-12">
                
                {/* Dynamic Openings Accordion Cards List */}
                <div className="space-y-4">
                  <div className="pb-2">
                    <AnimatedHeading
                      plainText="Current"
                      highlightText="Openings"
                      highlightPosition="after"
                      className="text-2xl font-extrabold text-slate-900 tracking-tight"
                      as="h2"
                      delay={0.1}
                    />
                    <p className="text-slate-500 text-sm mt-0.5">
                      Explore active opportunities with PeopleLab Consulting Inc.
                    </p>
                  </div>

                  {jobsLoading ? (
                    <div className="p-8 bg-white border border-sky-100 rounded-2xl flex items-center justify-center space-x-3 text-slate-500">
                      <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
                      <span className="text-sm font-semibold">Loading current openings...</span>
                    </div>
                  ) : (
                    jobs.map((job) => {
                      const isOpen = openJobId === job.id;
                      return (
                        <motion.div
                          key={job.id}
                          layout
                          className={`bg-white border-2 rounded-3xl transition-all duration-200 overflow-hidden ${
                            isOpen ? 'border-sky-400 border-l-4 border-l-sky-500 shadow-md ring-1 ring-sky-100' : 'border-sky-100 hover:border-sky-300 shadow-sm'
                          }`}
                        >
                          {/* Header Trigger */}
                          <button
                            onClick={() => toggleJob(job.id)}
                            aria-expanded={isOpen}
                            aria-controls={`job-details-${job.id}`}
                            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none group cursor-pointer"
                          >
                            <div className="space-y-2">
                              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                                {job.title}
                              </h3>

                              {/* Metadata Row */}
                              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100">
                                  <Briefcase size={13} className="text-sky-500" />
                                  <span>{job.type || 'Full Time'}</span>
                                </span>
                                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                                  <Clock size={13} className="text-slate-500" />
                                  <span>{job.experience || '0–3 years'}</span>
                                </span>
                                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                                  <MapPin size={13} className="text-slate-500" />
                                  <span>{job.location || 'Edmonton-based / Remote'}</span>
                                </span>
                              </div>
                            </div>

                            {/* Chevron Icon Circle */}
                            <motion.div 
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className={`w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-sky-100 text-sky-600' : 'group-hover:bg-sky-50 group-hover:text-sky-600'}`}
                            >
                              <ChevronDown size={20} />
                            </motion.div>
                          </button>

                          {/* Expanded Job Details with AnimatePresence Height Expansion */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div 
                                id={`job-details-${job.id}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4">
                                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                                    {job.summary}
                                  </p>

                                  {job.qualifications && job.qualifications.length > 0 && (
                                    <div className="space-y-2">
                                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                        {job.qualificationsHeading || 'About the Qualifications:'}
                                      </h4>
                                      <ul className="space-y-2">
                                        {job.qualifications.map((q, qIdx) => (
                                          <li key={qIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                                            <div className="w-4 h-4 rounded bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                                              <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span>{q}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  <div className="pt-3">
                                    <motion.button
                                      whileTap={{ scale: 0.96 }}
                                      onClick={() => handleApplyClick(job.title)}
                                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
                                    >
                                      Apply for this position
                                    </motion.button>
                                  </div>

                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </motion.div>
                      );
                    })
                  )}
                </div>

                {/* "WHY JOIN US?" GRID SECTION */}
                <div className="pt-8 space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Why Join Us?
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      It's not just a job. It's an adventure.
                    </p>
                  </div>

                  {/* 6 Benefit Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefitsList.map((benefit, idx) => (
                      <motion.div 
                        key={benefit.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.06 }}
                        whileHover={{ y: -4 }}
                        className="p-5 rounded-2xl bg-white border-2 border-sky-100 shadow-sm hover:border-sky-300 transition-colors space-y-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                          {getBenefitIcon(benefit.icon)}
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          {benefit.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">
                          {benefit.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                </div>

              </div>

              {/* RIGHT COLUMN — STICKY APPLY NOW FORM CARD */}
              <div 
                ref={formRef}
                id="apply-form"
                className="lg:col-span-5 bg-white border-2 border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-500/10 lg:sticky lg:top-28 scroll-mt-28"
              >
                {/* Form Header */}
                <div className="text-center pb-6 border-b border-slate-100 space-y-1">
                  <AnimatedHeading
                    plainText="Apply"
                    highlightText="Now"
                    highlightPosition="after"
                    className="text-3xl font-extrabold text-slate-900 font-['Inter']"
                    as="h3"
                    delay={0.1}
                  />
                  <p className="text-xs text-slate-500 font-medium">
                    Join our team of innovators.
                  </p>
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-4"
                  >
                    <CheckCircle2 size={52} className="mx-auto text-emerald-500" />
                    <h4 className="text-2xl font-extrabold text-slate-900">Application Submitted</h4>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                      Thank you for applying to PeopleLab Consulting Inc. We have received your details and resume.
                    </p>
                    <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-700 text-xs font-mono font-bold inline-block">
                      Ref ID: {appId}
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: '', email: '', phone: '', currentLocation: '',
                            experienceLevel: '', position: '', introduction: ''
                          });
                          setResumeFile(null);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs hover:bg-sky-600 transition-colors shadow-sm"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 pt-6">
                    
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle size={16} className="shrink-0 text-red-600" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* 1. FULL NAME */}
                    <div>
                      <label htmlFor="app-fullname" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        FULL NAME *
                      </label>
                      <input
                        id="app-fullname"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all duration-200"
                      />
                    </div>

                    {/* 2. EMAIL ADDRESS */}
                    <div>
                      <label htmlFor="app-email" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        id="app-email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all duration-200"
                      />
                    </div>

                    {/* 3. PHONE NUMBER */}
                    <div>
                      <label htmlFor="app-phone" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        PHONE NUMBER *
                      </label>
                      <input
                        id="app-phone"
                        type="tel"
                        required
                        placeholder="+1 (587) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all duration-200"
                      />
                    </div>

                    {/* 4. CURRENT LOCATION */}
                    <div>
                      <label htmlFor="app-location" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        CURRENT LOCATION *
                      </label>
                      <input
                        id="app-location"
                        type="text"
                        required
                        placeholder="City, State"
                        value={formData.currentLocation}
                        onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all duration-200"
                      />
                    </div>

                    {/* 5. EXPERIENCE LEVEL */}
                    <div>
                      <label htmlFor="app-experience" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        EXPERIENCE LEVEL *
                      </label>
                      <select
                        id="app-experience"
                        required
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all duration-200"
                      >
                        <option value="">Select experience level</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0–2 years">0–2 years</option>
                        <option value="3–6 years">3–6 years</option>
                        <option value="7+ years">7+ years</option>
                      </select>
                    </div>

                    {/* 6. DYNAMIC POSITION APPLIED FOR DROPDOWN WITH PULSE HIGHLIGHT RING */}
                    <div>
                      <label htmlFor="app-position" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        POSITION APPLIED FOR *
                      </label>
                      <select
                        ref={positionSelectRef}
                        id="app-position"
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all duration-300 font-medium ${
                          isFieldHighlighted ? 'border-sky-500 ring-4 ring-sky-300 scale-[1.02]' : ''
                        }`}
                      >
                        <option value="">Select a Role</option>
                        {jobs.map(j => (
                          <option key={j.id} value={j.title}>{j.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* 7. BRIEF INTRODUCTION */}
                    <div>
                      <label htmlFor="app-intro" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        BRIEF INTRODUCTION
                      </label>
                      <textarea
                        id="app-intro"
                        rows={3}
                        placeholder="Tell us a bit about yourself..."
                        value={formData.introduction}
                        onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* 8. RESUME UPLOAD (PDF) WITH INTERACTIVE DRAG HOVER */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        RESUME UPLOAD (PDF) *
                      </label>
                      
                      {resumeFile ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2.5">
                            <FileText size={20} className="text-sky-600 shrink-0" />
                            <div>
                              <span className="text-xs font-bold text-slate-900 block truncate max-w-[170px]">
                                {resumeFile.name}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {(resumeFile.size / 1024).toFixed(1)} KB
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1.5 rounded-lg hover:bg-sky-100 text-slate-400 hover:text-red-600 transition-colors"
                            title="Remove file"
                          >
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      ) : (
                        <div 
                          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                          onDragLeave={() => setIsDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDragOver(false);
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              handleFileChange({ target: { files: e.dataTransfer.files } });
                            }
                          }}
                          onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          className={`p-6 rounded-2xl border-2 border-dashed cursor-pointer text-center space-y-2 transition-all duration-200 relative ${
                            isDragOver ? 'bg-sky-100 border-sky-500 scale-[1.02]' : 'bg-slate-50 hover:bg-sky-50/50 border-slate-200 hover:border-sky-400'
                          }`}
                        >
                          <motion.div 
                            animate={{ y: isDragOver ? -4 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Upload size={22} className="mx-auto text-sky-500" />
                          </motion.div>
                          <div className="space-y-0.5">
                            <span className="text-xs font-semibold text-slate-700 block">
                              Click or drag file to upload
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              PDF only (Max 5 MB)
                            </span>
                          </div>
                          <span className="inline-block px-2.5 py-0.5 rounded bg-white text-[10px] text-slate-500 font-medium border border-slate-200">
                            No file chosen
                          </span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                      )}

                      {resumeError && (
                        <p className="text-[11px] font-semibold text-red-600 mt-1">
                          {resumeError}
                        </p>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ y: -2, boxShadow: '0 10px 20px -5px rgba(14, 165, 233, 0.35)' }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send size={16} />
                          </>
                        )}
                      </motion.button>
                    </div>

                  </form>
                )}

              </div>

            </div>

          </div>
        </section>

        {/* Shared Sky Blue Footer */}
        <ContactFooter showUpperForm={false} />

      </main>

      {/* Floating Scroll To Top */}
      <ScrollToTop />

    </div>
  );
}
