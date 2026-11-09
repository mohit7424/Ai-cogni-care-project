'use client';

import React, { useMemo } from 'react';

interface PasswordStrengthProps {
  password: string;
}

interface StrengthLevel {
  label: string;
  score: number;
  color: string;
  barColor: string;
  textColor: string;
}

interface Requirement {
  label: string;
  met: boolean;
}

function getStrengthLevel(score: number): StrengthLevel {
  if (score <= 1) return { label: 'Weak', score, color: 'bg-red-200', barColor: 'bg-red-500', textColor: 'text-red-600' };
  if (score === 2) return { label: 'Fair', score, color: 'bg-orange-200', barColor: 'bg-orange-500', textColor: 'text-orange-600' };
  if (score === 3) return { label: 'Good', score, color: 'bg-yellow-200', barColor: 'bg-yellow-500', textColor: 'text-yellow-600' };
  return { label: 'Strong', score, color: 'bg-green-200', barColor: 'bg-green-500', textColor: 'text-green-600' };
}

function computeStrength(password: string): { score: number; requirements: Requirement[] } {
  const requirements: Requirement[] = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter (A–Z)', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a–z)', met: /[a-z]/.test(password) },
    { label: 'One number (0–9)', met: /[0-9]/.test(password) },
    { label: 'One special character (!@#$…)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = requirements.filter(r => r.met).length;
  // Map 0–5 met requirements → 0–4 strength score
  const normalizedScore = score === 0 ? 0 : Math.ceil((score / requirements.length) * 4);

  return { score: normalizedScore, requirements };
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, requirements } = useMemo(() => computeStrength(password), [password]);
  const strength = getStrengthLevel(score);

  if (!password) return null;

  return (
    <div className="flex flex-col gap-3 mt-1">
      {/* Strength bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4].map(segment => (
            <div
              key={segment}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                score >= segment ? strength.barColor : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-semibold min-w-10 ${strength.textColor}`}>
          {strength.label}
        </span>
      </div>

      {/* Requirements checklist */}
      <ul className="grid grid-cols-1 gap-1" aria-label="Password requirements">
        {requirements.map(req => (
          <li key={req.label} className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 transition-all duration-150 ${
                req.met ? 'bg-green-500' : 'bg-gray-200'
              }`}
              aria-hidden="true"
            >
              {req.met ? (
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M10.28 1.28L4.5 7.06 1.72 4.28a1 1 0 00-1.44 1.44l3.5 3.5a1 1 0 001.44 0l6.5-6.5a1 1 0 00-1.44-1.44z" />
                </svg>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              )}
            </span>
            <span
              className={`text-xs transition-colors duration-150 ${
                req.met ? 'text-green-700 line-through decoration-green-400' : 'text-gray-500'
              }`}
            >
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
