import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Activity, Layers, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface BenchmarkPillar {
  id: string;
  icon: React.ElementType;
  metric: string;
  metricHighlight?: string;
  label: string;
  labelBn: string;
  description: string;
  descriptionBn: string;
  badge: string;
  badgeBn: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
  };
  details: string;
}

export const TrustBar: React.FC = () => {
  const { currency } = useCurrency();
  const isUSD = currency === 'USD';
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  const pillars: BenchmarkPillar[] = [
    {
      id: 'speed',
      icon: Zap,
      metric: 'Instant',
      label: 'Fast AI-Assisted Lead Response',
      labelBn: 'দ্রুত এআই-অ্যাসিস্টেড লিড রেসপন্স',
      description: 'Intelligent AI routing and automated WhatsApp/email triggers so no lead is missed',
      descriptionBn: 'ইনটেলিজেন্ট এআই রাউটিং ও হোয়াটসঅ্যাপ/ইমেইল নোটিফিকেশনে তাৎক্ষণিক রেসপন্স',
      badge: 'AI-Assisted SLA',
      badgeBn: 'এআই-অ্যাসিস্টেড SLA',
      color: {
        bg: 'bg-amber-500/10',
        border: 'hover:border-amber-400/60',
        text: 'text-amber-600 dark:text-amber-400',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        badgeText: 'text-amber-700',
        accent: 'from-amber-500 to-orange-500',
      },
      details: 'Instant alerts connect directly to your CRM, WhatsApp & calendar booking without drop-offs.',
    },
    {
      id: 'integration',
      icon: Activity,
      metric: 'Synced',
      label: 'Connected Lead & Customer Workflow',
      labelBn: 'কানেক্টেড লিড ও কাস্টমার ওয়ার্কফ্লো',
      description: 'Unified CRM, Meta/Google ad tracking, and conversion analytics without silos',
      descriptionBn: 'সিআরএম, মেটা/গুগল ট্র্যাকিং ও অ্যানালিটিক্স একই সিস্টেমে সুসংহত',
      badge: 'Unified Systems',
      badgeBn: 'ইউনিফাইড সিস্টেম',
      color: {
        bg: 'bg-blue-500/10',
        border: 'hover:border-blue-400/60',
        text: 'text-blue-600 dark:text-blue-400',
        badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
        badgeText: 'text-blue-700',
        accent: 'from-blue-600 to-cyan-500',
      },
      details: 'Eliminates attribution blindspots with clean conversion tracking & automated lifecycle sync.',
    },
    {
      id: 'reliability',
      icon: ShieldCheck,
      metric: 'Reliable',
      label: 'Reliable Website & Automation Infrastructure',
      labelBn: 'নির্ভরযোগ্য ওয়েবসাইট ও অটোমেশন',
      description: 'Production-ready hosting, rapid page speeds, and stable automated workflows',
      descriptionBn: 'সুপারফাস্ট স্পিড, আধুনিক ক্লাউড হোস্টিং এবং নিরবচ্ছিন্ন অটোমেশন নিশ্চিত করে স্থিতিশীল সার্ভিস',
      badge: 'High Performance',
      badgeBn: 'হাই পারফরম্যান্স',
      color: {
        bg: 'bg-emerald-500/10',
        border: 'hover:border-emerald-400/60',
        text: 'text-emerald-600 dark:text-emerald-400',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        badgeText: 'text-emerald-700',
        accent: 'from-emerald-600 to-teal-500',
      },
      details: 'Built with proven frameworks to ensure high traffic and ad campaigns run smoothly.',
    },
    {
      id: 'synergy',
      icon: Layers,
      metric: 'Specialists',
      label: 'One Partner. Multiple Specialists.',
      labelBn: 'একটি পার্টনার। দক্ষ স্পেশালিস্ট টিম।',
      description: 'Paid ads, creative media, websites, and AI automation handled by dedicated specialists',
      descriptionBn: 'পেইড অ্যাডস, ক্রিয়েটিভ ভিডিও, ওয়েবসাইট ও এআই অটোমেশন প্রতিটি আলাদা স্পেশালিস্ট দ্বারা পরিচালিত',
      badge: 'Dedicated Team',
      badgeBn: 'ডেডিকেটেড টিম',
      color: {
        bg: 'bg-indigo-500/10',
        border: 'hover:border-indigo-400/60',
        text: 'text-indigo-600 dark:text-indigo-400',
        badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        badgeText: 'text-indigo-700',
        accent: 'from-indigo-600 to-violet-600',
      },
      details: 'No multi-agency confusion or friction — all four growth pillars execute synchronously.',
    },
  ];

  return (
    <section
      className="py-16 bg-gradient-to-b from-white via-slate-50/60 to-white border-y border-slate-200/80 relative overflow-hidden"
      id="performance-benchmarks"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Authoritative Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase mb-3.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{isUSD ? 'SPECIALIST GROWTH CAPABILITIES' : 'স্পেশালিস্ট গ্রোথ ক্যাপাবিলিটি'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight"
          >
            {isUSD ? (
              <>
                Connected Systems.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
                  Measurable Business Growth.
                </span>
              </>
            ) : (
              <>
                সুসংহত ডিজিটাল সিস্টেম ও{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
                  পরিমাপযোগ্য বিজনেস গ্রোথ
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-sm text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed"
          >
            {isUSD
              ? 'Marketing campaigns, creative assets, websites, and AI automation working synchronously under one dedicated team of specialists.'
              : 'পেইড মার্কেটিং, ক্রিয়েটিভ ডিজাইন, ওয়েবসাইট এবং এআই অটোমেশন—সবকিছু একসাথে একটি দক্ষ টিমের মাধ্যমে পরিচালিত।'}
          </motion.p>
        </div>

        {/* 4 Interactive Animated Benchmark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = activeHoverId === pillar.id;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onMouseEnter={() => setActiveHoverId(pillar.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                className={`relative group rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default ${pillar.color.border}`}
              >
                {/* Glowing Top Edge Accent Bar on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.color.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  {/* Top Bar: Icon + Live SLA Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <motion.div
                      animate={isHovered ? { scale: 1.1, rotate: [0, -6, 6, 0] } : { scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${pillar.color.bg} ${pillar.color.text} shadow-xs`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-tight ${pillar.color.badgeBg}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span>{isUSD ? pillar.badge : pillar.badgeBn}</span>
                    </div>
                  </div>

                  {/* Primary Large Metric with Optical Typography */}
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono tracking-tight group-hover:text-blue-600 transition-colors duration-200">
                      {pillar.metric}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 opacity-60 group-hover:opacity-100" />
                  </div>

                  {/* Pillar Label */}
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-2">
                    {isUSD ? pillar.label : pillar.labelBn}
                  </h3>

                  {/* Descriptive Context */}
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {isUSD ? pillar.description : pillar.descriptionBn}
                  </p>
                </div>

                {/* Micro Technical Guarantee Footer */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-slate-600 font-medium leading-snug">
                    {pillar.details}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Micro Proof Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500"
        >
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-slate-700">
              {isUSD ? 'LIVE TELEMETRY GUARANTEED' : 'লাইভ টেলিমেট্রি মনিটরড'}
            </span>
            <span className="text-slate-300">•</span>
            <span>{isUSD ? 'Zero third-party vendor lock-in' : 'কোনো থার্ড-পার্টি ভেন্ডর লক-ইন নেই'}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-600">
            <span>SOC-2 Aligned</span>
            <span>•</span>
            <span>GDPR & CCPA Compliant</span>
            <span>•</span>
            <span>REST & GraphQL APIs</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

