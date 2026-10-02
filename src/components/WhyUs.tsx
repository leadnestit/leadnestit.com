import React from 'react';
import { motion } from 'motion/react';
import { WHY_US_BENEFITS } from '../data/content';
import {
  Compass,
  Users,
  Target,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

export const WhyUs: React.FC = () => {
  const getBenefitIcon = (num: string) => {
    switch (num) {
      case '01':
        return <Compass className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />;
      case '02':
        return <Users className="w-5 h-5 text-sky-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />;
      case '03':
        return <Target className="w-5 h-5 text-emerald-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />;
      case '04':
        return <Cpu className="w-5 h-5 text-indigo-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />;
      case '05':
        return <TrendingUp className="w-5 h-5 text-amber-600 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />;
      case '06':
        return <ShieldCheck className="w-5 h-5 text-teal-600 transition-transform duration-300 group-hover:scale-110 group-hover:scale-115" />;
      default:
        return <Compass className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAccentColor = (num: string) => {
    switch (num) {
      case '01': return 'from-blue-600 to-indigo-600';
      case '02': return 'from-sky-500 to-blue-600';
      case '03': return 'from-emerald-500 to-teal-600';
      case '04': return 'from-indigo-600 to-purple-600';
      case '05': return 'from-amber-500 to-orange-600';
      case '06': return 'from-teal-500 to-emerald-600';
      default: return 'from-blue-600 to-indigo-600';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/80 border-y border-slate-200/80 relative overflow-hidden" id="why-us">
      {/* Background Animated Floating Ambient Orbs */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -20, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 -right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-[110px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase shadow-xs hover:border-blue-300 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>THE STRATEGIC ADVANTAGE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]"
          >
            Why Businesses Choose <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
              LeadNest IT.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            The difference between hiring fragmented contractors and partnering with an institutional digital growth firm.
          </motion.p>
        </div>

        {/* 6 Benefits Grid with Staggered Motion and Hover Physics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {WHY_US_BENEFITS.map((b) => (
            <motion.div
              key={b.number}
              variants={cardVariants}
              whileHover={{
                y: -7,
                scale: 1.015,
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400/80 transition-colors duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-blue-600/10 shadow-xs relative overflow-hidden"
            >
              {/* Top Accent Gradient Line that glows on hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getAccentColor(b.number)} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Shimmer sweep effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-slate-100/90 border border-slate-200/70 flex items-center justify-center group-hover:bg-blue-50/80 group-hover:border-blue-200 transition-all duration-300 shadow-2xs">
                    {getBenefitIcon(b.number)}
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-black text-slate-400 group-hover:text-blue-600 transition-colors duration-300 bg-slate-50 group-hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200/60 group-hover:border-blue-200">
                    {b.number}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors duration-200 tracking-tight">
                  {b.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {b.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-blue-700 font-semibold relative z-10">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Enterprise Grade Standard
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
