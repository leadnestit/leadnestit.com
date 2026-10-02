import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  X,
  UploadCloud,
  Camera,
  Check
} from 'lucide-react';
import { TeamMember } from '../types';

interface EditTeamMemberModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedMember: TeamMember) => void;
}

export const EditTeamMemberModal: React.FC<EditTeamMemberModalProps> = ({
  member,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen || !member) return null;

  const [formData, setFormData] = useState<TeamMember>({ ...member });
  const [avatarPreview, setAvatarPreview] = useState<string>(member.avatarUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setAvatarPreview(result);
          setFormData((prev) => ({ ...prev, avatarUrl: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: TeamMember = {
      ...formData,
      avatarUrl: avatarPreview || formData.avatarUrl,
      status: formData.status === 'hiring' && formData.name && !formData.name.toLowerCase().includes('slot')
        ? 'active'
        : formData.status
    };

    onSave(updated);
    onClose();
  };

  const coverPresets = [
    { label: 'Blue Tech', value: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)' },
    { label: 'Emerald Growth', value: 'linear-gradient(135deg, #065f46 0%, #10b981 50%, #14b8a6 100%)' },
    { label: 'Indigo Purple', value: 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #8b5cf6 100%)' },
    { label: 'Slate Dark', value: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #3b82f6 100%)' },
    { label: 'Warm Amber', value: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #f59e0b 100%)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {member.status === 'hiring' ? 'Upload Hired Employee Profile' : 'Edit Employee Profile'}
              </h3>
              <p className="text-xs text-slate-500">
                Update employee name, profession, experience, sector, and contact links
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Avatar Upload Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="relative group/photo">
              <div className="w-22 h-22 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-200 flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-2xl font-bold text-slate-400 font-mono">
                    {formData.name.charAt(0) || 'LN'}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-slate-950/60 text-white opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-bold cursor-pointer"
              >
                <Camera className="w-4 h-4 mb-0.5 text-cyan-300" />
                <span>Upload</span>
              </button>
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <h4 className="text-sm font-bold text-slate-900">Profile Photo</h4>
              <p className="text-xs text-slate-500">
                Upload a professional headshot. Square image recommended.
              </p>
              <div className="flex items-center gap-2 pt-1 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Choose Photo</span>
                </button>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview('');
                      setFormData((p) => ({ ...p, avatarUrl: '' }));
                    }}
                    className="text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cover Color Theme Picker */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Cover Banner Style</label>
            <div className="flex flex-wrap gap-2">
              {coverPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, coverUrl: preset.value }))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white transition-all ${
                    formData.coverUrl === preset.value ? 'ring-2 ring-blue-600 ring-offset-2 scale-102' : 'opacity-85 hover:opacity-100'
                  }`}
                  style={{ background: preset.value }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. Employee Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Employee Name (English) *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. Ibrahim Samrat"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Employee Name (Bengali)</label>
              <input
                type="text"
                value={formData.nameBn || ''}
                onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="যেমন: ইব্রাহিম সম্রাট"
              />
            </div>
          </div>

          {/* 2. Profession & 4. Sector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Profession / Designation *</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. Senior Media Buyer & Funnel Strategist"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Sector (Department) *</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="Leadership">Leadership</option>
                <option value="Design & UX">Design & UX</option>
                <option value="Performance Marketing">Performance Marketing</option>
                <option value="Web & eCommerce">Web & eCommerce</option>
                <option value="Creative & Video">Creative & Video</option>
                <option value="AI & Automation">AI & Automation</option>
              </select>
            </div>
          </div>

          {/* 3. Experience & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Experience *</label>
              <input
                type="text"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. 7+ Years / 4+ Years"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. Dhaka, Bangladesh (Hybrid)"
              />
            </div>
          </div>

          {/* Core Specialty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Core Specialty (English)</label>
              <input
                type="text"
                value={formData.coreSpecialty || ''}
                onChange={(e) => setFormData({ ...formData, coreSpecialty: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. Meta & Google Ads, Conversion API & ROAS Scaling"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Core Specialty (Bengali)</label>
              <input
                type="text"
                value={formData.coreSpecialtyBn || ''}
                onChange={(e) => setFormData({ ...formData, coreSpecialtyBn: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="যেমন: মেটা ও গুগল অ্যাডস, কনভার্সন এপিআই ও স্কেলিং"
              />
            </div>
          </div>

          {/* Selected Portfolio / View Work */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Portfolio Button Label</label>
              <input
                type="text"
                value={formData.portfolioLabel || ''}
                onChange={(e) => setFormData({ ...formData, portfolioLabel: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. View Selected Portfolio / View Work"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Portfolio URL Link</label>
              <input
                type="url"
                value={formData.portfolioUrl || ''}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="https://www.leadnestit.com"
              />
            </div>
          </div>

          {/* 5. Short Description of Profession */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Profession Short Description *</label>
            <textarea
              rows={2}
              required
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Scaling eCommerce & B2B Brands with High ROAS via Meta, Google & TikTok Ads"
            />
          </div>

          {/* Profile Status */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Status:</span>
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === 'active'}
                onChange={() => setFormData({ ...formData, status: 'active' })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-emerald-700 font-bold">Active Team Member</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="radio"
                name="status"
                value="hiring"
                checked={formData.status === 'hiring'}
                onChange={() => setFormData({ ...formData, status: 'hiring' })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-amber-700 font-bold">Hiring / Open Slot</span>
            </label>
          </div>

          {/* Contact Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="leadnestit@gmail.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">WhatsApp Number</label>
              <input
                type="text"
                value={formData.whatsappNumber || ''}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. 8801722604376"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">LinkedIn Profile Link</label>
              <input
                type="url"
                value={formData.linkedinUrl || ''}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="https://www.linkedin.com/in/username"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Facebook Profile Link</label>
              <input
                type="url"
                value={formData.facebookUrl || ''}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="https://www.facebook.com/username"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save & Publish Profile</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
