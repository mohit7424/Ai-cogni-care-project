'use client';

import { useState, useCallback, useEffect } from 'react';
import type {
  SafetyPageData,
  TrustedContactItem,
  RecentSafetyAlertItem,
} from '../types/safety.types';
import {
  getSafetyData,
  addTrustedContact,
  deleteTrustedContact,
  triggerEmergencySos,
} from '../services/safetyService';
import { mockSafetyData } from '../data/safety.data';

const STORAGE_CONTACTS_KEY = 'cogni_safety_contacts_v1';
const STORAGE_ALERTS_KEY = 'cogni_safety_alerts_v1';

export function useSafety() {
  const [data, setData] = useState<SafetyPageData>(mockSafetyData);
  const [contacts, setContacts] = useState<TrustedContactItem[]>(mockSafetyData.contacts);
  const [recentAlerts, setRecentAlerts] = useState<RecentSafetyAlertItem[]>(mockSafetyData.recentAlerts);
  const [searchContactQuery, setSearchContactQuery] = useState<string>('');
  
  // Modals state
  const [isSosConfirmOpen, setIsSosConfirmOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingContact, setEditingContact] = useState<TrustedContactItem | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<RecentSafetyAlertItem | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  
  // SOS execution state
  const [isSendingSos, setIsSendingSos] = useState<boolean>(false);
  const [sosSentFeedback, setSosSentFeedback] = useState<string | null>(null);

  // Restore from LocalStorage on mount without triggering cascading render
  useEffect(() => {
    const restoreTimer = setTimeout(() => {
      try {
        const savedContacts = localStorage.getItem(STORAGE_CONTACTS_KEY);
        if (savedContacts) {
          const parsed = JSON.parse(savedContacts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setContacts(parsed);
          }
        }

        const savedAlerts = localStorage.getItem(STORAGE_ALERTS_KEY);
        if (savedAlerts) {
          const parsed = JSON.parse(savedAlerts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRecentAlerts(parsed);
          }
        }
      } catch {
        // LocalStorage unavailable, use defaults
      }
    }, 0);

    return () => clearTimeout(restoreTimer);
  }, []);

  // Save to LocalStorage helper
  const saveContactsToStorage = (updated: TrustedContactItem[]) => {
    setContacts(updated);
    try {
      localStorage.setItem(STORAGE_CONTACTS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const saveAlertsToStorage = (updated: RecentSafetyAlertItem[]) => {
    setRecentAlerts(updated);
    try {
      localStorage.setItem(STORAGE_ALERTS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const refetch = useCallback(async () => {
    try {
      const res = await getSafetyData();
      if (res && res.contacts) {
        setData(res);
        saveContactsToStorage(res.contacts);
        saveAlertsToStorage(res.recentAlerts);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleOpenSosConfirm = useCallback(() => {
    setIsSosConfirmOpen(true);
  }, []);

  const handleCloseSosConfirm = useCallback(() => {
    setIsSosConfirmOpen(false);
  }, []);

  const handleConfirmSendSos = useCallback(async () => {
    setIsSendingSos(true);
    try {
      await triggerEmergencySos();
      
      const newAlert: RecentSafetyAlertItem = {
        id: `SA-00${Math.floor(125 + Math.random() * 50)}`,
        triggeredAt: 'Just now',
        status: 'Triggered',
        smsStatus: 'SMS Sent',
        contactsNotified: `${contacts.length}/${contacts.length}`,
        location: 'Current GPS Coordinates broadcasted (Active Accuracy 5m)',
      };
      
      const updatedAlerts = [newAlert, ...recentAlerts];
      saveAlertsToStorage(updatedAlerts);
      
      setSosSentFeedback(`Emergency Alert dispatched! SMS delivered to ${contacts.length} trusted contacts.`);
      setIsSosConfirmOpen(false);

      setTimeout(() => {
        setSosSentFeedback(null);
      }, 7000);
    } finally {
      setIsSendingSos(false);
    }
  }, [contacts.length, recentAlerts]);

  const handleAddContact = useCallback(
    async (contactData: Omit<TrustedContactItem, 'id' | 'status' | 'initials'>) => {
      const initials = contactData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const created = await addTrustedContact({
        ...contactData,
        status: 'Verified',
        initials,
      });

      const updated = [...contacts, created];
      saveContactsToStorage(updated);
      setIsAddModalOpen(false);
    },
    [contacts]
  );

  const handleStartEditContact = useCallback((contact: TrustedContactItem) => {
    setEditingContact(contact);
  }, []);

  const handleSaveEditContact = useCallback((updatedContact: TrustedContactItem) => {
    const updated = contacts.map(c => (c.id === updatedContact.id ? updatedContact : c));
    saveContactsToStorage(updated);
    setEditingContact(null);
  }, [contacts]);

  const handleCancelEdit = useCallback(() => {
    setEditingContact(null);
  }, []);

  const handleDeleteContact = useCallback((id: string) => {
    if (confirm('Are you sure you want to remove this trusted contact?')) {
      void deleteTrustedContact(id);
      const updated = contacts.filter(c => c.id !== id);
      saveContactsToStorage(updated);
    }
  }, [contacts]);

  const handleCallForHelp = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.href = data.manualSos.helplinePhone || 'tel:112';
    }
  }, [data.manualSos.helplinePhone]);

  const handleViewDetails = useCallback((alertItem: RecentSafetyAlertItem) => {
    setSelectedAlert(alertItem);
    setIsDetailsModalOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedAlert(null);
    setIsDetailsModalOpen(false);
  }, []);

  // Filter contacts by query
  const filteredContacts = contacts.filter(c => {
    if (!searchContactQuery.trim()) return true;
    const q = searchContactQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.relationship.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  return {
    data,
    contacts: filteredContacts,
    allContactsCount: contacts.length,
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
    refetch,
  };
}
