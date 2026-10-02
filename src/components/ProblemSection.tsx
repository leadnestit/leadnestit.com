import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  XCircle,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Bot,
  Globe,
  Target,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface ProblemSectionProps {
  onOpenConsultation: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenConsultation }) => {
  const { currency } = useCurrency();
  const isBDT = currency === 'BDT';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const comparisons = [
    {
      id: 0,
      icon: Globe,
      problem: {
        title: 'Low Website Conversions',
        titleBn: 'ওয়েবসাইটে ভিজিটর আসলেও কনভার্শন হয় না',
        desc: 'Slow pages and confusing layouts bounce visitors before they buy or inquire.',
        descBn: 'স্লো লোডিং ও অগোছালো ডিজাইনের কারণে ভিজিটর কেনাকাটা না করেই চলে যায়।',
        badge: 'High Bounce'
      },
      solution: {
        title: 'Websites & eCommerce',
        titleBn: 'ওয়েবসাইট ও ই-কমার্স',
        desc: 'Sub-second loading, conversion-engineered storefronts built to turn clicks into buyers.',
        descBn: 'দ্রুতগতির ওয়েবসাইট ও কনভার্শন-অপ্টিমাইজড ই-কমার্স প্ল্যাটফর্ম।',
        badge: 'Conversion-Focused'
      }
    },
    {
      id: 1,
      icon: Target,
      problem: {
        title: 'Ineffective Ad Spend',
        titleBn: 'বিজ্ঞাপনে খরচ হলেও লাভজনক রেজাল্ট নেই',
        desc: 'Ad dollars spent on broad clicks without funnel intent, yielding low ROAS.',
        descBn: 'সঠিক অডিয়েন্স ও ফানেল ছাড়া বিজ্ঞাপনের বাজেট অপচয় হয়, লাভজনক রিটার্ন আসে না।',
        badge: 'Wasted Budget'
      },
      solution: {
        title: 'Paid Advertising',
        titleBn: 'পেইড অ্যাডভার্টাইজিং',
        desc: 'Specialist-led Meta & Google ad funnels optimized strictly for CPA and profitable ROAS.',
        descBn: 'মেটা ও গুগল পেইড অ্যাডস যা হাই-ইনটেন্ট ক্রেতাদের আকর্ষণ করে আরও বেশি সেলস আনে।',
        badge: 'Measurable ROAS'
      }
    },
    {
      id: 2,
      icon: Sparkles,
      problem: {
        title: 'Creative Fatigue & Low CTR',
        titleBn: 'ক্রিয়েটিভ বা ভিডিওতে গ্রাহক দৃষ্টি দেয় না',
        desc: 'Generic banners get scrolled past, leading to low click-through and high acquisition costs.',
        descBn: 'সাধারণ ব্যানার ও ভিডিও মানুষ এড়িয়ে যায়, ফলে কাস্টমার একুইজিশন খরচ বেড়ে যায়।',
        badge: 'Low Engagement'
      },
      solution: {
        title: 'Creative & Video',
        titleBn: 'ক্রিয়েটিভ ও ভিডিও',
        desc: 'Direct-response short videos, UGC hooks, and visual brand assets that stop the scroll.',
        descBn: 'স্ক্রোল-স্টপিং শর্ট ভিডিও ও আকর্ষণীয় ডিজাইন যা বিজ্ঞাপনের কার্যকারিতা বহুগুণ বাড়ায়।',
        badge: 'Direct-Response'
      }
    },
    {
      id: 3,
      icon: Bot,
      problem: {
        title: 'Slow Response & Manual Silos',
        titleBn: 'দেরিতে রেসপন্স ও ম্যানুয়াল ডাটা এন্ট্রি',
        desc: 'Inquiries sit unanswered for hours while disconnected tools force repetitive manual work.',
        descBn: 'ইনবক্সে লিড ঘণ্টার পর ঘণ্টা পড়ে থাকে এবং ম্যানুয়াল কাজে মূল্যবান সময় নষ্ট হয়।',
        badge: 'Lost Inquiries'
      },
      solution: {
        title: 'AI Support & Automation',
        titleBn: 'এআই সাপোর্ট ও অটোমেশন',
        desc: '24/7 AI agents that reply instantly, qualify high-value leads, and sync to WhatsApp & CRM.',
        descBn: '২৪/৭ তাৎক্ষণিক এআই রেসপন্স ও অটোমেশন যা প্রতিটি লিডকে দ্রুত গ্রাহকে রূপান্তর করে।',
        badge: '24/7 Instant AI'
      }
    }
  ];

  return (
    <section className="py-14 sm:py-16 bg-slate-50/70 relative overflow-hidden" id="the-problem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-2.5 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold tracking-wider uppercase">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>{isBDT ? 'সাইলয়েড বনাম কানেক্টেড সিস্টেম' : 'SILOED VS. CONNECTED SYSTEM'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            {isBDT ? 'বিজনেসের নতুন টুল নয়—' : "Your Business Doesn't Need More Tools."}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
              {isBDT ? 'প্রয়োজন একটি কানেক্টেড সিস্টেম।' : 'It Needs One Connected System.'}
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            {isBDT
              ? 'ওয়েবসাইট, বিজ্ঞাপন ও কাস্টমার সাপোর্ট আলাদা থাকলে গ্রাহক ও বাজেট নষ্ট হয়। লিডনেস্ট এগুলোকে একটি সুসংহত গ্রোথ ইঞ্জিনে রূপান্তর করে।'
              : 'When marketing, websites, and support run in isolation, leads fall through the cracks. We unify all four into an integrated growth engine.'}
          </p>
        </div>

        {/* Compact 2-Column Comparison Grid (Side-by-side on tablet and desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          
          {/* LEFT: The Disconnected Reality */}
          <div className="rounded-2xl bg-white border border-rose-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-rose-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none">
                      {isBDT ? 'ফ্র্যাগমেন্টেড ট্র্যাপ' : 'The Disconnected Trap'}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                      {isBDT ? 'সফটওয়্যার যখন সাইলোতে কাজ করে' : 'When marketing & operations run in silos'}
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  {isBDT ? 'বিচ্ছিন্ন চ্যানেল' : 'Siloed Channels'}
                </span>
              </div>

              {/* 4 Problems List */}
              <div className="space-y-2.5">
                {comparisons.map((item) => {
                  const isHovered = hoveredIdx === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredIdx(item.id)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isHovered
                          ? 'bg-rose-50/80 border-rose-300 ring-1 ring-rose-300/60 shadow-xs'
                          : 'bg-slate-50/60 border-slate-200/70 hover:bg-rose-50/40 hover:border-rose-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0 text-rose-500">
                          <XCircle className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5 mb-0.5">
                            <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">
                              {isBDT ? item.problem.titleBn : item.problem.title}
                            </h4>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-white text-rose-600 border border-rose-200 shrink-0">
                              {item.problem.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                            {isBDT ? item.problem.descBn : item.problem.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-600">
              <Activity className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>
                {isBDT
                  ? 'ফলাফল: বিজ্ঞাপনের অপচয়, ধীর ফলো-আপ এবং কাস্টমার হারানোর ঝুঁকি।'
                  : 'Outcome: Wasted ad budget, slow lead follow-up, and lost market share.'}
              </span>
            </div>
          </div>

          {/* RIGHT: The LeadNest Growth System */}
          <div className="rounded-2xl bg-white border border-blue-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-blue-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none">
                      {isBDT ? 'লিডনেস্ট গ্রোথ সিস্টেম' : 'The LeadNest Growth System'}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                      {isBDT ? '৪টি সুসংহত ডিজিটাল গ্রোথ সার্ভিস' : '4 connected services working as one engine'}
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {isBDT ? 'ইউনাইটেড গ্রোথ' : 'Connected Engine'}
                </span>
              </div>

              {/* 4 Solutions List */}
              <div className="space-y-2.5">
                {comparisons.map((item) => {
                  const Icon = item.icon;
                  const isHovered = hoveredIdx === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredIdx(item.id)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isHovered
                          ? 'bg-blue-50/80 border-blue-400 ring-1 ring-blue-300 shadow-xs'
                          : 'bg-slate-50/60 border-slate-200/70 hover:bg-blue-50/40 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 shrink-0 p-1 rounded-md transition-colors ${
                          isHovered ? 'bg-blue-600 text-white' : 'bg-slate-200/70 text-slate-700'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5 mb-0.5">
                            <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{isBDT ? item.solution.titleBn : item.solution.title}</span>
                              {isHovered && (
                                <span className="text-[9px] font-mono font-bold text-blue-600 flex items-center gap-0.5">
                                  <Zap className="w-2.5 h-2.5 text-blue-600" />
                                  {isBDT ? 'সমাধান' : 'Connected'}
                                </span>
                              )}
                            </h4>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                              {item.solution.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                            {isBDT ? item.solution.descBn : item.solution.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Callout & Action */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-600 font-medium truncate">
                {isBDT ? 'গ্রোথ আর্কিটেক্টদের সাথে আলোচনা করুন' : 'Ready to connect your digital growth?'}
              </span>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs shrink-0 cursor-pointer active:scale-95"
              >
                <span>{isBDT ? 'ফ্রি কনসালটেশন' : 'Book Free Call'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
