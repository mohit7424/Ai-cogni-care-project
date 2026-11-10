'use client';

import React from 'react';
import type { ChatMessage } from '../types/aiAssistant.types';

interface Props {
  messages: ChatMessage[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMessageList({
  messages,
  isTyping,
  messagesEndRef,
}: Props) {
  return (
    <div className="space-y-4 py-2">
      {/* Date Divider (matching screenshot: Today, 10:24 AM) */}
      <div className="flex items-center justify-center my-3">
        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-400 bg-gray-50 dark:bg-[#09221d] px-3 py-1 rounded-full border border-gray-100 dark:border-[#103a32]">
          Today, 10:24 AM
        </span>
      </div>

      {/* Messages */}
      {messages.map(msg => {
        const isUser = msg.sender === 'user';

        if (isUser) {
          return (
            <div key={msg.id} className="flex justify-end pl-8">
              <div className="max-w-xl bg-[#dcf4eb] dark:bg-[#0f4337] text-gray-900 dark:text-white rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-2xs space-y-1">
                <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-teal-800 dark:text-teal-200 font-medium">
                  <span>{msg.timestamp}</span>
                  <span className="text-[#0d9488] dark:text-[#2dd4bf] font-bold">✔✔</span>
                </div>
              </div>
            </div>
          );
        }

        // Assistant Message
        return (
          <div key={msg.id} className="flex items-start gap-3 pr-8">
            {/* Robot Avatar Icon */}
            <div className="w-8 h-8 rounded-xl bg-[#daf5ed] dark:bg-[#0e3a31] border border-teal-200/80 dark:border-[#154c40] flex items-center justify-center text-[#0d9488] dark:text-[#2dd4bf] shrink-0 mt-0.5 shadow-2xs">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="5" width="16" height="15" rx="4" />
                <circle cx="9" cy="11" r="1.5" fill="currentColor" />
                <circle cx="15" cy="11" r="1.5" fill="currentColor" />
                <path d="M9 16c1.5 1 4.5 1 6 0" />
              </svg>
            </div>

            {/* Bubble */}
            <div className="max-w-xl bg-white dark:bg-[#0c2b24] border border-gray-100/90 dark:border-[#154c40] text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-xs p-3.5 sm:p-4 shadow-xs space-y-1">
              <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
              <div className="text-[10px] text-gray-400 dark:text-gray-400 text-left pt-0.5">
                {msg.timestamp}
              </div>
            </div>
          </div>
        );
      })}

      {/* Typing Indicator (matching screenshot: 3 animated dots) */}
      {isTyping && (
        <div className="flex items-start gap-3 animate-in fade-in duration-200">
          <div className="w-8 h-8 rounded-xl bg-[#daf5ed] dark:bg-[#0e3a31] border border-teal-200/80 dark:border-[#154c40] flex items-center justify-center text-[#0d9488] dark:text-[#2dd4bf] shrink-0 mt-0.5 shadow-2xs">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="5" width="16" height="15" rx="4" />
              <circle cx="9" cy="11" r="1.5" fill="currentColor" />
              <circle cx="15" cy="11" r="1.5" fill="currentColor" />
              <path d="M9 16c1.5 1 4.5 1 6 0" />
            </svg>
          </div>

          <div className="bg-white dark:bg-[#0c2b24] border border-gray-100/90 dark:border-[#154c40] rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-bounce" />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

