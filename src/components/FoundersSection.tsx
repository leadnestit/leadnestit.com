import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  UserPlus,
  RotateCcw,
  Briefcase,
  Users
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { TeamMember } from '../types';
import { INITIAL_TEAM_MEMBERS } from '../data/teamMembers';
import { TeamProfileCard } from './TeamProfileCard';
import { EditTeamMemberModal } from './EditTeamMemberModal';

interface FoundersSectionProps {
  onOpenConsultation: () => void;
}

export const FoundersSection: React.FC<FoundersSectionProps> = ({ onOpenConsultation }) => {
  const { currency } = useCurrency();
  const isUSD = currency === 'USD';

  // Load team members from localStorage or fall back to INITIAL_TEAM_MEMBERS
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('leadnest_team_members_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not parse team members from localStorage', err);
    }

    // Check if user previously uploaded photos for Ibrahim or Amit in old keys
    const ibrahimOldPhoto = localStorage.getItem('leadnest_ibrahim_photo');
    const amitOldPhoto = localStorage.getItem('leadnest_amit_photo');

    return INITIAL_TEAM_MEMBERS.map((m) => {
      if (m.id === 'ibrahim-samrat' && ibrahimOldPhoto) {
        return { ...m, avatarUrl: ibrahimOldPhoto };
      }
      if (m.id === 'amit-hasan' && amitOldPhoto) {
        return { ...m, avatarUrl: amitOldPhoto };
      }
      return m;
    });
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync to localStorage
  const saveTeamMembers = (members: TeamMember[]) => {
    setTeamMembers(members);
    try {
      localStorage.setItem('leadnest_team_members_v2', JSON.stringify(members));
    } catch (err) {
      console.warn('Could not save team members to localStorage', err);
    }
  };

  const handlePhotoUpload = (memberId: string, photoDataUrl: string) => {
    const updated = teamMembers.map((m) =>
      m.id === memberId ? { ...m, avatarUrl: photoDataUrl } : m
    );
    saveTeamMembers(updated);
  };

  const handleSaveMember = (updatedMember: TeamMember) => {
    const updated = teamMembers.map((m) =>
      m.id === updatedMember.id ? updatedMember : m
    );
    saveTeamMembers(updated);
  };

  const handleResetDefaults = () => {
    if (window.confirm(isUSD ? 'Reset team profiles to initial default templates?' : 'টিম প্রোফাইলগুলো ডিফল্ট টেমপ্লেটে রিসেট করবেন?')) {
      saveTeamMembers(INITIAL_TEAM_MEMBERS);
    }
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const filteredMembers = teamMembers.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'leadership') return m.isFounder;
    if (activeFilter === 'marketing') return m.department === 'Performance Marketing';
    if (activeFilter === 'tech') return m.department === 'Web & eCommerce';
    if (activeFilter === 'creative') return m.department === 'Creative & Video';
    if (activeFilter === 'ai') return m.department === 'AI & Automation';
    return true;
  });

  const bothFoundersWhatsAppUrl = `https://wa.me/8801722604376?text=${encodeURIComponent(
    isUSD
      ? 'Hi LeadNest IT Team, I would like to schedule a strategy session with the specialist team.'
      : 'আসসালামু আলাইকুম LeadNest IT টিম, আপনাদের সাথে সরাসরি স্ট্র্যাটেজি সেশনে কথা বলতে চাই।'
  )}`;

  return (
    <section className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-white relative overflow-hidden" id="about">
      {/* Background Motion Glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-6 w-96 h-96 bg-blue-500/10 rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-16 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================
            SECTION HEADER - "OUR TEAM" WITH HIGH-TECH INDICATORS
           ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12 text-left">
          <div className="max-w-3xl text-left space-y-3.5">
            {/* Left-Aligned Badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/90 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>{isUSD ? 'OUR TEAM • 4 CORE DISCIPLINES' : 'আমাদের টিম • ৪টি কোর স্পেশালিটি'}</span>
            </motion.div>

            {/* Left-Aligned Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]"
            >
              {isUSD ? (
                <>
                  Specialists Behind <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                    Your Growth.
                  </span>
                </>
              ) : (
                <>
                  আপনার গ্রোথের পেছনে <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                    নিবেদিত স্পেশালিস্ট টিম।
                  </span>
                </>
              )}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed font-normal"
            >
              {isUSD
                ? 'Founder-led strategy supported by specialists across paid advertising, creative, web development and AI customer support.'
                : 'পেইড অ্যাডভার্টাইজিং, ক্রিয়েটিভ, ওয়েব ডেভেলপমেন্ট এবং এআই কাস্টমার সাপোর্টের অভিজ্ঞ স্পেশালিস্টদের সমন্বয়ে ফাউন্ডার-লেড স্ট্র্যাটেজি।'}
            </motion.p>
          </div>

          {/* Right Side Indicators & Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 self-start md:self-end">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center gap-3 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100/70 border border-blue-200 flex items-center justify-center text-blue-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block font-mono">DEDICATED SPECIALISTS</span>
                <span className="text-[11px] text-slate-500 block">4 Core Service Disciplines</span>
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const firstHiring = teamMembers.find((m) => m.status === 'hiring') || teamMembers[2];
                  openEditModal(firstHiring);
                }}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{isUSD ? '+ Add / Edit Specialist' : '+ স্পেশালিস্ট প্রোফাইল এডিট'}</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs transition-colors cursor-pointer"
                title={isUSD ? 'Reset Team Templates' : 'ডিফল্ট টেমপ্লেট রিসেট করুন'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            DEPARTMENT FILTER TABS
           ============================================================ */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {[
            { id: 'all', label: isUSD ? 'All Specialists (6)' : 'সকল স্পেশালিস্ট (৬)' },
            { id: 'leadership', label: isUSD ? 'Founder-Led Strategy' : 'ফাউন্ডার-লেড স্ট্র্যাটেজি' },
            { id: 'marketing', label: isUSD ? 'Paid Advertising' : 'পেইড অ্যাডভার্টাইজিং' },
            { id: 'creative', label: isUSD ? 'Creative & Video' : 'ক্রিয়েটিভ ও ভিডিও' },
            { id: 'tech', label: isUSD ? 'Websites & eCommerce' : 'ওয়েবসাইটস ও ই-কমার্স' },
            { id: 'ai', label: isUSD ? 'AI Customer Support & Automation' : 'এআই কাস্টমার সাপোর্ট ও অটোমেশন' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================
            THE 6 TEAM PROFILES - LINKEDIN / FACEBOOK PROFILE VIEW CARDS
           ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-12">
          {filteredMembers.map((member) => (
            <TeamProfileCard
              key={member.id}
              member={member}
              onEdit={openEditModal}
              onPhotoUpload={handlePhotoUpload}
            />
          ))}
        </div>

        {/* ============================================================
            SYNERGY CALLOUT BANNER AT BOTTOM
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-32 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="space-y-1.5 relative z-10 max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>THE SPECIALIST ADVANTAGE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isUSD
                ? 'Direct Strategic Access to the Specialists Building Your Systems'
                : 'আপনার প্রজেক্টের প্রতিটি পদক্ষেপে নিবেদিত স্পেশালিস্টদের সরাসরি সহায়তা'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              {isUSD
                ? 'Every client collaborates with dedicated specialists and founding leaders with structured sprint check-ins, transparent timelines, and measurable performance.'
                : 'স্বচ্ছ টাইমলাইন, নিয়মিত অগ্রগতি আপডেট এবং পরিমাপযোগ্য ফলাফলের মাধ্যমে আপনার ডিজিটাল প্রজেক্টের সর্বোচ্চ মান নিশ্চিত করা হয়।'}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 relative z-10 shrink-0">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={bothFoundersWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isUSD ? 'Chat with Team' : 'টিমের সাথে কথা বলুন'}</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenConsultation}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>{isUSD ? 'Book a Free Strategy Call' : 'ফ্রি স্ট্র্যাটেজি কল বুক করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Edit / Upload Modal */}
      <EditTeamMemberModal
        isOpen={isModalOpen}
        member={editingMember}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
      />
    </section>
  );
};
