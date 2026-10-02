import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Building, Mail, Phone, Briefcase, Sparkles, Globe } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCurrency } from '../context/CurrencyContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedService = ''
}) => {
  const { currency, setCurrency, hasDiscount, toggleDiscount, selectedCountry, setSelectedCountry } = useCurrency();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Multiple Services');
  const [budgetCurrency, setBudgetCurrency] = useState<'USD' | 'BDT'>(currency === 'BDT' ? 'BDT' : 'USD');
  const [budget, setBudget] = useState(
    currency === 'BDT'
      ? 'আলোচনা সাপেক্ষে / অপশনাল (Flexible / Optional)'
      : 'Flexible / Open to Recommendation (Optional)'
  );
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currency === 'BDT') {
      setBudgetCurrency('BDT');
      setBudget('আলোচনা সাপেক্ষে / অপশনাল (Flexible / Optional)');
    } else {
      setBudgetCurrency('USD');
      setBudget('Flexible / Open to Recommendation (Optional)');
    }
  }, [currency]);

  const handleBudgetCurrencyChange = (newCurr: 'USD' | 'BDT') => {
    setBudgetCurrency(newCurr);
    if (newCurr === 'BDT') {
      setBudget('আলোচনা সাপেক্ষে / অপশনাল (Flexible / Optional)');
    } else {
      setBudget('Flexible / Open to Recommendation (Optional)');
    }
  };

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in Name, Email and Phone number.');
      return;
    }

    try {
      setSubmitting(true);
      const currentUser = auth.currentUser;

      const selectedBudgetCurrency = budget.includes('৳') ? 'BDT' : (budget.includes('$') ? 'USD' : budgetCurrency);

      await addDoc(collection(db, 'consultations'), {
        fullName: fullName.trim(),
        businessName: businessName.trim() || 'Not specified',
        email: email.trim(),
        phoneOrWhatsApp: phone.trim(),
        requiredServices: service,
        approximateBudget: budget,
        projectDetails: notes.trim() || 'Direct modal request',
        businessType: 'Direct Consultation',
        currentWebsite: 'Direct modal submission',
        currency: selectedBudgetCurrency,
        hasFirstTimeDiscount: hasDiscount,
        region: selectedBudgetCurrency === 'BDT' ? 'Bangladesh' : 'USA',
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp(),
        userId: currentUser ? currentUser.uid : null,
        userEmail: currentUser ? currentUser.email : email.trim(),
        status: 'pending'
      });

      // Also call backend API
      try {
        await fetch('/api/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: fullName.trim(),
            businessName: businessName.trim(),
            email: email.trim(),
            phoneOrWhatsApp: phone.trim(),
            requiredServices: service,
            approximateBudget: budget,
            projectDetails: notes.trim(),
            currency: currency,
            hasFirstTimeDiscount: hasDiscount
          })
        });
      } catch (_) {}

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      // Fallback post to backend directly
      try {
        await fetch('/api/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: fullName.trim(),
            businessName: businessName.trim(),
            email: email.trim(),
            phoneOrWhatsApp: phone.trim(),
            requiredServices: service,
            approximateBudget: budget,
            projectDetails: notes.trim(),
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

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-5 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-150 my-auto max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          id="modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Strategy Call Request Received!</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              Thank you. Your request has been received. Our team will review your requirements and reach out shortly to schedule your call.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Growth & Strategy Session
                </span>
              </div>

              {/* Language: English Only */}
              <div className="inline-flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5 text-[10px] font-mono font-bold">
                <span className="px-2.5 py-0.5 rounded bg-blue-600 text-white flex items-center gap-1.5">
                  <Globe className="w-3 h-3" />
                  <span>English</span>
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight">
              Book a Strategy Call
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-3 font-normal">
              Book a strategy call, message our team on WhatsApp, or tell us about the support your business needs.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder={currency === 'USD' ? 'e.g. Jordan Lee' : 'যেমন: মো: তানভীর আহমেদ'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder={selectedCountry.code === 'BD' ? '+880 17XX-XXXXXX' : `${selectedCountry.phonePrefix} (555) 000-0000`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Company / Business Name</label>
                <input
                  type="text"
                  placeholder="Your organization name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Required Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Paid Advertising">Paid Advertising</option>
                    <option value="Creative & Video">Creative & Video</option>
                    <option value="Websites & eCommerce">Websites & eCommerce</option>
                    <option value="AI Customer Support & Automation">AI Customer Support & Automation</option>
                    <option value="Multiple Services">Multiple Services</option>
                    <option value="Not Sure — Recommend a Solution">Not Sure — Recommend a Solution</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">
                      Approximate Investment / Budget (Optional)
                    </label>
                    <div className="inline-flex items-center rounded-md bg-slate-950 border border-slate-800 p-0.5 text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => handleBudgetCurrencyChange('USD')}
                        className={`px-1.5 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                          budgetCurrency === 'USD'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="US Dollar ($)"
                      >
                        $ USD
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBudgetCurrencyChange('BDT')}
                        className={`px-1.5 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                          budgetCurrency === 'BDT'
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="Bangladeshi Taka (৳)"
                      >
                        ৳ BDT
                      </button>
                    </div>
                  </div>

                  <select
                    value={budget}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBudget(val);
                      if (val.includes('৳')) {
                        setBudgetCurrency('BDT');
                      } else if (val.includes('$')) {
                        setBudgetCurrency('USD');
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                  >
                    {budgetCurrency === 'BDT' ? (
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
                    <option value="Flexible / Undecided">Flexible / Undecided</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Goals (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Tell us what you want to build or improve..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {submitting ? 'Transmitting Request...' : (currency === 'BDT' ? 'স্ট্র্যাটেজি কলের রিকোয়েস্ট পাঠান' : 'Request a Strategy Call')}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
