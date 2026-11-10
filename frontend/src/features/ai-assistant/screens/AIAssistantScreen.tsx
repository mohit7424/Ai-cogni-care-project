'use client';

import React from 'react';
import { useAIAssistant } from '../hooks/useAIAssistant';
import AIAssistantHeader from '../components/AIAssistantHeader';
import AIWellnessBanner from '../components/AIWellnessBanner';
import ChatMessageList from '../components/ChatMessageList';
import ChatInputBar from '../components/ChatInputBar';
import ConversationHistoryModal from '../components/ConversationHistoryModal';

export default function AIAssistantScreen() {
  const {
    data,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    isListening,
    selectedLanguage,
    setSelectedLanguage,
    isHistoryOpen,
    setIsHistoryOpen,
    messagesEndRef,
    handleSendMessage,
    handleSelectQuickPrompt,
    handleNewChat,
    handleToggleVoiceInput,
  } = useAIAssistant();

  if (!data) return null;

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-6">
      {/* 1. Header (Bot status, New Chat, History, Language) */}
      <AIAssistantHeader
        botName={data.botName}
        statusText={data.statusText}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onNewChat={handleNewChat}
        onToggleHistory={() => setIsHistoryOpen(true)}
      />

      {/* 2. Welcome Banner + 4 Suggestion Cards (Matching Screenshot) */}
      <AIWellnessBanner
        title={data.bannerTitle}
        subtitle={data.bannerSubtitle}
        quickPrompts={data.quickPrompts}
        onSelectPrompt={handleSelectQuickPrompt}
      />

      {/* 3. Chat Messages Conversation List */}
      <div className="bg-white/60 dark:bg-[#071f1a]/40 border border-teal-100/60 dark:border-[#103a32] rounded-3xl p-4 sm:p-6 shadow-2xs">
        <ChatMessageList
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />

        {/* 4. Chat Input Bar (Text, Mic, Send, Wellbeing note, Disclaimer) */}
        <ChatInputBar
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={() => handleSendMessage()}
          isListening={isListening}
          onToggleVoice={handleToggleVoiceInput}
          safetyNote={data.safetyNote}
          disclaimer={data.disclaimer}
        />
      </div>

      {/* 5. History Modal */}
      <ConversationHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectConversation={title => handleSendMessage(`Let's revisit our discussion about: ${title}`)}
      />
    </div>
  );
}

