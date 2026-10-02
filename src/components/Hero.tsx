import React from 'react';
import { motion } from 'motion/react';
import { useCurrency } from '../context/CurrencyContext';
import { ServiceSearchCard } from './ServiceSearchCard';
import { CheckCircle2, ShieldCheck, Zap, TrendingUp, Code2 } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: (service?: string) => void;
  onExploreSolutions: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreSolutions }) => {
  const { currency } = useCurrency();
  const isUSD = currency === 'USD';

  // High-resolution modern IT & Marketing Agency workspace scenario (designers, developers, analytics dashboard workspace)
  const agencyHeroBg = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=85";

  return (
    <div className="relative w-full bg-white pt-[56px] sm:pt-[106px] lg:pt-[108px]" id="hero">
      {/* 
        PANORAMIC HERO BANNER:
        Modern Marketing & IT Agency scenario, animated lights, and overlapping search card
      */}
      <div className="relative w-full min-h-[320px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Modern Tech Agency Workspace Image with Cinematic Motion */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={agencyHeroBg}
            alt="LeadNest IT Modern Marketing & Technology Agency Workspace"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full object-cover object-center"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          {/* Multi-layer gradient overlays for high-contrast readability and sleek tech look */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/80" />
          <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />
          {/* Subtle Cyber Tech Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        </div>

        {/* Ambient Moving Gradient Lights (Simple yet Gorgeous Motion Graphics) */}
        <motion.div
          animate={{
            x: [-30, 30, -30],
            y: [-20, 20, -20],
            scale: [1, 1.18, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[480px] h-[320px] bg-blue-500/25 blur-[120px] rounded-full pointer-events-none"
        />
        <motion.div
          animate={{
            x: [30, -30, 30],
            y: [20, -20, 20],
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-[480px] h-[320px] bg-emerald-500/20 blur-[130px] rounded-full pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none"
        />

        {/* Floating Eye-Catching Metric 1 (Left on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden xl:block absolute left-8 lg:left-14 top-24 z-20"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="p-3 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 shadow-2xl shadow-blue-500/10 text-left flex items-center gap-3 select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white font-mono tracking-tight">Paid Advertising</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Meta & Google Media Buying</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Eye-Catching Metric 2 (Right on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="hidden xl:block absolute right-8 lg:right-14 top-24 z-20"
        >
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="p-3 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 shadow-2xl shadow-cyan-500/10 text-left flex items-center gap-3 select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white font-mono tracking-tight">Websites & eCommerce</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Fast, Conversion-Focused</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Centered Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-12 pb-14 sm:pb-28">
          {/* Main Display Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] drop-shadow-lg"
          >
            {isUSD ? (
              <>
                Build. Grow.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                  Automate.
                </span>
              </>
            ) : (
              <>
                বিল্ড • গ্রো •{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                  অটোমেট।
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-200/95 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow mt-2 sm:mt-4 px-2"
          >
            {isUSD
              ? 'Marketing, Websites & AI Customer Support—built to help businesses attract, convert and serve more customers.'
              : 'মার্কেটিং, ওয়েবসাইট এবং এআই কাস্টমার সাপোর্ট—ব্যবসার গ্রাহক আকর্ষণ, সেলস বৃদ্ধি ও স্বয়ংক্রিয় সেবার জন্য।'}
          </motion.p>
        </div>
      </div>

      {/* 
        ELEVATED SEARCH CARD & PILL TABS:
        Overlaps gracefully over the bottom of the banner into the clean page layout
      */}
      <div className="relative -mt-8 sm:-mt-20 lg:-mt-24 z-20 max-w-5xl mx-auto px-2.5 sm:px-6 lg:px-8 pb-10 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <ServiceSearchCard
            onOpenConsultation={onOpenConsultation}
            onNavigateToSolutions={onExploreSolutions}
          />
        </motion.div>

        {/* Supporting Trust Badges below the card */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 font-semibold select-none">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Founder-Led Strategy</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Specialist-Led Execution</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>7+ Years Creative Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};
