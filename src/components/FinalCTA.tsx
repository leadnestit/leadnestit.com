import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

interface FinalCTAProps {
  onBookConsultation: () => void;
  onTalkToTeam: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookConsultation, onTalkToTeam }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50/90 via-white to-blue-50/40 relative overflow-hidden border-t border-slate-200">
      {/* Soft Ambient Orbital Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-200/15 via-cyan-100/10 to-indigo-100/15 blur-[140px] rounded-full pointer-events-none" />

      {/* Orbital Concentric Rings (Matching user reference image with soft, low opacity) */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[460px] pointer-events-none select-none opacity-45 sm:opacity-55"
        viewBox="0 0 800 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer Concentric Dashed Ring */}
        <circle cx="400" cy="230" r="220" stroke="#93c5fd" strokeWidth="1" strokeDasharray="5 7" opacity="0.28" />
        
        {/* Middle Solid Fine Ring */}
        <circle cx="400" cy="230" r="150" stroke="#60a5fa" strokeWidth="1" opacity="0.22" />
        
        {/* Inner Concentric Dashed Ring */}
        <circle cx="400" cy="230" r="90" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.28" />

        {/* Horizontal Guide Axis Line (Dashed) */}
        <line x1="40" y1="230" x2="760" y2="230" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.2" />

        {/* Diagonal Guide Axis (Dashed) */}
        <line x1="180" y1="380" x2="620" y2="80" stroke="#dbeafe" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.16" />

        {/* Sweeping Trajectory Curve 1 */}
        <path
          d="M 50 330 C 220 310, 340 230, 470 170 C 580 120, 680 90, 750 70"
          stroke="#60a5fa"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.32"
        />

        {/* Secondary Harmonic Wave Curve */}
        <path
          d="M 120 370 C 270 330, 390 245, 540 160 C 630 115, 710 85, 780 75"
          stroke="#93c5fd"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.22"
        />

        {/* Intersection Nodes */}
        <circle cx="400" cy="80" r="2.5" fill="#3b82f6" opacity="0.35" />
        <circle cx="400" cy="380" r="2.5" fill="#3b82f6" opacity="0.35" />
        <circle cx="550" cy="230" r="3" fill="#2563eb" opacity="0.4" />
        <circle cx="470" cy="170" r="3.5" fill="#06b6d4" opacity="0.45" />
      </svg>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>ZERO PRESSURE • HIGH CLARITY</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
          Your Next Stage of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
            Growth Starts Here.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Tell us about your business. We’ll help you identify what to improve, what to build and what to automate.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onBookConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-xl shadow-blue-600/20 transform hover:-translate-y-0.5 text-base"
            id="final-cta-book-btn"
          >
            <span>Book a Free Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onTalkToTeam}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all duration-200 shadow-xs text-base"
            id="final-cta-talk-btn"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Talk to Our Team</span>
          </button>
        </div>

        {/* Guarantee / trust indicators */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            30-Minute Growth & Strategy Session
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Actionable Growth Recommendations
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            No Sales Obligation
          </span>
        </div>
      </div>
    </section>
  );
};
