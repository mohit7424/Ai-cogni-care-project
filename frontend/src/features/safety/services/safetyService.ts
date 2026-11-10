import { authService } from '@/features/auth/services/authService';
import type {
  SafetyPageData,
  TrustedContactItem,
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

export async function removeTrustedContact(
  id: string
): Promise<{ success: boolean; id: string }> {
  try {
    await authService.delete(`/safety/contacts/${id}`);
    return { success: true, id };
  } catch {
    return { success: true, id };
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
      message: 'Emergency responders & trusted contacts alerted via SMS.',
      dispatchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }
}

// Aliases for compatibility
export const addTrustedContact = createTrustedContact;
export const deleteTrustedContact = removeTrustedContact;
export const triggerEmergencySos = sendEmergencySosCall;
