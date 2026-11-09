import { useState } from 'react';
import { mockSettingsData } from '../data/settings.data';
import type {
  SettingsTab,
  UserProfileData,
  PrivacySettings,
  NotificationSettings,
  PreferenceSettings,
} from '../types/settings.types';

export function useSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('Profile');
  const [profile, setProfile] = useState<UserProfileData>(mockSettingsData.profile);
  const [initialProfile, setInitialProfile] = useState<UserProfileData>(mockSettingsData.profile);
  const [privacy, setPrivacy] = useState<PrivacySettings>(mockSettingsData.privacy);
  const [notifications, setNotifications] = useState<NotificationSettings>(mockSettingsData.notifications);
  const [preferences, setPreferences] = useState<PreferenceSettings>(mockSettingsData.preferences);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  function handleProfileChange(field: keyof UserProfileData, value: string) {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleDiscard() {
    setProfile(initialProfile);
    setSaveSuccessMessage(null);
  }

  function handleUpdateProfile(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setInitialProfile(profile);
      setIsSaving(false);
      setSaveSuccessMessage('Profile information successfully updated!');
      setTimeout(() => setSaveSuccessMessage(null), 4000);
    }, 600);
  }

  function handleTogglePrivacy(key: keyof PrivacySettings) {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handleToggleNotification(key: keyof NotificationSettings) {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handlePreferenceChange<K extends keyof PreferenceSettings>(
    key: K,
    value: PreferenceSettings[K]
  ) {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  return {
    data: mockSettingsData,
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
  };
}

