export interface CTScanRecord {
  id: string;
  uploadedDate: string;
  uploadedTime: string;
  status: 'Completed' | 'Processing' | 'Failed';
  scanType: string;
  slicesAnalyzed: string;
  thumbnailUrl?: string;
  fileName?: string;
  fileSize?: string;
}

export interface DiagnosticMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  statusColor?: 'emerald' | 'gray' | 'amber';
}

export interface DiagnosticSummary {
  title: string;
  subtitle: string;
  radiologistVerified: boolean;
  radiologistName: string;
  metrics: DiagnosticMetric[];
}

export interface CTScanPageData {
  pageTitle: string;
  subtitle: string;
  currentScan: CTScanRecord;
  diagnosticSummary: DiagnosticSummary;
  supportedFormats: string[];
  maxFileSize: string;
  complianceText: string;
  scanHistory: CTScanRecord[];
}

