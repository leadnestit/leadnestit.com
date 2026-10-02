import React from 'react';
import { Check, ArrowRight, Layers, TrendingUp, Cpu, Sparkles } from 'lucide-react';
import { PILLARS_DATA } from '../data/content';
import { useCurrency } from '../context/CurrencyContext';

interface GrowthPillarsProps {
  onSelectPillar: (pillarName: string) => void;
}

export const GrowthPillars: React.FC<GrowthPillarsProps> = ({ onSelectPillar }) => {
  const { currency } = useCurrency();
  const isUSD = currency === 'USD';

  const getPillarTheme = (name: string) => {
    switch (name) {
      case 'BUILD':
        return {
          icon: <Layers className="w-6 h-6" />,
          badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/90',
          dotClass: 'bg-blue-600',
          headlineClass: 'text-blue-700',
          iconBoxClass: 'bg-blue-50/90 text-blue-600 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white',
          checkClass: 'bg-blue-50 text-blue-600 border-blue-200 group-hover/item:bg-blue-600 group-hover/item:text-white',
          cardHoverBorder: 'hover:border-blue-400',
          topAccent: 'from-blue-600 via-blue-500 to-cyan-500',
          btnHover: 'hover:bg-blue-600 hover:border-blue-600 hover:shadow-blue-500/25',
        };
      case 'GROW':
        return {
          icon: <TrendingUp className="w-6 h-6" />,
          badgeClass: 'bg-sky-50 text-sky-700 border-sky-200/90',
          dotClass: 'bg-sky-600',
          headlineClass: 'text-sky-700',
          iconBoxClass: 'bg-sky-50/90 text-sky-600 border-sky-200/80 group-hover:bg-sky-600 group-hover:text-white',
          checkClass: 'bg-sky-50 text-sky-600 border-sky-200 group-hover/item:bg-sky-600 group-hover/item:text-white',
          cardHoverBorder: 'hover:border-sky-400',
          topAccent: 'from-sky-500 via-blue-500 to-indigo-500',
          btnHover: 'hover:bg-sky-600 hover:border-sky-600 hover:shadow-sky-500/25',
        };
      case 'AUTOMATE':
        return {
          icon: <Cpu className="w-6 h-6" />,
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
          dotClass: 'bg-emerald-600',
          headlineClass: 'text-emerald-700',
          iconBoxClass: 'bg-emerald-50/90 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white',
          checkClass: 'bg-emerald-50 text-emerald-600 border-emerald-200 group-hover/item:bg-emerald-600 group-hover/item:text-white',
          cardHoverBorder: 'hover:border-emerald-400',
          topAccent: 'from-emerald-500 via-teal-500 to-cyan-500',
          btnHover: 'hover:bg-emerald-600 hover:border-emerald-600 hover:shadow-emerald-500/25',
        };
      default:
        return {
          icon: <Layers className="w-6 h-6" />,
          badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/90',
          dotClass: 'bg-blue-600',
          headlineClass: 'text-blue-700',
          iconBoxClass: 'bg-blue-50 text-blue-600 border-blue-200',
          checkClass: 'bg-blue-50 text-blue-600 border-blue-200',
          cardHoverBorder: 'hover:border-blue-400',
          topAccent: 'from-blue-600 to-cyan-500',
          btnHover: 'hover:bg-blue-600 hover:border-blue-600',
        };
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-200 relative overflow-hidden" id="solutions">
      {/* Subtle brand glow & technical vector graphics */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Technical Vector 1: Architectural Blueprint Grid (Left) */}
      <svg
        className="absolute -left-10 top-12 w-64 h-64 text-blue-600/[0.035] pointer-events-none select-none hidden lg:block"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="20" y="20" width="160" height="160" rx="16" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="70" x2="180" y2="70" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="45" cy="45" r="4" fill="currentColor" />
        <circle cx="65" cy="45" r="4" fill="currentColor" />
        <circle cx="85" cy="45" r="4" fill="currentColor" />
        <path d="M50 120 L80 150 L140 90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>

      {/* Decorative Technical Vector 2: AI Automation Pipeline Nodes (Right) */}
      <svg
        className="absolute -right-8 bottom-12 w-64 h-64 text-emerald-600/[0.035] pointer-events-none select-none hidden lg:block"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="5" fill="currentColor" />
        <line x1="30" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
        <line x1="100" y1="30" x2="100" y2="170" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{isUSD ? 'THE LEADNEST IT FRAMEWORK' : 'লিডনেস্ট আইটি ফ্রেমওয়ার্ক'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            {isUSD ? 'One Partner. Three Growth Engines.' : 'একটি নির্ভরযোগ্য পার্টনার। তিনটি গ্রোথ ইঞ্জিন।'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed">
            {isUSD
              ? "We don't just build websites. We architect end-to-end digital business systems that help companies attract qualified attention, generate predictable sales, and scale with automation."
              : 'আমরা শুধু ওয়েবসাইট তৈরি করি না। আমরা এমন পূর্ণাঙ্গ ডিজিটাল আর্কিটেকচার তৈরি করি যা ক্রেতাদের আকর্ষণ করে, নিশ্চিত সেলস তৈরি করে এবং অটোমেশনের মাধ্যমে ব্যবসাকে স্কেল করে।'}
          </p>
        </div>

        {/* 3 Large Premium Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PILLARS_DATA.map((pillar) => {
            const theme = getPillarTheme(pillar.name);

            return (
              <div
                key={pillar.id}
                className={`group relative rounded-[28px] bg-white border border-slate-200/90 ${theme.cardHoverBorder} p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-2xl hover:shadow-slate-200/80 overflow-hidden`}
              >
                {/* Delicate Top Gradient Line on Hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.topAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Header inside Card */}
                <div>
                  <div className="flex items-center justify-end mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105 ${theme.iconBoxClass}`}
                    >
                      {theme.icon}
                    </div>
                  </div>

                  {/* Title & Dot */}
                  <h3 className="text-3xl font-black text-slate-950 tracking-tight mb-2 flex items-center gap-2">
                    <span>{pillar.name}</span>
                    <span className={`w-2.5 h-2.5 rounded-full ${theme.dotClass}`} />
                  </h3>

                  {/* Headline Quote (Clean, High-Impact) */}
                  <p className={`text-sm sm:text-[15px] font-bold ${theme.headlineClass} leading-snug mb-6`}>
                    "{pillar.headline}"
                  </p>

                  {/* 
                    Service Checklist:
                    Cleanly starts directly without the redundant "Core Capabilities:" label
                    and without the paragraph description as requested
                  */}
                  <div className="space-y-2 pt-5 border-t border-slate-100">
                    {pillar.services.map((srv, idx) => (
                      <div
                        key={idx}
                        className="group/item flex items-center gap-3 py-2 px-2.5 -mx-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-800 text-xs sm:text-[13px]"
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-200 ${theme.checkClass}`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="font-semibold text-slate-800 group-hover/item:text-slate-950 transition-colors">
                          {srv}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => onSelectPillar(pillar.name)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl text-sm font-bold text-slate-900 bg-slate-100/90 border border-slate-200 hover:text-white transition-all duration-200 group-hover:text-white group-hover:border-transparent ${theme.btnHover} shadow-xs cursor-pointer active:scale-98`}
                    id={`pillar-cta-${pillar.id}`}
                  >
                    <span>{pillar.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
