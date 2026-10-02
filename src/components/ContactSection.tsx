import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Mail,
  Phone,
  Globe,
  Briefcase,
  FileText,
  User,
  Sparkles,
  Clock,
  MessageSquare
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ConsultationData } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { LanguageRegionSelector } from './LanguageRegionSelector';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '' }) => {
  const { currency, setCurrency, hasDiscount, toggleDiscount, selectedCountry } = useCurrency();

  const [formData, setFormData] = useState<ConsultationData>({
    fullName: '',
    businessName: '',
    email: '',
    phoneOrWhatsApp: '',
    businessType: '',
    currentWebsite: '',
    requiredServices: initialService || 'Multiple Services',
    approximateBudget: currency === 'BDT' ? 'আলোচনা সাপেক্ষে / অপশনাল (Flexible / Optional)' : 'Flexible / Open to Recommendation (Optional)',
    projectDetails: '',
    currency: currency,
    hasFirstTimeDiscount: false,
    region: (selectedCountry.country as 'USA' | 'Bangladesh' | 'Global') || 'Global'
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize currency, country updates from global context
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      currency: currency,
      approximateBudget: currency === 'BDT' ? 'আলোচনা সাপেক্ষে / অপশনাল (Flexible / Optional)' : 'Flexible / Open to Recommendation (Optional)',
      region: (selectedCountry.country as 'USA' | 'Bangladesh' | 'Global') || 'Global'
    }));
  }, [currency, selectedCountry]);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        requiredServices: initialService
      }));
    }
  }, [initialService]);

  const serviceOptions = [
    'Paid Advertising',
    'Creative & Video',
    'Websites & eCommerce',
    'AI Customer Support & Automation',
    'Multiple Services',
    'Not Sure — Recommend a Solution'
  ];

  const budgetOptionsBDT = [
    'আলোচনা সাপেক্ষে / অপশনাল (Flexible / Optional)',
    '৳১০,০০০ - ৳২৫,০০০ (Starter Scale)',
    '৳২৫,০০০ - ৳৫০,০০০ (Growth Scale)',
    '৳৫০,০০০ - ৳১,০০,০০০ (Advanced System)',
    '৳১,০০,০০০+ (Custom Enterprise Platform)'
  ];

  const budgetOptionsUSD = [
    'Flexible / Open to Recommendation (Optional)',
    'Under $2,500',
    '$2,500 - $5,000',
    '$5,000 - $15,000',
    '$15,000+'
  ];

  const businessTypes = [
    'B2B Services & Consulting',
    'eCommerce & Retail Store',
    'Healthcare & Clinic',
    'Real Estate & Construction',
    'SaaS & Technology Startup',
    'Local Service Business',
    'Manufacturing & Industrial',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneOrWhatsApp.trim()) {
      setErrorMessage('Please complete all required fields (Name, Email, and Phone/WhatsApp).');
      return;
    }

    try {
      setSubmitting(true);
      const currentUser = auth.currentUser;

      const payload = {
        fullName: formData.fullName.trim(),
        businessName: formData.businessName.trim() || 'Not specified',
        email: formData.email.trim(),
        phoneOrWhatsApp: formData.phoneOrWhatsApp.trim(),
        businessType: formData.businessType || 'General Business',
        currentWebsite: formData.currentWebsite.trim() || 'None provided',
        requiredServices: formData.requiredServices,
        approximateBudget: formData.approximateBudget,
        projectDetails: formData.projectDetails.trim() || 'No additional details provided',
        currency: currency,
        hasFirstTimeDiscount: hasDiscount,
        region: formData.region || (currency === 'BDT' ? 'Bangladesh' : 'USA'),
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp(),
        userId: currentUser ? currentUser.uid : null,
        userEmail: currentUser ? currentUser.email : formData.email.trim(),
        status: 'pending'
      };

      await addDoc(collection(db, 'consultations'), payload);
      
      // Also notify backend API
      try {
        await fetch('/api/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (apiErr) {
        console.warn('Backend API notification fallback:', apiErr);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      try {
        await fetch('/api/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            businessName: formData.businessName.trim(),
            email: formData.email.trim(),
            phoneOrWhatsApp: formData.phoneOrWhatsApp.trim(),
            requiredServices: formData.requiredServices,
            approximateBudget: formData.approximateBudget,
            projectDetails: formData.projectDetails.trim(),
            currency: currency,
            hasFirstTimeDiscount: hasDiscount
          })
        });
      } catch (_) {}
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="contact">
      {/* Subtle Background Glows & Architectural Vectors */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-emerald-100/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative Technical Crosshairs & Network Nodes */}
      <svg
        className="absolute top-10 right-10 w-72 h-72 text-blue-600/[0.035] pointer-events-none select-none hidden lg:block"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="4" fill="currentColor" />
      </svg>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
            <span>{currency === 'USD' ? 'GET IN TOUCH • DIRECT COMMUNICATION' : 'সরাসরি যোগাযোগ'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            {currency === 'USD' ? "Let's Talk About Your Growth" : "চলুন আপনার বিজনেস গ্রোথ নিয়ে কথা বলি"}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {currency === 'USD'
              ? 'Book a strategy call, message our team on WhatsApp, or tell us about the support your business needs.'
              : 'একটি স্ট্র্যাটেজি কল বুক করুন, হোয়াটসঅ্যাপে আমাদের টিমের সাথে কথা বলুন, অথবা আপনার ব্যবসার প্রয়োজনীয় সাপোর্টের ব্যাপারে জানান।'}
          </p>

          {/* Direct WhatsApp Support Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="https://wa.me/8801722604376?text=Hi%20LeadNest%20IT%2C%20I%20would%20like%20to%20consult%20on%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold transition-all shadow-xs text-xs active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-center sm:text-left">WhatsApp Support: +880 1722-604376</span>
            </a>

            <a
              href="mailto:leadnestit@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold transition-all text-xs active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate max-w-[220px] sm:max-w-none">leadnestit@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 p-5 sm:p-8 md:p-12 shadow-md relative overflow-hidden">
          {submitted ? (
            <div className="text-center py-12 space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {currency === 'USD' ? 'Strategy Call Request Received' : 'রিকোয়েস্ট সফলভাবে জমা হয়েছে'}
              </h3>
              <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                {currency === 'USD'
                  ? 'Thank you. Your request has been received. Our team will review your business requirements and contact you shortly to schedule your call.'
                  : 'ধন্যবাদ। আপনার রিকোয়েস্ট সফলভাবে জমা হয়েছে। আমাদের টিম আপনার প্রজেক্টের রিকোয়ারমেন্ট পর্যালোচনা করে দ্রুতই যোগাযোগ করবে।'}
              </p>

              <div className="block pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-xs font-mono text-blue-700 border border-slate-200 font-semibold shadow-2xs">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{currency === 'USD' ? 'Typical review turnaround within 2 business hours' : 'সাধারণত ২ কর্মঘণ্টার মধ্যে টিম যোগাযোগ করে'}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      businessName: '',
                      email: '',
                      phoneOrWhatsApp: '',
                      businessType: '',
                      currentWebsite: '',
                      requiredServices: 'Multiple Services',
                      approximateBudget: currency === 'BDT' ? 'আলোচনা সাপেক্ষে / অপশনাল (Flexible / Optional)' : 'Flexible / Open to Recommendation (Optional)',
                      projectDetails: '',
                      currency: currency,
                      hasFirstTimeDiscount: false,
                      region: (selectedCountry.country as 'USA' | 'Bangladesh' | 'Global') || 'Global'
                    });
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline transition-colors"
                >
                  {currency === 'USD' ? 'Submit another inquiry' : 'অন্য আরেকটি অনুসন্ধান পাঠান'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-xs text-rose-800 font-medium">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Country & Language Selector Bar inside Form */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                <LanguageRegionSelector
                  variant="inline"
                  label={currency === 'BDT' ? 'দেশ ও ভাষা নির্বাচন:' : 'Country & Language:'}
                />
                <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{currency === 'BDT' ? 'টিমের সরাসরি সাপোর্ট' : 'Direct team support'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={currency === 'USD' ? 'e.g. Alex Morgan' : 'যেমন: মো: তানভীর আহমেদ'}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm shadow-2xs"
                    id="contact-full-name"
                  />
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-blue-600" />
                    <span>Business / Organization Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={currency === 'USD' ? 'e.g. Apex Global Technologies' : 'যেমন: ঢাকা টেক্সটাইল / প্রাইভেট লিমিটেড'}
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm shadow-2xs"
                    id="contact-business-name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Business Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@yourbusiness.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm shadow-2xs"
                    id="contact-email"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Phone / WhatsApp *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={selectedCountry.code === 'BD' ? '+880 17XX-XXXXXX' : `${selectedCountry.phonePrefix} (555) 019-2834`}
                    value={formData.phoneOrWhatsApp}
                    onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm shadow-2xs"
                    id="contact-phone"
                  />
                </div>

                {/* Business Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Business Type / Industry
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm shadow-2xs"
                    id="contact-business-type"
                  >
                    <option value="">Select industry vertical...</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Current Website */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Current Website (if applicable)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={formData.currentWebsite}
                    onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm shadow-2xs"
                    id="contact-website"
                  />
                </div>

                {/* Required Services Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Required Services *
                  </label>
                  <select
                    required
                    value={formData.requiredServices}
                    onChange={(e) => setFormData({ ...formData, requiredServices: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-semibold shadow-2xs"
                    id="contact-services"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Approximate Budget */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                      <span>{currency === 'BDT' ? 'আনুমানিক বাজেট রেঞ্জ (ঐচ্ছিক)' : 'Approximate Investment / Budget Range (Optional)'}</span>
                    </label>
                    <div className="inline-flex items-center rounded-md bg-slate-100 border border-slate-200 p-0.5 text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrency('USD');
                          setFormData(prev => ({ ...prev, approximateBudget: 'Flexible / Open to Recommendation (Optional)', currency: 'USD' }));
                        }}
                        className={`px-1.5 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                          currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="US Dollar ($)"
                      >
                        $ USD
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrency('BDT');
                          setFormData(prev => ({ ...prev, approximateBudget: 'আলোচনা সাপেক্ষে / অপশনাল (Flexible / Optional)', currency: 'BDT' }));
                        }}
                        className={`px-1.5 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                          currency === 'BDT' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Bangladeshi Taka (৳)"
                      >
                        ৳ BDT
                      </button>
                    </div>
                  </div>

                  <select
                    value={formData.approximateBudget}
                    onChange={(e) => {
                      const val = e.target.value;
                      const newCurr = val.includes('৳') ? 'BDT' : (val.includes('$') ? 'USD' : currency);
                      setFormData(prev => ({
                        ...prev,
                        approximateBudget: val,
                        currency: newCurr
                      }));
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-mono shadow-2xs cursor-pointer"
                    id="contact-budget"
                  >
                    {currency === 'BDT' ? (
                      <>
                        <optgroup label="🇧🇩 BDT (Bangladeshi Taka)">
                          {budgetOptionsBDT.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </optgroup>
                        <optgroup label="🇺🇸 USD (US Dollar)">
                          {budgetOptionsUSD.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </optgroup>
                      </>
                    ) : (
                      <>
                        <optgroup label="🇺🇸 USD (US Dollar)">
                          {budgetOptionsUSD.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </optgroup>
                        <optgroup label="🇧🇩 BDT (Bangladeshi Taka)">
                          {budgetOptionsBDT.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </optgroup>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Project Details & Growth Goals</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your current bottlenecks, target customers, preferred timeline, and what you aim to achieve..."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm leading-relaxed shadow-2xs"
                  id="contact-details"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2.5 text-base disabled:opacity-50"
                  id="contact-submit-btn"
                >
                  {submitting ? (
                    <span>{currency === 'BDT' ? 'রিকোয়েস্ট প্রসেস হচ্ছে...' : 'Transmitting Request...'}</span>
                  ) : (
                    <>
                      <span>
                        {currency === 'BDT'
                          ? 'স্ট্র্যাটেজি কলের রিকোয়েস্ট পাঠান'
                          : 'Request a Strategy Call'}
                      </span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-[11px] text-slate-500 font-medium">
                  {currency === 'USD'
                    ? 'Direct support from our team. No spam guaranteed. We respect your confidentiality.'
                    : 'বাংলা ও ইংরেজি উভয় ভাষায় সরাসরি গ্রাহক সেবা। আমরা তথ্যের সর্বোচ্চ গোপনীয়তা বজায় রাখি।'}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
