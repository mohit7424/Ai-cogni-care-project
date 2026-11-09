'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function DashboardLayout({
  children,
  userName = 'Alex Parker',
  searchQuery,
  onSearchChange,
}: DashboardLayoutProps) {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#f8fcfa] dark:bg-[#061815] font-sans transition-colors duration-200">
      {/* Left Full-Height Sidebar */}
      <Sidebar />

      {/* Right Main Content Area (Full Width & Height) */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-[#f8fcfa] dark:bg-[#061815] transition-colors duration-200">
        {/* Sticky Top Navbar */}
        <Navbar
          userName={userName}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />

        {/* Scrollable Main Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="max-w-[1600px] mx-auto w-full space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
