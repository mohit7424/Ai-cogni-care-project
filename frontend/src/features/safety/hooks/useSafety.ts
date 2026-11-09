'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  SafetyPageData,
  TrustedContactItem,
  SafetyFeatureItem,
  SafetyFeatureKey,
} from '../types/safety.types';
import {
  getSafetyData,
  updateFeatureToggle,
  createTrustedContact,
  sendEmergencySosCall,
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

  const fetchData = useCallback(async () => {
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

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleToggleFeature = useCallback(
    async (featureId: SafetyFeatureKey) => {
      setFeatures(prev =>
        prev.map(f => (f.id === featureId ? { ...f, enabled: !f.enabled } : f))
      );
      const target = features.find(f => f.id === featureId);
      if (target) {
        await updateFeatureToggle(featureId, !target.enabled);
      }
    },
    [features]
  );

  const handleAddContact = useCallback(
    async (newContact: Omit<TrustedContactItem, 'id'>) => {
      const created = await createTrustedContact(newContact);
      setContacts(prev => [...prev, created]);
      setIsAddModalOpen(false);
    },
    []
  );

  const handleCallContact = useCallback((contact: TrustedContactItem) => {
    setCallingContact(contact);
  }, []);

  const handleTriggerEmergency = useCallback(async () => {
    setIsSosModalOpen(true);
    const res = await sendEmergencySosCall();
    setSosStatus(res.message);
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
    setCallingContact,
    sosStatus,
    handleToggleFeature,
    handleAddContact,
    handleCallContact,
    handleTriggerEmergency,
    isLoading,
    refetch: fetchData,
  };
}

