import React, { useState } from 'react';
import { 
  X, Printer, Mail, Copy, Check, ShieldCheck, Download, 
  CreditCard, CheckCircle2, Calendar, FileText, ArrowRight, 
  ExternalLink, Sparkles, Building2, User, Phone, MapPin, Hash, QrCode
} from 'lucide-react';
import { Logo } from './Logo';
import { ClientInvoice } from '../types';

interface ClientInvoiceModalProps {
  isOpen: boolean;
  invoice: ClientInvoice | null;
  onClose: () => void;
  onOpenEmailModal: (invoice: ClientInvoice) => void;
}

export const ClientInvoiceModal: React.FC<ClientInvoiceModalProps> = ({
  isOpen,
  invoice,
  onClose,
  onOpenEmailModal
}) => {
  const [copiedSlip, setCopiedSlip] = useState(false);

  if (!isOpen || !invoice) return null;

  const isBDT = invoice.currency === 'BDT';
  const currencySymbol = isBDT ? '৳' : '$';

  const formatMoney = (val: number) => {
    return isBDT 
      ? `৳${val.toLocaleString('en-IN')}` 
      : `$${val.toLocaleString('en-US')}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPaymentSlip = () => {
    const slipText = `*LEADNEST IT - OFFICIAL PAYMENT SLIP & ENROLLMENT CONFIRMATION*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Invoice Number: ${invoice.invoiceNumber}
Client Name: ${invoice.clientName}
${invoice.companyName ? `Company: ${invoice.companyName}\n` : ''}Service: ${invoice.serviceTitle}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Project Cost: ${formatMoney(invoice.totalAmount)}
Amount Paid: ${formatMoney(invoice.paidAmount)} [${invoice.paymentStatus.toUpperCase()}]
Balance Remaining: ${formatMoney(invoice.balanceDue)}
Payment Rail: ${invoice.paymentMethod}
Transaction Ref: ${invoice.transactionReference}
Issue Date: ${invoice.issueDate}
Delivery Timeline: ${invoice.completionTarget}
Lead Co-Founder: ${invoice.assignedFounder}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verified & Authorized by Co-Founders:
• Ibrahim Samrat (UI/UX Tech Architect)
• Amit Hasan (Growth Marketing Lead)
Support Hotline: +880 1700-532363 | growth@leadnestit.com
Website: https://leadnestit.com`;

    navigator.clipboard.writeText(slipText);
    setCopiedSlip(true);
    setTimeout(() => setCopiedSlip(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Container - printable-invoice-container class for CSS @media print */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[96vh] flex flex-col">
        
        {/* TOP ACTION BAR - NO-PRINT */}
        <div className="no-print bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white">{invoice.invoiceNumber}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  invoice.paymentStatus === 'paid'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : invoice.paymentStatus === 'partial'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  {invoice.paymentStatus === 'paid' ? 'Paid in Full' : invoice.paymentStatus === 'partial' ? 'Advance Received' : 'Payment Due'}
                </span>
                {invoice.emailSent && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Email Dispatched</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400">Official Client Enrollment Agreement & Invoice</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-colors"
              title="Print official document or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => onOpenEmailModal(invoice)}
              className="px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Send agreement and payment slip to client email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Email Client</span>
            </button>

            <button
              onClick={handleCopyPaymentSlip}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Copy payment receipt slip text for WhatsApp"
            >
              {copiedSlip ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{copiedSlip ? 'Copied Slip!' : 'Copy Slip'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* INVOICE DOCUMENT BODY - PRINTABLE AREA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white text-slate-900 printable-invoice-container">
          
          {/* Header row: Brand & Invoice Meta */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b-2 border-slate-200 gap-4">
            <div>
              <div className="mb-2">
                <Logo size="md" />
              </div>
              <p className="text-xs text-slate-600 max-w-sm leading-relaxed mt-2">
                High-Performance Web Architecture, Conversion Marketing & AI Automation Systems.
              </p>
              <div className="text-[11px] text-slate-500 font-mono mt-1 space-y-0.5">
                <p>Global HQ: Dhaka, Bangladesh & Austin, Texas (USA)</p>
                <p>Contact: +880 1700-532363 • growth@leadnestit.com • leadnestit.com</p>
              </div>
            </div>

            {/* Invoice Meta Box */}
            <div className="sm:text-right">
              <div className="inline-block px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold tracking-wide uppercase mb-2">
                Official Enrollment Invoice
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-slate-900">
                {invoice.invoiceNumber}
              </div>
              <div className="mt-1 text-xs text-slate-600 space-y-1 font-mono">
                <p>Issue Date: <strong className="text-slate-800">{invoice.issueDate}</strong></p>
                <p>Due Date: <strong className="text-slate-800">{invoice.dueDate}</strong></p>
                <p>Project Kickoff: <strong className="text-slate-800">{invoice.kickoffDate}</strong></p>
                <p>Sprint Target: <strong className="text-blue-700">{invoice.completionTarget}</strong></p>
              </div>
            </div>
          </div>

          {/* Parties: Billed To & Assigned Delivery Co-Founders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
            {/* Client Info */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold uppercase tracking-wide text-[11px] font-mono">
                <User className="w-3.5 h-3.5" />
                <span>Billed To (Enrolled Client):</span>
              </div>
              <div className="text-base font-black text-slate-900">{invoice.clientName}</div>
              {invoice.companyName && (
                <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{invoice.companyName}</span>
                </div>
              )}
              <div className="text-slate-600 space-y-1 font-mono text-[11px] pt-1 border-t border-slate-200">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{invoice.clientEmail}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{invoice.clientPhone}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{invoice.country}</span>
                </p>
              </div>
            </div>

            {/* Delivery Assignment & Co-Founder Verification */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold uppercase tracking-wide text-[11px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Executive Delivery Authority:</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                LeadNest IT Co-Founders Team
              </div>
              <div className="text-xs text-slate-700">
                Lead In-Charge: <strong className="text-blue-700">{invoice.assignedFounder}</strong>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                <p>• <strong>Ibrahim Samrat</strong> — Co-Founder & UI/UX Tech Architect</p>
                <p>• <strong>Amit Hasan</strong> — Co-Founder & Growth Marketing Lead</p>
                <p className="text-emerald-700 font-semibold pt-1">
                  ✓ Verified 100% On-Time Sprint SLA Guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Project & Scope Description */}
          <div className="py-4">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider mb-2">
              Scope of Deliverables & Engagement Terms
            </h3>
            <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-800 leading-relaxed space-y-2">
              <div className="font-bold text-slate-900 text-sm">{invoice.serviceTitle}</div>
              <p>{invoice.scopeDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-blue-200/60 text-[11px] font-mono text-slate-700">
                <div>✓ Figma Design System & Source Code Handover</div>
                <div>✓ Ingress SSL, DNS Setup & Production Deploy</div>
                <div>✓ Meta/Google Conversion Tracking Setup</div>
                <div>✓ 30 Days Direct Co-Founder Post-Launch SLA</div>
              </div>
            </div>
          </div>

          {/* Financials Table */}
          <div className="py-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-900 text-slate-900 font-mono font-bold uppercase">
                    <th className="py-2.5 pr-4">Description / Deliverable</th>
                    <th className="py-2.5 px-3 text-center">Currency</th>
                    <th className="py-2.5 px-3 text-right">Standard Rate</th>
                    <th className="py-2.5 px-3 text-right">Applied Discount</th>
                    <th className="py-2.5 pl-4 text-right">Net Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-slate-900">{invoice.serviceTitle}</div>
                      <div className="text-[11px] text-slate-500">
                        Complete client onboarding, architecture setup, development sprint & execution.
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-slate-700">
                      {invoice.currency}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-700">
                      {formatMoney(invoice.subtotal)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-700 font-semibold">
                      {invoice.discountPercent > 0 ? `-${invoice.discountPercent}% (${formatMoney(invoice.discountAmount)})` : 'None'}
                    </td>
                    <td className="py-3.5 pl-4 text-right font-mono font-black text-slate-900 text-sm">
                      {formatMoney(invoice.totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Calculations Summary Card */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 pt-4 border-t border-slate-200 gap-4">
              {/* Payment Slip Badge */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs w-full sm:max-w-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 uppercase tracking-wide text-[11px] font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Payment Receipt Slip:</span>
                </div>
                <div className="font-mono text-[11px] text-slate-700 space-y-0.5">
                  <p>Method: <strong>{invoice.paymentMethod}</strong></p>
                  <p>Slip Ref: <strong className="text-slate-900">{invoice.transactionReference}</strong></p>
                  <p>Settled: <strong className="text-emerald-700 font-bold">{formatMoney(invoice.paidAmount)}</strong></p>
                </div>
              </div>

              {/* Totals */}
              <div className="w-full sm:w-64 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>{formatMoney(invoice.subtotal)}</span>
                </div>
                {invoice.discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({invoice.discountPercent}%):</span>
                    <span>-{formatMoney(invoice.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-black text-sm pt-1.5 border-t border-slate-300">
                  <span>Total Project Cost:</span>
                  <span>{formatMoney(invoice.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Amount Paid / Advance:</span>
                  <span>{formatMoney(invoice.paidAmount)}</span>
                </div>
                <div className={`flex justify-between text-sm font-black pt-1.5 border-t border-slate-300 ${
                  invoice.balanceDue > 0 ? 'text-blue-700' : 'text-emerald-700'
                }`}>
                  <span>Balance Remaining:</span>
                  <span>{formatMoney(invoice.balanceDue)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Co-Founders Signatures & Verification Seal */}
          <div className="mt-8 pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Signature A: Ibrahim Samrat */}
            <div className="text-center sm:text-left space-y-1">
              <div className="w-44 border-b-2 border-slate-800 pb-1 mx-auto sm:mx-0">
                <p className="font-serif italic text-base text-slate-800 font-bold">Ibrahim Samrat</p>
              </div>
              <p className="text-xs font-bold text-slate-900">Ibrahim Samrat</p>
              <p className="text-[10px] text-slate-500 font-mono">Co-Founder & UI/UX Tech Architect</p>
              <p className="text-[9px] text-slate-400 font-mono">LeadNest IT • Auth ID: LN-FOUNDER-IS</p>
            </div>

            {/* Official Stamp in Center */}
            <div className="border-2 border-dashed border-blue-500/50 rounded-xl p-2.5 text-center bg-blue-50/60 max-w-[200px]">
              <div className="text-[10px] font-mono font-bold text-blue-900 uppercase">LEADNEST IT OFFICIAL</div>
              <div className="text-[9px] text-blue-700 font-mono">Verified Enrollment Seal</div>
              <div className="text-[8px] text-slate-500 mt-1 font-mono">SECURITY CODE: LN-{invoice.invoiceNumber.slice(-4)}</div>
            </div>

            {/* Signature B: Amit Hasan */}
            <div className="text-center sm:text-right space-y-1">
              <div className="w-44 border-b-2 border-slate-800 pb-1 mx-auto sm:ml-auto">
                <p className="font-serif italic text-base text-slate-800 font-bold">Amit Hasan</p>
              </div>
              <p className="text-xs font-bold text-slate-900">Amit Hasan</p>
              <p className="text-[10px] text-slate-500 font-mono">Co-Founder & Growth Marketing Lead</p>
              <p className="text-[9px] text-slate-400 font-mono">LeadNest IT • Auth ID: LN-FOUNDER-AH</p>
            </div>
          </div>

          {/* Legal / Terms of Agreement Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed font-mono">
            <p>
              <strong>Terms of Enrollment Agreement:</strong> This invoice and confirmation slip confirms formal enrollment into the LeadNest IT growth delivery pipeline. All deliverables are protected under strict non-disclosure, with full intellectual property code transfer upon completion. 30 days direct co-founder technical warranty applies upon deployment.
            </p>
            <p className="mt-1 text-center font-sans font-medium text-slate-400">
              LeadNest IT • Built for Visionary Businesses in USA, Bangladesh & Worldwide • leadnestit.com
            </p>
          </div>
        </div>

        {/* BOTTOM ACTION BAR - NO-PRINT */}
        <div className="no-print bg-slate-950 border-t border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400">
            Click <strong className="text-white">Print / Save PDF</strong> to hand over or download an official A4 document.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenEmailModal(invoice)}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/30 flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email to Client</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
