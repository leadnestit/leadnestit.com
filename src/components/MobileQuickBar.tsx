import React from 'react';
import { Home, Layers, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface MobileQuickBarProps {
  onOpenConsultation: () => void;
  currentPage?: string;
  onNavigate?: (pageId: string) => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ 
  onOpenConsultation,
  currentPage = 'home',
  onNavigate,
}) => {
  const { currency, setCurrency, hasDiscount } = useCurrency();
  const isUSD = currency === 'USD';

  const phoneNumber = '+8801722604376';
  const whatsappUrl = isUSD
    ? 'https://wa.me/8801722604376?text=Hi%20LeadNest%20IT%2C%20I%20would%20like%20to%20consult%20on%20scaling%20my%20business.'
    : `https://wa.me/8801722604376?text=${encodeURIComponent('আসসালামু আলাইকুম, LeadNest IT-র সাথে ব্যবসা গ্রোথ ও প্রজেক্ট নিয়ে কথা বলতে চাচ্ছি।')}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl safe-area-bottom select-none">
      <div className="flex items-center justify-between gap-1.5 max-w-md mx-auto">
        {/* Quick Nav: Home */}
        {onNavigate && (
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-bold transition-all ${
              currentPage === 'home'
                ? 'text-blue-600 bg-blue-50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="mt-0.5">Home</span>
          </button>
        )}

        {/* Quick Nav: Services */}
        {onNavigate && (
          <button
            onClick={() => onNavigate('solutions')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-bold transition-all ${
              currentPage === 'solutions'
                ? 'text-blue-600 bg-blue-50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="mt-0.5">Services</span>
          </button>
        )}

        {/* WhatsApp Direct Chat */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 active:scale-95 transition-transform"
          aria-label="WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span className="mt-0.5">WhatsApp</span>
        </a>

        {/* Primary Action Consultation Button */}
        <button
          onClick={onOpenConsultation}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          id="mobile-quick-consultation-btn"
        >
          {hasDiscount && <Sparkles className="w-3 h-3 text-cyan-200 animate-pulse" />}
          <span className="truncate">{isUSD ? 'Book Call' : 'পরামর্শ নিন'}</span>
        </button>
      </div>
    </div>
  );
};
