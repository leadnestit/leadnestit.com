import React, { useState } from 'react';
import { FAQ_DATA } from '../data/content';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQSectionProps {
  onAskQuestion: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onAskQuestion }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // Open first by default

  const toggleIndex = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  return (
    <section className="py-24 bg-white relative" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>CLARITY & TRANSPARENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Direct answers to common questions about our digital business growth services, timelines, and technology systems.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-xl bg-white border border-slate-200 transition-colors overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  id={`faq-toggle-${idx}`}
                >
                  <span className="text-base font-bold text-slate-900 tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600 bg-blue-50' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have more questions footer */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">Have a specific question not covered here?</h4>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">We'll review your business setup and provide an honest assessment.</p>
          </div>
          <button
            onClick={onAskQuestion}
            className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <span>Ask Our Strategists</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
