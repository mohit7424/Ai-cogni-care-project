'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ResultsTrendsData } from '../types/results.types';
import {
  getResultsAndTrendsData,
  downloadClinicalSummaryPdf,
} from '../services/resultsService';

interface UseResultsReturn {
  data: ResultsTrendsData | null;
  isLoading: boolean;
  timeframe: string;
  setTimeframe: (t: string) => void;
  handleDownloadPdf: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useResults(): UseResultsReturn {
  const [data, setData] = useState<ResultsTrendsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeframe, setTimeframe] = useState<string>('Last 6 Months');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getResultsAndTrendsData();
      setData(res);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

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
    refetch: fetchData,
  };
}

