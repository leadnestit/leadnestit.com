import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/content';
import { Check, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, CreditCard } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { PaymentModal } from './PaymentModal';
import { LanguageRegionSelector } from './LanguageRegionSelector';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const { currency, setCurrency, hasDiscount, toggleDiscount } = useCurrency();
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<{
    name: string;
    amount: number;
  } | null>(null);

  const isUSD = currency === 'USD';

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
            <span>{isUSD ? 'TAILORED INVESTMENT • USA & GLOBAL' : 'সাশ্রয়ী ইনভেস্টমেন্ট • বাংলাদেশ ও ইউএসএ'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            {isUSD ? 'Transparent Pricing. High-Impact ROI.' : 'স্বচ্ছ প্রাইসিং ও নিশ্চিত আরওআই'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isUSD
              ? 'Silicon Valley engineering and growth systems at competitive, predictable investment tiers.'
              : 'বাংলাদেশের অন্যান্য আইটি ফার্মের তুলনায় আকর্ষণীয় ও সাশ্রয়ী মূল্যে আন্তর্জাতিক মানের ডিজিটাল বিজনেস সিস্টেম।'}
          </p>

          {/* Controls Bar: Country & Language Selector & First-Time Discount Toggle */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Country & Language Selector */}
            <LanguageRegionSelector
              variant="inline"
              label={isUSD ? 'Region & Language:' : 'অঞ্চল ও ভাষা:'}
            />

            {/* First-Time Growth Discount Button */}
            <button
              onClick={toggleDiscount}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all border active:scale-95 shadow-xs ${
                hasDiscount
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-300 text-slate-700 hover:text-slate-950'
              }`}
              id="first-time-discount-toggle"
            >
              <Sparkles className={`w-3.5 h-3.5 ${hasDiscount ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`} />
              <span>
                {isUSD
                  ? hasDiscount
                    ? '🎉 First-Time Client Discount Applied (-25% OFF)'
                    : 'Enable First-Time Client Discount (-25%)'
                  : hasDiscount
                    ? '🎉 প্রথম অর্ডারে ২৫% ডিসকাউন্ট সক্রিয় রয়েছে'
                    : 'প্রথম অর্ডারে ২৫% ছাড় চালু করুন'}
              </span>
            </button>
          </div>

          {/* Value Notice Banners */}
          {isUSD ? (
            <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium max-w-xl mx-auto text-left sm:text-center mt-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>US Client Advantage:</strong> Save 40% to 60% compared to traditional domestic agency retainers while receiving full-stack Silicon Valley code quality and 24/7 dedicated support.
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium max-w-xl mx-auto text-left sm:text-center mt-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>বিশেষ সুবিধা:</strong> দেশীয় অন্যান্য আইটি এজেন্সির সাধারণ ফ্রিল্যান্সিং কাজের বদলে ফুল-স্ট্যাক ইউএস টেকনোলজি (React/Next.js) ও এআই অটোমেশন যুক্ত প্ল্যাটফর্ম পাচ্ছেন অবিশ্বাস্য সাশ্রয়ী বাজেটে।
              </span>
            </div>
          )}
        </div>

        {/* 3 Packages Grid (1 col on mobile, 3 cols side-by-side on tablet & desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const planPricing = isUSD ? plan.pricing.USD : plan.pricing.BDT;
            const currentPrice = hasDiscount ? planPricing.displayDiscounted : planPricing.displayRegular;
            const regularPrice = planPricing.displayRegular;
            const numericalAmount = hasDiscount ? planPricing.discounted : planPricing.regular;
            const savings = hasDiscount
              ? isUSD
                ? `Save $${plan.pricing.USD.regular - plan.pricing.USD.discounted}`
                : `সাশ্রয়: ৳${(plan.pricing.BDT.regular - plan.pricing.BDT.discounted).toLocaleString('en-BD')}`
              : null;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl flex flex-col justify-between p-5 sm:p-6 md:p-5 lg:p-8 transition-all duration-200 relative ${
                  plan.isPopular
                    ? 'bg-blue-50/40 border-2 border-blue-500 shadow-xl md:-translate-y-2'
                    : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Popular or Feature Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-200" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {plan.name}
                    </h3>
                    {hasDiscount && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        25% OFF
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-bold text-blue-700 mb-3">{plan.subtitle}</p>

                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                    {plan.targetAudience}
                  </p>

                  {/* Dynamic Price Display */}
                  <div className="py-4 px-4 rounded-xl bg-slate-50 border border-slate-200 mb-5 relative overflow-hidden">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black font-mono text-slate-950 tracking-tight">
                        {currentPrice}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm font-mono text-slate-400 line-through">
                          {regularPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500 font-medium">
                      <span>{planPricing.period}</span>
                      {savings && (
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-200">
                          {savings}
                        </span>
                      )}
                    </div>

                    {/* Market Comparison Note */}
                    {isUSD && plan.pricing.USD.comparisonNote && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 text-[11px] text-blue-700 font-medium leading-tight">
                        ✓ {plan.pricing.USD.comparisonNote}
                      </div>
                    )}
                    {!isUSD && plan.pricing.BDT.comparisonNote && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 text-[11px] text-emerald-700 font-medium leading-tight">
                        ✓ {plan.pricing.BDT.comparisonNote}
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-1">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      {isUSD ? 'Included Capabilities:' : 'প্যাকেজে যা যা পাচ্ছেন:'}
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                        <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan CTAs: Select/Consultation and Direct Pay */}
                <div className="mt-8 pt-6 border-t border-slate-200 space-y-2.5">
                  <button
                    onClick={() => onSelectPlan(`${plan.name} (${currency} - ${hasDiscount ? '25% Discounted' : 'Regular'})`)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                      plan.isPopular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                    id={`pricing-cta-${plan.id}`}
                  >
                    <span>
                      {isUSD ? 'Select This Plan & Free Consultation' : 'এই প্যাকেজটি সিলেক্ট করুন'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedPaymentPlan({ name: plan.name, amount: numericalAmount })}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      {isUSD ? `Order Online & Checkout (${currentPrice})` : `অনলাইনে সরাসরি অর্ডার ও পেমেন্ট (${currentPrice})`}
                    </span>
                  </button>

                  <span className="block text-[10px] text-center text-slate-500 mt-1 font-medium">
                    {isUSD
                      ? 'Custom scope adjustments available during onboarding'
                      : 'প্রয়োজন অনুযায়ী কাস্টম ফিচার সংযোজন করা যাবে'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accepted Payment Methods and Guarantees */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {isUSD
                  ? 'Secure Global & Domestic Payment Rails'
                  : 'নিরাপদ দেশীয় ও আন্তর্জাতিক পেমেন্ট সাপোর্ট'}
              </h4>
              <p className="text-xs text-slate-600">
                {isUSD
                  ? 'Stripe, ACH Direct Debit, Wire Transfers, Visa, Mastercard, AMEX.'
                  : 'বিকাশ, নগদ, রকেট, সরাসরি ব্যাংক ট্রান্সফার এবং ভিসা/মাস্টারকার্ড সম্পূর্ণ সাপোর্ট করে।'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-800">
            {isUSD ? (
              <>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-indigo-700 font-bold shadow-2xs">Stripe</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-blue-700 font-bold shadow-2xs">Wire / ACH</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-bold shadow-2xs">Credit Cards</span>
              </>
            ) : (
              <>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-pink-600 font-bold shadow-2xs">bKash</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-amber-600 font-bold shadow-2xs">Nagad</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-blue-700 font-bold shadow-2xs">Bank Transfer</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-bold shadow-2xs">Visa / Master</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Direct Payment Checkout Modal */}
      {selectedPaymentPlan && (
        <PaymentModal
          isOpen={Boolean(selectedPaymentPlan)}
          onClose={() => setSelectedPaymentPlan(null)}
          planName={selectedPaymentPlan.name}
          amount={selectedPaymentPlan.amount}
        />
      )}
    </section>
  );
};
