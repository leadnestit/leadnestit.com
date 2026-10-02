import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ArrowRight,
  Smartphone,
  Tablet,
  Monitor,
  Shield,
  Zap,
  Lock,
  Search,
  CheckCircle,
  Sparkles,
  Layers,
  Gauge,
  Activity,
  CheckCircle2,
  Layout,
  ShoppingBag
} from 'lucide-react';

interface WebsiteGrowthProps {
  onBuildWebsite: () => void;
}

export const WebsiteGrowth: React.FC<WebsiteGrowthProps> = ({ onBuildWebsite }) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeFeatureIdx, setActiveFeatureIdx] = useState<number>(0);

  const features = [
    {
      label: 'Fast & Mobile Responsive',
      icon: Smartphone,
      desc: 'Fast, fluid experience across smartphones, tablets, laptops, and desktops',
      highlightTag: 'Sub-Second Speed',
      previewAction: () => setDeviceView('mobile')
    },
    {
      label: 'Business Websites',
      icon: Layout,
      desc: 'Clean, professional company websites that establish authority and trust',
      highlightTag: 'Brand Authority',
      previewAction: () => setDeviceView('desktop')
    },
    {
      label: 'Conversion-Focused Development',
      icon: CheckCircle,
      desc: 'Strategically placed value propositions, trust cues, and clear calls to action',
      highlightTag: 'Conversion Optimized',
      previewAction: () => setDeviceView('desktop')
    },
    {
      label: 'eCommerce Ready',
      icon: ShoppingBag,
      desc: 'Seamless product catalogs, frictionless carts, and high-converting checkouts',
      highlightTag: 'Shopify / WooCommerce',
      previewAction: () => setDeviceView('desktop')
    },
    {
      label: 'Secure & Reliable',
      icon: Lock,
      desc: '256-bit SSL encryption, reliable cloud hosting, and protected customer data',
      highlightTag: 'Secure & Monitored',
      previewAction: () => setDeviceView('desktop')
    },
    {
      label: 'Search & Lead Ready',
      icon: Search,
      desc: 'Built-in Google SEO foundations and automated lead capture into your CRM',
      highlightTag: 'SEO Structured',
      previewAction: () => setDeviceView('desktop')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/70 border-y border-slate-200/90 relative overflow-hidden" id="website-development">
      {/* Background Animated Ambient Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 -right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -25, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-20 -left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & Animated Interactive Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>DIGITAL PRESENCE & WEBSITES</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight"
            >
              Your Website Is Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                Digital Salesperson.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
            >
              We design websites that don't just look professional. They explain your value,
              build trust, capture leads and guide visitors toward taking action.
            </motion.p>

            {/* 6 Features Interactive Grid with Clean Live Selection (No Blurry Hover Animations) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2"
            >
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                const isActive = activeFeatureIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveFeatureIdx(idx);
                      feat.previewAction();
                    }}
                    className={`p-3.5 rounded-2xl border transition-colors duration-150 flex items-start gap-3 cursor-pointer select-none relative overflow-hidden group ${
                      isActive
                        ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    {/* Active Accent indicator */}
                    {isActive && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-emerald-500"
                      />
                    )}

                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border transition-colors duration-150 ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-blue-50 text-blue-600 border-blue-200'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                          isActive ? 'text-blue-900' : 'text-slate-900'
                        }`}>
                          {feat.label}
                        </h4>
                        {isActive && (
                          <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug font-medium line-clamp-2">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pt-3 flex items-center gap-3"
            >
              <button
                onClick={onBuildWebsite}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-600/20 text-base cursor-pointer"
                id="build-my-website-cta"
              >
                <span>Build My Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-500 font-mono hidden sm:inline-flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Tailored 1-on-1 Build
              </span>
            </motion.div>
          </div>

          {/* Right Column: Premium Animated Interactive Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto rounded-3xl bg-white border border-slate-300/90 shadow-2xl shadow-slate-900/10 overflow-hidden group">
              {/* Browser Chrome Header with Device Switcher */}
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/90" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/90" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/90" />
                  <div className="ml-3 hidden sm:flex items-center gap-2 bg-white px-3 py-1 rounded-md text-[11px] font-mono text-slate-600 border border-slate-200/80 shadow-2xs">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>https://leadnestit.com/client-preview</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-slate-600 shadow-2xs">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      deviceView === 'desktop'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    onClick={() => setDeviceView('tablet')}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      deviceView === 'tablet'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title="Tablet Preview"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Tablet</span>
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      deviceView === 'mobile'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title="Mobile Preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>
              </div>

              {/* Inside Browser Mockup Body with Animated Device Sizing */}
              <div className="p-4 sm:p-6 bg-slate-50/60 min-h-[420px] flex flex-col justify-between overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={deviceView}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className={`space-y-4 transition-all duration-300 ${
                      deviceView === 'mobile'
                        ? 'max-w-xs mx-auto border-2 border-slate-300/80 rounded-2xl p-4 bg-white shadow-lg'
                        : deviceView === 'tablet'
                        ? 'max-w-md mx-auto border-2 border-slate-300/80 rounded-2xl p-4 sm:p-5 bg-white shadow-lg'
                        : 'w-full'
                    }`}
                  >
                    {/* Mockup Top Brand Bar */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-[10px] shadow-xs">
                          LN
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block leading-tight">LeadNest Client Portal</span>
                          <span className="text-[10px] text-slate-500 font-mono">Live Simulation</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
                        </span>
                        98 Core Web Vitals
                      </span>
                    </div>

                    {/* Mockup Hero Card without blurry hover transform */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs relative overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase">
                          CONVERSION-FOCUSED DEVELOPMENT
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                          <Activity className="w-3 h-3 animate-pulse text-emerald-600" />
                          Active Funnel
                        </span>
                      </div>

                      <h5 className="text-sm sm:text-base font-extrabold text-slate-950 leading-snug tracking-tight">
                        High-Velocity B2B Growth Engine Engineered for Maximum Revenue
                      </h5>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        Custom lead-capture funnels and frictionless checkouts engineered for 24/7 client conversion.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          className="h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                        >
                          <span>Get Instant Proposal</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <div className="h-8 px-2.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium flex items-center border border-slate-200">
                          {features[activeFeatureIdx].highlightTag}
                        </div>
                      </div>
                    </div>

                    {/* Trust Metrics Pill inside mockup */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="text-xs sm:text-sm font-mono font-black text-slate-900">
                          0.4s
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium">Load Time</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="text-xs sm:text-sm font-mono font-black text-emerald-600">
                          4.8x
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium">Lead Rate</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="text-xs sm:text-sm font-mono font-black text-blue-600">
                          100%
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium">Responsive</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Bar inside mockup */}
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 text-blue-600 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Business Websites & eCommerce
                  </span>
                  <span className="font-mono text-slate-500 text-[10px]">Fast • Mobile Responsive • Secure</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

