'use client';

import { useState, useCallback } from 'react';
import type { ResultsTrendsData } from '../types/results.types';
import {
  getResultsAndTrendsData,
  downloadClinicalSummaryPdf,
} from '../services/resultsService';
import { mockResultsData } from '../data/results.data';

interface UseResultsReturn {
  data: ResultsTrendsData;
  isLoading: boolean;
  timeframe: string;
  setTimeframe: (t: string) => void;
  handleDownloadPdf: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useResults(): UseResultsReturn {
  const [data, setData] = useState<ResultsTrendsData>(mockResultsData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<string>('Last 6 Months');

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getResultsAndTrendsData();
      setData(res);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownloadPdf = useCallback(async () => {
    try {
      await downloadClinicalSummaryPdf();
      alert('Clinical Summary PDF download initiated.');
    } catch {
      alert('Unable to download PDF at this moment.');
    }
  }, []);

  return {
    data,
    isLoading,
    timeframe,
    setTimeframe,
    handleDownloadPdf,
    refetch,
  };
}
