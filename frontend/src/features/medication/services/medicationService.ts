import { authService } from '@/features/auth/services/authService';
import type {
  MedicationManagementData,
  MedicationDoseItem,
} from '../types/medication.types';
import { mockMedicationData } from '../data/medication.data';

export async function getMedicationData(): Promise<MedicationManagementData> {
  try {
    const res = await authService.get<MedicationManagementData>('/medication');
    if (res.data && res.data.schedule && res.data.schedule.length > 0) {
      return res.data;
    }
    return mockMedicationData;
  } catch {
    return mockMedicationData;
  }
}

export async function markDoseAsTaken(
  doseId: string
): Promise<{ success: boolean; doseId: string }> {
  try {
    const res = await authService.post<{ success: boolean; doseId: string }>(
      `/medication/${doseId}/taken`,
      {}
    );
    return res.data;
  } catch {
    return { success: true, doseId };
  }
}

export async function createNewMedicationDose(
  dose: Omit<MedicationDoseItem, 'id'>
): Promise<MedicationDoseItem> {
  try {
    const res = await authService.post<MedicationDoseItem>('/medication', dose);
    return res.data;
  } catch {
    return {
      ...dose,
      id: `dose-${Date.now()}`,
    };
  }
}

