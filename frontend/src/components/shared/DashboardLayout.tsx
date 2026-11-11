'use client';

import React, { useState } from 'react';
import Sidebar, { NavItem } from './Sidebar';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  navItems?: NavItem[];
  user?: {
    name: string;
    role: string;
    initials: string;
  };
}

export default function DashboardLayout({
  children,
  userName = 'Alex Parker',
  searchQuery,
  onSearchChange,
  navItems,
  user,
}: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#f8fcfa] dark:bg-[#061815] font-sans transition-colors duration-200">
      {/* 1. Desktop Docked Sidebar (Visible on lg and larger screens) */}
      <div className="hidden lg:flex shrink-0 h-full">
        <Sidebar items={navItems} user={user} />
      </div>

      {/* 2. Mobile & Tablet Off-Canvas Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Slide-out Sidebar Drawer */}
          <div className="relative z-10 w-64 h-full shadow-2xl animate-in slide-in-from-left duration-200">
            <Sidebar
              items={navItems}
              user={user}
              onClose={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Right Main Content Area (Full Width on mobile, flexible on desktop) */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-[#f8fcfa] dark:bg-[#061815] transition-colors duration-200">
        {/* Sticky Top Navbar with hamburger toggle */}
        <Navbar
          userName={userName}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Scrollable Main Content Container */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-7 space-y-5">
          <div className="max-w-[1600px] mx-auto w-full space-y-5">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
