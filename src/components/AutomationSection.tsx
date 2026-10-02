import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Bot,
  ArrowRight,
  User,
  Globe,
  Sliders,
  Database,
  Send,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';
import { AUTOMATION_WORKFLOW_STEPS, AUTOMATION_EXAMPLES } from '../data/content';

interface AutomationSectionProps {
  onExploreAutomation: () => void;
}

export const AutomationSection: React.FC<AutomationSectionProps> = ({ onExploreAutomation }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2);

  const renderStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'User': return <User className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Bot': return <Bot className="w-4 h-4" />;
      case 'Sliders': return <Sliders className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Send': return <Send className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="ai-automation">
      {/* Ambient background glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI CUSTOMER SUPPORT & AUTOMATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight"
          >
            Let AI Handle the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
              Repetitive Work.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Deploy intelligent AI customer support agents that reply instantly, qualify high-value leads,
            sync directly to your CRM, and smoothly hand off ready buyers to your team.
          </motion.p>
        </div>

        {/* The Full Automation Flow Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 sm:p-8 mb-16 shadow-lg shadow-slate-900/5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                AI Customer Support & Lead Routing Journey
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
              <Zap className="w-3 h-3 text-amber-500" />
              Fast AI-Assisted Response
            </span>
          </div>

          {/* Interactive Steps Grid with Motion Stagger & Active Feedback */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {AUTOMATION_WORKFLOW_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <motion.div
                  key={step.role}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`cursor-pointer group p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between min-h-[155px] relative overflow-hidden shadow-2xs ${
                    isSelected
                      ? 'bg-slate-950 border-slate-900 text-white shadow-lg shadow-slate-950/20 -translate-y-0.5'
                      : 'bg-white border-slate-200/90 hover:border-slate-400 hover:bg-slate-50/90'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeStepTopGlow"
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400"
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono font-bold transition-colors ${
                        isSelected ? 'text-blue-400' : 'text-slate-400'
                      }`}>
                        0{idx + 1}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900'
                        }`}
                      >
                        {renderStepIcon(step.icon)}
                      </div>
                    </div>
                    <span className={`text-xs font-bold block uppercase tracking-tight ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}>
                      {step.role}
                    </span>
                    <span className={`text-[11px] font-semibold block mt-0.5 transition-colors ${
                      isSelected ? 'text-blue-300' : 'text-slate-600'
                    }`}>
                      {step.label}
                    </span>
                  </div>

                  <p className={`text-[10px] leading-snug mt-2 pt-2 border-t font-medium ${
                    isSelected ? 'text-slate-300 border-slate-800/90' : 'text-slate-500 border-slate-100'
                  }`}>
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 10 Automation Examples Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl font-black text-slate-950 tracking-tight">Where Automation Creates Leverage</h3>
            <p className="text-xs text-slate-600 mt-1">
              Practical automation pipelines deployed without disruption to your daily operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {AUTOMATION_EXAMPLES.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 5) * 0.06 }}
                whileHover={{ y: -3 }}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-md hover:shadow-slate-900/5 transition-all duration-200 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center mb-2.5 border border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-300 transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1.5 group-hover:text-slate-950 transition-colors">
                    {ex.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                    {ex.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer / Honest Statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 max-w-2xl mx-auto flex items-start gap-3 shadow-2xs"
        >
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            <strong className="text-slate-950">Responsible Implementation:</strong> Every business operation, market vertical, and tech stack has unique dynamics. While automation eliminates manual friction and significantly speeds up response rates, business outcomes depend on product-market fit, offer clarity, and fulfillment quality. We engineer high-yield systems tailored to your specific workflows without unrealistic promises.
          </p>
        </motion.div>

        {/* Section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreAutomation}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-base cursor-pointer"
            id="explore-ai-automation-cta"
          >
            <span>Explore AI Customer Support & Automation</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

