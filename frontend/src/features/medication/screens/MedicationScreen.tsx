'use client';

import React from 'react';
import { useMedication } from '../hooks/useMedication';
import {
  NextReminderCard,
  MedicationScheduleCard,
  CaregiverAdvisoryCard,
  AddMedicineModal,
} from '../components';

export default function MedicationScreen() {
  const {
    data,
    schedule,
    nextReminderTaken,
    completedDoses,
    totalDoses,
    isAddModalOpen,
    setIsAddModalOpen,
    handleMarkNextReminderAsTaken,
    handleToggleDoseStatus,
    handleAddMedication,
  } = useMedication();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Page Header matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
            {data.pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-0.5">
            {data.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] bg-white dark:bg-[#0c2b24] border border-teal-200/80 dark:border-[#154c40] hover:bg-teal-50 dark:hover:bg-[#124138] px-4 py-2 rounded-xl shadow-2xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>View All</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Main 2-Column Grid: Next Reminder (Left) + Medication Schedule (Right) matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Next Reminder Card */}
        <div className="lg:col-span-5 flex flex-col">
          <NextReminderCard
            reminder={data.nextReminder}
            isTaken={nextReminderTaken}
            onMarkAsTaken={handleMarkNextReminderAsTaken}
          />
        </div>

        {/* Right: Medication Schedule Card */}
        <div className="lg:col-span-7 flex flex-col">
          <MedicationScheduleCard
            schedule={schedule}
            completedCount={completedDoses}
            totalCount={totalDoses}
            dateBadge={data.dateBadge}
            onToggleStatus={handleToggleDoseStatus}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </div>
      </div>

      {/* Bottom Section: Caregiver Advisory & Dosage Notes matching screenshot */}
      <div>
        <CaregiverAdvisoryCard
          headerTitle={data.advisoryHeader}
          attribution={data.doctorAttribution}
          advisories={data.advisories}
        />
      </div>

      {/* Add Medication Dialog Modal */}
      <AddMedicineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMedication}
      />
    </div>
  );
}

