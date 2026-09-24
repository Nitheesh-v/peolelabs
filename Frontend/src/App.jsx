import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsCounter from './components/StatsCounter';
import AgentDirectory from './components/AgentDirectory';
import SectorsGrid from './components/SectorsGrid';
import PlaybookServices from './components/PlaybookServices';
import JobBoard from './components/JobBoard';
import ContactSection from './components/ContactSection';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState('dark');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    const sections = ['hero', 'roster', 'sectors', 'services', 'careers', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Infolexus Style Navbar */}
      <Navbar
        activeSection={activeSection}
        scrollTo={scrollToSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main>
        {/* The 'Arena' Hero Section */}
        <Hero scrollTo={scrollToSection} />

        {/* Stats Counter Section */}
        <StatsCounter />

        {/* Agent Roster Grid & Profiles Section */}
        <AgentDirectory />

        {/* Sectors Grid Section */}
        <SectorsGrid scrollTo={scrollToSection} />

        {/* The Playbook / Core Services Section */}
        <PlaybookServices scrollTo={scrollToSection} />

        {/* Job Board / Executive Careers Section */}
        <JobBoard />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer scrollTo={scrollToSection} />

      {/* Scroll To Top Button */}
      <ScrollToTop />

    </div>
  );
}
