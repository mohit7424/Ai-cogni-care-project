'use client';

import React from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { doctorNavItems } from '@/features/doctor/components/DoctorNavItems';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      userName="Dr. Sarah Jenkins"
      navItems={doctorNavItems}
      user={{
        name: 'Dr. Sarah Jenkins',
        role: 'Consultant Neurologist',
        initials: 'SJ',
      }}
    >
      {children}
    </DashboardLayout>
  );
}

