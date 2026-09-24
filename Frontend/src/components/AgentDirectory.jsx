import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Award, User, ArrowUpRight, Sparkles } from 'lucide-react';
import { fallbackAgents } from '../data/mockData';
import AgentProfileModal from './AgentProfileModal';

export default function AgentDirectory() {
  const [agents, setAgents] = useState(fallbackAgents);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState(null);

  const industries = ['All', 'Tech & AI', 'Finance', 'Healthcare', 'Executive HR', 'Logistics', 'Retail & Consumer', 'Engineering'];

  // Fetch agents from Express Backend API
  useEffect(() => {
    async function fetchAgents() {
      setLoading(true);
      try {
        const url = `/api/agents?industry=${encodeURIComponent(selectedIndustry)}&search=${encodeURIComponent(searchQuery)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.agents) {
            setAgents(data.agents);
          }
        }
      } catch (err) {
        console.warn('Backend API fetch error, using local fallback:', err);
        // Local filtering
        let filtered = fallbackAgents;
        if (selectedIndustry !== 'All') {
          filtered = filtered.filter(a => a.industry.toLowerCase().includes(selectedIndustry.toLowerCase()));
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(a =>
            a.name.toLowerCase().includes(q) ||
            a.title.toLowerCase().includes(q) ||
            a.specialty.toLowerCase().includes(q) ||
            a.skills.some(s => s.toLowerCase().includes(q))
          );
        }
        setAgents(filtered);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchAgents();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedIndustry, searchQuery]);

  return (
    <section id="roster" className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background Ambient Lights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>Our Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Oswald'] text-white tracking-tight">
            The Agent <span className="text-amber-400">Roster</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Elite talent scouts and executive agents with deep domain networks across high-stakes industries.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search specialists by name, role, skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Industry Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedIndustry === ind
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

        </div>

        {/* Agent Cards Grid: 1 col Mobile, 3 cols Tablet, 4 cols Desktop */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800">
            <User size={48} className="mx-auto text-slate-600 mb-3" />
            <p className="text-slate-300 font-bold">No Specialists Found</p>
            <p className="text-slate-500 text-xs mt-1">Try adjusting your search query or industry filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedIndustry('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className="group relative cursor-pointer rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:bg-slate-900 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/20 flex flex-col justify-between"
              >
                {/* Glowing Accent Border on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-400/0 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Headshot & Rating */}
                  <div className="relative w-full h-52 rounded-xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src={agent.headshot}
                      alt={agent.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-amber-400 text-xs font-black flex items-center gap-1 shadow-lg">
                      <Star size={12} fill="currentColor" />
                      {agent.rating}
                    </div>

                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/90 text-sky-400 text-[10px] font-bold uppercase tracking-wider">
                      {agent.industry}
                    </div>
                  </div>

                  {/* Name & Title */}
                  <h3 className="text-xl font-black font-['Oswald'] uppercase text-white group-hover:text-amber-400 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-sky-400 font-semibold mb-3 line-clamp-1">
                    {agent.title}
                  </p>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {agent.specialty}
                  </p>
                </div>

                <div>
                  {/* Placements & Experience Tag */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1 font-semibold text-white">
                      <Award size={14} className="text-amber-400" />
                      {agent.placements}+ Placed
                    </span>
                    <span className="text-slate-500">{agent.experience}</span>
                  </div>

                  {/* View Profile Button */}
                  <button className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1">
                    View Profile
                    <ArrowUpRight size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Agent Profile Modal */}
      {selectedAgent && (
        <AgentProfileModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
          onBookConsultation={(agent, data) => {
            console.log('Booked consultation:', agent.name, data);
            setSelectedAgent(null);
          }}
        />
      )}

    </section>
  );
}
