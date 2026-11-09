'use client';

import React from 'react';
import { useSettings } from '../hooks/useSettings';
import {
  SettingsTabsHeader,
  ProfileTabContent,
  PrivacyTabContent,
  NotificationsTabContent,
  PreferencesTabContent,
} from '../components';

export default function SettingsScreen() {
  const {
    data,
    activeTab,
    setActiveTab,
    profile,
    privacy,
    notifications,
    preferences,
    isSaving,
    saveSuccessMessage,
    handleProfileChange,
    handleDiscard,
    handleUpdateProfile,
    handleTogglePrivacy,
    handleToggleNotification,
    handlePreferenceChange,
  } = useSettings();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header matching screenshot */}
      <div className="pb-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] tracking-tight">
          {data.pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          {data.subtitle}
        </p>
      </div>

      {/* Tabs Row: Profile | Privacy | Notifications | Preferences */}
      <SettingsTabsHeader activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Settings Card Container matching screenshot */}
      <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs">
        {activeTab === 'Profile' && (
          <ProfileTabContent
            profile={profile}
            isSaving={isSaving}
            saveSuccessMessage={saveSuccessMessage}
            onChangeField={handleProfileChange}
            onDiscard={handleDiscard}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeTab === 'Privacy' && (
          <PrivacyTabContent
            privacy={privacy}
            onTogglePrivacy={handleTogglePrivacy}
          />
        )}

        {activeTab === 'Notifications' && (
          <NotificationsTabContent
            notifications={notifications}
            onToggleNotification={handleToggleNotification}
          />
        )}

        {activeTab === 'Preferences' && (
          <PreferencesTabContent
            preferences={preferences}
            onChangePreference={handlePreferenceChange}
          />
        )}
      </div>
    </div>
  );
}

