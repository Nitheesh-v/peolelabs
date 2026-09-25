import React from 'react';
import { ShieldCheck, Award, MapPin, CheckCircle2, Clock } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block">
              ABOUT PEOPLELABS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Enterprise Systems Consulting Built on Trust & Technical Precision
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Founded in 2016 and headquartered in Edmonton, Alberta, <strong>PeopleLabs Consulting Inc.</strong> is a dedicated technology advisory firm delivering end-to-end consulting, customization, upgrades, and managed support for Oracle and PeopleSoft enterprise environments.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We specialize in bridging functional business requirements with deep technical execution across <strong>FSCM, HCM, Campus Solutions, PS/nVision Reporting, and Oracle Cloud Infrastructure (OCI)</strong>. Our team partners with enterprise organizations, universities, banks, and healthcare leaders to ensure maximum uptime, compliance, and ROI.
            </p>

            {/* Bullet Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 flex items-start space-x-3">
                <ShieldCheck size={20} className="text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">8+ Years Enterprise Experience</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Established track record delivering high-stakes upgrades and implementations.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 flex items-start space-x-3">
                <MapPin size={20} className="text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Canadian & US Coverage</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Serving clients across Edmonton, Calgary, Toronto, and US markets.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 bg-sky-50/70 border border-sky-100 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-extrabold text-slate-900 border-b border-sky-200/80 pb-3">
              Why Enterprise Leaders Choose PeopleLabs
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Specialized Focus:</strong> Exclusive focus on Oracle and PeopleSoft technology stacks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-sky-600 shrink-0 mt-0.5" />
                <span><strong>PUM & Selective Adoption:</strong> Smooth maintenance strategy without operational friction.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Cost Efficiency:</strong> Senior expertise at competitive consulting rates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Zero Downtime Upgrades:</strong> Bulletproof project management and migration protocols.</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-sky-200/80 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold">Location: Edmonton, AB, Canada</span>
              <span className="text-sky-600 font-bold">EST / MST Support</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
