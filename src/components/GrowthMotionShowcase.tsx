import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowUpRight, Target, Zap, ShieldCheck } from 'lucide-react';

export const GrowthMotionShowcase: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<number>(2);

  const stages = [
    {
      title: 'Paid & Search Reach',
      val: '142,500',
      rate: '+58% MoM',
      color: 'from-blue-600 to-sky-500',
      border: 'border-blue-200',
      badge: 'Audience Acquisition'
    },
    {
      title: 'High-Intent Traffic',
      val: '24,800',
      rate: '5.2% CTR',
      color: 'from-sky-500 to-teal-500',
      border: 'border-sky-200',
      badge: 'Landing Page Flow'
    },
    {
      title: 'Qualified Leads',
      val: '3,120',
      rate: '19.4% Opt-in',
      color: 'from-emerald-600 to-teal-500',
      border: 'border-emerald-200',
      badge: 'Automated Scoring'
    },
    {
      title: 'Revenue Pipeline',
      val: '$68,400',
      rate: '+340% Lift',
      color: 'from-emerald-600 to-green-600',
      border: 'border-emerald-300',
      badge: 'Closed Sales'
    }
  ];

  const bars = [
    { week: 'W1', value: 35, label: '$12k' },
    { week: 'W2', value: 52, label: '$24k' },
    { week: 'W3', value: 78, label: '$45k' },
    { week: 'W4', value: 100, label: '$68k' }
  ];

  return (
    <div className="w-full space-y-4" id="growth-motion-container">
      {/* Top Stats Banner */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-2 sm:p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-1 text-[9px] sm:text-xs font-mono text-emerald-800 font-bold mb-0.5">
            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
            <span>ROAS</span>
          </div>
          <div className="text-sm sm:text-lg font-black text-slate-900 tracking-tight">4.8x</div>
          <div className="text-[8px] sm:text-[9px] text-slate-600 font-mono font-medium truncate">Peak Lift</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-2 sm:p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-center relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-1 text-[9px] sm:text-xs font-mono text-sky-800 font-bold mb-0.5">
            <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-600" />
            <span>Conversion</span>
          </div>
          <div className="text-sm sm:text-lg font-black text-slate-900 tracking-tight">19.4%</div>
          <div className="text-[8px] sm:text-[9px] text-slate-600 font-mono font-medium truncate">Lead-to-Call</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-2 sm:p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-center relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-1 text-[9px] sm:text-xs font-mono text-blue-800 font-bold mb-0.5">
            <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
            <span>Scale</span>
          </div>
          <div className="text-sm sm:text-lg font-black text-slate-900 tracking-tight">+340%</div>
          <div className="text-[8px] sm:text-[9px] text-slate-600 font-mono font-medium truncate">Velocity</div>
        </motion.div>
      </div>

      {/* Interactive Growth Trajectory Curve & Funnel Visualizer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 relative overflow-hidden shadow-xs">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Live Conversion Trajectory
            </span>
          </div>
          <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
            <ArrowUpRight className="w-3 h-3 text-emerald-600" />
            Compounding
          </span>
        </div>

        {/* Animated SVG Chart Curve */}
        <div className="relative h-28 w-full my-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 110" preserveAspectRatio="none">
            <defs>
              <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
              <linearGradient id="growthFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#16A34A" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(15,23,42,0.06)" strokeDasharray="3 3" />
            <line x1="0" y1="55" x2="400" y2="55" stroke="rgba(15,23,42,0.06)" strokeDasharray="3 3" />
            <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(15,23,42,0.06)" strokeDasharray="3 3" />

            {/* Area Fill */}
            <motion.path
              d="M 0 100 Q 100 95, 200 65 T 400 15 L 400 110 L 0 110 Z"
              fill="url(#growthFill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Glowing Growth Curve */}
            <motion.path
              d="M 0 100 Q 100 95, 200 65 T 400 15"
              fill="none"
              stroke="url(#growthGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />

            {/* Key Milestones on Curve */}
            {[
              { cx: 50, cy: 98, label: 'Launch' },
              { cx: 160, cy: 78, label: 'Optimization' },
              { cx: 280, cy: 45, label: 'Scaling' },
              { cx: 395, cy: 15, label: 'Breakthrough' }
            ].map((pt, i) => (
              <g key={i}>
                <motion.circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r="4.5"
                  fill="#FFFFFF"
                  stroke="#16A34A"
                  strokeWidth="2.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{
                    scale: { repeat: Infinity, duration: 2.5, delay: i * 0.4 }
                  }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Weekly Revenue Progress Bars */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
          {bars.map((bar, i) => (
            <div key={bar.week} className="text-center">
              <div className="h-10 bg-slate-100 rounded-md overflow-hidden flex items-end p-0.5 border border-slate-200">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.value}%` }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                  className="w-full rounded-xs bg-gradient-to-t from-blue-600 via-sky-500 to-emerald-500"
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 mt-1">
                <span className="font-semibold">{bar.week}</span>
                <span className="text-emerald-700 font-bold">{bar.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Breakdown Selector */}
      <div className="grid grid-cols-2 gap-2">
        {stages.map((stage, idx) => {
          const isSelected = selectedMetric === idx;
          return (
            <div
              key={stage.title}
              onClick={() => setSelectedMetric(idx)}
              className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                isSelected
                  ? 'bg-blue-50/60 border-blue-400 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                <span className="truncate font-medium">{stage.badge}</span>
                <span className="text-emerald-700 font-bold shrink-0">{stage.rate}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs sm:text-sm font-black text-slate-900">{stage.val}</span>
                <span className="text-[10px] text-slate-600 truncate max-w-[80px] font-medium">{stage.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Guarantee Pill */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
        <div className="flex items-center gap-1.5 text-slate-800 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Transparent Data & Weekly Attribution</span>
        </div>
        <span className="font-mono text-emerald-700 font-bold">Zero Fluff</span>
      </div>
    </div>
  );
};
