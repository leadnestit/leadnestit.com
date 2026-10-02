import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Tag,
  CheckCircle2,
  Share2,
  X,
  User,
  Quote,
  Flame,
  Check
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface BlogSectionProps {
  onOpenConsultation?: (topic?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenConsultation }) => {
  const { currency } = useCurrency();
  const isUSD = currency === 'USD';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Insights');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Handle ESC key and manage background body scroll
  useEffect(() => {
    if (activePost) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActivePost(null);
        }
      };
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activePost]);

  const categories = [
    'All Insights',
    'Paid Advertising',
    'Creative & Video',
    'Websites & eCommerce',
    'AI Customer Support & Automation',
    'Growth Strategy',
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat =
        selectedCategory === 'All Insights' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        (post.titleBn && post.titleBn.toLowerCase().includes(query)) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const handleShareArticle = (post: BlogPost) => {
    const url = window.location.href;
    navigator.clipboard.writeText(`${url}#${post.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Paid Advertising':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Creative & Video':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Websites & eCommerce':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'AI Customer Support & Automation':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Growth Strategy':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden" id="blog">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-12 left-1/3 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================
            HEADER & VALUE PROP
           ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{isUSD ? 'STRATEGY & PLAYBOOKS' : 'বাস্তব স্ট্র্যাটেজি ও প্লে-বুক'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            {isUSD ? 'Practical Strategies for Digital Growth' : 'ডিজিটাল গ্রোথের বাস্তব স্ট্র্যাটেজি'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed">
            {isUSD
              ? 'Practical insights on paid advertising, creative strategy, websites, eCommerce and AI-powered customer support.'
              : 'পেইড অ্যাডভার্টাইজিং, ক্রিয়েটিভ স্ট্র্যাটেজি, ওয়েবসাইট, ই-কমার্স ও এআই কাস্টমার সাপোর্টের কার্যকর গাইড।'}
          </p>
        </div>

        {/* =========================================================
            SEARCH & CATEGORY FILTERS
           ========================================================= */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 text-white shadow-sm shadow-slate-950/20'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-950'
                  }`}
                >
                  {cat === 'All Insights' ? (isUSD ? 'All Insights' : 'সব ইনসাইটস') : cat}
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUSD ? 'Search insights, topics...' : 'ইনসাইটস সার্চ করুন...'}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================
            FEATURED SPOTLIGHT ARTICLE (When not actively searching)
           ========================================================= */}
        {selectedCategory === 'All Insights' && !searchQuery && featuredPost && (
          <div className="mb-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden group">
            {/* Ambient visual streak inside */}
            <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-mono font-bold">
                    <Flame className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isUSD ? 'FEATURED INSIGHT' : 'নির্বাচিত ইনসাইট'}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 text-xs font-mono">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readTime}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  {isUSD ? featuredPost.title : (featuredPost.titleBn || featuredPost.title)}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
                  {isUSD ? featuredPost.excerpt : (featuredPost.excerptBn || featuredPost.excerpt)}
                </p>

                {/* Key Takeaways Snapshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-2xl">
                  {featuredPost.content.takeaways.slice(0, 2).map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-blue-100/90 font-medium bg-white/5 p-2.5 rounded-xl border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>

                {/* Author Info & Read Button */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{featuredPost.author.name}</div>
                      <div className="text-[11px] text-slate-400">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePost(featuredPost)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-950 text-xs font-bold hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer"
                    id="featured-read-btn"
                  >
                    <span>{isUSD ? 'Read Full Insight' : 'সম্পূর্ণ আর্টিকেল পড়ুন'}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Visual Decorative Card Pillar */}
              <div className="lg:col-span-4 hidden lg:flex flex-col justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-4">
                <div className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wider">
                  {isUSD ? 'Core Highlights:' : 'মূল বিষয়বস্তু:'}
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-white block mb-1">01. Speed & Conversions</span>
                    Fast page load times minimize mobile drop-offs and lift conversions.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-white block mb-1">02. Lean Web Foundations</span>
                    Clean code without plugin overload ensures reliable performance.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-white block mb-1">03. Frictionless Flow</span>
                    Intuitive layouts guide visitors directly to inquiry or purchase.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            POSTS GRID
           ========================================================= */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900">{isUSD ? 'No insights found' : 'কোনো ইনসাইট পাওয়া যায়নি'}</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              {isUSD ? 'Try adjusting your search terms or category filter to discover articles.' : 'অন্য কি-ওয়ার্ড দিয়ে সার্চ করুন বা ক্যাটাগরি ফিল্টার পরিবর্তন করুন।'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Insights');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white cursor-pointer"
            >
              {isUSD ? 'Reset Filters' : 'ফিল্টার রিসেট'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredPosts.map((post) => {
              const catColor = getCategoryColor(post.category);
              return (
                <article
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="group rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl hover:shadow-slate-200/80 cursor-pointer relative overflow-hidden"
                  id={`blog-card-${post.id}`}
                >
                  {/* Subtle Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Meta Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border ${catColor}`}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors mb-3">
                      {isUSD ? post.title : (post.titleBn || post.title)}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3 mb-5 font-normal">
                      {isUSD ? post.excerpt : (post.excerptBn || post.excerpt)}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-slate-500 bg-slate-100/90 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Author & Action Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div className="text-[11px]">
                        <span className="font-bold text-slate-900 block leading-tight">{post.author.name}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{post.publishedAt}</span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* =========================================================
          IMMERSIVE ARTICLE READER MODAL (Clean, distraction-free)
         ========================================================= */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center items-start p-3 sm:p-6 md:p-8 animate-fade-in"
          onClick={() => setActivePost(null)}
          id="blog-modal-backdrop"
        >
          {/* Floating quick-close button on top right of screen for fast exit */}
          <button
            onClick={() => setActivePost(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-slate-900/90 text-white hover:bg-red-600 border border-slate-700 shadow-xl transition-all flex items-center gap-2 cursor-pointer text-xs font-mono font-bold hover:scale-105 active:scale-95"
            title="Close article (Esc)"
            id="floating-modal-close"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Back / Close</span>
          </button>

          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 my-2 sm:my-6 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            id="blog-article-modal"
          >
            {/* Modal Top Bar (Sticky, guaranteed visible at all times) */}
            <div className="sticky top-0 z-30 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between shadow-xs">
              <button
                onClick={() => setActivePost(null)}
                className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs sm:text-sm font-bold border border-slate-200 hover:border-blue-300 transition-all cursor-pointer shadow-2xs"
                id="modal-back-btn"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-blue-600" />
                <span>{isUSD ? 'Back to All Insights' : 'সব ইনসাইটসে ফিরে যান'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareArticle(activePost)}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  title="Share Article Link"
                  id="modal-share-btn"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-mono text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-slate-500" />
                      <span className="hidden sm:inline text-[11px]">Share</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActivePost(null)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  id="modal-close-btn"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </div>

            {/* Modal Article Body */}
            <div className="p-6 sm:p-10 space-y-6">
              {/* Category & Read Time */}
              <div className="flex items-center gap-2.5">
                <span className={`text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border ${getCategoryColor(activePost.category)}`}>
                  {activePost.category}
                </span>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activePost.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                {isUSD ? activePost.title : (activePost.titleBn || activePost.title)}
              </h1>

              {/* Author byline */}
              <div className="flex items-center gap-3.5 py-3 border-y border-slate-100 text-xs">
                <img
                  src={activePost.author.avatar}
                  alt={activePost.author.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm">{activePost.author.name}</div>
                  <div className="text-slate-500">{activePost.author.role} • {activePost.publishedAt}</div>
                </div>
              </div>

              {/* Introduction */}
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                {activePost.content.intro}
              </p>

              {/* Key Takeaways Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/80 border border-blue-200/90 space-y-3">
                <h4 className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Key Executive Takeaways</span>
                </h4>
                <div className="space-y-2">
                  {activePost.content.takeaways.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-blue-950">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-8 pt-4">
                {activePost.content.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {sec.heading}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {sec.body}
                    </p>
                    {sec.quote && (
                      <div className="my-4 p-4 rounded-2xl bg-slate-50 border-l-4 border-blue-600 text-slate-900 font-semibold italic text-sm sm:text-base flex items-start gap-3">
                        <Quote className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>"{sec.quote}"</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-base font-bold text-slate-900 mb-2">Final Verdict</h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {activePost.content.conclusion}
                </p>
              </div>

              {/* Direct Consultation Banner Inside Modal */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                    {isUSD ? 'Ready to apply this strategy?' : 'এই স্ট্র্যাটেজি বাস্তবায়নে প্রস্তুত?'}
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {isUSD ? 'Discuss your growth roadmap with our team.' : 'আমাদের টিমের সাথে আপনার গ্রোথ রোডম্যাপ নিয়ে আলোচনা করুন।'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isUSD
                      ? 'Get practical guidance tailored to paid ads, creative assets, web performance, or AI support.'
                      : 'পেইড অ্যাডস, ক্রিয়েটিভ অ্যাসেট, ওয়েবসাইট পারফরম্যান্স বা এআই সাপোর্টের কার্যকরী পরামর্শ নিন।'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActivePost(null);
                    if (onOpenConsultation) {
                      onOpenConsultation(`Strategy Consultation: ${activePost.title}`);
                    }
                  }}
                  className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-blue-50 transition-colors shadow-md shrink-0 cursor-pointer"
                  id="modal-cta-consultation"
                >
                  {isUSD ? 'Book Free Strategy Session' : 'ফ্রি স্ট্র্যাটেজি সেশন বুক করুন'}
                </button>
              </div>
            </div>

            {/* Modal Bottom Bar for Easy Exit */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActivePost(null)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs hover:border-slate-300"
              >
                <ArrowLeft className="w-4 h-4 text-blue-600" />
                <span>{isUSD ? 'Back to All Insights' : 'সব ইনসাইটসে ফিরে যান'}</span>
              </button>
              <span className="text-xs font-mono text-slate-500">
                {isUSD ? 'Press ' : 'বন্ধ করতে '}
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-bold">Esc</kbd>
                {isUSD ? ' or click outside to close' : ' চাপুন'}
              </span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
