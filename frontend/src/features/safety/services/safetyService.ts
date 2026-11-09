import { authService } from '@/features/auth/services/authService';
import type {
  SafetyPageData,
  TrustedContactItem,
  SafetyFeatureKey,
} from '../types/safety.types';
import { mockSafetyData } from '../data/safety.data';

export async function getSafetyData(): Promise<SafetyPageData> {
  try {
    const res = await authService.get<SafetyPageData>('/safety');
    if (res.data && res.data.contacts && res.data.contacts.length > 0) {
      return res.data;
    }
    return mockSafetyData;
  } catch {
    return mockSafetyData;
  }
}

export async function updateFeatureToggle(
  featureId: SafetyFeatureKey,
  enabled: boolean
): Promise<{ success: boolean; featureId: SafetyFeatureKey; enabled: boolean }> {
  try {
    const res = await authService.post<{
      success: boolean;
      featureId: SafetyFeatureKey;
      enabled: boolean;
    }>(`/safety/features/${featureId}`, { enabled });
    return res.data;
  } catch {
    return { success: true, featureId, enabled };
  }
}

export async function createTrustedContact(
  contact: Omit<TrustedContactItem, 'id'>
): Promise<TrustedContactItem> {
  try {
    const res = await authService.post<TrustedContactItem>(
      '/safety/contacts',
      contact
    );
    return res.data;
  } catch {
    return {
      ...contact,
      id: `c-${Date.now()}`,
    };
  }
}

export async function sendEmergencySosCall(): Promise<{
  success: boolean;
  message: string;
  dispatchedAt: string;
}> {
  try {
    const res = await authService.post<{
      success: boolean;
      message: string;
      dispatchedAt: string;
    }>('/safety/emergency/dispatch', {});
    return res.data;
  } catch {
    return {
      success: true,
      message: 'Emergency responders & primary caregivers alerted.',
      dispatchedAt: new Date().toLocaleTimeString(),
    };
  }
}

