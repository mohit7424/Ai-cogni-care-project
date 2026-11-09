'use client';

import React from 'react';
import Link from 'next/link';
import { mockPatientProfile } from '../data/profile.data';

export default function ProfileScreen() {
  const profile = mockPatientProfile;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-teal-200 tracking-tight">
            Patient Health Profile
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Verified medical identification, clinical history, and designated care network.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="text-xs font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-[#0c2b24] border border-gray-200 dark:border-[#14483e] hover:bg-gray-50 dark:hover:bg-[#124138] px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>🖨️</span>
            <span>Print Health Card</span>
          </button>

          <Link
            href="/dashboard/settings"
            className="text-xs font-bold text-white bg-[#0a3832] hover:bg-[#082e29] px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>⚙️ Edit Settings</span>
          </Link>
        </div>
      </div>

      {/* Main Patient Identity Card */}
      <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#14483e] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar with Teal Ring */}
          <div className="relative w-24 h-24 rounded-full ring-4 ring-[#0d9488]/30 overflow-hidden shadow-md shrink-0 bg-teal-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {profile.name}
              </h2>
              <span className="text-[11px] font-bold text-[#0d9488] bg-[#e6f7f3] dark:bg-[#154d41] border border-teal-100 dark:border-[#1d5d51] px-3 py-0.5 rounded-full">
                ID: {profile.patientId}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
              <span>🎂 {profile.age} Years ({profile.gender})</span>
              <span>🩸 Blood Group: <strong className="text-gray-700 dark:text-gray-200">{profile.bloodGroup}</strong></span>
              <span>📅 Patient since {profile.memberSince}</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              📍 {profile.address}
            </p>
          </div>
        </div>

        {/* Status Pill Badge Right */}
        <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-[#123e34] border border-teal-100 dark:border-[#1b5b4d] text-center min-w-[180px]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
            Cognitive Assessment
          </p>
          <h3 className="text-base font-extrabold text-[#0a3832] dark:text-white mt-0.5">
            {profile.cognitiveStatus}
          </h3>
          <p className="text-[11px] text-[#0d9488] dark:text-[#2dd4bf] font-semibold mt-1">
            Latest MoCA: {profile.latestScore}
          </p>
        </div>
      </div>

      {/* 4 Health Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c2b24] border border-teal-100/70 dark:border-[#14483e] shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Latest MoCA Score
          </p>
          <h4 className="text-2xl font-extrabold text-[#0a3832] dark:text-teal-200">
            26 / 30
          </h4>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md inline-block">
            Within Normal Limits
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c2b24] border border-teal-100/70 dark:border-[#14483e] shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Medication Adherence
          </p>
          <h4 className="text-2xl font-extrabold text-[#0a3832] dark:text-teal-200">
            {profile.medicationAdherence}
          </h4>
          <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md inline-block">
            1 of 3 Doses Taken
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c2b24] border border-teal-100/70 dark:border-[#14483e] shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            CT Brain Slices
          </p>
          <h4 className="text-2xl font-extrabold text-[#0a3832] dark:text-teal-200">
            64 Slices
          </h4>
          <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md inline-block">
            0.2% Variance Stable
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c2b24] border border-teal-100/70 dark:border-[#14483e] shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            MRI Hippocampal Vol.
          </p>
          <h4 className="text-2xl font-extrabold text-[#0a3832] dark:text-teal-200">
            3.82 cm³
          </h4>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md inline-block">
            +0.2% vs Baseline
          </span>
        </div>
      </div>

      {/* 2-Column: Clinical Care Team (Left) + Emergency Contacts (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Care Team */}
        <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#14483e] p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-[#14483e]">
              <span className="text-xl">🩺</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Assigned Clinical Care Team
              </h3>
            </div>

            <div className="space-y-3">
              {profile.careTeam.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#f8fcfa] dark:bg-[#0f352c] border border-teal-100/70 dark:border-[#195146] space-y-1"
                >
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{doc.name}</h4>
                  <p className="text-[11px] font-semibold text-[#0d9488]">{doc.role}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-400">{doc.clinic}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-right">
            <Link
              href="/dashboard/screening"
              className="text-xs font-bold text-[#0d9488] hover:underline"
            >
              Consult care records &rarr;
            </Link>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#14483e] p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-[#14483e]">
              <span className="text-xl">🛡️</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Designated Family & Emergency Contacts
              </h3>
            </div>

            <div className="space-y-3">
              {profile.emergencyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#f8fcfa] dark:bg-[#0f352c] border border-teal-100/70 dark:border-[#195146] flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {contact.name}
                      </h4>
                      {contact.isPrimary && (
                        <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{contact.relationship}</p>
                    <p className="text-xs font-bold text-teal-800 dark:text-teal-300">{contact.phone}</p>
                  </div>

                  <a
                    href={`tel:${contact.phone}`}
                    className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-[#154d41] text-[#0d9488] hover:bg-teal-100 flex items-center justify-center transition text-sm cursor-pointer"
                  >
                    📞
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-right">
            <Link
              href="/dashboard/safety"
              className="text-xs font-bold text-[#0d9488] hover:underline"
            >
              Manage emergency settings &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

