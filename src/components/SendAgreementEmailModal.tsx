import React, { useState } from 'react';
import { 
  X, Mail, Send, Check, Copy, CheckCircle2, AlertCircle, 
  ExternalLink, FileText, ShieldCheck, Sparkles, MessageSquare
} from 'lucide-react';
import { ClientInvoice } from '../types';

interface SendAgreementEmailModalProps {
  isOpen: boolean;
  invoice: ClientInvoice | null;
  onClose: () => void;
  onEmailSentSuccess?: (updatedInvoice: ClientInvoice) => void;
}

export const SendAgreementEmailModal: React.FC<SendAgreementEmailModalProps> = ({
  isOpen,
  invoice,
  onClose,
  onEmailSentSuccess
}) => {
  const [sending, setSending] = useState(false);
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !invoice) return null;

  const isBDT = invoice.currency === 'BDT';
  const formatMoney = (val: number) => {
    return isBDT 
      ? `৳${val.toLocaleString('en-IN')}` 
      : `$${val.toLocaleString('en-US')}`;
  };

  const subject = `[OFFICIAL ENROLLMENT] Project Agreement & Payment Slip #${invoice.invoiceNumber} - LeadNest IT`;

  const emailBody = `Dear ${invoice.clientName}${invoice.companyName ? ` (${invoice.companyName})` : ''},

Warm greetings from LeadNest IT! We are thrilled to welcome you as an official partner. Your project enrollment has been successfully confirmed by Co-Founders Ibrahim Samrat and Amit Hasan.

Attached below are your Official Enrollment Agreement and Verified Payment Slip details:

========================================
1. ENROLLMENT & INVOICE DETAILS
========================================
• Invoice Number: ${invoice.invoiceNumber}
• Issue Date: ${invoice.issueDate}
• Due Date: ${invoice.dueDate}
• Project Kickoff: ${invoice.kickoffDate}
• Delivery Sprint Target: ${invoice.completionTarget}
• Lead In-Charge: ${invoice.assignedFounder}

========================================
2. VERIFIED PAYMENT SLIP RECEIPT
========================================
• Total Project Cost: ${formatMoney(invoice.totalAmount)}
• Amount Paid / Received: ${formatMoney(invoice.paidAmount)}
• Balance Remaining: ${formatMoney(invoice.balanceDue)}
• Payment Rail: ${invoice.paymentMethod}
• Transaction Reference: ${invoice.transactionReference}
• Payment Status: ${invoice.paymentStatus.toUpperCase()}

========================================
3. SCOPE OF WORK & DELIVERABLES
========================================
Service Package: ${invoice.serviceTitle}

${invoice.scopeDescription}

Deliverables Included:
✓ High-converting UI/UX Design System in Figma
✓ Production Architecture, Clean Codebase & Handover
✓ Domain DNS Setup, SSL Security & Cloud Ingress
✓ Conversion Analytics & Tracking Integrations
✓ 30 Days Direct Co-Founder Post-Deployment Warranty

========================================
4. CO-FOUNDERS COMMITMENT & GUARANTEE
========================================
We stand 100% behind our delivery timelines and code architecture. Co-Founder Ibrahim Samrat oversees technical systems and UI/UX craftsmanship, while Co-Founder Amit Hasan oversees acquisition funnels and conversion strategy.

Should you have any immediate questions, feel free to contact us anytime:
• LeadNest IT Hotline & WhatsApp: +880 1700-532363
• Co-Founders Direct Email: growth@leadnestit.com
• Official Portal: https://leadnestit.com

Thank you for choosing LeadNest IT to power your business growth.

Warm regards,

Ibrahim Samrat
Co-Founder & UI/UX Tech Architect

Amit Hasan
Co-Founder & Growth Marketing Lead
LeadNest IT (Dhaka & Austin, TX)`;

  // Native Mailto link trigger
  const handleLaunchEmailClient = () => {
    const mailtoUrl = `mailto:${encodeURIComponent(invoice.clientEmail)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, '_blank');
  };

  // Direct server notification dispatcher
  const handleSendServerEmail = async () => {
    try {
      setSending(true);
      setErrorMessage('');

      const res = await fetch(`/api/invoices/${invoice.id}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setDispatchedSuccess(true);
        if (onEmailSentSuccess && data.invoice) {
          onEmailSentSuccess(data.invoice);
        }
      } else {
        setErrorMessage(data.error || 'Failed to dispatch email.');
      }
    } catch (err: any) {
      console.error('Dispatch error:', err);
      setErrorMessage(err.message || 'Network error dispatching email.');
    } finally {
      setSending(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(emailBody);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                Send Agreement & Slip
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono truncate">
                Dispatches confirmation to {invoice.clientEmail}
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {dispatchedSuccess ? (
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                Agreement & Payment Slip Dispatched!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                The enrollment agreement and payment receipt slip have been successfully recorded and sent to{' '}
                <strong className="text-emerald-400 font-mono">{invoice.clientEmail}</strong>.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleLaunchEmailClient}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open in Email App / Gmail</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Recipient & Metadata summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Recipient Client</span>
                  <span className="text-slate-200 font-bold">{invoice.clientName}</span>
                  <span className="text-cyan-400 text-[11px] block">{invoice.clientEmail}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Invoice & Payment</span>
                  <span className="text-slate-200 font-bold">{invoice.invoiceNumber}</span>
                  <span className="text-emerald-400 text-[11px] block">
                    Paid: {formatMoney(invoice.paidAmount)} / Due: {formatMoney(invoice.balanceDue)}
                  </span>
                </div>
              </div>

              {/* Subject preview */}
              <div>
                <label className="text-slate-400 text-[11px] font-bold block mb-1">
                  Email Subject
                </label>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs truncate">
                  {subject}
                </div>
              </div>

              {/* Email Content Preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-400 text-[11px] font-bold">
                    Message Body (Generated Agreement & Payment Slip)
                  </label>
                  <button
                    onClick={handleCopyText}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                  >
                    {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedText ? 'Copied to Clipboard!' : 'Copy Agreement'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
                  {emailBody}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!dispatchedSuccess && (
          <div className="bg-slate-950 border-t border-slate-800 px-4 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                title="Copy entire text for WhatsApp or custom email"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleLaunchEmailClient}
                className="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                title="Open client in Gmail or Outlook"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                <span>Open Mail</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handleSendServerEmail}
                disabled={sending}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sending ? 'Dispatching...' : 'Dispatch Agreement Email'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
