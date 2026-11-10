'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  isSending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SendSafetyAlertModal({
  isOpen,
  isSending,
  onClose,
  onConfirm,
}: Props) {
  const [countdown, setCountdown] = useState<number>(5);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsCountingDown(false);
      setCountdown(5);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isCountingDown && countdown === 0) {
      setIsCountingDown(false);
      onConfirm();
    }
    return () => clearTimeout(timer);
  }, [isCountingDown, countdown, onConfirm]);

  if (!isOpen) return null;

  function handleStartCountdown() {
    setIsCountingDown(true);
  }

  function handleCancelCountdown() {
    setIsCountingDown(false);
    setCountdown(5);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100 dark:border-[#154c40] p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header: Pink Icon + Title + Close Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/60 flex items-center justify-center text-rose-500 shrink-0 shadow-2xs">
              <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                Send Safety Alert?
              </h3>
              <p className="text-[11px] text-gray-400">Emergency Broadcast Confirmation</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSending}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#124138] flex items-center justify-center transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* Body Description */}
        <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>
            Are you sure you want to notify your trusted contacts? An SMS will be sent to your selected contacts.
          </p>
          <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-[#0f352c] border border-teal-100 dark:border-[#154c40] text-xs space-y-1">
            <p className="font-semibold text-[#0d9488] dark:text-[#2dd4bf]">Included in alert:</p>
            <ul className="list-disc pl-4 text-gray-600 dark:text-gray-300 space-y-0.5 text-[11px]">
              <li>Your emergency alert distress notification</li>
              <li>Live GPS location &amp; timestamp</li>
              <li>Direct callback link for primary caregiver</li>
            </ul>
          </div>
        </div>

        {/* Countdown Safe Zone (if active) */}
        {isCountingDown && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-center space-y-2 animate-in fade-in">
            <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
              Broadcasting SOS in {countdown} seconds...
            </p>
            <div className="w-full bg-rose-200 dark:bg-rose-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(countdown / 5) * 100}%` }}
              />
            </div>
            <button
              type="button"
              onClick={handleCancelCountdown}
              className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
            >
              Cancel SOS Dispatch
            </button>
          </div>
        )}

        {/* Footer Actions: Cancel + Instant or Countdown Send */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSending || isCountingDown}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#124138] text-xs font-semibold transition cursor-pointer text-center"
          >
            Cancel
          </button>

          {!isCountingDown && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isSending}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white text-xs font-bold shadow-md shadow-teal-900/10 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 touch-manipulation"
            >
              {isSending ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Dispatching SMS...</span>
                </>
              ) : (
                <span>Confirm &amp; Send SOS</span>
              )}
            </button>
          )}

          {!isCountingDown && !isSending && (
            <button
              type="button"
              onClick={handleStartCountdown}
              className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-teal-200 dark:border-[#154c40] text-[#0d9488] dark:text-[#2dd4bf] hover:bg-teal-50 dark:hover:bg-[#124138] text-[11px] font-semibold transition cursor-pointer text-center"
              title="5s delay allows cancelling if accidental"
            >
              Send with 5s Delay ⏱
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
