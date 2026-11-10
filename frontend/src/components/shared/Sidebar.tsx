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
    label: 'Dashboard',
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
    id: 'assessments',
    label: 'Assessments',
    href: '/dashboard/daily-support',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'ai-assistant',
    label: 'AI Wellness Assistant',
    href: '/dashboard/ai-assistant',
    icon: (
      <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        {/* Sparkles / Magic star icon */}
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M3 5h4" />
        <path d="M19 17v4" />
        <path d="M17 19h4" />
      </svg>
    ),
  },
  {
    id: 'safety',
    label: 'Safety & Trusted Contacts',
    href: '/dashboard/safety',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'results',
    label: 'Reports',
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
    id: 'ct-scan',
    label: 'CT Scan Analysis',
    href: '/dashboard/ct-scan',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: 'mri',
    label: 'MRI Analysis',
    href: '/dashboard/mri',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
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
  onClose?: () => void;
}

export default function Sidebar({
  items = defaultNavItems,
  user = { name: 'Alex Parker', role: 'Patient', initials: 'AP' },
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 sm:w-60 bg-[#0a3832] text-white flex flex-col justify-between shrink-0 h-full p-4 border-r border-[#124d45]/40 select-none overflow-y-auto">
      <div>
        {/* Logo Brand Header + Mobile Close Button */}
        <div className="flex items-center justify-between px-2 pt-2 pb-6">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
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

          {/* Close button for mobile drawer */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-teal-200 hover:text-white hover:bg-[#124d45] transition cursor-pointer"
              title="Close Navigation"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation List with Next.js Links */}
        <nav className="space-y-1 px-1">
          {items.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
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

      {/* Support Card & User Mini Profile Badge (Bottom) */}
      <div className="space-y-3 pt-3 border-t border-[#134941]/80 px-1 mt-6">
        {/* Supportive Health Card from Screenshot */}
        <div className="p-3 rounded-xl bg-[#0d443c]/70 border border-[#14574d]/50 flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-teal-100 leading-tight">
              Your Safety Matters
            </p>
            <p className="text-[9.5px] text-teal-300/80 mt-0.5 leading-snug">
              We&apos;re here to support you whenever you need it.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/profile"
          onClick={onClose}
          className="flex items-center justify-between p-2.5 rounded-xl bg-[#0d443c]/70 hover:bg-[#0d443c] transition cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 font-bold text-xs ring-2 ring-teal-400/40 overflow-hidden shrink-0">
              <span className="font-bold">{user.initials}</span>
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs font-semibold text-white leading-tight truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-teal-300/80 truncate">{user.role}</p>
            </div>
          </div>
          <svg className="w-3.5 h-3.5 text-teal-300/70 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
