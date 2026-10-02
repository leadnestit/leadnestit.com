import { CaseStudyItem, FAQItem, PricingPlan, ServiceItem } from '../types';

export const PILLARS_DATA = [
  {
    id: 'build',
    name: 'BUILD',
    headline: 'Create a powerful digital foundation.',
    description: 'We engineer high-performance web platforms, eCommerce systems, and scalable brand architectures built specifically to convert cold visitors into high-intent buyers.',
    services: [
      'Websites & eCommerce',
      'Landing Pages',
      'Brand & Visual Assets'
    ],
    ctaText: 'Build With Us',
    accentColor: 'from-blue-600 to-cyan-500',
    borderColor: 'border-blue-500/30'
  },
  {
    id: 'grow',
    name: 'GROW',
    headline: 'Turn attention into customers and customers into revenue.',
    description: 'Stop burning cash on clicks that do not convert. We deploy multi-channel acquisition funnels, targeted search, and algorithmic ad strategies that fuel sustainable growth.',
    services: [
      'Paid Advertising (Meta & Google)',
      'Campaign Creative & Video',
      'Conversion Optimization'
    ],
    ctaText: 'Grow With Us',
    accentColor: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/30'
  },
  {
    id: 'automate',
    name: 'AUTOMATE',
    headline: 'Use AI and automation to reduce repetitive work and scale efficiently.',
    description: 'Replace manual data entry, slow lead response times, and repetitive customer support with intelligent 24/7 AI agents and frictionless workflow pipelines.',
    services: [
      'AI Customer Support',
      'Instant Lead Qualification',
      'CRM & Messaging Automation'
    ],
    ctaText: 'Automate With Us',
    accentColor: 'from-blue-500 to-indigo-600',
    borderColor: 'border-indigo-500/30'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'paid-advertising',
    title: 'Paid Advertising',
    shortDescription: 'Data-driven Meta and Google ad campaigns built to acquire high-intent customers profitably.',
    fullDescription: 'Specialist-led media buying across Meta (Facebook & Instagram) and Google Ads. We design full-funnel acquisition architectures, test creative hooks continuously, and optimize for cost-per-acquisition and real revenue ROAS.',
    iconName: 'Megaphone',
    pillar: 'GROW',
    highlights: ['Meta & Google Ads media buying', 'High-intent audience targeting', 'Continuous ROAS & conversion scaling']
  },
  {
    id: 'creative-video',
    title: 'Creative & Video',
    shortDescription: 'Scroll-stopping direct-response video ads, visual creative packs, and brand identity assets.',
    fullDescription: 'Backed by 7+ years of dedicated creative production experience. We produce short-form video ads, motion graphics, carousel assets, and high-trust visual branding that elevate click-through rates and slash customer acquisition costs.',
    iconName: 'Palette',
    pillar: 'GROW',
    highlights: ['Direct-response video ads', 'Creative testing packs & UGC hooks', 'Brand & visual design systems']
  },
  {
    id: 'websites-ecommerce',
    title: 'Websites & eCommerce',
    shortDescription: 'High-speed, conversion-focused websites and modern eCommerce storefronts that turn clicks into buyers.',
    fullDescription: 'Engineered with cutting-edge web architecture (React / Next.js) and headless/Shopify foundations. Built for sub-second load times, friction-free checkout flows, and frictionless mobile conversion.',
    iconName: 'ShoppingBag',
    pillar: 'BUILD',
    highlights: ['Conversion-optimized UX & speed', 'Modern eCommerce & Shopify setups', 'Frictionless checkout & mobile funnels']
  },
  {
    id: 'ai-customer-support-automation',
    title: 'AI Customer Support & Automation',
    shortDescription: '24/7 intelligent AI customer support, instant lead qualification, and WhatsApp/CRM automation.',
    fullDescription: 'Eliminate lead response lag and support bottlenecks. We deploy intelligent 24/7 AI agents that answer inquiries instantly, screen high-value prospects, schedule meetings, and trigger automated WhatsApp, email, and CRM workflows.',
    iconName: 'Bot',
    pillar: 'AUTOMATE',
    highlights: ['24/7 AI customer support agents', 'Instant lead qualification & routing', 'WhatsApp, email & CRM automation']
  }
];

export const MARKETING_FUNNEL_STEPS = [
  { step: '01', title: 'AWARENESS', desc: 'Targeted ads, organic search, and brand touchpoints introduce your solution to qualified prospects.' },
  { step: '02', title: 'ENGAGEMENT', desc: 'Compelling content, interactive demos, and value propositions hold their attention.' },
  { step: '03', title: 'LEAD', desc: 'Visitors exchange contact information for high-value resources, evaluations, or audits.' },
  { step: '04', title: 'QUALIFICATION', desc: 'Automated questionnaires and scoring ensure your team only speaks with ready-to-buy prospects.' },
  { step: '05', title: 'SALE', desc: 'Seamless booking, frictionless checkout, and decisive value presentation close deals.' },
  { step: '06', title: 'RETENTION', desc: 'Automated onboarding and touchpoints transform one-time customers into brand advocates.' },
  { step: '07', title: 'GROWTH', desc: 'Referral loops, automated cross-sells, and compounding customer lifetime value.' }
];

export const AUTOMATION_WORKFLOW_STEPS = [
  { role: 'INQUIRY', label: 'Customer Inquiry', icon: 'User', desc: 'Prospect reaches out via website chat, WhatsApp, or contact form' },
  { role: 'AI AGENT', label: 'AI Response', icon: 'Bot', desc: '24/7 intelligent agent provides instant, accurate answers' },
  { role: 'QUALIFY', label: 'Lead Qualification', icon: 'Sliders', desc: 'Screens intent, budget, timeline, and core requirements' },
  { role: 'CRM', label: 'CRM Integration', icon: 'Database', desc: 'Syncs contact details and conversation context in real time' },
  { role: 'NURTURE', label: 'Follow-Up', icon: 'Send', desc: 'Automated WhatsApp & email reminders keep prospects warm' },
  { role: 'HANDOFF', label: 'Human Handoff', icon: 'Award', desc: 'Warm transfer to your sales or support team when human touch is needed' }
];

export const AUTOMATION_EXAMPLES = [
  { title: 'Instant Lead Response', desc: 'Respond to new web leads in under 30 seconds rather than waiting hours.' },
  { title: 'AI Customer Support', desc: 'Resolve frequent questions 24/7 without growing support headcount.' },
  { title: 'Lead Qualification', desc: 'Collect budget, project scope, and urgency before scheduling calls.' },
  { title: 'WhatsApp Workflows', desc: 'Direct chat automation for high-open-rate prospect interactions.' },
  { title: 'Appointment Booking', desc: 'Sync calendars, handle time zones, and eliminate scheduling friction.' },
  { title: 'Email Follow-up', desc: 'Behavioral nurture sequences triggered by specific prospect actions.' },
  { title: 'Customer Reminders', desc: 'Automate renewal alerts, appointment reminders, and payment nudges.' },
  { title: 'AI Content Assistance', desc: 'Streamline social, blog, and email drafts aligned to brand voice.' },
  { title: 'Internal Workflow Automation', desc: 'Connect Slack, Google Workspace, CRM, and project boards automatically.' },
  { title: 'Executive Reporting', desc: 'Automated weekly snapshots of revenue, leads, and conversion metrics.' }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'DISCOVER',
    titleBn: 'ডিসকভারি ও অডিট',
    subtitle: 'Audit & Analysis',
    subtitleBn: 'বিজনেস বিশ্লেষণ',
    description: 'Understand the client’s business, audience, goals, challenges, current marketing, website, creative assets and automation setup.',
    descriptionBn: 'ক্লায়েন্টের ব্যবসা, টার্গেট অডিয়েন্স, ব্যবসায়িক লক্ষ্য, বর্তমান মার্কেটিং, ওয়েবসাইট, ক্রিয়েটিভ অ্যাসেটস এবং অটোমেশন সেটআপ পুঙ্খানুপুঙ্খভাবে বিশ্লেষণ করা।'
  },
  {
    step: '02',
    title: 'STRATEGY',
    titleBn: 'ক্লিয়ার স্ট্র্যাটেজি',
    subtitle: 'Growth Blueprint',
    subtitleBn: 'গ্রোথ ব্লুপ্রিন্ট',
    description: 'Define the right service scope, channels, priorities, timeline, KPIs and execution plan.',
    descriptionBn: 'সঠিক সার্ভিস স্কোপ, অ্যাড চ্যানেল, কাজের অগ্রাধিকার, টাইমলাইন, পরিমাপযোগ্য কেপিআই এবং এক্সিকিউশন প্ল্যান চূড়ান্ত করা।'
  },
  {
    step: '03',
    title: 'BUILD',
    titleBn: 'স্পেশালিস্ট এক্সিকিউশন',
    subtitle: 'Specialist Execution',
    subtitleBn: 'ক্রিয়েটিভ, ওয়েব ও অটোমেশন',
    description: 'Create the required ad assets, creative content, website/eCommerce elements, tracking setup and AI customer support automation.',
    descriptionBn: 'প্রয়োজনীয় বিজ্ঞাপন ক্রিয়েটিভ, আকর্ষণীয় কন্টেন্ট, ওয়েবসাইট/ই-কমার্স প্ল্যাটফর্ম, নিখুঁত ট্র্যাকিং সেটআপ এবং এআই কাস্টমার সাপোর্ট অটোমেশন প্রস্তুত করা।'
  },
  {
    step: '04',
    title: 'LAUNCH',
    titleBn: 'টেস্টিং ও লঞ্চ',
    subtitle: 'Testing & Go-Live',
    subtitleBn: 'কিউএ ও গো-লাইভ',
    description: 'Launch campaigns, websites, tracking systems and automations after testing, QA and final approval.',
    descriptionBn: 'পুঙ্খানুপুঙ্খ টেস্টিং, কোয়ালিটি নিশ্চিতকরণ (QA) এবং চূড়ান্ত অনুমোদনের পর ক্যাম্পেইন, ওয়েবসাইট, ট্র্যাকিং ও অটোমেশন লাইভ করা।'
  },
  {
    step: '05',
    title: 'OPTIMIZE',
    titleBn: 'কনটিনিউয়াস অপটিমাইজেশন',
    subtitle: 'Ongoing Improvement',
    subtitleBn: 'ধারাবাহিক উন্নতি',
    description: 'Monitor performance, analyze data, improve campaigns, creatives, website conversion and automation workflows.',
    descriptionBn: 'লাইভ পারফরম্যান্স মনিটরিং, ডেটা অ্যানালাইসিস, ক্যাম্পেইন ও ক্রিয়েটিভ অপটিমাইজেশন, ওয়েবসাইটের কনভার্সন বৃদ্ধি এবং অটোমেশন ফ্লো নিখুঁত করা।'
  }
];

// Verified Case Studies / Real Projects (Format: Client/Industry -> Challenge -> Solution -> Services Used -> Verified Result -> Client Testimonial)
export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'urbanthread-ecommerce',
    clientName: 'UrbanThread Apparel',
    clientIndustry: 'UrbanThread Apparel (eCommerce & Retail)',
    category: 'eCommerce',
    industryTag: 'D2C Fashion & Apparel',
    auditPeriod: '90-Day Post-Launch Audit',
    statHighlight: {
      value: '3.4x ROAS',
      label: 'Sustained Ad Performance',
      changeType: 'increase'
    },
    secondaryStats: [
      { value: '-42%', label: 'Cart Abandonment' },
      { value: '68%', label: 'AI Support Autonomy' },
      { value: '0.8s', label: 'Average Page Load' }
    ],
    challenge: 'High cart abandonment rate on a sluggish storefront, fragmented Meta ad spend with high ad fatigue, and customer support bottlenecks handling repetitive sizing and delivery queries.',
    solution: 'Engineered a headless Next.js eCommerce storefront with sub-second page loads, restructured Meta advertising funnels with dynamic short-form video creatives, and deployed a 24/7 AI shopping assistant on WhatsApp & web.',
    servicesUsed: [
      'Next.js eCommerce Storefront',
      'Meta Paid Advertising (FB & Instagram)',
      'Creative & Short-Form Video',
      'AI Customer Support & Automation'
    ],
    architectureHighlights: [
      'Headless Next.js storefront on Edge CDN',
      'Meta CAPI (Conversions API) server-side tracking',
      'WhatsApp Business API integration with order lookup',
      'High-converting 1-page checkout flow'
    ],
    beforeMetrics: [
      '4.2s page load with high drop-off',
      '1.1x ROAS on generic ad creatives',
      'Customer support wait time > 4 hours'
    ],
    afterMetrics: [
      'Sub-second 0.8s global load time',
      '3.4x ROAS with dynamic video funnels',
      'Instant 24/7 resolution for 68% of inquiries'
    ],
    verifiedResult: '42% decrease in checkout abandonment, 3.4x return on ad spend (ROAS) sustained over 90 days, and 68% of sizing and order status inquiries resolved autonomously by AI.',
    clientTestimonial: {
      quote: 'LeadNest IT unified our storefront speed, ad creative, and customer support into one continuous engine. Our operational efficiency improved immediately.',
      author: 'Arif Chowdhury',
      role: 'Head of eCommerce'
    }
  },
  {
    id: 'transglobal-logistics',
    clientName: 'TransGlobal Freight',
    clientIndustry: 'TransGlobal Freight & Logistics (B2B SaaS & Supply Chain)',
    category: 'B2B & Enterprise',
    industryTag: 'Enterprise Logistics & Supply Chain',
    auditPeriod: 'Q1 Performance Review',
    statHighlight: {
      value: '<45s',
      label: 'Quote Response Latency',
      changeType: 'decrease'
    },
    secondaryStats: [
      { value: '+38%', label: 'Demo Bookings' },
      { value: '6h → 45s', label: 'Inbound Response' },
      { value: '99.9%', label: 'Portal Uptime' }
    ],
    challenge: 'Outdated corporate web presence with slow response times to inbound enterprise quotes (averaging 6+ hours) and unqualified leads cluttering sales reps.',
    solution: 'Built a high-performance corporate web portal featuring an interactive instant rate estimation tool, paired with high-intent Google Search advertising and automated CRM lead routing via WhatsApp and email.',
    servicesUsed: [
      'Corporate Web Portal & Calculator',
      'Google Search & Intent Ads',
      'CRM Automation & Lead Routing',
      'Performance UI/UX Design'
    ],
    architectureHighlights: [
      'Dynamic freight rate calculation algorithm',
      'High-intent Google Ads landing page clusters',
      'Instant CRM sync with automated WhatsApp notifications to sales leads',
      'Enterprise security & client portal authentication'
    ],
    beforeMetrics: [
      'Static contact form with 6+ hours latency',
      'High bounce rate from unfocused ad clicks',
      'Sales team bogged down by untracked leads'
    ],
    afterMetrics: [
      'Live interactive freight estimate under 45 seconds',
      '38% growth in verified commercial demos',
      'Zero manual entry with automated CRM routing'
    ],
    verifiedResult: 'Inbound quote response latency slashed from 6 hours to under 45 seconds; qualified corporate demo bookings increased by 38% in the first quarter.',
    clientTestimonial: {
      quote: 'The instant rate calculator and automated CRM routing changed the way we handle prospective corporate accounts. High-intent brokers receive immediate answers.',
      author: 'Marcus Vance',
      role: 'VP of Business Development'
    }
  },
  {
    id: 'apex-dental-care',
    clientName: 'Apex Dental Care Network',
    clientIndustry: 'Apex Dental Care Network (Healthcare & Medical Services)',
    category: 'Healthcare',
    industryTag: 'Multi-Branch Clinical Healthcare',
    auditPeriod: '12-Week Operational Audit',
    statHighlight: {
      value: '-53%',
      label: 'Patient No-Show Rate',
      changeType: 'decrease'
    },
    secondaryStats: [
      { value: '18 hrs/wk', label: 'Staff Time Saved' },
      { value: '+62%', label: 'Online Bookings' },
      { value: '4.9★', label: 'Local Search Rating' }
    ],
    challenge: 'High missed appointment and cancellation rates, staff overwhelmed by after-hours booking requests, and low visibility in local search for high-value treatments.',
    solution: 'Developed a streamlined multi-branch online patient booking system with automated 2-way SMS/WhatsApp reminder flows, localized Google Maps advertising, and a 24/7 AI reception assistant.',
    servicesUsed: [
      'Multi-Branch Appointment Web System',
      'Local Google Search & Maps Advertising',
      'Automated SMS / WhatsApp Notification Pipeline',
      '24/7 AI Patient Support Concierge'
    ],
    architectureHighlights: [
      'Branch-specific real-time slot scheduling',
      'Automated 24h & 2h WhatsApp / SMS reminder triggers',
      '2-way confirmation bot that updates doctor calendars',
      'High-intent local map SEO & search campaigns'
    ],
    beforeMetrics: [
      '28% patient cancellation / no-show rate',
      'Manual phone booking requiring 2 dedicated receptionists',
      'Zero visibility on Google Maps outside immediate radius'
    ],
    afterMetrics: [
      'No-show rate dropped to under 13%',
      '18 hours/week reclaimed by clinic staff',
      'Top 3 ranking across 5 major local clinic keywords'
    ],
    verifiedResult: 'Appointment no-show rate reduced by 53% through automated confirmation sequences; receptionists saved over 18 hours per week in manual phone rescheduling.',
    clientTestimonial: {
      quote: 'Our staff used to spend half their day on appointment confirmations and rescheduling. LeadNest IT automated the whole workflow reliably.',
      author: 'Dr. Farhana Rahman',
      role: 'Managing Partner'
    }
  },
  {
    id: 'artisan-roasters-club',
    clientName: 'Artisan Roasters Club',
    clientIndustry: 'Artisan Roasters Club (Food & Beverage / Subscription)',
    category: 'Subscription & D2C',
    industryTag: 'Specialty Beverage & D2C Recurring',
    auditPeriod: '120-Day Cohort Analysis',
    statHighlight: {
      value: '+47%',
      label: 'Repeat Retention Rate',
      changeType: 'increase'
    },
    secondaryStats: [
      { value: '-29%', label: 'Month-2 Churn' },
      { value: '-22%', label: 'Customer Acq. Cost' },
      { value: '3.1x', label: 'Cohort LTV Expansion' }
    ],
    challenge: 'High customer acquisition cost and early subscriber churn after month two, combined with repetitive manual queries regarding roast choices and delivery pauses.',
    solution: 'Redesigned subscription account portal allowing frictionless 1-click delivery pausing and roast customization, supported by UGC video retargeting ads and an automated self-service WhatsApp bot.',
    servicesUsed: [
      'Subscription Portal & Custom Checkout',
      'Short-Form Video Production & Retargeting',
      'Retention & Email/WhatsApp Automation',
      'AI Customer Self-Service Bot'
    ],
    architectureHighlights: [
      '1-click subscription management portal (skip, swap, pause)',
      'Automated renewal reminders with custom preference toggles',
      'High-converting UGC video creative testing framework',
      'Direct WhatsApp self-service customer concierge'
    ],
    beforeMetrics: [
      '41% subscriber drop-off after month two',
      'High customer service ticket load for basic address/date edits',
      'Rising Meta acquisition cost on static imagery'
    ],
    afterMetrics: [
      'Month-2 subscriber churn dropped by 29%',
      '82% of subscription adjustments handled self-service',
      'Customer acquisition cost reduced by 22% with video UGC'
    ],
    verifiedResult: 'Early subscriber churn dropped by 29%; 120-day customer repeat purchase rate increased by 47% with a 22% reduction in ad acquisition cost.',
    clientTestimonial: {
      quote: 'The combination of engaging video creatives and effortless self-service subscription management transformed our customer retention.',
      author: 'Elena Rostova',
      role: 'Founder & Managing Director'
    }
  }
];

export const WHY_US_BENEFITS = [
  {
    number: '01',
    title: 'Business First',
    description: 'We start with your business goal, not the technology. Every line of code and ad dollar serves your bottom-line profitability.'
  },
  {
    number: '02',
    title: 'Founder-Led Strategy',
    description: 'Direct strategic guidance from Co-Founders Ibrahim Samrat (Product Design) and Amit Hasan (Growth Marketing), backed by specialist execution across every channel.'
  },
  {
    number: '03',
    title: 'Growth Focused',
    description: 'We design systems around measurable business outcomes — qualified leads, customer acquisition cost, and revenue.'
  },
  {
    number: '04',
    title: 'Modern Technology',
    description: 'We use modern web, marketing and AI technologies that ensure lightning performance, airtight security, and easy scaling.'
  },
  {
    number: '05',
    title: 'Scalable Solutions',
    description: 'Start small and expand as your business grows. Our modular digital architectures evolve smoothly with your company.'
  },
  {
    number: '06',
    title: 'Long-Term Support',
    description: 'We can continue supporting your digital business after launch through continuous optimization, updates, and strategic guidance.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    subtitle: 'Establishing Digital Presence',
    targetAudience: 'For businesses establishing their digital presence with a rock-solid, professional foundation.',
    features: [
      'High-converting modern website build (Next.js / React)',
      'Fully mobile responsive & SEO-ready structure',
      'Fast performance (sub-second load) & SSL security hardening',
      'Lead capture form & instant WhatsApp/Email alerts',
      'Google Analytics 4, Tag Manager & Meta Pixel setup',
      'Initial brand style synchronization & typography',
      'Free 1-year high-speed hosting setup & 30-day warranty'
    ],
    badge: 'Foundation',
    pricing: {
      USD: {
        regular: 499,
        discounted: 375,
        displayRegular: '$499',
        displayDiscounted: '$375',
        period: 'one-time starting from',
        comparisonNote: 'Save 60% compared to typical US agencies while getting full-stack modern code'
      },
      BDT: {
        regular: 18500,
        discounted: 13800,
        displayRegular: '৳১৮,৫০০',
        displayDiscounted: '৳১৩,৮০০',
        period: 'এককালীন (Starting From)',
        comparisonNote: 'বাংলাদেশের অন্যান্য এজেন্সির (৳২৫,০০০-৳৩৫,০০০) চেয়ে সাশ্রয়ী ও প্রিমিয়াম ইউএস টেকনোলজি'
      }
    }
  },
  {
    id: 'pro',
    name: 'PRO',
    subtitle: 'Accelerating Customer Acquisition',
    targetAudience: 'For businesses actively looking to grow their customer base and scale online revenue.',
    features: [
      'Complete high-performance website or eCommerce platform',
      'Targeted Digital Marketing campaign setup & execution',
      'High-converting sales funnel & dynamic lead magnets',
      'Google Ads & Meta (FB/Insta) marketing strategy',
      'CRM integration & automated lead routing pipeline',
      'AI Lead Response & instant booking workflow',
      'Bi-weekly performance, speed & conversion optimization',
      'Priority direct engineer support & maintenance'
    ],
    badge: 'Most Popular',
    isPopular: true,
    pricing: {
      USD: {
        regular: 1199,
        discounted: 899,
        displayRegular: '$1,199',
        displayDiscounted: '$899',
        period: 'one-time starting from',
        comparisonNote: 'Enterprise web platform + performance marketing funnel at ultra-competitive US rates'
      },
      BDT: {
        regular: 42000,
        discounted: 31500,
        displayRegular: '৳৪২,০০০',
        displayDiscounted: '৳৩১,৫০০',
        period: 'এককালীন (Starting From)',
        comparisonNote: 'লোকাল এজেন্সির তুলনায় ৪০% সাশ্রয়ী মূল্যে ফুল-স্ট্যাক ওয়েবসাইট + মার্কেটিং ফানেল'
      }
    }
  },
  {
    id: 'growth-partner',
    name: 'GROWTH PARTNER',
    subtitle: 'Comprehensive Digital Transformation',
    targetAudience: 'For businesses looking for ongoing marketing, technology and automation support as an extension of their team.',
    features: [
      'Full-stack digital growth & technology team dedicated to you',
      'Continuous website evolution & custom feature development',
      'Multi-channel ad management, creative testing & budget scaling',
      'Custom AI Chatbots & automated customer support agents',
      'WhatsApp, SMS & CRM workflow automation pipelines',
      'Dedicated Growth Strategist & Senior Tech Lead',
      'Weekly performance reviews & real-time metric dashboards',
      'Unlimited technical maintenance & guaranteed 2-hour SLA'
    ],
    badge: 'Enterprise Partner',
    pricing: {
      USD: {
        regular: 1999,
        discounted: 1499,
        displayRegular: '$1,999',
        displayDiscounted: '$1,499',
        period: 'per month (cancel anytime)',
        comparisonNote: 'Dedicated full-stack growth team at 1/4th the salary of a single in-house engineer'
      },
      BDT: {
        regular: 75000,
        discounted: 56000,
        displayRegular: '৳৭৫,০০০',
        displayDiscounted: '৳৫৬,০০০',
        period: 'প্রতি মাসে (মাসিক গ্রোথ পার্টনারশিপ)',
        comparisonNote: 'একটি পুরো ইন-হাউস টিম (ডেভেলপার + মার্কেটার + ডিজাইনার) নিয়োগের খরচের ১/৩ অংশ'
      }
    }
  }
];

// Verified client testimonials will be published here upon client authorization
export const TESTIMONIALS_DATA: Array<{
  quote: string;
  name: string;
  position: string;
  company: string;
  tag?: string;
}> = [];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'How much does a website cost?',
    answer: 'Because we design custom digital business systems rather than one-size-fits-all templates, investment depends on your specific goals, required features (e.g., custom funnels, eCommerce, CRM integrations), and automation needs. We provide transparent, custom quotes tailored to deliver measurable return on investment for your business scale.'
  },
  {
    question: 'How long does a website take to build?',
    answer: 'A standard high-performance corporate website typically launches within 2 to 4 weeks, while comprehensive eCommerce platforms or systems with custom AI workflows take 4 to 8 weeks. We work in clear, transparent milestones from discovery and wireframing through to final QA and go-live.'
  },
  {
    question: 'Do you provide eCommerce websites?',
    answer: 'Yes. We engineer high-converting eCommerce stores optimized for speed, mobile shopping, effortless checkout, and inventory sync. Our eCommerce systems are built to maximize average order value, reduce cart abandonment, and integrate directly with payment and logistics platforms.'
  },
  {
    question: 'Can you manage our digital marketing?',
    answer: 'Absolutely. We manage multi-channel digital marketing including Google Ads, Meta (Facebook & Instagram) ads, LinkedIn campaigns, and retargeting funnels. We focus on acquisition costs, qualified leads, and measurable revenue rather than vanity metrics like impressions.'
  },
  {
    question: 'Can you generate leads for our business?',
    answer: 'Yes. Lead generation is one of our primary growth engines. We build complete acquisition systems combining targeted ad creative, high-converting landing pages, qualifying questionnaires, and automated scheduling so your sales team speaks only with qualified prospects.'
  },
  {
    question: 'What is AI Customer Support & Automation?',
    answer: 'AI Customer Support & Automation combines 24/7 intelligent assistants, instant lead replies, automated CRM routing, and messaging workflows (like WhatsApp and email) to answer frequent customer inquiries, qualify prospective buyers, and ensure rapid response around the clock without manual overhead.'
  },
  {
    question: 'Can you automate WhatsApp and customer follow-up?',
    answer: 'Yes. We construct automated multi-channel follow-up sequences using WhatsApp Business API, SMS, and email. When a prospective lead submits an inquiry, they receive an immediate, personalized message, qualifying prompts, and easy booking options in seconds.'
  },
  {
    question: 'Do you provide ongoing website maintenance?',
    answer: 'Yes. We offer continuous maintenance and technology support packages that include security monitoring, cloud hosting management, daily backups, performance tuning, and on-demand feature improvements to ensure your digital presence is always operating at peak efficiency.'
  }
];
