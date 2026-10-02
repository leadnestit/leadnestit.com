import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Layers, Layout, Palette, Sparkles, CheckCircle2, MousePointer2 } from 'lucide-react';

export const DesignMotionShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hifi' | 'wireframe' | 'system'>('hifi');

  return (
    <div className="w-full space-y-4" id="design-motion-container">
      {/* Top Architecture Mode Toggles */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200 text-[11px] sm:text-xs">
        <button
          onClick={() => setActiveTab('hifi')}
          className={`flex-1 py-1.5 px-2 sm:px-2.5 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 ${
            activeTab === 'hifi'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden sm:inline">High-Fidelity UI</span>
          <span className="sm:hidden">Hi-Fi UI</span>
        </button>

        <button
          onClick={() => setActiveTab('wireframe')}
          className={`flex-1 py-1.5 px-2 sm:px-2.5 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 ${
            activeTab === 'wireframe'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layout className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden sm:inline">Wireframe Architecture</span>
          <span className="sm:hidden">Wireframe</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`flex-1 py-1.5 px-2 sm:px-2.5 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 ${
            activeTab === 'system'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden sm:inline">Design Tokens</span>
          <span className="sm:hidden">Tokens</span>
        </button>
      </div>

      {/* Main Interactive Stage with Animated Vector & UI Frame */}
      <div className="relative rounded-2xl bg-white border border-slate-200 p-5 overflow-hidden min-h-[260px] flex flex-col justify-between shadow-xs">
        {/* Figma Spatial Grid Background */}
        <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

        {/* Animated Figma Cursor Simulation */}
        <motion.div
          animate={{
            x: [20, 180, 120, 240, 20],
            y: [15, 65, 140, 80, 15]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute z-20 pointer-events-none hidden sm:flex items-start gap-1.5"
        >
          <MousePointer2 className="w-4 h-4 text-blue-600 drop-shadow-sm transform -rotate-12 fill-blue-600" />
          <div className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono text-[10px] font-bold shadow-md shadow-blue-600/20 whitespace-nowrap">
            Ibrahim Samrat • 7+ Yrs UI/UX
          </div>
        </motion.div>

        {/* Interactive Content based on selected tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'hifi' && (
            <motion.div
              key="hifi"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="space-y-3 relative z-10"
            >
              {/* Mockup browser window header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono text-[10px] text-slate-500 font-medium">leadnest-design-engine.app</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 font-mono text-[10px] font-bold">
                  100% Fidelity
                </span>
              </div>

              {/* Card preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-blue-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-blue-700 uppercase tracking-wider font-bold">
                    Conversion Architecture
                  </span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="h-3 w-3/4 rounded bg-slate-200" />
                <div className="h-2 w-1/2 rounded bg-slate-200" />

                {/* Animated vector bezier curve */}
                <div className="h-10 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 300 40">
                    <motion.path
                      d="M 10 35 C 70 5, 180 35, 290 10"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <circle cx="10" cy="35" r="3.5" fill="#2563EB" />
                    <circle cx="290" cy="10" r="3.5" fill="#16A34A" />
                  </svg>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-slate-900">Engineered for Action</span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold">
                    Schedule Direct
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'wireframe' && (
            <motion.div
              key="wireframe"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="space-y-3 relative z-10"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-mono text-[10px] text-slate-700 flex items-center gap-1.5 font-bold">
                  <PenTool className="w-3 h-3 text-blue-600" />
                  UX Skeleton & Information Flow
                </span>
                <span className="font-mono text-[10px] text-blue-700 font-bold">8pt Spatial Grid</span>
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 space-y-3">
                <div className="flex gap-2">
                  <div className="w-1/3 h-6 border border-slate-300 rounded bg-white" />
                  <div className="w-2/3 h-6 border border-slate-300 rounded bg-white" />
                </div>
                <div className="h-12 border border-slate-300 rounded bg-white flex items-center justify-center text-[10px] font-mono text-slate-600 font-medium">
                  Hero Engagement Matrix
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 border border-slate-200 rounded bg-white" />
                  <div className="h-8 border border-slate-200 rounded bg-white" />
                  <div className="h-8 border border-slate-200 rounded bg-white" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="space-y-3 relative z-10"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-mono text-[10px] text-slate-700 flex items-center gap-1.5 font-bold">
                  <Layers className="w-3 h-3 text-blue-600" />
                  Scalable Design System
                </span>
                <span className="font-mono text-[10px] text-emerald-700 font-bold">WCAG AAA Compliance</span>
              </div>

              {/* Color chips in LeadNest brand */}
              <div className="grid grid-cols-4 gap-2">
                <div className="p-2 rounded-lg bg-blue-600 text-center shadow-xs">
                  <span className="block text-[9px] font-mono text-white/90">Lead Blue</span>
                  <span className="text-[10px] font-mono font-bold text-white">#2563EB</span>
                </div>
                <div className="p-2 rounded-lg bg-emerald-600 text-center shadow-xs">
                  <span className="block text-[9px] font-mono text-white/90">Nest Green</span>
                  <span className="text-[10px] font-mono font-bold text-white">#16A34A</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 text-center shadow-xs">
                  <span className="block text-[9px] font-mono text-slate-300">IT Black</span>
                  <span className="text-[10px] font-mono font-bold text-white">#0F172A</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-300 text-center shadow-xs">
                  <span className="block text-[9px] font-mono text-slate-500">Surface</span>
                  <span className="text-[10px] font-mono font-bold text-slate-900">#FFFFFF</span>
                </div>
              </div>

              {/* Specs */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-slate-600 font-medium">Typeface Family:</span>
                  <span className="text-slate-900 font-bold">Plus Jakarta Sans Display</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-slate-600 font-medium">Golden Ratio Ratio:</span>
                  <span className="text-blue-700 font-bold">1.618 Major Third</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-slate-600 font-medium">Frame Spacing:</span>
                  <span className="text-slate-900 font-bold">Strict 8pt Increments</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Craftsmanship Benchmark */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Sub-millisecond Precision</span>
          </span>
          <span className="font-mono text-blue-700 font-bold">60 FPS Motion</span>
        </div>
      </div>

      {/* Metric Badges */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
          <div className="font-mono font-black text-slate-900 text-sm sm:text-base">0.2s</div>
          <div className="text-[10px] text-slate-600 font-mono font-medium">FCP Speed</div>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
          <div className="font-mono font-black text-blue-600 text-sm sm:text-base">100%</div>
          <div className="text-[10px] text-slate-600 font-mono font-medium">Mobile UX</div>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
          <div className="font-mono font-black text-emerald-600 text-sm sm:text-base">0 Fluff</div>
          <div className="text-[10px] text-slate-600 font-mono font-medium">Handcrafted</div>
        </div>
      </div>
    </div>
  );
};
