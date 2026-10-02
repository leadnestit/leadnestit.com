import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Briefcase,
  Sparkles,
  Mail,
  MessageSquare,
  Linkedin,
  Facebook,
  Camera,
  Edit3,
  UserPlus,
  ShieldCheck,
  PhoneCall,
  Check,
  Target,
  ExternalLink
} from 'lucide-react';
import { TeamMember } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface TeamProfileCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onPhotoUpload: (memberId: string, photoDataUrl: string) => void;
}

export const TeamProfileCard: React.FC<TeamProfileCardProps> = ({
  member,
  onEdit,
  onPhotoUpload,
}) => {
  const { currency } = useCurrency();
  const isUSD = currency === 'USD';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onPhotoUpload(member.id, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const whatsappUrl = member.whatsappNumber
    ? `https://wa.me/${member.whatsappNumber}?text=${encodeURIComponent(
        isUSD
          ? `Hi ${member.name}, I found your profile on LeadNest IT and would like to discuss a project.`
          : `আসসালামু আলাইকুম ${member.nameBn || member.name} ভাই, LeadNest IT-তে আপনার প্রোফাইল দেখে প্রজেক্ট নিয়ে কথা বলতে চাচ্ছি।`
      )}`
    : undefined;

  const isHiring = member.status === 'hiring';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative rounded-3xl bg-white border ${
        member.isFounder
          ? 'border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-xl hover:shadow-blue-500/10'
          : isHiring
          ? 'border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-lg'
          : 'border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-lg'
      } flex flex-col justify-between overflow-hidden transition-all duration-300`}
      id={`team-card-${member.id}`}
    >
      {/* Hidden File Input for Direct Avatar Change */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label={`Upload photo for ${member.name}`}
      />

      <div>
        {/* ========================================================
            1. COVER BANNER: SECTOR (DEPARTMENT) & STATUS
           ======================================================== */}
        <div
          className="h-28 sm:h-32 w-full relative overflow-hidden flex items-start justify-between p-3.5 sm:p-4 text-white"
          style={{
            background: member.coverUrl || 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
          }}
        >
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

          {/* Sector / Department Badge */}
          <div className="relative z-10">
            <span className="px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              {member.isFounder ? (
                <ShieldCheck className="w-3 h-3 text-cyan-300" />
              ) : (
                <Sparkles className="w-3 h-3 text-amber-300" />
              )}
              <span>{isUSD ? member.department : (member.departmentBn || member.department)}</span>
            </span>
          </div>

          {/* Top Right: Status Badge & Edit Trigger */}
          <div className="relative z-10 flex items-center gap-1.5">
            {member.isFounder ? (
              <span className="px-2 py-0.5 rounded-full bg-blue-900/60 backdrop-blur-md border border-blue-300/40 text-blue-100 text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Founding Leadership</span>
              </span>
            ) : isHiring ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 backdrop-blur-md border border-emerald-300/40 text-emerald-100 text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open Specialist Slot</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-300/40 text-slate-100 text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Active Member</span>
              </span>
            )}

            <button
              onClick={() => onEdit(member)}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/30 text-white transition-all hover:scale-105 cursor-pointer"
              title={isHiring ? 'Upload Hired Employee Profile' : 'Edit Profile Details'}
              aria-label="Edit Profile"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            2. AVATAR, EXPERIENCE & PROFILE ESSENTIALS
           ======================================================== */}
        <div className="px-5 sm:px-6 relative">
          <div className="flex items-end justify-between -mt-11 sm:-mt-12 mb-3">
            {/* Overlapping Avatar with Verified Badge */}
            <div className="relative group/avatar">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 border-white bg-slate-100 shadow-md overflow-hidden relative flex items-center justify-center">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover/avatar:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex flex-col items-center justify-center text-center p-1 font-bold">
                    <span className="text-xl sm:text-2xl font-black text-blue-700 font-mono">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase() || 'LN'}
                    </span>
                  </div>
                )}
              </div>

              {/* Verified Blue Checkmark Badge */}
              <div
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center shadow-xs"
                title="Verified Specialist Profile"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>

              {/* Camera Upload Button Overlay on Hover */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-bold cursor-pointer z-10"
                title="Upload / Change Profile Photo"
              >
                <Camera className="w-4 h-4 text-cyan-300 mb-0.5" />
                <span>Upload</span>
              </button>
            </div>

            {/* Experience Badge / Upload CTA */}
            <div>
              {isHiring ? (
                <button
                  onClick={() => onEdit(member)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold transition-all shadow-2xs hover:scale-102 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isUSD ? 'Upload Hired Profile' : 'নতুন এমপ্লয়ী আপলোড'}</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200/90 text-blue-700 text-xs font-mono font-bold shadow-2xs">
                  <span>{isUSD ? member.experience : (member.experienceBn || member.experience)}</span>
                </span>
              )}
            </div>
          </div>

          {/* ========================================================
              3. NAME, ROLE, CORE SPECIALTY & PROFESSION DETAILS
             ======================================================== */}
          <div className="space-y-2.5 mb-3.5">
            {/* Employee Name & Founder Badge */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                  {isUSD ? member.name : (member.nameBn || member.name)}
                </h3>
                {member.isFounder && (
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[10px] font-mono font-bold text-blue-700">
                    Co-Founder
                  </span>
                )}
              </div>
              {/* Official Role / Designation */}
              <p className="text-xs font-bold text-blue-600 tracking-tight pt-0.5">
                {isUSD ? member.role : (member.roleBn || member.role)}
              </p>
            </div>

            {/* Core Specialty */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Target className="w-3 h-3 text-blue-600" />
                <span>{isUSD ? 'Core Specialty' : 'মূল দক্ষতা'}</span>
              </span>
              <p className="text-xs font-semibold text-slate-900 leading-snug">
                {isUSD
                  ? (member.coreSpecialty || member.skills.slice(0, 3).join(', '))
                  : (member.coreSpecialtyBn || member.coreSpecialty || member.skills.slice(0, 3).join(', '))}
              </p>
            </div>

            {/* Profession Short Description */}
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {isUSD ? member.headline : (member.headlineBn || member.headline)}
            </p>

            {/* Selected Portfolio / View Work Button */}
            <div>
              <a
                href={member.portfolioUrl || '#'}
                target={member.portfolioUrl?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl bg-slate-100/90 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200/90 hover:border-blue-200 text-xs font-bold transition-all shadow-2xs group/work cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isUSD ? (member.portfolioLabel || 'View Selected Portfolio') : (member.portfolioLabelBn || 'নির্বাচিত পোর্টফোলিও দেখুন')}</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/work:text-blue-600 group-hover/work:translate-x-0.5 transition-all" />
              </a>
            </div>

            {/* Workplace & Location Line */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-0.5 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{member.location}</span>
              </span>
              <span>•</span>
              <span className="font-mono text-emerald-600 font-semibold">
                {isUSD ? 'Specialist Verified' : 'ভেরিফাইড স্পেশালিস্ট'}
              </span>
            </div>
          </div>

          {/* ========================================================
              4. ACTION BUTTONS ROW (CARD ENDS RIGHT HERE)
             ======================================================== */}
          <div className="flex items-center gap-2 py-3 border-t border-slate-100 flex-wrap">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                title="Direct WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isUSD ? 'Connect' : 'হোয়াটসঅ্যাপ'}</span>
              </a>
            )}

            <a
              href={`mailto:${member.email}?subject=Project%20Inquiry%20via%20LeadNest%20IT`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 text-xs font-mono font-medium transition-all cursor-pointer"
              title={`Email: ${member.email}`}
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Email</span>
            </a>

            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 text-[#0a66c2] border border-[#0a66c2]/30 transition-all hover:scale-105 cursor-pointer"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}

            {member.facebookUrl && (
              <a
                href={member.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl bg-[#1877f2]/10 hover:bg-[#1877f2]/20 text-[#1877f2] border border-[#1877f2]/30 transition-all hover:scale-105 cursor-pointer"
                title="Facebook Profile"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            )}

            {member.phone && (
              <button
                onClick={() => copyToClipboard(member.phone!, `phone_${member.id}`)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
                title={`Copy Phone: ${member.phone}`}
              >
                {copiedKey === `phone_${member.id}` ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <PhoneCall className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
