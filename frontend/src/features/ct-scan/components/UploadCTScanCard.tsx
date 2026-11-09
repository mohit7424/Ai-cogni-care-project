'use client';

import React, { useRef, useState } from 'react';

interface Props {
  supportedFormats: string[];
  maxFileSize: string;
  complianceText: string;
  isUploading: boolean;
  uploadSuccessMessage: string | null;
  onUploadFile: (file: File) => void;
}

export default function UploadCTScanCard({
  supportedFormats,
  maxFileSize,
  complianceText,
  isUploading,
  uploadSuccessMessage,
  onUploadFile,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUploadFile(e.dataTransfer.files[0]);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      onUploadFile(e.target.files[0]);
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".dcm,.dicom,.jpg,.jpeg,.png,.pdf"
        className="hidden"
      />

      {/* Main Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full py-10 px-6 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
          isDragging
            ? 'border-[#0d9488] bg-teal-50/70 scale-[1.01]'
            : 'border-teal-200/90 bg-[#fbfdfc] hover:bg-[#f3faf7]'
        }`}
      >
        {/* Cloud Upload Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#e6f7f3] text-[#0d9488] flex items-center justify-center mb-3 shadow-inner">
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Upload CT Scan
        </h3>

        {/* Subtitle with clickable browse link */}
        <p className="text-xs text-gray-500 mt-1">
          Drag & drop your file here or{' '}
          <span className="text-[#0d9488] underline font-semibold">click to browse</span>
        </p>

        {/* Supported Formats Tag */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50/80 border border-teal-100 text-[10.5px] font-medium text-gray-600">
          <span>Supported formats:</span>
          <span className="font-semibold text-gray-700">{supportedFormats.join(', ')}</span>
        </div>

        {/* Uploading Spinner Feedback */}
        {isUploading && (
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#0d9488]">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Processing and analyzing volumetric slices...</span>
          </div>
        )}

        {/* Upload Success Feedback */}
        {uploadSuccessMessage && (
          <div className="mt-4 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
            <span>✓</span>
            <span>{uploadSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Card Footer: HIPAA & Max Size matching screenshot */}
      <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-gray-400 font-medium">
        <span>{complianceText}</span>
        <span>{maxFileSize}</span>
      </div>
    </div>
  );
}

