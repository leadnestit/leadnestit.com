import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, CountryLanguage } from '../types';

export const SUPPORTED_COUNTRIES: CountryLanguage[] = [
  {
    code: 'US',
    country: 'United States',
    language: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    phonePrefix: '+1',
    currency: 'USD',
  },
  {
    code: 'BD',
    country: 'Bangladesh',
    language: 'বাংলা',
    nativeName: 'বাংলা',
    flag: '🇧🇩',
    phonePrefix: '+880',
    currency: 'BDT',
  }
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  hasDiscount: boolean;
  setHasDiscount: (d: boolean) => void;
  toggleDiscount: () => void;
  formatPrice: (usdAmount: number, bdtAmount: number) => string;
  selectedCountry: CountryLanguage;
  setSelectedCountry: (country: CountryLanguage) => void;
  selectCountryByCode: (code: string) => void;
  countries: CountryLanguage[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountryState] = useState<CountryLanguage>(() => {
    const savedCode = localStorage.getItem('leadnest_country_code');
    if (savedCode) {
      const match = SUPPORTED_COUNTRIES.find(c => c.code === savedCode);
      if (match) return match;
    }
    const savedCurr = localStorage.getItem('leadnest_currency');
    if (savedCurr === 'BDT') {
      return SUPPORTED_COUNTRIES.find(c => c.code === 'BD') || SUPPORTED_COUNTRIES[1];
    }
    return SUPPORTED_COUNTRIES[0]; // US by default
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('leadnest_currency');
    return (saved === 'BDT' || saved === 'USD') ? saved : selectedCountry.currency;
  });

  const [hasDiscount, setHasDiscountState] = useState<boolean>(() => {
    const saved = localStorage.getItem('leadnest_discount');
    return saved !== null ? saved === 'true' : true;
  });

  const setSelectedCountry = (country: CountryLanguage) => {
    setSelectedCountryState(country);
    setCurrencyState(country.currency);
    localStorage.setItem('leadnest_country_code', country.code);
    localStorage.setItem('leadnest_currency', country.currency);
  };

  const selectCountryByCode = (code: string) => {
    const found = SUPPORTED_COUNTRIES.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (found) {
      setSelectedCountry(found);
    }
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('leadnest_currency', c);
    if (c === 'BDT') {
      const bd = SUPPORTED_COUNTRIES.find(country => country.code === 'BD');
      if (bd) setSelectedCountryState(bd);
    } else if (selectedCountry.code === 'BD') {
      const us = SUPPORTED_COUNTRIES.find(country => country.code === 'US');
      if (us) setSelectedCountryState(us);
    }
  };

  const toggleCurrency = () => {
    if (currency === 'USD') {
      setCurrency('BDT');
    } else {
      setCurrency('USD');
    }
  };

  const setHasDiscount = (d: boolean) => {
    setHasDiscountState(d);
    localStorage.setItem('leadnest_discount', String(d));
  };

  const toggleDiscount = () => {
    setHasDiscount(!hasDiscount);
  };

  const formatPrice = (usdAmount: number, bdtAmount: number) => {
    if (currency === 'BDT') {
      return `৳${bdtAmount.toLocaleString('en-BD')}`;
    }
    return `$${usdAmount.toLocaleString('en-US')}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        hasDiscount,
        setHasDiscount,
        toggleDiscount,
        formatPrice,
        selectedCountry,
        setSelectedCountry,
        selectCountryByCode,
        countries: SUPPORTED_COUNTRIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

