'use client';

import React from 'react';
import type { PrivacySettings } from '../types/settings.types';

interface Props {
  privacy: PrivacySettings;
  onTogglePrivacy: (key: keyof PrivacySettings) => void;
}

export default function PrivacyTabContent({ privacy, onTogglePrivacy }: Props) {
  const items: { key: keyof PrivacySettings; title: string; desc: string }[] = [
    {
      key: 'biometricLock',
      title: 'Biometric / PIN Access Lock',
      desc: 'Require biometric or PIN verification before accessing sensitive neuroimaging and cognitive reports.',
    },
    {
      key: 'hipaaAuditLogging',
      title: 'HIPAA Access Audit Trails',
      desc: 'Keep complete cryptographic logs of every report access, download, and external sync event.',
    },
    {
      key: 'caregiverDataSharing',
      title: 'Authorized Caregiver Access',
      desc: 'Allow your verified primary contacts (Priya Sharma) to view medication schedules and safety alerts.',
    },
    {
      key: 'anonymousAnalytics',
      title: 'Anonymous Research Analytics',
      desc: 'Contribute de-identified cognitive screening trends to non-profit geriatric research programs.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">Privacy & Data Governance</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Control how your neurological records, test results, and care data are shared.
        </p>
      </div>

      <div className="space-y-4">
        {items.map(item => {
          const isEnabled = privacy[item.key];
          return (
            <div
              key={item.key}
              className="p-4 rounded-2xl border border-teal-100/70 bg-[#f9fdfc] flex items-center justify-between gap-4"
            >
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-gray-800">{item.title}</h4>
                <p className="text-[11.5px] text-gray-500 max-w-xl">{item.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => onTogglePrivacy(item.key)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  isEnabled ? 'bg-[#0d9488]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                    isEnabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

