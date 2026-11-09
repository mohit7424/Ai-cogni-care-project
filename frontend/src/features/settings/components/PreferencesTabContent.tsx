'use client';

import React from 'react';
import type { PreferenceSettings } from '../types/settings.types';

interface Props {
  preferences: PreferenceSettings;
  onChangePreference: <K extends keyof PreferenceSettings>(key: K, value: PreferenceSettings[K]) => void;
}

export default function PreferencesTabContent({
  preferences,
  onChangePreference,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">System & Accessibility Preferences</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Customize UI language, font sizes, and accessibility assistance.
        </p>
      </div>

      <div className="space-y-4">
        {/* Language Selection */}
        <div className="p-4 rounded-2xl border border-teal-100/70 bg-[#f9fdfc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-gray-800">Interface Language</h4>
            <p className="text-[11.5px] text-gray-500">Select language for cognitive assessments and menus.</p>
          </div>

          <select
            value={preferences.language}
            onChange={e => onChangePreference('language', e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0d9488]"
          >
            <option value="English (US)">English (US)</option>
            <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
            <option value="Spanish (Español)">Spanish (Español)</option>
          </select>
        </div>

        {/* Font Size Accessibility */}
        <div className="p-4 rounded-2xl border border-teal-100/70 bg-[#f9fdfc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-gray-800">Font & Text Scaling</h4>
            <p className="text-[11.5px] text-gray-500">Enlarge text for improved readability across cognitive exercises.</p>
          </div>

          <div className="flex items-center gap-1.5">
            {(['Standard', 'Large', 'Extra Large'] as const).map(size => (
              <button
                key={size}
                type="button"
                onClick={() => onChangePreference('fontSize', size)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  preferences.fontSize === size
                    ? 'bg-[#0d9488] text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast Mode */}
        <div className="p-4 rounded-2xl border border-teal-100/70 bg-[#f9fdfc] flex items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-gray-800">High Contrast Mode</h4>
            <p className="text-[11.5px] text-gray-500">Enhance borders and contrast ratios for visual ease.</p>
          </div>

          <button
            type="button"
            onClick={() => onChangePreference('highContrast', !preferences.highContrast)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
              preferences.highContrast ? 'bg-[#0d9488]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                preferences.highContrast ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

