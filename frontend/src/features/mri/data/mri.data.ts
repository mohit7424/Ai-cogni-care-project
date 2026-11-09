import type { MRIAnalysisData } from '../types/mri.types';

export const mockMRIData: MRIAnalysisData = {
  pageTitle: 'MRI Analysis',
  subtitle: 'Upload and track your MRI analysis.',
  dicomBadge: 'DICOM v3 Ready',
  supportedFormats: ['DICOM', 'NIfTI', 'JPG', 'PNG'],
  complianceText: 'End-to-end encrypted HIPAA compliant storage',
  maxSize: 'Max size: 250MB',
  analysisStatus: {
    percentage: 75,
    badgeLabel: 'In Progress',
    headline: 'Processing...',
    subheadline: 'Please wait while AI segments neuroimaging slices',
    pipelineSteps: [
      {
        id: 's-1',
        title: 'Slice Normalization & Alignment',
        status: 'Completed',
      },
      {
        id: 's-2',
        title: 'Voxel-based Morphometry',
        status: 'Completed',
      },
      {
        id: 's-3',
        title: 'Hippocampal Boundary Detection',
        status: 'Running',
      },
    ],
  },
  comparisonMetrics: {
    title: 'Prior MRI Comparison & Neuro-Volumetric Metrics',
    subtitle: 'Longitudinal evaluation tracking structural brain changes across sequential scans.',
    baselineDate: '14 Mar 2025',
    metrics: [
      {
        id: 'nm-1',
        label: 'Hippocampal Volume',
        badge: 'Stable',
        badgeType: 'emerald',
        value: '3.82 cm³',
        subtext: '↑ +0.2% vs previous period',
        isPositiveChange: true,
      },
      {
        id: 'nm-2',
        label: 'Cortical Thickness Mean',
        badge: 'Normal',
        badgeType: 'emerald',
        value: '2.48 mm',
        subtext: 'Within expected age reference (94th percentile)',
      },
      {
        id: 'nm-3',
        label: 'Ventricular Volume',
        badge: 'Expected',
        badgeType: 'gray',
        value: '28.4 mL',
        subtext: 'No significant enlargement observed',
      },
    ],
    physicianRemarks:
      'The current scan progression indicates high stability compared to 6 months ago. The hippocampal volumetric parameters remain solidly within standard reference deviations. Review scheduled with neurologist upon full processing completion.',
  },
  historyScans: [
    {
      id: 'mri-901',
      date: '08 Nov 2026',
      time: '11:45 AM',
      scanType: '3D T1-Weighted MPRAGE Brain MRI',
      status: 'In Progress',
      fileName: 'mri_brain_t1_nov2026.nii',
      fileSize: '142.5 MB',
    },
    {
      id: 'mri-842',
      date: '10 May 2026',
      time: '03:20 PM',
      scanType: 'Structural & FLAIR Neuro-Sequence',
      status: 'Completed',
      fileName: 'mri_flair_may2026.dcm',
      fileSize: '198.2 MB',
    },
    {
      id: 'mri-710',
      date: '14 Mar 2025',
      time: '09:15 AM',
      scanType: 'Baseline Neuro-Volumetric MRI',
      status: 'Completed',
      fileName: 'mri_baseline_mar2025.dcm',
      fileSize: '184.0 MB',
    },
  ],
};

