'use client';

import { useState, useCallback } from 'react';
import type {
  SafetyPageData,
  TrustedContactItem,
  SafetyFeatureItem,
  SafetyFeatureKey,
} from '../types/safety.types';
import {
  getSafetyData,
  toggleSafetyFeature,
  addTrustedContact,
  triggerEmergencySos,
} from '../services/safetyService';
import { mockSafetyData } from '../data/safety.data';

export function useSafety() {
  const [data, setData] = useState<SafetyPageData>(mockSafetyData);
  const [contacts, setContacts] = useState<TrustedContactItem[]>(
    mockSafetyData.contacts
  );
  const [features, setFeatures] = useState<SafetyFeatureItem[]>(
    mockSafetyData.features
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState<boolean>(false);
  const [callingContact, setCallingContact] = useState<TrustedContactItem | null>(
    null
  );
  const [sosStatus, setSosStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getSafetyData();
      if (res && res.contacts) {
        setData(res);
        setContacts(res.contacts);
        setFeatures(res.features);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggleFeature = useCallback(
    async (featureId: SafetyFeatureKey) => {
      const feature = features.find(item => item.id === featureId);
      if (!feature) return;

      const enabled = !feature.enabled;
      setFeatures(prev =>
        prev.map(f => (f.id === featureId ? { ...f, enabled } : f))
      );
      await toggleSafetyFeature(featureId, enabled);
    },
    [features]
  );

  const handleAddContact = useCallback(
    async (contact: Omit<TrustedContactItem, 'id'>) => {
      const created = await addTrustedContact(contact);
      setContacts(prev => [...prev, created]);
    },
    []
  );

  const handleCallContact = useCallback((contact: TrustedContactItem) => {
    setCallingContact(contact);
    alert(`Calling ${contact.name} at ${contact.phone}...`);
  }, []);

  const handleTriggerEmergency = useCallback(async () => {
    setIsSosModalOpen(true);
    setSosStatus('Broadcasting high-priority SOS alert to caregivers and emergency services...');
    const result = await triggerEmergencySos();
    if (result.success) {
      setSosStatus(`Alert dispatched at ${result.dispatchedAt}. Caregivers auto-dialed.`);
    }
  }, []);

  const allActive = features.every(f => f.enabled);

  return {
    data,
    contacts,
    features,
    allActive,
    isAddModalOpen,
    setIsAddModalOpen,
    isSosModalOpen,
    setIsSosModalOpen,
    callingContact,
    sosStatus,
    isLoading,
    handleToggleFeature,
    handleAddContact,
    handleCallContact,
    handleTriggerEmergency,
    refetch,
  };
}
