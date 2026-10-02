import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProblemSection } from './components/ProblemSection';
import { GrowthPillars } from './components/GrowthPillars';
import { ServicesSection } from './components/ServicesSection';
import { WebsiteGrowth } from './components/WebsiteGrowth';
import { MarketingSection } from './components/MarketingSection';
import { BusinessSystem } from './components/BusinessSystem';
import { AutomationSection } from './components/AutomationSection';
import { FoundersSection } from './components/FoundersSection';
import { PartnerProgram } from './components/PartnerProgram';
import { ProcessSection } from './components/ProcessSection';
import { CaseStudies } from './components/CaseStudies';
import { WhyUs } from './components/WhyUs';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { AdminDashboard } from './components/AdminDashboard';
import { BackToTop } from './components/BackToTop';
import { MobileQuickBar } from './components/MobileQuickBar';
import { BusinessBackgroundDecor } from './components/BusinessBackgroundDecor';
import { PageBanner } from './components/PageBanner';

type PageId = 'home' | 'solutions' | 'process' | 'case-studies' | 'blog' | 'about' | 'contact';

function MainApp() {
  const { currency } = useCurrency();
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('Multiple Services');

  // Sync with browser URL hash for direct links and back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'pricing') hash = 'blog';
      if (hash === 'case-study' || hash === 'our-work' || hash === 'work') {
        hash = 'case-studies';
      }
      const validPages: PageId[] = ['home', 'solutions', 'process', 'case-studies', 'blog', 'about', 'contact'];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId: string) => {
    let cleanId = pageId.replace('#', '').toLowerCase();
    if (cleanId === 'pricing') cleanId = 'blog';
    if (cleanId === 'case-study' || cleanId === 'our-work' || cleanId === 'work') {
      cleanId = 'case-studies';
    }
    const validPages: PageId[] = ['home', 'solutions', 'process', 'case-studies', 'blog', 'about', 'contact'];
    const targetPage = validPages.includes(cleanId as PageId) ? (cleanId as PageId) : 'home';
    
    setCurrentPage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (service = 'Multiple Services') => {
    setPreselectedService(service);
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white pb-20 lg:pb-0 overflow-x-hidden relative">
      {/* 
        Modern Business & Technology Vector Graphics & Subtle Grid Architecture
        Features performance marketing curves, code schemas, and AI automation workflows
      */}
      <BusinessBackgroundDecor />

      {/* Sticky Header Navigation with Active Page Tracking */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
      />

      {/* 
        Main Page Container with Simple Page-to-Page Animation Transitions:
        When clicking from home to solutions or any section, simple animation opens the direct new page!
      */}
      <main className="flex-grow relative z-10 pb-16 lg:pb-0 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {/* ================= PAGE 1: HOME ================= */}
          {currentPage === 'home' && (
            <motion.div
              key="page-home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Hero with GoFly Service Search Card */}
              <Hero
                onOpenConsultation={handleOpenConsultation}
                onExploreSolutions={() => handleNavigate('solutions')}
              />

              {/* Trust Bar & Client Metrics */}
              <TrustBar />

              {/* Problem Section: Why Generic Agencies Fail */}
              <ProblemSection
                onOpenConsultation={() => handleOpenConsultation('Business Systems Alignment')}
              />

              {/* Core 3 Growth Pillars */}
              <GrowthPillars
                onSelectPillar={(pillar) => handleOpenConsultation(`${pillar} Engine Solutions`)}
              />

              {/* Case Studies / Verified Results Section */}
              <CaseStudies
                onConsultCaseStudy={(industry) => handleOpenConsultation(`Case Study Inquiry (${industry})`)}
              />

              {/* Final Call to Action */}
              <FinalCTA
                onBookConsultation={() => handleOpenConsultation()}
                onTalkToTeam={() => handleNavigate('contact')}
              />
            </motion.div>
          )}

          {/* ================= PAGE 2: SOLUTIONS ================= */}
          {currentPage === 'solutions' && (
            <motion.div
              key="page-solutions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="w-full"
            >
              <PageBanner
                badge="Dual-Specialized Engineering"
                title="Services & Capabilities"
                subtitle="Paid Advertising, Creative & Video, Websites & eCommerce, and AI Customer Support & Automation designed for business growth."
                onBackToHome={() => handleNavigate('home')}
              />

              {/* All Solutions & Services */}
              <ServicesSection
                onSelectService={(serviceTitle) => handleOpenConsultation(serviceTitle)}
              />

              {/* Web Development Deep Dive */}
              <WebsiteGrowth
                onBuildWebsite={() => handleOpenConsultation('Websites & eCommerce')}
              />

              {/* AI Automation & CRM Deep Dive */}
              <AutomationSection
                onExploreAutomation={() => handleOpenConsultation('AI Customer Support & Automation')}
              />

              {/* Performance Marketing & Ads Deep Dive */}
              <MarketingSection
                onGrowBusiness={() => handleOpenConsultation('Paid Advertising')}
              />

              {/* Unified Growth Operating System */}
              <BusinessSystem />

              <FinalCTA
                onBookConsultation={() => handleOpenConsultation()}
                onTalkToTeam={() => handleNavigate('contact')}
              />
            </motion.div>
          )}

          {/* ================= PAGE 3: FOUNDERS & TEAM (ABOUT) ================= */}
          {currentPage === 'about' && (
            <motion.div
              key="page-about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Founders Section - starts directly from "Founded by Two Specialists" */}
              <FoundersSection
                onOpenConsultation={() => handleOpenConsultation('Founder Direct Strategy Session')}
              />

              {/* Why Us Comparison Table */}
              <WhyUs />

              {/* Long-Term Partner Program */}
              <PartnerProgram
                onBecomePartner={() => handleOpenConsultation('Growth Partner Retainer')}
              />

              <FinalCTA
                onBookConsultation={() => handleOpenConsultation()}
                onTalkToTeam={() => handleNavigate('contact')}
              />
            </motion.div>
          )}

          {/* ================= PAGE 4: PROCESS ================= */}
          {currentPage === 'process' && (
            <motion.div
              key="page-process"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="w-full"
            >
              <PageBanner
                badge={currency === 'USD' ? "Execution Framework" : "কাজের সুনির্দিষ্ট ধাপ"}
                breadcrumb={currency === 'USD' ? "How We Work" : "কীভাবে কাজ করি"}
                title={currency === 'USD' ? "From Strategy to Execution" : "স্ট্র্যাটেজি থেকে পরিপূর্ণ বাস্তবায়ন"}
                subtitle={currency === 'USD' ? "A clear 5-step process from discovery to launch and ongoing optimization." : "ডিসকভারি ও স্ট্র্যাটেজি থেকে সফল লঞ্চ এবং ধারাবাহিক অপটিমাইজেশনের ৫টি ধাপ।"}
                onBackToHome={() => handleNavigate('home')}
              />

              {/* Process Section */}
              <ProcessSection
                onStartProcess={() => handleNavigate('contact')}
              />
            </motion.div>
          )}

          {/* ================= PAGE 4: CASE STUDIES ================= */}
          {currentPage === 'case-studies' && (
            <motion.div
              key="page-case-studies"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="w-full"
            >
              <PageBanner
                badge={currency === 'USD' ? 'Verified Client Work' : 'যাচাইকৃত ক্লায়েন্ট ফলাফল'}
                breadcrumb={currency === 'USD' ? 'Case Studies' : 'কেস স্টাডিজ'}
                title={currency === 'USD' ? 'Case Studies & Verified Outcomes' : 'বাস্তব ক্লায়েন্ট কেস স্টাডিজ ও ফলাফল'}
                subtitle={
                  currency === 'USD'
                    ? 'Audited project challenges, technical architectures, and verified growth metrics delivered by LeadNest IT.'
                    : 'LeadNest IT-র মাধ্যমে সম্পন্ন হওয়া বাস্তব চ্যালেঞ্জ, টেকনিক্যাল আর্কিটেকচার এবং যাচাইকৃত গ্রোথ রেজাল্ট।'
                }
                onBackToHome={() => handleNavigate('home')}
              />

              <CaseStudies
                onConsultCaseStudy={(industry) => handleOpenConsultation(`Case Study Inquiry (${industry})`)}
              />

              <FinalCTA
                onBookConsultation={() => handleOpenConsultation()}
                onTalkToTeam={() => handleNavigate('contact')}
              />
            </motion.div>
          )}

          {/* ================= PAGE 5: INSIGHTS ================= */}
          {currentPage === 'blog' && (
            <motion.div
              key="page-blog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="w-full"
            >
              <PageBanner
                badge={currency === 'USD' ? 'Practical Insights' : 'বাস্তব ইনসাইটস'}
                breadcrumb={currency === 'USD' ? 'Insights' : 'ইনসাইটস'}
                title={currency === 'USD' ? 'Ideas for Smarter Growth' : 'স্মার্ট গ্রোথের আইডিয়া'}
                subtitle={
                  currency === 'USD'
                    ? 'Practical insights on paid advertising, creative strategy, websites, eCommerce and AI-powered customer support.'
                    : 'পেইড অ্যাডভার্টাইজিং, ক্রিয়েটিভ স্ট্র্যাটেজি, ওয়েবসাইট, ই-কমার্স ও এআই-পাওয়ার্ড কাস্টমার সাপোর্টের কার্যকর বিশ্লেষণ।'
                }
                onBackToHome={() => handleNavigate('home')}
              />

              {/* Blog & Playbooks Section */}
              <BlogSection
                onOpenConsultation={(topic) => handleOpenConsultation(topic || 'Insights Strategy Session')}
              />

              {/* Frequently Asked Questions */}
              <FAQSection
                onAskQuestion={() => handleNavigate('contact')}
              />

              <FinalCTA
                onBookConsultation={() => handleOpenConsultation()}
                onTalkToTeam={() => handleNavigate('contact')}
              />
            </motion.div>
          )}

          {/* ================= PAGE 7: CONTACT ================= */}
          {currentPage === 'contact' && (
            <motion.div
              key="page-contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="w-full"
            >
              <PageBanner
                badge={currency === 'USD' ? 'Direct Communication' : 'সরাসরি যোগাযোগ'}
                title={currency === 'USD' ? 'Connect with LeadNest IT' : 'LeadNest IT-র সাথে যোগাযোগ করুন'}
                subtitle={
                  currency === 'USD'
                    ? 'Book a strategy call, message our team on WhatsApp, or tell us about the support your business needs.'
                    : 'একটি স্ট্র্যাটেজি কল বুক করুন, হোয়াটসঅ্যাপে আমাদের টিমের সাথে কথা বলুন, অথবা আপনার ব্যবসার প্রয়োজনীয় সাপোর্টের ব্যাপারে জানান।'
                }
                onBackToHome={() => handleNavigate('home')}
              />

              {/* Contact Section with Booking Form & Direct Details */}
              <ContactSection
                initialService={preselectedService}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER with Page Navigation */}
      <Footer
        onNavClick={handleNavigate}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenConsultation={() => handleOpenConsultation('Footer Direct Strategy Session')}
      />

      {/* MODALS */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedService={preselectedService}
      />

      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
        onNewConsultation={() => handleOpenConsultation()}
      />

      {/* Admin Panel & Founders Command Center */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onOpenConsultationModal={() => handleOpenConsultation()}
      />

      {/* Mobile Floating Quick Action Bar */}
      <MobileQuickBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <MainApp />
      </CurrencyProvider>
    </ThemeProvider>
  );
}
