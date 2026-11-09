'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CogniCareHeader from '../components/CogniCareHeader';
import { useRegister } from '../hooks/useRegister';
import type { UserRole } from '../types/auth.types';
import { Button, TextInput, PasswordInput } from '@/components/common';

export default function RegisterScreen() {
  const router = useRouter();
  const { formData, errors, status, handleChange, handleSubmit } = useRegister();
  const [mobileNumber, setMobileNumber] = useState('');

  const isLoading = status === 'loading';

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void handleSubmit((email: string) => {
      router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
    });
  }

  return (
    <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="w-full max-w-[540px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-6 sm:p-8">
        {/* Top Header */}
        <CogniCareHeader
          headline="Join"
          highlightedWord="Cogni Care"
          subtext="Take control of your cognitive health today"
          featureCards={[
            {
              title: 'Track Progress',
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              ),
            },
            {
              title: 'Get Support',
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
            },
            {
              title: 'Live Healthier',
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ),
            },
          ]}
        />

        {/* Card Body */}
        <div className="bg-[#f8fcfa] rounded-2xl border border-teal-100/70 p-6 sm:p-7 shadow-xs">
          <div className="text-center mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Create Your <span className="text-[#0d9488]">Account</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Let&apos;s get started with your wellness journey
            </p>
          </div>

          {errors.general && (
            <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            {/* Full Name */}
            <TextInput
              placeholder="Enter your full name"
              value={formData.firstName ? `${formData.firstName} ${formData.lastName}`.trim() : ''}
              onChange={e => {
                const parts = e.target.value.split(' ');
                handleChange('firstName', parts[0] || '');
                handleChange('lastName', parts.slice(1).join(' ') || '');
              }}
              error={errors.firstName}
              required
              leftIcon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />

            {/* Email Address */}
            <TextInput
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              error={errors.email}
              required
              leftIcon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            />

            {/* Mobile Number */}
            <TextInput
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={e => setMobileNumber(e.target.value)}
              leftIcon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
            />

            {/* Password */}
            <PasswordInput
              placeholder="Create a password"
              value={formData.password}
              onChange={e => handleChange('password', e.target.value)}
              error={errors.password}
              required
            />

            {/* Confirm Password */}
            <PasswordInput
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={e => handleChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              required
            />

            {/* Role Select Buttons */}
            <div className="pt-1">
              <label className="block text-[11px] font-semibold text-gray-700 mb-1.5">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange('role', 'patient' as UserRole)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    formData.role === 'patient'
                      ? 'bg-[#0d9488] text-white shadow-xs'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Patient</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange('role', 'therapist' as UserRole)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    formData.role === 'therapist'
                      ? 'bg-[#0d9488] text-white shadow-xs'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>Caregiver</span>
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={e => handleChange('agreeToTerms', e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#0d9488] focus:ring-[#0d9488]"
                />
                <span>
                  I agree to the{' '}
                  <span className="text-[#0d9488] font-medium hover:underline">
                    Terms & Privacy Policy
                  </span>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-[11px] text-red-500 mt-1 pl-1">{errors.agreeToTerms}</p>
              )}
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              fullWidth
              variant="primary"
            >
              Create Account &rarr;
            </Button>

            {/* Bottom link */}
            <div className="text-center pt-2">
              <span className="text-xs text-gray-500">Already have an account? </span>
              <Link
                href="/auth/login"
                className="text-xs font-semibold text-[#0d9488] hover:underline"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>

        {/* Footer Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 mt-4">
          <svg className="w-3.5 h-3.5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Your information is secure and private</span>
        </div>
      </div>
    </div>
  );
}
