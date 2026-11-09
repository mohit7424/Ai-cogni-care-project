'use client';

import React from 'react';
import { useSafety } from '../hooks/useSafety';
import {
  TrustedContactsCard,
  SafetyFeaturesCard,
  EmergencyBannerCard,
  AddContactModal,
  EmergencySosModal,
} from '../components';

export default function SafetyScreen() {
  const {
    data,
    contacts,
    features,
    allActive,
    isAddModalOpen,
    setIsAddModalOpen,
    isSosModalOpen,
    setIsSosModalOpen,
    sosStatus,
    handleToggleFeature,
    handleAddContact,
    handleCallContact,
    handleTriggerEmergency,
  } = useSafety();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] tracking-tight">
            {data.pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {data.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="text-xs font-bold text-[#0d9488] bg-white border border-teal-200/80 hover:bg-teal-50 px-4 py-2 rounded-xl shadow-2xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Manage Contacts</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Main 2-Column Grid: Trusted Contacts (Left) + Safety Features (Right) matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Trusted Contacts Card */}
        <div className="lg:col-span-6 flex flex-col">
          <TrustedContactsCard
            contacts={contacts}
            onCallContact={handleCallContact}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </div>

        {/* Right Column: Safety Features Card */}
        <div className="lg:col-span-6 flex flex-col">
          <SafetyFeaturesCard
            features={features}
            allActive={allActive}
            onToggleFeature={handleToggleFeature}
          />
        </div>
      </div>

      {/* Bottom Emergency SOS Card matching screenshot */}
      <div>
        <EmergencyBannerCard
          banner={data.emergencyBanner}
          onTriggerSos={handleTriggerEmergency}
        />
      </div>

      {/* Add Contact Modal Dialog */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddContact}
      />

      {/* Active SOS Response Modal */}
      <EmergencySosModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        statusMessage={sosStatus}
        contacts={contacts}
      />
    </div>
  );
}

