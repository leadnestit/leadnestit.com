import React from 'react';
import { ArrowLeft, Sparkles, Home } from 'lucide-react';

interface PageBannerProps {
  badge?: string;
  breadcrumb?: string;
  title: string;
  subtitle: string;
  onBackToHome: () => void;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  badge,
  breadcrumb,
  title,
  subtitle,
  onBackToHome,
}) => {
  return (
    <div className="relative pt-32 sm:pt-36 pb-10 sm:pb-14 bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100 overflow-hidden">
      {/* Subtle low opacity ambient graphics */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-blue-500/5 via-cyan-500/2 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Orbital Concentric Rings in Top-Right */}
      <svg
        className="absolute -right-8 -top-8 w-80 h-80 pointer-events-none select-none opacity-40 sm:opacity-50"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="170" cy="130" r="110" stroke="#93c5fd" strokeWidth="1" strokeDasharray="5 7" opacity="0.25" />
        <circle cx="170" cy="130" r="70" stroke="#60a5fa" strokeWidth="0.9" opacity="0.2" />
        <line x1="20" y1="130" x2="280" y2="130" stroke="#bfdbfe" strokeWidth="0.7" strokeDasharray="4 6" opacity="0.2" />
        <path d="M 20 200 C 90 180, 150 140, 220 100 C 260 80, 280 60, 295 40" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" opacity="0.28" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4 select-none">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span className="text-slate-400 font-normal">&gt;</span>
          <span className="text-blue-600 font-bold">{breadcrumb || title}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-3xl">
            {badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>{badge}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {subtitle}
            </p>
          </div>

          <div className="shrink-0 pt-2 md:pt-0">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
