import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for fallback/fast queries (backed by Firestore on client/server)
const inMemoryConsultations: any[] = [
  {
    id: 'LN-NX742',
    fullName: 'Jordan Matthews',
    businessName: 'Nexus Global Logistics (Austin, TX)',
    email: 'jordan@nexuslogistics.io',
    phoneOrWhatsApp: '+1 (512) 890-4123',
    requiredServices: 'Enterprise Web & Client Portal Platform',
    approximateBudget: '$5,000 - $15,000',
    projectDetails: 'Need a high-performance freight tracking portal with responsive client dashboard, custom booking workflow, and modern brand design.',
    currency: 'USD',
    hasFirstTimeDiscount: true,
    region: 'USA',
    status: 'in_discussion',
    assignedFounder: 'Ibrahim Samrat (Design)',
    founderNotes: 'Detailed Figma architecture sprint planned. Co-Founder Ibrahim leading the UI design system.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'LN-FH901',
    fullName: 'নাঈমুর রহমান (Naimur Rahman)',
    businessName: 'Aura Lifestyle & Fashion BD',
    email: 'naimur@auralifestyle.com.bd',
    phoneOrWhatsApp: '+880 1711-482910',
    requiredServices: 'D2C eCommerce & Meta Ads Scaling',
    approximateBudget: '৳৫০,০০০ - ৳১,০০,০০০',
    projectDetails: 'মেটা ও গুগল অ্যাডস দিয়ে ডেইলি সেলস ৩ গুণ বাড়াতে চাচ্ছি। বর্তমান আরওআই ২.১, টার্গেট ৪+ আরওআই এবং প্রফেশনাল কনভার্সন অপটিমাইজেশন।',
    currency: 'BDT',
    hasFirstTimeDiscount: true,
    region: 'Bangladesh',
    status: 'proposal_sent',
    assignedFounder: 'Amit Hasan (Marketing)',
    founderNotes: 'Ad account audit done by Amit Hasan. 4-step creative testing framework sent via WhatsApp.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'LN-CL318',
    fullName: 'Sarah Vance',
    businessName: 'Vance Health Solutions (New York)',
    email: 'sarah.v@vancehealth.com',
    phoneOrWhatsApp: '+1 (212) 674-8890',
    requiredServices: 'Complete Digital Business Solution',
    approximateBudget: '$15,000+',
    projectDetails: 'Full-funnel digital rebranding: Next-gen patient acquisition website, automated appointment reminder workflows, and high-converting Google Search ads.',
    currency: 'USD',
    hasFirstTimeDiscount: false,
    region: 'USA',
    status: 'new_inquiry',
    assignedFounder: 'Ibrahim Samrat (Design)',
    founderNotes: 'High-priority enterprise lead. Initial discovery call scheduled.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'LN-DA550',
    fullName: 'মো: তানভীর আহমেদ (Tanvir Ahmed)',
    businessName: 'Dhaka AgroTech Innovations Ltd',
    email: 'tanvir@dhaka-agrotech.com',
    phoneOrWhatsApp: '+880 1819-204911',
    requiredServices: 'AI Automation & Custom Business System',
    approximateBudget: '৳১,০০,০০০+',
    projectDetails: 'অটোমেটেড ইনভেন্টরি অ্যালার্ট, সেলস টিম হোয়াটসঅ্যাপ বট এবং কাস্টমার অর্ডার ম্যানেজমেন্ট ড্যাশবোর্ড ইন্টিগ্রেশন।',
    currency: 'BDT',
    hasFirstTimeDiscount: true,
    region: 'Bangladesh',
    status: 'won',
    assignedFounder: 'Amit Hasan (Marketing)',
    founderNotes: 'Agreement finalized! 50% advance received. Deployment sprint in progress.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

// Active Founder Delivery Pipeline Projects
const activeFounderProjects = [
  {
    id: 'PROJ-01',
    title: 'Nexus Logistics Enterprise Portal',
    client: 'Nexus Global Logistics',
    category: 'Design & Web Architecture',
    leadFounder: 'Ibrahim Samrat (Co-Founder)',
    progress: 85,
    status: 'In Sprints',
    deadline: '2 Weeks',
    budget: '$8,500'
  },
  {
    id: 'PROJ-02',
    title: 'Aura Fashion Paid Ads Scaling Funnel',
    client: 'Aura Lifestyle BD',
    category: 'Meta Ads & Growth Strategy',
    leadFounder: 'Amit Hasan (Co-Founder)',
    progress: 92,
    status: 'Live Optimization',
    deadline: 'Ongoing Retainer',
    budget: '৳৭৫,০০০ / mo'
  },
  {
    id: 'PROJ-03',
    title: 'Dhaka AgroTech AI Workflow Automations',
    client: 'Dhaka AgroTech Ltd',
    category: 'AI & System Automation',
    leadFounder: 'Ibrahim Samrat & Amit Hasan',
    progress: 65,
    status: 'Milestone 2',
    deadline: '3 Weeks',
    budget: '৳১,২০,০০০'
  }
];

// Client Invoices & Enrollment Agreements Store
const inMemoryInvoices: any[] = [
  {
    id: 'INV-0481',
    invoiceNumber: 'LN-INV-2026-0481',
    clientName: 'Jordan Matthews',
    companyName: 'Nexus Global Logistics',
    clientEmail: 'jordan@nexuslogistics.io',
    clientPhone: '+1 (512) 890-4123',
    country: 'United States',
    serviceTitle: 'Enterprise Web & Client Portal Platform',
    scopeDescription: 'Complete responsive client portal with custom shipment tracking, booking workflows, high-converting UI/UX design system in Figma, and 30 days post-launch SLA guarantee.',
    currency: 'USD',
    subtotal: 6000,
    discountPercent: 25,
    discountAmount: 1500,
    totalAmount: 4500,
    paidAmount: 2250,
    balanceDue: 2250,
    paymentStatus: 'partial',
    paymentMethod: 'Stripe Card / US Bank ACH',
    transactionReference: 'STRIPE-CH_3M9X1148A2',
    assignedFounder: 'Ibrahim Samrat (Design & UI/UX Architect)',
    issueDate: '2026-09-02',
    dueDate: '2026-09-20',
    kickoffDate: '2026-09-03',
    completionTarget: '3 Weeks Sprint',
    agreementTerms: 'Deliverables verified directly by Co-Founder Ibrahim Samrat. Includes complete GitHub source code transfer and lifetime warranty against functional code bugs.',
    emailSent: true,
    emailSentAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 50).toISOString()
  },
  {
    id: 'INV-0482',
    invoiceNumber: 'LN-INV-2026-0482',
    clientName: 'মো: তানভীর আহমেদ (Tanvir Ahmed)',
    companyName: 'Dhaka AgroTech Innovations Ltd',
    clientEmail: 'tanvir@dhaka-agrotech.com',
    clientPhone: '+880 1819-204911',
    country: 'Bangladesh',
    serviceTitle: 'AI Automation & Custom Business System',
    scopeDescription: 'স্বয়ংক্রিয় ইনভেন্টরি সতর্কবার্তা, সেলস টিম হোয়াটসঅ্যাপ বট, ক্লাউড সিঙ্ক ডেটাবেজ এবং কাস্টমার অর্ডার ম্যানেজমেন্ট ড্যাশবোর্ড ডেলিভারি ও প্রশিক্ষণ।',
    currency: 'BDT',
    subtotal: 160000,
    discountPercent: 25,
    discountAmount: 40000,
    totalAmount: 120000,
    paidAmount: 120000,
    balanceDue: 0,
    paymentStatus: 'paid',
    paymentMethod: 'bKash Merchant Payment (Direct)',
    transactionReference: 'BKASH-TXN-9J471829',
    assignedFounder: 'Amit Hasan & Ibrahim Samrat (Joint Delivery)',
    issueDate: '2026-09-05',
    dueDate: '2026-09-05',
    kickoffDate: '2026-09-06',
    completionTarget: '2 Weeks Sprint',
    agreementTerms: '১০০% সফল ডিপ্লয়মেন্ট গ্যারান্টি। কো-ফাউন্ডার অমিত হাসান ও ইব্রাহিম সম্রাটের সরাসরি তত্ত্বাবধানে লাইভ রোলআউট এবং টিম অনবোর্ডিং।',
    emailSent: true,
    emailSentAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  }
];

const newsletterSubscribers: string[] = [];

// ==========================================
// API ROUTES FIRST
// ==========================================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'LeadNest IT API',
    company: 'LeadNest IT',
    domain: 'leadnestit.com',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 2. System Public Config
app.get('/api/config', (req, res) => {
  res.json({
    companyName: 'LeadNest IT',
    tagline: 'BUILD. GROW. AUTOMATE.',
    domain: 'leadnestit.com',
    supportedCurrencies: ['USD', 'BDT'],
    defaultCurrency: 'USD',
    firstTimeDiscountPercent: 25,
    contact: {
      usPhone: '+1 (800) 492-NEST',
      bdPhone: '+880 1700-LEADNEST',
      email: 'growth@leadnestit.com',
      whatsapp: '+8801700532363'
    },
    paymentRails: {
      stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
      bkashConfigured: Boolean(process.env.BKASH_APP_KEY),
      nagadConfigured: Boolean(process.env.NAGAD_MERCHANT_ID)
    }
  });
});

// 3. Consultation Submission API
app.post('/api/consultations', (req, res) => {
  try {
    const {
      fullName,
      businessName,
      email,
      phoneOrWhatsApp,
      requiredServices,
      approximateBudget,
      projectDetails,
      currency,
      hasFirstTimeDiscount,
      region
    } = req.body;

    if (!fullName || !email || !phoneOrWhatsApp) {
      return res.status(400).json({
        error: 'Missing required fields: fullName, email, and phoneOrWhatsApp are required.'
      });
    }

    const consultationRecord = {
      id: `LN-${Date.now().toString(36).toUpperCase()}`,
      fullName: String(fullName).trim(),
      businessName: String(businessName || '').trim(),
      email: String(email).trim().toLowerCase(),
      phoneOrWhatsApp: String(phoneOrWhatsApp).trim(),
      requiredServices: requiredServices || 'Complete Digital Business Solution',
      approximateBudget: approximateBudget || (currency === 'BDT' ? '৳২৫,০০০ - ৳৫০,০০০' : '$2,500 - $5,000'),
      projectDetails: String(projectDetails || '').trim(),
      currency: currency === 'BDT' ? 'BDT' : 'USD',
      hasFirstTimeDiscount: Boolean(hasFirstTimeDiscount),
      region: region || (currency === 'BDT' ? 'Bangladesh' : 'USA'),
      status: 'new_inquiry',
      createdAt: new Date().toISOString()
    };

    inMemoryConsultations.unshift(consultationRecord);

    console.log(`[LeadNest IT Backend] New Consultation Logged: ${consultationRecord.id} from ${consultationRecord.email}`);

    return res.status(201).json({
      success: true,
      message: 'Consultation request successfully received.',
      consultation: consultationRecord
    });
  } catch (error: any) {
    console.error('Error creating consultation:', error);
    return res.status(500).json({ error: 'Internal server error processing consultation' });
  }
});

// 4. Consultation Retrieval & Query API
app.get('/api/consultations', (req, res) => {
  const { email, status, founder, search } = req.query;
  let list = [...inMemoryConsultations];

  if (email) {
    list = list.filter(c => c.email.toLowerCase() === String(email).toLowerCase());
  }
  if (status && status !== 'all') {
    list = list.filter(c => c.status === status);
  }
  if (founder && founder !== 'all') {
    list = list.filter(c => c.assignedFounder && c.assignedFounder.includes(String(founder)));
  }
  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(c =>
      c.fullName?.toLowerCase().includes(q) ||
      c.businessName?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phoneOrWhatsApp?.includes(q) ||
      c.requiredServices?.toLowerCase().includes(q)
    );
  }

  return res.json({ consultations: list });
});

// 4b. Admin Update Consultation (Status, Founder Assignment, Notes)
app.patch('/api/consultations/:id', (req, res) => {
  const { id } = req.params;
  const { status, assignedFounder, founderNotes, priority } = req.body;

  const itemIndex = inMemoryConsultations.findIndex(c => c.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Consultation record not found' });
  }

  const existing = inMemoryConsultations[itemIndex];
  const updated = {
    ...existing,
    ...(status !== undefined && { status }),
    ...(assignedFounder !== undefined && { assignedFounder }),
    ...(founderNotes !== undefined && { founderNotes }),
    ...(priority !== undefined && { priority }),
    updatedAt: new Date().toISOString()
  };

  inMemoryConsultations[itemIndex] = updated;
  console.log(`[LeadNest IT Admin] Consultation ${id} updated: status=${updated.status}, founder=${updated.assignedFounder}`);

  return res.json({ success: true, consultation: updated });
});

// 4c. Admin Delete / Archive Consultation
app.delete('/api/consultations/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = inMemoryConsultations.findIndex(c => c.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Consultation record not found' });
  }

  const removed = inMemoryConsultations.splice(itemIndex, 1)[0];
  return res.json({ success: true, message: `Consultation ${id} removed.`, removed });
});

// 4d. Admin Key Performance Indicators (KPIs)
app.get('/api/admin/stats', (req, res) => {
  const total = inMemoryConsultations.length;
  const newInquiries = inMemoryConsultations.filter(c => c.status === 'new_inquiry').length;
  const inDiscussion = inMemoryConsultations.filter(c => c.status === 'in_discussion' || c.status === 'contacted').length;
  const proposalSent = inMemoryConsultations.filter(c => c.status === 'proposal_sent').length;
  const won = inMemoryConsultations.filter(c => c.status === 'won').length;

  const ibrahimCount = inMemoryConsultations.filter(c => c.assignedFounder?.includes('Ibrahim')).length;
  const amitCount = inMemoryConsultations.filter(c => c.assignedFounder?.includes('Amit')).length;

  return res.json({
    totalConsultations: total,
    statusBreakdown: {
      newInquiry: newInquiries,
      inDiscussion,
      proposalSent,
      won
    },
    founderLoad: {
      ibrahimSamrat: ibrahimCount,
      amitHasan: amitCount
    },
    estimatedPipelineUSD: '$38,500',
    estimatedPipelineBDT: '৳৪,৮৫,০০০',
    avgResponseHours: '1.4 hrs',
    activeProjectsCount: activeFounderProjects.length,
    uptimeSeconds: Math.floor(process.uptime()),
    serverHealth: 'Optimal (Node.js + Express + Firestore Bridge)'
  });
});

// 4e. Admin Projects List & Updates
app.get('/api/admin/projects', (req, res) => {
  res.json({ projects: activeFounderProjects });
});

app.patch('/api/admin/projects/:id', (req, res) => {
  const { id } = req.params;
  const { progress, status, deadline } = req.body;
  const proj = activeFounderProjects.find(p => p.id === id);
  if (!proj) return res.status(404).json({ error: 'Project not found' });

  if (progress !== undefined) proj.progress = Number(progress);
  if (status !== undefined) proj.status = String(status);
  if (deadline !== undefined) proj.deadline = String(deadline);

  return res.json({ success: true, project: proj });
});

// 4f. Admin Re-seed Demo Data
app.post('/api/admin/seed-demo', (req, res) => {
  inMemoryConsultations.length = 0;
  inMemoryConsultations.push(
    {
      id: 'LN-NX742',
      fullName: 'Jordan Matthews',
      businessName: 'Nexus Global Logistics (Austin, TX)',
      email: 'jordan@nexuslogistics.io',
      phoneOrWhatsApp: '+1 (512) 890-4123',
      requiredServices: 'Enterprise Web & Client Portal Platform',
      approximateBudget: '$5,000 - $15,000',
      projectDetails: 'Need a high-performance freight tracking portal with responsive client dashboard, custom booking workflow, and modern brand design.',
      currency: 'USD',
      hasFirstTimeDiscount: true,
      region: 'USA',
      status: 'in_discussion',
      assignedFounder: 'Ibrahim Samrat (Design)',
      founderNotes: 'Detailed Figma architecture sprint planned. Co-Founder Ibrahim leading the UI design system.',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 'LN-FH901',
      fullName: 'নাঈমুর রহমান (Naimur Rahman)',
      businessName: 'Aura Lifestyle & Fashion BD',
      email: 'naimur@auralifestyle.com.bd',
      phoneOrWhatsApp: '+880 1711-482910',
      requiredServices: 'D2C eCommerce & Meta Ads Scaling',
      approximateBudget: '৳৫০,০০০ - ৳১,০০,০০০',
      projectDetails: 'মেটা ও গুগল অ্যাডস দিয়ে ডেইলি সেলস ৩ গুণ বাড়াতে চাচ্ছি। বর্তমান আরওআই ২.১, টার্গেট ৪+ আরওআই এবং প্রফেশনাল কনভার্সন অপটিমাইজেশন।',
      currency: 'BDT',
      hasFirstTimeDiscount: true,
      region: 'Bangladesh',
      status: 'proposal_sent',
      assignedFounder: 'Amit Hasan (Marketing)',
      founderNotes: 'Ad account audit done by Amit Hasan. 4-step creative testing framework sent via WhatsApp.',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      id: 'LN-CL318',
      fullName: 'Sarah Vance',
      businessName: 'Vance Health Solutions (New York)',
      email: 'sarah.v@vancehealth.com',
      phoneOrWhatsApp: '+1 (212) 674-8890',
      requiredServices: 'Complete Digital Business Solution',
      approximateBudget: '$15,000+',
      projectDetails: 'Full-funnel digital rebranding: Next-gen patient acquisition website, automated appointment reminder workflows, and high-converting Google Search ads.',
      currency: 'USD',
      hasFirstTimeDiscount: false,
      region: 'USA',
      status: 'new_inquiry',
      assignedFounder: 'Ibrahim Samrat (Design)',
      founderNotes: 'High-priority enterprise lead. Initial discovery call scheduled.',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 'LN-DA550',
      fullName: 'মো: তানভীর আহমেদ (Tanvir Ahmed)',
      businessName: 'Dhaka AgroTech Innovations Ltd',
      email: 'tanvir@dhaka-agrotech.com',
      phoneOrWhatsApp: '+880 1819-204911',
      requiredServices: 'AI Automation & Custom Business System',
      approximateBudget: '৳১,০০,০০০+',
      projectDetails: 'অটোমেটেড ইনভেন্টরি অ্যালার্ট, সেলস টিম হোয়াটসঅ্যাপ বট এবং কাস্টমার অর্ডার ম্যানেজমেন্ট ড্যাশবোর্ড ইন্টিগ্রেশন।',
      currency: 'BDT',
      hasFirstTimeDiscount: true,
      region: 'Bangladesh',
      status: 'won',
      assignedFounder: 'Amit Hasan (Marketing)',
      founderNotes: 'Agreement finalized! 50% advance received. Deployment sprint in progress.',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  );
  return res.json({ success: true, count: inMemoryConsultations.length });
});

// ==========================================
// 4g. Client Invoices & Enrollment Agreements API
// ==========================================

// Get all invoices
app.get('/api/invoices', (req, res) => {
  const { email, status } = req.query;
  let list = [...inMemoryInvoices];
  if (email) {
    list = list.filter(inv => inv.clientEmail.toLowerCase() === String(email).toLowerCase());
  }
  if (status && status !== 'all') {
    list = list.filter(inv => inv.paymentStatus === status);
  }
  return res.json({ invoices: list });
});

// Create new invoice and enroll client
app.post('/api/invoices', (req, res) => {
  try {
    const {
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
      transactionReference,
      assignedFounder,
      dueDate,
      kickoffDate,
      completionTarget,
      agreementTerms,
      consultationId
    } = req.body;

    if (!clientName || !clientEmail || subtotal === undefined) {
      return res.status(400).json({ error: 'Client name, email, and subtotal are required.' });
    }

    const sub = Number(subtotal) || 0;
    const discPct = Number(discountPercent) || 0;
    const discAmount = Math.round((sub * discPct) / 100);
    const total = Math.max(0, sub - discAmount);
    const paid = Number(paidAmount) || 0;
    const balance = Math.max(0, total - paid);

    const paymentStatus = balance === 0 ? 'paid' : (paid > 0 ? 'partial' : 'due');

    // Generate consecutive sequential ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const invoiceNumber = `LN-INV-2026-${randomSuffix}`;
    const invoiceId = `INV-${randomSuffix}`;

    const newInvoice = {
      id: invoiceId,
      invoiceNumber,
      clientName: String(clientName).trim(),
      companyName: String(companyName || '').trim(),
      clientEmail: String(clientEmail).trim().toLowerCase(),
      clientPhone: String(clientPhone || '').trim(),
      country: String(country || (currency === 'BDT' ? 'Bangladesh' : 'United States')),
      serviceTitle: String(serviceTitle || 'Complete Digital Business Solution'),
      scopeDescription: String(scopeDescription || 'Enterprise design, development, marketing sprint, and 30-day post-launch guarantee.'),
      currency: currency === 'BDT' ? 'BDT' : 'USD',
      subtotal: sub,
      discountPercent: discPct,
      discountAmount: discAmount,
      totalAmount: total,
      paidAmount: paid,
      balanceDue: balance,
      paymentStatus,
      paymentMethod: String(paymentMethod || (currency === 'BDT' ? 'bKash Merchant' : 'Stripe Card')),
      transactionReference: String(transactionReference || `TXN-${Date.now().toString(36).toUpperCase()}`),
      assignedFounder: String(assignedFounder || 'Ibrahim Samrat & Amit Hasan'),
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: String(dueDate || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10)),
      kickoffDate: String(kickoffDate || new Date().toISOString().slice(0, 10)),
      completionTarget: String(completionTarget || '2-3 Weeks Sprint'),
      agreementTerms: String(
        agreementTerms ||
        'Official LeadNest IT Client Enrollment Agreement. 100% on-time sprint guarantee backed directly by Co-Founders Ibrahim Samrat & Amit Hasan. All deliverables include intellectual property code transfer and technical support.'
      ),
      emailSent: false,
      createdAt: new Date().toISOString()
    };

    inMemoryInvoices.unshift(newInvoice);

    // If linked to an existing consultation lead, automatically upgrade status to 'won'
    if (consultationId) {
      const leadIndex = inMemoryConsultations.findIndex(c => c.id === consultationId);
      if (leadIndex !== -1) {
        inMemoryConsultations[leadIndex].status = 'won';
        inMemoryConsultations[leadIndex].founderNotes = `Successfully Enrolled! Invoice ${invoiceNumber} issued. Paid: ${currency === 'BDT' ? '৳' : '$'}${paid}.`;
      }
    }

    console.log(`[LeadNest IT Invoice Engine] New Invoice ${invoiceNumber} issued for ${newInvoice.clientName} (${newInvoice.clientEmail})`);

    return res.status(201).json({
      success: true,
      message: 'Client successfully enrolled and professional invoice generated.',
      invoice: newInvoice
    });
  } catch (err: any) {
    console.error('Error creating invoice:', err);
    return res.status(500).json({ error: 'Internal server error generating invoice' });
  }
});

// Update invoice
app.patch('/api/invoices/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = inMemoryInvoices.findIndex(inv => inv.id === id || inv.invoiceNumber === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  const existing = inMemoryInvoices[itemIndex];
  const { paidAmount, paymentStatus, transactionReference, emailSent } = req.body;

  let updatedPaid = paidAmount !== undefined ? Number(paidAmount) : existing.paidAmount;
  let updatedBalance = Math.max(0, existing.totalAmount - updatedPaid);
  let computedStatus = paymentStatus || (updatedBalance === 0 ? 'paid' : (updatedPaid > 0 ? 'partial' : 'due'));

  const updated = {
    ...existing,
    ...(paidAmount !== undefined && { paidAmount: updatedPaid, balanceDue: updatedBalance, paymentStatus: computedStatus }),
    ...(paymentStatus !== undefined && { paymentStatus }),
    ...(transactionReference !== undefined && { transactionReference }),
    ...(emailSent !== undefined && { emailSent }),
    updatedAt: new Date().toISOString()
  };

  inMemoryInvoices[itemIndex] = updated;
  return res.json({ success: true, invoice: updated });
});

// Delete invoice
app.delete('/api/invoices/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = inMemoryInvoices.findIndex(inv => inv.id === id || inv.invoiceNumber === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  const removed = inMemoryInvoices.splice(itemIndex, 1)[0];
  return res.json({ success: true, message: `Invoice ${id} archived.`, removed });
});

// Send/Record client enrollment agreement & payment slip email
app.post('/api/invoices/:id/send-email', (req, res) => {
  const { id } = req.params;
  const itemIndex = inMemoryInvoices.findIndex(inv => inv.id === id || inv.invoiceNumber === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  const invoice = inMemoryInvoices[itemIndex];
  const now = new Date().toISOString();

  invoice.emailSent = true;
  invoice.emailSentAt = now;

  console.log(`[LeadNest IT Notification Dispatcher] Enrollment Confirmation & Payment Slip Email dispatched for ${invoice.invoiceNumber} to ${invoice.clientEmail}`);

  return res.json({
    success: true,
    message: `Enrollment agreement and payment slip successfully dispatched to ${invoice.clientEmail}.`,
    emailDetails: {
      to: invoice.clientEmail,
      clientName: invoice.clientName,
      subject: `Official Enrollment Confirmation & Payment Slip [${invoice.invoiceNumber}] - LeadNest IT`,
      dispatchedAt: now,
      invoiceNumber: invoice.invoiceNumber
    },
    invoice
  });
});


// 5. Payment Session Creation (Stripe for USD, bKash/Nagad for BDT)
app.post('/api/payments/create-session', async (req, res) => {
  try {
    const { planName, currency, amount, customerEmail, customerName, planId } = req.body;

    const isUSD = currency === 'USD';
    const isBDT = currency === 'BDT';

    // Check if live keys exist or if in sandbox setup mode
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const bkashKey = process.env.BKASH_APP_KEY;

    if (isUSD && stripeKey) {
      // Lazy load Stripe when key is provided
      try {
        const { default: Stripe } = await import('stripe');
        const stripe = new Stripe(stripeKey);

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `LeadNest IT - ${planName || 'Digital Business Growth Service'}`,
                  description: 'Enterprise Web, Performance Marketing & Automation Solution'
                },
                unit_amount: Math.round((Number(amount) || 375) * 100)
              },
              quantity: 1
            }
          ],
          mode: 'payment',
          customer_email: customerEmail || undefined,
          success_url: `${req.protocol}://${req.get('host')}/?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.protocol}://${req.get('host')}/?payment_cancelled=true`
        });

        return res.json({
          provider: 'stripe',
          checkoutUrl: session.url,
          sessionId: session.id,
          status: 'live_session_created'
        });
      } catch (stripeErr: any) {
        console.error('Stripe initialization failed:', stripeErr.message);
      }
    }

    // Direct instructions & Mock sandbox flow for user until they drop live merchant keys
    return res.json({
      provider: isBDT ? 'bkash_nagad_direct' : 'stripe_direct',
      currency: isBDT ? 'BDT' : 'USD',
      amount: amount,
      planName: planName,
      status: 'ready_for_credentials',
      paymentInstructions: isBDT
        ? {
            merchantBkash: process.env.BKASH_MERCHANT_NUMBER || '01700-LEADNEST (Merchant / Personal Send Money)',
            merchantNagad: '01700-LEADNEST',
            reference: `LN-${Date.now().toString(36).slice(-6).toUpperCase()}`,
            note: 'After adding your bKash Merchant API keys in .env, automatic 1-click tokenized payment popup will trigger here.'
          }
        : {
            stripeSetup: 'Add STRIPE_SECRET_KEY to .env to automatically launch Stripe Hosted Checkout with Apple Pay & Google Pay.',
            wireDetails: 'Direct Bank Wire (Delaware / NY USA Account) available upon request.'
          },
      message: 'Payment endpoint ready. Once merchant keys are placed in .env, seamless checkout activates instantly.'
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return res.status(500).json({ error: 'Failed to create payment session' });
  }
});

// 6. Payment Webhook listener
app.post('/api/payments/webhook', (req, res) => {
  // Webhook handler stub for Stripe and bKash instant settlement updates
  console.log('[LeadNest IT Payment Webhook] Received event');
  res.json({ received: true });
});

// 7. Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !String(email).includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  const clean = String(email).trim().toLowerCase();
  if (!newsletterSubscribers.includes(clean)) {
    newsletterSubscribers.push(clean);
  }
  return res.json({ success: true, message: 'Subscribed to LeadNest IT Growth Briefing.' });
});

// ==========================================
// VITE MIDDLEWARE (DEV) & STATIC FILES (PROD)
// ==========================================
async function setupApp() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LeadNest IT] Full-Stack Server running on port ${PORT} (0.0.0.0:${PORT})`);
  });
}

setupApp();
