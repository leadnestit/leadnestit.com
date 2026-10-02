export type Currency = 'USD' | 'BDT';

export interface CountryLanguage {
  code: string;
  country: string;
  language: string;
  nativeName: string;
  flag: string;
  phonePrefix: string;
  currency: Currency;
}

export interface ConsultationData {
  id?: string;
  fullName: string;
  businessName: string;
  email: string;
  phoneOrWhatsApp: string;
  businessType: string;
  currentWebsite: string;
  requiredServices: string;
  approximateBudget: string;
  projectDetails: string;
  currency?: Currency;
  hasFirstTimeDiscount?: boolean;
  region?: 'USA' | 'Bangladesh' | 'Global';
  createdAt?: string;
  userId?: string;
  status?: 'pending' | 'reviewed' | 'contacted';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  pillar: 'BUILD' | 'GROW' | 'AUTOMATE' | 'SUPPORT';
  highlights: string[];
}

export interface CaseStudyItem {
  id: string;
  clientIndustry: string;
  challenge: string;
  solution: string;
  servicesUsed: string[];
  verifiedResult: string;
  clientTestimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
  category?: 'eCommerce' | 'B2B & Enterprise' | 'Healthcare' | 'Subscription & D2C' | string;
  clientName?: string;
  industryTag?: string;
  statHighlight?: {
    value: string;
    label: string;
    changeType?: 'increase' | 'decrease' | 'neutral';
  };
  secondaryStats?: Array<{
    value: string;
    label: string;
  }>;
  auditPeriod?: string;
  deliverables?: string[];
  architectureHighlights?: string[];
  beforeMetrics?: string[];
  afterMetrics?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  targetAudience: string;
  features: string[];
  badge?: string;
  isPopular?: boolean;
  pricing: {
    USD: {
      regular: number;
      discounted: number;
      displayRegular: string;
      displayDiscounted: string;
      period: string;
      comparisonNote?: string;
    };
    BDT: {
      regular: number;
      discounted: number;
      displayRegular: string;
      displayDiscounted: string;
      period: string;
      comparisonNote: string;
    };
  };
}

export interface ClientInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  companyName: string;
  clientEmail: string;
  clientPhone: string;
  country: string;
  serviceTitle: string;
  scopeDescription: string;
  currency: Currency;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  paymentStatus: 'paid' | 'partial' | 'due';
  paymentMethod: string;
  transactionReference: string;
  assignedFounder: string;
  issueDate: string;
  dueDate: string;
  kickoffDate: string;
  completionTarget: string;
  agreementTerms: string;
  emailSent: boolean;
  emailSentAt?: string;
  createdAt: string;
}

export type InsightCategory =
  | 'Paid Advertising'
  | 'Creative & Video'
  | 'Websites & eCommerce'
  | 'AI Customer Support & Automation'
  | 'Growth Strategy';

export interface BlogPost {
  id: string;
  title: string;
  titleBn?: string;
  slug: string;
  excerpt: string;
  excerptBn?: string;
  category: InsightCategory;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  content: {
    intro: string;
    takeaways: string[];
    sections: {
      heading: string;
      body: string;
      quote?: string;
    }[];
    conclusion: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  nameBn?: string;
  role: string;
  roleBn?: string;
  department: 'Leadership' | 'Design & UX' | 'Performance Marketing' | 'Web & eCommerce' | 'Creative & Video' | 'AI & Automation';
  departmentBn?: string;
  isFounder: boolean;
  avatarUrl?: string;
  coverUrl?: string;
  status: 'active' | 'hiring';
  headline: string;
  headlineBn?: string;
  location: string;
  experience: string;
  experienceBn?: string;
  bio: string;
  bioBn?: string;
  skills: string[];
  email: string;
  phone?: string;
  whatsappNumber?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  connectionsCount?: string;
  coreSpecialty?: string;
  coreSpecialtyBn?: string;
  portfolioUrl?: string;
  portfolioLabel?: string;
  portfolioLabelBn?: string;
}

