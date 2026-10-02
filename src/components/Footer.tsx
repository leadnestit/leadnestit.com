import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  Mail,
  Phone,
  MessageSquare,
  Linkedin,
  Twitter,
  Github,
  ArrowRight,
  Sparkles,
  Check,
  Copy,
  Clock,
  MapPin,
  Flame,
  Globe
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { LanguageRegionSelector } from './LanguageRegionSelector';

interface FooterProps {
  onNavClick: (href: string) => void;
  onOpenAdminDashboard?: () => void;
  onOpenConsultation?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  onOpenAdminDashboard,
  onOpenConsultation
}) => {
  const { currency } = useCurrency();
  const isUSD = currency === 'USD';
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('leadnestit@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <footer className="relative bg-white text-slate-700 border-t border-slate-200 pt-16 pb-12 overflow-hidden selection:bg-blue-600 selection:text-white" id="footer">
      {/* =========================================================
          SUBTLE VECTOR GRAPHICS & AMBIENT GLOW ACCENTS
         ========================================================= */}
      {/* Micro dot matrix grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Ambient soft glow spots */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Vector 1: Top-Right Performance Growth Trajectory Schema */}
      <svg
        className="absolute top-4 right-0 w-[420px] h-[280px] text-blue-600/10 pointer-events-none select-none"
        viewBox="0 0 420 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="20" y1="240" x2="400" y2="240" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="20" y1="160" x2="400" y2="160" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
        <path
          d="M20 220 C 100 210, 180 150, 260 110 C 320 80, 360 40, 390 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="260" cy="110" r="4" fill="currentColor" />
        <circle cx="390" cy="30" r="4.5" fill="currentColor" />
        <rect x="230" y="85" width="60" height="18" rx="4" fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.8" />
        <text x="236" y="97" fill="#1d4ed8" fontSize="8" fontFamily="monospace" fontWeight="bold">3.4x ROAS</text>
      </svg>

      {/* Decorative Vector 2: Bottom-Left Automation Circuit Traces & Micro Nodes */}
      <svg
        className="absolute -bottom-10 -left-10 w-[380px] h-[340px] text-emerald-600/10 pointer-events-none select-none"
        viewBox="0 0 380 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M10 200 L 90 200 L 140 250 L 260 250 L 300 290 L 370 290" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M30 140 L 120 140 L 170 190 L 240 190" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="90" cy="200" r="3.5" fill="currentColor" />
        <circle cx="260" cy="250" r="4" fill="currentColor" />
        <circle cx="170" cy="190" r="3" fill="currentColor" />
        <rect x="180" y="178" width="55" height="18" rx="4" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="0.8" />
        <text x="186" y="190" fill="#047857" fontSize="8" fontFamily="monospace" fontWeight="bold">AI SYNC ✓</text>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================
            TOP PROFESSIONAL CTA BANNER (LIGHT THEME WITH SUBTLE GRAPHICS)
           ========================================================= */}
        <div className="mb-14 rounded-3xl bg-gradient-to-br from-blue-50/95 via-sky-50/40 to-white p-6 sm:p-8 md:p-10 text-slate-900 shadow-sm hover:shadow-md transition-shadow border border-blue-100/90 relative overflow-hidden group">
          {/* Soft ambient orbital glow backdrop */}
          <div className="absolute right-0 sm:right-10 top-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-br from-blue-300/12 via-cyan-200/8 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-indigo-100/15 rounded-full blur-2xl pointer-events-none" />
          
          {/* Orbital Concentric Rings & Sweeping Curve (Matching user reference image with soft, subtle opacity) */}
          <svg
            className="absolute -right-12 sm:right-0 md:right-4 top-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] md:w-[500px] h-[300px] sm:h-[340px] pointer-events-none select-none opacity-55 sm:opacity-65"
            viewBox="0 0 460 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer Concentric Dashed Ring */}
            <circle cx="280" cy="160" r="145" stroke="#93c5fd" strokeWidth="1" strokeDasharray="5 7" opacity="0.38" />
            
            {/* Middle Solid Fine Ring */}
            <circle cx="280" cy="160" r="100" stroke="#60a5fa" strokeWidth="1" opacity="0.28" />
            
            {/* Inner Concentric Dashed Ring */}
            <circle cx="280" cy="160" r="60" stroke="#93c5fd" strokeWidth="0.9" strokeDasharray="4 5" opacity="0.35" />
            
            {/* Horizontal Guide Axis Line (Dashed) */}
            <line x1="20" y1="160" x2="440" y2="160" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.25" />
            
            {/* Diagonal Guide Axis Line (Dashed) */}
            <line x1="160" y1="280" x2="400" y2="40" stroke="#dbeafe" strokeWidth="0.7" strokeDasharray="3 6" opacity="0.2" />
            
            {/* Primary Sweeping Orbital Curve (Traverses through the rings and sweeps right) */}
            <path
              d="M 10 245 C 130 230, 210 175, 290 135 C 360 100, 410 75, 455 55"
              stroke="#60a5fa"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.4"
            />
            
            {/* Secondary Harmonic Wave Arc */}
            <path
              d="M 90 280 C 180 240, 260 185, 370 120 C 420 90, 445 70, 460 58"
              stroke="#93c5fd"
              strokeWidth="0.9"
              strokeDasharray="4 6"
              opacity="0.28"
            />

            {/* Subtle Orbital Intersection Nodes */}
            <circle cx="280" cy="60" r="2.5" fill="#3b82f6" opacity="0.4" />
            <circle cx="280" cy="260" r="2.5" fill="#3b82f6" opacity="0.4" />
            <circle cx="380" cy="160" r="3" fill="#2563eb" opacity="0.45" />
            <circle cx="290" cy="135" r="3.5" fill="#1d4ed8" opacity="0.5" />
          </svg>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-800 text-xs font-mono font-bold tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isUSD ? 'CLIENT SPRINT INTAKE • SPOTS OPEN' : 'চলতি মাসের ইনটেক • সীমিত স্লট'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 leading-tight">
                {isUSD ? (
                  <>Ready to Build a <span className="text-blue-600 underline decoration-blue-200 underline-offset-4">Stronger Digital Growth System?</span></>
                ) : (
                  <>একটি শক্তিশালী <span className="text-blue-600 underline decoration-blue-200 underline-offset-4">ডিজিটাল গ্রোথ সিস্টেম তৈরি করতে প্রস্তুত?</span></>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl font-normal">
                {isUSD
                  ? 'Bring your marketing, creative, website and AI customer support together with a specialist-led team focused on measurable growth.'
                  : 'আপনার মার্কেটিং, ক্রিয়েটিভ, ওয়েবসাইট ও এআই কাস্টমার সাপোর্টকে একসাথে যুক্ত করুন স্পেশালিস্ট দলের মাধ্যমে, যার লক্ষ্য পরিমাপযোগ্য প্রবৃদ্ধি।'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:scale-102 active:scale-98 cursor-pointer"
                  id="footer-teaser-cta"
                >
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>{isUSD ? 'Book a Free Strategy Call' : 'ফ্রি স্ট্র্যাটেজি সেশন বুক করুন'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <a
                href="https://wa.me/8801722604376?text=Hello%20LeadNest%20IT%2C%20I%20want%20to%20discuss%20a%20new%20growth%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm transition-all duration-200 shadow-2xs hover:border-slate-300 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================
            MAIN FOOTER GRID (4 COLUMNS ON WHITE CANVAS)
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand & Positioning (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <Logo size="md" variant="light" />
            </div>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-[11px] font-mono font-bold text-blue-700 tracking-wider">
              <Flame className="w-3.5 h-3.5 text-blue-600" />
              <span>BUILD • GROW • AUTOMATE</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal max-w-sm">
              {isUSD
                ? 'LeadNest IT helps businesses grow through paid advertising, creative content, websites & eCommerce, and AI-powered customer support. We build connected growth systems that attract customers, generate leads, and improve operations.'
                : 'LeadNest IT পেইড অ্যাডভার্টাইজিং, ক্রিয়েটিভ কন্টেন্ট, ওয়েবসাইট ও ই-কমার্স এবং এআই-চালিত কাস্টমার সাপোর্টের মাধ্যমে ব্যবসাকে বড় করতে সাহায্য করে। আমরা এমন সমন্বিত গ্রোথ সিস্টেম তৈরি করি যা কাস্টমার আকর্ষণ করে, লিড জেনারেট করে এবং কার্যক্রম উন্নত করে।'}
            </p>

            {/* Country & Language Quick Switcher */}
            <div className="pt-2">
              <LanguageRegionSelector
                variant="inline"
                label={isUSD ? 'REGION & LANGUAGE:' : 'দেশ ও ভাষা:'}
              />
            </div>

            {/* Social Connect */}
            <div className="pt-2">
              <span className="text-[11px] font-mono font-bold text-slate-500 block mb-2 uppercase tracking-wider">
                CONNECT WITH LEADNEST IT
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 hover:-translate-y-0.5 transition-all shadow-2xs"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white hover:bg-sky-500 hover:border-sky-500 hover:-translate-y-0.5 transition-all shadow-2xs"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white hover:bg-slate-900 hover:border-slate-900 hover:-translate-y-0.5 transition-all shadow-2xs"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/8801722604376"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 hover:-translate-y-0.5 transition-all shadow-2xs"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Company Navigation (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>COMPANY</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { name: isUSD ? 'How We Work' : 'কীভাবে কাজ করি', href: '#process' },
                { name: isUSD ? 'Case Studies' : 'কেস স্টাডিজ', href: '#case-studies' },
                { name: isUSD ? 'Insights' : 'ইনসাইটস', href: '#blog' },
                { name: isUSD ? 'Our Team' : 'আমাদের টিম', href: '#about' },
                { name: isUSD ? 'Contact & Inquiry' : 'যোগাযোগ ও ইনকোয়ারি', href: '#contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavClick(item.href)}
                    className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-600 group-hover:w-2 transition-all" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: 4 Core Services Only (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>CORE SERVICES</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { name: 'Paid Advertising', badge: 'Meta & Google', href: '#services' },
                { name: 'Creative & Video', badge: 'High-Converting', href: '#services' },
                { name: 'Websites & eCommerce', badge: 'Web & Storefronts', href: '#services' },
                { name: 'AI Customer Support & Automation', badge: '24/7 Support', href: '#services' },
              ].map((sol, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavClick(sol.href)}
                    className="group flex items-center justify-between w-full text-slate-600 hover:text-slate-950 transition-colors text-left cursor-pointer"
                  >
                    <span className="group-hover:translate-x-1 group-hover:text-blue-600 transition-all">{sol.name}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-blue-700 bg-slate-100 group-hover:bg-blue-50 px-1.5 py-0.5 rounded border border-slate-200 group-hover:border-blue-200 transition-colors shrink-0">
                      {sol.badge}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verified Active Contact & Support (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
              <span>DIRECT CONTACT</span>
            </h4>

            <div className="space-y-3 text-xs">
              {/* Active Office Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-emerald-400 transition-all space-y-2 shadow-2xs">
                <div className="flex items-center justify-between text-slate-900 font-bold text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dhaka, Bangladesh</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Global Operations</span>
                  </span>
                </div>
                <a
                  href="https://wa.me/8801722604376?text=Hi%20LeadNest%20IT%2C%20I%20am%20interested%20in%20a%20strategy%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-600 font-semibold transition-colors text-[11px]"
                >
                  <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>+880 1722-604376 (WhatsApp & Call)</span>
                </a>
              </div>

              {/* Verified Email with Copy Feedback */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                  <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis">
                    <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <a
                      href="mailto:leadnestit@gmail.com"
                      className="text-slate-700 hover:text-blue-600 font-semibold truncate transition-colors"
                      title="Send email"
                    >
                      leadnestit@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shrink-0 shadow-2xs cursor-pointer"
                    title="Copy Email"
                    id="footer-copy-email"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {copiedEmail && (
                  <p className="text-[10px] text-emerald-700 font-mono font-bold animate-fade-in pl-1">
                    ✓ Email copied to clipboard!
                  </p>
                )}
              </div>

              {/* Working Hours */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-800 font-medium">Sunday – Thursday, 9:00 AM – 6:00 PM (GMT+6)</p>
                  <p className="text-[10px] text-slate-500">Active client support for US & International businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM COPYRIGHT & STATUS BAR
           ========================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-slate-700 font-semibold">© {new Date().getFullYear()} LeadNest IT. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <p className="text-[11px] text-slate-500">
              Specialist-Led Digital Growth Agency • Build. Grow. Automate.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Specialist-Led Delivery • Global Client Support</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
