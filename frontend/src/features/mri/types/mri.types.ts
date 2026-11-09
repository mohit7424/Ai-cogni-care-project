export type StepStatus = 'Completed' | 'Running' | 'Pending';

export interface PipelineStep {
  id: string;
  title: string;
  status: StepStatus;
}

export interface NeuroMetric {
  id: string;
  label: string;
  badge: string;
  badgeType: 'emerald' | 'gray' | 'amber';
  value: string;
  subtext: string;
  isPositiveChange?: boolean;
}

export interface MRIScanRecord {
  id: string;
  date: string;
  time: string;
  scanType: string;
  status: 'Completed' | 'In Progress' | 'Archived';
  fileName: string;
  fileSize: string;
}

export interface MRIAnalysisData {
  pageTitle: string;
  subtitle: string;
  dicomBadge: string;
  supportedFormats: string[];
  complianceText: string;
  maxSize: string;
  analysisStatus: {
    percentage: number;
    badgeLabel: string;
    headline: string;
    subheadline: string;
    pipelineSteps: PipelineStep[];
  };
  comparisonMetrics: {
    title: string;
    subtitle: string;
    baselineDate: string;
    metrics: NeuroMetric[];
    physicianRemarks: string;
  };
  historyScans: MRIScanRecord[];
}

