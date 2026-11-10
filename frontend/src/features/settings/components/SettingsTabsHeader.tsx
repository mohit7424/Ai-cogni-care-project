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
    <div className="flex items-center gap-4 sm:gap-8 border-b border-gray-200/80 dark:border-[#154c40] overflow-x-auto pb-1 scrollbar-none">
      {tabs.map(tab => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelectTab(tab)}
            className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-semibold transition relative cursor-pointer whitespace-nowrap shrink-0 ${
              isActive
                ? 'text-[#0d9488] dark:text-[#2dd4bf]'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            {tab}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0d9488] dark:bg-[#2dd4bf] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

