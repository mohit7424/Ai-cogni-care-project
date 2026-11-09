'use client';

import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#ecf7f5] p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-8">
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0b8b80] to-[#12b3a2] flex items-center justify-center text-white font-bold">
              CC
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Welcome to CogniCare</h1>
              <p className="text-xs text-gray-500">Your Cognitive Wellness Dashboard</p>
            </div>
          </div>

          <Link
            href="/auth/login"
            className="text-xs font-semibold text-[#0d9488] hover:underline"
          >
            Sign Out &rarr;
          </Link>
        </div>

        <div className="py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#0d9488] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">Authentication Successful!</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            You have successfully logged in. Dashboard features and cognitive care tools will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

