import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/content';
import { CaseStudyItem } from '../types';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  Layers,
  Building2,
  ShoppingBag,
  Activity,
  Coffee,
  X,
  ChevronRight,
  Award,
  BarChart3,
  Quote,
  Check
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface CaseStudiesProps {
  onConsultCaseStudy?: (industry: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onConsultCaseStudy }) => {
  const { currency } = useCurrency();
  const isUSD = currency === 'USD';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudyItem | null>(null);

  const categories = [
    'All',
    'eCommerce',
    'B2B & Enterprise',
    'Healthcare',
    'Subscription & D2C'
  ];

  const filteredStudies = selectedCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((item) => item.category === selectedCategory);

  const getCategoryIcon = (cat?: string) => {
    switch (cat) {
      case 'eCommerce':
        return <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />;
      case 'B2B & Enterprise':
        return <Building2 className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Healthcare':
        return <Activity className="w-3.5 h-3.5 text-rose-600" />;
      case 'Subscription & D2C':
        return <Coffee className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 relative overflow-hidden" id="case-studies">
      {/* Decorative Subtle Background Graphics */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>{isUSD ? 'AUDITED CLIENT WORK & MEASURED OUTCOMES' : 'যাচাইকৃত ক্লায়েন্ট ফলাফল ও কেস স্টাডিজ'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            {isUSD ? 'Real Client Projects & Verified Results' : 'বাস্তব ক্লায়েন্ট প্রজেক্ট ও প্রমাণিত ফলাফল'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isUSD
              ? 'We showcase only genuine client engagements, audited engineering architectures, and verified growth metrics across our core digital services.'
              : 'আমরা আমাদের মূল ডিজিটাল সার্ভিসসমূহের অধীনে শুধুমাত্র বাস্তব ক্লায়েন্ট প্রজেক্ট, নিখুঁত আর্কিটেকচার এবং যাচাইকৃত গ্রোথ রেজাল্ট উপস্থাপন করি।'}
          </p>
        </div>

        {/* Executive Summary Stats Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 max-w-5xl mx-auto">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-500">
                {isUSD ? 'Paid Ads ROAS' : 'বিজ্ঞাপনে গড় ROAS'}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-950">3.4x</div>
            <p className="text-xs text-slate-500 mt-1">
              {isUSD ? 'Sustained 90-day return' : '৯০ দিনে ধারাবাহিক রিটার্ন'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-500">
                {isUSD ? 'Response Latency' : 'লিড রেসপন্স সময়'}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-950">&lt;45s</div>
            <p className="text-xs text-slate-500 mt-1">
              {isUSD ? 'Automated CRM routing' : 'স্বয়ংক্রিয় CRM ও WhatsApp'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <BarChart3 className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-500">
                {isUSD ? 'Operational Save' : 'কাজের সময় সাশ্রয়'}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-950">-53%</div>
            <p className="text-xs text-slate-500 mt-1">
              {isUSD ? 'Drop in missed bookings' : 'ম্যানুয়াল কাজের ঘাটতি হ্রাস'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-500">
                {isUSD ? 'Verification' : 'যাচাইয়ের মান'}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-950">100%</div>
            <p className="text-xs text-slate-500 mt-1">
              {isUSD ? 'Audited client outcomes' : 'ক্লায়েন্ট স্বাক্ষরিত ফলাফল'}
            </p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All'
              ? CASE_STUDIES.length
              : CASE_STUDIES.filter((i) => i.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 text-white shadow-md shadow-slate-950/20'
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat !== 'All' && getCategoryIcon(cat)}
                <span>{cat === 'All' ? (isUSD ? 'All Case Studies' : 'সকল কেস স্টাডিজ') : cat}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  isSelected ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Case Studies Grid */}
        {filteredStudies.length === 0 ? (
          <div className="max-w-xl mx-auto text-center p-12 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-sm text-slate-500">No case studies found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                className="rounded-3xl bg-white border border-slate-200 hover:border-blue-400/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group shadow-xs relative"
              >
                <div className="space-y-6">
                  {/* Top Bar: Category Pill + Verification Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {getCategoryIcon(study.category)}
                        <span>{study.industryTag || study.category}</span>
                      </span>
                      {study.auditPeriod && (
                        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
                          • {study.auditPeriod}
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isUSD ? 'Verified Client Deliverable' : 'যাচাইকৃত ফলাফল'}</span>
                    </div>
                  </div>

                  {/* Client & Title Header */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                      {study.clientName || study.clientIndustry}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      {study.clientIndustry}
                    </p>
                  </div>

                  {/* Primary Highlight Metric Banner */}
                  {study.statHighlight && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 border border-blue-100/90 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-700 block mb-0.5">
                          {isUSD ? 'Primary Verified Milestone' : 'মূল অর্জিত মাইলফলক'}
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-slate-950 flex items-center gap-2">
                          <span>{study.statHighlight.value}</span>
                          <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-blue-200/80 font-sans">
                            {study.statHighlight.label}
                          </span>
                        </div>
                      </div>

                      {study.secondaryStats && study.secondaryStats.length > 0 && (
                        <div className="flex items-center gap-3 divide-x divide-slate-200">
                          {study.secondaryStats.map((st, i) => (
                            <div key={i} className={i > 0 ? 'pl-3' : ''}>
                              <div className="text-sm font-bold text-slate-900 font-mono">{st.value}</div>
                              <div className="text-[10px] text-slate-500">{st.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Problem vs. Engineered Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* The Challenge */}
                    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                      <div className="flex items-center gap-1.5 text-rose-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                          {isUSD ? 'The Bottleneck' : 'মূল চ্যালেঞ্জ'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    {/* The Solution */}
                    <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200/80 space-y-2">
                      <div className="flex items-center gap-1.5 text-blue-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                          {isUSD ? 'Engineered Solution' : 'LeadNest IT সমাধান'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Verified Result Strip */}
                  <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-200 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <strong className="text-xs font-bold uppercase tracking-wider font-mono">
                        {isUSD ? 'Verified Measured Outcome' : 'যাচাইকৃত চূড়ান্ত ফলাফল'}
                      </strong>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium pl-5.5">
                      {study.verifiedResult}
                    </p>
                  </div>

                  {/* Services Delivered Chips */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      {isUSD ? 'Integrated Services & Tech Stack' : 'ব্যবহৃত সার্ভিসসমূহ ও টেক স্ট্যাক'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {study.servicesUsed.map((srv, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Client Testimonial (if available) */}
                  {study.clientTestimonial && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 text-xs text-slate-700 space-y-2 relative">
                      <Quote className="w-5 h-5 text-blue-200 absolute top-3 right-3 pointer-events-none" />
                      <p className="italic leading-relaxed text-slate-800">
                        "{study.clientTestimonial.quote}"
                      </p>
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                          {study.clientTestimonial.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-950 text-xs leading-none">
                            {study.clientTestimonial.author}
                          </div>
                          {study.clientTestimonial.role && (
                            <div className="text-[10px] text-slate-500 mt-0.5 leading-none">
                              {study.clientTestimonial.role}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalStudy(study)}
                    className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                  >
                    <span>{isUSD ? 'View Full Architecture & Audit' : 'পূর্ণ আর্কিটেকচার ও অডিট দেখুন'}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </button>

                  {onConsultCaseStudy && (
                    <button
                      type="button"
                      onClick={() => onConsultCaseStudy(study.clientIndustry)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition-all cursor-pointer shadow-xs hover:shadow-md"
                    >
                      <span>{isUSD ? 'Discuss a Similar Solution' : 'অনুরূপ সলিউশন আলোচনা করুন'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LeadNest IT Verification Standard Guarantee Box */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
              <span>{isUSD ? 'Our Verification & Transparency Standard' : 'আমাদের স্বচ্ছতা ও অডিট স্ট্যান্ডার্ড'}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                AUDITED
              </span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isUSD
                ? 'Every case study featured here reflects signed commercial contracts, measured analytics pipelines, and audited business deliverables. We strictly prohibit synthetic case studies, fabricated reviews, or unverified performance claims.'
                : 'এখানে উল্লেখিত প্রতিটি কেস স্টাডি সরাসরি চুক্তিভিত্তিক কাজ, পরিমাপযোগ্য অ্যানালিটিক্স এবং অডিটকৃত ফলাফলের ওপর ভিত্তি করে তৈরি। আমরা কোনো কাল্পনিক রিভিউ বা ভুয়া মেট্রিক্সে বিশ্বাস করি না।'}
            </p>
          </div>
          {onConsultCaseStudy && (
            <button
              type="button"
              onClick={() => onConsultCaseStudy('Verified Architecture Strategy')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors shrink-0 cursor-pointer"
            >
              <span>{isUSD ? 'Request Project Brief' : 'প্রজেক্ট ব্রিফ চান'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ================= Deep Dive Architecture Modal ================= */}
      {activeModalStudy && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-150 my-auto max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalStudy(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    {getCategoryIcon(activeModalStudy.category)}
                    <span>{activeModalStudy.category}</span>
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {activeModalStudy.auditPeriod}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-950">
                  {activeModalStudy.clientName || activeModalStudy.clientIndustry}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-mono">
                  {activeModalStudy.clientIndustry}
                </p>
              </div>

              {/* Verified Result Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs font-mono uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isUSD ? 'Verified Commercial Outcome' : 'যাচাইকৃত ফলাফল'}</span>
                </div>
                <p className="text-sm text-emerald-950 font-semibold leading-relaxed">
                  {activeModalStudy.verifiedResult}
                </p>
              </div>

              {/* Before vs. After Metric Table */}
              {activeModalStudy.beforeMetrics && activeModalStudy.afterMetrics && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                    {isUSD ? 'Before vs. After Transformation' : 'পূর্ববর্তী অবস্থা বনাম বর্তমান রূপান্তর'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-rose-700 mb-2 flex items-center gap-1.5 font-mono uppercase">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>{isUSD ? 'Before LeadNest IT' : 'পূর্ববর্তী সমস্যা'}</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {activeModalStudy.beforeMetrics.map((m, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-500 font-bold">×</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200">
                      <div className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-1.5 font-mono uppercase">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>{isUSD ? 'After Engineered System' : 'পরবর্তী ফলাফল'}</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                        {activeModalStudy.afterMetrics.map((m, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Engineering & Architecture Highlights */}
              {activeModalStudy.architectureHighlights && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                    {isUSD ? 'Key Technical Deliverables' : 'টেকনিক্যাল আর্কিটেকচার ও বৈশিষ্ট্য'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModalStudy.architectureHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-800">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Quote */}
              {activeModalStudy.clientTestimonial && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <p className="italic leading-relaxed text-slate-800">
                    "{activeModalStudy.clientTestimonial.quote}"
                  </p>
                  <div className="font-bold text-slate-900 text-xs">
                    {activeModalStudy.clientTestimonial.author} — <span className="text-slate-500 font-normal">{activeModalStudy.clientTestimonial.role}</span>
                  </div>
                </div>
              )}

              {/* Modal CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {onConsultCaseStudy && (
                  <button
                    type="button"
                    onClick={() => {
                      const ind = activeModalStudy.clientIndustry;
                      setActiveModalStudy(null);
                      onConsultCaseStudy(`Architecture Plan for ${ind}`);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-blue-600/20"
                  >
                    <span>{isUSD ? 'Discuss This Architecture For Your Business' : 'আপনার বিজনেসের জন্য এই সমাধান নিয়ে আলোচনা করুন'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveModalStudy(null)}
                  className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  {isUSD ? 'Close' : 'বন্ধ করুন'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
