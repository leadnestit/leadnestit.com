import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  ShoppingBag,
  Megaphone,
  Target,
  Palette,
  Search,
  Filter,
  Bot,
  Workflow,
  ShieldCheck,
  ArrowRight,
  Check,
  X,
  Sparkles
} from 'lucide-react';
import { SERVICES_LIST } from '../data/content';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getPillarTheme = (pillar: string) => {
    switch (pillar) {
      case 'BUILD':
        return {
          badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/90',
          topAccent: 'from-blue-600 via-blue-500 to-cyan-500',
          iconBoxClass: 'bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white',
          checkClass: 'bg-blue-50 text-blue-600 border-blue-200 group-hover/item:bg-blue-600 group-hover/item:text-white',
          cardHoverBorder: 'hover:border-blue-400',
          ctaHover: 'text-blue-600 hover:text-blue-800',
          accentColor: 'text-blue-600'
        };
      case 'GROW':
        return {
          badgeClass: 'bg-sky-50 text-sky-700 border-sky-200/90',
          topAccent: 'from-sky-500 via-blue-500 to-indigo-500',
          iconBoxClass: 'bg-sky-50 text-sky-600 border-sky-200/80 group-hover:bg-sky-600 group-hover:text-white',
          checkClass: 'bg-sky-50 text-sky-600 border-sky-200 group-hover/item:bg-sky-600 group-hover/item:text-white',
          cardHoverBorder: 'hover:border-sky-400',
          ctaHover: 'text-sky-600 hover:text-sky-800',
          accentColor: 'text-sky-600'
        };
      case 'AUTOMATE':
        return {
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
          topAccent: 'from-emerald-500 via-teal-500 to-cyan-500',
          iconBoxClass: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white',
          checkClass: 'bg-emerald-50 text-emerald-600 border-emerald-200 group-hover/item:bg-emerald-600 group-hover/item:text-white',
          cardHoverBorder: 'hover:border-emerald-400',
          ctaHover: 'text-emerald-600 hover:text-emerald-800',
          accentColor: 'text-emerald-600'
        };
      case 'SUPPORT':
      default:
        return {
          badgeClass: 'bg-purple-50 text-purple-700 border-purple-200/90',
          topAccent: 'from-purple-500 via-indigo-500 to-blue-500',
          iconBoxClass: 'bg-purple-50 text-purple-600 border-purple-200/80 group-hover:bg-purple-600 group-hover:text-white',
          checkClass: 'bg-purple-50 text-purple-600 border-purple-200 group-hover/item:bg-purple-600 group-hover/item:text-white',
          cardHoverBorder: 'hover:border-purple-400',
          ctaHover: 'text-purple-600 hover:text-purple-800',
          accentColor: 'text-purple-600'
        };
    }
  };

  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 transition-transform duration-300 group-hover:scale-110" };
    switch (iconName) {
      case 'Code2': return <Code2 {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      case 'Megaphone': return <Megaphone {...props} />;
      case 'Target': return <Target {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Search': return <Search {...props} />;
      case 'Filter': return <Filter {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'Workflow': return <Workflow {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <Code2 {...props} />;
    }
  };

  return (
    <section className="pt-8 pb-24 bg-white relative overflow-hidden" id="services">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4 Core Services Grid with animated Pillar styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SERVICES_LIST.map((srv, idx) => {
            const theme = getPillarTheme(srv.pillar);

            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.38, delay: idx * 0.07, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className={`group relative rounded-[24px] bg-white border border-slate-200/90 ${theme.cardHoverBorder} p-6 sm:p-7 flex flex-col justify-between transition-shadow duration-300 shadow-xs hover:shadow-xl hover:shadow-slate-200/80 overflow-hidden`}
              >
                {/* Delicate Top Gradient Line on Hover (like Pillar 01, 02, 03) */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.topAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  {/* Card Top: Animated Icon Box (Kept badge area empty as requested) */}
                  <div className="flex items-center justify-between mb-5">
                    <div />
                    <div
                      className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105 ${theme.iconBoxClass}`}
                    >
                      {renderIcon(srv.iconName)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
                    {srv.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">
                    {srv.shortDescription}
                  </p>

                  {/* Highlights with Pillar-Styled Checkmark Icons */}
                  <div className="space-y-2 mb-6">
                    {srv.highlights.map((h, i) => (
                      <div key={i} className="group/item flex items-center gap-2.5 text-xs text-slate-700 font-semibold transition-transform duration-150">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${theme.checkClass}`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="group-hover/item:text-slate-950 transition-colors">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalService(srv)}
                    className={`text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${theme.ctaHover}`}
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => onSelectService(srv.title)}
                    className="text-[11px] font-mono font-bold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 transition-all cursor-pointer shadow-2xs"
                  >
                    Consult
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Strip in Modal */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                {renderIcon(activeModalService.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 tracking-wider uppercase">
                  LeadNest IT Service
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1 tracking-tight">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              {activeModalService.fullDescription}
            </p>

            <div className="space-y-2.5 mb-6 bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Included Deliverables:</span>
              </span>
              {activeModalService.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const title = activeModalService.title;
                  setActiveModalService(null);
                  onSelectService(title);
                }}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-lg active:scale-98"
              >
                <span>Request {activeModalService.title} Strategy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
