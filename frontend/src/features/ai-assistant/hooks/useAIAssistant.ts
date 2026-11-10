'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { AIAssistantData, ChatMessage, QuickPromptCardItem } from '../types/aiAssistant.types';
import { getAIAssistantData, sendUserMessage } from '../services/aiAssistantService';

export function useAIAssistant() {
  const [data, setData] = useState<AIAssistantData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true); // start showing typing indicator as in screenshot
  const [isListening, setIsListening] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getAIAssistantData().then(res => {
      setData(res);
      // Load saved messages or initial screenshot messages
      const saved = localStorage.getItem('cogni_ai_messages');
      if (saved) {
        try {
          setMessages(JSON.parse(saved));
          setIsTyping(false);
          return;
        } catch {
          // fallback to initial
        }
      }
      setMessages(res.initialMessages);
      // Show typing indicator for 2 seconds to match screenshot look
      const t = setTimeout(() => {
        setIsTyping(false);
      }, 2500);
      return () => clearTimeout(t);
    });
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const text = (textToSend ?? inputValue).trim();
      if (!text) return;

      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;

      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: `${formattedHours}:${minutes} ${ampm}`,
        status: 'read',
      };

      const updated = [...messages, userMsg];
      setMessages(updated);
      setInputValue('');
      setIsTyping(true);

      try {
        const { replyMessage } = await sendUserMessage(text);
        const finalMessages = [...updated, replyMessage];
        setMessages(finalMessages);
        localStorage.setItem('cogni_ai_messages', JSON.stringify(finalMessages));
      } catch {
        // error handling
      } finally {
        setIsTyping(false);
      }
    },
    [inputValue, messages]
  );

  const handleSelectQuickPrompt = useCallback(
    (promptItem: QuickPromptCardItem) => {
      handleSendMessage(promptItem.prompt);
    },
    [handleSendMessage]
  );

  const handleNewChat = useCallback(() => {
    if (!data) return;
    setMessages([]);
    localStorage.removeItem('cogni_ai_messages');
    setIsTyping(false);
  }, [data]);

  const handleToggleVoiceInput = useCallback(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'Hindi' ? 'hi-IN' : 'en-US';

      if (!isListening) {
        setIsListening(true);
        recognition.start();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(prev => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } catch {
      setIsListening(false);
    }
  }, [isListening, selectedLanguage]);

  return {
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
  };
}

