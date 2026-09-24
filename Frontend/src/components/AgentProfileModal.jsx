import React, { useState } from 'react';
import { X, Star, MapPin, Briefcase, Award, CheckCircle, Mail, Phone, Calendar } from 'lucide-react';

export default function AgentProfileModal({ agent, onClose, onBookConsultation }) {
  const [booked, setBooked] = useState(false);
  const [formData, setBookFormData] = useState({ name: '', email: '', message: '' });

  if (!agent) return null;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      if (onBookConsultation) onBookConsultation(agent, formData);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Agent Image & Quick Specs */}
          <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-xl mb-4">
              <img
                src={agent.headshot}
                alt={agent.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/90 text-amber-400 text-xs font-bold flex items-center gap-1">
                <Star size={12} fill="currentColor" />
                {agent.rating}
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              {agent.industry} Specialist
            </span>

            <div className="flex items-center text-xs text-slate-400 space-x-1 mb-1">
              <MapPin size={14} className="text-sky-400" />
              <span>{agent.location}</span>
            </div>

            <div className="flex items-center text-xs text-slate-400 space-x-1">
              <Award size={14} className="text-amber-400" />
              <span>{agent.experience} Experience</span>
            </div>
          </div>

          {/* Details & Bio */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-['Oswald'] uppercase text-white tracking-tight mb-1">
                {agent.name}
              </h2>
              <p className="text-sky-400 text-sm font-semibold mb-4">
                {agent.title}
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-4">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block mb-1">
                  Key Expertise & Focus
                </span>
                <p className="text-sm font-semibold text-amber-300">
                  {agent.specialty}
                </p>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                {agent.bio}
              </p>

              {/* Skills Tags */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Specialized Skills
                </span>
                <div className="flex flex-wrap gap-2">
                  {agent.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Placement Track Record */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">Recent Key Placement</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{agent.recentPlacement}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">Placed Talent</span>
                  <span className="text-lg font-black text-amber-400 font-['Oswald']">{agent.placements}+</span>
                </div>
              </div>
            </div>

            {/* Direct Consultation Booking Form */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-sm font-extrabold uppercase text-white mb-3 flex items-center gap-2">
                <Calendar size={16} className="text-amber-400" />
                Book Confidential Consultation with {agent.name.split(' ')[0]}
              </h3>

              {booked ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle size={18} />
                  Consultation Request Sent! {agent.name.split(' ')[0]} will follow up within 2 hours.
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setBookFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Work Email"
                      value={formData.email}
                      onChange={(e) => setBookFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all"
                  >
                    Request Confidential Meeting
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
