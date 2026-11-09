'use client';

import React, { useRef } from 'react';
import type { UserProfileData } from '../types/settings.types';

interface Props {
  profile: UserProfileData;
  isSaving: boolean;
  saveSuccessMessage: string | null;
  onChangeField: (field: keyof UserProfileData, value: string) => void;
  onDiscard: () => void;
  onUpdateProfile: (e: React.FormEvent) => void;
}

export default function ProfileTabContent({
  profile,
  isSaving,
  saveSuccessMessage,
  onChangeField,
  onDiscard,
  onUpdateProfile,
}: Props) {
  const photoInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      onChangeField('avatarUrl', url);
    }
  }

  return (
    <form onSubmit={onUpdateProfile} className="space-y-8">
      {/* Hidden Photo File Input */}
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Profile Header Card: Avatar + Name + Patient ID + Change Photo */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {/* Avatar with Teal Outline Ring matching screenshot */}
        <div className="relative w-20 h-20 rounded-full ring-4 ring-[#0d9488]/20 overflow-hidden shadow-sm shrink-0 bg-teal-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Details */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {profile.name}
          </h2>

          <div>
            <span className="text-[11px] font-bold text-[#0d9488] bg-[#e6f7f3] border border-teal-100 px-3 py-0.5 rounded-full inline-block">
              Patient ID: {profile.patientId}
            </span>
          </div>

          <div>
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f0faf7] border border-teal-200/80 text-xs font-semibold text-[#0d9488] hover:bg-teal-50 active:scale-95 transition shadow-2xs cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span>Change Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section Subheader: PERSONAL INFORMATION + Sync Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-4 border-t border-gray-100">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0a3832]">
          PERSONAL INFORMATION
        </h3>
        <p className="text-xs text-gray-400 font-medium">
          {profile.syncNotice}
        </p>
      </div>

      {/* Form Fields 2-Column Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block">
            Email Address
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <input
              type="email"
              value={profile.email}
              onChange={e => onChangeField('email', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200/90 bg-[#f9fdfc] text-xs text-gray-800 font-medium focus:outline-none focus:border-[#0d9488] focus:bg-white transition"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block">
            Phone Number
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <input
              type="tel"
              value={profile.phone}
              onChange={e => onChangeField('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200/90 bg-[#f9fdfc] text-xs text-gray-800 font-medium focus:outline-none focus:border-[#0d9488] focus:bg-white transition"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block">
            Date of Birth
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <input
              type="text"
              value={profile.dateOfBirth}
              onChange={e => onChangeField('dateOfBirth', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200/90 bg-[#f9fdfc] text-xs text-gray-800 font-medium focus:outline-none focus:border-[#0d9488] focus:bg-white transition"
              placeholder="DD Mon YYYY"
            />
          </div>
        </div>

        {/* Assigned Caregiver / Contact */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block">
            Assigned Caregiver / Contact
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              type="text"
              value={profile.assignedCaregiver}
              onChange={e => onChangeField('assignedCaregiver', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200/90 bg-[#f9fdfc] text-xs text-gray-800 font-medium focus:outline-none focus:border-[#0d9488] focus:bg-white transition"
              placeholder="Name (Relationship)"
            />
          </div>
        </div>

        {/* Residential Address (Full Width) */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block">
            Residential Address
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <input
              type="text"
              value={profile.residentialAddress}
              onChange={e => onChangeField('residentialAddress', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200/90 bg-[#f9fdfc] text-xs text-gray-800 font-medium focus:outline-none focus:border-[#0d9488] focus:bg-white transition"
              placeholder="Full home address"
            />
          </div>
        </div>
      </div>

      {/* Feedback Alert */}
      {saveSuccessMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <span>✓</span>
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Bottom Action Buttons matching screenshot */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onDiscard}
          className="py-2.5 px-6 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 active:scale-95 transition cursor-pointer"
        >
          Discard
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className="py-2.5 px-6 bg-[#0a3832] hover:bg-[#082e29] active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <span>Saving...</span>
          ) : (
            <>
              <span>Update Profile</span>
              <span>&rarr;</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

