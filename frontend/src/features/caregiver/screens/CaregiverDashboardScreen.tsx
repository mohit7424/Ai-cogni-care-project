'use client';

import { useCaregiver } from '../hooks/useCaregiver';

export default function CaregiverDashboardScreen() {
  const { data, selectedPatient, selectedPatientId, setSelectedPatientId } = useCaregiver();

  const activityIcons: Record<string, string> = {
    screening: '🧠',
    medication: '💊',
    activity: '⚡',
    alert: '🔔',
    appointment: '📅',
  };

  const activityDotColors: Record<string, string> = {
    screening: 'bg-purple-500',
    medication: 'bg-teal-500',
    activity: 'bg-amber-500',
    alert: 'bg-red-500',
    appointment: 'bg-blue-500',
  };

  const severityConfig: Record<string, { bg: string; text: string; dot: string }> = {
    high: { bg: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' },
    medium: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
    low: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  };

  const categoryColors: Record<string, string> = {
    Cognitive: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    Physical: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    Medication: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    Wellness: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  };

  const statusColors: Record<string, string> = {
    Confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d4f1ec] via-[#e8f7f4] to-[#dbedf5] dark:from-[#061815] dark:via-[#071e1b] dark:to-[#061815] p-4 md:p-6 space-y-6">

      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a3832] via-[#0d9488] to-[#0f766e] p-6 sm:p-8 text-white shadow-2xl shadow-teal-900/30">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-teal-300/20 blur-2xl pointer-events-none" />
        <div className="absolute top-4 right-32 w-20 h-20 rounded-full bg-emerald-300/15 blur-xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-2xl font-extrabold shadow-lg">
                {data.caregiver.initials}
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
            </div>
            <div>
              <p className="text-teal-200 text-sm font-medium tracking-wide">Welcome back 👋</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{data.caregiver.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold capitalize border border-white/20">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  {data.caregiver.relationship}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right sm:text-right">
            <p className="text-teal-200 text-xs font-medium uppercase tracking-widest mb-1">Today</p>
            <p className="text-lg sm:text-xl font-extrabold leading-tight">{data.dateLabel}</p>
            <p className="text-teal-300 text-xs mt-1 opacity-80">Last updated: {data.lastUpdatedLabel}</p>
          </div>
        </div>

        {/* Quick care message */}
        <div className="relative mt-5 pt-4 border-t border-white/20 flex items-center gap-2">
          <span className="text-lg">✨</span>
          <p className="text-sm text-teal-100 font-medium">
            You&apos;re making a difference every day. Keep up the great care!
          </p>
        </div>
      </div>

      {/* ── Patient Selector ── */}
      {data.linkedPatients.length > 1 && (
        <div className="rounded-3xl bg-white dark:bg-[#0c2b24] shadow-lg shadow-teal-900/5 border border-teal-100/60 dark:border-[#154c40] p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-[#154c40] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <p className="text-sm font-bold text-gray-700 dark:text-teal-200">Switch Patient</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.linkedPatients.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selectedPatientId === p.id
                    ? 'bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-50 dark:bg-[#154c40] text-[#0d9488] dark:text-teal-200 hover:bg-teal-100 dark:hover:bg-[#1a5c4e]'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
          {selectedPatient && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-[#0f352c] dark:to-[#0a2923] border border-teal-100 dark:border-[#154c40]">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] flex items-center justify-center text-sm font-extrabold text-white shadow-md">
                {selectedPatient.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 dark:text-white">{selectedPatient.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold inline-flex items-center gap-1 ${
                  selectedPatient.linkStatus === 'active'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : selectedPatient.linkStatus === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                    selectedPatient.linkStatus === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  {selectedPatient.linkStatus}
                </span>
              </div>
              <svg className="w-5 h-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* ── Summary Stats (Doctor-Style Metrics Grid) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {[
          {
            id: 'patients',
            title: 'Total Patients',
            value: data.summaryStats.totalLinkedPatients,
            badge: `${data.summaryStats.totalLinkedPatients} Linked`,
            badgeColor: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800',
            subtext: 'Under your active care',
            iconBg: 'bg-teal-50 dark:bg-[#0e3a31]',
            icon: (
              <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              </svg>
            ),
          },
          {
            id: 'alerts',
            title: 'Active Alerts',
            value: data.summaryStats.activeAlerts,
            badge: data.summaryStats.activeAlerts > 0 ? 'Needs Action' : 'All Clear',
            badgeColor: data.summaryStats.activeAlerts > 0
              ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
            subtext: 'Requires immediate attention',
            iconBg: 'bg-rose-50 dark:bg-rose-950/40',
            icon: (
              <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            ),
          },
          {
            id: 'tasks',
            title: 'Pending Tasks',
            value: data.summaryStats.pendingTasks,
            badge: 'High Priority',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900',
            subtext: 'Tasks awaiting completion',
            iconBg: 'bg-amber-50 dark:bg-amber-950/40',
            icon: (
              <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            ),
          },
          {
            id: 'appointments',
            title: "Today's Appts",
            value: data.summaryStats.upcomingAppointments,
            badge: `${data.summaryStats.upcomingAppointments} Scheduled`,
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
            subtext: 'Upcoming for your patients',
            iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
            icon: (
              <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            ),
          },
          {
            id: 'activities',
            title: 'Activities Due',
            value: data.summaryStats.activitiesDueToday,
            badge: 'Due Today',
            badgeColor: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800',
            subtext: 'Cognitive & physical tasks',
            iconBg: 'bg-violet-50 dark:bg-violet-950/40',
            icon: (
              <svg className="w-5 h-5 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            ),
          },
          {
            id: 'meds',
            title: 'Medications Due',
            value: data.summaryStats.medicationsDue,
            badge: 'Timeline',
            badgeColor: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800',
            subtext: 'Scheduled doses today',
            iconBg: 'bg-pink-50 dark:bg-pink-950/40',
            icon: (
              <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
              </svg>
            ),
          },
        ].map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-2xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] hover:border-teal-300 dark:hover:border-teal-600 transition shadow-xs flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${c.iconBg}`}>
                {c.icon}
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${c.badgeColor}`}>
                {c.badge}
              </span>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight group-hover:text-[#0d9488] transition">
                {c.value}
              </h3>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">{c.title}</p>
              <p className="text-[10.5px] text-gray-400 dark:text-gray-400 mt-0.5 truncate">{c.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Active Alerts ── */}
      {data.activeAlerts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
              <span className="text-sm">🚨</span>
            </div>
            <h2 className="text-base font-extrabold text-gray-800 dark:text-white">Active Alerts</h2>
            <span className="ml-auto px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-bold">
              {data.activeAlerts.length}
            </span>
          </div>
          <div className="space-y-3">
            {data.activeAlerts.map((alert) => {
              const sev = severityConfig[alert.severity] ?? severityConfig.low;
              return (
                <div
                  key={alert.id}
                  className="rounded-2xl bg-white dark:bg-[#0c2b24] border border-red-100 dark:border-red-900/40 shadow-sm overflow-hidden flex"
                >
                  <div className="w-1 bg-gradient-to-b from-red-500 to-rose-600 flex-shrink-0" />
                  <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-800 dark:text-white">{alert.patientName}</span>
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold ${sev.bg} ${sev.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-teal-200">{alert.alertType}</p>
                      <p className="text-xs text-gray-400 dark:text-teal-400">{alert.time}</p>
                    </div>
                    <button
                      onClick={() => window.alert('Alert acknowledged')}
                      className="flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold shadow-sm hover:shadow-md hover:from-red-600 hover:to-rose-600 transition-all duration-200 active:scale-95"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Pending Activities ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
            <span className="text-sm">⚡</span>
          </div>
          <h2 className="text-base font-extrabold text-gray-800 dark:text-white">Pending Activities</h2>
          {data.pendingActivities.length > 0 && (
            <span className="ml-auto px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold">
              {data.pendingActivities.length}
            </span>
          )}
        </div>
        {data.pendingActivities.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-[#0c2b24] p-8 text-center border border-dashed border-teal-200 dark:border-[#154c40]">
            <p className="text-3xl mb-2">🎉</p>
            <p className="text-gray-500 dark:text-teal-400 font-medium text-sm">All caught up! No pending activities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.pendingActivities.map((activity) => (
              <div key={activity.id} className="group rounded-2xl bg-white dark:bg-[#0c2b24] border border-gray-100 dark:border-[#154c40] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-[#0d9488] to-emerald-400" />
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm leading-snug">{activity.activity}</h3>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                      categoryColors[activity.category] ?? 'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-[#154c40] flex items-center justify-center text-xs font-bold text-[#0d9488]">
                      {activity.patientName.charAt(0)}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-teal-300 font-medium">{activity.patientName}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-teal-400">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                    Due: {activity.dueTime}
                  </div>
                  <button
                    onClick={() => window.alert('Activity marked complete')}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0d9488] to-emerald-500 text-white text-sm font-bold hover:from-[#0f766e] hover:to-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Mark Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Recent Activity Feed ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-[#154c40] flex items-center justify-center">
            <span className="text-sm">📋</span>
          </div>
          <h2 className="text-base font-extrabold text-gray-800 dark:text-white">Recent Activity</h2>
        </div>
        {data.recentActivity.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-[#0c2b24] p-8 text-center border border-dashed border-teal-200 dark:border-[#154c40]">
            <p className="text-gray-400 dark:text-teal-400 font-medium text-sm">No recent activity</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white dark:bg-[#0c2b24] shadow-sm border border-gray-100 dark:border-[#154c40] overflow-hidden">
            {data.recentActivity.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-[#0f352c] transition-colors ${
                  i < data.recentActivity.length - 1 ? 'border-b border-gray-100 dark:border-[#154c40]' : ''
                }`}
              >
                <div className={`relative w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${
                  activityDotColors[item.type] ? '' : ''
                } bg-gray-100 dark:bg-[#154c40]`}>
                  {activityIcons[item.type] ?? '📌'}
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#0c2b24] ${
                    activityDotColors[item.type] ?? 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">{item.patientName}</p>
                  <p className="text-xs text-gray-500 dark:text-teal-300 truncate mt-0.5">{item.event}</p>
                </div>
                <span className="text-[11px] text-gray-400 dark:text-teal-500 flex-shrink-0 font-medium">{item.time}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Upcoming Appointments ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            <span className="text-sm">📅</span>
          </div>
          <h2 className="text-base font-extrabold text-gray-800 dark:text-white">Upcoming Appointments</h2>
          {data.upcomingAppointments.length > 0 && (
            <span className="ml-auto px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
              {data.upcomingAppointments.length}
            </span>
          )}
        </div>
        {data.upcomingAppointments.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-[#0c2b24] p-8 text-center border border-dashed border-teal-200 dark:border-[#154c40]">
            <p className="text-gray-400 dark:text-teal-400 font-medium text-sm">No upcoming appointments</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.upcomingAppointments.map((appt) => (
              <div key={appt.id} className="rounded-2xl bg-white dark:bg-[#0c2b24] border border-gray-100 dark:border-[#154c40] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-gray-800 dark:text-white text-sm">{appt.patientName}</p>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${statusColors[appt.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {appt.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-teal-200">
                      <svg className="w-3.5 h-3.5 text-[#0d9488] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      {appt.doctorName}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-teal-300">
                      <svg className="w-3.5 h-3.5 text-[#0d9488] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                      </svg>
                      {appt.dateTime}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-[#154c40] dark:to-[#0f352c] text-[#0d9488] font-semibold border border-teal-100 dark:border-[#1a5c4e]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.46 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.78-.78a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.27 16z" />
                    </svg>
                    {appt.method}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Disclaimer ── */}
      <p className="text-xs text-gray-400 dark:text-teal-600 text-center px-4 pb-4">
        Screening scores and health information are for support purposes only and do not constitute a medical diagnosis.
      </p>
    </div>
  );
}
