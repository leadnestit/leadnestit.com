import React, { useState, useEffect } from 'react';
import { 
  X, Check, Plus, Briefcase, ShieldCheck, Sparkles, 
  Calendar, User, Mail, Phone, Building2, CreditCard, FileText, ArrowRight
} from 'lucide-react';
import { Currency, ClientInvoice, ConsultationData } from '../types';

interface EnrollClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvoiceCreated: (invoice: ClientInvoice) => void;
  prefillLead?: ConsultationData | null;
  defaultCurrency?: Currency;
}

export const EnrollClientModal: React.FC<EnrollClientModalProps> = ({
  isOpen,
  onClose,
  onInvoiceCreated,
  prefillLead,
  defaultCurrency = 'USD'
}) => {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [country, setCountry] = useState('United States');

  const [serviceTitle, setServiceTitle] = useState('Complete Digital Business Solution');
  const [subtotal, setSubtotal] = useState<number>(currency === 'BDT' ? 80000 : 3500);
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [paidAmount, setPaidAmount] = useState<number>(currency === 'BDT' ? 30000 : 1300);
  
  const [paymentMethod, setPaymentMethod] = useState(currency === 'BDT' ? 'bKash Merchant' : 'Stripe Card');
  const [transactionReference, setTransactionReference] = useState('');
  const [assignedFounder, setAssignedFounder] = useState('Ibrahim Samrat & Amit Hasan');
  const [completionTarget, setCompletionTarget] = useState('2-3 Weeks Sprint');
  const [scopeDescription, setScopeDescription] = useState(
    'Figma UI/UX Design System, Next-Gen High Performance Web Application, Cloud Architecture & SSL, Conversion Tracking and 30-Day Post-Launch SLA Guarantee.'
  );

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update defaults when currency changes
  useEffect(() => {
    if (currency === 'BDT') {
      if (subtotal < 10000) setSubtotal(120000);
      setPaymentMethod((prev) => prev.includes('Stripe') ? 'bKash Merchant' : prev);
      setCountry((prev) => prev === 'United States' ? 'Bangladesh' : prev);
    } else {
      if (subtotal > 10000) setSubtotal(3500);
      setPaymentMethod((prev) => prev.includes('bKash') ? 'Stripe Card' : prev);
      setCountry((prev) => prev === 'Bangladesh' ? 'United States' : prev);
    }
  }, [currency]);

  // Prefill if converting an existing lead
  useEffect(() => {
    if (prefillLead) {
      setClientName(prefillLead.fullName || '');
      setCompanyName(prefillLead.businessName || '');
      setClientEmail(prefillLead.email || '');
      setClientPhone(prefillLead.phoneOrWhatsApp || '');
      if (prefillLead.currency) setCurrency(prefillLead.currency);
      if (prefillLead.requiredServices) setServiceTitle(prefillLead.requiredServices);
      if (prefillLead.region) {
        setCountry(prefillLead.region === 'USA' ? 'United States' : prefillLead.region);
      }
      // Generate default reference
      setTransactionReference(`TXN-${Math.floor(100000 + Math.random() * 900000)}`);
    } else {
      setTransactionReference(`TXN-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  }, [prefillLead, isOpen]);

  if (!isOpen) return null;

  // Calculated values
  const discAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = Math.max(0, subtotal - discAmount);
  const balanceDue = Math.max(0, totalAmount - paidAmount);

  const handleQuickAdvance = (type: 'half' | 'full' | 'zero') => {
    if (type === 'half') {
      setPaidAmount(Math.round(totalAmount / 2));
    } else if (type === 'full') {
      setPaidAmount(totalAmount);
    } else {
      setPaidAmount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      setErrorMsg('Client name and email address are required.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');

      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          companyName,
          clientEmail,
          clientPhone,
          country,
          serviceTitle,
          scopeDescription,
          currency,
          subtotal,
          discountPercent,
          paidAmount,
          paymentMethod,
          transactionReference: transactionReference || `TXN-${Date.now().toString(36).toUpperCase()}`,
          assignedFounder,
          completionTarget,
          consultationId: prefillLead?.id
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.invoice) {
        onInvoiceCreated(data.invoice);
        onClose();
      } else {
        setErrorMsg(data.error || 'Failed to generate invoice.');
      }
    } catch (err: any) {
      console.error('Invoice creation error:', err);
      setErrorMsg(err.message || 'Network error occurred while enrolling client.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                Enroll Client & Issue Invoice
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono truncate">
                Official verified invoice & payment agreement
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Region & Language Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-xs font-bold text-white block">Target Currency & Standard</span>
              <span className="text-[11px] text-slate-400">Invoice formatting and language</span>
            </div>
            <div className="inline-flex rounded-lg bg-slate-900 border border-slate-700 p-0.5 text-xs font-bold w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded transition-colors text-center ${
                  currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇺🇸 USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('BDT')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded transition-colors text-center ${
                  currency === 'BDT' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇧🇩 BDT (৳)
              </button>
            </div>
          </div>

          {/* Section: Client Details */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Client Information</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Jordan Matthews or নাঈমুর রহমান"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Company / Business Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Nexus Global Logistics"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Client Email Address *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+880 17XX... or +1 (512)..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Project Scope & Deliverables */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-[11px] font-mono font-bold uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Project Package & Scope</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Service Package</label>
                <select
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                >
                  <option value="Multiple Services">Multiple Services</option>
                  <option value="Complete Digital Business Solution">Complete Digital Business Solution</option>
                  <option value="Enterprise Web & Client Portal Platform">Enterprise Web & Client Portal Platform</option>
                  <option value="D2C eCommerce & Meta Ads Scaling Funnel">D2C eCommerce & Meta Ads Scaling Funnel</option>
                  <option value="AI Automation & Custom Business System">AI Automation & Custom Business System</option>
                  <option value="High-Converting UI/UX Design System">High-Converting UI/UX Design System</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Lead Co-Founder In-Charge</label>
                <select
                  value={assignedFounder}
                  onChange={(e) => setAssignedFounder(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                >
                  <option value="Ibrahim Samrat (UI/UX Tech Architect)">Ibrahim Samrat (UI/UX Tech Architect)</option>
                  <option value="Amit Hasan (Growth Marketing Lead)">Amit Hasan (Growth Marketing Lead)</option>
                  <option value="Ibrahim Samrat & Amit Hasan (Joint Delivery)">Ibrahim Samrat & Amit Hasan (Joint Delivery)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Delivery Sprint Target</label>
                <select
                  value={completionTarget}
                  onChange={(e) => setCompletionTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                >
                  <option value="2 Weeks Sprint">2 Weeks Sprint</option>
                  <option value="3 Weeks Sprint">3 Weeks Sprint</option>
                  <option value="4 Weeks Sprint">4 Weeks Sprint</option>
                  <option value="Ongoing Monthly Retainer">Ongoing Monthly Retainer</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Country / Region</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Bangladesh / United States / Canada"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Scope & Deliverables Description</label>
              <textarea
                rows={2}
                value={scopeDescription}
                onChange={(e) => setScopeDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          {/* Section: Financials & Payment Slip Details */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-[11px] font-mono font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Financials, Discounts & Payment Slip</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Project Rate
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={subtotal}
                  onChange={(e) => setSubtotal(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono font-bold focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Client Discount (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono font-bold focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Amount Paid / Advance
                </label>
                <input
                  type="number"
                  min="0"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-mono font-bold focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            {/* Quick Advance Selection Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Quick Advance:</span>
              <button
                type="button"
                onClick={() => handleQuickAdvance('half')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-200"
              >
                50% Advance
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdvance('full')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-emerald-400"
              >
                100% Full Payment
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdvance('zero')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-amber-400"
              >
                0% Due
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Payment Method / Rail</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                >
                  <option value="bKash Merchant (Official)">bKash Merchant (Official)</option>
                  <option value="Nagad Direct Payment">Nagad Direct Payment</option>
                  <option value="Stripe Card / US Bank ACH">Stripe Card / US Bank ACH</option>
                  <option value="Direct Bank Wire / TT">Direct Bank Wire / TT</option>
                  <option value="Cash / Office Settlement">Cash / Office Settlement</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Payment Slip Ref / Transaction ID</label>
                <input
                  type="text"
                  value={transactionReference}
                  onChange={(e) => setTransactionReference(e.target.value)}
                  placeholder="e.g. BKASH-9X82710 or STRIPE-CH_29841"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            {/* Computation Summary Bar */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">TOTAL PROJECT VALUE</span>
                <span className="text-white font-bold">
                  {currency === 'BDT' ? `৳${totalAmount.toLocaleString()}` : `$${totalAmount.toLocaleString()}`}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">AMOUNT RECEIVED</span>
                <span className="text-emerald-400 font-bold">
                  {currency === 'BDT' ? `৳${paidAmount.toLocaleString()}` : `$${paidAmount.toLocaleString()}`}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">BALANCE DUE</span>
                <span className={`font-bold ${balanceDue > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {currency === 'BDT' ? `৳${balanceDue.toLocaleString()}` : `$${balanceDue.toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>
                {submitting ? 'Generating Official Invoice...' : 'Enroll Client & Generate Professional Invoice'}
              </span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
