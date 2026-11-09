export interface PatientProfileData {
  name: string;
  patientId: string;
  avatarUrl: string;
  age: number;
  gender: string;
  bloodGroup: string;
  memberSince: string;
  email: string;
  phone: string;
  address: string;
  cognitiveStatus: string;
  latestScore: string;
  medicationAdherence: string;
  careTeam: {
    name: string;
    role: string;
    clinic: string;
  }[];
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
    isPrimary: boolean;
  }[];
}

