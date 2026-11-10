'use client';

import React from 'react';
import { useSafety } from '../hooks/useSafety';
import {
  ManualSosBannerCard,
  TrustedContactsTableCard,
  RecentSafetyAlertsCard,
  HowItWorksCard,
  SendSafetyAlertModal,
  AddContactModal,
  EditContactModal,
  AlertDetailsModal,
} from '../components';

export default function SafetyScreen() {
  const {
    data,
    contacts,
    allContactsCount,
    recentAlerts,
    searchContactQuery,
    setSearchContactQuery,
    isSosConfirmOpen,
    isAddModalOpen,
    setIsAddModalOpen,
    editingContact,
    selectedAlert,
    isDetailsModalOpen,
    isSendingSos,
    sosSentFeedback,
    setSosSentFeedback,
    handleOpenSosConfirm,
    handleCloseSosConfirm,
    handleConfirmSendSos,
    handleAddContact,
    handleStartEditContact,
    handleSaveEditContact,
    handleCancelEdit,
    handleDeleteContact,
    handleCallForHelp,
    handleViewDetails,
    handleCloseDetails,
  } = useSafety();

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1500px] mx-auto pb-10 px-1 sm:px-2">
      {/* Page Title & Subtitle Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
          {data.pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-1">
          {data.subtitle}
        </p>
      </div>

      {/* 1. Top Card: Manual SOS Alert Banner with Responsive Layout */}
      <ManualSosBannerCard
        info={data.manualSos}
        onOpenSosModal={handleOpenSosConfirm}
        onCallForHelp={handleCallForHelp}
        feedbackMessage={sosSentFeedback}
        onDismissFeedback={() => setSosSentFeedback(null)}
      />

      {/* 2. Middle Card: Trusted Contacts (Desktop Table + Mobile Cards + Search & Edit) */}
      <TrustedContactsTableCard
        contacts={contacts}
        allCount={allContactsCount}
        searchQuery={searchContactQuery}
        onSearchChange={setSearchContactQuery}
        onAddContact={() => setIsAddModalOpen(true)}
        onEditContact={handleStartEditContact}
        onDeleteContact={handleDeleteContact}
      />

      {/* 3. Bottom Row: Recent Safety Alerts (Left) + How It Works (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left Column: Recent Safety Alerts Table */}
        <div className="lg:col-span-8 flex flex-col">
          <RecentSafetyAlertsCard
            alerts={recentAlerts}
            onViewDetails={handleViewDetails}
          />
        </div>

        {/* Right Column: How It Works Steps */}
        <div className="lg:col-span-4 flex flex-col">
          <HowItWorksCard steps={data.howItWorks} />
        </div>
      </div>

      {/* Modal 1: Confirmation Send Safety Alert Dialog with 5s countdown option */}
      <SendSafetyAlertModal
        isOpen={isSosConfirmOpen}
        isSending={isSendingSos}
        onClose={handleCloseSosConfirm}
        onConfirm={handleConfirmSendSos}
      />

      {/* Modal 2: Add Trusted Contact Modal */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddContact}
      />

      {/* Modal 3: Edit Contact Modal */}
      <EditContactModal
        isOpen={!!editingContact}
        contact={editingContact}
        onClose={handleCancelEdit}
        onSave={handleSaveEditContact}
      />

      {/* Modal 4: Alert Details Modal */}
      <AlertDetailsModal
        isOpen={isDetailsModalOpen}
        alertItem={selectedAlert}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
