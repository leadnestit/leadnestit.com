import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Handshake, Shield, Sparkles } from 'lucide-react';

interface PartnerProgramProps {
  onBecomePartner: () => void;
}

export const PartnerProgram: React.FC<PartnerProgramProps> = ({ onBecomePartner }) => {
  const benefits = [
    { title: 'Website maintenance', desc: 'Continuous security patches, core library updates, uptime tracking, and daily backups.' },
    { title: 'Marketing support', desc: 'Ongoing ad campaign adjustments, creative refreshers, and audience testing.' },
    { title: 'Creative support', desc: 'Graphic collateral, landing page variants, brand assets, and marketing collateral.' },
    { title: 'Performance optimization', desc: 'Speed auditing, database query tuning, and checkout velocity improvements.' },
    { title: 'Lead generation', desc: 'Pipeline maintenance, lead magnet iteration, and conversion rate testing.' },
    { title: 'AI automation', desc: 'Prompt optimization, AI chatbot retraining, and webhook flow additions.' },
    { title: 'Technical support', desc: 'Direct engineer access, rapid SLA response times, and domain management.' },
    { title: 'Growth consultation', desc: 'Quarterly executive reviews, revenue roadmap planning, and tech strategy.' },
    { title: 'Continuous improvement', desc: 'Constant A/B testing of headlines, CTAs, and user funnels to maximize ROI.' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="partner-program">
      {/* Ambient background glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Large Premium Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-slate-50/90 border border-slate-200/90 p-6 sm:p-10 lg:p-14 shadow-lg shadow-slate-900/5 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs"
              >
                <Handshake className="w-3.5 h-3.5 text-blue-600" />
                <span>STRATEGIC ALLIANCE</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                More Than a Service Provider. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                  A Team Built for Growth.
                </span>
              </h2>

              <p className="text-base text-slate-600 font-normal leading-relaxed">
                Businesses can work with LeadNest IT beyond the initial project through ongoing digital support,
                marketing and automation services. We act as your dedicated growth and technology partner.
              </p>

              <motion.div
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2 shadow-xs hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-blue-700 font-bold uppercase">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  <span>The Partnership Advantage</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Gain dedicated specialists across paid advertising, creative, web development, and AI automation working collaboratively to scale your digital presence.
                </p>
              </motion.div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onBecomePartner}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 text-base cursor-pointer"
                  id="become-growth-partner-cta"
                >
                  <span>Book a Free Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Right Column: 9 Benefits Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-md hover:shadow-slate-900/5 transition-all duration-200 flex flex-col justify-between group cursor-default"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 rounded-full bg-slate-50 text-slate-700 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-300 transition-colors">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 tracking-tight group-hover:text-slate-950 transition-colors">{b.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug font-medium">
                        {b.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
