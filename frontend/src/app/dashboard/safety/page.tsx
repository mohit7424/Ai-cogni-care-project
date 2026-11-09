'use client';

export default function SafetyPage() {
  return (
    <div className="bg-white rounded-2xl border border-teal-100/80 p-8 shadow-xs">
      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
        Safety & SOS
      </span>
      <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-2">Safety & Emergency Contacts</h1>
      <p className="text-xs text-gray-500 mb-6">
        Emergency SOS trigger, family caregiver alerts, and home safety checklist.
      </p>
    </div>
  );
}

