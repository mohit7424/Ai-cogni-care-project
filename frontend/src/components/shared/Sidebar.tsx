'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const defaultNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/dashboard',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'screening',
    label: 'Screening',
    href: '/dashboard/screening',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
  },
  {
    id: 'results',
    label: 'Results',
    href: '/dashboard/results',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: 'daily-support',
    label: 'Daily Support',
    href: '/dashboard/daily-support',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'medication',
    label: 'Medication',
    href: '/dashboard/medication',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
      </svg>
    ),
  },
  {
    id: 'safety',
    label: 'Safety',
    href: '/dashboard/safety',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'ct-scan',
    label: 'CT Scan',
    href: '/dashboard/ct-scan',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="3" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'mri',
    label: 'MRI',
    href: '/dashboard/mri',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

interface SidebarProps {
  items?: NavItem[];
  user?: {
    name: string;
    role: string;
    initials: string;
  };
}

export default function Sidebar({
  items = defaultNavItems,
  user = { name: 'Alex Parker', role: 'Patient', initials: 'AP' },
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-[#0a3832] text-white flex flex-col justify-between shrink-0 h-full p-4 border-r border-[#124d45]/40 select-none">
      <div>
        {/* Logo Brand Header */}
        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 pt-3 pb-7 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-[#0e8a7d] group-hover:bg-[#12b3a2] flex items-center justify-center text-white shadow-xs transition">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-white leading-tight">
              Cogni Care
            </h1>
            <p className="text-[9px] text-teal-300/80 tracking-wider uppercase font-semibold">
              CARE. CONNECT. THRIVE.
            </p>
          </div>
        </Link>

        {/* Navigation List with Next.js Links */}
        <nav className="space-y-1 px-1">
          {items.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-[#124d45] text-white shadow-xs font-semibold'
                    : 'text-teal-100/70 hover:bg-[#0d443c] hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-[#2dd4bf]' : 'text-teal-200/60'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Mini Profile Badge (Bottom) */}
      <div className="pt-4 border-t border-[#134941]/80 px-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center justify-between p-2.5 rounded-xl bg-[#0d443c]/70 hover:bg-[#0d443c] transition cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 font-bold text-xs ring-2 ring-teal-400/40 overflow-hidden">
              <span className="font-bold">{user.initials}</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white leading-tight">
                {user.name}
              </p>
              <p className="text-[10px] text-teal-300/80">{user.role}</p>
            </div>
          </div>
          <svg className="w-3.5 h-3.5 text-teal-300/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
