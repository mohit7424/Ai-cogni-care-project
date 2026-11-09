'use client';

import React, { useState } from 'react';

interface Props {
  onContinue: () => void;
  onCancel: () => void;
}

export default function Sub2Consent({ onContinue, onCancel }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 shadow-xs max-w-2xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Before You Begin
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Please review and agree to the following guidelines:
        </p>
      </div>

      {/* Checklist Box & Clipboard Icon */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#f8fcfa] border border-teal-100/70">
        <div className="space-y-4 flex-1">
          <div className="flex items-start gap-3">
            <span className="text-[#0d9488] font-bold text-sm shrink-0 mt-0.5">🛡</span>
            <p className="text-xs text-gray-700">Your data is secure and private.</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[#0d9488] font-bold text-sm shrink-0 mt-0.5">ℹ️</span>
            <p className="text-xs text-gray-700">
              This screening is for wellness support only, not a medical diagnosis.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[#0d9488] font-bold text-sm shrink-0 mt-0.5">☕</span>
            <p className="text-xs text-gray-700">You may take breaks anytime.</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[#0d9488] font-bold text-sm shrink-0 mt-0.5">🔇</span>
            <p className="text-xs text-gray-700">Use a quiet environment for best results.</p>
          </div>
        </div>

        {/* Shield Clipboard Graphic */}
        <div className="w-24 h-28 rounded-2xl bg-teal-50 border-2 border-teal-200/80 flex items-center justify-center shrink-0 shadow-xs">
          <span className="text-3xl">📋</span>
        </div>
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          className="w-4 h-4 rounded text-[#0d9488] border-gray-300 focus:ring-[#0d9488]"
        />
        <span>
          I agree to the <strong className="text-[#0d9488] font-semibold underline">terms</strong> and understand the information.
        </span>
      </label>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="py-2.5 px-5 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-xl transition cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!agreed}
          className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}

