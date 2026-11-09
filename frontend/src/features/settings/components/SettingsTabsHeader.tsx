'use client';

import React from 'react';
import type { SettingsTab } from '../types/settings.types';

interface Props {
  activeTab: SettingsTab;
  onSelectTab: (tab: SettingsTab) => void;
}

const tabs: SettingsTab[] = ['Profile', 'Privacy', 'Notifications', 'Preferences'];

export default function SettingsTabsHeader({ activeTab, onSelectTab }: Props) {
  return (
    <div className="flex items-center gap-8 border-b border-gray-200/80">
      {tabs.map(tab => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelectTab(tab)}
            className={`pb-3 text-xs sm:text-sm font-semibold transition relative cursor-pointer ${
              isActive
                ? 'text-[#0d9488]'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0d9488] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

