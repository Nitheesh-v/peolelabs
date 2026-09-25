import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, Send, CheckCircle2, X } from 'lucide-react';
import { fallbackJobs } from '../data/mockData';

export default function JobBoard() {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [applyingJob, setApplyingJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', notes: '' });

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs');
        if (res.ok) {
          const data = await res.json();
          if (data.jobs) setJobs(data.jobs);
        }
      } catch (e) {
        console.warn('Jobs API error, using fallback');
      }
    }
    fetchJobs();
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: applyingJob.id, ...form })
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (e) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="careers" className="py-20 bg-sky-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
            CAREERS AT PEOPLELABS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Join Our Consulting Practice
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            We are always seeking experienced PeopleSoft functional analysts, technical developers, and Oracle Cloud architects.
          </p>
        </div>

        {/* Job Cards */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-sky-500 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-sky-50 text-sky-700 text-xs font-bold uppercase">
                    {job.department}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {job.postedDate}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {job.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600">
                  {job.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <MapPin size={14} className="text-sky-500" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <Briefcase size={14} className="text-sky-500" /> {job.experience}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setApplyingJob(job);
                  setSubmitted(false);
                }}
                className="px-5 py-2.5 rounded-lg bg-sky-500 text-white font-semibold text-xs hover:bg-sky-600 transition-colors shrink-0"
              >
                Apply for Position
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Application Drawer / Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl">
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 size={48} className="mx-auto text-emerald-600" />
                <h3 className="text-xl font-bold text-slate-900">Application Received</h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Thank you, {form.name}. Our recruitment lead will review your application for <strong>{applyingJob.title}</strong>.
                </p>
                <button
                  onClick={() => setApplyingJob(null)}
                  className="mt-4 px-5 py-2 rounded-lg bg-sky-500 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">
                  PeopleLabs Careers
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Apply: {applyingJob.title}
                </h3>

                <form onSubmit={handleApply} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Phone</label>
                      <input
                        type="tel"
                        placeholder="+1 (587) 000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">LinkedIn Profile / Portfolio</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/janesmith"
                      value={form.linkedin}
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Relevant Experience & Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Years of experience with FSCM, HCM, or Oracle Cloud..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-lg bg-sky-500 text-white font-semibold text-xs hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                    <Send size={14} />
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
