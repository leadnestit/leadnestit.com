import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  Menu, X, Search, ChevronDown, User, LogIn, LogOut, 
  FileText, Sparkles, MessageCircle, Phone, Globe
} from 'lucide-react';
import { auth, signInWithGoogle, logOut } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useCurrency } from '../context/CurrencyContext';
import { LanguageRegionSelector } from './LanguageRegionSelector';

interface NavbarProps {
  onOpenConsultation: (service?: string) => void;
  onOpenClientPortal: () => void;
  onOpenAdminDashboard?: () => void;
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenConsultation, 
  onOpenClientPortal,
  currentPage,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [whatsappDropdownOpen, setWhatsappDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const { currency, setCurrency, hasDiscount, toggleDiscount } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setAuthLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { id: 'home', name: currency === 'USD' ? 'Home' : 'হোম' },
    { id: 'solutions', name: currency === 'USD' ? 'Services' : 'সার্ভিসসমূহ' },
    { id: 'process', name: currency === 'USD' ? 'How We Work' : 'কীভাবে কাজ করি' },
    { id: 'case-studies', name: currency === 'USD' ? 'Case Studies' : 'কেস স্টাডিজ' },
    { id: 'blog', name: currency === 'USD' ? 'Insights' : 'ইনসাইটস' },
    { id: 'about', name: currency === 'USD' ? 'Our Team' : 'আমাদের টিম' },
    { id: 'contact', name: currency === 'USD' ? 'Contact' : 'যোগাযোগ' },
  ];

  const handleNavClick = (pageId: string) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenConsultation(searchQuery);
    } else {
      onNavigate('solutions');
    }
  };

  const whatsappLink = `https://wa.me/8801722604376?text=${encodeURIComponent('Hello LeadNest IT, I would like to discuss our project & business growth.')}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled
          ? 'shadow-md border-b border-slate-200'
          : 'border-b border-slate-200/80'
      }`}
    >
      {/* 
        TOP ROW OF HEADER (Matching GoFly Screenshot):
        [ Logo ] ------------ [ 🔍 Search Pill ] ------------ [ Need Help? | EN ▾ | 👤 Login ]
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo on Left */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.01] cursor-pointer text-left bg-transparent border-0 p-0"
              id="nav-logo-link"
            >
              <Logo size="md" />
            </button>
          </div>

          {/* Center Search Bar (Exact Pill Style from Screenshot: "Find Your Perfect Tour Package") */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md lg:max-w-xl mx-2"
          >
            <div className="relative w-full flex items-center bg-slate-100/90 hover:bg-slate-100 focus-within:bg-white rounded-full border border-slate-200/90 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all px-4 py-2 text-xs sm:text-sm group">
              <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  currency === 'USD'
                    ? 'Find Your Perfect Solution, Web Stack, or AI System...'
                    : 'আপনার কাঙ্ক্ষিত ওয়েবসাইট, এআই সিস্টেম বা সার্ভিস খুঁজুন...'
                }
                className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm font-medium"
              />
              {searchQuery && (
                <button
                  type="submit"
                  className="ml-2 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase shrink-0"
                >
                  Search
                </button>
              )}
            </div>
          </form>

          {/* Right Controls: Need Help? | Language/Currency | Login | Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Need Help? Link (Desktop only) */}
            <button
              onClick={() => onOpenConsultation('Quick Inquiry')}
              className="hidden md:inline-flex text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
            >
              Need Help?
            </button>

            <span className="hidden md:inline text-slate-300">|</span>

            {/* Language & Country Selector */}
            <LanguageRegionSelector variant="navbar" />

            {/* Dark Pill Login Button (Compact circle on mobile, pill on tablet/desktop) */}
            {currentUser ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={onOpenClientPortal}
                  className="flex items-center gap-1.5 bg-[#121826] hover:bg-black text-white p-2 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                  title="Client Portal"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      referrerPolicy="no-referrer"
                      className="w-4 h-4 rounded-full"
                    />
                  ) : (
                    <User className="w-3.5 h-3.5 text-white" />
                  )}
                  <span className="hidden sm:inline max-w-[80px] truncate">
                    {currentUser.displayName?.split(' ')[0] || 'Client'}
                  </span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 text-slate-500 hover:text-red-600 rounded-full hover:bg-slate-100 hidden sm:inline-flex"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenClientPortal}
                className="flex items-center justify-center gap-1.5 bg-[#121826] hover:bg-black text-white w-8 h-8 sm:w-auto sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer shrink-0"
                id="login-btn"
                title="Login to Client Portal"
              >
                <User className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}

            {/* Mobile Menu Hamburger Button (Phone only, tablet uses full subnav) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 shrink-0 transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 
        SECOND ROW OF HEADER (Subnav Bar):
        Visible on Tablet & Desktop (md:) so users get direct 1-tap navigation to all services & pages
      */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-max gap-4">
          {/* Left Navigation Links */}
          <nav className="flex items-center gap-1 xl:gap-2">
            {/* Small blue dot indicator for Home / Active */}
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1.5 shrink-0" />

            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2.5 lg:px-3.5 py-1.5 text-xs lg:text-sm font-bold transition-all duration-150 rounded-lg cursor-pointer shrink-0 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80'
                      : 'text-slate-800 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                  id={`subnav-link-${link.id}`}
                >
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right WhatsApp Contact Widget (Exact matching GoFly screenshot) */}
          <div className="relative shrink-0">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 pl-3 lg:pl-4 pr-2 py-1 hover:bg-slate-50 rounded-xl transition-all group cursor-pointer"
              title="Chat with LeadNest IT on WhatsApp"
            >
              {/* WhatsApp Green Icon */}
              <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <MessageCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-white" />
              </div>

              {/* Number and Label */}
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none">
                  WhatsApp
                </span>
                <span className="text-xs lg:text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                  +880 1722 604 376
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Phones only) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="pt-1">
            <div className="flex items-center bg-slate-100 rounded-full px-3.5 py-2 text-xs border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find solution or tech..."
                className="w-full bg-transparent outline-none text-slate-800 text-xs font-medium"
              />
            </div>
          </form>

          {/* WhatsApp Direct Line on Mobile */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4 fill-white" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-emerald-700">WhatsApp Support</span>
                <span className="text-xs font-bold text-slate-900">+880 1722 604 376</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600">Chat →</span>
          </a>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-800 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
            >
              <span>{currency === 'USD' ? 'Book a Free Strategy Call' : 'ফ্রি স্ট্র্যাটেজি সেশন বুক করুন'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
