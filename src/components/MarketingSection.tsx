import React, { useState } from 'react';
import { ArrowRight, Filter, Target } from 'lucide-react';
import { MARKETING_FUNNEL_STEPS } from '../data/content';

interface MarketingSectionProps {
  onGrowBusiness: () => void;
}

export const MarketingSection: React.FC<MarketingSectionProps> = ({ onGrowBusiness }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const marketingChannels = [
    'Meta Ads',
    'Google Ads',
    'Lead Generation',
    'Retargeting',
    'Tracking',
    'Optimization'
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="marketing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Copy, Services Tags, CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
              <span>PAID ADVERTISING & REVENUE GROWTH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              More Than Traffic. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                We Build Growth.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Your marketing should do more than generate clicks. It should attract the right audience,
              generate qualified leads and help turn those leads into customers.
            </p>

            {/* Channels & Services badges */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Targeted Marketing Disciplines:
              </span>
              <div className="flex flex-wrap gap-2">
                {marketingChannels.map((channel, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800 hover:border-blue-400 hover:text-blue-700 transition-colors"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={onGrowBusiness}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/20 text-base"
                id="grow-my-business-cta"
              >
                <span>Grow My Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Animated 7-Stage Funnel */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-50/70 border border-slate-200 p-6 sm:p-8 shadow-md relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
                    The High-Yield Marketing Funnel
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  End-to-End Tracking
                </span>
              </div>

              {/* Funnel Stages */}
              <div className="space-y-2">
                {MARKETING_FUNNEL_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const widths = ['w-full', 'w-[96%]', 'w-[91%]', 'w-[86%]', 'w-[80%]', 'w-[75%]', 'w-[70%]'];
                  const widthClass = widths[idx] || 'w-full';

                  return (
                    <div key={step.step} className="flex flex-col items-center">
                      <div
                        onClick={() => setActiveStep(idx)}
                        className={`cursor-pointer transition-all duration-300 mx-auto rounded-xl p-3 border flex items-center justify-between ${widthClass} ${
                          isActive
                            ? 'bg-blue-50 border-blue-400 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                              isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {step.step}
                          </span>
                          <div>
                            <span className="text-xs font-bold tracking-wider text-slate-900">
                              {step.title}
                            </span>
                            {isActive && (
                              <p className="text-[11px] text-slate-600 mt-0.5 max-w-xs sm:max-w-sm font-normal">
                                {step.desc}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0 ml-2">
                          <span className="text-[10px] font-mono text-slate-500 font-medium">
                            {isActive ? 'Current Focus' : 'Stage ' + step.step}
                          </span>
                        </div>
                      </div>

                      {idx < MARKETING_FUNNEL_STEPS.length - 1 && (
                        <div className="h-2 w-0.5 bg-slate-200 my-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Funnel Footer Note */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  No vanity metrics. Measured on Customer Acquisition Cost & ROAS.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
