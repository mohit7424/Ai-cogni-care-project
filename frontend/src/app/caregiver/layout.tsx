'use client';
import React from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { caregiverNavItems } from '@/features/caregiver/components/CaregiverNavItems';

export default function CaregiverLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      userName="Maya Sharma"
      navItems={caregiverNavItems}
      user={{
        name: 'Maya Sharma',
        role: 'Primary Caregiver',
        initials: 'MS',
      }}
    >
      {children}
    </DashboardLayout>
  );
}
