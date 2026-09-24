import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

export default function Navbar({ activeSection, scrollTo, theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'The Roster', target: 'roster' },
    { label: 'Sectors', target: 'sectors' },
    { label: 'The Playbook', target: 'services' },
    { label: 'Careers', target: 'careers' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-5 border-b border-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => scrollTo('hero')}
            className="cursor-pointer flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl tracking-tighter shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white font-['Oswald'] uppercase flex items-center gap-1">
                PEOPLE<span className="text-sky-400 font-black">[LABS]</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold -mt-1">
                Arena Agents
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <button
                  key={item.target}
                  onClick={() => scrollTo(item.target)}
                  className={`px-3 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'text-amber-400 border-b-2 border-amber-400'
                      : 'text-slate-300 hover:text-sky-400'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Social Icons & Pulse CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Monochromatic Social Icons */}
            <div className="flex items-center space-x-3 text-slate-400 border-r border-slate-800 pr-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                <FaLinkedin size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Twitter / X">
                <FaTwitter size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub">
                <FaGithub size={18} />
              </a>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-400 hover:text-amber-400 hover:bg-slate-900 transition-colors"
              title={theme === 'dark' ? 'Switch to Sky Light Theme' : 'Switch to Dark Executive Theme'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Pulse Gold/Sky CTA Button */}
            <button
              onClick={() => scrollTo('contact')}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/25 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all glow-pulse"
            >
              Contact Us
              <ArrowUpRight size={16} className="ml-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-300 hover:text-amber-400"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:text-amber-400"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => {
                scrollTo(item.target);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-200 hover:bg-slate-900 hover:text-amber-400 rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-900 flex flex-col space-y-3">
            <button
              onClick={() => {
                scrollTo('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-md"
            >
              Contact Us & Launch
            </button>
            <div className="flex justify-center space-x-6 text-slate-400 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter size={20} /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub size={20} /></a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
