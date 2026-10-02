import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Building2, HelpCircle, ExternalLink } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planName,
  amount
}) => {
  const { currency, hasDiscount } = useCurrency();
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'wire' | 'bkash' | 'nagad' | 'bank'>(
    currency === 'USD' ? 'stripe' : 'bkash'
  );
  const [transactionId, setTransactionId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [sessionResponse, setSessionResponse] = useState<any>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const isUSD = currency === 'USD';

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      const response = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName,
          currency,
          amount,
          customerEmail,
          customerName
        })
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        // Redirect to live Stripe checkout session
        window.location.href = data.checkoutUrl;
        return;
      }

      setSessionResponse(data);
    } catch (err: any) {
      console.error(err);
      setError('Unable to reach payment gateway endpoint. Please check your network.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-5 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-150 my-auto max-h-[92vh] overflow-y-auto text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          id="payment-modal-close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            {isUSD ? 'SECURE PAYMENT & CHECKOUT' : 'নিরাপদ পেমেন্ট গেটওয়ে'}
          </span>
        </div>

        <h3 className="text-2xl font-black text-white tracking-tight">
          {isUSD ? 'Order Plan & Payment' : 'প্যাকেজ অর্ডার ও পেমেন্ট'}
        </h3>

        {/* Plan & Pricing Summary Box */}
        <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase block">
              {isUSD ? 'Selected Plan' : 'সিলেক্টেড প্যাকেজ'}
            </span>
            <div className="text-lg font-bold text-white mt-0.5">
              {planName}
            </div>
            {hasDiscount && (
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5 font-semibold">
                <Sparkles className="w-3 h-3" />
                {isUSD ? '25% First-Time Partner Discount Applied' : '২৫% ফার্স্ট-টাইম ডিসকাউন্ট যুক্ত'}
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-slate-400 uppercase block">
              {isUSD ? 'Total Investment' : 'মোট বিলিং'}
            </span>
            <div className="text-2xl font-extrabold font-mono text-cyan-300">
              {isUSD ? `$${amount}` : `৳${amount.toLocaleString('en-BD')}`}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {isUSD ? 'USD' : 'BDT'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {sessionResponse ? (
          <div className="space-y-4 py-2 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/40 text-xs space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>
                  {isUSD ? 'Payment Instructions & Gateway Ready' : 'পেমেন্ট নির্দেশাবলী ও একাউন্ট নম্বর'}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {sessionResponse.message}
              </p>

              {isUSD ? (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                  <div className="text-slate-200 font-bold">Stripe Direct Integration:</div>
                  <div className="text-slate-400">
                    To enable 1-click live checkout with credit card / Apple Pay, paste your <code className="text-cyan-300">STRIPE_SECRET_KEY</code> in your environment file.
                  </div>
                  <div className="text-slate-300 pt-1">
                    Direct Wire/ACH Account: <span className="text-white">Delaware / NY USA Account</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                  <div className="text-pink-400 font-bold">bKash Merchant / Personal:</div>
                  <div className="text-white font-bold text-sm">
                    {sessionResponse.paymentInstructions?.merchantBkash || '01700-LEADNEST'}
                  </div>
                  <div className="text-orange-400 font-bold pt-1">Nagad Merchant:</div>
                  <div className="text-white font-bold">
                    {sessionResponse.paymentInstructions?.merchantNagad || '01700-LEADNEST'}
                  </div>
                  <div className="text-slate-400 text-[10px] pt-1">
                    রেফারেন্স কোড: <span className="text-cyan-300 font-bold">{sessionResponse.paymentInstructions?.reference}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSessionResponse(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                {isUSD ? 'Back' : 'ফিরে যান'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
              >
                {isUSD ? 'Complete Window' : 'সম্পন্ন করুন'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleInitiatePayment} className="space-y-4">
            {/* Payment Method Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                {isUSD ? 'Select Payment Rail' : 'পেমেন্ট মেথড নির্বাচন করুন'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {isUSD ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('stripe')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        paymentMethod === 'stripe'
                          ? 'bg-blue-950/60 border-blue-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">Credit / Debit Card</div>
                        <div className="text-[10px] text-slate-400">Stripe, Apple & Google Pay</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wire')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        paymentMethod === 'wire'
                          ? 'bg-blue-950/60 border-blue-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">Bank Wire / ACH</div>
                        <div className="text-[10px] text-slate-400">Direct US Corporate Transfer</div>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        paymentMethod === 'bkash'
                          ? 'bg-pink-950/50 border-pink-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-pink-600 text-[10px] font-bold text-white flex items-center justify-center">
                        b
                      </span>
                      <div>
                        <div className="text-xs font-bold text-pink-300">bKash (বিকাশ)</div>
                        <div className="text-[10px] text-slate-400">মার্চেন্ট / সেন্ড মানি</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('nagad')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        paymentMethod === 'nagad'
                          ? 'bg-orange-950/50 border-orange-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-orange-600 text-[10px] font-bold text-white flex items-center justify-center">
                        N
                      </span>
                      <div>
                        <div className="text-xs font-bold text-orange-300">Nagad (নগদ)</div>
                        <div className="text-[10px] text-slate-400">ডাইরেক্ট ক্যাশ ইন / পে</div>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Customer Information Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {isUSD ? 'Client Full Name *' : 'ক্লায়েন্টের নাম *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isUSD ? 'e.g. Alex Morgan' : 'যেমন: মো: তানভীর'}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {isUSD ? 'Email Address *' : 'ইমেইল এড্রেস *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder={isUSD ? 'alex@company.com' : 'contact@business.com'}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit / Proceed Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50 mt-3"
              id="proceed-payment-btn"
            >
              {processing ? (
                <span>{isUSD ? 'Connecting Payment Rails...' : 'গেটওয়ে কানেক্ট হচ্ছে...'}</span>
              ) : (
                <>
                  <span>
                    {isUSD
                      ? `Proceed to Checkout (${isUSD ? `$${amount}` : `৳${amount}`})`
                      : `পেমেন্ট সম্পন্ন করুন (৳${amount.toLocaleString('en-BD')})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {isUSD
                  ? '256-bit SSL encrypted. 30-day money-back satisfaction guarantee.'
                  : '২৫৬-বিট এসএসএল এনক্রিপশন ও শতভাগ নিরাপদ লেনদেন।'}
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
