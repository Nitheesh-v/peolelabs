import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Search, Send, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fallbackJobs } from '../data/mockData';

export default function JobBoard() {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [applyingJob, setApplyingJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [applicantForm, setApplicantForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    notes: ''
  });

  const departments = ['All', 'Tech & AI', 'Finance', 'Logistics', 'Healthcare', 'Executive HR', 'Engineering'];

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`/api/jobs?department=${encodeURIComponent(selectedDept)}&search=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.jobs) setJobs(data.jobs);
        }
      } catch (e) {
        console.warn('Jobs API error, using fallback');
        let filtered = fallbackJobs;
        if (selectedDept !== 'All') {
          filtered = filtered.filter(j => j.department.toLowerCase().includes(selectedDept.toLowerCase()));
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(j => j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q));
        }
        setJobs(filtered);
      }
    }
    fetchJobs();
  }, [selectedDept, searchQuery]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: applyingJob.id,
          ...applicantForm
        })
      });

      if (res.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (e) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="careers" className="py-24 bg-slate-900/80 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-extrabold uppercase tracking-widest border border-sky-500/20 mb-3 inline-block">
            High-Impact Mandates
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Oswald'] text-white tracking-tight">
            Executive <span className="text-sky-400">Careers</span> & Open Roles
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Confidential executive searches and key leadership placements represented directly by Arena Agents.
          </p>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search executive positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedDept === dept
                    ? 'bg-sky-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-sky-400/50 hover:bg-slate-950/90 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs font-bold uppercase">
                    {job.department}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium">
                    {job.type}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {job.postedDate}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  {job.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin size={14} className="text-sky-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <DollarSign size={14} />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Briefcase size={14} className="text-indigo-400" />
                    {job.experience} Required
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => {
                    setApplyingJob(job);
                    setSubmitted(false);
                  }}
                  className="w-full lg:w-auto px-6 py-3 rounded-xl bg-sky-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-sky-400 hover:scale-105 transition-all shadow-md"
                >
                  Apply & Represent
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={56} className="mx-auto text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-black font-['Oswald'] uppercase text-white mb-2">
                  Application Submitted!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                  Thank you, <span className="text-amber-400 font-bold">{applicantForm.name}</span>. An Arena Agent specialist representing <span className="text-sky-400 font-bold">{applyingJob.title}</span> will review your credentials confidentially.
                </p>
                <button
                  onClick={() => setApplyingJob(null)}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                >
                  Back to Board
                </button>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">
                  Confidential Representation
                </span>
                <h3 className="text-xl font-black font-['Oswald'] uppercase text-white mb-4">
                  Apply for {applyingJob.title}
                </h3>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Phone</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={applicantForm.phone}
                        onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 block mb-1">LinkedIn Profile / Portfolio URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/janedoe"
                      value={applicantForm.linkedin}
                      onChange={(e) => setApplicantForm({ ...applicantForm, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Executive Summary / Compensation Expectation</label>
                    <textarea
                      rows={3}
                      placeholder="Brief note on current role, availability, or target compensation..."
                      value={applicantForm.notes}
                      onChange={(e) => setApplicantForm({ ...applicantForm, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? 'Submitting Application...' : 'Submit Profile Confidentially'}
                    <Send size={16} />
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
