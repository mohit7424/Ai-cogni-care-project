'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CogniCareHeader from '../components/CogniCareHeader';
import { useLogin } from '../hooks/useLogin';
import { initiateGoogleSignIn } from '../services/socialAuthService';
import { Button, TextInput, PasswordInput } from '@/components/common';

export default function LoginScreen() {
  const router = useRouter();
  const { formData, errors, status, handleChange, handleSubmit } = useLogin();
  const [activeRole, setActiveRole] = React.useState<'patient' | 'doctor'>('patient');

  const isLoading = status === 'loading';

  function handleRoleChange(role: 'patient' | 'doctor') {
    setActiveRole(role);
    if (role === 'doctor') {
      handleChange('email', 'dr.sarah.jenkins@cognicare.com');
      handleChange('password', 'ClinicianPass@2026');
    } else {
      handleChange('email', 'alex.parker@example.com');
      handleChange('password', 'PatientPass@2026');
    }
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void handleSubmit(() => {
      if (activeRole === 'doctor') {
        router.push('/doctor');
      } else {
        router.push('/dashboard');
      }
    });
  }

  function handleQuickDoctorAccess() {
    router.push('/doctor');
  }

  return (
    <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="w-full max-w-[540px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-6 sm:p-8">
        {/* Top Header */}
        <CogniCareHeader
          headline="Your cognitive wellbeing"
          highlightedWord="matters"
          subtext="Track • Support • Stay Independent"
          featureCards={[
            {
              title: 'Secure & Private',
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
            },
            {
              title: 'Better Wellness',
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ),
            },
            {
              title: 'Trusted Care',
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
            },
          ]}
        />

        {/* Card Body */}
        <div className="bg-[#f8fcfa] rounded-2xl border border-teal-100/70 p-6 sm:p-7 shadow-xs">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Welcome <span className="text-[#0d9488]">Back</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {activeRole === 'doctor'
                ? 'Clinical Provider Login • Verified Doctor Workspace'
                : 'Sign in to continue your wellness journey'}
            </p>
          </div>

          {/* Role Selection Switcher */}
          <div className="mb-4">
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 text-center sm:text-left">
              Select Your Login Portal:
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleChange('patient')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeRole === 'patient'
                    ? 'bg-white text-[#0d9488] shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <span>👤</span>
                <span>Patient Portal</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('doctor')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeRole === 'doctor'
                    ? 'bg-[#0d9488] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#0d9488] bg-teal-50/50 hover:bg-teal-50'
                }`}
              >
                <span>🩺</span>
                <span>Doctor Workspace</span>
              </button>
            </div>

            {/* Quick 1-Click Access Pill when Doctor is active or highlighted */}
            {activeRole === 'doctor' && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between gap-2 animate-in fade-in">
                <div className="flex items-center gap-1.5 text-xs text-[#0a3832] font-semibold">
                  <span>⚡</span>
                  <span>Dr. Sarah Jenkins (Neurology)</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDoctorAccess}
                  className="px-3 py-1 bg-[#0d9488] hover:bg-[#0b8075] active:scale-95 text-white text-[11px] font-bold rounded-lg shadow-2xs transition cursor-pointer"
                >
                  Open Doctor Dashboard &rarr;
                </button>
              </div>
            )}
          </div>

          {errors.general && (
            <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <TextInput
              placeholder="Email Address or Mobile Number"
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

            <PasswordInput
              placeholder="Enter your password"
              value={formData.password}
              onChange={e => handleChange('password', e.target.value)}
              error={errors.password}
              required
            />

            {/* Remember & Forgot Row */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-gray-500 select-none">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={e => handleChange('rememberMe', e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#0d9488] focus:ring-[#0d9488]"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="font-medium text-[#0d9488] hover:text-[#0b7c72] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              fullWidth
              variant="primary"
            >
              {activeRole === 'doctor'
                ? 'Sign In to Doctor Workspace →'
                : 'Sign In to Patient Portal →'}
            </Button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-[#f8fcfa] px-3 text-[11px] text-gray-400 absolute">or</span>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={initiateGoogleSignIn}
              className="w-full py-2.5 px-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs rounded-xl shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27a7.22 7.22 0 0 1 0-4.54V6.58H1.26a11.96 11.96 0 0 0 0 10.84l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Bottom link */}
            <div className="text-center pt-2">
              <span className="text-xs text-gray-500">Don&apos;t have an account? </span>
              <Link
                href="/auth/register"
                className="text-xs font-semibold text-[#0d9488] hover:underline"
              >
                Sign Up
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
