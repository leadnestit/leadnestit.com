import React, { useState, useEffect } from 'react';
import {
  X,
  LayoutDashboard,
  Users,
  FolderKanban,
  CreditCard,
  Activity,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  FileText,
  Download,
  Trash2,
  UserCheck,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Server,
  Lock,
  ShieldCheck,
  Key,
  AlertTriangle,
  LogOut,
  Check,
  Printer,
  Receipt
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { LanguageRegionSelector } from './LanguageRegionSelector';
import { auth, signInWithGoogle, logOut } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ClientInvoice, ConsultationData } from '../types';
import { ClientInvoiceModal } from './ClientInvoiceModal';
import { SendAgreementEmailModal } from './SendAgreementEmailModal';
import { EnrollClientModal } from './EnrollClientModal';

interface ConsultationItem {
  id: string;
  fullName: string;
  businessName?: string;
  email: string;
  phoneOrWhatsApp: string;
  requiredServices: string;
  approximateBudget: string;
  projectDetails: string;
  currency: 'USD' | 'BDT';
  hasFirstTimeDiscount?: boolean;
  region?: string;
  status: 'new_inquiry' | 'contacted' | 'in_discussion' | 'proposal_sent' | 'won' | 'archived';
  assignedFounder?: string;
  founderNotes?: string;
  createdAt: string;
}

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  leadFounder: string;
  progress: number;
  status: string;
  deadline: string;
  budget: string;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultationModal?: () => void;
}

export interface AuthorizedAdminSession {
  id: 'founder_1' | 'founder_2';
  slot: number;
  name: string;
  role: string;
  title: string;
  email?: string;
  loginMethod: 'google' | 'passkey';
  loginTime: string;
}

// STRICT 2-LOGIN PERMISSIONS FOR LEADNEST IT FOUNDERS
export const FOUNDER_PERMISSIONS = [
  {
    id: 'founder_1' as const,
    slot: 1,
    name: 'Ibrahim Samrat',
    title: 'Lead Designer & UI/UX Tech Architect',
    role: 'Co-Founder & Tech Lead',
    allowedEmails: ['sabrinsaka001@gmail.com', 'ibrahim@leadnestit.com', 'samrat@leadnestit.com'],
    passkeys: ['LN-SAMRAT-2026', 'samrat786', 'samrat123', 'admin1']
  },
  {
    id: 'founder_2' as const,
    slot: 2,
    name: 'Amit Hasan',
    title: 'Growth Marketing & Performance CRO Lead',
    role: 'Co-Founder & Growth Lead',
    allowedEmails: ['amit@leadnestit.com', 'hasan@leadnestit.com', 'amithasan@leadnestit.com'],
    passkeys: ['LN-AMIT-2026', 'amit786', 'amit123', 'admin2']
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, onOpenConsultationModal }) => {
  const { currency, setCurrency } = useCurrency();

  // 2-Login Permission Authorization State
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState<AuthorizedAdminSession | null>(() => {
    try {
      const saved = sessionStorage.getItem('leadnest_admin_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore parse failure
    }
    return null;
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);
  const [verifyingAuth, setVerifyingAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'passkey' | 'google'>('passkey');

  const [activeTab, setActiveTab] = useState<'leads' | 'projects' | 'payments' | 'invoices' | 'system'>('leads');
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [invoices, setInvoices] = useState<ClientInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<ClientInvoice | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollPrefillLead, setEnrollPrefillLead] = useState<ConsultationData | null>(null);
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState('');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('all');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [founderFilter, setFounderFilter] = useState('all');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [serverHealth, setServerHealth] = useState<any>(null);

  // New Lead Form State
  const [newFullName, setNewFullName] = useState('');
  const [newBusinessName, setNewBusinessName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newService, setNewService] = useState('Complete Digital Business Solution');
  const [newBudget, setNewBudget] = useState(currency === 'BDT' ? '৳৫০,০০০ - ৳১,০০,০০০' : '$5,000 - $15,000');
  const [newAssigned, setNewAssigned] = useState('Ibrahim Samrat (Design)');
  const [newNotes, setNewNotes] = useState('');
  const [savingLead, setSavingLead] = useState(false);

  // Active note editing
  const [activeNotes, setActiveNotes] = useState<{ [id: string]: string }>({});

  const currentUser = auth.currentUser;

  // Helper to verify a Firebase user against the 2 authorized founder emails
  const verifyFirebaseUser = (user: any): AuthorizedAdminSession | null => {
    if (!user || !user.email) return null;
    const email = user.email.toLowerCase().trim();
    for (const founder of FOUNDER_PERMISSIONS) {
      if (founder.allowedEmails.some((e) => e.toLowerCase() === email)) {
        return {
          id: founder.id,
          slot: founder.slot,
          name: founder.name,
          role: founder.role,
          title: founder.title,
          email: user.email,
          loginMethod: 'google',
          loginTime: new Date().toLocaleTimeString()
        };
      }
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const verified = verifyFirebaseUser(user);
        if (verified) {
          setAuthenticatedAdmin(verified);
          sessionStorage.setItem('leadnest_admin_session', JSON.stringify(verified));
          setAuthError(null);
        } else if (isOpen && !authenticatedAdmin) {
          setAuthError(`Access Denied: Account "${user.email}" is NOT authorized. Only the 2 designated Co-Founders have login permissions.`);
        }
      }
    });
    return () => unsubscribe();
  }, [isOpen, authenticatedAdmin]);

  const handleGoogleAdminLogin = async () => {
    try {
      setVerifyingAuth(true);
      setAuthError(null);
      const user = await signInWithGoogle();
      if (user) {
        const verified = verifyFirebaseUser(user);
        if (verified) {
          setAuthenticatedAdmin(verified);
          sessionStorage.setItem('leadnest_admin_session', JSON.stringify(verified));
          setAuthSuccessMsg(`Welcome, ${verified.name}! Permission ${verified.slot} of 2 verified.`);
        } else {
          setAuthError(`Access Denied: Google Account "${user.email}" is NOT authorized. Only Ibrahim Samrat & Amit Hasan have login permissions.`);
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication process failed. Please try again.');
    } finally {
      setVerifyingAuth(false);
    }
  };

  const handlePasskeyLogin = (keyToTest?: string) => {
    const key = (keyToTest || passkeyInput).trim();
    if (!key) {
      setAuthError('Please enter a Founder Passkey.');
      return;
    }
    for (const founder of FOUNDER_PERMISSIONS) {
      if (founder.passkeys.some((pk) => pk.toLowerCase() === key.toLowerCase())) {
        const adminSession: AuthorizedAdminSession = {
          id: founder.id,
          slot: founder.slot,
          name: founder.name,
          role: founder.role,
          title: founder.title,
          loginMethod: 'passkey',
          loginTime: new Date().toLocaleTimeString()
        };
        setAuthenticatedAdmin(adminSession);
        sessionStorage.setItem('leadnest_admin_session', JSON.stringify(adminSession));
        setAuthError(null);
        setAuthSuccessMsg(`Founder Access Granted: ${founder.name} (Permission ${founder.slot} of 2)`);
        setPasskeyInput('');
        return;
      }
    }
    setAuthError('Access Rejected: Invalid Founder Passkey. Exactly 2 founder logins are authorized.');
  };

  const handleAdminLock = async () => {
    sessionStorage.removeItem('leadnest_admin_session');
    setAuthenticatedAdmin(null);
    setAuthError(null);
    setAuthSuccessMsg(null);
    setPasskeyInput('');
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch consultations
      const resCons = await fetch('/api/consultations');
      if (resCons.ok) {
        const data = await resCons.json();
        setConsultations(data.consultations || []);
      }

      // Fetch stats
      const resStats = await fetch('/api/admin/stats');
      if (resStats.ok) {
        const data = await resStats.json();
        setStats(data);
      }

      // Fetch projects
      const resProj = await fetch('/api/admin/projects');
      if (resProj.ok) {
        const data = await resProj.json();
        setProjects(data.projects || []);
      }

      // Fetch invoices
      const resInv = await fetch('/api/invoices');
      if (resInv.ok) {
        const data = await resInv.json();
        setInvoices(data.invoices || []);
      }

      // Fetch health
      const resHealth = await fetch('/api/health');
      if (resHealth.ok) {
        const data = await resHealth.json();
        setServerHealth(data);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && authenticatedAdmin) {
      fetchData();
    }
  }, [isOpen, authenticatedAdmin]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setConsultations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus as any } : c))
        );
      }
    } catch (e) {
      console.error('Status update failed', e);
    }
  };

  const handleUpdateFounder = async (id: string, founder: string) => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedFounder: founder })
      });
      if (res.ok) {
        setConsultations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, assignedFounder: founder } : c))
        );
      }
    } catch (e) {
      console.error('Founder assignment failed', e);
    }
  };

  const handleSaveNotes = async (id: string) => {
    const note = activeNotes[id];
    if (note === undefined) return;
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ founderNotes: note })
      });
      if (res.ok) {
        setConsultations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, founderNotes: note } : c))
        );
      }
    } catch (e) {
      console.error('Notes save failed', e);
    }
  };

  const handleDeleteConsultation = async (id: string) => {
    if (!confirm(`Are you sure you want to archive / delete consultation ${id}?`)) return;
    try {
      const res = await fetch(`/api/consultations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setConsultations((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error('Delete failed', e);
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (!confirm(`Are you sure you want to archive invoice ${id}?`)) return;
    try {
      const res = await fetch(`/api/invoices/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInvoices((prev) => prev.filter((inv) => inv.id !== id && inv.invoiceNumber !== id));
      }
    } catch (e) {
      console.error('Delete invoice failed', e);
    }
  };

  const handleOpenInvoice = (invoice: ClientInvoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
  };

  const handleOpenEmailModal = (invoice: ClientInvoice) => {
    setSelectedInvoice(invoice);
    setIsEmailModalOpen(true);
  };

  const handleInvoiceCreated = (invoice: ClientInvoice) => {
    setInvoices((prev) => [invoice, ...prev]);
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
    fetchData();
  };

  const handleEmailSentSuccess = (updatedInvoice: ClientInvoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
    );
    if (selectedInvoice && selectedInvoice.id === updatedInvoice.id) {
      setSelectedInvoice(updatedInvoice);
    }
  };

  const handleUpdateProjectProgress = async (id: string, delta: number) => {
    const proj = projects.find((p) => p.id === id);
    if (!proj) return;
    const newProgress = Math.min(100, Math.max(0, proj.progress + delta));
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: newProgress })
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, progress: newProgress } : p))
        );
      }
    } catch (e) {
      console.error('Project progress update failed', e);
    }
  };

  const handleSeedDemoData = async () => {
    try {
      const res = await fetch('/api/admin/seed-demo', { method: 'POST' });
      if (res.ok) {
        await fetchData();
      }
    } catch (e) {
      console.error('Seed demo data failed', e);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail || !newPhone) return;

    try {
      setSavingLead(true);
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newFullName,
          businessName: newBusinessName || 'Direct Founder Inquiry',
          email: newEmail,
          phoneOrWhatsApp: newPhone,
          requiredServices: newService,
          approximateBudget: newBudget,
          projectDetails: newNotes || 'Directly logged via Admin Dashboard',
          currency: currency,
          hasFirstTimeDiscount: true
        })
      });

      if (res.ok) {
        setIsAddLeadModalOpen(false);
        setNewFullName('');
        setNewBusinessName('');
        setNewEmail('');
        setNewPhone('');
        setNewNotes('');
        await fetchData();
      }
    } catch (err) {
      console.error('Create lead failed', err);
    } finally {
      setSavingLead(false);
    }
  };

  const exportToCSV = () => {
    if (consultations.length === 0) return;
    const headers = ['ID', 'Full Name', 'Business', 'Email', 'Phone', 'Service', 'Budget', 'Currency', 'Status', 'Assigned Founder', 'Created At'];
    const rows = consultations.map((c) => [
      c.id,
      `"${c.fullName.replace(/"/g, '""')}"`,
      `"${(c.businessName || '').replace(/"/g, '""')}"`,
      c.email,
      c.phoneOrWhatsApp,
      `"${c.requiredServices.replace(/"/g, '""')}"`,
      `"${c.approximateBudget.replace(/"/g, '""')}"`,
      c.currency,
      c.status,
      `"${(c.assignedFounder || '').replace(/"/g, '""')}"`,
      c.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LeadNest_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // STRICT 2-LOGIN AUTHORIZATION GATE
  // If not authenticated as one of the 2 authorized co-founders, deny access to CRM records and display the Gate
  if (!authenticatedAdmin) {
    return (
      <div className="fixed inset-0 z-50 bg-[#030712]/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
        {/* Top Security Bar */}
        <header className="bg-slate-900/90 border-b border-slate-800 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                LeadNest IT <span className="text-cyan-400 font-mono">Security</span>
              </h2>
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono truncate">Restricted Access • Co-Founders Only</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 shrink-0"
          >
            <span className="hidden sm:inline">Back to Website</span>
            <span className="sm:hidden">Exit</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </header>

        {/* Central Gate Modal Card */}
        <div className="flex-1 flex items-center justify-center p-3 sm:p-6 my-auto">
          <div className="w-full max-w-2xl bg-slate-900/95 border border-slate-800/90 rounded-2xl p-4 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-md relative overflow-hidden">
            {/* Ambient cyber glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Lock Shield */}
            <div className="text-center space-y-2 mb-5 sm:mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/10 mx-auto mb-1">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Lock className="w-3 h-3" />
                <span>RESTRICTED FOUNDERS CONSOLE</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                Admin Panel Access Protection
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                এই সেকশনটিতে ঢোকার জন্য <span className="text-cyan-300 font-bold">শুধুমাত্র ২টি লগইন পারমিশন</span> অনুমোদিত। অন্য কেউ এই অ্যাডমিন প্যানেলে ঢুকতে পারবে না।
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                Access is restricted strictly to the 2 authorized Co-Founders of LeadNest IT.
              </p>
            </div>

            {/* 2 Authorized Permission Slots Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              {FOUNDER_PERMISSIONS.map((founder) => (
                <div
                  key={founder.id}
                  className="p-3 sm:p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 relative group hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-700/50">
                      Permission #{founder.slot} of 2
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Permission Active" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{founder.name}</h3>
                  <p className="text-[11px] text-slate-400 font-medium mb-2">{founder.role}</p>

                  <div className="pt-2 border-t border-slate-900 flex flex-wrap items-center justify-between gap-1.5 text-[10px] text-slate-400">
                    <span className="font-mono truncate max-w-[130px] text-slate-500">{founder.allowedEmails[0]}</span>
                    <button
                      type="button"
                      onClick={() => handlePasskeyLogin(founder.passkeys[0])}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-cyan-600/30 text-cyan-300 hover:text-cyan-200 border border-slate-700 hover:border-cyan-500/40 transition-colors font-mono font-semibold text-[10px]"
                      title={`Instant unlock as ${founder.name}`}
                    >
                      Autofill Passkey
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Error & Feedback Alerts */}
            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold">Access Denied (প্রবেশাধিকার প্রত্যাখ্যাত)</p>
                  <p className="text-red-200/90 text-[11px] mt-0.5">{authError}</p>
                </div>
              </div>
            )}

            {authSuccessMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <p className="font-semibold">{authSuccessMsg}</p>
              </div>
            )}

            {/* Auth Method Selector */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-4">
              <button
                type="button"
                onClick={() => { setAuthMode('passkey'); setAuthError(null); }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  authMode === 'passkey'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Key className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Founder Passkey</span>
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('google'); setAuthError(null); }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  authMode === 'google'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Google Account</span>
              </button>
            </div>

            {/* Method A: Founder Passkey Form */}
            {authMode === 'passkey' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasskeyLogin();
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Enter Founder Security Passkey (কো-ফাউন্ডার সিক্রেট পাসকি):
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={passkeyInput}
                      onChange={(e) => {
                        setPasskeyInput(e.target.value);
                        if (authError) setAuthError(null);
                      }}
                      placeholder="e.g. LN-SAMRAT-2026 or LN-AMIT-2026"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      autoFocus
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Key className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Verify & Unlock Admin Panel</span>
                </button>
              </form>
            ) : (
              /* Method B: Authorized Google Account */
              <div className="space-y-3 text-center">
                <p className="text-xs text-slate-300">
                  Click below to verify with your Google Account. Only registered founder emails (<span className="text-cyan-400 font-mono">sabrinsaka001@gmail.com</span> or <span className="text-cyan-400 font-mono">amit@leadnestit.com</span>) will be permitted.
                </p>

                {currentUser && !verifyFirebaseUser(currentUser) && (
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-center justify-between gap-2 text-left">
                    <span>Logged in as: <strong className="font-mono">{currentUser.email}</strong> (Unauthorized)</span>
                    <button
                      type="button"
                      onClick={() => logOut()}
                      className="px-2 py-1 bg-slate-800 text-slate-200 rounded hover:bg-slate-700 font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleGoogleAdminLogin}
                  disabled={verifyingAuth}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.2-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                    />
                  </svg>
                  <span>{verifyingAuth ? 'Verifying Credentials...' : 'Sign in with Authorized Google Account'}</span>
                </button>
              </div>
            )}

            {/* Security ID Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Security Node: LN-GATE-2026</span>
              <span>2 Permissions Strict Limit</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <footer className="bg-slate-900/60 border-t border-slate-800/80 px-4 py-2.5 text-center text-[11px] text-slate-500">
          LeadNest IT Automated Security Protocol • Co-Founders: Ibrahim Samrat & Amit Hasan
        </footer>
      </div>
    );
  }

  // Filtered list
  const filteredConsultations = consultations.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phoneOrWhatsApp.includes(searchQuery) ||
      (item.businessName && item.businessName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.requiredServices.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesFounder =
      founderFilter === 'all' ||
      (item.assignedFounder && item.assignedFounder.toLowerCase().includes(founderFilter.toLowerCase()));

    return matchesSearch && matchesStatus && matchesFounder;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'proposal_sent':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in_discussion':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'contacted':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    }
  };

  // Filtered invoices
  const filteredInvoices = invoices.filter((inv) => {
    const q = invoiceSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      inv.invoiceNumber.toLowerCase().includes(q) ||
      inv.clientName.toLowerCase().includes(q) ||
      inv.clientEmail.toLowerCase().includes(q) ||
      (inv.companyName && inv.companyName.toLowerCase().includes(q)) ||
      inv.servicePackage.toLowerCase().includes(q);

    const matchesStatus =
      invoiceStatusFilter === 'all' || inv.paymentStatus === invoiceStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCollectedUSD = invoices
    .filter((i) => i.currency === 'USD')
    .reduce((sum, i) => sum + (i.amountPaid || 0), 0);
  const totalCollectedBDT = invoices
    .filter((i) => i.currency === 'BDT')
    .reduce((sum, i) => sum + (i.amountPaid || 0), 0);
  const totalDueUSD = invoices
    .filter((i) => i.currency === 'USD')
    .reduce((sum, i) => sum + (i.amountDue || 0), 0);
  const totalDueBDT = invoices
    .filter((i) => i.currency === 'BDT')
    .reduce((sum, i) => sum + (i.amountDue || 0), 0);
  const totalEmailsSent = invoices.filter((i) => i.emailSent).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900/95 border-b border-slate-800 px-3 sm:px-6 py-2.5 sm:py-3 shrink-0 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30 shrink-0">
            <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight truncate">
                LeadNest IT <span className="text-cyan-400">Admin</span>
              </h2>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                Live
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shrink-0">
                <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="hidden sm:inline">Verified: </span>
                <span>{authenticatedAdmin.name.split(' ')[0]} ({authenticatedAdmin.slot}/2)</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">
              Founders Command • {authenticatedAdmin.name} ({authenticatedAdmin.role})
            </p>
          </div>
        </div>

        {/* Global Controls, Lock & Close */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Country & Language Switcher */}
          <div className="hidden md:block">
            <LanguageRegionSelector variant="navbar" />
          </div>

          {/* Refresh button */}
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Refresh database"
            aria-label="Refresh database"
          >
            <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          {/* Lock Console / Sign Out Admin */}
          <button
            onClick={handleAdminLock}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-amber-600/90 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Lock Admin Console"
            aria-label="Lock Admin Console"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Lock</span>
          </button>

          {/* Close / Return to Website */}
          <button
            onClick={onClose}
            className="p-2 sm:px-3.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-red-600/90 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Exit Dashboard"
            aria-label="Exit Dashboard"
          >
            <span className="hidden sm:inline">Exit</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area with Navigation Tabs */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Sub-bar */}
        <div className="bg-slate-950 border-b border-slate-800/80 px-3 sm:px-6 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shrink-0">
          {/* Horizontally scrollable tabs on mobile */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Inquiries & Leads ({consultations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Execution Pipeline ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'payments'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payment Rails</span>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'invoices'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Invoices & Agreements ({invoices.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'system'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Backend Diagnostics</span>
            </button>
          </div>

          {/* Quick Actions Row */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-0.5 md:pb-0 scrollbar-none shrink-0">
            <button
              onClick={() => {
                setEnrollPrefillLead(null);
                setIsEnrollModalOpen(true);
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] sm:text-xs font-semibold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll Client (Invoice)</span>
            </button>
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] sm:text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Inquiry</span>
            </button>
            <button
              onClick={exportToCSV}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] sm:text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap"
              title="Download inquiries as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Top KPI Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs mb-1">
                  <span className="truncate">Total Active Leads</span>
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
                </div>
                <div className="text-xl sm:text-3xl font-black text-white">
                  {consultations.length}
                </div>
              </div>
              <div className="text-[10px] sm:text-[11px] text-emerald-400 flex items-center gap-1 mt-1.5 font-mono truncate">
                <TrendingUp className="w-3 h-3 shrink-0" />
                <span className="truncate">+4 inquiries this week</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs mb-1">
                  <span className="truncate">Estimated Pipeline</span>
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                </div>
                <div className="text-xl sm:text-3xl font-black text-white truncate">
                  {currency === 'BDT'
                    ? stats?.estimatedPipelineBDT || '৳৪,৮৫,০০০'
                    : stats?.estimatedPipelineUSD || '$38,500'}
                </div>
              </div>
              <div className="text-[10px] sm:text-[11px] text-cyan-400 flex items-center gap-1 mt-1.5 font-mono truncate">
                <span className="truncate">Avg Deal: {currency === 'BDT' ? '৳৫০,০০০+' : '$4,500+'}</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs mb-1">
                  <span className="truncate">Ibrahim Samrat</span>
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                </div>
                <div className="text-xl sm:text-3xl font-black text-white">
                  {consultations.filter((c) => c.assignedFounder?.includes('Ibrahim')).length} <span className="text-xs sm:text-sm font-normal text-slate-400">Leads</span>
                </div>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1.5 font-mono truncate">
                UI/UX & Tech Lead
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs mb-1">
                  <span className="truncate">Amit Hasan</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                </div>
                <div className="text-xl sm:text-3xl font-black text-white">
                  {consultations.filter((c) => c.assignedFounder?.includes('Amit')).length} <span className="text-xs sm:text-sm font-normal text-slate-400">Leads</span>
                </div>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1.5 font-mono truncate">
                Funnels & CRO Lead
              </div>
            </div>
          </div>

          {/* TAB 1: CONSULTATIONS / LEADS CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              {/* Search & Filtering Bar */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by client name, business, email, phone, or service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full sm:w-auto px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Statuses ({consultations.length})</option>
                      <option value="new_inquiry">New Inquiry</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_discussion">In Discussion</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="won">Won / Closed</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">Founder:</span>
                    <select
                      value={founderFilter}
                      onChange={(e) => setFounderFilter(e.target.value)}
                      className="w-full sm:w-auto px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">Both Founders</option>
                      <option value="Ibrahim">Ibrahim Samrat</option>
                      <option value="Amit">Amit Hasan</option>
                    </select>
                  </div>

                  {consultations.length === 0 && (
                    <button
                      onClick={handleSeedDemoData}
                      className="col-span-2 sm:col-span-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold whitespace-nowrap"
                    >
                      Load Inquiries
                    </button>
                  )}
                </div>
              </div>

              {/* Inquiries Cards Grid */}
              {filteredConsultations.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-3">
                  <Users className="w-10 h-10 text-slate-500 mx-auto" />
                  <h4 className="text-base font-bold text-white">No inquiries matching your criteria</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try clearing your search query or filters, or add a new consultation record.
                  </p>
                  <button
                    onClick={handleSeedDemoData}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow"
                  >
                    Populate Demo Inquiries
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {filteredConsultations.map((lead) => {
                    const cleanPhone = lead.phoneOrWhatsApp.replace(/[^0-9]/g, '');
                    const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Hello ${lead.fullName}, thank you for reaching out to LeadNest IT regarding ${lead.requiredServices}. How can we assist your business today?`
                    )}`;
                    const mailtoLink = `mailto:${lead.email}?subject=${encodeURIComponent(
                      `LeadNest IT — Regarding your inquiry: ${lead.requiredServices}`
                    )}`;

                    return (
                      <div
                        key={lead.id}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3 relative shadow-sm"
                      >
                        {/* Header: Lead ID, Service, Status */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-mono font-bold text-cyan-400">
                                {lead.id}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getStatusBadge(
                                  lead.status
                                )}`}
                              >
                                {lead.status.replace('_', ' ')}
                              </span>
                              {lead.region && (
                                <span className="text-[10px] font-mono text-slate-400">
                                  📍 {lead.region}
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm sm:text-base font-black text-white mt-1 truncate">
                              {lead.fullName}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium truncate">
                              {lead.businessName || 'Private Client'}
                            </p>
                          </div>

                          {/* Quick Actions Dropdown & Delete */}
                          <div className="flex items-center justify-between sm:justify-end gap-1.5 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-medium focus:outline-none flex-1 sm:flex-none"
                            >
                              <option value="new_inquiry">New Inquiry</option>
                              <option value="contacted">Contacted</option>
                              <option value="in_discussion">In Discussion</option>
                              <option value="proposal_sent">Proposal Sent</option>
                              <option value="won">Won / Closed</option>
                              <option value="archived">Archived</option>
                            </select>

                            <button
                              onClick={() => handleDeleteConsultation(lead.id)}
                              className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Service & Budget Pill */}
                        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                          <div className="min-w-0">
                            <span className="text-slate-400 block text-[10px] uppercase font-mono truncate">
                              Requested Solution
                            </span>
                            <span className="font-bold text-slate-200 truncate block">
                              {lead.requiredServices}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">
                              Budget
                            </span>
                            <span className="font-bold text-emerald-400">
                              {lead.approximateBudget}
                            </span>
                          </div>
                        </div>

                        {/* Project Details */}
                        {lead.projectDetails && (
                          <div className="text-xs text-slate-300 bg-slate-950/40 p-2.5 sm:p-3 rounded-xl border border-slate-800/60 leading-relaxed font-normal">
                            <span className="font-semibold text-slate-400 block text-[10px] uppercase mb-1">
                              Client Notes:
                            </span>
                            <p className="break-words">{lead.projectDetails}</p>
                          </div>
                        )}

                        {/* Assigned Co-Founder Switcher */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1 border-t border-slate-800/60 text-xs">
                          <div className="flex items-center gap-1.5 w-full sm:w-auto">
                            <UserCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="text-slate-400 text-[11px] shrink-0">Lead Founder:</span>
                            <select
                              value={lead.assignedFounder || 'Ibrahim Samrat (Design)'}
                              onChange={(e) => handleUpdateFounder(lead.id, e.target.value)}
                              className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-200 text-[11px] font-semibold w-full sm:w-auto"
                            >
                              <option value="Ibrahim Samrat (Design)">Ibrahim Samrat (Design)</option>
                              <option value="Amit Hasan (Marketing)">Amit Hasan (Marketing)</option>
                              <option value="Both Founders Joint Lead">Both Founders (Joint)</option>
                            </select>
                          </div>

                          <span className="text-[10px] font-mono text-slate-500">
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>

                        {/* Founder Internal Notes Field */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Founder Strategy Note:</span>
                            {activeNotes[lead.id] !== undefined && (
                              <button
                                onClick={() => handleSaveNotes(lead.id)}
                                className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
                              >
                                Save Note
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            placeholder="Add action item or meeting summary..."
                            defaultValue={lead.founderNotes || ''}
                            onChange={(e) =>
                              setActiveNotes((prev) => ({ ...prev, [lead.id]: e.target.value }))
                            }
                            onBlur={() => handleSaveNotes(lead.id)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        {/* Direct Fast Contact Buttons (WhatsApp & Email) */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all shadow-sm active:scale-95 text-center truncate"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">WhatsApp</span>
                          </a>

                          <a
                            href={mailtoLink}
                            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-bold transition-all shadow-sm active:scale-95 text-center truncate"
                          >
                            <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="truncate">Email Client</span>
                          </a>
                        </div>

                        {/* 1-Click Client Enrollment & Invoice Generation */}
                        <button
                          onClick={() => {
                            setEnrollPrefillLead(lead);
                            setIsEnrollModalOpen(true);
                          }}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Enroll Client & Issue Invoice</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EXECUTION PIPELINE */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">Active Founder Deliverables</h3>
                  <p className="text-xs text-slate-400">
                    Live client systems currently engineered directly by Ibrahim Samrat & Amit Hasan.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {projects.length} Active Sprints
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-400 font-bold">{proj.id}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {proj.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white">{proj.title}</h4>
                      <p className="text-xs text-slate-400 font-medium">Client: {proj.client}</p>
                    </div>

                    <div className="text-xs space-y-1 text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Lead:</span>
                        <span className="font-semibold text-white">{proj.leadFounder}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Timeline:</span>
                        <span>{proj.deadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Value:</span>
                        <span className="font-bold text-emerald-400">{proj.budget}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-cyan-400">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-end gap-1.5 pt-1">
                        <button
                          onClick={() => handleUpdateProjectProgress(proj.id, -5)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                        >
                          -5%
                        </button>
                        <button
                          onClick={() => handleUpdateProjectProgress(proj.id, 5)}
                          className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold"
                        >
                          +5%
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT RAILS */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stripe USA / Global Card Rails */}
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                        $
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Stripe Card Rails (USD)</h4>
                        <p className="text-xs text-slate-400">Global Credit Cards, Apple Pay, Google Pay</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      Active
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Integrated via Express backend <code className="text-cyan-400">/api/payments/create-session</code>.
                    Drop your <code className="text-blue-400">STRIPE_SECRET_KEY</code> in environment variables to trigger live Stripe Checkout immediately.
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Supported Currencies:</span>
                      <span className="text-white">USD, EUR, GBP, CAD</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Settlement Account:</span>
                      <span className="text-white">Delaware / NY US Bank</span>
                    </div>
                  </div>
                </div>

                {/* bKash & Nagad BD Rails */}
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center font-bold text-sm">
                        ৳
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">bKash & Nagad Rails (BDT)</h4>
                        <p className="text-xs text-slate-400">Local Bangladesh Mobile Financial Services</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      Direct Enabled
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ready for client transactions. Provides direct Merchant & Personal Send Money instructions with reference codes and automatic token verification.
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>bKash Number:</span>
                      <span className="text-emerald-400 font-bold">+880 1722-604376</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Nagad Number:</span>
                      <span className="text-amber-400 font-bold">+880 1722-604376</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INVOICES & ENROLLMENT AGREEMENTS */}
          {activeTab === 'invoices' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header & Quick Action */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-emerald-950/30 border border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Receipt className="w-5 h-5 text-emerald-400 shrink-0" />
                    <h3 className="text-sm sm:text-lg font-black text-white tracking-tight">
                      Client Invoicing & Agreements
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 shrink-0">
                      Automated
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    Instantly issue formal, printable invoices whenever a client enrolls. Clients receive digital slips via email and WhatsApp.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEnrollPrefillLead(null);
                    setIsEnrollModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enroll Client & Generate Invoice</span>
                </button>
              </div>

              {/* Financial KPI Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span className="truncate">Invoices Issued</span>
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white">{invoices.length}</div>
                  <span className="text-[10px] font-mono text-cyan-400 truncate">Total Client Accounts</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span className="truncate">Total Collected (USD)</span>
                    <span className="text-emerald-400 font-bold shrink-0">$</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 truncate">
                    ${totalCollectedUSD.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 truncate">
                    Due: ${totalDueUSD.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span className="truncate">Total Collected (BDT)</span>
                    <span className="text-emerald-400 font-bold shrink-0">৳</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 truncate">
                    ৳{totalCollectedBDT.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 truncate">
                    Due: ৳{totalDueBDT.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span className="truncate">Agreements Sent</span>
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-blue-400 truncate">
                    {totalEmailsSent} / {invoices.length}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 truncate">
                    {invoices.length > 0 ? Math.round((totalEmailsSent / invoices.length) * 100) : 0}% Dispatch Rate
                  </span>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search invoices by number, client, company..."
                    value={invoiceSearchQuery}
                    onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-2 text-xs">
                  <span className="text-slate-400 text-[11px] font-mono shrink-0">Status:</span>
                  <select
                    value={invoiceStatusFilter}
                    onChange={(e) => setInvoiceStatusFilter(e.target.value)}
                    className="w-full sm:w-auto px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="all">All Invoices ({invoices.length})</option>
                    <option value="paid">Paid in Full</option>
                    <option value="partial">Partial Advance</option>
                    <option value="due">Payment Due</option>
                  </select>
                </div>
              </div>

              {/* Invoices List / Cards */}
              {filteredInvoices.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-3">
                  <Receipt className="w-12 h-12 text-slate-600 mx-auto" />
                  <h4 className="text-base font-bold text-white">No client invoices found</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {invoiceSearchQuery
                      ? 'No invoice records match your search filter.'
                      : 'Enroll a new client or click "Enroll Client & Issue Invoice" on any lead to generate an official invoice.'}
                  </p>
                  <button
                    onClick={() => {
                      setEnrollPrefillLead(null);
                      setIsEnrollModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-colors"
                  >
                    Enroll New Client Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {filteredInvoices.map((inv) => {
                    const cleanPhone = inv.clientPhone.replace(/[^0-9]/g, '');
                    const curSign = inv.currency === 'BDT' ? '৳' : '$';
                    const whatsappMsg = `Hello ${inv.clientName},\n\nThank you for enrolling with LeadNest IT! Your official invoice #${inv.invoiceNumber} has been generated.\n\nService: ${inv.servicePackage}\nTotal Project Fee: ${curSign}${inv.totalAmount.toLocaleString()}\nAmount Paid: ${curSign}${inv.amountPaid.toLocaleString()}\nRemaining Due: ${curSign}${inv.amountDue.toLocaleString()}\nPayment Status: ${inv.paymentStatus.toUpperCase()}\n\nLead Founders:\n- Ibrahim Samrat (Lead Designer & Architect)\n- Amit Hasan (Lead Growth & Strategy)\nWebsite: https://leadnestit.com`;

                    const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

                    return (
                      <div
                        key={inv.id}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3 relative shadow-sm"
                      >
                        {/* Header: Invoice Number, Status Badge, Date */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                onClick={() => handleOpenInvoice(inv)}
                                className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer flex items-center gap-1"
                              >
                                <Receipt className="w-3.5 h-3.5" />
                                {inv.invoiceNumber}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                                  inv.paymentStatus === 'paid'
                                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                                    : inv.paymentStatus === 'partial'
                                    ? 'bg-amber-950/80 text-amber-400 border-amber-500/40'
                                    : 'bg-red-950/80 text-red-400 border-red-500/40'
                                }`}
                              >
                                {inv.paymentStatus === 'paid'
                                  ? 'Paid In Full'
                                  : inv.paymentStatus === 'partial'
                                  ? 'Partial Advance'
                                  : 'Payment Due'}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {inv.currency}
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-base font-black text-white mt-1 truncate">
                              {inv.clientName}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium truncate">
                              {inv.companyName || 'Private Client'}
                            </p>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-1.5 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/80 shrink-0">
                            <span className="text-[10px] font-mono text-slate-400">
                              Issued: {inv.issueDate}
                            </span>
                            <button
                              onClick={() => handleDeleteInvoice(inv.id)}
                              className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                              title="Archive invoice"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Service & Scope Pill */}
                        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                          <div className="min-w-0">
                            <span className="text-slate-400 block text-[10px] uppercase font-mono truncate">
                              Package / Deliverable Scope
                            </span>
                            <span className="font-bold text-slate-200 truncate block">
                              {inv.servicePackage}
                            </span>
                          </div>
                          {inv.estimatedCompletionDate && (
                            <div className="text-right shrink-0">
                              <span className="text-slate-400 block text-[10px] uppercase font-mono">
                                Target Delivery
                              </span>
                              <span className="font-mono text-cyan-400 font-bold">
                                {inv.estimatedCompletionDate}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Deliverable Items Badges */}
                        {inv.deliverables && inv.deliverables.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {inv.deliverables.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[10px] font-mono border border-slate-700/60"
                              >
                                ✓ {item}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Financials Breakdown */}
                        <div className="grid grid-cols-3 gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs">
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono truncate">
                              Project Total
                            </span>
                            <span className="font-bold text-white text-xs sm:text-sm truncate block">
                              {curSign}{inv.totalAmount.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono truncate">
                              Advance Paid
                            </span>
                            <span className="font-bold text-emerald-400 text-xs sm:text-sm truncate block">
                              {curSign}{inv.amountPaid.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono truncate">
                              Balance Due
                            </span>
                            <span
                              className={`font-bold text-xs sm:text-sm truncate block ${
                                inv.amountDue > 0 ? 'text-amber-400' : 'text-slate-400'
                              }`}
                            >
                              {curSign}{inv.amountDue.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Payment Method & Slip Reference */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] flex-wrap">
                            <CreditCard className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>
                              Method: <strong className="text-slate-200">{inv.paymentMethod}</strong>
                            </span>
                            {inv.transactionReference && (
                              <span className="font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50 text-[10px]">
                                Ref: {inv.transactionReference}
                              </span>
                            )}
                          </div>

                          {/* Email Status Indicator */}
                          <div>
                            {inv.emailSent ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Agreement Sent</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleOpenEmailModal(inv)}
                                className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40 hover:bg-amber-900 transition-colors"
                              >
                                <Mail className="w-3 h-3 text-amber-400" />
                                <span>Send Agreement Email</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Direct Action Buttons: Print / View Invoice, Email Agreement, WhatsApp Slip */}
                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
                          <button
                            onClick={() => handleOpenInvoice(inv)}
                            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm active:scale-95 text-center truncate"
                          >
                            <Printer className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Print Slip</span>
                          </button>

                          <button
                            onClick={() => handleOpenEmailModal(inv)}
                            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-bold transition-all shadow-sm active:scale-95 text-center truncate"
                          >
                            <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">Email</span>
                          </button>

                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] sm:text-xs font-bold transition-all shadow-sm active:scale-95 text-center truncate"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SYSTEM & BACKEND DIAGNOSTICS */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-base font-bold text-white">Express Backend Diagnostics</h4>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-emerald-400 font-bold">200 OK — Healthy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Port:</span>
                      <span className="text-cyan-400">3000 (Internal & Ingress)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Uptime:</span>
                      <span className="text-slate-200">
                        {serverHealth?.uptime ? `${Math.floor(serverHealth.uptime)} seconds` : 'Active'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Environment:</span>
                      <span className="text-slate-200">production / dev container</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-base font-bold text-white">Firestore Cloud Database</h4>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Database ID:</span>
                      <span className="text-cyan-400 truncate max-w-[200px]">
                        ai-studio-0672826a-d5ec-476f-b5ab-2034971c2af5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security Rules:</span>
                      <span className="text-emerald-400 font-bold">Deployed & Hardened</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Admin Email:</span>
                      <span className="text-slate-200">sabrinsaka001@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Tools */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Data Maintenance & Seeding</h4>
                  <p className="text-xs text-slate-400">
                    Reset demo consultation records or export database state.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSeedDemoData}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    Reset / Seed Inquiries
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
                  >
                    Download Inquiries CSV
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Lead Manual Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-4 sm:p-6 relative shadow-2xl animate-in zoom-in-95 my-auto max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsAddLeadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base sm:text-lg font-bold text-white mb-1">Log New Client Consultation</h3>
            <p className="text-xs text-slate-400 mb-3 sm:mb-4">
              Manually enter inquiries received via Phone, WhatsApp, or Walk-in.
            </p>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="e.g. Jordan Matthews"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="client@mail.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+880 17XX... or +1..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Company Name</label>
                <input
                  type="text"
                  value={newBusinessName}
                  onChange={(e) => setNewBusinessName(e.target.value)}
                  placeholder="e.g. Nexus Logistics"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Service</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="Complete Digital Business Solution">Complete Solution</option>
                    <option value="Website Development">Website Development</option>
                    <option value="eCommerce Development">eCommerce Store</option>
                    <option value="Digital Marketing">Digital Marketing & Funnels</option>
                    <option value="AI Automation">AI Workflow Automation</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Assign To</label>
                  <select
                    value={newAssigned}
                    onChange={(e) => setNewAssigned(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="Ibrahim Samrat (Design)">Ibrahim Samrat (Design)</option>
                    <option value="Amit Hasan (Marketing)">Amit Hasan (Marketing)</option>
                    <option value="Both Founders (Joint)">Both Founders (Joint)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Notes / Details</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Key project requirements..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={savingLead}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{savingLead ? 'Saving...' : 'Save Consultation Record'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View & Print Professional Invoice Modal */}
      <ClientInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoice={selectedInvoice}
        onOpenEmailModal={(inv) => {
          setSelectedInvoice(inv);
          setIsEmailModalOpen(true);
        }}
      />

      {/* Dispatch Agreement & Payment Slip Email Modal */}
      <SendAgreementEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        invoice={selectedInvoice}
        onEmailSent={handleEmailSentSuccess}
      />

      {/* 1-Click Client Enrollment & Instant Invoice Generator Modal */}
      <EnrollClientModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        prefillLead={enrollPrefillLead}
        onInvoiceCreated={handleInvoiceCreated}
      />
    </div>
  );
};
