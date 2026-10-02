import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, Bot, TrendingUp, Sparkles, Compass, Calendar, 
  SlidersHorizontal, Search, ArrowRight, CheckCircle2, ChevronDown, Clock, ShieldCheck
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface ServiceSearchCardProps {
  onOpenConsultation: (service?: string) => void;
  onNavigateToSolutions?: () => void;
}

type ServiceCategory = 'ads' | 'creative' | 'web' | 'automation';

export const ServiceSearchCard: React.FC<ServiceSearchCardProps> = ({
  onOpenConsultation,
  onNavigateToSolutions,
}) => {
  const { currency } = useCurrency();
  const isUSD = currency === 'USD';

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('ads');
  const [selectedScope, setSelectedScope] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [showResultCard, setShowResultCard] = useState(false);

  // 4 Core Service Categories
  const categories = [
    {
      id: 'ads' as ServiceCategory,
      label: isUSD ? 'Paid Advertising' : 'পেইড অ্যাডভার্টাইজিং',
      subtitle: 'Data-Driven Meta & Google Ad Campaigns',
      icon: TrendingUp,
      scopes: [
        { id: 'meta_funnel', name: isUSD ? 'Meta (FB & IG) High-ROAS Campaign' : 'মেটা (ফেসবুক ও ইনস্টাগ্রাম) অ্যাডস ক্যাম্পেইন', est: 'Ongoing Retainer' },
        { id: 'google_search', name: isUSD ? 'Google Search & High-Intent Ads' : 'গুগল সার্চ ও ইনটেন্ট অ্যাডস', est: 'Monthly Management' },
        { id: 'retargeting', name: isUSD ? 'Omnichannel Retargeting Loop' : 'অমনিচ্যানেল রিটার্গেটিং ফানেল', est: 'Fast Setup' },
        { id: 'b2b_leads', name: isUSD ? 'B2B Client Acquisition Pipeline' : 'B2B ক্লায়েন্ট অ্যাকুইজিশন পাইপলাইন', est: 'Sprint + Retainer' },
      ],
      defaultTimeline: isUSD ? 'Monthly Growth Retainer' : 'মাসিক গ্রোথ রিটেইনার',
      defaultBudget: isUSD ? '$1,000 - $2,500/mo' : '৳ ৭০,০০০ - ৳ ১,৫০,০০০/মাস',
      badge: isUSD ? 'Specialist-Led Media Buying' : 'স্পেশালিস্ট মিডিয়া বায়িং',
    },
    {
      id: 'creative' as ServiceCategory,
      label: isUSD ? 'Creative & Video' : 'ক্রিয়েটিভ ও ভিডিও',
      subtitle: 'High-Converting Ad Creatives & Video Content',
      icon: Sparkles,
      scopes: [
        { id: 'video_ads', name: isUSD ? 'Short-Form Video Ads (Reels, TikTok)' : 'শর্ট-ফর্ম ভিডিও অ্যাডস (রিলস, টিকটক)', est: '1-2 Weeks' },
        { id: 'ad_creatives', name: isUSD ? 'Performance Ad Creative Packs' : 'হাই-কনভার্টিং অ্যাড ক্রিয়েটিভ প্যাক', est: '1 Week' },
        { id: 'brand_identity', name: isUSD ? 'Brand Identity & Visual Design' : 'ব্র্যান্ড আইডেন্টিটি ও ভিজ্যুয়াল ডিজাইন', est: '10-14 Days' },
        { id: 'cro_design', name: isUSD ? 'Conversion-Focused Visual Assets' : 'কনভার্শন-ফোকাসড ভিজ্যুয়াল অ্যাসেটস', est: '5-7 Days' },
      ],
      defaultTimeline: isUSD ? '1-2 Weeks Sprint' : '১-২ সপ্তাহের স্প্রিন্ট',
      defaultBudget: isUSD ? '$600 - $1,800' : '৳ ৪৫,০০০ - ৳ ১,২০,০০০',
      badge: isUSD ? '7+ Years Creative Experience' : '৭+ বছরের ক্রিয়েটিভ অভিজ্ঞতা',
    },
    {
      id: 'web' as ServiceCategory,
      label: isUSD ? 'Websites & eCommerce' : 'ওয়েবসাইট ও ই-কমার্স',
      subtitle: 'Fast, Modern Websites & Online Stores',
      icon: Code2,
      scopes: [
        { id: 'ecommerce', name: isUSD ? 'High-Converting eCommerce Storefront' : 'হাই-কনভার্টিং ই-কমার্স স্টোরফ্রন্ট', est: '2-3 Weeks' },
        { id: 'corporate', name: isUSD ? 'Modern Business & Corporate Website' : 'আধুনিক বিজনেস ও কর্পোরেট ওয়েবসাইট', est: '2 Weeks' },
        { id: 'landing', name: isUSD ? 'High-Converting Landing Page' : 'হাই-কনভার্টিং ল্যান্ডিং পেজ ফানেল', est: '7-10 Days' },
        { id: 'redesign', name: isUSD ? 'Website Redesign & Conversion Tune' : 'ওয়েবসাইট রিডিজাইন ও স্পিড অপটিমাইজেশন', est: '1-2 Weeks' },
      ],
      defaultTimeline: isUSD ? '2-3 Weeks Sprint' : '২-৩ সপ্তাহের স্প্রিন্ট',
      defaultBudget: isUSD ? '$1,200 - $3,000' : '৳ ৯০,০০০ - ৳ ২,২০,০০০',
      badge: isUSD ? 'Conversion-Focused Architecture' : 'কনভার্শন-ফোকাসড আর্কিটেকচার',
    },
    {
      id: 'automation' as ServiceCategory,
      label: isUSD ? 'AI Customer Support & Automation' : 'এআই কাস্টমার সাপোর্ট ও অটোমেশন',
      subtitle: '24/7 AI Chat Support & Instant Lead Routing',
      icon: Bot,
      scopes: [
        { id: 'ai_support', name: isUSD ? '24/7 AI Customer Support Assistant' : '২৪/৭ এআই কাস্টমার সাপোর্ট অ্যাসিস্ট্যান্ট', est: '1-2 Weeks' },
        { id: 'lead_qual_booking', name: isUSD ? 'Instant Lead Qualification & Booking' : 'ইনস্ট্যান্ট লিড কোয়ালিফিকেশন ও শিডিউলিং', est: '7-10 Days' },
        { id: 'crm_whatsapp_email', name: isUSD ? 'WhatsApp, Email & CRM Automation' : 'হোয়াটসঅ্যাপ, ইমেইল ও CRM অটোমেশন', est: '10-14 Days' },
        { id: 'human_handoff', name: isUSD ? 'Smart Human Handoff & Team Alerts' : 'স্মার্ট হিউম্যান হ্যান্ডঅফ ও টিম নোটিফিকেশন', est: '5-7 Days' },
      ],
      defaultTimeline: isUSD ? '10-14 Days Express' : '১০-১৪ দিন এক্সপ্রেস',
      defaultBudget: isUSD ? '$1,000 - $2,500' : '৳ ৭৫,০০০ - ৳ ১,৬০,০০০',
      badge: isUSD ? 'Fast AI-Assisted Response' : 'দ্রুত এআই-অ্যাসিস্টেড রেসপন্স',
    },
  ];

  const currentCategoryData = categories.find((c) => c.id === activeCategory) || categories[0];

  // Set defaults when category switches
  const handleCategorySwitch = (catId: ServiceCategory) => {
    setActiveCategory(catId);
    setShowResultCard(false);
    const cat = categories.find((c) => c.id === catId);
    if (cat) {
      setSelectedScope(cat.scopes[0].name);
      setSelectedTimeline(cat.defaultTimeline);
      setSelectedBudget(cat.defaultBudget);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResultCard(true);
  };

  const handleBookSelected = () => {
    const serviceName = `${currentCategoryData.label} — ${selectedScope || currentCategoryData.scopes[0].name}`;
    onOpenConsultation(serviceName);
  };

  return (
    <div className="w-full max-w-5xl mx-auto" id="service-search-widget">
      {/* 
        Travel Agency-style Floating Pill Tabs:
        Centered on desktop, clean 4-pill row on tablet, and intuitive 2x2 grid on phone view
      */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:flex md:flex-row md:items-center md:justify-center gap-1.5 sm:gap-2 md:gap-3 pb-3 sm:pb-4 select-none px-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySwitch(cat.id)}
              className={`w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 px-2.5 sm:px-3 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-[11px] sm:text-xs md:text-sm tracking-tight transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 sm:scale-105 z-10'
                  : 'bg-white hover:bg-slate-50 text-slate-800 shadow-sm hover:shadow-md border border-slate-200/90 hover:text-blue-600'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-600'}`} />
              <span className="truncate">{cat.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0 ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Elevated Card (White Container with Rounded Corners & Soft Shadow) */}
      <div className="bg-white rounded-[20px] sm:rounded-[36px] border border-slate-200/90 shadow-lg sm:shadow-2xl shadow-slate-900/10 p-3.5 sm:p-7 md:p-8 relative z-10">
        <form onSubmit={handleSearch} className="space-y-3.5 sm:space-y-4">
          {/* Top Category Badge & Highlights */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-slate-900 text-xs sm:text-sm">{currentCategoryData.subtitle}</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[10px] sm:text-[11px] font-bold border border-blue-100">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              {currentCategoryData.badge}
            </span>
          </div>

          {/* 3 Input Selectors + 1 Big Search Button (Desktop: Grid 12 cols, Mobile: Clean Touch-Optimized Stack) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-4 items-center">
            {/* Box 1: Select Destination/Scope */}
            <div className="md:col-span-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-400 transition-all group shadow-2xs">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 sm:mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{isUSD ? '1. Select Solution Scope' : '১. পছন্দের সমাধান বাছাই করুন'}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedScope || currentCategoryData.scopes[0].name}
                  onChange={(e) => {
                    setSelectedScope(e.target.value);
                    setShowResultCard(false);
                  }}
                  className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-none cursor-pointer pr-6 py-1 truncate min-h-[36px]"
                >
                  {currentCategoryData.scopes.map((scope) => (
                    <option key={scope.id} value={scope.name}>
                      {scope.name} ({scope.est})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-blue-600 transition-colors" />
              </div>
            </div>

            {/* Box 2: Target Timeline / Delivery Date */}
            <div className="md:col-span-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-400 transition-all group shadow-2xs">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 sm:mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{isUSD ? '2. Target Timeline' : '২. কাঙ্ক্ষিত ডেলিভারি টাইম'}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedTimeline || currentCategoryData.defaultTimeline}
                  onChange={(e) => {
                    setSelectedTimeline(e.target.value);
                    setShowResultCard(false);
                  }}
                  className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-none cursor-pointer pr-6 py-1 truncate min-h-[36px]"
                >
                  <option value={currentCategoryData.defaultTimeline}>
                    {currentCategoryData.defaultTimeline}
                  </option>
                  <option value={isUSD ? 'Express Sprint (7-14 Days)' : 'এক্সপ্রেস স্প্রিন্ট (৭-১৪ দিন)'}>
                    {isUSD ? 'Express Sprint (7-14 Days)' : 'এক্সপ্রেস স্প্রিন্ট (৭-১৪ দিন)'}
                  </option>
                  <option value={isUSD ? 'Standard Delivery (3-4 Weeks)' : 'স্ট্যান্ডার্ড ডেলিভারি (৩-৪ সপ্তাহ)'}>
                    {isUSD ? 'Standard Delivery (3-4 Weeks)' : 'স্ট্যান্ডার্ড ডেলিভারি (৩-৪ সপ্তাহ)'}
                  </option>
                  <option value={isUSD ? 'Full Quarter Growth Retainer' : 'ফুল কোয়ার্টার গ্রোথ রিটেইনার'}>
                    {isUSD ? 'Full Quarter Growth Retainer' : 'ফুল কোয়ার্টার গ্রোথ রিটেইনার'}
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-emerald-600 transition-colors" />
              </div>
            </div>

            {/* Box 3: Scale / Budget Tier */}
            <div className="md:col-span-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-400 transition-all group shadow-2xs">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 sm:mb-1 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span className="truncate">{isUSD ? '3. Scale / Investment' : '৩. বাজেটের পরিধি'}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedBudget || currentCategoryData.defaultBudget}
                  onChange={(e) => {
                    setSelectedBudget(e.target.value);
                    setShowResultCard(false);
                  }}
                  className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-none cursor-pointer pr-6 py-1 truncate min-h-[36px]"
                >
                  <option value={currentCategoryData.defaultBudget}>
                    {currentCategoryData.defaultBudget} ({isUSD ? 'Recommended' : 'রেকমেন্ডেড'})
                  </option>
                  <option value={isUSD ? 'Starter MVP Tier' : 'স্টার্টার MVP টায়ার'}>
                    {isUSD ? 'Starter MVP Tier' : 'স্টার্টার MVP টায়ার'}
                  </option>
                  <option value={isUSD ? 'Growth & Scaling Tier' : 'গ্রোথ ও স্কেলিং টায়ার'}>
                    {isUSD ? 'Growth & Scaling Tier' : 'গ্রোথ ও স্কেলিং টায়ার'}
                  </option>
                  <option value={isUSD ? 'Custom Enterprise Architecture' : 'কাস্টম এন্টারপ্রাইজ আর্কিটেকচার'}>
                    {isUSD ? 'Custom Enterprise Architecture' : 'কাস্টম এন্টারপ্রাইজ আর্কিটেকচার'}
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-sky-600 transition-colors" />
              </div>
            </div>

            {/* Action Search Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-11 sm:h-full min-h-[44px] sm:min-h-[52px] bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                id="search-solutions-btn"
              >
                <Search className="w-4 h-4 shrink-0 stroke-[2.5]" />
                <span className="tracking-wide uppercase">{isUSD ? 'SEARCH' : 'সার্চ'}</span>
              </button>
            </div>
          </div>

          {/* Underneath Action Text (Matching GoFly's "Can't find what you're looking for? create your Custom Itinerary") */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 font-medium">
            <p>
              {isUSD ? "Can't find your exact specification? " : 'আপনার চাহিদামতো স্পেসিফিকেশন খুঁজে পাচ্ছেন না? '}
              <button
                type="button"
                onClick={() => onOpenConsultation('Custom Architecture Blueprint')}
                className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{isUSD ? 'Request a Custom Architecture Blueprint' : 'কাস্টম ব্লুপ্রিন্ট রিকোয়েস্ট করুন'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </p>

            {onNavigateToSolutions && (
              <button
                type="button"
                onClick={onNavigateToSolutions}
                className="text-slate-500 hover:text-slate-800 text-[11px] font-semibold underline underline-offset-4 cursor-pointer"
              >
                {isUSD ? 'View All Services Page →' : 'সকল সার্ভিস পেজ দেখুন →'}
              </button>
            )}
          </div>
        </form>

        {/* Dynamic Search Result Card with Instant Tailored Breakdown */}
        <AnimatePresence>
          {showResultCard && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-5 pt-5 border-t border-slate-200 overflow-hidden"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/60 border border-blue-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold uppercase mb-1">
                      Matched Growth Architecture
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {selectedScope || currentCategoryData.scopes[0].name}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-500 font-medium block">
                      {isUSD ? 'Estimated Timeline' : 'আনুমানিক সময়সীমা'}
                    </span>
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {selectedTimeline || currentCategoryData.defaultTimeline}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct LeadNest IT technical architecture</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Production QA, clean repo & staging tests</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>Dedicated communication channel & milestone sprints</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs font-mono font-bold text-slate-600">
                    {isUSD ? 'Investment Bracket: ' : 'আনুমানিক বাজেট: '}
                    <strong className="text-blue-700 text-sm">
                      {selectedBudget || currentCategoryData.defaultBudget}
                    </strong>
                  </span>

                  <button
                    type="button"
                    onClick={handleBookSelected}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-md shadow-blue-500/20 text-xs sm:text-sm cursor-pointer transition-all"
                  >
                    <span>{isUSD ? 'Book a Free Strategy Call' : 'ফ্রি স্ট্র্যাটেজি সেশন বুক করুন'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
