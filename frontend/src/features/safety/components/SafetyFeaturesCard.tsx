'use client';

import React from 'react';
import type { SafetyFeatureItem, SafetyFeatureKey } from '../types/safety.types';

interface Props {
  features: SafetyFeatureItem[];
  allActive: boolean;
  onToggleFeature: (id: SafetyFeatureKey) => void;
}

export default function SafetyFeaturesCard({
  features,
  allActive,
  onToggleFeature,
}: Props) {
  function renderFeatureIcon(type: SafetyFeatureItem['iconType']) {
    switch (type) {
      case 'location':
        return (
          <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        );
      case 'assistance':
        return (
          <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        );
      case 'alerts':
        return (
          <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        );
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-sm font-bold">
            🛡️
          </div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Safety Features
          </h2>
        </div>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs ${
            allActive
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${allActive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span>{allActive ? 'All Active' : 'Partially Active'}</span>
        </span>
      </div>

      {/* 3 Features List matching screenshot */}
      <div className="space-y-4">
        {features.map(f => (
          <div
            key={f.id}
            className="p-4 rounded-2xl border border-teal-100/70 bg-[#f9fdfc] flex items-center justify-between gap-4"
          >
            {/* Left: Icon in Rounded Box + Title & Description */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#e2f7f1] to-[#caefe4] flex items-center justify-center shrink-0 shadow-inner">
                {renderFeatureIcon(f.iconType)}
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-snug">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>

            {/* Right: Toggle Switch matching screenshot */}
            <button
              type="button"
              role="switch"
              aria-checked={f.enabled}
              onClick={() => onToggleFeature(f.id)}
              className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center shrink-0 cursor-pointer ${
                f.enabled ? 'bg-[#0d9488]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  f.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Automated checks active 24/7</span>
        <button
          type="button"
          className="text-xs font-bold text-[#0d9488] hover:underline cursor-pointer"
        >
          Configure thresholds
        </button>
      </div>
    </div>
  );
}

