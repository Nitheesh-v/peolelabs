import React, { useState } from 'react';
import { Send, CheckCircle2, Shield } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

export default function Footer({ scrollTo }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Column 1: About */}
          <div className="space-y-4">
            <div 
              onClick={() => scrollTo('hero')}
              className="cursor-pointer flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-md bg-amber-400 flex items-center justify-center font-black text-slate-950 text-lg font-['Oswald']">
                A
              </div>
              <span className="font-extrabold text-lg text-white font-['Oswald'] uppercase tracking-tight">
                PEOPLE<span className="text-sky-400">[LABS]</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              PEOPLE[LABS] & Arena Agents is a premier talent representation, executive search, and HR consulting platform bridging high-performing executives and market-leading global enterprises.
            </p>

            <div className="flex items-center space-x-3 text-slate-400 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-850 transition-colors" title="LinkedIn">
                <FaLinkedin size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-850 transition-colors" title="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-850 transition-colors" title="Twitter / X">
                <FaTwitter size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-850 transition-colors" title="GitHub">
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-4 font-['Oswald']">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-amber-400 transition-colors">
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('roster')} className="hover:text-amber-400 transition-colors">
                  The Agent Roster
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('sectors')} className="hover:text-amber-400 transition-colors">
                  Key Sectors Command
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition-colors">
                  The Playbook (Services)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('careers')} className="hover:text-amber-400 transition-colors">
                  Executive Careers
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-amber-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-4 font-['Oswald']">
              Contact Desk
            </h4>
            <ul className="space-y-3">
              <div>
                <span className="text-slate-500 uppercase font-bold text-[10px] block">New York Headquarters</span>
                <span className="text-slate-300 font-medium">500 Financial Plaza, Suite 2400, NY 10005</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold text-[10px] block">Direct Hotline</span>
                <span className="text-slate-300 font-medium">+1 (800) 555-PEOPLE</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold text-[10px] block">Email Desk</span>
                <span className="text-amber-400 font-medium">contact@peoplelabsconsulting.com</span>
              </div>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-4 font-['Oswald']">
              Executive Briefing
            </h4>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Subscribe to our bi-weekly talent insights report on executive compensation, market trends, and high-performer mobility.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} />
                Subscribed to Executive Briefing!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold hover:scale-105 transition-transform"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Shield size={10} /> Zero spam. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} PEOPLE[LABS] & Arena Agents. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: PEOPLE[LABS] enforces strict executive data confidentiality."); }} className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: All executive searches governed by client service level agreements."); }} className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#security" onClick={(e) => { e.preventDefault(); alert("Security: Enterprise 256-bit SSL encrypted submissions."); }} className="hover:text-slate-300 transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
