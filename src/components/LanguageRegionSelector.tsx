import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useCurrency, SUPPORTED_COUNTRIES } from '../context/CurrencyContext';
import { CountryLanguage } from '../types';

interface LanguageRegionSelectorProps {
  variant?: 'navbar' | 'inline' | 'compact';
  label?: string;
}

export const LanguageRegionSelector: React.FC<LanguageRegionSelectorProps> = ({
  variant = 'inline',
  label,
}) => {
  const { selectedCountry, setSelectedCountry, currency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country: CountryLanguage) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  if (variant === 'navbar') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
          title="Select Country & Language"
          aria-label="Select Country and Language"
        >
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span className="font-bold text-xs sm:text-sm">
            {selectedCountry.nativeName.split(' ')[0]}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[380px] overflow-y-auto">
            <div className="px-3.5 py-2 border-b border-slate-100 mb-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Select Country & Language</span>
              </div>
            </div>
            <div className="space-y-0.5 px-1.5">
              {SUPPORTED_COUNTRIES.map((c) => {
                const isSelected = selectedCountry.code === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg leading-none shrink-0">{c.flag}</span>
                      <div className="truncate">
                        <span className="block text-xs font-bold truncate text-slate-900">{c.country}</span>
                        <span className="block text-[10px] text-slate-500 truncate">{c.nativeName}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Inline variant (used directly inside the form, replacing the old "Target Region & Currency" buttons in screenshot)
  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {label && (
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
            {label}
          </span>
        )}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-300 text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-2xs hover:border-slate-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">{selectedCountry.flag}</span>
              <span className="text-slate-900">{selectedCountry.country}</span>
              <span className="text-[11px] font-normal text-slate-500">
                ({selectedCountry.language})
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[340px] overflow-y-auto">
              <div className="px-3.5 py-1.5 border-b border-slate-100 mb-1">
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  Select Your Country & Language
                </span>
              </div>
              <div className="space-y-0.5 px-1.5">
                {SUPPORTED_COUNTRIES.map((c) => {
                  const isSelected = selectedCountry.code === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleSelect(c)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg leading-none shrink-0">{c.flag}</span>
                        <div className="truncate">
                          <span className="block text-xs font-bold text-slate-900">{c.country}</span>
                          <span className="block text-[10px] text-slate-500">{c.nativeName}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
