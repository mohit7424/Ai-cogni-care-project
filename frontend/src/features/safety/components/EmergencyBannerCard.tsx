'use client';

import React from 'react';
import type { EmergencyBannerInfo } from '../types/safety.types';

interface Props {
  banner: EmergencyBannerInfo;
  onTriggerSos: () => void;
}

export default function EmergencyBannerCard({ banner, onTriggerSos }: Props) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-[#0d6e5a] to-[#0a4e40] text-white p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-5">
      {/* Left: Shield / Checked Icon & Text */}
      <div className="flex items-center gap-4 text-left">
        <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-white font-extrabold text-sm border border-white/20">
          ✓
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            {banner.heading}
          </h3>
          <p className="text-xs text-teal-100/80 mt-0.5 leading-relaxed">
            {banner.subheading}
          </p>
        </div>
      </div>

      {/* Right: Emergency SOS Action Button matching screenshot */}
      <button
        type="button"
        onClick={onTriggerSos}
        className="py-3 px-6 bg-white hover:bg-red-50 text-gray-900 font-extrabold text-xs sm:text-sm rounded-full shadow-lg transition flex items-center gap-2.5 shrink-0 cursor-pointer active:scale-95"
      >
        <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping inline-block" />
        <span className="tracking-wide text-rose-600 font-bold">{banner.buttonLabel}</span>
      </button>
    </div>
  );
}

