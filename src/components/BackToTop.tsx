import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white hover:bg-blue-600 border border-slate-700/80 shadow-xl shadow-black/40 transition-all duration-200 hover:-translate-y-1 active:scale-95"
      aria-label="Scroll back to top"
      id="back-to-top-btn"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
