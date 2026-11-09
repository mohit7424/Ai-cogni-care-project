import { mockSettingsData } from '../data/settings.data';
import type { SettingsPageData, UserProfileData } from '../types/settings.types';

export const settingsService = {
  async getSettings(): Promise<SettingsPageData> {
    return Promise.resolve(mockSettingsData);
  },

  async updateProfile(profile: UserProfileData): Promise<UserProfileData> {
    return Promise.resolve(profile);
  },
};

